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
		global.DEBUG = true;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBWEwsY0FBYyxDQVdNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxRQUFPLElBQUksQ0FBQyxDQUFBOztBQUV2QixNQUFJO0FBQ0gsU0FBTSxDQUFDLEdBQUcsS0FBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRXpCLFNBQU0sQ0FBQyxHQUFHLE9BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV0QixTQUFNLEVBQUUsR0FBRyxRQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFeEIsU0FBTSxHQUFHLEdBQUcsV0FBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBOzs7aUJBRWYsU0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDOztTQUF4QixJQUFJ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QUMsS0FBSyxDQUFBO0dBQ3RCLENBQUMsQ0FBQTtBQUNGLE9BQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUNYO09BRUQsUUFBUSxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUMxQixRQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNmLFFBQU0sS0FBSyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLE9BQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBDb21waWxlRXJyb3IgZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDeCBmcm9tICcuLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleCBmcm9tICcuLi9wcml2YXRlL2xleC9sZXgnXG5pbXBvcnQgbGV4VW5ncm91cGVkIGZyb20gJy4uL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuLi9wcml2YXRlL2xleC9ncm91cCdcbmltcG9ydCBwYXJzZSBmcm9tICcuLi9wcml2YXRlL3BhcnNlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuLi9wcml2YXRlL3ZlcmlmeSdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuaW1wb3J0IGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUgZnJvbSAnLi9mb3JtYXRDb21waWxlRXJyb3JGb3JDb25zb2xlJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGluY2x1ZGVQZXJmVGVzdCA9PiB7XG5cdGdsb2JhbC5ERUJVRyA9IHRydWVcblxuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSBPcHRzRnJvbU9iamVjdCh7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lOiBmYWxzZSxcblx0XHRmb3JjZU5vbkxhenlNb2R1bGU6IHRydWUsXG5cdFx0dXNlU3RyaWN0OiBmYWxzZVxuXHR9KVxuXHRjb25zdCBjeCA9IG5ldyBDeChvcHRzKVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgdCA9IGxleChjeCwgc291cmNlKVxuXHRcdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke3R9YClcblx0XHRjb25zdCBlID0gcGFyc2UoY3gsIHQpXG5cdFx0Ly8gY29uc29sZS5sb2coYD09PlxcbiR7ZX1gKVxuXHRcdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHRcdC8vIGNvbnNvbGUubG9nKGArKytcXG4ke3ZyfWApXG5cdFx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0XHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHthc3R9YClcblx0XHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjeCwgYXN0KVxuXG5cdFx0Y3gud2FybmluZ3MuZm9yRWFjaCh3ID0+IGNvbnNvbGUubG9nKHcpKVxuXG5cdFx0aWYgKGluY2x1ZGVQZXJmVGVzdCkge1xuXHRcdFx0Ly8gQmVuY2htYXJrIGhhcyBwcm9ibGVtcyBpZiBJIGRvbid0IHB1dCB0aGVzZSBpbiBnbG9iYWwgdmFyaWFibGVzLi4uXG5cdFx0XHRnbG9iYWwubGV4VW5ncm91cGVkVGVzdCA9ICgpID0+XG5cdFx0XHRcdGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdFx0Y29uc3QgdFVuZ3JvdXBlZCA9IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KClcblx0XHRcdGdsb2JhbC5sZXhHcm91cFRlc3QgPSAoKSA9PlxuXHRcdFx0XHRsZXhHcm91cChjeCwgdFVuZ3JvdXBlZClcblxuXHRcdFx0Z2xvYmFsLmNtcCA9ICgpID0+XG5cdFx0XHRcdGNvbXBpbGUoc291cmNlLCBvcHRzKVxuXHRcdFx0YmVuY2htYXJrKHtcblx0XHRcdFx0bGV4VW5ncm91cGVkOiAoKSA9PiBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpLFxuXHRcdFx0XHRsZXhHcm91cDogKCkgPT4gZ2xvYmFsLmxleEdyb3VwVGVzdCgpLFxuXHRcdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY3gsIHQpLFxuXHRcdFx0XHR2ZXJpZnk6ICgpID0+IHZlcmlmeShjeCwgZSksXG5cdFx0XHRcdHRyYW5zcGlsZTogKCkgPT4gdHJhbnNwaWxlKGN4LCBlLCB2ciksXG5cdFx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGN4LCBhc3QpLFxuXHRcdFx0XHRhbGw6ICgpID0+IGdsb2JhbC5jbXAoKVxuXHRcdFx0fSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coYEV4cHJlc3Npb24gdHJlZSBzaXplOiAke3RyZWVTaXplKGUsIF8gPT4gXyBpbnN0YW5jZW9mIEV4cHJlc3Npb24pLnNpemV9LmApXG5cdFx0XHRjb25zb2xlLmxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKS5zaXplfS5gKVxuXHRcdFx0Y29uc29sZS5sb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0XHRjb25zb2xlLmxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIENvbXBpbGVFcnJvcilcblx0XHRcdGNvbnNvbGUubG9nKGZvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUoZXJyb3IpKVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IGVycm9yXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChuYW1lID0+XG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pKVxuXHRcdHN1aXRlLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRjb25zdCBtcyA9IG51bWVyYWwoXy5zdGF0cy5tZWFuICogMTAwMCkuZm9ybWF0KCcwLjAwJylcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7Xy5uYW1lfTogJHttc31tc2ApXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0c3VpdGUub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHRocm93IGVyci50YXJnZXQuZXJyb3Jcblx0XHR9KVxuXHRcdHN1aXRlLnJ1bigpXG5cdH0sXG5cblx0dHJlZVNpemUgPSAodHJlZSwgY29uZCkgPT4ge1xuXHRcdGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KClcblx0XHRsZXQgbkxlYXZlcyA9IDBcblx0XHRjb25zdCB2aXNpdCA9IG5vZGUgPT4ge1xuXHRcdFx0aWYgKG5vZGUgIT0gbnVsbCAmJiAhdmlzaXRlZC5oYXMobm9kZSkpXG5cdFx0XHRcdGlmIChjb25kKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmlzaXRlZC5hZGQobm9kZSlcblx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhub2RlKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2hpbGQgPSBub2RlW25hbWVdXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdFx0Y2hpbGQuZm9yRWFjaCh2aXNpdClcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dmlzaXQoY2hpbGQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=