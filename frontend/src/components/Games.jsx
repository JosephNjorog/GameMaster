import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  return (
    <div className="games-container">
      <h1>Choose a Game</h1>
      <ul className="games-list">
        <li>
          <h2>Chess</h2>
          <p>Chess is a strategic board game played between two players. The objective is to checkmate the opponent's king.</p>
          <Link to="/games/chess">Learn How to Play</Link>
        </li>
        <li>
          <h2>Ludo</h2>
          <p>Ludo is a fun and exciting board game where players race their tokens from start to finish according to die rolls.</p>
          <Link to="/games/ludo">Learn How to Play</Link>
        </li>
        <li>
          <h2>Scrabble</h2>
          <p>Scrabble is a word game where players create words on a board using letter tiles, scoring points based on the letters used.</p>
          <Link to="/games/scrabble">Learn How to Play</Link>
        </li>
        <li>
          <h2>Draft</h2>
          <p>Draft is a strategy card game where players use their cards to compete against each other.</p>
          <Link to="/games/draft">Learn How to Play</Link>
        </li>
      </ul>
    </div>
  );
};

export default Games;
