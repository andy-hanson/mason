import assert from 'assert'
import { Assign, Do, Debug, ELiteral, LocalDeclare, Module } from '../Expression'
import Opts from '../Opts'
import { Group } from '../Token'
import type from '../U/type'
import { parseBody } from './parseBlock'
import tryParseUse from './parseUse'
import Px from './Px'

export default function parse(rootToken, opts) {
	type(opts, Opts)
	assert(Group.is(rootToken, '->'))
	const px = new Px(rootToken.tokens, rootToken.span)
	return parseModule(px, opts.moduleName())
}

function parseModule(px, moduleName) {
	const { uses: doUses, rest } = tryParseUse(px, 'use!')
	const { uses: plainUses, rest: rest1 } = tryParseUse(px.w(rest), 'use')
	const { uses: lazyUses, rest: rest2 } = tryParseUse(px.w(rest1), 'use~')
	const { uses: debugUses, rest: rest3 } = tryParseUse(px.w(rest2), 'use-debug')
	const body = parseBody(px.w(rest3), 'module')

	body.lines.forEach(line => {
		if (line instanceof Assign && line.k === 'export')
			px.check(line.assignee.name !== 'displayName',
				'Module can not choose its own displayName.')
	})
	body.lines.push(Assign(px.s({
		assignee: LocalDeclare(px.s(
			{ name: 'displayName', opType: [], isLazy: false, okToNotUse: true })),
		k: 'export',
		value: ELiteral(px.s({ value: moduleName, k: String }))
	})))

	const uses = doUses.concat(plainUses, lazyUses, [ Debug(px.s({ lines: debugUses })) ])
	return Module(px.s({ uses, body }))
}
