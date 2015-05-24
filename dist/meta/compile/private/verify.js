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
		isInDebug = isInGenerator = isInLoop = false;
		results = new _VerifyResults2.default();

		msAst.verify();
		verifyLocalUse();

		const res = results;
		// Release for garbage collection.
		context = locals = pendingBlockLocals = results = undefined;
		return res;
	};

	// Use a trick like in parse.js and have everything close over these mutable variables.
	let context,
	// Map from names to LocalDeclares.
	locals,
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
	isInGenerator,
	// Whether we are currently able to break.
	isInLoop, results;

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
	      withInLoop = function (newIsInLoop, action) {
		const oldIsInLoop = isInLoop;
		isInLoop = newIsInLoop;
		action();
		isInLoop = oldIsInLoop;
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
			if (!(local instanceof _MsAst.LocalDeclareRes)) {
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
		Assign: function () {
			var _this = this;

			const doV = function () {
				// Assignee registered by verifyLines.
				_this.assignee.verify();
				_this.value.verify();
			};
			if (this.assignee.isLazy()) withBlockLocals(doV);else doV();
		},

		AssignDestructure: function () {
			this.value.verify();
			// Assignees registered by verifyLines.
			this.assignees.forEach(verify);
		},

		AssignMutate: function () {
			var _this2 = this;

			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, function () {
				return '' + (0, _CompileError.code)(_this2.name) + ' is not mutable.';
			});
			// TODO: Track assignments. Mutable local must be mutated somewhere.
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
			var _this3 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this3.returned.verify();
			});
		},

		BlockObj: function () {
			var _this4 = this;

			const newLocals = verifyLines(this.lines);
			this.keys.forEach(function (_) {
				return accessLocalForReturn(_, _this4);
			});
			(0, _util.opEach)(this.opObjed, function (_) {
				return plusLocals(newLocals, function () {
					return _.verify();
				});
			});
		},

		BlockBag: verifyBlockBagOrMap,
		BlockMap: verifyBlockBagOrMap,

		// BlockWrap uses IIFE, so can't break loop.
		// block will set buildType.
		BlockWrap: function () {
			var _this5 = this;

			withInLoop(false, function () {
				return _this5.block.verify();
			});
		},

		BreakDo: function () {
			if (!isInLoop) context.fail(this.loc, 'Not in a loop.');
		},

		Call: function () {
			this.called.verify();
			this.args.forEach(verify);
		},

		CaseDo: function () {
			verifyCase(this);
		},
		CaseDoPart: verifyCasePart,
		// CaseVal uses IIFE, so can't break loop
		CaseVal: function () {
			var _this6 = this;

			withInLoop(false, function () {
				return verifyCase(_this6);
			});
		},
		CaseValPart: verifyCasePart,

		// Only reach here for in/out condition
		Debug: function () {
			verifyLines([this]);
		},

		ForDoPlain: function () {
			var _this7 = this;

			withInLoop(true, function () {
				return _this7.block.verify();
			});
		},

		ForDoWithBag: function () {
			var _this8 = this;

			this.bag.verify();
			verifyAndPlusLocal(this.element, function () {
				return withInLoop(true, function () {
					return _this8.block.verify();
				});
			});
		},

		Fun: function () {
			var _this9 = this;

			withBlockLocals(function () {
				context.check(_this9.opResDeclare === null || _this9.block instanceof _MsAst.BlockVal, _this9.loc, 'Function with return condition must return something.');
				withInGenerator(_this9.isGenerator, function () {
					return withInLoop(false, function () {
						const allArgs = (0, _util.cat)(_this9.args, _this9.opRestArg);
						verifyAndPlusLocals(allArgs, function () {
							(0, _util.opEach)(_this9.opIn, verify);
							_this9.block.verify();
							(0, _util.opEach)(_this9.opResDeclare, verifyLocalDeclare);
							const verifyOut = function () {
								return (0, _util.opEach)(_this9.opOut, function (_) {
									return _.verify();
								});
							};
							(0, _util.ifElse)(_this9.opResDeclare, function (_) {
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
			var _this10 = this;

			withBlockLocals(function () {
				return _this10.value.verify();
			});
		},

		LocalAccess: function () {
			accessLocal(this, this.name);
		},

		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare: function () {
			(0, _util.opEach)(this.opType, verify);
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
			var _this11 = this;

			// No need to verify this.doUses.
			this.uses.forEach(verify);
			withInDebug(function () {
				return _this11.debugUses.forEach(verify);
			});
			const newLocals = verifyLines(this.lines);
			this.exports.forEach(function (_) {
				return accessLocalForReturn(_, _this11);
			});
			(0, _util.opEach)(this.opDefaultExport, function (_) {
				return plusLocals(newLocals, function () {
					return _.verify();
				});
			});

			const exports = (0, _util.newSet)(this.exports);
			const markExportLines = function (line) {
				if (line instanceof _MsAst.Assign && exports.has(line.assignee) || line instanceof _MsAst.AssignDestructure && line.assignees.some(function (_) {
					return exports.has(_);
				})) results.exportAssigns.add(line);else if (line instanceof _MsAst.Debug) line.lines.forEach(markExportLines);
			};
			this.lines.forEach(markExportLines);
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

	const verifyCase = function (_) {
		const doIt = function () {
			_.parts.forEach(verify);
			(0, _util.opEach)(_.opElse, verify);
		};
		(0, _util.ifElse)(_.opCased, function (_) {
			_.verify();
			verifyAndPlusLocal(_.assignee, doIt);
		}, doIt);
	};

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

	const getLocalDeclare = function (name, accessLoc) {
		const declare = locals.get(name);
		context.check(declare !== undefined, accessLoc, function () {
			return 'No such local ' + (0, _CompileError.code)(name) + '.\nLocals are:\n' + (0, _CompileError.code)((0, _util.mapKeys)(locals).join(' ')) + '.';
		});
		return declare;
	},
	      lineNewLocals = function (line) {
		return line instanceof _MsAst.Assign ? [line.assignee] : line instanceof _MsAst.AssignDestructure ? line.assignees : [];
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
		const isStatement = line instanceof _MsAst.Do || line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo || line instanceof _MsAst.BagEntry || line instanceof _MsAst.MapEntry || line instanceof _MsAst.SpecialDo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxVQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFBO0FBQzVDLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsa0JBQWtCLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUMzRCxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7QUFHRCxLQUNDLE9BQU87O0FBRVAsT0FBTTs7Ozs7Ozs7Ozs7Ozs7O0FBZU4sbUJBQWtCLEVBQ2xCLFNBQVM7O0FBRVQsY0FBYTs7QUFFYixTQUFRLEVBQ1IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLFVBQUEsS0FBSztTQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFBQTtPQUVoQyxXQUFXLEdBQUcsVUFBQSxZQUFZO1NBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztFQUFBO09BRWpDLFFBQVEsR0FBRyxVQUFBLFlBQVk7U0FDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUFBOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tWYWwsIENhbGwsIERlYnVnLCBEbywgQmFnRW50cnksIExvY2FsRGVjbGFyZVJlcyxcblx0TWFwRW50cnksIFBhdHRlcm4sIFNwZWNpYWxEbywgWWllbGQsIFlpZWxkVG8gfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGFzc2VydCwgY2F0LCBlYWNoUmV2ZXJzZSwgaGVhZCwgaWZFbHNlLCBpbXBsZW1lbnRNYW55LFxuXHRpc0VtcHR5LCBtYXBLZXlzLCBuZXdTZXQsIG9wRWFjaCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBWZXJpZnlSZXN1bHRzLCB7IExvY2FsSW5mbyB9IGZyb20gJy4vVmVyaWZ5UmVzdWx0cydcblxuLypcblRoZSB2ZXJpZmllciBnZW5lcmF0ZXMgaW5mb3JtYXRpb24gbmVlZGVkIGR1cmluZyB0cmFuc3BpbGluZywgdGhlIFZlcmlmeVJlc3VsdHMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCBtc0FzdCkgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0bG9jYWxzID0gbmV3IE1hcCgpXG5cdHBlbmRpbmdCbG9ja0xvY2FscyA9IFsgXVxuXHRpc0luRGVidWcgPSBpc0luR2VuZXJhdG9yID0gaXNJbkxvb3AgPSBmYWxzZVxuXHRyZXN1bHRzID0gbmV3IFZlcmlmeVJlc3VsdHMoKVxuXG5cdG1zQXN0LnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsVXNlKClcblxuXHRjb25zdCByZXMgPSByZXN1bHRzXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblx0Y29udGV4dCA9IGxvY2FscyA9IHBlbmRpbmdCbG9ja0xvY2FscyA9IHJlc3VsdHMgPSB1bmRlZmluZWRcblx0cmV0dXJuIHJlc1xufVxuXG4vLyBVc2UgYSB0cmljayBsaWtlIGluIHBhcnNlLmpzIGFuZCBoYXZlIGV2ZXJ5dGhpbmcgY2xvc2Ugb3ZlciB0aGVzZSBtdXRhYmxlIHZhcmlhYmxlcy5cbmxldFxuXHRjb250ZXh0LFxuXHQvLyBNYXAgZnJvbSBuYW1lcyB0byBMb2NhbERlY2xhcmVzLlxuXHRsb2NhbHMsXG5cdC8qXG5cdExvY2FscyBmb3IgdGhpcyBibG9jay5cblx0VGhlc2UgYXJlIGFkZGVkIHRvIGxvY2FscyB3aGVuIGVudGVyaW5nIGEgRnVuY3Rpb24gb3IgbGF6eSBldmFsdWF0aW9uLlxuXHRJbjpcblx0XHRhID0gfFxuXHRcdFx0YlxuXHRcdGIgPSAxXG5cdGBiYCB3aWxsIGJlIGEgcGVuZGluZyBsb2NhbC5cblx0SG93ZXZlcjpcblx0XHRhID0gYlxuXHRcdGIgPSAxXG5cdHdpbGwgZmFpbCB0byB2ZXJpZnksIGJlY2F1c2UgYGJgIGNvbWVzIGFmdGVyIGBhYCBhbmQgaXMgbm90IGFjY2Vzc2VkIGluc2lkZSBhIGZ1bmN0aW9uLlxuXHRJdCB3b3VsZCB3b3JrIGZvciBgfmEgaXMgYmAsIHRob3VnaC5cblx0Ki9cblx0cGVuZGluZ0Jsb2NrTG9jYWxzLFxuXHRpc0luRGVidWcsXG5cdC8vIFdoZXRoZXIgd2UgYXJlIGN1cnJlbnRseSBhYmxlIHRvIHlpZWxkLlxuXHRpc0luR2VuZXJhdG9yLFxuXHQvLyBXaGV0aGVyIHdlIGFyZSBjdXJyZW50bHkgYWJsZSB0byBicmVhay5cblx0aXNJbkxvb3AsXG5cdHJlc3VsdHNcblxuY29uc3Rcblx0dmVyaWZ5ID0gbXNBc3QgPT4gbXNBc3QudmVyaWZ5KCksXG5cblx0ZGVsZXRlTG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRsb2NhbHMuZGVsZXRlKGxvY2FsRGVjbGFyZS5uYW1lKSxcblxuXHRzZXRMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5zZXQobG9jYWxEZWNsYXJlLm5hbWUsIGxvY2FsRGVjbGFyZSksXG5cblx0Ly8gV2hlbiBhIGxvY2FsIGlzIHJldHVybmVkIGZyb20gYSBCbG9ja09iaiBvciBNb2R1bGUsXG5cdC8vIHRoZSByZXR1cm4gJ2FjY2VzcycgaXMgY29uc2lkZXJlZCB0byBiZSAnZGVidWcnIGlmIHRoZSBsb2NhbCBpcy5cblx0YWNjZXNzTG9jYWxGb3JSZXR1cm4gPSAoZGVjbGFyZSwgYWNjZXNzKSA9PiB7XG5cdFx0Y29uc3QgaW5mbyA9IHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKVxuXHRcdF9hZGRMb2NhbEFjY2VzcyhpbmZvLCBhY2Nlc3MsIGluZm8uaXNJbkRlYnVnKVxuXHR9LFxuXG5cdGFjY2Vzc0xvY2FsID0gKGFjY2VzcywgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBnZXRMb2NhbERlY2xhcmUobmFtZSwgYWNjZXNzLmxvYylcblx0XHRyZXN1bHRzLmxvY2FsQWNjZXNzVG9EZWNsYXJlLnNldChhY2Nlc3MsIGRlY2xhcmUpXG5cdFx0X2FkZExvY2FsQWNjZXNzKHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKSwgYWNjZXNzLCBpc0luRGVidWcpXG5cdH0sXG5cblx0X2FkZExvY2FsQWNjZXNzID0gKGxvY2FsSW5mbywgYWNjZXNzLCBpc0RlYnVnQWNjZXNzKSA9PlxuXHRcdChpc0RlYnVnQWNjZXNzID8gbG9jYWxJbmZvLmRlYnVnQWNjZXNzZXMgOiBsb2NhbEluZm8ubm9uRGVidWdBY2Nlc3NlcykucHVzaChhY2Nlc3MpLFxuXG5cdC8vIEZvciBleHByZXNzaW9ucyBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdGhleSB3aWxsIGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGJlaW5nIHZlcmlmaWVkLlxuXHQvLyBTbywgTG9jYWxEZWNsYXJlLnZlcmlmeSBqdXN0IHRoZSB0eXBlLlxuXHQvLyBGb3IgbG9jYWxzIG5vdCBhZmZlY3RpbmcgbGluZU5ld0xvY2FscywgdXNlIHRoaXMgaW5zdGVhZCBvZiBqdXN0IGRlY2xhcmUudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+IHtcblx0XHRyZWdpc3RlckxvY2FsKGxvY2FsRGVjbGFyZSlcblx0XHRsb2NhbERlY2xhcmUudmVyaWZ5KClcblx0fSxcblxuXHRyZWdpc3RlckxvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uc2V0KGxvY2FsRGVjbGFyZSwgTG9jYWxJbmZvLmVtcHR5KGlzSW5EZWJ1ZykpXG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyBjaGFuZ2UgdmVyaWZpZXIgc3RhdGUgYW5kIGVmZmljaWVudGx5IHJldHVybiB0byB0aGUgb2xkIHN0YXRlIHdoZW4gZmluaXNoZWQuXG5jb25zdFxuXHR3aXRoSW5EZWJ1ZyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkRlYnVnID0gaXNJbkRlYnVnXG5cdFx0aXNJbkRlYnVnID0gdHJ1ZVxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkRlYnVnID0gb2xkSXNJbkRlYnVnXG5cdH0sXG5cblx0d2l0aEluR2VuZXJhdG9yID0gKG5ld0lzSW5HZW5lcmF0b3IsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IG5ld0lzSW5HZW5lcmF0b3Jcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJc0luR2VuZXJhdG9yXG5cdH0sXG5cblx0d2l0aEluTG9vcCA9IChuZXdJc0luTG9vcCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkxvb3AgPSBpc0luTG9vcFxuXHRcdGlzSW5Mb29wID0gbmV3SXNJbkxvb3Bcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5Mb29wID0gb2xkSXNJbkxvb3Bcblx0fSxcblxuXHRwbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KGFkZGVkTG9jYWwubmFtZSlcblx0XHRsb2NhbHMuc2V0KGFkZGVkTG9jYWwubmFtZSwgYWRkZWRMb2NhbClcblx0XHRhY3Rpb24oKVxuXHRcdGlmIChzaGFkb3dlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0ZGVsZXRlTG9jYWwoYWRkZWRMb2NhbClcblx0XHRlbHNlXG5cdFx0XHRzZXRMb2NhbChzaGFkb3dlZClcblx0fSxcblxuXHQvLyBTaG91bGQgaGF2ZSB2ZXJpZmllZCB0aGF0IGFkZGVkTG9jYWxzIGFsbCBoYXZlIGRpZmZlcmVudCBuYW1lcy5cblx0cGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWRMb2NhbHMgPSBbIF1cblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGlmIChzaGFkb3dlZCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzaGFkb3dlZExvY2Fscy5wdXNoKHNoYWRvd2VkKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9KVxuXG5cdFx0YWN0aW9uKClcblxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWRMb2NhbHMuZm9yRWFjaChzZXRMb2NhbClcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0dmVyaWZ5TG9jYWxEZWNsYXJlKGFkZGVkTG9jYWwpXG5cdFx0cGx1c0xvY2FsKGFkZGVkTG9jYWwsIGFjdGlvbilcblx0fSxcblxuXHR2ZXJpZnlBbmRQbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRjb25zdCBuYW1lcyA9IG5ldyBTZXQoKVxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFuYW1lcy5oYXMoXy5uYW1lKSwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGBEdXBsaWNhdGUgbG9jYWwgJHtjb2RlKF8ubmFtZSl9YClcblx0XHRcdG5hbWVzLmFkZChfLm5hbWUpXG5cdFx0fSlcblx0XHRwbHVzTG9jYWxzKGFkZGVkTG9jYWxzLCBhY3Rpb24pXG5cdH0sXG5cblx0d2l0aEJsb2NrTG9jYWxzID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRQZW5kaW5nQmxvY2tMb2NhbHMgPSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0XHRwbHVzTG9jYWxzKG9sZFBlbmRpbmdCbG9ja0xvY2FscywgYWN0aW9uKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IG9sZFBlbmRpbmdCbG9ja0xvY2Fsc1xuXHR9XG5cbmNvbnN0IHZlcmlmeUxvY2FsVXNlID0gKCkgPT5cblx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZm9yRWFjaCgoaW5mbywgbG9jYWwpID0+IHtcblx0XHRpZiAoIShsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZVJlcykpIHtcblx0XHRcdGNvbnN0IG5vTm9uRGVidWcgPSBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3Nlcylcblx0XHRcdGlmIChub05vbkRlYnVnICYmIGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSlcblx0XHRcdFx0Y29udGV4dC53YXJuKGxvY2FsLmxvYywgKCkgPT4gYFVudXNlZCBsb2NhbCB2YXJpYWJsZSAke2NvZGUobG9jYWwubmFtZSl9LmApXG5cdFx0XHRlbHNlIGlmIChpbmZvLmlzSW5EZWJ1Zylcblx0XHRcdFx0Y29udGV4dC53YXJuSWYoIW5vTm9uRGVidWcsICgpID0+IGhlYWQoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5sb2MsICgpID0+XG5cdFx0XHRcdFx0YERlYnVnLW9ubHkgbG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG91dHNpZGUgb2YgZGVidWcuYClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29udGV4dC53YXJuSWYobm9Ob25EZWJ1ZywgbG9jYWwubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBMb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb25seSBpbiBkZWJ1Zy5gKVxuXHRcdH1cblx0fSlcblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndmVyaWZ5Jywge1xuXHRBc3NpZ24oKSB7XG5cdFx0Y29uc3QgZG9WID0gKCkgPT4ge1xuXHRcdFx0Ly8gQXNzaWduZWUgcmVnaXN0ZXJlZCBieSB2ZXJpZnlMaW5lcy5cblx0XHRcdHRoaXMuYXNzaWduZWUudmVyaWZ5KClcblx0XHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0XHR9XG5cdFx0aWYgKHRoaXMuYXNzaWduZWUuaXNMYXp5KCkpXG5cdFx0XHR3aXRoQmxvY2tMb2NhbHMoZG9WKVxuXHRcdGVsc2Vcblx0XHRcdGRvVigpXG5cdH0sXG5cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdHRoaXMuYXNzaWduZWVzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdEFzc2lnbk11dGF0ZSgpIHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKHRoaXMubmFtZSwgdGhpcy5sb2MpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlLmlzTXV0YWJsZSgpLCB0aGlzLmxvYywgKCkgPT4gYCR7Y29kZSh0aGlzLm5hbWUpfSBpcyBub3QgbXV0YWJsZS5gKVxuXHRcdC8vIFRPRE86IFRyYWNrIGFzc2lnbm1lbnRzLiBNdXRhYmxlIGxvY2FsIG11c3QgYmUgbXV0YXRlZCBzb21ld2hlcmUuXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdEJhZ1NpbXBsZSgpIHsgdGhpcy5wYXJ0cy5mb3JFYWNoKHZlcmlmeSkgfSxcblxuXHRCbG9ja0RvKCkgeyB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKSB9LFxuXG5cdEJsb2NrV2l0aFJldHVybigpIHtcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiB0aGlzLnJldHVybmVkLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEJsb2NrT2JqKCkge1xuXHRcdGNvbnN0IG5ld0xvY2FscyA9IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpXG5cdFx0dGhpcy5rZXlzLmZvckVhY2goXyA9PiBhY2Nlc3NMb2NhbEZvclJldHVybihfLCB0aGlzKSlcblx0XHRvcEVhY2godGhpcy5vcE9iamVkLCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblx0fSxcblxuXHRCbG9ja0JhZzogdmVyaWZ5QmxvY2tCYWdPck1hcCxcblx0QmxvY2tNYXA6IHZlcmlmeUJsb2NrQmFnT3JNYXAsXG5cblx0Ly8gQmxvY2tXcmFwIHVzZXMgSUlGRSwgc28gY2FuJ3QgYnJlYWsgbG9vcC5cblx0Ly8gYmxvY2sgd2lsbCBzZXQgYnVpbGRUeXBlLlxuXHRCbG9ja1dyYXAoKSB7IHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpIH0sXG5cblx0QnJlYWtEbygpIHtcblx0XHRpZiAoIWlzSW5Mb29wKVxuXHRcdFx0Y29udGV4dC5mYWlsKHRoaXMubG9jLCAnTm90IGluIGEgbG9vcC4nKVxuXHR9LFxuXG5cdENhbGwoKSB7XG5cdFx0dGhpcy5jYWxsZWQudmVyaWZ5KClcblx0XHR0aGlzLmFyZ3MuZm9yRWFjaCh2ZXJpZnkpXG5cdH0sXG5cblx0Q2FzZURvKCkgeyB2ZXJpZnlDYXNlKHRoaXMpIH0sXG5cdENhc2VEb1BhcnQ6IHZlcmlmeUNhc2VQYXJ0LFxuXHQvLyBDYXNlVmFsIHVzZXMgSUlGRSwgc28gY2FuJ3QgYnJlYWsgbG9vcFxuXHRDYXNlVmFsKCkgeyB3aXRoSW5Mb29wKGZhbHNlLCAoKSA9PiB2ZXJpZnlDYXNlKHRoaXMpKSB9LFxuXHRDYXNlVmFsUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cblx0Ly8gT25seSByZWFjaCBoZXJlIGZvciBpbi9vdXQgY29uZGl0aW9uXG5cdERlYnVnKCkgeyB2ZXJpZnlMaW5lcyhbIHRoaXMgXSkgfSxcblxuXHRGb3JEb1BsYWluKCkgeyB3aXRoSW5Mb29wKHRydWUsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpIH0sXG5cblx0Rm9yRG9XaXRoQmFnKCkge1xuXHRcdHRoaXMuYmFnLnZlcmlmeSgpXG5cdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuZWxlbWVudCwgKCkgPT4gd2l0aEluTG9vcCh0cnVlLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKSlcblx0fSxcblxuXHRGdW4oKSB7XG5cdFx0d2l0aEJsb2NrTG9jYWxzKCgpID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2sodGhpcy5vcFJlc0RlY2xhcmUgPT09IG51bGwgfHwgdGhpcy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrVmFsLCB0aGlzLmxvYyxcblx0XHRcdFx0J0Z1bmN0aW9uIHdpdGggcmV0dXJuIGNvbmRpdGlvbiBtdXN0IHJldHVybiBzb21ldGhpbmcuJylcblx0XHRcdHdpdGhJbkdlbmVyYXRvcih0aGlzLmlzR2VuZXJhdG9yLCAoKSA9PlxuXHRcdFx0XHR3aXRoSW5Mb29wKGZhbHNlLCAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgYWxsQXJncyA9IGNhdCh0aGlzLmFyZ3MsIHRoaXMub3BSZXN0QXJnKVxuXHRcdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbHMoYWxsQXJncywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BJbiwgdmVyaWZ5KVxuXHRcdFx0XHRcdFx0dGhpcy5ibG9jay52ZXJpZnkoKVxuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BSZXNEZWNsYXJlLCB2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0XHRcdFx0XHRjb25zdCB2ZXJpZnlPdXQgPSAoKSA9PiBvcEVhY2godGhpcy5vcE91dCwgXyA9PiBfLnZlcmlmeSgpKVxuXHRcdFx0XHRcdFx0aWZFbHNlKHRoaXMub3BSZXNEZWNsYXJlLCBfID0+IHBsdXNMb2NhbChfLCB2ZXJpZnlPdXQpLCB2ZXJpZnlPdXQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSkpXG5cdFx0fSlcblx0fSxcblxuXHRHbG9iYWxBY2Nlc3MoKSB7IH0sXG5cblx0SWZEbzogaWZPclVubGVzc0RvLFxuXG5cdExhenkoKSB7IHdpdGhCbG9ja0xvY2FscygoKSA9PiB0aGlzLnZhbHVlLnZlcmlmeSgpKSB9LFxuXG5cdExvY2FsQWNjZXNzKCkgeyBhY2Nlc3NMb2NhbCh0aGlzLCB0aGlzLm5hbWUpIH0sXG5cblx0Ly8gQWRkaW5nIExvY2FsRGVjbGFyZXMgdG8gdGhlIGF2YWlsYWJsZSBsb2NhbHMgaXMgZG9uZSBieSBGdW4gb3IgbGluZU5ld0xvY2Fscy5cblx0TG9jYWxEZWNsYXJlKCkgeyBvcEVhY2godGhpcy5vcFR5cGUsIHZlcmlmeSkgfSxcblxuXHROdW1iZXJMaXRlcmFsKCkgeyB9LFxuXG5cdE1hcEVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5rZXkudmVyaWZ5KClcblx0XHR0aGlzLnZhbC52ZXJpZnkoKVxuXHR9LFxuXG5cdE1lbWJlcigpIHsgdGhpcy5vYmplY3QudmVyaWZ5KCkgfSxcblxuXHRNb2R1bGUoKSB7XG5cdFx0Ly8gTm8gbmVlZCB0byB2ZXJpZnkgdGhpcy5kb1VzZXMuXG5cdFx0dGhpcy51c2VzLmZvckVhY2godmVyaWZ5KVxuXHRcdHdpdGhJbkRlYnVnKCgpID0+IHRoaXMuZGVidWdVc2VzLmZvckVhY2godmVyaWZ5KSlcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHRoaXMuZXhwb3J0cy5mb3JFYWNoKF8gPT4gYWNjZXNzTG9jYWxGb3JSZXR1cm4oXywgdGhpcykpXG5cdFx0b3BFYWNoKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblxuXHRcdGNvbnN0IGV4cG9ydHMgPSBuZXdTZXQodGhpcy5leHBvcnRzKVxuXHRcdGNvbnN0IG1hcmtFeHBvcnRMaW5lcyA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gJiYgZXhwb3J0cy5oYXMobGluZS5hc3NpZ25lZSkgfHxcblx0XHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlICYmIGxpbmUuYXNzaWduZWVzLnNvbWUoXyA9PiBleHBvcnRzLmhhcyhfKSkpXG5cdFx0XHRcdHJlc3VsdHMuZXhwb3J0QXNzaWducy5hZGQobGluZSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0XHR9XG5cdFx0dGhpcy5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0fSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0Y29uc3Qga2V5cyA9IG5ldyBTZXQoKVxuXHRcdHRoaXMucGFpcnMuZm9yRWFjaChwYWlyID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2soIWtleXMuaGFzKHBhaXIua2V5KSwgcGFpci5sb2MsICgpID0+IGBEdXBsaWNhdGUga2V5ICR7cGFpci5rZXl9YClcblx0XHRcdGtleXMuYWRkKHBhaXIua2V5KVxuXHRcdFx0cGFpci52YWx1ZS52ZXJpZnkoKVxuXHRcdH0pXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0dGhpcy5wYXJ0cy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBfICE9PSAnc3RyaW5nJylcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHRcdH0pXG5cdH0sXG5cblx0U3BlY2lhbERvKCkgeyB9LFxuXG5cdFNwZWNpYWxWYWwoKSB7IH0sXG5cblx0U3BsYXQoKSB7IHRoaXMuc3BsYXR0ZWQudmVyaWZ5KCkgfSxcblxuXHRVbmxlc3NEbzogaWZPclVubGVzc0RvLFxuXG5cdFVzZSgpIHtcblx0XHQvLyBTaW5jZSBVc2VzIGFyZSBhbHdheXMgaW4gdGhlIG91dGVybW9zdCBzY29wZSwgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCBzaGFkb3dpbmcuXG5cdFx0Ly8gU28gd2UgbXV0YXRlIGBsb2NhbHNgIGRpcmVjdGx5LlxuXHRcdGNvbnN0IGFkZFVzZUxvY2FsID0gXyA9PiB7XG5cdFx0XHRjb25zdCBwcmV2ID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRjb250ZXh0LmNoZWNrKHByZXYgPT09IHVuZGVmaW5lZCwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGAke2NvZGUoXy5uYW1lKX0gYWxyZWFkeSBpbXBvcnRlZCBhdCAke3ByZXYubG9jfWApXG5cdFx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoXylcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fVxuXHRcdHRoaXMudXNlZC5mb3JFYWNoKGFkZFVzZUxvY2FsKVxuXHRcdG9wRWFjaCh0aGlzLm9wVXNlRGVmYXVsdCwgYWRkVXNlTG9jYWwpXG5cdH0sXG5cblx0WWllbGQoKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWQudmVyaWZ5KClcblx0fSxcblxuXHRZaWVsZFRvKCkge1xuXHRcdGNvbnRleHQuY2hlY2soaXNJbkdlbmVyYXRvciwgdGhpcy5sb2MsICdDYW5ub3QgeWllbGQgb3V0c2lkZSBvZiBnZW5lcmF0b3IgY29udGV4dCcpXG5cdFx0dGhpcy55aWVsZGVkVG8udmVyaWZ5KClcblx0fVxufSlcblxuZnVuY3Rpb24gaWZPclVubGVzc0RvKCkge1xuXHR0aGlzLnRlc3QudmVyaWZ5KClcblx0dGhpcy5yZXN1bHQudmVyaWZ5KClcbn1cblxuZnVuY3Rpb24gdmVyaWZ5QmxvY2tCYWdPck1hcCgpIHtcblx0dmVyaWZ5QW5kUGx1c0xvY2FsKHRoaXMuYnVpbHQsICgpID0+IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpKVxufVxuXG5jb25zdCB2ZXJpZnlDYXNlID0gXyA9PiB7XG5cdGNvbnN0IGRvSXQgPSAoKSA9PiB7XG5cdFx0Xy5wYXJ0cy5mb3JFYWNoKHZlcmlmeSlcblx0XHRvcEVhY2goXy5vcEVsc2UsIHZlcmlmeSlcblx0fVxuXHRpZkVsc2UoXy5vcENhc2VkLFxuXHRcdF8gPT4ge1xuXHRcdFx0Xy52ZXJpZnkoKVxuXHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FsKF8uYXNzaWduZWUsIGRvSXQpXG5cdFx0fSxcblx0XHRkb0l0KVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlDYXNlUGFydCgpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHR0aGlzLnRlc3QudHlwZS52ZXJpZnkoKVxuXHRcdHRoaXMudGVzdC5wYXR0ZXJuZWQudmVyaWZ5KClcblx0XHR2ZXJpZnlBbmRQbHVzTG9jYWxzKHRoaXMudGVzdC5sb2NhbHMsICgpID0+IHRoaXMucmVzdWx0LnZlcmlmeSgpKVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHRoaXMucmVzdWx0LnZlcmlmeSgpXG5cdH1cbn1cblxuY29uc3Rcblx0Z2V0TG9jYWxEZWNsYXJlID0gKG5hbWUsIGFjY2Vzc0xvYykgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlICE9PSB1bmRlZmluZWQsIGFjY2Vzc0xvYywgKCkgPT5cblx0XHRcdGBObyBzdWNoIGxvY2FsICR7Y29kZShuYW1lKX0uXFxuTG9jYWxzIGFyZTpcXG4ke2NvZGUobWFwS2V5cyhsb2NhbHMpLmpvaW4oJyAnKSl9LmApXG5cdFx0cmV0dXJuIGRlY2xhcmVcblx0fSxcblxuXHRsaW5lTmV3TG9jYWxzID0gbGluZSA9PlxuXHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gP1xuXHRcdFx0WyBsaW5lLmFzc2lnbmVlIF0gOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlID9cblx0XHRcdGxpbmUuYXNzaWduZWVzIDpcblx0XHRcdFsgXSxcblxuXHR2ZXJpZnlMaW5lcyA9IGxpbmVzID0+IHtcblx0XHQvKlxuXHRcdFdlIG5lZWQgdG8gYmV0IGFsbCBibG9jayBsb2NhbHMgdXAtZnJvbnQgYmVjYXVzZVxuXHRcdEZ1bmN0aW9ucyB3aXRoaW4gbGluZXMgY2FuIGFjY2VzcyBsb2NhbHMgZnJvbSBsYXRlciBsaW5lcy5cblx0XHROT1RFOiBXZSBwdXNoIHRoZXNlIG9udG8gcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHJldmVyc2Vcblx0XHRzbyB0aGF0IHdoZW4gd2UgaXRlcmF0ZSB0aHJvdWdoIGxpbmVzIGZvcndhcmRzLCB3ZSBjYW4gcG9wIGZyb20gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0dG8gcmVtb3ZlIHBlbmRpbmcgbG9jYWxzIGFzIHRoZXkgYmVjb21lIHJlYWwgbG9jYWxzLlxuXHRcdEl0IGRvZXNuJ3QgcmVhbGx5IG1hdHRlciB3aGF0IG9yZGVyIHdlIGFkZCBsb2NhbHMgaW4gc2luY2UgaXQncyBub3QgYWxsb3dlZFxuXHRcdHRvIGhhdmUgdHdvIGxvY2FscyBvZiB0aGUgc2FtZSBuYW1lIGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdCovXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gWyBdXG5cblx0XHRjb25zdCBnZXRMaW5lTG9jYWxzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBlYWNoUmV2ZXJzZShsaW5lLmxpbmVzLCBnZXRMaW5lTG9jYWxzKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZWFjaFJldmVyc2UobGluZU5ld0xvY2FscyhsaW5lKSwgXyA9PiB7XG5cdFx0XHRcdFx0Ly8gUmVnaXN0ZXIgdGhlIGxvY2FsIG5vdy4gQ2FuJ3Qgd2FpdCB1bnRpbCB0aGUgYXNzaWduIGlzIHZlcmlmaWVkLlxuXHRcdFx0XHRcdHJlZ2lzdGVyTG9jYWwoXylcblx0XHRcdFx0XHRuZXdMb2NhbHMucHVzaChfKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRlYWNoUmV2ZXJzZShsaW5lcywgZ2V0TGluZUxvY2Fscylcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMucHVzaCguLi5uZXdMb2NhbHMpXG5cblx0XHQvKlxuXHRcdEtlZXBzIHRyYWNrIG9mIGxvY2FscyB3aGljaCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCBpbiB0aGlzIGJsb2NrLlxuXHRcdE1hc29uIGFsbG93cyBzaGFkb3dpbmcsIGJ1dCBub3Qgd2l0aGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdFNvLCB0aGlzIGlzIGFsbG93ZWQ6XG5cdFx0XHRhID0gMVxuXHRcdFx0YiA9XG5cdFx0XHRcdGEgPSAyXG5cdFx0XHRcdC4uLlxuXHRcdEJ1dCBub3Q6XG5cdFx0XHRhID0gMVxuXHRcdFx0YSA9IDJcblx0XHQqL1xuXHRcdGNvbnN0IHRoaXNCbG9ja0xvY2FsTmFtZXMgPSBuZXcgU2V0KClcblxuXHRcdC8vIEFsbCBzaGFkb3dlZCBsb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBbIF1cblxuXHRcdGNvbnN0IHZlcmlmeUxpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdC8vIFRPRE86IERvIGFueXRoaW5nIGluIHRoaXMgc2l0dWF0aW9uP1xuXHRcdFx0XHQvLyBjb250ZXh0LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ1JlZHVuZGFudCBgZGVidWdgLicpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKCgpID0+IGxpbmUubGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2ZXJpZnlJc1N0YXRlbWVudChsaW5lKVxuXHRcdFx0XHRsaW5lTmV3TG9jYWxzKGxpbmUpLmZvckVhY2gobmV3TG9jYWwgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBuZXdMb2NhbC5uYW1lXG5cdFx0XHRcdFx0Y29uc3Qgb2xkTG9jYWwgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0XHRcdFx0aWYgKG9sZExvY2FsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIXRoaXNCbG9ja0xvY2FsTmFtZXMuaGFzKG5hbWUpLCBuZXdMb2NhbC5sb2MsXG5cdFx0XHRcdFx0XHRcdCgpID0+IGBBIGxvY2FsICR7Y29kZShuYW1lKX0gaXMgYWxyZWFkeSBpbiB0aGlzIGJsb2NrLmApXG5cdFx0XHRcdFx0XHRzaGFkb3dlZC5wdXNoKG9sZExvY2FsKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzQmxvY2tMb2NhbE5hbWVzLmFkZChuYW1lKVxuXHRcdFx0XHRcdHNldExvY2FsKG5ld0xvY2FsKVxuXG5cdFx0XHRcdFx0Ly8gTm93IHRoYXQgaXQncyBhZGRlZCBhcyBhIGxvY2FsLCBpdCdzIG5vIGxvbmdlciBwZW5kaW5nLlxuXHRcdFx0XHRcdC8vIFdlIGFkZGVkIHBlbmRpbmdCbG9ja0xvY2FscyBpbiB0aGUgcmlnaHQgb3JkZXIgdGhhdCB3ZSBjYW4ganVzdCBwb3AgdGhlbSBvZmYuXG5cdFx0XHRcdFx0Y29uc3QgcG9wcGVkID0gcGVuZGluZ0Jsb2NrTG9jYWxzLnBvcCgpXG5cdFx0XHRcdFx0YXNzZXJ0KHBvcHBlZCA9PT0gbmV3TG9jYWwpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGxpbmUudmVyaWZ5KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsaW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpXG5cblx0XHRuZXdMb2NhbHMuZm9yRWFjaChkZWxldGVMb2NhbClcblx0XHRzaGFkb3dlZC5mb3JFYWNoKF8gPT4gc2V0TG9jYWwoXykpXG5cblx0XHRyZXR1cm4gbmV3TG9jYWxzXG5cdH0sXG5cblx0dmVyaWZ5SXNTdGF0ZW1lbnQgPSBsaW5lID0+IHtcblx0XHRjb25zdCBpc1N0YXRlbWVudCA9XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgRG8gfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBDYWxsIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGQgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZFRvIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFNwZWNpYWxEb1xuXHRcdGNvbnRleHQuY2hlY2soaXNTdGF0ZW1lbnQsIGxpbmUubG9jLCAnRXhwcmVzc2lvbiBpbiBzdGF0ZW1lbnQgcG9zaXRpb24uJylcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=