if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../Token', '../U/Bag', '../U/util', './GroupPre'], function (exports, module, _esastDistLoc, _Token, _UBag, _UUtil, _GroupPre) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = group;

	var _Loc = _interopRequire(_esastDistLoc);

	var _Token2 = _interopRequire(_Token);

	function group(cx, preGroupedTokens) {
		// Stack of GroupBuilders
		const stack = [];
		let cur;

		const newLevel = function (pos, k) {
			stack.push(cur);
			cur = _Token.Group(_Loc(pos, null), [], k);
		},
		      finishLevels = function (closePos, k) {
			// We may close other groups. For example, a G_Line can close a G_Paren.
			while (true) {
				const close = _GroupPre.groupOpenToClose(cur.k);
				if (close === k) break;else {
					cx.check(cur.k === _GroupPre.GP_OpenParen || cur.k === _GroupPre.GP_OpenBracket || cur.k === _GroupPre.GP_Space, closePos, function () {
						return 'Trying to close ' + showGroup(k) + ', but last opened was ' + showGroup(cur.k);
					});
					finishLevel(closePos, close);
				}
			}
			finishLevel(closePos, k);
		},
		      finishLevel = function (closePos, k) {
			let wrapped = wrapLevel(closePos);
			// cur is now the previous level on the stack
			// Don't add line/spaced
			switch (k) {
				case _GroupPre.GP_Space:
					{
						const size = wrapped.tokens.length;
						if (size === 0) return;else if (size === 1)
							// Spaced should always have at least two elements
							wrapped = _UBag.head(wrapped.tokens);
						break;
					}
				case _GroupPre.GP_Line:
					if (_UBag.isEmpty(wrapped.tokens)) return;
					break;
				case _GroupPre.GP_CloseBlock:
					if (_UBag.isEmpty(wrapped.tokens)) cx.fail(closePos, 'Empty block');
				default:
				// fallthrough
			}
			cur.tokens.push(wrapped);
		},
		      wrapLevel = function (closePos) {
			const builtGroup = cur;
			cur = stack.pop();
			builtGroup.loc.end = closePos;
			return builtGroup;
		},
		      startLine = function (pos) {
			newLevel(pos, _GroupPre.GP_Line);
			newLevel(pos, _GroupPre.GP_Space);
		},
		      endLine = function (pos) {
			finishLevels(pos, _GroupPre.GP_Space);
			finishLevels(pos, _GroupPre.GP_Line);
		},
		      endAndStart = function (loc, k) {
			finishLevels(loc.start, k);
			newLevel(loc.end, k);
		};

		cur = _Token.Group(_Loc(_esastDistLoc.StartPos, null), [], _GroupPre.GP_OpenBlock);
		startLine(_esastDistLoc.StartPos);

		let endLoc = _Loc(_esastDistLoc.StartPos, _esastDistLoc.StartPos);
		preGroupedTokens.forEach(function (_) {
			if (_ instanceof _Token2) cur.tokens.push(_);else {
				// It's a GroupPre
				const loc = _.loc;
				endLoc = loc;
				const k = _.k;
				switch (k) {
					case _GroupPre.GP_OpenParen:case _GroupPre.GP_OpenBracket:
						newLevel(loc.start, k);
						newLevel(loc.end, _GroupPre.GP_Space);
						break;
					case _GroupPre.GP_CloseParen:case _GroupPre.GP_CloseBracket:
						finishLevels(loc.end, k);
						break;
					case _GroupPre.GP_OpenQuote:
						newLevel(loc.start, k);
						break;
					case _GroupPre.GP_CloseQuote:
						finishLevels(loc.start, k);
						break;
					case _GroupPre.GP_OpenBlock:
						//  ~ before block is OK
						if (_UBag.isEmpty(cur.tokens) || !_Token.Keyword.isTilde(_UBag.last(cur.tokens))) endAndStart(loc, _GroupPre.GP_Space);
						newLevel(loc.start, k);
						startLine(loc.end);
						break;
					case _GroupPre.GP_CloseBlock:
						endLine(loc.start);
						finishLevels(loc.end, k);
						break;
					case _GroupPre.GP_Line:
						endLine(loc.start);
						startLine(loc.end);
						break;
					case _GroupPre.GP_Space:
						endAndStart(loc, k);
						break;
					default:
						throw new Error(k);
				}
			}
		});

		endLine(endLoc.end);
		_UUtil.assert(_UBag.isEmpty(stack));
		cur.loc.end = endLoc.end;
		return cur;
	}

	// TODO
	const showGroup = function (k) {
		return k;
	};
});
//# sourceMappingURL=../../../../meta/compile/private/lex/group.js.map