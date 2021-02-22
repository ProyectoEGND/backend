import { Router } from 'express';
import * as pagosCrt from '../controllers/checkOut.controllers';
import { verifyToken } from '../middlewares';
import upload from '../libs/storage';
const router = Router();

router.post('/', pagosCrt.pagos);

export default router;
