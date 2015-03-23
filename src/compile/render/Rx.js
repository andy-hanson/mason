import Opts from "../Opts"
import { set } from "../U"
import { ObjType } from "../U/types"
import Vr from "../Vr"

// Context used while rendering.
const Rx = ObjType("Rx", Object, {
	// Made entirely out of \t
	indent: String,
	opts: Opts,
	vr: Vr
})
export default Rx
Object.assign(Rx.prototype, {
	indented() { return set(this, "indent", "\t" + this.indent) },
	nl() { return "\n" + this.indent },
	snl() { return ";\n" + this.indent },
	cnl() { return ",\n" + this.indent }
})
