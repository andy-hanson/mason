import Loc from 'esast/dist/Loc'
import { code } from '../../CompileError'
import { AssignDestructure, AssignSingle, BagEntry, BagSimple, BlockBag, BlockDo, BlockMap,
	BlockObj, BlockWithReturn, BlockWrap, BreakDo, BreakVal, Call, CaseDoPart, CaseValPart, CaseDo,
	CaseVal, Continue, Debug, Iteratee, NumberLiteral, ForBag, ForDo, ForVal, Fun, GlobalAccess,
	IfDo, Lazy, LD_Const, LD_Lazy, LD_Mutable, LocalAccess, LocalDeclare, LocalDeclareFocus,
	LocalDeclareName, LocalDeclarePlain, LocalDeclareRes, LocalDeclareUntyped, LocalMutate,
	MapEntry, Member, Module, ObjEntry, ObjPair, ObjSimple, Pattern, Quote, SP_Debugger, SpecialDo,
	SpecialVal, SV_Null, Splat, Val, UnlessDo, Use, UseDo, Yield, YieldTo } from '../../MsAst'
import { JsGlobals } from '../language'
import { DotName, Group, G_Block, G_Bracket, G_Parenthesis, G_Space, G_Quote, isGroup, isKeyword,
	Keyword, KW_Assign, KW_AssignMutable, KW_BreakDo, KW_BreakVal, KW_CaseVal, KW_CaseDo,
	KW_Continue, KW_Debug, KW_Debugger, KW_Else, KW_ForBag, KW_ForDo, KW_ForVal, KW_Focus, KW_Fun,
	KW_FunDo, KW_GenFun, KW_GenFunDo, KW_IfDo, KW_In, KW_Lazy, KW_LocalMutate, KW_MapEntry,
	KW_ObjAssign, KW_Pass, KW_Out, KW_Region, KW_Type, KW_UnlessDo, KW_Use, KW_UseDebug, KW_UseDo,
	KW_UseLazy, KW_Yield, KW_YieldTo, Name, opKeywordKindToSpecialValueKind } from '../Token'
import { assert, head, ifElse, flatMap, isEmpty, last,
	opIf, opMap, push, repeat, rtail, tail, unshift } from '../util'
import Slice from './Slice'

// Since there are so many parsing functions,
// it's faster (as of node v0.11.14) to have them all close over this mutable variable once
// than to close over the parameter (as in lex.js, where that's much faster).
let context

/*
This converts a Token tree to a MsAst.
This is a recursive-descent parser, made easier by two facts:
	* We have already grouped tokens.
	* Most of the time, an ast's type is determined by the first token.

There are exceptions such as assignment statements (indicated by a `=` somewhere in the middle).
For those we must iterate through tokens and split.
(See Slice.opSplitOnceWhere and Slice.opSplitManyWhere.)
*/
export default (_context, rootToken) => {
	context = _context
	assert(isGroup(G_Block, rootToken))
	const msAst = parseModule(Slice.group(rootToken))
	// Release for garbage collections.
	context = undefined
	return msAst
}

const
	checkEmpty = (tokens, message) =>
		context.check(tokens.isEmpty(), tokens.loc, message),
	checkNonEmpty = (tokens, message) =>
		context.check(!tokens.isEmpty(), tokens.loc, message),
	unexpected = token => context.fail(token.loc, `Unexpected ${token.show()}`)

const parseModule = tokens => {
	// Use statements must appear in order.
	const [ doUses, rest0 ] = tryParseUses(KW_UseDo, tokens)
	const [ plainUses, rest1 ] = tryParseUses(KW_Use, rest0)
	const [ lazyUses, rest2 ] = tryParseUses(KW_UseLazy, rest1)
	const [ debugUses, rest3 ] = tryParseUses(KW_UseDebug, rest2)
	const { lines, exports, opDefaultExport } = parseModuleBlock(rest3)

	if (context.opts.includeModuleName() && !exports.some(_ => _.name === 'name')) {
		const name = LocalDeclareName(tokens.loc)
		lines.push(AssignSingle(tokens.loc, name,
			Quote.forString(tokens.loc, context.opts.moduleName())))
		exports.push(name)
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
		return flatMap(block.subTokens, line => parseLineOrLines(Slice.group(line)))
	},

	parseBlockDo = tokens => {
		const lines = _plainBlockLines(tokens)
		return BlockDo(tokens.loc, lines)
	},

	parseBlockVal = tokens => {
		const { lines, kReturn } = _parseBlockLines(tokens)
		switch (kReturn) {
			case KReturn_Bag:
				return BlockBag.of(tokens.loc, lines)
			case KReturn_Map:
				return BlockMap.of(tokens.loc, lines)
			case KReturn_Obj:
				const [ doLines, opVal ] = _tryTakeLastVal(lines)
				// opName written to by _tryAddName.
				return BlockObj.of(tokens.loc, doLines, opVal, null)
			default: {
				context.check(!isEmpty(lines), tokens.loc, 'Value block must end in a value.')
				const val = last(lines)
				context.check(val instanceof Val, val.loc, 'Value block must end in a value.')
				return BlockWithReturn(tokens.loc, rtail(lines), val)
			}
		}
	},

	parseModuleBlock = tokens => {
		const { lines, kReturn } = _parseBlockLines(tokens)
		const loc = tokens.loc
		switch (kReturn) {
			case KReturn_Bag: case KReturn_Map: {
				const block = (kReturn === KReturn_Bag ? BlockBag : BlockMap).of(loc, lines)
				return { lines: [ ], exports, opDefaultExport: BlockWrap(loc, block) }
			}
			default: {
				const exports = [ ]
				let opDefaultExport = null
				const moduleName = context.opts.moduleName()

				// Module exports look like a BlockObj,  but are really different.
				// In ES6, module exports must be completely static.
				// So we keep an array of exports attached directly to the Module ast.
				// If you write:
				//	if! cond
				//		a. b
				// in a module context, it will be an error. (The module creates no `built` local.)
				const getLineExports = line => {
					if (line instanceof ObjEntry) {
						line.assign.allAssignees().forEach(_ => {
							if (_.name === moduleName) {
								context.check(opDefaultExport === null, _.loc, () =>
									`Default export already declared at ${opDefaultExport.loc}`)
								opDefaultExport = LocalAccess(_.loc, _.name)
							} else
								exports.push(_)
						})
						return line.assign
					} else if (line instanceof Debug)
						line.lines = line.lines.map(getLineExports)
					return line
				}

				const moduleLines = lines.map(getLineExports)

				if (isEmpty(exports) && opDefaultExport === null) {
					const [ lines, opDefaultExport ] = _tryTakeLastVal(moduleLines)
					return { lines, exports, opDefaultExport }
				} else
					return { lines: moduleLines, exports, opDefaultExport }
			}
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
			[ rtail(lines), last(lines) ] :
			[ lines, null ],

	_plainBlockLines = lineTokens => {
		const lines = [ ]
		const addLine = line => {
			if (line instanceof Array)
				line.forEach(addLine)
			else
				lines.push(line)
		}
		lineTokens.each(_ => addLine(parseLine(Slice.group(_))))
		return lines
	},

	KReturn_Plain = 0,
	KReturn_Obj = 1,
	KReturn_Bag = 2,
	KReturn_Map = 3,
	_parseBlockLines = lineTokens => {
		let isBag = false, isMap = false, isObj = false
		const checkLine = line => {
			if (line instanceof Debug)
				line.lines.forEach(checkLine)
			else if (line instanceof BagEntry)
				isBag = true
			else if (line instanceof MapEntry)
				isMap = true
			else if (line instanceof ObjEntry)
				isObj = true
		}
		const lines = _plainBlockLines(lineTokens)
		lines.forEach(checkLine)

		context.check(!(isObj && isBag), lines.loc, 'Block has both Bag and Obj lines.')
		context.check(!(isObj && isMap), lines.loc, 'Block has both Obj and Map lines.')
		context.check(!(isBag && isMap), lines.loc, 'Block has both Bag and Map lines.')

		const kReturn =
			isObj ? KReturn_Obj : isBag ? KReturn_Bag : isMap ? KReturn_Map : KReturn_Plain
		return { lines, kReturn }
	}

const parseCase = (isVal, casedFromFun, tokens) => {
	const [ before, block ] = beforeAndBlock(tokens)

	let opCased
	if (casedFromFun) {
		checkEmpty(before, 'Can\'t make focus -- is implicitly provided as first argument.')
		opCased = null
	} else
		opCased = opIf(!before.isEmpty(), () => AssignSingle.focus(before.loc, parseExpr(before)))

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
		const opSplit = tokens.opSplitOnceWhere(token => {
			if (token instanceof Keyword)
				switch (token.kind) {
					case KW_CaseVal: case KW_ForBag: case KW_ForVal: case KW_Fun: case KW_FunDo:
					case KW_GenFun: case KW_GenFunDo: case KW_Yield: case KW_YieldTo:
						return true
					default:
						return false
				}
			return false
		})
		return ifElse(opSplit,
			({ before, at, after }) => {
				const last = (() => {
					switch (at.kind) {
						case KW_CaseVal:
							return parseCase(true, false, after)
						case KW_ForBag:
							return parseForBag(after)
						case KW_ForVal:
							return parseForVal(after)
						case KW_Fun:
							return parseFun(false, false, after)
						case KW_FunDo:
							return parseFun(true, false, after)
						case KW_GenFun:
							return parseFun(false, true, after)
						case KW_GenFunDo:
							return parseFun(true, true, after)
						case KW_Yield:
							return Yield(at.loc, parseExpr(after))
						case KW_YieldTo:
							return YieldTo(at.loc, parseExpr(after))
						default: throw new Error(at.kind)
					}
				})()
				return push(before.map(parseSingle), last)
			},
			() => tokens.map(parseSingle))
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

const parseFun = (isDo, isGenerator, tokens) => {
	const { opReturnType, rest } = _tryTakeReturnType(tokens)
	checkNonEmpty(rest, () => `Expected an indented block.`)
	const { args, opRestArg, block, opIn, opOut } = _funArgsAndBlock(isDo, rest)
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
			if (isGroup(G_Space, h) && isKeyword(KW_Type, head(h.subTokens)))
				return {
					opReturnType: parseSpaced(Slice.group(h).tail()),
					rest: tokens.tail()
				}
		}
		return { opReturnType: null, rest: tokens }
	},

	_funArgsAndBlock = (isDo, tokens) => {
		const h = tokens.head()
		// Might be `|case`
		if (h instanceof Keyword && (h.kind === KW_CaseVal || h.kind === KW_CaseDo)) {
			const eCase = parseCase(h.kind === KW_CaseVal, true, tokens.tail())
			const args = [ LocalDeclareFocus(h.loc) ]
			return h.kind === KW_CaseVal ?
				{
					args, opRestArg: null, opIn: null, opOut: null,
					block: BlockWithReturn(tokens.loc, [ ], eCase)
				} :
				{
					args, opRestArg: null, opIn: null, opOut: null,
					block: BlockDo(tokens.loc, [ eCase ])
				}
		} else {
			const [ before, blockLines ] = beforeAndBlock(tokens)
			const { args, opRestArg } = _parseFunLocals(before)
			const [ opIn, rest0 ] = _tryTakeInOrOut(KW_In, blockLines)
			const [ opOut, rest1 ] = _tryTakeInOrOut(KW_Out, rest0)
			const block = (isDo ? parseBlockDo : parseBlockVal)(rest1)
			return { args, opRestArg, block, opIn, opOut }
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
					opRestArg: LocalDeclarePlain(l.loc, l.name)
				}
			}
			else return { args: parseLocalDeclares(tokens), opRestArg: null }
		}
	},

	_tryTakeInOrOut = (inOrOut, tokens) => {
		if (!tokens.isEmpty()) {
			const firstLine = tokens.head()
			if (isKeyword(inOrOut, head(firstLine.subTokens))) {
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
				case KW_BreakDo:
					noRest()
					return BreakDo(tokens.loc)
				case KW_BreakVal:
					return BreakVal(tokens.loc, parseExpr(rest))
				case KW_CaseDo:
					return parseCase(false, false, rest)
				case KW_Continue:
					noRest()
					return Continue(tokens.loc)
				case KW_Debug:
					return Debug(tokens.loc,
						isGroup(G_Block, tokens.second()) ?
						// `debug`, then indented block
						parseLinesFromBlock() :
						// `debug`, then single line
						parseLineOrLines(rest))
				case KW_Debugger:
					noRest()
					return SpecialDo(tokens.loc, SP_Debugger)
				case KW_IfDo: case KW_UnlessDo: {
					const [ before, block ] = beforeAndBlock(rest)
					const ctr = head.kind === KW_IfDo ? IfDo : UnlessDo
					return ctr(tokens.loc, parseExpr(before), parseBlockDo(block))
				}
				case KW_ForDo:
					return parseForDo(rest)
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
					at.kind === KW_LocalMutate ?
					_parseLocalMutate(before, after, tokens.loc) :
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
				case KW_Assign: case KW_AssignMutable: case KW_LocalMutate:
				case KW_MapEntry: case KW_ObjAssign: case KW_Yield: case KW_YieldTo:
					return true
				default:
					return false
			}
		else
			return false
	},

	_parseLocalMutate = (localsTokens, valueTokens, loc) => {
		const locals = parseLocalDeclaresJustNames(localsTokens)
		context.check(locals.length === 1, loc, 'TODO: LocalDestructureMutate')
		const name = locals[0].name
		const value = parseExpr(valueTokens)
		return LocalMutate(loc, name, value)
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

			const wrap = _ => isObjAssign ? ObjEntry(loc, _) : _

			if (locals.length === 1) {
				const assignee = locals[0]
				const assign = AssignSingle(loc, assignee, value)
				const isTest = isObjAssign && assignee.name.endsWith('test')
				return isTest ? Debug(loc, [ wrap(assign) ]) : wrap(assign)
			} else {
				const kind = locals[0].kind
				locals.forEach(_ => context.check(_.kind === kind, _.loc,
					'All locals of destructuring assignment must be of the same kind.'))
				return wrap(AssignDestructure(loc, locals, value, kind))
			}
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
		if (_ instanceof BlockWrap && _.block instanceof BlockObj)
			if (_.block.opObjed !== null && _.block.opObjed instanceof Fun)
				_.block.opObjed.name = name
			else if (!_nameObjAssignSomewhere(_.block.lines))
				_.block.opName = name
	},
	_nameObjAssignSomewhere = lines =>
		lines.some(line =>
			line instanceof ObjEntry && line.assign.allAssignees().some(_ =>
				_.name === 'name')),

	_parseMapEntry = (before, after, loc) =>
		MapEntry(loc, parseExpr(before), parseExpr(after))

const
	parseLocalDeclaresJustNames = tokens =>
		tokens.map(_ => LocalDeclarePlain(_.loc, _parseLocalName(_))),

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
			return LocalDeclarePlain(token.loc, _parseLocalName(token))
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

const parseSingle = token => {
	const { loc } = token
	return token instanceof Name ?
	_access(token.name, loc) :
	token instanceof Group ? (() => {
		const slice = Slice.group(token)
		switch (token.kind) {
			case G_Space:
				return parseSpaced(slice)
			case G_Parenthesis:
				return parseExpr(slice)
			case G_Bracket:
				return BagSimple(loc, parseExprParts(slice))
			case G_Block:
				return blockWrap(slice)
			case G_Quote:
				return Quote(loc,
					slice.map(_ => (typeof _ === 'string') ? _ : parseSingle(_)))
			default:
				throw new Error(token.kind)
		}
	})() :
	token instanceof NumberLiteral ?
	token :
	token instanceof Keyword ?
		token.kind === KW_Focus ?
			LocalAccess.focus(loc) :
			ifElse(opKeywordKindToSpecialValueKind(token.kind),
				_ => SpecialVal(loc, _),
				() => unexpected(token)) :
	token instanceof DotName && token.nDots === 3 ?
	Splat(loc, LocalAccess(loc, token.name)) :
	unexpected(token)
}

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
		// Tokens within a space group wrap previous tokens.
		const mod = (acc, token) => {
			const loc = token.loc
			if (token instanceof DotName) {
				context.check(token.nDots === 1, loc, 'Too many dots!')
				return Member(loc, acc, token.name)
			} else if (isKeyword(KW_Focus, token))
				return Call(loc, acc, [ LocalAccess.focus(loc) ])
			else if (token instanceof Group) {
				if (token.kind === G_Bracket)
					return Call.sub(loc,
						unshift(acc, parseExprParts(Slice.group(token))))
				if (token.kind === G_Parenthesis) {
					checkEmpty(Slice.group(token),
						() => `Use ${code('(a b)')}, not ${code('a(b)')}`)
					return Call(loc, acc, [])
				}
			} else
				context.fail(tokens.loc, `Expected member or sub, not ${token.show()}`)
		}
		return rest.reduce(mod, parseSingle(h))
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
	_parseUses = (useKeywordKind, tokens) => {
		const [ before, lines ] = beforeAndBlock(tokens)
		checkEmpty(before, () =>
			`Did not expect anything after ${code(useKeywordKind)} other than a block`)
		return lines.map(line => {
			line = Slice.group(line)
			const { path, name } = _parseRequire(line.head())
			if (useKeywordKind === KW_UseDo) {
				if (line.size() > 1)
					unexpected(line.second())
				return UseDo(line.loc, path)
			} else {
				const isLazy = useKeywordKind === KW_UseLazy ||
					useKeywordKind === KW_UseDebug
				const { used, opUseDefault } =
					_parseThingsUsed(name, isLazy, line.tail())
				return Use(line.loc, path, used, opUseDefault)
			}
		})
	},

	_parseThingsUsed = (name, isLazy, tokens) => {
		const useDefault = () => LocalDeclareUntyped(tokens.loc, name, isLazy ? LD_Lazy : LD_Const)
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
		tokens.tail().each(token => {
			context.check(token instanceof DotName && token.nDots === 1, token.loc,
				'Not a valid part of module path.')
			parts.push(token.name)
		})
		return { path: parts.join('/'), name: tokens.last().name }
	},

	_partsFromDotName = dotName =>
		dotName.nDots === 1 ? [ '.' ] : repeat('..', dotName.nDots - 1)

const
	_parseFor = ctr => tokens => {
		const [ before, block ] = beforeAndBlock(tokens)
		return ctr(tokens.loc, _parseOpIteratee(before), parseBlockDo(block))
	},
	_parseOpIteratee = tokens =>
		opIf(!tokens.isEmpty(), () => {
			const [ element, bag ] =
				ifElse(tokens.opSplitOnceWhere(_ => isKeyword(KW_In, _)),
					({ before, after }) => {
						context.check(before.size() === 1, before.loc, 'TODO: pattern in for')
						return [ parseLocalDeclaresJustNames(before)[0], parseExpr(after) ]
					},
					() => [ LocalDeclareFocus(tokens.loc), parseExpr(tokens) ])
			return Iteratee(tokens.loc, element, bag)
		})
const
	parseForDo = _parseFor(ForDo),
	parseForVal = _parseFor(ForVal),
	// TODO: -> out-type
	parseForBag = tokens => {
		const [ before, lines ] = beforeAndBlock(tokens)
		const block = parseBlockDo(lines)
		// TODO: Better way?
		if (block.lines.length === 1 && block.lines[0] instanceof Val)
			block.lines[0] = BagEntry(block.lines[0].loc, block.lines[0])
		return ForBag.of(tokens.loc, _parseOpIteratee(before), block)
	}
