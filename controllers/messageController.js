const Message = require('../models/message');

exports.envoyerMessage = async (req, res) => {
  try {
    const expediteur = req.user.id;
    const { destinataire, contenu } = req.body;

    const message = new Message({
      expediteur,
      destinataire,
      contenu
    });

    await message.save();

    // Ici on ne fait plus d'émission via Socket.io, juste la sauvegarde classique
    res.status(201).json({ message: 'Message envoyé', data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /messages/conversation/:userId – Messages entre deux utilisateurs
exports.getMessagesConversation = async (req, res) => {
  try {
    const utilisateurActuel = req.user.id; // supposons que l'utilisateur connecté est dans req.user
    const autreUtilisateur = req.params.userId;

    const messages = await Message.find({
      $or: [
        { expediteur: utilisateurActuel, destinataire: autreUtilisateur },
        { expediteur: autreUtilisateur, destinataire: utilisateurActuel }
      ]
    }).sort({ dateEnvoi: 1 }); // messages triés par date

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
