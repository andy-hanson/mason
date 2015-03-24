import check, { fail } from '../check'
import E, { Assign, AssignDestructure, Call, Debug,
	Do, ELiteral, Null, Scope, Yield, YieldTo } from '../Expression'
import type, { isa } from '../U/type'
import { code, set } from '../U'
import { v } from './util'

export default function verifyLines(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	function processLine(inDebug) {
		type(inDebug, Boolean)
		return line => {
			if (isa(line, Scope)) {
				const localsBefore = prevLocals
				line.lines.forEach(processLine(inDebug))
				prevLocals = localsBefore
			}
			else if (isa(line, Debug))
				// TODO: Do anything in this situation?
				// check(!inDebug, line.span, 'Redundant `debug`.')
				line.lines.forEach(processLine(true))
			else {
				verifyIsStatement(line)
				const lineNews = lineNewLocals(line)
				prevLocals.forEach(prevLocal =>
					lineNews.forEach(newLocal =>
						check(prevLocal.name !== newLocal.name, newLocal.span,
							code(newLocal.name) +
							' already declared in same block at ' +
							prevLocal.span.start)))
				lineNews.forEach(_ => set(vx, 'isInDebug', inDebug).registerLocal(_))
				const newLocals = prevLocals.concat(lineNews)
				lineToLocals.set(line, prevLocals)
				prevLocals = newLocals
				// Final set value is answer
				allNewLocals = newLocals
			}
		}
	}

	lines.forEach(processLine(vx.isInDebug))

	function verifyLine(inDebug) {
		type(inDebug, Boolean)
		return line => {
			if (isa(line, Scope))
				line.lines.forEach(verifyLine(inDebug))
			else if (isa(line, Debug))
				line.lines.forEach(verifyLine(true))
			else {
				const vxDebug = set(vx, 'isInDebug', inDebug)
				const vxLineLocals = vxDebug.plusLocals(lineToLocals.get(line))
				const vxLine = set(vxLineLocals, 'pendingBlockLocals',
					vx.pendingBlockLocals.concat(allNewLocals))
				v(vxLine)(line)
			}
		}
	}

	lines.forEach(verifyLine(vx.isInDebug))

	return vx.plusLocals(allNewLocals)
}

// TODO: Clean up
function verifyIsStatement(line) {
	switch (true) {
		case isa(line, Do):
		// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
		case isa(line, Call):
		case isa(line, ELiteral) && line.k === 'js':
		// OK, used to mean `pass`
		case isa(line, Null):
		case isa(line, Yield):
		case isa(line, YieldTo):
			return
		default:
			fail(line.span, 'Expression in statement position.')
	}
}

function lineNewLocals(line) {
	type(line, E)
	return isa(line, Assign) ?
		[ line.assignee ] :
		isa(line, AssignDestructure) ?
		line.assignees :
		[ ]
}
