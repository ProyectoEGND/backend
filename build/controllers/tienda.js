"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductos = exports.getTienda = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../models/users"));

var _products = _interopRequireDefault(require("../models/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getTienda = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var foundPreference = yield _users.default.find({
      tienda: {
        $in: req.params.tienda
      }
    });
    yield console.log(foundPreference.length);
    console.log('ok');

    if (foundPreference.length == 0) {
      res.status(404).json({
        tienda: 'inexistente'
      });
    } else {
      res.status(200).json(foundPreference[0].preferencias);
    }
  });

  return function getTienda(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTienda = getTienda;

var getProductos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var foundProducto = yield _products.default.find({
      tienda: {
        $in: req.params.tienda
      }
    });
    yield console.log(foundProducto);
    console.log('ok');
    res.status(200).json(foundProducto);
  });

  return function getProductos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProductos = getProductos;