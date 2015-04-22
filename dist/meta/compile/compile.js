if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/lex', './private/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/type', './private/verify'], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUType, _privateVerify) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	// See private/Opts.js for description of opts
	module.exports = compile;

	var _CompileError2 = _interopRequire(_CompileError);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _parse = _interopRequire(_privateParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _type = _interopRequire(_privateUType);

	var _verify = _interopRequire(_privateVerify);

	// Speed boost by turning this off
	global.DEBUG = true;
	function compile(src, opts) {
		_type(src, String, opts, Object);
		const cx = new _Cx(_privateOpts.OptsFromObject(opts));
		try {
			const e = _parse(cx, _lex(cx, src));
			const vr = _verify(cx, e);
			const ast = _transpile(cx, e, vr);
			let result;
			if (cx.opts.sourceMap()) {
				var _render = _render2(cx, ast);

				const code = _render.code;
				const map = _render.map;

				// TODO: There must be a better way of doing this...
				result = { code: code, sourceMap: JSON.parse(map.toString()) };
			} else result = _render2(cx, ast);
			return { warnings: cx.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2) return { warnings: cx.warnings, result: error };else throw error;
		}
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFjd0IsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUgvQixPQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtBQUdKLFVBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUMsUUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMvQixRQUFNLEVBQUUsR0FBRyxRQUFPLGFBWlYsY0FBYyxDQVlXLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDdkMsTUFBSTtBQUNILFNBQU0sQ0FBQyxHQUFHLE9BQU0sRUFBRSxFQUFFLEtBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsU0FBTSxFQUFFLEdBQUcsUUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEIsU0FBTSxHQUFHLEdBQUcsV0FBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLE9BQUksTUFBTSxDQUFBO0FBQ1YsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2tCQUNGLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7VUFBN0IsSUFBSSxXQUFKLElBQUk7VUFBRSxHQUFHLFdBQUgsR0FBRzs7O0FBRWpCLFVBQU0sR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQTtJQUN4RCxNQUNBLE1BQU0sR0FBRyxTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN6QixVQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFBO0dBQ3hDLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZixPQUFJLEtBQUssMEJBQXdCLEVBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUEsS0FFL0MsTUFBTSxLQUFLLENBQUE7R0FDWjtFQUNEIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuL0NvbXBpbGVFcnJvcidcbmltcG9ydCBDeCBmcm9tICcuL3ByaXZhdGUvQ3gnXG5pbXBvcnQgbGV4IGZyb20gJy4vcHJpdmF0ZS9sZXgvbGV4J1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcHJpdmF0ZS9wYXJzZSdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi9wcml2YXRlL09wdHMnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHR5cGUgZnJvbSAnLi9wcml2YXRlL1UvdHlwZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi9wcml2YXRlL3ZlcmlmeSdcblxuLy8gU3BlZWQgYm9vc3QgYnkgdHVybmluZyB0aGlzIG9mZlxuZ2xvYmFsLkRFQlVHID0gdHJ1ZVxuXG4vLyBTZWUgcHJpdmF0ZS9PcHRzLmpzIGZvciBkZXNjcmlwdGlvbiBvZiBvcHRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21waWxlKHNyYywgb3B0cykge1xuXHR0eXBlKHNyYywgU3RyaW5nLCBvcHRzLCBPYmplY3QpXG5cdGNvbnN0IGN4ID0gbmV3IEN4KE9wdHNGcm9tT2JqZWN0KG9wdHMpKVxuXHR0cnkge1xuXHRcdGNvbnN0IGUgPSBwYXJzZShjeCwgbGV4KGN4LCBzcmMpKVxuXHRcdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHRcdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdFx0bGV0IHJlc3VsdFxuXHRcdGlmIChjeC5vcHRzLnNvdXJjZU1hcCgpKSB7XG5cdFx0XHRjb25zdCB7IGNvZGUsIG1hcCB9ID0gcmVuZGVyKGN4LCBhc3QpXG5cdFx0XHQvLyBUT0RPOiBUaGVyZSBtdXN0IGJlIGEgYmV0dGVyIHdheSBvZiBkb2luZyB0aGlzLi4uXG5cdFx0XHRyZXN1bHQgPSB7IGNvZGUsIHNvdXJjZU1hcDogSlNPTi5wYXJzZShtYXAudG9TdHJpbmcoKSkgfVxuXHRcdH0gZWxzZVxuXHRcdFx0cmVzdWx0ID0gcmVuZGVyKGN4LCBhc3QpXG5cdFx0cmV0dXJuIHsgd2FybmluZ3M6IGN4Lndhcm5pbmdzLCByZXN1bHQgfVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdHJldHVybiB7IHdhcm5pbmdzOiBjeC53YXJuaW5ncywgcmVzdWx0OiBlcnJvciB9XG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=