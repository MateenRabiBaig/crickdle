const FIELDS = ['name', 'age', 'country', 'role', 'batting_style', 'bowling_style', 'ipl_team'];

function evaluate(guess, target) {
  return FIELDS.map(f => {
    const gv = guess[f], tv = target[f];
    if (f === 'age') {
      if (gv === tv) return 'correct';
      if (Math.abs(gv - tv) <= 3) return 'partial';
      return 'wrong';
    }
    if (f === 'batting_style' || f === 'bowling_style') {
      if (gv === tv) return 'correct';
      if (gv && tv && gv.split('-')[0] === tv.split('-')[0]) return 'partial';
      return 'wrong';
    }
    if (gv === tv) return 'correct';
    return 'wrong';
  });
}

export default function GuessRow({ guess, target }) {
  const results = guess ? evaluate(guess, target) : null;

  return (
    <div className="guess-row">
      {FIELDS.map((f, i) => {
        const status = results ? results[i] : 'empty';
        let val = '';
        if (guess) {
          val = guess[f] ?? '—';
          if (f === 'age' && status === 'partial') {
            val += guess[f] > target[f] ? ' ↓' : ' ↑';
          }
        }
        return (
          <div key={f} className={`guess-cell ${status}`}>
            {val}
          </div>
        );
      })}
    </div>
  );
}