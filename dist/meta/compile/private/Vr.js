if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/private/tuple', '../Expression', './U/Bag', './U/types'], function (exports, _esastDistPrivateTuple, _Expression, _UBag, _UTypes) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tuple = _interopRequire(_esastDistPrivateTuple);

	const Vr = _UTypes.ObjType('Vr', Object, {
		accessToLocal: Map,
		// LocalDeclare -> VrLocalInfo
		localToInfo: Map,
		endLoopToLoop: Map
	});
	exports.default = Vr;
	const emptyVr = function () {
		return Vr({
			accessToLocal: new Map(),
			localToInfo: new Map(),
			endLoopToLoop: new Map()
		});
	};

	exports.emptyVr = emptyVr;
	const VrLocalInfo = _tuple('VrLocalInfo', Object, 'doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);

	exports.VrLocalInfo = VrLocalInfo;
	Object.assign(Vr.prototype, {
		isAccessed: function (local) {
			const info = this.localToInfo.get(local);
			return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
		}
	});
});
//# sourceMappingURL=../../../meta/compile/private/Vr.js.map