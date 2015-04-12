if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../CompileError", "../../Expression", "../Cx", "../Lang", "../Opts", "../U/util", "../U/Bag", "../U/Op", "../U/type", "../U/types", "../Vr"], function (exports, module, _CompileError, _Expression, _Cx, _Lang, _Opts, _UUtil, _UBag, _UOp, _UType, _UTypes, _Vr) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var code = _CompileError.code;
	var GlobalDeclare = _Expression.GlobalDeclare;
	var LocalDeclare = _Expression.LocalDeclare;
	var SubContext = _Cx.SubContext;
	var JsGlobals = _Lang.JsGlobals;

	var Opts = _interopRequire(_Opts);

	var assert = _UUtil.assert;
	var isEmpty = _UBag.isEmpty;
	var toArray = _UBag.toArray;

	var Op = _interopRequire(_UOp);

	var None = _UOp.None;
	var opIf = _UOp.opIf;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var ObjType = _UTypes.ObjType;

	var Vr = _interopRequire(_Vr);

	var emptyVr = _Vr.emptyVr;
	var VrLocalInfo = _Vr.VrLocalInfo;

	// Context used during verification.

	let Vx = (function (_SubContext) {
		function Vx(cx) {
			_classCallCheck(this, Vx);

			_get(Object.getPrototypeOf(Vx.prototype), "constructor", this).call(this, cx);
			this.locals = new Map();
			// Locals for this block.
			// Replaces `locals` when entering into sub-function.
			this.pendingBlockLocals = [];
			this.isInDebug = false;
			this.isInGenerator = false;
			this.opLoop = [];
			this.vr = emptyVr();
		}

		_inherits(Vx, _SubContext);

		_createClass(Vx, {
			allLocalNames: {

				// Getters

				value: function allLocalNames() {
					return this.locals.keys();
				}
			},
			withInGenerator: {

				// Modifiers

				value: function withInGenerator(isInGenerator, fun) {
					const g = this.isInGenerator;
					this.isInGenerator = isInGenerator;
					fun();
					this.isInGenerator = g;
				}
			},
			plusLocals: {
				value: function plusLocals(addedLocals, fun) {
					var _this = this;

					type(addedLocals, [LocalDeclare]);
					const shadowed = new Map();
					addedLocals.forEach(function (l) {
						const got = _this.locals.get(l.name);
						if (got !== undefined) shadowed.set(l.name, got);
						_this.locals.set(l.name, l);
					});
					fun();
					addedLocals.forEach(function (l) {
						_this.locals.delete(l.name);
						const s = shadowed.get(l.name);
						if (s !== undefined) _this.locals.set(l.name, s);
					});
				}
			},
			plusPendingBlockLocals: {
				value: function plusPendingBlockLocals(pending, fun) {
					var _pendingBlockLocals;

					const oldLength = this.pendingBlockLocals.length;
					(_pendingBlockLocals = this.pendingBlockLocals).push.apply(_pendingBlockLocals, _toConsumableArray(pending));
					fun();
					while (this.pendingBlockLocals.length > oldLength) this.pendingBlockLocals.pop();
				}
			},
			withInLoop: {
				value: function withInLoop(loop, fun) {
					const l = this.opLoop;
					this.opLoop = some(loop);
					fun();
					this.opLoop = l;
				}
			},
			withInDebug: {
				value: function withInDebug(isInDebug, fun) {
					const d = this.isInDebug;
					this.isInDebug = isInDebug;
					fun();
					this.isInDebug = d;
				}
			},
			withRes: {
				value: function withRes(loc, fun) {
					// TODO: Bad idea to be creating new E at this point...
					const res = LocalDeclare.res(loc);
					this.registerLocal(res);
					return this.plusLocals([res], fun);
				}
			},
			withBlockLocals: {
				value: function withBlockLocals(fun) {
					const bl = this.pendingBlockLocals;
					this.pendingBlockLocals = [];
					this.plusLocals(bl, fun);
					this.pendingBlockLocals = bl;
				}
			},
			setEndLoop: {

				// Vr setters

				value: function setEndLoop(endLoop, loop) {
					this.vr.endLoopToLoop.set(endLoop, loop);
				}
			},
			setEIsInGenerator: {
				// TODO: Better name

				value: function setEIsInGenerator(e) {
					this.vr.setEIsInGenerator(e, this.isInGenerator);
				}
			},
			registerLocal: {
				value: function registerLocal(local) {
					type(local, LocalDeclare);
					assert(!this.vr.localToInfo.has(local));
					this.vr.localToInfo.set(local, VrLocalInfo({
						isInDebug: this.isInDebug,
						debugAccesses: [],
						nonDebugAccesses: []
					}));
				}
			},
			localAccess: {
				value: function localAccess(access) {
					const name = access.name;
					const local = this.locals.get(name);
					if (local !== undefined) {
						this.vr.accessToLocal.set(access, local);
						const info = this.vr.localToInfo.get(local);
						const accesses = this.isInDebug ? info.debugAccesses : info.nonDebugAccesses;
						accesses.push(access);
					} else this.fail(access.loc, "Could not find local or global " + code(name) + ".\n" + "Available locals are:\n" + ("" + code(toArray(this.allLocalNames()).join(" ")) + "."));
				}
			}
		});

		return Vx;
	})(SubContext);

	module.exports = Vx;
});
//# sourceMappingURL=../../../../meta/compile/private/verify/Vx.js.map