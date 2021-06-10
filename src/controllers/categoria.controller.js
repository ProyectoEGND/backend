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

export const createCategoria = async (req, res) => {
	try {
		const foundUser = await Users.find({ tienda: { $in: req.tienda } });
		const { nombre } = req.body;
		const newCategoria = new Categoria({
			tienda: req.tienda,
			nombre,
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
		const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.idCategoria, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'categoria actualizada' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
