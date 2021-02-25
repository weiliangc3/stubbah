"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _printReq = _interopRequireDefault(require("../utils/printReq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res) {
  (0, _printReq["default"])(req);
  res.status(404);
  res.send();
};

exports["default"] = _default;