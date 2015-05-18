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

			let checks = opts.checks;
			if (checks === undefined) checks = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVPcHRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQnFCLGNBQWM7QUFDdkIsV0FEUyxjQUFjLENBQ3RCLElBQVUsRUFBRTs7O2VBQVosSUFBVTtPQUFWLElBQUkseUJBQUcsRUFBRzs7eUJBREYsY0FBYzs7QUFFakMsYUFsQmEsSUFBSSxFQWtCWixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRWxCLFNBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNyQyxVQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsUUFBSSxDQUFDLEtBQUssU0FBUyxFQUNsQixPQUFPLFFBQVEsQ0FBQSxLQUNYO0FBQ0osZUF6QlcsSUFBSSxFQXlCVixDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzdCLFlBQU8sQ0FBQyxDQUFBO0tBQ1I7SUFDRCxDQUFBOztBQUVELFNBQU0sTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNsQyxnQkFBUyxJQUFJLENBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzVDLENBQUE7O0FBRUQsU0FBTSxRQUFRLEdBQUc7QUFDaEIsbUJBQWUsRUFBRSxJQUFJO0FBQ3JCLG9CQUFnQixFQUFFLElBQUk7QUFDdEIscUJBQWlCLEVBQUUsSUFBSTtBQUN2QixzQkFBa0IsRUFBRSxLQUFLO0FBQ3pCLGFBQVMsRUFBRSxJQUFJO0lBQ2YsQ0FBQTs7QUFFRCxTQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7V0FBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFMUQsT0FBSSxDQUFDLE9BQU8sR0FB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QUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9Db21waWxlT3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxhc3QsIHR5cGUgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG5PcHRzIG9iamVjdFxubWFuZGF0b3J5OlxuXHRpbkZpbGU6IFN0cmluZ1xuXHRcdHBhdGggdG8gaW5wdXQgZmlsZS5cblx0XHRPcHRpb25hbCBpZiBub3QgaW5jbHVkZVNvdXJjZU1hcC5cblxub3B0aW9uYWw6XG5cdGNoZWNrczogQm9vbGVhblxuXHRcdFdoZXRoZXIgdG8gaW5jbHVkZSBhc3NlcnRpb25zLlxuXHRcdENhbGwgYWxzbyBiZSB7IHVzZSwgdHlwZSwgaW5vdXQsIGNhc2UgfSBmb3Igc3BlY2lmaWMgdHlwZXMgb2YgYXNzZXJ0aW9ucy5cblx0aW5jbHVkZVNvdXJjZU1hcDogQm9vbGVhblxuXHR1c2VTdHJpY3Q6IEJvb2xlYW5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21waWxlT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKG9wdHMgPSB7IH0pIHtcblx0XHR0eXBlKG9wdHMsIE9iamVjdClcblxuXHRcdGNvbnN0IGRlZmF1bHRUbyA9IChuYW1lLCBfZGVmYXVsdCkgPT4ge1xuXHRcdFx0Y29uc3QgXyA9IG9wdHNbbmFtZV1cblx0XHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdHJldHVybiBfZGVmYXVsdFxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHR5cGUoXywgX2RlZmF1bHQuY29uc3RydWN0b3IpXG5cdFx0XHRcdHJldHVybiBfXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVmaW5lID0gKG5hbWUsIF9kZWZhdWx0KSA9PiB7XG5cdFx0XHR0aGlzW2BfJHtuYW1lfWBdID0gZGVmYXVsdFRvKG5hbWUsIF9kZWZhdWx0KVxuXHRcdH1cblxuXHRcdGNvbnN0IGRlZmF1bHRzID0ge1xuXHRcdFx0aW5jbHVkZUFtZGVmaW5lOiB0cnVlLFxuXHRcdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRcdGluY2x1ZGVNb2R1bGVOYW1lOiB0cnVlLFxuXHRcdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiBmYWxzZSxcblx0XHRcdHVzZVN0cmljdDogdHJ1ZVxuXHRcdH1cblxuXHRcdE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKF8gPT4gZGVmaW5lKF8sIGRlZmF1bHRzW19dKSlcblxuXHRcdHRoaXMuX2luRmlsZSA9IG9wdHMuaW5GaWxlXG5cdFx0aWYgKHRoaXMuX2luRmlsZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAodGhpcy5faW5jbHVkZVNvdXJjZU1hcClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgc3VwcGx5IGBpbkZpbGVgIG9wdGlvbiBvciBtYWtlIGBpbmNsdWRlU291cmNlTWFwYCBmYWxzZS4nKVxuXHRcdFx0aWYgKHRoaXMuX2luY2x1ZGVNb2R1bGVOYW1lKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBzdXBwbHkgYGluRmlsZWAgb3B0aW9uIG9yIG1ha2UgYGluY2x1ZGVNb2R1bGVOYW1lYCBmYWxzZS4nKVxuXHRcdH1cblxuXHRcdGxldCBjaGVja3MgPSBvcHRzLmNoZWNrc1xuXHRcdGlmIChjaGVja3MgPT09IHVuZGVmaW5lZClcblx0XHRcdGNoZWNrcyA9IHRydWVcblx0XHRjb25zdCBjaGVja1N1YnMgPSBbICd1c2UnLCAndHlwZScsICdpbm91dCcsICdjYXNlJyBdXG5cdFx0dGhpcy5fY2hlY2sgPSB7IH1cblx0XHRpZiAodHlwZW9mIGNoZWNrcyA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0Y2hlY2tTdWJzLmZvckVhY2goXyA9PiB0aGlzLl9jaGVja1tfXSA9IGNoZWNrcylcblx0XHRlbHNlIHtcblx0XHRcdHR5cGUoY2hlY2tzLCBPYmplY3QpXG5cdFx0XHRjaGVja1N1YnMuZm9yRWFjaChfID0+IHtcblx0XHRcdFx0dHlwZShjaGVja3NbX10sIEJvb2xlYW4pXG5cdFx0XHRcdHRoaXMuX2NoZWNrW19dID0gY2hlY2tzW19dXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdG1vZHVsZU5hbWUoKSB7IHJldHVybiBub0V4dChiYXNlbmFtZSh0aGlzLl9pbkZpbGUpKSB9XG5cdGpzQmFzZU5hbWUoKSB7IHJldHVybiBgJHt0aGlzLm1vZHVsZU5hbWUoKX0uanNgIH1cblx0bW9kdWxlUGF0aCgpIHsgcmV0dXJuIHRoaXMuX2luRmlsZSB9XG5cblx0aW5jbHVkZVVzZUNoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrLnVzZSB9XG5cdGluY2x1ZGVUeXBlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2sudHlwZSB9XG5cdGluY2x1ZGVJbm91dENoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrLmlub3V0IH1cblx0aW5jbHVkZUNhc2VDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjay5jYXNlIH1cblxuXHRpbmNsdWRlQW1kZWZpbmUoKSB7IHJldHVybiB0aGlzLl9pbmNsdWRlQW1kZWZpbmUgfVxuXHRpbmNsdWRlU291cmNlTWFwKCkgeyByZXR1cm4gdGhpcy5faW5jbHVkZVNvdXJjZU1hcCB9XG5cdGluY2x1ZGVNb2R1bGVOYW1lKCkgeyByZXR1cm4gdGhpcy5faW5jbHVkZU1vZHVsZU5hbWUgfVxuXHRpbmNsdWRlVXNlU3RyaWN0KCkgeyByZXR1cm4gdGhpcy5fdXNlU3RyaWN0IH1cblxuXHRsYXp5TW9kdWxlKCkgeyByZXR1cm4gIXRoaXMuX2ZvcmNlTm9uTGF6eU1vZHVsZSB9XG59XG5cbmNvbnN0XG5cdGJhc2VuYW1lID0gcGF0aCA9PlxuXHRcdGxhc3QocGF0aC5zcGxpdCgnLycpKSxcblx0ZXh0bmFtZSA9IHBhdGggPT5cblx0XHRsYXN0KHBhdGguc3BsaXQoJy4nKSksXG5cdG5vRXh0ID0gcGF0aCA9PlxuXHRcdC8vIC0gMSBmb3IgdGhlICcuJ1xuXHRcdHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGVuZ3RoIC0gMSAtIGV4dG5hbWUocGF0aCkubGVuZ3RoKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=