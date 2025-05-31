const express = require('express');
const router = express.Router();
const proprieteController = require('../controllers/proprieteController');
const authMiddleware = require('../middlewares/auth'); // pour req.user

router.get('/', proprieteController.getAllProprietes);
router.get('/:id', proprieteController.getProprieteById);
router.post('/', authMiddleware, proprieteController.createPropriete);
router.put('/:id', authMiddleware, proprieteController.updatePropriete);
router.delete('/:id', authMiddleware, proprieteController.deletePropriete);

module.exports = router;
