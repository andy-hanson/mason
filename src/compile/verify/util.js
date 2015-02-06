const v = function(vx) {
	return function(e) { e.verify(vx) }
}
const vm = function(vx, es) {
	es.forEach(v(vx))
}

module.exports = {
	v: v,
	vm: vm
}
