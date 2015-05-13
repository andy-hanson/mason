if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/Cx', '../private/Opts', '../private/transpile/transpile', '../private/render', '../private/U/Bag', '../private/Vr'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUBag, _privateVr) {
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
			const e = _Expression.Module(loc, [], [], [], [], [], val);
			const cx = new _Cx(_privateOpts.OptsFromObject({
				includeSourceMap: false,
				includeModuleDisplayName: false
			}));
			const ast = _transpile(cx, e, new _Vr());
			return _render(cx, ast);
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxJQUFJO1NBQzVCLElBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUNsQyxTQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsU0FBTSxXQUFXLEdBQUcsYUFSYixPQUFPLENBUWMsS0FBSyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3ZDLFFBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUNuQixPQUFPLEVBQUUsQ0FBQTtBQUNWLFFBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDdkMsT0FBTyxFQUFFLENBQUE7QUFDVixVQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMvQyxXQUFPLFFBQU8sTUFwQlIsUUFBUSxDQW9CUyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUksQ0FBQTtJQUMxQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7O0FBRVQsU0FBTSxHQUFHLEdBQUcsY0F6QkwsYUFBYSxlQUFFLFFBQVEsQ0F5QkssQ0FBQTtBQUNuQyxTQUFNLEdBQUcsR0FBRyxZQXZCTCxVQUFVLENBdUJNLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztXQUFJLFlBdkJ0QixLQUFLLENBdUJ1QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQyxDQUFBO0FBQzFFLFNBQU0sQ0FBQyxHQUFHLFlBeEJTLE1BQU0sQ0F3QlIsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDOUMsU0FBTSxFQUFFLEdBQUcsUUFBTyxhQXZCWCxjQUFjLENBdUJZO0FBQ2hDLG9CQUFnQixFQUFFLEtBQUs7QUFDdkIsNEJBQXdCLEVBQUUsS0FBSztJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNILFNBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFRLENBQUMsQ0FBQTtBQUN0QyxVQUFPLFFBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0dBQ3RCLENBQUM7RUFBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2xpc3QtbW9kdWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZUNoYXJMb2MsIFN0YXJ0UG9zIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgZnMgZnJvbSAncS1pby9mcydcbmltcG9ydCB7IHJlbGF0aXZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IExpc3RTaW1wbGUsIE1vZHVsZSwgUXVvdGUgfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IEN4IGZyb20gJy4uL3ByaXZhdGUvQ3gnXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB7IGZsYXRNYXAgfSBmcm9tICcuLi9wcml2YXRlL1UvQmFnJ1xuaW1wb3J0IFZyIGZyb20gJy4uL3ByaXZhdGUvVnInXG5cbi8vIFNlYXJjaGVzIGEgZGlyZWN0b3J5IGFuZCBjcmVhdGVzIGEgbW9kdWxlIHdob3NlIGRlZmF1bHQgZXhwb3J0IGlzXG4vLyBhIGxpc3Qgb2YgdGhlIHBhdGhzIG9mIGV2ZXJ5IG1vZHVsZSBpbiB0aGF0IGRpcmVjdG9yeSwgcmVsYXRpdmUgdG8gaXQuXG5leHBvcnQgZGVmYXVsdCAoZGlyUGF0aCwgb3B0cykgPT5cblx0ZnMubGlzdFRyZWUoZGlyUGF0aCkudGhlbihmaWxlcyA9PiB7XG5cdFx0Y29uc3QgZXh0ID0gJy5qcydcblx0XHRjb25zdCBtb2R1bGVGaWxlcyA9IGZsYXRNYXAoZmlsZXMsIGYgPT4ge1xuXHRcdFx0aWYgKCFmLmVuZHNXaXRoKGV4dCkpXG5cdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0aWYgKG9wdHMuZXhjbHVkZSAmJiBvcHRzLmV4Y2x1ZGUudGVzdChmKSlcblx0XHRcdFx0cmV0dXJuIFtdXG5cdFx0XHRjb25zdCBub0V4dCA9IGYuc2xpY2UoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKVxuXHRcdFx0cmV0dXJuIFsgYC4vJHtyZWxhdGl2ZShkaXJQYXRoLCBub0V4dCl9YCBdXG5cdFx0fSkuc29ydCgpXG5cdFx0Ly8gRHVtbXkgTG9jLiBXZSB3aWxsIG5vdCB1c2Ugc291cmNlIG1hcHMuXG5cdFx0Y29uc3QgbG9jID0gc2luZ2xlQ2hhckxvYyhTdGFydFBvcylcblx0XHRjb25zdCB2YWwgPSBMaXN0U2ltcGxlKGxvYywgbW9kdWxlRmlsZXMubWFwKGYgPT4gUXVvdGUuZm9yU3RyaW5nKGxvYywgZikpKVxuXHRcdGNvbnN0IGUgPSBNb2R1bGUobG9jLCBbXSwgW10sIFtdLCBbXSwgW10sIHZhbClcblx0XHRjb25zdCBjeCA9IG5ldyBDeChPcHRzRnJvbU9iamVjdCh7XG5cdFx0XHRpbmNsdWRlU291cmNlTWFwOiBmYWxzZSxcblx0XHRcdGluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZTogZmFsc2Vcblx0XHR9KSlcblx0XHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIG5ldyBWcigpKVxuXHRcdHJldHVybiByZW5kZXIoY3gsIGFzdClcblx0fSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9