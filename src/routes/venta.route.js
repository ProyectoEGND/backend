import { Router } from 'express';
import * as ventasCrt from '../controllers/ventas.controllers';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, ventasCrt.getVentas);

router.get('/:ventaId', ventasCrt.getVenta);
router.post('/:tienda', ventasCrt.createVenta);

export default router;
