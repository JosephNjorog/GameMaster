import React, { useState } from 'react';

const LudoGame = () => {
  const initialBoardState = {
    red: [0, 0, 0, 0],
    blue: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
    yellow: [0, 0, 0, 0],
  };

  const [board, setBoard] = useState(initialBoardState);
  const [turn, setTurn] = useState('red');
  const [diceRoll, setDiceRoll] = useState(1);

  const rollDice = () => {
    setDiceRoll(Math.floor(Math.random() * 6) + 1);
  };

  const movePiece = (color, index) => {
    if (turn !== color) {
      alert("It's not your turn!");
      return;
    }

    const newBoard = { ...board };
    let newPos = newBoard[color][index] + diceRoll;

    // Check for capturing opponent pieces
    for (const opponent in newBoard) {
      if (opponent !== color) {
        newBoard[opponent] = newBoard[opponent].map(pos => pos === newPos ? 0 : pos);
      }
    }

    // Check if piece can move into home
    if (newPos > 52 + 5) {
      alert('Cannot move beyond home');
      return;
    }

    newBoard[color][index] = newPos;

    setBoard(newBoard);
    setTurn(nextTurn(turn));
  };

  const nextTurn = (currentTurn) => {
    const order = ['red', 'blue', 'green', 'yellow'];
    const currentIndex = order.indexOf(currentTurn);
    return order[(currentIndex + 1) % 4];
  };

  return (
    <div>
      <h2>Ludo</h2>
      <div>Dice Roll: {diceRoll}</div>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        {Object.keys(board).map(color => (
          <div key={color}>
            <h3>{color}</h3>
            {board[color].map((pos, index) => (
              <button key={index} onClick={() => movePiece(color, index)}>
                Piece {index + 1}: {pos}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LudoGame;
