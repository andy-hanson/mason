if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', '../Expression', './util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	const Token = (0, _tuplDistTupl.abstract)('Token', Object, 'TODO:doc', {
		toString: function () {
			return (0, _CompileError.code)(this.show());
		}
	});
	exports.default = Token;

	const tt = function (name, namesTypes, props) {
		return (0, _tupl)(name, Token, 'doc', ['loc', _Loc].concat(namesTypes), {}, props);
	};

	// Don't use `0` because we want to use negative nmbers to represent GroupPre closers.
	const G_Paren = 1,
	      G_Bracket = 2,
	      G_Block = 3,
	      G_Quote = 4,
	      G_Line = 5,
	      G_Space = 6;

	exports.G_Paren = G_Paren;
	exports.G_Bracket = G_Bracket;
	exports.G_Block = G_Block;
	exports.G_Quote = G_Quote;
	exports.G_Line = G_Line;
	exports.G_Space = G_Space;
	let nextId = 0;
	const nameToK = new Map();
	const kToName = new Map();
	const kw = function (name) {
		const k = kwNotName(name);
		nameToK.set(name, k);
		return k;
	};
	const kwNotName = function (debugName) {
		const k = nextId;
		kToName.set(k, debugName);
		nextId = nextId + 1;
		return k;
	};

	const KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_AssignMutate = kw(':='),
	      KW_Case = kw('case'),
	      KW_CaseDo = kw('case!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger'),
	      KW_Else = kw('else'),
	      KW_EndLoop = kw('end-loop!'),
	      KW_False = kw('false'),
	      KW_Focus = kwNotName('_'),
	      KW_Fun = kw('|'),
	      KW_GenFun = kw('~|'),
	      KW_In = kw('in'),
	      KW_Lazy = kwNotName('~'),
	      KW_Loop = kw('loop!'),
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
	      KW_Use = kw('use'),
	      KW_UseDebug = kw('use-debug'),
	      KW_UseDo = kw('use!'),
	      KW_UseLazy = kw('use~'),
	      KW_Yield = kw('<~'),
	      KW_YieldTo = kw('<~~');

	exports.KW_Assign = KW_Assign;
	exports.KW_AssignMutable = KW_AssignMutable;
	exports.KW_AssignMutate = KW_AssignMutate;
	exports.KW_Case = KW_Case;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Else = KW_Else;
	exports.KW_EndLoop = KW_EndLoop;
	exports.KW_False = KW_False;
	exports.KW_Focus = KW_Focus;
	exports.KW_Fun = KW_Fun;
	exports.KW_GenFun = KW_GenFun;
	exports.KW_In = KW_In;
	exports.KW_Lazy = KW_Lazy;
	exports.KW_Loop = KW_Loop;
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
	exports.KW_Use = KW_Use;
	exports.KW_UseDebug = KW_UseDebug;
	exports.KW_UseDo = KW_UseDo;
	exports.KW_UseLazy = KW_UseLazy;
	exports.KW_Yield = KW_Yield;
	exports.KW_YieldTo = KW_YieldTo;
	const keywordKFromName = function (name) {
		return nameToK.get(name);
	},
	      opKWtoSV = function (kw) {
		switch (kw) {
			case KW_False:
				return _Expression.SV_False;
			case KW_Null:
				return _Expression.SV_Null;
			case KW_This:
				return _Expression.SV_This;
			case KW_ThisModuleDirectory:
				return _Expression.SV_ThisModuleDirectory;
			case KW_True:
				return _Expression.SV_True;
			case KW_Undefined:
				return _Expression.SV_Undefined;
			default:
				return null;
		}
	};

	exports.keywordKFromName = keywordKFromName;
	exports.opKWtoSV = opKWtoSV;
	const CallOnFocus = tt('CallOnFocus', ['name', String]),
	      DotName = tt('DotName', ['nDots', Number, 'name', String]),
	      Group = tt('Group', ['tokens', [Token], 'kind', Number]),
	      Keyword = tt('Keyword', ['kind', Number]),
	      Name = tt('Name', ['name', String]),
	      TokenNumberLiteral = tt('TokenNumberLiteral', ['value', Number]);

	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	exports.TokenNumberLiteral = TokenNumberLiteral;
	const isGroup = function (groupKind, token) {
		return token instanceof Group && token.kind === groupKind;
	},
	      isKeyword = function (keywordKind, token) {
		return token instanceof Keyword && token.kind === keywordKind;
	};

	exports.isGroup = isGroup;
	exports.isKeyword = isKeyword;
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
			return 'group(k=' + this.kind + ')';
		},
		// TODO: better representation of k
		Keyword: function () {
			return 'keyword(k=' + kToName.get(this.kind) + ')';
		},
		Name: function () {
			return this.name;
		},
		TokenNumberLiteral: function () {
			return this.value;
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFPQSxPQUFNLEtBQUssR0FBRyxrQkFOQyxRQUFRLEVBTUEsT0FBTyxFQUFFLE1BQU0sRUFDckMsVUFBVSxFQUNWO0FBQ0MsVUFBUSxFQUFBLFlBQUc7QUFBRSxVQUFPLGtCQVJiLElBQUksRUFRYyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtHQUFFO0VBQ3ZDLENBQUMsQ0FBQTttQkFDWSxLQUFLOztBQUVwQixPQUFNLEVBQUUsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSztTQUNsQyxXQUFLLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUUsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUcsRUFBRSxLQUFLLENBQUM7RUFBQSxDQUFBOzs7QUFHakUsT0FDTixPQUFPLEdBQUcsQ0FBQztPQUNYLFNBQVMsR0FBRyxDQUFDO09BQ2IsT0FBTyxHQUFHLENBQUM7T0FDWCxPQUFPLEdBQUcsQ0FBQztPQUNYLE1BQU0sR0FBRyxDQUFDO09BQ1YsT0FBTyxHQUFHLENBQUMsQ0FBQTs7U0FMWCxPQUFPLEdBQVAsT0FBTztTQUNQLFNBQVMsR0FBVCxTQUFTO1NBQ1QsT0FBTyxHQUFQLE9BQU87U0FDUCxPQUFPLEdBQVAsT0FBTztTQUNQLE1BQU0sR0FBTixNQUFNO1NBQ04sT0FBTyxHQUFQLE9BQU87QUFFUixLQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDZCxPQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLE9BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDekIsT0FBTSxFQUFFLEdBQUcsVUFBQSxJQUFJLEVBQUk7QUFDbEIsUUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3pCLFNBQU8sQ0FBQyxH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QUU7QUFDekYsYUFBVyxFQUFBLFlBQUc7QUFBRSxlQUFVLElBQUksQ0FBQyxJQUFJLE9BQUc7R0FBRTtBQUN4QyxTQUFPLEVBQUEsWUFBRztBQUFFLGVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQUcsSUFBSSxDQUFDLElBQUksQ0FBRTtHQUFFOztBQUU1RCxPQUFLLEVBQUEsWUFBRztBQUFFLHVCQUFrQixJQUFJLENBQUMsSUFBSSxPQUFHO0dBQUU7O0FBRTFDLFNBQU8sRUFBQSxZQUFHO0FBQUUseUJBQW9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFHO0dBQUU7QUFDM0QsTUFBSSxFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7R0FBRTtBQUMzQixvQkFBa0IsRUFBQSxZQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0dBQUU7RUFDMUMsQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsLCB7IGFic3RyYWN0IH0gZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgU1ZfRmFsc2UsIFNWX051bGwsIFNWX1RoaXMsIFNWX1RoaXNNb2R1bGVEaXJlY3RvcnksIFNWX1RydWUsIFNWX1VuZGVmaW5lZFxuXHR9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBpbXBsZW1lbnRNYW55IH0gZnJvbSAnLi91dGlsJ1xuXG5jb25zdCBUb2tlbiA9IGFic3RyYWN0KCdUb2tlbicsIE9iamVjdCxcblx0J1RPRE86ZG9jJyxcblx0e1xuXHRcdHRvU3RyaW5nKCkgeyByZXR1cm4gY29kZSh0aGlzLnNob3coKSkgfVxuXHR9KVxuZXhwb3J0IGRlZmF1bHQgVG9rZW5cblxuY29uc3QgdHQgPSAobmFtZSwgbmFtZXNUeXBlcywgcHJvcHMpID0+XG5cdHR1cGwobmFtZSwgVG9rZW4sICdkb2MnLCBbICdsb2MnLCBMb2MgXS5jb25jYXQobmFtZXNUeXBlcyksIHsgfSwgcHJvcHMpXG5cbi8vIERvbid0IHVzZSBgMGAgYmVjYXVzZSB3ZSB3YW50IHRvIHVzZSBuZWdhdGl2ZSBubWJlcnMgdG8gcmVwcmVzZW50IEdyb3VwUHJlIGNsb3NlcnMuXG5leHBvcnQgY29uc3Rcblx0R19QYXJlbiA9IDEsXG5cdEdfQnJhY2tldCA9IDIsXG5cdEdfQmxvY2sgPSAzLFxuXHRHX1F1b3RlID0gNCxcblx0R19MaW5lID0gNSxcblx0R19TcGFjZSA9IDZcblxubGV0IG5leHRJZCA9IDBcbmNvbnN0IG5hbWVUb0sgPSBuZXcgTWFwKClcbmNvbnN0IGtUb05hbWUgPSBuZXcgTWFwKClcbmNvbnN0IGt3ID0gbmFtZSA9PiB7XG5cdGNvbnN0IGsgPSBrd05vdE5hbWUobmFtZSlcblx0bmFtZVRvSy5zZXQobmFtZSwgaylcblx0cmV0dXJuIGtcbn1cbmNvbnN0IGt3Tm90TmFtZSA9IGRlYnVnTmFtZSA9PiB7XG5cdGNvbnN0IGsgPSBuZXh0SWRcblx0a1RvTmFtZS5zZXQoaywgZGVidWdOYW1lKVxuXHRuZXh0SWQgPSBuZXh0SWQgKyAxXG5cdHJldHVybiBrXG59XG5cbmV4cG9ydCBjb25zdFxuXHRLV19Bc3NpZ24gPSBrdygnPScpLFxuXHRLV19Bc3NpZ25NdXRhYmxlID0ga3coJzo6PScpLFxuXHRLV19Bc3NpZ25NdXRhdGUgPSBrdygnOj0nKSxcblx0S1dfQ2FzZSA9IGt3KCdjYXNlJyksXG5cdEtXX0Nhc2VEbyA9IGt3KCdjYXNlIScpLFxuXHRLV19EZWJ1ZyA9IGt3KCdkZWJ1ZycpLFxuXHRLV19EZWJ1Z2dlciA9IGt3KCdkZWJ1Z2dlcicpLFxuXHRLV19FbHNlID0ga3coJ2Vsc2UnKSxcblx0S1dfRW5kTG9vcCA9IGt3KCdlbmQtbG9vcCEnKSxcblx0S1dfRmFsc2UgPSBrdygnZmFsc2UnKSxcblx0S1dfRm9jdXMgPSBrd05vdE5hbWUoJ18nKSxcblx0S1dfRnVuID0ga3coJ3wnKSxcblx0S1dfR2VuRnVuID0ga3coJ358JyksXG5cdEtXX0luID0ga3coJ2luJyksXG5cdEtXX0xhenkgPSBrd05vdE5hbWUoJ34nKSxcblx0S1dfTG9vcCA9IGt3KCdsb29wIScpLFxuXHRLV19NYXBFbnRyeSA9IGt3KCctPicpLFxuXHRLV19OdWxsID0ga3coJ251bGwnKSxcblx0S1dfT2JqQXNzaWduID0ga3coJy4gJyksXG5cdEtXX091dCA9IGt3KCdvdXQnKSxcblx0S1dfUGFzcyA9IGt3KCdwYXNzJyksXG5cdEtXX1JlZ2lvbiA9IGt3KCdyZWdpb24nKSxcblx0S1dfVGhpcyA9IGt3KCd0aGlzJyksXG5cdEtXX1RoaXNNb2R1bGVEaXJlY3RvcnkgPSBrdygndGhpcy1tb2R1bGUtZGlyZWN0b3J5JyksXG5cdEtXX1RydWUgPSBrdygndHJ1ZScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VuZGVmaW5lZCA9IGt3KCd1bmRlZmluZWQnKSxcblx0S1dfVXNlID0ga3coJ3VzZScpLFxuXHRLV19Vc2VEZWJ1ZyA9IGt3KCd1c2UtZGVidWcnKSxcblx0S1dfVXNlRG8gPSBrdygndXNlIScpLFxuXHRLV19Vc2VMYXp5ID0ga3coJ3VzZX4nKSxcblx0S1dfWWllbGQgPSBrdygnPH4nKSxcblx0S1dfWWllbGRUbyA9IGt3KCc8fn4nKVxuXG5leHBvcnQgY29uc3Rcblx0a2V5d29yZEtGcm9tTmFtZSA9IG5hbWUgPT4gbmFtZVRvSy5nZXQobmFtZSksXG5cdG9wS1d0b1NWID0ga3cgPT4ge1xuXHRcdHN3aXRjaCAoa3cpIHtcblx0XHRcdGNhc2UgS1dfRmFsc2U6IHJldHVybiBTVl9GYWxzZVxuXHRcdFx0Y2FzZSBLV19OdWxsOiByZXR1cm4gU1ZfTnVsbFxuXHRcdFx0Y2FzZSBLV19UaGlzOiByZXR1cm4gU1ZfVGhpc1xuXHRcdFx0Y2FzZSBLV19UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gU1ZfVGhpc01vZHVsZURpcmVjdG9yeVxuXHRcdFx0Y2FzZSBLV19UcnVlOiByZXR1cm4gU1ZfVHJ1ZVxuXHRcdFx0Y2FzZSBLV19VbmRlZmluZWQ6IHJldHVybiBTVl9VbmRlZmluZWRcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG5cbmV4cG9ydCBjb25zdFxuXHRDYWxsT25Gb2N1cyA9IHR0KCdDYWxsT25Gb2N1cycsIFsgJ25hbWUnLCBTdHJpbmcgXSksXG5cdERvdE5hbWUgPSB0dCgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0R3JvdXAgPSB0dCgnR3JvdXAnLFxuXHRcdFsgJ3Rva2VucycsIFtUb2tlbl0sICdraW5kJywgTnVtYmVyIF0pLFxuXHRLZXl3b3JkID0gdHQoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0pLFxuXHROYW1lID0gdHQoJ05hbWUnLCBbICduYW1lJywgU3RyaW5nIF0pLFxuXHRUb2tlbk51bWJlckxpdGVyYWwgPSB0dCgnVG9rZW5OdW1iZXJMaXRlcmFsJywgWyAndmFsdWUnLCBOdW1iZXIgXSlcblxuZXhwb3J0IGNvbnN0XG5cdGlzR3JvdXAgPSAoZ3JvdXBLaW5kLCB0b2tlbikgPT5cblx0XHR0b2tlbiBpbnN0YW5jZW9mIEdyb3VwICYmIHRva2VuLmtpbmQgPT09IGdyb3VwS2luZCxcblx0aXNLZXl3b3JkID0gKGtleXdvcmRLaW5kLCB0b2tlbikgPT5cblx0XHR0b2tlbiBpbnN0YW5jZW9mIEtleXdvcmQgJiYgdG9rZW4ua2luZCA9PT0ga2V5d29yZEtpbmRcblxuLy8gdG9TdHJpbmcgaXMgdXNlZCBieSBzb21lIHBhcnNpbmcgZXJyb3JzLiBVc2UgVS5pbnNwZWN0IGZvciBhIG1vcmUgZGV0YWlsZWQgdmlldy5cbmltcGxlbWVudE1hbnkoeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEtleXdvcmQsIE5hbWUsIFRva2VuTnVtYmVyTGl0ZXJhbCB9LCAnc2hvdycsIHtcblx0Q2FsbE9uRm9jdXMoKSB7IHJldHVybiBgJHt0aGlzLm5hbWV9X2AgfSxcblx0RG90TmFtZSgpIHsgcmV0dXJuIGAkeycuJy5yZXBlYXQodGhpcy5uRG90cyl9JHt0aGlzLm5hbWV9YCB9LFxuXHQvLyBUT0RPOiBiZXR0ZXIgcmVwcmVzZW50YXRpb24gb2Yga1xuXHRHcm91cCgpIHsgcmV0dXJuIGBncm91cChrPSR7dGhpcy5raW5kfSlgIH0sXG5cdC8vIFRPRE86IGJldHRlciByZXByZXNlbnRhdGlvbiBvZiBrXG5cdEtleXdvcmQoKSB7IHJldHVybiBga2V5d29yZChrPSR7a1RvTmFtZS5nZXQodGhpcy5raW5kKX0pYCB9LFxuXHROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lIH0sXG5cdFRva2VuTnVtYmVyTGl0ZXJhbCgpIHsgcmV0dXJuIHRoaXMudmFsdWUgfVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9