import Opts from "../Opts"
import { set } from "../U"
import { recordType } from "../U/types"
import Vr from "../Vr"

// Context used while rendering.
const Rx = module.exports = recordType("Rx", Object, {
	// Made entirely out of \t
	indent: String,
	opts: Opts,
	vr: Vr
})
Object.assign(Rx.prototype, {
	indented: function() { return set(this, "indent", "\t" + this.indent) },
	nl: function() { return "\n" + this.indent },
	snl: function() { return ";\n" + this.indent },
	cnl: function() { return ",\n" + this.indent }
})
