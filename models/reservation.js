const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  propriete: { type: mongoose.Schema.Types.ObjectId, ref: 'Propriete', required: true },
  locataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  statut: { type: String, enum: ['en attente', 'confirmée', 'refusée'], default: 'en attente' }
});

module.exports = mongoose.model('Reservation', reservationSchema);
