import Role from '../models/roles';
import Producto from '../models/products';

export const createRole = async () => {
	console.log('llgo');
	const count = await Role.estimatedDocumentCount();
	console.log(count);
	try {
		if (count > 0) return;

		const values = await Promise.all([
			new Role({ name: 'Vendedor' }).save(),
			new Role({ name: 'ReVendedor' }).save(),
			new Role({ name: 'Admin' }).save(),
		]);

		console.log(values);
	} catch (error) {
		console.log(error);
	}
};

// export const createProduct = async () => {
// 	const count2 = await Producto.estimatedDocumentCount();
// 	console.log('cantidad de productos', count2);
// 	try {
// 		if (count2 > 0) return;

// 		const values = await Promise.all([
// 			new Producto({
// 				nombre: 'Batidora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Microprecesadora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Aspiradora',
// 				categoria: 'Linea Blanca',
// 				subcategoria: 'Limpieza',
// 				marca: 'Liliana',
// 				descripcion: ['cuatro hojas', '800RPM', 'Jarra de vidrio'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 			new Producto({
// 				nombre: 'Heladera',
// 				categoria: 'Refrigeracion',
// 				subcategoria: 'Cocina',
// 				marca: 'Liliana',
// 				descripcion: ['Tropical', '400L', 'Congelador'],
// 				stockInicial: 2,
// 				stock: 5,
// 				descuento: 10,
// 				variedades: ['Roja', 'Amarrillo', 'Negro'],
// 				precio: 1000,
// 				imgUrl: '',
// 			}).save(),
// 		]);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
