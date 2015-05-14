if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/lex', './private/parse/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/util', './private/verify'], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParseParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUUtil, _privateVerify) {
	'use strict';

	// See private/Opts.js for description of opts
	module.exports = compile;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _CompileError2 = _interopRequire(_CompileError);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	function compile(source, _ref) {
		var _ref2 = _ref;
		let opts = _ref2 === undefined ? {} : _ref2;

		(0, _privateUUtil.type)(source, String, opts, Object);
		const cx = new _Cx((0, _privateOpts.OptsFromObject)(opts));
		try {
			const e = (0, _parse)(cx, (0, _lex)(cx, source));
			const vr = (0, _verify)(cx, e);
			const ast = (0, _transpile)(cx, e, vr);
			let result;
			if (cx.opts.sourceMap()) {
				var _render = (0, _render2)(cx, ast);

				const code = _render.code;
				const map = _render.map;

				result = { code: code, sourceMap: map.toJSON() };
			} else result = (0, _render2)(cx, ast);
			return { warnings: cx.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2) return { warnings: cx.warnings, result: error };else throw error;
		}
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7a0JBV3dCLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFoQixVQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBVSxFQUFFO2NBQVosSUFBVTtNQUFWLElBQUkseUJBQUcsRUFBRzs7QUFDakQsb0JBTFEsSUFBSSxFQUtQLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ2xDLFFBQU0sRUFBRSxHQUFHLFFBQU8saUJBVFYsY0FBYyxFQVNXLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDdkMsTUFBSTtBQUNILFNBQU0sQ0FBQyxHQUFHLFlBQU0sRUFBRSxFQUFFLFVBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDcEMsU0FBTSxFQUFFLEdBQUcsYUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEIsU0FBTSxHQUFHLEdBQUcsZ0JBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNoQyxPQUFJLE1BQU0sQ0FBQTtBQUNWLE9BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtrQkFDRixjQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1VBQTdCLElBQUksV0FBSixJQUFJO1VBQUUsR0FBRyxXQUFILEdBQUc7O0FBQ2pCLFVBQU0sR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFBO0lBQzFDLE1BQ0EsTUFBTSxHQUFHLGNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3pCLFVBQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUE7R0FDeEMsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNmLE9BQUksS0FBSywwQkFBd0IsRUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQSxLQUUvQyxNQUFNLEtBQUssQ0FBQTtHQUNaO0VBQ0QiLCJmaWxlIjoibWV0YS9jb21waWxlL2NvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEN4IGZyb20gJy4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi9wcml2YXRlL2xleC9sZXgnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHsgT3B0c0Zyb21PYmplY3QgfSBmcm9tICcuL3ByaXZhdGUvT3B0cydcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi9wcml2YXRlL1UvdXRpbCdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi9wcml2YXRlL3ZlcmlmeSdcblxuLy8gU2VlIHByaXZhdGUvT3B0cy5qcyBmb3IgZGVzY3JpcHRpb24gb2Ygb3B0c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGlsZShzb3VyY2UsIG9wdHMgPSB7IH0pIHtcblx0dHlwZShzb3VyY2UsIFN0cmluZywgb3B0cywgT2JqZWN0KVxuXHRjb25zdCBjeCA9IG5ldyBDeChPcHRzRnJvbU9iamVjdChvcHRzKSlcblx0dHJ5IHtcblx0XHRjb25zdCBlID0gcGFyc2UoY3gsIGxleChjeCwgc291cmNlKSlcblx0XHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0XHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHRcdGxldCByZXN1bHRcblx0XHRpZiAoY3gub3B0cy5zb3VyY2VNYXAoKSkge1xuXHRcdFx0Y29uc3QgeyBjb2RlLCBtYXAgfSA9IHJlbmRlcihjeCwgYXN0KVxuXHRcdFx0cmVzdWx0ID0geyBjb2RlLCBzb3VyY2VNYXA6IG1hcC50b0pTT04oKSB9XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXN1bHQgPSByZW5kZXIoY3gsIGFzdClcblx0XHRyZXR1cm4geyB3YXJuaW5nczogY3gud2FybmluZ3MsIHJlc3VsdCB9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0cmV0dXJuIHsgd2FybmluZ3M6IGN4Lndhcm5pbmdzLCByZXN1bHQ6IGVycm9yIH1cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==