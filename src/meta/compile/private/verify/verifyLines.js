import { code } from '../../CompileError'
import E, { Assign, AssignDestructure, Call, Debug, Do, ELiteral,
	GlobalAccess, Require, Special, Yield, YieldTo } from '../../Expression'
import type from '../U/type'
import { set } from '../U/util'
import { v } from './util'

export default function verifyLines(vx, lines) {
	const lineToLocals = new Map()
	let prevLocals = []
	let allNewLocals = []

	function processLine(line) {
		if (line instanceof Debug)
			// TODO: Do anything in this situation?
			// vx.check(!inDebug, line.loc, 'Redundant `debug`.')
			vx.withInDebug(true, () => line.lines.forEach(processLine))
		else {
			verifyIsStatement(vx, line)
			const lineNews = lineNewLocals(line)
			prevLocals.forEach(prevLocal =>
				lineNews.forEach(newLocal =>
					vx.check(
						prevLocal.name !== newLocal.name, newLocal.loc,
						`${code(newLocal.name)} already declared at ${prevLocal.loc.start}`)))
			lineNews.forEach(_ => vx.registerLocal(_))
			const newLocals = prevLocals.concat(lineNews)
			lineToLocals.set(line, prevLocals)
			prevLocals = newLocals
			// Final set value is answer
			allNewLocals = newLocals
		}
	}

	lines.forEach(processLine)

	function verifyLine(line) {
		if (line instanceof Debug)
			vx.withInDebug(true, () => line.lines.forEach(verifyLine))
		else
			vx.plusLocals(lineToLocals.get(line), () =>
				vx.plusPendingBlockLocals(allNewLocals, () =>
					v(vx)(line)))
	}

	lines.forEach(verifyLine)

	return allNewLocals
}

// TODO: Clean up
function verifyIsStatement(vx, line) {
	switch (true) {
		case line instanceof Do:
		// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
		case line instanceof Call:
		case line instanceof ELiteral && line.k === 'js':
		case line instanceof Special && line.k === 'debugger':
		// OK, used to mean `pass`
		case line instanceof GlobalAccess && line.name === 'null':
		case line instanceof Yield:
		case line instanceof YieldTo:
			return
		default:
			vx.fail(line.loc, 'Expression in statement position.')
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
