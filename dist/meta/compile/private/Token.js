if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', '../MsAst', './util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _MsAst, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	/*
 Token tree, output of `lex/group`.
 That's right: in Mason, the tokens form a tree containing both plain tokens and Group tokens.
 This means that the parser avoids doing much of the work that parsers normally have to do;
 it doesn't have to handle a "left parenthesis", only a Group(tokens, G_Parenthesis).
 */
	const Token = (0, _tuplDistTupl.abstract)('Token', Object);
	exports.default = Token;

	const tokenType = function (name, namesTypes) {
		return (0, _tupl)(name, Token, null, ['loc', _Loc].concat(namesTypes));
	};

	const
	// `name_`.
	CallOnFocus = tokenType('CallOnFocus', ['name', String]),
	     
	// `.name`, `..name`, etc.
	// Currently nDots > 1 is only used by `use` blocks.
	DotName = tokenType('DotName', ['nDots', Number, 'name', String]),
	     
	// kind is a G_***.
	Group = tokenType('Group', ['tokens', [Token], 'kind', Number]),
	     
	/*
 A key"word" is any set of characters with a particular meaning.
 This can even include ones like `. ` (defines an object property, as in `key. value`).
 Kind is a KW_***. See the full list below.
 */
	Keyword = tokenType('Keyword', ['kind', Number]),
	     
	// A name is guaranteed to *not* be a keyword.
	// It's also not a CallOnFocus or DotName.
	Name = tokenType('Name', ['name', String]),
	     
	// These are parsed directly into NumberLiterals.
	TokenNumberLiteral = tokenType('TokenNumberLiteral', ['value', Number]);

	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	exports.TokenNumberLiteral = TokenNumberLiteral;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	(0, _util.implementMany)({ CallOnFocus: CallOnFocus, DotName: DotName, Group: Group, Keyword: Keyword, Name: Name, TokenNumberLiteral: TokenNumberLiteral }, 'show', {
		CallOnFocus: function () {
			return '' + this.name + '_';
		},
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
	};
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
	      keywordKindFromName = function (name) {
		return keywordNameToKind.get(name);
	},
	      opKWtoSV = function (kw) {
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
	exports.keywordKindFromName = keywordKindFromName;
	exports.opKWtoSV = opKWtoSV;
	exports.isGroup = isGroup;
	exports.isKeyword = isKeyword;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxPQUFNLEtBQUssR0FBRyxrQkFaQyxRQUFRLEVBWUEsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO21CQUN4QixLQUFLOztBQUVwQixPQUFNLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVO1NBQ2xDLFdBQUssSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7RUFBQSxDQUFBOztBQUVwRDs7QUFFTixZQUFXLEdBQUcsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7OztBQUcxRCxRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDOzs7QUFFbkUsTUFBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7Ozs7QUFNakUsUUFBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7QUFHbEQsS0FBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7OztBQUU1QyxtQkFBa0IsR0FBRyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBRSxPQUFPLEVBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTs7U0FoQnpFLFdBQVcsR0FBWCxXQUFXO1NBR1gsT0FBTyxHQUFQLE9BQU87U0FFUCxLQUFLLEdBQUwsS0FBSztTQU1MLE9BQU8sR0FBUCxPQUFPO1NBR1AsSUFBSSxHQUFKLElBQUk7U0FFSixrQkFBa0IsR0FBbEIsa0JBQWtCOztBQUduQixXQW5DUyxhQUFhLEVBbUNSLEVBQUUsV0FBVyxFQUFYLFdBQVcsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLGtCQUFrQixFQUFsQixrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN6RixhQUFXLEVBQUEsWUFBRztBQUFFLGVBQVUsSUFBSSxDQUFDLElBQUksT0FBRztHQUFFO0FBQ3hDLFNBQU8sRUFBQSxZQUFHO0FBQUUsZUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBRyxJQUFJLENBQUMsSUFBSSxDQUFFO0dBQUU7O0FBRTVELE9BQUssRUFBQSxZQUFHO0FBQUUsdUJBQWtCLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFO0dBQUU7O0FBRTlELFNBQU8sRUFBQSxZQUFHO0FBQUUsVUFBTyxrQkE1Q1gsSUFBSSxFQTRDWSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7R0FBRTtBQUMzRCxNQUFJLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtHQUFFO0FBQzNCLG9CQUFrQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7R0FBRTtFQUMxQyxDQUFDLENBQUE7O0FBRUYsS0FBSSxhQUFhLEdBQUcsQ0FBQyxDQUFBO0FBQ3JCLE9BQ0MsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFO09BQzNCLENBQUMsR0FBRyxVQUFBLElBQUksRUFBSTtBQUNYLFFBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQTtBQUMxQixpQkFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDL0IsZUFBYSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUE7QUFDakMsU0FBTyxJQUFJLENBQUE7RUFDWCxDQUFBO0FBQ0ssT0FDTixhQUFhLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztPQUN4QixTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Ozs7QUFJcEIsUUFBTyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7OztBQUc3QixRQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7OztBQVlwQixPQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztBQU1sQixRQUFPLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQztPQUMzQixhQUFhLEdBQUcsVUFBQSxTQUFTO1NBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7RUFBQSxDQUFBOztTQTNCM0QsYUFBYSxHQUFiLGFBQWE7U0FDYixTQUFTLEdBQVQsU0FBUztTQUlULE9BQU8sR0FBUCxPQUFPO1NBR1AsT0FBTyxHQUFQLE9BQU87U0FZUCxNQUFNLEdBQU4sTUFBTTtTQU1OLE9BQU8sR0FBUCxPQUFPO1NBQ1AsYUFBYSxHQUFiLGFBQWE7QUFHZCxLQUFJLGVBQWUsR0FBRyxDQUFDLENBQUE7QUFDdkIsT0FDQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBRTtPQUM3QixpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBRTs7OztBQUc3QixHQUFFLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDWixRQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDNUIsbUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNqQyxTQUFPLElBQUksQ0FBQTtFQUNYOzs7QUFFRCxVQUFTLEdBQUcsVUFBQSxTQUFTLEVBQUk7QUFDeEIsUUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFBO0FBQzVCLG1CQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDdEMsaUJBQWUsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLFNBQU8sSUFBSSxDQUFBO0VBQ1gsQ0FBQTtBQUNLLE9BQ04sU0FBUyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDbkIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUM1QixlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUMxQixVQUFVLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUN6QixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixTQUFTLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUN2QixRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUN0QixXQUFXLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztPQUM1QixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztPQUN0QixRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN6QixRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNyQixNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNoQixTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNwQixPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNuQixLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNoQixPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN4QixXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUN0QixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUN2QixNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNsQixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUN4QixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixzQkFBc0IsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7T0FDcEQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDcEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7T0FDeEIsWUFBWSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7T0FDOUIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7T0FDM0IsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FDbEIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7T0FDN0IsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDckIsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7T0FDdkIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDbkIsVUFBVSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7T0FFdEIsbUJBQW1CLEdBQUcsVUFBQSxJQUFJO1NBQ3pCLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7RUFBQTtPQUM1QixRQUFRLEdBQUcsVUFBQSxFQUFFLEVBQUk7QUFDaEIsVUFBUSxFQUFFO0FBQ1QsUUFBSyxRQUFRO0FBQUUsa0JBbkpULFFBQVEsQ0FtSmdCO0FBQUEsQUFDOUIsUUFBSyxPQUFPO0FBQUUsa0JBcEpFLE9BQU8sQ0FvSks7QUFBQSxBQUM1QixRQUFLLE9BQU87QUFBRSxrQkFySlcsT0FBTyxDQXFKSjtBQUFBLEFBQzVCLFFBQUssc0JBQXNCO0FBQUUsa0JBdEpLLHNCQUFzQixDQXNKRTtBQUFBLEFBQzFELFFBQUssT0FBTztBQUFFLGtCQXZKNEMsT0FBTyxDQXVKckM7QUFBQSxBQUM1QixRQUFLLFlBQVk7QUFBRSxrQkF4SmdELFlBQVksQ0F3SnpDO0FBQUEsQUFDdEM7QUFBUyxXQUFPLElBQUksQ0FBQTtBQUFBLEdBQ3BCO0VBQ0Q7T0FDRCxPQUFPLEdBQUcsVUFBQyxTQUFTLEVBQUUsS0FBSztTQUMxQixLQUFLLFlBQVksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUztFQUFBO09BQ25ELFNBQVMsR0FBRyxVQUFDLFdBQVcsRUFBRSxLQUFLO1NBQzlCLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXO0VBQUEsQ0FBQTtTQXBEdkQsU0FBUyxHQUFULFNBQVM7U0FDVCxnQkFBZ0IsR0FBaEIsZ0JBQWdCO1NBQ2hCLGVBQWUsR0FBZixlQUFlO1NBQ2YsVUFBVSxHQUFWLFVBQVU7U0FDVixPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsUUFBUSxHQUFSLFFBQVE7U0FDUixXQUFXLEdBQVgsV0FBVztTQUNYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsUUFBUSxHQUFSLFFBQVE7U0FDUixRQUFRLEdBQVIsUUFBUTtTQUNSLFFBQVEsR0FBUixRQUFRO1NBQ1IsTUFBTSxHQUFOLE1BQU07U0FDTixTQUFTLEdBQVQsU0FBUztTQUNULE9BQU8sR0FBUCxPQUFPO1NBQ1AsS0FBSyxHQUFMLEtBQUs7U0FDTCxPQUFPLEdBQVAsT0FBTztTQUNQLFdBQVcsR0FBWCxXQUFXO1NBQ1gsT0FBTyxHQUFQLE9BQU87U0FDUCxZQUFZLEdBQVosWUFBWTtTQUNaLE1BQU0sR0FBTixNQUFNO1NBQ04sT0FBTyxHQUFQLE9BQU87U0FDUCxTQUFTLEdBQVQsU0FBUztTQUNULE9BQU8sR0FBUCxPQUFPO1NBQ1Asc0JBQXNCLEdBQXRCLHNCQUFzQjtTQUN0QixPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsWUFBWSxHQUFaLFlBQVk7U0FDWixXQUFXLEdBQVgsV0FBVztTQUNYLE1BQU0sR0FBTixNQUFNO1NBQ04sV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUTtTQUNSLFVBQVUsR0FBVixVQUFVO1NBQ1YsUUFBUSxHQUFSLFFBQVE7U0FDUixVQUFVLEdBQVYsVUFBVTtTQUVWLG1CQUFtQixHQUFuQixtQkFBbUI7U0FFbkIsUUFBUSxHQUFSLFFBQVE7U0FXUixPQUFPLEdBQVAsT0FBTztTQUVQLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsLCB7IGFic3RyYWN0IH0gZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgaW1wbGVtZW50TWFueSB9IGZyb20gJy4vdXRpbCdcblxuLypcblRva2VuIHRyZWUsIG91dHB1dCBvZiBgbGV4L2dyb3VwYC5cblRoYXQncyByaWdodDogaW4gTWFzb24sIHRoZSB0b2tlbnMgZm9ybSBhIHRyZWUgY29udGFpbmluZyBib3RoIHBsYWluIHRva2VucyBhbmQgR3JvdXAgdG9rZW5zLlxuVGhpcyBtZWFucyB0aGF0IHRoZSBwYXJzZXIgYXZvaWRzIGRvaW5nIG11Y2ggb2YgdGhlIHdvcmsgdGhhdCBwYXJzZXJzIG5vcm1hbGx5IGhhdmUgdG8gZG87XG5pdCBkb2Vzbid0IGhhdmUgdG8gaGFuZGxlIGEgXCJsZWZ0IHBhcmVudGhlc2lzXCIsIG9ubHkgYSBHcm91cCh0b2tlbnMsIEdfUGFyZW50aGVzaXMpLlxuKi9cbmNvbnN0IFRva2VuID0gYWJzdHJhY3QoJ1Rva2VuJywgT2JqZWN0KVxuZXhwb3J0IGRlZmF1bHQgVG9rZW5cblxuY29uc3QgdG9rZW5UeXBlID0gKG5hbWUsIG5hbWVzVHlwZXMpID0+XG5cdHR1cGwobmFtZSwgVG9rZW4sIG51bGwsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSlcblxuZXhwb3J0IGNvbnN0XG5cdC8vIGBuYW1lX2AuXG5cdENhbGxPbkZvY3VzID0gdG9rZW5UeXBlKCdDYWxsT25Gb2N1cycsIFsgJ25hbWUnLCBTdHJpbmcgXSksXG5cdC8vIGAubmFtZWAsIGAuLm5hbWVgLCBldGMuXG5cdC8vIEN1cnJlbnRseSBuRG90cyA+IDEgaXMgb25seSB1c2VkIGJ5IGB1c2VgIGJsb2Nrcy5cblx0RG90TmFtZSA9IHRva2VuVHlwZSgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8ga2luZCBpcyBhIEdfKioqLlxuXHRHcm91cCA9IHRva2VuVHlwZSgnR3JvdXAnLCBbICd0b2tlbnMnLCBbVG9rZW5dLCAna2luZCcsIE51bWJlciBdKSxcblx0Lypcblx0QSBrZXlcIndvcmRcIiBpcyBhbnkgc2V0IG9mIGNoYXJhY3RlcnMgd2l0aCBhIHBhcnRpY3VsYXIgbWVhbmluZy5cblx0VGhpcyBjYW4gZXZlbiBpbmNsdWRlIG9uZXMgbGlrZSBgLiBgIChkZWZpbmVzIGFuIG9iamVjdCBwcm9wZXJ0eSwgYXMgaW4gYGtleS4gdmFsdWVgKS5cblx0S2luZCBpcyBhIEtXXyoqKi4gU2VlIHRoZSBmdWxsIGxpc3QgYmVsb3cuXG5cdCovXG5cdEtleXdvcmQgPSB0b2tlblR5cGUoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0pLFxuXHQvLyBBIG5hbWUgaXMgZ3VhcmFudGVlZCB0byAqbm90KiBiZSBhIGtleXdvcmQuXG5cdC8vIEl0J3MgYWxzbyBub3QgYSBDYWxsT25Gb2N1cyBvciBEb3ROYW1lLlxuXHROYW1lID0gdG9rZW5UeXBlKCdOYW1lJywgWyAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8gVGhlc2UgYXJlIHBhcnNlZCBkaXJlY3RseSBpbnRvIE51bWJlckxpdGVyYWxzLlxuXHRUb2tlbk51bWJlckxpdGVyYWwgPSB0b2tlblR5cGUoJ1Rva2VuTnVtYmVyTGl0ZXJhbCcsIFsgJ3ZhbHVlJywgTnVtYmVyIF0pXG5cbi8vIHRvU3RyaW5nIGlzIHVzZWQgYnkgc29tZSBwYXJzaW5nIGVycm9ycy4gVXNlIFUuaW5zcGVjdCBmb3IgYSBtb3JlIGRldGFpbGVkIHZpZXcuXG5pbXBsZW1lbnRNYW55KHsgQ2FsbE9uRm9jdXMsIERvdE5hbWUsIEdyb3VwLCBLZXl3b3JkLCBOYW1lLCBUb2tlbk51bWJlckxpdGVyYWwgfSwgJ3Nob3cnLCB7XG5cdENhbGxPbkZvY3VzKCkgeyByZXR1cm4gYCR7dGhpcy5uYW1lfV9gIH0sXG5cdERvdE5hbWUoKSB7IHJldHVybiBgJHsnLicucmVwZWF0KHRoaXMubkRvdHMpfSR7dGhpcy5uYW1lfWAgfSxcblx0Ly8gVE9ETzogYmV0dGVyIHJlcHJlc2VudGF0aW9uIG9mIGtcblx0R3JvdXAoKSB7IHJldHVybiBgZ3JvdXAoaz0ke2dyb3VwS2luZFRvTmFtZS5nZXQodGhpcy5raW5kKX1gIH0sXG5cdC8vIFRPRE86IGJldHRlciByZXByZXNlbnRhdGlvbiBvZiBrXG5cdEtleXdvcmQoKSB7IHJldHVybiBjb2RlKGtleXdvcmRLaW5kVG9OYW1lLmdldCh0aGlzLmtpbmQpKSB9LFxuXHROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lIH0sXG5cdFRva2VuTnVtYmVyTGl0ZXJhbCgpIHsgcmV0dXJuIHRoaXMudmFsdWUgfVxufSlcblxubGV0IG5leHRHcm91cEtpbmQgPSAwXG5jb25zdFxuXHRncm91cEtpbmRUb05hbWUgPSBuZXcgTWFwKCksXG5cdGcgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEdyb3VwS2luZFxuXHRcdGdyb3VwS2luZFRvTmFtZS5zZXQoa2luZCwgbmFtZSlcblx0XHRuZXh0R3JvdXBLaW5kID0gbmV4dEdyb3VwS2luZCArIDFcblx0XHRyZXR1cm4ga2luZFxuXHR9XG5leHBvcnQgY29uc3Rcblx0R19QYXJlbnRoZXNpcyA9IGcoJyggKScpLFxuXHRHX0JyYWNrZXQgPSBnKCdbIF0nKSxcblx0Ly8gTGluZXMgaW4gYW4gaW5kZW50ZWQgYmxvY2suXG5cdC8vIFN1Yi10b2tlbnMgd2lsbCBhbHdheXMgYmUgR19MaW5lIGdyb3Vwcy5cblx0Ly8gTm90ZSB0aGF0IEdfQmxvY2tzIGRvIG5vdCBhbHdheXMgbWFwIHRvIEJsb2NrKiBNc0FzdHMuXG5cdEdfQmxvY2sgPSBnKCdpbmRlbnRlZCBibG9jaycpLFxuXHQvLyBXaXRoaW4gYSBxdW90ZS5cblx0Ly8gU3ViLXRva2VucyBtYXkgYmUgc3RyaW5ncywgb3IgR19QYXJlbnRoZXNpcyBncm91cHMuXG5cdEdfUXVvdGUgPSBnKCdxdW90ZScpLFxuXHQvKlxuXHRUb2tlbnMgb24gYSBsaW5lLlxuXHROT1RFOiBUaGUgaW5kZW50ZWQgYmxvY2sgZm9sbG93aW5nIHRoZSBlbmQgb2YgdGhlIGxpbmUgaXMgY29uc2lkZXJlZCB0byBiZSBhIHBhcnQgb2YgdGhlIGxpbmUhXG5cdFRoaXMgbWVhbnMgdGhhdCBpbiB0aGlzIGNvZGU6XG5cdFx0YVxuXHRcdFx0YlxuXHRcdFx0Y1xuXHRcdGRcblx0VGhlcmUgYXJlIDIgbGluZXMsIG9uZSBzdGFydGluZyB3aXRoICdhJyBhbmQgb25lIHN0YXJ0aW5nIHdpdGggJ2QnLlxuXHRUaGUgZmlyc3QgbGluZSBjb250YWlucyAnYScgYW5kIGEgR19CbG9jayB3aGljaCBpbiB0dXJuIGNvbnRhaW5zIHR3byBvdGhlciBsaW5lcy5cblx0Ki9cblx0R19MaW5lID0gZygnbGluZScpLFxuXHQvKlxuXHRHcm91cHMgdHdvIG9yIG1vcmUgdG9rZW5zIHRoYXQgYXJlICpub3QqIHNlcGFyYXRlZCBieSBzcGFjZXMuXG5cdGBhW2JdLmNgIGlzIGFuIGV4YW1wbGUuXG5cdEEgc2luZ2xlIHRva2VuIG9uIGl0cyBvd24gd2lsbCBub3QgYmUgZ2l2ZW4gYSBHX1NwYWNlLlxuXHQqL1xuXHRHX1NwYWNlID0gZygnc3BhY2VkIGdyb3VwJyksXG5cdHNob3dHcm91cEtpbmQgPSBncm91cEtpbmQgPT4gZ3JvdXBLaW5kVG9OYW1lLmdldChncm91cEtpbmQpXG5cblxubGV0IG5leHRLZXl3b3JkS2luZCA9IDBcbmNvbnN0XG5cdGtleXdvcmROYW1lVG9LaW5kID0gbmV3IE1hcCgpLFxuXHRrZXl3b3JkS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgYXJlIHNwZWNpYWwgbmFtZXMuXG5cdC8vIFdoZW4gbGV4aW5nIGEgbmFtZSwgYSBtYXAgbG9va3VwIGlzIGRvbmUgYnkga2V5d29yZEtpbmRGcm9tTmFtZS5cblx0a3cgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0ga3dOb3ROYW1lKG5hbWUpXG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuc2V0KG5hbWUsIGtpbmQpXG5cdFx0cmV0dXJuIGtpbmRcblx0fSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgbXVzdCBiZSBsZXhlZCBzcGVjaWFsbHkuXG5cdGt3Tm90TmFtZSA9IGRlYnVnTmFtZSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IG5leHRLZXl3b3JkS2luZFxuXHRcdGtleXdvcmRLaW5kVG9OYW1lLnNldChraW5kLCBkZWJ1Z05hbWUpXG5cdFx0bmV4dEtleXdvcmRLaW5kID0gbmV4dEtleXdvcmRLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH1cbmV4cG9ydCBjb25zdFxuXHRLV19Bc3NpZ24gPSBrdygnPScpLFxuXHRLV19Bc3NpZ25NdXRhYmxlID0ga3coJzo6PScpLFxuXHRLV19Bc3NpZ25NdXRhdGUgPSBrdygnOj0nKSxcblx0S1dfQnJlYWtEbyA9IGt3KCdicmVhayEnKSxcblx0S1dfQ2FzZSA9IGt3KCdjYXNlJyksXG5cdEtXX0Nhc2VEbyA9IGt3KCdjYXNlIScpLFxuXHRLV19EZWJ1ZyA9IGt3KCdkZWJ1ZycpLFxuXHRLV19EZWJ1Z2dlciA9IGt3KCdkZWJ1Z2dlcicpLFxuXHRLV19FbHNlID0ga3coJ2Vsc2UnKSxcblx0S1dfRmFsc2UgPSBrdygnZmFsc2UnKSxcblx0S1dfRm9jdXMgPSBrd05vdE5hbWUoJ18nKSxcblx0S1dfRm9yRG8gPSBrdygnZm9yIScpLFxuXHRLV19GdW4gPSBrdygnfCcpLFxuXHRLV19HZW5GdW4gPSBrdygnfnwnKSxcblx0S1dfSWZEbyA9IGt3KCdpZiEnKSxcblx0S1dfSW4gPSBrdygnaW4nKSxcblx0S1dfTGF6eSA9IGt3Tm90TmFtZSgnficpLFxuXHRLV19NYXBFbnRyeSA9IGt3KCctPicpLFxuXHRLV19OdWxsID0ga3coJ251bGwnKSxcblx0S1dfT2JqQXNzaWduID0ga3coJy4gJyksXG5cdEtXX091dCA9IGt3KCdvdXQnKSxcblx0S1dfUGFzcyA9IGt3KCdwYXNzJyksXG5cdEtXX1JlZ2lvbiA9IGt3KCdyZWdpb24nKSxcblx0S1dfVGhpcyA9IGt3KCd0aGlzJyksXG5cdEtXX1RoaXNNb2R1bGVEaXJlY3RvcnkgPSBrdygndGhpcy1tb2R1bGUtZGlyZWN0b3J5JyksXG5cdEtXX1RydWUgPSBrdygndHJ1ZScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VuZGVmaW5lZCA9IGt3KCd1bmRlZmluZWQnKSxcblx0S1dfVW5sZXNzRG8gPSBrdygndW5sZXNzIScpLFxuXHRLV19Vc2UgPSBrdygndXNlJyksXG5cdEtXX1VzZURlYnVnID0ga3coJ3VzZS1kZWJ1ZycpLFxuXHRLV19Vc2VEbyA9IGt3KCd1c2UhJyksXG5cdEtXX1VzZUxhenkgPSBrdygndXNlficpLFxuXHRLV19ZaWVsZCA9IGt3KCc8ficpLFxuXHRLV19ZaWVsZFRvID0ga3coJzx+ficpLFxuXG5cdGtleXdvcmRLaW5kRnJvbU5hbWUgPSBuYW1lID0+XG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuZ2V0KG5hbWUpLFxuXHRvcEtXdG9TViA9IGt3ID0+IHtcblx0XHRzd2l0Y2ggKGt3KSB7XG5cdFx0XHRjYXNlIEtXX0ZhbHNlOiByZXR1cm4gU1ZfRmFsc2Vcblx0XHRcdGNhc2UgS1dfTnVsbDogcmV0dXJuIFNWX051bGxcblx0XHRcdGNhc2UgS1dfVGhpczogcmV0dXJuIFNWX1RoaXNcblx0XHRcdGNhc2UgS1dfVGhpc01vZHVsZURpcmVjdG9yeTogcmV0dXJuIFNWX1RoaXNNb2R1bGVEaXJlY3Rvcnlcblx0XHRcdGNhc2UgS1dfVHJ1ZTogcmV0dXJuIFNWX1RydWVcblx0XHRcdGNhc2UgS1dfVW5kZWZpbmVkOiByZXR1cm4gU1ZfVW5kZWZpbmVkXG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gbnVsbFxuXHRcdH1cblx0fSxcblx0aXNHcm91cCA9IChncm91cEtpbmQsIHRva2VuKSA9PlxuXHRcdHRva2VuIGluc3RhbmNlb2YgR3JvdXAgJiYgdG9rZW4ua2luZCA9PT0gZ3JvdXBLaW5kLFxuXHRpc0tleXdvcmQgPSAoa2V5d29yZEtpbmQsIHRva2VuKSA9PlxuXHRcdHRva2VuIGluc3RhbmNlb2YgS2V5d29yZCAmJiB0b2tlbi5raW5kID09PSBrZXl3b3JkS2luZFxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=