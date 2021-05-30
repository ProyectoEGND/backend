import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema(
	{
		nombre: String,
		tienda: String,
		descripcion: String,
		estado: Boolean,
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Categoria', categoriaSchema);
