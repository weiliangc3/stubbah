"use strict";

var _server = _interopRequireDefault(require("./server"));

var _sample = _interopRequireDefault(require("../stubs/sample.json"));

var _providerStubs = require("./providerStubs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _server["default"];
(0, _providerStubs.loadPact)(_sample["default"], 'zoo');
(0, _providerStubs.addStateForProviderByRoute)('there is an alligator named Mary', 'zoo');
(0, _providerStubs.addStateForProviderByRoute)('there is an alligator named Garry', 'zoo');