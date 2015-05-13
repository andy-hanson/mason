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
		const opts = _privateOpts.OptsFromObject({
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleDisplayName: false,
			forceNonLazyModule: true,
			useStrict: false
		});
		const cx = new _Cx(opts);

		try {
			const t = _lex(cx, source);
			// console.log(`==>\n${t}`)
			const e = _parse(cx, t);
			// console.log(`==>\n${e}`)
			const vr = _verify(cx, e);
			// console.log(`+++\n${vr}`)
			const ast = _transpile(cx, e, vr);
			// console.log(`==>\n${ast}`)

			var _render = _render2(cx, ast);

			const code = _render.code;

			cx.warnings.forEach(function (w) {
				return console.log(w);
			});

			if (includePerfTest) {
				// Benchmark has problems if I don't put these in global variables...
				global.lexUngroupedTest = function () {
					return _lexUngrouped(cx, source);
				};
				const tUngrouped = global.lexUngroupedTest();
				global.lexGroupTest = function () {
					return _lexGroup(cx, tUngrouped);
				};

				global.cmp = function () {
					return _compile2(source, opts);
				};
				benchmark({
					lexUngrouped: function () {
						return global.lexUngroupedTest();
					},
					lexGroup: function () {
						return global.lexGroupTest();
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
			if (error instanceof _CompileError2) console.log(_formatCompileErrorForConsole2(error));else throw error;
		}
	};

	const benchmark = function (tests) {
		const suite = new _benchmark.Suite();
		Object.keys(tests).forEach(function (name) {
			return suite.add(name, tests[name]);
		});
		suite.on('complete', function () {
			this.forEach(function (_) {
				const ms = _numeral2(_.stats.mean * 1000).format('0.00');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLE1BQU0sR0FBRyxLQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsUUFBTSxJQUFJLEdBQUcsYUFUTCxjQUFjLENBU007QUFDM0IsU0FBTSxFQUFFLGNBQWM7QUFDdEIsa0JBQWUsRUFBRSxLQUFLO0FBQ3RCLG1CQUFnQixFQUFFLElBQUk7QUFDdEIsMkJBQXdCLEVBQUUsS0FBSztBQUMvQixxQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLFlBQVMsRUFBRSxLQUFLO0dBQ2hCLENBQUMsQ0FBQTtBQUNGLFFBQU0sRUFBRSxHQUFHLFFBQU8sSUFBSSxDQUFDLENBQUE7O0FBRXZCLE1BQUk7QUFDSCxTQUFNLENBQUMsR0FBRyxLQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFekIsU0FBTSxDQUFDLEdBQUcsT0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXRCLFNBQU0sRUFBRSxHQUFHLFFBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV4QixTQUFNLEdBQUcsR0FBRyxXQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7OztpQkFFZixTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1NBQXhCLElBQUksV0FBSixJQUFJOztBQUVaLEtBQUUsQ0FBQyxRQUFRLENBQUMs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SyxDQUFDLEdBQUcsRUFBRSxDQUFBO0VBQ1g7T0FFRCxRQUFRLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFLO0FBQzFCLFFBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDekIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsUUFBTSxLQUFLLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDckIsT0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDaEQsV0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQUksS0FBSyxZQUFZLEtBQUssRUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUVwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDYixDQUFDLENBQUE7SUFDRixNQUNBLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFBO0dBQ3ZCLENBQUE7QUFDRCxPQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDWCxTQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFBO0VBQ3RDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS90ZXN0LWNvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWl0ZSB9IGZyb20gJ2JlbmNobWFyaydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnXG5pbXBvcnQgY29tcGlsZSBmcm9tICcuLi9jb21waWxlJ1xuaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IEN4IGZyb20gJy4uL3ByaXZhdGUvQ3gnXG5pbXBvcnQgbGV4IGZyb20gJy4uL3ByaXZhdGUvbGV4L2xleCdcbmltcG9ydCBsZXhVbmdyb3VwZWQgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvdW5ncm91cGVkJ1xuaW1wb3J0IGxleEdyb3VwIGZyb20gJy4uL3ByaXZhdGUvbGV4L2dyb3VwJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4uL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4uL3ByaXZhdGUvdmVyaWZ5J1xuaW1wb3J0IHsgT3B0c0Zyb21PYmplY3QgfSBmcm9tICcuLi9wcml2YXRlL09wdHMnXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSBmcm9tICcuL2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUnXG5cbmV4cG9ydCBjb25zdFxuXHR0ZXN0ID0gKCkgPT4gZG9UZXN0KGZhbHNlKSxcblx0cGVyZlRlc3QgPSAoKSA9PiBkb1Rlc3QodHJ1ZSlcblxuY29uc3QgZG9UZXN0ID0gaW5jbHVkZVBlcmZUZXN0ID0+IHtcblx0Y29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKCcuL21zLXRlc3QubXMnLCAndXRmLTgnKVxuXHRjb25zdCBvcHRzID0gT3B0c0Zyb21PYmplY3Qoe1xuXHRcdGluRmlsZTogJy4vbXMtdGVzdC5tcycsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiBmYWxzZSxcblx0XHRpbmNsdWRlU291cmNlTWFwOiB0cnVlLFxuXHRcdGluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fSlcblx0Y29uc3QgY3ggPSBuZXcgQ3gob3B0cylcblxuXHR0cnkge1xuXHRcdGNvbnN0IHQgPSBsZXgoY3gsIHNvdXJjZSlcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHt0fWApXG5cdFx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2V9YClcblx0XHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0XHQvLyBjb25zb2xlLmxvZyhgKysrXFxuJHt2cn1gKVxuXHRcdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7YXN0fWApXG5cdFx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY3gsIGFzdClcblxuXHRcdGN4Lndhcm5pbmdzLmZvckVhY2godyA9PiBjb25zb2xlLmxvZyh3KSlcblxuXHRcdGlmIChpbmNsdWRlUGVyZlRlc3QpIHtcblx0XHRcdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRcdFx0Z2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QgPSAoKSA9PlxuXHRcdFx0XHRsZXhVbmdyb3VwZWQoY3gsIHNvdXJjZSlcblx0XHRcdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdFx0XHRnbG9iYWwubGV4R3JvdXBUZXN0ID0gKCkgPT5cblx0XHRcdFx0bGV4R3JvdXAoY3gsIHRVbmdyb3VwZWQpXG5cblx0XHRcdGdsb2JhbC5jbXAgPSAoKSA9PlxuXHRcdFx0XHRjb21waWxlKHNvdXJjZSwgb3B0cylcblx0XHRcdGJlbmNobWFyayh7XG5cdFx0XHRcdGxleFVuZ3JvdXBlZDogKCkgPT4gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKSxcblx0XHRcdFx0bGV4R3JvdXA6ICgpID0+IGdsb2JhbC5sZXhHcm91cFRlc3QoKSxcblx0XHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY3gsIGUpLFxuXHRcdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjeCwgZSwgdnIpLFxuXHRcdFx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KSxcblx0XHRcdFx0YWxsOiAoKSA9PiBnbG9iYWwuY21wKClcblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGFzdCwgXyA9PiBfIGluc3RhbmNlb2YgTm9kZSkuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRcdFx0Y29uc29sZS5sb2coYD09PlxcbiR7Y29kZX1gKVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpXG5cdFx0XHRjb25zb2xlLmxvZyhmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKGVycm9yKSlcblx0XHRlbHNlXG5cdFx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG5cbmNvbnN0XG5cdGJlbmNobWFyayA9IHRlc3RzID0+IHtcblx0XHRjb25zdCBzdWl0ZSA9IG5ldyBTdWl0ZSgpXG5cdFx0T2JqZWN0LmtleXModGVzdHMpLmZvckVhY2gobmFtZSA9PlxuXHRcdFx0c3VpdGUuYWRkKG5hbWUsIHRlc3RzW25hbWVdKSlcblx0XHRzdWl0ZS5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuZm9yRWFjaChfID0+IHtcblx0XHRcdFx0Y29uc3QgbXMgPSBudW1lcmFsKF8uc3RhdHMubWVhbiAqIDEwMDApLmZvcm1hdCgnMC4wMCcpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGAke18ubmFtZX06ICR7bXN9bXNgKVxuXHRcdFx0fSlcblx0XHR9KVxuXHRcdHN1aXRlLm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHR0aHJvdyBlcnIudGFyZ2V0LmVycm9yXG5cdFx0fSlcblx0XHRzdWl0ZS5ydW4oKVxuXHR9LFxuXG5cdHRyZWVTaXplID0gKHRyZWUsIGNvbmQpID0+IHtcblx0XHRjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpXG5cdFx0bGV0IG5MZWF2ZXMgPSAwXG5cdFx0Y29uc3QgdmlzaXQgPSBub2RlID0+IHtcblx0XHRcdGlmIChub2RlICE9IG51bGwgJiYgIXZpc2l0ZWQuaGFzKG5vZGUpKVxuXHRcdFx0XHRpZiAoY29uZChub2RlKSkge1xuXHRcdFx0XHRcdHZpc2l0ZWQuYWRkKG5vZGUpXG5cdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobm9kZSkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNoaWxkID0gbm9kZVtuYW1lXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLmZvckVhY2godmlzaXQpXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHZpc2l0KGNoaWxkKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5MZWF2ZXMgPSBuTGVhdmVzICsgMVxuXHRcdH1cblx0XHR2aXNpdCh0cmVlKVxuXHRcdHJldHVybiB7IHNpemU6IHZpc2l0ZWQuc2l6ZSwgbkxlYXZlcyB9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9