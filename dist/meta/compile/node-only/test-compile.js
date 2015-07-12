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

			for (const _ of context.warnings) console.log(_);

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
		for (const name in tests) suite.add(name, tests[name]);
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
				for (const name in node) {
					const child = node[name];
					if (child instanceof Array) child.forEach(visit);else visit(child);
				}
			} else nLeaves = nLeaves + 1;
		};
		visit(tree);
		return { size: visited.size, nLeaves: nLeaves };
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLE9BQ04sSUFBSSxHQUFHO1NBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztFQUFBO09BQzFCLFFBQVEsR0FBRztTQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7RUFBQSxDQUFBOztTQUQ3QixJQUFJLEdBQUosSUFBSTtTQUNKLFFBQVEsR0FBUixRQUFRO0FBRVQsT0FBTSxNQUFNLEdBQUcsVUFBQSxVQUFVLEVBQUk7QUFDNUIsUUFBTSxNQUFNLEdBQUcsYUFBRyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDNUQsUUFBTSxJQUFJLEdBQUc7QUFDWixTQUFNLEVBQUUsbUJBQW1CO0FBQzNCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLG9CQUFpQixFQUFFLEtBQUs7QUFDeEIscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFBO0FBQ0QsUUFBTSxPQUFPLEdBQUcsNEJBQW1CLDRCQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUU1RCxNQUFJO0FBQ0gsU0FBTSxTQUFTLEdBQUcsa0JBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV0QyxTQUFNLEtBQUssR0FBRyxvQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7O0FBRXZDLFNBQU0sYUFBYSxHQUFHLHFCQUFPLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTs7QUFFNUMsU0FBTSxLQUFLLEdBQUcsd0JBQVUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTs7O2lCQUVyQyxzQkFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDOztTQUEvQixJQUFJLFdBQUosSUFBSTs7QUFFWixRQUFLLE1BQU0sQ0FBQyxJQUFJ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QUU7QUFDeEIsV0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQUksS0FBSyxZQUFZLEtBQUssRUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUVwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDYjtJQUNELE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBjb21waWxlIGZyb20gJy4uL2NvbXBpbGUnXG5pbXBvcnQgQ29tcGlsZUVycm9yIGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCBNc0FzdCBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgbGV4IGZyb20gJy4uL3ByaXZhdGUvbGV4J1xuaW1wb3J0IHBhcnNlIGZyb20gJy4uL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4uL3ByaXZhdGUvdmVyaWZ5J1xuaW1wb3J0IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUgZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGlzUGVyZlRlc3QgPT4ge1xuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vdGVzdC1jb21waWxlLm1zJywgJ3V0Zi04Jylcblx0Y29uc3Qgb3B0cyA9IHtcblx0XHRpbkZpbGU6ICcuL3Rlc3QtY29tcGlsZS5tcycsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiBmYWxzZSxcblx0XHRpbmNsdWRlU291cmNlTWFwOiB0cnVlLFxuXHRcdGluY2x1ZGVNb2R1bGVOYW1lOiBmYWxzZSxcblx0XHRmb3JjZU5vbkxhenlNb2R1bGU6IHRydWUsXG5cdFx0dXNlU3RyaWN0OiBmYWxzZVxuXHR9XG5cdGNvbnN0IGNvbnRleHQgPSBuZXcgQ29tcGlsZUNvbnRleHQobmV3IENvbXBpbGVPcHRpb25zKG9wdHMpKVxuXG5cdHRyeSB7XG5cdFx0Y29uc3Qgcm9vdFRva2VuID0gbGV4KGNvbnRleHQsIHNvdXJjZSlcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHtyb290VG9rZW59YClcblx0XHRjb25zdCBtc0FzdCA9IHBhcnNlKGNvbnRleHQsIHJvb3RUb2tlbilcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHttc0FzdH1gKVxuXHRcdGNvbnN0IHZlcmlmeVJlc3VsdHMgPSB2ZXJpZnkoY29udGV4dCwgbXNBc3QpXG5cdFx0Ly8gY29uc29sZS5sb2coYCsrK1xcbiR7dmVyaWZ5UmVzdWx0cy5fX199YClcblx0XHRjb25zdCBlc0FzdCA9IHRyYW5zcGlsZShjb250ZXh0LCBtc0FzdCwgdmVyaWZ5UmVzdWx0cylcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHtlc0FzdH1gKVxuXHRcdGNvbnN0IHsgY29kZSB9ID0gcmVuZGVyKGNvbnRleHQsIGVzQXN0KVxuXG5cdFx0Zm9yIChjb25zdCBfIG9mIGNvbnRleHQud2FybmluZ3MpXG5cdFx0XHRjb25zb2xlLmxvZyhfKVxuXG5cdFx0aWYgKGlzUGVyZlRlc3QpXG5cdFx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0XHRsZXg6ICgpID0+IGxleChjb250ZXh0LCBzb3VyY2UpLFxuXHRcdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY29udGV4dCwgcm9vdFRva2VuKSxcblx0XHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY29udGV4dCwgbXNBc3QpLFxuXHRcdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjb250ZXh0LCBtc0FzdCwgdmVyaWZ5UmVzdWx0cyksXG5cdFx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGNvbnRleHQsIGVzQXN0KSxcblx0XHRcdFx0YWxsOiAoKSA9PiBjb21waWxlKHNvdXJjZSwgb3B0cylcblx0XHRcdH0pXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUobXNBc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE1zQXN0KS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGVzQXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0XHRjb25zb2xlLmxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUoZXJyb3IpKVxuXHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRmb3IgKGNvbnN0IG5hbWUgaW4gdGVzdHMpXG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdGZvciAoY29uc3QgbmFtZSBpbiBub2RlKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5MZWF2ZXMgPSBuTGVhdmVzICsgMVxuXHRcdH1cblx0XHR2aXNpdCh0cmVlKVxuXHRcdHJldHVybiB7IHNpemU6IHZpc2l0ZWQuc2l6ZSwgbkxlYXZlcyB9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9