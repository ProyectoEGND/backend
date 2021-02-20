import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const preferenciasSchema = new Schema({
	fuenteH: String,
	fuenteC: String,
	fuenteF: String,
	fColorH: String,
	fColorC: String,
	fColorF: String,
	tColorH: String,
	tColorC: String,
	tColorF: String,
	titulo: String,
	pie: String,
	moneda: String,
	imagenesH: [{ type: String }],
	imagenesC: [{ type: String }],
	imagenesF: [{ type: String }],
	whatsapp: String,
	LinkExterno: String,
	GeoTienda: String,
	Variedades: [{ String }],
	logo: {
		type: String,
	},
});

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		tienda: {
			type: String,
			required: true,
		},
		nombre: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
		},
		cuit: {
			type: String,
			required: true,
		},
		celular: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		licencia: {
			type: Date,
			required: true,
		},
		roles: [
			{
				ref: 'Role',
				type: Schema.Types.ObjectId,
			},
		],
		padre: {
			type: String,
			requiered: true,
		},
		estado: {
			type: String,
			required: true,
		},

		// preferencias: [{ type: String, required: false }],
		// preferencias: preferenciasSchema,
		preferencias: {
			desarrollado: String,
			terminos: String,
			fuenteH: String,
			fuenteC: String,
			fuenteF: String,
			terminosColor: String,
			fColorH: String,
			fColorC: String,
			fColorF: String,
			tColorH: String,
			tColorC: String,
			tColorF: String,
			titulo: String,
			hoverColor: String,
			selectColor: String,
			pie: String,
			moneda: String,
			imagenesH: [{ type: String }],
			imagenesC: [{ type: String }],
			imagenesF: [{ type: String }],
			logo: String,
			modal: Boolean,
			tmodal: String,
			imodal: String,
			whatsapp: String,
			youtube: String,
			facebook: String,
			instagram: String,
			LinkExterno: String,
			textlink: String,
			GeoTienda: String,
			Variedades: [{ String }],
			logo: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.setImgH = function setImgH(filename) {
	this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};
userSchema.methods.setImgC = function setImgC(filename) {
	this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};
userSchema.methods.setImgF = function setImgF(filename) {
	this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword);
};

userSchema.methods.setSup = function setImg(superior) {
	let imagenes = [];
	superior.map((sup) => imagenes.push(`http://186.122.145.218:4000/public/${sup.filename}`));
	console.log(superior);
	// this.imgUrl = `http://186.122.145.218:4000/public/${filename}`;
};

export default model('User', userSchema);
