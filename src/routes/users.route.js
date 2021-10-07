import { Router } from 'express';
import * as userCrt from '../controllers/users.controller';
import { verifyToken } from '../middlewares';
import upload from '../libs/storage';

const router = Router();
// getUserPreferenciasById
router.put('/updateCabecera', verifyToken, upload.single('logo'), userCrt.updateHeadById);
router.get('/verPreferencias', verifyToken, userCrt.getUserPreferenciasById);
router.put('/updateModal', verifyToken, upload.single('imodal'), userCrt.updateModalById);
router.put('/updateHeader', verifyToken, upload.single('logo'), userCrt.updateHeadById);
router.put('/updateZonas', verifyToken, userCrt.updateZonas);
router.put('/updateMensajesCompra', verifyToken, userCrt.updateMensajes);

router.put('/updateBody', verifyToken, upload.any('superior'), userCrt.updateCuerpoById);
router.put('/updateFooter', verifyToken, upload.any('inferior'), userCrt.updateFooterById);
router.put('/upgradePreferencias', verifyToken, userCrt.updateUserById2);
router.get('/getMP', verifyToken, userCrt.getMercadoPagoById);

router.get('/', userCrt.getUsers);
router.get('/:userId', userCrt.getUserById);
router.get('/preferencia', userCrt.getUsers);
router.post('/reasigna', userCrt.reasignarUserById);
router.post('/renovar', userCrt.reasignarUserById);

router.put('/masivo/:userId', userCrt.updateUserByIdImg);
router.put('/renovarLicencia/:userId',verifyToken, userCrt.renovar);
router.put('/redes', verifyToken, userCrt.updateRedes);
router.put('/horarios', verifyToken, userCrt.updateHorarioById);
router.put('/:userId', userCrt.updateUserById);

// router.put('/updateCuerpo', verifyToken, upload.any('superior'), userCrt.updateCuerpoById);
// router.put('/updateFooter', verifyToken, upload.any('inferior'), userCrt.updateFooterById);
router.delete('/:userId', userCrt.deleteUserById);
router.post('/desactivar/:userId', userCrt.desactivar);
router.post('/renovar/:userId', userCrt.renovar);
router.post('/activar/:userId', userCrt.activar);
router.post('/pertenecen', userCrt.pertenecen);
router.post('/topten', verifyToken, userCrt.topten);
router.post('/vencimiento', userCrt.vencimiento);
router.post('/revendedores', userCrt.revendedores);
router.post('/contenidos', verifyToken, userCrt.usuarioContenidos);
router.post('/alta', verifyToken, userCrt.createUsers);
router.post('/updatePreguntas', verifyToken, userCrt.updatePreguntasById);
export default router;
