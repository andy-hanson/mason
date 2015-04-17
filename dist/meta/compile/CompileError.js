if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', './private/U/type', './private/U/types'], function (exports, _esastDistLoc, _privateUType, _privateUTypes) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.default = CompileError;

	var _Loc = _interopRequire(_esastDistLoc);

	var _type = _interopRequire(_privateUType);

	function CompileError(warning) {
		if (!(this instanceof CompileError)) return new CompileError(warning);
		_type(warning, Warning);
		this.warning = warning;
		// In case it's not caught and formatted:
		this.message = warning.message;
		this.stack = new Error(warning.message).stack;
	}

	CompileError.prototype = Object.create(Error.prototype);

	const Warning = _privateUTypes.tuple(Object, 'loc', _Loc, 'message', String);

	exports.Warning = Warning;
	const code = function (str) {
		return '{{' + str + '}}';
	};

	exports.code = code;
	const formatCode = function* (str, formatter) {
		const rgx = /{{(.*?)}}/g;
		let prevIdx = 0;
		while (true) {
			const match = rgx.exec(str);
			if (match === null) {
				yield str.slice(prevIdx, str.length);
				break;
			} else {
				yield str.slice(prevIdx, match.index);
				yield formatter(match[1]);
				prevIdx = rgx.lastIndex;
			}
		}
	};
	exports.formatCode = formatCode;
});
//# sourceMappingURL=../../meta/compile/CompileError.js.map