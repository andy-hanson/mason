function setUnion() {
	const s = new Set()
	for (let i = 0; i < arguments.length; i = i + 1)
		for (let x of arguments[i].values())
			s.add(x)
	return s
}

const g = [ "<~", "<~~" ]
export const GeneratorKeywords = new Set(g)
export const AssignKeywords = new Set(["=", ". "].concat(g))

export const LineSplitKeywords = setUnion(AssignKeywords, new Set(["->"]))

// `export` is not a keyword, but `. ` assigns in module context become exports.
export const KAssign = setUnion(AssignKeywords, new Set(["export"]))
export const KFun = new Set(["|", "~|"])
export const CaseKeywords = new Set(["case", "case!"])
export const SpecialKeywords = new Set(["undefined", "this-module-directory"])
export const UseKeywords = new Set(["use", "use!", "use~"])

export const AllKeywords = setUnion(
	LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, new Set([
	"~",
	":",
	"_",
	"debug",
	"debugger",
	"else",
	"end-loop!",
	"in",
	"loop!",
	"out",
	"region",
	"this",
	// Kludge until ES6 modules work
	"undefined"
]))

export const ReservedWords = new Set([ "return" ])

export const GroupKinds = new Set(["(", "[", "{", "->", "ln", "sp", '"'])
export const GroupPres = setUnion(GroupKinds, new Set([")", "]", "}", "<-", 'close"']))

export const ReservedCharacters = new Set("`#;,")

export const GroupOpenToClose = new Map([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['->', '<-'],
	['ln', 'ln'],
	['sp', 'sp'],
	['"', 'close"']])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
export const isNameCharacter = function(ch) { return /[^()[\]{}\.:|_\ \\\n\t\""`#;,]/.test(ch) }

export const defaultLoopName = "anon-loop"

export const fileExtension = ".ms"
