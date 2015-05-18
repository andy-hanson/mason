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
		cx.check((0, _Token.isGroup)(_Token.G_Block, block), block.loc, 'Expected an indented block.');
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
		if ((0, _Token.isGroup)(_Token.G_Space, first) && tokens.size() > 1) {
			const ft = _Slice2.group(first);
			if ((0, _Token.isKeyword)(_Token.KW_Type, ft.head())) {
				const type = parseSpaced(ft.tail());
				const locals = parseLocalDeclares(tokens.tail());
				return (0, _Expression.Pattern)(first.loc, type, locals, _Expression.LocalAccess.focus(tokens.loc));
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

		args.forEach(function (arg) {
			if (!arg.isLazy()) arg.kind = _Expression.LD_Mutable;
		});
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
			if ((0, _Token.isKeyword)(inOrOut, (0, _util.head)(firstLine.tokens))) {
				const inOut = (0, _Expression.Debug)(firstLine.loc, parseLinesFromBlock(_Slice2.group(firstLine)));
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
				return 'Did not expect anything after ' + head;
			});
		};

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (head instanceof _Token.Keyword) switch (head.kind) {
			case _Token.KW_CaseDo:
				return parseCase(_Token.KW_CaseDo, false, rest);
			case _Token.KW_Debug:
				return (0, _Expression.Debug)(tokens.lok, (0, _Token.isGroup)(_Token.G_Block, tokens.second()) ?
				// `debug`, then indented block
				parseLinesFromBlock() :
				// `debug`, then single line
				parseLineOrLines(rest));
			case _Token.KW_Debugger:
				noRest();
				return (0, _Expression.SpecialDo)(tokens.loc, _Expression.SP_Debugger);
			case _Token.KW_EndLoop:
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + head;
				});
				return (0, _Expression.EndLoop)(tokens.loc);
			case _Token.KW_IfDo:
				var _beforeAndBlock6 = beforeAndBlock(rest),
				    _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2),
				    before = _beforeAndBlock62[0],
				    block = _beforeAndBlock62[1];

				return (0, _Expression.IfDo)(tokens.loc, parseExpr(before), parseBlockDo(block));
			case _Token.KW_Loop:
				return (0, _Expression.Loop)(tokens.loc, justBlockDo(rest));
			case _Token.KW_ObjAssign:
				// Index is set by parseBlock.
				return (0, _Expression.BagEntry)(tokens.loc, parseExpr(rest), -1);
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
		cx.check(locals.length === 1, loc, 'TODO: AssignDestructureMutate');
		const name = locals[0].name;
		const value = parseExpr(valueTokens);
		return (0, _Expression.AssignMutate)(loc, name, value);
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
			cx.check(isYield, localsTokens.loc, 'Assignment to nothing');
			return value;
		} else {
			if (isYield) locals.forEach(function (_) {
				return cx.check(!_.isLazy(), _.loc, 'Can not yield to lazy variable.');
			});

			const isObjAssign = kind === _Token.KW_ObjAssign;

			if (kind === _Token.KW_AssignMutable) locals.forEach(function (_) {
				cx.check(!_.isLazy(), _.loc, 'Lazy local can not be mutable.');
				_.kind = _Expression.LD_Mutable;
			});

			const ass = (function () {
				if (locals.length === 1) {
					const assignee = locals[0];
					const assign = (0, _Expression.Assign)(loc, assignee, value);
					const isTest = isObjAssign && assignee.name.endsWith('test');
					return isTest ? (0, _Expression.Debug)(loc, [assign]) : assign;
				} else {
					const kind = locals[0].kind;
					locals.forEach(function (_) {
						return cx.check(_.kind === kind, _.loc, 'All locals of destructuring assignment must be of the same kind.');
					});
					return (0, _Expression.AssignDestructure)(loc, locals, value, kind);
				}
			})();

			return isObjAssign ? WithObjKeys(locals, ass) : ass;
		}
	},
	      _parseAssignValue = function (kind, opName, valueTokens) {
		const value = valueTokens.isEmpty() && kind === _Token.KW_ObjAssign ? (0, _Expression.SpecialVal)(valueTokens.loc, _Expression.SV_Null) : parseExpr(valueTokens);
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

	const parseLocalDeclaresJustNames = function (tokens) {
		return tokens.map(function (_) {
			return _Expression.LocalDeclare.plain(_.loc, _parseLocalName(_));
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
				cx.check((0, _Token.isKeyword)(_Token.KW_Type, colon), colon.loc, function () {
					return 'Expected ' + (0, _CompileError.code)(':');
				});
				const tokensType = rest2.tail();
				checkNonEmpty(tokensType, function () {
					return 'Expected something after ' + colon;
				});
				return parseSpaced(tokensType);
			});
			return (0, _Expression.LocalDeclare)(token.loc, name, opType, isLazy ? _Expression.LD_Lazy : _Expression.LD_Const);
		} else return _Expression.LocalDeclare.plain(token.loc, _parseLocalName(token));
	};

	// parseLocalDeclare privates
	const _parseLocalName = function (t) {
		if ((0, _Token.isKeyword)(_Token.KW_Focus, t)) return '_';else {
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
		if ((0, _Token.isKeyword)(_Token.KW_Type, h)) {
			const eType = parseSpaced(rest);
			const focus = _Expression.LocalAccess.focus(h.loc);
			return _Expression.Call.contains(h.loc, eType, focus);
		} else if ((0, _Token.isKeyword)(_Token.KW_Lazy, h)) return (0, _Expression.Lazy)(h.loc, parseSpaced(rest));else {
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
			var _ref5 = (0, _Token.isKeyword)(_Token.KW_Focus, tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref52 = _slicedToArray(_ref5, 2);

			const opUseDefault = _ref52[0];
			const rest = _ref52[1];

			const used = parseLocalDeclaresJustNames(rest).map(function (l) {
				cx.check(l.name !== '_', l.pos, function () {
					return '' + (0, _CompileError.code)('_') + ' not allowed as import name.';
				});
				if (isLazy) l.kind = _Expression.LD_Lazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	},
	      _parseRequire = function (t) {
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: (0, _util.push)(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
			cx.check((0, _Token.isGroup)(_Token.G_Space, t), t.loc, 'Not a valid module name.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF5QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLFdBQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakJHLFlBQVksQ0FpQkQsRUFBRSxNQUFNLGNBbEJoQyxFQUFFLENBa0JtQyxDQUFDLENBQUE7O0FBRXhCLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBQU8sV0FBVyxDQUFDLFFBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFDMUM7O0FBRUQsT0FDQyxVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2hELGFBQWEsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNqRCxVQUFVLEdBQUcsVUFBQSxDQUFDO1NBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxDQUFHO0VBQUEsQ0FBQTs7QUFFcEQsT0FBTSxXQUFXLEdBQUcsVUFBQSxNQUFNLEVBQUk7c0JBQ0gsWUFBWSxRQXpCK0MsUUFBUSxFQXlCNUMsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBMUJ1QixNQUFNLEVBMEJwQixLQUFLLENBQUM7Ozs7UUFBaEQsU0FBUztR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RUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN2QixLQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBdHJCUyxPQUFPLEFBc3JCRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ3BELGtDQUFrQyxDQUFDLENBQUE7QUFDcEMsUUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDbEIsQ0FBQyxDQUFBO0FBQ0YsU0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDMUQ7T0FFRCxpQkFBaUIsR0FBRyxVQUFBLE9BQU87U0FDMUIsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsR0FBRyxVQXhyQmQsTUFBTSxFQXdyQmUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25NdXRhdGUsIEJhZ0VudHJ5LCBCYWdTaW1wbGUsIEJsb2NrQmFnLCBCbG9ja0RvLCBCbG9ja01hcCxcblx0QmxvY2tPYmosIEJsb2NrV2l0aFJldHVybiwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCwgQ2FzZURvLCBDYXNlVmFsLCBEZWJ1Zyxcblx0RG8sIE51bWJlckxpdGVyYWwsIEVuZExvb3AsIEZ1biwgR2xvYmFsQWNjZXNzLCBJZkRvLCBMYXp5LCBMRF9Db25zdCwgTERfTGF6eSwgTERfTXV0YWJsZSxcblx0TG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlUmVzLCBMb29wLCBNYXBFbnRyeSwgTWVtYmVyLCBNb2R1bGUsIE9ialBhaXIsIE9ialNpbXBsZSxcblx0UGF0dGVybiwgUXVvdGUsIFNQX0RlYnVnZ2VyLCBTcGVjaWFsRG8sIFNwZWNpYWxWYWwsIFNWX051bGwsIFNwbGF0LCBWYWwsIFVzZSwgVXNlRG8sIFlpZWxkLFxuXHRZaWVsZFRvIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL2xhbmd1YWdlJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIGlzR3JvdXAsXG5cdGlzS2V5d29yZCwgS2V5d29yZCwgS1dfQXNzaWduLCBLV19Bc3NpZ25NdXRhYmxlLCBLV19Bc3NpZ25NdXRhdGUsIEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsXG5cdEtXX0RlYnVnZ2VyLCBLV19FbHNlLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0lmRG8sIEtXX0luLCBLV19MYXp5LCBLV19Mb29wLFxuXHRLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19QYXNzLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVHlwZSwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvLCBOYW1lLCBvcEtXdG9TViwgVG9rZW5OdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBhc3NlcnQsIGhlYWQsIGlmRWxzZSwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCxcblx0b3BJZiwgb3BNYXAsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9ID0gcGFyc2VNb2R1bGVCbG9jayhyZXN0MylcblxuXHRpZiAoY3gub3B0cy5pbmNsdWRlTW9kdWxlTmFtZSgpICYmICFleHBvcnRzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICduYW1lJykpIHtcblx0XHRjb25zdCBkbiA9IExvY2FsRGVjbGFyZS5kZWNsYXJlTmFtZSh0b2tlbnMubG9jKVxuXHRcdGxpbmVzLnB1c2goQXNzaWduKHRva2Vucy5sb2MsIGRuLFxuXHRcdFx0UXVvdGUuZm9yU3RyaW5nKHRva2Vucy5sb2MsIGN4Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cdFx0ZXhwb3J0cy5wdXNoKGRuKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y3guY2hlY2soaXNHcm91cChHX0Jsb2NrLCBibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0cmV0dXJuIFsgdG9rZW5zLnJ0YWlsKCksIFNsaWNlLmdyb3VwKGJsb2NrKSBdXG5cdH0sXG5cblx0YmxvY2tXcmFwID0gdG9rZW5zID0+IEJsb2NrV3JhcCh0b2tlbnMubG9jLCBwYXJzZUJsb2NrVmFsKHRva2VucykpLFxuXG5cdGp1c3RCbG9ja0RvID0gdG9rZW5zID0+IHBhcnNlQmxvY2tEbyhfanVzdEJsb2NrKHRva2VucykpLFxuXHRqdXN0QmxvY2tWYWwgPSB0b2tlbnMgPT4gcGFyc2VCbG9ja1ZhbChfanVzdEJsb2NrKHRva2VucykpLFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHQvLyBPSyBpZiBsYXN0IGxpbmUgaXMgYSBWYWwsIHdlJ2xsIGp1c3QgdHJlYXQgaXQgYXMgYSBEby5cblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjeC5jaGVjayhrUmV0dXJuID09PSBLUmV0dXJuX1BsYWluLCB0b2tlbnMubG9jLFxuXHRcdFx0KCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdH0sXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VBbnlCbG9jayh0b2tlbnMpXG5cdFx0Y3guY2hlY2soIShibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8pLCBibG9jay5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0cGFyc2VNb2R1bGVCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5czogZXhwb3J0cyB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y29uc3QgbG9jID0gdG9rZW5zLmxvY1xuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzogY2FzZSBLUmV0dXJuX01hcDoge1xuXHRcdFx0XHRjb25zdCBjdHIgPSBrUmV0dXJuID09PSBLUmV0dXJuX0JhZyA/IEJsb2NrQmFnIDogQmxvY2tNYXBcblx0XHRcdFx0cmV0dXJuIHsgbGluZXM6IFsgXSwgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0OiBCbG9ja1dyYXAobG9jLCBjdHIobG9jLCBhbGxMaW5lcykpIH1cblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnN0IHsgbGluZXMsIG9wVmFsOiBvcERlZmF1bHRFeHBvcnQgfSA9IF90cnlUYWtlTGFzdFZhbChhbGxMaW5lcylcblx0XHRcdFx0cmV0dXJuIHsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCB9XG5cdFx0fVxuXHR9LFxuXG5cdHBhcnNlQW55QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIEJsb2NrQmFnKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX01hcDpcblx0XHRcdFx0cmV0dXJuIEJsb2NrTWFwKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc3QgeyBsaW5lcywgb3BWYWwgfSA9IF90cnlUYWtlTGFzdFZhbChhbGxMaW5lcylcblx0XHRcdFx0cmV0dXJuIGtSZXR1cm4gPT09IEtSZXR1cm5fT2JqID9cblx0XHRcdFx0XHRCbG9ja09iaih0b2tlbnMubG9jLCBsaW5lcywgb2JqS2V5cywgb3BWYWwsIG51bGwpIDpcblx0XHRcdFx0XHRpZkVsc2Uob3BWYWwsXG5cdFx0XHRcdFx0XHRfID0+IEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBsaW5lcywgXyksXG5cdFx0XHRcdFx0XHQoKSA9PiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKSlcblx0XHR9XG5cdH1cblxuLy8gcGFyc2VCbG9jayBwcml2YXRlc1xuY29uc3Rcblx0X2p1c3RCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblxuXHRfdHJ5VGFrZUxhc3RWYWwgPSBsaW5lcyA9PlxuXHRcdCghaXNFbXB0eShsaW5lcykgJiYgbGFzdChsaW5lcykgaW5zdGFuY2VvZiBWYWwpID9cblx0XHRcdHsgbGluZXM6IHJ0YWlsKGxpbmVzKSwgb3BWYWw6IGxhc3QobGluZXMpIH0gOlxuXHRcdFx0eyBsaW5lcywgb3BWYWw6IG51bGwgfSxcblxuXHRLUmV0dXJuX1BsYWluID0gMCxcblx0S1JldHVybl9PYmogPSAxLFxuXHRLUmV0dXJuX0JhZyA9IDIsXG5cdEtSZXR1cm5fTWFwID0gMyxcblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gWyBdXG5cdFx0bGV0IGlzQmFnID0gZmFsc2UsIGlzTWFwID0gZmFsc2Vcblx0XHRjb25zdCBjaGVja0xpbmUgPSAobGluZSwgaW5EZWJ1ZykgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKF8gPT4gY2hlY2tMaW5lKF8sIHRydWUpKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIEJhZ0VudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzKVxuXHRcdFx0XHRvYmpLZXlzLnB1c2goLi4ubGluZS5rZXlzKVxuXHRcdH1cblx0XHRjb25zdCBhbGxMaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGxpbmUuZm9yRWFjaChhZGRMaW5lKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNoZWNrTGluZShsaW5lLCBmYWxzZSlcblx0XHRcdFx0YWxsTGluZXMucHVzaChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMgPyBsaW5lLmxpbmUgOiBsaW5lKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRsaW5lcy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblxuXHRcdGNvbnN0IGlzT2JqID0gIWlzRW1wdHkob2JqS2V5cylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gbnVsbFxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gaXNLZXl3b3JkKEtXX0Vsc2UsIGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgKGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKGxhc3RMaW5lLnRhaWwoKSkgXSA6XG5cdFx0WyBibG9jaywgbnVsbCBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdGxpbmUgPSBTbGljZS5ncm91cChsaW5lKVxuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoXyA9PiBpc0tleXdvcmQoS1dfT2JqQXNzaWduLCBfKSksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjeC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+IGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWV9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IHRva2Vucy5lbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0Y29uc3QgaGVyZSA9IHRva2Vucy5kYXRhW2ldXG5cdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHRzd2l0Y2ggKGhlcmUua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VGdW4oaGVyZS5raW5kID09PSBLV19HZW5GdW4sIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19DYXNlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUNhc2UoS1dfQ2FzZSwgZmFsc2UsIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0cGFyc2VFeHByUGxhaW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zKVxuXHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGN4LmZhaWwodG9rZW5zLmxvYywgJ0V4cGVjdGVkIGFuIGV4cHJlc3Npb24sIGdvdCBub3RoaW5nLicpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdGFyZ3MuZm9yRWFjaChhcmcgPT4ge1xuXHRcdGlmICghYXJnLmlzTGF6eSgpKVxuXHRcdFx0YXJnLmtpbmQgPSBMRF9NdXRhYmxlXG5cdH0pXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdF8gPT4gTG9jYWxEZWNsYXJlUmVzKF8ubG9jLCBfKSxcblx0XHQoKSA9PiBvcE1hcChvcE91dCwgbyA9PiBMb2NhbERlY2xhcmVSZXMoby5sb2MsIG51bGwpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgaCkgJiYgaXNLZXl3b3JkKEtXX1R5cGUsIGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogbnVsbCwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGgua2luZCA9PT0gS1dfQ2FzZSB8fCBoLmtpbmQgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGgua2luZCwgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9jaylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2s6IHBhcnNlQW55QmxvY2socmVzdDEpLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBMb2NhbERlY2xhcmUucGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKGlzS2V5d29yZChpbk9yT3V0LCBoZWFkKGZpcnN0TGluZS50b2tlbnMpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhTbGljZS5ncm91cChmaXJzdExpbmUpKSlcblx0XHRcdFx0cmV0dXJuIFsgaW5PdXQsIHRva2Vucy50YWlsKCkgXVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gWyBudWxsLCB0b2tlbnMgXVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlTGluZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaGVhZCA9IHRva2Vucy5oZWFkKClcblx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0Y29uc3Qgbm9SZXN0ID0gKCkgPT5cblx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aGVhZH1gKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaGVhZCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGhlYWQua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKEtXX0Nhc2VEbywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2ssXG5cdFx0XHRcdFx0XHRpc0dyb3VwKEdfQmxvY2ssIHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbERvKHRva2Vucy5sb2MsIFNQX0RlYnVnZ2VyKVxuXHRcdFx0XHRjYXNlIEtXX0VuZExvb3A6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtoZWFkfWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19JZkRvOlxuXHRcdFx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2socmVzdClcblx0XHRcdFx0XHRyZXR1cm4gSWZEbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VCbG9ja0RvKGJsb2NrKSlcblx0XHRcdFx0Y2FzZSBLV19Mb29wOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRyZXR1cm4gQmFnRW50cnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpLCAtMSlcblx0XHRcdFx0Y2FzZSBLV19QYXNzOlxuXHRcdFx0XHRcdG5vUmVzdCgpXG5cdFx0XHRcdFx0cmV0dXJuIFsgXVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKF9pc0xpbmVTcGxpdEtleXdvcmQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRhdC5raW5kID09PSBLV19Bc3NpZ25NdXRhdGUgP1xuXHRcdFx0XHRcdF9wYXJzZUFzc2lnbk11dGF0ZShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9pc0xpbmVTcGxpdEtleXdvcmQgPSB0b2tlbiA9PiB7XG5cdFx0aWYgKHRva2VuIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAodG9rZW4ua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX0Fzc2lnbjogY2FzZSBLV19Bc3NpZ25NdXRhYmxlOiBjYXNlIEtXX0Fzc2lnbk11dGF0ZTpcblx0XHRcdFx0Y2FzZSBLV19NYXBFbnRyeTogY2FzZSBLV19PYmpBc3NpZ246IGNhc2UgS1dfWWllbGQ6IGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnbk11dGF0ZSA9IChsb2NhbHNUb2tlbnMsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMobG9jYWxzVG9rZW5zKVxuXHRcdGN4LmNoZWNrKGxvY2Fscy5sZW5ndGggPT09IDEsIGxvYywgJ1RPRE86IEFzc2lnbkRlc3RydWN0dXJlTXV0YXRlJylcblx0XHRjb25zdCBuYW1lID0gbG9jYWxzWzBdLm5hbWVcblx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRyZXR1cm4gQXNzaWduTXV0YXRlKGxvYywgbmFtZSwgdmFsdWUpXG5cdH0sXG5cblx0X3BhcnNlQXNzaWduID0gKGxvY2Fsc1Rva2VucywgYXNzaWduZXIsIHZhbHVlVG9rZW5zLCBsb2MpID0+IHtcblx0XHRjb25zdCBraW5kID0gYXNzaWduZXIua2luZFxuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y29uc3Qgb3BOYW1lID0gb3BJZihsb2NhbHMubGVuZ3RoID09PSAxLCAoKSA9PiBsb2NhbHNbMF0ubmFtZSlcblx0XHRjb25zdCB2YWx1ZSA9IF9wYXJzZUFzc2lnblZhbHVlKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpXG5cblx0XHRjb25zdCBpc1lpZWxkID0ga2luZCA9PT0gS1dfWWllbGQgfHwga2luZCA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGN4LmNoZWNrKGlzWWllbGQsIGxvY2Fsc1Rva2Vucy5sb2MsICdBc3NpZ25tZW50IHRvIG5vdGhpbmcnKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpc1lpZWxkKVxuXHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblxuXHRcdFx0aWYgKGtpbmQgPT09IEtXX0Fzc2lnbk11dGFibGUpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4ge1xuXHRcdFx0XHRcdGN4LmNoZWNrKCFfLmlzTGF6eSgpLCBfLmxvYywgJ0xhenkgbG9jYWwgY2FuIG5vdCBiZSBtdXRhYmxlLicpXG5cdFx0XHRcdFx0Xy5raW5kID0gTERfTXV0YWJsZVxuXHRcdFx0XHR9KVxuXG5cdFx0XHRjb25zdCBhc3MgPSAoKCkgPT4ge1xuXHRcdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduKGxvYywgYXNzaWduZWUsIHZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGlzVGVzdCA9IGlzT2JqQXNzaWduICYmIGFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0XHRcdHJldHVybiBpc1Rlc3QgPyBEZWJ1Zyhsb2MsIFsgYXNzaWduIF0pIDogYXNzaWduXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3Qga2luZCA9IGxvY2Fsc1swXS5raW5kXG5cdFx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmtpbmQgPT09IGtpbmQsIF8ubG9jLFxuXHRcdFx0XHRcdFx0J0FsbCBsb2NhbHMgb2YgZGVzdHJ1Y3R1cmluZyBhc3NpZ25tZW50IG11c3QgYmUgb2YgdGhlIHNhbWUga2luZC4nKSlcblx0XHRcdFx0XHRyZXR1cm4gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIHZhbHVlLCBraW5kKVxuXHRcdFx0XHR9XG5cdFx0XHR9KSgpXG5cblx0XHRcdHJldHVybiBpc09iakFzc2lnbiA/IFdpdGhPYmpLZXlzKGxvY2FscywgYXNzKSA6IGFzc1xuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VBc3NpZ25WYWx1ZSA9IChraW5kLCBvcE5hbWUsIHZhbHVlVG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSB2YWx1ZVRva2Vucy5pc0VtcHR5KCkgJiYga2luZCA9PT0gS1dfT2JqQXNzaWduID9cblx0XHRcdFNwZWNpYWxWYWwodmFsdWVUb2tlbnMubG9jLCBTVl9OdWxsKSA6XG5cdFx0XHRwYXJzZUV4cHIodmFsdWVUb2tlbnMpXG5cdFx0aWYgKG9wTmFtZSAhPT0gbnVsbClcblx0XHRcdF90cnlBZGROYW1lKHZhbHVlLCBvcE5hbWUpXG5cdFx0c3dpdGNoIChraW5kKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWUubG9jLCB2YWx1ZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgbmFtZSBpZjpcblx0Ly8gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrXG5cdC8vIEl0J3MgYW4gT2JqIGJsb2NrIGF0IHRoZSBlbmQgb2YgYSBjYWxsIChhcyBpbiBgbmFtZSA9IE9iai1UeXBlIC4uLmApXG5cdF90cnlBZGROYW1lID0gKF8sIG5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdF8ubmFtZSA9IG5hbWVcblx0XHRlbHNlIGlmIChfIGluc3RhbmNlb2YgQ2FsbCAmJiBfLmFyZ3MubGVuZ3RoID4gMClcblx0XHRcdF90cnlBZGRPYmpOYW1lKGxhc3QoXy5hcmdzKSwgbmFtZSlcblx0XHRlbHNlXG5cdFx0XHRfdHJ5QWRkT2JqTmFtZShfLCBuYW1lKVxuXHR9LFxuXHRfdHJ5QWRkT2JqTmFtZSA9IChfLCBuYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dyYXApXG5cdFx0XHRpZiAoXy5ibG9jayBpbnN0YW5jZW9mIEJsb2NrT2JqKVxuXHRcdFx0XHRpZiAoXy5ibG9jay5vcE9iamVkICE9PSBudWxsICYmIF8uYmxvY2sub3BPYmplZCBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0XHRfLmJsb2NrLm9wT2JqZWQubmFtZSA9IG5hbWVcblx0XHRcdFx0ZWxzZSBpZiAoIShfLmJsb2NrLmtleXMuc29tZShfID0+IF8ubmFtZSA9PT0gJ25hbWUnKSkpXG5cdFx0XHRcdFx0Xy5ibG9jay5vcE5hbWUgPSBuYW1lXG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlcikpXG5cbmNvbnN0XG5cdHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyA9IHRva2VucyA9PlxuXHRcdHRva2Vucy5tYXAoXyA9PiBMb2NhbERlY2xhcmUucGxhaW4oXy5sb2MsIF9wYXJzZUxvY2FsTmFtZShfKSkpLFxuXG5cdHBhcnNlTG9jYWxEZWNsYXJlcyA9IHRva2VucyA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHRva2VuID0+IHtcblx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCB0b2tlbikpIHtcblx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmdyb3VwKHRva2VuKVxuXHRcdFx0Y29uc3QgWyByZXN0LCBpc0xhenkgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19MYXp5LCB0b2tlbnMuaGVhZCgpKSA/IFsgdG9rZW5zLnRhaWwoKSwgdHJ1ZSBdIDogWyB0b2tlbnMsIGZhbHNlIF1cblx0XHRcdGNvbnN0IG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRjb25zdCBvcFR5cGUgPSBvcElmKCFyZXN0Mi5pc0VtcHR5KCksICgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soaXNLZXl3b3JkKEtXX1R5cGUsIGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbn1gKVxuXHRcdFx0XHRyZXR1cm4gcGFyc2VTcGFjZWQodG9rZW5zVHlwZSlcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHRva2VuLmxvYywgbmFtZSwgb3BUeXBlLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpXG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlLnBsYWluKHRva2VuLmxvYywgX3BhcnNlTG9jYWxOYW1lKHRva2VuKSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKGlzS2V5d29yZChLV19Gb2N1cywgdCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3R9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjeC5jaGVjayghSnNHbG9iYWxzLmhhcyh0Lm5hbWUpLCB0LmxvYywgKCkgPT5cblx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZVNpbmdsZSA9IHQgPT5cblx0dCBpbnN0YW5jZW9mIE5hbWUgP1xuXHRfYWNjZXNzKHQubmFtZSwgdC5sb2MpIDpcblx0dCBpbnN0YW5jZW9mIEdyb3VwID8gKCgpID0+IHtcblx0XHRzd2l0Y2ggKHQua2luZCkge1xuXHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfUGFyZW46IHJldHVybiBwYXJzZUV4cHIoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIEJhZ1NpbXBsZSh0LmxvYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdH1cblx0fSkoKSA6XG5cdHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWwgP1xuXHROdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKSA6XG5cdHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1cyA/XG5cdENhbGwodC5sb2MsIF9hY2Nlc3ModC5uYW1lLCB0LmxvYyksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pIDpcblx0dCBpbnN0YW5jZW9mIEtleXdvcmQgP1xuXHRcdHQua2luZCA9PT0gS1dfRm9jdXMgP1xuXHRcdFx0TG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIDpcblx0XHRcdFNwZWNpYWxWYWwodC5sb2MsIG9wS1d0b1NWKHQua2luZCkgfHwgdW5leHBlY3RlZCh0KSkgOlxuXHR0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAzID9cblx0U3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKSA6XG5cdHVuZXhwZWN0ZWQodClcblxuLy8gcGFyc2VTaW5nbGUgcHJpdmF0ZXNcbmNvbnN0IF9hY2Nlc3MgPSAobmFtZSwgbG9jKSA9PlxuXHRKc0dsb2JhbHMuaGFzKG5hbWUpID8gR2xvYmFsQWNjZXNzKGxvYywgbmFtZSkgOiBMb2NhbEFjY2Vzcyhsb2MsIG5hbWUpXG5cbmNvbnN0IHBhcnNlU3BhY2VkID0gdG9rZW5zID0+IHtcblx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKCksIHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdGlmIChpc0tleXdvcmQoS1dfVHlwZSwgaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKGlzS2V5d29yZChLV19MYXp5LCBoKSlcblx0XHRyZXR1cm4gTGF6eShoLmxvYywgcGFyc2VTcGFjZWQocmVzdCkpXG5cdGVsc2Uge1xuXHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHQubG9jXG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgdG9rZW5zLmxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0cmV0dXJuIE1lbWJlcih0b2tlbnMubG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHR9IGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdHVuc2hpZnQoZSwgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKSlcblx0XHRcdFx0aWYgKHQua2luZCA9PT0gR19QYXJlbikge1xuXHRcdFx0XHRcdGNoZWNrRW1wdHkoU2xpY2UuZ3JvdXAodCksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGUsIFtdKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgY3guZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dH1gKVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdC5yZWR1Y2UobWVtYmVyT3JTdWJzY3JpcHQsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSBTbGljZS5ncm91cCh0b2tlbnMuaGVhZCgpKVxuXHRcdGlmIChpc0tleXdvcmQoaywgbGluZTAuaGVhZCgpKSlcblx0XHRcdHJldHVybiBbIF9wYXJzZVVzZXMoaywgbGluZTAudGFpbCgpKSwgdG9rZW5zLnRhaWwoKSBdXG5cdH1cblx0cmV0dXJuIFsgWyBdLCB0b2tlbnMgXVxufVxuXG4vLyB0cnlQYXJzZVVzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5gRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gbGluZS50b2tlbnNbMF1cblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQobGluZS50b2tlbnNbMV0pXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09IEtXX1VzZUxhenkgfHwgayA9PT0gS1dfVXNlRGVidWdcblx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0X3BhcnNlVGhpbmdzVXNlZChuYW1lLCBpc0xhenksIFNsaWNlLmdyb3VwKGxpbmUpLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUubm9UeXBlKHRva2Vucy5sb2MsIG5hbWUsIGlzTGF6eSlcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFsgXSwgb3BVc2VEZWZhdWx0OiB1c2VEZWZhdWx0KCkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBvcFVzZURlZmF1bHQsIHJlc3QgXSA9XG5cdFx0XHRcdGlzS2V5d29yZChLV19Gb2N1cywgdG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXNKdXN0TmFtZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0XHRcdGwua2luZCA9IExEX0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhpc0dyb3VwKEdfU3BhY2UsIHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7IHBhdGg6IHBhcnRzLmpvaW4oJy8nKSwgbmFtZTogdG9rZW5zLmxhc3QoKS5uYW1lIH1cblx0fSxcblxuXHRfcGFydHNGcm9tRG90TmFtZSA9IGRvdE5hbWUgPT5cblx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9