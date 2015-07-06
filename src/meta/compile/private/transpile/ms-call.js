import { CallExpression, Identifier } from 'esast/dist/ast'
import { member, thunk } from 'esast/dist/util'

const ms = name => {
	const m = member(IdMs, name)
	return (...args) => CallExpression(m, args)
}
export const
	IdMs = Identifier('_ms'),
	lazyWrap = value => msLazy(thunk(value)),
	msAdd = ms('add'),
	msAddMany = ms('addMany'),
	msArr = ms('arr'),
	msAssoc = ms('assoc'),
	msBool = ms('bool'),
	msCheckContains = ms('checkContains'),
	msError = ms('error'),
	msGet = ms('get'),
	msGetDefaultExport = ms('getDefaultExport'),
	msExtract = ms('extract'),
	msGetModule = ms('getModule'),
	msLazy = ms('lazy'),
	msLazyGet = ms('lazyProp'),
	msLazyGetModule = ms('lazyGetModule'),
	msMap = ms('map'),
	msSet = ms('set'),
	msSetName = ms('setName'),
	msSetLazy = ms('setLazy'),
	msShow = ms('show'),
	msSome = ms('some'),
	msUnlazy = ms('unlazy'),
	MsNone = member(IdMs, 'None')
