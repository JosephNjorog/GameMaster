const express = require('express');
const gameController = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, gameController.createGame);
router.get('/:id', protect, gameController.getGame);
router.post('/:id/join', protect, gameController.joinGame);
router.post('/:id/start', protect, gameController.startGame);
router.post('/move', protect, gameController.makeMove);

module.exports = router;
