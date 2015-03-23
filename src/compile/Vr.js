import assert from "assert"
import E, { BlockWrap, CaseVal, LocalAccess } from "./E"
import { isEmpty } from "./U/Sq"
import type, { isa } from "./U/type"
import { recordType } from "./U/types"

const Vr = recordType("Vr", Object, {
	accessToLocal: Map,
	// LocalDeclare -> LocalInfo
	localToInfo: Map,
	eToIsInGenerator: Map
})
export default Vr

export const VrLocalInfo = recordType("LocalInfo", Object, {
	isInDebug: Boolean,
	debugAccesses: [LocalAccess],
	nonDebugAccesses: [LocalAccess]
})

Object.assign(Vr.prototype, {
	isLazy: function(local) {
		type(local, LocalAccess)
		return this.accessToLocal.get(local).isLazy
	},
	setEIsInGenerator: function(e, is) {
		type(e, E, is, Boolean)
		assert(botherWithIsInGenerator(e))
		this.eToIsInGenerator.set(e, is)
	},
	eIsInGenerator: function(e) {
		assert(botherWithIsInGenerator(e))
		assert(this.eToIsInGenerator.has(e))
		return this.eToIsInGenerator.get(e)
	},
	isAccessed: function(local) {
		const info = this.localToInfo.get(local)
		return !isEmpty(info.debugAccesses.concat(info.nonDebugAccesses))
	}
})


const botherWithIsInGenerator = function(e) {
	return isa(e, CaseVal) || isa(e, BlockWrap)
}
