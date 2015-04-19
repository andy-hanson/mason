if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'esast/dist/private/tuple', '../CompileError', './Lang', './U/type', './U/util'], function (exports, _esastDistLoc, _esastDistPrivateTuple, _CompileError, _Lang, _UType, _UUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _Loc = _interopRequire(_esastDistLoc);

	var _tuple = _interopRequire(_esastDistPrivateTuple);

	var _type = _interopRequire(_UType);

	let Token = function Token() {
		_classCallCheck(this, Token);
	};

	exports.default = Token;

	const tt = function (name) {
		for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			namesTypes[_key - 1] = arguments[_key];
		}

		return _tuple(name, Token, 'doc', ['loc', _Loc].concat(namesTypes));
	};

	const gIs = function (k) {
		_type(k, _Lang.GroupKinds);
		return function (t) {
			return t instanceof Group && t.k === k;
		};
	};
	const kwIs = function (k) {
		if (k instanceof Set) return function (t) {
			return t instanceof Keyword && k.has(t.k);
		};else {
			_type(k, _Lang.AllKeywords);
			return function (t) {
				return t instanceof Keyword && t.k === k;
			};
		}
	};

	const Name = tt('Name', 'name', String),
	      Group = Object.assign(tt('Group', 'tokens', [Token], 'k', _Lang.GroupKinds), {
		isBlock: gIs('->'),
		isLine: gIs('ln'),
		isSpaced: gIs('sp')
	}),
	      Keyword = Object.assign(tt('Keyword', 'k', _Lang.AllKeywords), {
		is: kwIs,
		isBar: kwIs('|'),
		isCaseOrCaseDo: kwIs(_Lang.CaseKeywords),
		isColon: kwIs(':'),
		isFocus: kwIs('_'),
		isElse: kwIs('else'),
		isLineSplit: kwIs(_Lang.LineSplitKeywords),
		isTilde: kwIs('~'),
		isObjAssign: kwIs('. ')
	}),
	     
	// k: Number | String | 'js'
	Literal = tt('Literal', 'value', String, 'k', Object),
	      CallOnFocus = tt('CallOnFocus', 'name', String),
	      DotName = tt('DotName', 'nDots', Number, 'name', String);

	exports.Name = Name;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Literal = Literal;
	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	const show = _UUtil.implementMany2('show', [[CallOnFocus, function () {
		return '_';
	}], [DotName, function (_) {
		return '.'.repeat(_.nDots) + _.name;
	}], [Group, function (_) {
		return '' + _.k + '...' + _Lang.GroupOpenToClose.get(_.k);
	}], [Keyword, function (_) {
		return _.k;
	}], [Literal, function (_) {
		return _.value;
	}], [Name, function (_) {
		return _.name;
	}]]);
	Object.assign(Token.prototype, {
		toString: function () {
			return _CompileError.code(show(this));
		}
	});
});
//# sourceMappingURL=../../../meta/compile/private/Token.js.map