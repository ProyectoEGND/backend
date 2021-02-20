import { response } from 'express';
import Users from '../models/users';
import Producto from '../models/products';

export const getTienda = async (req, res) => {
	const foundPreference = await Users.find({ tienda: { $in: req.params.tienda } });
	await console.log(foundPreference.length);
	console.log('ok');
	if (foundPreference.length == 0) {
		res.status(404).json({ tienda: 'inexistente' });
	} else {
		res.status(200).json(foundPreference[0].preferencias);
	}
};

export const getProductos = async (req, res) => {
	const foundProducto = await Producto.find({ tienda: { $in: req.params.tienda } });
	await console.log(foundProducto);
	console.log('ok');
	res.status(200).json(foundProducto);
};
