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
	const px = new Px(cx, rootToken.tokens, rootToken.span)
	return parseModule(px, cx.opts.moduleName())
}

function parseModule(px, moduleName) {
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
	block.lines.push(Assign(px.span,
		LocalDeclare(px.span, 'displayName', [], false, true),
		'export',
		ELiteral(px.span, moduleName, String)))

	const uses = plainUses.concat(lazyUses)
	return Module(px.span, doUses, uses, debugUses, block)
}
