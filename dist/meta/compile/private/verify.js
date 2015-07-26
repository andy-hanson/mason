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
			(0, _util.opEach)(this.opDo, verify);
			this.statics.forEach(verify);
			(0, _util.opEach)(this.opConstructor, verify);
			this.methods.forEach(verify);
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

		MethodImpl() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO09BRWhDLFdBQVcsR0FBRyxZQUFZLElBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztPQUVqQyxRQUFRLEdBQUcsWUFBWSxJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEtBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwRCxp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Q0FBQyxDQUFBO0VBQ3pFLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdmVyaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCAqIGFzIE1zQXN0VHlwZXMgZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25TaW5nbGUsIEJsb2NrVmFsLCBDYWxsLCBEZWJ1ZywgRG8sIEZvclZhbCxcblx0TG9jYWxEZWNsYXJlQnVpbHQsIExvY2FsRGVjbGFyZVJlcywgT2JqRW50cnksIFBhdHRlcm4sIFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZWFjaFJldmVyc2UsIGhlYWQsIGlmRWxzZSwgaW1wbGVtZW50TWFueSxcblx0aXNFbXB0eSwgaXRlcmF0b3JUb0FycmF5LCBvcEVhY2ggfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgVmVyaWZ5UmVzdWx0cywgeyBMb2NhbEluZm8gfSBmcm9tICcuL1ZlcmlmeVJlc3VsdHMnXG5cbi8qXG5UaGUgdmVyaWZpZXIgZ2VuZXJhdGVzIGluZm9ybWF0aW9uIG5lZWRlZCBkdXJpbmcgdHJhbnNwaWxpbmcsIHRoZSBWZXJpZnlSZXN1bHRzLlxuKi9cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgbXNBc3QpID0+IHtcblx0Y29udGV4dCA9IF9jb250ZXh0XG5cdGxvY2FscyA9IG5ldyBNYXAoKVxuXHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0aXNJbkRlYnVnID0gaXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdG9wTG9vcCA9IG51bGxcblx0cmVzdWx0cyA9IG5ldyBWZXJpZnlSZXN1bHRzKClcblxuXHRtc0FzdC52ZXJpZnkoKVxuXHR2ZXJpZnlMb2NhbFVzZSgpXG5cblx0Y29uc3QgcmVzID0gcmVzdWx0c1xuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSBsb2NhbHMgPSBvcExvb3AgPSBwZW5kaW5nQmxvY2tMb2NhbHMgPSByZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuLy8gVXNlIGEgdHJpY2sgbGlrZSBpbiBwYXJzZS5qcyBhbmQgaGF2ZSBldmVyeXRoaW5nIGNsb3NlIG92ZXIgdGhlc2UgbXV0YWJsZSB2YXJpYWJsZXMuXG5sZXRcblx0Y29udGV4dCxcblx0Ly8gTWFwIGZyb20gbmFtZXMgdG8gTG9jYWxEZWNsYXJlcy5cblx0bG9jYWxzLFxuXHRvcExvb3AsXG5cdC8qXG5cdExvY2FscyBmb3IgdGhpcyBibG9jay5cblx0VGhlc2UgYXJlIGFkZGVkIHRvIGxvY2FscyB3aGVuIGVudGVyaW5nIGEgRnVuY3Rpb24gb3IgbGF6eSBldmFsdWF0aW9uLlxuXHRJbjpcblx0XHRhID0gfFxuXHRcdFx0YlxuXHRcdGIgPSAxXG5cdGBiYCB3aWxsIGJlIGEgcGVuZGluZyBsb2NhbC5cblx0SG93ZXZlcjpcblx0XHRhID0gYlxuXHRcdGIgPSAxXG5cdHdpbGwgZmFpbCB0byB2ZXJpZnksIGJlY2F1c2UgYGJgIGNvbWVzIGFmdGVyIGBhYCBhbmQgaXMgbm90IGFjY2Vzc2VkIGluc2lkZSBhIGZ1bmN0aW9uLlxuXHRJdCB3b3VsZCB3b3JrIGZvciBgfmEgaXMgYmAsIHRob3VnaC5cblx0Ki9cblx0cGVuZGluZ0Jsb2NrTG9jYWxzLFxuXHRpc0luRGVidWcsXG5cdC8vIFdoZXRoZXIgd2UgYXJlIGN1cnJlbnRseSBhYmxlIHRvIHlpZWxkLlxuXHRpc0luR2VuZXJhdG9yLFxuXHRyZXN1bHRzXG5cbmNvbnN0XG5cdHZlcmlmeSA9IG1zQXN0ID0+IG1zQXN0LnZlcmlmeSgpLFxuXG5cdGRlbGV0ZUxvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxzLmRlbGV0ZShsb2NhbERlY2xhcmUubmFtZSksXG5cblx0c2V0TG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbHMuc2V0KGxvY2FsRGVjbGFyZS5uYW1lLCBsb2NhbERlY2xhcmUpLFxuXG5cdC8vIFdoZW4gYSBsb2NhbCBpcyByZXR1cm5lZCBmcm9tIGEgQmxvY2tPYmogb3IgTW9kdWxlLFxuXHQvLyB0aGUgcmV0dXJuICdhY2Nlc3MnIGlzIGNvbnNpZGVyZWQgdG8gYmUgJ2RlYnVnJyBpZiB0aGUgbG9jYWwgaXMuXG5cdGFjY2Vzc0xvY2FsRm9yUmV0dXJuID0gKGRlY2xhcmUsIGFjY2VzcykgPT4ge1xuXHRcdGNvbnN0IGluZm8gPSByZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQoZGVjbGFyZSlcblx0XHRfYWRkTG9jYWxBY2Nlc3MoaW5mbywgYWNjZXNzLCBpbmZvLmlzSW5EZWJ1Zylcblx0fSxcblxuXHRhY2Nlc3NMb2NhbCA9IChhY2Nlc3MsIG5hbWUpID0+IHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKG5hbWUsIGFjY2Vzcy5sb2MpXG5cdFx0cmVzdWx0cy5sb2NhbEFjY2Vzc1RvRGVjbGFyZS5zZXQoYWNjZXNzLCBkZWNsYXJlKVxuXHRcdF9hZGRMb2NhbEFjY2VzcyhyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQoZGVjbGFyZSksIGFjY2VzcywgaXNJbkRlYnVnKVxuXHR9LFxuXG5cdF9hZGRMb2NhbEFjY2VzcyA9IChsb2NhbEluZm8sIGFjY2VzcywgaXNEZWJ1Z0FjY2VzcykgPT5cblx0XHQoaXNEZWJ1Z0FjY2VzcyA/IGxvY2FsSW5mby5kZWJ1Z0FjY2Vzc2VzIDogbG9jYWxJbmZvLm5vbkRlYnVnQWNjZXNzZXMpLnB1c2goYWNjZXNzKSxcblxuXHQvLyBGb3IgZXhwcmVzc2lvbnMgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHRoZXkgd2lsbCBiZSByZWdpc3RlcmVkIGJlZm9yZSBiZWluZyB2ZXJpZmllZC5cblx0Ly8gU28sIExvY2FsRGVjbGFyZS52ZXJpZnkganVzdCB0aGUgdHlwZS5cblx0Ly8gRm9yIGxvY2FscyBub3QgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHVzZSB0aGlzIGluc3RlYWQgb2YganVzdCBkZWNsYXJlLnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsRGVjbGFyZSA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0cmVnaXN0ZXJMb2NhbChsb2NhbERlY2xhcmUpXG5cdFx0bG9jYWxEZWNsYXJlLnZlcmlmeSgpXG5cdH0sXG5cblx0cmVnaXN0ZXJMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLnNldChsb2NhbERlY2xhcmUsIExvY2FsSW5mby5lbXB0eShpc0luRGVidWcpKVxuXG4vLyBUaGVzZSBmdW5jdGlvbnMgY2hhbmdlIHZlcmlmaWVyIHN0YXRlIGFuZCBlZmZpY2llbnRseSByZXR1cm4gdG8gdGhlIG9sZCBzdGF0ZSB3aGVuIGZpbmlzaGVkLlxuY29uc3Rcblx0d2l0aEluRGVidWcgPSBhY3Rpb24gPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5EZWJ1ZyA9IGlzSW5EZWJ1Z1xuXHRcdGlzSW5EZWJ1ZyA9IHRydWVcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5EZWJ1ZyA9IG9sZElzSW5EZWJ1Z1xuXHR9LFxuXG5cdHdpdGhJbkdlbmVyYXRvciA9IChuZXdJc0luR2VuZXJhdG9yLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBvbGRJc0luR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSBuZXdJc0luR2VuZXJhdG9yXG5cdFx0YWN0aW9uKClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSXNJbkdlbmVyYXRvclxuXHR9LFxuXG5cdHdpdGhJbkxvb3AgPSAobmV3TG9vcCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkTG9vcCA9IG9wTG9vcFxuXHRcdG9wTG9vcCA9IG5ld0xvb3Bcblx0XHRhY3Rpb24oKVxuXHRcdG9wTG9vcCA9IG9sZExvb3Bcblx0fSxcblxuXHRwbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KGFkZGVkTG9jYWwubmFtZSlcblx0XHRsb2NhbHMuc2V0KGFkZGVkTG9jYWwubmFtZSwgYWRkZWRMb2NhbClcblx0XHRhY3Rpb24oKVxuXHRcdGlmIChzaGFkb3dlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0ZGVsZXRlTG9jYWwoYWRkZWRMb2NhbClcblx0XHRlbHNlXG5cdFx0XHRzZXRMb2NhbChzaGFkb3dlZClcblx0fSxcblxuXHQvLyBTaG91bGQgaGF2ZSB2ZXJpZmllZCB0aGF0IGFkZGVkTG9jYWxzIGFsbCBoYXZlIGRpZmZlcmVudCBuYW1lcy5cblx0cGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWRMb2NhbHMgPSBbIF1cblx0XHRmb3IgKGNvbnN0IF8gb2YgYWRkZWRMb2NhbHMpIHtcblx0XHRcdGNvbnN0IHNoYWRvd2VkID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRpZiAoc2hhZG93ZWQgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0c2hhZG93ZWRMb2NhbHMucHVzaChzaGFkb3dlZClcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fVxuXG5cdFx0YWN0aW9uKClcblxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWRMb2NhbHMuZm9yRWFjaChzZXRMb2NhbClcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0dmVyaWZ5TG9jYWxEZWNsYXJlKGFkZGVkTG9jYWwpXG5cdFx0cGx1c0xvY2FsKGFkZGVkTG9jYWwsIGFjdGlvbilcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRjb25zdCBuYW1lcyA9IG5ldyBTZXQoKVxuXHRcdGZvciAoY29uc3QgXyBvZiBhZGRlZExvY2Fscykge1xuXHRcdFx0Y29udGV4dC5jaGVjayghbmFtZXMuaGFzKF8ubmFtZSksIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRgRHVwbGljYXRlIGxvY2FsICR7Y29kZShfLm5hbWUpfWApXG5cdFx0XHRuYW1lcy5hZGQoXy5uYW1lKVxuXHRcdH1cblx0XHRwbHVzTG9jYWxzKGFkZGVkTG9jYWxzLCBhY3Rpb24pXG5cdH0sXG5cblx0d2l0aEJsb2NrTG9jYWxzID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRQZW5kaW5nQmxvY2tMb2NhbHMgPSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0XHRwbHVzTG9jYWxzKG9sZFBlbmRpbmdCbG9ja0xvY2FscywgYWN0aW9uKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IG9sZFBlbmRpbmdCbG9ja0xvY2Fsc1xuXHR9LFxuXG5cdC8vIENhbid0IGJyZWFrIG91dCBvZiBsb29wIGluc2lkZSBvZiBJSUZFLlxuXHR3aXRoSUlGRSA9IGFjdGlvbiA9PiB7XG5cdFx0d2l0aEluTG9vcChmYWxzZSwgYWN0aW9uKVxuXHR9XG5cbmNvbnN0IHZlcmlmeUxvY2FsVXNlID0gKCkgPT5cblx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZm9yRWFjaCgoaW5mbywgbG9jYWwpID0+IHtcblx0XHRpZiAoIShsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZUJ1aWx0IHx8IGxvY2FsIGluc3RhbmNlb2YgTG9jYWxEZWNsYXJlUmVzKSkge1xuXHRcdFx0Y29uc3Qgbm9Ob25EZWJ1ZyA9IGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKVxuXHRcdFx0aWYgKG5vTm9uRGVidWcgJiYgaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpKVxuXHRcdFx0XHRjb250ZXh0Lndhcm4obG9jYWwubG9jLCAoKSA9PiBgVW51c2VkIGxvY2FsIHZhcmlhYmxlICR7Y29kZShsb2NhbC5uYW1lKX0uYClcblx0XHRcdGVsc2UgaWYgKGluZm8uaXNJbkRlYnVnKVxuXHRcdFx0XHRjb250ZXh0Lndhcm5JZighbm9Ob25EZWJ1ZywgKCkgPT4gaGVhZChpbmZvLm5vbkRlYnVnQWNjZXNzZXMpLmxvYywgKCkgPT5cblx0XHRcdFx0XHRgRGVidWctb25seSBsb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb3V0c2lkZSBvZiBkZWJ1Zy5gKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjb250ZXh0Lndhcm5JZihub05vbkRlYnVnLCBsb2NhbC5sb2MsICgpID0+XG5cdFx0XHRcdFx0YExvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvbmx5IGluIGRlYnVnLmApXG5cdFx0fVxuXHR9KVxuXG5pbXBsZW1lbnRNYW55KE1zQXN0VHlwZXMsICd2ZXJpZnknLCB7XG5cdEFzc2VydCgpIHtcblx0XHR0aGlzLmNvbmRpdGlvbi52ZXJpZnkoKVxuXHRcdG9wRWFjaCh0aGlzLm9wVGhyb3duLCB2ZXJpZnkpXG5cdH0sXG5cblx0QXNzaWduU2luZ2xlKCkge1xuXHRcdGNvbnN0IGRvViA9ICgpID0+IHtcblx0XHRcdC8vIEFzc2lnbmVlIHJlZ2lzdGVyZWQgYnkgdmVyaWZ5TGluZXMuXG5cdFx0XHR0aGlzLmFzc2lnbmVlLnZlcmlmeSgpXG5cdFx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmFzc2lnbmVlLmlzTGF6eSgpKVxuXHRcdFx0d2l0aEJsb2NrTG9jYWxzKGRvVilcblx0XHRlbHNlXG5cdFx0XHRkb1YoKVxuXHR9LFxuXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdHRoaXMuYXNzaWduZWVzLmZvckVhY2godmVyaWZ5KVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRCYWdFbnRyeTogdmVyaWZ5QmFnRW50cnksXG5cdEJhZ0VudHJ5TWFueTogdmVyaWZ5QmFnRW50cnksXG5cblx0QmFnU2ltcGxlKCkgeyB0aGlzLnBhcnRzLmZvckVhY2godmVyaWZ5KSB9LFxuXG5cdEJsb2NrRG8oKSB7IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpIH0sXG5cblx0QmxvY2tWYWxUaHJvdygpIHtcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiB0aGlzLl90aHJvdy52ZXJpZnkoKSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4oKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5yZXR1cm5lZC52ZXJpZnkoKSlcblx0fSxcblxuXHRCbG9ja09iaigpIHtcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRcdG9wRWFjaCh0aGlzLm9wT2JqZWQsIF8gPT4gcGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IF8udmVyaWZ5KCkpKVxuXHRcdH0pXG5cdH0sXG5cblx0QmxvY2tCYWc6IHZlcmlmeUJsb2NrQmFnT3JNYXAsXG5cdEJsb2NrTWFwOiB2ZXJpZnlCbG9ja0JhZ09yTWFwLFxuXG5cdEJsb2NrV3JhcCgpIHsgd2l0aElJRkUoKCkgPT4gdGhpcy5ibG9jay52ZXJpZnkoKSkgfSxcblxuXHRCcmVha0RvKCkge1xuXHRcdHZlcmlmeUluTG9vcCh0aGlzKVxuXHRcdGNvbnRleHQuY2hlY2soIShvcExvb3AgaW5zdGFuY2VvZiBGb3JWYWwpLCB0aGlzLmxvYywgKCkgPT5cblx0XHRcdGAke2NvZGUoJ2ZvcicpfSBtdXN0IGJyZWFrIHdpdGggYSB2YWx1ZS5gKVxuXHR9LFxuXG5cdEJyZWFrVmFsKCkge1xuXHRcdHZlcmlmeUluTG9vcCh0aGlzKVxuXHRcdGNvbnRleHQuY2hlY2sob3BMb29wIGluc3RhbmNlb2YgRm9yVmFsLCB0aGlzLmxvYywgKCkgPT5cblx0XHRcdGAke2NvZGUoJ2JyZWFrJyl9IG9ubHkgdmFsaWQgaW5zaWRlICR7Y29kZSgnZm9yJyl9YClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0Q2FsbCgpIHtcblx0XHR0aGlzLmNhbGxlZC52ZXJpZnkoKVxuXHRcdHRoaXMuYXJncy5mb3JFYWNoKHZlcmlmeSlcblx0fSxcblxuXHRDYXNlRG8oKSB7IHZlcmlmeUNhc2UodGhpcykgfSxcblx0Q2FzZURvUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cdENhc2VWYWwoKSB7IHdpdGhJSUZFKCgpID0+IHZlcmlmeUNhc2UodGhpcykpIH0sXG5cdENhc2VWYWxQYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblxuXHRDYXRjaCgpIHtcblx0XHRjb250ZXh0LmNoZWNrKHRoaXMuY2F1Z2h0Lm9wVHlwZSA9PT0gbnVsbCwgdGhpcy5jYXVnaHQubG9jLCAnVE9ETzogQ2F1Z2h0IHR5cGVzJylcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5jYXVnaHQsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpXG5cdH0sXG5cblx0Q2xhc3MoKSB7XG5cdFx0b3BFYWNoKHRoaXMuc3VwZXJDbGFzcywgdmVyaWZ5KVxuXHRcdG9wRWFjaCh0aGlzLm9wRG8sIHZlcmlmeSlcblx0XHR0aGlzLnN0YXRpY3MuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0b3BFYWNoKHRoaXMub3BDb25zdHJ1Y3RvciwgdmVyaWZ5KVxuXHRcdHRoaXMubWV0aG9kcy5mb3JFYWNoKHZlcmlmeSlcblx0fSxcblxuXHRDbGFzc0RvKCkge1xuXHRcdHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmRlY2xhcmVGb2N1cywgKCkgPT4gdGhpcy5ibG9jay52ZXJpZnkoKSlcblx0fSxcblxuXHRDb25kaXRpb25hbERvKCkge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHRoaXMucmVzdWx0LnZlcmlmeSgpXG5cdH0sXG5cdENvbmRpdGlvbmFsVmFsKCkge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHdpdGhJSUZFKCgpID0+IHRoaXMucmVzdWx0LnZlcmlmeSgpKVxuXHR9LFxuXG5cdENvbnRpbnVlKCkgeyB2ZXJpZnlJbkxvb3AodGhpcykgfSxcblxuXHQvLyBPbmx5IHJlYWNoIGhlcmUgZm9yIGluL291dCBjb25kaXRpb24uXG5cdERlYnVnKCkgeyB2ZXJpZnlMaW5lcyhbIHRoaXMgXSkgfSxcblxuXHRFeGNlcHREbzogdmVyaWZ5RXhjZXB0LFxuXHRFeGNlcHRWYWw6IHZlcmlmeUV4Y2VwdCxcblxuXHRGb3JCYWcoKSB7IHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmJ1aWx0LCAoKSA9PiB2ZXJpZnlGb3IodGhpcykpIH0sXG5cblx0Rm9yRG8oKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZvclZhbCgpIHsgdmVyaWZ5Rm9yKHRoaXMpIH0sXG5cblx0RnVuKCkge1xuXHRcdHdpdGhCbG9ja0xvY2FscygoKSA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRoaXMub3BEZWNsYXJlUmVzID09PSBudWxsIHx8IHRoaXMuYmxvY2sgaW5zdGFuY2VvZiBCbG9ja1ZhbCwgdGhpcy5sb2MsXG5cdFx0XHRcdCdGdW5jdGlvbiB3aXRoIHJldHVybiBjb25kaXRpb24gbXVzdCByZXR1cm4gc29tZXRoaW5nLicpXG5cdFx0XHR3aXRoSW5HZW5lcmF0b3IodGhpcy5pc0dlbmVyYXRvciwgKCkgPT5cblx0XHRcdFx0d2l0aEluTG9vcChmYWxzZSwgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFsbEFyZ3MgPSBjYXQodGhpcy5vcERlY2xhcmVUaGlzLCB0aGlzLmFyZ3MsIHRoaXMub3BSZXN0QXJnKVxuXHRcdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbHMoYWxsQXJncywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BJbiwgdmVyaWZ5KVxuXHRcdFx0XHRcdFx0dGhpcy5ibG9jay52ZXJpZnkoKVxuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BEZWNsYXJlUmVzLCB2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0XHRcdFx0XHRjb25zdCB2ZXJpZnlPdXQgPSAoKSA9PiBvcEVhY2godGhpcy5vcE91dCwgXyA9PiBfLnZlcmlmeSgpKVxuXHRcdFx0XHRcdFx0aWZFbHNlKHRoaXMub3BEZWNsYXJlUmVzLCBfID0+IHBsdXNMb2NhbChfLCB2ZXJpZnlPdXQpLCB2ZXJpZnlPdXQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSkpXG5cdFx0fSlcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IH0sXG5cblx0TGF6eSgpIHsgd2l0aEJsb2NrTG9jYWxzKCgpID0+IHRoaXMudmFsdWUudmVyaWZ5KCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IGFjY2Vzc0xvY2FsKHRoaXMsIHRoaXMubmFtZSkgfSxcblxuXHQvLyBBZGRpbmcgTG9jYWxEZWNsYXJlcyB0byB0aGUgYXZhaWxhYmxlIGxvY2FscyBpcyBkb25lIGJ5IEZ1biBvciBsaW5lTmV3TG9jYWxzLlxuXHRMb2NhbERlY2xhcmUoKSB7IG9wRWFjaCh0aGlzLm9wVHlwZSwgdmVyaWZ5KSB9LFxuXG5cdExvY2FsTXV0YXRlKCkge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUodGhpcy5uYW1lLCB0aGlzLmxvYylcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUuaXNNdXRhYmxlKCksIHRoaXMubG9jLCAoKSA9PiBgJHtjb2RlKHRoaXMubmFtZSl9IGlzIG5vdCBtdXRhYmxlLmApXG5cdFx0Ly8gVE9ETzogVHJhY2sgbXV0YXRpb25zLiBNdXRhYmxlIGxvY2FsIG11c3QgYmUgbXV0YXRlZCBzb21ld2hlcmUuXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdExvZ2ljKCkge1xuXHRcdGNvbnRleHQuY2hlY2sodGhpcy5hcmdzLmxlbmd0aCA+IDEsICdMb2dpYyBleHByZXNzaW9uIG5lZWRzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdE5vdCgpIHsgdGhpcy5hcmcudmVyaWZ5KCkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkgeyB9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5rZXkudmVyaWZ5KClcblx0XHR0aGlzLnZhbC52ZXJpZnkoKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgdGhpcy5vYmplY3QudmVyaWZ5KCkgfSxcblxuXHRNZW1iZXJTZXQoKSB7XG5cdFx0dGhpcy5vYmplY3QudmVyaWZ5KClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0TWV0aG9kSW1wbCgpIHtcblx0XHR0aGlzLnN5bWJvbC52ZXJpZnkoKVxuXHRcdHRoaXMuZnVuLnZlcmlmeSgpXG5cdH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoaXMuZG9Vc2VzLlxuXHRcdHRoaXMudXNlcy5mb3JFYWNoKHZlcmlmeSlcblx0XHR3aXRoSW5EZWJ1ZygoKSA9PiB0aGlzLmRlYnVnVXNlcy5mb3JFYWNoKHZlcmlmeSkpXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5leHBvcnRzKVxuXHRcdFx0YWNjZXNzTG9jYWxGb3JSZXR1cm4oXywgdGhpcylcblx0XHRvcEVhY2godGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gcGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IF8udmVyaWZ5KCkpKVxuXG5cdFx0Y29uc3QgZXhwb3J0cyA9IG5ldyBTZXQodGhpcy5leHBvcnRzKVxuXHRcdGNvbnN0IG1hcmtFeHBvcnRMaW5lcyA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gJiYgbGluZS5hbGxBc3NpZ25lZXMoKS5zb21lKF8gPT4gZXhwb3J0cy5oYXMoXykpKVxuXHRcdFx0XHRyZXN1bHRzLmV4cG9ydEFzc2lnbnMuYWRkKGxpbmUpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdGxpbmUubGluZXMuZm9yRWFjaChtYXJrRXhwb3J0TGluZXMpXG5cdFx0fVxuXHRcdHRoaXMubGluZXMuZm9yRWFjaChtYXJrRXhwb3J0TGluZXMpXG5cdH0sXG5cblx0TmV3KCkge1xuXHRcdHRoaXMudHlwZS52ZXJpZnkoKVxuXHRcdHRoaXMuYXJncy5mb3JFYWNoKHZlcmlmeSlcblx0fSxcblxuXHRPYmpFbnRyeSgpIHtcblx0XHRhY2Nlc3NMb2NhbCh0aGlzLCAnYnVpbHQnKVxuXHRcdHRoaXMuYXNzaWduLnZlcmlmeSgpXG5cdFx0Zm9yIChjb25zdCBfIG9mIHRoaXMuYXNzaWduLmFsbEFzc2lnbmVlcygpKVxuXHRcdFx0YWNjZXNzTG9jYWwodGhpcywgXy5uYW1lKVxuXHR9LFxuXG5cdE9ialNpbXBsZSgpIHtcblx0XHRjb25zdCBrZXlzID0gbmV3IFNldCgpXG5cdFx0Zm9yIChjb25zdCBwYWlyIG9mIHRoaXMucGFpcnMpIHtcblx0XHRcdGNvbnN0IHsga2V5LCB2YWx1ZSB9ID0gcGFpclxuXHRcdFx0Y29udGV4dC5jaGVjaygha2V5cy5oYXMoa2V5KSwgcGFpci5sb2MsICgpID0+IGBEdXBsaWNhdGUga2V5ICR7a2V5fWApXG5cdFx0XHRrZXlzLmFkZChrZXkpXG5cdFx0XHR2YWx1ZS52ZXJpZnkoKVxuXHRcdH1cblx0fSxcblxuXHRRdW90ZSgpIHtcblx0XHRmb3IgKGNvbnN0IF8gb2YgdGhpcy5wYXJ0cylcblx0XHRcdGlmICh0eXBlb2YgXyAhPT0gJ3N0cmluZycpXG5cdFx0XHRcdF8udmVyaWZ5KClcblx0fSxcblxuXHRTcGVjaWFsRG8oKSB7IH0sXG5cblx0U3BlY2lhbFZhbCgpIHsgfSxcblxuXHRTcGxhdCgpIHsgdGhpcy5zcGxhdHRlZC52ZXJpZnkoKSB9LFxuXG5cdFRocm93KCkge1xuXHRcdG9wRWFjaCh0aGlzLm9wVGhyb3duLCB2ZXJpZnkpXG5cdH0sXG5cblx0VXNlKCkge1xuXHRcdC8vIFNpbmNlIFVzZXMgYXJlIGFsd2F5cyBpbiB0aGUgb3V0ZXJtb3N0IHNjb3BlLCBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHNoYWRvd2luZy5cblx0XHQvLyBTbyB3ZSBtdXRhdGUgYGxvY2Fsc2AgZGlyZWN0bHkuXG5cdFx0Y29uc3QgYWRkVXNlTG9jYWwgPSBfID0+IHtcblx0XHRcdGNvbnN0IHByZXYgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGNvbnRleHQuY2hlY2socHJldiA9PT0gdW5kZWZpbmVkLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0YCR7Y29kZShfLm5hbWUpfSBhbHJlYWR5IGltcG9ydGVkIGF0ICR7cHJldi5sb2N9YClcblx0XHRcdHZlcmlmeUxvY2FsRGVjbGFyZShfKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9XG5cdFx0dGhpcy51c2VkLmZvckVhY2goYWRkVXNlTG9jYWwpXG5cdFx0b3BFYWNoKHRoaXMub3BVc2VEZWZhdWx0LCBhZGRVc2VMb2NhbClcblx0fSxcblxuXHRZaWVsZCgpIHtcblx0XHRjb250ZXh0LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZC52ZXJpZnkoKVxuXHR9LFxuXG5cdFlpZWxkVG8oKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWRUby52ZXJpZnkoKVxuXHR9XG59KVxuXG5mdW5jdGlvbiB2ZXJpZnlCYWdFbnRyeSgpIHtcblx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0dGhpcy52YWx1ZS52ZXJpZnkoKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlCbG9ja0JhZ09yTWFwKCkge1xuXHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5TGluZXModGhpcy5saW5lcykpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhc2VQYXJ0KCkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdHRoaXMudGVzdC50eXBlLnZlcmlmeSgpXG5cdFx0dGhpcy50ZXN0LnBhdHRlcm5lZC52ZXJpZnkoKVxuXHRcdHZlcmlmeUFuZFBsdXNMb2NhbHModGhpcy50ZXN0LmxvY2FscywgKCkgPT4gdGhpcy5yZXN1bHQudmVyaWZ5KCkpXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdFx0dGhpcy5yZXN1bHQudmVyaWZ5KClcblx0fVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlFeGNlcHQoKSB7XG5cdHRoaXMuX3RyeS52ZXJpZnkoKVxuXHRvcEVhY2godGhpcy5fY2F0Y2gsIHZlcmlmeSlcblx0b3BFYWNoKHRoaXMuX2ZpbmFsbHksIHZlcmlmeSlcbn1cblxuLy8gSGVscGVycyBzcGVjaWZpYyB0byBjZXJ0YWluIE1zQXN0IHR5cGVzOlxuY29uc3Rcblx0dmVyaWZ5Rm9yID0gZm9yTG9vcCA9PiB7XG5cdFx0Y29uc3QgdmVyaWZ5QmxvY2sgPSAoKSA9PiB3aXRoSW5Mb29wKGZvckxvb3AsICgpID0+IGZvckxvb3AuYmxvY2sudmVyaWZ5KCkpXG5cdFx0aWZFbHNlKGZvckxvb3Aub3BJdGVyYXRlZSxcblx0XHRcdCh7IGVsZW1lbnQsIGJhZyB9KSA9PiB7XG5cdFx0XHRcdGJhZy52ZXJpZnkoKVxuXHRcdFx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwoZWxlbWVudCwgdmVyaWZ5QmxvY2spXG5cdFx0XHR9LFxuXHRcdFx0dmVyaWZ5QmxvY2spXG5cdH0sXG5cblx0dmVyaWZ5SW5Mb29wID0gbG9vcFVzZXIgPT5cblx0XHRjb250ZXh0LmNoZWNrKG9wTG9vcCAhPT0gbnVsbCwgbG9vcFVzZXIubG9jLCAnTm90IGluIGEgbG9vcC4nKSxcblxuXG5cdHZlcmlmeUNhc2UgPSBfID0+IHtcblx0XHRjb25zdCBkb0l0ID0gKCkgPT4ge1xuXHRcdFx0Xy5wYXJ0cy5mb3JFYWNoKHZlcmlmeSlcblx0XHRcdG9wRWFjaChfLm9wRWxzZSwgdmVyaWZ5KVxuXHRcdH1cblx0XHRpZkVsc2UoXy5vcENhc2VkLFxuXHRcdFx0XyA9PiB7XG5cdFx0XHRcdF8udmVyaWZ5KClcblx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKF8uYXNzaWduZWUsIGRvSXQpXG5cdFx0XHR9LFxuXHRcdFx0ZG9JdClcblx0fVxuXG4vLyBHZW5lcmFsIHV0aWxpdGllczpcbmNvbnN0XG5cdGdldExvY2FsRGVjbGFyZSA9IChuYW1lLCBhY2Nlc3NMb2MpID0+IHtcblx0XHRjb25zdCBkZWNsYXJlID0gbG9jYWxzLmdldChuYW1lKVxuXHRcdGNvbnRleHQuY2hlY2soZGVjbGFyZSAhPT0gdW5kZWZpbmVkLCBhY2Nlc3NMb2MsICgpID0+IHtcblx0XHRcdGNvbnN0IHNob3dMb2NhbHMgPSBjb2RlKGl0ZXJhdG9yVG9BcnJheShsb2NhbHMua2V5cygpKS5qb2luKCcgJykpXG5cdFx0XHRyZXR1cm4gYE5vIHN1Y2ggbG9jYWwgJHtjb2RlKG5hbWUpfS5cXG5Mb2NhbHMgYXJlOlxcbiR7c2hvd0xvY2Fsc30uYFxuXHRcdH0pXG5cdFx0cmV0dXJuIGRlY2xhcmVcblx0fSxcblxuXHRsaW5lTmV3TG9jYWxzID0gbGluZSA9PlxuXHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ25TaW5nbGUgP1xuXHRcdFx0WyBsaW5lLmFzc2lnbmVlIF0gOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlID9cblx0XHRcdGxpbmUuYXNzaWduZWVzIDpcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSA/XG5cdFx0XHRsaW5lTmV3TG9jYWxzKGxpbmUuYXNzaWduKSA6XG5cdFx0XHRbIF0sXG5cblx0dmVyaWZ5TGluZXMgPSBsaW5lcyA9PiB7XG5cdFx0Lypcblx0XHRXZSBuZWVkIHRvIGJldCBhbGwgYmxvY2sgbG9jYWxzIHVwLWZyb250IGJlY2F1c2Vcblx0XHRGdW5jdGlvbnMgd2l0aGluIGxpbmVzIGNhbiBhY2Nlc3MgbG9jYWxzIGZyb20gbGF0ZXIgbGluZXMuXG5cdFx0Tk9URTogV2UgcHVzaCB0aGVzZSBvbnRvIHBlbmRpbmdCbG9ja0xvY2FscyBpbiByZXZlcnNlXG5cdFx0c28gdGhhdCB3aGVuIHdlIGl0ZXJhdGUgdGhyb3VnaCBsaW5lcyBmb3J3YXJkcywgd2UgY2FuIHBvcCBmcm9tIHBlbmRpbmdCbG9ja0xvY2Fsc1xuXHRcdHRvIHJlbW92ZSBwZW5kaW5nIGxvY2FscyBhcyB0aGV5IGJlY29tZSByZWFsIGxvY2Fscy5cblx0XHRJdCBkb2Vzbid0IHJlYWxseSBtYXR0ZXIgd2hhdCBvcmRlciB3ZSBhZGQgbG9jYWxzIGluIHNpbmNlIGl0J3Mgbm90IGFsbG93ZWRcblx0XHR0byBoYXZlIHR3byBsb2NhbHMgb2YgdGhlIHNhbWUgbmFtZSBpbiB0aGUgc2FtZSBibG9jay5cblx0XHQqL1xuXHRcdGNvbnN0IG5ld0xvY2FscyA9IFsgXVxuXG5cdFx0Y29uc3QgZ2V0TGluZUxvY2FscyA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0d2l0aEluRGVidWcoKCkgPT4gZWFjaFJldmVyc2UobGluZS5saW5lcywgZ2V0TGluZUxvY2FscykpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVhY2hSZXZlcnNlKGxpbmVOZXdMb2NhbHMobGluZSksIF8gPT4ge1xuXHRcdFx0XHRcdC8vIFJlZ2lzdGVyIHRoZSBsb2NhbCBub3cuIENhbid0IHdhaXQgdW50aWwgdGhlIGFzc2lnbiBpcyB2ZXJpZmllZC5cblx0XHRcdFx0XHRyZWdpc3RlckxvY2FsKF8pXG5cdFx0XHRcdFx0bmV3TG9jYWxzLnB1c2goXylcblx0XHRcdFx0fSlcblx0XHR9XG5cdFx0ZWFjaFJldmVyc2UobGluZXMsIGdldExpbmVMb2NhbHMpXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzLnB1c2goLi4ubmV3TG9jYWxzKVxuXG5cdFx0Lypcblx0XHRLZWVwcyB0cmFjayBvZiBsb2NhbHMgd2hpY2ggaGF2ZSBhbHJlYWR5IGJlZW4gYWRkZWQgaW4gdGhpcyBibG9jay5cblx0XHRNYXNvbiBhbGxvd3Mgc2hhZG93aW5nLCBidXQgbm90IHdpdGhpbiB0aGUgc2FtZSBibG9jay5cblx0XHRTbywgdGhpcyBpcyBhbGxvd2VkOlxuXHRcdFx0YSA9IDFcblx0XHRcdGIgPVxuXHRcdFx0XHRhID0gMlxuXHRcdFx0XHQuLi5cblx0XHRCdXQgbm90OlxuXHRcdFx0YSA9IDFcblx0XHRcdGEgPSAyXG5cdFx0Ki9cblx0XHRjb25zdCB0aGlzQmxvY2tMb2NhbE5hbWVzID0gbmV3IFNldCgpXG5cblx0XHQvLyBBbGwgc2hhZG93ZWQgbG9jYWxzIGZvciB0aGlzIGJsb2NrLlxuXHRcdGNvbnN0IHNoYWRvd2VkID0gWyBdXG5cblx0XHRjb25zdCB2ZXJpZnlMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHQvLyBUT0RPOiBEbyBhbnl0aGluZyBpbiB0aGlzIHNpdHVhdGlvbj9cblx0XHRcdFx0Ly8gY29udGV4dC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdSZWR1bmRhbnQgYGRlYnVnYC4nKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBsaW5lLmxpbmVzLmZvckVhY2godmVyaWZ5TGluZSkpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmVyaWZ5SXNTdGF0ZW1lbnQobGluZSlcblx0XHRcdFx0Zm9yIChjb25zdCBuZXdMb2NhbCBvZiBsaW5lTmV3TG9jYWxzKGxpbmUpKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG5ld0xvY2FsLm5hbWVcblx0XHRcdFx0XHRjb25zdCBvbGRMb2NhbCA9IGxvY2Fscy5nZXQobmFtZSlcblx0XHRcdFx0XHRpZiAob2xkTG9jYWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayghdGhpc0Jsb2NrTG9jYWxOYW1lcy5oYXMobmFtZSksIG5ld0xvY2FsLmxvYyxcblx0XHRcdFx0XHRcdFx0KCkgPT4gYEEgbG9jYWwgJHtjb2RlKG5hbWUpfSBpcyBhbHJlYWR5IGluIHRoaXMgYmxvY2suYClcblx0XHRcdFx0XHRcdHNoYWRvd2VkLnB1c2gob2xkTG9jYWwpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXNCbG9ja0xvY2FsTmFtZXMuYWRkKG5hbWUpXG5cdFx0XHRcdFx0c2V0TG9jYWwobmV3TG9jYWwpXG5cblx0XHRcdFx0XHQvLyBOb3cgdGhhdCBpdCdzIGFkZGVkIGFzIGEgbG9jYWwsIGl0J3Mgbm8gbG9uZ2VyIHBlbmRpbmcuXG5cdFx0XHRcdFx0Ly8gV2UgYWRkZWQgcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHRoZSByaWdodCBvcmRlciB0aGF0IHdlIGNhbiBqdXN0IHBvcCB0aGVtIG9mZi5cblx0XHRcdFx0XHRjb25zdCBwb3BwZWQgPSBwZW5kaW5nQmxvY2tMb2NhbHMucG9wKClcblx0XHRcdFx0XHRhc3NlcnQocG9wcGVkID09PSBuZXdMb2NhbClcblx0XHRcdFx0fVxuXHRcdFx0XHRsaW5lLnZlcmlmeSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKVxuXG5cdFx0bmV3TG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWQuZm9yRWFjaChzZXRMb2NhbClcblxuXHRcdHJldHVybiBuZXdMb2NhbHNcblx0fSxcblxuXHR2ZXJpZnlJc1N0YXRlbWVudCA9IGxpbmUgPT4ge1xuXHRcdGNvbnN0IGlzU3RhdGVtZW50ID1cblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBEbyB8fFxuXHRcdFx0Ly8gU29tZSB2YWx1ZXMgYXJlIGFsc28gYWNjZXB0YWJsZS5cblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBDYWxsIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGQgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZFRvXG5cdFx0Y29udGV4dC5jaGVjayhpc1N0YXRlbWVudCwgbGluZS5sb2MsICdFeHByZXNzaW9uIGluIHN0YXRlbWVudCBwb3NpdGlvbi4nKVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==