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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0EsT0FBTSxFQUFFLEdBQUcsUUFGRixPQUFPLENBRUcsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNoQyxlQUFhLEVBQUUsR0FBRzs7QUFFbEIsYUFBVyxFQUFFLEdBQUc7QUFDaEIsZUFBYSxFQUFFLEdBQUc7RUFDbEIsQ0FBQyxDQUFBO21CQUNhLEVBQUU7QUFFVixPQUFNLE9BQU8sR0FBRztTQUFNLEVBQUUsQ0FBQztBQUMvQixnQkFBYSxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ3hCLGNBQVcsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUN0QixnQkFBYSxFQUFFLElBQUksR0FBRyxFQUFFO0dBQ3hCLENBQUM7RUFBQSxDQUFBOztTQUpXLE9BQU8sR0FBUCxPQUFPO0FBTWIsT0FBTSxXQUFXLEdBQUcsT0FBTSxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFDNUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQW5CakMsV0FBVyxDQW1CbUMsRUFBRSxrQkFBa0IsRUFBRSxhQW5CcEUsV0FBVyxDQW1Cc0UsQ0FBRSxDQUFDLENBQUE7O1NBRGhGLFdBQVcsR0FBWCxXQUFXO0FBR3hCLE9BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUMzQixZQUFVLEVBQUEsVUFBQyxLQUFLLEVBQUU7QUFDakIsU0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEMsVUFBTyxFQUFFLE1BdkJGLE9BQU8sQ0F1QkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BdkJqQyxPQUFPLENBdUJrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7R0FDdkU7RUFDRCxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVnIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHVwbGUgZnJvbSAnZXNhc3QvZGlzdC9wcml2YXRlL3R1cGxlJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vVS9CYWcnXG5pbXBvcnQgeyBPYmpUeXBlIH0gZnJvbSAnLi9VL3R5cGVzJ1xuXG5jb25zdCBWciA9IE9ialR5cGUoJ1ZyJywgT2JqZWN0LCB7XG5cdGFjY2Vzc1RvTG9jYWw6IE1hcCxcblx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvXG5cdGxvY2FsVG9JbmZvOiBNYXAsXG5cdGVuZExvb3BUb0xvb3A6IE1hcFxufSlcbmV4cG9ydCBkZWZhdWx0IFZyXG5cbmV4cG9ydCBjb25zdCBlbXB0eVZyID0gKCkgPT4gVnIoe1xuXHRhY2Nlc3NUb0xvY2FsOiBuZXcgTWFwKCksXG5cdGxvY2FsVG9JbmZvOiBuZXcgTWFwKCksXG5cdGVuZExvb3BUb0xvb3A6IG5ldyBNYXAoKVxufSlcblxuZXhwb3J0IGNvbnN0IFZyTG9jYWxJbmZvID0gdHVwbGUoJ1ZyTG9jYWxJbmZvJywgT2JqZWN0LCAnZG9jJyxcblx0WyAnaXNJbkRlYnVnJywgQm9vbGVhbiwgJ2RlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdLCAnbm9uRGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10gXSlcblxuT2JqZWN0LmFzc2lnbihWci5wcm90b3R5cGUsIHtcblx0aXNBY2Nlc3NlZChsb2NhbCkge1xuXHRcdGNvbnN0IGluZm8gPSB0aGlzLmxvY2FsVG9JbmZvLmdldChsb2NhbClcblx0XHRyZXR1cm4gIShpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykgJiYgaXNFbXB0eShpbmZvLm5vbkRlYnVnQWNjZXNzZXMpKVxuXHR9XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=