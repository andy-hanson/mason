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

		BlockValOhNo: function () {
			var _this2 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this2.ohNo.verify();
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

		ConditionalDo: function () {
			this.test.verify();
			this.result.verify();
		},
		ConditionalVal: function () {
			var _this7 = this;

			this.test.verify();
			withIIFE(function () {
				return _this7.result.verify();
			});
		},

		Continue: function () {
			verifyInLoop(this);
		},

		// Only reach here for in/out condition.
		Debug: function () {
			verifyLines([this]);
		},

		ForBag: function () {
			var _this8 = this;

			verifyAndPlusLocal(this.built, function () {
				return verifyFor(_this8);
			});
		},

		ForDo: function () {
			verifyFor(this);
		},

		ForVal: function () {
			verifyFor(this);
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

		LocalMutate: function () {
			var _this11 = this;

			const declare = getLocalDeclare(this.name, this.loc);
			context.check(declare.isMutable(), this.loc, function () {
				return (0, _CompileError.code)(_this11.name) + ' is not mutable.';
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
			var _this12 = this;

			// No need to verify this.doUses.
			this.uses.forEach(verify);
			withInDebug(function () {
				return _this12.debugUses.forEach(verify);
			});
			const newLocals = verifyLines(this.lines);
			this.exports.forEach(function (_) {
				return accessLocalForReturn(_, _this12);
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
			var _this13 = this;

			accessLocal(this, 'built');
			this.assign.verify();
			this.assign.allAssignees().forEach(function (_) {
				return accessLocal(_this13, _.name);
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

		OhNo: function () {
			(0, _util.opEach)(this.opThrown, verify);
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
		const isStatement = line instanceof _MsAst.Do ||
		// Some values are also acceptable.
		line instanceof _MsAst.Call || line instanceof _MsAst.Yield || line instanceof _MsAst.YieldTo;
		context.check(isStatement, line.loc, 'Expression in statement position.');
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFXZSxVQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUs7QUFDbkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFHLENBQUE7QUFDeEIsV0FBUyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDakMsUUFBTSxHQUFHLElBQUksQ0FBQTtBQUNiLFNBQU8sR0FBRyw2QkFBbUIsQ0FBQTs7QUFFN0IsT0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2QsZ0JBQWMsRUFBRSxDQUFBOztBQUVoQixRQUFNLEdBQUcsR0FBRyxPQUFPLENBQUE7O0FBRW5CLFNBQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDcEUsU0FBTyxHQUFHLENBQUE7RUFDVjs7O0FBR0QsS0FDQyxPQUFPOztBQUVQLE9BQU0sRUFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7QUFlTixtQkFBa0IsRUFDbEIsU0FBUzs7QUFFVCxjQUFhLEVBQ2IsT0FBTyxDQUFBOztBQUVSLE9BQ0MsTUFBTSxHQUFHLFVBQUEsS0FBSztTQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFBQTtPQUVoQyxXQUFXLEdBQUcsVUFBQSxZQUFZO1NBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztFQUFBO09BRWpDLFFBQVEsR0FBRyxVQUFBLFlBQVk7U0FDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztFQUFBOzs7OztBQUk1QyxxQkFBb0IsR0FBRyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDM0MsUUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwRCxpQkFBZSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0VBQzdDO09BRUQsV0FBVyxHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUksRUFBSztBQUMvQixRQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqRCxTQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNqRCxpQkFBZSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0VBQzNFO09BRUQsZUFBZSxHQUFHLFVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhO1NBQ2xELENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixDQUFBLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUFBOzs7Ozs7QUFLcEYsbUJBQWtCLEdBQUcsVUFBQSxZQUFZLEVBQUk7QUFDcEMsZUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQzNCLGNBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtFQUNyQjtPQUVELGFBQWEsR0FBRyxVQUFBLFlBQVk7U0FDM0IsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZUFsRnZCLFNBQVMsQ0FrRndCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUFBLENBQUE7OztBQUcxRSxPQUNDLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTtBQUN2QixRQUFNLFlBQVksR0FBRyxTQUFTLENBQUE7QUFDOUIsV0FBUyxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFNLEVBQUUsQ0FBQTtBQUNSLFdBQVMsR0FBRyxZQUFZLENBQUE7RUFDeEI7T0FFRCxlQUFlLEdBQUcsVUFBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUs7QUFDL0MsUUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUE7QUFDdEMsZUFBYSxHQUFHLGdCQUFnQixDQUFBO0FBQ2hDLFFBQU0sRUFBRSxDQUFBO0FBQ1IsZUFBYSxHQUFHLGdCQUFnQixDQUFBO0VBQ2hDO09BRUQsVUFBVSxHQUFHLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUNqQyxRQUFNLE9BQU8sR0FBRyxNQUFNLENBQUE7QUFDdEIsUUFBTSxHQUFHLE9BQU8sQ0FBQTtBQUNoQixRQUFNLEVBQUUsQ0FBQTtBQUNSLFFBQU0sR0FBRyxPQUFPLENBQUE7RUFDaEI7T0FFRCxTQUFTLEdBQUcsVUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFLO0FBQ25DLFFBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzVDLFFBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUN2QyxRQUFNLEVBQUUsQ0FBQTtBQUNSLE1BQUksUUFBUSxLQUFLLFNBQVMsRUFDekIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBLEtBRXZCLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUNuQjs7OztBQUdELFdBQVUsR0FBRyxVQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUs7QUFDckMsUUFBTSxjQUFjLEdBQUcsRUFBRyxDQUFBO0FBQzFCLGFBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLEVBQUk7QUFDeEIsU0FBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkMsT0FBSSxRQUFRLEtBQUssU0FBUyxFQUN6QixjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLFdBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUNYLENBQUMsQ0FBQTs7QUFFRixRQUFNLEVBQUUsQ0FBQTs7QUFFUixhQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2hDLGdCQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ2hDO09BRUQsa0JBQWtCLEdBQUcsVUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFLO0FBQzVDLG9CQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzlCLFdBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFDN0I7T0FFRCxtQkFBbUIsR0FBRyxVQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUs7QUFDOUMsYUFBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZDLFFBQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDdkIsYUFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN4QixVQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQ0FDckIsa0JBckpkLElBQUksRUFxSmUsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUFFLENBQUMsQ0FBQTtBQUNuQyxRQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNqQixDQUFDLENBQUE7QUFDRixZQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBQy9CO09BRUQsZUFBZSxHQUFHLFVBQUEsTUFBTSxFQUFJO0FBQzNCLFFBQU0scUJBQXFCLEdBQUcsa0JBQWtCLENBQUE7QUFDaEQsb0JBQWtCLEdBQUcsRUFBRyxDQUFBO0FBQ3hCLFlBQVUsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN6QyxvQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQTtFQUMxQzs7OztBQUdELFNBQVEsR0FBRyxVQUFBLE1BQU0sRUFBSTtBQUNwQixZQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBQ3pCLENBQUE7O0FBRUYsT0FBTSxjQUFjLEdBQUc7U0FDdEIsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUs7QUFDbkQsT0FBSSxFQUFFLEtBQUssbUJBdEtaLGlCQUFpQixBQXNLd0IsSUFBSSxLQUFLLG1CQXRLL0IsZUFBZSxBQXNLMkMsQ0FBQSxBQUFDLEVBQUU7QUFDOUUsVUFBTSxVQUFVLEdBQUcsVUFyS3JCLE9BQU8sRUFxS3NCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pELFFBQUksVUFBVSxJQUFJLFVBdEtwQixPQUFPLEVBc0txQixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTt1Q0FBK0Isa0JBNUtsRCxJQUFJLEVBNEttRCxLQUFLLENBQUMsSUFBSSxDQUFDO0tBQUcsQ0FBQyxDQUFBLEtBQ3ZFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRTtZQUFNLFVBMUtILElBQUksRUEwS0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRztLQUFBLEVBQUU7a0NBQzlDLGtCQS9LaEIsSUFBSSxFQStLaUIsS0FBSyxDQUFDLElBQUksQ0FBQztLQUF5QixDQUFDLENBQUEsS0FFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRTt1QkFDNUIsa0JBbExMLElBQUksRUFrTE0sS0FBSyxDQUFDLElBQUksQ0FBQztLQUFzQixDQUFDLENBQUE7SUFDbEQ7R0FDRCxDQUFDO0VBQUEsQ0FBQTs7QUFFSCxXQWxMaUQsYUFBYSxVQWtMcEMsUUFBUSxFQUFFO0FBQ25DLGNBQVksRUFBQSxZQUFHOzs7QUFDZCxTQUFNLEdBQUcsR0FBRyxZQUFNOztBQUVqQixVQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN0QixVQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNuQixDQUFBO0FBQ0QsT0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUN6QixlQUFlLENBQUMsR0FBRyxDQUFDLENBQUEsS0FFcEIsR0FBRyxFQUFFLENBQUE7R0FDTjs7QUFFRCxtQkFBaUIsRUFBQSxZQUFHOztBQUVuQixPQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM5QixPQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQ25COztBQUVELFVBQVEsRUFBRSxjQUFjO0FBQ3hCLGNBQVksRUFBRSxjQUFjOztBQUU1QixXQUFTLEVBQUEsWUFBRztBQUFFLE9BQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQUU7O0FBRTFDLFNBQU8sRUFBQSxZQUFHO0FBQUUsY0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFFOztBQUVyQyxjQUFZLEVBQUEsWUFBRzs7O0FBQ2QsU0FBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxhQUFVLENBQUMsU0FBUyxFQUFFO1dBQU0sT0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQUEsQ0FBQyxDQUFBO0dBQy9DOztBQUVELGlCQUFlLEVBQUEsWUFBRzs7O0FBQ2pCLFNBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDekMsYUFBVSxDQUFDLFNBQVMsRUFBRTtXQUFNLE9BQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtJQUFBLENBQUMsQ0FBQTtHQUNuRDs7QUFFRCxVQUFRLEVBQUEsWUFBRzs7O0FBQ1YscUJBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFNO0FBQ3BDLFVBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFLLEtBQUssQ0FBQyxDQUFBO0FBQ3pDLGNBeE53QixNQUFNLEVBd052QixPQUFLLE9BQU8sRUFBRSxVQUFBLENBQUM7WUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO2FBQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtNQUFBLENBQUM7S0FBQSxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFBO0dBQ0Y7O0FBRUQsVUFBUSxFQUFFLG1CQUFtQjtBQUM3QixVQUFRLEVBQUUsbUJBQW1COztBQUU3QixXQUFTLEVBQUEsWUFBRzs7O0FBQUUsV0FBUSxDQUFDO1dBQU0sT0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO0lBQUEsQ0FBQyxDQUFBO0dBQUU7O0FBRW5ELFNBQU8sRUFBQSxZQUFHO0FBQ1QsZUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xCLFVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLG1CQXRPcUQsTUFBTSxDQXNPekMsQUFBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7V0FDakQsa0JBek9HLElBQUksRUF5T0YsS0FBSyxDQUFDO0lBQTJCLENBQUMsQ0FBQTtHQUMzQzs7QUFFRCxVQUFRLEVBQUEsWUFBRztBQUNWLGVBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQixVQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sbUJBNU91RCxNQUFNLEFBNE8zQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7V0FDOUMsa0JBL09HLElBQUksRUErT0YsT0FBTyxDQUFDLDJCQUFzQixrQkEvT2hDLElBQUksRUErT2lDLEtBQUssQ0FBQztJQUFFLENBQUMsQ0FBQTtBQUNyRCxPQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQ25COztBQUVELE1BQUksRUFBQSxZQUFHO0FBQ04sT0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNwQixPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUN6Qjs7QUFFRCxRQUFNLEVBQUEsWUFBRztBQUFFLGFBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFO0FBQzdCLFlBQVUsRUFBRSxjQUFjO0FBQzFCLFNBQU8sRUFBQSxZQUFHOzs7QUFBRSxXQUFRLENBQUM7V0FBTSxVQUFVLFFBQU07SUFBQSxDQUFDLENBQUE7R0FBRTtBQUM5QyxhQUFXLEVBQUUsY0FBYzs7QUFHM0IsZUFBYSxFQUFBLFlBQUc7QUFDZixPQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2xCLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDcEI7QUFDRCxnQkFBYyxFQUFBLFlBQUc7OztBQUNoQixPQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2xCLFdBQVEsQ0FBQztXQUFNLE9BQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUFBLENBQUMsQ0FBQTtHQUNwQzs7QUFFRCxVQUFRLEVBQUEsWUFBRztBQUFFLGVBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFOzs7QUFHakMsT0FBSyxFQUFBLFlBQUc7QUFBRSxjQUFXLENBQUMsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFBO0dBQUU7O0FBRWpDLFFBQU0sRUFBQSxZQUFHOzs7QUFBRSxxQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1dBQU0sU0FBUyxRQUFNO0lBQUEsQ0FBQyxDQUFBO0dBQUU7O0FBRWxFLE9BQUssRUFBQSxZQUFHO0FBQUUsWUFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQUU7O0FBRTNCLFFBQU0sRUFBQSxZQUFHO0FBQUUsWUFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQUU7O0FBRTVCLEtBQUcsRUFBQSxZQUFHOzs7QUFDTCxrQkFBZSxDQUFDLFlBQU07QUFDckIsV0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFLLFlBQVksS0FBSyxJQUFJLElBQUksT0FBSyxLQUFLLG1CQWxSUCxRQUFRLEFBa1JtQixFQUFFLE9BQUssR0FBRyxFQUNuRix1REFBdUQsQ0FBQyxDQUFBO0FBQ3pELG1CQUFlLENBQUMsT0FBSyxXQUFXLEVBQUU7WUFDakMsVUFBVSxDQUFDLEtBQUssRUFBRSxZQUFNO0FBQ3ZCLFlBQU0sT0FBTyxHQUFHLFVBcFJKLEdBQUcsRUFvUkssT0FBSyxJQUFJLEVBQUUsT0FBSyxTQUFTLENBQUMsQ0FBQTtBQUM5Qyx5QkFBbUIsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUNsQyxpQkFyUnFCLE1BQU0sRUFxUnBCLE9BQUssSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3pCLGNBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ25CLGlCQXZScUIsTUFBTSxFQXVScEIsT0FBSyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUM3QyxhQUFNLFNBQVMsR0FBRztlQUFNLFVBeFJILE1BQU0sRUF3UkksT0FBSyxLQUFLLEVBQUUsVUFBQSxDQUFDO2dCQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7U0FBQSxDQUFDO1FBQUEsQ0FBQTtBQUMzRCxpQkExUm1DLE1BQU0sRUEwUmxDLE9BQUssWUFBWSxFQUFFLFVBQUEsQ0FBQztlQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQUEsRUFBRSxTQUFTLENBQUMsQ0FBQTtPQUNsRSxDQUFDLENBQUE7TUFDRixDQUFDO0tBQUEsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFBO0dBQ0Y7O0FBRUQsY0FBWSxFQUFBLFlBQUcsRUFBRzs7QUFFbEIsTUFBSSxFQUFBLFlBQUc7OztBQUFFLGtCQUFlLENBQUM7V0FBTSxRQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7SUFBQSxDQUFDLENBQUE7R0FBRTs7QUFFckQsYUFBVyxFQUFBLFlBQUc7QUFBRSxjQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFFOzs7QUFHOUMsY0FBWSxFQUFBLFlBQUc7QUFBRSxhQXRTUyxNQUFNLEVBc1NSLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7R0FBRTs7QUFFOUMsYUFBVyxFQUFBLFlBQUc7OztBQUNiLFNBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNwRCxVQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1dBQVMsa0JBL1MvQyxJQUFJLEVBK1NnRCxRQUFLLElBQUksQ0FBQztJQUFrQixDQUFDLENBQUE7O0FBRXhGLE9BQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDbkI7O0FBRUQsZUFBYSxFQUFBLFlBQUcsRUFBRzs7QUFFbkIsVUFBUSxFQUFBLFlBQUc7QUFDVixjQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzFCLE9BQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDakIsT0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNqQjs7QUFFRCxRQUFNLEVBQUEsWUFBRztBQUFFLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7R0FBRTs7QUFFakMsUUFBTSxFQUFBLFlBQUc7Ozs7QUFFUixPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN6QixjQUFXLENBQUM7V0FBTSxRQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQUEsQ0FBQyxDQUFBO0FBQ2pELFNBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDekMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1dBQUksb0JBQW9CLENBQUMsQ0FBQyxVQUFPO0lBQUEsQ0FBQyxDQUFBO0FBQ3hELGFBL1R5QixNQUFNLEVBK1R4QixJQUFJLENBQUMsZUFBZSxFQUFFLFVBQUEsQ0FBQztXQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFO0tBQUEsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFMUUsU0FBTSxPQUFPLEdBQUcsVUFqVUMsTUFBTSxFQWlVQSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEMsU0FBTSxlQUFlLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDL0IsUUFBSSxJQUFJLG1CQXRVRixNQUFNLEFBc1VjLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7WUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsRUFDMUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUEsS0FDM0IsSUFBSSxJQUFJLG1CQXhVa0QsS0FBSyxBQXdVdEMsRUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDcEMsQ0FBQTtBQUNELE9BQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0dBQ25DOztBQUVELFVBQVEsRUFBQSxZQUFHOzs7QUFDVixjQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzFCLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDcEIsT0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1dBQUksV0FBVyxVQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFBQSxDQUFDLENBQUE7R0FDbEU7O0FBRUQsV0FBUyxFQUFBLFlBQUc7QUFDWCxTQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3RCLE9BQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQzFCLFdBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFOytCQUF1QixJQUFJLENBQUMsR0FBRztLQUFFLENBQUMsQ0FBQTtBQUMvRSxRQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNsQixRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ25CLENBQUMsQ0FBQTtHQUNGOztBQUVELE1BQUksRUFBQSxZQUFHO0FBQ04sYUEzVnlCLE1BQU0sRUEyVnhCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7R0FDN0I7O0FBRUQsT0FBSyxFQUFBLFlBQUc7QUFDUCxPQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN2QixRQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFDeEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ1gsQ0FBQyxDQUFBO0dBQ0Y7O0FBRUQsV0FBUyxFQUFBLFlBQUcsRUFBRzs7QUFFZixZQUFVLEVBQUEsWUFBRyxFQUFHOztBQUVoQixPQUFLLEVBQUEsWUFBRztBQUFFLE9BQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7R0FBRTs7QUFFbEMsS0FBRyxFQUFBLFlBQUc7OztBQUdMLFNBQU0sV0FBVyxHQUFHLFVBQUEsQ0FBQyxFQUFJO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9CLFdBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQ3JDLGtCQXRYRSxJQUFJLEVBc1hELENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQXdCLElBQUksQ0FBQyxHQUFHO0tBQUUsQ0FBQyxDQUFBO0FBQ25ELHNCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JCLFlBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNYLENBQUE7QUFDRCxPQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUM5QixhQXRYeUIsTUFBTSxFQXNYeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQTtHQUN0Qzs7QUFFRCxPQUFLLEVBQUEsWUFBRztBQUNQLFVBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsMkNBQTJDLENBQUMsQ0FBQTtBQUNuRixPQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0dBQ3JCOztBQUVELFNBQU8sRUFBQSxZQUFHO0FBQ1QsVUFBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ25GLE9BQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUE7R0FDdkI7RUFDRCxDQUFDLENBQUE7O0FBRUYsVUFBUyxjQUFjLEdBQUc7QUFDekIsYUFBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMxQixNQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0VBQ25COztBQUVELFVBQVMsbUJBQW1CLEdBQUc7OztBQUM5QixvQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1VBQU0sV0FBVyxDQUFDLFFBQUssS0FBSyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0VBQzdEOztBQUVELFVBQVMsY0FBYyxHQUFHOzs7QUFDekIsTUFBSSxJQUFJLENBQUMsSUFBSSxtQkFoWmlDLE9BQU8sQUFnWnJCLEVBQUU7QUFDakMsT0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDdkIsT0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDNUIsc0JBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7V0FBTSxRQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFBQSxDQUFDLENBQUE7R0FDakUsTUFBTTtBQUNOLE9BQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDbEIsT0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNwQjtFQUNEOzs7QUFHRCxPQUNDLFNBQVMsR0FBRyxVQUFBLE9BQU8sRUFBSTtBQUN0QixRQUFNLFdBQVcsR0FBRztVQUFNLFVBQVUsQ0FBQyxPQUFPLEVBQUU7V0FBTSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtJQUFBLENBQUM7R0FBQSxDQUFBO0FBQzNFLFlBN1p1QyxNQUFNLEVBNlp0QyxPQUFPLENBQUMsVUFBVSxFQUN4QixVQUFDLElBQWdCLEVBQUs7T0FBbkIsT0FBTyxHQUFULElBQWdCLENBQWQsT0FBTztPQUFFLEdBQUcsR0FBZCxJQUFnQixDQUFMLEdBQUc7O0FBQ2QsTUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ1oscUJBQWtCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0dBQ3hDLEVBQ0QsV0FBVyxDQUFDLENBQUE7RUFDYjtPQUVELFlBQVksR0FBRyxVQUFBLFFBQVE7U0FDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUM7RUFBQTtPQUcvRCxVQUFVLEdBQUcsVUFBQSxDQUFDLEVBQUk7QUFDakIsUUFBTSxJQUFJLEdBQUcsWUFBTTtBQUNsQixJQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN2QixhQTNhd0IsTUFBTSxFQTJhdkIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtHQUN4QixDQUFBO0FBQ0QsWUE5YXVDLE1BQU0sRUE4YXRDLENBQUMsQ0FBQyxPQUFPLEVBQ2YsVUFBQSxDQUFDLEVBQUk7QUFDSixJQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDVixxQkFBa0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0dBQ3BDLEVBQ0QsSUFBSSxDQUFDLENBQUE7RUFDTixDQUFBOzs7QUFHRixPQUNDLGVBQWUsR0FBRyxVQUFDLElBQUksRUFBRSxTQUFTLEVBQUs7QUFDdEMsUUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQyxTQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUUsU0FBUyxFQUFFOzZCQUM5QixrQkEvYlgsSUFBSSxFQStiWSxJQUFJLENBQUMsd0JBQW1CLGtCQS9ieEMsSUFBSSxFQStieUMsVUExYjVDLE9BQU8sRUEwYjZDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUFHLENBQUMsQ0FBQTtBQUNsRixTQUFPLE9BQU8sQ0FBQTtFQUNkO09BRUQsYUFBYSxHQUFHLFVBQUEsSUFBSTtTQUNuQixJQUFJLG1CQWxjOEIsWUFBWSxBQWtjbEIsR0FDM0IsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLEdBQ2pCLElBQUksbUJBcGNVLGlCQUFpQixBQW9jRSxHQUNqQyxJQUFJLENBQUMsU0FBUyxHQUNkLElBQUksbUJBcmM4QixRQUFRLEFBcWNsQixHQUN4QixhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUMxQixFQUFHO0VBQUE7T0FFTCxXQUFXLEdBQUcsVUFBQSxLQUFLLEVBQUk7Ozs7Ozs7Ozs7QUFVdEIsUUFBTSxTQUFTLEdBQUcsRUFBRyxDQUFBOztBQUVyQixRQUFNLGFBQWEsR0FBRyxVQUFBLElBQUksRUFBSTtBQUM3QixPQUFJLElBQUksbUJBdmR1RCxLQUFLLEFBdWQzQyxFQUN4QixXQUFXLENBQUM7V0FBTSxVQXRkQSxXQUFXLEVBc2RDLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDO0lBQUEsQ0FBQyxDQUFBLEtBRXpELFVBeGRrQixXQUFXLEVBd2RqQixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBQSxDQUFDLEVBQUk7O0FBRXJDLGlCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEIsYUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUE7R0FDSCxDQUFBO0FBQ0QsWUE5ZG9CLFdBQVcsRUE4ZG5CLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUNqQyxvQkFBa0IsQ0FBQyxJQUFJLE1BQUEsQ0FBdkIsa0JBQWtCLEVBQVMsU0FBUyxDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY3JDLFFBQU0sbUJBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7O0FBR3JDLFFBQU0sUUFBUSxHQUFHLEVBQUcsQ0FBQTs7QUFFcEIsUUFBTSxVQUFVLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDMUIsT0FBSSxJQUFJLG1CQXJmdUQsS0FBSyxBQXFmM0M7OztBQUd4QixlQUFXLENBQUM7WUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FBQSxDQUFDLENBQUEsS0FDN0M7QUFDSixxQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN2QixpQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUN2QyxXQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0FBQzFCLFdBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakMsU0FBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0FBQzNCLGFBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFDekQ7MkJBQWlCLGtCQWxnQmYsSUFBSSxFQWtnQmdCLElBQUksQ0FBQztPQUE0QixDQUFDLENBQUE7QUFDekQsY0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtNQUN2QjtBQUNELHdCQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM3QixhQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7QUFJbEIsV0FBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDdkMsZUF2Z0JJLE1BQU0sRUF1Z0JILE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQTtLQUMzQixDQUFDLENBQUE7QUFDRixRQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDYjtHQUNELENBQUE7O0FBRUQsT0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7QUFFekIsV0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUM5QixVQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztVQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUE7O0FBRWxDLFNBQU8sU0FBUyxDQUFBO0VBQ2hCO09BRUQsaUJBQWlCLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDM0IsUUFBTSxXQUFXLEdBQ2hCLElBQUksbUJBemhCa0UsRUFBRSxBQXloQnREOztBQUVsQixNQUFJLG1CQTNoQnFELElBQUksQUEyaEJ6QyxJQUNwQixJQUFJLG1CQTNoQmlELEtBQUssQUEyaEJyQyxJQUNyQixJQUFJLG1CQTVoQndELE9BQU8sQUE0aEI1QyxDQUFBO0FBQ3hCLFNBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtFQUN6RSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgKiBhcyBNc0FzdFR5cGVzIGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQXNzaWduU2luZ2xlLCBCbG9ja1ZhbCwgQ2FsbCwgRGVidWcsIERvLCBGb3JWYWwsXG5cdExvY2FsRGVjbGFyZUJ1aWx0LCBMb2NhbERlY2xhcmVSZXMsIE9iakVudHJ5LCBQYXR0ZXJuLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgYXNzZXJ0LCBjYXQsIGVhY2hSZXZlcnNlLCBoZWFkLCBpZkVsc2UsIGltcGxlbWVudE1hbnksXG5cdGlzRW1wdHksIG1hcEtleXMsIG5ld1NldCwgb3BFYWNoIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMsIHsgTG9jYWxJbmZvIH0gZnJvbSAnLi9WZXJpZnlSZXN1bHRzJ1xuXG4vKlxuVGhlIHZlcmlmaWVyIGdlbmVyYXRlcyBpbmZvcm1hdGlvbiBuZWVkZWQgZHVyaW5nIHRyYW5zcGlsaW5nLCB0aGUgVmVyaWZ5UmVzdWx0cy5cbiovXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIG1zQXN0KSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRsb2NhbHMgPSBuZXcgTWFwKClcblx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gWyBdXG5cdGlzSW5EZWJ1ZyA9IGlzSW5HZW5lcmF0b3IgPSBmYWxzZVxuXHRvcExvb3AgPSBudWxsXG5cdHJlc3VsdHMgPSBuZXcgVmVyaWZ5UmVzdWx0cygpXG5cblx0bXNBc3QudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxVc2UoKVxuXG5cdGNvbnN0IHJlcyA9IHJlc3VsdHNcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHRjb250ZXh0ID0gbG9jYWxzID0gb3BMb29wID0gcGVuZGluZ0Jsb2NrTG9jYWxzID0gcmVzdWx0cyA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gcmVzXG59XG5cbi8vIFVzZSBhIHRyaWNrIGxpa2UgaW4gcGFyc2UuanMgYW5kIGhhdmUgZXZlcnl0aGluZyBjbG9zZSBvdmVyIHRoZXNlIG11dGFibGUgdmFyaWFibGVzLlxubGV0XG5cdGNvbnRleHQsXG5cdC8vIE1hcCBmcm9tIG5hbWVzIHRvIExvY2FsRGVjbGFyZXMuXG5cdGxvY2Fscyxcblx0b3BMb29wLFxuXHQvKlxuXHRMb2NhbHMgZm9yIHRoaXMgYmxvY2suXG5cdFRoZXNlIGFyZSBhZGRlZCB0byBsb2NhbHMgd2hlbiBlbnRlcmluZyBhIEZ1bmN0aW9uIG9yIGxhenkgZXZhbHVhdGlvbi5cblx0SW46XG5cdFx0YSA9IHxcblx0XHRcdGJcblx0XHRiID0gMVxuXHRgYmAgd2lsbCBiZSBhIHBlbmRpbmcgbG9jYWwuXG5cdEhvd2V2ZXI6XG5cdFx0YSA9IGJcblx0XHRiID0gMVxuXHR3aWxsIGZhaWwgdG8gdmVyaWZ5LCBiZWNhdXNlIGBiYCBjb21lcyBhZnRlciBgYWAgYW5kIGlzIG5vdCBhY2Nlc3NlZCBpbnNpZGUgYSBmdW5jdGlvbi5cblx0SXQgd291bGQgd29yayBmb3IgYH5hIGlzIGJgLCB0aG91Z2guXG5cdCovXG5cdHBlbmRpbmdCbG9ja0xvY2Fscyxcblx0aXNJbkRlYnVnLFxuXHQvLyBXaGV0aGVyIHdlIGFyZSBjdXJyZW50bHkgYWJsZSB0byB5aWVsZC5cblx0aXNJbkdlbmVyYXRvcixcblx0cmVzdWx0c1xuXG5jb25zdFxuXHR2ZXJpZnkgPSBtc0FzdCA9PiBtc0FzdC52ZXJpZnkoKSxcblxuXHRkZWxldGVMb2NhbCA9IGxvY2FsRGVjbGFyZSA9PlxuXHRcdGxvY2Fscy5kZWxldGUobG9jYWxEZWNsYXJlLm5hbWUpLFxuXG5cdHNldExvY2FsID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxzLnNldChsb2NhbERlY2xhcmUubmFtZSwgbG9jYWxEZWNsYXJlKSxcblxuXHQvLyBXaGVuIGEgbG9jYWwgaXMgcmV0dXJuZWQgZnJvbSBhIEJsb2NrT2JqIG9yIE1vZHVsZSxcblx0Ly8gdGhlIHJldHVybiAnYWNjZXNzJyBpcyBjb25zaWRlcmVkIHRvIGJlICdkZWJ1ZycgaWYgdGhlIGxvY2FsIGlzLlxuXHRhY2Nlc3NMb2NhbEZvclJldHVybiA9IChkZWNsYXJlLCBhY2Nlc3MpID0+IHtcblx0XHRjb25zdCBpbmZvID0gcmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGRlY2xhcmUpXG5cdFx0X2FkZExvY2FsQWNjZXNzKGluZm8sIGFjY2VzcywgaW5mby5pc0luRGVidWcpXG5cdH0sXG5cblx0YWNjZXNzTG9jYWwgPSAoYWNjZXNzLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGdldExvY2FsRGVjbGFyZShuYW1lLCBhY2Nlc3MubG9jKVxuXHRcdHJlc3VsdHMubG9jYWxBY2Nlc3NUb0RlY2xhcmUuc2V0KGFjY2VzcywgZGVjbGFyZSlcblx0XHRfYWRkTG9jYWxBY2Nlc3MocmVzdWx0cy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGRlY2xhcmUpLCBhY2Nlc3MsIGlzSW5EZWJ1Zylcblx0fSxcblxuXHRfYWRkTG9jYWxBY2Nlc3MgPSAobG9jYWxJbmZvLCBhY2Nlc3MsIGlzRGVidWdBY2Nlc3MpID0+XG5cdFx0KGlzRGVidWdBY2Nlc3MgPyBsb2NhbEluZm8uZGVidWdBY2Nlc3NlcyA6IGxvY2FsSW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5wdXNoKGFjY2VzcyksXG5cblx0Ly8gRm9yIGV4cHJlc3Npb25zIGFmZmVjdGluZyBsaW5lTmV3TG9jYWxzLCB0aGV5IHdpbGwgYmUgcmVnaXN0ZXJlZCBiZWZvcmUgYmVpbmcgdmVyaWZpZWQuXG5cdC8vIFNvLCBMb2NhbERlY2xhcmUudmVyaWZ5IGp1c3QgdGhlIHR5cGUuXG5cdC8vIEZvciBsb2NhbHMgbm90IGFmZmVjdGluZyBsaW5lTmV3TG9jYWxzLCB1c2UgdGhpcyBpbnN0ZWFkIG9mIGp1c3QgZGVjbGFyZS52ZXJpZnkoKVxuXHR2ZXJpZnlMb2NhbERlY2xhcmUgPSBsb2NhbERlY2xhcmUgPT4ge1xuXHRcdHJlZ2lzdGVyTG9jYWwobG9jYWxEZWNsYXJlKVxuXHRcdGxvY2FsRGVjbGFyZS52ZXJpZnkoKVxuXHR9LFxuXG5cdHJlZ2lzdGVyTG9jYWwgPSBsb2NhbERlY2xhcmUgPT5cblx0XHRyZXN1bHRzLmxvY2FsRGVjbGFyZVRvSW5mby5zZXQobG9jYWxEZWNsYXJlLCBMb2NhbEluZm8uZW1wdHkoaXNJbkRlYnVnKSlcblxuLy8gVGhlc2UgZnVuY3Rpb25zIGNoYW5nZSB2ZXJpZmllciBzdGF0ZSBhbmQgZWZmaWNpZW50bHkgcmV0dXJuIHRvIHRoZSBvbGQgc3RhdGUgd2hlbiBmaW5pc2hlZC5cbmNvbnN0XG5cdHdpdGhJbkRlYnVnID0gYWN0aW9uID0+IHtcblx0XHRjb25zdCBvbGRJc0luRGVidWcgPSBpc0luRGVidWdcblx0XHRpc0luRGVidWcgPSB0cnVlXG5cdFx0YWN0aW9uKClcblx0XHRpc0luRGVidWcgPSBvbGRJc0luRGVidWdcblx0fSxcblxuXHR3aXRoSW5HZW5lcmF0b3IgPSAobmV3SXNJbkdlbmVyYXRvciwgYWN0aW9uKSA9PiB7XG5cdFx0Y29uc3Qgb2xkSXNJbkdlbmVyYXRvciA9IGlzSW5HZW5lcmF0b3Jcblx0XHRpc0luR2VuZXJhdG9yID0gbmV3SXNJbkdlbmVyYXRvclxuXHRcdGFjdGlvbigpXG5cdFx0aXNJbkdlbmVyYXRvciA9IG9sZElzSW5HZW5lcmF0b3Jcblx0fSxcblxuXHR3aXRoSW5Mb29wID0gKG5ld0xvb3AsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IG9sZExvb3AgPSBvcExvb3Bcblx0XHRvcExvb3AgPSBuZXdMb29wXG5cdFx0YWN0aW9uKClcblx0XHRvcExvb3AgPSBvbGRMb29wXG5cdH0sXG5cblx0cGx1c0xvY2FsID0gKGFkZGVkTG9jYWwsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IHNoYWRvd2VkID0gbG9jYWxzLmdldChhZGRlZExvY2FsLm5hbWUpXG5cdFx0bG9jYWxzLnNldChhZGRlZExvY2FsLm5hbWUsIGFkZGVkTG9jYWwpXG5cdFx0YWN0aW9uKClcblx0XHRpZiAoc2hhZG93ZWQgPT09IHVuZGVmaW5lZClcblx0XHRcdGRlbGV0ZUxvY2FsKGFkZGVkTG9jYWwpXG5cdFx0ZWxzZVxuXHRcdFx0c2V0TG9jYWwoc2hhZG93ZWQpXG5cdH0sXG5cblx0Ly8gU2hvdWxkIGhhdmUgdmVyaWZpZWQgdGhhdCBhZGRlZExvY2FscyBhbGwgaGF2ZSBkaWZmZXJlbnQgbmFtZXMuXG5cdHBsdXNMb2NhbHMgPSAoYWRkZWRMb2NhbHMsIGFjdGlvbikgPT4ge1xuXHRcdGNvbnN0IHNoYWRvd2VkTG9jYWxzID0gWyBdXG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaChfID0+IHtcblx0XHRcdGNvbnN0IHNoYWRvd2VkID0gbG9jYWxzLmdldChfLm5hbWUpXG5cdFx0XHRpZiAoc2hhZG93ZWQgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0c2hhZG93ZWRMb2NhbHMucHVzaChzaGFkb3dlZClcblx0XHRcdHNldExvY2FsKF8pXG5cdFx0fSlcblxuXHRcdGFjdGlvbigpXG5cblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKGRlbGV0ZUxvY2FsKVxuXHRcdHNoYWRvd2VkTG9jYWxzLmZvckVhY2goc2V0TG9jYWwpXG5cdH0sXG5cblx0dmVyaWZ5QW5kUGx1c0xvY2FsID0gKGFkZGVkTG9jYWwsIGFjdGlvbikgPT4ge1xuXHRcdHZlcmlmeUxvY2FsRGVjbGFyZShhZGRlZExvY2FsKVxuXHRcdHBsdXNMb2NhbChhZGRlZExvY2FsLCBhY3Rpb24pXG5cdH0sXG5cblx0dmVyaWZ5QW5kUGx1c0xvY2FscyA9IChhZGRlZExvY2FscywgYWN0aW9uKSA9PiB7XG5cdFx0YWRkZWRMb2NhbHMuZm9yRWFjaCh2ZXJpZnlMb2NhbERlY2xhcmUpXG5cdFx0Y29uc3QgbmFtZXMgPSBuZXcgU2V0KClcblx0XHRhZGRlZExvY2Fscy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0Y29udGV4dC5jaGVjayghbmFtZXMuaGFzKF8ubmFtZSksIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRgRHVwbGljYXRlIGxvY2FsICR7Y29kZShfLm5hbWUpfWApXG5cdFx0XHRuYW1lcy5hZGQoXy5uYW1lKVxuXHRcdH0pXG5cdFx0cGx1c0xvY2FscyhhZGRlZExvY2FscywgYWN0aW9uKVxuXHR9LFxuXG5cdHdpdGhCbG9ja0xvY2FscyA9IGFjdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb2xkUGVuZGluZ0Jsb2NrTG9jYWxzID0gcGVuZGluZ0Jsb2NrTG9jYWxzXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzID0gWyBdXG5cdFx0cGx1c0xvY2FscyhvbGRQZW5kaW5nQmxvY2tMb2NhbHMsIGFjdGlvbilcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBvbGRQZW5kaW5nQmxvY2tMb2NhbHNcblx0fSxcblxuXHQvLyBDYW4ndCBicmVhayBvdXQgb2YgbG9vcCBpbnNpZGUgb2YgSUlGRS5cblx0d2l0aElJRkUgPSBhY3Rpb24gPT4ge1xuXHRcdHdpdGhJbkxvb3AoZmFsc2UsIGFjdGlvbilcblx0fVxuXG5jb25zdCB2ZXJpZnlMb2NhbFVzZSA9ICgpID0+XG5cdHJlc3VsdHMubG9jYWxEZWNsYXJlVG9JbmZvLmZvckVhY2goKGluZm8sIGxvY2FsKSA9PiB7XG5cdFx0aWYgKCEobG9jYWwgaW5zdGFuY2VvZiBMb2NhbERlY2xhcmVCdWlsdCB8fCBsb2NhbCBpbnN0YW5jZW9mIExvY2FsRGVjbGFyZVJlcykpIHtcblx0XHRcdGNvbnN0IG5vTm9uRGVidWcgPSBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3Nlcylcblx0XHRcdGlmIChub05vbkRlYnVnICYmIGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSlcblx0XHRcdFx0Y29udGV4dC53YXJuKGxvY2FsLmxvYywgKCkgPT4gYFVudXNlZCBsb2NhbCB2YXJpYWJsZSAke2NvZGUobG9jYWwubmFtZSl9LmApXG5cdFx0XHRlbHNlIGlmIChpbmZvLmlzSW5EZWJ1Zylcblx0XHRcdFx0Y29udGV4dC53YXJuSWYoIW5vTm9uRGVidWcsICgpID0+IGhlYWQoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5sb2MsICgpID0+XG5cdFx0XHRcdFx0YERlYnVnLW9ubHkgbG9jYWwgJHtjb2RlKGxvY2FsLm5hbWUpfSB1c2VkIG91dHNpZGUgb2YgZGVidWcuYClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29udGV4dC53YXJuSWYobm9Ob25EZWJ1ZywgbG9jYWwubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBMb2NhbCAke2NvZGUobG9jYWwubmFtZSl9IHVzZWQgb25seSBpbiBkZWJ1Zy5gKVxuXHRcdH1cblx0fSlcblxuaW1wbGVtZW50TWFueShNc0FzdFR5cGVzLCAndmVyaWZ5Jywge1xuXHRBc3NpZ25TaW5nbGUoKSB7XG5cdFx0Y29uc3QgZG9WID0gKCkgPT4ge1xuXHRcdFx0Ly8gQXNzaWduZWUgcmVnaXN0ZXJlZCBieSB2ZXJpZnlMaW5lcy5cblx0XHRcdHRoaXMuYXNzaWduZWUudmVyaWZ5KClcblx0XHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0XHR9XG5cdFx0aWYgKHRoaXMuYXNzaWduZWUuaXNMYXp5KCkpXG5cdFx0XHR3aXRoQmxvY2tMb2NhbHMoZG9WKVxuXHRcdGVsc2Vcblx0XHRcdGRvVigpXG5cdH0sXG5cblx0QXNzaWduRGVzdHJ1Y3R1cmUoKSB7XG5cdFx0Ly8gQXNzaWduZWVzIHJlZ2lzdGVyZWQgYnkgdmVyaWZ5TGluZXMuXG5cdFx0dGhpcy5hc3NpZ25lZXMuZm9yRWFjaCh2ZXJpZnkpXG5cdFx0dGhpcy52YWx1ZS52ZXJpZnkoKVxuXHR9LFxuXG5cdEJhZ0VudHJ5OiB2ZXJpZnlCYWdFbnRyeSxcblx0QmFnRW50cnlNYW55OiB2ZXJpZnlCYWdFbnRyeSxcblxuXHRCYWdTaW1wbGUoKSB7IHRoaXMucGFydHMuZm9yRWFjaCh2ZXJpZnkpIH0sXG5cblx0QmxvY2tEbygpIHsgdmVyaWZ5TGluZXModGhpcy5saW5lcykgfSxcblxuXHRCbG9ja1ZhbE9oTm8oKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5vaE5vLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEJsb2NrV2l0aFJldHVybigpIHtcblx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdHBsdXNMb2NhbHMobmV3TG9jYWxzLCAoKSA9PiB0aGlzLnJldHVybmVkLnZlcmlmeSgpKVxuXHR9LFxuXG5cdEJsb2NrT2JqKCkge1xuXHRcdHZlcmlmeUFuZFBsdXNMb2NhbCh0aGlzLmJ1aWx0LCAoKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdMb2NhbHMgPSB2ZXJpZnlMaW5lcyh0aGlzLmxpbmVzKVxuXHRcdFx0b3BFYWNoKHRoaXMub3BPYmplZCwgXyA9PiBwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gXy52ZXJpZnkoKSkpXG5cdFx0fSlcblx0fSxcblxuXHRCbG9ja0JhZzogdmVyaWZ5QmxvY2tCYWdPck1hcCxcblx0QmxvY2tNYXA6IHZlcmlmeUJsb2NrQmFnT3JNYXAsXG5cblx0QmxvY2tXcmFwKCkgeyB3aXRoSUlGRSgoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKSB9LFxuXG5cdEJyZWFrRG8oKSB7XG5cdFx0dmVyaWZ5SW5Mb29wKHRoaXMpXG5cdFx0Y29udGV4dC5jaGVjayghKG9wTG9vcCBpbnN0YW5jZW9mIEZvclZhbCksIHRoaXMubG9jLCAoKSA9PlxuXHRcdFx0YCR7Y29kZSgnZm9yJyl9IG11c3QgYnJlYWsgd2l0aCBhIHZhbHVlLmApXG5cdH0sXG5cblx0QnJlYWtWYWwoKSB7XG5cdFx0dmVyaWZ5SW5Mb29wKHRoaXMpXG5cdFx0Y29udGV4dC5jaGVjayhvcExvb3AgaW5zdGFuY2VvZiBGb3JWYWwsIHRoaXMubG9jLCAoKSA9PlxuXHRcdFx0YCR7Y29kZSgnYnJlYWsnKX0gb25seSB2YWxpZCBpbnNpZGUgJHtjb2RlKCdmb3InKX1gKVxuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0fSxcblxuXHRDYWxsKCkge1xuXHRcdHRoaXMuY2FsbGVkLnZlcmlmeSgpXG5cdFx0dGhpcy5hcmdzLmZvckVhY2godmVyaWZ5KVxuXHR9LFxuXG5cdENhc2VEbygpIHsgdmVyaWZ5Q2FzZSh0aGlzKSB9LFxuXHRDYXNlRG9QYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblx0Q2FzZVZhbCgpIHsgd2l0aElJRkUoKCkgPT4gdmVyaWZ5Q2FzZSh0aGlzKSkgfSxcblx0Q2FzZVZhbFBhcnQ6IHZlcmlmeUNhc2VQYXJ0LFxuXG5cblx0Q29uZGl0aW9uYWxEbygpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR0aGlzLnJlc3VsdC52ZXJpZnkoKVxuXHR9LFxuXHRDb25kaXRpb25hbFZhbCgpIHtcblx0XHR0aGlzLnRlc3QudmVyaWZ5KClcblx0XHR3aXRoSUlGRSgoKSA9PiB0aGlzLnJlc3VsdC52ZXJpZnkoKSlcblx0fSxcblxuXHRDb250aW51ZSgpIHsgdmVyaWZ5SW5Mb29wKHRoaXMpIH0sXG5cblx0Ly8gT25seSByZWFjaCBoZXJlIGZvciBpbi9vdXQgY29uZGl0aW9uLlxuXHREZWJ1ZygpIHsgdmVyaWZ5TGluZXMoWyB0aGlzIF0pIH0sXG5cblx0Rm9yQmFnKCkgeyB2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5Rm9yKHRoaXMpKSB9LFxuXG5cdEZvckRvKCkgeyB2ZXJpZnlGb3IodGhpcykgfSxcblxuXHRGb3JWYWwoKSB7IHZlcmlmeUZvcih0aGlzKSB9LFxuXG5cdEZ1bigpIHtcblx0XHR3aXRoQmxvY2tMb2NhbHMoKCkgPT4ge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0aGlzLm9wUmVzRGVjbGFyZSA9PT0gbnVsbCB8fCB0aGlzLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tWYWwsIHRoaXMubG9jLFxuXHRcdFx0XHQnRnVuY3Rpb24gd2l0aCByZXR1cm4gY29uZGl0aW9uIG11c3QgcmV0dXJuIHNvbWV0aGluZy4nKVxuXHRcdFx0d2l0aEluR2VuZXJhdG9yKHRoaXMuaXNHZW5lcmF0b3IsICgpID0+XG5cdFx0XHRcdHdpdGhJbkxvb3AoZmFsc2UsICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhbGxBcmdzID0gY2F0KHRoaXMuYXJncywgdGhpcy5vcFJlc3RBcmcpXG5cdFx0XHRcdFx0dmVyaWZ5QW5kUGx1c0xvY2FscyhhbGxBcmdzLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcEluLCB2ZXJpZnkpXG5cdFx0XHRcdFx0XHR0aGlzLmJsb2NrLnZlcmlmeSgpXG5cdFx0XHRcdFx0XHRvcEVhY2godGhpcy5vcFJlc0RlY2xhcmUsIHZlcmlmeUxvY2FsRGVjbGFyZSlcblx0XHRcdFx0XHRcdGNvbnN0IHZlcmlmeU91dCA9ICgpID0+IG9wRWFjaCh0aGlzLm9wT3V0LCBfID0+IF8udmVyaWZ5KCkpXG5cdFx0XHRcdFx0XHRpZkVsc2UodGhpcy5vcFJlc0RlY2xhcmUsIF8gPT4gcGx1c0xvY2FsKF8sIHZlcmlmeU91dCksIHZlcmlmeU91dClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KSlcblx0XHR9KVxuXHR9LFxuXG5cdEdsb2JhbEFjY2VzcygpIHsgfSxcblxuXHRMYXp5KCkgeyB3aXRoQmxvY2tMb2NhbHMoKCkgPT4gdGhpcy52YWx1ZS52ZXJpZnkoKSkgfSxcblxuXHRMb2NhbEFjY2VzcygpIHsgYWNjZXNzTG9jYWwodGhpcywgdGhpcy5uYW1lKSB9LFxuXG5cdC8vIEFkZGluZyBMb2NhbERlY2xhcmVzIHRvIHRoZSBhdmFpbGFibGUgbG9jYWxzIGlzIGRvbmUgYnkgRnVuIG9yIGxpbmVOZXdMb2NhbHMuXG5cdExvY2FsRGVjbGFyZSgpIHsgb3BFYWNoKHRoaXMub3BUeXBlLCB2ZXJpZnkpIH0sXG5cblx0TG9jYWxNdXRhdGUoKSB7XG5cdFx0Y29uc3QgZGVjbGFyZSA9IGdldExvY2FsRGVjbGFyZSh0aGlzLm5hbWUsIHRoaXMubG9jKVxuXHRcdGNvbnRleHQuY2hlY2soZGVjbGFyZS5pc011dGFibGUoKSwgdGhpcy5sb2MsICgpID0+IGAke2NvZGUodGhpcy5uYW1lKX0gaXMgbm90IG11dGFibGUuYClcblx0XHQvLyBUT0RPOiBUcmFjayBtdXRhdGlvbnMuIE11dGFibGUgbG9jYWwgbXVzdCBiZSBtdXRhdGVkIHNvbWV3aGVyZS5cblx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdH0sXG5cblx0TnVtYmVyTGl0ZXJhbCgpIHsgfSxcblxuXHRNYXBFbnRyeSgpIHtcblx0XHRhY2Nlc3NMb2NhbCh0aGlzLCAnYnVpbHQnKVxuXHRcdHRoaXMua2V5LnZlcmlmeSgpXG5cdFx0dGhpcy52YWwudmVyaWZ5KClcblx0fSxcblxuXHRNZW1iZXIoKSB7IHRoaXMub2JqZWN0LnZlcmlmeSgpIH0sXG5cblx0TW9kdWxlKCkge1xuXHRcdC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoaXMuZG9Vc2VzLlxuXHRcdHRoaXMudXNlcy5mb3JFYWNoKHZlcmlmeSlcblx0XHR3aXRoSW5EZWJ1ZygoKSA9PiB0aGlzLmRlYnVnVXNlcy5mb3JFYWNoKHZlcmlmeSkpXG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHR0aGlzLmV4cG9ydHMuZm9yRWFjaChfID0+IGFjY2Vzc0xvY2FsRm9yUmV0dXJuKF8sIHRoaXMpKVxuXHRcdG9wRWFjaCh0aGlzLm9wRGVmYXVsdEV4cG9ydCwgXyA9PiBwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gXy52ZXJpZnkoKSkpXG5cblx0XHRjb25zdCBleHBvcnRzID0gbmV3U2V0KHRoaXMuZXhwb3J0cylcblx0XHRjb25zdCBtYXJrRXhwb3J0TGluZXMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuYWxsQXNzaWduZWVzKCkuc29tZShfID0+IGV4cG9ydHMuaGFzKF8pKSlcblx0XHRcdFx0cmVzdWx0cy5leHBvcnRBc3NpZ25zLmFkZChsaW5lKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHRcdH1cblx0XHR0aGlzLmxpbmVzLmZvckVhY2gobWFya0V4cG9ydExpbmVzKVxuXHR9LFxuXG5cdE9iakVudHJ5KCkge1xuXHRcdGFjY2Vzc0xvY2FsKHRoaXMsICdidWlsdCcpXG5cdFx0dGhpcy5hc3NpZ24udmVyaWZ5KClcblx0XHR0aGlzLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5mb3JFYWNoKF8gPT4gYWNjZXNzTG9jYWwodGhpcywgXy5uYW1lKSlcblx0fSxcblxuXHRPYmpTaW1wbGUoKSB7XG5cdFx0Y29uc3Qga2V5cyA9IG5ldyBTZXQoKVxuXHRcdHRoaXMucGFpcnMuZm9yRWFjaChwYWlyID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2soIWtleXMuaGFzKHBhaXIua2V5KSwgcGFpci5sb2MsICgpID0+IGBEdXBsaWNhdGUga2V5ICR7cGFpci5rZXl9YClcblx0XHRcdGtleXMuYWRkKHBhaXIua2V5KVxuXHRcdFx0cGFpci52YWx1ZS52ZXJpZnkoKVxuXHRcdH0pXG5cdH0sXG5cblx0T2hObygpIHtcblx0XHRvcEVhY2godGhpcy5vcFRocm93biwgdmVyaWZ5KVxuXHR9LFxuXG5cdFF1b3RlKCkge1xuXHRcdHRoaXMucGFydHMuZm9yRWFjaChfID0+IHtcblx0XHRcdGlmICh0eXBlb2YgXyAhPT0gJ3N0cmluZycpXG5cdFx0XHRcdF8udmVyaWZ5KClcblx0XHR9KVxuXHR9LFxuXG5cdFNwZWNpYWxEbygpIHsgfSxcblxuXHRTcGVjaWFsVmFsKCkgeyB9LFxuXG5cdFNwbGF0KCkgeyB0aGlzLnNwbGF0dGVkLnZlcmlmeSgpIH0sXG5cblx0VXNlKCkge1xuXHRcdC8vIFNpbmNlIFVzZXMgYXJlIGFsd2F5cyBpbiB0aGUgb3V0ZXJtb3N0IHNjb3BlLCBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHNoYWRvd2luZy5cblx0XHQvLyBTbyB3ZSBtdXRhdGUgYGxvY2Fsc2AgZGlyZWN0bHkuXG5cdFx0Y29uc3QgYWRkVXNlTG9jYWwgPSBfID0+IHtcblx0XHRcdGNvbnN0IHByZXYgPSBsb2NhbHMuZ2V0KF8ubmFtZSlcblx0XHRcdGNvbnRleHQuY2hlY2socHJldiA9PT0gdW5kZWZpbmVkLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0YCR7Y29kZShfLm5hbWUpfSBhbHJlYWR5IGltcG9ydGVkIGF0ICR7cHJldi5sb2N9YClcblx0XHRcdHZlcmlmeUxvY2FsRGVjbGFyZShfKVxuXHRcdFx0c2V0TG9jYWwoXylcblx0XHR9XG5cdFx0dGhpcy51c2VkLmZvckVhY2goYWRkVXNlTG9jYWwpXG5cdFx0b3BFYWNoKHRoaXMub3BVc2VEZWZhdWx0LCBhZGRVc2VMb2NhbClcblx0fSxcblxuXHRZaWVsZCgpIHtcblx0XHRjb250ZXh0LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZC52ZXJpZnkoKVxuXHR9LFxuXG5cdFlpZWxkVG8oKSB7XG5cdFx0Y29udGV4dC5jaGVjayhpc0luR2VuZXJhdG9yLCB0aGlzLmxvYywgJ0Nhbm5vdCB5aWVsZCBvdXRzaWRlIG9mIGdlbmVyYXRvciBjb250ZXh0Jylcblx0XHR0aGlzLnlpZWxkZWRUby52ZXJpZnkoKVxuXHR9XG59KVxuXG5mdW5jdGlvbiB2ZXJpZnlCYWdFbnRyeSgpIHtcblx0YWNjZXNzTG9jYWwodGhpcywgJ2J1aWx0Jylcblx0dGhpcy52YWx1ZS52ZXJpZnkoKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlCbG9ja0JhZ09yTWFwKCkge1xuXHR2ZXJpZnlBbmRQbHVzTG9jYWwodGhpcy5idWlsdCwgKCkgPT4gdmVyaWZ5TGluZXModGhpcy5saW5lcykpXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhc2VQYXJ0KCkge1xuXHRpZiAodGhpcy50ZXN0IGluc3RhbmNlb2YgUGF0dGVybikge1xuXHRcdHRoaXMudGVzdC50eXBlLnZlcmlmeSgpXG5cdFx0dGhpcy50ZXN0LnBhdHRlcm5lZC52ZXJpZnkoKVxuXHRcdHZlcmlmeUFuZFBsdXNMb2NhbHModGhpcy50ZXN0LmxvY2FscywgKCkgPT4gdGhpcy5yZXN1bHQudmVyaWZ5KCkpXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdFx0dGhpcy5yZXN1bHQudmVyaWZ5KClcblx0fVxufVxuXG4vLyBIZWxwZXJzIHNwZWNpZmljIHRvIGNlcnRhaW4gTXNBc3QgdHlwZXM6XG5jb25zdFxuXHR2ZXJpZnlGb3IgPSBmb3JMb29wID0+IHtcblx0XHRjb25zdCB2ZXJpZnlCbG9jayA9ICgpID0+IHdpdGhJbkxvb3AoZm9yTG9vcCwgKCkgPT4gZm9yTG9vcC5ibG9jay52ZXJpZnkoKSlcblx0XHRpZkVsc2UoZm9yTG9vcC5vcEl0ZXJhdGVlLFxuXHRcdFx0KHsgZWxlbWVudCwgYmFnIH0pID0+IHtcblx0XHRcdFx0YmFnLnZlcmlmeSgpXG5cdFx0XHRcdHZlcmlmeUFuZFBsdXNMb2NhbChlbGVtZW50LCB2ZXJpZnlCbG9jaylcblx0XHRcdH0sXG5cdFx0XHR2ZXJpZnlCbG9jaylcblx0fSxcblxuXHR2ZXJpZnlJbkxvb3AgPSBsb29wVXNlciA9PlxuXHRcdGNvbnRleHQuY2hlY2sob3BMb29wICE9PSBudWxsLCBsb29wVXNlci5sb2MsICdOb3QgaW4gYSBsb29wLicpLFxuXG5cblx0dmVyaWZ5Q2FzZSA9IF8gPT4ge1xuXHRcdGNvbnN0IGRvSXQgPSAoKSA9PiB7XG5cdFx0XHRfLnBhcnRzLmZvckVhY2godmVyaWZ5KVxuXHRcdFx0b3BFYWNoKF8ub3BFbHNlLCB2ZXJpZnkpXG5cdFx0fVxuXHRcdGlmRWxzZShfLm9wQ2FzZWQsXG5cdFx0XHRfID0+IHtcblx0XHRcdFx0Xy52ZXJpZnkoKVxuXHRcdFx0XHR2ZXJpZnlBbmRQbHVzTG9jYWwoXy5hc3NpZ25lZSwgZG9JdClcblx0XHRcdH0sXG5cdFx0XHRkb0l0KVxuXHR9XG5cbi8vIEdlbmVyYWwgdXRpbGl0aWVzOlxuY29uc3Rcblx0Z2V0TG9jYWxEZWNsYXJlID0gKG5hbWUsIGFjY2Vzc0xvYykgPT4ge1xuXHRcdGNvbnN0IGRlY2xhcmUgPSBsb2NhbHMuZ2V0KG5hbWUpXG5cdFx0Y29udGV4dC5jaGVjayhkZWNsYXJlICE9PSB1bmRlZmluZWQsIGFjY2Vzc0xvYywgKCkgPT5cblx0XHRcdGBObyBzdWNoIGxvY2FsICR7Y29kZShuYW1lKX0uXFxuTG9jYWxzIGFyZTpcXG4ke2NvZGUobWFwS2V5cyhsb2NhbHMpLmpvaW4oJyAnKSl9LmApXG5cdFx0cmV0dXJuIGRlY2xhcmVcblx0fSxcblxuXHRsaW5lTmV3TG9jYWxzID0gbGluZSA9PlxuXHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ25TaW5nbGUgP1xuXHRcdFx0WyBsaW5lLmFzc2lnbmVlIF0gOlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIEFzc2lnbkRlc3RydWN0dXJlID9cblx0XHRcdGxpbmUuYXNzaWduZWVzIDpcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSA/XG5cdFx0XHRsaW5lTmV3TG9jYWxzKGxpbmUuYXNzaWduKSA6XG5cdFx0XHRbIF0sXG5cblx0dmVyaWZ5TGluZXMgPSBsaW5lcyA9PiB7XG5cdFx0Lypcblx0XHRXZSBuZWVkIHRvIGJldCBhbGwgYmxvY2sgbG9jYWxzIHVwLWZyb250IGJlY2F1c2Vcblx0XHRGdW5jdGlvbnMgd2l0aGluIGxpbmVzIGNhbiBhY2Nlc3MgbG9jYWxzIGZyb20gbGF0ZXIgbGluZXMuXG5cdFx0Tk9URTogV2UgcHVzaCB0aGVzZSBvbnRvIHBlbmRpbmdCbG9ja0xvY2FscyBpbiByZXZlcnNlXG5cdFx0c28gdGhhdCB3aGVuIHdlIGl0ZXJhdGUgdGhyb3VnaCBsaW5lcyBmb3J3YXJkcywgd2UgY2FuIHBvcCBmcm9tIHBlbmRpbmdCbG9ja0xvY2Fsc1xuXHRcdHRvIHJlbW92ZSBwZW5kaW5nIGxvY2FscyBhcyB0aGV5IGJlY29tZSByZWFsIGxvY2Fscy5cblx0XHRJdCBkb2Vzbid0IHJlYWxseSBtYXR0ZXIgd2hhdCBvcmRlciB3ZSBhZGQgbG9jYWxzIGluIHNpbmNlIGl0J3Mgbm90IGFsbG93ZWRcblx0XHR0byBoYXZlIHR3byBsb2NhbHMgb2YgdGhlIHNhbWUgbmFtZSBpbiB0aGUgc2FtZSBibG9jay5cblx0XHQqL1xuXHRcdGNvbnN0IG5ld0xvY2FscyA9IFsgXVxuXG5cdFx0Y29uc3QgZ2V0TGluZUxvY2FscyA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0d2l0aEluRGVidWcoKCkgPT4gZWFjaFJldmVyc2UobGluZS5saW5lcywgZ2V0TGluZUxvY2FscykpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVhY2hSZXZlcnNlKGxpbmVOZXdMb2NhbHMobGluZSksIF8gPT4ge1xuXHRcdFx0XHRcdC8vIFJlZ2lzdGVyIHRoZSBsb2NhbCBub3cuIENhbid0IHdhaXQgdW50aWwgdGhlIGFzc2lnbiBpcyB2ZXJpZmllZC5cblx0XHRcdFx0XHRyZWdpc3RlckxvY2FsKF8pXG5cdFx0XHRcdFx0bmV3TG9jYWxzLnB1c2goXylcblx0XHRcdFx0fSlcblx0XHR9XG5cdFx0ZWFjaFJldmVyc2UobGluZXMsIGdldExpbmVMb2NhbHMpXG5cdFx0cGVuZGluZ0Jsb2NrTG9jYWxzLnB1c2goLi4ubmV3TG9jYWxzKVxuXG5cdFx0Lypcblx0XHRLZWVwcyB0cmFjayBvZiBsb2NhbHMgd2hpY2ggaGF2ZSBhbHJlYWR5IGJlZW4gYWRkZWQgaW4gdGhpcyBibG9jay5cblx0XHRNYXNvbiBhbGxvd3Mgc2hhZG93aW5nLCBidXQgbm90IHdpdGhpbiB0aGUgc2FtZSBibG9jay5cblx0XHRTbywgdGhpcyBpcyBhbGxvd2VkOlxuXHRcdFx0YSA9IDFcblx0XHRcdGIgPVxuXHRcdFx0XHRhID0gMlxuXHRcdFx0XHQuLi5cblx0XHRCdXQgbm90OlxuXHRcdFx0YSA9IDFcblx0XHRcdGEgPSAyXG5cdFx0Ki9cblx0XHRjb25zdCB0aGlzQmxvY2tMb2NhbE5hbWVzID0gbmV3IFNldCgpXG5cblx0XHQvLyBBbGwgc2hhZG93ZWQgbG9jYWxzIGZvciB0aGlzIGJsb2NrLlxuXHRcdGNvbnN0IHNoYWRvd2VkID0gWyBdXG5cblx0XHRjb25zdCB2ZXJpZnlMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHQvLyBUT0RPOiBEbyBhbnl0aGluZyBpbiB0aGlzIHNpdHVhdGlvbj9cblx0XHRcdFx0Ly8gY29udGV4dC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdSZWR1bmRhbnQgYGRlYnVnYC4nKVxuXHRcdFx0XHR3aXRoSW5EZWJ1ZygoKSA9PiBsaW5lLmxpbmVzLmZvckVhY2godmVyaWZ5TGluZSkpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmVyaWZ5SXNTdGF0ZW1lbnQobGluZSlcblx0XHRcdFx0bGluZU5ld0xvY2FscyhsaW5lKS5mb3JFYWNoKG5ld0xvY2FsID0+IHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gbmV3TG9jYWwubmFtZVxuXHRcdFx0XHRcdGNvbnN0IG9sZExvY2FsID0gbG9jYWxzLmdldChuYW1lKVxuXHRcdFx0XHRcdGlmIChvbGRMb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCF0aGlzQmxvY2tMb2NhbE5hbWVzLmhhcyhuYW1lKSwgbmV3TG9jYWwubG9jLFxuXHRcdFx0XHRcdFx0XHQoKSA9PiBgQSBsb2NhbCAke2NvZGUobmFtZSl9IGlzIGFscmVhZHkgaW4gdGhpcyBibG9jay5gKVxuXHRcdFx0XHRcdFx0c2hhZG93ZWQucHVzaChvbGRMb2NhbClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpc0Jsb2NrTG9jYWxOYW1lcy5hZGQobmFtZSlcblx0XHRcdFx0XHRzZXRMb2NhbChuZXdMb2NhbClcblxuXHRcdFx0XHRcdC8vIE5vdyB0aGF0IGl0J3MgYWRkZWQgYXMgYSBsb2NhbCwgaXQncyBubyBsb25nZXIgcGVuZGluZy5cblx0XHRcdFx0XHQvLyBXZSBhZGRlZCBwZW5kaW5nQmxvY2tMb2NhbHMgaW4gdGhlIHJpZ2h0IG9yZGVyIHRoYXQgd2UgY2FuIGp1c3QgcG9wIHRoZW0gb2ZmLlxuXHRcdFx0XHRcdGNvbnN0IHBvcHBlZCA9IHBlbmRpbmdCbG9ja0xvY2Fscy5wb3AoKVxuXHRcdFx0XHRcdGFzc2VydChwb3BwZWQgPT09IG5ld0xvY2FsKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRsaW5lLnZlcmlmeSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKVxuXG5cdFx0bmV3TG9jYWxzLmZvckVhY2goZGVsZXRlTG9jYWwpXG5cdFx0c2hhZG93ZWQuZm9yRWFjaChfID0+IHNldExvY2FsKF8pKVxuXG5cdFx0cmV0dXJuIG5ld0xvY2Fsc1xuXHR9LFxuXG5cdHZlcmlmeUlzU3RhdGVtZW50ID0gbGluZSA9PiB7XG5cdFx0Y29uc3QgaXNTdGF0ZW1lbnQgPVxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIERvIHx8XG5cdFx0XHQvLyBTb21lIHZhbHVlcyBhcmUgYWxzbyBhY2NlcHRhYmxlLlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIENhbGwgfHxcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBZaWVsZCB8fFxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIFlpZWxkVG9cblx0XHRjb250ZXh0LmNoZWNrKGlzU3RhdGVtZW50LCBsaW5lLmxvYywgJ0V4cHJlc3Npb24gaW4gc3RhdGVtZW50IHBvc2l0aW9uLicpXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9