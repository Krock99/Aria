const express = require('express');
// Middleware d'authentification
const auth = require('../middleware/auth');
// Import des controllers
const characterCtrl = require('../controllers/character');

const router = express.Router();

// Ajout des controllers aux routes (incluant le middleware d'authentification et la gestion de fichiers)
router.post('/', auth, characterCtrl.createCharacter);
router.get('/:id', auth, characterCtrl.getOneCharacter);
router.put('/:id', auth, characterCtrl.modifyCharacter);
router.delete('/:id', auth, characterCtrl.deleteCharacter);

module.exports = router;
