import { last, type } from './util'

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
export default class CompileOptions {
	constructor(opts) {
		// TODO:ES6 Optional arguments
		if (opts === undefined) opts = { }
		type(opts, Object)

		const defaultTo = (name, _default) => {
			const _ = opts[name]
			if (_ === undefined)
				return _default
			else {
				type(_, _default.constructor)
				return _
			}
		}

		const define = (name, _default) => {
			this[`_${name}`] = defaultTo(name, _default)
		}

		const defaults = {
			includeAmdefine: true,
			includeSourceMap: true,
			includeModuleName: true,
			forceNonLazyModule: false,
			useStrict: true
		}

		for (const _ in defaults)
			define(_, defaults[_])

		this._inFile = opts.inFile
		if (this._inFile === undefined) {
			if (this._includeSourceMap)
				throw new Error('Either supply `inFile` option or make `includeSourceMap` false.')
			if (this._includeModuleName)
				throw new Error('Either supply `inFile` option or make `includeModuleName` false.')
		}

		let checks = opts.checks
		if (checks === undefined)
			checks = true
		const checkSubs = [ 'use', 'type', 'inout', 'case' ]
		this._check = { }
		if (typeof checks === 'boolean')
			for (const _ of checkSubs)
				this._check[_] = checks
		else {
			type(checks, Object)
			for (const _ of checkSubs) {
				type(checks[_], Boolean)
				this._check[_] = checks[_]
			}
		}
	}

	moduleName() { return noExt(basename(this._inFile)) }
	jsBaseName() { return `${this.moduleName()}.js` }
	modulePath() { return this._inFile }

	includeUseChecks() { return this._check.use }
	includeTypeChecks() { return this._check.type }
	includeInoutChecks() { return this._check.inout }
	includeCaseChecks() { return this._check.case }

	includeAmdefine() { return this._includeAmdefine }
	includeSourceMap() { return this._includeSourceMap }
	includeModuleName() { return this._includeModuleName }
	includeUseStrict() { return this._useStrict }

	lazyModule() { return !this._forceNonLazyModule }
}

const
	basename = path =>
		last(path.split('/')),
	extname = path =>
		last(path.split('.')),
	noExt = path =>
		// - 1 for the '.'
		path.substring(0, path.length - 1 - extname(path).length)
