if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', 'esast/dist/mangle-identifier', '../../Expression', '../U/type'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _esastDistMangleIdentifier, _Expression, _UType) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.declare = declare;
	exports.declareSpecial = declareSpecial;

	var _mangleIdentifier = _interopRequire(_esastDistMangleIdentifier);

	var _type = _interopRequire(_UType);

	const declareToId = new WeakMap();
	const idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = _esastDistAst.Identifier(_mangleIdentifier(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	};

	exports.idForDeclareCached = idForDeclareCached;
	const idForDeclareNew = function (localDeclare) {
		return _esastDistAst.Identifier(idForDeclareCached(localDeclare).name);
	};

	exports.idForDeclareNew = idForDeclareNew;

	function declare(localDeclare, val) {
		_type(localDeclare, _Expression.LocalDeclare, val, Object);
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(idForDeclareCached(localDeclare), val)]);
	}

	function declareSpecial(name, val) {
		_type(name, String, val, Object);
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(_esastDistUtil.idCached(name), val)]);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/esast-util.js.map