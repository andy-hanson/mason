import { Assign, ELiteral, LocalDeclare, Module } from '../../Expression'
import { Group } from '../Token'
import { assert } from '../U/util'
import { parseModuleBody } from './parseBlock'
import tryParseUse from './parseUse'
import { init, uninit, check, cx, w, loc } from './vars'

export default function parse(cx, rootToken) {
	assert(Group.isBlock(rootToken))
	init(cx, rootToken.tokens, rootToken.loc)
	const res = parseModule()
	uninit()
	return res
}

const parseModule = () => {
	const { uses: doUses, rest } = tryParseUse('use!')
	const { uses: plainUses, rest: rest1 } = w(rest, tryParseUse, 'use')
	const { uses: lazyUses, rest: rest2 } = w(rest1, tryParseUse, 'use~')
	const { uses: debugUses, rest: rest3 } = w(rest2, tryParseUse, 'use-debug')
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
				ELiteral(loc, cx.opts.moduleName(), String)))

	const uses = plainUses.concat(lazyUses)
	return Module(loc, doUses, uses, debugUses, block)
}
