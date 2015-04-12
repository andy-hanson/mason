if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/ast", "fs", "../Expression", "../private/Cx", "../private/lex/lex", "../private/parse/parse", "../private/render", "../private/transpile/transpile", "../private/verify/verify", "../private/U/util", "../private/Opts"], function (exports, module, _esastDistAst, _fs, _Expression, _privateCx, _privateLexLex, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerifyVerify, _privateUUtil, _privateOpts) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var ESNode = _esastDistAst.ESNode;

	var fs = _interopRequire(_fs);

	var Expression = _interopRequire(_Expression);

	var Cx = _interopRequire(_privateCx);

	var lex = _interopRequire(_privateLexLex);

	var parse = _interopRequire(_privateParseParse);

	var render = _interopRequire(_privateRender);

	var transpile = _interopRequire(_privateTranspileTranspile);

	var verify = _interopRequire(_privateVerifyVerify);

	var log = _privateUUtil.log;
	var OptsFromObject = _privateOpts.OptsFromObject;

	module.exports = function () {
		global.DEBUG = true;
		global.LOG_TIME = true;

		function time(fun) {
			if (global.LOG_TIME) console.time(fun.name);
			const res = fun.apply(null, Array.prototype.slice.call(arguments, 1));
			if (global.LOG_TIME) console.timeEnd(fun.name);
			return res;
		}

		const source = fs.readFileSync("./ms-test.ms", "utf-8");
		const opts = OptsFromObject({
			inFile: "./ms-test.ms"
		});
		const cx = new Cx(opts);

		console.time("all");
		const t = time(lex, cx, source);
		// log(`==>\n${t}`)
		const e = time(parse, cx, t);
		// log(`==>\n${e}`)
		const vr = time(verify, cx, e);
		// log(`+++\n${vr})
		const ast = time(transpile, cx, e, vr);
		// log(`==>\n${ast}`)

		var _time = time(render, cx, ast);

		const code = _time.code;
		const map = _time.map;

		time(function renderSourceMap(_) {
			return _.toString();
		}, map);
		console.timeEnd("all");
		const eSize = treeSize(e, function (_) {
			return _ instanceof Expression;
		}),
		      astSize = treeSize(ast, function (_) {
			return _ instanceof ESNode;
		});
		log("Expression tree size: " + eSize.size + ".");
		log("ES AST size: " + astSize.size + ", nLeaves: " + astSize.nLeaves + ".");
		log("Output size: " + code.length + " characters.");
		log("==>\n" + code);
	};

	const treeSize = function (tree, cond) {
		const visited = new Set();
		let nLeaves = 0;
		const visit = function (node) {
			if (node != null && !visited.has(node)) if (cond(node)) {
				visited.add(node);
				Object.getOwnPropertyNames(node).forEach(function (name) {
					const child = node[name];
					if (child instanceof Array) child.forEach(visit);else visit(child);
				});
			} else nLeaves = nLeaves + 1;
		};
		visit(tree);
		return { size: visited.size, nLeaves: nLeaves };
	};
});
//# sourceMappingURL=../../../meta/compile/node-only/test-compile.js.map