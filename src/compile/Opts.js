"use strict"

const
	types = require("./U/types")

module.exports = types.recordType("Opts", Object, {
	jsBaseName: String,
	msPathRelToJs: String,
	sourceMapPathRelToJs: String
})
Object.assign(module.exports.prototype, {
	moduleName: function() {
		return this.jsBaseName.substring(0, this.jsBaseName.length - 3)
	}
})
