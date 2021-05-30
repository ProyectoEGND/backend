import { Schema, model } from 'mongoose';

const valeSchema = new Schema(
	{
		nombre: String,
		tienda: String,
		descripcion: String,
		estado: Boolean,
		descuento: Number,
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Vale', valeSchema);
