if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/CompileContext', './private/CompileOptions', './private/lex', './private/parse/parse', './private/render', './private/transpile/transpile', './private/util', './private/verify'], function (exports, module, _CompileError, _privateCompileContext, _privateCompileOptions, _privateLex, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateUtil, _privateVerify) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _CompileError2 = _interopRequire(_CompileError);

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

	var _lex = _interopRequire(_privateLex);

	var _parse = _interopRequire(_privateParseParse);

	var _render = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	// See private/Opts.js for description of opts

	module.exports = function (source, opts) {
		(0, _privateUtil.type)(source, String);
		const context = new _CompileContext(new _CompileOptions(opts));
		try {
			const ast = (0, _parse)(context, (0, _lex)(context, source));
			const esAst = (0, _transpile)(context, ast, (0, _verify)(context, ast));
			const result = (0, _render)(context, esAst);
			return { warnings: context.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2) return { warnings: context.warnings, result: error };else throw error;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVdlLFVBQUMsTUFBTSxFQUFFLElBQUksRUFBSztBQUNoQyxtQkFMUSxJQUFJLEVBS1AsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3BCLFFBQU0sT0FBTyxHQUFHLG9CQUFtQixvQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM1RCxNQUFJO0FBQ0gsU0FBTSxHQUFHLEdBQUcsWUFBTSxPQUFPLEVBQUUsVUFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNoRCxTQUFNLEtBQUssR0FBRyxnQkFBVSxPQUFPLEVBQUUsR0FBRyxFQUFFLGFBQU8sT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDM0QsU0FBTSxNQUFNLEdBQUcsYUFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDckMsVUFBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQTtHQUM3QyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2YsT0FBSSxLQUFLLDBCQUF3QixFQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLEtBRXBELE1BQU0sS0FBSyxDQUFBO0dBQ1o7RUFDRCIsImZpbGUiOiJtZXRhL2NvbXBpbGUvY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi9Db21waWxlRXJyb3InXG5pbXBvcnQgQ29tcGlsZUNvbnRleHQgZnJvbSAnLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4vcHJpdmF0ZS9Db21waWxlT3B0aW9ucydcbmltcG9ydCBsZXggZnJvbSAnLi9wcml2YXRlL2xleCdcbmltcG9ydCBwYXJzZSBmcm9tICcuL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJy4vcHJpdmF0ZS91dGlsJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuL3ByaXZhdGUvdmVyaWZ5J1xuXG4vLyBTZWUgcHJpdmF0ZS9PcHRzLmpzIGZvciBkZXNjcmlwdGlvbiBvZiBvcHRzXG5leHBvcnQgZGVmYXVsdCAoc291cmNlLCBvcHRzKSA9PiB7XG5cdHR5cGUoc291cmNlLCBTdHJpbmcpXG5cdGNvbnN0IGNvbnRleHQgPSBuZXcgQ29tcGlsZUNvbnRleHQobmV3IENvbXBpbGVPcHRpb25zKG9wdHMpKVxuXHR0cnkge1xuXHRcdGNvbnN0IGFzdCA9IHBhcnNlKGNvbnRleHQsIGxleChjb250ZXh0LCBzb3VyY2UpKVxuXHRcdGNvbnN0IGVzQXN0ID0gdHJhbnNwaWxlKGNvbnRleHQsIGFzdCwgdmVyaWZ5KGNvbnRleHQsIGFzdCkpXG5cdFx0Y29uc3QgcmVzdWx0ID0gcmVuZGVyKGNvbnRleHQsIGVzQXN0KVxuXHRcdHJldHVybiB7IHdhcm5pbmdzOiBjb250ZXh0Lndhcm5pbmdzLCByZXN1bHQgfVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdHJldHVybiB7IHdhcm5pbmdzOiBjb250ZXh0Lndhcm5pbmdzLCByZXN1bHQ6IGVycm9yIH1cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==