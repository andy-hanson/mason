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

	const test = () => doTest(false),
	      perfTest = () => doTest(true);

	exports.test = test;
	exports.perfTest = perfTest;
	const doTest = isPerfTest => {
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
				lex: () => (0, _lex.default)(context, source),
				parse: () => (0, _parse.default)(context, rootToken),
				verify: () => (0, _verify.default)(context, msAst),
				transpile: () => (0, _transpile.default)(context, msAst, verifyResults),
				render: () => (0, _render2.default)(context, esAst),
				all: () => (0, _compile2.default)(source, opts)
			});else {
				console.log(`Expression tree size: ${ treeSize(msAst, _ => _ instanceof _MsAst2.default).size }.`);
				console.log(`ES AST size: ${ treeSize(esAst, _ => _ instanceof _esastDistAst.Node).size }.`);
				console.log(`Output size: ${ code.length } characters.`);
				console.log(`==>\n${ code }`);
			}
		} catch (error) {
			if (error instanceof _CompileError2.default) console.log((0, _formatCompileErrorForConsole2.default)(error));
			throw error;
		}
	};

	const benchmark = tests => {
		const suite = new _benchmark.Suite();
		for (const name in tests) suite.add(name, tests[name]);
		suite.on('complete', function () {
			this.forEach(_ => {
				const ms = (0, _numeral2.default)(_.stats.mean * 1000).format('0.00');
				console.log(`${ _.name }: ${ ms }ms`);
			});
		});
		suite.on('error', err => {
			throw err.target.error;
		});
		suite.run();
	},
	      treeSize = (tree, cond) => {
		const visited = new Set();
		let nLeaves = 0;
		const visit = node => {
			if (node != null && !visited.has(node)) if (cond(node)) {
				visited.add(node);
				for (const name in node) {
					const child = node[name];
					if (child instanceof Array) child.forEach(visit);else visit(child);
				}
			} else nLeaves = nLeaves + 1;
		};
		visit(tree);
		return { size: visited.size, nLeaves };
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLE9BQ04sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztPQUMxQixRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFVLElBQUk7QUFDNUIsUUFBTSxNQUFNLEdBQUcsYUFBRyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDNUQsUUFBTSxJQUFJLEdBQUc7QUFDWixTQUFNLEVBQUUsbUJBQW1CO0FBQzNCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLG9CQUFpQixFQUFFLEtBQUs7QUFDeEIscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFBO0FBQ0QsUUFBTSxPQUFPLEdBQUcsNEJBQW1CLDRCQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFBOztBQUU1RCxNQUFJO0FBQ0gsU0FBTSxTQUFTLEdBQUcsa0JBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV0QyxTQUFNLEtBQUssR0FBRyxvQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7O0FBRXZDLFNBQU0sYUFBYSxHQUFHLHFCQUFPLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTs7QUFFNUMsU0FBTSxLQUFLLEdBQUcsd0JBQVUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTs7O2lCQUVyQyxzQkFBTyxPQUFPLEVBQUUsS0FBSyxDQUFDOztTQUEvQixJQUFJLFdBQUosSUFBSTs7QUFFWixRQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFR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QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDakIsU0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDeEIsV0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQUksS0FBSyxZQUFZLEtBQUssRUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUVwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDYjtJQUNELE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IE1zQXN0IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IENvbXBpbGVDb250ZXh0IGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZUNvbnRleHQnXG5pbXBvcnQgQ29tcGlsZU9wdGlvbnMgZnJvbSAnLi4vcHJpdmF0ZS9Db21waWxlT3B0aW9ucydcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSBmcm9tICcuL2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUnXG5cbmV4cG9ydCBjb25zdFxuXHR0ZXN0ID0gKCkgPT4gZG9UZXN0KGZhbHNlKSxcblx0cGVyZlRlc3QgPSAoKSA9PiBkb1Rlc3QodHJ1ZSlcblxuY29uc3QgZG9UZXN0ID0gaXNQZXJmVGVzdCA9PiB7XG5cdGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYygnLi90ZXN0LWNvbXBpbGUubXMnLCAndXRmLTgnKVxuXHRjb25zdCBvcHRzID0ge1xuXHRcdGluRmlsZTogJy4vdGVzdC1jb21waWxlLm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogdHJ1ZSxcblx0XHR1c2VTdHJpY3Q6IGZhbHNlXG5cdH1cblx0Y29uc3QgY29udGV4dCA9IG5ldyBDb21waWxlQ29udGV4dChuZXcgQ29tcGlsZU9wdGlvbnMob3B0cykpXG5cblx0dHJ5IHtcblx0XHRjb25zdCByb290VG9rZW4gPSBsZXgoY29udGV4dCwgc291cmNlKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke3Jvb3RUb2tlbn1gKVxuXHRcdGNvbnN0IG1zQXN0ID0gcGFyc2UoY29udGV4dCwgcm9vdFRva2VuKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke21zQXN0fWApXG5cdFx0Y29uc3QgdmVyaWZ5UmVzdWx0cyA9IHZlcmlmeShjb250ZXh0LCBtc0FzdClcblx0XHQvLyBjb25zb2xlLmxvZyhgKysrXFxuJHt2ZXJpZnlSZXN1bHRzLl9fX31gKVxuXHRcdGNvbnN0IGVzQXN0ID0gdHJhbnNwaWxlKGNvbnRleHQsIG1zQXN0LCB2ZXJpZnlSZXN1bHRzKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke2VzQXN0fWApXG5cdFx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY29udGV4dCwgZXNBc3QpXG5cblx0XHRmb3IgKGNvbnN0IF8gb2YgY29udGV4dC53YXJuaW5ncylcblx0XHRcdGNvbnNvbGUubG9nKF8pXG5cblx0XHRpZiAoaXNQZXJmVGVzdClcblx0XHRcdGJlbmNobWFyayh7XG5cdFx0XHRcdGxleDogKCkgPT4gbGV4KGNvbnRleHQsIHNvdXJjZSksXG5cdFx0XHRcdHBhcnNlOiAoKSA9PiBwYXJzZShjb250ZXh0LCByb290VG9rZW4pLFxuXHRcdFx0XHR2ZXJpZnk6ICgpID0+IHZlcmlmeShjb250ZXh0LCBtc0FzdCksXG5cdFx0XHRcdHRyYW5zcGlsZTogKCkgPT4gdHJhbnNwaWxlKGNvbnRleHQsIG1zQXN0LCB2ZXJpZnlSZXN1bHRzKSxcblx0XHRcdFx0cmVuZGVyOiAoKSA9PiByZW5kZXIoY29udGV4dCwgZXNBc3QpLFxuXHRcdFx0XHRhbGw6ICgpID0+IGNvbXBpbGUoc291cmNlLCBvcHRzKVxuXHRcdFx0fSlcblx0XHRlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShtc0FzdCwgXyA9PiBfIGluc3RhbmNlb2YgTXNBc3QpLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoZXNBc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE5vZGUpLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgT3V0cHV0IHNpemU6ICR7Y29kZS5sZW5ndGh9IGNoYXJhY3RlcnMuYClcblx0XHRcdGNvbnNvbGUubG9nKGA9PT5cXG4ke2NvZGV9YClcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29tcGlsZUVycm9yKVxuXHRcdFx0Y29uc29sZS5sb2coZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZShlcnJvcikpXG5cdFx0dGhyb3cgZXJyb3Jcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdGZvciAoY29uc3QgbmFtZSBpbiB0ZXN0cylcblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSlcblx0XHRzdWl0ZS5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuZm9yRWFjaChfID0+IHtcblx0XHRcdFx0Y29uc3QgbXMgPSBudW1lcmFsKF8uc3RhdHMubWVhbiAqIDEwMDApLmZvcm1hdCgnMC4wMCcpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGAke18ubmFtZX06ICR7bXN9bXNgKVxuXHRcdFx0fSlcblx0XHR9KVxuXHRcdHN1aXRlLm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHR0aHJvdyBlcnIudGFyZ2V0LmVycm9yXG5cdFx0fSlcblx0XHRzdWl0ZS5ydW4oKVxuXHR9LFxuXG5cdHRyZWVTaXplID0gKHRyZWUsIGNvbmQpID0+IHtcblx0XHRjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpXG5cdFx0bGV0IG5MZWF2ZXMgPSAwXG5cdFx0Y29uc3QgdmlzaXQgPSBub2RlID0+IHtcblx0XHRcdGlmIChub2RlICE9IG51bGwgJiYgIXZpc2l0ZWQuaGFzKG5vZGUpKVxuXHRcdFx0XHRpZiAoY29uZChub2RlKSkge1xuXHRcdFx0XHRcdHZpc2l0ZWQuYWRkKG5vZGUpXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBuYW1lIGluIG5vZGUpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGNoaWxkID0gbm9kZVtuYW1lXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdFx0XHRcdGNoaWxkLmZvckVhY2godmlzaXQpXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHZpc2l0KGNoaWxkKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=