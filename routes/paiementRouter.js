const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

router.post('/', paiementController.ajouterPaiement);
router.get('/locataire/:id', paiementController.getPaiementsLocataire);
router.get('/proprietaire/:id', paiementController.getPaiementsProprietaire);
router.get('/:id', paiementController.getPaiementById);

module.exports = router;
