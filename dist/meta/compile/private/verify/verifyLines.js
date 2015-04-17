if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../U/type', './util'], function (exports, module, _CompileError, _Expression, _UType, _util) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = verifyLines;

	var _E = _interopRequire(_Expression);

	var _type = _interopRequire(_UType);

	function verifyLines(vx, lines) {
		const lineToLocals = new Map();
		let prevLocals = [];
		let allNewLocals = [];

		function processLine(line) {
			if (line instanceof _Expression.Debug)
				// TODO: Do anything in this situation?
				// vx.check(!inDebug, line.loc, 'Redundant `debug`.')
				vx.withInDebug(true, function () {
					return line.lines.forEach(processLine);
				});else {
				verifyIsStatement(vx, line);
				const lineNews = lineNewLocals(line);
				prevLocals.forEach(function (prevLocal) {
					return lineNews.forEach(function (newLocal) {
						return vx.check(prevLocal.name !== newLocal.name, newLocal.loc, '' + _CompileError.code(newLocal.name) + ' already declared at ' + prevLocal.loc.start);
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
			if (line instanceof _Expression.Debug) vx.withInDebug(true, function () {
				return line.lines.forEach(verifyLine);
			});else vx.plusLocals(lineToLocals.get(line), function () {
				return vx.plusPendingBlockLocals(allNewLocals, function () {
					return _util.v(vx)(line);
				});
			});
		}

		lines.forEach(verifyLine);

		return allNewLocals;
	}

	// TODO: Clean up
	function verifyIsStatement(vx, line) {
		switch (true) {
			case line instanceof _Expression.Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof _Expression.Call:
			case line instanceof _Expression.ELiteral && line.k === 'js':
			case line instanceof _Expression.Special && line.k === 'debugger':
			// OK, used to mean `pass`
			case line instanceof _Expression.GlobalAccess && line.name === 'null':
			case line instanceof _Expression.Yield:
			case line instanceof _Expression.YieldTo:
				return;
			default:
				vx.fail(line.loc, 'Expression in statement position.');
		}
	}

	function lineNewLocals(line) {
		_type(line, _E);
		return line instanceof _Expression.Assign ? [line.assignee] : line instanceof _Expression.AssignDestructure ? line.assignees : [];
	}
});
//# sourceMappingURL=../../../../meta/compile/private/verify/verifyLines.js.map