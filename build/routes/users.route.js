"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var userCrt = _interopRequireWildcard(require("../controllers/users.controller"));

var _middlewares = require("../middlewares");

var _storage = _interopRequireDefault(require("../libs/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); // getUserPreferenciasById

router.put('/updateCabecera', _middlewares.verifyToken, _storage.default.single('logo'), userCrt.updateHeadById);
router.get('/verPreferencias', _middlewares.verifyToken, userCrt.getUserPreferenciasById);
router.put('/updateModal', _middlewares.verifyToken, _storage.default.single('imodal'), userCrt.updateModalById);
router.put('/updateHeader', _middlewares.verifyToken, _storage.default.single('logo'), userCrt.updateHeadById);
router.put('/updateBody', _middlewares.verifyToken, _storage.default.any('superior'), userCrt.updateCuerpoById);
router.put('/updateFooter', _middlewares.verifyToken, _storage.default.any('inferior'), userCrt.updateFooterById);
router.put('/upgradePreferencias', _middlewares.verifyToken, userCrt.updateUserById2);
router.get('/', userCrt.getUsers);
router.get('/:userId', userCrt.getUserById);
router.get('/preferencia', userCrt.getUsers);
router.post('/reasigna', userCrt.reasignarUserById);
router.put('/masivo/:userId', userCrt.updateUserByIdImg);
router.put('/redes', _middlewares.verifyToken, userCrt.updateRedes);
router.put('/:userId', userCrt.updateUserById); // router.put('/updateCuerpo', verifyToken, upload.any('superior'), userCrt.updateCuerpoById);
// router.put('/updateFooter', verifyToken, upload.any('inferior'), userCrt.updateFooterById);

router.delete('/:userId', userCrt.deleteUserById);
router.post('/desactivar/:userId', userCrt.desactivar);
router.post('/pertenecen', userCrt.pertenecen);
router.post('/topten', userCrt.topten);
router.post('/vencimiento', userCrt.vencimiento);
router.post('/revendedores', userCrt.revendedores);
var _default = router;
exports.default = _default;