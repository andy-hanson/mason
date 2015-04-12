if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "../../Expression", "../Token", "../U/Bag", "../U/Op", "../U/type", "../U/util", "./Px", "./parseLine"], function (exports, _Expression, _Token, _UBag, _UOp, _UType, _UUtil, _Px, _parseLine) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Assign = _Expression.Assign;
	var BlockDo = _Expression.BlockDo;
	var BlockVal = _Expression.BlockVal;
	var BlockWrap = _Expression.BlockWrap;
	var Debug = _Expression.Debug;
	var ObjReturn = _Expression.ObjReturn;
	var ListEntry = _Expression.ListEntry;
	var ListReturn = _Expression.ListReturn;
	var ELiteral = _Expression.ELiteral;
	var LocalDeclare = _Expression.LocalDeclare;
	var MapReturn = _Expression.MapReturn;
	var MapEntry = _Expression.MapEntry;
	var Module = _Expression.Module;
	var ModuleDefaultExport = _Expression.ModuleDefaultExport;
	var Val = _Expression.Val;
	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var cat = _UBag.cat;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;
	var rtail = _UBag.rtail;
	var ifElse = _UOp.ifElse;
	var None = _UOp.None;
	var some = _UOp.some;

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var lazy = _UUtil.lazy;

	var Px = _interopRequire(_Px);

	// TODO:ES6
	var PL = _parseLine;

	const parseLine_ = function () {
		return PL.default;
	};
	const parseLineOrLines_ = function () {
		return PL.parseLineOrLines;
	};

	const takeBlockLinesFromEnd = function (px) {
		type(px, Px);
		px.check(!px.tokens.isEmpty(), "Expected an indented block");
		const l = px.tokens.last();
		px.check(Group.isBlock(l), l.loc, "Expected an indented block at the end");
		return { before: px.tokens.rtail(), lines: l.tokens };
	},
	      blockWrap = function (px) {
		return BlockWrap(px.loc, parseBody(px, "val"));
	},
	      justBlockDo = function (px) {
		var _takeBlockDoFromEnd = takeBlockDoFromEnd(px);

		const before = _takeBlockDoFromEnd.before;
		const block = _takeBlockDoFromEnd.block;

		px.check(before.isEmpty(), "Expected just a block.");
		return block;
	},
	      justBlockVal = function (px) {
		var _takeBlockValFromEnd = takeBlockValFromEnd(px);

		const before = _takeBlockValFromEnd.before;
		const block = _takeBlockValFromEnd.block;

		px.check(before.isEmpty(), "Expected just a block.");
		return block;
	},
	      takeBlockDoFromEnd = function (px) {
		var _takeBlockLinesFromEnd = takeBlockLinesFromEnd(px);

		const before = _takeBlockLinesFromEnd.before;
		const lines = _takeBlockLinesFromEnd.lines;

		const block = px.w(lines, parseBodyDo);
		return { before: before, block: block };
	},
	      takeBlockValFromEnd = function (px) {
		var _takeBlockLinesFromEnd = takeBlockLinesFromEnd(px);

		const before = _takeBlockLinesFromEnd.before;
		const lines = _takeBlockLinesFromEnd.lines;

		const block = px.w(lines, parseBody, "val");
		return { before: before, block: block };
	},
	     

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = function (px) {
		return parseBody(px, "module");
	},
	      parseBlockFromLines = function (px) {
		return parseBody(px, "any");
	},
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = function (px) {
		const h = px.tokens.head();
		px.check(px.tokens.size() > 1, h.loc, function () {
			return "Expected indented block after " + h;
		});
		const block = px.tokens.second();
		assert(px.tokens.size() === 2 && Group.isBlock(block));
		return block.tokens.flatMap(function (line) {
			return px.w(line.tokens, parseLineOrLines_());
		});
	};

	exports.takeBlockLinesFromEnd = takeBlockLinesFromEnd;
	exports.blockWrap = blockWrap;
	exports.justBlockDo = justBlockDo;
	exports.justBlockVal = justBlockVal;
	exports.takeBlockDoFromEnd = takeBlockDoFromEnd;
	exports.takeBlockValFromEnd = takeBlockValFromEnd;
	exports.parseModuleBody = parseModuleBody;
	exports.parseBlockFromLines = parseBlockFromLines;
	exports.parseLinesFromBlock = parseLinesFromBlock;
	const parseBodyDo = function (px) {
		var _parseBlockLines = parseBlockLines(px);

		const eLines = _parseBlockLines.eLines;
		const kReturn = _parseBlockLines.kReturn;

		px.check(kReturn === "plain", "Can not make " + kReturn + " in statement context.");
		return BlockDo(px.loc, eLines);
	},
	      parseBody = function (px, k) {
		assert(k === "val" || k === "module" || k === "any");

		// keys only matter if kReturn === 'obj'

		var _parseBlockLines = parseBlockLines(px);

		const eLines = _parseBlockLines.eLines;
		const kReturn = _parseBlockLines.kReturn;
		const listLength = _parseBlockLines.listLength;
		const mapLength = _parseBlockLines.mapLength;
		const objKeys = _parseBlockLines.objKeys;
		const debugKeys = _parseBlockLines.debugKeys;

		var _ref = (function () {
			if (kReturn === "bag") return {
				doLines: eLines,
				opReturn: some(ListReturn(px.loc, listLength))
			};
			if (kReturn === "map") return {
				doLines: eLines,
				opReturn: some(MapReturn(px.loc, mapLength))
			};

			const lastReturn = !isEmpty(eLines) && last(eLines) instanceof Val;
			if (kReturn === "obj" && k !== "module") return lastReturn ? {
				doLines: rtail(eLines),
				opReturn: some(ObjReturn(px.loc, objKeys, debugKeys, some(last(eLines)),
				// displayName is filled in by parseAssign.
				None))
			} : {
				doLines: eLines,
				opReturn: some(ObjReturn(px.loc, objKeys, debugKeys, None,
				// displayName is filled in by parseAssign.
				None))
			};else return lastReturn ? { doLines: rtail(eLines), opReturn: some(last(eLines)) } : { doLines: eLines, opReturn: None };
		})();

		const doLines = _ref.doLines;
		const opReturn = _ref.opReturn;

		switch (k) {
			case "val":
				return ifElse(opReturn, function (returned) {
					return BlockVal(px.loc, doLines, returned);
				}, function () {
					return px.fail("Expected a value block.");
				});
			case "any":
				return ifElse(opReturn, function (returned) {
					return BlockVal(px.loc, doLines, returned);
				}, function () {
					return BlockDo(px.loc, doLines);
				});
			case "module":
				{
					// TODO: Handle debug-only exports
					const lines =
					// Turn Obj assigns into exports.
					cat(doLines.map(function (line) {
						if (line instanceof Assign && line.k === ". ") line.k = "export";
						return line;
					}), opReturn.map(function (ret) {
						return ModuleDefaultExport(ret.loc, ret);
					}));
					return BlockDo(px.loc, lines);
				}
			default:
				throw new Error(k);
		}
	},
	      parseBlockLines = function (px) {
		const lines = px.tokens;
		const objKeys = [],
		      debugKeys = [];
		let listLength = 0,
		    mapLength = 0;
		const eLines = [];
		const addLine = function (ln, inDebug) {
			if (ln instanceof Array) ln.forEach(function (_) {
				return addLine(_, inDebug);
			});else {
				if (ln instanceof Debug) ln.lines.forEach(function (_) {
					return addLine(_, true);
				});else if (ln instanceof ListEntry) {
					assert(!inDebug, "Not supported: debug list entries");
					// When ListEntries are first created they have no index.
					assert(ln.index === -1);
					ln.index = listLength;
					listLength = listLength + 1;
				} else if (ln instanceof MapEntry) {
					assert(!inDebug, "Not supported: debug map entries");
					assert(ln.index === -1);
					ln.index = mapLength;
					mapLength = mapLength + 1;
				} else if (ln instanceof Assign && ln.k === ". ") (inDebug ? debugKeys : objKeys).push(ln.assignee);

				if (!inDebug) eLines.push(ln);
			}
		};
		lines.each(function (line) {
			return addLine(px.w(line.tokens, parseLine_(), listLength));
		});

		const isObj = !(isEmpty(objKeys) && isEmpty(debugKeys));
		// TODO
		// if (isEmpty(objKeys))
		//	px.check(isEmpty(debugKeys), px.loc, 'Block can't have only debug keys')
		const isBag = listLength > 0;
		const isMap = mapLength > 0;
		px.check(!(isObj && isBag), "Block has both Bag and Obj lines.");
		px.check(!(isObj && isMap), "Block has both Obj and Map lines.");
		px.check(!(isBag && isMap), "Block has both Bag and Map lines.");

		const kReturn = isObj ? "obj" : isBag ? "bag" : isMap ? "map" : "plain";
		return { eLines: eLines, kReturn: kReturn, listLength: listLength, mapLength: mapLength, objKeys: objKeys, debugKeys: debugKeys };
	};
});
// Else we are adding the Debug as a single line.
//# sourceMappingURL=../../../../meta/compile/private/parse/parseBlock.js.map