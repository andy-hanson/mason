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

	module.exports = (dirPath, opts) => _fs.default.listTree(dirPath).then(files => {
		const moduleFiles = (0, _privateUtil.flatOpMap)(files, _ => (0, _privateUtil.opIf)(acceptModule(opts, _), () => `./${ (0, _path.relative)(dirPath, _.slice(0, _.length - ext.length)) }`));
		// Sort to keep it deterministic.
		moduleFiles.sort();
		// Dummy Loc. We will not use source maps.
		const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
		// Sort to keep it deterministic.
		const modulesBag = (0, _MsAst.BagSimple)(loc, moduleFiles.map(_ => _MsAst.Quote.forString(loc, _)));
		const module = (0, _MsAst.Module)(loc, [], [], [], [], [], modulesBag);
		return (0, _render.default)((0, _transpile.default)(new _CompileContext.default(options), module, new _VerifyResults.default()));
	});

	const ext = '.js';
	const acceptModule = (opts, path) => path.endsWith(ext) && !(opts.exclude && opts.exclude.test(path));
	const options = new _CompileOptions.default({
		includeSourceMap: false,
		includeModuleName: false
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWFlLENBQUMsT0FBTyxFQUFFLElBQUksS0FDNUIsWUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUNsQyxRQUFNLFdBQVcsR0FBRyxpQkFQYixTQUFTLEVBT2MsS0FBSyxFQUFFLENBQUMsSUFDckMsaUJBUmlCLElBQUksRUFRaEIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUMzQixDQUFDLEVBQUUsR0FBRSxVQWRBLFFBQVEsRUFjQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUUvRCxhQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7O0FBRWxCLFFBQU0sR0FBRyxHQUFHLGtCQXJCTCxhQUFhLGdCQUFFLFFBQVEsQ0FxQkssQ0FBQTs7QUFFbkMsUUFBTSxVQUFVLEdBQUcsV0FuQlosU0FBUyxFQW1CYSxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FuQjdCLEtBQUssQ0FtQjhCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2hGLFFBQU0sTUFBTSxHQUFHLFdBcEJHLE1BQU0sRUFvQkYsR0FBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDL0QsU0FBTyxxQkFBTyx3QkFBVSw0QkFBbUIsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLDRCQUFtQixDQUFDLENBQUMsQ0FBQTtFQUNsRixDQUFDOztBQUVILE9BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQTtBQUNqQixPQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLEFBQUMsQ0FBQTtBQUNqRSxPQUFNLE9BQU8sR0FBRyw0QkFBbUI7QUFDbEMsa0JBQWdCLEVBQUUsS0FBSztBQUN2QixtQkFBaUIsRUFBRSxLQUFLO0VBQ3hCLENBQUMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgcmVuZGVyIGZyb20gJ2VzYXN0L2Rpc3QvcmVuZGVyJ1xuaW1wb3J0IGZzIGZyb20gJ3EtaW8vZnMnXG5pbXBvcnQgeyByZWxhdGl2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBCYWdTaW1wbGUsIE1vZHVsZSwgUXVvdGUgfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB7IGZsYXRPcE1hcCwgb3BJZiB9IGZyb20gJy4uL3ByaXZhdGUvdXRpbCdcbmltcG9ydCBWZXJpZnlSZXN1bHRzIGZyb20gJy4uL3ByaXZhdGUvVmVyaWZ5UmVzdWx0cydcblxuLy8gU2VhcmNoZXMgYSBkaXJlY3RvcnkgYW5kIGNyZWF0ZXMgYSBtb2R1bGUgd2hvc2UgZGVmYXVsdCBleHBvcnQgaXNcbi8vIGEgbGlzdCBvZiB0aGUgcGF0aHMgb2YgZXZlcnkgbW9kdWxlIGluIHRoYXQgZGlyZWN0b3J5LCByZWxhdGl2ZSB0byBpdC5cbmV4cG9ydCBkZWZhdWx0IChkaXJQYXRoLCBvcHRzKSA9PlxuXHRmcy5saXN0VHJlZShkaXJQYXRoKS50aGVuKGZpbGVzID0+IHtcblx0XHRjb25zdCBtb2R1bGVGaWxlcyA9IGZsYXRPcE1hcChmaWxlcywgXyA9PlxuXHRcdFx0b3BJZihhY2NlcHRNb2R1bGUob3B0cywgXyksICgpID0+XG5cdFx0XHRcdGAuLyR7cmVsYXRpdmUoZGlyUGF0aCwgXy5zbGljZSgwLCBfLmxlbmd0aCAtIGV4dC5sZW5ndGgpKX1gKSlcblx0XHQvLyBTb3J0IHRvIGtlZXAgaXQgZGV0ZXJtaW5pc3RpYy5cblx0XHRtb2R1bGVGaWxlcy5zb3J0KClcblx0XHQvLyBEdW1teSBMb2MuIFdlIHdpbGwgbm90IHVzZSBzb3VyY2UgbWFwcy5cblx0XHRjb25zdCBsb2MgPSBzaW5nbGVDaGFyTG9jKFN0YXJ0UG9zKVxuXHRcdC8vIFNvcnQgdG8ga2VlcCBpdCBkZXRlcm1pbmlzdGljLlxuXHRcdGNvbnN0IG1vZHVsZXNCYWcgPSBCYWdTaW1wbGUobG9jLCBtb2R1bGVGaWxlcy5tYXAoXyA9PiBRdW90ZS5mb3JTdHJpbmcobG9jLCBfKSkpXG5cdFx0Y29uc3QgbW9kdWxlID0gTW9kdWxlKGxvYywgWyBdLCBbIF0sIFsgXSwgWyBdLCBbIF0sIG1vZHVsZXNCYWcpXG5cdFx0cmV0dXJuIHJlbmRlcih0cmFuc3BpbGUobmV3IENvbXBpbGVDb250ZXh0KG9wdGlvbnMpLCBtb2R1bGUsIG5ldyBWZXJpZnlSZXN1bHRzKCkpKVxuXHR9KVxuXG5jb25zdCBleHQgPSAnLmpzJ1xuY29uc3QgYWNjZXB0TW9kdWxlID0gKG9wdHMsIHBhdGgpID0+XG5cdHBhdGguZW5kc1dpdGgoZXh0KSAmJiAhKG9wdHMuZXhjbHVkZSAmJiBvcHRzLmV4Y2x1ZGUudGVzdChwYXRoKSlcbmNvbnN0IG9wdGlvbnMgPSBuZXcgQ29tcGlsZU9wdGlvbnMoe1xuXHRpbmNsdWRlU291cmNlTWFwOiBmYWxzZSxcblx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlXG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=