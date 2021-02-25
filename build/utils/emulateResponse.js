"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(responseToEmulate, res) {
  return res.status(responseToEmulate.status).set(responseToEmulate.headers).send(responseToEmulate.body);
};

exports["default"] = _default;