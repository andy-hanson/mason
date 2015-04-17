if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../CompileError', '../private/U/type'], function (exports, _CompileError, _privateUType) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _CompileError2 = _interopRequire(_CompileError);

	var _type = _interopRequire(_privateUType);

	exports.default = function (error, modulePath) {
		_type(error, _CompileError2);
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForHtml = function (warning, modulePath) {
		_type(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warning');
	};

	exports.formatWarningForHtml = formatWarningForHtml;
	const format = function (warning, modulePath, kind) {
		const locSpan = document.createElement('span');
		locSpan.className = 'loc';
		locSpan.textContent = warning.loc + ' ';

		const messageSpan = document.createElement('message');
		messageSpan.className = 'message';
		const messageParts = _CompileError.formatCode(warning.message, function (code) {
			const _ = document.createElement('span');
			_.className = 'code';
			_.textContent = code;
			return _;
		});
		for (let part of messageParts) messageSpan.appendChild(typeof part === 'string' ? document.createTextNode(part) : part);

		const allSpan = document.createElement('span');
		allSpan.className = kind;
		allSpan.appendChild(locSpan);
		allSpan.appendChild(messageSpan);
		return allSpan;
	};
});
//# sourceMappingURL=../../../meta/compile/browser-only/compileErrorToDomSpan.js.map