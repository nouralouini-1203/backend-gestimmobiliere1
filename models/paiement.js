const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
  montant: Number,
  datePaiement: Date,
  statut: { type: String, enum: ['payé', 'en attente'], default: 'en attente' }
});

module.exports = mongoose.model('Paiement', paiementSchema);
