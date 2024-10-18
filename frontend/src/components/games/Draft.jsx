import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Crown } from 'lucide-react';

const DraftGame = () => {
  const initialBoardState = Array(8).fill(null).map(() => Array(8).fill(null));
  const [board, setBoard] = useState(initialBoardState);
  const [turn, setTurn] = useState('white');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = initialBoardState.map((row, i) => 
      row.map((col, j) => {
        if (i < 3 && (i + j) % 2 === 1) return 'white';
        if (i > 4 && (i + j) % 2 === 1) return 'black';
        return null;
      })
    );
    setBoard(newBoard);
    setTurn('white');
    setSelectedPiece(null);
    setWinner(null);
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const dx = Math.abs(toCol - fromCol);
    const dy = toRow - fromRow;
    const piece = board[fromRow][fromCol];

    if (piece === turn && !board[toRow][toCol]) {
      if (piece === 'white' && dy === 1 && dx === 1) return true;
      if (piece === 'black' && dy === -1 && dx === 1) return true;
      if (Math.abs(dy) === 2 && dx === 2) {
        const midRow = (fromRow + toRow) / 2;
        const midCol = (fromCol + toCol) / 2;
        return board[midRow][midCol] && board[midRow][midCol] !== piece;
      }
    }
    return false;
  };

  const movePiece = (toRow, toCol) => {
    if (!selectedPiece || !isValidMove(selectedPiece.row, selectedPiece.col, toRow, toCol)) {
      setSelectedPiece(null);
      return;
    }

    const newBoard = board.map(row => [...row]);
    newBoard[toRow][toCol] = newBoard[selectedPiece.row][selectedPiece.col];
    newBoard[selectedPiece.row][selectedPiece.col] = null;

    if (Math.abs(toRow - selectedPiece.row) === 2) {
      const midRow = (selectedPiece.row + toRow) / 2;
      const midCol = (selectedPiece.col + toCol) / 2;
      newBoard[midRow][midCol] = null;
    }

    setBoard(newBoard);
    setTurn(turn === 'white' ? 'black' : 'white');
    setSelectedPiece(null);

    checkWinner(newBoard);
  };

  const checkWinner = (currentBoard) => {
    const hasWhite = currentBoard.some(row => row.includes('white'));
    const hasBlack = currentBoard.some(row => row.includes('black'));
    if (!hasWhite) setWinner('black');
    if (!hasBlack) setWinner('white');
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
    const isValidMoveSquare = selectedPiece && isValidMove(selectedPiece.row, selectedPiece.col, row, col);

    return (
      <div
        key={`${row}-${col}`}
        className={`w-12 h-12 flex items-center justify-center border border-gray-300
                    ${(row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                    ${isValidMoveSquare ? 'ring-2 ring-green-500' : ''}`}
        onClick={() => piece && turn === piece ? setSelectedPiece({ row, col }) : movePiece(row, col)}
      >
        {piece && (
          <div className={`w-8 h-8 rounded-full ${piece === 'white' ? 'bg-white' : 'bg-black'}`} />
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Crown className="mr-2" /> Draft Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Badge variant="outline">Turn: {turn}</Badge>
          {winner && <Badge variant="outline">Winner: {winner}</Badge>}
          <Button onClick={initializeBoard} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        <div className="inline-block border-2 border-gray-300">
          {board.map((row, i) => (
            <div key={i} className="flex">
              {row.map((_, j) => renderSquare(i, j))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraftGame;