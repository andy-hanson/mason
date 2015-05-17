if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../CompileError', '../Expression', '../private/CompileContext', '../private/CompileOptions', '../private/lex/ungrouped', '../private/lex/group', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', './formatCompileErrorForConsole'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _CompileError, _Expression, _privateCompileContext, _privateCompileOptions, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _formatCompileErrorForConsole) {
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

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

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
		const opts = new _CompileOptions({
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleName: false,
			forceNonLazyModule: true,
			useStrict: false
		});
		const cx = new _CompileContext(opts);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLE1BQU0sR0FBRyxLQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsUUFBTSxJQUFJLEdBQUcsb0JBQW1CO0FBQy9CLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLG9CQUFpQixFQUFFLEtBQUs7QUFDeEIscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxvQkFBbUIsSUFBSSxDQUFDLENBQUE7O0FBRW5DLE1BQUk7QUFDSCxTQUFNLEVBQUUsR0FBRyxtQkFBYSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRW5DLFNBQU0sQ0FBQyxHQUFHLGVBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBOztBQUUxQixTQUFNLENBQUMsR0FBRyxZQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdEIsU0FBTSxFQUFFLEdBQUcsYUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXhCLFNBQU0sR0FBRyxHQUFHLGdCQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7OztpQkFFZixjQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7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LENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtHQUN0QixDQUFDLENBQUE7QUFDRixPQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7RUFDWDtPQUVELFFBQVEsR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDMUIsUUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUN6QixNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUE7QUFDZixRQUFNLEtBQUssR0FBRyxVQUFBLElBQUksRUFBSTtBQUNyQixPQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNmLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakIsVUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNoRCxXQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEIsU0FBSSxLQUFLLFlBQVksS0FBSyxFQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLEtBRXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNiLENBQUMsQ0FBQTtJQUNGLE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGUnXG5pbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ29tcGlsZUNvbnRleHQgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlQ29udGV4dCdcbmltcG9ydCBDb21waWxlT3B0aW9ucyBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVPcHRpb25zJ1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSBmcm9tICcuL2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUnXG5cbmV4cG9ydCBjb25zdFxuXHR0ZXN0ID0gKCkgPT4gZG9UZXN0KGZhbHNlKSxcblx0cGVyZlRlc3QgPSAoKSA9PiBkb1Rlc3QodHJ1ZSlcblxuY29uc3QgZG9UZXN0ID0gaW5jbHVkZVBlcmZUZXN0ID0+IHtcblx0Y29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKCcuL21zLXRlc3QubXMnLCAndXRmLTgnKVxuXHRjb25zdCBvcHRzID0gbmV3IENvbXBpbGVPcHRpb25zKHtcblx0XHRpbkZpbGU6ICcuL21zLXRlc3QubXMnLFxuXHRcdGluY2x1ZGVBbWRlZmluZTogZmFsc2UsXG5cdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fSlcblx0Y29uc3QgY3ggPSBuZXcgQ29tcGlsZUNvbnRleHQob3B0cylcblxuXHR0cnkge1xuXHRcdGNvbnN0IHVnID0gbGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpXG5cdFx0Ly8gY29uc29sZS5sb2codWcpXG5cdFx0Y29uc3QgdCA9IGxleEdyb3VwKGN4LCB1Zylcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHt0fWApXG5cdFx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2V9YClcblx0XHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0XHQvLyBjb25zb2xlLmxvZyhgKysrXFxuJHt2cn1gKVxuXHRcdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7YXN0fWApXG5cdFx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY3gsIGFzdClcblxuXHRcdGN4Lndhcm5pbmdzLmZvckVhY2godyA9PiBjb25zb2xlLmxvZyh3KSlcblxuXHRcdGlmIChpbmNsdWRlUGVyZlRlc3QpIHtcblx0XHRcdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRcdFx0Z2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QgPSAoKSA9PlxuXHRcdFx0XHRsZXhVbmdyb3VwZWQoY3gsIHNvdXJjZSlcblx0XHRcdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdFx0XHRnbG9iYWwubGV4R3JvdXBUZXN0ID0gKCkgPT5cblx0XHRcdFx0bGV4R3JvdXAoY3gsIHRVbmdyb3VwZWQpXG5cblx0XHRcdGdsb2JhbC5jbXAgPSAoKSA9PlxuXHRcdFx0XHRjb21waWxlKHNvdXJjZSwgb3B0cylcblx0XHRcdGJlbmNobWFyayh7XG5cdFx0XHRcdGxleFVuZ3JvdXBlZDogKCkgPT4gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKSxcblx0XHRcdFx0bGV4R3JvdXA6ICgpID0+IGdsb2JhbC5sZXhHcm91cFRlc3QoKSxcblx0XHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY3gsIGUpLFxuXHRcdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjeCwgZSwgdnIpLFxuXHRcdFx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KSxcblx0XHRcdFx0YWxsOiAoKSA9PiBnbG9iYWwuY21wKClcblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGFzdCwgXyA9PiBfIGluc3RhbmNlb2YgTm9kZSkuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRcdFx0Y29uc29sZS5sb2coYD09PlxcbiR7Y29kZX1gKVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpXG5cdFx0XHRjb25zb2xlLmxvZyhmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKGVycm9yKSlcblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG5cbmNvbnN0XG5cdGJlbmNobWFyayA9IHRlc3RzID0+IHtcblx0XHRjb25zdCBzdWl0ZSA9IG5ldyBTdWl0ZSgpXG5cdFx0T2JqZWN0LmtleXModGVzdHMpLmZvckVhY2gobmFtZSA9PlxuXHRcdFx0c3VpdGUuYWRkKG5hbWUsIHRlc3RzW25hbWVdKSlcblx0XHRzdWl0ZS5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuZm9yRWFjaChfID0+IHtcblx0XHRcdFx0Y29uc3QgbXMgPSBudW1lcmFsKF8uc3RhdHMubWVhbiAqIDEwMDApLmZvcm1hdCgnMC4wMCcpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGAke18ubmFtZX06ICR7bXN9bXNgKVxuXHRcdFx0fSlcblx0XHR9KVxuXHRcdHN1aXRlLm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHR0aHJvdyBlcnIudGFyZ2V0LmVycm9yXG5cdFx0fSlcblx0XHRzdWl0ZS5ydW4oKVxuXHR9LFxuXG5cdHRyZWVTaXplID0gKHRyZWUsIGNvbmQpID0+IHtcblx0XHRjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpXG5cdFx0bGV0IG5MZWF2ZXMgPSAwXG5cdFx0Y29uc3QgdmlzaXQgPSBub2RlID0+IHtcblx0XHRcdGlmIChub2RlICE9IG51bGwgJiYgIXZpc2l0ZWQuaGFzKG5vZGUpKVxuXHRcdFx0XHRpZiAoY29uZChub2RlKSkge1xuXHRcdFx0XHRcdHZpc2l0ZWQuYWRkKG5vZGUpXG5cdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobm9kZSkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNoaWxkID0gbm9kZVtuYW1lXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLmZvckVhY2godmlzaXQpXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHZpc2l0KGNoaWxkKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5MZWF2ZXMgPSBuTGVhdmVzICsgMVxuXHRcdH1cblx0XHR2aXNpdCh0cmVlKVxuXHRcdHJldHVybiB7IHNpemU6IHZpc2l0ZWQuc2l6ZSwgbkxlYXZlcyB9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9