const express = require('express');
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, paymentController.createTransaction);
router.get('/:id', protect, paymentController.getTransaction);
router.post('/:id/complete', protect, paymentController.completeTransaction);

module.exports = router;
