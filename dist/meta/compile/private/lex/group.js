if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../Lang', '../Token', '../U/Bag', '../U/Slice', '../U/util', '../U/types'], function (exports, module, _esastDistLoc, _Lang, _Token, _UBag, _USlice, _UUtil, _UTypes) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	module.exports = group;

	var _Loc = _interopRequire(_esastDistLoc);

	var _Token2 = _interopRequire(_Token);

	var _Slice = _interopRequire(_USlice);

	function group(lx, preGroupedTokens) {
		// Stack of GroupBuilders
		const stack = [];

		// Should always be last(stack)
		let cur = null;

		function newLevel(pos, k) {
			// console.log(`${'\t'.repeat(stack.length)}>> ${k}`)
			cur = GroupBuilder({ startPos: pos, k: k, body: [] });
			stack.push(cur);
		}

		function finishLevels(closePos, k) {
			while (true) {
				const old = _UBag.last(stack);
				const oldClose = _Lang.GroupOpenToClose.get(old.k);
				if (oldClose === k) break;else {
					lx.check(AutoCloseableGroups.has(old.k), closePos, 'Trying to close ' + showGroup(k) + ', but last opened was a ' + showGroup(old.k));
					finishLevel(closePos, oldClose);
				}
			}
			finishLevel(closePos, k);
		}

		function finishLevel(closePos, k) {
			const wrapped = wrapLevel(closePos, k);
			// cur is now the previous level on the stack
			// console.log(`${'\t'.repeat(stack.length)}<< ${k})
			// Don't add line/spaced
			if ((k === 'sp' || k === 'ln') && wrapped.tokens.isEmpty()) return;
			if (k === '<-' && wrapped.tokens.isEmpty()) lx.fail(closePos, 'Empty block');
			// Spaced should always have at least two elements
			if (k === 'sp' && wrapped.tokens.size() === 1) cur.add(wrapped.tokens.head());else cur.add(wrapped);
		}

		function wrapLevel(closePos, k) {
			const old = stack.pop();
			cur = _UBag.isEmpty(stack) ? null : _UBag.last(stack);
			const loc = _Loc(old.startPos, closePos);
			_UUtil.assert(_Lang.GroupOpenToClose.get(old.k) === k);
			const tokens = new _Slice(old.body);
			return _Token.Group(loc, tokens, old.k);
		}

		function startLine(pos) {
			newLevel(pos, 'ln');
			newLevel(pos, 'sp');
		}
		function endLine(pos) {
			finishLevels(pos, 'sp');
			finishLevels(pos, 'ln');
		}

		function endAndStart(loc, k) {
			finishLevels(loc.start, k);
			newLevel(loc.end, k);
		}

		newLevel(_esastDistLoc.StartPos, '->');
		startLine(_esastDistLoc.StartPos);

		let endLoc = _Loc(_esastDistLoc.StartPos, _esastDistLoc.StartPos);
		preGroupedTokens.forEach(function (_) {
			if (_ instanceof _Token2) cur.add(_);else {
				// U.log(_.k)
				const loc = _.loc;
				endLoc = loc;
				const k = _.k;
				switch (k) {
					case '(':case '[':case '{':
						newLevel(loc.start, k);
						newLevel(loc.end, 'sp');
						break;
					case ')':case ']':case '}':
						finishLevels(loc.end, k);
						break;
					case '"':
						newLevel(loc.start, k);
						break;
					case 'close"':
						finishLevels(loc.start, k);
						break;
					case '->':
						//  ~ before block is OK
						if (_UBag.isEmpty(cur.body) || !_Token.Keyword.isTilde(_UBag.last(cur.body))) endAndStart(loc, 'sp');
						newLevel(loc.start, k);
						startLine(loc.end);
						break;
					case '<-':
						endLine(loc.start);
						finishLevels(loc.end, k);
						break;
					case 'ln':
						endLine(loc.start);
						startLine(loc.end);
						break;
					case 'sp':
						endAndStart(loc, k);
						break;
					default:
						throw new Error(k);
				}
			}
		});

		endLine(endLoc.end);
		const wholeModuleBlock = wrapLevel(endLoc.end, '<-');
		_UUtil.assert(_UBag.isEmpty(stack));
		return wholeModuleBlock;
	}

	const AutoCloseableGroups = _UUtil.newSet(['(', '[', 'sp']);

	const GroupBuilder = _UTypes.ObjType('GroupBuilder', Object, {
		startPos: _esastDistLoc.Pos,
		k: String,
		body: [_Token2]
	});
	Object.assign(GroupBuilder.prototype, {
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