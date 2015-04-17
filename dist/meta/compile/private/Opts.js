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
				_type(this.checks, Object);
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
//# sourceMappingURL=../../../meta/compile/private/Opts.js.map