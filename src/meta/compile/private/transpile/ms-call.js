import { CallExpression, Identifier } from 'esast/dist/ast'
import { member, thunk } from 'esast/dist/util'

const ms = name => {
	const m = member(IdMs, name)
	return (...args) => CallExpression(m, args)
}
export const
	IdMs = Identifier('_ms'),
	lazyWrap = value => msLazy(thunk(value)),
	msArr = ms('arr'),
	msBool = ms('bool'),
	msGet = ms('get'),
	msGetDefaultExport = ms('getDefaultExport'),
	msExtract = ms('extract'),
	msGetModule = ms('getModule'),
	msLazy = ms('lazy'),
	msLazyGet = ms('lazyProp'),
	msLazyGetModule = ms('lazyGetModule'),
	msLset = ms('lset'),
	msMap = ms('map'),
	msSet = ms('set'),
	msShow = ms('show'),
	msCheckContains = ms('checkContains'),
	msUnlazy = ms('unlazy')

