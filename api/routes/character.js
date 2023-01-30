const express = require('express');
// Middleware d'authentification
const auth = require('../middleware/auth');
// Middleware de gestion des fichiers
const multer = require('../middleware/multer-config');
// Import des controllers
const characterCtrl = require('../controllers/character');

const router = express.Router();

// Ajout des controllers aux routes (incluant le middleware d'authentification et la gestion de fichiers)
router.post('/', auth, multer, characterCtrl.createCharacter);
router.get('/', auth, characterCtrl.getAllCharacters);
router.get('/:id', auth, characterCtrl.getOneCharacter);
router.put('/:id', auth, multer, characterCtrl.modifyCharacter);
router.delete('/:id', auth, characterCtrl.deleteCharacter);

module.exports = router;