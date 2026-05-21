import GuessRow from './GuessRow';

const LABELS = ['Player', 'Age', 'Country', 'Role', 'Bat Style', 'Bowl Style', 'IPL Team'];
const MAX = 6;

export default function GuessGrid({ guesses, target }) {
  return (
    <div className="guess-grid">
      <div className="col-headers">
        {LABELS.map(l => (
          <div key={l} className="col-header">{l}</div>
        ))}
      </div>
      {Array.from({ length: MAX }).map((_, i) => (
        <GuessRow key={i} guess={guesses[i] || null} target={target} />
      ))}
    </div>
  );
}