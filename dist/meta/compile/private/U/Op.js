if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// Cheap-ass option type.
	// It's just an array with 0 or 1 elements.

	// This constructs an Op *type*. Use some and None to construct instances.
	exports.default = Op;

	function Op(opType) {
		const op = Object.create(Op.prototype);
		op.type = opType;
		return Object.freeze(op);
	}

	Object.assign(Op.prototype, {
		getName: function () {
			return "Op(" + this.type.getName() + ")";
		},
		toString: function () {
			return this.getName();
		}
	});

	const None = [],
	      some = function (_) {
		return [_];
	},
	      opIf = function (cond, then) {
		return cond ? some(then()) : None;
	},
	      ifElse = function (op, ifSome, ifNone) {
		return op.length === 0 ? ifNone() : ifSome(op[0]);
	};
	exports.None = None;
	exports.some = some;
	exports.opIf = opIf;
	exports.ifElse = ifElse;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvT3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzttQkFJd0IsRUFBRTs7QUFBWCxVQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsUUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDdEMsSUFBRSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7QUFDaEIsU0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0VBQ3hCOztBQUNELE9BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUMzQixTQUFPLEVBQUEsWUFBRztBQUNULGtCQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQUc7R0FDbkM7QUFDRCxVQUFRLEVBQUEsWUFBRztBQUNWLFVBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0dBQ3JCO0VBQ0QsQ0FBQyxDQUFBOztBQUVLLE9BQ04sSUFBSSxHQUFHLEVBQUU7T0FDVCxJQUFJLEdBQUcsVUFBQSxDQUFDO1NBQUksQ0FBRSxDQUFDLENBQUU7RUFBQTtPQUVqQixJQUFJLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSTtTQUNqQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSTtFQUFBO09BRTNCLE1BQU0sR0FBRyxVQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTTtTQUMzQixFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsR0FDZCxNQUFNLEVBQUUsR0FDUixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQUEsQ0FBQTtTQVRmLElBQUksR0FBSixJQUFJO1NBQ0osSUFBSSxHQUFKLElBQUk7U0FFSixJQUFJLEdBQUosSUFBSTtTQUdKLE1BQU0sR0FBTixNQUFNIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1UvT3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDaGVhcC1hc3Mgb3B0aW9uIHR5cGUuXG4vLyBJdCdzIGp1c3QgYW4gYXJyYXkgd2l0aCAwIG9yIDEgZWxlbWVudHMuXG5cbi8vIFRoaXMgY29uc3RydWN0cyBhbiBPcCAqdHlwZSouIFVzZSBzb21lIGFuZCBOb25lIHRvIGNvbnN0cnVjdCBpbnN0YW5jZXMuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcChvcFR5cGUpIHtcblx0Y29uc3Qgb3AgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSlcblx0b3AudHlwZSA9IG9wVHlwZVxuXHRyZXR1cm4gT2JqZWN0LmZyZWV6ZShvcClcbn1cbk9iamVjdC5hc3NpZ24oT3AucHJvdG90eXBlLCB7XG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIGBPcCgke3RoaXMudHlwZS5nZXROYW1lKCl9KWBcblx0fSxcblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TmFtZSgpXG5cdH1cbn0pXG5cbmV4cG9ydCBjb25zdFxuXHROb25lID0gW10sXG5cdHNvbWUgPSBfID0+IFsgXyBdLFxuXG5cdG9wSWYgPSAoY29uZCwgdGhlbikgPT5cblx0XHRjb25kID8gc29tZSh0aGVuKCkpIDogTm9uZSxcblxuXHRpZkVsc2UgPSAob3AsIGlmU29tZSwgaWZOb25lKSA9PlxuXHRcdG9wLmxlbmd0aCA9PT0gMCA/XG5cdFx0XHRpZk5vbmUoKSA6XG5cdFx0XHRpZlNvbWUob3BbMF0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==