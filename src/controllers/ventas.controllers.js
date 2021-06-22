import { response } from 'express';
import Ventas from '../models/venta';
import Users from '../models/users';
import users from '../models/users';
import Operaciones from '../models/operacion';
import Producto from '../models/products';

const mercadopago = require('mercadopago');

export const getVenta = async (req, res) => {
	try {
		const venta = await Ventas.findById(req.params.ventaId).populate('productos');

		if (venta.length == 0) {
			res.status(404).json({ Venta: 'inexistente' });
		} else {
			res.status(200).json({ venta: venta[0] });
		}
	} catch (error) {
		res.status(500).json({ venta: 'Error al recuperar venta' });
	}
};

export const getVentas = async (req, res) => {
	try {
		const foundVenta = await Ventas.find({ tienda: { $in: req.tienda } }).populate('productos');
		await console.log(foundVenta);
		console.log('ok');
		res.status(200).json(foundVenta);
	} catch (error) {
		res.status(500).json({ ventas: 'Error al recuperar ventas' });
	}
};

export const createVenta = async (req, res) => {
	// try {
	const foundUser = await Users.find({ tienda: { $in: req.params.tienda } });
	const { montoProductos, mensaje, productos, moneda, montoExtra, montoDelivery } = req.body;
	console.log(req.body);
	// let productosId = [];
	const mercadoP = foundUser[0].mercadoPago;
	// console.log(mercadoP);
	// productos.map((producto) => productosId.push(producto.id));
	const newVenta = new Ventas({
		idTienda: foundUser[0]._id,
		tienda: req.params.tienda,
		moneda,
		descuento: req.body.descuento === 1 ? 0 : req.body.descuento,
		montoProductos,
		montoExtra,
		montoDelivery,
		productos,
		estado: 'Pendiente',
		mercadoPago: '',
		mensaje,
	});
	if (mercadoP.activo === true) {
		let aux = await pagos(mercadoP.accessToken, productos);
		console.log('mp', aux);
		newVenta.mercadoPago = aux;
	}

	const estado = await modificarStock(productos, req.params.tienda);

	console.log(estado);

	const savedVenta = await newVenta.save();
	res.status(200).json({ mensaje: 'Venta ingresada correctamente', mp: savedVenta.mercadoPago });
	// } catch (error) {
	// 	res.status(500).json({ mensaje: 'Error al ingresar la venta', error });
	// }
};

const modificarStock = async (productos, tienda) => {
	let operacionesG = [];

	const asyncRes = await Promise.all(
		productos.map(async (producto) => {
			let findProducto = await Producto.findById(producto.id);

			const newOperacion = new Operaciones({
				tienda,
				tipo: 'Venta',
				cantidad: producto.cantidad,
				monto: producto.montoProductos,
			});

			const savedOperacion = await newOperacion.save();

			const stock = findProducto.stock - producto.cantidad;

			let operaciones = producto.operaciones ? [...producto.operaciones, savedOperacion] : [savedOperacion];

			const productoActualizado = await Producto.findByIdAndUpdate(
				producto.id,
				{ operaciones, stock },
				{
					new: true,
				}
			);

			return { stock, operaciones, productoActualizado };
		})
	);

	console.log(asyncRes);

	return operacionesG;
};

const pagos = async (access_token, productos) => {
	console.log('ingreso');
	mercadopago.configure({
		access_token,
	});
	let items = [];
	productos.map((producto) =>
		items.push({
			title: producto.nombre,
			unit_price: producto.precio,
			quantity: producto.cantidad,
		})
	);
	console.log(items);
	let preference = {
		items,
	};

	let resultado = await mercadopago.preferences
		.create(preference)
		.then(function (response) {
			return response.body.sandbox_init_point;
		})
		.catch(function (error) {
			console.log(error);
		});
	return resultado;
};
