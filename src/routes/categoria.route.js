import { Router } from 'express';
import * as categoriasCrt from '../controllers/categoria.controller';
import { verifyToken } from '../middlewares';
const router = Router();

router.get('/', verifyToken, categoriasCrt.getCategorias);
router.post('/', verifyToken, categoriasCrt.createCategoria);
router.put('/:idCategoria', verifyToken, categoriasCrt.updateCategoriaById);

export default router;
