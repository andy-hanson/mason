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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sT0FDTixJQUFJLEdBQUc7U0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDO0VBQUE7T0FDMUIsUUFBUSxHQUFHO1NBQU0sTUFBTSxDQUFDLElBQUksQ0FBQztFQUFBLENBQUE7O1NBRDdCLElBQUksR0FBSixJQUFJO1NBQ0osUUFBUSxHQUFSLFFBQVE7QUFFVCxPQUFNLE1BQU0sR0FBRyxVQUFBLGVBQWUsRUFBSTtBQUNqQyxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTs7QUFFbkIsUUFBTSxNQUFNLEdBQUcsS0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZELFFBQU0sSUFBSSxHQUFHLGFBVkwsY0FBYyxDQVVNO0FBQzNCLFNBQU0sRUFBRSxjQUFjO0dBQ3RCLENBQUMsQ0FBQTtBQUNGLFFBQU0sRUFBRSxHQUFHLFFBQU8sSUFBSSxDQUFDLENBQUE7O0FBRXZCLFFBQU0sQ0FBQyxHQUFHLEtBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUV6QixRQUFNLENBQUMsR0FBRyxPQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdEIsUUFBTSxFQUFFLEdBQUcsUUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXhCLFFBQU0sR0FBRyxHQUFHLFdBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTs7O2dCQUVmLFNBQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQzs7UUFBeEIsSUFBSSxXQUFKLElBQUk7O0FBRVosTUFBSSxlQUFlLEVBQUU7O0FBRXBCLFNBQU0sQ0FBQyxnQkFBZ0IsR0FBRztXQUN6QixjQUFhLEVBQUUsRUFBRSxNQUFNLENBQUM7SUFBQSxDQUFBO0FBQ3pCLFNBQU0sVUFBVSxHQUFHLE1BQU0s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WUFBWSxLQUFLLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUEsS0FFcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2IsQ0FBQyxDQUFBO0lBQ0YsTUFDQSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQTtHQUN2QixDQUFBO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ1gsU0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQTtFQUN0QyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9ub2RlLW9ubHkvdGVzdC1jb21waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VpdGUgfSBmcm9tICdiZW5jaG1hcmsnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJ1xuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCBDeCBmcm9tICcuLi9wcml2YXRlL0N4J1xuaW1wb3J0IGxleCBmcm9tICcuLi9wcml2YXRlL2xleC9sZXgnXG5pbXBvcnQgbGV4VW5ncm91cGVkIGZyb20gJy4uL3ByaXZhdGUvbGV4L3VuZ3JvdXBlZCdcbmltcG9ydCBsZXhHcm91cCBmcm9tICcuLi9wcml2YXRlL2xleC9ncm91cCdcbmltcG9ydCBwYXJzZSBmcm9tICcuLi9wcml2YXRlL3BhcnNlJ1xuaW1wb3J0IHJlbmRlciBmcm9tICcuLi9wcml2YXRlL3JlbmRlcidcbmltcG9ydCB0cmFuc3BpbGUgZnJvbSAnLi4vcHJpdmF0ZS90cmFuc3BpbGUvdHJhbnNwaWxlJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuLi9wcml2YXRlL3ZlcmlmeSdcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3ByaXZhdGUvVS91dGlsJ1xuaW1wb3J0IHsgT3B0c0Zyb21PYmplY3QgfSBmcm9tICcuLi9wcml2YXRlL09wdHMnXG5cbmV4cG9ydCBjb25zdFxuXHR0ZXN0ID0gKCkgPT4gZG9UZXN0KGZhbHNlKSxcblx0cGVyZlRlc3QgPSAoKSA9PiBkb1Rlc3QodHJ1ZSlcblxuY29uc3QgZG9UZXN0ID0gaW5jbHVkZVBlcmZUZXN0ID0+IHtcblx0Z2xvYmFsLkRFQlVHID0gdHJ1ZVxuXG5cdGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYygnLi9tcy10ZXN0Lm1zJywgJ3V0Zi04Jylcblx0Y29uc3Qgb3B0cyA9IE9wdHNGcm9tT2JqZWN0KHtcblx0XHRpbkZpbGU6ICcuL21zLXRlc3QubXMnXG5cdH0pXG5cdGNvbnN0IGN4ID0gbmV3IEN4KG9wdHMpXG5cblx0Y29uc3QgdCA9IGxleChjeCwgc291cmNlKVxuXHQvLyBsb2coYD09PlxcbiR7dH1gKVxuXHRjb25zdCBlID0gcGFyc2UoY3gsIHQpXG5cdC8vIGxvZyhgPT0+XFxuJHtlfWApXG5cdGNvbnN0IHZyID0gdmVyaWZ5KGN4LCBlKVxuXHQvLyBsb2coYCsrK1xcbiR7dnJ9KVxuXHRjb25zdCBhc3QgPSB0cmFuc3BpbGUoY3gsIGUsIHZyKVxuXHQvLyBsb2coYD09PlxcbiR7YXN0fWApXG5cdGNvbnN0IHsgY29kZSB9ID0gcmVuZGVyKGN4LCBhc3QpXG5cblx0aWYgKGluY2x1ZGVQZXJmVGVzdCkge1xuXHRcdC8vIEJlbmNobWFyayBoYXMgcHJvYmxlbXMgaWYgSSBkb24ndCBwdXQgdGhlc2UgaW4gZ2xvYmFsIHZhcmlhYmxlcy4uLlxuXHRcdGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0ID0gKCkgPT5cblx0XHRcdGxleFVuZ3JvdXBlZChjeCwgc291cmNlKVxuXHRcdGNvbnN0IHRVbmdyb3VwZWQgPSBnbG9iYWwubGV4VW5ncm91cGVkVGVzdCgpXG5cdFx0Z2xvYmFsLmxleEdyb3VwVGVzdCA9ICgpID0+XG5cdFx0XHRsZXhHcm91cChjeCwgdFVuZ3JvdXBlZClcblxuXHRcdGJlbmNobWFyayh7XG5cdFx0XHRsZXhVbmdyb3VwZWQ6ICgpID0+IGdsb2JhbC5sZXhVbmdyb3VwZWRUZXN0KCksXG5cdFx0XHRsZXhHcm91cDogKCkgPT4gZ2xvYmFsLmxleEdyb3VwVGVzdCgpLFxuXHRcdFx0cGFyc2U6ICgpID0+IHBhcnNlKGN4LCB0KSxcblx0XHRcdHZlcmlmeTogKCkgPT4gdmVyaWZ5KGN4LCBlKSxcblx0XHRcdHRyYW5zcGlsZTogKCkgPT4gdHJhbnNwaWxlKGN4LCBlLCB2ciksXG5cdFx0XHRyZW5kZXI6ICgpID0+IHJlbmRlcihjeCwgYXN0KVxuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0bG9nKGBFeHByZXNzaW9uIHRyZWUgc2l6ZTogJHt0cmVlU2l6ZShlLCBfID0+IF8gaW5zdGFuY2VvZiBFeHByZXNzaW9uKS5zaXplfS5gKVxuXHRcdGxvZyhgRVMgQVNUIHNpemU6ICR7dHJlZVNpemUoYXN0LCBfID0+IF8gaW5zdGFuY2VvZiBOb2RlKX0uYClcblx0XHRsb2coYE91dHB1dCBzaXplOiAke2NvZGUubGVuZ3RofSBjaGFyYWN0ZXJzLmApXG5cdFx0bG9nKGA9PT5cXG4ke2NvZGV9YClcblx0fVxufVxuXG5jb25zdFxuXHRiZW5jaG1hcmsgPSB0ZXN0cyA9PiB7XG5cdFx0Y29uc3Qgc3VpdGUgPSBuZXcgU3VpdGUoKVxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKG5hbWUgPT5cblx0XHRcdHN1aXRlLmFkZChuYW1lLCB0ZXN0c1tuYW1lXSkpXG5cdFx0c3VpdGUub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdGNvbnN0IG1zID0gbnVtZXJhbChfLnN0YXRzLm1lYW4gKiAxMDAwKS5mb3JtYXQoJzAuMDAnKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhgJHtfLm5hbWV9OiAke21zfW1zYClcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRzdWl0ZS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdFx0dGhyb3cgZXJyLnRhcmdldC5lcnJvclxuXHRcdH0pXG5cdFx0c3VpdGUucnVuKClcblx0fSxcblxuXHR0cmVlU2l6ZSA9ICh0cmVlLCBjb25kKSA9PiB7XG5cdFx0Y29uc3QgdmlzaXRlZCA9IG5ldyBTZXQoKVxuXHRcdGxldCBuTGVhdmVzID0gMFxuXHRcdGNvbnN0IHZpc2l0ID0gbm9kZSA9PiB7XG5cdFx0XHRpZiAobm9kZSAhPSBudWxsICYmICF2aXNpdGVkLmhhcyhub2RlKSlcblx0XHRcdFx0aWYgKGNvbmQobm9kZSkpIHtcblx0XHRcdFx0XHR2aXNpdGVkLmFkZChub2RlKVxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5vZGUpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZCA9IG5vZGVbbmFtZV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdFx0XHRjaGlsZC5mb3JFYWNoKHZpc2l0KVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR2aXNpdChjaGlsZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuTGVhdmVzID0gbkxlYXZlcyArIDFcblx0XHR9XG5cdFx0dmlzaXQodHJlZSlcblx0XHRyZXR1cm4geyBzaXplOiB2aXNpdGVkLnNpemUsIG5MZWF2ZXMgfVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==