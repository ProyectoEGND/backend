import { Router } from 'express';
import * as operacionCrt from '../controllers/operacion.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, operacionCrt.getOperacion);
router.post('/', verifyToken, operacionCrt.createOpearcion);
router.put('/:idOperacion', verifyToken, operacionCrt.updateOperacionById);

export default router;
