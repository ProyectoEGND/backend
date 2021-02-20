import { response } from 'express';
import Users from '../models/users';

export const getUsers = async (req, res) => {
	const users = await Users.find();
	res.json(users);
};

export const getUserById = async (req, res) => {
	const user = await Users.findById(req.params.userId);
	res.status(200).json(user);
};
export const getUserPreferenciasById = async (req, res) => {
	console.log(req.userId);
	const user = await Users.findById(req.userId);
	res.status(200).json(user.preferencias);
};
export const updateUserPreferenciasById = async (req, res) => {
	if (req.files) {
		console.log(req.body);
		console.log(req.files);
	}

	// const user = await Users.findById(req.params.userId);
	res.status(200);
};

// actualizar cabecera de la tienda

export const updateHeadById = async (req, res) => {
	// console.log(req.body);
	// const { filename } = req.file;
	// console.log(filename);
	const user = await Users.findById(req.userId);
	console.log(req.body.titulo);
	let preferencias = user.preferencias;

	preferencias.titulo = req.body.titulo;
	preferencias.fuenteH = req.body.fuenteH;
	preferencias.tColorH = req.body.tColorH;
	preferencias.fColorH = req.body.fColorH;
	preferencias.moneda = req.body.moneda;

	if (req.file) {
		const { filename } = req.file;
		console.log(filename);
		preferencias.logo = `http://186.122.145.218:4000/public/${filename}`;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);
	console.log(preferencias);
	res.status(200).json(userActualizado);
};

export const updateModalById = async (req, res) => {
	// console.log(req.body);
	// const { filename } = req.file;
	// console.log(filename);
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;

	preferencias.tmodal = req.body.tmodal;
	preferencias.modal = req.body.modal;

	if (req.file) {
		const { filename } = req.file;
		console.log(filename);
		preferencias.imodal = `http://186.122.145.218:4000/public/${filename}`;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);
	console.log(preferencias);
	res.status(200).json(req.body);
};

export const updateFooterById = async (req, res) => {
	// console.log(req.body);
	// const { filename } = req.file;
	// console.log(filename);
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;
	let arraySuperior = [];
	preferencias.pie = req.body.pie;
	preferencias.fuenteF = req.body.fuenteF;
	preferencias.tColorF = req.body.tColorF;
	preferencias.fColorF = req.body.fColorF;
	preferencias.LinkExterno = req.body.LinkExterno;
	preferencias.GeoTienda = req.body.GeoTienda;
	preferencias.textlink = req.body.textlink;
	preferencias.terminosColor = req.body.terminosColor;

	if (req.files) {
		req.files.map((file) => {
			const { filename } = file;

			arraySuperior.push(`http://186.122.145.218:4000/public/${filename}`);
		});
		preferencias.imagenesF = arraySuperior;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);
	console.log(preferencias);
	res.status(200).json(req.body);
};

// actualizar cuerpo de la tienda

export const updateCuerpoById = async (req, res) => {
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;
	let arraySuperior = [];

	preferencias.fuenteC = req.body.fuenteC;
	preferencias.tColorC = req.body.tColorC;
	preferencias.fColorC = req.body.fColorC;
	preferencias.hoverColor = req.body.hoverColor;
	preferencias.selectColor = req.body.selectColor;

	if (req.files) {
		req.files.map((file) => {
			const { filename } = file;

			arraySuperior.push(`http://186.122.145.218:4000/public/${filename}`);
		});
		preferencias.imagenesH = arraySuperior;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);
	console.log(preferencias);
	res.status(200).json(userActualizado);
};

// actualizar cuerpo de la tienda

export const updateRedes = async (req, res) => {
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;

	preferencias.whatsapp = req.body.whatsapp;
	preferencias.youtube = req.body.youtube;
	preferencias.facebook = req.body.facebook;
	preferencias.instagram = req.body.instagram;

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);
	console.log(preferencias);
	res.status(200).json(userActualizado);
};

export const updateUserById = async (req, res) => {
	console.log(req.body);
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, req.body, {
		new: true,
	});
	console.log(userActualizado);
	res.status(200).json(userActualizado);
};

export const updateUserById2 = async (req, res) => {
	console.log(req.body);
	const userActualizado = await Users.findByIdAndUpdate(req.userId, req.body, {
		new: true,
	});
	console.log(userActualizado);
	res.status(200).json(userActualizado);
};

export const updateUserByIdImg = async (req, res) => {
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, req.body, {
		new: true,
	});

	res.status(200).json(userActualizado);
};

export const deleteUserById = async (req, res) => {
	// const userEliminado = await Users.findByIdAndDelete(req.params.userId);
	const userEliminado = await Users.deleteMany();
	res.status(204).json();
};

export const reasignarUserById = async (req, res) => {
	var myquery = { padre: req.body.padre };
	var newvalues = { $set: { padre: req.body.nuevoPadre } };

	const usuarioActualizado = await Users.updateMany(myquery, newvalues, {
		new: true,
	});
	console.log(usuarioActualizado);
	res.status(204).json();
};

export const desactivar = async (req, res) => {
	var newvalues = { $set: { estado: 'Inactivo' } };
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, newvalues, {
		new: true,
	});
	res.status(204).json(userActualizado);
};

export const pertenecen = async (req, res) => {
	const userFound = await Users.find({ padre: req.body.padre }, function (err, user) {
		if (err) {
			res.send(err);
		}
		console.log(user);
		res.json(user);
	});
};

export const revendedores = async (req, res) => {
	const userFound = await Users.find({ roles: '5fcb8124b424572820441a01' }, function (err, user) {
		if (err) {
			res.send(err);
		}
		console.log(user);
		res.json(user);
	});
	if (!userFound) {
		res.status(400).json({ message: 'Sin vendedores asignados' });
	}
	response.status(200).json(userFound);
};

export const topten = async (req, res) => {
	const users = await Users.aggregate([{ $group: { _id: '$padre', vendedores: { $sum: 1 } } }]);
	users.sort(function (a, b) {
		if (a.vendedores < b.vendedores) {
			return 1;
		}
		if (a.vendedores > b.vendedores) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});

	res.json(users);
};

export const vencimiento = async (req, res) => {
	let d = new Date();
	const vencimiento = await Users.findOne({ fecha: { $eq: d } }).exec((err, act) => {
		if (err) {
			console.log('hubo un error');
			return res.status(500).json({ error: err.message }); //debes enviar una respuesta o llamar al manejador de errores (return next(err))
		}
		console.log(act);
		return res.status(200).json(act); // en este ejemplo se envía el resultado
	});

	res.json(users);
};
