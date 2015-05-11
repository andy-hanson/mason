import tupl from 'tupl/dist//tupl'
import { LocalAccess } from '../Expression'
import { isEmpty } from './U/Bag'
import { ObjType } from './U/types'

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
	}

	isAccessed(local) {
		const info = this.localToInfo.get(local)
		return !(isEmpty(info.debugAccesses) && isEmpty(info.nonDebugAccesses))
	}

	listMapEntryIndex(entry) {
		return this.entryToIndex.get(entry)
	}

	listMapLength(returner) {
		return this.returnToLength.get(returner)
	}
}

export const VrLocalInfo = tupl('VrLocalInfo', Object, 'TODO:doc',
	[ 'isInDebug', Boolean, 'debugAccesses', [LocalAccess], 'nonDebugAccesses', [LocalAccess] ])
