import tupl from 'tupl/dist//tupl'
import { LocalAccess } from '../Expression'
import { isEmpty } from './U/Bag'
import { ObjType } from './U/types'

const Vr = ObjType('Vr', Object, {
	accessToLocal: Map,
	// LocalDeclare -> VrLocalInfo
	localToInfo: Map,
	endLoopToLoop: Map
})
export default Vr

export const emptyVr = () => Vr({
	accessToLocal: new Map(),
	localToInfo: new Map(),
	endLoopToLoop: new Map()
})

export const VrLocalInfo = tupl('VrLocalInfo', Object, 'doc',
	[ 'isInDebug', Boolean, 'debugAccesses', [LocalAccess], 'nonDebugAccesses', [LocalAccess] ])

Object.assign(Vr.prototype, {
	isAccessed(local) {
		const info = this.localToInfo.get(local)
		return !(isEmpty(info.debugAccesses) && isEmpty(info.nonDebugAccesses))
	}
})
