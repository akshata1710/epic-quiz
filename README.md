#  Math Quiz Generator

An AI-powered quiz generator built for K–8 math educators. Enter any topic or upload a worksheet and instantly get a structured, Google Forms-style quiz with multiple choice, true/false, and short answer questions — complete with answer scoring and explanations.

Built as a portfolio project aligned with [Epic Kids'](https://www.getepic.com/) mission to make learning engaging for every child.

---

## Live Demo

[View on Vercel →](https://your-vercel-url.vercel.app)

---

## Features

- **AI-generated questions** powered by the Anthropic Claude API
- **File upload** — upload a PDF, image, or text worksheet and generate questions from it
- **Grade targeting** — 5th, 6th, and 7th grade math
- **Math topic selection** — Number sense & fractions, Algebra & equations, Geometry & measurement, Statistics & probability
- **Difficulty levels** — Easy, Medium, and Hard (adjusts question complexity in the prompt)
- **Question types** — Multiple choice, True/False, and Short answer
- **Live scoring** — submit answers and get instant results with explanations for each question
- **Responsive UI** — clean, kid-friendly interface built with React and CSS Modules

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | CSS Modules |
| AI | Anthropic Claude API (`claude-sonnet-4-5`) |
| API proxy | Vite dev server proxy (resolves CORS) |
| Deployment | Vercel |
| Version control | Git, GitHub |

---

## Project Structure

```
epic-quiz/
├── src/
│   ├── api.js                  ← Claude API call + file reader utility
│   ├── App.jsx                 ← Top-level state management
│   ├── components/
│   │   ├── ConfigPanel.jsx     ← Topic input, grade, difficulty, file upload
│   │   ├── QuizForm.jsx        ← Renders question list + submit logic
│   │   ├── QuestionCard.jsx    ← Single question with options + feedback
│   │   └── ScoreBanner.jsx     ← Score display after submission
│   └── main.jsx
├── vite.config.js              ← Vite proxy config for CORS
├── .env                        ← API key (never committed)
└── package.json
```

---

## Running Locally

### Prerequisites

- Node.js v18 or higher
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/akshata1710/epic-quiz.git
cd epic-quiz

# 2. Install dependencies
npm install

# 3. Create your environment file
echo "VITE_ANTHROPIC_KEY=sk-ant-your-key-here" > .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The Vite proxy in `vite.config.js` forwards `/api` requests to `https://api.anthropic.com`,
> resolving CORS for local development. Your API key is never exposed in the browser.

---

## How It Works

1. The user fills out the config form — topic or uploaded file, grade level, math topic, difficulty, question count, and question types
2. `ConfigPanel.jsx` calls `generateQuiz()` in `api.js` with those parameters
3. `api.js` builds a structured prompt and sends it to the Claude API via the Vite proxy
4. Claude returns a JSON object with title, description, and an array of questions
5. `App.jsx` receives the parsed quiz and switches to the quiz view
6. `QuizForm.jsx` renders each `QuestionCard`, tracks answers in state, and scores on submit
7. `ScoreBanner.jsx` displays the final score with a message

---

## Key Engineering Decisions

**Vite proxy for CORS** — Calling the Anthropic API directly from the browser is blocked by CORS. Rather than building a separate backend server, the Vite dev server proxy forwards `/api/*` requests to `https://api.anthropic.com`, keeping the setup simple for a frontend-only project.

**Lifted state in App.jsx** — All shared state (current step, quiz data, loading, error) lives in `App.jsx` and is passed down as props. This mirrors the unidirectional data flow pattern used in Angular and React applications at scale.

**Separation of API logic** — The Claude API call lives in `api.js`, separate from the UI components. This makes it easy to swap the API layer, add error handling, or move to a backend proxy without touching component code.

**Secure API key management** — The API key is stored in `.env`, added to `.gitignore`, and accessed via `import.meta.env.VITE_ANTHROPIC_KEY`. The git history was rewritten using `git filter-branch` after an accidental commit to remove the secret entirely.

---

## Deployment

The app is deployed on Vercel with automatic deployments from the `main` branch.

To deploy your own:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Add `VITE_ANTHROPIC_KEY` as an Environment Variable in your Vercel project settings before deploying.

---

## What I Learned

- React component architecture and unidirectional data flow with `useState`
- Integrating a third-party REST API with proper error handling and JSON parsing
- Resolving CORS in a frontend-only project using a Vite proxy
- Securing API keys with environment variables and `.gitignore`
- Rewriting git history to remove accidentally committed secrets (`git filter-branch`)
- Deploying a Vite + React app to Vercel with environment variable configuration
- File reading with the `FileReader` API for PDF and image upload support

---

## Author

**Akshata Shinde**
[github.com/akshata1710](https://github.com/akshata1710) · [linkedin.com/in/akshata-shinde1718](https://linkedin.com/in/akshata-shinde1718/)

---

## License

MIT
