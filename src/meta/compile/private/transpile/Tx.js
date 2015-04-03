import { SubContext } from '../Cx'

export default class Tx extends SubContext {
	constructor(cx, vr) {
		super(cx)
		this.vr = vr
	}
}
