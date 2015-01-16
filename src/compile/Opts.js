"use strict"

const
	path = require("path"),
	types = require("./U/types")

const noExt = function(name) {
	return name.substring(0, name.length - path.extname(name).length)
}

module.exports = types.recordType("Opts", Object, {
	inFile: String,
	outDir: String,
	// TODO: { types: Boolean, inout: Boolean }
	checks: Boolean
})
Object.assign(module.exports.prototype, {
	moduleName: function() {
		return noExt(path.basename(this.inFile))
	},
	jsBaseName: function() {
		return this.moduleName() + ".js"
	},
	msPathRelToJs: function() {
		return path.relative(this.outDir, this.inFile)
	},
	sourceMapPathRelToJs: function() {
		return "./" + this.jsBaseName() + ".map"
	},
	includeTypeChecks: function() {
		return this.checks === true || this.checks.types
	},
	includeInoutChecks: function() {
		return this.checks === true || this.checks.inout
	}
})
