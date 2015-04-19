if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/lex/Stream', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/U/util', '../private/Opts'], function (exports, module, _benchmark, _esastDistAst, _fs, _numeral, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateLexStream, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateUUtil, _privateOpts) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _fs2 = _interopRequire(_fs);

	var _numeral2 = _interopRequire(_numeral);

	var _Expression2 = _interopRequire(_Expression);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

	var _Stream = _interopRequire(_privateLexStream);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	const eager = function (gen) {
		const arr = [];
		for (let em of gen) arr.push(em);
		return arr;
	};

	const test = function (tests) {
		const suite = new _benchmark.Suite();
		Object.keys(tests).forEach(function (name) {
			return suite.add(name, tests[name]);
		});
		suite.on('complete', function () {
			this.forEach(function (_) {
				const ms = _numeral2(_.stats.mean * 1000).format('0.00');
				console.log('' + _.name + ': ' + ms + 'ms mean, ' + _.hz + 'Hz');
			});
		});
		suite.on('error', function (err) {
			throw err.target.error;
		});
		suite.run();
	};

	module.exports = function () {
		global.DEBUG = true;

		const source = _fs2.readFileSync('./ms-test.ms', 'utf-8');
		const opts = _privateOpts.OptsFromObject({
			inFile: './ms-test.ms'
		});
		const cx = new _Cx(opts);

		const t = _lex(cx, source);
		// log(`==>\n${t}`)
		const e = _parse(cx, t);
		// log(`==>\n${e}`)
		const vr = _verify(cx, e);
		// log(`+++\n${vr})
		const ast = _transpile(cx, e, vr);
		// log(`==>\n${ast}`)

		var _render = _render2(cx, ast);

		const code = _render.code;

		const tUngroupedEager = eager(_lexUngrouped(new _privateCx.SubContext(cx), new _Stream(source), false));

		// Benchmark has problems if I don't put these in global variables...
		global.lexUngroupedTest = function () {
			return eager(_lexUngrouped(new _privateCx.SubContext(cx), new _Stream(source), false));
		};
		global.lexGroupTest = function () {
			return _lexGroup(new _privateCx.SubContext(cx), tUngroupedEager[Symbol.iterator]());
		};

		test({
			lexUngrouped: function () {
				return global.lexUngroupedTest();
			},
			lexGroup: function () {
				return global.lexGroupTest();
			},
			'lex (all)': function () {
				return _lex(cx, source);
			},
			parse: function () {
				return _parse(cx, t);
			},
			verify: function () {
				return _verify(cx, e);
			},
			transpile: function () {
				return _transpile(cx, e, vr);
			},
			render: function () {
				return _render2(cx, ast);
			}
		});

		const eSize = treeSize(e, function (_) {
			return _ instanceof _Expression2;
		}),
		      astSize = treeSize(ast, function (_) {
			return _ instanceof _esastDistAst.Node;
		});
		_privateUUtil.log('Expression tree size: ' + eSize.size + '.');
		_privateUUtil.log('ES AST size: ' + astSize.size + ', nLeaves: ' + astSize.nLeaves + '.');
		_privateUUtil.log('Output size: ' + code.length + ' characters.');
		_privateUUtil.log('==>\n' + code);
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