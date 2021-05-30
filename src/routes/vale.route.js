import { Router } from 'express';
import * as valesCrt from '../controllers/vale.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, valesCrt.getVales);
router.post('/', verifyToken, valesCrt.createVale);
router.put('/:idVale', verifyToken, valesCrt.updateValeById);

export default router;
