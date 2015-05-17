if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/CompileContext', './private/CompileOptions', './private/lex/ungrouped', './private/lex/group', './private/parse/parse', './private/render', './private/transpile/transpile', './private/util', './private/verify'], function (exports, module, _CompileError, _privateCompileContext, _privateCompileOptions, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateUtil, _privateVerify) {
	'use strict';

	// See private/Opts.js for description of opts
	module.exports = compile;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _CompileError2 = _interopRequire(_CompileError);

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	function compile(source, opts) {
		(0, _privateUtil.type)(source, String);
		const cx = new _CompileContext(new _CompileOptions(opts));
		try {
			const e = (0, _parse)(cx, (0, _lexGroup)(cx, (0, _lexUngrouped)(cx, source)));
			const vr = (0, _verify)(cx, e);
			const ast = (0, _transpile)(cx, e, vr);
			let result;
			if (cx.opts.includeSourceMap()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7a0JBWXdCLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaEIsVUFBUyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUM3QyxtQkFMUSxJQUFJLEVBS1AsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3BCLFFBQU0sRUFBRSxHQUFHLG9CQUFtQixvQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN2RCxNQUFJO0FBQ0gsU0FBTSxDQUFDLEdBQUcsWUFBTSxFQUFFLEVBQUUsZUFBUyxFQUFFLEVBQUUsbUJBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMzRCxTQUFNLEVBQUUsR0FBRyxhQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN4QixTQUFNLEdBQUcsR0FBRyxnQkFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLE9BQUksTUFBTSxDQUFBO0FBQ1YsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7a0JBQ1QsY0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDOztVQUE3QixJQUFJLFdBQUosSUFBSTtVQUFFLEdBQUcsV0FBSCxHQUFHOztBQUNqQixVQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQTtJQUMxQyxNQUNBLE1BQU0sR0FBRyxjQUFPLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN6QixVQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFBO0dBQ3hDLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZixPQUFJLEtBQUssMEJBQXdCLEVBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUEsS0FFL0MsTUFBTSxLQUFLLENBQUE7R0FDWjtFQUNEIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuL0NvbXBpbGVFcnJvcidcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuL3ByaXZhdGUvQ29tcGlsZUNvbnRleHQnXG5pbXBvcnQgQ29tcGlsZU9wdGlvbnMgZnJvbSAnLi9wcml2YXRlL0NvbXBpbGVPcHRpb25zJ1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuL3ByaXZhdGUvbGV4L2dyb3VwJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi9wcml2YXRlL3V0aWwnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4vcHJpdmF0ZS92ZXJpZnknXG5cbi8vIFNlZSBwcml2YXRlL09wdHMuanMgZm9yIGRlc2NyaXB0aW9uIG9mIG9wdHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoc291cmNlLCBvcHRzKSB7XG5cdHR5cGUoc291cmNlLCBTdHJpbmcpXG5cdGNvbnN0IGN4ID0gbmV3IENvbXBpbGVDb250ZXh0KG5ldyBDb21waWxlT3B0aW9ucyhvcHRzKSlcblx0dHJ5IHtcblx0XHRjb25zdCBlID0gcGFyc2UoY3gsIGxleEdyb3VwKGN4LCBsZXhVbmdyb3VwZWQoY3gsIHNvdXJjZSkpKVxuXHRcdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHRcdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdFx0bGV0IHJlc3VsdFxuXHRcdGlmIChjeC5vcHRzLmluY2x1ZGVTb3VyY2VNYXAoKSkge1xuXHRcdFx0Y29uc3QgeyBjb2RlLCBtYXAgfSA9IHJlbmRlcihjeCwgYXN0KVxuXHRcdFx0cmVzdWx0ID0geyBjb2RlLCBzb3VyY2VNYXA6IG1hcC50b0pTT04oKSB9XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXN1bHQgPSByZW5kZXIoY3gsIGFzdClcblx0XHRyZXR1cm4geyB3YXJuaW5nczogY3gud2FybmluZ3MsIHJlc3VsdCB9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0cmV0dXJuIHsgd2FybmluZ3M6IGN4Lndhcm5pbmdzLCByZXN1bHQ6IGVycm9yIH1cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==