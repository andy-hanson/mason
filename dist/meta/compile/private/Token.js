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
	// NumberLiteral is also both a token and an MsAst.

	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
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

	const reserved_words = [
	// Current reserved words
	'await', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public',

	// JavaScript keywords
	'arguments', 'const', 'delete', 'eval', 'instanceof', 'let', 'return', 'typeof', 'var', 'void', 'while', 'with',

	// Keywords Mason might use
	'abstract', 'as', 'data', 'final', 'gen', 'gen!', 'goto!', 'is', 'isa', 'of', 'of!', 'to', 'until', 'until!', 'while!'];

	for (const name of reserved_words) keywordNameToKind.set(name, -1);

	const KW_And = kw('and'),
	      KW_Assert = kw('assert!'),
	      KW_AssertNot = kw('forbid!'),
	      KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_LocalMutate = kw(':='),
	      KW_Break = kw('break!'),
	      KW_BreakWithVal = kw('break'),
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
	      KW_Do = kw('do!'),
	     
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
	      KW_SwitchDo = kw('switch!'),
	      KW_SwitchVal = kw('switch'),
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
	exports.KW_Break = KW_Break;
	exports.KW_BreakWithVal = KW_BreakWithVal;
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
	exports.KW_Do = KW_Do;
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
	exports.KW_SwitchDo = KW_SwitchDo;
	exports.KW_SwitchVal = KW_SwitchVal;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxPQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLEtBQ2xDLG1CQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7O0FBRXJEOzs7QUFHTixRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDOzs7QUFFbkUsTUFBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7Ozs7QUFNckUsUUFBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7QUFHbEQsS0FBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUMsQ0FBQTs7Ozs7Ozs7QUFJN0MsV0E3QlMsYUFBYSxFQTZCUixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxhQUFhLFNBaENuRCxhQUFhLEFBZ0NzQyxFQUFFLEVBQUUsTUFBTSxFQUFFO0FBQ3ZFLFNBQU8sR0FBRztBQUFFLFVBQU8sQ0FBQyxHQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLEdBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUE7R0FBRTtBQUM1RCxPQUFLLEdBQUc7QUFBRSxVQUFPLENBQUMsR0FBRSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUE7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TUFBTSxDQUFDO09BQ3JCLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ3JCLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO09BQ3ZCLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO09BQzFCLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO09BQzNCLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO09BQzlCLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO09BQzVCLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO09BQy9CLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO09BQ2hDLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO09BQ25DLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ2hCLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO09BQ3hCLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ3RCLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2xCLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2xCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3BCLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ3ZCLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ2hCLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2xCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3BCLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ25CLFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3RCLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQ3hCLFdBQVcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO09BQzNCLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO09BQzNCLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztPQUNwRCxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUN2QixPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNwQixRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNyQixTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNyQixPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztPQUN4QixZQUFZLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztPQUM5QixZQUFZLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztPQUMzQixXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztPQUMzQixNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNsQixXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztPQUM3QixRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUNyQixVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztPQUN2QixRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNuQixVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztPQUV0QixXQUFXLEdBQUcsSUFBSSxJQUNqQixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOzs7QUFFNUIsc0JBQXFCLEdBQUcsSUFBSSxJQUMzQixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO09BQzVCLCtCQUErQixHQUFHLEVBQUUsSUFBSTtBQUN2QyxVQUFRLEVBQUU7QUFDVCxRQUFLLFFBQVE7QUFBRSxrQkFqT1QsUUFBUSxDQWlPZ0I7QUFBQSxBQUM5QixRQUFLLE9BQU87QUFBRSxrQkFsT0UsT0FBTyxDQWtPSztBQUFBLEFBQzVCLFFBQUssUUFBUTtBQUFFLGtCQW5PVSxRQUFRLENBbU9IO0FBQUEsQUFDOUIsUUFBSyxzQkFBc0I7QUFBRSxrQkFwT00sc0JBQXNCLENBb09DO0FBQUEsQUFDMUQsUUFBSyxPQUFPO0FBQUUsa0JBck82QyxPQUFPLENBcU90QztBQUFBLEFBQzVCLFFBQUssWUFBWTtBQUFFLGtCQXRPaUQsWUFBWSxDQXNPMUM7QUFBQSxBQUN0QztBQUFTLFdBQU8sSUFBSSxDQUFBO0FBQUEsR0FDcEI7RUFDRDtPQUNELE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEtBQzFCLEtBQUssWUFBWSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTO09BQ25ELFNBQVMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQzlCLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwgZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1N1cGVyLCBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTVl9UcnVlLCBTVl9VbmRlZmluZWRcblx0fSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGltcGxlbWVudE1hbnkgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG5Ub2tlbiB0cmVlLCBvdXRwdXQgb2YgYGxleC9ncm91cGAuXG5UaGF0J3MgcmlnaHQ6IGluIE1hc29uLCB0aGUgdG9rZW5zIGZvcm0gYSB0cmVlIGNvbnRhaW5pbmcgYm90aCBwbGFpbiB0b2tlbnMgYW5kIEdyb3VwIHRva2Vucy5cblRoaXMgbWVhbnMgdGhhdCB0aGUgcGFyc2VyIGF2b2lkcyBkb2luZyBtdWNoIG9mIHRoZSB3b3JrIHRoYXQgcGFyc2VycyBub3JtYWxseSBoYXZlIHRvIGRvO1xuaXQgZG9lc24ndCBoYXZlIHRvIGhhbmRsZSBhIFwibGVmdCBwYXJlbnRoZXNpc1wiLCBvbmx5IGEgR3JvdXAodG9rZW5zLCBHX1BhcmVudGhlc2lzKS5cbiovXG5jb25zdCB0b2tlblR5cGUgPSAobmFtZSwgbmFtZXNUeXBlcykgPT5cblx0dHVwbChuYW1lLCBPYmplY3QsIG51bGwsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSlcblxuZXhwb3J0IGNvbnN0XG5cdC8vIGAubmFtZWAsIGAuLm5hbWVgLCBldGMuXG5cdC8vIEN1cnJlbnRseSBuRG90cyA+IDEgaXMgb25seSB1c2VkIGJ5IGB1c2VgIGJsb2Nrcy5cblx0RG90TmFtZSA9IHRva2VuVHlwZSgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8ga2luZCBpcyBhIEdfKioqLlxuXHRHcm91cCA9IHRva2VuVHlwZSgnR3JvdXAnLCBbICdzdWJUb2tlbnMnLCBbT2JqZWN0XSwgJ2tpbmQnLCBOdW1iZXIgXSksXG5cdC8qXG5cdEEga2V5XCJ3b3JkXCIgaXMgYW55IHNldCBvZiBjaGFyYWN0ZXJzIHdpdGggYSBwYXJ0aWN1bGFyIG1lYW5pbmcuXG5cdFRoaXMgY2FuIGV2ZW4gaW5jbHVkZSBvbmVzIGxpa2UgYC4gYCAoZGVmaW5lcyBhbiBvYmplY3QgcHJvcGVydHksIGFzIGluIGBrZXkuIHZhbHVlYCkuXG5cdEtpbmQgaXMgYSBLV18qKiouIFNlZSB0aGUgZnVsbCBsaXN0IGJlbG93LlxuXHQqL1xuXHRLZXl3b3JkID0gdG9rZW5UeXBlKCdLZXl3b3JkJywgWyAna2luZCcsIE51bWJlciBdKSxcblx0Ly8gQSBuYW1lIGlzIGd1YXJhbnRlZWQgdG8gKm5vdCogYmUgYSBrZXl3b3JkLlxuXHQvLyBJdCdzIGFsc28gbm90IGEgRG90TmFtZS5cblx0TmFtZSA9IHRva2VuVHlwZSgnTmFtZScsIFsgJ25hbWUnLCBTdHJpbmcgXSlcblx0Ly8gTnVtYmVyTGl0ZXJhbCBpcyBhbHNvIGJvdGggYSB0b2tlbiBhbmQgYW4gTXNBc3QuXG5cbi8vIHRvU3RyaW5nIGlzIHVzZWQgYnkgc29tZSBwYXJzaW5nIGVycm9ycy4gVXNlIFUuaW5zcGVjdCBmb3IgYSBtb3JlIGRldGFpbGVkIHZpZXcuXG5pbXBsZW1lbnRNYW55KHsgRG90TmFtZSwgR3JvdXAsIEtleXdvcmQsIE5hbWUsIE51bWJlckxpdGVyYWwgfSwgJ3Nob3cnLCB7XG5cdERvdE5hbWUoKSB7IHJldHVybiBgJHsnLicucmVwZWF0KHRoaXMubkRvdHMpfSR7dGhpcy5uYW1lfWAgfSxcblx0R3JvdXAoKSB7IHJldHVybiBgJHtncm91cEtpbmRUb05hbWUuZ2V0KHRoaXMua2luZCl9YCB9LFxuXHRLZXl3b3JkKCkgeyByZXR1cm4gY29kZShrZXl3b3JkS2luZFRvTmFtZS5nZXQodGhpcy5raW5kKSkgfSxcblx0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZSB9LFxuXHROdW1iZXJMaXRlcmFsKCkgeyByZXR1cm4gdGhpcy52YWx1ZSB9XG59KVxuXG5sZXQgbmV4dEdyb3VwS2luZCA9IDBcbmNvbnN0XG5cdGdyb3VwS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0ZyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBuZXh0R3JvdXBLaW5kXG5cdFx0Z3JvdXBLaW5kVG9OYW1lLnNldChraW5kLCBuYW1lKVxuXHRcdG5leHRHcm91cEtpbmQgPSBuZXh0R3JvdXBLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH1cbmV4cG9ydCBjb25zdFxuXHRHX1BhcmVudGhlc2lzID0gZygnKCApJyksXG5cdEdfQnJhY2tldCA9IGcoJ1sgXScpLFxuXHQvLyBMaW5lcyBpbiBhbiBpbmRlbnRlZCBibG9jay5cblx0Ly8gU3ViLXRva2VucyB3aWxsIGFsd2F5cyBiZSBHX0xpbmUgZ3JvdXBzLlxuXHQvLyBOb3RlIHRoYXQgR19CbG9ja3MgZG8gbm90IGFsd2F5cyBtYXAgdG8gQmxvY2sqIE1zQXN0cy5cblx0R19CbG9jayA9IGcoJ2luZGVudGVkIGJsb2NrJyksXG5cdC8vIFdpdGhpbiBhIHF1b3RlLlxuXHQvLyBTdWItdG9rZW5zIG1heSBiZSBzdHJpbmdzLCBvciBHX1BhcmVudGhlc2lzIGdyb3Vwcy5cblx0R19RdW90ZSA9IGcoJ3F1b3RlJyksXG5cdC8qXG5cdFRva2VucyBvbiBhIGxpbmUuXG5cdE5PVEU6IFRoZSBpbmRlbnRlZCBibG9jayBmb2xsb3dpbmcgdGhlIGVuZCBvZiB0aGUgbGluZSBpcyBjb25zaWRlcmVkIHRvIGJlIGEgcGFydCBvZiB0aGUgbGluZSFcblx0VGhpcyBtZWFucyB0aGF0IGluIHRoaXMgY29kZTpcblx0XHRhXG5cdFx0XHRiXG5cdFx0XHRjXG5cdFx0ZFxuXHRUaGVyZSBhcmUgMiBsaW5lcywgb25lIHN0YXJ0aW5nIHdpdGggJ2EnIGFuZCBvbmUgc3RhcnRpbmcgd2l0aCAnZCcuXG5cdFRoZSBmaXJzdCBsaW5lIGNvbnRhaW5zICdhJyBhbmQgYSBHX0Jsb2NrIHdoaWNoIGluIHR1cm4gY29udGFpbnMgdHdvIG90aGVyIGxpbmVzLlxuXHQqL1xuXHRHX0xpbmUgPSBnKCdsaW5lJyksXG5cdC8qXG5cdEdyb3VwcyB0d28gb3IgbW9yZSB0b2tlbnMgdGhhdCBhcmUgKm5vdCogc2VwYXJhdGVkIGJ5IHNwYWNlcy5cblx0YGFbYl0uY2AgaXMgYW4gZXhhbXBsZS5cblx0QSBzaW5nbGUgdG9rZW4gb24gaXRzIG93biB3aWxsIG5vdCBiZSBnaXZlbiBhIEdfU3BhY2UuXG5cdCovXG5cdEdfU3BhY2UgPSBnKCdzcGFjZWQgZ3JvdXAnKSxcblx0c2hvd0dyb3VwS2luZCA9IGdyb3VwS2luZCA9PiBncm91cEtpbmRUb05hbWUuZ2V0KGdyb3VwS2luZClcblxuXG5sZXQgbmV4dEtleXdvcmRLaW5kID0gMFxuY29uc3Rcblx0a2V5d29yZE5hbWVUb0tpbmQgPSBuZXcgTWFwKCksXG5cdGtleXdvcmRLaW5kVG9OYW1lID0gbmV3IE1hcCgpLFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBhcmUgc3BlY2lhbCBuYW1lcy5cblx0Ly8gV2hlbiBsZXhpbmcgYSBuYW1lLCBhIG1hcCBsb29rdXAgaXMgZG9uZSBieSBrZXl3b3JkS2luZEZyb21OYW1lLlxuXHRrdyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBrd05vdE5hbWUobmFtZSlcblx0XHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwga2luZClcblx0XHRyZXR1cm4ga2luZFxuXHR9LFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBtdXN0IGJlIGxleGVkIHNwZWNpYWxseS5cblx0a3dOb3ROYW1lID0gZGVidWdOYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEtleXdvcmRLaW5kXG5cdFx0a2V5d29yZEtpbmRUb05hbWUuc2V0KGtpbmQsIGRlYnVnTmFtZSlcblx0XHRuZXh0S2V5d29yZEtpbmQgPSBuZXh0S2V5d29yZEtpbmQgKyAxXG5cdFx0cmV0dXJuIGtpbmRcblx0fVxuXG5jb25zdCByZXNlcnZlZF93b3JkcyA9IFtcblx0Ly8gQ3VycmVudCByZXNlcnZlZCB3b3Jkc1xuXHQnYXdhaXQnLFxuXHQnZW51bScsXG5cdCdpbXBsZW1lbnRzJyxcblx0J2ludGVyZmFjZScsXG5cdCdwYWNrYWdlJyxcblx0J3ByaXZhdGUnLFxuXHQncHJvdGVjdGVkJyxcblx0J3B1YmxpYycsXG5cblx0Ly8gSmF2YVNjcmlwdCBrZXl3b3Jkc1xuXHQnYXJndW1lbnRzJyxcblx0J2NvbnN0Jyxcblx0J2RlbGV0ZScsXG5cdCdldmFsJyxcblx0J2luc3RhbmNlb2YnLFxuXHQnbGV0Jyxcblx0J3JldHVybicsXG5cdCd0eXBlb2YnLFxuXHQndmFyJyxcblx0J3ZvaWQnLFxuXHQnd2hpbGUnLFxuXHQnd2l0aCcsXG5cblx0Ly8gS2V5d29yZHMgTWFzb24gbWlnaHQgdXNlXG5cdCdhYnN0cmFjdCcsXG5cdCdhcycsXG5cdCdkYXRhJyxcblx0J2ZpbmFsJyxcblx0J2dlbicsXG5cdCdnZW4hJyxcblx0J2dvdG8hJyxcblx0J2lzJyxcblx0J2lzYScsXG5cdCdvZicsXG5cdCdvZiEnLFxuXHQndG8nLFxuXHQndW50aWwnLFxuXHQndW50aWwhJyxcblx0J3doaWxlISdcbl1cblxuZm9yIChjb25zdCBuYW1lIG9mIHJlc2VydmVkX3dvcmRzKVxuXHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwgLTEpXG5cbmV4cG9ydCBjb25zdFxuXHRLV19BbmQgPSBrdygnYW5kJyksXG5cdEtXX0Fzc2VydCA9IGt3KCdhc3NlcnQhJyksXG5cdEtXX0Fzc2VydE5vdCA9IGt3KCdmb3JiaWQhJyksXG5cdEtXX0Fzc2lnbiA9IGt3KCc9JyksXG5cdEtXX0Fzc2lnbk11dGFibGUgPSBrdygnOjo9JyksXG5cdEtXX0xvY2FsTXV0YXRlID0ga3coJzo9JyksXG5cdEtXX0JyZWFrID0ga3coJ2JyZWFrIScpLFxuXHRLV19CcmVha1dpdGhWYWwgPSBrdygnYnJlYWsnKSxcblx0S1dfQnVpbHQgPSBrdygnYnVpbHQnKSxcblx0S1dfQ2FzZURvID0ga3coJ2Nhc2UhJyksXG5cdEtXX0Nhc2VWYWwgPSBrdygnY2FzZScpLFxuXHRLV19DYXRjaERvID0ga3coJ2NhdGNoIScpLFxuXHRLV19DYXRjaFZhbCA9IGt3KCdjYXRjaCcpLFxuXHRLV19DbGFzcyA9IGt3KCdjbGFzcycpLFxuXHRLV19Db25zdHJ1Y3QgPSBrdygnY29uc3RydWN0IScpLFxuXHRLV19Db250aW51ZSA9IGt3KCdjb250aW51ZSEnKSxcblx0S1dfRGVidWcgPSBrdygnZGVidWcnKSxcblx0S1dfRGVidWdnZXIgPSBrdygnZGVidWdnZXIhJyksXG5cdEtXX0RvID0ga3coJ2RvIScpLFxuXHQvLyBUaHJlZSBkb3RzIGZvbGxvd2VkIGJ5IGEgc3BhY2UsIGFzIGluIGAuLi4gdGhpbmdzLWFkZGVkLXRvLUBgLlxuXHRLV19FbGxpcHNpcyA9IGt3KCcuLi4gJyksXG5cdEtXX0Vsc2UgPSBrdygnZWxzZScpLFxuXHRLV19FeGNlcHREbyA9IGt3KCdleGNlcHQhJyksXG5cdEtXX0V4Y2VwdFZhbCA9IGt3KCdleGNlcHQnKSxcblx0S1dfRmFsc2UgPSBrdygnZmFsc2UnKSxcblx0S1dfRmluYWxseSA9IGt3KCdmaW5hbGx5IScpLFxuXHRLV19Gb2N1cyA9IGt3Tm90TmFtZSgnXycpLFxuXHRLV19Gb3JCYWcgPSBrdygnQGZvcicpLFxuXHRLV19Gb3JEbyA9IGt3KCdmb3IhJyksXG5cdEtXX0ZvclZhbCA9IGt3KCdmb3InKSxcblx0S1dfRnVuID0ga3dOb3ROYW1lKCd8JyksXG5cdEtXX0Z1bkRvID0ga3dOb3ROYW1lKCchfCcpLFxuXHRLV19GdW5HZW4gPSBrd05vdE5hbWUoJ358JyksXG5cdEtXX0Z1bkdlbkRvID0ga3dOb3ROYW1lKCd+IXwnKSxcblx0S1dfRnVuVGhpcyA9IGt3Tm90TmFtZSgnLnwnKSxcblx0S1dfRnVuVGhpc0RvID0ga3dOb3ROYW1lKCcuIXwnKSxcblx0S1dfRnVuVGhpc0dlbiA9IGt3Tm90TmFtZSgnLn58JyksXG5cdEtXX0Z1blRoaXNHZW5EbyA9IGt3Tm90TmFtZSgnLn4hfCcpLFxuXHRLV19HZXQgPSBrdygnZ2V0JyksXG5cdEtXX0lmVmFsID0ga3coJ2lmJyksXG5cdEtXX0lmRG8gPSBrdygnaWYhJyksXG5cdEtXX0luID0ga3coJ2luJyksXG5cdEtXX0xhenkgPSBrd05vdE5hbWUoJ34nKSxcblx0S1dfTWFwRW50cnkgPSBrdygnLT4nKSxcblx0S1dfTmV3ID0ga3coJ25ldycpLFxuXHRLV19Ob3QgPSBrdygnbm90JyksXG5cdEtXX051bGwgPSBrdygnbnVsbCcpLFxuXHRLV19PYmpBc3NpZ24gPSBrdygnLiAnKSxcblx0S1dfT3IgPSBrdygnb3InKSxcblx0S1dfT3V0ID0ga3coJ291dCcpLFxuXHRLV19QYXNzID0ga3coJ3Bhc3MnKSxcblx0S1dfUmVnaW9uID0ga3coJ3JlZ2lvbicpLFxuXHRLV19TZXQgPSBrdygnc2V0IScpLFxuXHRLV19TdXBlciA9IGt3KCdzdXBlcicpLFxuXHRLV19TdGF0aWMgPSBrdygnc3RhdGljJyksXG5cdEtXX1N3aXRjaERvID0ga3coJ3N3aXRjaCEnKSxcblx0S1dfU3dpdGNoVmFsID0ga3coJ3N3aXRjaCcpLFxuXHRLV19UaGlzTW9kdWxlRGlyZWN0b3J5ID0ga3coJ3RoaXMtbW9kdWxlLWRpcmVjdG9yeScpLFxuXHRLV19UaHJvdyA9IGt3KCd0aHJvdyEnKSxcblx0S1dfVHJ1ZSA9IGt3KCd0cnVlJyksXG5cdEtXX1RyeURvID0ga3coJ3RyeSEnKSxcblx0S1dfVHJ5VmFsID0ga3coJ3RyeScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VuZGVmaW5lZCA9IGt3KCd1bmRlZmluZWQnKSxcblx0S1dfVW5sZXNzVmFsID0ga3coJ3VubGVzcycpLFxuXHRLV19Vbmxlc3NEbyA9IGt3KCd1bmxlc3MhJyksXG5cdEtXX1VzZSA9IGt3KCd1c2UnKSxcblx0S1dfVXNlRGVidWcgPSBrdygndXNlLWRlYnVnJyksXG5cdEtXX1VzZURvID0ga3coJ3VzZSEnKSxcblx0S1dfVXNlTGF6eSA9IGt3KCd1c2V+JyksXG5cdEtXX1lpZWxkID0ga3coJzx+JyksXG5cdEtXX1lpZWxkVG8gPSBrdygnPH5+JyksXG5cblx0a2V5d29yZE5hbWUgPSBraW5kID0+XG5cdFx0a2V5d29yZEtpbmRUb05hbWUuZ2V0KGtpbmQpLFxuXHQvLyBSZXR1cm5zIC0xIGZvciByZXNlcnZlZCBrZXl3b3JkIG9yIHVuZGVmaW5lZCBmb3Igbm90LWEta2V5d29yZC5cblx0b3BLZXl3b3JkS2luZEZyb21OYW1lID0gbmFtZSA9PlxuXHRcdGtleXdvcmROYW1lVG9LaW5kLmdldChuYW1lKSxcblx0b3BLZXl3b3JkS2luZFRvU3BlY2lhbFZhbHVlS2luZCA9IGt3ID0+IHtcblx0XHRzd2l0Y2ggKGt3KSB7XG5cdFx0XHRjYXNlIEtXX0ZhbHNlOiByZXR1cm4gU1ZfRmFsc2Vcblx0XHRcdGNhc2UgS1dfTnVsbDogcmV0dXJuIFNWX051bGxcblx0XHRcdGNhc2UgS1dfU3VwZXI6IHJldHVybiBTVl9TdXBlclxuXHRcdFx0Y2FzZSBLV19UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gU1ZfVGhpc01vZHVsZURpcmVjdG9yeVxuXHRcdFx0Y2FzZSBLV19UcnVlOiByZXR1cm4gU1ZfVHJ1ZVxuXHRcdFx0Y2FzZSBLV19VbmRlZmluZWQ6IHJldHVybiBTVl9VbmRlZmluZWRcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9LFxuXHRpc0dyb3VwID0gKGdyb3VwS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBHcm91cCAmJiB0b2tlbi5raW5kID09PSBncm91cEtpbmQsXG5cdGlzS2V5d29yZCA9IChrZXl3b3JkS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkICYmIHRva2VuLmtpbmQgPT09IGtleXdvcmRLaW5kXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==