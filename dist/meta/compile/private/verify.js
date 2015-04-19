if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', '../Expression', './U/Bag', './U/Op', './U/type', './U/util', './Vr'], function (exports, module, _CompileError, _Expression, _UBag, _UOp, _UType, _UUtil, _Vr) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	module.exports = verify;

	var _Expression2 = _interopRequire(_Expression);

	var _type = _interopRequire(_UType);

	const vm = function (es) {
		return es.forEach(function (e) {
			return e.verify();
		});
	};

	let cx, locals,
	// Locals for this block.
	// Replaces `locals` when entering into sub-function.
	pendingBlockLocals, isInDebug, isInGenerator, opLoop, vr;

	const init = function (_cx) {
		cx = _cx;
		locals = new Map();
		pendingBlockLocals = [];
		isInDebug = false;
		isInGenerator = false;
		opLoop = [];
		vr = _Vr.emptyVr();
	},
	     
	// Release for garbage collection
	uninit = function () {
		locals = pendingBlockLocals = opLoop = vr = undefined;
	},
	      withInGenerator = function (_isInGenerator, fun) {
		const g = isInGenerator;
		isInGenerator = _isInGenerator;
		fun();
		isInGenerator = g;
	},
	      plusLocals = function (addedLocals, fun) {
		const shadowed = new Map();
		addedLocals.forEach(function (l) {
			const got = locals.get(l.name);
			if (got !== undefined) shadowed.set(l.name, got);
			locals.set(l.name, l);
		});
		fun();
		addedLocals.forEach(function (l) {
			const s = shadowed.get(l.name);
			if (s === undefined) locals.delete(l.name);else locals.set(l.name, s);
		});
	},
	      plusPendingBlockLocals = function (pending, fun) {
		const oldLength = pendingBlockLocals.length;
		pendingBlockLocals.push.apply(pendingBlockLocals, _toConsumableArray(pending));
		fun();
		while (pendingBlockLocals.length > oldLength) pendingBlockLocals.pop();
	},
	      withInLoop = function (loop, fun) {
		const l = opLoop;
		opLoop = _UOp.some(loop);
		fun();
		opLoop = l;
	},
	      withInDebug = function (_isInDebug, fun) {
		const d = isInDebug;
		isInDebug = _isInDebug;
		fun();
		isInDebug = d;
	},
	      withBlockLocals = function (fun) {
		const bl = pendingBlockLocals;
		pendingBlockLocals = [];
		plusLocals(bl, fun);
		pendingBlockLocals = bl;
	},
	     

	// Vr setters
	setEndLoop = function (endLoop, loop) {
		vr.endLoopToLoop.set(endLoop, loop);
	},
	      registerLocal = function (local) {
		vr.localToInfo.set(local, _Vr.VrLocalInfo(isInDebug, [], []));
	};

	function verify(cx, e) {
		init(cx);
		e.verify();
		verifyLocalUse();
		const out = vr;
		uninit();
		return out;
	}

	const verifyLocalUse = function () {
		vr.localToInfo.forEach(function (info, local) {
			const noNonDebug = _UBag.isEmpty(info.nonDebugAccesses);
			if (noNonDebug && _UBag.isEmpty(info.debugAccesses)) cx.warnIf(!local.okToNotUse, local.loc, function () {
				return 'Unused local variable ' + _CompileError.code(local.name) + '.';
			});else if (info.isInDebug) cx.check(noNonDebug, function () {
				return _UBag.head(info.nonDebugAccesses).loc;
			}, function () {
				return 'Debug-only local ' + _CompileError.code(local.name) + ' used outside of debug.';
			});else cx.warnIf(!local.okToNotUse && noNonDebug, local.loc, function () {
				return 'Local ' + _CompileError.code(local.name) + ' used only in debug.';
			});
		});
	};

	_UUtil.implementMany(_Expression, 'verify', {
		Assign: function () {
			var _this = this;

			const doV = function () {
				return vm([_this.assignee, _this.value]);
			};
			if (this.assignee.isLazy) withBlockLocals(doV);else doV();
		},
		BlockDo: function () {
			verifyLines(this.lines);
		},
		BlockVal: function () {
			var _this2 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this2.returned.verify();
			});
		},
		BlockWrap: function () {
			this.block.verify();
		},
		CaseDo: verifyCase,
		CaseVal: verifyCase,
		// Only reach here for in/out condition
		Debug: function () {
			verifyLines([this]);
		},
		EndLoop: function () {
			var _this3 = this;

			_UOp.ifElse(opLoop, function (loop) {
				return setEndLoop(_this3, loop);
			}, function () {
				return cx.fail(_this3.loc, 'Not in a loop.');
			});
		},
		Fun: function () {
			var _this4 = this;

			withBlockLocals(function () {
				cx.check(_UBag.isEmpty(_this4.opResDeclare) || _this4.block instanceof _Expression.BlockVal, _this4.loc, 'Function with return condition must return something.');
				_this4.args.forEach(function (arg) {
					return vm(arg.opType);
				});
				withInGenerator(_this4.k === '~|', function () {
					const allArgs = _this4.args.concat(_this4.opRestArg);
					allArgs.forEach(function (_) {
						return registerLocal(_);
					});
					plusLocals(allArgs, function () {
						vm(_this4.opIn);
						_this4.block.verify();
						_this4.opResDeclare.forEach(function (rd) {
							rd.verify();
							registerLocal(rd);
						});
						_this4.opOut.forEach(function (o) {
							return plusLocals(_this4.opResDeclare, function () {
								return o.verify();
							});
						});
					});
				});
			});
		},
		LocalAccess: function () {
			const local = locals.get(this.name);
			if (local !== undefined) {
				vr.accessToLocal.set(this, local);
				const info = vr.localToInfo.get(local);
				const accesses = isInDebug ? info.debugAccesses : info.nonDebugAccesses;
				accesses.push(this);
			} else cx.fail(this.loc, 'Could not find local or global ' + _CompileError.code(this.name) + '.\n' + 'Available locals are:\n' + ('' + _CompileError.code(_UBag.mapKeys(locals).join(' ')) + '.'));
		},
		Loop: function () {
			var _this5 = this;

			withInLoop(this, function () {
				return _this5.block.verify();
			});
		},
		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare: function () {
			vm(this.opType);
		},
		MapEntry: function () {
			this.key.verify();
			this.val.verify();
		},
		Module: function () {
			var _this6 = this;

			const useLocals = verifyUses(this.uses, this.debugUses);
			plusLocals(useLocals, function () {
				return _this6.block.verify();
			});
		},
		Yield: function () {
			cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yielded.verify();
		},
		YieldTo: function () {
			cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yieldedTo.verify();
		},

		// These ones just recurse to their children.
		AssignDestructure: function () {
			this.value.verify();
			vm(this.assignees);
		},
		Call: function () {
			this.called.verify();
			vm(this.args);
		},
		CaseDoPart: verifyCasePart,
		CaseValPart: verifyCasePart,
		GlobalAccess: function () {},
		ObjReturn: function () {
			vm(this.opObjed);
		},
		ObjSimple: function () {
			var _this7 = this;

			Object.getOwnPropertyNames(this.keysVals).forEach(function (key) {
				return _this7.keysVals[key].verify();
			});
		},
		Lazy: function () {
			var _this8 = this;

			withBlockLocals(function () {
				return _this8.value.verify();
			});
		},
		ListReturn: function () {},
		ListEntry: function () {
			this.value.verify();
		},
		ListSimple: function () {
			vm(this.parts);
		},
		ELiteral: function () {
			cx.warnIf(this.k === 'js', this.loc, 'Js literal');
		},
		MapReturn: function () {},
		Member: function () {
			this.object.verify();
		},
		ModuleDefaultExport: function () {
			this.value.verify();
		},
		Quote: function () {
			vm(this.parts);
		},
		Special: function () {},
		Splat: function () {
			this.splatted.verify();
		}
	});

	function verifyCase() {
		var _this9 = this;

		const newLocals = [];
		this.opCased.forEach(function (cased) {
			registerLocal(cased.assignee);
			cased.verify();
			newLocals.push(cased.assignee);
		});
		plusLocals(newLocals, function () {
			vm(_this9.parts);
			vm(_this9.opElse);
		});
	}

	function verifyCasePart() {
		this.test.verify();
		this.result.verify();
	}

	function verifyUses(uses, debugUses) {
		const useLocals = [];
		uses.forEach(function (use) {
			if (!(use instanceof _Expression.UseDo)) {
				_type(use, _Expression.Use);
				use.used.concat(use.opUseDefault).forEach(function (_) {
					registerLocal(_);
					useLocals.push(_);
				});
			}
		});
		withInDebug(true, function () {
			return debugUses.forEach(function (use) {
				return use.used.concat(use.opUseDefault).forEach(function (_) {
					registerLocal(_);
					useLocals.push(_);
				});
			});
		});
		return useLocals;
	}

	function verifyLines(lines) {
		const lineToLocals = new Map();
		let prevLocals = [];
		let allNewLocals = [];

		function processLine(line) {
			if (line instanceof _Expression.Debug)
				// TODO: Do anything in this situation?
				// cx.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(true, function () {
					return line.lines.forEach(processLine);
				});else {
				verifyIsStatement(line);
				const lineNews = lineNewLocals(line);
				prevLocals.forEach(function (prevLocal) {
					return lineNews.forEach(function (newLocal) {
						return cx.check(prevLocal.name !== newLocal.name, newLocal.loc, '' + _CompileError.code(newLocal.name) + ' already declared at ' + prevLocal.loc.start);
					});
				});
				lineNews.forEach(function (_) {
					return registerLocal(_);
				});
				const newLocals = prevLocals.concat(lineNews);
				lineToLocals.set(line, prevLocals);
				prevLocals = newLocals;
				// Final set value is answer
				allNewLocals = newLocals;
			}
		}

		lines.forEach(processLine);

		function verifyLine(line) {
			if (line instanceof _Expression.Debug) withInDebug(true, function () {
				return line.lines.forEach(verifyLine);
			});else plusLocals(lineToLocals.get(line), function () {
				return plusPendingBlockLocals(allNewLocals, function () {
					return line.verify();
				});
			});
		}

		lines.forEach(verifyLine);

		return allNewLocals;
	}

	function verifyIsStatement(line) {
		switch (true) {
			case line instanceof _Expression.Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof _Expression.Call:
			case line instanceof _Expression.ELiteral && line.k === 'js':
			case line instanceof _Expression.Special && line.k === 'debugger':
			// OK, used to mean `pass`
			case line instanceof _Expression.GlobalAccess && line.name === 'null':
			case line instanceof _Expression.Yield:
			case line instanceof _Expression.YieldTo:
				return;
			default:
				cx.fail(line.loc, 'Expression in statement position.');
		}
	}

	function lineNewLocals(line) {
		_type(line, _Expression2);
		return line instanceof _Expression.Assign ? [line.assignee] : line instanceof _Expression.AssignDestructure ? line.assignees : [];
	}
});
//# sourceMappingURL=../../../meta/compile/private/verify.js.map