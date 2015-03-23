import { AllKeywords, GroupKinds, GroupOpenToClose } from "./Lang"
import { spanType } from "./Span"
import type, { isa } from "./U/type"
import { abstractType } from "./U/types"
import { implementMany2 } from "./U"

const T = abstractType("T", Object)
export default T

function t(name, props) {
	return spanType(name, T, props)
}

export const CallOnFocus = t("CallOnFocus", { name: String })
export const DotName = t("DotName", { nDots: Number, name: String })
export const Group = t("Group", { sqt: [T], k: String })
Group.is = function(k) {
	return function(t) {
		type(t, T, k, GroupKinds)
		return isa(t, Group) && t.k === k
	}
}
export const Keyword = t("Keyword", { k: AllKeywords })
Keyword.is = function(k) {
	return function(t) {
		type(t, T)
		if (k instanceof Set)
			return isa(t, Keyword) && k.has(t.k)
		type(k, AllKeywords)
		return isa(t, Keyword) && t.k === k
	}
}
export const Literal = t("Literal", { value: String, k: new Set([Number, String, "js"]) })
export const Name = t("Name", { name: String })

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
implementMany2(T, "show", [
	[CallOnFocus, () => "_"],
	[DotName, _ => ".".repeat(_.nDots) + _.name],
	[Group, _ => _.k + "..." + GroupOpenToClose.get(_.k)],
	[Keyword, _ => _.k],
	[Literal, _ => _.value],
	[Name, _ => _.name]
])

T.prototype.toString = function() { return U.code(this.show()) }
