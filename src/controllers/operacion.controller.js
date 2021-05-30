import { response } from 'express';
import Producto from '../models/products';
import Operaciones from '../models/operacion';

export const getOperacion = async (req, res) => {
	try {
		const foundOperacion = await Operaciones.find({ tienda: { $in: req.tienda }, estado: { $in: true } });
		await console.log(foundOperacion);
		res.status(200).json(foundOperacion);
	} catch (error) {
		res.status(500).json({ operaciones: 'Error al recuperar vales' });
	}
};

export const createOpearcion = async (req, res) => {
	try {
		const { tipo, monto, producto, stock } = req.body;
		const newOperacion = new Operaciones({
			tienda: req.tienda,
			tipo,
			monto,
			producto,
		});

		let cantidad = 0;

		switch (tipo) {
			case 'Incremento':
				cantidad = stock + monto;
				break;

			default:
				cantidad = stock - monto;
				break;
		}

		const productoActualizado = await Producto.findByIdAndUpdate(
			producto,
			{ stock: cantidad },
			{
				new: true,
			}
		);

		const savedOperacion = await newOperacion.save();
		res.status(200).json({ mensaje: 'Operaciones ingresada correctamente' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error al ingresar el operacion', error });
	}
};

export const updateOperacionById = async (req, res) => {
	try {
		const operacionActualizada = await Operaciones.findByIdAndUpdate(req.params.idOperacion, req.body, {
			new: true,
		});

		res.status(200).json({ mensaje: 'Operacion actualizada' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
