import Opts from '../Opts'
import { set } from '../U'
import { ObjType } from '../U/types'
import Vr from '../Vr'

// Context used while rendering.
const Rx = ObjType('Rx', Object, { opts: Opts, vr: Vr })
export default Rx
