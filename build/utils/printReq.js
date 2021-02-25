"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req) {
  console.log("".concat(req.method, " to ").concat(req.originalUrl));
};

exports["default"] = _default;