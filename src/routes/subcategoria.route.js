import { Router } from 'express';
import * as subcategoriasCrt from '../controllers/subcategoria.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, subcategoriasCrt.getSubCategorias);
router.post('/', verifyToken, subcategoriasCrt.createSubCategoria);
router.put('/:idCategoria', verifyToken, subcategoriasCrt.updateSubCategoriaById);

export default router;
