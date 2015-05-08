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
		      w = function (_tokens, fun) {
			const t = tokens;
			tokens = _tokens;
			const l = loc;
			loc = tokens.isEmpty() ? loc : _locFromTokens(tokens);
			const res = fun();
			tokens = t;
			loc = l;
			return res;
		},
		      wg = function (group, fun) {
			const t = tokens;
			tokens = _Slice.all(group.tokens);
			const l = loc;
			loc = group.loc;
			const res = fun();
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
			var _tryParseUse = tryParseUse('use!')();

			const doUses = _tryParseUse.uses;
			const rest = _tryParseUse.rest;

			var _w = w(rest, tryParseUse('use'));

			const plainUses = _w.uses;
			const rest1 = _w.rest;

			var _w2 = w(rest1, tryParseUse('use~'));

			const lazyUses = _w2.uses;
			const rest2 = _w2.rest;

			var _w3 = w(rest2, tryParseUse('use-debug'));

			const debugUses = _w3.uses;
			const rest3 = _w3.rest;

			const block = w(rest3, parseModuleBody);

			block.lines.forEach(function (line) {
				if (line instanceof _Expression.Assign && line.k === 'export') check(line.assignee.name !== 'displayName', 'Module can not choose its own displayName.');
			});
			if (cx.opts.moduleDisplayName()) block.lines.push(_Expression.Assign(loc, _Expression.LocalDeclare(loc, 'displayName', [], false, true), 'export', _Expression.Quote.forString(loc, cx.opts.moduleName())));

			const uses = plainUses.concat(lazyUses);
			return _Expression.Module(loc, doUses, uses, debugUses, block);
		};

		// parseBlock
		const takeBlockFromEnd = function () {
			check(!tokens.isEmpty(), 'Expected an indented block.');
			const block = tokens.last();
			cx.check(_Token.Group.isBlock(block), block.loc, 'Expected an indented block.');
			return { before: tokens.rtail(), block: block };
		},
		      blockWrap = function () {
			return _Expression.BlockWrap(loc, _parseBlockBody('val')());
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
			var _takeBlockFromEnd = takeBlockFromEnd();

			const before = _takeBlockFromEnd.before;
			const block = _takeBlockFromEnd.block;

			return { before: before, block: wg(block, _parseBodyDo) };
		},
		      takeBlockValFromEnd = function () {
			var _takeBlockFromEnd2 = takeBlockFromEnd();

			const before = _takeBlockFromEnd2.before;
			const block = _takeBlockFromEnd2.block;

			return { before: before, block: wg(block, _parseBlockBody('val')) };
		},
		     

		// TODO: Just have module return a value and use a normal block.
		parseModuleBody = function () {
			return _parseBlockBody('module')();
		},
		      parseBlockFromLines = function () {
			return _parseBlockBody('any')();
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
			return function () {
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
			};
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
				return addLine(wg(line, parseLine));
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
			return function () {
				const isVal = k === 'case';

				var _takeBlockFromEnd3 = takeBlockFromEnd();

				const before = _takeBlockFromEnd3.before;
				const block = _takeBlockFromEnd3.block;

				const opCased = (function () {
					if (casedFromFun) {
						checkEmpty(before, 'Can\'t give focus to case - it is the function\'s implicit first argument.');
						return (_UOp.None
						);
					} else return _UOp.opIf(!before.isEmpty(), function () {
						return w(before, function () {
							return _Expression.Assign.focus(loc, parseExpr());
						});
					});
				})();

				const lastLine = _UBag.last(block.tokens);

				var _ref2 = _Token.Keyword.isElse(_UBag.head(lastLine.tokens)) ? {
					partLines: _UBag.rtail(block.tokens),
					opElse: _UOp.some(w(_Slice.all(lastLine.tokens).tail(), isVal ? justBlockVal : justBlockDo))
				} : {
					partLines: block.tokens,
					opElse: _UOp.None
				};

				const partLines = _ref2.partLines;
				const opElse = _ref2.opElse;

				const parts = partLines.map(function (line) {
					var _wg = wg(line, isVal ? takeBlockValFromEnd : takeBlockDoFromEnd);

					const before = _wg.before;
					const block = _wg.block;

					const test = w(before, _parseCaseTest);
					return (isVal ? _Expression.CaseValPart : _Expression.CaseDoPart)(line.loc, test, block);
				});

				check(parts.length > 0, 'Must have at least 1 non-`else` test.');

				return (isVal ? _Expression.CaseVal : _Expression.CaseDo)(loc, opCased, parts, opElse);
			};
		};
		// parseCase privates
		const _parseCaseTest = function () {
			const first = tokens.head();
			// Pattern match starts with type test and is followed by local declares.
			// E.g., `:Some val`
			if (_Token.Group.isSpaced(first) && tokens.size() > 1) {
				const ft = _Slice.all(first.tokens);
				if (_Token.Keyword.isColon(ft.head())) {
					const type = w(ft.tail(), parseSpaced);
					const locals = w(tokens.tail(), parseLocalDeclares);
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
					const value = w(tokensValue, parseExprPlain);
					cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name), local.loc, function () {
						return 'Duplicate property ' + local + '.';
					});
					Object.defineProperty(keysVals, local.name, { value: value });
				}
				_UUtil.assert(_UBag.last(splits).at === undefined);
				const val = _Expression.ObjSimple(loc, keysVals);
				if (tokensCaller.isEmpty()) return val;else {
					const parts = w(tokensCaller, parseExprParts);
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
							return _UBag.push(out, w(rest(), parseFun(here.k)));
						case 'case':
							return _UBag.push(out, w(rest(), parseCase('case', false)));
						case '<~':
							return _UBag.push(out, _Expression.Yield(loc, w(rest(), parseExpr)));
						case '<~~':
							return _UBag.push(out, _Expression.YieldTo(loc, w(rest(), parseExpr)));
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
			return function () {
				var _tryTakeReturnType2 = _tryTakeReturnType();

				const opReturnType = _tryTakeReturnType2.opReturnType;
				const rest = _tryTakeReturnType2.rest;

				check(!rest.isEmpty(), function () {
					return 'Expected an indented block after ' + _CompileError.code(k);
				});

				var _w4 = w(rest, _funArgsAndBlock);

				const args = _w4.args;
				const opRestArg = _w4.opRestArg;
				const block = _w4.block;
				const opIn = _w4.opIn;
				const opOut = _w4.opOut;

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
		};

		// parseFun privates
		const _tryTakeReturnType = function () {
			if (!tokens.isEmpty()) {
				const h = tokens.head();
				if (_Token.Group.isSpaced(h) && _Token.Keyword.isColon(_UBag.head(h.tokens))) return {
					opReturnType: _UOp.some(w(_Slice.all(h.tokens).tail(), parseSpaced)),
					rest: tokens.tail()
				};
			}
			return { opReturnType: _UOp.None, rest: tokens };
		},
		      _funArgsAndBlock = function () {
			const h = tokens.head();
			// Might be `|case`
			if (_Token.Keyword.isCaseOrCaseDo(h)) {
				const eCase = w(tokens.tail(), parseCase(h.k, true));
				const args = [_Expression.LocalDeclare.focus(h.loc)];
				return h.k === 'case' ? {
					args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
					block: _Expression.BlockVal(loc, [], eCase)
				} : {
					args: args, opRestArg: _UOp.None, opIn: _UOp.None, opOut: _UOp.None,
					block: _Expression.BlockDo(loc, [eCase])
				};
			} else {
				var _takeBlockFromEnd4 = takeBlockFromEnd();

				const before = _takeBlockFromEnd4.before;
				const block = _takeBlockFromEnd4.block;

				var _w5 = w(before, _parseFunLocals);

				const args = _w5.args;
				const opRestArg = _w5.opRestArg;

				var _wg2 = wg(block, _tryTakeInOut);

				const opIn = _wg2.opIn;
				const opOut = _wg2.opOut;
				const rest = _wg2.rest;

				return { args: args, opRestArg: opRestArg, block: w(rest, parseBlockFromLines), opIn: opIn, opOut: opOut };
			}
		},
		      _parseFunLocals = function () {
			if (tokens.isEmpty()) return { args: [], opRestArg: _UOp.None };else {
				const l = tokens.last();
				if (l instanceof _Token.DotName) {
					cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots');
					return {
						args: w(tokens.rtail(), parseLocalDeclares),
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
						took: _UOp.some(_Expression.Debug(firstLine.loc, w(tokensFirst, parseLinesFromBlock))),
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
					return _Expression.ListEntry(loc, w(rest, parseExpr), -1);
				case 'case!':
					return w(rest, parseCase('case!', false));
				case 'debug':
					return _Token.Group.isBlock(tokens.second()) ?
					// `debug`, then indented block
					_Expression.Debug(loc, parseLinesFromBlock()) :
					// `debug`, then single line
					_Expression.Debug(loc, w(rest, parseLineOrLines));
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
					return _Expression.Loop(loc, w(rest, justBlockDo));
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
			let locals = w(assigned, parseLocalDeclares);
			const k = assigner.k;
			const eValuePre = value.isEmpty() ? _Expression.GlobalAccess.true(loc) : w(value, parseExpr);

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
				_Expression.MapEntry(loc, w(before, parseExpr), w(after, parseExpr), -1)
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
					opType = _UOp.some(w(tokensType, parseSpaced));
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
							return wg(t, blockWrap);
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
						const eType = w(rest, parseSpaced);
						const focus = _Expression.LocalAccess.focus(h.loc);
						return _Expression.Call.contains(h.loc, eType, focus);
					} else if (h.k === '~') return _Expression.Lazy(h.loc, w(rest, parseSpaced));
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
			return function () {
				if (!tokens.isEmpty()) {
					const l0 = tokens.head();
					_UUtil.assert(_Token.Group.isLine(l0));
					if (_Token.Keyword.is(k)(_UBag.head(l0.tokens))) return {
						uses: w(_Slice.all(l0.tokens).tail(), _parseUse(k)),
						rest: tokens.tail()
					};
				}
				return { uses: [], rest: tokens };
			};
		};

		// tryParseUse privates
		const _parseUse = function (k) {
			return function () {
				var _takeBlockFromEnd5 = takeBlockFromEnd();

				const before = _takeBlockFromEnd5.before;
				const block = _takeBlockFromEnd5.block;

				check(before.isEmpty(), function () {
					return 'Did not expect anything after ' + _CompileError.code(k) + ' other than a block';
				});
				return block.tokens.map(function (line) {
					const tReq = line.tokens[0];

					var _parseRequire2 = _parseRequire(tReq);

					const path = _parseRequire2.path;
					const name = _parseRequire2.name;

					if (k === 'use!') {
						if (line.tokens.length > 1) unexpected(line.tokens[1]);
						return _Expression.UseDo(line.loc, path);
					} else {
						const isLazy = k === 'use~' || k === 'use-debug';

						var _w6 = w(_Slice.all(line.tokens).tail(), _parseThingsUsed(name, isLazy));

						const used = _w6.used;
						const opUseDefault = _w6.opUseDefault;

						return _Expression.Use(line.loc, path, used, opUseDefault);
					}
				});
			};
		},
		      _useLine = function (k) {
			return function () {
				const tReq = tokens.head();

				var _parseRequire3 = _parseRequire(tReq);

				const path = _parseRequire3.path;
				const name = _parseRequire3.name;

				if (k === 'use!') {
					check(tokens.size() === 1, function () {
						return 'Unexpected ' + tokens[1];
					});
					return _Expression.UseDo(loc, path);
				} else {
					const isLazy = k === 'use~' || k === 'use-debug';

					var _w7 = w(tokens.tail(), _parseThingsUsed(name, isLazy));

					const used = _w7.used;
					const opUseDefault = _w7.opUseDefault;

					return _Expression.Use(loc, path, used, opUseDefault);
				}
			};
		},
		      _parseThingsUsed = function (name, isLazy) {
			return function () {
				const useDefault = function () {
					return _Expression.LocalDeclare(loc, name, _UOp.None, isLazy, false);
				};
				if (tokens.isEmpty()) return { used: [], opUseDefault: _UOp.some(useDefault()) };else {
					const hasDefaultUse = _Token.Keyword.isFocus(tokens.head());
					const opUseDefault = _UOp.opIf(hasDefaultUse, useDefault);
					const rest = hasDefaultUse ? tokens.tail() : tokens;
					const used = w(rest, parseLocalDeclares).map(function (l) {
						check(l.name !== '_', function () {
							return '' + _CompileError.code('_') + ' not allowed as import name.';
						});
						l.isLazy = isLazy;
						return l;
					});
					return { used: used, opUseDefault: opUseDefault };
				}
			};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFld0IsS0FBSzs7Ozs7Ozs7QUFBZCxVQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzVDLFNBSlEsTUFBTSxDQUlQLE9BUnVCLEtBQUssQ0FRdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFDaEMsTUFBSSxNQUFNLEdBQUcsT0FBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3hDLE1BQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUE7OztBQUd2QixRQUNDLEtBQUssR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPO1VBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7R0FBQTtRQUM3QixVQUFVLEdBQUcsVUFBQyxNQUFNLEVBQUUsT0FBTztVQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtXQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFBQSxFQUFFLE9BQU8sQ0FBQztHQUFBO1FBQ2xFLENBQUMsR0FBRyxVQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUs7QUFDckIsU0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFBO0FBQ2hCLFNBQU0sR0FBRyxPQUFPLENBQUE7QUFDaEIsU0FBTSxDQUFDLEdBQUcsR0FBRyxDQUFBO0FBQ2IsTUFBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JELFNBQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLFNBQU0sR0FBRyxDQUFDLENBQUE7QUFDVixNQUFHLEdBQUcsQ0FBQyxDQUFBO0FBQ1AsVUFBTyxHQUFHLENBQUE7R0FDVjtRQUNELEVBQUUsR0FBRyxVQUFDLEtBQUssRUFBRSxH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QUFBOztBQUVqRSxTQUFPLFdBQVcsRUFBRSxDQUFBO0VBQ3BCIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL3BhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBCbG9ja0RvLCBCbG9ja1ZhbCwgQmxvY2tXcmFwLCBDYWxsLCBDYXNlRG9QYXJ0LCBDYXNlVmFsUGFydCxcblx0Q2FzZURvLCBDYXNlVmFsLCBEZWJ1ZywgTnVtYmVyTGl0ZXJhbCwgRW5kTG9vcCwgRnVuLCBHbG9iYWxBY2Nlc3MsIExhenksIExpc3RFbnRyeSwgTGlzdFJldHVybixcblx0TGlzdFNpbXBsZSwgTG9jYWxBY2Nlc3MsIExvY2FsRGVjbGFyZSwgTG9jYWxEZWNsYXJlLCBMb29wLCBNYXBFbnRyeSwgTWFwUmV0dXJuLCBNZW1iZXIsIE1vZHVsZSxcblx0TW9kdWxlRGVmYXVsdEV4cG9ydCwgT2JqUmV0dXJuLCBPYmpTaW1wbGUsIFBhdHRlcm4sIFF1b3RlLCBTcGVjaWFsLCBTcGxhdCwgVmFsLCBVc2VEbywgVXNlLFxuXHRZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBKc0dsb2JhbHMsIFNwZWNpYWxLZXl3b3JkcyB9IGZyb20gJy4vTGFuZydcbmltcG9ydCB7IENhbGxPbkZvY3VzLCBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LFxuXHRHX1BhcmVuLCBHX1NwYWNlLCBHX1F1b3RlLCBLZXl3b3JkLCBUb2tlbk51bWJlckxpdGVyYWwsIE5hbWUgfSBmcm9tICcuL1Rva2VuJ1xuaW1wb3J0IHsgY2F0LCBoZWFkLCBmbGF0TWFwLCBpc0VtcHR5LCBsYXN0LCBwdXNoLCByZXBlYXQsIHJ0YWlsLCB0YWlsLCB1bnNoaWZ0IH0gZnJvbSAnLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgTm9uZSwgb3BJZiwgc29tZSB9IGZyb20gJy4vVS9PcCdcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4vVS91dGlsJ1xuaW1wb3J0IFNsaWNlIGZyb20gJy4vVS9TbGljZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UoY3gsIHJvb3RUb2tlbikge1xuXHRhc3NlcnQoR3JvdXAuaXNCbG9jayhyb290VG9rZW4pKVxuXHRsZXQgdG9rZW5zID0gU2xpY2UuYWxsKHJvb3RUb2tlbi50b2tlbnMpXG5cdGxldCBsb2MgPSByb290VG9rZW4ubG9jXG5cblx0Ly8gRnVuY3Rpb25zIGZvciBtb3ZpbmcgdGhyb3VnaCB0b2tlbnM6XG5cdGNvbnN0XG5cdFx0Y2hlY2sgPSAoY29uZCwgbWVzc2FnZSkgPT5cblx0XHRcdGN4LmNoZWNrKGNvbmQsIGxvYywgbWVzc2FnZSksXG5cdFx0Y2hlY2tFbXB0eSA9ICh0b2tlbnMsIG1lc3NhZ2UpID0+XG5cdFx0XHRjeC5jaGVjayh0b2tlbnMuaXNFbXB0eSgpLCAoKSA9PiBfbG9jRnJvbVRva2Vucyh0b2tlbnMpLCBtZXNzYWdlKSxcblx0XHR3ID0gKF90b2tlbnMsIGZ1bikgPT4ge1xuXHRcdFx0Y29uc3QgdCA9IHRva2Vuc1xuXHRcdFx0dG9rZW5zID0gX3Rva2Vuc1xuXHRcdFx0Y29uc3QgbCA9IGxvY1xuXHRcdFx0bG9jID0gdG9rZW5zLmlzRW1wdHkoKSA/IGxvYyA6IF9sb2NGcm9tVG9rZW5zKHRva2Vucylcblx0XHRcdGNvbnN0IHJlcyA9IGZ1bigpXG5cdFx0XHR0b2tlbnMgPSB0XG5cdFx0XHRsb2MgPSBsXG5cdFx0XHRyZXR1cm4gcmVzXG5cdFx0fSxcblx0XHR3ZyA9IChncm91cCwgZnVuKSA9PiB7XG5cdFx0XHRjb25zdCB0ID0gdG9rZW5zXG5cdFx0XHR0b2tlbnMgPSBTbGljZS5hbGwoZ3JvdXAudG9rZW5zKVxuXHRcdFx0Y29uc3QgbCA9IGxvY1xuXHRcdFx0bG9jID0gZ3JvdXAubG9jXG5cdFx0XHRjb25zdCByZXMgPSBmdW4oKVxuXHRcdFx0dG9rZW5zID0gdFxuXHRcdFx0bG9jID0gbFxuXHRcdFx0cmV0dXJuIHJlc1xuXHRcdH0sXG5cdFx0X2xvY0Zyb21Ub2tlbnMgPSB0b2tlbnMgPT4gTG9jKHRva2Vucy5oZWFkKCkubG9jLnN0YXJ0LCB0b2tlbnMubGFzdCgpLmxvYy5lbmQpLFxuXHRcdHVuZXhwZWN0ZWQgPSB0ID0+IGN4LmZhaWwodC5sb2MsIGBVbmV4cGVjdGVkICR7dH1gKVxuXG5cdGNvbnN0IHBhcnNlTW9kdWxlID0gKCkgPT4ge1xuXHRcdGNvbnN0IHsgdXNlczogZG9Vc2VzLCByZXN0IH0gPSB0cnlQYXJzZVVzZSgndXNlIScpKClcblx0XHRjb25zdCB7IHVzZXM6IHBsYWluVXNlcywgcmVzdDogcmVzdDEgfSA9IHcocmVzdCwgdHJ5UGFyc2VVc2UoJ3VzZScpKVxuXHRcdGNvbnN0IHsgdXNlczogbGF6eVVzZXMsIHJlc3Q6IHJlc3QyIH0gPSB3KHJlc3QxLCB0cnlQYXJzZVVzZSgndXNlficpKVxuXHRcdGNvbnN0IHsgdXNlczogZGVidWdVc2VzLCByZXN0OiByZXN0MyB9ID0gdyhyZXN0MiwgdHJ5UGFyc2VVc2UoJ3VzZS1kZWJ1ZycpKVxuXHRcdGNvbnN0IGJsb2NrID0gdyhyZXN0MywgcGFyc2VNb2R1bGVCb2R5KVxuXG5cdFx0YmxvY2subGluZXMuZm9yRWFjaChsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgQXNzaWduICYmIGxpbmUuayA9PT0gJ2V4cG9ydCcpXG5cdFx0XHRcdGNoZWNrKGxpbmUuYXNzaWduZWUubmFtZSAhPT0gJ2Rpc3BsYXlOYW1lJyxcblx0XHRcdFx0XHQnTW9kdWxlIGNhbiBub3QgY2hvb3NlIGl0cyBvd24gZGlzcGxheU5hbWUuJylcblx0XHR9KVxuXHRcdGlmIChjeC5vcHRzLm1vZHVsZURpc3BsYXlOYW1lKCkpXG5cdFx0XHRibG9jay5saW5lcy5wdXNoKFxuXHRcdFx0XHRBc3NpZ24oXG5cdFx0XHRcdFx0bG9jLFxuXHRcdFx0XHRcdExvY2FsRGVjbGFyZShsb2MsICdkaXNwbGF5TmFtZScsIFtdLCBmYWxzZSwgdHJ1ZSksXG5cdFx0XHRcdFx0J2V4cG9ydCcsXG5cdFx0XHRcdFx0UXVvdGUuZm9yU3RyaW5nKGxvYywgY3gub3B0cy5tb2R1bGVOYW1lKCkpKSlcblxuXHRcdGNvbnN0IHVzZXMgPSBwbGFpblVzZXMuY29uY2F0KGxhenlVc2VzKVxuXHRcdHJldHVybiBNb2R1bGUobG9jLCBkb1VzZXMsIHVzZXMsIGRlYnVnVXNlcywgYmxvY2spXG5cdH1cblxuXHQvLyBwYXJzZUJsb2NrXG5cdGNvbnN0XG5cdFx0dGFrZUJsb2NrRnJvbUVuZCA9ICgpID0+IHtcblx0XHRcdGNoZWNrKCF0b2tlbnMuaXNFbXB0eSgpLCAnRXhwZWN0ZWQgYW4gaW5kZW50ZWQgYmxvY2suJylcblx0XHRcdGNvbnN0IGJsb2NrID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0Y3guY2hlY2soR3JvdXAuaXNCbG9jayhibG9jayksIGJsb2NrLmxvYywgJ0V4cGVjdGVkIGFuIGluZGVudGVkIGJsb2NrLicpXG5cdFx0XHRyZXR1cm4geyBiZWZvcmU6IHRva2Vucy5ydGFpbCgpLCBibG9jayB9XG5cdFx0fSxcblxuXHRcdGJsb2NrV3JhcCA9ICgpID0+IEJsb2NrV3JhcChsb2MsIF9wYXJzZUJsb2NrQm9keSgndmFsJykoKSksXG5cblx0XHRqdXN0QmxvY2tEbyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9jayB9ID0gdGFrZUJsb2NrRG9Gcm9tRW5kKClcblx0XHRcdGNoZWNrKGJlZm9yZS5pc0VtcHR5KCksICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRcdHJldHVybiBibG9ja1xuXHRcdH0sXG5cdFx0anVzdEJsb2NrVmFsID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgeyBiZWZvcmUsIGJsb2NrIH0gPSB0YWtlQmxvY2tWYWxGcm9tRW5kKClcblx0XHRcdGNoZWNrKGJlZm9yZS5pc0VtcHR5KCksICdFeHBlY3RlZCBqdXN0IGEgYmxvY2suJylcblx0XHRcdHJldHVybiBibG9ja1xuXHRcdH0sXG5cblx0XHR0YWtlQmxvY2tEb0Zyb21FbmQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdHsgYmVmb3JlLCBibG9jayB9ID0gdGFrZUJsb2NrRnJvbUVuZCgpXG5cdFx0XHRyZXR1cm4geyBiZWZvcmUsIGJsb2NrOiB3ZyhibG9jaywgX3BhcnNlQm9keURvKSAgfVxuXHRcdH0sXG5cdFx0dGFrZUJsb2NrVmFsRnJvbUVuZCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9ja30gPSB0YWtlQmxvY2tGcm9tRW5kKClcblx0XHRcdHJldHVybiB7IGJlZm9yZSwgYmxvY2s6IHdnKGJsb2NrLCBfcGFyc2VCbG9ja0JvZHkoJ3ZhbCcpKSB9XG5cdFx0fSxcblxuXHRcdC8vIFRPRE86IEp1c3QgaGF2ZSBtb2R1bGUgcmV0dXJuIGEgdmFsdWUgYW5kIHVzZSBhIG5vcm1hbCBibG9jay5cblx0XHRwYXJzZU1vZHVsZUJvZHkgPSAoKSA9PiBfcGFyc2VCbG9ja0JvZHkoJ21vZHVsZScpKCksXG5cblx0XHRwYXJzZUJsb2NrRnJvbUxpbmVzID0gKCkgPT4gX3BhcnNlQmxvY2tCb2R5KCdhbnknKSgpLFxuXG5cdFx0Ly8gR2V0cyBsaW5lcyBpbiBhIHJlZ2lvbiBvciBEZWJ1Zy5cblx0XHRwYXJzZUxpbmVzRnJvbUJsb2NrID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGN4LmNoZWNrKHRva2Vucy5zaXplKCkgPiAxLCBoLmxvYywgKCkgPT4gYEV4cGVjdGVkIGluZGVudGVkIGJsb2NrIGFmdGVyICR7aH1gKVxuXHRcdFx0Y29uc3QgYmxvY2sgPSB0b2tlbnMuc2Vjb25kKClcblx0XHRcdGFzc2VydCh0b2tlbnMuc2l6ZSgpID09PSAyICYmIEdyb3VwLmlzQmxvY2soYmxvY2spKVxuXHRcdFx0cmV0dXJuIGZsYXRNYXAoYmxvY2sudG9rZW5zLCBsaW5lID0+IHdnKGxpbmUsIHBhcnNlTGluZU9yTGluZXMpKVxuXHRcdH1cblxuXHQvLyBwYXJzZUJsb2NrIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlQm9keURvID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgeyBlTGluZXMsIGtSZXR1cm4gfSA9IF9wYXJzZUJsb2NrTGluZXMoKVxuXHRcdFx0Y2hlY2soa1JldHVybiA9PT0gJ3BsYWluJywgKCkgPT4gYENhbiBub3QgbWFrZSAke2tSZXR1cm59IGluIHN0YXRlbWVudCBjb250ZXh0LmApXG5cdFx0XHRyZXR1cm4gQmxvY2tEbyhsb2MsIGVMaW5lcylcblx0XHR9LFxuXG5cdFx0X3BhcnNlQmxvY2tCb2R5ID0gayA9PiAoKSA9PiB7XG5cdFx0XHRhc3NlcnQoayA9PT0gJ3ZhbCcgfHwgayA9PT0gJ21vZHVsZScgfHwgayA9PT0gJ2FueScpXG5cblx0XHRcdC8vIGtleXMgb25seSBtYXR0ZXIgaWYga1JldHVybiA9PT0gJ29iaidcblx0XHRcdGNvbnN0IHsgZUxpbmVzLCBrUmV0dXJuLCBsaXN0TGVuZ3RoLCBtYXBMZW5ndGgsIG9iaktleXMsIGRlYnVnS2V5cyB9ID1cblx0XHRcdFx0X3BhcnNlQmxvY2tMaW5lcygpXG5cblx0XHRcdGNvbnN0IHsgZG9MaW5lcywgb3BSZXR1cm4gfSA9ICgoKSA9PiB7XG5cdFx0XHRcdGlmIChrUmV0dXJuID09PSAnYmFnJylcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoTGlzdFJldHVybihsb2MsIGxpc3RMZW5ndGgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0aWYgKGtSZXR1cm4gPT09ICdtYXAnKVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkb0xpbmVzOiBlTGluZXMsXG5cdFx0XHRcdFx0XHRvcFJldHVybjogc29tZShNYXBSZXR1cm4obG9jLCBtYXBMZW5ndGgpKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBsYXN0UmV0dXJuID0gIWlzRW1wdHkoZUxpbmVzKSAmJiBsYXN0KGVMaW5lcykgaW5zdGFuY2VvZiBWYWxcblx0XHRcdFx0aWYgKGtSZXR1cm4gPT09ICdvYmonICYmIGsgIT09ICdtb2R1bGUnKVxuXHRcdFx0XHRcdHJldHVybiBsYXN0UmV0dXJuID9cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZG9MaW5lczogcnRhaWwoZUxpbmVzKSxcblx0XHRcdFx0XHRcdFx0b3BSZXR1cm46IHNvbWUoT2JqUmV0dXJuKFxuXHRcdFx0XHRcdFx0XHRcdGxvYyxcblx0XHRcdFx0XHRcdFx0XHRvYmpLZXlzLFxuXHRcdFx0XHRcdFx0XHRcdGRlYnVnS2V5cyxcblx0XHRcdFx0XHRcdFx0XHRzb21lKGxhc3QoZUxpbmVzKSksXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGlzcGxheU5hbWUgaXMgZmlsbGVkIGluIGJ5IHBhcnNlQXNzaWduLlxuXHRcdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdFx0fSA6IHtcblx0XHRcdFx0XHRcdFx0ZG9MaW5lczogZUxpbmVzLFxuXHRcdFx0XHRcdFx0XHRvcFJldHVybjogc29tZShPYmpSZXR1cm4oXG5cdFx0XHRcdFx0XHRcdFx0bG9jLFxuXHRcdFx0XHRcdFx0XHRcdG9iaktleXMsXG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdLZXlzLFxuXHRcdFx0XHRcdFx0XHRcdE5vbmUsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGlzcGxheU5hbWUgaXMgZmlsbGVkIGluIGJ5IHBhcnNlQXNzaWduLlxuXHRcdFx0XHRcdFx0XHRcdE5vbmUpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIGxhc3RSZXR1cm4gP1xuXHRcdFx0XHRcdHsgZG9MaW5lczogcnRhaWwoZUxpbmVzKSwgb3BSZXR1cm46IHNvbWUobGFzdChlTGluZXMpKSB9IDpcblx0XHRcdFx0XHR7IGRvTGluZXM6IGVMaW5lcywgb3BSZXR1cm46IE5vbmUgfVxuXHRcdFx0fSkoKVxuXG5cdFx0XHRzd2l0Y2ggKGspIHtcblx0XHRcdFx0Y2FzZSAndmFsJzpcblx0XHRcdFx0XHRyZXR1cm4gaWZFbHNlKG9wUmV0dXJuLFxuXHRcdFx0XHRcdFx0cmV0dXJuZWQgPT4gQmxvY2tWYWwobG9jLCBkb0xpbmVzLCByZXR1cm5lZCksXG5cdFx0XHRcdFx0XHQoKSA9PiBjeC5mYWlsKCdFeHBlY3RlZCBhIHZhbHVlIGJsb2NrLicpKVxuXHRcdFx0XHRjYXNlICdhbnknOlxuXHRcdFx0XHRcdHJldHVybiBpZkVsc2Uob3BSZXR1cm4sXG5cdFx0XHRcdFx0XHRyZXR1cm5lZCA9PiBCbG9ja1ZhbChsb2MsIGRvTGluZXMsIHJldHVybmVkKSxcblx0XHRcdFx0XHRcdCgpID0+IEJsb2NrRG8obG9jLCBkb0xpbmVzKSlcblx0XHRcdFx0Y2FzZSAnbW9kdWxlJzoge1xuXHRcdFx0XHRcdC8vIFRPRE86IEhhbmRsZSBkZWJ1Zy1vbmx5IGV4cG9ydHNcblx0XHRcdFx0XHRjb25zdCBsaW5lcyA9XG5cdFx0XHRcdFx0XHQvLyBUdXJuIE9iaiBhc3NpZ25zIGludG8gZXhwb3J0cy5cblx0XHRcdFx0XHRcdGNhdChcblx0XHRcdFx0XHRcdFx0ZG9MaW5lcy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGxpbmUgaW5zdGFuY2VvZiBBc3NpZ24gJiYgbGluZS5rID09PSAnLiAnKVxuXHRcdFx0XHRcdFx0XHRcdFx0bGluZS5rID0gJ2V4cG9ydCdcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbGluZVxuXHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0b3BSZXR1cm4ubWFwKHJldCA9PiBNb2R1bGVEZWZhdWx0RXhwb3J0KHJldC5sb2MsIHJldCkpKVxuXHRcdFx0XHRcdHJldHVybiBCbG9ja0RvKGxvYywgbGluZXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGspXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZUJsb2NrTGluZXMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBsaW5lcyA9IHRva2Vuc1xuXHRcdFx0Y29uc3Qgb2JqS2V5cyA9IFtdLCBkZWJ1Z0tleXMgPSBbXVxuXHRcdFx0bGV0IGxpc3RMZW5ndGggPSAwLCBtYXBMZW5ndGggPSAwXG5cdFx0XHRjb25zdCBlTGluZXMgPSBbXVxuXHRcdFx0Y29uc3QgYWRkTGluZSA9IChsbiwgaW5EZWJ1ZykgPT4ge1xuXHRcdFx0XHRpZiAobG4gaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdFx0XHRsbi5mb3JFYWNoKF8gPT4gYWRkTGluZShfLCBpbkRlYnVnKSlcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGxuIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdFx0XHRsbi5saW5lcy5mb3JFYWNoKF8gPT4gYWRkTGluZShfLCB0cnVlKSlcblx0XHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIExpc3RFbnRyeSkge1xuXHRcdFx0XHRcdFx0YXNzZXJ0KCFpbkRlYnVnLCAnTm90IHN1cHBvcnRlZDogZGVidWcgbGlzdCBlbnRyaWVzJylcblx0XHRcdFx0XHRcdC8vIFdoZW4gTGlzdEVudHJpZXMgYXJlIGZpcnN0IGNyZWF0ZWQgdGhleSBoYXZlIG5vIGluZGV4LlxuXHRcdFx0XHRcdFx0YXNzZXJ0KGxuLmluZGV4ID09PSAtMSlcblx0XHRcdFx0XHRcdGxuLmluZGV4ID0gbGlzdExlbmd0aFxuXHRcdFx0XHRcdFx0bGlzdExlbmd0aCA9IGxpc3RMZW5ndGggKyAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKGxuIGluc3RhbmNlb2YgTWFwRW50cnkpIHtcblx0XHRcdFx0XHRcdGFzc2VydCghaW5EZWJ1ZywgJ05vdCBzdXBwb3J0ZWQ6IGRlYnVnIG1hcCBlbnRyaWVzJylcblx0XHRcdFx0XHRcdGFzc2VydChsbi5pbmRleCA9PT0gLTEpXG5cdFx0XHRcdFx0XHRsbi5pbmRleCA9IG1hcExlbmd0aFxuXHRcdFx0XHRcdFx0bWFwTGVuZ3RoID0gbWFwTGVuZ3RoICsgMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChsbiBpbnN0YW5jZW9mIEFzc2lnbiAmJiBsbi5rID09PSAnLiAnKVxuXHRcdFx0XHRcdFx0KGluRGVidWcgPyBkZWJ1Z0tleXMgOiBvYmpLZXlzKS5wdXNoKGxuLmFzc2lnbmVlKVxuXG5cdFx0XHRcdFx0aWYgKCFpbkRlYnVnKVxuXHRcdFx0XHRcdFx0Ly8gRWxzZSB3ZSBhcmUgYWRkaW5nIHRoZSBEZWJ1ZyBhcyBhIHNpbmdsZSBsaW5lLlxuXHRcdFx0XHRcdFx0ZUxpbmVzLnB1c2gobG4pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGxpbmVzLmVhY2gobGluZSA9PiBhZGRMaW5lKHdnKGxpbmUsIHBhcnNlTGluZSkpKVxuXG5cdFx0XHRjb25zdCBpc09iaiA9ICEoaXNFbXB0eShvYmpLZXlzKSAmJiBpc0VtcHR5KGRlYnVnS2V5cykpXG5cdFx0XHQvLyBUT0RPXG5cdFx0XHQvLyBpZiAoaXNFbXB0eShvYmpLZXlzKSlcblx0XHRcdC8vXHRjeC5jaGVjayhpc0VtcHR5KGRlYnVnS2V5cyksIGxvYywgJ0Jsb2NrIGNhbid0IGhhdmUgb25seSBkZWJ1ZyBrZXlzJylcblx0XHRcdGNvbnN0IGlzQmFnID0gbGlzdExlbmd0aCA+IDBcblx0XHRcdGNvbnN0IGlzTWFwID0gbWFwTGVuZ3RoID4gMFxuXHRcdFx0Y2hlY2soIShpc09iaiAmJiBpc0JhZyksICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE9iaiBsaW5lcy4nKVxuXHRcdFx0Y2hlY2soIShpc09iaiAmJiBpc01hcCksICdCbG9jayBoYXMgYm90aCBPYmogYW5kIE1hcCBsaW5lcy4nKVxuXHRcdFx0Y2hlY2soIShpc0JhZyAmJiBpc01hcCksICdCbG9jayBoYXMgYm90aCBCYWcgYW5kIE1hcCBsaW5lcy4nKVxuXG5cdFx0XHRjb25zdCBrUmV0dXJuID0gaXNPYmogPyAnb2JqJyA6IGlzQmFnID8gJ2JhZycgOiBpc01hcCA/ICdtYXAnIDogJ3BsYWluJ1xuXHRcdFx0cmV0dXJuIHsgZUxpbmVzLCBrUmV0dXJuLCBsaXN0TGVuZ3RoLCBtYXBMZW5ndGgsIG9iaktleXMsIGRlYnVnS2V5cyB9XG5cdFx0fVxuXG5cdGNvbnN0IHBhcnNlQ2FzZSA9IChrLCBjYXNlZEZyb21GdW4pID0+ICgpID0+IHtcblx0XHRjb25zdCBpc1ZhbCA9IGsgPT09ICdjYXNlJ1xuXG5cdFx0Y29uc3QgeyBiZWZvcmUsIGJsb2NrIH0gPSB0YWtlQmxvY2tGcm9tRW5kKClcblxuXHRcdGNvbnN0IG9wQ2FzZWQgPSAoKCkgPT4ge1xuXHRcdFx0aWYgKGNhc2VkRnJvbUZ1bikge1xuXHRcdFx0XHRjaGVja0VtcHR5KGJlZm9yZSxcblx0XHRcdFx0XHQnQ2FuXFwndCBnaXZlIGZvY3VzIHRvIGNhc2UgLSBpdCBpcyB0aGUgZnVuY3Rpb25cXCdzIGltcGxpY2l0IGZpcnN0IGFyZ3VtZW50LicpXG5cdFx0XHRcdHJldHVybiBOb25lXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiBvcElmKCFiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PlxuXHRcdFx0XHR3KGJlZm9yZSwgKCkgPT4gQXNzaWduLmZvY3VzKGxvYywgcGFyc2VFeHByKCkpKSlcblx0XHR9KSgpXG5cblx0XHRjb25zdCBsYXN0TGluZSA9IGxhc3QoYmxvY2sudG9rZW5zKVxuXHRcdGNvbnN0IHsgcGFydExpbmVzLCBvcEVsc2UgfSA9IEtleXdvcmQuaXNFbHNlKGhlYWQobGFzdExpbmUudG9rZW5zKSkgPyB7XG5cdFx0XHRcdHBhcnRMaW5lczogcnRhaWwoYmxvY2sudG9rZW5zKSxcblx0XHRcdFx0b3BFbHNlOiBzb21lKHcoU2xpY2UuYWxsKGxhc3RMaW5lLnRva2VucykudGFpbCgpLCBpc1ZhbCA/IGp1c3RCbG9ja1ZhbCA6IGp1c3RCbG9ja0RvKSlcblx0XHRcdH0gOiB7XG5cdFx0XHRcdHBhcnRMaW5lczogYmxvY2sudG9rZW5zLFxuXHRcdFx0XHRvcEVsc2U6IE5vbmVcblx0XHRcdH1cblxuXHRcdGNvbnN0IHBhcnRzID0gcGFydExpbmVzLm1hcChsaW5lID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9jayB9ID1cblx0XHRcdFx0d2cobGluZSwgaXNWYWwgPyB0YWtlQmxvY2tWYWxGcm9tRW5kIDogdGFrZUJsb2NrRG9Gcm9tRW5kKVxuXHRcdFx0Y29uc3QgdGVzdCA9IHcoYmVmb3JlLCBfcGFyc2VDYXNlVGVzdClcblx0XHRcdHJldHVybiAoaXNWYWwgPyBDYXNlVmFsUGFydCA6IENhc2VEb1BhcnQpKGxpbmUubG9jLCB0ZXN0LCBibG9jaylcblx0XHR9KVxuXG5cdFx0Y2hlY2socGFydHMubGVuZ3RoID4gMCwgJ011c3QgaGF2ZSBhdCBsZWFzdCAxIG5vbi1gZWxzZWAgdGVzdC4nKVxuXG5cdFx0cmV0dXJuIChpc1ZhbCA/IENhc2VWYWwgOiBDYXNlRG8pKGxvYywgb3BDYXNlZCwgcGFydHMsIG9wRWxzZSlcblx0fVxuXHQvLyBwYXJzZUNhc2UgcHJpdmF0ZXNcblx0Y29uc3Rcblx0XHRfcGFyc2VDYXNlVGVzdCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGZpcnN0ID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0Ly8gUGF0dGVybiBtYXRjaCBzdGFydHMgd2l0aCB0eXBlIHRlc3QgYW5kIGlzIGZvbGxvd2VkIGJ5IGxvY2FsIGRlY2xhcmVzLlxuXHRcdFx0Ly8gRS5nLiwgYDpTb21lIHZhbGBcblx0XHRcdGlmIChHcm91cC5pc1NwYWNlZChmaXJzdCkgJiYgdG9rZW5zLnNpemUoKSA+IDEpIHtcblx0XHRcdFx0Y29uc3QgZnQgPSBTbGljZS5hbGwoZmlyc3QudG9rZW5zKVxuXHRcdFx0XHRpZiAoS2V5d29yZC5pc0NvbG9uKGZ0LmhlYWQoKSkpIHtcblx0XHRcdFx0XHRjb25zdCB0eXBlID0gdyhmdC50YWlsKCksIHBhcnNlU3BhY2VkKVxuXHRcdFx0XHRcdGNvbnN0IGxvY2FscyA9IHcodG9rZW5zLnRhaWwoKSwgcGFyc2VMb2NhbERlY2xhcmVzKVxuXHRcdFx0XHRcdHJldHVybiBQYXR0ZXJuKGZpcnN0LmxvYywgdHlwZSwgbG9jYWxzLCBMb2NhbEFjY2Vzcy5mb2N1cyhsb2MpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFyc2VFeHByKClcblx0XHR9XG5cblx0Y29uc3Rcblx0XHRwYXJzZUV4cHIgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gaWZFbHNlKHRva2Vucy5vcFNwbGl0TWFueVdoZXJlKEtleXdvcmQuaXNPYmpBc3NpZ24pLFxuXHRcdFx0XHRzcGxpdHMgPT4ge1xuXHRcdFx0XHRcdC8vIFNob3J0IG9iamVjdCBmb3JtLCBzdWNoIGFzIChhLiAxLCBiLiAyKVxuXHRcdFx0XHRcdGNvbnN0IGZpcnN0ID0gc3BsaXRzWzBdLmJlZm9yZVxuXHRcdFx0XHRcdGNvbnN0IHRva2Vuc0NhbGxlciA9IGZpcnN0LnJ0YWlsKClcblxuXHRcdFx0XHRcdGNvbnN0IGtleXNWYWxzID0ge31cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGggLSAxOyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxvY2FsID0gcGFyc2VMb2NhbERlY2xhcmUoc3BsaXRzW2ldLmJlZm9yZS5sYXN0KCkpXG5cdFx0XHRcdFx0XHQvLyBDYW4ndCBoYXZlIGdvdCBhIHR5cGUgYmVjYXVzZSB0aGVyZSdzIG9ubHkgb25lIHRva2VuLlxuXHRcdFx0XHRcdFx0YXNzZXJ0KGlzRW1wdHkobG9jYWwub3BUeXBlKSlcblx0XHRcdFx0XHRcdGNvbnN0IHRva2Vuc1ZhbHVlID0gaSA9PT0gc3BsaXRzLmxlbmd0aCAtIDIgP1xuXHRcdFx0XHRcdFx0XHRzcGxpdHNbaSArIDFdLmJlZm9yZSA6XG5cdFx0XHRcdFx0XHRcdHNwbGl0c1tpICsgMV0uYmVmb3JlLnJ0YWlsKClcblx0XHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gdyh0b2tlbnNWYWx1ZSwgcGFyc2VFeHByUGxhaW4pXG5cdFx0XHRcdFx0XHRjeC5jaGVjayghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGtleXNWYWxzLCBsb2NhbC5uYW1lKSxcblx0XHRcdFx0XHRcdFx0bG9jYWwubG9jLCAoKSA9PiBgRHVwbGljYXRlIHByb3BlcnR5ICR7bG9jYWx9LmApXG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5c1ZhbHMsIGxvY2FsLm5hbWUsIHsgdmFsdWUgfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YXNzZXJ0KGxhc3Qoc3BsaXRzKS5hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IE9ialNpbXBsZShsb2MsIGtleXNWYWxzKVxuXHRcdFx0XHRcdGlmICh0b2tlbnNDYWxsZXIuaXNFbXB0eSgpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbFxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFydHMgPSB3KHRva2Vuc0NhbGxlciwgcGFyc2VFeHByUGFydHMpXG5cdFx0XHRcdFx0XHRhc3NlcnQoIWlzRW1wdHkocGFydHMpKVxuXHRcdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBoZWFkKHBhcnRzKSwgcHVzaCh0YWlsKHBhcnRzKSwgdmFsKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCgpID0+IHBhcnNlRXhwclBsYWluKClcblx0XHRcdClcblx0XHR9LFxuXG5cdFx0cGFyc2VFeHByUGFydHMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBvdXQgPSBbXVxuXHRcdFx0Y29uc3QgZW5kID0gdG9rZW5zLmVuZFxuXHRcdFx0Zm9yIChsZXQgaSA9IHRva2Vucy5zdGFydDsgaSA8IGVuZDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdGNvbnN0IGhlcmUgPSB0b2tlbnMuZGF0YVtpXVxuXHRcdFx0XHRpZiAoaGVyZSBpbnN0YW5jZW9mIEtleXdvcmQpIHtcblx0XHRcdFx0XHRjb25zdCByZXN0ID0gKCkgPT4gdG9rZW5zLl9uZXcoaSArIDEsIGVuZClcblx0XHRcdFx0XHRzd2l0Y2ggKGhlcmUuaykge1xuXHRcdFx0XHRcdFx0Y2FzZSAnfCc6IGNhc2UgJ358Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCB3KHJlc3QoKSwgcGFyc2VGdW4oaGVyZS5rKSkpXG5cdFx0XHRcdFx0XHRjYXNlICdjYXNlJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCB3KHJlc3QoKSwgcGFyc2VDYXNlKCdjYXNlJywgZmFsc2UpKSlcblx0XHRcdFx0XHRcdGNhc2UgJzx+Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB1c2gob3V0LCBZaWVsZChsb2MsIHcocmVzdCgpLCBwYXJzZUV4cHIpKSlcblx0XHRcdFx0XHRcdGNhc2UgJzx+fic6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwdXNoKG91dCwgWWllbGRUbyhsb2MsIHcocmVzdCgpLCBwYXJzZUV4cHIpKSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdC8vIGZhbGx0aHJvdWdoXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdG91dC5wdXNoKHBhcnNlU2luZ2xlKGhlcmUpKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG91dFxuXHRcdH0sXG5cblx0XHRwYXJzZUV4cHJQbGFpbiA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHBhcnRzID0gcGFyc2VFeHByUGFydHMoKVxuXHRcdFx0c3dpdGNoIChwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdHJldHVybiBHbG9iYWxBY2Nlc3MubnVsbChsb2MpXG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRyZXR1cm4gaGVhZChwYXJ0cylcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gQ2FsbChsb2MsIGhlYWQocGFydHMpLCB0YWlsKHBhcnRzKSlcblx0XHRcdH1cblx0XHR9XG5cblx0Y29uc3QgcGFyc2VGdW4gPSBrID0+ICgpID0+IHtcblx0XHRjb25zdCB7IG9wUmV0dXJuVHlwZSwgcmVzdCB9ID0gX3RyeVRha2VSZXR1cm5UeXBlKClcblx0XHRjaGVjayghcmVzdC5pc0VtcHR5KCksICgpID0+IGBFeHBlY3RlZCBhbiBpbmRlbnRlZCBibG9jayBhZnRlciAke2NvZGUoayl9YClcblx0XHRjb25zdCB7IGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wT3V0IH0gPSB3KHJlc3QsIF9mdW5BcmdzQW5kQmxvY2spXG5cdFx0Ly8gTmVlZCByZXMgZGVjbGFyZSBpZiB0aGVyZSBpcyBhIHJldHVybiB0eXBlIG9yIG91dCBjb25kaXRpb24uXG5cdFx0Y29uc3Qgb3BSZXNEZWNsYXJlID0gaWZFbHNlKG9wUmV0dXJuVHlwZSxcblx0XHRcdHJ0ID0+IHNvbWUoTG9jYWxEZWNsYXJlLnJlcyhydC5sb2MsIG9wUmV0dXJuVHlwZSkpLFxuXHRcdFx0KCkgPT4gb3BPdXQubWFwKG8gPT4gTG9jYWxEZWNsYXJlLnJlcyhvLmxvYywgb3BSZXR1cm5UeXBlKSkpXG5cdFx0cmV0dXJuIEZ1bihsb2MsIGssIGFyZ3MsIG9wUmVzdEFyZywgYmxvY2ssIG9wSW4sIG9wUmVzRGVjbGFyZSwgb3BPdXQpXG5cdH1cblxuXHQvLyBwYXJzZUZ1biBwcml2YXRlc1xuXHRjb25zdFxuXHRcdF90cnlUYWtlUmV0dXJuVHlwZSA9ICgpID0+IHtcblx0XHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0XHRpZiAoR3JvdXAuaXNTcGFjZWQoaCkgJiYgS2V5d29yZC5pc0NvbG9uKGhlYWQoaC50b2tlbnMpKSlcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0b3BSZXR1cm5UeXBlOiBzb21lKHcoU2xpY2UuYWxsKGgudG9rZW5zKS50YWlsKCksIHBhcnNlU3BhY2VkKSksXG5cdFx0XHRcdFx0XHRyZXN0OiB0b2tlbnMudGFpbCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHsgb3BSZXR1cm5UeXBlOiBOb25lLCByZXN0OiB0b2tlbnMgfVxuXHRcdH0sXG5cblx0XHRfZnVuQXJnc0FuZEJsb2NrID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaCA9IHRva2Vucy5oZWFkKClcblx0XHRcdC8vIE1pZ2h0IGJlIGB8Y2FzZWBcblx0XHRcdGlmIChLZXl3b3JkLmlzQ2FzZU9yQ2FzZURvKGgpKSB7XG5cdFx0XHRcdGNvbnN0IGVDYXNlID0gdyh0b2tlbnMudGFpbCgpLCBwYXJzZUNhc2UoaC5rLCB0cnVlKSlcblx0XHRcdFx0Y29uc3QgYXJncyA9IFsgTG9jYWxEZWNsYXJlLmZvY3VzKGgubG9jKSBdXG5cdFx0XHRcdHJldHVybiAoaC5rID09PSAnY2FzZScpID9cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdFx0YmxvY2s6IEJsb2NrVmFsKGxvYywgWyBdLCBlQ2FzZSlcblx0XHRcdFx0XHR9IDpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRhcmdzLCBvcFJlc3RBcmc6IE5vbmUsIG9wSW46IE5vbmUsIG9wT3V0OiBOb25lLFxuXHRcdFx0XHRcdFx0YmxvY2s6IEJsb2NrRG8obG9jLCBbIGVDYXNlIF0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgeyBiZWZvcmUsIGJsb2NrIH0gPSB0YWtlQmxvY2tGcm9tRW5kKClcblx0XHRcdFx0Y29uc3QgeyBhcmdzLCBvcFJlc3RBcmcgfSA9IHcoYmVmb3JlLCBfcGFyc2VGdW5Mb2NhbHMpXG5cdFx0XHRcdGNvbnN0IHsgb3BJbiwgb3BPdXQsIHJlc3QgfSA9IHdnKGJsb2NrLCBfdHJ5VGFrZUluT3V0KVxuXHRcdFx0XHRyZXR1cm4geyBhcmdzLCBvcFJlc3RBcmcsIGJsb2NrOiB3KHJlc3QsIHBhcnNlQmxvY2tGcm9tTGluZXMpLCBvcEluLCBvcE91dCB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9wYXJzZUZ1bkxvY2FscyA9ICgpID0+IHtcblx0XHRcdGlmICh0b2tlbnMuaXNFbXB0eSgpKVxuXHRcdFx0XHRyZXR1cm4geyBhcmdzOiBbXSwgb3BSZXN0QXJnOiBOb25lIH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBsID0gdG9rZW5zLmxhc3QoKVxuXHRcdFx0XHRpZiAobCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0XHRjeC5jaGVjayhsLm5Eb3RzID09PSAzLCBsLmxvYywgJ1NwbGF0IGFyZ3VtZW50IG11c3QgaGF2ZSBleGFjdGx5IDMgZG90cycpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGFyZ3M6IHcodG9rZW5zLnJ0YWlsKCksIHBhcnNlTG9jYWxEZWNsYXJlcyksXG5cdFx0XHRcdFx0XHRvcFJlc3RBcmc6IHNvbWUoTG9jYWxEZWNsYXJlKGwubG9jLCBsLm5hbWUsIE5vbmUsIGZhbHNlLCBmYWxzZSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgcmV0dXJuIHsgYXJnczogcGFyc2VMb2NhbERlY2xhcmVzKCksIG9wUmVzdEFyZzogTm9uZSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF90cnlUYWtlSW5PdXQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCB0cnlUYWtlSW5Pck91dCA9IChsaW5lcywgaW5Pck91dCkgPT4ge1xuXHRcdFx0XHRpZiAoIWxpbmVzLmlzRW1wdHkoKSkge1xuXHRcdFx0XHRcdGNvbnN0IGZpcnN0TGluZSA9IGxpbmVzLmhlYWQoKVxuXHRcdFx0XHRcdGFzc2VydChHcm91cC5pc0xpbmUoZmlyc3RMaW5lKSlcblx0XHRcdFx0XHRjb25zdCB0b2tlbnNGaXJzdCA9IFNsaWNlLmFsbChmaXJzdExpbmUudG9rZW5zKVxuXHRcdFx0XHRcdGlmIChLZXl3b3JkLmlzKGluT3JPdXQpKHRva2Vuc0ZpcnN0LmhlYWQoKSkpXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHR0b29rOiBzb21lKERlYnVnKFxuXHRcdFx0XHRcdFx0XHRcdGZpcnN0TGluZS5sb2MsXG5cdFx0XHRcdFx0XHRcdFx0dyh0b2tlbnNGaXJzdCwgcGFyc2VMaW5lc0Zyb21CbG9jaykpKSxcblx0XHRcdFx0XHRcdFx0cmVzdDogbGluZXMudGFpbCgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHsgdG9vazogTm9uZSwgcmVzdDogbGluZXMgfVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IHRvb2s6IG9wSW4sIHJlc3Q6IHJlc3RJbiB9ID0gdHJ5VGFrZUluT3JPdXQodG9rZW5zLCAnaW4nKVxuXHRcdFx0Y29uc3QgeyB0b29rOiBvcE91dCwgcmVzdCB9ID0gdHJ5VGFrZUluT3JPdXQocmVzdEluLCAnb3V0Jylcblx0XHRcdHJldHVybiB7IG9wSW4sIG9wT3V0LCByZXN0IH1cblx0XHR9XG5cblx0Y29uc3Rcblx0XHRwYXJzZUxpbmUgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoID0gdG9rZW5zLmhlYWQoKVxuXHRcdFx0Y29uc3QgcmVzdCA9IHRva2Vucy50YWlsKClcblxuXHRcdFx0Ly8gV2Ugb25seSBkZWFsIHdpdGggbXV0YWJsZSBleHByZXNzaW9ucyBoZXJlLCBvdGhlcndpc2Ugd2UgZmFsbCBiYWNrIHRvIHBhcnNlRXhwci5cblx0XHRcdGlmIChoIGluc3RhbmNlb2YgS2V5d29yZClcblx0XHRcdFx0c3dpdGNoIChoLmspIHtcblx0XHRcdFx0XHRjYXNlICcuICc6XG5cdFx0XHRcdFx0XHQvLyBJbmRleCBpcyBzZXQgYnkgcGFyc2VCbG9jay5cblx0XHRcdFx0XHRcdHJldHVybiBMaXN0RW50cnkobG9jLCB3KHJlc3QsIHBhcnNlRXhwciksIC0xKVxuXHRcdFx0XHRcdGNhc2UgJ2Nhc2UhJzpcblx0XHRcdFx0XHRcdHJldHVybiB3KHJlc3QsIHBhcnNlQ2FzZSgnY2FzZSEnLCBmYWxzZSkpXG5cdFx0XHRcdFx0Y2FzZSAnZGVidWcnOlxuXHRcdFx0XHRcdFx0cmV0dXJuIEdyb3VwLmlzQmxvY2sodG9rZW5zLnNlY29uZCgpKSA/XG5cdFx0XHRcdFx0XHRcdC8vIGBkZWJ1Z2AsIHRoZW4gaW5kZW50ZWQgYmxvY2tcblx0XHRcdFx0XHRcdFx0RGVidWcobG9jLCBwYXJzZUxpbmVzRnJvbUJsb2NrKCkpIDpcblx0XHRcdFx0XHRcdFx0Ly8gYGRlYnVnYCwgdGhlbiBzaW5nbGUgbGluZVxuXHRcdFx0XHRcdFx0XHREZWJ1Zyhsb2MsIHcocmVzdCwgcGFyc2VMaW5lT3JMaW5lcykpXG5cdFx0XHRcdFx0Y2FzZSAnZGVidWdnZXInOlxuXHRcdFx0XHRcdFx0Y2hlY2tFbXB0eShyZXN0LCAoKSA9PiBgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtofWApXG5cdFx0XHRcdFx0XHRyZXR1cm4gU3BlY2lhbC5kZWJ1Z2dlcihsb2MpXG5cdFx0XHRcdFx0Y2FzZSAnZW5kLWxvb3AhJzpcblx0XHRcdFx0XHRcdGNoZWNrRW1wdHkocmVzdCwgKCkgPT4gYERpZCBub3QgZXhwZWN0IGFueXRoaW5nIGFmdGVyICR7aH1gKVxuXHRcdFx0XHRcdFx0cmV0dXJuIEVuZExvb3AobG9jKVxuXHRcdFx0XHRcdGNhc2UgJ2xvb3AhJzpcblx0XHRcdFx0XHRcdHJldHVybiBMb29wKGxvYywgdyhyZXN0LCBqdXN0QmxvY2tEbykpXG5cdFx0XHRcdFx0Y2FzZSAncmVnaW9uJzpcblx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUxpbmVzRnJvbUJsb2NrKClcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gZmFsbCB0aHJvdWdoXG5cdFx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlmRWxzZSh0b2tlbnMub3BTcGxpdE9uY2VXaGVyZShLZXl3b3JkLmlzTGluZVNwbGl0KSxcblx0XHRcdFx0KHsgYmVmb3JlLCBhdCwgYWZ0ZXIgfSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBhdC5rID09PSAnLT4nID9cblx0XHRcdFx0XHRcdF9wYXJzZU1hcEVudHJ5KGJlZm9yZSwgYWZ0ZXIpIDpcblx0XHRcdFx0XHRcdF9wYXJzZUFzc2lnbihiZWZvcmUsIGF0LCBhZnRlcilcblx0XHRcdFx0fSxcblx0XHRcdFx0KCkgPT4gcGFyc2VFeHByKCkpXG5cdFx0fSxcblxuXHRcdHBhcnNlTGluZU9yTGluZXMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBfID0gcGFyc2VMaW5lKClcblx0XHRcdHJldHVybiBfIGluc3RhbmNlb2YgQXJyYXkgPyBfIDogWyBfIF1cblx0XHR9XG5cblx0Ly8gcGFyc2VMaW5lIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlQXNzaWduID0gKGFzc2lnbmVkLCBhc3NpZ25lciwgdmFsdWUpID0+IHtcblx0XHRcdGxldCBsb2NhbHMgPSB3KGFzc2lnbmVkLCBwYXJzZUxvY2FsRGVjbGFyZXMpXG5cdFx0XHRjb25zdCBrID0gYXNzaWduZXIua1xuXHRcdFx0Y29uc3QgZVZhbHVlUHJlID0gdmFsdWUuaXNFbXB0eSgpID8gR2xvYmFsQWNjZXNzLnRydWUobG9jKSA6IHcodmFsdWUsIHBhcnNlRXhwcilcblxuXHRcdFx0bGV0IGVWYWx1ZU5hbWVkXG5cdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBuYW1lID0gaGVhZChsb2NhbHMpLm5hbWVcblx0XHRcdFx0aWYgKG5hbWUgPT09ICdkb2MnKSB7XG5cdFx0XHRcdFx0aWYgKGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bilcblx0XHRcdFx0XHRcdC8vIEtMVURHRTogYGRvY2AgZm9yIG1vZHVsZSBjYW4gYmUgYSBGdW4gc2lnbmF0dXJlLlxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogU29tZXRoaW5nIGJldHRlci4uLlxuXHRcdFx0XHRcdFx0ZVZhbHVlUHJlLmFyZ3MuZm9yRWFjaChhcmcgPT4geyBhcmcub2tUb05vdFVzZSA9IHRydWUgfSlcblx0XHRcdFx0XHRlVmFsdWVOYW1lZCA9IGVWYWx1ZVByZVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRlVmFsdWVOYW1lZCA9IF90cnlBZGREaXNwbGF5TmFtZShlVmFsdWVQcmUsIG5hbWUpXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVWYWx1ZU5hbWVkID0gZVZhbHVlUHJlXG5cblx0XHRcdGNvbnN0IGlzWWllbGQgPSBrID09PSAnPH4nIHx8IGsgPT09ICc8fn4nXG5cblx0XHRcdGNvbnN0IGVWYWx1ZSA9IF92YWx1ZUZyb21Bc3NpZ24oZVZhbHVlTmFtZWQsIGspXG5cblx0XHRcdGlmIChpc0VtcHR5KGxvY2FscykpIHtcblx0XHRcdFx0Y2hlY2soaXNZaWVsZCwgJ0Fzc2lnbm1lbnQgdG8gbm90aGluZycpXG5cdFx0XHRcdHJldHVybiBlVmFsdWVcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzWWllbGQpXG5cdFx0XHRcdGxvY2Fscy5mb3JFYWNoKF8gPT5cblx0XHRcdFx0XHRjeC5jaGVjayhfLmsgIT09ICdsYXp5JywgXy5sb2MsICdDYW4gbm90IHlpZWxkIHRvIGxhenkgdmFyaWFibGUuJykpXG5cblx0XHRcdGlmIChrID09PSAnLiAnKVxuXHRcdFx0XHRsb2NhbHMuZm9yRWFjaChsID0+IHsgbC5va1RvTm90VXNlID0gdHJ1ZSB9KVxuXG5cdFx0XHRpZiAobG9jYWxzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBhc3NpZ24gPSBBc3NpZ24obG9jLCBsb2NhbHNbMF0sIGssIGVWYWx1ZSlcblx0XHRcdFx0Y29uc3QgaXNUZXN0ID0gYXNzaWduLmFzc2lnbmVlLm5hbWUuZW5kc1dpdGgoJ3Rlc3QnKVxuXHRcdFx0XHRyZXR1cm4gaXNUZXN0ICYmIGsgPT09ICcuICcgPyBEZWJ1Zyhsb2MsIFsgYXNzaWduIF0pIDogYXNzaWduXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gbG9jYWxzLnNvbWUobCA9PiBsLmlzTGF6eSlcblx0XHRcdFx0aWYgKGlzTGF6eSlcblx0XHRcdFx0XHRsb2NhbHMuZm9yRWFjaChfID0+IGN4LmNoZWNrKF8uaXNMYXp5LCBfLmxvYyxcblx0XHRcdFx0XHRcdCdJZiBhbnkgcGFydCBvZiBkZXN0cnVjdHVyaW5nIGFzc2lnbiBpcyBsYXp5LCBhbGwgbXVzdCBiZS4nKSlcblx0XHRcdFx0cmV0dXJuIEFzc2lnbkRlc3RydWN0dXJlKGxvYywgbG9jYWxzLCBrLCBlVmFsdWUsIGlzTGF6eSlcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3ZhbHVlRnJvbUFzc2lnbiA9ICh2YWx1ZVByZSwga0Fzc2lnbikgPT4ge1xuXHRcdFx0c3dpdGNoIChrQXNzaWduKSB7XG5cdFx0XHRcdGNhc2UgJzx+Jzpcblx0XHRcdFx0XHRyZXR1cm4gWWllbGQodmFsdWVQcmUubG9jLCB2YWx1ZVByZSlcblx0XHRcdFx0Y2FzZSAnPH5+Jzpcblx0XHRcdFx0XHRyZXR1cm4gWWllbGRUbyh2YWx1ZVByZS5sb2MsIHZhbHVlUHJlKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZVByZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBXZSBnaXZlIGl0IGEgZGlzcGxheU5hbWUgaWY6XG5cdFx0Ly8gLiBJdCdzIGEgYmxvY2tcblx0XHQvLyAuIEl0J3MgYSBmdW5jdGlvblxuXHRcdC8vIC4gSXQncyBvbmUgb2YgdGhvc2UgYXQgdGhlIGVuZCBvZiBhIGJsb2NrXG5cdFx0Ly8gLiBJdCdzIG9uZSBvZiB0aG9zZSBhcyB0aGUgZW5kIG1lbWJlciBvZiBhIGNhbGwuXG5cdFx0X3RyeUFkZERpc3BsYXlOYW1lID0gKGVWYWx1ZVByZSwgZGlzcGxheU5hbWUpID0+IHtcblx0XHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIENhbGwgJiYgZVZhbHVlUHJlLmFyZ3MubGVuZ3RoID4gMDpcblx0XHRcdFx0XHQvLyBUT0RPOiBJbW11dGFibGVcblx0XHRcdFx0XHRlVmFsdWVQcmUuYXJnc1tlVmFsdWVQcmUuYXJncy5sZW5ndGggLSAxXSA9XG5cdFx0XHRcdFx0XHRfdHJ5QWRkRGlzcGxheU5hbWUobGFzdChlVmFsdWVQcmUuYXJncyksIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEZ1bjpcblx0XHRcdFx0XHRyZXR1cm4gT2JqUmV0dXJuKGVWYWx1ZVByZS5sb2MsIFtdLCBbXSwgc29tZShlVmFsdWVQcmUpLCBzb21lKGRpc3BsYXlOYW1lKSlcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIE9ialJldHVybiAmJlxuXHRcdFx0XHRcdCFlVmFsdWVQcmUua2V5cy5zb21lKGtleSA9PiBrZXkubmFtZSA9PT0gJ2Rpc3BsYXlOYW1lJyk6XG5cdFx0XHRcdFx0ZVZhbHVlUHJlLm9wRGlzcGxheU5hbWUgPSBzb21lKGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblxuXHRcdFx0XHRjYXNlIGVWYWx1ZVByZSBpbnN0YW5jZW9mIEJsb2NrV3JhcDoge1xuXHRcdFx0XHRcdGNvbnN0IGJsb2NrID0gZVZhbHVlUHJlLmJsb2NrXG5cdFx0XHRcdFx0YmxvY2sucmV0dXJuZWQgPSBfdHJ5QWRkRGlzcGxheU5hbWUoYmxvY2sucmV0dXJuZWQsIGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdHJldHVybiBlVmFsdWVQcmVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGVWYWx1ZVByZVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VNYXBFbnRyeSA9IChiZWZvcmUsIGFmdGVyKSA9PlxuXHRcdFx0Ly8gVE9ETzogaW5kZXggRmlsbGVkIGluIGJ5ID8/P1xuXHRcdFx0TWFwRW50cnkobG9jLCB3KGJlZm9yZSwgcGFyc2VFeHByKSwgdyhhZnRlciwgcGFyc2VFeHByKSwgLTEpXG5cblx0Y29uc3Rcblx0XHRwYXJzZUxvY2FsRGVjbGFyZXMgPSAoKSA9PiB0b2tlbnMubWFwKHBhcnNlTG9jYWxEZWNsYXJlKSxcblx0XHRwYXJzZUxvY2FsRGVjbGFyZSA9IHQgPT4ge1xuXHRcdFx0bGV0IG5hbWVcblx0XHRcdGxldCBvcFR5cGUgPSBOb25lXG5cdFx0XHRsZXQgaXNMYXp5ID0gZmFsc2VcblxuXHRcdFx0aWYgKEdyb3VwLmlzU3BhY2VkKHQpKSB7XG5cdFx0XHRcdGNvbnN0IHRva2VucyA9IFNsaWNlLmFsbCh0LnRva2Vucylcblx0XHRcdFx0bGV0IHJlc3QgPSB0b2tlbnNcblx0XHRcdFx0aWYgKEtleXdvcmQuaXNUaWxkZSh0b2tlbnMuaGVhZCgpKSkge1xuXHRcdFx0XHRcdGlzTGF6eSA9IHRydWVcblx0XHRcdFx0XHRyZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0XHRcdG5hbWUgPSBfcGFyc2VMb2NhbE5hbWUocmVzdC5oZWFkKCkpXG5cdFx0XHRcdGNvbnN0IHJlc3QyID0gcmVzdC50YWlsKClcblx0XHRcdFx0aWYgKCFyZXN0Mi5pc0VtcHR5KCkpIHtcblx0XHRcdFx0XHRjb25zdCBjb2xvbiA9IHJlc3QyLmhlYWQoKVxuXHRcdFx0XHRcdGN4LmNoZWNrKEtleXdvcmQuaXNDb2xvbihjb2xvbiksIGNvbG9uLmxvYywgKCkgPT4gYEV4cGVjdGVkICR7Y29kZSgnOicpfWApXG5cdFx0XHRcdFx0Y2hlY2socmVzdDIuc2l6ZSgpID4gMSwgKCkgPT4gYEV4cGVjdGVkIHNvbWV0aGluZyBhZnRlciAke2NvbG9ufWApXG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5zVHlwZSA9IHJlc3QyLnRhaWwoKVxuXHRcdFx0XHRcdG9wVHlwZSA9IHNvbWUodyh0b2tlbnNUeXBlLCBwYXJzZVNwYWNlZCkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0bmFtZSA9IF9wYXJzZUxvY2FsTmFtZSh0KVxuXG5cdFx0XHRyZXR1cm4gTG9jYWxEZWNsYXJlKHQubG9jLCBuYW1lLCBvcFR5cGUsIGlzTGF6eSwgZmFsc2UpXG5cdFx0fVxuXG5cdC8vIHBhcnNlTG9jYWxEZWNsYXJlIHByaXZhdGVzXG5cdGNvbnN0XG5cdFx0X3BhcnNlTG9jYWxOYW1lID0gdCA9PiB7XG5cdFx0XHRpZiAoS2V5d29yZC5pc0ZvY3VzKHQpKVxuXHRcdFx0XHRyZXR1cm4gJ18nXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIE5hbWUsIHQubG9jLCAoKSA9PiBgRXhwZWN0ZWQgYSBsb2NhbCBuYW1lLCBub3QgJHt0fWApXG5cdFx0XHRcdC8vIFRPRE86IEFsbG93IHRoaXM/XG5cdFx0XHRcdGN4LmNoZWNrKCFKc0dsb2JhbHMuaGFzKHQubmFtZSksIHQubG9jLCAoKSA9PlxuXHRcdFx0XHRcdGBDYW4gbm90IHNoYWRvdyBnbG9iYWwgJHtjb2RlKHQubmFtZSl9YClcblx0XHRcdFx0cmV0dXJuIHQubmFtZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRjb25zdCBwYXJzZVNpbmdsZSA9IHQgPT4ge1xuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgTmFtZTpcblx0XHRcdFx0cmV0dXJuIF9hY2Nlc3ModC5uYW1lKVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgR3JvdXA6XG5cdFx0XHRcdHN3aXRjaCAodC5rKSB7XG5cdFx0XHRcdFx0Y2FzZSBHX1NwYWNlOiByZXR1cm4gd2codCwgcGFyc2VTcGFjZWQpXG5cdFx0XHRcdFx0Y2FzZSBHX1BhcmVuOiByZXR1cm4gd2codCwgcGFyc2VFeHByKVxuXHRcdFx0XHRcdGNhc2UgR19CcmFja2V0OiByZXR1cm4gTGlzdFNpbXBsZSh0LmxvYywgd2codCwgcGFyc2VFeHByUGFydHMpKVxuXHRcdFx0XHRcdGNhc2UgR19CbG9jazogcmV0dXJuIHdnKHQsIGJsb2NrV3JhcClcblx0XHRcdFx0XHRjYXNlIEdfUXVvdGU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gUXVvdGUodC5sb2MsXG5cdFx0XHRcdFx0XHRcdHQudG9rZW5zLm1hcChfID0+ICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpID8gXyA6IHBhcnNlU2luZ2xlKF8pKSlcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dW5leHBlY3RlZCh0KVxuXHRcdFx0XHR9XG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBUb2tlbk51bWJlckxpdGVyYWw6XG5cdFx0XHRcdHJldHVybiBOdW1iZXJMaXRlcmFsKHQubG9jLCB0LnZhbHVlKVxuXHRcdFx0Y2FzZSB0IGluc3RhbmNlb2YgQ2FsbE9uRm9jdXM6XG5cdFx0XHRcdHJldHVybiBDYWxsKHQubG9jLCBfYWNjZXNzKHQubmFtZSksIFsgTG9jYWxBY2Nlc3MuZm9jdXModC5sb2MpIF0pXG5cdFx0XHRjYXNlIHQgaW5zdGFuY2VvZiBLZXl3b3JkOlxuXHRcdFx0XHRpZiAodC5rID09PSAnXycpXG5cdFx0XHRcdFx0cmV0dXJuIExvY2FsQWNjZXNzLmZvY3VzKHQubG9jKVxuXHRcdFx0XHRlbHNlIGlmIChTcGVjaWFsS2V5d29yZHMuaGFzKHQuaykpXG5cdFx0XHRcdFx0cmV0dXJuIFNwZWNpYWwodC5sb2MsIHQuaylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHVuZXhwZWN0ZWQodClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgdCBpbnN0YW5jZW9mIERvdE5hbWU6XG5cdFx0XHRcdGlmICh0Lm5Eb3RzID09PSAzKVxuXHRcdFx0XHRcdHJldHVybiBTcGxhdCh0LmxvYywgTG9jYWxBY2Nlc3ModC5sb2MsIHQubmFtZSkpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR1bmV4cGVjdGVkKHQpXG5cdFx0fVxuXHR9XG5cdC8vIHBhcnNlU2luZ2xlIHByaXZhdGVzXG5cdGNvbnN0IF9hY2Nlc3MgPSBuYW1lID0+XG5cdFx0SnNHbG9iYWxzLmhhcyhuYW1lKSA/IEdsb2JhbEFjY2Vzcyhsb2MsIG5hbWUpIDogTG9jYWxBY2Nlc3MobG9jLCBuYW1lKVxuXG5cdGNvbnN0IHBhcnNlU3BhY2VkID0gKCkgPT4ge1xuXHRcdGNvbnN0IGggPSB0b2tlbnMuaGVhZCgpLCByZXN0ID0gdG9rZW5zLnRhaWwoKVxuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSBoIGluc3RhbmNlb2YgS2V5d29yZDpcblx0XHRcdFx0aWYgKGguayA9PT0gJzonKSB7XG5cdFx0XHRcdFx0Y3guY2hlY2soIUtleXdvcmQuaXNDb2xvbihyZXN0LmhlYWQoKSksIGgubG9jLCAoKSA9PiBgVHdvICR7aH0gaW4gYSByb3dgKVxuXHRcdFx0XHRcdGNvbnN0IGVUeXBlID0gdyhyZXN0LCBwYXJzZVNwYWNlZClcblx0XHRcdFx0XHRjb25zdCBmb2N1cyA9IExvY2FsQWNjZXNzLmZvY3VzKGgubG9jKVxuXHRcdFx0XHRcdHJldHVybiBDYWxsLmNvbnRhaW5zKGgubG9jLCBlVHlwZSwgZm9jdXMpXG5cdFx0XHRcdH0gZWxzZSBpZiAoaC5rID09PSAnficpXG5cdFx0XHRcdFx0cmV0dXJuIExhenkoaC5sb2MsIHcocmVzdCwgcGFyc2VTcGFjZWQpKVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRjb25zdCBtZW1iZXJPclN1YnNjcmlwdCA9IChlLCB0KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jID0gdC5sb2Ncblx0XHRcdFx0XHRpZiAodCBpbnN0YW5jZW9mIERvdE5hbWUpIHtcblx0XHRcdFx0XHRcdGN4LmNoZWNrKHQubkRvdHMgPT09IDEsIGxvYywgJ1RvbyBtYW55IGRvdHMhJylcblx0XHRcdFx0XHRcdHJldHVybiBNZW1iZXIobG9jLCBlLCB0Lm5hbWUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0IGluc3RhbmNlb2YgR3JvdXApIHtcblx0XHRcdFx0XHRcdGlmICh0LmsgPT09IEdfQnJhY2tldClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENhbGwuc3ViKGxvYyxcblx0XHRcdFx0XHRcdFx0XHR1bnNoaWZ0KGUsIHdnKHQsIHBhcnNlRXhwclBhcnRzKSkpXG5cdFx0XHRcdFx0XHRpZiAodC5rID09PSBHX1BhcmVuKSB7XG5cdFx0XHRcdFx0XHRcdGN4LmNoZWNrKGlzRW1wdHkodC50b2tlbnMpLCBsb2MsXG5cdFx0XHRcdFx0XHRcdFx0KCkgPT4gYFVzZSAke2NvZGUoJyhhIGIpJyl9LCBub3QgJHtjb2RlKCdhKGIpJyl9YClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIENhbGwobG9jLCBlLCBbXSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgY3guZmFpbChsb2MsIGBFeHBlY3RlZCBtZW1iZXIgb3Igc3ViLCBub3QgJHt0fWApXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3QucmVkdWNlKG1lbWJlck9yU3Vic2NyaXB0LCBwYXJzZVNpbmdsZShoKSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCB0cnlQYXJzZVVzZSA9IGsgPT4gKCkgPT4ge1xuXHRcdGlmICghdG9rZW5zLmlzRW1wdHkoKSkge1xuXHRcdFx0Y29uc3QgbDAgPSB0b2tlbnMuaGVhZCgpXG5cdFx0XHRhc3NlcnQoR3JvdXAuaXNMaW5lKGwwKSlcblx0XHRcdGlmIChLZXl3b3JkLmlzKGspKGhlYWQobDAudG9rZW5zKSkpXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dXNlczogdyhTbGljZS5hbGwobDAudG9rZW5zKS50YWlsKCksIF9wYXJzZVVzZShrKSksXG5cdFx0XHRcdFx0cmVzdDogdG9rZW5zLnRhaWwoKVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB7IHVzZXM6IFtdLCByZXN0OiB0b2tlbnMgfVxuXHR9XG5cblx0Ly8gdHJ5UGFyc2VVc2UgcHJpdmF0ZXNcblx0Y29uc3Rcblx0XHRfcGFyc2VVc2UgPSBrID0+ICgpID0+IHtcblx0XHRcdGNvbnN0IHsgYmVmb3JlLCBibG9jayB9ID0gdGFrZUJsb2NrRnJvbUVuZCgpXG5cdFx0XHRjaGVjayhiZWZvcmUuaXNFbXB0eSgpLCAoKSA9PlxuXHRcdFx0XHRgRGlkIG5vdCBleHBlY3QgYW55dGhpbmcgYWZ0ZXIgJHtjb2RlKGspfSBvdGhlciB0aGFuIGEgYmxvY2tgKVxuXHRcdFx0cmV0dXJuIGJsb2NrLnRva2Vucy5tYXAobGluZSA9PiB7XG5cdFx0XHRcdGNvbnN0IHRSZXEgPSBsaW5lLnRva2Vuc1swXVxuXHRcdFx0XHRjb25zdCB7IHBhdGgsIG5hbWUgfSA9IF9wYXJzZVJlcXVpcmUodFJlcSlcblx0XHRcdFx0aWYgKGsgPT09ICd1c2UhJykge1xuXHRcdFx0XHRcdGlmIChsaW5lLnRva2Vucy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdFx0dW5leHBlY3RlZChsaW5lLnRva2Vuc1sxXSlcblx0XHRcdFx0XHRyZXR1cm4gVXNlRG8obGluZS5sb2MsIHBhdGgpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gJ3VzZX4nIHx8IGsgPT09ICd1c2UtZGVidWcnXG5cdFx0XHRcdFx0Y29uc3QgeyB1c2VkLCBvcFVzZURlZmF1bHQgfSA9XG5cdFx0XHRcdFx0XHR3KFNsaWNlLmFsbChsaW5lLnRva2VucykudGFpbCgpLCBfcGFyc2VUaGluZ3NVc2VkKG5hbWUsIGlzTGF6eSkpXG5cdFx0XHRcdFx0cmV0dXJuIFVzZShsaW5lLmxvYywgcGF0aCwgdXNlZCwgb3BVc2VEZWZhdWx0KVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRfdXNlTGluZSA9IGsgPT4gKCkgPT4ge1xuXHRcdFx0Y29uc3QgdFJlcSA9IHRva2Vucy5oZWFkKClcblx0XHRcdGNvbnN0IHsgcGF0aCwgbmFtZSB9ID0gX3BhcnNlUmVxdWlyZSh0UmVxKVxuXHRcdFx0aWYgKGsgPT09ICd1c2UhJykge1xuXHRcdFx0XHRjaGVjayh0b2tlbnMuc2l6ZSgpID09PSAxLCAoKSA9PiBgVW5leHBlY3RlZCAke3Rva2Vuc1sxXX1gKVxuXHRcdFx0XHRyZXR1cm4gVXNlRG8obG9jLCBwYXRoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gayA9PT0gJ3VzZX4nIHx8IGsgPT09ICd1c2UtZGVidWcnXG5cdFx0XHRcdGNvbnN0IHsgdXNlZCwgb3BVc2VEZWZhdWx0IH0gPSB3KHRva2Vucy50YWlsKCksIF9wYXJzZVRoaW5nc1VzZWQobmFtZSwgaXNMYXp5KSlcblx0XHRcdFx0cmV0dXJuIFVzZShsb2MsIHBhdGgsIHVzZWQsIG9wVXNlRGVmYXVsdClcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnNlVGhpbmdzVXNlZCA9IChuYW1lLCBpc0xhenkpID0+ICgpID0+IHtcblx0XHRcdGNvbnN0IHVzZURlZmF1bHQgPSAoKSA9PiBMb2NhbERlY2xhcmUobG9jLCBuYW1lLCBOb25lLCBpc0xhenksIGZhbHNlKVxuXHRcdFx0aWYgKHRva2Vucy5pc0VtcHR5KCkpXG5cdFx0XHRcdHJldHVybiB7IHVzZWQ6IFtdLCBvcFVzZURlZmF1bHQ6IHNvbWUodXNlRGVmYXVsdCgpKSB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgaGFzRGVmYXVsdFVzZSA9IEtleXdvcmQuaXNGb2N1cyh0b2tlbnMuaGVhZCgpKVxuXHRcdFx0XHRjb25zdCBvcFVzZURlZmF1bHQgPSBvcElmKGhhc0RlZmF1bHRVc2UsIHVzZURlZmF1bHQpXG5cdFx0XHRcdGNvbnN0IHJlc3QgPSBoYXNEZWZhdWx0VXNlID8gdG9rZW5zLnRhaWwoKSA6IHRva2Vuc1xuXHRcdFx0XHRjb25zdCB1c2VkID0gdyhyZXN0LCBwYXJzZUxvY2FsRGVjbGFyZXMpLm1hcChsID0+IHtcblx0XHRcdFx0XHRjaGVjayhsLm5hbWUgIT09ICdfJywgKCkgPT4gYCR7Y29kZSgnXycpfSBub3QgYWxsb3dlZCBhcyBpbXBvcnQgbmFtZS5gKVxuXHRcdFx0XHRcdGwuaXNMYXp5ID0gaXNMYXp5XG5cdFx0XHRcdFx0cmV0dXJuIGxcblx0XHRcdFx0fSlcblx0XHRcdFx0cmV0dXJuIHsgdXNlZCwgb3BVc2VEZWZhdWx0IH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnNlUmVxdWlyZSA9IHQgPT4ge1xuXHRcdFx0aWYgKHQgaW5zdGFuY2VvZiBOYW1lKVxuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiB0Lm5hbWUsIG5hbWU6IHQubmFtZSB9XG5cdFx0XHRlbHNlIGlmICh0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdFx0cmV0dXJuIHsgcGF0aDogcHVzaChfcGFydHNGcm9tRG90TmFtZSh0KSwgdC5uYW1lKS5qb2luKCcvJyksIG5hbWU6IHQubmFtZSB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y2hlY2soR3JvdXAuaXNTcGFjZWQodCksICdOb3QgYSB2YWxpZCBtb2R1bGUgbmFtZS4nKVxuXHRcdFx0XHRyZXR1cm4gd2codCwgX3BhcnNlTG9jYWxSZXF1aXJlKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcGFyc2VMb2NhbFJlcXVpcmUgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBmaXJzdCA9IHRva2Vucy5oZWFkKClcblx0XHRcdGxldCBwYXJ0c1xuXHRcdFx0aWYgKGZpcnN0IGluc3RhbmNlb2YgRG90TmFtZSlcblx0XHRcdFx0cGFydHMgPSBfcGFydHNGcm9tRG90TmFtZShmaXJzdClcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjeC5jaGVjayhmaXJzdCBpbnN0YW5jZW9mIE5hbWUsIGZpcnN0LmxvYywgJ05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdFx0cGFydHMgPSBbIF1cblx0XHRcdH1cblx0XHRcdHBhcnRzLnB1c2goZmlyc3QubmFtZSlcblx0XHRcdHRva2Vucy50YWlsKCkuZWFjaCh0ID0+IHtcblx0XHRcdFx0Y3guY2hlY2sodCBpbnN0YW5jZW9mIERvdE5hbWUgJiYgdC5uRG90cyA9PT0gMSwgdC5sb2MsXG5cdFx0XHRcdFx0J05vdCBhIHZhbGlkIHBhcnQgb2YgbW9kdWxlIHBhdGguJylcblx0XHRcdFx0cGFydHMucHVzaCh0Lm5hbWUpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cGF0aDogcGFydHMuam9pbignLycpLFxuXHRcdFx0XHRuYW1lOiB0b2tlbnMubGFzdCgpLm5hbWVcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3BhcnRzRnJvbURvdE5hbWUgPSBkb3ROYW1lID0+XG5cdFx0XHRkb3ROYW1lLm5Eb3RzID09PSAxID8gWyAnLicgXSA6IHJlcGVhdCgnLi4nLCBkb3ROYW1lLm5Eb3RzIC0gMSlcblxuXHRyZXR1cm4gcGFyc2VNb2R1bGUoKVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=