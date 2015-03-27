import check, { fail } from '../check'
import E, { Assign, AssignDestructure, Call, Debug,
	Do, ELiteral, Require, Scope, Special, Yield, YieldTo } from '../Expression'
import type from '../U/type'
import { code, set } from '../U'
import { v } from './util'

export default function verifyLines(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	function processLine(inDebug) {
		type(inDebug, Boolean)
		return line => {
			if (line instanceof Scope) {
				const localsBefore = prevLocals
				line.lines.forEach(processLine(inDebug))
				prevLocals = localsBefore
			}
			else if (line instanceof Debug)
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
			if (line instanceof Scope)
				line.lines.forEach(verifyLine(inDebug))
			else if (line instanceof Debug)
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
		case line instanceof Do:
		// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
		case line instanceof Call:
		case line instanceof ELiteral && line.k === 'js':
		// OK, used to mean `pass`
		case line instanceof Special && line.k === 'null':
		case line instanceof Yield:
		case line instanceof YieldTo:
			return
		default:
			fail(line.span, 'Expression in statement position.')
	}
}

function lineNewLocals(line) {
	type(line, E)
	return line instanceof Assign ?
		[ line.assignee ] :
		line instanceof AssignDestructure ?
		line.assignees :
		[ ]
}
