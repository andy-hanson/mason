const
	check = require("../check"),
	E = require("../E"),
	type = require("../U/type"),
	U = require("../U")
const
	v = require("./util").v

module.exports = function verifyLines(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	const processLine = function(inDebug) {
		type(inDebug, Boolean)
		return function(line) {
			if (type.isa(line, E.Scope)) {
				const localsBefore = prevLocals
				line.lines.forEach(processLine(inDebug))
				prevLocals = localsBefore
			}
			else if (type.isa(line, E.Debug))
				// TODO: Do anything in this situation?
				// check(!inDebug, line.span, "Redundant `debug`.")
				line.lines.forEach(processLine(true))
			else {
				verifyIsStatement(line)
				const lineNews = lineNewLocals(line)
				prevLocals.forEach(function(prevLocal) {
					lineNews.forEach(function(newLocal) {
						check(prevLocal.name !== newLocal.name, newLocal.span,
							U.code(newLocal.name) +
							" already declared in same block at " +
							prevLocal.span.start)
					})
				})
				lineNews.forEach(function(_) {
					U.with(vx, "isInDebug", inDebug).registerLocal(_)
				})
				const newLocals = prevLocals.concat(lineNews)
				lineToLocals.set(line, prevLocals)
				prevLocals = newLocals
				// Final set value is answer
				allNewLocals = newLocals
			}
		}
	}

	lines.forEach(processLine(vx.isInDebug))

	const verifyLine = function(inDebug) {
		type(inDebug, Boolean)
		return function(line) {
			if (type.isa(line, E.Scope))
				line.lines.forEach(verifyLine(inDebug))
			else if (type.isa(line, E.Debug))
				line.lines.forEach(verifyLine(true))
			else {
				const vxDebug = U.with(vx, "isInDebug", inDebug)
				const vxLineLocals = vxDebug.plusLocals(lineToLocals.get(line))
				const vxLine = U.with(vxLineLocals, "pendingBlockLocals",
					vx.pendingBlockLocals.concat(allNewLocals))
				v(vxLine)(line)
			}
		}
	}

	lines.forEach(verifyLine(vx.isInDebug))

	return vx.plusLocals(allNewLocals)
}

// TODO: Clean up
const verifyIsStatement = function(line) {
	switch (true) {
		case type.isa(line, E.Do):
		// Some E.Vals are also conceptually E.Dos, but this was easier than multiple inheritance.
		case type.isa(line, E.Call):
		case type.isa(line, E.Literal) && line.k === "js":
		// OK, used to mean `pass`
		case type.isa(line, E.Null):
		case type.isa(line, E.Yield):
		case type.isa(line, E.YieldTo):
			return
		default:
			check.fail(line.span, "Expression in statement position.")
	}
}

const lineNewLocals = function(line) {
	type(line, E)
	return type.isa(line, E.Assign) ?
		[ line.assignee ] :
		type.isa(line, E.AssignDestructure) ?
		line.assignees :
		[ ]
}
