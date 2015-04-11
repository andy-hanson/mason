import { Assign, Do, Debug, ELiteral, LocalDeclare, Module } from '../../Expression'
import Opts from '../Opts'
import { Group } from '../Token'
import Slice from '../U/Slice'
import type from '../U/type'
import { assert } from '../U/util'
import { parseModuleBody } from './parseBlock'
import tryParseUse from './parseUse'
import Px from './Px'

export default function parse(cx, rootToken) {
	assert(Group.isBlock(rootToken))
	const px = new Px(cx, rootToken.tokens, rootToken.loc)
	return parseModule(px)
}

function parseModule(px) {
	const { uses: doUses, rest } = tryParseUse(px, 'use!')
	const { uses: plainUses, rest: rest1 } = px.w(rest, tryParseUse, 'use')
	const { uses: lazyUses, rest: rest2 } = px.w(rest1, tryParseUse, 'use~')
	const { uses: debugUses, rest: rest3 } = px.w(rest2, tryParseUse, 'use-debug')
	const block = px.w(rest3, parseModuleBody)

	block.lines.forEach(line => {
		if (line instanceof Assign && line.k === 'export')
			px.check(line.assignee.name !== 'displayName',
				'Module can not choose its own displayName.')
	})
	if (px.opts().moduleDisplayName())
		block.lines.push(
			Assign(
				px.loc,
				LocalDeclare(px.loc, 'displayName', [], false, true),
				'export',
				ELiteral(px.loc, px.opts().moduleName(), String)))

	const uses = plainUses.concat(lazyUses)
	return Module(px.loc, doUses, uses, debugUses, block)
}
