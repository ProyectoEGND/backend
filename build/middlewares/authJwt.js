"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    console.log(req.headers['x-access-token']);

    try {
      console.log('entro');
      var token = req.headers['x-access-token'];
      if (!token) return res.status(403).json({
        message: 'enviar token'
      });

      var decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      var user = yield _users.default.findById(decoded.id, {
        password: 0
      });
      req.userId = user._id;
      req.tienda = user.tienda;
      if (!user) return res.status(404).json({
        message: 'usuario no encontrado',
        preferencias: null
      });
      next();
    } catch (error) {
      res.status(401).json({
        message: 'acceso no autorizado'
      });
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;