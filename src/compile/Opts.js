import { basename, extname } from "path"
import { ObjType } from "./U/types"

const Opts = ObjType("Opts", Object, {
	inFile: String,
	checks: Boolean
})
export default Opts
Object.assign(Opts.prototype, {
	moduleName() {
		return noExt(basename(this.inFile))
	},
	jsBaseName() {
		return this.moduleName() + ".js"
	},
	modulePath() { return this.inFile },
	includeTypeChecks() { return this.checks },
	includeInoutChecks() { return this.checks },
	includeCaseChecks() { return this.checks }
})

function noExt(name) {
	return name.substring(0, name.length - extname(name).length)
}
