if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../Expression', './U/Bag', './U/type', './U/util', './U/types'], function (exports, _Expression, _UBag, _UType, _UUtil, _UTypes) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Expression2 = _interopRequire(_Expression);

	var _type = _interopRequire(_UType);

	const Vr = _UTypes.ObjType('Vr', Object, {
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
	const VrLocalInfo = _UTypes.ObjType('LocalInfo', Object, {
		isInDebug: Boolean,
		debugAccesses: [_Expression.LocalAccess],
		nonDebugAccesses: [_Expression.LocalAccess]
	});

	exports.VrLocalInfo = VrLocalInfo;
	Object.assign(Vr.prototype, {
		setEIsInGenerator: function (e, is) {
			_type(e, _Expression2, is, Boolean);
			_UUtil.assert(botherWithIsInGenerator(e));
			this.eToIsInGenerator.set(e, is);
		},
		eIsInGenerator: function (e) {
			_UUtil.assert(botherWithIsInGenerator(e));
			_UUtil.assert(this.eToIsInGenerator.has(e));
			return this.eToIsInGenerator.get(e);
		},
		isAccessed: function (local) {
			const info = this.localToInfo.get(local);
			return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
		}
	});

	const botherWithIsInGenerator = function (e) {
		return e instanceof _Expression.CaseVal || e instanceof _Expression.BlockWrap;
	};
});
//# sourceMappingURL=../../../meta/compile/private/Vr.js.map