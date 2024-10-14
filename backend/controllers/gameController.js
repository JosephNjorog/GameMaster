const Game = require('../models/Game');

exports.createGame = async (req, res) => {
  try {
    const { type, players } = req.body;
    const game = new Game({ type, players });
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('players');
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    game.players.push(req.user.id);
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.startGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    game.status = 'in-progress';
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
