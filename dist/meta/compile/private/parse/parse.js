if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'tupl/dist/tupl', '../../CompileError', '../../MsAst', '../language', '../Token', '../util', './Slice'], function (exports, module, _esastDistLoc, _tuplDistTupl, _CompileError, _MsAst, _language, _Token, _util, _Slice) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	var _Slice2 = _interopRequire(_Slice);

	let context;

	const WithObjKeys = (0, _tupl)('WithObjKeys', Object, 'Wraps an Do with keys for this block\'s Obj. Not meant to escape this file.', ['keys', [_MsAst.LocalDeclare], 'line', _MsAst.Do]);

	module.exports = function (_context, rootToken) {
		context = _context;
		(0, _util.assert)((0, _Token.isGroup)(_Token.G_Block, rootToken));
		return parseModule(_Slice2.group(rootToken));
	};

	const checkEmpty = function (tokens, message) {
		return context.check(tokens.isEmpty(), tokens.loc, message);
	},
	      checkNonEmpty = function (tokens, message) {
		return context.check(!tokens.isEmpty(), tokens.loc, message);
	},
	      unexpected = function (t) {
		return context.fail(t.loc, 'Unexpected ' + t.show());
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

		if (context.opts.includeModuleName() && !exports.some(function (_) {
			return _.name === 'name';
		})) {
			const dn = _MsAst.LocalDeclare.declareName(tokens.loc);
			lines.push((0, _MsAst.Assign)(tokens.loc, dn, _MsAst.Quote.forString(tokens.loc, context.opts.moduleName())));
			exports.push(dn);
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
		return [tokens.rtail(), _Slice2.group(block)];
	},
	      blockWrap = function (tokens) {
		return (0, _MsAst.BlockWrap)(tokens.loc, parseBlockVal(tokens));
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
		context.check(tokens.size() > 1, h.loc, function () {
			return 'Expected indented block after ' + h.show();
		});
		const block = tokens.second();
		(0, _util.assert)(tokens.size() === 2 && (0, _Token.isGroup)(_Token.G_Block, block));
		return (0, _util.flatMap)(block.tokens, function (line) {
			return parseLineOrLines(_Slice2.group(line));
		});
	},
	      parseBlockDo = function (tokens) {
		// OK if last line is a Val, we'll just treat it as a Do.

		var _parseBlockLines2 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines2.allLines;
		const kReturn = _parseBlockLines2.kReturn;

		context.check(kReturn === KReturn_Plain, tokens.loc, function () {
			return 'Can not make ' + kReturn + ' in statement context.';
		});
		return (0, _MsAst.BlockDo)(tokens.loc, allLines);
	},
	      parseBlockVal = function (tokens) {
		const block = parseAnyBlock(tokens);
		context.check(!(block instanceof _MsAst.BlockDo), block.loc, 'Expected a value block.');
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
					const ctr = kReturn === KReturn_Bag ? _MsAst.BlockBag : _MsAst.BlockMap;
					return { lines: [], exports: exports, opDefaultExport: (0, _MsAst.BlockWrap)(loc, ctr(loc, allLines)) };
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
				return (0, _MsAst.BlockBag)(tokens.loc, allLines);
			case KReturn_Map:
				return (0, _MsAst.BlockMap)(tokens.loc, allLines);
			default:
				var _tryTakeLastVal3 = _tryTakeLastVal(allLines),
				    lines = _tryTakeLastVal3.lines,
				    opVal = _tryTakeLastVal3.opVal;

				return kReturn === KReturn_Obj ? (0, _MsAst.BlockObj)(tokens.loc, lines, objKeys, opVal, null) : (0, _util.ifElse)(opVal, function (_) {
					return (0, _MsAst.BlockWithReturn)(tokens.loc, lines, _);
				}, function () {
					return (0, _MsAst.BlockDo)(tokens.loc, lines);
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
		return !(0, _util.isEmpty)(lines) && (0, _util.last)(lines) instanceof _MsAst.Val ? { lines: (0, _util.rtail)(lines), opVal: (0, _util.last)(lines) } : { lines: lines, opVal: null };
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
			if (line instanceof _MsAst.Debug) line.lines.forEach(function (_) {
				return checkLine(_, true);
			});else if (line instanceof _MsAst.BagEntry) {
				context.check(!inDebug, line.loc, 'Not supported: debug list entries');
				isBag = true;
			} else if (line instanceof _MsAst.MapEntry) {
				context.check(!inDebug, line.loc, 'Not supported: debug map entries');
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
		context.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		context.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		context.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

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
			return _MsAst.Assign.focus(before.loc, parseExpr(before));
		});

		const lastLine = _Slice2.group(block.last());

		var _ref = (0, _Token.isKeyword)(_Token.KW_Else, lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(lastLine.tail())] : [block, null];

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
			const ft = _Slice2.group(first);
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
				const loc = (0, _Loc)(name.loc.start, tokensValue.loc.end);
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
						return (0, _util.push)(out, (0, _MsAst.Yield)(tokens.loc, parseExpr(rest())));
					case _Token.KW_YieldTo:
						return (0, _util.push)(out, (0, _MsAst.YieldTo)(tokens.loc, parseExpr(rest())));
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
				context.fail(tokens.loc, 'Expected an expression, got nothing.');
			case 1:
				return (0, _util.head)(parts);
			default:
				return (0, _MsAst.Call)(tokens.loc, (0, _util.head)(parts), (0, _util.tail)(parts));
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

		args.forEach(function (arg) {
			if (!arg.isLazy()) arg.kind = _MsAst.LD_Mutable;
		});
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
			if ((0, _Token.isGroup)(_Token.G_Space, h) && (0, _Token.isKeyword)(_Token.KW_Type, (0, _util.head)(h.tokens))) return {
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
			const args = [_MsAst.LocalDeclare.focus(h.loc)];
			return h.kind === _Token.KW_Case ? {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _MsAst.BlockWithReturn)(tokens.loc, [], eCase)
			} : {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: (0, _MsAst.BlockDo)(tokens.loc, [eCase])
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
				context.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: _MsAst.LocalDeclare.plain(l.loc, l.name)
				};
			} else return { args: parseLocalDeclares(tokens), opRestArg: null };
		}
	},
	      _tryTakeInOrOut = function (inOrOut, tokens) {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head();
			if ((0, _Token.isKeyword)(inOrOut, (0, _util.head)(firstLine.tokens))) {
				const inOut = (0, _MsAst.Debug)(firstLine.loc, parseLinesFromBlock(_Slice2.group(firstLine)));
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
			case _Token.KW_CaseDo:
				return parseCase(_Token.KW_CaseDo, false, rest);
			case _Token.KW_Debug:
				return (0, _MsAst.Debug)(tokens.lok, (0, _Token.isGroup)(_Token.G_Block, tokens.second()) ?
				// `debug`, then indented block
				parseLinesFromBlock() :
				// `debug`, then single line
				parseLineOrLines(rest));
			case _Token.KW_Debugger:
				noRest();
				return (0, _MsAst.SpecialDo)(tokens.loc, _MsAst.SP_Debugger);
			case _Token.KW_BreakDo:
				noRest();
				return (0, _MsAst.BreakDo)(tokens.loc);
			case _Token.KW_IfDo:case _Token.KW_UnlessDo:
				{
					var _beforeAndBlock6 = beforeAndBlock(rest);

					var _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2);

					const before = _beforeAndBlock62[0];
					const block = _beforeAndBlock62[1];

					const ctr = head.kind === _Token.KW_IfDo ? _MsAst.IfDo : _MsAst.UnlessDo;
					return ctr(tokens.loc, parseExpr(before), parseBlockDo(block));
				}
			case _Token.KW_ForDo:
				return parseFor(rest);
			case _Token.KW_ObjAssign:
				// Index is set by parseBlock.
				return (0, _MsAst.BagEntry)(tokens.loc, parseExpr(rest), -1);
			case _Token.KW_Pass:
				noRest();
				return [];
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return (0, _util.ifElse)(tokens.opSplitOnceWhere(_isLineSplitKeyword), function (_ref3) {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

			return at.kind === _Token.KW_MapEntry ? _parseMapEntry(before, after, tokens.loc) : at.kind === _Token.KW_AssignMutate ? _parseAssignMutate(before, after, tokens.loc) : _parseAssign(before, at, after, tokens.loc);
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
			case _Token.KW_Assign:case _Token.KW_AssignMutable:case _Token.KW_AssignMutate:
			case _Token.KW_MapEntry:case _Token.KW_ObjAssign:case _Token.KW_Yield:case _Token.KW_YieldTo:
				return true;
			default:
				return false;
		} else return false;
	},
	      _parseAssignMutate = function (localsTokens, valueTokens, loc) {
		const locals = parseLocalDeclaresJustNames(localsTokens);
		context.check(locals.length === 1, loc, 'TODO: AssignDestructureMutate');
		const name = locals[0].name;
		const value = parseExpr(valueTokens);
		return (0, _MsAst.AssignMutate)(loc, name, value);
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
			if (isYield) locals.forEach(function (_) {
				return context.check(!_.isLazy(), _.loc, 'Can not yield to lazy variable.');
			});

			const isObjAssign = kind === _Token.KW_ObjAssign;

			if (kind === _Token.KW_AssignMutable) locals.forEach(function (_) {
				context.check(!_.isLazy(), _.loc, 'Lazy local can not be mutable.');
				_.kind = _MsAst.LD_Mutable;
			});

			const ass = (function () {
				if (locals.length === 1) {
					const assignee = locals[0];
					const assign = (0, _MsAst.Assign)(loc, assignee, value);
					const isTest = isObjAssign && assignee.name.endsWith('test');
					return isTest ? (0, _MsAst.Debug)(loc, [assign]) : assign;
				} else {
					const kind = locals[0].kind;
					locals.forEach(function (_) {
						return context.check(_.kind === kind, _.loc, 'All locals of destructuring assignment must be of the same kind.');
					});
					return (0, _MsAst.AssignDestructure)(loc, locals, value, kind);
				}
			})();

			return isObjAssign ? WithObjKeys(locals, ass) : ass;
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
		if (_ instanceof _MsAst.BlockWrap) if (_.block instanceof _MsAst.BlockObj) if (_.block.opObjed !== null && _.block.opObjed instanceof _MsAst.Fun) _.block.opObjed.name = name;else if (!_.block.keys.some(function (_) {
			return _.name === 'name';
		})) _.block.opName = name;
	},
	      _parseMapEntry = function (before, after, loc) {
		return (0, _MsAst.MapEntry)(loc, parseExpr(before), parseExpr(after));
	};

	const parseLocalDeclaresJustNames = function (tokens) {
		return tokens.map(function (_) {
			return _MsAst.LocalDeclare.plain(_.loc, _parseLocalName(_));
		});
	},
	      parseLocalDeclares = function (tokens) {
		return tokens.map(parseLocalDeclare);
	},
	      parseLocalDeclare = function (token) {
		if ((0, _Token.isGroup)(_Token.G_Space, token)) {
			const tokens = _Slice2.group(token);

			var _ref4 = (0, _Token.isKeyword)(_Token.KW_Lazy, tokens.head()) ? [tokens.tail(), true] : [tokens, false];

			var _ref42 = _slicedToArray(_ref4, 2);

			const rest = _ref42[0];
			const isLazy = _ref42[1];

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
		} else return _MsAst.LocalDeclare.plain(token.loc, _parseLocalName(token));
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

	const parseSingle = function (t) {
		return t instanceof _Token.Name ? _access(t.name, t.loc) : t instanceof _Token.Group ? (function () {
			switch (t.kind) {
				case _Token.G_Space:
					return parseSpaced(_Slice2.group(t));
				case _Token.G_Parenthesis:
					return parseExpr(_Slice2.group(t));
				case _Token.G_Bracket:
					return (0, _MsAst.BagSimple)(t.loc, parseExprParts(_Slice2.group(t)));
				case _Token.G_Block:
					return blockWrap(_Slice2.group(t));
				case _Token.G_Quote:
					return (0, _MsAst.Quote)(t.loc, t.tokens.map(function (_) {
						return typeof _ === 'string' ? _ : parseSingle(_);
					}));
				default:
					unexpected(t);
			}
		})() : t instanceof _Token.TokenNumberLiteral ? (0, _MsAst.NumberLiteral)(t.loc, t.value) : t instanceof _Token.CallOnFocus ? (0, _MsAst.Call)(t.loc, _access(t.name, t.loc), [_MsAst.LocalAccess.focus(t.loc)]) : t instanceof _Token.Keyword ? t.kind === _Token.KW_Focus ? _MsAst.LocalAccess.focus(t.loc) : (0, _MsAst.SpecialVal)(t.loc, (0, _Token.opKWtoSV)(t.kind) || unexpected(t)) : t instanceof _Token.DotName && t.nDots === 3 ? (0, _MsAst.Splat)(t.loc, (0, _MsAst.LocalAccess)(t.loc, t.name)) : unexpected(t);
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
			const memberOrSubscript = function (e, t) {
				const loc = t.loc;
				if (t instanceof _Token.DotName) {
					context.check(t.nDots === 1, tokens.loc, 'Too many dots!');
					return (0, _MsAst.Member)(tokens.loc, e, t.name);
				} else if (t instanceof _Token.Group) {
					if (t.kind === _Token.G_Bracket) return _MsAst.Call.sub(loc, (0, _util.unshift)(e, parseExprParts(_Slice2.group(t))));
					if (t.kind === _Token.G_Parenthesis) {
						checkEmpty(_Slice2.group(t), function () {
							return 'Use ' + (0, _CompileError.code)('(a b)') + ', not ' + (0, _CompileError.code)('a(b)');
						});
						return (0, _MsAst.Call)(tokens.loc, e, []);
					}
				} else context.fail(tokens.loc, 'Expected member or sub, not ' + t.show());
			};
			return rest.reduce(memberOrSubscript, parseSingle(h));
		}
	};

	const tryParseUses = function (k, tokens) {
		if (!tokens.isEmpty()) {
			const line0 = _Slice2.group(tokens.head());
			if ((0, _Token.isKeyword)(k, line0.head())) return [_parseUses(k, line0.tail()), tokens.tail()];
		}
		return [[], tokens];
	};

	// tryParseUse privates
	const _parseUses = function (k, tokens) {
		var _beforeAndBlock7 = beforeAndBlock(tokens);

		var _beforeAndBlock72 = _slicedToArray(_beforeAndBlock7, 2);

		const before = _beforeAndBlock72[0];
		const lines = _beforeAndBlock72[1];

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
				return (0, _MsAst.UseDo)(line.loc, path);
			} else {
				const isLazy = k === _Token.KW_UseLazy || k === _Token.KW_UseDebug;

				var _parseThingsUsed2 = _parseThingsUsed(name, isLazy, _Slice2.group(line).tail());

				const used = _parseThingsUsed2.used;
				const opUseDefault = _parseThingsUsed2.opUseDefault;

				return (0, _MsAst.Use)(line.loc, path, used, opUseDefault);
			}
		});
	},
	      _parseThingsUsed = function (name, isLazy, tokens) {
		const useDefault = function () {
			return _MsAst.LocalDeclare.noType(tokens.loc, name, isLazy);
		};
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref5 = (0, _Token.isKeyword)(_Token.KW_Focus, tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref52 = _slicedToArray(_ref5, 2);

			const opUseDefault = _ref52[0];
			const rest = _ref52[1];

			const used = parseLocalDeclaresJustNames(rest).map(function (l) {
				context.check(l.name !== '_', l.pos, function () {
					return '' + (0, _CompileError.code)('_') + ' not allowed as import name.';
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
			return _parseLocalRequire(_Slice2.group(t));
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
		tokens.tail().each(function (t) {
			context.check(t instanceof _Token.DotName && t.nDots === 1, t.loc, 'Not a valid part of module path.');
			parts.push(t.name);
		});
		return { path: parts.join('/'), name: tokens.last().name };
	},
	      _partsFromDotName = function (dotName) {
		return dotName.nDots === 1 ? ['.'] : (0, _util.repeat)('..', dotName.nDots - 1);
	};

	const parseFor = function (tokens) {
		var _beforeAndBlock8 = beforeAndBlock(tokens);

		var _beforeAndBlock82 = _slicedToArray(_beforeAndBlock8, 2);

		const before = _beforeAndBlock82[0];
		const block = _beforeAndBlock82[1];

		const body = parseBlockDo(block);
		if (before.isEmpty()) return (0, _MsAst.ForDoPlain)(tokens.loc, body);else {
			var _ifElse = (0, _util.ifElse)(before.opSplitOnceWhere(function (_) {
				return (0, _Token.isKeyword)(_Token.KW_In, _);
			}), function (_ref6) {
				let before = _ref6.before;
				let after = _ref6.after;

				context.check(before.size() === 1, before.loc, 'TODO: pattern in for!');
				return {
					element: parseLocalDeclaresJustNames(before)[0],
					bag: parseExpr(after)
				};
			}, function () {
				return { element: _MsAst.LocalDeclare.focus(before.loc), bag: parseExpr(before) };
			});

			const element = _ifElse.element;
			const bag = _ifElse.bag;

			return (0, _MsAst.ForDoWithBag)(tokens.loc, element, bag, body);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxLQUFJLE9BQU8sQ0FBQTs7QUFFWCxPQUFNLFdBQVcsR0FBRyxXQUFLLGFBQWEsRUFBRSxNQUFNLEVBQzdDLDZFQUE2RSxFQUM3RSxDQUFFLE1BQU0sRUFBRSxRQWxCd0IsWUFBWSxDQWtCdEIsRUFBRSxNQUFNLFNBbkJ6QixFQUFFLENBbUI0QixDQUFDLENBQUE7O2tCQUV4QixVQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7QUFDdkMsU0FBTyxHQUFHLFFBQVEsQ0FBQTtBQUNsQixZQVpRLE1BQU0sRUFZUCxXQWxCbUYsT0FBTyxTQUE1RCxPQUFPLEVBa0JwQixTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFNBQU8sV0FBVyxDQUFDLFFBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFDMUM7O0FBRUQsT0FDQyxVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ3JELGFBQWEsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUN0RCxVQUFVLEdBQUcsVUFBQSxDQUFDO1NBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFHO0VBQUEsQ0FBQTs7QUFFaEUsT0FBTSxXQUFXLEdBQUcsVUFBQSxNQUFNLEVBQUk7c0JBQ0gsWUFBWSxRQTFCakIsUUFBUSxFQTBCb0IsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07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bkIsT0FBTyxXQWx0QmlCLFVBQVUsRUFrdEJoQixNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBLEtBQy9CO2lCQUVILFVBMXNCbUIsTUFBTSxFQTBzQmxCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFBLENBQUM7V0FBSSxXQS9zQnZDLFNBQVMsU0FFVCxLQUFLLEVBNnNCbUQsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxFQUN2RCxVQUFDLEtBQWlCLEVBQUs7UUFBcEIsTUFBTSxHQUFSLEtBQWlCLENBQWYsTUFBTTtRQUFFLEtBQUssR0FBZixLQUFpQixDQUFQLEtBQUs7O0FBQ2YsV0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RSxXQUFPO0FBQ04sWUFBTyxFQUFFLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxRQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQztLQUNyQixDQUFBO0lBQ0QsRUFDRDtXQUFPLEVBQUUsT0FBTyxFQUFFLE9BNXRCWSxZQUFZLENBNHRCWCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFBQyxDQUFDOztTQVR0RSxPQUFPLFdBQVAsT0FBTztTQUFFLEdBQUcsV0FBSCxHQUFHOztBQVVwQixVQUFPLFdBOXRCNkIsWUFBWSxFQTh0QjVCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtHQUNuRDtFQUNELENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQXNzaWduTXV0YXRlLCBCYWdFbnRyeSwgQmFnU2ltcGxlLCBCbG9ja0JhZywgQmxvY2tEbywgQmxvY2tNYXAsXG5cdEJsb2NrT2JqLCBCbG9ja1dpdGhSZXR1cm4sIEJsb2NrV3JhcCwgQnJlYWtEbywgQ2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsIENhc2VEbywgQ2FzZVZhbCxcblx0RGVidWcsIERvLCBOdW1iZXJMaXRlcmFsLCBGb3JEb1BsYWluLCBGb3JEb1dpdGhCYWcsIEZ1biwgR2xvYmFsQWNjZXNzLCBJZkRvLCBMYXp5LCBMRF9Db25zdCxcblx0TERfTGF6eSwgTERfTXV0YWJsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlUmVzLCBNYXBFbnRyeSwgTWVtYmVyLCBNb2R1bGUsXG5cdE9ialBhaXIsIE9ialNpbXBsZSwgUGF0dGVybiwgUXVvdGUsIFNQX0RlYnVnZ2VyLCBTcGVjaWFsRG8sIFNwZWNpYWxWYWwsIFNWX051bGwsIFNwbGF0LCBWYWwsXG5cdFVubGVzc0RvLCBVc2UsIFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL01zQXN0J1xuaW1wb3J0IHsgSnNHbG9iYWxzIH0gZnJvbSAnLi4vbGFuZ3VhZ2UnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19QYXJlbnRoZXNpcywgR19TcGFjZSwgR19RdW90ZSwgaXNHcm91cCxcblx0aXNLZXl3b3JkLCBLZXl3b3JkLCBLV19Bc3NpZ24sIEtXX0Fzc2lnbk11dGFibGUsIEtXX0Fzc2lnbk11dGF0ZSwgS1dfQnJlYWtEbywgS1dfQ2FzZSxcblx0S1dfQ2FzZURvLCBLV19EZWJ1ZywgS1dfRGVidWdnZXIsIEtXX0Vsc2UsIEtXX0ZvckRvLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0lmRG8sXG5cdEtXX0luLCBLV19MYXp5LCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19QYXNzLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVHlwZSwgS1dfVW5sZXNzRG8sXG5cdEtXX1VzZSwgS1dfVXNlRGVidWcsIEtXX1VzZURvLCBLV19Vc2VMYXp5LCBLV19ZaWVsZCwgS1dfWWllbGRUbywgTmFtZSwgb3BLV3RvU1YsXG5cdFRva2VuTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL1Rva2VuJ1xuaW1wb3J0IHsgYXNzZXJ0LCBoZWFkLCBpZkVsc2UsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsXG5cdG9wSWYsIG9wTWFwLCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1NsaWNlJ1xuXG5sZXQgY29udGV4dFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IChfY29udGV4dCwgcm9vdFRva2VuKSA9PiB7XG5cdGNvbnRleHQgPSBfY29udGV4dFxuXHRhc3NlcnQoaXNHcm91cChHX0Jsb2NrLCByb290VG9rZW4pKVxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoU2xpY2UuZ3JvdXAocm9vdFRva2VuKSlcbn1cblxuY29uc3Rcblx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y29udGV4dC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y29udGV4dC5jaGVjayghdG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdHVuZXhwZWN0ZWQgPSB0ID0+IGNvbnRleHQuZmFpbCh0LmxvYywgYFVuZXhwZWN0ZWQgJHt0LnNob3coKX1gKVxuXG5jb25zdCBwYXJzZU1vZHVsZSA9IHRva2VucyA9PiB7XG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURvLCB0b2tlbnMpXG5cdGNvbnN0IFsgcGxhaW5Vc2VzLCByZXN0MSBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZSwgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlTGF6eSwgcmVzdDEpXG5cdGNvbnN0IFsgZGVidWdVc2VzLCByZXN0MyBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURlYnVnLCByZXN0Milcblx0Y29uc3QgeyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH0gPSBwYXJzZU1vZHVsZUJsb2NrKHJlc3QzKVxuXG5cdGlmIChjb250ZXh0Lm9wdHMuaW5jbHVkZU1vZHVsZU5hbWUoKSAmJiAhZXhwb3J0cy5zb21lKF8gPT4gXy5uYW1lID09PSAnbmFtZScpKSB7XG5cdFx0Y29uc3QgZG4gPSBMb2NhbERlY2xhcmUuZGVjbGFyZU5hbWUodG9rZW5zLmxvYylcblx0XHRsaW5lcy5wdXNoKEFzc2lnbih0b2tlbnMubG9jLCBkbixcblx0XHRcdFF1b3RlLmZvclN0cmluZyh0b2tlbnMubG9jLCBjb250ZXh0Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cdFx0ZXhwb3J0cy5wdXNoKGRuKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y29udGV4dC5jaGVjayhpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCbG9ja0RvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJsb2NrVmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0cGFyc2VMaW5lc0Zyb21CbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjb250ZXh0LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aC5zaG93KCl9YClcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIGlzR3JvdXAoR19CbG9jaywgYmxvY2spKVxuXHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnRva2VucywgbGluZSA9PiBwYXJzZUxpbmVPckxpbmVzKFNsaWNlLmdyb3VwKGxpbmUpKSlcblx0fSxcblxuXHRwYXJzZUJsb2NrRG8gPSB0b2tlbnMgPT4ge1xuXHRcdC8vIE9LIGlmIGxhc3QgbGluZSBpcyBhIFZhbCwgd2UnbGwganVzdCB0cmVhdCBpdCBhcyBhIERvLlxuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGNvbnRleHQuY2hlY2soa1JldHVybiA9PT0gS1JldHVybl9QbGFpbiwgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHR9LFxuXHRwYXJzZUJsb2NrVmFsID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBibG9jayA9IHBhcnNlQW55QmxvY2sodG9rZW5zKVxuXHRcdGNvbnRleHQuY2hlY2soIShibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8pLCBibG9jay5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0cGFyc2VNb2R1bGVCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5czogZXhwb3J0cyB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y29uc3QgbG9jID0gdG9rZW5zLmxvY1xuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzogY2FzZSBLUmV0dXJuX01hcDoge1xuXHRcdFx0XHRjb25zdCBjdHIgPSBrUmV0dXJuID09PSBLUmV0dXJuX0JhZyA/IEJsb2NrQmFnIDogQmxvY2tNYXBcblx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IFsgXSwgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0OiBCbG9ja1dyYXAobG9jLCBjdHIobG9jLCBhbGxMaW5lcykpIH1cblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnN0IHsgbGluZXMsIG9wVmFsOiBvcERlZmF1bHRFeHBvcnQgfSA9IF90cnlUYWtlTGFzdFZhbChhbGxMaW5lcylcblx0XHRcdFx0cmV0dXJuIHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9XG5cdFx0fVxuXHR9LFxuXG5cdHBhcnNlQW55QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIEJsb2NrQmFnKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX01hcDpcblx0XHRcdFx0cmV0dXJuIEJsb2NrTWFwKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc3QgeyBsaW5lcywgb3BWYWwgfSA9IF90cnlUYWtlTGFzdFZhbChhbGxMaW5lcylcblx0XHRcdFx0cmV0dXJuIGtSZXR1cm4gPT09IEtSZXR1cm5fT2JqID9cblx0XHRcdFx0XHRCbG9ja09iaih0b2tlbnMubG9jLCBsaW5lcywgb2JqS2V5cywgb3BWYWwsIG51bGwpIDpcblx0XHRcdFx0XHRpZkVsc2Uob3BWYWwsXG5cdFx0XHRcdFx0XHRfID0+IEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBsaW5lcywgXyksXG5cdFx0XHRcdFx0XHQoKSA9PiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKSlcblx0XHR9XG5cdH1cblxuLy8gcGFyc2VCbG9jayBwcml2YXRlc1xuY29uc3Rcblx0X2p1c3RCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblxuXHRfdHJ5VGFrZUxhc3RWYWwgPSBsaW5lcyA9PlxuXHRcdCghaXNFbXB0eShsaW5lcykgJiYgbGFzdChsaW5lcykgaW5zdGFuY2VvZiBWYWwpID9cblx0XHRcdHsgbGluZXM6IHJ0YWlsKGxpbmVzKSwgb3BWYWw6IGxhc3QobGluZXMpIH0gOlxuXHRcdFx0eyBsaW5lcywgb3BWYWw6IG51bGwgfSxcblxuXHRLUmV0dXJuX1BsYWluID0gMCxcblx0S1JldHVybl9PYmogPSAxLFxuXHRLUmV0dXJuX0JhZyA9IDIsXG5cdEtSZXR1cm5fTWFwID0gMyxcblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gWyBdXG5cdFx0bGV0IGlzQmFnID0gZmFsc2UsIGlzTWFwID0gZmFsc2Vcblx0XHRjb25zdCBjaGVja0xpbmUgPSAobGluZSwgaW5EZWJ1ZykgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKF8gPT4gY2hlY2tMaW5lKF8sIHRydWUpKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIEJhZ0VudHJ5KSB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0aXNCYWcgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIG1hcCBlbnRyaWVzJylcblx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBXaXRoT2JqS2V5cylcblx0XHRcdFx0b2JqS2V5cy5wdXNoKC4uLmxpbmUua2V5cylcblx0XHR9XG5cdFx0Y29uc3QgYWxsTGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRsaW5lLmZvckVhY2goYWRkTGluZSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGVja0xpbmUobGluZSwgZmFsc2UpXG5cdFx0XHRcdGFsbExpbmVzLnB1c2gobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzID8gbGluZS5saW5lIDogbGluZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0bGluZXMuZWFjaChfID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKF8pKSkpXG5cblx0XHRjb25zdCBpc09iaiA9ICFpc0VtcHR5KG9iaktleXMpXG5cdFx0Y29udGV4dC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjb250ZXh0LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGNvbnRleHQuY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID1cblx0XHRcdGlzT2JqID8gS1JldHVybl9PYmogOiBpc0JhZyA/IEtSZXR1cm5fQmFnIDogaXNNYXAgPyBLUmV0dXJuX01hcCA6IEtSZXR1cm5fUGxhaW5cblx0XHRyZXR1cm4geyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9XG5cdH1cblxuY29uc3QgcGFyc2VDYXNlID0gKGssIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IGlzVmFsID0gayA9PT0gS1dfQ2FzZVxuXG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IG51bGxcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnbi5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IGlzS2V5d29yZChLV19FbHNlLCBsYXN0TGluZS5oZWFkKCkpID9cblx0XHRbIGJsb2NrLnJ0YWlsKCksIChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpIF0gOlxuXHRcdFsgYmxvY2ssIG51bGwgXVxuXG5cdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcChsaW5lID0+IHtcblx0XHRsaW5lID0gU2xpY2UuZ3JvdXAobGluZSlcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKGxpbmUpXG5cdFx0Y29uc3QgdGVzdCA9IF9wYXJzZUNhc2VUZXN0KGJlZm9yZSlcblx0XHRjb25zdCByZXN1bHQgPSAoaXNWYWwgPyBwYXJzZUJsb2NrVmFsIDogcGFyc2VCbG9ja0RvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjb250ZXh0LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfT2JqQXNzaWduLCBfKSksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkoZmlyc3QsICgpID0+IGBVbmV4cGVjdGVkICR7c3BsaXRzWzBdLmF0LnNob3coKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbIF1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgRXhwZWN0ZWQgYSBuYW1lLCBub3QgJHtuYW1lLnNob3coKX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmtpbmQgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y29udGV4dC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhbiBleHByZXNzaW9uLCBnb3Qgbm90aGluZy4nKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhyZXN0KVxuXHRhcmdzLmZvckVhY2goYXJnID0+IHtcblx0XHRpZiAoIWFyZy5pc0xhenkoKSlcblx0XHRcdGFyZy5raW5kID0gTERfTXV0YWJsZVxuXHR9KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGgpICYmIGlzS2V5d29yZChLV19UeXBlLCBoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2UgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX0Nhc2UgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZyB9ID0gX3BhcnNlRnVuTG9jYWxzKGJlZm9yZSlcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2spXG5cdFx0XHRjb25zdCBbIG9wT3V0LCByZXN0MSBdID0gX3RyeVRha2VJbk9yT3V0KEtXX091dCwgcmVzdDApXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiBwYXJzZUFueUJsb2NrKHJlc3QxKSwgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBMb2NhbERlY2xhcmUucGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKGlzS2V5d29yZChpbk9yT3V0LCBoZWFkKGZpcnN0TGluZS50b2tlbnMpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhTbGljZS5ncm91cChmaXJzdExpbmUpKSlcblx0XHRcdFx0cmV0dXJuIFsgaW5PdXQsIHRva2Vucy50YWlsKCkgXVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gWyBudWxsLCB0b2tlbnMgXVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlTGluZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaGVhZCA9IHRva2Vucy5oZWFkKClcblx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0Y29uc3Qgbm9SZXN0ID0gKCkgPT5cblx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aGVhZC5zaG93KCl9YClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGhlYWQgaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoZWFkLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19DYXNlRG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQ2FzZShLV19DYXNlRG8sIGZhbHNlLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnOlxuXHRcdFx0XHRcdHJldHVybiBEZWJ1Zyh0b2tlbnMubG9rLFxuXHRcdFx0XHRcdFx0aXNHcm91cChHX0Jsb2NrLCB0b2tlbnMuc2Vjb25kKCkpID9cblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gaW5kZW50ZWQgYmxvY2tcblx0XHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soKSA6XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIHNpbmdsZSBsaW5lXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVPckxpbmVzKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnZ2VyOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWxEbyh0b2tlbnMubG9jLCBTUF9EZWJ1Z2dlcilcblx0XHRcdFx0Y2FzZSBLV19CcmVha0RvOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIEJyZWFrRG8odG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19JZkRvOiBjYXNlIEtXX1VubGVzc0RvOiB7XG5cdFx0XHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhyZXN0KVxuXHRcdFx0XHRcdGNvbnN0IGN0ciA9IGhlYWQua2luZCA9PT0gS1dfSWZEbyA/IElmRG8gOiBVbmxlc3NEb1xuXHRcdFx0XHRcdHJldHVybiBjdHIodG9rZW5zLmxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlQmxvY2tEbyhibG9jaykpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBLV19Gb3JEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGb3IocmVzdClcblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0Ly8gSW5kZXggaXMgc2V0IGJ5IHBhcnNlQmxvY2suXG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfUGFzczpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBbIF1cblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShfaXNMaW5lU3BsaXRLZXl3b3JkKSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmtpbmQgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0YXQua2luZCA9PT0gS1dfQXNzaWduTXV0YXRlID9cblx0XHRcdFx0XHRfcGFyc2VBc3NpZ25NdXRhdGUoYmVmb3JlLCBhZnRlciwgdG9rZW5zLmxvYykgOlxuXHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfaXNMaW5lU3BsaXRLZXl3b3JkID0gdG9rZW4gPT4ge1xuXHRcdGlmICh0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKHRva2VuLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19Bc3NpZ246IGNhc2UgS1dfQXNzaWduTXV0YWJsZTogY2FzZSBLV19Bc3NpZ25NdXRhdGU6XG5cdFx0XHRcdGNhc2UgS1dfTWFwRW50cnk6IGNhc2UgS1dfT2JqQXNzaWduOiBjYXNlIEtXX1lpZWxkOiBjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0fSxcblxuXHRfcGFyc2VBc3NpZ25NdXRhdGUgPSAobG9jYWxzVG9rZW5zLCB2YWx1ZVRva2VucywgbG9jKSA9PiB7XG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb250ZXh0LmNoZWNrKGxvY2Fscy5sZW5ndGggPT09IDEsIGxvYywgJ1RPRE86IEFzc2lnbkRlc3RydWN0dXJlTXV0YXRlJylcblx0XHRjb25zdCBuYW1lID0gbG9jYWxzWzBdLm5hbWVcblx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRyZXR1cm4gQXNzaWduTXV0YXRlKGxvYywgbmFtZSwgdmFsdWUpXG5cdH0sXG5cblx0X3BhcnNlQXNzaWduID0gKGxvY2Fsc1Rva2VucywgYXNzaWduZXIsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBraW5kID0gYXNzaWduZXIua2luZFxuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29uc3Qgb3BOYW1lID0gb3BJZihsb2NhbHMubGVuZ3RoID09PSAxLCAoKSA9PiBsb2NhbHNbMF0ubmFtZSlcblx0XHRjb25zdCB2YWx1ZSA9IF9wYXJzZUFzc2lnblZhbHVlKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpXG5cblx0XHRjb25zdCBpc1lpZWxkID0ga2luZCA9PT0gS1dfWWllbGQgfHwga2luZCA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGNvbnRleHQuY2hlY2soaXNZaWVsZCwgbG9jYWxzVG9rZW5zLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblxuXHRcdFx0aWYgKGtpbmQgPT09IEtXX0Fzc2lnbk11dGFibGUpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIV8uaXNMYXp5KCksIF8ubG9jLCAnTGF6eSBsb2NhbCBjYW4gbm90IGJlIG11dGFibGUuJylcblx0XHRcdFx0XHRfLmtpbmQgPSBMRF9NdXRhYmxlXG5cdFx0XHRcdH0pXG5cblx0XHRcdGNvbnN0IGFzcyA9ICgoKSA9PiB7XG5cdFx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXNzaWduZWUgPSBsb2NhbHNbMF1cblx0XHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgdmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdFx0cmV0dXJuIGlzVGVzdCA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBraW5kID0gbG9jYWxzWzBdLmtpbmRcblx0XHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGNvbnRleHQuY2hlY2soXy5raW5kID09PSBraW5kLCBfLmxvYyxcblx0XHRcdFx0XHRcdCdBbGwgbG9jYWxzIG9mIGRlc3RydWN0dXJpbmcgYXNzaWdubWVudCBtdXN0IGJlIG9mIHRoZSBzYW1lIGtpbmQuJykpXG5cdFx0XHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCB2YWx1ZSwga2luZClcblx0XHRcdFx0fVxuXHRcdFx0fSkoKVxuXG5cdFx0XHRyZXR1cm4gaXNPYmpBc3NpZ24gPyBXaXRoT2JqS2V5cyhsb2NhbHMsIGFzcykgOiBhc3Ncblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQXNzaWduVmFsdWUgPSAoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucykgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gdmFsdWVUb2tlbnMuaXNFbXB0eSgpICYmIGtpbmQgPT09IEtXX09iakFzc2lnbiA/XG5cdFx0XHRTcGVjaWFsVmFsKHZhbHVlVG9rZW5zLmxvYywgU1ZfTnVsbCkgOlxuXHRcdFx0cGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdGlmIChvcE5hbWUgIT09IG51bGwpXG5cdFx0XHRfdHJ5QWRkTmFtZSh2YWx1ZSwgb3BOYW1lKVxuXHRcdHN3aXRjaCAoa2luZCkge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlLmxvYywgdmFsdWUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIG5hbWUgaWY6XG5cdC8vIEl0J3MgYSBmdW5jdGlvblxuXHQvLyBJdCdzIGFuIE9iaiBibG9ja1xuXHQvLyBJdCdzIGFuIE9iaiBibG9jayBhdCB0aGUgZW5kIG9mIGEgY2FsbCAoYXMgaW4gYG5hbWUgPSBPYmotVHlwZSAuLi5gKVxuXHRfdHJ5QWRkTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRfLm5hbWUgPSBuYW1lXG5cdFx0ZWxzZSBpZiAoXyBpbnN0YW5jZW9mIENhbGwgJiYgXy5hcmdzLmxlbmd0aCA+IDApXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShsYXN0KF8uYXJncyksIG5hbWUpXG5cdFx0ZWxzZVxuXHRcdFx0X3RyeUFkZE9iak5hbWUoXywgbmFtZSlcblx0fSxcblx0X3RyeUFkZE9iak5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgQmxvY2tXcmFwKVxuXHRcdFx0aWYgKF8uYmxvY2sgaW5zdGFuY2VvZiBCbG9ja09iailcblx0XHRcdFx0aWYgKF8uYmxvY2sub3BPYmplZCAhPT0gbnVsbCAmJiBfLmJsb2NrLm9wT2JqZWQgaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRcdFx0Xy5ibG9jay5vcE9iamVkLm5hbWUgPSBuYW1lXG5cdFx0XHRcdGVsc2UgaWYgKCEoXy5ibG9jay5rZXlzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICduYW1lJykpKVxuXHRcdFx0XHRcdF8uYmxvY2sub3BOYW1lID0gbmFtZVxuXHR9LFxuXG5cdF9wYXJzZU1hcEVudHJ5ID0gKGJlZm9yZSwgYWZ0ZXIsIGxvYykgPT5cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMgPSB0b2tlbnMgPT5cblx0XHR0b2tlbnMubWFwKF8gPT4gTG9jYWxEZWNsYXJlLnBsYWluKF8ubG9jLCBfcGFyc2VMb2NhbE5hbWUoXykpKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cblx0cGFyc2VMb2NhbERlY2xhcmUgPSB0b2tlbiA9PiB7XG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgdG9rZW4pKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0b2tlbilcblx0XHRcdGNvbnN0IFsgcmVzdCwgaXNMYXp5IF0gPVxuXHRcdFx0XHRpc0tleXdvcmQoS1dfTGF6eSwgdG9rZW5zLmhlYWQoKSkgPyBbIHRva2Vucy50YWlsKCksIHRydWUgXSA6IFsgdG9rZW5zLCBmYWxzZSBdXG5cdFx0XHRjb25zdCBuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0Y29uc3Qgb3BUeXBlID0gb3BJZighcmVzdDIuaXNFbXB0eSgpLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soaXNLZXl3b3JkKEtXX1R5cGUsIGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbi5zaG93KCl9YClcblx0XHRcdFx0cmV0dXJuIHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZSh0b2tlbi5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5ID8gTERfTGF6eSA6IExEX0NvbnN0KVxuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIExvY2FsRGVjbGFyZS5wbGFpbih0b2tlbi5sb2MsIF9wYXJzZUxvY2FsTmFtZSh0b2tlbikpXG5cdH1cblxuLy8gcGFyc2VMb2NhbERlY2xhcmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUxvY2FsTmFtZSA9IHQgPT4ge1xuXHRcdGlmIChpc0tleXdvcmQoS1dfRm9jdXMsIHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3Quc2hvdygpfWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y29udGV4dC5jaGVjayghSnNHbG9iYWxzLmhhcyh0Lm5hbWUpLCB0LmxvYywgKCkgPT5cblx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZVNpbmdsZSA9IHQgPT5cblx0dCBpbnN0YW5jZW9mIE5hbWUgP1xuXHRfYWNjZXNzKHQubmFtZSwgdC5sb2MpIDpcblx0dCBpbnN0YW5jZW9mIEdyb3VwID8gKCgpID0+IHtcblx0XHRzd2l0Y2ggKHQua2luZCkge1xuXHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfUGFyZW50aGVzaXM6IHJldHVybiBwYXJzZUV4cHIoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIEJhZ1NpbXBsZSh0LmxvYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdH1cblx0fSkoKSA6XG5cdHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWwgP1xuXHROdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKSA6XG5cdHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1cyA/XG5cdENhbGwodC5sb2MsIF9hY2Nlc3ModC5uYW1lLCB0LmxvYyksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pIDpcblx0dCBpbnN0YW5jZW9mIEtleXdvcmQgP1xuXHRcdHQua2luZCA9PT0gS1dfRm9jdXMgP1xuXHRcdFx0TG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIDpcblx0XHRcdFNwZWNpYWxWYWwodC5sb2MsIG9wS1d0b1NWKHQua2luZCkgfHwgdW5leHBlY3RlZCh0KSkgOlxuXHR0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAzID9cblx0U3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKSA6XG5cdHVuZXhwZWN0ZWQodClcblxuLy8gcGFyc2VTaW5nbGUgcHJpdmF0ZXNcbmNvbnN0IF9hY2Nlc3MgPSAobmFtZSwgbG9jKSA9PlxuXHRKc0dsb2JhbHMuaGFzKG5hbWUpID8gR2xvYmFsQWNjZXNzKGxvYywgbmFtZSkgOiBMb2NhbEFjY2Vzcyhsb2MsIG5hbWUpXG5cbmNvbnN0IHBhcnNlU3BhY2VkID0gdG9rZW5zID0+IHtcblx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKCksIHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKGlzS2V5d29yZChLV19MYXp5LCBoKSlcblx0XHRyZXR1cm4gTGF6eShoLmxvYywgcGFyc2VTcGFjZWQocmVzdCkpXG5cdGVsc2Uge1xuXHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHQubG9jXG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX1BhcmVudGhlc2lzKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRjb250ZXh0LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3Quc2hvdygpfWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKGlzS2V5d29yZChrLCBsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PmBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cdFx0XHRpZiAoayA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gS1dfVXNlTGF6eSB8fCBrID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgU2xpY2UuZ3JvdXAobGluZSkudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxpbmUubG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZS5ub1R5cGUodG9rZW5zLmxvYywgbmFtZSwgaXNMYXp5KVxuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgdXNlZDogWyBdLCBvcFVzZURlZmF1bHQ6IHVzZURlZmF1bHQoKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBbIG9wVXNlRGVmYXVsdCwgcmVzdCBdID1cblx0XHRcdFx0aXNLZXl3b3JkKEtXX0ZvY3VzLCB0b2tlbnMuaGVhZCgpKSA/XG5cdFx0XHRcdFx0WyB1c2VEZWZhdWx0KCksIHRva2Vucy50YWlsKCkgXSA6XG5cdFx0XHRcdFx0WyBudWxsLCB0b2tlbnMgXVxuXHRcdFx0Y29uc3QgdXNlZCA9IHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhyZXN0KS5tYXAobCA9PiB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2sobC5uYW1lICE9PSAnXycsIGwucG9zLFxuXHRcdFx0XHRcdCgpID0+IGAke2NvZGUoJ18nKX0gbm90IGFsbG93ZWQgYXMgaW1wb3J0IG5hbWUuYClcblx0XHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0XHRsLmtpbmQgPSBMRF9MYXp5XG5cdFx0XHRcdHJldHVybiBsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHsgdXNlZCwgb3BVc2VEZWZhdWx0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlUmVxdWlyZSA9IHQgPT4ge1xuXHRcdGlmICh0IGluc3RhbmNlb2YgTmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHQubmFtZSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHB1c2goX3BhcnRzRnJvbURvdE5hbWUodCksIHQubmFtZSkuam9pbignLycpLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayhpc0dyb3VwKEdfU3BhY2UsIHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29udGV4dC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzID0gWyBdXG5cdFx0fVxuXHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHR0b2tlbnMudGFpbCgpLmVhY2godCA9PiB7XG5cdFx0XHRjb250ZXh0LmNoZWNrKHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDEsIHQubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG5cbmNvbnN0XG5cdHBhcnNlRm9yID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjb25zdCBib2R5ID0gcGFyc2VCbG9ja0RvKGJsb2NrKVxuXHRcdGlmIChiZWZvcmUuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIEZvckRvUGxhaW4odG9rZW5zLmxvYywgYm9keSlcblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IHsgZWxlbWVudCwgYmFnIH0gPVxuXHRcdFx0XHRpZkVsc2UoYmVmb3JlLm9wU3BsaXRPbmNlV2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfSW4sIF8pKSxcblx0XHRcdFx0XHQoeyBiZWZvcmUsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soYmVmb3JlLnNpemUoKSA9PT0gMSwgYmVmb3JlLmxvYywgJ1RPRE86IHBhdHRlcm4gaW4gZm9yIScpXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMoYmVmb3JlKVswXSxcblx0XHRcdFx0XHRcdFx0YmFnOiBwYXJzZUV4cHIoYWZ0ZXIpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoKSA9PiAoeyBlbGVtZW50OiBMb2NhbERlY2xhcmUuZm9jdXMoYmVmb3JlLmxvYyksIGJhZzogcGFyc2VFeHByKGJlZm9yZSkgfSkpXG5cdFx0XHRyZXR1cm4gRm9yRG9XaXRoQmFnKHRva2Vucy5sb2MsIGVsZW1lbnQsIGJhZywgYm9keSlcblx0XHR9XG5cdH1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9