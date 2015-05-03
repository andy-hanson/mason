if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/Bag', './U/type', './U/types'], function (exports, _UBag, _UType, _UTypes) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _type = _interopRequire(_UType);

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
			includeModuleDisplayName: true,
			forceNonLazyModule: false,
			useStrict: true
		};
		const opts = Object.assign({}, defaults, obj);
		if (!opts.inFile) {
			if (opts.includeSourceMap) throw new Error('Either supply `inFile` option or make `includeSourceMap` false.');
			if (opts.includeModuleDisplayName) throw new Error('Either supply `inFile` option or make `includeModuleDisplayName` false.');
		}
		return new Opts(opts);
	};

	exports.OptsFromObject = OptsFromObject;
	const Opts = _UTypes.ObjType('Opts', Object, {
		inFile: String,
		checks: Boolean,
		includeAmdefine: Boolean,
		includeSourceMap: Boolean,
		includeModuleDisplayName: Boolean,
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
				_type(this.checks[name], 'boolean');
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
		moduleDisplayName: function () {
			return this.includeModuleDisplayName;
		},
		lazyModule: function () {
			return !this.forceNonLazyModule;
		},

		includeUseStrict: function () {
			return this.useStrict;
		}
	});

	const basename = function (path) {
		return _UBag.last(path.split('/'));
	};
	const extname = function (path) {
		return _UBag.last(path.split('.'));
	};
	const noExt = function (path) {
		return (
			// - 1 for the '.'
			path.substring(0, path.length - 1 - extname(path).length)
		);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL09wdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxPQUFNLGNBQWMsR0FBRyxVQUFBLEdBQUcsRUFBSTtBQUNwQyxRQUFNLFFBQVEsR0FBRztBQUNoQixTQUFNLEVBQUUsSUFBSTtBQUNaLGtCQUFlLEVBQUUsSUFBSTtBQUNyQixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLElBQUk7QUFDOUIscUJBQWtCLEVBQUUsS0FBSztBQUN6QixZQUFTLEVBQUUsSUFBSTtHQUNmLENBQUE7QUFDRCxRQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDN0MsTUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDakIsT0FBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQTtBQUNuRixPQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDZCx5RUFBeUUsQ0FBQyxDQUFBO0dBQzVFO0FBQ0QsU0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUNyQixDQUFBOztTQWxCWSxjQUFjLEdBQWQsY0FBYztBQW9CM0IsT0FBTSxJQUFJLEdBQUcsUUFwQ0osT0FBTyxDQW9DSyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3BDLFFBQU0sRUFBRSxNQUFNO0FBQ2QsUUFBTSxFQUFFLE9BQU87QUFDZixpQkFBZSxFQUFFLE9BQU87QUFDeEIsa0JBQWdCLEVBQUUsT0FBTztBQUN6QiwwQkFBd0IsRUFBRSxPQUFPO0FBQ2pDLG9CQUFrQixFQUFFLE9BQU87QUFDM0IsV0FBUyxFQUFFLE9BQU87RUFDbEIsQ0FBQyxDQUFBO21CQUNhLElBQUk7O0FBQ25CLE9BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUM3QixZQUFVLEVBQUEsWUFBRztBQUFFLFVBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtHQUFFO0FBQ3BELFlBQVUsRUFBQSxZQUFHO0FBQUUsZUFBVSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQUs7R0FBRTtBQUNqRCxZQUFVLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtHQUFFOztBQUVuQyxRQUFNLEVBQUEsVUFBQyxJQUFJLEVBQUU7QUFDWixPQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQSxLQUNkO0FBQ0osVUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QjtHQUNEO0FBQ0Qsa0JBQWdCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFFO0FBQ2hELG1CQUFpQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7R0FBRTtBQUNsRCxvQkFBa0IsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUU7QUFDcEQsbUJBQWlCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUFFOztBQUVsRCxVQUFRLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtHQUFFO0FBQzFDLFdBQVMsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7R0FBRTtBQUM1QyxtQkFBaUIsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsd0JBQXdCLENBQUE7R0FBRTtBQUM1RCxZQUFVLEVBQUEsWUFBRztBQUFFLFVBQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUE7R0FBRTs7QUFFaEQsa0JBQWdCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtHQUFFO0VBQzVDLENBQUMsQ0FBQTs7QUFFRixPQUFNLFFBQVEsR0FBRyxVQUFBLElBQUk7U0FDcEIsTUEzRVEsSUFBSSxDQTJFUCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQTtBQUN0QixPQUFNLE9BQU8sR0FBRyxVQUFBLElBQUk7U0FDbkIsTUE3RVEsSUFBSSxDQTZFUCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQTtBQUN0QixPQUFNLEtBQUssR0FBRyxVQUFBLElBQUk7OztBQUVqQixPQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtHQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9PcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbGFzdCB9IGZyb20gJy4vVS9CYWcnXG5pbXBvcnQgdHlwZSBmcm9tICcuL1UvdHlwZSdcbmltcG9ydCB7IE9ialR5cGUgfSBmcm9tICcuL1UvdHlwZXMnXG5cbi8qXG5PcHRzIG9iamVjdFxubWFuZGF0b3J5OlxuXHRpbkZpbGU6IFN0cmluZ1xuXHRcdHBhdGggdG8gaW5wdXQgZmlsZS5cblx0XHRPcHRpb25hbCBpZiBub3QgaW5jbHVkZVNvdXJjZU1hcC5cblxub3B0aW9uYWw6XG5cdGNoZWNrczogQm9vbGVhblxuXHRcdFdoZXRoZXIgdG8gaW5jbHVkZSBhc3NlcnRpb25zLlxuXHRcdENhbGwgYWxzbyBiZSB7IHVzZSwgdHlwZSwgaW5vdXQsIGNhc2UgfSBmb3Igc3BlY2lmaWMgdHlwZXMgb2YgYXNzZXJ0aW9ucy5cblx0aW5jbHVkZVNvdXJjZU1hcDogQm9vbGVhblxuXHR1c2VTdHJpY3Q6IEJvb2xlYW5cbiovXG5leHBvcnQgY29uc3QgT3B0c0Zyb21PYmplY3QgPSBvYmogPT4ge1xuXHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRjaGVja3M6IHRydWUsXG5cdFx0aW5jbHVkZUFtZGVmaW5lOiB0cnVlLFxuXHRcdGluY2x1ZGVTb3VyY2VNYXA6IHRydWUsXG5cdFx0aW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lOiB0cnVlLFxuXHRcdGZvcmNlTm9uTGF6eU1vZHVsZTogZmFsc2UsXG5cdFx0dXNlU3RyaWN0OiB0cnVlXG5cdH1cblx0Y29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvYmopXG5cdGlmICghb3B0cy5pbkZpbGUpIHtcblx0XHRpZiAob3B0cy5pbmNsdWRlU291cmNlTWFwKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgc3VwcGx5IGBpbkZpbGVgIG9wdGlvbiBvciBtYWtlIGBpbmNsdWRlU291cmNlTWFwYCBmYWxzZS4nKVxuXHRcdGlmIChvcHRzLmluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0J0VpdGhlciBzdXBwbHkgYGluRmlsZWAgb3B0aW9uIG9yIG1ha2UgYGluY2x1ZGVNb2R1bGVEaXNwbGF5TmFtZWAgZmFsc2UuJylcblx0fVxuXHRyZXR1cm4gbmV3IE9wdHMob3B0cylcbn1cblxuY29uc3QgT3B0cyA9IE9ialR5cGUoJ09wdHMnLCBPYmplY3QsIHtcblx0aW5GaWxlOiBTdHJpbmcsXG5cdGNoZWNrczogQm9vbGVhbixcblx0aW5jbHVkZUFtZGVmaW5lOiBCb29sZWFuLFxuXHRpbmNsdWRlU291cmNlTWFwOiBCb29sZWFuLFxuXHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IEJvb2xlYW4sXG5cdGZvcmNlTm9uTGF6eU1vZHVsZTogQm9vbGVhbixcblx0dXNlU3RyaWN0OiBCb29sZWFuXG59KVxuZXhwb3J0IGRlZmF1bHQgT3B0c1xuT2JqZWN0LmFzc2lnbihPcHRzLnByb3RvdHlwZSwge1xuXHRtb2R1bGVOYW1lKCkgeyByZXR1cm4gbm9FeHQoYmFzZW5hbWUodGhpcy5pbkZpbGUpKSB9LFxuXHRqc0Jhc2VOYW1lKCkgeyByZXR1cm4gYCR7dGhpcy5tb2R1bGVOYW1lKCl9LmpzYCB9LFxuXHRtb2R1bGVQYXRoKCkgeyByZXR1cm4gdGhpcy5pbkZpbGUgfSxcblxuXHRfY2hlY2sobmFtZSkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5jaGVja3MgPT09ICdib29sZWFuJylcblx0XHRcdHJldHVybiB0aGlzLmNoZWNrc1xuXHRcdGVsc2Uge1xuXHRcdFx0dHlwZSh0aGlzLmNoZWNrc1tuYW1lXSwgJ2Jvb2xlYW4nKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tzW25hbWVdXG5cdFx0fVxuXHR9LFxuXHRpbmNsdWRlVXNlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2soJ3VzZScpIH0sXG5cdGluY2x1ZGVUeXBlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2soJ3R5cGUnKSB9LFxuXHRpbmNsdWRlSW5vdXRDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjaygnaW5vdXQnKSB9LFxuXHRpbmNsdWRlQ2FzZUNoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrKCdjYXNlJykgfSxcblxuXHRhbWRlZmluZSgpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZUFtZGVmaW5lIH0sXG5cdHNvdXJjZU1hcCgpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZVNvdXJjZU1hcCB9LFxuXHRtb2R1bGVEaXNwbGF5TmFtZSgpIHsgcmV0dXJuIHRoaXMuaW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lIH0sXG5cdGxhenlNb2R1bGUoKSB7IHJldHVybiAhdGhpcy5mb3JjZU5vbkxhenlNb2R1bGUgfSxcblxuXHRpbmNsdWRlVXNlU3RyaWN0KCkgeyByZXR1cm4gdGhpcy51c2VTdHJpY3QgfVxufSlcblxuY29uc3QgYmFzZW5hbWUgPSBwYXRoID0+XG5cdGxhc3QocGF0aC5zcGxpdCgnLycpKVxuY29uc3QgZXh0bmFtZSA9IHBhdGggPT5cblx0bGFzdChwYXRoLnNwbGl0KCcuJykpXG5jb25zdCBub0V4dCA9IHBhdGggPT5cblx0Ly8gLSAxIGZvciB0aGUgJy4nXG5cdHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGVuZ3RoIC0gMSAtIGV4dG5hbWUocGF0aCkubGVuZ3RoKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=