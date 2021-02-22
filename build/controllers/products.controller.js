"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getProducts = exports.createProductM = exports.createProduct = void 0;

var _products = _interopRequireDefault(require("../models/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var {
      sku,
      nombre,
      categoria,
      precio,
      Composicion,
      Componentes,
      subcategoria,
      marca,
      descripcion,
      stock,
      stockInicial,
      descuento,
      variedades,
      minVar,
      maxVar,
      imgUrl
    } = req.body;
    var newProducto = (0, _products.default)({
      sku,
      nombre,
      categoria,
      Composicion,
      Componentes,
      subcategoria,
      marca,
      descripcion: JSON.parse(descripcion),
      stock,
      tienda: req.tienda,
      stockInicial,
      descuento,
      variedades: JSON.parse(variedades),
      minVar,
      maxVar,
      precio,
      imgUrl
    });

    if (req.file) {
      var {
        filename
      } = req.file;
      console.log(filename);
      newProducto.setImg(filename);
    }

    var productSave = yield newProducto.save();
    res.status(201).json(productSave);
  });

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProduct = createProduct;

var createProductM = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var {
      sku,
      nombre,
      categoria,
      precio,
      subcategoria,
      marca,
      descripcion,
      stock,
      Composicion,
      Componentes,
      stockInicial,
      descuento,
      variedades,
      minVar,
      maxVar,
      imgUrl
    } = req.body;
    var newProducto = (0, _products.default)({
      sku,
      nombre,
      categoria,
      tienda: req.tienda,
      precio,
      subcategoria,
      marca,
      Composicion,
      Componentes,
      stock,
      stockInicial,
      descuento,
      variedades,
      minVar,
      maxVar,
      imgUrl,
      descripcion
    });
    var productSave = yield newProducto.save();
    console.log(req.body);
    res.status(200).json(productSave);
  });

  return function createProductM(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createProductM = createProductM;

var getProducts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var products = yield _products.default.find();
    res.json(products);
  });

  return function getProducts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProducts = getProducts;

var getProductById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var producto = yield _products.default.findById(req.params.productId);
    res.status(200).json(producto);
  });

  return function getProductById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProductById = getProductById;

var updateProductById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var productoActualizado = yield _products.default.findByIdAndUpdate(req.params.productId, req.body, {
      new: true
    });
    res.status(200).json(productoActualizado);
  });

  return function updateProductById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var productoEliminado = yield _products.default.findByIdAndDelete(req.params.productId);
    res.status(204).json();
  });

  return function deleteProductById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteProductById = deleteProductById;