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

		const parts = partLines.map(function (line) {
			line = _Slice2.default.group(line);

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
				case _Token.KW_And:case _Token.KW_CaseVal:case _Token.KW_ExceptVal:case _Token.KW_ForBag:case _Token.KW_ForVal:
				case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_GenFun:case _Token.KW_GenFunDo:case _Token.KW_IfVal:
				case _Token.KW_New:case _Token.KW_Not:case _Token.KW_Or:case _Token.KW_UnlessVal:case _Token.KW_Yield:
				case _Token.KW_YieldTo:
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
					case _Token.KW_ExceptVal:
						return parseExcept(_Token.KW_ExceptVal, after);
					case _Token.KW_ForBag:
						return parseForBag(after);
					case _Token.KW_ForVal:
						return parseForVal(after);
					case _Token.KW_Fun:
						return parseFun(false, false, after);
					case _Token.KW_FunDo:
						return parseFun(true, false, after);
					case _Token.KW_GenFun:
						return parseFun(false, true, after);
					case _Token.KW_GenFunDo:
						return parseFun(true, true, after);
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

	const parseFun = function (isDo, isGenerator, tokens) {
		var _tryTakeReturnType2 = _tryTakeReturnType(tokens);

		const opReturnType = _tryTakeReturnType2.opReturnType;
		const rest = _tryTakeReturnType2.rest;

		checkNonEmpty(rest, function () {
			return 'Expected an indented block.';
		});

		var _funArgsAndBlock2 = _funArgsAndBlock(isDo, rest);

		const args = _funArgsAndBlock2.args;
		const opRestArg = _funArgsAndBlock2.opRestArg;
		const block = _funArgsAndBlock2.block;
		const opIn = _funArgsAndBlock2.opIn;
		const opOut = _funArgsAndBlock2.opOut;

		for (const arg of args) if (!arg.isLazy()) arg.kind = _MsAst.LD_Mutable;
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
			const firstLine = tokens.head();
			if ((0, _Token.isKeyword)(inOrOut, (0, _util.head)(firstLine.subTokens))) {
				const inOut = (0, _MsAst.Debug)(firstLine.loc, parseLinesFromBlock(_Slice2.default.group(firstLine)));
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
		if (_ instanceof _MsAst.Fun) _.name = name;else if (_ instanceof _MsAst.Call && _.args.length > 0) _tryAddObjName((0, _util.last)(_.args), name);else _tryAddObjName(_, name);
	},
	      _tryAddObjName = function (_, name) {
		if (_ instanceof _MsAst.BlockWrap && _.block instanceof _MsAst.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _MsAst.Fun) _.block.opObjed.name = name;else if (!_nameObjAssignSomewhere(_.block.lines)) _.block.opName = name;
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
			const line0 = _Slice2.default.group(tokens.head());
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
		return lines.map(function (line) {
			line = _Slice2.default.group(line);

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
		const firstLine = _Slice2.default.group(lines.head());
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
			const line = _Slice2.default.group(restLines.head());
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

		const line2 = _Slice2.default.group(restLines.head());
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLEtBQUksT0FBTyxDQUFBOzs7Ozs7Ozs7Ozs7O2tCQVlJLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSztBQUN2QyxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFlBckJRLE1BQU0sRUFxQlAsV0E5QnNFLE9BQU8sU0FBNUQsT0FBTyxFQThCUCxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTs7QUFFakQsU0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEtBQUssQ0FBQTtFQUNaOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNyRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDdEQsVUFBVSxHQUFHLFVBQUEsS0FBSztTQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsa0JBQWdCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRztFQUFBLENBQUE7O0FBRTVFLE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJOzs7c0JBRUgsWUFBWSxRQXZDdEMsUUFBUSxFQXVDeUMsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBekMwQixNQUFNLEVBeUN2QixLQUFLLENBQUM7Ozs7UUFBaEQsU0FB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QixRQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDeEMsUUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBejZCN0MsSUFBSSxFQXk2QjhDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBdjVCMUMsSUFBSSxFQXU1QjJDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDeEYsU0FBTyxXQTU2QkMsTUFBTSxFQTQ2QkEsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0VBQ2pELENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2VydCwgQXNzaWduRGVzdHJ1Y3R1cmUsIEFzc2lnblNpbmdsZSwgQmFnRW50cnksIEJhZ0VudHJ5TWFueSwgQmFnU2ltcGxlLCBCbG9ja0JhZyxcblx0QmxvY2tEbywgQmxvY2tNYXAsIEJsb2NrT2JqLCBCbG9ja1ZhbFRocm93LCBCbG9ja1dpdGhSZXR1cm4sIEJsb2NrV3JhcCwgQnJlYWtEbywgQnJlYWtWYWwsXG5cdENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LCBDYXNlRG8sIENhc2VWYWwsIENhdGNoLCBDb25kaXRpb25hbERvLCBDb25kaXRpb25hbFZhbCwgQ29udGludWUsXG5cdERlYnVnLCBJdGVyYXRlZSwgTnVtYmVyTGl0ZXJhbCwgRXhjZXB0RG8sIEV4Y2VwdFZhbCwgRm9yQmFnLCBGb3JEbywgRm9yVmFsLCBGdW4sIEdsb2JhbEFjY2Vzcyxcblx0TF9BbmQsIExfT3IsIExhenksIExEX0NvbnN0LCBMRF9MYXp5LCBMRF9NdXRhYmxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmVGb2N1cyxcblx0TG9jYWxEZWNsYXJlTmFtZSwgTG9jYWxEZWNsYXJlUGxhaW4sIExvY2FsRGVjbGFyZVJlcywgTG9jYWxEZWNsYXJlVW50eXBlZCwgTG9jYWxNdXRhdGUsIExvZ2ljLFxuXHRNYXBFbnRyeSwgTWVtYmVyLCBNb2R1bGUsIE5ldywgTm90LCBPYmpFbnRyeSwgT2JqUGFpciwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSwgU1BfRGVidWdnZXIsXG5cdFNwZWNpYWxEbywgU3BlY2lhbFZhbCwgU1ZfTnVsbCwgU3BsYXQsIFRocm93LCBWYWwsIFVzZSwgVXNlRG8sIFlpZWxkLCBZaWVsZFRvXG5cdH0gZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9sYW5ndWFnZSdcbmltcG9ydCB7IERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW50aGVzaXMsIEdfU3BhY2UsIEdfUXVvdGUsIGlzR3JvdXAsIGlzS2V5d29yZCxcblx0S2V5d29yZCwgS1dfQW5kLCBLV19Bc3NlcnQsIEtXX0Fzc2VydE5vdCwgS1dfQXNzaWduLCBLV19Bc3NpZ25NdXRhYmxlLCBLV19CcmVha0RvLCBLV19CcmVha1ZhbCxcblx0S1dfQ2FzZVZhbCwgS1dfQ2FzZURvLCBLV19DYXRjaERvLCBLV19DYXRjaFZhbCwgS1dfQ29udGludWUsIEtXX0RlYnVnLCBLV19EZWJ1Z2dlcixcblx0S1dfRWxsaXBzaXMsIEtXX0Vsc2UsIEtXX0V4Y2VwdERvLCBLV19FeGNlcHRWYWwsIEtXX0ZpbmFsbHksIEtXX0ZvckJhZywgS1dfRm9yRG8sIEtXX0ZvclZhbCxcblx0S1dfRm9jdXMsIEtXX0Z1biwgS1dfRnVuRG8sIEtXX0dlbkZ1biwgS1dfR2VuRnVuRG8sIEtXX0lmRG8sIEtXX0lmVmFsLCBLV19JbiwgS1dfTGF6eSxcblx0S1dfTG9jYWxNdXRhdGUsIEtXX01hcEVudHJ5LCBLV19OZXcsIEtXX05vdCwgS1dfT2JqQXNzaWduLCBLV19PciwgS1dfUGFzcywgS1dfT3V0LCBLV19SZWdpb24sXG5cdEtXX1Rocm93LCBLV19UcnlEbywgS1dfVHJ5VmFsLCBLV19UeXBlLCBLV19Vbmxlc3NEbywgS1dfVW5sZXNzVmFsLCBLV19Vc2UsIEtXX1VzZURlYnVnLFxuXHRLV19Vc2VEbywgS1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8sIE5hbWUsIGtleXdvcmROYW1lLCBvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kXG5cdH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBhc3NlcnQsIGhlYWQsIGlmRWxzZSwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCxcblx0b3BJZiwgb3BNYXAsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbi8vIFNpbmNlIHRoZXJlIGFyZSBzbyBtYW55IHBhcnNpbmcgZnVuY3Rpb25zLFxuLy8gaXQncyBmYXN0ZXIgKGFzIG9mIG5vZGUgdjAuMTEuMTQpIHRvIGhhdmUgdGhlbSBhbGwgY2xvc2Ugb3ZlciB0aGlzIG11dGFibGUgdmFyaWFibGUgb25jZVxuLy8gdGhhbiB0byBjbG9zZSBvdmVyIHRoZSBwYXJhbWV0ZXIgKGFzIGluIGxleC5qcywgd2hlcmUgdGhhdCdzIG11Y2ggZmFzdGVyKS5cbmxldCBjb250ZXh0XG5cbi8qXG5UaGlzIGNvbnZlcnRzIGEgVG9rZW4gdHJlZSB0byBhIE1zQXN0LlxuVGhpcyBpcyBhIHJlY3Vyc2l2ZS1kZXNjZW50IHBhcnNlciwgbWFkZSBlYXNpZXIgYnkgdHdvIGZhY3RzOlxuXHQqIFdlIGhhdmUgYWxyZWFkeSBncm91cGVkIHRva2Vucy5cblx0KiBNb3N0IG9mIHRoZSB0aW1lLCBhbiBhc3QncyB0eXBlIGlzIGRldGVybWluZWQgYnkgdGhlIGZpcnN0IHRva2VuLlxuXG5UaGVyZSBhcmUgZXhjZXB0aW9ucyBzdWNoIGFzIGFzc2lnbm1lbnQgc3RhdGVtZW50cyAoaW5kaWNhdGVkIGJ5IGEgYD1gIHNvbWV3aGVyZSBpbiB0aGUgbWlkZGxlKS5cbkZvciB0aG9zZSB3ZSBtdXN0IGl0ZXJhdGUgdGhyb3VnaCB0b2tlbnMgYW5kIHNwbGl0LlxuKFNlZSBTbGljZS5vcFNwbGl0T25jZVdoZXJlIGFuZCBTbGljZS5vcFNwbGl0TWFueVdoZXJlLilcbiovXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIHJvb3RUb2tlbikgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0YXNzZXJ0KGlzR3JvdXAoR19CbG9jaywgcm9vdFRva2VuKSlcblx0Y29uc3QgbXNBc3QgPSBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25zLlxuXHRjb250ZXh0ID0gdW5kZWZpbmVkXG5cdHJldHVybiBtc0FzdFxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHRjaGVja05vbkVtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjb250ZXh0LmNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0dW5leHBlY3RlZCA9IHRva2VuID0+IGNvbnRleHQuZmFpbCh0b2tlbi5sb2MsIGBVbmV4cGVjdGVkICR7dG9rZW4uc2hvdygpfWApXG5cbmNvbnN0IHBhcnNlTW9kdWxlID0gdG9rZW5zID0+IHtcblx0Ly8gVXNlIHN0YXRlbWVudHMgbXVzdCBhcHBlYXIgaW4gb3JkZXIuXG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURvLCB0b2tlbnMpXG5cdGNvbnN0IFsgcGxhaW5Vc2VzLCByZXN0MSBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZSwgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlTGF6eSwgcmVzdDEpXG5cdGNvbnN0IFsgZGVidWdVc2VzLCByZXN0MyBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURlYnVnLCByZXN0Milcblx0Y29uc3QgeyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH0gPSBwYXJzZU1vZHVsZUJsb2NrKHJlc3QzKVxuXG5cdGlmIChjb250ZXh0Lm9wdHMuaW5jbHVkZU1vZHVsZU5hbWUoKSAmJiAhZXhwb3J0cy5zb21lKF8gPT4gXy5uYW1lID09PSAnbmFtZScpKSB7XG5cdFx0Y29uc3QgbmFtZSA9IExvY2FsRGVjbGFyZU5hbWUodG9rZW5zLmxvYylcblx0XHRsaW5lcy5wdXNoKEFzc2lnblNpbmdsZSh0b2tlbnMubG9jLCBuYW1lLFxuXHRcdFx0UXVvdGUuZm9yU3RyaW5nKHRva2Vucy5sb2MsIGNvbnRleHQub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2gobmFtZSlcblx0fVxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydClcbn1cblxuLy8gcGFyc2VCbG9ja1xuY29uc3Rcblx0Ly8gVG9rZW5zIG9uIHRoZSBsaW5lIGJlZm9yZSBhIGJsb2NrLCBhbmQgdG9rZW5zIGZvciB0aGUgYmxvY2sgaXRzZWxmLlxuXHRiZWZvcmVBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdGNvbnRleHQuY2hlY2soaXNHcm91cChHX0Jsb2NrLCBibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0cmV0dXJuIFsgdG9rZW5zLnJ0YWlsKCksIFNsaWNlLmdyb3VwKGJsb2NrKSBdXG5cdH0sXG5cblx0YmxvY2tXcmFwID0gdG9rZW5zID0+IEJsb2NrV3JhcCh0b2tlbnMubG9jLCBwYXJzZUJsb2NrVmFsKHRva2VucykpLFxuXG5cdGp1c3RCbG9jayA9IChrZXl3b3JkLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5cblx0XHRcdGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBiZXR3ZWVuICR7Y29kZShrZXl3b3JkTmFtZShrZXl3b3JkKSl9IGFuZCBibG9jay5gKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXHRqdXN0QmxvY2tEbyA9IChrZXl3b3JkLCB0b2tlbnMpID0+XG5cdFx0cGFyc2VCbG9ja0RvKGp1c3RCbG9jayhrZXl3b3JkLCB0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gKGtleXdvcmQsIHRva2VucykgPT5cblx0XHRwYXJzZUJsb2NrVmFsKGp1c3RCbG9jayhrZXl3b3JkLCB0b2tlbnMpKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnRleHQuY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtoLnNob3coKX1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgaXNHcm91cChHX0Jsb2NrLCBibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2suc3ViVG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tEbyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgbGluZXMgPSBfcGxhaW5CbG9ja0xpbmVzKHRva2Vucylcblx0XHRyZXR1cm4gQmxvY2tEbyh0b2tlbnMubG9jLCBsaW5lcylcblx0fSxcblxuXHRwYXJzZUJsb2NrVmFsID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6XG5cdFx0XHRcdHJldHVybiBCbG9ja0JhZy5vZih0b2tlbnMubG9jLCBsaW5lcylcblx0XHRcdGNhc2UgS1JldHVybl9NYXA6XG5cdFx0XHRcdHJldHVybiBCbG9ja01hcC5vZih0b2tlbnMubG9jLCBsaW5lcylcblx0XHRcdGNhc2UgS1JldHVybl9PYmo6XG5cdFx0XHRcdGNvbnN0IFsgZG9MaW5lcywgb3BWYWwgXSA9IF90cnlUYWtlTGFzdFZhbChsaW5lcylcblx0XHRcdFx0Ly8gb3BOYW1lIHdyaXR0ZW4gdG8gYnkgX3RyeUFkZE5hbWUuXG5cdFx0XHRcdHJldHVybiBCbG9ja09iai5vZih0b2tlbnMubG9jLCBkb0xpbmVzLCBvcFZhbCwgbnVsbClcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayghaXNFbXB0eShsaW5lcyksIHRva2Vucy5sb2MsICdWYWx1ZSBibG9jayBtdXN0IGVuZCBpbiBhIHZhbHVlLicpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IGxhc3QobGluZXMpXG5cdFx0XHRcdGlmICh2YWwgaW5zdGFuY2VvZiBUaHJvdylcblx0XHRcdFx0XHRyZXR1cm4gQmxvY2tWYWxUaHJvdyh0b2tlbnMubG9jLCBydGFpbChsaW5lcyksIHZhbClcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayh2YWwgaW5zdGFuY2VvZiBWYWwsIHZhbC5sb2MsICdWYWx1ZSBibG9jayBtdXN0IGVuZCBpbiBhIHZhbHVlLicpXG5cdFx0XHRcdFx0cmV0dXJuIEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBydGFpbChsaW5lcyksIHZhbClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwYXJzZU1vZHVsZUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjb25zdCBsb2MgPSB0b2tlbnMubG9jXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOiBjYXNlIEtSZXR1cm5fTWFwOiB7XG5cdFx0XHRcdGNvbnN0IGJsb2NrID0gKGtSZXR1cm4gPT09IEtSZXR1cm5fQmFnID8gQmxvY2tCYWcgOiBCbG9ja01hcCkub2YobG9jLCBsaW5lcylcblx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IFsgXSwgZXhwb3J0czogWyBdLCBvcERlZmF1bHRFeHBvcnQ6IEJsb2NrV3JhcChsb2MsIGJsb2NrKSB9XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGNvbnN0IGV4cG9ydHMgPSBbIF1cblx0XHRcdFx0bGV0IG9wRGVmYXVsdEV4cG9ydCA9IG51bGxcblx0XHRcdFx0Y29uc3QgbW9kdWxlTmFtZSA9IGNvbnRleHQub3B0cy5tb2R1bGVOYW1lKClcblxuXHRcdFx0XHQvLyBNb2R1bGUgZXhwb3J0cyBsb29rIGxpa2UgYSBCbG9ja09iaiwgIGJ1dCBhcmUgcmVhbGx5IGRpZmZlcmVudC5cblx0XHRcdFx0Ly8gSW4gRVM2LCBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIGNvbXBsZXRlbHkgc3RhdGljLlxuXHRcdFx0XHQvLyBTbyB3ZSBrZWVwIGFuIGFycmF5IG9mIGV4cG9ydHMgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIE1vZHVsZSBhc3QuXG5cdFx0XHRcdC8vIElmIHlvdSB3cml0ZTpcblx0XHRcdFx0Ly9cdGlmISBjb25kXG5cdFx0XHRcdC8vXHRcdGEuIGJcblx0XHRcdFx0Ly8gaW4gYSBtb2R1bGUgY29udGV4dCwgaXQgd2lsbCBiZSBhbiBlcnJvci4gKFRoZSBtb2R1bGUgY3JlYXRlcyBubyBgYnVpbHRgIGxvY2FsLilcblx0XHRcdFx0Y29uc3QgZ2V0TGluZUV4cG9ydHMgPSBsaW5lID0+IHtcblx0XHRcdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIE9iakVudHJ5KSB7XG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZS5hc3NpZ24uYWxsQXNzaWduZWVzKCkpXG5cdFx0XHRcdFx0XHRcdGlmIChfLm5hbWUgPT09IG1vZHVsZU5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKG9wRGVmYXVsdEV4cG9ydCA9PT0gbnVsbCwgXy5sb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRgRGVmYXVsdCBleHBvcnQgYWxyZWFkeSBkZWNsYXJlZCBhdCAke29wRGVmYXVsdEV4cG9ydC5sb2N9YClcblx0XHRcdFx0XHRcdFx0XHRvcERlZmF1bHRFeHBvcnQgPSBMb2NhbEFjY2VzcyhfLmxvYywgXy5uYW1lKVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRleHBvcnRzLnB1c2goXylcblx0XHRcdFx0XHRcdHJldHVybiBsaW5lLmFzc2lnblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRcdFx0bGluZS5saW5lcyA9IGxpbmUubGluZXMubWFwKGdldExpbmVFeHBvcnRzKVxuXHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBtb2R1bGVMaW5lcyA9IGxpbmVzLm1hcChnZXRMaW5lRXhwb3J0cylcblxuXHRcdFx0XHRpZiAoaXNFbXB0eShleHBvcnRzKSAmJiBvcERlZmF1bHRFeHBvcnQgPT09IG51bGwpIHtcblx0XHRcdFx0XHRjb25zdCBbIGxpbmVzLCBvcERlZmF1bHRFeHBvcnQgXSA9IF90cnlUYWtlTGFzdFZhbChtb2R1bGVMaW5lcylcblx0XHRcdFx0XHRyZXR1cm4geyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH1cblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IG1vZHVsZUxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZUxhc3RWYWwgPSBsaW5lcyA9PlxuXHRcdCghaXNFbXB0eShsaW5lcykgJiYgbGFzdChsaW5lcykgaW5zdGFuY2VvZiBWYWwpID9cblx0XHRcdFsgcnRhaWwobGluZXMpLCBsYXN0KGxpbmVzKSBdIDpcblx0XHRcdFsgbGluZXMsIG51bGwgXSxcblxuXHRfcGxhaW5CbG9ja0xpbmVzID0gbGluZVRva2VucyA9PiB7XG5cdFx0Y29uc3QgbGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZSlcblx0XHRcdFx0XHRhZGRMaW5lKF8pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxpbmVzLnB1c2gobGluZSlcblx0XHR9XG5cdFx0bGluZVRva2Vucy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblx0XHRyZXR1cm4gbGluZXNcblx0fSxcblxuXHRLUmV0dXJuX1BsYWluID0gMCxcblx0S1JldHVybl9PYmogPSAxLFxuXHRLUmV0dXJuX0JhZyA9IDIsXG5cdEtSZXR1cm5fTWFwID0gMyxcblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVUb2tlbnMgPT4ge1xuXHRcdGxldCBpc0JhZyA9IGZhbHNlLCBpc01hcCA9IGZhbHNlLCBpc09iaiA9IGZhbHNlXG5cdFx0Y29uc3QgY2hlY2tMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZS5saW5lcylcblx0XHRcdFx0XHRjaGVja0xpbmUoXylcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBCYWdFbnRyeSlcblx0XHRcdFx0aXNCYWcgPSB0cnVlXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpXG5cdFx0XHRcdGlzTWFwID0gdHJ1ZVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIE9iakVudHJ5KVxuXHRcdFx0XHRpc09iaiA9IHRydWVcblx0XHR9XG5cdFx0Y29uc3QgbGluZXMgPSBfcGxhaW5CbG9ja0xpbmVzKGxpbmVUb2tlbnMpXG5cdFx0Zm9yIChjb25zdCBfIG9mIGxpbmVzKVxuXHRcdFx0Y2hlY2tMaW5lKF8pXG5cblx0XHRjb250ZXh0LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGNvbnRleHQuY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y29udGV4dC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGxpbmVzLCBrUmV0dXJuIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaXNWYWwsIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IG51bGxcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnblNpbmdsZS5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IGlzS2V5d29yZChLV19FbHNlLCBsYXN0TGluZS5oZWFkKCkpID9cblx0XHRbIGJsb2NrLnJ0YWlsKCksIChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShLV19FbHNlLCBsYXN0TGluZS50YWlsKCkpIF0gOlxuXHRcdFsgYmxvY2ssIG51bGwgXVxuXG5cdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcChsaW5lID0+IHtcblx0XHRsaW5lID0gU2xpY2UuZ3JvdXAobGluZSlcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUpXG5cdFx0Y29uc3QgdGVzdCA9IF9wYXJzZUNhc2VUZXN0KGJlZm9yZSlcblx0XHRjb25zdCByZXN1bHQgPSAoaXNWYWwgPyBwYXJzZUJsb2NrVmFsIDogcGFyc2VCbG9ja0RvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjb250ZXh0LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfT2JqQXNzaWduLCBfKSksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkoZmlyc3QsICgpID0+IGBVbmV4cGVjdGVkICR7c3BsaXRzWzBdLmF0LnNob3coKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbIF1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgRXhwZWN0ZWQgYSBuYW1lLCBub3QgJHtuYW1lLnNob3coKX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3BTcGxpdCA9IHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKHRva2VuID0+IHtcblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX0Nhc2VWYWw6IGNhc2UgS1dfRXhjZXB0VmFsOiBjYXNlIEtXX0ZvckJhZzogY2FzZSBLV19Gb3JWYWw6XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfRnVuRG86IGNhc2UgS1dfR2VuRnVuOiBjYXNlIEtXX0dlbkZ1bkRvOiBjYXNlIEtXX0lmVmFsOlxuXHRcdFx0XHRcdGNhc2UgS1dfTmV3OiBjYXNlIEtXX05vdDogY2FzZSBLV19PcjogY2FzZSBLV19Vbmxlc3NWYWw6IGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0pXG5cdFx0cmV0dXJuIGlmRWxzZShvcFNwbGl0LFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBsYXN0ID0gKCgpID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKGF0LmtpbmQpIHtcblx0XHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX09yOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTG9naWMoYXQubG9jLCBhdC5raW5kID09PSBLV19BbmQgPyBMX0FuZCA6IExfT3IsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByUGFydHMoYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19DYXNlVmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKHRydWUsIGZhbHNlLCBhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRXhjZXB0VmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VFeGNlcHQoS1dfRXhjZXB0VmFsLCBhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRm9yQmFnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3JCYWcoYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0ZvclZhbDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRm9yVmFsKGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19GdW46XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZ1bihmYWxzZSwgZmFsc2UsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19GdW5Ebzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRnVuKHRydWUsIGZhbHNlLCBhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGdW4oZmFsc2UsIHRydWUsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19HZW5GdW5Ebzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRnVuKHRydWUsIHRydWUsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19Vbmxlc3NWYWw6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsVmFsKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByKGJlZm9yZSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VCbG9ja1ZhbChibG9jayksXG5cdFx0XHRcdFx0XHRcdFx0YXQua2luZCA9PT0gS1dfVW5sZXNzVmFsKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19OZXc6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIE5ldyhhdC5sb2MsIHBhcnRzWzBdLCB0YWlsKHBhcnRzKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgS1dfTm90OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTm90KGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZChhdC5sb2MsIHBhcnNlRXhwcihhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZFRvKGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihhdC5raW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkoKVxuXHRcdFx0XHRyZXR1cm4gcHVzaChiZWZvcmUubWFwKHBhcnNlU2luZ2xlKSwgbGFzdClcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB0b2tlbnMubWFwKHBhcnNlU2luZ2xlKSlcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBnb3Qgbm90aGluZy4nKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNEbywgaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhpc0RvLCByZXN0KVxuXHRmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKVxuXHRcdGlmICghYXJnLmlzTGF6eSgpKVxuXHRcdFx0YXJnLmtpbmQgPSBMRF9NdXRhYmxlXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdF8gPT4gTG9jYWxEZWNsYXJlUmVzKF8ubG9jLCBfKSxcblx0XHQoKSA9PiBvcE1hcChvcE91dCwgbyA9PiBMb2NhbERlY2xhcmVSZXMoby5sb2MsIG51bGwpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgaCkgJiYgaXNLZXl3b3JkKEtXX1R5cGUsIGhlYWQoaC5zdWJUb2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogbnVsbCwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gKGlzRG8sIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gTWlnaHQgYmUgYHxjYXNlYFxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZCAmJiAoaC5raW5kID09PSBLV19DYXNlVmFsIHx8IGgua2luZCA9PT0gS1dfQ2FzZURvKSkge1xuXHRcdFx0Y29uc3QgZUNhc2UgPSBwYXJzZUNhc2UoaC5raW5kID09PSBLV19DYXNlVmFsLCB0cnVlLCB0b2tlbnMudGFpbCgpKVxuXHRcdFx0Y29uc3QgYXJncyA9IFsgTG9jYWxEZWNsYXJlRm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX0Nhc2VWYWwgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrTGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9ja0xpbmVzKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dChLV19PdXQsIHJlc3QwKVxuXHRcdFx0Y29uc3QgYmxvY2sgPSAoaXNEbyA/IHBhcnNlQmxvY2tEbyA6IHBhcnNlQmxvY2tWYWwpKHJlc3QxKVxuXHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBMb2NhbERlY2xhcmVQbGFpbihsLmxvYywgbC5uYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdH1cblx0fSxcblxuXHRfdHJ5VGFrZUluT3JPdXQgPSAoaW5Pck91dCwgdG9rZW5zKSA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBmaXJzdExpbmUgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKGluT3JPdXQsIGhlYWQoZmlyc3RMaW5lLnN1YlRva2VucykpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKFNsaWNlLmdyb3VwKGZpcnN0TGluZSkpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHRjb25zdCBub1Jlc3QgPSAoKSA9PlxuXHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtoZWFkLnNob3coKX1gKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaGVhZCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGhlYWQua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX0Fzc2VydDogY2FzZSBLV19Bc3NlcnROb3Q6XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQXNzZXJ0KGhlYWQua2luZCA9PT0gS1dfQXNzZXJ0Tm90LCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0V4Y2VwdERvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUV4Y2VwdChLV19FeGNlcHREbywgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19CcmVha0RvOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIEJyZWFrRG8odG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19CcmVha1ZhbDpcblx0XHRcdFx0XHRyZXR1cm4gQnJlYWtWYWwodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKGZhbHNlLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19Db250aW51ZTpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBDb250aW51ZSh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnOlxuXHRcdFx0XHRcdHJldHVybiBEZWJ1Zyh0b2tlbnMubG9jLFxuXHRcdFx0XHRcdFx0aXNHcm91cChHX0Jsb2NrLCB0b2tlbnMuc2Vjb25kKCkpID9cblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gaW5kZW50ZWQgYmxvY2tcblx0XHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soKSA6XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIHNpbmdsZSBsaW5lXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVPckxpbmVzKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnZ2VyOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWxEbyh0b2tlbnMubG9jLCBTUF9EZWJ1Z2dlcilcblx0XHRcdFx0Y2FzZSBLV19FbGxpcHNpczpcblx0XHRcdFx0XHRyZXR1cm4gQmFnRW50cnlNYW55KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19Gb3JEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3JEbyhyZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0lmRG86IGNhc2UgS1dfVW5sZXNzRG86IHtcblx0XHRcdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHJlc3QpXG5cdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsRG8odG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdHBhcnNlRXhwcihiZWZvcmUpLFxuXHRcdFx0XHRcdFx0cGFyc2VCbG9ja0RvKGJsb2NrKSxcblx0XHRcdFx0XHRcdGhlYWQua2luZCA9PT0gS1dfVW5sZXNzRG8pXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19UaHJvdzpcblx0XHRcdFx0XHRyZXR1cm4gVGhyb3codG9rZW5zLmxvYywgb3BJZighcmVzdC5pc0VtcHR5KCksICgpID0+IHBhcnNlRXhwcihyZXN0KSkpXG5cdFx0XHRcdGNhc2UgS1dfUGFzczpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBbIF1cblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfaXNMaW5lU3BsaXRLZXl3b3JkKSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmtpbmQgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0YXQua2luZCA9PT0gS1dfTG9jYWxNdXRhdGUgP1xuXHRcdFx0XHRcdF9wYXJzZUxvY2FsTXV0YXRlKGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X2lzTGluZVNwbGl0S2V5d29yZCA9IHRva2VuID0+IHtcblx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQXNzaWduOiBjYXNlIEtXX0Fzc2lnbk11dGFibGU6IGNhc2UgS1dfTG9jYWxNdXRhdGU6XG5cdFx0XHRcdGNhc2UgS1dfTWFwRW50cnk6IGNhc2UgS1dfT2JqQXNzaWduOiBjYXNlIEtXX1lpZWxkOiBjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0fSxcblxuXHRfcGFyc2VMb2NhbE11dGF0ZSA9IChsb2NhbHNUb2tlbnMsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMobG9jYWxzVG9rZW5zKVxuXHRcdGNvbnRleHQuY2hlY2sobG9jYWxzLmxlbmd0aCA9PT0gMSwgbG9jLCAnVE9ETzogTG9jYWxEZXN0cnVjdHVyZU11dGF0ZScpXG5cdFx0Y29uc3QgbmFtZSA9IGxvY2Fsc1swXS5uYW1lXG5cdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHIodmFsdWVUb2tlbnMpXG5cdFx0cmV0dXJuIExvY2FsTXV0YXRlKGxvYywgbmFtZSwgdmFsdWUpXG5cdH0sXG5cblx0X3BhcnNlQXNzaWduID0gKGxvY2Fsc1Rva2VucywgYXNzaWduZXIsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBraW5kID0gYXNzaWduZXIua2luZFxuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29uc3Qgb3BOYW1lID0gb3BJZihsb2NhbHMubGVuZ3RoID09PSAxLCAoKSA9PiBsb2NhbHNbMF0ubmFtZSlcblx0XHRjb25zdCB2YWx1ZSA9IF9wYXJzZUFzc2lnblZhbHVlKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpXG5cblx0XHRjb25zdCBpc1lpZWxkID0ga2luZCA9PT0gS1dfWWllbGQgfHwga2luZCA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNZaWVsZCwgbG9jYWxzVG9rZW5zLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsb2NhbHMpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghXy5pc0xhenkoKSwgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJylcblxuXHRcdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblxuXHRcdFx0aWYgKGtpbmQgPT09IEtXX0Fzc2lnbk11dGFibGUpXG5cdFx0XHRcdGZvciAobGV0IF8gb2YgbG9jYWxzKSB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghXy5pc0xhenkoKSwgXy5sb2MsICdMYXp5IGxvY2FsIGNhbiBub3QgYmUgbXV0YWJsZS4nKVxuXHRcdFx0XHRcdF8ua2luZCA9IExEX011dGFibGVcblx0XHRcdFx0fVxuXG5cdFx0XHRjb25zdCB3cmFwID0gXyA9PiBpc09iakFzc2lnbiA/IE9iakVudHJ5KGxvYywgXykgOiBfXG5cblx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRcdGNvbnN0IGFzc2lnbiA9IEFzc2lnblNpbmdsZShsb2MsIGFzc2lnbmVlLCB2YWx1ZSlcblx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdHJldHVybiBpc1Rlc3QgPyBEZWJ1Zyhsb2MsIFsgd3JhcChhc3NpZ24pIF0pIDogd3JhcChhc3NpZ24pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBraW5kID0gbG9jYWxzWzBdLmtpbmRcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxvY2Fscylcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKF8ua2luZCA9PT0ga2luZCwgXy5sb2MsXG5cdFx0XHRcdFx0XHQnQWxsIGxvY2FscyBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbm1lbnQgbXVzdCBiZSBvZiB0aGUgc2FtZSBraW5kLicpXG5cdFx0XHRcdHJldHVybiB3cmFwKEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCB2YWx1ZSwga2luZCkpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnblZhbHVlID0gKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHZhbHVlVG9rZW5zLmlzRW1wdHkoKSAmJiBraW5kID09PSBLV19PYmpBc3NpZ24gP1xuXHRcdFx0U3BlY2lhbFZhbCh2YWx1ZVRva2Vucy5sb2MsIFNWX051bGwpIDpcblx0XHRcdHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRpZiAob3BOYW1lICE9PSBudWxsKVxuXHRcdFx0X3RyeUFkZE5hbWUodmFsdWUsIG9wTmFtZSlcblx0XHRzd2l0Y2ggKGtpbmQpIHtcblx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdHJldHVybiBZaWVsZCh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIFdlIGdpdmUgaXQgYSBuYW1lIGlmOlxuXHQvLyBJdCdzIGEgZnVuY3Rpb25cblx0Ly8gSXQncyBhbiBPYmogYmxvY2tcblx0Ly8gSXQncyBhbiBPYmogYmxvY2sgYXQgdGhlIGVuZCBvZiBhIGNhbGwgKGFzIGluIGBuYW1lID0gT2JqLVR5cGUgLi4uYClcblx0X3RyeUFkZE5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0Xy5uYW1lID0gbmFtZVxuXHRcdGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBDYWxsICYmIF8uYXJncy5sZW5ndGggPiAwKVxuXHRcdFx0X3RyeUFkZE9iak5hbWUobGFzdChfLmFyZ3MpLCBuYW1lKVxuXHRcdGVsc2Vcblx0XHRcdF90cnlBZGRPYmpOYW1lKF8sIG5hbWUpXG5cdH0sXG5cblx0X3RyeUFkZE9iak5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgQmxvY2tXcmFwICYmIF8uYmxvY2sgaW5zdGFuY2VvZiBCbG9ja09iailcblx0XHRcdGlmIChfLmJsb2NrLm9wT2JqZWQgIT09IG51bGwgJiYgXy5ibG9jay5vcE9iamVkIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRfLmJsb2NrLm9wT2JqZWQubmFtZSA9IG5hbWVcblx0XHRcdGVsc2UgaWYgKCFfbmFtZU9iakFzc2lnblNvbWV3aGVyZShfLmJsb2NrLmxpbmVzKSlcblx0XHRcdFx0Xy5ibG9jay5vcE5hbWUgPSBuYW1lXG5cdH0sXG5cdF9uYW1lT2JqQXNzaWduU29tZXdoZXJlID0gbGluZXMgPT5cblx0XHRsaW5lcy5zb21lKGxpbmUgPT5cblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSAmJiBsaW5lLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5zb21lKF8gPT5cblx0XHRcdFx0Xy5uYW1lID09PSAnbmFtZScpKSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0TWFwRW50cnkobG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VFeHByKGFmdGVyKSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzID0gdG9rZW5zID0+XG5cdFx0dG9rZW5zLm1hcChfID0+IExvY2FsRGVjbGFyZVBsYWluKF8ubG9jLCBfcGFyc2VMb2NhbE5hbWUoXykpKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cblx0cGFyc2VMb2NhbERlY2xhcmUgPSB0b2tlbiA9PiB7XG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgdG9rZW4pKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0b2tlbilcblx0XHRcdGNvbnN0IFsgcmVzdCwgaXNMYXp5IF0gPVxuXHRcdFx0XHRpc0tleXdvcmQoS1dfTGF6eSwgdG9rZW5zLmhlYWQoKSkgPyBbIHRva2Vucy50YWlsKCksIHRydWUgXSA6IFsgdG9rZW5zLCBmYWxzZSBdXG5cdFx0XHRjb25zdCBuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0Y29uc3Qgb3BUeXBlID0gb3BJZighcmVzdDIuaXNFbXB0eSgpLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKEtXX1R5cGUsIGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbi5zaG93KCl9YClcblx0XHRcdFx0cmV0dXJuIHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZSh0b2tlbi5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5ID8gTERfTGF6eSA6IExEX0NvbnN0KVxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZVBsYWluKHRva2VuLmxvYywgX3BhcnNlTG9jYWxOYW1lKHRva2VuKSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKGlzS2V5d29yZChLV19Gb2N1cywgdCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dC5zaG93KCl9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdG9rZW4gPT4ge1xuXHRjb25zdCB7IGxvYyB9ID0gdG9rZW5cblx0cmV0dXJuIHRva2VuIGluc3RhbmNlb2YgTmFtZSA/XG5cdF9hY2Nlc3ModG9rZW4ubmFtZSwgbG9jKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgR3JvdXAgPyAoKCkgPT4ge1xuXHRcdGNvbnN0IHNsaWNlID0gU2xpY2UuZ3JvdXAodG9rZW4pXG5cdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEdfU3BhY2U6XG5cdFx0XHRcdHJldHVybiBwYXJzZVNwYWNlZChzbGljZSlcblx0XHRcdGNhc2UgR19QYXJlbnRoZXNpczpcblx0XHRcdFx0cmV0dXJuIHBhcnNlRXhwcihzbGljZSlcblx0XHRcdGNhc2UgR19CcmFja2V0OlxuXHRcdFx0XHRyZXR1cm4gQmFnU2ltcGxlKGxvYywgcGFyc2VFeHByUGFydHMoc2xpY2UpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRyZXR1cm4gYmxvY2tXcmFwKHNsaWNlKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUobG9jLFxuXHRcdFx0XHRcdHNsaWNlLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcih0b2tlbi5raW5kKVxuXHRcdH1cblx0fSkoKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgTnVtYmVyTGl0ZXJhbCA/XG5cdHRva2VuIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkID9cblx0XHR0b2tlbi5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpIDpcblx0XHRcdGlmRWxzZShvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kKHRva2VuLmtpbmQpLFxuXHRcdFx0XHRfID0+IFNwZWNpYWxWYWwobG9jLCBfKSxcblx0XHRcdFx0KCkgPT4gdW5leHBlY3RlZCh0b2tlbikpIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lICYmIHRva2VuLm5Eb3RzID09PSAzID9cblx0U3BsYXQobG9jLCBMb2NhbEFjY2Vzcyhsb2MsIHRva2VuLm5hbWUpKSA6XG5cdHVuZXhwZWN0ZWQodG9rZW4pXG59XG5cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoaXNLZXl3b3JkKEtXX1R5cGUsIGgpKSB7XG5cdFx0Y29uc3QgZVR5cGUgPSBwYXJzZVNwYWNlZChyZXN0KVxuXHRcdGNvbnN0IGZvY3VzID0gTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpXG5cdFx0cmV0dXJuIENhbGwuY29udGFpbnMoaC5sb2MsIGVUeXBlLCBmb2N1cylcblx0fSBlbHNlIGlmIChpc0tleXdvcmQoS1dfTGF6eSwgaCkpXG5cdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRlbHNlIHtcblx0XHQvLyBUb2tlbnMgd2l0aGluIGEgc3BhY2UgZ3JvdXAgd3JhcCBwcmV2aW91cyB0b2tlbnMuXG5cdFx0Y29uc3QgbW9kID0gKGFjYywgdG9rZW4pID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHRva2VuLmxvY1xuXHRcdFx0aWYgKHRva2VuIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKHRva2VuLm5Eb3RzID09PSAxLCBsb2MsICdUb28gbWFueSBkb3RzIScpXG5cdFx0XHRcdHJldHVybiBNZW1iZXIobG9jLCBhY2MsIHRva2VuLm5hbWUpXG5cdFx0XHR9IGVsc2UgaWYgKGlzS2V5d29yZChLV19Gb2N1cywgdG9rZW4pKVxuXHRcdFx0XHRyZXR1cm4gQ2FsbChsb2MsIGFjYywgWyBMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpIF0pXG5cdFx0XHRlbHNlIGlmICh0b2tlbiBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0b2tlbi5raW5kID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdHVuc2hpZnQoYWNjLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0b2tlbikpKSlcblx0XHRcdFx0aWYgKHRva2VuLmtpbmQgPT09IEdfUGFyZW50aGVzaXMpIHtcblx0XHRcdFx0XHRjaGVja0VtcHR5KFNsaWNlLmdyb3VwKHRva2VuKSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBhY2MsIFtdKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0Y29udGV4dC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0b2tlbi5zaG93KCl9YClcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1vZCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKGlzS2V5d29yZChrLCBsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKHVzZUtleXdvcmRLaW5kLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5cblx0XHRcdGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUodXNlS2V5d29yZEtpbmQpfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRsaW5lID0gU2xpY2UuZ3JvdXAobGluZSlcblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZShsaW5lLmhlYWQoKSlcblx0XHRcdGlmICh1c2VLZXl3b3JkS2luZCA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUuc2l6ZSgpID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUuc2Vjb25kKCkpXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IHVzZUtleXdvcmRLaW5kID09PSBLV19Vc2VMYXp5IHx8XG5cdFx0XHRcdFx0dXNlS2V5d29yZEtpbmQgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBsaW5lLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmVVbnR5cGVkKHRva2Vucy5sb2MsIG5hbWUsIGlzTGF6eSA/IExEX0xhenkgOiBMRF9Db25zdClcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFsgXSwgb3BVc2VEZWZhdWx0OiB1c2VEZWZhdWx0KCkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBvcFVzZURlZmF1bHQsIHJlc3QgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19Gb2N1cywgdG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdFx0bC5raW5kID0gTERfTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNHcm91cChHX1NwYWNlLCB0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHRva2VuID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2sodG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lICYmIHRva2VuLm5Eb3RzID09PSAxLCB0b2tlbi5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHRva2VuLm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG5cbmNvbnN0XG5cdF9wYXJzZUZvciA9IGN0ciA9PiB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdHJldHVybiBjdHIodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBwYXJzZUJsb2NrRG8oYmxvY2spKVxuXHR9LFxuXHRfcGFyc2VPcEl0ZXJhdGVlID0gdG9rZW5zID0+XG5cdFx0b3BJZighdG9rZW5zLmlzRW1wdHkoKSwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgWyBlbGVtZW50LCBiYWcgXSA9XG5cdFx0XHRcdGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfID0+IGlzS2V5d29yZChLV19JbiwgXykpLFxuXHRcdFx0XHRcdCh7IGJlZm9yZSwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhiZWZvcmUuc2l6ZSgpID09PSAxLCBiZWZvcmUubG9jLCAnVE9ETzogcGF0dGVybiBpbiBmb3InKVxuXHRcdFx0XHRcdFx0cmV0dXJuIFsgcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKGJlZm9yZSlbMF0sIHBhcnNlRXhwcihhZnRlcikgXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KCkgPT4gWyBMb2NhbERlY2xhcmVGb2N1cyh0b2tlbnMubG9jKSwgcGFyc2VFeHByKHRva2VucykgXSlcblx0XHRcdHJldHVybiBJdGVyYXRlZSh0b2tlbnMubG9jLCBlbGVtZW50LCBiYWcpXG5cdFx0fSlcbmNvbnN0XG5cdHBhcnNlRm9yRG8gPSBfcGFyc2VGb3IoRm9yRG8pLFxuXHRwYXJzZUZvclZhbCA9IF9wYXJzZUZvcihGb3JWYWwpLFxuXHQvLyBUT0RPOiAtPiBvdXQtdHlwZVxuXHRwYXJzZUZvckJhZyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y29uc3QgYmxvY2sgPSBwYXJzZUJsb2NrRG8obGluZXMpXG5cdFx0Ly8gVE9ETzogQmV0dGVyIHdheT9cblx0XHRpZiAoYmxvY2subGluZXMubGVuZ3RoID09PSAxICYmIGJsb2NrLmxpbmVzWzBdIGluc3RhbmNlb2YgVmFsKVxuXHRcdFx0YmxvY2subGluZXNbMF0gPSBCYWdFbnRyeShibG9jay5saW5lc1swXS5sb2MsIGJsb2NrLmxpbmVzWzBdKVxuXHRcdHJldHVybiBGb3JCYWcub2YodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBibG9jaylcblx0fVxuXG5cbmNvbnN0XG5cdHBhcnNlRXhjZXB0ID0gKGt3RXhjZXB0LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdFxuXHRcdFx0aXNWYWwgPSBrd0V4Y2VwdCA9PT0gS1dfRXhjZXB0VmFsLFxuXHRcdFx0anVzdERvVmFsQmxvY2sgPSBpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvLFxuXHRcdFx0cGFyc2VCbG9jayA9IGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbyxcblx0XHRcdEV4Y2VwdCA9IGlzVmFsID8gRXhjZXB0VmFsIDogRXhjZXB0RG8sXG5cdFx0XHRrd1RyeSA9IGlzVmFsID8gS1dfVHJ5VmFsIDogS1dfVHJ5RG8sXG5cdFx0XHRrd0NhdGNoID0gaXNWYWwgPyBLV19DYXRjaFZhbCA6IEtXX0NhdGNoRG8sXG5cdFx0XHRuYW1lVHJ5ID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd1RyeSkpLFxuXHRcdFx0bmFtZUNhdGNoID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd0NhdGNoKSksXG5cdFx0XHRuYW1lRmluYWxseSA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoS1dfRmluYWxseSkpXG5cblx0XHRjb25zdCBsaW5lcyA9IGp1c3RCbG9jayhrd0V4Y2VwdCwgdG9rZW5zKVxuXG5cdFx0Ly8gYHRyeWAgKm11c3QqIGNvbWUgZmlyc3QuXG5cdFx0Y29uc3QgZmlyc3RMaW5lID0gU2xpY2UuZ3JvdXAobGluZXMuaGVhZCgpKVxuXHRcdGNvbnN0IHRva2VuVHJ5ID0gZmlyc3RMaW5lLmhlYWQoKVxuXHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKGt3VHJ5LCB0b2tlblRyeSksIHRva2VuVHJ5LmxvYywgKCkgPT5cblx0XHRcdGBNdXN0IHN0YXJ0IHdpdGggJHtuYW1lVHJ5KCl9YClcblx0XHRjb25zdCBfdHJ5ID0ganVzdERvVmFsQmxvY2soa3dUcnksIGZpcnN0TGluZS50YWlsKCkpXG5cblx0XHRjb25zdCByZXN0TGluZXMgPSBsaW5lcy50YWlsKClcblx0XHRjaGVja05vbkVtcHR5KHJlc3RMaW5lcywgKCkgPT5cblx0XHRcdGBNdXN0IGhhdmUgYXQgbGVhc3Qgb25lIG9mICR7bmFtZUNhdGNoKCl9IG9yICR7bmFtZUZpbmFsbHkoKX1gKVxuXG5cdFx0Y29uc3QgaGFuZGxlRmluYWxseSA9IHJlc3RMaW5lcyA9PiB7XG5cdFx0XHRjb25zdCBsaW5lID0gU2xpY2UuZ3JvdXAocmVzdExpbmVzLmhlYWQoKSlcblx0XHRcdGNvbnN0IHRva2VuRmluYWxseSA9IGxpbmUuaGVhZCgpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChLV19GaW5hbGx5LCB0b2tlbkZpbmFsbHkpLCB0b2tlbkZpbmFsbHkubG9jLCAoKSA9PlxuXHRcdFx0XHRgRXhwZWN0ZWQgJHtuYW1lRmluYWxseSgpfWApXG5cdFx0XHRjb250ZXh0LmNoZWNrKHJlc3RMaW5lcy5zaXplKCkgPT09IDEsIHJlc3RMaW5lcy5sb2MsICgpID0+XG5cdFx0XHRcdGBOb3RoaW5nIGlzIGFsbG93ZWQgdG8gY29tZSBhZnRlciAke25hbWVGaW5hbGx5KCl9LmApXG5cdFx0XHRyZXR1cm4ganVzdEJsb2NrRG8oS1dfRmluYWxseSwgbGluZS50YWlsKCkpXG5cdFx0fVxuXG5cdFx0bGV0IF9jYXRjaCwgX2ZpbmFsbHlcblxuXHRcdGNvbnN0IGxpbmUyID0gU2xpY2UuZ3JvdXAocmVzdExpbmVzLmhlYWQoKSlcblx0XHRjb25zdCBoZWFkMiA9IGxpbmUyLmhlYWQoKVxuXHRcdGlmIChpc0tleXdvcmQoa3dDYXRjaCwgaGVhZDIpKSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZTIsIGJsb2NrMiBdID0gYmVmb3JlQW5kQmxvY2sobGluZTIudGFpbCgpKVxuXHRcdFx0Y29uc3QgY2F1Z2h0ID0gX3BhcnNlT25lTG9jYWxEZWNsYXJlT3JGb2N1cyhiZWZvcmUyKVxuXHRcdFx0X2NhdGNoID0gQ2F0Y2gobGluZTIubG9jLCBjYXVnaHQsIHBhcnNlQmxvY2soYmxvY2syKSlcblx0XHRcdF9maW5hbGx5ID0gb3BJZihyZXN0TGluZXMuc2l6ZSgpID4gMSwgKCkgPT4gaGFuZGxlRmluYWxseShyZXN0TGluZXMudGFpbCgpKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2NhdGNoID0gbnVsbFxuXHRcdFx0X2ZpbmFsbHkgPSBoYW5kbGVGaW5hbGx5KHJlc3RMaW5lcylcblx0XHR9XG5cblx0XHRyZXR1cm4gRXhjZXB0KHRva2Vucy5sb2MsIF90cnksIF9jYXRjaCwgX2ZpbmFsbHkpXG5cdH0sXG5cdF9wYXJzZU9uZUxvY2FsRGVjbGFyZU9yRm9jdXMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZUZvY3VzKHRva2Vucy5sb2MpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5zaXplKCkgPT09IDEsICdFeHBlY3RlZCBvbmx5IG9uZSBsb2NhbCBkZWNsYXJlLicpXG5cdFx0XHRyZXR1cm4gcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucylbMF1cblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VBc3NlcnQgPSAobmVnYXRlLCB0b2tlbnMpID0+IHtcblx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtrZXl3b3JkTmFtZShLV19Bc3NlcnQpfS5gKVxuXG5cdGNvbnN0IFsgY29uZFRva2Vucywgb3BUaHJvd24gXSA9XG5cdFx0aWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF8gPT4gaXNLZXl3b3JkKEtXX1Rocm93LCBfKSksXG5cdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IFsgYmVmb3JlLCBwYXJzZUV4cHIoYWZ0ZXIpIF0sXG5cdFx0XHQoKSA9PiBbIHRva2VucywgbnVsbCBdKVxuXG5cdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHMoY29uZFRva2Vucylcblx0Y29uc3QgY29uZCA9IHBhcnRzLmxlbmd0aCA9PT0gMSA/IHBhcnRzWzBdIDogQ2FsbChjb25kVG9rZW5zLmxvYywgcGFydHNbMF0sIHRhaWwocGFydHMpKVxuXHRyZXR1cm4gQXNzZXJ0KHRva2Vucy5sb2MsIG5lZ2F0ZSwgY29uZCwgb3BUaHJvd24pXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==