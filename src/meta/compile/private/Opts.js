import { last } from './U/Bag'
import { ObjType } from './U/types'

const Opts = ObjType('Opts', Object, {
	inFile: String,
	checks: Boolean
})
export default Opts
Object.assign(Opts.prototype, {
	moduleName() {
		return noExt(basename(this.inFile))
	},
	jsBaseName() {
		return `${this.moduleName()}.js`
	},
	modulePath() { return this.inFile },
	includeTypeChecks() { return this.checks },
	includeInoutChecks() { return this.checks },
	includeCaseChecks() { return this.checks }
})

const basename = path =>
	last(path.split('/'))
const extname = path =>
	last(path.split('.'))
const noExt = path =>
	path.substring(0, path.length - extname(path).length)
