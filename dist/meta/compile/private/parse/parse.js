if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../Expression', '../Token', '../U/util', './parseBlock', './parseUse', './Px'], function (exports, module, _Expression, _Token, _UUtil, _parseBlock, _parseUse, _Px) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parse;

	var _tryParseUse2 = _interopRequire(_parseUse);

	var _Px2 = _interopRequire(_Px);

	function parse(cx, rootToken) {
		_UUtil.assert(_Token.Group.isBlock(rootToken));
		const px = new _Px2(cx, rootToken.tokens, rootToken.loc);
		return parseModule(px);
	}

	function parseModule(px) {
		var _tryParseUse = _tryParseUse2(px, 'use!');

		const doUses = _tryParseUse.uses;
		const rest = _tryParseUse.rest;

		var _px$w = px.w(rest, _tryParseUse2, 'use');

		const plainUses = _px$w.uses;
		const rest1 = _px$w.rest;

		var _px$w2 = px.w(rest1, _tryParseUse2, 'use~');

		const lazyUses = _px$w2.uses;
		const rest2 = _px$w2.rest;

		var _px$w3 = px.w(rest2, _tryParseUse2, 'use-debug');

		const debugUses = _px$w3.uses;
		const rest3 = _px$w3.rest;

		const block = px.w(rest3, _parseBlock.parseModuleBody);

		block.lines.forEach(function (line) {
			if (line instanceof _Expression.Assign && line.k === 'export') px.check(line.assignee.name !== 'displayName', 'Module can not choose its own displayName.');
		});
		if (px.opts().moduleDisplayName()) block.lines.push(_Expression.Assign(px.loc, _Expression.LocalDeclare(px.loc, 'displayName', [], false, true), 'export', _Expression.ELiteral(px.loc, px.opts().moduleName(), String)));

		const uses = plainUses.concat(lazyUses);
		return _Expression.Module(px.loc, doUses, uses, debugUses, block);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parse.js.map