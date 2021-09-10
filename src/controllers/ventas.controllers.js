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
	const { montoTotal,montoProductos, mensaje, productos, moneda, montoExtra, montoDelivery,descuento } = req.body;
	console.log(req.body);
	// let productosId = [];
	const mercadoP = foundUser[0].mercadoPago;
	const stripe = foundUser[0].stripe;
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
		stripe:'',
		mensaje,
	});
	if (mercadoP.activo === true) {
		let aux = await pagos(mercadoP.accessToken, productos);
		console.log('mp', aux);
		newVenta.mercadoPago = aux;
	}

	let total=0;
	productos.map(producto=>total=total+producto.precio*producto.cantidad)

	if (stripe.activo === true) {
		let urlStripe = await pagosStripe((montoTotal),stripe.accessToken,moneda);
		console.log('stripe', urlStripe);
		newVenta.stripe = urlStripe;
	}

	const estado = await modificarStock(productos, req.params.tienda);

	console.log(estado);

	const savedVenta = await newVenta.save();
	res.status(200).json({ mensaje: 'Venta ingresada correctamente', mp: savedVenta.mercadoPago,sp:savedVenta.stripe });
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

			modificarStock(producto.variedades, tienda);

			return { stock, operaciones, productoActualizado };
		})
	);

	console.log(asyncRes);

	return operacionesG;
};

const pagos = async (access_token, productos) => {
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


const pagosStripe=async (monto,privateKey,moneda) => {
	const monedaOpciones = [
		{ moneda: 'PESO ARS - ARGENTINA', simbolo: '$',currency:"ars" },
		{ moneda: 'DOLAR', simbolo: 'US$',currency:'usd'},
		{ moneda: 'Euro', simbolo: '€',currency:'eur'},
		{ moneda: 'PESO CLP - CHILE', simbolo: '$',currency:'clp'},
		{ moneda: 'SOL - PERU', simbolo: 'S/.',currency:'pen'},
		{ moneda: 'SUCRE - ECUADOR', simbolo: 'S/.',currency:'cop'},
		{ moneda: 'PESO COP - COLOMBIA', simbolo: '$',currency:'cop'},
		{ moneda: 'PESO UYU - URUGUAY', simbolo: '$',currency:'uyu'},
		{ moneda: 'GUARANI - PARAGUAY', simbolo: '₲',currency:'pyg'},
		{ moneda: 'BOLIVIANO - BOLIVIA', simbolo: 'Bs',currency:'bob'},
		{ moneda: 'PESO MXN - MEXICO', simbolo: '$',currency:'mxn'},
		{ moneda: 'COLON - COSTA RICA', simbolo: '₡',currency:'crc'},
		{ moneda: 'BALBOA - PANAMA', simbolo: 'B/.',currency:'pab'}
	]

	let diviza=monedaOpciones.filter(monedaOpcion => monedaOpcion.moneda === moneda)
	diviza=diviza[0];
		const stripe = require('stripe')(privateKey);
		const session = await stripe.checkout.sessions.create({				
		  line_items: [{
			price_data: {
			  currency: diviza.currency,
			  product_data: {
				name: 'Compra realizada',
			  },
			  unit_amount: monto * 100,
			},
			quantity: 1,
		  }],
		  payment_method_types: [
			'card',
		  ],
		  success_url: `http://18.218.25.115:3000/checkout?success=true`,
    	  cancel_url: `http://18.218.25.115:3000/checkout?canceled=true`,
		  mode: 'payment'
		});
		 return session.url;
	  };

	