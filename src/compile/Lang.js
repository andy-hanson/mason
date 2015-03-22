const setUnion = function() {
	const s = new Set()
	for (let i = 0; i < arguments.length; i = i + 1)
		for (let x of arguments[i].values())
			s.add(x)
	return s
}

const g = ["<~", "<~~"]
const GeneratorKeywords = new Set(g)
const AssignKeywords = new Set(["=", ". "].concat(g))

const LineSplitKeywords = setUnion(AssignKeywords, new Set(["->"]))

// `export` is not a keyword, but `. ` assigns in module context become exports.
const KAssign = setUnion(AssignKeywords, new Set(["export"]))
const KFun = new Set(["|", "~|"])
const CaseKeywords = new Set(["case", "case!"])
const SpecialKeywords = new Set(["undefined", "this-module-directory"])
const UseKeywords = new Set(["use", "use!", "use~"])
const AllKeywords = setUnion(
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

const ReservedWords = new Set([ "return" ])

const GroupKinds = new Set(["(", "[", "{", "->", "ln", "sp", '"'])
const GroupPres = setUnion(GroupKinds, new Set([")", "]", "}", "<-", 'close"']))

const ReservedCharacters = new Set("`#;,")

const GroupOpenToClose = new Map([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['->', '<-'],
	['ln', 'ln'],
	['sp', 'sp'],
	['"', 'close"']])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
const isNameCharacter = function(ch) { return /[^()[\]{}\.:|_\ \\\n\t\""`#;,]/.test(ch) }


module.exports = {
	AllKeywords: AllKeywords,
	GeneratorKeywords: GeneratorKeywords,
	AssignKeywords: AssignKeywords,
	LineSplitKeywords: LineSplitKeywords,
	CaseKeywords: CaseKeywords,
	SpecialKeywords: SpecialKeywords,
	UseKeywords: UseKeywords,
	KFun: KFun,
	KAssign: KAssign,
	GroupOpenToClose: GroupOpenToClose,
	GroupKinds: GroupKinds,
	GroupPres: GroupPres,
	ReservedCharacters: ReservedCharacters,
	ReservedWords: ReservedWords,
	isNameCharacter: isNameCharacter,
	defaultLoopName: "anon-loop",
	fileExtension: ".ms"
}
