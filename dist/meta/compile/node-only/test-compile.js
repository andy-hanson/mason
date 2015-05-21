if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../CompileError', '../MsAst', '../private/CompileContext', '../private/CompileOptions', '../private/lex', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', './formatCompileErrorForConsole'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _CompileError, _MsAst, _privateCompileContext, _privateCompileOptions, _privateLex, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _formatCompileErrorForConsole) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs2 = _interopRequire(_fs);

	var _numeral2 = _interopRequire(_numeral);

	var _compile2 = _interopRequire(_compile);

	var _CompileError2 = _interopRequire(_CompileError);

	var _MsAst2 = _interopRequire(_MsAst);

	var _CompileContext = _interopRequire(_privateCompileContext);

	var _CompileOptions = _interopRequire(_privateCompileOptions);

	var _lex = _interopRequire(_privateLex);

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
	const doTest = function (isPerfTest) {
		const source = _fs2.readFileSync('./ms-test.ms', 'utf-8');
		const opts = {
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleName: false,
			forceNonLazyModule: true,
			useStrict: false
		};
		const context = new _CompileContext(new _CompileOptions(opts));

		try {
			const rootToken = (0, _lex)(context, source);
			// console.log(`==>\n${rootToken}`)
			const msAst = (0, _parse)(context, rootToken);
			// console.log(`==>\n${msAst}`)
			const verifyResults = (0, _verify)(context, msAst);
			// console.log(`+++\n${verifyResults.___}`)
			const esAst = (0, _transpile)(context, msAst, verifyResults);
			// console.log(`==>\n${esAst}`)

			var _render = (0, _render2)(context, esAst);

			const code = _render.code;

			context.warnings.forEach(function (w) {
				return console.log(w);
			});

			if (isPerfTest) benchmark({
				lex: function () {
					return (0, _lex)(context, source);
				},
				parse: function () {
					return (0, _parse)(context, rootToken);
				},
				verify: function () {
					return (0, _verify)(context, msAst);
				},
				transpile: function () {
					return (0, _transpile)(context, msAst, verifyResults);
				},
				render: function () {
					return (0, _render2)(context, esAst);
				},
				all: function () {
					return (0, _compile2)(source, opts);
				}
			});else {
				console.log('Expression tree size: ' + treeSize(msAst, function (_) {
					return _ instanceof _MsAst2;
				}).size + '.');
				console.log('ES AST size: ' + treeSize(esAst, function (_) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLE9BQ04sSUFBSSxHQUFHO1NBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztFQUFBO09BQzFCLFFBQVEsR0FBRztTQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUQ3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO0FBRVQsT0FBTSxNQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDNUIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHO0FBQ1osU0FBTSxFQUFFLGNBQWM7QUFDdEIsa0JBQWUsRUFBRSxLQUFLO0FBQ3RCLG1CQUFnQixFQUFFLElBQUk7QUFDdEIsb0JBQWlCLEVBQUUsS0FBSztBQUN4QixxQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLFlBQVMsRUFBRSxLQUFLO0dBQ2hCLENBQUE7QUFDRCxRQUFNLE9BQU8sR0FBRyxvQkFBbUIsb0JBQW1CLElBQUksQ0FBQyxDQUFDLENBQUE7O0FBRTVELE1BQUk7QUFDSCxTQUFNLFNBQVMsR0FBRyxVQUFJLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFdEMsU0FBTSxLQUFLLEdBQUcsWUFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7O0FBRXZDLFNBQU0sYUFBYSxHQUFHLGFBQU8sT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBOztBQUU1QyxTQUFNLEtBQUssR0FBRyxnQkFBVSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBOzs7aUJBRXJDLGNBQU8sT0FBTyxFQUFFLEtBQUssQ0FBQzs7U0FBL0IsSUFBSSxXQUFKLElBQUk7O0FBRVosVUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENB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QUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IE1zQXN0IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IENvbXBpbGVDb250ZXh0IGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZUNvbnRleHQnXG5pbXBvcnQgQ29tcGlsZU9wdGlvbnMgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlT3B0aW9ucydcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSBmcm9tICcuL2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUnXG5cbmV4cG9ydCBjb25zdFxuXHR0ZXN0ID0gKCkgPT4gZG9UZXN0KGZhbHNlKSxcblx0cGVyZlRlc3QgPSAoKSA9PiBkb1Rlc3QodHJ1ZSlcblxuY29uc3QgZG9UZXN0ID0gaXNQZXJmVGVzdCA9PiB7XG5cdGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYygnLi9tcy10ZXN0Lm1zJywgJ3V0Zi04Jylcblx0Y29uc3Qgb3B0cyA9IHtcblx0XHRpbkZpbGU6ICcuL21zLXRlc3QubXMnLFxuXHRcdGluY2x1ZGVBbWRlZmluZTogZmFsc2UsXG5cdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fVxuXHRjb25zdCBjb250ZXh0ID0gbmV3IENvbXBpbGVDb250ZXh0KG5ldyBDb21waWxlT3B0aW9ucyhvcHRzKSlcblxuXHR0cnkge1xuXHRcdGNvbnN0IHJvb3RUb2tlbiA9IGxleChjb250ZXh0LCBzb3VyY2UpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7cm9vdFRva2VufWApXG5cdFx0Y29uc3QgbXNBc3QgPSBwYXJzZShjb250ZXh0LCByb290VG9rZW4pXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7bXNBc3R9YClcblx0XHRjb25zdCB2ZXJpZnlSZXN1bHRzID0gdmVyaWZ5KGNvbnRleHQsIG1zQXN0KVxuXHRcdC8vIGNvbnNvbGUubG9nKGArKytcXG4ke3ZlcmlmeVJlc3VsdHMuX19ffWApXG5cdFx0Y29uc3QgZXNBc3QgPSB0cmFuc3BpbGUoY29udGV4dCwgbXNBc3QsIHZlcmlmeVJlc3VsdHMpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7ZXNBc3R9YClcblx0XHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjb250ZXh0LCBlc0FzdClcblxuXHRcdGNvbnRleHQud2FybmluZ3MuZm9yRWFjaCh3ID0+IGNvbnNvbGUubG9nKHcpKVxuXG5cdFx0aWYgKGlzUGVyZlRlc3QpXG5cdFx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0XHRsZXg6ICgpID0+IGxleChjb250ZXh0LCBzb3VyY2UpLFxuXHRcdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY29udGV4dCwgcm9vdFRva2VuKSxcblx0XHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY29udGV4dCwgbXNBc3QpLFxuXHRcdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjb250ZXh0LCBtc0FzdCwgdmVyaWZ5UmVzdWx0cyksXG5cdFx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGNvbnRleHQsIGVzQXN0KSxcblx0XHRcdFx0YWxsOiAoKSA9PiBjb21waWxlKHNvdXJjZSwgb3B0cylcblx0XHRcdH0pXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUobXNBc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE1zQXN0KS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGVzQXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0XHRjb25zb2xlLmxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUoZXJyb3IpKVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChuYW1lID0+XG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pKVxuXHRcdHN1aXRlLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRjb25zdCBtcyA9IG51bWVyYWwoXy5zdGF0cy5tZWFuICogMTAwMCkuZm9ybWF0KCcwLjAwJylcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7Xy5uYW1lfTogJHttc31tc2ApXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0c3VpdGUub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHRocm93IGVyci50YXJnZXQuZXJyb3Jcblx0XHR9KVxuXHRcdHN1aXRlLnJ1bigpXG5cdH0sXG5cblx0dHJlZVNpemUgPSAodHJlZSwgY29uZCkgPT4ge1xuXHRcdGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KClcblx0XHRsZXQgbkxlYXZlcyA9IDBcblx0XHRjb25zdCB2aXNpdCA9IG5vZGUgPT4ge1xuXHRcdFx0aWYgKG5vZGUgIT0gbnVsbCAmJiAhdmlzaXRlZC5oYXMobm9kZSkpXG5cdFx0XHRcdGlmIChjb25kKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmlzaXRlZC5hZGQobm9kZSlcblx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhub2RlKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2hpbGQgPSBub2RlW25hbWVdXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdFx0Y2hpbGQuZm9yRWFjaCh2aXNpdClcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dmlzaXQoY2hpbGQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=