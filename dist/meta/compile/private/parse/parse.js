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

	module.exports = (_context, rootToken) => {
		context = _context;
		(0, _util.assert)((0, _Token.isGroup)(_Token.G_Block, rootToken));
		const msAst = parseModule(_Slice2.default.group(rootToken));
		// Release for garbage collections.
		context = undefined;
		return msAst;
	};

	const checkEmpty = (tokens, message) => context.check(tokens.isEmpty(), tokens.loc, message),
	      checkNonEmpty = (tokens, message) => context.check(!tokens.isEmpty(), tokens.loc, message),
	      unexpected = token => context.fail(token.loc, `Unexpected ${ token.show() }`);

	const parseModule = tokens => {
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

		if (context.opts.includeModuleName() && !exports.some(_ => _.name === 'name')) {
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
	beforeAndBlock = tokens => {
		checkNonEmpty(tokens, 'Expected an indented block.');
		const block = tokens.last();
		context.check((0, _Token.isGroup)(_Token.G_Block, block), block.loc, 'Expected an indented block.');
		return [tokens.rtail(), _Slice2.default.group(block)];
	},
	      blockWrap = tokens => (0, _MsAst.BlockWrap)(tokens.loc, parseBlockVal(tokens)),
	      justBlock = (keyword, tokens) => {
		var _beforeAndBlock = beforeAndBlock(tokens);

		var _beforeAndBlock2 = _slicedToArray(_beforeAndBlock, 2);

		const before = _beforeAndBlock2[0];
		const block = _beforeAndBlock2[1];

		checkEmpty(before, () => `Did not expect anything between ${ (0, _CompileError.code)((0, _Token.keywordName)(keyword)) } and block.`);
		return block;
	},
	      justBlockDo = (keyword, tokens) => parseBlockDo(justBlock(keyword, tokens)),
	      justBlockVal = (keyword, tokens) => parseBlockVal(justBlock(keyword, tokens)),
	     

	// Gets lines in a region or Debug.
	parseLinesFromBlock = tokens => {
		const h = tokens.head();
		context.check(tokens.size() > 1, h.loc, () => `Expected indented block after ${ h.show() }`);
		const block = tokens.second();
		(0, _util.assert)(tokens.size() === 2 && (0, _Token.isGroup)(_Token.G_Block, block));
		return (0, _util.flatMap)(block.subTokens, line => parseLineOrLines(_Slice2.default.group(line)));
	},
	      parseBlockDo = tokens => {
		const lines = _plainBlockLines(tokens);
		return (0, _MsAst.BlockDo)(tokens.loc, lines);
	},
	      parseBlockVal = tokens => {
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
	      parseModuleBlock = tokens => {
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
					const getLineExports = line => {
						if (line instanceof _MsAst.ObjEntry) {
							for (const _ of line.assign.allAssignees()) if (_.name === moduleName) {
								context.check(opDefaultExport === null, _.loc, () => `Default export already declared at ${ opDefaultExport.loc }`);
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

						return { lines, exports, opDefaultExport };
					} else return { lines: moduleLines, exports, opDefaultExport };
				}
		}
	};

	// parseBlock privates
	const _tryTakeLastVal = lines => !(0, _util.isEmpty)(lines) && (0, _util.last)(lines) instanceof _MsAst.Val ? [(0, _util.rtail)(lines), (0, _util.last)(lines)] : [lines, null],
	      _plainBlockLines = lineTokens => {
		const lines = [];
		const addLine = line => {
			if (line instanceof Array) for (const _ of line) addLine(_);else lines.push(line);
		};
		lineTokens.each(_ => addLine(parseLine(_Slice2.default.group(_))));
		return lines;
	},
	      KReturn_Plain = 0,
	      KReturn_Obj = 1,
	      KReturn_Bag = 2,
	      KReturn_Map = 3,
	      _parseBlockLines = lineTokens => {
		let isBag = false,
		    isMap = false,
		    isObj = false;
		const checkLine = line => {
			if (line instanceof _MsAst.Debug) for (const _ of line.lines) checkLine(_);else if (line instanceof _MsAst.BagEntry) isBag = true;else if (line instanceof _MsAst.MapEntry) isMap = true;else if (line instanceof _MsAst.ObjEntry) isObj = true;
		};
		const lines = _plainBlockLines(lineTokens);
		for (const _ of lines) checkLine(_);

		context.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		context.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		context.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

		const kReturn = isObj ? KReturn_Obj : isBag ? KReturn_Bag : isMap ? KReturn_Map : KReturn_Plain;
		return { lines, kReturn };
	};

	const parseCase = (isVal, casedFromFun, tokens) => {
		var _beforeAndBlock3 = beforeAndBlock(tokens);

		var _beforeAndBlock32 = _slicedToArray(_beforeAndBlock3, 2);

		const before = _beforeAndBlock32[0];
		const block = _beforeAndBlock32[1];

		let opCased;
		if (casedFromFun) {
			checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.');
			opCased = null;
		} else opCased = (0, _util.opIf)(!before.isEmpty(), () => _MsAst.AssignSingle.focus(before.loc, parseExpr(before)));

		const lastLine = _Slice2.default.group(block.last());

		var _ref = (0, _Token.isKeyword)(_Token.KW_Else, lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(_Token.KW_Else, lastLine.tail())] : [block, null];

		var _ref2 = _slicedToArray(_ref, 2);

		const partLines = _ref2[0];
		const opElse = _ref2[1];

		const parts = partLines.mapSlices(line => {
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
	const _parseCaseTest = tokens => {
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

	const parseExpr = tokens => {
		return (0, _util.ifElse)(tokens.opSplitManyWhere(_ => (0, _Token.isKeyword)(_Token.KW_ObjAssign, _)), splits => {
			// Short object form, such as (a. 1, b. 2)
			const first = splits[0].before;
			checkNonEmpty(first, () => `Unexpected ${ splits[0].at.show() }`);
			const tokensCaller = first.rtail();

			const pairs = [];
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const name = splits[i].before.last();
				context.check(name instanceof _Token.Name, name.loc, () => `Expected a name, not ${ name.show() }`);
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
		}, () => parseExprPlain(tokens));
	},
	      parseExprParts = tokens => {
		const opSplit = tokens.opSplitOnceWhere(token => {
			if (token instanceof _Token.Keyword) switch (token.kind) {
				case _Token.KW_And:case _Token.KW_CaseVal:case _Token.KW_Class:case _Token.KW_ExceptVal:case _Token.KW_ForBag:
				case _Token.KW_ForVal:case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_FunGen:case _Token.KW_FunGenDo:
				case _Token.KW_FunThis:case _Token.KW_FunThisDo:case _Token.KW_FunThisGen:case _Token.KW_FunThisGenDo:
				case _Token.KW_IfVal:case _Token.KW_New:case _Token.KW_Not:case _Token.KW_Or:case _Token.KW_UnlessVal:
				case _Token.KW_Yield:case _Token.KW_YieldTo:
					return true;
				default:
					return false;
			}
			return false;
		});
		return (0, _util.ifElse)(opSplit, _ref3 => {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

			const last = () => {
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
					case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_FunGen:case _Token.KW_FunGenDo:
					case _Token.KW_FunThis:case _Token.KW_FunThisDo:case _Token.KW_FunThisGen:
					case _Token.KW_FunThisGenDo:
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
			}();
			return (0, _util.push)(before.map(parseSingle), last);
		}, () => tokens.map(parseSingle));
	},
	      parseExprPlain = tokens => {
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

	const parseFun = (kind, tokens) => {
		let isThis = false,
		    isDo = false,
		    isGen = false;
		switch (kind) {
			case _Token.KW_Fun:
				break;
			case _Token.KW_FunDo:
				isDo = true;
				break;
			case _Token.KW_FunGen:
				isGen = true;
				break;
			case _Token.KW_FunGenDo:
				isGen = true;
				isDo = true;
				break;
			case _Token.KW_FunThis:
				isThis = true;
				break;
			case _Token.KW_FunThisDo:
				isThis = true;
				isDo = true;
				break;
			case _Token.KW_FunThisGen:
				isThis = true;
				isGen = true;
				break;
			case _Token.KW_FunThisGenDo:
				isThis = true;
				isGen = true;
				isDo = true;
				break;
			default:
				throw new Error();
		}
		const opDeclareThis = (0, _util.opIf)(isThis, () => (0, _MsAst.LocalDeclareThis)(tokens.loc));

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
		const opDeclareRes = (0, _util.ifElse)(opReturnType, _ => (0, _MsAst.LocalDeclareRes)(_.loc, _), () => (0, _util.opMap)(opOut, o => (0, _MsAst.LocalDeclareRes)(o.loc, null)));
		return (0, _MsAst.Fun)(tokens.loc, opDeclareThis, isGen, args, opRestArg, block, opIn, opDeclareRes, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = tokens => {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if ((0, _Token.isGroup)(_Token.G_Space, h) && (0, _Token.isKeyword)(_Token.KW_Type, (0, _util.head)(h.subTokens))) return {
				opReturnType: parseSpaced(_Slice2.default.group(h).tail()),
				rest: tokens.tail()
			};
		}
		return { opReturnType: null, rest: tokens };
	},
	      _funArgsAndBlock = (isDo, tokens) => {
		checkNonEmpty(tokens, 'Expected an indented block.');
		const h = tokens.head();
		// Might be `|case`
		if (h instanceof _Token.Keyword && (h.kind === _Token.KW_CaseVal || h.kind === _Token.KW_CaseDo)) {
			const eCase = parseCase(h.kind === _Token.KW_CaseVal, true, tokens.tail());
			const args = [(0, _MsAst.LocalDeclareFocus)(h.loc)];
			return h.kind === _Token.KW_CaseVal ? {
				args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _MsAst.BlockWithReturn)(tokens.loc, [], eCase)
			} : {
				args, opRestArg: null, opIn: null, opOut: null,
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
			return { args, opRestArg, block, opIn, opOut };
		}
	},
	      _parseFunLocals = tokens => {
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
	      _tryTakeInOrOut = (inOrOut, tokens) => {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.headSlice();
			if ((0, _Token.isKeyword)(inOrOut, firstLine.head())) {
				const inOut = (0, _MsAst.Debug)(firstLine.loc, parseLinesFromBlock(firstLine));
				return [inOut, tokens.tail()];
			}
		}
		return [null, tokens];
	};

	const parseLine = tokens => {
		const head = tokens.head();
		const rest = tokens.tail();

		const noRest = () => checkEmpty(rest, () => `Did not expect anything after ${ head.show() }`);

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
				return (0, _MsAst.Throw)(tokens.loc, (0, _util.opIf)(!rest.isEmpty(), () => parseExpr(rest)));
			case _Token.KW_Pass:
				noRest();
				return [];
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return (0, _util.ifElse)(tokens.opSplitOnceWhere(_isLineSplitKeyword), _ref4 => {
			let before = _ref4.before;
			let at = _ref4.at;
			let after = _ref4.after;
			return _parseAssignLike(before, at, after, tokens.loc);
		}, () => parseExpr(tokens));
	},
	      parseLineOrLines = tokens => {
		const _ = parseLine(tokens);
		return _ instanceof Array ? _ : [_];
	};

	// parseLine privates
	const _isLineSplitKeyword = token => {
		if (token instanceof _Token.Keyword) switch (token.kind) {
			case _Token.KW_Assign:case _Token.KW_AssignMutable:case _Token.KW_LocalMutate:
			case _Token.KW_MapEntry:case _Token.KW_ObjAssign:case _Token.KW_Yield:case _Token.KW_YieldTo:
				return true;
			default:
				return false;
		} else return false;
	},
	      _parseAssignLike = (before, at, after, loc) => {
		if (at.kind === _Token.KW_MapEntry) return _parseMapEntry(before, after, loc);

		// TODO: This code is kind of ugly.
		if (before.size() === 1) {
			const token = before.head();
			if (token instanceof _Token.DotName) return _parseMemberSet((0, _MsAst.LocalDeclareThis)(token.loc), token.name, at, after, loc);
			if ((0, _Token.isGroup)(_Token.G_Space, token)) {
				const spaced = _Slice2.default.group(token);
				if (spaced.size() === 2) {
					const dot = spaced.second();
					if (dot instanceof _Token.DotName) {
						context.check(dot.nDots === 1, dot.loc, 'Must have only 1 `.`.');
						return _parseMemberSet(parseSingle(spaced.head()), spaced.second().name, at, after, loc);
					}
				}
			}
		}

		return at.kind === _Token.KW_LocalMutate ? _parseLocalMutate(before, after, loc) : _parseAssign(before, at, after, loc);
	},
	      _parseMemberSet = (object, name, at, after, loc) => (0, _MsAst.MemberSet)(loc, object, name, _memberSetKind(at), parseExpr(after)),
	      _memberSetKind = at => {
		switch (at.kind) {
			case _Token.KW_Assign:
				return _MsAst.MS_New;
			case _Token.KW_AssignMutable:
				return _MsAst.MS_NewMutable;
			case _Token.KW_LocalMutate:
				return _MsAst.MS_Mutate;
			default:
				throw new Error();
		}
	},
	      _parseLocalMutate = (localsTokens, valueTokens, loc) => {
		const locals = parseLocalDeclaresJustNames(localsTokens);
		context.check(locals.length === 1, loc, 'TODO: LocalDestructureMutate');
		const name = locals[0].name;
		const value = parseExpr(valueTokens);
		return (0, _MsAst.LocalMutate)(loc, name, value);
	},
	      _parseAssign = (localsTokens, assigner, valueTokens, loc) => {
		const kind = assigner.kind;
		const locals = parseLocalDeclares(localsTokens);
		const opName = (0, _util.opIf)(locals.length === 1, () => locals[0].name);
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

			const wrap = _ => isObjAssign ? (0, _MsAst.ObjEntry)(loc, _) : _;

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
	      _parseAssignValue = (kind, opName, valueTokens) => {
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
	_tryAddName = (_, name) => {
		if (_ instanceof _MsAst.Fun || _ instanceof _MsAst.Class) _.opName = name;else if (_ instanceof _MsAst.Call && _.args.length > 0) _tryAddObjName((0, _util.last)(_.args), name);else _tryAddObjName(_, name);
	},
	      _tryAddObjName = (_, name) => {
		if (_ instanceof _MsAst.BlockWrap && _.block instanceof _MsAst.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _MsAst.Fun) _.block.opObjed.opName = name;else if (!_nameObjAssignSomewhere(_.block.lines)) _.block.opName = name;
	},
	      _nameObjAssignSomewhere = lines => lines.some(line => line instanceof _MsAst.ObjEntry && line.assign.allAssignees().some(_ => _.name === 'name')),
	      _parseMapEntry = (before, after, loc) => (0, _MsAst.MapEntry)(loc, parseExpr(before), parseExpr(after));

	const parseLocalDeclaresJustNames = tokens => tokens.map(_ => (0, _MsAst.LocalDeclarePlain)(_.loc, _parseLocalName(_))),
	      parseLocalDeclares = tokens => tokens.map(parseLocalDeclare),
	      parseLocalDeclare = token => {
		if ((0, _Token.isGroup)(_Token.G_Space, token)) {
			const tokens = _Slice2.default.group(token);

			var _ref5 = (0, _Token.isKeyword)(_Token.KW_Lazy, tokens.head()) ? [tokens.tail(), true] : [tokens, false];

			var _ref52 = _slicedToArray(_ref5, 2);

			const rest = _ref52[0];
			const isLazy = _ref52[1];

			const name = _parseLocalName(rest.head());
			const rest2 = rest.tail();
			const opType = (0, _util.opIf)(!rest2.isEmpty(), () => {
				const colon = rest2.head();
				context.check((0, _Token.isKeyword)(_Token.KW_Type, colon), colon.loc, () => `Expected ${ (0, _CompileError.code)(':') }`);
				const tokensType = rest2.tail();
				checkNonEmpty(tokensType, () => `Expected something after ${ colon.show() }`);
				return parseSpaced(tokensType);
			});
			return (0, _MsAst.LocalDeclare)(token.loc, name, opType, isLazy ? _MsAst.LD_Lazy : _MsAst.LD_Const);
		} else return (0, _MsAst.LocalDeclarePlain)(token.loc, _parseLocalName(token));
	};

	// parseLocalDeclare privates
	const _parseLocalName = t => {
		if ((0, _Token.isKeyword)(_Token.KW_Focus, t)) return '_';else {
			context.check(t instanceof _Token.Name, t.loc, () => `Expected a local name, not ${ t.show() }`);
			// TODO: Allow this?
			context.check(!_language.JsGlobals.has(t.name), t.loc, () => `Can not shadow global ${ (0, _CompileError.code)(t.name) }`);
			return t.name;
		}
	};

	const parseSingle = token => {
		const loc = token.loc;

		return token instanceof _Token.Name ? _access(token.name, loc) : token instanceof _Token.Group ? () => {
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
					return (0, _MsAst.Quote)(loc, slice.map(_ => typeof _ === 'string' ? _ : parseSingle(_)));
				default:
					throw new Error(token.kind);
			}
		}() : token instanceof _MsAst.NumberLiteral ? token : token instanceof _Token.Keyword ? token.kind === _Token.KW_Focus ? _MsAst.LocalAccess.focus(loc) : (0, _util.ifElse)((0, _Token.opKeywordKindToSpecialValueKind)(token.kind), _ => (0, _MsAst.SpecialVal)(loc, _), () => unexpected(token)) : token instanceof _Token.DotName ? token.nDots === 1 ? (0, _MsAst.Member)(token.loc, (0, _MsAst.LocalAccess)(token.loc, 'this'), token.name) : token.nDots === 3 ? (0, _MsAst.Splat)(loc, (0, _MsAst.LocalAccess)(loc, token.name)) : unexpected(token) : unexpected(token);
	};

	// parseSingle privates
	const _access = (name, loc) => _language.JsGlobals.has(name) ? (0, _MsAst.GlobalAccess)(loc, name) : (0, _MsAst.LocalAccess)(loc, name);

	const parseSpaced = tokens => {
		const h = tokens.head(),
		      rest = tokens.tail();
		if ((0, _Token.isKeyword)(_Token.KW_Type, h)) {
			const eType = parseSpaced(rest);
			const focus = _MsAst.LocalAccess.focus(h.loc);
			return _MsAst.Call.contains(h.loc, eType, focus);
		} else if ((0, _Token.isKeyword)(_Token.KW_Lazy, h)) return (0, _MsAst.Lazy)(h.loc, parseSpaced(rest));else {
			// Tokens within a space group wrap previous tokens.
			const mod = (acc, token) => {
				const loc = token.loc;
				if (token instanceof _Token.DotName) {
					context.check(token.nDots === 1, loc, 'Too many dots!');
					return (0, _MsAst.Member)(loc, acc, token.name);
				} else if ((0, _Token.isKeyword)(_Token.KW_Focus, token)) return (0, _MsAst.Call)(loc, acc, [_MsAst.LocalAccess.focus(loc)]);else if (token instanceof _Token.Group) {
					if (token.kind === _Token.G_Bracket) return _MsAst.Call.sub(loc, (0, _util.unshift)(acc, parseExprParts(_Slice2.default.group(token))));
					if (token.kind === _Token.G_Parenthesis) {
						checkEmpty(_Slice2.default.group(token), () => `Use ${ (0, _CompileError.code)('(a b)') }, not ${ (0, _CompileError.code)('a(b)') }`);
						return (0, _MsAst.Call)(loc, acc, []);
					}
				} else context.fail(tokens.loc, `Expected member or sub, not ${ token.show() }`);
			};
			return rest.reduce(mod, parseSingle(h));
		}
	};

	const tryParseUses = (k, tokens) => {
		if (!tokens.isEmpty()) {
			const line0 = tokens.headSlice();
			if ((0, _Token.isKeyword)(k, line0.head())) return [_parseUses(k, line0.tail()), tokens.tail()];
		}
		return [[], tokens];
	};

	// tryParseUse privates
	const _parseUses = (useKeywordKind, tokens) => {
		var _beforeAndBlock8 = beforeAndBlock(tokens);

		var _beforeAndBlock82 = _slicedToArray(_beforeAndBlock8, 2);

		const before = _beforeAndBlock82[0];
		const lines = _beforeAndBlock82[1];

		checkEmpty(before, () => `Did not expect anything after ${ (0, _CompileError.code)(useKeywordKind) } other than a block`);
		return lines.mapSlices(line => {
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
	      _parseThingsUsed = (name, isLazy, tokens) => {
		const useDefault = () => (0, _MsAst.LocalDeclareUntyped)(tokens.loc, name, isLazy ? _MsAst.LD_Lazy : _MsAst.LD_Const);
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref6 = (0, _Token.isKeyword)(_Token.KW_Focus, tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref62 = _slicedToArray(_ref6, 2);

			const opUseDefault = _ref62[0];
			const rest = _ref62[1];

			const used = parseLocalDeclaresJustNames(rest).map(l => {
				context.check(l.name !== '_', l.pos, () => `${ (0, _CompileError.code)('_') } not allowed as import name.`);
				if (isLazy) l.kind = _MsAst.LD_Lazy;
				return l;
			});
			return { used, opUseDefault };
		}
	},
	      _parseRequire = t => {
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: (0, _util.push)(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
			context.check((0, _Token.isGroup)(_Token.G_Space, t), t.loc, 'Not a valid module name.');
			return _parseLocalRequire(_Slice2.default.group(t));
		}
	},
	      _parseLocalRequire = tokens => {
		const first = tokens.head();
		let parts;
		if (first instanceof _Token.DotName) parts = _partsFromDotName(first);else {
			context.check(first instanceof _Token.Name, first.loc, 'Not a valid part of module path.');
			parts = [];
		}
		parts.push(first.name);
		tokens.tail().each(token => {
			context.check(token instanceof _Token.DotName && token.nDots === 1, token.loc, 'Not a valid part of module path.');
			parts.push(token.name);
		});
		return { path: parts.join('/'), name: tokens.last().name };
	},
	      _partsFromDotName = dotName => dotName.nDots === 1 ? ['.'] : (0, _util.repeat)('..', dotName.nDots - 1);

	const _parseFor = ctr => tokens => {
		var _beforeAndBlock9 = beforeAndBlock(tokens);

		var _beforeAndBlock92 = _slicedToArray(_beforeAndBlock9, 2);

		const before = _beforeAndBlock92[0];
		const block = _beforeAndBlock92[1];

		return ctr(tokens.loc, _parseOpIteratee(before), parseBlockDo(block));
	},
	      _parseOpIteratee = tokens => (0, _util.opIf)(!tokens.isEmpty(), () => {
		var _ifElse = (0, _util.ifElse)(tokens.opSplitOnceWhere(_ => (0, _Token.isKeyword)(_Token.KW_In, _)), _ref7 => {
			let before = _ref7.before;
			let after = _ref7.after;

			context.check(before.size() === 1, before.loc, 'TODO: pattern in for');
			return [parseLocalDeclaresJustNames(before)[0], parseExpr(after)];
		}, () => [(0, _MsAst.LocalDeclareFocus)(tokens.loc), parseExpr(tokens)]);

		var _ifElse2 = _slicedToArray(_ifElse, 2);

		const element = _ifElse2[0];
		const bag = _ifElse2[1];

		return (0, _MsAst.Iteratee)(tokens.loc, element, bag);
	});
	const parseForDo = _parseFor(_MsAst.ForDo),
	      parseForVal = _parseFor(_MsAst.ForVal),
	     
	// TODO: -> out-type
	parseForBag = tokens => {
		var _beforeAndBlock10 = beforeAndBlock(tokens);

		var _beforeAndBlock102 = _slicedToArray(_beforeAndBlock10, 2);

		const before = _beforeAndBlock102[0];
		const lines = _beforeAndBlock102[1];

		const block = parseBlockDo(lines);
		// TODO: Better way?
		if (block.lines.length === 1 && block.lines[0] instanceof _MsAst.Val) block.lines[0] = (0, _MsAst.BagEntry)(block.lines[0].loc, block.lines[0]);
		return _MsAst.ForBag.of(tokens.loc, _parseOpIteratee(before), block);
	};

	const parseExcept = (kwExcept, tokens) => {
		const isVal = kwExcept === _Token.KW_ExceptVal,
		      justDoValBlock = isVal ? justBlockVal : justBlockDo,
		      parseBlock = isVal ? parseBlockVal : parseBlockDo,
		      Except = isVal ? _MsAst.ExceptVal : _MsAst.ExceptDo,
		      kwTry = isVal ? _Token.KW_TryVal : _Token.KW_TryDo,
		      kwCatch = isVal ? _Token.KW_CatchVal : _Token.KW_CatchDo,
		      nameTry = () => (0, _CompileError.code)((0, _Token.keywordName)(kwTry)),
		      nameCatch = () => (0, _CompileError.code)((0, _Token.keywordName)(kwCatch)),
		      nameFinally = () => (0, _CompileError.code)((0, _Token.keywordName)(_Token.KW_Finally));

		const lines = justBlock(kwExcept, tokens);

		// `try` *must* come first.
		const firstLine = lines.headSlice();
		const tokenTry = firstLine.head();
		context.check((0, _Token.isKeyword)(kwTry, tokenTry), tokenTry.loc, () => `Must start with ${ nameTry() }`);
		const _try = justDoValBlock(kwTry, firstLine.tail());

		const restLines = lines.tail();
		checkNonEmpty(restLines, () => `Must have at least one of ${ nameCatch() } or ${ nameFinally() }`);

		const handleFinally = restLines => {
			const line = restLines.headSlice();
			const tokenFinally = line.head();
			context.check((0, _Token.isKeyword)(_Token.KW_Finally, tokenFinally), tokenFinally.loc, () => `Expected ${ nameFinally() }`);
			context.check(restLines.size() === 1, restLines.loc, () => `Nothing is allowed to come after ${ nameFinally() }.`);
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
			_finally = (0, _util.opIf)(restLines.size() > 1, () => handleFinally(restLines.tail()));
		} else {
			_catch = null;
			_finally = handleFinally(restLines);
		}

		return Except(tokens.loc, _try, _catch, _finally);
	},
	      _parseOneLocalDeclareOrFocus = tokens => {
		if (tokens.isEmpty()) return (0, _MsAst.LocalDeclareFocus)(tokens.loc);else {
			context.check(tokens.size() === 1, 'Expected only one local declare.');
			return parseLocalDeclares(tokens)[0];
		}
	};

	const parseAssert = (negate, tokens) => {
		checkNonEmpty(tokens, () => `Expected something after ${ (0, _Token.keywordName)(_Token.KW_Assert) }.`);

		var _ifElse3 = (0, _util.ifElse)(tokens.opSplitOnceWhere(_ => (0, _Token.isKeyword)(_Token.KW_Throw, _)), _ref8 => {
			let before = _ref8.before;
			let after = _ref8.after;
			return [before, parseExpr(after)];
		}, () => [tokens, null]);

		var _ifElse32 = _slicedToArray(_ifElse3, 2);

		const condTokens = _ifElse32[0];
		const opThrown = _ifElse32[1];

		const parts = parseExprParts(condTokens);
		const cond = parts.length === 1 ? parts[0] : (0, _MsAst.Call)(condTokens.loc, parts[0], (0, _util.tail)(parts));
		return (0, _MsAst.Assert)(tokens.loc, negate, cond, opThrown);
	};

	const parseClass = tokens => {
		var _beforeAndBlock12 = beforeAndBlock(tokens);

		var _beforeAndBlock122 = _slicedToArray(_beforeAndBlock12, 2);

		const before = _beforeAndBlock122[0];
		const block = _beforeAndBlock122[1];

		const opExtended = (0, _util.opIf)(!before.isEmpty(), () => parseExpr(before));

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

	const _parseConstructor = tokens => {
		var _funArgsAndBlock3 = _funArgsAndBlock(true, tokens);

		const args = _funArgsAndBlock3.args;
		const opRestArg = _funArgsAndBlock3.opRestArg;
		const block = _funArgsAndBlock3.block;
		const opIn = _funArgsAndBlock3.opIn;
		const opOut = _funArgsAndBlock3.opOut;

		const isGenerator = false,
		      opDeclareRes = null;
		return (0, _MsAst.Fun)(tokens.loc, isGenerator, args, opRestArg, block, opIn, opDeclareRes, opOut, 'constructor');
	},
	      _parseStatics = tokens => {
		const block = justBlock(_Token.KW_Static, tokens);
		return _parseMethods(block);
	},
	      _parseMethods = tokens => tokens.mapSlices(_parseMethod),
	      _parseMethod = tokens => {
		const nameToken = tokens.head();

		if ((0, _Token.isKeyword)(_Token.KW_Get, nameToken) || (0, _Token.isKeyword)(_Token.KW_Set, nameToken)) context.fail(nameToken.loc, 'TODO: get/set!');

		context.check(nameToken instanceof _Token.Name, nameToken.loc, () => `Expected name, got ${ nameToken }`);
		const name = nameToken.name;

		const fun = _parseMethodFun(tokens.tail());
		(0, _util.assert)(fun.opName === null);
		fun.opName = name;
		return fun;
	},
	      _parseMethodFun = tokens => parseFun(_methodFunKind(tokens.head()), tokens.tail()),
	      _methodFunKind = funKindToken => {
		switch (funKindToken.kind) {
			case _Token.KW_Fun:
				return _Token.KW_FunThis;
			case _Token.KW_FunDo:
				return _Token.KW_FunThisDo;
			case _Token.KW_FunGen:
				return _Token.KW_FunThisGen;
			case _Token.KW_FunGenDo:
				return _Token.KW_FunThisGenDo;
			case _Token.KW_FunThis:case _Token.KW_FunThisDo:case _Token.KW_FunThisGen:case _Token.KW_FunThisGenDo:
				context.fail(funKindToken.loc, 'Function `.` is implicit for methods.');
			default:
				context.fail(funKindToken.loc, `Expected function kind, got ${ funKindToken }`);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLEtBQUksT0FBTyxDQUFBOzs7Ozs7Ozs7Ozs7O2tCQVlJLENBQUMsUUFBUSxFQUFFLFNBQVMsS0FBSztBQUN2QyxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFlBckJRLE1BQU0sRUFxQlAsV0EvQnNFLE9BQU8sU0FBNUQsT0FBTyxFQStCUCxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTs7QUFFakQsU0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEtBQUssQ0FBQTtFQUNaOztBQUVELE9BQ0MsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7T0FDckQsYUFBYSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztPQUN0RCxVQUFVLEdBQUcsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRTVFLE9BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSTs7O3NCQUVILFlBQVksUUF2Q3pCLFFBQVEsRUF1QzRCLE1BQU0sQ0FBQzs7OztRQUFoRCxNQUFNO1FBQUUsS0FBSzs7dUJBQ1EsWUFBWSxRQXpDNkMsTUFBTSxFQXlDMUMsS0FBSyxDQUFDOzs7O1FBQWhELFNBQVM7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VUFBVSxDQXdoQ25EO0FBQUEsQUFDOUIsZUF6aENxQyxRQUFRO0FBeWhDOUIsa0JBeGhDakIsWUFBWSxDQXdoQ3dCO0FBQUEsQUFDbEMsZUExaEMrQyxTQUFTO0FBMGhDeEMsa0JBemhDSixhQUFhLENBeWhDVztBQUFBLEFBQ3BDLGVBM2hDMEQsV0FBVztBQTJoQ25ELGtCQTFoQ1MsZUFBZSxDQTBoQ0Y7QUFBQSxBQUN4QyxlQTVoQ3VFLFVBQVUsQ0E0aENqRSxBQUFDLFlBM2hDbkIsWUFBWSxDQTJoQ3lCLEFBQUMsWUEzaEN4QixhQUFhLENBMmhDOEIsQUFBQyxZQTNoQzdCLGVBQWU7QUE0aEN6QyxXQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsdUNBQXVDLENBQUMsQ0FBQTtBQUFBLEFBQ3hFO0FBQ0MsV0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsNEJBQTRCLEdBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBQUEsR0FDOUU7RUFDRCxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NlcnQsIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25TaW5nbGUsIEJhZ0VudHJ5LCBCYWdFbnRyeU1hbnksIEJhZ1NpbXBsZSwgQmxvY2tCYWcsXG5cdEJsb2NrRG8sIEJsb2NrTWFwLCBCbG9ja09iaiwgQmxvY2tWYWxUaHJvdywgQmxvY2tXaXRoUmV0dXJuLCBCbG9ja1dyYXAsIEJyZWFrRG8sIEJyZWFrVmFsLFxuXHRDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCwgQ2FzZURvLCBDYXNlVmFsLCBDYXRjaCwgQ2xhc3MsIENvbmRpdGlvbmFsRG8sIENvbmRpdGlvbmFsVmFsLFxuXHRDb250aW51ZSwgRGVidWcsIEl0ZXJhdGVlLCBOdW1iZXJMaXRlcmFsLCBFeGNlcHREbywgRXhjZXB0VmFsLCBGb3JCYWcsIEZvckRvLCBGb3JWYWwsIEZ1bixcblx0R2xvYmFsQWNjZXNzLCBMX0FuZCwgTF9PciwgTGF6eSwgTERfQ29uc3QsIExEX0xhenksIExEX011dGFibGUsIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsXG5cdExvY2FsRGVjbGFyZUZvY3VzLCBMb2NhbERlY2xhcmVOYW1lLCBMb2NhbERlY2xhcmVQbGFpbiwgTG9jYWxEZWNsYXJlUmVzLCBMb2NhbERlY2xhcmVUaGlzLFxuXHRMb2NhbERlY2xhcmVVbnR5cGVkLCBMb2NhbE11dGF0ZSwgTG9naWMsIE1hcEVudHJ5LCBNZW1iZXIsIE1lbWJlclNldCwgTW9kdWxlLCBNU19NdXRhdGUsXG5cdE1TX05ldywgTVNfTmV3TXV0YWJsZSwgTmV3LCBOb3QsIE9iakVudHJ5LCBPYmpQYWlyLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTUF9EZWJ1Z2dlcixcblx0U3BlY2lhbERvLCBTcGVjaWFsVmFsLCBTVl9OdWxsLCBTcGxhdCwgVGhyb3csIFZhbCwgVXNlLCBVc2VEbywgWWllbGQsIFlpZWxkVG9cblx0fSBmcm9tICcuLi8uLi9Nc0FzdCdcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL2xhbmd1YWdlJ1xuaW1wb3J0IHsgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19QYXJlbnRoZXNpcywgR19TcGFjZSwgR19RdW90ZSwgaXNHcm91cCwgaXNLZXl3b3JkLFxuXHRLZXl3b3JkLCBLV19BbmQsIEtXX0Fzc2VydCwgS1dfQXNzZXJ0Tm90LCBLV19Bc3NpZ24sIEtXX0Fzc2lnbk11dGFibGUsIEtXX0JyZWFrRG8sIEtXX0JyZWFrVmFsLFxuXHRLV19DYXNlVmFsLCBLV19DYXNlRG8sIEtXX0NsYXNzLCBLV19DYXRjaERvLCBLV19DYXRjaFZhbCwgS1dfQ29uc3RydWN0LCBLV19Db250aW51ZSxcblx0S1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbGxpcHNpcywgS1dfRWxzZSwgS1dfRXhjZXB0RG8sIEtXX0V4Y2VwdFZhbCwgS1dfRmluYWxseSwgS1dfRm9yQmFnLFxuXHRLV19Gb3JEbywgS1dfRm9yVmFsLCBLV19Gb2N1cywgS1dfRnVuLCBLV19GdW5EbywgS1dfRnVuR2VuLCBLV19GdW5HZW5EbywgS1dfRnVuVGhpcyxcblx0S1dfRnVuVGhpc0RvLCBLV19GdW5UaGlzR2VuLCBLV19GdW5UaGlzR2VuRG8sIEtXX0dldCwgS1dfSWZEbywgS1dfSWZWYWwsIEtXX0luLCBLV19MYXp5LFxuXHRLV19Mb2NhbE11dGF0ZSwgS1dfTWFwRW50cnksIEtXX05ldywgS1dfTm90LCBLV19PYmpBc3NpZ24sIEtXX09yLCBLV19QYXNzLCBLV19PdXQsIEtXX1JlZ2lvbixcblx0S1dfU2V0LCBLV19TdGF0aWMsIEtXX1Rocm93LCBLV19UcnlEbywgS1dfVHJ5VmFsLCBLV19UeXBlLCBLV19Vbmxlc3NEbywgS1dfVW5sZXNzVmFsLCBLV19Vc2UsXG5cdEtXX1VzZURlYnVnLCBLV19Vc2VEbywgS1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8sIE5hbWUsIGtleXdvcmROYW1lLFxuXHRvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBhc3NlcnQsIGhlYWQsIGlmRWxzZSwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCxcblx0b3BJZiwgb3BNYXAsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbi8vIFNpbmNlIHRoZXJlIGFyZSBzbyBtYW55IHBhcnNpbmcgZnVuY3Rpb25zLFxuLy8gaXQncyBmYXN0ZXIgKGFzIG9mIG5vZGUgdjAuMTEuMTQpIHRvIGhhdmUgdGhlbSBhbGwgY2xvc2Ugb3ZlciB0aGlzIG11dGFibGUgdmFyaWFibGUgb25jZVxuLy8gdGhhbiB0byBjbG9zZSBvdmVyIHRoZSBwYXJhbWV0ZXIgKGFzIGluIGxleC5qcywgd2hlcmUgdGhhdCdzIG11Y2ggZmFzdGVyKS5cbmxldCBjb250ZXh0XG5cbi8qXG5UaGlzIGNvbnZlcnRzIGEgVG9rZW4gdHJlZSB0byBhIE1zQXN0LlxuVGhpcyBpcyBhIHJlY3Vyc2l2ZS1kZXNjZW50IHBhcnNlciwgbWFkZSBlYXNpZXIgYnkgdHdvIGZhY3RzOlxuXHQqIFdlIGhhdmUgYWxyZWFkeSBncm91cGVkIHRva2Vucy5cblx0KiBNb3N0IG9mIHRoZSB0aW1lLCBhbiBhc3QncyB0eXBlIGlzIGRldGVybWluZWQgYnkgdGhlIGZpcnN0IHRva2VuLlxuXG5UaGVyZSBhcmUgZXhjZXB0aW9ucyBzdWNoIGFzIGFzc2lnbm1lbnQgc3RhdGVtZW50cyAoaW5kaWNhdGVkIGJ5IGEgYD1gIHNvbWV3aGVyZSBpbiB0aGUgbWlkZGxlKS5cbkZvciB0aG9zZSB3ZSBtdXN0IGl0ZXJhdGUgdGhyb3VnaCB0b2tlbnMgYW5kIHNwbGl0LlxuKFNlZSBTbGljZS5vcFNwbGl0T25jZVdoZXJlIGFuZCBTbGljZS5vcFNwbGl0TWFueVdoZXJlLilcbiovXG5leHBvcnQgZGVmYXVsdCAoX2NvbnRleHQsIHJvb3RUb2tlbikgPT4ge1xuXHRjb250ZXh0ID0gX2NvbnRleHRcblx0YXNzZXJ0KGlzR3JvdXAoR19CbG9jaywgcm9vdFRva2VuKSlcblx0Y29uc3QgbXNBc3QgPSBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25zLlxuXHRjb250ZXh0ID0gdW5kZWZpbmVkXG5cdHJldHVybiBtc0FzdFxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHRjaGVja05vbkVtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjb250ZXh0LmNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0dW5leHBlY3RlZCA9IHRva2VuID0+IGNvbnRleHQuZmFpbCh0b2tlbi5sb2MsIGBVbmV4cGVjdGVkICR7dG9rZW4uc2hvdygpfWApXG5cbmNvbnN0IHBhcnNlTW9kdWxlID0gdG9rZW5zID0+IHtcblx0Ly8gVXNlIHN0YXRlbWVudHMgbXVzdCBhcHBlYXIgaW4gb3JkZXIuXG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURvLCB0b2tlbnMpXG5cdGNvbnN0IFsgcGxhaW5Vc2VzLCByZXN0MSBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZSwgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlTGF6eSwgcmVzdDEpXG5cdGNvbnN0IFsgZGVidWdVc2VzLCByZXN0MyBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURlYnVnLCByZXN0Milcblx0Y29uc3QgeyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH0gPSBwYXJzZU1vZHVsZUJsb2NrKHJlc3QzKVxuXG5cdGlmIChjb250ZXh0Lm9wdHMuaW5jbHVkZU1vZHVsZU5hbWUoKSAmJiAhZXhwb3J0cy5zb21lKF8gPT4gXy5uYW1lID09PSAnbmFtZScpKSB7XG5cdFx0Y29uc3QgbmFtZSA9IExvY2FsRGVjbGFyZU5hbWUodG9rZW5zLmxvYylcblx0XHRsaW5lcy5wdXNoKEFzc2lnblNpbmdsZSh0b2tlbnMubG9jLCBuYW1lLFxuXHRcdFx0UXVvdGUuZm9yU3RyaW5nKHRva2Vucy5sb2MsIGNvbnRleHQub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2gobmFtZSlcblx0fVxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydClcbn1cblxuLy8gcGFyc2VCbG9ja1xuY29uc3Rcblx0Ly8gVG9rZW5zIG9uIHRoZSBsaW5lIGJlZm9yZSBhIGJsb2NrLCBhbmQgdG9rZW5zIGZvciB0aGUgYmxvY2sgaXRzZWxmLlxuXHRiZWZvcmVBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdGNvbnRleHQuY2hlY2soaXNHcm91cChHX0Jsb2NrLCBibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0cmV0dXJuIFsgdG9rZW5zLnJ0YWlsKCksIFNsaWNlLmdyb3VwKGJsb2NrKSBdXG5cdH0sXG5cblx0YmxvY2tXcmFwID0gdG9rZW5zID0+IEJsb2NrV3JhcCh0b2tlbnMubG9jLCBwYXJzZUJsb2NrVmFsKHRva2VucykpLFxuXG5cdGp1c3RCbG9jayA9IChrZXl3b3JkLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5cblx0XHRcdGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBiZXR3ZWVuICR7Y29kZShrZXl3b3JkTmFtZShrZXl3b3JkKSl9IGFuZCBibG9jay5gKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXHRqdXN0QmxvY2tEbyA9IChrZXl3b3JkLCB0b2tlbnMpID0+XG5cdFx0cGFyc2VCbG9ja0RvKGp1c3RCbG9jayhrZXl3b3JkLCB0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gKGtleXdvcmQsIHRva2VucykgPT5cblx0XHRwYXJzZUJsb2NrVmFsKGp1c3RCbG9jayhrZXl3b3JkLCB0b2tlbnMpKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnRleHQuY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtoLnNob3coKX1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgaXNHcm91cChHX0Jsb2NrLCBibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2suc3ViVG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tEbyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgbGluZXMgPSBfcGxhaW5CbG9ja0xpbmVzKHRva2Vucylcblx0XHRyZXR1cm4gQmxvY2tEbyh0b2tlbnMubG9jLCBsaW5lcylcblx0fSxcblxuXHRwYXJzZUJsb2NrVmFsID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6XG5cdFx0XHRcdHJldHVybiBCbG9ja0JhZy5vZih0b2tlbnMubG9jLCBsaW5lcylcblx0XHRcdGNhc2UgS1JldHVybl9NYXA6XG5cdFx0XHRcdHJldHVybiBCbG9ja01hcC5vZih0b2tlbnMubG9jLCBsaW5lcylcblx0XHRcdGNhc2UgS1JldHVybl9PYmo6XG5cdFx0XHRcdGNvbnN0IFsgZG9MaW5lcywgb3BWYWwgXSA9IF90cnlUYWtlTGFzdFZhbChsaW5lcylcblx0XHRcdFx0Ly8gb3BOYW1lIHdyaXR0ZW4gdG8gYnkgX3RyeUFkZE5hbWUuXG5cdFx0XHRcdHJldHVybiBCbG9ja09iai5vZih0b2tlbnMubG9jLCBkb0xpbmVzLCBvcFZhbCwgbnVsbClcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayghaXNFbXB0eShsaW5lcyksIHRva2Vucy5sb2MsICdWYWx1ZSBibG9jayBtdXN0IGVuZCBpbiBhIHZhbHVlLicpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IGxhc3QobGluZXMpXG5cdFx0XHRcdGlmICh2YWwgaW5zdGFuY2VvZiBUaHJvdylcblx0XHRcdFx0XHRyZXR1cm4gQmxvY2tWYWxUaHJvdyh0b2tlbnMubG9jLCBydGFpbChsaW5lcyksIHZhbClcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayh2YWwgaW5zdGFuY2VvZiBWYWwsIHZhbC5sb2MsICdWYWx1ZSBibG9jayBtdXN0IGVuZCBpbiBhIHZhbHVlLicpXG5cdFx0XHRcdFx0cmV0dXJuIEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBydGFpbChsaW5lcyksIHZhbClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwYXJzZU1vZHVsZUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjb25zdCBsb2MgPSB0b2tlbnMubG9jXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOiBjYXNlIEtSZXR1cm5fTWFwOiB7XG5cdFx0XHRcdGNvbnN0IGJsb2NrID0gKGtSZXR1cm4gPT09IEtSZXR1cm5fQmFnID8gQmxvY2tCYWcgOiBCbG9ja01hcCkub2YobG9jLCBsaW5lcylcblx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IFsgXSwgZXhwb3J0czogWyBdLCBvcERlZmF1bHRFeHBvcnQ6IEJsb2NrV3JhcChsb2MsIGJsb2NrKSB9XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGNvbnN0IGV4cG9ydHMgPSBbIF1cblx0XHRcdFx0bGV0IG9wRGVmYXVsdEV4cG9ydCA9IG51bGxcblx0XHRcdFx0Y29uc3QgbW9kdWxlTmFtZSA9IGNvbnRleHQub3B0cy5tb2R1bGVOYW1lKClcblxuXHRcdFx0XHQvLyBNb2R1bGUgZXhwb3J0cyBsb29rIGxpa2UgYSBCbG9ja09iaiwgIGJ1dCBhcmUgcmVhbGx5IGRpZmZlcmVudC5cblx0XHRcdFx0Ly8gSW4gRVM2LCBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIGNvbXBsZXRlbHkgc3RhdGljLlxuXHRcdFx0XHQvLyBTbyB3ZSBrZWVwIGFuIGFycmF5IG9mIGV4cG9ydHMgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIE1vZHVsZSBhc3QuXG5cdFx0XHRcdC8vIElmIHlvdSB3cml0ZTpcblx0XHRcdFx0Ly9cdGlmISBjb25kXG5cdFx0XHRcdC8vXHRcdGEuIGJcblx0XHRcdFx0Ly8gaW4gYSBtb2R1bGUgY29udGV4dCwgaXQgd2lsbCBiZSBhbiBlcnJvci4gKFRoZSBtb2R1bGUgY3JlYXRlcyBubyBgYnVpbHRgIGxvY2FsLilcblx0XHRcdFx0Y29uc3QgZ2V0TGluZUV4cG9ydHMgPSBsaW5lID0+IHtcblx0XHRcdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIE9iakVudHJ5KSB7XG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZS5hc3NpZ24uYWxsQXNzaWduZWVzKCkpXG5cdFx0XHRcdFx0XHRcdGlmIChfLm5hbWUgPT09IG1vZHVsZU5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKG9wRGVmYXVsdEV4cG9ydCA9PT0gbnVsbCwgXy5sb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRgRGVmYXVsdCBleHBvcnQgYWxyZWFkeSBkZWNsYXJlZCBhdCAke29wRGVmYXVsdEV4cG9ydC5sb2N9YClcblx0XHRcdFx0XHRcdFx0XHRvcERlZmF1bHRFeHBvcnQgPSBMb2NhbEFjY2VzcyhfLmxvYywgXy5uYW1lKVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRleHBvcnRzLnB1c2goXylcblx0XHRcdFx0XHRcdHJldHVybiBsaW5lLmFzc2lnblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRcdFx0bGluZS5saW5lcyA9IGxpbmUubGluZXMubWFwKGdldExpbmVFeHBvcnRzKVxuXHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBtb2R1bGVMaW5lcyA9IGxpbmVzLm1hcChnZXRMaW5lRXhwb3J0cylcblxuXHRcdFx0XHRpZiAoaXNFbXB0eShleHBvcnRzKSAmJiBvcERlZmF1bHRFeHBvcnQgPT09IG51bGwpIHtcblx0XHRcdFx0XHRjb25zdCBbIGxpbmVzLCBvcERlZmF1bHRFeHBvcnQgXSA9IF90cnlUYWtlTGFzdFZhbChtb2R1bGVMaW5lcylcblx0XHRcdFx0XHRyZXR1cm4geyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH1cblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IG1vZHVsZUxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZUxhc3RWYWwgPSBsaW5lcyA9PlxuXHRcdCghaXNFbXB0eShsaW5lcykgJiYgbGFzdChsaW5lcykgaW5zdGFuY2VvZiBWYWwpID9cblx0XHRcdFsgcnRhaWwobGluZXMpLCBsYXN0KGxpbmVzKSBdIDpcblx0XHRcdFsgbGluZXMsIG51bGwgXSxcblxuXHRfcGxhaW5CbG9ja0xpbmVzID0gbGluZVRva2VucyA9PiB7XG5cdFx0Y29uc3QgbGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZSlcblx0XHRcdFx0XHRhZGRMaW5lKF8pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxpbmVzLnB1c2gobGluZSlcblx0XHR9XG5cdFx0bGluZVRva2Vucy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblx0XHRyZXR1cm4gbGluZXNcblx0fSxcblxuXHRLUmV0dXJuX1BsYWluID0gMCxcblx0S1JldHVybl9PYmogPSAxLFxuXHRLUmV0dXJuX0JhZyA9IDIsXG5cdEtSZXR1cm5fTWFwID0gMyxcblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVUb2tlbnMgPT4ge1xuXHRcdGxldCBpc0JhZyA9IGZhbHNlLCBpc01hcCA9IGZhbHNlLCBpc09iaiA9IGZhbHNlXG5cdFx0Y29uc3QgY2hlY2tMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZS5saW5lcylcblx0XHRcdFx0XHRjaGVja0xpbmUoXylcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBCYWdFbnRyeSlcblx0XHRcdFx0aXNCYWcgPSB0cnVlXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpXG5cdFx0XHRcdGlzTWFwID0gdHJ1ZVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIE9iakVudHJ5KVxuXHRcdFx0XHRpc09iaiA9IHRydWVcblx0XHR9XG5cdFx0Y29uc3QgbGluZXMgPSBfcGxhaW5CbG9ja0xpbmVzKGxpbmVUb2tlbnMpXG5cdFx0Zm9yIChjb25zdCBfIG9mIGxpbmVzKVxuXHRcdFx0Y2hlY2tMaW5lKF8pXG5cblx0XHRjb250ZXh0LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGNvbnRleHQuY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y29udGV4dC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGxpbmVzLCBrUmV0dXJuIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaXNWYWwsIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IG51bGxcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnblNpbmdsZS5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IGlzS2V5d29yZChLV19FbHNlLCBsYXN0TGluZS5oZWFkKCkpID9cblx0XHRbIGJsb2NrLnJ0YWlsKCksIChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShLV19FbHNlLCBsYXN0TGluZS50YWlsKCkpIF0gOlxuXHRcdFsgYmxvY2ssIG51bGwgXVxuXG5cdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcFNsaWNlcyhsaW5lID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUpXG5cdFx0Y29uc3QgdGVzdCA9IF9wYXJzZUNhc2VUZXN0KGJlZm9yZSlcblx0XHRjb25zdCByZXN1bHQgPSAoaXNWYWwgPyBwYXJzZUJsb2NrVmFsIDogcGFyc2VCbG9ja0RvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjb250ZXh0LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfT2JqQXNzaWduLCBfKSksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkoZmlyc3QsICgpID0+IGBVbmV4cGVjdGVkICR7c3BsaXRzWzBdLmF0LnNob3coKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbIF1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgRXhwZWN0ZWQgYSBuYW1lLCBub3QgJHtuYW1lLnNob3coKX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3BTcGxpdCA9IHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKHRva2VuID0+IHtcblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX0Nhc2VWYWw6IGNhc2UgS1dfQ2xhc3M6IGNhc2UgS1dfRXhjZXB0VmFsOiBjYXNlIEtXX0ZvckJhZzpcblx0XHRcdFx0XHRjYXNlIEtXX0ZvclZhbDogY2FzZSBLV19GdW46IGNhc2UgS1dfRnVuRG86IGNhc2UgS1dfRnVuR2VuOiBjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0XHRcdGNhc2UgS1dfRnVuVGhpczogY2FzZSBLV19GdW5UaGlzRG86IGNhc2UgS1dfRnVuVGhpc0dlbjogY2FzZSBLV19GdW5UaGlzR2VuRG86XG5cdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19OZXc6IGNhc2UgS1dfTm90OiBjYXNlIEtXX09yOiBjYXNlIEtXX1VubGVzc1ZhbDpcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOiBjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fSlcblx0XHRyZXR1cm4gaWZFbHNlKG9wU3BsaXQsXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxhc3QgPSAoKCkgPT4ge1xuXHRcdFx0XHRcdHN3aXRjaCAoYXQua2luZCkge1xuXHRcdFx0XHRcdFx0Y2FzZSBLV19BbmQ6IGNhc2UgS1dfT3I6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBMb2dpYyhhdC5sb2MsIGF0LmtpbmQgPT09IEtXX0FuZCA/IExfQW5kIDogTF9Pcixcblx0XHRcdFx0XHRcdFx0XHRwYXJzZUV4cHJQYXJ0cyhhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Nhc2VWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UodHJ1ZSwgZmFsc2UsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19DbGFzczpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlQ2xhc3MoYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0V4Y2VwdFZhbDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRXhjZXB0KEtXX0V4Y2VwdFZhbCwgYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0ZvckJhZzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRm9yQmFnKGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Gb3JWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZvclZhbChhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0Z1bkRvOiBjYXNlIEtXX0Z1bkdlbjogY2FzZSBLV19GdW5HZW5Ebzpcblx0XHRcdFx0XHRcdGNhc2UgS1dfRnVuVGhpczogY2FzZSBLV19GdW5UaGlzRG86IGNhc2UgS1dfRnVuVGhpc0dlbjpcblx0XHRcdFx0XHRcdGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGdW4oYXQua2luZCwgYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0lmVmFsOiBjYXNlIEtXX1VubGVzc1ZhbDoge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGFmdGVyKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gQ29uZGl0aW9uYWxWYWwodG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0XHRwYXJzZUV4cHIoYmVmb3JlKSxcblx0XHRcdFx0XHRcdFx0XHRwYXJzZUJsb2NrVmFsKGJsb2NrKSxcblx0XHRcdFx0XHRcdFx0XHRhdC5raW5kID09PSBLV19Vbmxlc3NWYWwpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIEtXX05ldzoge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKGFmdGVyKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTmV3KGF0LmxvYywgcGFydHNbMF0sIHRhaWwocGFydHMpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Ob3Q6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBOb3QoYXQubG9jLCBwYXJzZUV4cHIoYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFlpZWxkKGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFlpZWxkVG8oYXQubG9jLCBwYXJzZUV4cHIoYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGF0LmtpbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSgpXG5cdFx0XHRcdHJldHVybiBwdXNoKGJlZm9yZS5tYXAocGFyc2VTaW5nbGUpLCBsYXN0KVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHRva2Vucy5tYXAocGFyc2VTaW5nbGUpKVxuXHR9LFxuXG5cdHBhcnNlRXhwclBsYWluID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vucylcblx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0LmZhaWwodG9rZW5zLmxvYywgJ0V4cGVjdGVkIGFuIGV4cHJlc3Npb24sIGdvdCBub3RoaW5nLicpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChraW5kLCB0b2tlbnMpID0+IHtcblx0bGV0IGlzVGhpcyA9IGZhbHNlLCBpc0RvID0gZmFsc2UsIGlzR2VuID0gZmFsc2Vcblx0c3dpdGNoIChraW5kKSB7XG5cdFx0Y2FzZSBLV19GdW46XG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuRG86XG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1bkdlbjpcblx0XHRcdGlzR2VuID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1blRoaXM6XG5cdFx0XHRpc1RoaXMgPSB0cnVlXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuVGhpc0RvOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNEbyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBLV19GdW5UaGlzR2VuOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoKVxuXHR9XG5cdGNvbnN0IG9wRGVjbGFyZVRoaXMgPSBvcElmKGlzVGhpcywgKCkgPT4gTG9jYWxEZWNsYXJlVGhpcyh0b2tlbnMubG9jKSlcblxuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhpc0RvLCByZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BEZWNsYXJlUmVzID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgb3BEZWNsYXJlVGhpcywgaXNHZW4sIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wRGVjbGFyZVJlcywgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGgpICYmIGlzS2V5d29yZChLV19UeXBlLCBoZWFkKGguc3ViVG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IChpc0RvLCB0b2tlbnMpID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2VWYWwgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQgPT09IEtXX0Nhc2VWYWwsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmVGb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZVZhbCA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2tMaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKVxuXHRcdFx0XHRpZiAoIWFyZy5pc0xhenkoKSlcblx0XHRcdFx0XHRhcmcua2luZCA9IExEX011dGFibGVcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2tMaW5lcylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdGNvbnN0IGJsb2NrID0gKGlzRG8gPyBwYXJzZUJsb2NrRG8gOiBwYXJzZUJsb2NrVmFsKShyZXN0MSlcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogTG9jYWxEZWNsYXJlUGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWRTbGljZSgpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKGluT3JPdXQsIGZpcnN0TGluZS5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKGZpcnN0TGluZSkpXG5cdFx0XHRcdHJldHVybiBbIGluT3V0LCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgbnVsbCwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGhlYWQgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdGNvbnN0IG5vUmVzdCA9ICgpID0+XG5cdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2hlYWQuc2hvdygpfWApXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoZWFkIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaGVhZC5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQXNzZXJ0OiBjYXNlIEtXX0Fzc2VydE5vdDpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VBc3NlcnQoaGVhZC5raW5kID09PSBLV19Bc3NlcnROb3QsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRXhjZXB0RG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlRXhjZXB0KEtXX0V4Y2VwdERvLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0JyZWFrRG86XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gQnJlYWtEbyh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0JyZWFrVmFsOlxuXHRcdFx0XHRcdHJldHVybiBCcmVha1ZhbCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoZmFsc2UsIGZhbHNlLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0NvbnRpbnVlOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIENvbnRpbnVlKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRpc0dyb3VwKEdfQmxvY2ssIHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbERvKHRva2Vucy5sb2MsIFNQX0RlYnVnZ2VyKVxuXHRcdFx0XHRjYXNlIEtXX0VsbGlwc2lzOlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeU1hbnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0ZvckRvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUZvckRvKHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfSWZEbzogY2FzZSBLV19Vbmxlc3NEbzoge1xuXHRcdFx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2socmVzdClcblx0XHRcdFx0XHRyZXR1cm4gQ29uZGl0aW9uYWxEbyh0b2tlbnMubG9jLFxuXHRcdFx0XHRcdFx0cGFyc2VFeHByKGJlZm9yZSksXG5cdFx0XHRcdFx0XHRwYXJzZUJsb2NrRG8oYmxvY2spLFxuXHRcdFx0XHRcdFx0aGVhZC5raW5kID09PSBLV19Vbmxlc3NEbylcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHRyZXR1cm4gQmFnRW50cnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1Rocm93OlxuXHRcdFx0XHRcdHJldHVybiBUaHJvdyh0b2tlbnMubG9jLCBvcElmKCFyZXN0LmlzRW1wdHkoKSwgKCkgPT4gcGFyc2VFeHByKHJlc3QpKSlcblx0XHRcdFx0Y2FzZSBLV19QYXNzOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFsgXVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF9pc0xpbmVTcGxpdEtleXdvcmQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4gX3BhcnNlQXNzaWduTGlrZShiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYyksXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfaXNMaW5lU3BsaXRLZXl3b3JkID0gdG9rZW4gPT4ge1xuXHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19Bc3NpZ246IGNhc2UgS1dfQXNzaWduTXV0YWJsZTogY2FzZSBLV19Mb2NhbE11dGF0ZTpcblx0XHRcdFx0Y2FzZSBLV19NYXBFbnRyeTogY2FzZSBLV19PYmpBc3NpZ246IGNhc2UgS1dfWWllbGQ6IGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnbkxpa2UgPSAoYmVmb3JlLCBhdCwgYWZ0ZXIsIGxvYykgPT4ge1xuXHRcdGlmIChhdC5raW5kID09PSBLV19NYXBFbnRyeSlcblx0XHRcdHJldHVybiBfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCBsb2MpXG5cblx0XHQvLyBUT0RPOiBUaGlzIGNvZGUgaXMga2luZCBvZiB1Z2x5LlxuXHRcdGlmIChiZWZvcmUuc2l6ZSgpID09PSAxKSB7XG5cdFx0XHRjb25zdCB0b2tlbiA9IGJlZm9yZS5oZWFkKClcblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRcdHJldHVybiBfcGFyc2VNZW1iZXJTZXQoXHRMb2NhbERlY2xhcmVUaGlzKHRva2VuLmxvYyksIHRva2VuLm5hbWUsIGF0LCBhZnRlciwgbG9jKVxuXHRcdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgdG9rZW4pKSB7XG5cdFx0XHRcdGNvbnN0IHNwYWNlZCA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0XHRpZiAoc3BhY2VkLnNpemUoKSA9PT0gMikge1xuXHRcdFx0XHRcdGNvbnN0IGRvdCA9IHNwYWNlZC5zZWNvbmQoKVxuXHRcdFx0XHRcdGlmIChkb3QgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGRvdC5uRG90cyA9PT0gMSwgZG90LmxvYywgJ011c3QgaGF2ZSBvbmx5IDEgYC5gLicpXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3BhcnNlTWVtYmVyU2V0KFxuXHRcdFx0XHRcdFx0XHRwYXJzZVNpbmdsZShzcGFjZWQuaGVhZCgpKSwgc3BhY2VkLnNlY29uZCgpLm5hbWUsIGF0LCBhZnRlciwgbG9jKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBhdC5raW5kID09PSBLV19Mb2NhbE11dGF0ZSA/XG5cdFx0XHRfcGFyc2VMb2NhbE11dGF0ZShiZWZvcmUsIGFmdGVyLCBsb2MpIDpcblx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlciwgbG9jKVxuXHR9LFxuXG5cdF9wYXJzZU1lbWJlclNldCA9IChvYmplY3QsIG5hbWUsIGF0LCBhZnRlciwgbG9jKSA9PlxuXHRcdE1lbWJlclNldChsb2MsIG9iamVjdCwgbmFtZSwgX21lbWJlclNldEtpbmQoYXQpLCBwYXJzZUV4cHIoYWZ0ZXIpKSxcblx0X21lbWJlclNldEtpbmQgPSBhdCA9PiB7XG5cdFx0c3dpdGNoIChhdC5raW5kKSB7XG5cdFx0XHRjYXNlIEtXX0Fzc2lnbjogcmV0dXJuIE1TX05ld1xuXHRcdFx0Y2FzZSBLV19Bc3NpZ25NdXRhYmxlOiByZXR1cm4gTVNfTmV3TXV0YWJsZVxuXHRcdFx0Y2FzZSBLV19Mb2NhbE11dGF0ZTogcmV0dXJuIE1TX011dGF0ZVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKClcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxNdXRhdGUgPSAobG9jYWxzVG9rZW5zLCB2YWx1ZVRva2VucywgbG9jKSA9PiB7XG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb250ZXh0LmNoZWNrKGxvY2Fscy5sZW5ndGggPT09IDEsIGxvYywgJ1RPRE86IExvY2FsRGVzdHJ1Y3R1cmVNdXRhdGUnKVxuXHRcdGNvbnN0IG5hbWUgPSBsb2NhbHNbMF0ubmFtZVxuXHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdHJldHVybiBMb2NhbE11dGF0ZShsb2MsIG5hbWUsIHZhbHVlKVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnbiA9IChsb2NhbHNUb2tlbnMsIGFzc2lnbmVyLCB2YWx1ZVRva2VucywgbG9jKSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IGFzc2lnbmVyLmtpbmRcblx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMobG9jYWxzVG9rZW5zKVxuXHRcdGNvbnN0IG9wTmFtZSA9IG9wSWYobG9jYWxzLmxlbmd0aCA9PT0gMSwgKCkgPT4gbG9jYWxzWzBdLm5hbWUpXG5cdFx0Y29uc3QgdmFsdWUgPSBfcGFyc2VBc3NpZ25WYWx1ZShraW5kLCBvcE5hbWUsIHZhbHVlVG9rZW5zKVxuXG5cdFx0Y29uc3QgaXNZaWVsZCA9IGtpbmQgPT09IEtXX1lpZWxkIHx8IGtpbmQgPT09IEtXX1lpZWxkVG9cblx0XHRpZiAoaXNFbXB0eShsb2NhbHMpKSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzWWllbGQsIGxvY2Fsc1Rva2Vucy5sb2MsICdBc3NpZ25tZW50IHRvIG5vdGhpbmcnKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpc1lpZWxkKVxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbG9jYWxzKVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIV8uaXNMYXp5KCksIF8ubG9jLCAnQ2FuIG5vdCB5aWVsZCB0byBsYXp5IHZhcmlhYmxlLicpXG5cblx0XHRcdGNvbnN0IGlzT2JqQXNzaWduID0ga2luZCA9PT0gS1dfT2JqQXNzaWduXG5cblx0XHRcdGlmIChraW5kID09PSBLV19Bc3NpZ25NdXRhYmxlKVxuXHRcdFx0XHRmb3IgKGxldCBfIG9mIGxvY2Fscykge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIV8uaXNMYXp5KCksIF8ubG9jLCAnTGF6eSBsb2NhbCBjYW4gbm90IGJlIG11dGFibGUuJylcblx0XHRcdFx0XHRfLmtpbmQgPSBMRF9NdXRhYmxlXG5cdFx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgd3JhcCA9IF8gPT4gaXNPYmpBc3NpZ24gPyBPYmpFbnRyeShsb2MsIF8pIDogX1xuXG5cdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBhc3NpZ25lZSA9IGxvY2Fsc1swXVxuXHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ25TaW5nbGUobG9jLCBhc3NpZ25lZSwgdmFsdWUpXG5cdFx0XHRcdGNvbnN0IGlzVGVzdCA9IGlzT2JqQXNzaWduICYmIGFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0XHRyZXR1cm4gaXNUZXN0ID8gRGVidWcobG9jLCBbIHdyYXAoYXNzaWduKSBdKSA6IHdyYXAoYXNzaWduKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3Qga2luZCA9IGxvY2Fsc1swXS5raW5kXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsb2NhbHMpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhfLmtpbmQgPT09IGtpbmQsIF8ubG9jLFxuXHRcdFx0XHRcdFx0J0FsbCBsb2NhbHMgb2YgZGVzdHJ1Y3R1cmluZyBhc3NpZ25tZW50IG11c3QgYmUgb2YgdGhlIHNhbWUga2luZC4nKVxuXHRcdFx0XHRyZXR1cm4gd3JhcChBc3NpZ25EZXN0cnVjdHVyZShsb2MsIGxvY2FscywgdmFsdWUsIGtpbmQpKVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VBc3NpZ25WYWx1ZSA9IChraW5kLCBvcE5hbWUsIHZhbHVlVG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSB2YWx1ZVRva2Vucy5pc0VtcHR5KCkgJiYga2luZCA9PT0gS1dfT2JqQXNzaWduID9cblx0XHRcdFNwZWNpYWxWYWwodmFsdWVUb2tlbnMubG9jLCBTVl9OdWxsKSA6XG5cdFx0XHRwYXJzZUV4cHIodmFsdWVUb2tlbnMpXG5cdFx0aWYgKG9wTmFtZSAhPT0gbnVsbClcblx0XHRcdF90cnlBZGROYW1lKHZhbHVlLCBvcE5hbWUpXG5cdFx0c3dpdGNoIChraW5kKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgbmFtZSBpZjpcblx0Ly8gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrIGF0IHRoZSBlbmQgb2YgYSBjYWxsIChhcyBpbiBgbmFtZSA9IE9iai1UeXBlIC4uLmApXG5cdF90cnlBZGROYW1lID0gKF8sIG5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEZ1biB8fCBfIGluc3RhbmNlb2YgQ2xhc3MpXG5cdFx0XHRfLm9wTmFtZSA9IG5hbWVcblx0XHRlbHNlIGlmIChfIGluc3RhbmNlb2YgQ2FsbCAmJiBfLmFyZ3MubGVuZ3RoID4gMClcblx0XHRcdF90cnlBZGRPYmpOYW1lKGxhc3QoXy5hcmdzKSwgbmFtZSlcblx0XHRlbHNlXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShfLCBuYW1lKVxuXHR9LFxuXG5cdF90cnlBZGRPYmpOYW1lID0gKF8sIG5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEJsb2NrV3JhcCAmJiBfLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tPYmopXG5cdFx0XHRpZiAoXy5ibG9jay5vcE9iamVkICE9PSBudWxsICYmIF8uYmxvY2sub3BPYmplZCBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0Xy5ibG9jay5vcE9iamVkLm9wTmFtZSA9IG5hbWVcblx0XHRcdGVsc2UgaWYgKCFfbmFtZU9iakFzc2lnblNvbWV3aGVyZShfLmJsb2NrLmxpbmVzKSlcblx0XHRcdFx0Xy5ibG9jay5vcE5hbWUgPSBuYW1lXG5cdH0sXG5cdF9uYW1lT2JqQXNzaWduU29tZXdoZXJlID0gbGluZXMgPT5cblx0XHRsaW5lcy5zb21lKGxpbmUgPT5cblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSAmJiBsaW5lLmFzc2lnbi5hbGxBc3NpZ25lZXMoKS5zb21lKF8gPT5cblx0XHRcdFx0Xy5uYW1lID09PSAnbmFtZScpKSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0TWFwRW50cnkobG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VFeHByKGFmdGVyKSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzID0gdG9rZW5zID0+XG5cdFx0dG9rZW5zLm1hcChfID0+IExvY2FsRGVjbGFyZVBsYWluKF8ubG9jLCBfcGFyc2VMb2NhbE5hbWUoXykpKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cblx0cGFyc2VMb2NhbERlY2xhcmUgPSB0b2tlbiA9PiB7XG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgdG9rZW4pKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0b2tlbilcblx0XHRcdGNvbnN0IFsgcmVzdCwgaXNMYXp5IF0gPVxuXHRcdFx0XHRpc0tleXdvcmQoS1dfTGF6eSwgdG9rZW5zLmhlYWQoKSkgPyBbIHRva2Vucy50YWlsKCksIHRydWUgXSA6IFsgdG9rZW5zLCBmYWxzZSBdXG5cdFx0XHRjb25zdCBuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0Y29uc3Qgb3BUeXBlID0gb3BJZighcmVzdDIuaXNFbXB0eSgpLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKEtXX1R5cGUsIGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbi5zaG93KCl9YClcblx0XHRcdFx0cmV0dXJuIHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZSh0b2tlbi5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5ID8gTERfTGF6eSA6IExEX0NvbnN0KVxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZVBsYWluKHRva2VuLmxvYywgX3BhcnNlTG9jYWxOYW1lKHRva2VuKSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKGlzS2V5d29yZChLV19Gb2N1cywgdCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dC5zaG93KCl9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdG9rZW4gPT4ge1xuXHRjb25zdCB7IGxvYyB9ID0gdG9rZW5cblx0cmV0dXJuIHRva2VuIGluc3RhbmNlb2YgTmFtZSA/XG5cdF9hY2Nlc3ModG9rZW4ubmFtZSwgbG9jKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgR3JvdXAgPyAoKCkgPT4ge1xuXHRcdGNvbnN0IHNsaWNlID0gU2xpY2UuZ3JvdXAodG9rZW4pXG5cdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEdfU3BhY2U6XG5cdFx0XHRcdHJldHVybiBwYXJzZVNwYWNlZChzbGljZSlcblx0XHRcdGNhc2UgR19QYXJlbnRoZXNpczpcblx0XHRcdFx0cmV0dXJuIHBhcnNlRXhwcihzbGljZSlcblx0XHRcdGNhc2UgR19CcmFja2V0OlxuXHRcdFx0XHRyZXR1cm4gQmFnU2ltcGxlKGxvYywgcGFyc2VFeHByUGFydHMoc2xpY2UpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRyZXR1cm4gYmxvY2tXcmFwKHNsaWNlKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUobG9jLFxuXHRcdFx0XHRcdHNsaWNlLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcih0b2tlbi5raW5kKVxuXHRcdH1cblx0fSkoKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgTnVtYmVyTGl0ZXJhbCA/XG5cdHRva2VuIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkID9cblx0XHR0b2tlbi5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpIDpcblx0XHRcdGlmRWxzZShvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kKHRva2VuLmtpbmQpLFxuXHRcdFx0XHRfID0+IFNwZWNpYWxWYWwobG9jLCBfKSxcblx0XHRcdFx0KCkgPT4gdW5leHBlY3RlZCh0b2tlbikpIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lID9cblx0XHR0b2tlbi5uRG90cyA9PT0gMSA/IE1lbWJlcih0b2tlbi5sb2MsIExvY2FsQWNjZXNzKHRva2VuLmxvYywgJ3RoaXMnKSwgdG9rZW4ubmFtZSkgOlxuXHRcdHRva2VuLm5Eb3RzID09PSAzID8gU3BsYXQobG9jLCBMb2NhbEFjY2Vzcyhsb2MsIHRva2VuLm5hbWUpKSA6XG5cdFx0dW5leHBlY3RlZCh0b2tlbikgOlxuXHR1bmV4cGVjdGVkKHRva2VuKVxufVxuXG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoaXNLZXl3b3JkKEtXX0xhenksIGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Ly8gVG9rZW5zIHdpdGhpbiBhIHNwYWNlIGdyb3VwIHdyYXAgcHJldmlvdXMgdG9rZW5zLlxuXHRcdGNvbnN0IG1vZCA9IChhY2MsIHRva2VuKSA9PiB7XG5cdFx0XHRjb25zdCBsb2MgPSB0b2tlbi5sb2Ncblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayh0b2tlbi5uRG90cyA9PT0gMSwgbG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKGxvYywgYWNjLCB0b2tlbi5uYW1lKVxuXHRcdFx0fSBlbHNlIGlmIChpc0tleXdvcmQoS1dfRm9jdXMsIHRva2VuKSlcblx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBhY2MsIFsgTG9jYWxBY2Nlc3MuZm9jdXMobG9jKSBdKVxuXHRcdFx0ZWxzZSBpZiAodG9rZW4gaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodG9rZW4ua2luZCA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLnN1Yihsb2MsXG5cdFx0XHRcdFx0XHR1bnNoaWZ0KGFjYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodG9rZW4pKSkpXG5cdFx0XHRcdGlmICh0b2tlbi5raW5kID09PSBHX1BhcmVudGhlc2lzKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0b2tlbiksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKGxvYywgYWNjLCBbXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlXG5cdFx0XHRcdGNvbnRleHQuZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dG9rZW4uc2hvdygpfWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtb2QsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSB0b2tlbnMuaGVhZFNsaWNlKClcblx0XHRpZiAoaXNLZXl3b3JkKGssIGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAodXNlS2V5d29yZEtpbmQsIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PlxuXHRcdFx0YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZSh1c2VLZXl3b3JkS2luZCl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcFNsaWNlcyhsaW5lID0+IHtcblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZShsaW5lLmhlYWQoKSlcblx0XHRcdGlmICh1c2VLZXl3b3JkS2luZCA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUuc2l6ZSgpID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUuc2Vjb25kKCkpXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IHVzZUtleXdvcmRLaW5kID09PSBLV19Vc2VMYXp5IHx8XG5cdFx0XHRcdFx0dXNlS2V5d29yZEtpbmQgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBsaW5lLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmVVbnR5cGVkKHRva2Vucy5sb2MsIG5hbWUsIGlzTGF6eSA/IExEX0xhenkgOiBMRF9Db25zdClcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFsgXSwgb3BVc2VEZWZhdWx0OiB1c2VEZWZhdWx0KCkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBvcFVzZURlZmF1bHQsIHJlc3QgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19Gb2N1cywgdG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdFx0bC5raW5kID0gTERfTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNHcm91cChHX1NwYWNlLCB0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHRva2VuID0+IHtcblx0XHRcdGNvbnRleHQuY2hlY2sodG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lICYmIHRva2VuLm5Eb3RzID09PSAxLCB0b2tlbi5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHRva2VuLm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG5cbmNvbnN0XG5cdF9wYXJzZUZvciA9IGN0ciA9PiB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdHJldHVybiBjdHIodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBwYXJzZUJsb2NrRG8oYmxvY2spKVxuXHR9LFxuXHRfcGFyc2VPcEl0ZXJhdGVlID0gdG9rZW5zID0+XG5cdFx0b3BJZighdG9rZW5zLmlzRW1wdHkoKSwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgWyBlbGVtZW50LCBiYWcgXSA9XG5cdFx0XHRcdGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfID0+IGlzS2V5d29yZChLV19JbiwgXykpLFxuXHRcdFx0XHRcdCh7IGJlZm9yZSwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhiZWZvcmUuc2l6ZSgpID09PSAxLCBiZWZvcmUubG9jLCAnVE9ETzogcGF0dGVybiBpbiBmb3InKVxuXHRcdFx0XHRcdFx0cmV0dXJuIFsgcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKGJlZm9yZSlbMF0sIHBhcnNlRXhwcihhZnRlcikgXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KCkgPT4gWyBMb2NhbERlY2xhcmVGb2N1cyh0b2tlbnMubG9jKSwgcGFyc2VFeHByKHRva2VucykgXSlcblx0XHRcdHJldHVybiBJdGVyYXRlZSh0b2tlbnMubG9jLCBlbGVtZW50LCBiYWcpXG5cdFx0fSlcbmNvbnN0XG5cdHBhcnNlRm9yRG8gPSBfcGFyc2VGb3IoRm9yRG8pLFxuXHRwYXJzZUZvclZhbCA9IF9wYXJzZUZvcihGb3JWYWwpLFxuXHQvLyBUT0RPOiAtPiBvdXQtdHlwZVxuXHRwYXJzZUZvckJhZyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y29uc3QgYmxvY2sgPSBwYXJzZUJsb2NrRG8obGluZXMpXG5cdFx0Ly8gVE9ETzogQmV0dGVyIHdheT9cblx0XHRpZiAoYmxvY2subGluZXMubGVuZ3RoID09PSAxICYmIGJsb2NrLmxpbmVzWzBdIGluc3RhbmNlb2YgVmFsKVxuXHRcdFx0YmxvY2subGluZXNbMF0gPSBCYWdFbnRyeShibG9jay5saW5lc1swXS5sb2MsIGJsb2NrLmxpbmVzWzBdKVxuXHRcdHJldHVybiBGb3JCYWcub2YodG9rZW5zLmxvYywgX3BhcnNlT3BJdGVyYXRlZShiZWZvcmUpLCBibG9jaylcblx0fVxuXG5cbmNvbnN0XG5cdHBhcnNlRXhjZXB0ID0gKGt3RXhjZXB0LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdFxuXHRcdFx0aXNWYWwgPSBrd0V4Y2VwdCA9PT0gS1dfRXhjZXB0VmFsLFxuXHRcdFx0anVzdERvVmFsQmxvY2sgPSBpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvLFxuXHRcdFx0cGFyc2VCbG9jayA9IGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbyxcblx0XHRcdEV4Y2VwdCA9IGlzVmFsID8gRXhjZXB0VmFsIDogRXhjZXB0RG8sXG5cdFx0XHRrd1RyeSA9IGlzVmFsID8gS1dfVHJ5VmFsIDogS1dfVHJ5RG8sXG5cdFx0XHRrd0NhdGNoID0gaXNWYWwgPyBLV19DYXRjaFZhbCA6IEtXX0NhdGNoRG8sXG5cdFx0XHRuYW1lVHJ5ID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd1RyeSkpLFxuXHRcdFx0bmFtZUNhdGNoID0gKCkgPT4gY29kZShrZXl3b3JkTmFtZShrd0NhdGNoKSksXG5cdFx0XHRuYW1lRmluYWxseSA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoS1dfRmluYWxseSkpXG5cblx0XHRjb25zdCBsaW5lcyA9IGp1c3RCbG9jayhrd0V4Y2VwdCwgdG9rZW5zKVxuXG5cdFx0Ly8gYHRyeWAgKm11c3QqIGNvbWUgZmlyc3QuXG5cdFx0Y29uc3QgZmlyc3RMaW5lID0gbGluZXMuaGVhZFNsaWNlKClcblx0XHRjb25zdCB0b2tlblRyeSA9IGZpcnN0TGluZS5oZWFkKClcblx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChrd1RyeSwgdG9rZW5UcnkpLCB0b2tlblRyeS5sb2MsICgpID0+XG5cdFx0XHRgTXVzdCBzdGFydCB3aXRoICR7bmFtZVRyeSgpfWApXG5cdFx0Y29uc3QgX3RyeSA9IGp1c3REb1ZhbEJsb2NrKGt3VHJ5LCBmaXJzdExpbmUudGFpbCgpKVxuXG5cdFx0Y29uc3QgcmVzdExpbmVzID0gbGluZXMudGFpbCgpXG5cdFx0Y2hlY2tOb25FbXB0eShyZXN0TGluZXMsICgpID0+XG5cdFx0XHRgTXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBvZiAke25hbWVDYXRjaCgpfSBvciAke25hbWVGaW5hbGx5KCl9YClcblxuXHRcdGNvbnN0IGhhbmRsZUZpbmFsbHkgPSByZXN0TGluZXMgPT4ge1xuXHRcdFx0Y29uc3QgbGluZSA9IHJlc3RMaW5lcy5oZWFkU2xpY2UoKVxuXHRcdFx0Y29uc3QgdG9rZW5GaW5hbGx5ID0gbGluZS5oZWFkKClcblx0XHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKEtXX0ZpbmFsbHksIHRva2VuRmluYWxseSksIHRva2VuRmluYWxseS5sb2MsICgpID0+XG5cdFx0XHRcdGBFeHBlY3RlZCAke25hbWVGaW5hbGx5KCl9YClcblx0XHRcdGNvbnRleHQuY2hlY2socmVzdExpbmVzLnNpemUoKSA9PT0gMSwgcmVzdExpbmVzLmxvYywgKCkgPT5cblx0XHRcdFx0YE5vdGhpbmcgaXMgYWxsb3dlZCB0byBjb21lIGFmdGVyICR7bmFtZUZpbmFsbHkoKX0uYClcblx0XHRcdHJldHVybiBqdXN0QmxvY2tEbyhLV19GaW5hbGx5LCBsaW5lLnRhaWwoKSlcblx0XHR9XG5cblx0XHRsZXQgX2NhdGNoLCBfZmluYWxseVxuXG5cdFx0Y29uc3QgbGluZTIgPSByZXN0TGluZXMuaGVhZFNsaWNlKClcblx0XHRjb25zdCBoZWFkMiA9IGxpbmUyLmhlYWQoKVxuXHRcdGlmIChpc0tleXdvcmQoa3dDYXRjaCwgaGVhZDIpKSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZTIsIGJsb2NrMiBdID0gYmVmb3JlQW5kQmxvY2sobGluZTIudGFpbCgpKVxuXHRcdFx0Y29uc3QgY2F1Z2h0ID0gX3BhcnNlT25lTG9jYWxEZWNsYXJlT3JGb2N1cyhiZWZvcmUyKVxuXHRcdFx0X2NhdGNoID0gQ2F0Y2gobGluZTIubG9jLCBjYXVnaHQsIHBhcnNlQmxvY2soYmxvY2syKSlcblx0XHRcdF9maW5hbGx5ID0gb3BJZihyZXN0TGluZXMuc2l6ZSgpID4gMSwgKCkgPT4gaGFuZGxlRmluYWxseShyZXN0TGluZXMudGFpbCgpKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2NhdGNoID0gbnVsbFxuXHRcdFx0X2ZpbmFsbHkgPSBoYW5kbGVGaW5hbGx5KHJlc3RMaW5lcylcblx0XHR9XG5cblx0XHRyZXR1cm4gRXhjZXB0KHRva2Vucy5sb2MsIF90cnksIF9jYXRjaCwgX2ZpbmFsbHkpXG5cdH0sXG5cdF9wYXJzZU9uZUxvY2FsRGVjbGFyZU9yRm9jdXMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZUZvY3VzKHRva2Vucy5sb2MpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5zaXplKCkgPT09IDEsICdFeHBlY3RlZCBvbmx5IG9uZSBsb2NhbCBkZWNsYXJlLicpXG5cdFx0XHRyZXR1cm4gcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucylbMF1cblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VBc3NlcnQgPSAobmVnYXRlLCB0b2tlbnMpID0+IHtcblx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtrZXl3b3JkTmFtZShLV19Bc3NlcnQpfS5gKVxuXG5cdGNvbnN0IFsgY29uZFRva2Vucywgb3BUaHJvd24gXSA9XG5cdFx0aWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF8gPT4gaXNLZXl3b3JkKEtXX1Rocm93LCBfKSksXG5cdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IFsgYmVmb3JlLCBwYXJzZUV4cHIoYWZ0ZXIpIF0sXG5cdFx0XHQoKSA9PiBbIHRva2VucywgbnVsbCBdKVxuXG5cdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHMoY29uZFRva2Vucylcblx0Y29uc3QgY29uZCA9IHBhcnRzLmxlbmd0aCA9PT0gMSA/IHBhcnRzWzBdIDogQ2FsbChjb25kVG9rZW5zLmxvYywgcGFydHNbMF0sIHRhaWwocGFydHMpKVxuXHRyZXR1cm4gQXNzZXJ0KHRva2Vucy5sb2MsIG5lZ2F0ZSwgY29uZCwgb3BUaHJvd24pXG59XG5cbmNvbnN0IHBhcnNlQ2xhc3MgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0Y29uc3Qgb3BFeHRlbmRlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IHBhcnNlRXhwcihiZWZvcmUpKVxuXG5cdGNvbnN0IGxpbmUxID0gYmxvY2suaGVhZFNsaWNlKClcblx0Y29uc3QgWyBzdGF0aWNzLCByZXN0IF0gPSBpc0tleXdvcmQoS1dfU3RhdGljLCBsaW5lMS5oZWFkKCkpID9cblx0XHRbIF9wYXJzZVN0YXRpY3MobGluZTEudGFpbCgpKSwgYmxvY2sudGFpbCgpIF0gOlxuXHRcdFsgWyBdLCBibG9jayBdXG5cblx0Y29uc3QgbGluZTIgPSByZXN0LmhlYWRTbGljZSgpXG5cdGNvbnN0IFsgb3BDb25zdHJ1Y3RvciwgcmVzdDIgXSA9IGlzS2V5d29yZChLV19Db25zdHJ1Y3QsIGxpbmUyLmhlYWQoKSkgP1xuXHRcdFsgX3BhcnNlQ29uc3RydWN0b3IobGluZTIudGFpbCgpKSwgcmVzdC50YWlsKCkgXSA6XG5cdFx0WyBudWxsLCByZXN0IF1cblxuXHRjb25zdCBtZXRob2RzID0gX3BhcnNlTWV0aG9kcyhyZXN0MilcblxuXHRyZXR1cm4gQ2xhc3ModG9rZW5zLmxvYywgb3BFeHRlbmRlZCwgc3RhdGljcywgb3BDb25zdHJ1Y3RvciwgbWV0aG9kcylcbn1cblxuY29uc3Rcblx0X3BhcnNlQ29uc3RydWN0b3IgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2sodHJ1ZSwgdG9rZW5zKVxuXHRcdGNvbnN0IGlzR2VuZXJhdG9yID0gZmFsc2UsIG9wRGVjbGFyZVJlcyA9IG51bGxcblx0XHRyZXR1cm4gRnVuKHRva2Vucy5sb2MsXG5cdFx0XHRpc0dlbmVyYXRvcixcblx0XHRcdGFyZ3MsIG9wUmVzdEFyZyxcblx0XHRcdGJsb2NrLCBvcEluLCBvcERlY2xhcmVSZXMsIG9wT3V0LFxuXHRcdFx0J2NvbnN0cnVjdG9yJylcblx0fSxcblx0X3BhcnNlU3RhdGljcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgYmxvY2sgPSBqdXN0QmxvY2soS1dfU3RhdGljLCB0b2tlbnMpXG5cdFx0cmV0dXJuIF9wYXJzZU1ldGhvZHMoYmxvY2spXG5cdH0sXG5cdF9wYXJzZU1ldGhvZHMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcFNsaWNlcyhfcGFyc2VNZXRob2QpLFxuXHRfcGFyc2VNZXRob2QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG5hbWVUb2tlbiA9IHRva2Vucy5oZWFkKClcblxuXHRcdGlmIChpc0tleXdvcmQoS1dfR2V0LCBuYW1lVG9rZW4pIHx8IGlzS2V5d29yZChLV19TZXQsIG5hbWVUb2tlbikpXG5cdFx0XHRjb250ZXh0LmZhaWwobmFtZVRva2VuLmxvYywgJ1RPRE86IGdldC9zZXQhJylcblxuXHRcdGNvbnRleHQuY2hlY2sobmFtZVRva2VuIGluc3RhbmNlb2YgTmFtZSwgbmFtZVRva2VuLmxvYywgKCkgPT5cblx0XHRcdGBFeHBlY3RlZCBuYW1lLCBnb3QgJHtuYW1lVG9rZW59YClcblx0XHRjb25zdCBuYW1lID0gbmFtZVRva2VuLm5hbWVcblxuXHRcdGNvbnN0IGZ1biA9IF9wYXJzZU1ldGhvZEZ1bih0b2tlbnMudGFpbCgpKVxuXHRcdGFzc2VydChmdW4ub3BOYW1lID09PSBudWxsKVxuXHRcdGZ1bi5vcE5hbWUgPSBuYW1lXG5cdFx0cmV0dXJuIGZ1blxuXHR9LFxuXHRfcGFyc2VNZXRob2RGdW4gPSB0b2tlbnMgPT5cblx0XHRwYXJzZUZ1bihfbWV0aG9kRnVuS2luZCh0b2tlbnMuaGVhZCgpKSwgdG9rZW5zLnRhaWwoKSksXG5cdF9tZXRob2RGdW5LaW5kID0gZnVuS2luZFRva2VuID0+IHtcblx0XHRzd2l0Y2ggKGZ1bktpbmRUb2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEtXX0Z1bjogcmV0dXJuIEtXX0Z1blRoaXNcblx0XHRcdGNhc2UgS1dfRnVuRG86IHJldHVybiBLV19GdW5UaGlzRG9cblx0XHRcdGNhc2UgS1dfRnVuR2VuOiByZXR1cm4gS1dfRnVuVGhpc0dlblxuXHRcdFx0Y2FzZSBLV19GdW5HZW5EbzogcmV0dXJuIEtXX0Z1blRoaXNHZW5Eb1xuXHRcdFx0Y2FzZSBLV19GdW5UaGlzOiBjYXNlIEtXX0Z1blRoaXNEbzogY2FzZSBLV19GdW5UaGlzR2VuOiBjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdFx0Y29udGV4dC5mYWlsKGZ1bktpbmRUb2tlbi5sb2MsICdGdW5jdGlvbiBgLmAgaXMgaW1wbGljaXQgZm9yIG1ldGhvZHMuJylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnRleHQuZmFpbChmdW5LaW5kVG9rZW4ubG9jLCBgRXhwZWN0ZWQgZnVuY3Rpb24ga2luZCwgZ290ICR7ZnVuS2luZFRva2VufWApXG5cdFx0fVxuXHR9XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==