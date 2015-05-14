if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../CompileError', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/Opts', './formatCompileErrorForConsole'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _CompileError, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateOpts, _formatCompileErrorForConsole) {
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

	var _lex = _interopRequire(_privateLexLex);

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
			includeModuleDisplayName: false,
			forceNonLazyModule: true,
			useStrict: false
		});
		const cx = new _Cx(opts);

		try {
			const t = (0, _lex)(cx, source);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLE1BQU0sR0FBRyxLQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsUUFBTSxJQUFJLEdBQUcsaUJBVEwsY0FBYyxFQVNNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxRQUFPLElBQUksQ0FBQyxDQUFBOztBQUV2QixNQUFJO0FBQ0gsU0FBTSxDQUFDLEdBQUcsVUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRXpCLFNBQU0sQ0FBQyxHQUFHLFlBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV0QixTQUFNLEVBQUUsR0FBRyxhQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFeEIsU0FBTSxHQUFHLEdBQUcsZ0JBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2lCQUVmLGNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7U0FBeEIsSUFBSSxXQUFKLElBQUk7O0FBRVosS0FBRSxDQUFDLFFBQVEsQ0FB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LE9BQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUNYO09BRUQsUUFBUSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUMxQixRQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNmLFFBQU0sS0FBSyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLE9BQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDeCBmcm9tICcuLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleCBmcm9tICcuLi9wcml2YXRlL2xleC9sZXgnXG5pbXBvcnQgbGV4VW5ncm91cGVkIGZyb20gJy4uL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuLi9wcml2YXRlL2xleC9ncm91cCdcbmltcG9ydCBwYXJzZSBmcm9tICcuLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuLi9wcml2YXRlL3ZlcmlmeSdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuaW1wb3J0IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUgZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGluY2x1ZGVQZXJmVGVzdCA9PiB7XG5cdGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYygnLi9tcy10ZXN0Lm1zJywgJ3V0Zi04Jylcblx0Y29uc3Qgb3B0cyA9IE9wdHNGcm9tT2JqZWN0KHtcblx0XHRpbkZpbGU6ICcuL21zLXRlc3QubXMnLFxuXHRcdGluY2x1ZGVBbWRlZmluZTogZmFsc2UsXG5cdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IGZhbHNlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogdHJ1ZSxcblx0XHR1c2VTdHJpY3Q6IGZhbHNlXG5cdH0pXG5cdGNvbnN0IGN4ID0gbmV3IEN4KG9wdHMpXG5cblx0dHJ5IHtcblx0XHRjb25zdCB0ID0gbGV4KGN4LCBzb3VyY2UpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7dH1gKVxuXHRcdGNvbnN0IGUgPSBwYXJzZShjeCwgdClcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHtlfWApXG5cdFx0Y29uc3QgdnIgPSB2ZXJpZnkoY3gsIGUpXG5cdFx0Ly8gY29uc29sZS5sb2coYCsrK1xcbiR7dnJ9YClcblx0XHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2FzdH1gKVxuXHRcdGNvbnN0IHsgY29kZSB9ID0gcmVuZGVyKGN4LCBhc3QpXG5cblx0XHRjeC53YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2codykpXG5cblx0XHRpZiAoaW5jbHVkZVBlcmZUZXN0KSB7XG5cdFx0XHQvLyBCZW5jaG1hcmsgaGFzIHByb2JsZW1zIGlmIEkgZG9uJ3QgcHV0IHRoZXNlIGluIGdsb2JhbCB2YXJpYWJsZXMuLi5cblx0XHRcdGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0ID0gKCkgPT5cblx0XHRcdFx0bGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpXG5cdFx0XHRjb25zdCB0VW5ncm91cGVkID0gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKVxuXHRcdFx0Z2xvYmFsLmxleEdyb3VwVGVzdCA9ICgpID0+XG5cdFx0XHRcdGxleEdyb3VwKGN4LCB0VW5ncm91cGVkKVxuXG5cdFx0XHRnbG9iYWwuY21wID0gKCkgPT5cblx0XHRcdFx0Y29tcGlsZShzb3VyY2UsIG9wdHMpXG5cdFx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0XHRsZXhVbmdyb3VwZWQ6ICgpID0+IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KCksXG5cdFx0XHRcdGxleEdyb3VwOiAoKSA9PiBnbG9iYWwubGV4R3JvdXBUZXN0KCksXG5cdFx0XHRcdHBhcnNlOiAoKSA9PiBwYXJzZShjeCwgdCksXG5cdFx0XHRcdHZlcmlmeTogKCkgPT4gdmVyaWZ5KGN4LCBlKSxcblx0XHRcdFx0dHJhbnNwaWxlOiAoKSA9PiB0cmFuc3BpbGUoY3gsIGUsIHZyKSxcblx0XHRcdFx0cmVuZGVyOiAoKSA9PiByZW5kZXIoY3gsIGFzdCksXG5cdFx0XHRcdGFsbDogKCkgPT4gZ2xvYmFsLmNtcCgpXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUoZSwgXyA9PiBfIGluc3RhbmNlb2YgRXhwcmVzc2lvbikuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBFUyBBU1Qgc2l6ZTogJHt0cmVlU2l6ZShhc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE5vZGUpLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgT3V0cHV0IHNpemU6ICR7Y29kZS5sZW5ndGh9IGNoYXJhY3RlcnMuYClcblx0XHRcdGNvbnNvbGUubG9nKGA9PT5cXG4ke2NvZGV9YClcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0Y29uc29sZS5sb2coZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZShlcnJvcikpXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==