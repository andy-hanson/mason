import check from "../check"
import type, { isa } from "../U/type"
import { code, set } from "../U"
import { v } from "./util"
const
	E = require("../E")

module.exports = function verifyLines(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	const processLine = function(inDebug) {
		type(inDebug, Boolean)
		return function(line) {
			if (isa(line, E.Scope)) {
				const localsBefore = prevLocals
				line.lines.forEach(processLine(inDebug))
				prevLocals = localsBefore
			}
			else if (isa(line, E.Debug))
				// TODO: Do anything in this situation?
				// check(!inDebug, line.span, "Redundant `debug`.")
				line.lines.forEach(processLine(true))
			else {
				verifyIsStatement(line)
				const lineNews = lineNewLocals(line)
				prevLocals.forEach(function(prevLocal) {
					lineNews.forEach(function(newLocal) {
						check(prevLocal.name !== newLocal.name, newLocal.span,
							code(newLocal.name) +
							" already declared in same block at " +
							prevLocal.span.start)
					})
				})
				lineNews.forEach(function(_) {
					set(vx, "isInDebug", inDebug).registerLocal(_)
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
			if (isa(line, E.Scope))
				line.lines.forEach(verifyLine(inDebug))
			else if (isa(line, E.Debug))
				line.lines.forEach(verifyLine(true))
			else {
				const vxDebug = set(vx, "isInDebug", inDebug)
				const vxLineLocals = vxDebug.plusLocals(lineToLocals.get(line))
				const vxLine = set(vxLineLocals, "pendingBlockLocals",
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
		case isa(line, E.Do):
		// Some E.Vals are also conceptually E.Dos, but this was easier than multiple inheritance.
		case isa(line, E.Call):
		case isa(line, E.Literal) && line.k === "js":
		// OK, used to mean `pass`
		case isa(line, E.Null):
		case isa(line, E.Yield):
		case isa(line, E.YieldTo):
			return
		default:
			fail(line.span, "Expression in statement position.")
	}
}

const lineNewLocals = function(line) {
	type(line, E)
	return isa(line, E.Assign) ?
		[ line.assignee ] :
		isa(line, E.AssignDestructure) ?
		line.assignees :
		[ ]
}
