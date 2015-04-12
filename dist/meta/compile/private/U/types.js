if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "./type", "./util"], function (exports, _type, _util) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	exports.ObjType = ObjType;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var type = _interopRequire(_type);

	var assert = _util.assert;
	const tuple = function (superType) {
		for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			namesTypes[_key - 1] = arguments[_key];
		}

		let names = [];
		assert(namesTypes.length % 2 === 0);
		for (let i = 0; i < namesTypes.length; i = i + 2) names.push(namesTypes[i]);
		let args = names.join(", ");

		let body = "return function ctr(" + args + ") { if (!(this instanceof ctr)) return new ctr(" + args + ");";
		names.forEach(function (name) {
			body = body + ("this." + name + " = " + name + ";");
		});
		body = body + "}";
		const ctr = Function(body)();
		ctr.prototype = Object.assign(Object.create(superType.prototype), {
			constructor: ctr,
			toString: function () {
				return inspect(this);
			}
		});
		return ctr;
	};

	exports.tuple = tuple;

	function ObjType(name, superType, members) {
		type(name, String, superType, Object, members, Object);
		const prototype = Object.create(superType.prototype);
		Object.keys(members).forEach(function (key) {
			return type(members[key], Object);
		});

		let s = "return function(props) { const _ = Object.create(prototype);";
		Object.keys(members).forEach(function (member) {
			s = s + ("_[\"" + member + "\"] = props[\"" + member + "\"];");
		});
		s = s + "return _}";
		const theType = Function("prototype", s)(prototype);

		theType.displayName = name;
		theType.toString = function () {
			return name;
		};
		theType.prototype = prototype;
		Object.assign(theType.prototype, {
			constructor: theType,
			toString: function () {
				return inspect(this);
			}
		});

		return theType;
	}

	function inspect(_) {
		const indented = function (str) {
			return str.replace(/\n/g, "\n\t");
		};

		let s = (_.constructor.displayName || _.constructor.name) + " {";
		Object.keys(_).forEach(function (key) {
			const val = _[key];
			const str = val instanceof Array ? val.join(",\n") : toStr(val);
			s = s + ("\n\t" + key + ": " + indented(str));
		});
		return s + "\n}";
	}

	const toStr = function (_) {
		return _ === null ? "null" : _ === undefined ? "undefined" : _.toString();
	};
});
//# sourceMappingURL=../../../../meta/compile/private/U/types.js.map