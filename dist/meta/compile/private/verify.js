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
		addLocalAccess(info, access, info.isInDebug);
	},
	      addLocalAccess = function (localInfo, access, isDebugAccess) {
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
	},
	      setEntryIndex = function (listMapEntry, index) {
		return results.entryToIndex.set(listMapEntry, index);
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
	      plusLocalsCheckingForDuplicates = function (addedLocals, action) {
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

			var _verifyLines = verifyLines(this.lines);

			const newLocals = _verifyLines.newLocals;

			plusLocals(newLocals, function () {
				return _this3.returned.verify();
			});
		},

		BlockObj: function () {
			var _this4 = this;

			var _verifyLines2 = verifyLines(this.lines);

			const newLocals = _verifyLines2.newLocals;

			this.keys.forEach(function (_) {
				return accessLocalForReturn(_, _this4);
			});
			(0, _util.opEach)(this.opObjed, function (_) {
				return plusLocals(newLocals, function () {
					return _.verify();
				});
			});
		},

		BlockBag: blockBagOrMap,
		BlockMap: blockBagOrMap,

		BlockWrap: function () {
			var _this5 = this;

			// IIFE breaks loop. TODO: Find a way around it.
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

		CaseDo: verifyCase,
		CaseDoPart: verifyCasePart,
		CaseVal: verifyCase,
		CaseValPart: verifyCasePart,

		// Only reach here for in/out condition
		Debug: function () {
			verifyLines([this]);
		},

		ForDoPlain: function () {
			var _this6 = this;

			withInLoop(true, function () {
				return _this6.block.verify();
			});
		},

		ForDoWithBag: function () {
			var _this7 = this;

			this.bag.verify();
			verifyLocalDeclare(this.element);
			plusLocal(this.element, function () {
				return withInLoop(true, function () {
					return _this7.block.verify();
				});
			});
		},

		Fun: function () {
			var _this8 = this;

			withBlockLocals(function () {
				context.check(_this8.opResDeclare === null || _this8.block instanceof _MsAst.BlockVal, _this8.loc, 'Function with return condition must return something.');
				const allArgs = (0, _util.cat)(_this8.args, _this8.opRestArg);
				allArgs.forEach(verifyLocalDeclare);

				withInGenerator(_this8.isGenerator, function () {
					return withInLoop(false, function () {
						return plusLocalsCheckingForDuplicates(allArgs, function () {
							(0, _util.opEach)(_this8.opIn, verify);
							_this8.block.verify();
							(0, _util.opEach)(_this8.opResDeclare, verifyLocalDeclare);
							const verifyOut = function () {
								return (0, _util.opEach)(_this8.opOut, function (_) {
									return _.verify();
								});
							};
							(0, _util.ifElse)(_this8.opResDeclare, function (_) {
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
			var _this9 = this;

			withBlockLocals(function () {
				return _this9.value.verify();
			});
		},

		LocalAccess: function () {
			const declare = getLocalDeclare(this.name, this.loc);
			results.accessToLocal.set(this, declare);
			addLocalAccess(results.localDeclareToInfo.get(declare), this, isInDebug);
		},

		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare: function () {
			(0, _util.opEach)(this.opType, verify);
		},

		NumberLiteral: function () {},

		MapEntry: function () {
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

			var _verifyLines3 = verifyLines(this.lines);

			const newLocals = _verifyLines3.newLocals;

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

	function blockBagOrMap() {
		var _verifyLines4 = verifyLines(this.lines);

		const listMapLength = _verifyLines4.listMapLength;

		results.blockToLength.set(this, listMapLength);
	}

	function ifOrUnlessDo() {
		this.test.verify();
		this.result.verify();
	}

	function verifyCase() {
		var _this11 = this;

		const reallyDoIt = function () {
			_this11.parts.forEach(verify);
			(0, _util.opEach)(_this11.opElse, verify);
		};
		const doIt = function () {
			if (_this11 instanceof _MsAst.CaseDo) reallyDoIt();else
				// IIFE breaks loop. TODO: Find a way around it.
				withInLoop(false, reallyDoIt);
		};
		(0, _util.ifElse)(this.opCased, function (_) {
			_.verify();
			verifyLocalDeclare(_.assignee);
			plusLocal(_.assignee, doIt);
		}, doIt);
	}

	function verifyCasePart() {
		var _this12 = this;

		if (this.test instanceof _MsAst.Pattern) {
			this.test.type.verify();
			this.test.patterned.verify();
			this.test.locals.forEach(verifyLocalDeclare);
			plusLocalsCheckingForDuplicates(this.test.locals, function () {
				return _this12.result.verify();
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

		let listMapLength = 0;

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
				if (line instanceof _MsAst.BagEntry || line instanceof _MsAst.MapEntry) {
					setEntryIndex(line, listMapLength);
					listMapLength = listMapLength + 1;
				}
				line.verify();
			}
		};

		lines.forEach(verifyLine);

		newLocals.forEach(deleteLocal);
		shadowed.forEach(function (_) {
			return setLocal(_);
		});

		return { newLocals: newLocals, listMapLength: listMapLength };
	},
	      verifyIsStatement = function (line) {
		const isStatement = line instanceof _MsAst.Do || line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo || line instanceof _MsAst.BagEntry || line instanceof _MsAst.MapEntry || line instanceof _MsAst.SpecialDo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxVQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFBO0FBQzVDLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsa0JBQWtCLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUMzRCxTQUFPLEdBQUcsQ0FBQTtFQUNWOzs7QUFHRCxLQUNDLE9BQU87O0FBRVAsT0FBTTs7Ozs7Ozs7Ozs7Ozs7O0FBZU4sbUJBQWtCLEVBQ2xCLFNBQVM7O0FBRVQsY0FBYTs7QUFFYixTQUFRLEVBQ1IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLFVBQUEsS0FBSztTQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFBQTtPQUVoQyxXQUFXLEdBQUcsVUFBQSxZQUFZO1NBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztFQUFBO09BRWpDLFFBQVEsR0FBRyxVQUFBLFlBQVk7U0FDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUFBOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtB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LElBQUksbUJBdmZnRSxRQUFRLEFBdWZwRCxJQUN4QixJQUFJLG1CQXZmVyxRQUFRLEFBdWZDLElBQ3hCLElBQUksbUJBeGY4QixTQUFTLEFBd2ZsQixDQUFBO0FBQzFCLFNBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtFQUN6RSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tWYWwsIENhbGwsIENhc2VEbywgRGVidWcsIERvLCBCYWdFbnRyeSxcblx0TG9jYWxEZWNsYXJlUmVzLCBNYXBFbnRyeSwgUGF0dGVybiwgU3BlY2lhbERvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGVhY2hSZXZlcnNlLCBoZWFkLCBpZkVsc2UsIGltcGxlbWVudE1hbnksXG5cdGlzRW1wdHksIG1hcEtleXMsIG5ld1NldCwgb3BFYWNoIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMsIHsgTG9jYWxJbmZvIH0gZnJvbSAnLi9WZXJpZnlSZXN1bHRzJ1xuXG4vKlxuVGhlIHZlcmlmaWVyIGdlbmVyYXRlcyBpbmZvcm1hdGlvbiBuZWVkZWQgZHVyaW5nIHRyYW5zcGlsaW5nLCB0aGUgVmVyaWZ5UmVzdWx0cy5cbiovXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIG1zQXN0KSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRsb2NhbHMgPSBuZXcgTWFwKClcblx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gWyBdXG5cdGlzSW5EZWJ1ZyA9IGlzSW5HZW5lcmF0b3IgPSBpc0luTG9vcCA9IGZhbHNlXG5cdHJlc3VsdHMgPSBuZXcgVmVyaWZ5UmVzdWx0cygpXG5cblx0bXNBc3QudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxVc2UoKVxuXG5cdGNvbnN0IHJlcyA9IHJlc3VsdHNcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHRjb250ZXh0ID0gbG9jYWxzID0gcGVuZGluZ0Jsb2NrTG9jYWxzID0gcmVzdWx0cyA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbi8vIFVzZSBhIHRyaWNrIGxpa2UgaW4gcGFyc2UuanMgYW5kIGhhdmUgZXZlcnl0aGluZyBjbG9zZSBvdmVyIHRoZXNlIG11dGFibGUgdmFyaWFibGVzLlxubGV0XG5cdGNvbnRleHQsXG5cdC8vIE1hcCBmcm9tIG5hbWVzIHRvIExvY2FsRGVjbGFyZXMuXG5cdGxvY2Fscyxcblx0Lypcblx0TG9jYWxzIGZvciB0aGlzIGJsb2NrLlxuXHRUaGVzZSBhcmUgYWRkZWQgdG8gbG9jYWxzIHdoZW4gZW50ZXJpbmcgYSBGdW5jdGlvbiBvciBsYXp5IGV2YWx1YXRpb24uXG5cdEluOlxuXHRcdGEgPSB8XG5cdFx0XHRiXG5cdFx0YiA9IDFcblx0YGJgIHdpbGwgYmUgYSBwZW5kaW5nIGxvY2FsLlxuXHRIb3dldmVyOlxuXHRcdGEgPSBiXG5cdFx0YiA9IDFcblx0d2lsbCBmYWlsIHRvIHZlcmlmeSwgYmVjYXVzZSBgYmAgY29tZXMgYWZ0ZXIgYGFgIGFuZCBpcyBub3QgYWNjZXNzZWQgaW5zaWRlIGEgZnVuY3Rpb24uXG5cdEl0IHdvdWxkIHdvcmsgZm9yIGB+YSBpcyBiYCwgdGhvdWdoLlxuXHQqL1xuXHRwZW5kaW5nQmxvY2tMb2NhbHMsXG5cdGlzSW5EZWJ1Zyxcblx0Ly8gV2hldGhlciB3ZSBhcmUgY3VycmVudGx5IGFibGUgdG8geWllbGQuXG5cdGlzSW5HZW5lcmF0b3IsXG5cdC8vIFdoZXRoZXIgd2UgYXJlIGN1cnJlbnRseSBhYmxlIHRvIGJyZWFrLlxuXHRpc0luTG9vcCxcblx0cmVzdWx0c1xuXG5jb25zdFxuXHR2ZXJpZnkgPSBtc0FzdCA9PiBtc0FzdC52ZXJpZnkoKSxcblxuXHRkZWxldGVMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5kZWxldGUobG9jYWxEZWNsYXJlLm5hbWUpLFxuXG5cdHNldExvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxzLnNldChsb2NhbERlY2xhcmUubmFtZSwgbG9jYWxEZWNsYXJlKSxcblxuXHQvLyBXaGVuIGEgbG9jYWwgaXMgcmV0dXJuZWQgZnJvbSBhIEJsb2NrT2JqIG9yIE1vZHVsZSxcblx0Ly8gdGhlIHJldHVybiAnYWNjZXNzJyBpcyBjb25zaWRlcmVkIHRvIGJlICdkZWJ1ZycgaWYgdGhlIGxvY2FsIGlzLlxuXHRhY2Nlc3NMb2NhbEZvclJldHVybiA9IChkZWNsYXJlLCBhY2Nlc3MpID0+IHtcblx0XHRjb25zdCBpbmZvID0gcmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGRlY2xhcmUpXG5cdFx0YWRkTG9jYWxBY2Nlc3MoaW5mbywgYWNjZXNzLCBpbmZvLmlzSW5EZWJ1Zylcblx0fSxcblxuXHRhZGRMb2NhbEFjY2VzcyA9IChsb2NhbEluZm8sIGFjY2VzcywgaXNEZWJ1Z0FjY2VzcykgPT5cblx0XHQoaXNEZWJ1Z0FjY2VzcyA/IGxvY2FsSW5mby5kZWJ1Z0FjY2Vzc2VzIDogbG9jYWxJbmZvLm5vbkRlYnVnQWNjZXNzZXMpLnB1c2goYWNjZXNzKSxcblxuXHQvLyBGb3IgZXhwcmVzc2lvbnMgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHRoZXkgd2lsbCBiZSByZWdpc3RlcmVkIGJlZm9yZSBiZWluZyB2ZXJpZmllZC5cblx0Ly8gU28sIExvY2FsRGVjbGFyZS52ZXJpZnkganVzdCB0aGUgdHlwZS5cblx0Ly8gRm9yIGxvY2FscyBub3QgYWZmZWN0aW5nIGxpbmVOZXdMb2NhbHMsIHVzZSB0aGlzIGluc3RlYWQgb2YganVzdCBkZWNsYXJlLnZlcmlmeSgpXG5cdHZlcmlmeUxvY2FsRGVjbGFyZSA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0cmVnaXN0ZXJMb2NhbChsb2NhbERlY2xhcmUpXG5cdFx0bG9jYWxEZWNsYXJlLnZlcmlmeSgpXG5cdH0sXG5cblx0cmVnaXN0ZXJMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLnNldChsb2NhbERlY2xhcmUsIExvY2FsSW5mby5lbXB0eShpc0luRGVidWcpKSxcblxuXHRzZXRFbnRyeUluZGV4ID0gKGxpc3RNYXBFbnRyeSwgaW5kZXgpID0+XG5cdFx0cmVzdWx0cy5lbnRyeVRvSW5kZXguc2V0KGxpc3RNYXBFbnRyeSwgaW5kZXgpXG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyBjaGFuZ2UgdmVyaWZpZXIgc3RhdGUgYW5kIGVmZmljaWVudGx5IHJldHVybiB0byB0aGUgb2xkIHN0YXRlIHdoZW4gZmluaXNoZWQuXG5jb25zdFxuXHR3aXRoSW5EZWJ1ZyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkRlYnVnID0gaXNJbkRlYnVnXG5cdFx0aXNJbkRlYnVnID0gdHJ1ZVxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkRlYnVnID0gb2xkSXNJbkRlYnVnXG5cdH0sXG5cblx0d2l0aEluR2VuZXJhdG9yID0gKG5ld0lzSW5HZW5lcmF0b3IsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZElzSW5HZW5lcmF0b3IgPSBpc0luR2VuZXJhdG9yXG5cdFx0aXNJbkdlbmVyYXRvciA9IG5ld0lzSW5HZW5lcmF0b3Jcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5HZW5lcmF0b3IgPSBvbGRJc0luR2VuZXJhdG9yXG5cdH0sXG5cblx0d2l0aEluTG9vcCA9IChuZXdJc0luTG9vcCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkxvb3AgPSBpc0luTG9vcFxuXHRcdGlzSW5Mb29wID0gbmV3SXNJbkxvb3Bcblx0XHRhY3Rpb24oKVxuXHRcdGlzSW5Mb29wID0gb2xkSXNJbkxvb3Bcblx0fSxcblxuXHRwbHVzTG9jYWwgPSAoYWRkZWRMb2NhbCwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KGFkZGVkTG9jYWwubmFtZSlcblx0XHRsb2NhbHMuc2V0KGFkZGVkTG9jYWwubmFtZSwgYWRkZWRMb2NhbClcblx0XHRhY3Rpb24oKVxuXHRcdGlmIChzaGFkb3dlZCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0ZGVsZXRlTG9jYWwoYWRkZWRMb2NhbClcblx0XHRlbHNlXG5cdFx0XHRzZXRMb2NhbChzaGFkb3dlZClcblx0fSxcblxuXHQvLyBTaG91bGQgaGF2ZSB2ZXJpZmllZCB0aGF0IGFkZGVkTG9jYWxzIGFsbCBoYXZlIGRpZmZlcmVudCBuYW1lcy5cblx0cGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgc2hhZG93ZWRMb2NhbHMgPSBbIF1cblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0Y29uc3Qgc2hhZG93ZWQgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGlmIChzaGFkb3dlZCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRzaGFkb3dlZExvY2Fscy5wdXNoKHNoYWRvd2VkKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9KVxuXG5cdFx0YWN0aW9uKClcblxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWRMb2NhbHMuZm9yRWFjaChzZXRMb2NhbClcblx0fSxcblxuXHRwbHVzTG9jYWxzQ2hlY2tpbmdGb3JEdXBsaWNhdGVzID0gKGFkZGVkTG9jYWxzLCBhY3Rpb24pID0+IHtcblx0XHRjb25zdCBuYW1lcyA9IG5ldyBTZXQoKVxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFuYW1lcy5oYXMoXy5uYW1lKSwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGBEdXBsaWNhdGUgbG9jYWwgJHtjb2RlKF8ubmFtZSl9YClcblx0XHRcdG5hbWVzLmFkZChfLm5hbWUpXG5cdFx0fSlcblx0XHRwbHVzTG9jYWxzKGFkZGVkTG9jYWxzLCBhY3Rpb24pXG5cdH0sXG5cblx0d2l0aEJsb2NrTG9jYWxzID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRQZW5kaW5nQmxvY2tMb2NhbHMgPSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbIF1cblx0XHRwbHVzTG9jYWxzKG9sZFBlbmRpbmdCbG9ja0xvY2FscywgYWN0aW9uKVxuXHRcdHBlbmRpbmdCbG9ja0xvY2FscyA9IG9sZFBlbmRpbmdCbG9ja0xvY2Fsc1xuXHR9XG5cbmNvbnN0IHZlcmlmeUxvY2FsVXNlID0gKCkgPT5cblx0cmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZm9yRWFjaCgoaW5mbywgbG9jYWwpID0+IHtcblx0XHRpZiAoIShsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZVJlcykpIHtcblx0XHRcdGNvbnN0IG5vTm9uRGVidWcgPSBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3Nlcylcblx0XHRcdGlmIChub05vbkRlYnVnICYmIGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSlcblx0XHRcdFx0Y29udGV4dC53YXJuKGxvY2FsLmxvYywgKCkgPT4gYFVudXNlZCBsb2NhbCB2YXJpYWJsZSAke2NvZGUobG9jYWwubmFtZSl9LmApXG5cdFx0XHRlbHNlIGlmIChpbmZvLmlzSW5EZWJ1Zylcblx0XHRcdFx0Y29udGV4dC53YXJuSWYoIW5vTm9uRGVidWcsICgpID0+IGhlYWQoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5sb2MsICgpID0+XG5cdFx0XHRcdFx0YERlYnVnLW9ubHkgbG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG91dHNpZGUgb2YgZGVidWcuYClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29udGV4dC53YXJuSWYobm9Ob25EZWJ1ZywgbG9jYWwubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBMb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb25seSBpbiBkZWJ1Zy5gKVxuXHRcdH1cblx0fSlcblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndmVyaWZ5Jywge1xuXHRBc3NpZ24oKSB7XG5cdFx0Y29uc3QgZG9WID0gKCkgPT4ge1xuXHRcdFx0Ly8gQXNzaWduZWUgcmVnaXN0ZXJlZCBieSB2ZXJpZnlMaW5lcy5cblx0XHRcdHRoaXMuYXNzaWduZWUudmVyaWZ5KClcblx0XHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0XHR9XG5cdFx0aWYgKHRoaXMuYXNzaWduZWUuaXNMYXp5KCkpXG5cdFx0XHR3aXRoQmxvY2tMb2NhbHMoZG9WKVxuXHRcdGVsc2Vcblx0XHRcdGRvVigpXG5cdH0sXG5cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHRcdC8vIEFzc2lnbmVlcyByZWdpc3RlcmVkIGJ5IHZlcmlmeUxpbmVzLlxuXHRcdHRoaXMuYXNzaWduZWVzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdEFzc2lnbk11dGF0ZSgpIHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKHRoaXMubmFtZSwgdGhpcy5sb2MpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlLmlzTXV0YWJsZSgpLCB0aGlzLmxvYywgKCkgPT4gYCR7Y29kZSh0aGlzLm5hbWUpfSBpcyBub3QgbXV0YWJsZS5gKVxuXHRcdC8vIFRPRE86IFRyYWNrIGFzc2lnbm1lbnRzLiBNdXRhYmxlIGxvY2FsIG11c3QgYmUgbXV0YXRlZCBzb21ld2hlcmUuXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdEJhZ0VudHJ5KCkgeyB0aGlzLnZhbHVlLnZlcmlmeSgpIH0sXG5cblx0QmFnU2ltcGxlKCkgeyB0aGlzLnBhcnRzLmZvckVhY2godmVyaWZ5KSB9LFxuXG5cdEJsb2NrRG8oKSB7IHZlcmlmeUxpbmVzKHRoaXMubGluZXMpIH0sXG5cblx0QmxvY2tXaXRoUmV0dXJuKCkge1xuXHRcdGNvbnN0IHsgbmV3TG9jYWxzIH0gPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiB0aGlzLnJldHVybmVkLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEJsb2NrT2JqKCkge1xuXHRcdGNvbnN0IHsgbmV3TG9jYWxzIH0gPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHRoaXMua2V5cy5mb3JFYWNoKF8gPT4gYWNjZXNzTG9jYWxGb3JSZXR1cm4oXywgdGhpcykpXG5cdFx0b3BFYWNoKHRoaXMub3BPYmplZCwgXyA9PiBwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gXy52ZXJpZnkoKSkpXG5cdH0sXG5cblx0QmxvY2tCYWc6IGJsb2NrQmFnT3JNYXAsXG5cdEJsb2NrTWFwOiBibG9ja0JhZ09yTWFwLFxuXG5cdEJsb2NrV3JhcCgpIHtcblx0XHQvLyBJSUZFIGJyZWFrcyBsb29wLiBUT0RPOiBGaW5kIGEgd2F5IGFyb3VuZCBpdC5cblx0XHR3aXRoSW5Mb29wKGZhbHNlLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEJyZWFrRG8oKSB7XG5cdFx0aWYgKCFpc0luTG9vcClcblx0XHRcdGNvbnRleHQuZmFpbCh0aGlzLmxvYywgJ05vdCBpbiBhIGxvb3AuJylcblx0fSxcblxuXHRDYWxsKCkge1xuXHRcdHRoaXMuY2FsbGVkLnZlcmlmeSgpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdENhc2VEbzogdmVyaWZ5Q2FzZSxcblx0Q2FzZURvUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cdENhc2VWYWw6IHZlcmlmeUNhc2UsXG5cdENhc2VWYWxQYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblxuXHQvLyBPbmx5IHJlYWNoIGhlcmUgZm9yIGluL291dCBjb25kaXRpb25cblx0RGVidWcoKSB7IHZlcmlmeUxpbmVzKFsgdGhpcyBdKSB9LFxuXG5cdEZvckRvUGxhaW4oKSB7XG5cdFx0d2l0aEluTG9vcCh0cnVlLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEZvckRvV2l0aEJhZygpIHtcblx0XHR0aGlzLmJhZy52ZXJpZnkoKVxuXHRcdHZlcmlmeUxvY2FsRGVjbGFyZSh0aGlzLmVsZW1lbnQpXG5cdFx0cGx1c0xvY2FsKHRoaXMuZWxlbWVudCwgKCkgPT4gd2l0aEluTG9vcCh0cnVlLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKSlcblx0fSxcblxuXHRGdW4oKSB7XG5cdFx0d2l0aEJsb2NrTG9jYWxzKCgpID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2sodGhpcy5vcFJlc0RlY2xhcmUgPT09IG51bGwgfHwgdGhpcy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrVmFsLCB0aGlzLmxvYyxcblx0XHRcdFx0J0Z1bmN0aW9uIHdpdGggcmV0dXJuIGNvbmRpdGlvbiBtdXN0IHJldHVybiBzb21ldGhpbmcuJylcblx0XHRcdGNvbnN0IGFsbEFyZ3MgPSBjYXQodGhpcy5hcmdzLCB0aGlzLm9wUmVzdEFyZylcblx0XHRcdGFsbEFyZ3MuZm9yRWFjaCh2ZXJpZnlMb2NhbERlY2xhcmUpXG5cblx0XHRcdHdpdGhJbkdlbmVyYXRvcih0aGlzLmlzR2VuZXJhdG9yLCAoKSA9PlxuXHRcdFx0XHR3aXRoSW5Mb29wKGZhbHNlLCAoKSA9PlxuXHRcdFx0XHRcdHBsdXNMb2NhbHNDaGVja2luZ0ZvckR1cGxpY2F0ZXMoYWxsQXJncywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BJbiwgdmVyaWZ5KVxuXHRcdFx0XHRcdFx0dGhpcy5ibG9jay52ZXJpZnkoKVxuXHRcdFx0XHRcdFx0b3BFYWNoKHRoaXMub3BSZXNEZWNsYXJlLCB2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0XHRcdFx0XHRjb25zdCB2ZXJpZnlPdXQgPSAoKSA9PiBvcEVhY2godGhpcy5vcE91dCwgXyA9PiBfLnZlcmlmeSgpKVxuXHRcdFx0XHRcdFx0aWZFbHNlKHRoaXMub3BSZXNEZWNsYXJlLCBfID0+IHBsdXNMb2NhbChfLCB2ZXJpZnlPdXQpLCB2ZXJpZnlPdXQpXG5cdFx0XHRcdFx0fSkpKVxuXHRcdH0pXG5cdH0sXG5cblx0R2xvYmFsQWNjZXNzKCkgeyB9LFxuXG5cdElmRG86IGlmT3JVbmxlc3NEbyxcblxuXHRMYXp5KCkgeyB3aXRoQmxvY2tMb2NhbHMoKCkgPT4gdGhpcy52YWx1ZS52ZXJpZnkoKSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHtcblx0XHRjb25zdCBkZWNsYXJlID0gZ2V0TG9jYWxEZWNsYXJlKHRoaXMubmFtZSwgdGhpcy5sb2MpXG5cdFx0cmVzdWx0cy5hY2Nlc3NUb0xvY2FsLnNldCh0aGlzLCBkZWNsYXJlKVxuXHRcdGFkZExvY2FsQWNjZXNzKHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChkZWNsYXJlKSwgdGhpcywgaXNJbkRlYnVnKVxuXHR9LFxuXG5cdC8vIEFkZGluZyBMb2NhbERlY2xhcmVzIHRvIHRoZSBhdmFpbGFibGUgbG9jYWxzIGlzIGRvbmUgYnkgRnVuIG9yIGxpbmVOZXdMb2NhbHMuXG5cdExvY2FsRGVjbGFyZSgpIHsgb3BFYWNoKHRoaXMub3BUeXBlLCB2ZXJpZnkpIH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHsgfSxcblxuXHRNYXBFbnRyeSgpIHtcblx0XHR0aGlzLmtleS52ZXJpZnkoKVxuXHRcdHRoaXMudmFsLnZlcmlmeSgpXG5cdH0sXG5cblx0TWVtYmVyKCkgeyB0aGlzLm9iamVjdC52ZXJpZnkoKSB9LFxuXG5cdE1vZHVsZSgpIHtcblx0XHQvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGlzLmRvVXNlcy5cblx0XHR0aGlzLnVzZXMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0d2l0aEluRGVidWcoKCkgPT4gdGhpcy5kZWJ1Z1VzZXMuZm9yRWFjaCh2ZXJpZnkpKVxuXHRcdGNvbnN0IHsgbmV3TG9jYWxzIH0gPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHRoaXMuZXhwb3J0cy5mb3JFYWNoKF8gPT4gYWNjZXNzTG9jYWxGb3JSZXR1cm4oXywgdGhpcykpXG5cdFx0b3BFYWNoKHRoaXMub3BEZWZhdWx0RXhwb3J0LCBfID0+IHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiBfLnZlcmlmeSgpKSlcblxuXHRcdGNvbnN0IGV4cG9ydHMgPSBuZXdTZXQodGhpcy5leHBvcnRzKVxuXHRcdGNvbnN0IG1hcmtFeHBvcnRMaW5lcyA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gJiYgZXhwb3J0cy5oYXMobGluZS5hc3NpZ25lZSkgfHxcblx0XHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlICYmIGxpbmUuYXNzaWduZWVzLnNvbWUoXyA9PiBleHBvcnRzLmhhcyhfKSkpXG5cdFx0XHRcdHJlc3VsdHMuZXhwb3J0QXNzaWducy5hZGQobGluZSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0XHR9XG5cdFx0dGhpcy5saW5lcy5mb3JFYWNoKG1hcmtFeHBvcnRMaW5lcylcblx0fSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0Y29uc3Qga2V5cyA9IG5ldyBTZXQoKVxuXHRcdHRoaXMucGFpcnMuZm9yRWFjaChwYWlyID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2soIWtleXMuaGFzKHBhaXIua2V5KSwgcGFpci5sb2MsICgpID0+IGBEdXBsaWNhdGUga2V5ICR7cGFpci5rZXl9YClcblx0XHRcdGtleXMuYWRkKHBhaXIua2V5KVxuXHRcdFx0cGFpci52YWx1ZS52ZXJpZnkoKVxuXHRcdH0pXG5cdH0sXG5cblx0UXVvdGUoKSB7XG5cdFx0dGhpcy5wYXJ0cy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBfICE9PSAnc3RyaW5nJylcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHRcdH0pXG5cdH0sXG5cblx0U3BlY2lhbERvKCkgeyB9LFxuXG5cdFNwZWNpYWxWYWwoKSB7IH0sXG5cblx0U3BsYXQoKSB7IHRoaXMuc3BsYXR0ZWQudmVyaWZ5KCkgfSxcblxuXHRVbmxlc3NEbzogaWZPclVubGVzc0RvLFxuXG5cdFVzZSgpIHtcblx0XHQvLyBTaW5jZSBVc2VzIGFyZSBhbHdheXMgaW4gdGhlIG91dGVybW9zdCBzY29wZSwgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCBzaGFkb3dpbmcuXG5cdFx0Ly8gU28gd2UgbXV0YXRlIGBsb2NhbHNgIGRpcmVjdGx5LlxuXHRcdGNvbnN0IGFkZFVzZUxvY2FsID0gXyA9PiB7XG5cdFx0XHRjb25zdCBwcmV2ID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRjb250ZXh0LmNoZWNrKHByZXYgPT09IHVuZGVmaW5lZCwgXy5sb2MsICgpID0+XG5cdFx0XHRcdGAke2NvZGUoXy5uYW1lKX0gYWxyZWFkeSBpbXBvcnRlZCBhdCAke3ByZXYubG9jfWApXG5cdFx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoXylcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fVxuXHRcdHRoaXMudXNlZC5mb3JFYWNoKGFkZFVzZUxvY2FsKVxuXHRcdG9wRWFjaCh0aGlzLm9wVXNlRGVmYXVsdCwgYWRkVXNlTG9jYWwpXG5cdH0sXG5cblx0WWllbGQoKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWQudmVyaWZ5KClcblx0fSxcblxuXHRZaWVsZFRvKCkge1xuXHRcdGNvbnRleHQuY2hlY2soaXNJbkdlbmVyYXRvciwgdGhpcy5sb2MsICdDYW5ub3QgeWllbGQgb3V0c2lkZSBvZiBnZW5lcmF0b3IgY29udGV4dCcpXG5cdFx0dGhpcy55aWVsZGVkVG8udmVyaWZ5KClcblx0fVxufSlcblxuZnVuY3Rpb24gYmxvY2tCYWdPck1hcCgpIHtcblx0Y29uc3QgeyBsaXN0TWFwTGVuZ3RoIH0gPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRyZXN1bHRzLmJsb2NrVG9MZW5ndGguc2V0KHRoaXMsIGxpc3RNYXBMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGlmT3JVbmxlc3NEbygpIHtcblx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdHRoaXMucmVzdWx0LnZlcmlmeSgpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhc2UoKSB7XG5cdGNvbnN0IHJlYWxseURvSXQgPSAoKSA9PiB7XG5cdFx0dGhpcy5wYXJ0cy5mb3JFYWNoKHZlcmlmeSlcblx0XHRvcEVhY2godGhpcy5vcEVsc2UsIHZlcmlmeSlcblx0fVxuXHRjb25zdCBkb0l0ID0gKCkgPT4ge1xuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgQ2FzZURvKVxuXHRcdFx0cmVhbGx5RG9JdCgpXG5cdFx0ZWxzZVxuXHRcdFx0Ly8gSUlGRSBicmVha3MgbG9vcC4gVE9ETzogRmluZCBhIHdheSBhcm91bmQgaXQuXG5cdFx0XHR3aXRoSW5Mb29wKGZhbHNlLCByZWFsbHlEb0l0KVxuXHR9XG5cdGlmRWxzZSh0aGlzLm9wQ2FzZWQsXG5cdFx0XyA9PiB7XG5cdFx0XHRfLnZlcmlmeSgpXG5cdFx0XHR2ZXJpZnlMb2NhbERlY2xhcmUoXy5hc3NpZ25lZSlcblx0XHRcdHBsdXNMb2NhbChfLmFzc2lnbmVlLCBkb0l0KVxuXHRcdH0sXG5cdFx0ZG9JdClcbn1cblxuZnVuY3Rpb24gdmVyaWZ5Q2FzZVBhcnQoKSB7XG5cdGlmICh0aGlzLnRlc3QgaW5zdGFuY2VvZiBQYXR0ZXJuKSB7XG5cdFx0dGhpcy50ZXN0LnR5cGUudmVyaWZ5KClcblx0XHR0aGlzLnRlc3QucGF0dGVybmVkLnZlcmlmeSgpXG5cdFx0dGhpcy50ZXN0LmxvY2Fscy5mb3JFYWNoKHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRwbHVzTG9jYWxzQ2hlY2tpbmdGb3JEdXBsaWNhdGVzKHRoaXMudGVzdC5sb2NhbHMsICgpID0+IHRoaXMucmVzdWx0LnZlcmlmeSgpKVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudGVzdC52ZXJpZnkoKVxuXHRcdHRoaXMucmVzdWx0LnZlcmlmeSgpXG5cdH1cbn1cblxuY29uc3Rcblx0Z2V0TG9jYWxEZWNsYXJlID0gKG5hbWUsIGFjY2Vzc0xvYykgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlICE9PSB1bmRlZmluZWQsIGFjY2Vzc0xvYywgKCkgPT5cblx0XHRcdGBObyBzdWNoIGxvY2FsICR7Y29kZShuYW1lKX0uXFxuTG9jYWxzIGFyZTpcXG4ke2NvZGUobWFwS2V5cyhsb2NhbHMpLmpvaW4oJyAnKSl9LmApXG5cdFx0cmV0dXJuIGRlY2xhcmVcblx0fSxcblxuXHRsaW5lTmV3TG9jYWxzID0gbGluZSA9PlxuXHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gP1xuXHRcdFx0WyBsaW5lLmFzc2lnbmVlIF0gOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlID9cblx0XHRcdGxpbmUuYXNzaWduZWVzIDpcblx0XHRcdFsgXSxcblxuXHR2ZXJpZnlMaW5lcyA9IGxpbmVzID0+IHtcblx0XHQvKlxuXHRcdFdlIG5lZWQgdG8gYmV0IGFsbCBibG9jayBsb2NhbHMgdXAtZnJvbnQgYmVjYXVzZVxuXHRcdEZ1bmN0aW9ucyB3aXRoaW4gbGluZXMgY2FuIGFjY2VzcyBsb2NhbHMgZnJvbSBsYXRlciBsaW5lcy5cblx0XHROT1RFOiBXZSBwdXNoIHRoZXNlIG9udG8gcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHJldmVyc2Vcblx0XHRzbyB0aGF0IHdoZW4gd2UgaXRlcmF0ZSB0aHJvdWdoIGxpbmVzIGZvcndhcmRzLCB3ZSBjYW4gcG9wIGZyb20gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0dG8gcmVtb3ZlIHBlbmRpbmcgbG9jYWxzIGFzIHRoZXkgYmVjb21lIHJlYWwgbG9jYWxzLlxuXHRcdEl0IGRvZXNuJ3QgcmVhbGx5IG1hdHRlciB3aGF0IG9yZGVyIHdlIGFkZCBsb2NhbHMgaW4gc2luY2UgaXQncyBub3QgYWxsb3dlZFxuXHRcdHRvIGhhdmUgdHdvIGxvY2FscyBvZiB0aGUgc2FtZSBuYW1lIGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdCovXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gWyBdXG5cblx0XHRjb25zdCBnZXRMaW5lTG9jYWxzID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBlYWNoUmV2ZXJzZShsaW5lLmxpbmVzLCBnZXRMaW5lTG9jYWxzKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZWFjaFJldmVyc2UobGluZU5ld0xvY2FscyhsaW5lKSwgXyA9PiB7XG5cdFx0XHRcdFx0Ly8gUmVnaXN0ZXIgdGhlIGxvY2FsIG5vdy4gQ2FuJ3Qgd2FpdCB1bnRpbCB0aGUgYXNzaWduIGlzIHZlcmlmaWVkLlxuXHRcdFx0XHRcdHJlZ2lzdGVyTG9jYWwoXylcblx0XHRcdFx0XHRuZXdMb2NhbHMucHVzaChfKVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0XHRlYWNoUmV2ZXJzZShsaW5lcywgZ2V0TGluZUxvY2Fscylcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMucHVzaCguLi5uZXdMb2NhbHMpXG5cblx0XHQvKlxuXHRcdEtlZXBzIHRyYWNrIG9mIGxvY2FscyB3aGljaCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCBpbiB0aGlzIGJsb2NrLlxuXHRcdE1hc29uIGFsbG93cyBzaGFkb3dpbmcsIGJ1dCBub3Qgd2l0aGluIHRoZSBzYW1lIGJsb2NrLlxuXHRcdFNvLCB0aGlzIGlzIGFsbG93ZWQ6XG5cdFx0XHRhID0gMVxuXHRcdFx0YiA9XG5cdFx0XHRcdGEgPSAyXG5cdFx0XHRcdC4uLlxuXHRcdEJ1dCBub3Q6XG5cdFx0XHRhID0gMVxuXHRcdFx0YSA9IDJcblx0XHQqL1xuXHRcdGNvbnN0IHRoaXNCbG9ja0xvY2FsTmFtZXMgPSBuZXcgU2V0KClcblxuXHRcdC8vIEFsbCBzaGFkb3dlZCBsb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBbIF1cblxuXHRcdGxldCBsaXN0TWFwTGVuZ3RoID0gMFxuXG5cdFx0Y29uc3QgdmVyaWZ5TGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0Ly8gVE9ETzogRG8gYW55dGhpbmcgaW4gdGhpcyBzaXR1YXRpb24/XG5cdFx0XHRcdC8vIGNvbnRleHQuY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnUmVkdW5kYW50IGBkZWJ1Z2AuJylcblx0XHRcdFx0d2l0aEluRGVidWcoKCkgPT4gbGluZS5saW5lcy5mb3JFYWNoKHZlcmlmeUxpbmUpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZlcmlmeUlzU3RhdGVtZW50KGxpbmUpXG5cdFx0XHRcdGxpbmVOZXdMb2NhbHMobGluZSkuZm9yRWFjaChuZXdMb2NhbCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IG5ld0xvY2FsLm5hbWVcblx0XHRcdFx0XHRjb25zdCBvbGRMb2NhbCA9IGxvY2Fscy5nZXQobmFtZSlcblx0XHRcdFx0XHRpZiAob2xkTG9jYWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayghdGhpc0Jsb2NrTG9jYWxOYW1lcy5oYXMobmFtZSksIG5ld0xvY2FsLmxvYyxcblx0XHRcdFx0XHRcdFx0KCkgPT4gYEEgbG9jYWwgJHtjb2RlKG5hbWUpfSBpcyBhbHJlYWR5IGluIHRoaXMgYmxvY2suYClcblx0XHRcdFx0XHRcdHNoYWRvd2VkLnB1c2gob2xkTG9jYWwpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXNCbG9ja0xvY2FsTmFtZXMuYWRkKG5hbWUpXG5cdFx0XHRcdFx0c2V0TG9jYWwobmV3TG9jYWwpXG5cblx0XHRcdFx0XHQvLyBOb3cgdGhhdCBpdCdzIGFkZGVkIGFzIGEgbG9jYWwsIGl0J3Mgbm8gbG9uZ2VyIHBlbmRpbmcuXG5cdFx0XHRcdFx0Ly8gV2UgYWRkZWQgcGVuZGluZ0Jsb2NrTG9jYWxzIGluIHRoZSByaWdodCBvcmRlciB0aGF0IHdlIGNhbiBqdXN0IHBvcCB0aGVtIG9mZi5cblx0XHRcdFx0XHRjb25zdCBwb3BwZWQgPSBwZW5kaW5nQmxvY2tMb2NhbHMucG9wKClcblx0XHRcdFx0XHRhc3NlcnQocG9wcGVkID09PSBuZXdMb2NhbClcblx0XHRcdFx0fSlcblx0XHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBCYWdFbnRyeSB8fCBsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0XHRzZXRFbnRyeUluZGV4KGxpbmUsIGxpc3RNYXBMZW5ndGgpXG5cdFx0XHRcdFx0bGlzdE1hcExlbmd0aCA9IGxpc3RNYXBMZW5ndGggKyAxXG5cdFx0XHRcdH1cblx0XHRcdFx0bGluZS52ZXJpZnkoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxpbmVzLmZvckVhY2godmVyaWZ5TGluZSlcblxuXHRcdG5ld0xvY2Fscy5mb3JFYWNoKGRlbGV0ZUxvY2FsKVxuXHRcdHNoYWRvd2VkLmZvckVhY2goXyA9PiBzZXRMb2NhbChfKSlcblxuXHRcdHJldHVybiB7IG5ld0xvY2FscywgbGlzdE1hcExlbmd0aCB9XG5cdH0sXG5cblx0dmVyaWZ5SXNTdGF0ZW1lbnQgPSBsaW5lID0+IHtcblx0XHRjb25zdCBpc1N0YXRlbWVudCA9XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgRG8gfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBDYWxsIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgWWllbGQgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZFRvIHx8XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFNwZWNpYWxEb1xuXHRcdGNvbnRleHQuY2hlY2soaXNTdGF0ZW1lbnQsIGxpbmUubG9jLCAnRXhwcmVzc2lvbiBpbiBzdGF0ZW1lbnQgcG9zaXRpb24uJylcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=