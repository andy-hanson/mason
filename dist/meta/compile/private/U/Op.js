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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvT3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzttQkFRd0IsRUFBRTtTQWVWLElBQUksR0FBSixJQUFJO1NBSUosSUFBSSxHQUFKLElBQUk7U0FJSixNQUFNLEdBQU4sTUFBTTs7QUF2QlAsVUFBUyxFQUFFLENBQUMsTUFBTSxFQUFFO0FBQ2xDLFFBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3RDLElBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBO0FBQ2hCLFNBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtFQUN4Qjs7QUFDRCxPQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7QUFDM0IsU0FBTyxFQUFBLFlBQUc7QUFDVCxrQkFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFHO0dBQ25DO0FBQ0QsVUFBUSxFQUFBLFlBQUc7QUFDVixVQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtHQUNyQjtFQUNELENBQUMsQ0FBQTs7QUFFSyxPQUFNLElBQUksR0FBRyxFQUFFLENBQUE7U0FBVCxJQUFJLEdBQUosSUFBSTs7QUFDVixVQUFTLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDdkIsU0FBTyxDQUFFLENBQUMsQ0FBRSxDQUFBO0VBQ1o7O0FBRU0sVUFBUyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNoQyxTQUFPLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7RUFDakM7O0FBRU0sVUFBUyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDMUMsTUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDbEIsT0FBTyxNQUFNLEVBQUUsQ0FBQSxLQUNYO0FBQ0osU0FuQ08sTUFBTSxDQW1DTixFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3ZCLFVBQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQ3BCO0VBQ0QiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVS9PcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4vdXRpbCdcblxuLypcbkNoZWFwLWFzcyBvcHRpb24gdHlwZS5cbkl0J3MganVzdCBhbiBhcnJheSB3aXRoIDAgb3IgMSBlbGVtZW50cy5cbiovXG5cbi8vIFRoaXMgY29uc3RydWN0cyBhbiBPcCAqdHlwZSouIFVzZSBPcC5Tb21lIGFuZCBPcC5Ob25lIHRvIGNvbnN0cnVjdCBpbnN0YW5jZXMuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcChvcFR5cGUpIHtcblx0Y29uc3Qgb3AgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSlcblx0b3AudHlwZSA9IG9wVHlwZVxuXHRyZXR1cm4gT2JqZWN0LmZyZWV6ZShvcClcbn1cbk9iamVjdC5hc3NpZ24oT3AucHJvdG90eXBlLCB7XG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIGBPcCgke3RoaXMudHlwZS5nZXROYW1lKCl9KWBcblx0fSxcblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TmFtZSgpXG5cdH1cbn0pXG5cbmV4cG9ydCBjb25zdCBOb25lID0gW11cbmV4cG9ydCBmdW5jdGlvbiBzb21lKF8pIHtcblx0cmV0dXJuIFsgXyBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcElmKGNvbmQsIHRoZW4pIHtcblx0cmV0dXJuIGNvbmQgPyBzb21lKHRoZW4oKSkgOiBOb25lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZkVsc2Uob3AsIGlmU29tZSwgaWZOb25lKSB7XG5cdGlmIChvcC5sZW5ndGggPT09IDApXG5cdFx0cmV0dXJuIGlmTm9uZSgpXG5cdGVsc2Uge1xuXHRcdGFzc2VydChvcC5sZW5ndGggPT09IDEpXG5cdFx0cmV0dXJuIGlmU29tZShvcFswXSlcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=