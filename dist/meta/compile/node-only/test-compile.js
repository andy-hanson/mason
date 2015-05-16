if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../CompileError', '../Expression', '../private/Cx', '../private/lex/ungrouped', '../private/lex/group', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/Opts', './formatCompileErrorForConsole'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _CompileError, _Expression, _privateCx, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateOpts, _formatCompileErrorForConsole) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs2 = _interopRequire(_fs);

	var _numeral2 = _interopRequire(_numeral);

	var _compile2 = _interopRequire(_compile);

	var _CompileError2 = _interopRequire(_CompileError);

	var _Expression2 = _interopRequire(_Expression);

	var _Cx = _interopRequire(_privateCx);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	var _formatCompileErrorForConsole2 = _interopRequire(_formatCompileErrorForConsole);

	const test = function () {
		return doTest(false);
	},
	      perfTest = function () {
		return doTest(true);
	};

	exports.test = test;
	exports.perfTest = perfTest;
	const doTest = function (includePerfTest) {
		const source = _fs2.readFileSync('./ms-test.ms', 'utf-8');
		const opts = (0, _privateOpts.OptsFromObject)({
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleName: false,
			forceNonLazyModule: true,
			useStrict: false
		});
		const cx = new _Cx(opts);

		try {
			const ug = (0, _lexUngrouped)(cx, source);
			// console.log(ug)
			const t = (0, _lexGroup)(cx, ug);
			// console.log(`==>\n${t}`)
			const e = (0, _parse)(cx, t);
			// console.log(`==>\n${e}`)
			const vr = (0, _verify)(cx, e);
			// console.log(`+++\n${vr}`)
			const ast = (0, _transpile)(cx, e, vr);
			// console.log(`==>\n${ast}`)

			var _render = (0, _render2)(cx, ast);

			const code = _render.code;

			cx.warnings.forEach(function (w) {
				return console.log(w);
			});

			if (includePerfTest) {
				// Benchmark has problems if I don't put these in global variables...
				global.lexUngroupedTest = function () {
					return (0, _lexUngrouped)(cx, source);
				};
				const tUngrouped = global.lexUngroupedTest();
				global.lexGroupTest = function () {
					return (0, _lexGroup)(cx, tUngrouped);
				};

				global.cmp = function () {
					return (0, _compile2)(source, opts);
				};
				benchmark({
					lexUngrouped: function () {
						return global.lexUngroupedTest();
					},
					lexGroup: function () {
						return global.lexGroupTest();
					},
					parse: function () {
						return (0, _parse)(cx, t);
					},
					verify: function () {
						return (0, _verify)(cx, e);
					},
					transpile: function () {
						return (0, _transpile)(cx, e, vr);
					},
					render: function () {
						return (0, _render2)(cx, ast);
					},
					all: function () {
						return global.cmp();
					}
				});
			} else {
				console.log('Expression tree size: ' + treeSize(e, function (_) {
					return _ instanceof _Expression2;
				}).size + '.');
				console.log('ES AST size: ' + treeSize(ast, function (_) {
					return _ instanceof _esastDistAst.Node;
				}).size + '.');
				console.log('Output size: ' + code.length + ' characters.');
				console.log('==>\n' + code);
			}
		} catch (error) {
			if (error instanceof _CompileError2) console.log((0, _formatCompileErrorForConsole2)(error));else throw error;
		}
	};

	const benchmark = function (tests) {
		const suite = new _benchmark.Suite();
		Object.keys(tests).forEach(function (name) {
			return suite.add(name, tests[name]);
		});
		suite.on('complete', function () {
			this.forEach(function (_) {
				const ms = (0, _numeral2)(_.stats.mean * 1000).format('0.00');
				console.log('' + _.name + ': ' + ms + 'ms');
			});
		});
		suite.on('error', function (err) {
			throw err.target.error;
		});
		suite.run();
	},
	      treeSize = function (tree, cond) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJPLE9BQ04sSUFBSSxHQUFHO1NBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztFQUFBO09BQzFCLFFBQVEsR0FBRztTQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUQ3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO0FBRVQsT0FBTSxNQUFNLEdBQUcsVUFBQSxlQUFlLEVBQUk7QUFDakMsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGlCQVRMLGNBQWMsRUFTTTtBQUMzQixTQUFNLEVBQUUsY0FBYztBQUN0QixrQkFBZSxFQUFFLEtBQUs7QUFDdEIsbUJBQWdCLEVBQUUsSUFBSTtBQUN0QixvQkFBaUIsRUFBRSxLQUFLO0FBQ3hCLHFCQUFrQixFQUFFLElBQUk7QUFDeEIsWUFBUyxFQUFFLEtBQUs7R0FDaEIsQ0FBQyxDQUFBO0FBQ0YsUUFBTSxFQUFFLEdBQUcsUUFBTyxJQUFJLENBQUMsQ0FBQTs7QUFFdkIsTUFBSTtBQUNILFNBQU0sRUFBRSxHQUFHLG1CQUFhLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFbkMsU0FBTSxDQUFDLEdBQUcsZUFBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRTFCLFNBQU0sQ0FBQyxHQUFHLFlBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV0QixTQUFNLEVBQUUsR0FBRyxhQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFeEIsU0FBTSxHQUFHLEdBQUcsZ0JBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2lCQUVmLGNBQU8sRUFBRSxFQUFFLEdBQUcs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LEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO0dBQ3RCLENBQUMsQ0FBQTtBQUNGLE9BQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUNYO09BRUQsUUFBUSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUMxQixRQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNmLFFBQU0sS0FBSyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLE9BQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDeCBmcm9tICcuLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcbmltcG9ydCBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlIGZyb20gJy4vZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSdcblxuZXhwb3J0IGNvbnN0XG5cdHRlc3QgPSAoKSA9PiBkb1Rlc3QoZmFsc2UpLFxuXHRwZXJmVGVzdCA9ICgpID0+IGRvVGVzdCh0cnVlKVxuXG5jb25zdCBkb1Rlc3QgPSBpbmNsdWRlUGVyZlRlc3QgPT4ge1xuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSBPcHRzRnJvbU9iamVjdCh7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogdHJ1ZSxcblx0XHR1c2VTdHJpY3Q6IGZhbHNlXG5cdH0pXG5cdGNvbnN0IGN4ID0gbmV3IEN4KG9wdHMpXG5cblx0dHJ5IHtcblx0XHRjb25zdCB1ZyA9IGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdC8vIGNvbnNvbGUubG9nKHVnKVxuXHRcdGNvbnN0IHQgPSBsZXhHcm91cChjeCwgdWcpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7dH1gKVxuXHRcdGNvbnN0IGUgPSBwYXJzZShjeCwgdClcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHtlfWApXG5cdFx0Y29uc3QgdnIgPSB2ZXJpZnkoY3gsIGUpXG5cdFx0Ly8gY29uc29sZS5sb2coYCsrK1xcbiR7dnJ9YClcblx0XHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2FzdH1gKVxuXHRcdGNvbnN0IHsgY29kZSB9ID0gcmVuZGVyKGN4LCBhc3QpXG5cblx0XHRjeC53YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2codykpXG5cblx0XHRpZiAoaW5jbHVkZVBlcmZUZXN0KSB7XG5cdFx0XHQvLyBCZW5jaG1hcmsgaGFzIHByb2JsZW1zIGlmIEkgZG9uJ3QgcHV0IHRoZXNlIGluIGdsb2JhbCB2YXJpYWJsZXMuLi5cblx0XHRcdGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0ID0gKCkgPT5cblx0XHRcdFx0bGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpXG5cdFx0XHRjb25zdCB0VW5ncm91cGVkID0gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKVxuXHRcdFx0Z2xvYmFsLmxleEdyb3VwVGVzdCA9ICgpID0+XG5cdFx0XHRcdGxleEdyb3VwKGN4LCB0VW5ncm91cGVkKVxuXG5cdFx0XHRnbG9iYWwuY21wID0gKCkgPT5cblx0XHRcdFx0Y29tcGlsZShzb3VyY2UsIG9wdHMpXG5cdFx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0XHRsZXhVbmdyb3VwZWQ6ICgpID0+IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KCksXG5cdFx0XHRcdGxleEdyb3VwOiAoKSA9PiBnbG9iYWwubGV4R3JvdXBUZXN0KCksXG5cdFx0XHRcdHBhcnNlOiAoKSA9PiBwYXJzZShjeCwgdCksXG5cdFx0XHRcdHZlcmlmeTogKCkgPT4gdmVyaWZ5KGN4LCBlKSxcblx0XHRcdFx0dHJhbnNwaWxlOiAoKSA9PiB0cmFuc3BpbGUoY3gsIGUsIHZyKSxcblx0XHRcdFx0cmVuZGVyOiAoKSA9PiByZW5kZXIoY3gsIGFzdCksXG5cdFx0XHRcdGFsbDogKCkgPT4gZ2xvYmFsLmNtcCgpXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUoZSwgXyA9PiBfIGluc3RhbmNlb2YgRXhwcmVzc2lvbikuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBFUyBBU1Qgc2l6ZTogJHt0cmVlU2l6ZShhc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE5vZGUpLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgT3V0cHV0IHNpemU6ICR7Y29kZS5sZW5ndGh9IGNoYXJhY3RlcnMuYClcblx0XHRcdGNvbnNvbGUubG9nKGA9PT5cXG4ke2NvZGV9YClcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0Y29uc29sZS5sb2coZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZShlcnJvcikpXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==