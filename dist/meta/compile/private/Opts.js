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
			forceNonLazyModule: false
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
		forceNonLazyModule: Boolean
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL09wdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxPQUFNLGNBQWMsR0FBRyxVQUFBLEdBQUcsRUFBSTtBQUNwQyxRQUFNLFFBQVEsR0FBRztBQUNoQixTQUFNLEVBQUUsSUFBSTtBQUNaLGtCQUFlLEVBQUUsSUFBSTtBQUNyQixtQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLDJCQUF3QixFQUFFLElBQUk7QUFDOUIscUJBQWtCLEVBQUUsS0FBSztHQUN6QixDQUFBO0FBQ0QsUUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzdDLE1BQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2pCLE9BQUksSUFBSSxDQUFDLGdCQUFnQixFQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7QUFDbkYsT0FBSSxJQUFJLENBQUMsd0JBQXdCLEVBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQ2QseUVBQXlFLENBQUMsQ0FBQTtHQUM1RTtBQUNELFNBQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7RUFDckIsQ0FBQTs7U0FqQlksY0FBYyxHQUFkLGNBQWM7QUFtQjNCLE9BQU0sSUFBSSxHQUFHLFFBbkNKLE9BQU8sQ0FtQ0ssTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQyxRQUFNLEVBQUUsTUFBTTtBQUNkLFFBQU0sRUFBRSxPQUFPO0FBQ2YsaUJBQWUsRUFBRSxPQUFPO0FBQ3hCLGtCQUFnQixFQUFFLE9BQU87QUFDekIsMEJBQXdCLEVBQUUsT0FBTztBQUNqQyxvQkFBa0IsRUFBRSxPQUFPO0VBQzNCLENBQUMsQ0FBQTttQkFDYSxJQUFJOztBQUNuQixPQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDN0IsWUFBVSxFQUFBLFlBQUc7QUFBRSxVQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7R0FBRTtBQUNwRCxZQUFVLEVBQUEsWUFBRztBQUFFLGVBQVUsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFLO0dBQUU7QUFDakQsWUFBVSxFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7R0FBRTs7QUFFbkMsUUFBTSxFQUFBLFVBQUMsSUFBSSxFQUFFO0FBQ1osT0FBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsS0FDZDtBQUNKLFVBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNsQyxXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEI7R0FDRDtBQUNELGtCQUFnQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBRTtBQUNoRCxtQkFBaUIsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQUU7QUFDbEQsb0JBQWtCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUFFO0FBQ3BELG1CQUFpQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7R0FBRTs7QUFFbEQsVUFBUSxFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxlQUFlLENBQUE7R0FBRTtBQUMxQyxXQUFTLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFBO0dBQUU7QUFDNUMsbUJBQWlCLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFBO0dBQUU7QUFDNUQsWUFBVSxFQUFBLFlBQUc7QUFBRSxVQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFBO0dBQUU7RUFDaEQsQ0FBQyxDQUFBOztBQUVGLE9BQU0sUUFBUSxHQUFHLFVBQUEsSUFBSTtTQUNwQixNQXZFUSxJQUFJLENBdUVQLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBO0FBQ3RCLE9BQU0sT0FBTyxHQUFHLFVBQUEsSUFBSTtTQUNuQixNQXpFUSxJQUFJLENBeUVQLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBO0FBQ3RCLE9BQU0sS0FBSyxHQUFHLFVBQUEsSUFBSTs7O0FBRWpCLE9BQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO0dBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL09wdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsYXN0IH0gZnJvbSAnLi9VL0JhZydcbmltcG9ydCB0eXBlIGZyb20gJy4vVS90eXBlJ1xuaW1wb3J0IHsgT2JqVHlwZSB9IGZyb20gJy4vVS90eXBlcydcblxuLypcbk9wdHMgb2JqZWN0XG5tYW5kYXRvcnk6XG5cdGluRmlsZTogU3RyaW5nXG5cdFx0cGF0aCB0byBpbnB1dCBmaWxlLlxuXHRcdE9wdGlvbmFsIGlmIG5vdCBpbmNsdWRlU291cmNlTWFwLlxuXG5vcHRpb25hbDpcblx0Y2hlY2tzOiBCb29sZWFuXG5cdFx0V2hldGhlciB0byBpbmNsdWRlIGFzc2VydGlvbnMuXG5cdFx0Q2FsbCBhbHNvIGJlIHsgdXNlLCB0eXBlLCBpbm91dCwgY2FzZSB9IGZvciBzcGVjaWZpYyB0eXBlcyBvZiBhc3NlcnRpb25zLlxuXHRpbmNsdWRlU291cmNlTWFwOiBCb29sZWFuXG5cdHVzZVN0cmljdDogQm9vbGVhblxuKi9cbmV4cG9ydCBjb25zdCBPcHRzRnJvbU9iamVjdCA9IG9iaiA9PiB7XG5cdGNvbnN0IGRlZmF1bHRzID0ge1xuXHRcdGNoZWNrczogdHJ1ZSxcblx0XHRpbmNsdWRlQW1kZWZpbmU6IHRydWUsXG5cdFx0aW5jbHVkZVNvdXJjZU1hcDogdHJ1ZSxcblx0XHRpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWU6IHRydWUsXG5cdFx0Zm9yY2VOb25MYXp5TW9kdWxlOiBmYWxzZVxuXHR9XG5cdGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb2JqKVxuXHRpZiAoIW9wdHMuaW5GaWxlKSB7XG5cdFx0aWYgKG9wdHMuaW5jbHVkZVNvdXJjZU1hcClcblx0XHRcdHRocm93IG5ldyBFcnJvcignRWl0aGVyIHN1cHBseSBgaW5GaWxlYCBvcHRpb24gb3IgbWFrZSBgaW5jbHVkZVNvdXJjZU1hcGAgZmFsc2UuJylcblx0XHRpZiAob3B0cy5pbmNsdWRlTW9kdWxlRGlzcGxheU5hbWUpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdFaXRoZXIgc3VwcGx5IGBpbkZpbGVgIG9wdGlvbiBvciBtYWtlIGBpbmNsdWRlTW9kdWxlRGlzcGxheU5hbWVgIGZhbHNlLicpXG5cdH1cblx0cmV0dXJuIG5ldyBPcHRzKG9wdHMpXG59XG5cbmNvbnN0IE9wdHMgPSBPYmpUeXBlKCdPcHRzJywgT2JqZWN0LCB7XG5cdGluRmlsZTogU3RyaW5nLFxuXHRjaGVja3M6IEJvb2xlYW4sXG5cdGluY2x1ZGVBbWRlZmluZTogQm9vbGVhbixcblx0aW5jbHVkZVNvdXJjZU1hcDogQm9vbGVhbixcblx0aW5jbHVkZU1vZHVsZURpc3BsYXlOYW1lOiBCb29sZWFuLFxuXHRmb3JjZU5vbkxhenlNb2R1bGU6IEJvb2xlYW5cbn0pXG5leHBvcnQgZGVmYXVsdCBPcHRzXG5PYmplY3QuYXNzaWduKE9wdHMucHJvdG90eXBlLCB7XG5cdG1vZHVsZU5hbWUoKSB7IHJldHVybiBub0V4dChiYXNlbmFtZSh0aGlzLmluRmlsZSkpIH0sXG5cdGpzQmFzZU5hbWUoKSB7IHJldHVybiBgJHt0aGlzLm1vZHVsZU5hbWUoKX0uanNgIH0sXG5cdG1vZHVsZVBhdGgoKSB7IHJldHVybiB0aGlzLmluRmlsZSB9LFxuXG5cdF9jaGVjayhuYW1lKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmNoZWNrcyA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tzXG5cdFx0ZWxzZSB7XG5cdFx0XHR0eXBlKHRoaXMuY2hlY2tzW25hbWVdLCAnYm9vbGVhbicpXG5cdFx0XHRyZXR1cm4gdGhpcy5jaGVja3NbbmFtZV1cblx0XHR9XG5cdH0sXG5cdGluY2x1ZGVVc2VDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjaygndXNlJykgfSxcblx0aW5jbHVkZVR5cGVDaGVja3MoKSB7IHJldHVybiB0aGlzLl9jaGVjaygndHlwZScpIH0sXG5cdGluY2x1ZGVJbm91dENoZWNrcygpIHsgcmV0dXJuIHRoaXMuX2NoZWNrKCdpbm91dCcpIH0sXG5cdGluY2x1ZGVDYXNlQ2hlY2tzKCkgeyByZXR1cm4gdGhpcy5fY2hlY2soJ2Nhc2UnKSB9LFxuXG5cdGFtZGVmaW5lKCkgeyByZXR1cm4gdGhpcy5pbmNsdWRlQW1kZWZpbmUgfSxcblx0c291cmNlTWFwKCkgeyByZXR1cm4gdGhpcy5pbmNsdWRlU291cmNlTWFwIH0sXG5cdG1vZHVsZURpc3BsYXlOYW1lKCkgeyByZXR1cm4gdGhpcy5pbmNsdWRlTW9kdWxlRGlzcGxheU5hbWUgfSxcblx0bGF6eU1vZHVsZSgpIHsgcmV0dXJuICF0aGlzLmZvcmNlTm9uTGF6eU1vZHVsZSB9XG59KVxuXG5jb25zdCBiYXNlbmFtZSA9IHBhdGggPT5cblx0bGFzdChwYXRoLnNwbGl0KCcvJykpXG5jb25zdCBleHRuYW1lID0gcGF0aCA9PlxuXHRsYXN0KHBhdGguc3BsaXQoJy4nKSlcbmNvbnN0IG5vRXh0ID0gcGF0aCA9PlxuXHQvLyAtIDEgZm9yIHRoZSAnLidcblx0cGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSAxIC0gZXh0bmFtZShwYXRoKS5sZW5ndGgpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==