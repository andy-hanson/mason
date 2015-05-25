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
	const tokenType = function (name, namesTypes) {
		return (0, _tupl.default)(name, Object, null, ['loc', _Loc.default].concat(namesTypes));
	};

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
	(0, _util.implementMany)({ DotName: DotName, Group: Group, Keyword: Keyword, Name: Name, NumberLiteral: _MsAst.NumberLiteral }, 'show', {
		DotName: function () {
			return '' + '.'.repeat(this.nDots) + '' + this.name;
		},
		Group: function () {
			return 'group(k=' + groupKindToName.get(this.kind);
		},
		Keyword: function () {
			return (0, _CompileError.code)(keywordKindToName.get(this.kind));
		},
		Name: function () {
			return this.name;
		},
		NumberLiteral: function () {
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
		return keywordNameToKind.set(name, -1);
	};['for', 'of', 'return', 'with'].forEach(kwReserved);

	const KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_LocalMutate = kw(':='),
	      KW_Break = kw('break'),
	      KW_BreakDo = kw('break!'),
	      KW_Built = kw('built'),
	      KW_Case = kw('case'),
	      KW_CaseDo = kw('case!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger!'),
	      KW_Else = kw('else'),
	      KW_False = kw('false'),
	      KW_Focus = kwNotName('_'),
	      KW_ForDo = kw('for!'),
	      KW_Fun = kw('|'),
	      KW_FunDo = kw('!|'),
	      KW_GenFun = kw('~|'),
	      KW_GenFunDo = kw('~!|'),
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
	exports.KW_LocalMutate = KW_LocalMutate;
	exports.KW_Break = KW_Break;
	exports.KW_BreakDo = KW_BreakDo;
	exports.KW_Built = KW_Built;
	exports.KW_Case = KW_Case;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Else = KW_Else;
	exports.KW_False = KW_False;
	exports.KW_Focus = KW_Focus;
	exports.KW_ForDo = KW_ForDo;
	exports.KW_Fun = KW_Fun;
	exports.KW_FunDo = KW_FunDo;
	exports.KW_GenFun = KW_GenFun;
	exports.KW_GenFunDo = KW_GenFunDo;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxPQUFNLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVO1NBQ2xDLG1CQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7QUFFckQ7OztBQUdOLFFBQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7OztBQUVuRSxNQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFFLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7Ozs7OztBQU1yRSxRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7OztBQUdsRCxLQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFBO1NBWDVDLE9BQU8sR0FBUCxPQUFPO1NBRVAsS0FBSyxHQUFMLEtBQUs7U0FNTCxPQUFPLEdBQVAsT0FBTztTQUdQLElBQUksR0FBSixJQUFJOzs7O0FBSUwsV0E3QlMsYUFBYSxFQTZCUixFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsYUFBYSxTQWhDbkQsYUFBYSxBQWdDc0MsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN2RSxTQUFPLEVBQUEsWUFBRztBQUFFLGVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQUcsSUFBSSxDQUFDLElBQUks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VUFBVSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7T0FDekIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDdEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDdkIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDdEIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7T0FDN0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7T0FDdEIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7T0FDekIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDckIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDaEIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDbkIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDcEIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDdkIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDbkIsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDaEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7T0FDeEIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDdEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDdkIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDbEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7T0FDeEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsc0JBQXNCLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO09B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QjtTQUVyQiwrQkFBK0IsR0FBL0IsK0JBQStCO1NBVy9CLE9BQU8sR0FBUCxPQUFPO1NBRVAsU0FBUyxHQUFULFNBQVMiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgaW1wbGVtZW50TWFueSB9IGZyb20gJy4vdXRpbCdcblxuLypcblRva2VuIHRyZWUsIG91dHB1dCBvZiBgbGV4L2dyb3VwYC5cblRoYXQncyByaWdodDogaW4gTWFzb24sIHRoZSB0b2tlbnMgZm9ybSBhIHRyZWUgY29udGFpbmluZyBib3RoIHBsYWluIHRva2VucyBhbmQgR3JvdXAgdG9rZW5zLlxuVGhpcyBtZWFucyB0aGF0IHRoZSBwYXJzZXIgYXZvaWRzIGRvaW5nIG11Y2ggb2YgdGhlIHdvcmsgdGhhdCBwYXJzZXJzIG5vcm1hbGx5IGhhdmUgdG8gZG87XG5pdCBkb2Vzbid0IGhhdmUgdG8gaGFuZGxlIGEgXCJsZWZ0IHBhcmVudGhlc2lzXCIsIG9ubHkgYSBHcm91cCh0b2tlbnMsIEdfUGFyZW50aGVzaXMpLlxuKi9cbmNvbnN0IHRva2VuVHlwZSA9IChuYW1lLCBuYW1lc1R5cGVzKSA9PlxuXHR0dXBsKG5hbWUsIE9iamVjdCwgbnVsbCwgWyAnbG9jJywgTG9jIF0uY29uY2F0KG5hbWVzVHlwZXMpKVxuXG5leHBvcnQgY29uc3Rcblx0Ly8gYC5uYW1lYCwgYC4ubmFtZWAsIGV0Yy5cblx0Ly8gQ3VycmVudGx5IG5Eb3RzID4gMSBpcyBvbmx5IHVzZWQgYnkgYHVzZWAgYmxvY2tzLlxuXHREb3ROYW1lID0gdG9rZW5UeXBlKCdEb3ROYW1lJywgWyAnbkRvdHMnLCBOdW1iZXIsICduYW1lJywgU3RyaW5nIF0pLFxuXHQvLyBraW5kIGlzIGEgR18qKiouXG5cdEdyb3VwID0gdG9rZW5UeXBlKCdHcm91cCcsIFsgJ3N1YlRva2VucycsIFtPYmplY3RdLCAna2luZCcsIE51bWJlciBdKSxcblx0Lypcblx0QSBrZXlcIndvcmRcIiBpcyBhbnkgc2V0IG9mIGNoYXJhY3RlcnMgd2l0aCBhIHBhcnRpY3VsYXIgbWVhbmluZy5cblx0VGhpcyBjYW4gZXZlbiBpbmNsdWRlIG9uZXMgbGlrZSBgLiBgIChkZWZpbmVzIGFuIG9iamVjdCBwcm9wZXJ0eSwgYXMgaW4gYGtleS4gdmFsdWVgKS5cblx0S2luZCBpcyBhIEtXXyoqKi4gU2VlIHRoZSBmdWxsIGxpc3QgYmVsb3cuXG5cdCovXG5cdEtleXdvcmQgPSB0b2tlblR5cGUoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0pLFxuXHQvLyBBIG5hbWUgaXMgZ3VhcmFudGVlZCB0byAqbm90KiBiZSBhIGtleXdvcmQuXG5cdC8vIEl0J3MgYWxzbyBub3QgYSBEb3ROYW1lLlxuXHROYW1lID0gdG9rZW5UeXBlKCdOYW1lJywgWyAnbmFtZScsIFN0cmluZyBdKVxuXHQvLyBOdW1iZXJMaXRlcmFsIGlzIGFsc28gYm90aCBhIHRva2VuIGFuZCBhbiBNc0FzdC5cblxuLy8gdG9TdHJpbmcgaXMgdXNlZCBieSBzb21lIHBhcnNpbmcgZXJyb3JzLiBVc2UgVS5pbnNwZWN0IGZvciBhIG1vcmUgZGV0YWlsZWQgdmlldy5cbmltcGxlbWVudE1hbnkoeyBEb3ROYW1lLCBHcm91cCwgS2V5d29yZCwgTmFtZSwgTnVtYmVyTGl0ZXJhbCB9LCAnc2hvdycsIHtcblx0RG90TmFtZSgpIHsgcmV0dXJuIGAkeycuJy5yZXBlYXQodGhpcy5uRG90cyl9JHt0aGlzLm5hbWV9YCB9LFxuXHRHcm91cCgpIHsgcmV0dXJuIGBncm91cChrPSR7Z3JvdXBLaW5kVG9OYW1lLmdldCh0aGlzLmtpbmQpfWAgfSxcblx0S2V5d29yZCgpIHsgcmV0dXJuIGNvZGUoa2V5d29yZEtpbmRUb05hbWUuZ2V0KHRoaXMua2luZCkpIH0sXG5cdE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWUgfSxcblx0TnVtYmVyTGl0ZXJhbCgpIHsgcmV0dXJuIHRoaXMudmFsdWUgfVxufSlcblxubGV0IG5leHRHcm91cEtpbmQgPSAwXG5jb25zdFxuXHRncm91cEtpbmRUb05hbWUgPSBuZXcgTWFwKCksXG5cdGcgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEdyb3VwS2luZFxuXHRcdGdyb3VwS2luZFRvTmFtZS5zZXQoa2luZCwgbmFtZSlcblx0XHRuZXh0R3JvdXBLaW5kID0gbmV4dEdyb3VwS2luZCArIDFcblx0XHRyZXR1cm4ga2luZFxuXHR9XG5leHBvcnQgY29uc3Rcblx0R19QYXJlbnRoZXNpcyA9IGcoJyggKScpLFxuXHRHX0JyYWNrZXQgPSBnKCdbIF0nKSxcblx0Ly8gTGluZXMgaW4gYW4gaW5kZW50ZWQgYmxvY2suXG5cdC8vIFN1Yi10b2tlbnMgd2lsbCBhbHdheXMgYmUgR19MaW5lIGdyb3Vwcy5cblx0Ly8gTm90ZSB0aGF0IEdfQmxvY2tzIGRvIG5vdCBhbHdheXMgbWFwIHRvIEJsb2NrKiBNc0FzdHMuXG5cdEdfQmxvY2sgPSBnKCdpbmRlbnRlZCBibG9jaycpLFxuXHQvLyBXaXRoaW4gYSBxdW90ZS5cblx0Ly8gU3ViLXRva2VucyBtYXkgYmUgc3RyaW5ncywgb3IgR19QYXJlbnRoZXNpcyBncm91cHMuXG5cdEdfUXVvdGUgPSBnKCdxdW90ZScpLFxuXHQvKlxuXHRUb2tlbnMgb24gYSBsaW5lLlxuXHROT1RFOiBUaGUgaW5kZW50ZWQgYmxvY2sgZm9sbG93aW5nIHRoZSBlbmQgb2YgdGhlIGxpbmUgaXMgY29uc2lkZXJlZCB0byBiZSBhIHBhcnQgb2YgdGhlIGxpbmUhXG5cdFRoaXMgbWVhbnMgdGhhdCBpbiB0aGlzIGNvZGU6XG5cdFx0YVxuXHRcdFx0YlxuXHRcdFx0Y1xuXHRcdGRcblx0VGhlcmUgYXJlIDIgbGluZXMsIG9uZSBzdGFydGluZyB3aXRoICdhJyBhbmQgb25lIHN0YXJ0aW5nIHdpdGggJ2QnLlxuXHRUaGUgZmlyc3QgbGluZSBjb250YWlucyAnYScgYW5kIGEgR19CbG9jayB3aGljaCBpbiB0dXJuIGNvbnRhaW5zIHR3byBvdGhlciBsaW5lcy5cblx0Ki9cblx0R19MaW5lID0gZygnbGluZScpLFxuXHQvKlxuXHRHcm91cHMgdHdvIG9yIG1vcmUgdG9rZW5zIHRoYXQgYXJlICpub3QqIHNlcGFyYXRlZCBieSBzcGFjZXMuXG5cdGBhW2JdLmNgIGlzIGFuIGV4YW1wbGUuXG5cdEEgc2luZ2xlIHRva2VuIG9uIGl0cyBvd24gd2lsbCBub3QgYmUgZ2l2ZW4gYSBHX1NwYWNlLlxuXHQqL1xuXHRHX1NwYWNlID0gZygnc3BhY2VkIGdyb3VwJyksXG5cdHNob3dHcm91cEtpbmQgPSBncm91cEtpbmQgPT4gZ3JvdXBLaW5kVG9OYW1lLmdldChncm91cEtpbmQpXG5cblxubGV0IG5leHRLZXl3b3JkS2luZCA9IDBcbmNvbnN0XG5cdGtleXdvcmROYW1lVG9LaW5kID0gbmV3IE1hcCgpLFxuXHRrZXl3b3JkS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgYXJlIHNwZWNpYWwgbmFtZXMuXG5cdC8vIFdoZW4gbGV4aW5nIGEgbmFtZSwgYSBtYXAgbG9va3VwIGlzIGRvbmUgYnkga2V5d29yZEtpbmRGcm9tTmFtZS5cblx0a3cgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0ga3dOb3ROYW1lKG5hbWUpXG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuc2V0KG5hbWUsIGtpbmQpXG5cdFx0cmV0dXJuIGtpbmRcblx0fSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgbXVzdCBiZSBsZXhlZCBzcGVjaWFsbHkuXG5cdGt3Tm90TmFtZSA9IGRlYnVnTmFtZSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IG5leHRLZXl3b3JkS2luZFxuXHRcdGtleXdvcmRLaW5kVG9OYW1lLnNldChraW5kLCBkZWJ1Z05hbWUpXG5cdFx0bmV4dEtleXdvcmRLaW5kID0gbmV4dEtleXdvcmRLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH0sXG5cdGt3UmVzZXJ2ZWQgPSBuYW1lID0+XG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuc2V0KG5hbWUsIC0xKVxuXG47IFsgJ2ZvcicsICdvZicsICdyZXR1cm4nLCAnd2l0aCcgXS5mb3JFYWNoKGt3UmVzZXJ2ZWQpXG5cbmV4cG9ydCBjb25zdFxuXHRLV19Bc3NpZ24gPSBrdygnPScpLFxuXHRLV19Bc3NpZ25NdXRhYmxlID0ga3coJzo6PScpLFxuXHRLV19Mb2NhbE11dGF0ZSA9IGt3KCc6PScpLFxuXHRLV19CcmVhayA9IGt3KCdicmVhaycpLFxuXHRLV19CcmVha0RvID0ga3coJ2JyZWFrIScpLFxuXHRLV19CdWlsdCA9IGt3KCdidWlsdCcpLFxuXHRLV19DYXNlID0ga3coJ2Nhc2UnKSxcblx0S1dfQ2FzZURvID0ga3coJ2Nhc2UhJyksXG5cdEtXX0RlYnVnID0ga3coJ2RlYnVnJyksXG5cdEtXX0RlYnVnZ2VyID0ga3coJ2RlYnVnZ2VyIScpLFxuXHRLV19FbHNlID0ga3coJ2Vsc2UnKSxcblx0S1dfRmFsc2UgPSBrdygnZmFsc2UnKSxcblx0S1dfRm9jdXMgPSBrd05vdE5hbWUoJ18nKSxcblx0S1dfRm9yRG8gPSBrdygnZm9yIScpLFxuXHRLV19GdW4gPSBrdygnfCcpLFxuXHRLV19GdW5EbyA9IGt3KCchfCcpLFxuXHRLV19HZW5GdW4gPSBrdygnfnwnKSxcblx0S1dfR2VuRnVuRG8gPSBrdygnfiF8JyksXG5cdEtXX0lmRG8gPSBrdygnaWYhJyksXG5cdEtXX0luID0ga3coJ2luJyksXG5cdEtXX0xhenkgPSBrd05vdE5hbWUoJ34nKSxcblx0S1dfTWFwRW50cnkgPSBrdygnLT4nKSxcblx0S1dfTnVsbCA9IGt3KCdudWxsJyksXG5cdEtXX09iakFzc2lnbiA9IGt3KCcuICcpLFxuXHRLV19PdXQgPSBrdygnb3V0JyksXG5cdEtXX1Bhc3MgPSBrdygncGFzcycpLFxuXHRLV19SZWdpb24gPSBrdygncmVnaW9uJyksXG5cdEtXX1RoaXMgPSBrdygndGhpcycpLFxuXHRLV19UaGlzTW9kdWxlRGlyZWN0b3J5ID0ga3coJ3RoaXMtbW9kdWxlLWRpcmVjdG9yeScpLFxuXHRLV19UcnVlID0ga3coJ3RydWUnKSxcblx0S1dfVHlwZSA9IGt3Tm90TmFtZSgnOicpLFxuXHRLV19VbmRlZmluZWQgPSBrdygndW5kZWZpbmVkJyksXG5cdEtXX1VubGVzc0RvID0ga3coJ3VubGVzcyEnKSxcblx0S1dfVXNlID0ga3coJ3VzZScpLFxuXHRLV19Vc2VEZWJ1ZyA9IGt3KCd1c2UtZGVidWcnKSxcblx0S1dfVXNlRG8gPSBrdygndXNlIScpLFxuXHRLV19Vc2VMYXp5ID0ga3coJ3VzZX4nKSxcblx0S1dfWWllbGQgPSBrdygnPH4nKSxcblx0S1dfWWllbGRUbyA9IGt3KCc8fn4nKSxcblxuXHQvLyBSZXR1cm5zIC0xIGZvciByZXNlcnZlZCBrZXl3b3JkIG9yIHVuZGVmaW5lZCBmb3Igbm90LWEta2V5d29yZC5cblx0b3BLZXl3b3JkS2luZEZyb21OYW1lID0gbmFtZSA9PlxuXHRcdGtleXdvcmROYW1lVG9LaW5kLmdldChuYW1lKSxcblx0b3BLZXl3b3JkS2luZFRvU3BlY2lhbFZhbHVlS2luZCA9IGt3ID0+IHtcblx0XHRzd2l0Y2ggKGt3KSB7XG5cdFx0XHRjYXNlIEtXX0ZhbHNlOiByZXR1cm4gU1ZfRmFsc2Vcblx0XHRcdGNhc2UgS1dfTnVsbDogcmV0dXJuIFNWX051bGxcblx0XHRcdGNhc2UgS1dfVGhpczogcmV0dXJuIFNWX1RoaXNcblx0XHRcdGNhc2UgS1dfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIFNWX1RoaXNNb2R1bGVEaXJlY3Rvcnlcblx0XHRcdGNhc2UgS1dfVHJ1ZTogcmV0dXJuIFNWX1RydWVcblx0XHRcdGNhc2UgS1dfVW5kZWZpbmVkOiByZXR1cm4gU1ZfVW5kZWZpbmVkXG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gbnVsbFxuXHRcdH1cblx0fSxcblx0aXNHcm91cCA9IChncm91cEtpbmQsIHRva2VuKSA9PlxuXHRcdHRva2VuIGluc3RhbmNlb2YgR3JvdXAgJiYgdG9rZW4ua2luZCA9PT0gZ3JvdXBLaW5kLFxuXHRpc0tleXdvcmQgPSAoa2V5d29yZEtpbmQsIHRva2VuKSA9PlxuXHRcdHRva2VuIGluc3RhbmNlb2YgS2V5d29yZCAmJiB0b2tlbi5raW5kID09PSBrZXl3b3JkS2luZFxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=