if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../../Expression", "../Lang", "../Token", "../U/Bag", "../U/Op", "../U/type", "../U/util", "./parseCase", "./parseExpr", "./parseLocalDeclares", "./Px", "./parseBlock"], function (exports, _Expression, _Lang, _Token, _UBag, _UOp, _UType, _UUtil, _parseCase, _parseExpr, _parseLocalDeclares, _Px, _parseBlock) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	// Returns line or sq of lines
	exports.default = parseLine;
	exports.parseLineOrLines = parseLineOrLines;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var E = _interopRequire(_Expression);

	var Assign = _Expression.Assign;
	var AssignDestructure = _Expression.AssignDestructure;
	var BlockWrap = _Expression.BlockWrap;
	var Call = _Expression.Call;
	var Debug = _Expression.Debug;
	var GlobalAccess = _Expression.GlobalAccess;
	var ObjReturn = _Expression.ObjReturn;
	var Fun = _Expression.Fun;
	var EndLoop = _Expression.EndLoop;
	var ListEntry = _Expression.ListEntry;
	var Loop = _Expression.Loop;
	var MapEntry = _Expression.MapEntry;
	var Special = _Expression.Special;
	var Yield = _Expression.Yield;
	var YieldTo = _Expression.YieldTo;
	var defaultLoopName = _Lang.defaultLoopName;
	var LineSplitKeywords = _Lang.LineSplitKeywords;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var Name = _Token.Name;
	var head = _UBag.head;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;
	var opSplitOnceWhere = _UBag.opSplitOnceWhere;
	var ifElse = _UOp.ifElse;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var parseCase = _parseCase.parseCase;

	var parseExpr = _interopRequire(_parseExpr);

	var parseLocalDeclares = _interopRequire(_parseLocalDeclares);

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PB = _parseBlock;

	function parseLine(px) {
		type(px, Px);

		const h = px.tokens.head();
		const rest = px.tokens.tail();

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (h instanceof Keyword) switch (h.k) {
			case ". ":
				// Index is set by parseBlock.
				return ListEntry(px.loc, px.w(rest, parseExpr), -1);
			case "case!":
				return px.w(rest, parseCase, "case!", false);
			case "debug":
				return Group.isBlock(px.tokens.second()) ?
				// `debug`, then indented block
				Debug(px.loc, PB.parseLinesFromBlock(px)) :
				// `debug`, then single line
				Debug(px.loc, px.w(rest, parseLineOrLines));
			case "debugger":
				px.checkEmpty(rest, function () {
					return "Did not expect anything after " + h;
				});
				return Special.debugger(px.loc);
			case "end-loop!":
				px.checkEmpty(rest, function () {
					return "Did not expect anything after " + h;
				});
				return EndLoop(px.loc);
			case "loop!":
				return Loop(px.loc, px.w(rest, PB.justBlockDo));
			case "region":
				return PB.parseLinesFromBlock(px);
			default:
			// fall through
		}

		return ifElse(px.tokens.opSplitOnceWhere(Keyword.isLineSplit), function (_ref) {
			let before = _ref.before;
			let at = _ref.at;
			let after = _ref.after;

			return at.k === "->" ? parseMapEntry(px, before, after) : parseAssign(px, before, at, after);
		}, function () {
			return parseExpr(px);
		});
	}

	function parseLineOrLines(px) {
		const _ = parseLine(px);
		return _ instanceof Array ? _ : [_];
	}

	function parseAssign(px, assigned, assigner, value) {
		let locals = px.w(assigned, parseLocalDeclares);
		const k = assigner.k;
		const eValuePre = value.isEmpty() ? GlobalAccess.true(px.loc) : px.w(value, parseExpr);

		let eValueNamed;
		if (locals.length === 1) {
			const name = head(locals).name;
			if (name === "doc") {
				if (eValuePre instanceof Fun)
					// KLUDGE: `doc` for module can be a Fun signature.
					// TODO: Something better...
					eValuePre.args.forEach(function (arg) {
						arg.okToNotUse = true;
					});
				eValueNamed = eValuePre;
			} else eValueNamed = tryAddDisplayName(eValuePre, name);
		} else eValueNamed = eValuePre;

		const isYield = k === "<~" || k === "<~~";

		const eValue = valueFromAssign(eValueNamed, k);

		if (isEmpty(locals)) {
			px.check(isYield, "Assignment to nothing");
			return eValue;
		}

		if (isYield) locals.forEach(function (_) {
			return px.check(_.k !== "lazy", _.loc, "Can not yield to lazy variable.");
		});

		if (k === ". ") locals.forEach(function (l) {
			l.okToNotUse = true;
		});

		if (locals.length === 1) {
			const assign = Assign(px.loc, locals[0], k, eValue);
			const isTest = assign.assignee.name.endsWith("test");
			return isTest && k === ". " ? Debug(px.loc, [assign]) : assign;
		} else {
			const isLazy = locals.some(function (l) {
				return l.isLazy;
			});
			if (isLazy) locals.forEach(function (_) {
				return px.check(_.isLazy, _.loc, "If any part of destructuring assign is lazy, all must be.");
			});
			return AssignDestructure(px.loc, locals, k, eValue, isLazy);
		}
	}

	function valueFromAssign(valuePre, kAssign) {
		switch (kAssign) {
			case "<~":
				return Yield(valuePre.loc, valuePre);
			case "<~~":
				return YieldTo(valuePre.loc, valuePre);
			default:
				return valuePre;
		}
	}

	// We give it a displayName if:
	// . It's a block
	// . It's a function
	// . It's one of those at the end of a block
	// . It's one of those as the end member of a call.
	function tryAddDisplayName(eValuePre, displayName) {
		type(eValuePre, E, displayName, String);
		switch (true) {
			case eValuePre instanceof Call && eValuePre.args.length > 0:
				// TODO: Immutable
				eValuePre.args[eValuePre.args.length - 1] = tryAddDisplayName(last(eValuePre.args), displayName);
				return eValuePre;

			case eValuePre instanceof Fun:
				return ObjReturn(eValuePre.loc, [], [], some(eValuePre), some(displayName));

			case eValuePre instanceof ObjReturn && !eValuePre.keys.some(function (key) {
				return key.name === "displayName";
			}):
				eValuePre.opDisplayName = some(displayName);
				return eValuePre;

			case eValuePre instanceof BlockWrap:
				{
					const block = eValuePre.block;
					block.returned = tryAddDisplayName(block.returned, displayName);
					return eValuePre;
				}

			default:
				return eValuePre;
		}
	}

	function parseMapEntry(px, before, after) {
		// TODO: index Filled in by ???
		return MapEntry(px.loc, px.w(before, parseExpr), px.w(after, parseExpr), -1);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseLine.js.map