import Loc from 'esast/dist/Loc'
import { code } from '../CompileError'
import { Assign, AssignDestructure, BlockDo, BlockVal, BlockWrap, Call, CaseDoPart, CaseValPart,
	CaseDo, CaseVal, Debug, NumberLiteral, EndLoop, Fun, GlobalAccess, Lazy, ListEntry, ListReturn,
	ListSimple, LocalAccess, LocalDeclare, LocalDeclare, Loop, MapEntry, MapReturn, Member, Module,
	ModuleDefaultExport, ObjReturn, ObjSimple, Pattern, Quote, Special, Splat, Val, UseDo, Use,
	Yield, YieldTo } from '../Expression'
import { JsGlobals, SpecialKeywords } from './Lang'
import { CallOnFocus, DotName, Group, G_Block, G_Bracket,
	G_Paren, G_Space, G_Quote, Keyword, TokenNumberLiteral, Name } from './Token'
import { cat, head, flatMap, isEmpty, last, push, repeat, rtail, tail, unshift } from './U/Bag'
import { ifElse, None, opIf, some } from './U/Op'
import { assert } from './U/util'
import Slice from './U/Slice'

export default function parse(cx, rootToken) {
	assert(Group.isBlock(rootToken))
	let tokens = Slice.all(rootToken.tokens)
	let loc = rootToken.loc

	// Functions for moving through tokens:
	const
		check = (cond, message) =>
			cx.check(cond, loc, message),
		checkEmpty = (tokens, message) =>
			cx.check(tokens.isEmpty(), () => _locFromTokens(tokens), message),
		w = (_tokens, fun) => {
			const t = tokens
			tokens = _tokens
			const l = loc
			loc = tokens.isEmpty() ? loc : _locFromTokens(tokens)
			const res = fun()
			tokens = t
			loc = l
			return res
		},
		wg = (group, fun) => {
			const t = tokens
			tokens = Slice.all(group.tokens)
			const l = loc
			loc = group.loc
			const res = fun()
			tokens = t
			loc = l
			return res
		},
		_locFromTokens = tokens => Loc(tokens.head().loc.start, tokens.last().loc.end),
		unexpected = t => cx.fail(t.loc, `Unexpected ${t}`)

	const parseModule = () => {
		const { uses: doUses, rest } = tryParseUse('use!')()
		const { uses: plainUses, rest: rest1 } = w(rest, tryParseUse('use'))
		const { uses: lazyUses, rest: rest2 } = w(rest1, tryParseUse('use~'))
		const { uses: debugUses, rest: rest3 } = w(rest2, tryParseUse('use-debug'))
		const block = w(rest3, parseModuleBody)

		block.lines.forEach(line => {
			if (line instanceof Assign && line.k === 'export')
				check(line.assignee.name !== 'displayName',
					'Module can not choose its own displayName.')
		})
		if (cx.opts.moduleDisplayName())
			block.lines.push(
				Assign(
					loc,
					LocalDeclare(loc, 'displayName', [], false, true),
					'export',
					Quote.forString(loc, cx.opts.moduleName())))

		const uses = plainUses.concat(lazyUses)
		return Module(loc, doUses, uses, debugUses, block)
	}

	// parseBlock
	const
		takeBlockFromEnd = () => {
			check(!tokens.isEmpty(), 'Expected an indented block.')
			const block = tokens.last()
			cx.check(Group.isBlock(block), block.loc, 'Expected an indented block.')
			return { before: tokens.rtail(), block }
		},

		blockWrap = () => BlockWrap(loc, _parseBlockBody('val')()),

		justBlockDo = () => {
			const { before, block } = takeBlockDoFromEnd()
			check(before.isEmpty(), 'Expected just a block.')
			return block
		},
		justBlockVal = () => {
			const { before, block } = takeBlockValFromEnd()
			check(before.isEmpty(), 'Expected just a block.')
			return block
		},

		takeBlockDoFromEnd = () => {
			const{ before, block } = takeBlockFromEnd()
			return { before, block: wg(block, _parseBodyDo)  }
		},
		takeBlockValFromEnd = () => {
			const { before, block} = takeBlockFromEnd()
			return { before, block: wg(block, _parseBlockBody('val')) }
		},

		// TODO: Just have module return a value and use a normal block.
		parseModuleBody = () => _parseBlockBody('module')(),

		parseBlockFromLines = () => _parseBlockBody('any')(),

		// Gets lines in a region or Debug.
		parseLinesFromBlock = () => {
			const h = tokens.head()
			cx.check(tokens.size() > 1, h.loc, () => `Expected indented block after ${h}`)
			const block = tokens.second()
			assert(tokens.size() === 2 && Group.isBlock(block))
			return flatMap(block.tokens, line => wg(line, parseLineOrLines))
		}

	// parseBlock privates
	const
		_parseBodyDo = () => {
			const { eLines, kReturn } = _parseBlockLines()
			check(kReturn === 'plain', () => `Can not make ${kReturn} in statement context.`)
			return BlockDo(loc, eLines)
		},

		_parseBlockBody = k => () => {
			assert(k === 'val' || k === 'module' || k === 'any')

			// keys only matter if kReturn === 'obj'
			const { eLines, kReturn, listLength, mapLength, objKeys, debugKeys } =
				_parseBlockLines()

			const { doLines, opReturn } = (() => {
				if (kReturn === 'bag')
					return {
						doLines: eLines,
						opReturn: some(ListReturn(loc, listLength))
					}
				if (kReturn === 'map')
					return {
						doLines: eLines,
						opReturn: some(MapReturn(loc, mapLength))
					}

				const lastReturn = !isEmpty(eLines) && last(eLines) instanceof Val
				if (kReturn === 'obj' && k !== 'module')
					return lastReturn ?
						{
							doLines: rtail(eLines),
							opReturn: some(ObjReturn(
								loc,
								objKeys,
								debugKeys,
								some(last(eLines)),
								// displayName is filled in by parseAssign.
								None))
						} : {
							doLines: eLines,
							opReturn: some(ObjReturn(
								loc,
								objKeys,
								debugKeys,
								None,
								// displayName is filled in by parseAssign.
								None))
						}
				else
					return lastReturn ?
					{ doLines: rtail(eLines), opReturn: some(last(eLines)) } :
					{ doLines: eLines, opReturn: None }
			})()

			switch (k) {
				case 'val':
					return ifElse(opReturn,
						returned => BlockVal(loc, doLines, returned),
						() => cx.fail('Expected a value block.'))
				case 'any':
					return ifElse(opReturn,
						returned => BlockVal(loc, doLines, returned),
						() => BlockDo(loc, doLines))
				case 'module': {
					// TODO: Handle debug-only exports
					const lines =
						// Turn Obj assigns into exports.
						cat(
							doLines.map(line => {
								if (line instanceof Assign && line.k === '. ')
									line.k = 'export'
								return line
							}),
							opReturn.map(ret => ModuleDefaultExport(ret.loc, ret)))
					return BlockDo(loc, lines)
				}
				default: throw new Error(k)
			}
		},

		_parseBlockLines = () => {
			const lines = tokens
			const objKeys = [], debugKeys = []
			let listLength = 0, mapLength = 0
			const eLines = []
			const addLine = (ln, inDebug) => {
				if (ln instanceof Array)
					ln.forEach(_ => addLine(_, inDebug))
				else {
					if (ln instanceof Debug)
						ln.lines.forEach(_ => addLine(_, true))
					else if (ln instanceof ListEntry) {
						assert(!inDebug, 'Not supported: debug list entries')
						// When ListEntries are first created they have no index.
						assert(ln.index === -1)
						ln.index = listLength
						listLength = listLength + 1
					}
					else if (ln instanceof MapEntry) {
						assert(!inDebug, 'Not supported: debug map entries')
						assert(ln.index === -1)
						ln.index = mapLength
						mapLength = mapLength + 1
					}
					else if (ln instanceof Assign && ln.k === '. ')
						(inDebug ? debugKeys : objKeys).push(ln.assignee)

					if (!inDebug)
						// Else we are adding the Debug as a single line.
						eLines.push(ln)
				}
			}
			lines.each(line => addLine(wg(line, parseLine)))

			const isObj = !(isEmpty(objKeys) && isEmpty(debugKeys))
			// TODO
			// if (isEmpty(objKeys))
			//	cx.check(isEmpty(debugKeys), loc, 'Block can't have only debug keys')
			const isBag = listLength > 0
			const isMap = mapLength > 0
			check(!(isObj && isBag), 'Block has both Bag and Obj lines.')
			check(!(isObj && isMap), 'Block has both Obj and Map lines.')
			check(!(isBag && isMap), 'Block has both Bag and Map lines.')

			const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain'
			return { eLines, kReturn, listLength, mapLength, objKeys, debugKeys }
		}

	const parseCase = (k, casedFromFun) => () => {
		const isVal = k === 'case'

		const { before, block } = takeBlockFromEnd()

		const opCased = (() => {
			if (casedFromFun) {
				checkEmpty(before,
					'Can\'t give focus to case - it is the function\'s implicit first argument.')
				return None
			}
			else return opIf(!before.isEmpty(), () =>
				w(before, () => Assign.focus(loc, parseExpr())))
		})()

		const lastLine = last(block.tokens)
		const { partLines, opElse } = Keyword.isElse(head(lastLine.tokens)) ? {
				partLines: rtail(block.tokens),
				opElse: some(w(Slice.all(lastLine.tokens).tail(), isVal ? justBlockVal : justBlockDo))
			} : {
				partLines: block.tokens,
				opElse: None
			}

		const parts = partLines.map(line => {
			const { before, block } =
				wg(line, isVal ? takeBlockValFromEnd : takeBlockDoFromEnd)
			const test = w(before, _parseCaseTest)
			return (isVal ? CaseValPart : CaseDoPart)(line.loc, test, block)
		})

		check(parts.length > 0, 'Must have at least 1 non-`else` test.')

		return (isVal ? CaseVal : CaseDo)(loc, opCased, parts, opElse)
	}
	// parseCase privates
	const
		_parseCaseTest = () => {
			const first = tokens.head()
			// Pattern match starts with type test and is followed by local declares.
			// E.g., `:Some val`
			if (Group.isSpaced(first) && tokens.size() > 1) {
				const ft = Slice.all(first.tokens)
				if (Keyword.isColon(ft.head())) {
					const type = w(ft.tail(), parseSpaced)
					const locals = w(tokens.tail(), parseLocalDeclares)
					return Pattern(first.loc, type, locals, LocalAccess.focus(loc))
				}
			}
			return parseExpr()
		}

	const
		parseExpr = () => {
			return ifElse(tokens.opSplitManyWhere(Keyword.isObjAssign),
				splits => {
					// Short object form, such as (a. 1, b. 2)
					const first = splits[0].before
					const tokensCaller = first.rtail()

					const keysVals = {}
					for (let i = 0; i < splits.length - 1; i = i + 1) {
						const local = parseLocalDeclare(splits[i].before.last())
						// Can't have got a type because there's only one token.
						assert(isEmpty(local.opType))
						const tokensValue = i === splits.length - 2 ?
							splits[i + 1].before :
							splits[i + 1].before.rtail()
						const value = w(tokensValue, parseExprPlain)
						cx.check(!Object.prototype.hasOwnProperty.call(keysVals, local.name),
							local.loc, () => `Duplicate property ${local}.`)
						Object.defineProperty(keysVals, local.name, { value })
					}
					assert(last(splits).at === undefined)
					const val = ObjSimple(loc, keysVals)
					if (tokensCaller.isEmpty())
						return val
					else {
						const parts = w(tokensCaller, parseExprParts)
						assert(!isEmpty(parts))
						return Call(loc, head(parts), push(tail(parts), val))
					}
				},
				() => parseExprPlain()
			)
		},

		parseExprParts = () => {
			const out = []
			const end = tokens.end
			for (let i = tokens.start; i < end; i = i + 1) {
				const here = tokens.data[i]
				if (here instanceof Keyword) {
					const rest = () => tokens._new(i + 1, end)
					switch (here.k) {
						case '|': case '~|':
							return push(out, w(rest(), parseFun(here.k)))
						case 'case':
							return push(out, w(rest(), parseCase('case', false)))
						case '<~':
							return push(out, Yield(loc, w(rest(), parseExpr)))
						case '<~~':
							return push(out, YieldTo(loc, w(rest(), parseExpr)))
						default:
							// fallthrough
					}
				}
				out.push(parseSingle(here))
			}
			return out
		},

		parseExprPlain = () => {
			const parts = parseExprParts()
			switch (parts.length) {
				case 0:
					return GlobalAccess.null(loc)
				case 1:
					return head(parts)
				default:
					return Call(loc, head(parts), tail(parts))
			}
		}

	const parseFun = k => () => {
		const { opReturnType, rest } = _tryTakeReturnType()
		check(!rest.isEmpty(), () => `Expected an indented block after ${code(k)}`)
		const { args, opRestArg, block, opIn, opOut } = w(rest, _funArgsAndBlock)
		// Need res declare if there is a return type or out condition.
		const opResDeclare = ifElse(opReturnType,
			rt => some(LocalDeclare.res(rt.loc, opReturnType)),
			() => opOut.map(o => LocalDeclare.res(o.loc, opReturnType)))
		return Fun(loc, k, args, opRestArg, block, opIn, opResDeclare, opOut)
	}

	// parseFun privates
	const
		_tryTakeReturnType = () => {
			if (!tokens.isEmpty()) {
				const h = tokens.head()
				if (Group.isSpaced(h) && Keyword.isColon(head(h.tokens)))
					return {
						opReturnType: some(w(Slice.all(h.tokens).tail(), parseSpaced)),
						rest: tokens.tail()
					}
			}
			return { opReturnType: None, rest: tokens }
		},

		_funArgsAndBlock = () => {
			const h = tokens.head()
			// Might be `|case`
			if (Keyword.isCaseOrCaseDo(h)) {
				const eCase = w(tokens.tail(), parseCase(h.k, true))
				const args = [ LocalDeclare.focus(h.loc) ]
				return (h.k === 'case') ?
					{
						args, opRestArg: None, opIn: None, opOut: None,
						block: BlockVal(loc, [ ], eCase)
					} :
					{
						args, opRestArg: None, opIn: None, opOut: None,
						block: BlockDo(loc, [ eCase ])
					}
			} else {
				const { before, block } = takeBlockFromEnd()
				const { args, opRestArg } = w(before, _parseFunLocals)
				const { opIn, opOut, rest } = wg(block, _tryTakeInOut)
				return { args, opRestArg, block: w(rest, parseBlockFromLines), opIn, opOut }
			}
		},

		_parseFunLocals = () => {
			if (tokens.isEmpty())
				return { args: [], opRestArg: None }
			else {
				const l = tokens.last()
				if (l instanceof DotName) {
					cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots')
					return {
						args: w(tokens.rtail(), parseLocalDeclares),
						opRestArg: some(LocalDeclare(l.loc, l.name, None, false, false))
					}
				}
				else return { args: parseLocalDeclares(), opRestArg: None }
			}
		},

		_tryTakeInOut = () => {
			const tryTakeInOrOut = (lines, inOrOut) => {
				if (!lines.isEmpty()) {
					const firstLine = lines.head()
					assert(Group.isLine(firstLine))
					const tokensFirst = Slice.all(firstLine.tokens)
					if (Keyword.is(inOrOut)(tokensFirst.head()))
						return {
							took: some(Debug(
								firstLine.loc,
								w(tokensFirst, parseLinesFromBlock))),
							rest: lines.tail()
						}
				}
				return { took: None, rest: lines }
			}

			const { took: opIn, rest: restIn } = tryTakeInOrOut(tokens, 'in')
			const { took: opOut, rest } = tryTakeInOrOut(restIn, 'out')
			return { opIn, opOut, rest }
		}

	const
		parseLine = () => {
			const h = tokens.head()
			const rest = tokens.tail()

			// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
			if (h instanceof Keyword)
				switch (h.k) {
					case '. ':
						// Index is set by parseBlock.
						return ListEntry(loc, w(rest, parseExpr), -1)
					case 'case!':
						return w(rest, parseCase('case!', false))
					case 'debug':
						return Group.isBlock(tokens.second()) ?
							// `debug`, then indented block
							Debug(loc, parseLinesFromBlock()) :
							// `debug`, then single line
							Debug(loc, w(rest, parseLineOrLines))
					case 'debugger':
						checkEmpty(rest, () => `Did not expect anything after ${h}`)
						return Special.debugger(loc)
					case 'end-loop!':
						checkEmpty(rest, () => `Did not expect anything after ${h}`)
						return EndLoop(loc)
					case 'loop!':
						return Loop(loc, w(rest, justBlockDo))
					case 'region':
						return parseLinesFromBlock()
					default:
						// fall through
				}

			return ifElse(tokens.opSplitOnceWhere(Keyword.isLineSplit),
				({ before, at, after }) => {
					return at.k === '->' ?
						_parseMapEntry(before, after) :
						_parseAssign(before, at, after)
				},
				() => parseExpr())
		},

		parseLineOrLines = () => {
			const _ = parseLine()
			return _ instanceof Array ? _ : [ _ ]
		}

	// parseLine privates
	const
		_parseAssign = (assigned, assigner, value) => {
			let locals = w(assigned, parseLocalDeclares)
			const k = assigner.k
			const eValuePre = value.isEmpty() ? GlobalAccess.true(loc) : w(value, parseExpr)

			let eValueNamed
			if (locals.length === 1) {
				const name = head(locals).name
				if (name === 'doc') {
					if (eValuePre instanceof Fun)
						// KLUDGE: `doc` for module can be a Fun signature.
						// TODO: Something better...
						eValuePre.args.forEach(arg => { arg.okToNotUse = true })
					eValueNamed = eValuePre
				}
				else
					eValueNamed = _tryAddDisplayName(eValuePre, name)
			}
			else
				eValueNamed = eValuePre

			const isYield = k === '<~' || k === '<~~'

			const eValue = _valueFromAssign(eValueNamed, k)

			if (isEmpty(locals)) {
				check(isYield, 'Assignment to nothing')
				return eValue
			}

			if (isYield)
				locals.forEach(_ =>
					cx.check(_.k !== 'lazy', _.loc, 'Can not yield to lazy variable.'))

			if (k === '. ')
				locals.forEach(l => { l.okToNotUse = true })

			if (locals.length === 1) {
				const assign = Assign(loc, locals[0], k, eValue)
				const isTest = assign.assignee.name.endsWith('test')
				return isTest && k === '. ' ? Debug(loc, [ assign ]) : assign
			}
			else {
				const isLazy = locals.some(l => l.isLazy)
				if (isLazy)
					locals.forEach(_ => cx.check(_.isLazy, _.loc,
						'If any part of destructuring assign is lazy, all must be.'))
				return AssignDestructure(loc, locals, k, eValue, isLazy)
			}
		},

		_valueFromAssign = (valuePre, kAssign) => {
			switch (kAssign) {
				case '<~':
					return Yield(valuePre.loc, valuePre)
				case '<~~':
					return YieldTo(valuePre.loc, valuePre)
				default:
					return valuePre
			}
		},

		// We give it a displayName if:
		// . It's a block
		// . It's a function
		// . It's one of those at the end of a block
		// . It's one of those as the end member of a call.
		_tryAddDisplayName = (eValuePre, displayName) => {
			switch (true) {
				case eValuePre instanceof Call && eValuePre.args.length > 0:
					// TODO: Immutable
					eValuePre.args[eValuePre.args.length - 1] =
						_tryAddDisplayName(last(eValuePre.args), displayName)
					return eValuePre

				case eValuePre instanceof Fun:
					return ObjReturn(eValuePre.loc, [], [], some(eValuePre), some(displayName))

				case eValuePre instanceof ObjReturn &&
					!eValuePre.keys.some(key => key.name === 'displayName'):
					eValuePre.opDisplayName = some(displayName)
					return eValuePre

				case eValuePre instanceof BlockWrap: {
					const block = eValuePre.block
					block.returned = _tryAddDisplayName(block.returned, displayName)
					return eValuePre
				}

				default:
					return eValuePre
			}
		},

		_parseMapEntry = (before, after) =>
			// TODO: index Filled in by ???
			MapEntry(loc, w(before, parseExpr), w(after, parseExpr), -1)

	const
		parseLocalDeclares = () => tokens.map(parseLocalDeclare),
		parseLocalDeclare = t => {
			let name
			let opType = None
			let isLazy = false

			if (Group.isSpaced(t)) {
				const tokens = Slice.all(t.tokens)
				let rest = tokens
				if (Keyword.isTilde(tokens.head())) {
					isLazy = true
					rest = tokens.tail()
				}
				name = _parseLocalName(rest.head())
				const rest2 = rest.tail()
				if (!rest2.isEmpty()) {
					const colon = rest2.head()
					cx.check(Keyword.isColon(colon), colon.loc, () => `Expected ${code(':')}`)
					check(rest2.size() > 1, () => `Expected something after ${colon}`)
					const tokensType = rest2.tail()
					opType = some(w(tokensType, parseSpaced))
				}
			}
			else
				name = _parseLocalName(t)

			return LocalDeclare(t.loc, name, opType, isLazy, false)
		}

	// parseLocalDeclare privates
	const
		_parseLocalName = t => {
			if (Keyword.isFocus(t))
				return '_'
			else {
				cx.check(t instanceof Name, t.loc, () => `Expected a local name, not ${t}`)
				// TODO: Allow this?
				cx.check(!JsGlobals.has(t.name), t.loc, () =>
					`Can not shadow global ${code(t.name)}`)
				return t.name
			}
		}

	const parseSingle = t => {
		switch (true) {
			case t instanceof Name:
				return _access(t.name)
			case t instanceof Group:
				switch (t.k) {
					case G_Space: return wg(t, parseSpaced)
					case G_Paren: return wg(t, parseExpr)
					case G_Bracket: return ListSimple(t.loc, wg(t, parseExprParts))
					case G_Block: return wg(t, blockWrap)
					case G_Quote:
						return Quote(t.loc,
							t.tokens.map(_ => (typeof _ === 'string') ? _ : parseSingle(_)))
					default:
						unexpected(t)
				}
			case t instanceof TokenNumberLiteral:
				return NumberLiteral(t.loc, t.value)
			case t instanceof CallOnFocus:
				return Call(t.loc, _access(t.name), [ LocalAccess.focus(t.loc) ])
			case t instanceof Keyword:
				if (t.k === '_')
					return LocalAccess.focus(t.loc)
				else if (SpecialKeywords.has(t.k))
					return Special(t.loc, t.k)
				else
					unexpected(t)
				break
			case t instanceof DotName:
				if (t.nDots === 3)
					return Splat(t.loc, LocalAccess(t.loc, t.name))
				else
					unexpected(t)
				break
			default:
				unexpected(t)
		}
	}
	// parseSingle privates
	const _access = name =>
		JsGlobals.has(name) ? GlobalAccess(loc, name) : LocalAccess(loc, name)

	const parseSpaced = () => {
		const h = tokens.head(), rest = tokens.tail()
		switch (true) {
			case h instanceof Keyword:
				if (h.k === ':') {
					cx.check(!Keyword.isColon(rest.head()), h.loc, () => `Two ${h} in a row`)
					const eType = w(rest, parseSpaced)
					const focus = LocalAccess.focus(h.loc)
					return Call.contains(h.loc, eType, focus)
				} else if (h.k === '~')
					return Lazy(h.loc, w(rest, parseSpaced))
			default: {
				const memberOrSubscript = (e, t) => {
					const loc = t.loc
					if (t instanceof DotName) {
						cx.check(t.nDots === 1, loc, 'Too many dots!')
						return Member(loc, e, t.name)
					} else if (t instanceof Group) {
						if (t.k === G_Bracket)
							return Call.sub(loc,
								unshift(e, wg(t, parseExprParts)))
						if (t.k === G_Paren) {
							cx.check(isEmpty(t.tokens), loc,
								() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
							return Call(loc, e, [])
						}
					} else cx.fail(loc, `Expected member or sub, not ${t}`)
				}
				return rest.reduce(memberOrSubscript, parseSingle(h))
			}
		}
	}

	const tryParseUse = k => () => {
		if (!tokens.isEmpty()) {
			const l0 = tokens.head()
			assert(Group.isLine(l0))
			if (Keyword.is(k)(head(l0.tokens)))
				return {
					uses: w(Slice.all(l0.tokens).tail(), _parseUse(k)),
					rest: tokens.tail()
				}
		}
		return { uses: [], rest: tokens }
	}

	// tryParseUse privates
	const
		_parseUse = k => () => {
			const { before, block } = takeBlockFromEnd()
			check(before.isEmpty(), () =>
				`Did not expect anything after ${code(k)} other than a block`)
			return block.tokens.map(line => {
				const tReq = line.tokens[0]
				const { path, name } = _parseRequire(tReq)
				if (k === 'use!') {
					if (line.tokens.length > 1)
						unexpected(line.tokens[1])
					return UseDo(line.loc, path)
				} else {
					const isLazy = k === 'use~' || k === 'use-debug'
					const { used, opUseDefault } =
						w(Slice.all(line.tokens).tail(), _parseThingsUsed(name, isLazy))
					return Use(line.loc, path, used, opUseDefault)
				}
			})
		},

		_useLine = k => () => {
			const tReq = tokens.head()
			const { path, name } = _parseRequire(tReq)
			if (k === 'use!') {
				check(tokens.size() === 1, () => `Unexpected ${tokens[1]}`)
				return UseDo(loc, path)
			} else {
				const isLazy = k === 'use~' || k === 'use-debug'
				const { used, opUseDefault } = w(tokens.tail(), _parseThingsUsed(name, isLazy))
				return Use(loc, path, used, opUseDefault)
			}
		},

		_parseThingsUsed = (name, isLazy) => () => {
			const useDefault = () => LocalDeclare(loc, name, None, isLazy, false)
			if (tokens.isEmpty())
				return { used: [], opUseDefault: some(useDefault()) }
			else {
				const hasDefaultUse = Keyword.isFocus(tokens.head())
				const opUseDefault = opIf(hasDefaultUse, useDefault)
				const rest = hasDefaultUse ? tokens.tail() : tokens
				const used = w(rest, parseLocalDeclares).map(l => {
					check(l.name !== '_', () => `${code('_')} not allowed as import name.`)
					l.isLazy = isLazy
					return l
				})
				return { used, opUseDefault }
			}
		},

		_parseRequire = t => {
			if (t instanceof Name)
				return { path: t.name, name: t.name }
			else if (t instanceof DotName)
				return { path: push(_partsFromDotName(t), t.name).join('/'), name: t.name }
			else {
				check(Group.isSpaced(t), 'Not a valid module name.')
				return wg(t, _parseLocalRequire)
			}
		},

		_parseLocalRequire = () => {
			const first = tokens.head()
			let parts
			if (first instanceof DotName)
				parts = _partsFromDotName(first)
			else {
				cx.check(first instanceof Name, first.loc, 'Not a valid part of module path.')
				parts = [ ]
			}
			parts.push(first.name)
			tokens.tail().each(t => {
				cx.check(t instanceof DotName && t.nDots === 1, t.loc,
					'Not a valid part of module path.')
				parts.push(t.name)
			})
			return {
				path: parts.join('/'),
				name: tokens.last().name
			}
		},

		_partsFromDotName = dotName =>
			dotName.nDots === 1 ? [ '.' ] : repeat('..', dotName.nDots - 1)

	return parseModule()
}
