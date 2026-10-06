# AI/ML Academy

A standalone, offline course that takes a beginner from their first line of Python to building and
deploying AI/ML applications with OpenAI and AWS. Everything is taught inside the app: explanations,
diagrams, tested code, exercises with worked solutions, and graded quizzes.

## Open it

Double-click `index.html` (works from `file://` in any modern browser), or serve it:

```bash
cd lms && python3 -m http.server 8080   # then open http://localhost:8080
```

Progress (completed lessons, best quiz scores, last lesson) is stored in your browser's `localStorage`.

## Learning path

| # | Track | Level | Lessons |
|---|-------|-------|---------|
| 1 | Python Programming Fundamentals (incl. CLI, Git, HTTP/JSON, Docker) | Beginner | 26 |
| 2 | Python for Data & AI + Math Foundations (NumPy, Pandas, plots, linear algebra, calculus, probability) | Beginner → Intermediate | 17 |
| 3 | Machine Learning Fundamentals (scikit-learn, evaluation, pipelines, serving with FastAPI) | Beginner → Intermediate | 22 |
| 4 | Deep Learning, NLP & LLM Foundations (PyTorch, CNNs, embeddings, attention, transformers) | Intermediate | 22 |
| 5 | Production ML Systems & MLOps (based on *Designing Machine Learning Systems*) | Intermediate | 20 |
| 6 | AI Engineering with Foundation Models (based on *AI Engineering* and *Generative AI on AWS*) | Advanced | 20 |
| 7 | Building & Deploying AI Apps with OpenAI | Intermediate → Advanced | 22 |
| 8 | Building & Deploying AI/ML on AWS (IAM, S3, SageMaker AI, Bedrock, Lambda, ECS) | Intermediate → Advanced | 22 |
| 9 | Capstone Projects: churn service, OpenAI document Q&A, serverless RAG on AWS | Advanced | 9 |

Totals: 52 modules, 180 lessons, 787 quiz questions, ~195,000 words, 42 diagrams.

## Structure

- `index.html` — app shell; loads every content file, then `js/app.js`
- `js/app.js` — router, sidebar, lesson renderer, quiz grading, code copy + highlighting, search, progress
- `js/content/NN-*.js` — one file per track; each calls `window.COURSE.tracks.push({...})`
  (tracks → modules → lessons with `body`, `objectives`, `keyPoints`, `exercise`, `quiz`, `furtherReading`)
- `css/style.css` — light/dark themes, responsive layout
- `assets/diagrams/*.svg` — original concept diagrams

## How the content was verified

- Every Python code block was syntax-checked, and every block marked **✓ tested** (731 of 855) was executed
  with Python 3.12 (numpy, pandas 3, scikit-learn 1.9, PyTorch, openai 3.22, boto3 1.43, FastAPI); shown
  outputs come from real runs.
- OpenAI and AWS code that needs credentials is checked against the installed SDKs; offline tests use mocks,
  FastAPI's TestClient, and botocore's Stubber (which validates requests/responses against the real AWS schemas).
  OpenAI/AWS lessons were written against the official docs as of October 2026 — model names and services change,
  so the lessons tell learners where to check current values.
- Every page and lesson was traversed with Playwright (desktop, mobile, dark mode): no broken images or links,
  no covered text, no horizontal scrolling, no console errors. Diagrams were rendered and inspected.

## Adding or editing content

Edit the relevant `js/content/NN-*.js` file. Body fields are `String.raw` template literals: HTML-escape `<`, `>`
and `&` inside code, never use a backtick or `${` inside them, and mark self-contained Python examples
`<pre><code class="lang-python runnable">` so they can be re-executed when validating.
