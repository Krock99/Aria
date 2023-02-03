const mongoose = require('mongoose');

// Schéma de données pour les personnages
const characterSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    ability: { type: Number, required: true },
    stamina: { type: Number, required: true },
    luck: { type: Number, required: true },
    mastery: { type: Object, required: true },
    inventory: { type: Object, required: true },
    gold: { type: Number, required: true },
    other: { type: Object, required: true },
});

module.exports = mongoose.model('Character', characterSchema);
