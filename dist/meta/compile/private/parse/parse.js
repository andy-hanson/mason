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

		const block = parseAnyBlock(rest3);

		var _ref = block instanceof _Expression.BlockWithReturn ? [block.lines, [], block.returned] : block instanceof _Expression.BlockObj ? [block.lines, block.keys, block.opObjed] : block instanceof _Expression.BlockDo ? [block.lines, [], null] :
		// other BlockVal
		[[], [], (0, _Expression.BlockWrap)(rest3.loc, block)];

		var _ref2 = _slicedToArray(_ref, 3);

		const lines = _ref2[0];
		const exports = _ref2[1];
		const opDefaultExport = _ref2[2];

		if (cx.opts.moduleDisplayName() && !exports.some(function (ex) {
			return ex.name === 'displayName';
		})) {
			const dn = _Expression.LocalDeclare.displayName(tokens.loc);
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
	      parseAnyBlock = function (tokens) {
		var _parseBlockLines3 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines3.allLines;
		const kReturn = _parseBlockLines3.kReturn;
		const objKeys = _parseBlockLines3.objKeys;

		switch (kReturn) {
			case KReturn_Bag:
				return (0, _Expression.BlockBag)(tokens.loc, allLines);
			case KReturn_Map:
				return (0, _Expression.BlockMap)(tokens.loc, allLines);
			default:
				var _ref3 = !(0, _UBag.isEmpty)(allLines) && (0, _UBag.last)(allLines) instanceof _Expression.Val ? [(0, _UBag.rtail)(allLines), (0, _UBag.last)(allLines)] : [allLines, null],
				    _ref32 = _slicedToArray(_ref3, 2),
				    lines = _ref32[0],
				    opVal = _ref32[1];

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

		var _ref4 = _Token.Keyword.isElse(lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(lastLine.tail())] : [block, null];

		var _ref42 = _slicedToArray(_ref4, 2);

		const partLines = _ref42[0];
		const opElse = _ref42[1];

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
				return _Expression.GlobalAccess.null(tokens.loc);
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
			case _Token.KW_Debugger:
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return _Expression.Special.debugger(tokens.loc);
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

		return (0, _UOp.ifElse)(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref5) {
			let before = _ref5.before;
			let at = _ref5.at;
			let after = _ref5.after;

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
	const _parseAssign = function (assigned, assigner, value, loc) {
		let locals = parseLocalDeclares(assigned);
		const kind = assigner.kind;

		const _ = parseExpr(value);
		const eValueNamed = locals.length === 1 ? _tryAddDisplayName(_, (0, _UBag.head)(locals).name) : _;
		const eValue = _valueFromAssign(eValueNamed, kind);

		const isYield = kind === _Token.KW_Yield || kind === _Token.KW_YieldTo;
		if ((0, _UBag.isEmpty)(locals)) {
			cx.check(isYield, assigned.loc, 'Assignment to nothing');
			return eValue;
		}

		if (isYield) locals.forEach(function (_) {
			return cx.check(!_.isLazy, _.loc, 'Can not yield to lazy variable.');
		});

		if (kind === _Token.KW_ObjAssign) locals.forEach(function (l) {
			l.okToNotUse = true;
		});

		const isObjAssign = kind === _Token.KW_ObjAssign;
		let ass;
		if (locals.length === 1) {
			const assignee = locals[0];
			const assign = (0, _Expression.Assign)(loc, assignee, eValue);
			const isTest = isObjAssign && assign.assignee.name.endsWith('test');
			ass = isTest ? (0, _Expression.Debug)(loc, [assign]) : assign;
		} else {
			const isLazy = locals.some(function (l) {
				return l.isLazy;
			});
			if (isLazy) locals.forEach(function (_) {
				return cx.check(_.isLazy, _.loc, 'If any part of destructuring assign is lazy, all must be.');
			});
			ass = (0, _Expression.AssignDestructure)(loc, locals, eValue, isLazy);
		}
		return isObjAssign ? WithObjKeys(locals, ass) : ass;
	},
	      _valueFromAssign = function (valuePre, kAssign) {
		switch (kAssign) {
			case _Token.KW_Yield:
				return (0, _Expression.Yield)(valuePre.loc, valuePre);
			case _Token.KW_YieldTo:
				return (0, _Expression.YieldTo)(valuePre.loc, valuePre);
			default:
				return valuePre;
		}
	},
	     

	// We give it a displayName if:
	// . It's a block
	// . It's a function
	// . It's one of those at the end of a block
	// . It's one of those as the end member of a call.
	_tryAddDisplayName = function (_, displayName) {
		if (_ instanceof _Expression.Call && _.args.length > 0) {
			_.args[_.args.length - 1] = _tryAddDisplayName((0, _UBag.last)(_.args), displayName);
			return _;
		} else if (_ instanceof _Expression.Fun)
			// TODO: _.name = displayName
			return (0, _Expression.BlockWrap)(_.loc, (0, _Expression.BlockObj)(_.loc, [], [], _, displayName));else if (_ instanceof _Expression.BlockWithReturn) {
			_.returned = _tryAddDisplayName(_.returned, displayName);
			return _;
		} else if (_ instanceof _Expression.BlockObj) {
			if (!_.keys.some(function (_) {
				return _.name === 'displayName';
			})) _.opDisplayName = displayName;
			return _;
		} else if (_ instanceof _Expression.BlockWrap) {
			_.block = _tryAddDisplayName(_.block, displayName);
			return _;
		} else return _;
	},
	      _parseMapEntry = function (before, after, loc) {
		return (
			// TODO: index Filled in by ???
			(0, _Expression.MapEntry)(loc, parseExpr(before), parseExpr(after), -1)
		);
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
					return (0, _Expression.ListSimple)(t.loc, parseExprParts(_Slice2.group(t)));
				case _Token.G_Block:
					return blockWrap(_Slice2.group(t));
				case _Token.G_Quote:
					return (0, _Expression.Quote)(t.loc, t.tokens.map(function (_) {
						return typeof _ === 'string' ? _ : parseSingle(_);
					}));
				default:
					unexpected(t);
			}
		})() : t instanceof _Token.TokenNumberLiteral ? (0, _Expression.NumberLiteral)(t.loc, t.value) : t instanceof _Token.CallOnFocus ? (0, _Expression.Call)(t.loc, _access(t.name, t.loc), [_Expression.LocalAccess.focus(t.loc)]) : t instanceof _Token.Keyword ? t.kind === _Token.KW_Focus ? _Expression.LocalAccess.focus(t.loc) : (0, _Expression.Special)(t.loc, (0, _Token.opKWtoSP)(t.kind) || unexpected(t)) : t instanceof _Token.DotName && t.nDots === 3 ? (0, _Expression.Splat)(t.loc, (0, _Expression.LocalAccess)(t.loc, t.name)) : unexpected(t);
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
			var _ref6 = _Token.Keyword.isFocus(tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref62 = _slicedToArray(_ref6, 2);

			const opUseDefault = _ref62[0];
			const rest = _ref62[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF3QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLFdBQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakJrRCxZQUFZLENBaUJoRCxFQUFFLE1BQU0sY0FsQmtDLEVBQUUsQ0FrQi9CLENBQUMsQ0FBQTs7QUFFeEIsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTtzQkFDSCxZQUFZLFFBMUJzQyxRQUFRLEVBMEJuQyxNQUFNLENBQUM7Ozs7UUFBaEQsTUFBTTtRQUFFLEtBQUs7O3VCQUNRLFlBQVksUUEzQmMsTUFBTSxFQTJCWCxLQUFLLENBQUM7Ozs7UUFBaEQsU0FBUztR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LEFBK29CRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ3BELGtDQUFrQyxDQUFDLENBQUE7QUFDcEMsUUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDbEIsQ0FBQyxDQUFBO0FBQ0YsU0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7RUFDMUQ7T0FFRCxpQkFBaUIsR0FBRyxVQUFBLE9BQU87U0FDMUIsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsR0FBRyxVQW5wQlcsTUFBTSxFQW1wQlYsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBCbG9ja0JhZywgQmxvY2tEbywgQmxvY2tNYXAsIEJsb2NrT2JqLCBCbG9ja1dpdGhSZXR1cm4sXG5cdEJsb2NrV3JhcCwgQ2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsIENhc2VEbywgQ2FzZVZhbCwgRGVidWcsIERvLCBOdW1iZXJMaXRlcmFsLCBFbmRMb29wLFxuXHRGdW4sIEdsb2JhbEFjY2VzcywgTGF6eSwgQmFnRW50cnksIExpc3RTaW1wbGUsIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsIExvY2FsRGVjbGFyZVJlcyxcblx0TG9vcCwgTWFwRW50cnksIE1lbWJlciwgTW9kdWxlLCBPYmpQYWlyLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2UsXG5cdFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsXG5cdEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0luLFxuXHRLV19Mb29wLCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvLCBOYW1lLCBvcEtXdG9TUCwgVG9rZW5OdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBoZWFkLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIG9wSWYsIG9wTWFwIH0gZnJvbSAnLi4vVS9vcCdcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL1UvdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1NsaWNlJ1xuXG5sZXQgY3hcblxuY29uc3QgV2l0aE9iaktleXMgPSB0dXBsKCdXaXRoT2JqS2V5cycsIE9iamVjdCxcblx0J1dyYXBzIGFuIERvIHdpdGgga2V5cyBmb3IgdGhpcyBibG9ja1xcJ3MgT2JqLiBOb3QgbWVhbnQgdG8gZXNjYXBlIHRoaXMgZmlsZS4nLFxuXHRbICdrZXlzJywgW0xvY2FsRGVjbGFyZV0sICdsaW5lJywgRG9dKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShfY3gsIHJvb3RUb2tlbikge1xuXHRjeCA9IF9jeFxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoU2xpY2UuZ3JvdXAocm9vdFRva2VuKSlcbn1cblxuY29uc3Rcblx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdGNoZWNrTm9uRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0dW5leHBlY3RlZCA9IHQgPT4gY3guZmFpbCh0LmxvYywgYFVuZXhwZWN0ZWQgJHt0fWApXG5cbmNvbnN0IHBhcnNlTW9kdWxlID0gdG9rZW5zID0+IHtcblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCBibG9jayA9IHBhcnNlQW55QmxvY2socmVzdDMpXG5cdGNvbnN0IFsgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydCBdID1cblx0XHRibG9jayBpbnN0YW5jZW9mIEJsb2NrV2l0aFJldHVybiA/XG5cdFx0WyBibG9jay5saW5lcywgWyBdLCBibG9jay5yZXR1cm5lZCBdIDpcblx0XHRibG9jayBpbnN0YW5jZW9mIEJsb2NrT2JqID9cblx0XHRbIGJsb2NrLmxpbmVzLCBibG9jay5rZXlzLCBibG9jay5vcE9iamVkIF0gOlxuXHRcdGJsb2NrIGluc3RhbmNlb2YgQmxvY2tEbyA/XG5cdFx0WyBibG9jay5saW5lcywgWyBdLCBudWxsIF0gOlxuXHRcdC8vIG90aGVyIEJsb2NrVmFsXG5cdFx0WyBbIF0sIFsgXSwgQmxvY2tXcmFwKHJlc3QzLmxvYywgYmxvY2spIF1cblxuXHRpZiAoY3gub3B0cy5tb2R1bGVEaXNwbGF5TmFtZSgpICYmICFleHBvcnRzLnNvbWUoZXggPT4gZXgubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJykpIHtcblx0XHRjb25zdCBkbiA9IExvY2FsRGVjbGFyZS5kaXNwbGF5TmFtZSh0b2tlbnMubG9jKVxuXHRcdGxpbmVzLnB1c2goQXNzaWduKHRva2Vucy5sb2MsIGRuLFxuXHRcdFx0UXVvdGUuZm9yU3RyaW5nKHRva2Vucy5sb2MsIGN4Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cdFx0ZXhwb3J0cy5wdXNoKGRuKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0RXhwb3J0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y3guY2hlY2soR3JvdXAuaXNCbG9jayhibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0cmV0dXJuIFsgdG9rZW5zLnJ0YWlsKCksIFNsaWNlLmdyb3VwKGJsb2NrKSBdXG5cdH0sXG5cblx0YmxvY2tXcmFwID0gdG9rZW5zID0+IEJsb2NrV3JhcCh0b2tlbnMubG9jLCBwYXJzZUJsb2NrVmFsKHRva2VucykpLFxuXG5cdGp1c3RCbG9ja0RvID0gdG9rZW5zID0+IHBhcnNlQmxvY2tEbyhfanVzdEJsb2NrKHRva2VucykpLFxuXHRqdXN0QmxvY2tWYWwgPSB0b2tlbnMgPT4gcGFyc2VCbG9ja1ZhbChfanVzdEJsb2NrKHRva2VucykpLFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBHcm91cC5pc0Jsb2NrKGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHQvLyBPSyBpZiBsYXN0IGxpbmUgaXMgYSBWYWwsIHdlJ2xsIGp1c3QgdHJlYXQgaXQgYXMgYSBEby5cblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjeC5jaGVjayhrUmV0dXJuID09PSBLUmV0dXJuX1BsYWluLCB0b2tlbnMubG9jLFxuXHRcdFx0KCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdH0sXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VBbnlCbG9jayh0b2tlbnMpXG5cdFx0Y3guY2hlY2soIShibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8pLCBibG9jay5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0cGFyc2VBbnlCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0c3dpdGNoIChrUmV0dXJuKSB7XG5cdFx0XHRjYXNlIEtSZXR1cm5fQmFnOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tCYWcodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRjYXNlIEtSZXR1cm5fTWFwOlxuXHRcdFx0XHRyZXR1cm4gQmxvY2tNYXAodG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjb25zdCBbIGxpbmVzLCBvcFZhbCBdID1cblx0XHRcdFx0XHQoIWlzRW1wdHkoYWxsTGluZXMpICYmIGxhc3QoYWxsTGluZXMpIGluc3RhbmNlb2YgVmFsKSA/XG5cdFx0XHRcdFx0XHRbIHJ0YWlsKGFsbExpbmVzKSwgbGFzdChhbGxMaW5lcykgXSA6XG5cdFx0XHRcdFx0XHRbIGFsbExpbmVzLCBudWxsIF1cblx0XHRcdFx0cmV0dXJuIGtSZXR1cm4gPT09IEtSZXR1cm5fT2JqID9cblx0XHRcdFx0XHRCbG9ja09iaih0b2tlbnMubG9jLCBsaW5lcywgb2JqS2V5cywgb3BWYWwsIG51bGwpIDpcblx0XHRcdFx0XHRpZkVsc2Uob3BWYWwsXG5cdFx0XHRcdFx0XHRfID0+IEJsb2NrV2l0aFJldHVybih0b2tlbnMubG9jLCBsaW5lcywgXyksXG5cdFx0XHRcdFx0XHQoKSA9PiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKSlcblx0XHR9XG5cdH1cblxuLy8gcGFyc2VCbG9jayBwcml2YXRlc1xuY29uc3Rcblx0X2p1c3RCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRyZXR1cm4gYmxvY2tcblx0fSxcblxuXHRLUmV0dXJuX1BsYWluID0gMCxcblx0S1JldHVybl9PYmogPSAxLFxuXHRLUmV0dXJuX0JhZyA9IDIsXG5cdEtSZXR1cm5fTWFwID0gMyxcblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gWyBdXG5cdFx0bGV0IGlzQmFnID0gZmFsc2UsIGlzTWFwID0gZmFsc2Vcblx0XHRjb25zdCBjaGVja0xpbmUgPSAobGluZSwgaW5EZWJ1ZykgPT4ge1xuXHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0bGluZS5saW5lcy5mb3JFYWNoKF8gPT4gY2hlY2tMaW5lKF8sIHRydWUpKVxuXHRcdFx0ZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIEJhZ0VudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzKVxuXHRcdFx0XHRvYmpLZXlzLnB1c2goLi4ubGluZS5rZXlzKVxuXHRcdH1cblx0XHRjb25zdCBhbGxMaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGxpbmUuZm9yRWFjaChhZGRMaW5lKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNoZWNrTGluZShsaW5lLCBmYWxzZSlcblx0XHRcdFx0YWxsTGluZXMucHVzaChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMgPyBsaW5lLmxpbmUgOiBsaW5lKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRsaW5lcy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblxuXHRcdGNvbnN0IGlzT2JqID0gIWlzRW1wdHkob2JqS2V5cylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gbnVsbFxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCAoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykobGFzdExpbmUudGFpbCgpKSBdIDpcblx0XHRbIGJsb2NrLCBudWxsIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIHJlc3VsdClcblx0fSlcblx0Y3guY2hlY2socGFydHMubGVuZ3RoID4gMCwgdG9rZW5zLmxvYywgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKSh0b2tlbnMubG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxufVxuLy8gcGFyc2VDYXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChLZXl3b3JkLmlzVHlwZShmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShLZXl3b3JkLmlzT2JqQXNzaWduKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gWyBdXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKVxuXHRcdFx0XHRcdGN4LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbmFtZSwgbm90ICR7bmFtZX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmtpbmQgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cmV0dXJuIEdsb2JhbEFjY2Vzcy5udWxsKHRva2Vucy5sb2MpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdF8gPT4gTG9jYWxEZWNsYXJlUmVzKF8ubG9jLCBfKSxcblx0XHQoKSA9PiBvcE1hcChvcE91dCwgbyA9PiBMb2NhbERlY2xhcmVSZXMoby5sb2MsIG51bGwpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNUeXBlKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogbnVsbCwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGgua2luZCA9PT0gS1dfQ2FzZSB8fCBoLmtpbmQgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGgua2luZCwgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9jaylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2s6IHBhcnNlQW55QmxvY2socmVzdDEpLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBMb2NhbERlY2xhcmUucGxhaW4obC5sb2MsIGwubmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBudWxsIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkoaGVhZChmaXJzdExpbmUudG9rZW5zKSkpIHtcblx0XHRcdFx0Y29uc3QgaW5PdXQgPSBEZWJ1Zyhcblx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soU2xpY2UuZ3JvdXAoZmlyc3RMaW5lKSkpXG5cdFx0XHRcdHJldHVybiBbIGluT3V0LCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgbnVsbCwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoLmtpbmQpIHtcblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0Ly8gSW5kZXggaXMgc2V0IGJ5IHBhcnNlQmxvY2suXG5cdFx0XHRcdFx0cmV0dXJuIEJhZ0VudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcih0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0VuZExvb3A6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19Mb29wOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKEtleXdvcmQuaXNMaW5lU3BsaXQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUsIGxvYykgPT4ge1xuXHRcdGxldCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMoYXNzaWduZWQpXG5cdFx0Y29uc3Qga2luZCA9IGFzc2lnbmVyLmtpbmRcblxuXHRcdGNvbnN0IF8gPSBwYXJzZUV4cHIodmFsdWUpXG5cdFx0Y29uc3QgZVZhbHVlTmFtZWQgPVxuXHRcdFx0bG9jYWxzLmxlbmd0aCA9PT0gMSA/IF90cnlBZGREaXNwbGF5TmFtZShfLCBoZWFkKGxvY2FscykubmFtZSkgOiBfXG5cdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwga2luZClcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgYXNzaWduZWQubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiBlVmFsdWVcblx0XHR9XG5cblx0XHRpZiAoaXNZaWVsZClcblx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0Y3guY2hlY2soIV8uaXNMYXp5LCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdGlmIChraW5kID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblx0XHRsZXQgYXNzXG5cdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgZVZhbHVlKVxuXHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0YXNzID0gaXNUZXN0ID8gRGVidWcobG9jLCBbIGFzc2lnbiBdKSA6IGFzc2lnblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmlzTGF6eSwgXy5sb2MsXG5cdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0YXNzID0gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIGVWYWx1ZSwgaXNMYXp5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNPYmpBc3NpZ24gPyBXaXRoT2JqS2V5cyhsb2NhbHMsIGFzcykgOiBhc3Ncblx0fSxcblxuXHRfdmFsdWVGcm9tQXNzaWduID0gKHZhbHVlUHJlLCBrQXNzaWduKSA9PiB7XG5cdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdC8vIC4gSXQncyBhIGJsb2NrXG5cdC8vIC4gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXMgdGhlIGVuZCBtZW1iZXIgb2YgYSBjYWxsLlxuXHRfdHJ5QWRkRGlzcGxheU5hbWUgPSAoXywgZGlzcGxheU5hbWUpID0+IHtcblx0XHRpZiAoXyBpbnN0YW5jZW9mIENhbGwgJiYgXy5hcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdF8uYXJnc1tfLmFyZ3MubGVuZ3RoIC0gMV0gPSBfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChfLmFyZ3MpLCBkaXNwbGF5TmFtZSlcblx0XHRcdHJldHVybiBfXG5cdFx0fSBlbHNlIGlmIChfIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0Ly8gVE9ETzogXy5uYW1lID0gZGlzcGxheU5hbWVcblx0XHRcdHJldHVybiBCbG9ja1dyYXAoXy5sb2MsIEJsb2NrT2JqKF8ubG9jLCBbIF0sIFsgXSwgXywgZGlzcGxheU5hbWUpKVxuXHRcdGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dpdGhSZXR1cm4pIHtcblx0XHRcdF8ucmV0dXJuZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoXy5yZXR1cm5lZCwgZGlzcGxheU5hbWUpXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH0gZWxzZSBpZiAoXyBpbnN0YW5jZW9mIEJsb2NrT2JqKSB7XG5cdFx0XHRpZiAoIShfLmtleXMuc29tZShfID0+IF8ubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJykpKVxuXHRcdFx0XHRfLm9wRGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZVxuXHRcdFx0cmV0dXJuIF9cblx0XHR9IGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBCbG9ja1dyYXApIHtcblx0XHRcdF8uYmxvY2sgPSBfdHJ5QWRkRGlzcGxheU5hbWUoXy5ibG9jaywgZGlzcGxheU5hbWUpXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIF9cblx0fSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlciksIC0xKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0bGV0IG5hbWVcblx0XHRsZXQgb3BUeXBlID0gbnVsbFxuXHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0KVxuXHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdGlmIChLZXl3b3JkLmlzTGF6eSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc1R5cGUoY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5KVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0ID0+XG5cdHQgaW5zdGFuY2VvZiBOYW1lID9cblx0X2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSA6XG5cdHQgaW5zdGFuY2VvZiBHcm91cCA/ICgoKSA9PiB7XG5cdFx0c3dpdGNoICh0LmtpbmQpIHtcblx0XHRcdGNhc2UgR19TcGFjZTogcmV0dXJuIHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gcGFyc2VFeHByKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBMaXN0U2ltcGxlKHQubG9jLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpXG5cdFx0XHRjYXNlIEdfQmxvY2s6IHJldHVybiBibG9ja1dyYXAoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdHJldHVybiBRdW90ZSh0LmxvYyxcblx0XHRcdFx0XHR0LnRva2Vucy5tYXAoXyA9PiAodHlwZW9mIF8gPT09ICdzdHJpbmcnKSA/IF8gOiBwYXJzZVNpbmdsZShfKSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0fVxuXHR9KSgpIDpcblx0dCBpbnN0YW5jZW9mIFRva2VuTnVtYmVyTGl0ZXJhbCA/XG5cdE51bWJlckxpdGVyYWwodC5sb2MsIHQudmFsdWUpIDpcblx0dCBpbnN0YW5jZW9mIENhbGxPbkZvY3VzID9cblx0Q2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSwgWyBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgXSkgOlxuXHR0IGluc3RhbmNlb2YgS2V5d29yZCA/XG5cdFx0dC5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgOlxuXHRcdFx0U3BlY2lhbCh0LmxvYywgb3BLV3RvU1AodC5raW5kKSB8fCB1bmV4cGVjdGVkKHQpKSA6XG5cdHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDMgP1xuXHRTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpIDpcblx0dW5leHBlY3RlZCh0KVxuXG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKEtleXdvcmQuaXNUeXBlKGgpKSB7XG5cdFx0Y29uc3QgZVR5cGUgPSBwYXJzZVNwYWNlZChyZXN0KVxuXHRcdGNvbnN0IGZvY3VzID0gTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpXG5cdFx0cmV0dXJuIENhbGwuY29udGFpbnMoaC5sb2MsIGVUeXBlLCBmb2N1cylcblx0fSBlbHNlIGlmIChLZXl3b3JkLmlzTGF6eShoKSlcblx0XHRyZXR1cm4gTGF6eShoLmxvYywgcGFyc2VTcGFjZWQocmVzdCkpXG5cdGVsc2Uge1xuXHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHQubG9jXG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgdG9rZW5zLmxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0cmV0dXJuIE1lbWJlcih0b2tlbnMubG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHR9IGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdHVuc2hpZnQoZSwgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKSlcblx0XHRcdFx0aWYgKHQua2luZCA9PT0gR19QYXJlbikge1xuXHRcdFx0XHRcdGNoZWNrRW1wdHkoU2xpY2UuZ3JvdXAodCksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGUsIFtdKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgY3guZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dH1gKVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdC5yZWR1Y2UobWVtYmVyT3JTdWJzY3JpcHQsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSBTbGljZS5ncm91cCh0b2tlbnMuaGVhZCgpKVxuXHRcdGlmIChLZXl3b3JkLmlzKGspKGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICgpID0+YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZShrKX0gb3RoZXIgdGhhbiBhIGJsb2NrYClcblx0XHRyZXR1cm4gbGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0Y29uc3QgdFJlcSA9IGxpbmUudG9rZW5zWzBdXG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblx0XHRcdGlmIChrID09PSBLV19Vc2VEbykge1xuXHRcdFx0XHRpZiAobGluZS50b2tlbnMubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUudG9rZW5zWzFdKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obGluZS5sb2MsIHBhdGgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBrID09PSBLV19Vc2VMYXp5IHx8IGsgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBTbGljZS5ncm91cChsaW5lKS50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBVc2UobGluZS5sb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlLm5vVHlwZSh0b2tlbnMubG9jLCBuYW1lLCBpc0xhenkpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbIF0sIG9wVXNlRGVmYXVsdDogdXNlRGVmYXVsdCgpIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IFsgb3BVc2VEZWZhdWx0LCByZXN0IF0gPVxuXHRcdFx0XHRLZXl3b3JkLmlzRm9jdXModG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRsLmlzTGF6eSA9IGlzTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzU3BhY2VkKHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7IHBhdGg6IHBhcnRzLmpvaW4oJy8nKSwgbmFtZTogdG9rZW5zLmxhc3QoKS5uYW1lIH1cblx0fSxcblxuXHRfcGFydHNGcm9tRG90TmFtZSA9IGRvdE5hbWUgPT5cblx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9