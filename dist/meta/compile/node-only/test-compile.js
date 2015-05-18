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
		const opts = {
			inFile: './ms-test.ms',
			includeAmdefine: false,
			includeSourceMap: true,
			includeModuleName: false,
			forceNonLazyModule: true,
			useStrict: false
		};
		const cx = new _CompileContext(new _CompileOptions(opts));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLE1BQU0sR0FBRyxLQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsUUFBTSxJQUFJLEdBQUc7QUFDWixTQUFNLEVBQUUsY0FBYztBQUN0QixrQkFBZSxFQUFFLEtBQUs7QUFDdEIsbUJBQWdCLEVBQUUsSUFBSTtBQUN0QixvQkFBaUIsRUFBRSxLQUFLO0FBQ3hCLHFCQUFrQixFQUFFLElBQUk7QUFDeEIsWUFBUyxFQUFFLEtBQUs7R0FDaEIsQ0FBQTtBQUNELFFBQU0sRUFBRSxHQUFHLG9CQUFtQixvQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQTs7QUFFdkQsTUFBSTtBQUNILFNBQU0sRUFBRSxHQUFHLG1CQUFhLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFbkMsU0FBTSxDQUFDLEdBQUcsZUFBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRTFCLFNBQU0sQ0FBQyxHQUFHLFlBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV0QixTQUFNLEVBQUUsR0FBRyxhQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFeEIsU0FBTSxHQUFHLEdBQUcsZ0JBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2lCQUVmLGNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7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Q0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO0dBQ3RCLENBQUMsQ0FBQTtBQUNGLE9BQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUNYO09BRUQsUUFBUSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUMxQixRQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNmLFFBQU0sS0FBSyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLE9BQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDb21waWxlQ29udGV4dCBmcm9tICcuLi9wcml2YXRlL0NvbXBpbGVDb250ZXh0J1xuaW1wb3J0IENvbXBpbGVPcHRpb25zIGZyb20gJy4uL3ByaXZhdGUvQ29tcGlsZU9wdGlvbnMnXG5pbXBvcnQgbGV4VW5ncm91cGVkIGZyb20gJy4uL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuLi9wcml2YXRlL2xleC9ncm91cCdcbmltcG9ydCBwYXJzZSBmcm9tICcuLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuLi9wcml2YXRlL3ZlcmlmeSdcbmltcG9ydCBmb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlIGZyb20gJy4vZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZSdcblxuZXhwb3J0IGNvbnN0XG5cdHRlc3QgPSAoKSA9PiBkb1Rlc3QoZmFsc2UpLFxuXHRwZXJmVGVzdCA9ICgpID0+IGRvVGVzdCh0cnVlKVxuXG5jb25zdCBkb1Rlc3QgPSBpbmNsdWRlUGVyZlRlc3QgPT4ge1xuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSB7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZU5hbWU6IGZhbHNlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogdHJ1ZSxcblx0XHR1c2VTdHJpY3Q6IGZhbHNlXG5cdH1cblx0Y29uc3QgY3ggPSBuZXcgQ29tcGlsZUNvbnRleHQobmV3IENvbXBpbGVPcHRpb25zKG9wdHMpKVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgdWcgPSBsZXhVbmdyb3VwZWQoY3gsIHNvdXJjZSlcblx0XHQvLyBjb25zb2xlLmxvZyh1Zylcblx0XHRjb25zdCB0ID0gbGV4R3JvdXAoY3gsIHVnKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke3R9YClcblx0XHRjb25zdCBlID0gcGFyc2UoY3gsIHQpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7ZX1gKVxuXHRcdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHRcdC8vIGNvbnNvbGUubG9nKGArKytcXG4ke3ZyfWApXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHthc3R9YClcblx0XHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjeCwgYXN0KVxuXG5cdFx0Y3gud2FybmluZ3MuZm9yRWFjaCh3ID0+IGNvbnNvbGUubG9nKHcpKVxuXG5cdFx0aWYgKGluY2x1ZGVQZXJmVGVzdCkge1xuXHRcdFx0Ly8gQmVuY2htYXJrIGhhcyBwcm9ibGVtcyBpZiBJIGRvbid0IHB1dCB0aGVzZSBpbiBnbG9iYWwgdmFyaWFibGVzLi4uXG5cdFx0XHRnbG9iYWwubGV4VW5ncm91cGVkVGVzdCA9ICgpID0+XG5cdFx0XHRcdGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdFx0Y29uc3QgdFVuZ3JvdXBlZCA9IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KClcblx0XHRcdGdsb2JhbC5sZXhHcm91cFRlc3QgPSAoKSA9PlxuXHRcdFx0XHRsZXhHcm91cChjeCwgdFVuZ3JvdXBlZClcblxuXHRcdFx0Z2xvYmFsLmNtcCA9ICgpID0+XG5cdFx0XHRcdGNvbXBpbGUoc291cmNlLCBvcHRzKVxuXHRcdFx0YmVuY2htYXJrKHtcblx0XHRcdFx0bGV4VW5ncm91cGVkOiAoKSA9PiBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpLFxuXHRcdFx0XHRsZXhHcm91cDogKCkgPT4gZ2xvYmFsLmxleEdyb3VwVGVzdCgpLFxuXHRcdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY3gsIHQpLFxuXHRcdFx0XHR2ZXJpZnk6ICgpID0+IHZlcmlmeShjeCwgZSksXG5cdFx0XHRcdHRyYW5zcGlsZTogKCkgPT4gdHJhbnNwaWxlKGN4LCBlLCB2ciksXG5cdFx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGN4LCBhc3QpLFxuXHRcdFx0XHRhbGw6ICgpID0+IGdsb2JhbC5jbXAoKVxuXHRcdFx0fSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coYEV4cHJlc3Npb24gdHJlZSBzaXplOiAke3RyZWVTaXplKGUsIF8gPT4gXyBpbnN0YW5jZW9mIEV4cHJlc3Npb24pLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0XHRjb25zb2xlLmxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUoZXJyb3IpKVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChuYW1lID0+XG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pKVxuXHRcdHN1aXRlLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRjb25zdCBtcyA9IG51bWVyYWwoXy5zdGF0cy5tZWFuICogMTAwMCkuZm9ybWF0KCcwLjAwJylcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7Xy5uYW1lfTogJHttc31tc2ApXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0c3VpdGUub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHRocm93IGVyci50YXJnZXQuZXJyb3Jcblx0XHR9KVxuXHRcdHN1aXRlLnJ1bigpXG5cdH0sXG5cblx0dHJlZVNpemUgPSAodHJlZSwgY29uZCkgPT4ge1xuXHRcdGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KClcblx0XHRsZXQgbkxlYXZlcyA9IDBcblx0XHRjb25zdCB2aXNpdCA9IG5vZGUgPT4ge1xuXHRcdFx0aWYgKG5vZGUgIT0gbnVsbCAmJiAhdmlzaXRlZC5oYXMobm9kZSkpXG5cdFx0XHRcdGlmIChjb25kKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmlzaXRlZC5hZGQobm9kZSlcblx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhub2RlKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2hpbGQgPSBub2RlW25hbWVdXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdFx0Y2hpbGQuZm9yRWFjaCh2aXNpdClcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dmlzaXQoY2hpbGQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=