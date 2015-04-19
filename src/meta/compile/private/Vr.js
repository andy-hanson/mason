import tuple from 'esast/dist/private/tuple'
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

export const VrLocalInfo = tuple('VrLocalInfo', Object, 'doc',
	[ 'isInDebug', Boolean, 'debugAccesses', [LocalAccess], 'nonDebugAccesses', [LocalAccess] ])

Object.assign(Vr.prototype, {
	isAccessed(local) {
		const info = this.localToInfo.get(local)
		return !(isEmpty(info.debugAccesses) && isEmpty(info.nonDebugAccesses))
	}
})
