import React, { useState } from 'react';

const ScrabbleGame = () => {
  const [board, setBoard] = useState(Array(15).fill(Array(15).fill(null)));
  const [currentWord, setCurrentWord] = useState('');
  const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });

  const placeLetter = (letter, row, col) => {
    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? letter : c)) : r
    );
    setBoard(newBoard);
    setCurrentWord(currentWord + letter);
    setCurrentPos({ row, col: col + 1 });
  };

  const handleSubmitWord = () => {
    // Add logic to calculate score and validate word
    alert(`Word submitted: ${currentWord}`);
    setCurrentWord('');
  };

  return (
    <div>
      <h2>Scrabble</h2>
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
                onClick={() => placeLetter(prompt('Enter letter:'), i, j)}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSubmitWord}>Submit Word</button>
    </div>
  );
};

export default ScrabbleGame;
