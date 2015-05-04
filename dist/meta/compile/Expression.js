if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', 'tupl/dist/type', './private/Lang', './private/U/Op', './private/U/util'], function (exports, _esastDistLoc, _tuplDistTupl, _tuplDistType, _privateLang, _privateUOp, _privateUUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

	var _tupl = _interopRequire(_tuplDistTupl);

	var _Op = _interopRequire(_privateUOp);

	const Expression = _tuplDistTupl.abstract('Expression', Object, 'doc');
	exports.default = Expression;
	const Do = _tuplDistTupl.abstract('Do', Expression, '\n\t\tThese can only appear as lines in a Block.\n\t\tNot to be confused with Generator expressions resulting from `do` keyword.'),
	      Val = _tuplDistTupl.abstract('Val', Expression, 'These can appear in any expression.');

	exports.Do = Do;
	exports.Val = Val;
	const makeType = function (superType) {
		return function (name) {
			for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				namesTypes[_key - 1] = arguments[_key];
			}

			return (
				// TODO: provide actual docs...
				_tupl(name, superType, 'doc', ['loc', _Loc].concat(namesTypes))
			);
		};
	};
	const ee = makeType(Expression),
	      ed = makeType(Do),
	      ev = makeType(Val);

	// TODO: Get rid of null
	const KSpecial = _privateUUtil.newSet(_privateLang.SpecialKeywords, ['contains', 'debugger', 'sub', 'null']);

	const Debug = ed('Debug', 'lines', [Expression]),
	      BlockDo = ed('BlockDo', 'lines', [Expression]),
	      BlockVal = ed('BlockVal', 'lines', [Expression], 'returned', Val),
	      ModuleDefaultExport = ed('ModuleDefaultExport', 'value', Val),
	      LocalDeclare = Object.assign(ee('LocalDeclare', 'name', String, 'opType', _Op(Val), 'isLazy', Boolean, 'okToNotUse', Boolean), {
		focus: function (loc) {
			return LocalDeclare(loc, '_', _privateUOp.None, false, false);
		},
		res: function (loc, opType) {
			return LocalDeclare(loc, 'res', opType, false, true);
		}
	}),
	      Assign = Object.assign(ed('Assign', 'assignee', LocalDeclare, 'k', _privateLang.KAssign, 'value', Val), { focus: function (loc, value) {
			return Assign(loc, LocalDeclare.focus(loc), '=', value);
		} }),
	      AssignDestructure = ed('AssignDestructure', 'assignees', [LocalDeclare], 'k', _privateLang.KAssign, 'value', Val, 'isLazy', Boolean),
	      LocalAccess = Object.assign(ev('LocalAccess', 'name', String), { focus: function (loc) {
			return LocalAccess(loc, '_');
		} }),
	      GlobalAccess = Object.assign(ev('GlobalAccess', 'name', _privateLang.JsGlobals), {
		null: function (loc) {
			return GlobalAccess(loc, 'null');
		},
		true: function (loc) {
			return GlobalAccess(loc, 'true');
		}
	}),
	     
	// Module
	UseDo = ee('UseDo', 'path', String),
	      Use = ee('Use', 'path', String, 'used', [LocalDeclare], 'opUseDefault', _Op(LocalDeclare)),
	     
	// `block` will contain ModuleExport and ModuleDefaultExport_s
	// TODO: BlockVal and don't have `exports` object
	Module = ee('Module', 'doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'block', BlockDo),
	     

	// Data
	// TODO: Don't store index here, do it in Vr
	ListEntry = ed('ListEntry', 'value', Val, 'index', Number),
	     
	// TODO: Don't store length here, do it in Vr
	ListReturn = ev('ListReturn', 'length', Number),
	      ListSimple = ev('ListSimple', 'parts', [Val]),
	     

	// TODO: Don't store index here, do it in Vr
	MapEntry = ed('MapEntry', 'key', Val, 'val', Val, 'index', Number),
	     
	// TODO: Don't store length here, do it in Vr
	MapReturn = ev('MapReturn', 'length', Number),
	      ObjReturn = ev('ObjReturn', 'keys', [LocalDeclare], 'debugKeys', [LocalDeclare], 'opObjed', _Op(Val), 'opDisplayName', _Op(String)),
	     
	// keysVals: values are Vals
	ObjSimple = ev('ObjSimple', 'keysVals', Object),
	     

	// Case
	Pattern = ee('Pattern', 'type', Val, 'locals', [LocalDeclare], 'patterned', LocalAccess),
	      CaseDoPart = ee('CaseDoPart', 'test', _tuplDistType.Union(Val, Pattern), 'result', BlockDo),
	      CaseValPart = ee('CaseValPart', 'test', _tuplDistType.Union(Val, Pattern), 'result', BlockVal),
	      CaseDo = ed('CaseDo', 'opCased', _Op(Assign), 'parts', [CaseDoPart], 'opElse', _Op(BlockDo)),
	     
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('CaseVal', 'opCased', _Op(Assign), 'parts', [CaseValPart], 'opElse', _Op(BlockVal)),
	     

	// Statements
	Loop = ed('Loop', 'block', BlockDo),
	      EndLoop = ed('EndLoop'),
	     

	// Generators
	Yield = ev('Yield', 'yielded', Val),
	      YieldTo = ev('YieldTo', 'yieldedTo', Val),
	     

	// Expressions
	Call = Object.assign(ev('Call', 'called', Val, 'args', [Val]), {
		contains: function (loc, testType, tested) {
			return Call(loc, Special.contains(loc), [testType, tested]);
		},
		sub: function (loc, args) {
			return Call(loc, Special.sub(loc), args);
		}
	}),
	     
	// Only for use in a Call
	Splat = ev('Splat', 'splatted', Val),
	      BlockWrap = ev('BlockWrap', 'block', BlockVal),
	      Fun = ev('Fun', 'k', _privateLang.KFun, 'args', [LocalDeclare], 'opRestArg', _Op(LocalDeclare),
	// BlockDo or BlockVal
	'block', Expression, 'opIn', _Op(Debug),
	// If non-empty, block should be a BlockVal, and either it has a type or opOut is non-empty.
	'opResDeclare', _Op(LocalDeclare), 'opOut', _Op(Debug)),
	      Lazy = ev('Lazy', 'value', Val),
	      NumberLiteral = ev('NumberLiteral', 'value', Number),
	      Member = ev('Member', 'object', Val, 'name', String),
	     
	// parts are Strings interleaved with Vals.
	Quote = Object.assign(ev('Quote', 'parts', [Object]), {
		forString: function (loc, str) {
			return Quote(loc, [str]);
		}
	}),
	      Special = Object.assign(ev('Special', 'k', KSpecial), {
		contains: function (loc) {
			return Special(loc, 'contains');
		},
		debugger: function (loc) {
			return Special(loc, 'debugger');
		},
		sub: function (loc) {
			return Special(loc, 'sub');
		}
	});
	exports.Debug = Debug;
	exports.BlockDo = BlockDo;
	exports.BlockVal = BlockVal;
	exports.ModuleDefaultExport = ModuleDefaultExport;
	exports.LocalDeclare = LocalDeclare;
	exports.Assign = Assign;
	exports.AssignDestructure = AssignDestructure;
	exports.LocalAccess = LocalAccess;
	exports.GlobalAccess = GlobalAccess;
	exports.UseDo = UseDo;
	exports.Use = Use;
	exports.Module = Module;
	exports.ListEntry = ListEntry;
	exports.ListReturn = ListReturn;
	exports.ListSimple = ListSimple;
	exports.MapEntry = MapEntry;
	exports.MapReturn = MapReturn;
	exports.ObjReturn = ObjReturn;
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
	exports.Call = Call;
	exports.Splat = Splat;
	exports.BlockWrap = BlockWrap;
	exports.Fun = Fun;
	exports.Lazy = Lazy;
	exports.NumberLiteral = NumberLiteral;
	exports.Member = Member;
	exports.Quote = Quote;
	exports.Special = Special;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9FeHByZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQU9BLE9BQU0sVUFBVSxHQUFHLGNBTkosUUFBUSxDQU1LLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7bUJBQ3pDLFVBQVU7QUFFbEIsT0FDTixFQUFFLEdBQUcsY0FWUyxRQUFRLENBVVIsSUFBSSxFQUFFLFVBQVUscUlBRWlEO09BQy9FLEdBQUcsR0FBRyxjQWJRLFFBQVEsQ0FhUCxLQUFLLEVBQUUsVUFBVSxFQUFFLHFDQUFxQyxDQUFDLENBQUE7O1NBSHhFLEVBQUUsR0FBRixFQUFFO1NBR0YsR0FBRyxHQUFILEdBQUc7QUFFSixPQUFNLFFBQVEsR0FBRyxVQUFBLFNBQVM7U0FBSSxVQUFDLElBQUk7cUNBQUssVUFBVTtBQUFWLGNBQVU7Ozs7O0FBRWpELFVBQUssSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQUM7R0FBQTtFQUFBLENBQUE7QUFDaEUsT0FDQyxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztPQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO09BQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7O0FBR2pFLE9BQU0sUUFBUSxHQUFHLGNBbEJSLE1BQU0sY0FGb0IsZUFBZSxFQW9CVCxDQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBRSxDQUFDLENBQUE7O0FBRTVFLE9BQ04sS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7T0FDMUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7T0FDOUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxV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TixNQUFNO1NBR04saUJBQWlCLEdBQWpCLGlCQUFpQjtTQUtqQixXQUFXLEdBQVgsV0FBVztTQUdYLFlBQVksR0FBWixZQUFZO1NBT1osS0FBSyxHQUFMLEtBQUs7U0FDTCxHQUFHLEdBQUgsR0FBRztTQUdILE1BQU0sR0FBTixNQUFNO1NBSU4sU0FBUyxHQUFULFNBQVM7U0FFVCxVQUFVLEdBQVYsVUFBVTtTQUNWLFVBQVUsR0FBVixVQUFVO1NBR1YsUUFBUSxHQUFSLFFBQVE7U0FFUixTQUFTLEdBQVQsU0FBUztTQUNULFNBQVMsR0FBVCxTQUFTO1NBTVQsU0FBUyxHQUFULFNBQVM7U0FHVCxPQUFPLEdBQVAsT0FBTztTQUNQLFVBQVUsR0FBVixVQUFVO1NBQ1YsV0FBVyxHQUFYLFdBQVc7U0FDWCxNQUFNLEdBQU4sTUFBTTtTQUVOLE9BQU8sR0FBUCxPQUFPO1NBR1AsSUFBSSxHQUFKLElBQUk7U0FDSixPQUFPLEdBQVAsT0FBTztTQUdQLEtBQUssR0FBTCxLQUFLO1NBQ0wsT0FBTyxHQUFQLE9BQU87U0FHUCxJQUFJLEdBQUosSUFBSTtTQVFKLEtBQUssR0FBTCxLQUFLO1NBRUwsU0FBUyxHQUFULFNBQVM7U0FFVCxHQUFHLEdBQUgsR0FBRztTQVdILElBQUksR0FBSixJQUFJO1NBQ0osYUFBYSxHQUFiLGFBQWE7U0FDYixNQUFNLEdBQU4sTUFBTTtTQUVOLEtBQUssR0FBTCxLQUFLO1NBUUwsT0FBTyxHQUFQLE9BQU8iLCJmaWxlIjoibWV0YS9jb21waWxlL0V4cHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwsIHsgYWJzdHJhY3QgfSBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IFVuaW9uIH0gZnJvbSAndHVwbC9kaXN0L3R5cGUnXG5pbXBvcnQgeyBKc0dsb2JhbHMsIEtBc3NpZ24sIEtGdW4sIFNwZWNpYWxLZXl3b3JkcyB9IGZyb20gJy4vcHJpdmF0ZS9MYW5nJ1xuaW1wb3J0IE9wLCB7IE5vbmUgfSBmcm9tICcuL3ByaXZhdGUvVS9PcCdcbmltcG9ydCB7IG5ld1NldCB9IGZyb20gJy4vcHJpdmF0ZS9VL3V0aWwnXG5cbmNvbnN0IEV4cHJlc3Npb24gPSBhYnN0cmFjdCgnRXhwcmVzc2lvbicsIE9iamVjdCwgJ2RvYycpXG5leHBvcnQgZGVmYXVsdCBFeHByZXNzaW9uXG5cbmV4cG9ydCBjb25zdFxuXHREbyA9IGFic3RyYWN0KCdEbycsIEV4cHJlc3Npb24sIGBcblx0XHRUaGVzZSBjYW4gb25seSBhcHBlYXIgYXMgbGluZXMgaW4gYSBCbG9jay5cblx0XHROb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBHZW5lcmF0b3IgZXhwcmVzc2lvbnMgcmVzdWx0aW5nIGZyb20gXFxgZG9cXGAga2V5d29yZC5gKSxcblx0VmFsID0gYWJzdHJhY3QoJ1ZhbCcsIEV4cHJlc3Npb24sICdUaGVzZSBjYW4gYXBwZWFyIGluIGFueSBleHByZXNzaW9uLicpXG5cbmNvbnN0IG1ha2VUeXBlID0gc3VwZXJUeXBlID0+IChuYW1lLCAuLi5uYW1lc1R5cGVzKSA9PlxuXHQvLyBUT0RPOiBwcm92aWRlIGFjdHVhbCBkb2NzLi4uXG5cdHR1cGwobmFtZSwgc3VwZXJUeXBlLCAnZG9jJywgWyAnbG9jJywgTG9jIF0uY29uY2F0KG5hbWVzVHlwZXMpKVxuY29uc3Rcblx0ZWUgPSBtYWtlVHlwZShFeHByZXNzaW9uKSwgZWQgPSBtYWtlVHlwZShEbyksIGV2ID0gbWFrZVR5cGUoVmFsKVxuXG4vLyBUT0RPOiBHZXQgcmlkIG9mIG51bGxcbmNvbnN0IEtTcGVjaWFsID0gbmV3U2V0KFNwZWNpYWxLZXl3b3JkcywgWyAnY29udGFpbnMnLCAnZGVidWdnZXInLCAnc3ViJywgJ251bGwnIF0pXG5cbmV4cG9ydCBjb25zdFxuXHREZWJ1ZyA9IGVkKCdEZWJ1ZycsICdsaW5lcycsIFtFeHByZXNzaW9uXSksXG5cdEJsb2NrRG8gPSBlZCgnQmxvY2tEbycsICdsaW5lcycsIFtFeHByZXNzaW9uXSksXG5cdEJsb2NrVmFsID0gZWQoJ0Jsb2NrVmFsJywgJ2xpbmVzJywgW0V4cHJlc3Npb25dLCAncmV0dXJuZWQnLCBWYWwpLFxuXHRNb2R1bGVEZWZhdWx0RXhwb3J0ID0gZWQoJ01vZHVsZURlZmF1bHRFeHBvcnQnLCAndmFsdWUnLCBWYWwpLFxuXHRMb2NhbERlY2xhcmUgPSBPYmplY3QuYXNzaWduKFxuXHRcdGVlKCdMb2NhbERlY2xhcmUnLFxuXHRcdFx0J25hbWUnLCBTdHJpbmcsICdvcFR5cGUnLCBPcChWYWwpLCAnaXNMYXp5JywgQm9vbGVhbiwgJ29rVG9Ob3RVc2UnLCBCb29sZWFuKSxcblx0XHR7XG5cdFx0XHRmb2N1czogbG9jID0+IExvY2FsRGVjbGFyZShsb2MsICdfJywgTm9uZSwgZmFsc2UsIGZhbHNlKSxcblx0XHRcdHJlczogKGxvYywgb3BUeXBlKSA9PiBMb2NhbERlY2xhcmUobG9jLCAncmVzJywgb3BUeXBlLCBmYWxzZSwgdHJ1ZSlcblx0XHR9KSxcblx0QXNzaWduID0gT2JqZWN0LmFzc2lnbihcblx0XHRlZCgnQXNzaWduJywgJ2Fzc2lnbmVlJywgTG9jYWxEZWNsYXJlLCAnaycsIEtBc3NpZ24sICd2YWx1ZScsIFZhbCksXG5cdFx0eyBmb2N1czogKGxvYywgdmFsdWUpID0+IEFzc2lnbihsb2MsIExvY2FsRGVjbGFyZS5mb2N1cyhsb2MpLCAnPScsIHZhbHVlKSB9KSxcblx0QXNzaWduRGVzdHJ1Y3R1cmUgPSBlZCgnQXNzaWduRGVzdHJ1Y3R1cmUnLFxuXHRcdCdhc3NpZ25lZXMnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHQnaycsIEtBc3NpZ24sXG5cdFx0J3ZhbHVlJywgVmFsLFxuXHRcdCdpc0xhenknLCBCb29sZWFuKSxcblx0TG9jYWxBY2Nlc3MgPSBPYmplY3QuYXNzaWduKFxuXHRcdGV2KCdMb2NhbEFjY2VzcycsICduYW1lJywgU3RyaW5nKSxcblx0XHR7IGZvY3VzOiBsb2MgPT4gTG9jYWxBY2Nlc3MobG9jLCAnXycpIH0pLFxuXHRHbG9iYWxBY2Nlc3MgPSBPYmplY3QuYXNzaWduKFxuXHRcdGV2KCdHbG9iYWxBY2Nlc3MnLCAnbmFtZScsIEpzR2xvYmFscyksXG5cdFx0e1xuXHRcdFx0bnVsbDogbG9jID0+IEdsb2JhbEFjY2Vzcyhsb2MsICdudWxsJyksXG5cdFx0XHR0cnVlOiBsb2MgPT4gR2xvYmFsQWNjZXNzKGxvYywgJ3RydWUnKVxuXHRcdH0pLFxuXHQvLyBNb2R1bGVcblx0VXNlRG8gPSBlZSgnVXNlRG8nLCAncGF0aCcsIFN0cmluZyksXG5cdFVzZSA9IGVlKCdVc2UnLCAncGF0aCcsIFN0cmluZywgJ3VzZWQnLCBbTG9jYWxEZWNsYXJlXSwgJ29wVXNlRGVmYXVsdCcsIE9wKExvY2FsRGVjbGFyZSkpLFxuXHQvLyBgYmxvY2tgIHdpbGwgY29udGFpbiBNb2R1bGVFeHBvcnQgYW5kIE1vZHVsZURlZmF1bHRFeHBvcnRfc1xuXHQvLyBUT0RPOiBCbG9ja1ZhbCBhbmQgZG9uJ3QgaGF2ZSBgZXhwb3J0c2Agb2JqZWN0XG5cdE1vZHVsZSA9IGVlKCdNb2R1bGUnLCAnZG9Vc2VzJywgW1VzZURvXSwgJ3VzZXMnLCBbVXNlXSwgJ2RlYnVnVXNlcycsIFtVc2VdLCAnYmxvY2snLCBCbG9ja0RvKSxcblxuXHQvLyBEYXRhXG5cdC8vIFRPRE86IERvbid0IHN0b3JlIGluZGV4IGhlcmUsIGRvIGl0IGluIFZyXG5cdExpc3RFbnRyeSA9IGVkKCdMaXN0RW50cnknLCAndmFsdWUnLCBWYWwsICdpbmRleCcsIE51bWJlciksXG5cdC8vIFRPRE86IERvbid0IHN0b3JlIGxlbmd0aCBoZXJlLCBkbyBpdCBpbiBWclxuXHRMaXN0UmV0dXJuID0gZXYoJ0xpc3RSZXR1cm4nLCAnbGVuZ3RoJywgTnVtYmVyKSxcblx0TGlzdFNpbXBsZSA9IGV2KCdMaXN0U2ltcGxlJywgJ3BhcnRzJywgW1ZhbF0pLFxuXG5cdC8vIFRPRE86IERvbid0IHN0b3JlIGluZGV4IGhlcmUsIGRvIGl0IGluIFZyXG5cdE1hcEVudHJ5ID0gZWQoJ01hcEVudHJ5JywgJ2tleScsIFZhbCwgJ3ZhbCcsIFZhbCwgJ2luZGV4JywgTnVtYmVyKSxcblx0Ly8gVE9ETzogRG9uJ3Qgc3RvcmUgbGVuZ3RoIGhlcmUsIGRvIGl0IGluIFZyXG5cdE1hcFJldHVybiA9IGV2KCdNYXBSZXR1cm4nLCAnbGVuZ3RoJywgTnVtYmVyKSxcblx0T2JqUmV0dXJuID0gZXYoJ09ialJldHVybicsXG5cdFx0J2tleXMnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHQnZGVidWdLZXlzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0J29wT2JqZWQnLCBPcChWYWwpLFxuXHRcdCdvcERpc3BsYXlOYW1lJywgT3AoU3RyaW5nKSksXG5cdC8vIGtleXNWYWxzOiB2YWx1ZXMgYXJlIFZhbHNcblx0T2JqU2ltcGxlID0gZXYoJ09ialNpbXBsZScsICdrZXlzVmFscycsIE9iamVjdCksXG5cblx0Ly8gQ2FzZVxuXHRQYXR0ZXJuID0gZWUoJ1BhdHRlcm4nLCAndHlwZScsIFZhbCwgJ2xvY2FscycsIFtMb2NhbERlY2xhcmVdLCAncGF0dGVybmVkJywgTG9jYWxBY2Nlc3MpLFxuXHRDYXNlRG9QYXJ0ID0gZWUoJ0Nhc2VEb1BhcnQnLCAndGVzdCcsIFVuaW9uKFZhbCwgUGF0dGVybiksICdyZXN1bHQnLCBCbG9ja0RvKSxcblx0Q2FzZVZhbFBhcnQgPSBlZSgnQ2FzZVZhbFBhcnQnLCAndGVzdCcsIFVuaW9uKFZhbCwgUGF0dGVybiksICdyZXN1bHQnLCBCbG9ja1ZhbCksXG5cdENhc2VEbyA9IGVkKCdDYXNlRG8nLCAnb3BDYXNlZCcsIE9wKEFzc2lnbiksICdwYXJ0cycsIFtDYXNlRG9QYXJ0XSwgJ29wRWxzZScsIE9wKEJsb2NrRG8pKSxcblx0Ly8gVW5saWtlIENhc2VEbywgdGhpcyBoYXMgYHJldHVybmAgc3RhdGVtZW50cy5cblx0Q2FzZVZhbCA9IGV2KCdDYXNlVmFsJywgJ29wQ2FzZWQnLCBPcChBc3NpZ24pLCAncGFydHMnLCBbQ2FzZVZhbFBhcnRdLCAnb3BFbHNlJywgT3AoQmxvY2tWYWwpKSxcblxuXHQvLyBTdGF0ZW1lbnRzXG5cdExvb3AgPSBlZCgnTG9vcCcsICdibG9jaycsIEJsb2NrRG8pLFxuXHRFbmRMb29wID0gZWQoJ0VuZExvb3AnKSxcblxuXHQvLyBHZW5lcmF0b3JzXG5cdFlpZWxkID0gZXYoJ1lpZWxkJywgJ3lpZWxkZWQnLCBWYWwpLFxuXHRZaWVsZFRvID0gZXYoJ1lpZWxkVG8nLCAneWllbGRlZFRvJywgVmFsKSxcblxuXHQvLyBFeHByZXNzaW9uc1xuXHRDYWxsID0gT2JqZWN0LmFzc2lnbihcblx0XHRldignQ2FsbCcsICdjYWxsZWQnLCBWYWwsICdhcmdzJywgW1ZhbF0pLFxuXHRcdHtcblx0XHRcdGNvbnRhaW5zOiAobG9jLCB0ZXN0VHlwZSwgdGVzdGVkKSA9PlxuXHRcdFx0XHRDYWxsKGxvYywgU3BlY2lhbC5jb250YWlucyhsb2MpLCBbIHRlc3RUeXBlLCB0ZXN0ZWQgXSksXG5cdFx0XHRzdWI6IChsb2MsIGFyZ3MpID0+IENhbGwobG9jLCBTcGVjaWFsLnN1Yihsb2MpLCBhcmdzKVxuXHRcdH0pLFxuXHQvLyBPbmx5IGZvciB1c2UgaW4gYSBDYWxsXG5cdFNwbGF0ID0gZXYoJ1NwbGF0JywgJ3NwbGF0dGVkJywgVmFsKSxcblxuXHRCbG9ja1dyYXAgPSBldignQmxvY2tXcmFwJywgJ2Jsb2NrJywgQmxvY2tWYWwpLFxuXG5cdEZ1biA9IGV2KCdGdW4nLFxuXHRcdCdrJywgS0Z1bixcblx0XHQnYXJncycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdCdvcFJlc3RBcmcnLCBPcChMb2NhbERlY2xhcmUpLFxuXHRcdC8vIEJsb2NrRG8gb3IgQmxvY2tWYWxcblx0XHQnYmxvY2snLCBFeHByZXNzaW9uLFxuXHRcdCdvcEluJywgT3AoRGVidWcpLFxuXHRcdC8vIElmIG5vbi1lbXB0eSwgYmxvY2sgc2hvdWxkIGJlIGEgQmxvY2tWYWwsIGFuZCBlaXRoZXIgaXQgaGFzIGEgdHlwZSBvciBvcE91dCBpcyBub24tZW1wdHkuXG5cdFx0J29wUmVzRGVjbGFyZScsIE9wKExvY2FsRGVjbGFyZSksXG5cdFx0J29wT3V0JywgT3AoRGVidWcpKSxcblxuXHRMYXp5ID0gZXYoJ0xhenknLCAndmFsdWUnLCBWYWwpLFxuXHROdW1iZXJMaXRlcmFsID0gZXYoJ051bWJlckxpdGVyYWwnLCAndmFsdWUnLCBOdW1iZXIpLFxuXHRNZW1iZXIgPSBldignTWVtYmVyJywgJ29iamVjdCcsIFZhbCwgJ25hbWUnLCBTdHJpbmcpLFxuXHQvLyBwYXJ0cyBhcmUgU3RyaW5ncyBpbnRlcmxlYXZlZCB3aXRoIFZhbHMuXG5cdFF1b3RlID0gT2JqZWN0LmFzc2lnbihcblx0XHRldignUXVvdGUnLCAncGFydHMnLCBbT2JqZWN0XSksXG5cdFx0e1xuXHRcdFx0Zm9yU3RyaW5nKGxvYywgc3RyKSB7XG5cdFx0XHRcdHJldHVybiBRdW90ZShsb2MsIFsgc3RyIF0pXG5cdFx0XHR9XG5cdFx0fSksXG5cblx0U3BlY2lhbCA9IE9iamVjdC5hc3NpZ24oXG5cdFx0ZXYoJ1NwZWNpYWwnLCAnaycsIEtTcGVjaWFsKSxcblx0XHR7XG5cdFx0XHRjb250YWluczogbG9jID0+IFNwZWNpYWwobG9jLCAnY29udGFpbnMnKSxcblx0XHRcdGRlYnVnZ2VyOiBsb2MgPT4gU3BlY2lhbChsb2MsICdkZWJ1Z2dlcicpLFxuXHRcdFx0c3ViOiBsb2MgPT4gU3BlY2lhbChsb2MsICdzdWInKVxuXHRcdH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==