if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/CompileContext', '../private/CompileOptions', '../private/transpile/transpile', '../private/render', '../private/util', '../private/VerifyResults'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCompileContext, _privateCompileOptions, _privateTranspileTranspile, _privateRender, _privateUtil, _privateVerifyResults) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs = _interopRequire(_qIoFs);

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _render = _interopRequire(_privateRender);

	var _VerifyResults = _interopRequire(_privateVerifyResults);

	// Searches a directory and creates a module whose default export is
	// a list of the paths of every module in that directory, relative to it.

	module.exports = function (dirPath, opts) {
		return _fs.listTree(dirPath).then(function (files) {
			const ext = '.js';
			const moduleFiles = (0, _privateUtil.flatOpMap)(files, function (_) {
				return (0, _privateUtil.opIf)(_.endsWith(ext) && !(opts.exclude && opts.exclude.test(_)), function () {
					return './' + (0, _path.relative)(dirPath, _.slice(0, _.length - ext.length));
				});
			});
			// Dummy Loc. We will not use source maps.
			const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
			// Sort to keep it deterministic.
			const modulesBag = (0, _Expression.BagSimple)(loc, moduleFiles.sort().map(function (_) {
				return _Expression.Quote.forString(loc, _);
			}));
			const module = (0, _Expression.Module)(loc, [], [], [], [], [], modulesBag);
			const cx = new _CompileContext(new _CompileOptions({
				includeSourceMap: false,
				includeModuleName: false
			}));
			return (0, _render)(cx, (0, _transpile)(cx, module, new _VerifyResults()));
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWFlLFVBQUMsT0FBTyxFQUFFLElBQUk7U0FDNUIsSUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ2xDLFNBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtBQUNqQixTQUFNLFdBQVcsR0FBRyxpQkFSYixTQUFTLEVBUWMsS0FBSyxFQUFFLFVBQUEsQ0FBQztXQUNyQyxpQkFUaUIsSUFBSSxFQVNoQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUU7bUJBQzNELFVBaEJBLFFBQVEsRUFnQkMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQUUsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFL0QsU0FBTSxHQUFHLEdBQUcsa0JBcEJMLGFBQWEsZ0JBQUUsUUFBUSxDQW9CSyxDQUFBOztBQUVuQyxTQUFNLFVBQVUsR0FBRyxnQkFuQlosU0FBUyxFQW1CYSxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxZQW5CcEMsS0FBSyxDQW1CcUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQTtBQUN2RixTQUFNLE1BQU0sR0FBRyxnQkFwQkcsTUFBTSxFQW9CRixHQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUMvRCxTQUFNLEVBQUUsR0FBRyxvQkFBbUIsb0JBQW1CO0FBQ2hELG9CQUFnQixFQUFFLEtBQUs7QUFDdkIscUJBQWlCLEVBQUUsS0FBSztJQUN4QixDQUFDLENBQUMsQ0FBQTtBQUNILFVBQU8sYUFBTyxFQUFFLEVBQUUsZ0JBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBbUIsQ0FBQyxDQUFDLENBQUE7R0FDN0QsQ0FBQztFQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2luZ2xlQ2hhckxvYywgU3RhcnRQb3MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCBmcyBmcm9tICdxLWlvL2ZzJ1xuaW1wb3J0IHsgcmVsYXRpdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgQmFnU2ltcGxlLCBNb2R1bGUsIFF1b3RlIH0gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgeyBmbGF0T3BNYXAsIG9wSWYgfSBmcm9tICcuLi9wcml2YXRlL3V0aWwnXG5pbXBvcnQgVmVyaWZ5UmVzdWx0cyBmcm9tICcuLi9wcml2YXRlL1ZlcmlmeVJlc3VsdHMnXG5cbi8vIFNlYXJjaGVzIGEgZGlyZWN0b3J5IGFuZCBjcmVhdGVzIGEgbW9kdWxlIHdob3NlIGRlZmF1bHQgZXhwb3J0IGlzXG4vLyBhIGxpc3Qgb2YgdGhlIHBhdGhzIG9mIGV2ZXJ5IG1vZHVsZSBpbiB0aGF0IGRpcmVjdG9yeSwgcmVsYXRpdmUgdG8gaXQuXG5leHBvcnQgZGVmYXVsdCAoZGlyUGF0aCwgb3B0cykgPT5cblx0ZnMubGlzdFRyZWUoZGlyUGF0aCkudGhlbihmaWxlcyA9PiB7XG5cdFx0Y29uc3QgZXh0ID0gJy5qcydcblx0XHRjb25zdCBtb2R1bGVGaWxlcyA9IGZsYXRPcE1hcChmaWxlcywgXyA9PlxuXHRcdFx0b3BJZihfLmVuZHNXaXRoKGV4dCkgJiYgIShvcHRzLmV4Y2x1ZGUgJiYgb3B0cy5leGNsdWRlLnRlc3QoXykpLCAoKSA9PlxuXHRcdFx0XHRgLi8ke3JlbGF0aXZlKGRpclBhdGgsIF8uc2xpY2UoMCwgXy5sZW5ndGggLSBleHQubGVuZ3RoKSl9YCkpXG5cdFx0Ly8gRHVtbXkgTG9jLiBXZSB3aWxsIG5vdCB1c2Ugc291cmNlIG1hcHMuXG5cdFx0Y29uc3QgbG9jID0gc2luZ2xlQ2hhckxvYyhTdGFydFBvcylcblx0XHQvLyBTb3J0IHRvIGtlZXAgaXQgZGV0ZXJtaW5pc3RpYy5cblx0XHRjb25zdCBtb2R1bGVzQmFnID0gQmFnU2ltcGxlKGxvYywgbW9kdWxlRmlsZXMuc29ydCgpLm1hcChfID0+IFF1b3RlLmZvclN0cmluZyhsb2MsIF8pKSlcblx0XHRjb25zdCBtb2R1bGUgPSBNb2R1bGUobG9jLCBbIF0sIFsgXSwgWyBdLCBbIF0sIFsgXSwgbW9kdWxlc0JhZylcblx0XHRjb25zdCBjeCA9IG5ldyBDb21waWxlQ29udGV4dChuZXcgQ29tcGlsZU9wdGlvbnMoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2Vcblx0XHR9KSlcblx0XHRyZXR1cm4gcmVuZGVyKGN4LCB0cmFuc3BpbGUoY3gsIG1vZHVsZSwgbmV3IFZlcmlmeVJlc3VsdHMoKSkpXG5cdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==