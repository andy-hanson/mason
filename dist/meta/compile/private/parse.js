if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../Expression', './Lang', './Token', './U/Bag', './U/Op', './U/util', './U/Slice'], function (exports, module, _esastDistLoc, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil, _USlice) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parse;

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

				const test = w0(before, parseExpr);
				return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, block);
			});

			check(parts.length > 0, 'Must have at least 1 non-`else` test.');

			return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(loc, opCased, parts, opElse);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWV3QixLQUFLOzs7Ozs7QUFBZCxVQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzVDLFNBSlEsTUFBTSxDQUlQLE9BUnVCLEtBQUssQ0FRdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDaEMsTUFBSSxNQUFNLEdBQUcsT0FBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3hDLE1BQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUE7OztBQUd2QixRQUNDLEtBQUssR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPO1VBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7R0FBQTtRQUM3QixVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztVQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtXQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFBQSxFQUFFLE9BQU8sQ0FBQztHQUFBO1FBQ2xFLEVBQUUsR0FBRyxVQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUs7QUFDdEIsU0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFBO0FBQ2hCLFNBQU0sR0FBRyxPQUFPLENBQUE7QUFDaEIsU0FBTSxDQUFDLEdBQUcsR0FBRyxDQUFBO0FBQ2IsTUFBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JELFNBQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLFNBQU0sR0FBRyxDQUFDLENBQUE7QUFDVixNQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQ1AsVUFBTyxHQUFHLENBQUE7R0FDVjtRQUNELEVBQUUsR0FBRyxVQUFDLE9BQU8sRUFBRSxH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QUFrQyxDQUFDLENBQUE7QUFDcEMsU0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEIsQ0FBQyxDQUFBO0FBQ0YsVUFBTztBQUNOLFFBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNyQixRQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUk7SUFDeEIsQ0FBQTtHQUNEO1FBRUQsaUJBQWlCLEdBQUcsVUFBQSxPQUFPO1VBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLEdBQUcsTUF2eUJlLE1BQU0sQ0F1eUJkLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztHQUFBLENBQUE7O0FBRWpFLFNBQU8sV0FBVyxFQUFFLENBQUE7RUFDcEIiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvcGFyc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IEFzc2lnbiwgQXNzaWduRGVzdHJ1Y3R1cmUsIEJsb2NrRG8sIEJsb2NrVmFsLCBCbG9ja1dyYXAsIENhbGwsIENhc2VEb1BhcnQsIENhc2VWYWxQYXJ0LFxuXHRDYXNlRG8sIENhc2VWYWwsIERlYnVnLCBOdW1iZXJMaXRlcmFsLCBFbmRMb29wLCBGdW4sIEdsb2JhbEFjY2VzcywgTGF6eSwgTGlzdEVudHJ5LCBMaXN0UmV0dXJuLFxuXHRMaXN0U2ltcGxlLCBMb2NhbEFjY2VzcywgTG9jYWxEZWNsYXJlLCBMb2NhbERlY2xhcmUsIExvb3AsIE1hcEVudHJ5LCBNYXBSZXR1cm4sIE1lbWJlciwgTW9kdWxlLFxuXHRNb2R1bGVEZWZhdWx0RXhwb3J0LCBPYmpSZXR1cm4sIE9ialNpbXBsZSwgUXVvdGUsIFNwZWNpYWwsIFNwbGF0LCBWYWwsIFVzZURvLCBVc2UsXG5cdFlpZWxkLCBZaWVsZFRvIH0gZnJvbSAnLi4vRXhwcmVzc2lvbidcbmltcG9ydCB7IEpzR2xvYmFscywgU3BlY2lhbEtleXdvcmRzIH0gZnJvbSAnLi9MYW5nJ1xuaW1wb3J0IHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsXG5cdEdfUGFyZW4sIEdfU3BhY2UsIEdfUXVvdGUsIEtleXdvcmQsIFRva2VuTnVtYmVyTGl0ZXJhbCwgTmFtZSB9IGZyb20gJy4vVG9rZW4nXG5pbXBvcnQgeyBjYXQsIGhlYWQsIGZsYXRNYXAsIGlzRW1wdHksIGxhc3QsIHB1c2gsIHJlcGVhdCwgcnRhaWwsIHRhaWwsIHVuc2hpZnQgfSBmcm9tICcuL1UvQmFnJ1xuaW1wb3J0IHsgaWZFbHNlLCBOb25lLCBvcElmLCBzb21lIH0gZnJvbSAnLi9VL09wJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi9VL3V0aWwnXG5pbXBvcnQgU2xpY2UgZnJvbSAnLi9VL1NsaWNlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShjeCwgcm9vdFRva2VuKSB7XG5cdGFzc2VydChHcm91cC5pc0Jsb2NrKHJvb3RUb2tlbikpXG5cdGxldCB0b2tlbnMgPSBTbGljZS5hbGwocm9vdFRva2VuLnRva2Vucylcblx0bGV0IGxvYyA9IHJvb3RUb2tlbi5sb2NcblxuXHQvLyBGdW5jdGlvbnMgZm9yIG1vdmluZyB0aHJvdWdoIHRva2Vuczpcblx0Y29uc3Rcblx0XHRjaGVjayA9IChjb25kLCBtZXNzYWdlKSA9PlxuXHRcdFx0Y3guY2hlY2soY29uZCwgbG9jLCBtZXNzYWdlKSxcblx0XHRjaGVja0VtcHR5ID0gKHRva2VucywgbWVzc2FnZSkgPT5cblx0XHRcdGN4LmNoZWNrKHRva2Vucy5pc0VtcHR5KCksICgpID0+IF9sb2NGcm9tVG9rZW5zKHRva2VucyksIG1lc3NhZ2UpLFxuXHRcdHcwID0gKF90b2tlbnMsIGZ1bikgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IHRva2Vuc1xuXHRcdFx0dG9rZW5zID0gX3Rva2Vuc1xuXHRcdFx0Y29uc3QgbCA9IGxvY1xuXHRcdFx0bG9jID0gdG9rZW5zLmlzRW1wdHkoKSA/IGxvYyA6IF9sb2NGcm9tVG9rZW5zKHRva2Vucylcblx0XHRcdGNvbnN0IHJlcyA9IGZ1bigpXG5cdFx0XHR0b2tlbnMgPSB0XG5cdFx0XHRsb2MgPSBsXG5cdFx0XHRyZXR1cm4gcmVzXG5cdFx0fSxcblx0XHR3MSA9IChfdG9rZW5zLCBmdW4sIGFyZykgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IHRva2Vuc1xuXHRcdFx0dG9rZW5zID0gX3Rva2Vuc1xuXHRcdFx0Y29uc3QgbCA9IGxvY1xuXHRcdFx0bG9jID0gdG9rZW5zLmlzRW1wdHkoKSA/IGxvYyA6IF9sb2NGcm9tVG9rZW5zKHRva2Vucylcblx0XHRcdGNvbnN0IHJlcyA9IGZ1bihhcmcpXG5cdFx0XHR0b2tlbnMgPSB0XG5cdFx0XHRsb2MgPSBsXG5cdFx0XHRyZXR1cm4gcmVzXG5cdFx0fSxcblx0XHR3MiA9IChfdG9rZW5zLCBmdW4sIGFyZywgYXJnMikgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IHRva2Vuc1xuXHRcdFx0dG9rZW5zID0gX3Rva2Vuc1xuXHRcdFx0Y29uc3QgbCA9IGxvY1xuXHRcdFx0bG9jID0gdG9rZW5zLmlzRW1wdHkoKSA/IGxvYyA6IF9sb2NGcm9tVG9rZW5zKHRva2Vucylcblx0XHRcdGNvbnN0IHJlcyA9IGZ1bihhcmcsIGFyZzIpXG5cdFx0XHR0b2tlbnMgPSB0XG5cdFx0XHRsb2MgPSBsXG5cdFx0XHRyZXR1cm4gcmVzXG5cdFx0fSxcblx0XHR3ZyA9IChncm91cCwgZnVuLCBhcmcpID0+IHtcblx0XHRcdGNvbnN0IHQgPSB0b2tlbnNcblx0XHRcdHRva2VucyA9IFNsaWNlLmFsbChncm91cC50b2tlbnMpXG5cdFx0XHRjb25zdCBsID0gbG9jXG5cdFx0XHRsb2MgPSBncm91cC5sb2Ncblx0XHRcdGNvbnN0IHJlcyA9IGZ1bihhcmcpXG5cdFx0XHR0b2tlbnMgPSB0XG5cdFx0XHRsb2MgPSBsXG5cdFx0XHRyZXR1cm4gcmVzXG5cdFx0fSxcblx0XHRfbG9jRnJvbVRva2VucyA9IHRva2VucyA9PiBMb2ModG9rZW5zLmhlYWQoKS5sb2Muc3RhcnQsIHRva2Vucy5sYXN0KCkubG9jLmVuZCksXG5cdFx0dW5leHBlY3RlZCA9IHQgPT4gY3guZmFpbCh0LmxvYywgYFVuZXhwZWN0ZWQgJHt0fWApXG5cblx0Y29uc3QgcGFyc2VNb2R1bGUgPSAoKSA9PiB7XG5cdFx0Y29uc3QgeyB1c2VzOiBkb1VzZXMsIHJlc3QgfSA9IHRyeVBhcnNlVXNlKCd1c2UhJylcblx0XHRjb25zdCB7IHVzZXM6IHBsYWluVXNlcywgcmVzdDogcmVzdDEgfSA9IHcxKHJlc3QsIHRyeVBhcnNlVXNlLCAndXNlJylcblx0XHRjb25zdCB7IHVzZXM6IGxhenlVc2VzLCByZXN0OiByZXN0MiB9ID0gdzEocmVzdDEsIHRyeVBhcnNlVXNlLCAndXNlficpXG5cdFx0Y29uc3QgeyB1c2VzOiBkZWJ1Z1VzZXMsIHJlc3Q6IHJlc3QzIH0gPSB3MShyZXN0MiwgdHJ5UGFyc2VVc2UsICd1c2UtZGVidWcnKVxuXHRcdGNvbnN0IGJsb2NrID0gdzAocmVzdDMsIHBhcnNlTW9kdWxlQm9keSlcblxuXHRcdGJsb2NrLmxpbmVzLmZvckVhY2gobGluZSA9PiB7XG5cdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmsgPT09ICdleHBvcnQnKVxuXHRcdFx0XHRjaGVjayhsaW5lLmFzc2lnbmVlLm5hbWUgIT09ICdkaXNwbGF5TmFtZScsXG5cdFx0XHRcdFx0J01vZHVsZSBjYW4gbm90IGNob29zZSBpdHMgb3duIGRpc3BsYXlOYW1lLicpXG5cdFx0fSlcblx0XHRpZiAoY3gub3B0cy5tb2R1bGVEaXNwbGF5TmFtZSgpKVxuXHRcdFx0YmxvY2subGluZXMucHVzaChcblx0XHRcdFx0QXNzaWduKFxuXHRcdFx0XHRcdGxvYyxcblx0XHRcdFx0XHRMb2NhbERlY2xhcmUobG9jLCAnZGlzcGxheU5hbWUnLCBbXSwgZmFsc2UsIHRydWUpLFxuXHRcdFx0XHRcdCdleHBvcnQnLFxuXHRcdFx0XHRcdFF1b3RlLmZvclN0cmluZyhsb2MsIGN4Lm9wdHMubW9kdWxlTmFtZSgpKSkpXG5cblx0XHRjb25zdCB1c2VzID0gcGxhaW5Vc2VzLmNvbmNhdChsYXp5VXNlcylcblx0XHRyZXR1cm4gTW9kdWxlKGxvYywgZG9Vc2VzLCB1c2VzLCBkZWJ1Z1VzZXMsIGJsb2NrKVxuXHR9XG5cblx0Ly8gcGFyc2VCbG9ja1xuXHRjb25zdFxuXHRcdHRha2VCbG9ja0xpbmVzRnJvbUVuZCA9ICgpID0+IHtcblx0XHRcdGNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2snKVxuXHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdGN4LmNoZWNrKEdyb3VwLmlzQmxvY2sobCksIGwubG9jLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2sgYXQgdGhlIGVuZCcpXG5cdFx0XHRyZXR1cm4geyBiZWZvcmU6IHRva2Vucy5ydGFpbCgpLCBsaW5lczogU2xpY2UuYWxsKGwudG9rZW5zKSB9XG5cdFx0fSxcblxuXHRcdGJsb2NrV3JhcCA9ICgpID0+IEJsb2NrV3JhcChsb2MsIF9wYXJzZUJsb2NrQm9keSgndmFsJykpLFxuXG5cdFx0anVzdEJsb2NrRG8gPSAoKSA9PiB7XG5cdFx0XHRjb25zdCB7IGJlZm9yZSwgYmxvY2sgfSA9IHRha2VCbG9ja0RvRnJvbUVuZCgpXG5cdFx0XHRjaGVjayhiZWZvcmUuaXNFbXB0eSgpLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0XHRyZXR1cm4gYmxvY2tcblx0XHR9LFxuXHRcdGp1c3RCbG9ja1ZhbCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9jayB9ID0gdGFrZUJsb2NrVmFsRnJvbUVuZCgpXG5cdFx0XHRjaGVjayhiZWZvcmUuaXNFbXB0eSgpLCAnRXhwZWN0ZWQganVzdCBhIGJsb2NrLicpXG5cdFx0XHRyZXR1cm4gYmxvY2tcblx0XHR9LFxuXG5cdFx0dGFrZUJsb2NrRG9Gcm9tRW5kID0gKCkgPT4ge1xuXHRcdFx0Y29uc3R7IGJlZm9yZSwgbGluZXMgfSA9IHRha2VCbG9ja0xpbmVzRnJvbUVuZCgpXG5cdFx0XHRjb25zdCBibG9jayA9IHcwKGxpbmVzLCBfcGFyc2VCb2R5RG8pXG5cdFx0XHRyZXR1cm4geyBiZWZvcmUsIGJsb2NrIH1cblx0XHR9LFxuXHRcdHRha2VCbG9ja1ZhbEZyb21FbmQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCB7IGJlZm9yZSwgbGluZXMgfSA9IHRha2VCbG9ja0xpbmVzRnJvbUVuZCgpXG5cdFx0XHRjb25zdCBibG9jayA9IHcxKGxpbmVzLCBfcGFyc2VCbG9ja0JvZHksICd2YWwnKVxuXHRcdFx0cmV0dXJuIHsgYmVmb3JlLCBibG9jayB9XG5cdFx0fSxcblxuXHRcdC8vIFRPRE86IEp1c3QgaGF2ZSBtb2R1bGUgcmV0dXJuIGEgdmFsdWUgYW5kIHVzZSBhIG5vcm1hbCBibG9jay5cblx0XHRwYXJzZU1vZHVsZUJvZHkgPSAoKSA9PiBfcGFyc2VCbG9ja0JvZHkoJ21vZHVsZScpLFxuXG5cdFx0cGFyc2VCbG9ja0Zyb21MaW5lcyA9ICgpID0+IF9wYXJzZUJsb2NrQm9keSgnYW55JyksXG5cblx0XHQvLyBHZXRzIGxpbmVzIGluIGEgcmVnaW9uIG9yIERlYnVnLlxuXHRcdHBhcnNlTGluZXNGcm9tQmxvY2sgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0Y3guY2hlY2sodG9rZW5zLnNpemUoKSA+IDEsIGgubG9jLCAoKSA9PiBgRXhwZWN0ZWQgaW5kZW50ZWQgYmxvY2sgYWZ0ZXIgJHtofWApXG5cdFx0XHRjb25zdCBibG9jayA9IHRva2Vucy5zZWNvbmQoKVxuXHRcdFx0YXNzZXJ0KHRva2Vucy5zaXplKCkgPT09IDIgJiYgR3JvdXAuaXNCbG9jayhibG9jaykpXG5cdFx0XHRyZXR1cm4gZmxhdE1hcChibG9jay50b2tlbnMsIGxpbmUgPT4gd2cobGluZSwgcGFyc2VMaW5lT3JMaW5lcykpXG5cdFx0fVxuXG5cdC8vIHBhcnNlQmxvY2sgcHJpdmF0ZXNcblx0Y29uc3Rcblx0XHRfcGFyc2VCb2R5RG8gPSAoKSA9PiB7XG5cdFx0XHRjb25zdCB7IGVMaW5lcywga1JldHVybiB9ID0gX3BhcnNlQmxvY2tMaW5lcygpXG5cdFx0XHRjaGVjayhrUmV0dXJuID09PSAncGxhaW4nLCAoKSA9PiBgQ2FuIG5vdCBtYWtlICR7a1JldHVybn0gaW4gc3RhdGVtZW50IGNvbnRleHQuYClcblx0XHRcdHJldHVybiBCbG9ja0RvKGxvYywgZUxpbmVzKVxuXHRcdH0sXG5cblx0XHRfcGFyc2VCbG9ja0JvZHkgPSBrID0+IHtcblx0XHRcdGFzc2VydChrID09PSAndmFsJyB8fCBrID09PSAnbW9kdWxlJyB8fCBrID09PSAnYW55JylcblxuXHRcdFx0Ly8ga2V5cyBvbmx5IG1hdHRlciBpZiBrUmV0dXJuID09PSAnb2JqJ1xuXHRcdFx0Y29uc3QgeyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH0gPVxuXHRcdFx0XHRfcGFyc2VCbG9ja0xpbmVzKClcblxuXHRcdFx0Y29uc3QgeyBkb0xpbmVzLCBvcFJldHVybiB9ID0gKCgpID0+IHtcblx0XHRcdFx0aWYgKGtSZXR1cm4gPT09ICdiYWcnKVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkb0xpbmVzOiBlTGluZXMsXG5cdFx0XHRcdFx0XHRvcFJldHVybjogc29tZShMaXN0UmV0dXJuKGxvYywgbGlzdExlbmd0aCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoa1JldHVybiA9PT0gJ21hcCcpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGRvTGluZXM6IGVMaW5lcyxcblx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE1hcFJldHVybihsb2MsIG1hcExlbmd0aCkpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGxhc3RSZXR1cm4gPSAhaXNFbXB0eShlTGluZXMpICYmIGxhc3QoZUxpbmVzKSBpbnN0YW5jZW9mIFZhbFxuXHRcdFx0XHRpZiAoa1JldHVybiA9PT0gJ29iaicgJiYgayAhPT0gJ21vZHVsZScpXG5cdFx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkb0xpbmVzOiBydGFpbChlTGluZXMpLFxuXHRcdFx0XHRcdFx0XHRvcFJldHVybjogc29tZShPYmpSZXR1cm4oXG5cdFx0XHRcdFx0XHRcdFx0bG9jLFxuXHRcdFx0XHRcdFx0XHRcdG9iaktleXMsXG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRcdHNvbWUobGFzdChlTGluZXMpKSxcblx0XHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0XHR9IDoge1xuXHRcdFx0XHRcdFx0XHRkb0xpbmVzOiBlTGluZXMsXG5cdFx0XHRcdFx0XHRcdG9wUmV0dXJuOiBzb21lKE9ialJldHVybihcblx0XHRcdFx0XHRcdFx0XHRsb2MsXG5cdFx0XHRcdFx0XHRcdFx0b2JqS2V5cyxcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0tleXMsXG5cdFx0XHRcdFx0XHRcdFx0Tm9uZSxcblx0XHRcdFx0XHRcdFx0XHQvLyBkaXNwbGF5TmFtZSBpcyBmaWxsZWQgaW4gYnkgcGFyc2VBc3NpZ24uXG5cdFx0XHRcdFx0XHRcdFx0Tm9uZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gbGFzdFJldHVybiA/XG5cdFx0XHRcdFx0eyBkb0xpbmVzOiBydGFpbChlTGluZXMpLCBvcFJldHVybjogc29tZShsYXN0KGVMaW5lcykpIH0gOlxuXHRcdFx0XHRcdHsgZG9MaW5lczogZUxpbmVzLCBvcFJldHVybjogTm9uZSB9XG5cdFx0XHR9KSgpXG5cblx0XHRcdHN3aXRjaCAoaykge1xuXHRcdFx0XHRjYXNlICd2YWwnOlxuXHRcdFx0XHRcdHJldHVybiBpZkVsc2Uob3BSZXR1cm4sXG5cdFx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbChsb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHRcdCgpID0+IGN4LmZhaWwoJ0V4cGVjdGVkIGEgdmFsdWUgYmxvY2suJykpXG5cdFx0XHRcdGNhc2UgJ2FueSc6XG5cdFx0XHRcdFx0cmV0dXJuIGlmRWxzZShvcFJldHVybixcblx0XHRcdFx0XHRcdHJldHVybmVkID0+IEJsb2NrVmFsKGxvYywgZG9MaW5lcywgcmV0dXJuZWQpLFxuXHRcdFx0XHRcdFx0KCkgPT4gQmxvY2tEbyhsb2MsIGRvTGluZXMpKVxuXHRcdFx0XHRjYXNlICdtb2R1bGUnOiB7XG5cdFx0XHRcdFx0Ly8gVE9ETzogSGFuZGxlIGRlYnVnLW9ubHkgZXhwb3J0c1xuXHRcdFx0XHRcdGNvbnN0IGxpbmVzID1cblx0XHRcdFx0XHRcdC8vIFR1cm4gT2JqIGFzc2lnbnMgaW50byBleHBvcnRzLlxuXHRcdFx0XHRcdFx0Y2F0KFxuXHRcdFx0XHRcdFx0XHRkb0xpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAobGluZSBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsaW5lLmsgPT09ICcuICcpXG5cdFx0XHRcdFx0XHRcdFx0XHRsaW5lLmsgPSAnZXhwb3J0J1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBsaW5lXG5cdFx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0XHRvcFJldHVybi5tYXAocmV0ID0+IE1vZHVsZURlZmF1bHRFeHBvcnQocmV0LmxvYywgcmV0KSkpXG5cdFx0XHRcdFx0cmV0dXJuIEJsb2NrRG8obG9jLCBsaW5lcylcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3Ioaylcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnNlQmxvY2tMaW5lcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGxpbmVzID0gdG9rZW5zXG5cdFx0XHRjb25zdCBvYmpLZXlzID0gW10sIGRlYnVnS2V5cyA9IFtdXG5cdFx0XHRsZXQgbGlzdExlbmd0aCA9IDAsIG1hcExlbmd0aCA9IDBcblx0XHRcdGNvbnN0IGVMaW5lcyA9IFtdXG5cdFx0XHRjb25zdCBhZGRMaW5lID0gKGxuLCBpbkRlYnVnKSA9PiB7XG5cdFx0XHRcdGlmIChsbiBpbnN0YW5jZW9mIEFycmF5KVxuXHRcdFx0XHRcdGxuLmZvckVhY2goXyA9PiBhZGRMaW5lKF8sIGluRGVidWcpKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAobG4gaW5zdGFuY2VvZiBEZWJ1Zylcblx0XHRcdFx0XHRcdGxuLmxpbmVzLmZvckVhY2goXyA9PiBhZGRMaW5lKF8sIHRydWUpKVxuXHRcdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTGlzdEVudHJ5KSB7XG5cdFx0XHRcdFx0XHRhc3NlcnQoIWluRGVidWcsICdOb3Qgc3VwcG9ydGVkOiBkZWJ1ZyBsaXN0IGVudHJpZXMnKVxuXHRcdFx0XHRcdFx0Ly8gV2hlbiBMaXN0RW50cmllcyBhcmUgZmlyc3QgY3JlYXRlZCB0aGV5IGhhdmUgbm8gaW5kZXguXG5cdFx0XHRcdFx0XHRhc3NlcnQobG4uaW5kZXggPT09IC0xKVxuXHRcdFx0XHRcdFx0bG4uaW5kZXggPSBsaXN0TGVuZ3RoXG5cdFx0XHRcdFx0XHRsaXN0TGVuZ3RoID0gbGlzdExlbmd0aCArIDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAobG4gaW5zdGFuY2VvZiBNYXBFbnRyeSkge1xuXHRcdFx0XHRcdFx0YXNzZXJ0KCFpbkRlYnVnLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbWFwIGVudHJpZXMnKVxuXHRcdFx0XHRcdFx0YXNzZXJ0KGxuLmluZGV4ID09PSAtMSlcblx0XHRcdFx0XHRcdGxuLmluZGV4ID0gbWFwTGVuZ3RoXG5cdFx0XHRcdFx0XHRtYXBMZW5ndGggPSBtYXBMZW5ndGggKyAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgQXNzaWduICYmIGxuLmsgPT09ICcuICcpXG5cdFx0XHRcdFx0XHQoaW5EZWJ1ZyA/IGRlYnVnS2V5cyA6IG9iaktleXMpLnB1c2gobG4uYXNzaWduZWUpXG5cblx0XHRcdFx0XHRpZiAoIWluRGVidWcpXG5cdFx0XHRcdFx0XHQvLyBFbHNlIHdlIGFyZSBhZGRpbmcgdGhlIERlYnVnIGFzIGEgc2luZ2xlIGxpbmUuXG5cdFx0XHRcdFx0XHRlTGluZXMucHVzaChsbilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bGluZXMuZWFjaChsaW5lID0+IGFkZExpbmUod2cobGluZSwgcGFyc2VMaW5lLCBsaXN0TGVuZ3RoKSkpXG5cblx0XHRcdGNvbnN0IGlzT2JqID0gIShpc0VtcHR5KG9iaktleXMpICYmIGlzRW1wdHkoZGVidWdLZXlzKSlcblx0XHRcdC8vIFRPRE9cblx0XHRcdC8vIGlmIChpc0VtcHR5KG9iaktleXMpKVxuXHRcdFx0Ly9cdGN4LmNoZWNrKGlzRW1wdHkoZGVidWdLZXlzKSwgbG9jLCAnQmxvY2sgY2FuJ3QgaGF2ZSBvbmx5IGRlYnVnIGtleXMnKVxuXHRcdFx0Y29uc3QgaXNCYWcgPSBsaXN0TGVuZ3RoID4gMFxuXHRcdFx0Y29uc3QgaXNNYXAgPSBtYXBMZW5ndGggPiAwXG5cdFx0XHRjaGVjayghKGlzT2JqICYmIGlzQmFnKSwgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgT2JqIGxpbmVzLicpXG5cdFx0XHRjaGVjayghKGlzT2JqICYmIGlzTWFwKSwgJ0Jsb2NrIGhhcyBib3RoIE9iaiBhbmQgTWFwIGxpbmVzLicpXG5cdFx0XHRjaGVjayghKGlzQmFnICYmIGlzTWFwKSwgJ0Jsb2NrIGhhcyBib3RoIEJhZyBhbmQgTWFwIGxpbmVzLicpXG5cblx0XHRcdGNvbnN0IGtSZXR1cm4gPSBpc09iaiA/ICdvYmonIDogaXNCYWcgPyAnYmFnJyA6IGlzTWFwID8gJ21hcCcgOiAncGxhaW4nXG5cdFx0XHRyZXR1cm4geyBlTGluZXMsIGtSZXR1cm4sIGxpc3RMZW5ndGgsIG1hcExlbmd0aCwgb2JqS2V5cywgZGVidWdLZXlzIH1cblx0XHR9XG5cblx0Y29uc3QgcGFyc2VDYXNlID0gKGssIGNhc2VkRnJvbUZ1bikgPT4ge1xuXHRcdGNvbnN0IGlzVmFsID0gayA9PT0gJ2Nhc2UnXG5cblx0XHRjb25zdCB7IGJlZm9yZSwgbGluZXMgfSA9IHRha2VCbG9ja0xpbmVzRnJvbUVuZCgpXG5cblx0XHRjb25zdCBvcENhc2VkID0gKCgpID0+IHtcblx0XHRcdGlmIChjYXNlZEZyb21GdW4pIHtcblx0XHRcdFx0Y2hlY2tFbXB0eShiZWZvcmUsXG5cdFx0XHRcdFx0J0NhblxcJ3QgZ2l2ZSBmb2N1cyB0byBjYXNlIC0gaXQgaXMgdGhlIGZ1bmN0aW9uXFwncyBpbXBsaWNpdCBmaXJzdCBhcmd1bWVudC4nKVxuXHRcdFx0XHRyZXR1cm4gTm9uZVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSByZXR1cm4gb3BJZighYmVmb3JlLmlzRW1wdHkoKSwgKCkgPT5cblx0XHRcdFx0dzAoYmVmb3JlLCAoKSA9PiBBc3NpZ24uZm9jdXMobG9jLCBwYXJzZUV4cHIoKSkpKVxuXHRcdH0pKClcblxuXHRcdGNvbnN0IGwgPSBsaW5lcy5sYXN0KClcblx0XHRjb25zdCB7IHBhcnRMaW5lcywgb3BFbHNlIH0gPSBLZXl3b3JkLmlzRWxzZShoZWFkKGwudG9rZW5zKSkgPyB7XG5cdFx0XHRcdHBhcnRMaW5lczogbGluZXMucnRhaWwoKSxcblx0XHRcdFx0b3BFbHNlOiBzb21lKHcxKFNsaWNlLmFsbChsLnRva2VucykudGFpbCgpLCBpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKSlcblx0XHRcdH0gOiB7XG5cdFx0XHRcdHBhcnRMaW5lczogbGluZXMsXG5cdFx0XHRcdG9wRWxzZTogTm9uZVxuXHRcdFx0fVxuXG5cdFx0Y29uc3QgcGFydHMgPSBwYXJ0TGluZXMubWFwKGxpbmUgPT4ge1xuXHRcdFx0Y29uc3QgeyBiZWZvcmUsIGJsb2NrIH0gPVxuXHRcdFx0XHR3ZyhsaW5lLCBpc1ZhbCA/IHRha2VCbG9ja1ZhbEZyb21FbmQgOiB0YWtlQmxvY2tEb0Zyb21FbmQpXG5cdFx0XHRjb25zdCB0ZXN0ID0gdzAoYmVmb3JlLCBwYXJzZUV4cHIpXG5cdFx0XHRyZXR1cm4gKGlzVmFsID8gQ2FzZVZhbFBhcnQgOiBDYXNlRG9QYXJ0KShsaW5lLmxvYywgdGVzdCwgYmxvY2spXG5cdFx0fSlcblxuXHRcdGNoZWNrKHBhcnRzLmxlbmd0aCA+IDAsICdNdXN0IGhhdmUgYXQgbGVhc3QgMSBub24tYGVsc2VgIHRlc3QuJylcblxuXHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsIDogQ2FzZURvKShsb2MsIG9wQ2FzZWQsIHBhcnRzLCBvcEVsc2UpXG5cdH1cblxuXHRjb25zdFxuXHRcdHBhcnNlRXhwciA9ICgpID0+IHtcblx0XHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRNYW55V2hlcmUoS2V5d29yZC5pc09iakFzc2lnbiksXG5cdFx0XHRcdHNwbGl0cyA9PiB7XG5cdFx0XHRcdFx0Ly8gU2hvcnQgb2JqZWN0IGZvcm0sIHN1Y2ggYXMgKGEuIDEsIGIuIDIpXG5cdFx0XHRcdFx0Y29uc3QgZmlyc3QgPSBzcGxpdHNbMF0uYmVmb3JlXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zQ2FsbGVyID0gZmlyc3QucnRhaWwoKVxuXG5cdFx0XHRcdFx0Y29uc3Qga2V5c1ZhbHMgPSB7fVxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRzLmxlbmd0aCAtIDE7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbG9jYWwgPSBwYXJzZUxvY2FsRGVjbGFyZShzcGxpdHNbaV0uYmVmb3JlLmxhc3QoKSlcblx0XHRcdFx0XHRcdC8vIENhbid0IGhhdmUgZ290IGEgdHlwZSBiZWNhdXNlIHRoZXJlJ3Mgb25seSBvbmUgdG9rZW4uXG5cdFx0XHRcdFx0XHRhc3NlcnQoaXNFbXB0eShsb2NhbC5vcFR5cGUpKVxuXHRcdFx0XHRcdFx0Y29uc3QgdG9rZW5zVmFsdWUgPSBpID09PSBzcGxpdHMubGVuZ3RoIC0gMiA/XG5cdFx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlIDpcblx0XHRcdFx0XHRcdFx0c3BsaXRzW2kgKyAxXS5iZWZvcmUucnRhaWwoKVxuXHRcdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSB3MCh0b2tlbnNWYWx1ZSwgcGFyc2VFeHByUGxhaW4pXG5cdFx0XHRcdFx0XHRjeC5jaGVjayghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGtleXNWYWxzLCBsb2NhbC5uYW1lKSxcblx0XHRcdFx0XHRcdFx0bG9jYWwubG9jLCAoKSA9PiBgRHVwbGljYXRlIHByb3BlcnR5ICR7bG9jYWx9LmApXG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5c1ZhbHMsIGxvY2FsLm5hbWUsIHsgdmFsdWUgfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZShsb2MsIGtleXNWYWxzKVxuXHRcdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFydHMgPSB3MCh0b2tlbnNDYWxsZXIsIHBhcnNlRXhwclBhcnRzKVxuXHRcdFx0XHRcdFx0YXNzZXJ0KCFpc0VtcHR5KHBhcnRzKSlcblx0XHRcdFx0XHRcdHJldHVybiBDYWxsKGxvYywgaGVhZChwYXJ0cyksIHB1c2godGFpbChwYXJ0cyksIHZhbCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQoKSA9PiBwYXJzZUV4cHJQbGFpbigpXG5cdFx0XHQpXG5cdFx0fSxcblxuXHRcdHBhcnNlRXhwclBhcnRzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgb3V0ID0gW11cblx0XHRcdGNvbnN0IGVuZCA9IHRva2Vucy5lbmRcblx0XHRcdGZvciAobGV0IGkgPSB0b2tlbnMuc3RhcnQ7IGkgPCBlbmQ7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRjb25zdCBoZXJlID0gdG9rZW5zLmRhdGFbaV1cblx0XHRcdFx0aWYgKGhlcmUgaW5zdGFuY2VvZiBLZXl3b3JkKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdCA9ICgpID0+IHRva2Vucy5fbmV3KGkgKyAxLCBlbmQpXG5cdFx0XHRcdFx0c3dpdGNoIChoZXJlLmspIHtcblx0XHRcdFx0XHRcdGNhc2UgJ3wnOiBjYXNlICd+fCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgdzEocmVzdCgpLCBwYXJzZUZ1biwgaGVyZS5rKSlcblx0XHRcdFx0XHRcdGNhc2UgJ2Nhc2UnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIHcyKHJlc3QoKSwgcGFyc2VDYXNlLCAnY2FzZScsIGZhbHNlKSlcblx0XHRcdFx0XHRcdGNhc2UgJzx+Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZChsb2MsIHcwKHJlc3QoKSwgcGFyc2VFeHByKSkpXG5cdFx0XHRcdFx0XHRjYXNlICc8fn4nOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcHVzaChvdXQsIFlpZWxkVG8obG9jLCB3MChyZXN0KCksIHBhcnNlRXhwcikpKVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0Ly8gZmFsbHRocm91Z2hcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0b3V0LnB1c2gocGFyc2VTaW5nbGUoaGVyZSkpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3V0XG5cdFx0fSxcblxuXHRcdHBhcnNlRXhwclBsYWluID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgcGFydHMgPSBwYXJzZUV4cHJQYXJ0cygpXG5cdFx0XHRzd2l0Y2ggKHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0cmV0dXJuIEdsb2JhbEFjY2Vzcy5udWxsKGxvYylcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdHJldHVybiBoZWFkKHBhcnRzKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBDYWxsKGxvYywgaGVhZChwYXJ0cyksIHRhaWwocGFydHMpKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRjb25zdCBwYXJzZUZ1biA9IGsgPT4ge1xuXHRcdGNvbnN0IHsgb3BSZXR1cm5UeXBlLCByZXN0IH0gPSBfdHJ5VGFrZVJldHVyblR5cGUoKVxuXHRcdGNoZWNrKCFyZXN0LmlzRW1wdHkoKSwgKCkgPT4gYEV4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrIGFmdGVyICR7Y29kZShrKX1gKVxuXHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfSA9IHcwKHJlc3QsIF9mdW5BcmdzQW5kQmxvY2spXG5cdFx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdFx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRcdHJ0ID0+IHNvbWUoTG9jYWxEZWNsYXJlLnJlcyhydC5sb2MsIG9wUmV0dXJuVHlwZSkpLFxuXHRcdFx0KCkgPT4gb3BPdXQubWFwKG8gPT4gTG9jYWxEZWNsYXJlLnJlcyhvLmxvYywgb3BSZXR1cm5UeXBlKSkpXG5cdFx0cmV0dXJuIEZ1bihsb2MsIGssIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH1cblxuXHQvLyBwYXJzZUZ1biBwcml2YXRlc1xuXHRjb25zdFxuXHRcdF90cnlUYWtlUmV0dXJuVHlwZSA9ICgpID0+IHtcblx0XHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoaCkgJiYgS2V5d29yZC5pc0NvbG9uKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBzb21lKHcwKFNsaWNlLmFsbChoLnRva2VucykudGFpbCgpLCBwYXJzZVNwYWNlZCkpLFxuXHRcdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB7IG9wUmV0dXJuVHlwZTogTm9uZSwgcmVzdDogdG9rZW5zIH1cblx0XHR9LFxuXG5cdFx0X2Z1bkFyZ3NBbmRCbG9jayA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHQvLyBNaWdodCBiZSBgfGNhc2VgXG5cdFx0XHRpZiAoS2V5d29yZC5pc0Nhc2VPckNhc2VEbyhoKSkge1xuXHRcdFx0XHRjb25zdCBlQ2FzZSA9IHcyKHRva2Vucy50YWlsKCksIHBhcnNlQ2FzZSwgaC5rLCB0cnVlKVxuXHRcdFx0XHRjb25zdCBhcmdzID0gWyBMb2NhbERlY2xhcmUuZm9jdXMoaC5sb2MpIF1cblx0XHRcdFx0cmV0dXJuIChoLmsgPT09ICdjYXNlJykgP1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogTm9uZSwgb3BJbjogTm9uZSwgb3BPdXQ6IE5vbmUsXG5cdFx0XHRcdFx0XHRibG9jazogQmxvY2tWYWwobG9jLCBbIF0sIGVDYXNlKVxuXHRcdFx0XHRcdH0gOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFyZ3MsIG9wUmVzdEFyZzogTm9uZSwgb3BJbjogTm9uZSwgb3BPdXQ6IE5vbmUsXG5cdFx0XHRcdFx0XHRibG9jazogQmxvY2tEbyhsb2MsIFsgZUNhc2UgXSlcblx0XHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCB7IGJlZm9yZSwgbGluZXMgfSA9IHRha2VCbG9ja0xpbmVzRnJvbUVuZCgpXG5cdFx0XHRcdGNvbnN0IHsgYXJncywgb3BSZXN0QXJnIH0gPSB3MChiZWZvcmUsIF9wYXJzZUZ1bkxvY2Fscylcblx0XHRcdFx0Y29uc3QgeyBvcEluLCBvcE91dCwgcmVzdCB9ID0gdzAobGluZXMsIF90cnlUYWtlSW5PdXQpXG5cdFx0XHRcdGNvbnN0IGJsb2NrID0gdzAocmVzdCwgcGFyc2VCbG9ja0Zyb21MaW5lcylcblx0XHRcdFx0cmV0dXJuIHsgYXJncywgb3BSZXN0QXJnLCBibG9jaywgb3BJbiwgb3BPdXQgfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VGdW5Mb2NhbHMgPSAoKSA9PiB7XG5cdFx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdFx0cmV0dXJuIHsgYXJnczogW10sIG9wUmVzdEFyZzogTm9uZSB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgbCA9IHRva2Vucy5sYXN0KClcblx0XHRcdFx0aWYgKGwgaW5zdGFuY2VvZiBEb3ROYW1lKSB7XG5cdFx0XHRcdFx0Y3guY2hlY2sobC5uRG90cyA9PT0gMywgbC5sb2MsICdTcGxhdCBhcmd1bWVudCBtdXN0IGhhdmUgZXhhY3RseSAzIGRvdHMnKVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRhcmdzOiB3MCh0b2tlbnMucnRhaWwoKSwgcGFyc2VMb2NhbERlY2xhcmVzKSxcblx0XHRcdFx0XHRcdG9wUmVzdEFyZzogc29tZShMb2NhbERlY2xhcmUobC5sb2MsIGwubmFtZSwgTm9uZSwgZmFsc2UsIGZhbHNlKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSByZXR1cm4geyBhcmdzOiBwYXJzZUxvY2FsRGVjbGFyZXMoKSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3RyeVRha2VJbk91dCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHRyeVRha2VJbk9yT3V0ID0gKGxpbmVzLCBpbk9yT3V0KSA9PiB7XG5cdFx0XHRcdGlmICghbGluZXMuaXNFbXB0eSgpKSB7XG5cdFx0XHRcdFx0Y29uc3QgZmlyc3RMaW5lID0gbGluZXMuaGVhZCgpXG5cdFx0XHRcdFx0YXNzZXJ0KEdyb3VwLmlzTGluZShmaXJzdExpbmUpKVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc0ZpcnN0ID0gU2xpY2UuYWxsKGZpcnN0TGluZS50b2tlbnMpXG5cdFx0XHRcdFx0aWYgKEtleXdvcmQuaXMoaW5Pck91dCkodG9rZW5zRmlyc3QuaGVhZCgpKSlcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdHRvb2s6IHNvbWUoRGVidWcoXG5cdFx0XHRcdFx0XHRcdFx0Zmlyc3RMaW5lLmxvYyxcblx0XHRcdFx0XHRcdFx0XHR3MCh0b2tlbnNGaXJzdCwgcGFyc2VMaW5lc0Zyb21CbG9jaykpKSxcblx0XHRcdFx0XHRcdFx0cmVzdDogbGluZXMudGFpbCgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHsgdG9vazogTm9uZSwgcmVzdDogbGluZXMgfVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IHRvb2s6IG9wSW4sIHJlc3Q6IHJlc3RJbiB9ID0gdHJ5VGFrZUluT3JPdXQodG9rZW5zLCAnaW4nKVxuXHRcdFx0Y29uc3QgeyB0b29rOiBvcE91dCwgcmVzdCB9ID0gdHJ5VGFrZUluT3JPdXQocmVzdEluLCAnb3V0Jylcblx0XHRcdHJldHVybiB7IG9wSW4sIG9wT3V0LCByZXN0IH1cblx0XHR9XG5cblx0Y29uc3Rcblx0XHRwYXJzZUxpbmUgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdFx0c3dpdGNoIChoLmspIHtcblx0XHRcdFx0XHRjYXNlICcuICc6XG5cdFx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRcdHJldHVybiBMaXN0RW50cnkobG9jLCB3MChyZXN0LCBwYXJzZUV4cHIpLCAtMSlcblx0XHRcdFx0XHRjYXNlICdjYXNlISc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gdzIocmVzdCwgcGFyc2VDYXNlLCAnY2FzZSEnLCBmYWxzZSlcblx0XHRcdFx0XHRjYXNlICdkZWJ1Zyc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gR3JvdXAuaXNCbG9jayh0b2tlbnMuc2Vjb25kKCkpID9cblx0XHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBpbmRlbnRlZCBibG9ja1xuXHRcdFx0XHRcdFx0XHREZWJ1Zyhsb2MsIHBhcnNlTGluZXNGcm9tQmxvY2soKSkgOlxuXHRcdFx0XHRcdFx0XHQvLyBgZGVidWdgLCB0aGVuIHNpbmdsZSBsaW5lXG5cdFx0XHRcdFx0XHRcdERlYnVnKGxvYywgdzAocmVzdCwgcGFyc2VMaW5lT3JMaW5lcykpXG5cdFx0XHRcdFx0Y2FzZSAnZGVidWdnZXInOlxuXHRcdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcihsb2MpXG5cdFx0XHRcdFx0Y2FzZSAnZW5kLWxvb3AhJzpcblx0XHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AobG9jKVxuXHRcdFx0XHRcdGNhc2UgJ2xvb3AhJzpcblx0XHRcdFx0XHRcdHJldHVybiBMb29wKGxvYywgdzAocmVzdCwganVzdEJsb2NrRG8pKVxuXHRcdFx0XHRcdGNhc2UgJ3JlZ2lvbic6XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VMaW5lc0Zyb21CbG9jaygpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdC8vIGZhbGwgdGhyb3VnaFxuXHRcdFx0XHR9XG5cblx0XHRcdHJldHVybiBpZkVsc2UodG9rZW5zLm9wU3BsaXRPbmNlV2hlcmUoS2V5d29yZC5pc0xpbmVTcGxpdCksXG5cdFx0XHRcdCh7IGJlZm9yZSwgYXQsIGFmdGVyIH0pID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gYXQuayA9PT0gJy0+JyA/XG5cdFx0XHRcdFx0XHRfcGFyc2VNYXBFbnRyeShiZWZvcmUsIGFmdGVyKSA6XG5cdFx0XHRcdFx0XHRfcGFyc2VBc3NpZ24oYmVmb3JlLCBhdCwgYWZ0ZXIpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCgpID0+IHBhcnNlRXhwcigpKVxuXHRcdH0sXG5cblx0XHRwYXJzZUxpbmVPckxpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgXyA9IHBhcnNlTGluZSgpXG5cdFx0XHRyZXR1cm4gXyBpbnN0YW5jZW9mIEFycmF5ID8gXyA6IFsgXyBdXG5cdFx0fVxuXG5cdC8vIHBhcnNlTGluZSBwcml2YXRlc1xuXHRjb25zdFxuXHRcdF9wYXJzZUFzc2lnbiA9IChhc3NpZ25lZCwgYXNzaWduZXIsIHZhbHVlKSA9PiB7XG5cdFx0XHRsZXQgbG9jYWxzID0gdzAoYXNzaWduZWQsIHBhcnNlTG9jYWxEZWNsYXJlcylcblx0XHRcdGNvbnN0IGsgPSBhc3NpZ25lci5rXG5cdFx0XHRjb25zdCBlVmFsdWVQcmUgPSB2YWx1ZS5pc0VtcHR5KCkgPyBHbG9iYWxBY2Nlc3MudHJ1ZShsb2MpIDogdzAodmFsdWUsIHBhcnNlRXhwcilcblxuXHRcdFx0bGV0IGVWYWx1ZU5hbWVkXG5cdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBuYW1lID0gaGVhZChsb2NhbHMpLm5hbWVcblx0XHRcdFx0aWYgKG5hbWUgPT09ICdkb2MnKSB7XG5cdFx0XHRcdFx0aWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0XHRcdC8vIEtMVURHRTogYGRvY2AgZm9yIG1vZHVsZSBjYW4gYmUgYSBGdW4gc2lnbmF0dXJlLlxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogU29tZXRoaW5nIGJldHRlci4uLlxuXHRcdFx0XHRcdFx0ZVZhbHVlUHJlLmFyZ3MuZm9yRWFjaChhcmcgPT4geyBhcmcub2tUb05vdFVzZSA9IHRydWUgfSlcblx0XHRcdFx0XHRlVmFsdWVOYW1lZCA9IGVWYWx1ZVByZVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRlVmFsdWVOYW1lZCA9IF90cnlBZGREaXNwbGF5TmFtZShlVmFsdWVQcmUsIG5hbWUpXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cblx0XHRcdGNvbnN0IGlzWWllbGQgPSBrID09PSAnPH4nIHx8IGsgPT09ICc8fn4nXG5cblx0XHRcdGNvbnN0IGVWYWx1ZSA9IF92YWx1ZUZyb21Bc3NpZ24oZVZhbHVlTmFtZWQsIGspXG5cblx0XHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdFx0Y2hlY2soaXNZaWVsZCwgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0XHRjeC5jaGVjayhfLmsgIT09ICdsYXp5JywgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJykpXG5cblx0XHRcdGlmIChrID09PSAnLiAnKVxuXHRcdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBsb2NhbHNbMF0sIGssIGVWYWx1ZSlcblx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0XHRyZXR1cm4gaXNUZXN0ICYmIGsgPT09ICcuICcgPyBEZWJ1Zyhsb2MsIFsgYXNzaWduIF0pIDogYXNzaWduXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gbG9jYWxzLnNvbWUobCA9PiBsLmlzTGF6eSlcblx0XHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKF8uaXNMYXp5LCBfLmxvYyxcblx0XHRcdFx0XHRcdCdJZiBhbnkgcGFydCBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbiBpcyBsYXp5LCBhbGwgbXVzdCBiZS4nKSlcblx0XHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBrLCBlVmFsdWUsIGlzTGF6eSlcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRcdGNhc2UgJzx+Jzpcblx0XHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdFx0Y2FzZSAnPH5+Jzpcblx0XHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZVByZS5sb2MsIHZhbHVlUHJlKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdFx0Ly8gLiBJdCdzIGEgYmxvY2tcblx0XHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHRcdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdFx0Ly8gLiBJdCdzIG9uZSBvZiB0aG9zZSBhcyB0aGUgZW5kIG1lbWJlciBvZiBhIGNhbGwuXG5cdFx0X3RyeUFkZERpc3BsYXlOYW1lID0gKGVWYWx1ZVByZSwgZGlzcGxheU5hbWUpID0+IHtcblx0XHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIENhbGwgJiYgZVZhbHVlUHJlLmFyZ3MubGVuZ3RoID4gMDpcblx0XHRcdFx0XHQvLyBUT0RPOiBJbW11dGFibGVcblx0XHRcdFx0XHRlVmFsdWVQcmUuYXJnc1tlVmFsdWVQcmUuYXJncy5sZW5ndGggLSAxXSA9XG5cdFx0XHRcdFx0XHRfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChlVmFsdWVQcmUuYXJncyksIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bjpcblx0XHRcdFx0XHRyZXR1cm4gT2JqUmV0dXJuKGVWYWx1ZVByZS5sb2MsIFtdLCBbXSwgc29tZShlVmFsdWVQcmUpLCBzb21lKGRpc3BsYXlOYW1lKSlcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIE9ialJldHVybiAmJlxuXHRcdFx0XHRcdCFlVmFsdWVQcmUua2V5cy5zb21lKGtleSA9PiBrZXkubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJyk6XG5cdFx0XHRcdFx0ZVZhbHVlUHJlLm9wRGlzcGxheU5hbWUgPSBzb21lKGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEJsb2NrV3JhcDoge1xuXHRcdFx0XHRcdGNvbnN0IGJsb2NrID0gZVZhbHVlUHJlLmJsb2NrXG5cdFx0XHRcdFx0YmxvY2sucmV0dXJuZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoYmxvY2sucmV0dXJuZWQsIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyKSA9PlxuXHRcdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdFx0TWFwRW50cnkobG9jLCB3MChiZWZvcmUsIHBhcnNlRXhwciksIHcwKGFmdGVyLCBwYXJzZUV4cHIpLCAtMSlcblxuXHRjb25zdFxuXHRcdHBhcnNlTG9jYWxEZWNsYXJlcyA9ICgpID0+IHRva2Vucy5tYXAocGFyc2VMb2NhbERlY2xhcmUpLFxuXHRcdHBhcnNlTG9jYWxEZWNsYXJlID0gdCA9PiB7XG5cdFx0XHRsZXQgbmFtZVxuXHRcdFx0bGV0IG9wVHlwZSA9IE5vbmVcblx0XHRcdGxldCBpc0xhenkgPSBmYWxzZVxuXG5cdFx0XHRpZiAoR3JvdXAuaXNTcGFjZWQodCkpIHtcblx0XHRcdFx0Y29uc3QgdG9rZW5zID0gU2xpY2UuYWxsKHQudG9rZW5zKVxuXHRcdFx0XHRsZXQgcmVzdCA9IHRva2Vuc1xuXHRcdFx0XHRpZiAoS2V5d29yZC5pc1RpbGRlKHRva2Vucy5oZWFkKCkpKSB7XG5cdFx0XHRcdFx0aXNMYXp5ID0gdHJ1ZVxuXHRcdFx0XHRcdHJlc3QgPSB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdH1cblx0XHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZShyZXN0LmhlYWQoKSlcblx0XHRcdFx0Y29uc3QgcmVzdDIgPSByZXN0LnRhaWwoKVxuXHRcdFx0XHRpZiAoIXJlc3QyLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRcdGNvbnN0IGNvbG9uID0gcmVzdDIuaGVhZCgpXG5cdFx0XHRcdFx0Y3guY2hlY2soS2V5d29yZC5pc0NvbG9uKGNvbG9uKSwgY29sb24ubG9jLCAoKSA9PiBgRXhwZWN0ZWQgJHtjb2RlKCc6Jyl9YClcblx0XHRcdFx0XHRjaGVjayhyZXN0Mi5zaXplKCkgPiAxLCAoKSA9PiBgRXhwZWN0ZWQgc29tZXRoaW5nIGFmdGVyICR7Y29sb259YClcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNUeXBlID0gcmVzdDIudGFpbCgpXG5cdFx0XHRcdFx0b3BUeXBlID0gc29tZSh3MCh0b2tlbnNUeXBlLCBwYXJzZVNwYWNlZCkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZSh0KVxuXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHQubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSwgZmFsc2UpXG5cdFx0fVxuXG5cdC8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0XHRyZXR1cm4gJ18nXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRjb25zdCBwYXJzZVNpbmdsZSA9IHQgPT4ge1xuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgTmFtZTpcblx0XHRcdFx0cmV0dXJuIF9hY2Nlc3ModC5uYW1lKVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgR3JvdXA6XG5cdFx0XHRcdHN3aXRjaCAodC5rKSB7XG5cdFx0XHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gd2codCwgcGFyc2VTcGFjZWQpXG5cdFx0XHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gd2codCwgcGFyc2VFeHByKVxuXHRcdFx0XHRcdGNhc2UgR19CcmFja2V0OiByZXR1cm4gTGlzdFNpbXBsZSh0LmxvYywgd2codCwgcGFyc2VFeHByUGFydHMpKVxuXHRcdFx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIHdnKHQsIGJsb2NrV3JhcCwgJ3ZhbCcpXG5cdFx0XHRcdFx0Y2FzZSBHX1F1b3RlOlxuXHRcdFx0XHRcdFx0cmV0dXJuIFF1b3RlKHQubG9jLFxuXHRcdFx0XHRcdFx0XHR0LnRva2Vucy5tYXAoXyA9PiAodHlwZW9mIF8gPT09ICdzdHJpbmcnKSA/IF8gOiBwYXJzZVNpbmdsZShfKSkpXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgVG9rZW5OdW1iZXJMaXRlcmFsOlxuXHRcdFx0XHRyZXR1cm4gTnVtYmVyTGl0ZXJhbCh0LmxvYywgdC52YWx1ZSlcblx0XHRcdGNhc2UgdCBpbnN0YW5jZW9mIENhbGxPbkZvY3VzOlxuXHRcdFx0XHRyZXR1cm4gQ2FsbCh0LmxvYywgX2FjY2Vzcyh0Lm5hbWUpLCBbIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKSBdKVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgS2V5d29yZDpcblx0XHRcdFx0aWYgKHQuayA9PT0gJ18nKVxuXHRcdFx0XHRcdHJldHVybiBMb2NhbEFjY2Vzcy5mb2N1cyh0LmxvYylcblx0XHRcdFx0ZWxzZSBpZiAoU3BlY2lhbEtleXdvcmRzLmhhcyh0LmspKVxuXHRcdFx0XHRcdHJldHVybiBTcGVjaWFsKHQubG9jLCB0LmspXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBEb3ROYW1lOlxuXHRcdFx0XHRpZiAodC5uRG90cyA9PT0gMylcblx0XHRcdFx0XHRyZXR1cm4gU3BsYXQodC5sb2MsIExvY2FsQWNjZXNzKHQubG9jLCB0Lm5hbWUpKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdH1cblx0fVxuXHQvLyBwYXJzZVNpbmdsZSBwcml2YXRlc1xuXHRjb25zdCBfYWNjZXNzID0gbmFtZSA9PlxuXHRcdEpzR2xvYmFscy5oYXMobmFtZSkgPyBHbG9iYWxBY2Nlc3MobG9jLCBuYW1lKSA6IExvY2FsQWNjZXNzKGxvYywgbmFtZSlcblxuXHRjb25zdCBwYXJzZVNwYWNlZCA9ICgpID0+IHtcblx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKSwgcmVzdCA9IHRva2Vucy50YWlsKClcblx0XHRzd2l0Y2ggKHRydWUpIHtcblx0XHRcdGNhc2UgaCBpbnN0YW5jZW9mIEtleXdvcmQ6XG5cdFx0XHRcdGlmIChoLmsgPT09ICc6Jykge1xuXHRcdFx0XHRcdGN4LmNoZWNrKCFLZXl3b3JkLmlzQ29sb24ocmVzdC5oZWFkKCkpLCBoLmxvYywgKCkgPT4gYFR3byAke2h9IGluIGEgcm93YClcblx0XHRcdFx0XHRjb25zdCBlVHlwZSA9IHcwKHJlc3QsIHBhcnNlU3BhY2VkKVxuXHRcdFx0XHRcdGNvbnN0IGZvY3VzID0gTG9jYWxBY2Nlc3MuZm9jdXMoaC5sb2MpXG5cdFx0XHRcdFx0cmV0dXJuIENhbGwuY29udGFpbnMoaC5sb2MsIGVUeXBlLCBmb2N1cylcblx0XHRcdFx0fSBlbHNlIGlmIChoLmsgPT09ICd+Jylcblx0XHRcdFx0XHRyZXR1cm4gTGF6eShoLmxvYywgdzAocmVzdCwgcGFyc2VTcGFjZWQpKVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRjb25zdCBtZW1iZXJPclN1YnNjcmlwdCA9IChlLCB0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0XHRcdGN4LmNoZWNrKHQubkRvdHMgPT09IDEsIGxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0XHRcdHJldHVybiBNZW1iZXIobG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0XHRcdGlmICh0LmsgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHdnKHQsIHBhcnNlRXhwclBhcnRzKSkpXG5cdFx0XHRcdFx0XHRpZiAodC5rID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0XHRcdGN4LmNoZWNrKGlzRW1wdHkodC50b2tlbnMpLCBsb2MsXG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBlLCBbXSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgY3guZmFpbChsb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1lbWJlck9yU3Vic2NyaXB0LCBwYXJzZVNpbmdsZShoKSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCB0cnlQYXJzZVVzZSA9IGsgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgbDAgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRhc3NlcnQoR3JvdXAuaXNMaW5lKGwwKSlcblx0XHRcdGlmIChLZXl3b3JkLmlzKGspKGhlYWQobDAudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dXNlczogdzEoU2xpY2UuYWxsKGwwLnRva2VucykudGFpbCgpLCBfcGFyc2VVc2UsIGspLFxuXHRcdFx0XHRcdHJlc3Q6IHRva2Vucy50YWlsKClcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geyB1c2VzOiBbXSwgcmVzdDogdG9rZW5zIH1cblx0fVxuXG5cdC8vIHRyeVBhcnNlVXNlIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlVXNlID0gayA9PiB7XG5cdFx0XHRjb25zdCB7IGJlZm9yZSwgbGluZXMgfSA9IHRha2VCbG9ja0xpbmVzRnJvbUVuZCgpXG5cdFx0XHRjaGVjayhiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PlxuXHRcdFx0XHRgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdFx0cmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHdnKGxpbmUsIF91c2VMaW5lLCBrKSlcblx0XHR9LFxuXG5cdFx0Ly8gVE9ETzpFUzYgSnVzdCB1c2UgbW9kdWxlIGltcG9ydHMsIG5vIEFzc2lnbkRlc3RydWN0dXJlIG5lZWRlZFxuXHRcdF91c2VMaW5lID0gayA9PiB7XG5cdFx0XHRjb25zdCB0UmVxID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0Y29uc3QgeyBwYXRoLCBuYW1lIH0gPSBfcGFyc2VSZXF1aXJlKHRSZXEpXG5cblx0XHRcdGlmIChrID09PSAndXNlIScpIHtcblx0XHRcdFx0Y2hlY2sodG9rZW5zLnNpemUoKSA9PT0gMSwgKCkgPT4gYFVuZXhwZWN0ZWQgJHt0b2tlbnNbMV19YClcblx0XHRcdFx0cmV0dXJuIFVzZURvKGxvYywgcGF0aClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGsgPT09ICd1c2V+JyB8fCBrID09PSAndXNlLWRlYnVnJ1xuXHRcdFx0XHRjb25zdCB7IHVzZWQsIG9wVXNlRGVmYXVsdCB9ID0gdzIodG9rZW5zLnRhaWwoKSwgX3BhcnNlVGhpbmdzVXNlZCwgbmFtZSwgaXNMYXp5KVxuXHRcdFx0XHRyZXR1cm4gVXNlKGxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VUaGluZ3NVc2VkID0gKG5hbWUsIGlzTGF6eSkgPT4ge1xuXHRcdFx0Y29uc3QgdXNlRGVmYXVsdCA9ICgpID0+IExvY2FsRGVjbGFyZShsb2MsIG5hbWUsIE5vbmUsIGlzTGF6eSwgZmFsc2UpXG5cdFx0XHRpZiAodG9rZW5zLmlzRW1wdHkoKSlcblx0XHRcdFx0cmV0dXJuIHsgdXNlZDogW10sIG9wVXNlRGVmYXVsdDogc29tZSh1c2VEZWZhdWx0KCkpIH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBoYXNEZWZhdWx0VXNlID0gS2V5d29yZC5pc0ZvY3VzKHRva2Vucy5oZWFkKCkpXG5cdFx0XHRcdGNvbnN0IG9wVXNlRGVmYXVsdCA9IG9wSWYoaGFzRGVmYXVsdFVzZSwgdXNlRGVmYXVsdClcblx0XHRcdFx0Y29uc3QgcmVzdCA9IGhhc0RlZmF1bHRVc2UgPyB0b2tlbnMudGFpbCgpIDogdG9rZW5zXG5cdFx0XHRcdGNvbnN0IHVzZWQgPSB3MChyZXN0LCBwYXJzZUxvY2FsRGVjbGFyZXMpLm1hcChsID0+IHtcblx0XHRcdFx0XHRjaGVjayhsLm5hbWUgIT09ICdfJywgKCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRcdGwuaXNMYXp5ID0gaXNMYXp5XG5cdFx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdFx0fSlcblx0XHRcdFx0cmV0dXJuIHsgdXNlZCwgb3BVc2VEZWZhdWx0IH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnNlUmVxdWlyZSA9IHQgPT4ge1xuXHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0XHRlbHNlIGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y2hlY2soR3JvdXAuaXNTcGFjZWQodCksICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0XHRyZXR1cm4gd2codCwgX3BhcnNlTG9jYWxSZXF1aXJlKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VMb2NhbFJlcXVpcmUgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGxldCBwYXJ0c1xuXHRcdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjeC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdFx0cGFydHMgPSBbIF1cblx0XHRcdH1cblx0XHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdFx0J05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cGF0aDogcGFydHMuam9pbignLycpLFxuXHRcdFx0XHRuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWVcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcblxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoKVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=