const Game = require('../models/Game');
const { Chess } = require('chess.js');

// Initialize Ludo board state
const initializeLudoBoard = () => {
  return {
    players: {
      red: { pieces: [0, 0, 0, 0] },
      blue: { pieces: [0, 0, 0, 0] },
      green: { pieces: [0, 0, 0, 0] },
      yellow: { pieces: [0, 0, 0, 0] }
    },
    turn: 'red', // Set initial turn
    diceRoll: 0,
  };
};

// Handle Chess move
const handleChessMove = (game, move) => {
  const chess = new Chess(game.state.fen);
  const result = chess.move(move);

  if (result) {
    game.state.fen = chess.fen();
    game.state.history = chess.history();
    game.status = chess.in_checkmate() ? 'checkmate' : chess.in_draw() ? 'draw' : 'in-progress';
  } else {
    throw new Error('Invalid move');
  }

  return game;
};

// Handle Ludo move
const handleLudoMove = (game, move) => {
  const { player, pieceIndex, diceRoll } = move;

  if (game.state.turn !== player) {
    throw new Error('Not your turn');
  }

  game.state.players[player].pieces[pieceIndex] += diceRoll;

  // Logic to handle capturing opponent pieces and reaching the home square would go here
  // Example: if (game.state.players[player].pieces[pieceIndex] === finalPosition) { ... }

  // Update turn
  const turnOrder = ['red', 'blue', 'green', 'yellow'];
  const nextPlayerIndex = (turnOrder.indexOf(player) + 1) % 4;
  game.state.turn = turnOrder[nextPlayerIndex];

  return game;
};

exports.createGame = async (req, res) => {
  try {
    const { type, players } = req.body;

    let state = {};
    if (type === 'chess') {
      state = {
        fen: new Chess().fen(),
        history: [],
      };
    } else if (type === 'ludo') {
      state = initializeLudoBoard();
    }

    const game = new Game({ type, players, state });
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

exports.makeMove = async (req, res) => {
  try {
    const { gameId, move } = req.body;
    let game = await Game.findById(gameId);

    switch (game.type) {
      case 'chess':
        game = handleChessMove(game, move);
        break;
      case 'ludo':
        game = handleLudoMove(game, move);
        break;
      default:
        return res.status(400).json({ error: 'Invalid game type' });
    }

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
