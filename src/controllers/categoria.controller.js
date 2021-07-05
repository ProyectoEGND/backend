import { response } from 'express';
import Users from '../models/users';
import Categoria from '../models/categoria';

export const getCategorias = async (req, res) => {
	try {
		const foundCategoria = await Categoria.find({ tienda: { $in: req.tienda }, estado: { $in: true } });

		res.status(200).json(foundCategoria);
	} catch (error) {
		res.status(500).json({ ventas: 'Error al recuperar ventas' });
	}
};

export const publicGetCategorias = async (req, res) => {
	try {
		const foundCategoria = await Categoria.find({ tienda: { $in: req.params.idCategoria }, estado: { $in: true } });

		res.status(200).json(foundCategoria);
	} catch (error) {
		res.status(500).json({ ventas: 'Error al recuperar ventas' });
	}
};

export const createCategoria = async (req, res) => {
	try {
		const foundUser = await Users.find({ tienda: { $in: req.tienda } });
		const foundCategoria = await Categoria.find({ tienda: { $in: req.tienda } });
		const key = foundCategoria.length;
		const { nombre, orden } = req.body;
		const newCategoria = new Categoria({
			tienda: req.tienda,
			nombre,
			orden,
			estado: true,
			key: key ? key + 1 : 1,
		});

		const savedCategoria = await newCategoria.save();
		res.status(200).json(savedCategoria);
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al ingresar la venta', error });
	}
};

export const updateCategoriaById = async (req, res) => {
	try {
		const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.idCategoria, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'categoria actualizada' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
