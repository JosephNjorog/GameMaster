import React, { useState } from 'react';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    if (chess.move(move)) {
      setFen(chess.fen());
    } else {
      alert('Invalid move');
    }
  };

  return (
    <div>
      <h2>Chess</h2>
      <div>Board: {fen}</div>
      <div>
        <button onClick={() => handleMove({ from: 'e2', to: 'e4' })}>Move e2 to e4</button>
        {/* Add more buttons for different moves */}
      </div>
    </div>
  );
};

export default ChessGame;
