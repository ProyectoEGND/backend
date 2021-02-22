"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var preferenciasSchema = new _mongoose.Schema({
  fuenteH: String,
  fuenteC: String,
  fuenteF: String,
  fColorH: String,
  fColorC: String,
  fColorF: String,
  tColorH: String,
  tColorC: String,
  tColorF: String,
  titulo: String,
  pie: String,
  moneda: String,
  imagenesH: [{
    type: String
  }],
  imagenesC: [{
    type: String
  }],
  imagenesF: [{
    type: String
  }],
  whatsapp: String,
  LinkExterno: String,
  GeoTienda: String,
  Variedades: [{
    String
  }],
  logo: {
    type: String
  }
});
var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  tienda: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  cuit: {
    type: String,
    required: true
  },
  celular: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  licencia: {
    type: Date,
    required: true
  },
  roles: [{
    ref: 'Role',
    type: _mongoose.Schema.Types.ObjectId
  }],
  padre: {
    type: String,
    requiered: true
  },
  estado: {
    type: String,
    required: true
  },
  // preferencias: [{ type: String, required: false }],
  // preferencias: preferenciasSchema,
  preferencias: {
    desarrollado: String,
    terminos: String,
    fuenteH: String,
    fuenteC: String,
    fuenteF: String,
    terminosColor: String,
    fColorH: String,
    fColorC: String,
    fColorF: String,
    tColorH: String,
    tColorC: String,
    tColorF: String,
    titulo: String,
    hoverColor: String,
    selectColor: String,
    pie: String,
    moneda: String,
    imagenesH: [{
      type: String
    }],
    imagenesC: [{
      type: String
    }],
    imagenesF: [{
      type: String
    }],
    logo: String,
    modal: Boolean,
    tmodal: String,
    imodal: String,
    whatsapp: String,
    youtube: String,
    facebook: String,
    instagram: String,
    LinkExterno: String,
    textlink: String,
    GeoTienda: String,
    Variedades: [{
      String
    }],
    logo: {
      type: String
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (password) {
    var salt = yield _bcryptjs.default.genSalt(10);
    return yield _bcryptjs.default.hash(password, salt);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.methods.setImgH = function setImgH(filename) {
  this.imgUrl = "http://186.122.145.218:4000/public/".concat(filename);
};

userSchema.methods.setImgC = function setImgC(filename) {
  this.imgUrl = "http://186.122.145.218:4000/public/".concat(filename);
};

userSchema.methods.setImgF = function setImgF(filename) {
  this.imgUrl = "http://186.122.145.218:4000/public/".concat(filename);
};

userSchema.statics.comparePassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (password, receivedPassword) {
    return yield _bcryptjs.default.compare(password, receivedPassword);
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.methods.setSup = function setImg(superior) {
  var imagenes = [];
  superior.map(sup => imagenes.push("http://186.122.145.218:4000/public/".concat(sup.filename)));
  console.log(superior); // this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};

var _default = (0, _mongoose.model)('User', userSchema);

exports.default = _default;