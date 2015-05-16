if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/Cx', '../private/Opts', '../private/transpile/transpile', '../private/render', '../private/U/op', '../private/VerifyResults'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUOp, _privateVerifyResults) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs = _interopRequire(_qIoFs);

	var _Cx = _interopRequire(_privateCx);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _render = _interopRequire(_privateRender);

	var _VerifyResults = _interopRequire(_privateVerifyResults);

	// Searches a directory and creates a module whose default export is
	// a list of the paths of every module in that directory, relative to it.

	module.exports = function (dirPath, opts) {
		return _fs.listTree(dirPath).then(function (files) {
			const ext = '.js';
			const moduleFiles = (0, _privateUOp.flatOpMap)(files, function (_) {
				return (0, _privateUOp.opIf)(_.endsWith(ext) && !(opts.exclude && opts.exclude.test(_)), function () {
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
			const cx = new _Cx((0, _privateOpts.OptsFromObject)({
				includeSourceMap: false,
				includeModuleName: false
			}));
			return (0, _render)(cx, (0, _transpile)(cx, module, new _VerifyResults()));
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxJQUFJO1NBQzVCLElBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNsQyxTQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsU0FBTSxXQUFXLEdBQUcsZ0JBUmIsU0FBUyxFQVFjLEtBQUssRUFBRSxVQUFBLENBQUM7V0FDckMsZ0JBVGlCLElBQUksRUFTaEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFFO21CQUMzRCxVQWhCQSxRQUFRLEVBZ0JDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFLENBQUM7SUFBQSxDQUFDLENBQUE7O0FBRS9ELFNBQU0sR0FBRyxHQUFHLGtCQXBCTCxhQUFhLGdCQUFFLFFBQVEsQ0FvQkssQ0FBQTs7QUFFbkMsU0FBTSxVQUFVLEdBQUcsZ0JBbkJaLFNBQVMsRUFtQmEsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1dBQUksWUFuQnBDLEtBQUssQ0FtQnFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQUE7QUFDdkYsU0FBTSxNQUFNLEdBQUcsZ0JBcEJHLE1BQU0sRUFvQkYsR0FBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDL0QsU0FBTSxFQUFFLEdBQUcsUUFBTyxpQkFuQlgsY0FBYyxFQW1CWTtBQUNoQyxvQkFBZ0IsRUFBRSxLQUFLO0FBQ3ZCLHFCQUFpQixFQUFFLEtBQUs7SUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFDSCxVQUFPLGFBQU8sRUFBRSxFQUFFLGdCQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsb0JBQW1CLENBQUMsQ0FBQyxDQUFBO0dBQzdELENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgZnMgZnJvbSAncS1pby9mcydcbmltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IEJhZ1NpbXBsZSwgTW9kdWxlLCBRdW90ZSB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHsgZmxhdE9wTWFwLCBvcElmIH0gZnJvbSAnLi4vcHJpdmF0ZS9VL29wJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMgZnJvbSAnLi4vcHJpdmF0ZS9WZXJpZnlSZXN1bHRzJ1xuXG4vLyBTZWFyY2hlcyBhIGRpcmVjdG9yeSBhbmQgY3JlYXRlcyBhIG1vZHVsZSB3aG9zZSBkZWZhdWx0IGV4cG9ydCBpc1xuLy8gYSBsaXN0IG9mIHRoZSBwYXRocyBvZiBldmVyeSBtb2R1bGUgaW4gdGhhdCBkaXJlY3RvcnksIHJlbGF0aXZlIHRvIGl0LlxuZXhwb3J0IGRlZmF1bHQgKGRpclBhdGgsIG9wdHMpID0+XG5cdGZzLmxpc3RUcmVlKGRpclBhdGgpLnRoZW4oZmlsZXMgPT4ge1xuXHRcdGNvbnN0IGV4dCA9ICcuanMnXG5cdFx0Y29uc3QgbW9kdWxlRmlsZXMgPSBmbGF0T3BNYXAoZmlsZXMsIF8gPT5cblx0XHRcdG9wSWYoXy5lbmRzV2l0aChleHQpICYmICEob3B0cy5leGNsdWRlICYmIG9wdHMuZXhjbHVkZS50ZXN0KF8pKSwgKCkgPT5cblx0XHRcdFx0YC4vJHtyZWxhdGl2ZShkaXJQYXRoLCBfLnNsaWNlKDAsIF8ubGVuZ3RoIC0gZXh0Lmxlbmd0aCkpfWApKVxuXHRcdC8vIER1bW15IExvYy4gV2Ugd2lsbCBub3QgdXNlIHNvdXJjZSBtYXBzLlxuXHRcdGNvbnN0IGxvYyA9IHNpbmdsZUNoYXJMb2MoU3RhcnRQb3MpXG5cdFx0Ly8gU29ydCB0byBrZWVwIGl0IGRldGVybWluaXN0aWMuXG5cdFx0Y29uc3QgbW9kdWxlc0JhZyA9IEJhZ1NpbXBsZShsb2MsIG1vZHVsZUZpbGVzLnNvcnQoKS5tYXAoXyA9PiBRdW90ZS5mb3JTdHJpbmcobG9jLCBfKSkpXG5cdFx0Y29uc3QgbW9kdWxlID0gTW9kdWxlKGxvYywgWyBdLCBbIF0sIFsgXSwgWyBdLCBbIF0sIG1vZHVsZXNCYWcpXG5cdFx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2Vcblx0XHR9KSlcblx0XHRyZXR1cm4gcmVuZGVyKGN4LCB0cmFuc3BpbGUoY3gsIG1vZHVsZSwgbmV3IFZlcmlmeVJlc3VsdHMoKSkpXG5cdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==