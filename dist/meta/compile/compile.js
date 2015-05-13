if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/lex', './private/parse/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/util', './private/verify'], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParseParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUUtil, _privateVerify) {

	// See private/Opts.js for description of opts
	'use strict';

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

		_privateUUtil.type(source, String, opts, Object);
		const cx = new _Cx(_privateOpts.OptsFromObject(opts));
		try {
			const e = _parse(cx, _lex(cx, source));
			const vr = _verify(cx, e);
			const ast = _transpile(cx, e, vr);
			let result;
			if (cx.opts.sourceMap()) {
				var _render = _render2(cx, ast);

				const code = _render.code;
				const map = _render.map;

				result = { code: code, sourceMap: map.toJSON() };
			} else result = _render2(cx, ast);
			return { warnings: cx.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2) return { warnings: cx.warnings, result: error };else throw error;
		}
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVd3QixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaEIsVUFBUyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQVUsRUFBRTtjQUFaLElBQVU7TUFBVixJQUFJLHlCQUFHLEVBQUc7O0FBQ2pELGdCQUxRLElBQUksQ0FLUCxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNsQyxRQUFNLEVBQUUsR0FBRyxRQUFPLGFBVFYsY0FBYyxDQVNXLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDdkMsTUFBSTtBQUNILFNBQU0sQ0FBQyxHQUFHLE9BQU0sRUFBRSxFQUFFLEtBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDcEMsU0FBTSxFQUFFLEdBQUcsUUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEIsU0FBTSxHQUFHLEdBQUcsV0FBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLE9BQUksTUFBTSxDQUFBO0FBQ1YsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2tCQUNGLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7VUFBN0IsSUFBSSxXQUFKLElBQUk7VUFBRSxHQUFHLFdBQUgsR0FBRzs7QUFDakIsVUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUE7SUFDMUMsTUFDQSxNQUFNLEdBQUcsU0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDekIsVUFBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQTtHQUN4QyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2YsT0FBSSxLQUFLLDBCQUF3QixFQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLEtBRS9DLE1BQU0sS0FBSyxDQUFBO0dBQ1o7RUFDRCIsImZpbGUiOiJtZXRhL2NvbXBpbGUvY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi9Db21waWxlRXJyb3InXG5pbXBvcnQgQ3ggZnJvbSAnLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleCBmcm9tICcuL3ByaXZhdGUvbGV4L2xleCdcbmltcG9ydCBwYXJzZSBmcm9tICcuL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4vcHJpdmF0ZS9PcHRzJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB7IHR5cGUgfSBmcm9tICcuL3ByaXZhdGUvVS91dGlsJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuL3ByaXZhdGUvdmVyaWZ5J1xuXG4vLyBTZWUgcHJpdmF0ZS9PcHRzLmpzIGZvciBkZXNjcmlwdGlvbiBvZiBvcHRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21waWxlKHNvdXJjZSwgb3B0cyA9IHsgfSkge1xuXHR0eXBlKHNvdXJjZSwgU3RyaW5nLCBvcHRzLCBPYmplY3QpXG5cdGNvbnN0IGN4ID0gbmV3IEN4KE9wdHNGcm9tT2JqZWN0KG9wdHMpKVxuXHR0cnkge1xuXHRcdGNvbnN0IGUgPSBwYXJzZShjeCwgbGV4KGN4LCBzb3VyY2UpKVxuXHRcdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHRcdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdFx0bGV0IHJlc3VsdFxuXHRcdGlmIChjeC5vcHRzLnNvdXJjZU1hcCgpKSB7XG5cdFx0XHRjb25zdCB7IGNvZGUsIG1hcCB9ID0gcmVuZGVyKGN4LCBhc3QpXG5cdFx0XHRyZXN1bHQgPSB7IGNvZGUsIHNvdXJjZU1hcDogbWFwLnRvSlNPTigpIH1cblx0XHR9IGVsc2Vcblx0XHRcdHJlc3VsdCA9IHJlbmRlcihjeCwgYXN0KVxuXHRcdHJldHVybiB7IHdhcm5pbmdzOiBjeC53YXJuaW5ncywgcmVzdWx0IH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpXG5cdFx0XHRyZXR1cm4geyB3YXJuaW5nczogY3gud2FybmluZ3MsIHJlc3VsdDogZXJyb3IgfVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IGVycm9yXG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9