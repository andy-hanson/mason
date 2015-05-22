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
	const Token = (0, _tuplDistTupl.abstract)('Token', Object);
	exports.default = Token;

	const tokenType = function (name, namesTypes) {
		return (0, _tupl.default)(name, Token, null, ['loc', _Loc.default].concat(namesTypes));
	};

	const
	// `.name`, `..name`, etc.
	// Currently nDots > 1 is only used by `use` blocks.
	DotName = tokenType('DotName', ['nDots', Number, 'name', String]),
	     
	// kind is a G_***.
	Group = tokenType('Group', ['subTokens', [Token], 'kind', Number]),
	     
	/*
 A key"word" is any set of characters with a particular meaning.
 This can even include ones like `. ` (defines an object property, as in `key. value`).
 Kind is a KW_***. See the full list below.
 */
	Keyword = tokenType('Keyword', ['kind', Number]),
	     
	// A name is guaranteed to *not* be a keyword.
	// It's also not a DotName.
	Name = tokenType('Name', ['name', String]),
	     
	// These are parsed directly into NumberLiterals.
	TokenNumberLiteral = tokenType('TokenNumberLiteral', ['value', Number]);

	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	exports.TokenNumberLiteral = TokenNumberLiteral;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	(0, _util.implementMany)({ DotName: DotName, Group: Group, Keyword: Keyword, Name: Name, TokenNumberLiteral: TokenNumberLiteral }, 'show', {
		DotName: function () {
			return '' + '.'.repeat(this.nDots) + '' + this.name;
		},
		// TODO: better representation of k
		Group: function () {
			return 'group(k=' + groupKindToName.get(this.kind);
		},
		// TODO: better representation of k
		Keyword: function () {
			return (0, _CompileError.code)(keywordKindToName.get(this.kind));
		},
		Name: function () {
			return this.name;
		},
		TokenNumberLiteral: function () {
			return this.value;
		}
	});

	let nextGroupKind = 0;
	const groupKindToName = new Map(),
	      g = function (name) {
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
	      showGroupKind = function (groupKind) {
		return groupKindToName.get(groupKind);
	};

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
	kw = function (name) {
		const kind = kwNotName(name);
		keywordNameToKind.set(name, kind);
		return kind;
	},
	     
	// These keywords must be lexed specially.
	kwNotName = function (debugName) {
		const kind = nextKeywordKind;
		keywordKindToName.set(kind, debugName);
		nextKeywordKind = nextKeywordKind + 1;
		return kind;
	},
	      kwReserved = function (name) {
		keywordNameToKind.set(name, -1);
	};['for', 'of', 'return', 'with'].forEach(kwReserved);

	const KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_AssignMutate = kw(':='),
	      KW_BreakDo = kw('break!'),
	      KW_Case = kw('case'),
	      KW_CaseDo = kw('case!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger'),
	      KW_Else = kw('else'),
	      KW_False = kw('false'),
	      KW_Focus = kwNotName('_'),
	      KW_ForDo = kw('for!'),
	      KW_Fun = kw('|'),
	      KW_GenFun = kw('~|'),
	      KW_IfDo = kw('if!'),
	      KW_In = kw('in'),
	      KW_Lazy = kwNotName('~'),
	      KW_MapEntry = kw('->'),
	      KW_Null = kw('null'),
	      KW_ObjAssign = kw('. '),
	      KW_Out = kw('out'),
	      KW_Pass = kw('pass'),
	      KW_Region = kw('region'),
	      KW_This = kw('this'),
	      KW_ThisModuleDirectory = kw('this-module-directory'),
	      KW_True = kw('true'),
	      KW_Type = kwNotName(':'),
	      KW_Undefined = kw('undefined'),
	      KW_UnlessDo = kw('unless!'),
	      KW_Use = kw('use'),
	      KW_UseDebug = kw('use-debug'),
	      KW_UseDo = kw('use!'),
	      KW_UseLazy = kw('use~'),
	      KW_Yield = kw('<~'),
	      KW_YieldTo = kw('<~~'),
	     

	// Returns -1 for reserved keyword or undefined for not-a-keyword.
	opKeywordKindFromName = function (name) {
		return keywordNameToKind.get(name);
	},
	      opKeywordKindToSpecialValueKind = function (kw) {
		switch (kw) {
			case KW_False:
				return _MsAst.SV_False;
			case KW_Null:
				return _MsAst.SV_Null;
			case KW_This:
				return _MsAst.SV_This;
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
	      isGroup = function (groupKind, token) {
		return token instanceof Group && token.kind === groupKind;
	},
	      isKeyword = function (keywordKind, token) {
		return token instanceof Keyword && token.kind === keywordKind;
	};
	exports.KW_Assign = KW_Assign;
	exports.KW_AssignMutable = KW_AssignMutable;
	exports.KW_AssignMutate = KW_AssignMutate;
	exports.KW_BreakDo = KW_BreakDo;
	exports.KW_Case = KW_Case;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Else = KW_Else;
	exports.KW_False = KW_False;
	exports.KW_Focus = KW_Focus;
	exports.KW_ForDo = KW_ForDo;
	exports.KW_Fun = KW_Fun;
	exports.KW_GenFun = KW_GenFun;
	exports.KW_IfDo = KW_IfDo;
	exports.KW_In = KW_In;
	exports.KW_Lazy = KW_Lazy;
	exports.KW_MapEntry = KW_MapEntry;
	exports.KW_Null = KW_Null;
	exports.KW_ObjAssign = KW_ObjAssign;
	exports.KW_Out = KW_Out;
	exports.KW_Pass = KW_Pass;
	exports.KW_Region = KW_Region;
	exports.KW_This = KW_This;
	exports.KW_ThisModuleDirectory = KW_ThisModuleDirectory;
	exports.KW_True = KW_True;
	exports.KW_Type = KW_Type;
	exports.KW_Undefined = KW_Undefined;
	exports.KW_UnlessDo = KW_UnlessDo;
	exports.KW_Use = KW_Use;
	exports.KW_UseDebug = KW_UseDebug;
	exports.KW_UseDo = KW_UseDo;
	exports.KW_UseLazy = KW_UseLazy;
	exports.KW_Yield = KW_Yield;
	exports.KW_YieldTo = KW_YieldTo;
	exports.opKeywordKindFromName = opKeywordKindFromName;
	exports.opKeywordKindToSpecialValueKind = opKeywordKindToSpecialValueKind;
	exports.isGroup = isGroup;
	exports.isKeyword = isKeyword;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxPQUFNLEtBQUssR0FBRyxrQkFaQyxRQUFRLEVBWUEsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO21CQUN4QixLQUFLOztBQUVwQixPQUFNLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVO1NBQ2xDLG1CQUFLLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7QUFFcEQ7OztBQUdOLFFBQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7OztBQUVuRSxNQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFFLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7Ozs7OztBQU1wRSxRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7OztBQUdsRCxLQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7O0FBRTVDLG1CQUFrQixHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFFLE9BQU8sRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFBOztTQWJ6RSxPQUFPLEdBQVAsT0FBTztTQUVQLEtBQUssR0FBTCxLQUFLO1NBTUwsT0FBTyxHQUFQLE9BQU87U0FHUCxJQUFJLEdBQUosSUFBSTtTQUVKLGtCQUFrQixHQUFsQixrQkFBa0I7O0FBR25CLFdBakNTLGFBQWEsRUFpQ1IsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsT0FB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TztTQUVQLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsLCB7IGFic3RyYWN0IH0gZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgaW1wbGVtZW50TWFueSB9IGZyb20gJy4vdXRpbCdcblxuLypcblRva2VuIHRyZWUsIG91dHB1dCBvZiBgbGV4L2dyb3VwYC5cblRoYXQncyByaWdodDogaW4gTWFzb24sIHRoZSB0b2tlbnMgZm9ybSBhIHRyZWUgY29udGFpbmluZyBib3RoIHBsYWluIHRva2VucyBhbmQgR3JvdXAgdG9rZW5zLlxuVGhpcyBtZWFucyB0aGF0IHRoZSBwYXJzZXIgYXZvaWRzIGRvaW5nIG11Y2ggb2YgdGhlIHdvcmsgdGhhdCBwYXJzZXJzIG5vcm1hbGx5IGhhdmUgdG8gZG87XG5pdCBkb2Vzbid0IGhhdmUgdG8gaGFuZGxlIGEgXCJsZWZ0IHBhcmVudGhlc2lzXCIsIG9ubHkgYSBHcm91cCh0b2tlbnMsIEdfUGFyZW50aGVzaXMpLlxuKi9cbmNvbnN0IFRva2VuID0gYWJzdHJhY3QoJ1Rva2VuJywgT2JqZWN0KVxuZXhwb3J0IGRlZmF1bHQgVG9rZW5cblxuY29uc3QgdG9rZW5UeXBlID0gKG5hbWUsIG5hbWVzVHlwZXMpID0+XG5cdHR1cGwobmFtZSwgVG9rZW4sIG51bGwsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSlcblxuZXhwb3J0IGNvbnN0XG5cdC8vIGAubmFtZWAsIGAuLm5hbWVgLCBldGMuXG5cdC8vIEN1cnJlbnRseSBuRG90cyA+IDEgaXMgb25seSB1c2VkIGJ5IGB1c2VgIGJsb2Nrcy5cblx0RG90TmFtZSA9IHRva2VuVHlwZSgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8ga2luZCBpcyBhIEdfKioqLlxuXHRHcm91cCA9IHRva2VuVHlwZSgnR3JvdXAnLCBbICdzdWJUb2tlbnMnLCBbVG9rZW5dLCAna2luZCcsIE51bWJlciBdKSxcblx0Lypcblx0QSBrZXlcIndvcmRcIiBpcyBhbnkgc2V0IG9mIGNoYXJhY3RlcnMgd2l0aCBhIHBhcnRpY3VsYXIgbWVhbmluZy5cblx0VGhpcyBjYW4gZXZlbiBpbmNsdWRlIG9uZXMgbGlrZSBgLiBgIChkZWZpbmVzIGFuIG9iamVjdCBwcm9wZXJ0eSwgYXMgaW4gYGtleS4gdmFsdWVgKS5cblx0S2luZCBpcyBhIEtXXyoqKi4gU2VlIHRoZSBmdWxsIGxpc3QgYmVsb3cuXG5cdCovXG5cdEtleXdvcmQgPSB0b2tlblR5cGUoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0pLFxuXHQvLyBBIG5hbWUgaXMgZ3VhcmFudGVlZCB0byAqbm90KiBiZSBhIGtleXdvcmQuXG5cdC8vIEl0J3MgYWxzbyBub3QgYSBEb3ROYW1lLlxuXHROYW1lID0gdG9rZW5UeXBlKCdOYW1lJywgWyAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8gVGhlc2UgYXJlIHBhcnNlZCBkaXJlY3RseSBpbnRvIE51bWJlckxpdGVyYWxzLlxuXHRUb2tlbk51bWJlckxpdGVyYWwgPSB0b2tlblR5cGUoJ1Rva2VuTnVtYmVyTGl0ZXJhbCcsIFsgJ3ZhbHVlJywgTnVtYmVyIF0pXG5cbi8vIHRvU3RyaW5nIGlzIHVzZWQgYnkgc29tZSBwYXJzaW5nIGVycm9ycy4gVXNlIFUuaW5zcGVjdCBmb3IgYSBtb3JlIGRldGFpbGVkIHZpZXcuXG5pbXBsZW1lbnRNYW55KHsgRG90TmFtZSwgR3JvdXAsIEtleXdvcmQsIE5hbWUsIFRva2VuTnVtYmVyTGl0ZXJhbCB9LCAnc2hvdycsIHtcblx0RG90TmFtZSgpIHsgcmV0dXJuIGAkeycuJy5yZXBlYXQodGhpcy5uRG90cyl9JHt0aGlzLm5hbWV9YCB9LFxuXHQvLyBUT0RPOiBiZXR0ZXIgcmVwcmVzZW50YXRpb24gb2Yga1xuXHRHcm91cCgpIHsgcmV0dXJuIGBncm91cChrPSR7Z3JvdXBLaW5kVG9OYW1lLmdldCh0aGlzLmtpbmQpfWAgfSxcblx0Ly8gVE9ETzogYmV0dGVyIHJlcHJlc2VudGF0aW9uIG9mIGtcblx0S2V5d29yZCgpIHsgcmV0dXJuIGNvZGUoa2V5d29yZEtpbmRUb05hbWUuZ2V0KHRoaXMua2luZCkpIH0sXG5cdE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWUgfSxcblx0VG9rZW5OdW1iZXJMaXRlcmFsKCkgeyByZXR1cm4gdGhpcy52YWx1ZSB9XG59KVxuXG5sZXQgbmV4dEdyb3VwS2luZCA9IDBcbmNvbnN0XG5cdGdyb3VwS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0ZyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBuZXh0R3JvdXBLaW5kXG5cdFx0Z3JvdXBLaW5kVG9OYW1lLnNldChraW5kLCBuYW1lKVxuXHRcdG5leHRHcm91cEtpbmQgPSBuZXh0R3JvdXBLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH1cbmV4cG9ydCBjb25zdFxuXHRHX1BhcmVudGhlc2lzID0gZygnKCApJyksXG5cdEdfQnJhY2tldCA9IGcoJ1sgXScpLFxuXHQvLyBMaW5lcyBpbiBhbiBpbmRlbnRlZCBibG9jay5cblx0Ly8gU3ViLXRva2VucyB3aWxsIGFsd2F5cyBiZSBHX0xpbmUgZ3JvdXBzLlxuXHQvLyBOb3RlIHRoYXQgR19CbG9ja3MgZG8gbm90IGFsd2F5cyBtYXAgdG8gQmxvY2sqIE1zQXN0cy5cblx0R19CbG9jayA9IGcoJ2luZGVudGVkIGJsb2NrJyksXG5cdC8vIFdpdGhpbiBhIHF1b3RlLlxuXHQvLyBTdWItdG9rZW5zIG1heSBiZSBzdHJpbmdzLCBvciBHX1BhcmVudGhlc2lzIGdyb3Vwcy5cblx0R19RdW90ZSA9IGcoJ3F1b3RlJyksXG5cdC8qXG5cdFRva2VucyBvbiBhIGxpbmUuXG5cdE5PVEU6IFRoZSBpbmRlbnRlZCBibG9jayBmb2xsb3dpbmcgdGhlIGVuZCBvZiB0aGUgbGluZSBpcyBjb25zaWRlcmVkIHRvIGJlIGEgcGFydCBvZiB0aGUgbGluZSFcblx0VGhpcyBtZWFucyB0aGF0IGluIHRoaXMgY29kZTpcblx0XHRhXG5cdFx0XHRiXG5cdFx0XHRjXG5cdFx0ZFxuXHRUaGVyZSBhcmUgMiBsaW5lcywgb25lIHN0YXJ0aW5nIHdpdGggJ2EnIGFuZCBvbmUgc3RhcnRpbmcgd2l0aCAnZCcuXG5cdFRoZSBmaXJzdCBsaW5lIGNvbnRhaW5zICdhJyBhbmQgYSBHX0Jsb2NrIHdoaWNoIGluIHR1cm4gY29udGFpbnMgdHdvIG90aGVyIGxpbmVzLlxuXHQqL1xuXHRHX0xpbmUgPSBnKCdsaW5lJyksXG5cdC8qXG5cdEdyb3VwcyB0d28gb3IgbW9yZSB0b2tlbnMgdGhhdCBhcmUgKm5vdCogc2VwYXJhdGVkIGJ5IHNwYWNlcy5cblx0YGFbYl0uY2AgaXMgYW4gZXhhbXBsZS5cblx0QSBzaW5nbGUgdG9rZW4gb24gaXRzIG93biB3aWxsIG5vdCBiZSBnaXZlbiBhIEdfU3BhY2UuXG5cdCovXG5cdEdfU3BhY2UgPSBnKCdzcGFjZWQgZ3JvdXAnKSxcblx0c2hvd0dyb3VwS2luZCA9IGdyb3VwS2luZCA9PiBncm91cEtpbmRUb05hbWUuZ2V0KGdyb3VwS2luZClcblxuXG5sZXQgbmV4dEtleXdvcmRLaW5kID0gMFxuY29uc3Rcblx0a2V5d29yZE5hbWVUb0tpbmQgPSBuZXcgTWFwKCksXG5cdGtleXdvcmRLaW5kVG9OYW1lID0gbmV3IE1hcCgpLFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBhcmUgc3BlY2lhbCBuYW1lcy5cblx0Ly8gV2hlbiBsZXhpbmcgYSBuYW1lLCBhIG1hcCBsb29rdXAgaXMgZG9uZSBieSBrZXl3b3JkS2luZEZyb21OYW1lLlxuXHRrdyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBrd05vdE5hbWUobmFtZSlcblx0XHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwga2luZClcblx0XHRyZXR1cm4ga2luZFxuXHR9LFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBtdXN0IGJlIGxleGVkIHNwZWNpYWxseS5cblx0a3dOb3ROYW1lID0gZGVidWdOYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEtleXdvcmRLaW5kXG5cdFx0a2V5d29yZEtpbmRUb05hbWUuc2V0KGtpbmQsIGRlYnVnTmFtZSlcblx0XHRuZXh0S2V5d29yZEtpbmQgPSBuZXh0S2V5d29yZEtpbmQgKyAxXG5cdFx0cmV0dXJuIGtpbmRcblx0fSxcblx0a3dSZXNlcnZlZCA9IG5hbWUgPT4ge1xuXHRcdGtleXdvcmROYW1lVG9LaW5kLnNldChuYW1lLCAtMSlcblx0fVxuXG47WyAnZm9yJywgJ29mJywgJ3JldHVybicsICd3aXRoJyBdLmZvckVhY2goa3dSZXNlcnZlZClcblxuZXhwb3J0IGNvbnN0XG5cdEtXX0Fzc2lnbiA9IGt3KCc9JyksXG5cdEtXX0Fzc2lnbk11dGFibGUgPSBrdygnOjo9JyksXG5cdEtXX0Fzc2lnbk11dGF0ZSA9IGt3KCc6PScpLFxuXHRLV19CcmVha0RvID0ga3coJ2JyZWFrIScpLFxuXHRLV19DYXNlID0ga3coJ2Nhc2UnKSxcblx0S1dfQ2FzZURvID0ga3coJ2Nhc2UhJyksXG5cdEtXX0RlYnVnID0ga3coJ2RlYnVnJyksXG5cdEtXX0RlYnVnZ2VyID0ga3coJ2RlYnVnZ2VyJyksXG5cdEtXX0Vsc2UgPSBrdygnZWxzZScpLFxuXHRLV19GYWxzZSA9IGt3KCdmYWxzZScpLFxuXHRLV19Gb2N1cyA9IGt3Tm90TmFtZSgnXycpLFxuXHRLV19Gb3JEbyA9IGt3KCdmb3IhJyksXG5cdEtXX0Z1biA9IGt3KCd8JyksXG5cdEtXX0dlbkZ1biA9IGt3KCd+fCcpLFxuXHRLV19JZkRvID0ga3coJ2lmIScpLFxuXHRLV19JbiA9IGt3KCdpbicpLFxuXHRLV19MYXp5ID0ga3dOb3ROYW1lKCd+JyksXG5cdEtXX01hcEVudHJ5ID0ga3coJy0+JyksXG5cdEtXX051bGwgPSBrdygnbnVsbCcpLFxuXHRLV19PYmpBc3NpZ24gPSBrdygnLiAnKSxcblx0S1dfT3V0ID0ga3coJ291dCcpLFxuXHRLV19QYXNzID0ga3coJ3Bhc3MnKSxcblx0S1dfUmVnaW9uID0ga3coJ3JlZ2lvbicpLFxuXHRLV19UaGlzID0ga3coJ3RoaXMnKSxcblx0S1dfVGhpc01vZHVsZURpcmVjdG9yeSA9IGt3KCd0aGlzLW1vZHVsZS1kaXJlY3RvcnknKSxcblx0S1dfVHJ1ZSA9IGt3KCd0cnVlJyksXG5cdEtXX1R5cGUgPSBrd05vdE5hbWUoJzonKSxcblx0S1dfVW5kZWZpbmVkID0ga3coJ3VuZGVmaW5lZCcpLFxuXHRLV19Vbmxlc3NEbyA9IGt3KCd1bmxlc3MhJyksXG5cdEtXX1VzZSA9IGt3KCd1c2UnKSxcblx0S1dfVXNlRGVidWcgPSBrdygndXNlLWRlYnVnJyksXG5cdEtXX1VzZURvID0ga3coJ3VzZSEnKSxcblx0S1dfVXNlTGF6eSA9IGt3KCd1c2V+JyksXG5cdEtXX1lpZWxkID0ga3coJzx+JyksXG5cdEtXX1lpZWxkVG8gPSBrdygnPH5+JyksXG5cblx0Ly8gUmV0dXJucyAtMSBmb3IgcmVzZXJ2ZWQga2V5d29yZCBvciB1bmRlZmluZWQgZm9yIG5vdC1hLWtleXdvcmQuXG5cdG9wS2V5d29yZEtpbmRGcm9tTmFtZSA9IG5hbWUgPT5cblx0XHRrZXl3b3JkTmFtZVRvS2luZC5nZXQobmFtZSksXG5cdG9wS2V5d29yZEtpbmRUb1NwZWNpYWxWYWx1ZUtpbmQgPSBrdyA9PiB7XG5cdFx0c3dpdGNoIChrdykge1xuXHRcdFx0Y2FzZSBLV19GYWxzZTogcmV0dXJuIFNWX0ZhbHNlXG5cdFx0XHRjYXNlIEtXX051bGw6IHJldHVybiBTVl9OdWxsXG5cdFx0XHRjYXNlIEtXX1RoaXM6IHJldHVybiBTVl9UaGlzXG5cdFx0XHRjYXNlIEtXX1RoaXNNb2R1bGVEaXJlY3Rvcnk6IHJldHVybiBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5XG5cdFx0XHRjYXNlIEtXX1RydWU6IHJldHVybiBTVl9UcnVlXG5cdFx0XHRjYXNlIEtXX1VuZGVmaW5lZDogcmV0dXJuIFNWX1VuZGVmaW5lZFxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIG51bGxcblx0XHR9XG5cdH0sXG5cdGlzR3JvdXAgPSAoZ3JvdXBLaW5kLCB0b2tlbikgPT5cblx0XHR0b2tlbiBpbnN0YW5jZW9mIEdyb3VwICYmIHRva2VuLmtpbmQgPT09IGdyb3VwS2luZCxcblx0aXNLZXl3b3JkID0gKGtleXdvcmRLaW5kLCB0b2tlbikgPT5cblx0XHR0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQgJiYgdG9rZW4ua2luZCA9PT0ga2V5d29yZEtpbmRcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9