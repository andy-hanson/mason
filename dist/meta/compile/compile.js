if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './CompileError', './private/Cx', './private/lex/lex', './private/parse/parse', './private/Opts', './private/render', './private/transpile/transpile', './private/U/type', './private/verify/verify'], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParseParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUType, _privateVerifyVerify) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	// See private/Opts.js for description of opts
	module.exports = compile;

	var _CompileError2 = _interopRequire(_CompileError);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _type = _interopRequire(_privateUType);

	var _verify = _interopRequire(_privateVerifyVerify);

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
//# sourceMappingURL=../../meta/compile/compile.js.map