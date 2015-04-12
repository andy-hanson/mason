if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "esast/dist/Loc", "../CompileError", "./Lang", "./U/type", "./U/types", "./U/util"], function (exports, _esastDistLoc, _CompileError, _Lang, _UType, _UTypes, _UUtil) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _slice = Array.prototype.slice;

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var Loc = _interopRequire(_esastDistLoc);

	var code = _CompileError.code;
	var AllKeywords = _Lang.AllKeywords;
	var CaseKeywords = _Lang.CaseKeywords;
	var GroupKinds = _Lang.GroupKinds;
	var GroupOpenToClose = _Lang.GroupOpenToClose;
	var LineSplitKeywords = _Lang.LineSplitKeywords;

	var type = _interopRequire(_UType);

	var tuple = _UTypes.tuple;
	var implementMany2 = _UUtil.implementMany2;

	let Token = function Token() {
		_classCallCheck(this, Token);
	};

	exports.default = Token;

	const tt = function () {
		return tuple.apply(undefined, [Token, "loc", Loc].concat(_slice.call(arguments)));
	};

	const gIs = function (k) {
		type(k, GroupKinds);
		return function (t) {
			return t instanceof Group && t.k === k;
		};
	};
	const kwIs = function (k) {
		if (k instanceof Set) return function (t) {
			return t instanceof Keyword && k.has(t.k);
		};else {
			type(k, AllKeywords);
			return function (t) {
				return t instanceof Keyword && t.k === k;
			};
		}
	};

	const Name = tt("name", String),
	      Group = Object.assign(tt("tokens", [Token], "k", GroupKinds), {
		isBlock: gIs("->"),
		isLine: gIs("ln"),
		isSpaced: gIs("sp")
	}),
	      Keyword = Object.assign(tt("k", AllKeywords), {
		is: kwIs,
		isBar: kwIs("|"),
		isCaseOrCaseDo: kwIs(CaseKeywords),
		isColon: kwIs(":"),
		isFocus: kwIs("_"),
		isElse: kwIs("else"),
		isLineSplit: kwIs(LineSplitKeywords),
		isTilde: kwIs("~"),
		isObjAssign: kwIs(". ")
	}),
	     
	// k: Number | String | 'js'
	Literal = tt("value", String, "k", Object),
	      CallOnFocus = tt("name", String),
	      DotName = tt("nDots", Number, "name", String);

	exports.Name = Name;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Literal = Literal;
	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	const show = implementMany2("show", [[CallOnFocus, function () {
		return "_";
	}], [DotName, function (_) {
		return ".".repeat(_.nDots) + _.name;
	}], [Group, function (_) {
		return "" + _.k + "..." + GroupOpenToClose.get(_.k);
	}], [Keyword, function (_) {
		return _.k;
	}], [Literal, function (_) {
		return _.value;
	}], [Name, function (_) {
		return _.name;
	}]]);
	Object.assign(Token.prototype, {
		toString: function () {
			return code(show(this));
		}
	});
});
//# sourceMappingURL=../../../meta/compile/private/Token.js.map