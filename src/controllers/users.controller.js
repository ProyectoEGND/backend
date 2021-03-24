import { response } from 'express';
import Users from '../models/users';
import Role from '../models/roles';
import jwt from 'jsonwebtoken';
import config from '../config';
import nodemailer from 'nodemailer';

export const getUsers = async (req, res) => {
	const users = await Users.find();
	res.json(users);
};

export const getUserById = async (req, res) => {
	const user = await Users.findById(req.params.userId);
	res.status(200).json(user);
};
export const getUserPreferenciasById = async (req, res) => {
	const user = await Users.findById(req.userId);
	res.status(200).json(user.preferencias);
};

export const getMercadoPagoById = async (req, res) => {
	console.log('usuario', req.userId);
	const user = await Users.findById(req.userId);
	console.log(user.preferencias);

	res.status(200).json({
		mp: user.mercadoPago,
		minimo: user.preferencias.montoMin,
		extra: user.preferencias.montoExtra,
	});
};

export const updateUserPreferenciasById = async (req, res) => {
	// const user = await Users.findById(req.params.userId);
	res.status(200);
};

// actualizar cabecera de la tienda

export const updateHeadById = async (req, res) => {
	// console.log(req.body);
	// const { filename } = req.file;
	// console.log(filename);
	const user = await Users.findById(req.userId);
	console.log(req.file);
	let preferencias = user.preferencias;

	preferencias.titulo = req.body.titulo;
	preferencias.fuenteH = req.body.fuenteH;
	preferencias.tColorH = req.body.tColorH;
	preferencias.fColorH = req.body.fColorH;
	preferencias.moneda = req.body.moneda;

	if (req.file) {
		console.log('validar', 'req.file');
		const { filename } = req.file;

		preferencias.logo = `http://186.122.145.218:4000/public/${filename}`;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

	res.status(200).json(userActualizado);
};

export const updateHorarioById = async (req, res) => {
	// console.log(req.body);
	// const { filename } = req.file;
	// console.log(filename);
	const user = await Users.findById(req.userId);

	let preferencias = user.preferencias;

	preferencias.horario = req.body.horario;
	preferencias.mensajeCerrado = req.body.mensajeCerrado;

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

	res.status(200).json({ mensaje: 'horario actualizado' });
};

export const updatePreguntasById = async (req, res) => {
	const { preguntas } = req.body;
	console.log(preguntas);

	const user = await Users.findById(req.userId);

	let preferencias = user.preferencias;

	preferencias.preguntas = preguntas;

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

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

		preferencias.imodal = `http://186.122.145.218:4000/public/${filename}`;
	}

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

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

	res.status(200).json(userActualizado);
};

export const updateUserById = async (req, res) => {
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, req.body, {
		new: true,
	});

	res.status(200).json(userActualizado);
};

export const updateUserById2 = async (req, res) => {
	let update;

	if (req.body.montoMin || req.body.montoMin === 0) {
		console.log(req.body.montoMin);
		console.log('monto extra', req.body.montoExtra);
		const user = await Users.findById(req.userId);
		let preferencias = user.preferencias;
		preferencias.montoMin = req.body.montoMin;
		preferencias.montoExtra = req.body.montoExtra;
		update = {
			mercadoPago: req.body.mercadoPago,
			preferencias,
		};
	} else {
		console.log('controlar salteo');
		update = req.body;
	}

	const userActualizado = await Users.findByIdAndUpdate(req.userId, update, {
		new: true,
	});

	res.status(200).json(userActualizado);
};

export const updateZonas = async (req, res) => {
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;
	let nuevasZonas = [];
	req.body.zonasCompra.map((zona) => nuevasZonas.push({ zona: zona.zona, monto: zona.monto }));
	preferencias.zonasCompra = [...nuevasZonas];
	console.log(preferencias);

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

	res.status(200).json(userActualizado);
};

export const updateMensajes = async (req, res) => {
	const user = await Users.findById(req.userId);
	let preferencias = user.preferencias;
	preferencias.mensajeCompra = req.body.mensajeCompra;
	preferencias.mensajeWP = req.body.mensajeWP;
	console.log(preferencias);

	const userActualizado = await Users.findByIdAndUpdate(
		req.userId,
		{ preferencias: preferencias },
		{
			new: true,
		}
	);

	res.status(200).json(userActualizado);
};

export const updateUserByIdImg = async (req, res) => {
	const userActualizado = await Users.findByIdAndUpdate(req.params.userId, req.body, {
		new: true,
	});

	res.status(200).json(userActualizado);
};

export const deleteUserById = async (req, res) => {
	const userEliminado = await Users.findByIdAndDelete(req.params.userId);
	// const userEliminado = await Users.deleteMany();
	res.status(204).json();
};

export const reasignarUserById = async (req, res) => {
	var myquery = { padre: req.body.padre };
	var newvalues = { $set: { padre: req.body.nuevoPadre } };

	const usuarioActualizado = await Users.updateMany(myquery, newvalues, {
		new: true,
	});

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

		res.json(user);
	});
};

export const usuarioContenidos = async (req, res) => {
	const userFound = await Users.find({ padre: req.padre }, function (err, user) {
		if (err) {
			res.send(err);
		}

		res.json(user);
	});
};

export const revendedores = async (req, res) => {
	const userFound = await Users.find({ roles: '5fcb8124b424572820441a01' }, function (err, user) {
		if (err) {
			res.send(err);
		}

		res.json(user);
	});
	if (!userFound) {
		res.status(400).json({ message: 'Sin vendedores asignados' });
	}
	response.status(200).json(userFound);
};

export const topten = async (req, res) => {
	const userFound = await Users.find();
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
	let topten = [];
	let variable2 = [];
	users.map((user) => {
		console.log(user);

		userFound
			.filter((filtrado) => filtrado.padre === req.padre)
			.map((usuario) => {
				console.log(usuario.username, user._id);
				if (usuario.username === user._id) {
					variable2.push({ usuario: usuario.username, vendedores: user.vendedores });
				}
			});
		let variable = userFound.filter((usuario) => usuario.username == user._id);
		topten.push(variable);
	});

	res.json(variable2);
};

export const vencimiento = async (req, res) => {
	let d = new Date();
	const vencimiento = await Users.findOne({ fecha: { $eq: d } }).exec((err, act) => {
		if (err) {
			console.log('hubo un error');
			return res.status(500).json({ error: err.message }); //debes enviar una respuesta o llamar al manejador de errores (return next(err))
		}

		return res.status(200).json(act); // en este ejemplo se envía el resultado
	});

	res.json(users);
};

export const createUsers = async (req, res) => {
	const { username, email, tienda, cuit, celular, password, roles, nombre, estado, desarrollado } = req.body;
	const defaultValue = {
		estadoTienda: true,
		mensajeCerrado: 'Esta Cerrado',
		horario: [
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
			{
				apertura: 0,
				cierre: 0,
			},
		],
		montoExtra: {
			descripcion: '',
			monto: 0,
		},
		zonasCompra: [
			{
				zona: 'Centro',
				monto: 0,
			},
		],
		mensajeCompra: {
			encabezado: 'Gracias por su compra',
			pie: 'Vuelva pronto',
		},
		mensajeWP: 'Su pedido realizado es: ',
		desarrollado,
		montoMin: 0,
		fuenteH: 'Monserrat',
		fuenteC: 'Monserrat',
		fuenteF: 'Monserrat',
		hoverColor: '#ff00ff00',
		selectColor: '#ff00ff00',
		fColorH: '#ff0000ff',
		fColorC: '#000000ff',
		fColorF: '#ff0000ff',
		tColorH: '#ffffffff',
		tColorC: '#ffffffff',
		tColorF: '#ffffffff',
		titulo: 'Tienda de prueba',
		pie: 'Pie de prueba',
		moneda: 'PESO',
		imagenesH: [],
		imagenesC: [],
		imagenesF: [],
		modal: true,
		tmodal: 'texto de prueba',
		imodal: 'http://186.122.145.218:4000/public/logo.jpg',
		logo: 'http://186.122.145.218:4000/public/logo.jpg',
		whatsapp: '#',
		youtube: '#',
		facebook: '#',
		instagram: '#',
		LinkExterno: '#',
		textlink: '',
		terminosColor: '#00ff00',
		preguntas: [],
		GeoTienda:
			'<iframe src="https://www.google.com/maps/d/embed?mid=1yBH-p8EWCRv1noPnlW9wP8nMp7Q&hl=es" width="640" height="480"></iframe>',
		terminos:
			'{"blocks":[{"key":"1inev","text":"Ingrese sus terminos y condiciones","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
	};
	const validaEmail = await Users.findOne({ email: req.body.email });
	const validaUsuario = await Users.findOne({ username: req.body.username });
	const validaCuit = await Users.findOne({ cuit: req.body.email });

	try {
		let d = new Date();
		const newUser = new Users({
			username,
			email,
			tienda: 'sin datos',
			cuit,
			nombre,
			celular,
			estado,
			padre: req.padre,
			preferencias: defaultValue,
			mercadoPago: {
				activo: false,
				accessToken: '',
			},
			licencia: d.setDate(d.getDate() + 30),
			password: await Users.encryptPassword(password),
		});

		if (tienda) {
			newUser.tienda = tienda;
		}

		if (req.padre) {
			newUser.padre = req.padre;
		} else {
			newUser.padre = 'Admin';
		}

		if (!estado) {
			newUser.estado = 'Activo';
		} else {
			newUser.estado = estado;
		}

		if (roles) {
			const foundRole = await Role.find({ name: { $in: roles } });
			newUser.roles = foundRole.map((role) => role._id);
		} else {
			const role = await Role.findOne({ name: 'Vendedor' });
			newUser.roles = [role._id];
		}
		const savedUser = await newUser.save();

		const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
			expiresIn: 86400,
		});
		// enviar(email, tienda, username).catch(console.error);
		res.json({ message: 'Usuario dato de alta' });
	} catch (error) {
		console.log(error);
		if (validaUsuario) {
			res.json({ message: 'Razon social ya existe' });
		} else if (validaEmail) {
			res.json({ message: 'El email ya existe' });
		} else if (validaCuit) {
			res.json({ message: 'El cuil ya existe' });
		} else {
			res.json({ message: 'error inesperado' });
		}
	}

	// enviar(email).catch(console.error);
};

async function enviar(email, tienda, username) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.hostinger.com.ar',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'info@ventas-online.xyz', // generated ethereal user
			pass: 'Welcome01', // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Cuenta creada" <info@ventas-online.xyz>', // sender address
		to: email, // list of receivers
		subject: 'Cuenta Creada', // Subject line
		text: 'Cuenta creada', // plain text body
		html: `
			<div>
				<h1>Su usuario a sido dado de alta correctamente</h1>
				<h3>La informacion de su cuenta es la siguiente</h3>
				<p><b>Usuario: </b> ${username}</p>
				<p><b>Email: </b> ${email}</p>
				<p><b>Nombre de tienda: </b> ${tienda}</p>
				<p><b><a href="http://186.122.145.218:3001/${tienda}">URL de su tienda</a></b></p>
				<p><b><a href="http://186.122.145.218:3001/personalizar">Personalise su tienda</a></b></p>
			</div>
		`, // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
