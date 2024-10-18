import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
import Badge from '../../components/ui/badge';
import Input from '../../components/ui/input';
import CardHeader from '../../components/ui/CardHeader';
import CardTitle from '../../components/ui/CardTitle';
import CardContent from '../../components/ui/CardContent';
import { Dice6, RefreshCw, Rocket, Star } from 'lucide-react';

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

const PLANET_NAMES = {
  red: 'Mars',
  blue: 'Neptune',
  green: 'Earth',
  yellow: 'Venus'
};

const SpaceLudoGame = () => {
  const [board, setBoard] = useState({});
  const [turn, setTurn] = useState(COLORS[0]);
  const [diceRoll, setDiceRoll] = useState(null);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({});

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialBoard = {};
    const initialNames = {};
    COLORS.forEach(color => {
      initialBoard[color] = Array(4).fill(null);
      initialNames[color] = PLANET_NAMES[color];
    });
    setBoard(initialBoard);
    setPlayerNames(initialNames);
    setTurn(COLORS[0]);
    setDiceRoll(null);
    setWinner(null);
  };

  const rollDice = () => {
    if (diceRoll !== null) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

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
    if (currentPos + roll > 51) return false;
    return true;
  };

  const movePiece = (pieceIndex) => {
    if (diceRoll === null) return;
    if (!canMove(pieceIndex, diceRoll)) return;

    const newBoard = { ...board };
    let newPos = newBoard[turn][pieceIndex];

    if (newPos === null) {
      if (diceRoll === 6) {
        newPos = START_POSITIONS[turn];
      } else {
        return;
      }
    } else {
      newPos = (newPos + diceRoll) % 52;
    }

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
        let cellColor = 'bg-gray-800';

        COLORS.forEach(color => {
          const [homeX, homeY] = HOME_POSITIONS[color];
          if (i >= homeX && i < homeX + 2 && j >= homeY && j < homeY + 2) {
            cellColor = `bg-${color}-900`;
          }
        });

        COLORS.forEach(color => {
          if (board[color]) {
            board[color].forEach((pos, index) => {
              if (pos !== null) {
                const [x, y] = getCoordinates(pos, color);
                if (x === i && y === j) {
                  cellContent = (
                    <div
                      className={`w-full h-full rounded-full bg-${color}-500 border-2 border-${color}-300 flex items-center justify-center cursor-pointer transition-transform hover:scale-110`}
                      onClick={() => movePiece(index)}
                    >
                      <Rocket className="w-3/4 h-3/4 text-white" />
                    </div>
                  );
                }
              }
            });
          }
        });

        cells.push(
          <div key={`${i}-${j}`} className={`w-8 h-8 border border-gray-700 flex items-center justify-center ${cellColor}`}>
            {cellContent}
            {(i + j) % 5 === 0 && !cellContent && <Star className="w-3 h-3 text-yellow-200 opacity-30" />}
          </div>
        );
      }
    }
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-space-background opacity-20"></div>
        <div className="grid grid-cols-15 gap-0 bg-black p-4 rounded-lg shadow-lg relative z-10">
          {cells}
        </div>
      </div>
    );
  };

  const getCoordinates = (position, color) => {
    const baseX = HOME_POSITIONS[color][0];
    const baseY = HOME_POSITIONS[color][1];
    return [baseX + (position % 3), baseY + Math.floor(position / 3)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <Card className="max-w-4xl mx-auto bg-gray-800 text-white">
        <CardHeader className="bg-gray-900">
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            <span className="flex items-center">
              <Star className="mr-2 text-yellow-400" /> Space Ludo
            </span>
            <Button onClick={initializeGame} variant="outline" className="bg-gray-700 hover:bg-gray-600">
              <RefreshCw className="mr-2 h-4 w-4" /> New Game
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <Badge variant="outline" className="text-lg py-2 px-4 bg-gray-700">
              Turn: <span className={`text-${turn}-400 font-bold`}>{playerNames[turn]}</span>
            </Badge>
            {diceRoll && (
              <Badge variant="outline" className="text-lg py-2 px-4 bg-gray-700">
                Dice Roll: <span className="font-bold text-yellow-400">{diceRoll}</span>
              </Badge>
            )}
            {winner && (
              <Badge variant="outline" className="text-lg py-2 px-4 bg-green-900">
                Winner: <span className={`text-${winner}-400 font-bold`}>{playerNames[winner]}</span>
              </Badge>
            )}
          </div>
          {renderBoard()}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={rollDice}
              disabled={diceRoll !== null || winner !== null}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 text-lg"
            >
              <Dice6 className="mr-2 h-6 w-6" /> Roll Dice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceLudoGame;