if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module'], function (exports, module) {
	'use strict';

	module.exports = function (path) {
		return path.replace(/!/g, 'bang').replace(/@/g, 'at').replace(/\?/g, 'q').replace(/\$/g, 'cash');
	};
});
//# sourceMappingURL=../../../meta/compile/private/manglePath.js.map