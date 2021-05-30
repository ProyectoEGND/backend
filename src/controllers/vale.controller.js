import { response } from 'express';
import Users from '../models/users';
import Vale from '../models/vales';

export const getVales = async (req, res) => {
	try {
		const foundVale = await Vale.find({ tienda: { $in: req.tienda }, estado: { $in: true } });
		res.status(200).json(foundVale);
	} catch (error) {
		res.status(500).json({ Vale: 'Error al recuperar ventas' });
	}
};

export const createVale = async (req, res) => {
	try {
		const foundUser = await Users.find({ tienda: { $in: req.tienda } });
		const { nombre, descripcion } = req.body;
		const newVale = new Vale({
			tienda: req.tienda,
			nombre,
			descripcion,
			estado: true,
		});

		const savedVale = await newVale.save();
		res.status(200).json({ mensaje: 'Vale ingresada correctamente' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al ingresar la venta', error });
	}
};

export const updateValeById = async (req, res) => {
	try {
		const valeActualizado = await Vale.findByIdAndUpdate(req.params.idVale, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'Vale actualizado' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
