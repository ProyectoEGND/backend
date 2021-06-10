import { Schema, model } from 'mongoose';

const subCategoriaSchema = new Schema(
	{
		nombre: String,
		tienda: String,
		descripcion: String,
		estado: Boolean,
		categoria: {
			ref: 'Categoria',
			type: Schema.Types.ObjectId,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('SubCategoria', subCategoriaSchema);
