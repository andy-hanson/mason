if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/private/tuple', 'esast/dist/Loc', './private/Lang', './private/U/Op', './private/U/util'], function (exports, _esastDistPrivateTuple, _esastDistLoc, _privateLang, _privateUOp, _privateUUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _tuple = _interopRequire(_esastDistPrivateTuple);

	var _Loc = _interopRequire(_esastDistLoc);

	var _Op = _interopRequire(_privateUOp);

	let Expression = function Expression() {
		_classCallCheck(this, Expression);
	};

	exports.default = Expression;

	// These can only appear as lines in a Block.
	// Not to be confused with Generator expressions resulting from `do` keyword.

	let Do = (function (_Expression) {
		function Do() {
			_classCallCheck(this, Do);

			if (_Expression != null) {
				_Expression.apply(this, arguments);
			}
		}

		_inherits(Do, _Expression);

		return Do;
	})(Expression);

	exports.Do = Do;

	// These can appear in any expression.

	let Val = (function (_Expression2) {
		function Val() {
			_classCallCheck(this, Val);

			if (_Expression2 != null) {
				_Expression2.apply(this, arguments);
			}
		}

		_inherits(Val, _Expression2);

		return Val;
	})(Expression);

	exports.Val = Val;

	const makeType = function (superType) {
		return function (name) {
			for (var _len = arguments.length, namesTypes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				namesTypes[_key - 1] = arguments[_key];
			}

			return _tuple(name, superType, 'doc', ['loc', _Loc].concat(namesTypes));
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
	CaseDoPart = ee('CaseDoPart', 'test', Val, 'result', BlockDo),
	      CaseValPart = ee('CaseValPart', 'test', Val, 'result', BlockVal),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9FeHByZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FNcUIsVUFBVSxZQUFWLFVBQVU7d0JBQVYsVUFBVTs7O21CQUFWLFVBQVU7Ozs7O0tBR2xCLEVBQUU7V0FBRixFQUFFO3lCQUFGLEVBQUU7Ozs7Ozs7WUFBRixFQUFFOztTQUFGLEVBQUU7SUFBUyxVQUFVOztTQUFyQixFQUFFLEdBQUYsRUFBRTs7OztLQUVGLEdBQUc7V0FBSCxHQUFHO3lCQUFILEdBQUc7Ozs7Ozs7WUFBSCxHQUFHOztTQUFILEdBQUc7SUFBUyxVQUFVOztTQUF0QixHQUFHLEdBQUgsR0FBRzs7QUFFaEIsT0FBTSxRQUFRLEdBQUcsVUFBQSxTQUFTO1NBQUksVUFBQyxJQUFJO3FDQUFLLFVBQVU7QUFBVixjQUFVOzs7VUFDakQsT0FBTSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUFBO0VBQUEsQ0FBQTtBQUNqRSxPQUNDLEVBQUUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO09BQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7T0FBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBOzs7QUFHakUsT0FBTSxRQUFRLEdBQUcsY0FmUixNQUFNLGNBRm9CLGVBQWUsRUFpQlQsQ0FBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFBOztBQUU1RSxPQUNOLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQzFDLE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQzlDLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8s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VUFBVTtTQUdWLFFBQVEsR0FBUixRQUFRO1NBRVIsU0FBUyxHQUFULFNBQVM7U0FDVCxTQUFTLEdBQVQsU0FBUztTQU1ULFNBQVMsR0FBVCxTQUFTO1NBR1QsVUFBVSxHQUFWLFVBQVU7U0FDVixXQUFXLEdBQVgsV0FBVztTQUNYLE1BQU0sR0FBTixNQUFNO1NBRU4sT0FBTyxHQUFQLE9BQU87U0FHUCxJQUFJLEdBQUosSUFBSTtTQUNKLE9BQU8sR0FBUCxPQUFPO1NBR1AsS0FBSyxHQUFMLEtBQUs7U0FDTCxPQUFPLEdBQVAsT0FBTztTQUdQLElBQUksR0FBSixJQUFJO1NBUUosS0FBSyxHQUFMLEtBQUs7U0FFTCxTQUFTLEdBQVQsU0FBUztTQUVULEdBQUcsR0FBSCxHQUFHO1NBV0gsSUFBSSxHQUFKLElBQUk7U0FDSixhQUFhLEdBQWIsYUFBYTtTQUNiLE1BQU0sR0FBTixNQUFNO1NBRU4sS0FBSyxHQUFMLEtBQUs7U0FRTCxPQUFPLEdBQVAsT0FBTyIsImZpbGUiOiJtZXRhL2NvbXBpbGUvRXhwcmVzc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0dXBsZSBmcm9tICdlc2FzdC9kaXN0L3ByaXZhdGUvdHVwbGUnXG5pbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgSnNHbG9iYWxzLCBLQXNzaWduLCBLRnVuLCBTcGVjaWFsS2V5d29yZHMgfSBmcm9tICcuL3ByaXZhdGUvTGFuZydcbmltcG9ydCBPcCwgeyBOb25lIH0gZnJvbSAnLi9wcml2YXRlL1UvT3AnXG5pbXBvcnQgeyBuZXdTZXQgfSBmcm9tICcuL3ByaXZhdGUvVS91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHByZXNzaW9uIHsgfVxuLy8gVGhlc2UgY2FuIG9ubHkgYXBwZWFyIGFzIGxpbmVzIGluIGEgQmxvY2suXG4vLyBOb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBHZW5lcmF0b3IgZXhwcmVzc2lvbnMgcmVzdWx0aW5nIGZyb20gYGRvYCBrZXl3b3JkLlxuZXhwb3J0IGNsYXNzIERvIGV4dGVuZHMgRXhwcmVzc2lvbiB7IH1cbi8vIFRoZXNlIGNhbiBhcHBlYXIgaW4gYW55IGV4cHJlc3Npb24uXG5leHBvcnQgY2xhc3MgVmFsIGV4dGVuZHMgRXhwcmVzc2lvbiB7IH1cblxuY29uc3QgbWFrZVR5cGUgPSBzdXBlclR5cGUgPT4gKG5hbWUsIC4uLm5hbWVzVHlwZXMpID0+XG5cdHR1cGxlKG5hbWUsIHN1cGVyVHlwZSwgJ2RvYycsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSlcbmNvbnN0XG5cdGVlID0gbWFrZVR5cGUoRXhwcmVzc2lvbiksIGVkID0gbWFrZVR5cGUoRG8pLCBldiA9IG1ha2VUeXBlKFZhbClcblxuLy8gVE9ETzogR2V0IHJpZCBvZiBudWxsXG5jb25zdCBLU3BlY2lhbCA9IG5ld1NldChTcGVjaWFsS2V5d29yZHMsIFsgJ2NvbnRhaW5zJywgJ2RlYnVnZ2VyJywgJ3N1YicsICdudWxsJyBdKVxuXG5leHBvcnQgY29uc3Rcblx0RGVidWcgPSBlZCgnRGVidWcnLCAnbGluZXMnLCBbRXhwcmVzc2lvbl0pLFxuXHRCbG9ja0RvID0gZWQoJ0Jsb2NrRG8nLCAnbGluZXMnLCBbRXhwcmVzc2lvbl0pLFxuXHRCbG9ja1ZhbCA9IGVkKCdCbG9ja1ZhbCcsICdsaW5lcycsIFtFeHByZXNzaW9uXSwgJ3JldHVybmVkJywgVmFsKSxcblx0TW9kdWxlRGVmYXVsdEV4cG9ydCA9IGVkKCdNb2R1bGVEZWZhdWx0RXhwb3J0JywgJ3ZhbHVlJywgVmFsKSxcblx0TG9jYWxEZWNsYXJlID0gT2JqZWN0LmFzc2lnbihcblx0XHRlZSgnTG9jYWxEZWNsYXJlJyxcblx0XHRcdCduYW1lJywgU3RyaW5nLCAnb3BUeXBlJywgT3AoVmFsKSwgJ2lzTGF6eScsIEJvb2xlYW4sICdva1RvTm90VXNlJywgQm9vbGVhbiksXG5cdFx0e1xuXHRcdFx0Zm9jdXM6IGxvYyA9PiBMb2NhbERlY2xhcmUobG9jLCAnXycsIE5vbmUsIGZhbHNlLCBmYWxzZSksXG5cdFx0XHRyZXM6IChsb2MsIG9wVHlwZSkgPT4gTG9jYWxEZWNsYXJlKGxvYywgJ3JlcycsIG9wVHlwZSwgZmFsc2UsIHRydWUpXG5cdFx0fSksXG5cdEFzc2lnbiA9IE9iamVjdC5hc3NpZ24oXG5cdFx0ZWQoJ0Fzc2lnbicsICdhc3NpZ25lZScsIExvY2FsRGVjbGFyZSwgJ2snLCBLQXNzaWduLCAndmFsdWUnLCBWYWwpLFxuXHRcdHsgZm9jdXM6IChsb2MsIHZhbHVlKSA9PiBBc3NpZ24obG9jLCBMb2NhbERlY2xhcmUuZm9jdXMobG9jKSwgJz0nLCB2YWx1ZSkgfSksXG5cdEFzc2lnbkRlc3RydWN0dXJlID0gZWQoJ0Fzc2lnbkRlc3RydWN0dXJlJyxcblx0XHQnYXNzaWduZWVzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0J2snLCBLQXNzaWduLFxuXHRcdCd2YWx1ZScsIFZhbCxcblx0XHQnaXNMYXp5JywgQm9vbGVhbiksXG5cdExvY2FsQWNjZXNzID0gT2JqZWN0LmFzc2lnbihcblx0XHRldignTG9jYWxBY2Nlc3MnLCAnbmFtZScsIFN0cmluZyksXG5cdFx0eyBmb2N1czogbG9jID0+IExvY2FsQWNjZXNzKGxvYywgJ18nKSB9KSxcblx0R2xvYmFsQWNjZXNzID0gT2JqZWN0LmFzc2lnbihcblx0XHRldignR2xvYmFsQWNjZXNzJywgJ25hbWUnLCBKc0dsb2JhbHMpLFxuXHRcdHtcblx0XHRcdG51bGw6IGxvYyA9PiBHbG9iYWxBY2Nlc3MobG9jLCAnbnVsbCcpLFxuXHRcdFx0dHJ1ZTogbG9jID0+IEdsb2JhbEFjY2Vzcyhsb2MsICd0cnVlJylcblx0XHR9KSxcblx0Ly8gTW9kdWxlXG5cdFVzZURvID0gZWUoJ1VzZURvJywgJ3BhdGgnLCBTdHJpbmcpLFxuXHRVc2UgPSBlZSgnVXNlJywgJ3BhdGgnLCBTdHJpbmcsICd1c2VkJywgW0xvY2FsRGVjbGFyZV0sICdvcFVzZURlZmF1bHQnLCBPcChMb2NhbERlY2xhcmUpKSxcblx0Ly8gYGJsb2NrYCB3aWxsIGNvbnRhaW4gTW9kdWxlRXhwb3J0IGFuZCBNb2R1bGVEZWZhdWx0RXhwb3J0X3Ncblx0Ly8gVE9ETzogQmxvY2tWYWwgYW5kIGRvbid0IGhhdmUgYGV4cG9ydHNgIG9iamVjdFxuXHRNb2R1bGUgPSBlZSgnTW9kdWxlJywgJ2RvVXNlcycsIFtVc2VEb10sICd1c2VzJywgW1VzZV0sICdkZWJ1Z1VzZXMnLCBbVXNlXSwgJ2Jsb2NrJywgQmxvY2tEbyksXG5cblx0Ly8gRGF0YVxuXHQvLyBUT0RPOiBEb24ndCBzdG9yZSBpbmRleCBoZXJlLCBkbyBpdCBpbiBWclxuXHRMaXN0RW50cnkgPSBlZCgnTGlzdEVudHJ5JywgJ3ZhbHVlJywgVmFsLCAnaW5kZXgnLCBOdW1iZXIpLFxuXHQvLyBUT0RPOiBEb24ndCBzdG9yZSBsZW5ndGggaGVyZSwgZG8gaXQgaW4gVnJcblx0TGlzdFJldHVybiA9IGV2KCdMaXN0UmV0dXJuJywgJ2xlbmd0aCcsIE51bWJlciksXG5cdExpc3RTaW1wbGUgPSBldignTGlzdFNpbXBsZScsICdwYXJ0cycsIFtWYWxdKSxcblxuXHQvLyBUT0RPOiBEb24ndCBzdG9yZSBpbmRleCBoZXJlLCBkbyBpdCBpbiBWclxuXHRNYXBFbnRyeSA9IGVkKCdNYXBFbnRyeScsICdrZXknLCBWYWwsICd2YWwnLCBWYWwsICdpbmRleCcsIE51bWJlciksXG5cdC8vIFRPRE86IERvbid0IHN0b3JlIGxlbmd0aCBoZXJlLCBkbyBpdCBpbiBWclxuXHRNYXBSZXR1cm4gPSBldignTWFwUmV0dXJuJywgJ2xlbmd0aCcsIE51bWJlciksXG5cdE9ialJldHVybiA9IGV2KCdPYmpSZXR1cm4nLFxuXHRcdCdrZXlzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0J2RlYnVnS2V5cycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdCdvcE9iamVkJywgT3AoVmFsKSxcblx0XHQnb3BEaXNwbGF5TmFtZScsIE9wKFN0cmluZykpLFxuXHQvLyBrZXlzVmFsczogdmFsdWVzIGFyZSBWYWxzXG5cdE9ialNpbXBsZSA9IGV2KCdPYmpTaW1wbGUnLCAna2V5c1ZhbHMnLCBPYmplY3QpLFxuXG5cdC8vIENhc2Vcblx0Q2FzZURvUGFydCA9IGVlKCdDYXNlRG9QYXJ0JywgJ3Rlc3QnLCBWYWwsICdyZXN1bHQnLCBCbG9ja0RvKSxcblx0Q2FzZVZhbFBhcnQgPSBlZSgnQ2FzZVZhbFBhcnQnLCAndGVzdCcsIFZhbCwgJ3Jlc3VsdCcsIEJsb2NrVmFsKSxcblx0Q2FzZURvID0gZWQoJ0Nhc2VEbycsICdvcENhc2VkJywgT3AoQXNzaWduKSwgJ3BhcnRzJywgW0Nhc2VEb1BhcnRdLCAnb3BFbHNlJywgT3AoQmxvY2tEbykpLFxuXHQvLyBVbmxpa2UgQ2FzZURvLCB0aGlzIGhhcyBgcmV0dXJuYCBzdGF0ZW1lbnRzLlxuXHRDYXNlVmFsID0gZXYoJ0Nhc2VWYWwnLCAnb3BDYXNlZCcsIE9wKEFzc2lnbiksICdwYXJ0cycsIFtDYXNlVmFsUGFydF0sICdvcEVsc2UnLCBPcChCbG9ja1ZhbCkpLFxuXG5cdC8vIFN0YXRlbWVudHNcblx0TG9vcCA9IGVkKCdMb29wJywgJ2Jsb2NrJywgQmxvY2tEbyksXG5cdEVuZExvb3AgPSBlZCgnRW5kTG9vcCcpLFxuXG5cdC8vIEdlbmVyYXRvcnNcblx0WWllbGQgPSBldignWWllbGQnLCAneWllbGRlZCcsIFZhbCksXG5cdFlpZWxkVG8gPSBldignWWllbGRUbycsICd5aWVsZGVkVG8nLCBWYWwpLFxuXG5cdC8vIEV4cHJlc3Npb25zXG5cdENhbGwgPSBPYmplY3QuYXNzaWduKFxuXHRcdGV2KCdDYWxsJywgJ2NhbGxlZCcsIFZhbCwgJ2FyZ3MnLCBbVmFsXSksXG5cdFx0e1xuXHRcdFx0Y29udGFpbnM6IChsb2MsIHRlc3RUeXBlLCB0ZXN0ZWQpID0+XG5cdFx0XHRcdENhbGwobG9jLCBTcGVjaWFsLmNvbnRhaW5zKGxvYyksIFsgdGVzdFR5cGUsIHRlc3RlZCBdKSxcblx0XHRcdHN1YjogKGxvYywgYXJncykgPT4gQ2FsbChsb2MsIFNwZWNpYWwuc3ViKGxvYyksIGFyZ3MpXG5cdFx0fSksXG5cdC8vIE9ubHkgZm9yIHVzZSBpbiBhIENhbGxcblx0U3BsYXQgPSBldignU3BsYXQnLCAnc3BsYXR0ZWQnLCBWYWwpLFxuXG5cdEJsb2NrV3JhcCA9IGV2KCdCbG9ja1dyYXAnLCAnYmxvY2snLCBCbG9ja1ZhbCksXG5cblx0RnVuID0gZXYoJ0Z1bicsXG5cdFx0J2snLCBLRnVuLFxuXHRcdCdhcmdzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0J29wUmVzdEFyZycsIE9wKExvY2FsRGVjbGFyZSksXG5cdFx0Ly8gQmxvY2tEbyBvciBCbG9ja1ZhbFxuXHRcdCdibG9jaycsIEV4cHJlc3Npb24sXG5cdFx0J29wSW4nLCBPcChEZWJ1ZyksXG5cdFx0Ly8gSWYgbm9uLWVtcHR5LCBibG9jayBzaG91bGQgYmUgYSBCbG9ja1ZhbCwgYW5kIGVpdGhlciBpdCBoYXMgYSB0eXBlIG9yIG9wT3V0IGlzIG5vbi1lbXB0eS5cblx0XHQnb3BSZXNEZWNsYXJlJywgT3AoTG9jYWxEZWNsYXJlKSxcblx0XHQnb3BPdXQnLCBPcChEZWJ1ZykpLFxuXG5cdExhenkgPSBldignTGF6eScsICd2YWx1ZScsIFZhbCksXG5cdE51bWJlckxpdGVyYWwgPSBldignTnVtYmVyTGl0ZXJhbCcsICd2YWx1ZScsIE51bWJlciksXG5cdE1lbWJlciA9IGV2KCdNZW1iZXInLCAnb2JqZWN0JywgVmFsLCAnbmFtZScsIFN0cmluZyksXG5cdC8vIHBhcnRzIGFyZSBTdHJpbmdzIGludGVybGVhdmVkIHdpdGggVmFscy5cblx0UXVvdGUgPSBPYmplY3QuYXNzaWduKFxuXHRcdGV2KCdRdW90ZScsICdwYXJ0cycsIFtPYmplY3RdKSxcblx0XHR7XG5cdFx0XHRmb3JTdHJpbmcobG9jLCBzdHIpIHtcblx0XHRcdFx0cmV0dXJuIFF1b3RlKGxvYywgWyBzdHIgXSlcblx0XHRcdH1cblx0XHR9KSxcblxuXHRTcGVjaWFsID0gT2JqZWN0LmFzc2lnbihcblx0XHRldignU3BlY2lhbCcsICdrJywgS1NwZWNpYWwpLFxuXHRcdHtcblx0XHRcdGNvbnRhaW5zOiBsb2MgPT4gU3BlY2lhbChsb2MsICdjb250YWlucycpLFxuXHRcdFx0ZGVidWdnZXI6IGxvYyA9PiBTcGVjaWFsKGxvYywgJ2RlYnVnZ2VyJyksXG5cdFx0XHRzdWI6IGxvYyA9PiBTcGVjaWFsKGxvYywgJ3N1YicpXG5cdFx0fSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9