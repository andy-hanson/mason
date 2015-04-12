if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "../../Expression", "../Opts", "../Token", "../U/Slice", "../U/type", "../U/util", "./parseBlock", "./parseUse", "./Px"], function (exports, module, _Expression, _Opts, _Token, _USlice, _UType, _UUtil, _parseBlock, _parseUse, _Px) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = parse;
	var Assign = _Expression.Assign;
	var Do = _Expression.Do;
	var Debug = _Expression.Debug;
	var ELiteral = _Expression.ELiteral;
	var LocalDeclare = _Expression.LocalDeclare;
	var Module = _Expression.Module;

	var Opts = _interopRequire(_Opts);

	var Group = _Token.Group;

	var Slice = _interopRequire(_USlice);

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var parseModuleBody = _parseBlock.parseModuleBody;

	var tryParseUse = _interopRequire(_parseUse);

	var Px = _interopRequire(_Px);

	function parse(cx, rootToken) {
		assert(Group.isBlock(rootToken));
		const px = new Px(cx, rootToken.tokens, rootToken.loc);
		return parseModule(px);
	}

	function parseModule(px) {
		var _tryParseUse = tryParseUse(px, "use!");

		const doUses = _tryParseUse.uses;
		const rest = _tryParseUse.rest;

		var _px$w = px.w(rest, tryParseUse, "use");

		const plainUses = _px$w.uses;
		const rest1 = _px$w.rest;

		var _px$w2 = px.w(rest1, tryParseUse, "use~");

		const lazyUses = _px$w2.uses;
		const rest2 = _px$w2.rest;

		var _px$w3 = px.w(rest2, tryParseUse, "use-debug");

		const debugUses = _px$w3.uses;
		const rest3 = _px$w3.rest;

		const block = px.w(rest3, parseModuleBody);

		block.lines.forEach(function (line) {
			if (line instanceof Assign && line.k === "export") px.check(line.assignee.name !== "displayName", "Module can not choose its own displayName.");
		});
		if (px.opts().moduleDisplayName()) block.lines.push(Assign(px.loc, LocalDeclare(px.loc, "displayName", [], false, true), "export", ELiteral(px.loc, px.opts().moduleName(), String)));

		const uses = plainUses.concat(lazyUses);
		return Module(px.loc, doUses, uses, debugUses, block);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parse.js.map