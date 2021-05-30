import { response } from 'express';
import Users from '../models/users';
import Producto from '../models/products';

export const getTienda = async (req, res) => {
	const foundPreference = await Users.find({ tienda: { $in: req.params.tienda } });

	if (foundPreference.length == 0) {
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
	const conStock = foundProducto.filter((producto) => producto.stock > 0);
	res.status(200).json(conStock);
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
