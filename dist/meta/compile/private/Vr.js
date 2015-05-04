if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../Expression', './U/Bag', './U/types'], function (exports, _tuplDistTupl, _Expression, _UBag, _UTypes) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _tupl = _interopRequire(_tuplDistTupl);

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
	const VrLocalInfo = _tupl('VrLocalInfo', Object, 'doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);

	exports.VrLocalInfo = VrLocalInfo;
	Object.assign(Vr.prototype, {
		isAccessed: function (local) {
			const info = this.localToInfo.get(local);
			return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0EsT0FBTSxFQUFFLEdBQUcsUUFGRixPQUFPLENBRUcsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNoQyxlQUFhLEVBQUUsR0FBRzs7QUFFbEIsYUFBVyxFQUFFLEdBQUc7QUFDaEIsZUFBYSxFQUFFLEdBQUc7RUFDbEIsQ0FBQyxDQUFBO21CQUNhLEVBQUU7QUFFVixPQUFNLE9BQU8sR0FBRztTQUFNLEVBQUUsQ0FBQztBQUMvQixnQkFBYSxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ3hCLGNBQVcsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUN0QixnQkFBYSxFQUFFLElBQUksR0FBRyxFQUFFO0dBQ3hCLENBQUM7RUFBQSxDQUFBOztTQUpXLE9BQU8sR0FBUCxPQUFPO0FBTWIsT0FBTSxXQUFXLEdBQUcsTUFBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFDM0QsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQW5CakMsV0FBVyxDQW1CbUMsRUFBRSxrQkFBa0IsRUFBRSxhQW5CcEUsV0FBVyxDQW1Cc0UsQ0FBRSxDQUFDLENBQUE7O1NBRGhGLFdBQVcsR0FBWCxXQUFXO0FBR3hCLE9BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUMzQixZQUFVLEVBQUEsVUFBQyxLQUFLLEVBQUU7QUFDakIsU0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEMsVUFBTyxFQUFFLE1BdkJGLE9BQU8sQ0F1QkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BdkJqQyxPQUFPLENBdUJrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7R0FDdkU7RUFDRCxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVnIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvL3R1cGwnXG5pbXBvcnQgeyBMb2NhbEFjY2VzcyB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi9VL0JhZydcbmltcG9ydCB7IE9ialR5cGUgfSBmcm9tICcuL1UvdHlwZXMnXG5cbmNvbnN0IFZyID0gT2JqVHlwZSgnVnInLCBPYmplY3QsIHtcblx0YWNjZXNzVG9Mb2NhbDogTWFwLFxuXHQvLyBMb2NhbERlY2xhcmUgLT4gVnJMb2NhbEluZm9cblx0bG9jYWxUb0luZm86IE1hcCxcblx0ZW5kTG9vcFRvTG9vcDogTWFwXG59KVxuZXhwb3J0IGRlZmF1bHQgVnJcblxuZXhwb3J0IGNvbnN0IGVtcHR5VnIgPSAoKSA9PiBWcih7XG5cdGFjY2Vzc1RvTG9jYWw6IG5ldyBNYXAoKSxcblx0bG9jYWxUb0luZm86IG5ldyBNYXAoKSxcblx0ZW5kTG9vcFRvTG9vcDogbmV3IE1hcCgpXG59KVxuXG5leHBvcnQgY29uc3QgVnJMb2NhbEluZm8gPSB0dXBsKCdWckxvY2FsSW5mbycsIE9iamVjdCwgJ2RvYycsXG5cdFsgJ2lzSW5EZWJ1ZycsIEJvb2xlYW4sICdkZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSwgJ25vbkRlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdIF0pXG5cbk9iamVjdC5hc3NpZ24oVnIucHJvdG90eXBlLCB7XG5cdGlzQWNjZXNzZWQobG9jYWwpIHtcblx0XHRjb25zdCBpbmZvID0gdGhpcy5sb2NhbFRvSW5mby5nZXQobG9jYWwpXG5cdFx0cmV0dXJuICEoaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpICYmIGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKSlcblx0fVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9