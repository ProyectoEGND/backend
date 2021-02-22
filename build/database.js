"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://localhost/tiendaDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(db => console.log('conectado')).catch(error => console.log('error'));