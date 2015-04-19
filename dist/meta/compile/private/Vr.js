if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../Expression', './U/Bag', './U/types'], function (exports, _Expression, _UBag, _UTypes) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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
	const VrLocalInfo = _UTypes.tuple(Object, 'isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]);

	exports.VrLocalInfo = VrLocalInfo;
	Object.assign(Vr.prototype, {
		isAccessed: function (local) {
			const info = this.localToInfo.get(local);
			return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
		}
	});
});
//# sourceMappingURL=../../../meta/compile/private/Vr.js.map