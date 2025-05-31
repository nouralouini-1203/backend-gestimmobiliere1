const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/getALLapartments', apartmentController.getALLapartments);
router.get('/getApartmentById/:id', apartmentController.getApartmentById);
router.post('/addApartment', apartmentController.addApartment);
router.put('/updateApartmentById/:id', apartmentController.updateApartmentById); 
router.delete('/deleteApartment/:id', apartmentController.deleteApartment);
router.post('/addApartmentWithOwner', apartmentController.addApartmentWithOwner);
router.get('/getCountApartment', apartmentController.getCountApartment);
router.get('/getApartmentOwner', apartmentController.getApartmentOwner);

module.exports = router;
