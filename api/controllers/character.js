const { response } = require('../app');
// Schéma de données pour les personnages
const Character = require('../models/Character');

// Contoller pour la création d'un nouveau personnage
exports.createCharacter = (req, res, next) => {
    const characterObject = req.body;
    delete characterObject._id;
    delete characterObject._userId;
    const character = new Character({
        ...characterObject,
        // Le UserId vient de auth donc du token pour sécuriser la requête
        userId: req.auth.userId,
        mastery: { Mains_nues: '0/0', Poignard: '2/2' },
        inventory: { Provisions: 4 },
        gold: 0,
        other: { Objet01: 'Rien pour le moment' },
    });
    // Enregistre le personnage dans la base de données
    character
        .save()
        .then(() =>
            res.status(201).json({ message: 'Personnage enregistré !' }),
        )
        .catch(error => res.status(400).json({ error }));
};

// Controler pour la modification d'un personnage
exports.modifyCharacter = (req, res, next) => {
    Character.findOne({ _id: req.params.id })
        .then(character => {
            // On vérifie que l'utilisateur qui fait la requête est bien l'utilisateur qui a créé le personnage
            if (character.userId != req.auth.userId) {
                res.status(403).json({ message: 'Non-autorisé' });
            } else {
                // On modifie le personnage dans la base de données
                Character.updateOne(
                    { _id: req.params.id },
                    { ...characterObject, _id: req.params.id },
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: 'Personnage modifié !' }),
                    )
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => response.status(400).json({ error }));
};

// Controler pour la supression d'un personnage
exports.deleteCharacter = (req, res, next) => {
    Character.findOne({ _id: req.params.id })
        .then(character => {
            // On vérifie que l'utilisateur qui fait la requête est bien l'utilisateur qui a créé le personnage
            if (character.userId != req.auth.userId) {
                res.status(403).json({ message: 'Non-autorisé' });
            } else {
                // On supprime le personnage de la base de données
                Character.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({
                            message: 'Personnage supprimé !',
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

// Controller pour chercher un personnage dans la base de données
exports.getOneCharacter = (req, res, next) => {
    Character.findOne({ _id: req.params.id })
        .then(character => res.status(200).json(character))
        .catch(error => res.status(400).json({ error }));
};
