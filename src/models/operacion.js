import { Schema, model } from 'mongoose';

const operacionSchema = new Schema(
	{
		tipo: String,
		monto: Number,
		tienda: String,
		producto: [
			{
				ref: 'Producto',
				type: Schema.Types.ObjectId,
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Operacion', operacionSchema);
