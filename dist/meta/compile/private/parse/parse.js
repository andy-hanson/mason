if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'tupl/dist/tupl', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/Op', '../U/util', './Slice'], function (exports, module, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _Slice) {
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
		// tryParseUses moves tokens forward

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

		var _parseModuleBody = parseModuleBody(rest3);

		const lines = _parseModuleBody.lines;
		const exports = _parseModuleBody.exports;
		const opDefault = _parseModuleBody.opDefault;

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
		return _Expression.BlockWrap(tokens.loc, _parseBlockBody('val', tokens));
	},
	      justBlockDo = function (tokens) {
		return parseBodyDo(_justBlock(tokens));
	},
	      justBlockVal = function (tokens) {
		return parseBodyVal(_justBlock(tokens));
	},
	     

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = function (tokens) {
		return _parseBlockBody('module', tokens);
	},
	      parseBlockFromLines = function (tokens) {
		return _parseBlockBody('any', tokens);
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
	      parseBodyDo = function (tokens) {
		var _parseBlockLines2 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines2.allLines;
		const kReturn = _parseBlockLines2.kReturn;

		cx.check(kReturn === 'plain', tokens.loc, function () {
			return 'Can not make ' + kReturn + ' in statement context.';
		});
		return _Expression.BlockDo(tokens.loc, allLines);
	},
	      parseBodyVal = function (tokens) {
		return _parseBlockBody('val', tokens);
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
	      _parseBlockBody = function (k, tokens) {
		_UUtil.assert(k === 'val' || k === 'module' || k === 'any');

		// keys only matter if kReturn === 'obj'

		var _parseBlockLines3 = _parseBlockLines(tokens);

		const allLines = _parseBlockLines3.allLines;
		const kReturn = _parseBlockLines3.kReturn;
		const objKeys = _parseBlockLines3.objKeys;

		var _ref = (function () {
			if (kReturn === 'bag') return {
				doLines: allLines,
				opReturn: _UOp.some(_Expression.ListReturn(tokens.loc))
			};
			if (kReturn === 'map') return {
				doLines: allLines,
				opReturn: _UOp.some(_Expression.MapReturn(tokens.loc))
			};

			const lastReturn = !_UBag.isEmpty(allLines) && _UBag.last(allLines) instanceof _Expression.Val;
			if (kReturn === 'obj' && k !== 'module') return lastReturn ? {
				doLines: _UBag.rtail(allLines),
				opReturn: _UOp.some(_Expression.ObjReturn(tokens.loc, objKeys, _UOp.some(_UBag.last(allLines)),
				// displayName is filled in by parseAssign.

				// displayName is filled in by parseAssign.
				_UOp.None))
			} : {
				doLines: allLines,
				opReturn: _UOp.some(_Expression.ObjReturn(tokens.loc, objKeys, _UOp.None, _UOp.None))
			};else return lastReturn ? { doLines: _UBag.rtail(allLines), opReturn: _UOp.some(_UBag.last(allLines)) } : { doLines: allLines, opReturn: _UOp.None };
		})();

		const doLines = _ref.doLines;
		const opReturn = _ref.opReturn;

		switch (k) {
			case 'val':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(tokens.loc, doLines, returned);
				}, function () {
					return cx.fail(tokens.loc, 'Expected a value block.');
				});
			case 'any':
				return _UOp.ifElse(opReturn, function (returned) {
					return _Expression.BlockVal(tokens.loc, doLines, returned);
				}, function () {
					return _Expression.BlockDo(tokens.loc, doLines);
				});
			case 'module':
				return _UOp.ifElse(opReturn, function (returned) {
					return { lines: doLines, exports: objKeys, opDefault: _UOp.some(returned) };
				}, function () {
					return { lines: doLines, exports: objKeys, opDefault: _UOp.None };
				});
			default:
				throw new Error(k);
		}
	},
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
			} else if (line instanceof WithObjKeys) {
				objKeys.push.apply(objKeys, _toConsumableArray(line.keys));
				line = line.line;
			}
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

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
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

		var _ref2 = _Token.Keyword.isElse(lastLine.head()) ? [block.rtail(), _UOp.some((isVal ? justBlockVal : justBlockDo)(lastLine.tail()))] : [block, _UOp.None];

		var _ref22 = _slicedToArray(_ref2, 2);

		const partLines = _ref22[0];
		const opElse = _ref22[1];

		const parts = partLines.map(function (line) {
			line = _Slice2.group(line);

			var _beforeAndBlock4 = beforeAndBlock(line);

			var _beforeAndBlock42 = _slicedToArray(_beforeAndBlock4, 2);

			const before = _beforeAndBlock42[0];
			const block = _beforeAndBlock42[1];

			const test = _parseCaseTest(before);
			const result = (isVal ? parseBodyVal : parseBodyDo)(block);
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
				switch (here.k) {
					case _Token.KW_Fun:case _Token.KW_GenFun:
						return _UBag.push(out, parseFun(here.k === _Token.KW_GenFun, rest()));
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
		if (h instanceof _Token.Keyword && (h.k === _Token.KW_Case || h.k === _Token.KW_CaseDo)) {
			const eCase = parseCase(h.k, true, tokens.tail());
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.k === _Token.KW_Case ? {
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

			return { args: args, opRestArg: opRestArg, block: parseBlockFromLines(rest1), opIn: opIn, opOut: opOut };
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
		if (h instanceof _Token.Keyword) switch (h.k) {
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

			return at.k === _Token.KW_MapEntry ? _parseMapEntry(before, after, tokens.loc) : _parseAssign(before, at, after, tokens.loc);
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
		const k = assigner.k;

		const eValuePre = parseExpr(value);
		const eValueNamed = locals.length === 1 ? _tryAddDisplayName(eValuePre, _UBag.head(locals).name) : eValuePre;
		const eValue = _valueFromAssign(eValueNamed, k);

		const isYield = k === _Token.KW_Yield || k === _Token.KW_YieldTo;
		if (_UBag.isEmpty(locals)) {
			cx.check(isYield, assigned.loc, 'Assignment to nothing');
			return eValue;
		}

		if (isYield) locals.forEach(function (_) {
			return cx.check(!_.isLazy, _.loc, 'Can not yield to lazy variable.');
		});

		if (k === _Token.KW_ObjAssign) locals.forEach(function (l) {
			l.okToNotUse = true;
		});

		const isObjAssign = k === _Token.KW_ObjAssign;
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
				switch (t.k) {
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
				if (t.k === _Token.KW_Focus) return _Expression.LocalAccess.focus(t.loc);else {
					const sp = _Token.opKWtoSP(t.k);
					if (sp === undefined) unexpected(t);else return _Expression.Special(t.loc, sp);
				}
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
					if (t.k === _Token.G_Bracket) return _Expression.Call.sub(loc, _UBag.unshift(e, parseExprParts(_Slice2.group(t))));
					if (t.k === _Token.G_Paren) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkF3QndCLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0FBTjdCLEtBQUksRUFBRSxDQUFBOztBQUVOLE9BQU0sV0FBVyxHQUFHLE1BQUssYUFBYSxFQUFFLE1BQU0sRUFDN0MsNkVBQTZFLEVBQzdFLENBQUUsTUFBTSxFQUFFLGFBakIyQixZQUFZLENBaUJ6QixFQUFFLE1BQU0sY0FsQlIsRUFBRSxDQWtCVyxDQUFDLENBQUE7O0FBRXhCLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBWFEsTUFBTSxDQVdQLE9BakJ1QixLQUFLLENBaUJ0QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUNoQyxTQUFPLFdBQVcsQ0FBQyxRQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzFDOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNoRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDakQsVUFBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUMsQ0FBRztFQUFBLENBQUE7O0FBRXBELE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJOzs7c0JBRUgsWUFBWSxRQTVCc0MsUUFBUSxFQTRCbkMsTUFBTSxDQUFDOzs7O1FBQWhE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cml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEJsb2NrRG8sIEJsb2NrVmFsLCBCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LFxuXHRDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBEbywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExpc3RFbnRyeSxcblx0TGlzdFJldHVybiwgTGlzdFNpbXBsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlUmVzLCBMb29wLCBNYXBFbnRyeSwgTWFwUmV0dXJuLFxuXHRNZW1iZXIsIE1vZHVsZSwgT2JqUGFpciwgT2JqUmV0dXJuLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2UsIFVzZURvLFxuXHRZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsXG5cdEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0luLFxuXHRLV19Mb29wLCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvLCBOYW1lLCBvcEtXdG9TUCwgVG9rZW5OdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBoZWFkLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIE5vbmUsIG9wSWYsIHNvbWUgfSBmcm9tICcuLi9VL09wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5jb25zdCBXaXRoT2JqS2V5cyA9IHR1cGwoJ1dpdGhPYmpLZXlzJywgT2JqZWN0LFxuXHQnV3JhcHMgYW4gRG8gd2l0aCBrZXlzIGZvciB0aGlzIGJsb2NrXFwncyBPYmouIE5vdCBtZWFudCB0byBlc2NhcGUgdGhpcyBmaWxlLicsXG5cdFsgJ2tleXMnLCBbTG9jYWxEZWNsYXJlXSwgJ2xpbmUnLCBEb10pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdGFzc2VydChHcm91cC5pc0Jsb2NrKHJvb3RUb2tlbikpXG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHQvLyB0cnlQYXJzZVVzZXMgbW92ZXMgdG9rZW5zIGZvcndhcmRcblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCB7IGxpbmVzLCBleHBvcnRzLCBvcERlZmF1bHQgfSA9IHBhcnNlTW9kdWxlQm9keShyZXN0MylcblxuXHRpZiAoY3gub3B0cy5tb2R1bGVEaXNwbGF5TmFtZSgpICYmICFleHBvcnRzLnNvbWUoZXggPT4gZXgubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJykpIHtcblx0XHRjb25zdCBkbiA9IExvY2FsRGVjbGFyZS5kaXNwbGF5TmFtZSh0b2tlbnMubG9jKVxuXHRcdGxpbmVzLnB1c2goQXNzaWduKHRva2Vucy5sb2MsIGRuLFxuXHRcdFx0UXVvdGUuZm9yU3RyaW5nKHRva2Vucy5sb2MsIGN4Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cdFx0ZXhwb3J0cy5wdXNoKGRuKVxuXHR9XG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBsaW5lcywgZXhwb3J0cywgb3BEZWZhdWx0KVxufVxuXG4vLyBwYXJzZUJsb2NrXG5jb25zdFxuXHQvLyBUb2tlbnMgb24gdGhlIGxpbmUgYmVmb3JlIGEgYmxvY2ssIGFuZCB0b2tlbnMgZm9yIHRoZSBibG9jayBpdHNlbGYuXG5cdGJlZm9yZUFuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjaGVja05vbkVtcHR5KHRva2VucywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMubGFzdCgpXG5cdFx0Y3guY2hlY2soR3JvdXAuaXNCbG9jayhibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0cmV0dXJuIFsgdG9rZW5zLnJ0YWlsKCksIFNsaWNlLmdyb3VwKGJsb2NrKSBdXG5cdH0sXG5cblx0YmxvY2tXcmFwID0gdG9rZW5zID0+IEJsb2NrV3JhcCh0b2tlbnMubG9jLCBfcGFyc2VCbG9ja0JvZHkoJ3ZhbCcsIHRva2VucykpLFxuXG5cdGp1c3RCbG9ja0RvID0gdG9rZW5zID0+IHBhcnNlQm9keURvKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cdGp1c3RCbG9ja1ZhbCA9IHRva2VucyA9PiBwYXJzZUJvZHlWYWwoX2p1c3RCbG9jayh0b2tlbnMpKSxcblxuXHQvLyBUT0RPOiBKdXN0IGhhdmUgbW9kdWxlIHJldHVybiBhIHZhbHVlIGFuZCB1c2UgYSBub3JtYWwgYmxvY2suXG5cdHBhcnNlTW9kdWxlQm9keSA9IHRva2VucyA9PiBfcGFyc2VCbG9ja0JvZHkoJ21vZHVsZScsIHRva2VucyksXG5cblx0cGFyc2VCbG9ja0Zyb21MaW5lcyA9IHRva2VucyA9PiBfcGFyc2VCbG9ja0JvZHkoJ2FueScsIHRva2VucyksXG5cblx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0cGFyc2VMaW5lc0Zyb21CbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjeC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2h9YClcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIEdyb3VwLmlzQmxvY2soYmxvY2spKVxuXHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnRva2VucywgbGluZSA9PiBwYXJzZUxpbmVPckxpbmVzKFNsaWNlLmdyb3VwKGxpbmUpKSlcblx0fSxcblxuXHRwYXJzZUJvZHlEbyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgeyBhbGxMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gJ3BsYWluJywgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGFsbExpbmVzKVxuXHR9LFxuXHRwYXJzZUJvZHlWYWwgPSB0b2tlbnMgPT4gX3BhcnNlQmxvY2tCb2R5KCd2YWwnLCB0b2tlbnMpXG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF9qdXN0QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0X3BhcnNlQmxvY2tCb2R5ID0gKGssIHRva2VucykgPT4ge1xuXHRcdGFzc2VydChrID09PSAndmFsJyB8fCBrID09PSAnbW9kdWxlJyB8fCBrID09PSAnYW55JylcblxuXHRcdC8vIGtleXMgb25seSBtYXR0ZXIgaWYga1JldHVybiA9PT0gJ29iaidcblx0XHRjb25zdCB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2VucylcblxuXHRcdGNvbnN0IHsgZG9MaW5lcywgb3BSZXR1cm4gfSA9ICgoKSA9PiB7XG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ2JhZycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZG9MaW5lczogYWxsTGluZXMsXG5cdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoTGlzdFJldHVybih0b2tlbnMubG9jKSlcblx0XHRcdFx0fVxuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdtYXAnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRvTGluZXM6IGFsbExpbmVzLFxuXHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE1hcFJldHVybih0b2tlbnMubG9jKSlcblx0XHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsYXN0UmV0dXJuID0gIWlzRW1wdHkoYWxsTGluZXMpICYmIGxhc3QoYWxsTGluZXMpIGluc3RhbmNlb2YgVmFsXG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ29iaicgJiYgayAhPT0gJ21vZHVsZScpXG5cdFx0XHRcdHJldHVybiBsYXN0UmV0dXJuID9cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkb0xpbmVzOiBydGFpbChhbGxMaW5lcyksXG5cdFx0XHRcdFx0XHRvcFJldHVybjogc29tZShPYmpSZXR1cm4oXG5cdFx0XHRcdFx0XHRcdHRva2Vucy5sb2MsXG5cdFx0XHRcdFx0XHRcdG9iaktleXMsXG5cdFx0XHRcdFx0XHRcdHNvbWUobGFzdChhbGxMaW5lcykpLFxuXHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdH0gOiB7XG5cdFx0XHRcdFx0XHRkb0xpbmVzOiBhbGxMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0Tm9uZSxcblx0XHRcdFx0XHRcdFx0Ly8gZGlzcGxheU5hbWUgaXMgZmlsbGVkIGluIGJ5IHBhcnNlQXNzaWduLlxuXHRcdFx0XHRcdFx0XHROb25lKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBsYXN0UmV0dXJuID9cblx0XHRcdFx0eyBkb0xpbmVzOiBydGFpbChhbGxMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoYWxsTGluZXMpKSB9IDpcblx0XHRcdFx0eyBkb0xpbmVzOiBhbGxMaW5lcywgb3BSZXR1cm46IE5vbmUgfVxuXHRcdH0pKClcblxuXHRcdHN3aXRjaCAoaykge1xuXHRcdFx0Y2FzZSAndmFsJzpcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0KCkgPT4gY3guZmFpbCh0b2tlbnMubG9jLCAnRXhwZWN0ZWQgYSB2YWx1ZSBibG9jay4nKSlcblx0XHRcdGNhc2UgJ2FueSc6XG5cdFx0XHRcdHJldHVybiBpZkVsc2Uob3BSZXR1cm4sXG5cdFx0XHRcdFx0cmV0dXJuZWQgPT4gQmxvY2tWYWwodG9rZW5zLmxvYywgZG9MaW5lcywgcmV0dXJuZWQpLFxuXHRcdFx0XHRcdCgpID0+IEJsb2NrRG8odG9rZW5zLmxvYywgZG9MaW5lcykpXG5cdFx0XHRjYXNlICdtb2R1bGUnOlxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdHJldHVybmVkID0+ICh7IGxpbmVzOiBkb0xpbmVzLCBleHBvcnRzOiBvYmpLZXlzLCBvcERlZmF1bHQ6IHNvbWUocmV0dXJuZWQpIH0pLFxuXHRcdFx0XHRcdCgpID0+ICh7IGxpbmVzOiBkb0xpbmVzLCBleHBvcnRzOiBvYmpLZXlzLCBvcERlZmF1bHQ6IE5vbmUgfSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3Ioaylcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gW11cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGNoZWNrTGluZSA9IChsaW5lLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRsaW5lLmxpbmVzLmZvckVhY2goXyA9PiBjaGVja0xpbmUoXywgdHJ1ZSkpXG5cdFx0XHRlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFpbkRlYnVnLCBsaW5lLmxvYywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0Y3guY2hlY2soIWluRGVidWcsIGxpbmUubG9jLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRpc01hcCA9IHRydWVcblx0XHRcdH0gZWxzZSBpZiAobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzKSB7XG5cdFx0XHRcdG9iaktleXMucHVzaCguLi5saW5lLmtleXMpXG5cdFx0XHRcdGxpbmUgPSBsaW5lLmxpbmVcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgYWxsTGluZXMgPSBbIF1cblx0XHRjb25zdCBhZGRMaW5lID0gbGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRsaW5lLmZvckVhY2goYWRkTGluZSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGVja0xpbmUobGluZSwgZmFsc2UpXG5cdFx0XHRcdGFsbExpbmVzLnB1c2gobGluZSBpbnN0YW5jZW9mIFdpdGhPYmpLZXlzID8gbGluZS5saW5lIDogbGluZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0bGluZXMuZWFjaChfID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKF8pKSkpXG5cblx0XHRjb25zdCBpc09iaiA9ICFpc0VtcHR5KG9iaktleXMpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID0gaXNPYmogPyAnb2JqJyA6IGlzQmFnID8gJ2JhZycgOiBpc01hcCA/ICdtYXAnIDogJ3BsYWluJ1xuXHRcdHJldHVybiB7IGFsbExpbmVzLCBrUmV0dXJuLCBvYmpLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gTm9uZVxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCBzb21lKChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpKSBdIDpcblx0XHRbIGJsb2NrLCBOb25lIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCb2R5VmFsIDogcGFyc2VCb2R5RG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoS2V5d29yZC5pc1R5cGUoZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjeC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+IGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWV9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IHRva2Vucy5lbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0Y29uc3QgaGVyZSA9IHRva2Vucy5kYXRhW2ldXG5cdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHRzd2l0Y2ggKGhlcmUuaykge1xuXHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VGdW4oaGVyZS5rID09PSBLV19HZW5GdW4sIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19DYXNlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUNhc2UoS1dfQ2FzZSwgZmFsc2UsIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0cGFyc2VFeHByUGxhaW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zKVxuXHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHJldHVybiBHbG9iYWxBY2Nlc3MubnVsbCh0b2tlbnMubG9jKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhyZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRydCA9PiBzb21lKExvY2FsRGVjbGFyZVJlcyhydC5sb2MsIG9wUmV0dXJuVHlwZSkpLFxuXHRcdCgpID0+IG9wT3V0Lm1hcChvID0+IExvY2FsRGVjbGFyZVJlcyhvLmxvYywgb3BSZXR1cm5UeXBlKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChoKSAmJiBLZXl3b3JkLmlzVHlwZShoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBzb21lKHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IE5vbmUsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmsgPT09IEtXX0Nhc2UgfHwgaC5rID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmssIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmsgPT09IEtXX0Nhc2UgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRibG9jazogQmxvY2tWYWwodG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9jaylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2s6IHBhcnNlQmxvY2tGcm9tTGluZXMocmVzdDEpLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBzb21lKExvY2FsRGVjbGFyZS5wbGFpbihsLmxvYywgbC5uYW1lKSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkoaGVhZChmaXJzdExpbmUudG9rZW5zKSkpIHtcblx0XHRcdFx0Y29uc3QgaW5PdXQgPSBEZWJ1Zyhcblx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soU2xpY2UuZ3JvdXAoZmlyc3RMaW5lKSkpXG5cdFx0XHRcdHJldHVybiBbIHNvbWUoaW5PdXQpLCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgTm9uZSwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoLmspIHtcblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0Ly8gSW5kZXggaXMgc2V0IGJ5IHBhcnNlQmxvY2suXG5cdFx0XHRcdFx0cmV0dXJuIExpc3RFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCksIC0xKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKEtXX0Nhc2VEbywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2ssXG5cdFx0XHRcdFx0XHRHcm91cC5pc0Jsb2NrKHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwuZGVidWdnZXIodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19FbmRMb29wOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBFbmRMb29wKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfTG9vcDpcblx0XHRcdFx0XHRyZXR1cm4gTG9vcCh0b2tlbnMubG9jLCBqdXN0QmxvY2tEbyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmsgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUFzc2lnbiA9IChhc3NpZ25lZCwgYXNzaWduZXIsIHZhbHVlLCBsb2MpID0+IHtcblx0XHRsZXQgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGFzc2lnbmVkKVxuXHRcdGNvbnN0IGsgPSBhc3NpZ25lci5rXG5cblx0XHRjb25zdCBlVmFsdWVQcmUgPSBwYXJzZUV4cHIodmFsdWUpXG5cdFx0Y29uc3QgZVZhbHVlTmFtZWQgPVxuXHRcdFx0bG9jYWxzLmxlbmd0aCA9PT0gMSA/IF90cnlBZGREaXNwbGF5TmFtZShlVmFsdWVQcmUsIGhlYWQobG9jYWxzKS5uYW1lKSA6IGVWYWx1ZVByZVxuXHRcdGNvbnN0IGVWYWx1ZSA9IF92YWx1ZUZyb21Bc3NpZ24oZVZhbHVlTmFtZWQsIGspXG5cblx0XHRjb25zdCBpc1lpZWxkID0gayA9PT0gS1dfWWllbGQgfHwgayA9PT0gS1dfWWllbGRUb1xuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGN4LmNoZWNrKGlzWWllbGQsIGFzc2lnbmVkLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gZVZhbHVlXG5cdFx0fVxuXG5cdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+XG5cdFx0XHRcdGN4LmNoZWNrKCFfLmlzTGF6eSwgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJykpXG5cblx0XHRpZiAoayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0bG9jYWxzLmZvckVhY2gobCA9PiB7IGwub2tUb05vdFVzZSA9IHRydWUgfSlcblxuXHRcdGNvbnN0IGlzT2JqQXNzaWduID0gayA9PT0gS1dfT2JqQXNzaWduXG5cdFx0bGV0IGFzc1xuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBhc3NpZ25lZSA9IGxvY2Fsc1swXVxuXHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduKGxvYywgYXNzaWduZWUsIGVWYWx1ZSlcblx0XHRcdGNvbnN0IGlzVGVzdCA9IGlzT2JqQXNzaWduICYmIGFzc2lnbi5hc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdGFzcyA9IGlzVGVzdCA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNMYXp5ID0gbG9jYWxzLnNvbWUobCA9PiBsLmlzTGF6eSlcblx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soXy5pc0xhenksIF8ubG9jLFxuXHRcdFx0XHRcdCdJZiBhbnkgcGFydCBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbiBpcyBsYXp5LCBhbGwgbXVzdCBiZS4nKSlcblx0XHRcdGFzcyA9IEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBlVmFsdWUsIGlzTGF6eSlcblx0XHR9XG5cdFx0cmV0dXJuIGlzT2JqQXNzaWduID8gV2l0aE9iaktleXMobG9jYWxzLCBhc3MpIDogYXNzXG5cdH0sXG5cblx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdHN3aXRjaCAoa0Fzc2lnbikge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIGRpc3BsYXlOYW1lIGlmOlxuXHQvLyAuIEl0J3MgYSBibG9ja1xuXHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGF0IHRoZSBlbmQgb2YgYSBibG9ja1xuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGFzIHRoZSBlbmQgbWVtYmVyIG9mIGEgY2FsbC5cblx0X3RyeUFkZERpc3BsYXlOYW1lID0gKGVWYWx1ZVByZSwgZGlzcGxheU5hbWUpID0+IHtcblx0XHRpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgQ2FsbCAmJiBlVmFsdWVQcmUuYXJncy5sZW5ndGggPiAwKSB7XG5cdFx0XHQvLyBUT0RPOiBJbW11dGFibGVcblx0XHRcdGVWYWx1ZVByZS5hcmdzW2VWYWx1ZVByZS5hcmdzLmxlbmd0aCAtIDFdID1cblx0XHRcdFx0X3RyeUFkZERpc3BsYXlOYW1lKGxhc3QoZVZhbHVlUHJlLmFyZ3MpLCBkaXNwbGF5TmFtZSlcblx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9IGVsc2UgaWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdHJldHVybiBPYmpSZXR1cm4oZVZhbHVlUHJlLmxvYywgW10sIHNvbWUoZVZhbHVlUHJlKSwgc29tZShkaXNwbGF5TmFtZSkpXG5cdFx0ZWxzZSBpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgT2JqUmV0dXJuICYmXG5cdFx0XHQhZVZhbHVlUHJlLmtleXMuc29tZShrZXkgPT4ga2V5Lm5hbWUgPT09ICdkaXNwbGF5TmFtZScpKSB7XG5cdFx0XHRlVmFsdWVQcmUub3BEaXNwbGF5TmFtZSA9IHNvbWUoZGlzcGxheU5hbWUpXG5cdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0fSBlbHNlIGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBCbG9ja1dyYXApIHtcblx0XHRcdGNvbnN0IGJsb2NrID0gZVZhbHVlUHJlLmJsb2NrXG5cdFx0XHRibG9jay5yZXR1cm5lZCA9IF90cnlBZGREaXNwbGF5TmFtZShibG9jay5yZXR1cm5lZCwgZGlzcGxheU5hbWUpXG5cdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdC8vIFRPRE86IGluZGV4IEZpbGxlZCBpbiBieSA/Pz9cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpLCAtMSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHQgPT4ge1xuXHRcdGxldCBuYW1lXG5cdFx0bGV0IG9wVHlwZSA9IE5vbmVcblx0XHRsZXQgaXNMYXp5ID0gZmFsc2VcblxuXHRcdGlmIChHcm91cC5pc1NwYWNlZCh0KSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodClcblx0XHRcdGxldCByZXN0ID0gdG9rZW5zXG5cdFx0XHRpZiAoS2V5d29yZC5pc0xhenkodG9rZW5zLmhlYWQoKSkpIHtcblx0XHRcdFx0aXNMYXp5ID0gdHJ1ZVxuXHRcdFx0XHRyZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdFx0fVxuXHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdGlmICghcmVzdDIuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGN4LmNoZWNrKEtleXdvcmQuaXNUeXBlKGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbn1gKVxuXHRcdFx0XHRvcFR5cGUgPSBzb21lKHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHQpXG5cblx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHQubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKEtleXdvcmQuaXNGb2N1cyh0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dH1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PiB7XG5cdHN3aXRjaCAodHJ1ZSkge1xuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIE5hbWU6XG5cdFx0XHRyZXR1cm4gX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEdyb3VwOlxuXHRcdFx0c3dpdGNoICh0LmspIHtcblx0XHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRcdGNhc2UgR19QYXJlbjogcmV0dXJuIHBhcnNlRXhwcihTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBMaXN0U2ltcGxlKHQubG9jLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpXG5cdFx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIGJsb2NrV3JhcChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRcdHJldHVybiBRdW90ZSh0LmxvYyxcblx0XHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHR9XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgVG9rZW5OdW1iZXJMaXRlcmFsOlxuXHRcdFx0cmV0dXJuIE51bWJlckxpdGVyYWwodC5sb2MsIHQudmFsdWUpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXM6XG5cdFx0XHRyZXR1cm4gQ2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSwgWyBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgXSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0aWYgKHQuayA9PT0gS1dfRm9jdXMpXG5cdFx0XHRcdHJldHVybiBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYylcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBzcCA9IG9wS1d0b1NQKHQuaylcblx0XHRcdFx0aWYgKHNwID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwodC5sb2MsIHNwKVxuXHRcdFx0fVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIERvdE5hbWU6XG5cdFx0XHRpZiAodC5uRG90cyA9PT0gMylcblx0XHRcdFx0cmV0dXJuIFNwbGF0KHQubG9jLCBMb2NhbEFjY2Vzcyh0LmxvYywgdC5uYW1lKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHR1bmV4cGVjdGVkKHQpXG5cdH1cbn1cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoS2V5d29yZC5pc1R5cGUoaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKEtleXdvcmQuaXNMYXp5KGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Y29uc3QgbWVtYmVyT3JTdWJzY3JpcHQgPSAoZSwgdCkgPT4ge1xuXHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmsgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5rID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjeC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKEtleXdvcmQuaXMoaykobGluZTAuaGVhZCgpKSlcblx0XHRcdHJldHVybiBbIF9wYXJzZVVzZXMoaywgbGluZTAudGFpbCgpKSwgdG9rZW5zLnRhaWwoKSBdXG5cdH1cblx0cmV0dXJuIFsgWyBdLCB0b2tlbnMgXVxufVxuXG4vLyB0cnlQYXJzZVVzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5gRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gbGluZS50b2tlbnNbMF1cblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQobGluZS50b2tlbnNbMV0pXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09IEtXX1VzZUxhenkgfHwgayA9PT0gS1dfVXNlRGVidWdcblx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0X3BhcnNlVGhpbmdzVXNlZChuYW1lLCBpc0xhenksIFNsaWNlLmdyb3VwKGxpbmUpLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUodG9rZW5zLmxvYywgbmFtZSwgTm9uZSwgaXNMYXp5LCBmYWxzZSlcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFtdLCBvcFVzZURlZmF1bHQ6IHNvbWUodXNlRGVmYXVsdCgpKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBoYXNEZWZhdWx0VXNlID0gS2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpXG5cdFx0XHRjb25zdCBvcFVzZURlZmF1bHQgPSBvcElmKGhhc0RlZmF1bHRVc2UsIHVzZURlZmF1bHQpXG5cdFx0XHRjb25zdCByZXN0ID0gaGFzRGVmYXVsdFVzZSA/IHRva2Vucy50YWlsKCkgOiB0b2tlbnNcblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRsLmlzTGF6eSA9IGlzTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzU3BhY2VkKHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7XG5cdFx0XHRwYXRoOiBwYXJ0cy5qb2luKCcvJyksXG5cdFx0XHRuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWVcblx0XHR9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==