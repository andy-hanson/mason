if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './util'], function (exports, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	/*
 Cheap-ass option type.
 It's just an array with 0 or 1 elements.
 */

	// This constructs an Op *type*. Use Op.Some and Op.None to construct instances.
	exports.default = Op;
	exports.some = some;
	exports.opIf = opIf;
	exports.ifElse = ifElse;

	function Op(opType) {
		const op = Object.create(Op.prototype);
		op.type = opType;
		return Object.freeze(op);
	}

	Object.assign(Op.prototype, {
		getName: function () {
			return 'Op(' + this.type.getName() + ')';
		},
		toString: function () {
			return this.getName();
		}
	});

	const None = [];
	exports.None = None;

	function some(_) {
		return [_];
	}

	function opIf(cond, then) {
		return cond ? some(then()) : None;
	}

	function ifElse(op, ifSome, ifNone) {
		if (op.length === 0) return ifNone();else {
			_util.assert(op.length === 1);
			return ifSome(op[0]);
		}
	}
});
//# sourceMappingURL=../../../../meta/compile/private/U/Op.js.map