if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../compile', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/Opts'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _compile, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateOpts) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _fs2 = _interopRequire(_fs);

	var _numeral2 = _interopRequire(_numeral);

	var _compile2 = _interopRequire(_compile);

	var _Expression2 = _interopRequire(_Expression);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

	var _parse = _interopRequire(_privateParseParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

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
			}) + '.');
			console.log('Output size: ' + code.length + ' characters.');
			console.log('==>\n' + code);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCTyxPQUNOLElBQUksR0FBRztTQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUM7RUFBQTtPQUMxQixRQUFRLEdBQUc7U0FBTSxNQUFNLENBQUMsSUFBSSxDQUFDO0VBQUEsQ0FBQTs7U0FEN0IsSUFBSSxHQUFKLElBQUk7U0FDSixRQUFRLEdBQVIsUUFBUTtBQUVULE9BQU0sTUFBTSxHQUFHLFVBQUEsZUFBZSxFQUFJO0FBQ2pDLFFBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBOztBQUVuQixRQUFNLE1BQU0sR0FBRyxLQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsUUFBTSxJQUFJLEdBQUcsYUFWTCxjQUFjLENBVU07QUFDM0IsU0FBTSxFQUFFLGNBQWM7QUFDdEIsa0JBQWUsRUFBRSxLQUFLO0FBQ3RCLG1CQUFnQixFQUFFLElBQUk7QUFDdEIsMkJBQXdCLEVBQUUsS0FBSztBQUMvQixxQkFBa0IsRUFBRSxJQUFJO0FBQ3hCLFlBQVMsRUFBRSxLQUFLO0dBQ2hCLENBQUMsQ0FBQTtBQUNGLFFBQU0sRUFBRSxHQUFHLFFBQU8sSUFBSSxDQUFDLENBQUE7O0FBRXZCLFFBQU0sQ0FBQyxHQUFHLEtBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV6QixRQUFNLENBQUMsR0FBRyxPQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdEIsUUFBTSxFQUFFLEdBQUcsUUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXhCLFFBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2dCQUVmLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7UUFBeEIsSUFBSSxXQUFKLElBQUk7O0FB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LE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNmLFFBQU0sS0FBSyxHQUFHLFVBQUEsSUFBSSxFQUFJO0FBQ3JCLE9BQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixVQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2hELFdBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixTQUFJLEtBQUssWUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi4vY29tcGlsZSdcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgvbGV4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcblxuZXhwb3J0IGNvbnN0XG5cdHRlc3QgPSAoKSA9PiBkb1Rlc3QoZmFsc2UpLFxuXHRwZXJmVGVzdCA9ICgpID0+IGRvVGVzdCh0cnVlKVxuXG5jb25zdCBkb1Rlc3QgPSBpbmNsdWRlUGVyZlRlc3QgPT4ge1xuXHRnbG9iYWwuREVCVUcgPSB0cnVlXG5cblx0Y29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKCcuL21zLXRlc3QubXMnLCAndXRmLTgnKVxuXHRjb25zdCBvcHRzID0gT3B0c0Zyb21PYmplY3Qoe1xuXHRcdGluRmlsZTogJy4vbXMtdGVzdC5tcycsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiBmYWxzZSxcblx0XHRpbmNsdWRlU291cmNlTWFwOiB0cnVlLFxuXHRcdGluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fSlcblx0Y29uc3QgY3ggPSBuZXcgQ3gob3B0cylcblxuXHRjb25zdCB0ID0gbGV4KGN4LCBzb3VyY2UpXG5cdC8vIGNvbnNvbGUubG9nKGA9PT5cXG4ke3R9YClcblx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHtlfWApXG5cdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHQvLyBjb25zb2xlLmxvZyhgKysrXFxuJHt2cn1gKVxuXHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHQvLyBjb25zb2xlLmxvZyhgPT0+XFxuJHthc3R9YClcblx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY3gsIGFzdClcblxuXHRjeC53YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2codykpXG5cblx0aWYgKGluY2x1ZGVQZXJmVGVzdCkge1xuXHRcdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRcdGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0ID0gKCkgPT5cblx0XHRcdGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdFx0Z2xvYmFsLmxleEdyb3VwVGVzdCA9ICgpID0+XG5cdFx0XHRsZXhHcm91cChjeCwgdFVuZ3JvdXBlZClcblxuXHRcdGdsb2JhbC5jbXAgPSAoKSA9PlxuXHRcdFx0Y29tcGlsZShzb3VyY2UsIG9wdHMpXG5cdFx0YmVuY2htYXJrKHtcblx0XHRcdGxleFVuZ3JvdXBlZDogKCkgPT4gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKSxcblx0XHRcdGxleEdyb3VwOiAoKSA9PiBnbG9iYWwubGV4R3JvdXBUZXN0KCksXG5cdFx0XHRwYXJzZTogKCkgPT4gcGFyc2UoY3gsIHQpLFxuXHRcdFx0dmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY3gsIGUpLFxuXHRcdFx0dHJhbnNwaWxlOiAoKSA9PiB0cmFuc3BpbGUoY3gsIGUsIHZyKSxcblx0XHRcdHJlbmRlcjogKCkgPT4gcmVuZGVyKGN4LCBhc3QpLFxuXHRcdFx0YWxsOiAoKSA9PiBnbG9iYWwuY21wKClcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUubG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdGNvbnNvbGUubG9nKGBFUyBBU1Qgc2l6ZTogJHt0cmVlU2l6ZShhc3QsIF8gPT4gXyBpbnN0YW5jZW9mIE5vZGUpfS5gKVxuXHRcdGNvbnNvbGUubG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRcdGNvbnNvbGUubG9nKGA9PT5cXG4ke2NvZGV9YClcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==