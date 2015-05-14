if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/Cx', '../private/Opts', '../private/transpile/transpile', '../private/render', '../private/U/Bag', '../private/VerifyResults'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUBag, _privateVerifyResults) {
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
			const moduleFiles = (0, _privateUBag.flatMap)(files, function (f) {
				if (!f.endsWith(ext)) return [];
				if (opts.exclude && opts.exclude.test(f)) return [];
				const noExt = f.slice(0, f.length - ext.length);
				return ['./' + (0, _path.relative)(dirPath, noExt)];
			}).sort();
			// Dummy Loc. We will not use source maps.
			const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
			const val = (0, _Expression.ListSimple)(loc, moduleFiles.map(function (f) {
				return _Expression.Quote.forString(loc, f);
			}));
			const e = (0, _Expression.Module)(loc, [], [], [], [], [], val);
			const cx = new _Cx((0, _privateOpts.OptsFromObject)({
				includeSourceMap: false,
				includeModuleDisplayName: false
			}));
			const ast = (0, _transpile)(cx, e, new _VerifyResults());
			return (0, _render)(cx, ast);
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxJQUFJO1NBQzVCLElBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNsQyxTQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsU0FBTSxXQUFXLEdBQUcsaUJBUmIsT0FBTyxFQVFjLEtBQUssRUFBRSxVQUFBLENBQUMsRUFBSTtBQUN2QyxRQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFDbkIsT0FBTyxFQUFFLENBQUE7QUFDVixRQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3ZDLE9BQU8sRUFBRSxDQUFBO0FBQ1YsVUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsV0FBTyxRQUFPLFVBcEJSLFFBQVEsRUFvQlMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFJLENBQUE7SUFDMUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBOztBQUVULFNBQU0sR0FBRyxHQUFHLGtCQXpCTCxhQUFhLGdCQUFFLFFBQVEsQ0F5QkssQ0FBQTtBQUNuQyxTQUFNLEdBQUcsR0FBRyxnQkF2QkwsVUFBVSxFQXVCTSxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxZQXZCdEIsS0FBSyxDQXVCdUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFBQSxDQUFDLENBQUMsQ0FBQTtBQUMxRSxTQUFNLENBQUMsR0FBRyxnQkF4QlMsTUFBTSxFQXdCUixHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUM5QyxTQUFNLEVBQUUsR0FBRyxRQUFPLGlCQXZCWCxjQUFjLEVBdUJZO0FBQ2hDLG9CQUFnQixFQUFFLEtBQUs7QUFDdkIsNEJBQXdCLEVBQUUsS0FBSztJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNILFNBQU0sR0FBRyxHQUFHLGdCQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsb0JBQW1CLENBQUMsQ0FBQTtBQUNqRCxVQUFPLGFBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0dBQ3RCLENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgZnMgZnJvbSAncS1pby9mcydcbmltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IExpc3RTaW1wbGUsIE1vZHVsZSwgUXVvdGUgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IEN4IGZyb20gJy4uL3ByaXZhdGUvQ3gnXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB7IGZsYXRNYXAgfSBmcm9tICcuLi9wcml2YXRlL1UvQmFnJ1xuaW1wb3J0IFZlcmlmeVJlc3VsdHMgZnJvbSAnLi4vcHJpdmF0ZS9WZXJpZnlSZXN1bHRzJ1xuXG4vLyBTZWFyY2hlcyBhIGRpcmVjdG9yeSBhbmQgY3JlYXRlcyBhIG1vZHVsZSB3aG9zZSBkZWZhdWx0IGV4cG9ydCBpc1xuLy8gYSBsaXN0IG9mIHRoZSBwYXRocyBvZiBldmVyeSBtb2R1bGUgaW4gdGhhdCBkaXJlY3RvcnksIHJlbGF0aXZlIHRvIGl0LlxuZXhwb3J0IGRlZmF1bHQgKGRpclBhdGgsIG9wdHMpID0+XG5cdGZzLmxpc3RUcmVlKGRpclBhdGgpLnRoZW4oZmlsZXMgPT4ge1xuXHRcdGNvbnN0IGV4dCA9ICcuanMnXG5cdFx0Y29uc3QgbW9kdWxlRmlsZXMgPSBmbGF0TWFwKGZpbGVzLCBmID0+IHtcblx0XHRcdGlmICghZi5lbmRzV2l0aChleHQpKVxuXHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdGlmIChvcHRzLmV4Y2x1ZGUgJiYgb3B0cy5leGNsdWRlLnRlc3QoZikpXG5cdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0Y29uc3Qgbm9FeHQgPSBmLnNsaWNlKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aClcblx0XHRcdHJldHVybiBbIGAuLyR7cmVsYXRpdmUoZGlyUGF0aCwgbm9FeHQpfWAgXVxuXHRcdH0pLnNvcnQoKVxuXHRcdC8vIER1bW15IExvYy4gV2Ugd2lsbCBub3QgdXNlIHNvdXJjZSBtYXBzLlxuXHRcdGNvbnN0IGxvYyA9IHNpbmdsZUNoYXJMb2MoU3RhcnRQb3MpXG5cdFx0Y29uc3QgdmFsID0gTGlzdFNpbXBsZShsb2MsIG1vZHVsZUZpbGVzLm1hcChmID0+IFF1b3RlLmZvclN0cmluZyhsb2MsIGYpKSlcblx0XHRjb25zdCBlID0gTW9kdWxlKGxvYywgW10sIFtdLCBbXSwgW10sIFtdLCB2YWwpXG5cdFx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IGZhbHNlXG5cdFx0fSkpXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCBuZXcgVmVyaWZ5UmVzdWx0cygpKVxuXHRcdHJldHVybiByZW5kZXIoY3gsIGFzdClcblx0fSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9