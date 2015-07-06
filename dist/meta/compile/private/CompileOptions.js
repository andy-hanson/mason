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
		function CompileOptions() {
			var _this = this;

			let opts = arguments[0] === undefined ? {} : arguments[0];

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
				return this.moduleName() + '.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVPcHRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQnFCLGNBQWM7QUFDdkIsV0FEUyxjQUFjLEdBQ1Y7OztPQUFaLElBQUksZ0NBQUcsRUFBRzs7eUJBREYsY0FBYzs7QUFFakMsYUFsQmEsSUFBSSxFQWtCWixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRWxCLFNBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNyQyxVQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsUUFBSSxDQUFDLEtBQUssU0FBUyxFQUNsQixPQUFPLFFBQVEsQ0FBQSxLQUNYO0FBQ0osZUF6QlcsSUFBSSxFQXlCVixDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzdCLFlBQU8sQ0FBQyxDQUFBO0tBQ1I7SUFDRCxDQUFBOztBQUVELFNBQU0sTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNsQyxnQkFBUyxJQUFJLENBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzVDLENBQUE7O0FBRUQsU0FBTSxRQUFRLEdBQUc7QUFDaEIsbUJBQWUsRUFBRSxJQUFJO0FBQ3JCLG9CQUFnQixFQUFFLElBQUk7QUFDdEIscUJBQWlCLEVBQUUsSUFBSTtBQUN2QixzQkFBa0IsRUFBRSxLQUFLO0FBQ3pCLGFBQVMsRUFBRSxJQUFJO0lBQ2YsQ0FBQTs7QUFFRCxTQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7V0FBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQTs7QUFFMUQsT0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFB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Im1ldGEvY29tcGlsZS9wcml2YXRlL0NvbXBpbGVPcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbGFzdCwgdHlwZSB9IGZyb20gJy4vdXRpbCdcblxuLypcbk9wdHMgb2JqZWN0XG5tYW5kYXRvcnk6XG5cdGluRmlsZTogU3RyaW5nXG5cdFx0cGF0aCB0byBpbnB1dCBmaWxlLlxuXHRcdE9wdGlvbmFsIGlmIG5vdCBpbmNsdWRlU291cmNlTWFwLlxuXG5vcHRpb25hbDpcblx0Y2hlY2tzOiBCb29sZWFuXG5cdFx0V2hldGhlciB0byBpbmNsdWRlIGFzc2VydGlvbnMuXG5cdFx0Q2FsbCBhbHNvIGJlIHsgdXNlLCB0eXBlLCBpbm91dCwgY2FzZSB9IGZvciBzcGVjaWZpYyB0eXBlcyBvZiBhc3NlcnRpb25zLlxuXHRpbmNsdWRlU291cmNlTWFwOiBCb29sZWFuXG5cdHVzZVN0cmljdDogQm9vbGVhblxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBpbGVPcHRpb25zIHtcblx0Y29uc3RydWN0b3Iob3B0cyA9IHsgfSkge1xuXHRcdHR5cGUob3B0cywgT2JqZWN0KVxuXG5cdFx0Y29uc3QgZGVmYXVsdFRvID0gKG5hbWUsIF9kZWZhdWx0KSA9PiB7XG5cdFx0XHRjb25zdCBfID0gb3B0c1tuYW1lXVxuXHRcdFx0aWYgKF8gPT09IHVuZGVmaW5lZClcblx0XHRcdFx0cmV0dXJuIF9kZWZhdWx0XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dHlwZShfLCBfZGVmYXVsdC5jb25zdHJ1Y3Rvcilcblx0XHRcdFx0cmV0dXJuIF9cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBkZWZpbmUgPSAobmFtZSwgX2RlZmF1bHQpID0+IHtcblx0XHRcdHRoaXNbYF8ke25hbWV9YF0gPSBkZWZhdWx0VG8obmFtZSwgX2RlZmF1bHQpXG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVmYXVsdHMgPSB7XG5cdFx0XHRpbmNsdWRlQW1kZWZpbmU6IHRydWUsXG5cdFx0XHRpbmNsdWRlU291cmNlTWFwOiB0cnVlLFxuXHRcdFx0aW5jbHVkZU1vZHVsZU5hbWU6IHRydWUsXG5cdFx0XHRmb3JjZU5vbkxhenlNb2R1bGU6IGZhbHNlLFxuXHRcdFx0dXNlU3RyaWN0OiB0cnVlXG5cdFx0fVxuXG5cdFx0T2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goXyA9PiBkZWZpbmUoXywgZGVmYXVsdHNbX10pKVxuXG5cdFx0dGhpcy5faW5GaWxlID0gb3B0cy5pbkZpbGVcblx0XHRpZiAodGhpcy5faW5GaWxlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGlmICh0aGlzLl9pbmNsdWRlU291cmNlTWFwKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBzdXBwbHkgYGluRmlsZWAgb3B0aW9uIG9yIG1ha2UgYGluY2x1ZGVTb3VyY2VNYXBgIGZhbHNlLicpXG5cdFx0XHRpZiAodGhpcy5faW5jbHVkZU1vZHVsZU5hbWUpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRWl0aGVyIHN1cHBseSBgaW5GaWxlYCBvcHRpb24gb3IgbWFrZSBgaW5jbHVkZU1vZHVsZU5hbWVgIGZhbHNlLicpXG5cdFx0fVxuXG5cdFx0bGV0IGNoZWNrcyA9IG9wdHMuY2hlY2tzXG5cdFx0aWYgKGNoZWNrcyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0Y2hlY2tzID0gdHJ1ZVxuXHRcdGNvbnN0IGNoZWNrU3VicyA9IFsgJ3VzZScsICd0eXBlJywgJ2lub3V0JywgJ2Nhc2UnIF1cblx0XHR0aGlzLl9jaGVjayA9IHsgfVxuXHRcdGlmICh0eXBlb2YgY2hlY2tzID09PSAnYm9vbGVhbicpXG5cdFx0XHRjaGVja1N1YnMuZm9yRWFjaChfID0+IHRoaXMuX2NoZWNrW19dID0gY2hlY2tzKVxuXHRcdGVsc2Uge1xuXHRcdFx0dHlwZShjaGVja3MsIE9iamVjdClcblx0XHRcdGNoZWNrU3Vicy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHR0eXBlKGNoZWNrc1tfXSwgQm9vbGVhbilcblx0XHRcdFx0dGhpcy5fY2hlY2tbX10gPSBjaGVja3NbX11cblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0bW9kdWxlTmFtZSgpIHsgcmV0dXJuIG5vRXh0KGJhc2VuYW1lKHRoaXMuX2luRmlsZSkpIH1cblx0anNCYXNlTmFtZSgpIHsgcmV0dXJuIGAke3RoaXMubW9kdWxlTmFtZSgpfS5qc2AgfVxuXHRtb2R1bGVQYXRoKCkgeyByZXR1cm4gdGhpcy5faW5GaWxlIH1cblxuXHRpbmNsdWRlVXNlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2sudXNlIH1cblx0aW5jbHVkZVR5cGVDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjay50eXBlIH1cblx0aW5jbHVkZUlub3V0Q2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2suaW5vdXQgfVxuXHRpbmNsdWRlQ2FzZUNoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrLmNhc2UgfVxuXG5cdGluY2x1ZGVBbWRlZmluZSgpIHsgcmV0dXJuIHRoaXMuX2luY2x1ZGVBbWRlZmluZSB9XG5cdGluY2x1ZGVTb3VyY2VNYXAoKSB7IHJldHVybiB0aGlzLl9pbmNsdWRlU291cmNlTWFwIH1cblx0aW5jbHVkZU1vZHVsZU5hbWUoKSB7IHJldHVybiB0aGlzLl9pbmNsdWRlTW9kdWxlTmFtZSB9XG5cdGluY2x1ZGVVc2VTdHJpY3QoKSB7IHJldHVybiB0aGlzLl91c2VTdHJpY3QgfVxuXG5cdGxhenlNb2R1bGUoKSB7IHJldHVybiAhdGhpcy5fZm9yY2VOb25MYXp5TW9kdWxlIH1cbn1cblxuY29uc3Rcblx0YmFzZW5hbWUgPSBwYXRoID0+XG5cdFx0bGFzdChwYXRoLnNwbGl0KCcvJykpLFxuXHRleHRuYW1lID0gcGF0aCA9PlxuXHRcdGxhc3QocGF0aC5zcGxpdCgnLicpKSxcblx0bm9FeHQgPSBwYXRoID0+XG5cdFx0Ly8gLSAxIGZvciB0aGUgJy4nXG5cdFx0cGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSAxIC0gZXh0bmFtZShwYXRoKS5sZW5ndGgpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==