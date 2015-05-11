if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../Expression', './U/Bag', './U/types'], function (exports, _tuplDistTupl, _Expression, _UBag, _UTypes) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _tupl = _interopRequire(_tuplDistTupl);

	let Vr = (function () {
		function Vr() {
			_classCallCheck(this, Vr);

			this.accessToLocal = new Map();
			// LocalDeclare -> VrLocalInfo
			this.localToInfo = new Map();
			this.endLoopToLoop = new Map();
			// ListEntry / MapEntry -> index
			this.entryToIndex = new Map();
			// ListReturn / MapReturn -> # entries
			this.returnToLength = new Map();
		}

		_createClass(Vr, [{
			key: 'isAccessed',
			value: function isAccessed(local) {
				const info = this.localToInfo.get(local);
				return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
			}
		}, {
			key: 'listMapEntryIndex',
			value: function listMapEntryIndex(entry) {
				return this.entryToIndex.get(entry);
			}
		}, {
			key: 'listMapLength',
			value: function listMapLength(returner) {
				return this.returnToLength.get(returner);
			}
		}]);

		return Vr;
	})();

	exports.default = Vr;
	const VrLocalInfo = _tupl('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);
	exports.VrLocalInfo = VrLocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztLQUtxQixFQUFFO0FBQ1gsV0FEUyxFQUFFLEdBQ1I7eUJBRE0sRUFBRTs7QUFFckIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDNUIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRTdCLE9BQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtHQUMvQjs7ZUFWbUIsRUFBRTs7VUFZWixvQkFBQyxLQUFLLEVBQUU7QUFDakIsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEMsV0FBTyxFQUFFLE1BakJGLE9BQU8sQ0FpQkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BakJqQyxPQUFPLENBaUJrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7SUFDdkU7OztVQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDeEIsV0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQzs7O1VBRVksdUJBQUMsUUFBUSxFQUFFO0FBQ3ZCLFdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDeEM7OztTQXZCbUIsRUFBRTs7O21CQUFGLEVBQUU7QUEwQmhCLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ2hFLENBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUEvQmpDLFdBQVcsQ0ErQm1DLEVBQUUsa0JBQWtCLEVBQUUsYUEvQnBFLFdBQVcsQ0ErQnNFLENBQUUsQ0FBQyxDQUFBO1NBRGhGLFdBQVcsR0FBWCxXQUFXIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0Ly90dXBsJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vVS9CYWcnXG5pbXBvcnQgeyBPYmpUeXBlIH0gZnJvbSAnLi9VL3R5cGVzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuYWNjZXNzVG9Mb2NhbCA9IG5ldyBNYXAoKVxuXHRcdC8vIExvY2FsRGVjbGFyZSAtPiBWckxvY2FsSW5mb1xuXHRcdHRoaXMubG9jYWxUb0luZm8gPSBuZXcgTWFwKClcblx0XHR0aGlzLmVuZExvb3BUb0xvb3AgPSBuZXcgTWFwKClcblx0XHQvLyBMaXN0RW50cnkgLyBNYXBFbnRyeSAtPiBpbmRleFxuXHRcdHRoaXMuZW50cnlUb0luZGV4ID0gbmV3IE1hcCgpXG5cdFx0Ly8gTGlzdFJldHVybiAvIE1hcFJldHVybiAtPiAjIGVudHJpZXNcblx0XHR0aGlzLnJldHVyblRvTGVuZ3RoID0gbmV3IE1hcCgpXG5cdH1cblxuXHRpc0FjY2Vzc2VkKGxvY2FsKSB7XG5cdFx0Y29uc3QgaW5mbyA9IHRoaXMubG9jYWxUb0luZm8uZ2V0KGxvY2FsKVxuXHRcdHJldHVybiAhKGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSAmJiBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3NlcykpXG5cdH1cblxuXHRsaXN0TWFwRW50cnlJbmRleChlbnRyeSkge1xuXHRcdHJldHVybiB0aGlzLmVudHJ5VG9JbmRleC5nZXQoZW50cnkpXG5cdH1cblxuXHRsaXN0TWFwTGVuZ3RoKHJldHVybmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMucmV0dXJuVG9MZW5ndGguZ2V0KHJldHVybmVyKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBWckxvY2FsSW5mbyA9IHR1cGwoJ1ZyTG9jYWxJbmZvJywgT2JqZWN0LCAnVE9ETzpkb2MnLFxuXHRbICdpc0luRGVidWcnLCBCb29sZWFuLCAnZGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10sICdub25EZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSBdKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=