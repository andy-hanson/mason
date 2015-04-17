if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/Bag', '../U/Op', '../U/type', '../U/util', './Px', './parseLine'], function (exports, _Expression, _Token, _UBag, _UOp, _UType, _UUtil, _Px, _parseLine) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _type = _interopRequire(_UType);

	var _Px2 = _interopRequire(_Px);

	const parseLine_ = function () {
		return _parseLine.default;
	};
	const parseLineOrLines_ = function () {
		return _parseLine.parseLineOrLines;
	};

	const takeBlockLinesFromEnd = function (px) {
		_type(px, _Px2);
		px.check(!px.tokens.isEmpty(), 'Expected an indented block');
		const l = px.tokens.last();
		px.check(_Token.Group.isBlock(l), l.loc, 'Expected an indented block at the end');
		return { before: px.tokens.rtail(), lines: l.tokens };
	},
	      blockWrap = function (px) {
		return _Expression.BlockWrap(px.loc, parseBody(px, 'val'));
	},
	      justBlockDo = function (px) {
		var _takeBlockDoFromEnd = takeBlockDoFromEnd(px);

		const before = _takeBlockDoFromEnd.before;
		const block = _takeBlockDoFromEnd.block;

		px.check(before.isEmpty(), 'Expected just a block.');
		return block;
	},
	      justBlockVal = function (px) {
		var _takeBlockValFromEnd = takeBlockValFromEnd(px);

		const before = _takeBlockValFromEnd.before;
		const block = _takeBlockValFromEnd.block;

		px.check(before.isEmpty(), 'Expected just a block.');
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
		var _takeBlockLinesFromEnd2 = takeBlockLinesFromEnd(px);

		const before = _takeBlockLinesFromEnd2.before;
		const lines = _takeBlockLinesFromEnd2.lines;

		const block = px.w(lines, parseBody, 'val');
		return { before: before, block: block };
	},
	     

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = function (px) {
		return parseBody(px, 'module');
	},
	      parseBlockFromLines = function (px) {
		return parseBody(px, 'any');
	},
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = function (px) {
		const h = px.tokens.head();
		px.check(px.tokens.size() > 1, h.loc, function () {
			return 'Expected indented block after ' + h;
		});
		const block = px.tokens.second();
		_UUtil.assert(px.tokens.size() === 2 && _Token.Group.isBlock(block));
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

		px.check(kReturn === 'plain', 'Can not make ' + kReturn + ' in statement context.');
		return _Expression.BlockDo(px.loc, eLines);
	},
	      parseBody = function (px, k) {
		_UUtil.assert(k === 'val' || k === 'module' || k === 'any');

		// keys only matter if kReturn === 'obj'

		var _parseBlockLines2 = parseBlockLines(px);

		const eLines = _parseBlockLines2.eLines;
		const kReturn = _parseBlockLines2.kReturn;
		const listLength = _parseBlockLines2.listLength;
		const mapLength = _parseBlockLines2.mapLength;
		const objKeys = _parseBlockLines2.objKeys;
		const debugKeys = _parseBlockLines2.debugKeys;

		var _ref = (function () {
			if (kReturn === 'bag') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ListReturn(px.loc, listLength))
			};
			if (kReturn === 'map') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.MapReturn(px.loc, mapLength))
			};

			const lastReturn = !_UBag.isEmpty(eLines) && _UBag.last(eLines) instanceof _Expression.Val;
			if (kReturn === 'obj' && k !== 'module') return lastReturn ? {
				doLines: _UBag.rtail(eLines),
				opReturn: _UOp.some(_Expression.ObjReturn(px.loc, objKeys, debugKeys, _UOp.some(_UBag.last(eLines)),
				// displayName is filled in by parseAssign.

				// displayName is filled in by parseAssign.
				_UOp.None))
			} : {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ObjReturn(px.loc, objKeys, debugKeys, _UOp.None, _UOp.None))
			};else return lastReturn ? { doLines: _UBag.rtail(eLines), opReturn: _UOp.some(_UBag.last(eLines)) } : { doLines: eLines, opReturn: _UOp.None };
		})();

		const doLines = _ref.doLines;
		const opReturn = _ref.opReturn;

		switch (k) {
			case 'val':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(px.loc, doLines, returned);
				}, function () {
					return px.fail('Expected a value block.');
				});
			case 'any':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(px.loc, doLines, returned);
				}, function () {
					return _Expression.BlockDo(px.loc, doLines);
				});
			case 'module':
				{
					// TODO: Handle debug-only exports
					const lines =
					// Turn Obj assigns into exports.
					_UBag.cat(doLines.map(function (line) {
						if (line instanceof _Expression.Assign && line.k === '. ') line.k = 'export';
						return line;
					}), opReturn.map(function (ret) {
						return _Expression.ModuleDefaultExport(ret.loc, ret);
					}));
					return _Expression.BlockDo(px.loc, lines);
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
				if (ln instanceof _Expression.Debug) ln.lines.forEach(function (_) {
					return addLine(_, true);
				});else if (ln instanceof _Expression.ListEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug list entries');
					// When ListEntries are first created they have no index.
					_UUtil.assert(ln.index === -1);
					ln.index = listLength;
					listLength = listLength + 1;
				} else if (ln instanceof _Expression.MapEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug map entries');
					_UUtil.assert(ln.index === -1);
					ln.index = mapLength;
					mapLength = mapLength + 1;
				} else if (ln instanceof _Expression.Assign && ln.k === '. ') (inDebug ? debugKeys : objKeys).push(ln.assignee);

				if (!inDebug)
					// Else we are adding the Debug as a single line.
					eLines.push(ln);
			}
		};
		lines.each(function (line) {
			return addLine(px.w(line.tokens, parseLine_(), listLength));
		});

		const isObj = !(_UBag.isEmpty(objKeys) && _UBag.isEmpty(debugKeys));
		// TODO
		// if (isEmpty(objKeys))
		//	px.check(isEmpty(debugKeys), px.loc, 'Block can't have only debug keys')
		const isBag = listLength > 0;
		const isMap = mapLength > 0;
		px.check(!(isObj && isBag), 'Block has both Bag and Obj lines.');
		px.check(!(isObj && isMap), 'Block has both Obj and Map lines.');
		px.check(!(isBag && isMap), 'Block has both Bag and Map lines.');

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
		return { eLines: eLines, kReturn: kReturn, listLength: listLength, mapLength: mapLength, objKeys: objKeys, debugKeys: debugKeys };
	};
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseBlock.js.map