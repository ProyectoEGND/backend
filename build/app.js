"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _package = _interopRequireDefault(require("../package.json"));

var _products = _interopRequireDefault(require("./routes/products.routes"));

var _users = _interopRequireDefault(require("./routes/users.route"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _confInicial = require("./libs/confInicial");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _tienda = require("./controllers/tienda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
(0, _confInicial.createRole)(); // createProduct();

app.set('pkg', _package.default);
app.use((0, _morgan.default)('dev'));
app.use('/storage', _express.default.static('storage'));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use('/public', _express.default.static("".concat(__dirname, "/storage/imgs")));
app.get('/', (req, res) => {
  res.json({
    autor: _package.default.author,
    proyecto: _package.default.name,
    version: _package.default.version
  });
});
app.get('/:tienda', _tienda.getTienda);
app.get('/:tienda/productos', _tienda.getProductos);
app.use('/api/products', _products.default);
app.use('/api/auth', _auth.default);
app.use('/api/user', _users.default);
var _default = app;
exports.default = _default;