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

		var _blockDigest = blockDigest(rest3);

		const lines = _blockDigest.doLines;
		const opDefaultExport = _blockDigest.opReturn;
		const exports = _blockDigest.objKeys;

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
		}) : bv(_Expression.ObjReturn(tokens.loc, objKeys, opReturn, null));
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
				return { doLines: allLines, opReturn: _Expression.ListReturn(tokens.loc), objKeys: objKeys };
			case KReturn_Map:
				return { doLines: allLines, opReturn: _Expression.MapReturn(tokens.loc), objKeys: objKeys };
			default:
				// Don't deal with KReturn_Obj here, just return objKeys
				return !_UBag.isEmpty(allLines) && _UBag.last(allLines) instanceof _Expression.Val ? { doLines: _UBag.rtail(allLines), opReturn: _UBag.last(allLines), objKeys: objKeys } : { doLines: allLines, opReturn: null, objKeys: objKeys };
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
			opCased = null;
		} else opCased = _UOp.opIf(!before.isEmpty(), function () {
			return _Expression.Assign.focus(before.loc, parseExpr(before));
		});

		const lastLine = _Slice2.group(block.last());

		var _ref = _Token.Keyword.isElse(lastLine.head()) ? [block.rtail(), (isVal ? justBlockVal : justBlockDo)(lastLine.tail())] : [block, null];

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
				block: _Expression.BlockVal(tokens.loc, [], eCase)
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
		} else if (eValuePre instanceof _Expression.Fun) return _Expression.ObjReturn(eValuePre.loc, [], eValuePre, displayName);else if (eValuePre instanceof _Expression.ObjReturn && !eValuePre.keys.some(function (key) {
			return key.name === 'displayName';
		})) {
			eValuePre.opDisplayName = displayName;
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
				return t.kind === _Token.KW_Focus ? _Expression.LocalAccess.focus(t.loc) : _Expression.Special(t.loc, _Token.opKWtoSP(t.kind) || unexpected(t));
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
			return _Expression.LocalDeclare.noType(tokens.loc, name, isLazy);
		};
		if (tokens.isEmpty()) return { used: [], opUseDefault: useDefault() };else {
			var _ref4 = _Token.Keyword.isFocus(tokens.head()) ? [useDefault(), tokens.tail()] : [null, tokens];

			var _ref42 = _slicedToArray(_ref4, 2);

			const opUseDefault = _ref42[0];
			const rest = _ref42[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF3QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakIyQixZQUFZLENBaUJ6QixFQUFFLE1BQU0sY0FsQlIsRUFBRSxDQWtCVyxDQUFDLENBQUE7O0FBRXhCLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBQU8sV0FBVyxDQUFDLFFBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFDMUM7O0FBRUQsT0FDQyxVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2hELGFBQWEsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNqRCxVQUFVLEdBQUcsVUFBQSxDQUFDO1NBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxDQUFHO0VBQUEsQ0FBQTs7QUFFcEQsT0FBTSxXQUFXLEdBQUcsVUFBQSxNQUFNLEVBQUk7c0JBQ0gsWUFBWSxRQTFCc0MsUUFBUSxFQTBCbkMsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBM0JjLE1BQU0sRUEyQlgsS0FBSyxDQUFDOzs7O1FBQWhELFNBQVM7UUFB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QUNwRCxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3BDLFFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ2xCLENBQUMsQ0FBQTtBQUNGLFNBQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0VBQzFEO09BRUQsaUJBQWlCLEdBQUcsVUFBQSxPQUFPO1NBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLEdBQUcsTUFocEJXLE1BQU0sQ0FncEJWLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tEbywgQmxvY2tWYWwsIEJsb2NrV3JhcCwgQ2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsXG5cdENhc2VEbywgQ2FzZVZhbCwgRGVidWcsIERvLCBOdW1iZXJMaXRlcmFsLCBFbmRMb29wLCBGdW4sIEdsb2JhbEFjY2VzcywgTGF6eSwgTGlzdEVudHJ5LFxuXHRMaXN0UmV0dXJuLCBMaXN0U2ltcGxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmVSZXMsIExvb3AsIE1hcEVudHJ5LCBNYXBSZXR1cm4sXG5cdE1lbWJlciwgTW9kdWxlLCBPYmpQYWlyLCBPYmpSZXR1cm4sIE9ialNpbXBsZSwgUGF0dGVybiwgUXVvdGUsIFNwZWNpYWwsIFNwbGF0LCBWYWwsIFVzZSwgVXNlRG8sXG5cdFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL0xhbmcnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19QYXJlbiwgR19TcGFjZSwgR19RdW90ZSwgS2V5d29yZCxcblx0S1dfQ2FzZSwgS1dfQ2FzZURvLCBLV19EZWJ1ZywgS1dfRGVidWdnZXIsIEtXX0VuZExvb3AsIEtXX0ZvY3VzLCBLV19GdW4sIEtXX0dlbkZ1biwgS1dfSW4sXG5cdEtXX0xvb3AsIEtXX01hcEVudHJ5LCBLV19PYmpBc3NpZ24sIEtXX091dCwgS1dfUmVnaW9uLCBLV19Vc2UsIEtXX1VzZURlYnVnLCBLV19Vc2VEbyxcblx0S1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8sIE5hbWUsIG9wS1d0b1NQLCBUb2tlbk51bWJlckxpdGVyYWwgfSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGhlYWQsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgb3BJZiwgb3BNYXAgfSBmcm9tICcuLi9VL29wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IHsgZG9MaW5lczogbGluZXMsIG9wUmV0dXJuOiBvcERlZmF1bHRFeHBvcnQsIG9iaktleXM6IGV4cG9ydHMgfSA9IGJsb2NrRGlnZXN0KHJlc3QzKVxuXG5cdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkgJiYgIWV4cG9ydHMuc29tZShleCA9PiBleC5uYW1lID09PSAnZGlzcGxheU5hbWUnKSkge1xuXHRcdGNvbnN0IGRuID0gTG9jYWxEZWNsYXJlLmRpc3BsYXlOYW1lKHRva2Vucy5sb2MpXG5cdFx0bGluZXMucHVzaChBc3NpZ24odG9rZW5zLmxvYywgZG4sXG5cdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblx0XHRleHBvcnRzLnB1c2goZG4pXG5cdH1cblx0Y29uc3QgdXNlcyA9IHBsYWluVXNlcy5jb25jYXQobGF6eVVzZXMpXG5cdHJldHVybiBNb2R1bGUodG9rZW5zLmxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHRFeHBvcnQpXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIHBhcnNlQmxvY2tWYWwodG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCbG9ja0RvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJsb2NrVmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0cGFyc2VBbnlCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBkb0xpbmVzLCBvcFJldHVybiwgb2JqS2V5cyB9ID0gYmxvY2tEaWdlc3QodG9rZW5zKVxuXHRcdGNvbnN0IGJ2ID0gcmV0ID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldClcblx0XHRyZXR1cm4gaXNFbXB0eShvYmpLZXlzKSA/XG5cdFx0XHRpZkVsc2Uob3BSZXR1cm4sIGJ2LCAoKSA9PiBCbG9ja0RvKHRva2Vucy5sb2MsIGRvTGluZXMpKSA6XG5cdFx0XHRidihPYmpSZXR1cm4odG9rZW5zLmxvYywgb2JqS2V5cywgb3BSZXR1cm4sIG51bGwpKVxuXHR9LFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBHcm91cC5pc0Jsb2NrKGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCbG9ja0RvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjeC5jaGVjayhrUmV0dXJuID09PSBLUmV0dXJuX1BsYWluLCB0b2tlbnMubG9jLFxuXHRcdFx0KCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgYWxsTGluZXMpXG5cdH0sXG5cdHBhcnNlQmxvY2tWYWwgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGJsb2NrID0gcGFyc2VBbnlCbG9jayh0b2tlbnMpXG5cdFx0Y3guY2hlY2soIShibG9jayBpbnN0YW5jZW9mIEJsb2NrRG8pLCBibG9jay5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0YmxvY2tEaWdlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgYWxsTGluZXMsIGtSZXR1cm4sIG9iaktleXMgfSA9IF9wYXJzZUJsb2NrTGluZXModG9rZW5zKVxuXHRcdHN3aXRjaCAoa1JldHVybikge1xuXHRcdFx0Y2FzZSBLUmV0dXJuX0JhZzpcblx0XHRcdFx0cmV0dXJuIHsgZG9MaW5lczogYWxsTGluZXMsIG9wUmV0dXJuOiBMaXN0UmV0dXJuKHRva2Vucy5sb2MpLCBvYmpLZXlzIH1cblx0XHRcdGNhc2UgS1JldHVybl9NYXA6XG5cdFx0XHRcdHJldHVybiB7IGRvTGluZXM6IGFsbExpbmVzLCBvcFJldHVybjogTWFwUmV0dXJuKHRva2Vucy5sb2MpLCBvYmpLZXlzIH1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIERvbid0IGRlYWwgd2l0aCBLUmV0dXJuX09iaiBoZXJlLCBqdXN0IHJldHVybiBvYmpLZXlzXG5cdFx0XHRcdHJldHVybiAhaXNFbXB0eShhbGxMaW5lcykgJiYgbGFzdChhbGxMaW5lcykgaW5zdGFuY2VvZiBWYWwgP1xuXHRcdFx0XHRcdHsgZG9MaW5lczogcnRhaWwoYWxsTGluZXMpLCBvcFJldHVybjogbGFzdChhbGxMaW5lcyksIG9iaktleXMgfSA6XG5cdFx0XHRcdFx0eyBkb0xpbmVzOiBhbGxMaW5lcywgb3BSZXR1cm46IG51bGwsIG9iaktleXMgfVxuXHRcdH1cblx0fVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdEtSZXR1cm5fUGxhaW4gPSAwLFxuXHRLUmV0dXJuX09iaiA9IDEsXG5cdEtSZXR1cm5fQmFnID0gMixcblx0S1JldHVybl9NYXAgPSAzLFxuXHRfcGFyc2VCbG9ja0xpbmVzID0gbGluZXMgPT4ge1xuXHRcdGNvbnN0IG9iaktleXMgPSBbIF1cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IChsaW5lLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2goXyA9PiBjaGVja0xpbmUoXywgdHJ1ZSkpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzKVxuXHRcdFx0XHRvYmpLZXlzLnB1c2goLi4ubGluZS5rZXlzKVxuXHRcdH1cblx0XHRjb25zdCBhbGxMaW5lcyA9IFsgXVxuXHRcdGNvbnN0IGFkZExpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGxpbmUuZm9yRWFjaChhZGRMaW5lKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNoZWNrTGluZShsaW5lLCBmYWxzZSlcblx0XHRcdFx0YWxsTGluZXMucHVzaChsaW5lIGluc3RhbmNlb2YgV2l0aE9iaktleXMgPyBsaW5lLmxpbmUgOiBsaW5lKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRsaW5lcy5lYWNoKF8gPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAoXykpKSlcblxuXHRcdGNvbnN0IGlzT2JqID0gIWlzRW1wdHkob2JqS2V5cylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzQmFnKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzT2JqICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRjeC5jaGVjayghKGlzQmFnICYmIGlzTWFwKSwgbGluZXMubG9jLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdGNvbnN0IGtSZXR1cm4gPVxuXHRcdFx0aXNPYmogPyBLUmV0dXJuX09iaiA6IGlzQmFnID8gS1JldHVybl9CYWcgOiBpc01hcCA/IEtSZXR1cm5fTWFwIDogS1JldHVybl9QbGFpblxuXHRcdHJldHVybiB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gbnVsbFxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCAoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykobGFzdExpbmUudGFpbCgpKSBdIDpcblx0XHRbIGJsb2NrLCBudWxsIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCbG9ja1ZhbCA6IHBhcnNlQmxvY2tEbykoYmxvY2spXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIHJlc3VsdClcblx0fSlcblx0Y3guY2hlY2socGFydHMubGVuZ3RoID4gMCwgdG9rZW5zLmxvYywgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKSh0b2tlbnMubG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxufVxuLy8gcGFyc2VDYXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VDYXNlVGVzdCA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdC8vIEUuZy4sIGA6U29tZSB2YWxgXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0Y29uc3QgZnQgPSBTbGljZS5ncm91cChmaXJzdClcblx0XHRcdGlmIChLZXl3b3JkLmlzVHlwZShmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShLZXl3b3JkLmlzT2JqQXNzaWduKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gWyBdXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKVxuXHRcdFx0XHRcdGN4LmNoZWNrKG5hbWUgaW5zdGFuY2VvZiBOYW1lLCBuYW1lLmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbmFtZSwgbm90ICR7bmFtZX1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gTG9jKG5hbWUubG9jLnN0YXJ0LCB0b2tlbnNWYWx1ZS5sb2MuZW5kKVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goT2JqUGFpcihsb2MsIG5hbWUubmFtZSwgdmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIHBhaXJzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5raW5kKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmtpbmQgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cmV0dXJuIEdsb2JhbEFjY2Vzcy5udWxsKHRva2Vucy5sb2MpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdF8gPT4gTG9jYWxEZWNsYXJlUmVzKF8ubG9jLCBfKSxcblx0XHQoKSA9PiBvcE1hcChvcE91dCwgbyA9PiBMb2NhbERlY2xhcmVSZXMoby5sb2MsIG51bGwpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNUeXBlKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogbnVsbCwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGgua2luZCA9PT0gS1dfQ2FzZSB8fCBoLmtpbmQgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGgua2luZCwgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGgua2luZCA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IG51bGwsIG9wSW46IG51bGwsIG9wT3V0OiBudWxsLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBbIF0sIGVDYXNlKVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogbnVsbCwgb3BJbjogbnVsbCwgb3BPdXQ6IG51bGwsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrRG8odG9rZW5zLmxvYywgWyBlQ2FzZSBdKVxuXHRcdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRjb25zdCBbIG9wSW4sIHJlc3QwIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfSW4sIGJsb2NrKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dChLV19PdXQsIHJlc3QwKVxuXHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jazogcGFyc2VBbnlCbG9jayhyZXN0MSksIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy5ydGFpbCgpKSxcblx0XHRcdFx0XHRvcFJlc3RBcmc6IExvY2FsRGVjbGFyZS5wbGFpbihsLmxvYywgbC5uYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpLCBvcFJlc3RBcmc6IG51bGwgfVxuXHRcdH1cblx0fSxcblxuXHRfdHJ5VGFrZUluT3JPdXQgPSAoaW5Pck91dCwgdG9rZW5zKSA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBmaXJzdExpbmUgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoS2V5d29yZC5pcyhpbk9yT3V0KShoZWFkKGZpcnN0TGluZS50b2tlbnMpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhTbGljZS5ncm91cChmaXJzdExpbmUpKSlcblx0XHRcdFx0cmV0dXJuIFsgaW5PdXQsIHRva2Vucy50YWlsKCkgXVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gWyBudWxsLCB0b2tlbnMgXVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlTGluZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGgua2luZCkge1xuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRyZXR1cm4gTGlzdEVudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcih0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0VuZExvb3A6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19Mb29wOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKEtleXdvcmQuaXNMaW5lU3BsaXQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQua2luZCA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUsIGxvYykgPT4ge1xuXHRcdGxldCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMoYXNzaWduZWQpXG5cdFx0Y29uc3Qga2luZCA9IGFzc2lnbmVyLmtpbmRcblxuXHRcdGNvbnN0IGVWYWx1ZVByZSA9IHBhcnNlRXhwcih2YWx1ZSlcblx0XHRjb25zdCBlVmFsdWVOYW1lZCA9XG5cdFx0XHRsb2NhbHMubGVuZ3RoID09PSAxID8gX3RyeUFkZERpc3BsYXlOYW1lKGVWYWx1ZVByZSwgaGVhZChsb2NhbHMpLm5hbWUpIDogZVZhbHVlUHJlXG5cdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwga2luZClcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBraW5kID09PSBLV19ZaWVsZCB8fCBraW5kID09PSBLV19ZaWVsZFRvXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgYXNzaWduZWQubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiBlVmFsdWVcblx0XHR9XG5cblx0XHRpZiAoaXNZaWVsZClcblx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0Y3guY2hlY2soIV8uaXNMYXp5LCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdGlmIChraW5kID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0Y29uc3QgaXNPYmpBc3NpZ24gPSBraW5kID09PSBLV19PYmpBc3NpZ25cblx0XHRsZXQgYXNzXG5cdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IGFzc2lnbmVlID0gbG9jYWxzWzBdXG5cdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBhc3NpZ25lZSwgZVZhbHVlKVxuXHRcdFx0Y29uc3QgaXNUZXN0ID0gaXNPYmpBc3NpZ24gJiYgYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0YXNzID0gaXNUZXN0ID8gRGVidWcobG9jLCBbIGFzc2lnbiBdKSA6IGFzc2lnblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmlzTGF6eSwgXy5sb2MsXG5cdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0YXNzID0gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIGVWYWx1ZSwgaXNMYXp5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNPYmpBc3NpZ24gPyBXaXRoT2JqS2V5cyhsb2NhbHMsIGFzcykgOiBhc3Ncblx0fSxcblxuXHRfdmFsdWVGcm9tQXNzaWduID0gKHZhbHVlUHJlLCBrQXNzaWduKSA9PiB7XG5cdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdC8vIC4gSXQncyBhIGJsb2NrXG5cdC8vIC4gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXMgdGhlIGVuZCBtZW1iZXIgb2YgYSBjYWxsLlxuXHRfdHJ5QWRkRGlzcGxheU5hbWUgPSAoZVZhbHVlUHJlLCBkaXNwbGF5TmFtZSkgPT4ge1xuXHRcdGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBDYWxsICYmIGVWYWx1ZVByZS5hcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vIFRPRE86IEltbXV0YWJsZVxuXHRcdFx0ZVZhbHVlUHJlLmFyZ3NbZVZhbHVlUHJlLmFyZ3MubGVuZ3RoIC0gMV0gPVxuXHRcdFx0XHRfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChlVmFsdWVQcmUuYXJncyksIGRpc3BsYXlOYW1lKVxuXHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdH0gZWxzZSBpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0cmV0dXJuIE9ialJldHVybihlVmFsdWVQcmUubG9jLCBbXSwgZVZhbHVlUHJlLCBkaXNwbGF5TmFtZSlcblx0XHRlbHNlIGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBPYmpSZXR1cm4gJiZcblx0XHRcdCFlVmFsdWVQcmUua2V5cy5zb21lKGtleSA9PiBrZXkubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJykpIHtcblx0XHRcdGVWYWx1ZVByZS5vcERpc3BsYXlOYW1lID0gZGlzcGxheU5hbWVcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9IGVsc2UgaWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEJsb2NrV3JhcCkge1xuXHRcdFx0Y29uc3QgYmxvY2sgPSBlVmFsdWVQcmUuYmxvY2tcblx0XHRcdGJsb2NrLnJldHVybmVkID0gX3RyeUFkZERpc3BsYXlOYW1lKGJsb2NrLnJldHVybmVkLCBkaXNwbGF5TmFtZSlcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0fSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlciksIC0xKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0bGV0IG5hbWVcblx0XHRsZXQgb3BUeXBlID0gbnVsbFxuXHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0KVxuXHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdGlmIChLZXl3b3JkLmlzTGF6eSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc1R5cGUoY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5KVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0ID0+IHtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgTmFtZTpcblx0XHRcdHJldHVybiBfYWNjZXNzKHQubmFtZSwgdC5sb2MpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgR3JvdXA6XG5cdFx0XHRzd2l0Y2ggKHQua2luZCkge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiBwYXJzZVNwYWNlZChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gcGFyc2VFeHByKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIExpc3RTaW1wbGUodC5sb2MsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSlcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdFx0cmV0dXJuIFF1b3RlKHQubG9jLFxuXHRcdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdH1cblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWw6XG5cdFx0XHRyZXR1cm4gTnVtYmVyTGl0ZXJhbCh0LmxvYywgdC52YWx1ZSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1czpcblx0XHRcdHJldHVybiBDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSwgdC5sb2MpLCBbIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSBdKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEtleXdvcmQ6XG5cdFx0XHRyZXR1cm4gdC5raW5kID09PSBLV19Gb2N1cyA/XG5cdFx0XHRcdExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSA6XG5cdFx0XHRcdFNwZWNpYWwodC5sb2MsIG9wS1d0b1NQKHQua2luZCkgfHwgdW5leHBlY3RlZCh0KSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBEb3ROYW1lOlxuXHRcdFx0aWYgKHQubkRvdHMgPT09IDMpXG5cdFx0XHRcdHJldHVybiBTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRkZWZhdWx0OlxuXHRcdFx0dW5leHBlY3RlZCh0KVxuXHR9XG59XG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKEtleXdvcmQuaXNUeXBlKGgpKSB7XG5cdFx0Y29uc3QgZVR5cGUgPSBwYXJzZVNwYWNlZChyZXN0KVxuXHRcdGNvbnN0IGZvY3VzID0gTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpXG5cdFx0cmV0dXJuIENhbGwuY29udGFpbnMoaC5sb2MsIGVUeXBlLCBmb2N1cylcblx0fSBlbHNlIGlmIChLZXl3b3JkLmlzTGF6eShoKSlcblx0XHRyZXR1cm4gTGF6eShoLmxvYywgcGFyc2VTcGFjZWQocmVzdCkpXG5cdGVsc2Uge1xuXHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHQubG9jXG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgdG9rZW5zLmxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0cmV0dXJuIE1lbWJlcih0b2tlbnMubG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHR9IGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodC5raW5kID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdHVuc2hpZnQoZSwgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKSlcblx0XHRcdFx0aWYgKHQua2luZCA9PT0gR19QYXJlbikge1xuXHRcdFx0XHRcdGNoZWNrRW1wdHkoU2xpY2UuZ3JvdXAodCksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGUsIFtdKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgY3guZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dH1gKVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdC5yZWR1Y2UobWVtYmVyT3JTdWJzY3JpcHQsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSBTbGljZS5ncm91cCh0b2tlbnMuaGVhZCgpKVxuXHRcdGlmIChLZXl3b3JkLmlzKGspKGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICgpID0+YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZShrKX0gb3RoZXIgdGhhbiBhIGJsb2NrYClcblx0XHRyZXR1cm4gbGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0Y29uc3QgdFJlcSA9IGxpbmUudG9rZW5zWzBdXG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblx0XHRcdGlmIChrID09PSBLV19Vc2VEbykge1xuXHRcdFx0XHRpZiAobGluZS50b2tlbnMubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUudG9rZW5zWzFdKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obGluZS5sb2MsIHBhdGgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBrID09PSBLV19Vc2VMYXp5IHx8IGsgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBTbGljZS5ncm91cChsaW5lKS50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBVc2UobGluZS5sb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlLm5vVHlwZSh0b2tlbnMubG9jLCBuYW1lLCBpc0xhenkpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbIF0sIG9wVXNlRGVmYXVsdDogdXNlRGVmYXVsdCgpIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IFsgb3BVc2VEZWZhdWx0LCByZXN0IF0gPVxuXHRcdFx0XHRLZXl3b3JkLmlzRm9jdXModG9rZW5zLmhlYWQoKSkgP1xuXHRcdFx0XHRcdFsgdXNlRGVmYXVsdCgpLCB0b2tlbnMudGFpbCgpIF0gOlxuXHRcdFx0XHRcdFsgbnVsbCwgdG9rZW5zIF1cblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRsLmlzTGF6eSA9IGlzTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzU3BhY2VkKHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7IHBhdGg6IHBhcnRzLmpvaW4oJy8nKSwgbmFtZTogdG9rZW5zLmxhc3QoKS5uYW1lIH1cblx0fSxcblxuXHRfcGFydHNGcm9tRG90TmFtZSA9IGRvdE5hbWUgPT5cblx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9