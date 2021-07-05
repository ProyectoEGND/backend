import { Schema, model } from 'mongoose';

const VentaSchema = new Schema(
	{
		idTienda: {
			ref: 'User',
			type: Schema.Types.ObjectId,
		},
		tienda: {
			type: String,
			required: true,
		},
		moneda: {
			type: String,
			required: true,
		},
		descuento: {
			type: Number,
			required: true,
		},
		montoProductos: {
			type: Number,
		},
		montoExtra: {
			type: Number,
		},
		montoDelivery: {
			type: Number,
		},

		productos: [
			{
				cantidad: Number,
				id: String,
				imagen: String,
				marca: String,
				nombre: String,
				precio: Number,
				sku: String,
				compuesto: Boolean,
				variedades: [{ cantidad: Number, nombre: String, id: String }],
				pedidos: [[{ cantidad: Number, nombre: String, id: String }]],
			},
		],
		mensaje: [
			{
				pregunta: String,
				respuesta: String,
			},
		],
		mercadoPago: String,

		estado: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Venta', VentaSchema);
