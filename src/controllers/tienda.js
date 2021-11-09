import { response } from 'express';
import Users from '../models/users';
import Producto from '../models/products';
import Cupon from '../models/vales';

export const getTienda = async (req, res) => {
	let foundPreference = await Users.find({ tienda: { $in: req.params.tienda.toLowerCase() } });
	if (foundPreference.length == 0) {
		foundPreference = await Users.find({ tienda: { $in: req.params.tienda } });
	}
	if (foundPreference.length == 0 || foundPreference[0].estado === 'Inactivo') {
		res.status(404).json({ tienda: 'inexistente' });
	} else {
		let preferencias = foundPreference[0].preferencias;

		preferencias.estadoTienda = estadoCerrado(preferencias.horario);
		console.log('preferencias', preferencias.estadoTienda);

		res.status(200).json(preferencias);
	}
};

export const getProductos = async (req, res) => {
	const foundProducto = await Producto.find({ tienda: { $in: req.params.tienda } });
	if (foundProducto.length == 0) {
		foundProducto = await Producto.find({ tienda: { $in: req.params.tienda.toLowerCase() } });
	}
	const conStock = foundProducto.filter((producto) => producto.stock > 0 && producto.activo === true && producto.estado === true);
	res.status(200).json(conStock);
};

export const getCupon = async (req, res) => {
	const foundCupones = await Cupon.find({
		tienda: { $in: req.params.tienda },
		estado: { $in: true },
		nombre: { $in: req.body.cupon },
	});

	if (foundCupones.length > 0) {
		let descuento = foundCupones[0].descuento / 100;
		res.status(200).json({ descuento });
	} else {
		console.log('cuerpo');
		console.log(req.body);
		res.status(200).json({ descuento: 1 });
	}
};

const estadoCerrado = (dias) => {
	let horario = new Date();
	let dia = dias[horario.getDay()];
	let hora = horario.getHours();
	let estado;

	if (dia.apertura > hora && (dia.cierre < hora) & (dia.cierre < dia.apertura)) {
		estado = false;
	} else if ((dia.apertura > hora || dia.cierre < hora) && dia.cierre > dia.apertura) {
		estado = false;
	} else if (dia.apertura === dia.cierre) {
		estado = true;
	} else {
		estado = true;
	}

	console.log(dia, horario.getDay(), estado);

	return estado;
};
