if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'tupl/dist/tupl', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/Op', '../U/Op2', '../U/util', './Slice'], function (exports, module, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UOp2, _UUtil, _Slice) {
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
		_UUtil.assert(_Token.Group.isBlock(rootToken));
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

		var _blockDigest = blockDigest(rest3);

		const lines = _blockDigest.doLines;
		const opDefault = _blockDigest.opReturn;
		const exports = _blockDigest.objKeys;

		if (cx.opts.moduleDisplayName() && !exports.some(function (ex) {
			return ex.name === 'displayName';
		})) {
			const dn = _Expression.LocalDeclare.displayName(tokens.loc);
			lines.push(_Expression.Assign(tokens.loc, dn, _Expression.Quote.forString(tokens.loc, cx.opts.moduleName())));
			exports.push(dn);
		}
		const uses = plainUses.concat(lazyUses);
		return _Expression.Module(tokens.loc, doUses, uses, debugUses, lines, exports, opDefault);
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
	      parseAnyBlock = function (tokens) {
		var _blockDigest2 = blockDigest(tokens);

		const doLines = _blockDigest2.doLines;
		const opReturn = _blockDigest2.opReturn;
		const objKeys = _blockDigest2.objKeys;

		const bv = function (ret) {
			return _Expression.BlockVal(tokens.loc, doLines, ret);
		};
		return _UBag.isEmpty(objKeys) ? _UOp.ifElse(opReturn, bv, function () {
			return _Expression.BlockDo(tokens.loc, doLines);
		}) : bv(_Expression.ObjReturn(tokens.loc, objKeys, opReturn, _UOp.None));
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
	      blockDigest = function (tokens) {
		var _parseBlockLines3 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines3.allLines;
		const kReturn = _parseBlockLines3.kReturn;
		const objKeys = _parseBlockLines3.objKeys;

		switch (kReturn) {
			case KReturn_Bag:
				return { doLines: allLines, opReturn: _UOp.some(_Expression.ListReturn(tokens.loc)), objKeys: objKeys };
			case KReturn_Map:
				return { doLines: allLines, opReturn: _UOp.some(_Expression.MapReturn(tokens.loc)), objKeys: objKeys };
			default:
				// Don't deal with KReturn_Obj here, just return objKeys
				return !_UBag.isEmpty(allLines) && _UBag.last(allLines) instanceof _Expression.Val ? { doLines: _UBag.rtail(allLines), opReturn: _UOp.some(_UBag.last(allLines)), objKeys: objKeys } : { doLines: allLines, opReturn: _UOp.None, objKeys: objKeys };
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
			});else if (line instanceof _Expression.ListEntry) {
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
			opCased = _UOp.None;
		} else opCased = _UOp.opIf(!before.isEmpty(), function () {
			return _Expression.Assign.focus(before.loc, parseExpr(before));
		});

		const lastLine = _Slice2.group(block.last());

		var _ref = _Token.Keyword.isElse(lastLine.head()) ? [block.rtail(), _UOp.some((isVal ? justBlockVal : justBlockDo)(lastLine.tail()))] : [block, _UOp.None];

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
		const opResDeclare = _UOp.ifElse(opReturnType, function (rt) {
			return _UOp.some(_Expression.LocalDeclareRes(rt.loc, opReturnType));
		}, function () {
			return opOut.map(function (o) {
				return _Expression.LocalDeclareRes(o.loc, opReturnType);
			});
		});
		return _Expression.Fun(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isType(_UBag.head(h.tokens))) return {
				opReturnType: _UOp.some(parseSpaced(_Slice2.group(h).tail())),
				rest: tokens.tail()
			};
		}
		return { opReturnType: _UOp.None, rest: tokens };
	},
	      _funArgsAndBlock = function (tokens) {
		const h = tokens.head();
		// Might be `|case`
		if (h instanceof _Token.Keyword && (h.kind === _Token.KW_Case || h.kind === _Token.KW_CaseDo)) {
			const eCase = parseCase(h.kind, true, tokens.tail());
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.kind === _Token.KW_Case ? {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
				block: _Expression.BlockVal(tokens.loc, [], eCase)
			} : {
				args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
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
		if (tokens.isEmpty()) return { args: [], opRestArg: _UOp.None };else {
			const l = tokens.last();
			if (l instanceof _Token.DotName) {
				cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: _UOp.some(_Expression.LocalDeclare.plain(l.loc, l.name))
				};
			} else return { args: parseLocalDeclares(tokens), opRestArg: _UOp.None };
		}
	},
	      _tryTakeInOrOut = function (inOrOut, tokens) {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head();
			if (_Token.Keyword.is(inOrOut)(_UBag.head(firstLine.tokens))) {
				const inOut = _Expression.Debug(firstLine.loc, parseLinesFromBlock(_Slice2.group(firstLine)));
				return [_UOp.some(inOut), tokens.tail()];
			}
		}
		return [_UOp.None, tokens];
	};

	const parseLine = function (tokens) {
		const h = tokens.head();
		const rest = tokens.tail();

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (h instanceof _Token.Keyword) switch (h.kind) {
			case _Token.KW_ObjAssign:
				// Index is set by parseBlock.
				return _Expression.ListEntry(tokens.loc, parseExpr(rest), -1);
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

		return _UOp.ifElse(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref3) {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

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

		const eValuePre = parseExpr(value);
		const eValueNamed = locals.length === 1 ? _tryAddDisplayName(eValuePre, _UBag.head(locals).name) : eValuePre;
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
	_tryAddDisplayName = function (eValuePre, displayName) {
		if (eValuePre instanceof _Expression.Call && eValuePre.args.length > 0) {
			// TODO: Immutable
			eValuePre.args[eValuePre.args.length - 1] = _tryAddDisplayName(_UBag.last(eValuePre.args), displayName);
			return eValuePre;
		} else if (eValuePre instanceof _Expression.Fun) return _Expression.ObjReturn(eValuePre.loc, [], _UOp.some(eValuePre), _UOp.some(displayName));else if (eValuePre instanceof _Expression.ObjReturn && !eValuePre.keys.some(function (key) {
			return key.name === 'displayName';
		})) {
			eValuePre.opDisplayName = _UOp.some(displayName);
			return eValuePre;
		} else if (eValuePre instanceof _Expression.BlockWrap) {
			const block = eValuePre.block;
			block.returned = _tryAddDisplayName(block.returned, displayName);
			return eValuePre;
		} else return eValuePre;
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
		let opType = _UOp.None;
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
				opType = _UOp.some(parseSpaced(tokensType));
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
		switch (true) {
			case t instanceof _Token.Name:
				return _access(t.name, t.loc);
			case t instanceof _Token.Group:
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
			case t instanceof _Token.TokenNumberLiteral:
				return _Expression.NumberLiteral(t.loc, t.value);
			case t instanceof _Token.CallOnFocus:
				return _Expression.Call(t.loc, _access(t.name, t.loc), [_Expression.LocalAccess.focus(t.loc)]);
			case t instanceof _Token.Keyword:
				return t.kind === _Token.KW_Focus ? _Expression.LocalAccess.focus(t.loc) : _UOp2.ifElse2(_Token.opKWtoSP(t.kind), function (sp) {
					return _Expression.Special(t.loc, sp);
				}, function () {
					return unexpected(t);
				});
			case t instanceof _Token.DotName:
				if (t.nDots === 3) return _Expression.Splat(t.loc, _Expression.LocalAccess(t.loc, t.name));else unexpected(t);
			default:
				unexpected(t);
		}
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
			return _Expression.LocalDeclare(tokens.loc, name, _UOp.None, isLazy, false);
		};
		if (tokens.isEmpty()) return { used: [], opUseDefault: _UOp.some(useDefault()) };else {
			const hasDefaultUse = _Token.Keyword.isFocus(tokens.head());
			const opUseDefault = _UOp.opIf(hasDefaultUse, useDefault);
			const rest = hasDefaultUse ? tokens.tail() : tokens;
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
		return {
			path: parts.join('/'),
			name: tokens.last().name
		};
	},
	      _partsFromDotName = function (dotName) {
		return dotName.nDots === 1 ? ['.'] : _UBag.repeat('..', dotName.nDots - 1);
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF5QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBbEIyQixZQUFZLENBa0J6QixFQUFFLE1BQU0sY0FuQlIsRUFBRSxDQW1CVyxDQUFDLENBQUE7O0FBRXhCLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBWFEsTUFBTSxDQVdQLE9BbEJ1QixLQUFLLENBa0J0QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUNoQyxTQUFPLFdBQVcsQ0FBQyxRQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzFDOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNoRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDakQsVUFBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUMsQ0FBRztFQUFBLENBQUE7O0FBRXBELE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJO3NCQUNILFlBQVksUUE1QnNDLFFBQVEsRUE0Qm5DLE1BQU0sQ0FBQzs7OztRQUFoRCxN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LEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEJsb2NrRG8sIEJsb2NrVmFsLCBCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LFxuXHRDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBEbywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExpc3RFbnRyeSxcblx0TGlzdFJldHVybiwgTGlzdFNpbXBsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlUmVzLCBMb29wLCBNYXBFbnRyeSwgTWFwUmV0dXJuLFxuXHRNZW1iZXIsIE1vZHVsZSwgT2JqUGFpciwgT2JqUmV0dXJuLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2UsIFVzZURvLFxuXHRZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsXG5cdEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0luLFxuXHRLV19Mb29wLCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvLCBOYW1lLCBvcEtXdG9TUCwgVG9rZW5OdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBoZWFkLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIE5vbmUsIG9wSWYsIHNvbWUgfSBmcm9tICcuLi9VL09wJ1xuaW1wb3J0IHsgaWZFbHNlMiB9IGZyb20gJy4uL1UvT3AyJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdGFzc2VydChHcm91cC5pc0Jsb2NrKHJvb3RUb2tlbikpXG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IHsgZG9MaW5lczogbGluZXMsIG9wUmV0dXJuOiBvcERlZmF1bHQsIG9iaktleXM6IGV4cG9ydHMgfSA9IGJsb2NrRGlnZXN0KHJlc3QzKVxuXG5cdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkgJiYgIWV4cG9ydHMuc29tZShleCA9PiBleC5uYW1lID09PSAnZGlzcGxheU5hbWUnKSkge1xuXHRcdGNvbnN0IGRuID0gTG9jYWxEZWNsYXJlLmRpc3BsYXlOYW1lKHRva2Vucy5sb2MpXG5cdFx0bGluZXMucHVzaChBc3NpZ24odG9rZW5zLmxvYywgZG4sXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2goZG4pXG5cdH1cblx0Y29uc3QgdXNlcyA9IHBsYWluVXNlcy5jb25jYXQobGF6eVVzZXMpXG5cdHJldHVybiBNb2R1bGUodG9rZW5zLmxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHQpXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCbG9ja0RvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJsb2NrVmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0cGFyc2VBbnlCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBkb0xpbmVzLCBvcFJldHVybiwgb2JqS2V5cyB9ID0gYmxvY2tEaWdlc3QodG9rZW5zKVxuXHRcdGNvbnN0IGJ2ID0gcmV0ID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldClcblx0XHRyZXR1cm4gaXNFbXB0eShvYmpLZXlzKSA/XG5cdFx0XHRpZkVsc2Uob3BSZXR1cm4sIGJ2LCAoKSA9PiBCbG9ja0RvKHRva2Vucy5sb2MsIGRvTGluZXMpKSA6XG5cdFx0XHRidihPYmpSZXR1cm4odG9rZW5zLmxvYywgb2JqS2V5cywgb3BSZXR1cm4sIE5vbmUpKVxuXHR9LFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBHcm91cC5pc0Jsb2NrKGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjeC5jaGVjayhrUmV0dXJuID09PSBLUmV0dXJuX1BsYWluLCB0b2tlbnMubG9jLFxuXHRcdFx0KCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdH0sXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VBbnlCbG9jayh0b2tlbnMpXG5cdFx0Y3guY2hlY2soIShibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8pLCBibG9jay5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0YmxvY2tEaWdlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIHsgZG9MaW5lczogYWxsTGluZXMsIG9wUmV0dXJuOiBzb21lKExpc3RSZXR1cm4odG9rZW5zLmxvYykpLCBvYmpLZXlzIH1cblx0XHRcdGNhc2UgS1JldHVybl9NYXA6XG5cdFx0XHRcdHJldHVybiB7IGRvTGluZXM6IGFsbExpbmVzLCBvcFJldHVybjogc29tZShNYXBSZXR1cm4odG9rZW5zLmxvYykpLCBvYmpLZXlzIH1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIERvbid0IGRlYWwgd2l0aCBLUmV0dXJuX09iaiBoZXJlLCBqdXN0IHJldHVybiBvYmpLZXlzXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eShhbGxMaW5lcykgJiYgbGFzdChhbGxMaW5lcykgaW5zdGFuY2VvZiBWYWwgP1xuXHRcdFx0XHRcdHsgZG9MaW5lczogcnRhaWwoYWxsTGluZXMpLCBvcFJldHVybjogc29tZShsYXN0KGFsbExpbmVzKSksIG9iaktleXMgfSA6XG5cdFx0XHRcdFx0eyBkb0xpbmVzOiBhbGxMaW5lcywgb3BSZXR1cm46IE5vbmUsIG9iaktleXMgfVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZXMgPT4ge1xuXHRcdGNvbnN0IG9iaktleXMgPSBbIF1cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IChsaW5lLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2goXyA9PiBjaGVja0xpbmUoXywgdHJ1ZSkpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzKVxuXHRcdFx0XHRvYmpLZXlzLnB1c2goLi4ubGluZS5rZXlzKVxuXHRcdH1cblx0XHRjb25zdCBhbGxMaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGxpbmUuZm9yRWFjaChhZGRMaW5lKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNoZWNrTGluZShsaW5lLCBmYWxzZSlcblx0XHRcdFx0YWxsTGluZXMucHVzaChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMgPyBsaW5lLmxpbmUgOiBsaW5lKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRsaW5lcy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblxuXHRcdGNvbnN0IGlzT2JqID0gIWlzRW1wdHkob2JqS2V5cylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gTm9uZVxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCBzb21lKChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpKSBdIDpcblx0XHRbIGJsb2NrLCBOb25lIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIHJlc3VsdClcblx0fSlcblx0Y3guY2hlY2socGFydHMubGVuZ3RoID4gMCwgdG9rZW5zLmxvYywgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKSh0b2tlbnMubG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxufVxuLy8gcGFyc2VDYXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChLZXl3b3JkLmlzVHlwZShmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShLZXl3b3JkLmlzT2JqQXNzaWduKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gWyBdXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKVxuXHRcdFx0XHRcdGN4LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbmFtZSwgbm90ICR7bmFtZX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmtpbmQgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cmV0dXJuIEdsb2JhbEFjY2Vzcy5udWxsKHRva2Vucy5sb2MpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdHJ0ID0+IHNvbWUoTG9jYWxEZWNsYXJlUmVzKHJ0LmxvYywgb3BSZXR1cm5UeXBlKSksXG5cdFx0KCkgPT4gb3BPdXQubWFwKG8gPT4gTG9jYWxEZWNsYXJlUmVzKG8ubG9jLCBvcFJldHVyblR5cGUpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNUeXBlKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHNvbWUocGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAoaCkudGFpbCgpKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogTm9uZSwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGgua2luZCA9PT0gS1dfQ2FzZSB8fCBoLmtpbmQgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGgua2luZCwgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBbIF0sIGVDYXNlKVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogTm9uZSwgb3BJbjogTm9uZSwgb3BPdXQ6IE5vbmUsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrRG8odG9rZW5zLmxvYywgWyBlQ2FzZSBdKVxuXHRcdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRjb25zdCBbIG9wSW4sIHJlc3QwIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfSW4sIGJsb2NrKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dChLV19PdXQsIHJlc3QwKVxuXHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jazogcGFyc2VBbnlCbG9jayhyZXN0MSksIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IE5vbmUgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy5ydGFpbCgpKSxcblx0XHRcdFx0XHRvcFJlc3RBcmc6IHNvbWUoTG9jYWxEZWNsYXJlLnBsYWluKGwubG9jLCBsLm5hbWUpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpLCBvcFJlc3RBcmc6IE5vbmUgfVxuXHRcdH1cblx0fSxcblxuXHRfdHJ5VGFrZUluT3JPdXQgPSAoaW5Pck91dCwgdG9rZW5zKSA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBmaXJzdExpbmUgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoS2V5d29yZC5pcyhpbk9yT3V0KShoZWFkKGZpcnN0TGluZS50b2tlbnMpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhTbGljZS5ncm91cChmaXJzdExpbmUpKSlcblx0XHRcdFx0cmV0dXJuIFsgc29tZShpbk91dCksIHRva2Vucy50YWlsKCkgXVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gWyBOb25lLCB0b2tlbnMgXVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlTGluZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGgua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRyZXR1cm4gTGlzdEVudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcih0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0VuZExvb3A6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19Mb29wOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKEtleXdvcmQuaXNMaW5lU3BsaXQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUsIGxvYykgPT4ge1xuXHRcdGxldCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMoYXNzaWduZWQpXG5cdFx0Y29uc3Qga2luZCA9IGFzc2lnbmVyLmtpbmRcblxuXHRcdGNvbnN0IGVWYWx1ZVByZSA9IHBhcnNlRXhwcih2YWx1ZSlcblx0XHRjb25zdCBlVmFsdWVOYW1lZCA9XG5cdFx0XHRsb2NhbHMubGVuZ3RoID09PSAxID8gX3RyeUFkZERpc3BsYXlOYW1lKGVWYWx1ZVByZSwgaGVhZChsb2NhbHMpLm5hbWUpIDogZVZhbHVlUHJlXG5cdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwga2luZClcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgYXNzaWduZWQubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiBlVmFsdWVcblx0XHR9XG5cblx0XHRpZiAoaXNZaWVsZClcblx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0Y3guY2hlY2soIV8uaXNMYXp5LCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdGlmIChraW5kID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblx0XHRsZXQgYXNzXG5cdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgZVZhbHVlKVxuXHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0YXNzID0gaXNUZXN0ID8gRGVidWcobG9jLCBbIGFzc2lnbiBdKSA6IGFzc2lnblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmlzTGF6eSwgXy5sb2MsXG5cdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0YXNzID0gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIGVWYWx1ZSwgaXNMYXp5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNPYmpBc3NpZ24gPyBXaXRoT2JqS2V5cyhsb2NhbHMsIGFzcykgOiBhc3Ncblx0fSxcblxuXHRfdmFsdWVGcm9tQXNzaWduID0gKHZhbHVlUHJlLCBrQXNzaWduKSA9PiB7XG5cdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdC8vIC4gSXQncyBhIGJsb2NrXG5cdC8vIC4gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXMgdGhlIGVuZCBtZW1iZXIgb2YgYSBjYWxsLlxuXHRfdHJ5QWRkRGlzcGxheU5hbWUgPSAoZVZhbHVlUHJlLCBkaXNwbGF5TmFtZSkgPT4ge1xuXHRcdGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBDYWxsICYmIGVWYWx1ZVByZS5hcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vIFRPRE86IEltbXV0YWJsZVxuXHRcdFx0ZVZhbHVlUHJlLmFyZ3NbZVZhbHVlUHJlLmFyZ3MubGVuZ3RoIC0gMV0gPVxuXHRcdFx0XHRfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChlVmFsdWVQcmUuYXJncyksIGRpc3BsYXlOYW1lKVxuXHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdH0gZWxzZSBpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0cmV0dXJuIE9ialJldHVybihlVmFsdWVQcmUubG9jLCBbXSwgc29tZShlVmFsdWVQcmUpLCBzb21lKGRpc3BsYXlOYW1lKSlcblx0XHRlbHNlIGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBPYmpSZXR1cm4gJiZcblx0XHRcdCFlVmFsdWVQcmUua2V5cy5zb21lKGtleSA9PiBrZXkubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJykpIHtcblx0XHRcdGVWYWx1ZVByZS5vcERpc3BsYXlOYW1lID0gc29tZShkaXNwbGF5TmFtZSlcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9IGVsc2UgaWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEJsb2NrV3JhcCkge1xuXHRcdFx0Y29uc3QgYmxvY2sgPSBlVmFsdWVQcmUuYmxvY2tcblx0XHRcdGJsb2NrLnJldHVybmVkID0gX3RyeUFkZERpc3BsYXlOYW1lKGJsb2NrLnJldHVybmVkLCBkaXNwbGF5TmFtZSlcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0fSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlciksIC0xKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0bGV0IG5hbWVcblx0XHRsZXQgb3BUeXBlID0gTm9uZVxuXHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0KVxuXHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdGlmIChLZXl3b3JkLmlzTGF6eSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc1R5cGUoY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHNvbWUocGFyc2VTcGFjZWQodG9rZW5zVHlwZSkpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5KVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0ID0+IHtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgTmFtZTpcblx0XHRcdHJldHVybiBfYWNjZXNzKHQubmFtZSwgdC5sb2MpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgR3JvdXA6XG5cdFx0XHRzd2l0Y2ggKHQua2luZCkge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiBwYXJzZVNwYWNlZChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gcGFyc2VFeHByKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIExpc3RTaW1wbGUodC5sb2MsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSlcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdFx0cmV0dXJuIFF1b3RlKHQubG9jLFxuXHRcdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdH1cblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWw6XG5cdFx0XHRyZXR1cm4gTnVtYmVyTGl0ZXJhbCh0LmxvYywgdC52YWx1ZSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1czpcblx0XHRcdHJldHVybiBDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSwgdC5sb2MpLCBbIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSBdKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEtleXdvcmQ6XG5cdFx0XHRyZXR1cm4gdC5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRcdExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSA6XG5cdFx0XHRcdGlmRWxzZTIob3BLV3RvU1AodC5raW5kKSwgc3AgPT4gU3BlY2lhbCh0LmxvYywgc3ApLCAoKSA9PiB1bmV4cGVjdGVkKHQpKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIERvdE5hbWU6XG5cdFx0XHRpZiAodC5uRG90cyA9PT0gMylcblx0XHRcdFx0cmV0dXJuIFNwbGF0KHQubG9jLCBMb2NhbEFjY2Vzcyh0LmxvYywgdC5uYW1lKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHR1bmV4cGVjdGVkKHQpXG5cdH1cbn1cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoS2V5d29yZC5pc1R5cGUoaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKEtleXdvcmQuaXNMYXp5KGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Y29uc3QgbWVtYmVyT3JTdWJzY3JpcHQgPSAoZSwgdCkgPT4ge1xuXHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmtpbmQgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjeC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKEtleXdvcmQuaXMoaykobGluZTAuaGVhZCgpKSlcblx0XHRcdHJldHVybiBbIF9wYXJzZVVzZXMoaywgbGluZTAudGFpbCgpKSwgdG9rZW5zLnRhaWwoKSBdXG5cdH1cblx0cmV0dXJuIFsgWyBdLCB0b2tlbnMgXVxufVxuXG4vLyB0cnlQYXJzZVVzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5gRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gbGluZS50b2tlbnNbMF1cblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQobGluZS50b2tlbnNbMV0pXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09IEtXX1VzZUxhenkgfHwgayA9PT0gS1dfVXNlRGVidWdcblx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0X3BhcnNlVGhpbmdzVXNlZChuYW1lLCBpc0xhenksIFNsaWNlLmdyb3VwKGxpbmUpLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUodG9rZW5zLmxvYywgbmFtZSwgTm9uZSwgaXNMYXp5LCBmYWxzZSlcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFtdLCBvcFVzZURlZmF1bHQ6IHNvbWUodXNlRGVmYXVsdCgpKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBoYXNEZWZhdWx0VXNlID0gS2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpXG5cdFx0XHRjb25zdCBvcFVzZURlZmF1bHQgPSBvcElmKGhhc0RlZmF1bHRVc2UsIHVzZURlZmF1bHQpXG5cdFx0XHRjb25zdCByZXN0ID0gaGFzRGVmYXVsdFVzZSA/IHRva2Vucy50YWlsKCkgOiB0b2tlbnNcblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRsLmlzTGF6eSA9IGlzTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzU3BhY2VkKHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7XG5cdFx0XHRwYXRoOiBwYXJ0cy5qb2luKCcvJyksXG5cdFx0XHRuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWVcblx0XHR9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==