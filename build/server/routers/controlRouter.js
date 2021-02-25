"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _counterRouter = require("./counterRouter");

var router = (0, _express.Router)();
router.use(function (req, res, next) {
  console.log('control called', req.url);
  next();
});
router.get('/increment', function (req, res) {
  (0, _counterRouter.increment)();
  res.status(200);
  res.send();
});
var _default = router;
exports["default"] = _default;