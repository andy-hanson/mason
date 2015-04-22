if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/util', 'esast/dist/specialize', 'esast/dist/mangle-identifier'], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _esastDistMangleIdentifier) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _mangleIdentifier = _interopRequire(_esastDistMangleIdentifier);

	const declareToId = new WeakMap();
	const idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = _esastDistAst.Identifier(_mangleIdentifier(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	},
	      idForDeclareNew = function (localDeclare) {
		return _esastDistAst.Identifier(idForDeclareCached(localDeclare).name);
	},
	      declare = function (localDeclare, val) {
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(idForDeclareCached(localDeclare), val)]);
	},
	      declareSpecial = function (name, val) {
		return _esastDistSpecialize.variableDeclarationConst([_esastDistAst.VariableDeclarator(_esastDistUtil.idCached(name), val)]);
	};
	exports.idForDeclareCached = idForDeclareCached;
	exports.idForDeclareNew = idForDeclareNew;
	exports.declare = declare;
	exports.declareSpecial = declareSpecial;
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/esast-util.js.map