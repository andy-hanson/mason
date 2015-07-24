if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', '../MsAst', './util', './VerifyResults'], function (exports, module, _CompileError, _MsAst, _util, _VerifyResults) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _VerifyResults2 = _interopRequireDefault(_VerifyResults);

	/*
 The verifier generates information needed during transpiling, the VerifyResults.
 */

	module.exports = (_context, msAst) => {
		context = _context;
		locals = new Map();
		pendingBlockLocals = [];
		isInDebug = isInGenerator = false;
		opLoop = null;
		results = new _VerifyResults2.default();

		msAst.verify();
		verifyLocalUse();

		const res = results;
		// Release for garbage collection.
		context = locals = opLoop = pendingBlockLocals = results = undefined;
		return res;
	};

	// Use a trick like in parse.js and have everything close over these mutable variables.
	let context,
	// Map from names to LocalDeclares.
	locals, opLoop,
	/*
 Locals for this block.
 These are added to locals when entering a Function or lazy evaluation.
 In:
 	a = |
 		b
 	b = 1
 `b` will be a pending local.
 However:
 	a = b
 	b = 1
 will fail to verify, because `b` comes after `a` and is not accessed inside a function.
 It would work for `~a is b`, though.
 */
	pendingBlockLocals, isInDebug,
	// Whether we are currently able to yield.
	isInGenerator, results;

	const verify = msAst => msAst.verify(),
	      deleteLocal = localDeclare => locals.delete(localDeclare.name),
	      setLocal = localDeclare => locals.set(localDeclare.name, localDeclare),
	     

	// When a local is returned from a BlockObj or Module,
	// the return 'access' is considered to be 'debug' if the local is.
	accessLocalForReturn = (declare, access) => {
		const info = results.localDeclareToInfo.get(declare);
		_addLocalAccess(info, access, info.isInDebug);
	},
	      accessLocal = (access, name) => {
		const declare = getLocalDeclare(name, access.loc);
		results.localAccessToDeclare.set(access, declare);
		_addLocalAccess(results.localDeclareToInfo.get(declare), access, isInDebug);
	},
	      _addLocalAccess = (localInfo, access, isDebugAccess) => (isDebugAccess ? localInfo.debugAccesses : localInfo.nonDebugAccesses).push(access),
	     

	// For expressions affecting lineNewLocals, they will be registered before being verified.
	// So, LocalDeclare.verify just the type.
	// For locals not affecting lineNewLocals, use this instead of just declare.verify()
	verifyLocalDeclare = localDeclare => {
		registerLocal(localDeclare);
		localDeclare.verify();
	},
	      registerLocal = localDeclare => results.localDeclareToInfo.set(localDeclare, _VerifyResults.LocalInfo.empty(isInDebug));

	// These functions change verifier state and efficiently return to the old state when finished.
	const withInDebug = action => {
		const oldIsInDebug = isInDebug;
		isInDebug = true;
		action();
		isInDebug = oldIsInDebug;
	},
	      withInGenerator = (newIsInGenerator, action) => {
		const oldIsInGenerator = isInGenerator;
		isInGenerator = newIsInGenerator;
		action();
		isInGenerator = oldIsInGenerator;
	},
	      withInLoop = (newLoop, action) => {
		const oldLoop = opLoop;
		opLoop = newLoop;
		action();
		opLoop = oldLoop;
	},
	      plusLocal = (addedLocal, action) => {
		const shadowed = locals.get(addedLocal.name);
		locals.set(addedLocal.name, addedLocal);
		action();
		if (shadowed === undefined) deleteLocal(addedLocal);else setLocal(shadowed);
	},
	     

	// Should have verified that addedLocals all have different names.
	plusLocals = (addedLocals, action) => {
		const shadowedLocals = [];
		for (const _ of addedLocals) {
			const shadowed = locals.get(_.name);
			if (shadowed !== undefined) shadowedLocals.push(shadowed);
			setLocal(_);
		}

		action();

		addedLocals.forEach(deleteLocal);
		shadowedLocals.forEach(setLocal);
	},
	      verifyAndPlusLocal = (addedLocal, action) => {
		verifyLocalDeclare(addedLocal);
		plusLocal(addedLocal, action);
	},
	      verifyAndPlusLocals = (addedLocals, action) => {
		addedLocals.forEach(verifyLocalDeclare);
		const names = new Set();
		for (const _ of addedLocals) {
			context.check(!names.has(_.name), _.loc, () => `Duplicate local ${ (0, _CompileError.code)(_.name) }`);
			names.add(_.name);
		}
		plusLocals(addedLocals, action);
	},
	      withBlockLocals = action => {
		const oldPendingBlockLocals = pendingBlockLocals;
		pendingBlockLocals = [];
		plusLocals(oldPendingBlockLocals, action);
		pendingBlockLocals = oldPendingBlockLocals;
	},
	     

	// Can't break out of loop inside of IIFE.
	withIIFE = action => {
		withInLoop(false, action);
	};

	const verifyLocalUse = () => results.localDeclareToInfo.forEach((info, local) => {
		if (!(local instanceof _MsAst.LocalDeclareBuilt || local instanceof _MsAst.LocalDeclareRes)) {
			const noNonDebug = (0, _util.isEmpty)(info.nonDebugAccesses);
			if (noNonDebug && (0, _util.isEmpty)(info.debugAccesses)) context.warn(local.loc, () => `Unused local variable ${ (0, _CompileError.code)(local.name) }.`);else if (info.isInDebug) context.warnIf(!noNonDebug, () => (0, _util.head)(info.nonDebugAccesses).loc, () => `Debug-only local ${ (0, _CompileError.code)(local.name) } used outside of debug.`);else context.warnIf(noNonDebug, local.loc, () => `Local ${ (0, _CompileError.code)(local.name) } used only in debug.`);
		}
	});

	(0, _util.implementMany)(_MsAst, 'verify', {
		Assert() {
			this.condition.verify();
			(0, _util.opEach)(this.opThrown, verify);
		},

		AssignSingle() {
			const doV = () => {
				// Assignee registered by verifyLines.
				this.assignee.verify();
				this.value.verify();
			};
			if (this.assignee.isLazy()) withBlockLocals(doV);else doV();
		},

		AssignDestructure() {
			// Assignees registered by verifyLines.
			this.assignees.forEach(verify);
			this.value.verify();
		},

		BagEntry: verifyBagEntry,
		BagEntryMany: verifyBagEntry,

		BagSimple() {
			this.parts.forEach(verify);
		},

		BlockDo() {
			verifyLines(this.lines);
		},

		BlockValThrow() {
			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, () => this._throw.verify());
		},

		BlockWithReturn() {
			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, () => this.returned.verify());
		},

		BlockObj() {
			verifyAndPlusLocal(this.built, () => {
				const newLocals = verifyLines(this.lines);
				(0, _util.opEach)(this.opObjed, _ => plusLocals(newLocals, () => _.verify()));
			});
		},

		BlockBag: verifyBlockBagOrMap,
		BlockMap: verifyBlockBagOrMap,

		BlockWrap() {
			withIIFE(() => this.block.verify());
		},

		BreakDo() {
			verifyInLoop(this);
			context.check(!(opLoop instanceof _MsAst.ForVal), this.loc, () => `${ (0, _CompileError.code)('for') } must break with a value.`);
		},

		BreakVal() {
			verifyInLoop(this);
			context.check(opLoop instanceof _MsAst.ForVal, this.loc, () => `${ (0, _CompileError.code)('break') } only valid inside ${ (0, _CompileError.code)('for') }`);
			this.value.verify();
		},

		Call() {
			this.called.verify();
			this.args.forEach(verify);
		},

		CaseDo() {
			verifyCase(this);
		},
		CaseDoPart: verifyCasePart,
		CaseVal() {
			withIIFE(() => verifyCase(this));
		},
		CaseValPart: verifyCasePart,

		Catch() {
			context.check(this.caught.opType === null, this.caught.loc, 'TODO: Caught types');
			verifyAndPlusLocal(this.caught, () => this.block.verify());
		},

		Class() {
			(0, _util.opEach)(this.superClass, verify);
			this.statics.forEach(verify);
			(0, _util.opEach)(this.opConstructor, verify);
			this.methods.forEach(verify);
		},

		ConditionalDo() {
			this.test.verify();
			this.result.verify();
		},
		ConditionalVal() {
			this.test.verify();
			withIIFE(() => this.result.verify());
		},

		Continue() {
			verifyInLoop(this);
		},

		// Only reach here for in/out condition.
		Debug() {
			verifyLines([this]);
		},

		ExceptDo: verifyExcept,
		ExceptVal: verifyExcept,

		ForBag() {
			verifyAndPlusLocal(this.built, () => verifyFor(this));
		},

		ForDo() {
			verifyFor(this);
		},

		ForVal() {
			verifyFor(this);
		},

		Fun() {
			withBlockLocals(() => {
				context.check(this.opDeclareRes === null || this.block instanceof _MsAst.BlockVal, this.loc, 'Function with return condition must return something.');
				withInGenerator(this.isGenerator, () => withInLoop(false, () => {
					const allArgs = (0, _util.cat)(this.opDeclareThis, this.args, this.opRestArg);
					verifyAndPlusLocals(allArgs, () => {
						(0, _util.opEach)(this.opIn, verify);
						this.block.verify();
						(0, _util.opEach)(this.opDeclareRes, verifyLocalDeclare);
						const verifyOut = () => (0, _util.opEach)(this.opOut, _ => _.verify());
						(0, _util.ifElse)(this.opDeclareRes, _ => plusLocal(_, verifyOut), verifyOut);
					});
				}));
			});
		},

		GlobalAccess() {},

		Lazy() {
			withBlockLocals(() => this.value.verify());
		},

		LocalAccess() {
			accessLocal(this, this.name);
		},

		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare() {
			(0, _util.opEach)(this.opType, verify);
		},

		LocalMutate() {
			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, () => `${ (0, _CompileError.code)(this.name) } is not mutable.`);
			// TODO: Track mutations. Mutable local must be mutated somewhere.
			this.value.verify();
		},

		Logic() {
			context.check(this.args.length > 1, 'Logic expression needs at least 2 arguments.');
			this.args.forEach(verify);
		},

		Not() {
			this.arg.verify();
		},

		NumberLiteral() {},

		MapEntry() {
			accessLocal(this, 'built');
			this.key.verify();
			this.val.verify();
		},

		Member() {
			this.object.verify();
		},

		MemberSet() {
			this.object.verify();
			this.value.verify();
		},

		Method() {
			this.symbol.verify();
			this.fun.verify();
		},

		Module() {
			// No need to verify this.doUses.
			this.uses.forEach(verify);
			withInDebug(() => this.debugUses.forEach(verify));
			const newLocals = verifyLines(this.lines);
			for (const _ of this.exports) accessLocalForReturn(_, this);
			(0, _util.opEach)(this.opDefaultExport, _ => plusLocals(newLocals, () => _.verify()));

			const exports = new Set(this.exports);
			const markExportLines = line => {
				if (line instanceof _MsAst.Assign && line.allAssignees().some(_ => exports.has(_))) results.exportAssigns.add(line);else if (line instanceof _MsAst.Debug) line.lines.forEach(markExportLines);
			};
			this.lines.forEach(markExportLines);
		},

		New() {
			this.type.verify();
			this.args.forEach(verify);
		},

		ObjEntry() {
			accessLocal(this, 'built');
			this.assign.verify();
			for (const _ of this.assign.allAssignees()) accessLocal(this, _.name);
		},

		ObjSimple() {
			const keys = new Set();
			for (const pair of this.pairs) {
				const key = pair.key;
				const value = pair.value;

				context.check(!keys.has(key), pair.loc, () => `Duplicate key ${ key }`);
				keys.add(key);
				value.verify();
			}
		},

		Quote() {
			for (const _ of this.parts) if (typeof _ !== 'string') _.verify();
		},

		SpecialDo() {},

		SpecialVal() {},

		Splat() {
			this.splatted.verify();
		},

		Throw() {
			(0, _util.opEach)(this.opThrown, verify);
		},

		Use() {
			// Since Uses are always in the outermost scope, don't have to worry about shadowing.
			// So we mutate `locals` directly.
			const addUseLocal = _ => {
				const prev = locals.get(_.name);
				context.check(prev === undefined, _.loc, () => `${ (0, _CompileError.code)(_.name) } already imported at ${ prev.loc }`);
				verifyLocalDeclare(_);
				setLocal(_);
			};
			this.used.forEach(addUseLocal);
			(0, _util.opEach)(this.opUseDefault, addUseLocal);
		},

		Yield() {
			context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yielded.verify();
		},

		YieldTo() {
			context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yieldedTo.verify();
		}
	});

	function verifyBagEntry() {
		accessLocal(this, 'built');
		this.value.verify();
	}

	function verifyBlockBagOrMap() {
		verifyAndPlusLocal(this.built, () => verifyLines(this.lines));
	}

	function verifyCasePart() {
		if (this.test instanceof _MsAst.Pattern) {
			this.test.type.verify();
			this.test.patterned.verify();
			verifyAndPlusLocals(this.test.locals, () => this.result.verify());
		} else {
			this.test.verify();
			this.result.verify();
		}
	}

	function verifyExcept() {
		this._try.verify();
		(0, _util.opEach)(this._catch, verify);
		(0, _util.opEach)(this._finally, verify);
	}

	// Helpers specific to certain MsAst types:
	const verifyFor = forLoop => {
		const verifyBlock = () => withInLoop(forLoop, () => forLoop.block.verify());
		(0, _util.ifElse)(forLoop.opIteratee, _ref => {
			let element = _ref.element;
			let bag = _ref.bag;

			bag.verify();
			verifyAndPlusLocal(element, verifyBlock);
		}, verifyBlock);
	},
	      verifyInLoop = loopUser => context.check(opLoop !== null, loopUser.loc, 'Not in a loop.'),
	      verifyCase = _ => {
		const doIt = () => {
			_.parts.forEach(verify);
			(0, _util.opEach)(_.opElse, verify);
		};
		(0, _util.ifElse)(_.opCased, _ => {
			_.verify();
			verifyAndPlusLocal(_.assignee, doIt);
		}, doIt);
	};

	// General utilities:
	const getLocalDeclare = (name, accessLoc) => {
		const declare = locals.get(name);
		context.check(declare !== undefined, accessLoc, () => {
			const showLocals = (0, _CompileError.code)((0, _util.iteratorToArray)(locals.keys()).join(' '));
			return `No such local ${ (0, _CompileError.code)(name) }.\nLocals are:\n${ showLocals }.`;
		});
		return declare;
	},
	      lineNewLocals = line => line instanceof _MsAst.AssignSingle ? [line.assignee] : line instanceof _MsAst.AssignDestructure ? line.assignees : line instanceof _MsAst.ObjEntry ? lineNewLocals(line.assign) : [],
	      verifyLines = lines => {
		/*
  We need to bet all block locals up-front because
  Functions within lines can access locals from later lines.
  NOTE: We push these onto pendingBlockLocals in reverse
  so that when we iterate through lines forwards, we can pop from pendingBlockLocals
  to remove pending locals as they become real locals.
  It doesn't really matter what order we add locals in since it's not allowed
  to have two locals of the same name in the same block.
  */
		const newLocals = [];

		const getLineLocals = line => {
			if (line instanceof _MsAst.Debug) withInDebug(() => (0, _util.eachReverse)(line.lines, getLineLocals));else (0, _util.eachReverse)(lineNewLocals(line), _ => {
				// Register the local now. Can't wait until the assign is verified.
				registerLocal(_);
				newLocals.push(_);
			});
		};
		(0, _util.eachReverse)(lines, getLineLocals);
		pendingBlockLocals.push(...newLocals);

		/*
  Keeps track of locals which have already been added in this block.
  Mason allows shadowing, but not within the same block.
  So, this is allowed:
  	a = 1
  	b =
  		a = 2
  		...
  But not:
  	a = 1
  	a = 2
  */
		const thisBlockLocalNames = new Set();

		// All shadowed locals for this block.
		const shadowed = [];

		const verifyLine = line => {
			if (line instanceof _MsAst.Debug)
				// TODO: Do anything in this situation?
				// context.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(() => line.lines.forEach(verifyLine));else {
				verifyIsStatement(line);
				for (const newLocal of lineNewLocals(line)) {
					const name = newLocal.name;
					const oldLocal = locals.get(name);
					if (oldLocal !== undefined) {
						context.check(!thisBlockLocalNames.has(name), newLocal.loc, () => `A local ${ (0, _CompileError.code)(name) } is already in this block.`);
						shadowed.push(oldLocal);
					}
					thisBlockLocalNames.add(name);
					setLocal(newLocal);

					// Now that it's added as a local, it's no longer pending.
					// We added pendingBlockLocals in the right order that we can just pop them off.
					const popped = pendingBlockLocals.pop();
					(0, _util.assert)(popped === newLocal);
				}
				line.verify();
			}
		};

		lines.forEach(verifyLine);

		newLocals.forEach(deleteLocal);
		shadowed.forEach(setLocal);

		return newLocals;
	},
	      verifyIsStatement = line => {
		const isStatement = line instanceof _MsAst.Do ||
		// Some values are also acceptable.
		line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO09BRWhDLFdBQVcsR0FBRyxZQUFZLElBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztPQUVqQyxRQUFRLEdBQUcsWUFBWSxJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEtBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwRCxpQkFBZSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0VBQzdDO09BRUQsV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSztBQUMvQixRQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqRCxTQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNqRCxpQkFBZSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0VBQzNFO09BRUQsZUFBZSxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEtBQ2xELENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFBLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0FBS3BGLG1CQUFrQixHQUFHLFlBQVksSUFBSTtBQUNwQyxlQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDM0IsY0FBWSxDQUFDLE1BQU0sRUFBRSxDQUFBO0VBQ3JCO09BRUQsYUFBYSxHQUFHLFlBQVksSUFDM0IsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZUFsRnZCLFNBQVMsQ0FrRndCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBOzs7QUFHMUUsT0FDQyxXQUFXLEdBQUcsTUFBTSxJQUFJO0FBQ3ZCLFFBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQTtBQUM5QixXQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQU0sRUFBRSxDQUFBO0FBQ1IsV0FBUyxHQUFHLFlBQVksQ0FBQTtFQUN4QjtPQUVELGVBQWUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sS0FBSztBQUMvQyxRQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQTtBQUN0QyxlQUFhLEdBQUcsZ0JBQWdCLENBQUE7QUFDaEMsUUFBTSxFQUFFLENBQUE7QUFDUixlQUFhLEdBQUcsZ0JBQWdCLENBQUE7RUFDaEM7T0FFRCxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ2pDLFFBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQTtBQUN0QixRQUFNLEdBQUcsT0FBTyxDQUFBO0FBQ2hCLFFBQU0sRUFBRSxDQUFBO0FBQ1IsUUFBTSxHQUFHLE9BQU8sQ0FBQTtFQUNoQjtPQUVELFNBQVMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLEtBQUs7QUFDbkMsUUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDNUMsUUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3ZDLFFBQU0sRUFBRSxDQUFBO0FBQ1IsTUFBSSxRQUFRLEtBQUssU0FBUyxFQUN6QixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUEsS0FFdkIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ25COzs7O0FBR0QsV0FBVSxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sS0FBSztBQUNyQyxRQUFNLGNBQWMsR0FBRyxFQUFHLENBQUE7QUFDMUIsT0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7QUFDNUIsU0FBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkMsT0FBSSxRQUFRLEtBQUssU0FBUyxFQUN6QixjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLFdBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUNYOztBQUVELFFBQU0sRUFBRSxDQUFBOztBQUVSLGFBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDaEMsZ0JBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7RUFDaEM7T0FFRCxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLEtBQUs7QUFDNUMsb0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDOUIsV0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUM3QjtPQUVELG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sS0FBSztBQUM5QyxhQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDdkMsUUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUN2QixPQUFLLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRTtBQUM1QixVQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUN4QyxDQUFDLGdCQUFnQixHQUFFLGtCQXJKZCxJQUFJLEVBcUplLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxRQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNqQjtBQUNELFlBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFDL0I7T0FFRCxlQUFlLEdBQUcsTUFBTSxJQUFJO0FBQzNCLFFBQU0scUJBQXFCLEdBQUcsa0JBQWtCLENBQUE7QUFDaEQsb0JBQWtCLEdBQUcsRUFBRyxDQUFBO0FBQ3hCLFlBQVUsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN6QyxvQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQTtFQUMxQzs7OztBQUdELFNBQVEsR0FBRyxNQUFNLElBQUk7QUFDcEIsWUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUN6QixDQUFBOztBQUVGLE9BQU0sY0FBYyxHQUFHLE1BQ3RCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFLO0FBQ25ELE1BQUksRUFBRSxLQUFLLG1CQXRLWixpQkFBaUIsQUFzS3dCLElBQUksS0FBSyxtQkF0Sy9CLGVBQWUsQUFzSzJDLENBQUEsQUFBQyxFQUFFO0FBQzlFLFNBQU0sVUFBVSxHQUFHLFVBcktyQixPQUFPLEVBcUtzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqRCxPQUFJLFVBQVUsSUFBSSxVQXRLcEIsT0FBTyxFQXNLcUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixHQUFFLGtCQTVLbEQsSUFBSSxFQTRLbUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsS0FDdkUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLE1BQU0sVUExS0gsSUFBSSxFQTBLSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFDbEUsQ0FBQyxpQkFBaUIsR0FBRSxrQkEvS2hCLElBQUksRUErS2lCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUEsS0FFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUNyQyxDQUFDLE1BQU0sR0FBRSxrQkFsTEwsSUFBSSxFQWtMTSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO0dBQ2xEO0VBQ0QsQ0FBQyxDQUFBOztBQUVILFdBbExpRCxhQUFhLFVBa0xwQyxRQUFRLEVBQUU7QUFDbkMsUUFBTSxHQUFHO0FBQ1IsT0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN2QixhQXBMeUIsTUFBTSxFQW9MeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtHQUM3Qjs7QUFFRCxjQUFZLEdBQUc7QUFDZCxTQUFNLEdBQUcsR0FBRyxNQUFNOztBQUVqQixRQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ3RCLFFBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDbkIsQ0FBQTtBQUNELE9BQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFDekIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEtBRXBCLEdBQUcsRUFBRSxDQUFBO0dBQ047O0FBRUQsbUJBQWlCLEdBQUc7O0FBRW5CLE9BQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLE9BQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDbkI7O0FBRUQsVUFBUSxFQUFFLGNBQWM7QUFDeEIsY0FBWSxFQUFFLGNBQWM7O0FBRTVCLFdBQVMsR0FBRztBQUFFLE9BQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQUU7O0FBRTFDLFNBQU8sR0FBRztBQUFFLGNBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBRTs7QUFFckMsZUFBYSxHQUFHO0FBQ2YsU0FBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxhQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0dBQ2pEOztBQUVELGlCQUFlLEdBQUc7QUFDakIsU0FBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxhQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0dBQ25EOztBQUVELFVBQVEsR0FBRztBQUNWLHFCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTTtBQUNwQyxVQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pDLGNBN053QixNQUFNLEVBNk52QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsRSxDQUFDLENBQUE7R0FDRjs7QUFFRCxVQUFRLEVBQUUsbUJBQW1CO0FBQzdCLFVBQVEsRUFBRSxtQkFBbUI7O0FBRTdCLFdBQVMsR0FBRztBQUFFLFdBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtHQUFFOztBQUVuRCxTQUFPLEdBQUc7QUFDVCxlQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEIsVUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sbUJBM09xRCxNQUFNLENBMk96QyxBQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUNwRCxDQUFDLEdBQUUsa0JBOU9HLElBQUksRUE4T0YsS0FBSyxDQUFDLEVBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFBO0dBQzNDOztBQUVELFVBQVEsR0FBRztBQUNWLGVBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQixVQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sbUJBalB1RCxNQUFNLEFBaVAzQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFDakQsQ0FBQyxHQUFFLGtCQXBQRyxJQUFJLEVBb1BGLE9BQU8sQ0FBQyxFQUFDLG1CQUFtQixHQUFFLGtCQXBQaEMsSUFBSSxFQW9QaUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDckQsT0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNuQjs7QUFFRCxNQUFJLEdBQUc7QUFDTixPQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ3BCLE9BQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQ3pCOztBQUVELFFBQU0sR0FBRztBQUFFLGFBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFO0FBQzdCLFlBQVUsRUFBRSxjQUFjO0FBQzFCLFNBQU8sR0FBRztBQUFFLFdBQVEsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDOUMsYUFBVyxFQUFFLGNBQWM7O0FBRTNCLE9BQUssR0FBRztBQUNQLFVBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUE7QUFDakYscUJBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtHQUMxRDs7QUFFRCxPQUFLLEdBQUc7QUFDUCxhQW5ReUIsTUFBTSxFQW1ReEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMvQixPQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixhQXJReUIsTUFBTSxFQXFReEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNsQyxPQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUM1Qjs7QUFFRCxlQUFhLEdBQUc7QUFDZixPQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2xCLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDcEI7QUFDRCxnQkFBYyxHQUFHO0FBQ2hCLE9BQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDbEIsV0FBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0dBQ3BDOztBQUVELFVBQVEsR0FBRztBQUFFLGVBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFOzs7QUFHakMsT0FBSyxHQUFHO0FBQUUsY0FBVyxDQUFDLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQTtHQUFFOztBQUVqQyxVQUFRLEVBQUUsWUFBWTtBQUN0QixXQUFTLEVBQUUsWUFBWTs7QUFFdkIsUUFBTSxHQUFHO0FBQUUscUJBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0dBQUU7O0FBRWxFLE9BQUssR0FBRztBQUFFLFlBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFOztBQUUzQixRQUFNLEdBQUc7QUFBRSxZQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7R0FBRTs7QUFFNUIsS0FBRyxHQUFHO0FBQ0wsa0JBQWUsQ0FBQyxNQUFNO0FBQ3JCLFdBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssbUJBclNQLFFBQVEsQUFxU21CLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFDbkYsdURBQXVELENBQUMsQ0FBQTtBQUN6RCxtQkFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFDakMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNO0FBQ3ZCLFdBQU0sT0FBTyxHQUFHLFVBdlNKLEdBQUcsRUF1U0ssSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNsRSx3QkFBbUIsQ0FBQyxPQUFPLEVBQUUsTUFBTTtBQUNsQyxnQkF4U3FCLE1BQU0sRUF3U3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDekIsVUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNuQixnQkExU3FCLE1BQU0sRUEwU3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUM3QyxZQUFNLFNBQVMsR0FBRyxNQUFNLFVBM1NILE1BQU0sRUEyU0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDM0QsZ0JBN1NtQyxNQUFNLEVBNlNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO01BQ2xFLENBQUMsQ0FBQTtLQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0dBQ0Y7O0FBRUQsY0FBWSxHQUFHLEVBQUc7O0FBRWxCLE1BQUksR0FBRztBQUFFLGtCQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7R0FBRTs7QUFFckQsYUFBVyxHQUFHO0FBQUUsY0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7R0FBRTs7O0FBRzlDLGNBQVksR0FBRztBQUFFLGFBelRTLE1BQU0sRUF5VFIsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtHQUFFOztBQUU5QyxhQUFXLEdBQUc7QUFDYixTQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDcEQsVUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRSxrQkFsVS9DLElBQUksRUFrVWdELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUE7O0FBRXhGLE9BQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDbkI7O0FBRUQsT0FBSyxHQUFHO0FBQ1AsVUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsOENBQThDLENBQUMsQ0FBQTtBQUNuRixPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUN6Qjs7QUFFRCxLQUFHLEdBQUc7QUFBRSxPQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQUU7O0FBRTNCLGVBQWEsR0FBRyxFQUFHOztBQUVuQixVQUFRLEdBQUc7QUFDVixjQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzFCLE9BQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDakIsT0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNqQjs7QUFFRCxRQUFNLEdBQUc7QUFBRSxPQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQUU7O0FBRWpDLFdBQVMsR0FBRztBQUNYLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDcEIsT0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNuQjs7QUFFRCxRQUFNLEdBQUc7QUFDUixPQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ3BCLE9BQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDakI7O0FBRUQsUUFBTSxHQUFHOztBQUVSLE9BQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3pCLGNBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDakQsU0FBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxRQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQzNCLG9CQUFvQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUM5QixhQXBXeUIsTUFBTSxFQW9XeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRTFFLFNBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNyQyxTQUFNLGVBQWUsR0FBRyxJQUFJLElBQUk7QUFDL0IsUUFBSSxJQUFJLG1CQTNXRixNQUFNLEFBMldjLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxRSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxLQUMzQixJQUFJLElBQUksbUJBN1drRCxLQUFLLEFBNld0QyxFQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNwQyxDQUFBO0FBQ0QsT0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7R0FDbkM7O0FBRUQsS0FBRyxHQUFHO0FBQ0wsT0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNsQixPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUN6Qjs7QUFFRCxVQUFRLEdBQUc7QUFDVixjQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzFCLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDcEIsUUFBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUN6QyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUMxQjs7QUFFRCxXQUFTLEdBQUc7QUFDWCxTQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3RCLFFBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtVQUN0QixHQUFHLEdBQVksSUFBSSxDQUFuQixHQUFHO1VBQUUsS0FBSyxHQUFLLElBQUksQ0FBZCxLQUFLOztBQUNsQixXQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLFFBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDYixTQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZDtHQUNEOztBQUVELE9BQUssR0FBRztBQUNQLFFBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFDekIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQ3hCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNaOztBQUVELFdBQVMsR0FBRyxFQUFHOztBQUVmLFlBQVUsR0FBRyxFQUFHOztBQUVoQixPQUFLLEdBQUc7QUFBRSxPQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQUU7O0FBRWxDLE9BQUssR0FBRztBQUNQLGFBblp5QixNQUFNLEVBbVp4QixJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0dBQzdCOztBQUVELEtBQUcsR0FBRzs7O0FBR0wsU0FBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9CLFdBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQ3hDLENBQUMsR0FBRSxrQkFqYUUsSUFBSSxFQWlhRCxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMscUJBQXFCLEdBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUNuRCxzQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNyQixZQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDWCxDQUFBO0FBQ0QsT0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDOUIsYUFqYXlCLE1BQU0sRUFpYXhCLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUE7R0FDdEM7O0FBRUQsT0FBSyxHQUFHO0FBQ1AsVUFBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ25GLE9BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDckI7O0FBRUQsU0FBTyxHQUFHO0FBQ1QsVUFBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ25GLE9BQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDdkI7RUFDRCxDQUFDLENBQUE7O0FBRUYsVUFBUyxjQUFjLEdBQUc7QUFDekIsYUFBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMxQixNQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0VBQ25COztBQUVELFVBQVMsbUJBQW1CLEdBQUc7QUFDOUIsb0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtFQUM3RDs7QUFFRCxVQUFTLGNBQWMsR0FBRztBQUN6QixNQUFJLElBQUksQ0FBQyxJQUFJLG1CQTNiaUMsT0FBTyxBQTJickIsRUFBRTtBQUNqQyxPQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN2QixPQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUM1QixzQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtHQUNqRSxNQUFNO0FBQ04sT0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNsQixPQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQ3BCO0VBQ0Q7O0FBRUQsVUFBUyxZQUFZLEdBQUc7QUFDdkIsTUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNsQixZQXJjMEIsTUFBTSxFQXFjekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMzQixZQXRjMEIsTUFBTSxFQXNjekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUM3Qjs7O0FBR0QsT0FDQyxTQUFTLEdBQUcsT0FBTyxJQUFJO0FBQ3RCLFFBQU0sV0FBVyxHQUFHLE1BQU0sVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUMzRSxZQTljdUMsTUFBTSxFQThjdEMsT0FBTyxDQUFDLFVBQVUsRUFDeEIsQUFBQyxJQUFnQixJQUFLO09BQW5CLE9BQU8sR0FBVCxJQUFnQixDQUFkLE9BQU87T0FBRSxHQUFHLEdBQWQsSUFBZ0IsQ0FBTCxHQUFHOztBQUNkLE1BQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNaLHFCQUFrQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtHQUN4QyxFQUNELFdBQVcsQ0FBQyxDQUFBO0VBQ2I7T0FFRCxZQUFZLEdBQUcsUUFBUSxJQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQztPQUcvRCxVQUFVLEdBQUcsQ0FBQyxJQUFJO0FBQ2pCLFFBQU0sSUFBSSxHQUFHLE1BQU07QUFDbEIsSUFBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdkIsYUE1ZHdCLE1BQU0sRUE0ZHZCLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7R0FDeEIsQ0FBQTtBQUNELFlBL2R1QyxNQUFNLEVBK2R0QyxDQUFDLENBQUMsT0FBTyxFQUNmLENBQUMsSUFBSTtBQUNKLElBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNWLHFCQUFrQixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7R0FDcEMsRUFDRCxJQUFJLENBQUMsQ0FBQTtFQUNOLENBQUE7OztBQUdGLE9BQ0MsZUFBZSxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsS0FBSztBQUN0QyxRQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2hDLFNBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTTtBQUNyRCxTQUFNLFVBQVUsR0FBRyxrQkFoZmIsSUFBSSxFQWdmYyxVQTNlakIsZUFBZSxFQTJla0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakUsVUFBTyxDQUFDLGNBQWMsR0FBRSxrQkFqZmxCLElBQUksRUFpZm1CLElBQUksQ0FBQyxFQUFDLGdCQUFnQixHQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQTtHQUNsRSxDQUFDLENBQUE7QUFDRixTQUFPLE9BQU8sQ0FBQTtFQUNkO09BRUQsYUFBYSxHQUFHLElBQUksSUFDbkIsSUFBSSxtQkFyZjhCLFlBQVksQUFxZmxCLEdBQzNCLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxHQUNqQixJQUFJLG1CQXZmVSxpQkFBaUIsQUF1ZkUsR0FDakMsSUFBSSxDQUFDLFNBQVMsR0FDZCxJQUFJLG1CQXhmOEIsUUFBUSxBQXdmbEIsR0FDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FDMUIsRUFBRztPQUVMLFdBQVcsR0FBRyxLQUFLLElBQUk7Ozs7Ozs7Ozs7QUFVdEIsUUFBTSxTQUFTLEdBQUcsRUFBRyxDQUFBOztBQUVyQixRQUFNLGFBQWEsR0FBRyxJQUFJLElBQUk7QUFDN0IsT0FBSSxJQUFJLG1CQTFnQnVELEtBQUssQUEwZ0IzQyxFQUN4QixXQUFXLENBQUMsTUFBTSxVQXpnQkEsV0FBVyxFQXlnQkMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBLEtBRXpELFVBM2dCa0IsV0FBVyxFQTJnQmpCLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7O0FBRXJDLGlCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEIsYUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUE7R0FDSCxDQUFBO0FBQ0QsWUFqaEJvQixXQUFXLEVBaWhCbkIsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ2pDLG9CQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7OztBQWNyQyxRQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7OztBQUdyQyxRQUFNLFFBQVEsR0FBRyxFQUFHLENBQUE7O0FBRXBCLFFBQU0sVUFBVSxHQUFHLElBQUksSUFBSTtBQUMxQixPQUFJLElBQUksbUJBeGlCdUQsS0FBSyxBQXdpQjNDOzs7QUFHeEIsZUFBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQSxLQUM3QztBQUNKLHFCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3ZCLFNBQUssTUFBTSxRQUFRLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNDLFdBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7QUFDMUIsV0FBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQyxTQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7QUFDM0IsYUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUN6RCxNQUFNLENBQUMsUUFBUSxHQUFFLGtCQXJqQmYsSUFBSSxFQXFqQmdCLElBQUksQ0FBQyxFQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQTtBQUN6RCxjQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO01BQ3ZCO0FBQ0Qsd0JBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzdCLGFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7OztBQUlsQixXQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN2QyxlQTFqQkksTUFBTSxFQTBqQkgsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFBO0tBQzNCO0FBQ0QsUUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2I7R0FDRCxDQUFBOztBQUVELE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7O0FBRXpCLFdBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDOUIsVUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTs7QUFFMUIsU0FBTyxTQUFTLENBQUE7RUFDaEI7T0FFRCxpQkFBaUIsR0FBRyxJQUFJLElBQUk7QUFDM0IsUUFBTSxXQUFXLEdBQ2hCLElBQUksbUJBNWtCa0UsRUFBRSxBQTRrQnREOztBQUVsQixNQUFJLG1CQTlrQnFELElBQUksQUE4a0J6QyxJQUNwQixJQUFJLG1CQTlrQmlELEtBQUssQUE4a0JyQyxJQUNyQixJQUFJLG1CQS9rQndELE9BQU8sQUEra0I1QyxDQUFBO0FBQ3hCLFNBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtFQUN6RSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQXNzaWduU2luZ2xlLCBCbG9ja1ZhbCwgQ2FsbCwgRGVidWcsIERvLCBGb3JWYWwsXG5cdExvY2FsRGVjbGFyZUJ1aWx0LCBMb2NhbERlY2xhcmVSZXMsIE9iakVudHJ5LCBQYXR0ZXJuLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGVhY2hSZXZlcnNlLCBoZWFkLCBpZkVsc2UsIGltcGxlbWVudE1hbnksXG5cdGlzRW1wdHksIGl0ZXJhdG9yVG9BcnJheSwgb3BFYWNoIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMsIHsgTG9jYWxJbmZvIH0gZnJvbSAnLi9WZXJpZnlSZXN1bHRzJ1xuXG4vKlxuVGhlIHZlcmlmaWVyIGdlbmVyYXRlcyBpbmZvcm1hdGlvbiBuZWVkZWQgZHVyaW5nIHRyYW5zcGlsaW5nLCB0aGUgVmVyaWZ5UmVzdWx0cy5cbiovXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIG1zQXN0KSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRsb2NhbHMgPSBuZXcgTWFwKClcblx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gWyBdXG5cdGlzSW5EZWJ1ZyA9IGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRvcExvb3AgPSBudWxsXG5cdHJlc3VsdHMgPSBuZXcgVmVyaWZ5UmVzdWx0cygpXG5cblx0bXNBc3QudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxVc2UoKVxuXG5cdGNvbnN0IHJlcyA9IHJlc3VsdHNcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHRjb250ZXh0ID0gbG9jYWxzID0gb3BMb29wID0gcGVuZGluZ0Jsb2NrTG9jYWxzID0gcmVzdWx0cyA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbi8vIFVzZSBhIHRyaWNrIGxpa2UgaW4gcGFyc2UuanMgYW5kIGhhdmUgZXZlcnl0aGluZyBjbG9zZSBvdmVyIHRoZXNlIG11dGFibGUgdmFyaWFibGVzLlxubGV0XG5cdGNvbnRleHQsXG5cdC8vIE1hcCBmcm9tIG5hbWVzIHRvIExvY2FsRGVjbGFyZXMuXG5cdGxvY2Fscyxcblx0b3BMb29wLFxuXHQvKlxuXHRMb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFRoZXNlIGFyZSBhZGRlZCB0byBsb2NhbHMgd2hlbiBlbnRlcmluZyBhIEZ1bmN0aW9uIG9yIGxhenkgZXZhbHVhdGlvbi5cblx0SW46XG5cdFx0YSA9IHxcblx0XHRcdGJcblx0XHRiID0gMVxuXHRgYmAgd2lsbCBiZSBhIHBlbmRpbmcgbG9jYWwuXG5cdEhvd2V2ZXI6XG5cdFx0YSA9IGJcblx0XHRiID0gMVxuXHR3aWxsIGZhaWwgdG8gdmVyaWZ5LCBiZWNhdXNlIGBiYCBjb21lcyBhZnRlciBgYWAgYW5kIGlzIG5vdCBhY2Nlc3NlZCBpbnNpZGUgYSBmdW5jdGlvbi5cblx0SXQgd291bGQgd29yayBmb3IgYH5hIGlzIGJgLCB0aG91Z2guXG5cdCovXG5cdHBlbmRpbmdCbG9ja0xvY2Fscyxcblx0aXNJbkRlYnVnLFxuXHQvLyBXaGV0aGVyIHdlIGFyZSBjdXJyZW50bHkgYWJsZSB0byB5aWVsZC5cblx0aXNJbkdlbmVyYXRvcixcblx0cmVzdWx0c1xuXG5jb25zdFxuXHR2ZXJpZnkgPSBtc0FzdCA9PiBtc0FzdC52ZXJpZnkoKSxcblxuXHRkZWxldGVMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5kZWxldGUobG9jYWxEZWNsYXJlLm5hbWUpLFxuXG5cdHNldExvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxzLnNldChsb2NhbERlY2xhcmUubmFtZSwgbG9jYWxEZWNsYXJlKSxcblxuXHQvLyBXaGVuIGEgbG9jYWwgaXMgcmV0dXJuZWQgZnJvbSBhIEJsb2NrT2JqIG9yIE1vZHVsZSxcblx0Ly8gdGhlIHJldHVybiAnYWNjZXNzJyBpcyBjb25zaWRlcmVkIHRvIGJlICdkZWJ1ZycgaWYgdGhlIGxvY2FsIGlzLlxuXHRhY2Nlc3NMb2NhbEZvclJldHVybiA9IChkZWNsYXJlLCBhY2Nlc3MpID0+IHtcblx0XHRjb25zdCBpbmZvID0gcmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGRlY2xhcmUpXG5cdFx0X2FkZExvY2FsQWNjZXNzKGluZm8sIGFjY2VzcywgaW5mby5pc0luRGVidWcpXG5cdH0sXG5cblx0YWNjZXNzTG9jYWwgPSAoYWNjZXNzLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGdldExvY2FsRGVjbGFyZShuYW1lLCBhY2Nlc3MubG9jKVxuXHRcdHJlc3VsdHMubG9jYWxBY2Nlc3NUb0RlY2xhcmUuc2V0KGFjY2VzcywgZGVjbGFyZSlcblx0XHRfYWRkTG9jYWxBY2Nlc3MocmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGRlY2xhcmUpLCBhY2Nlc3MsIGlzSW5EZWJ1Zylcblx0fSxcblxuXHRfYWRkTG9jYWxBY2Nlc3MgPSAobG9jYWxJbmZvLCBhY2Nlc3MsIGlzRGVidWdBY2Nlc3MpID0+XG5cdFx0KGlzRGVidWdBY2Nlc3MgPyBsb2NhbEluZm8uZGVidWdBY2Nlc3NlcyA6IGxvY2FsSW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5wdXNoKGFjY2VzcyksXG5cblx0Ly8gRm9yIGV4cHJlc3Npb25zIGFmZmVjdGluZyBsaW5lTmV3TG9jYWxzLCB0aGV5IHdpbGwgYmUgcmVnaXN0ZXJlZCBiZWZvcmUgYmVpbmcgdmVyaWZpZWQuXG5cdC8vIFNvLCBMb2NhbERlY2xhcmUudmVyaWZ5IGp1c3QgdGhlIHR5cGUuXG5cdC8vIEZvciBsb2NhbHMgbm90IGFmZmVjdGluZyBsaW5lTmV3TG9jYWxzLCB1c2UgdGhpcyBpbnN0ZWFkIG9mIGp1c3QgZGVjbGFyZS52ZXJpZnkoKVxuXHR2ZXJpZnlMb2NhbERlY2xhcmUgPSBsb2NhbERlY2xhcmUgPT4ge1xuXHRcdHJlZ2lzdGVyTG9jYWwobG9jYWxEZWNsYXJlKVxuXHRcdGxvY2FsRGVjbGFyZS52ZXJpZnkoKVxuXHR9LFxuXG5cdHJlZ2lzdGVyTG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5zZXQobG9jYWxEZWNsYXJlLCBMb2NhbEluZm8uZW1wdHkoaXNJbkRlYnVnKSlcblxuLy8gVGhlc2UgZnVuY3Rpb25zIGNoYW5nZSB2ZXJpZmllciBzdGF0ZSBhbmQgZWZmaWNpZW50bHkgcmV0dXJuIHRvIHRoZSBvbGQgc3RhdGUgd2hlbiBmaW5pc2hlZC5cbmNvbnN0XG5cdHdpdGhJbkRlYnVnID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRJc0luRGVidWcgPSBpc0luRGVidWdcblx0XHRpc0luRGVidWcgPSB0cnVlXG5cdFx0YWN0aW9uKClcblx0XHRpc0luRGVidWcgPSBvbGRJc0luRGVidWdcblx0fSxcblxuXHR3aXRoSW5HZW5lcmF0b3IgPSAobmV3SXNJbkdlbmVyYXRvciwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkdlbmVyYXRvciA9IGlzSW5HZW5lcmF0b3Jcblx0XHRpc0luR2VuZXJhdG9yID0gbmV3SXNJbkdlbmVyYXRvclxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZElzSW5HZW5lcmF0b3Jcblx0fSxcblxuXHR3aXRoSW5Mb29wID0gKG5ld0xvb3AsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZExvb3AgPSBvcExvb3Bcblx0XHRvcExvb3AgPSBuZXdMb29wXG5cdFx0YWN0aW9uKClcblx0XHRvcExvb3AgPSBvbGRMb29wXG5cdH0sXG5cblx0cGx1c0xvY2FsID0gKGFkZGVkTG9jYWwsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IHNoYWRvd2VkID0gbG9jYWxzLmdldChhZGRlZExvY2FsLm5hbWUpXG5cdFx0bG9jYWxzLnNldChhZGRlZExvY2FsLm5hbWUsIGFkZGVkTG9jYWwpXG5cdFx0YWN0aW9uKClcblx0XHRpZiAoc2hhZG93ZWQgPT09IHVuZGVmaW5lZClcblx0XHRcdGRlbGV0ZUxvY2FsKGFkZGVkTG9jYWwpXG5cdFx0ZWxzZVxuXHRcdFx0c2V0TG9jYWwoc2hhZG93ZWQpXG5cdH0sXG5cblx0Ly8gU2hvdWxkIGhhdmUgdmVyaWZpZWQgdGhhdCBhZGRlZExvY2FscyBhbGwgaGF2ZSBkaWZmZXJlbnQgbmFtZXMuXG5cdHBsdXNMb2NhbHMgPSAoYWRkZWRMb2NhbHMsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IHNoYWRvd2VkTG9jYWxzID0gWyBdXG5cdFx0Zm9yIChjb25zdCBfIG9mIGFkZGVkTG9jYWxzKSB7XG5cdFx0XHRjb25zdCBzaGFkb3dlZCA9IGxvY2Fscy5nZXQoXy5uYW1lKVxuXHRcdFx0aWYgKHNoYWRvd2VkICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdHNoYWRvd2VkTG9jYWxzLnB1c2goc2hhZG93ZWQpXG5cdFx0XHRzZXRMb2NhbChfKVxuXHRcdH1cblxuXHRcdGFjdGlvbigpXG5cblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKGRlbGV0ZUxvY2FsKVxuXHRcdHNoYWRvd2VkTG9jYWxzLmZvckVhY2goc2V0TG9jYWwpXG5cdH0sXG5cblx0dmVyaWZ5QW5kUGx1c0xvY2FsID0gKGFkZGVkTG9jYWwsIGFjdGlvbikgPT4ge1xuXHRcdHZlcmlmeUxvY2FsRGVjbGFyZShhZGRlZExvY2FsKVxuXHRcdHBsdXNMb2NhbChhZGRlZExvY2FsLCBhY3Rpb24pXG5cdH0sXG5cblx0dmVyaWZ5QW5kUGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaCh2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0Y29uc3QgbmFtZXMgPSBuZXcgU2V0KClcblx0XHRmb3IgKGNvbnN0IF8gb2YgYWRkZWRMb2NhbHMpIHtcblx0XHRcdGNvbnRleHQuY2hlY2soIW5hbWVzLmhhcyhfLm5hbWUpLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0YER1cGxpY2F0ZSBsb2NhbCAke2NvZGUoXy5uYW1lKX1gKVxuXHRcdFx0bmFtZXMuYWRkKF8ubmFtZSlcblx0XHR9XG5cdFx0cGx1c0xvY2FscyhhZGRlZExvY2FscywgYWN0aW9uKVxuXHR9LFxuXG5cdHdpdGhCbG9ja0xvY2FscyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkUGVuZGluZ0Jsb2NrTG9jYWxzID0gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gWyBdXG5cdFx0cGx1c0xvY2FscyhvbGRQZW5kaW5nQmxvY2tMb2NhbHMsIGFjdGlvbilcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBvbGRQZW5kaW5nQmxvY2tMb2NhbHNcblx0fSxcblxuXHQvLyBDYW4ndCBicmVhayBvdXQgb2YgbG9vcCBpbnNpZGUgb2YgSUlGRS5cblx0d2l0aElJRkUgPSBhY3Rpb24gPT4ge1xuXHRcdHdpdGhJbkxvb3AoZmFsc2UsIGFjdGlvbilcblx0fVxuXG5jb25zdCB2ZXJpZnlMb2NhbFVzZSA9ICgpID0+XG5cdHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmZvckVhY2goKGluZm8sIGxvY2FsKSA9PiB7XG5cdFx0aWYgKCEobG9jYWwgaW5zdGFuY2VvZiBMb2NhbERlY2xhcmVCdWlsdCB8fCBsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZVJlcykpIHtcblx0XHRcdGNvbnN0IG5vTm9uRGVidWcgPSBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3Nlcylcblx0XHRcdGlmIChub05vbkRlYnVnICYmIGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSlcblx0XHRcdFx0Y29udGV4dC53YXJuKGxvY2FsLmxvYywgKCkgPT4gYFVudXNlZCBsb2NhbCB2YXJpYWJsZSAke2NvZGUobG9jYWwubmFtZSl9LmApXG5cdFx0XHRlbHNlIGlmIChpbmZvLmlzSW5EZWJ1Zylcblx0XHRcdFx0Y29udGV4dC53YXJuSWYoIW5vTm9uRGVidWcsICgpID0+IGhlYWQoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5sb2MsICgpID0+XG5cdFx0XHRcdFx0YERlYnVnLW9ubHkgbG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG91dHNpZGUgb2YgZGVidWcuYClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29udGV4dC53YXJuSWYobm9Ob25EZWJ1ZywgbG9jYWwubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBMb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb25seSBpbiBkZWJ1Zy5gKVxuXHRcdH1cblx0fSlcblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndmVyaWZ5Jywge1xuXHRBc3NlcnQoKSB7XG5cdFx0dGhpcy5jb25kaXRpb24udmVyaWZ5KClcblx0XHRvcEVhY2godGhpcy5vcFRocm93biwgdmVyaWZ5KVxuXHR9LFxuXG5cdEFzc2lnblNpbmdsZSgpIHtcblx0XHRjb25zdCBkb1YgPSAoKSA9PiB7XG5cdFx0XHQvLyBBc3NpZ25lZSByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdFx0dGhpcy5hc3NpZ25lZS52ZXJpZnkoKVxuXHRcdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHRcdH1cblx0XHRpZiAodGhpcy5hc3NpZ25lZS5pc0xhenkoKSlcblx0XHRcdHdpdGhCbG9ja0xvY2Fscyhkb1YpXG5cdFx0ZWxzZVxuXHRcdFx0ZG9WKClcblx0fSxcblxuXHRBc3NpZ25EZXN0cnVjdHVyZSgpIHtcblx0XHQvLyBBc3NpZ25lZXMgcmVnaXN0ZXJlZCBieSB2ZXJpZnlMaW5lcy5cblx0XHR0aGlzLmFzc2lnbmVlcy5mb3JFYWNoKHZlcmlmeSlcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0QmFnRW50cnk6IHZlcmlmeUJhZ0VudHJ5LFxuXHRCYWdFbnRyeU1hbnk6IHZlcmlmeUJhZ0VudHJ5LFxuXG5cdEJhZ1NpbXBsZSgpIHsgdGhpcy5wYXJ0cy5mb3JFYWNoKHZlcmlmeSkgfSxcblxuXHRCbG9ja0RvKCkgeyB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKSB9LFxuXG5cdEJsb2NrVmFsVGhyb3coKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5fdGhyb3cudmVyaWZ5KCkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKCkge1xuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0cGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IHRoaXMucmV0dXJuZWQudmVyaWZ5KCkpXG5cdH0sXG5cblx0QmxvY2tPYmooKSB7XG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuYnVpbHQsICgpID0+IHtcblx0XHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0XHRvcEVhY2godGhpcy5vcE9iamVkLCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblx0XHR9KVxuXHR9LFxuXG5cdEJsb2NrQmFnOiB2ZXJpZnlCbG9ja0JhZ09yTWFwLFxuXHRCbG9ja01hcDogdmVyaWZ5QmxvY2tCYWdPck1hcCxcblxuXHRCbG9ja1dyYXAoKSB7IHdpdGhJSUZFKCgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpIH0sXG5cblx0QnJlYWtEbygpIHtcblx0XHR2ZXJpZnlJbkxvb3AodGhpcylcblx0XHRjb250ZXh0LmNoZWNrKCEob3BMb29wIGluc3RhbmNlb2YgRm9yVmFsKSwgdGhpcy5sb2MsICgpID0+XG5cdFx0XHRgJHtjb2RlKCdmb3InKX0gbXVzdCBicmVhayB3aXRoIGEgdmFsdWUuYClcblx0fSxcblxuXHRCcmVha1ZhbCgpIHtcblx0XHR2ZXJpZnlJbkxvb3AodGhpcylcblx0XHRjb250ZXh0LmNoZWNrKG9wTG9vcCBpbnN0YW5jZW9mIEZvclZhbCwgdGhpcy5sb2MsICgpID0+XG5cdFx0XHRgJHtjb2RlKCdicmVhaycpfSBvbmx5IHZhbGlkIGluc2lkZSAke2NvZGUoJ2ZvcicpfWApXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdENhbGwoKSB7XG5cdFx0dGhpcy5jYWxsZWQudmVyaWZ5KClcblx0XHR0aGlzLmFyZ3MuZm9yRWFjaCh2ZXJpZnkpXG5cdH0sXG5cblx0Q2FzZURvKCkgeyB2ZXJpZnlDYXNlKHRoaXMpIH0sXG5cdENhc2VEb1BhcnQ6IHZlcmlmeUNhc2VQYXJ0LFxuXHRDYXNlVmFsKCkgeyB3aXRoSUlGRSgoKSA9PiB2ZXJpZnlDYXNlKHRoaXMpKSB9LFxuXHRDYXNlVmFsUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cblx0Q2F0Y2goKSB7XG5cdFx0Y29udGV4dC5jaGVjayh0aGlzLmNhdWdodC5vcFR5cGUgPT09IG51bGwsIHRoaXMuY2F1Z2h0LmxvYywgJ1RPRE86IENhdWdodCB0eXBlcycpXG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuY2F1Z2h0LCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKVxuXHR9LFxuXG5cdENsYXNzKCkge1xuXHRcdG9wRWFjaCh0aGlzLnN1cGVyQ2xhc3MsIHZlcmlmeSlcblx0XHR0aGlzLnN0YXRpY3MuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0b3BFYWNoKHRoaXMub3BDb25zdHJ1Y3RvciwgdmVyaWZ5KVxuXHRcdHRoaXMubWV0aG9kcy5mb3JFYWNoKHZlcmlmeSlcblx0fSxcblxuXHRDb25kaXRpb25hbERvKCkge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHRoaXMucmVzdWx0LnZlcmlmeSgpXG5cdH0sXG5cdENvbmRpdGlvbmFsVmFsKCkge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHdpdGhJSUZFKCgpID0+IHRoaXMucmVzdWx0LnZlcmlmeSgpKVxuXHR9LFxuXG5cdENvbnRpbnVlKCkgeyB2ZXJpZnlJbkxvb3AodGhpcykgfSxcblxuXHQvLyBPbmx5IHJlYWNoIGhlcmUgZm9yIGluL291dCBjb25kaXRpb24uXG5cdERlYnVnKCkgeyB2ZXJpZnlMaW5lcyhbIHRoaXMgXSkgfSxcblxuXHRFeGNlcHREbzogdmVyaWZ5RXhjZXB0LFxuXHRFeGNlcHRWYWw6IHZlcmlmeUV4Y2VwdCxcblxuXHRGb3JCYWcoKSB7IHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmJ1aWx0LCAoKSA9PiB2ZXJpZnlGb3IodGhpcykpIH0sXG5cblx0Rm9yRG8oKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZvclZhbCgpIHsgdmVyaWZ5Rm9yKHRoaXMpIH0sXG5cblx0RnVuKCkge1xuXHRcdHdpdGhCbG9ja0xvY2FscygoKSA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRoaXMub3BEZWNsYXJlUmVzID09PSBudWxsIHx8IHRoaXMuYmxvY2sgaW5zdGFuY2VvZiBCbG9ja1ZhbCwgdGhpcy5sb2MsXG5cdFx0XHRcdCdGdW5jdGlvbiB3aXRoIHJldHVybiBjb25kaXRpb24gbXVzdCByZXR1cm4gc29tZXRoaW5nLicpXG5cdFx0XHR3aXRoSW5HZW5lcmF0b3IodGhpcy5pc0dlbmVyYXRvciwgKCkgPT5cblx0XHRcdFx0d2l0aEluTG9vcChmYWxzZSwgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFsbEFyZ3MgPSBjYXQodGhpcy5vcERlY2xhcmVUaGlzLCB0aGlzLmFyZ3MsIHRoaXMub3BSZXN0QXJnKVxuXHRcdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbHMoYWxsQXJncywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BJbiwgdmVyaWZ5KVxuXHRcdFx0XHRcdFx0dGhpcy5ibG9jay52ZXJpZnkoKVxuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BEZWNsYXJlUmVzLCB2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0XHRcdFx0XHRjb25zdCB2ZXJpZnlPdXQgPSAoKSA9PiBvcEVhY2godGhpcy5vcE91dCwgXyA9PiBfLnZlcmlmeSgpKVxuXHRcdFx0XHRcdFx0aWZFbHNlKHRoaXMub3BEZWNsYXJlUmVzLCBfID0+IHBsdXNMb2NhbChfLCB2ZXJpZnlPdXQpLCB2ZXJpZnlPdXQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSkpXG5cdFx0fSlcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IH0sXG5cblx0TGF6eSgpIHsgd2l0aEJsb2NrTG9jYWxzKCgpID0+IHRoaXMudmFsdWUudmVyaWZ5KCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IGFjY2Vzc0xvY2FsKHRoaXMsIHRoaXMubmFtZSkgfSxcblxuXHQvLyBBZGRpbmcgTG9jYWxEZWNsYXJlcyB0byB0aGUgYXZhaWxhYmxlIGxvY2FscyBpcyBkb25lIGJ5IEZ1biBvciBsaW5lTmV3TG9jYWxzLlxuXHRMb2NhbERlY2xhcmUoKSB7IG9wRWFjaCh0aGlzLm9wVHlwZSwgdmVyaWZ5KSB9LFxuXG5cdExvY2FsTXV0YXRlKCkge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUodGhpcy5uYW1lLCB0aGlzLmxvYylcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUuaXNNdXRhYmxlKCksIHRoaXMubG9jLCAoKSA9PiBgJHtjb2RlKHRoaXMubmFtZSl9IGlzIG5vdCBtdXRhYmxlLmApXG5cdFx0Ly8gVE9ETzogVHJhY2sgbXV0YXRpb25zLiBNdXRhYmxlIGxvY2FsIG11c3QgYmUgbXV0YXRlZCBzb21ld2hlcmUuXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdExvZ2ljKCkge1xuXHRcdGNvbnRleHQuY2hlY2sodGhpcy5hcmdzLmxlbmd0aCA+IDEsICdMb2dpYyBleHByZXNzaW9uIG5lZWRzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdE5vdCgpIHsgdGhpcy5hcmcudmVyaWZ5KCkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkgeyB9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5rZXkudmVyaWZ5KClcblx0XHR0aGlzLnZhbC52ZXJpZnkoKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgdGhpcy5vYmplY3QudmVyaWZ5KCkgfSxcblxuXHRNZW1iZXJTZXQoKSB7XG5cdFx0dGhpcy5vYmplY3QudmVyaWZ5KClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0TWV0aG9kKCkge1xuXHRcdHRoaXMuc3ltYm9sLnZlcmlmeSgpXG5cdFx0dGhpcy5mdW4udmVyaWZ5KClcblx0fSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Ly8gTm8gbmVlZCB0byB2ZXJpZnkgdGhpcy5kb1VzZXMuXG5cdFx0dGhpcy51c2VzLmZvckVhY2godmVyaWZ5KVxuXHRcdHdpdGhJbkRlYnVnKCgpID0+IHRoaXMuZGVidWdVc2VzLmZvckVhY2godmVyaWZ5KSlcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLmV4cG9ydHMpXG5cdFx0XHRhY2Nlc3NMb2NhbEZvclJldHVybihfLCB0aGlzKVxuXHRcdG9wRWFjaCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gXy52ZXJpZnkoKSkpXG5cblx0XHRjb25zdCBleHBvcnRzID0gbmV3IFNldCh0aGlzLmV4cG9ydHMpXG5cdFx0Y29uc3QgbWFya0V4cG9ydExpbmVzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmFsbEFzc2lnbmVlcygpLnNvbWUoXyA9PiBleHBvcnRzLmhhcyhfKSkpXG5cdFx0XHRcdHJlc3VsdHMuZXhwb3J0QXNzaWducy5hZGQobGluZSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0XHR9XG5cdFx0dGhpcy5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0fSxcblxuXHROZXcoKSB7XG5cdFx0dGhpcy50eXBlLnZlcmlmeSgpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdE9iakVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5hc3NpZ24udmVyaWZ5KClcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5hc3NpZ24uYWxsQXNzaWduZWVzKCkpXG5cdFx0XHRhY2Nlc3NMb2NhbCh0aGlzLCBfLm5hbWUpXG5cdH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdGNvbnN0IGtleXMgPSBuZXcgU2V0KClcblx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgdGhpcy5wYWlycykge1xuXHRcdFx0Y29uc3QgeyBrZXksIHZhbHVlIH0gPSBwYWlyXG5cdFx0XHRjb250ZXh0LmNoZWNrKCFrZXlzLmhhcyhrZXkpLCBwYWlyLmxvYywgKCkgPT4gYER1cGxpY2F0ZSBrZXkgJHtrZXl9YClcblx0XHRcdGtleXMuYWRkKGtleSlcblx0XHRcdHZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLnBhcnRzKVxuXHRcdFx0aWYgKHR5cGVvZiBfICE9PSAnc3RyaW5nJylcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHsgfSxcblxuXHRTcGVjaWFsVmFsKCkgeyB9LFxuXG5cdFNwbGF0KCkgeyB0aGlzLnNwbGF0dGVkLnZlcmlmeSgpIH0sXG5cblx0VGhyb3coKSB7XG5cdFx0b3BFYWNoKHRoaXMub3BUaHJvd24sIHZlcmlmeSlcblx0fSxcblxuXHRVc2UoKSB7XG5cdFx0Ly8gU2luY2UgVXNlcyBhcmUgYWx3YXlzIGluIHRoZSBvdXRlcm1vc3Qgc2NvcGUsIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgc2hhZG93aW5nLlxuXHRcdC8vIFNvIHdlIG11dGF0ZSBgbG9jYWxzYCBkaXJlY3RseS5cblx0XHRjb25zdCBhZGRVc2VMb2NhbCA9IF8gPT4ge1xuXHRcdFx0Y29uc3QgcHJldiA9IGxvY2Fscy5nZXQoXy5uYW1lKVxuXHRcdFx0Y29udGV4dC5jaGVjayhwcmV2ID09PSB1bmRlZmluZWQsIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRgJHtjb2RlKF8ubmFtZSl9IGFscmVhZHkgaW1wb3J0ZWQgYXQgJHtwcmV2LmxvY31gKVxuXHRcdFx0dmVyaWZ5TG9jYWxEZWNsYXJlKF8pXG5cdFx0XHRzZXRMb2NhbChfKVxuXHRcdH1cblx0XHR0aGlzLnVzZWQuZm9yRWFjaChhZGRVc2VMb2NhbClcblx0XHRvcEVhY2godGhpcy5vcFVzZURlZmF1bHQsIGFkZFVzZUxvY2FsKVxuXHR9LFxuXG5cdFlpZWxkKCkge1xuXHRcdGNvbnRleHQuY2hlY2soaXNJbkdlbmVyYXRvciwgdGhpcy5sb2MsICdDYW5ub3QgeWllbGQgb3V0c2lkZSBvZiBnZW5lcmF0b3IgY29udGV4dCcpXG5cdFx0dGhpcy55aWVsZGVkLnZlcmlmeSgpXG5cdH0sXG5cblx0WWllbGRUbygpIHtcblx0XHRjb250ZXh0LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZFRvLnZlcmlmeSgpXG5cdH1cbn0pXG5cbmZ1bmN0aW9uIHZlcmlmeUJhZ0VudHJ5KCkge1xuXHRhY2Nlc3NMb2NhbCh0aGlzLCAnYnVpbHQnKVxuXHR0aGlzLnZhbHVlLnZlcmlmeSgpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUJsb2NrQmFnT3JNYXAoKSB7XG5cdHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmJ1aWx0LCAoKSA9PiB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKSlcbn1cblxuZnVuY3Rpb24gdmVyaWZ5Q2FzZVBhcnQoKSB7XG5cdGlmICh0aGlzLnRlc3QgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG5cdFx0dGhpcy50ZXN0LnR5cGUudmVyaWZ5KClcblx0XHR0aGlzLnRlc3QucGF0dGVybmVkLnZlcmlmeSgpXG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2Fscyh0aGlzLnRlc3QubG9jYWxzLCAoKSA9PiB0aGlzLnJlc3VsdC52ZXJpZnkoKSlcblx0fSBlbHNlIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR0aGlzLnJlc3VsdC52ZXJpZnkoKVxuXHR9XG59XG5cbmZ1bmN0aW9uIHZlcmlmeUV4Y2VwdCgpIHtcblx0dGhpcy5fdHJ5LnZlcmlmeSgpXG5cdG9wRWFjaCh0aGlzLl9jYXRjaCwgdmVyaWZ5KVxuXHRvcEVhY2godGhpcy5fZmluYWxseSwgdmVyaWZ5KVxufVxuXG4vLyBIZWxwZXJzIHNwZWNpZmljIHRvIGNlcnRhaW4gTXNBc3QgdHlwZXM6XG5jb25zdFxuXHR2ZXJpZnlGb3IgPSBmb3JMb29wID0+IHtcblx0XHRjb25zdCB2ZXJpZnlCbG9jayA9ICgpID0+IHdpdGhJbkxvb3AoZm9yTG9vcCwgKCkgPT4gZm9yTG9vcC5ibG9jay52ZXJpZnkoKSlcblx0XHRpZkVsc2UoZm9yTG9vcC5vcEl0ZXJhdGVlLFxuXHRcdFx0KHsgZWxlbWVudCwgYmFnIH0pID0+IHtcblx0XHRcdFx0YmFnLnZlcmlmeSgpXG5cdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbChlbGVtZW50LCB2ZXJpZnlCbG9jaylcblx0XHRcdH0sXG5cdFx0XHR2ZXJpZnlCbG9jaylcblx0fSxcblxuXHR2ZXJpZnlJbkxvb3AgPSBsb29wVXNlciA9PlxuXHRcdGNvbnRleHQuY2hlY2sob3BMb29wICE9PSBudWxsLCBsb29wVXNlci5sb2MsICdOb3QgaW4gYSBsb29wLicpLFxuXG5cblx0dmVyaWZ5Q2FzZSA9IF8gPT4ge1xuXHRcdGNvbnN0IGRvSXQgPSAoKSA9PiB7XG5cdFx0XHRfLnBhcnRzLmZvckVhY2godmVyaWZ5KVxuXHRcdFx0b3BFYWNoKF8ub3BFbHNlLCB2ZXJpZnkpXG5cdFx0fVxuXHRcdGlmRWxzZShfLm9wQ2FzZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHRcdFx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwoXy5hc3NpZ25lZSwgZG9JdClcblx0XHRcdH0sXG5cdFx0XHRkb0l0KVxuXHR9XG5cbi8vIEdlbmVyYWwgdXRpbGl0aWVzOlxuY29uc3Rcblx0Z2V0TG9jYWxEZWNsYXJlID0gKG5hbWUsIGFjY2Vzc0xvYykgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlICE9PSB1bmRlZmluZWQsIGFjY2Vzc0xvYywgKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hvd0xvY2FscyA9IGNvZGUoaXRlcmF0b3JUb0FycmF5KGxvY2Fscy5rZXlzKCkpLmpvaW4oJyAnKSlcblx0XHRcdHJldHVybiBgTm8gc3VjaCBsb2NhbCAke2NvZGUobmFtZSl9LlxcbkxvY2FscyBhcmU6XFxuJHtzaG93TG9jYWxzfS5gXG5cdFx0fSlcblx0XHRyZXR1cm4gZGVjbGFyZVxuXHR9LFxuXG5cdGxpbmVOZXdMb2NhbHMgPSBsaW5lID0+XG5cdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnblNpbmdsZSA/XG5cdFx0XHRbIGxpbmUuYXNzaWduZWUgXSA6XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQXNzaWduRGVzdHJ1Y3R1cmUgP1xuXHRcdFx0bGluZS5hc3NpZ25lZXMgOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIE9iakVudHJ5ID9cblx0XHRcdGxpbmVOZXdMb2NhbHMobGluZS5hc3NpZ24pIDpcblx0XHRcdFsgXSxcblxuXHR2ZXJpZnlMaW5lcyA9IGxpbmVzID0+IHtcblx0XHQvKlxuXHRcdFdlIG5lZWQgdG8gYmV0IGFsbCBibG9jayBsb2NhbHMgdXAtZnJvbnQgYmVjYXVzZVxuXHRcdEZ1bmN0aW9ucyB3aXRoaW4gbGluZXMgY2FuIGFjY2VzcyBsb2NhbHMgZnJvbSBsYXRlciBsaW5lcy5cblx0XHROT1RFOiBXZSBwdXNoIHRoZXNlIG9udG8gcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHJldmVyc2Vcblx0XHRzbyB0aGF0IHdoZW4gd2UgaXRlcmF0ZSB0aHJvdWdoIGxpbmVzIGZvcndhcmRzLCB3ZSBjYW4gcG9wIGZyb20gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0dG8gcmVtb3ZlIHBlbmRpbmcgbG9jYWxzIGFzIHRoZXkgYmVjb21lIHJlYWwgbG9jYWxzLlxuXHRcdEl0IGRvZXNuJ3QgcmVhbGx5IG1hdHRlciB3aGF0IG9yZGVyIHdlIGFkZCBsb2NhbHMgaW4gc2luY2UgaXQncyBub3QgYWxsb3dlZFxuXHRcdHRvIGhhdmUgdHdvIGxvY2FscyBvZiB0aGUgc2FtZSBuYW1lIGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdCovXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gWyBdXG5cblx0XHRjb25zdCBnZXRMaW5lTG9jYWxzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBlYWNoUmV2ZXJzZShsaW5lLmxpbmVzLCBnZXRMaW5lTG9jYWxzKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZWFjaFJldmVyc2UobGluZU5ld0xvY2FscyhsaW5lKSwgXyA9PiB7XG5cdFx0XHRcdFx0Ly8gUmVnaXN0ZXIgdGhlIGxvY2FsIG5vdy4gQ2FuJ3Qgd2FpdCB1bnRpbCB0aGUgYXNzaWduIGlzIHZlcmlmaWVkLlxuXHRcdFx0XHRcdHJlZ2lzdGVyTG9jYWwoXylcblx0XHRcdFx0XHRuZXdMb2NhbHMucHVzaChfKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRlYWNoUmV2ZXJzZShsaW5lcywgZ2V0TGluZUxvY2Fscylcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMucHVzaCguLi5uZXdMb2NhbHMpXG5cblx0XHQvKlxuXHRcdEtlZXBzIHRyYWNrIG9mIGxvY2FscyB3aGljaCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCBpbiB0aGlzIGJsb2NrLlxuXHRcdE1hc29uIGFsbG93cyBzaGFkb3dpbmcsIGJ1dCBub3Qgd2l0aGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdFNvLCB0aGlzIGlzIGFsbG93ZWQ6XG5cdFx0XHRhID0gMVxuXHRcdFx0YiA9XG5cdFx0XHRcdGEgPSAyXG5cdFx0XHRcdC4uLlxuXHRcdEJ1dCBub3Q6XG5cdFx0XHRhID0gMVxuXHRcdFx0YSA9IDJcblx0XHQqL1xuXHRcdGNvbnN0IHRoaXNCbG9ja0xvY2FsTmFtZXMgPSBuZXcgU2V0KClcblxuXHRcdC8vIEFsbCBzaGFkb3dlZCBsb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBbIF1cblxuXHRcdGNvbnN0IHZlcmlmeUxpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdC8vIFRPRE86IERvIGFueXRoaW5nIGluIHRoaXMgc2l0dWF0aW9uP1xuXHRcdFx0XHQvLyBjb250ZXh0LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ1JlZHVuZGFudCBgZGVidWdgLicpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKCgpID0+IGxpbmUubGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2ZXJpZnlJc1N0YXRlbWVudChsaW5lKVxuXHRcdFx0XHRmb3IgKGNvbnN0IG5ld0xvY2FsIG9mIGxpbmVOZXdMb2NhbHMobGluZSkpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gbmV3TG9jYWwubmFtZVxuXHRcdFx0XHRcdGNvbnN0IG9sZExvY2FsID0gbG9jYWxzLmdldChuYW1lKVxuXHRcdFx0XHRcdGlmIChvbGRMb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCF0aGlzQmxvY2tMb2NhbE5hbWVzLmhhcyhuYW1lKSwgbmV3TG9jYWwubG9jLFxuXHRcdFx0XHRcdFx0XHQoKSA9PiBgQSBsb2NhbCAke2NvZGUobmFtZSl9IGlzIGFscmVhZHkgaW4gdGhpcyBibG9jay5gKVxuXHRcdFx0XHRcdFx0c2hhZG93ZWQucHVzaChvbGRMb2NhbClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpc0Jsb2NrTG9jYWxOYW1lcy5hZGQobmFtZSlcblx0XHRcdFx0XHRzZXRMb2NhbChuZXdMb2NhbClcblxuXHRcdFx0XHRcdC8vIE5vdyB0aGF0IGl0J3MgYWRkZWQgYXMgYSBsb2NhbCwgaXQncyBubyBsb25nZXIgcGVuZGluZy5cblx0XHRcdFx0XHQvLyBXZSBhZGRlZCBwZW5kaW5nQmxvY2tMb2NhbHMgaW4gdGhlIHJpZ2h0IG9yZGVyIHRoYXQgd2UgY2FuIGp1c3QgcG9wIHRoZW0gb2ZmLlxuXHRcdFx0XHRcdGNvbnN0IHBvcHBlZCA9IHBlbmRpbmdCbG9ja0xvY2Fscy5wb3AoKVxuXHRcdFx0XHRcdGFzc2VydChwb3BwZWQgPT09IG5ld0xvY2FsKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGxpbmUudmVyaWZ5KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsaW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpXG5cblx0XHRuZXdMb2NhbHMuZm9yRWFjaChkZWxldGVMb2NhbClcblx0XHRzaGFkb3dlZC5mb3JFYWNoKHNldExvY2FsKVxuXG5cdFx0cmV0dXJuIG5ld0xvY2Fsc1xuXHR9LFxuXG5cdHZlcmlmeUlzU3RhdGVtZW50ID0gbGluZSA9PiB7XG5cdFx0Y29uc3QgaXNTdGF0ZW1lbnQgPVxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIERvIHx8XG5cdFx0XHQvLyBTb21lIHZhbHVlcyBhcmUgYWxzbyBhY2NlcHRhYmxlLlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIENhbGwgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZCB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFlpZWxkVG9cblx0XHRjb250ZXh0LmNoZWNrKGlzU3RhdGVtZW50LCBsaW5lLmxvYywgJ0V4cHJlc3Npb24gaW4gc3RhdGVtZW50IHBvc2l0aW9uLicpXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9