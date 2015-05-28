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
			return '' + groupKindToName.get(this.kind);
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
	}

	// Reserved words
	;['as', 'gen', 'gen!', 'of', 'of!', 'return', 'to', 'with'].forEach(function (name) {
		return keywordNameToKind.set(name, -1);
	});

	const KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_LocalMutate = kw(':='),
	      KW_BreakDo = kw('break!'),
	      KW_BreakVal = kw('break'),
	      KW_Built = kw('built'),
	      KW_CaseDo = kw('case!'),
	      KW_CaseVal = kw('case'),
	      KW_Continue = kw('continue!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger!'),
	     
	// Three dots followed by a space, as in `... things-added-to-@`.
	KW_Ellipsis = kw('... '),
	      KW_Else = kw('else'),
	      KW_False = kw('false'),
	      KW_Focus = kwNotName('_'),
	      KW_ForBag = kw('@for'),
	      KW_ForDo = kw('for!'),
	      KW_ForVal = kw('for'),
	      KW_Fun = kw('|'),
	      KW_FunDo = kw('!|'),
	      KW_GenFun = kw('~|'),
	      KW_GenFunDo = kw('~!|'),
	      KW_IfVal = kw('if'),
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
	      KW_UnlessVal = kw('unless'),
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
	exports.KW_BreakDo = KW_BreakDo;
	exports.KW_BreakVal = KW_BreakVal;
	exports.KW_Built = KW_Built;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_CaseVal = KW_CaseVal;
	exports.KW_Continue = KW_Continue;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Ellipsis = KW_Ellipsis;
	exports.KW_Else = KW_Else;
	exports.KW_False = KW_False;
	exports.KW_Focus = KW_Focus;
	exports.KW_ForBag = KW_ForBag;
	exports.KW_ForDo = KW_ForDo;
	exports.KW_ForVal = KW_ForVal;
	exports.KW_Fun = KW_Fun;
	exports.KW_FunDo = KW_FunDo;
	exports.KW_GenFun = KW_GenFun;
	exports.KW_GenFunDo = KW_GenFunDo;
	exports.KW_IfVal = KW_IfVal;
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
	exports.KW_UnlessVal = KW_UnlessVal;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxPQUFNLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVO1NBQ2xDLG1CQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7QUFFckQ7OztBQUdOLFFBQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7OztBQUVuRSxNQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFFLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7Ozs7OztBQU1yRSxRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7OztBQUdsRCxLQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFBO1NBWDVDLE9BQU8sR0FBUCxPQUFPO1NBRVAsS0FBSyxHQUFMLEtBQUs7U0FNTCxPQUFPLEdBQVAsT0FBTztTQUdQLElBQUksR0FBSixJQUFJOzs7O0FBSUwsV0E3QlMsYUFBYSxFQTZCUixFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsYUFBYSxTQWhDbkQsYUFBYSxBQWdDc0MsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN2RSxTQUFPLEVBQUEsWUFBRztBQUFFLGVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQUcsSUFBSSxDQUFDLElBQUks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QVksR0FBWixZQUFZO1NBQ1osTUFBTSxHQUFOLE1BQU07U0FDTixPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsT0FBTyxHQUFQLE9BQU87U0FDUCxzQkFBc0IsR0FBdEIsc0JBQXNCO1NBQ3RCLE9BQU8sR0FBUCxPQUFPO1NBQ1AsT0FBTyxHQUFQLE9BQU87U0FDUCxZQUFZLEdBQVosWUFBWTtTQUNaLFlBQVksR0FBWixZQUFZO1NBQ1osV0FBVyxHQUFYLFdBQVc7U0FDWCxNQUFNLEdBQU4sTUFBTTtTQUNOLFdBQVcsR0FBWCxXQUFXO1NBQ1gsUUFBUSxHQUFSLFFBQVE7U0FDUixVQUFVLEdBQVYsVUFBVTtTQUNWLFFBQVEsR0FBUixRQUFRO1NBQ1IsVUFBVSxHQUFWLFVBQVU7U0FHVixxQkFBcUIsR0FBckIscUJBQXFCO1NBRXJCLCtCQUErQixHQUEvQiwrQkFBK0I7U0FXL0IsT0FBTyxHQUFQLE9BQU87U0FFUCxTQUFTLEdBQVQsU0FBUyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9Ub2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBOdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBTVl9GYWxzZSwgU1ZfTnVsbCwgU1ZfVGhpcywgU1ZfVGhpc01vZHVsZURpcmVjdG9yeSwgU1ZfVHJ1ZSwgU1ZfVW5kZWZpbmVkXG5cdH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBpbXBsZW1lbnRNYW55IH0gZnJvbSAnLi91dGlsJ1xuXG4vKlxuVG9rZW4gdHJlZSwgb3V0cHV0IG9mIGBsZXgvZ3JvdXBgLlxuVGhhdCdzIHJpZ2h0OiBpbiBNYXNvbiwgdGhlIHRva2VucyBmb3JtIGEgdHJlZSBjb250YWluaW5nIGJvdGggcGxhaW4gdG9rZW5zIGFuZCBHcm91cCB0b2tlbnMuXG5UaGlzIG1lYW5zIHRoYXQgdGhlIHBhcnNlciBhdm9pZHMgZG9pbmcgbXVjaCBvZiB0aGUgd29yayB0aGF0IHBhcnNlcnMgbm9ybWFsbHkgaGF2ZSB0byBkbztcbml0IGRvZXNuJ3QgaGF2ZSB0byBoYW5kbGUgYSBcImxlZnQgcGFyZW50aGVzaXNcIiwgb25seSBhIEdyb3VwKHRva2VucywgR19QYXJlbnRoZXNpcykuXG4qL1xuY29uc3QgdG9rZW5UeXBlID0gKG5hbWUsIG5hbWVzVHlwZXMpID0+XG5cdHR1cGwobmFtZSwgT2JqZWN0LCBudWxsLCBbICdsb2MnLCBMb2MgXS5jb25jYXQobmFtZXNUeXBlcykpXG5cbmV4cG9ydCBjb25zdFxuXHQvLyBgLm5hbWVgLCBgLi5uYW1lYCwgZXRjLlxuXHQvLyBDdXJyZW50bHkgbkRvdHMgPiAxIGlzIG9ubHkgdXNlZCBieSBgdXNlYCBibG9ja3MuXG5cdERvdE5hbWUgPSB0b2tlblR5cGUoJ0RvdE5hbWUnLCBbICduRG90cycsIE51bWJlciwgJ25hbWUnLCBTdHJpbmcgXSksXG5cdC8vIGtpbmQgaXMgYSBHXyoqKi5cblx0R3JvdXAgPSB0b2tlblR5cGUoJ0dyb3VwJywgWyAnc3ViVG9rZW5zJywgW09iamVjdF0sICdraW5kJywgTnVtYmVyIF0pLFxuXHQvKlxuXHRBIGtleVwid29yZFwiIGlzIGFueSBzZXQgb2YgY2hhcmFjdGVycyB3aXRoIGEgcGFydGljdWxhciBtZWFuaW5nLlxuXHRUaGlzIGNhbiBldmVuIGluY2x1ZGUgb25lcyBsaWtlIGAuIGAgKGRlZmluZXMgYW4gb2JqZWN0IHByb3BlcnR5LCBhcyBpbiBga2V5LiB2YWx1ZWApLlxuXHRLaW5kIGlzIGEgS1dfKioqLiBTZWUgdGhlIGZ1bGwgbGlzdCBiZWxvdy5cblx0Ki9cblx0S2V5d29yZCA9IHRva2VuVHlwZSgnS2V5d29yZCcsIFsgJ2tpbmQnLCBOdW1iZXIgXSksXG5cdC8vIEEgbmFtZSBpcyBndWFyYW50ZWVkIHRvICpub3QqIGJlIGEga2V5d29yZC5cblx0Ly8gSXQncyBhbHNvIG5vdCBhIERvdE5hbWUuXG5cdE5hbWUgPSB0b2tlblR5cGUoJ05hbWUnLCBbICduYW1lJywgU3RyaW5nIF0pXG5cdC8vIE51bWJlckxpdGVyYWwgaXMgYWxzbyBib3RoIGEgdG9rZW4gYW5kIGFuIE1zQXN0LlxuXG4vLyB0b1N0cmluZyBpcyB1c2VkIGJ5IHNvbWUgcGFyc2luZyBlcnJvcnMuIFVzZSBVLmluc3BlY3QgZm9yIGEgbW9yZSBkZXRhaWxlZCB2aWV3LlxuaW1wbGVtZW50TWFueSh7IERvdE5hbWUsIEdyb3VwLCBLZXl3b3JkLCBOYW1lLCBOdW1iZXJMaXRlcmFsIH0sICdzaG93Jywge1xuXHREb3ROYW1lKCkgeyByZXR1cm4gYCR7Jy4nLnJlcGVhdCh0aGlzLm5Eb3RzKX0ke3RoaXMubmFtZX1gIH0sXG5cdEdyb3VwKCkgeyByZXR1cm4gYCR7Z3JvdXBLaW5kVG9OYW1lLmdldCh0aGlzLmtpbmQpfWAgfSxcblx0S2V5d29yZCgpIHsgcmV0dXJuIGNvZGUoa2V5d29yZEtpbmRUb05hbWUuZ2V0KHRoaXMua2luZCkpIH0sXG5cdE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWUgfSxcblx0TnVtYmVyTGl0ZXJhbCgpIHsgcmV0dXJuIHRoaXMudmFsdWUgfVxufSlcblxubGV0IG5leHRHcm91cEtpbmQgPSAwXG5jb25zdFxuXHRncm91cEtpbmRUb05hbWUgPSBuZXcgTWFwKCksXG5cdGcgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEdyb3VwS2luZFxuXHRcdGdyb3VwS2luZFRvTmFtZS5zZXQoa2luZCwgbmFtZSlcblx0XHRuZXh0R3JvdXBLaW5kID0gbmV4dEdyb3VwS2luZCArIDFcblx0XHRyZXR1cm4ga2luZFxuXHR9XG5leHBvcnQgY29uc3Rcblx0R19QYXJlbnRoZXNpcyA9IGcoJyggKScpLFxuXHRHX0JyYWNrZXQgPSBnKCdbIF0nKSxcblx0Ly8gTGluZXMgaW4gYW4gaW5kZW50ZWQgYmxvY2suXG5cdC8vIFN1Yi10b2tlbnMgd2lsbCBhbHdheXMgYmUgR19MaW5lIGdyb3Vwcy5cblx0Ly8gTm90ZSB0aGF0IEdfQmxvY2tzIGRvIG5vdCBhbHdheXMgbWFwIHRvIEJsb2NrKiBNc0FzdHMuXG5cdEdfQmxvY2sgPSBnKCdpbmRlbnRlZCBibG9jaycpLFxuXHQvLyBXaXRoaW4gYSBxdW90ZS5cblx0Ly8gU3ViLXRva2VucyBtYXkgYmUgc3RyaW5ncywgb3IgR19QYXJlbnRoZXNpcyBncm91cHMuXG5cdEdfUXVvdGUgPSBnKCdxdW90ZScpLFxuXHQvKlxuXHRUb2tlbnMgb24gYSBsaW5lLlxuXHROT1RFOiBUaGUgaW5kZW50ZWQgYmxvY2sgZm9sbG93aW5nIHRoZSBlbmQgb2YgdGhlIGxpbmUgaXMgY29uc2lkZXJlZCB0byBiZSBhIHBhcnQgb2YgdGhlIGxpbmUhXG5cdFRoaXMgbWVhbnMgdGhhdCBpbiB0aGlzIGNvZGU6XG5cdFx0YVxuXHRcdFx0YlxuXHRcdFx0Y1xuXHRcdGRcblx0VGhlcmUgYXJlIDIgbGluZXMsIG9uZSBzdGFydGluZyB3aXRoICdhJyBhbmQgb25lIHN0YXJ0aW5nIHdpdGggJ2QnLlxuXHRUaGUgZmlyc3QgbGluZSBjb250YWlucyAnYScgYW5kIGEgR19CbG9jayB3aGljaCBpbiB0dXJuIGNvbnRhaW5zIHR3byBvdGhlciBsaW5lcy5cblx0Ki9cblx0R19MaW5lID0gZygnbGluZScpLFxuXHQvKlxuXHRHcm91cHMgdHdvIG9yIG1vcmUgdG9rZW5zIHRoYXQgYXJlICpub3QqIHNlcGFyYXRlZCBieSBzcGFjZXMuXG5cdGBhW2JdLmNgIGlzIGFuIGV4YW1wbGUuXG5cdEEgc2luZ2xlIHRva2VuIG9uIGl0cyBvd24gd2lsbCBub3QgYmUgZ2l2ZW4gYSBHX1NwYWNlLlxuXHQqL1xuXHRHX1NwYWNlID0gZygnc3BhY2VkIGdyb3VwJyksXG5cdHNob3dHcm91cEtpbmQgPSBncm91cEtpbmQgPT4gZ3JvdXBLaW5kVG9OYW1lLmdldChncm91cEtpbmQpXG5cblxubGV0IG5leHRLZXl3b3JkS2luZCA9IDBcbmNvbnN0XG5cdGtleXdvcmROYW1lVG9LaW5kID0gbmV3IE1hcCgpLFxuXHRrZXl3b3JkS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgYXJlIHNwZWNpYWwgbmFtZXMuXG5cdC8vIFdoZW4gbGV4aW5nIGEgbmFtZSwgYSBtYXAgbG9va3VwIGlzIGRvbmUgYnkga2V5d29yZEtpbmRGcm9tTmFtZS5cblx0a3cgPSBuYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0ga3dOb3ROYW1lKG5hbWUpXG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuc2V0KG5hbWUsIGtpbmQpXG5cdFx0cmV0dXJuIGtpbmRcblx0fSxcblx0Ly8gVGhlc2Uga2V5d29yZHMgbXVzdCBiZSBsZXhlZCBzcGVjaWFsbHkuXG5cdGt3Tm90TmFtZSA9IGRlYnVnTmFtZSA9PiB7XG5cdFx0Y29uc3Qga2luZCA9IG5leHRLZXl3b3JkS2luZFxuXHRcdGtleXdvcmRLaW5kVG9OYW1lLnNldChraW5kLCBkZWJ1Z05hbWUpXG5cdFx0bmV4dEtleXdvcmRLaW5kID0gbmV4dEtleXdvcmRLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH1cblxuLy8gUmVzZXJ2ZWQgd29yZHNcbjsgWyAnYXMnLCAnZ2VuJywgJ2dlbiEnLCAnb2YnLCAnb2YhJywgJ3JldHVybicsICd0bycsICd3aXRoJyBdLmZvckVhY2gobmFtZSA9PlxuXHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwgLTEpKVxuXG5leHBvcnQgY29uc3Rcblx0S1dfQXNzaWduID0ga3coJz0nKSxcblx0S1dfQXNzaWduTXV0YWJsZSA9IGt3KCc6Oj0nKSxcblx0S1dfTG9jYWxNdXRhdGUgPSBrdygnOj0nKSxcblx0S1dfQnJlYWtEbyA9IGt3KCdicmVhayEnKSxcblx0S1dfQnJlYWtWYWwgPSBrdygnYnJlYWsnKSxcblx0S1dfQnVpbHQgPSBrdygnYnVpbHQnKSxcblx0S1dfQ2FzZURvID0ga3coJ2Nhc2UhJyksXG5cdEtXX0Nhc2VWYWwgPSBrdygnY2FzZScpLFxuXHRLV19Db250aW51ZSA9IGt3KCdjb250aW51ZSEnKSxcblx0S1dfRGVidWcgPSBrdygnZGVidWcnKSxcblx0S1dfRGVidWdnZXIgPSBrdygnZGVidWdnZXIhJyksXG5cdC8vIFRocmVlIGRvdHMgZm9sbG93ZWQgYnkgYSBzcGFjZSwgYXMgaW4gYC4uLiB0aGluZ3MtYWRkZWQtdG8tQGAuXG5cdEtXX0VsbGlwc2lzID0ga3coJy4uLiAnKSxcblx0S1dfRWxzZSA9IGt3KCdlbHNlJyksXG5cdEtXX0ZhbHNlID0ga3coJ2ZhbHNlJyksXG5cdEtXX0ZvY3VzID0ga3dOb3ROYW1lKCdfJyksXG5cdEtXX0ZvckJhZyA9IGt3KCdAZm9yJyksXG5cdEtXX0ZvckRvID0ga3coJ2ZvciEnKSxcblx0S1dfRm9yVmFsID0ga3coJ2ZvcicpLFxuXHRLV19GdW4gPSBrdygnfCcpLFxuXHRLV19GdW5EbyA9IGt3KCchfCcpLFxuXHRLV19HZW5GdW4gPSBrdygnfnwnKSxcblx0S1dfR2VuRnVuRG8gPSBrdygnfiF8JyksXG5cdEtXX0lmVmFsID0ga3coJ2lmJyksXG5cdEtXX0lmRG8gPSBrdygnaWYhJyksXG5cdEtXX0luID0ga3coJ2luJyksXG5cdEtXX0xhenkgPSBrd05vdE5hbWUoJ34nKSxcblx0S1dfTWFwRW50cnkgPSBrdygnLT4nKSxcblx0S1dfTnVsbCA9IGt3KCdudWxsJyksXG5cdEtXX09iakFzc2lnbiA9IGt3KCcuICcpLFxuXHRLV19PdXQgPSBrdygnb3V0JyksXG5cdEtXX1Bhc3MgPSBrdygncGFzcycpLFxuXHRLV19SZWdpb24gPSBrdygncmVnaW9uJyksXG5cdEtXX1RoaXMgPSBrdygndGhpcycpLFxuXHRLV19UaGlzTW9kdWxlRGlyZWN0b3J5ID0ga3coJ3RoaXMtbW9kdWxlLWRpcmVjdG9yeScpLFxuXHRLV19UcnVlID0ga3coJ3RydWUnKSxcblx0S1dfVHlwZSA9IGt3Tm90TmFtZSgnOicpLFxuXHRLV19VbmRlZmluZWQgPSBrdygndW5kZWZpbmVkJyksXG5cdEtXX1VubGVzc1ZhbCA9IGt3KCd1bmxlc3MnKSxcblx0S1dfVW5sZXNzRG8gPSBrdygndW5sZXNzIScpLFxuXHRLV19Vc2UgPSBrdygndXNlJyksXG5cdEtXX1VzZURlYnVnID0ga3coJ3VzZS1kZWJ1ZycpLFxuXHRLV19Vc2VEbyA9IGt3KCd1c2UhJyksXG5cdEtXX1VzZUxhenkgPSBrdygndXNlficpLFxuXHRLV19ZaWVsZCA9IGt3KCc8ficpLFxuXHRLV19ZaWVsZFRvID0ga3coJzx+ficpLFxuXG5cdC8vIFJldHVybnMgLTEgZm9yIHJlc2VydmVkIGtleXdvcmQgb3IgdW5kZWZpbmVkIGZvciBub3QtYS1rZXl3b3JkLlxuXHRvcEtleXdvcmRLaW5kRnJvbU5hbWUgPSBuYW1lID0+XG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuZ2V0KG5hbWUpLFxuXHRvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kID0ga3cgPT4ge1xuXHRcdHN3aXRjaCAoa3cpIHtcblx0XHRcdGNhc2UgS1dfRmFsc2U6IHJldHVybiBTVl9GYWxzZVxuXHRcdFx0Y2FzZSBLV19OdWxsOiByZXR1cm4gU1ZfTnVsbFxuXHRcdFx0Y2FzZSBLV19UaGlzOiByZXR1cm4gU1ZfVGhpc1xuXHRcdFx0Y2FzZSBLV19UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gU1ZfVGhpc01vZHVsZURpcmVjdG9yeVxuXHRcdFx0Y2FzZSBLV19UcnVlOiByZXR1cm4gU1ZfVHJ1ZVxuXHRcdFx0Y2FzZSBLV19VbmRlZmluZWQ6IHJldHVybiBTVl9VbmRlZmluZWRcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9LFxuXHRpc0dyb3VwID0gKGdyb3VwS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBHcm91cCAmJiB0b2tlbi5raW5kID09PSBncm91cEtpbmQsXG5cdGlzS2V5d29yZCA9IChrZXl3b3JkS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkICYmIHRva2VuLmtpbmQgPT09IGtleXdvcmRLaW5kXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==