if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', '../MsAst', './util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _MsAst, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	/*
 Token tree, output of `lex/group`.
 That's right: in Mason, the tokens form a tree containing both plain tokens and Group tokens.
 This means that the parser avoids doing much of the work that parsers normally have to do;
 it doesn't have to handle a "left parenthesis", only a Group(tokens, G_Parenthesis).
 */
	const tokenType = (name, namesTypes) => (0, _tupl.default)(name, Object, null, ['loc', _Loc.default].concat(namesTypes));

	const
	// `.name`, `..name`, etc.
	// Currently nDots > 1 is only used by `use` blocks.
	DotName = tokenType('DotName', ['nDots', Number, 'name', String]),
	     
	// kind is a G_***.
	Group = tokenType('Group', ['subTokens', [Object], 'kind', Number]),
	     
	/*
 A key"word" is any set of characters with a particular meaning.
 This can even include ones like `. ` (defines an object property, as in `key. value`).
 Kind is a KW_***. See the full list below.
 */
	Keyword = tokenType('Keyword', ['kind', Number]),
	     
	// A name is guaranteed to *not* be a keyword.
	// It's also not a DotName.
	Name = tokenType('Name', ['name', String]);
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	// NumberLiteral is also both a token and an MsAst.

	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	(0, _util.implementMany)({ DotName, Group, Keyword, Name, NumberLiteral: _MsAst.NumberLiteral }, 'show', {
		DotName() {
			return `${ '.'.repeat(this.nDots) }${ this.name }`;
		},
		Group() {
			return `${ groupKindToName.get(this.kind) }`;
		},
		Keyword() {
			return (0, _CompileError.code)(keywordKindToName.get(this.kind));
		},
		Name() {
			return this.name;
		},
		NumberLiteral() {
			return this.value;
		}
	});

	let nextGroupKind = 0;
	const groupKindToName = new Map(),
	      g = name => {
		const kind = nextGroupKind;
		groupKindToName.set(kind, name);
		nextGroupKind = nextGroupKind + 1;
		return kind;
	};
	const G_Parenthesis = g('( )'),
	      G_Bracket = g('[ ]'),
	     
	// Lines in an indented block.
	// Sub-tokens will always be G_Line groups.
	// Note that G_Blocks do not always map to Block* MsAsts.
	G_Block = g('indented block'),
	     
	// Within a quote.
	// Sub-tokens may be strings, or G_Parenthesis groups.
	G_Quote = g('quote'),
	     
	/*
 Tokens on a line.
 NOTE: The indented block following the end of the line is considered to be a part of the line!
 This means that in this code:
 	a
 		b
 		c
 	d
 There are 2 lines, one starting with 'a' and one starting with 'd'.
 The first line contains 'a' and a G_Block which in turn contains two other lines.
 */
	G_Line = g('line'),
	     
	/*
 Groups two or more tokens that are *not* separated by spaces.
 `a[b].c` is an example.
 A single token on its own will not be given a G_Space.
 */
	G_Space = g('spaced group'),
	      showGroupKind = groupKind => groupKindToName.get(groupKind);

	exports.G_Parenthesis = G_Parenthesis;
	exports.G_Bracket = G_Bracket;
	exports.G_Block = G_Block;
	exports.G_Quote = G_Quote;
	exports.G_Line = G_Line;
	exports.G_Space = G_Space;
	exports.showGroupKind = showGroupKind;
	let nextKeywordKind = 0;
	const keywordNameToKind = new Map(),
	      keywordKindToName = new Map(),
	     
	// These keywords are special names.
	// When lexing a name, a map lookup is done by keywordKindFromName.
	kw = name => {
		const kind = kwNotName(name);
		keywordNameToKind.set(name, kind);
		return kind;
	},
	     
	// These keywords must be lexed specially.
	kwNotName = debugName => {
		const kind = nextKeywordKind;
		keywordKindToName.set(kind, debugName);
		nextKeywordKind = nextKeywordKind + 1;
		return kind;
	};

	const reserved_words = ['abstract', 'arguments', 'as', 'boolean', 'byte', 'char', 'comment', 'const', 'data', 'do', 'do!', 'delete', 'double', 'enum', 'eval', 'final', 'float', 'gen', 'gen!', 'goto', 'implements', 'instanceOf', 'int', 'interface', 'label', 'long', 'native', 'of', 'of!', 'package', 'private', 'protected', 'public', 'return', 'short', 'switch', 'synchronized', 'throws', 'to', 'transient', 'typeof', 'var', 'void', 'while', 'with'];
	for (const name of reserved_words) keywordNameToKind.set(name, -1);

	const KW_And = kw('and'),
	      KW_Assert = kw('assert!'),
	      KW_AssertNot = kw('forbid!'),
	      KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_LocalMutate = kw(':='),
	      KW_BreakDo = kw('break!'),
	      KW_BreakVal = kw('break'),
	      KW_Built = kw('built'),
	      KW_CaseDo = kw('case!'),
	      KW_CaseVal = kw('case'),
	      KW_CatchDo = kw('catch!'),
	      KW_CatchVal = kw('catch'),
	      KW_Class = kw('class'),
	      KW_Construct = kw('construct!'),
	      KW_Continue = kw('continue!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger!'),
	     
	// Three dots followed by a space, as in `... things-added-to-@`.
	KW_Ellipsis = kw('... '),
	      KW_Else = kw('else'),
	      KW_ExceptDo = kw('except!'),
	      KW_ExceptVal = kw('except'),
	      KW_False = kw('false'),
	      KW_Finally = kw('finally!'),
	      KW_Focus = kwNotName('_'),
	      KW_ForBag = kw('@for'),
	      KW_ForDo = kw('for!'),
	      KW_ForVal = kw('for'),
	      KW_Fun = kwNotName('|'),
	      KW_FunDo = kwNotName('!|'),
	      KW_FunGen = kwNotName('~|'),
	      KW_FunGenDo = kwNotName('~!|'),
	      KW_FunThis = kwNotName('.|'),
	      KW_FunThisDo = kwNotName('.!|'),
	      KW_FunThisGen = kwNotName('.~|'),
	      KW_FunThisGenDo = kwNotName('.~!|'),
	      KW_Get = kw('get'),
	      KW_IfVal = kw('if'),
	      KW_IfDo = kw('if!'),
	      KW_In = kw('in'),
	      KW_Lazy = kwNotName('~'),
	      KW_MapEntry = kw('->'),
	      KW_New = kw('new'),
	      KW_Not = kw('not'),
	      KW_Null = kw('null'),
	      KW_ObjAssign = kw('. '),
	      KW_Or = kw('or'),
	      KW_Out = kw('out'),
	      KW_Pass = kw('pass'),
	      KW_Region = kw('region'),
	      KW_Set = kw('set!'),
	      KW_Super = kw('super'),
	      KW_Static = kw('static'),
	      KW_ThisModuleDirectory = kw('this-module-directory'),
	      KW_Throw = kw('throw!'),
	      KW_True = kw('true'),
	      KW_TryDo = kw('try!'),
	      KW_TryVal = kw('try'),
	      KW_Type = kwNotName(':'),
	      KW_Undefined = kw('undefined'),
	      KW_UnlessVal = kw('unless'),
	      KW_UnlessDo = kw('unless!'),
	      KW_Use = kw('use'),
	      KW_UseDebug = kw('use-debug'),
	      KW_UseDo = kw('use!'),
	      KW_UseLazy = kw('use~'),
	      KW_Yield = kw('<~'),
	      KW_YieldTo = kw('<~~'),
	      keywordName = kind => keywordKindToName.get(kind),
	     
	// Returns -1 for reserved keyword or undefined for not-a-keyword.
	opKeywordKindFromName = name => keywordNameToKind.get(name),
	      opKeywordKindToSpecialValueKind = kw => {
		switch (kw) {
			case KW_False:
				return _MsAst.SV_False;
			case KW_Null:
				return _MsAst.SV_Null;
			case KW_Super:
				return _MsAst.SV_Super;
			case KW_ThisModuleDirectory:
				return _MsAst.SV_ThisModuleDirectory;
			case KW_True:
				return _MsAst.SV_True;
			case KW_Undefined:
				return _MsAst.SV_Undefined;
			default:
				return null;
		}
	},
	      isGroup = (groupKind, token) => token instanceof Group && token.kind === groupKind,
	      isKeyword = (keywordKind, token) => token instanceof Keyword && token.kind === keywordKind;
	exports.KW_And = KW_And;
	exports.KW_Assert = KW_Assert;
	exports.KW_AssertNot = KW_AssertNot;
	exports.KW_Assign = KW_Assign;
	exports.KW_AssignMutable = KW_AssignMutable;
	exports.KW_LocalMutate = KW_LocalMutate;
	exports.KW_BreakDo = KW_BreakDo;
	exports.KW_BreakVal = KW_BreakVal;
	exports.KW_Built = KW_Built;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_CaseVal = KW_CaseVal;
	exports.KW_CatchDo = KW_CatchDo;
	exports.KW_CatchVal = KW_CatchVal;
	exports.KW_Class = KW_Class;
	exports.KW_Construct = KW_Construct;
	exports.KW_Continue = KW_Continue;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Ellipsis = KW_Ellipsis;
	exports.KW_Else = KW_Else;
	exports.KW_ExceptDo = KW_ExceptDo;
	exports.KW_ExceptVal = KW_ExceptVal;
	exports.KW_False = KW_False;
	exports.KW_Finally = KW_Finally;
	exports.KW_Focus = KW_Focus;
	exports.KW_ForBag = KW_ForBag;
	exports.KW_ForDo = KW_ForDo;
	exports.KW_ForVal = KW_ForVal;
	exports.KW_Fun = KW_Fun;
	exports.KW_FunDo = KW_FunDo;
	exports.KW_FunGen = KW_FunGen;
	exports.KW_FunGenDo = KW_FunGenDo;
	exports.KW_FunThis = KW_FunThis;
	exports.KW_FunThisDo = KW_FunThisDo;
	exports.KW_FunThisGen = KW_FunThisGen;
	exports.KW_FunThisGenDo = KW_FunThisGenDo;
	exports.KW_Get = KW_Get;
	exports.KW_IfVal = KW_IfVal;
	exports.KW_IfDo = KW_IfDo;
	exports.KW_In = KW_In;
	exports.KW_Lazy = KW_Lazy;
	exports.KW_MapEntry = KW_MapEntry;
	exports.KW_New = KW_New;
	exports.KW_Not = KW_Not;
	exports.KW_Null = KW_Null;
	exports.KW_ObjAssign = KW_ObjAssign;
	exports.KW_Or = KW_Or;
	exports.KW_Out = KW_Out;
	exports.KW_Pass = KW_Pass;
	exports.KW_Region = KW_Region;
	exports.KW_Set = KW_Set;
	exports.KW_Super = KW_Super;
	exports.KW_Static = KW_Static;
	exports.KW_ThisModuleDirectory = KW_ThisModuleDirectory;
	exports.KW_Throw = KW_Throw;
	exports.KW_True = KW_True;
	exports.KW_TryDo = KW_TryDo;
	exports.KW_TryVal = KW_TryVal;
	exports.KW_Type = KW_Type;
	exports.KW_Undefined = KW_Undefined;
	exports.KW_UnlessVal = KW_UnlessVal;
	exports.KW_UnlessDo = KW_UnlessDo;
	exports.KW_Use = KW_Use;
	exports.KW_UseDebug = KW_UseDebug;
	exports.KW_UseDo = KW_UseDo;
	exports.KW_UseLazy = KW_UseLazy;
	exports.KW_Yield = KW_Yield;
	exports.KW_YieldTo = KW_YieldTo;
	exports.keywordName = keywordName;
	exports.opKeywordKindFromName = opKeywordKindFromName;
	exports.opKeywordKindToSpecialValueKind = opKeywordKindToSpecialValueKind;
	exports.isGroup = isGroup;
	exports.isKeyword = isKeyword;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxPQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLEtBQ2xDLG1CQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7O0FBRXJEOzs7QUFHTixRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDOzs7QUFFbkUsTUFBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7Ozs7QUFNckUsUUFBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7QUFHbEQsS0FBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTtTQVg1QyxPQUFPLEdBQVAsT0FBTztTQUVQLEtBQUssR0FBTCxLQUFLO1NBTUwsT0FBTyxHQUFQLE9BQU87U0FHUCxJQUFJLEdBQUosSUFBSTs7OztBQUlMLFdBN0JTLGFBQWEsRUE2QlIsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxTQWhDbkQsYUFBYSxBQWdDc0MsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN2RSxTQUFPLEdBQUc7QUFBRSxVQUFPLENBQUMsR0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxHQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDNUQsT0FBSyxHQUFH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LEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUMzQixZQUFZLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUMzQixRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUN0QixVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztPQUMzQixRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN6QixTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUN0QixRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNyQixTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNyQixNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN2QixRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztPQUMxQixTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztPQUMzQixXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztPQUM5QixVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztPQUM1QixZQUFZLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztPQUMvQixhQUFhLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztPQUNoQyxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztPQUNuQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNsQixRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNuQixLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNoQixPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN4QixXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUN0QixNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNsQixNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNsQixPQUFP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R0FBUCxPQUFPO1NBQ1AsWUFBWSxHQUFaLFlBQVk7U0FDWixZQUFZLEdBQVosWUFBWTtTQUNaLFdBQVcsR0FBWCxXQUFXO1NBQ1gsTUFBTSxHQUFOLE1BQU07U0FDTixXQUFXLEdBQVgsV0FBVztTQUNYLFFBQVEsR0FBUixRQUFRO1NBQ1IsVUFBVSxHQUFWLFVBQVU7U0FDVixRQUFRLEdBQVIsUUFBUTtTQUNSLFVBQVUsR0FBVixVQUFVO1NBRVYsV0FBVyxHQUFYLFdBQVc7U0FHWCxxQkFBcUIsR0FBckIscUJBQXFCO1NBRXJCLCtCQUErQixHQUEvQiwrQkFBK0I7U0FXL0IsT0FBTyxHQUFQLE9BQU87U0FFUCxTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9Ub2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBOdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBTVl9GYWxzZSwgU1ZfTnVsbCwgU1ZfU3VwZXIsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgaW1wbGVtZW50TWFueSB9IGZyb20gJy4vdXRpbCdcblxuLypcblRva2VuIHRyZWUsIG91dHB1dCBvZiBgbGV4L2dyb3VwYC5cblRoYXQncyByaWdodDogaW4gTWFzb24sIHRoZSB0b2tlbnMgZm9ybSBhIHRyZWUgY29udGFpbmluZyBib3RoIHBsYWluIHRva2VucyBhbmQgR3JvdXAgdG9rZW5zLlxuVGhpcyBtZWFucyB0aGF0IHRoZSBwYXJzZXIgYXZvaWRzIGRvaW5nIG11Y2ggb2YgdGhlIHdvcmsgdGhhdCBwYXJzZXJzIG5vcm1hbGx5IGhhdmUgdG8gZG87XG5pdCBkb2Vzbid0IGhhdmUgdG8gaGFuZGxlIGEgXCJsZWZ0IHBhcmVudGhlc2lzXCIsIG9ubHkgYSBHcm91cCh0b2tlbnMsIEdfUGFyZW50aGVzaXMpLlxuKi9cbmNvbnN0IHRva2VuVHlwZSA9IChuYW1lLCBuYW1lc1R5cGVzKSA9PlxuXHR0dXBsKG5hbWUsIE9iamVjdCwgbnVsbCwgWyAnbG9jJywgTG9jIF0uY29uY2F0KG5hbWVzVHlwZXMpKVxuXG5leHBvcnQgY29uc3Rcblx0Ly8gYC5uYW1lYCwgYC4ubmFtZWAsIGV0Yy5cblx0Ly8gQ3VycmVudGx5IG5Eb3RzID4gMSBpcyBvbmx5IHVzZWQgYnkgYHVzZWAgYmxvY2tzLlxuXHREb3ROYW1lID0gdG9rZW5UeXBlKCdEb3ROYW1lJywgWyAnbkRvdHMnLCBOdW1iZXIsICduYW1lJywgU3RyaW5nIF0pLFxuXHQvLyBraW5kIGlzIGEgR18qKiouXG5cdEdyb3VwID0gdG9rZW5UeXBlKCdHcm91cCcsIFsgJ3N1YlRva2VucycsIFtPYmplY3RdLCAna2luZCcsIE51bWJlciBdKSxcblx0Lypcblx0QSBrZXlcIndvcmRcIiBpcyBhbnkgc2V0IG9mIGNoYXJhY3RlcnMgd2l0aCBhIHBhcnRpY3VsYXIgbWVhbmluZy5cblx0VGhpcyBjYW4gZXZlbiBpbmNsdWRlIG9uZXMgbGlrZSBgLiBgIChkZWZpbmVzIGFuIG9iamVjdCBwcm9wZXJ0eSwgYXMgaW4gYGtleS4gdmFsdWVgKS5cblx0S2luZCBpcyBhIEtXXyoqKi4gU2VlIHRoZSBmdWxsIGxpc3QgYmVsb3cuXG5cdCovXG5cdEtleXdvcmQgPSB0b2tlblR5cGUoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0pLFxuXHQvLyBBIG5hbWUgaXMgZ3VhcmFudGVlZCB0byAqbm90KiBiZSBhIGtleXdvcmQuXG5cdC8vIEl0J3MgYWxzbyBub3QgYSBEb3ROYW1lLlxuXHROYW1lID0gdG9rZW5UeXBlKCdOYW1lJywgWyAnbmFtZScsIFN0cmluZyBdKVxuXHQvLyBOdW1iZXJMaXRlcmFsIGlzIGFsc28gYm90aCBhIHRva2VuIGFuZCBhbiBNc0FzdC5cblxuLy8gdG9TdHJpbmcgaXMgdXNlZCBieSBzb21lIHBhcnNpbmcgZXJyb3JzLiBVc2UgVS5pbnNwZWN0IGZvciBhIG1vcmUgZGV0YWlsZWQgdmlldy5cbmltcGxlbWVudE1hbnkoeyBEb3ROYW1lLCBHcm91cCwgS2V5d29yZCwgTmFtZSwgTnVtYmVyTGl0ZXJhbCB9LCAnc2hvdycsIHtcblx0RG90TmFtZSgpIHsgcmV0dXJuIGAkeycuJy5yZXBlYXQodGhpcy5uRG90cyl9JHt0aGlzLm5hbWV9YCB9LFxuXHRHcm91cCgpIHsgcmV0dXJuIGAke2dyb3VwS2luZFRvTmFtZS5nZXQodGhpcy5raW5kKX1gIH0sXG5cdEtleXdvcmQoKSB7IHJldHVybiBjb2RlKGtleXdvcmRLaW5kVG9OYW1lLmdldCh0aGlzLmtpbmQpKSB9LFxuXHROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lIH0sXG5cdE51bWJlckxpdGVyYWwoKSB7IHJldHVybiB0aGlzLnZhbHVlIH1cbn0pXG5cbmxldCBuZXh0R3JvdXBLaW5kID0gMFxuY29uc3Rcblx0Z3JvdXBLaW5kVG9OYW1lID0gbmV3IE1hcCgpLFxuXHRnID0gbmFtZSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IG5leHRHcm91cEtpbmRcblx0XHRncm91cEtpbmRUb05hbWUuc2V0KGtpbmQsIG5hbWUpXG5cdFx0bmV4dEdyb3VwS2luZCA9IG5leHRHcm91cEtpbmQgKyAxXG5cdFx0cmV0dXJuIGtpbmRcblx0fVxuZXhwb3J0IGNvbnN0XG5cdEdfUGFyZW50aGVzaXMgPSBnKCcoICknKSxcblx0R19CcmFja2V0ID0gZygnWyBdJyksXG5cdC8vIExpbmVzIGluIGFuIGluZGVudGVkIGJsb2NrLlxuXHQvLyBTdWItdG9rZW5zIHdpbGwgYWx3YXlzIGJlIEdfTGluZSBncm91cHMuXG5cdC8vIE5vdGUgdGhhdCBHX0Jsb2NrcyBkbyBub3QgYWx3YXlzIG1hcCB0byBCbG9jayogTXNBc3RzLlxuXHRHX0Jsb2NrID0gZygnaW5kZW50ZWQgYmxvY2snKSxcblx0Ly8gV2l0aGluIGEgcXVvdGUuXG5cdC8vIFN1Yi10b2tlbnMgbWF5IGJlIHN0cmluZ3MsIG9yIEdfUGFyZW50aGVzaXMgZ3JvdXBzLlxuXHRHX1F1b3RlID0gZygncXVvdGUnKSxcblx0Lypcblx0VG9rZW5zIG9uIGEgbGluZS5cblx0Tk9URTogVGhlIGluZGVudGVkIGJsb2NrIGZvbGxvd2luZyB0aGUgZW5kIG9mIHRoZSBsaW5lIGlzIGNvbnNpZGVyZWQgdG8gYmUgYSBwYXJ0IG9mIHRoZSBsaW5lIVxuXHRUaGlzIG1lYW5zIHRoYXQgaW4gdGhpcyBjb2RlOlxuXHRcdGFcblx0XHRcdGJcblx0XHRcdGNcblx0XHRkXG5cdFRoZXJlIGFyZSAyIGxpbmVzLCBvbmUgc3RhcnRpbmcgd2l0aCAnYScgYW5kIG9uZSBzdGFydGluZyB3aXRoICdkJy5cblx0VGhlIGZpcnN0IGxpbmUgY29udGFpbnMgJ2EnIGFuZCBhIEdfQmxvY2sgd2hpY2ggaW4gdHVybiBjb250YWlucyB0d28gb3RoZXIgbGluZXMuXG5cdCovXG5cdEdfTGluZSA9IGcoJ2xpbmUnKSxcblx0Lypcblx0R3JvdXBzIHR3byBvciBtb3JlIHRva2VucyB0aGF0IGFyZSAqbm90KiBzZXBhcmF0ZWQgYnkgc3BhY2VzLlxuXHRgYVtiXS5jYCBpcyBhbiBleGFtcGxlLlxuXHRBIHNpbmdsZSB0b2tlbiBvbiBpdHMgb3duIHdpbGwgbm90IGJlIGdpdmVuIGEgR19TcGFjZS5cblx0Ki9cblx0R19TcGFjZSA9IGcoJ3NwYWNlZCBncm91cCcpLFxuXHRzaG93R3JvdXBLaW5kID0gZ3JvdXBLaW5kID0+IGdyb3VwS2luZFRvTmFtZS5nZXQoZ3JvdXBLaW5kKVxuXG5cbmxldCBuZXh0S2V5d29yZEtpbmQgPSAwXG5jb25zdFxuXHRrZXl3b3JkTmFtZVRvS2luZCA9IG5ldyBNYXAoKSxcblx0a2V5d29yZEtpbmRUb05hbWUgPSBuZXcgTWFwKCksXG5cdC8vIFRoZXNlIGtleXdvcmRzIGFyZSBzcGVjaWFsIG5hbWVzLlxuXHQvLyBXaGVuIGxleGluZyBhIG5hbWUsIGEgbWFwIGxvb2t1cCBpcyBkb25lIGJ5IGtleXdvcmRLaW5kRnJvbU5hbWUuXG5cdGt3ID0gbmFtZSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IGt3Tm90TmFtZShuYW1lKVxuXHRcdGtleXdvcmROYW1lVG9LaW5kLnNldChuYW1lLCBraW5kKVxuXHRcdHJldHVybiBraW5kXG5cdH0sXG5cdC8vIFRoZXNlIGtleXdvcmRzIG11c3QgYmUgbGV4ZWQgc3BlY2lhbGx5LlxuXHRrd05vdE5hbWUgPSBkZWJ1Z05hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBuZXh0S2V5d29yZEtpbmRcblx0XHRrZXl3b3JkS2luZFRvTmFtZS5zZXQoa2luZCwgZGVidWdOYW1lKVxuXHRcdG5leHRLZXl3b3JkS2luZCA9IG5leHRLZXl3b3JkS2luZCArIDFcblx0XHRyZXR1cm4ga2luZFxuXHR9XG5cbmNvbnN0IHJlc2VydmVkX3dvcmRzID0gW1xuXHQnYWJzdHJhY3QnLFxuXHQnYXJndW1lbnRzJyxcblx0J2FzJyxcblx0J2Jvb2xlYW4nLFxuXHQnYnl0ZScsXG5cdCdjaGFyJyxcblx0J2NvbW1lbnQnLFxuXHQnY29uc3QnLFxuXHQnZGF0YScsXG5cdCdkbycsXG5cdCdkbyEnLFxuXHQnZGVsZXRlJyxcblx0J2RvdWJsZScsXG5cdCdlbnVtJyxcblx0J2V2YWwnLFxuXHQnZmluYWwnLFxuXHQnZmxvYXQnLFxuXHQnZ2VuJyxcblx0J2dlbiEnLFxuXHQnZ290bycsXG5cdCdpbXBsZW1lbnRzJyxcblx0J2luc3RhbmNlT2YnLFxuXHQnaW50Jyxcblx0J2ludGVyZmFjZScsXG5cdCdsYWJlbCcsXG5cdCdsb25nJyxcblx0J25hdGl2ZScsXG5cdCdvZicsXG5cdCdvZiEnLFxuXHQncGFja2FnZScsXG5cdCdwcml2YXRlJyxcblx0J3Byb3RlY3RlZCcsXG5cdCdwdWJsaWMnLFxuXHQncmV0dXJuJyxcblx0J3Nob3J0Jyxcblx0J3N3aXRjaCcsXG5cdCdzeW5jaHJvbml6ZWQnLFxuXHQndGhyb3dzJyxcblx0J3RvJyxcblx0J3RyYW5zaWVudCcsXG5cdCd0eXBlb2YnLFxuXHQndmFyJyxcblx0J3ZvaWQnLFxuXHQnd2hpbGUnLFxuXHQnd2l0aCdcbl1cbmZvciAoY29uc3QgbmFtZSBvZiByZXNlcnZlZF93b3Jkcylcblx0a2V5d29yZE5hbWVUb0tpbmQuc2V0KG5hbWUsIC0xKVxuXG5leHBvcnQgY29uc3Rcblx0S1dfQW5kID0ga3coJ2FuZCcpLFxuXHRLV19Bc3NlcnQgPSBrdygnYXNzZXJ0IScpLFxuXHRLV19Bc3NlcnROb3QgPSBrdygnZm9yYmlkIScpLFxuXHRLV19Bc3NpZ24gPSBrdygnPScpLFxuXHRLV19Bc3NpZ25NdXRhYmxlID0ga3coJzo6PScpLFxuXHRLV19Mb2NhbE11dGF0ZSA9IGt3KCc6PScpLFxuXHRLV19CcmVha0RvID0ga3coJ2JyZWFrIScpLFxuXHRLV19CcmVha1ZhbCA9IGt3KCdicmVhaycpLFxuXHRLV19CdWlsdCA9IGt3KCdidWlsdCcpLFxuXHRLV19DYXNlRG8gPSBrdygnY2FzZSEnKSxcblx0S1dfQ2FzZVZhbCA9IGt3KCdjYXNlJyksXG5cdEtXX0NhdGNoRG8gPSBrdygnY2F0Y2ghJyksXG5cdEtXX0NhdGNoVmFsID0ga3coJ2NhdGNoJyksXG5cdEtXX0NsYXNzID0ga3coJ2NsYXNzJyksXG5cdEtXX0NvbnN0cnVjdCA9IGt3KCdjb25zdHJ1Y3QhJyksXG5cdEtXX0NvbnRpbnVlID0ga3coJ2NvbnRpbnVlIScpLFxuXHRLV19EZWJ1ZyA9IGt3KCdkZWJ1ZycpLFxuXHRLV19EZWJ1Z2dlciA9IGt3KCdkZWJ1Z2dlciEnKSxcblx0Ly8gVGhyZWUgZG90cyBmb2xsb3dlZCBieSBhIHNwYWNlLCBhcyBpbiBgLi4uIHRoaW5ncy1hZGRlZC10by1AYC5cblx0S1dfRWxsaXBzaXMgPSBrdygnLi4uICcpLFxuXHRLV19FbHNlID0ga3coJ2Vsc2UnKSxcblx0S1dfRXhjZXB0RG8gPSBrdygnZXhjZXB0IScpLFxuXHRLV19FeGNlcHRWYWwgPSBrdygnZXhjZXB0JyksXG5cdEtXX0ZhbHNlID0ga3coJ2ZhbHNlJyksXG5cdEtXX0ZpbmFsbHkgPSBrdygnZmluYWxseSEnKSxcblx0S1dfRm9jdXMgPSBrd05vdE5hbWUoJ18nKSxcblx0S1dfRm9yQmFnID0ga3coJ0Bmb3InKSxcblx0S1dfRm9yRG8gPSBrdygnZm9yIScpLFxuXHRLV19Gb3JWYWwgPSBrdygnZm9yJyksXG5cdEtXX0Z1biA9IGt3Tm90TmFtZSgnfCcpLFxuXHRLV19GdW5EbyA9IGt3Tm90TmFtZSgnIXwnKSxcblx0S1dfRnVuR2VuID0ga3dOb3ROYW1lKCd+fCcpLFxuXHRLV19GdW5HZW5EbyA9IGt3Tm90TmFtZSgnfiF8JyksXG5cdEtXX0Z1blRoaXMgPSBrd05vdE5hbWUoJy58JyksXG5cdEtXX0Z1blRoaXNEbyA9IGt3Tm90TmFtZSgnLiF8JyksXG5cdEtXX0Z1blRoaXNHZW4gPSBrd05vdE5hbWUoJy5+fCcpLFxuXHRLV19GdW5UaGlzR2VuRG8gPSBrd05vdE5hbWUoJy5+IXwnKSxcblx0S1dfR2V0ID0ga3coJ2dldCcpLFxuXHRLV19JZlZhbCA9IGt3KCdpZicpLFxuXHRLV19JZkRvID0ga3coJ2lmIScpLFxuXHRLV19JbiA9IGt3KCdpbicpLFxuXHRLV19MYXp5ID0ga3dOb3ROYW1lKCd+JyksXG5cdEtXX01hcEVudHJ5ID0ga3coJy0+JyksXG5cdEtXX05ldyA9IGt3KCduZXcnKSxcblx0S1dfTm90ID0ga3coJ25vdCcpLFxuXHRLV19OdWxsID0ga3coJ251bGwnKSxcblx0S1dfT2JqQXNzaWduID0ga3coJy4gJyksXG5cdEtXX09yID0ga3coJ29yJyksXG5cdEtXX091dCA9IGt3KCdvdXQnKSxcblx0S1dfUGFzcyA9IGt3KCdwYXNzJyksXG5cdEtXX1JlZ2lvbiA9IGt3KCdyZWdpb24nKSxcblx0S1dfU2V0ID0ga3coJ3NldCEnKSxcblx0S1dfU3VwZXIgPSBrdygnc3VwZXInKSxcblx0S1dfU3RhdGljID0ga3coJ3N0YXRpYycpLFxuXHRLV19UaGlzTW9kdWxlRGlyZWN0b3J5ID0ga3coJ3RoaXMtbW9kdWxlLWRpcmVjdG9yeScpLFxuXHRLV19UaHJvdyA9IGt3KCd0aHJvdyEnKSxcblx0S1dfVHJ1ZSA9IGt3KCd0cnVlJyksXG5cdEtXX1RyeURvID0ga3coJ3RyeSEnKSxcblx0S1dfVHJ5VmFsID0ga3coJ3RyeScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VuZGVmaW5lZCA9IGt3KCd1bmRlZmluZWQnKSxcblx0S1dfVW5sZXNzVmFsID0ga3coJ3VubGVzcycpLFxuXHRLV19Vbmxlc3NEbyA9IGt3KCd1bmxlc3MhJyksXG5cdEtXX1VzZSA9IGt3KCd1c2UnKSxcblx0S1dfVXNlRGVidWcgPSBrdygndXNlLWRlYnVnJyksXG5cdEtXX1VzZURvID0ga3coJ3VzZSEnKSxcblx0S1dfVXNlTGF6eSA9IGt3KCd1c2V+JyksXG5cdEtXX1lpZWxkID0ga3coJzx+JyksXG5cdEtXX1lpZWxkVG8gPSBrdygnPH5+JyksXG5cblx0a2V5d29yZE5hbWUgPSBraW5kID0+XG5cdFx0a2V5d29yZEtpbmRUb05hbWUuZ2V0KGtpbmQpLFxuXHQvLyBSZXR1cm5zIC0xIGZvciByZXNlcnZlZCBrZXl3b3JkIG9yIHVuZGVmaW5lZCBmb3Igbm90LWEta2V5d29yZC5cblx0b3BLZXl3b3JkS2luZEZyb21OYW1lID0gbmFtZSA9PlxuXHRcdGtleXdvcmROYW1lVG9LaW5kLmdldChuYW1lKSxcblx0b3BLZXl3b3JkS2luZFRvU3BlY2lhbFZhbHVlS2luZCA9IGt3ID0+IHtcblx0XHRzd2l0Y2ggKGt3KSB7XG5cdFx0XHRjYXNlIEtXX0ZhbHNlOiByZXR1cm4gU1ZfRmFsc2Vcblx0XHRcdGNhc2UgS1dfTnVsbDogcmV0dXJuIFNWX051bGxcblx0XHRcdGNhc2UgS1dfU3VwZXI6IHJldHVybiBTVl9TdXBlclxuXHRcdFx0Y2FzZSBLV19UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gU1ZfVGhpc01vZHVsZURpcmVjdG9yeVxuXHRcdFx0Y2FzZSBLV19UcnVlOiByZXR1cm4gU1ZfVHJ1ZVxuXHRcdFx0Y2FzZSBLV19VbmRlZmluZWQ6IHJldHVybiBTVl9VbmRlZmluZWRcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9LFxuXHRpc0dyb3VwID0gKGdyb3VwS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBHcm91cCAmJiB0b2tlbi5raW5kID09PSBncm91cEtpbmQsXG5cdGlzS2V5d29yZCA9IChrZXl3b3JkS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkICYmIHRva2VuLmtpbmQgPT09IGtleXdvcmRLaW5kXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==