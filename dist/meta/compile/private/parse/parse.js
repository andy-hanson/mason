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

		var _tryParseUses = tryParseUses('use!', tokens);

		var _tryParseUses2 = _slicedToArray(_tryParseUses, 2);

		const doUses = _tryParseUses2[0];
		const rest0 = _tryParseUses2[1];

		var _tryParseUses3 = tryParseUses('use', rest0);

		var _tryParseUses32 = _slicedToArray(_tryParseUses3, 2);

		const plainUses = _tryParseUses32[0];
		const rest1 = _tryParseUses32[1];

		var _tryParseUses4 = tryParseUses('use~', rest1);

		var _tryParseUses42 = _slicedToArray(_tryParseUses4, 2);

		const lazyUses = _tryParseUses42[0];
		const rest2 = _tryParseUses42[1];

		var _tryParseUses5 = tryParseUses('use-debug', rest2);

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
						if (line instanceof _Expression.Assign && line.k === '. ') line.k = 'export';
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
				} else if (ln instanceof _Expression.Assign && ln.k === '. ') (inDebug ? debugKeys : objKeys).push(ln.assignee);

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
		const isVal = k === 'case';

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
			if (_Token.Keyword.isColon(ft.head())) {
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
					case '|':case '~|':
						return _UBag.push(out, parseFun(here.k, rest()));
					case 'case':
						return _UBag.push(out, parseCase('case', false, rest()));
					case '<~':
						return _UBag.push(out, _Expression.Yield(tokens.loc, parseExpr(rest())));
					case '<~~':
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

	const parseFun = function (k, tokens) {
		var _tryTakeReturnType2 = _tryTakeReturnType(tokens);

		const opReturnType = _tryTakeReturnType2.opReturnType;
		const rest = _tryTakeReturnType2.rest;

		checkNonEmpty(rest, function () {
			return 'Expected an indented block after ' + _CompileError.code(k);
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
		return _Expression.Fun(tokens.loc, k, args, opRestArg, block, opIn, opResDeclare, opOut);
	};

	// parseFun privates
	const _tryTakeReturnType = function (tokens) {
		if (!tokens.isEmpty()) {
			const h = tokens.head();
			if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(_UBag.head(h.tokens))) return {
				opReturnType: _UOp.some(parseSpaced(_Slice2.group(h).tail())),
				rest: tokens.tail()
			};
		}
		return { opReturnType: _UOp.None, rest: tokens };
	},
	      _funArgsAndBlock = function (tokens) {
		const h = tokens.head();
		// Might be `|case`
		if (_Token.Keyword.isCaseOrCaseDo(h)) {
			const eCase = parseCase(h.k, true, tokens.tail());
			const args = [_Expression.LocalDeclare.focus(h.loc)];
			return h.k === 'case' ? {
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

			var _tryTakeInOrOut2 = _tryTakeInOrOut('in', block);

			var _tryTakeInOrOut22 = _slicedToArray(_tryTakeInOrOut2, 2);

			const opIn = _tryTakeInOrOut22[0];
			const rest0 = _tryTakeInOrOut22[1];

			var _tryTakeInOrOut3 = _tryTakeInOrOut('out', rest0);

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
			_UUtil.assert(_Token.Group.isLine(firstLine));
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
			case '. ':
				// Index is set by parseBlock.
				return _Expression.ListEntry(tokens.loc, parseExpr(rest), -1);
			case 'case!':
				return parseCase('case!', false, rest);
			case 'debug':
				return _Expression.Debug(tokens.lok, _Token.Group.isBlock(tokens.second()) ?
				// `debug`, then indented block
				parseLinesFromBlock() :
				// `debug`, then single line
				parseLineOrLines(rest));
			case 'debugger':
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return _Expression.Special.debugger(tokens.loc);
			case 'end-loop!':
				checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return _Expression.EndLoop(tokens.loc);
			case 'loop!':
				return _Expression.Loop(tokens.loc, justBlockDo(rest));
			case 'region':
				return parseLinesFromBlock(tokens);
			default:
			// fall through
		}

		return _UOp.ifElse(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref3) {
			let before = _ref3.before;
			let at = _ref3.at;
			let after = _ref3.after;

			return at.k === '->' ? _parseMapEntry(before, after, tokens.loc) : _parseAssign(before, at, after, tokens.loc);
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

		const isYield = k === '<~' || k === '<~~';

		const eValue = _valueFromAssign(eValueNamed, k);

		if (_UBag.isEmpty(locals)) {
			cx.check(isYield, assigned.loc, 'Assignment to nothing');
			return eValue;
		}

		if (isYield) locals.forEach(function (_) {
			return cx.check(_.k !== 'lazy', _.loc, 'Can not yield to lazy variable.');
		});

		if (k === '. ') locals.forEach(function (l) {
			l.okToNotUse = true;
		});

		if (locals.length === 1) {
			const assign = _Expression.Assign(loc, locals[0], k, eValue);
			const isTest = assign.assignee.name.endsWith('test');
			return isTest && k === '. ' ? _Expression.Debug(loc, [assign]) : assign;
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
			case '<~':
				return _Expression.Yield(valuePre.loc, valuePre);
			case '<~~':
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
			if (_Token.Keyword.isTilde(tokens.head())) {
				isLazy = true;
				rest = tokens.tail();
			}
			name = _parseLocalName(rest.head());
			const rest2 = rest.tail();
			if (!rest2.isEmpty()) {
				const colon = rest2.head();
				cx.check(_Token.Keyword.isColon(colon), colon.loc, function () {
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
				if (t.k === '_') return _Expression.LocalAccess.focus(t.loc);else if (_Lang.SpecialKeywords.has(t.k)) return _Expression.Special(t.loc, t.k);else unexpected(t);
				break;
			case t instanceof _Token.DotName:
				if (t.nDots === 3) return _Expression.Splat(t.loc, _Expression.LocalAccess(t.loc, t.name));else unexpected(t);
				break;
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
		switch (true) {
			case h instanceof _Token.Keyword:
				if (h.k === ':') {
					cx.check(!_Token.Keyword.isColon(rest.head()), h.loc, function () {
						return 'Two ' + h + ' in a row';
					});
					const eType = parseSpaced(rest);
					const focus = _Expression.LocalAccess.focus(h.loc);
					return _Expression.Call.contains(h.loc, eType, focus);
				} else if (h.k === '~') return _Expression.Lazy(h.loc, parseSpaced(rest));
			default:
				{
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

			if (k === 'use!') {
				if (line.tokens.length > 1) unexpected(line.tokens[1]);
				return _Expression.UseDo(line.loc, path);
			} else {
				const isLazy = k === 'use~' || k === 'use-debug';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFnQndCLEtBQUs7Ozs7Ozs7O0FBRjdCLEtBQUksRUFBRSxDQUFBOztBQUVTLFVBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDN0MsSUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNSLFNBUFEsTUFBTSxDQU9QLE9BWHVCLEtBQUssQ0FXdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDaEMsU0FBTyxXQUFXLENBQUMsUUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUMxQzs7QUFFRCxPQUNDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBRSxPQUFPO1NBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO0VBQUE7T0FDaEQsYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE9BQU87U0FDL0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztFQUFBO09BQ2pELFVBQVUsR0FBRyxVQUFBLENBQUM7U0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFnQixDQUFDLENBQUc7RUFBQSxDQUFBOztBQUVwRCxPQUFNLFdBQVcsR0FBRyxVQUFBLE1BQU0sRUFBSTs7O3NCQUVILFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzs7O1FBQTlDLE1BQU07UUFBRSxLQUFLOzt1QkFDUSxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzs7OztRQUEvQyxTQUFTO1FBQUUsS0FBSzs7dUJBQ0ksWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Ozs7UUFBL0MsUUFBUTtRQUFFLEtBQUs7O3VCQUNN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S0FBSyxHQUFHLENBQUMsQ0FBQztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tEbywgQmxvY2tWYWwsIEJsb2NrV3JhcCwgQ2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsXG5cdENhc2VEbywgQ2FzZVZhbCwgRGVidWcsIE51bWJlckxpdGVyYWwsIEVuZExvb3AsIEZ1biwgR2xvYmFsQWNjZXNzLCBMYXp5LCBMaXN0RW50cnksIExpc3RSZXR1cm4sXG5cdExpc3RTaW1wbGUsIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsIExvY2FsRGVjbGFyZSwgTG9vcCwgTWFwRW50cnksIE1hcFJldHVybiwgTWVtYmVyLCBNb2R1bGUsXG5cdE1vZHVsZURlZmF1bHRFeHBvcnQsIE9ialJldHVybiwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSwgU3BlY2lhbCwgU3BsYXQsIFZhbCwgVXNlRG8sIFVzZSxcblx0WWllbGQsIFlpZWxkVG8gfSBmcm9tICcuLi8uLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgSnNHbG9iYWxzLCBTcGVjaWFsS2V5d29yZHMgfSBmcm9tICcuLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsXG5cdEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsIFRva2VuTnVtYmVyTGl0ZXJhbCwgTmFtZSB9IGZyb20gJy4uL1Rva2VuJ1xuaW1wb3J0IHsgY2F0LCBoZWFkLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIE5vbmUsIG9wSWYsIHNvbWUgfSBmcm9tICcuLi9VL09wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vU2xpY2UnXG5cbmxldCBjeFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShfY3gsIHJvb3RUb2tlbikge1xuXHRjeCA9IF9jeFxuXHRhc3NlcnQoR3JvdXAuaXNCbG9jayhyb290VG9rZW4pKVxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoU2xpY2UuZ3JvdXAocm9vdFRva2VuKSlcbn1cblxuY29uc3Rcblx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0Y3guY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgdG9rZW5zLmxvYywgbWVzc2FnZSksXG5cdGNoZWNrTm9uRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdGN4LmNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCB0b2tlbnMubG9jLCBtZXNzYWdlKSxcblx0dW5leHBlY3RlZCA9IHQgPT4gY3guZmFpbCh0LmxvYywgYFVuZXhwZWN0ZWQgJHt0fWApXG5cbmNvbnN0IHBhcnNlTW9kdWxlID0gdG9rZW5zID0+IHtcblx0Ly8gdHJ5UGFyc2VVc2VzIG1vdmVzIHRva2VucyBmb3J3YXJkXG5cdGNvbnN0IFsgZG9Vc2VzLCByZXN0MCBdID0gdHJ5UGFyc2VVc2VzKCd1c2UhJywgdG9rZW5zKVxuXHRjb25zdCBbIHBsYWluVXNlcywgcmVzdDEgXSA9IHRyeVBhcnNlVXNlcygndXNlJywgcmVzdDApXG5cdGNvbnN0IFsgbGF6eVVzZXMsIHJlc3QyIF0gPSB0cnlQYXJzZVVzZXMoJ3VzZX4nLCByZXN0MSlcblx0Y29uc3QgWyBkZWJ1Z1VzZXMsIHJlc3QzIF0gPSB0cnlQYXJzZVVzZXMoJ3VzZS1kZWJ1ZycsIHJlc3QyKVxuXHRjb25zdCBibG9jayA9IHBhcnNlTW9kdWxlQm9keShyZXN0Mylcblx0YmxvY2subGluZXMuZm9yRWFjaChsaW5lID0+IHtcblx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmsgPT09ICdleHBvcnQnKVxuXHRcdFx0Y3guY2hlY2sobGluZS5hc3NpZ25lZS5uYW1lICE9PSAnZGlzcGxheU5hbWUnLCBsaW5lLmFzc2lnbmVlLmxvYyxcblx0XHRcdFx0J01vZHVsZSBjYW4gbm90IGNob29zZSBpdHMgb3duIGRpc3BsYXlOYW1lLicpXG5cdH0pXG5cdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkpXG5cdFx0YmxvY2subGluZXMucHVzaChcblx0XHRcdEFzc2lnbihcblx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0TG9jYWxEZWNsYXJlKHRva2Vucy5sb2MsICdkaXNwbGF5TmFtZScsIFtdLCBmYWxzZSwgdHJ1ZSksXG5cdFx0XHRcdCdleHBvcnQnLFxuXHRcdFx0XHRRdW90ZS5mb3JTdHJpbmcodG9rZW5zLmxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblxuXHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0cmV0dXJuIE1vZHVsZSh0b2tlbnMubG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgYmxvY2spXG59XG5cbi8vIHBhcnNlQmxvY2tcbmNvbnN0XG5cdC8vIFRva2VucyBvbiB0aGUgbGluZSBiZWZvcmUgYSBibG9jaywgYW5kIHRva2VucyBmb3IgdGhlIGJsb2NrIGl0c2VsZi5cblx0YmVmb3JlQW5kQmxvY2sgPSB0b2tlbnMgPT4ge1xuXHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRjb25zdCBibG9jayA9IHRva2Vucy5sYXN0KClcblx0XHRjeC5jaGVjayhHcm91cC5pc0Jsb2NrKGJsb2NrKSwgYmxvY2subG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRyZXR1cm4gWyB0b2tlbnMucnRhaWwoKSwgU2xpY2UuZ3JvdXAoYmxvY2spIF1cblx0fSxcblxuXHRibG9ja1dyYXAgPSB0b2tlbnMgPT4gQmxvY2tXcmFwKHRva2Vucy5sb2MsIF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKSksXG5cblx0anVzdEJsb2NrRG8gPSB0b2tlbnMgPT4gcGFyc2VCb2R5RG8oX2p1c3RCbG9jayh0b2tlbnMpKSxcblx0anVzdEJsb2NrVmFsID0gdG9rZW5zID0+IHBhcnNlQm9keVZhbChfanVzdEJsb2NrKHRva2VucykpLFxuXG5cdC8vIFRPRE86IEp1c3QgaGF2ZSBtb2R1bGUgcmV0dXJuIGEgdmFsdWUgYW5kIHVzZSBhIG5vcm1hbCBibG9jay5cblx0cGFyc2VNb2R1bGVCb2R5ID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnbW9kdWxlJywgdG9rZW5zKSxcblxuXHRwYXJzZUJsb2NrRnJvbUxpbmVzID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgnYW55JywgdG9rZW5zKSxcblxuXHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHBhcnNlTGluZU9yTGluZXMoU2xpY2UuZ3JvdXAobGluZSkpKVxuXHR9LFxuXG5cdHBhcnNlQm9keURvID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cdFx0Y3guY2hlY2soa1JldHVybiA9PT0gJ3BsYWluJywgdG9rZW5zLmxvYyxcblx0XHRcdCgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGVMaW5lcylcblx0fSxcblx0cGFyc2VCb2R5VmFsID0gdG9rZW5zID0+IF9wYXJzZUJsb2NrQm9keSgndmFsJywgdG9rZW5zKVxuXG4vLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5jb25zdFxuXHRfanVzdEJsb2NrID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0V4cGVjdGVkIGp1c3QgYSBibG9jay4nKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXG5cdF9wYXJzZUJsb2NrQm9keSA9IChrLCB0b2tlbnMpID0+IHtcblx0XHRhc3NlcnQoayA9PT0gJ3ZhbCcgfHwgayA9PT0gJ21vZHVsZScgfHwgayA9PT0gJ2FueScpXG5cblx0XHQvLyBrZXlzIG9ubHkgbWF0dGVyIGlmIGtSZXR1cm4gPT09ICdvYmonXG5cdFx0Y29uc3QgeyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH0gPVxuXHRcdFx0X3BhcnNlQmxvY2tMaW5lcyh0b2tlbnMpXG5cblx0XHRjb25zdCB7IGRvTGluZXMsIG9wUmV0dXJuIH0gPSAoKCkgPT4ge1xuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdiYWcnKVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRvcFJldHVybjogc29tZShMaXN0UmV0dXJuKHRva2Vucy5sb2MsIGxpc3RMZW5ndGgpKVxuXHRcdFx0XHR9XG5cdFx0XHRpZiAoa1JldHVybiA9PT0gJ21hcCcpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE1hcFJldHVybih0b2tlbnMubG9jLCBtYXBMZW5ndGgpKVxuXHRcdFx0XHR9XG5cblx0XHRcdGNvbnN0IGxhc3RSZXR1cm4gPSAhaXNFbXB0eShlTGluZXMpICYmIGxhc3QoZUxpbmVzKSBpbnN0YW5jZW9mIFZhbFxuXHRcdFx0aWYgKGtSZXR1cm4gPT09ICdvYmonICYmIGsgIT09ICdtb2R1bGUnKVxuXHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogcnRhaWwoZUxpbmVzKSxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRzb21lKGxhc3QoZUxpbmVzKSksXG5cdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0fSA6IHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0dG9rZW5zLmxvYyxcblx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHROb25lLFxuXHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHR7IGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoZUxpbmVzKSkgfSA6XG5cdFx0XHRcdHsgZG9MaW5lczogZUxpbmVzLCBvcFJldHVybjogTm9uZSB9XG5cdFx0fSkoKVxuXG5cdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRjYXNlICd2YWwnOlxuXHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKHRva2Vucy5sb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHQoKSA9PiBjeC5mYWlsKHRva2Vucy5sb2MsICdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpKVxuXHRcdFx0Y2FzZSAnYW55Jzpcblx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbCh0b2tlbnMubG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyh0b2tlbnMubG9jLCBkb0xpbmVzKSlcblx0XHRcdGNhc2UgJ21vZHVsZSc6IHtcblx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGRlYnVnLW9ubHkgZXhwb3J0c1xuXHRcdFx0XHRjb25zdCBsaW5lcyA9XG5cdFx0XHRcdFx0Ly8gVHVybiBPYmogYXNzaWducyBpbnRvIGV4cG9ydHMuXG5cdFx0XHRcdFx0Y2F0KFxuXHRcdFx0XHRcdFx0ZG9MaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gJy4gJylcblx0XHRcdFx0XHRcdFx0XHRsaW5lLmsgPSAnZXhwb3J0J1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbGluZVxuXHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRvcFJldHVybi5tYXAocmV0ID0+IE1vZHVsZURlZmF1bHRFeHBvcnQocmV0LmxvYywgcmV0KSkpXG5cdFx0XHRcdHJldHVybiBCbG9ja0RvKHRva2Vucy5sb2MsIGxpbmVzKVxuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGspXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJzZUJsb2NrTGluZXMgPSBsaW5lcyA9PiB7XG5cdFx0Y29uc3Qgb2JqS2V5cyA9IFtdLCBkZWJ1Z0tleXMgPSBbXVxuXHRcdGxldCBsaXN0TGVuZ3RoID0gMCwgbWFwTGVuZ3RoID0gMFxuXHRcdGNvbnN0IGVMaW5lcyA9IFtdXG5cdFx0Y29uc3QgYWRkTGluZSA9IChsbiwgaW5EZWJ1ZykgPT4ge1xuXHRcdFx0aWYgKGxuIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdGxuLmZvckVhY2goXyA9PiBhZGRMaW5lKF8sIGluRGVidWcpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsbiBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRcdGxuLmxpbmVzLmZvckVhY2goXyA9PiBhZGRMaW5lKF8sIHRydWUpKVxuXHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIExpc3RFbnRyeSkge1xuXHRcdFx0XHRcdGFzc2VydCghaW5EZWJ1ZywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdFx0Ly8gV2hlbiBMaXN0RW50cmllcyBhcmUgZmlyc3QgY3JlYXRlZCB0aGV5IGhhdmUgbm8gaW5kZXguXG5cdFx0XHRcdFx0YXNzZXJ0KGxuLmluZGV4ID09PSAtMSlcblx0XHRcdFx0XHRsbi5pbmRleCA9IGxpc3RMZW5ndGhcblx0XHRcdFx0XHRsaXN0TGVuZ3RoID0gbGlzdExlbmd0aCArIDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIE1hcEVudHJ5KSB7XG5cdFx0XHRcdFx0YXNzZXJ0KCFpbkRlYnVnLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRcdGFzc2VydChsbi5pbmRleCA9PT0gLTEpXG5cdFx0XHRcdFx0bG4uaW5kZXggPSBtYXBMZW5ndGhcblx0XHRcdFx0XHRtYXBMZW5ndGggPSBtYXBMZW5ndGggKyAxXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBBc3NpZ24gJiYgbG4uayA9PT0gJy4gJylcblx0XHRcdFx0XHQoaW5EZWJ1ZyA/IGRlYnVnS2V5cyA6IG9iaktleXMpLnB1c2gobG4uYXNzaWduZWUpXG5cblx0XHRcdFx0aWYgKCFpbkRlYnVnKVxuXHRcdFx0XHRcdC8vIEVsc2Ugd2UgYXJlIGFkZGluZyB0aGUgRGVidWcgYXMgYSBzaW5nbGUgbGluZS5cblx0XHRcdFx0XHRlTGluZXMucHVzaChsbilcblx0XHRcdH1cblx0XHR9XG5cdFx0bGluZXMuZWFjaChsaW5lID0+IGFkZExpbmUocGFyc2VMaW5lKFNsaWNlLmdyb3VwKGxpbmUpKSkpXG5cblx0XHRjb25zdCBpc09iaiA9ICEoaXNFbXB0eShvYmpLZXlzKSAmJiBpc0VtcHR5KGRlYnVnS2V5cykpXG5cdFx0Ly8gVE9ET1xuXHRcdC8vIGlmIChpc0VtcHR5KG9iaktleXMpKVxuXHRcdC8vXHRjeC5jaGVjayhpc0VtcHR5KGRlYnVnS2V5cyksIGxpbmVzLmxvYywgJ0Jsb2NrIGNhbid0IGhhdmUgb25seSBkZWJ1ZyBrZXlzJylcblx0XHRjb25zdCBpc0JhZyA9IGxpc3RMZW5ndGggPiAwXG5cdFx0Y29uc3QgaXNNYXAgPSBtYXBMZW5ndGggPiAwXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc0JhZyksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc09iaiAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0Y3guY2hlY2soIShpc0JhZyAmJiBpc01hcCksIGxpbmVzLmxvYywgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRjb25zdCBrUmV0dXJuID0gaXNPYmogPyAnb2JqJyA6IGlzQmFnID8gJ2JhZycgOiBpc01hcCA/ICdtYXAnIDogJ3BsYWluJ1xuXHRcdHJldHVybiB7IGVMaW5lcywga1JldHVybiwgbGlzdExlbmd0aCwgbWFwTGVuZ3RoLCBvYmpLZXlzLCBkZWJ1Z0tleXMgfVxuXHR9XG5cbmNvbnN0IHBhcnNlQ2FzZSA9IChrLCBjYXNlZEZyb21GdW4sIHRva2VucykgPT4ge1xuXHRjb25zdCBpc1ZhbCA9IGsgPT09ICdjYXNlJ1xuXG5cdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sodG9rZW5zKVxuXG5cdGxldCBvcENhc2VkXG5cdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRjaGVja0VtcHR5KGJlZm9yZSwgJ0NhblxcJ3QgbWFrZSBmb2N1cyAtLSBpcyBpbXBsaWNpdGx5IHByb3ZpZGVkIGFzIGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0b3BDYXNlZCA9IE5vbmVcblx0fSBlbHNlXG5cdFx0b3BDYXNlZCA9IG9wSWYoIWJlZm9yZS5pc0VtcHR5KCksICgpID0+IEFzc2lnbi5mb2N1cyhiZWZvcmUubG9jLCBwYXJzZUV4cHIoYmVmb3JlKSkpXG5cblx0Y29uc3QgbGFzdExpbmUgPSBTbGljZS5ncm91cChibG9jay5sYXN0KCkpXG5cdGNvbnN0IFsgcGFydExpbmVzLCBvcEVsc2UgXSA9IEtleXdvcmQuaXNFbHNlKGxhc3RMaW5lLmhlYWQoKSkgP1xuXHRcdFsgYmxvY2sucnRhaWwoKSwgc29tZSgoaXNWYWwgPyBqdXN0QmxvY2tWYWwgOiBqdXN0QmxvY2tEbykobGFzdExpbmUudGFpbCgpKSkgXSA6XG5cdFx0WyBibG9jaywgTm9uZSBdXG5cblx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdGxpbmUgPSBTbGljZS5ncm91cChsaW5lKVxuXHRcdGNvbnN0IFsgYmVmb3JlLCBibG9jayBdID0gYmVmb3JlQW5kQmxvY2sobGluZSlcblx0XHRjb25zdCB0ZXN0ID0gX3BhcnNlQ2FzZVRlc3QoYmVmb3JlKVxuXHRcdGNvbnN0IHJlc3VsdCA9IChpc1ZhbCA/IHBhcnNlQm9keVZhbCA6IHBhcnNlQm9keURvKShibG9jaylcblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgcmVzdWx0KVxuXHR9KVxuXHRjeC5jaGVjayhwYXJ0cy5sZW5ndGggPiAwLCB0b2tlbnMubG9jLCAnTXVzdCBoYXZlIGF0IGxlYXN0IDEgbm9uLWBlbHNlYCB0ZXN0LicpXG5cblx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWwgOiBDYXNlRG8pKHRva2Vucy5sb2MsIG9wQ2FzZWQsIHBhcnRzLCBvcEVsc2UpXG59XG4vLyBwYXJzZUNhc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUNhc2VUZXN0ID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBQYXR0ZXJuIG1hdGNoIHN0YXJ0cyB3aXRoIHR5cGUgdGVzdCBhbmQgaXMgZm9sbG93ZWQgYnkgbG9jYWwgZGVjbGFyZXMuXG5cdFx0Ly8gRS5nLiwgYDpTb21lIHZhbGBcblx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoZmlyc3QpICYmIHRva2Vucy5zaXplKCkgPiAxKSB7XG5cdFx0XHRjb25zdCBmdCA9IFNsaWNlLmdyb3VwKGZpcnN0KVxuXHRcdFx0aWYgKEtleXdvcmQuaXNDb2xvbihmdC5oZWFkKCkpKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBwYXJzZVNwYWNlZChmdC50YWlsKCkpXG5cdFx0XHRcdGNvbnN0IGxvY2FscyA9IHBhcnNlTG9jYWxEZWNsYXJlcyh0b2tlbnMudGFpbCgpKVxuXHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXModG9rZW5zLmxvYykpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXJzZUV4cHIodG9rZW5zKVxuXHR9XG5cbmNvbnN0XG5cdHBhcnNlRXhwciA9IHRva2VucyA9PiB7XG5cdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShLZXl3b3JkLmlzT2JqQXNzaWduKSxcblx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdGNvbnN0IGtleXNWYWxzID0ge31cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jYWwgPSBwYXJzZUxvY2FsRGVjbGFyZShzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKSlcblx0XHRcdFx0XHQvLyBDYW4ndCBoYXZlIGdvdCBhIHR5cGUgYmVjYXVzZSB0aGVyZSdzIG9ubHkgb25lIHRva2VuLlxuXHRcdFx0XHRcdGFzc2VydChpc0VtcHR5KGxvY2FsLm9wVHlwZSkpXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBwYXJzZUV4cHJQbGFpbih0b2tlbnNWYWx1ZSlcblx0XHRcdFx0XHRjeC5jaGVjayghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGtleXNWYWxzLCBsb2NhbC5uYW1lKSxcblx0XHRcdFx0XHRcdGxvY2FsLmxvYywgKCkgPT4gYER1cGxpY2F0ZSBwcm9wZXJ0eSAke2xvY2FsfS5gKVxuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXlzVmFscywgbG9jYWwubmFtZSwgeyB2YWx1ZSB9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFzc2VydChsYXN0KHNwbGl0cykuYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKHRva2Vucy5sb2MsIGtleXNWYWxzKVxuXHRcdFx0XHRpZiAodG9rZW5zQ2FsbGVyLmlzRW1wdHkoKSlcblx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHModG9rZW5zQ2FsbGVyKVxuXHRcdFx0XHRcdGFzc2VydCghaXNFbXB0eShwYXJ0cykpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwodG9rZW5zLmxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbih0b2tlbnMpXG5cdFx0KVxuXHR9LFxuXG5cdHBhcnNlRXhwclBhcnRzID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdGZvciAobGV0IGkgPSB0b2tlbnMuc3RhcnQ7IGkgPCB0b2tlbnMuZW5kOyBpID0gaSArIDEpIHtcblx0XHRcdGNvbnN0IGhlcmUgPSB0b2tlbnMuZGF0YVtpXVxuXHRcdFx0aWYgKGhlcmUgaW5zdGFuY2VvZiBLZXl3b3JkKSB7XG5cdFx0XHRcdGNvbnN0IHJlc3QgPSAoKSA9PiB0b2tlbnMuX2Nob3BTdGFydChpICsgMSlcblx0XHRcdFx0c3dpdGNoIChoZXJlLmspIHtcblx0XHRcdFx0XHRjYXNlICd8JzogY2FzZSAnfnwnOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBwYXJzZUZ1bihoZXJlLmssIHJlc3QoKSkpXG5cdFx0XHRcdFx0Y2FzZSAnY2FzZSc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHBhcnNlQ2FzZSgnY2FzZScsIGZhbHNlLCByZXN0KCkpKVxuXHRcdFx0XHRcdGNhc2UgJzx+Jzpcblx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGQodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGNhc2UgJzx+fic6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkVG8odG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QoKSkpKVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHQvLyBmYWxsdGhyb3VnaFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvdXQucHVzaChwYXJzZVNpbmdsZShoZXJlKSlcblx0XHR9XG5cdFx0cmV0dXJuIG91dFxuXHR9LFxuXG5cdHBhcnNlRXhwclBsYWluID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKHRva2Vucylcblx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRyZXR1cm4gR2xvYmFsQWNjZXNzLm51bGwodG9rZW5zLmxvYylcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cmV0dXJuIGhlYWQocGFydHMpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gQ2FsbCh0b2tlbnMubG9jLCBoZWFkKHBhcnRzKSwgdGFpbChwYXJ0cykpXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlRnVuID0gKGssIHRva2VucykgPT4ge1xuXHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKHRva2Vucylcblx0Y2hlY2tOb25FbXB0eShyZXN0LCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtjb2RlKGspfWApXG5cdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IF9mdW5BcmdzQW5kQmxvY2socmVzdClcblx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdGNvbnN0IG9wUmVzRGVjbGFyZSA9IGlmRWxzZShvcFJldHVyblR5cGUsXG5cdFx0cnQgPT4gc29tZShMb2NhbERlY2xhcmUucmVzKHJ0LmxvYywgb3BSZXR1cm5UeXBlKSksXG5cdFx0KCkgPT4gb3BPdXQubWFwKG8gPT4gTG9jYWxEZWNsYXJlLnJlcyhvLmxvYywgb3BSZXR1cm5UeXBlKSkpXG5cdHJldHVybiBGdW4odG9rZW5zLmxvYywgaywgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcbn1cblxuLy8gcGFyc2VGdW4gcHJpdmF0ZXNcbmNvbnN0XG5cdF90cnlUYWtlUmV0dXJuVHlwZSA9IHRva2VucyA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGgpICYmIEtleXdvcmQuaXNDb2xvbihoZWFkKGgudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBzb21lKHBhcnNlU3BhY2VkKFNsaWNlLmdyb3VwKGgpLnRhaWwoKSkpLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyBvcFJldHVyblR5cGU6IE5vbmUsIHJlc3Q6IHRva2VucyB9XG5cdH0sXG5cblx0X2Z1bkFyZ3NBbmRCbG9jayA9IHRva2VucyA9PiB7XG5cdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0aWYgKEtleXdvcmQuaXNDYXNlT3JDYXNlRG8oaCkpIHtcblx0XHRcdGNvbnN0IGVDYXNlID0gcGFyc2VDYXNlKGguaywgdHJ1ZSwgdG9rZW5zLnRhaWwoKSlcblx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0cmV0dXJuIChoLmsgPT09ICdjYXNlJykgP1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRibG9jazogQmxvY2tWYWwodG9rZW5zLmxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0fSA6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKHRva2Vucy5sb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBbIGJlZm9yZSwgYmxvY2sgXSA9IGJlZm9yZUFuZEJsb2NrKHRva2Vucylcblx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSBfcGFyc2VGdW5Mb2NhbHMoYmVmb3JlKVxuXHRcdFx0Y29uc3QgWyBvcEluLCByZXN0MCBdID0gX3RyeVRha2VJbk9yT3V0KCdpbicsIGJsb2NrKVxuXHRcdFx0Y29uc3QgWyBvcE91dCwgcmVzdDEgXSA9IF90cnlUYWtlSW5Pck91dCgnb3V0JywgcmVzdDApXG5cdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiBwYXJzZUJsb2NrRnJvbUxpbmVzKHJlc3QxKSwgb3BJbiwgb3BPdXQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VGdW5Mb2NhbHMgPSB0b2tlbnMgPT4ge1xuXHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogTm9uZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdGN4LmNoZWNrKGwubkRvdHMgPT09IDMsIGwubG9jLCAnU3BsYXQgYXJndW1lbnQgbXVzdCBoYXZlIGV4YWN0bHkgMyBkb3RzJylcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zLnJ0YWlsKCkpLFxuXHRcdFx0XHRcdG9wUmVzdEFyZzogc29tZShMb2NhbERlY2xhcmUobC5sb2MsIGwubmFtZSwgTm9uZSwgZmFsc2UsIGZhbHNlKSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXModG9rZW5zKSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHR9XG5cdH0sXG5cblx0X3RyeVRha2VJbk9yT3V0ID0gKGluT3JPdXQsIHRva2VucykgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0YXNzZXJ0KEdyb3VwLmlzTGluZShmaXJzdExpbmUpKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkoaGVhZChmaXJzdExpbmUudG9rZW5zKSkpIHtcblx0XHRcdFx0Y29uc3QgaW5PdXQgPSBEZWJ1Zyhcblx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdHBhcnNlTGluZXNGcm9tQmxvY2soU2xpY2UuZ3JvdXAoZmlyc3RMaW5lKSkpXG5cdFx0XHRcdHJldHVybiBbIHNvbWUoaW5PdXQpLCB0b2tlbnMudGFpbCgpIF1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFsgTm9uZSwgdG9rZW5zIF1cblx0fVxuXG5jb25zdFxuXHRwYXJzZUxpbmUgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdC8vIFdlIG9ubHkgZGVhbCB3aXRoIG11dGFibGUgZXhwcmVzc2lvbnMgaGVyZSwgb3RoZXJ3aXNlIHdlIGZhbGwgYmFjayB0byBwYXJzZUV4cHIuXG5cdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0c3dpdGNoIChoLmspIHtcblx0XHRcdFx0Y2FzZSAnLiAnOlxuXHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdHJldHVybiBMaXN0RW50cnkodG9rZW5zLmxvYywgcGFyc2VFeHByKHJlc3QpLCAtMSlcblx0XHRcdFx0Y2FzZSAnY2FzZSEnOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUNhc2UoJ2Nhc2UhJywgZmFsc2UsIHJlc3QpXG5cdFx0XHRcdGNhc2UgJ2RlYnVnJzpcblx0XHRcdFx0XHRyZXR1cm4gRGVidWcodG9rZW5zLmxvayxcblx0XHRcdFx0XHRcdEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrKCkgOlxuXHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0cGFyc2VMaW5lT3JMaW5lcyhyZXN0KSlcblx0XHRcdFx0Y2FzZSAnZGVidWdnZXInOlxuXHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsLmRlYnVnZ2VyKHRva2Vucy5sb2MpXG5cdFx0XHRcdGNhc2UgJ2VuZC1sb29wISc6XG5cdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AodG9rZW5zLmxvYylcblx0XHRcdFx0Y2FzZSAnbG9vcCEnOlxuXHRcdFx0XHRcdHJldHVybiBMb29wKHRva2Vucy5sb2MsIGp1c3RCbG9ja0RvKHJlc3QpKVxuXHRcdFx0XHRjYXNlICdyZWdpb24nOlxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKHRva2Vucylcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBmYWxsIHRocm91Z2hcblx0XHRcdH1cblxuXHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoS2V5d29yZC5pc0xpbmVTcGxpdCksXG5cdFx0XHQoeyBiZWZvcmUsIGF0LCBhZnRlciB9KSA9PiB7XG5cdFx0XHRcdHJldHVybiBhdC5rID09PSAnLT4nID9cblx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyLCB0b2tlbnMubG9jKSA6XG5cdFx0XHRcdFx0X3BhcnNlQXNzaWduKGJlZm9yZSwgYXQsIGFmdGVyLCB0b2tlbnMubG9jKVxuXHRcdFx0fSxcblx0XHRcdCgpID0+IHBhcnNlRXhwcih0b2tlbnMpKVxuXHR9LFxuXG5cdHBhcnNlTGluZU9yTGluZXMgPSB0b2tlbnMgPT4ge1xuXHRcdGNvbnN0IF8gPSBwYXJzZUxpbmUodG9rZW5zKVxuXHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0fVxuXG4vLyBwYXJzZUxpbmUgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZUFzc2lnbiA9IChhc3NpZ25lZCwgYXNzaWduZXIsIHZhbHVlLCBsb2MpID0+IHtcblx0XHRsZXQgbG9jYWxzID0gcGFyc2VMb2NhbERlY2xhcmVzKGFzc2lnbmVkKVxuXHRcdGNvbnN0IGsgPSBhc3NpZ25lci5rXG5cdFx0Y29uc3QgZVZhbHVlUHJlID0gdmFsdWUuaXNFbXB0eSgpID8gR2xvYmFsQWNjZXNzLnRydWUodmFsdWUubG9jKSA6IHBhcnNlRXhwcih2YWx1ZSlcblxuXHRcdGxldCBlVmFsdWVOYW1lZFxuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBuYW1lID0gaGVhZChsb2NhbHMpLm5hbWVcblx0XHRcdGlmIChuYW1lID09PSAnZG9jJykge1xuXHRcdFx0XHRpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRcdC8vIEtMVURHRTogYGRvY2AgZm9yIG1vZHVsZSBjYW4gYmUgYSBGdW4gc2lnbmF0dXJlLlxuXHRcdFx0XHRcdC8vIFRPRE86IFNvbWV0aGluZyBiZXR0ZXIuLi5cblx0XHRcdFx0XHRlVmFsdWVQcmUuYXJncy5mb3JFYWNoKGFyZyA9PiB7IGFyZy5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXHRcdFx0XHRlVmFsdWVOYW1lZCA9IGVWYWx1ZVByZVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlVmFsdWVOYW1lZCA9IF90cnlBZGREaXNwbGF5TmFtZShlVmFsdWVQcmUsIG5hbWUpXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cblx0XHRjb25zdCBpc1lpZWxkID0gayA9PT0gJzx+JyB8fCBrID09PSAnPH5+J1xuXG5cdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwgaylcblxuXHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdGN4LmNoZWNrKGlzWWllbGQsIGFzc2lnbmVkLmxvYywgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRyZXR1cm4gZVZhbHVlXG5cdFx0fVxuXG5cdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+XG5cdFx0XHRcdGN4LmNoZWNrKF8uayAhPT0gJ2xhenknLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdGlmIChrID09PSAnLiAnKVxuXHRcdFx0bG9jYWxzLmZvckVhY2gobCA9PiB7IGwub2tUb05vdFVzZSA9IHRydWUgfSlcblxuXHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBsb2NhbHNbMF0sIGssIGVWYWx1ZSlcblx0XHRcdGNvbnN0IGlzVGVzdCA9IGFzc2lnbi5hc3NpZ25lZS5uYW1lLmVuZHNXaXRoKCd0ZXN0Jylcblx0XHRcdHJldHVybiBpc1Rlc3QgJiYgayA9PT0gJy4gJyA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PiBjeC5jaGVjayhfLmlzTGF6eSwgXy5sb2MsXG5cdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBrLCBlVmFsdWUsIGlzTGF6eSlcblx0XHR9XG5cdH0sXG5cblx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdHN3aXRjaCAoa0Fzc2lnbikge1xuXHRcdFx0Y2FzZSAnPH4nOlxuXHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdGNhc2UgJzx+fic6XG5cdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0Ly8gV2UgZ2l2ZSBpdCBhIGRpc3BsYXlOYW1lIGlmOlxuXHQvLyAuIEl0J3MgYSBibG9ja1xuXHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGF0IHRoZSBlbmQgb2YgYSBibG9ja1xuXHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGFzIHRoZSBlbmQgbWVtYmVyIG9mIGEgY2FsbC5cblx0X3RyeUFkZERpc3BsYXlOYW1lID0gKGVWYWx1ZVByZSwgZGlzcGxheU5hbWUpID0+IHtcblx0XHRzd2l0Y2ggKHRydWUpIHtcblx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgQ2FsbCAmJiBlVmFsdWVQcmUuYXJncy5sZW5ndGggPiAwOlxuXHRcdFx0XHQvLyBUT0RPOiBJbW11dGFibGVcblx0XHRcdFx0ZVZhbHVlUHJlLmFyZ3NbZVZhbHVlUHJlLmFyZ3MubGVuZ3RoIC0gMV0gPVxuXHRcdFx0XHRcdF90cnlBZGREaXNwbGF5TmFtZShsYXN0KGVWYWx1ZVByZS5hcmdzKSwgZGlzcGxheU5hbWUpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBGdW46XG5cdFx0XHRcdHJldHVybiBPYmpSZXR1cm4oZVZhbHVlUHJlLmxvYywgW10sIFtdLCBzb21lKGVWYWx1ZVByZSksIHNvbWUoZGlzcGxheU5hbWUpKVxuXG5cdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIE9ialJldHVybiAmJlxuXHRcdFx0XHQhZVZhbHVlUHJlLmtleXMuc29tZShrZXkgPT4ga2V5Lm5hbWUgPT09ICdkaXNwbGF5TmFtZScpOlxuXHRcdFx0XHRlVmFsdWVQcmUub3BEaXNwbGF5TmFtZSA9IHNvbWUoZGlzcGxheU5hbWUpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0Y2FzZSBlVmFsdWVQcmUgaW5zdGFuY2VvZiBCbG9ja1dyYXA6IHtcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSBlVmFsdWVQcmUuYmxvY2tcblx0XHRcdFx0YmxvY2sucmV0dXJuZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoYmxvY2sucmV0dXJuZWQsIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0XHR9XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTWFwRW50cnkgPSAoYmVmb3JlLCBhZnRlciwgbG9jKSA9PlxuXHRcdC8vIFRPRE86IGluZGV4IEZpbGxlZCBpbiBieSA/Pz9cblx0XHRNYXBFbnRyeShsb2MsIHBhcnNlRXhwcihiZWZvcmUpLCBwYXJzZUV4cHIoYWZ0ZXIpLCAtMSlcblxuY29uc3Rcblx0cGFyc2VMb2NhbERlY2xhcmVzID0gdG9rZW5zID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXHRwYXJzZUxvY2FsRGVjbGFyZSA9IHQgPT4ge1xuXHRcdGxldCBuYW1lXG5cdFx0bGV0IG9wVHlwZSA9IE5vbmVcblx0XHRsZXQgaXNMYXp5ID0gZmFsc2VcblxuXHRcdGlmIChHcm91cC5pc1NwYWNlZCh0KSkge1xuXHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuZ3JvdXAodClcblx0XHRcdGxldCByZXN0ID0gdG9rZW5zXG5cdFx0XHRpZiAoS2V5d29yZC5pc1RpbGRlKHRva2Vucy5oZWFkKCkpKSB7XG5cdFx0XHRcdGlzTGF6eSA9IHRydWVcblx0XHRcdFx0cmVzdCA9IHRva2Vucy50YWlsKClcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRpZiAoIXJlc3QyLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRjeC5jaGVjayhLZXl3b3JkLmlzQ29sb24oY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdGNoZWNrTm9uRW1wdHkodG9rZW5zVHlwZSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdG9wVHlwZSA9IHNvbWUocGFyc2VTcGFjZWQodG9rZW5zVHlwZSkpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUodClcblxuXHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5LCBmYWxzZSlcblx0fVxuXG4vLyBwYXJzZUxvY2FsRGVjbGFyZSBwcml2YXRlc1xuY29uc3Rcblx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0aWYgKEtleXdvcmQuaXNGb2N1cyh0KSlcblx0XHRcdHJldHVybiAnXydcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBOYW1lLCB0LmxvYywgKCkgPT4gYEV4cGVjdGVkIGEgbG9jYWwgbmFtZSwgbm90ICR7dH1gKVxuXHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRgQ2FuIG5vdCBzaGFkb3cgZ2xvYmFsICR7Y29kZSh0Lm5hbWUpfWApXG5cdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0fVxuXHR9XG5cbmNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PiB7XG5cdHN3aXRjaCAodHJ1ZSkge1xuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIE5hbWU6XG5cdFx0XHRyZXR1cm4gX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKVxuXHRcdGNhc2UgdCBpbnN0YW5jZW9mIEdyb3VwOlxuXHRcdFx0c3dpdGNoICh0LmspIHtcblx0XHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gcGFyc2VTcGFjZWQoU2xpY2UuZ3JvdXAodCkpXG5cdFx0XHRcdGNhc2UgR19QYXJlbjogcmV0dXJuIHBhcnNlRXhwcihTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBMaXN0U2ltcGxlKHQubG9jLCBwYXJzZUV4cHJQYXJ0cyhTbGljZS5ncm91cCh0KSkpXG5cdFx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIGJsb2NrV3JhcChTbGljZS5ncm91cCh0KSlcblx0XHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRcdHJldHVybiBRdW90ZSh0LmxvYyxcblx0XHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHR9XG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgVG9rZW5OdW1iZXJMaXRlcmFsOlxuXHRcdFx0cmV0dXJuIE51bWJlckxpdGVyYWwodC5sb2MsIHQudmFsdWUpXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXM6XG5cdFx0XHRyZXR1cm4gQ2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUsIHQubG9jKSwgWyBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYykgXSlcblx0XHRjYXNlIHQgaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0aWYgKHQuayA9PT0gJ18nKVxuXHRcdFx0XHRyZXR1cm4gTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpXG5cdFx0XHRlbHNlIGlmIChTcGVjaWFsS2V5d29yZHMuaGFzKHQuaykpXG5cdFx0XHRcdHJldHVybiBTcGVjaWFsKHQubG9jLCB0LmspXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSB0IGluc3RhbmNlb2YgRG90TmFtZTpcblx0XHRcdGlmICh0Lm5Eb3RzID09PSAzKVxuXHRcdFx0XHRyZXR1cm4gU3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR1bmV4cGVjdGVkKHQpXG5cdH1cbn1cbi8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5jb25zdCBfYWNjZXNzID0gKG5hbWUsIGxvYykgPT5cblx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5jb25zdCBwYXJzZVNwYWNlZCA9IHRva2VucyA9PiB7XG5cdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRzd2l0Y2ggKHRydWUpIHtcblx0XHRjYXNlIGggaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0aWYgKGguayA9PT0gJzonKSB7XG5cdFx0XHRcdGN4LmNoZWNrKCFLZXl3b3JkLmlzQ29sb24ocmVzdC5oZWFkKCkpLCBoLmxvYywgKCkgPT4gYFR3byAke2h9IGluIGEgcm93YClcblx0XHRcdFx0Y29uc3QgZVR5cGUgPSBwYXJzZVNwYWNlZChyZXN0KVxuXHRcdFx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdFx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHRcdFx0fSBlbHNlIGlmIChoLmsgPT09ICd+Jylcblx0XHRcdFx0cmV0dXJuIExhenkoaC5sb2MsIHBhcnNlU3BhY2VkKHJlc3QpKVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgdG9rZW5zLmxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0XHRyZXR1cm4gTWVtYmVyKHRva2Vucy5sb2MsIGUsIHQubmFtZSlcblx0XHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0XHRpZiAodC5rID09PSBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHBhcnNlRXhwclBhcnRzKFNsaWNlLmdyb3VwKHQpKSkpXG5cdFx0XHRcdFx0aWYgKHQuayA9PT0gR19QYXJlbikge1xuXHRcdFx0XHRcdFx0Y2hlY2tFbXB0eShTbGljZS5ncm91cCh0KSxcblx0XHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRcdHJldHVybiBDYWxsKHRva2Vucy5sb2MsIGUsIFtdKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGN4LmZhaWwodG9rZW5zLmxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3R9YClcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN0LnJlZHVjZShtZW1iZXJPclN1YnNjcmlwdCwgcGFyc2VTaW5nbGUoaCkpXG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IHRyeVBhcnNlVXNlcyA9IChrLCB0b2tlbnMpID0+IHtcblx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0Y29uc3QgbGluZTAgPSBTbGljZS5ncm91cCh0b2tlbnMuaGVhZCgpKVxuXHRcdGlmIChLZXl3b3JkLmlzKGspKGxpbmUwLmhlYWQoKSkpXG5cdFx0XHRyZXR1cm4gWyBfcGFyc2VVc2VzKGssIGxpbmUwLnRhaWwoKSksIHRva2Vucy50YWlsKCkgXVxuXHR9XG5cdHJldHVybiBbIFsgXSwgdG9rZW5zIF1cbn1cblxuLy8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcbmNvbnN0XG5cdF9wYXJzZVVzZXMgPSAoaywgdG9rZW5zKSA9PiB7XG5cdFx0Y29uc3QgWyBiZWZvcmUsIGxpbmVzIF0gPSBiZWZvcmVBbmRCbG9jayh0b2tlbnMpXG5cdFx0Y2hlY2tFbXB0eShiZWZvcmUsICgpID0+YERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7Y29kZShrKX0gb3RoZXIgdGhhbiBhIGJsb2NrYClcblx0XHRyZXR1cm4gbGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0Y29uc3QgdFJlcSA9IGxpbmUudG9rZW5zWzBdXG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblx0XHRcdGlmIChrID09PSAndXNlIScpIHtcblx0XHRcdFx0aWYgKGxpbmUudG9rZW5zLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxpbmUubG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gJ3VzZX4nIHx8IGsgPT09ICd1c2UtZGVidWcnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPVxuXHRcdFx0XHRcdF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5LCBTbGljZS5ncm91cChsaW5lKS50YWlsKCkpXG5cdFx0XHRcdHJldHVybiBVc2UobGluZS5sb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5LCB0b2tlbnMpID0+IHtcblx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlKHRva2Vucy5sb2MsIG5hbWUsIE5vbmUsIGlzTGF6eSwgZmFsc2UpXG5cdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRyZXR1cm4geyB1c2VkOiBbXSwgb3BVc2VEZWZhdWx0OiBzb21lKHVzZURlZmF1bHQoKSkgfVxuXHRcdGVsc2Uge1xuXHRcdFx0Y29uc3QgaGFzRGVmYXVsdFVzZSA9IEtleXdvcmQuaXNGb2N1cyh0b2tlbnMuaGVhZCgpKVxuXHRcdFx0Y29uc3Qgb3BVc2VEZWZhdWx0ID0gb3BJZihoYXNEZWZhdWx0VXNlLCB1c2VEZWZhdWx0KVxuXHRcdFx0Y29uc3QgcmVzdCA9IGhhc0RlZmF1bHRVc2UgPyB0b2tlbnMudGFpbCgpIDogdG9rZW5zXG5cdFx0XHRjb25zdCB1c2VkID0gcGFyc2VMb2NhbERlY2xhcmVzKHJlc3QpLm1hcChsID0+IHtcblx0XHRcdFx0Y3guY2hlY2sobC5uYW1lICE9PSAnXycsIGwucG9zLFxuXHRcdFx0XHRcdCgpID0+IGAke2NvZGUoJ18nKX0gbm90IGFsbG93ZWQgYXMgaW1wb3J0IG5hbWUuYClcblx0XHRcdFx0bC5pc0xhenkgPSBpc0xhenlcblx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdH1cblx0fSxcblxuXHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogdC5uYW1lLCBuYW1lOiB0Lm5hbWUgfVxuXHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjeC5jaGVjayhHcm91cC5pc1NwYWNlZCh0KSwgdC5sb2MsICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0cmV0dXJuIF9wYXJzZUxvY2FsUmVxdWlyZShTbGljZS5ncm91cCh0KSlcblx0XHR9XG5cdH0sXG5cblx0X3BhcnNlTG9jYWxSZXF1aXJlID0gdG9rZW5zID0+IHtcblx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRsZXQgcGFydHNcblx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRlbHNlIHtcblx0XHRcdGN4LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMgPSBbIF1cblx0XHR9XG5cdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdGN4LmNoZWNrKHQgaW5zdGFuY2VvZiBEb3ROYW1lICYmIHQubkRvdHMgPT09IDEsIHQubG9jLFxuXHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0fSlcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGF0aDogcGFydHMuam9pbignLycpLFxuXHRcdFx0bmFtZTogdG9rZW5zLmxhc3QoKS5uYW1lXG5cdFx0fVxuXHR9LFxuXG5cdF9wYXJ0c0Zyb21Eb3ROYW1lID0gZG90TmFtZSA9PlxuXHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=