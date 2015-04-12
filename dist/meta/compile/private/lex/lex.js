if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../Cx", "../U/type", "./group", "./Stream", "./ungrouped"], function (exports, module, _Cx, _UType, _group, _Stream, _ungrouped) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = lex;
	var SubContext = _Cx.SubContext;

	var type = _interopRequire(_UType);

	var group = _interopRequire(_group);

	var Stream = _interopRequire(_Stream);

	var ungrouped = _interopRequire(_ungrouped);

	function eager(gen) {
		const arr = [];
		for (let em of gen) arr.push(em);
		return arr[Symbol.iterator]();
	}

	function lex(cx, str) {
		// Lexing algorithm requires trailing newline
		str = str + "\n";
		const lx = new SubContext(cx);
		let ug = ungrouped(lx, new Stream(str), false);
		if (global.LOG_TIME) {
			console.time("ungrouped");
			ug = eager(ug);
			console.timeEnd("ungrouped");
		}
		if (global.LOG_TIME) console.time("group");
		const g = group(lx, ug);
		if (global.LOG_TIME) console.timeEnd("group");
		return g;
	}
});
//# sourceMappingURL=../../../../meta/compile/private/lex/lex.js.map