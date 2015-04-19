if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../../CompileError', '../../Expression', '../Token', '../U/Bag', '../U/Op', '../U/util', './parseBlock', './parseLocalDeclares', './vars'], function (exports, module, _CompileError, _Expression, _Token, _UBag, _UOp, _UUtil, _parseBlock, _parseLocalDeclares, _vars) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = tryParseUse;

	var _parseLocalDeclares2 = _interopRequire(_parseLocalDeclares);

	function tryParseUse(k) {
		if (!_vars.tokens.isEmpty()) {
			const l0 = _vars.tokens.head();
			_UUtil.assert(_Token.Group.isLine(l0));
			if (_Token.Keyword.is(k)(l0.tokens.head())) return {
				uses: _vars.w(l0.tokens.tail(), parseUse, k),
				rest: _vars.tokens.tail()
			};
		}
		return { uses: [], rest: _vars.tokens };
	}

	const parseUse = function (k) {
		var _takeBlockLinesFromEnd = _parseBlock.takeBlockLinesFromEnd();

		const before = _takeBlockLinesFromEnd.before;
		const lines = _takeBlockLinesFromEnd.lines;

		_vars.check(before.isEmpty(), function () {
			return 'Did not expect anything after ' + _CompileError.code(k) + ' other than a block';
		});
		return lines.map(function (line) {
			return _vars.w(line.tokens, useLine, k);
		});
	},
	     

	// TODO:ES6 Just use module imports, no AssignDestructure needed
	useLine = function (k) {
		const tReq = _vars.tokens.head();

		var _wt = _vars.wt(tReq, parseRequire);

		const path = _wt.path;
		const name = _wt.name;

		if (k === 'use!') {
			_vars.check(_vars.tokens.size() === 1, function () {
				return 'Unexpected ' + _vars.tokens[1];
			});
			return _Expression.UseDo(_vars.loc, path);
		} else {
			const isLazy = k === 'use~' || k === 'use-debug';

			var _w = _vars.w(_vars.tokens.tail(), parseThingsUsed, name, isLazy);

			const used = _w.used;
			const opUseDefault = _w.opUseDefault;

			return _Expression.Use(_vars.loc, path, used, opUseDefault);
		}
	},
	      parseThingsUsed = function (name, isLazy) {
		const useDefault = function () {
			return _Expression.LocalDeclare(_vars.loc, name, _UOp.None, isLazy, false);
		};
		if (_vars.tokens.isEmpty()) return { used: [], opUseDefault: _UOp.some(useDefault()) };else {
			const hasDefaultUse = _Token.Keyword.isFocus(_vars.tokens.head());
			const opUseDefault = _UOp.opIf(hasDefaultUse, useDefault);
			const rest = hasDefaultUse ? _vars.tokens.tail() : _vars.tokens;
			const used = _vars.w(rest, _parseLocalDeclares2).map(function (l) {
				_vars.check(l.name !== '_', function () {
					return '' + _CompileError.code('_') + ' not allowed as import name.';
				});
				l.isLazy = isLazy;
				return l;
			});
			return { used: used, opUseDefault: opUseDefault };
		}
	},
	      parseRequire = function () {
		_UUtil.assert(_vars.tokens.size() === 1);
		const t = _vars.tokens.head();
		if (t instanceof _Token.Name) return { path: t.name, name: t.name };else if (t instanceof _Token.DotName) return parseLocalRequire();else {
			_vars.check(_Token.Group.isSpaced(t), 'Not a valid module name.');
			return _vars.w(t.tokens, parseLocalRequire);
		}
	},
	      parseLocalRequire = function () {
		const first = _vars.tokens.head();
		let parts = [];
		if (first instanceof _Token.DotName) parts = first.nDots === 1 ? ['.'] : _UBag.repeat('..', first.nDots - 1);else _vars.cx.check(first instanceof _Token.Name, first.loc, 'Not a valid part of module path.');
		parts.push(first.name);
		_vars.tokens.tail().each(function (t) {
			_vars.cx.check(t instanceof _Token.DotName && t.nDots === 1, t.loc, 'Not a valid part of module path.');
			parts.push(t.name);
		});
		return {
			path: parts.join('/'),
			name: _vars.tokens.last().name
		};
	};
});
//# sourceMappingURL=../../../../meta/compile/private/parse/parseUse.js.map