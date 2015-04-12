if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "esast/dist/ast", "esast/dist/util", "esast/dist/specialize", "esast/dist/mangle-identifier", "../../Expression", "../U/type"], function (exports, _esastDistAst, _esastDistUtil, _esastDistSpecialize, _esastDistMangleIdentifier, _Expression, _UType) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	exports.declare = declare;
	exports.declareSpecial = declareSpecial;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Identifier = _esastDistAst.Identifier;
	var VariableDeclarator = _esastDistAst.VariableDeclarator;
	var idCached = _esastDistUtil.idCached;
	var variableDeclarationConst = _esastDistSpecialize.variableDeclarationConst;

	var mangleIdentifier = _interopRequire(_esastDistMangleIdentifier);

	var LocalDeclare = _Expression.LocalDeclare;

	var type = _interopRequire(_UType);

	const declareToId = new WeakMap();
	const idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	};

	exports.idForDeclareCached = idForDeclareCached;
	const idForDeclareNew = function (localDeclare) {
		return Identifier(idForDeclareCached(localDeclare).name);
	};

	exports.idForDeclareNew = idForDeclareNew;

	function declare(localDeclare, val) {
		type(localDeclare, LocalDeclare, val, Object);
		return variableDeclarationConst([VariableDeclarator(idForDeclareCached(localDeclare), val)]);
	}

	function declareSpecial(name, val) {
		type(name, String, val, Object);
		return variableDeclarationConst([VariableDeclarator(idCached(name), val)]);
	}
});
//# sourceMappingURL=../../../../meta/compile/private/transpile/esast-util.js.map