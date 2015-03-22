export function v(vx) {
	return function(e) {
		e.verify(vx)
	}
}
export function vm(vx, es) {
	es.forEach(v(vx))
}
