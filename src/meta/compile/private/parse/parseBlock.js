import { Assign, BlockDo, BlockVal, BlockWrap, Debug, ObjReturn, ListEntry, ListReturn,
	MapReturn, MapEntry, ModuleDefaultExport, Val } from '../../Expression'
import { Group } from '../Token'
import { cat, isEmpty, last, rtail } from '../U/Bag'
import { ifElse, None, some } from '../U/Op'
import { assert } from '../U/util'
import parseLine, { parseLineOrLines } from './parseLine'
import { check, cx, loc, tokens, w } from './vars'

export const
	takeBlockLinesFromEnd = () => {
		check(!tokens.isEmpty(), 'Expected an indented block')
		const l = tokens.last()
		cx.check(Group.isBlock(l), l.loc, 'Expected an indented block at the end')
		return { before: tokens.rtail(), lines: l.tokens }
	},

	blockWrap = () => BlockWrap(loc, parseBody('val')),

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
		const{ before, lines } = takeBlockLinesFromEnd()
		const block = w(lines, parseBodyDo)
		return { before, block }
	},
	takeBlockValFromEnd = () => {
		const { before, lines } = takeBlockLinesFromEnd()
		const block = w(lines, parseBody, 'val')
		return { before, block }
	},

	// TODO: Just have module return a value and use a normal block.
	parseModuleBody = () => parseBody('module'),

	parseBlockFromLines = () => parseBody('any'),

	// Gets lines in a region or Debug.
	parseLinesFromBlock = () => {
		const h = tokens.head()
		cx.check(tokens.size() > 1, h.loc, () => `Expected indented block after ${h}`)
		const block = tokens.second()
		assert(tokens.size() === 2 && Group.isBlock(block))
		return block.tokens.flatMap(line => w(line.tokens, parseLineOrLines))
	}

const
	parseBodyDo = () => {
		const { eLines, kReturn } = parseBlockLines()
		check(kReturn === 'plain', `Can not make ${kReturn} in statement context.`)
		return BlockDo(loc, eLines)
	},

	parseBody = k => {
		assert(k === 'val' || k === 'module' || k === 'any')

		// keys only matter if kReturn === 'obj'
		const { eLines, kReturn, listLength, mapLength, objKeys, debugKeys } = parseBlockLines()

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

	parseBlockLines = () => {
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
		lines.each(line => addLine(w(line.tokens, parseLine, listLength)))

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
