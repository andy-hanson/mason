"use strict"

const
	assert = require("assert"),
	E = require("./E"),
	Lang = require("./Lang"),
	Sq = require("./U/Sq"),
	type = require("./U/type"),
	types = require("./U/types")

const Vr = module.exports = types.recordType("Vr", Object, {
	accessToLocal: Map,
	localToInfo: Map, // LocalDeclare -> LocalInfo
	eToIsInGenerator: Map
})
Object.assign(Vr.prototype, {
	isLazy: function(local) {
		type(local, E.LocalAccess)
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
		return !Sq.isEmpty(info.debugAccesses.concat(info.nonDebugAccesses))
	}
})

Vr.LocalInfo = types.recordType("LocalInfo", Object, {
	isInDebug: Boolean,
	debugAccesses: [E.LocalAccess],
	nonDebugAccesses: [E.LocalAccess]
})

const botherWithIsInGenerator = function(e) {
	return type.isa(e, E.CaseVal) || type.isa(e, E.BlockWrap)
}
