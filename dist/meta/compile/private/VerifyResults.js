if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../Expression', './util'], function (exports, _tuplDistTupl, _Expression, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _tupl = _interopRequire(_tuplDistTupl);

	let VerifyResults = (function () {
		function VerifyResults() {
			_classCallCheck(this, VerifyResults);

			this.accessToLocal = new Map();
			// LocalDeclare -> VrLocalInfo
			this.localToInfo = new Map();
			// BagEntry or MapEntry -> index
			this.entryToIndex = new Map();
			// BlockBag / BlockMap -> # entries
			this.blockToLength = new Map();
			// TODO:ES6 Can use do `export { a, b, ... }` at the end, so shouldn't need this.
			// Includes both Assigns and AssignDestructures.
			this.exportAssigns = new Set();
		}

		_createClass(VerifyResults, [{
			key: 'isDebugLocal',
			value: function isDebugLocal(localDeclare) {
				return this.localToInfo.get(localDeclare).isInDebug;
			}
		}, {
			key: 'isAccessed',
			value: function isAccessed(localDeclare) {
				const info = this.localToInfo.get(localDeclare);
				return !((0, _util.isEmpty)(info.debugAccesses) && (0, _util.isEmpty)(info.nonDebugAccesses));
			}
		}, {
			key: 'listMapEntryIndex',
			value: function listMapEntryIndex(entry) {
				return this.entryToIndex.get(entry);
			}
		}, {
			key: 'listMapLength',
			value: function listMapLength(block) {
				return this.blockToLength.get(block);
			}
		}, {
			key: 'isExportAssign',
			value: function isExportAssign(assign) {
				return this.exportAssigns.has(assign);
			}
		}]);

		return VerifyResults;
	})();

	exports.default = VerifyResults;
	const LocalInfo = (0, _tupl)('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);
	exports.LocalInfo = LocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLGFBQWE7QUFDdEIsV0FEUyxhQUFhLEdBQ25CO3lCQURNLGFBQWE7O0FBRWhDLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU1QixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRTdCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7O0FBRzlCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtHQUM5Qjs7ZUFabUIsYUFBYTs7VUFjckIsc0JBQUMsWUFBWSxFQUFFO0FBQzFCLFdBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFBO0lBQ25EOzs7VUFFUyxvQkFBQyxZQUFZLEVBQUU7QUFDeEIsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDL0MsV0FBTyxFQUFFLFVBdEJGLE9BQU8sRUFzQkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBdEJqQyxPQUFPLEVBc0JrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7SUFDdkU7OztVQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDeEIsV0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQzs7O1VBRVksdUJBQUMsS0FBSyxFQUFFO0FBQ3BCLFdBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEM7OztVQUVhLHdCQUFDLE1BQU0sRUFBRTtBQUN0QixXQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3JDOzs7U0FqQ21CLGFBQWE7OzttQkFBYixhQUFhO0FBb0MzQixPQUFNLFNBQVMsR0FBRyxXQUFLLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUM5RCxDQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBeENqQyxXQUFXLENBd0NtQyxFQUFFLGtCQUFrQixFQUFFLGFBeENwRSxXQUFXLENBd0NzRSxDQUFFLENBQUMsQ0FBQTtTQURoRixTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9WZXJpZnlSZXN1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0Ly90dXBsJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5UmVzdWx0cyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuYWNjZXNzVG9Mb2NhbCA9IG5ldyBNYXAoKVxuXHRcdC8vIExvY2FsRGVjbGFyZSAtPiBWckxvY2FsSW5mb1xuXHRcdHRoaXMubG9jYWxUb0luZm8gPSBuZXcgTWFwKClcblx0XHQvLyBCYWdFbnRyeSBvciBNYXBFbnRyeSAtPiBpbmRleFxuXHRcdHRoaXMuZW50cnlUb0luZGV4ID0gbmV3IE1hcCgpXG5cdFx0Ly8gQmxvY2tCYWcgLyBCbG9ja01hcCAtPiAjIGVudHJpZXNcblx0XHR0aGlzLmJsb2NrVG9MZW5ndGggPSBuZXcgTWFwKClcblx0XHQvLyBUT0RPOkVTNiBDYW4gdXNlIGRvIGBleHBvcnQgeyBhLCBiLCAuLi4gfWAgYXQgdGhlIGVuZCwgc28gc2hvdWxkbid0IG5lZWQgdGhpcy5cblx0XHQvLyBJbmNsdWRlcyBib3RoIEFzc2lnbnMgYW5kIEFzc2lnbkRlc3RydWN0dXJlcy5cblx0XHR0aGlzLmV4cG9ydEFzc2lnbnMgPSBuZXcgU2V0KClcblx0fVxuXG5cdGlzRGVidWdMb2NhbChsb2NhbERlY2xhcmUpIHtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFRvSW5mby5nZXQobG9jYWxEZWNsYXJlKS5pc0luRGVidWdcblx0fVxuXG5cdGlzQWNjZXNzZWQobG9jYWxEZWNsYXJlKSB7XG5cdFx0Y29uc3QgaW5mbyA9IHRoaXMubG9jYWxUb0luZm8uZ2V0KGxvY2FsRGVjbGFyZSlcblx0XHRyZXR1cm4gIShpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykgJiYgaXNFbXB0eShpbmZvLm5vbkRlYnVnQWNjZXNzZXMpKVxuXHR9XG5cblx0bGlzdE1hcEVudHJ5SW5kZXgoZW50cnkpIHtcblx0XHRyZXR1cm4gdGhpcy5lbnRyeVRvSW5kZXguZ2V0KGVudHJ5KVxuXHR9XG5cblx0bGlzdE1hcExlbmd0aChibG9jaykge1xuXHRcdHJldHVybiB0aGlzLmJsb2NrVG9MZW5ndGguZ2V0KGJsb2NrKVxuXHR9XG5cblx0aXNFeHBvcnRBc3NpZ24oYXNzaWduKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXhwb3J0QXNzaWducy5oYXMoYXNzaWduKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBMb2NhbEluZm8gPSB0dXBsKCdWckxvY2FsSW5mbycsIE9iamVjdCwgJ1RPRE86ZG9jJyxcblx0WyAnaXNJbkRlYnVnJywgQm9vbGVhbiwgJ2RlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdLCAnbm9uRGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10gXSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9