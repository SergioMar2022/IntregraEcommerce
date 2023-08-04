const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para subir documentos
router.post('/:uid/documents', userController.uploadDocuments);

// Ruta para actualizar a premium
router.post('/:uid/premium', userController.updateToPremium);

module.exports = router;
