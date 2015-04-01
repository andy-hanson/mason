import assert from 'assert'
import check from '../check'
import { Assign, BlockDo, BlockVal, BlockWrap, Debug, ObjReturn, ListEntry, ListReturn, ELiteral,
	LocalDeclare, MapReturn, MapEntry, Module, ModuleDefaultExport, Val } from '../Expression'
import { Group, Keyword } from '../Token'
import { lazy, set } from '../U'
import { cat, isEmpty, last, rtail } from '../U/Bag'
import { ifElse, None, some } from '../U/Op'
import type from '../U/type'
import Px from './Px'
// TODO:ES6
const parseLine_ = lazy(() => require('./parseLine').default)
const parseLineOrLines_ = lazy(() => require('./parseLine').parseLineOrLines)

export const
	takeBlockLinesFromEnd = px => {
		type(px, Px)
		px.check(!px.tokens.isEmpty(), 'Expected an indented block')
		const l = px.tokens.last()
		check(Group.isBlock(l), l.span, 'Expected an indented block at the end')
		return { before: px.tokens.rtail(), lines: l.tokens }
	},

	blockWrap = px =>
		BlockWrap(px.s({ block: parseBody(px, 'val') })),

	justBlockDo = px => {
		const { before, block } = takeBlockDoFromEnd(px)
		px.check(before.isEmpty(), 'Expected just a block.')
		return block
	},
	justBlockVal = px => {
		const { before, block } = takeBlockValFromEnd(px)
		px.check(before.isEmpty(), 'Expected just a block.')
		return block
	},

	takeBlockDoFromEnd = px => {
		const{ before, lines } = takeBlockLinesFromEnd(px)
		const block = px.w(lines, parseBodyDo)
		return { before, block }
	},
	takeBlockValFromEnd = px => {
		const { before, lines } = takeBlockLinesFromEnd(px)
		const block = px.w(lines, parseBody, 'val')
		return { before, block }
	},

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = px => parseBody(px, 'module'),

	parseBlockFromLines = px => parseBody(px, 'any'),

	// Gets lines in a region or Debug.
	parseLinesFromBlock = px => {
		const h = px.tokens.head()
		check(px.tokens.size() > 1, h.span, () => `Expected indented block after ${h}`)
		const block = px.tokens.second()
		assert(px.tokens.size() === 2 && Group.isBlock(block))
		return block.tokens.flatMap(line => px.w(line.tokens, parseLineOrLines_()))
	}

const
	parseBodyDo = px => {
		const { eLines, kReturn } = parseBlockLines(px)
		px.check(kReturn === 'plain', `Can not make ${kReturn} in statement context.`)
		return BlockDo(px.s({ lines: eLines }))
	},

	parseBody = (px, k) => {
		assert(k === 'val' || k === 'module' || k === 'any')

		// keys only matter if kReturn === 'obj'
		const { eLines, kReturn, listLength, mapLength, objKeys, debugKeys } = parseBlockLines(px)

		const { doLines, opReturn } = (() => {
			if (kReturn === 'bag')
				return {
					doLines: eLines,
					opReturn: some(ListReturn(px.s({ length: listLength })))
				}
			if (kReturn === 'map')
				return {
					doLines: eLines,
					opReturn: some(MapReturn(px.s({ length: mapLength })))
				}

			const lastReturn = !isEmpty(eLines) && last(eLines) instanceof Val
			if (kReturn === 'obj' && k !== 'module')
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
			else
				return lastReturn ?
				{ doLines: rtail(eLines), opReturn: some(last(eLines)) } :
				{ doLines: eLines, opReturn: None }
		})()

		switch (k) {
			case 'val':
				return ifElse(opReturn,
					returned => BlockVal(px.s({ lines: doLines, returned })),
					() => px.fail('Expected a value block.'))
			case 'any':
				return ifElse(opReturn,
					returned => BlockVal(px.s({ lines: doLines, returned })),
					() => BlockDo(px.s({ lines: doLines })))
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
						opReturn.map(ret => ModuleDefaultExport({ span: ret.span, value: ret })))
				return BlockDo(px.s({ lines }))
			}
			default: throw new Error(k)
		}
	},

	parseBlockLines = px => {
		const lines = px.tokens
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
					eLines.push(ln)
				// Else we are adding the Debug as a single line.
			}
		}
		lines.each(line => addLine(px.w(line.tokens, parseLine_(), listLength)))

		const isObj = !(isEmpty(objKeys) && isEmpty(debugKeys))
		// TODO
		// if (isEmpty(objKeys))
		//	check(isEmpty(debugKeys), px.span, 'Block can't have only debug keys')
		const isBag = listLength > 0
		const isMap = mapLength > 0
		px.check(!(isObj && isBag), 'Block has both Bag and Obj lines.')
		px.check(!(isObj && isMap), 'Block has both Obj and Map lines.')
		px.check(!(isBag && isMap), 'Block has both Bag and Map lines.')

		const kReturn = isObj ? 'obj' : isBag ? 'bag' : isMap ? 'map' : 'plain'
		return { eLines, kReturn, listLength, mapLength, objKeys, debugKeys }
	}
