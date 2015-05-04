if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'q-io/fs', 'path', '../Expression', '../private/Cx', '../private/Opts', '../private/transpile/transpile', '../private/render', '../private/U/Bag', '../private/Vr'], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUBag, _privateVr) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs = _interopRequire(_qIoFs);

	var _Cx = _interopRequire(_privateCx);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _render = _interopRequire(_privateRender);

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
			const e = _Expression.Module(loc, [], [], [], _Expression.BlockDo(loc, [_Expression.ModuleDefaultExport(loc, val)]));

			const cx = new _Cx(_privateOpts.OptsFromObject({
				includeSourceMap: false,
				includeModuleDisplayName: false
			}));
			const ast = _transpile(cx, e, _privateVr.emptyVr());
			return _render(cx, ast);
		});
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBYWUsVUFBQyxPQUFPLEVBQUUsSUFBSTtTQUM1QixJQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDbEMsU0FBTSxHQUFHLEdBQUcsS0FBSyxDQUFBO0FBQ2pCLFNBQU0sV0FBVyxHQUFHLGFBUmIsT0FBTyxDQVFjLEtBQUssRUFBRSxVQUFBLENBQUMsRUFBSTtBQUN2QyxRQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFDbkIsT0FBTyxFQUFFLENBQUE7QUFDVixRQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3ZDLE9BQU8sRUFBRSxDQUFBO0FBQ1YsVUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsV0FBTyxRQUFPLE1BcEJSLFFBQVEsQ0FvQlMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFJLENBQUE7SUFDMUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBOztBQUVULFNBQU0sR0FBRyxHQUFHLGNBekJMLGFBQWEsZUFBRSxRQUFRLENBeUJLLENBQUE7QUFDbkMsU0FBTSxHQUFHLEdBQUcsWUF2QkksVUFBVSxDQXVCSCxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7V0FBSSxZQXZCUSxLQUFLLENBdUJQLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQUE7QUFDMUUsU0FBTSxDQUFDLEdBQUcsWUF4QmtCLE1BQU0sQ0F3QmpCLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxZQXhCM0IsT0FBTyxDQXdCNEIsR0FBRyxFQUFFLENBQUUsWUF4QmIsbUJBQW1CLENBd0JjLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQTs7QUFFbEYsU0FBTSxFQUFFLEdBQUcsUUFBTyxhQXhCWCxjQUFjLENBd0JZO0FBQ2hDLG9CQUFnQixFQUFFLEtBQUs7QUFDdkIsNEJBQXdCLEVBQUUsS0FBSztJQUMvQixDQUFDLENBQUMsQ0FBQTtBQUNILFNBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxXQXhCdEIsT0FBTyxFQXdCd0IsQ0FBQyxDQUFBO0FBQ3ZDLFVBQU8sUUFBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7R0FDdEIsQ0FBQztFQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvbGlzdC1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2luZ2xlQ2hhckxvYywgU3RhcnRQb3MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCBmcyBmcm9tICdxLWlvL2ZzJ1xuaW1wb3J0IHsgcmVsYXRpdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgQmxvY2tEbywgTGlzdFNpbXBsZSwgTW9kdWxlLCBNb2R1bGVEZWZhdWx0RXhwb3J0LCBRdW90ZSB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHsgZmxhdE1hcCB9IGZyb20gJy4uL3ByaXZhdGUvVS9CYWcnXG5pbXBvcnQgeyBlbXB0eVZyIH0gZnJvbSAnLi4vcHJpdmF0ZS9WcidcblxuLy8gU2VhcmNoZXMgYSBkaXJlY3RvcnkgYW5kIGNyZWF0ZXMgYSBtb2R1bGUgd2hvc2UgZGVmYXVsdCBleHBvcnQgaXNcbi8vIGEgbGlzdCBvZiB0aGUgcGF0aHMgb2YgZXZlcnkgbW9kdWxlIGluIHRoYXQgZGlyZWN0b3J5LCByZWxhdGl2ZSB0byBpdC5cbmV4cG9ydCBkZWZhdWx0IChkaXJQYXRoLCBvcHRzKSA9PlxuXHRmcy5saXN0VHJlZShkaXJQYXRoKS50aGVuKGZpbGVzID0+IHtcblx0XHRjb25zdCBleHQgPSAnLmpzJ1xuXHRcdGNvbnN0IG1vZHVsZUZpbGVzID0gZmxhdE1hcChmaWxlcywgZiA9PiB7XG5cdFx0XHRpZiAoIWYuZW5kc1dpdGgoZXh0KSlcblx0XHRcdFx0cmV0dXJuIFtdXG5cdFx0XHRpZiAob3B0cy5leGNsdWRlICYmIG9wdHMuZXhjbHVkZS50ZXN0KGYpKVxuXHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdGNvbnN0IG5vRXh0ID0gZi5zbGljZSgwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpXG5cdFx0XHRyZXR1cm4gWyBgLi8ke3JlbGF0aXZlKGRpclBhdGgsIG5vRXh0KX1gIF1cblx0XHR9KS5zb3J0KClcblx0XHQvLyBEdW1teSBMb2MuIFdlIHdpbGwgbm90IHVzZSBzb3VyY2UgbWFwcy5cblx0XHRjb25zdCBsb2MgPSBzaW5nbGVDaGFyTG9jKFN0YXJ0UG9zKVxuXHRcdGNvbnN0IHZhbCA9IExpc3RTaW1wbGUobG9jLCBtb2R1bGVGaWxlcy5tYXAoZiA9PiBRdW90ZS5mb3JTdHJpbmcobG9jLCBmKSkpXG5cdFx0Y29uc3QgZSA9IE1vZHVsZShsb2MsIFtdLCBbXSwgW10sIEJsb2NrRG8obG9jLCBbIE1vZHVsZURlZmF1bHRFeHBvcnQobG9jLCB2YWwpIF0pKVxuXG5cdFx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qoe1xuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogZmFsc2UsXG5cdFx0XHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IGZhbHNlXG5cdFx0fSkpXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCBlbXB0eVZyKCkpXG5cdFx0cmV0dXJuIHJlbmRlcihjeCwgYXN0KVxuXHR9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=