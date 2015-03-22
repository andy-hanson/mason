const
	Lang = require("./Lang"),
	Span = require("./Span"),
	type = require("./U/type"),
	types = require("./U/types"),
	U = require("./U")

const T = module.exports = types.abstractType("T", Object)

const Ts = {
	CallOnFocus: { name: String },
	DotName: { nDots: Number, name: String },
	Group: { sqt: [T], k: String },
	Keyword: { k: Lang.AllKeywords },
	Literal: { value: String, k: new Set([Number, String, "js"]) },
	Name: { name: String }
}
Object.keys(Ts).forEach(function(name) { T[name] = Span.spanType(name, T, Ts[name]) })

T.Keyword.is = function(k) {
	return function(t) {
		type(t, T)
		if (k instanceof Set)
			return type.isa(t, T.Keyword) && k.has(t.k)
		type(k, Lang.AllKeywords)
		return type.isa(t, T.Keyword) && t.k === k
	}
}

T.Group.is = function(k) {
	return function(t) {
		type(t, T, k, Lang.GroupKinds)
		return type.isa(t, T.Group) && t.k === k
	}
}

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
U.implementMany(T, "show", {
	CallOnFocus: function() { return "_" },
	DotName: function() { return ".".repeat(this.nDots) + this.name },
	Group: function() { return this.k + "..." + Lang.GroupOpenToClose.get(this.k) },
	Keyword: function() { return this.k },
	Literal: function() { return this.value },
	Name: function() { return this.name }
})

T.prototype.toString = function() { return U.code(this.show()) }
