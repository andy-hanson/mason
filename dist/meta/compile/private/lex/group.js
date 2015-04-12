if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/Loc", "../Lang", "../Token", "../U/Bag", "../U/Slice", "../U/type", "../U/util", "../U/types", "./GroupPre"], function (exports, module, _esastDistLoc, _Lang, _Token, _UBag, _USlice, _UType, _UUtil, _UTypes, _GroupPre) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = group;

	var Loc = _interopRequire(_esastDistLoc);

	var Pos = _esastDistLoc.Pos;
	var StartPos = _esastDistLoc.StartPos;
	var GroupOpenToClose = _Lang.GroupOpenToClose;

	var Token = _interopRequire(_Token);

	var Group = _Token.Group;
	var Keyword = _Token.Keyword;
	var isEmpty = _UBag.isEmpty;
	var last = _UBag.last;

	var Slice = _interopRequire(_USlice);

	var type = _interopRequire(_UType);

	var assert = _UUtil.assert;
	var ObjType = _UTypes.ObjType;

	var GroupPre = _interopRequire(_GroupPre);

	function group(lx, preGroupedTokens) {
		// Stack of GroupBuilders
		const stack = [];

		// Should always be last(stack)
		let cur = null;

		function newLevel(pos, k) {
			type(pos, Pos, k, String);
			// console.log(`${'\t'.repeat(stack.length)}>> ${k}`)
			cur = GroupBuilder({ startPos: pos, k: k, body: [] });
			stack.push(cur);
		}

		function finishLevels(closePos, k) {
			while (true) {
				const old = last(stack);
				const oldClose = GroupOpenToClose.get(old.k);
				if (oldClose === k) break;else {
					lx.check(AutoCloseableGroups.has(old.k), closePos, "Trying to close " + showGroup(k) + ", but last opened was a " + showGroup(old.k));
					finishLevel(closePos, oldClose);
				}
			}
			finishLevel(closePos, k);
		}

		function finishLevel(closePos, k) {
			type(closePos, Pos, k, String);

			const wrapped = wrapLevel(closePos, k);
			// cur is now the previous level on the stack
			// console.log(`${'\t'.repeat(stack.length)}<< ${k})
			// Don't add line/spaced
			if ((k === "sp" || k === "ln") && wrapped.tokens.isEmpty()) return;
			if (k === "<-" && wrapped.tokens.isEmpty()) lx.fail(closePos, "Empty block");
			// Spaced should always have at least two elements
			if (k === "sp" && wrapped.tokens.size() === 1) cur.add(wrapped.tokens.head());else cur.add(wrapped);
		}

		function wrapLevel(closePos, k) {
			type(closePos, Pos, k, String);
			const old = stack.pop();
			cur = isEmpty(stack) ? null : last(stack);
			type(old, GroupBuilder);
			const loc = Loc(old.startPos, closePos);
			assert(GroupOpenToClose.get(old.k) === k);
			const tokens = new Slice(old.body);
			return Group(loc, tokens, old.k);
		}

		function startLine(pos) {
			newLevel(pos, "ln");
			newLevel(pos, "sp");
		}
		function endLine(pos) {
			finishLevels(pos, "sp");
			finishLevels(pos, "ln");
		}

		function endAndStart(loc, k) {
			finishLevels(loc.start, k);
			newLevel(loc.end, k);
		}

		newLevel(StartPos, "->");
		startLine(StartPos);

		let endLoc = Loc(StartPos, StartPos);
		for (let _ of preGroupedTokens) {
			if (_ instanceof Token) cur.add(_);else {
				type(_, GroupPre);
				type(_.loc, Loc);
				// U.log(_.k)
				const loc = _.loc;
				endLoc = loc;
				const k = _.k;
				switch (k) {
					case "(":case "[":case "{":
						newLevel(loc.start, k);
						newLevel(loc.end, "sp");
						break;
					case ")":case "]":case "}":
						finishLevels(loc.end, k);
						break;
					case "\"":
						newLevel(loc.start, k);
						break;
					case "close\"":
						finishLevels(loc.start, k);
						break;
					case "->":
						//  ~ before block is OK
						if (isEmpty(cur.body) || !Keyword.isTilde(last(cur.body))) endAndStart(loc, "sp");
						newLevel(loc.start, k);
						startLine(loc.end);
						break;
					case "<-":
						endLine(loc.start);
						finishLevels(loc.end, k);
						break;
					case "ln":
						endLine(loc.start);
						startLine(loc.end);
						break;
					case "sp":
						endAndStart(loc, k);
						break;
					default:
						throw new Error(k);
				}
			}
		}

		endLine(endLoc.end);
		const wholeModuleBlock = wrapLevel(endLoc.end, "<-");
		assert(isEmpty(stack));
		return wholeModuleBlock;
	}

	const AutoCloseableGroups = new Set(["(", "[", "sp"]);

	const GroupBuilder = ObjType("GroupBuilder", Object, {
		startPos: Pos,
		k: String,
		body: [Token]
	});
	Object.assign(GroupBuilder.prototype, {
		add: function (t) {
			type(t, Token);
			this.body.push(t);
		}
	});

	// TODO: better names
	const showGroup = function (k) {
		return k;
	};
});
//# sourceMappingURL=../../../../meta/compile/private/lex/group.js.map