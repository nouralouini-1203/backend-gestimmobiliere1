const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const messageController = require('../controllers/messageController'); // Vérifie bien ce chemin !

// Route pour envoyer un message
router.post('/', auth, messageController.envoyerMessage);

// Route pour récupérer la conversation avec un autre utilisateur
router.get('/conversation/:userId', auth, messageController.getMessagesConversation);

module.exports = router;
