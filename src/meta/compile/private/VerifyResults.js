import tupl from 'tupl/dist//tupl'
import { LocalAccess } from '../MsAst'
import { isEmpty } from './util'

export default class VerifyResults {
	constructor() {
		this.accessToLocal = new Map()
		// LocalDeclare -> VrLocalInfo
		this.localToInfo = new Map()
		// BagEntry or MapEntry -> index
		this.entryToIndex = new Map()
		// BlockBag / BlockMap -> # entries
		this.blockToLength = new Map()
		// TODO:ES6 Can use do `export { a, b, ... }` at the end, so shouldn't need this.
		// Includes both Assigns and AssignDestructures.
		this.exportAssigns = new Set()
	}

	isDebugLocal(localDeclare) {
		return this.localToInfo.get(localDeclare).isInDebug
	}

	isAccessed(localDeclare) {
		const info = this.localToInfo.get(localDeclare)
		return !(isEmpty(info.debugAccesses) && isEmpty(info.nonDebugAccesses))
	}

	listMapEntryIndex(entry) {
		return this.entryToIndex.get(entry)
	}

	listMapLength(block) {
		return this.blockToLength.get(block)
	}

	isExportAssign(assign) {
		return this.exportAssigns.has(assign)
	}
}

export const LocalInfo = tupl('VrLocalInfo', Object, 'TODO:doc',
	[ 'isInDebug', Boolean, 'debugAccesses', [LocalAccess], 'nonDebugAccesses', [LocalAccess] ])
