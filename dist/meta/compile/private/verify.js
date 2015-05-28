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
		addedLocals.forEach(function (_) {
			const shadowed = locals.get(_.name);
			if (shadowed !== undefined) shadowedLocals.push(shadowed);
			setLocal(_);
		});

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
		addedLocals.forEach(function (_) {
			context.check(!names.has(_.name), _.loc, function () {
				return 'Duplicate local ' + (0, _CompileError.code)(_.name);
			});
			names.add(_.name);
		});
		plusLocals(addedLocals, action);
	},
	      withBlockLocals = function (action) {
		const oldPendingBlockLocals = pendingBlockLocals;
		pendingBlockLocals = [];
		plusLocals(oldPendingBlockLocals, action);
		pendingBlockLocals = oldPendingBlockLocals;
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

		BagEntry: function () {
			accessLocal(this, 'built');
			this.value.verify();
		},

		BagSimple: function () {
			this.parts.forEach(verify);
		},

		BlockDo: function () {
			verifyLines(this.lines);
		},

		BlockWithReturn: function () {
			var _this2 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this2.returned.verify();
			});
		},

		BlockObj: function () {
			var _this3 = this;

			verifyAndPlusLocal(this.built, function () {
				const newLocals = verifyLines(_this3.lines);
				(0, _util.opEach)(_this3.opObjed, function (_) {
					return plusLocals(newLocals, function () {
						return _.verify();
					});
				});
			});
		},

		BlockBag: verifyBlockBagOrMap,
		BlockMap: verifyBlockBagOrMap,

		// BlockWrap uses IIFE, so can't break loop.
		// block will set buildType.
		BlockWrap: function () {
			var _this4 = this;

			withInLoop(false, function () {
				return _this4.block.verify();
			});
		},

		BreakDo: function () {
			verifyInLoop(this);
			context.check(!(opLoop instanceof _MsAst.ForVal), this.loc, function () {
				return '' + (0, _CompileError.code)('for') + ' must break with a value.';
			});
		},

		BreakVal: function () {
			verifyInLoop(this);
			context.check(opLoop instanceof _MsAst.ForVal, this.loc, function () {
				return '' + (0, _CompileError.code)('break') + ' only valid inside ' + (0, _CompileError.code)('for');
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
		// CaseVal uses IIFE, so can't break loop.
		CaseVal: function () {
			var _this5 = this;

			withInLoop(false, function () {
				return verifyCase(_this5);
			});
		},
		CaseValPart: verifyCasePart,

		Continue: function () {
			verifyInLoop(this);
		},

		// Only reach here for in/out condition.
		Debug: function () {
			verifyLines([this]);
		},

		ForBag: function () {
			var _this6 = this;

			verifyAndPlusLocal(this.built, function () {
				return verifyFor(_this6);
			});
		},

		ForDo: function () {
			verifyFor(this);
		},

		ForVal: function () {
			verifyFor(this);
		},

		Fun: function () {
			var _this7 = this;

			withBlockLocals(function () {
				context.check(_this7.opResDeclare === null || _this7.block instanceof _MsAst.BlockVal, _this7.loc, 'Function with return condition must return something.');
				withInGenerator(_this7.isGenerator, function () {
					return withInLoop(false, function () {
						const allArgs = (0, _util.cat)(_this7.args, _this7.opRestArg);
						verifyAndPlusLocals(allArgs, function () {
							(0, _util.opEach)(_this7.opIn, verify);
							_this7.block.verify();
							(0, _util.opEach)(_this7.opResDeclare, verifyLocalDeclare);
							const verifyOut = function () {
								return (0, _util.opEach)(_this7.opOut, function (_) {
									return _.verify();
								});
							};
							(0, _util.ifElse)(_this7.opResDeclare, function (_) {
								return plusLocal(_, verifyOut);
							}, verifyOut);
						});
					});
				});
			});
		},

		GlobalAccess: function () {},

		IfDo: ifOrUnlessDo,

		Lazy: function () {
			var _this8 = this;

			withBlockLocals(function () {
				return _this8.value.verify();
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
			var _this9 = this;

			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, function () {
				return '' + (0, _CompileError.code)(_this9.name) + ' is not mutable.';
			});
			// TODO: Track mutations. Mutable local must be mutated somewhere.
			this.value.verify();
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
			var _this10 = this;

			// No need to verify this.doUses.
			this.uses.forEach(verify);
			withInDebug(function () {
				return _this10.debugUses.forEach(verify);
			});
			const newLocals = verifyLines(this.lines);
			this.exports.forEach(function (_) {
				return accessLocalForReturn(_, _this10);
			});
			(0, _util.opEach)(this.opDefaultExport, function (_) {
				return plusLocals(newLocals, function () {
					return _.verify();
				});
			});

			const exports = (0, _util.newSet)(this.exports);
			const markExportLines = function (line) {
				if (line instanceof _MsAst.Assign && line.allAssignees().some(function (_) {
					return exports.has(_);
				})) results.exportAssigns.add(line);else if (line instanceof _MsAst.Debug) line.lines.forEach(markExportLines);
			};
			this.lines.forEach(markExportLines);
		},

		ObjEntry: function () {
			var _this11 = this;

			accessLocal(this, 'built');
			this.assign.verify();
			this.assign.allAssignees().forEach(function (_) {
				return accessLocal(_this11, _.name);
			});
		},

		ObjSimple: function () {
			const keys = new Set();
			this.pairs.forEach(function (pair) {
				context.check(!keys.has(pair.key), pair.loc, function () {
					return 'Duplicate key ' + pair.key;
				});
				keys.add(pair.key);
				pair.value.verify();
			});
		},

		Quote: function () {
			this.parts.forEach(function (_) {
				if (typeof _ !== 'string') _.verify();
			});
		},

		SpecialDo: function () {},

		SpecialVal: function () {},

		Splat: function () {
			this.splatted.verify();
		},

		UnlessDo: ifOrUnlessDo,

		Use: function () {
			// Since Uses are always in the outermost scope, don't have to worry about shadowing.
			// So we mutate `locals` directly.
			const addUseLocal = function (_) {
				const prev = locals.get(_.name);
				context.check(prev === undefined, _.loc, function () {
					return '' + (0, _CompileError.code)(_.name) + ' already imported at ' + prev.loc;
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

	// Shared implementations
	function ifOrUnlessDo() {
		this.test.verify();
		this.result.verify();
	}

	function verifyBlockBagOrMap() {
		var _this12 = this;

		verifyAndPlusLocal(this.built, function () {
			return verifyLines(_this12.lines);
		});
	}

	function verifyCasePart() {
		var _this13 = this;

		if (this.test instanceof _MsAst.Pattern) {
			this.test.type.verify();
			this.test.patterned.verify();
			verifyAndPlusLocals(this.test.locals, function () {
				return _this13.result.verify();
			});
		} else {
			this.test.verify();
			this.result.verify();
		}
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
			return 'No such local ' + (0, _CompileError.code)(name) + '.\nLocals are:\n' + (0, _CompileError.code)((0, _util.mapKeys)(locals).join(' ')) + '.';
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
				lineNewLocals(line).forEach(function (newLocal) {
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
				});
				line.verify();
			}
		};

		lines.forEach(verifyLine);

		newLocals.forEach(deleteLocal);
		shadowed.forEach(function (_) {
			return setLocal(_);
		});

		return newLocals;
	},
	      verifyIsStatement = function (line) {
		const isStatement = line instanceof _MsAst.Do || line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo || line instanceof _MsAst.BagEntry || line instanceof _MsAst.MapEntry || line instanceof _MsAst.ObjEntry || line instanceof _MsAst.SpecialDo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFZZSxVQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLFVBQUEsS0FBSztTQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFBQTtPQUVoQyxXQUFXLEdBQUcsVUFBQSxZQUFZO1NBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztFQUFBO09BRWpDLFFBQVEsR0FBRyxVQUFBLFlBQVk7U0FDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUFBOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdB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QUFJLG1CQWpoQjhCLFFBQVEsQUFpaEJsQixJQUN4QixJQUFJLG1CQWxoQjJELFNBQVMsQUFraEIvQyxDQUFBO0FBQzFCLFNBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtFQUN6RSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQXNzaWduU2luZ2xlLCBCYWdFbnRyeSwgQmxvY2tWYWwsIENhbGwsIERlYnVnLCBEbywgRm9yVmFsLFxuXHRMb2NhbERlY2xhcmVCdWlsdCwgTG9jYWxEZWNsYXJlUmVzLCBPYmpFbnRyeSwgTWFwRW50cnksIFBhdHRlcm4sIFNwZWNpYWxEbywgWWllbGQsIFlpZWxkVG9cblx0fSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBlYWNoUmV2ZXJzZSwgaGVhZCwgaWZFbHNlLCBpbXBsZW1lbnRNYW55LFxuXHRpc0VtcHR5LCBtYXBLZXlzLCBuZXdTZXQsIG9wRWFjaCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBWZXJpZnlSZXN1bHRzLCB7IExvY2FsSW5mbyB9IGZyb20gJy4vVmVyaWZ5UmVzdWx0cydcblxuLypcblRoZSB2ZXJpZmllciBnZW5lcmF0ZXMgaW5mb3JtYXRpb24gbmVlZGVkIGR1cmluZyB0cmFuc3BpbGluZywgdGhlIFZlcmlmeVJlc3VsdHMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtc0FzdCkgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0bG9jYWxzID0gbmV3IE1hcCgpXG5cdHBlbmRpbmdCbG9ja0xvY2FscyA9IFsgXVxuXHRpc0luRGVidWcgPSBpc0luR2VuZXJhdG9yID0gZmFsc2Vcblx0b3BMb29wID0gbnVsbFxuXHRyZXN1bHRzID0gbmV3IFZlcmlmeVJlc3VsdHMoKVxuXG5cdG1zQXN0LnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsVXNlKClcblxuXHRjb25zdCByZXMgPSByZXN1bHRzXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblx0Y29udGV4dCA9IGxvY2FscyA9IG9wTG9vcCA9IHBlbmRpbmdCbG9ja0xvY2FscyA9IHJlc3VsdHMgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG4vLyBVc2UgYSB0cmljayBsaWtlIGluIHBhcnNlLmpzIGFuZCBoYXZlIGV2ZXJ5dGhpbmcgY2xvc2Ugb3ZlciB0aGVzZSBtdXRhYmxlIHZhcmlhYmxlcy5cbmxldFxuXHRjb250ZXh0LFxuXHQvLyBNYXAgZnJvbSBuYW1lcyB0byBMb2NhbERlY2xhcmVzLlxuXHRsb2NhbHMsXG5cdG9wTG9vcCxcblx0Lypcblx0TG9jYWxzIGZvciB0aGlzIGJsb2NrLlxuXHRUaGVzZSBhcmUgYWRkZWQgdG8gbG9jYWxzIHdoZW4gZW50ZXJpbmcgYSBGdW5jdGlvbiBvciBsYXp5IGV2YWx1YXRpb24uXG5cdEluOlxuXHRcdGEgPSB8XG5cdFx0XHRiXG5cdFx0YiA9IDFcblx0YGJgIHdpbGwgYmUgYSBwZW5kaW5nIGxvY2FsLlxuXHRIb3dldmVyOlxuXHRcdGEgPSBiXG5cdFx0YiA9IDFcblx0d2lsbCBmYWlsIHRvIHZlcmlmeSwgYmVjYXVzZSBgYmAgY29tZXMgYWZ0ZXIgYGFgIGFuZCBpcyBub3QgYWNjZXNzZWQgaW5zaWRlIGEgZnVuY3Rpb24uXG5cdEl0IHdvdWxkIHdvcmsgZm9yIGB+YSBpcyBiYCwgdGhvdWdoLlxuXHQqL1xuXHRwZW5kaW5nQmxvY2tMb2NhbHMsXG5cdGlzSW5EZWJ1Zyxcblx0Ly8gV2hldGhlciB3ZSBhcmUgY3VycmVudGx5IGFibGUgdG8geWllbGQuXG5cdGlzSW5HZW5lcmF0b3IsXG5cdHJlc3VsdHNcblxuY29uc3Rcblx0dmVyaWZ5ID0gbXNBc3QgPT4gbXNBc3QudmVyaWZ5KCksXG5cblx0ZGVsZXRlTG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbHMuZGVsZXRlKGxvY2FsRGVjbGFyZS5uYW1lKSxcblxuXHRzZXRMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5zZXQobG9jYWxEZWNsYXJlLm5hbWUsIGxvY2FsRGVjbGFyZSksXG5cblx0Ly8gV2hlbiBhIGxvY2FsIGlzIHJldHVybmVkIGZyb20gYSBCbG9ja09iaiBvciBNb2R1bGUsXG5cdC8vIHRoZSByZXR1cm4gJ2FjY2VzcycgaXMgY29uc2lkZXJlZCB0byBiZSAnZGVidWcnIGlmIHRoZSBsb2NhbCBpcy5cblx0YWNjZXNzTG9jYWxGb3JSZXR1cm4gPSAoZGVjbGFyZSwgYWNjZXNzKSA9PiB7XG5cdFx0Y29uc3QgaW5mbyA9IHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKVxuXHRcdF9hZGRMb2NhbEFjY2VzcyhpbmZvLCBhY2Nlc3MsIGluZm8uaXNJbkRlYnVnKVxuXHR9LFxuXG5cdGFjY2Vzc0xvY2FsID0gKGFjY2VzcywgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUobmFtZSwgYWNjZXNzLmxvYylcblx0XHRyZXN1bHRzLmxvY2FsQWNjZXNzVG9EZWNsYXJlLnNldChhY2Nlc3MsIGRlY2xhcmUpXG5cdFx0X2FkZExvY2FsQWNjZXNzKHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKSwgYWNjZXNzLCBpc0luRGVidWcpXG5cdH0sXG5cblx0X2FkZExvY2FsQWNjZXNzID0gKGxvY2FsSW5mbywgYWNjZXNzLCBpc0RlYnVnQWNjZXNzKSA9PlxuXHRcdChpc0RlYnVnQWNjZXNzID8gbG9jYWxJbmZvLmRlYnVnQWNjZXNzZXMgOiBsb2NhbEluZm8ubm9uRGVidWdBY2Nlc3NlcykucHVzaChhY2Nlc3MpLFxuXG5cdC8vIEZvciBleHByZXNzaW9ucyBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdGhleSB3aWxsIGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGJlaW5nIHZlcmlmaWVkLlxuXHQvLyBTbywgTG9jYWxEZWNsYXJlLnZlcmlmeSBqdXN0IHRoZSB0eXBlLlxuXHQvLyBGb3IgbG9jYWxzIG5vdCBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdXNlIHRoaXMgaW5zdGVhZCBvZiBqdXN0IGRlY2xhcmUudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+IHtcblx0XHRyZWdpc3RlckxvY2FsKGxvY2FsRGVjbGFyZSlcblx0XHRsb2NhbERlY2xhcmUudmVyaWZ5KClcblx0fSxcblxuXHRyZWdpc3RlckxvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uc2V0KGxvY2FsRGVjbGFyZSwgTG9jYWxJbmZvLmVtcHR5KGlzSW5EZWJ1ZykpXG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyBjaGFuZ2UgdmVyaWZpZXIgc3RhdGUgYW5kIGVmZmljaWVudGx5IHJldHVybiB0byB0aGUgb2xkIHN0YXRlIHdoZW4gZmluaXNoZWQuXG5jb25zdFxuXHR3aXRoSW5EZWJ1ZyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkRlYnVnID0gaXNJbkRlYnVnXG5cdFx0aXNJbkRlYnVnID0gdHJ1ZVxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkRlYnVnID0gb2xkSXNJbkRlYnVnXG5cdH0sXG5cblx0d2l0aEluR2VuZXJhdG9yID0gKG5ld0lzSW5HZW5lcmF0b3IsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IG5ld0lzSW5HZW5lcmF0b3Jcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJc0luR2VuZXJhdG9yXG5cdH0sXG5cblx0d2l0aEluTG9vcCA9IChuZXdMb29wLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBvbGRMb29wID0gb3BMb29wXG5cdFx0b3BMb29wID0gbmV3TG9vcFxuXHRcdGFjdGlvbigpXG5cdFx0b3BMb29wID0gb2xkTG9vcFxuXHR9LFxuXG5cdHBsdXNMb2NhbCA9IChhZGRlZExvY2FsLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBzaGFkb3dlZCA9IGxvY2Fscy5nZXQoYWRkZWRMb2NhbC5uYW1lKVxuXHRcdGxvY2Fscy5zZXQoYWRkZWRMb2NhbC5uYW1lLCBhZGRlZExvY2FsKVxuXHRcdGFjdGlvbigpXG5cdFx0aWYgKHNoYWRvd2VkID09PSB1bmRlZmluZWQpXG5cdFx0XHRkZWxldGVMb2NhbChhZGRlZExvY2FsKVxuXHRcdGVsc2Vcblx0XHRcdHNldExvY2FsKHNoYWRvd2VkKVxuXHR9LFxuXG5cdC8vIFNob3VsZCBoYXZlIHZlcmlmaWVkIHRoYXQgYWRkZWRMb2NhbHMgYWxsIGhhdmUgZGlmZmVyZW50IG5hbWVzLlxuXHRwbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBzaGFkb3dlZExvY2FscyA9IFsgXVxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRjb25zdCBzaGFkb3dlZCA9IGxvY2Fscy5nZXQoXy5uYW1lKVxuXHRcdFx0aWYgKHNoYWRvd2VkICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdHNoYWRvd2VkTG9jYWxzLnB1c2goc2hhZG93ZWQpXG5cdFx0XHRzZXRMb2NhbChfKVxuXHRcdH0pXG5cblx0XHRhY3Rpb24oKVxuXG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaChkZWxldGVMb2NhbClcblx0XHRzaGFkb3dlZExvY2Fscy5mb3JFYWNoKHNldExvY2FsKVxuXHR9LFxuXG5cdHZlcmlmeUFuZFBsdXNMb2NhbCA9IChhZGRlZExvY2FsLCBhY3Rpb24pID0+IHtcblx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoYWRkZWRMb2NhbClcblx0XHRwbHVzTG9jYWwoYWRkZWRMb2NhbCwgYWN0aW9uKVxuXHR9LFxuXG5cdHZlcmlmeUFuZFBsdXNMb2NhbHMgPSAoYWRkZWRMb2NhbHMsIGFjdGlvbikgPT4ge1xuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2godmVyaWZ5TG9jYWxEZWNsYXJlKVxuXHRcdGNvbnN0IG5hbWVzID0gbmV3IFNldCgpXG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaChfID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2soIW5hbWVzLmhhcyhfLm5hbWUpLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0YER1cGxpY2F0ZSBsb2NhbCAke2NvZGUoXy5uYW1lKX1gKVxuXHRcdFx0bmFtZXMuYWRkKF8ubmFtZSlcblx0XHR9KVxuXHRcdHBsdXNMb2NhbHMoYWRkZWRMb2NhbHMsIGFjdGlvbilcblx0fSxcblxuXHR3aXRoQmxvY2tMb2NhbHMgPSBhY3Rpb24gPT4ge1xuXHRcdGNvbnN0IG9sZFBlbmRpbmdCbG9ja0xvY2FscyA9IHBlbmRpbmdCbG9ja0xvY2Fsc1xuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IFsgXVxuXHRcdHBsdXNMb2NhbHMob2xkUGVuZGluZ0Jsb2NrTG9jYWxzLCBhY3Rpb24pXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gb2xkUGVuZGluZ0Jsb2NrTG9jYWxzXG5cdH1cblxuY29uc3QgdmVyaWZ5TG9jYWxVc2UgPSAoKSA9PlxuXHRyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5mb3JFYWNoKChpbmZvLCBsb2NhbCkgPT4ge1xuXHRcdGlmICghKGxvY2FsIGluc3RhbmNlb2YgTG9jYWxEZWNsYXJlQnVpbHQgfHwgbG9jYWwgaW5zdGFuY2VvZiBMb2NhbERlY2xhcmVSZXMpKSB7XG5cdFx0XHRjb25zdCBub05vbkRlYnVnID0gaXNFbXB0eShpbmZvLm5vbkRlYnVnQWNjZXNzZXMpXG5cdFx0XHRpZiAobm9Ob25EZWJ1ZyAmJiBpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykpXG5cdFx0XHRcdGNvbnRleHQud2Fybihsb2NhbC5sb2MsICgpID0+IGBVbnVzZWQgbG9jYWwgdmFyaWFibGUgJHtjb2RlKGxvY2FsLm5hbWUpfS5gKVxuXHRcdFx0ZWxzZSBpZiAoaW5mby5pc0luRGVidWcpXG5cdFx0XHRcdGNvbnRleHQud2FybklmKCFub05vbkRlYnVnLCAoKSA9PiBoZWFkKGluZm8ubm9uRGVidWdBY2Nlc3NlcykubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBEZWJ1Zy1vbmx5IGxvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvdXRzaWRlIG9mIGRlYnVnLmApXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNvbnRleHQud2FybklmKG5vTm9uRGVidWcsIGxvY2FsLmxvYywgKCkgPT5cblx0XHRcdFx0XHRgTG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG9ubHkgaW4gZGVidWcuYClcblx0XHR9XG5cdH0pXG5cbmltcGxlbWVudE1hbnkoTXNBc3RUeXBlcywgJ3ZlcmlmeScsIHtcblx0QXNzaWduU2luZ2xlKCkge1xuXHRcdGNvbnN0IGRvViA9ICgpID0+IHtcblx0XHRcdC8vIEFzc2lnbmVlIHJlZ2lzdGVyZWQgYnkgdmVyaWZ5TGluZXMuXG5cdFx0XHR0aGlzLmFzc2lnbmVlLnZlcmlmeSgpXG5cdFx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmFzc2lnbmVlLmlzTGF6eSgpKVxuXHRcdFx0d2l0aEJsb2NrTG9jYWxzKGRvVilcblx0XHRlbHNlXG5cdFx0XHRkb1YoKVxuXHR9LFxuXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdHRoaXMuYXNzaWduZWVzLmZvckVhY2godmVyaWZ5KVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRCYWdFbnRyeSgpIHtcblx0XHRhY2Nlc3NMb2NhbCh0aGlzLCAnYnVpbHQnKVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRCYWdTaW1wbGUoKSB7IHRoaXMucGFydHMuZm9yRWFjaCh2ZXJpZnkpIH0sXG5cblx0QmxvY2tEbygpIHsgdmVyaWZ5TGluZXModGhpcy5saW5lcykgfSxcblxuXHRCbG9ja1dpdGhSZXR1cm4oKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5yZXR1cm5lZC52ZXJpZnkoKSlcblx0fSxcblxuXHRCbG9ja09iaigpIHtcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRcdG9wRWFjaCh0aGlzLm9wT2JqZWQsIF8gPT4gcGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IF8udmVyaWZ5KCkpKVxuXHRcdH0pXG5cdH0sXG5cblx0QmxvY2tCYWc6IHZlcmlmeUJsb2NrQmFnT3JNYXAsXG5cdEJsb2NrTWFwOiB2ZXJpZnlCbG9ja0JhZ09yTWFwLFxuXG5cdC8vIEJsb2NrV3JhcCB1c2VzIElJRkUsIHNvIGNhbid0IGJyZWFrIGxvb3AuXG5cdC8vIGJsb2NrIHdpbGwgc2V0IGJ1aWxkVHlwZS5cblx0QmxvY2tXcmFwKCkgeyB3aXRoSW5Mb29wKGZhbHNlLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKSB9LFxuXG5cdEJyZWFrRG8oKSB7XG5cdFx0dmVyaWZ5SW5Mb29wKHRoaXMpXG5cdFx0Y29udGV4dC5jaGVjayghKG9wTG9vcCBpbnN0YW5jZW9mIEZvclZhbCksIHRoaXMubG9jLCAoKSA9PlxuXHRcdFx0YCR7Y29kZSgnZm9yJyl9IG11c3QgYnJlYWsgd2l0aCBhIHZhbHVlLmApXG5cdH0sXG5cblx0QnJlYWtWYWwoKSB7XG5cdFx0dmVyaWZ5SW5Mb29wKHRoaXMpXG5cdFx0Y29udGV4dC5jaGVjayhvcExvb3AgaW5zdGFuY2VvZiBGb3JWYWwsIHRoaXMubG9jLCAoKSA9PlxuXHRcdFx0YCR7Y29kZSgnYnJlYWsnKX0gb25seSB2YWxpZCBpbnNpZGUgJHtjb2RlKCdmb3InKX1gKVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRDYWxsKCkge1xuXHRcdHRoaXMuY2FsbGVkLnZlcmlmeSgpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdENhc2VEbygpIHsgdmVyaWZ5Q2FzZSh0aGlzKSB9LFxuXHRDYXNlRG9QYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblx0Ly8gQ2FzZVZhbCB1c2VzIElJRkUsIHNvIGNhbid0IGJyZWFrIGxvb3AuXG5cdENhc2VWYWwoKSB7IHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHZlcmlmeUNhc2UodGhpcykpIH0sXG5cdENhc2VWYWxQYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblxuXHRDb250aW51ZSgpIHsgdmVyaWZ5SW5Mb29wKHRoaXMpIH0sXG5cblx0Ly8gT25seSByZWFjaCBoZXJlIGZvciBpbi9vdXQgY29uZGl0aW9uLlxuXHREZWJ1ZygpIHsgdmVyaWZ5TGluZXMoWyB0aGlzIF0pIH0sXG5cblx0Rm9yQmFnKCkgeyB2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5Rm9yKHRoaXMpKSB9LFxuXG5cdEZvckRvKCkgeyB2ZXJpZnlGb3IodGhpcykgfSxcblxuXHRGb3JWYWwoKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZ1bigpIHtcblx0XHR3aXRoQmxvY2tMb2NhbHMoKCkgPT4ge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0aGlzLm9wUmVzRGVjbGFyZSA9PT0gbnVsbCB8fCB0aGlzLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tWYWwsIHRoaXMubG9jLFxuXHRcdFx0XHQnRnVuY3Rpb24gd2l0aCByZXR1cm4gY29uZGl0aW9uIG11c3QgcmV0dXJuIHNvbWV0aGluZy4nKVxuXHRcdFx0d2l0aEluR2VuZXJhdG9yKHRoaXMuaXNHZW5lcmF0b3IsICgpID0+XG5cdFx0XHRcdHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhbGxBcmdzID0gY2F0KHRoaXMuYXJncywgdGhpcy5vcFJlc3RBcmcpXG5cdFx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FscyhhbGxBcmdzLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcEluLCB2ZXJpZnkpXG5cdFx0XHRcdFx0XHR0aGlzLmJsb2NrLnZlcmlmeSgpXG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcFJlc0RlY2xhcmUsIHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRcdFx0XHRcdGNvbnN0IHZlcmlmeU91dCA9ICgpID0+IG9wRWFjaCh0aGlzLm9wT3V0LCBfID0+IF8udmVyaWZ5KCkpXG5cdFx0XHRcdFx0XHRpZkVsc2UodGhpcy5vcFJlc0RlY2xhcmUsIF8gPT4gcGx1c0xvY2FsKF8sIHZlcmlmeU91dCksIHZlcmlmeU91dClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KSlcblx0XHR9KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgfSxcblxuXHRJZkRvOiBpZk9yVW5sZXNzRG8sXG5cblx0TGF6eSgpIHsgd2l0aEJsb2NrTG9jYWxzKCgpID0+IHRoaXMudmFsdWUudmVyaWZ5KCkpIH0sXG5cblx0TG9jYWxBY2Nlc3MoKSB7IGFjY2Vzc0xvY2FsKHRoaXMsIHRoaXMubmFtZSkgfSxcblxuXHQvLyBBZGRpbmcgTG9jYWxEZWNsYXJlcyB0byB0aGUgYXZhaWxhYmxlIGxvY2FscyBpcyBkb25lIGJ5IEZ1biBvciBsaW5lTmV3TG9jYWxzLlxuXHRMb2NhbERlY2xhcmUoKSB7IG9wRWFjaCh0aGlzLm9wVHlwZSwgdmVyaWZ5KSB9LFxuXG5cdExvY2FsTXV0YXRlKCkge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUodGhpcy5uYW1lLCB0aGlzLmxvYylcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUuaXNNdXRhYmxlKCksIHRoaXMubG9jLCAoKSA9PiBgJHtjb2RlKHRoaXMubmFtZSl9IGlzIG5vdCBtdXRhYmxlLmApXG5cdFx0Ly8gVE9ETzogVHJhY2sgbXV0YXRpb25zLiBNdXRhYmxlIGxvY2FsIG11c3QgYmUgbXV0YXRlZCBzb21ld2hlcmUuXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdE51bWJlckxpdGVyYWwoKSB7IH0sXG5cblx0TWFwRW50cnkoKSB7XG5cdFx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0XHR0aGlzLmtleS52ZXJpZnkoKVxuXHRcdHRoaXMudmFsLnZlcmlmeSgpXG5cdH0sXG5cblx0TWVtYmVyKCkgeyB0aGlzLm9iamVjdC52ZXJpZnkoKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHQvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGlzLmRvVXNlcy5cblx0XHR0aGlzLnVzZXMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0d2l0aEluRGVidWcoKCkgPT4gdGhpcy5kZWJ1Z1VzZXMuZm9yRWFjaCh2ZXJpZnkpKVxuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0dGhpcy5leHBvcnRzLmZvckVhY2goXyA9PiBhY2Nlc3NMb2NhbEZvclJldHVybihfLCB0aGlzKSlcblx0XHRvcEVhY2godGhpcy5vcERlZmF1bHRFeHBvcnQsIF8gPT4gcGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IF8udmVyaWZ5KCkpKVxuXG5cdFx0Y29uc3QgZXhwb3J0cyA9IG5ld1NldCh0aGlzLmV4cG9ydHMpXG5cdFx0Y29uc3QgbWFya0V4cG9ydExpbmVzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmFsbEFzc2lnbmVlcygpLnNvbWUoXyA9PiBleHBvcnRzLmhhcyhfKSkpXG5cdFx0XHRcdHJlc3VsdHMuZXhwb3J0QXNzaWducy5hZGQobGluZSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0XHR9XG5cdFx0dGhpcy5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0fSxcblxuXHRPYmpFbnRyeSgpIHtcblx0XHRhY2Nlc3NMb2NhbCh0aGlzLCAnYnVpbHQnKVxuXHRcdHRoaXMuYXNzaWduLnZlcmlmeSgpXG5cdFx0dGhpcy5hc3NpZ24uYWxsQXNzaWduZWVzKCkuZm9yRWFjaChfID0+IGFjY2Vzc0xvY2FsKHRoaXMsIF8ubmFtZSkpXG5cdH0sXG5cblx0T2JqU2ltcGxlKCkge1xuXHRcdGNvbnN0IGtleXMgPSBuZXcgU2V0KClcblx0XHR0aGlzLnBhaXJzLmZvckVhY2gocGFpciA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFrZXlzLmhhcyhwYWlyLmtleSksIHBhaXIubG9jLCAoKSA9PiBgRHVwbGljYXRlIGtleSAke3BhaXIua2V5fWApXG5cdFx0XHRrZXlzLmFkZChwYWlyLmtleSlcblx0XHRcdHBhaXIudmFsdWUudmVyaWZ5KClcblx0XHR9KVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdHRoaXMucGFydHMuZm9yRWFjaChfID0+IHtcblx0XHRcdGlmICh0eXBlb2YgXyAhPT0gJ3N0cmluZycpXG5cdFx0XHRcdF8udmVyaWZ5KClcblx0XHR9KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHsgfSxcblxuXHRTcGVjaWFsVmFsKCkgeyB9LFxuXG5cdFNwbGF0KCkgeyB0aGlzLnNwbGF0dGVkLnZlcmlmeSgpIH0sXG5cblx0VW5sZXNzRG86IGlmT3JVbmxlc3NEbyxcblxuXHRVc2UoKSB7XG5cdFx0Ly8gU2luY2UgVXNlcyBhcmUgYWx3YXlzIGluIHRoZSBvdXRlcm1vc3Qgc2NvcGUsIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgc2hhZG93aW5nLlxuXHRcdC8vIFNvIHdlIG11dGF0ZSBgbG9jYWxzYCBkaXJlY3RseS5cblx0XHRjb25zdCBhZGRVc2VMb2NhbCA9IF8gPT4ge1xuXHRcdFx0Y29uc3QgcHJldiA9IGxvY2Fscy5nZXQoXy5uYW1lKVxuXHRcdFx0Y29udGV4dC5jaGVjayhwcmV2ID09PSB1bmRlZmluZWQsIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRgJHtjb2RlKF8ubmFtZSl9IGFscmVhZHkgaW1wb3J0ZWQgYXQgJHtwcmV2LmxvY31gKVxuXHRcdFx0dmVyaWZ5TG9jYWxEZWNsYXJlKF8pXG5cdFx0XHRzZXRMb2NhbChfKVxuXHRcdH1cblx0XHR0aGlzLnVzZWQuZm9yRWFjaChhZGRVc2VMb2NhbClcblx0XHRvcEVhY2godGhpcy5vcFVzZURlZmF1bHQsIGFkZFVzZUxvY2FsKVxuXHR9LFxuXG5cdFlpZWxkKCkge1xuXHRcdGNvbnRleHQuY2hlY2soaXNJbkdlbmVyYXRvciwgdGhpcy5sb2MsICdDYW5ub3QgeWllbGQgb3V0c2lkZSBvZiBnZW5lcmF0b3IgY29udGV4dCcpXG5cdFx0dGhpcy55aWVsZGVkLnZlcmlmeSgpXG5cdH0sXG5cblx0WWllbGRUbygpIHtcblx0XHRjb250ZXh0LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZFRvLnZlcmlmeSgpXG5cdH1cbn0pXG5cbi8vIFNoYXJlZCBpbXBsZW1lbnRhdGlvbnNcbmZ1bmN0aW9uIGlmT3JVbmxlc3NEbygpIHtcblx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdHRoaXMucmVzdWx0LnZlcmlmeSgpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUJsb2NrQmFnT3JNYXAoKSB7XG5cdHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmJ1aWx0LCAoKSA9PiB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKSlcbn1cblxuZnVuY3Rpb24gdmVyaWZ5Q2FzZVBhcnQoKSB7XG5cdGlmICh0aGlzLnRlc3QgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG5cdFx0dGhpcy50ZXN0LnR5cGUudmVyaWZ5KClcblx0XHR0aGlzLnRlc3QucGF0dGVybmVkLnZlcmlmeSgpXG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2Fscyh0aGlzLnRlc3QubG9jYWxzLCAoKSA9PiB0aGlzLnJlc3VsdC52ZXJpZnkoKSlcblx0fSBlbHNlIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR0aGlzLnJlc3VsdC52ZXJpZnkoKVxuXHR9XG59XG5cbi8vIEhlbHBlcnMgc3BlY2lmaWMgdG8gY2VydGFpbiBNc0FzdCB0eXBlczpcbmNvbnN0XG5cdHZlcmlmeUZvciA9IGZvckxvb3AgPT4ge1xuXHRcdGNvbnN0IHZlcmlmeUJsb2NrID0gKCkgPT4gd2l0aEluTG9vcChmb3JMb29wLCAoKSA9PiBmb3JMb29wLmJsb2NrLnZlcmlmeSgpKVxuXHRcdGlmRWxzZShmb3JMb29wLm9wSXRlcmF0ZWUsXG5cdFx0XHQoeyBlbGVtZW50LCBiYWcgfSkgPT4ge1xuXHRcdFx0XHRiYWcudmVyaWZ5KClcblx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKGVsZW1lbnQsIHZlcmlmeUJsb2NrKVxuXHRcdFx0fSxcblx0XHRcdHZlcmlmeUJsb2NrKVxuXHR9LFxuXG5cdHZlcmlmeUluTG9vcCA9IGxvb3BVc2VyID0+XG5cdFx0Y29udGV4dC5jaGVjayhvcExvb3AgIT09IG51bGwsIGxvb3BVc2VyLmxvYywgJ05vdCBpbiBhIGxvb3AuJyksXG5cblxuXHR2ZXJpZnlDYXNlID0gXyA9PiB7XG5cdFx0Y29uc3QgZG9JdCA9ICgpID0+IHtcblx0XHRcdF8ucGFydHMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0XHRvcEVhY2goXy5vcEVsc2UsIHZlcmlmeSlcblx0XHR9XG5cdFx0aWZFbHNlKF8ub3BDYXNlZCxcblx0XHRcdF8gPT4ge1xuXHRcdFx0XHRfLnZlcmlmeSgpXG5cdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbChfLmFzc2lnbmVlLCBkb0l0KVxuXHRcdFx0fSxcblx0XHRcdGRvSXQpXG5cdH1cblxuLy8gR2VuZXJhbCB1dGlsaXRpZXM6XG5jb25zdFxuXHRnZXRMb2NhbERlY2xhcmUgPSAobmFtZSwgYWNjZXNzTG9jKSA9PiB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGxvY2Fscy5nZXQobmFtZSlcblx0XHRjb250ZXh0LmNoZWNrKGRlY2xhcmUgIT09IHVuZGVmaW5lZCwgYWNjZXNzTG9jLCAoKSA9PlxuXHRcdFx0YE5vIHN1Y2ggbG9jYWwgJHtjb2RlKG5hbWUpfS5cXG5Mb2NhbHMgYXJlOlxcbiR7Y29kZShtYXBLZXlzKGxvY2Fscykuam9pbignICcpKX0uYClcblx0XHRyZXR1cm4gZGVjbGFyZVxuXHR9LFxuXG5cdGxpbmVOZXdMb2NhbHMgPSBsaW5lID0+XG5cdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnblNpbmdsZSA/XG5cdFx0XHRbIGxpbmUuYXNzaWduZWUgXSA6XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQXNzaWduRGVzdHJ1Y3R1cmUgP1xuXHRcdFx0bGluZS5hc3NpZ25lZXMgOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIE9iakVudHJ5ID9cblx0XHRcdGxpbmVOZXdMb2NhbHMobGluZS5hc3NpZ24pIDpcblx0XHRcdFsgXSxcblxuXHR2ZXJpZnlMaW5lcyA9IGxpbmVzID0+IHtcblx0XHQvKlxuXHRcdFdlIG5lZWQgdG8gYmV0IGFsbCBibG9jayBsb2NhbHMgdXAtZnJvbnQgYmVjYXVzZVxuXHRcdEZ1bmN0aW9ucyB3aXRoaW4gbGluZXMgY2FuIGFjY2VzcyBsb2NhbHMgZnJvbSBsYXRlciBsaW5lcy5cblx0XHROT1RFOiBXZSBwdXNoIHRoZXNlIG9udG8gcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHJldmVyc2Vcblx0XHRzbyB0aGF0IHdoZW4gd2UgaXRlcmF0ZSB0aHJvdWdoIGxpbmVzIGZvcndhcmRzLCB3ZSBjYW4gcG9wIGZyb20gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0dG8gcmVtb3ZlIHBlbmRpbmcgbG9jYWxzIGFzIHRoZXkgYmVjb21lIHJlYWwgbG9jYWxzLlxuXHRcdEl0IGRvZXNuJ3QgcmVhbGx5IG1hdHRlciB3aGF0IG9yZGVyIHdlIGFkZCBsb2NhbHMgaW4gc2luY2UgaXQncyBub3QgYWxsb3dlZFxuXHRcdHRvIGhhdmUgdHdvIGxvY2FscyBvZiB0aGUgc2FtZSBuYW1lIGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdCovXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gWyBdXG5cblx0XHRjb25zdCBnZXRMaW5lTG9jYWxzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBlYWNoUmV2ZXJzZShsaW5lLmxpbmVzLCBnZXRMaW5lTG9jYWxzKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZWFjaFJldmVyc2UobGluZU5ld0xvY2FscyhsaW5lKSwgXyA9PiB7XG5cdFx0XHRcdFx0Ly8gUmVnaXN0ZXIgdGhlIGxvY2FsIG5vdy4gQ2FuJ3Qgd2FpdCB1bnRpbCB0aGUgYXNzaWduIGlzIHZlcmlmaWVkLlxuXHRcdFx0XHRcdHJlZ2lzdGVyTG9jYWwoXylcblx0XHRcdFx0XHRuZXdMb2NhbHMucHVzaChfKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRlYWNoUmV2ZXJzZShsaW5lcywgZ2V0TGluZUxvY2Fscylcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMucHVzaCguLi5uZXdMb2NhbHMpXG5cblx0XHQvKlxuXHRcdEtlZXBzIHRyYWNrIG9mIGxvY2FscyB3aGljaCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCBpbiB0aGlzIGJsb2NrLlxuXHRcdE1hc29uIGFsbG93cyBzaGFkb3dpbmcsIGJ1dCBub3Qgd2l0aGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdFNvLCB0aGlzIGlzIGFsbG93ZWQ6XG5cdFx0XHRhID0gMVxuXHRcdFx0YiA9XG5cdFx0XHRcdGEgPSAyXG5cdFx0XHRcdC4uLlxuXHRcdEJ1dCBub3Q6XG5cdFx0XHRhID0gMVxuXHRcdFx0YSA9IDJcblx0XHQqL1xuXHRcdGNvbnN0IHRoaXNCbG9ja0xvY2FsTmFtZXMgPSBuZXcgU2V0KClcblxuXHRcdC8vIEFsbCBzaGFkb3dlZCBsb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBbIF1cblxuXHRcdGNvbnN0IHZlcmlmeUxpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdC8vIFRPRE86IERvIGFueXRoaW5nIGluIHRoaXMgc2l0dWF0aW9uP1xuXHRcdFx0XHQvLyBjb250ZXh0LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ1JlZHVuZGFudCBgZGVidWdgLicpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKCgpID0+IGxpbmUubGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2ZXJpZnlJc1N0YXRlbWVudChsaW5lKVxuXHRcdFx0XHRsaW5lTmV3TG9jYWxzKGxpbmUpLmZvckVhY2gobmV3TG9jYWwgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBuZXdMb2NhbC5uYW1lXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTG9jYWwgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0XHRcdFx0aWYgKG9sZExvY2FsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIXRoaXNCbG9ja0xvY2FsTmFtZXMuaGFzKG5hbWUpLCBuZXdMb2NhbC5sb2MsXG5cdFx0XHRcdFx0XHRcdCgpID0+IGBBIGxvY2FsICR7Y29kZShuYW1lKX0gaXMgYWxyZWFkeSBpbiB0aGlzIGJsb2NrLmApXG5cdFx0XHRcdFx0XHRzaGFkb3dlZC5wdXNoKG9sZExvY2FsKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzQmxvY2tMb2NhbE5hbWVzLmFkZChuYW1lKVxuXHRcdFx0XHRcdHNldExvY2FsKG5ld0xvY2FsKVxuXG5cdFx0XHRcdFx0Ly8gTm93IHRoYXQgaXQncyBhZGRlZCBhcyBhIGxvY2FsLCBpdCdzIG5vIGxvbmdlciBwZW5kaW5nLlxuXHRcdFx0XHRcdC8vIFdlIGFkZGVkIHBlbmRpbmdCbG9ja0xvY2FscyBpbiB0aGUgcmlnaHQgb3JkZXIgdGhhdCB3ZSBjYW4ganVzdCBwb3AgdGhlbSBvZmYuXG5cdFx0XHRcdFx0Y29uc3QgcG9wcGVkID0gcGVuZGluZ0Jsb2NrTG9jYWxzLnBvcCgpXG5cdFx0XHRcdFx0YXNzZXJ0KHBvcHBlZCA9PT0gbmV3TG9jYWwpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGxpbmUudmVyaWZ5KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsaW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpXG5cblx0XHRuZXdMb2NhbHMuZm9yRWFjaChkZWxldGVMb2NhbClcblx0XHRzaGFkb3dlZC5mb3JFYWNoKF8gPT4gc2V0TG9jYWwoXykpXG5cblx0XHRyZXR1cm4gbmV3TG9jYWxzXG5cdH0sXG5cblx0dmVyaWZ5SXNTdGF0ZW1lbnQgPSBsaW5lID0+IHtcblx0XHRjb25zdCBpc1N0YXRlbWVudCA9XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgRG8gfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBDYWxsIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGQgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZFRvIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIE9iakVudHJ5IHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgU3BlY2lhbERvXG5cdFx0Y29udGV4dC5jaGVjayhpc1N0YXRlbWVudCwgbGluZS5sb2MsICdFeHByZXNzaW9uIGluIHN0YXRlbWVudCBwb3NpdGlvbi4nKVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==