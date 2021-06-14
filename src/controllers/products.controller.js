import Producto from '../models/products';
import Operaciones from '../models/operacion';
import Categoria from '../models/categoria';
import SubCategoria from '../models/subcategoria';

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
			stockMinimo,
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
			estado: true,
			Composicion,
			Componentes,
			subcategoria,
			marca,
			descripcion: JSON.parse(descripcion),
			stockMinimo,
			tienda: req.tienda,
			stockInicial,
			operaciones: [],
			descuento,
			variedades: JSON.parse(variedades),
			minVar,
			maxVar,
			precio,
			imgUrl,
		});
		console.log('enviado', categoria, subcategoria);

		console.log(req.body);

		const newOperacion = new Operaciones({
			tienda: req.tienda,
			tipo: 'Inicial',
			monto: stockInicial ? stockInicial : 0,
		});

		newProducto.stock = newOperacion.monto;
		const savedOperacion = await newOperacion.save();
		newProducto.operaciones.push(newOperacion._id);

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
		stockMinimo,
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
		estado: true,
		subcategoria,
		marca,
		Composicion,
		Componentes,
		stockMinimo,
		stockInicial: stockInicial ? stockInicial : 0,
		operaciones: [],
		descuento,
		variedades,
		minVar,
		maxVar,
		imgUrl,
		descripcion,
	});

	const newOperacion = new Operaciones({
		tienda: req.tienda,
		tipo: 'Inicial',
		monto: stockInicial ? stockInicial : 0,
	});

	const savedOperacion = await newOperacion.save();

	if (categoria !== 'Sin categoria') {
		const foundCategoria = await Categoria.find({
			tienda: { $in: req.tienda },
			key: { $in: categoria },
			estado: { $in: true },
		});

		newProducto.categoria = foundCategoria.length > 0 ? foundCategoria[0].nombre : 'Sin categoria';
	}

	if (subcategoria !== 'Sin subCategoria') {
		const foundSubCategoria = await SubCategoria.find({
			tienda: { $in: req.tienda },
			key: { $in: subcategoria },
			estado: { $in: true },
		});
		newProducto.subcategoria = foundSubCategoria.length > 0 ? foundSubCategoria[0].nombre : 'Sin subCategoria';
	}

	newProducto.stock = newOperacion.monto;
	newProducto.operaciones.push(newOperacion._id);

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
	// console.log('envie', req.body.composicion);
	try {
		const productoActualizado = await Producto.findByIdAndUpdate(req.params.productId, req.body, {
			new: true,
		});

		if (req.body.variedades) {
			productoActualizado.variedades = JSON.parse(req.body.variedades);
		}

		if (req.file) {
			console.log('imagen');
			const { filename } = req.file;

			productoActualizado.setImg(filename);
		}

		const actualizado = await productoActualizado.save();

		res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};
export const deleteProductById = async (req, res) => {
	try {
		const productoEliminado = await Producto.findByIdAndDelete(req.params.productId);
		res.status(204).json({ mensaje: 'Producto eliminado' });
	} catch (error) {
		res.status(500).json({ mensaje: 'Error inesperado' });
	}
};

export const getTienda = async (req, res) => {
	// console.log(req);
	const foundProducto = await Producto.find({ tienda: { $in: req.tienda } });
	const activos = foundProducto.filter((productos) => productos.estado !== false);
	res.status(200).json({ productos: activos });

	// res.status(200).json(foundProducto);
};
