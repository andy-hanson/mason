if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', '../Expression', './U/util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _Expression, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	const Token = _tuplDistTupl.abstract('Token', Object, 'TODO:doc', {
		toString: function () {
			return _CompileError.code(this.show());
		}
	});
	exports.default = Token;

	const tt = function (name, namesTypes, props) {
		return _tupl(name, Token, 'doc', ['loc', _Loc].concat(namesTypes), {}, props);
	};

	const gIs = function (k) {
		return function (t) {
			return t instanceof Group && t.kind === k;
		};
	};
	const kwIs = function (k) {
		return function (t) {
			return t instanceof Keyword && t.kind === k;
		};
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
	      KW_ObjAssign = kw('. '),
	      KW_Out = kw('out'),
	      KW_Region = kw('region'),
	      KW_This = kw('this'),
	      KW_ThisModuleDirectory = kw('this-module-directory'),
	      KW_True = kw('true'),
	      KW_Type = kwNotName(':'),
	      KW_Use = kw('use'),
	      KW_UseDebug = kw('use-debug'),
	      KW_UseDo = kw('use!'),
	      KW_UseLazy = kw('use~'),
	      KW_Yield = kw('<~'),
	      KW_YieldTo = kw('<~~');

	exports.KW_Assign = KW_Assign;
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
	exports.KW_ObjAssign = KW_ObjAssign;
	exports.KW_Out = KW_Out;
	exports.KW_Region = KW_Region;
	exports.KW_This = KW_This;
	exports.KW_ThisModuleDirectory = KW_ThisModuleDirectory;
	exports.KW_True = KW_True;
	exports.KW_Type = KW_Type;
	exports.KW_Use = KW_Use;
	exports.KW_UseDebug = KW_UseDebug;
	exports.KW_UseDo = KW_UseDo;
	exports.KW_UseLazy = KW_UseLazy;
	exports.KW_Yield = KW_Yield;
	exports.KW_YieldTo = KW_YieldTo;
	const keywordKFromName = function (name) {
		return nameToK.get(name);
	},
	      opKWtoSP = function (kw) {
		switch (kw) {
			case KW_This:
				return _Expression.SP_This;
			case KW_ThisModuleDirectory:
				return _Expression.SP_ThisModuleDirectory;
			case KW_False:
				return _Expression.SP_False;
			case KW_True:
				return _Expression.SP_True;
			default:
				return null;
		}
	};

	exports.keywordKFromName = keywordKFromName;
	exports.opKWtoSP = opKWtoSP;
	const CallOnFocus = tt('CallOnFocus', ['name', String]),
	      DotName = tt('DotName', ['nDots', Number, 'name', String]),
	      Group = tt('Group', ['tokens', [Token], 'kind', Number], {
		isBlock: gIs(G_Block),
		isSpaced: gIs(G_Space)
	}),
	      Keyword = tt('Keyword', ['kind', Number], {
		is: kwIs,
		isType: kwIs(KW_Type),
		isFocus: kwIs(KW_Focus),
		isElse: kwIs(KW_Else),
		isLazy: kwIs(KW_Lazy),
		isLineSplit: function (t) {
			return t instanceof Keyword && (t.kind === KW_Assign || t.kind === KW_ObjAssign || t.kind === KW_Yield || t.kind === KW_YieldTo || t.kind === KW_MapEntry);
		},
		isObjAssign: kwIs(KW_ObjAssign)
	}),
	      Name = tt('Name', ['name', String]),
	      TokenNumberLiteral = tt('TokenNumberLiteral', ['value', Number]);

	exports.CallOnFocus = CallOnFocus;
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	exports.TokenNumberLiteral = TokenNumberLiteral;
	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	_UUtil.implementMany({ CallOnFocus: CallOnFocus, DotName: DotName, Group: Group, Keyword: Keyword, Name: Name, TokenNumberLiteral: TokenNumberLiteral }, 'show', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFNQSxPQUFNLEtBQUssR0FBRyxjQUxDLFFBQVEsQ0FLQSxPQUFPLEVBQUUsTUFBTSxFQUNyQyxVQUFVLEVBQ1Y7QUFDQyxVQUFRLEVBQUEsWUFBRztBQUFFLFVBQU8sY0FQYixJQUFJLENBT2MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7R0FBRTtFQUN2QyxDQUFDLENBQUE7bUJBQ1ksS0FBSzs7QUFFcEIsT0FBTSxFQUFFLEdBQUcsVUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUs7U0FDbEMsTUFBSyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFHLEVBQUUsS0FBSyxDQUFDO0VBQUEsQ0FBQTs7QUFFeEUsT0FBTSxHQUFHLEdBQUcsVUFBQSxDQUFDO1NBQUksVUFBQSxDQUFDO1VBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7R0FBQTtFQUFBLENBQUE7QUFDeEQsT0FBTSxJQUFJLEdBQUcsVUFBQSxDQUFDO1NBQUksVUFBQSxDQUFDO1VBQUksQ0FBQyxZQUFZLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7R0FBQTtFQUFBLENBQUE7OztBQUdwRCxPQUNOLE9BQU8sR0FBRyxDQUFDO09BQ1gsU0FBUyxHQUFHLENBQUM7T0FDYixPQUFPLEdBQUcsQ0FBQztPQUNYLE9BQU8sR0FBRyxDQUFDO09BQ1gsTUFBTSxHQUFHLENBQUM7T0FDVixPQUFPLEdBQUcsQ0FBQyxDQUFBOztTQUxYLE9BQU8sR0FBUCxPQUFPO1NBQ1AsU0FBUyxHQUFULFNBQVM7U0FDVCxPQUFPLEdBQVAsT0FBTztTQUNQLE9BQU8sR0FBUCxPQUFPO1NBQ1AsTUFBTSxHQUFOLE1BQU07U0FDTixPQUFP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RSxPQUFPLEVBQVAsT0FBTyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLGtCQUFrQixFQUFsQixrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN6RixhQUFXLEVBQUEsWUFBRztBQUFFLGVBQVUsSUFBSSxDQUFDLElBQUksT0FBRztHQUFFO0FBQ3hDLFNBQU8sRUFBQSxZQUFHO0FBQUUsZUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBRyxJQUFJLENBQUMsSUFBSSxDQUFFO0dBQUU7O0FBRTVELE9BQUssRUFBQSxZQUFHO0FBQUUsdUJBQWtCLElBQUksQ0FBQyxJQUFJLE9BQUc7R0FBRTs7QUFFMUMsU0FBTyxFQUFBLFlBQUc7QUFBRSx5QkFBb0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQUc7R0FBRTtBQUMzRCxNQUFJLEVBQUEsWUFBRztBQUFFLFVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtHQUFFO0FBQzNCLG9CQUFrQixFQUFBLFlBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7R0FBRTtFQUMxQyxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvVG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwsIHsgYWJzdHJhY3QgfSBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBTUF9GYWxzZSwgU1BfVGhpcywgU1BfVGhpc01vZHVsZURpcmVjdG9yeSwgU1BfVHJ1ZSB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBpbXBsZW1lbnRNYW55IH0gZnJvbSAnLi9VL3V0aWwnXG5cbmNvbnN0IFRva2VuID0gYWJzdHJhY3QoJ1Rva2VuJywgT2JqZWN0LFxuXHQnVE9ETzpkb2MnLFxuXHR7XG5cdFx0dG9TdHJpbmcoKSB7IHJldHVybiBjb2RlKHRoaXMuc2hvdygpKSB9XG5cdH0pXG5leHBvcnQgZGVmYXVsdCBUb2tlblxuXG5jb25zdCB0dCA9IChuYW1lLCBuYW1lc1R5cGVzLCBwcm9wcykgPT5cblx0dHVwbChuYW1lLCBUb2tlbiwgJ2RvYycsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSwgeyB9LCBwcm9wcylcblxuY29uc3QgZ0lzID0gayA9PiB0ID0+IHQgaW5zdGFuY2VvZiBHcm91cCAmJiB0LmtpbmQgPT09IGtcbmNvbnN0IGt3SXMgPSBrID0+IHQgPT4gdCBpbnN0YW5jZW9mIEtleXdvcmQgJiYgdC5raW5kID09PSBrXG5cbi8vIERvbid0IHVzZSBgMGAgYmVjYXVzZSB3ZSB3YW50IHRvIHVzZSBuZWdhdGl2ZSBubWJlcnMgdG8gcmVwcmVzZW50IEdyb3VwUHJlIGNsb3NlcnMuXG5leHBvcnQgY29uc3Rcblx0R19QYXJlbiA9IDEsXG5cdEdfQnJhY2tldCA9IDIsXG5cdEdfQmxvY2sgPSAzLFxuXHRHX1F1b3RlID0gNCxcblx0R19MaW5lID0gNSxcblx0R19TcGFjZSA9IDZcblxubGV0IG5leHRJZCA9IDBcbmNvbnN0IG5hbWVUb0sgPSBuZXcgTWFwKClcbmNvbnN0IGtUb05hbWUgPSBuZXcgTWFwKClcbmNvbnN0IGt3ID0gbmFtZSA9PiB7XG5cdGNvbnN0IGsgPSBrd05vdE5hbWUobmFtZSlcblx0bmFtZVRvSy5zZXQobmFtZSwgaylcblx0cmV0dXJuIGtcbn1cbmNvbnN0IGt3Tm90TmFtZSA9IGRlYnVnTmFtZSA9PiB7XG5cdGNvbnN0IGsgPSBuZXh0SWRcblx0a1RvTmFtZS5zZXQoaywgZGVidWdOYW1lKVxuXHRuZXh0SWQgPSBuZXh0SWQgKyAxXG5cdHJldHVybiBrXG59XG5cbmV4cG9ydCBjb25zdFxuXHRLV19Bc3NpZ24gPSBrdygnPScpLFxuXHRLV19DYXNlID0ga3coJ2Nhc2UnKSxcblx0S1dfQ2FzZURvID0ga3coJ2Nhc2UhJyksXG5cdEtXX0RlYnVnID0ga3coJ2RlYnVnJyksXG5cdEtXX0RlYnVnZ2VyID0ga3coJ2RlYnVnZ2VyJyksXG5cdEtXX0Vsc2UgPSBrdygnZWxzZScpLFxuXHRLV19FbmRMb29wID0ga3coJ2VuZC1sb29wIScpLFxuXHRLV19GYWxzZSA9IGt3KCdmYWxzZScpLFxuXHRLV19Gb2N1cyA9IGt3Tm90TmFtZSgnXycpLFxuXHRLV19GdW4gPSBrdygnfCcpLFxuXHRLV19HZW5GdW4gPSBrdygnfnwnKSxcblx0S1dfSW4gPSBrdygnaW4nKSxcblx0S1dfTGF6eSA9IGt3Tm90TmFtZSgnficpLFxuXHRLV19Mb29wID0ga3coJ2xvb3AhJyksXG5cdEtXX01hcEVudHJ5ID0ga3coJy0+JyksXG5cdEtXX09iakFzc2lnbiA9IGt3KCcuICcpLFxuXHRLV19PdXQgPSBrdygnb3V0JyksXG5cdEtXX1JlZ2lvbiA9IGt3KCdyZWdpb24nKSxcblx0S1dfVGhpcyA9IGt3KCd0aGlzJyksXG5cdEtXX1RoaXNNb2R1bGVEaXJlY3RvcnkgPSBrdygndGhpcy1tb2R1bGUtZGlyZWN0b3J5JyksXG5cdEtXX1RydWUgPSBrdygndHJ1ZScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VzZSA9IGt3KCd1c2UnKSxcblx0S1dfVXNlRGVidWcgPSBrdygndXNlLWRlYnVnJyksXG5cdEtXX1VzZURvID0ga3coJ3VzZSEnKSxcblx0S1dfVXNlTGF6eSA9IGt3KCd1c2V+JyksXG5cdEtXX1lpZWxkID0ga3coJzx+JyksXG5cdEtXX1lpZWxkVG8gPSBrdygnPH5+JylcblxuZXhwb3J0IGNvbnN0XG5cdGtleXdvcmRLRnJvbU5hbWUgPSBuYW1lID0+IG5hbWVUb0suZ2V0KG5hbWUpLFxuXHRvcEtXdG9TUCA9IGt3ID0+IHtcblx0XHRzd2l0Y2ggKGt3KSB7XG5cdFx0XHRjYXNlIEtXX1RoaXM6IHJldHVybiBTUF9UaGlzXG5cdFx0XHRjYXNlIEtXX1RoaXNNb2R1bGVEaXJlY3Rvcnk6IHJldHVybiBTUF9UaGlzTW9kdWxlRGlyZWN0b3J5XG5cdFx0XHRjYXNlIEtXX0ZhbHNlOiByZXR1cm4gU1BfRmFsc2Vcblx0XHRcdGNhc2UgS1dfVHJ1ZTogcmV0dXJuIFNQX1RydWVcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG5cbmV4cG9ydCBjb25zdFxuXHRDYWxsT25Gb2N1cyA9IHR0KCdDYWxsT25Gb2N1cycsIFsgJ25hbWUnLCBTdHJpbmcgXSksXG5cdERvdE5hbWUgPSB0dCgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0R3JvdXAgPSB0dCgnR3JvdXAnLFxuXHRcdFsgJ3Rva2VucycsIFtUb2tlbl0sICdraW5kJywgTnVtYmVyIF0sXG5cdFx0e1xuXHRcdFx0aXNCbG9jazogZ0lzKEdfQmxvY2spLFxuXHRcdFx0aXNTcGFjZWQ6IGdJcyhHX1NwYWNlKVxuXHRcdH0pLFxuXHRLZXl3b3JkID0gdHQoJ0tleXdvcmQnLCBbICdraW5kJywgTnVtYmVyIF0sXG5cdFx0e1xuXHRcdFx0aXM6IGt3SXMsXG5cdFx0XHRpc1R5cGU6IGt3SXMoS1dfVHlwZSksXG5cdFx0XHRpc0ZvY3VzOiBrd0lzKEtXX0ZvY3VzKSxcblx0XHRcdGlzRWxzZToga3dJcyhLV19FbHNlKSxcblx0XHRcdGlzTGF6eToga3dJcyhLV19MYXp5KSxcblx0XHRcdGlzTGluZVNwbGl0OiB0ID0+XG5cdFx0XHRcdHQgaW5zdGFuY2VvZiBLZXl3b3JkICYmIChcblx0XHRcdFx0XHR0LmtpbmQgPT09IEtXX0Fzc2lnbiB8fFxuXHRcdFx0XHRcdHQua2luZCA9PT0gS1dfT2JqQXNzaWduIHx8XG5cdFx0XHRcdFx0dC5raW5kID09PSBLV19ZaWVsZCB8fFxuXHRcdFx0XHRcdHQua2luZCA9PT0gS1dfWWllbGRUbyB8fFxuXHRcdFx0XHRcdHQua2luZCA9PT0gS1dfTWFwRW50cnkpLFxuXHRcdFx0aXNPYmpBc3NpZ246IGt3SXMoS1dfT2JqQXNzaWduKVxuXHRcdH0pLFxuXHROYW1lID0gdHQoJ05hbWUnLCBbICduYW1lJywgU3RyaW5nIF0pLFxuXHRUb2tlbk51bWJlckxpdGVyYWwgPSB0dCgnVG9rZW5OdW1iZXJMaXRlcmFsJywgWyAndmFsdWUnLCBOdW1iZXIgXSlcblxuLy8gdG9TdHJpbmcgaXMgdXNlZCBieSBzb21lIHBhcnNpbmcgZXJyb3JzLiBVc2UgVS5pbnNwZWN0IGZvciBhIG1vcmUgZGV0YWlsZWQgdmlldy5cbmltcGxlbWVudE1hbnkoeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEtleXdvcmQsIE5hbWUsIFRva2VuTnVtYmVyTGl0ZXJhbCB9LCAnc2hvdycsIHtcblx0Q2FsbE9uRm9jdXMoKSB7IHJldHVybiBgJHt0aGlzLm5hbWV9X2AgfSxcblx0RG90TmFtZSgpIHsgcmV0dXJuIGAkeycuJy5yZXBlYXQodGhpcy5uRG90cyl9JHt0aGlzLm5hbWV9YCB9LFxuXHQvLyBUT0RPOiBiZXR0ZXIgcmVwcmVzZW50YXRpb24gb2Yga1xuXHRHcm91cCgpIHsgcmV0dXJuIGBncm91cChrPSR7dGhpcy5raW5kfSlgIH0sXG5cdC8vIFRPRE86IGJldHRlciByZXByZXNlbnRhdGlvbiBvZiBrXG5cdEtleXdvcmQoKSB7IHJldHVybiBga2V5d29yZChrPSR7a1RvTmFtZS5nZXQodGhpcy5raW5kKX0pYCB9LFxuXHROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lIH0sXG5cdFRva2VuTnVtYmVyTGl0ZXJhbCgpIHsgcmV0dXJuIHRoaXMudmFsdWUgfVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9