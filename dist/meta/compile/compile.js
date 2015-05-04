if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/lex', './private/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/type', './private/verify'], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUType, _privateVerify) {

	// See private/Opts.js for description of opts
	'use strict';

	module.exports = compile;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

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

				result = { code: code, sourceMap: map.toJSON() };
			} else result = _render2(cx, ast);
			return { warnings: cx.warnings, result: result };
		} catch (error) {
			if (error instanceof _CompileError2) return { warnings: cx.warnings, result: error };else throw error;
		}
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWN3QixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFIL0IsT0FBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7QUFHSixVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzFDLFFBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDL0IsUUFBTSxFQUFFLEdBQUcsUUFBTyxhQVpWLGNBQWMsQ0FZVyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLE1BQUk7QUFDSCxTQUFNLENBQUMsR0FBRyxPQUFNLEVBQUUsRUFBRSxLQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLFNBQU0sRUFBRSxHQUFHLFFBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3hCLFNBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNoQyxPQUFJLE1BQU0sQ0FBQTtBQUNWLE9BQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtrQkFDRixTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1VBQTdCLElBQUksV0FBSixJQUFJO1VBQUUsR0FBRyxXQUFILEdBQUc7O0FBQ2pCLFVBQU0sR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFBO0lBQzFDLE1BQ0EsTUFBTSxHQUFHLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3pCLFVBQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLENBQUE7R0FDeEMsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNmLE9BQUksS0FBSywwQkFBd0IsRUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQSxLQUUvQyxNQUFNLEtBQUssQ0FBQTtHQUNaO0VBQ0QiLCJmaWxlIjoibWV0YS9jb21waWxlL2NvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEN4IGZyb20gJy4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi9wcml2YXRlL2xleC9sZXgnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wcml2YXRlL3BhcnNlJ1xuaW1wb3J0IHsgT3B0c0Zyb21PYmplY3QgfSBmcm9tICcuL3ByaXZhdGUvT3B0cydcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgdHlwZSBmcm9tICcuL3ByaXZhdGUvVS90eXBlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuL3ByaXZhdGUvdmVyaWZ5J1xuXG4vLyBTcGVlZCBib29zdCBieSB0dXJuaW5nIHRoaXMgb2ZmXG5nbG9iYWwuREVCVUcgPSB0cnVlXG5cbi8vIFNlZSBwcml2YXRlL09wdHMuanMgZm9yIGRlc2NyaXB0aW9uIG9mIG9wdHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoc3JjLCBvcHRzKSB7XG5cdHR5cGUoc3JjLCBTdHJpbmcsIG9wdHMsIE9iamVjdClcblx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qob3B0cykpXG5cdHRyeSB7XG5cdFx0Y29uc3QgZSA9IHBhcnNlKGN4LCBsZXgoY3gsIHNyYykpXG5cdFx0Y29uc3QgdnIgPSB2ZXJpZnkoY3gsIGUpXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0XHRsZXQgcmVzdWx0XG5cdFx0aWYgKGN4Lm9wdHMuc291cmNlTWFwKCkpIHtcblx0XHRcdGNvbnN0IHsgY29kZSwgbWFwIH0gPSByZW5kZXIoY3gsIGFzdClcblx0XHRcdHJlc3VsdCA9IHsgY29kZSwgc291cmNlTWFwOiBtYXAudG9KU09OKCkgfVxuXHRcdH0gZWxzZVxuXHRcdFx0cmVzdWx0ID0gcmVuZGVyKGN4LCBhc3QpXG5cdFx0cmV0dXJuIHsgd2FybmluZ3M6IGN4Lndhcm5pbmdzLCByZXN1bHQgfVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdHJldHVybiB7IHdhcm5pbmdzOiBjeC53YXJuaW5ncywgcmVzdWx0OiBlcnJvciB9XG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=