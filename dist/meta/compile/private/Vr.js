if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../Expression', './U/Bag'], function (exports, _tuplDistTupl, _Expression, _UBag) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztLQUlxQixFQUFFO0FBQ1gsV0FEUyxFQUFFLEdBQ1I7eUJBRE0sRUFBRTs7QUFFckIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDNUIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRTdCLE9BQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtHQUMvQjs7ZUFWbUIsRUFBRTs7VUFZWixvQkFBQyxLQUFLLEVBQUU7QUFDakIsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEMsV0FBTyxFQUFFLE1BaEJGLE9BQU8sQ0FnQkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BaEJqQyxPQUFPLENBZ0JrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7SUFDdkU7OztVQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDeEIsV0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQzs7O1VBRVksdUJBQUMsUUFBUSxFQUFFO0FBQ3ZCLFdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDeEM7OztTQXZCbUIsRUFBRTs7O21CQUFGLEVBQUU7QUEwQmhCLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ2hFLENBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUE5QmpDLFdBQVcsQ0E4Qm1DLEVBQUUsa0JBQWtCLEVBQUUsYUE5QnBFLFdBQVcsQ0E4QnNFLENBQUUsQ0FBQyxDQUFBO1NBRGhGLFdBQVcsR0FBWCxXQUFXIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0Ly90dXBsJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vVS9CYWcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5hY2Nlc3NUb0xvY2FsID0gbmV3IE1hcCgpXG5cdFx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvXG5cdFx0dGhpcy5sb2NhbFRvSW5mbyA9IG5ldyBNYXAoKVxuXHRcdHRoaXMuZW5kTG9vcFRvTG9vcCA9IG5ldyBNYXAoKVxuXHRcdC8vIExpc3RFbnRyeSAvIE1hcEVudHJ5IC0+IGluZGV4XG5cdFx0dGhpcy5lbnRyeVRvSW5kZXggPSBuZXcgTWFwKClcblx0XHQvLyBMaXN0UmV0dXJuIC8gTWFwUmV0dXJuIC0+ICMgZW50cmllc1xuXHRcdHRoaXMucmV0dXJuVG9MZW5ndGggPSBuZXcgTWFwKClcblx0fVxuXG5cdGlzQWNjZXNzZWQobG9jYWwpIHtcblx0XHRjb25zdCBpbmZvID0gdGhpcy5sb2NhbFRvSW5mby5nZXQobG9jYWwpXG5cdFx0cmV0dXJuICEoaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpICYmIGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKSlcblx0fVxuXG5cdGxpc3RNYXBFbnRyeUluZGV4KGVudHJ5KSB7XG5cdFx0cmV0dXJuIHRoaXMuZW50cnlUb0luZGV4LmdldChlbnRyeSlcblx0fVxuXG5cdGxpc3RNYXBMZW5ndGgocmV0dXJuZXIpIHtcblx0XHRyZXR1cm4gdGhpcy5yZXR1cm5Ub0xlbmd0aC5nZXQocmV0dXJuZXIpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFZyTG9jYWxJbmZvID0gdHVwbCgnVnJMb2NhbEluZm8nLCBPYmplY3QsICdUT0RPOmRvYycsXG5cdFsgJ2lzSW5EZWJ1ZycsIEJvb2xlYW4sICdkZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSwgJ25vbkRlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdIF0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==