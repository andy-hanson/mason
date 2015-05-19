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
			case _Token.KW_IfDo:case _Token.KW_UnlessDo:
				{
					var _beforeAndBlock6 = beforeAndBlock(rest);

					var _beforeAndBlock62 = _slicedToArray(_beforeAndBlock6, 2);

					const before = _beforeAndBlock62[0];
					const block = _beforeAndBlock62[1];

					const ctr = head.kind === _Token.KW_IfDo ? _Expression.IfDo : _Expression.UnlessDo;
					return ctr(tokens.loc, parseExpr(before), parseBlockDo(block));
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkEwQndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLFdBQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBbEJHLFlBQVksQ0FrQkQsRUFBRSxNQUFNLGNBbkJoQyxFQUFFLENBbUJtQyxDQUFDLENBQUE7O0FBRXhCLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBQU8sV0FBVyxDQUFDLFFBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFDMUM7O0FBRUQsT0FDQyxVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2hELGFBQWEsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNqRCxVQUFVLEdBQUcsVUFBQSxDQUFDO1NBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxDQUFHO0VBQUEsQ0FBQTs7QUFFcEQsT0FBTSxXQUFXLEdBQUcsVUFBQSxNQUFNLEVBQUk7c0JBQ0gsWUFBWSxRQXpCekIsUUFBUSxFQXlCNEIsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBM0JvQyxNQUFNLEVBMkJqQyxLQUFLLENBQUM7Ozs7UUFBaEQsU0FBUztR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QUFDLENBQUE7QUFDOUUsUUFBSyxHQUFHLEVBQUcsQ0FBQTtHQUNYO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdEIsUUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN2QixLQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBenJCUyxPQUFPLEFBeXJCRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ3BELGtDQUFrQyxDQUFDLENBQUE7QUFDcEMsUUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDbEIsQ0FBQyxDQUFBO0FBQ0YsU0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDMUQ7T0FFRCxpQkFBaUIsR0FBRyxVQUFBLE9BQU87U0FDMUIsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsR0FBRyxVQTFyQmQsTUFBTSxFQTByQmUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBBc3NpZ25NdXRhdGUsIEJhZ0VudHJ5LCBCYWdTaW1wbGUsIEJsb2NrQmFnLCBCbG9ja0RvLCBCbG9ja01hcCxcblx0QmxvY2tPYmosIEJsb2NrV2l0aFJldHVybiwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCwgQ2FzZURvLCBDYXNlVmFsLCBEZWJ1Zyxcblx0RG8sIE51bWJlckxpdGVyYWwsIEVuZExvb3AsIEZ1biwgR2xvYmFsQWNjZXNzLCBJZkRvLCBMYXp5LCBMRF9Db25zdCwgTERfTGF6eSwgTERfTXV0YWJsZSxcblx0TG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlUmVzLCBMb29wLCBNYXBFbnRyeSwgTWVtYmVyLCBNb2R1bGUsIE9ialBhaXIsIE9ialNpbXBsZSxcblx0UGF0dGVybiwgUXVvdGUsIFNQX0RlYnVnZ2VyLCBTcGVjaWFsRG8sIFNwZWNpYWxWYWwsIFNWX051bGwsIFNwbGF0LCBWYWwsIFVubGVzc0RvLCBVc2UsIFVzZURvLFxuXHRZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9sYW5ndWFnZSdcbmltcG9ydCB7IENhbGxPbkZvY3VzLCBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LCBHX1BhcmVuLCBHX1NwYWNlLCBHX1F1b3RlLCBpc0dyb3VwLFxuXHRpc0tleXdvcmQsIEtleXdvcmQsIEtXX0Fzc2lnbiwgS1dfQXNzaWduTXV0YWJsZSwgS1dfQXNzaWduTXV0YXRlLCBLV19DYXNlLCBLV19DYXNlRG8sIEtXX0RlYnVnLFxuXHRLV19EZWJ1Z2dlciwgS1dfRWxzZSwgS1dfRW5kTG9vcCwgS1dfRm9jdXMsIEtXX0Z1biwgS1dfR2VuRnVuLCBLV19JZkRvLCBLV19JbiwgS1dfTGF6eSwgS1dfTG9vcCxcblx0S1dfTWFwRW50cnksIEtXX09iakFzc2lnbiwgS1dfUGFzcywgS1dfT3V0LCBLV19SZWdpb24sIEtXX1R5cGUsIEtXX1VubGVzc0RvLCBLV19Vc2UsXG5cdEtXX1VzZURlYnVnLCBLV19Vc2VEbywgS1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8sIE5hbWUsIG9wS1d0b1NWLCBUb2tlbk51bWJlckxpdGVyYWxcblx0fSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaGVhZCwgaWZFbHNlLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LFxuXHRvcElmLCBvcE1hcCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxubGV0IGN4XG5cbmNvbnN0IFdpdGhPYmpLZXlzID0gdHVwbCgnV2l0aE9iaktleXMnLCBPYmplY3QsXG5cdCdXcmFwcyBhbiBEbyB3aXRoIGtleXMgZm9yIHRoaXMgYmxvY2tcXCdzIE9iai4gTm90IG1lYW50IHRvIGVzY2FwZSB0aGlzIGZpbGUuJyxcblx0WyAna2V5cycsIFtMb2NhbERlY2xhcmVdLCAnbGluZScsIERvXSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoX2N4LCByb290VG9rZW4pIHtcblx0Y3ggPSBfY3hcblx0cmV0dXJuIHBhcnNlTW9kdWxlKFNsaWNlLmdyb3VwKHJvb3RUb2tlbikpXG59XG5cbmNvbnN0XG5cdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHRjaGVja05vbkVtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayghdG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdHVuZXhwZWN0ZWQgPSB0ID0+IGN4LmZhaWwodC5sb2MsIGBVbmV4cGVjdGVkICR7dH1gKVxuXG5jb25zdCBwYXJzZU1vZHVsZSA9IHRva2VucyA9PiB7XG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURvLCB0b2tlbnMpXG5cdGNvbnN0IFsgcGxhaW5Vc2VzLCByZXN0MSBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZSwgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlTGF6eSwgcmVzdDEpXG5cdGNvbnN0IFsgZGVidWdVc2VzLCByZXN0MyBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURlYnVnLCByZXN0Milcblx0Y29uc3QgeyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH0gPSBwYXJzZU1vZHVsZUJsb2NrKHJlc3QzKVxuXG5cdGlmIChjeC5vcHRzLmluY2x1ZGVNb2R1bGVOYW1lKCkgJiYgIWV4cG9ydHMuc29tZShfID0+IF8ubmFtZSA9PT0gJ25hbWUnKSkge1xuXHRcdGNvbnN0IGRuID0gTG9jYWxEZWNsYXJlLmRlY2xhcmVOYW1lKHRva2Vucy5sb2MpXG5cdFx0bGluZXMucHVzaChBc3NpZ24odG9rZW5zLmxvYywgZG4sXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2goZG4pXG5cdH1cblx0Y29uc3QgdXNlcyA9IHBsYWluVXNlcy5jb25jYXQobGF6eVVzZXMpXG5cdHJldHVybiBNb2R1bGUodG9rZW5zLmxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQpXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhpc0dyb3VwKEdfQmxvY2ssIGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCbG9ja0RvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJsb2NrVmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0cGFyc2VMaW5lc0Zyb21CbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjeC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2h9YClcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIGlzR3JvdXAoR19CbG9jaywgYmxvY2spKVxuXHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnRva2VucywgbGluZSA9PiBwYXJzZUxpbmVPckxpbmVzKFNsaWNlLmdyb3VwKGxpbmUpKSlcblx0fSxcblxuXHRwYXJzZUJsb2NrRG8gPSB0b2tlbnMgPT4ge1xuXHRcdC8vIE9LIGlmIGxhc3QgbGluZSBpcyBhIFZhbCwgd2UnbGwganVzdCB0cmVhdCBpdCBhcyBhIERvLlxuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdGN4LmNoZWNrKGtSZXR1cm4gPT09IEtSZXR1cm5fUGxhaW4sIHRva2Vucy5sb2MsXG5cdFx0XHQoKSA9PiBgQ2FuIG5vdCBtYWtlICR7a1JldHVybn0gaW4gc3RhdGVtZW50IGNvbnRleHQuYClcblx0XHRyZXR1cm4gQmxvY2tEbyh0b2tlbnMubG9jLCBhbGxMaW5lcylcblx0fSxcblx0cGFyc2VCbG9ja1ZhbCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgYmxvY2sgPSBwYXJzZUFueUJsb2NrKHRva2Vucylcblx0XHRjeC5jaGVjayghKGJsb2NrIGluc3RhbmNlb2YgQmxvY2tEbyksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGEgdmFsdWUgYmxvY2suJylcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblxuXHRwYXJzZU1vZHVsZUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzOiBleHBvcnRzIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjb25zdCBsb2MgPSB0b2tlbnMubG9jXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOiBjYXNlIEtSZXR1cm5fTWFwOiB7XG5cdFx0XHRcdGNvbnN0IGN0ciA9IGtSZXR1cm4gPT09IEtSZXR1cm5fQmFnID8gQmxvY2tCYWcgOiBCbG9ja01hcFxuXHRcdFx0XHRyZXR1cm4geyBsaW5lczogWyBdLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQ6IEJsb2NrV3JhcChsb2MsIGN0cihsb2MsIGFsbExpbmVzKSkgfVxuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc3QgeyBsaW5lcywgb3BWYWw6IG9wRGVmYXVsdEV4cG9ydCB9ID0gX3RyeVRha2VMYXN0VmFsKGFsbExpbmVzKVxuXHRcdFx0XHRyZXR1cm4geyBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0IH1cblx0XHR9XG5cdH0sXG5cblx0cGFyc2VBbnlCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tCYWcodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRjYXNlIEtSZXR1cm5fTWFwOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tNYXAodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjb25zdCB7IGxpbmVzLCBvcFZhbCB9ID0gX3RyeVRha2VMYXN0VmFsKGFsbExpbmVzKVxuXHRcdFx0XHRyZXR1cm4ga1JldHVybiA9PT0gS1JldHVybl9PYmogP1xuXHRcdFx0XHRcdEJsb2NrT2JqKHRva2Vucy5sb2MsIGxpbmVzLCBvYmpLZXlzLCBvcFZhbCwgbnVsbCkgOlxuXHRcdFx0XHRcdGlmRWxzZShvcFZhbCxcblx0XHRcdFx0XHRcdF8gPT4gQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIGxpbmVzLCBfKSxcblx0XHRcdFx0XHRcdCgpID0+IEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpKVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdF90cnlUYWtlTGFzdFZhbCA9IGxpbmVzID0+XG5cdFx0KCFpc0VtcHR5KGxpbmVzKSAmJiBsYXN0KGxpbmVzKSBpbnN0YW5jZW9mIFZhbCkgP1xuXHRcdFx0eyBsaW5lczogcnRhaWwobGluZXMpLCBvcFZhbDogbGFzdChsaW5lcykgfSA6XG5cdFx0XHR7IGxpbmVzLCBvcFZhbDogbnVsbCB9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZXMgPT4ge1xuXHRcdGNvbnN0IG9iaktleXMgPSBbIF1cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IChsaW5lLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2goXyA9PiBjaGVja0xpbmUoXywgdHJ1ZSkpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgQmFnRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0aXNCYWcgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBNYXBFbnRyeSkge1xuXHRcdFx0XHRjeC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdGlzTWFwID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMpXG5cdFx0XHRcdG9iaktleXMucHVzaCguLi5saW5lLmtleXMpXG5cdFx0fVxuXHRcdGNvbnN0IGFsbExpbmVzID0gWyBdXG5cdFx0Y29uc3QgYWRkTGluZSA9IGxpbmUgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0bGluZS5mb3JFYWNoKGFkZExpbmUpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y2hlY2tMaW5lKGxpbmUsIGZhbHNlKVxuXHRcdFx0XHRhbGxMaW5lcy5wdXNoKGxpbmUgaW5zdGFuY2VvZiBXaXRoT2JqS2V5cyA/IGxpbmUubGluZSA6IGxpbmUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxpbmVzLmVhY2goXyA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChfKSkpKVxuXG5cdFx0Y29uc3QgaXNPYmogPSAhaXNFbXB0eShvYmpLZXlzKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9XG5cdFx0XHRpc09iaiA/IEtSZXR1cm5fT2JqIDogaXNCYWcgPyBLUmV0dXJuX0JhZyA6IGlzTWFwID8gS1JldHVybl9NYXAgOiBLUmV0dXJuX1BsYWluXG5cdFx0cmV0dXJuIHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfVxuXHR9XG5cbmNvbnN0IHBhcnNlQ2FzZSA9IChrLCBjYXNlZEZyb21GdW4sIHRva2VucykgPT4ge1xuXHRjb25zdCBpc1ZhbCA9IGsgPT09IEtXX0Nhc2VcblxuXHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2VucylcblxuXHRsZXQgb3BDYXNlZFxuXHRpZiAoY2FzZWRGcm9tRnVuKSB7XG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdDYW5cXCd0IG1ha2UgZm9jdXMgLS0gaXMgaW1wbGljaXRseSBwcm92aWRlZCBhcyBmaXJzdCBhcmd1bWVudC4nKVxuXHRcdG9wQ2FzZWQgPSBudWxsXG5cdH0gZWxzZVxuXHRcdG9wQ2FzZWQgPSBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PiBBc3NpZ24uZm9jdXMoYmVmb3JlLmxvYywgcGFyc2VFeHByKGJlZm9yZSkpKVxuXG5cdGNvbnN0IGxhc3RMaW5lID0gU2xpY2UuZ3JvdXAoYmxvY2subGFzdCgpKVxuXHRjb25zdCBbIHBhcnRMaW5lcywgb3BFbHNlIF0gPSBpc0tleXdvcmQoS1dfRWxzZSwgbGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCAoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykobGFzdExpbmUudGFpbCgpKSBdIDpcblx0XHRbIGJsb2NrLCBudWxsIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIHJlc3VsdClcblx0fSlcblx0Y3guY2hlY2socGFydHMubGVuZ3RoID4gMCwgdG9rZW5zLmxvYywgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKSh0b2tlbnMubG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxufVxuLy8gcGFyc2VDYXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKGlzR3JvdXAoR19TcGFjZSwgZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShfID0+IGlzS2V5d29yZChLV19PYmpBc3NpZ24sIF8pKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gWyBdXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKVxuXHRcdFx0XHRcdGN4LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbmFtZSwgbm90ICR7bmFtZX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmtpbmQgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y3guZmFpbCh0b2tlbnMubG9jLCAnRXhwZWN0ZWQgYW4gZXhwcmVzc2lvbiwgZ290IG5vdGhpbmcuJylcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cmV0dXJuIGhlYWQocGFydHMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgdGFpbChwYXJ0cykpXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlRnVuID0gKGlzR2VuZXJhdG9yLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgeyBvcFJldHVyblR5cGUsIHJlc3QgfSA9IF90cnlUYWtlUmV0dXJuVHlwZSh0b2tlbnMpXG5cdGNoZWNrTm9uRW1wdHkocmVzdCwgKCkgPT4gYEV4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLmApXG5cdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2socmVzdClcblx0YXJncy5mb3JFYWNoKGFyZyA9PiB7XG5cdFx0aWYgKCFhcmcuaXNMYXp5KCkpXG5cdFx0XHRhcmcua2luZCA9IExEX011dGFibGVcblx0fSlcblx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdGNvbnN0IG9wUmVzRGVjbGFyZSA9IGlmRWxzZShvcFJldHVyblR5cGUsXG5cdFx0XyA9PiBMb2NhbERlY2xhcmVSZXMoXy5sb2MsIF8pLFxuXHRcdCgpID0+IG9wTWFwKG9wT3V0LCBvID0+IExvY2FsRGVjbGFyZVJlcyhvLmxvYywgbnVsbCkpKVxuXHRyZXR1cm4gRnVuKHRva2Vucy5sb2MsIGlzR2VuZXJhdG9yLCBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxufVxuXG4vLyBwYXJzZUZ1biBwcml2YXRlc1xuY29uc3Rcblx0X3RyeVRha2VSZXR1cm5UeXBlID0gdG9rZW5zID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoaXNHcm91cChHX1NwYWNlLCBoKSAmJiBpc0tleXdvcmQoS1dfVHlwZSwgaGVhZChoLnRva2VucykpKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdG9wUmV0dXJuVHlwZTogcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAoaCkudGFpbCgpKSxcblx0XHRcdFx0XHRyZXN0OiB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHsgb3BSZXR1cm5UeXBlOiBudWxsLCByZXN0OiB0b2tlbnMgfVxuXHR9LFxuXG5cdF9mdW5BcmdzQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gTWlnaHQgYmUgYHxjYXNlYFxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZCAmJiAoaC5raW5kID09PSBLV19DYXNlIHx8IGgua2luZCA9PT0gS1dfQ2FzZURvKSkge1xuXHRcdFx0Y29uc3QgZUNhc2UgPSBwYXJzZUNhc2UoaC5raW5kLCB0cnVlLCB0b2tlbnMudGFpbCgpKVxuXHRcdFx0Y29uc3QgYXJncyA9IFsgTG9jYWxEZWNsYXJlLmZvY3VzKGgubG9jKSBdXG5cdFx0XHRyZXR1cm4gaC5raW5kID09PSBLV19DYXNlID9cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogbnVsbCwgb3BJbjogbnVsbCwgb3BPdXQ6IG51bGwsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBbIF0sIGVDYXNlKVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogbnVsbCwgb3BJbjogbnVsbCwgb3BPdXQ6IG51bGwsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrRG8odG9rZW5zLmxvYywgWyBlQ2FzZSBdKVxuXHRcdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRjb25zdCBbIG9wSW4sIHJlc3QwIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfSW4sIGJsb2NrKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dChLV19PdXQsIHJlc3QwKVxuXHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jazogcGFyc2VBbnlCbG9jayhyZXN0MSksIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy5ydGFpbCgpKSxcblx0XHRcdFx0XHRvcFJlc3RBcmc6IExvY2FsRGVjbGFyZS5wbGFpbihsLmxvYywgbC5uYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdH1cblx0fSxcblxuXHRfdHJ5VGFrZUluT3JPdXQgPSAoaW5Pck91dCwgdG9rZW5zKSA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBmaXJzdExpbmUgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoaXNLZXl3b3JkKGluT3JPdXQsIGhlYWQoZmlyc3RMaW5lLnRva2VucykpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKFNsaWNlLmdyb3VwKGZpcnN0TGluZSkpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoZWFkID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHRjb25zdCBub1Jlc3QgPSAoKSA9PlxuXHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtoZWFkfWApXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoZWFkIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaGVhZC5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdGlzR3JvdXAoR19CbG9jaywgdG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRub1Jlc3QoKVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsRG8odG9rZW5zLmxvYywgU1BfRGVidWdnZXIpXG5cdFx0XHRcdGNhc2UgS1dfRW5kTG9vcDpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2hlYWR9YClcblx0XHRcdFx0XHRyZXR1cm4gRW5kTG9vcCh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0lmRG86IGNhc2UgS1dfVW5sZXNzRG86IHtcblx0XHRcdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHJlc3QpXG5cdFx0XHRcdFx0Y29uc3QgY3RyID0gaGVhZC5raW5kID09PSBLV19JZkRvID8gSWZEbyA6IFVubGVzc0RvXG5cdFx0XHRcdFx0cmV0dXJuIGN0cih0b2tlbnMubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VCbG9ja0RvKGJsb2NrKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEtXX0xvb3A6XG5cdFx0XHRcdFx0cmV0dXJuIExvb3AodG9rZW5zLmxvYywganVzdEJsb2NrRG8ocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfT2JqQXNzaWduOlxuXHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCksIC0xKVxuXHRcdFx0XHRjYXNlIEtXX1Bhc3M6XG5cdFx0XHRcdFx0bm9SZXN0KClcblx0XHRcdFx0XHRyZXR1cm4gWyBdXG5cdFx0XHRcdGNhc2UgS1dfUmVnaW9uOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKHRva2Vucylcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBmYWxsIHRocm91Z2hcblx0XHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoX2lzTGluZVNwbGl0S2V5d29yZCksXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdHJldHVybiBhdC5raW5kID09PSBLV19NYXBFbnRyeSA/XG5cdFx0XHRcdFx0X3BhcnNlTWFwRW50cnkoYmVmb3JlLCBhZnRlciwgdG9rZW5zLmxvYykgOlxuXHRcdFx0XHRcdGF0LmtpbmQgPT09IEtXX0Fzc2lnbk11dGF0ZSA/XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduTXV0YXRlKGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X2lzTGluZVNwbGl0S2V5d29yZCA9IHRva2VuID0+IHtcblx0XHRpZiAodG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoICh0b2tlbi5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfQXNzaWduOiBjYXNlIEtXX0Fzc2lnbk11dGFibGU6IGNhc2UgS1dfQXNzaWduTXV0YXRlOlxuXHRcdFx0XHRjYXNlIEtXX01hcEVudHJ5OiBjYXNlIEtXX09iakFzc2lnbjogY2FzZSBLV19ZaWVsZDogY2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH0sXG5cblx0X3BhcnNlQXNzaWduTXV0YXRlID0gKGxvY2Fsc1Rva2VucywgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhsb2NhbHNUb2tlbnMpXG5cdFx0Y3guY2hlY2sobG9jYWxzLmxlbmd0aCA9PT0gMSwgbG9jLCAnVE9ETzogQXNzaWduRGVzdHJ1Y3R1cmVNdXRhdGUnKVxuXHRcdGNvbnN0IG5hbWUgPSBsb2NhbHNbMF0ubmFtZVxuXHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByKHZhbHVlVG9rZW5zKVxuXHRcdHJldHVybiBBc3NpZ25NdXRhdGUobG9jLCBuYW1lLCB2YWx1ZSlcblx0fSxcblxuXHRfcGFyc2VBc3NpZ24gPSAobG9jYWxzVG9rZW5zLCBhc3NpZ25lciwgdmFsdWVUb2tlbnMsIGxvYykgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBhc3NpZ25lci5raW5kXG5cdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGxvY2Fsc1Rva2Vucylcblx0XHRjb25zdCBvcE5hbWUgPSBvcElmKGxvY2Fscy5sZW5ndGggPT09IDEsICgpID0+IGxvY2Fsc1swXS5uYW1lKVxuXHRcdGNvbnN0IHZhbHVlID0gX3BhcnNlQXNzaWduVmFsdWUoa2luZCwgb3BOYW1lLCB2YWx1ZVRva2VucylcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgbG9jYWxzVG9rZW5zLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soIV8uaXNMYXp5KCksIF8ubG9jLCAnQ2FuIG5vdCB5aWVsZCB0byBsYXp5IHZhcmlhYmxlLicpKVxuXG5cdFx0XHRjb25zdCBpc09iakFzc2lnbiA9IGtpbmQgPT09IEtXX09iakFzc2lnblxuXG5cdFx0XHRpZiAoa2luZCA9PT0gS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRcdFx0Y3guY2hlY2soIV8uaXNMYXp5KCksIF8ubG9jLCAnTGF6eSBsb2NhbCBjYW4gbm90IGJlIG11dGFibGUuJylcblx0XHRcdFx0XHRfLmtpbmQgPSBMRF9NdXRhYmxlXG5cdFx0XHRcdH0pXG5cblx0XHRcdGNvbnN0IGFzcyA9ICgoKSA9PiB7XG5cdFx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXNzaWduZWUgPSBsb2NhbHNbMF1cblx0XHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgdmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdFx0cmV0dXJuIGlzVGVzdCA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBraW5kID0gbG9jYWxzWzBdLmtpbmRcblx0XHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKF8ua2luZCA9PT0ga2luZCwgXy5sb2MsXG5cdFx0XHRcdFx0XHQnQWxsIGxvY2FscyBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbm1lbnQgbXVzdCBiZSBvZiB0aGUgc2FtZSBraW5kLicpKVxuXHRcdFx0XHRcdHJldHVybiBBc3NpZ25EZXN0cnVjdHVyZShsb2MsIGxvY2FscywgdmFsdWUsIGtpbmQpXG5cdFx0XHRcdH1cblx0XHRcdH0pKClcblxuXHRcdFx0cmV0dXJuIGlzT2JqQXNzaWduID8gV2l0aE9iaktleXMobG9jYWxzLCBhc3MpIDogYXNzXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUFzc2lnblZhbHVlID0gKGtpbmQsIG9wTmFtZSwgdmFsdWVUb2tlbnMpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHZhbHVlVG9rZW5zLmlzRW1wdHkoKSAmJiBraW5kID09PSBLV19PYmpBc3NpZ24gP1xuXHRcdFx0U3BlY2lhbFZhbCh2YWx1ZVRva2Vucy5sb2MsIFNWX051bGwpIDpcblx0XHRcdHBhcnNlRXhwcih2YWx1ZVRva2Vucylcblx0XHRpZiAob3BOYW1lICE9PSBudWxsKVxuXHRcdFx0X3RyeUFkZE5hbWUodmFsdWUsIG9wTmFtZSlcblx0XHRzd2l0Y2ggKGtpbmQpIHtcblx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdHJldHVybiBZaWVsZCh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZS5sb2MsIHZhbHVlKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIFdlIGdpdmUgaXQgYSBuYW1lIGlmOlxuXHQvLyBJdCdzIGEgZnVuY3Rpb25cblx0Ly8gSXQncyBhbiBPYmogYmxvY2tcblx0Ly8gSXQncyBhbiBPYmogYmxvY2sgYXQgdGhlIGVuZCBvZiBhIGNhbGwgKGFzIGluIGBuYW1lID0gT2JqLVR5cGUgLi4uYClcblx0X3RyeUFkZE5hbWUgPSAoXywgbmFtZSkgPT4ge1xuXHRcdGlmIChfIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0Xy5uYW1lID0gbmFtZVxuXHRcdGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBDYWxsICYmIF8uYXJncy5sZW5ndGggPiAwKVxuXHRcdFx0X3RyeUFkZE9iak5hbWUobGFzdChfLmFyZ3MpLCBuYW1lKVxuXHRcdGVsc2Vcblx0XHRcdF90cnlBZGRPYmpOYW1lKF8sIG5hbWUpXG5cdH0sXG5cdF90cnlBZGRPYmpOYW1lID0gKF8sIG5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIEJsb2NrV3JhcClcblx0XHRcdGlmIChfLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tPYmopXG5cdFx0XHRcdGlmIChfLmJsb2NrLm9wT2JqZWQgIT09IG51bGwgJiYgXy5ibG9jay5vcE9iamVkIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRcdF8uYmxvY2sub3BPYmplZC5uYW1lID0gbmFtZVxuXHRcdFx0XHRlbHNlIGlmICghKF8uYmxvY2sua2V5cy5zb21lKF8gPT4gXy5uYW1lID09PSAnbmFtZScpKSlcblx0XHRcdFx0XHRfLmJsb2NrLm9wTmFtZSA9IG5hbWVcblx0fSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0TWFwRW50cnkobG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VFeHByKGFmdGVyKSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzSnVzdE5hbWVzID0gdG9rZW5zID0+XG5cdFx0dG9rZW5zLm1hcChfID0+IExvY2FsRGVjbGFyZS5wbGFpbihfLmxvYywgX3BhcnNlTG9jYWxOYW1lKF8pKSksXG5cblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdG9rZW4gPT4ge1xuXHRcdGlmIChpc0dyb3VwKEdfU3BhY2UsIHRva2VuKSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodG9rZW4pXG5cdFx0XHRjb25zdCBbIHJlc3QsIGlzTGF6eSBdID1cblx0XHRcdFx0aXNLZXl3b3JkKEtXX0xhenksIHRva2Vucy5oZWFkKCkpID8gWyB0b2tlbnMudGFpbCgpLCB0cnVlIF0gOiBbIHRva2VucywgZmFsc2UgXVxuXHRcdFx0Y29uc3QgbmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdGNvbnN0IG9wVHlwZSA9IG9wSWYoIXJlc3QyLmlzRW1wdHkoKSwgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRjeC5jaGVjayhpc0tleXdvcmQoS1dfVHlwZSwgY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdHJldHVybiBwYXJzZVNwYWNlZCh0b2tlbnNUeXBlKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmUodG9rZW4ubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSA/IExEX0xhenkgOiBMRF9Db25zdClcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmUucGxhaW4odG9rZW4ubG9jLCBfcGFyc2VMb2NhbE5hbWUodG9rZW4pKVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoaXNLZXl3b3JkKEtXX0ZvY3VzLCB0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dH1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PlxuXHR0IGluc3RhbmNlb2YgTmFtZSA/XG5cdF9hY2Nlc3ModC5uYW1lLCB0LmxvYykgOlxuXHR0IGluc3RhbmNlb2YgR3JvdXAgPyAoKCkgPT4ge1xuXHRcdHN3aXRjaCAodC5raW5kKSB7XG5cdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiBwYXJzZVNwYWNlZChTbGljZS5ncm91cCh0KSlcblx0XHRcdGNhc2UgR19QYXJlbjogcmV0dXJuIHBhcnNlRXhwcihTbGljZS5ncm91cCh0KSlcblx0XHRcdGNhc2UgR19CcmFja2V0OiByZXR1cm4gQmFnU2ltcGxlKHQubG9jLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpXG5cdFx0XHRjYXNlIEdfQmxvY2s6IHJldHVybiBibG9ja1dyYXAoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdHJldHVybiBRdW90ZSh0LmxvYyxcblx0XHRcdFx0XHR0LnRva2Vucy5tYXAoXyA9PiAodHlwZW9mIF8gPT09ICdzdHJpbmcnKSA/IF8gOiBwYXJzZVNpbmdsZShfKSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0fVxuXHR9KSgpIDpcblx0dCBpbnN0YW5jZW9mIFRva2VuTnVtYmVyTGl0ZXJhbCA/XG5cdE51bWJlckxpdGVyYWwodC5sb2MsIHQudmFsdWUpIDpcblx0dCBpbnN0YW5jZW9mIENhbGxPbkZvY3VzID9cblx0Q2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSwgWyBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgXSkgOlxuXHR0IGluc3RhbmNlb2YgS2V5d29yZCA/XG5cdFx0dC5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgOlxuXHRcdFx0U3BlY2lhbFZhbCh0LmxvYywgb3BLV3RvU1YodC5raW5kKSB8fCB1bmV4cGVjdGVkKHQpKSA6XG5cdHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDMgP1xuXHRTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpIDpcblx0dW5leHBlY3RlZCh0KVxuXG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKGlzS2V5d29yZChLV19UeXBlLCBoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoaXNLZXl3b3JkKEtXX0xhenksIGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Y29uc3QgbWVtYmVyT3JTdWJzY3JpcHQgPSAoZSwgdCkgPT4ge1xuXHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjeC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKGlzS2V5d29yZChrLCBsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PmBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cdFx0XHRpZiAoayA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gS1dfVXNlTGF6eSB8fCBrID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgU2xpY2UuZ3JvdXAobGluZSkudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxpbmUubG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZS5ub1R5cGUodG9rZW5zLmxvYywgbmFtZSwgaXNMYXp5KVxuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgdXNlZDogWyBdLCBvcFVzZURlZmF1bHQ6IHVzZURlZmF1bHQoKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBbIG9wVXNlRGVmYXVsdCwgcmVzdCBdID1cblx0XHRcdFx0aXNLZXl3b3JkKEtXX0ZvY3VzLCB0b2tlbnMuaGVhZCgpKSA/XG5cdFx0XHRcdFx0WyB1c2VEZWZhdWx0KCksIHRva2Vucy50YWlsKCkgXSA6XG5cdFx0XHRcdFx0WyBudWxsLCB0b2tlbnMgXVxuXHRcdFx0Y29uc3QgdXNlZCA9IHBhcnNlTG9jYWxEZWNsYXJlc0p1c3ROYW1lcyhyZXN0KS5tYXAobCA9PiB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdFx0bC5raW5kID0gTERfTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKGlzR3JvdXAoR19TcGFjZSwgdCksIHQubG9jLCAnTm90IGEgdmFsaWQgbW9kdWxlIG5hbWUuJylcblx0XHRcdHJldHVybiBfcGFyc2VMb2NhbFJlcXVpcmUoU2xpY2UuZ3JvdXAodCkpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsUmVxdWlyZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0bGV0IHBhcnRzXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHBhcnRzID0gX3BhcnRzRnJvbURvdE5hbWUoZmlyc3QpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzID0gWyBdXG5cdFx0fVxuXHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHR0b2tlbnMudGFpbCgpLmVhY2godCA9PiB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAxLCB0LmxvYyxcblx0XHRcdFx0J05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzLnB1c2godC5uYW1lKVxuXHRcdH0pXG5cdFx0cmV0dXJuIHsgcGF0aDogcGFydHMuam9pbignLycpLCBuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWUgfVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=