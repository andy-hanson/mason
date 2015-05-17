if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', './util'], function (exports, module, _util) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	/*
 Opts object
 mandatory:
 	inFile: String
 		path to input file.
 		Optional if not includeSourceMap.
 
 optional:
 	checks: Boolean
 		Whether to include assertions.
 		Call also be { use, type, inout, case } for specific types of assertions.
 	includeSourceMap: Boolean
 	useStrict: Boolean
 */

	let CompileOptions = (function () {
		function CompileOptions(_ref) {
			var _this = this;

			var _ref2 = _ref;
			let opts = _ref2 === undefined ? {} : _ref2;

			_classCallCheck(this, CompileOptions);

			(0, _util.type)(opts, Object);

			const defaultTo = function (name, _default) {
				const _ = opts[name];
				if (_ === undefined) return _default;else {
					(0, _util.type)(_, _default.constructor);
					return _;
				}
			};

			const define = function (name, _default) {
				_this['_' + name] = defaultTo(name, _default);
			};

			const defaults = {
				includeAmdefine: true,
				includeSourceMap: true,
				includeModuleName: true,
				forceNonLazyModule: false,
				useStrict: true
			};

			Object.keys(defaults).forEach(function (_) {
				return define(_, defaults[_]);
			});

			this._inFile = opts.inFile;
			if (this._inFile === undefined) {
				if (this._includeSourceMap) throw new Error('Either supply `inFile` option or make `includeSourceMap` false.');
				if (this._includeModuleName) throw new Error('Either supply `inFile` option or make `includeModuleName` false.');
			}

			const checks = opts.checks || true;
			const checkSubs = ['use', 'type', 'inout', 'case'];
			this._check = {};
			if (typeof checks === 'boolean') checkSubs.forEach(function (_) {
				return _this._check[_] = checks;
			});else {
				(0, _util.type)(checks, Object);
				checkSubs.forEach(function (_) {
					(0, _util.type)(checks[_], Boolean);
					_this._check[_] = checks[_];
				});
			}
		}

		_createClass(CompileOptions, [{
			key: 'moduleName',
			value: function moduleName() {
				return noExt(basename(this._inFile));
			}
		}, {
			key: 'jsBaseName',
			value: function jsBaseName() {
				return '' + this.moduleName() + '.js';
			}
		}, {
			key: 'modulePath',
			value: function modulePath() {
				return this._inFile;
			}
		}, {
			key: 'includeUseChecks',
			value: function includeUseChecks() {
				return this._check.use;
			}
		}, {
			key: 'includeTypeChecks',
			value: function includeTypeChecks() {
				return this._check.type;
			}
		}, {
			key: 'includeInoutChecks',
			value: function includeInoutChecks() {
				return this._check.inout;
			}
		}, {
			key: 'includeCaseChecks',
			value: function includeCaseChecks() {
				return this._check.case;
			}
		}, {
			key: 'includeAmdefine',
			value: function includeAmdefine() {
				return this._includeAmdefine;
			}
		}, {
			key: 'includeSourceMap',
			value: function includeSourceMap() {
				return this._includeSourceMap;
			}
		}, {
			key: 'includeModuleName',
			value: function includeModuleName() {
				return this._includeModuleName;
			}
		}, {
			key: 'includeUseStrict',
			value: function includeUseStrict() {
				return this._useStrict;
			}
		}, {
			key: 'lazyModule',
			value: function lazyModule() {
				return !this._forceNonLazyModule;
			}
		}]);

		return CompileOptions;
	})();

	module.exports = CompileOptions;

	const basename = function (path) {
		return (0, _util.last)(path.split('/'));
	},
	      extname = function (path) {
		return (0, _util.last)(path.split('.'));
	},
	      noExt = function (path) {
		return (
			// - 1 for the '.'
			path.substring(0, path.length - 1 - extname(path).length)
		);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVPcHRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQnFCLGNBQWM7QUFDdkIsV0FEUyxjQUFjLENBQ3RCLElBQVUsRUFBRTs7O2VBQVosSUFBVTtPQUFWLElBQUkseUJBQUcsRUFBRzs7eUJBREYsY0FBYzs7QUFFakMsYUFsQmEsSUFBSSxFQWtCWixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRWxCLFNBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNyQyxVQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsUUFBSSxDQUFDLEtBQUssU0FBUyxFQUNsQixPQUFPLFFBQVEsQ0FBQSxLQUNYO0FBQ0osZUF6QlcsSUFBSSxFQXlCVixDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzdCLFlBQU8sQ0FBQyxDQUFBO0tBQ1I7SUFDRCxDQUFBOztBQUVELFNBQU0sTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNsQyxnQkFBUyxJQUFJLENBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzVDLENBQUE7O0FBRUQsU0FBTSxRQUFRLEdBQUc7QUFDaEIsbUJBQWUsRUFBRSxJQUFJO0FBQ3JCLG9CQUFnQixFQUFFLElBQUk7QUFDdEIscUJBQWlCLEVBQUUsSUFBSTtBQUN2QixzQkFBa0IsRUFBRSxLQUFLO0FBQ3pCLGFBQVMsRUFBRSxJQUFJO0lBQ2YsQ0FBQTs7QUFFRCxTQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7V0FBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFMUQsT0FBSSxDQUFDLE9BQU8sR0FB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dGUvQ29tcGlsZU9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsYXN0LCB0eXBlIH0gZnJvbSAnLi91dGlsJ1xuXG4vKlxuT3B0cyBvYmplY3Rcbm1hbmRhdG9yeTpcblx0aW5GaWxlOiBTdHJpbmdcblx0XHRwYXRoIHRvIGlucHV0IGZpbGUuXG5cdFx0T3B0aW9uYWwgaWYgbm90IGluY2x1ZGVTb3VyY2VNYXAuXG5cbm9wdGlvbmFsOlxuXHRjaGVja3M6IEJvb2xlYW5cblx0XHRXaGV0aGVyIHRvIGluY2x1ZGUgYXNzZXJ0aW9ucy5cblx0XHRDYWxsIGFsc28gYmUgeyB1c2UsIHR5cGUsIGlub3V0LCBjYXNlIH0gZm9yIHNwZWNpZmljIHR5cGVzIG9mIGFzc2VydGlvbnMuXG5cdGluY2x1ZGVTb3VyY2VNYXA6IEJvb2xlYW5cblx0dXNlU3RyaWN0OiBCb29sZWFuXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGlsZU9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0geyB9KSB7XG5cdFx0dHlwZShvcHRzLCBPYmplY3QpXG5cblx0XHRjb25zdCBkZWZhdWx0VG8gPSAobmFtZSwgX2RlZmF1bHQpID0+IHtcblx0XHRcdGNvbnN0IF8gPSBvcHRzW25hbWVdXG5cdFx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRyZXR1cm4gX2RlZmF1bHRcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0eXBlKF8sIF9kZWZhdWx0LmNvbnN0cnVjdG9yKVxuXHRcdFx0XHRyZXR1cm4gX1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGRlZmluZSA9IChuYW1lLCBfZGVmYXVsdCkgPT4ge1xuXHRcdFx0dGhpc1tgXyR7bmFtZX1gXSA9IGRlZmF1bHRUbyhuYW1lLCBfZGVmYXVsdClcblx0XHR9XG5cblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGluY2x1ZGVBbWRlZmluZTogdHJ1ZSxcblx0XHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0XHRpbmNsdWRlTW9kdWxlTmFtZTogdHJ1ZSxcblx0XHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogZmFsc2UsXG5cdFx0XHR1c2VTdHJpY3Q6IHRydWVcblx0XHR9XG5cblx0XHRPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChfID0+IGRlZmluZShfLCBkZWZhdWx0c1tfXSkpXG5cblx0XHR0aGlzLl9pbkZpbGUgPSBvcHRzLmluRmlsZVxuXHRcdGlmICh0aGlzLl9pbkZpbGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aWYgKHRoaXMuX2luY2x1ZGVTb3VyY2VNYXApXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRWl0aGVyIHN1cHBseSBgaW5GaWxlYCBvcHRpb24gb3IgbWFrZSBgaW5jbHVkZVNvdXJjZU1hcGAgZmFsc2UuJylcblx0XHRcdGlmICh0aGlzLl9pbmNsdWRlTW9kdWxlTmFtZSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgc3VwcGx5IGBpbkZpbGVgIG9wdGlvbiBvciBtYWtlIGBpbmNsdWRlTW9kdWxlTmFtZWAgZmFsc2UuJylcblx0XHR9XG5cblx0XHRjb25zdCBjaGVja3MgPSBvcHRzLmNoZWNrcyB8fCB0cnVlXG5cdFx0Y29uc3QgY2hlY2tTdWJzID0gWyAndXNlJywgJ3R5cGUnLCAnaW5vdXQnLCAnY2FzZScgXVxuXHRcdHRoaXMuX2NoZWNrID0geyB9XG5cdFx0aWYgKHR5cGVvZiBjaGVja3MgPT09ICdib29sZWFuJylcblx0XHRcdGNoZWNrU3Vicy5mb3JFYWNoKF8gPT4gdGhpcy5fY2hlY2tbX10gPSBjaGVja3MpXG5cdFx0ZWxzZSB7XG5cdFx0XHR0eXBlKGNoZWNrcywgT2JqZWN0KVxuXHRcdFx0Y2hlY2tTdWJzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdHR5cGUoY2hlY2tzW19dLCBCb29sZWFuKVxuXHRcdFx0XHR0aGlzLl9jaGVja1tfXSA9IGNoZWNrc1tfXVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRtb2R1bGVOYW1lKCkgeyByZXR1cm4gbm9FeHQoYmFzZW5hbWUodGhpcy5faW5GaWxlKSkgfVxuXHRqc0Jhc2VOYW1lKCkgeyByZXR1cm4gYCR7dGhpcy5tb2R1bGVOYW1lKCl9LmpzYCB9XG5cdG1vZHVsZVBhdGgoKSB7IHJldHVybiB0aGlzLl9pbkZpbGUgfVxuXG5cdGluY2x1ZGVVc2VDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjay51c2UgfVxuXHRpbmNsdWRlVHlwZUNoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrLnR5cGUgfVxuXHRpbmNsdWRlSW5vdXRDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjay5pbm91dCB9XG5cdGluY2x1ZGVDYXNlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2suY2FzZSB9XG5cblx0aW5jbHVkZUFtZGVmaW5lKCkgeyByZXR1cm4gdGhpcy5faW5jbHVkZUFtZGVmaW5lIH1cblx0aW5jbHVkZVNvdXJjZU1hcCgpIHsgcmV0dXJuIHRoaXMuX2luY2x1ZGVTb3VyY2VNYXAgfVxuXHRpbmNsdWRlTW9kdWxlTmFtZSgpIHsgcmV0dXJuIHRoaXMuX2luY2x1ZGVNb2R1bGVOYW1lIH1cblx0aW5jbHVkZVVzZVN0cmljdCgpIHsgcmV0dXJuIHRoaXMuX3VzZVN0cmljdCB9XG5cblx0bGF6eU1vZHVsZSgpIHsgcmV0dXJuICF0aGlzLl9mb3JjZU5vbkxhenlNb2R1bGUgfVxufVxuXG5jb25zdFxuXHRiYXNlbmFtZSA9IHBhdGggPT5cblx0XHRsYXN0KHBhdGguc3BsaXQoJy8nKSksXG5cdGV4dG5hbWUgPSBwYXRoID0+XG5cdFx0bGFzdChwYXRoLnNwbGl0KCcuJykpLFxuXHRub0V4dCA9IHBhdGggPT5cblx0XHQvLyAtIDEgZm9yIHRoZSAnLidcblx0XHRwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxlbmd0aCAtIDEgLSBleHRuYW1lKHBhdGgpLmxlbmd0aClcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9