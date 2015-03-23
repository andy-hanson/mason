import assert from "assert"
import Expression, { BlockWrap, CaseVal, LocalAccess } from "./Expression"
import { isEmpty } from "./U/Bag"
import type, { isa } from "./U/type"
import { ObjType } from "./U/types"

const Vr = ObjType("Vr", Object, {
	accessToLocal: Map,
	// LocalDeclare -> LocalInfo
	localToInfo: Map,
	eToIsInGenerator: Map
})
export default Vr

export const VrLocalInfo = ObjType("LocalInfo", Object, {
	isInDebug: Boolean,
	debugAccesses: [LocalAccess],
	nonDebugAccesses: [LocalAccess]
})

Object.assign(Vr.prototype, {
	isLazy(local) {
		type(local, LocalAccess)
		return this.accessToLocal.get(local).isLazy
	},
	setEIsInGenerator(e, is) {
		type(e, Expression, is, Boolean)
		assert(botherWithIsInGenerator(e))
		this.eToIsInGenerator.set(e, is)
	},
	eIsInGenerator(e) {
		assert(botherWithIsInGenerator(e))
		assert(this.eToIsInGenerator.has(e))
		return this.eToIsInGenerator.get(e)
	},
	isAccessed(local) {
		const info = this.localToInfo.get(local)
		return !isEmpty(info.debugAccesses.concat(info.nonDebugAccesses))
	}
})

const botherWithIsInGenerator = e =>
	isa(e, CaseVal) || isa(e, BlockWrap)
