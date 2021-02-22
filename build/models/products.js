"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var productoSchema = new _mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  tienda: String,
  nombre: {
    type: String,
    required: true
  },
  categoria: String,
  subcategoria: String,
  marca: String,
  descripcion: [{
    type: String
  }],
  stockInicial: Number,
  stock: Number,
  descuento: Number,
  Composicion: {
    type: Boolean,
    required: true
  },
  Componentes: String,
  variedades: [{
    type: String
  }],
  minVar: Number,
  maxVar: Number,
  precio: Number,
  imgUrl: String
}, {
  timestamps: true,
  versionKey: false
});

productoSchema.methods.setImg = function setImg(filename) {
  this.imgUrl = "http://186.122.145.218:4000/public/".concat(filename);
};

var _default = (0, _mongoose.model)('Producto', productoSchema);

exports.default = _default;