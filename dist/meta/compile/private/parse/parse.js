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

	const WithObjKeys = _tupl('WithObjKeys', Object, 'Wraps an Do with keys for this block\'s Obj. Not meant to escape this file.', ['keys', [_Expression.LocalDeclare], 'line', _Expression.Do]);

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
		[[], [], _Expression.BlockWrap(rest3.loc, block)];

		var _ref2 = _slicedToArray(_ref, 3);

		const lines = _ref2[0];
		const exports = _ref2[1];
		const opDefaultExport = _ref2[2];

		if (cx.opts.moduleDisplayName() && !exports.some(function (ex) {
			return ex.name === 'displayName';
		})) {
			const dn = _Expression.LocalDeclare.displayName(tokens.loc);
			lines.push(_Expression.Assign(tokens.loc, dn, _Expression.Quote.forString(tokens.loc, cx.opts.moduleName())));
			exports.push(dn);
		}
		const uses = plainUses.concat(lazyUses);
		return _Expression.Module(tokens.loc, doUses, uses, debugUses, lines, exports, opDefaultExport);
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
		return _Expression.BlockWrap(tokens.loc, parseBlockVal(tokens));
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
		_UUtil.assert(tokens.size() === 2 && _Token.Group.isBlock(block));
		return _UBag.flatMap(block.tokens, function (line) {
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
		return _Expression.BlockDo(tokens.loc, allLines);
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
				return _Expression.BlockBag(tokens.loc, allLines);
			case KReturn_Map:
				return _Expression.BlockMap(tokens.loc, allLines);
			default:
				var _ref3 = !_UBag.isEmpty(allLines) && _UBag.last(allLines) instanceof _Expression.Val ? [_UBag.rtail(allLines), _UBag.last(allLines)] : [allLines, null],
				    _ref32 = _slicedToArray(_ref3, 2),
				    lines = _ref32[0],
				    opVal = _ref32[1];

				return kReturn === KReturn_Obj ? _Expression.BlockObj(tokens.loc, lines, objKeys, opVal, null) : _UOp.ifElse(opVal, function (_) {
					return _Expression.BlockWithReturn(tokens.loc, lines, _);
				}, function () {
					return _Expression.BlockDo(tokens.loc, lines);
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

		const isObj = !_UBag.isEmpty(objKeys);
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
		} else opCased = _UOp.opIf(!before.isEmpty(), function () {
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
				return _Expression.Pattern(first.loc, type, locals, _Expression.LocalAccess.focus(tokens.loc));
			}
		}
		return parseExpr(tokens);
	};

	const parseExpr = function (tokens) {
		return _UOp.ifElse(tokens.opSplitManyWhere(_Token.Keyword.isObjAssign), function (splits) {
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
				const loc = _Loc(name.loc.start, tokensValue.loc.end);
				pairs.push(_Expression.ObjPair(loc, name.name, value));
			}
			_UUtil.assert(_UBag.last(splits).at === undefined);
			const val = _Expression.ObjSimple(tokens.loc, pairs);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = parseExprParts(tokensCaller);
				return _Expression.Call(tokens.loc, _UBag.head(parts), _UBag.push(_UBag.tail(parts), val));
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
						return _UBag.push(out, parseFun(here.kind === _Token.KW_GenFun, rest()));
					case _Token.KW_Case:
						return _UBag.push(out, parseCase(_Token.KW_Case, false, rest()));
					case _Token.KW_Yield:
						return _UBag.push(out, _Expression.Yield(tokens.loc, parseExpr(rest())));
					case _Token.KW_YieldTo:
						return _UBag.push(out, _Expression.YieldTo(tokens.loc, parseExpr(rest())));
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
				return _UBag.head(parts);
			default:
				return _Expression.Call(tokens.loc, _UBag.head(parts), _UBag.tail(parts));
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
		const opResDeclare = _UOp.ifElse(opReturnType, function (_) {
			return _Expression.LocalDeclareRes(_.loc, _);
		}, function () {
			return _UOp.opMap(opOut, function (o) {
				return _Expression.LocalDeclareRes(o.loc, null);
			});
		});
		return _Expression.Fun(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isType(_UBag.head(h.tokens))) return {
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
				block: _Expression.BlockWithReturn(tokens.loc, [], eCase)
			} : {
				args: args, opRestArg: null, opIn: null, opOut: null,
				block: _Expression.BlockDo(tokens.loc, [eCase])
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
			if (_Token.Keyword.is(inOrOut)(_UBag.head(firstLine.tokens))) {
				const inOut = _Expression.Debug(firstLine.loc, parseLinesFromBlock(_Slice2.group(firstLine)));
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
				return _Expression.BagEntry(tokens.loc, parseExpr(rest), -1);
			case _Token.KW_CaseDo:
				return parseCase(_Token.KW_CaseDo, false, rest);
			case _Token.KW_Debug:
				return _Expression.Debug(tokens.lok, _Token.Group.isBlock(tokens.second()) ?
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
				return _Expression.EndLoop(tokens.loc);
			case _Token.KW_Loop:
				return _Expression.Loop(tokens.loc, justBlockDo(rest));
			case _Token.KW_Region:
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return _UOp.ifElse(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref5) {
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
		const eValueNamed = locals.length === 1 ? _tryAddDisplayName(_, _UBag.head(locals).name) : _;
		const eValue = _valueFromAssign(eValueNamed, kind);

		const isYield = kind === _Token.KW_Yield || kind === _Token.KW_YieldTo;
		if (_UBag.isEmpty(locals)) {
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
			const assign = _Expression.Assign(loc, assignee, eValue);
			const isTest = isObjAssign && assign.assignee.name.endsWith('test');
			ass = isTest ? _Expression.Debug(loc, [assign]) : assign;
		} else {
			const isLazy = locals.some(function (l) {
				return l.isLazy;
			});
			if (isLazy) locals.forEach(function (_) {
				return cx.check(_.isLazy, _.loc, 'If any part of destructuring assign is lazy, all must be.');
			});
			ass = _Expression.AssignDestructure(loc, locals, eValue, isLazy);
		}
		return isObjAssign ? WithObjKeys(locals, ass) : ass;
	},
	      _valueFromAssign = function (valuePre, kAssign) {
		switch (kAssign) {
			case _Token.KW_Yield:
				return _Expression.Yield(valuePre.loc, valuePre);
			case _Token.KW_YieldTo:
				return _Expression.YieldTo(valuePre.loc, valuePre);
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
			_.args[_.args.length - 1] = _tryAddDisplayName(_UBag.last(_.args), displayName);
			return _;
		} else if (_ instanceof _Expression.Fun)
			// TODO: _.name = displayName
			return _Expression.BlockWrap(_.loc, _Expression.BlockObj(_.loc, [], [], _, displayName));else if (_ instanceof _Expression.BlockWithReturn) {
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
			_Expression.MapEntry(loc, parseExpr(before), parseExpr(after), -1)
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
					return 'Expected ' + _CompileError.code(':');
				});
				const tokensType = rest2.tail();
				checkNonEmpty(tokensType, function () {
					return 'Expected something after ' + colon;
				});
				opType = parseSpaced(tokensType);
			}
		} else name = _parseLocalName(t);

		return _Expression.LocalDeclare(t.loc, name, opType, isLazy);
	};

	// parseLocalDeclare privates
	const _parseLocalName = function (t) {
		if (_Token.Keyword.isFocus(t)) return '_';else {
			cx.check(t instanceof _Token.Name, t.loc, function () {
				return 'Expected a local name, not ' + t;
			});
			// TODO: Allow this?
			cx.check(!_Lang.JsGlobals.has(t.name), t.loc, function () {
				return 'Can not shadow global ' + _CompileError.code(t.name);
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
					return _Expression.ListSimple(t.loc, parseExprParts(_Slice2.group(t)));
				case _Token.G_Block:
					return blockWrap(_Slice2.group(t));
				case _Token.G_Quote:
					return _Expression.Quote(t.loc, t.tokens.map(function (_) {
						return typeof _ === 'string' ? _ : parseSingle(_);
					}));
				default:
					unexpected(t);
			}
		})() : t instanceof _Token.TokenNumberLiteral ? _Expression.NumberLiteral(t.loc, t.value) : t instanceof _Token.CallOnFocus ? _Expression.Call(t.loc, _access(t.name, t.loc), [_Expression.LocalAccess.focus(t.loc)]) : t instanceof _Token.Keyword ? t.kind === _Token.KW_Focus ? _Expression.LocalAccess.focus(t.loc) : _Expression.Special(t.loc, _Token.opKWtoSP(t.kind) || unexpected(t)) : t instanceof _Token.DotName && t.nDots === 3 ? _Expression.Splat(t.loc, _Expression.LocalAccess(t.loc, t.name)) : unexpected(t);
	};

	// parseSingle privates
	const _access = function (name, loc) {
		return _Lang.JsGlobals.has(name) ? _Expression.GlobalAccess(loc, name) : _Expression.LocalAccess(loc, name);
	};

	const parseSpaced = function (tokens) {
		const h = tokens.head(),
		      rest = tokens.tail();
		if (_Token.Keyword.isType(h)) {
			const eType = parseSpaced(rest);
			const focus = _Expression.LocalAccess.focus(h.loc);
			return _Expression.Call.contains(h.loc, eType, focus);
		} else if (_Token.Keyword.isLazy(h)) return _Expression.Lazy(h.loc, parseSpaced(rest));else {
			const memberOrSubscript = function (e, t) {
				const loc = t.loc;
				if (t instanceof _Token.DotName) {
					cx.check(t.nDots === 1, tokens.loc, 'Too many dots!');
					return _Expression.Member(tokens.loc, e, t.name);
				} else if (t instanceof _Token.Group) {
					if (t.kind === _Token.G_Bracket) return _Expression.Call.sub(loc, _UBag.unshift(e, parseExprParts(_Slice2.group(t))));
					if (t.kind === _Token.G_Paren) {
						checkEmpty(_Slice2.group(t), function () {
							return 'Use ' + _CompileError.code('(a b)') + ', not ' + _CompileError.code('a(b)');
						});
						return _Expression.Call(tokens.loc, e, []);
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
			return 'Did not expect anything after ' + _CompileError.code(k) + ' other than a block';
		});
		return lines.map(function (line) {
			const tReq = line.tokens[0];

			var _parseRequire2 = _parseRequire(tReq);

			const path = _parseRequire2.path;
			const name = _parseRequire2.name;

			if (k === _Token.KW_UseDo) {
				if (line.tokens.length > 1) unexpected(line.tokens[1]);
				return _Expression.UseDo(line.loc, path);
			} else {
				const isLazy = k === _Token.KW_UseLazy || k === _Token.KW_UseDebug;

				var _parseThingsUsed2 = _parseThingsUsed(name, isLazy, _Slice2.group(line).tail());

				const used = _parseThingsUsed2.used;
				const opUseDefault = _parseThingsUsed2.opUseDefault;

				return _Expression.Use(line.loc, path, used, opUseDefault);
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
					return '' + _CompileError.code('_') + ' not allowed as import name.';
				});
				l.isLazy = isLazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	},
	      _parseRequire = function (t) {
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return { path: _UBag.push(_partsFromDotName(t), t.name).join('/'), name: t.name };else {
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
		return dotName.nDots === 1 ? ['.'] : _UBag.repeat('..', dotName.nDots - 1);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF3QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakJrRCxZQUFZLENBaUJoRCxFQUFFLE1BQU0sY0FsQmtDLEVBQUUsQ0FrQi9CLENBQUMsQ0FBQTs7QUFFeEIsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTtzQkFDSCxZQUFZLFFBMUJzQyxRQUFRLEVBMEJuQyxNQUFNLENBQUM7Ozs7UUFBaEQsTUFBTTtRQUFFLEtBQUs7O3VCQUNRLFlBQVksUUEzQmMsTUFBTSxFQTJCWCxLQUFLLENBQUM7Ozs7UUFBaEQsU0FBUztR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RyxFQUNwRCxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BDLFFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ2xCLENBQUMsQ0FBQTtBQUNGLFNBQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0VBQzFEO09BRUQsaUJBQWlCLEdBQUcsVUFBQSxPQUFPO1NBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLEdBQUcsTUFucEJXLE1BQU0sQ0FtcEJWLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tCYWcsIEJsb2NrRG8sIEJsb2NrTWFwLCBCbG9ja09iaiwgQmxvY2tXaXRoUmV0dXJuLFxuXHRCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LCBDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBEbywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCxcblx0RnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIEJhZ0VudHJ5LCBMaXN0U2ltcGxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmVSZXMsXG5cdExvb3AsIE1hcEVudHJ5LCBNZW1iZXIsIE1vZHVsZSwgT2JqUGFpciwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSwgU3BlY2lhbCwgU3BsYXQsIFZhbCwgVXNlLFxuXHRVc2VEbywgWWllbGQsIFlpZWxkVG8gfSBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgSnNHbG9iYWxzIH0gZnJvbSAnLi4vTGFuZydcbmltcG9ydCB7IENhbGxPbkZvY3VzLCBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LCBHX1BhcmVuLCBHX1NwYWNlLCBHX1F1b3RlLCBLZXl3b3JkLFxuXHRLV19DYXNlLCBLV19DYXNlRG8sIEtXX0RlYnVnLCBLV19EZWJ1Z2dlciwgS1dfRW5kTG9vcCwgS1dfRm9jdXMsIEtXX0Z1biwgS1dfR2VuRnVuLCBLV19Jbixcblx0S1dfTG9vcCwgS1dfTWFwRW50cnksIEtXX09iakFzc2lnbiwgS1dfT3V0LCBLV19SZWdpb24sIEtXX1VzZSwgS1dfVXNlRGVidWcsIEtXX1VzZURvLFxuXHRLV19Vc2VMYXp5LCBLV19ZaWVsZCwgS1dfWWllbGRUbywgTmFtZSwgb3BLV3RvU1AsIFRva2VuTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL1Rva2VuJ1xuaW1wb3J0IHsgaGVhZCwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgaWZFbHNlLCBvcElmLCBvcE1hcCB9IGZyb20gJy4uL1Uvb3AnXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi9VL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxubGV0IGN4XG5cbmNvbnN0IFdpdGhPYmpLZXlzID0gdHVwbCgnV2l0aE9iaktleXMnLCBPYmplY3QsXG5cdCdXcmFwcyBhbiBEbyB3aXRoIGtleXMgZm9yIHRoaXMgYmxvY2tcXCdzIE9iai4gTm90IG1lYW50IHRvIGVzY2FwZSB0aGlzIGZpbGUuJyxcblx0WyAna2V5cycsIFtMb2NhbERlY2xhcmVdLCAnbGluZScsIERvXSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoX2N4LCByb290VG9rZW4pIHtcblx0Y3ggPSBfY3hcblx0cmV0dXJuIHBhcnNlTW9kdWxlKFNsaWNlLmdyb3VwKHJvb3RUb2tlbikpXG59XG5cbmNvbnN0XG5cdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHRjaGVja05vbkVtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayghdG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdHVuZXhwZWN0ZWQgPSB0ID0+IGN4LmZhaWwodC5sb2MsIGBVbmV4cGVjdGVkICR7dH1gKVxuXG5jb25zdCBwYXJzZU1vZHVsZSA9IHRva2VucyA9PiB7XG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURvLCB0b2tlbnMpXG5cdGNvbnN0IFsgcGxhaW5Vc2VzLCByZXN0MSBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZSwgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlTGF6eSwgcmVzdDEpXG5cdGNvbnN0IFsgZGVidWdVc2VzLCByZXN0MyBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZURlYnVnLCByZXN0Milcblx0Y29uc3QgYmxvY2sgPSBwYXJzZUFueUJsb2NrKHJlc3QzKVxuXHRjb25zdCBbIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQgXSA9XG5cdFx0YmxvY2sgaW5zdGFuY2VvZiBCbG9ja1dpdGhSZXR1cm4gP1xuXHRcdFsgYmxvY2subGluZXMsIFsgXSwgYmxvY2sucmV0dXJuZWQgXSA6XG5cdFx0YmxvY2sgaW5zdGFuY2VvZiBCbG9ja09iaiA/XG5cdFx0WyBibG9jay5saW5lcywgYmxvY2sua2V5cywgYmxvY2sub3BPYmplZCBdIDpcblx0XHRibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8gP1xuXHRcdFsgYmxvY2subGluZXMsIFsgXSwgbnVsbCBdIDpcblx0XHQvLyBvdGhlciBCbG9ja1ZhbFxuXHRcdFsgWyBdLCBbIF0sIEJsb2NrV3JhcChyZXN0My5sb2MsIGJsb2NrKSBdXG5cblx0aWYgKGN4Lm9wdHMubW9kdWxlRGlzcGxheU5hbWUoKSAmJiAhZXhwb3J0cy5zb21lKGV4ID0+IGV4Lm5hbWUgPT09ICdkaXNwbGF5TmFtZScpKSB7XG5cdFx0Y29uc3QgZG4gPSBMb2NhbERlY2xhcmUuZGlzcGxheU5hbWUodG9rZW5zLmxvYylcblx0XHRsaW5lcy5wdXNoKEFzc2lnbih0b2tlbnMubG9jLCBkbixcblx0XHRcdFF1b3RlLmZvclN0cmluZyh0b2tlbnMubG9jLCBjeC5vcHRzLm1vZHVsZU5hbWUoKSkpKVxuXHRcdGV4cG9ydHMucHVzaChkbilcblx0fVxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgbGluZXMsIGV4cG9ydHMsIG9wRGVmYXVsdEV4cG9ydClcbn1cblxuLy8gcGFyc2VCbG9ja1xuY29uc3Rcblx0Ly8gVG9rZW5zIG9uIHRoZSBsaW5lIGJlZm9yZSBhIGJsb2NrLCBhbmQgdG9rZW5zIGZvciB0aGUgYmxvY2sgaXRzZWxmLlxuXHRiZWZvcmVBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdGN4LmNoZWNrKEdyb3VwLmlzQmxvY2soYmxvY2spLCBibG9jay5sb2MsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdHJldHVybiBbIHRva2Vucy5ydGFpbCgpLCBTbGljZS5ncm91cChibG9jaykgXVxuXHR9LFxuXG5cdGJsb2NrV3JhcCA9IHRva2VucyA9PiBCbG9ja1dyYXAodG9rZW5zLmxvYywgcGFyc2VCbG9ja1ZhbCh0b2tlbnMpKSxcblxuXHRqdXN0QmxvY2tEbyA9IHRva2VucyA9PiBwYXJzZUJsb2NrRG8oX2p1c3RCbG9jayh0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gdG9rZW5zID0+IHBhcnNlQmxvY2tWYWwoX2p1c3RCbG9jayh0b2tlbnMpKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQmxvY2tEbyA9IHRva2VucyA9PiB7XG5cdFx0Ly8gT0sgaWYgbGFzdCBsaW5lIGlzIGEgVmFsLCB3ZSdsbCBqdXN0IHRyZWF0IGl0IGFzIGEgRG8uXG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gS1JldHVybl9QbGFpbiwgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHR9LFxuXHRwYXJzZUJsb2NrVmFsID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBibG9jayA9IHBhcnNlQW55QmxvY2sodG9rZW5zKVxuXHRcdGN4LmNoZWNrKCEoYmxvY2sgaW5zdGFuY2VvZiBCbG9ja0RvKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYSB2YWx1ZSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdHBhcnNlQW55QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIEJsb2NrQmFnKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0Y2FzZSBLUmV0dXJuX01hcDpcblx0XHRcdFx0cmV0dXJuIEJsb2NrTWFwKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc3QgWyBsaW5lcywgb3BWYWwgXSA9XG5cdFx0XHRcdFx0KCFpc0VtcHR5KGFsbExpbmVzKSAmJiBsYXN0KGFsbExpbmVzKSBpbnN0YW5jZW9mIFZhbCkgP1xuXHRcdFx0XHRcdFx0WyBydGFpbChhbGxMaW5lcyksIGxhc3QoYWxsTGluZXMpIF0gOlxuXHRcdFx0XHRcdFx0WyBhbGxMaW5lcywgbnVsbCBdXG5cdFx0XHRcdHJldHVybiBrUmV0dXJuID09PSBLUmV0dXJuX09iaiA/XG5cdFx0XHRcdFx0QmxvY2tPYmoodG9rZW5zLmxvYywgbGluZXMsIG9iaktleXMsIG9wVmFsLCBudWxsKSA6XG5cdFx0XHRcdFx0aWZFbHNlKG9wVmFsLFxuXHRcdFx0XHRcdFx0XyA9PiBCbG9ja1dpdGhSZXR1cm4odG9rZW5zLmxvYywgbGluZXMsIF8pLFxuXHRcdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBsaW5lcykpXG5cdFx0fVxuXHR9XG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF9qdXN0QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0S1JldHVybl9QbGFpbiA9IDAsXG5cdEtSZXR1cm5fT2JqID0gMSxcblx0S1JldHVybl9CYWcgPSAyLFxuXHRLUmV0dXJuX01hcCA9IDMsXG5cdF9wYXJzZUJsb2NrTGluZXMgPSBsaW5lcyA9PiB7XG5cdFx0Y29uc3Qgb2JqS2V5cyA9IFsgXVxuXHRcdGxldCBpc0JhZyA9IGZhbHNlLCBpc01hcCA9IGZhbHNlXG5cdFx0Y29uc3QgY2hlY2tMaW5lID0gKGxpbmUsIGluRGVidWcpID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdGxpbmUubGluZXMuZm9yRWFjaChfID0+IGNoZWNrTGluZShfLCB0cnVlKSlcblx0XHRcdGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBCYWdFbnRyeSkge1xuXHRcdFx0XHRjeC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBsaXN0IGVudHJpZXMnKVxuXHRcdFx0XHRpc0JhZyA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIE1hcEVudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIG1hcCBlbnRyaWVzJylcblx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHR9IGVsc2UgaWYgKGxpbmUgaW5zdGFuY2VvZiBXaXRoT2JqS2V5cylcblx0XHRcdFx0b2JqS2V5cy5wdXNoKC4uLmxpbmUua2V5cylcblx0XHR9XG5cdFx0Y29uc3QgYWxsTGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRsaW5lLmZvckVhY2goYWRkTGluZSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGVja0xpbmUobGluZSwgZmFsc2UpXG5cdFx0XHRcdGFsbExpbmVzLnB1c2gobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzID8gbGluZS5saW5lIDogbGluZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0bGluZXMuZWFjaChfID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKF8pKSkpXG5cblx0XHRjb25zdCBpc09iaiA9ICFpc0VtcHR5KG9iaktleXMpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID1cblx0XHRcdGlzT2JqID8gS1JldHVybl9PYmogOiBpc0JhZyA/IEtSZXR1cm5fQmFnIDogaXNNYXAgPyBLUmV0dXJuX01hcCA6IEtSZXR1cm5fUGxhaW5cblx0XHRyZXR1cm4geyBhbGxMaW5lcywga1JldHVybiwgb2JqS2V5cyB9XG5cdH1cblxuY29uc3QgcGFyc2VDYXNlID0gKGssIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IGlzVmFsID0gayA9PT0gS1dfQ2FzZVxuXG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IG51bGxcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnbi5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IEtleXdvcmQuaXNFbHNlKGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgKGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKGxhc3RMaW5lLnRhaWwoKSkgXSA6XG5cdFx0WyBibG9jaywgbnVsbCBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdGxpbmUgPSBTbGljZS5ncm91cChsaW5lKVxuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQmxvY2tWYWwgOiBwYXJzZUJsb2NrRG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoS2V5d29yZC5pc1R5cGUoZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjeC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+IGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWV9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IHRva2Vucy5lbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0Y29uc3QgaGVyZSA9IHRva2Vucy5kYXRhW2ldXG5cdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHRzd2l0Y2ggKGhlcmUua2luZCkge1xuXHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VGdW4oaGVyZS5raW5kID09PSBLV19HZW5GdW4sIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19DYXNlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUNhc2UoS1dfQ2FzZSwgZmFsc2UsIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0cGFyc2VFeHByUGxhaW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zKVxuXHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHJldHVybiBHbG9iYWxBY2Nlc3MubnVsbCh0b2tlbnMubG9jKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhyZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRfID0+IExvY2FsRGVjbGFyZVJlcyhfLmxvYywgXyksXG5cdFx0KCkgPT4gb3BNYXAob3BPdXQsIG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBudWxsKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChoKSAmJiBLZXl3b3JkLmlzVHlwZShoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IG51bGwsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmtpbmQgPT09IEtXX0Nhc2UgfHwgaC5raW5kID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmtpbmQsIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmtpbmQgPT09IEtXX0Nhc2UgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tXaXRoUmV0dXJuKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBudWxsLCBvcEluOiBudWxsLCBvcE91dDogbnVsbCxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZyB9ID0gX3BhcnNlRnVuTG9jYWxzKGJlZm9yZSlcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2spXG5cdFx0XHRjb25zdCBbIG9wT3V0LCByZXN0MSBdID0gX3RyeVRha2VJbk9yT3V0KEtXX091dCwgcmVzdDApXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiBwYXJzZUFueUJsb2NrKHJlc3QxKSwgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogTG9jYWxEZWNsYXJlLnBsYWluKGwubG9jLCBsLm5hbWUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucyksIG9wUmVzdEFyZzogbnVsbCB9XG5cdFx0fVxuXHR9LFxuXG5cdF90cnlUYWtlSW5Pck91dCA9IChpbk9yT3V0LCB0b2tlbnMpID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChLZXl3b3JkLmlzKGluT3JPdXQpKGhlYWQoZmlyc3RMaW5lLnRva2VucykpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKFNsaWNlLmdyb3VwKGZpcnN0TGluZSkpKVxuXHRcdFx0XHRyZXR1cm4gWyBpbk91dCwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIG51bGwsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaC5raW5kKSB7XG5cdFx0XHRcdGNhc2UgS1dfT2JqQXNzaWduOlxuXHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdHJldHVybiBCYWdFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCksIC0xKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKEtXX0Nhc2VEbywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2ssXG5cdFx0XHRcdFx0XHRHcm91cC5pc0Jsb2NrKHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwuZGVidWdnZXIodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19FbmRMb29wOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBFbmRMb29wKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfTG9vcDpcblx0XHRcdFx0XHRyZXR1cm4gTG9vcCh0b2tlbnMubG9jLCBqdXN0QmxvY2tEbyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmtpbmQgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUFzc2lnbiA9IChhc3NpZ25lZCwgYXNzaWduZXIsIHZhbHVlLCBsb2MpID0+IHtcblx0XHRsZXQgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGFzc2lnbmVkKVxuXHRcdGNvbnN0IGtpbmQgPSBhc3NpZ25lci5raW5kXG5cblx0XHRjb25zdCBfID0gcGFyc2VFeHByKHZhbHVlKVxuXHRcdGNvbnN0IGVWYWx1ZU5hbWVkID1cblx0XHRcdGxvY2Fscy5sZW5ndGggPT09IDEgPyBfdHJ5QWRkRGlzcGxheU5hbWUoXywgaGVhZChsb2NhbHMpLm5hbWUpIDogX1xuXHRcdGNvbnN0IGVWYWx1ZSA9IF92YWx1ZUZyb21Bc3NpZ24oZVZhbHVlTmFtZWQsIGtpbmQpXG5cblx0XHRjb25zdCBpc1lpZWxkID0ga2luZCA9PT0gS1dfWWllbGQgfHwga2luZCA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGN4LmNoZWNrKGlzWWllbGQsIGFzc2lnbmVkLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gZVZhbHVlXG5cdFx0fVxuXG5cdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+XG5cdFx0XHRcdGN4LmNoZWNrKCFfLmlzTGF6eSwgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJykpXG5cblx0XHRpZiAoa2luZCA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0bG9jYWxzLmZvckVhY2gobCA9PiB7IGwub2tUb05vdFVzZSA9IHRydWUgfSlcblxuXHRcdGNvbnN0IGlzT2JqQXNzaWduID0ga2luZCA9PT0gS1dfT2JqQXNzaWduXG5cdFx0bGV0IGFzc1xuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBhc3NpZ25lZSA9IGxvY2Fsc1swXVxuXHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduKGxvYywgYXNzaWduZWUsIGVWYWx1ZSlcblx0XHRcdGNvbnN0IGlzVGVzdCA9IGlzT2JqQXNzaWduICYmIGFzc2lnbi5hc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdGFzcyA9IGlzVGVzdCA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNMYXp5ID0gbG9jYWxzLnNvbWUobCA9PiBsLmlzTGF6eSlcblx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soXy5pc0xhenksIF8ubG9jLFxuXHRcdFx0XHRcdCdJZiBhbnkgcGFydCBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbiBpcyBsYXp5LCBhbGwgbXVzdCBiZS4nKSlcblx0XHRcdGFzcyA9IEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBlVmFsdWUsIGlzTGF6eSlcblx0XHR9XG5cdFx0cmV0dXJuIGlzT2JqQXNzaWduID8gV2l0aE9iaktleXMobG9jYWxzLCBhc3MpIDogYXNzXG5cdH0sXG5cblx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdHN3aXRjaCAoa0Fzc2lnbikge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIGRpc3BsYXlOYW1lIGlmOlxuXHQvLyAuIEl0J3MgYSBibG9ja1xuXHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGF0IHRoZSBlbmQgb2YgYSBibG9ja1xuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGFzIHRoZSBlbmQgbWVtYmVyIG9mIGEgY2FsbC5cblx0X3RyeUFkZERpc3BsYXlOYW1lID0gKF8sIGRpc3BsYXlOYW1lKSA9PiB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBDYWxsICYmIF8uYXJncy5sZW5ndGggPiAwKSB7XG5cdFx0XHRfLmFyZ3NbXy5hcmdzLmxlbmd0aCAtIDFdID0gX3RyeUFkZERpc3BsYXlOYW1lKGxhc3QoXy5hcmdzKSwgZGlzcGxheU5hbWUpXG5cdFx0XHRyZXR1cm4gX1xuXHRcdH0gZWxzZSBpZiAoXyBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdC8vIFRPRE86IF8ubmFtZSA9IGRpc3BsYXlOYW1lXG5cdFx0XHRyZXR1cm4gQmxvY2tXcmFwKF8ubG9jLCBCbG9ja09iaihfLmxvYywgWyBdLCBbIF0sIF8sIGRpc3BsYXlOYW1lKSlcblx0XHRlbHNlIGlmIChfIGluc3RhbmNlb2YgQmxvY2tXaXRoUmV0dXJuKSB7XG5cdFx0XHRfLnJldHVybmVkID0gX3RyeUFkZERpc3BsYXlOYW1lKF8ucmV0dXJuZWQsIGRpc3BsYXlOYW1lKVxuXHRcdFx0cmV0dXJuIF9cblx0XHR9IGVsc2UgaWYgKF8gaW5zdGFuY2VvZiBCbG9ja09iaikge1xuXHRcdFx0aWYgKCEoXy5rZXlzLnNvbWUoXyA9PiBfLm5hbWUgPT09ICdkaXNwbGF5TmFtZScpKSlcblx0XHRcdFx0Xy5vcERpc3BsYXlOYW1lID0gZGlzcGxheU5hbWVcblx0XHRcdHJldHVybiBfXG5cdFx0fSBlbHNlIGlmIChfIGluc3RhbmNlb2YgQmxvY2tXcmFwKSB7XG5cdFx0XHRfLmJsb2NrID0gX3RyeUFkZERpc3BsYXlOYW1lKF8uYmxvY2ssIGRpc3BsYXlOYW1lKVxuXHRcdFx0cmV0dXJuIF9cblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBfXG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdC8vIFRPRE86IGluZGV4IEZpbGxlZCBpbiBieSA/Pz9cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpLCAtMSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHQgPT4ge1xuXHRcdGxldCBuYW1lXG5cdFx0bGV0IG9wVHlwZSA9IG51bGxcblx0XHRsZXQgaXNMYXp5ID0gZmFsc2VcblxuXHRcdGlmIChHcm91cC5pc1NwYWNlZCh0KSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodClcblx0XHRcdGxldCByZXN0ID0gdG9rZW5zXG5cdFx0XHRpZiAoS2V5d29yZC5pc0xhenkodG9rZW5zLmhlYWQoKSkpIHtcblx0XHRcdFx0aXNMYXp5ID0gdHJ1ZVxuXHRcdFx0XHRyZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdFx0fVxuXHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdGlmICghcmVzdDIuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGN4LmNoZWNrKEtleXdvcmQuaXNUeXBlKGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbn1gKVxuXHRcdFx0XHRvcFR5cGUgPSBwYXJzZVNwYWNlZCh0b2tlbnNUeXBlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHQpXG5cblx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHQubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKEtleXdvcmQuaXNGb2N1cyh0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dH1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PlxuXHR0IGluc3RhbmNlb2YgTmFtZSA/XG5cdF9hY2Nlc3ModC5uYW1lLCB0LmxvYykgOlxuXHR0IGluc3RhbmNlb2YgR3JvdXAgPyAoKCkgPT4ge1xuXHRcdHN3aXRjaCAodC5raW5kKSB7XG5cdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiBwYXJzZVNwYWNlZChTbGljZS5ncm91cCh0KSlcblx0XHRcdGNhc2UgR19QYXJlbjogcmV0dXJuIHBhcnNlRXhwcihTbGljZS5ncm91cCh0KSlcblx0XHRcdGNhc2UgR19CcmFja2V0OiByZXR1cm4gTGlzdFNpbXBsZSh0LmxvYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKVxuXHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdH1cblx0fSkoKSA6XG5cdHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWwgP1xuXHROdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKSA6XG5cdHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1cyA/XG5cdENhbGwodC5sb2MsIF9hY2Nlc3ModC5uYW1lLCB0LmxvYyksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pIDpcblx0dCBpbnN0YW5jZW9mIEtleXdvcmQgP1xuXHRcdHQua2luZCA9PT0gS1dfRm9jdXMgP1xuXHRcdFx0TG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIDpcblx0XHRcdFNwZWNpYWwodC5sb2MsIG9wS1d0b1NQKHQua2luZCkgfHwgdW5leHBlY3RlZCh0KSkgOlxuXHR0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAzID9cblx0U3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKSA6XG5cdHVuZXhwZWN0ZWQodClcblxuLy8gcGFyc2VTaW5nbGUgcHJpdmF0ZXNcbmNvbnN0IF9hY2Nlc3MgPSAobmFtZSwgbG9jKSA9PlxuXHRKc0dsb2JhbHMuaGFzKG5hbWUpID8gR2xvYmFsQWNjZXNzKGxvYywgbmFtZSkgOiBMb2NhbEFjY2Vzcyhsb2MsIG5hbWUpXG5cbmNvbnN0IHBhcnNlU3BhY2VkID0gdG9rZW5zID0+IHtcblx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKCksIHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdGlmIChLZXl3b3JkLmlzVHlwZShoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoS2V5d29yZC5pc0xhenkoaCkpXG5cdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRlbHNlIHtcblx0XHRjb25zdCBtZW1iZXJPclN1YnNjcmlwdCA9IChlLCB0KSA9PiB7XG5cdFx0XHRjb25zdCBsb2MgPSB0LmxvY1xuXHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKHQubkRvdHMgPT09IDEsIHRva2Vucy5sb2MsICdUb28gbWFueSBkb3RzIScpXG5cdFx0XHRcdHJldHVybiBNZW1iZXIodG9rZW5zLmxvYywgZSwgdC5uYW1lKVxuXHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0aWYgKHQua2luZCA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLnN1Yihsb2MsXG5cdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSkpXG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfUGFyZW4pIHtcblx0XHRcdFx0XHRjaGVja0VtcHR5KFNsaWNlLmdyb3VwKHQpLFxuXHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBlLCBbXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGN4LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3R9YClcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1lbWJlck9yU3Vic2NyaXB0LCBwYXJzZVNpbmdsZShoKSlcblx0fVxufVxuXG5jb25zdCB0cnlQYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdGNvbnN0IGxpbmUwID0gU2xpY2UuZ3JvdXAodG9rZW5zLmhlYWQoKSlcblx0XHRpZiAoS2V5d29yZC5pcyhrKShsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PmBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cdFx0XHRpZiAoayA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gS1dfVXNlTGF6eSB8fCBrID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgU2xpY2UuZ3JvdXAobGluZSkudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxpbmUubG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZS5ub1R5cGUodG9rZW5zLmxvYywgbmFtZSwgaXNMYXp5KVxuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgdXNlZDogWyBdLCBvcFVzZURlZmF1bHQ6IHVzZURlZmF1bHQoKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBbIG9wVXNlRGVmYXVsdCwgcmVzdCBdID1cblx0XHRcdFx0S2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpID9cblx0XHRcdFx0XHRbIHVzZURlZmF1bHQoKSwgdG9rZW5zLnRhaWwoKSBdIDpcblx0XHRcdFx0XHRbIG51bGwsIHRva2VucyBdXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y3guY2hlY2sobC5uYW1lICE9PSAnXycsIGwucG9zLFxuXHRcdFx0XHRcdCgpID0+IGAke2NvZGUoJ18nKX0gbm90IGFsbG93ZWQgYXMgaW1wb3J0IG5hbWUuYClcblx0XHRcdFx0bC5pc0xhenkgPSBpc0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhHcm91cC5pc1NwYWNlZCh0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDEsIHQubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4geyBwYXRoOiBwYXJ0cy5qb2luKCcvJyksIG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZSB9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==