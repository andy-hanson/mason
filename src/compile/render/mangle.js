import type from "../U/type"

export default function mangle(name) {
	return JSKeywords.has(name) ?
		"_" + name :
		name.replace(/[^a-zA-Z0-9_]/g, ch => "_" + ch.charCodeAt(0))
}

export function needsMangle(name) {
	return JSKeywords.has(name) || name.search(/[^a-zA-Z0-9_]/) !== -1
}

export function quote(str) {
	type(str, String);
	const escaped = str.split('').map(ch => quoteEscape[ch] || ch).join('')
	return "\"" + escaped + "\""
}
const quoteEscape = {
	'\n': '\\n',
	'\t': '\\t',
	'"': "\\\"",
	'\\': "\\\\"
}

const JSKeywords = new Set([
	"abstract",
	"arguments",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"comment",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"function*",
	"global",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceOf",
	"int",
	"interface",
	"label",
	"long",
	"module",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"undefined",
	"var",
	"void",
	"while",
	"with",
	"yield",
	"yield*"
])
