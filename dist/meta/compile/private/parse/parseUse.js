if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../Lang', '../Token', '../U/Bag', '../U/Op', '../U/type', '../U/util', './Px', './parseBlock', './parseLocalDeclares'], function (exports, module, _CompileError, _Expression, _Lang, _Token, _UBag, _UOp, _UType, _UUtil, _Px, _parseBlock, _parseLocalDeclares) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = tryParseUse;

	var _type = _interopRequire(_UType);

	var _Px2 = _interopRequire(_Px);

	function tryParseUse(px, k) {
		_type(px, _Px2, k, _Lang.UseKeywords);
		if (!px.tokens.isEmpty()) {
			const l0 = px.tokens.head();
			_UUtil.assert(_Token.Group.isLine(l0));
			if (_Token.Keyword.is(k)(l0.tokens.head())) return {
				uses: px.w(l0.tokens.tail(), parseUse, k),
				rest: px.tokens.tail()
			};
		}
		return { uses: [], rest: px.tokens };
	}

	function parseUse(px, k) {
		_type(px, _Px2, k, _Lang.UseKeywords);

		var _PB$takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd(px);

		const before = _PB$takeBlockLinesFromEnd.before;
		const lines = _PB$takeBlockLinesFromEnd.lines;

		px.check(before.isEmpty(), function () {
			return 'Did not expect anything after ' + _CompileError.code(k) + ' other than a block';
		});
		return lines.map(function (line) {
			return px.w(line.tokens, useLine, k);
		});
	}

	// TODO:ES6 Just use module imports, no AssignDestructure needed
	function useLine(px, k) {
		const tReq = px.tokens.head();

		var _px$wt = px.wt(tReq, parseRequire);

		const path = _px$wt.path;
		const name = _px$wt.name;

		if (k === 'use!') {
			px.check(px.tokens.size() === 1, function () {
				return 'Unexpected ' + px.tokens[1];
			});
			return _Expression.UseDo(px.loc, path);
		} else {
			const isLazy = k === 'use~' || k === 'use-debug';

			var _px$w = px.w(px.tokens.tail(), parseThingsUsed, name, isLazy);

			const used = _px$w.used;
			const opUseDefault = _px$w.opUseDefault;

			return _Expression.Use(px.loc, path, used, opUseDefault);
		}
	}

	function parseThingsUsed(px, name, isLazy) {
		const useDefault = function () {
			return _Expression.LocalDeclare(px.loc, name, _UOp.None, isLazy, false);
		};
		if (px.tokens.isEmpty()) return { used: [], opUseDefault: _UOp.some(useDefault()) };else {
			const hasDefaultUse = _Token.Keyword.isFocus(px.tokens.head());
			const opUseDefault = _UOp.opIf(hasDefaultUse, useDefault);
			const rest = hasDefaultUse ? px.tokens.tail() : px.tokens;
			const used = px.w(rest, _parseLocalDeclares.default).map(function (l) {
				px.check(l.name !== '_', function () {
					return '' + _CompileError.code('_') + ' not allowed as import name.';
				});
				l.isLazy = isLazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	}

	function parseRequire(px) {
		_UUtil.assert(px.tokens.size() === 1);
		const t = px.tokens.head();
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return parseLocalRequire(px);else {
			px.check(_Token.Group.isSpaced(t), 'Not a valid module name.');
			return px.w(t.tokens, parseLocalRequire);
		}
	}

	function parseLocalRequire(px) {
		const first = px.tokens.head();
		let parts = [];
		if (first instanceof _Token.DotName) parts = first.nDots === 1 ? ['.'] : _UBag.repeat('..', first.nDots - 1);else px.check(first instanceof _Token.Name, first.loc, 'Not a valid part of module path.');
		parts.push(first.name);
		px.tokens.tail().each(function (t) {
			px.check(t instanceof _Token.DotName && t.nDots === 1, t.loc, 'Not a valid part of module path.');
			parts.push(t.name);
		});
		return {
			path: parts.join('/'),
			name: px.tokens.last().name
		};
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseUse.js.map