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
		const listLength = _parseBlockLines3.listLength;
		const mapLength = _parseBlockLines3.mapLength;
		const objKeys = _parseBlockLines3.objKeys;
		const debugKeys = _parseBlockLines3.debugKeys;

		var _ref = (function () {
			if (kReturn === 'bag') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.ListReturn(tokens.loc, listLength))
			};
			if (kReturn === 'map') return {
				doLines: eLines,
				opReturn: _UOp.some(_Expression.MapReturn(tokens.loc, mapLength))
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
		let listLength = 0,
		    mapLength = 0;
		const eLines = [];
		const addLine = function (ln, inDebug) {
			if (ln instanceof Array) ln.forEach(function (_) {
				return addLine(_, inDebug);
			});else {
				if (ln instanceof _Expression.Debug) ln.lines.forEach(function (_) {
					return addLine(_, true);
				});else if (ln instanceof _Expression.ListEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug list entries');
					// When ListEntries are first created they have no index.
					_UUtil.assert(ln.index === -1);
					ln.index = listLength;
					listLength = listLength + 1;
				} else if (ln instanceof _Expression.MapEntry) {
					_UUtil.assert(!inDebug, 'Not supported: debug map entries');
					_UUtil.assert(ln.index === -1);
					ln.index = mapLength;
					mapLength = mapLength + 1;
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
		const isBag = listLength > 0;
		const isMap = mapLength > 0;
		cx.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.');
		cx.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.');
		cx.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.');

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
		return { eLines: eLines, kReturn: kReturn, listLength: listLength, mapLength: mapLength, objKeys: objKeys, debugKeys: debugKeys };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFvQndCLEtBQUs7Ozs7Ozs7Ozs7QUFGN0IsS0FBSSxFQUFFLENBQUE7O0FBRVMsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1IsU0FQUSxNQUFNLENBT1AsT0FkdUIsS0FBSyxDQWN0QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUNoQyxTQUFPLFdBQVcsQ0FBQyxRQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQzFDOztBQUVELE9BQ0MsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7RUFBQTtPQUNoRCxhQUFhLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztTQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDakQsVUFBVSxHQUFHLFVBQUEsQ0FBQztTQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUMsQ0FBRztFQUFBLENBQUE7O0FBRXBELE9BQU0sV0FBVyxHQUFHLFVBQUEsTUFBTSxFQUFJOzs7c0JBRUgsWUFBWSxRQXhCc0MsUUFBUSxFQXdCbkMsTUFBTSxDQUFDOzs7O1FBQWhELE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLFFBekJjLE1BQU0sRUF5QlgsS0FBSyxDQUFDOzs7O1FBQWhELFNBQVM7UUFBRSxLQUFLOzt1QkFDSSxZQUFZLFFBekJ4QyxVQUFVLEVBeUIyQyxLQUFLLENBQUM7Ozs7UUFBbkQsUUFBUTtRQUFF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QU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUMzQixNQUFJLEtBQUssQ0FBQTtBQUNULE1BQUksS0FBSyxtQkEzdEJXLE9BQU8sQUEydEJDLEVBQzNCLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQSxLQUM1QjtBQUNKLEtBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxtQkE3dEJ3QyxJQUFJLEFBNnRCNUIsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUE7QUFDOUUsUUFBSyxHQUFHLEVBQUcsQ0FBQTtHQUNYO0FBQ0QsT0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdEIsUUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUN2QixLQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsbUJBbnVCUyxPQUFPLEFBbXVCRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ3BELGtDQUFrQyxDQUFDLENBQUE7QUFDcEMsUUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDbEIsQ0FBQyxDQUFBO0FBQ0YsU0FBTztBQUNOLE9BQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNyQixPQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUk7R0FDeEIsQ0FBQTtFQUNEO09BRUQsaUJBQWlCLEdBQUcsVUFBQSxPQUFPO1NBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLEdBQUcsTUF6dUJnQixNQUFNLENBeXVCZixJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBCbG9ja0RvLCBCbG9ja1ZhbCwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCxcblx0Q2FzZURvLCBDYXNlVmFsLCBEZWJ1ZywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExpc3RFbnRyeSwgTGlzdFJldHVybixcblx0TGlzdFNpbXBsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlLCBMb29wLCBNYXBFbnRyeSwgTWFwUmV0dXJuLCBNZW1iZXIsIE1vZHVsZSxcblx0TW9kdWxlRGVmYXVsdEV4cG9ydCwgT2JqUGFpciwgT2JqUmV0dXJuLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2UsXG5cdFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsXG5cdEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsIFRva2VuTnVtYmVyTGl0ZXJhbCwgTmFtZSwgb3BLV3RvU1AsXG5cdEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0luLFxuXHRLV19Mb29wLCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBjYXQsIGhlYWQsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgTm9uZSwgb3BJZiwgc29tZSB9IGZyb20gJy4uL1UvT3AnXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi9VL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxubGV0IGN4XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdGFzc2VydChHcm91cC5pc0Jsb2NrKHJvb3RUb2tlbikpXG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHQvLyB0cnlQYXJzZVVzZXMgbW92ZXMgdG9rZW5zIGZvcndhcmRcblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCBibG9jayA9IHBhcnNlTW9kdWxlQm9keShyZXN0Mylcblx0YmxvY2subGluZXMuZm9yRWFjaChsaW5lID0+IHtcblx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmsgPT09ICdleHBvcnQnKVxuXHRcdFx0Y3guY2hlY2sobGluZS5hc3NpZ25lZS5uYW1lICE9PSAnZGlzcGxheU5hbWUnLCBsaW5lLmFzc2lnbmVlLmxvYyxcblx0XHRcdFx0J01vZHVsZSBjYW4gbm90IGNob29zZSBpdHMgb3duIGRpc3BsYXlOYW1lLicpXG5cdH0pXG5cdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkpXG5cdFx0YmxvY2subGluZXMucHVzaChcblx0XHRcdEFzc2lnbihcblx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0TG9jYWxEZWNsYXJlKHRva2Vucy5sb2MsICdkaXNwbGF5TmFtZScsIFtdLCBmYWxzZSwgdHJ1ZSksXG5cdFx0XHRcdCdleHBvcnQnLFxuXHRcdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgYmxvY2spXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCb2R5RG8oX2p1c3RCbG9jayh0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gdG9rZW5zID0+IHBhcnNlQm9keVZhbChfanVzdEJsb2NrKHRva2VucykpLFxuXG5cdC8vIFRPRE86IEp1c3QgaGF2ZSBtb2R1bGUgcmV0dXJuIGEgdmFsdWUgYW5kIHVzZSBhIG5vcm1hbCBibG9jay5cblx0cGFyc2VNb2R1bGVCb2R5ID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnbW9kdWxlJywgdG9rZW5zKSxcblxuXHRwYXJzZUJsb2NrRnJvbUxpbmVzID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnYW55JywgdG9rZW5zKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQm9keURvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gJ3BsYWluJywgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGVMaW5lcylcblx0fSxcblx0cGFyc2VCb2R5VmFsID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdF9wYXJzZUJsb2NrQm9keSA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRhc3NlcnQoayA9PT0gJ3ZhbCcgfHwgayA9PT0gJ21vZHVsZScgfHwgayA9PT0gJ2FueScpXG5cblx0XHQvLyBrZXlzIG9ubHkgbWF0dGVyIGlmIGtSZXR1cm4gPT09ICdvYmonXG5cdFx0Y29uc3QgeyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH0gPVxuXHRcdFx0X3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cblx0XHRjb25zdCB7IGRvTGluZXMsIG9wUmV0dXJuIH0gPSAoKCkgPT4ge1xuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdiYWcnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRvcFJldHVybjogc29tZShMaXN0UmV0dXJuKHRva2Vucy5sb2MsIGxpc3RMZW5ndGgpKVxuXHRcdFx0XHR9XG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ21hcCcpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE1hcFJldHVybih0b2tlbnMubG9jLCBtYXBMZW5ndGgpKVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxhc3RSZXR1cm4gPSAhaXNFbXB0eShlTGluZXMpICYmIGxhc3QoZUxpbmVzKSBpbnN0YW5jZW9mIFZhbFxuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdvYmonICYmIGsgIT09ICdtb2R1bGUnKVxuXHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogcnRhaWwoZUxpbmVzKSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRzb21lKGxhc3QoZUxpbmVzKSksXG5cdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0fSA6IHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHROb25lLFxuXHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHR7IGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoZUxpbmVzKSkgfSA6XG5cdFx0XHRcdHsgZG9MaW5lczogZUxpbmVzLCBvcFJldHVybjogTm9uZSB9XG5cdFx0fSkoKVxuXG5cdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRjYXNlICd2YWwnOlxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHQoKSA9PiBjeC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpKVxuXHRcdFx0Y2FzZSAnYW55Jzpcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBkb0xpbmVzKSlcblx0XHRcdGNhc2UgJ21vZHVsZSc6IHtcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGRlYnVnLW9ubHkgZXhwb3J0c1xuXHRcdFx0XHRjb25zdCBsaW5lcyA9XG5cdFx0XHRcdFx0Ly8gVHVybiBPYmogYXNzaWducyBpbnRvIGV4cG9ydHMuXG5cdFx0XHRcdFx0Y2F0KFxuXHRcdFx0XHRcdFx0ZG9MaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0XHRcdFx0XHRcdGxpbmUuayA9ICdleHBvcnQnXG5cdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuLm1hcChyZXQgPT4gTW9kdWxlRGVmYXVsdEV4cG9ydChyZXQubG9jLCByZXQpKSlcblx0XHRcdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpXG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3Ioaylcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gW10sIGRlYnVnS2V5cyA9IFtdXG5cdFx0bGV0IGxpc3RMZW5ndGggPSAwLCBtYXBMZW5ndGggPSAwXG5cdFx0Y29uc3QgZUxpbmVzID0gW11cblx0XHRjb25zdCBhZGRMaW5lID0gKGxuLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobG4gaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0bG4uZm9yRWFjaChfID0+IGFkZExpbmUoXywgaW5EZWJ1ZykpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxuIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdFx0bG4ubGluZXMuZm9yRWFjaChfID0+IGFkZExpbmUoXywgdHJ1ZSkpXG5cdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdFx0YXNzZXJ0KCFpbkRlYnVnLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0XHQvLyBXaGVuIExpc3RFbnRyaWVzIGFyZSBmaXJzdCBjcmVhdGVkIHRoZXkgaGF2ZSBubyBpbmRleC5cblx0XHRcdFx0XHRhc3NlcnQobG4uaW5kZXggPT09IC0xKVxuXHRcdFx0XHRcdGxuLmluZGV4ID0gbGlzdExlbmd0aFxuXHRcdFx0XHRcdGxpc3RMZW5ndGggPSBsaXN0TGVuZ3RoICsgMVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdFx0YXNzZXJ0KGxuLmluZGV4ID09PSAtMSlcblx0XHRcdFx0XHRsbi5pbmRleCA9IG1hcExlbmd0aFxuXHRcdFx0XHRcdG1hcExlbmd0aCA9IG1hcExlbmd0aCArIDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsbi5rID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRcdFx0KGluRGVidWcgPyBkZWJ1Z0tleXMgOiBvYmpLZXlzKS5wdXNoKGxuLmFzc2lnbmVlKVxuXG5cdFx0XHRcdGlmICghaW5EZWJ1Zylcblx0XHRcdFx0XHQvLyBFbHNlIHdlIGFyZSBhZGRpbmcgdGhlIERlYnVnIGFzIGEgc2luZ2xlIGxpbmUuXG5cdFx0XHRcdFx0ZUxpbmVzLnB1c2gobG4pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxpbmVzLmVhY2gobGluZSA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChsaW5lKSkpKVxuXG5cdFx0Y29uc3QgaXNPYmogPSAhKGlzRW1wdHkob2JqS2V5cykgJiYgaXNFbXB0eShkZWJ1Z0tleXMpKVxuXHRcdC8vIFRPRE9cblx0XHQvLyBpZiAoaXNFbXB0eShvYmpLZXlzKSlcblx0XHQvL1x0Y3guY2hlY2soaXNFbXB0eShkZWJ1Z0tleXMpLCBsaW5lcy5sb2MsICdCbG9jayBjYW4ndCBoYXZlIG9ubHkgZGVidWcga2V5cycpXG5cdFx0Y29uc3QgaXNCYWcgPSBsaXN0TGVuZ3RoID4gMFxuXHRcdGNvbnN0IGlzTWFwID0gbWFwTGVuZ3RoID4gMFxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9IGlzT2JqID8gJ29iaicgOiBpc0JhZyA/ICdiYWcnIDogaXNNYXAgPyAnbWFwJyA6ICdwbGFpbidcblx0XHRyZXR1cm4geyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gTm9uZVxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCBzb21lKChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpKSBdIDpcblx0XHRbIGJsb2NrLCBOb25lIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCb2R5VmFsIDogcGFyc2VCb2R5RG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoS2V5d29yZC5pc1R5cGUoZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFsgXVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gc3BsaXRzW2ldLmJlZm9yZS5sYXN0KClcblx0XHRcdFx0XHRjeC5jaGVjayhuYW1lIGluc3RhbmNlb2YgTmFtZSwgbmFtZS5sb2MsICgpID0+IGBFeHBlY3RlZCBhIG5hbWUsIG5vdCAke25hbWV9YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRXhwclBsYWluKHRva2Vuc1ZhbHVlKVxuXHRcdFx0XHRcdGNvbnN0IGxvYyA9IExvYyhuYW1lLmxvYy5zdGFydCwgdG9rZW5zVmFsdWUubG9jLmVuZClcblx0XHRcdFx0XHRwYWlycy5wdXNoKE9ialBhaXIobG9jLCBuYW1lLm5hbWUsIHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBwYWlycylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKHRva2Vucylcblx0XHQpXG5cdH0sXG5cblx0cGFyc2VFeHByUGFydHMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IG91dCA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IHRva2Vucy5lbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0Y29uc3QgaGVyZSA9IHRva2Vucy5kYXRhW2ldXG5cdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fY2hvcFN0YXJ0KGkgKyAxKVxuXHRcdFx0XHRzd2l0Y2ggKGhlcmUuaykge1xuXHRcdFx0XHRcdGNhc2UgS1dfRnVuOiBjYXNlIEtXX0dlbkZ1bjpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgcGFyc2VGdW4oaGVyZS5rID09PSBLV19HZW5GdW4sIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19DYXNlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUNhc2UoS1dfQ2FzZSwgZmFsc2UsIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0cGFyc2VFeHByUGxhaW4gPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zKVxuXHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdHJldHVybiBHbG9iYWxBY2Nlc3MubnVsbCh0b2tlbnMubG9jKVxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHR9XG5cdH1cblxuY29uc3QgcGFyc2VGdW4gPSAoaXNHZW5lcmF0b3IsIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suYClcblx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gX2Z1bkFyZ3NBbmRCbG9jayhyZXN0KVxuXHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRydCA9PiBzb21lKExvY2FsRGVjbGFyZS5yZXMocnQubG9jLCBvcFJldHVyblR5cGUpKSxcblx0XHQoKSA9PiBvcE91dC5tYXAobyA9PiBMb2NhbERlY2xhcmUucmVzKG8ubG9jLCBvcFJldHVyblR5cGUpKSlcblx0cmV0dXJuIEZ1bih0b2tlbnMubG9jLCBpc0dlbmVyYXRvciwgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNUeXBlKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHNvbWUocGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAoaCkudGFpbCgpKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogTm9uZSwgcmVzdDogdG9rZW5zIH1cblx0fSxcblxuXHRfZnVuQXJnc0FuZEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRpZiAoaCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgKGguayA9PT0gS1dfQ2FzZSB8fCBoLmsgPT09IEtXX0Nhc2VEbykpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGguaywgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIGguayA9PT0gS1dfQ2FzZSA/XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBbIF0sIGVDYXNlKVxuXHRcdFx0XHR9IDpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogTm9uZSwgb3BJbjogTm9uZSwgb3BPdXQ6IE5vbmUsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrRG8odG9rZW5zLmxvYywgWyBlQ2FzZSBdKVxuXHRcdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IF9wYXJzZUZ1bkxvY2FscyhiZWZvcmUpXG5cdFx0XHRjb25zdCBbIG9wSW4sIHJlc3QwIF0gPSBfdHJ5VGFrZUluT3JPdXQoS1dfSW4sIGJsb2NrKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dChLV19PdXQsIHJlc3QwKVxuXHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jazogcGFyc2VCbG9ja0Zyb21MaW5lcyhyZXN0MSksIG9wSW4sIG9wT3V0IH1cblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlRnVuTG9jYWxzID0gdG9rZW5zID0+IHtcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IGFyZ3M6IFtdLCBvcFJlc3RBcmc6IE5vbmUgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGlmIChsIGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2Vucy5ydGFpbCgpKSxcblx0XHRcdFx0XHRvcFJlc3RBcmc6IHNvbWUoTG9jYWxEZWNsYXJlKGwubG9jLCBsLm5hbWUsIE5vbmUsIGZhbHNlLCBmYWxzZSkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKHRva2VucyksIG9wUmVzdEFyZzogTm9uZSB9XG5cdFx0fVxuXHR9LFxuXG5cdF90cnlUYWtlSW5Pck91dCA9IChpbk9yT3V0LCB0b2tlbnMpID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IHRva2Vucy5oZWFkKClcblx0XHRcdGlmIChLZXl3b3JkLmlzKGluT3JPdXQpKGhlYWQoZmlyc3RMaW5lLnRva2VucykpKSB7XG5cdFx0XHRcdGNvbnN0IGluT3V0ID0gRGVidWcoXG5cdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKFNsaWNlLmdyb3VwKGZpcnN0TGluZSkpKVxuXHRcdFx0XHRyZXR1cm4gWyBzb21lKGluT3V0KSwgdG9rZW5zLnRhaWwoKSBdXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBbIE5vbmUsIHRva2VucyBdXG5cdH1cblxuY29uc3Rcblx0cGFyc2VMaW5lID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGNvbnN0IHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cblx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdHN3aXRjaCAoaC5rKSB7XG5cdFx0XHRcdGNhc2UgS1dfT2JqQXNzaWduOlxuXHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdHJldHVybiBMaXN0RW50cnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpLCAtMSlcblx0XHRcdFx0Y2FzZSBLV19DYXNlRG86XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlQ2FzZShLV19DYXNlRG8sIGZhbHNlLCByZXN0KVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnOlxuXHRcdFx0XHRcdHJldHVybiBEZWJ1Zyh0b2tlbnMubG9rLFxuXHRcdFx0XHRcdFx0R3JvdXAuaXNCbG9jayh0b2tlbnMuc2Vjb25kKCkpID9cblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gaW5kZW50ZWQgYmxvY2tcblx0XHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soKSA6XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIHNpbmdsZSBsaW5lXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVPckxpbmVzKHJlc3QpKVxuXHRcdFx0XHRjYXNlIEtXX0RlYnVnZ2VyOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsLmRlYnVnZ2VyKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfRW5kTG9vcDpcblx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRyZXR1cm4gRW5kTG9vcCh0b2tlbnMubG9jKVxuXHRcdFx0XHRjYXNlIEtXX0xvb3A6XG5cdFx0XHRcdFx0cmV0dXJuIExvb3AodG9rZW5zLmxvYywganVzdEJsb2NrRG8ocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfUmVnaW9uOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKHRva2Vucylcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBmYWxsIHRocm91Z2hcblx0XHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoS2V5d29yZC5pc0xpbmVTcGxpdCksXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdHJldHVybiBhdC5rID09PSBLV19NYXBFbnRyeSA/XG5cdFx0XHRcdFx0X3BhcnNlTWFwRW50cnkoYmVmb3JlLCBhZnRlciwgdG9rZW5zLmxvYykgOlxuXHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlciwgdG9rZW5zLmxvYylcblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHIodG9rZW5zKSlcblx0fSxcblxuXHRwYXJzZUxpbmVPckxpbmVzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBfID0gcGFyc2VMaW5lKHRva2Vucylcblx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdH1cblxuLy8gcGFyc2VMaW5lIHByaXZhdGVzXG5jb25zdFxuXHRfcGFyc2VBc3NpZ24gPSAoYXNzaWduZWQsIGFzc2lnbmVyLCB2YWx1ZSwgbG9jKSA9PiB7XG5cdFx0bGV0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyhhc3NpZ25lZClcblx0XHRjb25zdCBrID0gYXNzaWduZXIua1xuXHRcdGNvbnN0IGVWYWx1ZVByZSA9IHZhbHVlLmlzRW1wdHkoKSA/IEdsb2JhbEFjY2Vzcy50cnVlKHZhbHVlLmxvYykgOiBwYXJzZUV4cHIodmFsdWUpXG5cblx0XHRsZXQgZVZhbHVlTmFtZWRcblx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0Y29uc3QgbmFtZSA9IGhlYWQobG9jYWxzKS5uYW1lXG5cdFx0XHRpZiAobmFtZSA9PT0gJ2RvYycpIHtcblx0XHRcdFx0aWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0XHQvLyBLTFVER0U6IGBkb2NgIGZvciBtb2R1bGUgY2FuIGJlIGEgRnVuIHNpZ25hdHVyZS5cblx0XHRcdFx0XHQvLyBUT0RPOiBTb21ldGhpbmcgYmV0dGVyLi4uXG5cdFx0XHRcdFx0ZVZhbHVlUHJlLmFyZ3MuZm9yRWFjaChhcmcgPT4geyBhcmcub2tUb05vdFVzZSA9IHRydWUgfSlcblx0XHRcdFx0ZVZhbHVlTmFtZWQgPSBlVmFsdWVQcmVcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0ZVZhbHVlTmFtZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoZVZhbHVlUHJlLCBuYW1lKVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRlVmFsdWVOYW1lZCA9IGVWYWx1ZVByZVxuXG5cdFx0Y29uc3QgaXNZaWVsZCA9IGsgPT09IEtXX1lpZWxkIHx8IGsgPT09IEtXX1lpZWxkVG9cblxuXHRcdGNvbnN0IGVWYWx1ZSA9IF92YWx1ZUZyb21Bc3NpZ24oZVZhbHVlTmFtZWQsIGspXG5cblx0XHRpZiAoaXNFbXB0eShsb2NhbHMpKSB7XG5cdFx0XHRjeC5jaGVjayhpc1lpZWxkLCBhc3NpZ25lZC5sb2MsICdBc3NpZ25tZW50IHRvIG5vdGhpbmcnKVxuXHRcdFx0cmV0dXJuIGVWYWx1ZVxuXHRcdH1cblxuXHRcdGlmIChpc1lpZWxkKVxuXHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PlxuXHRcdFx0XHRjeC5jaGVjayghXy5pc0xhenksIF8ubG9jLCAnQ2FuIG5vdCB5aWVsZCB0byBsYXp5IHZhcmlhYmxlLicpKVxuXG5cdFx0aWYgKGsgPT09IEtXX09iakFzc2lnbilcblx0XHRcdGxvY2Fscy5mb3JFYWNoKGwgPT4geyBsLm9rVG9Ob3RVc2UgPSB0cnVlIH0pXG5cblx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0Y29uc3QgYXNzaWduID0gQXNzaWduKGxvYywgbG9jYWxzWzBdLCBrLCBlVmFsdWUpXG5cdFx0XHRjb25zdCBpc1Rlc3QgPSBhc3NpZ24uYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRyZXR1cm4gaXNUZXN0ICYmIGsgPT09IEtXX09iakFzc2lnbiA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmlzTGF6eSwgXy5sb2MsXG5cdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBrLCBlVmFsdWUsIGlzTGF6eSlcblx0XHR9XG5cdH0sXG5cblx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdHN3aXRjaCAoa0Fzc2lnbikge1xuXHRcdFx0Y2FzZSBLV19ZaWVsZDpcblx0XHRcdFx0cmV0dXJuIFlpZWxkKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRjYXNlIEtXX1lpZWxkVG86XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIGRpc3BsYXlOYW1lIGlmOlxuXHQvLyAuIEl0J3MgYSBibG9ja1xuXHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGF0IHRoZSBlbmQgb2YgYSBibG9ja1xuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGFzIHRoZSBlbmQgbWVtYmVyIG9mIGEgY2FsbC5cblx0X3RyeUFkZERpc3BsYXlOYW1lID0gKGVWYWx1ZVByZSwgZGlzcGxheU5hbWUpID0+IHtcblx0XHRzd2l0Y2ggKHRydWUpIHtcblx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgQ2FsbCAmJiBlVmFsdWVQcmUuYXJncy5sZW5ndGggPiAwOlxuXHRcdFx0XHQvLyBUT0RPOiBJbW11dGFibGVcblx0XHRcdFx0ZVZhbHVlUHJlLmFyZ3NbZVZhbHVlUHJlLmFyZ3MubGVuZ3RoIC0gMV0gPVxuXHRcdFx0XHRcdF90cnlBZGREaXNwbGF5TmFtZShsYXN0KGVWYWx1ZVByZS5hcmdzKSwgZGlzcGxheU5hbWUpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBGdW46XG5cdFx0XHRcdHJldHVybiBPYmpSZXR1cm4oZVZhbHVlUHJlLmxvYywgW10sIFtdLCBzb21lKGVWYWx1ZVByZSksIHNvbWUoZGlzcGxheU5hbWUpKVxuXG5cdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIE9ialJldHVybiAmJlxuXHRcdFx0XHQhZVZhbHVlUHJlLmtleXMuc29tZShrZXkgPT4ga2V5Lm5hbWUgPT09ICdkaXNwbGF5TmFtZScpOlxuXHRcdFx0XHRlVmFsdWVQcmUub3BEaXNwbGF5TmFtZSA9IHNvbWUoZGlzcGxheU5hbWUpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBCbG9ja1dyYXA6IHtcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSBlVmFsdWVQcmUuYmxvY2tcblx0XHRcdFx0YmxvY2sucmV0dXJuZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoYmxvY2sucmV0dXJuZWQsIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0XHR9XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdC8vIFRPRE86IGluZGV4IEZpbGxlZCBpbiBieSA/Pz9cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpLCAtMSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHQgPT4ge1xuXHRcdGxldCBuYW1lXG5cdFx0bGV0IG9wVHlwZSA9IE5vbmVcblx0XHRsZXQgaXNMYXp5ID0gZmFsc2VcblxuXHRcdGlmIChHcm91cC5pc1NwYWNlZCh0KSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodClcblx0XHRcdGxldCByZXN0ID0gdG9rZW5zXG5cdFx0XHRpZiAoS2V5d29yZC5pc0xhenkodG9rZW5zLmhlYWQoKSkpIHtcblx0XHRcdFx0aXNMYXp5ID0gdHJ1ZVxuXHRcdFx0XHRyZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdFx0fVxuXHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdGlmICghcmVzdDIuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdGN4LmNoZWNrKEtleXdvcmQuaXNUeXBlKGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRjaGVja05vbkVtcHR5KHRva2Vuc1R5cGUsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbn1gKVxuXHRcdFx0XHRvcFR5cGUgPSBzb21lKHBhcnNlU3BhY2VkKHRva2Vuc1R5cGUpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHQpXG5cblx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHQubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSwgZmFsc2UpXG5cdH1cblxuLy8gcGFyc2VMb2NhbERlY2xhcmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUxvY2FsTmFtZSA9IHQgPT4ge1xuXHRcdGlmIChLZXl3b3JkLmlzRm9jdXModCkpXG5cdFx0XHRyZXR1cm4gJ18nXG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3R9YClcblx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRjeC5jaGVjayghSnNHbG9iYWxzLmhhcyh0Lm5hbWUpLCB0LmxvYywgKCkgPT5cblx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZVNpbmdsZSA9IHQgPT4ge1xuXHRzd2l0Y2ggKHRydWUpIHtcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBOYW1lOlxuXHRcdFx0cmV0dXJuIF9hY2Nlc3ModC5uYW1lLCB0LmxvYylcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBHcm91cDpcblx0XHRcdHN3aXRjaCAodC5rKSB7XG5cdFx0XHRcdGNhc2UgR19TcGFjZTogcmV0dXJuIHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKHQpKVxuXHRcdFx0XHRjYXNlIEdfUGFyZW46IHJldHVybiBwYXJzZUV4cHIoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRcdGNhc2UgR19CcmFja2V0OiByZXR1cm4gTGlzdFNpbXBsZSh0LmxvYywgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKVxuXHRcdFx0XHRjYXNlIEdfQmxvY2s6IHJldHVybiBibG9ja1dyYXAoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRcdGNhc2UgR19RdW90ZTpcblx0XHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0XHR0LnRva2Vucy5tYXAoXyA9PiAodHlwZW9mIF8gPT09ICdzdHJpbmcnKSA/IF8gOiBwYXJzZVNpbmdsZShfKSkpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0fVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIFRva2VuTnVtYmVyTGl0ZXJhbDpcblx0XHRcdHJldHVybiBOdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIENhbGxPbkZvY3VzOlxuXHRcdFx0cmV0dXJuIENhbGwodC5sb2MsIF9hY2Nlc3ModC5uYW1lLCB0LmxvYyksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgS2V5d29yZDpcblx0XHRcdGlmICh0LmsgPT09IEtXX0ZvY3VzKVxuXHRcdFx0XHRyZXR1cm4gTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3Qgc3AgPSBvcEtXdG9TUCh0LmspXG5cdFx0XHRcdGlmIChzcCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsKHQubG9jLCBzcClcblx0XHRcdH1cblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBEb3ROYW1lOlxuXHRcdFx0aWYgKHQubkRvdHMgPT09IDMpXG5cdFx0XHRcdHJldHVybiBTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRkZWZhdWx0OlxuXHRcdFx0dW5leHBlY3RlZCh0KVxuXHR9XG59XG4vLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuY29uc3QgX2FjY2VzcyA9IChuYW1lLCBsb2MpID0+XG5cdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuY29uc3QgcGFyc2VTcGFjZWQgPSB0b2tlbnMgPT4ge1xuXHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0aWYgKEtleXdvcmQuaXNUeXBlKGgpKSB7XG5cdFx0Y29uc3QgZVR5cGUgPSBwYXJzZVNwYWNlZChyZXN0KVxuXHRcdGNvbnN0IGZvY3VzID0gTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpXG5cdFx0cmV0dXJuIENhbGwuY29udGFpbnMoaC5sb2MsIGVUeXBlLCBmb2N1cylcblx0fSBlbHNlIGlmIChLZXl3b3JkLmlzTGF6eShoKSlcblx0XHRyZXR1cm4gTGF6eShoLmxvYywgcGFyc2VTcGFjZWQocmVzdCkpXG5cdGVsc2Uge1xuXHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdGNvbnN0IGxvYyA9IHQubG9jXG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgdG9rZW5zLmxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0cmV0dXJuIE1lbWJlcih0b2tlbnMubG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHR9IGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRpZiAodC5rID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdHVuc2hpZnQoZSwgcGFyc2VFeHByUGFydHMoU2xpY2UuZ3JvdXAodCkpKSlcblx0XHRcdFx0aWYgKHQuayA9PT0gR19QYXJlbikge1xuXHRcdFx0XHRcdGNoZWNrRW1wdHkoU2xpY2UuZ3JvdXAodCksXG5cdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGUsIFtdKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgY3guZmFpbCh0b2tlbnMubG9jLCBgRXhwZWN0ZWQgbWVtYmVyIG9yIHN1Yiwgbm90ICR7dH1gKVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdC5yZWR1Y2UobWVtYmVyT3JTdWJzY3JpcHQsIHBhcnNlU2luZ2xlKGgpKVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSBTbGljZS5ncm91cCh0b2tlbnMuaGVhZCgpKVxuXHRcdGlmIChLZXl3b3JkLmlzKGspKGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICgpID0+YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZShrKX0gb3RoZXIgdGhhbiBhIGJsb2NrYClcblx0XHRyZXR1cm4gbGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0Y29uc3QgdFJlcSA9IGxpbmUudG9rZW5zWzBdXG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblx0XHRcdGlmIChrID09PSBLV19Vc2VEbykge1xuXHRcdFx0XHRpZiAobGluZS50b2tlbnMubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR1bmV4cGVjdGVkKGxpbmUudG9rZW5zWzFdKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obGluZS5sb2MsIHBhdGgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBrID09PSBLV19Vc2VMYXp5IHx8IGsgPT09IEtXX1VzZURlYnVnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBTbGljZS5ncm91cChsaW5lKS50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBVc2UobGluZS5sb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlKHRva2Vucy5sb2MsIG5hbWUsIE5vbmUsIGlzTGF6eSwgZmFsc2UpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbXSwgb3BVc2VEZWZhdWx0OiBzb21lKHVzZURlZmF1bHQoKSkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaGFzRGVmYXVsdFVzZSA9IEtleXdvcmQuaXNGb2N1cyh0b2tlbnMuaGVhZCgpKVxuXHRcdFx0Y29uc3Qgb3BVc2VEZWZhdWx0ID0gb3BJZihoYXNEZWZhdWx0VXNlLCB1c2VEZWZhdWx0KVxuXHRcdFx0Y29uc3QgcmVzdCA9IGhhc0RlZmF1bHRVc2UgPyB0b2tlbnMudGFpbCgpIDogdG9rZW5zXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y3guY2hlY2sobC5uYW1lICE9PSAnXycsIGwucG9zLFxuXHRcdFx0XHRcdCgpID0+IGAke2NvZGUoJ18nKX0gbm90IGFsbG93ZWQgYXMgaW1wb3J0IG5hbWUuYClcblx0XHRcdFx0bC5pc0xhenkgPSBpc0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhHcm91cC5pc1NwYWNlZCh0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDEsIHQubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGF0aDogcGFydHMuam9pbignLycpLFxuXHRcdFx0bmFtZTogdG9rZW5zLmxhc3QoKS5uYW1lXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=