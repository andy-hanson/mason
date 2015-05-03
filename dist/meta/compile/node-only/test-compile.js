if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'benchmark', 'esast/dist/ast', 'fs', 'numeral', '../Expression', '../private/Cx', '../private/lex/lex', '../private/lex/ungrouped', '../private/lex/group', '../private/parse', '../private/render', '../private/transpile/transpile', '../private/verify', '../private/U/util', '../private/Opts'], function (exports, _benchmark, _esastDistAst, _fs, _numeral, _Expression, _privateCx, _privateLexLex, _privateLexUngrouped, _privateLexGroup, _privateParse, _privateRender, _privateTranspileTranspile, _privateVerify, _privateUUtil, _privateOpts) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBVkwsY0FBYyxDQVVNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0FBQ3RCLGtCQUFlLEVBQUUsS0FBSztBQUN0QixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLEtBQUs7QUFDL0IscUJBQWtCLEVBQUUsSUFBSTtBQUN4QixZQUFTLEVBQUUsS0FBSztHQUNoQixDQUFDLENBQUE7QUFDRixRQUFNLEVBQUUsR0FBRyxRQUFPLElBQUksQ0FBQyxDQUFBOztBQUV2QixRQUFNLENBQUMsR0FBRyxLQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTs7QUFFekIsUUFBTSxDQUFDLEdBQUcsT0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXRCLFFBQU0sRUFBRSxHQUFHLFFBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBOztBQUV4QixRQUFNLEdBQUcsR0FBRyxXQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7OztnQkFFZixTQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O1FBQXhCLElBQUksV0FBSixJQUFJOztBQUVa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QUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNoRCxXQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEIsU0FBSSxLQUFLLFlBQVksS0FBSyxFQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLEtBRXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNiLENBQUMsQ0FBQTtJQUNGLE1BQ0EsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUE7R0FDdkIsQ0FBQTtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFNBQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUE7RUFDdEMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L3Rlc3QtY29tcGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1aXRlIH0gZnJvbSAnYmVuY2htYXJrJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2VzYXN0L2Rpc3QvYXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCdcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgQ3ggZnJvbSAnLi4vcHJpdmF0ZS9DeCdcbmltcG9ydCBsZXggZnJvbSAnLi4vcHJpdmF0ZS9sZXgvbGV4J1xuaW1wb3J0IGxleFVuZ3JvdXBlZCBmcm9tICcuLi9wcml2YXRlL2xleC91bmdyb3VwZWQnXG5pbXBvcnQgbGV4R3JvdXAgZnJvbSAnLi4vcHJpdmF0ZS9sZXgvZ3JvdXAnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi4vcHJpdmF0ZS9wYXJzZSdcbmltcG9ydCByZW5kZXIgZnJvbSAnLi4vcHJpdmF0ZS9yZW5kZXInXG5pbXBvcnQgdHJhbnNwaWxlIGZyb20gJy4uL3ByaXZhdGUvdHJhbnNwaWxlL3RyYW5zcGlsZSdcbmltcG9ydCB2ZXJpZnkgZnJvbSAnLi4vcHJpdmF0ZS92ZXJpZnknXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcml2YXRlL1UvdXRpbCdcbmltcG9ydCB7IE9wdHNGcm9tT2JqZWN0IH0gZnJvbSAnLi4vcHJpdmF0ZS9PcHRzJ1xuXG5leHBvcnQgY29uc3Rcblx0dGVzdCA9ICgpID0+IGRvVGVzdChmYWxzZSksXG5cdHBlcmZUZXN0ID0gKCkgPT4gZG9UZXN0KHRydWUpXG5cbmNvbnN0IGRvVGVzdCA9IGluY2x1ZGVQZXJmVGVzdCA9PiB7XG5cdGdsb2JhbC5ERUJVRyA9IHRydWVcblxuXHRjb25zdCBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoJy4vbXMtdGVzdC5tcycsICd1dGYtOCcpXG5cdGNvbnN0IG9wdHMgPSBPcHRzRnJvbU9iamVjdCh7XG5cdFx0aW5GaWxlOiAnLi9tcy10ZXN0Lm1zJyxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IGZhbHNlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lOiBmYWxzZSxcblx0XHRmb3JjZU5vbkxhenlNb2R1bGU6IHRydWUsXG5cdFx0dXNlU3RyaWN0OiBmYWxzZVxuXHR9KVxuXHRjb25zdCBjeCA9IG5ldyBDeChvcHRzKVxuXG5cdGNvbnN0IHQgPSBsZXgoY3gsIHNvdXJjZSlcblx0Ly8gbG9nKGA9PT5cXG4ke3R9YClcblx0Y29uc3QgZSA9IHBhcnNlKGN4LCB0KVxuXHQvLyBsb2coYD09PlxcbiR7ZX1gKVxuXHRjb25zdCB2ciA9IHZlcmlmeShjeCwgZSlcblx0Ly8gbG9nKGArKytcXG4ke3ZyfSlcblx0Y29uc3QgYXN0ID0gdHJhbnNwaWxlKGN4LCBlLCB2cilcblx0Ly8gbG9nKGA9PT5cXG4ke2FzdH1gKVxuXHRjb25zdCB7IGNvZGUgfSA9IHJlbmRlcihjeCwgYXN0KVxuXG5cdGlmIChpbmNsdWRlUGVyZlRlc3QpIHtcblx0XHQvLyBCZW5jaG1hcmsgaGFzIHByb2JsZW1zIGlmIEkgZG9uJ3QgcHV0IHRoZXNlIGluIGdsb2JhbCB2YXJpYWJsZXMuLi5cblx0XHRnbG9iYWwubGV4VW5ncm91cGVkVGVzdCA9ICgpID0+XG5cdFx0XHRsZXhVbmdyb3VwZWQoY3gsIHNvdXJjZSlcblx0XHRjb25zdCB0VW5ncm91cGVkID0gZ2xvYmFsLmxleFVuZ3JvdXBlZFRlc3QoKVxuXHRcdGdsb2JhbC5sZXhHcm91cFRlc3QgPSAoKSA9PlxuXHRcdFx0bGV4R3JvdXAoY3gsIHRVbmdyb3VwZWQpXG5cblx0XHRiZW5jaG1hcmsoe1xuXHRcdFx0bGV4VW5ncm91cGVkOiAoKSA9PiBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpLFxuXHRcdFx0bGV4R3JvdXA6ICgpID0+IGdsb2JhbC5sZXhHcm91cFRlc3QoKSxcblx0XHRcdHBhcnNlOiAoKSA9PiBwYXJzZShjeCwgdCksXG5cdFx0XHR2ZXJpZnk6ICgpID0+IHZlcmlmeShjeCwgZSksXG5cdFx0XHR0cmFuc3BpbGU6ICgpID0+IHRyYW5zcGlsZShjeCwgZSwgdnIpLFxuXHRcdFx0cmVuZGVyOiAoKSA9PiByZW5kZXIoY3gsIGFzdClcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdGxvZyhgRXhwcmVzc2lvbiB0cmVlIHNpemU6ICR7dHJlZVNpemUoZSwgXyA9PiBfIGluc3RhbmNlb2YgRXhwcmVzc2lvbikuc2l6ZX0uYClcblx0XHRsb2coYEVTIEFTVCBzaXplOiAke3RyZWVTaXplKGFzdCwgXyA9PiBfIGluc3RhbmNlb2YgTm9kZSl9LmApXG5cdFx0bG9nKGBPdXRwdXQgc2l6ZTogJHtjb2RlLmxlbmd0aH0gY2hhcmFjdGVycy5gKVxuXHRcdGxvZyhgPT0+XFxuJHtjb2RlfWApXG5cdH1cbn1cblxuY29uc3Rcblx0YmVuY2htYXJrID0gdGVzdHMgPT4ge1xuXHRcdGNvbnN0IHN1aXRlID0gbmV3IFN1aXRlKClcblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChuYW1lID0+XG5cdFx0XHRzdWl0ZS5hZGQobmFtZSwgdGVzdHNbbmFtZV0pKVxuXHRcdHN1aXRlLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRjb25zdCBtcyA9IG51bWVyYWwoXy5zdGF0cy5tZWFuICogMTAwMCkuZm9ybWF0KCcwLjAwJylcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7Xy5uYW1lfTogJHttc31tc2ApXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0c3VpdGUub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRcdHRocm93IGVyci50YXJnZXQuZXJyb3Jcblx0XHR9KVxuXHRcdHN1aXRlLnJ1bigpXG5cdH0sXG5cblx0dHJlZVNpemUgPSAodHJlZSwgY29uZCkgPT4ge1xuXHRcdGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KClcblx0XHRsZXQgbkxlYXZlcyA9IDBcblx0XHRjb25zdCB2aXNpdCA9IG5vZGUgPT4ge1xuXHRcdFx0aWYgKG5vZGUgIT0gbnVsbCAmJiAhdmlzaXRlZC5oYXMobm9kZSkpXG5cdFx0XHRcdGlmIChjb25kKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmlzaXRlZC5hZGQobm9kZSlcblx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhub2RlKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2hpbGQgPSBub2RlW25hbWVdXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRcdFx0Y2hpbGQuZm9yRWFjaCh2aXNpdClcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dmlzaXQoY2hpbGQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bkxlYXZlcyA9IG5MZWF2ZXMgKyAxXG5cdFx0fVxuXHRcdHZpc2l0KHRyZWUpXG5cdFx0cmV0dXJuIHsgc2l6ZTogdmlzaXRlZC5zaXplLCBuTGVhdmVzIH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=