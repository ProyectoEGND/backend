"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vencimiento = exports.topten = exports.revendedores = exports.pertenecen = exports.desactivar = exports.reasignarUserById = exports.deleteUserById = exports.updateUserByIdImg = exports.updateUserById2 = exports.updateUserById = exports.updateRedes = exports.updateCuerpoById = exports.updateFooterById = exports.updateModalById = exports.updateHeadById = exports.updateUserPreferenciasById = exports.getUserPreferenciasById = exports.getUserById = exports.getUsers = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var users = yield _users.default.find();
    res.json(users);
  });

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var user = yield _users.default.findById(req.params.userId);
    res.status(200).json(user);
  });

  return function getUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var getUserPreferenciasById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log(req.userId);
    var user = yield _users.default.findById(req.userId);
    res.status(200).json(user.preferencias);
  });

  return function getUserPreferenciasById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserPreferenciasById = getUserPreferenciasById;

var updateUserPreferenciasById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    if (req.files) {
      console.log(req.body);
      console.log(req.files);
    } // const user = await Users.findById(req.params.userId);


    res.status(200);
  });

  return function updateUserPreferenciasById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // actualizar cabecera de la tienda


exports.updateUserPreferenciasById = updateUserPreferenciasById;

var updateHeadById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    // console.log(req.body);
    // const { filename } = req.file;
    // console.log(filename);
    var user = yield _users.default.findById(req.userId);
    console.log(req.body.titulo);
    var preferencias = user.preferencias;
    preferencias.titulo = req.body.titulo;
    preferencias.fuenteH = req.body.fuenteH;
    preferencias.tColorH = req.body.tColorH;
    preferencias.fColorH = req.body.fColorH;
    preferencias.moneda = req.body.moneda;

    if (req.file) {
      var {
        filename
      } = req.file;
      console.log(filename);
      preferencias.logo = "http://186.122.145.218:4000/public/".concat(filename);
    }

    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, {
      preferencias: preferencias
    }, {
      new: true
    });
    console.log(preferencias);
    res.status(200).json(userActualizado);
  });

  return function updateHeadById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateHeadById = updateHeadById;

var updateModalById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    // console.log(req.body);
    // const { filename } = req.file;
    // console.log(filename);
    var user = yield _users.default.findById(req.userId);
    var preferencias = user.preferencias;
    preferencias.tmodal = req.body.tmodal;
    preferencias.modal = req.body.modal;

    if (req.file) {
      var {
        filename
      } = req.file;
      console.log(filename);
      preferencias.imodal = "http://186.122.145.218:4000/public/".concat(filename);
    }

    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, {
      preferencias: preferencias
    }, {
      new: true
    });
    console.log(preferencias);
    res.status(200).json(req.body);
  });

  return function updateModalById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateModalById = updateModalById;

var updateFooterById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    // console.log(req.body);
    // const { filename } = req.file;
    // console.log(filename);
    var user = yield _users.default.findById(req.userId);
    var preferencias = user.preferencias;
    var arraySuperior = [];
    preferencias.pie = req.body.pie;
    preferencias.fuenteF = req.body.fuenteF;
    preferencias.tColorF = req.body.tColorF;
    preferencias.fColorF = req.body.fColorF;
    preferencias.LinkExterno = req.body.LinkExterno;
    preferencias.GeoTienda = req.body.GeoTienda;
    preferencias.textlink = req.body.textlink;
    preferencias.terminosColor = req.body.terminosColor;

    if (req.files) {
      req.files.map(file => {
        var {
          filename
        } = file;
        arraySuperior.push("http://186.122.145.218:4000/public/".concat(filename));
      });
      preferencias.imagenesF = arraySuperior;
    }

    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, {
      preferencias: preferencias
    }, {
      new: true
    });
    console.log(preferencias);
    res.status(200).json(req.body);
  });

  return function updateFooterById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); // actualizar cuerpo de la tienda


exports.updateFooterById = updateFooterById;

var updateCuerpoById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var user = yield _users.default.findById(req.userId);
    var preferencias = user.preferencias;
    var arraySuperior = [];
    preferencias.fuenteC = req.body.fuenteC;
    preferencias.tColorC = req.body.tColorC;
    preferencias.fColorC = req.body.fColorC;
    preferencias.hoverColor = req.body.hoverColor;
    preferencias.selectColor = req.body.selectColor;

    if (req.files) {
      req.files.map(file => {
        var {
          filename
        } = file;
        arraySuperior.push("http://186.122.145.218:4000/public/".concat(filename));
      });
      preferencias.imagenesH = arraySuperior;
    }

    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, {
      preferencias: preferencias
    }, {
      new: true
    });
    console.log(preferencias);
    res.status(200).json(userActualizado);
  });

  return function updateCuerpoById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); // actualizar cuerpo de la tienda


exports.updateCuerpoById = updateCuerpoById;

var updateRedes = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    var user = yield _users.default.findById(req.userId);
    var preferencias = user.preferencias;
    preferencias.whatsapp = req.body.whatsapp;
    preferencias.youtube = req.body.youtube;
    preferencias.facebook = req.body.facebook;
    preferencias.instagram = req.body.instagram;
    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, {
      preferencias: preferencias
    }, {
      new: true
    });
    console.log(preferencias);
    res.status(200).json(userActualizado);
  });

  return function updateRedes(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updateRedes = updateRedes;

var updateUserById = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var userActualizado = yield _users.default.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    });
    console.log(userActualizado);
    res.status(200).json(userActualizado);
  });

  return function updateUserById(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var updateUserById2 = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var userActualizado = yield _users.default.findByIdAndUpdate(req.userId, req.body, {
      new: true
    });
    console.log(userActualizado);
    res.status(200).json(userActualizado);
  });

  return function updateUserById2(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.updateUserById2 = updateUserById2;

var updateUserByIdImg = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    var userActualizado = yield _users.default.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    });
    res.status(200).json(userActualizado);
  });

  return function updateUserByIdImg(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.updateUserByIdImg = updateUserByIdImg;

var deleteUserById = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(function* (req, res) {
    // const userEliminado = await Users.findByIdAndDelete(req.params.userId);
    var userEliminado = yield _users.default.deleteMany();
    res.status(204).json();
  });

  return function deleteUserById(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;

var reasignarUserById = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(function* (req, res) {
    var myquery = {
      padre: req.body.padre
    };
    var newvalues = {
      $set: {
        padre: req.body.nuevoPadre
      }
    };
    var usuarioActualizado = yield _users.default.updateMany(myquery, newvalues, {
      new: true
    });
    console.log(usuarioActualizado);
    res.status(204).json();
  });

  return function reasignarUserById(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.reasignarUserById = reasignarUserById;

var desactivar = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(function* (req, res) {
    var newvalues = {
      $set: {
        estado: 'Inactivo'
      }
    };
    var userActualizado = yield _users.default.findByIdAndUpdate(req.params.userId, newvalues, {
      new: true
    });
    res.status(204).json(userActualizado);
  });

  return function desactivar(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

exports.desactivar = desactivar;

var pertenecen = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(function* (req, res) {
    var userFound = yield _users.default.find({
      padre: req.body.padre
    }, function (err, user) {
      if (err) {
        res.send(err);
      }

      console.log(user);
      res.json(user);
    });
  });

  return function pertenecen(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

exports.pertenecen = pertenecen;

var revendedores = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(function* (req, res) {
    var userFound = yield _users.default.find({
      roles: '5fcb8124b424572820441a01'
    }, function (err, user) {
      if (err) {
        res.send(err);
      }

      console.log(user);
      res.json(user);
    });

    if (!userFound) {
      res.status(400).json({
        message: 'Sin vendedores asignados'
      });
    }

    _express.response.status(200).json(userFound);
  });

  return function revendedores(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

exports.revendedores = revendedores;

var topten = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(function* (req, res) {
    var users = yield _users.default.aggregate([{
      $group: {
        _id: '$padre',
        vendedores: {
          $sum: 1
        }
      }
    }]);
    users.sort(function (a, b) {
      if (a.vendedores < b.vendedores) {
        return 1;
      }

      if (a.vendedores > b.vendedores) {
        return -1;
      } // a must be equal to b


      return 0;
    });
    res.json(users);
  });

  return function topten(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

exports.topten = topten;

var vencimiento = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(function* (req, res) {
    var d = new Date();
    var vencimiento = yield _users.default.findOne({
      fecha: {
        $eq: d
      }
    }).exec((err, act) => {
      if (err) {
        console.log('hubo un error');
        return res.status(500).json({
          error: err.message
        }); //debes enviar una respuesta o llamar al manejador de errores (return next(err))
      }

      console.log(act);
      return res.status(200).json(act); // en este ejemplo se envía el resultado
    });
    res.json(users);
  });

  return function vencimiento(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();

exports.vencimiento = vencimiento;