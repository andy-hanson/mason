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
			this.endLoopToLoop = new Map();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLGFBQWE7QUFDdEIsV0FEUyxhQUFhLEdBQ25CO3lCQURNLGFBQWE7O0FBRWhDLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQzVCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU3QixPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7OztBQUc5QixPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDOUI7O2VBYm1CLGFBQWE7O1VBZXJCLHNCQUFDLFlBQVksRUFBRTtBQUMxQixXQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUNuRDs7O1VBRVMsb0JBQUMsWUFBWSxFQUFFO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLFdBQU8sRUFBRSxVQXZCRixPQUFPLEVBdUJHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxVQXZCakMsT0FBTyxFQXVCa0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUEsQUFBQyxDQUFBO0lBQ3ZFOzs7VUFFZ0IsMkJBQUMsS0FBSyxFQUFFO0FBQ3hCLFdBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkM7OztVQUVZLHVCQUFDLEtBQUssRUFBRTtBQUNwQixXQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BDOzs7VUFFYSx3QkFBQyxNQUFNLEVBQUU7QUFDdEIsV0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyQzs7O1NBbENtQixhQUFhOzs7bUJBQWIsYUFBYTtBQXFDM0IsT0FBTSxTQUFTLEdBQUcsV0FBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDOUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQXpDakMsV0FBVyxDQXlDbUMsRUFBRSxrQkFBa0IsRUFBRSxhQXpDcEUsV0FBVyxDQXlDc0UsQ0FBRSxDQUFDLENBQUE7U0FEaEYsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC8vdHVwbCdcbmltcG9ydCB7IExvY2FsQWNjZXNzIH0gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcmlmeVJlc3VsdHMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmFjY2Vzc1RvTG9jYWwgPSBuZXcgTWFwKClcblx0XHQvLyBMb2NhbERlY2xhcmUgLT4gVnJMb2NhbEluZm9cblx0XHR0aGlzLmxvY2FsVG9JbmZvID0gbmV3IE1hcCgpXG5cdFx0dGhpcy5lbmRMb29wVG9Mb29wID0gbmV3IE1hcCgpXG5cdFx0Ly8gQmFnRW50cnkgb3IgTWFwRW50cnkgLT4gaW5kZXhcblx0XHR0aGlzLmVudHJ5VG9JbmRleCA9IG5ldyBNYXAoKVxuXHRcdC8vIEJsb2NrQmFnIC8gQmxvY2tNYXAgLT4gIyBlbnRyaWVzXG5cdFx0dGhpcy5ibG9ja1RvTGVuZ3RoID0gbmV3IE1hcCgpXG5cdFx0Ly8gVE9ETzpFUzYgQ2FuIHVzZSBkbyBgZXhwb3J0IHsgYSwgYiwgLi4uIH1gIGF0IHRoZSBlbmQsIHNvIHNob3VsZG4ndCBuZWVkIHRoaXMuXG5cdFx0Ly8gSW5jbHVkZXMgYm90aCBBc3NpZ25zIGFuZCBBc3NpZ25EZXN0cnVjdHVyZXMuXG5cdFx0dGhpcy5leHBvcnRBc3NpZ25zID0gbmV3IFNldCgpXG5cdH1cblxuXHRpc0RlYnVnTG9jYWwobG9jYWxEZWNsYXJlKSB7XG5cdFx0cmV0dXJuIHRoaXMubG9jYWxUb0luZm8uZ2V0KGxvY2FsRGVjbGFyZSkuaXNJbkRlYnVnXG5cdH1cblxuXHRpc0FjY2Vzc2VkKGxvY2FsRGVjbGFyZSkge1xuXHRcdGNvbnN0IGluZm8gPSB0aGlzLmxvY2FsVG9JbmZvLmdldChsb2NhbERlY2xhcmUpXG5cdFx0cmV0dXJuICEoaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpICYmIGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKSlcblx0fVxuXG5cdGxpc3RNYXBFbnRyeUluZGV4KGVudHJ5KSB7XG5cdFx0cmV0dXJuIHRoaXMuZW50cnlUb0luZGV4LmdldChlbnRyeSlcblx0fVxuXG5cdGxpc3RNYXBMZW5ndGgoYmxvY2spIHtcblx0XHRyZXR1cm4gdGhpcy5ibG9ja1RvTGVuZ3RoLmdldChibG9jaylcblx0fVxuXG5cdGlzRXhwb3J0QXNzaWduKGFzc2lnbikge1xuXHRcdHJldHVybiB0aGlzLmV4cG9ydEFzc2lnbnMuaGFzKGFzc2lnbilcblx0fVxufVxuXG5leHBvcnQgY29uc3QgTG9jYWxJbmZvID0gdHVwbCgnVnJMb2NhbEluZm8nLCBPYmplY3QsICdUT0RPOmRvYycsXG5cdFsgJ2lzSW5EZWJ1ZycsIEJvb2xlYW4sICdkZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSwgJ25vbkRlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdIF0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==