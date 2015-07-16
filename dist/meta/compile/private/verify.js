if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', '../MsAst', './util', './VerifyResults'], function (exports, module, _CompileError, _MsAst, _util, _VerifyResults) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _VerifyResults2 = _interopRequireDefault(_VerifyResults);

	/*
 The verifier generates information needed during transpiling, the VerifyResults.
 */

	module.exports = function (_context, msAst) {
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

	const verify = function (msAst) {
		return msAst.verify();
	},
	      deleteLocal = function (localDeclare) {
		return locals.delete(localDeclare.name);
	},
	      setLocal = function (localDeclare) {
		return locals.set(localDeclare.name, localDeclare);
	},
	     

	// When a local is returned from a BlockObj or Module,
	// the return 'access' is considered to be 'debug' if the local is.
	accessLocalForReturn = function (declare, access) {
		const info = results.localDeclareToInfo.get(declare);
		_addLocalAccess(info, access, info.isInDebug);
	},
	      accessLocal = function (access, name) {
		const declare = getLocalDeclare(name, access.loc);
		results.localAccessToDeclare.set(access, declare);
		_addLocalAccess(results.localDeclareToInfo.get(declare), access, isInDebug);
	},
	      _addLocalAccess = function (localInfo, access, isDebugAccess) {
		return (isDebugAccess ? localInfo.debugAccesses : localInfo.nonDebugAccesses).push(access);
	},
	     

	// For expressions affecting lineNewLocals, they will be registered before being verified.
	// So, LocalDeclare.verify just the type.
	// For locals not affecting lineNewLocals, use this instead of just declare.verify()
	verifyLocalDeclare = function (localDeclare) {
		registerLocal(localDeclare);
		localDeclare.verify();
	},
	      registerLocal = function (localDeclare) {
		return results.localDeclareToInfo.set(localDeclare, _VerifyResults.LocalInfo.empty(isInDebug));
	};

	// These functions change verifier state and efficiently return to the old state when finished.
	const withInDebug = function (action) {
		const oldIsInDebug = isInDebug;
		isInDebug = true;
		action();
		isInDebug = oldIsInDebug;
	},
	      withInGenerator = function (newIsInGenerator, action) {
		const oldIsInGenerator = isInGenerator;
		isInGenerator = newIsInGenerator;
		action();
		isInGenerator = oldIsInGenerator;
	},
	      withInLoop = function (newLoop, action) {
		const oldLoop = opLoop;
		opLoop = newLoop;
		action();
		opLoop = oldLoop;
	},
	      plusLocal = function (addedLocal, action) {
		const shadowed = locals.get(addedLocal.name);
		locals.set(addedLocal.name, addedLocal);
		action();
		if (shadowed === undefined) deleteLocal(addedLocal);else setLocal(shadowed);
	},
	     

	// Should have verified that addedLocals all have different names.
	plusLocals = function (addedLocals, action) {
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
	      verifyAndPlusLocal = function (addedLocal, action) {
		verifyLocalDeclare(addedLocal);
		plusLocal(addedLocal, action);
	},
	      verifyAndPlusLocals = function (addedLocals, action) {
		addedLocals.forEach(verifyLocalDeclare);
		const names = new Set();
		for (const _ of addedLocals) {
			context.check(!names.has(_.name), _.loc, function () {
				return 'Duplicate local ' + (0, _CompileError.code)(_.name);
			});
			names.add(_.name);
		}
		plusLocals(addedLocals, action);
	},
	      withBlockLocals = function (action) {
		const oldPendingBlockLocals = pendingBlockLocals;
		pendingBlockLocals = [];
		plusLocals(oldPendingBlockLocals, action);
		pendingBlockLocals = oldPendingBlockLocals;
	},
	     

	// Can't break out of loop inside of IIFE.
	withIIFE = function (action) {
		withInLoop(false, action);
	};

	const verifyLocalUse = function () {
		return results.localDeclareToInfo.forEach(function (info, local) {
			if (!(local instanceof _MsAst.LocalDeclareBuilt || local instanceof _MsAst.LocalDeclareRes)) {
				const noNonDebug = (0, _util.isEmpty)(info.nonDebugAccesses);
				if (noNonDebug && (0, _util.isEmpty)(info.debugAccesses)) context.warn(local.loc, function () {
					return 'Unused local variable ' + (0, _CompileError.code)(local.name) + '.';
				});else if (info.isInDebug) context.warnIf(!noNonDebug, function () {
					return (0, _util.head)(info.nonDebugAccesses).loc;
				}, function () {
					return 'Debug-only local ' + (0, _CompileError.code)(local.name) + ' used outside of debug.';
				});else context.warnIf(noNonDebug, local.loc, function () {
					return 'Local ' + (0, _CompileError.code)(local.name) + ' used only in debug.';
				});
			}
		});
	};

	(0, _util.implementMany)(_MsAst, 'verify', {
		Assert: function () {
			this.condition.verify();
			(0, _util.opEach)(this.opThrown, verify);
		},

		AssignSingle: function () {
			var _this = this;

			const doV = function () {
				// Assignee registered by verifyLines.
				_this.assignee.verify();
				_this.value.verify();
			};
			if (this.assignee.isLazy()) withBlockLocals(doV);else doV();
		},

		AssignDestructure: function () {
			// Assignees registered by verifyLines.
			this.assignees.forEach(verify);
			this.value.verify();
		},

		BagEntry: verifyBagEntry,
		BagEntryMany: verifyBagEntry,

		BagSimple: function () {
			this.parts.forEach(verify);
		},

		BlockDo: function () {
			verifyLines(this.lines);
		},

		BlockValThrow: function () {
			var _this2 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this2._throw.verify();
			});
		},

		BlockWithReturn: function () {
			var _this3 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this3.returned.verify();
			});
		},

		BlockObj: function () {
			var _this4 = this;

			verifyAndPlusLocal(this.built, function () {
				const newLocals = verifyLines(_this4.lines);
				(0, _util.opEach)(_this4.opObjed, function (_) {
					return plusLocals(newLocals, function () {
						return _.verify();
					});
				});
			});
		},

		BlockBag: verifyBlockBagOrMap,
		BlockMap: verifyBlockBagOrMap,

		BlockWrap: function () {
			var _this5 = this;

			withIIFE(function () {
				return _this5.block.verify();
			});
		},

		BreakDo: function () {
			verifyInLoop(this);
			context.check(!(opLoop instanceof _MsAst.ForVal), this.loc, function () {
				return (0, _CompileError.code)('for') + ' must break with a value.';
			});
		},

		BreakVal: function () {
			verifyInLoop(this);
			context.check(opLoop instanceof _MsAst.ForVal, this.loc, function () {
				return (0, _CompileError.code)('break') + ' only valid inside ' + (0, _CompileError.code)('for');
			});
			this.value.verify();
		},

		Call: function () {
			this.called.verify();
			this.args.forEach(verify);
		},

		CaseDo: function () {
			verifyCase(this);
		},
		CaseDoPart: verifyCasePart,
		CaseVal: function () {
			var _this6 = this;

			withIIFE(function () {
				return verifyCase(_this6);
			});
		},
		CaseValPart: verifyCasePart,

		Catch: function () {
			var _this7 = this;

			context.check(this.caught.opType === null, this.caught.loc, 'TODO: Caught types');
			verifyAndPlusLocal(this.caught, function () {
				return _this7.block.verify();
			});
		},

		ConditionalDo: function () {
			this.test.verify();
			this.result.verify();
		},
		ConditionalVal: function () {
			var _this8 = this;

			this.test.verify();
			withIIFE(function () {
				return _this8.result.verify();
			});
		},

		Continue: function () {
			verifyInLoop(this);
		},

		// Only reach here for in/out condition.
		Debug: function () {
			verifyLines([this]);
		},

		ExceptDo: verifyExcept,
		ExceptVal: verifyExcept,

		ForBag: function () {
			var _this9 = this;

			verifyAndPlusLocal(this.built, function () {
				return verifyFor(_this9);
			});
		},

		ForDo: function () {
			verifyFor(this);
		},

		ForVal: function () {
			verifyFor(this);
		},

		Fun: function () {
			var _this10 = this;

			withBlockLocals(function () {
				context.check(_this10.opResDeclare === null || _this10.block instanceof _MsAst.BlockVal, _this10.loc, 'Function with return condition must return something.');
				withInGenerator(_this10.isGenerator, function () {
					return withInLoop(false, function () {
						const allArgs = (0, _util.cat)(_this10.args, _this10.opRestArg);
						verifyAndPlusLocals(allArgs, function () {
							(0, _util.opEach)(_this10.opIn, verify);
							_this10.block.verify();
							(0, _util.opEach)(_this10.opResDeclare, verifyLocalDeclare);
							const verifyOut = function () {
								return (0, _util.opEach)(_this10.opOut, function (_) {
									return _.verify();
								});
							};
							(0, _util.ifElse)(_this10.opResDeclare, function (_) {
								return plusLocal(_, verifyOut);
							}, verifyOut);
						});
					});
				});
			});
		},

		GlobalAccess: function () {},

		Lazy: function () {
			var _this11 = this;

			withBlockLocals(function () {
				return _this11.value.verify();
			});
		},

		LocalAccess: function () {
			accessLocal(this, this.name);
		},

		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare: function () {
			(0, _util.opEach)(this.opType, verify);
		},

		LocalMutate: function () {
			var _this12 = this;

			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, function () {
				return (0, _CompileError.code)(_this12.name) + ' is not mutable.';
			});
			// TODO: Track mutations. Mutable local must be mutated somewhere.
			this.value.verify();
		},

		Logic: function () {
			context.check(this.args.length > 1, 'Logic expression needs at least 2 arguments.');
			this.args.forEach(verify);
		},

		Not: function () {
			this.arg.verify();
		},

		NumberLiteral: function () {},

		MapEntry: function () {
			accessLocal(this, 'built');
			this.key.verify();
			this.val.verify();
		},

		Member: function () {
			this.object.verify();
		},

		Module: function () {
			var _this13 = this;

			// No need to verify this.doUses.
			this.uses.forEach(verify);
			withInDebug(function () {
				return _this13.debugUses.forEach(verify);
			});
			const newLocals = verifyLines(this.lines);
			for (const _ of this.exports) accessLocalForReturn(_, this);
			(0, _util.opEach)(this.opDefaultExport, function (_) {
				return plusLocals(newLocals, function () {
					return _.verify();
				});
			});

			const exports = new Set(this.exports);
			const markExportLines = function (line) {
				if (line instanceof _MsAst.Assign && line.allAssignees().some(function (_) {
					return exports.has(_);
				})) results.exportAssigns.add(line);else if (line instanceof _MsAst.Debug) line.lines.forEach(markExportLines);
			};
			this.lines.forEach(markExportLines);
		},

		New: function () {
			this.type.verify();
			this.args.forEach(verify);
		},

		ObjEntry: function () {
			accessLocal(this, 'built');
			this.assign.verify();
			for (const _ of this.assign.allAssignees()) accessLocal(this, _.name);
		},

		ObjSimple: function () {
			const keys = new Set();
			for (const pair of this.pairs) {
				const key = pair.key;
				const value = pair.value;

				context.check(!keys.has(key), pair.loc, function () {
					return 'Duplicate key ' + key;
				});
				keys.add(key);
				value.verify();
			}
		},

		Quote: function () {
			for (const _ of this.parts) if (typeof _ !== 'string') _.verify();
		},

		SpecialDo: function () {},

		SpecialVal: function () {},

		Splat: function () {
			this.splatted.verify();
		},

		Throw: function () {
			(0, _util.opEach)(this.opThrown, verify);
		},

		Use: function () {
			// Since Uses are always in the outermost scope, don't have to worry about shadowing.
			// So we mutate `locals` directly.
			const addUseLocal = function (_) {
				const prev = locals.get(_.name);
				context.check(prev === undefined, _.loc, function () {
					return (0, _CompileError.code)(_.name) + ' already imported at ' + prev.loc;
				});
				verifyLocalDeclare(_);
				setLocal(_);
			};
			this.used.forEach(addUseLocal);
			(0, _util.opEach)(this.opUseDefault, addUseLocal);
		},

		Yield: function () {
			context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yielded.verify();
		},

		YieldTo: function () {
			context.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yieldedTo.verify();
		}
	});

	function verifyBagEntry() {
		accessLocal(this, 'built');
		this.value.verify();
	}

	function verifyBlockBagOrMap() {
		var _this14 = this;

		verifyAndPlusLocal(this.built, function () {
			return verifyLines(_this14.lines);
		});
	}

	function verifyCasePart() {
		var _this15 = this;

		if (this.test instanceof _MsAst.Pattern) {
			this.test.type.verify();
			this.test.patterned.verify();
			verifyAndPlusLocals(this.test.locals, function () {
				return _this15.result.verify();
			});
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
	const verifyFor = function (forLoop) {
		const verifyBlock = function () {
			return withInLoop(forLoop, function () {
				return forLoop.block.verify();
			});
		};
		(0, _util.ifElse)(forLoop.opIteratee, function (_ref) {
			let element = _ref.element;
			let bag = _ref.bag;

			bag.verify();
			verifyAndPlusLocal(element, verifyBlock);
		}, verifyBlock);
	},
	      verifyInLoop = function (loopUser) {
		return context.check(opLoop !== null, loopUser.loc, 'Not in a loop.');
	},
	      verifyCase = function (_) {
		const doIt = function () {
			_.parts.forEach(verify);
			(0, _util.opEach)(_.opElse, verify);
		};
		(0, _util.ifElse)(_.opCased, function (_) {
			_.verify();
			verifyAndPlusLocal(_.assignee, doIt);
		}, doIt);
	};

	// General utilities:
	const getLocalDeclare = function (name, accessLoc) {
		const declare = locals.get(name);
		context.check(declare !== undefined, accessLoc, function () {
			const showLocals = (0, _CompileError.code)((0, _util.iteratorToArray)(locals.keys()).join(' '));
			return 'No such local ' + (0, _CompileError.code)(name) + '.\nLocals are:\n' + showLocals + '.';
		});
		return declare;
	},
	      lineNewLocals = function (line) {
		return line instanceof _MsAst.AssignSingle ? [line.assignee] : line instanceof _MsAst.AssignDestructure ? line.assignees : line instanceof _MsAst.ObjEntry ? lineNewLocals(line.assign) : [];
	},
	      verifyLines = function (lines) {
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

		const getLineLocals = function (line) {
			if (line instanceof _MsAst.Debug) withInDebug(function () {
				return (0, _util.eachReverse)(line.lines, getLineLocals);
			});else (0, _util.eachReverse)(lineNewLocals(line), function (_) {
				// Register the local now. Can't wait until the assign is verified.
				registerLocal(_);
				newLocals.push(_);
			});
		};
		(0, _util.eachReverse)(lines, getLineLocals);
		pendingBlockLocals.push.apply(pendingBlockLocals, newLocals);

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

		const verifyLine = function (line) {
			if (line instanceof _MsAst.Debug)
				// TODO: Do anything in this situation?
				// context.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(function () {
					return line.lines.forEach(verifyLine);
				});else {
				verifyIsStatement(line);
				for (const newLocal of lineNewLocals(line)) {
					const name = newLocal.name;
					const oldLocal = locals.get(name);
					if (oldLocal !== undefined) {
						context.check(!thisBlockLocalNames.has(name), newLocal.loc, function () {
							return 'A local ' + (0, _CompileError.code)(name) + ' is already in this block.';
						});
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
	      verifyIsStatement = function (line) {
		const isStatement = line instanceof _MsAst.Do ||
		// Some values are also acceptable.
		line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxVQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLFVBQUEsS0FBSztTQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFBQTtPQUVoQyxXQUFXLEdBQUcsVUFBQSxZQUFZO1NBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztFQUFBO09BRWpDLFFBQVEsR0FBRyxVQUFBLFlBQVk7U0FDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUFBOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdB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QUFBOztBQUVELE9BQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7O0FBRXpCLFdBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDOUIsVUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTs7QUFFMUIsU0FBTyxTQUFTLENBQUE7RUFDaEI7T0FFRCxpQkFBaUIsR0FBRyxVQUFBLElBQUksRUFBSTtBQUMzQixRQUFNLFdBQVcsR0FDaEIsSUFBSSxtQkEzakJrRSxFQUFFLEFBMmpCdEQ7O0FBRWxCLE1BQUksbUJBN2pCcUQsSUFBSSxBQTZqQnpDLElBQ3BCLElBQUksbUJBN2pCaUQsS0FBSyxBQTZqQnJDLElBQ3JCLElBQUksbUJBOWpCd0QsT0FBTyxBQThqQjVDLENBQUE7QUFDeEIsU0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO0VBQ3pFLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdmVyaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCAqIGFzIE1zQXN0VHlwZXMgZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25TaW5nbGUsIEJsb2NrVmFsLCBDYWxsLCBEZWJ1ZywgRG8sIEZvclZhbCxcblx0TG9jYWxEZWNsYXJlQnVpbHQsIExvY2FsRGVjbGFyZVJlcywgT2JqRW50cnksIFBhdHRlcm4sIFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBhc3NlcnQsIGNhdCwgZWFjaFJldmVyc2UsIGhlYWQsIGlmRWxzZSwgaW1wbGVtZW50TWFueSxcblx0aXNFbXB0eSwgaXRlcmF0b3JUb0FycmF5LCBvcEVhY2ggfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgVmVyaWZ5UmVzdWx0cywgeyBMb2NhbEluZm8gfSBmcm9tICcuL1ZlcmlmeVJlc3VsdHMnXG5cbi8qXG5UaGUgdmVyaWZpZXIgZ2VuZXJhdGVzIGluZm9ybWF0aW9uIG5lZWRlZCBkdXJpbmcgdHJhbnNwaWxpbmcsIHRoZSBWZXJpZnlSZXN1bHRzLlxuKi9cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgbXNBc3QpID0+IHtcblx0Y29udGV4dCA9IF9jb250ZXh0XG5cdGxvY2FscyA9IG5ldyBNYXAoKVxuXHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0aXNJbkRlYnVnID0gaXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdG9wTG9vcCA9IG51bGxcblx0cmVzdWx0cyA9IG5ldyBWZXJpZnlSZXN1bHRzKClcblxuXHRtc0FzdC52ZXJpZnkoKVxuXHR2ZXJpZnlMb2NhbFVzZSgpXG5cblx0Y29uc3QgcmVzID0gcmVzdWx0c1xuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cdGNvbnRleHQgPSBsb2NhbHMgPSBvcExvb3AgPSBwZW5kaW5nQmxvY2tMb2NhbHMgPSByZXN1bHRzID0gdW5kZWZpbmVkXG5cdHJldHVybiByZXNcbn1cblxuLy8gVXNlIGEgdHJpY2sgbGlrZSBpbiBwYXJzZS5qcyBhbmQgaGF2ZSBldmVyeXRoaW5nIGNsb3NlIG92ZXIgdGhlc2UgbXV0YWJsZSB2YXJpYWJsZXMuXG5sZXRcblx0Y29udGV4dCxcblx0Ly8gTWFwIGZyb20gbmFtZXMgdG8gTG9jYWxEZWNsYXJlcy5cblx0bG9jYWxzLFxuXHRvcExvb3AsXG5cdC8qXG5cdExvY2FscyBmb3IgdGhpcyBibG9jay5cblx0VGhlc2UgYXJlIGFkZGVkIHRvIGxvY2FscyB3aGVuIGVudGVyaW5nIGEgRnVuY3Rpb24gb3IgbGF6eSBldmFsdWF0aW9uLlxuXHRJbjpcblx0XHRhID0gfFxuXHRcdFx0YlxuXHRcdGIgPSAxXG5cdGBiYCB3aWxsIGJlIGEgcGVuZGluZyBsb2NhbC5cblx0SG93ZXZlcjpcblx0XHRhID0gYlxuXHRcdGIgPSAxXG5cdHdpbGwgZmFpbCB0byB2ZXJpZnksIGJlY2F1c2UgYGJgIGNvbWVzIGFmdGVyIGBhYCBhbmQgaXMgbm90IGFjY2Vzc2VkIGluc2lkZSBhIGZ1bmN0aW9uLlxuXHRJdCB3b3VsZCB3b3JrIGZvciBgfmEgaXMgYmAsIHRob3VnaC5cblx0Ki9cblx0cGVuZGluZ0Jsb2NrTG9jYWxzLFxuXHRpc0luRGVidWcsXG5cdC8vIFdoZXRoZXIgd2UgYXJlIGN1cnJlbnRseSBhYmxlIHRvIHlpZWxkLlxuXHRpc0luR2VuZXJhdG9yLFxuXHRyZXN1bHRzXG5cbmNvbnN0XG5cdHZlcmlmeSA9IG1zQXN0ID0+IG1zQXN0LnZlcmlmeSgpLFxuXG5cdGRlbGV0ZUxvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxzLmRlbGV0ZShsb2NhbERlY2xhcmUubmFtZSksXG5cblx0c2V0TG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbHMuc2V0KGxvY2FsRGVjbGFyZS5uYW1lLCBsb2NhbERlY2xhcmUpLFxuXG5cdC8vIFdoZW4gYSBsb2NhbCBpcyByZXR1cm5lZCBmcm9tIGEgQmxvY2tPYmogb3IgTW9kdWxlLFxuXHQvLyB0aGUgcmV0dXJuICdhY2Nlc3MnIGlzIGNvbnNpZGVyZWQgdG8gYmUgJ2RlYnVnJyBpZiB0aGUgbG9jYWwgaXMuXG5cdGFjY2Vzc0xvY2FsRm9yUmV0dXJuID0gKGRlY2xhcmUsIGFjY2VzcykgPT4ge1xuXHRcdGNvbnN0IGluZm8gPSByZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQoZGVjbGFyZSlcblx0XHRfYWRkTG9jYWxBY2Nlc3MoaW5mbywgYWNjZXNzLCBpbmZvLmlzSW5EZWJ1Zylcblx0fSxcblxuXHRhY2Nlc3NMb2NhbCA9IChhY2Nlc3MsIG5hbWUpID0+IHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKG5hbWUsIGFjY2Vzcy5sb2MpXG5cdFx0cmVzdWx0cy5sb2NhbEFjY2Vzc1RvRGVjbGFyZS5zZXQoYWNjZXNzLCBkZWNsYXJlKVxuXHRcdF9hZGRMb2NhbEFjY2VzcyhyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQoZGVjbGFyZSksIGFjY2VzcywgaXNJbkRlYnVnKVxuXHR9LFxuXG5cdF9hZGRMb2NhbEFjY2VzcyA9IChsb2NhbEluZm8sIGFjY2VzcywgaXNEZWJ1Z0FjY2VzcykgPT5cblx0XHQoaXNEZWJ1Z0FjY2VzcyA/IGxvY2FsSW5mby5kZWJ1Z0FjY2Vzc2VzIDogbG9jYWxJbmZvLm5vbkRlYnVnQWNjZXNzZXMpLnB1c2goYWNjZXNzKSxcblxuXHQvLyBGb3IgZXhwcmVzc2lvbnMgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHRoZXkgd2lsbCBiZSByZWdpc3RlcmVkIGJlZm9yZSBiZWluZyB2ZXJpZmllZC5cblx0Ly8gU28sIExvY2FsRGVjbGFyZS52ZXJpZnkganVzdCB0aGUgdHlwZS5cblx0Ly8gRm9yIGxvY2FscyBub3QgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHVzZSB0aGlzIGluc3RlYWQgb2YganVzdCBkZWNsYXJlLnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsRGVjbGFyZSA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0cmVnaXN0ZXJMb2NhbChsb2NhbERlY2xhcmUpXG5cdFx0bG9jYWxEZWNsYXJlLnZlcmlmeSgpXG5cdH0sXG5cblx0cmVnaXN0ZXJMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLnNldChsb2NhbERlY2xhcmUsIExvY2FsSW5mby5lbXB0eShpc0luRGVidWcpKVxuXG4vLyBUaGVzZSBmdW5jdGlvbnMgY2hhbmdlIHZlcmlmaWVyIHN0YXRlIGFuZCBlZmZpY2llbnRseSByZXR1cm4gdG8gdGhlIG9sZCBzdGF0ZSB3aGVuIGZpbmlzaGVkLlxuY29uc3Rcblx0d2l0aEluRGVidWcgPSBhY3Rpb24gPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5EZWJ1ZyA9IGlzSW5EZWJ1Z1xuXHRcdGlzSW5EZWJ1ZyA9IHRydWVcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5EZWJ1ZyA9IG9sZElzSW5EZWJ1Z1xuXHR9LFxuXG5cdHdpdGhJbkdlbmVyYXRvciA9IChuZXdJc0luR2VuZXJhdG9yLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBvbGRJc0luR2VuZXJhdG9yID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSBuZXdJc0luR2VuZXJhdG9yXG5cdFx0YWN0aW9uKClcblx0XHRpc0luR2VuZXJhdG9yID0gb2xkSXNJbkdlbmVyYXRvclxuXHR9LFxuXG5cdHdpdGhJbkxvb3AgPSAobmV3TG9vcCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkTG9vcCA9IG9wTG9vcFxuXHRcdG9wTG9vcCA9IG5ld0xvb3Bcblx0XHRhY3Rpb24oKVxuXHRcdG9wTG9vcCA9IG9sZExvb3Bcblx0fSxcblxuXHRwbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KGFkZGVkTG9jYWwubmFtZSlcblx0XHRsb2NhbHMuc2V0KGFkZGVkTG9jYWwubmFtZSwgYWRkZWRMb2NhbClcblx0XHRhY3Rpb24oKVxuXHRcdGlmIChzaGFkb3dlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0ZGVsZXRlTG9jYWwoYWRkZWRMb2NhbClcblx0XHRlbHNlXG5cdFx0XHRzZXRMb2NhbChzaGFkb3dlZClcblx0fSxcblxuXHQvLyBTaG91bGQgaGF2ZSB2ZXJpZmllZCB0aGF0IGFkZGVkTG9jYWxzIGFsbCBoYXZlIGRpZmZlcmVudCBuYW1lcy5cblx0cGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWRMb2NhbHMgPSBbIF1cblx0XHRmb3IgKGNvbnN0IF8gb2YgYWRkZWRMb2NhbHMpIHtcblx0XHRcdGNvbnN0IHNoYWRvd2VkID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRpZiAoc2hhZG93ZWQgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0c2hhZG93ZWRMb2NhbHMucHVzaChzaGFkb3dlZClcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fVxuXG5cdFx0YWN0aW9uKClcblxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWRMb2NhbHMuZm9yRWFjaChzZXRMb2NhbClcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0dmVyaWZ5TG9jYWxEZWNsYXJlKGFkZGVkTG9jYWwpXG5cdFx0cGx1c0xvY2FsKGFkZGVkTG9jYWwsIGFjdGlvbilcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRjb25zdCBuYW1lcyA9IG5ldyBTZXQoKVxuXHRcdGZvciAoY29uc3QgXyBvZiBhZGRlZExvY2Fscykge1xuXHRcdFx0Y29udGV4dC5jaGVjayghbmFtZXMuaGFzKF8ubmFtZSksIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRgRHVwbGljYXRlIGxvY2FsICR7Y29kZShfLm5hbWUpfWApXG5cdFx0XHRuYW1lcy5hZGQoXy5uYW1lKVxuXHRcdH1cblx0XHRwbHVzTG9jYWxzKGFkZGVkTG9jYWxzLCBhY3Rpb24pXG5cdH0sXG5cblx0d2l0aEJsb2NrTG9jYWxzID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRQZW5kaW5nQmxvY2tMb2NhbHMgPSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0XHRwbHVzTG9jYWxzKG9sZFBlbmRpbmdCbG9ja0xvY2FscywgYWN0aW9uKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IG9sZFBlbmRpbmdCbG9ja0xvY2Fsc1xuXHR9LFxuXG5cdC8vIENhbid0IGJyZWFrIG91dCBvZiBsb29wIGluc2lkZSBvZiBJSUZFLlxuXHR3aXRoSUlGRSA9IGFjdGlvbiA9PiB7XG5cdFx0d2l0aEluTG9vcChmYWxzZSwgYWN0aW9uKVxuXHR9XG5cbmNvbnN0IHZlcmlmeUxvY2FsVXNlID0gKCkgPT5cblx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZm9yRWFjaCgoaW5mbywgbG9jYWwpID0+IHtcblx0XHRpZiAoIShsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZUJ1aWx0IHx8IGxvY2FsIGluc3RhbmNlb2YgTG9jYWxEZWNsYXJlUmVzKSkge1xuXHRcdFx0Y29uc3Qgbm9Ob25EZWJ1ZyA9IGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKVxuXHRcdFx0aWYgKG5vTm9uRGVidWcgJiYgaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpKVxuXHRcdFx0XHRjb250ZXh0Lndhcm4obG9jYWwubG9jLCAoKSA9PiBgVW51c2VkIGxvY2FsIHZhcmlhYmxlICR7Y29kZShsb2NhbC5uYW1lKX0uYClcblx0XHRcdGVsc2UgaWYgKGluZm8uaXNJbkRlYnVnKVxuXHRcdFx0XHRjb250ZXh0Lndhcm5JZighbm9Ob25EZWJ1ZywgKCkgPT4gaGVhZChpbmZvLm5vbkRlYnVnQWNjZXNzZXMpLmxvYywgKCkgPT5cblx0XHRcdFx0XHRgRGVidWctb25seSBsb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb3V0c2lkZSBvZiBkZWJ1Zy5gKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjb250ZXh0Lndhcm5JZihub05vbkRlYnVnLCBsb2NhbC5sb2MsICgpID0+XG5cdFx0XHRcdFx0YExvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvbmx5IGluIGRlYnVnLmApXG5cdFx0fVxuXHR9KVxuXG5pbXBsZW1lbnRNYW55KE1zQXN0VHlwZXMsICd2ZXJpZnknLCB7XG5cdEFzc2VydCgpIHtcblx0XHR0aGlzLmNvbmRpdGlvbi52ZXJpZnkoKVxuXHRcdG9wRWFjaCh0aGlzLm9wVGhyb3duLCB2ZXJpZnkpXG5cdH0sXG5cblx0QXNzaWduU2luZ2xlKCkge1xuXHRcdGNvbnN0IGRvViA9ICgpID0+IHtcblx0XHRcdC8vIEFzc2lnbmVlIHJlZ2lzdGVyZWQgYnkgdmVyaWZ5TGluZXMuXG5cdFx0XHR0aGlzLmFzc2lnbmVlLnZlcmlmeSgpXG5cdFx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmFzc2lnbmVlLmlzTGF6eSgpKVxuXHRcdFx0d2l0aEJsb2NrTG9jYWxzKGRvVilcblx0XHRlbHNlXG5cdFx0XHRkb1YoKVxuXHR9LFxuXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdHRoaXMuYXNzaWduZWVzLmZvckVhY2godmVyaWZ5KVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRCYWdFbnRyeTogdmVyaWZ5QmFnRW50cnksXG5cdEJhZ0VudHJ5TWFueTogdmVyaWZ5QmFnRW50cnksXG5cblx0QmFnU2ltcGxlKCkgeyB0aGlzLnBhcnRzLmZvckVhY2godmVyaWZ5KSB9LFxuXG5cdEJsb2NrRG8oKSB7IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpIH0sXG5cblx0QmxvY2tWYWxUaHJvdygpIHtcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiB0aGlzLl90aHJvdy52ZXJpZnkoKSlcblx0fSxcblxuXHRCbG9ja1dpdGhSZXR1cm4oKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5yZXR1cm5lZC52ZXJpZnkoKSlcblx0fSxcblxuXHRCbG9ja09iaigpIHtcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRcdG9wRWFjaCh0aGlzLm9wT2JqZWQsIF8gPT4gcGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IF8udmVyaWZ5KCkpKVxuXHRcdH0pXG5cdH0sXG5cblx0QmxvY2tCYWc6IHZlcmlmeUJsb2NrQmFnT3JNYXAsXG5cdEJsb2NrTWFwOiB2ZXJpZnlCbG9ja0JhZ09yTWFwLFxuXG5cdEJsb2NrV3JhcCgpIHsgd2l0aElJRkUoKCkgPT4gdGhpcy5ibG9jay52ZXJpZnkoKSkgfSxcblxuXHRCcmVha0RvKCkge1xuXHRcdHZlcmlmeUluTG9vcCh0aGlzKVxuXHRcdGNvbnRleHQuY2hlY2soIShvcExvb3AgaW5zdGFuY2VvZiBGb3JWYWwpLCB0aGlzLmxvYywgKCkgPT5cblx0XHRcdGAke2NvZGUoJ2ZvcicpfSBtdXN0IGJyZWFrIHdpdGggYSB2YWx1ZS5gKVxuXHR9LFxuXG5cdEJyZWFrVmFsKCkge1xuXHRcdHZlcmlmeUluTG9vcCh0aGlzKVxuXHRcdGNvbnRleHQuY2hlY2sob3BMb29wIGluc3RhbmNlb2YgRm9yVmFsLCB0aGlzLmxvYywgKCkgPT5cblx0XHRcdGAke2NvZGUoJ2JyZWFrJyl9IG9ubHkgdmFsaWQgaW5zaWRlICR7Y29kZSgnZm9yJyl9YClcblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0Q2FsbCgpIHtcblx0XHR0aGlzLmNhbGxlZC52ZXJpZnkoKVxuXHRcdHRoaXMuYXJncy5mb3JFYWNoKHZlcmlmeSlcblx0fSxcblxuXHRDYXNlRG8oKSB7IHZlcmlmeUNhc2UodGhpcykgfSxcblx0Q2FzZURvUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cdENhc2VWYWwoKSB7IHdpdGhJSUZFKCgpID0+IHZlcmlmeUNhc2UodGhpcykpIH0sXG5cdENhc2VWYWxQYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblxuXHRDYXRjaCgpIHtcblx0XHRjb250ZXh0LmNoZWNrKHRoaXMuY2F1Z2h0Lm9wVHlwZSA9PT0gbnVsbCwgdGhpcy5jYXVnaHQubG9jLCAnVE9ETzogQ2F1Z2h0IHR5cGVzJylcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5jYXVnaHQsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpXG5cdH0sXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR0aGlzLnJlc3VsdC52ZXJpZnkoKVxuXHR9LFxuXHRDb25kaXRpb25hbFZhbCgpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR3aXRoSUlGRSgoKSA9PiB0aGlzLnJlc3VsdC52ZXJpZnkoKSlcblx0fSxcblxuXHRDb250aW51ZSgpIHsgdmVyaWZ5SW5Mb29wKHRoaXMpIH0sXG5cblx0Ly8gT25seSByZWFjaCBoZXJlIGZvciBpbi9vdXQgY29uZGl0aW9uLlxuXHREZWJ1ZygpIHsgdmVyaWZ5TGluZXMoWyB0aGlzIF0pIH0sXG5cblx0RXhjZXB0RG86IHZlcmlmeUV4Y2VwdCxcblx0RXhjZXB0VmFsOiB2ZXJpZnlFeGNlcHQsXG5cblx0Rm9yQmFnKCkgeyB2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5Rm9yKHRoaXMpKSB9LFxuXG5cdEZvckRvKCkgeyB2ZXJpZnlGb3IodGhpcykgfSxcblxuXHRGb3JWYWwoKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZ1bigpIHtcblx0XHR3aXRoQmxvY2tMb2NhbHMoKCkgPT4ge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0aGlzLm9wUmVzRGVjbGFyZSA9PT0gbnVsbCB8fCB0aGlzLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tWYWwsIHRoaXMubG9jLFxuXHRcdFx0XHQnRnVuY3Rpb24gd2l0aCByZXR1cm4gY29uZGl0aW9uIG11c3QgcmV0dXJuIHNvbWV0aGluZy4nKVxuXHRcdFx0d2l0aEluR2VuZXJhdG9yKHRoaXMuaXNHZW5lcmF0b3IsICgpID0+XG5cdFx0XHRcdHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhbGxBcmdzID0gY2F0KHRoaXMuYXJncywgdGhpcy5vcFJlc3RBcmcpXG5cdFx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FscyhhbGxBcmdzLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcEluLCB2ZXJpZnkpXG5cdFx0XHRcdFx0XHR0aGlzLmJsb2NrLnZlcmlmeSgpXG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcFJlc0RlY2xhcmUsIHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRcdFx0XHRcdGNvbnN0IHZlcmlmeU91dCA9ICgpID0+IG9wRWFjaCh0aGlzLm9wT3V0LCBfID0+IF8udmVyaWZ5KCkpXG5cdFx0XHRcdFx0XHRpZkVsc2UodGhpcy5vcFJlc0RlY2xhcmUsIF8gPT4gcGx1c0xvY2FsKF8sIHZlcmlmeU91dCksIHZlcmlmeU91dClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KSlcblx0XHR9KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgfSxcblxuXHRMYXp5KCkgeyB3aXRoQmxvY2tMb2NhbHMoKCkgPT4gdGhpcy52YWx1ZS52ZXJpZnkoKSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgYWNjZXNzTG9jYWwodGhpcywgdGhpcy5uYW1lKSB9LFxuXG5cdC8vIEFkZGluZyBMb2NhbERlY2xhcmVzIHRvIHRoZSBhdmFpbGFibGUgbG9jYWxzIGlzIGRvbmUgYnkgRnVuIG9yIGxpbmVOZXdMb2NhbHMuXG5cdExvY2FsRGVjbGFyZSgpIHsgb3BFYWNoKHRoaXMub3BUeXBlLCB2ZXJpZnkpIH0sXG5cblx0TG9jYWxNdXRhdGUoKSB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGdldExvY2FsRGVjbGFyZSh0aGlzLm5hbWUsIHRoaXMubG9jKVxuXHRcdGNvbnRleHQuY2hlY2soZGVjbGFyZS5pc011dGFibGUoKSwgdGhpcy5sb2MsICgpID0+IGAke2NvZGUodGhpcy5uYW1lKX0gaXMgbm90IG11dGFibGUuYClcblx0XHQvLyBUT0RPOiBUcmFjayBtdXRhdGlvbnMuIE11dGFibGUgbG9jYWwgbXVzdCBiZSBtdXRhdGVkIHNvbWV3aGVyZS5cblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0TG9naWMoKSB7XG5cdFx0Y29udGV4dC5jaGVjayh0aGlzLmFyZ3MubGVuZ3RoID4gMSwgJ0xvZ2ljIGV4cHJlc3Npb24gbmVlZHMgYXQgbGVhc3QgMiBhcmd1bWVudHMuJylcblx0XHR0aGlzLmFyZ3MuZm9yRWFjaCh2ZXJpZnkpXG5cdH0sXG5cblx0Tm90KCkgeyB0aGlzLmFyZy52ZXJpZnkoKSB9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7IH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0XHR0aGlzLmtleS52ZXJpZnkoKVxuXHRcdHRoaXMudmFsLnZlcmlmeSgpXG5cdH0sXG5cblx0TWVtYmVyKCkgeyB0aGlzLm9iamVjdC52ZXJpZnkoKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHQvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGlzLmRvVXNlcy5cblx0XHR0aGlzLnVzZXMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0d2l0aEluRGVidWcoKCkgPT4gdGhpcy5kZWJ1Z1VzZXMuZm9yRWFjaCh2ZXJpZnkpKVxuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0Zm9yIChjb25zdCBfIG9mIHRoaXMuZXhwb3J0cylcblx0XHRcdGFjY2Vzc0xvY2FsRm9yUmV0dXJuKF8sIHRoaXMpXG5cdFx0b3BFYWNoKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblxuXHRcdGNvbnN0IGV4cG9ydHMgPSBuZXcgU2V0KHRoaXMuZXhwb3J0cylcblx0XHRjb25zdCBtYXJrRXhwb3J0TGluZXMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuYWxsQXNzaWduZWVzKCkuc29tZShfID0+IGV4cG9ydHMuaGFzKF8pKSlcblx0XHRcdFx0cmVzdWx0cy5leHBvcnRBc3NpZ25zLmFkZChsaW5lKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHRcdH1cblx0XHR0aGlzLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHR9LFxuXG5cdE5ldygpIHtcblx0XHR0aGlzLnR5cGUudmVyaWZ5KClcblx0XHR0aGlzLmFyZ3MuZm9yRWFjaCh2ZXJpZnkpXG5cdH0sXG5cblx0T2JqRW50cnkoKSB7XG5cdFx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0XHR0aGlzLmFzc2lnbi52ZXJpZnkoKVxuXHRcdGZvciAoY29uc3QgXyBvZiB0aGlzLmFzc2lnbi5hbGxBc3NpZ25lZXMoKSlcblx0XHRcdGFjY2Vzc0xvY2FsKHRoaXMsIF8ubmFtZSlcblx0fSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0Y29uc3Qga2V5cyA9IG5ldyBTZXQoKVxuXHRcdGZvciAoY29uc3QgcGFpciBvZiB0aGlzLnBhaXJzKSB7XG5cdFx0XHRjb25zdCB7IGtleSwgdmFsdWUgfSA9IHBhaXJcblx0XHRcdGNvbnRleHQuY2hlY2soIWtleXMuaGFzKGtleSksIHBhaXIubG9jLCAoKSA9PiBgRHVwbGljYXRlIGtleSAke2tleX1gKVxuXHRcdFx0a2V5cy5hZGQoa2V5KVxuXHRcdFx0dmFsdWUudmVyaWZ5KClcblx0XHR9XG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0Zm9yIChjb25zdCBfIG9mIHRoaXMucGFydHMpXG5cdFx0XHRpZiAodHlwZW9mIF8gIT09ICdzdHJpbmcnKVxuXHRcdFx0XHRfLnZlcmlmeSgpXG5cdH0sXG5cblx0U3BlY2lhbERvKCkgeyB9LFxuXG5cdFNwZWNpYWxWYWwoKSB7IH0sXG5cblx0U3BsYXQoKSB7IHRoaXMuc3BsYXR0ZWQudmVyaWZ5KCkgfSxcblxuXHRUaHJvdygpIHtcblx0XHRvcEVhY2godGhpcy5vcFRocm93biwgdmVyaWZ5KVxuXHR9LFxuXG5cdFVzZSgpIHtcblx0XHQvLyBTaW5jZSBVc2VzIGFyZSBhbHdheXMgaW4gdGhlIG91dGVybW9zdCBzY29wZSwgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCBzaGFkb3dpbmcuXG5cdFx0Ly8gU28gd2UgbXV0YXRlIGBsb2NhbHNgIGRpcmVjdGx5LlxuXHRcdGNvbnN0IGFkZFVzZUxvY2FsID0gXyA9PiB7XG5cdFx0XHRjb25zdCBwcmV2ID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRjb250ZXh0LmNoZWNrKHByZXYgPT09IHVuZGVmaW5lZCwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGAke2NvZGUoXy5uYW1lKX0gYWxyZWFkeSBpbXBvcnRlZCBhdCAke3ByZXYubG9jfWApXG5cdFx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoXylcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fVxuXHRcdHRoaXMudXNlZC5mb3JFYWNoKGFkZFVzZUxvY2FsKVxuXHRcdG9wRWFjaCh0aGlzLm9wVXNlRGVmYXVsdCwgYWRkVXNlTG9jYWwpXG5cdH0sXG5cblx0WWllbGQoKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWQudmVyaWZ5KClcblx0fSxcblxuXHRZaWVsZFRvKCkge1xuXHRcdGNvbnRleHQuY2hlY2soaXNJbkdlbmVyYXRvciwgdGhpcy5sb2MsICdDYW5ub3QgeWllbGQgb3V0c2lkZSBvZiBnZW5lcmF0b3IgY29udGV4dCcpXG5cdFx0dGhpcy55aWVsZGVkVG8udmVyaWZ5KClcblx0fVxufSlcblxuZnVuY3Rpb24gdmVyaWZ5QmFnRW50cnkoKSB7XG5cdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdHRoaXMudmFsdWUudmVyaWZ5KClcbn1cblxuZnVuY3Rpb24gdmVyaWZ5QmxvY2tCYWdPck1hcCgpIHtcblx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuYnVpbHQsICgpID0+IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlDYXNlUGFydCgpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHR0aGlzLnRlc3QudHlwZS52ZXJpZnkoKVxuXHRcdHRoaXMudGVzdC5wYXR0ZXJuZWQudmVyaWZ5KClcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWxzKHRoaXMudGVzdC5sb2NhbHMsICgpID0+IHRoaXMucmVzdWx0LnZlcmlmeSgpKVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHRoaXMucmVzdWx0LnZlcmlmeSgpXG5cdH1cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RXhjZXB0KCkge1xuXHR0aGlzLl90cnkudmVyaWZ5KClcblx0b3BFYWNoKHRoaXMuX2NhdGNoLCB2ZXJpZnkpXG5cdG9wRWFjaCh0aGlzLl9maW5hbGx5LCB2ZXJpZnkpXG59XG5cbi8vIEhlbHBlcnMgc3BlY2lmaWMgdG8gY2VydGFpbiBNc0FzdCB0eXBlczpcbmNvbnN0XG5cdHZlcmlmeUZvciA9IGZvckxvb3AgPT4ge1xuXHRcdGNvbnN0IHZlcmlmeUJsb2NrID0gKCkgPT4gd2l0aEluTG9vcChmb3JMb29wLCAoKSA9PiBmb3JMb29wLmJsb2NrLnZlcmlmeSgpKVxuXHRcdGlmRWxzZShmb3JMb29wLm9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRiYWcudmVyaWZ5KClcblx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKGVsZW1lbnQsIHZlcmlmeUJsb2NrKVxuXHRcdFx0fSxcblx0XHRcdHZlcmlmeUJsb2NrKVxuXHR9LFxuXG5cdHZlcmlmeUluTG9vcCA9IGxvb3BVc2VyID0+XG5cdFx0Y29udGV4dC5jaGVjayhvcExvb3AgIT09IG51bGwsIGxvb3BVc2VyLmxvYywgJ05vdCBpbiBhIGxvb3AuJyksXG5cblxuXHR2ZXJpZnlDYXNlID0gXyA9PiB7XG5cdFx0Y29uc3QgZG9JdCA9ICgpID0+IHtcblx0XHRcdF8ucGFydHMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0XHRvcEVhY2goXy5vcEVsc2UsIHZlcmlmeSlcblx0XHR9XG5cdFx0aWZFbHNlKF8ub3BDYXNlZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRfLnZlcmlmeSgpXG5cdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbChfLmFzc2lnbmVlLCBkb0l0KVxuXHRcdFx0fSxcblx0XHRcdGRvSXQpXG5cdH1cblxuLy8gR2VuZXJhbCB1dGlsaXRpZXM6XG5jb25zdFxuXHRnZXRMb2NhbERlY2xhcmUgPSAobmFtZSwgYWNjZXNzTG9jKSA9PiB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGxvY2Fscy5nZXQobmFtZSlcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUgIT09IHVuZGVmaW5lZCwgYWNjZXNzTG9jLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBzaG93TG9jYWxzID0gY29kZShpdGVyYXRvclRvQXJyYXkobG9jYWxzLmtleXMoKSkuam9pbignICcpKVxuXHRcdFx0cmV0dXJuIGBObyBzdWNoIGxvY2FsICR7Y29kZShuYW1lKX0uXFxuTG9jYWxzIGFyZTpcXG4ke3Nob3dMb2NhbHN9LmBcblx0XHR9KVxuXHRcdHJldHVybiBkZWNsYXJlXG5cdH0sXG5cblx0bGluZU5ld0xvY2FscyA9IGxpbmUgPT5cblx0XHRsaW5lIGluc3RhbmNlb2YgQXNzaWduU2luZ2xlID9cblx0XHRcdFsgbGluZS5hc3NpZ25lZSBdIDpcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ25EZXN0cnVjdHVyZSA/XG5cdFx0XHRsaW5lLmFzc2lnbmVlcyA6XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkgP1xuXHRcdFx0bGluZU5ld0xvY2FscyhsaW5lLmFzc2lnbikgOlxuXHRcdFx0WyBdLFxuXG5cdHZlcmlmeUxpbmVzID0gbGluZXMgPT4ge1xuXHRcdC8qXG5cdFx0V2UgbmVlZCB0byBiZXQgYWxsIGJsb2NrIGxvY2FscyB1cC1mcm9udCBiZWNhdXNlXG5cdFx0RnVuY3Rpb25zIHdpdGhpbiBsaW5lcyBjYW4gYWNjZXNzIGxvY2FscyBmcm9tIGxhdGVyIGxpbmVzLlxuXHRcdE5PVEU6IFdlIHB1c2ggdGhlc2Ugb250byBwZW5kaW5nQmxvY2tMb2NhbHMgaW4gcmV2ZXJzZVxuXHRcdHNvIHRoYXQgd2hlbiB3ZSBpdGVyYXRlIHRocm91Z2ggbGluZXMgZm9yd2FyZHMsIHdlIGNhbiBwb3AgZnJvbSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHR0byByZW1vdmUgcGVuZGluZyBsb2NhbHMgYXMgdGhleSBiZWNvbWUgcmVhbCBsb2NhbHMuXG5cdFx0SXQgZG9lc24ndCByZWFsbHkgbWF0dGVyIHdoYXQgb3JkZXIgd2UgYWRkIGxvY2FscyBpbiBzaW5jZSBpdCdzIG5vdCBhbGxvd2VkXG5cdFx0dG8gaGF2ZSB0d28gbG9jYWxzIG9mIHRoZSBzYW1lIG5hbWUgaW4gdGhlIHNhbWUgYmxvY2suXG5cdFx0Ki9cblx0XHRjb25zdCBuZXdMb2NhbHMgPSBbIF1cblxuXHRcdGNvbnN0IGdldExpbmVMb2NhbHMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKCgpID0+IGVhY2hSZXZlcnNlKGxpbmUubGluZXMsIGdldExpbmVMb2NhbHMpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlYWNoUmV2ZXJzZShsaW5lTmV3TG9jYWxzKGxpbmUpLCBfID0+IHtcblx0XHRcdFx0XHQvLyBSZWdpc3RlciB0aGUgbG9jYWwgbm93LiBDYW4ndCB3YWl0IHVudGlsIHRoZSBhc3NpZ24gaXMgdmVyaWZpZWQuXG5cdFx0XHRcdFx0cmVnaXN0ZXJMb2NhbChfKVxuXHRcdFx0XHRcdG5ld0xvY2Fscy5wdXNoKF8pXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHRcdGVhY2hSZXZlcnNlKGxpbmVzLCBnZXRMaW5lTG9jYWxzKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2Fscy5wdXNoKC4uLm5ld0xvY2FscylcblxuXHRcdC8qXG5cdFx0S2VlcHMgdHJhY2sgb2YgbG9jYWxzIHdoaWNoIGhhdmUgYWxyZWFkeSBiZWVuIGFkZGVkIGluIHRoaXMgYmxvY2suXG5cdFx0TWFzb24gYWxsb3dzIHNoYWRvd2luZywgYnV0IG5vdCB3aXRoaW4gdGhlIHNhbWUgYmxvY2suXG5cdFx0U28sIHRoaXMgaXMgYWxsb3dlZDpcblx0XHRcdGEgPSAxXG5cdFx0XHRiID1cblx0XHRcdFx0YSA9IDJcblx0XHRcdFx0Li4uXG5cdFx0QnV0IG5vdDpcblx0XHRcdGEgPSAxXG5cdFx0XHRhID0gMlxuXHRcdCovXG5cdFx0Y29uc3QgdGhpc0Jsb2NrTG9jYWxOYW1lcyA9IG5ldyBTZXQoKVxuXG5cdFx0Ly8gQWxsIHNoYWRvd2VkIGxvY2FscyBmb3IgdGhpcyBibG9jay5cblx0XHRjb25zdCBzaGFkb3dlZCA9IFsgXVxuXG5cdFx0Y29uc3QgdmVyaWZ5TGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0Ly8gVE9ETzogRG8gYW55dGhpbmcgaW4gdGhpcyBzaXR1YXRpb24/XG5cdFx0XHRcdC8vIGNvbnRleHQuY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnUmVkdW5kYW50IGBkZWJ1Z2AuJylcblx0XHRcdFx0d2l0aEluRGVidWcoKCkgPT4gbGluZS5saW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZlcmlmeUlzU3RhdGVtZW50KGxpbmUpXG5cdFx0XHRcdGZvciAoY29uc3QgbmV3TG9jYWwgb2YgbGluZU5ld0xvY2FscyhsaW5lKSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBuZXdMb2NhbC5uYW1lXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTG9jYWwgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0XHRcdFx0aWYgKG9sZExvY2FsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIXRoaXNCbG9ja0xvY2FsTmFtZXMuaGFzKG5hbWUpLCBuZXdMb2NhbC5sb2MsXG5cdFx0XHRcdFx0XHRcdCgpID0+IGBBIGxvY2FsICR7Y29kZShuYW1lKX0gaXMgYWxyZWFkeSBpbiB0aGlzIGJsb2NrLmApXG5cdFx0XHRcdFx0XHRzaGFkb3dlZC5wdXNoKG9sZExvY2FsKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzQmxvY2tMb2NhbE5hbWVzLmFkZChuYW1lKVxuXHRcdFx0XHRcdHNldExvY2FsKG5ld0xvY2FsKVxuXG5cdFx0XHRcdFx0Ly8gTm93IHRoYXQgaXQncyBhZGRlZCBhcyBhIGxvY2FsLCBpdCdzIG5vIGxvbmdlciBwZW5kaW5nLlxuXHRcdFx0XHRcdC8vIFdlIGFkZGVkIHBlbmRpbmdCbG9ja0xvY2FscyBpbiB0aGUgcmlnaHQgb3JkZXIgdGhhdCB3ZSBjYW4ganVzdCBwb3AgdGhlbSBvZmYuXG5cdFx0XHRcdFx0Y29uc3QgcG9wcGVkID0gcGVuZGluZ0Jsb2NrTG9jYWxzLnBvcCgpXG5cdFx0XHRcdFx0YXNzZXJ0KHBvcHBlZCA9PT0gbmV3TG9jYWwpXG5cdFx0XHRcdH1cblx0XHRcdFx0bGluZS52ZXJpZnkoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxpbmVzLmZvckVhY2godmVyaWZ5TGluZSlcblxuXHRcdG5ld0xvY2Fscy5mb3JFYWNoKGRlbGV0ZUxvY2FsKVxuXHRcdHNoYWRvd2VkLmZvckVhY2goc2V0TG9jYWwpXG5cblx0XHRyZXR1cm4gbmV3TG9jYWxzXG5cdH0sXG5cblx0dmVyaWZ5SXNTdGF0ZW1lbnQgPSBsaW5lID0+IHtcblx0XHRjb25zdCBpc1N0YXRlbWVudCA9XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgRG8gfHxcblx0XHRcdC8vIFNvbWUgdmFsdWVzIGFyZSBhbHNvIGFjY2VwdGFibGUuXG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQ2FsbCB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFlpZWxkIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGRUb1xuXHRcdGNvbnRleHQuY2hlY2soaXNTdGF0ZW1lbnQsIGxpbmUubG9jLCAnRXhwcmVzc2lvbiBpbiBzdGF0ZW1lbnQgcG9zaXRpb24uJylcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=