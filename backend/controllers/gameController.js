const Game = require('../models/Game');
const { Chess } = require('chess.js');

const TOTAL_SQUARES = 52; // Total squares on the Ludo board before home stretch

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

// Get the starting square for a player's piece
const getStartSquare = (player) => {
  const startSquares = {
    red: 0,
    blue: 13,
    green: 26,
    yellow: 39,
  };
  return startSquares[player];
};

// Check if a piece can enter the home stretch
const canEnterHome = (piecePosition, diceRoll) => {
  return piecePosition + diceRoll <= TOTAL_SQUARES + 5;
};

// Handle Ludo move
const handleLudoMove = (game, move) => {
  const { player, pieceIndex, diceRoll } = move;
  if (game.state.turn !== player) {
    throw new Error('Not your turn');
  }

  const playerPieces = game.state.players[player].pieces;
  let newPiecePosition = playerPieces[pieceIndex] + diceRoll;

  if (newPiecePosition > TOTAL_SQUARES + 5) {
    throw new Error('Invalid move: cannot move beyond home square');
  }

  // Handle capturing opponent pieces
  for (const opponent in game.state.players) {
    if (opponent !== player) {
      const opponentPieces = game.state.players[opponent].pieces;
      for (let i = 0; i < opponentPieces.length; i++) {
        if (opponentPieces[i] === newPiecePosition) {
          opponentPieces[i] = 0; // Send captured piece back to start
        }
      }
    }
  }

  // Update piece position
  playerPieces[pieceIndex] = newPiecePosition;

  // Check if the piece reaches home
  if (newPiecePosition === TOTAL_SQUARES + 5) {
    // Handle reaching home
    // For simplicity, assume reaching home ends the game for this piece
    playerPieces[pieceIndex] = -1; // Mark as reached home
  }

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
