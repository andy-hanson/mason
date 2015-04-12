if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../CompileError", "../../Expression", "../U/type", "../U/util", "./util"], function (exports, module, _CompileError, _Expression, _UType, _UUtil, _util) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = verifyLines;
	var code = _CompileError.code;

	var E = _interopRequire(_Expression);

	var Assign = _Expression.Assign;
	var AssignDestructure = _Expression.AssignDestructure;
	var Call = _Expression.Call;
	var Debug = _Expression.Debug;
	var Do = _Expression.Do;
	var ELiteral = _Expression.ELiteral;
	var GlobalAccess = _Expression.GlobalAccess;
	var Require = _Expression.Require;
	var Special = _Expression.Special;
	var Yield = _Expression.Yield;
	var YieldTo = _Expression.YieldTo;

	var type = _interopRequire(_UType);

	var set = _UUtil.set;
	var v = _util.v;

	function verifyLines(vx, lines) {
		const lineToLocals = new Map();
		let prevLocals = [];
		let allNewLocals = [];

		function processLine(line) {
			if (line instanceof Debug)
				// TODO: Do anything in this situation?
				// vx.check(!inDebug, line.loc, 'Redundant `debug`.')
				vx.withInDebug(true, function () {
					return line.lines.forEach(processLine);
				});else {
				verifyIsStatement(vx, line);
				const lineNews = lineNewLocals(line);
				prevLocals.forEach(function (prevLocal) {
					return lineNews.forEach(function (newLocal) {
						return vx.check(prevLocal.name !== newLocal.name, newLocal.loc, "" + code(newLocal.name) + " already declared at " + prevLocal.loc.start);
					});
				});
				lineNews.forEach(function (_) {
					return vx.registerLocal(_);
				});
				const newLocals = prevLocals.concat(lineNews);
				lineToLocals.set(line, prevLocals);
				prevLocals = newLocals;
				// Final set value is answer
				allNewLocals = newLocals;
			}
		}

		lines.forEach(processLine);

		function verifyLine(line) {
			if (line instanceof Debug) vx.withInDebug(true, function () {
				return line.lines.forEach(verifyLine);
			});else vx.plusLocals(lineToLocals.get(line), function () {
				return vx.plusPendingBlockLocals(allNewLocals, function () {
					return v(vx)(line);
				});
			});
		}

		lines.forEach(verifyLine);

		return allNewLocals;
	}

	// TODO: Clean up
	function verifyIsStatement(vx, line) {
		switch (true) {
			case line instanceof Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof Call:
			case line instanceof ELiteral && line.k === "js":
			case line instanceof Special && line.k === "debugger":
			// OK, used to mean `pass`
			case line instanceof GlobalAccess && line.name === "null":
			case line instanceof Yield:
			case line instanceof YieldTo:
				return;
			default:
				vx.fail(line.loc, "Expression in statement position.");
		}
	}

	function lineNewLocals(line) {
		type(line, E);
		return line instanceof Assign ? [line.assignee] : line instanceof AssignDestructure ? line.assignees : [];
	}
});
//# sourceMappingURL=../../../../meta/compile/private/verify/verifyLines.js.map