if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', '../../Expression', '../Token', '../U/Bag', '../U/Op', '../U/type', './parseCase', './parseExpr', './parseLocalDeclares', './Px', './parseBlock'], function (exports, _Expression, _Token, _UBag, _UOp, _UType, _parseCase, _parseExpr, _parseLocalDeclares, _Px, _parseBlock) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	// Returns line or sq of lines
	exports.default = parseLine;
	exports.parseLineOrLines = parseLineOrLines;

	var _E = _interopRequire(_Expression);

	var _type = _interopRequire(_UType);

	var _parseExpr2 = _interopRequire(_parseExpr);

	var _parseLocalDeclares2 = _interopRequire(_parseLocalDeclares);

	var _Px2 = _interopRequire(_Px);

	function parseLine(px) {
		_type(px, _Px2);

		const h = px.tokens.head();
		const rest = px.tokens.tail();

		// We only deal with mutable expressions here, otherwise we fall back to parseExpr.
		if (h instanceof _Token.Keyword) switch (h.k) {
			case '. ':
				// Index is set by parseBlock.
				return _Expression.ListEntry(px.loc, px.w(rest, _parseExpr2), -1);
			case 'case!':
				return px.w(rest, _parseCase.parseCase, 'case!', false);
			case 'debug':
				return _Token.Group.isBlock(px.tokens.second()) ?
				// `debug`, then indented block
				_Expression.Debug(px.loc, _parseBlock.parseLinesFromBlock(px)) :
				// `debug`, then single line
				_Expression.Debug(px.loc, px.w(rest, parseLineOrLines));
			case 'debugger':
				px.checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return _Expression.Special.debugger(px.loc);
			case 'end-loop!':
				px.checkEmpty(rest, function () {
					return 'Did not expect anything after ' + h;
				});
				return _Expression.EndLoop(px.loc);
			case 'loop!':
				return _Expression.Loop(px.loc, px.w(rest, _parseBlock.justBlockDo));
			case 'region':
				return _parseBlock.parseLinesFromBlock(px);
			default:
			// fall through
		}

		return _UOp.ifElse(px.tokens.opSplitOnceWhere(_Token.Keyword.isLineSplit), function (_ref) {
			let before = _ref.before;
			let at = _ref.at;
			let after = _ref.after;

			return at.k === '->' ? parseMapEntry(px, before, after) : parseAssign(px, before, at, after);
		}, function () {
			return _parseExpr2(px);
		});
	}

	function parseLineOrLines(px) {
		const _ = parseLine(px);
		return _ instanceof Array ? _ : [_];
	}

	function parseAssign(px, assigned, assigner, value) {
		let locals = px.w(assigned, _parseLocalDeclares2);
		const k = assigner.k;
		const eValuePre = value.isEmpty() ? _Expression.GlobalAccess.true(px.loc) : px.w(value, _parseExpr2);

		let eValueNamed;
		if (locals.length === 1) {
			const name = _UBag.head(locals).name;
			if (name === 'doc') {
				if (eValuePre instanceof _Expression.Fun)
					// KLUDGE: `doc` for module can be a Fun signature.
					// TODO: Something better...
					eValuePre.args.forEach(function (arg) {
						arg.okToNotUse = true;
					});
				eValueNamed = eValuePre;
			} else eValueNamed = tryAddDisplayName(eValuePre, name);
		} else eValueNamed = eValuePre;

		const isYield = k === '<~' || k === '<~~';

		const eValue = valueFromAssign(eValueNamed, k);

		if (_UBag.isEmpty(locals)) {
			px.check(isYield, 'Assignment to nothing');
			return eValue;
		}

		if (isYield) locals.forEach(function (_) {
			return px.check(_.k !== 'lazy', _.loc, 'Can not yield to lazy variable.');
		});

		if (k === '. ') locals.forEach(function (l) {
			l.okToNotUse = true;
		});

		if (locals.length === 1) {
			const assign = _Expression.Assign(px.loc, locals[0], k, eValue);
			const isTest = assign.assignee.name.endsWith('test');
			return isTest && k === '. ' ? _Expression.Debug(px.loc, [assign]) : assign;
		} else {
			const isLazy = locals.some(function (l) {
				return l.isLazy;
			});
			if (isLazy) locals.forEach(function (_) {
				return px.check(_.isLazy, _.loc, 'If any part of destructuring assign is lazy, all must be.');
			});
			return _Expression.AssignDestructure(px.loc, locals, k, eValue, isLazy);
		}
	}

	function valueFromAssign(valuePre, kAssign) {
		switch (kAssign) {
			case '<~':
				return _Expression.Yield(valuePre.loc, valuePre);
			case '<~~':
				return _Expression.YieldTo(valuePre.loc, valuePre);
			default:
				return valuePre;
		}
	}

	// We give it a displayName if:
	// . It's a block
	// . It's a function
	// . It's one of those at the end of a block
	// . It's one of those as the end member of a call.
	function tryAddDisplayName(eValuePre, displayName) {
		_type(eValuePre, _E, displayName, String);
		switch (true) {
			case eValuePre instanceof _Expression.Call && eValuePre.args.length > 0:
				// TODO: Immutable
				eValuePre.args[eValuePre.args.length - 1] = tryAddDisplayName(_UBag.last(eValuePre.args), displayName);
				return eValuePre;

			case eValuePre instanceof _Expression.Fun:
				return _Expression.ObjReturn(eValuePre.loc, [], [], _UOp.some(eValuePre), _UOp.some(displayName));

			case eValuePre instanceof _Expression.ObjReturn && !eValuePre.keys.some(function (key) {
				return key.name === 'displayName';
			}):
				eValuePre.opDisplayName = _UOp.some(displayName);
				return eValuePre;

			case eValuePre instanceof _Expression.BlockWrap:
				{
					const block = eValuePre.block;
					block.returned = tryAddDisplayName(block.returned, displayName);
					return eValuePre;
				}

			default:
				return eValuePre;
		}
	}

	function parseMapEntry(px, before, after) {
		// TODO: index Filled in by ???
		return _Expression.MapEntry(px.loc, px.w(before, _parseExpr2), px.w(after, _parseExpr2), -1);
	}
});

// TODO:ES6
//# sourceMappingURL=../../../../meta/compile/private/parse/parseLine.js.map