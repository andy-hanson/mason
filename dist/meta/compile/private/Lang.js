if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/util'], function (exports, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	const g = ['<~', '<~~'];
	const GeneratorKeywords = _UUtil.newSet(g);
	exports.GeneratorKeywords = GeneratorKeywords;
	const AssignKeywords = _UUtil.newSet(['=', '. '].concat(g));

	exports.AssignKeywords = AssignKeywords;
	const LineSplitKeywords = _UUtil.newSet(AssignKeywords, ['->']);

	exports.LineSplitKeywords = LineSplitKeywords;
	// `export` is not a keyword, but `. ` assigns in module context become exports.
	const KAssign = _UUtil.newSet(AssignKeywords, ['export']);
	exports.KAssign = KAssign;
	const KFun = _UUtil.newSet(['|', '~|']);
	exports.KFun = KFun;
	const CaseKeywords = _UUtil.newSet(['case', 'case!']);
	exports.CaseKeywords = CaseKeywords;
	const SpecialKeywords = _UUtil.newSet(['this', 'this-module-directory']);
	exports.SpecialKeywords = SpecialKeywords;
	const UseKeywords = _UUtil.newSet(['use!', 'use', 'use~', 'use-debug']);

	exports.UseKeywords = UseKeywords;
	const AllKeywords = _UUtil.newSet(LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, ['~', ':', '_', 'debug', 'debugger', 'else', 'end-loop!', 'in', 'loop!', 'out', 'region']);

	exports.AllKeywords = AllKeywords;
	const ReservedWords = _UUtil.newSet(['for', 'return']);

	exports.ReservedWords = ReservedWords;
	const GroupKinds = _UUtil.newSet(['(', '[', '{', '->', 'ln', 'sp', '"']);

	exports.GroupKinds = GroupKinds;
	const GroupOpenToClose = _UUtil.newMap([['(', ')'], ['[', ']'], ['{', '}'], ['->', '<-'], ['ln', 'ln'], ['sp', 'sp'], ['"', 'close"']]);

	exports.GroupOpenToClose = GroupOpenToClose;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = _UUtil.newSet(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout',
	// Not really globals, but it works out that way.
	'false', 'true', 'null']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';
	exports.NonNameCharacters = NonNameCharacters;
	const ReservedCharacters = '`;,%^&\\';

	exports.ReservedCharacters = ReservedCharacters;
	const defaultLoopName = 'anon-loop';

	exports.defaultLoopName = defaultLoopName;
	const fileExtension = '.ms';
	exports.fileExtension = fileExtension;
});
//# sourceMappingURL=../../../meta/compile/private/Lang.js.map