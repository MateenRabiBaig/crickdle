import { useState } from 'react';

export default function SearchInput({ players, onGuess, disabled }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    if (val.length < 2) { setSuggestions([]); return; }
    const filtered = players
      .filter(p => p.name.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 6);
    setSuggestions(filtered);
  };

  const handleSelect = (player) => {
    setValue(player.name);
    setSuggestions([]);
  };

  const handleGuess = () => {
    const player = players.find(p =>
      p.name.toLowerCase() === value.toLowerCase()
    );
    if (!player) return;
    onGuess(player);
    setValue('');
    setSuggestions([]);
  };

  return (
    <div className="search-wrapper">
      <div className="flex-1 relative">
        <input
          className="search-input w-full"
          value={value}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && handleGuess()}
          placeholder="Type a player name..."
          disabled={disabled}
        />
        {suggestions.length > 0 && (
          <div className="autocomplete-list">
            {suggestions.map(p => (
              <div
                key={p.id}
                className="autocomplete-item"
                onMouseDown={() => handleSelect(p)}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="guess-btn"
        onClick={handleGuess}
        disabled={disabled}
      >
        Guess
      </button>
    </div>
  );
}