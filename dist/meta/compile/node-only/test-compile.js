if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/U/util', '../private/Opts'], function (exports, module, _benchmark, _esastDistAst, _fs, _numeral, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateUUtil, _privateOpts) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _fs2 = _interopRequire(_fs);

	var _numeral2 = _interopRequire(_numeral);

	var _Expression2 = _interopRequire(_Expression);

	var _Cx = _interopRequire(_privateCx);

	var _lex = _interopRequire(_privateLexLex);

	var _lexUngrouped = _interopRequire(_privateLexUngrouped);

	var _lexGroup = _interopRequire(_privateLexGroup);

	var _parse = _interopRequire(_privateParse);

	var _render2 = _interopRequire(_privateRender);

	var _transpile = _interopRequire(_privateTranspileTranspile);

	var _verify = _interopRequire(_privateVerify);

	module.exports = function () {
		global.DEBUG = true;

		const source = _fs2.readFileSync('./ms-test.ms', 'utf-8');
		const opts = _privateOpts.OptsFromObject({
			inFile: './ms-test.ms'
		});
		const cx = new _Cx(opts);

		const t = _lex(cx, source);
		// log(`==>\n${t}`)
		const e = _parse(cx, t);
		// log(`==>\n${e}`)
		const vr = _verify(cx, e);
		// log(`+++\n${vr})
		const ast = _transpile(cx, e, vr);
		// log(`==>\n${ast}`)

		var _render = _render2(cx, ast);

		const code = _render.code;

		_privateUUtil.log('Expression tree size: ' + treeSize(e, function (_) {
			return _ instanceof _Expression2;
		}).size + '.');
		_privateUUtil.log('ES AST size: ' + treeSize(ast, function (_) {
			return _ instanceof _esastDistAst.Node;
		}) + '.');
		_privateUUtil.log('Output size: ' + code.length + ' characters.');
		_privateUUtil.log('==>\n' + code);

		// Benchmark has problems if I don't put these in global variables...
		global.lexUngroupedTest = function () {
			return _lexUngrouped(cx, source);
		};
		const tUngrouped = global.lexUngroupedTest();
		global.lexGroupTest = function () {
			return _lexGroup(cx, tUngrouped);
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
			}
		});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFnQmUsWUFBTTtBQUNwQixRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBTkwsY0FBYyxDQU1NO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0dBQ3RCLENBQUMsQ0FBQTtBQUNGLFFBQU0sRUFBRSxHQUFHLFFBQU8sSUFBSSxDQUFDLENBQUE7O0FBRXZCLFFBQU0sQ0FBQyxHQUFHLEtBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV6QixRQUFNLENBQUMsR0FBRyxPQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdEIsUUFBTSxFQUFFLEdBQUcsUUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXhCLFFBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2dCQUVmLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7UUFBeEIsSUFBSSxXQUFKLElBQUk7O0FBQ1osZ0JBckJRLEdBQUcsNEJBcUJrQixRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQUEsQ0FBQztVQUFJLENBQUMsd0JBQXNCO0dBQUEsQ0FBQyxDQUFDLElBQUksT0FBSSxDQUFBO0FBQy9FLGdCQXRCUSxHQUFHLG1CQXNCUyxRQUFRLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQztVQUFJLENBQUMsMEJBbENoQyxJQUFJLEFBa0M0QztHQUFBLENBQUMsT0FBSSxDQUFBO0FBQzdELGdCQXZCUSxHQUFHLG1CQXVCUyxJQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFBO0FBQzlDLGdCQXhCUSxHQUFHLFdBd0JDLElBQUks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LElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgvbGV4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcml2YXRlL1UvdXRpbCdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cdGdsb2JhbC5ERUJVRyA9IHRydWVcblxuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSBPcHRzRnJvbU9iamVjdCh7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJ1xuXHR9KVxuXHRjb25zdCBjeCA9IG5ldyBDeChvcHRzKVxuXG5cdGNvbnN0IHQgPSBsZXgoY3gsIHNvdXJjZSlcblx0Ly8gbG9nKGA9PT5cXG4ke3R9YClcblx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHQvLyBsb2coYD09PlxcbiR7ZX1gKVxuXHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0Ly8gbG9nKGArKytcXG4ke3ZyfSlcblx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0Ly8gbG9nKGA9PT5cXG4ke2FzdH1gKVxuXHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjeCwgYXN0KVxuXHRsb2coYEV4cHJlc3Npb24gdHJlZSBzaXplOiAke3RyZWVTaXplKGUsIF8gPT4gXyBpbnN0YW5jZW9mIEV4cHJlc3Npb24pLnNpemV9LmApXG5cdGxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKX0uYClcblx0bG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRsb2coYD09PlxcbiR7Y29kZX1gKVxuXG5cdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRnbG9iYWwubGV4VW5ncm91cGVkVGVzdCA9ICgpID0+XG5cdFx0bGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpXG5cdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdGdsb2JhbC5sZXhHcm91cFRlc3QgPSAoKSA9PlxuXHRcdGxleEdyb3VwKGN4LCB0VW5ncm91cGVkKVxuXG5cdGJlbmNobWFyayh7XG5cdFx0bGV4VW5ncm91cGVkOiAoKSA9PiBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpLFxuXHRcdGxleEdyb3VwOiAoKSA9PiBnbG9iYWwubGV4R3JvdXBUZXN0KCksXG5cdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHR2ZXJpZnk6ICgpID0+IHZlcmlmeShjeCwgZSksXG5cdFx0dHJhbnNwaWxlOiAoKSA9PiB0cmFuc3BpbGUoY3gsIGUsIHZyKSxcblx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KVxuXHR9KVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==