import { response } from 'express';

const mercadopago = require('mercadopago');

export const pagos = async (req, res) => {
	mercadopago.configure({
		access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410',
	});
	let preference = {
		items: [
			{
				title: req.body.titulo,
				unit_price: parseInt(req.body.precio),
				quantity: 1,
			},
		],
	};

	mercadopago.preferences
		.create(preference)
		.then(function (response) {
			res.status(200).json({ pagos: response.body.init_point });
		})
		.catch(function (error) {
			console.log(error);
		});
};
