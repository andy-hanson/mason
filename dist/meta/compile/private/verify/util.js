if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const v = function (vx) {
    return function (e) {
      return e.verify(e, vx);
    };
  };
  exports.v = v;
  const vm = function (vx, es) {
    return es.forEach(v(vx));
  };
  exports.vm = vm;
});
//# sourceMappingURL=../../../../meta/compile/private/verify/util.js.map