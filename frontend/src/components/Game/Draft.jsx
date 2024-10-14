import React, { useState } from 'react';

const DraftGame = () => {
  const initialBoardState = Array(8).fill(Array(8).fill(null));

  const [board, setBoard] = useState(initialBoardState);
  const [turn, setTurn] = useState('white');

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = board.map((row, i) =>
      row.map((col, j) => {
        if (i === fromRow && j === fromCol) return null;
        if (i === toRow && j === toCol) return turn;
        return col;
      })
    );
    setBoard(newBoard);
    setTurn(turn === 'white' ? 'black' : 'white');
  };

  return (
    <div>
      <h2>Draft</h2>
      <div>
        {board.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((col, j) => (
              <div
                key={j}
                style={{
                  width: 20,
                  height: 20,
                  border: '1px solid black',
                  textAlign: 'center',
                  lineHeight: '20px',
                }}
                onClick={() => movePiece(i, j, i + 1, j + 1)}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftGame;
