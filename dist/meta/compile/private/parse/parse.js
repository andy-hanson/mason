if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/Op', '../U/util', './Slice'], function (exports, module, _esastDistLoc, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _Slice) {
	'use strict';

	module.exports = parse;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	var _Loc = _interopRequire(_esastDistLoc);

	var _Slice2 = _interopRequire(_Slice);

	let cx;

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

		const block = parseModuleBody(rest3);
		block.lines.forEach(function (line) {
			if (line instanceof _Expression.Assign && line.k === 'export') cx.check(line.assignee.name !== 'displayName', line.assignee.loc, 'Module can not choose its own displayName.');
		});
		if (cx.opts.moduleDisplayName()) block.lines.push(_Expression.Assign(tokens.loc, _Expression.LocalDeclare(tokens.loc, 'displayName', [], false, true), 'export', _Expression.Quote.forString(tokens.loc, cx.opts.moduleName())));

		const uses = plainUses.concat(lazyUses);
		return _Expression.Module(tokens.loc, doUses, uses, debugUses, block);
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

		const eLines = _parseBlockLines2.eLines;
		const kReturn = _parseBlockLines2.kReturn;

		cx.check(kReturn === 'plain', tokens.loc, function () {
			return 'Can not make ' + kReturn + ' in statement context.';
		});
		return _Expression.BlockDo(tokens.loc, eLines);
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

		const eLines = _parseBlockLines3.eLines;
		const kReturn = _parseBlockLines3.kReturn;
		const objKeys = _parseBlockLines3.objKeys;
		const debugKeys = _parseBlockLines3.debugKeys;

		var _ref = (function () {
			if (kReturn === 'bag') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ListReturn(tokens.loc))
			};
			if (kReturn === 'map') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.MapReturn(tokens.loc))
			};

			const lastReturn = !_UBag.isEmpty(eLines) && _UBag.last(eLines) instanceof _Expression.Val;
			if (kReturn === 'obj' && k !== 'module') return lastReturn ? {
				doLines: _UBag.rtail(eLines),
				opReturn: _UOp.some(_Expression.ObjReturn(tokens.loc, objKeys, debugKeys, _UOp.some(_UBag.last(eLines)),
				// displayName is filled in by parseAssign.

				// displayName is filled in by parseAssign.
				_UOp.None))
			} : {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ObjReturn(tokens.loc, objKeys, debugKeys, _UOp.None, _UOp.None))
			};else return lastReturn ? { doLines: _UBag.rtail(eLines), opReturn: _UOp.some(_UBag.last(eLines)) } : { doLines: eLines, opReturn: _UOp.None };
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
				{
					// TODO: Handle debug-only exports
					const lines =
					// Turn Obj assigns into exports.
					_UBag.cat(doLines.map(function (line) {
						if (line instanceof _Expression.Assign && line.k === _Token.KW_ObjAssign) line.k = 'export';
						return line;
					}), opReturn.map(function (ret) {
						return _Expression.ModuleDefaultExport(ret.loc, ret);
					}));
					return _Expression.BlockDo(tokens.loc, lines);
				}
			default:
				throw new Error(k);
		}
	},
	      _parseBlockLines = function (lines) {
		const objKeys = [],
		      debugKeys = [];
		const eLines = [];
		let isBag = false,
		    isMap = false;
		const addLine = function (ln, inDebug) {
			if (ln instanceof Array) ln.forEach(function (_) {
				return addLine(_, inDebug);
			});else {
				if (ln instanceof _Expression.Debug) ln.lines.forEach(function (_) {
					return addLine(_, true);
				});else if (ln instanceof _Expression.ListEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug list entries');
					isBag = true;
				} else if (ln instanceof _Expression.MapEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug map entries');
					isMap = true;
				} else if (ln instanceof _Expression.Assign && ln.k === _Token.KW_ObjAssign) (inDebug ? debugKeys : objKeys).push(ln.assignee);

				if (!inDebug)
					// Else we are adding the Debug as a single line.
					eLines.push(ln);
			}
		};
		lines.each(function (line) {
			return addLine(parseLine(_Slice2.group(line)));
		});

		const isObj = !(_UBag.isEmpty(objKeys) && _UBag.isEmpty(debugKeys));
		// TODO
		// if (isEmpty(objKeys))
		//	cx.check(isEmpty(debugKeys), lines.loc, 'Block can't have only debug keys')
		cx.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		cx.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		cx.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
		return { eLines: eLines, kReturn: kReturn, objKeys: objKeys, debugKeys: debugKeys };
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
			return _UOp.some(_Expression.LocalDeclare.res(rt.loc, opReturnType));
		}, function () {
			return opOut.map(function (o) {
				return _Expression.LocalDeclare.res(o.loc, opReturnType);
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
					opRestArg: _UOp.some(_Expression.LocalDeclare(l.loc, l.name, _UOp.None, false, false))
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
		const eValuePre = value.isEmpty() ? _Expression.GlobalAccess.true(value.loc) : parseExpr(value);

		let eValueNamed;
		if (locals.length === 1) {
			const name = _UBag.head(locals).name;
			if (name === 'doc') {
				if (eValuePre instanceof _Expression.Fun)
					// KLUDGE: `doc` for module can be a Fun signature.
					// TODO: Something better...
					eValuePre.args.forEach(function (arg) {
						arg.okToNotUse = true;
					});
				eValueNamed = eValuePre;
			} else eValueNamed = _tryAddDisplayName(eValuePre, name);
		} else eValueNamed = eValuePre;

		const isYield = k === _Token.KW_Yield || k === _Token.KW_YieldTo;

		const eValue = _valueFromAssign(eValueNamed, k);

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

		if (locals.length === 1) {
			const assign = _Expression.Assign(loc, locals[0], k, eValue);
			const isTest = assign.assignee.name.endsWith('test');
			return isTest && k === _Token.KW_ObjAssign ? _Expression.Debug(loc, [assign]) : assign;
		} else {
			const isLazy = locals.some(function (l) {
				return l.isLazy;
			});
			if (isLazy) locals.forEach(function (_) {
				return cx.check(_.isLazy, _.loc, 'If any part of destructuring assign is lazy, all must be.');
			});
			return _Expression.AssignDestructure(loc, locals, k, eValue, isLazy);
		}
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
		switch (true) {
			case eValuePre instanceof _Expression.Call && eValuePre.args.length > 0:
				// TODO: Immutable
				eValuePre.args[eValuePre.args.length - 1] = _tryAddDisplayName(_UBag.last(eValuePre.args), displayName);
				return eValuePre;

			case eValuePre instanceof _Expression.Fun:
				return _Expression.ObjReturn(eValuePre.loc, [], [], _UOp.some(eValuePre), _UOp.some(displayName));

			case eValuePre instanceof _Expression.ObjReturn && !eValuePre.keys.some(function (key) {
				return key.name === 'displayName';
			}):
				eValuePre.opDisplayName = _UOp.some(displayName);
				return eValuePre;

			case eValuePre instanceof _Expression.BlockWrap:
				{
					const block = eValuePre.block;
					block.returned = _tryAddDisplayName(block.returned, displayName);
					return eValuePre;
				}

			default:
				return eValuePre;
		}
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

		return _Expression.LocalDeclare(t.loc, name, opType, isLazy, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFvQndCLEtBQUs7Ozs7Ozs7Ozs7QUFGN0IsS0FBSSxFQUFFLENBQUE7O0FBRVMsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FQUSxNQUFNLENBT1AsT0FkdUIsS0FBSyxDQWN0QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUNoQyxTQUFPLFdBQVcsQ0FBQyxRQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzFDOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNoRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDakQsVUFBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUMsQ0FBRztFQUFBLENBQUE7O0FBRXBELE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJOzs7c0JBRUgsWUFBWSxRQXhCc0MsUUFBUSxFQXdCbkMsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBekJjLE1BQU0sRUF5QlgsS0FBSyxDQUFDOzs7O1FBQWhELFNBQVM7UUFBRSxLQUFLOzt1QkFDSSxZQUFZLFFBekJ4QyxVQUFVLEVBeUIyQyxLQUFLLENBQUM7Ozs7UUFBbkQsUUFBUTtRQUFF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LElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFDcEQsa0NBQWtDLENBQUMsQ0FBQTtBQUNwQyxRQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNsQixDQUFDLENBQUE7QUFDRixTQUFPO0FBQ04sT0FBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3JCLE9BQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSTtHQUN4QixDQUFBO0VBQ0Q7T0FFRCxpQkFBaUIsR0FBRyxVQUFBLE9BQU87U0FDMUIsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsR0FBRyxNQS90QmdCLE1BQU0sQ0ErdEJmLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uLy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEJsb2NrRG8sIEJsb2NrVmFsLCBCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LFxuXHRDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBOdW1iZXJMaXRlcmFsLCBFbmRMb29wLCBGdW4sIEdsb2JhbEFjY2VzcywgTGF6eSwgTGlzdEVudHJ5LCBMaXN0UmV0dXJuLFxuXHRMaXN0U2ltcGxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmUsIExvb3AsIE1hcEVudHJ5LCBNYXBSZXR1cm4sIE1lbWJlciwgTW9kdWxlLFxuXHRNb2R1bGVEZWZhdWx0RXhwb3J0LCBPYmpQYWlyLCBPYmpSZXR1cm4sIE9ialNpbXBsZSwgUGF0dGVybiwgUXVvdGUsIFNwZWNpYWwsIFNwbGF0LCBWYWwsIFVzZSxcblx0VXNlRG8sIFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4uL0xhbmcnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCxcblx0R19QYXJlbiwgR19TcGFjZSwgR19RdW90ZSwgS2V5d29yZCwgVG9rZW5OdW1iZXJMaXRlcmFsLCBOYW1lLCBvcEtXdG9TUCxcblx0S1dfQ2FzZSwgS1dfQ2FzZURvLCBLV19EZWJ1ZywgS1dfRGVidWdnZXIsIEtXX0VuZExvb3AsIEtXX0ZvY3VzLCBLV19GdW4sIEtXX0dlbkZ1biwgS1dfSW4sXG5cdEtXX0xvb3AsIEtXX01hcEVudHJ5LCBLV19PYmpBc3NpZ24sIEtXX091dCwgS1dfUmVnaW9uLCBLV19Vc2UsIEtXX1VzZURlYnVnLCBLV19Vc2VEbyxcblx0S1dfVXNlTGF6eSwgS1dfWWllbGQsIEtXX1lpZWxkVG8gfSBmcm9tICcuLi9Ub2tlbidcbmltcG9ydCB7IGNhdCwgaGVhZCwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4uL1UvQmFnJ1xuaW1wb3J0IHsgaWZFbHNlLCBOb25lLCBvcElmLCBzb21lIH0gZnJvbSAnLi4vVS9PcCdcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL1UvdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1NsaWNlJ1xuXG5sZXQgY3hcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoX2N4LCByb290VG9rZW4pIHtcblx0Y3ggPSBfY3hcblx0YXNzZXJ0KEdyb3VwLmlzQmxvY2socm9vdFRva2VuKSlcblx0cmV0dXJuIHBhcnNlTW9kdWxlKFNsaWNlLmdyb3VwKHJvb3RUb2tlbikpXG59XG5cbmNvbnN0XG5cdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHRjaGVja05vbkVtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayghdG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdHVuZXhwZWN0ZWQgPSB0ID0+IGN4LmZhaWwodC5sb2MsIGBVbmV4cGVjdGVkICR7dH1gKVxuXG5jb25zdCBwYXJzZU1vZHVsZSA9IHRva2VucyA9PiB7XG5cdC8vIHRyeVBhcnNlVXNlcyBtb3ZlcyB0b2tlbnMgZm9yd2FyZFxuXHRjb25zdCBbIGRvVXNlcywgcmVzdDAgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEbywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2UsIHJlc3QwKVxuXHRjb25zdCBbIGxhenlVc2VzLCByZXN0MiBdID0gdHJ5UGFyc2VVc2VzKEtXX1VzZUxhenksIHJlc3QxKVxuXHRjb25zdCBbIGRlYnVnVXNlcywgcmVzdDMgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VEZWJ1ZywgcmVzdDIpXG5cdGNvbnN0IGJsb2NrID0gcGFyc2VNb2R1bGVCb2R5KHJlc3QzKVxuXHRibG9jay5saW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xuXHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gJ2V4cG9ydCcpXG5cdFx0XHRjeC5jaGVjayhsaW5lLmFzc2lnbmVlLm5hbWUgIT09ICdkaXNwbGF5TmFtZScsIGxpbmUuYXNzaWduZWUubG9jLFxuXHRcdFx0XHQnTW9kdWxlIGNhbiBub3QgY2hvb3NlIGl0cyBvd24gZGlzcGxheU5hbWUuJylcblx0fSlcblx0aWYgKGN4Lm9wdHMubW9kdWxlRGlzcGxheU5hbWUoKSlcblx0XHRibG9jay5saW5lcy5wdXNoKFxuXHRcdFx0QXNzaWduKFxuXHRcdFx0XHR0b2tlbnMubG9jLFxuXHRcdFx0XHRMb2NhbERlY2xhcmUodG9rZW5zLmxvYywgJ2Rpc3BsYXlOYW1lJywgW10sIGZhbHNlLCB0cnVlKSxcblx0XHRcdFx0J2V4cG9ydCcsXG5cdFx0XHRcdFF1b3RlLmZvclN0cmluZyh0b2tlbnMubG9jLCBjeC5vcHRzLm1vZHVsZU5hbWUoKSkpKVxuXG5cdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRyZXR1cm4gTW9kdWxlKHRva2Vucy5sb2MsIGRvVXNlcywgdXNlcywgZGVidWdVc2VzLCBibG9jaylcbn1cblxuLy8gcGFyc2VCbG9ja1xuY29uc3Rcblx0Ly8gVG9rZW5zIG9uIHRoZSBsaW5lIGJlZm9yZSBhIGJsb2NrLCBhbmQgdG9rZW5zIGZvciB0aGUgYmxvY2sgaXRzZWxmLlxuXHRiZWZvcmVBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnMsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdGN4LmNoZWNrKEdyb3VwLmlzQmxvY2soYmxvY2spLCBibG9jay5sb2MsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay4nKVxuXHRcdHJldHVybiBbIHRva2Vucy5ydGFpbCgpLCBTbGljZS5ncm91cChibG9jaykgXVxuXHR9LFxuXG5cdGJsb2NrV3JhcCA9IHRva2VucyA9PiBCbG9ja1dyYXAodG9rZW5zLmxvYywgX3BhcnNlQmxvY2tCb2R5KCd2YWwnLCB0b2tlbnMpKSxcblxuXHRqdXN0QmxvY2tEbyA9IHRva2VucyA9PiBwYXJzZUJvZHlEbyhfanVzdEJsb2NrKHRva2VucykpLFxuXHRqdXN0QmxvY2tWYWwgPSB0b2tlbnMgPT4gcGFyc2VCb2R5VmFsKF9qdXN0QmxvY2sodG9rZW5zKSksXG5cblx0Ly8gVE9ETzogSnVzdCBoYXZlIG1vZHVsZSByZXR1cm4gYSB2YWx1ZSBhbmQgdXNlIGEgbm9ybWFsIGJsb2NrLlxuXHRwYXJzZU1vZHVsZUJvZHkgPSB0b2tlbnMgPT4gX3BhcnNlQmxvY2tCb2R5KCdtb2R1bGUnLCB0b2tlbnMpLFxuXG5cdHBhcnNlQmxvY2tGcm9tTGluZXMgPSB0b2tlbnMgPT4gX3BhcnNlQmxvY2tCb2R5KCdhbnknLCB0b2tlbnMpLFxuXG5cdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdHBhcnNlTGluZXNGcm9tQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBHcm91cC5pc0Jsb2NrKGJsb2NrKSlcblx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gcGFyc2VMaW5lT3JMaW5lcyhTbGljZS5ncm91cChsaW5lKSkpXG5cdH0sXG5cblx0cGFyc2VCb2R5RG8gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHsgZUxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2Vucylcblx0XHRjeC5jaGVjayhrUmV0dXJuID09PSAncGxhaW4nLCB0b2tlbnMubG9jLFxuXHRcdFx0KCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgZUxpbmVzKVxuXHR9LFxuXHRwYXJzZUJvZHlWYWwgPSB0b2tlbnMgPT4gX3BhcnNlQmxvY2tCb2R5KCd2YWwnLCB0b2tlbnMpXG5cbi8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcbmNvbnN0XG5cdF9qdXN0QmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0cmV0dXJuIGJsb2NrXG5cdH0sXG5cblx0X3BhcnNlQmxvY2tCb2R5ID0gKGssIHRva2VucykgPT4ge1xuXHRcdGFzc2VydChrID09PSAndmFsJyB8fCBrID09PSAnbW9kdWxlJyB8fCBrID09PSAnYW55JylcblxuXHRcdC8vIGtleXMgb25seSBtYXR0ZXIgaWYga1JldHVybiA9PT0gJ29iaidcblx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiwgb2JqS2V5cywgZGVidWdLZXlzIH0gPSBfcGFyc2VCbG9ja0xpbmVzKHRva2VucylcblxuXHRcdGNvbnN0IHsgZG9MaW5lcywgb3BSZXR1cm4gfSA9ICgoKSA9PiB7XG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ2JhZycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKExpc3RSZXR1cm4odG9rZW5zLmxvYykpXG5cdFx0XHRcdH1cblx0XHRcdGlmIChrUmV0dXJuID09PSAnbWFwJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRkb0xpbmVzOiBlTGluZXMsXG5cdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoTWFwUmV0dXJuKHRva2Vucy5sb2MpKVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxhc3RSZXR1cm4gPSAhaXNFbXB0eShlTGluZXMpICYmIGxhc3QoZUxpbmVzKSBpbnN0YW5jZW9mIFZhbFxuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdvYmonICYmIGsgIT09ICdtb2R1bGUnKVxuXHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogcnRhaWwoZUxpbmVzKSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRzb21lKGxhc3QoZUxpbmVzKSksXG5cdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0fSA6IHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHROb25lLFxuXHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHR7IGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoZUxpbmVzKSkgfSA6XG5cdFx0XHRcdHsgZG9MaW5lczogZUxpbmVzLCBvcFJldHVybjogTm9uZSB9XG5cdFx0fSkoKVxuXG5cdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRjYXNlICd2YWwnOlxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHQoKSA9PiBjeC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpKVxuXHRcdFx0Y2FzZSAnYW55Jzpcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBkb0xpbmVzKSlcblx0XHRcdGNhc2UgJ21vZHVsZSc6IHtcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGRlYnVnLW9ubHkgZXhwb3J0c1xuXHRcdFx0XHRjb25zdCBsaW5lcyA9XG5cdFx0XHRcdFx0Ly8gVHVybiBPYmogYXNzaWducyBpbnRvIGV4cG9ydHMuXG5cdFx0XHRcdFx0Y2F0KFxuXHRcdFx0XHRcdFx0ZG9MaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0XHRcdFx0XHRcdGxpbmUuayA9ICdleHBvcnQnXG5cdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuLm1hcChyZXQgPT4gTW9kdWxlRGVmYXVsdEV4cG9ydChyZXQubG9jLCByZXQpKSlcblx0XHRcdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpXG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3Ioaylcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gW10sIGRlYnVnS2V5cyA9IFtdXG5cdFx0Y29uc3QgZUxpbmVzID0gW11cblx0XHRsZXQgaXNCYWcgPSBmYWxzZSwgaXNNYXAgPSBmYWxzZVxuXHRcdGNvbnN0IGFkZExpbmUgPSAobG4sIGluRGVidWcpID0+IHtcblx0XHRcdGlmIChsbiBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRsbi5mb3JFYWNoKF8gPT4gYWRkTGluZShfLCBpbkRlYnVnKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobG4gaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0XHRsbi5saW5lcy5mb3JFYWNoKF8gPT4gYWRkTGluZShfLCB0cnVlKSlcblx0XHRcdFx0ZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBMaXN0RW50cnkpIHtcblx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBsaXN0IGVudHJpZXMnKVxuXHRcdFx0XHRcdGlzQmFnID0gdHJ1ZVxuXHRcdFx0XHR9IGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdFx0aXNNYXAgPSB0cnVlXG5cdFx0XHRcdH0gZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBBc3NpZ24gJiYgbG4uayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0XHRcdChpbkRlYnVnID8gZGVidWdLZXlzIDogb2JqS2V5cykucHVzaChsbi5hc3NpZ25lZSlcblxuXHRcdFx0XHRpZiAoIWluRGVidWcpXG5cdFx0XHRcdFx0Ly8gRWxzZSB3ZSBhcmUgYWRkaW5nIHRoZSBEZWJ1ZyBhcyBhIHNpbmdsZSBsaW5lLlxuXHRcdFx0XHRcdGVMaW5lcy5wdXNoKGxuKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRsaW5lcy5lYWNoKGxpbmUgPT4gYWRkTGluZShwYXJzZUxpbmUoU2xpY2UuZ3JvdXAobGluZSkpKSlcblxuXHRcdGNvbnN0IGlzT2JqID0gIShpc0VtcHR5KG9iaktleXMpICYmIGlzRW1wdHkoZGVidWdLZXlzKSlcblx0XHQvLyBUT0RPXG5cdFx0Ly8gaWYgKGlzRW1wdHkob2JqS2V5cykpXG5cdFx0Ly9cdGN4LmNoZWNrKGlzRW1wdHkoZGVidWdLZXlzKSwgbGluZXMubG9jLCAnQmxvY2sgY2FuJ3QgaGF2ZSBvbmx5IGRlYnVnIGtleXMnKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9IGlzT2JqID8gJ29iaicgOiBpc0JhZyA/ICdiYWcnIDogaXNNYXAgPyAnbWFwJyA6ICdwbGFpbidcblx0XHRyZXR1cm4geyBlTGluZXMsIGtSZXR1cm4sIG9iaktleXMsIGRlYnVnS2V5cyB9XG5cdH1cblxuY29uc3QgcGFyc2VDYXNlID0gKGssIGNhc2VkRnJvbUZ1biwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IGlzVmFsID0gayA9PT0gS1dfQ2FzZVxuXG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IE5vbmVcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnbi5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IEtleXdvcmQuaXNFbHNlKGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgc29tZSgoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykobGFzdExpbmUudGFpbCgpKSkgXSA6XG5cdFx0WyBibG9jaywgTm9uZSBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdGxpbmUgPSBTbGljZS5ncm91cChsaW5lKVxuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQm9keVZhbCA6IHBhcnNlQm9keURvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjeC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAnTXVzdCBoYXZlIGF0IGxlYXN0IDEgbm9uLWBlbHNlYCB0ZXN0LicpXG5cblx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWwgOiBDYXNlRG8pKHRva2Vucy5sb2MsIG9wQ2FzZWQsIHBhcnRzLCBvcEVsc2UpXG59XG4vLyBwYXJzZUNhc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUNhc2VUZXN0ID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBQYXR0ZXJuIG1hdGNoIHN0YXJ0cyB3aXRoIHR5cGUgdGVzdCBhbmQgaXMgZm9sbG93ZWQgYnkgbG9jYWwgZGVjbGFyZXMuXG5cdFx0Ly8gRS5nLiwgYDpTb21lIHZhbGBcblx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKEtleXdvcmQuaXNUeXBlKGZ0LmhlYWQoKSkpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IHBhcnNlU3BhY2VkKGZ0LnRhaWwoKSlcblx0XHRcdFx0Y29uc3QgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBQYXR0ZXJuKGZpcnN0LmxvYywgdHlwZSwgbG9jYWxzLCBMb2NhbEFjY2Vzcy5mb2N1cyh0b2tlbnMubG9jKSlcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhcnNlRXhwcih0b2tlbnMpXG5cdH1cblxuY29uc3Rcblx0cGFyc2VFeHByID0gdG9rZW5zID0+IHtcblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0TWFueVdoZXJlKEtleXdvcmQuaXNPYmpBc3NpZ24pLFxuXHRcdFx0c3BsaXRzID0+IHtcblx0XHRcdFx0Ly8gU2hvcnQgb2JqZWN0IGZvcm0sIHN1Y2ggYXMgKGEuIDEsIGIuIDIpXG5cdFx0XHRcdGNvbnN0IGZpcnN0ID0gc3BsaXRzWzBdLmJlZm9yZVxuXHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbIF1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpXG5cdFx0XHRcdFx0Y3guY2hlY2sobmFtZSBpbnN0YW5jZW9mIE5hbWUsIG5hbWUubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBuYW1lLCBub3QgJHtuYW1lfWApXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHJQbGFpbih0b2tlbnNWYWx1ZSlcblx0XHRcdFx0XHRjb25zdCBsb2MgPSBMb2MobmFtZS5sb2Muc3RhcnQsIHRva2Vuc1ZhbHVlLmxvYy5lbmQpXG5cdFx0XHRcdFx0cGFpcnMucHVzaChPYmpQYWlyKGxvYywgbmFtZS5uYW1lLCB2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRjb25zdCB2YWwgPSBPYmpTaW1wbGUodG9rZW5zLmxvYywgcGFpcnMpXG5cdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdHJldHVybiB2YWxcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnNDYWxsZXIpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbih0b2tlbnMpXG5cdFx0KVxuXHR9LFxuXG5cdHBhcnNlRXhwclBhcnRzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdGZvciAobGV0IGkgPSB0b2tlbnMuc3RhcnQ7IGkgPCB0b2tlbnMuZW5kOyBpID0gaSArIDEpIHtcblx0XHRcdGNvbnN0IGhlcmUgPSB0b2tlbnMuZGF0YVtpXVxuXHRcdFx0aWYgKGhlcmUgaW5zdGFuY2VvZiBLZXl3b3JkKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3QgPSAoKSA9PiB0b2tlbnMuX2Nob3BTdGFydChpICsgMSlcblx0XHRcdFx0c3dpdGNoIChoZXJlLmspIHtcblx0XHRcdFx0XHRjYXNlIEtXX0Z1bjogY2FzZSBLV19HZW5GdW46XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlRnVuKGhlcmUuayA9PT0gS1dfR2VuRnVuLCByZXN0KCkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfQ2FzZTpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VDYXNlKEtXX0Nhc2UsIGZhbHNlLCByZXN0KCkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkVG8odG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHQvLyBmYWxsdGhyb3VnaFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvdXQucHVzaChwYXJzZVNpbmdsZShoZXJlKSlcblx0XHR9XG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdHBhcnNlRXhwclBsYWluID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vucylcblx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRyZXR1cm4gR2xvYmFsQWNjZXNzLm51bGwodG9rZW5zLmxvYylcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cmV0dXJuIGhlYWQocGFydHMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgdGFpbChwYXJ0cykpXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlRnVuID0gKGlzR2VuZXJhdG9yLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgeyBvcFJldHVyblR5cGUsIHJlc3QgfSA9IF90cnlUYWtlUmV0dXJuVHlwZSh0b2tlbnMpXG5cdGNoZWNrTm9uRW1wdHkocmVzdCwgKCkgPT4gYEV4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLmApXG5cdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2socmVzdClcblx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdGNvbnN0IG9wUmVzRGVjbGFyZSA9IGlmRWxzZShvcFJldHVyblR5cGUsXG5cdFx0cnQgPT4gc29tZShMb2NhbERlY2xhcmUucmVzKHJ0LmxvYywgb3BSZXR1cm5UeXBlKSksXG5cdFx0KCkgPT4gb3BPdXQubWFwKG8gPT4gTG9jYWxEZWNsYXJlLnJlcyhvLmxvYywgb3BSZXR1cm5UeXBlKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaXNHZW5lcmF0b3IsIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG59XG5cbi8vIHBhcnNlRnVuIHByaXZhdGVzXG5jb25zdFxuXHRfdHJ5VGFrZVJldHVyblR5cGUgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChoKSAmJiBLZXl3b3JkLmlzVHlwZShoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBzb21lKHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IE5vbmUsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkICYmIChoLmsgPT09IEtXX0Nhc2UgfHwgaC5rID09PSBLV19DYXNlRG8pKSB7XG5cdFx0XHRjb25zdCBlQ2FzZSA9IHBhcnNlQ2FzZShoLmssIHRydWUsIHRva2Vucy50YWlsKCkpXG5cdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdHJldHVybiBoLmsgPT09IEtXX0Nhc2UgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRibG9jazogQmxvY2tWYWwodG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KEtXX0luLCBibG9jaylcblx0XHRcdGNvbnN0IFsgb3BPdXQsIHJlc3QxIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfT3V0LCByZXN0MClcblx0XHRcdHJldHVybiB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2s6IHBhcnNlQmxvY2tGcm9tTGluZXMocmVzdDEpLCBvcEluLCBvcE91dCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUZ1bkxvY2FscyA9IHRva2VucyA9PiB7XG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGwgPSB0b2tlbnMubGFzdCgpXG5cdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMucnRhaWwoKSksXG5cdFx0XHRcdFx0b3BSZXN0QXJnOiBzb21lKExvY2FsRGVjbGFyZShsLmxvYywgbC5uYW1lLCBOb25lLCBmYWxzZSwgZmFsc2UpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMpLCBvcFJlc3RBcmc6IE5vbmUgfVxuXHRcdH1cblx0fSxcblxuXHRfdHJ5VGFrZUluT3JPdXQgPSAoaW5Pck91dCwgdG9rZW5zKSA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBmaXJzdExpbmUgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoS2V5d29yZC5pcyhpbk9yT3V0KShoZWFkKGZpcnN0TGluZS50b2tlbnMpKSkge1xuXHRcdFx0XHRjb25zdCBpbk91dCA9IERlYnVnKFxuXHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jayhTbGljZS5ncm91cChmaXJzdExpbmUpKSlcblx0XHRcdFx0cmV0dXJuIFsgc29tZShpbk91dCksIHRva2Vucy50YWlsKCkgXVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gWyBOb25lLCB0b2tlbnMgXVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlTGluZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQpXG5cdFx0XHRzd2l0Y2ggKGguaykge1xuXHRcdFx0XHRjYXNlIEtXX09iakFzc2lnbjpcblx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRyZXR1cm4gTGlzdEVudHJ5KHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KSwgLTEpXG5cdFx0XHRcdGNhc2UgS1dfQ2FzZURvOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoS1dfQ2FzZURvLCBmYWxzZSwgcmVzdClcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Zzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19EZWJ1Z2dlcjpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcih0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0VuZExvb3A6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19Mb29wOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX1JlZ2lvbjpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jayh0b2tlbnMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHR9XG5cblx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0T25jZVdoZXJlKEtleXdvcmQuaXNMaW5lU3BsaXQpLFxuXHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXQuayA9PT0gS1dfTWFwRW50cnkgP1xuXHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIsIHRva2Vucy5sb2MpIDpcblx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIsIHRva2Vucy5sb2MpXG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByKHRva2VucykpXG5cdH0sXG5cblx0cGFyc2VMaW5lT3JMaW5lcyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgXyA9IHBhcnNlTGluZSh0b2tlbnMpXG5cdFx0cmV0dXJuIF8gaW5zdGFuY2VvZiBBcnJheSA/IF8gOiBbIF8gXVxuXHR9XG5cbi8vIHBhcnNlTGluZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUsIGxvYykgPT4ge1xuXHRcdGxldCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXMoYXNzaWduZWQpXG5cdFx0Y29uc3QgayA9IGFzc2lnbmVyLmtcblx0XHRjb25zdCBlVmFsdWVQcmUgPSB2YWx1ZS5pc0VtcHR5KCkgPyBHbG9iYWxBY2Nlc3MudHJ1ZSh2YWx1ZS5sb2MpIDogcGFyc2VFeHByKHZhbHVlKVxuXG5cdFx0bGV0IGVWYWx1ZU5hbWVkXG5cdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IG5hbWUgPSBoZWFkKGxvY2FscykubmFtZVxuXHRcdFx0aWYgKG5hbWUgPT09ICdkb2MnKSB7XG5cdFx0XHRcdGlmIChlVmFsdWVQcmUgaW5zdGFuY2VvZiBGdW4pXG5cdFx0XHRcdFx0Ly8gS0xVREdFOiBgZG9jYCBmb3IgbW9kdWxlIGNhbiBiZSBhIEZ1biBzaWduYXR1cmUuXG5cdFx0XHRcdFx0Ly8gVE9ETzogU29tZXRoaW5nIGJldHRlci4uLlxuXHRcdFx0XHRcdGVWYWx1ZVByZS5hcmdzLmZvckVhY2goYXJnID0+IHsgYXJnLm9rVG9Ob3RVc2UgPSB0cnVlIH0pXG5cdFx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVWYWx1ZU5hbWVkID0gX3RyeUFkZERpc3BsYXlOYW1lKGVWYWx1ZVByZSwgbmFtZSlcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0ZVZhbHVlTmFtZWQgPSBlVmFsdWVQcmVcblxuXHRcdGNvbnN0IGlzWWllbGQgPSBrID09PSBLV19ZaWVsZCB8fCBrID09PSBLV19ZaWVsZFRvXG5cblx0XHRjb25zdCBlVmFsdWUgPSBfdmFsdWVGcm9tQXNzaWduKGVWYWx1ZU5hbWVkLCBrKVxuXG5cdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0Y3guY2hlY2soaXNZaWVsZCwgYXNzaWduZWQubG9jLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdHJldHVybiBlVmFsdWVcblx0XHR9XG5cblx0XHRpZiAoaXNZaWVsZClcblx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0Y3guY2hlY2soIV8uaXNMYXp5LCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdGlmIChrID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0aWYgKGxvY2Fscy5sZW5ndGggPT09IDEpIHtcblx0XHRcdGNvbnN0IGFzc2lnbiA9IEFzc2lnbihsb2MsIGxvY2Fsc1swXSwgaywgZVZhbHVlKVxuXHRcdFx0Y29uc3QgaXNUZXN0ID0gYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0cmV0dXJuIGlzVGVzdCAmJiBrID09PSBLV19PYmpBc3NpZ24gPyBEZWJ1Zyhsb2MsIFsgYXNzaWduIF0pIDogYXNzaWduXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaXNMYXp5ID0gbG9jYWxzLnNvbWUobCA9PiBsLmlzTGF6eSlcblx0XHRcdGlmIChpc0xhenkpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soXy5pc0xhenksIF8ubG9jLFxuXHRcdFx0XHRcdCdJZiBhbnkgcGFydCBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbiBpcyBsYXp5LCBhbGwgbXVzdCBiZS4nKSlcblx0XHRcdHJldHVybiBBc3NpZ25EZXN0cnVjdHVyZShsb2MsIGxvY2FscywgaywgZVZhbHVlLCBpc0xhenkpXG5cdFx0fVxuXHR9LFxuXG5cdF92YWx1ZUZyb21Bc3NpZ24gPSAodmFsdWVQcmUsIGtBc3NpZ24pID0+IHtcblx0XHRzd2l0Y2ggKGtBc3NpZ24pIHtcblx0XHRcdGNhc2UgS1dfWWllbGQ6XG5cdFx0XHRcdHJldHVybiBZaWVsZCh2YWx1ZVByZS5sb2MsIHZhbHVlUHJlKVxuXHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZVByZS5sb2MsIHZhbHVlUHJlKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlUHJlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIFdlIGdpdmUgaXQgYSBkaXNwbGF5TmFtZSBpZjpcblx0Ly8gLiBJdCdzIGEgYmxvY2tcblx0Ly8gLiBJdCdzIGEgZnVuY3Rpb25cblx0Ly8gLiBJdCdzIG9uZSBvZiB0aG9zZSBhdCB0aGUgZW5kIG9mIGEgYmxvY2tcblx0Ly8gLiBJdCdzIG9uZSBvZiB0aG9zZSBhcyB0aGUgZW5kIG1lbWJlciBvZiBhIGNhbGwuXG5cdF90cnlBZGREaXNwbGF5TmFtZSA9IChlVmFsdWVQcmUsIGRpc3BsYXlOYW1lKSA9PiB7XG5cdFx0c3dpdGNoICh0cnVlKSB7XG5cdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIENhbGwgJiYgZVZhbHVlUHJlLmFyZ3MubGVuZ3RoID4gMDpcblx0XHRcdFx0Ly8gVE9ETzogSW1tdXRhYmxlXG5cdFx0XHRcdGVWYWx1ZVByZS5hcmdzW2VWYWx1ZVByZS5hcmdzLmxlbmd0aCAtIDFdID1cblx0XHRcdFx0XHRfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChlVmFsdWVQcmUuYXJncyksIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cblx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuOlxuXHRcdFx0XHRyZXR1cm4gT2JqUmV0dXJuKGVWYWx1ZVByZS5sb2MsIFtdLCBbXSwgc29tZShlVmFsdWVQcmUpLCBzb21lKGRpc3BsYXlOYW1lKSlcblxuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBPYmpSZXR1cm4gJiZcblx0XHRcdFx0IWVWYWx1ZVByZS5rZXlzLnNvbWUoa2V5ID0+IGtleS5uYW1lID09PSAnZGlzcGxheU5hbWUnKTpcblx0XHRcdFx0ZVZhbHVlUHJlLm9wRGlzcGxheU5hbWUgPSBzb21lKGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cblx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgQmxvY2tXcmFwOiB7XG5cdFx0XHRcdGNvbnN0IGJsb2NrID0gZVZhbHVlUHJlLmJsb2NrXG5cdFx0XHRcdGJsb2NrLnJldHVybmVkID0gX3RyeUFkZERpc3BsYXlOYW1lKGJsb2NrLnJldHVybmVkLCBkaXNwbGF5TmFtZSlcblx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdFx0fVxuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZU1hcEVudHJ5ID0gKGJlZm9yZSwgYWZ0ZXIsIGxvYykgPT5cblx0XHQvLyBUT0RPOiBpbmRleCBGaWxsZWQgaW4gYnkgPz8/XG5cdFx0TWFwRW50cnkobG9jLCBwYXJzZUV4cHIoYmVmb3JlKSwgcGFyc2VFeHByKGFmdGVyKSwgLTEpXG5cbmNvbnN0XG5cdHBhcnNlTG9jYWxEZWNsYXJlcyA9IHRva2VucyA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblx0cGFyc2VMb2NhbERlY2xhcmUgPSB0ID0+IHtcblx0XHRsZXQgbmFtZVxuXHRcdGxldCBvcFR5cGUgPSBOb25lXG5cdFx0bGV0IGlzTGF6eSA9IGZhbHNlXG5cblx0XHRpZiAoR3JvdXAuaXNTcGFjZWQodCkpIHtcblx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmdyb3VwKHQpXG5cdFx0XHRsZXQgcmVzdCA9IHRva2Vuc1xuXHRcdFx0aWYgKEtleXdvcmQuaXNMYXp5KHRva2Vucy5oZWFkKCkpKSB7XG5cdFx0XHRcdGlzTGF6eSA9IHRydWVcblx0XHRcdFx0cmVzdCA9IHRva2Vucy50YWlsKClcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRpZiAoIXJlc3QyLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRjeC5jaGVjayhLZXl3b3JkLmlzVHlwZShjb2xvbiksIGNvbG9uLmxvYywgKCkgPT4gYEV4cGVjdGVkICR7Y29kZSgnOicpfWApXG5cdFx0XHRcdGNvbnN0IHRva2Vuc1R5cGUgPSByZXN0Mi50YWlsKClcblx0XHRcdFx0Y2hlY2tOb25FbXB0eSh0b2tlbnNUeXBlLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7Y29sb259YClcblx0XHRcdFx0b3BUeXBlID0gc29tZShwYXJzZVNwYWNlZCh0b2tlbnNUeXBlKSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZSh0KVxuXG5cdFx0cmV0dXJuIExvY2FsRGVjbGFyZSh0LmxvYywgbmFtZSwgb3BUeXBlLCBpc0xhenksIGZhbHNlKVxuXHR9XG5cbi8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0cmV0dXJuICdfJ1xuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHQvLyBUT0RPOiBBbGxvdyB0aGlzP1xuXHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdHJldHVybiB0Lm5hbWVcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VTaW5nbGUgPSB0ID0+IHtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgTmFtZTpcblx0XHRcdHJldHVybiBfYWNjZXNzKHQubmFtZSwgdC5sb2MpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgR3JvdXA6XG5cdFx0XHRzd2l0Y2ggKHQuaykge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiBwYXJzZVNwYWNlZChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gcGFyc2VFeHByKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfQnJhY2tldDogcmV0dXJuIExpc3RTaW1wbGUodC5sb2MsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSlcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gYmxvY2tXcmFwKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdFx0cmV0dXJuIFF1b3RlKHQubG9jLFxuXHRcdFx0XHRcdFx0dC50b2tlbnMubWFwKF8gPT4gKHR5cGVvZiBfID09PSAnc3RyaW5nJykgPyBfIDogcGFyc2VTaW5nbGUoXykpKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdH1cblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWw6XG5cdFx0XHRyZXR1cm4gTnVtYmVyTGl0ZXJhbCh0LmxvYywgdC52YWx1ZSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBDYWxsT25Gb2N1czpcblx0XHRcdHJldHVybiBDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSwgdC5sb2MpLCBbIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSBdKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEtleXdvcmQ6XG5cdFx0XHRpZiAodC5rID09PSBLV19Gb2N1cylcblx0XHRcdFx0cmV0dXJuIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHNwID0gb3BLV3RvU1AodC5rKVxuXHRcdFx0XHRpZiAoc3AgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbCh0LmxvYywgc3ApXG5cdFx0XHR9XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgRG90TmFtZTpcblx0XHRcdGlmICh0Lm5Eb3RzID09PSAzKVxuXHRcdFx0XHRyZXR1cm4gU3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHVuZXhwZWN0ZWQodClcblx0fVxufVxuLy8gcGFyc2VTaW5nbGUgcHJpdmF0ZXNcbmNvbnN0IF9hY2Nlc3MgPSAobmFtZSwgbG9jKSA9PlxuXHRKc0dsb2JhbHMuaGFzKG5hbWUpID8gR2xvYmFsQWNjZXNzKGxvYywgbmFtZSkgOiBMb2NhbEFjY2Vzcyhsb2MsIG5hbWUpXG5cbmNvbnN0IHBhcnNlU3BhY2VkID0gdG9rZW5zID0+IHtcblx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKCksIHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdGlmIChLZXl3b3JkLmlzVHlwZShoKSkge1xuXHRcdGNvbnN0IGVUeXBlID0gcGFyc2VTcGFjZWQocmVzdClcblx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdH0gZWxzZSBpZiAoS2V5d29yZC5pc0xhenkoaCkpXG5cdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRlbHNlIHtcblx0XHRjb25zdCBtZW1iZXJPclN1YnNjcmlwdCA9IChlLCB0KSA9PiB7XG5cdFx0XHRjb25zdCBsb2MgPSB0LmxvY1xuXHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKHQubkRvdHMgPT09IDEsIHRva2Vucy5sb2MsICdUb28gbWFueSBkb3RzIScpXG5cdFx0XHRcdHJldHVybiBNZW1iZXIodG9rZW5zLmxvYywgZSwgdC5uYW1lKVxuXHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0aWYgKHQuayA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLnN1Yihsb2MsXG5cdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSkpXG5cdFx0XHRcdGlmICh0LmsgPT09IEdfUGFyZW4pIHtcblx0XHRcdFx0XHRjaGVja0VtcHR5KFNsaWNlLmdyb3VwKHQpLFxuXHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBlLCBbXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGN4LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3R9YClcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1lbWJlck9yU3Vic2NyaXB0LCBwYXJzZVNpbmdsZShoKSlcblx0fVxufVxuXG5jb25zdCB0cnlQYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdGNvbnN0IGxpbmUwID0gU2xpY2UuZ3JvdXAodG9rZW5zLmhlYWQoKSlcblx0XHRpZiAoS2V5d29yZC5pcyhrKShsaW5lMC5oZWFkKCkpKVxuXHRcdFx0cmV0dXJuIFsgX3BhcnNlVXNlcyhrLCBsaW5lMC50YWlsKCkpLCB0b2tlbnMudGFpbCgpIF1cblx0fVxuXHRyZXR1cm4gWyBbIF0sIHRva2VucyBdXG59XG5cbi8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IFsgYmVmb3JlLCBsaW5lcyBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAoKSA9PmBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cdFx0XHRpZiAoayA9PT0gS1dfVXNlRG8pIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gS1dfVXNlTGF6eSB8fCBrID09PSBLV19Vc2VEZWJ1Z1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID1cblx0XHRcdFx0XHRfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSwgU2xpY2UuZ3JvdXAobGluZSkudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxpbmUubG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSwgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZSh0b2tlbnMubG9jLCBuYW1lLCBOb25lLCBpc0xhenksIGZhbHNlKVxuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgdXNlZDogW10sIG9wVXNlRGVmYXVsdDogc29tZSh1c2VEZWZhdWx0KCkpIH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGhhc0RlZmF1bHRVc2UgPSBLZXl3b3JkLmlzRm9jdXModG9rZW5zLmhlYWQoKSlcblx0XHRcdGNvbnN0IG9wVXNlRGVmYXVsdCA9IG9wSWYoaGFzRGVmYXVsdFVzZSwgdXNlRGVmYXVsdClcblx0XHRcdGNvbnN0IHJlc3QgPSBoYXNEZWZhdWx0VXNlID8gdG9rZW5zLnRhaWwoKSA6IHRva2Vuc1xuXHRcdFx0Y29uc3QgdXNlZCA9IHBhcnNlTG9jYWxEZWNsYXJlcyhyZXN0KS5tYXAobCA9PiB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubmFtZSAhPT0gJ18nLCBsLnBvcyxcblx0XHRcdFx0XHQoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdGwuaXNMYXp5ID0gaXNMYXp5XG5cdFx0XHRcdHJldHVybiBsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHsgdXNlZCwgb3BVc2VEZWZhdWx0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlUmVxdWlyZSA9IHQgPT4ge1xuXHRcdGlmICh0IGluc3RhbmNlb2YgTmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHQubmFtZSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHJldHVybiB7IHBhdGg6IHB1c2goX3BhcnRzRnJvbURvdE5hbWUodCksIHQubmFtZSkuam9pbignLycpLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soR3JvdXAuaXNTcGFjZWQodCksIHQubG9jLCAnTm90IGEgdmFsaWQgbW9kdWxlIG5hbWUuJylcblx0XHRcdHJldHVybiBfcGFyc2VMb2NhbFJlcXVpcmUoU2xpY2UuZ3JvdXAodCkpXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUxvY2FsUmVxdWlyZSA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0bGV0IHBhcnRzXG5cdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdHBhcnRzID0gX3BhcnRzRnJvbURvdE5hbWUoZmlyc3QpXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzID0gWyBdXG5cdFx0fVxuXHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHR0b2tlbnMudGFpbCgpLmVhY2godCA9PiB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAxLCB0LmxvYyxcblx0XHRcdFx0J05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdHBhcnRzLnB1c2godC5uYW1lKVxuXHRcdH0pXG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhdGg6IHBhcnRzLmpvaW4oJy8nKSxcblx0XHRcdG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZVxuXHRcdH1cblx0fSxcblxuXHRfcGFydHNGcm9tRG90TmFtZSA9IGRvdE5hbWUgPT5cblx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9