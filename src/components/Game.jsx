import { useState, useEffect } from 'react';
import { getRandomPlayer, getAllPlayers } from '../services/api';
import GuessGrid from './GuessGrid';
import SearchInput from './SearchInput';

const MAX = 6;

export default function Game() {
  const [target, setTarget] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const initGame = async () => {
    setLoading(true);
    setGuesses([]);
    setGameOver(false);
    setWon(false);
    setMessage('');
    const [random, all] = await Promise.all([
      getRandomPlayer(),
      getAllPlayers()
    ]);
    setTarget(random);
    setAllPlayers(all);
    setLoading(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleGuess = (player) => {
    if (gameOver) return;
    if (guesses.find(g => g.id === player.id)) {
      setMessage('Already guessed that player!');
      return;
    }
    const newGuesses = [...guesses, player];
    setGuesses(newGuesses);

    if (player.id === target.id) {
      setWon(true);
      setGameOver(true);
      setMessage(`🎉 Correct in ${newGuesses.length} guess${newGuesses.length > 1 ? 'es' : ''}!`);
    } else if (newGuesses.length >= MAX) {
      setGameOver(true);
      setMessage(`Out of chances! The answer was ${target.name}`);
    } else {
      setMessage(`${MAX - newGuesses.length} chances remaining`);
    }
  };

  if (loading) return (
    <div className="loading-screen">Loading Crickdle...</div>
  );

  return (
    <div className="game-wrapper">
      <div className="mb-6">
        <h1 className="game-title">
          CRICK<span>DLE</span>
        </h1>
        <p className="game-subtitle">
          Guess the mystery cricket player in 6 chances
        </p>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot correct"></div> Correct
        </div>
        <div className="legend-item">
          <div className="legend-dot partial"></div> Close
        </div>
        <div className="legend-item">
          <div className="legend-dot wrong"></div> Wrong
        </div>
      </div>

      <div className="chances-bar">
        {Array.from({ length: MAX }).map((_, i) => (
          <div key={i} className={`chance-dot ${i < guesses.length ? 'used' : i === guesses.length ? 'active' : ''}`} />
        ))}
      </div>

      <GuessGrid guesses={guesses} target={target} />

      <div className={`game-message ${won ? 'win' : gameOver ? 'lose' : ''}`}>
        {message || 'Type a player name to start guessing'}
      </div>

      <SearchInput
        players={allPlayers.filter(p => !guesses.find(g => g.id === p.id))}
        onGuess={handleGuess}
        disabled={gameOver}
      />

      {gameOver && (
        <div className="reveal-card">
          <div className="reveal-label">The answer was</div>
          <div className="reveal-name">{target.name}</div>
          <div className="reveal-details">
            {target.age} yrs · {target.country} · {target.role} · {target.batting_style} · {target.bowling_style} · IPL: {target.ipl_team || 'None'}
          </div>
          <button className="new-game-btn" onClick={initGame}>
            New Game ↺
          </button>
        </div>
      )}
    </div>
  );
}