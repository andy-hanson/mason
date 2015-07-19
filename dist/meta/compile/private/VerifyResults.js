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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1ZlcmlmeVJlc3VsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJZSxPQUFNLGFBQWEsQ0FBQztBQUNsQyxhQUFXLEdBQUc7OztBQUdiLE9BQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBOzs7QUFHckMsT0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7OztBQUduQyxPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7R0FDOUI7O0FBRUQsY0FBWSxDQUFDLFlBQVksRUFBRTtBQUMxQixVQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFBO0dBQzFEOztBQUVELFlBQVUsQ0FBQyxZQUFZLEVBQUU7QUFDeEIsU0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN0RCxVQUFPLEVBQUUsVUFyQkYsT0FBTyxFQXFCRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksVUFyQmpDLE9BQU8sRUFxQmtDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtHQUN2RTs7QUFFRCxnQkFBYyxDQUFDLE1BQU0sRUFBRTtBQUN0QixVQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQ3JDOztBQUVELHVCQUFxQixDQUFDLFdBQVcsRUFBRTtBQUNsQyxVQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7R0FDakQ7RUFDRDs7bUJBN0JvQixhQUFhO0FBK0IzQixPQUFNLFNBQVMsR0FBRyxtQkFBSyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDOUQsQ0FBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQW5DakMsV0FBVyxDQW1DbUMsRUFBRSxrQkFBa0IsRUFBRSxRQW5DcEUsV0FBVyxDQW1Dc0UsQ0FBRSxFQUMzRixFQUFHLEVBQ0g7QUFDQyxPQUFLLEVBQUUsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRyxFQUFFLEVBQUcsQ0FBQztFQUNsRCxDQUFDLENBQUE7U0FMVSxTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9WZXJpZnlSZXN1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0Ly90dXBsJ1xuaW1wb3J0IHsgTG9jYWxBY2Nlc3MgfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcmlmeVJlc3VsdHMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvLyBMb2NhbEFjY2VzcyAtPiBMb2NhbERlY2xhcmUuXG5cdFx0Ly8gTmVlZGVkIGJlY2F1c2UgbGF6eSBhY2Nlc3NlcyBtdXN0IGJlIGNvbXBpbGVkIGRpZmZlcmVudGx5LlxuXHRcdHRoaXMubG9jYWxBY2Nlc3NUb0RlY2xhcmUgPSBuZXcgTWFwKClcblx0XHQvLyBMb2NhbERlY2xhcmUgLT4gVnJMb2NhbEluZm8uXG5cdFx0Ly8gRGVidWcgbG9jYWxzIHdpbGwgbm90IGJlIG91dHB1dCBpZiBub3QgaW4gZGVidWcgbW9kZS5cblx0XHR0aGlzLmxvY2FsRGVjbGFyZVRvSW5mbyA9IG5ldyBNYXAoKVxuXHRcdC8vIFRPRE86RVM2IENhbiB1c2UgZG8gYGV4cG9ydCB7IGEsIGIsIC4uLiB9YCBhdCB0aGUgZW5kLCBzbyBzaG91bGRuJ3QgbmVlZCB0aGlzLlxuXHRcdC8vIEluY2x1ZGVzIGJvdGggQXNzaWducyBhbmQgQXNzaWduRGVzdHJ1Y3R1cmVzLlxuXHRcdHRoaXMuZXhwb3J0QXNzaWducyA9IG5ldyBTZXQoKVxuXHR9XG5cblx0aXNEZWJ1Z0xvY2FsKGxvY2FsRGVjbGFyZSkge1xuXHRcdHJldHVybiB0aGlzLmxvY2FsRGVjbGFyZVRvSW5mby5nZXQobG9jYWxEZWNsYXJlKS5pc0luRGVidWdcblx0fVxuXG5cdGlzQWNjZXNzZWQobG9jYWxEZWNsYXJlKSB7XG5cdFx0Y29uc3QgaW5mbyA9IHRoaXMubG9jYWxEZWNsYXJlVG9JbmZvLmdldChsb2NhbERlY2xhcmUpXG5cdFx0cmV0dXJuICEoaXNFbXB0eShpbmZvLmRlYnVnQWNjZXNzZXMpICYmIGlzRW1wdHkoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKSlcblx0fVxuXG5cdGlzRXhwb3J0QXNzaWduKGFzc2lnbikge1xuXHRcdHJldHVybiB0aGlzLmV4cG9ydEFzc2lnbnMuaGFzKGFzc2lnbilcblx0fVxuXG5cdGxvY2FsRGVjbGFyZUZvckFjY2Vzcyhsb2NhbEFjY2Vzcykge1xuXHRcdHJldHVybiB0aGlzLmxvY2FsQWNjZXNzVG9EZWNsYXJlLmdldChsb2NhbEFjY2Vzcylcblx0fVxufVxuXG5leHBvcnQgY29uc3QgTG9jYWxJbmZvID0gdHVwbCgnVnJMb2NhbEluZm8nLCBPYmplY3QsICdUT0RPOmRvYycsXG5cdFsgJ2lzSW5EZWJ1ZycsIEJvb2xlYW4sICdkZWJ1Z0FjY2Vzc2VzJywgW0xvY2FsQWNjZXNzXSwgJ25vbkRlYnVnQWNjZXNzZXMnLCBbTG9jYWxBY2Nlc3NdIF0sXG5cdHsgfSxcblx0e1xuXHRcdGVtcHR5OiBpc0luRGVidWcgPT4gTG9jYWxJbmZvKGlzSW5EZWJ1ZywgWyBdLCBbIF0pXG5cdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==