if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/Bag', './U/types', './U/util'], function (exports, _UBag, _UTypes, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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
	const OptsFromObject = function (obj) {
		const defaults = {
			checks: true,
			includeAmdefine: true,
			includeSourceMap: true,
			includeModuleName: true,
			forceNonLazyModule: false,
			useStrict: true
		};
		const opts = Object.assign({}, defaults, obj);
		if (!opts.inFile) {
			if (opts.includeSourceMap) throw new Error('Either supply `inFile` option or make `includeSourceMap` false.');
			if (opts.includeModuleName) throw new Error('Either supply `inFile` option or make `includeModuleName` false.');
		}
		return new Opts(opts);
	};

	exports.OptsFromObject = OptsFromObject;
	const Opts = (0, _UTypes.ObjType)('Opts', Object, {
		inFile: String,
		checks: Boolean,
		includeAmdefine: Boolean,
		includeSourceMap: Boolean,
		includeModuleName: Boolean,
		forceNonLazyModule: Boolean,
		useStrict: Boolean
	});
	exports.default = Opts;

	Object.assign(Opts.prototype, {
		moduleName: function () {
			return noExt(basename(this.inFile));
		},
		jsBaseName: function () {
			return '' + this.moduleName() + '.js';
		},
		modulePath: function () {
			return this.inFile;
		},

		_check: function (name) {
			if (typeof this.checks === 'boolean') return this.checks;else {
				(0, _UUtil.type)(this.checks[name], Boolean);
				return this.checks[name];
			}
		},
		includeUseChecks: function () {
			return this._check('use');
		},
		includeTypeChecks: function () {
			return this._check('type');
		},
		includeInoutChecks: function () {
			return this._check('inout');
		},
		includeCaseChecks: function () {
			return this._check('case');
		},

		amdefine: function () {
			return this.includeAmdefine;
		},
		sourceMap: function () {
			return this.includeSourceMap;
		},
		doIncludeModuleName: function () {
			return this.includeModuleName;
		},
		lazyModule: function () {
			return !this.forceNonLazyModule;
		},

		includeUseStrict: function () {
			return this.useStrict;
		}
	});

	const basename = function (path) {
		return (0, _UBag.last)(path.split('/'));
	};
	const extname = function (path) {
		return (0, _UBag.last)(path.split('.'));
	};
	const noExt = function (path) {
		return (
			// - 1 for the '.'
			path.substring(0, path.length - 1 - extname(path).length)
		);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL09wdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JPLE9BQU0sY0FBYyxHQUFHLFVBQUEsR0FBRyxFQUFJO0FBQ3BDLFFBQU0sUUFBUSxHQUFHO0FBQ2hCLFNBQU0sRUFBRSxJQUFJO0FBQ1osa0JBQWUsRUFBRSxJQUFJO0FBQ3JCLG1CQUFnQixFQUFFLElBQUk7QUFDdEIsb0JBQWlCLEVBQUUsSUFBSTtBQUN2QixxQkFBa0IsRUFBRSxLQUFLO0FBQ3pCLFlBQVMsRUFBRSxJQUFJO0dBQ2YsQ0FBQTtBQUNELFFBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUM3QyxNQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNqQixPQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFBO0FBQ25GLE9BQUksSUFBSSxDQUFDLGlCQUFpQixFQUN6QixNQUFNLElBQUksS0FBSyxDQUNkLGtFQUFrRSxDQUFDLENBQUE7R0FDckU7QUFDRCxTQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ3JCLENBQUE7O1NBbEJZLGNBQWMsR0FBZCxjQUFjO0FBb0IzQixPQUFNLElBQUksR0FBRyxZQXJDSixPQUFPLEVBcUNLLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEMsUUFBTSxFQUFFLE1BQU07QUFDZCxRQUFNLEVBQUUsT0FBTztBQUNmLGlCQUFlLEVBQUUsT0FBTztBQUN4QixrQkFBZ0IsRUFBRSxPQUFPO0FBQ3pCLG1CQUFpQixFQUFFLE9BQU87QUFDMUIsb0JBQWtCLEVBQUUsT0FBTztBQUMzQixXQUFTLEVBQUUsT0FBTztFQUNsQixDQUFDLENBQUE7bUJBQ2EsSUFBSTs7QUFDbkIsT0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzdCLFlBQVUsRUFBQSxZQUFHO0FBQUUsVUFBTyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDcEQsWUFBVSxFQUFBLFlBQUc7QUFBRSxlQUFVLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBSztHQUFFO0FBQ2pELFlBQVUsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0dBQUU7O0FBRW5DLFFBQU0sRUFBQSxVQUFDLElBQUksRUFBRTtBQUNaLE9BQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBLEtBQ2Q7QUFDSixlQXZETSxJQUFJLEVBdURMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDaEMsV0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCO0dBQ0Q7QUFDRCxrQkFBZ0IsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0dBQUU7QUFDaEQsbUJBQWlCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUFFO0FBQ2xELG9CQUFrQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7R0FBRTtBQUNwRCxtQkFBaUIsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQUU7O0FBRWxELFVBQVEsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsZUFBZSxDQUFBO0dBQUU7QUFDMUMsV0FBUyxFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtHQUFFO0FBQzVDLHFCQUFtQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQTtHQUFFO0FBQ3ZELFlBQVUsRUFBQSxZQUFHO0FBQUUsVUFBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQTtHQUFFOztBQUVoRCxrQkFBZ0IsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0dBQUU7RUFDNUMsQ0FBQyxDQUFBOztBQUVGLE9BQU0sUUFBUSxHQUFHLFVBQUEsSUFBSTtTQUNwQixVQTNFUSxJQUFJLEVBMkVQLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBO0FBQ3RCLE9BQU0sT0FBTyxHQUFHLFVBQUEsSUFBSTtTQUNuQixVQTdFUSxJQUFJLEVBNkVQLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBO0FBQ3RCLE9BQU0sS0FBSyxHQUFHLFVBQUEsSUFBSTs7O0FBRWpCLE9BQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO0dBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL09wdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsYXN0IH0gZnJvbSAnLi9VL0JhZydcbmltcG9ydCB7IE9ialR5cGUgfSBmcm9tICcuL1UvdHlwZXMnXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi9VL3V0aWwnXG5cbi8qXG5PcHRzIG9iamVjdFxubWFuZGF0b3J5OlxuXHRpbkZpbGU6IFN0cmluZ1xuXHRcdHBhdGggdG8gaW5wdXQgZmlsZS5cblx0XHRPcHRpb25hbCBpZiBub3QgaW5jbHVkZVNvdXJjZU1hcC5cblxub3B0aW9uYWw6XG5cdGNoZWNrczogQm9vbGVhblxuXHRcdFdoZXRoZXIgdG8gaW5jbHVkZSBhc3NlcnRpb25zLlxuXHRcdENhbGwgYWxzbyBiZSB7IHVzZSwgdHlwZSwgaW5vdXQsIGNhc2UgfSBmb3Igc3BlY2lmaWMgdHlwZXMgb2YgYXNzZXJ0aW9ucy5cblx0aW5jbHVkZVNvdXJjZU1hcDogQm9vbGVhblxuXHR1c2VTdHJpY3Q6IEJvb2xlYW5cbiovXG5leHBvcnQgY29uc3QgT3B0c0Zyb21PYmplY3QgPSBvYmogPT4ge1xuXHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRjaGVja3M6IHRydWUsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiB0cnVlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZU5hbWU6IHRydWUsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiBmYWxzZSxcblx0XHR1c2VTdHJpY3Q6IHRydWVcblx0fVxuXHRjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9iailcblx0aWYgKCFvcHRzLmluRmlsZSkge1xuXHRcdGlmIChvcHRzLmluY2x1ZGVTb3VyY2VNYXApXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBzdXBwbHkgYGluRmlsZWAgb3B0aW9uIG9yIG1ha2UgYGluY2x1ZGVTb3VyY2VNYXBgIGZhbHNlLicpXG5cdFx0aWYgKG9wdHMuaW5jbHVkZU1vZHVsZU5hbWUpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdFaXRoZXIgc3VwcGx5IGBpbkZpbGVgIG9wdGlvbiBvciBtYWtlIGBpbmNsdWRlTW9kdWxlTmFtZWAgZmFsc2UuJylcblx0fVxuXHRyZXR1cm4gbmV3IE9wdHMob3B0cylcbn1cblxuY29uc3QgT3B0cyA9IE9ialR5cGUoJ09wdHMnLCBPYmplY3QsIHtcblx0aW5GaWxlOiBTdHJpbmcsXG5cdGNoZWNrczogQm9vbGVhbixcblx0aW5jbHVkZUFtZGVmaW5lOiBCb29sZWFuLFxuXHRpbmNsdWRlU291cmNlTWFwOiBCb29sZWFuLFxuXHRpbmNsdWRlTW9kdWxlTmFtZTogQm9vbGVhbixcblx0Zm9yY2VOb25MYXp5TW9kdWxlOiBCb29sZWFuLFxuXHR1c2VTdHJpY3Q6IEJvb2xlYW5cbn0pXG5leHBvcnQgZGVmYXVsdCBPcHRzXG5PYmplY3QuYXNzaWduKE9wdHMucHJvdG90eXBlLCB7XG5cdG1vZHVsZU5hbWUoKSB7IHJldHVybiBub0V4dChiYXNlbmFtZSh0aGlzLmluRmlsZSkpIH0sXG5cdGpzQmFzZU5hbWUoKSB7IHJldHVybiBgJHt0aGlzLm1vZHVsZU5hbWUoKX0uanNgIH0sXG5cdG1vZHVsZVBhdGgoKSB7IHJldHVybiB0aGlzLmluRmlsZSB9LFxuXG5cdF9jaGVjayhuYW1lKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmNoZWNrcyA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tzXG5cdFx0ZWxzZSB7XG5cdFx0XHR0eXBlKHRoaXMuY2hlY2tzW25hbWVdLCBCb29sZWFuKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tzW25hbWVdXG5cdFx0fVxuXHR9LFxuXHRpbmNsdWRlVXNlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2soJ3VzZScpIH0sXG5cdGluY2x1ZGVUeXBlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2soJ3R5cGUnKSB9LFxuXHRpbmNsdWRlSW5vdXRDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjaygnaW5vdXQnKSB9LFxuXHRpbmNsdWRlQ2FzZUNoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrKCdjYXNlJykgfSxcblxuXHRhbWRlZmluZSgpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZUFtZGVmaW5lIH0sXG5cdHNvdXJjZU1hcCgpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZVNvdXJjZU1hcCB9LFxuXHRkb0luY2x1ZGVNb2R1bGVOYW1lKCkgeyByZXR1cm4gdGhpcy5pbmNsdWRlTW9kdWxlTmFtZSB9LFxuXHRsYXp5TW9kdWxlKCkgeyByZXR1cm4gIXRoaXMuZm9yY2VOb25MYXp5TW9kdWxlIH0sXG5cblx0aW5jbHVkZVVzZVN0cmljdCgpIHsgcmV0dXJuIHRoaXMudXNlU3RyaWN0IH1cbn0pXG5cbmNvbnN0IGJhc2VuYW1lID0gcGF0aCA9PlxuXHRsYXN0KHBhdGguc3BsaXQoJy8nKSlcbmNvbnN0IGV4dG5hbWUgPSBwYXRoID0+XG5cdGxhc3QocGF0aC5zcGxpdCgnLicpKVxuY29uc3Qgbm9FeHQgPSBwYXRoID0+XG5cdC8vIC0gMSBmb3IgdGhlICcuJ1xuXHRwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxlbmd0aCAtIDEgLSBleHRuYW1lKHBhdGgpLmxlbmd0aClcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9