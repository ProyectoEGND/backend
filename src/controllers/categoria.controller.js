import { response } from 'express';
import Users from '../models/users';
import Categoria from '../models/categoria';

export const getCategorias = async (req, res) => {
	try {
		const foundCategoria = await Categoria.find({ tienda: { $in: req.tienda }, estado: { $in: true } });
		await console.log(foundCategoria);
		res.status(200).json(foundCategoria);
	} catch (error) {
		res.status(500).json({ ventas: 'Error al recuperar ventas' });
	}
};

export const createCategoria = async (req, res) => {
	console.log('categoria', req.body);
	try {
		const foundUser = await Users.find({ tienda: { $in: req.tienda } });
		const { nombre, descripcion } = req.body;
		const newCategoria = new Categoria({
			tienda: req.tienda,
			nombre,
			descripcion,
			estado: true,
		});

		const savedVenta = await newCategoria.save();
		res.status(200).json({ mensaje: 'Categoria ingresada correctamente' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al ingresar la venta', error });
	}
};

export const updateCategoriaById = async (req, res) => {
	try {
		console.log('actualizar', req.body);
		const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.idCategoria, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'categoria actualizada' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
