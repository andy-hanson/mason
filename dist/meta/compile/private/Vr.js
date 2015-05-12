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
			// TODO:ES6 Can use do `export { a, b, ... }` at the end, so shouldn't need this.
			// Includes both Assigns and AssignDestructures.
			this.exportAssigns = new Set();
		}

		_createClass(Vr, [{
			key: 'isDebugLocal',
			value: function isDebugLocal(localDeclare) {
				return this.localToInfo.get(localDeclare).isInDebug;
			}
		}, {
			key: 'isAccessed',
			value: function isAccessed(localDeclare) {
				const info = this.localToInfo.get(localDeclare);
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
		}, {
			key: 'isExportAssign',
			value: function isExportAssign(assign) {
				return this.exportAssigns.has(assign);
			}
		}]);

		return Vr;
	})();

	exports.default = Vr;
	const VrLocalInfo = _tupl('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);
	exports.VrLocalInfo = VrLocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztLQUlxQixFQUFFO0FBQ1gsV0FEUyxFQUFFLEdBQ1I7eUJBRE0sRUFBRTs7QUFFckIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDNUIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU5QixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRTdCLE9BQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7O0FBRy9CLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtHQUM5Qjs7ZUFibUIsRUFBRTs7VUFlVixzQkFBQyxZQUFZLEVBQUU7QUFDMUIsV0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFDbkQ7OztVQUVTLG9CQUFDLFlBQVksRUFBRTtBQUN4QixVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUMvQyxXQUFPLEVBQUUsTUF2QkYsT0FBTyxDQXVCRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksTUF2QmpDLE9BQU8sQ0F1QmtDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtJQUN2RTs7O1VBRWdCLDJCQUFDLEtBQUssRUFBRTtBQUN4QixXQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25DOzs7VUFFWSx1QkFBQyxRQUFRLEVBQUU7QUFDdkIsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN4Qzs7O1VBRWEsd0JBQUMsTUFBTSxFQUFFO0FBQ3RCLFdBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckM7OztTQWxDbUIsRUFBRTs7O21CQUFGLEVBQUU7QUFxQ2hCLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ2hFLENBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUF6Q2pDLFdBQVcsQ0F5Q21DLEVBQUUsa0JBQWtCLEVBQUUsYUF6Q3BFLFdBQVcsQ0F5Q3NFLENBQUUsQ0FBQyxDQUFBO1NBRGhGLFdBQVcsR0FBWCxXQUFXIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1ZyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0Ly90dXBsJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vVS9CYWcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5hY2Nlc3NUb0xvY2FsID0gbmV3IE1hcCgpXG5cdFx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvXG5cdFx0dGhpcy5sb2NhbFRvSW5mbyA9IG5ldyBNYXAoKVxuXHRcdHRoaXMuZW5kTG9vcFRvTG9vcCA9IG5ldyBNYXAoKVxuXHRcdC8vIExpc3RFbnRyeSAvIE1hcEVudHJ5IC0+IGluZGV4XG5cdFx0dGhpcy5lbnRyeVRvSW5kZXggPSBuZXcgTWFwKClcblx0XHQvLyBMaXN0UmV0dXJuIC8gTWFwUmV0dXJuIC0+ICMgZW50cmllc1xuXHRcdHRoaXMucmV0dXJuVG9MZW5ndGggPSBuZXcgTWFwKClcblx0XHQvLyBUT0RPOkVTNiBDYW4gdXNlIGRvIGBleHBvcnQgeyBhLCBiLCAuLi4gfWAgYXQgdGhlIGVuZCwgc28gc2hvdWxkbid0IG5lZWQgdGhpcy5cblx0XHQvLyBJbmNsdWRlcyBib3RoIEFzc2lnbnMgYW5kIEFzc2lnbkRlc3RydWN0dXJlcy5cblx0XHR0aGlzLmV4cG9ydEFzc2lnbnMgPSBuZXcgU2V0KClcblx0fVxuXG5cdGlzRGVidWdMb2NhbChsb2NhbERlY2xhcmUpIHtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFRvSW5mby5nZXQobG9jYWxEZWNsYXJlKS5pc0luRGVidWdcblx0fVxuXG5cdGlzQWNjZXNzZWQobG9jYWxEZWNsYXJlKSB7XG5cdFx0Y29uc3QgaW5mbyA9IHRoaXMubG9jYWxUb0luZm8uZ2V0KGxvY2FsRGVjbGFyZSlcblx0XHRyZXR1cm4gIShpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykgJiYgaXNFbXB0eShpbmZvLm5vbkRlYnVnQWNjZXNzZXMpKVxuXHR9XG5cblx0bGlzdE1hcEVudHJ5SW5kZXgoZW50cnkpIHtcblx0XHRyZXR1cm4gdGhpcy5lbnRyeVRvSW5kZXguZ2V0KGVudHJ5KVxuXHR9XG5cblx0bGlzdE1hcExlbmd0aChyZXR1cm5lcikge1xuXHRcdHJldHVybiB0aGlzLnJldHVyblRvTGVuZ3RoLmdldChyZXR1cm5lcilcblx0fVxuXG5cdGlzRXhwb3J0QXNzaWduKGFzc2lnbikge1xuXHRcdHJldHVybiB0aGlzLmV4cG9ydEFzc2lnbnMuaGFzKGFzc2lnbilcblx0fVxufVxuXG5leHBvcnQgY29uc3QgVnJMb2NhbEluZm8gPSB0dXBsKCdWckxvY2FsSW5mbycsIE9iamVjdCwgJ1RPRE86ZG9jJyxcblx0WyAnaXNJbkRlYnVnJywgQm9vbGVhbiwgJ2RlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdLCAnbm9uRGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10gXSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9