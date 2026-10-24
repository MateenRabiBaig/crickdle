# Crickdle

Crickdle is a Wordle-inspired cricket player guessing game built with React. Identify the mystery player in up to six guesses using clues for their age, country, role, batting style, bowling style, and IPL team.

## Features

- Six guesses per game
- Player-name autocomplete search
- Instant clue feedback for every player attribute
- Exact, close, and incorrect clue states
- Age hints showing whether a guess is higher or lower than the answer
- Answer reveal and one-click new game flow
- Responsive layout styled with Tailwind CSS

## How to play

1. Start typing a cricket player's name in the search field.
2. Select a player from the suggestions or enter the full name.
3. Press **Guess** or hit **Enter**.
4. Use the colored cells to narrow down the answer:
   - **Green**: the value is correct.
   - **Amber**: the value is close. For age, the arrows indicate whether the answer is higher or lower; batting and bowling styles are compared by their primary style.
   - **Gray**: the value does not match.
5. Solve the puzzle within six guesses, then start a new game when the answer is revealed.

## Tech stack

- React 19
- Create React App / `react-scripts`
- Axios for API requests
- Tailwind CSS with PostCSS
- Testing Library and Jest

## Getting started

### Prerequisites

- Node.js and npm
- A running Crickdle API that provides the player endpoints described below

### Installation

```bash
npm install
```

Create a `.env` file in the project root and set the API base URL:

```env
REACT_APP_API_URL=http://localhost:8000
```

Then start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API requirements

The frontend reads the API base URL from `REACT_APP_API_URL` and calls:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/players/random` | Returns the mystery player |
| `GET` | `/api/v1/players` | Returns the searchable player list |

Both endpoints are expected to return a response shaped like:

```json
{
  "data": {}
}
```

Each player should include these fields:

```text
id, name, age, country, role, batting_style, bowling_style, ipl_team
```

`ipl_team` may be empty when a player has not represented an IPL team.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm test` | Runs the test suite in watch mode. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run eject` | Ejects from Create React App. This is irreversible. |

## Project structure

```text
src/
├── components/
│   ├── Game.jsx          # Game state and gameplay flow
│   ├── GuessGrid.jsx     # Six-row clue grid
│   ├── GuessRow.jsx      # Per-field guess evaluation
│   └── SearchInput.jsx   # Player search and autocomplete
├── services/
│   └── api.js            # Backend API client
├── App.js                # Application entry component
├── App.css               # App-level styles
└── index.css             # Tailwind and game styles
```

## Building for production

```bash
npm run build
```

Deploy the generated `build/` directory to a static hosting provider. Make sure `REACT_APP_API_URL` is configured at build time so the deployed frontend can reach the player API.

## License

No license has been specified yet.
