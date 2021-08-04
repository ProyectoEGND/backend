import { Schema, model } from "mongoose";

const productoSchema = new Schema(
  {
    sku: { type: String, required: true },
    tienda: String,
    estado: Boolean,
    nombre: { type: String, required: true },
    categoria: String,
    subcategoria: String,
    marca: String,
    descripcion: [{ type: String }],
    stockInicial: Number,
    stock: Number,
    operaciones: [
      {
        ref: "Operacion",
        type: Schema.Types.ObjectId,
      },
    ],
    descuento: Number,
    Composicion: { type: Boolean, required: true },
    Componentes: String,
    variedades: [{ type: String }],
    minVar: Number,
    maxVar: Number,
    precio: Number,
    imgUrl: String,
    stockMinimo: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productoSchema.methods.setImg = function setImg(filename) {
  this.imgUrl = `http://18.222.252.2:4000/public/${filename}`;
};

export default model("Producto", productoSchema);
