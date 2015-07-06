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
		const source = _fs2.default.readFileSync('./test-compile.ms', 'utf-8');
		const opts = {
			inFile: './test-compile.ms',
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
				console.log(_.name + ': ' + ms + 'ms');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLE9BQ04sSUFBSSxHQUFHO1NBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztFQUFBO09BQzFCLFFBQVEsR0FBRztTQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUQ3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO0FBRVQsT0FBTSxNQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDNUIsUUFBTSxNQUFNLEdBQUcsYUFBRyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDNUQsUUFBTSxJQUFJLEdBQUc7QUFDWixTQUFNLEVBQUUsbUJBQW1CO0FBQzNCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLG9CQUFpQixFQUFFLEtBQUs7QUFDeEIscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFBO0FBQ0QsUUFBTSxPQUFPLEdBQUcsNEJBQW1CLDRCQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUU1RCxNQUFJO0FBQ0gsU0FBTSxTQUFTLEdBQUcsa0JBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV0QyxTQUFNLEtBQUssR0FBRyxvQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7O0FBRXZDLFNBQU0sYUFBYSxHQUFHLHFCQUFPLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTs7QUFFNUMsU0FBTSxLQUFLLEdBQUcsd0JBQVUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTs7O2lCQUVyQyxzQkFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDOztTQUEvQixJQUFJLFdBQUosSUFBSTs7QUFFWixVQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7V0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFN0MsT0FBSSxVQUFVLEVBQ2IsU0FBUyxDQUFDO0FBQ1QsT0FBRyxFQUFFO1lBQU0sa0JBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztLQUFBO0FBQy9CLFNBQUssRUFBRTtZQUFNLG9CQUFNLE9BQU8sRUFBRSxTQUFTLENBQUM7S0FBQTtBQUN0QyxVQUFNLEVBQUU7WUFBTSxxQkFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDO0tBQUE7QUFDcEMsYUFBUyxFQUFFO1lBQU0sd0JBQVUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUM7S0FBQTtBQUN6RCxVQUFNLEVBQUU7WUFBTSxzQkFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDO0tBQUE7QUFDcEMsT0FBRyxFQUFFO1lBQU0sdUJBQVEsTUFBTSxFQUFFLElBQUksQ0FBQztLQUFBO0lBQ2hDLENBQUMsQ0FBQSxLQUNFO0FBQ0osV0FBTyxDQUFDLEdBQUcsNEJBQTBCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDO1lBQUksQ0FBQywyQkFBaUI7S0FBQSxDQUFDLENBQUMsSUFBSSxPQUFJLENBQUE7QUFDdEYsV0FBTyxDQUFDLEdBQUcsbUJBQWlCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBQSxDQUFDO1lBQUksQ0FBQywwQkF2RDVDLElBQUksQUF1RHdEO0tBQUEsQ0FBQyxDQUFDLElBQUksT0FBSSxDQUFBO0FBQzVFLFdBQU8sQ0FBQyxHQUFHLG1CQUFpQixJQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFBO0FBQ3RELFdBQU8sQ0FBQyxHQUFHLFdBQVMsSUFBSSxDQUFHLENBQUE7SUFDM0I7R0FDRCxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2YsT0FBSSxLQUFLLGtDQUF3QixFQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE2QixLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ2pELFNBQU0sS0FBSyxDQUFBO0dBQ1g7RUFDRCxDQUFBOztBQUVELE9BQ0MsU0FBUyxHQUFHLFVBQUEsS0FBSyxFQUFJO0FBQ3BCLFFBQU0sS0FBSyxHQUFHLGVBckVQLEtBQUssRUFxRWEsQ0FBQTtBQUN6QixRQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7VUFDOUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFBO0FBQzlCLE9BQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVc7QUFDL0IsT0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUNqQixVQUFNLEVBQUUsR0FBRyx1QkFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEQsV0FBTyxDQUFDLEdBQUcsQ0FBSSxDQUFDLENBQUMsSUFBSSxVQUFLLEVBQUUsUUFBSyxDQUFBO0lBQ2pDLENBQUMsQ0FBQTtHQUNGLENBQUMsQ0FBQTtBQUNGLE9BQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRyxFQUFJO0FBQ3hCLFNBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7R0FDdEIsQ0FBQyxDQUFBO0FBQ0YsT0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO0VBQ1g7T0FFRCxRQUFRLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFLO0FBQzFCLFFBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDekIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsUUFBTSxLQUFLLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDckIsT0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDaEQsV0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQUksS0FBSyxZQUFZLEtBQUssRUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUVwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDYixDQUFDLENBQUE7SUFDRixNQUNBLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFBO0dBQ3ZCLENBQUE7QUFDRCxPQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDWCxTQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFBO0VBQ3RDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS90ZXN0LWNvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWl0ZSB9IGZyb20gJ2JlbmNobWFyaydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnXG5pbXBvcnQgY29tcGlsZSBmcm9tICcuLi9jb21waWxlJ1xuaW1wb3J0IENvbXBpbGVFcnJvciBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgTXNBc3QgZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgQ29tcGlsZUNvbnRleHQgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlQ29udGV4dCdcbmltcG9ydCBDb21waWxlT3B0aW9ucyBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVPcHRpb25zJ1xuaW1wb3J0IGxleCBmcm9tICcuLi9wcml2YXRlL2xleCdcbmltcG9ydCBwYXJzZSBmcm9tICcuLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuLi9wcml2YXRlL3ZlcmlmeSdcbmltcG9ydCBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlIGZyb20gJy4vZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSdcblxuZXhwb3J0IGNvbnN0XG5cdHRlc3QgPSAoKSA9PiBkb1Rlc3QoZmFsc2UpLFxuXHRwZXJmVGVzdCA9ICgpID0+IGRvVGVzdCh0cnVlKVxuXG5jb25zdCBkb1Rlc3QgPSBpc1BlcmZUZXN0ID0+IHtcblx0Y29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKCcuL3Rlc3QtY29tcGlsZS5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSB7XG5cdFx0aW5GaWxlOiAnLi90ZXN0LWNvbXBpbGUubXMnLFxuXHRcdGluY2x1ZGVBbWRlZmluZTogZmFsc2UsXG5cdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRpbmNsdWRlTW9kdWxlTmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fVxuXHRjb25zdCBjb250ZXh0ID0gbmV3IENvbXBpbGVDb250ZXh0KG5ldyBDb21waWxlT3B0aW9ucyhvcHRzKSlcblxuXHR0cnkge1xuXHRcdGNvbnN0IHJvb3RUb2tlbiA9IGxleChjb250ZXh0LCBzb3VyY2UpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7cm9vdFRva2VufWApXG5cdFx0Y29uc3QgbXNBc3QgPSBwYXJzZShjb250ZXh0LCByb290VG9rZW4pXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7bXNBc3R9YClcblx0XHRjb25zdCB2ZXJpZnlSZXN1bHRzID0gdmVyaWZ5KGNvbnRleHQsIG1zQXN0KVxuXHRcdC8vIGNvbnNvbGUubG9nKGArKytcXG4ke3ZlcmlmeVJlc3VsdHMuX19ffWApXG5cdFx0Y29uc3QgZXNBc3QgPSB0cmFuc3BpbGUoY29udGV4dCwgbXNBc3QsIHZlcmlmeVJlc3VsdHMpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7ZXNBc3R9YClcblx0XHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjb250ZXh0LCBlc0FzdClcblxuXHRcdGNvbnRleHQud2FybmluZ3MuZm9yRWFjaCh3ID0+IGNvbnNvbGUubG9nKHcpKVxuXG5cdFx0aWYgKGlzUGVyZlRlc3QpXG5cdFx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0XHRsZXg6ICgpID0+IGxleChjb250ZXh0LCBzb3VyY2UpLFxuXHRcdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY29udGV4dCwgcm9vdFRva2VuKSxcblx0XHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY29udGV4dCwgbXNBc3QpLFxuXHRcdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjb250ZXh0LCBtc0FzdCwgdmVyaWZ5UmVzdWx0cyksXG5cdFx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGNvbnRleHQsIGVzQXN0KSxcblx0XHRcdFx0YWxsOiAoKSA9PiBjb21waWxlKHNvdXJjZSwgb3B0cylcblx0XHRcdH0pXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUobXNBc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE1zQXN0KS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGVzQXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0XHRjb25zb2xlLmxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUoZXJyb3IpKVxuXHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChuYW1lID0+XG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pKVxuXHRcdHN1aXRlLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRjb25zdCBtcyA9IG51bWVyYWwoXy5zdGF0cy5tZWFuICogMTAwMCkuZm9ybWF0KCcwLjAwJylcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7Xy5uYW1lfTogJHttc31tc2ApXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0c3VpdGUub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHRocm93IGVyci50YXJnZXQuZXJyb3Jcblx0XHR9KVxuXHRcdHN1aXRlLnJ1bigpXG5cdH0sXG5cblx0dHJlZVNpemUgPSAodHJlZSwgY29uZCkgPT4ge1xuXHRcdGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KClcblx0XHRsZXQgbkxlYXZlcyA9IDBcblx0XHRjb25zdCB2aXNpdCA9IG5vZGUgPT4ge1xuXHRcdFx0aWYgKG5vZGUgIT0gbnVsbCAmJiAhdmlzaXRlZC5oYXMobm9kZSkpXG5cdFx0XHRcdGlmIChjb25kKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmlzaXRlZC5hZGQobm9kZSlcblx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhub2RlKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2hpbGQgPSBub2RlW25hbWVdXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdFx0Y2hpbGQuZm9yRWFjaCh2aXNpdClcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dmlzaXQoY2hpbGQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=