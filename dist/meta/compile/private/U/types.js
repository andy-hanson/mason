if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './type'], function (exports, _type) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.ObjType = ObjType;

	var _type2 = _interopRequire(_type);

	function ObjType(name, superType, members) {
		_type2(name, String, superType, Object, members, Object);
		const prototype = Object.create(superType.prototype);
		Object.keys(members).forEach(function (key) {
			return _type2(members[key], Object);
		});

		let s = 'return function(props) { const _ = Object.create(prototype);';
		Object.keys(members).forEach(function (member) {
			s = s + ('_["' + member + '"] = props["' + member + '"];');
		});
		s = s + 'return _}';
		const theType = Function('prototype', s)(prototype);

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
			return str.replace(/\n/g, '\n\t');
		};

		let s = (_.constructor.displayName || _.constructor.name) + ' {';
		Object.keys(_).forEach(function (key) {
			const val = _[key];
			const str = val instanceof Array ? val.join(',\n') : toStr(val);
			s = s + ('\n\t' + key + ': ' + indented(str));
		});
		return s + '\n}';
	}

	const toStr = function (_) {
		return _ === null ? 'null' : _ === undefined ? 'undefined' : _.toString();
	};
});
//# sourceMappingURL=../../../../meta/compile/private/U/types.js.map