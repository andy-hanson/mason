const binOps = [ "&", "^", "<<", ">>", ">>>", "===", "<", ">", "<=", ">=", "+", "-", "*", "/", "%" ]
binOps.forEach(function(op) {
	exports["op" + op] = Function("a", "b", "return a " + op + " b")
})
exports["op-bar"] = function(a, b) { return a | b }
exports["op~"] = function(a) { return ~a }
