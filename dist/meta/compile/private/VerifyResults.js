if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'tupl/dist//tupl', '../MsAst', './util'], function (exports, _tuplDistTupl, _MsAst, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	class VerifyResults {
		constructor() {
			// LocalAccess -> LocalDeclare.
			// Needed because lazy accesses must be compiled differently.
			this.localAccessToDeclare = new Map();
			// LocalDeclare -> VrLocalInfo.
			// Debug locals will not be output if not in debug mode.
			this.localDeclareToInfo = new Map();
			// TODO:ES6 Can use do `export { a, b, ... }` at the end, so shouldn't need this.
			// Includes both Assigns and AssignDestructures.
			this.exportAssigns = new Set();
		}

		isDebugLocal(localDeclare) {
			return this.localDeclareToInfo.get(localDeclare).isInDebug;
		}

		isAccessed(localDeclare) {
			const info = this.localDeclareToInfo.get(localDeclare);
			return !((0, _util.isEmpty)(info.debugAccesses) && (0, _util.isEmpty)(info.nonDebugAccesses));
		}

		isExportAssign(assign) {
			return this.exportAssigns.has(assign);
		}

		localDeclareForAccess(localAccess) {
			return this.localAccessToDeclare.get(localAccess);
		}
	}

	exports.default = VerifyResults;
	const LocalInfo = (0, _tupl.default)('VrLocalInfo', Object, 'TODO:doc', ['isInDebug', Boolean, 'debugAccesses', [_MsAst.LocalAccess], 'nonDebugAccesses', [_MsAst.LocalAccess]], {}, {
		empty: isInDebug => LocalInfo(isInDebug, [], [])
	});
	exports.LocalInfo = LocalInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJZSxPQUFNLGFBQWEsQ0FBQztBQUNsQyxhQUFXLEdBQUc7OztBQUdiLE9BQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOzs7QUFHckMsT0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7OztBQUduQyxPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDOUI7O0FBRUQsY0FBWSxDQUFDLFlBQVksRUFBRTtBQUMxQixVQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFBO0dBQzFEOztBQUVELFlBQVUsQ0FBQyxZQUFZLEVBQUU7QUFDeEIsU0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN0RCxVQUFPLEVBQUUsVUFyQkYsT0FBTyxFQXFCRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksVUFyQmpDLE9BQU8sRUFxQmtDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtHQUN2RTs7QUFFRCxnQkFBYyxDQUFDLE1BQU0sRUFBRTtBQUN0QixVQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQ3JDOztBQUVELHVCQUFxQixDQUFDLFdBQVcsRUFBRTtBQUNsQyxVQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7R0FDakQ7RUFDRDs7bUJBN0JvQixhQUFhO0FBK0IzQixPQUFNLFNBQVMsR0FBRyxtQkFBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDOUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQW5DakMsV0FBVyxDQW1DbUMsRUFBRSxrQkFBa0IsRUFBRSxRQW5DcEUsV0FBVyxDQW1Dc0UsQ0FBRSxFQUMzRixFQUFHLEVBQ0g7QUFDQyxPQUFLLEVBQUUsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRyxFQUFFLEVBQUcsQ0FBQztFQUNsRCxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC8vdHVwbCdcbmltcG9ydCB7IExvY2FsQWNjZXNzIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlSZXN1bHRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly8gTG9jYWxBY2Nlc3MgLT4gTG9jYWxEZWNsYXJlLlxuXHRcdC8vIE5lZWRlZCBiZWNhdXNlIGxhenkgYWNjZXNzZXMgbXVzdCBiZSBjb21waWxlZCBkaWZmZXJlbnRseS5cblx0XHR0aGlzLmxvY2FsQWNjZXNzVG9EZWNsYXJlID0gbmV3IE1hcCgpXG5cdFx0Ly8gTG9jYWxEZWNsYXJlIC0+IFZyTG9jYWxJbmZvLlxuXHRcdC8vIERlYnVnIGxvY2FscyB3aWxsIG5vdCBiZSBvdXRwdXQgaWYgbm90IGluIGRlYnVnIG1vZGUuXG5cdFx0dGhpcy5sb2NhbERlY2xhcmVUb0luZm8gPSBuZXcgTWFwKClcblx0XHQvLyBUT0RPOkVTNiBDYW4gdXNlIGRvIGBleHBvcnQgeyBhLCBiLCAuLi4gfWAgYXQgdGhlIGVuZCwgc28gc2hvdWxkbid0IG5lZWQgdGhpcy5cblx0XHQvLyBJbmNsdWRlcyBib3RoIEFzc2lnbnMgYW5kIEFzc2lnbkRlc3RydWN0dXJlcy5cblx0XHR0aGlzLmV4cG9ydEFzc2lnbnMgPSBuZXcgU2V0KClcblx0fVxuXG5cdGlzRGVidWdMb2NhbChsb2NhbERlY2xhcmUpIHtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbERlY2xhcmVUb0luZm8uZ2V0KGxvY2FsRGVjbGFyZSkuaXNJbkRlYnVnXG5cdH1cblxuXHRpc0FjY2Vzc2VkKGxvY2FsRGVjbGFyZSkge1xuXHRcdGNvbnN0IGluZm8gPSB0aGlzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdHJldHVybiAhKGlzRW1wdHkoaW5mby5kZWJ1Z0FjY2Vzc2VzKSAmJiBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3NlcykpXG5cdH1cblxuXHRpc0V4cG9ydEFzc2lnbihhc3NpZ24pIHtcblx0XHRyZXR1cm4gdGhpcy5leHBvcnRBc3NpZ25zLmhhcyhhc3NpZ24pXG5cdH1cblxuXHRsb2NhbERlY2xhcmVGb3JBY2Nlc3MobG9jYWxBY2Nlc3MpIHtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbEFjY2Vzc1RvRGVjbGFyZS5nZXQobG9jYWxBY2Nlc3MpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IExvY2FsSW5mbyA9IHR1cGwoJ1ZyTG9jYWxJbmZvJywgT2JqZWN0LCAnVE9ETzpkb2MnLFxuXHRbICdpc0luRGVidWcnLCBCb29sZWFuLCAnZGVidWdBY2Nlc3NlcycsIFtMb2NhbEFjY2Vzc10sICdub25EZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSBdLFxuXHR7IH0sXG5cdHtcblx0XHRlbXB0eTogaXNJbkRlYnVnID0+IExvY2FsSW5mbyhpc0luRGVidWcsIFsgXSwgWyBdKVxuXHR9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=