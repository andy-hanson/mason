const
	Opts = require("../Opts"),
	types = require("../U/types"),
	U = require("../U"),
	Vr = require("../Vr")

// Context used while rendering.
const Rx = module.exports = types.recordType("Rx", Object, {
	// Made entirely out of \t
	indent: String,
	opts: Opts,
	vr: Vr
})
Object.assign(Rx.prototype, {
	indented: function() { return U.with(this, "indent", "\t" + this.indent) },
	nl: function() { return "\n" + this.indent },
	snl: function() { return ";\n" + this.indent },
	cnl: function() { return ",\n" + this.indent }
})
