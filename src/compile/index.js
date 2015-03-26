import 'es6-shim'
import { install } from 'source-map-support'
install()
import lex from './lex'
import parse from './parse'
import Opts from './Opts'
import render from './render'
import transpile from './transpile'
import { pAdd } from './U'
import type from './U/type'
import verify from './verify'

// Speed boost by turning this off
global.DEBUG = true

export default function compile(src, inFilePath, opts) {
	type(src, String, opts, Object)
	opts = Opts(pAdd(opts, 'inFile', inFilePath))
	const e = parse(lex(src, opts), opts)
	const vr = verify(e, opts)
	const ast = transpile(e, opts, vr)
	const { code, map } = render(ast, opts)
	type(code, String)
	// TODO: There must be a better way of doing this...
	const sourceMap = JSON.parse(map.toString())
	return { code, sourceMap }
}
