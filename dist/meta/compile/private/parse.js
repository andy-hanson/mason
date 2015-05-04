if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../Expression', './Lang', './Token', './U/Bag', './U/Op', './U/util', './U/Slice'], function (exports, module, _esastDistLoc, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _USlice) {
	'use strict';

	module.exports = parse;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _Slice = _interopRequire(_USlice);

	function parse(cx, rootToken) {
		_UUtil.assert(_Token.Group.isBlock(rootToken));
		let tokens = _Slice.all(rootToken.tokens);
		let loc = rootToken.loc;

		// Functions for moving through tokens:
		const check = function (cond, message) {
			return cx.check(cond, loc, message);
		},
		      checkEmpty = function (tokens, message) {
			return cx.check(tokens.isEmpty(), function () {
				return _locFromTokens(tokens);
			}, message);
		},
		      w0 = function (_tokens, fun) {
			const t = tokens;
			tokens = _tokens;
			const l = loc;
			loc = tokens.isEmpty() ? loc : _locFromTokens(tokens);
			const res = fun();
			tokens = t;
			loc = l;
			return res;
		},
		      w1 = function (_tokens, fun, arg) {
			const t = tokens;
			tokens = _tokens;
			const l = loc;
			loc = tokens.isEmpty() ? loc : _locFromTokens(tokens);
			const res = fun(arg);
			tokens = t;
			loc = l;
			return res;
		},
		      w2 = function (_tokens, fun, arg, arg2) {
			const t = tokens;
			tokens = _tokens;
			const l = loc;
			loc = tokens.isEmpty() ? loc : _locFromTokens(tokens);
			const res = fun(arg, arg2);
			tokens = t;
			loc = l;
			return res;
		},
		      wg = function (group, fun, arg) {
			const t = tokens;
			tokens = _Slice.all(group.tokens);
			const l = loc;
			loc = group.loc;
			const res = fun(arg);
			tokens = t;
			loc = l;
			return res;
		},
		      _locFromTokens = function (tokens) {
			return _Loc(tokens.head().loc.start, tokens.last().loc.end);
		},
		      unexpected = function (t) {
			return cx.fail(t.loc, 'Unexpected ' + t);
		};

		const parseModule = function () {
			var _tryParseUse = tryParseUse('use!');

			const doUses = _tryParseUse.uses;
			const rest = _tryParseUse.rest;

			var _w1 = w1(rest, tryParseUse, 'use');

			const plainUses = _w1.uses;
			const rest1 = _w1.rest;

			var _w12 = w1(rest1, tryParseUse, 'use~');

			const lazyUses = _w12.uses;
			const rest2 = _w12.rest;

			var _w13 = w1(rest2, tryParseUse, 'use-debug');

			const debugUses = _w13.uses;
			const rest3 = _w13.rest;

			const block = w0(rest3, parseModuleBody);

			block.lines.forEach(function (line) {
				if (line instanceof _Expression.Assign && line.k === 'export') check(line.assignee.name !== 'displayName', 'Module can not choose its own displayName.');
			});
			if (cx.opts.moduleDisplayName()) block.lines.push(_Expression.Assign(loc, _Expression.LocalDeclare(loc, 'displayName', [], false, true), 'export', _Expression.Quote.forString(loc, cx.opts.moduleName())));

			const uses = plainUses.concat(lazyUses);
			return _Expression.Module(loc, doUses, uses, debugUses, block);
		};

		// parseBlock
		const takeBlockLinesFromEnd = function () {
			check(!tokens.isEmpty(), 'Expected an indented block');
			const l = tokens.last();
			cx.check(_Token.Group.isBlock(l), l.loc, 'Expected an indented block at the end');
			return { before: tokens.rtail(), lines: _Slice.all(l.tokens) };
		},
		      blockWrap = function () {
			return _Expression.BlockWrap(loc, _parseBlockBody('val'));
		},
		      justBlockDo = function () {
			var _takeBlockDoFromEnd = takeBlockDoFromEnd();

			const before = _takeBlockDoFromEnd.before;
			const block = _takeBlockDoFromEnd.block;

			check(before.isEmpty(), 'Expected just a block.');
			return block;
		},
		      justBlockVal = function () {
			var _takeBlockValFromEnd = takeBlockValFromEnd();

			const before = _takeBlockValFromEnd.before;
			const block = _takeBlockValFromEnd.block;

			check(before.isEmpty(), 'Expected just a block.');
			return block;
		},
		      takeBlockDoFromEnd = function () {
			var _takeBlockLinesFromEnd = takeBlockLinesFromEnd();

			const before = _takeBlockLinesFromEnd.before;
			const lines = _takeBlockLinesFromEnd.lines;

			const block = w0(lines, _parseBodyDo);
			return { before: before, block: block };
		},
		      takeBlockValFromEnd = function () {
			var _takeBlockLinesFromEnd2 = takeBlockLinesFromEnd();

			const before = _takeBlockLinesFromEnd2.before;
			const lines = _takeBlockLinesFromEnd2.lines;

			const block = w1(lines, _parseBlockBody, 'val');
			return { before: before, block: block };
		},
		     

		// TODO: Just have module return a value and use a normal block.
		parseModuleBody = function () {
			return _parseBlockBody('module');
		},
		      parseBlockFromLines = function () {
			return _parseBlockBody('any');
		},
		     

		// Gets lines in a region or Debug.
		parseLinesFromBlock = function () {
			const h = tokens.head();
			cx.check(tokens.size() > 1, h.loc, function () {
				return 'Expected indented block after ' + h;
			});
			const block = tokens.second();
			_UUtil.assert(tokens.size() === 2 && _Token.Group.isBlock(block));
			return _UBag.flatMap(block.tokens, function (line) {
				return wg(line, parseLineOrLines);
			});
		};

		// parseBlock privates
		const _parseBodyDo = function () {
			var _parseBlockLines2 = _parseBlockLines();

			const eLines = _parseBlockLines2.eLines;
			const kReturn = _parseBlockLines2.kReturn;

			check(kReturn === 'plain', function () {
				return 'Can not make ' + kReturn + ' in statement context.';
			});
			return _Expression.BlockDo(loc, eLines);
		},
		      _parseBlockBody = function (k) {
			_UUtil.assert(k === 'val' || k === 'module' || k === 'any');

			// keys only matter if kReturn === 'obj'

			var _parseBlockLines3 = _parseBlockLines();

			const eLines = _parseBlockLines3.eLines;
			const kReturn = _parseBlockLines3.kReturn;
			const listLength = _parseBlockLines3.listLength;
			const mapLength = _parseBlockLines3.mapLength;
			const objKeys = _parseBlockLines3.objKeys;
			const debugKeys = _parseBlockLines3.debugKeys;

			var _ref = (function () {
				if (kReturn === 'bag') return {
					doLines: eLines,
					opReturn: _UOp.some(_Expression.ListReturn(loc, listLength))
				};
				if (kReturn === 'map') return {
					doLines: eLines,
					opReturn: _UOp.some(_Expression.MapReturn(loc, mapLength))
				};

				const lastReturn = !_UBag.isEmpty(eLines) && _UBag.last(eLines) instanceof _Expression.Val;
				if (kReturn === 'obj' && k !== 'module') return lastReturn ? {
					doLines: _UBag.rtail(eLines),
					opReturn: _UOp.some(_Expression.ObjReturn(loc, objKeys, debugKeys, _UOp.some(_UBag.last(eLines)),
					// displayName is filled in by parseAssign.

					// displayName is filled in by parseAssign.
					_UOp.None))
				} : {
					doLines: eLines,
					opReturn: _UOp.some(_Expression.ObjReturn(loc, objKeys, debugKeys, _UOp.None, _UOp.None))
				};else return lastReturn ? { doLines: _UBag.rtail(eLines), opReturn: _UOp.some(_UBag.last(eLines)) } : { doLines: eLines, opReturn: _UOp.None };
			})();

			const doLines = _ref.doLines;
			const opReturn = _ref.opReturn;

			switch (k) {
				case 'val':
					return _UOp.ifElse(opReturn, function (returned) {
						return _Expression.BlockVal(loc, doLines, returned);
					}, function () {
						return cx.fail('Expected a value block.');
					});
				case 'any':
					return _UOp.ifElse(opReturn, function (returned) {
						return _Expression.BlockVal(loc, doLines, returned);
					}, function () {
						return _Expression.BlockDo(loc, doLines);
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
						return _Expression.BlockDo(loc, lines);
					}
				default:
					throw new Error(k);
			}
		},
		      _parseBlockLines = function () {
			const lines = tokens;
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
				return addLine(wg(line, parseLine, listLength));
			});

			const isObj = !(_UBag.isEmpty(objKeys) && _UBag.isEmpty(debugKeys));
			// TODO
			// if (isEmpty(objKeys))
			//	cx.check(isEmpty(debugKeys), loc, 'Block can't have only debug keys')
			const isBag = listLength > 0;
			const isMap = mapLength > 0;
			check(!(isObj && isBag), 'Block has both Bag and Obj lines.');
			check(!(isObj && isMap), 'Block has both Obj and Map lines.');
			check(!(isBag && isMap), 'Block has both Bag and Map lines.');

			const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain';
			return { eLines: eLines, kReturn: kReturn, listLength: listLength, mapLength: mapLength, objKeys: objKeys, debugKeys: debugKeys };
		};

		const parseCase = function (k, casedFromFun) {
			const isVal = k === 'case';

			var _takeBlockLinesFromEnd3 = takeBlockLinesFromEnd();

			const before = _takeBlockLinesFromEnd3.before;
			const lines = _takeBlockLinesFromEnd3.lines;

			const opCased = (function () {
				if (casedFromFun) {
					checkEmpty(before, 'Can\'t give focus to case - it is the function\'s implicit first argument.');
					return (_UOp.None
					);
				} else return _UOp.opIf(!before.isEmpty(), function () {
					return w0(before, function () {
						return _Expression.Assign.focus(loc, parseExpr());
					});
				});
			})();

			const l = lines.last();

			var _ref2 = _Token.Keyword.isElse(_UBag.head(l.tokens)) ? {
				partLines: lines.rtail(),
				opElse: _UOp.some(w1(_Slice.all(l.tokens).tail(), isVal ? justBlockVal : justBlockDo))
			} : {
				partLines: lines,
				opElse: _UOp.None
			};

			const partLines = _ref2.partLines;
			const opElse = _ref2.opElse;

			const parts = partLines.map(function (line) {
				var _wg = wg(line, isVal ? takeBlockValFromEnd : takeBlockDoFromEnd);

				const before = _wg.before;
				const block = _wg.block;

				const test = w0(before, _parseCaseTest);
				return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, block);
			});

			check(parts.length > 0, 'Must have at least 1 non-`else` test.');

			return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(loc, opCased, parts, opElse);
		};
		// parseCase privates
		const _parseCaseTest = function () {
			const first = tokens.head();
			// Pattern match starts with type test and is followed by local declares.
			// E.g., `:Some val`
			if (_Token.Group.isSpaced(first) && tokens.size() > 1) {
				const ft = _Slice.all(first.tokens);
				if (_Token.Keyword.isColon(ft.head())) {
					const type = w0(ft.tail(), parseSpaced);
					const locals = w0(tokens.tail(), parseLocalDeclares);
					return _Expression.Pattern(first.loc, type, locals, _Expression.LocalAccess.focus(loc));
				}
			}
			return parseExpr();
		};

		const parseExpr = function () {
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
					const value = w0(tokensValue, parseExprPlain);
					cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
						return 'Duplicate property ' + local + '.';
					});
					Object.defineProperty(keysVals, local.name, { value: value });
				}
				_UUtil.assert(_UBag.last(splits).at === undefined);
				const val = _Expression.ObjSimple(loc, keysVals);
				if (tokensCaller.isEmpty()) return val;else {
					const parts = w0(tokensCaller, parseExprParts);
					_UUtil.assert(!_UBag.isEmpty(parts));
					return _Expression.Call(loc, _UBag.head(parts), _UBag.push(_UBag.tail(parts), val));
				}
			}, function () {
				return parseExprPlain();
			});
		},
		      parseExprParts = function () {
			const out = [];
			const end = tokens.end;
			for (let i = tokens.start; i < end; i = i + 1) {
				const here = tokens.data[i];
				if (here instanceof _Token.Keyword) {
					const rest = function () {
						return tokens._new(i + 1, end);
					};
					switch (here.k) {
						case '|':case '~|':
							return _UBag.push(out, w1(rest(), parseFun, here.k));
						case 'case':
							return _UBag.push(out, w2(rest(), parseCase, 'case', false));
						case '<~':
							return _UBag.push(out, _Expression.Yield(loc, w0(rest(), parseExpr)));
						case '<~~':
							return _UBag.push(out, _Expression.YieldTo(loc, w0(rest(), parseExpr)));
						default:
						// fallthrough
					}
				}
				out.push(parseSingle(here));
			}
			return out;
		},
		      parseExprPlain = function () {
			const parts = parseExprParts();
			switch (parts.length) {
				case 0:
					return _Expression.GlobalAccess.null(loc);
				case 1:
					return _UBag.head(parts);
				default:
					return _Expression.Call(loc, _UBag.head(parts), _UBag.tail(parts));
			}
		};

		const parseFun = function (k) {
			var _tryTakeReturnType2 = _tryTakeReturnType();

			const opReturnType = _tryTakeReturnType2.opReturnType;
			const rest = _tryTakeReturnType2.rest;

			check(!rest.isEmpty(), function () {
				return 'Expected an indented block after ' + _CompileError.code(k);
			});

			var _w0 = w0(rest, _funArgsAndBlock);

			const args = _w0.args;
			const opRestArg = _w0.opRestArg;
			const block = _w0.block;
			const opIn = _w0.opIn;
			const opOut = _w0.opOut;

			// Need res declare if there is a return type or out condition.
			const opResDeclare = _UOp.ifElse(opReturnType, function (rt) {
				return _UOp.some(_Expression.LocalDeclare.res(rt.loc, opReturnType));
			}, function () {
				return opOut.map(function (o) {
					return _Expression.LocalDeclare.res(o.loc, opReturnType);
				});
			});
			return _Expression.Fun(loc, k, args, opRestArg, block, opIn, opResDeclare, opOut);
		};

		// parseFun privates
		const _tryTakeReturnType = function () {
			if (!tokens.isEmpty()) {
				const h = tokens.head();
				if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(_UBag.head(h.tokens))) return {
					opReturnType: _UOp.some(w0(_Slice.all(h.tokens).tail(), parseSpaced)),
					rest: tokens.tail()
				};
			}
			return { opReturnType: _UOp.None, rest: tokens };
		},
		      _funArgsAndBlock = function () {
			const h = tokens.head();
			// Might be `|case`
			if (_Token.Keyword.isCaseOrCaseDo(h)) {
				const eCase = w2(tokens.tail(), parseCase, h.k, true);
				const args = [_Expression.LocalDeclare.focus(h.loc)];
				return h.k === 'case' ? {
					args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
					block: _Expression.BlockVal(loc, [], eCase)
				} : {
					args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
					block: _Expression.BlockDo(loc, [eCase])
				};
			} else {
				var _takeBlockLinesFromEnd4 = takeBlockLinesFromEnd();

				const before = _takeBlockLinesFromEnd4.before;
				const lines = _takeBlockLinesFromEnd4.lines;

				var _w02 = w0(before, _parseFunLocals);

				const args = _w02.args;
				const opRestArg = _w02.opRestArg;

				var _w03 = w0(lines, _tryTakeInOut);

				const opIn = _w03.opIn;
				const opOut = _w03.opOut;
				const rest = _w03.rest;

				const block = w0(rest, parseBlockFromLines);
				return { args: args, opRestArg: opRestArg, block: block, opIn: opIn, opOut: opOut };
			}
		},
		      _parseFunLocals = function () {
			if (tokens.isEmpty()) return { args: [], opRestArg: _UOp.None };else {
				const l = tokens.last();
				if (l instanceof _Token.DotName) {
					cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
					return {
						args: w0(tokens.rtail(), parseLocalDeclares),
						opRestArg: _UOp.some(_Expression.LocalDeclare(l.loc, l.name, _UOp.None, false, false))
					};
				} else return { args: parseLocalDeclares(), opRestArg: _UOp.None };
			}
		},
		      _tryTakeInOut = function () {
			const tryTakeInOrOut = function (lines, inOrOut) {
				if (!lines.isEmpty()) {
					const firstLine = lines.head();
					_UUtil.assert(_Token.Group.isLine(firstLine));
					const tokensFirst = _Slice.all(firstLine.tokens);
					if (_Token.Keyword.is(inOrOut)(tokensFirst.head())) return {
						took: _UOp.some(_Expression.Debug(firstLine.loc, w0(tokensFirst, parseLinesFromBlock))),
						rest: lines.tail()
					};
				}
				return { took: _UOp.None, rest: lines };
			};

			var _tryTakeInOrOut = tryTakeInOrOut(tokens, 'in');

			const opIn = _tryTakeInOrOut.took;
			const restIn = _tryTakeInOrOut.rest;

			var _tryTakeInOrOut2 = tryTakeInOrOut(restIn, 'out');

			const opOut = _tryTakeInOrOut2.took;
			const rest = _tryTakeInOrOut2.rest;

			return { opIn: opIn, opOut: opOut, rest: rest };
		};

		const parseLine = function () {
			const h = tokens.head();
			const rest = tokens.tail();

			// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
			if (h instanceof _Token.Keyword) switch (h.k) {
				case '. ':
					// Index is set by parseBlock.
					return _Expression.ListEntry(loc, w0(rest, parseExpr), -1);
				case 'case!':
					return w2(rest, parseCase, 'case!', false);
				case 'debug':
					return _Token.Group.isBlock(tokens.second()) ?
					// `debug`, then indented block
					_Expression.Debug(loc, parseLinesFromBlock()) :
					// `debug`, then single line
					_Expression.Debug(loc, w0(rest, parseLineOrLines));
				case 'debugger':
					checkEmpty(rest, function () {
						return 'Did not expect anything after ' + h;
					});
					return _Expression.Special.debugger(loc);
				case 'end-loop!':
					checkEmpty(rest, function () {
						return 'Did not expect anything after ' + h;
					});
					return _Expression.EndLoop(loc);
				case 'loop!':
					return _Expression.Loop(loc, w0(rest, justBlockDo));
				case 'region':
					return parseLinesFromBlock();
				default:
				// fall through
			}

			return _UOp.ifElse(tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref3) {
				let before = _ref3.before;
				let at = _ref3.at;
				let after = _ref3.after;

				return at.k === '->' ? _parseMapEntry(before, after) : _parseAssign(before, at, after);
			}, function () {
				return parseExpr();
			});
		},
		      parseLineOrLines = function () {
			const _ = parseLine();
			return _ instanceof Array ? _ : [_];
		};

		// parseLine privates
		const _parseAssign = function (assigned, assigner, value) {
			let locals = w0(assigned, parseLocalDeclares);
			const k = assigner.k;
			const eValuePre = value.isEmpty() ? _Expression.GlobalAccess.true(loc) : w0(value, parseExpr);

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
				check(isYield, 'Assignment to nothing');
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
		      _parseMapEntry = function (before, after) {
			return (
				// TODO: index Filled in by ???
				_Expression.MapEntry(loc, w0(before, parseExpr), w0(after, parseExpr), -1)
			);
		};

		const parseLocalDeclares = function () {
			return tokens.map(parseLocalDeclare);
		},
		      parseLocalDeclare = function (t) {
			let name;
			let opType = _UOp.None;
			let isLazy = false;

			if (_Token.Group.isSpaced(t)) {
				const tokens = _Slice.all(t.tokens);
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
					check(rest2.size() > 1, function () {
						return 'Expected something after ' + colon;
					});
					const tokensType = rest2.tail();
					opType = _UOp.some(w0(tokensType, parseSpaced));
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
					return _access(t.name);
				case t instanceof _Token.Group:
					switch (t.k) {
						case _Token.G_Space:
							return wg(t, parseSpaced);
						case _Token.G_Paren:
							return wg(t, parseExpr);
						case _Token.G_Bracket:
							return _Expression.ListSimple(t.loc, wg(t, parseExprParts));
						case _Token.G_Block:
							return wg(t, blockWrap, 'val');
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
					return _Expression.Call(t.loc, _access(t.name), [_Expression.LocalAccess.focus(t.loc)]);
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
		const _access = function (name) {
			return _Lang.JsGlobals.has(name) ? _Expression.GlobalAccess(loc, name) : _Expression.LocalAccess(loc, name);
		};

		const parseSpaced = function () {
			const h = tokens.head(),
			      rest = tokens.tail();
			switch (true) {
				case h instanceof _Token.Keyword:
					if (h.k === ':') {
						cx.check(!_Token.Keyword.isColon(rest.head()), h.loc, function () {
							return 'Two ' + h + ' in a row';
						});
						const eType = w0(rest, parseSpaced);
						const focus = _Expression.LocalAccess.focus(h.loc);
						return _Expression.Call.contains(h.loc, eType, focus);
					} else if (h.k === '~') return _Expression.Lazy(h.loc, w0(rest, parseSpaced));
				default:
					{
						const memberOrSubscript = function (e, t) {
							const loc = t.loc;
							if (t instanceof _Token.DotName) {
								cx.check(t.nDots === 1, loc, 'Too many dots!');
								return _Expression.Member(loc, e, t.name);
							} else if (t instanceof _Token.Group) {
								if (t.k === _Token.G_Bracket) return _Expression.Call.sub(loc, _UBag.unshift(e, wg(t, parseExprParts)));
								if (t.k === _Token.G_Paren) {
									cx.check(_UBag.isEmpty(t.tokens), loc, function () {
										return 'Use ' + _CompileError.code('(a b)') + ', not ' + _CompileError.code('a(b)');
									});
									return _Expression.Call(loc, e, []);
								}
							} else cx.fail(loc, 'Expected member or sub, not ' + t);
						};
						return rest.reduce(memberOrSubscript, parseSingle(h));
					}
			}
		};

		const tryParseUse = function (k) {
			if (!tokens.isEmpty()) {
				const l0 = tokens.head();
				_UUtil.assert(_Token.Group.isLine(l0));
				if (_Token.Keyword.is(k)(_UBag.head(l0.tokens))) return {
					uses: w1(_Slice.all(l0.tokens).tail(), _parseUse, k),
					rest: tokens.tail()
				};
			}
			return { uses: [], rest: tokens };
		};

		// tryParseUse privates
		const _parseUse = function (k) {
			var _takeBlockLinesFromEnd5 = takeBlockLinesFromEnd();

			const before = _takeBlockLinesFromEnd5.before;
			const lines = _takeBlockLinesFromEnd5.lines;

			check(before.isEmpty(), function () {
				return 'Did not expect anything after ' + _CompileError.code(k) + ' other than a block';
			});
			return lines.map(function (line) {
				return wg(line, _useLine, k);
			});
		},
		     

		// TODO:ES6 Just use module imports, no AssignDestructure needed
		_useLine = function (k) {
			const tReq = tokens.head();

			var _parseRequire2 = _parseRequire(tReq);

			const path = _parseRequire2.path;
			const name = _parseRequire2.name;

			if (k === 'use!') {
				check(tokens.size() === 1, function () {
					return 'Unexpected ' + tokens[1];
				});
				return _Expression.UseDo(loc, path);
			} else {
				const isLazy = k === 'use~' || k === 'use-debug';

				var _w2 = w2(tokens.tail(), _parseThingsUsed, name, isLazy);

				const used = _w2.used;
				const opUseDefault = _w2.opUseDefault;

				return _Expression.Use(loc, path, used, opUseDefault);
			}
		},
		      _parseThingsUsed = function (name, isLazy) {
			const useDefault = function () {
				return _Expression.LocalDeclare(loc, name, _UOp.None, isLazy, false);
			};
			if (tokens.isEmpty()) return { used: [], opUseDefault: _UOp.some(useDefault()) };else {
				const hasDefaultUse = _Token.Keyword.isFocus(tokens.head());
				const opUseDefault = _UOp.opIf(hasDefaultUse, useDefault);
				const rest = hasDefaultUse ? tokens.tail() : tokens;
				const used = w0(rest, parseLocalDeclares).map(function (l) {
					check(l.name !== '_', function () {
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
				check(_Token.Group.isSpaced(t), 'Not a valid module name.');
				return wg(t, _parseLocalRequire);
			}
		},
		      _parseLocalRequire = function () {
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

		return parseModule();
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFld0IsS0FBSzs7Ozs7Ozs7QUFBZCxVQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzVDLFNBSlEsTUFBTSxDQUlQLE9BUnVCLEtBQUssQ0FRdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDaEMsTUFBSSxNQUFNLEdBQUcsT0FBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3hDLE1BQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUE7OztBQUd2QixRQUNDLEtBQUssR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPO1VBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7R0FBQTtRQUM3QixVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztVQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtXQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFBQSxFQUFFLE9BQU8sQ0FBQztHQUFBO1FBQ2xFLEVBQUUsR0FBRyxVQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUs7QUFDdEIsU0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFBO0FBQ2hCLFNBQU0sR0FBRyxPQUFPLENBQUE7QUFDaEIsU0FBTSxDQUFDLEdBQUcsR0FBRyxDQUFBO0FBQ2IsTUFBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JELFNBQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLFNBQU0sR0FBRyxDQUFDLENBQUE7QUFDVixNQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQ1AsVUFBTyxHQUFHLENBQUE7R0FDVjtRQUNELEVBQUUsR0FBRyxVQUFDLE9BQU8sRUFBRSxH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TSxDQXV6QmQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0dBQUEsQ0FBQTs7QUFFakUsU0FBTyxXQUFXLEVBQUUsQ0FBQTtFQUNwQiIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9wYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgQXNzaWduLCBBc3NpZ25EZXN0cnVjdHVyZSwgQmxvY2tEbywgQmxvY2tWYWwsIEJsb2NrV3JhcCwgQ2FsbCwgQ2FzZURvUGFydCwgQ2FzZVZhbFBhcnQsXG5cdENhc2VEbywgQ2FzZVZhbCwgRGVidWcsIE51bWJlckxpdGVyYWwsIEVuZExvb3AsIEZ1biwgR2xvYmFsQWNjZXNzLCBMYXp5LCBMaXN0RW50cnksIExpc3RSZXR1cm4sXG5cdExpc3RTaW1wbGUsIExvY2FsQWNjZXNzLCBMb2NhbERlY2xhcmUsIExvY2FsRGVjbGFyZSwgTG9vcCwgTWFwRW50cnksIE1hcFJldHVybiwgTWVtYmVyLCBNb2R1bGUsXG5cdE1vZHVsZURlZmF1bHRFeHBvcnQsIE9ialJldHVybiwgT2JqU2ltcGxlLCBQYXR0ZXJuLCBRdW90ZSwgU3BlY2lhbCwgU3BsYXQsIFZhbCwgVXNlRG8sIFVzZSxcblx0WWllbGQsIFlpZWxkVG8gfSBmcm9tICcuLi9FeHByZXNzaW9uJ1xuaW1wb3J0IHsgSnNHbG9iYWxzLCBTcGVjaWFsS2V5d29yZHMgfSBmcm9tICcuL0xhbmcnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCxcblx0R19QYXJlbiwgR19TcGFjZSwgR19RdW90ZSwgS2V5d29yZCwgVG9rZW5OdW1iZXJMaXRlcmFsLCBOYW1lIH0gZnJvbSAnLi9Ub2tlbidcbmltcG9ydCB7IGNhdCwgaGVhZCwgZmxhdE1hcCwgaXNFbXB0eSwgbGFzdCwgcHVzaCwgcmVwZWF0LCBydGFpbCwgdGFpbCwgdW5zaGlmdCB9IGZyb20gJy4vVS9CYWcnXG5pbXBvcnQgeyBpZkVsc2UsIE5vbmUsIG9wSWYsIHNvbWUgfSBmcm9tICcuL1UvT3AnXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL1UvdXRpbCdcbmltcG9ydCBTbGljZSBmcm9tICcuL1UvU2xpY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKGN4LCByb290VG9rZW4pIHtcblx0YXNzZXJ0KEdyb3VwLmlzQmxvY2socm9vdFRva2VuKSlcblx0bGV0IHRva2VucyA9IFNsaWNlLmFsbChyb290VG9rZW4udG9rZW5zKVxuXHRsZXQgbG9jID0gcm9vdFRva2VuLmxvY1xuXG5cdC8vIEZ1bmN0aW9ucyBmb3IgbW92aW5nIHRocm91Z2ggdG9rZW5zOlxuXHRjb25zdFxuXHRcdGNoZWNrID0gKGNvbmQsIG1lc3NhZ2UpID0+XG5cdFx0XHRjeC5jaGVjayhjb25kLCBsb2MsIG1lc3NhZ2UpLFxuXHRcdGNoZWNrRW1wdHkgPSAodG9rZW5zLCBtZXNzYWdlKSA9PlxuXHRcdFx0Y3guY2hlY2sodG9rZW5zLmlzRW1wdHkoKSwgKCkgPT4gX2xvY0Zyb21Ub2tlbnModG9rZW5zKSwgbWVzc2FnZSksXG5cdFx0dzAgPSAoX3Rva2VucywgZnVuKSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gdG9rZW5zXG5cdFx0XHR0b2tlbnMgPSBfdG9rZW5zXG5cdFx0XHRjb25zdCBsID0gbG9jXG5cdFx0XHRsb2MgPSB0b2tlbnMuaXNFbXB0eSgpID8gbG9jIDogX2xvY0Zyb21Ub2tlbnModG9rZW5zKVxuXHRcdFx0Y29uc3QgcmVzID0gZnVuKClcblx0XHRcdHRva2VucyA9IHRcblx0XHRcdGxvYyA9IGxcblx0XHRcdHJldHVybiByZXNcblx0XHR9LFxuXHRcdHcxID0gKF90b2tlbnMsIGZ1biwgYXJnKSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gdG9rZW5zXG5cdFx0XHR0b2tlbnMgPSBfdG9rZW5zXG5cdFx0XHRjb25zdCBsID0gbG9jXG5cdFx0XHRsb2MgPSB0b2tlbnMuaXNFbXB0eSgpID8gbG9jIDogX2xvY0Zyb21Ub2tlbnModG9rZW5zKVxuXHRcdFx0Y29uc3QgcmVzID0gZnVuKGFyZylcblx0XHRcdHRva2VucyA9IHRcblx0XHRcdGxvYyA9IGxcblx0XHRcdHJldHVybiByZXNcblx0XHR9LFxuXHRcdHcyID0gKF90b2tlbnMsIGZ1biwgYXJnLCBhcmcyKSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gdG9rZW5zXG5cdFx0XHR0b2tlbnMgPSBfdG9rZW5zXG5cdFx0XHRjb25zdCBsID0gbG9jXG5cdFx0XHRsb2MgPSB0b2tlbnMuaXNFbXB0eSgpID8gbG9jIDogX2xvY0Zyb21Ub2tlbnModG9rZW5zKVxuXHRcdFx0Y29uc3QgcmVzID0gZnVuKGFyZywgYXJnMilcblx0XHRcdHRva2VucyA9IHRcblx0XHRcdGxvYyA9IGxcblx0XHRcdHJldHVybiByZXNcblx0XHR9LFxuXHRcdHdnID0gKGdyb3VwLCBmdW4sIGFyZykgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IHRva2Vuc1xuXHRcdFx0dG9rZW5zID0gU2xpY2UuYWxsKGdyb3VwLnRva2Vucylcblx0XHRcdGNvbnN0IGwgPSBsb2Ncblx0XHRcdGxvYyA9IGdyb3VwLmxvY1xuXHRcdFx0Y29uc3QgcmVzID0gZnVuKGFyZylcblx0XHRcdHRva2VucyA9IHRcblx0XHRcdGxvYyA9IGxcblx0XHRcdHJldHVybiByZXNcblx0XHR9LFxuXHRcdF9sb2NGcm9tVG9rZW5zID0gdG9rZW5zID0+IExvYyh0b2tlbnMuaGVhZCgpLmxvYy5zdGFydCwgdG9rZW5zLmxhc3QoKS5sb2MuZW5kKSxcblx0XHR1bmV4cGVjdGVkID0gdCA9PiBjeC5mYWlsKHQubG9jLCBgVW5leHBlY3RlZCAke3R9YClcblxuXHRjb25zdCBwYXJzZU1vZHVsZSA9ICgpID0+IHtcblx0XHRjb25zdCB7IHVzZXM6IGRvVXNlcywgcmVzdCB9ID0gdHJ5UGFyc2VVc2UoJ3VzZSEnKVxuXHRcdGNvbnN0IHsgdXNlczogcGxhaW5Vc2VzLCByZXN0OiByZXN0MSB9ID0gdzEocmVzdCwgdHJ5UGFyc2VVc2UsICd1c2UnKVxuXHRcdGNvbnN0IHsgdXNlczogbGF6eVVzZXMsIHJlc3Q6IHJlc3QyIH0gPSB3MShyZXN0MSwgdHJ5UGFyc2VVc2UsICd1c2V+Jylcblx0XHRjb25zdCB7IHVzZXM6IGRlYnVnVXNlcywgcmVzdDogcmVzdDMgfSA9IHcxKHJlc3QyLCB0cnlQYXJzZVVzZSwgJ3VzZS1kZWJ1ZycpXG5cdFx0Y29uc3QgYmxvY2sgPSB3MChyZXN0MywgcGFyc2VNb2R1bGVCb2R5KVxuXG5cdFx0YmxvY2subGluZXMuZm9yRWFjaChsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gJ2V4cG9ydCcpXG5cdFx0XHRcdGNoZWNrKGxpbmUuYXNzaWduZWUubmFtZSAhPT0gJ2Rpc3BsYXlOYW1lJyxcblx0XHRcdFx0XHQnTW9kdWxlIGNhbiBub3QgY2hvb3NlIGl0cyBvd24gZGlzcGxheU5hbWUuJylcblx0XHR9KVxuXHRcdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkpXG5cdFx0XHRibG9jay5saW5lcy5wdXNoKFxuXHRcdFx0XHRBc3NpZ24oXG5cdFx0XHRcdFx0bG9jLFxuXHRcdFx0XHRcdExvY2FsRGVjbGFyZShsb2MsICdkaXNwbGF5TmFtZScsIFtdLCBmYWxzZSwgdHJ1ZSksXG5cdFx0XHRcdFx0J2V4cG9ydCcsXG5cdFx0XHRcdFx0UXVvdGUuZm9yU3RyaW5nKGxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblxuXHRcdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRcdHJldHVybiBNb2R1bGUobG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgYmxvY2spXG5cdH1cblxuXHQvLyBwYXJzZUJsb2NrXG5cdGNvbnN0XG5cdFx0dGFrZUJsb2NrTGluZXNGcm9tRW5kID0gKCkgPT4ge1xuXHRcdFx0Y2hlY2soIXRva2Vucy5pc0VtcHR5KCksICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jaycpXG5cdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0Y3guY2hlY2soR3JvdXAuaXNCbG9jayhsKSwgbC5sb2MsICdFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jayBhdCB0aGUgZW5kJylcblx0XHRcdHJldHVybiB7IGJlZm9yZTogdG9rZW5zLnJ0YWlsKCksIGxpbmVzOiBTbGljZS5hbGwobC50b2tlbnMpIH1cblx0XHR9LFxuXG5cdFx0YmxvY2tXcmFwID0gKCkgPT4gQmxvY2tXcmFwKGxvYywgX3BhcnNlQmxvY2tCb2R5KCd2YWwnKSksXG5cblx0XHRqdXN0QmxvY2tEbyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9jayB9ID0gdGFrZUJsb2NrRG9Gcm9tRW5kKClcblx0XHRcdGNoZWNrKGJlZm9yZS5pc0VtcHR5KCksICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRcdHJldHVybiBibG9ja1xuXHRcdH0sXG5cdFx0anVzdEJsb2NrVmFsID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgeyBiZWZvcmUsIGJsb2NrIH0gPSB0YWtlQmxvY2tWYWxGcm9tRW5kKClcblx0XHRcdGNoZWNrKGJlZm9yZS5pc0VtcHR5KCksICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRcdHJldHVybiBibG9ja1xuXHRcdH0sXG5cblx0XHR0YWtlQmxvY2tEb0Zyb21FbmQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdHsgYmVmb3JlLCBsaW5lcyB9ID0gdGFrZUJsb2NrTGluZXNGcm9tRW5kKClcblx0XHRcdGNvbnN0IGJsb2NrID0gdzAobGluZXMsIF9wYXJzZUJvZHlEbylcblx0XHRcdHJldHVybiB7IGJlZm9yZSwgYmxvY2sgfVxuXHRcdH0sXG5cdFx0dGFrZUJsb2NrVmFsRnJvbUVuZCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBsaW5lcyB9ID0gdGFrZUJsb2NrTGluZXNGcm9tRW5kKClcblx0XHRcdGNvbnN0IGJsb2NrID0gdzEobGluZXMsIF9wYXJzZUJsb2NrQm9keSwgJ3ZhbCcpXG5cdFx0XHRyZXR1cm4geyBiZWZvcmUsIGJsb2NrIH1cblx0XHR9LFxuXG5cdFx0Ly8gVE9ETzogSnVzdCBoYXZlIG1vZHVsZSByZXR1cm4gYSB2YWx1ZSBhbmQgdXNlIGEgbm9ybWFsIGJsb2NrLlxuXHRcdHBhcnNlTW9kdWxlQm9keSA9ICgpID0+IF9wYXJzZUJsb2NrQm9keSgnbW9kdWxlJyksXG5cblx0XHRwYXJzZUJsb2NrRnJvbUxpbmVzID0gKCkgPT4gX3BhcnNlQmxvY2tCb2R5KCdhbnknKSxcblxuXHRcdC8vIEdldHMgbGluZXMgaW4gYSByZWdpb24gb3IgRGVidWcuXG5cdFx0cGFyc2VMaW5lc0Zyb21CbG9jayA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRjeC5jaGVjayh0b2tlbnMuc2l6ZSgpID4gMSwgaC5sb2MsICgpID0+IGBFeHBlY3RlZCBpbmRlbnRlZCBibG9jayBhZnRlciAke2h9YClcblx0XHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLnNlY29uZCgpXG5cdFx0XHRhc3NlcnQodG9rZW5zLnNpemUoKSA9PT0gMiAmJiBHcm91cC5pc0Jsb2NrKGJsb2NrKSlcblx0XHRcdHJldHVybiBmbGF0TWFwKGJsb2NrLnRva2VucywgbGluZSA9PiB3ZyhsaW5lLCBwYXJzZUxpbmVPckxpbmVzKSlcblx0XHR9XG5cblx0Ly8gcGFyc2VCbG9jayBwcml2YXRlc1xuXHRjb25zdFxuXHRcdF9wYXJzZUJvZHlEbyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgZUxpbmVzLCBrUmV0dXJuIH0gPSBfcGFyc2VCbG9ja0xpbmVzKClcblx0XHRcdGNoZWNrKGtSZXR1cm4gPT09ICdwbGFpbicsICgpID0+IGBDYW4gbm90IG1ha2UgJHtrUmV0dXJufSBpbiBzdGF0ZW1lbnQgY29udGV4dC5gKVxuXHRcdFx0cmV0dXJuIEJsb2NrRG8obG9jLCBlTGluZXMpXG5cdFx0fSxcblxuXHRcdF9wYXJzZUJsb2NrQm9keSA9IGsgPT4ge1xuXHRcdFx0YXNzZXJ0KGsgPT09ICd2YWwnIHx8IGsgPT09ICdtb2R1bGUnIHx8IGsgPT09ICdhbnknKVxuXG5cdFx0XHQvLyBrZXlzIG9ubHkgbWF0dGVyIGlmIGtSZXR1cm4gPT09ICdvYmonXG5cdFx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiwgbGlzdExlbmd0aCwgbWFwTGVuZ3RoLCBvYmpLZXlzLCBkZWJ1Z0tleXMgfSA9XG5cdFx0XHRcdF9wYXJzZUJsb2NrTGluZXMoKVxuXG5cdFx0XHRjb25zdCB7IGRvTGluZXMsIG9wUmV0dXJuIH0gPSAoKCkgPT4ge1xuXHRcdFx0XHRpZiAoa1JldHVybiA9PT0gJ2JhZycpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKExpc3RSZXR1cm4obG9jLCBsaXN0TGVuZ3RoKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGlmIChrUmV0dXJuID09PSAnbWFwJylcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoTWFwUmV0dXJuKGxvYywgbWFwTGVuZ3RoKSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgbGFzdFJldHVybiA9ICFpc0VtcHR5KGVMaW5lcykgJiYgbGFzdChlTGluZXMpIGluc3RhbmNlb2YgVmFsXG5cdFx0XHRcdGlmIChrUmV0dXJuID09PSAnb2JqJyAmJiBrICE9PSAnbW9kdWxlJylcblx0XHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksXG5cdFx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0XHRsb2MsXG5cdFx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0tleXMsXG5cdFx0XHRcdFx0XHRcdFx0c29tZShsYXN0KGVMaW5lcykpLFxuXHRcdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0XHROb25lKSlcblx0XHRcdFx0XHRcdH0gOiB7XG5cdFx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoT2JqUmV0dXJuKFxuXHRcdFx0XHRcdFx0XHRcdGxvYyxcblx0XHRcdFx0XHRcdFx0XHRvYmpLZXlzLFxuXHRcdFx0XHRcdFx0XHRcdGRlYnVnS2V5cyxcblx0XHRcdFx0XHRcdFx0XHROb25lLFxuXHRcdFx0XHRcdFx0XHRcdC8vIGRpc3BsYXlOYW1lIGlzIGZpbGxlZCBpbiBieSBwYXJzZUFzc2lnbi5cblx0XHRcdFx0XHRcdFx0XHROb25lKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiBsYXN0UmV0dXJuID9cblx0XHRcdFx0XHR7IGRvTGluZXM6IHJ0YWlsKGVMaW5lcyksIG9wUmV0dXJuOiBzb21lKGxhc3QoZUxpbmVzKSkgfSA6XG5cdFx0XHRcdFx0eyBkb0xpbmVzOiBlTGluZXMsIG9wUmV0dXJuOiBOb25lIH1cblx0XHRcdH0pKClcblxuXHRcdFx0c3dpdGNoIChrKSB7XG5cdFx0XHRcdGNhc2UgJ3ZhbCc6XG5cdFx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKGxvYywgZG9MaW5lcywgcmV0dXJuZWQpLFxuXHRcdFx0XHRcdFx0KCkgPT4gY3guZmFpbCgnRXhwZWN0ZWQgYSB2YWx1ZSBibG9jay4nKSlcblx0XHRcdFx0Y2FzZSAnYW55Jzpcblx0XHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdFx0cmV0dXJuZWQgPT4gQmxvY2tWYWwobG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0XHQoKSA9PiBCbG9ja0RvKGxvYywgZG9MaW5lcykpXG5cdFx0XHRcdGNhc2UgJ21vZHVsZSc6IHtcblx0XHRcdFx0XHQvLyBUT0RPOiBIYW5kbGUgZGVidWctb25seSBleHBvcnRzXG5cdFx0XHRcdFx0Y29uc3QgbGluZXMgPVxuXHRcdFx0XHRcdFx0Ly8gVHVybiBPYmogYXNzaWducyBpbnRvIGV4cG9ydHMuXG5cdFx0XHRcdFx0XHRjYXQoXG5cdFx0XHRcdFx0XHRcdGRvTGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gJy4gJylcblx0XHRcdFx0XHRcdFx0XHRcdGxpbmUuayA9ICdleHBvcnQnXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGxpbmVcblx0XHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRcdG9wUmV0dXJuLm1hcChyZXQgPT4gTW9kdWxlRGVmYXVsdEV4cG9ydChyZXQubG9jLCByZXQpKSlcblx0XHRcdFx0XHRyZXR1cm4gQmxvY2tEbyhsb2MsIGxpbmVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihrKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VCbG9ja0xpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgbGluZXMgPSB0b2tlbnNcblx0XHRcdGNvbnN0IG9iaktleXMgPSBbXSwgZGVidWdLZXlzID0gW11cblx0XHRcdGxldCBsaXN0TGVuZ3RoID0gMCwgbWFwTGVuZ3RoID0gMFxuXHRcdFx0Y29uc3QgZUxpbmVzID0gW11cblx0XHRcdGNvbnN0IGFkZExpbmUgPSAobG4sIGluRGVidWcpID0+IHtcblx0XHRcdFx0aWYgKGxuIGluc3RhbmNlb2YgQXJyYXkpXG5cdFx0XHRcdFx0bG4uZm9yRWFjaChfID0+IGFkZExpbmUoXywgaW5EZWJ1ZykpXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmIChsbiBpbnN0YW5jZW9mIERlYnVnKVxuXHRcdFx0XHRcdFx0bG4ubGluZXMuZm9yRWFjaChfID0+IGFkZExpbmUoXywgdHJ1ZSkpXG5cdFx0XHRcdFx0ZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBMaXN0RW50cnkpIHtcblx0XHRcdFx0XHRcdGFzc2VydCghaW5EZWJ1ZywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIGxpc3QgZW50cmllcycpXG5cdFx0XHRcdFx0XHQvLyBXaGVuIExpc3RFbnRyaWVzIGFyZSBmaXJzdCBjcmVhdGVkIHRoZXkgaGF2ZSBubyBpbmRleC5cblx0XHRcdFx0XHRcdGFzc2VydChsbi5pbmRleCA9PT0gLTEpXG5cdFx0XHRcdFx0XHRsbi5pbmRleCA9IGxpc3RMZW5ndGhcblx0XHRcdFx0XHRcdGxpc3RMZW5ndGggPSBsaXN0TGVuZ3RoICsgMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIE1hcEVudHJ5KSB7XG5cdFx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBtYXAgZW50cmllcycpXG5cdFx0XHRcdFx0XHRhc3NlcnQobG4uaW5kZXggPT09IC0xKVxuXHRcdFx0XHRcdFx0bG4uaW5kZXggPSBtYXBMZW5ndGhcblx0XHRcdFx0XHRcdG1hcExlbmd0aCA9IG1hcExlbmd0aCArIDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBBc3NpZ24gJiYgbG4uayA9PT0gJy4gJylcblx0XHRcdFx0XHRcdChpbkRlYnVnID8gZGVidWdLZXlzIDogb2JqS2V5cykucHVzaChsbi5hc3NpZ25lZSlcblxuXHRcdFx0XHRcdGlmICghaW5EZWJ1Zylcblx0XHRcdFx0XHRcdC8vIEVsc2Ugd2UgYXJlIGFkZGluZyB0aGUgRGVidWcgYXMgYSBzaW5nbGUgbGluZS5cblx0XHRcdFx0XHRcdGVMaW5lcy5wdXNoKGxuKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsaW5lcy5lYWNoKGxpbmUgPT4gYWRkTGluZSh3ZyhsaW5lLCBwYXJzZUxpbmUsIGxpc3RMZW5ndGgpKSlcblxuXHRcdFx0Y29uc3QgaXNPYmogPSAhKGlzRW1wdHkob2JqS2V5cykgJiYgaXNFbXB0eShkZWJ1Z0tleXMpKVxuXHRcdFx0Ly8gVE9ET1xuXHRcdFx0Ly8gaWYgKGlzRW1wdHkob2JqS2V5cykpXG5cdFx0XHQvL1x0Y3guY2hlY2soaXNFbXB0eShkZWJ1Z0tleXMpLCBsb2MsICdCbG9jayBjYW4ndCBoYXZlIG9ubHkgZGVidWcga2V5cycpXG5cdFx0XHRjb25zdCBpc0JhZyA9IGxpc3RMZW5ndGggPiAwXG5cdFx0XHRjb25zdCBpc01hcCA9IG1hcExlbmd0aCA+IDBcblx0XHRcdGNoZWNrKCEoaXNPYmogJiYgaXNCYWcpLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBPYmogbGluZXMuJylcblx0XHRcdGNoZWNrKCEoaXNPYmogJiYgaXNNYXApLCAnQmxvY2sgaGFzIGJvdGggT2JqIGFuZCBNYXAgbGluZXMuJylcblx0XHRcdGNoZWNrKCEoaXNCYWcgJiYgaXNNYXApLCAnQmxvY2sgaGFzIGJvdGggQmFnIGFuZCBNYXAgbGluZXMuJylcblxuXHRcdFx0Y29uc3Qga1JldHVybiA9IGlzT2JqID8gJ29iaicgOiBpc0JhZyA/ICdiYWcnIDogaXNNYXAgPyAnbWFwJyA6ICdwbGFpbidcblx0XHRcdHJldHVybiB7IGVMaW5lcywga1JldHVybiwgbGlzdExlbmd0aCwgbWFwTGVuZ3RoLCBvYmpLZXlzLCBkZWJ1Z0tleXMgfVxuXHRcdH1cblxuXHRjb25zdCBwYXJzZUNhc2UgPSAoaywgY2FzZWRGcm9tRnVuKSA9PiB7XG5cdFx0Y29uc3QgaXNWYWwgPSBrID09PSAnY2FzZSdcblxuXHRcdGNvbnN0IHsgYmVmb3JlLCBsaW5lcyB9ID0gdGFrZUJsb2NrTGluZXNGcm9tRW5kKClcblxuXHRcdGNvbnN0IG9wQ2FzZWQgPSAoKCkgPT4ge1xuXHRcdFx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdFx0XHRjaGVja0VtcHR5KGJlZm9yZSxcblx0XHRcdFx0XHQnQ2FuXFwndCBnaXZlIGZvY3VzIHRvIGNhc2UgLSBpdCBpcyB0aGUgZnVuY3Rpb25cXCdzIGltcGxpY2l0IGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0XHRcdHJldHVybiBOb25lXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PlxuXHRcdFx0XHR3MChiZWZvcmUsICgpID0+IEFzc2lnbi5mb2N1cyhsb2MsIHBhcnNlRXhwcigpKSkpXG5cdFx0fSkoKVxuXG5cdFx0Y29uc3QgbCA9IGxpbmVzLmxhc3QoKVxuXHRcdGNvbnN0IHsgcGFydExpbmVzLCBvcEVsc2UgfSA9IEtleXdvcmQuaXNFbHNlKGhlYWQobC50b2tlbnMpKSA/IHtcblx0XHRcdFx0cGFydExpbmVzOiBsaW5lcy5ydGFpbCgpLFxuXHRcdFx0XHRvcEVsc2U6IHNvbWUodzEoU2xpY2UuYWxsKGwudG9rZW5zKS50YWlsKCksIGlzVmFsID8ganVzdEJsb2NrVmFsIDoganVzdEJsb2NrRG8pKVxuXHRcdFx0fSA6IHtcblx0XHRcdFx0cGFydExpbmVzOiBsaW5lcyxcblx0XHRcdFx0b3BFbHNlOiBOb25lXG5cdFx0XHR9XG5cblx0XHRjb25zdCBwYXJ0cyA9IHBhcnRMaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRjb25zdCB7IGJlZm9yZSwgYmxvY2sgfSA9XG5cdFx0XHRcdHdnKGxpbmUsIGlzVmFsID8gdGFrZUJsb2NrVmFsRnJvbUVuZCA6IHRha2VCbG9ja0RvRnJvbUVuZClcblx0XHRcdGNvbnN0IHRlc3QgPSB3MChiZWZvcmUsIF9wYXJzZUNhc2VUZXN0KVxuXHRcdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWxQYXJ0IDogQ2FzZURvUGFydCkobGluZS5sb2MsIHRlc3QsIGJsb2NrKVxuXHRcdH0pXG5cblx0XHRjaGVjayhwYXJ0cy5sZW5ndGggPiAwLCAnTXVzdCBoYXZlIGF0IGxlYXN0IDEgbm9uLWBlbHNlYCB0ZXN0LicpXG5cblx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbCA6IENhc2VEbykobG9jLCBvcENhc2VkLCBwYXJ0cywgb3BFbHNlKVxuXHR9XG5cdC8vIHBhcnNlQ2FzZSBwcml2YXRlc1xuXHRjb25zdFxuXHRcdF9wYXJzZUNhc2VUZXN0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgZmlyc3QgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHQvLyBQYXR0ZXJuIG1hdGNoIHN0YXJ0cyB3aXRoIHR5cGUgdGVzdCBhbmQgaXMgZm9sbG93ZWQgYnkgbG9jYWwgZGVjbGFyZXMuXG5cdFx0XHQvLyBFLmcuLCBgOlNvbWUgdmFsYFxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKGZpcnN0KSAmJiB0b2tlbnMuc2l6ZSgpID4gMSkge1xuXHRcdFx0XHRjb25zdCBmdCA9IFNsaWNlLmFsbChmaXJzdC50b2tlbnMpXG5cdFx0XHRcdGlmIChLZXl3b3JkLmlzQ29sb24oZnQuaGVhZCgpKSkge1xuXHRcdFx0XHRcdGNvbnN0IHR5cGUgPSB3MChmdC50YWlsKCksIHBhcnNlU3BhY2VkKVxuXHRcdFx0XHRcdGNvbnN0IGxvY2FscyA9IHcwKHRva2Vucy50YWlsKCksIHBhcnNlTG9jYWxEZWNsYXJlcylcblx0XHRcdFx0XHRyZXR1cm4gUGF0dGVybihmaXJzdC5sb2MsIHR5cGUsIGxvY2FscywgTG9jYWxBY2Nlc3MuZm9jdXMobG9jKSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhcnNlRXhwcigpXG5cdFx0fVxuXG5cdGNvbnN0XG5cdFx0cGFyc2VFeHByID0gKCkgPT4ge1xuXHRcdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE1hbnlXaGVyZShLZXl3b3JkLmlzT2JqQXNzaWduKSxcblx0XHRcdFx0c3BsaXRzID0+IHtcblx0XHRcdFx0XHQvLyBTaG9ydCBvYmplY3QgZm9ybSwgc3VjaCBhcyAoYS4gMSwgYi4gMilcblx0XHRcdFx0XHRjb25zdCBmaXJzdCA9IHNwbGl0c1swXS5iZWZvcmVcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNDYWxsZXIgPSBmaXJzdC5ydGFpbCgpXG5cblx0XHRcdFx0XHRjb25zdCBrZXlzVmFscyA9IHt9XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoIC0gMTsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsb2NhbCA9IHBhcnNlTG9jYWxEZWNsYXJlKHNwbGl0c1tpXS5iZWZvcmUubGFzdCgpKVxuXHRcdFx0XHRcdFx0Ly8gQ2FuJ3QgaGF2ZSBnb3QgYSB0eXBlIGJlY2F1c2UgdGhlcmUncyBvbmx5IG9uZSB0b2tlbi5cblx0XHRcdFx0XHRcdGFzc2VydChpc0VtcHR5KGxvY2FsLm9wVHlwZSkpXG5cdFx0XHRcdFx0XHRjb25zdCB0b2tlbnNWYWx1ZSA9IGkgPT09IHNwbGl0cy5sZW5ndGggLSAyID9cblx0XHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUgOlxuXHRcdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZS5ydGFpbCgpXG5cdFx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHcwKHRva2Vuc1ZhbHVlLCBwYXJzZUV4cHJQbGFpbilcblx0XHRcdFx0XHRcdGN4LmNoZWNrKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoa2V5c1ZhbHMsIGxvY2FsLm5hbWUpLFxuXHRcdFx0XHRcdFx0XHRsb2NhbC5sb2MsICgpID0+IGBEdXBsaWNhdGUgcHJvcGVydHkgJHtsb2NhbH0uYClcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXlzVmFscywgbG9jYWwubmFtZSwgeyB2YWx1ZSB9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhc3NlcnQobGFzdChzcGxpdHMpLmF0ID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gT2JqU2ltcGxlKGxvYywga2V5c1ZhbHMpXG5cdFx0XHRcdFx0aWYgKHRva2Vuc0NhbGxlci5pc0VtcHR5KCkpXG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFsXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IHcwKHRva2Vuc0NhbGxlciwgcGFyc2VFeHByUGFydHMpXG5cdFx0XHRcdFx0XHRhc3NlcnQoIWlzRW1wdHkocGFydHMpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKClcblx0XHRcdClcblx0XHR9LFxuXG5cdFx0cGFyc2VFeHByUGFydHMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdFx0Y29uc3QgZW5kID0gdG9rZW5zLmVuZFxuXHRcdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IGVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdGNvbnN0IGhlcmUgPSB0b2tlbnMuZGF0YVtpXVxuXHRcdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9uZXcoaSArIDEsIGVuZClcblx0XHRcdFx0XHRzd2l0Y2ggKGhlcmUuaykge1xuXHRcdFx0XHRcdFx0Y2FzZSAnfCc6IGNhc2UgJ358Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCB3MShyZXN0KCksIHBhcnNlRnVuLCBoZXJlLmspKVxuXHRcdFx0XHRcdFx0Y2FzZSAnY2FzZSc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgdzIocmVzdCgpLCBwYXJzZUNhc2UsICdjYXNlJywgZmFsc2UpKVxuXHRcdFx0XHRcdFx0Y2FzZSAnPH4nOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkKGxvYywgdzAocmVzdCgpLCBwYXJzZUV4cHIpKSlcblx0XHRcdFx0XHRcdGNhc2UgJzx+fic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyhsb2MsIHcwKHJlc3QoKSwgcGFyc2VFeHByKSkpXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyBmYWxsdGhyb3VnaFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRvdXQucHVzaChwYXJzZVNpbmdsZShoZXJlKSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRcblx0XHR9LFxuXG5cdFx0cGFyc2VFeHByUGxhaW4gPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwYXJ0cyA9IHBhcnNlRXhwclBhcnRzKClcblx0XHRcdHN3aXRjaCAocGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdGNhc2UgMDpcblx0XHRcdFx0XHRyZXR1cm4gR2xvYmFsQWNjZXNzLm51bGwobG9jKVxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0cmV0dXJuIGhlYWQocGFydHMpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBoZWFkKHBhcnRzKSwgdGFpbChwYXJ0cykpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdGNvbnN0IHBhcnNlRnVuID0gayA9PiB7XG5cdFx0Y29uc3QgeyBvcFJldHVyblR5cGUsIHJlc3QgfSA9IF90cnlUYWtlUmV0dXJuVHlwZSgpXG5cdFx0Y2hlY2soIXJlc3QuaXNFbXB0eSgpLCAoKSA9PiBgRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtjb2RlKGspfWApXG5cdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9ID0gdzAocmVzdCwgX2Z1bkFyZ3NBbmRCbG9jaylcblx0XHQvLyBOZWVkIHJlcyBkZWNsYXJlIGlmIHRoZXJlIGlzIGEgcmV0dXJuIHR5cGUgb3Igb3V0IGNvbmRpdGlvbi5cblx0XHRjb25zdCBvcFJlc0RlY2xhcmUgPSBpZkVsc2Uob3BSZXR1cm5UeXBlLFxuXHRcdFx0cnQgPT4gc29tZShMb2NhbERlY2xhcmUucmVzKHJ0LmxvYywgb3BSZXR1cm5UeXBlKSksXG5cdFx0XHQoKSA9PiBvcE91dC5tYXAobyA9PiBMb2NhbERlY2xhcmUucmVzKG8ubG9jLCBvcFJldHVyblR5cGUpKSlcblx0XHRyZXR1cm4gRnVuKGxvYywgaywgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BSZXNEZWNsYXJlLCBvcE91dClcblx0fVxuXG5cdC8vIHBhcnNlRnVuIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3RyeVRha2VSZXR1cm5UeXBlID0gKCkgPT4ge1xuXHRcdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChoKSAmJiBLZXl3b3JkLmlzQ29sb24oaGVhZChoLnRva2VucykpKVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRvcFJldHVyblR5cGU6IHNvbWUodzAoU2xpY2UuYWxsKGgudG9rZW5zKS50YWlsKCksIHBhcnNlU3BhY2VkKSksXG5cdFx0XHRcdFx0XHRyZXN0OiB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHsgb3BSZXR1cm5UeXBlOiBOb25lLCByZXN0OiB0b2tlbnMgfVxuXHRcdH0sXG5cblx0XHRfZnVuQXJnc0FuZEJsb2NrID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRcdGlmIChLZXl3b3JkLmlzQ2FzZU9yQ2FzZURvKGgpKSB7XG5cdFx0XHRcdGNvbnN0IGVDYXNlID0gdzIodG9rZW5zLnRhaWwoKSwgcGFyc2VDYXNlLCBoLmssIHRydWUpXG5cdFx0XHRcdGNvbnN0IGFyZ3MgPSBbIExvY2FsRGVjbGFyZS5mb2N1cyhoLmxvYykgXVxuXHRcdFx0XHRyZXR1cm4gKGguayA9PT0gJ2Nhc2UnKSA/XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRcdGJsb2NrOiBCbG9ja1ZhbChsb2MsIFsgXSwgZUNhc2UpXG5cdFx0XHRcdFx0fSA6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXJncywgb3BSZXN0QXJnOiBOb25lLCBvcEluOiBOb25lLCBvcE91dDogTm9uZSxcblx0XHRcdFx0XHRcdGJsb2NrOiBCbG9ja0RvKGxvYywgWyBlQ2FzZSBdKVxuXHRcdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHsgYmVmb3JlLCBsaW5lcyB9ID0gdGFrZUJsb2NrTGluZXNGcm9tRW5kKClcblx0XHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IHcwKGJlZm9yZSwgX3BhcnNlRnVuTG9jYWxzKVxuXHRcdFx0XHRjb25zdCB7IG9wSW4sIG9wT3V0LCByZXN0IH0gPSB3MChsaW5lcywgX3RyeVRha2VJbk91dClcblx0XHRcdFx0Y29uc3QgYmxvY2sgPSB3MChyZXN0LCBwYXJzZUJsb2NrRnJvbUxpbmVzKVxuXHRcdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrLCBvcEluLCBvcE91dCB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZUZ1bkxvY2FscyA9ICgpID0+IHtcblx0XHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGFyZ3M6IHcwKHRva2Vucy5ydGFpbCgpLCBwYXJzZUxvY2FsRGVjbGFyZXMpLFxuXHRcdFx0XHRcdFx0b3BSZXN0QXJnOiBzb21lKExvY2FsRGVjbGFyZShsLmxvYywgbC5uYW1lLCBOb25lLCBmYWxzZSwgZmFsc2UpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHJldHVybiB7IGFyZ3M6IHBhcnNlTG9jYWxEZWNsYXJlcygpLCBvcFJlc3RBcmc6IE5vbmUgfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfdHJ5VGFrZUluT3V0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgdHJ5VGFrZUluT3JPdXQgPSAobGluZXMsIGluT3JPdXQpID0+IHtcblx0XHRcdFx0aWYgKCFsaW5lcy5pc0VtcHR5KCkpIHtcblx0XHRcdFx0XHRjb25zdCBmaXJzdExpbmUgPSBsaW5lcy5oZWFkKClcblx0XHRcdFx0XHRhc3NlcnQoR3JvdXAuaXNMaW5lKGZpcnN0TGluZSkpXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zRmlyc3QgPSBTbGljZS5hbGwoZmlyc3RMaW5lLnRva2Vucylcblx0XHRcdFx0XHRpZiAoS2V5d29yZC5pcyhpbk9yT3V0KSh0b2tlbnNGaXJzdC5oZWFkKCkpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0dG9vazogc29tZShEZWJ1Zyhcblx0XHRcdFx0XHRcdFx0XHRmaXJzdExpbmUubG9jLFxuXHRcdFx0XHRcdFx0XHRcdHcwKHRva2Vuc0ZpcnN0LCBwYXJzZUxpbmVzRnJvbUJsb2NrKSkpLFxuXHRcdFx0XHRcdFx0XHRyZXN0OiBsaW5lcy50YWlsKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4geyB0b29rOiBOb25lLCByZXN0OiBsaW5lcyB9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHsgdG9vazogb3BJbiwgcmVzdDogcmVzdEluIH0gPSB0cnlUYWtlSW5Pck91dCh0b2tlbnMsICdpbicpXG5cdFx0XHRjb25zdCB7IHRvb2s6IG9wT3V0LCByZXN0IH0gPSB0cnlUYWtlSW5Pck91dChyZXN0SW4sICdvdXQnKVxuXHRcdFx0cmV0dXJuIHsgb3BJbiwgb3BPdXQsIHJlc3QgfVxuXHRcdH1cblxuXHRjb25zdFxuXHRcdHBhcnNlTGluZSA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRjb25zdCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXG5cdFx0XHQvLyBXZSBvbmx5IGRlYWwgd2l0aCBtdXRhYmxlIGV4cHJlc3Npb25zIGhlcmUsIG90aGVyd2lzZSB3ZSBmYWxsIGJhY2sgdG8gcGFyc2VFeHByLlxuXHRcdFx0aWYgKGggaW5zdGFuY2VvZiBLZXl3b3JkKVxuXHRcdFx0XHRzd2l0Y2ggKGguaykge1xuXHRcdFx0XHRcdGNhc2UgJy4gJzpcblx0XHRcdFx0XHRcdC8vIEluZGV4IGlzIHNldCBieSBwYXJzZUJsb2NrLlxuXHRcdFx0XHRcdFx0cmV0dXJuIExpc3RFbnRyeShsb2MsIHcwKHJlc3QsIHBhcnNlRXhwciksIC0xKVxuXHRcdFx0XHRcdGNhc2UgJ2Nhc2UhJzpcblx0XHRcdFx0XHRcdHJldHVybiB3MihyZXN0LCBwYXJzZUNhc2UsICdjYXNlIScsIGZhbHNlKVxuXHRcdFx0XHRcdGNhc2UgJ2RlYnVnJzpcblx0XHRcdFx0XHRcdHJldHVybiBHcm91cC5pc0Jsb2NrKHRva2Vucy5zZWNvbmQoKSkgP1xuXHRcdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIGluZGVudGVkIGJsb2NrXG5cdFx0XHRcdFx0XHRcdERlYnVnKGxvYywgcGFyc2VMaW5lc0Zyb21CbG9jaygpKSA6XG5cdFx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gc2luZ2xlIGxpbmVcblx0XHRcdFx0XHRcdFx0RGVidWcobG9jLCB3MChyZXN0LCBwYXJzZUxpbmVPckxpbmVzKSlcblx0XHRcdFx0XHRjYXNlICdkZWJ1Z2dlcic6XG5cdFx0XHRcdFx0XHRjaGVja0VtcHR5KHJlc3QsICgpID0+IGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2h9YClcblx0XHRcdFx0XHRcdHJldHVybiBTcGVjaWFsLmRlYnVnZ2VyKGxvYylcblx0XHRcdFx0XHRjYXNlICdlbmQtbG9vcCEnOlxuXHRcdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0XHRyZXR1cm4gRW5kTG9vcChsb2MpXG5cdFx0XHRcdFx0Y2FzZSAnbG9vcCEnOlxuXHRcdFx0XHRcdFx0cmV0dXJuIExvb3AobG9jLCB3MChyZXN0LCBqdXN0QmxvY2tEbykpXG5cdFx0XHRcdFx0Y2FzZSAncmVnaW9uJzpcblx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKClcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBhdC5rID09PSAnLT4nID9cblx0XHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIpIDpcblx0XHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlcilcblx0XHRcdFx0fSxcblx0XHRcdFx0KCkgPT4gcGFyc2VFeHByKCkpXG5cdFx0fSxcblxuXHRcdHBhcnNlTGluZU9yTGluZXMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBfID0gcGFyc2VMaW5lKClcblx0XHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0XHR9XG5cblx0Ly8gcGFyc2VMaW5lIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUpID0+IHtcblx0XHRcdGxldCBsb2NhbHMgPSB3MChhc3NpZ25lZCwgcGFyc2VMb2NhbERlY2xhcmVzKVxuXHRcdFx0Y29uc3QgayA9IGFzc2lnbmVyLmtcblx0XHRcdGNvbnN0IGVWYWx1ZVByZSA9IHZhbHVlLmlzRW1wdHkoKSA/IEdsb2JhbEFjY2Vzcy50cnVlKGxvYykgOiB3MCh2YWx1ZSwgcGFyc2VFeHByKVxuXG5cdFx0XHRsZXQgZVZhbHVlTmFtZWRcblx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBoZWFkKGxvY2FscykubmFtZVxuXHRcdFx0XHRpZiAobmFtZSA9PT0gJ2RvYycpIHtcblx0XHRcdFx0XHRpZiAoZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuKVxuXHRcdFx0XHRcdFx0Ly8gS0xVREdFOiBgZG9jYCBmb3IgbW9kdWxlIGNhbiBiZSBhIEZ1biBzaWduYXR1cmUuXG5cdFx0XHRcdFx0XHQvLyBUT0RPOiBTb21ldGhpbmcgYmV0dGVyLi4uXG5cdFx0XHRcdFx0XHRlVmFsdWVQcmUuYXJncy5mb3JFYWNoKGFyZyA9PiB7IGFyZy5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXHRcdFx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGVWYWx1ZU5hbWVkID0gX3RyeUFkZERpc3BsYXlOYW1lKGVWYWx1ZVByZSwgbmFtZSlcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0ZVZhbHVlTmFtZWQgPSBlVmFsdWVQcmVcblxuXHRcdFx0Y29uc3QgaXNZaWVsZCA9IGsgPT09ICc8ficgfHwgayA9PT0gJzx+fidcblxuXHRcdFx0Y29uc3QgZVZhbHVlID0gX3ZhbHVlRnJvbUFzc2lnbihlVmFsdWVOYW1lZCwgaylcblxuXHRcdFx0aWYgKGlzRW1wdHkobG9jYWxzKSkge1xuXHRcdFx0XHRjaGVjayhpc1lpZWxkLCAnQXNzaWdubWVudCB0byBub3RoaW5nJylcblx0XHRcdFx0cmV0dXJuIGVWYWx1ZVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNZaWVsZClcblx0XHRcdFx0bG9jYWxzLmZvckVhY2goXyA9PlxuXHRcdFx0XHRcdGN4LmNoZWNrKF8uayAhPT0gJ2xhenknLCBfLmxvYywgJ0NhbiBub3QgeWllbGQgdG8gbGF6eSB2YXJpYWJsZS4nKSlcblxuXHRcdFx0aWYgKGsgPT09ICcuICcpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKGwgPT4geyBsLm9rVG9Ob3RVc2UgPSB0cnVlIH0pXG5cblx0XHRcdGlmIChsb2NhbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdGNvbnN0IGFzc2lnbiA9IEFzc2lnbihsb2MsIGxvY2Fsc1swXSwgaywgZVZhbHVlKVxuXHRcdFx0XHRjb25zdCBpc1Rlc3QgPSBhc3NpZ24uYXNzaWduZWUubmFtZS5lbmRzV2l0aCgndGVzdCcpXG5cdFx0XHRcdHJldHVybiBpc1Rlc3QgJiYgayA9PT0gJy4gJyA/IERlYnVnKGxvYywgWyBhc3NpZ24gXSkgOiBhc3NpZ25cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBsb2NhbHMuc29tZShsID0+IGwuaXNMYXp5KVxuXHRcdFx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT4gY3guY2hlY2soXy5pc0xhenksIF8ubG9jLFxuXHRcdFx0XHRcdFx0J0lmIGFueSBwYXJ0IG9mIGRlc3RydWN0dXJpbmcgYXNzaWduIGlzIGxhenksIGFsbCBtdXN0IGJlLicpKVxuXHRcdFx0XHRyZXR1cm4gQXNzaWduRGVzdHJ1Y3R1cmUobG9jLCBsb2NhbHMsIGssIGVWYWx1ZSwgaXNMYXp5KVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfdmFsdWVGcm9tQXNzaWduID0gKHZhbHVlUHJlLCBrQXNzaWduKSA9PiB7XG5cdFx0XHRzd2l0Y2ggKGtBc3NpZ24pIHtcblx0XHRcdFx0Y2FzZSAnPH4nOlxuXHRcdFx0XHRcdHJldHVybiBZaWVsZCh2YWx1ZVByZS5sb2MsIHZhbHVlUHJlKVxuXHRcdFx0XHRjYXNlICc8fn4nOlxuXHRcdFx0XHRcdHJldHVybiBZaWVsZFRvKHZhbHVlUHJlLmxvYywgdmFsdWVQcmUpXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlUHJlXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFdlIGdpdmUgaXQgYSBkaXNwbGF5TmFtZSBpZjpcblx0XHQvLyAuIEl0J3MgYSBibG9ja1xuXHRcdC8vIC4gSXQncyBhIGZ1bmN0aW9uXG5cdFx0Ly8gLiBJdCdzIG9uZSBvZiB0aG9zZSBhdCB0aGUgZW5kIG9mIGEgYmxvY2tcblx0XHQvLyAuIEl0J3Mgb25lIG9mIHRob3NlIGFzIHRoZSBlbmQgbWVtYmVyIG9mIGEgY2FsbC5cblx0XHRfdHJ5QWRkRGlzcGxheU5hbWUgPSAoZVZhbHVlUHJlLCBkaXNwbGF5TmFtZSkgPT4ge1xuXHRcdFx0c3dpdGNoICh0cnVlKSB7XG5cdFx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgQ2FsbCAmJiBlVmFsdWVQcmUuYXJncy5sZW5ndGggPiAwOlxuXHRcdFx0XHRcdC8vIFRPRE86IEltbXV0YWJsZVxuXHRcdFx0XHRcdGVWYWx1ZVByZS5hcmdzW2VWYWx1ZVByZS5hcmdzLmxlbmd0aCAtIDFdID1cblx0XHRcdFx0XHRcdF90cnlBZGREaXNwbGF5TmFtZShsYXN0KGVWYWx1ZVByZS5hcmdzKSwgZGlzcGxheU5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXG5cdFx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgRnVuOlxuXHRcdFx0XHRcdHJldHVybiBPYmpSZXR1cm4oZVZhbHVlUHJlLmxvYywgW10sIFtdLCBzb21lKGVWYWx1ZVByZSksIHNvbWUoZGlzcGxheU5hbWUpKVxuXG5cdFx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgT2JqUmV0dXJuICYmXG5cdFx0XHRcdFx0IWVWYWx1ZVByZS5rZXlzLnNvbWUoa2V5ID0+IGtleS5uYW1lID09PSAnZGlzcGxheU5hbWUnKTpcblx0XHRcdFx0XHRlVmFsdWVQcmUub3BEaXNwbGF5TmFtZSA9IHNvbWUoZGlzcGxheU5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXG5cdFx0XHRcdGNhc2UgZVZhbHVlUHJlIGluc3RhbmNlb2YgQmxvY2tXcmFwOiB7XG5cdFx0XHRcdFx0Y29uc3QgYmxvY2sgPSBlVmFsdWVQcmUuYmxvY2tcblx0XHRcdFx0XHRibG9jay5yZXR1cm5lZCA9IF90cnlBZGREaXNwbGF5TmFtZShibG9jay5yZXR1cm5lZCwgZGlzcGxheU5hbWUpXG5cdFx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gZVZhbHVlUHJlXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZU1hcEVudHJ5ID0gKGJlZm9yZSwgYWZ0ZXIpID0+XG5cdFx0XHQvLyBUT0RPOiBpbmRleCBGaWxsZWQgaW4gYnkgPz8/XG5cdFx0XHRNYXBFbnRyeShsb2MsIHcwKGJlZm9yZSwgcGFyc2VFeHByKSwgdzAoYWZ0ZXIsIHBhcnNlRXhwciksIC0xKVxuXG5cdGNvbnN0XG5cdFx0cGFyc2VMb2NhbERlY2xhcmVzID0gKCkgPT4gdG9rZW5zLm1hcChwYXJzZUxvY2FsRGVjbGFyZSksXG5cdFx0cGFyc2VMb2NhbERlY2xhcmUgPSB0ID0+IHtcblx0XHRcdGxldCBuYW1lXG5cdFx0XHRsZXQgb3BUeXBlID0gTm9uZVxuXHRcdFx0bGV0IGlzTGF6eSA9IGZhbHNlXG5cblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZCh0KSkge1xuXHRcdFx0XHRjb25zdCB0b2tlbnMgPSBTbGljZS5hbGwodC50b2tlbnMpXG5cdFx0XHRcdGxldCByZXN0ID0gdG9rZW5zXG5cdFx0XHRcdGlmIChLZXl3b3JkLmlzVGlsZGUodG9rZW5zLmhlYWQoKSkpIHtcblx0XHRcdFx0XHRpc0xhenkgPSB0cnVlXG5cdFx0XHRcdFx0cmVzdCA9IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHJlc3QuaGVhZCgpKVxuXHRcdFx0XHRjb25zdCByZXN0MiA9IHJlc3QudGFpbCgpXG5cdFx0XHRcdGlmICghcmVzdDIuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29sb24gPSByZXN0Mi5oZWFkKClcblx0XHRcdFx0XHRjeC5jaGVjayhLZXl3b3JkLmlzQ29sb24oY29sb24pLCBjb2xvbi5sb2MsICgpID0+IGBFeHBlY3RlZCAke2NvZGUoJzonKX1gKVxuXHRcdFx0XHRcdGNoZWNrKHJlc3QyLnNpemUoKSA+IDEsICgpID0+IGBFeHBlY3RlZCBzb21ldGhpbmcgYWZ0ZXIgJHtjb2xvbn1gKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc1R5cGUgPSByZXN0Mi50YWlsKClcblx0XHRcdFx0XHRvcFR5cGUgPSBzb21lKHcwKHRva2Vuc1R5cGUsIHBhcnNlU3BhY2VkKSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRuYW1lID0gX3BhcnNlTG9jYWxOYW1lKHQpXG5cblx0XHRcdHJldHVybiBMb2NhbERlY2xhcmUodC5sb2MsIG5hbWUsIG9wVHlwZSwgaXNMYXp5LCBmYWxzZSlcblx0XHR9XG5cblx0Ly8gcGFyc2VMb2NhbERlY2xhcmUgcHJpdmF0ZXNcblx0Y29uc3Rcblx0XHRfcGFyc2VMb2NhbE5hbWUgPSB0ID0+IHtcblx0XHRcdGlmIChLZXl3b3JkLmlzRm9jdXModCkpXG5cdFx0XHRcdHJldHVybiAnXydcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgTmFtZSwgdC5sb2MsICgpID0+IGBFeHBlY3RlZCBhIGxvY2FsIG5hbWUsIG5vdCAke3R9YClcblx0XHRcdFx0Ly8gVE9ETzogQWxsb3cgdGhpcz9cblx0XHRcdFx0Y3guY2hlY2soIUpzR2xvYmFscy5oYXModC5uYW1lKSwgdC5sb2MsICgpID0+XG5cdFx0XHRcdFx0YENhbiBub3Qgc2hhZG93IGdsb2JhbCAke2NvZGUodC5uYW1lKX1gKVxuXHRcdFx0XHRyZXR1cm4gdC5uYW1lXG5cdFx0XHR9XG5cdFx0fVxuXG5cdGNvbnN0IHBhcnNlU2luZ2xlID0gdCA9PiB7XG5cdFx0c3dpdGNoICh0cnVlKSB7XG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBOYW1lOlxuXHRcdFx0XHRyZXR1cm4gX2FjY2Vzcyh0Lm5hbWUpXG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBHcm91cDpcblx0XHRcdFx0c3dpdGNoICh0LmspIHtcblx0XHRcdFx0XHRjYXNlIEdfU3BhY2U6IHJldHVybiB3Zyh0LCBwYXJzZVNwYWNlZClcblx0XHRcdFx0XHRjYXNlIEdfUGFyZW46IHJldHVybiB3Zyh0LCBwYXJzZUV4cHIpXG5cdFx0XHRcdFx0Y2FzZSBHX0JyYWNrZXQ6IHJldHVybiBMaXN0U2ltcGxlKHQubG9jLCB3Zyh0LCBwYXJzZUV4cHJQYXJ0cykpXG5cdFx0XHRcdFx0Y2FzZSBHX0Jsb2NrOiByZXR1cm4gd2codCwgYmxvY2tXcmFwLCAndmFsJylcblx0XHRcdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0XHR9XG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWw6XG5cdFx0XHRcdHJldHVybiBOdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXM6XG5cdFx0XHRcdHJldHVybiBDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pXG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0XHRpZiAodC5rID09PSAnXycpXG5cdFx0XHRcdFx0cmV0dXJuIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKVxuXHRcdFx0XHRlbHNlIGlmIChTcGVjaWFsS2V5d29yZHMuaGFzKHQuaykpXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwodC5sb2MsIHQuaylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgdCBpbnN0YW5jZW9mIERvdE5hbWU6XG5cdFx0XHRcdGlmICh0Lm5Eb3RzID09PSAzKVxuXHRcdFx0XHRcdHJldHVybiBTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0fVxuXHR9XG5cdC8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5cdGNvbnN0IF9hY2Nlc3MgPSBuYW1lID0+XG5cdFx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5cdGNvbnN0IHBhcnNlU3BhY2VkID0gKCkgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSBoIGluc3RhbmNlb2YgS2V5d29yZDpcblx0XHRcdFx0aWYgKGguayA9PT0gJzonKSB7XG5cdFx0XHRcdFx0Y3guY2hlY2soIUtleXdvcmQuaXNDb2xvbihyZXN0LmhlYWQoKSksIGgubG9jLCAoKSA9PiBgVHdvICR7aH0gaW4gYSByb3dgKVxuXHRcdFx0XHRcdGNvbnN0IGVUeXBlID0gdzAocmVzdCwgcGFyc2VTcGFjZWQpXG5cdFx0XHRcdFx0Y29uc3QgZm9jdXMgPSBMb2NhbEFjY2Vzcy5mb2N1cyhoLmxvYylcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5jb250YWlucyhoLmxvYywgZVR5cGUsIGZvY3VzKVxuXHRcdFx0XHR9IGVsc2UgaWYgKGguayA9PT0gJ34nKVxuXHRcdFx0XHRcdHJldHVybiBMYXp5KGgubG9jLCB3MChyZXN0LCBwYXJzZVNwYWNlZCkpXG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGNvbnN0IG1lbWJlck9yU3Vic2NyaXB0ID0gKGUsIHQpID0+IHtcblx0XHRcdFx0XHRjb25zdCBsb2MgPSB0LmxvY1xuXHRcdFx0XHRcdGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSkge1xuXHRcdFx0XHRcdFx0Y3guY2hlY2sodC5uRG90cyA9PT0gMSwgbG9jLCAnVG9vIG1hbnkgZG90cyEnKVxuXHRcdFx0XHRcdFx0cmV0dXJuIE1lbWJlcihsb2MsIGUsIHQubmFtZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBHcm91cCkge1xuXHRcdFx0XHRcdFx0aWYgKHQuayA9PT0gR19CcmFja2V0KVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gQ2FsbC5zdWIobG9jLFxuXHRcdFx0XHRcdFx0XHRcdHVuc2hpZnQoZSwgd2codCwgcGFyc2VFeHByUGFydHMpKSlcblx0XHRcdFx0XHRcdGlmICh0LmsgPT09IEdfUGFyZW4pIHtcblx0XHRcdFx0XHRcdFx0Y3guY2hlY2soaXNFbXB0eSh0LnRva2VucyksIGxvYyxcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiBgVXNlICR7Y29kZSgnKGEgYiknKX0sIG5vdCAke2NvZGUoJ2EoYiknKX1gKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gQ2FsbChsb2MsIGUsIFtdKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBjeC5mYWlsKGxvYywgYEV4cGVjdGVkIG1lbWJlciBvciBzdWIsIG5vdCAke3R9YClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdC5yZWR1Y2UobWVtYmVyT3JTdWJzY3JpcHQsIHBhcnNlU2luZ2xlKGgpKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHRyeVBhcnNlVXNlID0gayA9PiB7XG5cdFx0aWYgKCF0b2tlbnMuaXNFbXB0eSgpKSB7XG5cdFx0XHRjb25zdCBsMCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGFzc2VydChHcm91cC5pc0xpbmUobDApKVxuXHRcdFx0aWYgKEtleXdvcmQuaXMoaykoaGVhZChsMC50b2tlbnMpKSlcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR1c2VzOiB3MShTbGljZS5hbGwobDAudG9rZW5zKS50YWlsKCksIF9wYXJzZVVzZSwgayksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IHVzZXM6IFtdLCByZXN0OiB0b2tlbnMgfVxuXHR9XG5cblx0Ly8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcblx0Y29uc3Rcblx0XHRfcGFyc2VVc2UgPSBrID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBsaW5lcyB9ID0gdGFrZUJsb2NrTGluZXNGcm9tRW5kKClcblx0XHRcdGNoZWNrKGJlZm9yZS5pc0VtcHR5KCksICgpID0+XG5cdFx0XHRcdGBEaWQgbm90IGV4cGVjdCBhbnl0aGluZyBhZnRlciAke2NvZGUoayl9IG90aGVyIHRoYW4gYSBibG9ja2ApXG5cdFx0XHRyZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gd2cobGluZSwgX3VzZUxpbmUsIGspKVxuXHRcdH0sXG5cblx0XHQvLyBUT0RPOkVTNiBKdXN0IHVzZSBtb2R1bGUgaW1wb3J0cywgbm8gQXNzaWduRGVzdHJ1Y3R1cmUgbmVlZGVkXG5cdFx0X3VzZUxpbmUgPSBrID0+IHtcblx0XHRcdGNvbnN0IHRSZXEgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblxuXHRcdFx0aWYgKGsgPT09ICd1c2UhJykge1xuXHRcdFx0XHRjaGVjayh0b2tlbnMuc2l6ZSgpID09PSAxLCAoKSA9PiBgVW5leHBlY3RlZCAke3Rva2Vuc1sxXX1gKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gJ3VzZX4nIHx8IGsgPT09ICd1c2UtZGVidWcnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPSB3Mih0b2tlbnMudGFpbCgpLCBfcGFyc2VUaGluZ3NVc2VkLCBuYW1lLCBpc0xhenkpXG5cdFx0XHRcdHJldHVybiBVc2UobG9jLCBwYXRoLCB1c2VkLCBvcFVzZURlZmF1bHQpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZVRoaW5nc1VzZWQgPSAobmFtZSwgaXNMYXp5KSA9PiB7XG5cdFx0XHRjb25zdCB1c2VEZWZhdWx0ID0gKCkgPT4gTG9jYWxEZWNsYXJlKGxvYywgbmFtZSwgTm9uZSwgaXNMYXp5LCBmYWxzZSlcblx0XHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0XHRyZXR1cm4geyB1c2VkOiBbXSwgb3BVc2VEZWZhdWx0OiBzb21lKHVzZURlZmF1bHQoKSkgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGhhc0RlZmF1bHRVc2UgPSBLZXl3b3JkLmlzRm9jdXModG9rZW5zLmhlYWQoKSlcblx0XHRcdFx0Y29uc3Qgb3BVc2VEZWZhdWx0ID0gb3BJZihoYXNEZWZhdWx0VXNlLCB1c2VEZWZhdWx0KVxuXHRcdFx0XHRjb25zdCByZXN0ID0gaGFzRGVmYXVsdFVzZSA/IHRva2Vucy50YWlsKCkgOiB0b2tlbnNcblx0XHRcdFx0Y29uc3QgdXNlZCA9IHcwKHJlc3QsIHBhcnNlTG9jYWxEZWNsYXJlcykubWFwKGwgPT4ge1xuXHRcdFx0XHRcdGNoZWNrKGwubmFtZSAhPT0gJ18nLCAoKSA9PiBgJHtjb2RlKCdfJyl9IG5vdCBhbGxvd2VkIGFzIGltcG9ydCBuYW1lLmApXG5cdFx0XHRcdFx0bC5pc0xhenkgPSBpc0xhenlcblx0XHRcdFx0XHRyZXR1cm4gbFxuXHRcdFx0XHR9KVxuXHRcdFx0XHRyZXR1cm4geyB1c2VkLCBvcFVzZURlZmF1bHQgfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VSZXF1aXJlID0gdCA9PiB7XG5cdFx0XHRpZiAodCBpbnN0YW5jZW9mIE5hbWUpXG5cdFx0XHRcdHJldHVybiB7IHBhdGg6IHQubmFtZSwgbmFtZTogdC5uYW1lIH1cblx0XHRcdGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiBwdXNoKF9wYXJ0c0Zyb21Eb3ROYW1lKHQpLCB0Lm5hbWUpLmpvaW4oJy8nKSwgbmFtZTogdC5uYW1lIH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGVjayhHcm91cC5pc1NwYWNlZCh0KSwgJ05vdCBhIHZhbGlkIG1vZHVsZSBuYW1lLicpXG5cdFx0XHRcdHJldHVybiB3Zyh0LCBfcGFyc2VMb2NhbFJlcXVpcmUpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZUxvY2FsUmVxdWlyZSA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0bGV0IHBhcnRzXG5cdFx0XHRpZiAoZmlyc3QgaW5zdGFuY2VvZiBEb3ROYW1lKVxuXHRcdFx0XHRwYXJ0cyA9IF9wYXJ0c0Zyb21Eb3ROYW1lKGZpcnN0KVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGN4LmNoZWNrKGZpcnN0IGluc3RhbmNlb2YgTmFtZSwgZmlyc3QubG9jLCAnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0XHRwYXJ0cyA9IFsgXVxuXHRcdFx0fVxuXHRcdFx0cGFydHMucHVzaChmaXJzdC5uYW1lKVxuXHRcdFx0dG9rZW5zLnRhaWwoKS5lYWNoKHQgPT4ge1xuXHRcdFx0XHRjeC5jaGVjayh0IGluc3RhbmNlb2YgRG90TmFtZSAmJiB0Lm5Eb3RzID09PSAxLCB0LmxvYyxcblx0XHRcdFx0XHQnTm90IGEgdmFsaWQgcGFydCBvZiBtb2R1bGUgcGF0aC4nKVxuXHRcdFx0XHRwYXJ0cy5wdXNoKHQubmFtZSlcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRwYXRoOiBwYXJ0cy5qb2luKCcvJyksXG5cdFx0XHRcdG5hbWU6IHRva2Vucy5sYXN0KCkubmFtZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFydHNGcm9tRG90TmFtZSA9IGRvdE5hbWUgPT5cblx0XHRcdGRvdE5hbWUubkRvdHMgPT09IDEgPyBbICcuJyBdIDogcmVwZWF0KCcuLicsIGRvdE5hbWUubkRvdHMgLSAxKVxuXG5cdHJldHVybiBwYXJzZU1vZHVsZSgpXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==