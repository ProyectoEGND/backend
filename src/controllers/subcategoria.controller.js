import { response } from 'express';
import Users from '../models/users';
import SubCategoria from '../models/subcategoria';

export const getSubCategorias = async (req, res) => {
	try {
		const foundSubCategoria = await SubCategoria.find({ tienda: { $in: req.tienda }, estado: { $in: true } });

		res.status(200).json(foundSubCategoria);
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al recuperar subcategorias' });
	}
};

export const getSubCategoriaByCategoria = async (req, res) => {
	try {
		const foundSubCategoria = await SubCategoria.find({
			categoria: { $in: req.body.categoria },
			estado: { $in: true },
		});

		if (foundSubCategoria.length > 0) {
			res.status(200).json(foundSubCategoria);
		} else {
			res.status(200).json([]);
		}
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al recuperar subcategorias' });
	}
};

export const createSubCategoria = async (req, res) => {
	// try {
	const foundUser = await Users.find({ tienda: { $in: req.tienda } });
	const foundCategoria = await SubCategoria.find({ tienda: { $in: req.tienda } });
	// const foundSubCategoria = await SubCategoria.find({
	// 	categoria: { $in: req.body.categoria },
	// });
	const key = foundSubCategoria.length;
	const { nombre, categoria } = req.body;

	const newSubCategoria = new SubCategoria({
		tienda: req.tienda,
		nombre,
		key: key ? key + 1 : 1,
		categoria,
		estado: true,
	});

	const savedSubCategoria = await newSubCategoria.save();
	res.status(200).json(savedSubCategoria);
	// } catch (error) {
	// 	res.status(500).json({ mensaje: 'Error al ingresar subcategoria', error });
	// }
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
