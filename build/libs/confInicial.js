"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRole = void 0;

var _roles = _interopRequireDefault(require("../models/roles"));

var _products = _interopRequireDefault(require("../models/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    console.log('llgo');
    var count = yield _roles.default.estimatedDocumentCount();
    console.log(count);

    try {
      if (count > 0) return;
      var values = yield Promise.all([new _roles.default({
        name: 'Vendedor'
      }).save(), new _roles.default({
        name: 'ReVendedor'
      }).save(), new _roles.default({
        name: 'Admin'
      }).save()]);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  });

  return function createRole() {
    return _ref.apply(this, arguments);
  };
}(); // export const createProduct = async () => {
// 	const count2 = await Producto.estimatedDocumentCount();
// 	console.log('cantidad de productos', count2);
// 	try {
// 		if (count2 > 0) return;
// 		const values = await Promise.all([
// 			new Producto({
// 				nombre: 'Batidora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Microprecesadora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Aspiradora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Limpieza',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Heladera',
// 				categoria: 'Refrigeracion',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['Tropical', '400L', 'Congelador'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 		]);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };


exports.createRole = createRole;