"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.signUp = exports.signIn = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _roles = _interopRequireDefault(require("../models/roles"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var userFound = yield _users.default.findOne({
      email: req.body.email
    }).populate('roles');

    if (!userFound) {
      res.status(400).json({
        message: 'user not found'
      });
    }

    var matchPassword = yield _users.default.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({
      token: null,
      message: 'validar datos ingresados'
    });

    var token = _jsonwebtoken.default.sign({
      id: userFound._id
    }, _config.default.SECRET, {
      expiresIn: 86400
    });

    res.json({
      token
    });
  });

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var signUp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      username,
      email,
      tienda,
      cuit,
      celular,
      password,
      roles,
      nombre,
      estado,
      padre,
      redes,
      desarrollado
    } = req.body;
    var defaultValue = {
      desarrollado,
      fuenteH: 'Monserrat',
      fuenteC: 'Monserrat',
      fuenteF: 'Monserrat',
      hoverColor: '#ff00ff00',
      selectColor: '#ff00ff00',
      fColorH: '#ff0000ff',
      fColorC: '#000000ff',
      fColorF: '#ff0000ff',
      tColorH: '#ffffffff',
      tColorC: '#ffffffff',
      tColorF: '#ffffffff',
      titulo: 'Tienda de prueba',
      pie: 'Pie de prueba',
      moneda: 'PESO',
      imagenesH: [],
      imagenesC: [],
      imagenesF: [],
      modal: true,
      tmodal: 'texto de prueba',
      imodal: 'null',
      logo: 'http://186.122.145.218:4000/public/logo.jpg',
      whatsapp: '#',
      youtube: '#',
      facebook: '#',
      instagram: '#',
      LinkExterno: 'String',
      textlink: '',
      terminosColor: '#00ff00',
      GeoTienda: 'String',
      terminos: '{"blocks":[{"key":"1inev","text":"Ingrese sus terminos y condiciones","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    };
    console.log(_users.default.encryptPassword(password));
    console.log(password);
    var d = new Date();
    var newUser = new _users.default({
      username,
      email,
      tienda,
      cuit,
      nombre,
      celular,
      estado,
      padre,
      preferencias: defaultValue,
      redes,
      licencia: d.setDate(d.getDate() + 30),
      password: yield _users.default.encryptPassword(password)
    });

    if (padre) {
      newUser.padre = padre;
    } else {
      newUser.padre = 'Admin';
    }

    if (!estado) {
      newUser.estado = 'Activo';
    } else {
      newUser.estado = estado;
    }

    if (roles) {
      var foundRole = yield _roles.default.find({
        name: {
          $in: roles
        }
      });
      newUser.roles = foundRole.map(role => role._id);
    } else {
      var role = yield _roles.default.findOne({
        name: 'Vendedor'
      });
      newUser.roles = [role._id];
    }

    var savedUser = yield newUser.save();

    var token = _jsonwebtoken.default.sign({
      id: savedUser._id
    }, _config.default.SECRET, {
      expiresIn: 86400
    });

    console.log(savedUser);
    enviar(email).catch(console.error);
    res.json({
      token
    });
  });

  return function signUp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signUp = signUp;

function enviar(_x5) {
  return _enviar.apply(this, arguments);
}

function _enviar() {
  _enviar = _asyncToGenerator(function* (email) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    var transporter = _nodemailer.default.createTransport({
      host: 'smtp.hostinger.com.ar',
      port: 587,
      secure: false,
      // true for 465, false for other ports
      auth: {
        user: 'info@ventas-online.xyz',
        // generated ethereal user
        pass: 'Welcome01' // generated ethereal password

      }
    }); // send mail with defined transport object


    var info = yield transporter.sendMail({
      from: '"Fred Foo 👻" <info@ventas-online.xyz>',
      // sender address
      to: email,
      // list of receivers
      subject: 'Hello ✔',
      // Subject line
      text: 'Hello world?',
      // plain text body
      html: '<b>Hello world?</b>' // html body

    });
    console.log('Message sent: %s', info.messageId); // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account

    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(info)); // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  return _enviar.apply(this, arguments);
}

var verify = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      console.log(req.body);
      var token = req.body.token;
      if (!token) return res.status(403).json({
        message: 'enviar token'
      });

      var decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      var user = yield _users.default.findById(decoded.id, {
        password: 0
      });
      if (!user) return res.status(404).json({
        token: false
      });
      if (user) return res.status(200).json({
        token: true
      });
    } catch (error) {
      res.status(401).json({
        token: false,
        message: 'acceso no autorizado'
      });
    }
  });

  return function verify(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verify = verify;