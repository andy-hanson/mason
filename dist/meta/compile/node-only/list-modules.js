if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'esast/dist/render', 'q-io/fs', 'path', '../MsAst', '../private/CompileContext', '../private/CompileOptions', '../private/transpile/transpile', '../private/util', '../private/VerifyResults'], function (exports, module, _esastDistLoc, _esastDistRender, _qIoFs, _path, _MsAst, _privateCompileContext, _privateCompileOptions, _privateTranspileTranspile, _privateUtil, _privateVerifyResults) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _render = _interopRequire(_esastDistRender);

	var _fs = _interopRequire(_qIoFs);

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

	var _transpile = _interopRequire(_privateTranspileTranspile);

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
			const modulesBag = (0, _MsAst.BagSimple)(loc, moduleFiles.sort().map(function (_) {
				return _MsAst.Quote.forString(loc, _);
			}));
			const module = (0, _MsAst.Module)(loc, [], [], [], [], [], modulesBag);
			const context = new _CompileContext(new _CompileOptions({
				includeSourceMap: false,
				includeModuleName: false
			}));
			return (0, _render)((0, _transpile)(context, module, new _VerifyResults()));
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWFlLFVBQUMsT0FBTyxFQUFFLElBQUk7U0FDNUIsSUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ2xDLFNBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtBQUNqQixTQUFNLFdBQVcsR0FBRyxpQkFSYixTQUFTLEVBUWMsS0FBSyxFQUFFLFVBQUEsQ0FBQztXQUNyQyxpQkFUaUIsSUFBSSxFQVNoQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUU7bUJBQzNELFVBZkEsUUFBUSxFQWVDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFLENBQUM7SUFBQSxDQUFDLENBQUE7O0FBRS9ELFNBQU0sR0FBRyxHQUFHLGtCQXBCTCxhQUFhLGdCQUFFLFFBQVEsQ0FvQkssQ0FBQTs7QUFFbkMsU0FBTSxVQUFVLEdBQUcsV0FsQlosU0FBUyxFQWtCYSxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxPQWxCcEMsS0FBSyxDQWtCcUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQTtBQUN2RixTQUFNLE1BQU0sR0FBRyxXQW5CRyxNQUFNLEVBbUJGLEdBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQy9ELFNBQU0sT0FBTyxHQUFHLG9CQUFtQixvQkFBbUI7QUFDckQsb0JBQWdCLEVBQUUsS0FBSztBQUN2QixxQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ0gsVUFBTyxhQUFPLGdCQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUUsb0JBQW1CLENBQUMsQ0FBQyxDQUFBO0dBQzlELENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgcmVuZGVyIGZyb20gJ2VzYXN0L2Rpc3QvcmVuZGVyJ1xuaW1wb3J0IGZzIGZyb20gJ3EtaW8vZnMnXG5pbXBvcnQgeyByZWxhdGl2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBCYWdTaW1wbGUsIE1vZHVsZSwgUXVvdGUgfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB7IGZsYXRPcE1hcCwgb3BJZiB9IGZyb20gJy4uL3ByaXZhdGUvdXRpbCdcbmltcG9ydCBWZXJpZnlSZXN1bHRzIGZyb20gJy4uL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cydcblxuLy8gU2VhcmNoZXMgYSBkaXJlY3RvcnkgYW5kIGNyZWF0ZXMgYSBtb2R1bGUgd2hvc2UgZGVmYXVsdCBleHBvcnQgaXNcbi8vIGEgbGlzdCBvZiB0aGUgcGF0aHMgb2YgZXZlcnkgbW9kdWxlIGluIHRoYXQgZGlyZWN0b3J5LCByZWxhdGl2ZSB0byBpdC5cbmV4cG9ydCBkZWZhdWx0IChkaXJQYXRoLCBvcHRzKSA9PlxuXHRmcy5saXN0VHJlZShkaXJQYXRoKS50aGVuKGZpbGVzID0+IHtcblx0XHRjb25zdCBleHQgPSAnLmpzJ1xuXHRcdGNvbnN0IG1vZHVsZUZpbGVzID0gZmxhdE9wTWFwKGZpbGVzLCBfID0+XG5cdFx0XHRvcElmKF8uZW5kc1dpdGgoZXh0KSAmJiAhKG9wdHMuZXhjbHVkZSAmJiBvcHRzLmV4Y2x1ZGUudGVzdChfKSksICgpID0+XG5cdFx0XHRcdGAuLyR7cmVsYXRpdmUoZGlyUGF0aCwgXy5zbGljZSgwLCBfLmxlbmd0aCAtIGV4dC5sZW5ndGgpKX1gKSlcblx0XHQvLyBEdW1teSBMb2MuIFdlIHdpbGwgbm90IHVzZSBzb3VyY2UgbWFwcy5cblx0XHRjb25zdCBsb2MgPSBzaW5nbGVDaGFyTG9jKFN0YXJ0UG9zKVxuXHRcdC8vIFNvcnQgdG8ga2VlcCBpdCBkZXRlcm1pbmlzdGljLlxuXHRcdGNvbnN0IG1vZHVsZXNCYWcgPSBCYWdTaW1wbGUobG9jLCBtb2R1bGVGaWxlcy5zb3J0KCkubWFwKF8gPT4gUXVvdGUuZm9yU3RyaW5nKGxvYywgXykpKVxuXHRcdGNvbnN0IG1vZHVsZSA9IE1vZHVsZShsb2MsIFsgXSwgWyBdLCBbIF0sIFsgXSwgWyBdLCBtb2R1bGVzQmFnKVxuXHRcdGNvbnN0IGNvbnRleHQgPSBuZXcgQ29tcGlsZUNvbnRleHQobmV3IENvbXBpbGVPcHRpb25zKHtcblx0XHRcdGluY2x1ZGVTb3VyY2VNYXA6IGZhbHNlLFxuXHRcdFx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlXG5cdFx0fSkpXG5cdFx0cmV0dXJuIHJlbmRlcih0cmFuc3BpbGUoY29udGV4dCwgbW9kdWxlLCBuZXcgVmVyaWZ5UmVzdWx0cygpKSlcblx0fSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9