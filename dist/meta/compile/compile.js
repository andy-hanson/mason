if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/ungrouped', './private/lex/group', './private/parse/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/util', './private/verify'], function (exports, module, _CompileError, _privateCx, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUUtil, _privateVerify) {
	'use strict';

	// See private/Opts.js for description of opts
	module.exports = compile;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _CompileError2 = _interopRequire(_CompileError);

	var _Cx = _interopRequire(_privateCx);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

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
			const e = (0, _parse)(cx, (0, _lexGroup)(cx, (0, _lexUngrouped)(cx, source)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7a0JBWXdCLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWhCLFVBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFVLEVBQUU7Y0FBWixJQUFVO01BQVYsSUFBSSx5QkFBRyxFQUFHOztBQUNqRCxvQkFMUSxJQUFJLEVBS1AsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDbEMsUUFBTSxFQUFFLEdBQUcsUUFBTyxpQkFUVixjQUFjLEVBU1csSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN2QyxNQUFJO0FBQ0gsU0FBTSxDQUFDLEdBQUcsWUFBTSxFQUFFLEVBQUUsZUFBUyxFQUFFLEVBQUUsbUJBQWEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMzRCxTQUFNLEVBQUUsR0FBRyxhQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN4QixTQUFNLEdBQUcsR0FBRyxnQkFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLE9BQUksTUFBTSxDQUFBO0FBQ1YsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2tCQUNGLGNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7VUFBN0IsSUFBSSxXQUFKLElBQUk7VUFBRSxHQUFHLFdBQUgsR0FBRzs7QUFDakIsVUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUE7SUFDMUMsTUFDQSxNQUFNLEdBQUcsY0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDekIsVUFBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQTtHQUN4QyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2YsT0FBSSxLQUFLLDBCQUF3QixFQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLEtBRS9DLE1BQU0sS0FBSyxDQUFBO0dBQ1o7RUFDRCIsImZpbGUiOiJtZXRhL2NvbXBpbGUvY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi9Db21waWxlRXJyb3InXG5pbXBvcnQgQ3ggZnJvbSAnLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuL3ByaXZhdGUvbGV4L2dyb3VwJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi9wcml2YXRlL09wdHMnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJy4vcHJpdmF0ZS9VL3V0aWwnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4vcHJpdmF0ZS92ZXJpZnknXG5cbi8vIFNlZSBwcml2YXRlL09wdHMuanMgZm9yIGRlc2NyaXB0aW9uIG9mIG9wdHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoc291cmNlLCBvcHRzID0geyB9KSB7XG5cdHR5cGUoc291cmNlLCBTdHJpbmcsIG9wdHMsIE9iamVjdClcblx0Y29uc3QgY3ggPSBuZXcgQ3goT3B0c0Zyb21PYmplY3Qob3B0cykpXG5cdHRyeSB7XG5cdFx0Y29uc3QgZSA9IHBhcnNlKGN4LCBsZXhHcm91cChjeCwgbGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpKSlcblx0XHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0XHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHRcdGxldCByZXN1bHRcblx0XHRpZiAoY3gub3B0cy5zb3VyY2VNYXAoKSkge1xuXHRcdFx0Y29uc3QgeyBjb2RlLCBtYXAgfSA9IHJlbmRlcihjeCwgYXN0KVxuXHRcdFx0cmVzdWx0ID0geyBjb2RlLCBzb3VyY2VNYXA6IG1hcC50b0pTT04oKSB9XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXN1bHQgPSByZW5kZXIoY3gsIGFzdClcblx0XHRyZXR1cm4geyB3YXJuaW5nczogY3gud2FybmluZ3MsIHJlc3VsdCB9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0cmV0dXJuIHsgd2FybmluZ3M6IGN4Lndhcm5pbmdzLCByZXN1bHQ6IGVycm9yIH1cblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==