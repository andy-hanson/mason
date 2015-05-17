if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'tupl/dist/tupl', '../../CompileError', '../../Expression', '../language', '../Token', '../util', './Slice'], function (exports, module, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _language, _Token, _util, _Slice) {
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

		if (cx.opts.includeModuleName() && !exports.some(function (_) {
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
		(0, _util.assert)(tokens.size() === 2 && _Token.Group.isBlock(block));
		return (0, _util.flatMap)(block.tokens, function (line) {
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

				return kReturn === KReturn_Obj ? (0, _Expression.BlockObj)(tokens.loc, lines, objKeys, opVal, null) : (0, _util.ifElse)(opVal, function (_) {
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
		return !(0, _util.isEmpty)(lines) && (0, _util.last)(lines) instanceof _Expression.Val ? { lines: (0, _util.rtail)(lines), opVal: (0, _util.last)(lines) } : { lines: lines, opVal: null };
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

		const isObj = !(0, _util.isEmpty)(objKeys);
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
		} else opCased = (0, _util.opIf)(!before.isEmpty(), function () {
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
		return (0, _util.ifElse)(tokens.opSplitManyWhere(_Token.Keyword.isObjAssign), function (splits) {
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
			(0, _util.assert)((0, _util.last)(splits).at === undefined);
			const val = (0, _Expression.ObjSimple)(tokens.loc, pairs);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = parseExprParts(tokensCaller);
				return (0, _Expression.Call)(tokens.loc, (0, _util.head)(parts), (0, _util.push)((0, _util.tail)(parts), val));
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
						return (0, _util.push)(out, parseFun(here.kind === _Token.KW_GenFun, rest()));
					case _Token.KW_Case:
						return (0, _util.push)(out, parseCase(_Token.KW_Case, false, rest()));
					case _Token.KW_Yield:
						return (0, _util.push)(out, (0, _Expression.Yield)(tokens.loc, parseExpr(rest())));
					case _Token.KW_YieldTo:
						return (0, _util.push)(out, (0, _Expression.YieldTo)(tokens.loc, parseExpr(rest())));
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
				return (0, _util.head)(parts);
			default:
				return (0, _Expression.Call)(tokens.loc, (0, _util.head)(parts), (0, _util.tail)(parts));
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
		const opResDeclare = (0, _util.ifElse)(opReturnType, function (_) {
			return (0, _Expression.LocalDeclareRes)(_.loc, _);
		}, function () {
			return (0, _util.opMap)(opOut, function (o) {
				return (0, _Expression.LocalDeclareRes)(o.loc, null);
			});
		});
		return (0, _Expression.Fun)(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isType((0, _util.head)(h.tokens))) return {
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
			if (_Token.Keyword.is(inOrOut)((0, _util.head)(firstLine.tokens))) {
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

		return (0, _util.ifElse)(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref3) {
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
		const opName = (0, _util.opIf)(locals.length === 1, function () {
			return locals[0].name;
		});
		const value = _parseAssignValue(kind, opName, valueTokens);

		const isYield = kind === _Token.KW_Yield || kind === _Token.KW_YieldTo;
		if ((0, _util.isEmpty)(locals)) {
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
		if (_ instanceof _Expression.Fun) _.name = name;else if (_ instanceof _Expression.Call && _.args.length > 0) _tryAddObjName((0, _util.last)(_.args), name);else _tryAddObjName(_, name);
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
			cx.check(!_language.JsGlobals.has(t.name), t.loc, function () {
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
		return _language.JsGlobals.has(name) ? (0, _Expression.GlobalAccess)(loc, name) : (0, _Expression.LocalAccess)(loc, name);
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
					if (t.kind === _Token.G_Bracket) return _Expression.Call.sub(loc, (0, _util.unshift)(e, parseExprParts(_Slice2.group(t))));
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
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: (0, _util.push)(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
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
		return dotName.nDots === 1 ? ['.'] : (0, _util.repeat)('..', dotName.nDots - 1);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF1QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLFdBQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBaEJvRCxZQUFZLENBZ0JsRCxFQUFFLE1BQU0sY0FqQm1ELEVBQUUsQ0FpQmhELENBQUMsQ0FBQTs7QUFFeEIsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTtzQkFDSCxZQUFZLFFBekIrQyxRQUFRLEVBeUI1QyxNQUFNLENBQUM7Ozs7UUFBaEQsTUFBTTtRQUFFLEtBQUs7O3VCQUNRLFlBQVksUUExQnVCLE1BQU0sRUEwQnBCLEtBQUssQ0FBQzs7OztRQUFoRCxTQUFT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QUFLLENBQUMsQ0FBQSxLQUM1QjtBQUNKLEtBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxtQkF0b0JrQixJQUFJLEFBc29CTixFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsa0NBQWtDLENBQUMsQ0FBQTtBQUM5RSxRQUFLLEdBQUcsRUFBRyxDQUFBO0dBQ1g7QUFDRCxPQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN0QixRQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxFQUFJO0FBQ3ZCLEtBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkE5b0JTLE9BQU8sQUE4b0JHLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFDcEQsa0NBQWtDLENBQUMsQ0FBQTtBQUNwQyxRQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNsQixDQUFDLENBQUE7QUFDRixTQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtFQUMxRDtPQUVELGlCQUFpQixHQUFHLFVBQUEsT0FBTztTQUMxQixPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxHQUFHLFVBanBCZCxNQUFNLEVBaXBCZSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEJhZ0VudHJ5LCBCYWdTaW1wbGUsIEJsb2NrQmFnLCBCbG9ja0RvLCBCbG9ja01hcCwgQmxvY2tPYmosXG5cdEJsb2NrV2l0aFJldHVybiwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCwgQ2FzZURvLCBDYXNlVmFsLCBEZWJ1ZywgRG8sXG5cdE51bWJlckxpdGVyYWwsIEVuZExvb3AsIEZ1biwgR2xvYmFsQWNjZXNzLCBMYXp5LCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmVSZXMsXG5cdExvb3AsIE1hcEVudHJ5LCBNZW1iZXIsIE1vZHVsZSwgT2JqUGFpciwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSwgU3BlY2lhbERvLCBTcGVjaWFsVmFsLFxuXHRTcGxhdCwgVmFsLCBVc2UsIFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9sYW5ndWFnZSdcbmltcG9ydCB7IENhbGxPbkZvY3VzLCBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LCBHX1BhcmVuLCBHX1NwYWNlLCBHX1F1b3RlLCBLZXl3b3JkLFxuXHRLV19DYXNlLCBLV19DYXNlRG8sIEtXX0RlYnVnLCBLV19EZWJ1Z2dlciwgS1dfRW5kTG9vcCwgS1dfRm9jdXMsIEtXX0Z1biwgS1dfR2VuRnVuLCBLV19Jbixcblx0S1dfTG9vcCwgS1dfTWFwRW50cnksIEtXX09iakFzc2lnbiwgS1dfUGFzcywgS1dfT3V0LCBLV19SZWdpb24sIEtXX1VzZSwgS1dfVXNlRGVidWcsIEtXX1VzZURvLFxuXHRLV19Vc2VMYXp5LCBLV19ZaWVsZCwgS1dfWWllbGRUbywgTmFtZSwgb3BLV3RvU1YsIFRva2VuTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL1Rva2VuJ1xuaW1wb3J0IHsgYXNzZXJ0LCBoZWFkLCBpZkVsc2UsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsXG5cdG9wSWYsIG9wTWFwLCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1NsaWNlJ1xuXG5sZXQgY3hcblxuY29uc3QgV2l0aE9iaktleXMgPSB0dXBsKCdXaXRoT2JqS2V5cycsIE9iamVjdCxcblx0J1dyYXBzIGFuIERvIHdpdGgga2V5cyBmb3IgdGhpcyBibG9ja1xcJ3MgT2JqLiBOb3QgbWVhbnQgdG8gZXNjYXBlIHRoaXMgZmlsZS4nLFxuXHRbICdrZXlzJywgW0xvY2FsRGVjbGFyZV0sICdsaW5lJywgRG9dKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShfY3gsIHJvb3RUb2tlbikge1xuXHRjeCA9IF9jeFxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoU2xpY2UuZ3JvdXAocm9vdFRva2VuKSlcbn1cblxuY29uc3Rcblx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdGNoZWNrTm9uRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0dW5leHBlY3RlZCA9IHQgPT4gY3guZmFpbCh0LmxvYywgYFVuZXhwZWN0ZWQgJHt0fWApXG5cbmNvbnN0IHBhcnNlTW9kdWxlID0gdG9rZW5zID0+IHtcblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfSA9IHBhcnNlTW9kdWxlQmxvY2socmVzdDMpXG5cblx0aWYgKGN4Lm9wdHMuaW5jbHVkZU1vZHVsZU5hbWUoKSAmJiAhZXhwb3J0cy5zb21lKF8gPT4gXy5uYW1lID09PSAnbmFtZScpKSB7XG5cdFx0Y29uc3QgZG4gPSBMb2NhbERlY2xhcmUuZGVjbGFyZU5hbWUodG9rZW5zLmxvYylcblx0XHRsaW5lcy5wdXNoKEFzc2lnbih0b2tlbnMubG9jLCBkbixcblx0XHRcdFF1b3RlLmZvclN0cmluZyh0b2tlbnMubG9jLCBjeC5vcHRzLm1vZHVsZU5hbWUoKSkpKVxuXHRcdGV4cG9ydHMucHVzaChkbilcblx0fVxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydClcbn1cblxuLy8gcGFyc2VCbG9ja1xuY29uc3Rcblx0Ly8gVG9rZW5zIG9uIHRoZSBsaW5lIGJlZm9yZSBhIGJsb2NrLCBhbmQgdG9rZW5zIGZvciB0aGUgYmxvY2sgaXRzZWxmLlxuXHRiZWZvcmVBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdGN4LmNoZWNrKEdyb3VwLmlzQmxvY2soYmxvY2spLCBibG9jay5sb2MsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdHJldHVybiBbIHRva2Vucy5ydGFpbCgpLCBTbGljZS5ncm91cChibG9jaykgXVxuXHR9LFxuXG5cdGJsb2NrV3JhcCA9IHRva2VucyA9PiBCbG9ja1dyYXAodG9rZW5zLmxvYywgcGFyc2VCbG9ja1ZhbCh0b2tlbnMpKSxcblxuXHRqdXN0QmxvY2tEbyA9IHRva2VucyA9PiBwYXJzZUJsb2NrRG8oX2p1c3RCbG9jayh0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gdG9rZW5zID0+IHBhcnNlQmxvY2tWYWwoX2p1c3RCbG9jayh0b2tlbnMpKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tEbyA9IHRva2VucyA9PiB7XG5cdFx0Ly8gT0sgaWYgbGFzdCBsaW5lIGlzIGEgVmFsLCB3ZSdsbCBqdXN0IHRyZWF0IGl0IGFzIGEgRG8uXG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gS1JldHVybl9QbGFpbiwgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHR9LFxuXHRwYXJzZUJsb2NrVmFsID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBibG9jayA9IHBhcnNlQW55QmxvY2sodG9rZW5zKVxuXHRcdGN4LmNoZWNrKCEoYmxvY2sgaW5zdGFuY2VvZiBCbG9ja0RvKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYSB2YWx1ZSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdHBhcnNlTW9kdWxlQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXM6IGV4cG9ydHMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGNvbnN0IGxvYyA9IHRva2Vucy5sb2Ncblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6IGNhc2UgS1JldHVybl9NYXA6IHtcblx0XHRcdFx0Y29uc3QgY3RyID0ga1JldHVybiA9PT0gS1JldHVybl9CYWcgPyBCbG9ja0JhZyA6IEJsb2NrTWFwXG5cdFx0XHRcdHJldHVybiB7IGxpbmVzOiBbIF0sIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydDogQmxvY2tXcmFwKGxvYywgY3RyKGxvYywgYWxsTGluZXMpKSB9XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjb25zdCB7IGxpbmVzLCBvcFZhbDogb3BEZWZhdWx0RXhwb3J0IH0gPSBfdHJ5VGFrZUxhc3RWYWwoYWxsTGluZXMpXG5cdFx0XHRcdHJldHVybiB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfVxuXHRcdH1cblx0fSxcblxuXHRwYXJzZUFueUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6XG5cdFx0XHRcdHJldHVybiBCbG9ja0JhZyh0b2tlbnMubG9jLCBhbGxMaW5lcylcblx0XHRcdGNhc2UgS1JldHVybl9NYXA6XG5cdFx0XHRcdHJldHVybiBCbG9ja01hcCh0b2tlbnMubG9jLCBhbGxMaW5lcylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnN0IHsgbGluZXMsIG9wVmFsIH0gPSBfdHJ5VGFrZUxhc3RWYWwoYWxsTGluZXMpXG5cdFx0XHRcdHJldHVybiBrUmV0dXJuID09PSBLUmV0dXJuX09iaiA/XG5cdFx0XHRcdFx0QmxvY2tPYmoodG9rZW5zLmxvYywgbGluZXMsIG9iaktleXMsIG9wVmFsLCBudWxsKSA6XG5cdFx0XHRcdFx0aWZFbHNlKG9wVmFsLFxuXHRcdFx0XHRcdFx0XyA9PiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgbGluZXMsIF8pLFxuXHRcdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBsaW5lcykpXG5cdFx0fVxuXHR9XG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF9qdXN0QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0X3RyeVRha2VMYXN0VmFsID0gbGluZXMgPT5cblx0XHQoIWlzRW1wdHkobGluZXMpICYmIGxhc3QobGluZXMpIGluc3RhbmNlb2YgVmFsKSA/XG5cdFx0XHR7IGxpbmVzOiBydGFpbChsaW5lcyksIG9wVmFsOiBsYXN0KGxpbmVzKSB9IDpcblx0XHRcdHsgbGluZXMsIG9wVmFsOiBudWxsIH0sXG5cblx0S1JldHVybl9QbGFpbiA9IDAsXG5cdEtSZXR1cm5fT2JqID0gMSxcblx0S1JldHVybl9CYWcgPSAyLFxuXHRLUmV0dXJuX01hcCA9IDMsXG5cdF9wYXJzZUJsb2NrTGluZXMgPSBsaW5lcyA9PiB7XG5cdFx0Y29uc3Qgb2JqS2V5cyA9IFsgXVxuXHRcdGxldCBpc0JhZyA9IGZhbHNlLCBpc01hcCA9IGZhbHNlXG5cdFx0Y29uc3QgY2hlY2tMaW5lID0gKGxpbmUsIGluRGVidWcpID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdGxpbmUubGluZXMuZm9yRWFjaChfID0+IGNoZWNrTGluZShfLCB0cnVlKSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBCYWdFbnRyeSkge1xuXHRcdFx0XHRjeC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBsaXN0IGVudHJpZXMnKVxuXHRcdFx0XHRpc0JhZyA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIE1hcEVudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIG1hcCBlbnRyaWVzJylcblx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBXaXRoT2JqS2V5cylcblx0XHRcdFx0b2JqS2V5cy5wdXNoKC4uLmxpbmUua2V5cylcblx0XHR9XG5cdFx0Y29uc3QgYWxsTGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRsaW5lLmZvckVhY2goYWRkTGluZSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGVja0xpbmUobGluZSwgZmFsc2UpXG5cdFx0XHRcdGFsbExpbmVzLnB1c2gobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzID8gbGluZS5saW5lIDogbGluZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0bGluZXMuZWFjaChfID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKF8pKSkpXG5cblx0XHRjb25zdCBpc09iaiA9ICFpc0VtcHR5KG9iaktleXMpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID1cblx0XHRcdGlzT2JqID8gS1JldHVybl9PYmogOiBpc0JhZyA/IEtSZXR1cm5fQmFnIDogaXNNYXAgPyBLUmV0dXJuX01hcCA6IEtSZXR1cm5fUGxhaW5cblx0XHRyZXR1cm4geyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9XG5cdH1cblxuY29uc3QgcGFyc2VDYXNlID0gKGssIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IGlzVmFsID0gayA9PT0gS1dfQ2FzZVxuXG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IG51bGxcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnbi5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IEtleXdvcmQuaXNFbHNlKGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgKGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKGxhc3RMaW5lLnRhaWwoKSkgXSA6XG5cdFx0WyBibG9jaywgbnVsbCBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdGxpbmUgPSBTbGljZS5ncm91cChsaW5lKVxuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoS2V5d29yZC5pc1R5cGUoZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjeC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+IGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWV9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IHRva2Vucy5lbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0Y29uc3QgaGVyZSA9IHRva2Vucy5kYXRhW2ldXG5cdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHRzd2l0Y2ggKGhlcmUua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VGdW4oaGVyZS5raW5kID09PSBLV19HZW5GdW4sIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19DYXNlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUNhc2UoS1dfQ2FzZSwgZmFsc2UsIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0cGFyc2VFeHByUGxhaW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zKVxuXHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGN4LmZhaWwodG9rZW5zLmxvYywgJ0V4cGVjdGVkIGFuIGV4cHJlc3Npb24sIGdvdCBub3RoaW5nLicpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdF8gPT4gTG9jYWxEZWNsYXJlUmVzKF8ubG9jLCBfKSxcblx0XHQoKSA9PiBvcE1hcChvcE91dCwgbyA9PiBMb2NhbERlY2xhcmVSZXMoby5sb2MsIG51bGwpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNUeXBlKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogbnVsbCwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGgua2luZCA9PT0gS1dfQ2FzZSB8fCBoLmtpbmQgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGgua2luZCwgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9jaylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2s6IHBhcnNlQW55QmxvY2socmVzdDEpLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBMb2NhbERlY2xhcmUucGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkoaGVhZChmaXJzdExpbmUudG9rZW5zKSkpIHtcblx0XHRcdFx0Y29uc3QgaW5PdXQgPSBEZWJ1Zyhcblx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soU2xpY2UuZ3JvdXAoZmlyc3RMaW5lKSkpXG5cdFx0XHRcdHJldHVybiBbIGluT3V0LCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgbnVsbCwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0Ly8gSW5kZXggaXMgc2V0IGJ5IHBhcnNlQmxvY2suXG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjogY2FzZSBLV19QYXNzOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX1Bhc3MgPyBbIF0gOiBTcGVjaWFsRG8uZGVidWdnZXIodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19FbmRMb29wOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBFbmRMb29wKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfTG9vcDpcblx0XHRcdFx0XHRyZXR1cm4gTG9vcCh0b2tlbnMubG9jLCBqdXN0QmxvY2tEbyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmtpbmQgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUFzc2lnbiA9IChsb2NhbHNUb2tlbnMsIGFzc2lnbmVyLCB2YWx1ZVRva2VucywgbG9jKSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IGFzc2lnbmVyLmtpbmRcblx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMobG9jYWxzVG9rZW5zKVxuXHRcdGNvbnN0IG9wTmFtZSA9IG9wSWYobG9jYWxzLmxlbmd0aCA9PT0gMSwgKCkgPT4gbG9jYWxzWzBdLm5hbWUpXG5cdFx0Y29uc3QgdmFsdWUgPSBfcGFyc2VBc3NpZ25WYWx1ZShraW5kLCBvcE5hbWUsIHZhbHVlVG9rZW5zKVxuXG5cdFx0Y29uc3QgaXNZaWVsZCA9IGtpbmQgPT09IEtXX1lpZWxkIHx8IGtpbmQgPT09IEtXX1lpZWxkVG9cblx0XHRpZiAoaXNFbXB0eShsb2NhbHMpKSB7XG5cdFx0XHRjeC5jaGVjayhpc1lpZWxkLCBsb2NhbHNUb2tlbnMubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaXNZaWVsZClcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayghXy5pc0xhenksIF8ubG9jLCAnQ2FuIG5vdCB5aWVsZCB0byBsYXp5IHZhcmlhYmxlLicpKVxuXG5cdFx0XHRjb25zdCBpc09iakFzc2lnbiA9IGtpbmQgPT09IEtXX09iakFzc2lnblxuXHRcdFx0Y29uc3QgYXNzID0gKCgpID0+IHtcblx0XHRcdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRjb25zdCBhc3NpZ25lZSA9IGxvY2Fsc1swXVxuXHRcdFx0XHRcdGNvbnN0IGFzc2lnbiA9IEFzc2lnbihsb2MsIGFzc2lnbmVlLCB2YWx1ZSlcblx0XHRcdFx0XHRjb25zdCBpc1Rlc3QgPSBpc09iakFzc2lnbiAmJiBhc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdFx0XHRyZXR1cm4gaXNUZXN0ID8gRGVidWcobG9jLCBbIGFzc2lnbiBdKSA6IGFzc2lnblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGxvY2Fscy5zb21lKF8gPT4gXy5pc0xhenkpXG5cdFx0XHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soXy5pc0xhenksIF8ubG9jLFxuXHRcdFx0XHRcdFx0XHQnSWYgYW55IHBhcnQgb2YgZGVzdHJ1Y3R1cmluZyBhc3NpZ24gaXMgbGF6eSwgYWxsIG11c3QgYmUuJykpXG5cdFx0XHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCB2YWx1ZSwgaXNMYXp5KVxuXHRcdFx0XHR9XG5cdFx0XHR9KSgpXG5cdFx0XHRyZXR1cm4gaXNPYmpBc3NpZ24gPyBXaXRoT2JqS2V5cyhsb2NhbHMsIGFzcykgOiBhc3Ncblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQXNzaWduVmFsdWUgPSAoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucykgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gdmFsdWVUb2tlbnMuaXNFbXB0eSgpICYmIGtpbmQgPT09IEtXX09iakFzc2lnbiA/XG5cdFx0XHRTcGVjaWFsVmFsLm51bGwodmFsdWVUb2tlbnMubG9jKSA6XG5cdFx0XHRwYXJzZUV4cHIodmFsdWVUb2tlbnMpXG5cdFx0aWYgKG9wTmFtZSAhPT0gbnVsbClcblx0XHRcdF90cnlBZGROYW1lKHZhbHVlLCBvcE5hbWUpXG5cdFx0c3dpdGNoIChraW5kKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgbmFtZSBpZjpcblx0Ly8gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrIGF0IHRoZSBlbmQgb2YgYSBjYWxsIChhcyBpbiBgbmFtZSA9IE9iai1UeXBlIC4uLmApXG5cdF90cnlBZGROYW1lID0gKF8sIG5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdF8ubmFtZSA9IG5hbWVcblx0XHRlbHNlIGlmIChfIGluc3RhbmNlb2YgQ2FsbCAmJiBfLmFyZ3MubGVuZ3RoID4gMClcblx0XHRcdF90cnlBZGRPYmpOYW1lKGxhc3QoXy5hcmdzKSwgbmFtZSlcblx0XHRlbHNlXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShfLCBuYW1lKVxuXHR9LFxuXHRfdHJ5QWRkT2JqTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dyYXApXG5cdFx0XHRpZiAoXy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrT2JqKVxuXHRcdFx0XHRpZiAoXy5ibG9jay5vcE9iamVkICE9PSBudWxsICYmIF8uYmxvY2sub3BPYmplZCBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0XHRfLmJsb2NrLm9wT2JqZWQubmFtZSA9IG5hbWVcblx0XHRcdFx0ZWxzZSBpZiAoIShfLmJsb2NrLmtleXMuc29tZShfID0+IF8ubmFtZSA9PT0gJ25hbWUnKSkpXG5cdFx0XHRcdFx0Xy5ibG9jay5vcE5hbWUgPSBuYW1lXG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlcikpXG5cbmNvbnN0XG5cdHBhcnNlTG9jYWxEZWNsYXJlcyA9IHRva2VucyA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblx0cGFyc2VMb2NhbERlY2xhcmUgPSB0ID0+IHtcblx0XHRsZXQgbmFtZVxuXHRcdGxldCBvcFR5cGUgPSBudWxsXG5cdFx0bGV0IGlzTGF6eSA9IGZhbHNlXG5cblx0XHRpZiAoR3JvdXAuaXNTcGFjZWQodCkpIHtcblx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmdyb3VwKHQpXG5cdFx0XHRsZXQgcmVzdCA9IHRva2Vuc1xuXHRcdFx0aWYgKEtleXdvcmQuaXNMYXp5KHRva2Vucy5oZWFkKCkpKSB7XG5cdFx0XHRcdGlzTGF6eSA9IHRydWVcblx0XHRcdFx0cmVzdCA9IHRva2Vucy50YWlsKClcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRpZiAoIXJlc3QyLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRjeC5jaGVjayhLZXl3b3JkLmlzVHlwZShjb2xvbiksIGNvbG9uLmxvYywgKCkgPT4gYEV4cGVjdGVkICR7Y29kZSgnOicpfWApXG5cdFx0XHRcdGNvbnN0IHRva2Vuc1R5cGUgPSByZXN0Mi50YWlsKClcblx0XHRcdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnNUeXBlLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7Y29sb259YClcblx0XHRcdFx0b3BUeXBlID0gcGFyc2VTcGFjZWQodG9rZW5zVHlwZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZSh0KVxuXG5cdFx0cmV0dXJuIExvY2FsRGVjbGFyZSh0LmxvYywgbmFtZSwgb3BUeXBlLCBpc0xhenkpXG5cdH1cblxuLy8gcGFyc2VMb2NhbERlY2xhcmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUxvY2FsTmFtZSA9IHQgPT4ge1xuXHRcdGlmIChLZXl3b3JkLmlzRm9jdXModCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3R9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjeC5jaGVjayghSnNHbG9iYWxzLmhhcyh0Lm5hbWUpLCB0LmxvYywgKCkgPT5cblx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZVNpbmdsZSA9IHQgPT5cblx0dCBpbnN0YW5jZW9mIE5hbWUgP1xuXHRfYWNjZXNzKHQubmFtZSwgdC5sb2MpIDpcblx0dCBpbnN0YW5jZW9mIEdyb3VwID8gKCgpID0+IHtcblx0XHRzd2l0Y2ggKHQua2luZCkge1xuXHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfUGFyZW46IHJldHVybiBwYXJzZUV4cHIoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIEJhZ1NpbXBsZSh0LmxvYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdH1cblx0fSkoKSA6XG5cdHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWwgP1xuXHROdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKSA6XG5cdHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1cyA/XG5cdENhbGwodC5sb2MsIF9hY2Nlc3ModC5uYW1lLCB0LmxvYyksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pIDpcblx0dCBpbnN0YW5jZW9mIEtleXdvcmQgP1xuXHRcdHQua2luZCA9PT0gS1dfRm9jdXMgP1xuXHRcdFx0TG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIDpcblx0XHRcdFNwZWNpYWxWYWwodC5sb2MsIG9wS1d0b1NWKHQua2luZCkgfHwgdW5leHBlY3RlZCh0KSkgOlxuXHR0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAzID9cblx0U3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKSA6XG5cdHVuZXhwZWN0ZWQodClcblxuLy8gcGFyc2VTaW5nbGUgcHJpdmF0ZXNcbmNvbnN0IF9hY2Nlc3MgPSAobmFtZSwgbG9jKSA9PlxuXHRKc0dsb2JhbHMuaGFzKG5hbWUpID8gR2xvYmFsQWNjZXNzKGxvYywgbmFtZSkgOiBMb2NhbEFjY2Vzcyhsb2MsIG5hbWUpXG5cbmNvbnN0IHBhcnNlU3BhY2VkID0gdG9rZW5zID0+IHtcblx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKCksIHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdGlmIChLZXl3b3JkLmlzVHlwZShoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoS2V5d29yZC5pc0xhenkoaCkpXG5cdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRlbHNlIHtcblx0XHRjb25zdCBtZW1iZXJPclN1YnNjcmlwdCA9IChlLCB0KSA9PiB7XG5cdFx0XHRjb25zdCBsb2MgPSB0LmxvY1xuXHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKHQubkRvdHMgPT09IDEsIHRva2Vucy5sb2MsICdUb28gbWFueSBkb3RzIScpXG5cdFx0XHRcdHJldHVybiBNZW1iZXIodG9rZW5zLmxvYywgZSwgdC5uYW1lKVxuXHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0aWYgKHQua2luZCA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLnN1Yihsb2MsXG5cdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSkpXG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfUGFyZW4pIHtcblx0XHRcdFx0XHRjaGVja0VtcHR5KFNsaWNlLmdyb3VwKHQpLFxuXHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBlLCBbXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGN4LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3R9YClcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1lbWJlck9yU3Vic2NyaXB0LCBwYXJzZVNpbmdsZShoKSlcblx0fVxufVxuXG5jb25zdCB0cnlQYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdGNvbnN0IGxpbmUwID0gU2xpY2UuZ3JvdXAodG9rZW5zLmhlYWQoKSlcblx0XHRpZiAoS2V5d29yZC5pcyhrKShsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PmBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cdFx0XHRpZiAoayA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gS1dfVXNlTGF6eSB8fCBrID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgU2xpY2UuZ3JvdXAobGluZSkudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxpbmUubG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZS5ub1R5cGUodG9rZW5zLmxvYywgbmFtZSwgaXNMYXp5KVxuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgdXNlZDogWyBdLCBvcFVzZURlZmF1bHQ6IHVzZURlZmF1bHQoKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBbIG9wVXNlRGVmYXVsdCwgcmVzdCBdID1cblx0XHRcdFx0S2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpID9cblx0XHRcdFx0XHRbIHVzZURlZmF1bHQoKSwgdG9rZW5zLnRhaWwoKSBdIDpcblx0XHRcdFx0XHRbIG51bGwsIHRva2VucyBdXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y3guY2hlY2sobC5uYW1lICE9PSAnXycsIGwucG9zLFxuXHRcdFx0XHRcdCgpID0+IGAke2NvZGUoJ18nKX0gbm90IGFsbG93ZWQgYXMgaW1wb3J0IG5hbWUuYClcblx0XHRcdFx0bC5pc0xhenkgPSBpc0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhHcm91cC5pc1NwYWNlZCh0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDEsIHQubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==