if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/U/util', '../private/Opts'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParseParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateUUtil, _privateOpts) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBVkwsY0FBYyxDQVVNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxRQUFPLElBQUksQ0FBQyxDQUFBOztBQUV2QixRQUFNLENBQUMsR0FBRyxLQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFekIsUUFBTSxDQUFDLEdBQUcsT0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXRCLFFBQU0sRUFBRSxHQUFHLFFBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV4QixRQUFNLEdBQUcsR0FBRyxXQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7OztnQkFFZixTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1FBQXhCLElBQUksV0FBSixJQUFJOztBQUVa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QUMsRUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDaEQsV0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFNBQUksS0FBSyxZQUFZLEtBQUssRUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUVwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDYixDQUFDLENBQUE7SUFDRixNQUNBLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFBO0dBQ3ZCLENBQUE7QUFDRCxPQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDWCxTQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFBO0VBQ3RDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL25vZGUtb25seS90ZXN0LWNvbXBpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWl0ZSB9IGZyb20gJ2JlbmNobWFyaydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICdlc2FzdC9kaXN0L2FzdCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IEN4IGZyb20gJy4uL3ByaXZhdGUvQ3gnXG5pbXBvcnQgbGV4IGZyb20gJy4uL3ByaXZhdGUvbGV4L2xleCdcbmltcG9ydCBsZXhVbmdyb3VwZWQgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvdW5ncm91cGVkJ1xuaW1wb3J0IGxleEdyb3VwIGZyb20gJy4uL3ByaXZhdGUvbGV4L2dyb3VwJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4uL3ByaXZhdGUvcGFyc2UvcGFyc2UnXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4uL3ByaXZhdGUvcmVuZGVyJ1xuaW1wb3J0IHRyYW5zcGlsZSBmcm9tICcuLi9wcml2YXRlL3RyYW5zcGlsZS90cmFuc3BpbGUnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4uL3ByaXZhdGUvdmVyaWZ5J1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vcHJpdmF0ZS9VL3V0aWwnXG5pbXBvcnQgeyBPcHRzRnJvbU9iamVjdCB9IGZyb20gJy4uL3ByaXZhdGUvT3B0cydcblxuZXhwb3J0IGNvbnN0XG5cdHRlc3QgPSAoKSA9PiBkb1Rlc3QoZmFsc2UpLFxuXHRwZXJmVGVzdCA9ICgpID0+IGRvVGVzdCh0cnVlKVxuXG5jb25zdCBkb1Rlc3QgPSBpbmNsdWRlUGVyZlRlc3QgPT4ge1xuXHRnbG9iYWwuREVCVUcgPSB0cnVlXG5cblx0Y29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKCcuL21zLXRlc3QubXMnLCAndXRmLTgnKVxuXHRjb25zdCBvcHRzID0gT3B0c0Zyb21PYmplY3Qoe1xuXHRcdGluRmlsZTogJy4vbXMtdGVzdC5tcycsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiBmYWxzZSxcblx0XHRpbmNsdWRlU291cmNlTWFwOiB0cnVlLFxuXHRcdGluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZTogZmFsc2UsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiB0cnVlLFxuXHRcdHVzZVN0cmljdDogZmFsc2Vcblx0fSlcblx0Y29uc3QgY3ggPSBuZXcgQ3gob3B0cylcblxuXHRjb25zdCB0ID0gbGV4KGN4LCBzb3VyY2UpXG5cdC8vIGxvZyhgPT0+XFxuJHt0fWApXG5cdGNvbnN0IGUgPSBwYXJzZShjeCwgdClcblx0Ly8gbG9nKGA9PT5cXG4ke2V9YClcblx0Y29uc3QgdnIgPSB2ZXJpZnkoY3gsIGUpXG5cdC8vIGxvZyhgKysrXFxuJHt2cn0pXG5cdGNvbnN0IGFzdCA9IHRyYW5zcGlsZShjeCwgZSwgdnIpXG5cdC8vIGxvZyhgPT0+XFxuJHthc3R9YClcblx0Y29uc3QgeyBjb2RlIH0gPSByZW5kZXIoY3gsIGFzdClcblxuXHRjeC53YXJuaW5ncy5mb3JFYWNoKHcgPT4gY29uc29sZS5sb2codykpXG5cblx0aWYgKGluY2x1ZGVQZXJmVGVzdCkge1xuXHRcdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRcdGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0ID0gKCkgPT5cblx0XHRcdGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdFx0Z2xvYmFsLmxleEdyb3VwVGVzdCA9ICgpID0+XG5cdFx0XHRsZXhHcm91cChjeCwgdFVuZ3JvdXBlZClcblxuXHRcdGJlbmNobWFyayh7XG5cdFx0XHRsZXhVbmdyb3VwZWQ6ICgpID0+IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KCksXG5cdFx0XHRsZXhHcm91cDogKCkgPT4gZ2xvYmFsLmxleEdyb3VwVGVzdCgpLFxuXHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHRcdHZlcmlmeTogKCkgPT4gdmVyaWZ5KGN4LCBlKSxcblx0XHRcdHRyYW5zcGlsZTogKCkgPT4gdHJhbnNwaWxlKGN4LCBlLCB2ciksXG5cdFx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KVxuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0bG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdGxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKX0uYClcblx0XHRsb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0bG9nKGA9PT5cXG4ke2NvZGV9YClcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==