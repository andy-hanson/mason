if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../../CompileError', '../../MsAst', '../language', '../Token', '../util', './Slice'], function (exports, module, _esastDistLoc, _CompileError, _MsAst, _language, _Token, _util, _Slice) {
	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	var _Slice2 = _interopRequireDefault(_Slice);

	// Since there are so many parsing functions,
	// it's faster (as of node v0.11.14) to have them all close over this mutable variable once
	// than to close over the parameter (as in lex.js, where that's much faster).
	let context;

	/*
 This converts a Token tree to a MsAst.
 This is a recursive-descent parser, made easier by two facts:
 	* We have already grouped tokens.
 	* Most of the time, an ast's type is determined by the first token.
 
 There are exceptions such as assignment statements (indicated by a `=` somewhere in the middle).
 For those we must iterate through tokens and split.
 (See Slice.opSplitOnceWhere and Slice.opSplitManyWhere.)
 */

	module.exports = function (_context, rootToken) {
		context = _context;
		(0, _util.assert)((0, _Token.isGroup)(_Token.G_Block, rootToken));
		const msAst = parseModule(_Slice2.default.group(rootToken));
		// Release for garbage collections.
		context = undefined;
		return msAst;
	};

	const checkEmpty = function (tokens, message) {
		return context.check(tokens.isEmpty(), tokens.loc, message);
	},
	      checkNonEmpty = function (tokens, message) {
		return context.check(!tokens.isEmpty(), tokens.loc, message);
	},
	      unexpected = function (token) {
		return context.fail(token.loc, 'Unexpected ' + token.show());
	};

	const parseModule = function (tokens) {
		// Use statements must appear in order.

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

		if (context.opts.includeModuleName() && !exports.some(function (_) {
			return _.name === 'name';
		})) {
			const name = (0, _MsAst.LocalDeclareName)(tokens.loc);
			lines.push((0, _MsAst.AssignSingle)(tokens.loc, name, _MsAst.Quote.forString(tokens.loc, context.opts.moduleName())));
			exports.push(name);
		}
		const uses = plainUses.concat(lazyUses);
		return (0, _MsAst.Module)(tokens.loc, doUses, uses, debugUses, lines, exports, opDefaultExport);
	};

	// parseBlock
	const
	// Tokens on the line before a block, and tokens for the block itself.
	beforeAndBlock = function (tokens) {
		checkNonEmpty(tokens, 'Expected an indented block.');
		const block = tokens.last();
		context.check((0, _Token.isGroup)(_Token.G_Block, block), block.loc, 'Expected an indented block.');
		return [tokens.rtail(), _Slice2.default.group(block)];
	},
	      blockWrap = function (tokens) {
		return (0, _MsAst.BlockWrap)(tokens.loc, parseBlockVal(tokens));
	},
	      justBlock = function (keyword, tokens) {
		var _beforeAndBlock = beforeAndBlock(tokens);

		var _beforeAndBlock2 = _slicedToArray(_beforeAndBlock, 2);

		const before = _beforeAndBlock2[0];
		const block = _beforeAndBlock2[1];

		checkEmpty(before, function () {
			return 'Did not expect anything between ' + (0, _CompileError.code)((0, _Token.keywordName)(keyword)) + ' and block.';
		});
		return block;
	},
	      justBlockDo = function (keyword, tokens) {
		return parseBlockDo(justBlock(keyword, tokens));
	},
	      justBlockVal = function (keyword, tokens) {
		return parseBlockVal(justBlock(keyword, tokens));
	},
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = function (tokens) {
		const h = tokens.head();
		context.check(tokens.size() > 1, h.loc, function () {
			return 'Expected indented block after ' + h.show();
		});
		const block = tokens.second();
		(0, _util.assert)(tokens.size() === 2 && (0, _Token.isGroup)(_Token.G_Block, block));
		return (0, _util.flatMap)(block.subTokens, function (line) {
			return parseLineOrLines(_Slice2.default.group(line));
		});
	},
	      parseBlockDo = function (tokens) {
		const lines = _plainBlockLines(tokens);
		return (0, _MsAst.BlockDo)(tokens.loc, lines);
	},
	      parseBlockVal = function (tokens) {
		var _parseBlockLines2 = _parseBlockLines(tokens);

		const lines = _parseBlockLines2.lines;
		const kReturn = _parseBlockLines2.kReturn;

		switch (kReturn) {
			case KReturn_Bag:
				return _MsAst.BlockBag.of(tokens.loc, lines);
			case KReturn_Map:
				return _MsAst.BlockMap.of(tokens.loc, lines);
			case KReturn_Obj:
				var _tryTakeLastVal2 = _tryTakeLastVal(lines),
				    _tryTakeLastVal22 = _slicedToArray(_tryTakeLastVal2, 2),
				    doLines = _tryTakeLastVal22[0],
				    opVal = _tryTakeLastVal22[1];

				// opName written to by _tryAddName.
				return _MsAst.BlockObj.of(tokens.loc, doLines, opVal, null);
			default:
				{
					context.check(!(0, _util.isEmpty)(lines), tokens.loc, 'Value block must end in a value.');
					const val = (0, _util.last)(lines);
					if (val instanceof _MsAst.Throw) return (0, _MsAst.BlockValThrow)(tokens.loc, (0, _util.rtail)(lines), val);else {
						context.check(val instanceof _MsAst.Val, val.loc, 'Value block must end in a value.');
						return (0, _MsAst.BlockWithReturn)(tokens.loc, (0, _util.rtail)(lines), val);
					}
				}
		}
	},
	      parseModuleBlock = function (tokens) {
		var _parseBlockLines3 = _parseBlockLines(tokens);

		const lines = _parseBlockLines3.lines;
		const kReturn = _parseBlockLines3.kReturn;

		const loc = tokens.loc;
		switch (kReturn) {
			case KReturn_Bag:case KReturn_Map:
				{
					const block = (kReturn === KReturn_Bag ? _MsAst.BlockBag : _MsAst.BlockMap).of(loc, lines);
					return { lines: [], exports: [], opDefaultExport: (0, _MsAst.BlockWrap)(loc, block) };
				}
			default:
				{
					const exports = [];
					let opDefaultExport = null;
					const moduleName = context.opts.moduleName();

					// Module exports look like a BlockObj,  but are really different.
					// In ES6, module exports must be completely static.
					// So we keep an array of exports attached directly to the Module ast.
					// If you write:
					//	if! cond
					//		a. b
					// in a module context, it will be an error. (The module creates no `built` local.)
					const getLineExports = function (line) {
						if (line instanceof _MsAst.ObjEntry) {
							for (const _ of line.assign.allAssignees()) if (_.name === moduleName) {
								context.check(opDefaultExport === null, _.loc, function () {
									return 'Default export already declared at ' + opDefaultExport.loc;
								});
								opDefaultExport = (0, _MsAst.LocalAccess)(_.loc, _.name);
							} else exports.push(_);
							return line.assign;
						} else if (line instanceof _MsAst.Debug) line.lines = line.lines.map(getLineExports);
						return line;
					};

					const moduleLines = lines.map(getLineExports);

					if ((0, _util.isEmpty)(exports) && opDefaultExport === null) {
						var _tryTakeLastVal3 = _tryTakeLastVal(moduleLines);

						var _tryTakeLastVal32 = _slicedToArray(_tryTakeLastVal3, 2);

						const lines = _tryTakeLastVal32[0];
						const opDefaultExport = _tryTakeLastVal32[1];

						return { lines: lines, exports: exports, opDefaultExport: opDefaultExport };
					} else return { lines: moduleLines, exports: exports, opDefaultExport: opDefaultExport };
				}
		}
	};

	// parseBlock privates
	const _tryTakeLastVal = function (lines) {
		return !(0, _util.isEmpty)(lines) && (0, _util.last)(lines) instanceof _MsAst.Val ? [(0, _util.rtail)(lines), (0, _util.last)(lines)] : [lines, null];
	},
	      _plainBlockLines = function (lineTokens) {
		const lines = [];
		const addLine = function (line) {
			if (line instanceof Array) for (const _ of line) addLine(_);else lines.push(line);
		};
		lineTokens.each(function (_) {
			return addLine(parseLine(_Slice2.default.group(_)));
		});
		return lines;
	},
	      KReturn_Plain = 0,
	      KReturn_Obj = 1,
	      KReturn_Bag = 2,
	      KReturn_Map = 3,
	      _parseBlockLines = function (lineTokens) {
		let isBag = false,
		    isMap = false,
		    isObj = false;
		const checkLine = function (line) {
			if (line instanceof _MsAst.Debug) for (const _ of line.lines) checkLine(_);else if (line instanceof _MsAst.BagEntry) isBag = true;else if (line instanceof _MsAst.MapEntry) isMap = true;else if (line instanceof _MsAst.ObjEntry) isObj = true;
		};
		const lines = _plainBlockLines(lineTokens);
		for (const _ of lines) checkLine(_);

		context.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		context.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		context.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

		const kReturn = isObj ? KReturn_Obj : isBag ? KReturn_Bag : isMap ? KReturn_Map : KReturn_Plain;
		return { lines: lines, kReturn: kReturn };
	};

	const parseCase = function (isVal, casedFromFun, tokens) {
		var _beforeAndBlock3 = beforeAndBlock(tokens);

		var _beforeAndBlock32 = _slicedToArray(_beforeAndBlock3, 2);

		const before = _beforeAndBlock32[0];
		const block = _beforeAndBlock32[1];

		let opCased;
		if (casedFromFun) {
			checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.');
			opCased = null;
		} else opCased = (0, _util.opIf)(!before.isEmpty(), function () {
			return _MsAst.AssignSingle.focus(before.loc, parseExpr(before));
		});

		const lastLine = _Slice2.default.group(block.last());

		var _ref = (0, _Token.isKeyword)(_Token.KW_Else, lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(_Token.KW_Else, lastLine.tail())] : [block, null];

		var _ref2 = _slicedToArray(_ref, 2);

		const partLines = _ref2[0];
		const opElse = _ref2[1];

		const parts = partLines.mapSlices(function (line) {
			var _beforeAndBlock4 = beforeAndBlock(line);

			var _beforeAndBlock42 = _slicedToArray(_beforeAndBlock4, 2);

			const before = _beforeAndBlock42[0];
			const block = _beforeAndBlock42[1];

			const test = _parseCaseTest(before);
			const result = (isVal ? parseBlockVal : parseBlockDo)(block);
			return (isVal ? _MsAst.CaseValPart : _MsAst.CaseDoPart)(line.loc, test, result);
		});
		context.check(parts.length > 0, tokens.loc, 'Must have at least 1 non-`else` test.');

		return (isVal ? _MsAst.CaseVal : _MsAst.CaseDo)(tokens.loc, opCased, parts, opElse);
	};
	// parseCase privates
	const _parseCaseTest = function (tokens) {
		const first = tokens.head();
		// Pattern match starts with type test and is followed by local declares.
		// E.g., `:Some val`
		if ((0, _Token.isGroup)(_Token.G_Space, first) && tokens.size() > 1) {
			const ft = _Slice2.default.group(first);
			if ((0, _Token.isKeyword)(_Token.KW_Type, ft.head())) {
				const type = parseSpaced(ft.tail());
				const locals = parseLocalDeclares(tokens.tail());
				return (0, _MsAst.Pattern)(first.loc, type, locals, _MsAst.LocalAccess.focus(tokens.loc));
			}
		}
		return parseExpr(tokens);
	};

	const parseExpr = function (tokens) {
		return (0, _util.ifElse)(tokens.opSplitManyWhere(function (_) {
			return (0, _Token.isKeyword)(_Token.KW_ObjAssign, _);
		}), function (splits) {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			checkNonEmpty(first, function () {
				return 'Unexpected ' + splits[0].at.show();
			});
			const tokensCaller = first.rtail();

			const pairs = [];
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const name = splits[i].before.last();
				context.check(name instanceof _Token.Name, name.loc, function () {
					return 'Expected a name, not ' + name.show();
				});
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = parseExprPlain(tokensValue);
				const loc = (0, _Loc.default)(name.loc.start, tokensValue.loc.end);
				pairs.push((0, _MsAst.ObjPair)(loc, name.name, value));
			}
			(0, _util.assert)((0, _util.last)(splits).at === undefined);
			const val = (0, _MsAst.ObjSimple)(tokens.loc, pairs);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = parseExprParts(tokensCaller);
				return (0, _MsAst.Call)(tokens.loc, (0, _util.head)(parts), (0, _util.push)((0, _util.tail)(parts), val));
			}
		}, function () {
			return parseExprPlain(tokens);
		});
	},
	      parseExprParts = function (tokens) {
		const opSplit = tokens.opSplitOnceWhere(function (token) {
			if (token instanceof _Token.Keyword) switch (token.kind) {
				case _Token.KW_And:case _Token.KW_CaseVal:case _Token.KW_Class:case _Token.KW_ExceptVal:case _Token.KW_ForBag:
				case _Token.KW_ForVal:case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_GenFun:case _Token.KW_GenFunDo:
				case _Token.KW_IfVal:case _Token.KW_New:case _Token.KW_Not:case _Token.KW_Or:case _Token.KW_UnlessVal:
				case _Token.KW_Yield:case _Token.KW_YieldTo:
					return true;
				default:
					return false;
			}
			return false;
		});
		return (0, _util.ifElse)(opSplit, function (_ref3) {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

			const last = (function () {
				switch (at.kind) {
					case _Token.KW_And:case _Token.KW_Or:
						return (0, _MsAst.Logic)(at.loc, at.kind === _Token.KW_And ? _MsAst.L_And : _MsAst.L_Or, parseExprParts(after));
					case _Token.KW_CaseVal:
						return parseCase(true, false, after);
					case _Token.KW_Class:
						return parseClass(after);
					case _Token.KW_ExceptVal:
						return parseExcept(_Token.KW_ExceptVal, after);
					case _Token.KW_ForBag:
						return parseForBag(after);
					case _Token.KW_ForVal:
						return parseForVal(after);
					case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_GenFun:case _Token.KW_GenFunDo:
						return parseFun(at.kind, after);
					case _Token.KW_IfVal:case _Token.KW_UnlessVal:
						{
							var _beforeAndBlock5 = beforeAndBlock(after);

							var _beforeAndBlock52 = _slicedToArray(_beforeAndBlock5, 2);

							const before = _beforeAndBlock52[0];
							const block = _beforeAndBlock52[1];

							return (0, _MsAst.ConditionalVal)(tokens.loc, parseExpr(before), parseBlockVal(block), at.kind === _Token.KW_UnlessVal);
						}
					case _Token.KW_New:
						{
							const parts = parseExprParts(after);
							return (0, _MsAst.New)(at.loc, parts[0], (0, _util.tail)(parts));
						}
					case _Token.KW_Not:
						return (0, _MsAst.Not)(at.loc, parseExpr(after));
					case _Token.KW_Yield:
						return (0, _MsAst.Yield)(at.loc, parseExpr(after));
					case _Token.KW_YieldTo:
						return (0, _MsAst.YieldTo)(at.loc, parseExpr(after));
					default:
						throw new Error(at.kind);
				}
			})();
			return (0, _util.push)(before.map(parseSingle), last);
		}, function () {
			return tokens.map(parseSingle);
		});
	},
	      parseExprPlain = function (tokens) {
		const parts = parseExprParts(tokens);
		switch (parts.length) {
			case 0:
				context.fail(tokens.loc, 'Expected an expression, got nothing.');
			case 1:
				return (0, _util.head)(parts);
			default:
				return (0, _MsAst.Call)(tokens.loc, (0, _util.head)(parts), (0, _util.tail)(parts));
		}
	};

	const parseFun = function (kind, tokens) {
		const isDo = kind === _Token.KW_FunDo || kind === _Token.KW_GenFunDo;
		const isGenerator = kind === _Token.KW_GenFun || kind === _Token.KW_GenFunDo;

		var _tryTakeReturnType2 = _tryTakeReturnType(tokens);

		const opReturnType = _tryTakeReturnType2.opReturnType;
		const rest = _tryTakeReturnType2.rest;

		var _funArgsAndBlock2 = _funArgsAndBlock(isDo, rest);

		const args = _funArgsAndBlock2.args;
		const opRestArg = _funArgsAndBlock2.opRestArg;
		const block = _funArgsAndBlock2.block;
		const opIn = _funArgsAndBlock2.opIn;
		const opOut = _funArgsAndBlock2.opOut;

		// Need res declare if there is a return type or out condition.
		const opResDeclare = (0, _util.ifElse)(opReturnType, function (_) {
			return (0, _MsAst.LocalDeclareRes)(_.loc, _);
		}, function () {
			return (0, _util.opMap)(opOut, function (o) {
				return (0, _MsAst.LocalDeclareRes)(o.loc, null);
			});
		});
		return (0, _MsAst.Fun)(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if ((0, _Token.isGroup)(_Token.G_Space, h) && (0, _Token.isKeyword)(_Token.KW_Type, (0, _util.head)(h.subTokens))) return {
				opReturnType: parseSpaced(_Slice2.default.group(h).tail()),
				rest: tokens.tail()
			};
		}
		return { opReturnType: null, rest: tokens };
	},
	      _funArgsAndBlock = function (isDo, tokens) {
		checkNonEmpty(tokens, 'Expected an indented block.');
		const h = tokens.head();
		// Might be `|case`
		if (h instanceof _Token.Keyword && (h.kind === _Token.KW_CaseVal || h.kind === _Token.KW_CaseDo)) {
			const eCase = parseCase(h.kind === _Token.KW_CaseVal, true, tokens.tail());
			const args = [(0, _MsAst.LocalDeclareFocus)(h.loc)];
			return h.kind === _Token.KW_CaseVal ? {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _MsAst.BlockWithReturn)(tokens.loc, [], eCase)
			} : {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _MsAst.BlockDo)(tokens.loc, [eCase])
			};
		} else {
			var _beforeAndBlock6 = beforeAndBlock(tokens);

			var _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2);

			const before = _beforeAndBlock62[0];
			const blockLines = _beforeAndBlock62[1];

			var _parseFunLocals2 = _parseFunLocals(before);

			const args = _parseFunLocals2.args;
			const opRestArg = _parseFunLocals2.opRestArg;

			for (const arg of args) if (!arg.isLazy()) arg.kind = _MsAst.LD_Mutable;

			var _tryTakeInOrOut2 = _tryTakeInOrOut(_Token.KW_In, blockLines);

			var _tryTakeInOrOut22 = _slicedToArray(_tryTakeInOrOut2, 2);

			const opIn = _tryTakeInOrOut22[0];
			const rest0 = _tryTakeInOrOut22[1];

			var _tryTakeInOrOut3 = _tryTakeInOrOut(_Token.KW_Out, rest0);

			var _tryTakeInOrOut32 = _slicedToArray(_tryTakeInOrOut3, 2);

			const opOut = _tryTakeInOrOut32[0];
			const rest1 = _tryTakeInOrOut32[1];

			const block = (isDo ? parseBlockDo : parseBlockVal)(rest1);
			return { args: args, opRestArg: opRestArg, block: block, opIn: opIn, opOut: opOut };
		}
	},
	      _parseFunLocals = function (tokens) {
		if (tokens.isEmpty()) return { args: [], opRestArg: null };else {
			const l = tokens.last();
			if (l instanceof _Token.DotName) {
				context.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: (0, _MsAst.LocalDeclarePlain)(l.loc, l.name)
				};
			} else return { args: parseLocalDeclares(tokens), opRestArg: null };
		}
	},
	      _tryTakeInOrOut = function (inOrOut, tokens) {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.headSlice();
			if ((0, _Token.isKeyword)(inOrOut, firstLine.head())) {
				const inOut = (0, _MsAst.Debug)(firstLine.loc, parseLinesFromBlock(firstLine));
				return [inOut, tokens.tail()];
			}
		}
		return [null, tokens];
	};

	const parseLine = function (tokens) {
		const head = tokens.head();
		const rest = tokens.tail();

		const noRest = function () {
			return checkEmpty(rest, function () {
				return 'Did not expect anything after ' + head.show();
			});
		};

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (head instanceof _Token.Keyword) switch (head.kind) {
			case _Token.KW_Assert:case _Token.KW_AssertNot:
				return parseAssert(head.kind === _Token.KW_AssertNot, rest);
			case _Token.KW_ExceptDo:
				return parseExcept(_Token.KW_ExceptDo, rest);
			case _Token.KW_BreakDo:
				noRest();
				return (0, _MsAst.BreakDo)(tokens.loc);
			case _Token.KW_BreakVal:
				return (0, _MsAst.BreakVal)(tokens.loc, parseExpr(rest));
			case _Token.KW_CaseDo:
				return parseCase(false, false, rest);
			case _Token.KW_Continue:
				noRest();
				return (0, _MsAst.Continue)(tokens.loc);
			case _Token.KW_Debug:
				return (0, _MsAst.Debug)(tokens.loc, (0, _Token.isGroup)(_Token.G_Block, tokens.second()) ?
				// `debug`, then indented block
				parseLinesFromBlock() :
				// `debug`, then single line
				parseLineOrLines(rest));
			case _Token.KW_Debugger:
				noRest();
				return (0, _MsAst.SpecialDo)(tokens.loc, _MsAst.SP_Debugger);
			case _Token.KW_Ellipsis:
				return (0, _MsAst.BagEntryMany)(tokens.loc, parseExpr(rest));
			case _Token.KW_ForDo:
				return parseForDo(rest);
			case _Token.KW_IfDo:case _Token.KW_UnlessDo:
				{
					var _beforeAndBlock7 = beforeAndBlock(rest);

					var _beforeAndBlock72 = _slicedToArray(_beforeAndBlock7, 2);

					const before = _beforeAndBlock72[0];
					const block = _beforeAndBlock72[1];

					return (0, _MsAst.ConditionalDo)(tokens.loc, parseExpr(before), parseBlockDo(block), head.kind === _Token.KW_UnlessDo);
				}
			case _Token.KW_ObjAssign:
				return (0, _MsAst.BagEntry)(tokens.loc, parseExpr(rest));
			case _Token.KW_Throw:
				return (0, _MsAst.Throw)(tokens.loc, (0, _util.opIf)(!rest.isEmpty(), function () {
					return parseExpr(rest);
				}));
			case _Token.KW_Pass:
				noRest();
				return [];
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return (0, _util.ifElse)(tokens.opSplitOnceWhere(_isLineSplitKeyword), function (_ref4) {
			let before = _ref4.before;
			let at = _ref4.at;
			let after = _ref4.after;

			return at.kind === _Token.KW_MapEntry ? _parseMapEntry(before, after, tokens.loc) : at.kind === _Token.KW_LocalMutate ? _parseLocalMutate(before, after, tokens.loc) : _parseAssign(before, at, after, tokens.loc);
		}, function () {
			return parseExpr(tokens);
		});
	},
	      parseLineOrLines = function (tokens) {
		const _ = parseLine(tokens);
		return _ instanceof Array ? _ : [_];
	};

	// parseLine privates
	const _isLineSplitKeyword = function (token) {
		if (token instanceof _Token.Keyword) switch (token.kind) {
			case _Token.KW_Assign:case _Token.KW_AssignMutable:case _Token.KW_LocalMutate:
			case _Token.KW_MapEntry:case _Token.KW_ObjAssign:case _Token.KW_Yield:case _Token.KW_YieldTo:
				return true;
			default:
				return false;
		} else return false;
	},
	      _parseLocalMutate = function (localsTokens, valueTokens, loc) {
		const locals = parseLocalDeclaresJustNames(localsTokens);
		context.check(locals.length === 1, loc, 'TODO: LocalDestructureMutate');
		const name = locals[0].name;
		const value = parseExpr(valueTokens);
		return (0, _MsAst.LocalMutate)(loc, name, value);
	},
	      _parseAssign = function (localsTokens, assigner, valueTokens, loc) {
		const kind = assigner.kind;
		const locals = parseLocalDeclares(localsTokens);
		const opName = (0, _util.opIf)(locals.length === 1, function () {
			return locals[0].name;
		});
		const value = _parseAssignValue(kind, opName, valueTokens);

		const isYield = kind === _Token.KW_Yield || kind === _Token.KW_YieldTo;
		if ((0, _util.isEmpty)(locals)) {
			context.check(isYield, localsTokens.loc, 'Assignment to nothing');
			return value;
		} else {
			if (isYield) for (const _ of locals) context.check(!_.isLazy(), _.loc, 'Can not yield to lazy variable.');

			const isObjAssign = kind === _Token.KW_ObjAssign;

			if (kind === _Token.KW_AssignMutable) for (let _ of locals) {
				context.check(!_.isLazy(), _.loc, 'Lazy local can not be mutable.');
				_.kind = _MsAst.LD_Mutable;
			}

			const wrap = function (_) {
				return isObjAssign ? (0, _MsAst.ObjEntry)(loc, _) : _;
			};

			if (locals.length === 1) {
				const assignee = locals[0];
				const assign = (0, _MsAst.AssignSingle)(loc, assignee, value);
				const isTest = isObjAssign && assignee.name.endsWith('test');
				return isTest ? (0, _MsAst.Debug)(loc, [wrap(assign)]) : wrap(assign);
			} else {
				const kind = locals[0].kind;
				for (const _ of locals) context.check(_.kind === kind, _.loc, 'All locals of destructuring assignment must be of the same kind.');
				return wrap((0, _MsAst.AssignDestructure)(loc, locals, value, kind));
			}
		}
	},
	      _parseAssignValue = function (kind, opName, valueTokens) {
		const value = valueTokens.isEmpty() && kind === _Token.KW_ObjAssign ? (0, _MsAst.SpecialVal)(valueTokens.loc, _MsAst.SV_Null) : parseExpr(valueTokens);
		if (opName !== null) _tryAddName(value, opName);
		switch (kind) {
			case _Token.KW_Yield:
				return (0, _MsAst.Yield)(value.loc, value);
			case _Token.KW_YieldTo:
				return (0, _MsAst.YieldTo)(value.loc, value);
			default:
				return value;
		}
	},
	     

	// We give it a name if:
	// It's a function
	// It's an Obj block
	// It's an Obj block at the end of a call (as in `name = Obj-Type ...`)
	_tryAddName = function (_, name) {
		if (_ instanceof _MsAst.Fun || _ instanceof _MsAst.Class) _.opName = name;else if (_ instanceof _MsAst.Call && _.args.length > 0) _tryAddObjName((0, _util.last)(_.args), name);else _tryAddObjName(_, name);
	},
	      _tryAddObjName = function (_, name) {
		if (_ instanceof _MsAst.BlockWrap && _.block instanceof _MsAst.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _MsAst.Fun) _.block.opObjed.opName = name;else if (!_nameObjAssignSomewhere(_.block.lines)) _.block.opName = name;
	},
	      _nameObjAssignSomewhere = function (lines) {
		return lines.some(function (line) {
			return line instanceof _MsAst.ObjEntry && line.assign.allAssignees().some(function (_) {
				return _.name === 'name';
			});
		});
	},
	      _parseMapEntry = function (before, after, loc) {
		return (0, _MsAst.MapEntry)(loc, parseExpr(before), parseExpr(after));
	};

	const parseLocalDeclaresJustNames = function (tokens) {
		return tokens.map(function (_) {
			return (0, _MsAst.LocalDeclarePlain)(_.loc, _parseLocalName(_));
		});
	},
	      parseLocalDeclares = function (tokens) {
		return tokens.map(parseLocalDeclare);
	},
	      parseLocalDeclare = function (token) {
		if ((0, _Token.isGroup)(_Token.G_Space, token)) {
			const tokens = _Slice2.default.group(token);

			var _ref5 = (0, _Token.isKeyword)(_Token.KW_Lazy, tokens.head()) ? [tokens.tail(), true] : [tokens, false];

			var _ref52 = _slicedToArray(_ref5, 2);

			const rest = _ref52[0];
			const isLazy = _ref52[1];

			const name = _parseLocalName(rest.head());
			const rest2 = rest.tail();
			const opType = (0, _util.opIf)(!rest2.isEmpty(), function () {
				const colon = rest2.head();
				context.check((0, _Token.isKeyword)(_Token.KW_Type, colon), colon.loc, function () {
					return 'Expected ' + (0, _CompileError.code)(':');
				});
				const tokensType = rest2.tail();
				checkNonEmpty(tokensType, function () {
					return 'Expected something after ' + colon.show();
				});
				return parseSpaced(tokensType);
			});
			return (0, _MsAst.LocalDeclare)(token.loc, name, opType, isLazy ? _MsAst.LD_Lazy : _MsAst.LD_Const);
		} else return (0, _MsAst.LocalDeclarePlain)(token.loc, _parseLocalName(token));
	};

	// parseLocalDeclare privates
	const _parseLocalName = function (t) {
		if ((0, _Token.isKeyword)(_Token.KW_Focus, t)) return '_';else {
			context.check(t instanceof _Token.Name, t.loc, function () {
				return 'Expected a local name, not ' + t.show();
			});
			// TODO: Allow this?
			context.check(!_language.JsGlobals.has(t.name), t.loc, function () {
				return 'Can not shadow global ' + (0, _CompileError.code)(t.name);
			});
			return t.name;
		}
	};

	const parseSingle = function (token) {
		const loc = token.loc;

		return token instanceof _Token.Name ? _access(token.name, loc) : token instanceof _Token.Group ? (function () {
			const slice = _Slice2.default.group(token);
			switch (token.kind) {
				case _Token.G_Space:
					return parseSpaced(slice);
				case _Token.G_Parenthesis:
					return parseExpr(slice);
				case _Token.G_Bracket:
					return (0, _MsAst.BagSimple)(loc, parseExprParts(slice));
				case _Token.G_Block:
					return blockWrap(slice);
				case _Token.G_Quote:
					return (0, _MsAst.Quote)(loc, slice.map(function (_) {
						return typeof _ === 'string' ? _ : parseSingle(_);
					}));
				default:
					throw new Error(token.kind);
			}
		})() : token instanceof _MsAst.NumberLiteral ? token : token instanceof _Token.Keyword ? token.kind === _Token.KW_Focus ? _MsAst.LocalAccess.focus(loc) : (0, _util.ifElse)((0, _Token.opKeywordKindToSpecialValueKind)(token.kind), function (_) {
			return (0, _MsAst.SpecialVal)(loc, _);
		}, function () {
			return unexpected(token);
		}) : token instanceof _Token.DotName && token.nDots === 3 ? (0, _MsAst.Splat)(loc, (0, _MsAst.LocalAccess)(loc, token.name)) : unexpected(token);
	};

	// parseSingle privates
	const _access = function (name, loc) {
		return _language.JsGlobals.has(name) ? (0, _MsAst.GlobalAccess)(loc, name) : (0, _MsAst.LocalAccess)(loc, name);
	};

	const parseSpaced = function (tokens) {
		const h = tokens.head(),
		      rest = tokens.tail();
		if ((0, _Token.isKeyword)(_Token.KW_Type, h)) {
			const eType = parseSpaced(rest);
			const focus = _MsAst.LocalAccess.focus(h.loc);
			return _MsAst.Call.contains(h.loc, eType, focus);
		} else if ((0, _Token.isKeyword)(_Token.KW_Lazy, h)) return (0, _MsAst.Lazy)(h.loc, parseSpaced(rest));else {
			// Tokens within a space group wrap previous tokens.
			const mod = function (acc, token) {
				const loc = token.loc;
				if (token instanceof _Token.DotName) {
					context.check(token.nDots === 1, loc, 'Too many dots!');
					return (0, _MsAst.Member)(loc, acc, token.name);
				} else if ((0, _Token.isKeyword)(_Token.KW_Focus, token)) return (0, _MsAst.Call)(loc, acc, [_MsAst.LocalAccess.focus(loc)]);else if (token instanceof _Token.Group) {
					if (token.kind === _Token.G_Bracket) return _MsAst.Call.sub(loc, (0, _util.unshift)(acc, parseExprParts(_Slice2.default.group(token))));
					if (token.kind === _Token.G_Parenthesis) {
						checkEmpty(_Slice2.default.group(token), function () {
							return 'Use ' + (0, _CompileError.code)('(a b)') + ', not ' + (0, _CompileError.code)('a(b)');
						});
						return (0, _MsAst.Call)(loc, acc, []);
					}
				} else context.fail(tokens.loc, 'Expected member or sub, not ' + token.show());
			};
			return rest.reduce(mod, parseSingle(h));
		}
	};

	const tryParseUses = function (k, tokens) {
		if (!tokens.isEmpty()) {
			const line0 = tokens.headSlice();
			if ((0, _Token.isKeyword)(k, line0.head())) return [_parseUses(k, line0.tail()), tokens.tail()];
		}
		return [[], tokens];
	};

	// tryParseUse privates
	const _parseUses = function (useKeywordKind, tokens) {
		var _beforeAndBlock8 = beforeAndBlock(tokens);

		var _beforeAndBlock82 = _slicedToArray(_beforeAndBlock8, 2);

		const before = _beforeAndBlock82[0];
		const lines = _beforeAndBlock82[1];

		checkEmpty(before, function () {
			return 'Did not expect anything after ' + (0, _CompileError.code)(useKeywordKind) + ' other than a block';
		});
		return lines.mapSlices(function (line) {
			var _parseRequire2 = _parseRequire(line.head());

			const path = _parseRequire2.path;
			const name = _parseRequire2.name;

			if (useKeywordKind === _Token.KW_UseDo) {
				if (line.size() > 1) unexpected(line.second());
				return (0, _MsAst.UseDo)(line.loc, path);
			} else {
				const isLazy = useKeywordKind === _Token.KW_UseLazy || useKeywordKind === _Token.KW_UseDebug;

				var _parseThingsUsed2 = _parseThingsUsed(name, isLazy, line.tail());

				const used = _parseThingsUsed2.used;
				const opUseDefault = _parseThingsUsed2.opUseDefault;

				return (0, _MsAst.Use)(line.loc, path, used, opUseDefault);
			}
		});
	},
	      _parseThingsUsed = function (name, isLazy, tokens) {
		const useDefault = function () {
			return (0, _MsAst.LocalDeclareUntyped)(tokens.loc, name, isLazy ? _MsAst.LD_Lazy : _MsAst.LD_Const);
		};
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref6 = (0, _Token.isKeyword)(_Token.KW_Focus, tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref62 = _slicedToArray(_ref6, 2);

			const opUseDefault = _ref62[0];
			const rest = _ref62[1];

			const used = parseLocalDeclaresJustNames(rest).map(function (l) {
				context.check(l.name !== '_', l.pos, function () {
					return (0, _CompileError.code)('_') + ' not allowed as import name.';
				});
				if (isLazy) l.kind = _MsAst.LD_Lazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	},
	      _parseRequire = function (t) {
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: (0, _util.push)(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
			context.check((0, _Token.isGroup)(_Token.G_Space, t), t.loc, 'Not a valid module name.');
			return _parseLocalRequire(_Slice2.default.group(t));
		}
	},
	      _parseLocalRequire = function (tokens) {
		const first = tokens.head();
		let parts;
		if (first instanceof _Token.DotName) parts = _partsFromDotName(first);else {
			context.check(first instanceof _Token.Name, first.loc, 'Not a valid part of module path.');
			parts = [];
		}
		parts.push(first.name);
		tokens.tail().each(function (token) {
			context.check(token instanceof _Token.DotName && token.nDots === 1, token.loc, 'Not a valid part of module path.');
			parts.push(token.name);
		});
		return { path: parts.join('/'), name: tokens.last().name };
	},
	      _partsFromDotName = function (dotName) {
		return dotName.nDots === 1 ? ['.'] : (0, _util.repeat)('..', dotName.nDots - 1);
	};

	const _parseFor = function (ctr) {
		return function (tokens) {
			var _beforeAndBlock9 = beforeAndBlock(tokens);

			var _beforeAndBlock92 = _slicedToArray(_beforeAndBlock9, 2);

			const before = _beforeAndBlock92[0];
			const block = _beforeAndBlock92[1];

			return ctr(tokens.loc, _parseOpIteratee(before), parseBlockDo(block));
		};
	},
	      _parseOpIteratee = function (tokens) {
		return (0, _util.opIf)(!tokens.isEmpty(), function () {
			var _ifElse = (0, _util.ifElse)(tokens.opSplitOnceWhere(function (_) {
				return (0, _Token.isKeyword)(_Token.KW_In, _);
			}), function (_ref7) {
				let before = _ref7.before;
				let after = _ref7.after;

				context.check(before.size() === 1, before.loc, 'TODO: pattern in for');
				return [parseLocalDeclaresJustNames(before)[0], parseExpr(after)];
			}, function () {
				return [(0, _MsAst.LocalDeclareFocus)(tokens.loc), parseExpr(tokens)];
			});

			var _ifElse2 = _slicedToArray(_ifElse, 2);

			const element = _ifElse2[0];
			const bag = _ifElse2[1];

			return (0, _MsAst.Iteratee)(tokens.loc, element, bag);
		});
	};
	const parseForDo = _parseFor(_MsAst.ForDo),
	      parseForVal = _parseFor(_MsAst.ForVal),
	     
	// TODO: -> out-type
	parseForBag = function (tokens) {
		var _beforeAndBlock10 = beforeAndBlock(tokens);

		var _beforeAndBlock102 = _slicedToArray(_beforeAndBlock10, 2);

		const before = _beforeAndBlock102[0];
		const lines = _beforeAndBlock102[1];

		const block = parseBlockDo(lines);
		// TODO: Better way?
		if (block.lines.length === 1 && block.lines[0] instanceof _MsAst.Val) block.lines[0] = (0, _MsAst.BagEntry)(block.lines[0].loc, block.lines[0]);
		return _MsAst.ForBag.of(tokens.loc, _parseOpIteratee(before), block);
	};

	const parseExcept = function (kwExcept, tokens) {
		const isVal = kwExcept === _Token.KW_ExceptVal,
		      justDoValBlock = isVal ? justBlockVal : justBlockDo,
		      parseBlock = isVal ? parseBlockVal : parseBlockDo,
		      Except = isVal ? _MsAst.ExceptVal : _MsAst.ExceptDo,
		      kwTry = isVal ? _Token.KW_TryVal : _Token.KW_TryDo,
		      kwCatch = isVal ? _Token.KW_CatchVal : _Token.KW_CatchDo,
		      nameTry = function () {
			return (0, _CompileError.code)((0, _Token.keywordName)(kwTry));
		},
		      nameCatch = function () {
			return (0, _CompileError.code)((0, _Token.keywordName)(kwCatch));
		},
		      nameFinally = function () {
			return (0, _CompileError.code)((0, _Token.keywordName)(_Token.KW_Finally));
		};

		const lines = justBlock(kwExcept, tokens);

		// `try` *must* come first.
		const firstLine = lines.headSlice();
		const tokenTry = firstLine.head();
		context.check((0, _Token.isKeyword)(kwTry, tokenTry), tokenTry.loc, function () {
			return 'Must start with ' + nameTry();
		});
		const _try = justDoValBlock(kwTry, firstLine.tail());

		const restLines = lines.tail();
		checkNonEmpty(restLines, function () {
			return 'Must have at least one of ' + nameCatch() + ' or ' + nameFinally();
		});

		const handleFinally = function (restLines) {
			const line = restLines.headSlice();
			const tokenFinally = line.head();
			context.check((0, _Token.isKeyword)(_Token.KW_Finally, tokenFinally), tokenFinally.loc, function () {
				return 'Expected ' + nameFinally();
			});
			context.check(restLines.size() === 1, restLines.loc, function () {
				return 'Nothing is allowed to come after ' + nameFinally() + '.';
			});
			return justBlockDo(_Token.KW_Finally, line.tail());
		};

		let _catch, _finally;

		const line2 = restLines.headSlice();
		const head2 = line2.head();
		if ((0, _Token.isKeyword)(kwCatch, head2)) {
			var _beforeAndBlock11 = beforeAndBlock(line2.tail());

			var _beforeAndBlock112 = _slicedToArray(_beforeAndBlock11, 2);

			const before2 = _beforeAndBlock112[0];
			const block2 = _beforeAndBlock112[1];

			const caught = _parseOneLocalDeclareOrFocus(before2);
			_catch = (0, _MsAst.Catch)(line2.loc, caught, parseBlock(block2));
			_finally = (0, _util.opIf)(restLines.size() > 1, function () {
				return handleFinally(restLines.tail());
			});
		} else {
			_catch = null;
			_finally = handleFinally(restLines);
		}

		return Except(tokens.loc, _try, _catch, _finally);
	},
	      _parseOneLocalDeclareOrFocus = function (tokens) {
		if (tokens.isEmpty()) return (0, _MsAst.LocalDeclareFocus)(tokens.loc);else {
			context.check(tokens.size() === 1, 'Expected only one local declare.');
			return parseLocalDeclares(tokens)[0];
		}
	};

	const parseAssert = function (negate, tokens) {
		checkNonEmpty(tokens, function () {
			return 'Expected something after ' + (0, _Token.keywordName)(_Token.KW_Assert) + '.';
		});

		var _ifElse3 = (0, _util.ifElse)(tokens.opSplitOnceWhere(function (_) {
			return (0, _Token.isKeyword)(_Token.KW_Throw, _);
		}), function (_ref8) {
			let before = _ref8.before;
			let after = _ref8.after;
			return [before, parseExpr(after)];
		}, function () {
			return [tokens, null];
		});

		var _ifElse32 = _slicedToArray(_ifElse3, 2);

		const condTokens = _ifElse32[0];
		const opThrown = _ifElse32[1];

		const parts = parseExprParts(condTokens);
		const cond = parts.length === 1 ? parts[0] : (0, _MsAst.Call)(condTokens.loc, parts[0], (0, _util.tail)(parts));
		return (0, _MsAst.Assert)(tokens.loc, negate, cond, opThrown);
	};

	const parseClass = function (tokens) {
		var _beforeAndBlock12 = beforeAndBlock(tokens);

		var _beforeAndBlock122 = _slicedToArray(_beforeAndBlock12, 2);

		const before = _beforeAndBlock122[0];
		const block = _beforeAndBlock122[1];

		const opExtended = (0, _util.opIf)(!before.isEmpty(), function () {
			return parseExpr(before);
		});

		const line1 = block.headSlice();

		var _ref9 = (0, _Token.isKeyword)(_Token.KW_Static, line1.head()) ? [_parseStatics(line1.tail()), block.tail()] : [[], block];

		var _ref92 = _slicedToArray(_ref9, 2);

		const statics = _ref92[0];
		const rest = _ref92[1];

		const line2 = rest.headSlice();

		var _ref10 = (0, _Token.isKeyword)(_Token.KW_Construct, line2.head()) ? [_parseConstructor(line2.tail()), rest.tail()] : [null, rest];

		var _ref102 = _slicedToArray(_ref10, 2);

		const opConstructor = _ref102[0];
		const rest2 = _ref102[1];

		const methods = _parseMethods(rest2);

		return (0, _MsAst.Class)(tokens.loc, opExtended, statics, opConstructor, methods);
	};

	const _parseConstructor = function (tokens) {
		var _funArgsAndBlock3 = _funArgsAndBlock(true, tokens);

		const args = _funArgsAndBlock3.args;
		const opRestArg = _funArgsAndBlock3.opRestArg;
		const block = _funArgsAndBlock3.block;
		const opIn = _funArgsAndBlock3.opIn;
		const opOut = _funArgsAndBlock3.opOut;

		const isGenerator = false,
		      opResDeclare = null;
		return (0, _MsAst.Fun)(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut, 'constructor');
	},
	      _parseStatics = function (tokens) {
		const block = justBlock(_Token.KW_Static, tokens);
		return _parseMethods(block);
	},
	      _parseMethods = function (tokens) {
		return tokens.mapSlices(_parseMethod);
	},
	      _parseMethod = function (tokens) {
		const nameToken = tokens.head();

		if ((0, _Token.isKeyword)(_Token.KW_Get, nameToken) || (0, _Token.isKeyword)(_Token.KW_Set, nameToken)) context.fail(nameToken.loc, 'TODO: get/set!');

		context.check(nameToken instanceof _Token.Name, nameToken.loc, function () {
			return 'Expected name, got ' + nameToken;
		});
		const name = nameToken.name;

		const fun = _parseMethodFun(tokens.tail());
		(0, _util.assert)(fun.opName === null);
		fun.opName = name;
		return fun;
	},
	      _parseMethodFun = function (tokens) {
		const funKindToken = tokens.head();
		context.check(_isFunKind(funKindToken), funKindToken.loc, function () {
			return 'Expected function, got ' + funKindToken;
		});
		return parseFun(funKindToken.kind, tokens.tail());
	},
	      _isFunKind = function (token) {
		if (!(token instanceof _Token.Keyword)) return false;
		switch (token.kind) {
			case _Token.KW_Fun:case _Token.KW_GenFun:case _Token.KW_FunDo:case _Token.KW_GenFunDo:
				return true;
			default:
				return false;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLEtBQUksT0FBTyxDQUFBOzs7Ozs7Ozs7Ozs7O2tCQVlJLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUN2QyxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFlBckJRLE1BQU0sRUFxQlAsV0E5QnNFLE9BQU8sU0FBNUQsT0FBTyxFQThCUCxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTs7QUFFakQsU0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEtBQUssQ0FBQTtFQUNaOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNyRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDdEQsVUFBVSxHQUFHLFVBQUEsS0FBSztTQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsa0JBQWdCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRztFQUFBLENBQUE7O0FBRTVFLE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJOzs7c0JBRUgsWUFBWSxRQXZDVSxRQUFRLEVBdUNQLE1BQU0sQ0FBQzs7OztRQUFoRCxNQUFNO1FBQUUsS0FBSzs7dUJBQ1EsWUFBWSxRQXhDZCxNQUFNLEVBd0NpQixLQUFLLENBQUM7Ozs7UUFBaEQsU0FBUztR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LEtBQUssQ0FBQTtBQUFBLEdBQ2I7RUFDRCxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NlcnQsIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25TaW5nbGUsIEJhZ0VudHJ5LCBCYWdFbnRyeU1hbnksIEJhZ1NpbXBsZSwgQmxvY2tCYWcsXG5cdEJsb2NrRG8sIEJsb2NrTWFwLCBCbG9ja09iaiwgQmxvY2tWYWxUaHJvdywgQmxvY2tXaXRoUmV0dXJuLCBCbG9ja1dyYXAsIEJyZWFrRG8sIEJyZWFrVmFsLFxuXHRDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCwgQ2FzZURvLCBDYXNlVmFsLCBDYXRjaCwgQ2xhc3MsIENvbmRpdGlvbmFsRG8sIENvbmRpdGlvbmFsVmFsLFxuXHRDb250aW51ZSwgRGVidWcsIEl0ZXJhdGVlLCBOdW1iZXJMaXRlcmFsLCBFeGNlcHREbywgRXhjZXB0VmFsLCBGb3JCYWcsIEZvckRvLCBGb3JWYWwsIEZ1bixcblx0R2xvYmFsQWNjZXNzLCBMX0FuZCwgTF9PciwgTGF6eSwgTERfQ29uc3QsIExEX0xhenksIExEX011dGFibGUsIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsXG5cdExvY2FsRGVjbGFyZUZvY3VzLCBMb2NhbERlY2xhcmVOYW1lLCBMb2NhbERlY2xhcmVQbGFpbiwgTG9jYWxEZWNsYXJlUmVzLCBMb2NhbERlY2xhcmVVbnR5cGVkLFxuXHRMb2NhbE11dGF0ZSwgTG9naWMsIE1hcEVudHJ5LCBNZW1iZXIsIE1vZHVsZSwgTmV3LCBOb3QsIE9iakVudHJ5LCBPYmpQYWlyLCBPYmpTaW1wbGUsIFBhdHRlcm4sXG5cdFF1b3RlLCBTUF9EZWJ1Z2dlciwgU3BlY2lhbERvLCBTcGVjaWFsVmFsLCBTVl9OdWxsLCBTcGxhdCwgVGhyb3csIFZhbCwgVXNlLCBVc2VEbywgWWllbGQsXG5cdFlpZWxkVG8gfSBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL2xhbmd1YWdlJ1xuaW1wb3J0IHsgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19QYXJlbnRoZXNpcywgR19TcGFjZSwgR19RdW90ZSwgaXNHcm91cCwgaXNLZXl3b3JkLFxuXHRLZXl3b3JkLCBLV19BbmQsIEtXX0Fzc2VydCwgS1dfQXNzZXJ0Tm90LCBLV19Bc3NpZ24sIEtXX0Fzc2lnbk11dGFibGUsIEtXX0JyZWFrRG8sIEtXX0JyZWFrVmFsLFxuXHRLV19DYXNlVmFsLCBLV19DYXNlRG8sIEtXX0NsYXNzLCBLV19DYXRjaERvLCBLV19DYXRjaFZhbCwgS1dfQ29uc3RydWN0LCBLV19Db250aW51ZSxcblx0S1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbGxpcHNpcywgS1dfRWxzZSwgS1dfRXhjZXB0RG8sIEtXX0V4Y2VwdFZhbCwgS1dfRmluYWxseSwgS1dfRm9yQmFnLFxuXHRLV19Gb3JEbywgS1dfRm9yVmFsLCBLV19Gb2N1cywgS1dfRnVuLCBLV19GdW5EbywgS1dfR2VuRnVuLCBLV19HZW5GdW5EbywgS1dfR2V0LCBLV19JZkRvLFxuXHRLV19JZlZhbCwgS1dfSW4sIEtXX0xhenksIEtXX0xvY2FsTXV0YXRlLCBLV19NYXBFbnRyeSwgS1dfTmV3LCBLV19Ob3QsIEtXX09iakFzc2lnbiwgS1dfT3IsXG5cdEtXX1Bhc3MsIEtXX091dCwgS1dfUmVnaW9uLCBLV19TZXQsIEtXX1N0YXRpYywgS1dfVGhyb3csIEtXX1RyeURvLCBLV19UcnlWYWwsIEtXX1R5cGUsXG5cdEtXX1VubGVzc0RvLCBLV19Vbmxlc3NWYWwsIEtXX1VzZSwgS1dfVXNlRGVidWcsIEtXX1VzZURvLCBLV19Vc2VMYXp5LCBLV19ZaWVsZCwgS1dfWWllbGRUbyxcblx0TmFtZSwga2V5d29yZE5hbWUsIG9wS2V5d29yZEtpbmRUb1NwZWNpYWxWYWx1ZUtpbmQgfSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaGVhZCwgaWZFbHNlLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LFxuXHRvcElmLCBvcE1hcCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxuLy8gU2luY2UgdGhlcmUgYXJlIHNvIG1hbnkgcGFyc2luZyBmdW5jdGlvbnMsXG4vLyBpdCdzIGZhc3RlciAoYXMgb2Ygbm9kZSB2MC4xMS4xNCkgdG8gaGF2ZSB0aGVtIGFsbCBjbG9zZSBvdmVyIHRoaXMgbXV0YWJsZSB2YXJpYWJsZSBvbmNlXG4vLyB0aGFuIHRvIGNsb3NlIG92ZXIgdGhlIHBhcmFtZXRlciAoYXMgaW4gbGV4LmpzLCB3aGVyZSB0aGF0J3MgbXVjaCBmYXN0ZXIpLlxubGV0IGNvbnRleHRcblxuLypcblRoaXMgY29udmVydHMgYSBUb2tlbiB0cmVlIHRvIGEgTXNBc3QuXG5UaGlzIGlzIGEgcmVjdXJzaXZlLWRlc2NlbnQgcGFyc2VyLCBtYWRlIGVhc2llciBieSB0d28gZmFjdHM6XG5cdCogV2UgaGF2ZSBhbHJlYWR5IGdyb3VwZWQgdG9rZW5zLlxuXHQqIE1vc3Qgb2YgdGhlIHRpbWUsIGFuIGFzdCdzIHR5cGUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgdG9rZW4uXG5cblRoZXJlIGFyZSBleGNlcHRpb25zIHN1Y2ggYXMgYXNzaWdubWVudCBzdGF0ZW1lbnRzIChpbmRpY2F0ZWQgYnkgYSBgPWAgc29tZXdoZXJlIGluIHRoZSBtaWRkbGUpLlxuRm9yIHRob3NlIHdlIG11c3QgaXRlcmF0ZSB0aHJvdWdoIHRva2VucyBhbmQgc3BsaXQuXG4oU2VlIFNsaWNlLm9wU3BsaXRPbmNlV2hlcmUgYW5kIFNsaWNlLm9wU3BsaXRNYW55V2hlcmUuKVxuKi9cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgcm9vdFRva2VuKSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRhc3NlcnQoaXNHcm91cChHX0Jsb2NrLCByb290VG9rZW4pKVxuXHRjb25zdCBtc0FzdCA9IHBhcnNlTW9kdWxlKFNsaWNlLmdyb3VwKHJvb3RUb2tlbikpXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbnMuXG5cdGNvbnRleHQgPSB1bmRlZmluZWRcblx0cmV0dXJuIG1zQXN0XG59XG5cbmNvbnN0XG5cdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGNvbnRleHQuY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdGNoZWNrTm9uRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGNvbnRleHQuY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdG9rZW4gPT4gY29udGV4dC5mYWlsKHRva2VuLmxvYywgYFVuZXhwZWN0ZWQgJHt0b2tlbi5zaG93KCl9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHQvLyBVc2Ugc3RhdGVtZW50cyBtdXN0IGFwcGVhciBpbiBvcmRlci5cblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfSA9IHBhcnNlTW9kdWxlQmxvY2socmVzdDMpXG5cblx0aWYgKGNvbnRleHQub3B0cy5pbmNsdWRlTW9kdWxlTmFtZSgpICYmICFleHBvcnRzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICduYW1lJykpIHtcblx0XHRjb25zdCBuYW1lID0gTG9jYWxEZWNsYXJlTmFtZSh0b2tlbnMubG9jKVxuXHRcdGxpbmVzLnB1c2goQXNzaWduU2luZ2xlKHRva2Vucy5sb2MsIG5hbWUsXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY29udGV4dC5vcHRzLm1vZHVsZU5hbWUoKSkpKVxuXHRcdGV4cG9ydHMucHVzaChuYW1lKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y29udGV4dC5jaGVjayhpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrID0gKGtleXdvcmQsIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PlxuXHRcdFx0YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGJldHdlZW4gJHtjb2RlKGtleXdvcmROYW1lKGtleXdvcmQpKX0gYW5kIGJsb2NrLmApXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cdGp1c3RCbG9ja0RvID0gKGtleXdvcmQsIHRva2VucykgPT5cblx0XHRwYXJzZUJsb2NrRG8oanVzdEJsb2NrKGtleXdvcmQsIHRva2VucykpLFxuXHRqdXN0QmxvY2tWYWwgPSAoa2V5d29yZCwgdG9rZW5zKSA9PlxuXHRcdHBhcnNlQmxvY2tWYWwoanVzdEJsb2NrKGtleXdvcmQsIHRva2VucykpLFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2guc2hvdygpfWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay5zdWJUb2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBsaW5lcyA9IF9wbGFpbkJsb2NrTGluZXModG9rZW5zKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgbGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIEJsb2NrQmFnLm9mKHRva2Vucy5sb2MsIGxpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX01hcDpcblx0XHRcdFx0cmV0dXJuIEJsb2NrTWFwLm9mKHRva2Vucy5sb2MsIGxpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX09iajpcblx0XHRcdFx0Y29uc3QgWyBkb0xpbmVzLCBvcFZhbCBdID0gX3RyeVRha2VMYXN0VmFsKGxpbmVzKVxuXHRcdFx0XHQvLyBvcE5hbWUgd3JpdHRlbiB0byBieSBfdHJ5QWRkTmFtZS5cblx0XHRcdFx0cmV0dXJuIEJsb2NrT2JqLm9mKHRva2Vucy5sb2MsIGRvTGluZXMsIG9wVmFsLCBudWxsKVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0VtcHR5KGxpbmVzKSwgdG9rZW5zLmxvYywgJ1ZhbHVlIGJsb2NrIG11c3QgZW5kIGluIGEgdmFsdWUuJylcblx0XHRcdFx0Y29uc3QgdmFsID0gbGFzdChsaW5lcylcblx0XHRcdFx0aWYgKHZhbCBpbnN0YW5jZW9mIFRocm93KVxuXHRcdFx0XHRcdHJldHVybiBCbG9ja1ZhbFRocm93KHRva2Vucy5sb2MsIHJ0YWlsKGxpbmVzKSwgdmFsKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKHZhbCBpbnN0YW5jZW9mIFZhbCwgdmFsLmxvYywgJ1ZhbHVlIGJsb2NrIG11c3QgZW5kIGluIGEgdmFsdWUuJylcblx0XHRcdFx0XHRyZXR1cm4gQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIHJ0YWlsKGxpbmVzKSwgdmFsKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHBhcnNlTW9kdWxlQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgbGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGNvbnN0IGxvYyA9IHRva2Vucy5sb2Ncblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6IGNhc2UgS1JldHVybl9NYXA6IHtcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSAoa1JldHVybiA9PT0gS1JldHVybl9CYWcgPyBCbG9ja0JhZyA6IEJsb2NrTWFwKS5vZihsb2MsIGxpbmVzKVxuXHRcdFx0XHRyZXR1cm4geyBsaW5lczogWyBdLCBleHBvcnRzOiBbIF0sIG9wRGVmYXVsdEV4cG9ydDogQmxvY2tXcmFwKGxvYywgYmxvY2spIH1cblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Y29uc3QgZXhwb3J0cyA9IFsgXVxuXHRcdFx0XHRsZXQgb3BEZWZhdWx0RXhwb3J0ID0gbnVsbFxuXHRcdFx0XHRjb25zdCBtb2R1bGVOYW1lID0gY29udGV4dC5vcHRzLm1vZHVsZU5hbWUoKVxuXG5cdFx0XHRcdC8vIE1vZHVsZSBleHBvcnRzIGxvb2sgbGlrZSBhIEJsb2NrT2JqLCAgYnV0IGFyZSByZWFsbHkgZGlmZmVyZW50LlxuXHRcdFx0XHQvLyBJbiBFUzYsIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgY29tcGxldGVseSBzdGF0aWMuXG5cdFx0XHRcdC8vIFNvIHdlIGtlZXAgYW4gYXJyYXkgb2YgZXhwb3J0cyBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgTW9kdWxlIGFzdC5cblx0XHRcdFx0Ly8gSWYgeW91IHdyaXRlOlxuXHRcdFx0XHQvL1x0aWYhIGNvbmRcblx0XHRcdFx0Ly9cdFx0YS4gYlxuXHRcdFx0XHQvLyBpbiBhIG1vZHVsZSBjb250ZXh0LCBpdCB3aWxsIGJlIGFuIGVycm9yLiAoVGhlIG1vZHVsZSBjcmVhdGVzIG5vIGBidWlsdGAgbG9jYWwuKVxuXHRcdFx0XHRjb25zdCBnZXRMaW5lRXhwb3J0cyA9IGxpbmUgPT4ge1xuXHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkpIHtcblx0XHRcdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lLmFzc2lnbi5hbGxBc3NpZ25lZXMoKSlcblx0XHRcdFx0XHRcdFx0aWYgKF8ubmFtZSA9PT0gbW9kdWxlTmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2sob3BEZWZhdWx0RXhwb3J0ID09PSBudWxsLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdGBEZWZhdWx0IGV4cG9ydCBhbHJlYWR5IGRlY2xhcmVkIGF0ICR7b3BEZWZhdWx0RXhwb3J0LmxvY31gKVxuXHRcdFx0XHRcdFx0XHRcdG9wRGVmYXVsdEV4cG9ydCA9IExvY2FsQWNjZXNzKF8ubG9jLCBfLm5hbWUpXG5cdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGV4cG9ydHMucHVzaChfKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGxpbmUuYXNzaWduXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdFx0XHRsaW5lLmxpbmVzID0gbGluZS5saW5lcy5tYXAoZ2V0TGluZUV4cG9ydHMpXG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG1vZHVsZUxpbmVzID0gbGluZXMubWFwKGdldExpbmVFeHBvcnRzKVxuXG5cdFx0XHRcdGlmIChpc0VtcHR5KGV4cG9ydHMpICYmIG9wRGVmYXVsdEV4cG9ydCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnN0IFsgbGluZXMsIG9wRGVmYXVsdEV4cG9ydCBdID0gX3RyeVRha2VMYXN0VmFsKG1vZHVsZUxpbmVzKVxuXHRcdFx0XHRcdHJldHVybiB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4geyBsaW5lczogbW9kdWxlTGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlTGFzdFZhbCA9IGxpbmVzID0+XG5cdFx0KCFpc0VtcHR5KGxpbmVzKSAmJiBsYXN0KGxpbmVzKSBpbnN0YW5jZW9mIFZhbCkgP1xuXHRcdFx0WyBydGFpbChsaW5lcyksIGxhc3QobGluZXMpIF0gOlxuXHRcdFx0WyBsaW5lcywgbnVsbCBdLFxuXG5cdF9wbGFpbkJsb2NrTGluZXMgPSBsaW5lVG9rZW5zID0+IHtcblx0XHRjb25zdCBsaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lKVxuXHRcdFx0XHRcdGFkZExpbmUoXylcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGluZXMucHVzaChsaW5lKVxuXHRcdH1cblx0XHRsaW5lVG9rZW5zLmVhY2goXyA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChfKSkpKVxuXHRcdHJldHVybiBsaW5lc1xuXHR9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZVRva2VucyA9PiB7XG5cdFx0bGV0IGlzQmFnID0gZmFsc2UsIGlzTWFwID0gZmFsc2UsIGlzT2JqID0gZmFsc2Vcblx0XHRjb25zdCBjaGVja0xpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lLmxpbmVzKVxuXHRcdFx0XHRcdGNoZWNrTGluZShfKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIEJhZ0VudHJ5KVxuXHRcdFx0XHRpc0JhZyA9IHRydWVcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSlcblx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkpXG5cdFx0XHRcdGlzT2JqID0gdHJ1ZVxuXHRcdH1cblx0XHRjb25zdCBsaW5lcyA9IF9wbGFpbkJsb2NrTGluZXMobGluZVRva2Vucylcblx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZXMpXG5cdFx0XHRjaGVja0xpbmUoXylcblxuXHRcdGNvbnRleHQuY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y29udGV4dC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjb250ZXh0LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9XG5cdFx0XHRpc09iaiA/IEtSZXR1cm5fT2JqIDogaXNCYWcgPyBLUmV0dXJuX0JhZyA6IGlzTWFwID8gS1JldHVybl9NYXAgOiBLUmV0dXJuX1BsYWluXG5cdFx0cmV0dXJuIHsgbGluZXMsIGtSZXR1cm4gfVxuXHR9XG5cbmNvbnN0IHBhcnNlQ2FzZSA9IChpc1ZhbCwgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gbnVsbFxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduU2luZ2xlLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gaXNLZXl3b3JkKEtXX0Vsc2UsIGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgKGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKEtXX0Vsc2UsIGxhc3RMaW5lLnRhaWwoKSkgXSA6XG5cdFx0WyBibG9jaywgbnVsbCBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwU2xpY2VzKGxpbmUgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGNvbnRleHQuY2hlY2socGFydHMubGVuZ3RoID4gMCwgdG9rZW5zLmxvYywgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKSh0b2tlbnMubG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxufVxuLy8gcGFyc2VDYXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShfID0+IGlzS2V5d29yZChLV19PYmpBc3NpZ24sIF8pKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y2hlY2tOb25FbXB0eShmaXJzdCwgKCkgPT4gYFVuZXhwZWN0ZWQgJHtzcGxpdHNbMF0uYXQuc2hvdygpfWApXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT5cblx0XHRcdFx0XHRcdGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWUuc2hvdygpfWApXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHJQbGFpbih0b2tlbnNWYWx1ZSlcblx0XHRcdFx0XHRjb25zdCBsb2MgPSBMb2MobmFtZS5sb2Muc3RhcnQsIHRva2Vuc1ZhbHVlLmxvYy5lbmQpXG5cdFx0XHRcdFx0cGFpcnMucHVzaChPYmpQYWlyKGxvYywgbmFtZS5uYW1lLCB2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb25zdCB2YWwgPSBPYmpTaW1wbGUodG9rZW5zLmxvYywgcGFpcnMpXG5cdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdHJldHVybiB2YWxcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnNDYWxsZXIpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbih0b2tlbnMpXG5cdFx0KVxuXHR9LFxuXG5cdHBhcnNlRXhwclBhcnRzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBvcFNwbGl0ID0gdG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUodG9rZW4gPT4ge1xuXHRcdFx0aWYgKHRva2VuIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19BbmQ6IGNhc2UgS1dfQ2FzZVZhbDogY2FzZSBLV19DbGFzczogY2FzZSBLV19FeGNlcHRWYWw6IGNhc2UgS1dfRm9yQmFnOlxuXHRcdFx0XHRcdGNhc2UgS1dfRm9yVmFsOiBjYXNlIEtXX0Z1bjogY2FzZSBLV19GdW5EbzogY2FzZSBLV19HZW5GdW46IGNhc2UgS1dfR2VuRnVuRG86XG5cdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19OZXc6IGNhc2UgS1dfTm90OiBjYXNlIEtXX09yOiBjYXNlIEtXX1VubGVzc1ZhbDpcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOiBjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fSlcblx0XHRyZXR1cm4gaWZFbHNlKG9wU3BsaXQsXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxhc3QgPSAoKCkgPT4ge1xuXHRcdFx0XHRcdHN3aXRjaCAoYXQua2luZCkge1xuXHRcdFx0XHRcdFx0Y2FzZSBLV19BbmQ6IGNhc2UgS1dfT3I6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBMb2dpYyhhdC5sb2MsIGF0LmtpbmQgPT09IEtXX0FuZCA/IExfQW5kIDogTF9Pcixcblx0XHRcdFx0XHRcdFx0XHRwYXJzZUV4cHJQYXJ0cyhhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Nhc2VWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UodHJ1ZSwgZmFsc2UsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19DbGFzczpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlQ2xhc3MoYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0V4Y2VwdFZhbDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRXhjZXB0KEtXX0V4Y2VwdFZhbCwgYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0ZvckJhZzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRm9yQmFnKGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Gb3JWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZvclZhbChhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0Z1bkRvOiBjYXNlIEtXX0dlbkZ1bjogY2FzZSBLV19HZW5GdW5Ebzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRnVuKGF0LmtpbmQsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19Vbmxlc3NWYWw6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsVmFsKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByKGJlZm9yZSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VCbG9ja1ZhbChibG9jayksXG5cdFx0XHRcdFx0XHRcdFx0YXQua2luZCA9PT0gS1dfVW5sZXNzVmFsKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19OZXc6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIE5ldyhhdC5sb2MsIHBhcnRzWzBdLCB0YWlsKHBhcnRzKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgS1dfTm90OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTm90KGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZChhdC5sb2MsIHBhcnNlRXhwcihhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZFRvKGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihhdC5raW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkoKVxuXHRcdFx0XHRyZXR1cm4gcHVzaChiZWZvcmUubWFwKHBhcnNlU2luZ2xlKSwgbGFzdClcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB0b2tlbnMubWFwKHBhcnNlU2luZ2xlKSlcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBnb3Qgbm90aGluZy4nKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoa2luZCwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IGlzRG8gPSBraW5kID09PSBLV19GdW5EbyB8fCBraW5kID09PSBLV19HZW5GdW5Eb1xuXHRjb25zdCBpc0dlbmVyYXRvciA9IGtpbmQgPT09IEtXX0dlbkZ1biB8fCBraW5kID09PSBLV19HZW5GdW5Eb1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhpc0RvLCByZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGgpICYmIGlzS2V5d29yZChLV19UeXBlLCBoZWFkKGguc3ViVG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IChpc0RvLCB0b2tlbnMpID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2VWYWwgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQgPT09IEtXX0Nhc2VWYWwsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmVGb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZVZhbCA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2tMaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKVxuXHRcdFx0XHRpZiAoIWFyZy5pc0xhenkoKSlcblx0XHRcdFx0XHRhcmcua2luZCA9IExEX011dGFibGVcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2tMaW5lcylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdGNvbnN0IGJsb2NrID0gKGlzRG8gPyBwYXJzZUJsb2NrRG8gOiBwYXJzZUJsb2NrVmFsKShyZXN0MSlcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogTG9jYWxEZWNsYXJlUGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWRTbGljZSgpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKGluT3JPdXQsIGZpcnN0TGluZS5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKGZpcnN0TGluZSkpXG5cdFx0XHRcdHJldHVybiBbIGluT3V0LCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgbnVsbCwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGhlYWQgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdGNvbnN0IG5vUmVzdCA9ICgpID0+XG5cdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2hlYWQuc2hvdygpfWApXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoZWFkIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaGVhZC5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQXNzZXJ0OiBjYXNlIEtXX0Fzc2VydE5vdDpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VBc3NlcnQoaGVhZC5raW5kID09PSBLV19Bc3NlcnROb3QsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRXhjZXB0RG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlRXhjZXB0KEtXX0V4Y2VwdERvLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0JyZWFrRG86XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gQnJlYWtEbyh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0JyZWFrVmFsOlxuXHRcdFx0XHRcdHJldHVybiBCcmVha1ZhbCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoZmFsc2UsIGZhbHNlLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0NvbnRpbnVlOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIENvbnRpbnVlKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRpc0dyb3VwKEdfQmxvY2ssIHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbERvKHRva2Vucy5sb2MsIFNQX0RlYnVnZ2VyKVxuXHRcdFx0XHRjYXNlIEtXX0VsbGlwc2lzOlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeU1hbnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0ZvckRvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUZvckRvKHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfSWZEbzogY2FzZSBLV19Vbmxlc3NEbzoge1xuXHRcdFx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2socmVzdClcblx0XHRcdFx0XHRyZXR1cm4gQ29uZGl0aW9uYWxEbyh0b2tlbnMubG9jLFxuXHRcdFx0XHRcdFx0cGFyc2VFeHByKGJlZm9yZSksXG5cdFx0XHRcdFx0XHRwYXJzZUJsb2NrRG8oYmxvY2spLFxuXHRcdFx0XHRcdFx0aGVhZC5raW5kID09PSBLV19Vbmxlc3NEbylcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHRyZXR1cm4gQmFnRW50cnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1Rocm93OlxuXHRcdFx0XHRcdHJldHVybiBUaHJvdyh0b2tlbnMubG9jLCBvcElmKCFyZXN0LmlzRW1wdHkoKSwgKCkgPT4gcGFyc2VFeHByKHJlc3QpKSlcblx0XHRcdFx0Y2FzZSBLV19QYXNzOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFsgXVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF9pc0xpbmVTcGxpdEtleXdvcmQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRhdC5raW5kID09PSBLV19Mb2NhbE11dGF0ZSA/XG5cdFx0XHRcdFx0X3BhcnNlTG9jYWxNdXRhdGUoYmVmb3JlLCBhZnRlciwgdG9rZW5zLmxvYykgOlxuXHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfaXNMaW5lU3BsaXRLZXl3b3JkID0gdG9rZW4gPT4ge1xuXHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19Bc3NpZ246IGNhc2UgS1dfQXNzaWduTXV0YWJsZTogY2FzZSBLV19Mb2NhbE11dGF0ZTpcblx0XHRcdFx0Y2FzZSBLV19NYXBFbnRyeTogY2FzZSBLV19PYmpBc3NpZ246IGNhc2UgS1dfWWllbGQ6IGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsTXV0YXRlID0gKGxvY2Fsc1Rva2VucywgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29udGV4dC5jaGVjayhsb2NhbHMubGVuZ3RoID09PSAxLCBsb2MsICdUT0RPOiBMb2NhbERlc3RydWN0dXJlTXV0YXRlJylcblx0XHRjb25zdCBuYW1lID0gbG9jYWxzWzBdLm5hbWVcblx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRyZXR1cm4gTG9jYWxNdXRhdGUobG9jLCBuYW1lLCB2YWx1ZSlcblx0fSxcblxuXHRfcGFyc2VBc3NpZ24gPSAobG9jYWxzVG9rZW5zLCBhc3NpZ25lciwgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBhc3NpZ25lci5raW5kXG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb25zdCBvcE5hbWUgPSBvcElmKGxvY2Fscy5sZW5ndGggPT09IDEsICgpID0+IGxvY2Fsc1swXS5uYW1lKVxuXHRcdGNvbnN0IHZhbHVlID0gX3BhcnNlQXNzaWduVmFsdWUoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucylcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y29udGV4dC5jaGVjayhpc1lpZWxkLCBsb2NhbHNUb2tlbnMubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaXNZaWVsZClcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxvY2Fscylcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKVxuXG5cdFx0XHRjb25zdCBpc09iakFzc2lnbiA9IGtpbmQgPT09IEtXX09iakFzc2lnblxuXG5cdFx0XHRpZiAoa2luZCA9PT0gS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0Zm9yIChsZXQgXyBvZiBsb2NhbHMpIHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0xhenkgbG9jYWwgY2FuIG5vdCBiZSBtdXRhYmxlLicpXG5cdFx0XHRcdFx0Xy5raW5kID0gTERfTXV0YWJsZVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdyYXAgPSBfID0+IGlzT2JqQXNzaWduID8gT2JqRW50cnkobG9jLCBfKSA6IF9cblxuXHRcdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Y29uc3QgYXNzaWduZWUgPSBsb2NhbHNbMF1cblx0XHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduU2luZ2xlKGxvYywgYXNzaWduZWUsIHZhbHVlKVxuXHRcdFx0XHRjb25zdCBpc1Rlc3QgPSBpc09iakFzc2lnbiAmJiBhc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdFx0cmV0dXJuIGlzVGVzdCA/IERlYnVnKGxvYywgWyB3cmFwKGFzc2lnbikgXSkgOiB3cmFwKGFzc2lnbilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGtpbmQgPSBsb2NhbHNbMF0ua2luZFxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbG9jYWxzKVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soXy5raW5kID09PSBraW5kLCBfLmxvYyxcblx0XHRcdFx0XHRcdCdBbGwgbG9jYWxzIG9mIGRlc3RydWN0dXJpbmcgYXNzaWdubWVudCBtdXN0IGJlIG9mIHRoZSBzYW1lIGtpbmQuJylcblx0XHRcdFx0cmV0dXJuIHdyYXAoQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIHZhbHVlLCBraW5kKSlcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQXNzaWduVmFsdWUgPSAoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucykgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gdmFsdWVUb2tlbnMuaXNFbXB0eSgpICYmIGtpbmQgPT09IEtXX09iakFzc2lnbiA/XG5cdFx0XHRTcGVjaWFsVmFsKHZhbHVlVG9rZW5zLmxvYywgU1ZfTnVsbCkgOlxuXHRcdFx0cGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdGlmIChvcE5hbWUgIT09IG51bGwpXG5cdFx0XHRfdHJ5QWRkTmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHN3aXRjaCAoa2luZCkge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIG5hbWUgaWY6XG5cdC8vIEl0J3MgYSBmdW5jdGlvblxuXHQvLyBJdCdzIGFuIE9iaiBibG9ja1xuXHQvLyBJdCdzIGFuIE9iaiBibG9jayBhdCB0aGUgZW5kIG9mIGEgY2FsbCAoYXMgaW4gYG5hbWUgPSBPYmotVHlwZSAuLi5gKVxuXHRfdHJ5QWRkTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBGdW4gfHwgXyBpbnN0YW5jZW9mIENsYXNzKVxuXHRcdFx0Xy5vcE5hbWUgPSBuYW1lXG5cdFx0ZWxzZSBpZiAoXyBpbnN0YW5jZW9mIENhbGwgJiYgXy5hcmdzLmxlbmd0aCA+IDApXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShsYXN0KF8uYXJncyksIG5hbWUpXG5cdFx0ZWxzZVxuXHRcdFx0X3RyeUFkZE9iak5hbWUoXywgbmFtZSlcblx0fSxcblxuXHRfdHJ5QWRkT2JqTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dyYXAgJiYgXy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrT2JqKVxuXHRcdFx0aWYgKF8uYmxvY2sub3BPYmplZCAhPT0gbnVsbCAmJiBfLmJsb2NrLm9wT2JqZWQgaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRcdF8uYmxvY2sub3BPYmplZC5vcE5hbWUgPSBuYW1lXG5cdFx0XHRlbHNlIGlmICghX25hbWVPYmpBc3NpZ25Tb21ld2hlcmUoXy5ibG9jay5saW5lcykpXG5cdFx0XHRcdF8uYmxvY2sub3BOYW1lID0gbmFtZVxuXHR9LFxuXHRfbmFtZU9iakFzc2lnblNvbWV3aGVyZSA9IGxpbmVzID0+XG5cdFx0bGluZXMuc29tZShsaW5lID0+XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkgJiYgbGluZS5hc3NpZ24uYWxsQXNzaWduZWVzKCkuc29tZShfID0+XG5cdFx0XHRcdF8ubmFtZSA9PT0gJ25hbWUnKSksXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlcikpXG5cbmNvbnN0XG5cdHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyA9IHRva2VucyA9PlxuXHRcdHRva2Vucy5tYXAoXyA9PiBMb2NhbERlY2xhcmVQbGFpbihfLmxvYywgX3BhcnNlTG9jYWxOYW1lKF8pKSksXG5cblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdG9rZW4gPT4ge1xuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIHRva2VuKSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodG9rZW4pXG5cdFx0XHRjb25zdCBbIHJlc3QsIGlzTGF6eSBdID1cblx0XHRcdFx0aXNLZXl3b3JkKEtXX0xhenksIHRva2Vucy5oZWFkKCkpID8gWyB0b2tlbnMudGFpbCgpLCB0cnVlIF0gOiBbIHRva2VucywgZmFsc2UgXVxuXHRcdFx0Y29uc3QgbmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdGNvbnN0IG9wVHlwZSA9IG9wSWYoIXJlc3QyLmlzRW1wdHkoKSwgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChLV19UeXBlLCBjb2xvbiksIGNvbG9uLmxvYywgKCkgPT4gYEV4cGVjdGVkICR7Y29kZSgnOicpfWApXG5cdFx0XHRcdGNvbnN0IHRva2Vuc1R5cGUgPSByZXN0Mi50YWlsKClcblx0XHRcdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnNUeXBlLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7Y29sb24uc2hvdygpfWApXG5cdFx0XHRcdHJldHVybiBwYXJzZVNwYWNlZCh0b2tlbnNUeXBlKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmUodG9rZW4ubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSA/IExEX0xhenkgOiBMRF9Db25zdClcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmVQbGFpbih0b2tlbi5sb2MsIF9wYXJzZUxvY2FsTmFtZSh0b2tlbikpXG5cdH1cblxuLy8gcGFyc2VMb2NhbERlY2xhcmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUxvY2FsTmFtZSA9IHQgPT4ge1xuXHRcdGlmIChpc0tleXdvcmQoS1dfRm9jdXMsIHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3Quc2hvdygpfWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y29udGV4dC5jaGVjayghSnNHbG9iYWxzLmhhcyh0Lm5hbWUpLCB0LmxvYywgKCkgPT5cblx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZVNpbmdsZSA9IHRva2VuID0+IHtcblx0Y29uc3QgeyBsb2MgfSA9IHRva2VuXG5cdHJldHVybiB0b2tlbiBpbnN0YW5jZW9mIE5hbWUgP1xuXHRfYWNjZXNzKHRva2VuLm5hbWUsIGxvYykgOlxuXHR0b2tlbiBpbnN0YW5jZW9mIEdyb3VwID8gKCgpID0+IHtcblx0XHRjb25zdCBzbGljZSA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0Y2FzZSBHX1NwYWNlOlxuXHRcdFx0XHRyZXR1cm4gcGFyc2VTcGFjZWQoc2xpY2UpXG5cdFx0XHRjYXNlIEdfUGFyZW50aGVzaXM6XG5cdFx0XHRcdHJldHVybiBwYXJzZUV4cHIoc2xpY2UpXG5cdFx0XHRjYXNlIEdfQnJhY2tldDpcblx0XHRcdFx0cmV0dXJuIEJhZ1NpbXBsZShsb2MsIHBhcnNlRXhwclBhcnRzKHNsaWNlKSlcblx0XHRcdGNhc2UgR19CbG9jazpcblx0XHRcdFx0cmV0dXJuIGJsb2NrV3JhcChzbGljZSlcblx0XHRcdGNhc2UgR19RdW90ZTpcblx0XHRcdFx0cmV0dXJuIFF1b3RlKGxvYyxcblx0XHRcdFx0XHRzbGljZS5tYXAoXyA9PiAodHlwZW9mIF8gPT09ICdzdHJpbmcnKSA/IF8gOiBwYXJzZVNpbmdsZShfKSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IodG9rZW4ua2luZClcblx0XHR9XG5cdH0pKCkgOlxuXHR0b2tlbiBpbnN0YW5jZW9mIE51bWJlckxpdGVyYWwgP1xuXHR0b2tlbiA6XG5cdHRva2VuIGluc3RhbmNlb2YgS2V5d29yZCA/XG5cdFx0dG9rZW4ua2luZCA9PT0gS1dfRm9jdXMgP1xuXHRcdFx0TG9jYWxBY2Nlc3MuZm9jdXMobG9jKSA6XG5cdFx0XHRpZkVsc2Uob3BLZXl3b3JkS2luZFRvU3BlY2lhbFZhbHVlS2luZCh0b2tlbi5raW5kKSxcblx0XHRcdFx0XyA9PiBTcGVjaWFsVmFsKGxvYywgXyksXG5cdFx0XHRcdCgpID0+IHVuZXhwZWN0ZWQodG9rZW4pKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgRG90TmFtZSAmJiB0b2tlbi5uRG90cyA9PT0gMyA/XG5cdFNwbGF0KGxvYywgTG9jYWxBY2Nlc3MobG9jLCB0b2tlbi5uYW1lKSkgOlxuXHR1bmV4cGVjdGVkKHRva2VuKVxufVxuXG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoaXNLZXl3b3JkKEtXX0xhenksIGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Ly8gVG9rZW5zIHdpdGhpbiBhIHNwYWNlIGdyb3VwIHdyYXAgcHJldmlvdXMgdG9rZW5zLlxuXHRcdGNvbnN0IG1vZCA9IChhY2MsIHRva2VuKSA9PiB7XG5cdFx0XHRjb25zdCBsb2MgPSB0b2tlbi5sb2Ncblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayh0b2tlbi5uRG90cyA9PT0gMSwgbG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKGxvYywgYWNjLCB0b2tlbi5uYW1lKVxuXHRcdFx0fSBlbHNlIGlmIChpc0tleXdvcmQoS1dfRm9jdXMsIHRva2VuKSlcblx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBhY2MsIFsgTG9jYWxBY2Nlc3MuZm9jdXMobG9jKSBdKVxuXHRcdFx0ZWxzZSBpZiAodG9rZW4gaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodG9rZW4ua2luZCA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLnN1Yihsb2MsXG5cdFx0XHRcdFx0XHR1bnNoaWZ0KGFjYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodG9rZW4pKSkpXG5cdFx0XHRcdGlmICh0b2tlbi5raW5kID09PSBHX1BhcmVudGhlc2lzKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0b2tlbiksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKGxvYywgYWNjLCBbXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlXG5cdFx0XHRcdGNvbnRleHQuZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dG9rZW4uc2hvdygpfWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtb2QsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSB0b2tlbnMuaGVhZFNsaWNlKClcblx0XHRpZiAoaXNLZXl3b3JkKGssIGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAodXNlS2V5d29yZEtpbmQsIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PlxuXHRcdFx0YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZSh1c2VLZXl3b3JkS2luZCl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcFNsaWNlcyhsaW5lID0+IHtcblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZShsaW5lLmhlYWQoKSlcblx0XHRcdGlmICh1c2VLZXl3b3JkS2luZCA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUuc2l6ZSgpID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUuc2Vjb25kKCkpXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IHVzZUtleXdvcmRLaW5kID09PSBLV19Vc2VMYXp5IHx8XG5cdFx0XHRcdFx0dXNlS2V5d29yZEtpbmQgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBsaW5lLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmVVbnR5cGVkKHRva2Vucy5sb2MsIG5hbWUsIGlzTGF6eSA/IExEX0xhenkgOiBMRF9Db25zdClcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFsgXSwgb3BVc2VEZWZhdWx0OiB1c2VEZWZhdWx0KCkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBvcFVzZURlZmF1bHQsIHJlc3QgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19Gb2N1cywgdG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdFx0bC5raW5kID0gTERfTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNHcm91cChHX1NwYWNlLCB0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHRva2VuID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2sodG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lICYmIHRva2VuLm5Eb3RzID09PSAxLCB0b2tlbi5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHRva2VuLm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG5cbmNvbnN0XG5cdF9wYXJzZUZvciA9IGN0ciA9PiB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdHJldHVybiBjdHIodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBwYXJzZUJsb2NrRG8oYmxvY2spKVxuXHR9LFxuXHRfcGFyc2VPcEl0ZXJhdGVlID0gdG9rZW5zID0+XG5cdFx0b3BJZighdG9rZW5zLmlzRW1wdHkoKSwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgWyBlbGVtZW50LCBiYWcgXSA9XG5cdFx0XHRcdGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfID0+IGlzS2V5d29yZChLV19JbiwgXykpLFxuXHRcdFx0XHRcdCh7IGJlZm9yZSwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhiZWZvcmUuc2l6ZSgpID09PSAxLCBiZWZvcmUubG9jLCAnVE9ETzogcGF0dGVybiBpbiBmb3InKVxuXHRcdFx0XHRcdFx0cmV0dXJuIFsgcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKGJlZm9yZSlbMF0sIHBhcnNlRXhwcihhZnRlcikgXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KCkgPT4gWyBMb2NhbERlY2xhcmVGb2N1cyh0b2tlbnMubG9jKSwgcGFyc2VFeHByKHRva2VucykgXSlcblx0XHRcdHJldHVybiBJdGVyYXRlZSh0b2tlbnMubG9jLCBlbGVtZW50LCBiYWcpXG5cdFx0fSlcbmNvbnN0XG5cdHBhcnNlRm9yRG8gPSBfcGFyc2VGb3IoRm9yRG8pLFxuXHRwYXJzZUZvclZhbCA9IF9wYXJzZUZvcihGb3JWYWwpLFxuXHQvLyBUT0RPOiAtPiBvdXQtdHlwZVxuXHRwYXJzZUZvckJhZyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y29uc3QgYmxvY2sgPSBwYXJzZUJsb2NrRG8obGluZXMpXG5cdFx0Ly8gVE9ETzogQmV0dGVyIHdheT9cblx0XHRpZiAoYmxvY2subGluZXMubGVuZ3RoID09PSAxICYmIGJsb2NrLmxpbmVzWzBdIGluc3RhbmNlb2YgVmFsKVxuXHRcdFx0YmxvY2subGluZXNbMF0gPSBCYWdFbnRyeShibG9jay5saW5lc1swXS5sb2MsIGJsb2NrLmxpbmVzWzBdKVxuXHRcdHJldHVybiBGb3JCYWcub2YodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBibG9jaylcblx0fVxuXG5cbmNvbnN0XG5cdHBhcnNlRXhjZXB0ID0gKGt3RXhjZXB0LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdFxuXHRcdFx0aXNWYWwgPSBrd0V4Y2VwdCA9PT0gS1dfRXhjZXB0VmFsLFxuXHRcdFx0anVzdERvVmFsQmxvY2sgPSBpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvLFxuXHRcdFx0cGFyc2VCbG9jayA9IGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbyxcblx0XHRcdEV4Y2VwdCA9IGlzVmFsID8gRXhjZXB0VmFsIDogRXhjZXB0RG8sXG5cdFx0XHRrd1RyeSA9IGlzVmFsID8gS1dfVHJ5VmFsIDogS1dfVHJ5RG8sXG5cdFx0XHRrd0NhdGNoID0gaXNWYWwgPyBLV19DYXRjaFZhbCA6IEtXX0NhdGNoRG8sXG5cdFx0XHRuYW1lVHJ5ID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd1RyeSkpLFxuXHRcdFx0bmFtZUNhdGNoID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd0NhdGNoKSksXG5cdFx0XHRuYW1lRmluYWxseSA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoS1dfRmluYWxseSkpXG5cblx0XHRjb25zdCBsaW5lcyA9IGp1c3RCbG9jayhrd0V4Y2VwdCwgdG9rZW5zKVxuXG5cdFx0Ly8gYHRyeWAgKm11c3QqIGNvbWUgZmlyc3QuXG5cdFx0Y29uc3QgZmlyc3RMaW5lID0gbGluZXMuaGVhZFNsaWNlKClcblx0XHRjb25zdCB0b2tlblRyeSA9IGZpcnN0TGluZS5oZWFkKClcblx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChrd1RyeSwgdG9rZW5UcnkpLCB0b2tlblRyeS5sb2MsICgpID0+XG5cdFx0XHRgTXVzdCBzdGFydCB3aXRoICR7bmFtZVRyeSgpfWApXG5cdFx0Y29uc3QgX3RyeSA9IGp1c3REb1ZhbEJsb2NrKGt3VHJ5LCBmaXJzdExpbmUudGFpbCgpKVxuXG5cdFx0Y29uc3QgcmVzdExpbmVzID0gbGluZXMudGFpbCgpXG5cdFx0Y2hlY2tOb25FbXB0eShyZXN0TGluZXMsICgpID0+XG5cdFx0XHRgTXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBvZiAke25hbWVDYXRjaCgpfSBvciAke25hbWVGaW5hbGx5KCl9YClcblxuXHRcdGNvbnN0IGhhbmRsZUZpbmFsbHkgPSByZXN0TGluZXMgPT4ge1xuXHRcdFx0Y29uc3QgbGluZSA9IHJlc3RMaW5lcy5oZWFkU2xpY2UoKVxuXHRcdFx0Y29uc3QgdG9rZW5GaW5hbGx5ID0gbGluZS5oZWFkKClcblx0XHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKEtXX0ZpbmFsbHksIHRva2VuRmluYWxseSksIHRva2VuRmluYWxseS5sb2MsICgpID0+XG5cdFx0XHRcdGBFeHBlY3RlZCAke25hbWVGaW5hbGx5KCl9YClcblx0XHRcdGNvbnRleHQuY2hlY2socmVzdExpbmVzLnNpemUoKSA9PT0gMSwgcmVzdExpbmVzLmxvYywgKCkgPT5cblx0XHRcdFx0YE5vdGhpbmcgaXMgYWxsb3dlZCB0byBjb21lIGFmdGVyICR7bmFtZUZpbmFsbHkoKX0uYClcblx0XHRcdHJldHVybiBqdXN0QmxvY2tEbyhLV19GaW5hbGx5LCBsaW5lLnRhaWwoKSlcblx0XHR9XG5cblx0XHRsZXQgX2NhdGNoLCBfZmluYWxseVxuXG5cdFx0Y29uc3QgbGluZTIgPSByZXN0TGluZXMuaGVhZFNsaWNlKClcblx0XHRjb25zdCBoZWFkMiA9IGxpbmUyLmhlYWQoKVxuXHRcdGlmIChpc0tleXdvcmQoa3dDYXRjaCwgaGVhZDIpKSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZTIsIGJsb2NrMiBdID0gYmVmb3JlQW5kQmxvY2sobGluZTIudGFpbCgpKVxuXHRcdFx0Y29uc3QgY2F1Z2h0ID0gX3BhcnNlT25lTG9jYWxEZWNsYXJlT3JGb2N1cyhiZWZvcmUyKVxuXHRcdFx0X2NhdGNoID0gQ2F0Y2gobGluZTIubG9jLCBjYXVnaHQsIHBhcnNlQmxvY2soYmxvY2syKSlcblx0XHRcdF9maW5hbGx5ID0gb3BJZihyZXN0TGluZXMuc2l6ZSgpID4gMSwgKCkgPT4gaGFuZGxlRmluYWxseShyZXN0TGluZXMudGFpbCgpKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2NhdGNoID0gbnVsbFxuXHRcdFx0X2ZpbmFsbHkgPSBoYW5kbGVGaW5hbGx5KHJlc3RMaW5lcylcblx0XHR9XG5cblx0XHRyZXR1cm4gRXhjZXB0KHRva2Vucy5sb2MsIF90cnksIF9jYXRjaCwgX2ZpbmFsbHkpXG5cdH0sXG5cdF9wYXJzZU9uZUxvY2FsRGVjbGFyZU9yRm9jdXMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZUZvY3VzKHRva2Vucy5sb2MpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5zaXplKCkgPT09IDEsICdFeHBlY3RlZCBvbmx5IG9uZSBsb2NhbCBkZWNsYXJlLicpXG5cdFx0XHRyZXR1cm4gcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucylbMF1cblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VBc3NlcnQgPSAobmVnYXRlLCB0b2tlbnMpID0+IHtcblx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtrZXl3b3JkTmFtZShLV19Bc3NlcnQpfS5gKVxuXG5cdGNvbnN0IFsgY29uZFRva2Vucywgb3BUaHJvd24gXSA9XG5cdFx0aWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF8gPT4gaXNLZXl3b3JkKEtXX1Rocm93LCBfKSksXG5cdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IFsgYmVmb3JlLCBwYXJzZUV4cHIoYWZ0ZXIpIF0sXG5cdFx0XHQoKSA9PiBbIHRva2VucywgbnVsbCBdKVxuXG5cdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHMoY29uZFRva2Vucylcblx0Y29uc3QgY29uZCA9IHBhcnRzLmxlbmd0aCA9PT0gMSA/IHBhcnRzWzBdIDogQ2FsbChjb25kVG9rZW5zLmxvYywgcGFydHNbMF0sIHRhaWwocGFydHMpKVxuXHRyZXR1cm4gQXNzZXJ0KHRva2Vucy5sb2MsIG5lZ2F0ZSwgY29uZCwgb3BUaHJvd24pXG59XG5cbmNvbnN0IHBhcnNlQ2xhc3MgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0Y29uc3Qgb3BFeHRlbmRlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IHBhcnNlRXhwcihiZWZvcmUpKVxuXG5cdGNvbnN0IGxpbmUxID0gYmxvY2suaGVhZFNsaWNlKClcblx0Y29uc3QgWyBzdGF0aWNzLCByZXN0IF0gPSBpc0tleXdvcmQoS1dfU3RhdGljLCBsaW5lMS5oZWFkKCkpID9cblx0XHRbIF9wYXJzZVN0YXRpY3MobGluZTEudGFpbCgpKSwgYmxvY2sudGFpbCgpIF0gOlxuXHRcdFsgWyBdLCBibG9jayBdXG5cblx0Y29uc3QgbGluZTIgPSByZXN0LmhlYWRTbGljZSgpXG5cdGNvbnN0IFsgb3BDb25zdHJ1Y3RvciwgcmVzdDIgXSA9IGlzS2V5d29yZChLV19Db25zdHJ1Y3QsIGxpbmUyLmhlYWQoKSkgP1xuXHRcdFsgX3BhcnNlQ29uc3RydWN0b3IobGluZTIudGFpbCgpKSwgcmVzdC50YWlsKCkgXSA6XG5cdFx0WyBudWxsLCByZXN0IF1cblxuXHRjb25zdCBtZXRob2RzID0gX3BhcnNlTWV0aG9kcyhyZXN0MilcblxuXHRyZXR1cm4gQ2xhc3ModG9rZW5zLmxvYywgb3BFeHRlbmRlZCwgc3RhdGljcywgb3BDb25zdHJ1Y3RvciwgbWV0aG9kcylcbn1cblxuY29uc3Rcblx0X3BhcnNlQ29uc3RydWN0b3IgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2sodHJ1ZSwgdG9rZW5zKVxuXHRcdGNvbnN0IGlzR2VuZXJhdG9yID0gZmFsc2UsIG9wUmVzRGVjbGFyZSA9IG51bGxcblx0XHRyZXR1cm4gRnVuKHRva2Vucy5sb2MsXG5cdFx0XHRpc0dlbmVyYXRvcixcblx0XHRcdGFyZ3MsIG9wUmVzdEFyZyxcblx0XHRcdGJsb2NrLCBvcEluLCBvcFJlc0RlY2xhcmUsIG9wT3V0LFxuXHRcdFx0J2NvbnN0cnVjdG9yJylcblx0fSxcblx0X3BhcnNlU3RhdGljcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgYmxvY2sgPSBqdXN0QmxvY2soS1dfU3RhdGljLCB0b2tlbnMpXG5cdFx0cmV0dXJuIF9wYXJzZU1ldGhvZHMoYmxvY2spXG5cdH0sXG5cdF9wYXJzZU1ldGhvZHMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcFNsaWNlcyhfcGFyc2VNZXRob2QpLFxuXHRfcGFyc2VNZXRob2QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG5hbWVUb2tlbiA9IHRva2Vucy5oZWFkKClcblxuXHRcdGlmIChpc0tleXdvcmQoS1dfR2V0LCBuYW1lVG9rZW4pIHx8IGlzS2V5d29yZChLV19TZXQsIG5hbWVUb2tlbikpXG5cdFx0XHRjb250ZXh0LmZhaWwobmFtZVRva2VuLmxvYywgJ1RPRE86IGdldC9zZXQhJylcblxuXHRcdGNvbnRleHQuY2hlY2sobmFtZVRva2VuIGluc3RhbmNlb2YgTmFtZSwgbmFtZVRva2VuLmxvYywgKCkgPT5cblx0XHRcdGBFeHBlY3RlZCBuYW1lLCBnb3QgJHtuYW1lVG9rZW59YClcblx0XHRjb25zdCBuYW1lID0gbmFtZVRva2VuLm5hbWVcblxuXHRcdGNvbnN0IGZ1biA9IF9wYXJzZU1ldGhvZEZ1bih0b2tlbnMudGFpbCgpKVxuXHRcdGFzc2VydChmdW4ub3BOYW1lID09PSBudWxsKVxuXHRcdGZ1bi5vcE5hbWUgPSBuYW1lXG5cdFx0cmV0dXJuIGZ1blxuXHR9LFxuXHRfcGFyc2VNZXRob2RGdW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZ1bktpbmRUb2tlbiA9IHRva2Vucy5oZWFkKClcblx0XHRjb250ZXh0LmNoZWNrKF9pc0Z1bktpbmQoZnVuS2luZFRva2VuKSwgZnVuS2luZFRva2VuLmxvYywgKCkgPT5cblx0XHRcdGBFeHBlY3RlZCBmdW5jdGlvbiwgZ290ICR7ZnVuS2luZFRva2VufWApXG5cdFx0cmV0dXJuIHBhcnNlRnVuKGZ1bktpbmRUb2tlbi5raW5kLCB0b2tlbnMudGFpbCgpKVxuXHR9LFxuXHRfaXNGdW5LaW5kID0gdG9rZW4gPT4ge1xuXHRcdGlmICghKHRva2VuIGluc3RhbmNlb2YgS2V5d29yZCkpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjogY2FzZSBLV19GdW5EbzogY2FzZSBLV19HZW5GdW5Ebzpcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=