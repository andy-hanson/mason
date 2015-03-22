import { AllKeywords, GroupKinds, GroupOpenToClose } from "./Lang"
import { spanType } from "./Span"
import type, { isa } from "./U/type"
import { abstractType } from "./U/types"
import { implementMany } from "./U"

const T = module.exports = abstractType("T", Object)

const Ts = {
	CallOnFocus: { name: String },
	DotName: { nDots: Number, name: String },
	Group: { sqt: [T], k: String },
	Keyword: { k: AllKeywords },
	Literal: { value: String, k: new Set([Number, String, "js"]) },
	Name: { name: String }
}
Object.keys(Ts).forEach(function(name) { T[name] = spanType(name, T, Ts[name]) })

T.Keyword.is = function(k) {
	return function(t) {
		type(t, T)
		if (k instanceof Set)
			return isa(t, T.Keyword) && k.has(t.k)
		type(k, AllKeywords)
		return isa(t, T.Keyword) && t.k === k
	}
}

T.Group.is = function(k) {
	return function(t) {
		type(t, T, k, GroupKinds)
		return isa(t, T.Group) && t.k === k
	}
}

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
implementMany(T, "show", {
	CallOnFocus: function() { return "_" },
	DotName: function() { return ".".repeat(this.nDots) + this.name },
	Group: function() { return this.k + "..." + GroupOpenToClose.get(this.k) },
	Keyword: function() { return this.k },
	Literal: function() { return this.value },
	Name: function() { return this.name }
})

T.prototype.toString = function() { return U.code(this.show()) }
