import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
import Badge from '../../components/ui/badge';
import Input from '../../components/ui/input';
import CardHeader from '../../components/ui/CardHeader';
import CardTitle from '../../components/ui/CardTitle';
import CardContent from '../../components/ui/CardContent';
import { RefreshCw, Check, Timer } from 'lucide-react';

const BOARD_SIZE = 15;
const LETTER_SCORES = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const SPECIAL_SQUARES = {
  DL: [[1,1], [1,13], [3,7], [3,9], [7,3], [7,11], [9,3], [9,11], [13,1], [13,13]],
  TL: [[5,5], [5,9], [9,5], [9,9]],
  DW: [[1,1], [1,13], [13,1], [13,13]],
  TW: [[0,0], [0,7], [0,14], [7,0], [7,14], [14,0], [14,7], [14,14]]
};

const TURN_TIME = 60; // seconds

const ScrabbleGame = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', rack: [], score: 0 },
    { id: 2, name: 'Player 2', rack: [], score: 0 }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [timer, setTimer] = useState(TURN_TIME);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          endTurn();
          return TURN_TIME;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayerIndex]);

  const initializeGame = () => {
    setBoard(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
    setPlayers(players.map(player => ({ ...player, rack: drawTiles(7), score: 0 })));
    setCurrentPlayerIndex(0);
    setCurrentWord([]);
    setSelectedTile(null);
    setTimer(TURN_TIME);
  };

  const drawTiles = (count) => {
    const tiles = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ';
    return Array(count).fill().map(() => tiles[Math.floor(Math.random() * tiles.length)]);
  };

  const placeTile = (row, col) => {
    if (!selectedTile || board[row][col]) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = selectedTile;
    setBoard(newBoard);

    setCurrentWord([...currentWord, { letter: selectedTile, row, col }]);
    
    const currentPlayer = { ...players[currentPlayerIndex] };
    currentPlayer.rack = currentPlayer.rack.filter((_, i) => i !== currentPlayer.rack.indexOf(selectedTile));
    
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex] = currentPlayer;
    setPlayers(newPlayers);
    
    setSelectedTile(null);
  };

  const handleSubmitWord = () => {
    if (currentWord.length < 2) {
      alert("Word must be at least 2 letters long");
      return;
    }

    const wordScore = calculateScore(currentWord);
    const currentPlayer = { ...players[currentPlayerIndex] };
    currentPlayer.score += wordScore;
    currentPlayer.rack = [...currentPlayer.rack, ...drawTiles(currentWord.length)];

    const newPlayers = [...players];
    newPlayers[currentPlayerIndex] = currentPlayer;
    setPlayers(newPlayers);

    setCurrentWord([]);
    endTurn();
  };

  const calculateScore = (word) => {
    let wordMultiplier = 1;
    let score = word.reduce((total, { letter, row, col }) => {
      let letterScore = LETTER_SCORES[letter];
      const squareType = getSpecialSquareType(row, col);
      
      if (squareType === 'DL') letterScore *= 2;
      if (squareType === 'TL') letterScore *= 3;
      if (squareType === 'DW') wordMultiplier *= 2;
      if (squareType === 'TW') wordMultiplier *= 3;

      return total + letterScore;
    }, 0);

    return score * wordMultiplier;
  };

  const getSpecialSquareType = (row, col) => {
    for (const [type, squares] of Object.entries(SPECIAL_SQUARES)) {
      if (squares.some(([r, c]) => r === row && c === col)) {
        return type;
      }
    }
    return null;
  };

  const endTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setTimer(TURN_TIME);
  };

  const renderBoard = () => {
    return board.map((row, i) => (
      <div key={i} className="flex">
        {row.map((cell, j) => {
          const specialSquare = getSpecialSquareType(i, j);
          return (
            <div
              key={j}
              className={`w-8 h-8 border border-gray-300 flex items-center justify-center 
                          ${specialSquare ? `bg-${getSpecialSquareColor(specialSquare)}` : 
                            (i + j) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-200'}`}
              onClick={() => placeTile(i, j)}
            >
              {cell ? (
                <div className="w-7 h-7 bg-yellow-400 rounded flex items-center justify-center font-bold">
                  {cell}
                </div>
              ) : (
                <span className="text-xs font-bold">{getSpecialSquareText(specialSquare)}</span>
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  const getSpecialSquareColor = (type) => {
    switch (type) {
      case 'DL': return 'blue-200';
      case 'TL': return 'blue-400';
      case 'DW': return 'red-200';
      case 'TW': return 'red-400';
      default: return '';
    }
  };

  const getSpecialSquareText = (type) => {
    switch (type) {
      case 'DL': return 'DL';
      case 'TL': return 'TL';
      case 'DW': return 'DW';
      case 'TW': return 'TW';
      default: return '';
    }
  };

  const renderRack = () => {
    const currentPlayer = players[currentPlayerIndex];
    return (
      <div className="flex space-x-2 mt-4">
        {currentPlayer.rack.map((letter, index) => (
          <Button
            key={index}
            variant={selectedTile === letter ? "secondary" : "outline"}
            className="w-10 h-10"
            onClick={() => setSelectedTile(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          Scrabble Game
          <Badge variant="outline" className="ml-2">
            <Timer className="mr-2 h-4 w-4" />
            {timer}s
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          {players.map((player, index) => (
            <Badge key={player.id} variant={index === currentPlayerIndex ? "default" : "outline"}>
              {player.name}: {player.score}
            </Badge>
          ))}
          <Button onClick={initializeGame} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        <div className="mb-4">{renderBoard()}</div>
        {renderRack()}
        <div className="mt-4 flex space-x-2">
          <Button onClick={handleSubmitWord} disabled={currentWord.length === 0}>
            <Check className="mr-2 h-4 w-4" /> Submit Word
          </Button>
          <Button onClick={endTurn} variant="secondary">
            Skip Turn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrabbleGame;