// Dotenv charge les variables d'environnements (.env)
require('dotenv').config();

// Import d'Express
const express = require('express');

// Import de mongoose
const mongoose = require('mongoose');

// Routes utilisateur
const userRoutes = require('./routes/user');

// Routes personnage (CRUD)
const characterRoutes = require('./routes/character');

// Utilisation d'Express
const app = express();

// Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.tpq5ukr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Accès au core de la requête
app.use(express.json());

// Ajout du Middleware d'autorisation
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes pour l'authentification
app.use('/api/auth', userRoutes);
// Routes pour les personnages
app.use('/api/character', characterRoutes);

module.exports = app;