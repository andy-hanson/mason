if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/Bag', '../U/Op', '../U/util', './parseLine', './vars'], function (exports, _Expression, _Token, _UBag, _UOp, _UUtil, _parseLine, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _parseLine2 = _interopRequire(_parseLine);

	const takeBlockLinesFromEnd = function () {
		_vars.check(!_vars.tokens.isEmpty(), 'Expected an indented block');
		const l = _vars.tokens.last();
		_vars.cx.check(_Token.Group.isBlock(l), l.loc, 'Expected an indented block at the end');
		return { before: _vars.tokens.rtail(), lines: l.tokens };
	},
	      blockWrap = function () {
		return _Expression.BlockWrap(_vars.loc, parseBody('val'));
	},
	      justBlockDo = function () {
		var _takeBlockDoFromEnd = takeBlockDoFromEnd();

		const before = _takeBlockDoFromEnd.before;
		const block = _takeBlockDoFromEnd.block;

		_vars.check(before.isEmpty(), 'Expected just a block.');
		return block;
	},
	      justBlockVal = function () {
		var _takeBlockValFromEnd = takeBlockValFromEnd();

		const before = _takeBlockValFromEnd.before;
		const block = _takeBlockValFromEnd.block;

		_vars.check(before.isEmpty(), 'Expected just a block.');
		return block;
	},
	      takeBlockDoFromEnd = function () {
		var _takeBlockLinesFromEnd = takeBlockLinesFromEnd();

		const before = _takeBlockLinesFromEnd.before;
		const lines = _takeBlockLinesFromEnd.lines;

		const block = _vars.w(lines, parseBodyDo);
		return { before: before, block: block };
	},
	      takeBlockValFromEnd = function () {
		var _takeBlockLinesFromEnd2 = takeBlockLinesFromEnd();

		const before = _takeBlockLinesFromEnd2.before;
		const lines = _takeBlockLinesFromEnd2.lines;

		const block = _vars.w(lines, parseBody, 'val');
		return { before: before, block: block };
	},
	     

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = function () {
		return parseBody('module');
	},
	      parseBlockFromLines = function () {
		return parseBody('any');
	},
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = function () {
		const h = _vars.tokens.head();
		_vars.cx.check(_vars.tokens.size() > 1, h.loc, function () {
			return 'Expected indented block after ' + h;
		});
		const block = _vars.tokens.second();
		_UUtil.assert(_vars.tokens.size() === 2 && _Token.Group.isBlock(block));
		return block.tokens.flatMap(function (line) {
			return _vars.w(line.tokens, _parseLine.parseLineOrLines);
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
	const parseBodyDo = function () {
		var _parseBlockLines = parseBlockLines();

		const eLines = _parseBlockLines.eLines;
		const kReturn = _parseBlockLines.kReturn;

		_vars.check(kReturn === 'plain', 'Can not make ' + kReturn + ' in statement context.');
		return _Expression.BlockDo(_vars.loc, eLines);
	},
	      parseBody = function (k) {
		_UUtil.assert(k === 'val' || k === 'module' || k === 'any');

		// keys only matter if kReturn === 'obj'

		var _parseBlockLines2 = parseBlockLines();

		const eLines = _parseBlockLines2.eLines;
		const kReturn = _parseBlockLines2.kReturn;
		const listLength = _parseBlockLines2.listLength;
		const mapLength = _parseBlockLines2.mapLength;
		const objKeys = _parseBlockLines2.objKeys;
		const debugKeys = _parseBlockLines2.debugKeys;

		var _ref = (function () {
			if (kReturn === 'bag') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ListReturn(_vars.loc, listLength))
			};
			if (kReturn === 'map') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.MapReturn(_vars.loc, mapLength))
			};

			const lastReturn = !_UBag.isEmpty(eLines) && _UBag.last(eLines) instanceof _Expression.Val;
			if (kReturn === 'obj' && k !== 'module') return lastReturn ? {
				doLines: _UBag.rtail(eLines),
				opReturn: _UOp.some(_Expression.ObjReturn(_vars.loc, objKeys, debugKeys, _UOp.some(_UBag.last(eLines)),
				// displayName is filled in by parseAssign.

				// displayName is filled in by parseAssign.
				_UOp.None))
			} : {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ObjReturn(_vars.loc, objKeys, debugKeys, _UOp.None, _UOp.None))
			};else return lastReturn ? { doLines: _UBag.rtail(eLines), opReturn: _UOp.some(_UBag.last(eLines)) } : { doLines: eLines, opReturn: _UOp.None };
		})();

		const doLines = _ref.doLines;
		const opReturn = _ref.opReturn;

		switch (k) {
			case 'val':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(_vars.loc, doLines, returned);
				}, function () {
					return _vars.cx.fail('Expected a value block.');
				});
			case 'any':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(_vars.loc, doLines, returned);
				}, function () {
					return _Expression.BlockDo(_vars.loc, doLines);
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
					return _Expression.BlockDo(_vars.loc, lines);
				}
			default:
				throw new Error(k);
		}
	},
	      parseBlockLines = function () {
		const lines = _vars.tokens;
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
			return addLine(_vars.w(line.tokens, _parseLine2, listLength));
		});

		const isObj = !(_UBag.isEmpty(objKeys) && _UBag.isEmpty(debugKeys));
		// TODO
		// if (isEmpty(objKeys))
		//	cx.check(isEmpty(debugKeys), loc, 'Block can't have only debug keys')
		const isBag = listLength > 0;
		const isMap = mapLength > 0;
		_vars.check(!(isObj && isBag), 'Block has both Bag and Obj lines.');
		_vars.check(!(isObj && isMap), 'Block has both Obj and Map lines.');
		_vars.check(!(isBag && isMap), 'Block has both Bag and Map lines.');

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
		return { eLines: eLines, kReturn: kReturn, listLength: listLength, mapLength: mapLength, objKeys: objKeys, debugKeys: debugKeys };
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseBlock.js.map