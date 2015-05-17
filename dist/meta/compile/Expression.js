if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', 'tupl/dist/type', './private/language'], function (exports, _esastDistLoc, _tuplDistTupl, _tuplDistType, _privateLanguage) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	const Expression = (0, _tuplDistTupl.abstract)('Expression', Object, 'doc');
	exports.default = Expression;
	const LineContent = (0, _tuplDistTupl.abstract)('ValOrDo', Expression, 'Valid part of a Block.'),
	      Do = (0, _tuplDistTupl.abstract)('Do', LineContent, '\n\t\tThese can only appear as lines in a Block.\n\t\tNot to be confused with Generator expressions resulting from `do` keyword.'),
	      Val = (0, _tuplDistTupl.abstract)('Val', LineContent, 'These can appear in any expression.');

	exports.LineContent = LineContent;
	exports.Do = Do;
	exports.Val = Val;
	const makeType = function (superType) {
		return function (name, doc, namesTypes, protoProps, tuplProps) {
			return (
				// TODO: provide actual docs...
				(0, _tupl)(name, superType, doc, ['loc', _Loc].concat(namesTypes), protoProps, tuplProps)
			);
		};
	};
	const ee = makeType(Expression),
	      ed = makeType(Do),
	      ev = makeType(Val);

	const LD_Const = 0,
	      LD_Lazy = 1,
	      LD_Mutable = 2,
	      LocalDeclare = ee('LocalDeclare', 'TODO:DOC', ['name', String, 'opType', (0, _tuplDistType.Nullable)(Val), 'kind', Number], {
		isLazy: function () {
			return this.kind === LD_Lazy;
		},
		isMutable: function () {
			return this.kind === LD_Mutable;
		}
	}, {
		// Can't call this 'name' because LocalDeclare.name is 'LocalDeclare'
		declareName: function (loc) {
			return LocalDeclare.plain(loc, 'name');
		},
		focus: function (loc) {
			return LocalDeclare.plain(loc, '_');
		},
		noType: function (loc, name, isLazy) {
			return LocalDeclare(loc, name, null, isLazy ? LD_Lazy : LD_Const);
		},
		plain: function (loc, name) {
			return LocalDeclare.noType(loc, name, false);
		}
	}),
	      LocalDeclareRes = makeType(LocalDeclare)('LocalDeclareRes', 'TODO:DOC', ['opType', (0, _tuplDistType.Nullable)(Val)], {
		name: 'res',
		kind: LD_Const
	}),
	      Debug = ed('Debug', 'TODO:DOC', ['lines', [LineContent]]),
	      Block = (0, _tuplDistTupl.abstract)('Block', Expression, 'TODO:DOC'),
	      BlockDo = makeType(Block)('BlockDo', 'TODO:DOC', ['lines', [LineContent]]),
	      BlockVal = (0, _tuplDistTupl.abstract)('BlockVal', Block, 'TODO:DOC'),
	      BlockWithReturn = makeType(BlockVal)('BlockWithReturn', 'TODO:DOC', ['lines', [LineContent], 'returned', Val]),
	      BlockObj = makeType(BlockVal)('BlockObj', 'TODO:DOC', ['lines', [LineContent], 'keys', [LocalDeclare], 'opObjed', (0, _tuplDistType.Nullable)(Val), 'opName', (0, _tuplDistType.Nullable)(String)]),
	      BagEntry = ee('BagEntry', 'TODO:DOC', ['value', Val]),
	      BlockBag = makeType(BlockVal)('BlockBag', 'TODO:DOC', ['lines', [(0, _tuplDistType.Union)(LineContent, BagEntry)]]),
	      MapEntry = ee('MapEntry', 'TODO:DOC', ['key', Val, 'val', Val]),
	      BlockMap = makeType(BlockVal)('BlockMap', 'TODO:DOC', ['lines', [(0, _tuplDistType.Union)(LineContent, MapEntry)]]),
	      LocalAccess = ev('LocalAccess', 'TODO:DOC', ['name', String], {}, { focus: function (loc) {
			return LocalAccess(loc, '_');
		} }),
	      Assign = ed('Assign', 'TODO:DOC', ['assignee', LocalDeclare, 'value', Val], {}, { focus: function (loc, value) {
			return Assign(loc, LocalDeclare.focus(loc), value);
		} }),
	      AssignDestructure = ed('AssignDestructure', 'TODO:DOC', ['assignees', [LocalDeclare], 'value', Val], {
		// All assignees must share the same kind.
		kind: function () {
			return this.assignees[0].kind;
		}
	}),
	      AssignMutate = ed('AssignMutate', 'TODO:DOC', ['name', String, 'value', Val]),
	      GlobalAccess = ev('GlobalAccess', 'TODO:DOC', ['name', _privateLanguage.JsGlobals]),
	     
	// Module
	UseDo = ee('UseDo', 'TODO:DOC', ['path', String]),
	      Use = ee('Use', 'TODO:DOC', ['path', String, 'used', [LocalDeclare], 'opUseDefault', (0, _tuplDistType.Nullable)(LocalDeclare)]),
	      Module = ee('Module', 'TODO:DOC', ['doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'lines', [Do], 'exports', [LocalDeclare], 'opDefaultExport', (0, _tuplDistType.Nullable)(Val)]),
	     

	// Data
	BagSimple = ev('ListSimple', 'TODO:DOC', ['parts', [Val]]),
	      ObjPair = ee('ObjPair', 'TODO:DOC', ['key', String, 'value', Val]),
	     
	// Verifier checks that no two pairs may have the same key.
	ObjSimple = ev('ObjSimple', 'TODO:DOC', ['pairs', [ObjPair]]),
	     

	// Case
	Pattern = ee('Pattern', 'TODO:DOC', ['type', Val, 'locals', [LocalDeclare], 'patterned', LocalAccess]),
	      CaseDoPart = ee('CaseDoPart', 'TODO:DOC', ['test', (0, _tuplDistType.Union)(Val, Pattern), 'result', BlockDo]),
	      CaseValPart = ee('CaseValPart', 'TODO:DOC', ['test', (0, _tuplDistType.Union)(Val, Pattern), 'result', BlockVal]),
	      CaseDo = ed('CaseDo', 'TODO:DOC', ['opCased', (0, _tuplDistType.Nullable)(Assign), 'parts', [CaseDoPart], 'opElse', (0, _tuplDistType.Nullable)(BlockDo)]),
	     
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('CaseVal', 'TODO:DOC', ['opCased', (0, _tuplDistType.Nullable)(Assign), 'parts', [CaseValPart], 'opElse', (0, _tuplDistType.Nullable)(BlockVal)]),
	     

	// Statements
	Loop = ed('Loop', 'TODO:DOC', ['block', BlockDo]),
	      EndLoop = ed('EndLoop', 'TODO:DOC', []),
	     

	// Generators
	Yield = ev('Yield', 'TODO:DOC', ['yielded', Val]),
	      YieldTo = ev('YieldTo', 'TODO:DOC', ['yieldedTo', Val]),
	     

	// Expressions
	Splat = ee('Splat', 'TODO:DOC', ['splatted', Val]),
	      Call = ev('Call', 'TODO:DOC', ['called', Val, 'args', [(0, _tuplDistType.Union)(Val, Splat)]], {}, {
		contains: function (loc, testType, tested) {
			return Call(loc, SpecialVal.contains(loc), [testType, tested]);
		},
		sub: function (loc, args) {
			return Call(loc, SpecialVal.sub(loc), args);
		}
	}),
	      BlockWrap = ev('BlockWrap', 'TODO:DOC', ['block', BlockVal]),
	      Fun = ev('Fun', 'TODO:DOC', ['isGenerator', Boolean, 'args', [LocalDeclare], 'opRestArg', (0, _tuplDistType.Nullable)(LocalDeclare), 'block', Block, 'opIn', (0, _tuplDistType.Nullable)(Debug),
	// If non-empty, block should be a BlockVal,
	// and either it has a type or opOut is non-empty.
	'opResDeclare', (0, _tuplDistType.Nullable)(LocalDeclareRes), 'opOut', (0, _tuplDistType.Nullable)(Debug), 'name', (0, _tuplDistType.Nullable)(String)]),
	      Lazy = ev('Lazy', 'TODO:DOC', ['value', Val]),
	      NumberLiteral = ev('NumberLiteral', 'TODO:DOC', ['value', Number]),
	      Member = ev('Member', 'TODO:DOC', ['object', Val, 'name', String]),
	     
	// parts are Strings interleaved with Vals.
	Quote = ev('Quote', 'TODO:DOC', ['parts', [Object]], {}, {
		forString: function (loc, str) {
			return Quote(loc, [str]);
		}
	}),
	      SD_Debugger = 0,
	      SpecialDo = ed('SpecialDo', 'TODO:DOC', ['kind', Number], {}, {
		debugger: function (loc) {
			return SpecialDo(loc, SD_Debugger);
		}
	}),
	      SV_Contains = 0,
	      SV_False = 1,
	      SV_Null = 2,
	      SV_Sub = 3,
	      SV_This = 4,
	      SV_ThisModuleDirectory = 5,
	      SV_True = 6,
	      SV_Undefined = 7,
	     
	// k is a SP_***
	SpecialVal = ev('Special', 'TODO:DOC', ['kind', Number], {}, {
		contains: function (loc) {
			return SpecialVal(loc, SV_Contains);
		},
		sub: function (loc) {
			return SpecialVal(loc, SV_Sub);
		},
		null: function (loc) {
			return SpecialVal(loc, SV_Null);
		}
	});
	exports.LD_Const = LD_Const;
	exports.LD_Lazy = LD_Lazy;
	exports.LD_Mutable = LD_Mutable;
	exports.LocalDeclare = LocalDeclare;
	exports.LocalDeclareRes = LocalDeclareRes;
	exports.Debug = Debug;
	exports.Block = Block;
	exports.BlockDo = BlockDo;
	exports.BlockVal = BlockVal;
	exports.BlockWithReturn = BlockWithReturn;
	exports.BlockObj = BlockObj;
	exports.BagEntry = BagEntry;
	exports.BlockBag = BlockBag;
	exports.MapEntry = MapEntry;
	exports.BlockMap = BlockMap;
	exports.LocalAccess = LocalAccess;
	exports.Assign = Assign;
	exports.AssignDestructure = AssignDestructure;
	exports.AssignMutate = AssignMutate;
	exports.GlobalAccess = GlobalAccess;
	exports.UseDo = UseDo;
	exports.Use = Use;
	exports.Module = Module;
	exports.BagSimple = BagSimple;
	exports.ObjPair = ObjPair;
	exports.ObjSimple = ObjSimple;
	exports.Pattern = Pattern;
	exports.CaseDoPart = CaseDoPart;
	exports.CaseValPart = CaseValPart;
	exports.CaseDo = CaseDo;
	exports.CaseVal = CaseVal;
	exports.Loop = Loop;
	exports.EndLoop = EndLoop;
	exports.Yield = Yield;
	exports.YieldTo = YieldTo;
	exports.Splat = Splat;
	exports.Call = Call;
	exports.BlockWrap = BlockWrap;
	exports.Fun = Fun;
	exports.Lazy = Lazy;
	exports.NumberLiteral = NumberLiteral;
	exports.Member = Member;
	exports.Quote = Quote;
	exports.SD_Debugger = SD_Debugger;
	exports.SpecialDo = SpecialDo;
	exports.SV_Contains = SV_Contains;
	exports.SV_False = SV_False;
	exports.SV_Null = SV_Null;
	exports.SV_Sub = SV_Sub;
	exports.SV_This = SV_This;
	exports.SV_ThisModuleDirectory = SV_ThisModuleDirectory;
	exports.SV_True = SV_True;
	exports.SV_Undefined = SV_Undefined;
	exports.SpecialVal = SpecialVal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9FeHByZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFLQSxPQUFNLFVBQVUsR0FBRyxrQkFKSixRQUFRLEVBSUssWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTttQkFDekMsVUFBVTtBQUVsQixPQUNOLFdBQVcsR0FBRyxrQkFSQSxRQUFRLEVBUUMsU0FBUyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQztPQUN2RSxFQUFFLEdBQUcsa0JBVFMsUUFBUSxFQVNSLElBQUksRUFBRSxXQUFXLHFJQUVnRDtPQUMvRSxHQUFHLEdBQUcsa0JBWlEsUUFBUSxFQVlQLEtBQUssRUFBRSxXQUFXLEVBQUUscUNBQXFDLENBQUMsQ0FBQTs7U0FKekUsV0FBVyxHQUFYLFdBQVc7U0FDWCxFQUFFLEdBQUYsRUFBRTtTQUdGLEdBQUcsR0FBSCxHQUFHO0FBRUosT0FBTSxRQUFRLEdBQUcsVUFBQSxTQUFTO1NBQUksVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUzs7O0FBRTFFLGVBQUssSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVM7SUFBQztHQUFBO0VBQUEsQ0FBQTtBQUNyRixPQUNDLEVBQUUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO09BQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7T0FBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBOztBQUUxRCxPQUNOLFFBQVEsR0FBRyxDQUFDO09BQ1osT0FBTyxHQUFHLENBQUM7T0FDWCxVQUFVLEdBQUcsQ0FBQztPQUNkLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxFQUMvQixVQUFVLEVBQ1YsQ0FDQyxNQUFNLEVBQUUsTUFBTSxFQUNkLFFBQVEsRUFBRSxr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U0FBUztTQUlULEdBQUcsR0FBSCxHQUFHO1NBZUgsSUFBSSxHQUFKLElBQUk7U0FHSixhQUFhLEdBQWIsYUFBYTtTQUdiLE1BQU0sR0FBTixNQUFNO1NBT04sS0FBSyxHQUFMLEtBQUs7U0FRTCxXQUFXLEdBQVgsV0FBVztTQUNYLFNBQVMsR0FBVCxTQUFTO1NBUVQsV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUTtTQUNSLE9BQU8sR0FBUCxPQUFPO1NBQ1AsTUFBTSxHQUFOLE1BQU07U0FDTixPQUFPLEdBQVAsT0FBTztTQUNQLHNCQUFzQixHQUF0QixzQkFBc0I7U0FDdEIsT0FBTyxHQUFQLE9BQU87U0FDUCxZQUFZLEdBQVosWUFBWTtTQUVaLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9FeHByZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsLCB7IGFic3RyYWN0IH0gZnJvbSAndHVwbC9kaXN0L3R1cGwnXG5pbXBvcnQgeyBOdWxsYWJsZSwgVW5pb24gfSBmcm9tICd0dXBsL2Rpc3QvdHlwZSdcbmltcG9ydCB7IEpzR2xvYmFscyB9IGZyb20gJy4vcHJpdmF0ZS9sYW5ndWFnZSdcblxuY29uc3QgRXhwcmVzc2lvbiA9IGFic3RyYWN0KCdFeHByZXNzaW9uJywgT2JqZWN0LCAnZG9jJylcbmV4cG9ydCBkZWZhdWx0IEV4cHJlc3Npb25cblxuZXhwb3J0IGNvbnN0XG5cdExpbmVDb250ZW50ID0gYWJzdHJhY3QoJ1ZhbE9yRG8nLCBFeHByZXNzaW9uLCAnVmFsaWQgcGFydCBvZiBhIEJsb2NrLicpLFxuXHREbyA9IGFic3RyYWN0KCdEbycsIExpbmVDb250ZW50LCBgXG5cdFx0VGhlc2UgY2FuIG9ubHkgYXBwZWFyIGFzIGxpbmVzIGluIGEgQmxvY2suXG5cdFx0Tm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggR2VuZXJhdG9yIGV4cHJlc3Npb25zIHJlc3VsdGluZyBmcm9tIFxcYGRvXFxgIGtleXdvcmQuYCksXG5cdFZhbCA9IGFic3RyYWN0KCdWYWwnLCBMaW5lQ29udGVudCwgJ1RoZXNlIGNhbiBhcHBlYXIgaW4gYW55IGV4cHJlc3Npb24uJylcblxuY29uc3QgbWFrZVR5cGUgPSBzdXBlclR5cGUgPT4gKG5hbWUsIGRvYywgbmFtZXNUeXBlcywgcHJvdG9Qcm9wcywgdHVwbFByb3BzKSA9PlxuXHQvLyBUT0RPOiBwcm92aWRlIGFjdHVhbCBkb2NzLi4uXG5cdHR1cGwobmFtZSwgc3VwZXJUeXBlLCBkb2MsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSwgcHJvdG9Qcm9wcywgdHVwbFByb3BzKVxuY29uc3Rcblx0ZWUgPSBtYWtlVHlwZShFeHByZXNzaW9uKSwgZWQgPSBtYWtlVHlwZShEbyksIGV2ID0gbWFrZVR5cGUoVmFsKVxuXG5leHBvcnQgY29uc3Rcblx0TERfQ29uc3QgPSAwLFxuXHRMRF9MYXp5ID0gMSxcblx0TERfTXV0YWJsZSA9IDIsXG5cdExvY2FsRGVjbGFyZSA9IGVlKCdMb2NhbERlY2xhcmUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J25hbWUnLCBTdHJpbmcsXG5cdFx0XHQnb3BUeXBlJywgTnVsbGFibGUoVmFsKSxcblx0XHRcdCdraW5kJywgTnVtYmVyXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRpc0xhenkoKSB7IHJldHVybiB0aGlzLmtpbmQgPT09IExEX0xhenkgfSxcblx0XHRcdGlzTXV0YWJsZSgpIHsgcmV0dXJuIHRoaXMua2luZCA9PT0gTERfTXV0YWJsZSB9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHQvLyBDYW4ndCBjYWxsIHRoaXMgJ25hbWUnIGJlY2F1c2UgTG9jYWxEZWNsYXJlLm5hbWUgaXMgJ0xvY2FsRGVjbGFyZSdcblx0XHRcdGRlY2xhcmVOYW1lOiBsb2MgPT5cblx0XHRcdFx0TG9jYWxEZWNsYXJlLnBsYWluKGxvYywgJ25hbWUnKSxcblx0XHRcdGZvY3VzOiBsb2MgPT5cblx0XHRcdFx0TG9jYWxEZWNsYXJlLnBsYWluKGxvYywgJ18nKSxcblx0XHRcdG5vVHlwZTogKGxvYywgbmFtZSwgaXNMYXp5KSA9PlxuXHRcdFx0XHRMb2NhbERlY2xhcmUobG9jLCBuYW1lLCBudWxsLCBpc0xhenkgPyBMRF9MYXp5IDogTERfQ29uc3QpLFxuXHRcdFx0cGxhaW46IChsb2MsIG5hbWUpID0+XG5cdFx0XHRcdExvY2FsRGVjbGFyZS5ub1R5cGUobG9jLCBuYW1lLCBmYWxzZSlcblx0XHR9KSxcblx0TG9jYWxEZWNsYXJlUmVzID0gbWFrZVR5cGUoTG9jYWxEZWNsYXJlKSgnTG9jYWxEZWNsYXJlUmVzJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ29wVHlwZScsIE51bGxhYmxlKFZhbCkgXSxcblx0XHR7XG5cdFx0XHRuYW1lOiAncmVzJyxcblx0XHRcdGtpbmQ6IExEX0NvbnN0XG5cdFx0fSksXG5cblx0RGVidWcgPSBlZCgnRGVidWcnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbGluZXMnLCBbTGluZUNvbnRlbnRdIF0pLFxuXG5cdEJsb2NrID0gYWJzdHJhY3QoJ0Jsb2NrJywgRXhwcmVzc2lvbiwgJ1RPRE86RE9DJyksXG5cdEJsb2NrRG8gPSBtYWtlVHlwZShCbG9jaykoJ0Jsb2NrRG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbGluZXMnLCBbTGluZUNvbnRlbnRdIF0pLFxuXHRCbG9ja1ZhbCA9IGFic3RyYWN0KCdCbG9ja1ZhbCcsIEJsb2NrLCAnVE9ETzpET0MnKSxcblx0QmxvY2tXaXRoUmV0dXJuID0gbWFrZVR5cGUoQmxvY2tWYWwpKCdCbG9ja1dpdGhSZXR1cm4nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbGluZXMnLCBbTGluZUNvbnRlbnRdLCAncmV0dXJuZWQnLCBWYWwgXSksXG5cblx0QmxvY2tPYmogPSBtYWtlVHlwZShCbG9ja1ZhbCkoJ0Jsb2NrT2JqJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdsaW5lcycsIFtMaW5lQ29udGVudF0sXG5cdFx0XHQna2V5cycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J29wT2JqZWQnLCBOdWxsYWJsZShWYWwpLFxuXHRcdFx0J29wTmFtZScsIE51bGxhYmxlKFN0cmluZylcblx0XHRdKSxcblxuXHRCYWdFbnRyeSA9IGVlKCdCYWdFbnRyeScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd2YWx1ZScsIFZhbCBdKSxcblx0QmxvY2tCYWcgPSBtYWtlVHlwZShCbG9ja1ZhbCkoJ0Jsb2NrQmFnJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2xpbmVzJywgW1VuaW9uKExpbmVDb250ZW50LCBCYWdFbnRyeSldIF0pLFxuXG5cdE1hcEVudHJ5ID0gZWUoJ01hcEVudHJ5Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tleScsIFZhbCwgJ3ZhbCcsIFZhbCBdKSxcblx0QmxvY2tNYXAgPSBtYWtlVHlwZShCbG9ja1ZhbCkoJ0Jsb2NrTWFwJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2xpbmVzJywgW1VuaW9uKExpbmVDb250ZW50LCBNYXBFbnRyeSldIF0pLFxuXG5cdExvY2FsQWNjZXNzID0gZXYoJ0xvY2FsQWNjZXNzJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBTdHJpbmcgXSxcblx0XHR7IH0sXG5cdFx0eyBmb2N1czogbG9jID0+IExvY2FsQWNjZXNzKGxvYywgJ18nKSB9KSxcblx0QXNzaWduID0gZWQoJ0Fzc2lnbicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnYXNzaWduZWUnLCBMb2NhbERlY2xhcmUsXG5cdFx0XHQndmFsdWUnLCBWYWxcblx0XHRdLFxuXHRcdHsgfSxcblx0XHR7IGZvY3VzOiAobG9jLCB2YWx1ZSkgPT4gQXNzaWduKGxvYywgTG9jYWxEZWNsYXJlLmZvY3VzKGxvYyksIHZhbHVlKSB9KSxcblx0QXNzaWduRGVzdHJ1Y3R1cmUgPSBlZCgnQXNzaWduRGVzdHJ1Y3R1cmUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2Fzc2lnbmVlcycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J3ZhbHVlJywgVmFsXG5cdFx0XSxcblx0XHR7XG5cdFx0XHQvLyBBbGwgYXNzaWduZWVzIG11c3Qgc2hhcmUgdGhlIHNhbWUga2luZC5cblx0XHRcdGtpbmQoKSB7IHJldHVybiB0aGlzLmFzc2lnbmVlc1swXS5raW5kIH1cblx0XHR9KSxcblx0QXNzaWduTXV0YXRlID0gZWQoJ0Fzc2lnbk11dGF0ZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnbmFtZScsIFN0cmluZyxcblx0XHRcdCd2YWx1ZScsIFZhbFxuXHRcdF0pLFxuXHRHbG9iYWxBY2Nlc3MgPSBldignR2xvYmFsQWNjZXNzJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBKc0dsb2JhbHMgXSksXG5cdC8vIE1vZHVsZVxuXHRVc2VEbyA9IGVlKCdVc2VEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYXRoJywgU3RyaW5nIF0pLFxuXHRVc2UgPSBlZSgnVXNlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdwYXRoJywgU3RyaW5nLFxuXHRcdFx0J3VzZWQnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHRcdCdvcFVzZURlZmF1bHQnLCBOdWxsYWJsZShMb2NhbERlY2xhcmUpXG5cdFx0XSksXG5cdE1vZHVsZSA9IGVlKCdNb2R1bGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2RvVXNlcycsIFtVc2VEb10sXG5cdFx0XHQndXNlcycsIFtVc2VdLFxuXHRcdFx0J2RlYnVnVXNlcycsIFtVc2VdLFxuXHRcdFx0J2xpbmVzJywgW0RvXSxcblx0XHRcdCdleHBvcnRzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQnb3BEZWZhdWx0RXhwb3J0JywgTnVsbGFibGUoVmFsKVxuXHRcdF0pLFxuXG5cdC8vIERhdGFcblx0QmFnU2ltcGxlID0gZXYoJ0xpc3RTaW1wbGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAncGFydHMnLCBbVmFsXSBdKSxcblx0T2JqUGFpciA9IGVlKCdPYmpQYWlyJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdrZXknLCBTdHJpbmcsXG5cdFx0XHQndmFsdWUnLCBWYWxcblx0XHRdKSxcblx0Ly8gVmVyaWZpZXIgY2hlY2tzIHRoYXQgbm8gdHdvIHBhaXJzIG1heSBoYXZlIHRoZSBzYW1lIGtleS5cblx0T2JqU2ltcGxlID0gZXYoJ09ialNpbXBsZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYWlycycsIFtPYmpQYWlyXSBdKSxcblxuXHQvLyBDYXNlXG5cdFBhdHRlcm4gPSBlZSgnUGF0dGVybicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQndHlwZScsIFZhbCxcblx0XHRcdCdsb2NhbHMnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHRcdCdwYXR0ZXJuZWQnLCBMb2NhbEFjY2Vzc1xuXHRcdF0pLFxuXHRDYXNlRG9QYXJ0ID0gZWUoJ0Nhc2VEb1BhcnQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBVbmlvbihWYWwsIFBhdHRlcm4pLFxuXHRcdFx0J3Jlc3VsdCcsIEJsb2NrRG9cblx0XHRdKSxcblx0Q2FzZVZhbFBhcnQgPSBlZSgnQ2FzZVZhbFBhcnQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBVbmlvbihWYWwsIFBhdHRlcm4pLFxuXHRcdFx0J3Jlc3VsdCcsIEJsb2NrVmFsXG5cdFx0XSksXG5cdENhc2VEbyA9IGVkKCdDYXNlRG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J29wQ2FzZWQnLCBOdWxsYWJsZShBc3NpZ24pLFxuXHRcdFx0J3BhcnRzJywgW0Nhc2VEb1BhcnRdLFxuXHRcdFx0J29wRWxzZScsIE51bGxhYmxlKEJsb2NrRG8pXG5cdFx0XSksXG5cdC8vIFVubGlrZSBDYXNlRG8sIHRoaXMgaGFzIGByZXR1cm5gIHN0YXRlbWVudHMuXG5cdENhc2VWYWwgPSBldignQ2FzZVZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnb3BDYXNlZCcsIE51bGxhYmxlKEFzc2lnbiksXG5cdFx0XHQncGFydHMnLCBbQ2FzZVZhbFBhcnRdLFxuXHRcdFx0J29wRWxzZScsIE51bGxhYmxlKEJsb2NrVmFsKVxuXHRcdF0pLFxuXG5cdC8vIFN0YXRlbWVudHNcblx0TG9vcCA9IGVkKCdMb29wJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2Jsb2NrJywgQmxvY2tEbyBdKSxcblx0RW5kTG9vcCA9IGVkKCdFbmRMb29wJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgXSksXG5cblx0Ly8gR2VuZXJhdG9yc1xuXHRZaWVsZCA9IGV2KCdZaWVsZCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd5aWVsZGVkJywgVmFsIF0pLFxuXHRZaWVsZFRvID0gZXYoJ1lpZWxkVG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAneWllbGRlZFRvJywgVmFsIF0pLFxuXG5cdC8vIEV4cHJlc3Npb25zXG5cdFNwbGF0ID0gZWUoJ1NwbGF0Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3NwbGF0dGVkJywgVmFsIF0pLFxuXHRDYWxsID0gZXYoJ0NhbGwnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2NhbGxlZCcsIFZhbCxcblx0XHRcdCdhcmdzJywgW1VuaW9uKFZhbCwgU3BsYXQpXVxuXHRcdF0sXG5cdFx0eyB9LFxuXHRcdHtcblx0XHRcdGNvbnRhaW5zOiAobG9jLCB0ZXN0VHlwZSwgdGVzdGVkKSA9PlxuXHRcdFx0XHRDYWxsKGxvYywgU3BlY2lhbFZhbC5jb250YWlucyhsb2MpLCBbIHRlc3RUeXBlLCB0ZXN0ZWQgXSksXG5cdFx0XHRzdWI6IChsb2MsIGFyZ3MpID0+IENhbGwobG9jLCBTcGVjaWFsVmFsLnN1Yihsb2MpLCBhcmdzKVxuXHRcdH0pLFxuXHRCbG9ja1dyYXAgPSBldignQmxvY2tXcmFwJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2Jsb2NrJywgQmxvY2tWYWwgXSksXG5cblx0RnVuID0gZXYoJ0Z1bicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnaXNHZW5lcmF0b3InLCBCb29sZWFuLFxuXHRcdFx0J2FyZ3MnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHRcdCdvcFJlc3RBcmcnLCBOdWxsYWJsZShMb2NhbERlY2xhcmUpLFxuXHRcdFx0J2Jsb2NrJywgQmxvY2ssXG5cdFx0XHQnb3BJbicsIE51bGxhYmxlKERlYnVnKSxcblx0XHRcdC8vIElmIG5vbi1lbXB0eSwgYmxvY2sgc2hvdWxkIGJlIGEgQmxvY2tWYWwsXG5cdFx0XHQvLyBhbmQgZWl0aGVyIGl0IGhhcyBhIHR5cGUgb3Igb3BPdXQgaXMgbm9uLWVtcHR5LlxuXHRcdFx0J29wUmVzRGVjbGFyZScsIE51bGxhYmxlKExvY2FsRGVjbGFyZVJlcyksXG5cdFx0XHQnb3BPdXQnLCBOdWxsYWJsZShEZWJ1ZyksXG5cdFx0XHQnbmFtZScsIE51bGxhYmxlKFN0cmluZylcblx0XHRdKSxcblxuXHRMYXp5ID0gZXYoJ0xhenknLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAndmFsdWUnLCBWYWwgXSksXG5cdE51bWJlckxpdGVyYWwgPSBldignTnVtYmVyTGl0ZXJhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd2YWx1ZScsIE51bWJlciBdKSxcblx0TWVtYmVyID0gZXYoJ01lbWJlcicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnb2JqZWN0JywgVmFsLFxuXHRcdFx0J25hbWUnLCBTdHJpbmdcblx0XHRdKSxcblx0Ly8gcGFydHMgYXJlIFN0cmluZ3MgaW50ZXJsZWF2ZWQgd2l0aCBWYWxzLlxuXHRRdW90ZSA9IGV2KCdRdW90ZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYXJ0cycsIFtPYmplY3RdIF0sXG5cdFx0eyB9LFxuXHRcdHtcblx0XHRcdGZvclN0cmluZzogKGxvYywgc3RyKSA9PiBRdW90ZShsb2MsIFsgc3RyIF0pXG5cdFx0fSksXG5cblx0U0RfRGVidWdnZXIgPSAwLFxuXHRTcGVjaWFsRG8gPSBlZCgnU3BlY2lhbERvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tpbmQnLCBOdW1iZXIgXSxcblx0XHR7IH0sXG5cdFx0e1xuXHRcdFx0ZGVidWdnZXI6IGxvYyA9PiBTcGVjaWFsRG8obG9jLCBTRF9EZWJ1Z2dlcilcblx0XHR9KSxcblxuXHRTVl9Db250YWlucyA9IDAsXG5cdFNWX0ZhbHNlID0gMSxcblx0U1ZfTnVsbCA9IDIsXG5cdFNWX1N1YiA9IDMsXG5cdFNWX1RoaXMgPSA0LFxuXHRTVl9UaGlzTW9kdWxlRGlyZWN0b3J5ID0gNSxcblx0U1ZfVHJ1ZSA9IDYsXG5cdFNWX1VuZGVmaW5lZCA9IDcsXG5cdC8vIGsgaXMgYSBTUF8qKipcblx0U3BlY2lhbFZhbCA9IGV2KCdTcGVjaWFsJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tpbmQnLCBOdW1iZXIgXSxcblx0XHR7IH0sXG5cdFx0e1xuXHRcdFx0Y29udGFpbnM6IGxvYyA9PiBTcGVjaWFsVmFsKGxvYywgU1ZfQ29udGFpbnMpLFxuXHRcdFx0c3ViOiBsb2MgPT4gU3BlY2lhbFZhbChsb2MsIFNWX1N1YiksXG5cdFx0XHRudWxsOiBsb2MgPT4gU3BlY2lhbFZhbChsb2MsIFNWX051bGwpXG5cdFx0fSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9