if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "./CompileError", "./private/Cx", "./private/lex/lex", "./private/parse/parse", "./private/Opts", "./private/render", "./private/transpile/transpile", "./private/U/type", "./private/verify/verify"], function (exports, module, _CompileError, _privateCx, _privateLexLex, _privateParseParse, _privateOpts, _privateRender, _privateTranspileTranspile, _privateUType, _privateVerifyVerify) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	// See private/Opts.js for description of opts
	module.exports = compile;

	var CompileError = _interopRequire(_CompileError);

	var Cx = _interopRequire(_privateCx);

	var lex = _interopRequire(_privateLexLex);

	var parse = _interopRequire(_privateParseParse);

	var OptsFromObject = _privateOpts.OptsFromObject;

	var render = _interopRequire(_privateRender);

	var transpile = _interopRequire(_privateTranspileTranspile);

	var type = _interopRequire(_privateUType);

	var verify = _interopRequire(_privateVerifyVerify);

	// Speed boost by turning this off
	global.DEBUG = true;
	function compile(src, opts) {
		type(src, String, opts, Object);
		const cx = new Cx(OptsFromObject(opts));
		try {
			const e = parse(cx, lex(cx, src));
			const vr = verify(cx, e);
			const ast = transpile(cx, e, vr);
			let result;
			if (cx.opts.sourceMap()) {
				var _render = render(cx, ast);

				const code = _render.code;
				const map = _render.map;

				// TODO: There must be a better way of doing this...
				result = { code: code, sourceMap: JSON.parse(map.toString()) };
			} else result = render(cx, ast);
			return { warnings: cx.warnings, result: result };
		} catch (error) {
			if (error instanceof CompileError) return { warnings: cx.warnings, result: error };else throw error;
		}
	}
});
//# sourceMappingURL=../../meta/compile/compile.js.map