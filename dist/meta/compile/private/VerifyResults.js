if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../MsAst', './util'], function (exports, _tuplDistTupl, _MsAst, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	let VerifyResults = (function () {
		function VerifyResults() {
			_classCallCheck(this, VerifyResults);

			this.accessToLocal = new Map();
			// LocalDeclare -> VrLocalInfo
			this.localDeclareToInfo = new Map();
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
				return this.localDeclareToInfo.get(localDeclare).isInDebug;
			}
		}, {
			key: 'isAccessed',
			value: function isAccessed(localDeclare) {
				const info = this.localDeclareToInfo.get(localDeclare);
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
	const LocalInfo = (0, _tupl.default)('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_MsAst.LocalAccess], 'nonDebugAccesses', [_MsAst.LocalAccess]], {}, {
		empty: function (isInDebug) {
			return LocalInfo(isInDebug, [], []);
		}
	});
	exports.LocalInfo = LocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLGFBQWE7QUFDdEIsV0FEUyxhQUFhLEdBQ25CO3lCQURNLGFBQWE7O0FBRWhDLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRW5DLE9BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFN0IsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOzs7QUFHOUIsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0dBQzlCOztlQVptQixhQUFhOztVQWNyQixzQkFBQyxZQUFZLEVBQUU7QUFDMUIsV0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUMxRDs7O1VBRVMsb0JBQUMsWUFBWSxFQUFFO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDdEQsV0FBTyxFQUFFLFVBdEJGLE9BQU8sRUFzQkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBdEJqQyxPQUFPLEVBc0JrQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxBQUFDLENBQUE7SUFDdkU7OztVQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDeEIsV0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQzs7O1VBRVksdUJBQUMsS0FBSyxFQUFFO0FBQ3BCLFdBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEM7OztVQUVhLHdCQUFDLE1BQU0sRUFBRTtBQUN0QixXQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3JDOzs7U0FqQ21CLGFBQWE7OzttQkFBYixhQUFhO0FBb0MzQixPQUFNLFNBQVMsR0FBRyxtQkFBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDOUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQXhDakMsV0FBVyxDQXdDbUMsRUFBRSxrQkFBa0IsRUFBRSxRQXhDcEUsV0FBVyxDQXdDc0UsQ0FBRSxFQUMzRixFQUFHLEVBQ0g7QUFDQyxPQUFLLEVBQUUsVUFBQSxTQUFTO1VBQUksU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFHLEVBQUUsRUFBRyxDQUFDO0dBQUE7RUFDbEQsQ0FBQyxDQUFBO1NBTFUsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC8vdHVwbCdcbmltcG9ydCB7IExvY2FsQWNjZXNzIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlSZXN1bHRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5hY2Nlc3NUb0xvY2FsID0gbmV3IE1hcCgpXG5cdFx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvXG5cdFx0dGhpcy5sb2NhbERlY2xhcmVUb0luZm8gPSBuZXcgTWFwKClcblx0XHQvLyBCYWdFbnRyeSBvciBNYXBFbnRyeSAtPiBpbmRleFxuXHRcdHRoaXMuZW50cnlUb0luZGV4ID0gbmV3IE1hcCgpXG5cdFx0Ly8gQmxvY2tCYWcgLyBCbG9ja01hcCAtPiAjIGVudHJpZXNcblx0XHR0aGlzLmJsb2NrVG9MZW5ndGggPSBuZXcgTWFwKClcblx0XHQvLyBUT0RPOkVTNiBDYW4gdXNlIGRvIGBleHBvcnQgeyBhLCBiLCAuLi4gfWAgYXQgdGhlIGVuZCwgc28gc2hvdWxkbid0IG5lZWQgdGhpcy5cblx0XHQvLyBJbmNsdWRlcyBib3RoIEFzc2lnbnMgYW5kIEFzc2lnbkRlc3RydWN0dXJlcy5cblx0XHR0aGlzLmV4cG9ydEFzc2lnbnMgPSBuZXcgU2V0KClcblx0fVxuXG5cdGlzRGVidWdMb2NhbChsb2NhbERlY2xhcmUpIHtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGxvY2FsRGVjbGFyZSkuaXNJbkRlYnVnXG5cdH1cblxuXHRpc0FjY2Vzc2VkKGxvY2FsRGVjbGFyZSkge1xuXHRcdGNvbnN0IGluZm8gPSB0aGlzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdHJldHVybiAhKGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSAmJiBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3NlcykpXG5cdH1cblxuXHRsaXN0TWFwRW50cnlJbmRleChlbnRyeSkge1xuXHRcdHJldHVybiB0aGlzLmVudHJ5VG9JbmRleC5nZXQoZW50cnkpXG5cdH1cblxuXHRsaXN0TWFwTGVuZ3RoKGJsb2NrKSB7XG5cdFx0cmV0dXJuIHRoaXMuYmxvY2tUb0xlbmd0aC5nZXQoYmxvY2spXG5cdH1cblxuXHRpc0V4cG9ydEFzc2lnbihhc3NpZ24pIHtcblx0XHRyZXR1cm4gdGhpcy5leHBvcnRBc3NpZ25zLmhhcyhhc3NpZ24pXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IExvY2FsSW5mbyA9IHR1cGwoJ1ZyTG9jYWxJbmZvJywgT2JqZWN0LCAnVE9ETzpkb2MnLFxuXHRbICdpc0luRGVidWcnLCBCb29sZWFuLCAnZGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10sICdub25EZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSBdLFxuXHR7IH0sXG5cdHtcblx0XHRlbXB0eTogaXNJbkRlYnVnID0+IExvY2FsSW5mbyhpc0luRGVidWcsIFsgXSwgWyBdKVxuXHR9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=