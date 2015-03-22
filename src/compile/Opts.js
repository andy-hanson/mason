const
	path = require("path"),
	types = require("./U/types")

const Opts = types.recordType("Opts", Object, {
	inFile: String,
	checks: Boolean
})
export default Opts
Object.assign(Opts.prototype, {
	moduleName: function() {
		return noExt(path.basename(this.inFile))
	},
	jsBaseName: function() {
		return this.moduleName() + ".js"
	},
	modulePath: function() { return this.inFile },

	includeTypeChecks: function() { return this.checks },
	includeInoutChecks: function() { return this.checks },
	includeCaseChecks: function() { return this.checks }
})

function noExt(name) {
	return name.substring(0, name.length - path.extname(name).length)
}
