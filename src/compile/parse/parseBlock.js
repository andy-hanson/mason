import assert from 'assert'
import check from '../check'
import { Assign, BlockBody, BlockWrap, Debug, ObjReturn, ListEntry, ListReturn, ELiteral,
		LocalDeclare, MapReturn, MapEntry, Module, ModuleDefaultExport, Val } from '../Expression'
import { Group, Keyword } from '../Token'
import { set } from '../U'
import { None, some } from '../U/Op'
import { head, isEmpty, last, rtail, tail } from '../U/Bag'
import type from '../U/type'
import Px from './Px'
// TODO
const parseLine_ = () => require('./parseLine')

const KParseBlock = new Set(['any', 'do', 'val', 'module'])

// TODO:RENAME
export function wrap(px, k) {
	return BlockWrap(px.s({ body: parseBody(px, k) }))
}

export function parseModule(px, moduleName) {
	type(px, Px, moduleName, String)
	const mod = parseBody(px, 'module')
	const b = mod.body
	// TODO: This also means no module is allowed to be called `displayName`.
	b.lines.forEach(line => {
		if (line instanceof Assign && line.k === 'export')
			px.check(line.assignee.name !== 'displayName',
				'Module can not choose its own displayName.')
	})
	b.lines.push(Assign(px.s({
		assignee: LocalDeclare(px.s({
			name: 'displayName',
			opType: [],
			isLazy: false,
			okToNotUse: true
		})),
		k: 'export',
		value: ELiteral(px.s({ value: moduleName, k: String }))
	})))
	return mod
}

export function justBlock(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockFromEnd(px, k)
	px.check(isEmpty(_.before), 'Expected just a block')
	return _.block
}

export function takeBlockFromEnd(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockLinesFromEnd(px)
	return {
		before: _.before,
		block: parseBody(px.w(_.lines), k)
	}
}

export function takeBlockLinesFromEnd(px) {
	type(px, Px)
	px.check(!isEmpty(px.tokens), 'Expected an indented block')
	const l = last(px.tokens)
	check(Group.is('->')(l), l.span, 'Expected an indented block at the end')
	return { before: rtail(px.tokens), lines: l.tokens }
}

function parseBody(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = tryTakeInOut(px)
	const opIn = _.opIn, opOut = _.opOut, restLines = _.rest

	let objKeys = []
	let debugKeys = []
	let listLength = 0
	let mapLength = 0
	const eLines = []
	function addLine(ln, inDebug) {
		if (ln instanceof Array) {
			ln.forEach(_ => addLine(_, inDebug))
			return
		}
		if (ln instanceof Debug)
			ln.lines.forEach(_ => addLine(_, true))
		else if (ln instanceof ListEntry) {
			assert(!inDebug, 'Not supported: debug list entries')
			// When ListEntries are first created they have no index.
			assert(ln.index === -1)
			ln = set(ln, 'index', listLength)
			listLength = listLength + 1
		}
		else if (ln instanceof MapEntry) {
			assert(!inDebug, 'Not supported: debug map entries')
			assert(ln.index === -1)
			ln = set(ln, 'index', mapLength)
			mapLength = mapLength + 1
		}
		else if (ln instanceof Assign && ln.k === '. ')
			(inDebug ? debugKeys : objKeys).push(ln.assignee)

		if (!inDebug)
			eLines.push(ln)
		// Else we are adding the Debug as a single line.
	}
	restLines.forEach(line => addLine(parseLine_().default(px.w(line.tokens), listLength)))

	// TODO
	// if (isEmpty(objKeys))
	//	check(isEmpty(debugKeys), px.span, 'Block can't have only debug keys')
	const isObj = !(isEmpty(objKeys) && isEmpty(debugKeys))
	const isBag = listLength > 0
	const isMap = mapLength > 0
	px.check(!(isObj && isBag), 'Block has both Bag and Obj lines.')
	px.check(!(isObj && isMap), 'Block has both Obj and Map lines.')
	px.check(!(isBag && isMap), 'Block has both Bag and Map lines.')

	const isModule = k === 'module'

	const doLinesOpReturn = (() => {
		if (k === 'do') {
			px.check(!isObj, 'Can\'t make Obj in statement context')
			px.check(!isBag, 'Can\'t make Bag in statement context')
			px.check(!isMap, 'Can\'t make Map in statement context')
			return { doLines: eLines, opReturn: None }
		}
		if (isBag)
			return {
				doLines: eLines,
				opReturn: some(ListReturn(px.s({ length: listLength })))
			}
		if (isMap)
			return {
				doLines: eLines,
				opReturn: some(MapReturn(px.s({ length: mapLength })))
			}

		const lastReturn = !isEmpty(eLines) && last(eLines) instanceof Val
		if (isObj && !isModule)
			return lastReturn ?
				{
					doLines: rtail(eLines),
					opReturn: some(
						ObjReturn(px.s({
							keys: objKeys,
							debugKeys: debugKeys,
							opObjed: some(last(eLines)),
							// This is filled in by parseAssign.
							opDisplayName: None
						})))
				} : {
					doLines: eLines,
					opReturn: some(ObjReturn(px.s({
						keys: objKeys,
						debugKeys: debugKeys,
						opObjed: None,
						// This is filled in by parseAssign.
						opDisplayName: None
					})))
				}
		else if (lastReturn)
			return {
				doLines: rtail(eLines),
				opReturn: some(last(eLines))
			}
		else {
			px.check(k !== 'val', 'Expected a value block')
			return { doLines: eLines, opReturn: None }
		}
	})()
	const doLines = doLinesOpReturn.doLines, opReturn = doLinesOpReturn.opReturn

	if (isModule) {
		// TODO: Handle debug-only exports
		const moduleLines =
			// Turn Obj assigns into exports.
			doLines.map(line =>
				line instanceof Assign && line.k === '. ' ? set(line, 'k', 'export') : line
			).concat(opReturn.map(ret => ModuleDefaultExport({ span: ret.span, value: ret })))

		const body = BlockBody(px.s({
			lines: moduleLines,
			opReturn: None,
			opIn: opIn,
			opOut: opOut
		}))
		return Module(px.s({ body: body }))
	}
	else
		return BlockBody(px.s({ lines: doLines, opReturn: opReturn, opIn: opIn, opOut: opOut }))
}

function tryTakeInOut(px) {
	function tryTakeInOrOut(lines, inOrOut) {
		if (!isEmpty(lines)) {
			const firstLine = head(lines)
			const tokensFirst = firstLine.tokens
			if (Keyword.is(inOrOut)(head(tokensFirst)))
				return {
					took: some(Debug({
						span: firstLine.span,
						lines: parseLine_().parseLines(px.w(tokensFirst))
					})),
					rest: tail(lines)
				}
		}
		return { took: None, rest: lines }
	}

	const _in = tryTakeInOrOut(px.tokens, 'in')
	const _out = tryTakeInOrOut(_in.rest, 'out')
	return {
		opIn: _in.took,
		opOut: _out.took,
		rest: _out.rest
	}
}
