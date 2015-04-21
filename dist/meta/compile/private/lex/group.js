if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', 'esast/dist/private/tuple', '../Token', '../U/Bag', '../U/util', '../U/Slice', './GroupPre'], function (exports, module, _esastDistLoc, _esastDistPrivateTuple, _Token, _UBag, _UUtil, _USlice, _GroupPre) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = group;

	var _Loc = _interopRequire(_esastDistLoc);

	var _tuple = _interopRequire(_esastDistPrivateTuple);

	var _Token2 = _interopRequire(_Token);

	var _Slice = _interopRequire(_USlice);

	function group(cx, preGroupedTokens) {
		// Stack of GroupBuilders
		const stack = [];

		// Should always be last(stack)
		let cur = null;

		const newLevel = function (pos, k) {
			cur = GroupBuilder(pos, k, []);
			stack.push(cur);
		},
		      finishLevels = function (closePos, k) {
			// We may close other groups. For example, a G_Line can close a G_Paren.
			while (true) {
				const old = _UBag.last(stack);
				const oldClose = _GroupPre.groupOpenToClose(old.k);
				if (oldClose === k) break;else {
					cx.check(old.k === _GroupPre.GP_OpenParen || old.k === _GroupPre.GP_OpenBracket || old.k === _GroupPre.GP_Space, closePos, 'Trying to close ' + showGroup(k) + ', but last opened was ' + showGroup(old.k));
					finishLevel(closePos, oldClose);
				}
			}
			finishLevel(closePos, k);
		},
		      finishLevel = function (closePos, k) {
			let wrapped = wrapLevel(closePos, k);
			// cur is now the previous level on the stack
			// Don't add line/spaced
			switch (k) {
				case _GroupPre.GP_Space:
					{
						const size = wrapped.tokens.size();
						if (size === 0) return;else if (size === 1)
							// Spaced should always have at least two elements
							wrapped = wrapped.tokens.head();
						break;
					}
				case _GroupPre.GP_Line:
					if (wrapped.tokens.isEmpty()) return;
					break;
				case _GroupPre.GP_CloseBlock:
					if (wrapped.tokens.isEmpty()) cx.fail(closePos, 'Empty block');
				default:
				// fallthrough
			}
			cur.add(wrapped);
		},
		      wrapLevel = function (closePos, k) {
			const old = stack.pop();
			cur = _UBag.isEmpty(stack) ? null : _UBag.last(stack);
			const loc = _Loc(old.startPos, closePos);
			_UUtil.assert(_GroupPre.groupOpenToClose(old.k) === k);
			const tokens = new _Slice(old.body);
			// A GroupPre opener is also an equivalent Group kind. E.g. GP_OpenParen === G_Paren
			return _Token.Group(loc, tokens, old.k);
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

		newLevel(_esastDistLoc.StartPos, _GroupPre.GP_OpenBlock);
		startLine(_esastDistLoc.StartPos);

		let endLoc = _Loc(_esastDistLoc.StartPos, _esastDistLoc.StartPos);
		preGroupedTokens.forEach(function (_) {
			if (_ instanceof _Token2) cur.add(_);else {
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
						if (_UBag.isEmpty(cur.body) || !_Token.Keyword.isTilde(_UBag.last(cur.body))) endAndStart(loc, _GroupPre.GP_Space);
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
		const wholeModuleBlock = wrapLevel(endLoc.end, _GroupPre.GP_CloseBlock);
		_UUtil.assert(_UBag.isEmpty(stack));
		return wholeModuleBlock;
	}

	const GroupBuilder = _tuple('GroupBuilder', Object, 'doc',
	// k is a Group kind
	['startPos', _esastDistLoc.Pos, 'k', Number, 'body', [_Token2]], {
		add: function (t) {
			this.body.push(t);
		}
	});

	// TODO: better names
	const showGroup = function (k) {
		return k;
	};
});
//# sourceMappingURL=../../../../meta/compile/private/lex/group.js.map