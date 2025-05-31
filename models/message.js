const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  expediteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contenu: String,
  dateEnvoi: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
