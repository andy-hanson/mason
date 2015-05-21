import Loc from 'esast/dist/Loc'
import tupl from 'tupl/dist/tupl'
import { code } from '../../CompileError'
import { Assign, AssignDestructure, AssignMutate, BagEntry, BagSimple, BlockBag, BlockDo, BlockMap,
	BlockObj, BlockWithReturn, BlockWrap, BreakDo, Call, CaseDoPart, CaseValPart, CaseDo, CaseVal,
	Debug, Do, NumberLiteral, ForDoPlain, ForDoWithBag, Fun, GlobalAccess, IfDo, Lazy, LD_Const,
	LD_Lazy, LD_Mutable, LocalAccess, LocalDeclare, LocalDeclareRes, MapEntry, Member, Module,
	ObjPair, ObjSimple, Pattern, Quote, SP_Debugger, SpecialDo, SpecialVal, SV_Null, Splat, Val,
	UnlessDo, Use, UseDo, Yield, YieldTo } from '../../MsAst'
import { JsGlobals } from '../language'
import { CallOnFocus, DotName, Group, G_Block, G_Bracket, G_Parenthesis, G_Space, G_Quote, isGroup,
	isKeyword, Keyword, KW_Assign, KW_AssignMutable, KW_AssignMutate, KW_BreakDo, KW_Case,
	KW_CaseDo, KW_Debug, KW_Debugger, KW_Else, KW_ForDo, KW_Focus, KW_Fun, KW_GenFun, KW_IfDo,
	KW_In, KW_Lazy, KW_MapEntry, KW_ObjAssign, KW_Pass, KW_Out, KW_Region, KW_Type, KW_UnlessDo,
	KW_Use, KW_UseDebug, KW_UseDo, KW_UseLazy, KW_Yield, KW_YieldTo, Name, opKWtoSV,
	TokenNumberLiteral } from '../Token'
import { assert, head, ifElse, flatMap, isEmpty, last,
	opIf, opMap, push, repeat, rtail, tail, unshift } from '../util'
import Slice from './Slice'

let context

const WithObjKeys = tupl('WithObjKeys', Object,
	'Wraps an Do with keys for this block\'s Obj. Not meant to escape this file.',
	[ 'keys', [LocalDeclare], 'line', Do])

export default (_context, rootToken) => {
	context = _context
	assert(isGroup(G_Block, rootToken))
	return parseModule(Slice.group(rootToken))
}

const
	checkEmpty = (tokens, message) =>
		context.check(tokens.isEmpty(), tokens.loc, message),
	checkNonEmpty = (tokens, message) =>
		context.check(!tokens.isEmpty(), tokens.loc, message),
	unexpected = t => context.fail(t.loc, `Unexpected ${t.show()}`)

const parseModule = tokens => {
	const [ doUses, rest0 ] = tryParseUses(KW_UseDo, tokens)
	const [ plainUses, rest1 ] = tryParseUses(KW_Use, rest0)
	const [ lazyUses, rest2 ] = tryParseUses(KW_UseLazy, rest1)
	const [ debugUses, rest3 ] = tryParseUses(KW_UseDebug, rest2)
	const { lines, exports, opDefaultExport } = parseModuleBlock(rest3)

	if (context.opts.includeModuleName() && !exports.some(_ => _.name === 'name')) {
		const dn = LocalDeclare.declareName(tokens.loc)
		lines.push(Assign(tokens.loc, dn,
			Quote.forString(tokens.loc, context.opts.moduleName())))
		exports.push(dn)
	}
	const uses = plainUses.concat(lazyUses)
	return Module(tokens.loc, doUses, uses, debugUses, lines, exports, opDefaultExport)
}

// parseBlock
const
	// Tokens on the line before a block, and tokens for the block itself.
	beforeAndBlock = tokens => {
		checkNonEmpty(tokens, 'Expected an indented block.')
		const block = tokens.last()
		context.check(isGroup(G_Block, block), block.loc, 'Expected an indented block.')
		return [ tokens.rtail(), Slice.group(block) ]
	},

	blockWrap = tokens => BlockWrap(tokens.loc, parseBlockVal(tokens)),

	justBlockDo = tokens => parseBlockDo(_justBlock(tokens)),
	justBlockVal = tokens => parseBlockVal(_justBlock(tokens)),

	// Gets lines in a region or Debug.
	parseLinesFromBlock = tokens => {
		const h = tokens.head()
		context.check(tokens.size() > 1, h.loc, () => `Expected indented block after ${h.show()}`)
		const block = tokens.second()
		assert(tokens.size() === 2 && isGroup(G_Block, block))
		return flatMap(block.tokens, line => parseLineOrLines(Slice.group(line)))
	},

	parseBlockDo = tokens => {
		// OK if last line is a Val, we'll just treat it as a Do.
		const { allLines, kReturn } = _parseBlockLines(tokens)
		context.check(kReturn === KReturn_Plain, tokens.loc,
			() => `Can not make ${kReturn} in statement context.`)
		return BlockDo(tokens.loc, allLines)
	},
	parseBlockVal = tokens => {
		const block = parseAnyBlock(tokens)
		context.check(!(block instanceof BlockDo), block.loc, 'Expected a value block.')
		return block
	},

	parseModuleBlock = tokens => {
		const { allLines, kReturn, objKeys: exports } = _parseBlockLines(tokens)
		const loc = tokens.loc
		switch (kReturn) {
			case KReturn_Bag: case KReturn_Map: {
				const ctr = kReturn === KReturn_Bag ? BlockBag : BlockMap
				return { lines: [ ], exports, opDefaultExport: BlockWrap(loc, ctr(loc, allLines)) }
			}
			default:
				const { lines, opVal: opDefaultExport } = _tryTakeLastVal(allLines)
				return { lines, exports, opDefaultExport }
		}
	},

	parseAnyBlock = tokens => {
		const { allLines, kReturn, objKeys } = _parseBlockLines(tokens)
		switch (kReturn) {
			case KReturn_Bag:
				return BlockBag(tokens.loc, allLines)
			case KReturn_Map:
				return BlockMap(tokens.loc, allLines)
			default:
				const { lines, opVal } = _tryTakeLastVal(allLines)
				return kReturn === KReturn_Obj ?
					BlockObj(tokens.loc, lines, objKeys, opVal, null) :
					ifElse(opVal,
						_ => BlockWithReturn(tokens.loc, lines, _),
						() => BlockDo(tokens.loc, lines))
		}
	}

// parseBlock privates
const
	_justBlock = tokens => {
		const [ before, block ] = beforeAndBlock(tokens)
		checkEmpty(before, 'Expected just a block.')
		return block
	},

	_tryTakeLastVal = lines =>
		(!isEmpty(lines) && last(lines) instanceof Val) ?
			{ lines: rtail(lines), opVal: last(lines) } :
			{ lines, opVal: null },

	KReturn_Plain = 0,
	KReturn_Obj = 1,
	KReturn_Bag = 2,
	KReturn_Map = 3,
	_parseBlockLines = lines => {
		const objKeys = [ ]
		let isBag = false, isMap = false
		const checkLine = (line, inDebug) => {
			if (line instanceof Debug)
				line.lines.forEach(_ => checkLine(_, true))
			else if (line instanceof BagEntry) {
				context.check(!inDebug, line.loc, 'Not supported: debug list entries')
				isBag = true
			} else if (line instanceof MapEntry) {
				context.check(!inDebug, line.loc, 'Not supported: debug map entries')
				isMap = true
			} else if (line instanceof WithObjKeys)
				objKeys.push(...line.keys)
		}
		const allLines = [ ]
		const addLine = line => {
			if (line instanceof Array)
				line.forEach(addLine)
			else {
				checkLine(line, false)
				allLines.push(line instanceof WithObjKeys ? line.line : line)
			}
		}
		lines.each(_ => addLine(parseLine(Slice.group(_))))

		const isObj = !isEmpty(objKeys)
		context.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.')
		context.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.')
		context.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.')

		const kReturn =
			isObj ? KReturn_Obj : isBag ? KReturn_Bag : isMap ? KReturn_Map : KReturn_Plain
		return { allLines, kReturn, objKeys }
	}

const parseCase = (k, casedFromFun, tokens) => {
	const isVal = k === KW_Case

	const [ before, block ] = beforeAndBlock(tokens)

	let opCased
	if (casedFromFun) {
		checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.')
		opCased = null
	} else
		opCased = opIf(!before.isEmpty(), () => Assign.focus(before.loc, parseExpr(before)))

	const lastLine = Slice.group(block.last())
	const [ partLines, opElse ] = isKeyword(KW_Else, lastLine.head()) ?
		[ block.rtail(), (isVal ? justBlockVal : justBlockDo)(lastLine.tail()) ] :
		[ block, null ]

	const parts = partLines.map(line => {
		line = Slice.group(line)
		const [ before, block ] = beforeAndBlock(line)
		const test = _parseCaseTest(before)
		const result = (isVal ? parseBlockVal : parseBlockDo)(block)
		return (isVal ? CaseValPart : CaseDoPart)(line.loc, test, result)
	})
	context.check(parts.length > 0, tokens.loc, 'Must have at least 1 non-`else` test.')

	return (isVal ? CaseVal : CaseDo)(tokens.loc, opCased, parts, opElse)
}
// parseCase privates
const
	_parseCaseTest = tokens => {
		const first = tokens.head()
		// Pattern match starts with type test and is followed by local declares.
		// E.g., `:Some val`
		if (isGroup(G_Space, first) && tokens.size() > 1) {
			const ft = Slice.group(first)
			if (isKeyword(KW_Type, ft.head())) {
				const type = parseSpaced(ft.tail())
				const locals = parseLocalDeclares(tokens.tail())
				return Pattern(first.loc, type, locals, LocalAccess.focus(tokens.loc))
			}
		}
		return parseExpr(tokens)
	}

const
	parseExpr = tokens => {
		return ifElse(tokens.opSplitManyWhere(_ => isKeyword(KW_ObjAssign, _)),
			splits => {
				// Short object form, such as (a. 1, b. 2)
				const first = splits[0].before
				checkNonEmpty(first, () => `Unexpected ${splits[0].at.show()}`)
				const tokensCaller = first.rtail()

				const pairs = [ ]
				for (let i = 0; i < splits.length - 1; i = i + 1) {
					const name = splits[i].before.last()
					context.check(name instanceof Name, name.loc, () =>
						`Expected a name, not ${name.show()}`)
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
				switch (here.kind) {
					case KW_Fun: case KW_GenFun:
						return push(out, parseFun(here.kind === KW_GenFun, rest()))
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
				context.fail(tokens.loc, 'Expected an expression, got nothing.')
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
	args.forEach(arg => {
		if (!arg.isLazy())
			arg.kind = LD_Mutable
	})
	// Need res declare if there is a return type or out condition.
	const opResDeclare = ifElse(opReturnType,
		_ => LocalDeclareRes(_.loc, _),
		() => opMap(opOut, o => LocalDeclareRes(o.loc, null)))
	return Fun(tokens.loc, isGenerator, args, opRestArg, block, opIn, opResDeclare, opOut)
}

// parseFun privates
const
	_tryTakeReturnType = tokens => {
		if (!tokens.isEmpty()) {
			const h = tokens.head()
			if (isGroup(G_Space, h) && isKeyword(KW_Type, head(h.tokens)))
				return {
					opReturnType: parseSpaced(Slice.group(h).tail()),
					rest: tokens.tail()
				}
		}
		return { opReturnType: null, rest: tokens }
	},

	_funArgsAndBlock = tokens => {
		const h = tokens.head()
		// Might be `|case`
		if (h instanceof Keyword && (h.kind === KW_Case || h.kind === KW_CaseDo)) {
			const eCase = parseCase(h.kind, true, tokens.tail())
			const args = [ LocalDeclare.focus(h.loc) ]
			return h.kind === KW_Case ?
				{
					args, opRestArg: null, opIn: null, opOut: null,
					block: BlockWithReturn(tokens.loc, [ ], eCase)
				} :
				{
					args, opRestArg: null, opIn: null, opOut: null,
					block: BlockDo(tokens.loc, [ eCase ])
				}
		} else {
			const [ before, block ] = beforeAndBlock(tokens)
			const { args, opRestArg } = _parseFunLocals(before)
			const [ opIn, rest0 ] = _tryTakeInOrOut(KW_In, block)
			const [ opOut, rest1 ] = _tryTakeInOrOut(KW_Out, rest0)
			return { args, opRestArg, block: parseAnyBlock(rest1), opIn, opOut }
		}
	},

	_parseFunLocals = tokens => {
		if (tokens.isEmpty())
			return { args: [], opRestArg: null }
		else {
			const l = tokens.last()
			if (l instanceof DotName) {
				context.check(l.nDots === 3, l.loc, 'Splat argument must have exactly 3 dots')
				return {
					args: parseLocalDeclares(tokens.rtail()),
					opRestArg: LocalDeclare.plain(l.loc, l.name)
				}
			}
			else return { args: parseLocalDeclares(tokens), opRestArg: null }
		}
	},

	_tryTakeInOrOut = (inOrOut, tokens) => {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head()
			if (isKeyword(inOrOut, head(firstLine.tokens))) {
				const inOut = Debug(
					firstLine.loc,
					parseLinesFromBlock(Slice.group(firstLine)))
				return [ inOut, tokens.tail() ]
			}
		}
		return [ null, tokens ]
	}

const
	parseLine = tokens => {
		const head = tokens.head()
		const rest = tokens.tail()

		const noRest = () =>
			checkEmpty(rest, () => `Did not expect anything after ${head.show()}`)

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (head instanceof Keyword)
			switch (head.kind) {
				case KW_CaseDo:
					return parseCase(KW_CaseDo, false, rest)
				case KW_Debug:
					return Debug(tokens.lok,
						isGroup(G_Block, tokens.second()) ?
						// `debug`, then indented block
						parseLinesFromBlock() :
						// `debug`, then single line
						parseLineOrLines(rest))
				case KW_Debugger:
					noRest()
					return SpecialDo(tokens.loc, SP_Debugger)
				case KW_BreakDo:
					noRest()
					return BreakDo(tokens.loc)
				case KW_IfDo: case KW_UnlessDo: {
					const [ before, block ] = beforeAndBlock(rest)
					const ctr = head.kind === KW_IfDo ? IfDo : UnlessDo
					return ctr(tokens.loc, parseExpr(before), parseBlockDo(block))
				}
				case KW_ForDo:
					return parseFor(rest)
				case KW_ObjAssign:
					// Index is set by parseBlock.
					return BagEntry(tokens.loc, parseExpr(rest), -1)
				case KW_Pass:
					noRest()
					return [ ]
				case KW_Region:
					return parseLinesFromBlock(tokens)
				default:
					// fall through
			}

		return ifElse(tokens.opSplitOnceWhere(_isLineSplitKeyword),
			({ before, at, after }) => {
				return at.kind === KW_MapEntry ?
					_parseMapEntry(before, after, tokens.loc) :
					at.kind === KW_AssignMutate ?
					_parseAssignMutate(before, after, tokens.loc) :
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
	_isLineSplitKeyword = token => {
		if (token instanceof Keyword)
			switch (token.kind) {
				case KW_Assign: case KW_AssignMutable: case KW_AssignMutate:
				case KW_MapEntry: case KW_ObjAssign: case KW_Yield: case KW_YieldTo:
					return true
				default:
					return false
			}
		else
			return false
	},

	_parseAssignMutate = (localsTokens, valueTokens, loc) => {
		const locals = parseLocalDeclaresJustNames(localsTokens)
		context.check(locals.length === 1, loc, 'TODO: AssignDestructureMutate')
		const name = locals[0].name
		const value = parseExpr(valueTokens)
		return AssignMutate(loc, name, value)
	},

	_parseAssign = (localsTokens, assigner, valueTokens, loc) => {
		const kind = assigner.kind
		const locals = parseLocalDeclares(localsTokens)
		const opName = opIf(locals.length === 1, () => locals[0].name)
		const value = _parseAssignValue(kind, opName, valueTokens)

		const isYield = kind === KW_Yield || kind === KW_YieldTo
		if (isEmpty(locals)) {
			context.check(isYield, localsTokens.loc, 'Assignment to nothing')
			return value
		} else {
			if (isYield)
				locals.forEach(_ =>
					context.check(!_.isLazy(), _.loc, 'Can not yield to lazy variable.'))

			const isObjAssign = kind === KW_ObjAssign

			if (kind === KW_AssignMutable)
				locals.forEach(_ => {
					context.check(!_.isLazy(), _.loc, 'Lazy local can not be mutable.')
					_.kind = LD_Mutable
				})

			const ass = (() => {
				if (locals.length === 1) {
					const assignee = locals[0]
					const assign = Assign(loc, assignee, value)
					const isTest = isObjAssign && assignee.name.endsWith('test')
					return isTest ? Debug(loc, [ assign ]) : assign
				} else {
					const kind = locals[0].kind
					locals.forEach(_ => context.check(_.kind === kind, _.loc,
						'All locals of destructuring assignment must be of the same kind.'))
					return AssignDestructure(loc, locals, value, kind)
				}
			})()

			return isObjAssign ? WithObjKeys(locals, ass) : ass
		}
	},

	_parseAssignValue = (kind, opName, valueTokens) => {
		const value = valueTokens.isEmpty() && kind === KW_ObjAssign ?
			SpecialVal(valueTokens.loc, SV_Null) :
			parseExpr(valueTokens)
		if (opName !== null)
			_tryAddName(value, opName)
		switch (kind) {
			case KW_Yield:
				return Yield(value.loc, value)
			case KW_YieldTo:
				return YieldTo(value.loc, value)
			default:
				return value
		}
	},

	// We give it a name if:
	// It's a function
	// It's an Obj block
	// It's an Obj block at the end of a call (as in `name = Obj-Type ...`)
	_tryAddName = (_, name) => {
		if (_ instanceof Fun)
			_.name = name
		else if (_ instanceof Call && _.args.length > 0)
			_tryAddObjName(last(_.args), name)
		else
			_tryAddObjName(_, name)
	},
	_tryAddObjName = (_, name) => {
		if (_ instanceof BlockWrap)
			if (_.block instanceof BlockObj)
				if (_.block.opObjed !== null && _.block.opObjed instanceof Fun)
					_.block.opObjed.name = name
				else if (!(_.block.keys.some(_ => _.name === 'name')))
					_.block.opName = name
	},

	_parseMapEntry = (before, after, loc) =>
		MapEntry(loc, parseExpr(before), parseExpr(after))

const
	parseLocalDeclaresJustNames = tokens =>
		tokens.map(_ => LocalDeclare.plain(_.loc, _parseLocalName(_))),

	parseLocalDeclares = tokens => tokens.map(parseLocalDeclare),

	parseLocalDeclare = token => {
		if (isGroup(G_Space, token)) {
			const tokens = Slice.group(token)
			const [ rest, isLazy ] =
				isKeyword(KW_Lazy, tokens.head()) ? [ tokens.tail(), true ] : [ tokens, false ]
			const name = _parseLocalName(rest.head())
			const rest2 = rest.tail()
			const opType = opIf(!rest2.isEmpty(), () => {
				const colon = rest2.head()
				context.check(isKeyword(KW_Type, colon), colon.loc, () => `Expected ${code(':')}`)
				const tokensType = rest2.tail()
				checkNonEmpty(tokensType, () => `Expected something after ${colon.show()}`)
				return parseSpaced(tokensType)
			})
			return LocalDeclare(token.loc, name, opType, isLazy ? LD_Lazy : LD_Const)
		} else
			return LocalDeclare.plain(token.loc, _parseLocalName(token))
	}

// parseLocalDeclare privates
const
	_parseLocalName = t => {
		if (isKeyword(KW_Focus, t))
			return '_'
		else {
			context.check(t instanceof Name, t.loc, () => `Expected a local name, not ${t.show()}`)
			// TODO: Allow this?
			context.check(!JsGlobals.has(t.name), t.loc, () =>
				`Can not shadow global ${code(t.name)}`)
			return t.name
		}
	}

const parseSingle = t =>
	t instanceof Name ?
	_access(t.name, t.loc) :
	t instanceof Group ? (() => {
		switch (t.kind) {
			case G_Space: return parseSpaced(Slice.group(t))
			case G_Parenthesis: return parseExpr(Slice.group(t))
			case G_Bracket: return BagSimple(t.loc, parseExprParts(Slice.group(t)))
			case G_Block: return blockWrap(Slice.group(t))
			case G_Quote:
				return Quote(t.loc,
					t.tokens.map(_ => (typeof _ === 'string') ? _ : parseSingle(_)))
			default:
				unexpected(t)
		}
	})() :
	t instanceof TokenNumberLiteral ?
	NumberLiteral(t.loc, t.value) :
	t instanceof CallOnFocus ?
	Call(t.loc, _access(t.name, t.loc), [ LocalAccess.focus(t.loc) ]) :
	t instanceof Keyword ?
		t.kind === KW_Focus ?
			LocalAccess.focus(t.loc) :
			SpecialVal(t.loc, opKWtoSV(t.kind) || unexpected(t)) :
	t instanceof DotName && t.nDots === 3 ?
	Splat(t.loc, LocalAccess(t.loc, t.name)) :
	unexpected(t)

// parseSingle privates
const _access = (name, loc) =>
	JsGlobals.has(name) ? GlobalAccess(loc, name) : LocalAccess(loc, name)

const parseSpaced = tokens => {
	const h = tokens.head(), rest = tokens.tail()
	if (isKeyword(KW_Type, h)) {
		const eType = parseSpaced(rest)
		const focus = LocalAccess.focus(h.loc)
		return Call.contains(h.loc, eType, focus)
	} else if (isKeyword(KW_Lazy, h))
		return Lazy(h.loc, parseSpaced(rest))
	else {
		const memberOrSubscript = (e, t) => {
			const loc = t.loc
			if (t instanceof DotName) {
				context.check(t.nDots === 1, tokens.loc, 'Too many dots!')
				return Member(tokens.loc, e, t.name)
			} else if (t instanceof Group) {
				if (t.kind === G_Bracket)
					return Call.sub(loc,
						unshift(e, parseExprParts(Slice.group(t))))
				if (t.kind === G_Parenthesis) {
					checkEmpty(Slice.group(t),
						() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
					return Call(tokens.loc, e, [])
				}
			} else
				context.fail(tokens.loc, `Expected member or sub, not ${t.show()}`)
		}
		return rest.reduce(memberOrSubscript, parseSingle(h))
	}
}

const tryParseUses = (k, tokens) => {
	if (!tokens.isEmpty()) {
		const line0 = Slice.group(tokens.head())
		if (isKeyword(k, line0.head()))
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
		const useDefault = () => LocalDeclare.noType(tokens.loc, name, isLazy)
		if (tokens.isEmpty())
			return { used: [ ], opUseDefault: useDefault() }
		else {
			const [ opUseDefault, rest ] =
				isKeyword(KW_Focus, tokens.head()) ?
					[ useDefault(), tokens.tail() ] :
					[ null, tokens ]
			const used = parseLocalDeclaresJustNames(rest).map(l => {
				context.check(l.name !== '_', l.pos,
					() => `${code('_')} not allowed as import name.`)
				if (isLazy)
					l.kind = LD_Lazy
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
			context.check(isGroup(G_Space, t), t.loc, 'Not a valid module name.')
			return _parseLocalRequire(Slice.group(t))
		}
	},

	_parseLocalRequire = tokens => {
		const first = tokens.head()
		let parts
		if (first instanceof DotName)
			parts = _partsFromDotName(first)
		else {
			context.check(first instanceof Name, first.loc, 'Not a valid part of module path.')
			parts = [ ]
		}
		parts.push(first.name)
		tokens.tail().each(t => {
			context.check(t instanceof DotName && t.nDots === 1, t.loc,
				'Not a valid part of module path.')
			parts.push(t.name)
		})
		return { path: parts.join('/'), name: tokens.last().name }
	},

	_partsFromDotName = dotName =>
		dotName.nDots === 1 ? [ '.' ] : repeat('..', dotName.nDots - 1)

const
	parseFor = tokens => {
		const [ before, block ] = beforeAndBlock(tokens)
		const body = parseBlockDo(block)
		if (before.isEmpty())
			return ForDoPlain(tokens.loc, body)
		else {
			const { element, bag } =
				ifElse(before.opSplitOnceWhere(_ => isKeyword(KW_In, _)),
					({ before, after }) => {
						context.check(before.size() === 1, before.loc, 'TODO: pattern in for!')
						return {
							element: parseLocalDeclaresJustNames(before)[0],
							bag: parseExpr(after)
						}
					},
					() => ({ element: LocalDeclare.focus(before.loc), bag: parseExpr(before) }))
			return ForDoWithBag(tokens.loc, element, bag, body)
		}
	}
