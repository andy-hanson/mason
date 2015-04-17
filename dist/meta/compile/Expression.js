if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', './private/Lang', './private/U/Op', './private/U/types', './private/U/util'], function (exports, _esastDistLoc, _privateLang, _privateUOp, _privateUTypes, _privateUUtil) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _slice = Array.prototype.slice;

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

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

	// TODO:ES6 splat
	const ee = function () {
		return _privateUTypes.tuple.apply(undefined, [Expression, 'loc', _Loc].concat(_slice.call(arguments)));
	};
	const ed = function () {
		return _privateUTypes.tuple.apply(undefined, [Do, 'loc', _Loc].concat(_slice.call(arguments)));
	};
	const ev = function () {
		return _privateUTypes.tuple.apply(undefined, [Val, 'loc', _Loc].concat(_slice.call(arguments)));
	};

	// TODO: Get rid of null
	const KSpecial = _privateUUtil.setUnion(_privateLang.SpecialKeywords, ['contains', 'debugger', 'sub', 'null']);

	const Debug = ed('lines', [Expression]),
	      BlockDo = ed('lines', [Expression]),
	      BlockVal = ed('lines', [Expression], 'returned', Val),
	      ModuleDefaultExport = ed('value', Val),
	      LocalDeclare = Object.assign(ee('name', String, 'opType', _Op(Val), 'isLazy', Boolean, 'okToNotUse', Boolean), {
		focus: function (loc) {
			return LocalDeclare(loc, '_', _privateUOp.None, false, false);
		},
		res: function (loc, opType) {
			return LocalDeclare(loc, 'res', opType, false, true);
		}
	}),
	      Assign = Object.assign(ed('assignee', LocalDeclare, 'k', _privateLang.KAssign, 'value', Val), { focus: function (loc, value) {
			return Assign(loc, LocalDeclare.focus(loc), '=', value);
		} }),
	      AssignDestructure = ed('assignees', [LocalDeclare], 'k', _privateLang.KAssign, 'value', Val, 'isLazy', Boolean),
	      LocalAccess = Object.assign(ev('name', String), { focus: function (loc) {
			return LocalAccess(loc, '_');
		} }),
	      GlobalAccess = Object.assign(ev('name', _privateLang.JsGlobals), {
		null: function (loc) {
			return GlobalAccess(loc, 'null');
		},
		true: function (loc) {
			return GlobalAccess(loc, 'true');
		}
	}),
	     
	// Module
	UseDo = ee('path', String),
	      Use = ee('path', String, 'used', [LocalDeclare], 'opUseDefault', _Op(LocalDeclare)),
	     
	// `block` will contain ModuleExport and ModuleDefaultExport_s
	// TODO: BlockVal and don't have `exports` object
	Module = ee('doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'block', BlockDo),
	     

	// Data
	// TODO: Don't store index here, do it in Vr
	ListEntry = ed('value', Val, 'index', Number),
	     
	// TODO: Don't store length here, do it in Vr
	ListReturn = ev('length', Number),
	      ListSimple = ev('parts', [Val]),
	     

	// TODO: Don't store index here, do it in Vr
	MapEntry = ed('key', Val, 'val', Val, 'index', Number),
	     
	// TODO: Don't store length here, do it in Vr
	MapReturn = ev('length', Number),
	      ObjReturn = ev('keys', [LocalDeclare], 'debugKeys', [LocalDeclare], 'opObjed', _Op(Val), 'opDisplayName', _Op(String)),
	     
	// keysVals: values are Vals
	ObjSimple = ev('keysVals', Object),
	     

	// Case
	CaseDoPart = ee('test', Val, 'result', BlockDo),
	      CaseValPart = ee('test', Val, 'result', BlockVal),
	      CaseDo = ed('opCased', _Op(Assign), 'parts', [CaseDoPart], 'opElse', _Op(BlockDo)),
	     
	// Unlike CaseDo, this has `return` statements.
	CaseVal = ev('opCased', _Op(Assign), 'parts', [CaseValPart], 'opElse', _Op(BlockVal)),
	     

	// Statements
	Loop = ed('block', BlockDo),
	      EndLoop = ed(),
	     

	// Generators
	Yield = ev('yielded', Val),
	      YieldTo = ev('yieldedTo', Val),
	     

	// Expressions
	Call = Object.assign(ev('called', Val, 'args', [Val]), {
		contains: function (loc, testType, tested) {
			return Call(loc, Special.contains(loc), [testType, tested]);
		},
		sub: function (loc, args) {
			return Call(loc, Special.sub(loc), args);
		}
	}),
	     
	// Only for use in a Call
	Splat = ev('splatted', Val),
	      BlockWrap = ev('block', BlockVal),
	      Fun = ev('k', _privateLang.KFun, 'args', [LocalDeclare], 'opRestArg', _Op(LocalDeclare),
	// BlockDo or BlockVal
	'block', Expression, 'opIn', _Op(Debug),
	// If non-empty, block should be a BlockVal, and either it has a type or opOut is non-empty.
	'opResDeclare', _Op(LocalDeclare), 'opOut', _Op(Debug)),
	      Lazy = ev('value', Val),
	      ELiteral = ev('value', String, 'k', new Set([Number, String, 'js'])),
	      Member = ev('object', Val, 'name', String),
	      Quote = ev('parts', [Val]),
	      Special = Object.assign(ev('k', KSpecial), {
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
	exports.ELiteral = ELiteral;
	exports.Member = Member;
	exports.Quote = Quote;
	exports.Special = Special;
});
//# sourceMappingURL=../../meta/compile/Expression.js.map