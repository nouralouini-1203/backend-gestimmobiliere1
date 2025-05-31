const Notification = require('../models/notification');

// Créer une notification
exports.createNotification = async (req, res) => {
  try {
    const { utilisateur, contenu } = req.body;
    const notification = await Notification.create({ utilisateur, contenu });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err });
  }
};

// Obtenir les notifications d’un utilisateur
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ utilisateur: req.params.userId }).sort({ dateEnvoi: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err });
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { lu: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err });
  }
};
