import { Schema, model } from 'mongoose';

const productoSchema = new Schema(
	{
		sku: { type: String, required: true },
		tienda: String,
		nombre: { type: String, required: true },
		categoria: String,
		subcategoria: String,
		marca: String,
		descripcion: [{ type: String }],
		stockInicial: Number,
		stock: Number,
		descuento: Number,
		Composicion: { type: Boolean, required: true },
		Componentes: String,
		variedades: [{ type: String }],
		minVar: Number,
		maxVar: Number,
		precio: Number,
		imgUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

productoSchema.methods.setImg = function setImg(filename) {
	this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};

export default model('Producto', productoSchema);
