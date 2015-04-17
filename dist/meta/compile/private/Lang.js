if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/util'], function (exports, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	const g = ['<~', '<~~'];
	const GeneratorKeywords = new Set(g);
	exports.GeneratorKeywords = GeneratorKeywords;
	const AssignKeywords = new Set(['=', '. '].concat(g));

	exports.AssignKeywords = AssignKeywords;
	const LineSplitKeywords = _UUtil.setUnion(AssignKeywords, new Set(['->']));

	exports.LineSplitKeywords = LineSplitKeywords;
	// `export` is not a keyword, but `. ` assigns in module context become exports.
	const KAssign = _UUtil.setUnion(AssignKeywords, new Set(['export']));
	exports.KAssign = KAssign;
	const KFun = new Set(['|', '~|']);
	exports.KFun = KFun;
	const CaseKeywords = new Set(['case', 'case!']);
	exports.CaseKeywords = CaseKeywords;
	const SpecialKeywords = new Set(['this', 'this-module-directory']);
	exports.SpecialKeywords = SpecialKeywords;
	const UseKeywords = new Set(['use!', 'use', 'use~', 'use-debug']);

	exports.UseKeywords = UseKeywords;
	const AllKeywords = _UUtil.setUnion(LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, new Set(['~', ':', '_', 'debug', 'debugger', 'else', 'end-loop!', 'in', 'loop!', 'out', 'region']));

	exports.AllKeywords = AllKeywords;
	const ReservedWords = new Set(['for', 'return']);

	exports.ReservedWords = ReservedWords;
	const GroupKinds = new Set(['(', '[', '{', '->', 'ln', 'sp', '"']);
	exports.GroupKinds = GroupKinds;
	const GroupPres = _UUtil.setUnion(GroupKinds, new Set([')', ']', '}', '<-', 'close"']));

	exports.GroupPres = GroupPres;
	const ReservedCharacters = new Set('`;,%^&\\');

	exports.ReservedCharacters = ReservedCharacters;
	const GroupOpenToClose = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['->', '<-'], ['ln', 'ln'], ['sp', 'sp'], ['"', 'close"']]);

	exports.GroupOpenToClose = GroupOpenToClose;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = new Set(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout',
	// Not really globals, but it works out that way.
	'false', 'true', 'null']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const isNameCharacter = function (ch) {
		return /[^()[\]{}\.:|_\s\"`#;,]/.test(ch);
	};

	exports.isNameCharacter = isNameCharacter;
	const defaultLoopName = 'anon-loop';

	exports.defaultLoopName = defaultLoopName;
	const fileExtension = '.ms';
	exports.fileExtension = fileExtension;
});
//# sourceMappingURL=../../../meta/compile/private/Lang.js.map