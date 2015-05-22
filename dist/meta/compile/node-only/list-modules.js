if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'esast/dist/render', 'q-io/fs', 'path', '../MsAst', '../private/CompileContext', '../private/CompileOptions', '../private/transpile/transpile', '../private/util', '../private/VerifyResults'], function (exports, module, _esastDistLoc, _esastDistRender, _qIoFs, _path, _MsAst, _privateCompileContext, _privateCompileOptions, _privateTranspileTranspile, _privateUtil, _privateVerifyResults) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _render = _interopRequireDefault(_esastDistRender);

	var _fs = _interopRequireDefault(_qIoFs);

	var _CompileContext = _interopRequireDefault(_privateCompileContext);

	var _CompileOptions = _interopRequireDefault(_privateCompileOptions);

	var _transpile = _interopRequireDefault(_privateTranspileTranspile);

	var _VerifyResults = _interopRequireDefault(_privateVerifyResults);

	// Searches a directory and creates a module whose default export is
	// a list of the paths of every module in that directory, relative to it.

	module.exports = function (dirPath, opts) {
		return _fs.default.listTree(dirPath).then(function (files) {
			const ext = '.js';
			const moduleFiles = (0, _privateUtil.flatOpMap)(files, function (_) {
				return (0, _privateUtil.opIf)(_.endsWith(ext) && !(opts.exclude && opts.exclude.test(_)), function () {
					return './' + (0, _path.relative)(dirPath, _.slice(0, _.length - ext.length));
				});
			});
			// Dummy Loc. We will not use source maps.
			const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
			// Sort to keep it deterministic.
			const modulesBag = (0, _MsAst.BagSimple)(loc, moduleFiles.sort().map(function (_) {
				return _MsAst.Quote.forString(loc, _);
			}));
			const module = (0, _MsAst.Module)(loc, [], [], [], [], [], modulesBag);
			const context = new _CompileContext.default(new _CompileOptions.default({
				includeSourceMap: false,
				includeModuleName: false
			}));
			return (0, _render.default)((0, _transpile.default)(context, module, new _VerifyResults.default()));
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWFlLFVBQUMsT0FBTyxFQUFFLElBQUk7U0FDNUIsWUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ2xDLFNBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtBQUNqQixTQUFNLFdBQVcsR0FBRyxpQkFSYixTQUFTLEVBUWMsS0FBSyxFQUFFLFVBQUEsQ0FBQztXQUNyQyxpQkFUaUIsSUFBSSxFQVNoQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUU7bUJBQzNELFVBZkEsUUFBUSxFQWVDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFLENBQUM7SUFBQSxDQUFDLENBQUE7O0FBRS9ELFNBQU0sR0FBRyxHQUFHLGtCQXBCTCxhQUFhLGdCQUFFLFFBQVEsQ0FvQkssQ0FBQTs7QUFFbkMsU0FBTSxVQUFVLEdBQUcsV0FsQlosU0FBUyxFQWtCYSxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxPQWxCcEMsS0FBSyxDQWtCcUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQTtBQUN2RixTQUFNLE1BQU0sR0FBRyxXQW5CRyxNQUFNLEVBbUJGLEdBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQy9ELFNBQU0sT0FBTyxHQUFHLDRCQUFtQiw0QkFBbUI7QUFDckQsb0JBQWdCLEVBQUUsS0FBSztBQUN2QixxQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ0gsVUFBTyxxQkFBTyx3QkFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLDRCQUFtQixDQUFDLENBQUMsQ0FBQTtHQUM5RCxDQUFDO0VBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS9saXN0LW1vZHVsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaW5nbGVDaGFyTG9jLCBTdGFydFBvcyB9IGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHJlbmRlciBmcm9tICdlc2FzdC9kaXN0L3JlbmRlcidcbmltcG9ydCBmcyBmcm9tICdxLWlvL2ZzJ1xuaW1wb3J0IHsgcmVsYXRpdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgQmFnU2ltcGxlLCBNb2R1bGUsIFF1b3RlIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgQ29tcGlsZUNvbnRleHQgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlQ29udGV4dCdcbmltcG9ydCBDb21waWxlT3B0aW9ucyBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVPcHRpb25zJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgeyBmbGF0T3BNYXAsIG9wSWYgfSBmcm9tICcuLi9wcml2YXRlL3V0aWwnXG5pbXBvcnQgVmVyaWZ5UmVzdWx0cyBmcm9tICcuLi9wcml2YXRlL1ZlcmlmeVJlc3VsdHMnXG5cbi8vIFNlYXJjaGVzIGEgZGlyZWN0b3J5IGFuZCBjcmVhdGVzIGEgbW9kdWxlIHdob3NlIGRlZmF1bHQgZXhwb3J0IGlzXG4vLyBhIGxpc3Qgb2YgdGhlIHBhdGhzIG9mIGV2ZXJ5IG1vZHVsZSBpbiB0aGF0IGRpcmVjdG9yeSwgcmVsYXRpdmUgdG8gaXQuXG5leHBvcnQgZGVmYXVsdCAoZGlyUGF0aCwgb3B0cykgPT5cblx0ZnMubGlzdFRyZWUoZGlyUGF0aCkudGhlbihmaWxlcyA9PiB7XG5cdFx0Y29uc3QgZXh0ID0gJy5qcydcblx0XHRjb25zdCBtb2R1bGVGaWxlcyA9IGZsYXRPcE1hcChmaWxlcywgXyA9PlxuXHRcdFx0b3BJZihfLmVuZHNXaXRoKGV4dCkgJiYgIShvcHRzLmV4Y2x1ZGUgJiYgb3B0cy5leGNsdWRlLnRlc3QoXykpLCAoKSA9PlxuXHRcdFx0XHRgLi8ke3JlbGF0aXZlKGRpclBhdGgsIF8uc2xpY2UoMCwgXy5sZW5ndGggLSBleHQubGVuZ3RoKSl9YCkpXG5cdFx0Ly8gRHVtbXkgTG9jLiBXZSB3aWxsIG5vdCB1c2Ugc291cmNlIG1hcHMuXG5cdFx0Y29uc3QgbG9jID0gc2luZ2xlQ2hhckxvYyhTdGFydFBvcylcblx0XHQvLyBTb3J0IHRvIGtlZXAgaXQgZGV0ZXJtaW5pc3RpYy5cblx0XHRjb25zdCBtb2R1bGVzQmFnID0gQmFnU2ltcGxlKGxvYywgbW9kdWxlRmlsZXMuc29ydCgpLm1hcChfID0+IFF1b3RlLmZvclN0cmluZyhsb2MsIF8pKSlcblx0XHRjb25zdCBtb2R1bGUgPSBNb2R1bGUobG9jLCBbIF0sIFsgXSwgWyBdLCBbIF0sIFsgXSwgbW9kdWxlc0JhZylcblx0XHRjb25zdCBjb250ZXh0ID0gbmV3IENvbXBpbGVDb250ZXh0KG5ldyBDb21waWxlT3B0aW9ucyh7XG5cdFx0XHRpbmNsdWRlU291cmNlTWFwOiBmYWxzZSxcblx0XHRcdGluY2x1ZGVNb2R1bGVOYW1lOiBmYWxzZVxuXHRcdH0pKVxuXHRcdHJldHVybiByZW5kZXIodHJhbnNwaWxlKGNvbnRleHQsIG1vZHVsZSwgbmV3IFZlcmlmeVJlc3VsdHMoKSkpXG5cdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==