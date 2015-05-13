if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../Expression', './U/Bag'], function (exports, _tuplDistTupl, _Expression, _UBag) {
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
				return !(_UBag.isEmpty(info.debugAccesses) && _UBag.isEmpty(info.nonDebugAccesses));
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
	const LocalInfo = _tupl('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_Expression.LocalAccess], 'nonDebugAccesses', [_Expression.LocalAccess]]);
	exports.LocalInfo = LocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLGFBQWE7QUFDdEIsV0FEUyxhQUFhLEdBQ25CO3lCQURNLGFBQWE7O0FBRWhDLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQzVCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsT0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOztBQUU3QixPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7OztBQUc5QixPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDOUI7O2VBYm1CLGFBQWE7O1VBZXJCLHNCQUFDLFlBQVksRUFBRTtBQUMxQixXQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUNuRDs7O1VBRVMsb0JBQUMsWUFBWSxFQUFFO0FBQ3hCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQy9DLFdBQU8sRUFBRSxNQXZCRixPQUFPLENBdUJHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxNQXZCakMsT0FBTyxDQXVCa0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUEsQUFBQyxDQUFBO0lBQ3ZFOzs7VUFFZ0IsMkJBQUMsS0FBSyxFQUFFO0FBQ3hCLFdBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkM7OztVQUVZLHVCQUFDLEtBQUssRUFBRTtBQUNwQixXQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BDOzs7VUFFYSx3QkFBQyxNQUFNLEVBQUU7QUFDdEIsV0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyQzs7O1NBbENtQixhQUFhOzs7bUJBQWIsYUFBYTtBQXFDM0IsT0FBTSxTQUFTLEdBQUcsTUFBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDOUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQXpDakMsV0FBVyxDQXlDbUMsRUFBRSxrQkFBa0IsRUFBRSxhQXpDcEUsV0FBVyxDQXlDc0UsQ0FBRSxDQUFDLENBQUE7U0FEaEYsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC8vdHVwbCdcbmltcG9ydCB7IExvY2FsQWNjZXNzIH0gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuL1UvQmFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlSZXN1bHRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5hY2Nlc3NUb0xvY2FsID0gbmV3IE1hcCgpXG5cdFx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvXG5cdFx0dGhpcy5sb2NhbFRvSW5mbyA9IG5ldyBNYXAoKVxuXHRcdHRoaXMuZW5kTG9vcFRvTG9vcCA9IG5ldyBNYXAoKVxuXHRcdC8vIEJhZ0VudHJ5IG9yIE1hcEVudHJ5IC0+IGluZGV4XG5cdFx0dGhpcy5lbnRyeVRvSW5kZXggPSBuZXcgTWFwKClcblx0XHQvLyBCbG9ja0JhZyAvIEJsb2NrTWFwIC0+ICMgZW50cmllc1xuXHRcdHRoaXMuYmxvY2tUb0xlbmd0aCA9IG5ldyBNYXAoKVxuXHRcdC8vIFRPRE86RVM2IENhbiB1c2UgZG8gYGV4cG9ydCB7IGEsIGIsIC4uLiB9YCBhdCB0aGUgZW5kLCBzbyBzaG91bGRuJ3QgbmVlZCB0aGlzLlxuXHRcdC8vIEluY2x1ZGVzIGJvdGggQXNzaWducyBhbmQgQXNzaWduRGVzdHJ1Y3R1cmVzLlxuXHRcdHRoaXMuZXhwb3J0QXNzaWducyA9IG5ldyBTZXQoKVxuXHR9XG5cblx0aXNEZWJ1Z0xvY2FsKGxvY2FsRGVjbGFyZSkge1xuXHRcdHJldHVybiB0aGlzLmxvY2FsVG9JbmZvLmdldChsb2NhbERlY2xhcmUpLmlzSW5EZWJ1Z1xuXHR9XG5cblx0aXNBY2Nlc3NlZChsb2NhbERlY2xhcmUpIHtcblx0XHRjb25zdCBpbmZvID0gdGhpcy5sb2NhbFRvSW5mby5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdHJldHVybiAhKGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSAmJiBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3NlcykpXG5cdH1cblxuXHRsaXN0TWFwRW50cnlJbmRleChlbnRyeSkge1xuXHRcdHJldHVybiB0aGlzLmVudHJ5VG9JbmRleC5nZXQoZW50cnkpXG5cdH1cblxuXHRsaXN0TWFwTGVuZ3RoKGJsb2NrKSB7XG5cdFx0cmV0dXJuIHRoaXMuYmxvY2tUb0xlbmd0aC5nZXQoYmxvY2spXG5cdH1cblxuXHRpc0V4cG9ydEFzc2lnbihhc3NpZ24pIHtcblx0XHRyZXR1cm4gdGhpcy5leHBvcnRBc3NpZ25zLmhhcyhhc3NpZ24pXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IExvY2FsSW5mbyA9IHR1cGwoJ1ZyTG9jYWxJbmZvJywgT2JqZWN0LCAnVE9ETzpkb2MnLFxuXHRbICdpc0luRGVidWcnLCBCb29sZWFuLCAnZGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10sICdub25EZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSBdKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=