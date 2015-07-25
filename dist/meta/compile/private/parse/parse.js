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
			if (token instanceof _Token.DotName) return _parseMemberSet(_MsAst.LocalAccess.this(token.loc), token.name, at, after, loc);
			if ((0, _Token.isGroup)(_Token.G_Space, token)) {
				const spaced = _Slice2.default.group(token);
				const dot = spaced.last();
				if (dot instanceof _Token.DotName) {
					context.check(dot.nDots === 1, dot.loc, 'Must have only 1 `.`.');
					return _parseMemberSet(parseSpaced(spaced.rtail()), dot.name, at, after, loc);
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
		if ((0, _Token.isKeyword)(_Token.KW_Type, h)) return _MsAst.Call.contains(h.loc, parseSpaced(rest), _MsAst.LocalAccess.focus(h.loc));else if ((0, _Token.isKeyword)(_Token.KW_Lazy, h)) return (0, _MsAst.Lazy)(h.loc, parseSpaced(rest));else {
			let acc = parseSingle(h);
			for (let i = rest.start; i < rest.end; i = i + 1) {
				const token = rest.tokens[i];
				const loc = token.loc;
				if (token instanceof _Token.DotName) {
					context.check(token.nDots === 1, token.loc, 'Too many dots!');
					acc = (0, _MsAst.Member)(token.loc, acc, token.name);
					continue;
				}
				if (token instanceof _Token.Keyword) switch (token.kind) {
					case _Token.KW_Focus:
						acc = (0, _MsAst.Call)(token.loc, acc, [_MsAst.LocalAccess.focus(loc)]);
						continue;
					case _Token.KW_Type:
						{
							const type = parseSpaced(tokens._chopStart(i + 1));
							return _MsAst.Call.contains(token.loc, type, acc);
						}
					default:
				}
				if (token instanceof _Token.Group) switch (token.kind) {
					case _Token.G_Bracket:
						acc = _MsAst.Call.sub(loc, (0, _util.unshift)(acc, parseExprParts(_Slice2.default.group(token))));
						continue;
					case _Token.G_Parenthesis:
						checkEmpty(_Slice2.default.group(token), () => `Use ${ (0, _CompileError.code)('(a b)') }, not ${ (0, _CompileError.code)('a(b)') }`);
						acc = (0, _MsAst.Call)(loc, acc, []);
						continue;
					default:
				}
				context.fail(tokens.loc, `Expected member or sub, not ${ token }`);
			}
			return acc;
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
		return (0, _MsAst.Fun)(tokens.loc, (0, _MsAst.LocalDeclareThis)(tokens.loc), isGenerator, args, opRestArg, block, opIn, opDeclareRes, opOut);
	},
	      _parseStatics = tokens => {
		const block = justBlock(_Token.KW_Static, tokens);
		return _parseMethods(block);
	},
	      _parseMethods = tokens => tokens.mapSlices(_parseMethod),
	      _parseMethod = tokens => {
		const head = tokens.head();

		if ((0, _Token.isKeyword)(_Token.KW_Get, head) || (0, _Token.isKeyword)(_Token.KW_Set, head)) context.fail(head.loc, 'TODO: get/set!');

		const baa = tokens.opSplitOnceWhere(_isFunKeyword);
		context.check(baa !== null, tokens.loc, 'Expected a function keyword somewhere.');

		const before = baa.before;
		const at = baa.at;
		const after = baa.after;

		const kind = _methodFunKind(at);
		const fun = parseFun(kind, after);
		(0, _util.assert)(fun.opName === null);

		let symbol = parseExpr(before);
		if (symbol instanceof _MsAst.Quote && symbol.parts.length === 1 && typeof symbol.parts[0] === 'string') {
			fun.opName = symbol.parts[0];
			return fun;
		} else return (0, _MsAst.MethodImpl)(tokens.loc, symbol, fun);
	},
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
	},
	      _isFunKeyword = funKindToken => {
		if (funKindToken instanceof _Token.Keyword) switch (funKindToken.kind) {
			case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_FunGen:case _Token.KW_FunGenDo:
			case _Token.KW_FunThis:case _Token.KW_FunThisDo:case _Token.KW_FunThisGen:
			case _Token.KW_FunThisGenDo:
				return true;
			default:
				return false;
		} else return false;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLEtBQUksT0FBTyxDQUFBOzs7Ozs7Ozs7Ozs7O2tCQVlJLENBQUMsUUFBUSxFQUFFLFNBQVMsS0FBSztBQUN2QyxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFlBckJRLE1BQU0sRUFxQlAsV0EvQnNFLE9BQU8sU0FBNUQsT0FBTyxFQStCUCxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTs7QUFFakQsU0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEtBQUssQ0FBQTtFQUNaOztBQUVELE9BQ0MsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7T0FDckQsYUFBYSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztPQUN0RCxVQUFVLEdBQUcsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRTVFLE9BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSTs7O3NCQUVILFlBQVksUUF2Q3pCLFFBQVEsRUF1QzRCLE1BQU0sQ0FBQzs7OztRQUFoRCxNQUFNO1FBQUUsS0FBSzs7dUJBQ1EsWUFBWSxRQXpDNkMsTUFBTSxFQXlDMUMsS0FBSyxDQUFDOzs7O1FBQWhELFNBQVM7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ZTtBQTRpQ3pDLFdBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFBO0FBQUEsQUFDeEU7QUFDQyxXQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyw0QkFBNEIsR0FBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFBQSxHQUM5RTtFQUNEO09BQ0QsYUFBYSxHQUFHLFlBQVksSUFBSTtBQUMvQixNQUFJLFlBQVksbUJBdGpDakIsT0FBTyxBQXNqQzZCLEVBQ2xDLFFBQVEsWUFBWSxDQUFDLElBQUk7QUFDeEIsZUFyakM0QixNQUFNLENBcWpDdEIsQUFBQyxZQXJqQ3VCLFFBQVEsQ0FxakNqQixBQUFDLFlBcmpDa0IsU0FBUyxDQXFqQ1osQUFBQyxZQXJqQ2EsV0FBVyxDQXFqQ1A7QUFDN0QsZUF0akNzRSxVQUFVLENBc2pDaEUsQUFBQyxZQXJqQ3BCLFlBQVksQ0FxakMwQixBQUFDLFlBcmpDekIsYUFBYSxDQXFqQytCO0FBQ3ZELGVBdGpDMEIsZUFBZTtBQXVqQ3hDLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDWjtBQUNDLFdBQU8sS0FBSyxDQUFBO0FBQUEsR0FDYixNQUVELE9BQU8sS0FBSyxDQUFBO0VBQ2IsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzZXJ0LCBBc3NpZ25EZXN0cnVjdHVyZSwgQXNzaWduU2luZ2xlLCBCYWdFbnRyeSwgQmFnRW50cnlNYW55LCBCYWdTaW1wbGUsIEJsb2NrQmFnLFxuXHRCbG9ja0RvLCBCbG9ja01hcCwgQmxvY2tPYmosIEJsb2NrVmFsVGhyb3csIEJsb2NrV2l0aFJldHVybiwgQmxvY2tXcmFwLCBCcmVha0RvLCBCcmVha1ZhbCxcblx0Q2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsIENhc2VEbywgQ2FzZVZhbCwgQ2F0Y2gsIENsYXNzLCBDb25kaXRpb25hbERvLCBDb25kaXRpb25hbFZhbCxcblx0Q29udGludWUsIERlYnVnLCBJdGVyYXRlZSwgTnVtYmVyTGl0ZXJhbCwgRXhjZXB0RG8sIEV4Y2VwdFZhbCwgRm9yQmFnLCBGb3JEbywgRm9yVmFsLCBGdW4sXG5cdEdsb2JhbEFjY2VzcywgTF9BbmQsIExfT3IsIExhenksIExEX0NvbnN0LCBMRF9MYXp5LCBMRF9NdXRhYmxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLFxuXHRMb2NhbERlY2xhcmVGb2N1cywgTG9jYWxEZWNsYXJlTmFtZSwgTG9jYWxEZWNsYXJlUGxhaW4sIExvY2FsRGVjbGFyZVJlcywgTG9jYWxEZWNsYXJlVGhpcyxcblx0TG9jYWxEZWNsYXJlVW50eXBlZCwgTG9jYWxNdXRhdGUsIExvZ2ljLCBNYXBFbnRyeSwgTWVtYmVyLCBNZW1iZXJTZXQsIE1ldGhvZEltcGwsIE1vZHVsZSxcblx0TVNfTXV0YXRlLCBNU19OZXcsIE1TX05ld011dGFibGUsIE5ldywgTm90LCBPYmpFbnRyeSwgT2JqUGFpciwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSxcblx0U1BfRGVidWdnZXIsIFNwZWNpYWxEbywgU3BlY2lhbFZhbCwgU1ZfTnVsbCwgU3BsYXQsIFRocm93LCBWYWwsIFVzZSwgVXNlRG8sIFlpZWxkLCBZaWVsZFRvXG5cdH0gZnJvbSAnLi4vLi4vTXNBc3QnXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9sYW5ndWFnZSdcbmltcG9ydCB7IERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW50aGVzaXMsIEdfU3BhY2UsIEdfUXVvdGUsIGlzR3JvdXAsIGlzS2V5d29yZCxcblx0S2V5d29yZCwgS1dfQW5kLCBLV19Bc3NlcnQsIEtXX0Fzc2VydE5vdCwgS1dfQXNzaWduLCBLV19Bc3NpZ25NdXRhYmxlLCBLV19CcmVha0RvLCBLV19CcmVha1ZhbCxcblx0S1dfQ2FzZVZhbCwgS1dfQ2FzZURvLCBLV19DbGFzcywgS1dfQ2F0Y2hEbywgS1dfQ2F0Y2hWYWwsIEtXX0NvbnN0cnVjdCwgS1dfQ29udGludWUsXG5cdEtXX0RlYnVnLCBLV19EZWJ1Z2dlciwgS1dfRWxsaXBzaXMsIEtXX0Vsc2UsIEtXX0V4Y2VwdERvLCBLV19FeGNlcHRWYWwsIEtXX0ZpbmFsbHksIEtXX0ZvckJhZyxcblx0S1dfRm9yRG8sIEtXX0ZvclZhbCwgS1dfRm9jdXMsIEtXX0Z1biwgS1dfRnVuRG8sIEtXX0Z1bkdlbiwgS1dfRnVuR2VuRG8sIEtXX0Z1blRoaXMsXG5cdEtXX0Z1blRoaXNEbywgS1dfRnVuVGhpc0dlbiwgS1dfRnVuVGhpc0dlbkRvLCBLV19HZXQsIEtXX0lmRG8sIEtXX0lmVmFsLCBLV19JbiwgS1dfTGF6eSxcblx0S1dfTG9jYWxNdXRhdGUsIEtXX01hcEVudHJ5LCBLV19OZXcsIEtXX05vdCwgS1dfT2JqQXNzaWduLCBLV19PciwgS1dfUGFzcywgS1dfT3V0LCBLV19SZWdpb24sXG5cdEtXX1NldCwgS1dfU3RhdGljLCBLV19UaHJvdywgS1dfVHJ5RG8sIEtXX1RyeVZhbCwgS1dfVHlwZSwgS1dfVW5sZXNzRG8sIEtXX1VubGVzc1ZhbCwgS1dfVXNlLFxuXHRLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sIEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvLCBOYW1lLCBrZXl3b3JkTmFtZSxcblx0b3BLZXl3b3JkS2luZFRvU3BlY2lhbFZhbHVlS2luZCB9IGZyb20gJy4uL1Rva2VuJ1xuaW1wb3J0IHsgYXNzZXJ0LCBoZWFkLCBpZkVsc2UsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsXG5cdG9wSWYsIG9wTWFwLCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1NsaWNlJ1xuXG4vLyBTaW5jZSB0aGVyZSBhcmUgc28gbWFueSBwYXJzaW5nIGZ1bmN0aW9ucyxcbi8vIGl0J3MgZmFzdGVyIChhcyBvZiBub2RlIHYwLjExLjE0KSB0byBoYXZlIHRoZW0gYWxsIGNsb3NlIG92ZXIgdGhpcyBtdXRhYmxlIHZhcmlhYmxlIG9uY2Vcbi8vIHRoYW4gdG8gY2xvc2Ugb3ZlciB0aGUgcGFyYW1ldGVyIChhcyBpbiBsZXguanMsIHdoZXJlIHRoYXQncyBtdWNoIGZhc3RlcikuXG5sZXQgY29udGV4dFxuXG4vKlxuVGhpcyBjb252ZXJ0cyBhIFRva2VuIHRyZWUgdG8gYSBNc0FzdC5cblRoaXMgaXMgYSByZWN1cnNpdmUtZGVzY2VudCBwYXJzZXIsIG1hZGUgZWFzaWVyIGJ5IHR3byBmYWN0czpcblx0KiBXZSBoYXZlIGFscmVhZHkgZ3JvdXBlZCB0b2tlbnMuXG5cdCogTW9zdCBvZiB0aGUgdGltZSwgYW4gYXN0J3MgdHlwZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBmaXJzdCB0b2tlbi5cblxuVGhlcmUgYXJlIGV4Y2VwdGlvbnMgc3VjaCBhcyBhc3NpZ25tZW50IHN0YXRlbWVudHMgKGluZGljYXRlZCBieSBhIGA9YCBzb21ld2hlcmUgaW4gdGhlIG1pZGRsZSkuXG5Gb3IgdGhvc2Ugd2UgbXVzdCBpdGVyYXRlIHRocm91Z2ggdG9rZW5zIGFuZCBzcGxpdC5cbihTZWUgU2xpY2Uub3BTcGxpdE9uY2VXaGVyZSBhbmQgU2xpY2Uub3BTcGxpdE1hbnlXaGVyZS4pXG4qL1xuZXhwb3J0IGRlZmF1bHQgKF9jb250ZXh0LCByb290VG9rZW4pID0+IHtcblx0Y29udGV4dCA9IF9jb250ZXh0XG5cdGFzc2VydChpc0dyb3VwKEdfQmxvY2ssIHJvb3RUb2tlbikpXG5cdGNvbnN0IG1zQXN0ID0gcGFyc2VNb2R1bGUoU2xpY2UuZ3JvdXAocm9vdFRva2VuKSlcblx0Ly8gUmVsZWFzZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9ucy5cblx0Y29udGV4dCA9IHVuZGVmaW5lZFxuXHRyZXR1cm4gbXNBc3Rcbn1cblxuY29uc3Rcblx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y29udGV4dC5jaGVjayghdG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdHVuZXhwZWN0ZWQgPSB0b2tlbiA9PiBjb250ZXh0LmZhaWwodG9rZW4ubG9jLCBgVW5leHBlY3RlZCAke3Rva2VuLnNob3coKX1gKVxuXG5jb25zdCBwYXJzZU1vZHVsZSA9IHRva2VucyA9PiB7XG5cdC8vIFVzZSBzdGF0ZW1lbnRzIG11c3QgYXBwZWFyIGluIG9yZGVyLlxuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9ID0gcGFyc2VNb2R1bGVCbG9jayhyZXN0MylcblxuXHRpZiAoY29udGV4dC5vcHRzLmluY2x1ZGVNb2R1bGVOYW1lKCkgJiYgIWV4cG9ydHMuc29tZShfID0+IF8ubmFtZSA9PT0gJ25hbWUnKSkge1xuXHRcdGNvbnN0IG5hbWUgPSBMb2NhbERlY2xhcmVOYW1lKHRva2Vucy5sb2MpXG5cdFx0bGluZXMucHVzaChBc3NpZ25TaW5nbGUodG9rZW5zLmxvYywgbmFtZSxcblx0XHRcdFF1b3RlLmZvclN0cmluZyh0b2tlbnMubG9jLCBjb250ZXh0Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cdFx0ZXhwb3J0cy5wdXNoKG5hbWUpXG5cdH1cblx0Y29uc3QgdXNlcyA9IHBsYWluVXNlcy5jb25jYXQobGF6eVVzZXMpXG5cdHJldHVybiBNb2R1bGUodG9rZW5zLmxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQpXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjb250ZXh0LmNoZWNrKGlzR3JvdXAoR19CbG9jaywgYmxvY2spLCBibG9jay5sb2MsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdHJldHVybiBbIHRva2Vucy5ydGFpbCgpLCBTbGljZS5ncm91cChibG9jaykgXVxuXHR9LFxuXG5cdGJsb2NrV3JhcCA9IHRva2VucyA9PiBCbG9ja1dyYXAodG9rZW5zLmxvYywgcGFyc2VCbG9ja1ZhbCh0b2tlbnMpKSxcblxuXHRqdXN0QmxvY2sgPSAoa2V5d29yZCwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICgpID0+XG5cdFx0XHRgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYmV0d2VlbiAke2NvZGUoa2V5d29yZE5hbWUoa2V5d29yZCkpfSBhbmQgYmxvY2suYClcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblx0anVzdEJsb2NrRG8gPSAoa2V5d29yZCwgdG9rZW5zKSA9PlxuXHRcdHBhcnNlQmxvY2tEbyhqdXN0QmxvY2soa2V5d29yZCwgdG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IChrZXl3b3JkLCB0b2tlbnMpID0+XG5cdFx0cGFyc2VCbG9ja1ZhbChqdXN0QmxvY2soa2V5d29yZCwgdG9rZW5zKSksXG5cblx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0cGFyc2VMaW5lc0Zyb21CbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aC5zaG93KCl9YClcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIGlzR3JvdXAoR19CbG9jaywgYmxvY2spKVxuXHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnN1YlRva2VucywgbGluZSA9PiBwYXJzZUxpbmVPckxpbmVzKFNsaWNlLmdyb3VwKGxpbmUpKSlcblx0fSxcblxuXHRwYXJzZUJsb2NrRG8gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGxpbmVzID0gX3BsYWluQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpXG5cdH0sXG5cblx0cGFyc2VCbG9ja1ZhbCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBsaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tCYWcub2YodG9rZW5zLmxvYywgbGluZXMpXG5cdFx0XHRjYXNlIEtSZXR1cm5fTWFwOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tNYXAub2YodG9rZW5zLmxvYywgbGluZXMpXG5cdFx0XHRjYXNlIEtSZXR1cm5fT2JqOlxuXHRcdFx0XHRjb25zdCBbIGRvTGluZXMsIG9wVmFsIF0gPSBfdHJ5VGFrZUxhc3RWYWwobGluZXMpXG5cdFx0XHRcdC8vIG9wTmFtZSB3cml0dGVuIHRvIGJ5IF90cnlBZGROYW1lLlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tPYmoub2YodG9rZW5zLmxvYywgZG9MaW5lcywgb3BWYWwsIG51bGwpXG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzRW1wdHkobGluZXMpLCB0b2tlbnMubG9jLCAnVmFsdWUgYmxvY2sgbXVzdCBlbmQgaW4gYSB2YWx1ZS4nKVxuXHRcdFx0XHRjb25zdCB2YWwgPSBsYXN0KGxpbmVzKVxuXHRcdFx0XHRpZiAodmFsIGluc3RhbmNlb2YgVGhyb3cpXG5cdFx0XHRcdFx0cmV0dXJuIEJsb2NrVmFsVGhyb3codG9rZW5zLmxvYywgcnRhaWwobGluZXMpLCB2YWwpXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2sodmFsIGluc3RhbmNlb2YgVmFsLCB2YWwubG9jLCAnVmFsdWUgYmxvY2sgbXVzdCBlbmQgaW4gYSB2YWx1ZS4nKVxuXHRcdFx0XHRcdHJldHVybiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgcnRhaWwobGluZXMpLCB2YWwpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cGFyc2VNb2R1bGVCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBsaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y29uc3QgbG9jID0gdG9rZW5zLmxvY1xuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzogY2FzZSBLUmV0dXJuX01hcDoge1xuXHRcdFx0XHRjb25zdCBibG9jayA9IChrUmV0dXJuID09PSBLUmV0dXJuX0JhZyA/IEJsb2NrQmFnIDogQmxvY2tNYXApLm9mKGxvYywgbGluZXMpXG5cdFx0XHRcdHJldHVybiB7IGxpbmVzOiBbIF0sIGV4cG9ydHM6IFsgXSwgb3BEZWZhdWx0RXhwb3J0OiBCbG9ja1dyYXAobG9jLCBibG9jaykgfVxuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRjb25zdCBleHBvcnRzID0gWyBdXG5cdFx0XHRcdGxldCBvcERlZmF1bHRFeHBvcnQgPSBudWxsXG5cdFx0XHRcdGNvbnN0IG1vZHVsZU5hbWUgPSBjb250ZXh0Lm9wdHMubW9kdWxlTmFtZSgpXG5cblx0XHRcdFx0Ly8gTW9kdWxlIGV4cG9ydHMgbG9vayBsaWtlIGEgQmxvY2tPYmosICBidXQgYXJlIHJlYWxseSBkaWZmZXJlbnQuXG5cdFx0XHRcdC8vIEluIEVTNiwgbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSBjb21wbGV0ZWx5IHN0YXRpYy5cblx0XHRcdFx0Ly8gU28gd2Uga2VlcCBhbiBhcnJheSBvZiBleHBvcnRzIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBNb2R1bGUgYXN0LlxuXHRcdFx0XHQvLyBJZiB5b3Ugd3JpdGU6XG5cdFx0XHRcdC8vXHRpZiEgY29uZFxuXHRcdFx0XHQvL1x0XHRhLiBiXG5cdFx0XHRcdC8vIGluIGEgbW9kdWxlIGNvbnRleHQsIGl0IHdpbGwgYmUgYW4gZXJyb3IuIChUaGUgbW9kdWxlIGNyZWF0ZXMgbm8gYGJ1aWx0YCBsb2NhbC4pXG5cdFx0XHRcdGNvbnN0IGdldExpbmVFeHBvcnRzID0gbGluZSA9PiB7XG5cdFx0XHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSkge1xuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxpbmUuYXNzaWduLmFsbEFzc2lnbmVlcygpKVxuXHRcdFx0XHRcdFx0XHRpZiAoXy5uYW1lID09PSBtb2R1bGVOYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhvcERlZmF1bHRFeHBvcnQgPT09IG51bGwsIF8ubG9jLCAoKSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0YERlZmF1bHQgZXhwb3J0IGFscmVhZHkgZGVjbGFyZWQgYXQgJHtvcERlZmF1bHRFeHBvcnQubG9jfWApXG5cdFx0XHRcdFx0XHRcdFx0b3BEZWZhdWx0RXhwb3J0ID0gTG9jYWxBY2Nlc3MoXy5sb2MsIF8ubmFtZSlcblx0XHRcdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRcdFx0ZXhwb3J0cy5wdXNoKF8pXG5cdFx0XHRcdFx0XHRyZXR1cm4gbGluZS5hc3NpZ25cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0XHRcdGxpbmUubGluZXMgPSBsaW5lLmxpbmVzLm1hcChnZXRMaW5lRXhwb3J0cylcblx0XHRcdFx0XHRyZXR1cm4gbGluZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgbW9kdWxlTGluZXMgPSBsaW5lcy5tYXAoZ2V0TGluZUV4cG9ydHMpXG5cblx0XHRcdFx0aWYgKGlzRW1wdHkoZXhwb3J0cykgJiYgb3BEZWZhdWx0RXhwb3J0ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0Y29uc3QgWyBsaW5lcywgb3BEZWZhdWx0RXhwb3J0IF0gPSBfdHJ5VGFrZUxhc3RWYWwobW9kdWxlTGluZXMpXG5cdFx0XHRcdFx0cmV0dXJuIHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9XG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdHJldHVybiB7IGxpbmVzOiBtb2R1bGVMaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuLy8gcGFyc2VCbG9jayBwcml2YXRlc1xuY29uc3Rcblx0X3RyeVRha2VMYXN0VmFsID0gbGluZXMgPT5cblx0XHQoIWlzRW1wdHkobGluZXMpICYmIGxhc3QobGluZXMpIGluc3RhbmNlb2YgVmFsKSA/XG5cdFx0XHRbIHJ0YWlsKGxpbmVzKSwgbGFzdChsaW5lcykgXSA6XG5cdFx0XHRbIGxpbmVzLCBudWxsIF0sXG5cblx0X3BsYWluQmxvY2tMaW5lcyA9IGxpbmVUb2tlbnMgPT4ge1xuXHRcdGNvbnN0IGxpbmVzID0gWyBdXG5cdFx0Y29uc3QgYWRkTGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxpbmUpXG5cdFx0XHRcdFx0YWRkTGluZShfKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsaW5lcy5wdXNoKGxpbmUpXG5cdFx0fVxuXHRcdGxpbmVUb2tlbnMuZWFjaChfID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKF8pKSkpXG5cdFx0cmV0dXJuIGxpbmVzXG5cdH0sXG5cblx0S1JldHVybl9QbGFpbiA9IDAsXG5cdEtSZXR1cm5fT2JqID0gMSxcblx0S1JldHVybl9CYWcgPSAyLFxuXHRLUmV0dXJuX01hcCA9IDMsXG5cdF9wYXJzZUJsb2NrTGluZXMgPSBsaW5lVG9rZW5zID0+IHtcblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZSwgaXNPYmogPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxpbmUubGluZXMpXG5cdFx0XHRcdFx0Y2hlY2tMaW5lKF8pXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIE1hcEVudHJ5KVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBPYmpFbnRyeSlcblx0XHRcdFx0aXNPYmogPSB0cnVlXG5cdFx0fVxuXHRcdGNvbnN0IGxpbmVzID0gX3BsYWluQmxvY2tMaW5lcyhsaW5lVG9rZW5zKVxuXHRcdGZvciAoY29uc3QgXyBvZiBsaW5lcylcblx0XHRcdGNoZWNrTGluZShfKVxuXG5cdFx0Y29udGV4dC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjb250ZXh0LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGNvbnRleHQuY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID1cblx0XHRcdGlzT2JqID8gS1JldHVybl9PYmogOiBpc0JhZyA/IEtSZXR1cm5fQmFnIDogaXNNYXAgPyBLUmV0dXJuX01hcCA6IEtSZXR1cm5fUGxhaW5cblx0XHRyZXR1cm4geyBsaW5lcywga1JldHVybiB9XG5cdH1cblxuY29uc3QgcGFyc2VDYXNlID0gKGlzVmFsLCBjYXNlZEZyb21GdW4sIHRva2VucykgPT4ge1xuXHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2VucylcblxuXHRsZXQgb3BDYXNlZFxuXHRpZiAoY2FzZWRGcm9tRnVuKSB7XG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdDYW5cXCd0IG1ha2UgZm9jdXMgLS0gaXMgaW1wbGljaXRseSBwcm92aWRlZCBhcyBmaXJzdCBhcmd1bWVudC4nKVxuXHRcdG9wQ2FzZWQgPSBudWxsXG5cdH0gZWxzZVxuXHRcdG9wQ2FzZWQgPSBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PiBBc3NpZ25TaW5nbGUuZm9jdXMoYmVmb3JlLmxvYywgcGFyc2VFeHByKGJlZm9yZSkpKVxuXG5cdGNvbnN0IGxhc3RMaW5lID0gU2xpY2UuZ3JvdXAoYmxvY2subGFzdCgpKVxuXHRjb25zdCBbIHBhcnRMaW5lcywgb3BFbHNlIF0gPSBpc0tleXdvcmQoS1dfRWxzZSwgbGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCAoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykoS1dfRWxzZSwgbGFzdExpbmUudGFpbCgpKSBdIDpcblx0XHRbIGJsb2NrLCBudWxsIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXBTbGljZXMobGluZSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIHJlc3VsdClcblx0fSlcblx0Y29udGV4dC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAnTXVzdCBoYXZlIGF0IGxlYXN0IDEgbm9uLWBlbHNlYCB0ZXN0LicpXG5cblx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWwgOiBDYXNlRG8pKHRva2Vucy5sb2MsIG9wQ2FzZWQsIHBhcnRzLCBvcEVsc2UpXG59XG4vLyBwYXJzZUNhc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUNhc2VUZXN0ID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBQYXR0ZXJuIG1hdGNoIHN0YXJ0cyB3aXRoIHR5cGUgdGVzdCBhbmQgaXMgZm9sbG93ZWQgYnkgbG9jYWwgZGVjbGFyZXMuXG5cdFx0Ly8gRS5nLiwgYDpTb21lIHZhbGBcblx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCBmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKEtXX1R5cGUsIGZ0LmhlYWQoKSkpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IHBhcnNlU3BhY2VkKGZ0LnRhaWwoKSlcblx0XHRcdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBQYXR0ZXJuKGZpcnN0LmxvYywgdHlwZSwgbG9jYWxzLCBMb2NhbEFjY2Vzcy5mb2N1cyh0b2tlbnMubG9jKSlcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhcnNlRXhwcih0b2tlbnMpXG5cdH1cblxuY29uc3Rcblx0cGFyc2VFeHByID0gdG9rZW5zID0+IHtcblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0TWFueVdoZXJlKF8gPT4gaXNLZXl3b3JkKEtXX09iakFzc2lnbiwgXykpLFxuXHRcdFx0c3BsaXRzID0+IHtcblx0XHRcdFx0Ly8gU2hvcnQgb2JqZWN0IGZvcm0sIHN1Y2ggYXMgKGEuIDEsIGIuIDIpXG5cdFx0XHRcdGNvbnN0IGZpcnN0ID0gc3BsaXRzWzBdLmJlZm9yZVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KGZpcnN0LCAoKSA9PiBgVW5leHBlY3RlZCAke3NwbGl0c1swXS5hdC5zaG93KCl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gWyBdXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2sobmFtZSBpbnN0YW5jZW9mIE5hbWUsIG5hbWUubG9jLCAoKSA9PlxuXHRcdFx0XHRcdFx0YEV4cGVjdGVkIGEgbmFtZSwgbm90ICR7bmFtZS5zaG93KCl9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG9wU3BsaXQgPSB0b2tlbnMub3BTcGxpdE9uY2VXaGVyZSh0b2tlbiA9PiB7XG5cdFx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0XHRjYXNlIEtXX0FuZDogY2FzZSBLV19DYXNlVmFsOiBjYXNlIEtXX0NsYXNzOiBjYXNlIEtXX0V4Y2VwdFZhbDogY2FzZSBLV19Gb3JCYWc6XG5cdFx0XHRcdFx0Y2FzZSBLV19Gb3JWYWw6IGNhc2UgS1dfRnVuOiBjYXNlIEtXX0Z1bkRvOiBjYXNlIEtXX0Z1bkdlbjogY2FzZSBLV19GdW5HZW5Ebzpcblx0XHRcdFx0XHRjYXNlIEtXX0Z1blRoaXM6IGNhc2UgS1dfRnVuVGhpc0RvOiBjYXNlIEtXX0Z1blRoaXNHZW46IGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0XHRcdGNhc2UgS1dfSWZWYWw6IGNhc2UgS1dfTmV3OiBjYXNlIEtXX05vdDogY2FzZSBLV19PcjogY2FzZSBLV19Vbmxlc3NWYWw6XG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDogY2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0pXG5cdFx0cmV0dXJuIGlmRWxzZShvcFNwbGl0LFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBsYXN0ID0gKCgpID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKGF0LmtpbmQpIHtcblx0XHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX09yOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTG9naWMoYXQubG9jLCBhdC5raW5kID09PSBLV19BbmQgPyBMX0FuZCA6IExfT3IsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByUGFydHMoYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19DYXNlVmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKHRydWUsIGZhbHNlLCBhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfQ2xhc3M6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUNsYXNzKGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19FeGNlcHRWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUV4Y2VwdChLV19FeGNlcHRWYWwsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Gb3JCYWc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZvckJhZyhhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRm9yVmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3JWYWwoYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1bjogY2FzZSBLV19GdW5EbzogY2FzZSBLV19GdW5HZW46IGNhc2UgS1dfRnVuR2VuRG86XG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1blRoaXM6IGNhc2UgS1dfRnVuVGhpc0RvOiBjYXNlIEtXX0Z1blRoaXNHZW46XG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRnVuKGF0LmtpbmQsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19Vbmxlc3NWYWw6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsVmFsKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByKGJlZm9yZSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VCbG9ja1ZhbChibG9jayksXG5cdFx0XHRcdFx0XHRcdFx0YXQua2luZCA9PT0gS1dfVW5sZXNzVmFsKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19OZXc6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIE5ldyhhdC5sb2MsIHBhcnRzWzBdLCB0YWlsKHBhcnRzKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgS1dfTm90OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTm90KGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZChhdC5sb2MsIHBhcnNlRXhwcihhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRcdHJldHVybiBZaWVsZFRvKGF0LmxvYywgcGFyc2VFeHByKGFmdGVyKSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihhdC5raW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkoKVxuXHRcdFx0XHRyZXR1cm4gcHVzaChiZWZvcmUubWFwKHBhcnNlU2luZ2xlKSwgbGFzdClcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB0b2tlbnMubWFwKHBhcnNlU2luZ2xlKSlcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBnb3Qgbm90aGluZy4nKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoa2luZCwgdG9rZW5zKSA9PiB7XG5cdGxldCBpc1RoaXMgPSBmYWxzZSwgaXNEbyA9IGZhbHNlLCBpc0dlbiA9IGZhbHNlXG5cdHN3aXRjaCAoa2luZCkge1xuXHRcdGNhc2UgS1dfRnVuOlxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1bkRvOlxuXHRcdFx0aXNEbyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBLV19GdW5HZW46XG5cdFx0XHRpc0dlbiA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBLV19GdW5HZW5Ebzpcblx0XHRcdGlzR2VuID0gdHJ1ZVxuXHRcdFx0aXNEbyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBLV19GdW5UaGlzOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1blRoaXNEbzpcblx0XHRcdGlzVGhpcyA9IHRydWVcblx0XHRcdGlzRG8gPSB0cnVlXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuVGhpc0dlbjpcblx0XHRcdGlzVGhpcyA9IHRydWVcblx0XHRcdGlzR2VuID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdGlzVGhpcyA9IHRydWVcblx0XHRcdGlzR2VuID0gdHJ1ZVxuXHRcdFx0aXNEbyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKClcblx0fVxuXHRjb25zdCBvcERlY2xhcmVUaGlzID0gb3BJZihpc1RoaXMsICgpID0+IExvY2FsRGVjbGFyZVRoaXModG9rZW5zLmxvYykpXG5cblx0Y29uc3QgeyBvcFJldHVyblR5cGUsIHJlc3QgfSA9IF90cnlUYWtlUmV0dXJuVHlwZSh0b2tlbnMpXG5cdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2soaXNEbywgcmVzdClcblx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdGNvbnN0IG9wRGVjbGFyZVJlcyA9IGlmRWxzZShvcFJldHVyblR5cGUsXG5cdFx0XyA9PiBMb2NhbERlY2xhcmVSZXMoXy5sb2MsIF8pLFxuXHRcdCgpID0+IG9wTWFwKG9wT3V0LCBvID0+IExvY2FsRGVjbGFyZVJlcyhvLmxvYywgbnVsbCkpKVxuXHRyZXR1cm4gRnVuKHRva2Vucy5sb2MsIG9wRGVjbGFyZVRoaXMsIGlzR2VuLCBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcERlY2xhcmVSZXMsIG9wT3V0KVxufVxuXG4vLyBwYXJzZUZ1biBwcml2YXRlc1xuY29uc3Rcblx0X3RyeVRha2VSZXR1cm5UeXBlID0gdG9rZW5zID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCBoKSAmJiBpc0tleXdvcmQoS1dfVHlwZSwgaGVhZChoLnN1YlRva2VucykpKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdG9wUmV0dXJuVHlwZTogcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAoaCkudGFpbCgpKSxcblx0XHRcdFx0XHRyZXN0OiB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHsgb3BSZXR1cm5UeXBlOiBudWxsLCByZXN0OiB0b2tlbnMgfVxuXHR9LFxuXG5cdF9mdW5BcmdzQW5kQmxvY2sgPSAoaXNEbywgdG9rZW5zKSA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gTWlnaHQgYmUgYHxjYXNlYFxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZCAmJiAoaC5raW5kID09PSBLV19DYXNlVmFsIHx8IGgua2luZCA9PT0gS1dfQ2FzZURvKSkge1xuXHRcdFx0Y29uc3QgZUNhc2UgPSBwYXJzZUNhc2UoaC5raW5kID09PSBLV19DYXNlVmFsLCB0cnVlLCB0b2tlbnMudGFpbCgpKVxuXHRcdFx0Y29uc3QgYXJncyA9IFsgTG9jYWxEZWNsYXJlRm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX0Nhc2VWYWwgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrTGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Zm9yIChjb25zdCBhcmcgb2YgYXJncylcblx0XHRcdFx0aWYgKCFhcmcuaXNMYXp5KCkpXG5cdFx0XHRcdFx0YXJnLmtpbmQgPSBMRF9NdXRhYmxlXG5cdFx0XHRjb25zdCBbIG9wSW4sIHJlc3QwIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfSW4sIGJsb2NrTGluZXMpXG5cdFx0XHRjb25zdCBbIG9wT3V0LCByZXN0MSBdID0gX3RyeVRha2VJbk9yT3V0KEtXX091dCwgcmVzdDApXG5cdFx0XHRjb25zdCBibG9jayA9IChpc0RvID8gcGFyc2VCbG9ja0RvIDogcGFyc2VCbG9ja1ZhbCkocmVzdDEpXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy5ydGFpbCgpKSxcblx0XHRcdFx0XHRvcFJlc3RBcmc6IExvY2FsRGVjbGFyZVBsYWluKGwubG9jLCBsLm5hbWUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucyksIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0fVxuXHR9LFxuXG5cdF90cnlUYWtlSW5Pck91dCA9IChpbk9yT3V0LCB0b2tlbnMpID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRva2Vucy5oZWFkU2xpY2UoKVxuXHRcdFx0aWYgKGlzS2V5d29yZChpbk9yT3V0LCBmaXJzdExpbmUuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhmaXJzdExpbmUpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHRjb25zdCBub1Jlc3QgPSAoKSA9PlxuXHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtoZWFkLnNob3coKX1gKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaGVhZCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGhlYWQua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX0Fzc2VydDogY2FzZSBLV19Bc3NlcnROb3Q6XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQXNzZXJ0KGhlYWQua2luZCA9PT0gS1dfQXNzZXJ0Tm90LCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0V4Y2VwdERvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUV4Y2VwdChLV19FeGNlcHREbywgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19CcmVha0RvOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIEJyZWFrRG8odG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19CcmVha1ZhbDpcblx0XHRcdFx0XHRyZXR1cm4gQnJlYWtWYWwodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKGZhbHNlLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19Db250aW51ZTpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBDb250aW51ZSh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnOlxuXHRcdFx0XHRcdHJldHVybiBEZWJ1Zyh0b2tlbnMubG9jLFxuXHRcdFx0XHRcdFx0aXNHcm91cChHX0Jsb2NrLCB0b2tlbnMuc2Vjb25kKCkpID9cblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gaW5kZW50ZWQgYmxvY2tcblx0XHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soKSA6XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIHNpbmdsZSBsaW5lXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVPckxpbmVzKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnZ2VyOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWxEbyh0b2tlbnMubG9jLCBTUF9EZWJ1Z2dlcilcblx0XHRcdFx0Y2FzZSBLV19FbGxpcHNpczpcblx0XHRcdFx0XHRyZXR1cm4gQmFnRW50cnlNYW55KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19Gb3JEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3JEbyhyZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0lmRG86IGNhc2UgS1dfVW5sZXNzRG86IHtcblx0XHRcdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHJlc3QpXG5cdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsRG8odG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdHBhcnNlRXhwcihiZWZvcmUpLFxuXHRcdFx0XHRcdFx0cGFyc2VCbG9ja0RvKGJsb2NrKSxcblx0XHRcdFx0XHRcdGhlYWQua2luZCA9PT0gS1dfVW5sZXNzRG8pXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19UaHJvdzpcblx0XHRcdFx0XHRyZXR1cm4gVGhyb3codG9rZW5zLmxvYywgb3BJZighcmVzdC5pc0VtcHR5KCksICgpID0+IHBhcnNlRXhwcihyZXN0KSkpXG5cdFx0XHRcdGNhc2UgS1dfUGFzczpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBbIF1cblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfaXNMaW5lU3BsaXRLZXl3b3JkKSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IF9wYXJzZUFzc2lnbkxpa2UoYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpLFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X2lzTGluZVNwbGl0S2V5d29yZCA9IHRva2VuID0+IHtcblx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQXNzaWduOiBjYXNlIEtXX0Fzc2lnbk11dGFibGU6IGNhc2UgS1dfTG9jYWxNdXRhdGU6XG5cdFx0XHRcdGNhc2UgS1dfTWFwRW50cnk6IGNhc2UgS1dfT2JqQXNzaWduOiBjYXNlIEtXX1lpZWxkOiBjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0fSxcblxuXHRfcGFyc2VBc3NpZ25MaWtlID0gKGJlZm9yZSwgYXQsIGFmdGVyLCBsb2MpID0+IHtcblx0XHRpZiAoYXQua2luZCA9PT0gS1dfTWFwRW50cnkpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTWFwRW50cnkoYmVmb3JlLCBhZnRlciwgbG9jKVxuXG5cdFx0Ly8gVE9ETzogVGhpcyBjb2RlIGlzIGtpbmQgb2YgdWdseS5cblx0XHRpZiAoYmVmb3JlLnNpemUoKSA9PT0gMSkge1xuXHRcdFx0Y29uc3QgdG9rZW4gPSBiZWZvcmUuaGVhZCgpXG5cdFx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0XHRyZXR1cm4gX3BhcnNlTWVtYmVyU2V0KFx0TG9jYWxBY2Nlc3MudGhpcyh0b2tlbi5sb2MpLCB0b2tlbi5uYW1lLCBhdCwgYWZ0ZXIsIGxvYylcblx0XHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIHRva2VuKSkge1xuXHRcdFx0XHRjb25zdCBzcGFjZWQgPSBTbGljZS5ncm91cCh0b2tlbilcblx0XHRcdFx0Y29uc3QgZG90ID0gc3BhY2VkLmxhc3QoKVxuXHRcdFx0XHRpZiAoZG90IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soZG90Lm5Eb3RzID09PSAxLCBkb3QubG9jLCAnTXVzdCBoYXZlIG9ubHkgMSBgLmAuJylcblx0XHRcdFx0XHRyZXR1cm4gX3BhcnNlTWVtYmVyU2V0KHBhcnNlU3BhY2VkKHNwYWNlZC5ydGFpbCgpKSwgZG90Lm5hbWUsIGF0LCBhZnRlciwgbG9jKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGF0LmtpbmQgPT09IEtXX0xvY2FsTXV0YXRlID9cblx0XHRcdF9wYXJzZUxvY2FsTXV0YXRlKGJlZm9yZSwgYWZ0ZXIsIGxvYykgOlxuXHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCBsb2MpXG5cdH0sXG5cblx0X3BhcnNlTWVtYmVyU2V0ID0gKG9iamVjdCwgbmFtZSwgYXQsIGFmdGVyLCBsb2MpID0+XG5cdFx0TWVtYmVyU2V0KGxvYywgb2JqZWN0LCBuYW1lLCBfbWVtYmVyU2V0S2luZChhdCksIHBhcnNlRXhwcihhZnRlcikpLFxuXHRfbWVtYmVyU2V0S2luZCA9IGF0ID0+IHtcblx0XHRzd2l0Y2ggKGF0LmtpbmQpIHtcblx0XHRcdGNhc2UgS1dfQXNzaWduOiByZXR1cm4gTVNfTmV3XG5cdFx0XHRjYXNlIEtXX0Fzc2lnbk11dGFibGU6IHJldHVybiBNU19OZXdNdXRhYmxlXG5cdFx0XHRjYXNlIEtXX0xvY2FsTXV0YXRlOiByZXR1cm4gTVNfTXV0YXRlXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbE11dGF0ZSA9IChsb2NhbHNUb2tlbnMsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMobG9jYWxzVG9rZW5zKVxuXHRcdGNvbnRleHQuY2hlY2sobG9jYWxzLmxlbmd0aCA9PT0gMSwgbG9jLCAnVE9ETzogTG9jYWxEZXN0cnVjdHVyZU11dGF0ZScpXG5cdFx0Y29uc3QgbmFtZSA9IGxvY2Fsc1swXS5uYW1lXG5cdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHIodmFsdWVUb2tlbnMpXG5cdFx0cmV0dXJuIExvY2FsTXV0YXRlKGxvYywgbmFtZSwgdmFsdWUpXG5cdH0sXG5cblx0X3BhcnNlQXNzaWduID0gKGxvY2Fsc1Rva2VucywgYXNzaWduZXIsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBraW5kID0gYXNzaWduZXIua2luZFxuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29uc3Qgb3BOYW1lID0gb3BJZihsb2NhbHMubGVuZ3RoID09PSAxLCAoKSA9PiBsb2NhbHNbMF0ubmFtZSlcblx0XHRjb25zdCB2YWx1ZSA9IF9wYXJzZUFzc2lnblZhbHVlKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpXG5cblx0XHRjb25zdCBpc1lpZWxkID0ga2luZCA9PT0gS1dfWWllbGQgfHwga2luZCA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNZaWVsZCwgbG9jYWxzVG9rZW5zLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsb2NhbHMpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghXy5pc0xhenkoKSwgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJylcblxuXHRcdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblxuXHRcdFx0aWYgKGtpbmQgPT09IEtXX0Fzc2lnbk11dGFibGUpXG5cdFx0XHRcdGZvciAobGV0IF8gb2YgbG9jYWxzKSB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghXy5pc0xhenkoKSwgXy5sb2MsICdMYXp5IGxvY2FsIGNhbiBub3QgYmUgbXV0YWJsZS4nKVxuXHRcdFx0XHRcdF8ua2luZCA9IExEX011dGFibGVcblx0XHRcdFx0fVxuXG5cdFx0XHRjb25zdCB3cmFwID0gXyA9PiBpc09iakFzc2lnbiA/IE9iakVudHJ5KGxvYywgXykgOiBfXG5cblx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRcdGNvbnN0IGFzc2lnbiA9IEFzc2lnblNpbmdsZShsb2MsIGFzc2lnbmVlLCB2YWx1ZSlcblx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdHJldHVybiBpc1Rlc3QgPyBEZWJ1Zyhsb2MsIFsgd3JhcChhc3NpZ24pIF0pIDogd3JhcChhc3NpZ24pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBraW5kID0gbG9jYWxzWzBdLmtpbmRcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxvY2Fscylcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKF8ua2luZCA9PT0ga2luZCwgXy5sb2MsXG5cdFx0XHRcdFx0XHQnQWxsIGxvY2FscyBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbm1lbnQgbXVzdCBiZSBvZiB0aGUgc2FtZSBraW5kLicpXG5cdFx0XHRcdHJldHVybiB3cmFwKEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCB2YWx1ZSwga2luZCkpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnblZhbHVlID0gKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHZhbHVlVG9rZW5zLmlzRW1wdHkoKSAmJiBraW5kID09PSBLV19PYmpBc3NpZ24gP1xuXHRcdFx0U3BlY2lhbFZhbCh2YWx1ZVRva2Vucy5sb2MsIFNWX051bGwpIDpcblx0XHRcdHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRpZiAob3BOYW1lICE9PSBudWxsKVxuXHRcdFx0X3RyeUFkZE5hbWUodmFsdWUsIG9wTmFtZSlcblx0XHRzd2l0Y2ggKGtpbmQpIHtcblx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdHJldHVybiBZaWVsZCh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIFdlIGdpdmUgaXQgYSBuYW1lIGlmOlxuXHQvLyBJdCdzIGEgZnVuY3Rpb25cblx0Ly8gSXQncyBhbiBPYmogYmxvY2tcblx0Ly8gSXQncyBhbiBPYmogYmxvY2sgYXQgdGhlIGVuZCBvZiBhIGNhbGwgKGFzIGluIGBuYW1lID0gT2JqLVR5cGUgLi4uYClcblx0X3RyeUFkZE5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgRnVuIHx8IF8gaW5zdGFuY2VvZiBDbGFzcylcblx0XHRcdF8ub3BOYW1lID0gbmFtZVxuXHRcdGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBDYWxsICYmIF8uYXJncy5sZW5ndGggPiAwKVxuXHRcdFx0X3RyeUFkZE9iak5hbWUobGFzdChfLmFyZ3MpLCBuYW1lKVxuXHRcdGVsc2Vcblx0XHRcdF90cnlBZGRPYmpOYW1lKF8sIG5hbWUpXG5cdH0sXG5cblx0X3RyeUFkZE9iak5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgQmxvY2tXcmFwICYmIF8uYmxvY2sgaW5zdGFuY2VvZiBCbG9ja09iailcblx0XHRcdGlmIChfLmJsb2NrLm9wT2JqZWQgIT09IG51bGwgJiYgXy5ibG9jay5vcE9iamVkIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRfLmJsb2NrLm9wT2JqZWQub3BOYW1lID0gbmFtZVxuXHRcdFx0ZWxzZSBpZiAoIV9uYW1lT2JqQXNzaWduU29tZXdoZXJlKF8uYmxvY2subGluZXMpKVxuXHRcdFx0XHRfLmJsb2NrLm9wTmFtZSA9IG5hbWVcblx0fSxcblx0X25hbWVPYmpBc3NpZ25Tb21ld2hlcmUgPSBsaW5lcyA9PlxuXHRcdGxpbmVzLnNvbWUobGluZSA9PlxuXHRcdFx0bGluZSBpbnN0YW5jZW9mIE9iakVudHJ5ICYmIGxpbmUuYXNzaWduLmFsbEFzc2lnbmVlcygpLnNvbWUoXyA9PlxuXHRcdFx0XHRfLm5hbWUgPT09ICduYW1lJykpLFxuXG5cdF9wYXJzZU1hcEVudHJ5ID0gKGJlZm9yZSwgYWZ0ZXIsIGxvYykgPT5cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMgPSB0b2tlbnMgPT5cblx0XHR0b2tlbnMubWFwKF8gPT4gTG9jYWxEZWNsYXJlUGxhaW4oXy5sb2MsIF9wYXJzZUxvY2FsTmFtZShfKSkpLFxuXG5cdHBhcnNlTG9jYWxEZWNsYXJlcyA9IHRva2VucyA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHRva2VuID0+IHtcblx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCB0b2tlbikpIHtcblx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0Y29uc3QgWyByZXN0LCBpc0xhenkgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19MYXp5LCB0b2tlbnMuaGVhZCgpKSA/IFsgdG9rZW5zLnRhaWwoKSwgdHJ1ZSBdIDogWyB0b2tlbnMsIGZhbHNlIF1cblx0XHRcdGNvbnN0IG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRjb25zdCBvcFR5cGUgPSBvcElmKCFyZXN0Mi5pc0VtcHR5KCksICgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0tleXdvcmQoS1dfVHlwZSwgY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9uLnNob3coKX1gKVxuXHRcdFx0XHRyZXR1cm4gcGFyc2VTcGFjZWQodG9rZW5zVHlwZSlcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHRva2VuLmxvYywgbmFtZSwgb3BUeXBlLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpXG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlUGxhaW4odG9rZW4ubG9jLCBfcGFyc2VMb2NhbE5hbWUodG9rZW4pKVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoaXNLZXl3b3JkKEtXX0ZvY3VzLCB0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGNvbnRleHQuY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0LnNob3coKX1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGNvbnRleHQuY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0b2tlbiA9PiB7XG5cdGNvbnN0IHsgbG9jIH0gPSB0b2tlblxuXHRyZXR1cm4gdG9rZW4gaW5zdGFuY2VvZiBOYW1lID9cblx0X2FjY2Vzcyh0b2tlbi5uYW1lLCBsb2MpIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBHcm91cCA/ICgoKSA9PiB7XG5cdFx0Y29uc3Qgc2xpY2UgPSBTbGljZS5ncm91cCh0b2tlbilcblx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdGNhc2UgR19TcGFjZTpcblx0XHRcdFx0cmV0dXJuIHBhcnNlU3BhY2VkKHNsaWNlKVxuXHRcdFx0Y2FzZSBHX1BhcmVudGhlc2lzOlxuXHRcdFx0XHRyZXR1cm4gcGFyc2VFeHByKHNsaWNlKVxuXHRcdFx0Y2FzZSBHX0JyYWNrZXQ6XG5cdFx0XHRcdHJldHVybiBCYWdTaW1wbGUobG9jLCBwYXJzZUV4cHJQYXJ0cyhzbGljZSkpXG5cdFx0XHRjYXNlIEdfQmxvY2s6XG5cdFx0XHRcdHJldHVybiBibG9ja1dyYXAoc2xpY2UpXG5cdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdHJldHVybiBRdW90ZShsb2MsXG5cdFx0XHRcdFx0c2xpY2UubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKHRva2VuLmtpbmQpXG5cdFx0fVxuXHR9KSgpIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBOdW1iZXJMaXRlcmFsID9cblx0dG9rZW4gOlxuXHR0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQgP1xuXHRcdHRva2VuLmtpbmQgPT09IEtXX0ZvY3VzID9cblx0XHRcdExvY2FsQWNjZXNzLmZvY3VzKGxvYykgOlxuXHRcdFx0aWZFbHNlKG9wS2V5d29yZEtpbmRUb1NwZWNpYWxWYWx1ZUtpbmQodG9rZW4ua2luZCksXG5cdFx0XHRcdF8gPT4gU3BlY2lhbFZhbChsb2MsIF8pLFxuXHRcdFx0XHQoKSA9PiB1bmV4cGVjdGVkKHRva2VuKSkgOlxuXHR0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUgP1xuXHRcdHRva2VuLm5Eb3RzID09PSAxID8gTWVtYmVyKHRva2VuLmxvYywgTG9jYWxBY2Nlc3ModG9rZW4ubG9jLCAndGhpcycpLCB0b2tlbi5uYW1lKSA6XG5cdFx0dG9rZW4ubkRvdHMgPT09IDMgPyBTcGxhdChsb2MsIExvY2FsQWNjZXNzKGxvYywgdG9rZW4ubmFtZSkpIDpcblx0XHR1bmV4cGVjdGVkKHRva2VuKSA6XG5cdHVuZXhwZWN0ZWQodG9rZW4pXG59XG5cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoaXNLZXl3b3JkKEtXX1R5cGUsIGgpKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSwgTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpKVxuXHRlbHNlIGlmIChpc0tleXdvcmQoS1dfTGF6eSwgaCkpXG5cdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRlbHNlIHtcblx0XHRsZXQgYWNjID0gcGFyc2VTaW5nbGUoaClcblx0XHRmb3IgKGxldCBpID0gcmVzdC5zdGFydDsgaSA8IHJlc3QuZW5kOyBpID0gaSArIDEpIHtcblx0XHRcdGNvbnN0IHRva2VuID0gcmVzdC50b2tlbnNbaV1cblx0XHRcdGNvbnN0IGxvYyA9IHRva2VuLmxvY1xuXHRcdFx0aWYgKHRva2VuIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKHRva2VuLm5Eb3RzID09PSAxLCB0b2tlbi5sb2MsICdUb28gbWFueSBkb3RzIScpXG5cdFx0XHRcdGFjYyA9IE1lbWJlcih0b2tlbi5sb2MsIGFjYywgdG9rZW4ubmFtZSlcblx0XHRcdFx0Y29udGludWVcblx0XHRcdH1cblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfRm9jdXM6XG5cdFx0XHRcdFx0XHRhY2MgPSBDYWxsKHRva2VuLmxvYywgYWNjLCBbIExvY2FsQWNjZXNzLmZvY3VzKGxvYykgXSlcblx0XHRcdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHRcdFx0Y2FzZSBLV19UeXBlOiB7XG5cdFx0XHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQodG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIENhbGwuY29udGFpbnModG9rZW4ubG9jLCB0eXBlLCBhY2MpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEdyb3VwKVxuXHRcdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0XHRjYXNlIEdfQnJhY2tldDpcblx0XHRcdFx0XHRcdGFjYyA9IENhbGwuc3ViKGxvYywgdW5zaGlmdChhY2MsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHRva2VuKSkpKVxuXHRcdFx0XHRcdFx0Y29udGludWVcblx0XHRcdFx0XHRjYXNlIEdfUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0XHRjaGVja0VtcHR5KFNsaWNlLmdyb3VwKHRva2VuKSwgKCkgPT5cblx0XHRcdFx0XHRcdFx0YFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRcdGFjYyA9IENhbGwobG9jLCBhY2MsIFtdKVxuXHRcdFx0XHRcdFx0Y29udGludWVcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR9XG5cdFx0XHRjb250ZXh0LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3Rva2VufWApXG5cdFx0fVxuXHRcdHJldHVybiBhY2Ncblx0fVxufVxuXG5jb25zdCB0cnlQYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdGNvbnN0IGxpbmUwID0gdG9rZW5zLmhlYWRTbGljZSgpXG5cdFx0aWYgKGlzS2V5d29yZChrLCBsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKHVzZUtleXdvcmRLaW5kLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5cblx0XHRcdGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUodXNlS2V5d29yZEtpbmQpfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXBTbGljZXMobGluZSA9PiB7XG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUobGluZS5oZWFkKCkpXG5cdFx0XHRpZiAodXNlS2V5d29yZEtpbmQgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnNpemUoKSA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnNlY29uZCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obGluZS5sb2MsIHBhdGgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSB1c2VLZXl3b3JkS2luZCA9PT0gS1dfVXNlTGF6eSB8fFxuXHRcdFx0XHRcdHVzZUtleXdvcmRLaW5kID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgbGluZS50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBVc2UobGluZS5sb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlVW50eXBlZCh0b2tlbnMubG9jLCBuYW1lLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbIF0sIG9wVXNlRGVmYXVsdDogdXNlRGVmYXVsdCgpIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IFsgb3BVc2VEZWZhdWx0LCByZXN0IF0gPVxuXHRcdFx0XHRpc0tleXdvcmQoS1dfRm9jdXMsIHRva2Vucy5oZWFkKCkpID9cblx0XHRcdFx0XHRbIHVzZURlZmF1bHQoKSwgdG9rZW5zLnRhaWwoKSBdIDpcblx0XHRcdFx0XHRbIG51bGwsIHRva2VucyBdXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0XHRcdGwua2luZCA9IExEX0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzR3JvdXAoR19TcGFjZSwgdCksIHQubG9jLCAnTm90IGEgdmFsaWQgbW9kdWxlIG5hbWUuJylcblx0XHRcdHJldHVybiBfcGFyc2VMb2NhbFJlcXVpcmUoU2xpY2UuZ3JvdXAodCkpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsUmVxdWlyZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0bGV0IHBhcnRzXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHBhcnRzID0gX3BhcnRzRnJvbURvdE5hbWUoZmlyc3QpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0b2tlbiA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRva2VuIGluc3RhbmNlb2YgRG90TmFtZSAmJiB0b2tlbi5uRG90cyA9PT0gMSwgdG9rZW4ubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0b2tlbi5uYW1lKVxuXHRcdH0pXG5cdFx0cmV0dXJuIHsgcGF0aDogcGFydHMuam9pbignLycpLCBuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWUgfVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuXG5jb25zdFxuXHRfcGFyc2VGb3IgPSBjdHIgPT4gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRyZXR1cm4gY3RyKHRva2Vucy5sb2MsIF9wYXJzZU9wSXRlcmF0ZWUoYmVmb3JlKSwgcGFyc2VCbG9ja0RvKGJsb2NrKSlcblx0fSxcblx0X3BhcnNlT3BJdGVyYXRlZSA9IHRva2VucyA9PlxuXHRcdG9wSWYoIXRva2Vucy5pc0VtcHR5KCksICgpID0+IHtcblx0XHRcdGNvbnN0IFsgZWxlbWVudCwgYmFnIF0gPVxuXHRcdFx0XHRpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfSW4sIF8pKSxcblx0XHRcdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soYmVmb3JlLnNpemUoKSA9PT0gMSwgYmVmb3JlLmxvYywgJ1RPRE86IHBhdHRlcm4gaW4gZm9yJylcblx0XHRcdFx0XHRcdHJldHVybiBbIHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhiZWZvcmUpWzBdLCBwYXJzZUV4cHIoYWZ0ZXIpIF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCgpID0+IFsgTG9jYWxEZWNsYXJlRm9jdXModG9rZW5zLmxvYyksIHBhcnNlRXhwcih0b2tlbnMpIF0pXG5cdFx0XHRyZXR1cm4gSXRlcmF0ZWUodG9rZW5zLmxvYywgZWxlbWVudCwgYmFnKVxuXHRcdH0pXG5jb25zdFxuXHRwYXJzZUZvckRvID0gX3BhcnNlRm9yKEZvckRvKSxcblx0cGFyc2VGb3JWYWwgPSBfcGFyc2VGb3IoRm9yVmFsKSxcblx0Ly8gVE9ETzogLT4gb3V0LXR5cGVcblx0cGFyc2VGb3JCYWcgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VCbG9ja0RvKGxpbmVzKVxuXHRcdC8vIFRPRE86IEJldHRlciB3YXk/XG5cdFx0aWYgKGJsb2NrLmxpbmVzLmxlbmd0aCA9PT0gMSAmJiBibG9jay5saW5lc1swXSBpbnN0YW5jZW9mIFZhbClcblx0XHRcdGJsb2NrLmxpbmVzWzBdID0gQmFnRW50cnkoYmxvY2subGluZXNbMF0ubG9jLCBibG9jay5saW5lc1swXSlcblx0XHRyZXR1cm4gRm9yQmFnLm9mKHRva2Vucy5sb2MsIF9wYXJzZU9wSXRlcmF0ZWUoYmVmb3JlKSwgYmxvY2spXG5cdH1cblxuXG5jb25zdFxuXHRwYXJzZUV4Y2VwdCA9IChrd0V4Y2VwdCwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3Rcblx0XHRcdGlzVmFsID0ga3dFeGNlcHQgPT09IEtXX0V4Y2VwdFZhbCxcblx0XHRcdGp1c3REb1ZhbEJsb2NrID0gaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbyxcblx0XHRcdHBhcnNlQmxvY2sgPSBpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8sXG5cdFx0XHRFeGNlcHQgPSBpc1ZhbCA/IEV4Y2VwdFZhbCA6IEV4Y2VwdERvLFxuXHRcdFx0a3dUcnkgPSBpc1ZhbCA/IEtXX1RyeVZhbCA6IEtXX1RyeURvLFxuXHRcdFx0a3dDYXRjaCA9IGlzVmFsID8gS1dfQ2F0Y2hWYWwgOiBLV19DYXRjaERvLFxuXHRcdFx0bmFtZVRyeSA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoa3dUcnkpKSxcblx0XHRcdG5hbWVDYXRjaCA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoa3dDYXRjaCkpLFxuXHRcdFx0bmFtZUZpbmFsbHkgPSAoKSA9PiBjb2RlKGtleXdvcmROYW1lKEtXX0ZpbmFsbHkpKVxuXG5cdFx0Y29uc3QgbGluZXMgPSBqdXN0QmxvY2soa3dFeGNlcHQsIHRva2VucylcblxuXHRcdC8vIGB0cnlgICptdXN0KiBjb21lIGZpcnN0LlxuXHRcdGNvbnN0IGZpcnN0TGluZSA9IGxpbmVzLmhlYWRTbGljZSgpXG5cdFx0Y29uc3QgdG9rZW5UcnkgPSBmaXJzdExpbmUuaGVhZCgpXG5cdFx0Y29udGV4dC5jaGVjayhpc0tleXdvcmQoa3dUcnksIHRva2VuVHJ5KSwgdG9rZW5UcnkubG9jLCAoKSA9PlxuXHRcdFx0YE11c3Qgc3RhcnQgd2l0aCAke25hbWVUcnkoKX1gKVxuXHRcdGNvbnN0IF90cnkgPSBqdXN0RG9WYWxCbG9jayhrd1RyeSwgZmlyc3RMaW5lLnRhaWwoKSlcblxuXHRcdGNvbnN0IHJlc3RMaW5lcyA9IGxpbmVzLnRhaWwoKVxuXHRcdGNoZWNrTm9uRW1wdHkocmVzdExpbmVzLCAoKSA9PlxuXHRcdFx0YE11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgJHtuYW1lQ2F0Y2goKX0gb3IgJHtuYW1lRmluYWxseSgpfWApXG5cblx0XHRjb25zdCBoYW5kbGVGaW5hbGx5ID0gcmVzdExpbmVzID0+IHtcblx0XHRcdGNvbnN0IGxpbmUgPSByZXN0TGluZXMuaGVhZFNsaWNlKClcblx0XHRcdGNvbnN0IHRva2VuRmluYWxseSA9IGxpbmUuaGVhZCgpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChLV19GaW5hbGx5LCB0b2tlbkZpbmFsbHkpLCB0b2tlbkZpbmFsbHkubG9jLCAoKSA9PlxuXHRcdFx0XHRgRXhwZWN0ZWQgJHtuYW1lRmluYWxseSgpfWApXG5cdFx0XHRjb250ZXh0LmNoZWNrKHJlc3RMaW5lcy5zaXplKCkgPT09IDEsIHJlc3RMaW5lcy5sb2MsICgpID0+XG5cdFx0XHRcdGBOb3RoaW5nIGlzIGFsbG93ZWQgdG8gY29tZSBhZnRlciAke25hbWVGaW5hbGx5KCl9LmApXG5cdFx0XHRyZXR1cm4ganVzdEJsb2NrRG8oS1dfRmluYWxseSwgbGluZS50YWlsKCkpXG5cdFx0fVxuXG5cdFx0bGV0IF9jYXRjaCwgX2ZpbmFsbHlcblxuXHRcdGNvbnN0IGxpbmUyID0gcmVzdExpbmVzLmhlYWRTbGljZSgpXG5cdFx0Y29uc3QgaGVhZDIgPSBsaW5lMi5oZWFkKClcblx0XHRpZiAoaXNLZXl3b3JkKGt3Q2F0Y2gsIGhlYWQyKSkge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUyLCBibG9jazIgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUyLnRhaWwoKSlcblx0XHRcdGNvbnN0IGNhdWdodCA9IF9wYXJzZU9uZUxvY2FsRGVjbGFyZU9yRm9jdXMoYmVmb3JlMilcblx0XHRcdF9jYXRjaCA9IENhdGNoKGxpbmUyLmxvYywgY2F1Z2h0LCBwYXJzZUJsb2NrKGJsb2NrMikpXG5cdFx0XHRfZmluYWxseSA9IG9wSWYocmVzdExpbmVzLnNpemUoKSA+IDEsICgpID0+IGhhbmRsZUZpbmFsbHkocmVzdExpbmVzLnRhaWwoKSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdF9jYXRjaCA9IG51bGxcblx0XHRcdF9maW5hbGx5ID0gaGFuZGxlRmluYWxseShyZXN0TGluZXMpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIEV4Y2VwdCh0b2tlbnMubG9jLCBfdHJ5LCBfY2F0Y2gsIF9maW5hbGx5KVxuXHR9LFxuXHRfcGFyc2VPbmVMb2NhbERlY2xhcmVPckZvY3VzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmVGb2N1cyh0b2tlbnMubG9jKVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuc2l6ZSgpID09PSAxLCAnRXhwZWN0ZWQgb25seSBvbmUgbG9jYWwgZGVjbGFyZS4nKVxuXHRcdFx0cmV0dXJuIHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpWzBdXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlQXNzZXJ0ID0gKG5lZ2F0ZSwgdG9rZW5zKSA9PiB7XG5cdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7a2V5d29yZE5hbWUoS1dfQXNzZXJ0KX0uYClcblxuXHRjb25zdCBbIGNvbmRUb2tlbnMsIG9wVGhyb3duIF0gPVxuXHRcdGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfID0+IGlzS2V5d29yZChLV19UaHJvdywgXykpLFxuXHRcdFx0KHsgYmVmb3JlLCBhZnRlciB9KSA9PiBbIGJlZm9yZSwgcGFyc2VFeHByKGFmdGVyKSBdLFxuXHRcdFx0KCkgPT4gWyB0b2tlbnMsIG51bGwgXSlcblxuXHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKGNvbmRUb2tlbnMpXG5cdGNvbnN0IGNvbmQgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBwYXJ0c1swXSA6IENhbGwoY29uZFRva2Vucy5sb2MsIHBhcnRzWzBdLCB0YWlsKHBhcnRzKSlcblx0cmV0dXJuIEFzc2VydCh0b2tlbnMubG9jLCBuZWdhdGUsIGNvbmQsIG9wVGhyb3duKVxufVxuXG5jb25zdCBwYXJzZUNsYXNzID0gdG9rZW5zID0+IHtcblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdGNvbnN0IG9wRXh0ZW5kZWQgPSBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PiBwYXJzZUV4cHIoYmVmb3JlKSlcblxuXHRjb25zdCBsaW5lMSA9IGJsb2NrLmhlYWRTbGljZSgpXG5cdGNvbnN0IFsgc3RhdGljcywgcmVzdCBdID0gaXNLZXl3b3JkKEtXX1N0YXRpYywgbGluZTEuaGVhZCgpKSA/XG5cdFx0WyBfcGFyc2VTdGF0aWNzKGxpbmUxLnRhaWwoKSksIGJsb2NrLnRhaWwoKSBdIDpcblx0XHRbIFsgXSwgYmxvY2sgXVxuXG5cdGNvbnN0IGxpbmUyID0gcmVzdC5oZWFkU2xpY2UoKVxuXHRjb25zdCBbIG9wQ29uc3RydWN0b3IsIHJlc3QyIF0gPSBpc0tleXdvcmQoS1dfQ29uc3RydWN0LCBsaW5lMi5oZWFkKCkpID9cblx0XHRbIF9wYXJzZUNvbnN0cnVjdG9yKGxpbmUyLnRhaWwoKSksIHJlc3QudGFpbCgpIF0gOlxuXHRcdFsgbnVsbCwgcmVzdCBdXG5cblx0Y29uc3QgbWV0aG9kcyA9IF9wYXJzZU1ldGhvZHMocmVzdDIpXG5cblx0cmV0dXJuIENsYXNzKHRva2Vucy5sb2MsIG9wRXh0ZW5kZWQsIHN0YXRpY3MsIG9wQ29uc3RydWN0b3IsIG1ldGhvZHMpXG59XG5cbmNvbnN0XG5cdF9wYXJzZUNvbnN0cnVjdG9yID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHRydWUsIHRva2Vucylcblx0XHRjb25zdCBpc0dlbmVyYXRvciA9IGZhbHNlLCBvcERlY2xhcmVSZXMgPSBudWxsXG5cdFx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLFxuXHRcdFx0TG9jYWxEZWNsYXJlVGhpcyh0b2tlbnMubG9jKSxcblx0XHRcdGlzR2VuZXJhdG9yLFxuXHRcdFx0YXJncywgb3BSZXN0QXJnLFxuXHRcdFx0YmxvY2ssIG9wSW4sIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cdF9wYXJzZVN0YXRpY3MgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0ganVzdEJsb2NrKEtXX1N0YXRpYywgdG9rZW5zKVxuXHRcdHJldHVybiBfcGFyc2VNZXRob2RzKGJsb2NrKVxuXHR9LFxuXHRfcGFyc2VNZXRob2RzID0gdG9rZW5zID0+IHRva2Vucy5tYXBTbGljZXMoX3BhcnNlTWV0aG9kKSxcblx0X3BhcnNlTWV0aG9kID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXG5cdFx0aWYgKGlzS2V5d29yZChLV19HZXQsIGhlYWQpIHx8IGlzS2V5d29yZChLV19TZXQsIGhlYWQpKVxuXHRcdFx0Y29udGV4dC5mYWlsKGhlYWQubG9jLCAnVE9ETzogZ2V0L3NldCEnKVxuXG5cdFx0Y29uc3QgYmFhID0gdG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoX2lzRnVuS2V5d29yZClcblx0XHRjb250ZXh0LmNoZWNrKGJhYSAhPT0gbnVsbCwgdG9rZW5zLmxvYywgJ0V4cGVjdGVkIGEgZnVuY3Rpb24ga2V5d29yZCBzb21ld2hlcmUuJylcblxuXHRcdGNvbnN0IHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSA9IGJhYVxuXG5cdFx0Y29uc3Qga2luZCA9IF9tZXRob2RGdW5LaW5kKGF0KVxuXHRcdGNvbnN0IGZ1biA9IHBhcnNlRnVuKGtpbmQsIGFmdGVyKVxuXHRcdGFzc2VydChmdW4ub3BOYW1lID09PSBudWxsKVxuXG5cdFx0bGV0IHN5bWJvbCA9IHBhcnNlRXhwcihiZWZvcmUpXG5cdFx0aWYgKHN5bWJvbCBpbnN0YW5jZW9mIFF1b3RlICYmXG5cdFx0XHRzeW1ib2wucGFydHMubGVuZ3RoID09PSAxICYmXG5cdFx0XHR0eXBlb2Ygc3ltYm9sLnBhcnRzWzBdID09PSAnc3RyaW5nJykge1xuXHRcdFx0ZnVuLm9wTmFtZSA9IHN5bWJvbC5wYXJ0c1swXVxuXHRcdFx0cmV0dXJuIGZ1blxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIE1ldGhvZEltcGwodG9rZW5zLmxvYywgc3ltYm9sLCBmdW4pXG5cdH0sXG5cdF9tZXRob2RGdW5LaW5kID0gZnVuS2luZFRva2VuID0+IHtcblx0XHRzd2l0Y2ggKGZ1bktpbmRUb2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEtXX0Z1bjogcmV0dXJuIEtXX0Z1blRoaXNcblx0XHRcdGNhc2UgS1dfRnVuRG86IHJldHVybiBLV19GdW5UaGlzRG9cblx0XHRcdGNhc2UgS1dfRnVuR2VuOiByZXR1cm4gS1dfRnVuVGhpc0dlblxuXHRcdFx0Y2FzZSBLV19GdW5HZW5EbzogcmV0dXJuIEtXX0Z1blRoaXNHZW5Eb1xuXHRcdFx0Y2FzZSBLV19GdW5UaGlzOiBjYXNlIEtXX0Z1blRoaXNEbzogY2FzZSBLV19GdW5UaGlzR2VuOiBjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdFx0Y29udGV4dC5mYWlsKGZ1bktpbmRUb2tlbi5sb2MsICdGdW5jdGlvbiBgLmAgaXMgaW1wbGljaXQgZm9yIG1ldGhvZHMuJylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnRleHQuZmFpbChmdW5LaW5kVG9rZW4ubG9jLCBgRXhwZWN0ZWQgZnVuY3Rpb24ga2luZCwgZ290ICR7ZnVuS2luZFRva2VufWApXG5cdFx0fVxuXHR9LFxuXHRfaXNGdW5LZXl3b3JkID0gZnVuS2luZFRva2VuID0+IHtcblx0XHRpZiAoZnVuS2luZFRva2VuIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoZnVuS2luZFRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfRnVuRG86IGNhc2UgS1dfRnVuR2VuOiBjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0XHRjYXNlIEtXX0Z1blRoaXM6IGNhc2UgS1dfRnVuVGhpc0RvOiBjYXNlIEtXX0Z1blRoaXNHZW46XG5cdFx0XHRcdGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9