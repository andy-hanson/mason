import Loc from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { Assign, AssignDestructure, BlockDo, BlockVal, BlockWrap, Call, CaseDoPart, CaseValPart,
	CaseDo, CaseVal, Debug, NumberLiteral, EndLoop, Fun, GlobalAccess, Lazy, ListEntry, ListReturn,
	ListSimple, LocalAccess, LocalDeclare, LocalDeclare, Loop, MapEntry, MapReturn, Member, Module,
	ModuleDefaultExport, ObjPair, ObjReturn, ObjSimple, Pattern, Quote, Special, Splat, Val, Use,
	UseDo, Yield, YieldTo } from '../../Expression'
import { JsGlobals } from '../Lang'
import { CallOnFocus, DotName, Group, G_Block, G_Bracket,
	G_Paren, G_Space, G_Quote, Keyword, TokenNumberLiteral, Name, opKWtoSP,
	KW_Case, KW_CaseDo, KW_Debug, KW_Debugger, KW_EndLoop, KW_Focus, KW_Fun, KW_GenFun, KW_In,
	KW_Loop, KW_MapEntry, KW_ObjAssign, KW_Out, KW_Region, KW_Use, KW_UseDebug, KW_UseDo,
	KW_UseLazy, KW_Yield, KW_YieldTo } from '../Token'
import { cat, head, flatMap, isEmpty, last, push, repeat, rtail, tail, unshift } from '../U/Bag'
import { ifElse, None, opIf, some } from '../U/Op'
import { assert } from '../U/util'
import Slice from './Slice'

let cx

export default function parse(_cx, rootToken) {
	cx = _cx
	assert(Group.isBlock(rootToken))
	return parseModule(Slice.group(rootToken))
}

const
	checkEmpty = (tokens, message) =>
		cx.check(tokens.isEmpty(), tokens.loc, message),
	checkNonEmpty = (tokens, message) =>
		cx.check(!tokens.isEmpty(), tokens.loc, message),
	unexpected = t => cx.fail(t.loc, `Unexpected ${t}`)

const parseModule = tokens => {
	// tryParseUses moves tokens forward
	const [ doUses, rest0 ] = tryParseUses(KW_UseDo, tokens)
	const [ plainUses, rest1 ] = tryParseUses(KW_Use, rest0)
	const [ lazyUses, rest2 ] = tryParseUses(KW_UseLazy, rest1)
	const [ debugUses, rest3 ] = tryParseUses(KW_UseDebug, rest2)
	const block = parseModuleBody(rest3)
	block.lines.forEach(line => {
		if (line instanceof Assign && line.k === 'export')
			cx.check(line.assignee.name !== 'displayName', line.assignee.loc,
				'Module can not choose its own displayName.')
	})
	if (cx.opts.moduleDisplayName())
		block.lines.push(
			Assign(
				tokens.loc,
				LocalDeclare(tokens.loc, 'displayName', [], false, true),
				'export',
				Quote.forString(tokens.loc, cx.opts.moduleName())))

	const uses = plainUses.concat(lazyUses)
	return Module(tokens.loc, doUses, uses, debugUses, block)
}

// parseBlock
const
	// Tokens on the line before a block, and tokens for the block itself.
	beforeAndBlock = tokens => {
		checkNonEmpty(tokens, 'Expected an indented block.')
		const block = tokens.last()
		cx.check(Group.isBlock(block), block.loc, 'Expected an indented block.')
		return [ tokens.rtail(), Slice.group(block) ]
	},

	blockWrap = tokens => BlockWrap(tokens.loc, _parseBlockBody('val', tokens)),

	justBlockDo = tokens => parseBodyDo(_justBlock(tokens)),
	justBlockVal = tokens => parseBodyVal(_justBlock(tokens)),

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = tokens => _parseBlockBody('module', tokens),

	parseBlockFromLines = tokens => _parseBlockBody('any', tokens),

	// Gets lines in a region or Debug.
	parseLinesFromBlock = tokens => {
		const h = tokens.head()
		cx.check(tokens.size() > 1, h.loc, () => `Expected indented block after ${h}`)
		const block = tokens.second()
		assert(tokens.size() === 2 && Group.isBlock(block))
		return flatMap(block.tokens, line => parseLineOrLines(Slice.group(line)))
	},

	parseBodyDo = tokens => {
		const { eLines, kReturn } = _parseBlockLines(tokens)
		cx.check(kReturn === 'plain', tokens.loc,
			() => `Can not make ${kReturn} in statement context.`)
		return BlockDo(tokens.loc, eLines)
	},
	parseBodyVal = tokens => _parseBlockBody('val', tokens)

// parseBlock privates
const
	_justBlock = tokens => {
		const [ before, block ] = beforeAndBlock(tokens)
		checkEmpty(before, 'Expected just a block.')
		return block
	},

	_parseBlockBody = (k, tokens) => {
		assert(k === 'val' || k === 'module' || k === 'any')

		// keys only matter if kReturn === 'obj'
		const { eLines, kReturn, objKeys, debugKeys } = _parseBlockLines(tokens)

		const { doLines, opReturn } = (() => {
			if (kReturn === 'bag')
				return {
					doLines: eLines,
					opReturn: some(ListReturn(tokens.loc))
				}
			if (kReturn === 'map')
				return {
					doLines: eLines,
					opReturn: some(MapReturn(tokens.loc))
				}

			const lastReturn = !isEmpty(eLines) && last(eLines) instanceof Val
			if (kReturn === 'obj' && k !== 'module')
				return lastReturn ?
					{
						doLines: rtail(eLines),
						opReturn: some(ObjReturn(
							tokens.loc,
							objKeys,
							debugKeys,
							some(last(eLines)),
							// displayName is filled in by parseAssign.
							None))
					} : {
						doLines: eLines,
						opReturn: some(ObjReturn(
							tokens.loc,
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
					returned => BlockVal(tokens.loc, doLines, returned),
					() => cx.fail(tokens.loc, 'Expected a value block.'))
			case 'any':
				return ifElse(opReturn,
					returned => BlockVal(tokens.loc, doLines, returned),
					() => BlockDo(tokens.loc, doLines))
			case 'module': {
				// TODO: Handle debug-only exports
				const lines =
					// Turn Obj assigns into exports.
					cat(
						doLines.map(line => {
							if (line instanceof Assign && line.k === KW_ObjAssign)
								line.k = 'export'
							return line
						}),
						opReturn.map(ret => ModuleDefaultExport(ret.loc, ret)))
				return BlockDo(tokens.loc, lines)
			}
			default: throw new Error(k)
		}
	},

	_parseBlockLines = lines => {
		const objKeys = [], debugKeys = []
		const eLines = []
		let isBag = false, isMap = false
		const addLine = (ln, inDebug) => {
			if (ln instanceof Array)
				ln.forEach(_ => addLine(_, inDebug))
			else {
				if (ln instanceof Debug)
					ln.lines.forEach(_ => addLine(_, true))
				else if (ln instanceof ListEntry) {
					assert(!inDebug, 'Not supported: debug list entries')
					isBag = true
				} else if (ln instanceof MapEntry) {
					assert(!inDebug, 'Not supported: debug map entries')
					isMap = true
				} else if (ln instanceof Assign && ln.k === KW_ObjAssign)
					(inDebug ? debugKeys : objKeys).push(ln.assignee)

				if (!inDebug)
					// Else we are adding the Debug as a single line.
					eLines.push(ln)
			}
		}
		lines.each(line => addLine(parseLine(Slice.group(line))))

		const isObj = !(isEmpty(objKeys) && isEmpty(debugKeys))
		// TODO
		// if (isEmpty(objKeys))
		//	cx.check(isEmpty(debugKeys), lines.loc, 'Block can't have only debug keys')
		cx.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.')
		cx.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.')
		cx.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.')

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain'
		return { eLines, kReturn, objKeys, debugKeys }
	}

const parseCase = (k, casedFromFun, tokens) => {
	const isVal = k === KW_Case

	const [ before, block ] = beforeAndBlock(tokens)

	let opCased
	if (casedFromFun) {
		checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.')
		opCased = None
	} else
		opCased = opIf(!before.isEmpty(), () => Assign.focus(before.loc, parseExpr(before)))

	const lastLine = Slice.group(block.last())
	const [ partLines, opElse ] = Keyword.isElse(lastLine.head()) ?
		[ block.rtail(), some((isVal ? justBlockVal : justBlockDo)(lastLine.tail())) ] :
		[ block, None ]

	const parts = partLines.map(line => {
		line = Slice.group(line)
		const [ before, block ] = beforeAndBlock(line)
		const test = _parseCaseTest(before)
		const result = (isVal ? parseBodyVal : parseBodyDo)(block)
		return (isVal ? CaseValPart : CaseDoPart)(line.loc, test, result)
	})
	cx.check(parts.length > 0, tokens.loc, 'Must have at least 1 non-`else` test.')

	return (isVal ? CaseVal : CaseDo)(tokens.loc, opCased, parts, opElse)
}
// parseCase privates
const
	_parseCaseTest = tokens => {
		const first = tokens.head()
		// Pattern match starts with type test and is followed by local declares.
		// E.g., `:Some val`
		if (Group.isSpaced(first) && tokens.size() > 1) {
			const ft = Slice.group(first)
			if (Keyword.isType(ft.head())) {
				const type = parseSpaced(ft.tail())
				const locals = parseLocalDeclares(tokens.tail())
				return Pattern(first.loc, type, locals, LocalAccess.focus(tokens.loc))
			}
		}
		return parseExpr(tokens)
	}

const
	parseExpr = tokens => {
		return ifElse(tokens.opSplitManyWhere(Keyword.isObjAssign),
			splits => {
				// Short object form, such as (a. 1, b. 2)
				const first = splits[0].before
				const tokensCaller = first.rtail()

				const pairs = [ ]
				for (let i = 0; i < splits.length - 1; i = i + 1) {
					const name = splits[i].before.last()
					cx.check(name instanceof Name, name.loc, () => `Expected a name, not ${name}`)
					const tokensValue = i === splits.length - 2 ?
						splits[i + 1].before :
						splits[i + 1].before.rtail()
					const value = parseExprPlain(tokensValue)
					const loc = Loc(name.loc.start, tokensValue.loc.end)
					pairs.push(ObjPair(loc, name.name, value))
				}
				assert(last(splits).at === undefined)
				const val = ObjSimple(tokens.loc, pairs)
				if (tokensCaller.isEmpty())
					return val
				else {
					const parts = parseExprParts(tokensCaller)
					return Call(tokens.loc, head(parts), push(tail(parts), val))
				}
			},
			() => parseExprPlain(tokens)
		)
	},

	parseExprParts = tokens => {
		const out = []
		for (let i = tokens.start; i < tokens.end; i = i + 1) {
			const here = tokens.data[i]
			if (here instanceof Keyword) {
				const rest = () => tokens._chopStart(i + 1)
				switch (here.k) {
					case KW_Fun: case KW_GenFun:
						return push(out, parseFun(here.k === KW_GenFun, rest()))
					case KW_Case:
						return push(out, parseCase(KW_Case, false, rest()))
					case KW_Yield:
						return push(out, Yield(tokens.loc, parseExpr(rest())))
					case KW_YieldTo:
						return push(out, YieldTo(tokens.loc, parseExpr(rest())))
					default:
						// fallthrough
				}
			}
			out.push(parseSingle(here))
		}
		return out
	},

	parseExprPlain = tokens => {
		const parts = parseExprParts(tokens)
		switch (parts.length) {
			case 0:
				return GlobalAccess.null(tokens.loc)
			case 1:
				return head(parts)
			default:
				return Call(tokens.loc, head(parts), tail(parts))
		}
	}

const parseFun = (isGenerator, tokens) => {
	const { opReturnType, rest } = _tryTakeReturnType(tokens)
	checkNonEmpty(rest, () => `Expected an indented block.`)
	const { args, opRestArg, block, opIn, opOut } = _funArgsAndBlock(rest)
	// Need res declare if there is a return type or out condition.
	const opResDeclare = ifElse(opReturnType,
		rt => some(LocalDeclare.res(rt.loc, opReturnType)),
		() => opOut.map(o => LocalDeclare.res(o.loc, opReturnType)))
	return Fun(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut)
}

// parseFun privates
const
	_tryTakeReturnType = tokens => {
		if (!tokens.isEmpty()) {
			const h = tokens.head()
			if (Group.isSpaced(h) && Keyword.isType(head(h.tokens)))
				return {
					opReturnType: some(parseSpaced(Slice.group(h).tail())),
					rest: tokens.tail()
				}
		}
		return { opReturnType: None, rest: tokens }
	},

	_funArgsAndBlock = tokens => {
		const h = tokens.head()
		// Might be `|case`
		if (h instanceof Keyword && (h.k === KW_Case || h.k === KW_CaseDo)) {
			const eCase = parseCase(h.k, true, tokens.tail())
			const args = [ LocalDeclare.focus(h.loc) ]
			return h.k === KW_Case ?
				{
					args, opRestArg: None, opIn: None, opOut: None,
					block: BlockVal(tokens.loc, [ ], eCase)
				} :
				{
					args, opRestArg: None, opIn: None, opOut: None,
					block: BlockDo(tokens.loc, [ eCase ])
				}
		} else {
			const [ before, block ] = beforeAndBlock(tokens)
			const { args, opRestArg } = _parseFunLocals(before)
			const [ opIn, rest0 ] = _tryTakeInOrOut(KW_In, block)
			const [ opOut, rest1 ] = _tryTakeInOrOut(KW_Out, rest0)
			return { args, opRestArg, block: parseBlockFromLines(rest1), opIn, opOut }
		}
	},

	_parseFunLocals = tokens => {
		if (tokens.isEmpty())
			return { args: [], opRestArg: None }
		else {
			const l = tokens.last()
			if (l instanceof DotName) {
				cx.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots')
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: some(LocalDeclare(l.loc, l.name, None, false, false))
				}
			}
			else return { args: parseLocalDeclares(tokens), opRestArg: None }
		}
	},

	_tryTakeInOrOut = (inOrOut, tokens) => {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head()
			if (Keyword.is(inOrOut)(head(firstLine.tokens))) {
				const inOut = Debug(
					firstLine.loc,
					parseLinesFromBlock(Slice.group(firstLine)))
				return [ some(inOut), tokens.tail() ]
			}
		}
		return [ None, tokens ]
	}

const
	parseLine = tokens => {
		const h = tokens.head()
		const rest = tokens.tail()

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (h instanceof Keyword)
			switch (h.k) {
				case KW_ObjAssign:
					// Index is set by parseBlock.
					return ListEntry(tokens.loc, parseExpr(rest), -1)
				case KW_CaseDo:
					return parseCase(KW_CaseDo, false, rest)
				case KW_Debug:
					return Debug(tokens.lok,
						Group.isBlock(tokens.second()) ?
						// `debug`, then indented block
						parseLinesFromBlock() :
						// `debug`, then single line
						parseLineOrLines(rest))
				case KW_Debugger:
					checkEmpty(rest, () => `Did not expect anything after ${h}`)
					return Special.debugger(tokens.loc)
				case KW_EndLoop:
					checkEmpty(rest, () => `Did not expect anything after ${h}`)
					return EndLoop(tokens.loc)
				case KW_Loop:
					return Loop(tokens.loc, justBlockDo(rest))
				case KW_Region:
					return parseLinesFromBlock(tokens)
				default:
					// fall through
			}

		return ifElse(tokens.opSplitOnceWhere(Keyword.isLineSplit),
			({ before, at, after }) => {
				return at.k === KW_MapEntry ?
					_parseMapEntry(before, after, tokens.loc) :
					_parseAssign(before, at, after, tokens.loc)
			},
			() => parseExpr(tokens))
	},

	parseLineOrLines = tokens => {
		const _ = parseLine(tokens)
		return _ instanceof Array ? _ : [ _ ]
	}

// parseLine privates
const
	_parseAssign = (assigned, assigner, value, loc) => {
		let locals = parseLocalDeclares(assigned)
		const k = assigner.k
		const eValuePre = value.isEmpty() ? GlobalAccess.true(value.loc) : parseExpr(value)

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

		const isYield = k === KW_Yield || k === KW_YieldTo

		const eValue = _valueFromAssign(eValueNamed, k)

		if (isEmpty(locals)) {
			cx.check(isYield, assigned.loc, 'Assignment to nothing')
			return eValue
		}

		if (isYield)
			locals.forEach(_ =>
				cx.check(!_.isLazy, _.loc, 'Can not yield to lazy variable.'))

		if (k === KW_ObjAssign)
			locals.forEach(l => { l.okToNotUse = true })

		if (locals.length === 1) {
			const assign = Assign(loc, locals[0], k, eValue)
			const isTest = assign.assignee.name.endsWith('test')
			return isTest && k === KW_ObjAssign ? Debug(loc, [ assign ]) : assign
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
			case KW_Yield:
				return Yield(valuePre.loc, valuePre)
			case KW_YieldTo:
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

	_parseMapEntry = (before, after, loc) =>
		// TODO: index Filled in by ???
		MapEntry(loc, parseExpr(before), parseExpr(after), -1)

const
	parseLocalDeclares = tokens => tokens.map(parseLocalDeclare),
	parseLocalDeclare = t => {
		let name
		let opType = None
		let isLazy = false

		if (Group.isSpaced(t)) {
			const tokens = Slice.group(t)
			let rest = tokens
			if (Keyword.isLazy(tokens.head())) {
				isLazy = true
				rest = tokens.tail()
			}
			name = _parseLocalName(rest.head())
			const rest2 = rest.tail()
			if (!rest2.isEmpty()) {
				const colon = rest2.head()
				cx.check(Keyword.isType(colon), colon.loc, () => `Expected ${code(':')}`)
				const tokensType = rest2.tail()
				checkNonEmpty(tokensType, () => `Expected something after ${colon}`)
				opType = some(parseSpaced(tokensType))
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
			return _access(t.name, t.loc)
		case t instanceof Group:
			switch (t.k) {
				case G_Space: return parseSpaced(Slice.group(t))
				case G_Paren: return parseExpr(Slice.group(t))
				case G_Bracket: return ListSimple(t.loc, parseExprParts(Slice.group(t)))
				case G_Block: return blockWrap(Slice.group(t))
				case G_Quote:
					return Quote(t.loc,
						t.tokens.map(_ => (typeof _ === 'string') ? _ : parseSingle(_)))
				default:
					unexpected(t)
			}
		case t instanceof TokenNumberLiteral:
			return NumberLiteral(t.loc, t.value)
		case t instanceof CallOnFocus:
			return Call(t.loc, _access(t.name, t.loc), [ LocalAccess.focus(t.loc) ])
		case t instanceof Keyword:
			if (t.k === KW_Focus)
				return LocalAccess.focus(t.loc)
			else {
				const sp = opKWtoSP(t.k)
				if (sp === undefined)
					unexpected(t)
				else
					return Special(t.loc, sp)
			}
		case t instanceof DotName:
			if (t.nDots === 3)
				return Splat(t.loc, LocalAccess(t.loc, t.name))
			else
				unexpected(t)
		default:
			unexpected(t)
	}
}
// parseSingle privates
const _access = (name, loc) =>
	JsGlobals.has(name) ? GlobalAccess(loc, name) : LocalAccess(loc, name)

const parseSpaced = tokens => {
	const h = tokens.head(), rest = tokens.tail()
	if (Keyword.isType(h)) {
		const eType = parseSpaced(rest)
		const focus = LocalAccess.focus(h.loc)
		return Call.contains(h.loc, eType, focus)
	} else if (Keyword.isLazy(h))
		return Lazy(h.loc, parseSpaced(rest))
	else {
		const memberOrSubscript = (e, t) => {
			const loc = t.loc
			if (t instanceof DotName) {
				cx.check(t.nDots === 1, tokens.loc, 'Too many dots!')
				return Member(tokens.loc, e, t.name)
			} else if (t instanceof Group) {
				if (t.k === G_Bracket)
					return Call.sub(loc,
						unshift(e, parseExprParts(Slice.group(t))))
				if (t.k === G_Paren) {
					checkEmpty(Slice.group(t),
						() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
					return Call(tokens.loc, e, [])
				}
			} else cx.fail(tokens.loc, `Expected member or sub, not ${t}`)
		}
		return rest.reduce(memberOrSubscript, parseSingle(h))
	}
}

const tryParseUses = (k, tokens) => {
	if (!tokens.isEmpty()) {
		const line0 = Slice.group(tokens.head())
		if (Keyword.is(k)(line0.head()))
			return [ _parseUses(k, line0.tail()), tokens.tail() ]
	}
	return [ [ ], tokens ]
}

// tryParseUse privates
const
	_parseUses = (k, tokens) => {
		const [ before, lines ] = beforeAndBlock(tokens)
		checkEmpty(before, () =>`Did not expect anything after ${code(k)} other than a block`)
		return lines.map(line => {
			const tReq = line.tokens[0]
			const { path, name } = _parseRequire(tReq)
			if (k === KW_UseDo) {
				if (line.tokens.length > 1)
					unexpected(line.tokens[1])
				return UseDo(line.loc, path)
			} else {
				const isLazy = k === KW_UseLazy || k === KW_UseDebug
				const { used, opUseDefault } =
					_parseThingsUsed(name, isLazy, Slice.group(line).tail())
				return Use(line.loc, path, used, opUseDefault)
			}
		})
	},

	_parseThingsUsed = (name, isLazy, tokens) => {
		const useDefault = () => LocalDeclare(tokens.loc, name, None, isLazy, false)
		if (tokens.isEmpty())
			return { used: [], opUseDefault: some(useDefault()) }
		else {
			const hasDefaultUse = Keyword.isFocus(tokens.head())
			const opUseDefault = opIf(hasDefaultUse, useDefault)
			const rest = hasDefaultUse ? tokens.tail() : tokens
			const used = parseLocalDeclares(rest).map(l => {
				cx.check(l.name !== '_', l.pos,
					() => `${code('_')} not allowed as import name.`)
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
			cx.check(Group.isSpaced(t), t.loc, 'Not a valid module name.')
			return _parseLocalRequire(Slice.group(t))
		}
	},

	_parseLocalRequire = tokens => {
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
