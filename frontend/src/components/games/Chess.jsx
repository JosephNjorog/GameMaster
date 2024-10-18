import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, RotateCcw, Save } from 'lucide-react';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState([]);

  useEffect(() => {
    const savedGame = localStorage.getItem('savedChessGame');
    if (savedGame) {
      const loadedGame = new Chess();
      loadedGame.load(savedGame);
      setGame(loadedGame);
      updateMoveHistory(loadedGame);
    }
  }, []);

  const updateMoveHistory = (currentGame) => {
    setMoveHistory(currentGame.history({ verbose: true }));
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });

    if (move === null) return false; // illegal move
    setGame(new Chess(game.fen()));
    updateMoveHistory(game);
    return true;
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    updateMoveHistory(newGame);
  };

  const undoMove = () => {
    const newGame = new Chess(game.fen());
    newGame.undo();
    setGame(newGame);
    updateMoveHistory(newGame);
  };

  const saveGame = () => {
    localStorage.setItem('savedChessGame', game.fen());
    alert('Game saved successfully!');
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Chess Game</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onDrop}
              boardWidth={400}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Game Info</h3>
            <p>Turn: <Badge variant="outline">{game.turn() === 'w' ? 'White' : 'Black'}</Badge></p>
            <p>Status: <Badge variant="outline">{game.isCheckmate() ? 'Checkmate' : game.isCheck() ? 'Check' : 'Ongoing'}</Badge></p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Move History</h4>
              <div className="h-48 overflow-y-auto border rounded p-2">
                {moveHistory.map((move, index) => (
                  <div key={index} className="text-sm">
                    {index % 2 === 0 ? `${Math.floor(index/2) + 1}. ` : ''}{move.san}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 space-x-2">
              <Button onClick={resetGame} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> New Game
              </Button>
              <Button onClick={undoMove} variant="outline" disabled={moveHistory.length === 0}>
                <RotateCcw className="mr-2 h-4 w-4" /> Undo
              </Button>
              <Button onClick={saveGame} variant="outline">
                <Save className="mr-2 h-4 w-4" /> Save Game
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChessGame;