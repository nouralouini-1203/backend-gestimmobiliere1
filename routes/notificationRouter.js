const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/notifications', notificationController.createNotification);
router.get('/notifications/:userId', notificationController.getUserNotifications);
router.put('/notifications/:id/lu', notificationController.markAsRead);

module.exports = router;
