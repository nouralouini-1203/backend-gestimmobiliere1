const mongoose = require('mongoose');

const proprieteSchema = new mongoose.Schema({
  titre: String,
  description: String,
  localisation: String,
  prix: Number,
  photos: [String],
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Propriete', proprieteSchema);
