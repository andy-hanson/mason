import assert from 'assert'
import { Assign, Do, Debug, ELiteral, LocalDeclare, Module } from '../Expression'
import Opts from '../Opts'
import { Group } from '../Token'
import Slice from '../U/Slice'
import type from '../U/type'
import { parseModuleBody } from './parseBlock'
import tryParseUse from './parseUse'
import Px from './Px'

export default function parse(rootToken, opts) {
	type(opts, Opts)
	assert(Group.isBlock(rootToken))
	const px = new Px(rootToken.tokens, rootToken.span)
	return parseModule(px, opts.moduleName())
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
	block.lines.push(Assign(px.s({
		assignee: LocalDeclare(px.s(
			{ name: 'displayName', opType: [], isLazy: false, okToNotUse: true })),
		k: 'export',
		value: ELiteral(px.s({ value: moduleName, k: String }))
	})))

	const uses = plainUses.concat(lazyUses)
	return Module(px.s({ doUses, uses, debugUses, block }))
}
