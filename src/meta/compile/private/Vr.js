import tupl from 'tupl/dist//tupl'
import { LocalAccess } from '../Expression'
import { isEmpty } from './U/Bag'

export default class Vr {
	constructor() {
		this.accessToLocal = new Map()
		// LocalDeclare -> VrLocalInfo
		this.localToInfo = new Map()
		this.endLoopToLoop = new Map()
		// ListEntry / MapEntry -> index
		this.entryToIndex = new Map()
		// ListReturn / MapReturn -> # entries
		this.returnToLength = new Map()
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

	listMapLength(returner) {
		return this.returnToLength.get(returner)
	}

	isExportAssign(assign) {
		return this.exportAssigns.has(assign)
	}
}

export const VrLocalInfo = tupl('VrLocalInfo', Object, 'TODO:doc',
	[ 'isInDebug', Boolean, 'debugAccesses', [LocalAccess], 'nonDebugAccesses', [LocalAccess] ])
