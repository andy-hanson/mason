import { AllKeywords, GroupKinds, GroupOpenToClose } from "./Lang"
import { spanType } from "./Span"
import type, { isa } from "./U/type"
import { abstractType } from "./U/types"
import { code, implementMany2 } from "./U"

const Token = abstractType("Token", Object)
export default Token

function t(name, props) {
	return spanType(name, Token, props)
}

export const CallOnFocus = t("CallOnFocus", { name: String })
export const DotName = t("DotName", { nDots: Number, name: String })
export const Group = t("Group", { sqt: [Token], k: String })
Group.is = k => t => {
	type(t, Token, k, GroupKinds)
	return isa(t, Group) && t.k === k
}
export const Keyword = t("Keyword", { k: AllKeywords })
Keyword.is = k => {
	if (k instanceof Set)
		return t => {
			type(t, Token)
			return isa(t, Keyword) && k.has(t.k)
		}
	else {
		type(k, AllKeywords)
		return t => {
			type(t, Token)
			return isa(t, Keyword) && t.k === k
		}
	}
}

export const Literal = t("Literal", { value: String, k: new Set([Number, String, "js"]) })
export const Name = t("Name", { name: String })

// toString is used by some parsing errors. Use U.inspect for a more detailed view.
implementMany2("show", [
	[CallOnFocus, () => "_"],
	[DotName, _ => ".".repeat(_.nDots) + _.name],
	[Group, _ => _.k + "..." + GroupOpenToClose.get(_.k)],
	[Keyword, _ => _.k],
	[Literal, _ => _.value],
	[Name, _ => _.name]
])
Object.assign(Token.prototype, {
	toString() {
		return code(this.show())
	}
})
