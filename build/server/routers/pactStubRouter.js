"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _providerStubs = require("../../providerStubs");

var _emulateResponse = _interopRequireDefault(require("../../utils/emulateResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-prototype-builtins */
var router = (0, _express.Router)();
router.use(function (req, res, next) {
  console.log("Matching request: ".concat(req.method, " to ").concat(req.originalUrl));
  next();
});
router.get('*', function (req, res) {
  var URI = req.url;
  var root = URI.split(/\//)[1];
  var providerStubs = (0, _providerStubs.getProviderStubsByRoute)(root);

  if (providerStubs) {
    var pathRegex = new RegExp("".concat(root, "/(.+)"));
    var path = "/".concat(pathRegex.exec(URI)[1]);
    var providerInteractions = providerStubs.interactions;
    var providerActiveStates = providerStubs.activeStates;
    var matchingInteractions = providerInteractions.filter(function (interaction) {
      return interaction.request.path === path && interaction.request.method.toLowerCase() === req.method.toLowerCase() && providerActiveStates.includes(interaction.provider_state);
    });

    if (matchingInteractions.length > 0) {
      console.log("Provider interactions matched with ".concat(matchingInteractions.length, " pact(s)"));
      return (0, _emulateResponse["default"])(matchingInteractions[0].response, res);
    }
  }

  console.log("Request unmatched: ".concat(req.method, " to ").concat(req.originalUrl));
  return res.status(404).send('No matched stubs');
});
var _default = router;
exports["default"] = _default;