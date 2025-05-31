const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contenu: String,
  dateEnvoi: { type: Date, default: Date.now },
  lu: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
