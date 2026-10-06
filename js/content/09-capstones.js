window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "capstone",
  order: 9,
  title: "Capstone Projects: Build and Ship",
  level: "Advanced",
  icon: "🚀",
  description: "Three end-to-end projects that combine everything in the course: a classical ML prediction service, a document Q&A assistant on OpenAI, and a serverless RAG API on AWS.",
  outcomes: [
    "Plan an AI/ML project from a business brief to a deployed, tested service",
    "Build, evaluate and serve a scikit-learn model behind a validated REST API",
    "Build a grounded, citation-producing document assistant with the OpenAI API",
    "Deploy a serverless retrieval-augmented API on AWS with Bedrock Knowledge Bases, Lambda and API Gateway",
    "Present your work as a portfolio with architecture notes, evaluation results and an operations plan"
  ],
  modules: [
    {
      id: "cap-intro",
      title: "Before You Start",
      summary: "How to approach a capstone like a professional AI engineer.",
      lessons: [
        {
          id: "cap-intro-approach",
          title: "How to Run a Capstone Project",
          minutes: 30,
          objectives: [
            "Break a project into thin, shippable slices instead of one big build",
            "Set up a repository layout that separates training, serving, tests and infrastructure",
            "Define \"done\" with measurable acceptance criteria before writing code",
            "Use the capstone rubric to assess your own work"
          ],
          body: String.raw`
<p>You now know the pieces: Python, data handling, models, evaluation, LLMs, retrieval, and two cloud platforms. A capstone is where you prove you can put the pieces together <em>without a lesson telling you each next step</em>. That is exactly what a job feels like, so treat these projects as rehearsals for real work rather than homework.</p>

<h3>The professional workflow</h3>
<p>Beginners usually try to build everything at once and then debug a giant tangle. Experienced engineers build a <strong>thin vertical slice</strong> first: the simplest possible version that runs end to end — data in, prediction out, through the real interface — and then improve one part at a time. If your churn model is a hard-coded rule returning 0.5 but it is already served by your API with a passing test, you have a working system you can improve safely. Every capstone below follows the same six steps:</p>
<ol>
  <li><strong>Read the brief and restate the goal</strong> in one sentence of business language and one sentence of ML language. (Track 5: framing ML problems.)</li>
  <li><strong>Write acceptance criteria</strong> — numbers you can check, such as "ROC-AUC ≥ 0.80 on the held-out test set" or "answers cite at least one source; says 'I don't know' for out-of-scope questions in 9 of 10 test cases".</li>
  <li><strong>Build the thin slice</strong>: a baseline model or a stub LLM call, the API, and one automated test.</li>
  <li><strong>Improve with evaluation</strong>: change one thing, re-run your evaluation, keep the change only if the numbers improve. (Track 3: evaluation; Track 6: evaluation pipelines.)</li>
  <li><strong>Deploy</strong> using the platform from the matching track, with secrets outside the code.</li>
  <li><strong>Document and plan operations</strong>: what you would monitor, when you would retrain or re-index, and what it costs per month.</li>
</ol>

<h3>A repository layout that scales</h3>
<p>Keep concerns in separate places so each can change independently. A layout that works for all three projects:</p>
<pre><code class="lang-text">my-capstone/
├── README.md            # problem, architecture diagram, how to run, results, next steps
├── requirements.txt     # pinned versions, e.g. scikit-learn==1.9.1
├── .env.example         # names of required environment variables, never real values
├── .gitignore           # includes .env, .venv/, __pycache__/, *.joblib
├── data/                # small sample data only; large data lives in object storage
├── src/
│   ├── train.py         # produces a versioned model artifact (or builds the search index)
│   ├── app.py           # the API: loads the artifact, validates input, returns predictions
│   └── config.py        # reads settings from environment variables
├── tests/
│   └── test_app.py      # runs offline: fake clients, no network, no keys
├── eval/
│   └── golden_set.jsonl # fixed evaluation examples with expected behaviour
└── infra/               # Dockerfile, SAM/CDK templates, deployment notes</code></pre>
<div class="callout warn"><strong>Security habit:</strong> create <code>.gitignore</code> <em>before</em> your first commit and put <code>.env</code> in it. A leaked API key in a public repository is usually found by automated scanners within minutes. If it happens, revoke the key immediately — deleting the commit is not enough.</div>

<h3>Definition of done</h3>
<p>A capstone is done when someone else could clone your repository, follow the README, run the tests, and reproduce your evaluation numbers. Concretely:</p>
<ul>
  <li>All tests pass with one command (<code>pytest</code>) and without internet access or credentials.</li>
  <li>The README states the acceptance criteria and your measured results next to them, honestly — including the ones you missed.</li>
  <li>The service validates its inputs and returns a clear error (HTTP 400 or 422) for bad requests instead of crashing.</li>
  <li>There is a short "operations" section: what you monitor, expected cost, and how to shut everything down.</li>
</ul>

<h3>Self-assessment rubric</h3>
<table>
  <thead><tr><th>Area</th><th>Developing</th><th>Proficient</th><th>Excellent</th></tr></thead>
  <tbody>
    <tr><td>Problem framing</td><td>Goal is vague</td><td>Clear business and ML objective</td><td>Also states costs of each error type and how they shape the metric</td></tr>
    <tr><td>Data &amp; evaluation</td><td>Single accuracy number</td><td>Held-out test set, appropriate metric</td><td>Cross-validation, slice analysis, baseline comparison</td></tr>
    <tr><td>Engineering</td><td>Notebook only</td><td>API with validation and tests</td><td>Container, CI-ready tests, configuration by environment</td></tr>
    <tr><td>Deployment &amp; ops</td><td>Runs locally</td><td>Deployed with secrets handled safely</td><td>Monitoring plan, cost estimate, cleanup instructions</td></tr>
    <tr><td>Communication</td><td>Little documentation</td><td>README explains how to run it</td><td>README tells the story: decisions, trade-offs, results, next steps</td></tr>
  </tbody>
</table>
<p>Aim for "Proficient" everywhere before chasing "Excellent" in any single row. A modest model with excellent engineering and honest evaluation is far more impressive to an employer than a fancy model nobody can run.</p>

<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em> (Ch. 2) describes ML development as an iterative loop rather than a straight line, and <em>AI Engineering</em> (Ch. 10) stresses starting with the simplest architecture and adding components only when evaluation shows you need them. The thin-slice approach is that advice in practice.</div>
`,
          keyPoints: [
            "Build a thin end-to-end slice first, then improve one component at a time",
            "Write measurable acceptance criteria before coding",
            "Separate training, serving, tests, evaluation data and infrastructure in your repository",
            "Tests must run offline with fake clients; secrets never enter git",
            "Done means someone else can reproduce your results from the README"
          ],
          exercise: {
            prompt: String.raw`<p>Before starting Capstone 1, write the README skeleton for it: a one-line business goal, a one-line ML goal, three acceptance criteria with numbers, and the headings you will fill in later.</p>`,
            solution: String.raw`<pre><code class="lang-text"># Churn Prediction Service
Business goal: identify customers likely to cancel next month so the retention team can contact them first.
ML goal: binary classifier that outputs P(churn) for each active customer.

## Acceptance criteria
1. ROC-AUC >= 0.80 on a stratified 20% held-out test set
2. Recall >= 0.65 for the churn class at the chosen threshold (missing a churner costs more than a wasted call)
3. POST /predict returns in < 200 ms locally and rejects invalid input with HTTP 422

## Architecture
## Data
## Model and evaluation results
## How to run (train, test, serve)
## Operations: monitoring, retraining, cost, shutdown
## Next steps</code></pre><p>Notice criterion 2 encodes a business judgement (false negatives are expensive) into a measurable number — that is the habit Track 3's evaluation lessons were building.</p>`
          },
          quiz: [
            { q: "What is a \"thin vertical slice\"?", options: ["The most accurate possible model trained first", "The simplest version that runs end to end through the real interface", "A single slice of the dataset used for testing", "A UI mock-up without any backend"], answer: 1, explain: "A thin slice is the minimal working path from input to output through the real system, which you then improve incrementally." },
            { q: "Which acceptance criterion is best?", options: ["The model should be good", "The API should be fast", "ROC-AUC >= 0.80 on a held-out stratified test set", "Use the newest algorithm"], answer: 2, explain: "Good criteria are measurable and specify how they are measured; the others cannot be checked objectively." },
            { q: "You accidentally pushed an API key to a public repository. What should you do first?", options: ["Delete the commit", "Make the repository private", "Revoke/rotate the key immediately", "Wait to see if it is misused"], answer: 2, explain: "Assume the key is already compromised; revoking it is the only reliable fix. Cleaning history comes afterwards." },
            { q: "Why should tests run without network access or credentials?", options: ["So they are reproducible, free, fast and safe to run anywhere including CI", "Because APIs are always down", "Because network code cannot be tested", "To hide bugs"], answer: 0, explain: "Offline tests with fakes are deterministic and cost nothing; separate, optional integration tests can hit real services." }
          ]
        }
      ]
    },
    {
      id: "cap-ml",
      title: "Capstone 1 — Customer Churn Prediction Service",
      summary: "Frame a business problem, build and evaluate a scikit-learn pipeline, and serve it as a tested REST API in a container.",
      lessons: [
        {
          id: "cap-ml-brief",
          title: "Project Brief and Data",
          minutes: 45,
          objectives: [
            "Translate a business request into an ML problem with a clear label and prediction moment",
            "Generate a realistic synthetic dataset with known structure and missing values",
            "Plan the exploratory analysis that should precede modelling"
          ],
          body: String.raw`
<h3>The brief</h3>
<p><em>"We are a subscription company losing about a quarter of our customers each year. The retention team can call 100 customers per week. Tell us who to call."</em></p>
<p>Before touching data, restate this precisely. The <strong>prediction moment</strong> is the start of each week. The <strong>unit</strong> is an active customer. The <strong>label</strong> is whether that customer cancels within the next month. The output is not a yes/no but a <strong>ranked list</strong>: the team calls the 100 customers with the highest predicted churn probability. That last observation matters — it tells you a ranking metric such as ROC-AUC, and recall among the top-ranked customers, matter more than raw accuracy.</p>
<p>Also write down what the model must <em>not</em> use. A feature such as "cancellation_reason" exists only after a customer has churned; including it would leak the answer into training and produce a model that looks perfect offline and is useless in production. (Track 3, data leakage; Track 5, feature engineering.)</p>

<h3>Why synthetic data?</h3>
<p>Real customer data is private, so for practice we generate data whose true pattern we control: churn becomes more likely with short tenure, higher charges, more support calls and month-to-month contracts. Because we know the truth, we can check whether our model recovers it — a powerful way to build intuition. We also inject missing values, because real data always has gaps and your pipeline must cope with them.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 2000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charges": rng.normal(70, 20, n).round(2).clip(15, 150),
    "support_calls": rng.poisson(1.5, n),
    "contract": rng.choice(["month-to-month", "one-year", "two-year"], n, p=[0.55, 0.25, 0.20]),
    "payment_method": rng.choice(["card", "bank", "check"], n),
})
# Churn is more likely for short tenure, high charges, many support calls, monthly contracts
logit = (-1.0 - 0.04 * df["tenure_months"] + 0.02 * (df["monthly_charges"] - 70)
         + 0.45 * df["support_calls"] + np.where(df["contract"] == "month-to-month", 1.2, -0.6))
df["churned"] = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
df.loc[rng.choice(n, 60, replace=False), "monthly_charges"] = np.nan   # realistic missing values

df.to_csv("churn.csv", index=False)
print(df.shape)
print(df["churned"].mean().round(3))
print(df.isna().sum()["monthly_charges"])
print(df.head(3).to_string())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(2000, 6)
0.26
60
   tenure_months  monthly_charges  support_calls        contract payment_method  churned
0              7            55.16              2        one-year           bank        0
1             55            88.49              0  month-to-month          check        0
2             47            70.69              2  month-to-month           bank        0</code></pre>
<p>The churn rate is 26% — close to the "about a quarter" in the brief. The data is <strong>imbalanced</strong> (74% vs 26%), so a model that always predicts "stays" would be 74% accurate and completely useless. Keep that number in mind as your floor.</p>

<h3>Exploratory analysis plan</h3>
<p>Use the techniques from Track 2 before modelling. At minimum:</p>
<ul>
  <li><strong>Churn rate by contract type</strong> with <code>df.groupby("contract")["churned"].mean()</code> — expect month-to-month to be much higher.</li>
  <li><strong>Distributions</strong> of tenure and charges split by churned vs not (histograms or box plots).</li>
  <li><strong>Support calls vs churn rate</strong> — a bar chart of the mean churn rate per number of calls.</li>
  <li><strong>Missing values</strong>: are rows with missing charges different? If missingness itself predicts churn, that is a signal worth a feature.</li>
</ul>
<p>Write one sentence per finding. These sentences go in your README and justify your feature choices.</p>
<div class="callout tip"><strong>Tip:</strong> keep a baseline in mind from the start. "Call the 100 customers with the most support calls" is a sensible non-ML rule. Your model has to beat it to justify its complexity — Track 5 calls this comparing against a simple heuristic baseline.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 2 (framing ML problems) and Ch. 4 (training data, class imbalance).</div>
`,
          keyPoints: [
            "Define the prediction moment, unit, label and how the output will be used",
            "The retention team ranks customers, so ranking quality matters more than accuracy",
            "Exclude any feature only known after the outcome — that is leakage",
            "With 26% churn, predicting \"never churns\" already scores 74% accuracy",
            "Always compare the model against a simple rule-based baseline"
          ],
          exercise: {
            prompt: String.raw`<p>Using the generated <code>df</code>, compute the churn rate per contract type and per number of support calls (cap calls at 5+). Then implement the baseline "flag the top 20% of customers by support calls" and compute what fraction of all churners it catches (its recall).</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 2000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charges": rng.normal(70, 20, n).round(2).clip(15, 150),
    "support_calls": rng.poisson(1.5, n),
    "contract": rng.choice(["month-to-month", "one-year", "two-year"], n, p=[0.55, 0.25, 0.20]),
})
logit = (-1.0 - 0.04 * df["tenure_months"] + 0.02 * (df["monthly_charges"] - 70)
         + 0.45 * df["support_calls"] + np.where(df["contract"] == "month-to-month", 1.2, -0.6))
df["churned"] = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)

print(df.groupby("contract")["churned"].mean().round(3))
calls = df["support_calls"].clip(upper=5)
print(df.groupby(calls)["churned"].mean().round(3))

top = df["support_calls"].rank(method="first", ascending=False) &lt;= 0.2 * n
recall = df.loc[top, "churned"].sum() / df["churned"].sum()
print(f"Baseline recall at top 20%: {recall:.3f}")</code></pre><p>The churn rate climbs steadily with support calls and is far higher for month-to-month contracts, matching the generating process. The baseline catches a noticeable share of churners — that is the number your model must beat at the same 20% calling budget.</p>`
          },
          quiz: [
            { q: "Why is ROC-AUC a better primary metric than accuracy here?", options: ["It is always higher", "The team uses a ranked list and the classes are imbalanced", "Accuracy cannot be computed for binary labels", "ROC-AUC needs less data"], answer: 1, explain: "ROC-AUC measures how well the model ranks churners above non-churners and is not fooled by the 74% majority class." },
            { q: "Which feature would cause data leakage?", options: ["tenure_months", "contract type", "cancellation_reason", "number of support calls last month"], answer: 2, explain: "A cancellation reason only exists after the customer churns, so it is not available at the prediction moment." },
            { q: "What is the main benefit of practising on synthetic data with a known generating process?", options: ["It is always more realistic", "You can check whether the model recovers the true pattern", "It removes the need for evaluation", "It guarantees high accuracy"], answer: 1, explain: "Knowing the ground truth lets you verify that your pipeline and model behave as expected." }
          ]
        },
        {
          id: "cap-ml-model",
          title: "Build and Evaluate the Model Pipeline",
          minutes: 60,
          objectives: [
            "Build a leakage-safe preprocessing and model Pipeline with ColumnTransformer",
            "Compare candidate models with cross-validation on the training set only",
            "Evaluate the chosen model once on the held-out test set and pick a business-driven threshold"
          ],
          body: String.raw`
<h3>Pipeline first, model second</h3>
<p>In Track 3 you learned that preprocessing must be fitted only on training data, otherwise information from the test set leaks into the model. A scikit-learn <code>Pipeline</code> guarantees this: during cross-validation the imputer and scaler are re-fitted inside each training fold. It also bundles preprocessing and model into <em>one object</em>, which is exactly what you will save and serve — so the API cannot accidentally preprocess differently from training (training/serving skew, Track 5).</p>
<p>The plan:</p>
<ol>
  <li>Split once into train (80%) and test (20%), <strong>stratified</strong> so both keep the 26% churn rate. Lock the test set away.</li>
  <li>Define preprocessing: median imputation + scaling for numeric columns, one-hot encoding for categorical columns.</li>
  <li>Compare candidate models with 5-fold cross-validation on the <em>training</em> set.</li>
  <li>Fit the winner on the full training set and evaluate <em>once</em> on the test set.</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, roc_auc_score

rng = np.random.default_rng(42)
n = 2000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charges": rng.normal(70, 20, n).round(2).clip(15, 150),
    "support_calls": rng.poisson(1.5, n),
    "contract": rng.choice(["month-to-month", "one-year", "two-year"], n, p=[0.55, 0.25, 0.20]),
    "payment_method": rng.choice(["card", "bank", "check"], n),
})
logit = (-1.0 - 0.04 * df["tenure_months"] + 0.02 * (df["monthly_charges"] - 70)
         + 0.45 * df["support_calls"] + np.where(df["contract"] == "month-to-month", 1.2, -0.6))
df["churned"] = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
df.loc[rng.choice(n, 60, replace=False), "monthly_charges"] = np.nan

X, y = df.drop(columns="churned"), df["churned"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

numeric = ["tenure_months", "monthly_charges", "support_calls"]
categorical = ["contract", "payment_method"]
preprocess = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])

candidates = {
    "logistic_regression": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "gradient_boosting": HistGradientBoostingClassifier(random_state=42),
}
for name, model in candidates.items():
    pipe = Pipeline([("prep", preprocess), ("model", model)])
    auc = cross_val_score(pipe, X_train, y_train, cv=5, scoring="roc_auc")
    print(f"{name:20s} CV ROC-AUC = {auc.mean():.3f} +/- {auc.std():.3f}")

best = Pipeline([("prep", preprocess), ("model", candidates["logistic_regression"])])
best.fit(X_train, y_train)
proba = best.predict_proba(X_test)[:, 1]
print(f"Test ROC-AUC: {roc_auc_score(y_test, proba):.3f}")
print(classification_report(y_test, (proba &gt;= 0.5).astype(int), digits=3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logistic_regression  CV ROC-AUC = 0.815 +/- 0.028
gradient_boosting    CV ROC-AUC = 0.743 +/- 0.025
Test ROC-AUC: 0.837
              precision    recall  f1-score   support

           0      0.879     0.764     0.817       296
           1      0.510     0.702     0.591       104

    accuracy                          0.748       400
   macro avg      0.695     0.733     0.704       400
weighted avg      0.783     0.748     0.759       400</code></pre>

<h3>Reading the results like an engineer</h3>
<p><strong>The simpler model won.</strong> Many learners expect gradient boosting to beat logistic regression every time. Here it does not, and the reason is instructive: we generated churn from a <em>linear</em> (logistic) formula, so logistic regression matches the true shape of the problem, while boosting spends capacity fitting noise in 1,600 rows. On real tabular data boosting often wins — the lesson is to <em>always compare candidates with cross-validation</em> instead of assuming.</p>
<p><strong>The test score agrees with cross-validation</strong> (0.837 vs 0.815 ± 0.028), which suggests we did not overfit our model choice. If the test score had been far lower, we would suspect leakage or an unlucky split.</p>
<p><strong>Accuracy (0.748) is below the 0.74 "always stays" floor?</strong> Nearly equal — yet the model is far more useful, because it catches 70% of churners (recall 0.702) while the trivial rule catches none. This is why the brief's metric is ranking quality and recall, not accuracy. <code>class_weight="balanced"</code> made the model pay more attention to the minority class, trading some precision for recall.</p>

<h3>Choosing the threshold from business costs</h3>
<p>0.5 is an arbitrary default. Suppose a retention call costs $5 and a saved customer is worth $200, and a call saves one in five churners it reaches. Missing a churner (false negative) is then far costlier than an unnecessary call (false positive), so you lower the threshold to raise recall. Practically, the team calls a fixed 100 people per week, so you simply <strong>rank by probability and take the top 100</strong> — the threshold becomes "whatever the 100th score is". Either way, document the choice and the reasoning in your README.</p>

<h3>Explain the model</h3>
<p>For logistic regression, the coefficients (after scaling) show direction and strength: you should see positive weights for support calls and the month-to-month contract and a negative weight for tenure — matching how we generated the data. Report this; stakeholders trust a model more when its behaviour matches domain intuition, and a coefficient with the "wrong" sign is a valuable bug signal.</p>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6 — start with simple baselines, compare models under the same evaluation, and do not equate "newer or bigger" with "better".</div>
`,
          keyPoints: [
            "Put preprocessing and the model in one Pipeline to prevent leakage and training/serving skew",
            "Select models with cross-validation on training data; use the test set once",
            "Simpler models can win — compare rather than assume",
            "Accuracy is misleading on imbalanced data; use ROC-AUC and recall",
            "Choose the decision threshold from business costs or capacity, not the 0.5 default"
          ],
          exercise: {
            prompt: String.raw`<p>Extend the code: (1) print the logistic regression coefficients with their feature names, and (2) compute recall when the team calls only the top 20% highest-probability customers in the test set. Compare it with the support-calls baseline from the previous lesson.</p>`,
            solution: String.raw`<pre><code class="lang-python">import pandas as pd

# after best.fit(X_train, y_train)
names = best.named_steps["prep"].get_feature_names_out()
coefs = pd.Series(best.named_steps["model"].coef_[0], index=names).sort_values()
print(coefs.round(3))

k = int(0.2 * len(X_test))
order = proba.argsort()[::-1][:k]          # indices of the top-20% scores
recall_at_k = y_test.iloc[order].sum() / y_test.sum()
print(f"Model recall at top 20%: {recall_at_k:.3f}")</code></pre><p>You should see positive coefficients for <code>num__support_calls</code> and <code>cat__contract_month-to-month</code> and a negative one for <code>num__tenure_months</code>. The model's recall within the same calling budget should clearly exceed the support-calls-only baseline because it combines several signals.</p>`
          },
          quiz: [
            { q: "Why fit the imputer and scaler inside a Pipeline instead of on the whole dataset first?", options: ["It is faster", "To prevent test-set information leaking into training", "Pipelines are required for logistic regression", "To increase accuracy artificially"], answer: 1, explain: "Fitting preprocessing on all data lets test statistics influence training; the Pipeline re-fits it within each training fold." },
            { q: "Logistic regression beat gradient boosting in this project mainly because…", options: ["Boosting is always worse", "The data was generated from a linear (logistic) relationship", "Logistic regression uses more trees", "The test set was too small to measure"], answer: 1, explain: "When the true relationship is linear, a linear model fits it with less variance than a flexible model on a small dataset." },
            { q: "The team can only call 100 customers a week. What is the most sensible decision rule?", options: ["Predict churn when probability >= 0.5", "Call the 100 customers with the highest predicted probability", "Call customers at random", "Call everyone with any support call"], answer: 1, explain: "Capacity-constrained decisions are ranking problems: take the top-k scores." },
            { q: "Cross-validation AUC was 0.815 and test AUC 0.837. What does this suggest?", options: ["Severe overfitting", "Data leakage for sure", "The model generalizes consistently; selection did not overfit", "The test set is broken"], answer: 2, explain: "Similar CV and test scores indicate the estimate is reliable." }
          ]
        },
        {
          id: "cap-ml-serve",
          title: "Serve, Test and Containerize the Model",
          minutes: 60,
          objectives: [
            "Save a versioned model artifact and load it in an API",
            "Validate requests with Pydantic and return clear errors",
            "Test the API offline with FastAPI's TestClient",
            "Package the service in a Docker image and outline a deployment and monitoring plan"
          ],
          body: String.raw`
<h3>From notebook to service</h3>
<p>A model in a notebook helps nobody. To be useful it must sit behind an interface other software can call. You will split the work into two programs: <code>train.py</code>, which trains and saves an <strong>artifact</strong> (the fitted Pipeline plus metadata like its version and threshold), and <code>app.py</code>, which loads that artifact once at start-up and answers HTTP requests. This separation means you can retrain without touching the API code and roll back by pointing the API at an older artifact.</p>
<p>The example below puts all three parts in one block so you can run it, but the comments show which file each part belongs in.</p>
<pre><code class="lang-python runnable">import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field
from typing import Literal
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

# --- 1. Train and save (in the real project this is train.py) ---
rng = np.random.default_rng(0)
n = 500
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charges": rng.normal(70, 20, n).clip(15, 150),
    "support_calls": rng.poisson(1.5, n),
    "contract": rng.choice(["month-to-month", "one-year", "two-year"], n),
    "payment_method": rng.choice(["card", "bank", "check"], n),
})
y = ((df["support_calls"] &gt; 2) | (df["tenure_months"] &lt; 6)).astype(int)
prep = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]),
     ["tenure_months", "monthly_charges", "support_calls"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["contract", "payment_method"]),
])
model = Pipeline([("prep", prep), ("model", LogisticRegression(max_iter=1000))]).fit(df, y)
joblib.dump({"model": model, "version": "1.0.0", "threshold": 0.5}, "churn_model.joblib")

# --- 2. The API (in the real project this is app.py) ---
bundle = joblib.load("churn_model.joblib")

class Customer(BaseModel):
    tenure_months: int = Field(ge=0, le=600)
    monthly_charges: float = Field(gt=0, le=10000)
    support_calls: int = Field(ge=0, le=1000)
    contract: Literal["month-to-month", "one-year", "two-year"]
    payment_method: Literal["card", "bank", "check"]

app = FastAPI(title="Churn API")

@app.get("/health")
def health():
    return {"status": "ok", "model_version": bundle["version"]}

@app.post("/predict")
def predict(customer: Customer):
    row = pd.DataFrame([customer.model_dump()])
    proba = float(bundle["model"].predict_proba(row)[0, 1])
    if not 0.0 &lt;= proba &lt;= 1.0:
        raise HTTPException(status_code=500, detail="Model returned an invalid probability")
    return {"churn_probability": round(proba, 3),
            "will_churn": proba &gt;= bundle["threshold"],
            "model_version": bundle["version"]}

# --- 3. Tests (in the real project this is test_app.py, run with pytest) ---
client = TestClient(app)
print(client.get("/health").json())
risky = {"tenure_months": 2, "monthly_charges": 95.0, "support_calls": 5,
         "contract": "month-to-month", "payment_method": "check"}
loyal = {"tenure_months": 60, "monthly_charges": 40.0, "support_calls": 0,
         "contract": "two-year", "payment_method": "bank"}
r1, r2 = client.post("/predict", json=risky).json(), client.post("/predict", json=loyal).json()
print(r1["will_churn"], r2["will_churn"], r1["churn_probability"] &gt; r2["churn_probability"])
bad = client.post("/predict", json={**risky, "contract": "weekly"})
print(bad.status_code)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'status': 'ok', 'model_version': '1.0.0'}
True False True
422</code></pre>

<h3>What each piece does</h3>
<ul>
  <li><strong>The Pydantic model <code>Customer</code></strong> is your contract. <code>Literal[...]</code> restricts categories and <code>Field(ge=0)</code> rejects impossible numbers. FastAPI automatically returns <strong>HTTP 422</strong> with a helpful message for invalid input — you saw this for <code>"weekly"</code>. Without validation, an unknown category would silently become an all-zeros one-hot vector and produce a confident but meaningless prediction.</li>
  <li><strong><code>/health</code></strong> lets load balancers and container platforms check the service is alive, and reports the model version so you always know what is running.</li>
  <li><strong>Returning <code>model_version</code></strong> with every prediction makes debugging possible later ("which model produced this score?").</li>
  <li><strong>The tests</strong> check behaviour, not exact numbers: the risky customer scores higher than the loyal one. Behavioural tests survive retraining, while asserting an exact probability would break every time.</li>
</ul>

<h3>Run it for real</h3>
<p>Split the code into the three files, then:</p>
<pre><code class="lang-bash">python -m venv .venv &amp;&amp; source .venv/bin/activate
pip install fastapi uvicorn scikit-learn pandas joblib pytest httpx
python src/train.py            # writes churn_model.joblib
pytest -q                      # runs tests/test_app.py offline
uvicorn src.app:app --reload   # open http://127.0.0.1:8000/docs for interactive API docs</code></pre>

<h3>Containerize</h3>
<p>A Docker image packages your code, the model artifact and exact library versions, so it runs the same on your laptop, a colleague's machine and the cloud (Track 1, Docker basics).</p>
<pre><code class="lang-dockerfile">FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
COPY churn_model.joblib .
EXPOSE 8000
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<pre><code class="lang-bash">docker build -t churn-api:1.0.0 .
docker run -p 8000:8000 churn-api:1.0.0
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" \
  -d '{"tenure_months": 2, "monthly_charges": 95, "support_calls": 5, "contract": "month-to-month", "payment_method": "check"}'</code></pre>
<p>To deploy, push the image to a registry and run it on a container service — for example Amazon ECR plus Amazon ECS Express Mode (Track 8 — AWS closed App Runner to new customers in April 2026 and recommends ECS Express Mode instead), or any similar container platform. Alternatively, Track 8 shows how to host a scikit-learn model on a SageMaker endpoint.</p>
<div class="callout warn"><strong>Pin your versions.</strong> A model saved with one scikit-learn version may fail to load, or behave differently, under another. Put exact versions in <code>requirements.txt</code> (e.g., <code>scikit-learn==1.9.1</code>) and record the version inside the artifact metadata.</div>

<h3>Operations plan (write this in your README)</h3>
<ul>
  <li><strong>Monitor</strong> request volume, latency, error rate, the distribution of predicted probabilities and of each input feature (Track 5: drift detection with PSI/KS tests).</li>
  <li><strong>Collect ground truth:</strong> churn labels arrive a month later; join them to logged predictions to track real ROC-AUC over time.</li>
  <li><strong>Retrain</strong> monthly or when drift alarms fire; promote a new artifact only if it beats the current one on recent data (shadow or canary deployment).</li>
</ul>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 7 (deployment and prediction services) and Ch. 8–9 (monitoring, continual learning, testing in production).</div>
`,
          keyPoints: [
            "Separate training (produces a versioned artifact) from serving (loads it)",
            "Pydantic validation turns bad input into clear 422 errors instead of silent garbage",
            "Return the model version with every prediction",
            "Write behavioural tests that survive retraining",
            "Docker pins the whole runtime; pin library versions too",
            "Plan monitoring, delayed ground truth and retraining before launch"
          ],
          exercise: {
            prompt: String.raw`<p>Add a <code>POST /predict_batch</code> endpoint that accepts a list of up to 1,000 customers and returns their probabilities in the same order. Write a test that sends three customers and checks the response length and that an empty list is rejected.</p>`,
            solution: String.raw`<pre><code class="lang-python">from typing import List
from pydantic import BaseModel, Field

class Batch(BaseModel):
    customers: List[Customer] = Field(min_length=1, max_length=1000)

@app.post("/predict_batch")
def predict_batch(batch: Batch):
    rows = pd.DataFrame([c.model_dump() for c in batch.customers])
    probs = bundle["model"].predict_proba(rows)[:, 1]
    return {"churn_probabilities": [round(float(p), 3) for p in probs],
            "model_version": bundle["version"]}

def test_batch():
    r = client.post("/predict_batch", json={"customers": [risky, loyal, risky]})
    assert r.status_code == 200
    assert len(r.json()["churn_probabilities"]) == 3
    assert client.post("/predict_batch", json={"customers": []}).status_code == 422</code></pre><p>Predicting a whole DataFrame at once is much faster than looping over rows, and the size limit protects the service from enormous requests.</p>`
          },
          quiz: [
            { q: "Why does the API return HTTP 422 for contract = \"weekly\"?", options: ["The model crashed", "Pydantic validation rejected a value outside the allowed Literal options", "The server is overloaded", "422 means success with warnings"], answer: 1, explain: "FastAPI validates the request against the Pydantic model and returns 422 Unprocessable Entity for invalid fields." },
            { q: "What would likely happen without that validation?", options: ["The API would refuse to start", "OneHotEncoder(handle_unknown='ignore') would encode it as all zeros and return a misleading prediction", "Python would raise a syntax error", "Docker would fail to build"], answer: 1, explain: "Unknown categories are silently ignored, producing a confident but unjustified score." },
            { q: "Why test that the risky customer scores higher than the loyal one, rather than an exact probability?", options: ["Exact numbers are impossible to compute", "Behavioural assertions remain valid after retraining", "Tests should never use numbers", "It is faster"], answer: 1, explain: "Retraining changes exact probabilities; the expected ordering should not change." },
            { q: "Churn labels arrive one month after prediction. What does this imply for monitoring?", options: ["Monitoring is impossible", "Track input and prediction drift as early warnings, and compute true metrics once labels arrive", "Only monitor CPU usage", "Retrain every hour"], answer: 1, explain: "Delayed ground truth means proxy signals (drift) must cover the gap until real performance can be measured." }
          ]
        }
      ]
    },
    {
      id: "cap-oai",
      title: "Capstone 2 — Document Q&A Assistant with OpenAI",
      summary: "Build a retrieval-augmented assistant that answers from your documents with citations, test it offline, evaluate it, and deploy it.",
      lessons: [
        {
          id: "cap-oai-design",
          title: "Design, Chunking and Retrieval",
          minutes: 60,
          objectives: [
            "Design a RAG assistant with explicit grounding and refusal behaviour",
            "Chunk documents with overlap and keep source metadata for citations",
            "Build and test the retrieval step offline before adding any LLM",
            "Create a golden evaluation set that includes unanswerable questions"
          ],
          body: String.raw`
<h3>The brief</h3>
<p><em>"Our support team answers the same policy questions all day. Build an assistant that answers customer questions from our help-centre documents, shows which document it used, and never invents policy."</em></p>
<p>The last clause is the hardest requirement. An LLM on its own will happily produce a plausible refund policy that is wrong. The solution is <strong>retrieval-augmented generation</strong> (RAG, Tracks 6 and 7): retrieve the most relevant passages from your documents and instruct the model to answer <em>only</em> from them, citing them, and to say it does not know when they do not contain the answer.</p>

<h3>Architecture</h3>
<ol>
  <li><strong>Ingest (offline, whenever documents change):</strong> load documents → split into chunks → embed each chunk → store vectors with metadata (source, chunk id).</li>
  <li><strong>Answer (online, per question):</strong> embed the question → retrieve top-k chunks → build a prompt with numbered sources → call the model → return answer plus sources.</li>
  <li><strong>Evaluate (continuously):</strong> run a fixed golden set after every change to prompts, chunking or models.</li>
</ol>
<figure><img src="assets/diagrams/rag-agent.svg" alt="RAG pipeline: documents are chunked and embedded into a vector database; queries are embedded, top-k chunks retrieved and added to the prompt for the LLM"><figcaption>The left panel is exactly the pipeline you are building.</figcaption></figure>

<h3>Build retrieval first, without an LLM</h3>
<p>Retrieval is the foundation: if the right passage is never retrieved, no model can answer correctly. So build and test it first, offline and free. The code below uses TF-IDF vectors (Track 4) as a stand-in for embeddings — the interface is identical, and in the next lesson you swap in OpenAI embeddings. Notice that each chunk keeps its <code>source</code> so we can cite it, and that a question with no relevant content returns <em>no hits</em>, which triggers the "I don't know" path without spending an API call.</p>
<pre><code class="lang-python runnable">import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

documents = {
    "refund-policy.md": "Refunds are available within 30 days of purchase. Digital products can be refunded "
                        "only if they have not been downloaded. Refunds are issued to the original payment method "
                        "within 5 business days.",
    "shipping.md": "Standard shipping takes 3 to 7 business days. Express shipping takes 1 to 2 business days "
                   "and costs 15 dollars. We ship to 40 countries.",
    "accounts.md": "You can reset your password from the login page. Accounts are locked after 5 failed "
                   "login attempts and unlock automatically after 30 minutes.",
}

def chunk(text, max_words=25, overlap=5):
    words = text.split()
    step = max_words - overlap
    return [" ".join(words[i:i + max_words]) for i in range(0, max(len(words) - overlap, 1), step)]

chunks = [{"source": name, "id": f"{name}#{i}", "text": c}
          for name, text in documents.items() for i, c in enumerate(chunk(text))]
vectorizer = TfidfVectorizer(stop_words="english").fit([c["text"] for c in chunks])
matrix = vectorizer.transform([c["text"] for c in chunks])

def retrieve(question, k=2):
    scores = cosine_similarity(vectorizer.transform([question]), matrix)[0]
    ranked = sorted(zip(scores, chunks), key=lambda p: p[0], reverse=True)[:k]
    return [dict(c, score=round(float(s), 3)) for s, c in ranked if s &gt; 0]

def build_prompt(question, hits):
    context = "\n\n".join(f"[{i + 1}] ({h['source']}) {h['text']}" for i, h in enumerate(hits))
    return ("Answer using ONLY the numbered sources. Cite them like [1]. "
            "If the sources do not contain the answer, say you don't know.\n\n"
            f"Sources:\n{context}\n\nQuestion: {question}")

print(len(chunks), "chunks indexed")
for q in ["How long do refunds take?", "How much is express shipping?", "Do you sell gift cards?"]:
    hits = retrieve(q)
    print(q, "-&gt;", [(h["id"], h["score"]) for h in hits])
print(build_prompt("How much is express shipping?", retrieve("How much is express shipping?"))[:160])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">4 chunks indexed
How long do refunds take? -&gt; [('refund-policy.md#0', 0.495), ('refund-policy.md#1', 0.343)]
How much is express shipping? -&gt; [('shipping.md#0', 0.473)]
Do you sell gift cards? -&gt; []
Answer using ONLY the numbered sources. Cite them like [1]. If the sources do not contain the answer, say you don't know.

Sources:
[1] (shipping.md) Standard s</code></pre>

<h3>Chunking decisions</h3>
<p>Chunk size is a trade-off you should tune with evaluation, not guess. Small chunks retrieve precisely but may cut a rule in half ("Refunds are issued…" in one chunk, "…within 5 business days" in the next). Large chunks keep context but dilute the similarity score and cost more tokens per request. <strong>Overlap</strong> (here 5 words) reduces the cut-in-half problem. Real documents also have structure: splitting on headings or paragraphs usually beats splitting on a fixed word count. Typical starting points are a few hundred tokens per chunk with 10–20% overlap.</p>

<h3>The golden evaluation set</h3>
<p>Write 20–30 questions <em>before</em> building generation, each with the expected source and expected behaviour. Include three kinds:</p>
<ul>
  <li><strong>Answerable</strong> — "How long do refunds take?" → expects <code>refund-policy.md</code>, answer mentions 5 business days.</li>
  <li><strong>Paraphrased</strong> — "When will my money come back?" — tests retrieval beyond keyword overlap (TF-IDF will struggle here; embeddings help, which you will measure).</li>
  <li><strong>Unanswerable</strong> — "Do you sell gift cards?" → expects a refusal and no invented policy.</li>
</ul>
<p>Measure retrieval with <strong>hit rate @k</strong> (did the expected source appear in the top k?) separately from answer quality. When an answer is wrong, this tells you whether to fix retrieval or generation (Track 6).</p>
<div class="callout book"><strong>From the books:</strong> <em>AI Engineering</em>, Ch. 6 (RAG: chunking, retrieval, term-based vs embedding-based search) and Ch. 3–4 (evaluation); <em>Generative AI on AWS</em>, Ch. 9 (context-aware applications with RAG).</div>
`,
          keyPoints: [
            "RAG grounds answers in your documents and makes citations possible",
            "Build and test retrieval before adding an LLM",
            "Keep source metadata on every chunk",
            "Chunk size and overlap are tuning knobs — decide with evaluation",
            "Golden sets must include paraphrased and unanswerable questions",
            "Measure retrieval (hit rate @k) separately from answer quality"
          ],
          exercise: {
            prompt: String.raw`<p>Write a small golden set of five questions for the three documents above (include one paraphrase and one unanswerable question) as a list of dicts with <code>question</code> and <code>expected_source</code> (use <code>None</code> for unanswerable). Then write a function that computes hit rate @2 over it using <code>retrieve</code>.</p>`,
            solution: String.raw`<pre><code class="lang-python">golden = [
    {"question": "How long do refunds take?", "expected_source": "refund-policy.md"},
    {"question": "How much does express shipping cost?", "expected_source": "shipping.md"},
    {"question": "Why is my account locked?", "expected_source": "accounts.md"},
    {"question": "When will my money come back?", "expected_source": "refund-policy.md"},   # paraphrase
    {"question": "Do you sell gift cards?", "expected_source": None},                      # unanswerable
]

def hit_rate(golden, k=2):
    hits = 0
    for item in golden:
        sources = {h["source"] for h in retrieve(item["question"], k=k)}
        if item["expected_source"] is None:
            hits += int(not sources)          # success = nothing retrieved
        else:
            hits += int(item["expected_source"] in sources)
    return hits / len(golden)

print(hit_rate(golden))</code></pre><p>The paraphrase is the interesting case: "money come back" shares no keywords with "Refunds are issued", so TF-IDF likely misses it. That failure is the measurable reason to switch to embeddings next lesson.</p>`
          },
          quiz: [
            { q: "Why build and test retrieval before adding the LLM?", options: ["LLMs cannot read documents", "If the right passage is not retrieved, no prompt or model can answer correctly", "Retrieval is more expensive than generation", "It is required by the API"], answer: 1, explain: "Generation quality is capped by retrieval quality, and retrieval can be tested cheaply and deterministically." },
            { q: "What is the purpose of chunk overlap?", options: ["To double the index size", "To reduce the chance that a fact is split across two chunks", "To make embeddings faster", "To hide duplicates"], answer: 1, explain: "Overlap keeps text near chunk boundaries present in both neighbouring chunks." },
            { q: "Which question best tests whether you need embeddings instead of keyword search?", options: ["An exact copy of a document sentence", "A paraphrase that uses different words with the same meaning", "A question in all caps", "A very long question"], answer: 1, explain: "Keyword methods fail when wording differs; semantic embeddings capture meaning." },
            { q: "For an unanswerable question, what should the retrieval-plus-generation system do?", options: ["Answer from general knowledge", "Return a refusal such as \"I don't know based on the available documents\"", "Return the closest document regardless of relevance", "Crash"], answer: 1, explain: "The brief forbids invented policy; refusing is the correct behaviour." }
          ]
        },
        {
          id: "cap-oai-build",
          title: "Generation, Testing, Evaluation and Deployment",
          minutes: 75,
          objectives: [
            "Replace TF-IDF with OpenAI embeddings behind the same retrieve interface",
            "Generate grounded, cited answers with the Responses API",
            "Unit-test the generation logic offline with a mocked client",
            "Evaluate end-to-end and prepare the service for deployment"
          ],
          body: String.raw`
<h3>Step 1 — swap in embeddings</h3>
<p>Because retrieval sits behind a <code>retrieve(question, k)</code> function, upgrading to semantic search changes only the inside of that function. You embed every chunk once at ingest time, store the vectors, and at query time embed the question and take the highest cosine similarities (Track 7 covers embeddings in depth). This block needs an API key and network, so it is not executed during course validation; it uses the official <code>openai</code> Python SDK.</p>
<pre><code class="lang-python">import os
import numpy as np
from openai import OpenAI

client = OpenAI()   # reads OPENAI_API_KEY from the environment
EMBED_MODEL = os.environ.get("OPENAI_EMBED_MODEL", "text-embedding-3-small")

def embed(texts):
    response = client.embeddings.create(model=EMBED_MODEL, input=texts)
    vectors = np.array([item.embedding for item in response.data], dtype=np.float32)
    return vectors / np.linalg.norm(vectors, axis=1, keepdims=True)   # normalise once

# Ingest: embed all chunks (in production, save these vectors to a vector store)
chunk_vectors = embed([c["text"] for c in chunks])

def retrieve(question, k=3, min_score=0.3):
    q = embed([question])[0]
    scores = chunk_vectors @ q                      # cosine similarity, since vectors are normalised
    best = np.argsort(scores)[::-1][:k]
    return [dict(chunks[i], score=float(scores[i])) for i in best if scores[i] &gt;= min_score]</code></pre>
<p>The <code>min_score</code> threshold replaces "score &gt; 0": embedding similarities are rarely zero, so you must choose a cut-off below which a chunk counts as irrelevant. Tune it on your golden set — too high and you refuse answerable questions, too low and you pass irrelevant context that tempts the model to guess.</p>
<div class="callout tip"><strong>Model names change.</strong> The defaults here are read from environment variables so you can switch models without code changes. Check the OpenAI models page for the current recommended text and embedding models and their prices before you deploy.</div>

<h3>Step 2 — grounded generation with citations</h3>
<p>The generation function receives the client as a parameter. That small design choice — <strong>dependency injection</strong> — is what makes it testable: production passes the real <code>OpenAI()</code> client, tests pass a fake. The instructions tell the model to use only the sources, cite them, and give an exact refusal sentence, which makes refusals easy to detect automatically. If retrieval found nothing, we refuse without calling the API at all, saving cost and removing any chance of a hallucinated answer.</p>
<pre><code class="lang-python runnable">from types import SimpleNamespace
from unittest.mock import MagicMock

NO_ANSWER = "I don't know based on the available documents."

def answer(client, question, hits, model="gpt-6-luna"):
    if not hits:
        return {"answer": NO_ANSWER, "sources": []}
    context = "\n\n".join(f"[{i + 1}] ({h['source']}) {h['text']}" for i, h in enumerate(hits))
    response = client.responses.create(
        model=model,
        instructions=("You are a support assistant. Answer ONLY from the numbered sources and cite them like [1]. "
                      "If the sources don't contain the answer, reply exactly: " + NO_ANSWER),
        input=f"Sources:\n{context}\n\nQuestion: {question}",
    )
    return {"answer": response.output_text, "sources": [h["source"] for h in hits]}

# Unit test with a fake client: no network, no API key, no cost.
fake = MagicMock()
fake.responses.create.return_value = SimpleNamespace(output_text="Express shipping costs 15 dollars [1].")
hits = [{"source": "shipping.md", "text": "Express shipping takes 1 to 2 business days and costs 15 dollars."}]

result = answer(fake, "How much is express shipping?", hits)
print(result)
kwargs = fake.responses.create.call_args.kwargs
print("model:", kwargs["model"], "| sources in prompt:", "[1] (shipping.md)" in kwargs["input"])

print(answer(fake, "Do you sell gift cards?", []))
print("API calls made:", fake.responses.create.call_count)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'answer': 'Express shipping costs 15 dollars [1].', 'sources': ['shipping.md']}
model: gpt-6-luna | sources in prompt: True
{'answer': "I don't know based on the available documents.", 'sources': []}
API calls made: 1</code></pre>
<p>The test proves three things without spending a cent: the prompt contains the numbered sources, the answer and sources are returned in the right shape, and an empty retrieval short-circuits (only one API call was made across two questions). In production you call <code>answer(OpenAI(), question, retrieve(question))</code>.</p>

<h3>Step 3 — evaluate end to end</h3>
<p>Run your golden set through the full system (this costs a little, so do it deliberately, not on every save). For each item record: whether the expected source was retrieved, whether the answer cites a source, whether unanswerable questions produced <code>NO_ANSWER</code>, and — for answerable ones — whether the key fact appears (e.g., "5 business days"). Simple string checks cover most of this; for nuanced quality add an LLM-as-judge rubric (Track 6) and spot-check it by hand. Record the numbers in your README, change one thing (chunk size, k, <code>min_score</code>, prompt wording, model), re-run, and keep changes that improve the scores.</p>

<h3>Step 4 — wrap it in an API and deploy</h3>
<p>Expose <code>POST /ask</code> with FastAPI, validating that the question is a non-empty string under a length limit. Build the index at start-up (or load precomputed vectors), and read the API key only from the environment. Then containerize exactly as in Capstone 1 and deploy to a container platform. Track 7's deployment module walks through this, including streaming responses for a chat-like experience.</p>
<div class="callout warn"><strong>Production checklist:</strong> keep the API key in the platform's secret store, never in the image; set a request timeout and retries with backoff for rate limits; cap <code>max_output_tokens</code>; log question, retrieved sources, latency and token usage (but think about personal data before logging user text); add the moderation and prompt-injection defences from Track 7 — retrieved documents are untrusted input too.</div>
<div class="callout book"><strong>From the books:</strong> <em>AI Engineering</em>, Ch. 5 (prompt engineering and defensive prompting), Ch. 6 (RAG) and Ch. 10 (architecture, guardrails and user feedback).</div>
`,
          keyPoints: [
            "Hide retrieval behind one function so you can swap TF-IDF for embeddings",
            "Embedding similarity needs a tuned minimum score, not \"greater than zero\"",
            "Pass the client into functions (dependency injection) so you can test with fakes",
            "Refuse without calling the API when retrieval finds nothing",
            "Evaluate the full system on the golden set after every change",
            "Keys in a secret store, timeouts, retries, token caps and logging before going live"
          ],
          exercise: {
            prompt: String.raw`<p>Write a pytest-style test for <code>answer</code> that uses a fake client which returns <code>NO_ANSWER</code>, and asserts that your API layer converts this into a response with an empty <code>sources</code> list (sources should only be shown when the model actually answered). Then update <code>answer</code> to make the test pass.</p>`,
            solution: String.raw`<pre><code class="lang-python">from types import SimpleNamespace
from unittest.mock import MagicMock

def answer(client, question, hits, model="gpt-6-luna"):
    if not hits:
        return {"answer": NO_ANSWER, "sources": []}
    context = "\n\n".join(f"[{i + 1}] ({h['source']}) {h['text']}" for i, h in enumerate(hits))
    response = client.responses.create(
        model=model,
        instructions=("Answer ONLY from the numbered sources and cite them like [1]. "
                      "If the sources don't contain the answer, reply exactly: " + NO_ANSWER),
        input=f"Sources:\n{context}\n\nQuestion: {question}",
    )
    text = response.output_text.strip()
    refused = text == NO_ANSWER
    return {"answer": text, "sources": [] if refused else [h["source"] for h in hits]}

def test_model_refusal_hides_sources():
    fake = MagicMock()
    fake.responses.create.return_value = SimpleNamespace(output_text=NO_ANSWER)
    result = answer(fake, "Do you sell gift cards?", [{"source": "shipping.md", "text": "We ship to 40 countries."}])
    assert result == {"answer": NO_ANSWER, "sources": []}</code></pre><p>Retrieval can return a weakly related chunk; the model then correctly refuses. Showing "shipping.md" as a source next to a refusal would confuse users, so sources are hidden whenever the exact refusal sentence comes back — another reason to ask for an exact sentence.</p>`
          },
          quiz: [
            { q: "Why does the answer function take the client as a parameter?", options: ["The SDK requires it", "So tests can pass a fake client and run offline", "To make it faster", "To avoid using environment variables"], answer: 1, explain: "Dependency injection lets production use the real client and tests use a mock." },
            { q: "Why is a minimum similarity score needed with embeddings?", options: ["Embedding similarities are rarely exactly zero, so irrelevant chunks still get positive scores", "Embeddings are always negative", "The API rejects low scores", "It reduces embedding dimensions"], answer: 0, explain: "Without a threshold the top-k always returns something, even when nothing is relevant." },
            { q: "What is the benefit of refusing before calling the API when retrieval is empty?", options: ["It improves embedding quality", "It saves cost and removes the chance of a hallucinated answer", "It makes the model smarter", "It is required by rate limits"], answer: 1, explain: "No context means no grounded answer is possible, so skipping the call is cheaper and safer." },
            { q: "Where should the OpenAI API key live in production?", options: ["Hard-coded in app.py", "Inside the Docker image", "In the hosting platform's secret store, injected as an environment variable", "In the README"], answer: 2, explain: "Secrets belong in a secret manager, never in code, images or repositories." }
          ]
        }
      ]
    },
    {
      id: "cap-aws",
      title: "Capstone 3 — Serverless RAG API on AWS",
      summary: "Deploy a managed retrieval-augmented API using S3, Amazon Bedrock Knowledge Bases, AWS Lambda and Amazon API Gateway.",
      lessons: [
        {
          id: "cap-aws-design",
          title: "Architecture and Knowledge Base Setup",
          minutes: 60,
          objectives: [
            "Design a serverless RAG architecture on AWS and explain each component's role",
            "Create a Bedrock Knowledge Base backed by documents in S3",
            "Write a least-privilege IAM policy for the Lambda function",
            "Estimate the main cost drivers before deploying"
          ],
          body: String.raw`
<h3>The brief</h3>
<p><em>"Same help-centre assistant as Capstone 2, but our company standardises on AWS, keeps data in our own account, and wants as little infrastructure to manage as possible."</em></p>
<p>This is where managed services shine. In Capstone 2 you wrote chunking, embedding and vector search yourself. On AWS, <strong>Amazon Bedrock Knowledge Bases</strong> can do ingestion, chunking, embedding, vector storage and retrieval for you, and its <code>RetrieveAndGenerate</code> operation performs retrieval plus grounded generation with citations in one call. You add a thin <strong>AWS Lambda</strong> function for validation and response shaping, and <strong>Amazon API Gateway</strong> to expose it as an HTTPS endpoint. Nothing runs (or bills for compute) when nobody is asking questions.</p>

<h3>Architecture</h3>
<table>
  <thead><tr><th>Component</th><th>Role</th><th>Track 8 lesson</th></tr></thead>
  <tbody>
    <tr><td>Amazon S3 bucket</td><td>Stores the source documents (Markdown, PDF, HTML…)</td><td>S3 essentials</td></tr>
    <tr><td>Bedrock Knowledge Base</td><td>Chunks and embeds documents into a vector store; retrieves and generates with citations</td><td>Knowledge Bases for RAG</td></tr>
    <tr><td>Bedrock foundation model</td><td>Generates the answer from retrieved chunks</td><td>Bedrock overview, Converse API</td></tr>
    <tr><td>AWS Lambda</td><td>Validates input, calls RetrieveAndGenerate, formats answer + sources</td><td>Serverless GenAI API</td></tr>
    <tr><td>Amazon API Gateway (HTTP API)</td><td>Public HTTPS endpoint, throttling, optional auth</td><td>Serverless GenAI API</td></tr>
    <tr><td>Amazon CloudWatch</td><td>Logs, metrics, alarms</td><td>Observability</td></tr>
  </tbody>
</table>
<p>Request flow: client → API Gateway → Lambda → <code>bedrock-agent-runtime.retrieve_and_generate</code> → (Knowledge Base retrieves chunks from the vector store, the model writes a cited answer) → Lambda returns JSON → client.</p>

<h3>Step-by-step setup (console)</h3>
<ol>
  <li><strong>Choose a region</strong> where Bedrock Knowledge Bases and your chosen models are available, and use it for every resource.</li>
  <li><strong>Enable model access</strong> in the Bedrock console for an embedding model and a text model, if your account requires it. Check the Bedrock model catalog for current model IDs in your region.</li>
  <li><strong>Create an S3 bucket</strong> (block all public access, default encryption on) and upload the help-centre documents under a prefix such as <code>docs/</code>.</li>
  <li><strong>Create a Knowledge Base</strong> in the Bedrock console: name it, let it create a service role, choose S3 as the data source pointing at your prefix, pick the embedding model, and accept the default chunking to start (you can tune chunking later, exactly as in Capstone 2). Let the console create a vector store, or choose one you already run.</li>
  <li><strong>Sync the data source.</strong> Ingestion runs as a job; re-sync whenever documents change.</li>
  <li><strong>Test in the console</strong> with your golden questions, including the unanswerable ones. Note the Knowledge Base ID (a 10-character identifier) — Lambda needs it.</li>
</ol>
<div class="callout warn"><strong>Cost check before you click:</strong> the vector store behind a Knowledge Base can bill by the hour even when idle, depending on which one you choose. Read its pricing, set an AWS Budget alert first (Track 8, fundamentals), and delete the Knowledge Base <em>and</em> its vector store when you finish the capstone.</div>

<h3>Least-privilege IAM for Lambda</h3>
<p>The Lambda function's execution role should allow only what it needs: calling RetrieveAndGenerate and Retrieve on <em>this</em> Knowledge Base, invoking the generation model, and writing its own logs. Replace the placeholder region, account and IDs:</p>
<pre><code class="lang-json">{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "QueryKnowledgeBase",
      "Effect": "Allow",
      "Action": ["bedrock:RetrieveAndGenerate", "bedrock:Retrieve"],
      "Resource": "arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB12345678"
    },
    {
      "Sid": "InvokeGenerationModel",
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel"],
      "Resource": [
        "arn:aws:bedrock:us-east-1:123456789012:inference-profile/us.anthropic.claude-haiku-4-5-20251001-v1:0",
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-haiku-4-5-20251001-v1:0"
      ]
    }
  ]
}</code></pre>
<p>This example generates with Claude Haiku 4.5 through a US <strong>cross-region inference profile</strong> (the <code>us.</code> prefix), the same choice Track 8 uses for Knowledge Base lessons. Not every model supports Knowledge Bases, so confirm support in the Bedrock model cards for your region; Anthropic models also require a one-time first-use form in the Bedrock console. Because an inference profile can route your request to several US regions, the policy must allow both the profile ARN <em>and</em> the underlying foundation-model ARN in each destination region (the <code>*</code> region above). Attach the AWS managed policy <code>AWSLambdaBasicExecutionRole</code> for CloudWatch Logs.</p>

<h3>Cost model</h3>
<ul>
  <li><strong>Per question:</strong> model input + output tokens (retrieved chunks make inputs large — tune the number of results), a tiny Lambda charge, and an API Gateway request charge.</li>
  <li><strong>Per document change:</strong> embedding tokens during ingestion.</li>
  <li><strong>Always on:</strong> the vector store, and S3 storage (cents for small document sets).</li>
</ul>
<p>Write these down with your expected traffic (e.g., 2,000 questions/day) in the README. Being able to estimate cost is one of the clearest signs of an engineer who can be trusted with production systems.</p>
<div class="callout book"><strong>From the books:</strong> <em>Generative AI on AWS</em>, Ch. 9 (RAG and agents) and Ch. 12 (Amazon Bedrock). Managed features have evolved since publication, so follow the current Bedrock documentation for console steps.</div>
`,
          keyPoints: [
            "Bedrock Knowledge Bases replace hand-built chunking, embedding and vector search",
            "RetrieveAndGenerate performs retrieval plus cited generation in one call",
            "Lambda + API Gateway give a pay-per-request HTTPS API with no servers to manage",
            "Scope IAM permissions to the specific Knowledge Base and model",
            "Some vector stores bill while idle — budget alerts first, delete everything after"
          ],
          exercise: {
            prompt: String.raw`<p>Estimate the monthly cost drivers for 2,000 questions per day where each request sends about 2,500 input tokens (question + retrieved chunks) and receives 300 output tokens. Express it as a formula using placeholder prices <code>P_in</code> and <code>P_out</code> per million tokens, then list two ways to cut the token cost.</p>`,
            solution: String.raw`<pre><code class="lang-text">Requests per month  = 2,000 x 30 = 60,000
Input tokens/month  = 60,000 x 2,500 = 150,000,000  (150 M)
Output tokens/month = 60,000 x   300 =  18,000,000  (18 M)
Model cost          = 150 x P_in + 18 x P_out   (prices per 1M tokens)
Plus: Lambda + API Gateway requests (small), vector store (fixed), S3 (tiny)</code></pre><p>Input tokens dominate, mostly from retrieved context. Cut cost by (1) retrieving fewer or smaller chunks after confirming on the golden set that quality holds, and (2) using a smaller, cheaper model for simple questions — routing (Track 6) — or caching answers to frequent questions.</p>`
          },
          quiz: [
            { q: "What does RetrieveAndGenerate do?", options: ["Only uploads documents", "Retrieves relevant chunks from a Knowledge Base and generates a cited answer", "Trains a new foundation model", "Deploys a Lambda function"], answer: 1, explain: "It combines retrieval and grounded generation, returning output text and citations." },
            { q: "Why use API Gateway in front of Lambda?", options: ["Lambda cannot run Python", "It provides the public HTTPS endpoint plus throttling and authentication options", "It stores the documents", "It replaces IAM"], answer: 1, explain: "API Gateway is the managed front door that turns HTTP requests into Lambda invocations." },
            { q: "Which IAM approach is best for the Lambda role?", options: ["AdministratorAccess for simplicity", "bedrock:* on all resources", "Only the needed Bedrock actions on the specific Knowledge Base and model, plus basic logging", "No role at all"], answer: 2, explain: "Least privilege limits damage if the function is misused or compromised." },
            { q: "In this architecture, what usually dominates per-question cost?", options: ["S3 storage", "Model input tokens from retrieved context", "Lambda memory", "DNS lookups"], answer: 1, explain: "Each request sends the retrieved chunks to the model, so input tokens add up fastest." }
          ]
        },
        {
          id: "cap-aws-build",
          title: "Lambda Handler, Infrastructure as Code and Operations",
          minutes: 75,
          objectives: [
            "Write a Lambda handler that validates input and calls RetrieveAndGenerate",
            "Test the handler offline with botocore's Stubber",
            "Deploy with an AWS SAM template and call the live endpoint",
            "Set up logging and alarms, and clean up every billable resource"
          ],
          body: String.raw`
<h3>The handler</h3>
<p>A Lambda handler is a function that receives an <code>event</code> (for API Gateway, the HTTP request as a dictionary, with the body as a JSON string) and returns a dictionary with <code>statusCode</code>, <code>headers</code> and <code>body</code>. Ours validates the question, calls the Knowledge Base, and turns citations into a de-duplicated list of source documents.</p>
<p>As in Capstone 2, the AWS client is <em>injected</em> via <code>make_handler</code>, so we can test with a fake. Here the fake is <strong>botocore's Stubber</strong>, which is better than a plain mock: it checks that our request parameters and the fake response both conform to the <em>real Bedrock API schema</em>. If you misspell a parameter, the test fails exactly as AWS would — but offline and free.</p>
<pre><code class="lang-python runnable">import json
import boto3
from botocore.stub import Stubber, ANY

def make_handler(agent_runtime, kb_id, model_arn):
    def handler(event, context):
        try:
            body = json.loads(event.get("body") or "{}")
        except json.JSONDecodeError:
            return {"statusCode": 400, "body": json.dumps({"error": "Body must be JSON"})}
        question = (body.get("question") or "").strip()
        if not question or len(question) &gt; 2000:
            return {"statusCode": 400, "body": json.dumps({"error": "question must be 1-2000 characters"})}
        resp = agent_runtime.retrieve_and_generate(
            input={"text": question},
            retrieveAndGenerateConfiguration={
                "type": "KNOWLEDGE_BASE",
                "knowledgeBaseConfiguration": {"knowledgeBaseId": kb_id, "modelArn": model_arn},
            },
        )
        sources = sorted({ref["location"]["s3Location"]["uri"]
                          for c in resp.get("citations", [])
                          for ref in c.get("retrievedReferences", [])
                          if ref.get("location", {}).get("type") == "S3"})
        return {"statusCode": 200, "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"answer": resp["output"]["text"], "sources": sources})}
    return handler

# Offline test: Stubber validates our request AND the fake response against the real API schema.
client = boto3.client("bedrock-agent-runtime", region_name="us-east-1",
                      aws_access_key_id="testing", aws_secret_access_key="testing")
stub = Stubber(client)
fake_response = {
    "sessionId": "session-123",
    "output": {"text": "Refunds are issued within 5 business days."},
    "citations": [{
        "generatedResponsePart": {"textResponsePart": {"text": "Refunds are issued within 5 business days.",
                                                        "span": {"start": 0, "end": 42}}},
        "retrievedReferences": [{
            "content": {"text": "Refunds are issued to the original payment method within 5 business days."},
            "location": {"type": "S3", "s3Location": {"uri": "s3://my-docs/refund-policy.md"}},
        }],
    }],
}
stub.add_response("retrieve_and_generate", fake_response, {
    "input": {"text": "How long do refunds take?"},
    "retrieveAndGenerateConfiguration": ANY,
})
handler = make_handler(client, "KB12345678",
    "arn:aws:bedrock:us-east-1:123456789012:inference-profile/us.anthropic.claude-haiku-4-5-20251001-v1:0")
with stub:
    ok = handler({"body": json.dumps({"question": "How long do refunds take?"})}, None)
    print(ok["statusCode"], json.loads(ok["body"]))
    stub.assert_no_pending_responses()
print(handler({"body": json.dumps({"question": ""})}, None)["statusCode"])
print(handler({"body": "not json"}, None)["statusCode"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">200 {'answer': 'Refunds are issued within 5 business days.', 'sources': ['s3://my-docs/refund-policy.md']}
400
400</code></pre>
<p>In the deployed function, the module creates the real client once (outside the handler, so warm invocations reuse it) and reads configuration from environment variables:</p>
<pre><code class="lang-python">import os
import boto3

_runtime = boto3.client("bedrock-agent-runtime")
handler = make_handler(_runtime, os.environ["KB_ID"], os.environ["MODEL_ARN"])</code></pre>

<h3>Infrastructure as code with AWS SAM</h3>
<p>Clicking through the console is fine for learning, but production infrastructure should be <strong>code</strong>: reviewable, repeatable and deletable in one command. An AWS SAM template describing the function, its permissions and an HTTP API:</p>
<pre><code class="lang-yaml">AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: Serverless RAG API backed by a Bedrock Knowledge Base

Parameters:
  KnowledgeBaseId:
    Type: String
  ModelArn:
    Type: String
  FoundationModelArnPattern:
    Type: String
    Default: arn:aws:bedrock:*::foundation-model/anthropic.claude-haiku-4-5-20251001-v1:0

Resources:
  AskFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: app.handler
      Runtime: python3.12
      Timeout: 30
      MemorySize: 512
      Environment:
        Variables:
          KB_ID: !Ref KnowledgeBaseId
          MODEL_ARN: !Ref ModelArn
      Policies:
        - Statement:
            - Effect: Allow
              Action: [bedrock:RetrieveAndGenerate, bedrock:Retrieve]
              Resource: !Sub arn:aws:bedrock:&#36;{AWS::Region}:&#36;{AWS::AccountId}:knowledge-base/&#36;{KnowledgeBaseId}
            - Effect: Allow
              Action: bedrock:InvokeModel
              Resource:
                - !Ref ModelArn                     # the inference-profile ARN
                - !Ref FoundationModelArnPattern    # foundation model in every routed region
      Events:
        Ask:
          Type: HttpApi
          Properties:
            Path: /ask
            Method: post

Outputs:
  ApiUrl:
    Value: !Sub https://&#36;{ServerlessHttpApi}.execute-api.&#36;{AWS::Region}.amazonaws.com/ask</code></pre>
<pre><code class="lang-bash">sam build
sam deploy --guided        # prompts for stack name, region and the two parameters
curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{"question": "How long do refunds take?"}'</code></pre>
<p>The 30-second timeout matters: retrieval plus generation can take several seconds, and Lambda's default timeout is only 3 seconds. API Gateway HTTP APIs also have their own integration timeout, so very long generations are better served with streaming or an asynchronous pattern (Track 8).</p>

<h3>Operations</h3>
<ul>
  <li><strong>Logs:</strong> log a request ID, question length (not necessarily the text — think about personal data), number of sources, and latency as structured JSON; read them in CloudWatch Logs.</li>
  <li><strong>Alarms:</strong> CloudWatch alarms on Lambda errors and duration, and on API Gateway 5xx responses.</li>
  <li><strong>Protection:</strong> set API Gateway throttling so a burst of traffic cannot run up a large model bill; add authentication (e.g., JWT authorizer) before sharing the URL publicly; consider Bedrock Guardrails for content filtering.</li>
  <li><strong>Evaluation:</strong> re-run your golden set against the live endpoint after every document re-sync or configuration change.</li>
</ul>

<h3>Clean up (do not skip)</h3>
<ol>
  <li><code>sam delete</code> — removes the Lambda function, API and IAM role created by the stack.</li>
  <li>Delete the Knowledge Base <em>and</em> its vector store (the vector store may not be deleted automatically).</li>
  <li>Empty and delete the S3 bucket if you no longer need the documents.</li>
  <li>Check the Billing console and AWS Cost Explorer the next day to confirm charges stopped.</li>
</ol>
<div class="callout book"><strong>From the books:</strong> <em>Generative AI on AWS</em>, Ch. 8 (deployment considerations) and Ch. 12 (Bedrock); <em>Designing Machine Learning Systems</em>, Ch. 10 (infrastructure and tooling — why infrastructure as code pays off).</div>
`,
          keyPoints: [
            "Inject the boto3 client so the handler can be tested offline",
            "botocore Stubber validates requests and responses against the real API schema",
            "Create AWS clients outside the handler so warm invocations reuse them",
            "Define infrastructure as code (SAM) so it is reviewable, repeatable and deletable",
            "Raise the Lambda timeout, throttle the API, add auth and alarms before sharing it",
            "Clean up the stack, Knowledge Base, vector store and bucket — then verify billing"
          ],
          exercise: {
            prompt: String.raw`<p>Extend the handler so that if Bedrock raises a throttling error, the API returns HTTP 429 with a friendly message instead of crashing. Use <code>stub.add_client_error</code> to test it offline.</p>`,
            solution: String.raw`<pre><code class="lang-python">import json
from botocore.exceptions import ClientError

def make_handler(agent_runtime, kb_id, model_arn):
    def handler(event, context):
        try:
            body = json.loads(event.get("body") or "{}")
        except json.JSONDecodeError:
            return {"statusCode": 400, "body": json.dumps({"error": "Body must be JSON"})}
        question = (body.get("question") or "").strip()
        if not question or len(question) &gt; 2000:
            return {"statusCode": 400, "body": json.dumps({"error": "question must be 1-2000 characters"})}
        try:
            resp = agent_runtime.retrieve_and_generate(
                input={"text": question},
                retrieveAndGenerateConfiguration={
                    "type": "KNOWLEDGE_BASE",
                    "knowledgeBaseConfiguration": {"knowledgeBaseId": kb_id, "modelArn": model_arn},
                },
            )
        except ClientError as err:
            if err.response["Error"]["Code"] == "ThrottlingException":
                return {"statusCode": 429, "body": json.dumps({"error": "Busy right now, please retry shortly"})}
            raise
        return {"statusCode": 200, "body": json.dumps({"answer": resp["output"]["text"]})}
    return handler

# Test:
# stub.add_client_error("retrieve_and_generate", service_error_code="ThrottlingException",
#                       service_message="Rate exceeded", http_status_code=429)
# with stub:
#     assert handler({"body": json.dumps({"question": "hi"})}, None)["statusCode"] == 429</code></pre><p>Unknown errors are re-raised so they appear in CloudWatch and trigger your error alarm, while expected throttling becomes a clear, retryable response for the client.</p>`
          },
          quiz: [
            { q: "Why is botocore's Stubber more valuable than a plain MagicMock here?", options: ["It calls AWS for real", "It validates request parameters and responses against the real API schema", "It is faster than Python", "It deploys the function"], answer: 1, explain: "Stubber catches misspelled parameters and malformed responses offline, as the real service would." },
            { q: "Why create the boto3 client outside the handler function?", options: ["Lambda forbids clients inside handlers", "Warm invocations reuse it, reducing latency", "It changes the region", "It is required by SAM"], answer: 1, explain: "Module-level objects persist between invocations in the same execution environment." },
            { q: "What is the main benefit of defining the stack in a SAM template?", options: ["It makes Lambda free", "Infrastructure becomes reviewable, repeatable and deletable with one command", "It removes the need for IAM", "It speeds up the model"], answer: 1, explain: "Infrastructure as code turns manual console steps into versioned, reproducible configuration." },
            { q: "After finishing, which resource is easiest to forget and may keep billing?", options: ["The CloudWatch log group", "The Knowledge Base's vector store", "The SAM CLI", "Your local virtual environment"], answer: 1, explain: "Vector stores can bill while idle and may need separate deletion." }
          ]
        }
      ]
    },
    {
      id: "cap-next",
      title: "Wrap-Up",
      summary: "Review what you can now do, package it as a portfolio, and plan your next steps.",
      lessons: [
        {
          id: "cap-next-portfolio",
          title: "Final Review, Portfolio and Next Steps",
          minutes: 40,
          objectives: [
            "Self-assess your skills against the full course outcomes",
            "Present your capstones as a professional portfolio",
            "Choose a next learning direction based on the role you want"
          ],
          body: String.raw`
<h3>Look how far you have come</h3>
<p>You started by printing "Hello" and learning what a variable is. You can now: manipulate data with NumPy and Pandas; explain gradient descent, overfitting and precision/recall; train and evaluate scikit-learn and PyTorch models; explain how transformers generate text; design production ML systems with monitoring and retraining; build RAG systems and agents with proper evaluation; and deploy AI services on OpenAI and AWS. That is the core skill set of an entry-level ML or AI engineer.</p>

<h3>Self-assessment checklist</h3>
<p>For each statement, answer honestly: <em>could I do this without notes, explaining my reasoning?</em> Revisit the linked track for any "no".</p>
<table>
  <thead><tr><th>I can…</th><th>Track</th></tr></thead>
  <tbody>
    <tr><td>Write a Python script with functions, classes, error handling and tests, in a virtual environment, under git</td><td>1</td></tr>
    <tr><td>Load, clean, group, join and plot a dataset, and explain a dot product and a gradient</td><td>2</td></tr>
    <tr><td>Build a leakage-free Pipeline, choose metrics for an imbalanced problem, and tune with cross-validation</td><td>3</td></tr>
    <tr><td>Write a PyTorch training loop and explain attention, tokens and temperature</td><td>4</td></tr>
    <tr><td>Design monitoring, drift detection and a safe rollout for a model in production</td><td>5</td></tr>
    <tr><td>Choose between prompting, RAG and fine-tuning, and build an evaluation set for an LLM app</td><td>6</td></tr>
    <tr><td>Use the OpenAI API with structured outputs, tools and embeddings, and deploy it securely</td><td>7</td></tr>
    <tr><td>Use IAM, S3, SageMaker and Bedrock, and deploy a serverless AI API with infrastructure as code</td><td>8</td></tr>
  </tbody>
</table>

<h3>Turn the capstones into a portfolio</h3>
<p>Employers skim. Make each project understandable in two minutes:</p>
<ul>
  <li><strong>A README that tells a story:</strong> the problem in one paragraph, an architecture diagram, your acceptance criteria next to measured results, the most interesting decision you made and why, and what you would do next.</li>
  <li><strong>Honesty about limitations:</strong> "TF-IDF missed paraphrases, so I switched to embeddings and hit rate @3 rose from 0.6 to 0.9" is far more impressive than unexplained success.</li>
  <li><strong>Proof it runs:</strong> a passing test badge from CI (e.g., GitHub Actions running <code>pytest</code>), a short screen recording, and clear setup steps.</li>
  <li><strong>No secrets, no huge files:</strong> check your git history before making a repository public.</li>
</ul>

<h3>Where to go next</h3>
<table>
  <thead><tr><th>If you want to be…</th><th>Go deeper into…</th></tr></thead>
  <tbody>
    <tr><td>ML engineer</td><td>Feature stores, orchestration (Airflow, Kubeflow), model monitoring tools, distributed training — Track 5 is your map.</td></tr>
    <tr><td>AI / LLM application engineer</td><td>Advanced RAG (hybrid search, reranking), agent frameworks, evaluation tooling, guardrails, cost optimisation — Tracks 6–8.</td></tr>
    <tr><td>Data scientist</td><td>Statistics and experimentation (A/B testing), causal inference, deeper feature engineering — Tracks 2–3.</td></tr>
    <tr><td>Deep learning / research engineer</td><td>Implement papers in PyTorch, GPU training, fine-tuning open-weight models with LoRA — Tracks 4 and 6.</td></tr>
    <tr><td>Cloud ML / MLOps specialist</td><td>SageMaker Pipelines, infrastructure as code (CDK/Terraform), security and networking, and an AWS certification path — Track 8.</td></tr>
  </tbody>
</table>
<p>The field moves fast, so build a habit rather than chasing every release: read your platform's changelog monthly, re-implement one interesting technique per month in a small project, and keep your evaluation sets — they are how you will judge every new model and tool that appears.</p>
<div class="callout book"><strong>Keep the books close:</strong> all three are worth re-reading now that you have hands-on experience — many chapters will read very differently once you have shipped a system yourself.</div>
`,
          keyPoints: [
            "Re-check every course outcome and revisit the track for any gap",
            "A portfolio README should tell the story: problem, architecture, criteria vs results, decisions, next steps",
            "Honest limitations and measured improvements impress more than polish",
            "Pick a specialisation based on the role you want",
            "Keep your evaluation sets — they let you judge every new model or tool"
          ],
          exercise: {
            prompt: String.raw`<p>Write the "Results" section of the README for one of your capstones: a table of acceptance criteria, target, measured value and pass/fail, followed by two sentences on the biggest improvement you made and one known limitation.</p>`,
            solution: String.raw`<pre><code class="lang-text">## Results
| Criterion                               | Target  | Measured | Status |
|-----------------------------------------|---------|----------|--------|
| Retrieval hit rate @3 (golden set, n=25)| >= 0.85 | 0.92     | Pass   |
| Refuses unanswerable questions          | 5 / 5   | 5 / 5    | Pass   |
| Answer contains the key fact            | >= 0.80 | 0.84     | Pass   |
| p95 latency                             | < 4 s   | 4.6 s    | Fail   |

Switching from TF-IDF to embeddings raised hit rate @3 from 0.64 to 0.92, mostly on paraphrased questions.
Latency misses the target because each request sends 5 large chunks; next step is retrieving 3 smaller chunks
and streaming the response.</code></pre><p>A failing row with a diagnosis and a plan shows engineering judgement — that is what reviewers look for.</p>`
          },
          quiz: [
            { q: "What should a portfolio README emphasise most?", options: ["The number of libraries used", "The problem, architecture, measured results against criteria, and key decisions", "Only screenshots", "The length of the code"], answer: 1, explain: "Reviewers want to see judgement and evidence, not volume." },
            { q: "Why include a criterion you failed to meet?", options: ["To lower expectations", "It demonstrates honest evaluation and a diagnosis/plan, which shows engineering judgement", "It is required by GitHub", "Failing criteria improve search ranking"], answer: 1, explain: "Transparent reporting with a clear plan builds more trust than unexplained success." },
            { q: "What is the most durable asset to keep from your projects as models and tools change?", options: ["Your exact prompts", "Your evaluation sets", "Your Docker image", "Your API keys"], answer: 1, explain: "Evaluation sets let you objectively compare any future model, prompt or tool on your real use case." }
          ]
        }
      ]
    }
  ]
});
