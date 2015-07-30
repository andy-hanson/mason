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

	const verifyOpEach = op => {
		if (op !== null) op.verify();
	},
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
			verifyOpEach(this.opThrown);
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
			for (const _ of this.assignees) _.verify();
			this.value.verify();
		},

		BagEntry: verifyBagEntry,
		BagEntryMany: verifyBagEntry,

		BagSimple() {
			for (const _ of this.parts) _.verify();
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

		Break() {
			verifyInLoop(this);
			context.check(!(opLoop instanceof _MsAst.ForVal), this.loc, () => `${ (0, _CompileError.code)('for') } must break with a value.`);
		},

		BreakWithVal() {
			verifyInLoop(this);
			context.check(opLoop instanceof _MsAst.ForVal, this.loc, () => `${ (0, _CompileError.code)('break') } only valid inside ${ (0, _CompileError.code)('for') }`);
			this.value.verify();
		},

		Call() {
			this.called.verify();
			for (const _ of this.args) _.verify();
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
			verifyOpEach(this.superClass);
			verifyOpEach(this.opDo);
			for (const _ of this.statics) _.verify();
			verifyOpEach(this.opConstructor);
			for (const method of this.methods) method.verify();
		},

		ClassDo() {
			verifyAndPlusLocal(this.declareFocus, () => this.block.verify());
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
						verifyOpEach(this.opIn);
						this.block.verify();
						(0, _util.opEach)(this.opDeclareRes, verifyLocalDeclare);
						const verifyOut = () => verifyOpEach(this.opOut);
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
			verifyOpEach(this.opType);
		},

		LocalMutate() {
			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, () => `${ (0, _CompileError.code)(this.name) } is not mutable.`);
			// TODO: Track mutations. Mutable local must be mutated somewhere.
			this.value.verify();
		},

		Logic() {
			context.check(this.args.length > 1, 'Logic expression needs at least 2 arguments.');
			for (const _ of this.args) _.verify();
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

		MethodImpl() {
			this.symbol.verify();
			this.fun.verify();
		},

		Module() {
			// No need to verify this.doUses.
			for (const _ of this.uses) _.verify();
			withInDebug(() => {
				for (const _ of this.debugUses) _.verify();
			});
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
			for (const _ of this.args) _.verify();
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

		QuoteTemplate() {
			this.tag.verify();
			this.quote.verify();
		},

		SpecialDo() {},

		SpecialVal() {},

		Splat() {
			this.splatted.verify();
		},

		SwitchDo() {
			verifySwitch(this);
		},
		SwitchDoPart: verifySwitchPart,
		SwitchVal() {
			withIIFE(() => verifySwitch(this));
		},
		SwitchValPart: verifySwitchPart,

		Throw() {
			verifyOpEach(this.opThrown);
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

	function verifySwitchPart() {
		this.value.verify();
		this.result.verify();
	}

	function verifyExcept() {
		this._try.verify();
		verifyOpEach(this._catch);
		verifyOpEach(this._finally);
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
			for (const part of _.parts) part.verify();
			verifyOpEach(_.opElse);
		};
		(0, _util.ifElse)(_.opCased, _ => {
			_.verify();
			verifyAndPlusLocal(_.assignee, doIt);
		}, doIt);
	},
	      verifySwitch = _ => {
		_.switched.verify();
		for (const part of _.parts) part.verify();
		verifyOpEach(_.opElse);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsWUFBWSxHQUFHLEVBQUUsSUFBSTtBQUNwQixNQUFJLEVBQUUsS0FBSyxJQUFJLEVBQ2QsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO0VBQ1o7T0FFRCxXQUFXLEdBQUcsWUFBWSxJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7T0FFakMsUUFBUSxHQUFHLFlBQVksSUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQzs7Ozs7QUFJNUMscUJBQW9CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQzNDLFFBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxrQkFB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QUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM3QixhQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7QUFJbEIsV0FBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDdkMsZUF0bUJJLE1BQU0sRUFzbUJILE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQTtLQUMzQjtBQUNELFFBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNiO0dBQ0QsQ0FBQTs7QUFFRCxPQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBOztBQUV6QixXQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzlCLFVBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRTFCLFNBQU8sU0FBUyxDQUFBO0VBQ2hCO09BRUQsaUJBQWlCLEdBQUcsSUFBSSxJQUFJO0FBQzNCLFFBQU0sV0FBVyxHQUNoQixJQUFJLG1CQXhuQmtFLEVBQUUsQUF3bkJ0RDs7QUFFbEIsTUFBSSxtQkExbkJxRCxJQUFJLEFBMG5CekMsSUFDcEIsSUFBSSxtQkExbkJpRCxLQUFLLEFBMG5CckMsSUFDckIsSUFBSSxtQkEzbkJ3RCxPQUFPLEFBMm5CNUMsQ0FBQTtBQUN4QixTQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLG1DQUFtQyxDQUFDLENBQUE7RUFDekUsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS92ZXJpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0ICogYXMgTXNBc3RUeXBlcyBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEFzc2lnblNpbmdsZSwgQmxvY2tWYWwsIENhbGwsIERlYnVnLCBEbywgRm9yVmFsLFxuXHRMb2NhbERlY2xhcmVCdWlsdCwgTG9jYWxEZWNsYXJlUmVzLCBPYmpFbnRyeSwgUGF0dGVybiwgWWllbGQsIFlpZWxkVG8gfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBlYWNoUmV2ZXJzZSwgaGVhZCwgaWZFbHNlLCBpbXBsZW1lbnRNYW55LFxuXHRpc0VtcHR5LCBpdGVyYXRvclRvQXJyYXksIG9wRWFjaCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBWZXJpZnlSZXN1bHRzLCB7IExvY2FsSW5mbyB9IGZyb20gJy4vVmVyaWZ5UmVzdWx0cydcblxuLypcblRoZSB2ZXJpZmllciBnZW5lcmF0ZXMgaW5mb3JtYXRpb24gbmVlZGVkIGR1cmluZyB0cmFuc3BpbGluZywgdGhlIFZlcmlmeVJlc3VsdHMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtc0FzdCkgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0bG9jYWxzID0gbmV3IE1hcCgpXG5cdHBlbmRpbmdCbG9ja0xvY2FscyA9IFsgXVxuXHRpc0luRGVidWcgPSBpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0b3BMb29wID0gbnVsbFxuXHRyZXN1bHRzID0gbmV3IFZlcmlmeVJlc3VsdHMoKVxuXG5cdG1zQXN0LnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsVXNlKClcblxuXHRjb25zdCByZXMgPSByZXN1bHRzXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblx0Y29udGV4dCA9IGxvY2FscyA9IG9wTG9vcCA9IHBlbmRpbmdCbG9ja0xvY2FscyA9IHJlc3VsdHMgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG4vLyBVc2UgYSB0cmljayBsaWtlIGluIHBhcnNlLmpzIGFuZCBoYXZlIGV2ZXJ5dGhpbmcgY2xvc2Ugb3ZlciB0aGVzZSBtdXRhYmxlIHZhcmlhYmxlcy5cbmxldFxuXHRjb250ZXh0LFxuXHQvLyBNYXAgZnJvbSBuYW1lcyB0byBMb2NhbERlY2xhcmVzLlxuXHRsb2NhbHMsXG5cdG9wTG9vcCxcblx0Lypcblx0TG9jYWxzIGZvciB0aGlzIGJsb2NrLlxuXHRUaGVzZSBhcmUgYWRkZWQgdG8gbG9jYWxzIHdoZW4gZW50ZXJpbmcgYSBGdW5jdGlvbiBvciBsYXp5IGV2YWx1YXRpb24uXG5cdEluOlxuXHRcdGEgPSB8XG5cdFx0XHRiXG5cdFx0YiA9IDFcblx0YGJgIHdpbGwgYmUgYSBwZW5kaW5nIGxvY2FsLlxuXHRIb3dldmVyOlxuXHRcdGEgPSBiXG5cdFx0YiA9IDFcblx0d2lsbCBmYWlsIHRvIHZlcmlmeSwgYmVjYXVzZSBgYmAgY29tZXMgYWZ0ZXIgYGFgIGFuZCBpcyBub3QgYWNjZXNzZWQgaW5zaWRlIGEgZnVuY3Rpb24uXG5cdEl0IHdvdWxkIHdvcmsgZm9yIGB+YSBpcyBiYCwgdGhvdWdoLlxuXHQqL1xuXHRwZW5kaW5nQmxvY2tMb2NhbHMsXG5cdGlzSW5EZWJ1Zyxcblx0Ly8gV2hldGhlciB3ZSBhcmUgY3VycmVudGx5IGFibGUgdG8geWllbGQuXG5cdGlzSW5HZW5lcmF0b3IsXG5cdHJlc3VsdHNcblxuY29uc3Rcblx0dmVyaWZ5T3BFYWNoID0gb3AgPT4ge1xuXHRcdGlmIChvcCAhPT0gbnVsbClcblx0XHRcdG9wLnZlcmlmeSgpXG5cdH0sXG5cblx0ZGVsZXRlTG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbHMuZGVsZXRlKGxvY2FsRGVjbGFyZS5uYW1lKSxcblxuXHRzZXRMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5zZXQobG9jYWxEZWNsYXJlLm5hbWUsIGxvY2FsRGVjbGFyZSksXG5cblx0Ly8gV2hlbiBhIGxvY2FsIGlzIHJldHVybmVkIGZyb20gYSBCbG9ja09iaiBvciBNb2R1bGUsXG5cdC8vIHRoZSByZXR1cm4gJ2FjY2VzcycgaXMgY29uc2lkZXJlZCB0byBiZSAnZGVidWcnIGlmIHRoZSBsb2NhbCBpcy5cblx0YWNjZXNzTG9jYWxGb3JSZXR1cm4gPSAoZGVjbGFyZSwgYWNjZXNzKSA9PiB7XG5cdFx0Y29uc3QgaW5mbyA9IHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKVxuXHRcdF9hZGRMb2NhbEFjY2VzcyhpbmZvLCBhY2Nlc3MsIGluZm8uaXNJbkRlYnVnKVxuXHR9LFxuXG5cdGFjY2Vzc0xvY2FsID0gKGFjY2VzcywgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUobmFtZSwgYWNjZXNzLmxvYylcblx0XHRyZXN1bHRzLmxvY2FsQWNjZXNzVG9EZWNsYXJlLnNldChhY2Nlc3MsIGRlY2xhcmUpXG5cdFx0X2FkZExvY2FsQWNjZXNzKHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKSwgYWNjZXNzLCBpc0luRGVidWcpXG5cdH0sXG5cblx0X2FkZExvY2FsQWNjZXNzID0gKGxvY2FsSW5mbywgYWNjZXNzLCBpc0RlYnVnQWNjZXNzKSA9PlxuXHRcdChpc0RlYnVnQWNjZXNzID8gbG9jYWxJbmZvLmRlYnVnQWNjZXNzZXMgOiBsb2NhbEluZm8ubm9uRGVidWdBY2Nlc3NlcykucHVzaChhY2Nlc3MpLFxuXG5cdC8vIEZvciBleHByZXNzaW9ucyBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdGhleSB3aWxsIGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGJlaW5nIHZlcmlmaWVkLlxuXHQvLyBTbywgTG9jYWxEZWNsYXJlLnZlcmlmeSBqdXN0IHRoZSB0eXBlLlxuXHQvLyBGb3IgbG9jYWxzIG5vdCBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdXNlIHRoaXMgaW5zdGVhZCBvZiBqdXN0IGRlY2xhcmUudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+IHtcblx0XHRyZWdpc3RlckxvY2FsKGxvY2FsRGVjbGFyZSlcblx0XHRsb2NhbERlY2xhcmUudmVyaWZ5KClcblx0fSxcblxuXHRyZWdpc3RlckxvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uc2V0KGxvY2FsRGVjbGFyZSwgTG9jYWxJbmZvLmVtcHR5KGlzSW5EZWJ1ZykpXG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyBjaGFuZ2UgdmVyaWZpZXIgc3RhdGUgYW5kIGVmZmljaWVudGx5IHJldHVybiB0byB0aGUgb2xkIHN0YXRlIHdoZW4gZmluaXNoZWQuXG5jb25zdFxuXHR3aXRoSW5EZWJ1ZyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkRlYnVnID0gaXNJbkRlYnVnXG5cdFx0aXNJbkRlYnVnID0gdHJ1ZVxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkRlYnVnID0gb2xkSXNJbkRlYnVnXG5cdH0sXG5cblx0d2l0aEluR2VuZXJhdG9yID0gKG5ld0lzSW5HZW5lcmF0b3IsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IG5ld0lzSW5HZW5lcmF0b3Jcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJc0luR2VuZXJhdG9yXG5cdH0sXG5cblx0d2l0aEluTG9vcCA9IChuZXdMb29wLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBvbGRMb29wID0gb3BMb29wXG5cdFx0b3BMb29wID0gbmV3TG9vcFxuXHRcdGFjdGlvbigpXG5cdFx0b3BMb29wID0gb2xkTG9vcFxuXHR9LFxuXG5cdHBsdXNMb2NhbCA9IChhZGRlZExvY2FsLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBzaGFkb3dlZCA9IGxvY2Fscy5nZXQoYWRkZWRMb2NhbC5uYW1lKVxuXHRcdGxvY2Fscy5zZXQoYWRkZWRMb2NhbC5uYW1lLCBhZGRlZExvY2FsKVxuXHRcdGFjdGlvbigpXG5cdFx0aWYgKHNoYWRvd2VkID09PSB1bmRlZmluZWQpXG5cdFx0XHRkZWxldGVMb2NhbChhZGRlZExvY2FsKVxuXHRcdGVsc2Vcblx0XHRcdHNldExvY2FsKHNoYWRvd2VkKVxuXHR9LFxuXG5cdC8vIFNob3VsZCBoYXZlIHZlcmlmaWVkIHRoYXQgYWRkZWRMb2NhbHMgYWxsIGhhdmUgZGlmZmVyZW50IG5hbWVzLlxuXHRwbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBzaGFkb3dlZExvY2FscyA9IFsgXVxuXHRcdGZvciAoY29uc3QgXyBvZiBhZGRlZExvY2Fscykge1xuXHRcdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGlmIChzaGFkb3dlZCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzaGFkb3dlZExvY2Fscy5wdXNoKHNoYWRvd2VkKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9XG5cblx0XHRhY3Rpb24oKVxuXG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaChkZWxldGVMb2NhbClcblx0XHRzaGFkb3dlZExvY2Fscy5mb3JFYWNoKHNldExvY2FsKVxuXHR9LFxuXG5cdHZlcmlmeUFuZFBsdXNMb2NhbCA9IChhZGRlZExvY2FsLCBhY3Rpb24pID0+IHtcblx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoYWRkZWRMb2NhbClcblx0XHRwbHVzTG9jYWwoYWRkZWRMb2NhbCwgYWN0aW9uKVxuXHR9LFxuXG5cdHZlcmlmeUFuZFBsdXNMb2NhbHMgPSAoYWRkZWRMb2NhbHMsIGFjdGlvbikgPT4ge1xuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2godmVyaWZ5TG9jYWxEZWNsYXJlKVxuXHRcdGNvbnN0IG5hbWVzID0gbmV3IFNldCgpXG5cdFx0Zm9yIChjb25zdCBfIG9mIGFkZGVkTG9jYWxzKSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFuYW1lcy5oYXMoXy5uYW1lKSwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGBEdXBsaWNhdGUgbG9jYWwgJHtjb2RlKF8ubmFtZSl9YClcblx0XHRcdG5hbWVzLmFkZChfLm5hbWUpXG5cdFx0fVxuXHRcdHBsdXNMb2NhbHMoYWRkZWRMb2NhbHMsIGFjdGlvbilcblx0fSxcblxuXHR3aXRoQmxvY2tMb2NhbHMgPSBhY3Rpb24gPT4ge1xuXHRcdGNvbnN0IG9sZFBlbmRpbmdCbG9ja0xvY2FscyA9IHBlbmRpbmdCbG9ja0xvY2Fsc1xuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IFsgXVxuXHRcdHBsdXNMb2NhbHMob2xkUGVuZGluZ0Jsb2NrTG9jYWxzLCBhY3Rpb24pXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gb2xkUGVuZGluZ0Jsb2NrTG9jYWxzXG5cdH0sXG5cblx0Ly8gQ2FuJ3QgYnJlYWsgb3V0IG9mIGxvb3AgaW5zaWRlIG9mIElJRkUuXG5cdHdpdGhJSUZFID0gYWN0aW9uID0+IHtcblx0XHR3aXRoSW5Mb29wKGZhbHNlLCBhY3Rpb24pXG5cdH1cblxuY29uc3QgdmVyaWZ5TG9jYWxVc2UgPSAoKSA9PlxuXHRyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5mb3JFYWNoKChpbmZvLCBsb2NhbCkgPT4ge1xuXHRcdGlmICghKGxvY2FsIGluc3RhbmNlb2YgTG9jYWxEZWNsYXJlQnVpbHQgfHwgbG9jYWwgaW5zdGFuY2VvZiBMb2NhbERlY2xhcmVSZXMpKSB7XG5cdFx0XHRjb25zdCBub05vbkRlYnVnID0gaXNFbXB0eShpbmZvLm5vbkRlYnVnQWNjZXNzZXMpXG5cdFx0XHRpZiAobm9Ob25EZWJ1ZyAmJiBpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykpXG5cdFx0XHRcdGNvbnRleHQud2Fybihsb2NhbC5sb2MsICgpID0+IGBVbnVzZWQgbG9jYWwgdmFyaWFibGUgJHtjb2RlKGxvY2FsLm5hbWUpfS5gKVxuXHRcdFx0ZWxzZSBpZiAoaW5mby5pc0luRGVidWcpXG5cdFx0XHRcdGNvbnRleHQud2FybklmKCFub05vbkRlYnVnLCAoKSA9PiBoZWFkKGluZm8ubm9uRGVidWdBY2Nlc3NlcykubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBEZWJ1Zy1vbmx5IGxvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvdXRzaWRlIG9mIGRlYnVnLmApXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNvbnRleHQud2FybklmKG5vTm9uRGVidWcsIGxvY2FsLmxvYywgKCkgPT5cblx0XHRcdFx0XHRgTG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG9ubHkgaW4gZGVidWcuYClcblx0XHR9XG5cdH0pXG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3ZlcmlmeScsIHtcblx0QXNzZXJ0KCkge1xuXHRcdHRoaXMuY29uZGl0aW9uLnZlcmlmeSgpXG5cdFx0dmVyaWZ5T3BFYWNoKHRoaXMub3BUaHJvd24pXG5cdH0sXG5cblx0QXNzaWduU2luZ2xlKCkge1xuXHRcdGNvbnN0IGRvViA9ICgpID0+IHtcblx0XHRcdC8vIEFzc2lnbmVlIHJlZ2lzdGVyZWQgYnkgdmVyaWZ5TGluZXMuXG5cdFx0XHR0aGlzLmFzc2lnbmVlLnZlcmlmeSgpXG5cdFx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmFzc2lnbmVlLmlzTGF6eSgpKVxuXHRcdFx0d2l0aEJsb2NrTG9jYWxzKGRvVilcblx0XHRlbHNlXG5cdFx0XHRkb1YoKVxuXHR9LFxuXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLmFzc2lnbmVlcylcblx0XHRcdF8udmVyaWZ5KClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0QmFnRW50cnk6IHZlcmlmeUJhZ0VudHJ5LFxuXHRCYWdFbnRyeU1hbnk6IHZlcmlmeUJhZ0VudHJ5LFxuXG5cdEJhZ1NpbXBsZSgpIHtcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5wYXJ0cylcblx0XHRcdF8udmVyaWZ5KClcblx0fSxcblxuXHRCbG9ja0RvKCkgeyB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKSB9LFxuXG5cdEJsb2NrVmFsVGhyb3coKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5fdGhyb3cudmVyaWZ5KCkpXG5cdH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKCkge1xuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0cGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IHRoaXMucmV0dXJuZWQudmVyaWZ5KCkpXG5cdH0sXG5cblx0QmxvY2tPYmooKSB7XG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuYnVpbHQsICgpID0+IHtcblx0XHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0XHRvcEVhY2godGhpcy5vcE9iamVkLCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblx0XHR9KVxuXHR9LFxuXG5cdEJsb2NrQmFnOiB2ZXJpZnlCbG9ja0JhZ09yTWFwLFxuXHRCbG9ja01hcDogdmVyaWZ5QmxvY2tCYWdPck1hcCxcblxuXHRCbG9ja1dyYXAoKSB7IHdpdGhJSUZFKCgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpIH0sXG5cblx0QnJlYWsoKSB7XG5cdFx0dmVyaWZ5SW5Mb29wKHRoaXMpXG5cdFx0Y29udGV4dC5jaGVjayghKG9wTG9vcCBpbnN0YW5jZW9mIEZvclZhbCksIHRoaXMubG9jLCAoKSA9PlxuXHRcdFx0YCR7Y29kZSgnZm9yJyl9IG11c3QgYnJlYWsgd2l0aCBhIHZhbHVlLmApXG5cdH0sXG5cblx0QnJlYWtXaXRoVmFsKCkge1xuXHRcdHZlcmlmeUluTG9vcCh0aGlzKVxuXHRcdGNvbnRleHQuY2hlY2sob3BMb29wIGluc3RhbmNlb2YgRm9yVmFsLCB0aGlzLmxvYywgKCkgPT5cblx0XHRcdGAke2NvZGUoJ2JyZWFrJyl9IG9ubHkgdmFsaWQgaW5zaWRlICR7Y29kZSgnZm9yJyl9YClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0Q2FsbCgpIHtcblx0XHR0aGlzLmNhbGxlZC52ZXJpZnkoKVxuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLmFyZ3MpXG5cdFx0XHRfLnZlcmlmeSgpXG5cdH0sXG5cblx0Q2FzZURvKCkgeyB2ZXJpZnlDYXNlKHRoaXMpIH0sXG5cdENhc2VEb1BhcnQ6IHZlcmlmeUNhc2VQYXJ0LFxuXHRDYXNlVmFsKCkgeyB3aXRoSUlGRSgoKSA9PiB2ZXJpZnlDYXNlKHRoaXMpKSB9LFxuXHRDYXNlVmFsUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cblx0Q2F0Y2goKSB7XG5cdFx0Y29udGV4dC5jaGVjayh0aGlzLmNhdWdodC5vcFR5cGUgPT09IG51bGwsIHRoaXMuY2F1Z2h0LmxvYywgJ1RPRE86IENhdWdodCB0eXBlcycpXG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuY2F1Z2h0LCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKVxuXHR9LFxuXG5cdENsYXNzKCkge1xuXHRcdHZlcmlmeU9wRWFjaCh0aGlzLnN1cGVyQ2xhc3MpXG5cdFx0dmVyaWZ5T3BFYWNoKHRoaXMub3BEbylcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5zdGF0aWNzKVxuXHRcdFx0Xy52ZXJpZnkoKVxuXHRcdHZlcmlmeU9wRWFjaCh0aGlzLm9wQ29uc3RydWN0b3IpXG5cdFx0Zm9yIChjb25zdCBtZXRob2Qgb2YgdGhpcy5tZXRob2RzKVxuXHRcdFx0bWV0aG9kLnZlcmlmeSgpXG5cdH0sXG5cblx0Q2xhc3NEbygpIHtcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5kZWNsYXJlRm9jdXMsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpXG5cdH0sXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR0aGlzLnJlc3VsdC52ZXJpZnkoKVxuXHR9LFxuXHRDb25kaXRpb25hbFZhbCgpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR3aXRoSUlGRSgoKSA9PiB0aGlzLnJlc3VsdC52ZXJpZnkoKSlcblx0fSxcblxuXHRDb250aW51ZSgpIHsgdmVyaWZ5SW5Mb29wKHRoaXMpIH0sXG5cblx0Ly8gT25seSByZWFjaCBoZXJlIGZvciBpbi9vdXQgY29uZGl0aW9uLlxuXHREZWJ1ZygpIHsgdmVyaWZ5TGluZXMoWyB0aGlzIF0pIH0sXG5cblx0RXhjZXB0RG86IHZlcmlmeUV4Y2VwdCxcblx0RXhjZXB0VmFsOiB2ZXJpZnlFeGNlcHQsXG5cblx0Rm9yQmFnKCkgeyB2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5Rm9yKHRoaXMpKSB9LFxuXG5cdEZvckRvKCkgeyB2ZXJpZnlGb3IodGhpcykgfSxcblxuXHRGb3JWYWwoKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZ1bigpIHtcblx0XHR3aXRoQmxvY2tMb2NhbHMoKCkgPT4ge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0aGlzLm9wRGVjbGFyZVJlcyA9PT0gbnVsbCB8fCB0aGlzLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tWYWwsIHRoaXMubG9jLFxuXHRcdFx0XHQnRnVuY3Rpb24gd2l0aCByZXR1cm4gY29uZGl0aW9uIG11c3QgcmV0dXJuIHNvbWV0aGluZy4nKVxuXHRcdFx0d2l0aEluR2VuZXJhdG9yKHRoaXMuaXNHZW5lcmF0b3IsICgpID0+XG5cdFx0XHRcdHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhbGxBcmdzID0gY2F0KHRoaXMub3BEZWNsYXJlVGhpcywgdGhpcy5hcmdzLCB0aGlzLm9wUmVzdEFyZylcblx0XHRcdFx0XHR2ZXJpZnlBbmRQbHVzTG9jYWxzKGFsbEFyZ3MsICgpID0+IHtcblx0XHRcdFx0XHRcdHZlcmlmeU9wRWFjaCh0aGlzLm9wSW4pXG5cdFx0XHRcdFx0XHR0aGlzLmJsb2NrLnZlcmlmeSgpXG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcERlY2xhcmVSZXMsIHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRcdFx0XHRcdGNvbnN0IHZlcmlmeU91dCA9ICgpID0+IHZlcmlmeU9wRWFjaCh0aGlzLm9wT3V0KVxuXHRcdFx0XHRcdFx0aWZFbHNlKHRoaXMub3BEZWNsYXJlUmVzLCBfID0+IHBsdXNMb2NhbChfLCB2ZXJpZnlPdXQpLCB2ZXJpZnlPdXQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSkpXG5cdFx0fSlcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IH0sXG5cblx0TGF6eSgpIHsgd2l0aEJsb2NrTG9jYWxzKCgpID0+IHRoaXMudmFsdWUudmVyaWZ5KCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IGFjY2Vzc0xvY2FsKHRoaXMsIHRoaXMubmFtZSkgfSxcblxuXHQvLyBBZGRpbmcgTG9jYWxEZWNsYXJlcyB0byB0aGUgYXZhaWxhYmxlIGxvY2FscyBpcyBkb25lIGJ5IEZ1biBvciBsaW5lTmV3TG9jYWxzLlxuXHRMb2NhbERlY2xhcmUoKSB7IHZlcmlmeU9wRWFjaCh0aGlzLm9wVHlwZSkgfSxcblxuXHRMb2NhbE11dGF0ZSgpIHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKHRoaXMubmFtZSwgdGhpcy5sb2MpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlLmlzTXV0YWJsZSgpLCB0aGlzLmxvYywgKCkgPT4gYCR7Y29kZSh0aGlzLm5hbWUpfSBpcyBub3QgbXV0YWJsZS5gKVxuXHRcdC8vIFRPRE86IFRyYWNrIG11dGF0aW9ucy4gTXV0YWJsZSBsb2NhbCBtdXN0IGJlIG11dGF0ZWQgc29tZXdoZXJlLlxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRMb2dpYygpIHtcblx0XHRjb250ZXh0LmNoZWNrKHRoaXMuYXJncy5sZW5ndGggPiAxLCAnTG9naWMgZXhwcmVzc2lvbiBuZWVkcyBhdCBsZWFzdCAyIGFyZ3VtZW50cy4nKVxuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLmFyZ3MpXG5cdFx0XHRfLnZlcmlmeSgpXG5cdH0sXG5cblx0Tm90KCkgeyB0aGlzLmFyZy52ZXJpZnkoKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7IH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0XHR0aGlzLmtleS52ZXJpZnkoKVxuXHRcdHRoaXMudmFsLnZlcmlmeSgpXG5cdH0sXG5cblx0TWVtYmVyKCkgeyB0aGlzLm9iamVjdC52ZXJpZnkoKSB9LFxuXG5cdE1lbWJlclNldCgpIHtcblx0XHR0aGlzLm9iamVjdC52ZXJpZnkoKVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRNZXRob2RJbXBsKCkge1xuXHRcdHRoaXMuc3ltYm9sLnZlcmlmeSgpXG5cdFx0dGhpcy5mdW4udmVyaWZ5KClcblx0fSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Ly8gTm8gbmVlZCB0byB2ZXJpZnkgdGhpcy5kb1VzZXMuXG5cdFx0Zm9yIChjb25zdCBfIG9mIHRoaXMudXNlcylcblx0XHRcdF8udmVyaWZ5KClcblx0XHR3aXRoSW5EZWJ1ZygoKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5kZWJ1Z1VzZXMpXG5cdFx0XHRcdF8udmVyaWZ5KClcblx0XHR9KVxuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0Zm9yIChjb25zdCBfIG9mIHRoaXMuZXhwb3J0cylcblx0XHRcdGFjY2Vzc0xvY2FsRm9yUmV0dXJuKF8sIHRoaXMpXG5cdFx0b3BFYWNoKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblxuXHRcdGNvbnN0IGV4cG9ydHMgPSBuZXcgU2V0KHRoaXMuZXhwb3J0cylcblx0XHRjb25zdCBtYXJrRXhwb3J0TGluZXMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuYWxsQXNzaWduZWVzKCkuc29tZShfID0+IGV4cG9ydHMuaGFzKF8pKSlcblx0XHRcdFx0cmVzdWx0cy5leHBvcnRBc3NpZ25zLmFkZChsaW5lKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHRcdH1cblx0XHR0aGlzLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHR9LFxuXG5cdE5ldygpIHtcblx0XHR0aGlzLnR5cGUudmVyaWZ5KClcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5hcmdzKVxuXHRcdFx0Xy52ZXJpZnkoKVxuXHR9LFxuXG5cdE9iakVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5hc3NpZ24udmVyaWZ5KClcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5hc3NpZ24uYWxsQXNzaWduZWVzKCkpXG5cdFx0XHRhY2Nlc3NMb2NhbCh0aGlzLCBfLm5hbWUpXG5cdH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdGNvbnN0IGtleXMgPSBuZXcgU2V0KClcblx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgdGhpcy5wYWlycykge1xuXHRcdFx0Y29uc3QgeyBrZXksIHZhbHVlIH0gPSBwYWlyXG5cdFx0XHRjb250ZXh0LmNoZWNrKCFrZXlzLmhhcyhrZXkpLCBwYWlyLmxvYywgKCkgPT4gYER1cGxpY2F0ZSBrZXkgJHtrZXl9YClcblx0XHRcdGtleXMuYWRkKGtleSlcblx0XHRcdHZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLnBhcnRzKVxuXHRcdFx0aWYgKHR5cGVvZiBfICE9PSAnc3RyaW5nJylcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHR9LFxuXG5cdFF1b3RlVGVtcGxhdGUoKSB7XG5cdFx0dGhpcy50YWcudmVyaWZ5KClcblx0XHR0aGlzLnF1b3RlLnZlcmlmeSgpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkgeyB9LFxuXG5cdFNwZWNpYWxWYWwoKSB7IH0sXG5cblx0U3BsYXQoKSB7IHRoaXMuc3BsYXR0ZWQudmVyaWZ5KCkgfSxcblxuXHRTd2l0Y2hEbygpIHsgdmVyaWZ5U3dpdGNoKHRoaXMpIH0sXG5cdFN3aXRjaERvUGFydDogdmVyaWZ5U3dpdGNoUGFydCxcblx0U3dpdGNoVmFsKCkgeyB3aXRoSUlGRSgoKSA9PiB2ZXJpZnlTd2l0Y2godGhpcykpIH0sXG5cdFN3aXRjaFZhbFBhcnQ6IHZlcmlmeVN3aXRjaFBhcnQsXG5cblx0VGhyb3coKSB7XG5cdFx0dmVyaWZ5T3BFYWNoKHRoaXMub3BUaHJvd24pXG5cdH0sXG5cblx0VXNlKCkge1xuXHRcdC8vIFNpbmNlIFVzZXMgYXJlIGFsd2F5cyBpbiB0aGUgb3V0ZXJtb3N0IHNjb3BlLCBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHNoYWRvd2luZy5cblx0XHQvLyBTbyB3ZSBtdXRhdGUgYGxvY2Fsc2AgZGlyZWN0bHkuXG5cdFx0Y29uc3QgYWRkVXNlTG9jYWwgPSBfID0+IHtcblx0XHRcdGNvbnN0IHByZXYgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGNvbnRleHQuY2hlY2socHJldiA9PT0gdW5kZWZpbmVkLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0YCR7Y29kZShfLm5hbWUpfSBhbHJlYWR5IGltcG9ydGVkIGF0ICR7cHJldi5sb2N9YClcblx0XHRcdHZlcmlmeUxvY2FsRGVjbGFyZShfKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9XG5cdFx0dGhpcy51c2VkLmZvckVhY2goYWRkVXNlTG9jYWwpXG5cdFx0b3BFYWNoKHRoaXMub3BVc2VEZWZhdWx0LCBhZGRVc2VMb2NhbClcblx0fSxcblxuXHRZaWVsZCgpIHtcblx0XHRjb250ZXh0LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZC52ZXJpZnkoKVxuXHR9LFxuXG5cdFlpZWxkVG8oKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWRUby52ZXJpZnkoKVxuXHR9XG59KVxuXG5mdW5jdGlvbiB2ZXJpZnlCYWdFbnRyeSgpIHtcblx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0dGhpcy52YWx1ZS52ZXJpZnkoKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlCbG9ja0JhZ09yTWFwKCkge1xuXHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5TGluZXModGhpcy5saW5lcykpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhc2VQYXJ0KCkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdHRoaXMudGVzdC50eXBlLnZlcmlmeSgpXG5cdFx0dGhpcy50ZXN0LnBhdHRlcm5lZC52ZXJpZnkoKVxuXHRcdHZlcmlmeUFuZFBsdXNMb2NhbHModGhpcy50ZXN0LmxvY2FscywgKCkgPT4gdGhpcy5yZXN1bHQudmVyaWZ5KCkpXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdFx0dGhpcy5yZXN1bHQudmVyaWZ5KClcblx0fVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlTd2l0Y2hQYXJ0KCkge1xuXHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdHRoaXMucmVzdWx0LnZlcmlmeSgpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUV4Y2VwdCgpIHtcblx0dGhpcy5fdHJ5LnZlcmlmeSgpXG5cdHZlcmlmeU9wRWFjaCh0aGlzLl9jYXRjaClcblx0dmVyaWZ5T3BFYWNoKHRoaXMuX2ZpbmFsbHkpXG59XG5cbi8vIEhlbHBlcnMgc3BlY2lmaWMgdG8gY2VydGFpbiBNc0FzdCB0eXBlczpcbmNvbnN0XG5cdHZlcmlmeUZvciA9IGZvckxvb3AgPT4ge1xuXHRcdGNvbnN0IHZlcmlmeUJsb2NrID0gKCkgPT4gd2l0aEluTG9vcChmb3JMb29wLCAoKSA9PiBmb3JMb29wLmJsb2NrLnZlcmlmeSgpKVxuXHRcdGlmRWxzZShmb3JMb29wLm9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRiYWcudmVyaWZ5KClcblx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKGVsZW1lbnQsIHZlcmlmeUJsb2NrKVxuXHRcdFx0fSxcblx0XHRcdHZlcmlmeUJsb2NrKVxuXHR9LFxuXG5cdHZlcmlmeUluTG9vcCA9IGxvb3BVc2VyID0+XG5cdFx0Y29udGV4dC5jaGVjayhvcExvb3AgIT09IG51bGwsIGxvb3BVc2VyLmxvYywgJ05vdCBpbiBhIGxvb3AuJyksXG5cblxuXHR2ZXJpZnlDYXNlID0gXyA9PiB7XG5cdFx0Y29uc3QgZG9JdCA9ICgpID0+IHtcblx0XHRcdGZvciAoY29uc3QgcGFydCBvZiBfLnBhcnRzKVxuXHRcdFx0XHRwYXJ0LnZlcmlmeSgpXG5cdFx0XHR2ZXJpZnlPcEVhY2goXy5vcEVsc2UpXG5cdFx0fVxuXHRcdGlmRWxzZShfLm9wQ2FzZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHRcdFx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwoXy5hc3NpZ25lZSwgZG9JdClcblx0XHRcdH0sXG5cdFx0XHRkb0l0KVxuXHR9LFxuXG5cdHZlcmlmeVN3aXRjaCA9IF8gPT4ge1xuXHRcdF8uc3dpdGNoZWQudmVyaWZ5KClcblx0XHRmb3IgKGNvbnN0IHBhcnQgb2YgXy5wYXJ0cylcblx0XHRcdHBhcnQudmVyaWZ5KClcblx0XHR2ZXJpZnlPcEVhY2goXy5vcEVsc2UpXG5cdH1cblxuLy8gR2VuZXJhbCB1dGlsaXRpZXM6XG5jb25zdFxuXHRnZXRMb2NhbERlY2xhcmUgPSAobmFtZSwgYWNjZXNzTG9jKSA9PiB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGxvY2Fscy5nZXQobmFtZSlcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUgIT09IHVuZGVmaW5lZCwgYWNjZXNzTG9jLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBzaG93TG9jYWxzID0gY29kZShpdGVyYXRvclRvQXJyYXkobG9jYWxzLmtleXMoKSkuam9pbignICcpKVxuXHRcdFx0cmV0dXJuIGBObyBzdWNoIGxvY2FsICR7Y29kZShuYW1lKX0uXFxuTG9jYWxzIGFyZTpcXG4ke3Nob3dMb2NhbHN9LmBcblx0XHR9KVxuXHRcdHJldHVybiBkZWNsYXJlXG5cdH0sXG5cblx0bGluZU5ld0xvY2FscyA9IGxpbmUgPT5cblx0XHRsaW5lIGluc3RhbmNlb2YgQXNzaWduU2luZ2xlID9cblx0XHRcdFsgbGluZS5hc3NpZ25lZSBdIDpcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ25EZXN0cnVjdHVyZSA/XG5cdFx0XHRsaW5lLmFzc2lnbmVlcyA6XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkgP1xuXHRcdFx0bGluZU5ld0xvY2FscyhsaW5lLmFzc2lnbikgOlxuXHRcdFx0WyBdLFxuXG5cdHZlcmlmeUxpbmVzID0gbGluZXMgPT4ge1xuXHRcdC8qXG5cdFx0V2UgbmVlZCB0byBiZXQgYWxsIGJsb2NrIGxvY2FscyB1cC1mcm9udCBiZWNhdXNlXG5cdFx0RnVuY3Rpb25zIHdpdGhpbiBsaW5lcyBjYW4gYWNjZXNzIGxvY2FscyBmcm9tIGxhdGVyIGxpbmVzLlxuXHRcdE5PVEU6IFdlIHB1c2ggdGhlc2Ugb250byBwZW5kaW5nQmxvY2tMb2NhbHMgaW4gcmV2ZXJzZVxuXHRcdHNvIHRoYXQgd2hlbiB3ZSBpdGVyYXRlIHRocm91Z2ggbGluZXMgZm9yd2FyZHMsIHdlIGNhbiBwb3AgZnJvbSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHR0byByZW1vdmUgcGVuZGluZyBsb2NhbHMgYXMgdGhleSBiZWNvbWUgcmVhbCBsb2NhbHMuXG5cdFx0SXQgZG9lc24ndCByZWFsbHkgbWF0dGVyIHdoYXQgb3JkZXIgd2UgYWRkIGxvY2FscyBpbiBzaW5jZSBpdCdzIG5vdCBhbGxvd2VkXG5cdFx0dG8gaGF2ZSB0d28gbG9jYWxzIG9mIHRoZSBzYW1lIG5hbWUgaW4gdGhlIHNhbWUgYmxvY2suXG5cdFx0Ki9cblx0XHRjb25zdCBuZXdMb2NhbHMgPSBbIF1cblxuXHRcdGNvbnN0IGdldExpbmVMb2NhbHMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKCgpID0+IGVhY2hSZXZlcnNlKGxpbmUubGluZXMsIGdldExpbmVMb2NhbHMpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlYWNoUmV2ZXJzZShsaW5lTmV3TG9jYWxzKGxpbmUpLCBfID0+IHtcblx0XHRcdFx0XHQvLyBSZWdpc3RlciB0aGUgbG9jYWwgbm93LiBDYW4ndCB3YWl0IHVudGlsIHRoZSBhc3NpZ24gaXMgdmVyaWZpZWQuXG5cdFx0XHRcdFx0cmVnaXN0ZXJMb2NhbChfKVxuXHRcdFx0XHRcdG5ld0xvY2Fscy5wdXNoKF8pXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHRcdGVhY2hSZXZlcnNlKGxpbmVzLCBnZXRMaW5lTG9jYWxzKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2Fscy5wdXNoKC4uLm5ld0xvY2FscylcblxuXHRcdC8qXG5cdFx0S2VlcHMgdHJhY2sgb2YgbG9jYWxzIHdoaWNoIGhhdmUgYWxyZWFkeSBiZWVuIGFkZGVkIGluIHRoaXMgYmxvY2suXG5cdFx0TWFzb24gYWxsb3dzIHNoYWRvd2luZywgYnV0IG5vdCB3aXRoaW4gdGhlIHNhbWUgYmxvY2suXG5cdFx0U28sIHRoaXMgaXMgYWxsb3dlZDpcblx0XHRcdGEgPSAxXG5cdFx0XHRiID1cblx0XHRcdFx0YSA9IDJcblx0XHRcdFx0Li4uXG5cdFx0QnV0IG5vdDpcblx0XHRcdGEgPSAxXG5cdFx0XHRhID0gMlxuXHRcdCovXG5cdFx0Y29uc3QgdGhpc0Jsb2NrTG9jYWxOYW1lcyA9IG5ldyBTZXQoKVxuXG5cdFx0Ly8gQWxsIHNoYWRvd2VkIGxvY2FscyBmb3IgdGhpcyBibG9jay5cblx0XHRjb25zdCBzaGFkb3dlZCA9IFsgXVxuXG5cdFx0Y29uc3QgdmVyaWZ5TGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0Ly8gVE9ETzogRG8gYW55dGhpbmcgaW4gdGhpcyBzaXR1YXRpb24/XG5cdFx0XHRcdC8vIGNvbnRleHQuY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnUmVkdW5kYW50IGBkZWJ1Z2AuJylcblx0XHRcdFx0d2l0aEluRGVidWcoKCkgPT4gbGluZS5saW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZlcmlmeUlzU3RhdGVtZW50KGxpbmUpXG5cdFx0XHRcdGZvciAoY29uc3QgbmV3TG9jYWwgb2YgbGluZU5ld0xvY2FscyhsaW5lKSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBuZXdMb2NhbC5uYW1lXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTG9jYWwgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0XHRcdFx0aWYgKG9sZExvY2FsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIXRoaXNCbG9ja0xvY2FsTmFtZXMuaGFzKG5hbWUpLCBuZXdMb2NhbC5sb2MsXG5cdFx0XHRcdFx0XHRcdCgpID0+IGBBIGxvY2FsICR7Y29kZShuYW1lKX0gaXMgYWxyZWFkeSBpbiB0aGlzIGJsb2NrLmApXG5cdFx0XHRcdFx0XHRzaGFkb3dlZC5wdXNoKG9sZExvY2FsKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzQmxvY2tMb2NhbE5hbWVzLmFkZChuYW1lKVxuXHRcdFx0XHRcdHNldExvY2FsKG5ld0xvY2FsKVxuXG5cdFx0XHRcdFx0Ly8gTm93IHRoYXQgaXQncyBhZGRlZCBhcyBhIGxvY2FsLCBpdCdzIG5vIGxvbmdlciBwZW5kaW5nLlxuXHRcdFx0XHRcdC8vIFdlIGFkZGVkIHBlbmRpbmdCbG9ja0xvY2FscyBpbiB0aGUgcmlnaHQgb3JkZXIgdGhhdCB3ZSBjYW4ganVzdCBwb3AgdGhlbSBvZmYuXG5cdFx0XHRcdFx0Y29uc3QgcG9wcGVkID0gcGVuZGluZ0Jsb2NrTG9jYWxzLnBvcCgpXG5cdFx0XHRcdFx0YXNzZXJ0KHBvcHBlZCA9PT0gbmV3TG9jYWwpXG5cdFx0XHRcdH1cblx0XHRcdFx0bGluZS52ZXJpZnkoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxpbmVzLmZvckVhY2godmVyaWZ5TGluZSlcblxuXHRcdG5ld0xvY2Fscy5mb3JFYWNoKGRlbGV0ZUxvY2FsKVxuXHRcdHNoYWRvd2VkLmZvckVhY2goc2V0TG9jYWwpXG5cblx0XHRyZXR1cm4gbmV3TG9jYWxzXG5cdH0sXG5cblx0dmVyaWZ5SXNTdGF0ZW1lbnQgPSBsaW5lID0+IHtcblx0XHRjb25zdCBpc1N0YXRlbWVudCA9XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgRG8gfHxcblx0XHRcdC8vIFNvbWUgdmFsdWVzIGFyZSBhbHNvIGFjY2VwdGFibGUuXG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQ2FsbCB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFlpZWxkIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGRUb1xuXHRcdGNvbnRleHQuY2hlY2soaXNTdGF0ZW1lbnQsIGxpbmUubG9jLCAnRXhwcmVzc2lvbiBpbiBzdGF0ZW1lbnQgcG9zaXRpb24uJylcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=