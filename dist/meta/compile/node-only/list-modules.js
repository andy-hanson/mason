if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/Cx', '../private/Opts', '../private/transpile/transpile', '../private/render', '../private/U/Bag', '../private/U/Op', '../private/Vr'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUBag, _privateUOp, _privateVr) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs = _interopRequire(_qIoFs);

	var _Cx = _interopRequire(_privateCx);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _render = _interopRequire(_privateRender);

	var _Vr = _interopRequire(_privateVr);

	// Searches a directory and creates a module whose default export is
	// a list of the paths of every module in that directory, relative to it.

	module.exports = function (dirPath, opts) {
		return _fs.listTree(dirPath).then(function (files) {
			const ext = '.js';
			const moduleFiles = _privateUBag.flatMap(files, function (f) {
				if (!f.endsWith(ext)) return [];
				if (opts.exclude && opts.exclude.test(f)) return [];
				const noExt = f.slice(0, f.length - ext.length);
				return ['./' + _path.relative(dirPath, noExt)];
			}).sort();
			// Dummy Loc. We will not use source maps.
			const loc = _esastDistLoc.singleCharLoc(_esastDistLoc.StartPos);
			const val = _Expression.ListSimple(loc, moduleFiles.map(function (f) {
				return _Expression.Quote.forString(loc, f);
			}));
			const e = _Expression.Module(loc, [], [], [], [], [], _privateUOp.some(val));
			const cx = new _Cx(_privateOpts.OptsFromObject({
				includeSourceMap: false,
				includeModuleDisplayName: false
			}));
			const ast = _transpile(cx, e, new _Vr());
			return _render(cx, ast);
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFjZSxVQUFDLE9BQU8sRUFBRSxJQUFJO1NBQzVCLElBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNsQyxTQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsU0FBTSxXQUFXLEdBQUcsYUFUYixPQUFPLENBU2MsS0FBSyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3ZDLFFBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUNuQixPQUFPLEVBQUUsQ0FBQTtBQUNWLFFBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDdkMsT0FBTyxFQUFFLENBQUE7QUFDVixVQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMvQyxXQUFPLFFBQU8sTUFyQlIsUUFBUSxDQXFCUyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUksQ0FBQTtJQUMxQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7O0FBRVQsU0FBTSxHQUFHLEdBQUcsY0ExQkwsYUFBYSxlQUFFLFFBQVEsQ0EwQkssQ0FBQTtBQUNuQyxTQUFNLEdBQUcsR0FBRyxZQXhCTCxVQUFVLENBd0JNLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztXQUFJLFlBeEJ0QixLQUFLLENBd0J1QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFFLFNBQU0sQ0FBQyxHQUFHLFlBekJTLE1BQU0sQ0F5QlIsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFuQm5DLElBQUksQ0FtQm9DLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDcEQsU0FBTSxFQUFFLEdBQUcsUUFBTyxhQXhCWCxjQUFjLENBd0JZO0FBQ2hDLG9CQUFnQixFQUFFLEtBQUs7QUFDdkIsNEJBQXdCLEVBQUUsS0FBSztJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNILFNBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFRLENBQUMsQ0FBQTtBQUN0QyxVQUFPLFFBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0dBQ3RCLENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgZnMgZnJvbSAncS1pby9mcydcbmltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IExpc3RTaW1wbGUsIE1vZHVsZSwgUXVvdGUgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IEN4IGZyb20gJy4uL3ByaXZhdGUvQ3gnXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB7IGZsYXRNYXAgfSBmcm9tICcuLi9wcml2YXRlL1UvQmFnJ1xuaW1wb3J0IHsgc29tZSB9IGZyb20gJy4uL3ByaXZhdGUvVS9PcCdcbmltcG9ydCBWciBmcm9tICcuLi9wcml2YXRlL1ZyJ1xuXG4vLyBTZWFyY2hlcyBhIGRpcmVjdG9yeSBhbmQgY3JlYXRlcyBhIG1vZHVsZSB3aG9zZSBkZWZhdWx0IGV4cG9ydCBpc1xuLy8gYSBsaXN0IG9mIHRoZSBwYXRocyBvZiBldmVyeSBtb2R1bGUgaW4gdGhhdCBkaXJlY3RvcnksIHJlbGF0aXZlIHRvIGl0LlxuZXhwb3J0IGRlZmF1bHQgKGRpclBhdGgsIG9wdHMpID0+XG5cdGZzLmxpc3RUcmVlKGRpclBhdGgpLnRoZW4oZmlsZXMgPT4ge1xuXHRcdGNvbnN0IGV4dCA9ICcuanMnXG5cdFx0Y29uc3QgbW9kdWxlRmlsZXMgPSBmbGF0TWFwKGZpbGVzLCBmID0+IHtcblx0XHRcdGlmICghZi5lbmRzV2l0aChleHQpKVxuXHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdGlmIChvcHRzLmV4Y2x1ZGUgJiYgb3B0cy5leGNsdWRlLnRlc3QoZikpXG5cdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0Y29uc3Qgbm9FeHQgPSBmLnNsaWNlKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aClcblx0XHRcdHJldHVybiBbIGAuLyR7cmVsYXRpdmUoZGlyUGF0aCwgbm9FeHQpfWAgXVxuXHRcdH0pLnNvcnQoKVxuXHRcdC8vIER1bW15IExvYy4gV2Ugd2lsbCBub3QgdXNlIHNvdXJjZSBtYXBzLlxuXHRcdGNvbnN0IGxvYyA9IHNpbmdsZUNoYXJMb2MoU3RhcnRQb3MpXG5cdFx0Y29uc3QgdmFsID0gTGlzdFNpbXBsZShsb2MsIG1vZHVsZUZpbGVzLm1hcChmID0+IFF1b3RlLmZvclN0cmluZyhsb2MsIGYpKSlcblx0XHRjb25zdCBlID0gTW9kdWxlKGxvYywgW10sIFtdLCBbXSwgW10sIFtdLCBzb21lKHZhbCkpXG5cdFx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IGZhbHNlXG5cdFx0fSkpXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCBuZXcgVnIoKSlcblx0XHRyZXR1cm4gcmVuZGVyKGN4LCBhc3QpXG5cdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==