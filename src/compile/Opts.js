"use strict"

const
	types = require("./U/types")

module.exports = types.recordType("Opts", Object, {
	jsBaseName: String,
	msPathRelToJs: String,
	sourceMapPathRelToJs: String
})
