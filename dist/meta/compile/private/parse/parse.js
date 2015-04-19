if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../Expression', '../Token', '../U/util', './parseBlock', './parseUse', './vars'], function (exports, module, _Expression, _Token, _UUtil, _parseBlock, _parseUse, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = parse;

	var _tryParseUse2 = _interopRequire(_parseUse);

	function parse(cx, rootToken) {
		_UUtil.assert(_Token.Group.isBlock(rootToken));
		_vars.init(cx, rootToken.tokens, rootToken.loc);
		const res = parseModule();
		_vars.uninit();
		return res;
	}

	const parseModule = function () {
		var _tryParseUse = _tryParseUse2('use!');

		const doUses = _tryParseUse.uses;
		const rest = _tryParseUse.rest;

		var _w = _vars.w(rest, _tryParseUse2, 'use');

		const plainUses = _w.uses;
		const rest1 = _w.rest;

		var _w2 = _vars.w(rest1, _tryParseUse2, 'use~');

		const lazyUses = _w2.uses;
		const rest2 = _w2.rest;

		var _w3 = _vars.w(rest2, _tryParseUse2, 'use-debug');

		const debugUses = _w3.uses;
		const rest3 = _w3.rest;

		const block = _vars.w(rest3, _parseBlock.parseModuleBody);

		block.lines.forEach(function (line) {
			if (line instanceof _Expression.Assign && line.k === 'export') _vars.check(line.assignee.name !== 'displayName', 'Module can not choose its own displayName.');
		});
		if (_vars.cx.opts.moduleDisplayName()) block.lines.push(_Expression.Assign(_vars.loc, _Expression.LocalDeclare(_vars.loc, 'displayName', [], false, true), 'export', _Expression.ELiteral(_vars.loc, _vars.cx.opts.moduleName(), String)));

		const uses = plainUses.concat(lazyUses);
		return _Expression.Module(_vars.loc, doUses, uses, debugUses, block);
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parse.js.map