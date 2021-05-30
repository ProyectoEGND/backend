import { response } from 'express';
import Users from '../models/users';
import SubCategoria from '../models/subcategoria';

export const getSubCategorias = async (req, res) => {
	try {
		const foundSubCategoria = await SubCategoria.find({ tienda: { $in: req.tienda }, estado: { $in: true } });
		await console.log(foundSubCategoria);
		res.status(200).json(foundSubCategoria);
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al recuperar subcategorias' });
	}
};

export const createSubCategoria = async (req, res) => {
	try {
		const foundUser = await Users.find({ tienda: { $in: req.tienda } });
		const { nombre, descripcion } = req.body;
		const newSubCategoria = new SubCategoria({
			tienda: req.tienda,
			nombre,
			descripcion,
			estado: true,
		});

		const savedSubCategoria = await newSubCategoria.save();
		res.status(200).json({ mensaje: 'SubCategoria ingresada correctamente' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al ingresar subcategoria', error });
	}
};

export const updateSubCategoriaById = async (req, res) => {
	try {
		const subCategoriaActualizada = await SubCategoria.findByIdAndUpdate(req.params.idSubCategoria, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'SubCategoria actualizada' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
