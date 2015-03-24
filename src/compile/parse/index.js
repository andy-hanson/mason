import assert from 'assert'
import Opts from '../Opts'
import { Group } from '../Token'
import type from '../U/type'
import { parseModule } from './parseBlock'
import Px from './Px'

export default function parse(t, opts) {
	type(t, Group, opts, Opts)
	// Lexer always puts the whole file in a block.
	assert(t.k === '->')
	const px = new Px(t.sqt, t.span)
	return parseModule(px, opts.moduleName())
}
