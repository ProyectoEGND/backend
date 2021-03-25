import Producto from '../models/products';

export const createProduct = async (req, res) => {
	try {
		const {
			sku,
			nombre,
			categoria,
			precio,
			Composicion,
			Componentes,
			subcategoria,
			marca,
			descripcion,
			stock,
			stockInicial,
			descuento,
			variedades,
			minVar,
			maxVar,
			imgUrl,
		} = req.body;
		const newProducto = Producto({
			sku,
			nombre,
			categoria,
			Composicion,
			Componentes,
			subcategoria,
			marca,
			descripcion: JSON.parse(descripcion),
			stock,
			tienda: req.tienda,
			stockInicial,
			descuento,
			variedades: JSON.parse(variedades),
			minVar,
			maxVar,
			precio,
			imgUrl,
		});
		if (req.file) {
			const { filename } = req.file;

			newProducto.setImg(filename);
		}
		const productsFound = await Producto.find({ tienda: req.tienda });
		let repetido = productsFound.filter((productos) => productos.sku === sku);
		console.log(repetido);
		if (repetido.length > 0) {
			res.status(401).json({ mensaje: 'El sku del producto ya existe' });
		} else {
			const productSave = await newProducto.save();
			res.status(200).json(productSave);
		}
	} catch (error) {
		res.status(500).json({ mensaje: 'Valide datos ingresados' });
	}
};

export const createProductM = async (req, res) => {
	const {
		sku,
		nombre,
		categoria,
		precio,
		subcategoria,
		marca,
		descripcion,
		stock,
		Composicion,
		Componentes,
		stockInicial,
		descuento,
		variedades,
		minVar,
		maxVar,
		imgUrl,
	} = req.body;
	const newProducto = Producto({
		sku,
		nombre,
		categoria,
		tienda: req.tienda,
		precio,
		subcategoria,
		marca,
		Composicion,
		Componentes,
		stock,
		stockInicial,
		descuento,
		variedades,
		minVar,
		maxVar,
		imgUrl,
		descripcion,
	});

	const productSave = await newProducto.save();

	res.status(200).json(productSave);
};

export const getProducts = async (req, res) => {
	const products = await Producto.find();
	res.json(products);
};

export const getProductById = async (req, res) => {
	const producto = await Producto.findById(req.params.productId);
	res.status(200).json(producto);
};

export const updateProductById = async (req, res) => {
	const productoActualizado = await Producto.findByIdAndUpdate(req.params.productId, req.body, {
		new: true,
	});
	res.status(200).json(productoActualizado);
};
export const deleteProductById = async (req, res) => {
	const productoEliminado = await Producto.findByIdAndDelete(req.params.productId);
	res.status(204).json();
};

export const getTienda = async (req, res) => {
	// console.log(req);
	const foundProducto = await Producto.find({ tienda: { $in: req.tienda } });
	console.log(foundProducto);
	res.status(200).json({ productos: foundProducto });

	// res.status(200).json(foundProducto);
};
