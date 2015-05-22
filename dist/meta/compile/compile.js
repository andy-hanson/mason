if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/CompileContext', './private/CompileOptions', './private/lex', './private/parse/parse', './private/render', './private/transpile/transpile', './private/util', './private/verify'], function (exports, module, _CompileError, _privateCompileContext, _privateCompileOptions, _privateLex, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateUtil, _privateVerify) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _CompileError2 = _interopRequireDefault(_CompileError);

	var _CompileContext = _interopRequireDefault(_privateCompileContext);

	var _CompileOptions = _interopRequireDefault(_privateCompileOptions);

	var _lex = _interopRequireDefault(_privateLex);

	var _parse = _interopRequireDefault(_privateParseParse);

	var _render = _interopRequireDefault(_privateRender);

	var _transpile = _interopRequireDefault(_privateTranspileTranspile);

	var _verify = _interopRequireDefault(_privateVerify);

	// See private/Opts.js for description of opts

	module.exports = function (source, opts) {
		(0, _privateUtil.type)(source, String);
		const context = new _CompileContext.default(new _CompileOptions.default(opts));
		try {
			const ast = (0, _parse.default)(context, (0, _lex.default)(context, source));
			const esAst = (0, _transpile.default)(context, ast, (0, _verify.default)(context, ast));
			const result = (0, _render.default)(context, esAst);
			return { warnings: context.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2.default) return { warnings: context.warnings, result: error };else throw error;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVdlLFVBQUMsTUFBTSxFQUFFLElBQUksRUFBSztBQUNoQyxtQkFMUSxJQUFJLEVBS1AsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3BCLFFBQU0sT0FBTyxHQUFHLDRCQUFtQiw0QkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM1RCxNQUFJO0FBQ0gsU0FBTSxHQUFHLEdBQUcsb0JBQU0sT0FBTyxFQUFFLGtCQUFJLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ2hELFNBQU0sS0FBSyxHQUFHLHdCQUFVLE9BQU8sRUFBRSxHQUFHLEVBQUUscUJBQU8sT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDM0QsU0FBTSxNQUFNLEdBQUcscUJBQU8sT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3JDLFVBQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUE7R0FDN0MsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNmLE9BQUksS0FBSyxrQ0FBd0IsRUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQSxLQUVwRCxNQUFNLEtBQUssQ0FBQTtHQUNaO0VBQ0QiLCJmaWxlIjoibWV0YS9jb21waWxlL2NvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IENvbXBpbGVDb250ZXh0IGZyb20gJy4vcHJpdmF0ZS9Db21waWxlQ29udGV4dCdcbmltcG9ydCBDb21waWxlT3B0aW9ucyBmcm9tICcuL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgbGV4IGZyb20gJy4vcHJpdmF0ZS9sZXgnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB7IHR5cGUgfSBmcm9tICcuL3ByaXZhdGUvdXRpbCdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi9wcml2YXRlL3ZlcmlmeSdcblxuLy8gU2VlIHByaXZhdGUvT3B0cy5qcyBmb3IgZGVzY3JpcHRpb24gb2Ygb3B0c1xuZXhwb3J0IGRlZmF1bHQgKHNvdXJjZSwgb3B0cykgPT4ge1xuXHR0eXBlKHNvdXJjZSwgU3RyaW5nKVxuXHRjb25zdCBjb250ZXh0ID0gbmV3IENvbXBpbGVDb250ZXh0KG5ldyBDb21waWxlT3B0aW9ucyhvcHRzKSlcblx0dHJ5IHtcblx0XHRjb25zdCBhc3QgPSBwYXJzZShjb250ZXh0LCBsZXgoY29udGV4dCwgc291cmNlKSlcblx0XHRjb25zdCBlc0FzdCA9IHRyYW5zcGlsZShjb250ZXh0LCBhc3QsIHZlcmlmeShjb250ZXh0LCBhc3QpKVxuXHRcdGNvbnN0IHJlc3VsdCA9IHJlbmRlcihjb250ZXh0LCBlc0FzdClcblx0XHRyZXR1cm4geyB3YXJuaW5nczogY29udGV4dC53YXJuaW5ncywgcmVzdWx0IH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpXG5cdFx0XHRyZXR1cm4geyB3YXJuaW5nczogY29udGV4dC53YXJuaW5ncywgcmVzdWx0OiBlcnJvciB9XG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=