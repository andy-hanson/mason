if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../Expression", "./U/Bag", "./U/type", "./U/util", "./U/types"], function (exports, _Expression, _UBag, _UType, _UUtil, _UTypes) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var Expression = _interopRequire(_Expression);

	var BlockWrap = _Expression.BlockWrap;
	var CaseVal = _Expression.CaseVal;
	var LocalAccess = _Expression.LocalAccess;
	var isEmpty = _UBag.isEmpty;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var ObjType = _UTypes.ObjType;

	const Vr = ObjType("Vr", Object, {
		accessToLocal: Map,
		// LocalDeclare -> VrLocalInfo
		localToInfo: Map,
		eToIsInGenerator: Map,
		endLoopToLoop: Map
	});
	exports.default = Vr;
	const emptyVr = function () {
		return Vr({
			accessToLocal: new Map(),
			localToInfo: new Map(),
			eToIsInGenerator: new Map(),
			endLoopToLoop: new Map()
		});
	};

	exports.emptyVr = emptyVr;
	const VrLocalInfo = ObjType("LocalInfo", Object, {
		isInDebug: Boolean,
		debugAccesses: [LocalAccess],
		nonDebugAccesses: [LocalAccess]
	});

	exports.VrLocalInfo = VrLocalInfo;
	Object.assign(Vr.prototype, {
		setEIsInGenerator: function (e, is) {
			type(e, Expression, is, Boolean);
			assert(botherWithIsInGenerator(e));
			this.eToIsInGenerator.set(e, is);
		},
		eIsInGenerator: function (e) {
			assert(botherWithIsInGenerator(e));
			assert(this.eToIsInGenerator.has(e));
			return this.eToIsInGenerator.get(e);
		},
		isAccessed: function (local) {
			const info = this.localToInfo.get(local);
			return !(isEmpty(info.debugAccesses) && isEmpty(info.nonDebugAccesses));
		}
	});

	const botherWithIsInGenerator = function (e) {
		return e instanceof CaseVal || e instanceof BlockWrap;
	};
});
//# sourceMappingURL=../../../meta/compile/private/Vr.js.map