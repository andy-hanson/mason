"use strict"

const setUnion = function() {
	const s = new Set()
	for (let i = 0; i < arguments.length; i++)
		for (let x of arguments[i].values())
			s.add(x)
	return s
}

const AssignKeywords = new Set(["=", "~=", ":=", "::=", ". ", "<~", "<~~"])

const LineSplitKeywords = setUnion(AssignKeywords, new Set(["->"]))

// `export` is not a keyword, but `. ` assigns in module context become exports.
const KAssign = setUnion(AssignKeywords, new Set(["export"]))
const FnKeywords = new Set(["|", "~|"])
const CaseKeywords = new Set(["case", "case!"])
const AllKeywords = setUnion(LineSplitKeywords, FnKeywords, CaseKeywords, new Set([
	"~",
	":",
	"_",
	"debugger",
	"else",
	"end-loop!",
	"in",
	"loop!",
	"out",
	"region",
	"this",
	"use"
]))

const ReservedWords = new Set([ "return" ])

const GroupKinds = new Set(["(", "[", "{", "->", "ln", "sp", '"'])
const GroupPres = setUnion(GroupKinds, new Set([")", "]", "}", "<-"]))

const KLocal = new Set([ "const", "lazy", "mutable" ])

const ReservedCharacters = new Set("`@#$;',")

const GroupOpenToClose = new Map([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['->', '<-'],
	['ln', 'ln'],
	['sp', 'sp'],
	['"', '"']])

const JSKeywords = new Set(["null", "this", "debugger"])

// Anything not explicitly reserved is a valid name character.
// A `~` may appear in a name, but not at the beginning.
const isNameCharacter = function(ch) { return /[^()[\]{}\.:|_\ \\\n\t\""`@#$;,']/.test(ch) }

module.exports = {
	AllKeywords: AllKeywords,
	AssignKeywords: AssignKeywords,
	LineSplitKeywords: LineSplitKeywords,
	CaseKeywords: CaseKeywords,
	FnKeywords: FnKeywords,
	KAssign: KAssign,
	GroupOpenToClose: GroupOpenToClose,
	GroupKinds: GroupKinds,
	GroupPres: GroupPres,
	JSKeywords: JSKeywords,
	KLocal: KLocal,
	ReservedCharacters: ReservedCharacters,
	ReservedWords: ReservedWords,
	isNameCharacter: isNameCharacter,
	defaultLoopName: "anon-loop",
	fileExtension: ".ms"
}
