const Paiement = require('../models/paiement');
const Reservation = require('../models/reservation');

// Ajouter un paiement
exports.ajouterPaiement = async (req, res) => {
  try {
    const paiement = await Paiement.create(req.body);
    res.status(201).json(paiement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Paiements d’un locataire
exports.getPaiementsLocataire = async (req, res) => {
  try {
    const paiements = await Paiement.find()
      .populate({
        path: 'reservation',
        match: { locataire: req.params.id },
        populate: { path: 'propriete' }
      });

    const result = paiements.filter(p => p.reservation !== null);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Paiements reçus par un propriétaire
exports.getPaiementsProprietaire = async (req, res) => {
  try {
    const paiements = await Paiement.find()
      .populate({
        path: 'reservation',
        match: { proprietaire: req.params.id },
        populate: { path: 'propriete' }
      });

    const result = paiements.filter(p => p.reservation !== null);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Détail d’un paiement
exports.getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id).populate('reservation');
    if (!paiement) return res.status(404).json({ message: 'Paiement non trouvé' });
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
