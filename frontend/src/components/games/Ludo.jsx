import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dice6, RefreshCw } from 'lucide-react';

const BOARD_SIZE = 15;
const COLORS = ['red', 'blue', 'green', 'yellow'];
const HOME_POSITIONS = {
  red: [6, 2],
  blue: [2, 8],
  green: [8, 12],
  yellow: [12, 6]
};
const START_POSITIONS = {
  red: 0,
  blue: 13,
  green: 26,
  yellow: 39
};

const LudoGame = () => {
  const [board, setBoard] = useState({});
  const [turn, setTurn] = useState(COLORS[0]);
  const [diceRoll, setDiceRoll] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialBoard = {};
    COLORS.forEach(color => {
      initialBoard[color] = Array(4).fill(null);
    });
    setBoard(initialBoard);
    setTurn(COLORS[0]);
    setDiceRoll(null);
    setWinner(null);
  };

  const rollDice = () => {
    if (diceRoll !== null) return; // Dice has already been rolled
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    
    // Check if player has any valid moves
    const hasValidMove = board[turn].some((pos, index) => canMove(index, roll));
    if (!hasValidMove) {
      setTimeout(() => {
        setDiceRoll(null);
        setTurn(nextTurn(turn));
      }, 1000);
    }
  };

  const canMove = (pieceIndex, roll) => {
    const currentPos = board[turn][pieceIndex];
    if (currentPos === null && roll !== 6) return false;
    if (currentPos === null && roll === 6) return true;
    if (currentPos + roll > 51) return false; // Can't move beyond the final square
    return true;
  };

  const movePiece = (pieceIndex) => {
    if (diceRoll === null) return; // Dice hasn't been rolled yet
    if (!canMove(pieceIndex, diceRoll)) return; // Invalid move

    const newBoard = { ...board };
    let newPos = newBoard[turn][pieceIndex];

    if (newPos === null) {
      if (diceRoll === 6) {
        newPos = START_POSITIONS[turn];
      } else {
        return; // Can't move out unless rolling a 6
      }
    } else {
      newPos = (newPos + diceRoll) % 52; // Move around the board
    }

    // Check for capturing opponent pieces
    COLORS.forEach(color => {
      if (color !== turn) {
        newBoard[color] = newBoard[color].map(pos => pos === newPos ? null : pos);
      }
    });

    newBoard[turn][pieceIndex] = newPos;

    setBoard(newBoard);
    setDiceRoll(null);
    setTurn(nextTurn(turn));

    checkWinner(newBoard);
  };

  const checkWinner = (currentBoard) => {
    COLORS.forEach(color => {
      if (currentBoard[color].every(pos => pos !== null && pos > 51)) {
        setWinner(color);
      }
    });
  };

  const nextTurn = (currentTurn) => {
    const currentIndex = COLORS.indexOf(currentTurn);
    return COLORS[(currentIndex + 1) % COLORS.length];
  };

  const renderBoard = () => {
    const cells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let cellContent = null;
        let cellColor = 'bg-gray-100';

        // Render home bases
        COLORS.forEach(color => {
          const [homeX, homeY] = HOME_POSITIONS[color];
          if (i >= homeX && i < homeX + 2 && j >= homeY && j < homeY + 2) {
            cellColor = `bg-${color}-200`;
          }
        });

        // Render pieces
        COLORS.forEach(color => {
          board[color].forEach((pos, index) => {
            if (pos !== null) {
              const [x, y] = getCoordinates(pos, color);
              if (x === i && y === j) {
                cellContent = (
                  <div 
                    className={`w-4 h-4 rounded-full bg-${color}-500 border-2 border-${color}-700`}
                    onClick={() => movePiece(index)}
                  />
                );
              }
            }
          });
        });

        cells.push(
          <div key={`${i}-${j}`} className={`w-8 h-8 border border-gray-300 flex items-center justify-center ${cellColor}`}>
            {cellContent}
          </div>
        );
      }
    }
    return <div className="grid grid-cols-15 gap-0">{cells}</div>;
  };

  const getCoordinates = (position, color) => {
    // This is a simplified version. You'd need to implement the full Ludo board logic here.
    const baseX = HOME_POSITIONS[color][0];
    const baseY = HOME_POSITIONS[color][1];
    return [baseX + (position % 3), baseY + Math.floor(position / 3)];
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Dice6 className="mr-2" /> Ludo Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Badge variant="outline">Turn: {turn}</Badge>
          {diceRoll && <Badge variant="outline">Dice Roll: {diceRoll}</Badge>}
          {winner && <Badge variant="outline">Winner: {winner}</Badge>}
          <Button onClick={initializeGame} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        {renderBoard()}
        <div className="mt-4">
          <Button onClick={rollDice} disabled={diceRoll !== null || winner !== null}>
            Roll Dice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LudoGame;