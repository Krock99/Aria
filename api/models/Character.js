const mongoose = require('mongoose');

// Schéma de données pour les personnages
const characterSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    hability: { type: String, required: true },
    stamina: { type: String, required: true },
    chance: { type: String, required: true },
    mastery: { type: { type: string }, required: true },
    inventory: { type: { type: string }, required: true },
    gold: { type: Number, required: true },
    other: { type: { type: string }, required: false },
});

module.exports = mongoose.model('Character', characterSchema);
