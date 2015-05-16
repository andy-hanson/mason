if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'tupl/dist/tupl', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/op', '../U/util', './Slice'], function (exports, module, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _Slice) {
	'use strict';

	module.exports = parse;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	var _Slice2 = _interopRequire(_Slice);

	let cx;

	const WithObjKeys = (0, _tupl)('WithObjKeys', Object, 'Wraps an Do with keys for this block\'s Obj. Not meant to escape this file.', ['keys', [_Expression.LocalDeclare], 'line', _Expression.Do]);

	function parse(_cx, rootToken) {
		cx = _cx;
		return parseModule(_Slice2.group(rootToken));
	}

	const checkEmpty = function (tokens, message) {
		return cx.check(tokens.isEmpty(), tokens.loc, message);
	},
	      checkNonEmpty = function (tokens, message) {
		return cx.check(!tokens.isEmpty(), tokens.loc, message);
	},
	      unexpected = function (t) {
		return cx.fail(t.loc, 'Unexpected ' + t);
	};

	const parseModule = function (tokens) {
		var _tryParseUses = tryParseUses(_Token.KW_UseDo, tokens);

		var _tryParseUses2 = _slicedToArray(_tryParseUses, 2);

		const doUses = _tryParseUses2[0];
		const rest0 = _tryParseUses2[1];

		var _tryParseUses3 = tryParseUses(_Token.KW_Use, rest0);

		var _tryParseUses32 = _slicedToArray(_tryParseUses3, 2);

		const plainUses = _tryParseUses32[0];
		const rest1 = _tryParseUses32[1];

		var _tryParseUses4 = tryParseUses(_Token.KW_UseLazy, rest1);

		var _tryParseUses42 = _slicedToArray(_tryParseUses4, 2);

		const lazyUses = _tryParseUses42[0];
		const rest2 = _tryParseUses42[1];

		var _tryParseUses5 = tryParseUses(_Token.KW_UseDebug, rest2);

		var _tryParseUses52 = _slicedToArray(_tryParseUses5, 2);

		const debugUses = _tryParseUses52[0];
		const rest3 = _tryParseUses52[1];

		var _parseModuleBlock = parseModuleBlock(rest3);

		const lines = _parseModuleBlock.lines;
		const exports = _parseModuleBlock.exports;
		const opDefaultExport = _parseModuleBlock.opDefaultExport;

		if (cx.opts.doIncludeModuleName() && !exports.some(function (_) {
			return _.name === 'name';
		})) {
			const dn = _Expression.LocalDeclare.declareName(tokens.loc);
			lines.push((0, _Expression.Assign)(tokens.loc, dn, _Expression.Quote.forString(tokens.loc, cx.opts.moduleName())));
			exports.push(dn);
		}
		const uses = plainUses.concat(lazyUses);
		return (0, _Expression.Module)(tokens.loc, doUses, uses, debugUses, lines, exports, opDefaultExport);
	};

	// parseBlock
	const
	// Tokens on the line before a block, and tokens for the block itself.
	beforeAndBlock = function (tokens) {
		checkNonEmpty(tokens, 'Expected an indented block.');
		const block = tokens.last();
		cx.check(_Token.Group.isBlock(block), block.loc, 'Expected an indented block.');
		return [tokens.rtail(), _Slice2.group(block)];
	},
	      blockWrap = function (tokens) {
		return (0, _Expression.BlockWrap)(tokens.loc, parseBlockVal(tokens));
	},
	      justBlockDo = function (tokens) {
		return parseBlockDo(_justBlock(tokens));
	},
	      justBlockVal = function (tokens) {
		return parseBlockVal(_justBlock(tokens));
	},
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = function (tokens) {
		const h = tokens.head();
		cx.check(tokens.size() > 1, h.loc, function () {
			return 'Expected indented block after ' + h;
		});
		const block = tokens.second();
		(0, _UUtil.assert)(tokens.size() === 2 && _Token.Group.isBlock(block));
		return (0, _UBag.flatMap)(block.tokens, function (line) {
			return parseLineOrLines(_Slice2.group(line));
		});
	},
	      parseBlockDo = function (tokens) {
		// OK if last line is a Val, we'll just treat it as a Do.

		var _parseBlockLines2 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines2.allLines;
		const kReturn = _parseBlockLines2.kReturn;

		cx.check(kReturn === KReturn_Plain, tokens.loc, function () {
			return 'Can not make ' + kReturn + ' in statement context.';
		});
		return (0, _Expression.BlockDo)(tokens.loc, allLines);
	},
	      parseBlockVal = function (tokens) {
		const block = parseAnyBlock(tokens);
		cx.check(!(block instanceof _Expression.BlockDo), block.loc, 'Expected a value block.');
		return block;
	},
	      parseModuleBlock = function (tokens) {
		var _parseBlockLines3 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines3.allLines;
		const kReturn = _parseBlockLines3.kReturn;
		const exports = _parseBlockLines3.objKeys;

		const loc = tokens.loc;
		switch (kReturn) {
			case KReturn_Bag:case KReturn_Map:
				{
					const ctr = kReturn === KReturn_Bag ? _Expression.BlockBag : _Expression.BlockMap;
					return { lines: [], exports: exports, opDefaultExport: (0, _Expression.BlockWrap)(loc, ctr(loc, allLines)) };
				}
			default:
				var _tryTakeLastVal2 = _tryTakeLastVal(allLines),
				    lines = _tryTakeLastVal2.lines,
				    opDefaultExport = _tryTakeLastVal2.opVal;

				return { lines: lines, exports: exports, opDefaultExport: opDefaultExport };
		}
	},
	      parseAnyBlock = function (tokens) {
		var _parseBlockLines4 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines4.allLines;
		const kReturn = _parseBlockLines4.kReturn;
		const objKeys = _parseBlockLines4.objKeys;

		switch (kReturn) {
			case KReturn_Bag:
				return (0, _Expression.BlockBag)(tokens.loc, allLines);
			case KReturn_Map:
				return (0, _Expression.BlockMap)(tokens.loc, allLines);
			default:
				var _tryTakeLastVal3 = _tryTakeLastVal(allLines),
				    lines = _tryTakeLastVal3.lines,
				    opVal = _tryTakeLastVal3.opVal;

				return kReturn === KReturn_Obj ? (0, _Expression.BlockObj)(tokens.loc, lines, objKeys, opVal, null) : (0, _UOp.ifElse)(opVal, function (_) {
					return (0, _Expression.BlockWithReturn)(tokens.loc, lines, _);
				}, function () {
					return (0, _Expression.BlockDo)(tokens.loc, lines);
				});
		}
	};

	// parseBlock privates
	const _justBlock = function (tokens) {
		var _beforeAndBlock = beforeAndBlock(tokens);

		var _beforeAndBlock2 = _slicedToArray(_beforeAndBlock, 2);

		const before = _beforeAndBlock2[0];
		const block = _beforeAndBlock2[1];

		checkEmpty(before, 'Expected just a block.');
		return block;
	},
	      _tryTakeLastVal = function (lines) {
		return !(0, _UBag.isEmpty)(lines) && (0, _UBag.last)(lines) instanceof _Expression.Val ? { lines: (0, _UBag.rtail)(lines), opVal: (0, _UBag.last)(lines) } : { lines: lines, opVal: null };
	},
	      KReturn_Plain = 0,
	      KReturn_Obj = 1,
	      KReturn_Bag = 2,
	      KReturn_Map = 3,
	      _parseBlockLines = function (lines) {
		const objKeys = [];
		let isBag = false,
		    isMap = false;
		const checkLine = function (line, inDebug) {
			if (line instanceof _Expression.Debug) line.lines.forEach(function (_) {
				return checkLine(_, true);
			});else if (line instanceof _Expression.BagEntry) {
				cx.check(!inDebug, line.loc, 'Not supported: debug list entries');
				isBag = true;
			} else if (line instanceof _Expression.MapEntry) {
				cx.check(!inDebug, line.loc, 'Not supported: debug map entries');
				isMap = true;
			} else if (line instanceof WithObjKeys) objKeys.push.apply(objKeys, _toConsumableArray(line.keys));
		};
		const allLines = [];
		const addLine = function (line) {
			if (line instanceof Array) line.forEach(addLine);else {
				checkLine(line, false);
				allLines.push(line instanceof WithObjKeys ? line.line : line);
			}
		};
		lines.each(function (_) {
			return addLine(parseLine(_Slice2.group(_)));
		});

		const isObj = !(0, _UBag.isEmpty)(objKeys);
		cx.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		cx.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		cx.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

		const kReturn = isObj ? KReturn_Obj : isBag ? KReturn_Bag : isMap ? KReturn_Map : KReturn_Plain;
		return { allLines: allLines, kReturn: kReturn, objKeys: objKeys };
	};

	const parseCase = function (k, casedFromFun, tokens) {
		const isVal = k === _Token.KW_Case;

		var _beforeAndBlock3 = beforeAndBlock(tokens);

		var _beforeAndBlock32 = _slicedToArray(_beforeAndBlock3, 2);

		const before = _beforeAndBlock32[0];
		const block = _beforeAndBlock32[1];

		let opCased;
		if (casedFromFun) {
			checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.');
			opCased = null;
		} else opCased = (0, _UOp.opIf)(!before.isEmpty(), function () {
			return _Expression.Assign.focus(before.loc, parseExpr(before));
		});

		const lastLine = _Slice2.group(block.last());

		var _ref = _Token.Keyword.isElse(lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(lastLine.tail())] : [block, null];

		var _ref2 = _slicedToArray(_ref, 2);

		const partLines = _ref2[0];
		const opElse = _ref2[1];

		const parts = partLines.map(function (line) {
			line = _Slice2.group(line);

			var _beforeAndBlock4 = beforeAndBlock(line);

			var _beforeAndBlock42 = _slicedToArray(_beforeAndBlock4, 2);

			const before = _beforeAndBlock42[0];
			const block = _beforeAndBlock42[1];

			const test = _parseCaseTest(before);
			const result = (isVal ? parseBlockVal : parseBlockDo)(block);
			return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, result);
		});
		cx.check(parts.length > 0, tokens.loc, 'Must have at least 1 non-`else` test.');

		return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(tokens.loc, opCased, parts, opElse);
	};
	// parseCase privates
	const _parseCaseTest = function (tokens) {
		const first = tokens.head();
		// Pattern match starts with type test and is followed by local declares.
		// E.g., `:Some val`
		if (_Token.Group.isSpaced(first) && tokens.size() > 1) {
			const ft = _Slice2.group(first);
			if (_Token.Keyword.isType(ft.head())) {
				const type = parseSpaced(ft.tail());
				const locals = parseLocalDeclares(tokens.tail());
				return (0, _Expression.Pattern)(first.loc, type, locals, _Expression.LocalAccess.focus(tokens.loc));
			}
		}
		return parseExpr(tokens);
	};

	const parseExpr = function (tokens) {
		return (0, _UOp.ifElse)(tokens.opSplitManyWhere(_Token.Keyword.isObjAssign), function (splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			const tokensCaller = first.rtail();

			const pairs = [];
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const name = splits[i].before.last();
				cx.check(name instanceof _Token.Name, name.loc, function () {
					return 'Expected a name, not ' + name;
				});
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = parseExprPlain(tokensValue);
				const loc = (0, _Loc)(name.loc.start, tokensValue.loc.end);
				pairs.push((0, _Expression.ObjPair)(loc, name.name, value));
			}
			(0, _UUtil.assert)((0, _UBag.last)(splits).at === undefined);
			const val = (0, _Expression.ObjSimple)(tokens.loc, pairs);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = parseExprParts(tokensCaller);
				return (0, _Expression.Call)(tokens.loc, (0, _UBag.head)(parts), (0, _UBag.push)((0, _UBag.tail)(parts), val));
			}
		}, function () {
			return parseExprPlain(tokens);
		});
	},
	      parseExprParts = function (tokens) {
		const out = [];
		for (let i = tokens.start; i < tokens.end; i = i + 1) {
			const here = tokens.data[i];
			if (here instanceof _Token.Keyword) {
				const rest = function () {
					return tokens._chopStart(i + 1);
				};
				switch (here.kind) {
					case _Token.KW_Fun:case _Token.KW_GenFun:
						return (0, _UBag.push)(out, parseFun(here.kind === _Token.KW_GenFun, rest()));
					case _Token.KW_Case:
						return (0, _UBag.push)(out, parseCase(_Token.KW_Case, false, rest()));
					case _Token.KW_Yield:
						return (0, _UBag.push)(out, (0, _Expression.Yield)(tokens.loc, parseExpr(rest())));
					case _Token.KW_YieldTo:
						return (0, _UBag.push)(out, (0, _Expression.YieldTo)(tokens.loc, parseExpr(rest())));
					default:
					// fallthrough
				}
			}
			out.push(parseSingle(here));
		}
		return out;
	},
	      parseExprPlain = function (tokens) {
		const parts = parseExprParts(tokens);
		switch (parts.length) {
			case 0:
				cx.fail(tokens.loc, 'Expected an expression, got nothing.');
			case 1:
				return (0, _UBag.head)(parts);
			default:
				return (0, _Expression.Call)(tokens.loc, (0, _UBag.head)(parts), (0, _UBag.tail)(parts));
		}
	};

	const parseFun = function (isGenerator, tokens) {
		var _tryTakeReturnType2 = _tryTakeReturnType(tokens);

		const opReturnType = _tryTakeReturnType2.opReturnType;
		const rest = _tryTakeReturnType2.rest;

		checkNonEmpty(rest, function () {
			return 'Expected an indented block.';
		});

		var _funArgsAndBlock2 = _funArgsAndBlock(rest);

		const args = _funArgsAndBlock2.args;
		const opRestArg = _funArgsAndBlock2.opRestArg;
		const block = _funArgsAndBlock2.block;
		const opIn = _funArgsAndBlock2.opIn;
		const opOut = _funArgsAndBlock2.opOut;

		// Need res declare if there is a return type or out condition.
		const opResDeclare = (0, _UOp.ifElse)(opReturnType, function (_) {
			return (0, _Expression.LocalDeclareRes)(_.loc, _);
		}, function () {
			return (0, _UOp.opMap)(opOut, function (o) {
				return (0, _Expression.LocalDeclareRes)(o.loc, null);
			});
		});
		return (0, _Expression.Fun)(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isType((0, _UBag.head)(h.tokens))) return {
				opReturnType: parseSpaced(_Slice2.group(h).tail()),
				rest: tokens.tail()
			};
		}
		return { opReturnType: null, rest: tokens };
	},
	      _funArgsAndBlock = function (tokens) {
		const h = tokens.head();
		// Might be `|case`
		if (h instanceof _Token.Keyword && (h.kind === _Token.KW_Case || h.kind === _Token.KW_CaseDo)) {
			const eCase = parseCase(h.kind, true, tokens.tail());
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.kind === _Token.KW_Case ? {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _Expression.BlockWithReturn)(tokens.loc, [], eCase)
			} : {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _Expression.BlockDo)(tokens.loc, [eCase])
			};
		} else {
			var _beforeAndBlock5 = beforeAndBlock(tokens);

			var _beforeAndBlock52 = _slicedToArray(_beforeAndBlock5, 2);

			const before = _beforeAndBlock52[0];
			const block = _beforeAndBlock52[1];

			var _parseFunLocals2 = _parseFunLocals(before);

			const args = _parseFunLocals2.args;
			const opRestArg = _parseFunLocals2.opRestArg;

			var _tryTakeInOrOut2 = _tryTakeInOrOut(_Token.KW_In, block);

			var _tryTakeInOrOut22 = _slicedToArray(_tryTakeInOrOut2, 2);

			const opIn = _tryTakeInOrOut22[0];
			const rest0 = _tryTakeInOrOut22[1];

			var _tryTakeInOrOut3 = _tryTakeInOrOut(_Token.KW_Out, rest0);

			var _tryTakeInOrOut32 = _slicedToArray(_tryTakeInOrOut3, 2);

			const opOut = _tryTakeInOrOut32[0];
			const rest1 = _tryTakeInOrOut32[1];

			return { args: args, opRestArg: opRestArg, block: parseAnyBlock(rest1), opIn: opIn, opOut: opOut };
		}
	},
	      _parseFunLocals = function (tokens) {
		if (tokens.isEmpty()) return { args: [], opRestArg: null };else {
			const l = tokens.last();
			if (l instanceof _Token.DotName) {
				cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: _Expression.LocalDeclare.plain(l.loc, l.name)
				};
			} else return { args: parseLocalDeclares(tokens), opRestArg: null };
		}
	},
	      _tryTakeInOrOut = function (inOrOut, tokens) {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head();
			if (_Token.Keyword.is(inOrOut)((0, _UBag.head)(firstLine.tokens))) {
				const inOut = (0, _Expression.Debug)(firstLine.loc, parseLinesFromBlock(_Slice2.group(firstLine)));
				return [inOut, tokens.tail()];
			}
		}
		return [null, tokens];
	};

	const parseLine = function (tokens) {
		const h = tokens.head();
		const rest = tokens.tail();

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (h instanceof _Token.Keyword) switch (h.kind) {
			case _Token.KW_ObjAssign:
				// Index is set by parseBlock.
				return (0, _Expression.BagEntry)(tokens.loc, parseExpr(rest), -1);
			case _Token.KW_CaseDo:
				return parseCase(_Token.KW_CaseDo, false, rest);
			case _Token.KW_Debug:
				return (0, _Expression.Debug)(tokens.lok, _Token.Group.isBlock(tokens.second()) ?
				// `debug`, then indented block
				parseLinesFromBlock() :
				// `debug`, then single line
				parseLineOrLines(rest));
			case _Token.KW_Debugger:case _Token.KW_Pass:
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return h.kind === _Token.KW_Pass ? [] : _Expression.SpecialDo.debugger(tokens.loc);
			case _Token.KW_EndLoop:
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return (0, _Expression.EndLoop)(tokens.loc);
			case _Token.KW_Loop:
				return (0, _Expression.Loop)(tokens.loc, justBlockDo(rest));
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return (0, _UOp.ifElse)(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref3) {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

			return at.kind === _Token.KW_MapEntry ? _parseMapEntry(before, after, tokens.loc) : _parseAssign(before, at, after, tokens.loc);
		}, function () {
			return parseExpr(tokens);
		});
	},
	      parseLineOrLines = function (tokens) {
		const _ = parseLine(tokens);
		return _ instanceof Array ? _ : [_];
	};

	// parseLine privates
	const _parseAssign = function (localsTokens, assigner, valueTokens, loc) {
		const kind = assigner.kind;
		const locals = parseLocalDeclares(localsTokens);
		const opName = (0, _UOp.opIf)(locals.length === 1, function () {
			return locals[0].name;
		});
		const value = _parseAssignValue(kind, opName, valueTokens);

		const isYield = kind === _Token.KW_Yield || kind === _Token.KW_YieldTo;
		if ((0, _UBag.isEmpty)(locals)) {
			cx.check(isYield, localsTokens.loc, 'Assignment to nothing');
			return value;
		} else {
			if (isYield) locals.forEach(function (_) {
				return cx.check(!_.isLazy, _.loc, 'Can not yield to lazy variable.');
			});

			const isObjAssign = kind === _Token.KW_ObjAssign;
			const ass = (function () {
				if (locals.length === 1) {
					const assignee = locals[0];
					const assign = (0, _Expression.Assign)(loc, assignee, value);
					const isTest = isObjAssign && assignee.name.endsWith('test');
					return isTest ? (0, _Expression.Debug)(loc, [assign]) : assign;
				} else {
					const isLazy = locals.some(function (_) {
						return _.isLazy;
					});
					if (isLazy) locals.forEach(function (_) {
						return cx.check(_.isLazy, _.loc, 'If any part of destructuring assign is lazy, all must be.');
					});
					return (0, _Expression.AssignDestructure)(loc, locals, value, isLazy);
				}
			})();
			return isObjAssign ? WithObjKeys(locals, ass) : ass;
		}
	},
	      _parseAssignValue = function (kind, opName, valueTokens) {
		const value = valueTokens.isEmpty() && kind === _Token.KW_ObjAssign ? _Expression.SpecialVal.null(valueTokens.loc) : parseExpr(valueTokens);
		if (opName !== null) _tryAddName(value, opName);
		switch (kind) {
			case _Token.KW_Yield:
				return (0, _Expression.Yield)(value.loc, value);
			case _Token.KW_YieldTo:
				return (0, _Expression.YieldTo)(value.loc, value);
			default:
				return value;
		}
	},
	     

	// We give it a name if:
	// It's a function
	// It's an Obj block
	// It's an Obj block at the end of a call (as in `name = Obj-Type ...`)
	_tryAddName = function (_, name) {
		if (_ instanceof _Expression.Fun) _.name = name;else if (_ instanceof _Expression.Call && _.args.length > 0) _tryAddObjName((0, _UBag.last)(_.args), name);else _tryAddObjName(_, name);
	},
	      _tryAddObjName = function (_, name) {
		if (_ instanceof _Expression.BlockWrap) if (_.block instanceof _Expression.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _Expression.Fun) _.block.opObjed.name = name;else if (!_.block.keys.some(function (_) {
			return _.name === 'name';
		})) _.block.opName = name;
	},
	      _parseMapEntry = function (before, after, loc) {
		return (0, _Expression.MapEntry)(loc, parseExpr(before), parseExpr(after));
	};

	const parseLocalDeclares = function (tokens) {
		return tokens.map(parseLocalDeclare);
	},
	      parseLocalDeclare = function (t) {
		let name;
		let opType = null;
		let isLazy = false;

		if (_Token.Group.isSpaced(t)) {
			const tokens = _Slice2.group(t);
			let rest = tokens;
			if (_Token.Keyword.isLazy(tokens.head())) {
				isLazy = true;
				rest = tokens.tail();
			}
			name = _parseLocalName(rest.head());
			const rest2 = rest.tail();
			if (!rest2.isEmpty()) {
				const colon = rest2.head();
				cx.check(_Token.Keyword.isType(colon), colon.loc, function () {
					return 'Expected ' + (0, _CompileError.code)(':');
				});
				const tokensType = rest2.tail();
				checkNonEmpty(tokensType, function () {
					return 'Expected something after ' + colon;
				});
				opType = parseSpaced(tokensType);
			}
		} else name = _parseLocalName(t);

		return (0, _Expression.LocalDeclare)(t.loc, name, opType, isLazy);
	};

	// parseLocalDeclare privates
	const _parseLocalName = function (t) {
		if (_Token.Keyword.isFocus(t)) return '_';else {
			cx.check(t instanceof _Token.Name, t.loc, function () {
				return 'Expected a local name, not ' + t;
			});
			// TODO: Allow this?
			cx.check(!_Lang.JsGlobals.has(t.name), t.loc, function () {
				return 'Can not shadow global ' + (0, _CompileError.code)(t.name);
			});
			return t.name;
		}
	};

	const parseSingle = function (t) {
		return t instanceof _Token.Name ? _access(t.name, t.loc) : t instanceof _Token.Group ? (function () {
			switch (t.kind) {
				case _Token.G_Space:
					return parseSpaced(_Slice2.group(t));
				case _Token.G_Paren:
					return parseExpr(_Slice2.group(t));
				case _Token.G_Bracket:
					return (0, _Expression.BagSimple)(t.loc, parseExprParts(_Slice2.group(t)));
				case _Token.G_Block:
					return blockWrap(_Slice2.group(t));
				case _Token.G_Quote:
					return (0, _Expression.Quote)(t.loc, t.tokens.map(function (_) {
						return typeof _ === 'string' ? _ : parseSingle(_);
					}));
				default:
					unexpected(t);
			}
		})() : t instanceof _Token.TokenNumberLiteral ? (0, _Expression.NumberLiteral)(t.loc, t.value) : t instanceof _Token.CallOnFocus ? (0, _Expression.Call)(t.loc, _access(t.name, t.loc), [_Expression.LocalAccess.focus(t.loc)]) : t instanceof _Token.Keyword ? t.kind === _Token.KW_Focus ? _Expression.LocalAccess.focus(t.loc) : (0, _Expression.SpecialVal)(t.loc, (0, _Token.opKWtoSV)(t.kind) || unexpected(t)) : t instanceof _Token.DotName && t.nDots === 3 ? (0, _Expression.Splat)(t.loc, (0, _Expression.LocalAccess)(t.loc, t.name)) : unexpected(t);
	};

	// parseSingle privates
	const _access = function (name, loc) {
		return _Lang.JsGlobals.has(name) ? (0, _Expression.GlobalAccess)(loc, name) : (0, _Expression.LocalAccess)(loc, name);
	};

	const parseSpaced = function (tokens) {
		const h = tokens.head(),
		      rest = tokens.tail();
		if (_Token.Keyword.isType(h)) {
			const eType = parseSpaced(rest);
			const focus = _Expression.LocalAccess.focus(h.loc);
			return _Expression.Call.contains(h.loc, eType, focus);
		} else if (_Token.Keyword.isLazy(h)) return (0, _Expression.Lazy)(h.loc, parseSpaced(rest));else {
			const memberOrSubscript = function (e, t) {
				const loc = t.loc;
				if (t instanceof _Token.DotName) {
					cx.check(t.nDots === 1, tokens.loc, 'Too many dots!');
					return (0, _Expression.Member)(tokens.loc, e, t.name);
				} else if (t instanceof _Token.Group) {
					if (t.kind === _Token.G_Bracket) return _Expression.Call.sub(loc, (0, _UBag.unshift)(e, parseExprParts(_Slice2.group(t))));
					if (t.kind === _Token.G_Paren) {
						checkEmpty(_Slice2.group(t), function () {
							return 'Use ' + (0, _CompileError.code)('(a b)') + ', not ' + (0, _CompileError.code)('a(b)');
						});
						return (0, _Expression.Call)(tokens.loc, e, []);
					}
				} else cx.fail(tokens.loc, 'Expected member or sub, not ' + t);
			};
			return rest.reduce(memberOrSubscript, parseSingle(h));
		}
	};

	const tryParseUses = function (k, tokens) {
		if (!tokens.isEmpty()) {
			const line0 = _Slice2.group(tokens.head());
			if (_Token.Keyword.is(k)(line0.head())) return [_parseUses(k, line0.tail()), tokens.tail()];
		}
		return [[], tokens];
	};

	// tryParseUse privates
	const _parseUses = function (k, tokens) {
		var _beforeAndBlock6 = beforeAndBlock(tokens);

		var _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2);

		const before = _beforeAndBlock62[0];
		const lines = _beforeAndBlock62[1];

		checkEmpty(before, function () {
			return 'Did not expect anything after ' + (0, _CompileError.code)(k) + ' other than a block';
		});
		return lines.map(function (line) {
			const tReq = line.tokens[0];

			var _parseRequire2 = _parseRequire(tReq);

			const path = _parseRequire2.path;
			const name = _parseRequire2.name;

			if (k === _Token.KW_UseDo) {
				if (line.tokens.length > 1) unexpected(line.tokens[1]);
				return (0, _Expression.UseDo)(line.loc, path);
			} else {
				const isLazy = k === _Token.KW_UseLazy || k === _Token.KW_UseDebug;

				var _parseThingsUsed2 = _parseThingsUsed(name, isLazy, _Slice2.group(line).tail());

				const used = _parseThingsUsed2.used;
				const opUseDefault = _parseThingsUsed2.opUseDefault;

				return (0, _Expression.Use)(line.loc, path, used, opUseDefault);
			}
		});
	},
	      _parseThingsUsed = function (name, isLazy, tokens) {
		const useDefault = function () {
			return _Expression.LocalDeclare.noType(tokens.loc, name, isLazy);
		};
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref4 = _Token.Keyword.isFocus(tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref42 = _slicedToArray(_ref4, 2);

			const opUseDefault = _ref42[0];
			const rest = _ref42[1];

			const used = parseLocalDeclares(rest).map(function (l) {
				cx.check(l.name !== '_', l.pos, function () {
					return '' + (0, _CompileError.code)('_') + ' not allowed as import name.';
				});
				l.isLazy = isLazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	},
	      _parseRequire = function (t) {
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: (0, _UBag.push)(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
			cx.check(_Token.Group.isSpaced(t), t.loc, 'Not a valid module name.');
			return _parseLocalRequire(_Slice2.group(t));
		}
	},
	      _parseLocalRequire = function (tokens) {
		const first = tokens.head();
		let parts;
		if (first instanceof _Token.DotName) parts = _partsFromDotName(first);else {
			cx.check(first instanceof _Token.Name, first.loc, 'Not a valid part of module path.');
			parts = [];
		}
		parts.push(first.name);
		tokens.tail().each(function (t) {
			cx.check(t instanceof _Token.DotName && t.nDots === 1, t.loc, 'Not a valid part of module path.');
			parts.push(t.name);
		});
		return { path: parts.join('/'), name: tokens.last().name };
	},
	      _partsFromDotName = function (dotName) {
		return dotName.nDots === 1 ? ['.'] : (0, _UBag.repeat)('..', dotName.nDots - 1);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF3QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLFdBQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakJvRCxZQUFZLENBaUJsRCxFQUFFLE1BQU0sY0FsQm1ELEVBQUUsQ0FrQmhELENBQUMsQ0FBQTs7QUFFeEIsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTtzQkFDSCxZQUFZLFFBMUIrQyxRQUFRLEVBMEI1QyxNQUFNLENBQUM7Ozs7UUFBaEQsTUFBTTtRQUFFLEtBQUs7O3VCQUNRLFlBQVksUUEzQnVCLE1BQU0sRUEyQnBCLEtBQUssQ0FBQzs7OztRQUFoRCxTQUFT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QixDQUFDLEtBQUssQ0FBQyxDQUFBLEtBQzVCO0FBQ0osS0FBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1CQXZvQmtCLElBQUksQUF1b0JOLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFBO0FBQzlFLFFBQUssR0FBRyxFQUFHLENBQUE7R0FDWDtBQUNELE9BQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3RCLFFBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLEVBQUk7QUFDdkIsS0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQS9vQlMsT0FBTyxBQStvQkcsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUNwRCxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BDLFFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ2xCLENBQUMsQ0FBQTtBQUNGLFNBQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0VBQzFEO09BRUQsaUJBQWlCLEdBQUcsVUFBQSxPQUFPO1NBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLEdBQUcsVUFucEJXLE1BQU0sRUFtcEJWLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmFnRW50cnksIEJhZ1NpbXBsZSwgQmxvY2tCYWcsIEJsb2NrRG8sIEJsb2NrTWFwLCBCbG9ja09iaixcblx0QmxvY2tXaXRoUmV0dXJuLCBCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LCBDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBEbyxcblx0TnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsIExvY2FsRGVjbGFyZVJlcyxcblx0TG9vcCwgTWFwRW50cnksIE1lbWJlciwgTW9kdWxlLCBPYmpQYWlyLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsRG8sIFNwZWNpYWxWYWwsXG5cdFNwbGF0LCBWYWwsIFVzZSwgVXNlRG8sIFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL0xhbmcnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19QYXJlbiwgR19TcGFjZSwgR19RdW90ZSwgS2V5d29yZCxcblx0S1dfQ2FzZSwgS1dfQ2FzZURvLCBLV19EZWJ1ZywgS1dfRGVidWdnZXIsIEtXX0VuZExvb3AsIEtXX0ZvY3VzLCBLV19GdW4sIEtXX0dlbkZ1biwgS1dfSW4sXG5cdEtXX0xvb3AsIEtXX01hcEVudHJ5LCBLV19PYmpBc3NpZ24sIEtXX1Bhc3MsIEtXX091dCwgS1dfUmVnaW9uLCBLV19Vc2UsIEtXX1VzZURlYnVnLCBLV19Vc2VEbyxcblx0S1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8sIE5hbWUsIG9wS1d0b1NWLCBUb2tlbk51bWJlckxpdGVyYWwgfSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGhlYWQsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgb3BJZiwgb3BNYXAgfSBmcm9tICcuLi9VL29wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9ID0gcGFyc2VNb2R1bGVCbG9jayhyZXN0MylcblxuXHRpZiAoY3gub3B0cy5kb0luY2x1ZGVNb2R1bGVOYW1lKCkgJiYgIWV4cG9ydHMuc29tZShfID0+IF8ubmFtZSA9PT0gJ25hbWUnKSkge1xuXHRcdGNvbnN0IGRuID0gTG9jYWxEZWNsYXJlLmRlY2xhcmVOYW1lKHRva2Vucy5sb2MpXG5cdFx0bGluZXMucHVzaChBc3NpZ24odG9rZW5zLmxvYywgZG4sXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2goZG4pXG5cdH1cblx0Y29uc3QgdXNlcyA9IHBsYWluVXNlcy5jb25jYXQobGF6eVVzZXMpXG5cdHJldHVybiBNb2R1bGUodG9rZW5zLmxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQpXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCbG9ja0RvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJsb2NrVmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0cGFyc2VMaW5lc0Zyb21CbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjeC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2h9YClcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIEdyb3VwLmlzQmxvY2soYmxvY2spKVxuXHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnRva2VucywgbGluZSA9PiBwYXJzZUxpbmVPckxpbmVzKFNsaWNlLmdyb3VwKGxpbmUpKSlcblx0fSxcblxuXHRwYXJzZUJsb2NrRG8gPSB0b2tlbnMgPT4ge1xuXHRcdC8vIE9LIGlmIGxhc3QgbGluZSBpcyBhIFZhbCwgd2UnbGwganVzdCB0cmVhdCBpdCBhcyBhIERvLlxuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGN4LmNoZWNrKGtSZXR1cm4gPT09IEtSZXR1cm5fUGxhaW4sIHRva2Vucy5sb2MsXG5cdFx0XHQoKSA9PiBgQ2FuIG5vdCBtYWtlICR7a1JldHVybn0gaW4gc3RhdGVtZW50IGNvbnRleHQuYClcblx0XHRyZXR1cm4gQmxvY2tEbyh0b2tlbnMubG9jLCBhbGxMaW5lcylcblx0fSxcblx0cGFyc2VCbG9ja1ZhbCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgYmxvY2sgPSBwYXJzZUFueUJsb2NrKHRva2Vucylcblx0XHRjeC5jaGVjayghKGJsb2NrIGluc3RhbmNlb2YgQmxvY2tEbyksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGEgdmFsdWUgYmxvY2suJylcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblxuXHRwYXJzZU1vZHVsZUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzOiBleHBvcnRzIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjb25zdCBsb2MgPSB0b2tlbnMubG9jXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOiBjYXNlIEtSZXR1cm5fTWFwOiB7XG5cdFx0XHRcdGNvbnN0IGN0ciA9IGtSZXR1cm4gPT09IEtSZXR1cm5fQmFnID8gQmxvY2tCYWcgOiBCbG9ja01hcFxuXHRcdFx0XHRyZXR1cm4geyBsaW5lczogWyBdLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQ6IEJsb2NrV3JhcChsb2MsIGN0cihsb2MsIGFsbExpbmVzKSkgfVxuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc3QgeyBsaW5lcywgb3BWYWw6IG9wRGVmYXVsdEV4cG9ydCB9ID0gX3RyeVRha2VMYXN0VmFsKGFsbExpbmVzKVxuXHRcdFx0XHRyZXR1cm4geyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH1cblx0XHR9XG5cdH0sXG5cblx0cGFyc2VBbnlCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tCYWcodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRjYXNlIEtSZXR1cm5fTWFwOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tNYXAodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjb25zdCB7IGxpbmVzLCBvcFZhbCB9ID0gX3RyeVRha2VMYXN0VmFsKGFsbExpbmVzKVxuXHRcdFx0XHRyZXR1cm4ga1JldHVybiA9PT0gS1JldHVybl9PYmogP1xuXHRcdFx0XHRcdEJsb2NrT2JqKHRva2Vucy5sb2MsIGxpbmVzLCBvYmpLZXlzLCBvcFZhbCwgbnVsbCkgOlxuXHRcdFx0XHRcdGlmRWxzZShvcFZhbCxcblx0XHRcdFx0XHRcdF8gPT4gQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIGxpbmVzLCBfKSxcblx0XHRcdFx0XHRcdCgpID0+IEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpKVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdF90cnlUYWtlTGFzdFZhbCA9IGxpbmVzID0+XG5cdFx0KCFpc0VtcHR5KGxpbmVzKSAmJiBsYXN0KGxpbmVzKSBpbnN0YW5jZW9mIFZhbCkgP1xuXHRcdFx0eyBsaW5lczogcnRhaWwobGluZXMpLCBvcFZhbDogbGFzdChsaW5lcykgfSA6XG5cdFx0XHR7IGxpbmVzLCBvcFZhbDogbnVsbCB9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZXMgPT4ge1xuXHRcdGNvbnN0IG9iaktleXMgPSBbIF1cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IChsaW5lLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2goXyA9PiBjaGVja0xpbmUoXywgdHJ1ZSkpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0aXNCYWcgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSkge1xuXHRcdFx0XHRjeC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdGlzTWFwID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMpXG5cdFx0XHRcdG9iaktleXMucHVzaCguLi5saW5lLmtleXMpXG5cdFx0fVxuXHRcdGNvbnN0IGFsbExpbmVzID0gWyBdXG5cdFx0Y29uc3QgYWRkTGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0bGluZS5mb3JFYWNoKGFkZExpbmUpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y2hlY2tMaW5lKGxpbmUsIGZhbHNlKVxuXHRcdFx0XHRhbGxMaW5lcy5wdXNoKGxpbmUgaW5zdGFuY2VvZiBXaXRoT2JqS2V5cyA/IGxpbmUubGluZSA6IGxpbmUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxpbmVzLmVhY2goXyA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChfKSkpKVxuXG5cdFx0Y29uc3QgaXNPYmogPSAhaXNFbXB0eShvYmpLZXlzKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9XG5cdFx0XHRpc09iaiA/IEtSZXR1cm5fT2JqIDogaXNCYWcgPyBLUmV0dXJuX0JhZyA6IGlzTWFwID8gS1JldHVybl9NYXAgOiBLUmV0dXJuX1BsYWluXG5cdFx0cmV0dXJuIHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfVxuXHR9XG5cbmNvbnN0IHBhcnNlQ2FzZSA9IChrLCBjYXNlZEZyb21GdW4sIHRva2VucykgPT4ge1xuXHRjb25zdCBpc1ZhbCA9IGsgPT09IEtXX0Nhc2VcblxuXHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2VucylcblxuXHRsZXQgb3BDYXNlZFxuXHRpZiAoY2FzZWRGcm9tRnVuKSB7XG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdDYW5cXCd0IG1ha2UgZm9jdXMgLS0gaXMgaW1wbGljaXRseSBwcm92aWRlZCBhcyBmaXJzdCBhcmd1bWVudC4nKVxuXHRcdG9wQ2FzZWQgPSBudWxsXG5cdH0gZWxzZVxuXHRcdG9wQ2FzZWQgPSBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PiBBc3NpZ24uZm9jdXMoYmVmb3JlLmxvYywgcGFyc2VFeHByKGJlZm9yZSkpKVxuXG5cdGNvbnN0IGxhc3RMaW5lID0gU2xpY2UuZ3JvdXAoYmxvY2subGFzdCgpKVxuXHRjb25zdCBbIHBhcnRMaW5lcywgb3BFbHNlIF0gPSBLZXl3b3JkLmlzRWxzZShsYXN0TGluZS5oZWFkKCkpID9cblx0XHRbIGJsb2NrLnJ0YWlsKCksIChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpIF0gOlxuXHRcdFsgYmxvY2ssIG51bGwgXVxuXG5cdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcChsaW5lID0+IHtcblx0XHRsaW5lID0gU2xpY2UuZ3JvdXAobGluZSlcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUpXG5cdFx0Y29uc3QgdGVzdCA9IF9wYXJzZUNhc2VUZXN0KGJlZm9yZSlcblx0XHRjb25zdCByZXN1bHQgPSAoaXNWYWwgPyBwYXJzZUJsb2NrVmFsIDogcGFyc2VCbG9ja0RvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjeC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAnTXVzdCBoYXZlIGF0IGxlYXN0IDEgbm9uLWBlbHNlYCB0ZXN0LicpXG5cblx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWwgOiBDYXNlRG8pKHRva2Vucy5sb2MsIG9wQ2FzZWQsIHBhcnRzLCBvcEVsc2UpXG59XG4vLyBwYXJzZUNhc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUNhc2VUZXN0ID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBQYXR0ZXJuIG1hdGNoIHN0YXJ0cyB3aXRoIHR5cGUgdGVzdCBhbmQgaXMgZm9sbG93ZWQgYnkgbG9jYWwgZGVjbGFyZXMuXG5cdFx0Ly8gRS5nLiwgYDpTb21lIHZhbGBcblx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKEtleXdvcmQuaXNUeXBlKGZ0LmhlYWQoKSkpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IHBhcnNlU3BhY2VkKGZ0LnRhaWwoKSlcblx0XHRcdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBQYXR0ZXJuKGZpcnN0LmxvYywgdHlwZSwgbG9jYWxzLCBMb2NhbEFjY2Vzcy5mb2N1cyh0b2tlbnMubG9jKSlcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhcnNlRXhwcih0b2tlbnMpXG5cdH1cblxuY29uc3Rcblx0cGFyc2VFeHByID0gdG9rZW5zID0+IHtcblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0TWFueVdoZXJlKEtleXdvcmQuaXNPYmpBc3NpZ24pLFxuXHRcdFx0c3BsaXRzID0+IHtcblx0XHRcdFx0Ly8gU2hvcnQgb2JqZWN0IGZvcm0sIHN1Y2ggYXMgKGEuIDEsIGIuIDIpXG5cdFx0XHRcdGNvbnN0IGZpcnN0ID0gc3BsaXRzWzBdLmJlZm9yZVxuXHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbIF1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpXG5cdFx0XHRcdFx0Y3guY2hlY2sobmFtZSBpbnN0YW5jZW9mIE5hbWUsIG5hbWUubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBuYW1lLCBub3QgJHtuYW1lfWApXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHJQbGFpbih0b2tlbnNWYWx1ZSlcblx0XHRcdFx0XHRjb25zdCBsb2MgPSBMb2MobmFtZS5sb2Muc3RhcnQsIHRva2Vuc1ZhbHVlLmxvYy5lbmQpXG5cdFx0XHRcdFx0cGFpcnMucHVzaChPYmpQYWlyKGxvYywgbmFtZS5uYW1lLCB2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb25zdCB2YWwgPSBPYmpTaW1wbGUodG9rZW5zLmxvYywgcGFpcnMpXG5cdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdHJldHVybiB2YWxcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnNDYWxsZXIpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbih0b2tlbnMpXG5cdFx0KVxuXHR9LFxuXG5cdHBhcnNlRXhwclBhcnRzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdGZvciAobGV0IGkgPSB0b2tlbnMuc3RhcnQ7IGkgPCB0b2tlbnMuZW5kOyBpID0gaSArIDEpIHtcblx0XHRcdGNvbnN0IGhlcmUgPSB0b2tlbnMuZGF0YVtpXVxuXHRcdFx0aWYgKGhlcmUgaW5zdGFuY2VvZiBLZXl3b3JkKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3QgPSAoKSA9PiB0b2tlbnMuX2Nob3BTdGFydChpICsgMSlcblx0XHRcdFx0c3dpdGNoIChoZXJlLmtpbmQpIHtcblx0XHRcdFx0XHRjYXNlIEtXX0Z1bjogY2FzZSBLV19HZW5GdW46XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlRnVuKGhlcmUua2luZCA9PT0gS1dfR2VuRnVuLCByZXN0KCkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfQ2FzZTpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VDYXNlKEtXX0Nhc2UsIGZhbHNlLCByZXN0KCkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkVG8odG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHQvLyBmYWxsdGhyb3VnaFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvdXQucHVzaChwYXJzZVNpbmdsZShoZXJlKSlcblx0XHR9XG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdHBhcnNlRXhwclBsYWluID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vucylcblx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjeC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBnb3Qgbm90aGluZy4nKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhyZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChoKSAmJiBLZXl3b3JkLmlzVHlwZShoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2UgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX0Nhc2UgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZyB9ID0gX3BhcnNlRnVuTG9jYWxzKGJlZm9yZSlcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2spXG5cdFx0XHRjb25zdCBbIG9wT3V0LCByZXN0MSBdID0gX3RyeVRha2VJbk9yT3V0KEtXX091dCwgcmVzdDApXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiBwYXJzZUFueUJsb2NrKHJlc3QxKSwgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogTG9jYWxEZWNsYXJlLnBsYWluKGwubG9jLCBsLm5hbWUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucyksIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0fVxuXHR9LFxuXG5cdF90cnlUYWtlSW5Pck91dCA9IChpbk9yT3V0LCB0b2tlbnMpID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChLZXl3b3JkLmlzKGluT3JPdXQpKGhlYWQoZmlyc3RMaW5lLnRva2VucykpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKFNsaWNlLmdyb3VwKGZpcnN0TGluZSkpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaC5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfT2JqQXNzaWduOlxuXHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCksIC0xKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKEtXX0Nhc2VEbywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2ssXG5cdFx0XHRcdFx0XHRHcm91cC5pc0Jsb2NrKHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6IGNhc2UgS1dfUGFzczpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gaC5raW5kID09PSBLV19QYXNzID8gWyBdIDogU3BlY2lhbERvLmRlYnVnZ2VyKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfRW5kTG9vcDpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gRW5kTG9vcCh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0xvb3A6XG5cdFx0XHRcdFx0cmV0dXJuIExvb3AodG9rZW5zLmxvYywganVzdEJsb2NrRG8ocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfUmVnaW9uOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKHRva2Vucylcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBmYWxsIHRocm91Z2hcblx0XHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoS2V5d29yZC5pc0xpbmVTcGxpdCksXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdHJldHVybiBhdC5raW5kID09PSBLV19NYXBFbnRyeSA/XG5cdFx0XHRcdFx0X3BhcnNlTWFwRW50cnkoYmVmb3JlLCBhZnRlciwgdG9rZW5zLmxvYykgOlxuXHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VBc3NpZ24gPSAobG9jYWxzVG9rZW5zLCBhc3NpZ25lciwgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBhc3NpZ25lci5raW5kXG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb25zdCBvcE5hbWUgPSBvcElmKGxvY2Fscy5sZW5ndGggPT09IDEsICgpID0+IGxvY2Fsc1swXS5uYW1lKVxuXHRcdGNvbnN0IHZhbHVlID0gX3BhcnNlQXNzaWduVmFsdWUoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucylcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgbG9jYWxzVG9rZW5zLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soIV8uaXNMYXp5LCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblx0XHRcdGNvbnN0IGFzcyA9ICgoKSA9PiB7XG5cdFx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXNzaWduZWUgPSBsb2NhbHNbMF1cblx0XHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgdmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdFx0cmV0dXJuIGlzVGVzdCA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShfID0+IF8uaXNMYXp5KVxuXHRcdFx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKF8uaXNMYXp5LCBfLmxvYyxcblx0XHRcdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0XHRcdHJldHVybiBBc3NpZ25EZXN0cnVjdHVyZShsb2MsIGxvY2FscywgdmFsdWUsIGlzTGF6eSlcblx0XHRcdFx0fVxuXHRcdFx0fSkoKVxuXHRcdFx0cmV0dXJuIGlzT2JqQXNzaWduID8gV2l0aE9iaktleXMobG9jYWxzLCBhc3MpIDogYXNzXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnblZhbHVlID0gKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHZhbHVlVG9rZW5zLmlzRW1wdHkoKSAmJiBraW5kID09PSBLV19PYmpBc3NpZ24gP1xuXHRcdFx0U3BlY2lhbFZhbC5udWxsKHZhbHVlVG9rZW5zLmxvYykgOlxuXHRcdFx0cGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdGlmIChvcE5hbWUgIT09IG51bGwpXG5cdFx0XHRfdHJ5QWRkTmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHN3aXRjaCAoa2luZCkge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIG5hbWUgaWY6XG5cdC8vIEl0J3MgYSBmdW5jdGlvblxuXHQvLyBJdCdzIGFuIE9iaiBibG9ja1xuXHQvLyBJdCdzIGFuIE9iaiBibG9jayBhdCB0aGUgZW5kIG9mIGEgY2FsbCAoYXMgaW4gYG5hbWUgPSBPYmotVHlwZSAuLi5gKVxuXHRfdHJ5QWRkTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRfLm5hbWUgPSBuYW1lXG5cdFx0ZWxzZSBpZiAoXyBpbnN0YW5jZW9mIENhbGwgJiYgXy5hcmdzLmxlbmd0aCA+IDApXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShsYXN0KF8uYXJncyksIG5hbWUpXG5cdFx0ZWxzZVxuXHRcdFx0X3RyeUFkZE9iak5hbWUoXywgbmFtZSlcblx0fSxcblx0X3RyeUFkZE9iak5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgQmxvY2tXcmFwKVxuXHRcdFx0aWYgKF8uYmxvY2sgaW5zdGFuY2VvZiBCbG9ja09iailcblx0XHRcdFx0aWYgKF8uYmxvY2sub3BPYmplZCAhPT0gbnVsbCAmJiBfLmJsb2NrLm9wT2JqZWQgaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRcdFx0Xy5ibG9jay5vcE9iamVkLm5hbWUgPSBuYW1lXG5cdFx0XHRcdGVsc2UgaWYgKCEoXy5ibG9jay5rZXlzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICduYW1lJykpKVxuXHRcdFx0XHRcdF8uYmxvY2sub3BOYW1lID0gbmFtZVxuXHR9LFxuXG5cdF9wYXJzZU1hcEVudHJ5ID0gKGJlZm9yZSwgYWZ0ZXIsIGxvYykgPT5cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0bGV0IG5hbWVcblx0XHRsZXQgb3BUeXBlID0gbnVsbFxuXHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0KVxuXHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdGlmIChLZXl3b3JkLmlzTGF6eSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc1R5cGUoY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5KVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0ID0+XG5cdHQgaW5zdGFuY2VvZiBOYW1lID9cblx0X2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSA6XG5cdHQgaW5zdGFuY2VvZiBHcm91cCA/ICgoKSA9PiB7XG5cdFx0c3dpdGNoICh0LmtpbmQpIHtcblx0XHRcdGNhc2UgR19TcGFjZTogcmV0dXJuIHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gcGFyc2VFeHByKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBCYWdTaW1wbGUodC5sb2MsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSlcblx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIGJsb2NrV3JhcChTbGljZS5ncm91cCh0KSlcblx0XHRcdGNhc2UgR19RdW90ZTpcblx0XHRcdFx0cmV0dXJuIFF1b3RlKHQubG9jLFxuXHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHR9XG5cdH0pKCkgOlxuXHR0IGluc3RhbmNlb2YgVG9rZW5OdW1iZXJMaXRlcmFsID9cblx0TnVtYmVyTGl0ZXJhbCh0LmxvYywgdC52YWx1ZSkgOlxuXHR0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXMgP1xuXHRDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSwgdC5sb2MpLCBbIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSBdKSA6XG5cdHQgaW5zdGFuY2VvZiBLZXl3b3JkID9cblx0XHR0LmtpbmQgPT09IEtXX0ZvY3VzID9cblx0XHRcdExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSA6XG5cdFx0XHRTcGVjaWFsVmFsKHQubG9jLCBvcEtXdG9TVih0LmtpbmQpIHx8IHVuZXhwZWN0ZWQodCkpIDpcblx0dCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMyA/XG5cdFNwbGF0KHQubG9jLCBMb2NhbEFjY2Vzcyh0LmxvYywgdC5uYW1lKSkgOlxuXHR1bmV4cGVjdGVkKHQpXG5cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoS2V5d29yZC5pc1R5cGUoaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKEtleXdvcmQuaXNMYXp5KGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Y29uc3QgbWVtYmVyT3JTdWJzY3JpcHQgPSAoZSwgdCkgPT4ge1xuXHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjeC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKEtleXdvcmQuaXMoaykobGluZTAuaGVhZCgpKSlcblx0XHRcdHJldHVybiBbIF9wYXJzZVVzZXMoaywgbGluZTAudGFpbCgpKSwgdG9rZW5zLnRhaWwoKSBdXG5cdH1cblx0cmV0dXJuIFsgWyBdLCB0b2tlbnMgXVxufVxuXG4vLyB0cnlQYXJzZVVzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5gRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gbGluZS50b2tlbnNbMF1cblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQobGluZS50b2tlbnNbMV0pXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09IEtXX1VzZUxhenkgfHwgayA9PT0gS1dfVXNlRGVidWdcblx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0X3BhcnNlVGhpbmdzVXNlZChuYW1lLCBpc0xhenksIFNsaWNlLmdyb3VwKGxpbmUpLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUubm9UeXBlKHRva2Vucy5sb2MsIG5hbWUsIGlzTGF6eSlcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFsgXSwgb3BVc2VEZWZhdWx0OiB1c2VEZWZhdWx0KCkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBvcFVzZURlZmF1bHQsIHJlc3QgXSA9XG5cdFx0XHRcdEtleXdvcmQuaXNGb2N1cyh0b2tlbnMuaGVhZCgpKSA/XG5cdFx0XHRcdFx0WyB1c2VEZWZhdWx0KCksIHRva2Vucy50YWlsKCkgXSA6XG5cdFx0XHRcdFx0WyBudWxsLCB0b2tlbnMgXVxuXHRcdFx0Y29uc3QgdXNlZCA9IHBhcnNlTG9jYWxEZWNsYXJlcyhyZXN0KS5tYXAobCA9PiB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGwuaXNMYXp5ID0gaXNMYXp5XG5cdFx0XHRcdHJldHVybiBsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHsgdXNlZCwgb3BVc2VEZWZhdWx0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlUmVxdWlyZSA9IHQgPT4ge1xuXHRcdGlmICh0IGluc3RhbmNlb2YgTmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHQubmFtZSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHB1c2goX3BhcnRzRnJvbURvdE5hbWUodCksIHQubmFtZSkuam9pbignLycpLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soR3JvdXAuaXNTcGFjZWQodCksIHQubG9jLCAnTm90IGEgdmFsaWQgbW9kdWxlIG5hbWUuJylcblx0XHRcdHJldHVybiBfcGFyc2VMb2NhbFJlcXVpcmUoU2xpY2UuZ3JvdXAodCkpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsUmVxdWlyZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0bGV0IHBhcnRzXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHBhcnRzID0gX3BhcnRzRnJvbURvdE5hbWUoZmlyc3QpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzID0gWyBdXG5cdFx0fVxuXHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHR0b2tlbnMudGFpbCgpLmVhY2godCA9PiB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAxLCB0LmxvYyxcblx0XHRcdFx0J05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzLnB1c2godC5uYW1lKVxuXHRcdH0pXG5cdFx0cmV0dXJuIHsgcGF0aDogcGFydHMuam9pbignLycpLCBuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWUgfVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=