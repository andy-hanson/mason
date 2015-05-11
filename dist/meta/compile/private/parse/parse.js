if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/Op', '../U/util', './Slice'], function (exports, module, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _Slice) {
	'use strict';

	module.exports = parse;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

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

			const keysVals = {};
			for (let i = 0; i < splits.length - 1; i = i + 1) {
				const local = parseLocalDeclare(splits[i].before.last());
				// Can't have got a type because there's only one token.
				_UUtil.assert(_UBag.isEmpty(local.opType));
				const tokensValue = i === splits.length - 2 ? splits[i + 1].before : splits[i + 1].before.rtail();
				const value = parseExprPlain(tokensValue);
				cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
					return 'Duplicate property ' + local + '.';
				});
				Object.defineProperty(keysVals, local.name, { value: value });
			}
			_UUtil.assert(_UBag.last(splits).at === undefined);
			const val = _Expression.ObjSimple(tokens.loc, keysVals);
			if (tokensCaller.isEmpty()) return val;else {
				const parts = parseExprParts(tokensCaller);
				_UUtil.assert(!_UBag.isEmpty(parts));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFtQndCLEtBQUs7Ozs7Ozs7O0FBRjdCLEtBQUksRUFBRSxDQUFBOztBQUVTLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBUFEsTUFBTSxDQU9QLE9BZHVCLEtBQUssQ0FjdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDaEMsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTs7O3NCQUVILFlBQVksUUF4QnNDLFFBQVEsRUF3Qm5DLE1BQU0sQ0FBQzs7OztRQUFoRCxNQUFNO1FBQUUsS0FBSzs7dUJBQ1EsWUFBWSxRQXpCYyxNQUFNLEVBeUJYLEtBQUssQ0FBQzs7OztRQUFoRCxTQUFTO1FBQUUsS0FBSzs7dUJBQ0ksWUFBWSxRQXpCeEMsVUFBVSxFQXlCMkMsS0FBSyxDQUFDOzs7O1FBQW5ELFFBQVE7UUFBRSxL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Q0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQUEsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi8uLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBCbG9ja0RvLCBCbG9ja1ZhbCwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCxcblx0Q2FzZURvLCBDYXNlVmFsLCBEZWJ1ZywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExpc3RFbnRyeSwgTGlzdFJldHVybixcblx0TGlzdFNpbXBsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlLCBMb29wLCBNYXBFbnRyeSwgTWFwUmV0dXJuLCBNZW1iZXIsIE1vZHVsZSxcblx0TW9kdWxlRGVmYXVsdEV4cG9ydCwgT2JqUmV0dXJuLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2VEbywgVXNlLFxuXHRZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uLy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsXG5cdEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsIFRva2VuTnVtYmVyTGl0ZXJhbCwgTmFtZSwgb3BLV3RvU1AsXG5cdEtXX0Nhc2UsIEtXX0Nhc2VEbywgS1dfRGVidWcsIEtXX0RlYnVnZ2VyLCBLV19FbmRMb29wLCBLV19Gb2N1cywgS1dfRnVuLCBLV19HZW5GdW4sIEtXX0luLFxuXHRLV19Mb29wLCBLV19NYXBFbnRyeSwgS1dfT2JqQXNzaWduLCBLV19PdXQsIEtXX1JlZ2lvbiwgS1dfVXNlLCBLV19Vc2VEZWJ1ZywgS1dfVXNlRG8sXG5cdEtXX1VzZUxhenksIEtXX1lpZWxkLCBLV19ZaWVsZFRvIH0gZnJvbSAnLi4vVG9rZW4nXG5pbXBvcnQgeyBjYXQsIGhlYWQsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgTm9uZSwgb3BJZiwgc29tZSB9IGZyb20gJy4uL1UvT3AnXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi9VL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9TbGljZSdcblxubGV0IGN4XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKF9jeCwgcm9vdFRva2VuKSB7XG5cdGN4ID0gX2N4XG5cdGFzc2VydChHcm91cC5pc0Jsb2NrKHJvb3RUb2tlbikpXG5cdHJldHVybiBwYXJzZU1vZHVsZShTbGljZS5ncm91cChyb290VG9rZW4pKVxufVxuXG5jb25zdFxuXHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0Y2hlY2tOb25FbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2soIXRva2Vucy5pc0VtcHR5KCksIHRva2Vucy5sb2MsIG1lc3NhZ2UpLFxuXHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuY29uc3QgcGFyc2VNb2R1bGUgPSB0b2tlbnMgPT4ge1xuXHQvLyB0cnlQYXJzZVVzZXMgbW92ZXMgdG9rZW5zIGZvcndhcmRcblx0Y29uc3QgWyBkb1VzZXMsIHJlc3QwIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRG8sIHRva2Vucylcblx0Y29uc3QgWyBwbGFpblVzZXMsIHJlc3QxIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlLCByZXN0MClcblx0Y29uc3QgWyBsYXp5VXNlcywgcmVzdDIgXSA9IHRyeVBhcnNlVXNlcyhLV19Vc2VMYXp5LCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoS1dfVXNlRGVidWcsIHJlc3QyKVxuXHRjb25zdCBibG9jayA9IHBhcnNlTW9kdWxlQm9keShyZXN0Mylcblx0YmxvY2subGluZXMuZm9yRWFjaChsaW5lID0+IHtcblx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmsgPT09ICdleHBvcnQnKVxuXHRcdFx0Y3guY2hlY2sobGluZS5hc3NpZ25lZS5uYW1lICE9PSAnZGlzcGxheU5hbWUnLCBsaW5lLmFzc2lnbmVlLmxvYyxcblx0XHRcdFx0J01vZHVsZSBjYW4gbm90IGNob29zZSBpdHMgb3duIGRpc3BsYXlOYW1lLicpXG5cdH0pXG5cdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkpXG5cdFx0YmxvY2subGluZXMucHVzaChcblx0XHRcdEFzc2lnbihcblx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0TG9jYWxEZWNsYXJlKHRva2Vucy5sb2MsICdkaXNwbGF5TmFtZScsIFtdLCBmYWxzZSwgdHJ1ZSksXG5cdFx0XHRcdCdleHBvcnQnLFxuXHRcdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgYmxvY2spXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCb2R5RG8oX2p1c3RCbG9jayh0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gdG9rZW5zID0+IHBhcnNlQm9keVZhbChfanVzdEJsb2NrKHRva2VucykpLFxuXG5cdC8vIFRPRE86IEp1c3QgaGF2ZSBtb2R1bGUgcmV0dXJuIGEgdmFsdWUgYW5kIHVzZSBhIG5vcm1hbCBibG9jay5cblx0cGFyc2VNb2R1bGVCb2R5ID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnbW9kdWxlJywgdG9rZW5zKSxcblxuXHRwYXJzZUJsb2NrRnJvbUxpbmVzID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnYW55JywgdG9rZW5zKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQm9keURvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gJ3BsYWluJywgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGVMaW5lcylcblx0fSxcblx0cGFyc2VCb2R5VmFsID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdF9wYXJzZUJsb2NrQm9keSA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRhc3NlcnQoayA9PT0gJ3ZhbCcgfHwgayA9PT0gJ21vZHVsZScgfHwgayA9PT0gJ2FueScpXG5cblx0XHQvLyBrZXlzIG9ubHkgbWF0dGVyIGlmIGtSZXR1cm4gPT09ICdvYmonXG5cdFx0Y29uc3QgeyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH0gPVxuXHRcdFx0X3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cblx0XHRjb25zdCB7IGRvTGluZXMsIG9wUmV0dXJuIH0gPSAoKCkgPT4ge1xuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdiYWcnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRvcFJldHVybjogc29tZShMaXN0UmV0dXJuKHRva2Vucy5sb2MsIGxpc3RMZW5ndGgpKVxuXHRcdFx0XHR9XG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ21hcCcpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE1hcFJldHVybih0b2tlbnMubG9jLCBtYXBMZW5ndGgpKVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxhc3RSZXR1cm4gPSAhaXNFbXB0eShlTGluZXMpICYmIGxhc3QoZUxpbmVzKSBpbnN0YW5jZW9mIFZhbFxuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdvYmonICYmIGsgIT09ICdtb2R1bGUnKVxuXHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogcnRhaWwoZUxpbmVzKSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRzb21lKGxhc3QoZUxpbmVzKSksXG5cdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0fSA6IHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHROb25lLFxuXHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHR7IGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoZUxpbmVzKSkgfSA6XG5cdFx0XHRcdHsgZG9MaW5lczogZUxpbmVzLCBvcFJldHVybjogTm9uZSB9XG5cdFx0fSkoKVxuXG5cdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRjYXNlICd2YWwnOlxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHQoKSA9PiBjeC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpKVxuXHRcdFx0Y2FzZSAnYW55Jzpcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBkb0xpbmVzKSlcblx0XHRcdGNhc2UgJ21vZHVsZSc6IHtcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGRlYnVnLW9ubHkgZXhwb3J0c1xuXHRcdFx0XHRjb25zdCBsaW5lcyA9XG5cdFx0XHRcdFx0Ly8gVHVybiBPYmogYXNzaWducyBpbnRvIGV4cG9ydHMuXG5cdFx0XHRcdFx0Y2F0KFxuXHRcdFx0XHRcdFx0ZG9MaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0XHRcdFx0XHRcdGxpbmUuayA9ICdleHBvcnQnXG5cdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuLm1hcChyZXQgPT4gTW9kdWxlRGVmYXVsdEV4cG9ydChyZXQubG9jLCByZXQpKSlcblx0XHRcdFx0cmV0dXJuIEJsb2NrRG8odG9rZW5zLmxvYywgbGluZXMpXG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3Ioaylcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlQmxvY2tMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBvYmpLZXlzID0gW10sIGRlYnVnS2V5cyA9IFtdXG5cdFx0bGV0IGxpc3RMZW5ndGggPSAwLCBtYXBMZW5ndGggPSAwXG5cdFx0Y29uc3QgZUxpbmVzID0gW11cblx0XHRjb25zdCBhZGRMaW5lID0gKGxuLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRpZiAobG4gaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0bG4uZm9yRWFjaChfID0+IGFkZExpbmUoXywgaW5EZWJ1ZykpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxuIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdFx0bG4ubGluZXMuZm9yRWFjaChfID0+IGFkZExpbmUoXywgdHJ1ZSkpXG5cdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdFx0YXNzZXJ0KCFpbkRlYnVnLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0XHQvLyBXaGVuIExpc3RFbnRyaWVzIGFyZSBmaXJzdCBjcmVhdGVkIHRoZXkgaGF2ZSBubyBpbmRleC5cblx0XHRcdFx0XHRhc3NlcnQobG4uaW5kZXggPT09IC0xKVxuXHRcdFx0XHRcdGxuLmluZGV4ID0gbGlzdExlbmd0aFxuXHRcdFx0XHRcdGxpc3RMZW5ndGggPSBsaXN0TGVuZ3RoICsgMVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdFx0YXNzZXJ0KGxuLmluZGV4ID09PSAtMSlcblx0XHRcdFx0XHRsbi5pbmRleCA9IG1hcExlbmd0aFxuXHRcdFx0XHRcdG1hcExlbmd0aCA9IG1hcExlbmd0aCArIDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsbi5rID09PSBLV19PYmpBc3NpZ24pXG5cdFx0XHRcdFx0KGluRGVidWcgPyBkZWJ1Z0tleXMgOiBvYmpLZXlzKS5wdXNoKGxuLmFzc2lnbmVlKVxuXG5cdFx0XHRcdGlmICghaW5EZWJ1Zylcblx0XHRcdFx0XHQvLyBFbHNlIHdlIGFyZSBhZGRpbmcgdGhlIERlYnVnIGFzIGEgc2luZ2xlIGxpbmUuXG5cdFx0XHRcdFx0ZUxpbmVzLnB1c2gobG4pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxpbmVzLmVhY2gobGluZSA9PiBhZGRMaW5lKHBhcnNlTGluZShTbGljZS5ncm91cChsaW5lKSkpKVxuXG5cdFx0Y29uc3QgaXNPYmogPSAhKGlzRW1wdHkob2JqS2V5cykgJiYgaXNFbXB0eShkZWJ1Z0tleXMpKVxuXHRcdC8vIFRPRE9cblx0XHQvLyBpZiAoaXNFbXB0eShvYmpLZXlzKSlcblx0XHQvL1x0Y3guY2hlY2soaXNFbXB0eShkZWJ1Z0tleXMpLCBsaW5lcy5sb2MsICdCbG9jayBjYW4ndCBoYXZlIG9ubHkgZGVidWcga2V5cycpXG5cdFx0Y29uc3QgaXNCYWcgPSBsaXN0TGVuZ3RoID4gMFxuXHRcdGNvbnN0IGlzTWFwID0gbWFwTGVuZ3RoID4gMFxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdGN4LmNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCBsaW5lcy5sb2MsICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0Y29uc3Qga1JldHVybiA9IGlzT2JqID8gJ29iaicgOiBpc0JhZyA/ICdiYWcnIDogaXNNYXAgPyAnbWFwJyA6ICdwbGFpbidcblx0XHRyZXR1cm4geyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH1cblx0fVxuXG5jb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuLCB0b2tlbnMpID0+IHtcblx0Y29uc3QgaXNWYWwgPSBrID09PSBLV19DYXNlXG5cblx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cblx0bGV0IG9wQ2FzZWRcblx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdGNoZWNrRW1wdHkoYmVmb3JlLCAnQ2FuXFwndCBtYWtlIGZvY3VzIC0tIGlzIGltcGxpY2l0bHkgcHJvdmlkZWQgYXMgZmlyc3QgYXJndW1lbnQuJylcblx0XHRvcENhc2VkID0gTm9uZVxuXHR9IGVsc2Vcblx0XHRvcENhc2VkID0gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT4gQXNzaWduLmZvY3VzKGJlZm9yZS5sb2MsIHBhcnNlRXhwcihiZWZvcmUpKSlcblxuXHRjb25zdCBsYXN0TGluZSA9IFNsaWNlLmdyb3VwKGJsb2NrLmxhc3QoKSlcblx0Y29uc3QgWyBwYXJ0TGluZXMsIG9wRWxzZSBdID0gS2V5d29yZC5pc0Vsc2UobGFzdExpbmUuaGVhZCgpKSA/XG5cdFx0WyBibG9jay5ydGFpbCgpLCBzb21lKChpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKShsYXN0TGluZS50YWlsKCkpKSBdIDpcblx0XHRbIGJsb2NrLCBOb25lIF1cblxuXHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0bGluZSA9IFNsaWNlLmdyb3VwKGxpbmUpXG5cdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayhsaW5lKVxuXHRcdGNvbnN0IHRlc3QgPSBfcGFyc2VDYXNlVGVzdChiZWZvcmUpXG5cdFx0Y29uc3QgcmVzdWx0ID0gKGlzVmFsID8gcGFyc2VCb2R5VmFsIDogcGFyc2VCb2R5RG8pKGJsb2NrKVxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCByZXN1bHQpXG5cdH0pXG5cdGN4LmNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsIHRva2Vucy5sb2MsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykodG9rZW5zLmxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcbn1cbi8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlQ2FzZVRlc3QgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdC8vIFBhdHRlcm4gbWF0Y2ggc3RhcnRzIHdpdGggdHlwZSB0ZXN0IGFuZCBpcyBmb2xsb3dlZCBieSBsb2NhbCBkZWNsYXJlcy5cblx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdGNvbnN0IGZ0ID0gU2xpY2UuZ3JvdXAoZmlyc3QpXG5cdFx0XHRpZiAoS2V5d29yZC5pc1R5cGUoZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gcGFyc2VTcGFjZWQoZnQudGFpbCgpKVxuXHRcdFx0XHRjb25zdCBsb2NhbHMgPSBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFBhdHRlcm4oZmlyc3QubG9jLCB0eXBlLCBsb2NhbHMsIExvY2FsQWNjZXNzLmZvY3VzKHRva2Vucy5sb2MpKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGFyc2VFeHByKHRva2Vucylcblx0fVxuXG5jb25zdFxuXHRwYXJzZUV4cHIgPSB0b2tlbnMgPT4ge1xuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRjb25zdCBrZXlzVmFscyA9IHt9XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdGNvbnN0IGxvY2FsID0gcGFyc2VMb2NhbERlY2xhcmUoc3BsaXRzW2ldLmJlZm9yZS5sYXN0KCkpXG5cdFx0XHRcdFx0Ly8gQ2FuJ3QgaGF2ZSBnb3QgYSB0eXBlIGJlY2F1c2UgdGhlcmUncyBvbmx5IG9uZSB0b2tlbi5cblx0XHRcdFx0XHRhc3NlcnQoaXNFbXB0eShsb2NhbC5vcFR5cGUpKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcGFyc2VFeHByUGxhaW4odG9rZW5zVmFsdWUpXG5cdFx0XHRcdFx0Y3guY2hlY2soIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChrZXlzVmFscywgbG9jYWwubmFtZSksXG5cdFx0XHRcdFx0XHRsb2NhbC5sb2MsICgpID0+IGBEdXBsaWNhdGUgcHJvcGVydHkgJHtsb2NhbH0uYClcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5c1ZhbHMsIGxvY2FsLm5hbWUsIHsgdmFsdWUgfSlcblx0XHRcdFx0fVxuXHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZSh0b2tlbnMubG9jLCBrZXlzVmFscylcblx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vuc0NhbGxlcilcblx0XHRcdFx0XHRhc3NlcnQoIWlzRW1wdHkocGFydHMpKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGhlYWQocGFydHMpLCBwdXNoKHRhaWwocGFydHMpLCB2YWwpKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4gcGFyc2VFeHByUGxhaW4odG9rZW5zKVxuXHRcdClcblx0fSxcblxuXHRwYXJzZUV4cHJQYXJ0cyA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRmb3IgKGxldCBpID0gdG9rZW5zLnN0YXJ0OyBpIDwgdG9rZW5zLmVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdGlmIChoZXJlIGluc3RhbmNlb2YgS2V5d29yZCkge1xuXHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9jaG9wU3RhcnQoaSArIDEpXG5cdFx0XHRcdHN3aXRjaCAoaGVyZS5rKSB7XG5cdFx0XHRcdFx0Y2FzZSBLV19GdW46IGNhc2UgS1dfR2VuRnVuOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmsgPT09IEtXX0dlbkZ1biwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX0Nhc2U6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZShLV19DYXNlLCBmYWxzZSwgcmVzdCgpKSlcblx0XHRcdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZCh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCgpKSkpXG5cdFx0XHRcdFx0Y2FzZSBLV19ZaWVsZFRvOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZFRvKHRva2Vucy5sb2MsIHBhcnNlRXhwcihyZXN0KCkpKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0fVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRwYXJzZUV4cHJQbGFpbiA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cyh0b2tlbnMpXG5cdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0cmV0dXJuIEdsb2JhbEFjY2Vzcy5udWxsKHRva2Vucy5sb2MpXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdH1cblx0fVxuXG5jb25zdCBwYXJzZUZ1biA9IChpc0dlbmVyYXRvciwgdG9rZW5zKSA9PiB7XG5cdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUodG9rZW5zKVxuXHRjaGVja05vbkVtcHR5KHJlc3QsICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jay5gKVxuXHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSBfZnVuQXJnc0FuZEJsb2NrKHJlc3QpXG5cdC8vIE5lZWQgcmVzIGRlY2xhcmUgaWYgdGhlcmUgaXMgYSByZXR1cm4gdHlwZSBvciBvdXQgY29uZGl0aW9uLlxuXHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdHJ0ID0+IHNvbWUoTG9jYWxEZWNsYXJlLnJlcyhydC5sb2MsIG9wUmV0dXJuVHlwZSkpLFxuXHRcdCgpID0+IG9wT3V0Lm1hcChvID0+IExvY2FsRGVjbGFyZS5yZXMoby5sb2MsIG9wUmV0dXJuVHlwZSkpKVxuXHRyZXR1cm4gRnVuKHRva2Vucy5sb2MsIGlzR2VuZXJhdG9yLCBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcFJlc0RlY2xhcmUsIG9wT3V0KVxufVxuXG4vLyBwYXJzZUZ1biBwcml2YXRlc1xuY29uc3Rcblx0X3RyeVRha2VSZXR1cm5UeXBlID0gdG9rZW5zID0+IHtcblx0XHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoaCkgJiYgS2V5d29yZC5pc1R5cGUoaGVhZChoLnRva2VucykpKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdG9wUmV0dXJuVHlwZTogc29tZShwYXJzZVNwYWNlZChTbGljZS5ncm91cChoKS50YWlsKCkpKSxcblx0XHRcdFx0XHRyZXN0OiB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHsgb3BSZXR1cm5UeXBlOiBOb25lLCByZXN0OiB0b2tlbnMgfVxuXHR9LFxuXG5cdF9mdW5BcmdzQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Ly8gTWlnaHQgYmUgYHxjYXNlYFxuXHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZCAmJiAoaC5rID09PSBLV19DYXNlIHx8IGguayA9PT0gS1dfQ2FzZURvKSkge1xuXHRcdFx0Y29uc3QgZUNhc2UgPSBwYXJzZUNhc2UoaC5rLCB0cnVlLCB0b2tlbnMudGFpbCgpKVxuXHRcdFx0Y29uc3QgYXJncyA9IFsgTG9jYWxEZWNsYXJlLmZvY3VzKGgubG9jKSBdXG5cdFx0XHRyZXR1cm4gaC5rID09PSBLV19DYXNlID9cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogTm9uZSwgb3BJbjogTm9uZSwgb3BPdXQ6IE5vbmUsXG5cdFx0XHRcdFx0YmxvY2s6IEJsb2NrVmFsKHRva2Vucy5sb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdH0gOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRibG9jazogQmxvY2tEbyh0b2tlbnMubG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgWyBiZWZvcmUsIGJsb2NrIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZyB9ID0gX3BhcnNlRnVuTG9jYWxzKGJlZm9yZSlcblx0XHRcdGNvbnN0IFsgb3BJbiwgcmVzdDAgXSA9IF90cnlUYWtlSW5Pck91dChLV19JbiwgYmxvY2spXG5cdFx0XHRjb25zdCBbIG9wT3V0LCByZXN0MSBdID0gX3RyeVRha2VJbk9yT3V0KEtXX091dCwgcmVzdDApXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiBwYXJzZUJsb2NrRnJvbUxpbmVzKHJlc3QxKSwgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogTm9uZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogc29tZShMb2NhbERlY2xhcmUobC5sb2MsIGwubmFtZSwgTm9uZSwgZmFsc2UsIGZhbHNlKSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkoaGVhZChmaXJzdExpbmUudG9rZW5zKSkpIHtcblx0XHRcdFx0Y29uc3QgaW5PdXQgPSBEZWJ1Zyhcblx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soU2xpY2UuZ3JvdXAoZmlyc3RMaW5lKSkpXG5cdFx0XHRcdHJldHVybiBbIHNvbWUoaW5PdXQpLCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgTm9uZSwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoLmspIHtcblx0XHRcdFx0Y2FzZSBLV19PYmpBc3NpZ246XG5cdFx0XHRcdFx0Ly8gSW5kZXggaXMgc2V0IGJ5IHBhcnNlQmxvY2suXG5cdFx0XHRcdFx0cmV0dXJuIExpc3RFbnRyeSh0b2tlbnMubG9jLCBwYXJzZUV4cHIocmVzdCksIC0xKVxuXHRcdFx0XHRjYXNlIEtXX0Nhc2VEbzpcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VDYXNlKEtXX0Nhc2VEbywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWc6XG5cdFx0XHRcdFx0cmV0dXJuIERlYnVnKHRva2Vucy5sb2ssXG5cdFx0XHRcdFx0XHRHcm91cC5pc0Jsb2NrKHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0cGFyc2VMaW5lc0Zyb21CbG9jaygpIDpcblx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdHBhcnNlTGluZU9yTGluZXMocmVzdCkpXG5cdFx0XHRcdGNhc2UgS1dfRGVidWdnZXI6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwuZGVidWdnZXIodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSBLV19FbmRMb29wOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBFbmRMb29wKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgS1dfTG9vcDpcblx0XHRcdFx0XHRyZXR1cm4gTG9vcCh0b2tlbnMubG9jLCBqdXN0QmxvY2tEbyhyZXN0KSlcblx0XHRcdFx0Y2FzZSBLV19SZWdpb246XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlTGluZXNGcm9tQmxvY2sodG9rZW5zKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0fVxuXG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0cmV0dXJuIGF0LmsgPT09IEtXX01hcEVudHJ5ID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUFzc2lnbiA9IChhc3NpZ25lZCwgYXNzaWduZXIsIHZhbHVlLCBsb2MpID0+IHtcblx0XHRsZXQgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGFzc2lnbmVkKVxuXHRcdGNvbnN0IGsgPSBhc3NpZ25lci5rXG5cdFx0Y29uc3QgZVZhbHVlUHJlID0gdmFsdWUuaXNFbXB0eSgpID8gR2xvYmFsQWNjZXNzLnRydWUodmFsdWUubG9jKSA6IHBhcnNlRXhwcih2YWx1ZSlcblxuXHRcdGxldCBlVmFsdWVOYW1lZFxuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBuYW1lID0gaGVhZChsb2NhbHMpLm5hbWVcblx0XHRcdGlmIChuYW1lID09PSAnZG9jJykge1xuXHRcdFx0XHRpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRcdC8vIEtMVURHRTogYGRvY2AgZm9yIG1vZHVsZSBjYW4gYmUgYSBGdW4gc2lnbmF0dXJlLlxuXHRcdFx0XHRcdC8vIFRPRE86IFNvbWV0aGluZyBiZXR0ZXIuLi5cblx0XHRcdFx0XHRlVmFsdWVQcmUuYXJncy5mb3JFYWNoKGFyZyA9PiB7IGFyZy5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXHRcdFx0XHRlVmFsdWVOYW1lZCA9IGVWYWx1ZVByZVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlVmFsdWVOYW1lZCA9IF90cnlBZGREaXNwbGF5TmFtZShlVmFsdWVQcmUsIG5hbWUpXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cblx0XHRjb25zdCBpc1lpZWxkID0gayA9PT0gS1dfWWllbGQgfHwgayA9PT0gS1dfWWllbGRUb1xuXG5cdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwgaylcblxuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGN4LmNoZWNrKGlzWWllbGQsIGFzc2lnbmVkLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gZVZhbHVlXG5cdFx0fVxuXG5cdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+XG5cdFx0XHRcdGN4LmNoZWNrKCFfLmlzTGF6eSwgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJykpXG5cblx0XHRpZiAoayA9PT0gS1dfT2JqQXNzaWduKVxuXHRcdFx0bG9jYWxzLmZvckVhY2gobCA9PiB7IGwub2tUb05vdFVzZSA9IHRydWUgfSlcblxuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBsb2NhbHNbMF0sIGssIGVWYWx1ZSlcblx0XHRcdGNvbnN0IGlzVGVzdCA9IGFzc2lnbi5hc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdHJldHVybiBpc1Rlc3QgJiYgayA9PT0gS1dfT2JqQXNzaWduID8gRGVidWcobG9jLCBbIGFzc2lnbiBdKSA6IGFzc2lnblxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGlzTGF6eSA9IGxvY2Fscy5zb21lKGwgPT4gbC5pc0xhenkpXG5cdFx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKF8uaXNMYXp5LCBfLmxvYyxcblx0XHRcdFx0XHQnSWYgYW55IHBhcnQgb2YgZGVzdHJ1Y3R1cmluZyBhc3NpZ24gaXMgbGF6eSwgYWxsIG11c3QgYmUuJykpXG5cdFx0XHRyZXR1cm4gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIGssIGVWYWx1ZSwgaXNMYXp5KVxuXHRcdH1cblx0fSxcblxuXHRfdmFsdWVGcm9tQXNzaWduID0gKHZhbHVlUHJlLCBrQXNzaWduKSA9PiB7XG5cdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRjYXNlIEtXX1lpZWxkOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGNhc2UgS1dfWWllbGRUbzpcblx0XHRcdFx0cmV0dXJuIFlpZWxkVG8odmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdH1cblx0fSxcblxuXHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdC8vIC4gSXQncyBhIGJsb2NrXG5cdC8vIC4gSXQncyBhIGZ1bmN0aW9uXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXMgdGhlIGVuZCBtZW1iZXIgb2YgYSBjYWxsLlxuXHRfdHJ5QWRkRGlzcGxheU5hbWUgPSAoZVZhbHVlUHJlLCBkaXNwbGF5TmFtZSkgPT4ge1xuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBDYWxsICYmIGVWYWx1ZVByZS5hcmdzLmxlbmd0aCA+IDA6XG5cdFx0XHRcdC8vIFRPRE86IEltbXV0YWJsZVxuXHRcdFx0XHRlVmFsdWVQcmUuYXJnc1tlVmFsdWVQcmUuYXJncy5sZW5ndGggLSAxXSA9XG5cdFx0XHRcdFx0X3RyeUFkZERpc3BsYXlOYW1lKGxhc3QoZVZhbHVlUHJlLmFyZ3MpLCBkaXNwbGF5TmFtZSlcblx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXG5cdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bjpcblx0XHRcdFx0cmV0dXJuIE9ialJldHVybihlVmFsdWVQcmUubG9jLCBbXSwgW10sIHNvbWUoZVZhbHVlUHJlKSwgc29tZShkaXNwbGF5TmFtZSkpXG5cblx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgT2JqUmV0dXJuICYmXG5cdFx0XHRcdCFlVmFsdWVQcmUua2V5cy5zb21lKGtleSA9PiBrZXkubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJyk6XG5cdFx0XHRcdGVWYWx1ZVByZS5vcERpc3BsYXlOYW1lID0gc29tZShkaXNwbGF5TmFtZSlcblx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXG5cdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEJsb2NrV3JhcDoge1xuXHRcdFx0XHRjb25zdCBibG9jayA9IGVWYWx1ZVByZS5ibG9ja1xuXHRcdFx0XHRibG9jay5yZXR1cm5lZCA9IF90cnlBZGREaXNwbGF5TmFtZShibG9jay5yZXR1cm5lZCwgZGlzcGxheU5hbWUpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHRcdH1cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyLCBsb2MpID0+XG5cdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdE1hcEVudHJ5KGxvYywgcGFyc2VFeHByKGJlZm9yZSksIHBhcnNlRXhwcihhZnRlciksIC0xKVxuXG5jb25zdFxuXHRwYXJzZUxvY2FsRGVjbGFyZXMgPSB0b2tlbnMgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0bGV0IG5hbWVcblx0XHRsZXQgb3BUeXBlID0gTm9uZVxuXHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5ncm91cCh0KVxuXHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdGlmIChLZXl3b3JkLmlzTGF6eSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc1R5cGUoY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHNvbWUocGFyc2VTcGFjZWQodG9rZW5zVHlwZSkpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5LCBmYWxzZSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKEtleXdvcmQuaXNGb2N1cyh0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dH1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PiB7XG5cdHN3aXRjaCAodHJ1ZSkge1xuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIE5hbWU6XG5cdFx0XHRyZXR1cm4gX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEdyb3VwOlxuXHRcdFx0c3dpdGNoICh0LmspIHtcblx0XHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRcdGNhc2UgR19QYXJlbjogcmV0dXJuIHBhcnNlRXhwcihTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBMaXN0U2ltcGxlKHQubG9jLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpXG5cdFx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIGJsb2NrV3JhcChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRcdHJldHVybiBRdW90ZSh0LmxvYyxcblx0XHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHR9XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgVG9rZW5OdW1iZXJMaXRlcmFsOlxuXHRcdFx0cmV0dXJuIE51bWJlckxpdGVyYWwodC5sb2MsIHQudmFsdWUpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXM6XG5cdFx0XHRyZXR1cm4gQ2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSwgWyBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgXSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0aWYgKHQuayA9PT0gS1dfRm9jdXMpXG5cdFx0XHRcdHJldHVybiBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYylcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBzcCA9IG9wS1d0b1NQKHQuaylcblx0XHRcdFx0aWYgKHNwID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwodC5sb2MsIHNwKVxuXHRcdFx0fVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIERvdE5hbWU6XG5cdFx0XHRpZiAodC5uRG90cyA9PT0gMylcblx0XHRcdFx0cmV0dXJuIFNwbGF0KHQubG9jLCBMb2NhbEFjY2Vzcyh0LmxvYywgdC5uYW1lKSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHR1bmV4cGVjdGVkKHQpXG5cdH1cbn1cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRpZiAoS2V5d29yZC5pc1R5cGUoaCkpIHtcblx0XHRjb25zdCBlVHlwZSA9IHBhcnNlU3BhY2VkKHJlc3QpXG5cdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHR9IGVsc2UgaWYgKEtleXdvcmQuaXNMYXp5KGgpKVxuXHRcdHJldHVybiBMYXp5KGgubG9jLCBwYXJzZVNwYWNlZChyZXN0KSlcblx0ZWxzZSB7XG5cdFx0Y29uc3QgbWVtYmVyT3JTdWJzY3JpcHQgPSAoZSwgdCkgPT4ge1xuXHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRjeC5jaGVjayh0Lm5Eb3RzID09PSAxLCB0b2tlbnMubG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdH0gZWxzZSBpZiAodCBpbnN0YW5jZW9mIEdyb3VwKSB7XG5cdFx0XHRcdGlmICh0LmsgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0dW5zaGlmdChlLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpKVxuXHRcdFx0XHRpZiAodC5rID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdCgpID0+IGBVc2UgJHtjb2RlKCcoYSBiKScpfSwgbm90ICR7Y29kZSgnYShiKScpfWApXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgZSwgW10pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBjeC5mYWlsKHRva2Vucy5sb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0fVxuXHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdH1cbn1cblxuY29uc3QgdHJ5UGFyc2VVc2VzID0gKGssIHRva2VucykgPT4ge1xuXHRpZiAoIXRva2Vucy5pc0VtcHR5KCkpIHtcblx0XHRjb25zdCBsaW5lMCA9IFNsaWNlLmdyb3VwKHRva2Vucy5oZWFkKCkpXG5cdFx0aWYgKEtleXdvcmQuaXMoaykobGluZTAuaGVhZCgpKSlcblx0XHRcdHJldHVybiBbIF9wYXJzZVVzZXMoaywgbGluZTAudGFpbCgpKSwgdG9rZW5zLnRhaWwoKSBdXG5cdH1cblx0cmV0dXJuIFsgWyBdLCB0b2tlbnMgXVxufVxuXG4vLyB0cnlQYXJzZVVzZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgbGluZXMgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgKCkgPT5gRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdHJldHVybiBsaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gbGluZS50b2tlbnNbMF1cblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09IEtXX1VzZURvKSB7XG5cdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQobGluZS50b2tlbnNbMV0pXG5cdFx0XHRcdHJldHVybiBVc2VEbyhsaW5lLmxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09IEtXX1VzZUxhenkgfHwgayA9PT0gS1dfVXNlRGVidWdcblx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0X3BhcnNlVGhpbmdzVXNlZChuYW1lLCBpc0xhenksIFNsaWNlLmdyb3VwKGxpbmUpLnRhaWwoKSlcblx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0sXG5cblx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenksIHRva2VucykgPT4ge1xuXHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUodG9rZW5zLmxvYywgbmFtZSwgTm9uZSwgaXNMYXp5LCBmYWxzZSlcblx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdHJldHVybiB7IHVzZWQ6IFtdLCBvcFVzZURlZmF1bHQ6IHNvbWUodXNlRGVmYXVsdCgpKSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBoYXNEZWZhdWx0VXNlID0gS2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpXG5cdFx0XHRjb25zdCBvcFVzZURlZmF1bHQgPSBvcElmKGhhc0RlZmF1bHRVc2UsIHVzZURlZmF1bHQpXG5cdFx0XHRjb25zdCByZXN0ID0gaGFzRGVmYXVsdFVzZSA/IHRva2Vucy50YWlsKCkgOiB0b2tlbnNcblx0XHRcdGNvbnN0IHVzZWQgPSBwYXJzZUxvY2FsRGVjbGFyZXMocmVzdCkubWFwKGwgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayhsLm5hbWUgIT09ICdfJywgbC5wb3MsXG5cdFx0XHRcdFx0KCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRsLmlzTGF6eSA9IGlzTGF6eVxuXHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9XG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZVJlcXVpcmUgPSB0ID0+IHtcblx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSBpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzU3BhY2VkKHQpLCB0LmxvYywgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRyZXR1cm4gX3BhcnNlTG9jYWxSZXF1aXJlKFNsaWNlLmdyb3VwKHQpKVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VMb2NhbFJlcXVpcmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdGxldCBwYXJ0c1xuXHRcdGlmIChmaXJzdCBpbnN0YW5jZW9mIERvdE5hbWUpXG5cdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3guY2hlY2soZmlyc3QgaW5zdGFuY2VvZiBOYW1lLCBmaXJzdC5sb2MsICdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdH1cblx0XHRwYXJ0cy5wdXNoKGZpcnN0Lm5hbWUpXG5cdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdCdOb3QgYSB2YWxpZCBwYXJ0IG9mIG1vZHVsZSBwYXRoLicpXG5cdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHR9KVxuXHRcdHJldHVybiB7XG5cdFx0XHRwYXRoOiBwYXJ0cy5qb2luKCcvJyksXG5cdFx0XHRuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWVcblx0XHR9XG5cdH0sXG5cblx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0ZG90TmFtZS5uRG90cyA9PT0gMSA/IFsgJy4nIF0gOiByZXBlYXQoJy4uJywgZG90TmFtZS5uRG90cyAtIDEpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==