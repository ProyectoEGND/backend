import { Router } from 'express';
import * as productsCrt from '../controllers/products.controller';
import { verifyToken } from '../middlewares';
import upload from '../libs/storage';
const router = Router();

router.post('/', verifyToken, upload.single('img'), productsCrt.createProduct);
router.post('/masivo', verifyToken, productsCrt.createProductM);
router.get('/', productsCrt.getProducts);
router.get('/misproductos', verifyToken, productsCrt.getTienda);
router.get('/:productId', productsCrt.getProductById);
router.put('/:productId', verifyToken, productsCrt.updateProductById);
router.delete('/:productId', verifyToken, productsCrt.deleteProductById);

export default router;
