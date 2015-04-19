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
	      ELiteral = ev('Literal', 'value', String, 'k', _privateUUtil.newSet([Number, String, 'js'])),
	      Member = ev('Member', 'object', Val, 'name', String),
	      Quote = ev('Quote', 'parts', [Val]),
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
	exports.ELiteral = ELiteral;
	exports.Member = Member;
	exports.Quote = Quote;
	exports.Special = Special;
});
//# sourceMappingURL=../../meta/compile/Expression.js.map