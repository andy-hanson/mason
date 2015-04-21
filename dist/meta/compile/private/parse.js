if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../Expression', './Lang', './Token', './U/Bag', './U/Op', './U/util'], function (exports, module, _esastDistLoc, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parse;

	var _Loc = _interopRequire(_esastDistLoc);

	function parse(cx, rootToken) {
		_UUtil.assert(_Token.Group.isBlock(rootToken));
		let tokens = rootToken.tokens;
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
		      fail = function (message) {
			return cx.fail(loc, message);
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
			loc = tokens.isEmpty() ? loc : _Loc(tokens.head().loc.start, tokens.last().loc.end);
			const res = fun(arg);
			tokens = t;
			loc = l;
			return res;
		},
		      w2 = function (_tokens, fun, arg, arg2) {
			const t = tokens;
			tokens = _tokens;
			const l = loc;
			loc = tokens.isEmpty() ? loc : _Loc(tokens.head().loc.start, tokens.last().loc.end);
			const res = fun(arg, arg2);
			tokens = t;
			loc = l;
			return res;
		},
		      wg = function (group, fun, arg) {
			const t = tokens;
			tokens = group.tokens;
			const l = loc;
			loc = group.loc;
			const res = fun(arg);
			tokens = t;
			loc = l;
			return res;
		},
		      _locFromTokens = function (tokens) {
			return _Loc(tokens.head().loc.start, tokens.last().loc.end);
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
			if (cx.opts.moduleDisplayName()) block.lines.push(_Expression.Assign(loc, _Expression.LocalDeclare(loc, 'displayName', [], false, true), 'export', _Expression.ELiteral(loc, cx.opts.moduleName(), String)));

			const uses = plainUses.concat(lazyUses);
			return _Expression.Module(loc, doUses, uses, debugUses, block);
		};

		// parseBlock
		const takeBlockLinesFromEnd = function () {
			check(!tokens.isEmpty(), 'Expected an indented block');
			const l = tokens.last();
			cx.check(_Token.Group.isBlock(l), l.loc, 'Expected an indented block at the end');
			return { before: tokens.rtail(), lines: l.tokens };
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
			return block.tokens.flatMap(function (line) {
				return wg(line, parseLineOrLines);
			});
		};

		// parseBlock privates
		const _parseBodyDo = function () {
			var _parseBlockLines2 = _parseBlockLines();

			const eLines = _parseBlockLines2.eLines;
			const kReturn = _parseBlockLines2.kReturn;

			check(kReturn === 'plain', 'Can not make ' + kReturn + ' in statement context.');
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

			var _ref2 = _Token.Keyword.isElse(l.tokens.head()) ? {
				partLines: lines.rtail(),
				opElse: _UOp.some(w1(l.tokens.tail(), isVal ? justBlockVal : justBlockDo))
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

		// parseFun privatesprivate
		const _tryTakeReturnType = function () {
			if (!tokens.isEmpty()) {
				const h = tokens.head();
				if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(h.tokens.head())) return {
					opReturnType: _UOp.some(w0(h.tokens.tail(), parseSpaced)),
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
					const tokensFirst = firstLine.tokens;
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
				const tokens = t.tokens;
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
				case t instanceof _Token.CallOnFocus:
					return _Expression.Call(t.loc, _access(t.name), [_Expression.LocalAccess.focus(t.loc)]);
				case t instanceof _Token.Literal:
					return _Expression.ELiteral(t.loc, t.value, t.k);
				case t instanceof _Token.Name:
					return _access(t.name);
				case t instanceof _Token.Keyword:
					if (t.k === '_') return _Expression.LocalAccess.focus(t.loc);
					if (_Lang.SpecialKeywords.has(t.k)) return _Expression.Special(t.loc, t.k);
				// Else fallthrough to fail
				case t instanceof _Token.Group:
					switch (t.k) {
						case _Token.G_Space:
							return wg(t, parseSpaced);
						case _Token.G_Block:
							return wg(t, blockWrap, 'val');
						case _Token.G_Quote:
							return _Expression.Quote(t.loc, t.tokens.map(parseSingle));
						case _Token.G_Paren:
							return wg(t, parseExpr);
						case _Token.G_Bracket:
							return _Expression.ListSimple(t.loc, wg(t, parseExprParts));
						default:
						// fallthrough
					}
				case t instanceof _Token.DotName:
					if (t.nDots === 3) return _Expression.Splat(t.loc, _Expression.LocalAccess(t.loc, t.name));
				// Else fallthrough to fail
				default:
					fail('Unexpected ' + t);
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
									cx.check(t.tokens.isEmpty(), loc, function () {
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
				if (_Token.Keyword.is(k)(l0.tokens.head())) return {
					uses: w1(l0.tokens.tail(), _parseUse, k),
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
//# sourceMappingURL=../../../meta/compile/private/parse.js.map