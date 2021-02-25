"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increment = increment;
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
var count = 0;
router.use(function (req, res, next) {
  console.log('test called', req.url);
  next();
});
router.get('/count', function (req, res) {
  res.status(200);
  res.send("count is at ".concat(count));
});

function increment() {
  count += 1;
}

var _default = router;
exports["default"] = _default;