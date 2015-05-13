import { last } from './U/Bag'
import { ObjType } from './U/types'
import { type } from './U/util'

/*
Opts object
mandatory:
	inFile: String
		path to input file.
		Optional if not includeSourceMap.

optional:
	checks: Boolean
		Whether to include assertions.
		Call also be { use, type, inout, case } for specific types of assertions.
	includeSourceMap: Boolean
	useStrict: Boolean
*/
export const OptsFromObject = obj => {
	const defaults = {
		checks: true,
		includeAmdefine: true,
		includeSourceMap: true,
		includeModuleDisplayName: true,
		forceNonLazyModule: false,
		useStrict: true
	}
	const opts = Object.assign({}, defaults, obj)
	if (!opts.inFile) {
		if (opts.includeSourceMap)
			throw new Error('Either supply `inFile` option or make `includeSourceMap` false.')
		if (opts.includeModuleDisplayName)
			throw new Error(
				'Either supply `inFile` option or make `includeModuleDisplayName` false.')
	}
	return new Opts(opts)
}

const Opts = ObjType('Opts', Object, {
	inFile: String,
	checks: Boolean,
	includeAmdefine: Boolean,
	includeSourceMap: Boolean,
	includeModuleDisplayName: Boolean,
	forceNonLazyModule: Boolean,
	useStrict: Boolean
})
export default Opts
Object.assign(Opts.prototype, {
	moduleName() { return noExt(basename(this.inFile)) },
	jsBaseName() { return `${this.moduleName()}.js` },
	modulePath() { return this.inFile },

	_check(name) {
		if (typeof this.checks === 'boolean')
			return this.checks
		else {
			type(this.checks[name], Boolean)
			return this.checks[name]
		}
	},
	includeUseChecks() { return this._check('use') },
	includeTypeChecks() { return this._check('type') },
	includeInoutChecks() { return this._check('inout') },
	includeCaseChecks() { return this._check('case') },

	amdefine() { return this.includeAmdefine },
	sourceMap() { return this.includeSourceMap },
	moduleDisplayName() { return this.includeModuleDisplayName },
	lazyModule() { return !this.forceNonLazyModule },

	includeUseStrict() { return this.useStrict }
})

const basename = path =>
	last(path.split('/'))
const extname = path =>
	last(path.split('.'))
const noExt = path =>
	// - 1 for the '.'
	path.substring(0, path.length - 1 - extname(path).length)
