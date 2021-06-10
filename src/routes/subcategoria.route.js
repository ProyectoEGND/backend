import { Router } from 'express';
import * as subcategoriasCrt from '../controllers/subcategoria.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, subcategoriasCrt.getSubCategorias);
router.get('/:idCategoria', verifyToken, subcategoriasCrt.getSubCategoriaByCategoria);
router.put('/:subcategoria', verifyToken, subcategoriasCrt.updateSubCategoriaById);
router.post('/', verifyToken, subcategoriasCrt.createSubCategoria);

export default router;
