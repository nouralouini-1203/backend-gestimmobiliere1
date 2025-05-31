const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const uploadFile = require('../middlewares/uploadFile');
const User = require('../models/userModel');


// Liste de tous les utilisateurs
router.get('/users', userController.getUsers);

// Détail d’un utilisateur
router.get('/users/:id', userController.getUserById);

// Modifier un utilisateur
router.put('/users/:id', userController.updateUser);

// Modifier mot de passe
router.put('/users/:id/password', userController.updatePassword);

// Supprimer un utilisateur
router.delete('/users/:id', userController.deleteUserById);

// Ajouter un client (utilisé dans la logique d'inscription)
router.post('/clients', userController.addClient);

// Ajouter un administrateur
router.post('/admins', userController.addAdmin);

// Ajouter un utilisateur avec image (upload du fichier image_user)
router.post('/users/with-image', uploadFile.single("image_user"), userController.addUserWithImage);

module.exports = router;
