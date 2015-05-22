if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../CompileError', '../MsAst', '../private/CompileContext', '../private/CompileOptions', '../private/lex', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', './formatCompileErrorForConsole'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _CompileError, _MsAst, _privateCompileContext, _privateCompileOptions, _privateLex, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _formatCompileErrorForConsole) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fs2 = _interopRequireDefault(_fs);

	var _numeral2 = _interopRequireDefault(_numeral);

	var _compile2 = _interopRequireDefault(_compile);

	var _CompileError2 = _interopRequireDefault(_CompileError);

	var _MsAst2 = _interopRequireDefault(_MsAst);

	var _CompileContext = _interopRequireDefault(_privateCompileContext);

	var _CompileOptions = _interopRequireDefault(_privateCompileOptions);

	var _lex = _interopRequireDefault(_privateLex);

	var _parse = _interopRequireDefault(_privateParseParse);

	var _render2 = _interopRequireDefault(_privateRender);

	var _transpile = _interopRequireDefault(_privateTranspileTranspile);

	var _verify = _interopRequireDefault(_privateVerify);

	var _formatCompileErrorForConsole2 = _interopRequireDefault(_formatCompileErrorForConsole);

	const test = function () {
		return doTest(false);
	},
	      perfTest = function () {
		return doTest(true);
	};

	exports.test = test;
	exports.perfTest = perfTest;
	const doTest = function (isPerfTest) {
		const source = _fs2.default.readFileSync('./ms-test.ms', 'utf-8');
		const opts = {
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleName: false,
			forceNonLazyModule: true,
			useStrict: false
		};
		const context = new _CompileContext.default(new _CompileOptions.default(opts));

		try {
			const rootToken = (0, _lex.default)(context, source);
			// console.log(`==>\n${rootToken}`)
			const msAst = (0, _parse.default)(context, rootToken);
			// console.log(`==>\n${msAst}`)
			const verifyResults = (0, _verify.default)(context, msAst);
			// console.log(`+++\n${verifyResults.___}`)
			const esAst = (0, _transpile.default)(context, msAst, verifyResults);
			// console.log(`==>\n${esAst}`)

			var _render = (0, _render2.default)(context, esAst);

			const code = _render.code;

			context.warnings.forEach(function (w) {
				return console.log(w);
			});

			if (isPerfTest) benchmark({
				lex: function () {
					return (0, _lex.default)(context, source);
				},
				parse: function () {
					return (0, _parse.default)(context, rootToken);
				},
				verify: function () {
					return (0, _verify.default)(context, msAst);
				},
				transpile: function () {
					return (0, _transpile.default)(context, msAst, verifyResults);
				},
				render: function () {
					return (0, _render2.default)(context, esAst);
				},
				all: function () {
					return (0, _compile2.default)(source, opts);
				}
			});else {
				console.log('Expression tree size: ' + treeSize(msAst, function (_) {
					return _ instanceof _MsAst2.default;
				}).size + '.');
				console.log('ES AST size: ' + treeSize(esAst, function (_) {
					return _ instanceof _esastDistAst.Node;
				}).size + '.');
				console.log('Output size: ' + code.length + ' characters.');
				console.log('==>\n' + code);
			}
		} catch (error) {
			if (error instanceof _CompileError2.default) console.log((0, _formatCompileErrorForConsole2.default)(error));
			throw error;
		}
	};

	const benchmark = function (tests) {
		const suite = new _benchmark.Suite();
		Object.keys(tests).forEach(function (name) {
			return suite.add(name, tests[name]);
		});
		suite.on('complete', function () {
			this.forEach(function (_) {
				const ms = (0, _numeral2.default)(_.stats.mean * 1000).format('0.00');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLE9BQ04sSUFBSSxHQUFHO1NBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztFQUFBO09BQzFCLFFBQVEsR0FBRztTQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUQ3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO0FBRVQsT0FBTSxNQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDNUIsUUFBTSxNQUFNLEdBQUcsYUFBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHO0FBQ1osU0FBTSxFQUFFLGNBQWM7QUFDdEIsa0JBQWUsRUFBRSxLQUFLO0FBQ3RCLG1CQUFnQixFQUFFLElBQUk7QUFDdEIsb0JBQWlCLEVBQUUsS0FBSztBQUN4QixxQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLFlBQVMsRUFBRSxLQUFLO0dBQ2hCLENBQUE7QUFDRCxRQUFNLE9BQU8sR0FBRyw0QkFBbUIsNEJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUE7O0FBRTVELE1BQUk7QUFDSCxTQUFNLFNBQVMsR0FBRyxrQkFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRXRDLFNBQU0sS0FBSyxHQUFHLG9CQUFNLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTs7QUFFdkMsU0FBTSxhQUFhLEdBQUcscUJBQU8sT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBOztBQUU1QyxTQUFNLEtBQUssR0FBRyx3QkFBVSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBOzs7aUJBRXJDLHNCQUFPLE9BQU8sRUFBRSxLQUFLLENBQUM7O1NBQS9CLElBQUksV0FBSixJQUFJOztBQUVaLFVBQU8sQ0FBQyxRQUFRLENBQUMsT0FB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QUMsSUFBSSxDQUFDLENBQUE7QUFDakIsVUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNoRCxXQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEIsU0FBSSxLQUFLLFlBQVksS0FBSyxFQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLEtBRXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNiLENBQUMsQ0FBQTtJQUNGLE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGUnXG5pbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCBNc0FzdCBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgbGV4IGZyb20gJy4uL3ByaXZhdGUvbGV4J1xuaW1wb3J0IHBhcnNlIGZyb20gJy4uL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4uL3ByaXZhdGUvdmVyaWZ5J1xuaW1wb3J0IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUgZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGlzUGVyZlRlc3QgPT4ge1xuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSB7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogdHJ1ZSxcblx0XHR1c2VTdHJpY3Q6IGZhbHNlXG5cdH1cblx0Y29uc3QgY29udGV4dCA9IG5ldyBDb21waWxlQ29udGV4dChuZXcgQ29tcGlsZU9wdGlvbnMob3B0cykpXG5cblx0dHJ5IHtcblx0XHRjb25zdCByb290VG9rZW4gPSBsZXgoY29udGV4dCwgc291cmNlKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke3Jvb3RUb2tlbn1gKVxuXHRcdGNvbnN0IG1zQXN0ID0gcGFyc2UoY29udGV4dCwgcm9vdFRva2VuKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke21zQXN0fWApXG5cdFx0Y29uc3QgdmVyaWZ5UmVzdWx0cyA9IHZlcmlmeShjb250ZXh0LCBtc0FzdClcblx0XHQvLyBjb25zb2xlLmxvZyhgKysrXFxuJHt2ZXJpZnlSZXN1bHRzLl9fX31gKVxuXHRcdGNvbnN0IGVzQXN0ID0gdHJhbnNwaWxlKGNvbnRleHQsIG1zQXN0LCB2ZXJpZnlSZXN1bHRzKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2VzQXN0fWApXG5cdFx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY29udGV4dCwgZXNBc3QpXG5cblx0XHRjb250ZXh0Lndhcm5pbmdzLmZvckVhY2godyA9PiBjb25zb2xlLmxvZyh3KSlcblxuXHRcdGlmIChpc1BlcmZUZXN0KVxuXHRcdFx0YmVuY2htYXJrKHtcblx0XHRcdFx0bGV4OiAoKSA9PiBsZXgoY29udGV4dCwgc291cmNlKSxcblx0XHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGNvbnRleHQsIHJvb3RUb2tlbiksXG5cdFx0XHRcdHZlcmlmeTogKCkgPT4gdmVyaWZ5KGNvbnRleHQsIG1zQXN0KSxcblx0XHRcdFx0dHJhbnNwaWxlOiAoKSA9PiB0cmFuc3BpbGUoY29udGV4dCwgbXNBc3QsIHZlcmlmeVJlc3VsdHMpLFxuXHRcdFx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjb250ZXh0LCBlc0FzdCksXG5cdFx0XHRcdGFsbDogKCkgPT4gY29tcGlsZShzb3VyY2UsIG9wdHMpXG5cdFx0XHR9KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coYEV4cHJlc3Npb24gdHJlZSBzaXplOiAke3RyZWVTaXplKG1zQXN0LCBfID0+IF8gaW5zdGFuY2VvZiBNc0FzdCkuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBFUyBBU1Qgc2l6ZTogJHt0cmVlU2l6ZShlc0FzdCwgXyA9PiBfIGluc3RhbmNlb2YgTm9kZSkuc2l6ZX0uYClcblx0XHRcdGNvbnNvbGUubG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRcdFx0Y29uc29sZS5sb2coYD09PlxcbiR7Y29kZX1gKVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb21waWxlRXJyb3IpXG5cdFx0XHRjb25zb2xlLmxvZyhmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlKGVycm9yKSlcblx0XHR0aHJvdyBlcnJvclxuXHR9XG59XG5cbmNvbnN0XG5cdGJlbmNobWFyayA9IHRlc3RzID0+IHtcblx0XHRjb25zdCBzdWl0ZSA9IG5ldyBTdWl0ZSgpXG5cdFx0T2JqZWN0LmtleXModGVzdHMpLmZvckVhY2gobmFtZSA9PlxuXHRcdFx0c3VpdGUuYWRkKG5hbWUsIHRlc3RzW25hbWVdKSlcblx0XHRzdWl0ZS5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuZm9yRWFjaChfID0+IHtcblx0XHRcdFx0Y29uc3QgbXMgPSBudW1lcmFsKF8uc3RhdHMubWVhbiAqIDEwMDApLmZvcm1hdCgnMC4wMCcpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGAke18ubmFtZX06ICR7bXN9bXNgKVxuXHRcdFx0fSlcblx0XHR9KVxuXHRcdHN1aXRlLm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHR0aHJvdyBlcnIudGFyZ2V0LmVycm9yXG5cdFx0fSlcblx0XHRzdWl0ZS5ydW4oKVxuXHR9LFxuXG5cdHRyZWVTaXplID0gKHRyZWUsIGNvbmQpID0+IHtcblx0XHRjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpXG5cdFx0bGV0IG5MZWF2ZXMgPSAwXG5cdFx0Y29uc3QgdmlzaXQgPSBub2RlID0+IHtcblx0XHRcdGlmIChub2RlICE9IG51bGwgJiYgIXZpc2l0ZWQuaGFzKG5vZGUpKVxuXHRcdFx0XHRpZiAoY29uZChub2RlKSkge1xuXHRcdFx0XHRcdHZpc2l0ZWQuYWRkKG5vZGUpXG5cdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobm9kZSkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNoaWxkID0gbm9kZVtuYW1lXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLmZvckVhY2godmlzaXQpXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHZpc2l0KGNoaWxkKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5MZWF2ZXMgPSBuTGVhdmVzICsgMVxuXHRcdH1cblx0XHR2aXNpdCh0cmVlKVxuXHRcdHJldHVybiB7IHNpemU6IHZpc2l0ZWQuc2l6ZSwgbkxlYXZlcyB9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9