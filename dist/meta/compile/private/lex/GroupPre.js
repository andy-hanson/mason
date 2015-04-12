if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/Loc", "../Lang", "../U/types"], function (exports, module, _esastDistLoc, _Lang, _UTypes) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var Loc = _interopRequire(_esastDistLoc);

  var GroupPres = _Lang.GroupPres;
  var tuple = _UTypes.tuple;
  module.exports = tuple(Object, "loc", Loc, "k", GroupPres);
});
//# sourceMappingURL=../../../../meta/compile/private/lex/GroupPre.js.map