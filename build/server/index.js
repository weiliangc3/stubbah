"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

var _yargs = require("yargs");

var _controlRouter = _interopRequireDefault(require("./routers/controlRouter"));

var _counterRouter = _interopRequireDefault(require("./routers/counterRouter"));

var _pactStubRouter = _interopRequireDefault(require("./routers/pactStubRouter"));

var _fallbackHandler = _interopRequireDefault(require("./fallbackHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var httpsEnabled = _yargs.argv.https || false;
var portNumber = _yargs.argv.port || 3000;
app.use('/control', _controlRouter["default"]);
app.use('/counter', _counterRouter["default"]);
app.use('/pact-stub', _pactStubRouter["default"]);
app.use('*', _fallbackHandler["default"]);

if (httpsEnabled) {
  _https["default"].createServer({
    key: _fs["default"].readFileSync('./config/server.key'),
    cert: _fs["default"].readFileSync('./config/server.cert')
  }, app).listen(portNumber, function () {
    console.log("HTTPS Server started and listening on port ".concat(portNumber));
  });
} else {
  app.listen(portNumber, function () {
    console.log("HTTP Server started and listening on port ".concat(portNumber));
  });
}

var _default = app;
exports["default"] = _default;