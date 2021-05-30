import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';
import ProductsRoute from './routes/products.routes';
import VentasRoute from './routes/venta.route';
import AuthRoute from './routes/auth.route';
import UsersRoute from './routes/users.route';
import CategoriaRoute from './routes/categoria.route';
import SubCategoriaRoute from './routes/subcategoria.route';
import ValesRoute from './routes/vale.route';
import OperacionRoute from './routes/operacion.route';
import CheckOutRoute from './routes/checkout.route';
import { createRole, createProduct } from './libs/confInicial';
import bodyParser from 'body-parser';
import { getTienda as tienda, getProductos as productos } from './controllers/tienda';
const app = express();
createRole();
// createProduct();
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use('/storage', express.static('storage'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(`${__dirname}/storage/imgs`));

app.get('/', (req, res) => {
	res.json({
		autor: pkg.author,
		proyecto: pkg.name,
		version: pkg.version,
	});
});

app.get('/:tienda', tienda);
app.get('/:tienda/productos', productos);

app.use('/api/products', ProductsRoute);
app.use('/api/categoria', CategoriaRoute);
app.use('/api/operacion', OperacionRoute);
app.use('/api/subcategorias', SubCategoriaRoute);
app.use('/api/vales', ValesRoute);
app.use('/api/ventas', VentasRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/user', UsersRoute);
app.use('/api/checkout', CheckOutRoute);

export default app;
