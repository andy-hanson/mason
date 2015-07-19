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
		const ext = '.js';
		const moduleFiles = (0, _privateUtil.flatOpMap)(files, _ => (0, _privateUtil.opIf)(_.endsWith(ext) && !(opts.exclude && opts.exclude.test(_)), () => `./${ (0, _path.relative)(dirPath, _.slice(0, _.length - ext.length)) }`));
		// Dummy Loc. We will not use source maps.
		const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
		// Sort to keep it deterministic.
		const modulesBag = (0, _MsAst.BagSimple)(loc, moduleFiles.sort().map(_ => _MsAst.Quote.forString(loc, _)));
		const module = (0, _MsAst.Module)(loc, [], [], [], [], [], modulesBag);
		const context = new _CompileContext.default(new _CompileOptions.default({
			includeSourceMap: false,
			includeModuleName: false
		}));
		return (0, _render.default)((0, _transpile.default)(context, module, new _VerifyResults.default()));
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWFlLENBQUMsT0FBTyxFQUFFLElBQUksS0FDNUIsWUFBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUNsQyxRQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsUUFBTSxXQUFXLEdBQUcsaUJBUmIsU0FBUyxFQVFjLEtBQUssRUFBRSxDQUFDLElBQ3JDLGlCQVRpQixJQUFJLEVBU2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBRSxNQUNoRSxDQUFDLEVBQUUsR0FBRSxVQWZBLFFBQVEsRUFlQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOztBQUUvRCxRQUFNLEdBQUcsR0FBRyxrQkFwQkwsYUFBYSxnQkFBRSxRQUFRLENBb0JLLENBQUE7O0FBRW5DLFFBQU0sVUFBVSxHQUFHLFdBbEJaLFNBQVMsRUFrQmEsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BbEJwQyxLQUFLLENBa0JxQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN2RixRQUFNLE1BQU0sR0FBRyxXQW5CRyxNQUFNLEVBbUJGLEdBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQy9ELFFBQU0sT0FBTyxHQUFHLDRCQUFtQiw0QkFBbUI7QUFDckQsbUJBQWdCLEVBQUUsS0FBSztBQUN2QixvQkFBaUIsRUFBRSxLQUFLO0dBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ0gsU0FBTyxxQkFBTyx3QkFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLDRCQUFtQixDQUFDLENBQUMsQ0FBQTtFQUM5RCxDQUFDIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2luZ2xlQ2hhckxvYywgU3RhcnRQb3MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCByZW5kZXIgZnJvbSAnZXNhc3QvZGlzdC9yZW5kZXInXG5pbXBvcnQgZnMgZnJvbSAncS1pby9mcydcbmltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IEJhZ1NpbXBsZSwgTW9kdWxlLCBRdW90ZSB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IENvbXBpbGVDb250ZXh0IGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZUNvbnRleHQnXG5pbXBvcnQgQ29tcGlsZU9wdGlvbnMgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlT3B0aW9ucydcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHsgZmxhdE9wTWFwLCBvcElmIH0gZnJvbSAnLi4vcHJpdmF0ZS91dGlsJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMgZnJvbSAnLi4vcHJpdmF0ZS9WZXJpZnlSZXN1bHRzJ1xuXG4vLyBTZWFyY2hlcyBhIGRpcmVjdG9yeSBhbmQgY3JlYXRlcyBhIG1vZHVsZSB3aG9zZSBkZWZhdWx0IGV4cG9ydCBpc1xuLy8gYSBsaXN0IG9mIHRoZSBwYXRocyBvZiBldmVyeSBtb2R1bGUgaW4gdGhhdCBkaXJlY3RvcnksIHJlbGF0aXZlIHRvIGl0LlxuZXhwb3J0IGRlZmF1bHQgKGRpclBhdGgsIG9wdHMpID0+XG5cdGZzLmxpc3RUcmVlKGRpclBhdGgpLnRoZW4oZmlsZXMgPT4ge1xuXHRcdGNvbnN0IGV4dCA9ICcuanMnXG5cdFx0Y29uc3QgbW9kdWxlRmlsZXMgPSBmbGF0T3BNYXAoZmlsZXMsIF8gPT5cblx0XHRcdG9wSWYoXy5lbmRzV2l0aChleHQpICYmICEob3B0cy5leGNsdWRlICYmIG9wdHMuZXhjbHVkZS50ZXN0KF8pKSwgKCkgPT5cblx0XHRcdFx0YC4vJHtyZWxhdGl2ZShkaXJQYXRoLCBfLnNsaWNlKDAsIF8ubGVuZ3RoIC0gZXh0Lmxlbmd0aCkpfWApKVxuXHRcdC8vIER1bW15IExvYy4gV2Ugd2lsbCBub3QgdXNlIHNvdXJjZSBtYXBzLlxuXHRcdGNvbnN0IGxvYyA9IHNpbmdsZUNoYXJMb2MoU3RhcnRQb3MpXG5cdFx0Ly8gU29ydCB0byBrZWVwIGl0IGRldGVybWluaXN0aWMuXG5cdFx0Y29uc3QgbW9kdWxlc0JhZyA9IEJhZ1NpbXBsZShsb2MsIG1vZHVsZUZpbGVzLnNvcnQoKS5tYXAoXyA9PiBRdW90ZS5mb3JTdHJpbmcobG9jLCBfKSkpXG5cdFx0Y29uc3QgbW9kdWxlID0gTW9kdWxlKGxvYywgWyBdLCBbIF0sIFsgXSwgWyBdLCBbIF0sIG1vZHVsZXNCYWcpXG5cdFx0Y29uc3QgY29udGV4dCA9IG5ldyBDb21waWxlQ29udGV4dChuZXcgQ29tcGlsZU9wdGlvbnMoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2Vcblx0XHR9KSlcblx0XHRyZXR1cm4gcmVuZGVyKHRyYW5zcGlsZShjb250ZXh0LCBtb2R1bGUsIG5ldyBWZXJpZnlSZXN1bHRzKCkpKVxuXHR9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=