if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/U/util', '../private/Opts'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateUUtil, _privateOpts) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

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
		// log(`==>\n${t}`)
		const e = _parse(cx, t);
		// log(`==>\n${e}`)
		const vr = _verify(cx, e);
		// log(`+++\n${vr})
		const ast = _transpile(cx, e, vr);
		// log(`==>\n${ast}`)

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

			benchmark({
				//lexUngrouped: () => global.lexUngroupedTest(),
				//lexGroup: () => global.lexGroupTest(),
				parse: function () {
					return _parse(cx, t);
				} });
		} else {
			_privateUUtil.log('Expression tree size: ' + treeSize(e, function (_) {
				return _ instanceof _Expression2;
			}).size + '.');
			_privateUUtil.log('ES AST size: ' + treeSize(ast, function (_) {
				return _ instanceof _esastDistAst.Node;
			}) + '.');
			_privateUUtil.log('Output size: ' + code.length + ' characters.');
			_privateUUtil.log('==>\n' + code);
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

//verify: () => verify(cx, e),
//transpile: () => transpile(cx, e, vr),
//render: () => render(cx, ast)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBVkwsY0FBYyxDQVVNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxRQUFPLElBQUksQ0FBQyxDQUFBOztBQUV2QixRQUFNLENBQUMsR0FBRyxLQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFekIsUUFBTSxDQUFDLEdBQUcsT0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXRCLFFBQU0sRUFBRSxHQUFHLFFBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV4QixRQUFNLEdBQUcsR0FBRyxXQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7OztnQkFFZixTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1FBQXhCLElBQUksV0FBSixJQUFJOztBQUVa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QUFBLEtBRXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNiLENBQUMsQ0FBQTtJQUNGLE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgvbGV4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcml2YXRlL1UvdXRpbCdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGluY2x1ZGVQZXJmVGVzdCA9PiB7XG5cdGdsb2JhbC5ERUJVRyA9IHRydWVcblxuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSBPcHRzRnJvbU9iamVjdCh7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lOiBmYWxzZSxcblx0XHRmb3JjZU5vbkxhenlNb2R1bGU6IHRydWUsXG5cdFx0dXNlU3RyaWN0OiBmYWxzZVxuXHR9KVxuXHRjb25zdCBjeCA9IG5ldyBDeChvcHRzKVxuXG5cdGNvbnN0IHQgPSBsZXgoY3gsIHNvdXJjZSlcblx0Ly8gbG9nKGA9PT5cXG4ke3R9YClcblx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHQvLyBsb2coYD09PlxcbiR7ZX1gKVxuXHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0Ly8gbG9nKGArKytcXG4ke3ZyfSlcblx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0Ly8gbG9nKGA9PT5cXG4ke2FzdH1gKVxuXHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjeCwgYXN0KVxuXG5cdGN4Lndhcm5pbmdzLmZvckVhY2godyA9PiBjb25zb2xlLmxvZyh3KSlcblxuXHRpZiAoaW5jbHVkZVBlcmZUZXN0KSB7XG5cdFx0Ly8gQmVuY2htYXJrIGhhcyBwcm9ibGVtcyBpZiBJIGRvbid0IHB1dCB0aGVzZSBpbiBnbG9iYWwgdmFyaWFibGVzLi4uXG5cdFx0Z2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QgPSAoKSA9PlxuXHRcdFx0bGV4VW5ncm91cGVkKGN4LCBzb3VyY2UpXG5cdFx0Y29uc3QgdFVuZ3JvdXBlZCA9IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KClcblx0XHRnbG9iYWwubGV4R3JvdXBUZXN0ID0gKCkgPT5cblx0XHRcdGxleEdyb3VwKGN4LCB0VW5ncm91cGVkKVxuXG5cdFx0YmVuY2htYXJrKHtcblx0XHRcdC8vbGV4VW5ncm91cGVkOiAoKSA9PiBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpLFxuXHRcdFx0Ly9sZXhHcm91cDogKCkgPT4gZ2xvYmFsLmxleEdyb3VwVGVzdCgpLFxuXHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHRcdC8vdmVyaWZ5OiAoKSA9PiB2ZXJpZnkoY3gsIGUpLFxuXHRcdFx0Ly90cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjeCwgZSwgdnIpLFxuXHRcdFx0Ly9yZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KVxuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0bG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdGxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKX0uYClcblx0XHRsb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0bG9nKGA9PT5cXG4ke2NvZGV9YClcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==