const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/locataire/:id', reservationController.getReservationsByLocataire);
router.get('/proprietaire/:id', reservationController.getReservationsByProprietaire);
router.put('/:id',reservationController.updateReservationStatus);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
