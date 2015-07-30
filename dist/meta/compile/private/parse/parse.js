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

		const parts = partLines.mapSlices(_parseCaseLine(isVal));
		context.check(parts.length > 0, tokens.loc, () => `Must have at least 1 non-${ (0, _CompileError.code)('else') } test.`);

		return (isVal ? _MsAst.CaseVal : _MsAst.CaseDo)(tokens.loc, opCased, parts, opElse);
	};
	// parseCase privates
	const _parseCaseLine = isVal => line => {
		var _beforeAndBlock4 = beforeAndBlock(line);

		var _beforeAndBlock42 = _slicedToArray(_beforeAndBlock4, 2);

		const before = _beforeAndBlock42[0];
		const block = _beforeAndBlock42[1];

		const test = _parseCaseTest(before);
		const result = (isVal ? parseBlockVal : parseBlockDo)(block);
		return (isVal ? _MsAst.CaseValPart : _MsAst.CaseDoPart)(line.loc, test, result);
	},
	      _parseCaseTest = tokens => {
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

	const parseSwitch = (isVal, tokens) => {
		var _beforeAndBlock5 = beforeAndBlock(tokens);

		var _beforeAndBlock52 = _slicedToArray(_beforeAndBlock5, 2);

		const before = _beforeAndBlock52[0];
		const block = _beforeAndBlock52[1];

		const switched = parseExpr(before);
		const lastLine = _Slice2.default.group(block.last());

		var _ref3 = (0, _Token.isKeyword)(_Token.KW_Else, lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(_Token.KW_Else, lastLine.tail())] : [block, null];

		var _ref32 = _slicedToArray(_ref3, 2);

		const partLines = _ref32[0];
		const opElse = _ref32[1];

		const parts = partLines.mapSlices(_parseSwitchLine(isVal));
		context.check(parts.length > 0, tokens.loc, () => `Must have at least 1 non-${ (0, _CompileError.code)('else') } test.`);

		return (isVal ? _MsAst.SwitchVal : _MsAst.SwitchDo)(tokens.loc, switched, parts, opElse);
	};
	const _parseSwitchLine = isVal => line => {
		var _beforeAndBlock6 = beforeAndBlock(line);

		var _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2);

		const before = _beforeAndBlock62[0];
		const block = _beforeAndBlock62[1];

		const value = parseExpr(before);
		const result = (isVal ? parseBlockVal : parseBlockDo)(block);
		return (isVal ? _MsAst.SwitchValPart : _MsAst.SwitchDoPart)(line.loc, value, result);
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
	},
	      parseExprParts = tokens => {
		const opSplit = tokens.opSplitOnceWhere(token => {
			if (token instanceof _Token.Keyword) switch (token.kind) {
				case _Token.KW_And:case _Token.KW_CaseVal:case _Token.KW_Class:case _Token.KW_ExceptVal:case _Token.KW_ForBag:
				case _Token.KW_ForVal:case _Token.KW_Fun:case _Token.KW_FunDo:case _Token.KW_FunGen:case _Token.KW_FunGenDo:
				case _Token.KW_FunThis:case _Token.KW_FunThisDo:case _Token.KW_FunThisGen:case _Token.KW_FunThisGenDo:
				case _Token.KW_IfVal:case _Token.KW_New:case _Token.KW_Not:case _Token.KW_Or:case _Token.KW_SwitchVal:
				case _Token.KW_UnlessVal:case _Token.KW_Yield:case _Token.KW_YieldTo:
					return true;
				default:
					return false;
			}
			return false;
		});
		return (0, _util.ifElse)(opSplit, _ref4 => {
			let before = _ref4.before;
			let at = _ref4.at;
			let after = _ref4.after;

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
							var _beforeAndBlock7 = beforeAndBlock(after);

							var _beforeAndBlock72 = _slicedToArray(_beforeAndBlock7, 2);

							const before = _beforeAndBlock72[0];
							const block = _beforeAndBlock72[1];

							return (0, _MsAst.ConditionalVal)(tokens.loc, parseExprPlain(before), parseBlockVal(block), at.kind === _Token.KW_UnlessVal);
						}
					case _Token.KW_New:
						{
							const parts = parseExprParts(after);
							return (0, _MsAst.New)(at.loc, parts[0], (0, _util.tail)(parts));
						}
					case _Token.KW_Not:
						return (0, _MsAst.Not)(at.loc, parseExprPlain(after));
					case _Token.KW_SwitchVal:
						return parseSwitch(true, after);
					case _Token.KW_Yield:
						return (0, _MsAst.Yield)(at.loc, parseExprPlain(after));
					case _Token.KW_YieldTo:
						return (0, _MsAst.YieldTo)(at.loc, parseExprPlain(after));
					default:
						throw new Error(at.kind);
				}
			}();
			return (0, _util.push)(before.map(parseSingle), last);
		}, () => tokens.map(parseSingle));
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

		// Need res declare if there is a return type or out condition.
		const args = _funArgsAndBlock2.args;
		const opRestArg = _funArgsAndBlock2.opRestArg;
		const block = _funArgsAndBlock2.block;
		const opIn = _funArgsAndBlock2.opIn;
		const opOut = _funArgsAndBlock2.opOut;
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
			var _beforeAndBlock8 = beforeAndBlock(tokens);

			var _beforeAndBlock82 = _slicedToArray(_beforeAndBlock8, 2);

			const before = _beforeAndBlock82[0];
			const blockLines = _beforeAndBlock82[1];

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
					opRestArg: _MsAst.LocalDeclare.plain(l.loc, l.name)
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
			case _Token.KW_Break:
				noRest();
				return (0, _MsAst.Break)(tokens.loc);
			case _Token.KW_BreakWithVal:
				return (0, _MsAst.BreakWithVal)(tokens.loc, parseExpr(rest));
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
				return (0, _MsAst.SpecialDo)(tokens.loc, _MsAst.SD_Debugger);
			case _Token.KW_Ellipsis:
				return (0, _MsAst.BagEntryMany)(tokens.loc, parseExpr(rest));
			case _Token.KW_ForDo:
				return parseForDo(rest);
			case _Token.KW_IfDo:case _Token.KW_UnlessDo:
				{
					var _beforeAndBlock9 = beforeAndBlock(rest);

					var _beforeAndBlock92 = _slicedToArray(_beforeAndBlock9, 2);

					const before = _beforeAndBlock92[0];
					const block = _beforeAndBlock92[1];

					return (0, _MsAst.ConditionalDo)(tokens.loc, parseExpr(before), parseBlockDo(block), head.kind === _Token.KW_UnlessDo);
				}
			case _Token.KW_ObjAssign:
				return (0, _MsAst.BagEntry)(tokens.loc, parseExpr(rest));
			case _Token.KW_Pass:
				noRest();
				return [];
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			case _Token.KW_SwitchDo:
				return parseSwitch(false, rest);
			case _Token.KW_Throw:
				return (0, _MsAst.Throw)(tokens.loc, (0, _util.opIf)(!rest.isEmpty(), () => parseExpr(rest)));
			default:
			// fall through
		}

		return (0, _util.ifElse)(tokens.opSplitOnceWhere(_isLineSplitKeyword), _ref5 => {
			let before = _ref5.before;
			let at = _ref5.at;
			let after = _ref5.after;
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
		if (_ instanceof _MsAst.Fun || _ instanceof _MsAst.Class) _.opName = name;else if ((_ instanceof _MsAst.Call || _ instanceof _MsAst.New) && !(0, _util.isEmpty)(_.args)) _tryAddObjName((0, _util.last)(_.args), name);else _tryAddObjName(_, name);
	},
	      _tryAddObjName = (_, name) => {
		if (_ instanceof _MsAst.BlockWrap && _.block instanceof _MsAst.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _MsAst.Fun) _.block.opObjed.opName = name;else if (!_nameObjAssignSomewhere(_.block.lines)) _.block.opName = name;
	},
	      _nameObjAssignSomewhere = lines => lines.some(line => line instanceof _MsAst.ObjEntry && line.assign.allAssignees().some(_ => _.name === 'name')),
	      _parseMapEntry = (before, after, loc) => (0, _MsAst.MapEntry)(loc, parseExpr(before), parseExpr(after));

	const parseLocalDeclaresJustNames = tokens => tokens.map(_ => _MsAst.LocalDeclare.plain(_.loc, _parseLocalName(_))),
	      parseLocalDeclares = tokens => tokens.map(parseLocalDeclare),
	      parseLocalDeclare = token => {
		if ((0, _Token.isGroup)(_Token.G_Space, token)) {
			const tokens = _Slice2.default.group(token);

			var _ref6 = (0, _Token.isKeyword)(_Token.KW_Lazy, tokens.head()) ? [tokens.tail(), true] : [tokens, false];

			var _ref62 = _slicedToArray(_ref6, 2);

			const rest = _ref62[0];
			const isLazy = _ref62[1];

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
		} else return _MsAst.LocalDeclare.plain(token.loc, _parseLocalName(token));
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
					return parseQuote(slice);
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
				if (token instanceof _Token.Group) {
					const slice = _Slice2.default.group(token);
					switch (token.kind) {
						case _Token.G_Bracket:
							acc = _MsAst.Call.sub(loc, (0, _util.unshift)(acc, parseExprParts(slice)));
							continue;
						case _Token.G_Parenthesis:
							checkEmpty(slice, () => `Use ${ (0, _CompileError.code)('(a b)') }, not ${ (0, _CompileError.code)('a(b)') }`);
							acc = (0, _MsAst.Call)(loc, acc, []);
							continue;
						case _Token.G_Quote:
							acc = (0, _MsAst.QuoteTemplate)(loc, acc, parseQuote(slice));
							continue;
						default:
					}
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
		var _beforeAndBlock10 = beforeAndBlock(tokens);

		var _beforeAndBlock102 = _slicedToArray(_beforeAndBlock10, 2);

		const before = _beforeAndBlock102[0];
		const lines = _beforeAndBlock102[1];

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
		const useDefault = () => _MsAst.LocalDeclare.untyped(tokens.loc, name, isLazy ? _MsAst.LD_Lazy : _MsAst.LD_Const);
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref7 = (0, _Token.isKeyword)(_Token.KW_Focus, tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref72 = _slicedToArray(_ref7, 2);

			const opUseDefault = _ref72[0];
			const rest = _ref72[1];

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
		var _beforeAndBlock11 = beforeAndBlock(tokens);

		var _beforeAndBlock112 = _slicedToArray(_beforeAndBlock11, 2);

		const before = _beforeAndBlock112[0];
		const block = _beforeAndBlock112[1];

		return ctr(tokens.loc, _parseOpIteratee(before), parseBlockDo(block));
	},
	      _parseOpIteratee = tokens => (0, _util.opIf)(!tokens.isEmpty(), () => {
		var _ifElse = (0, _util.ifElse)(tokens.opSplitOnceWhere(_ => (0, _Token.isKeyword)(_Token.KW_In, _)), _ref8 => {
			let before = _ref8.before;
			let after = _ref8.after;

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
		var _beforeAndBlock12 = beforeAndBlock(tokens);

		var _beforeAndBlock122 = _slicedToArray(_beforeAndBlock12, 2);

		const before = _beforeAndBlock122[0];
		const lines = _beforeAndBlock122[1];

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
			var _beforeAndBlock13 = beforeAndBlock(line2.tail());

			var _beforeAndBlock132 = _slicedToArray(_beforeAndBlock13, 2);

			const before2 = _beforeAndBlock132[0];
			const block2 = _beforeAndBlock132[1];

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

		var _ifElse3 = (0, _util.ifElse)(tokens.opSplitOnceWhere(_ => (0, _Token.isKeyword)(_Token.KW_Throw, _)), _ref9 => {
			let before = _ref9.before;
			let after = _ref9.after;
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
		var _beforeAndBlock14 = beforeAndBlock(tokens);

		var _beforeAndBlock142 = _slicedToArray(_beforeAndBlock14, 2);

		const before = _beforeAndBlock142[0];
		const block = _beforeAndBlock142[1];

		const opExtended = (0, _util.opIf)(!before.isEmpty(), () => parseExpr(before));

		let opDo = null,
		    statics = [],
		    opConstructor = null,
		    methods = [];

		let rest = block;
		const line1 = rest.headSlice();
		if ((0, _Token.isKeyword)(_Token.KW_Do, line1.head())) {
			const done = justBlockDo(_Token.KW_Do, line1.tail());
			opDo = (0, _MsAst.ClassDo)(line1.loc, (0, _MsAst.LocalDeclareFocus)(line1.loc, done), done);
			rest = block.tail();
		}
		if (!rest.isEmpty()) {
			const line2 = rest.headSlice();
			if ((0, _Token.isKeyword)(_Token.KW_Static, line2.head())) {
				statics = _parseStatics(line2.tail());
				rest = rest.tail();
			}
			if (!rest.isEmpty()) {
				const line3 = rest.headSlice();
				if ((0, _Token.isKeyword)(_Token.KW_Construct, line3.head())) {
					opConstructor = _parseConstructor(line3.tail());
					rest = rest.tail();
				}
				methods = _parseMethods(rest);
			}
		}

		return (0, _MsAst.Class)(tokens.loc, opExtended, opDo, statics, opConstructor, methods);
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

	const parseQuote = tokens => (0, _MsAst.Quote)(tokens.loc, tokens.map(_ => typeof _ === 'string' ? _ : parseSingle(_)));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLEtBQUksT0FBTyxDQUFBOzs7Ozs7Ozs7Ozs7O2tCQVlJLENBQUMsUUFBUSxFQUFFLFNBQVMsS0FBSztBQUN2QyxTQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFlBckJRLE1BQU0sRUFxQlAsV0EvQnNFLE9BQU8sU0FBNUQsT0FBTyxFQStCUCxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTs7QUFFakQsU0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUNuQixTQUFPLEtBQUssQ0FBQTtFQUNaOztBQUVELE9BQ0MsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7T0FDckQsYUFBYSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztPQUN0RCxVQUFVLEdBQUcsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRTVFLE9BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSTs7O3NCQUVILFlBQVksUUF2Q21CLFFBQVEsRUF1Q2hCLE1BQU0sQ0FBQzs7OztRQUFoRCxNQUFNO1FBQUUsS0FBSzs7dUJBQ1EsWUFBWSxRQXhDTCxNQUFNLEVBd0NRLEtBQUssQ0FBQzs7OztRQUFoRCxTQUFTO1FB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QyxDQUFDLElBQUksQUFBQyxPQUFPLENBQUMsS0FBSyxRQUFRLEdBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2VydCwgQXNzaWduRGVzdHJ1Y3R1cmUsIEFzc2lnblNpbmdsZSwgQmFnRW50cnksIEJhZ0VudHJ5TWFueSwgQmFnU2ltcGxlLCBCbG9ja0JhZyxcblx0QmxvY2tEbywgQmxvY2tNYXAsIEJsb2NrT2JqLCBCbG9ja1ZhbFRocm93LCBCbG9ja1dpdGhSZXR1cm4sIEJsb2NrV3JhcCwgQnJlYWssIEJyZWFrV2l0aFZhbCxcblx0Q2FsbCwgQ2FzZURvLCBDYXNlRG9QYXJ0LCBDYXNlVmFsLCBDYXNlVmFsUGFydCwgQ2F0Y2gsIENsYXNzLCBDbGFzc0RvLCBDb25kaXRpb25hbERvLFxuXHRDb25kaXRpb25hbFZhbCwgQ29udGludWUsIERlYnVnLCBJdGVyYXRlZSwgTnVtYmVyTGl0ZXJhbCwgRXhjZXB0RG8sIEV4Y2VwdFZhbCwgRm9yQmFnLCBGb3JEbyxcblx0Rm9yVmFsLCBGdW4sIEdsb2JhbEFjY2VzcywgTF9BbmQsIExfT3IsIExhenksIExEX0NvbnN0LCBMRF9MYXp5LCBMRF9NdXRhYmxlLCBMb2NhbEFjY2Vzcyxcblx0TG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmVGb2N1cywgTG9jYWxEZWNsYXJlTmFtZSwgTG9jYWxEZWNsYXJlUmVzLCBMb2NhbERlY2xhcmVUaGlzLFxuXHRMb2NhbE11dGF0ZSwgTG9naWMsIE1hcEVudHJ5LCBNZW1iZXIsIE1lbWJlclNldCwgTWV0aG9kSW1wbCwgTW9kdWxlLCBNU19NdXRhdGUsIE1TX05ldyxcblx0TVNfTmV3TXV0YWJsZSwgTmV3LCBOb3QsIE9iakVudHJ5LCBPYmpQYWlyLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBRdW90ZVRlbXBsYXRlLFxuXHRTRF9EZWJ1Z2dlciwgU3BlY2lhbERvLCBTcGVjaWFsVmFsLCBTVl9OdWxsLCBTcGxhdCwgU3dpdGNoRG8sIFN3aXRjaERvUGFydCwgU3dpdGNoVmFsLFxuXHRTd2l0Y2hWYWxQYXJ0LCBUaHJvdywgVmFsLCBVc2UsIFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IHsgSnNHbG9iYWxzIH0gZnJvbSAnLi4vbGFuZ3VhZ2UnXG5pbXBvcnQgeyBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LCBHX1BhcmVudGhlc2lzLCBHX1NwYWNlLCBHX1F1b3RlLCBpc0dyb3VwLCBpc0tleXdvcmQsXG5cdEtleXdvcmQsIEtXX0FuZCwgS1dfQXNzZXJ0LCBLV19Bc3NlcnROb3QsIEtXX0Fzc2lnbiwgS1dfQXNzaWduTXV0YWJsZSwgS1dfQnJlYWssXG5cdEtXX0JyZWFrV2l0aFZhbCwgS1dfQ2FzZVZhbCwgS1dfQ2FzZURvLCBLV19DbGFzcywgS1dfQ2F0Y2hEbywgS1dfQ2F0Y2hWYWwsIEtXX0NvbnN0cnVjdCxcblx0S1dfQ29udGludWUsIEtXX0RlYnVnLCBLV19EZWJ1Z2dlciwgS1dfRG8sIEtXX0VsbGlwc2lzLCBLV19FbHNlLCBLV19FeGNlcHREbywgS1dfRXhjZXB0VmFsLFxuXHRLV19GaW5hbGx5LCBLV19Gb3JCYWcsIEtXX0ZvckRvLCBLV19Gb3JWYWwsIEtXX0ZvY3VzLCBLV19GdW4sIEtXX0Z1bkRvLCBLV19GdW5HZW4sIEtXX0Z1bkdlbkRvLFxuXHRLV19GdW5UaGlzLCBLV19GdW5UaGlzRG8sIEtXX0Z1blRoaXNHZW4sIEtXX0Z1blRoaXNHZW5EbywgS1dfR2V0LCBLV19JZkRvLCBLV19JZlZhbCwgS1dfSW4sXG5cdEtXX0xhenksIEtXX0xvY2FsTXV0YXRlLCBLV19NYXBFbnRyeSwgS1dfTmV3LCBLV19Ob3QsIEtXX09iakFzc2lnbiwgS1dfT3IsIEtXX1Bhc3MsIEtXX091dCxcblx0S1dfUmVnaW9uLCBLV19TZXQsIEtXX1N0YXRpYywgS1dfU3dpdGNoRG8sIEtXX1N3aXRjaFZhbCwgS1dfVGhyb3csIEtXX1RyeURvLCBLV19UcnlWYWwsXG5cdEtXX1R5cGUsIEtXX1VubGVzc0RvLCBLV19Vbmxlc3NWYWwsIEtXX1VzZSwgS1dfVXNlRGVidWcsIEtXX1VzZURvLCBLV19Vc2VMYXp5LCBLV19ZaWVsZCxcblx0S1dfWWllbGRUbywgTmFtZSwga2V5d29yZE5hbWUsIG9wS2V5d29yZEtpbmRUb1NwZWNpYWxWYWx1ZUtpbmQgfSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaGVhZCwgaWZFbHNlLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LFxuXHRvcElmLCBvcE1hcCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxuLy8gU2luY2UgdGhlcmUgYXJlIHNvIG1hbnkgcGFyc2luZyBmdW5jdGlvbnMsXG4vLyBpdCdzIGZhc3RlciAoYXMgb2Ygbm9kZSB2MC4xMS4xNCkgdG8gaGF2ZSB0aGVtIGFsbCBjbG9zZSBvdmVyIHRoaXMgbXV0YWJsZSB2YXJpYWJsZSBvbmNlXG4vLyB0aGFuIHRvIGNsb3NlIG92ZXIgdGhlIHBhcmFtZXRlciAoYXMgaW4gbGV4LmpzLCB3aGVyZSB0aGF0J3MgbXVjaCBmYXN0ZXIpLlxubGV0IGNvbnRleHRcblxuLypcblRoaXMgY29udmVydHMgYSBUb2tlbiB0cmVlIHRvIGEgTXNBc3QuXG5UaGlzIGlzIGEgcmVjdXJzaXZlLWRlc2NlbnQgcGFyc2VyLCBtYWRlIGVhc2llciBieSB0d28gZmFjdHM6XG5cdCogV2UgaGF2ZSBhbHJlYWR5IGdyb3VwZWQgdG9rZW5zLlxuXHQqIE1vc3Qgb2YgdGhlIHRpbWUsIGFuIGFzdCdzIHR5cGUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgdG9rZW4uXG5cblRoZXJlIGFyZSBleGNlcHRpb25zIHN1Y2ggYXMgYXNzaWdubWVudCBzdGF0ZW1lbnRzIChpbmRpY2F0ZWQgYnkgYSBgPWAgc29tZXdoZXJlIGluIHRoZSBtaWRkbGUpLlxuRm9yIHRob3NlIHdlIG11c3QgaXRlcmF0ZSB0aHJvdWdoIHRva2VucyBhbmQgc3BsaXQuXG4oU2VlIFNsaWNlLm9wU3BsaXRPbmNlV2hlcmUgYW5kIFNsaWNlLm9wU3BsaXRNYW55V2hlcmUuKVxuKi9cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgcm9vdFRva2VuKSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRhc3NlcnQoaXNHcm91cChHX0Jsb2NrLCByb290VG9rZW4pKVxuXHRjb25zdCBtc0FzdCA9IHBhcnNlTW9kdWxlKFNsaWNlLmdyb3VwKHJvb3RUb2tlbikpXG5cdC8vIFJlbGVhc2UgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbnMuXG5cdGNvbnRleHQgPSB1bmRlZmluZWRcblx0cmV0dXJuIG1zQXN0XG59XG5cbmNvbnN0XG5cdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGNvbnRleHQuY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdGNoZWNrTm9uRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGNvbnRleHQuY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdG9rZW4gPT4gY29udGV4dC5mYWlsKHRva2VuLmxvYywgYFVuZXhwZWN0ZWQgJHt0b2tlbi5zaG93KCl9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHQvLyBVc2Ugc3RhdGVtZW50cyBtdXN0IGFwcGVhciBpbiBvcmRlci5cblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfSA9IHBhcnNlTW9kdWxlQmxvY2socmVzdDMpXG5cblx0aWYgKGNvbnRleHQub3B0cy5pbmNsdWRlTW9kdWxlTmFtZSgpICYmICFleHBvcnRzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICduYW1lJykpIHtcblx0XHRjb25zdCBuYW1lID0gTG9jYWxEZWNsYXJlTmFtZSh0b2tlbnMubG9jKVxuXHRcdGxpbmVzLnB1c2goQXNzaWduU2luZ2xlKHRva2Vucy5sb2MsIG5hbWUsXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY29udGV4dC5vcHRzLm1vZHVsZU5hbWUoKSkpKVxuXHRcdGV4cG9ydHMucHVzaChuYW1lKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y29udGV4dC5jaGVjayhpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrID0gKGtleXdvcmQsIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PlxuXHRcdFx0YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGJldHdlZW4gJHtjb2RlKGtleXdvcmROYW1lKGtleXdvcmQpKX0gYW5kIGJsb2NrLmApXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cdGp1c3RCbG9ja0RvID0gKGtleXdvcmQsIHRva2VucykgPT5cblx0XHRwYXJzZUJsb2NrRG8oanVzdEJsb2NrKGtleXdvcmQsIHRva2VucykpLFxuXHRqdXN0QmxvY2tWYWwgPSAoa2V5d29yZCwgdG9rZW5zKSA9PlxuXHRcdHBhcnNlQmxvY2tWYWwoanVzdEJsb2NrKGtleXdvcmQsIHRva2VucykpLFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2guc2hvdygpfWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay5zdWJUb2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBsaW5lcyA9IF9wbGFpbkJsb2NrTGluZXModG9rZW5zKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgbGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIEJsb2NrQmFnLm9mKHRva2Vucy5sb2MsIGxpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX01hcDpcblx0XHRcdFx0cmV0dXJuIEJsb2NrTWFwLm9mKHRva2Vucy5sb2MsIGxpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX09iajpcblx0XHRcdFx0Y29uc3QgWyBkb0xpbmVzLCBvcFZhbCBdID0gX3RyeVRha2VMYXN0VmFsKGxpbmVzKVxuXHRcdFx0XHQvLyBvcE5hbWUgd3JpdHRlbiB0byBieSBfdHJ5QWRkTmFtZS5cblx0XHRcdFx0cmV0dXJuIEJsb2NrT2JqLm9mKHRva2Vucy5sb2MsIGRvTGluZXMsIG9wVmFsLCBudWxsKVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0VtcHR5KGxpbmVzKSwgdG9rZW5zLmxvYywgJ1ZhbHVlIGJsb2NrIG11c3QgZW5kIGluIGEgdmFsdWUuJylcblx0XHRcdFx0Y29uc3QgdmFsID0gbGFzdChsaW5lcylcblx0XHRcdFx0aWYgKHZhbCBpbnN0YW5jZW9mIFRocm93KVxuXHRcdFx0XHRcdHJldHVybiBCbG9ja1ZhbFRocm93KHRva2Vucy5sb2MsIHJ0YWlsKGxpbmVzKSwgdmFsKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKHZhbCBpbnN0YW5jZW9mIFZhbCwgdmFsLmxvYywgJ1ZhbHVlIGJsb2NrIG11c3QgZW5kIGluIGEgdmFsdWUuJylcblx0XHRcdFx0XHRyZXR1cm4gQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIHJ0YWlsKGxpbmVzKSwgdmFsKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHBhcnNlTW9kdWxlQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgbGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGNvbnN0IGxvYyA9IHRva2Vucy5sb2Ncblx0XHRzd2l0Y2ggKGtSZXR1cm4pIHtcblx0XHRcdGNhc2UgS1JldHVybl9CYWc6IGNhc2UgS1JldHVybl9NYXA6IHtcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSAoa1JldHVybiA9PT0gS1JldHVybl9CYWcgPyBCbG9ja0JhZyA6IEJsb2NrTWFwKS5vZihsb2MsIGxpbmVzKVxuXHRcdFx0XHRyZXR1cm4geyBsaW5lczogWyBdLCBleHBvcnRzOiBbIF0sIG9wRGVmYXVsdEV4cG9ydDogQmxvY2tXcmFwKGxvYywgYmxvY2spIH1cblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Y29uc3QgZXhwb3J0cyA9IFsgXVxuXHRcdFx0XHRsZXQgb3BEZWZhdWx0RXhwb3J0ID0gbnVsbFxuXHRcdFx0XHRjb25zdCBtb2R1bGVOYW1lID0gY29udGV4dC5vcHRzLm1vZHVsZU5hbWUoKVxuXG5cdFx0XHRcdC8vIE1vZHVsZSBleHBvcnRzIGxvb2sgbGlrZSBhIEJsb2NrT2JqLCAgYnV0IGFyZSByZWFsbHkgZGlmZmVyZW50LlxuXHRcdFx0XHQvLyBJbiBFUzYsIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgY29tcGxldGVseSBzdGF0aWMuXG5cdFx0XHRcdC8vIFNvIHdlIGtlZXAgYW4gYXJyYXkgb2YgZXhwb3J0cyBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgTW9kdWxlIGFzdC5cblx0XHRcdFx0Ly8gSWYgeW91IHdyaXRlOlxuXHRcdFx0XHQvL1x0aWYhIGNvbmRcblx0XHRcdFx0Ly9cdFx0YS4gYlxuXHRcdFx0XHQvLyBpbiBhIG1vZHVsZSBjb250ZXh0LCBpdCB3aWxsIGJlIGFuIGVycm9yLiAoVGhlIG1vZHVsZSBjcmVhdGVzIG5vIGBidWlsdGAgbG9jYWwuKVxuXHRcdFx0XHRjb25zdCBnZXRMaW5lRXhwb3J0cyA9IGxpbmUgPT4ge1xuXHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkpIHtcblx0XHRcdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lLmFzc2lnbi5hbGxBc3NpZ25lZXMoKSlcblx0XHRcdFx0XHRcdFx0aWYgKF8ubmFtZSA9PT0gbW9kdWxlTmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2sob3BEZWZhdWx0RXhwb3J0ID09PSBudWxsLCBfLmxvYywgKCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdGBEZWZhdWx0IGV4cG9ydCBhbHJlYWR5IGRlY2xhcmVkIGF0ICR7b3BEZWZhdWx0RXhwb3J0LmxvY31gKVxuXHRcdFx0XHRcdFx0XHRcdG9wRGVmYXVsdEV4cG9ydCA9IExvY2FsQWNjZXNzKF8ubG9jLCBfLm5hbWUpXG5cdFx0XHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGV4cG9ydHMucHVzaChfKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGxpbmUuYXNzaWduXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdFx0XHRsaW5lLmxpbmVzID0gbGluZS5saW5lcy5tYXAoZ2V0TGluZUV4cG9ydHMpXG5cdFx0XHRcdFx0cmV0dXJuIGxpbmVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG1vZHVsZUxpbmVzID0gbGluZXMubWFwKGdldExpbmVFeHBvcnRzKVxuXG5cdFx0XHRcdGlmIChpc0VtcHR5KGV4cG9ydHMpICYmIG9wRGVmYXVsdEV4cG9ydCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnN0IFsgbGluZXMsIG9wRGVmYXVsdEV4cG9ydCBdID0gX3RyeVRha2VMYXN0VmFsKG1vZHVsZUxpbmVzKVxuXHRcdFx0XHRcdHJldHVybiB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgfVxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4geyBsaW5lczogbW9kdWxlTGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlTGFzdFZhbCA9IGxpbmVzID0+XG5cdFx0KCFpc0VtcHR5KGxpbmVzKSAmJiBsYXN0KGxpbmVzKSBpbnN0YW5jZW9mIFZhbCkgP1xuXHRcdFx0WyBydGFpbChsaW5lcyksIGxhc3QobGluZXMpIF0gOlxuXHRcdFx0WyBsaW5lcywgbnVsbCBdLFxuXG5cdF9wbGFpbkJsb2NrTGluZXMgPSBsaW5lVG9rZW5zID0+IHtcblx0XHRjb25zdCBsaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lKVxuXHRcdFx0XHRcdGFkZExpbmUoXylcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGluZXMucHVzaChsaW5lKVxuXHRcdH1cblx0XHRsaW5lVG9rZW5zLmVhY2goXyA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChfKSkpKVxuXHRcdHJldHVybiBsaW5lc1xuXHR9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZVRva2VucyA9PiB7XG5cdFx0bGV0IGlzQmFnID0gZmFsc2UsIGlzTWFwID0gZmFsc2UsIGlzT2JqID0gZmFsc2Vcblx0XHRjb25zdCBjaGVja0xpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdGZvciAoY29uc3QgXyBvZiBsaW5lLmxpbmVzKVxuXHRcdFx0XHRcdGNoZWNrTGluZShfKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIEJhZ0VudHJ5KVxuXHRcdFx0XHRpc0JhZyA9IHRydWVcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSlcblx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkpXG5cdFx0XHRcdGlzT2JqID0gdHJ1ZVxuXHRcdH1cblx0XHRjb25zdCBsaW5lcyA9IF9wbGFpbkJsb2NrTGluZXMobGluZVRva2Vucylcblx0XHRmb3IgKGNvbnN0IF8gb2YgbGluZXMpXG5cdFx0XHRjaGVja0xpbmUoXylcblxuXHRcdGNvbnRleHQuY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y29udGV4dC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjb250ZXh0LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9XG5cdFx0XHRpc09iaiA/IEtSZXR1cm5fT2JqIDogaXNCYWcgPyBLUmV0dXJuX0JhZyA6IGlzTWFwID8gS1JldHVybl9NYXAgOiBLUmV0dXJuX1BsYWluXG5cdFx0cmV0dXJuIHsgbGluZXMsIGtSZXR1cm4gfVxuXHR9XG5cbmNvbnN0IHBhcnNlQ2FzZSA9IChpc1ZhbCwgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gbnVsbFxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduU2luZ2xlLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gaXNLZXl3b3JkKEtXX0Vsc2UsIGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgKGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKEtXX0Vsc2UsIGxhc3RMaW5lLnRhaWwoKSkgXSA6XG5cdFx0WyBibG9jaywgbnVsbCBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwU2xpY2VzKF9wYXJzZUNhc2VMaW5lKGlzVmFsKSlcblx0Y29udGV4dC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAoKSA9PlxuXHRcdGBNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tJHtjb2RlKCdlbHNlJyl9IHRlc3QuYClcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZUxpbmUgPSBpc1ZhbCA9PiBsaW5lID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUpXG5cdFx0Y29uc3QgdGVzdCA9IF9wYXJzZUNhc2VUZXN0KGJlZm9yZSlcblx0XHRjb25zdCByZXN1bHQgPSAoaXNWYWwgPyBwYXJzZUJsb2NrVmFsIDogcGFyc2VCbG9ja0RvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9LFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0IHBhcnNlU3dpdGNoID0gKGlzVmFsLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdGNvbnN0IHN3aXRjaGVkID0gcGFyc2VFeHByKGJlZm9yZSlcblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IGlzS2V5d29yZChLV19FbHNlLCBsYXN0TGluZS5oZWFkKCkpID9cblx0XHRbIGJsb2NrLnJ0YWlsKCksIChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShLV19FbHNlLCBsYXN0TGluZS50YWlsKCkpIF0gOlxuXHRcdFsgYmxvY2ssIG51bGwgXVxuXG5cdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcFNsaWNlcyhfcGFyc2VTd2l0Y2hMaW5lKGlzVmFsKSlcblx0Y29udGV4dC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAoKSA9PlxuXHRcdGBNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tJHtjb2RlKCdlbHNlJyl9IHRlc3QuYClcblxuXHRyZXR1cm4gKGlzVmFsID8gU3dpdGNoVmFsIDogU3dpdGNoRG8pKHRva2Vucy5sb2MsIHN3aXRjaGVkLCBwYXJ0cywgb3BFbHNlKVxufVxuY29uc3Rcblx0X3BhcnNlU3dpdGNoTGluZSA9IGlzVmFsID0+IGxpbmUgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwcihiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IFN3aXRjaFZhbFBhcnQgOiBTd2l0Y2hEb1BhcnQpKGxpbmUubG9jLCB2YWx1ZSwgcmVzdWx0KVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShfID0+IGlzS2V5d29yZChLV19PYmpBc3NpZ24sIF8pKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y2hlY2tOb25FbXB0eShmaXJzdCwgKCkgPT4gYFVuZXhwZWN0ZWQgJHtzcGxpdHNbMF0uYXQuc2hvdygpfWApXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT5cblx0XHRcdFx0XHRcdGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWUuc2hvdygpfWApXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHJQbGFpbih0b2tlbnNWYWx1ZSlcblx0XHRcdFx0XHRjb25zdCBsb2MgPSBMb2MobmFtZS5sb2Muc3RhcnQsIHRva2Vuc1ZhbHVlLmxvYy5lbmQpXG5cdFx0XHRcdFx0cGFpcnMucHVzaChPYmpQYWlyKGxvYywgbmFtZS5uYW1lLCB2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb25zdCB2YWwgPSBPYmpTaW1wbGUodG9rZW5zLmxvYywgcGFpcnMpXG5cdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdHJldHVybiB2YWxcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnNDYWxsZXIpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbih0b2tlbnMpXG5cdFx0KVxuXHR9LFxuXG5cdHBhcnNlRXhwclBsYWluID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vucylcblx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjb250ZXh0LmZhaWwodG9rZW5zLmxvYywgJ0V4cGVjdGVkIGFuIGV4cHJlc3Npb24sIGdvdCBub3RoaW5nLicpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3BTcGxpdCA9IHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKHRva2VuID0+IHtcblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX0Nhc2VWYWw6IGNhc2UgS1dfQ2xhc3M6IGNhc2UgS1dfRXhjZXB0VmFsOiBjYXNlIEtXX0ZvckJhZzpcblx0XHRcdFx0XHRjYXNlIEtXX0ZvclZhbDogY2FzZSBLV19GdW46IGNhc2UgS1dfRnVuRG86IGNhc2UgS1dfRnVuR2VuOiBjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0XHRcdGNhc2UgS1dfRnVuVGhpczogY2FzZSBLV19GdW5UaGlzRG86IGNhc2UgS1dfRnVuVGhpc0dlbjogY2FzZSBLV19GdW5UaGlzR2VuRG86XG5cdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19OZXc6IGNhc2UgS1dfTm90OiBjYXNlIEtXX09yOiBjYXNlIEtXX1N3aXRjaFZhbDpcblx0XHRcdFx0XHRjYXNlIEtXX1VubGVzc1ZhbDogY2FzZSBLV19ZaWVsZDogY2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0pXG5cdFx0cmV0dXJuIGlmRWxzZShvcFNwbGl0LFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRjb25zdCBsYXN0ID0gKCgpID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKGF0LmtpbmQpIHtcblx0XHRcdFx0XHRcdGNhc2UgS1dfQW5kOiBjYXNlIEtXX09yOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTG9naWMoYXQubG9jLCBhdC5raW5kID09PSBLV19BbmQgPyBMX0FuZCA6IExfT3IsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByUGFydHMoYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19DYXNlVmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKHRydWUsIGZhbHNlLCBhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfQ2xhc3M6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUNsYXNzKGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19FeGNlcHRWYWw6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUV4Y2VwdChLV19FeGNlcHRWYWwsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Gb3JCYWc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZvckJhZyhhZnRlcilcblx0XHRcdFx0XHRcdGNhc2UgS1dfRm9yVmFsOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3JWYWwoYWZ0ZXIpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1bjogY2FzZSBLV19GdW5EbzogY2FzZSBLV19GdW5HZW46IGNhc2UgS1dfRnVuR2VuRG86XG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1blRoaXM6IGNhc2UgS1dfRnVuVGhpc0RvOiBjYXNlIEtXX0Z1blRoaXNHZW46XG5cdFx0XHRcdFx0XHRjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlRnVuKGF0LmtpbmQsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19JZlZhbDogY2FzZSBLV19Vbmxlc3NWYWw6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhhZnRlcilcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENvbmRpdGlvbmFsVmFsKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRcdFx0cGFyc2VFeHByUGxhaW4oYmVmb3JlKSxcblx0XHRcdFx0XHRcdFx0XHRwYXJzZUJsb2NrVmFsKGJsb2NrKSxcblx0XHRcdFx0XHRcdFx0XHRhdC5raW5kID09PSBLV19Vbmxlc3NWYWwpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIEtXX05ldzoge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKGFmdGVyKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTmV3KGF0LmxvYywgcGFydHNbMF0sIHRhaWwocGFydHMpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19Ob3Q6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBOb3QoYXQubG9jLCBwYXJzZUV4cHJQbGFpbihhZnRlcikpXG5cdFx0XHRcdFx0XHRjYXNlIEtXX1N3aXRjaFZhbDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhcnNlU3dpdGNoKHRydWUsIGFmdGVyKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFlpZWxkKGF0LmxvYywgcGFyc2VFeHByUGxhaW4oYWZ0ZXIpKVxuXHRcdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWWllbGRUbyhhdC5sb2MsIHBhcnNlRXhwclBsYWluKGFmdGVyKSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihhdC5raW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkoKVxuXHRcdFx0XHRyZXR1cm4gcHVzaChiZWZvcmUubWFwKHBhcnNlU2luZ2xlKSwgbGFzdClcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiB0b2tlbnMubWFwKHBhcnNlU2luZ2xlKSlcblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChraW5kLCB0b2tlbnMpID0+IHtcblx0bGV0IGlzVGhpcyA9IGZhbHNlLCBpc0RvID0gZmFsc2UsIGlzR2VuID0gZmFsc2Vcblx0c3dpdGNoIChraW5kKSB7XG5cdFx0Y2FzZSBLV19GdW46XG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuRG86XG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1bkdlbjpcblx0XHRcdGlzR2VuID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlIEtXX0Z1blRoaXM6XG5cdFx0XHRpc1RoaXMgPSB0cnVlXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuVGhpc0RvOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNEbyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSBLV19GdW5UaGlzR2VuOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0aXNUaGlzID0gdHJ1ZVxuXHRcdFx0aXNHZW4gPSB0cnVlXG5cdFx0XHRpc0RvID0gdHJ1ZVxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoKVxuXHR9XG5cdGNvbnN0IG9wRGVjbGFyZVRoaXMgPSBvcElmKGlzVGhpcywgKCkgPT4gTG9jYWxEZWNsYXJlVGhpcyh0b2tlbnMubG9jKSlcblxuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhpc0RvLCByZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BEZWNsYXJlUmVzID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgb3BEZWNsYXJlVGhpcywgaXNHZW4sIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wRGVjbGFyZVJlcywgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGgpICYmIGlzS2V5d29yZChLV19UeXBlLCBoZWFkKGguc3ViVG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IChpc0RvLCB0b2tlbnMpID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2VWYWwgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQgPT09IEtXX0Nhc2VWYWwsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmVGb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZVZhbCA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2tMaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRmb3IgKGNvbnN0IGFyZyBvZiBhcmdzKVxuXHRcdFx0XHRpZiAoIWFyZy5pc0xhenkoKSlcblx0XHRcdFx0XHRhcmcua2luZCA9IExEX011dGFibGVcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2tMaW5lcylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdGNvbnN0IGJsb2NrID0gKGlzRG8gPyBwYXJzZUJsb2NrRG8gOiBwYXJzZUJsb2NrVmFsKShyZXN0MSlcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogTG9jYWxEZWNsYXJlLnBsYWluKGwubG9jLCBsLm5hbWUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucyksIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0fVxuXHR9LFxuXG5cdF90cnlUYWtlSW5Pck91dCA9IChpbk9yT3V0LCB0b2tlbnMpID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRva2Vucy5oZWFkU2xpY2UoKVxuXHRcdFx0aWYgKGlzS2V5d29yZChpbk9yT3V0LCBmaXJzdExpbmUuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhmaXJzdExpbmUpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHRjb25zdCBub1Jlc3QgPSAoKSA9PlxuXHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtoZWFkLnNob3coKX1gKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaGVhZCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGhlYWQua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX0Fzc2VydDogY2FzZSBLV19Bc3NlcnROb3Q6XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQXNzZXJ0KGhlYWQua2luZCA9PT0gS1dfQXNzZXJ0Tm90LCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0V4Y2VwdERvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUV4Y2VwdChLV19FeGNlcHREbywgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19CcmVhazpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBCcmVhayh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0JyZWFrV2l0aFZhbDpcblx0XHRcdFx0XHRyZXR1cm4gQnJlYWtXaXRoVmFsKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19DYXNlRG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQ2FzZShmYWxzZSwgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfQ29udGludWU6XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gQ29udGludWUodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdGlzR3JvdXAoR19CbG9jaywgdG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsRG8odG9rZW5zLmxvYywgU0RfRGVidWdnZXIpXG5cdFx0XHRcdGNhc2UgS1dfRWxsaXBzaXM6XG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5TWFueSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRm9yRG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlRm9yRG8ocmVzdClcblx0XHRcdFx0Y2FzZSBLV19JZkRvOiBjYXNlIEtXX1VubGVzc0RvOiB7XG5cdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhyZXN0KVxuXHRcdFx0XHRcdHJldHVybiBDb25kaXRpb25hbERvKHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRwYXJzZUV4cHIoYmVmb3JlKSxcblx0XHRcdFx0XHRcdHBhcnNlQmxvY2tEbyhibG9jayksXG5cdFx0XHRcdFx0XHRoZWFkLmtpbmQgPT09IEtXX1VubGVzc0RvKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgS1dfT2JqQXNzaWduOlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfUGFzczpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBbIF1cblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRjYXNlIEtXX1N3aXRjaERvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZVN3aXRjaChmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19UaHJvdzpcblx0XHRcdFx0XHRyZXR1cm4gVGhyb3codG9rZW5zLmxvYywgb3BJZighcmVzdC5pc0VtcHR5KCksICgpID0+IHBhcnNlRXhwcihyZXN0KSkpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF9pc0xpbmVTcGxpdEtleXdvcmQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4gX3BhcnNlQXNzaWduTGlrZShiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYyksXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfaXNMaW5lU3BsaXRLZXl3b3JkID0gdG9rZW4gPT4ge1xuXHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19Bc3NpZ246IGNhc2UgS1dfQXNzaWduTXV0YWJsZTogY2FzZSBLV19Mb2NhbE11dGF0ZTpcblx0XHRcdFx0Y2FzZSBLV19NYXBFbnRyeTogY2FzZSBLV19PYmpBc3NpZ246IGNhc2UgS1dfWWllbGQ6IGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnbkxpa2UgPSAoYmVmb3JlLCBhdCwgYWZ0ZXIsIGxvYykgPT4ge1xuXHRcdGlmIChhdC5raW5kID09PSBLV19NYXBFbnRyeSlcblx0XHRcdHJldHVybiBfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCBsb2MpXG5cblx0XHQvLyBUT0RPOiBUaGlzIGNvZGUgaXMga2luZCBvZiB1Z2x5LlxuXHRcdGlmIChiZWZvcmUuc2l6ZSgpID09PSAxKSB7XG5cdFx0XHRjb25zdCB0b2tlbiA9IGJlZm9yZS5oZWFkKClcblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRcdHJldHVybiBfcGFyc2VNZW1iZXJTZXQoXHRMb2NhbEFjY2Vzcy50aGlzKHRva2VuLmxvYyksIHRva2VuLm5hbWUsIGF0LCBhZnRlciwgbG9jKVxuXHRcdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgdG9rZW4pKSB7XG5cdFx0XHRcdGNvbnN0IHNwYWNlZCA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0XHRjb25zdCBkb3QgPSBzcGFjZWQubGFzdCgpXG5cdFx0XHRcdGlmIChkb3QgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhkb3QubkRvdHMgPT09IDEsIGRvdC5sb2MsICdNdXN0IGhhdmUgb25seSAxIGAuYC4nKVxuXHRcdFx0XHRcdHJldHVybiBfcGFyc2VNZW1iZXJTZXQocGFyc2VTcGFjZWQoc3BhY2VkLnJ0YWlsKCkpLCBkb3QubmFtZSwgYXQsIGFmdGVyLCBsb2MpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTG9jYWxNdXRhdGUgP1xuXHRcdFx0X3BhcnNlTG9jYWxNdXRhdGUoYmVmb3JlLCBhZnRlciwgbG9jKSA6XG5cdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIGxvYylcblx0fSxcblxuXHRfcGFyc2VNZW1iZXJTZXQgPSAob2JqZWN0LCBuYW1lLCBhdCwgYWZ0ZXIsIGxvYykgPT5cblx0XHRNZW1iZXJTZXQobG9jLCBvYmplY3QsIG5hbWUsIF9tZW1iZXJTZXRLaW5kKGF0KSwgcGFyc2VFeHByKGFmdGVyKSksXG5cdF9tZW1iZXJTZXRLaW5kID0gYXQgPT4ge1xuXHRcdHN3aXRjaCAoYXQua2luZCkge1xuXHRcdFx0Y2FzZSBLV19Bc3NpZ246IHJldHVybiBNU19OZXdcblx0XHRcdGNhc2UgS1dfQXNzaWduTXV0YWJsZTogcmV0dXJuIE1TX05ld011dGFibGVcblx0XHRcdGNhc2UgS1dfTG9jYWxNdXRhdGU6IHJldHVybiBNU19NdXRhdGVcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcigpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsTXV0YXRlID0gKGxvY2Fsc1Rva2VucywgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29udGV4dC5jaGVjayhsb2NhbHMubGVuZ3RoID09PSAxLCBsb2MsICdUT0RPOiBMb2NhbERlc3RydWN0dXJlTXV0YXRlJylcblx0XHRjb25zdCBuYW1lID0gbG9jYWxzWzBdLm5hbWVcblx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRyZXR1cm4gTG9jYWxNdXRhdGUobG9jLCBuYW1lLCB2YWx1ZSlcblx0fSxcblxuXHRfcGFyc2VBc3NpZ24gPSAobG9jYWxzVG9rZW5zLCBhc3NpZ25lciwgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBhc3NpZ25lci5raW5kXG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb25zdCBvcE5hbWUgPSBvcElmKGxvY2Fscy5sZW5ndGggPT09IDEsICgpID0+IGxvY2Fsc1swXS5uYW1lKVxuXHRcdGNvbnN0IHZhbHVlID0gX3BhcnNlQXNzaWduVmFsdWUoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucylcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y29udGV4dC5jaGVjayhpc1lpZWxkLCBsb2NhbHNUb2tlbnMubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaXNZaWVsZClcblx0XHRcdFx0Zm9yIChjb25zdCBfIG9mIGxvY2Fscylcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKVxuXG5cdFx0XHRjb25zdCBpc09iakFzc2lnbiA9IGtpbmQgPT09IEtXX09iakFzc2lnblxuXG5cdFx0XHRpZiAoa2luZCA9PT0gS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0Zm9yIChsZXQgXyBvZiBsb2NhbHMpIHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0xhenkgbG9jYWwgY2FuIG5vdCBiZSBtdXRhYmxlLicpXG5cdFx0XHRcdFx0Xy5raW5kID0gTERfTXV0YWJsZVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdyYXAgPSBfID0+IGlzT2JqQXNzaWduID8gT2JqRW50cnkobG9jLCBfKSA6IF9cblxuXHRcdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Y29uc3QgYXNzaWduZWUgPSBsb2NhbHNbMF1cblx0XHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduU2luZ2xlKGxvYywgYXNzaWduZWUsIHZhbHVlKVxuXHRcdFx0XHRjb25zdCBpc1Rlc3QgPSBpc09iakFzc2lnbiAmJiBhc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdFx0cmV0dXJuIGlzVGVzdCA/IERlYnVnKGxvYywgWyB3cmFwKGFzc2lnbikgXSkgOiB3cmFwKGFzc2lnbilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGtpbmQgPSBsb2NhbHNbMF0ua2luZFxuXHRcdFx0XHRmb3IgKGNvbnN0IF8gb2YgbG9jYWxzKVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soXy5raW5kID09PSBraW5kLCBfLmxvYyxcblx0XHRcdFx0XHRcdCdBbGwgbG9jYWxzIG9mIGRlc3RydWN0dXJpbmcgYXNzaWdubWVudCBtdXN0IGJlIG9mIHRoZSBzYW1lIGtpbmQuJylcblx0XHRcdFx0cmV0dXJuIHdyYXAoQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIHZhbHVlLCBraW5kKSlcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQXNzaWduVmFsdWUgPSAoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucykgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gdmFsdWVUb2tlbnMuaXNFbXB0eSgpICYmIGtpbmQgPT09IEtXX09iakFzc2lnbiA/XG5cdFx0XHRTcGVjaWFsVmFsKHZhbHVlVG9rZW5zLmxvYywgU1ZfTnVsbCkgOlxuXHRcdFx0cGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdGlmIChvcE5hbWUgIT09IG51bGwpXG5cdFx0XHRfdHJ5QWRkTmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHN3aXRjaCAoa2luZCkge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIG5hbWUgaWY6XG5cdC8vIEl0J3MgYSBmdW5jdGlvblxuXHQvLyBJdCdzIGFuIE9iaiBibG9ja1xuXHQvLyBJdCdzIGFuIE9iaiBibG9jayBhdCB0aGUgZW5kIG9mIGEgY2FsbCAoYXMgaW4gYG5hbWUgPSBPYmotVHlwZSAuLi5gKVxuXHRfdHJ5QWRkTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBGdW4gfHwgXyBpbnN0YW5jZW9mIENsYXNzKVxuXHRcdFx0Xy5vcE5hbWUgPSBuYW1lXG5cdFx0ZWxzZSBpZiAoKF8gaW5zdGFuY2VvZiBDYWxsIHx8IF8gaW5zdGFuY2VvZiBOZXcpICYmICFpc0VtcHR5KF8uYXJncykpXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShsYXN0KF8uYXJncyksIG5hbWUpXG5cdFx0ZWxzZVxuXHRcdFx0X3RyeUFkZE9iak5hbWUoXywgbmFtZSlcblx0fSxcblxuXHRfdHJ5QWRkT2JqTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dyYXAgJiYgXy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrT2JqKVxuXHRcdFx0aWYgKF8uYmxvY2sub3BPYmplZCAhPT0gbnVsbCAmJiBfLmJsb2NrLm9wT2JqZWQgaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRcdF8uYmxvY2sub3BPYmplZC5vcE5hbWUgPSBuYW1lXG5cdFx0XHRlbHNlIGlmICghX25hbWVPYmpBc3NpZ25Tb21ld2hlcmUoXy5ibG9jay5saW5lcykpXG5cdFx0XHRcdF8uYmxvY2sub3BOYW1lID0gbmFtZVxuXHR9LFxuXHRfbmFtZU9iakFzc2lnblNvbWV3aGVyZSA9IGxpbmVzID0+XG5cdFx0bGluZXMuc29tZShsaW5lID0+XG5cdFx0XHRsaW5lIGluc3RhbmNlb2YgT2JqRW50cnkgJiYgbGluZS5hc3NpZ24uYWxsQXNzaWduZWVzKCkuc29tZShfID0+XG5cdFx0XHRcdF8ubmFtZSA9PT0gJ25hbWUnKSksXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlcikpXG5cbmNvbnN0XG5cdHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyA9IHRva2VucyA9PlxuXHRcdHRva2Vucy5tYXAoXyA9PiBMb2NhbERlY2xhcmUucGxhaW4oXy5sb2MsIF9wYXJzZUxvY2FsTmFtZShfKSkpLFxuXG5cdHBhcnNlTG9jYWxEZWNsYXJlcyA9IHRva2VucyA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHRva2VuID0+IHtcblx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCB0b2tlbikpIHtcblx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0Y29uc3QgWyByZXN0LCBpc0xhenkgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19MYXp5LCB0b2tlbnMuaGVhZCgpKSA/IFsgdG9rZW5zLnRhaWwoKSwgdHJ1ZSBdIDogWyB0b2tlbnMsIGZhbHNlIF1cblx0XHRcdGNvbnN0IG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRjb25zdCBvcFR5cGUgPSBvcElmKCFyZXN0Mi5pc0VtcHR5KCksICgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0tleXdvcmQoS1dfVHlwZSwgY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9uLnNob3coKX1gKVxuXHRcdFx0XHRyZXR1cm4gcGFyc2VTcGFjZWQodG9rZW5zVHlwZSlcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHRva2VuLmxvYywgbmFtZSwgb3BUeXBlLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpXG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlLnBsYWluKHRva2VuLmxvYywgX3BhcnNlTG9jYWxOYW1lKHRva2VuKSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKGlzS2V5d29yZChLV19Gb2N1cywgdCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dC5zaG93KCl9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjb250ZXh0LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdG9rZW4gPT4ge1xuXHRjb25zdCB7IGxvYyB9ID0gdG9rZW5cblx0cmV0dXJuIHRva2VuIGluc3RhbmNlb2YgTmFtZSA/XG5cdF9hY2Nlc3ModG9rZW4ubmFtZSwgbG9jKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgR3JvdXAgPyAoKCkgPT4ge1xuXHRcdGNvbnN0IHNsaWNlID0gU2xpY2UuZ3JvdXAodG9rZW4pXG5cdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEdfU3BhY2U6XG5cdFx0XHRcdHJldHVybiBwYXJzZVNwYWNlZChzbGljZSlcblx0XHRcdGNhc2UgR19QYXJlbnRoZXNpczpcblx0XHRcdFx0cmV0dXJuIHBhcnNlRXhwcihzbGljZSlcblx0XHRcdGNhc2UgR19CcmFja2V0OlxuXHRcdFx0XHRyZXR1cm4gQmFnU2ltcGxlKGxvYywgcGFyc2VFeHByUGFydHMoc2xpY2UpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRyZXR1cm4gYmxvY2tXcmFwKHNsaWNlKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gcGFyc2VRdW90ZShzbGljZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcih0b2tlbi5raW5kKVxuXHRcdH1cblx0fSkoKSA6XG5cdHRva2VuIGluc3RhbmNlb2YgTnVtYmVyTGl0ZXJhbCA/XG5cdHRva2VuIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkID9cblx0XHR0b2tlbi5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpIDpcblx0XHRcdGlmRWxzZShvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kKHRva2VuLmtpbmQpLFxuXHRcdFx0XHRfID0+IFNwZWNpYWxWYWwobG9jLCBfKSxcblx0XHRcdFx0KCkgPT4gdW5leHBlY3RlZCh0b2tlbikpIDpcblx0dG9rZW4gaW5zdGFuY2VvZiBEb3ROYW1lID9cblx0XHR0b2tlbi5uRG90cyA9PT0gMSA/IE1lbWJlcih0b2tlbi5sb2MsIExvY2FsQWNjZXNzKHRva2VuLmxvYywgJ3RoaXMnKSwgdG9rZW4ubmFtZSkgOlxuXHRcdHRva2VuLm5Eb3RzID09PSAzID8gU3BsYXQobG9jLCBMb2NhbEFjY2Vzcyhsb2MsIHRva2VuLm5hbWUpKSA6XG5cdFx0dW5leHBlY3RlZCh0b2tlbikgOlxuXHR1bmV4cGVjdGVkKHRva2VuKVxufVxuXG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBoKSlcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgcGFyc2VTcGFjZWQocmVzdCksIExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKSlcblx0ZWxzZSBpZiAoaXNLZXl3b3JkKEtXX0xhenksIGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0bGV0IGFjYyA9IHBhcnNlU2luZ2xlKGgpXG5cdFx0Zm9yIChsZXQgaSA9IHJlc3Quc3RhcnQ7IGkgPCByZXN0LmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCB0b2tlbiA9IHJlc3QudG9rZW5zW2ldXG5cdFx0XHRjb25zdCBsb2MgPSB0b2tlbi5sb2Ncblx0XHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayh0b2tlbi5uRG90cyA9PT0gMSwgdG9rZW4ubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRhY2MgPSBNZW1iZXIodG9rZW4ubG9jLCBhY2MsIHRva2VuLm5hbWUpXG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cdFx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0XHRjYXNlIEtXX0ZvY3VzOlxuXHRcdFx0XHRcdFx0YWNjID0gQ2FsbCh0b2tlbi5sb2MsIGFjYywgWyBMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpIF0pXG5cdFx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHRcdGNhc2UgS1dfVHlwZToge1xuXHRcdFx0XHRcdFx0Y29uc3QgdHlwZSA9IHBhcnNlU3BhY2VkKHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKSlcblx0XHRcdFx0XHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKHRva2VuLmxvYywgdHlwZSwgYWNjKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR9XG5cdFx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRjb25zdCBzbGljZSA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0XHRjYXNlIEdfQnJhY2tldDpcblx0XHRcdFx0XHRcdGFjYyA9IENhbGwuc3ViKGxvYywgdW5zaGlmdChhY2MsIHBhcnNlRXhwclBhcnRzKHNsaWNlKSkpXG5cdFx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHRcdGNhc2UgR19QYXJlbnRoZXNpczpcblx0XHRcdFx0XHRcdGNoZWNrRW1wdHkoc2xpY2UsICgpID0+XG5cdFx0XHRcdFx0XHRcdGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0XHRhY2MgPSBDYWxsKGxvYywgYWNjLCBbXSlcblx0XHRcdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRcdFx0YWNjID0gUXVvdGVUZW1wbGF0ZShsb2MsIGFjYywgcGFyc2VRdW90ZShzbGljZSkpXG5cdFx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnRleHQuZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dG9rZW59YClcblx0XHR9XG5cdFx0cmV0dXJuIGFjY1xuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSB0b2tlbnMuaGVhZFNsaWNlKClcblx0XHRpZiAoaXNLZXl3b3JkKGssIGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAodXNlS2V5d29yZEtpbmQsIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PlxuXHRcdFx0YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZSh1c2VLZXl3b3JkS2luZCl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcFNsaWNlcyhsaW5lID0+IHtcblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZShsaW5lLmhlYWQoKSlcblx0XHRcdGlmICh1c2VLZXl3b3JkS2luZCA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUuc2l6ZSgpID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUuc2Vjb25kKCkpXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IHVzZUtleXdvcmRLaW5kID09PSBLV19Vc2VMYXp5IHx8XG5cdFx0XHRcdFx0dXNlS2V5d29yZEtpbmQgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBsaW5lLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUudW50eXBlZCh0b2tlbnMubG9jLCBuYW1lLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbIF0sIG9wVXNlRGVmYXVsdDogdXNlRGVmYXVsdCgpIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IFsgb3BVc2VEZWZhdWx0LCByZXN0IF0gPVxuXHRcdFx0XHRpc0tleXdvcmQoS1dfRm9jdXMsIHRva2Vucy5oZWFkKCkpID9cblx0XHRcdFx0XHRbIHVzZURlZmF1bHQoKSwgdG9rZW5zLnRhaWwoKSBdIDpcblx0XHRcdFx0XHRbIG51bGwsIHRva2VucyBdXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0XHRcdGwua2luZCA9IExEX0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzR3JvdXAoR19TcGFjZSwgdCksIHQubG9jLCAnTm90IGEgdmFsaWQgbW9kdWxlIG5hbWUuJylcblx0XHRcdHJldHVybiBfcGFyc2VMb2NhbFJlcXVpcmUoU2xpY2UuZ3JvdXAodCkpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsUmVxdWlyZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0bGV0IHBhcnRzXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHBhcnRzID0gX3BhcnRzRnJvbURvdE5hbWUoZmlyc3QpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0b2tlbiA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHRva2VuIGluc3RhbmNlb2YgRG90TmFtZSAmJiB0b2tlbi5uRG90cyA9PT0gMSwgdG9rZW4ubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0b2tlbi5uYW1lKVxuXHRcdH0pXG5cdFx0cmV0dXJuIHsgcGF0aDogcGFydHMuam9pbignLycpLCBuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWUgfVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuXG5jb25zdFxuXHRfcGFyc2VGb3IgPSBjdHIgPT4gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRyZXR1cm4gY3RyKHRva2Vucy5sb2MsIF9wYXJzZU9wSXRlcmF0ZWUoYmVmb3JlKSwgcGFyc2VCbG9ja0RvKGJsb2NrKSlcblx0fSxcblx0X3BhcnNlT3BJdGVyYXRlZSA9IHRva2VucyA9PlxuXHRcdG9wSWYoIXRva2Vucy5pc0VtcHR5KCksICgpID0+IHtcblx0XHRcdGNvbnN0IFsgZWxlbWVudCwgYmFnIF0gPVxuXHRcdFx0XHRpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfSW4sIF8pKSxcblx0XHRcdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soYmVmb3JlLnNpemUoKSA9PT0gMSwgYmVmb3JlLmxvYywgJ1RPRE86IHBhdHRlcm4gaW4gZm9yJylcblx0XHRcdFx0XHRcdHJldHVybiBbIHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhiZWZvcmUpWzBdLCBwYXJzZUV4cHIoYWZ0ZXIpIF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCgpID0+IFsgTG9jYWxEZWNsYXJlRm9jdXModG9rZW5zLmxvYyksIHBhcnNlRXhwcih0b2tlbnMpIF0pXG5cdFx0XHRyZXR1cm4gSXRlcmF0ZWUodG9rZW5zLmxvYywgZWxlbWVudCwgYmFnKVxuXHRcdH0pXG5jb25zdFxuXHRwYXJzZUZvckRvID0gX3BhcnNlRm9yKEZvckRvKSxcblx0cGFyc2VGb3JWYWwgPSBfcGFyc2VGb3IoRm9yVmFsKSxcblx0Ly8gVE9ETzogLT4gb3V0LXR5cGVcblx0cGFyc2VGb3JCYWcgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VCbG9ja0RvKGxpbmVzKVxuXHRcdC8vIFRPRE86IEJldHRlciB3YXk/XG5cdFx0aWYgKGJsb2NrLmxpbmVzLmxlbmd0aCA9PT0gMSAmJiBibG9jay5saW5lc1swXSBpbnN0YW5jZW9mIFZhbClcblx0XHRcdGJsb2NrLmxpbmVzWzBdID0gQmFnRW50cnkoYmxvY2subGluZXNbMF0ubG9jLCBibG9jay5saW5lc1swXSlcblx0XHRyZXR1cm4gRm9yQmFnLm9mKHRva2Vucy5sb2MsIF9wYXJzZU9wSXRlcmF0ZWUoYmVmb3JlKSwgYmxvY2spXG5cdH1cblxuXG5jb25zdFxuXHRwYXJzZUV4Y2VwdCA9IChrd0V4Y2VwdCwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3Rcblx0XHRcdGlzVmFsID0ga3dFeGNlcHQgPT09IEtXX0V4Y2VwdFZhbCxcblx0XHRcdGp1c3REb1ZhbEJsb2NrID0gaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbyxcblx0XHRcdHBhcnNlQmxvY2sgPSBpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8sXG5cdFx0XHRFeGNlcHQgPSBpc1ZhbCA/IEV4Y2VwdFZhbCA6IEV4Y2VwdERvLFxuXHRcdFx0a3dUcnkgPSBpc1ZhbCA/IEtXX1RyeVZhbCA6IEtXX1RyeURvLFxuXHRcdFx0a3dDYXRjaCA9IGlzVmFsID8gS1dfQ2F0Y2hWYWwgOiBLV19DYXRjaERvLFxuXHRcdFx0bmFtZVRyeSA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoa3dUcnkpKSxcblx0XHRcdG5hbWVDYXRjaCA9ICgpID0+IGNvZGUoa2V5d29yZE5hbWUoa3dDYXRjaCkpLFxuXHRcdFx0bmFtZUZpbmFsbHkgPSAoKSA9PiBjb2RlKGtleXdvcmROYW1lKEtXX0ZpbmFsbHkpKVxuXG5cdFx0Y29uc3QgbGluZXMgPSBqdXN0QmxvY2soa3dFeGNlcHQsIHRva2VucylcblxuXHRcdC8vIGB0cnlgICptdXN0KiBjb21lIGZpcnN0LlxuXHRcdGNvbnN0IGZpcnN0TGluZSA9IGxpbmVzLmhlYWRTbGljZSgpXG5cdFx0Y29uc3QgdG9rZW5UcnkgPSBmaXJzdExpbmUuaGVhZCgpXG5cdFx0Y29udGV4dC5jaGVjayhpc0tleXdvcmQoa3dUcnksIHRva2VuVHJ5KSwgdG9rZW5UcnkubG9jLCAoKSA9PlxuXHRcdFx0YE11c3Qgc3RhcnQgd2l0aCAke25hbWVUcnkoKX1gKVxuXHRcdGNvbnN0IF90cnkgPSBqdXN0RG9WYWxCbG9jayhrd1RyeSwgZmlyc3RMaW5lLnRhaWwoKSlcblxuXHRcdGNvbnN0IHJlc3RMaW5lcyA9IGxpbmVzLnRhaWwoKVxuXHRcdGNoZWNrTm9uRW1wdHkocmVzdExpbmVzLCAoKSA9PlxuXHRcdFx0YE11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgJHtuYW1lQ2F0Y2goKX0gb3IgJHtuYW1lRmluYWxseSgpfWApXG5cblx0XHRjb25zdCBoYW5kbGVGaW5hbGx5ID0gcmVzdExpbmVzID0+IHtcblx0XHRcdGNvbnN0IGxpbmUgPSByZXN0TGluZXMuaGVhZFNsaWNlKClcblx0XHRcdGNvbnN0IHRva2VuRmluYWxseSA9IGxpbmUuaGVhZCgpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGlzS2V5d29yZChLV19GaW5hbGx5LCB0b2tlbkZpbmFsbHkpLCB0b2tlbkZpbmFsbHkubG9jLCAoKSA9PlxuXHRcdFx0XHRgRXhwZWN0ZWQgJHtuYW1lRmluYWxseSgpfWApXG5cdFx0XHRjb250ZXh0LmNoZWNrKHJlc3RMaW5lcy5zaXplKCkgPT09IDEsIHJlc3RMaW5lcy5sb2MsICgpID0+XG5cdFx0XHRcdGBOb3RoaW5nIGlzIGFsbG93ZWQgdG8gY29tZSBhZnRlciAke25hbWVGaW5hbGx5KCl9LmApXG5cdFx0XHRyZXR1cm4ganVzdEJsb2NrRG8oS1dfRmluYWxseSwgbGluZS50YWlsKCkpXG5cdFx0fVxuXG5cdFx0bGV0IF9jYXRjaCwgX2ZpbmFsbHlcblxuXHRcdGNvbnN0IGxpbmUyID0gcmVzdExpbmVzLmhlYWRTbGljZSgpXG5cdFx0Y29uc3QgaGVhZDIgPSBsaW5lMi5oZWFkKClcblx0XHRpZiAoaXNLZXl3b3JkKGt3Q2F0Y2gsIGhlYWQyKSkge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUyLCBibG9jazIgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUyLnRhaWwoKSlcblx0XHRcdGNvbnN0IGNhdWdodCA9IF9wYXJzZU9uZUxvY2FsRGVjbGFyZU9yRm9jdXMoYmVmb3JlMilcblx0XHRcdF9jYXRjaCA9IENhdGNoKGxpbmUyLmxvYywgY2F1Z2h0LCBwYXJzZUJsb2NrKGJsb2NrMikpXG5cdFx0XHRfZmluYWxseSA9IG9wSWYocmVzdExpbmVzLnNpemUoKSA+IDEsICgpID0+IGhhbmRsZUZpbmFsbHkocmVzdExpbmVzLnRhaWwoKSkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdF9jYXRjaCA9IG51bGxcblx0XHRcdF9maW5hbGx5ID0gaGFuZGxlRmluYWxseShyZXN0TGluZXMpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIEV4Y2VwdCh0b2tlbnMubG9jLCBfdHJ5LCBfY2F0Y2gsIF9maW5hbGx5KVxuXHR9LFxuXHRfcGFyc2VPbmVMb2NhbERlY2xhcmVPckZvY3VzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmVGb2N1cyh0b2tlbnMubG9jKVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuc2l6ZSgpID09PSAxLCAnRXhwZWN0ZWQgb25seSBvbmUgbG9jYWwgZGVjbGFyZS4nKVxuXHRcdFx0cmV0dXJuIHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpWzBdXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlQXNzZXJ0ID0gKG5lZ2F0ZSwgdG9rZW5zKSA9PiB7XG5cdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7a2V5d29yZE5hbWUoS1dfQXNzZXJ0KX0uYClcblxuXHRjb25zdCBbIGNvbmRUb2tlbnMsIG9wVGhyb3duIF0gPVxuXHRcdGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfID0+IGlzS2V5d29yZChLV19UaHJvdywgXykpLFxuXHRcdFx0KHsgYmVmb3JlLCBhZnRlciB9KSA9PiBbIGJlZm9yZSwgcGFyc2VFeHByKGFmdGVyKSBdLFxuXHRcdFx0KCkgPT4gWyB0b2tlbnMsIG51bGwgXSlcblxuXHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKGNvbmRUb2tlbnMpXG5cdGNvbnN0IGNvbmQgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBwYXJ0c1swXSA6IENhbGwoY29uZFRva2Vucy5sb2MsIHBhcnRzWzBdLCB0YWlsKHBhcnRzKSlcblx0cmV0dXJuIEFzc2VydCh0b2tlbnMubG9jLCBuZWdhdGUsIGNvbmQsIG9wVGhyb3duKVxufVxuXG5jb25zdCBwYXJzZUNsYXNzID0gdG9rZW5zID0+IHtcblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdGNvbnN0IG9wRXh0ZW5kZWQgPSBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PiBwYXJzZUV4cHIoYmVmb3JlKSlcblxuXHRsZXQgb3BEbyA9IG51bGwsIHN0YXRpY3MgPSBbIF0sIG9wQ29uc3RydWN0b3IgPSBudWxsLCBtZXRob2RzID0gWyBdXG5cblx0bGV0IHJlc3QgPSBibG9ja1xuXHRjb25zdCBsaW5lMSA9IHJlc3QuaGVhZFNsaWNlKClcblx0aWYgKGlzS2V5d29yZChLV19EbywgbGluZTEuaGVhZCgpKSkge1xuXHRcdGNvbnN0IGRvbmUgPSBqdXN0QmxvY2tEbyhLV19EbywgbGluZTEudGFpbCgpKVxuXHRcdG9wRG8gPSBDbGFzc0RvKGxpbmUxLmxvYywgTG9jYWxEZWNsYXJlRm9jdXMobGluZTEubG9jLCBkb25lKSwgZG9uZSlcblx0XHRyZXN0ID0gYmxvY2sudGFpbCgpXG5cdH1cblx0aWYgKCFyZXN0LmlzRW1wdHkoKSkge1xuXHRcdGNvbnN0IGxpbmUyID0gcmVzdC5oZWFkU2xpY2UoKVxuXHRcdGlmIChpc0tleXdvcmQoS1dfU3RhdGljLCBsaW5lMi5oZWFkKCkpKSB7XG5cdFx0XHRzdGF0aWNzID0gX3BhcnNlU3RhdGljcyhsaW5lMi50YWlsKCkpXG5cdFx0XHRyZXN0ID0gcmVzdC50YWlsKClcblx0XHR9XG5cdFx0aWYgKCFyZXN0LmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgbGluZTMgPSByZXN0LmhlYWRTbGljZSgpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKEtXX0NvbnN0cnVjdCwgbGluZTMuaGVhZCgpKSkge1xuXHRcdFx0XHRvcENvbnN0cnVjdG9yID0gX3BhcnNlQ29uc3RydWN0b3IobGluZTMudGFpbCgpKVxuXHRcdFx0XHRyZXN0ID0gcmVzdC50YWlsKClcblx0XHRcdH1cblx0XHRcdG1ldGhvZHMgPSBfcGFyc2VNZXRob2RzKHJlc3QpXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIENsYXNzKHRva2Vucy5sb2MsIG9wRXh0ZW5kZWQsIG9wRG8sIHN0YXRpY3MsIG9wQ29uc3RydWN0b3IsIG1ldGhvZHMpXG59XG5cbmNvbnN0XG5cdF9wYXJzZUNvbnN0cnVjdG9yID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHRydWUsIHRva2Vucylcblx0XHRjb25zdCBpc0dlbmVyYXRvciA9IGZhbHNlLCBvcERlY2xhcmVSZXMgPSBudWxsXG5cdFx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLFxuXHRcdFx0TG9jYWxEZWNsYXJlVGhpcyh0b2tlbnMubG9jKSxcblx0XHRcdGlzR2VuZXJhdG9yLFxuXHRcdFx0YXJncywgb3BSZXN0QXJnLFxuXHRcdFx0YmxvY2ssIG9wSW4sIG9wRGVjbGFyZVJlcywgb3BPdXQpXG5cdH0sXG5cdF9wYXJzZVN0YXRpY3MgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0ganVzdEJsb2NrKEtXX1N0YXRpYywgdG9rZW5zKVxuXHRcdHJldHVybiBfcGFyc2VNZXRob2RzKGJsb2NrKVxuXHR9LFxuXHRfcGFyc2VNZXRob2RzID0gdG9rZW5zID0+IHRva2Vucy5tYXBTbGljZXMoX3BhcnNlTWV0aG9kKSxcblx0X3BhcnNlTWV0aG9kID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXG5cdFx0aWYgKGlzS2V5d29yZChLV19HZXQsIGhlYWQpIHx8IGlzS2V5d29yZChLV19TZXQsIGhlYWQpKVxuXHRcdFx0Y29udGV4dC5mYWlsKGhlYWQubG9jLCAnVE9ETzogZ2V0L3NldCEnKVxuXG5cdFx0Y29uc3QgYmFhID0gdG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoX2lzRnVuS2V5d29yZClcblx0XHRjb250ZXh0LmNoZWNrKGJhYSAhPT0gbnVsbCwgdG9rZW5zLmxvYywgJ0V4cGVjdGVkIGEgZnVuY3Rpb24ga2V5d29yZCBzb21ld2hlcmUuJylcblxuXHRcdGNvbnN0IHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSA9IGJhYVxuXG5cdFx0Y29uc3Qga2luZCA9IF9tZXRob2RGdW5LaW5kKGF0KVxuXHRcdGNvbnN0IGZ1biA9IHBhcnNlRnVuKGtpbmQsIGFmdGVyKVxuXHRcdGFzc2VydChmdW4ub3BOYW1lID09PSBudWxsKVxuXG5cdFx0bGV0IHN5bWJvbCA9IHBhcnNlRXhwcihiZWZvcmUpXG5cdFx0aWYgKHN5bWJvbCBpbnN0YW5jZW9mIFF1b3RlICYmXG5cdFx0XHRzeW1ib2wucGFydHMubGVuZ3RoID09PSAxICYmXG5cdFx0XHR0eXBlb2Ygc3ltYm9sLnBhcnRzWzBdID09PSAnc3RyaW5nJykge1xuXHRcdFx0ZnVuLm9wTmFtZSA9IHN5bWJvbC5wYXJ0c1swXVxuXHRcdFx0cmV0dXJuIGZ1blxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIE1ldGhvZEltcGwodG9rZW5zLmxvYywgc3ltYm9sLCBmdW4pXG5cdH0sXG5cdF9tZXRob2RGdW5LaW5kID0gZnVuS2luZFRva2VuID0+IHtcblx0XHRzd2l0Y2ggKGZ1bktpbmRUb2tlbi5raW5kKSB7XG5cdFx0XHRjYXNlIEtXX0Z1bjogcmV0dXJuIEtXX0Z1blRoaXNcblx0XHRcdGNhc2UgS1dfRnVuRG86IHJldHVybiBLV19GdW5UaGlzRG9cblx0XHRcdGNhc2UgS1dfRnVuR2VuOiByZXR1cm4gS1dfRnVuVGhpc0dlblxuXHRcdFx0Y2FzZSBLV19GdW5HZW5EbzogcmV0dXJuIEtXX0Z1blRoaXNHZW5Eb1xuXHRcdFx0Y2FzZSBLV19GdW5UaGlzOiBjYXNlIEtXX0Z1blRoaXNEbzogY2FzZSBLV19GdW5UaGlzR2VuOiBjYXNlIEtXX0Z1blRoaXNHZW5Ebzpcblx0XHRcdFx0Y29udGV4dC5mYWlsKGZ1bktpbmRUb2tlbi5sb2MsICdGdW5jdGlvbiBgLmAgaXMgaW1wbGljaXQgZm9yIG1ldGhvZHMuJylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnRleHQuZmFpbChmdW5LaW5kVG9rZW4ubG9jLCBgRXhwZWN0ZWQgZnVuY3Rpb24ga2luZCwgZ290ICR7ZnVuS2luZFRva2VufWApXG5cdFx0fVxuXHR9LFxuXHRfaXNGdW5LZXl3b3JkID0gZnVuS2luZFRva2VuID0+IHtcblx0XHRpZiAoZnVuS2luZFRva2VuIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoZnVuS2luZFRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfRnVuRG86IGNhc2UgS1dfRnVuR2VuOiBjYXNlIEtXX0Z1bkdlbkRvOlxuXHRcdFx0XHRjYXNlIEtXX0Z1blRoaXM6IGNhc2UgS1dfRnVuVGhpc0RvOiBjYXNlIEtXX0Z1blRoaXNHZW46XG5cdFx0XHRcdGNhc2UgS1dfRnVuVGhpc0dlbkRvOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuY29uc3QgcGFyc2VRdW90ZSA9IHRva2VucyA9PlxuXHRRdW90ZSh0b2tlbnMubG9jLCB0b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=