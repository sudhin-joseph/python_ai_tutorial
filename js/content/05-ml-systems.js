window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "mlsys",
  order: 5,
  title: "Production ML Systems & MLOps",
  level: "Intermediate",
  icon: "🏗️",
  description: "How machine learning actually works inside companies: framing problems, engineering data and features, evaluating and deploying models, monitoring for drift, retraining continually, and building the infrastructure and teams around it. Based on the discipline taught in Chip Huyen's Designing Machine Learning Systems.",
  outcomes: [
    "Decide when ML is (and is not) the right tool, and translate a business goal into a well-framed ML problem",
    "Design data pipelines: choose formats and storage, pick batch vs stream processing, sample and label training data",
    "Engineer features safely, and detect and prevent data leakage",
    "Evaluate models beyond a single accuracy number: baselines, behavioral tests, calibration and slice-based evaluation",
    "Choose between batch and online prediction, and shrink models with compression techniques",
    "Detect data distribution shifts with statistical tests (KS, PSI) and design monitoring and alerting",
    "Plan continual learning and safely test new models in production with shadow, A/B, canary and bandit strategies",
    "Reason about ML infrastructure (orchestrators, model and feature stores), team structure and responsible AI"
  ],
  modules: [
    {
      id: "mlsys-foundations",
      title: "Foundations: ML Systems in the Real World",
      summary: "What changes when ML leaves the notebook: when to use ML, what a production system must guarantee, and how to frame a business problem as an ML problem.",
      lessons: [
        {
          id: "mlsys-foundations-production",
          title: "ML in Production vs. ML in Research",
          minutes: 45,
          objectives: [
            "Describe the components of an ML system beyond the model itself",
            "Apply a checklist to decide whether a problem should be solved with ML",
            "Contrast research ML and production ML across requirements, compute priorities, data, fairness and interpretability",
            "Explain why latency is measured with percentiles rather than the mean"
          ],
          body: String.raw`
<p>Imagine you have finished the earlier tracks of this course. You can clean data, train a gradient-boosted model, even fine-tune a neural network. You join <strong>FreshCart</strong>, an online grocery company, and your manager says: "Our search results are bad. Use ML to fix them." Within a week you discover that training the model is perhaps 10% of the work. You need to know where the search logs live, how fresh the product catalog is, how fast a result must come back, who decides what a "good" result is, what happens when the model is wrong, and who will be woken up at 3 a.m. when it breaks. This track is about that other 90%.</p>

<div class="callout book"><strong>Book:</strong> This lesson follows <em>Designing Machine Learning Systems</em> (Chip Huyen), Chapter 1, "Overview of Machine Learning Systems".</div>

<h3>An ML system is much more than a model</h3>
<p>When people say "ML system" they often picture a trained model file. In production, the model is one component among many:</p>
<ul>
  <li><strong>Business requirements</strong> that define why the system exists and how success is measured.</li>
  <li><strong>Data pipelines</strong> that collect, store, clean and label data.</li>
  <li><strong>Feature engineering</strong> code that turns raw data into model inputs, both during training and at prediction time.</li>
  <li><strong>The model</strong> and the code to train and evaluate it.</li>
  <li><strong>Deployment and serving</strong>: the service that receives requests and returns predictions.</li>
  <li><strong>Monitoring</strong> to notice when things go wrong, and <strong>continual learning</strong> to update the model.</li>
  <li><strong>Infrastructure</strong>: storage, compute, schedulers and platforms that everything runs on.</li>
</ul>
<figure><img src="assets/diagrams/ml-lifecycle.svg" alt="Circular lifecycle: business problem, ML objective, data collection, train and evaluate, deploy, monitor and detect drift, collect feedback and retrain"><figcaption>The production ML lifecycle is a loop: monitoring feeds back into data, training and even the problem definition.</figcaption></figure>
<p>The term <strong>MLOps</strong> (ML operations) refers to the tools and practices for deploying and maintaining ML systems reliably. This track covers MLOps, but also the design decisions that come before any tooling: whether to use ML at all, and how to frame the problem.</p>

<h3>When should you use ML?</h3>
<p>A useful working definition: <em>ML is an approach to learn complex patterns from existing data and use those patterns to make predictions on unseen data.</em> Each part of that sentence is a test your problem must pass.</p>
<ol>
  <li><strong>The system has the ability to learn.</strong> There must be something to learn from. A relational database cannot "learn" anything; a model needs examples. If you have no data and no way to collect it, ML is not an option yet. (Some teams launch a non-ML product first precisely to start collecting data.)</li>
  <li><strong>There are patterns to learn.</strong> Predicting the outcome of a fair coin toss is hopeless because there is no pattern. Predicting house prices works because size, location and age really do relate to price.</li>
  <li><strong>The patterns are complex.</strong> If you can write the rule by hand, write the rule. Computing shipping cost from weight and distance is a lookup table, not an ML problem. Recognizing a cat in a photo, or deciding which of 10,000 products a user wants, involves patterns too intricate to hand-code.</li>
  <li><strong>Existing data is available or collectable.</strong> Either you already have examples, or you can gather them (for instance by logging user behavior).</li>
  <li><strong>The task is to predict.</strong> ML answers questions of the form "what is most likely?" Many problems can be reframed as predictions: "what would the user click?", "what is this transaction's fraud probability?", "what is the next word?"</li>
  <li><strong>Unseen data looks like the training data.</strong> A model learns patterns from the past and assumes the future will be similar. If the future will be very different, your model will be wrong.</li>
</ol>
<p>Some additional properties make ML especially attractive:</p>
<ul>
  <li><strong>The task is repetitive.</strong> Many similar decisions give the model many examples to learn from.</li>
  <li><strong>The cost of a wrong prediction is cheap.</strong> A bad movie recommendation costs almost nothing; a wrong cancer diagnosis costs a great deal. ML is still used for high-stakes tasks, but only when its benefit outweighs the harm of errors and there are safeguards.</li>
  <li><strong>It runs at scale.</strong> Building an ML system is expensive. That cost pays off when you make millions of predictions.</li>
  <li><strong>The patterns keep changing.</strong> Hard-coded spam rules go stale as spammers adapt; a model retrained on fresh data can keep up.</li>
</ul>
<p>And reasons <em>not</em> to use ML: it would be unethical; a simple rule-based solution works well enough; or it is not cost-effective. A good habit, strongly recommended by practitioners, is to <strong>start with a non-ML solution</strong>. A heuristic baseline is fast to build, tells you whether the problem matters, and becomes the bar any model has to beat.</p>

<div class="callout tip"><strong>Tip:</strong> ML does not have to solve the whole problem. You can break a problem into pieces and use ML for only one of them. A support chatbot might use ML only to detect which of 20 intents a message belongs to, then use plain code to answer.</div>

<h3>Research ML vs. production ML</h3>
<p>Most ML courses, papers and competitions are research-style: fixed dataset, single metric, leaderboard. Production is different in five important ways.</p>
<table>
  <thead><tr><th>Aspect</th><th>Research</th><th>Production</th></tr></thead>
  <tbody>
    <tr><td>Requirements</td><td>State-of-the-art score on a benchmark</td><td>Different stakeholders with different, often conflicting, requirements</td></tr>
    <tr><td>Computational priority</td><td>Fast training, high throughput</td><td>Fast inference, low latency</td></tr>
    <tr><td>Data</td><td>Static, cleaned, well-formatted</td><td>Constantly shifting, messy, biased, privacy-sensitive</td></tr>
    <tr><td>Fairness</td><td>Often not a focus</td><td>Must be considered: real people are affected</td></tr>
    <tr><td>Interpretability</td><td>Often not a focus</td><td>Often required for trust, debugging and regulation</td></tr>
  </tbody>
</table>

<h4>1. Stakeholders and conflicting requirements</h4>
<p>Consider a food-delivery app that wants to recommend restaurants. Everyone agrees "recommendations" matter, but each team wants something different:</p>
<ul>
  <li>The <strong>ML team</strong> wants the model that predicts orders most accurately, even if it is large and slow.</li>
  <li>The <strong>sales team</strong> wants restaurants that pay for promotion to appear more often.</li>
  <li>The <strong>product team</strong> notices that every extra 100 ms of latency lowers order rates, and wants results in under 100 ms.</li>
  <li>The <strong>platform team</strong> is fighting outages and wants fewer model updates.</li>
  <li>The <strong>finance lead</strong> wants to lower serving costs.</li>
</ul>
<p>No single model satisfies all of these. Production ML is a negotiation, and part of your job is making trade-offs explicit. A related trap: <strong>ensembles and giant models win competitions</strong> by tiny margins, but a 0.2% accuracy gain rarely justifies five times the latency and cost in a product.</p>

<h4>2. Latency and throughput</h4>
<p><strong>Latency</strong> is the time from receiving a query to returning a result. <strong>Throughput</strong> is how many queries are processed per unit of time. Research training jobs care about throughput (process the dataset quickly). User-facing products care about latency, because people abandon slow apps. The two can conflict: <em>batching</em> many requests together raises throughput but makes each request wait longer.</p>
<p>Latency is a <strong>distribution</strong>, not one number, and the mean is misleading. Look at a simulation where 97% of requests are fast and 3% hit a slow path:</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(7)
# 10,000 simulated request latencies (ms): most are fast, a few hit a slow path
fast = rng.normal(loc=95, scale=10, size=9_700)
slow = rng.normal(loc=3_000, scale=400, size=300)   # cold cache, big payloads...
latency_ms = np.clip(np.concatenate([fast, slow]), 1, None)

print(f"mean   : {latency_ms.mean():7.1f} ms")
for p in (50, 90, 95, 99, 99.9):
    print(f"p{p:&lt;5}: {np.percentile(latency_ms, p):7.1f} ms")
print(f"share of requests slower than 1 s: {(latency_ms &gt; 1000).mean():.1%}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean   :   182.0 ms
p50   :    95.2 ms
p90   :   109.4 ms
p95   :   115.2 ms
p99   :  3186.2 ms
p99.9 :  3778.9 ms
share of requests slower than 1 s: 3.0%</code></pre>
<p>The mean (182 ms) describes almost no real request: most take about 95 ms, while a few take three seconds. That is why engineers report <strong>percentiles</strong>: p50 (the median), p90, p95, p99. "p99 = 3186 ms" means 1% of requests take at least that long. These <em>tail</em> requests matter: the slowest requests often come from your most valuable users, because they have the longest histories and the most data to process. Service requirements are therefore written as percentiles, for example "p99 latency below 300 ms".</p>

<h4>3. Data</h4>
<p>Research datasets are clean and frozen. Production data is generated by users and systems in real time. It contains duplicates, missing fields, wrong labels and bugs from upstream services; it changes with seasons and trends; it may be biased toward the users you already have; and it often carries privacy obligations. Much of this track is about living with that reality.</p>

<h4>4. Fairness</h4>
<p>A model that is 95% accurate overall can be badly wrong for a specific group, for example applicants from certain zip codes. At scale, small biases are applied millions of times. We will return to this in the responsible AI lesson.</p>

<h4>5. Interpretability</h4>
<p>Business leaders, regulators and users may need to know <em>why</em> a decision was made: why a loan was denied, why a transaction was blocked. Interpretability also helps <em>you</em> debug: if a model relies on a feature that should not matter, you want to see that.</p>

<h3>ML systems vs. traditional software</h3>
<p>Traditional software engineering assumes code and data are separate: you test the code, and data just flows through. In ML, the system's behavior is partly <strong>code</strong> and partly <strong>data</strong>: the same training code produces a different model when the data changes. So you need to version and test data, not just code. Models can also be large (gigabytes), which makes loading, serving on small devices and monitoring harder. These differences are why ML needs its own engineering discipline.</p>

<div class="callout info"><strong>Scenario:</strong> FreshCart's first search model scored brilliantly offline. In production, it took 900 ms per query because it re-ranked 500 products with a large neural network. The team replaced it with a two-stage design: a fast model retrieves 100 candidates, and a slightly bigger model ranks only those. Offline accuracy dropped 1%, p99 latency fell to 120 ms, and revenue went up. Optimizing the model in isolation was the wrong goal.</div>
`,
          keyPoints: [
            "An ML system includes business requirements, data, features, model, serving, monitoring and infrastructure; the model is a small part.",
            "Use ML when there are complex, learnable patterns, data is available, the task is a prediction, and unseen data resembles training data.",
            "ML shines for repetitive, at-scale tasks where errors are cheap and patterns keep changing; start with a simple non-ML baseline.",
            "Production differs from research: many stakeholders, inference latency over training speed, shifting data, fairness and interpretability.",
            "Measure latency with percentiles (p50, p95, p99), not the mean; tail latency often hits your most valuable users.",
            "ML behavior depends on code AND data, so both must be versioned and tested."
          ],
          exercise: {
            prompt: String.raw`<p>For each idea below, decide whether ML is a good fit right now. Justify your answer using the criteria from the lesson, and if ML is not a good fit, propose what to do instead.</p>
<ol>
  <li>A logistics startup wants to compute shipping prices from package weight, dimensions and destination zone, using the carrier's published price table.</li>
  <li>A bank wants to flag potentially fraudulent card transactions in real time. It has five years of transactions with chargeback labels.</li>
  <li>A brand-new note-taking app with 200 users wants personalized feature recommendations.</li>
  <li>A city wants a model to decide prison sentence lengths from past court decisions.</li>
  <li>A news site wants to automatically tag 5,000 new articles per day with topics.</li>
</ol>`,
            solution: String.raw`<ol>
  <li><strong>Not ML.</strong> The pattern is not complex and is fully known: it is the published price table. A lookup or formula is exact, cheap and explainable. ML would only add error.</li>
  <li><strong>Good fit.</strong> Patterns are complex and change as fraudsters adapt, the task is repetitive and at huge scale, labeled history exists (chargebacks), and the task is a prediction (fraud probability). The cost of errors is real, so combine the model with business rules, thresholds tuned to cost, and human review for borderline cases.</li>
  <li><strong>Not yet.</strong> With 200 users there is too little data to learn complex patterns. Start with simple heuristics ("show the most-used features to new users") and log usage so you can train a model once there is enough data.</li>
  <li><strong>Do not use ML.</strong> This is a high-stakes decision about people's liberty; historical decisions encode human and systemic biases that the model would learn and scale. This is an example where using ML is unethical regardless of accuracy.</li>
  <li><strong>Good fit.</strong> Repetitive, at scale, patterns in text are complex, errors are cheap (a slightly wrong tag), and past tagged articles provide training data. A rule-based keyword tagger is a sensible first baseline.</li>
</ol>`
          },
          quiz: [
            { q: "Which property is the strongest sign that a problem should NOT be solved with ML?", options: ["The patterns change over time", "The output can be computed exactly by a simple known rule", "The task is repeated millions of times a day", "Wrong predictions are cheap"], answer: 1, explain: "If a simple known rule gives the exact answer, ML only adds cost and error. The other three properties actually favor ML." },
            { q: "A service has mean latency 120 ms and p99 latency 2.5 s. What does p99 = 2.5 s tell you?", options: ["99% of requests take 2.5 s", "1% of requests take at least 2.5 s", "The slowest request took 2.5 s", "The average of the slowest requests is 2.5 s"], answer: 1, explain: "The 99th percentile is the value that 99% of requests are at or below, so 1% of requests are at least that slow." },
            { q: "In production, which computational priority usually matters most for a user-facing model?", options: ["Fast training", "High training throughput", "Low inference latency", "Using the largest possible model"], answer: 2, explain: "Users wait for predictions, so inference latency dominates. Research cares more about training speed and throughput." },
            { q: "Why do ML systems require versioning data as well as code?", options: ["Data files are larger than code", "Regulators require it in all countries", "The same training code produces a different model when the data changes", "Data never changes once collected"], answer: 2, explain: "Model behavior is a function of both code and data, so reproducing or debugging a model requires knowing exactly which data it was trained on." }
          ]
        },
        {
          id: "mlsys-foundations-requirements",
          title: "Business Objectives, System Requirements and the Iterative Process",
          minutes: 45,
          objectives: [
            "Connect ML metrics to the business metrics a company actually cares about",
            "Explain the four requirements of an ML system: reliability, scalability, maintainability and adaptability",
            "Describe the iterative, cyclical process of developing ML systems"
          ],
          body: String.raw`
<p>A data scientist at a payments company proudly reports: "The new fraud model has 98.4% accuracy!" The head of risk replies: "How much money will it save us?" The data scientist does not know. This gap between ML metrics and business outcomes is one of the most common reasons ML projects get cancelled. In this lesson you will learn to start from the business objective, write down what the system must guarantee, and plan for an iterative process rather than a one-off project.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 2, "Introduction to Machine Learning Systems Design" (business and ML objectives, requirements, iterative process).</div>

<h3>Business objectives come first</h3>
<p>Companies do not care about F1 scores; they care about revenue, cost, user growth, retention and risk. An ML project exists only because someone believes it will move a business metric. Your job is to find the link:</p>
<ul>
  <li>A recommender's <strong>click-through rate</strong> matters because clicks lead to purchases or watch time.</li>
  <li>A churn model's <strong>recall</strong> matters because each correctly flagged customer can be offered a retention discount.</li>
  <li>A fraud model's errors have very different costs: a missed fraud costs the full chargeback, a false alarm costs a support call and an annoyed customer.</li>
</ul>
<p>Streaming services have shown how to make the link concrete: they define a <em>take-rate</em> (how many recommended items are actually played, divided by how many were shown) and show that a higher take-rate leads to more streaming hours and fewer cancellations. Once that chain is established, improving take-rate becomes a business argument, not just a technical one.</p>

<h4>Worked example: accuracy versus money</h4>
<p>Let us train a fraud model on toy data where 3% of transactions are fraud, then evaluate four decision thresholds. A missed fraud costs us $200; a false alarm costs $5.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Toy fraud data: 3% of transactions are fraud
X, y = make_classification(n_samples=20_000, n_features=10, n_informative=5,
                           weights=[0.97], random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=0, stratify=y)
proba = LogisticRegression(max_iter=1000).fit(X_tr, y_tr).predict_proba(X_te)[:, 1]

COST_MISSED_FRAUD = 200   # average chargeback we eat ($)
COST_FALSE_ALARM = 5      # support call + annoyed customer ($)

print("threshold  accuracy  recall  missed  false_alarms  business_cost")
for t in (0.5, 0.3, 0.1, 0.05):
    pred = proba &gt;= t
    acc = (pred == y_te).mean()
    tp = (pred &amp; (y_te == 1)).sum()
    fn = (~pred &amp; (y_te == 1)).sum()
    fp = (pred &amp; (y_te == 0)).sum()
    cost = fn * COST_MISSED_FRAUD + fp * COST_FALSE_ALARM
    print(f"{t:9.2f}  {acc:8.3f}  {tp/(tp+fn):6.2f}  {fn:6d}  {fp:12d}  {cost:13,d}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">threshold  accuracy  recall  missed  false_alarms  business_cost
     0.50     0.984    0.56     157             6         31,430
     0.30     0.983    0.64     127            44         25,620
     0.10     0.957    0.75      87           340         19,100
     0.05     0.903    0.78      77           889         19,845</code></pre>
<p>Read the table carefully. The default threshold of 0.5 has the <em>best accuracy</em> (98.4%) and the <em>worst business cost</em>. Lowering the threshold to 0.1 reduces accuracy to 95.7% but saves about $12,000 on this sample, because catching fraud is worth far more than avoiding false alarms. Lowering it further to 0.05 starts costing money again, because the extra false alarms outweigh the extra fraud caught. The "best model" depends on the business cost structure, which a pure ML metric does not know about.</p>

<div class="callout tip"><strong>Tip:</strong> Before building anything, write one sentence of the form: "If this model improves metric X by Y, business metric Z changes by roughly W." If nobody can fill it in, the project is not ready.</div>

<p>Also set realistic expectations about return on investment. Companies that have used ML for years tend to get much better returns than newcomers, because they already have the data pipelines, infrastructure and experience. Your first model will likely take longer to deploy than anyone expects; surveys of companies routinely report months between a working prototype and production.</p>

<h3>The four requirements of an ML system</h3>
<p>Most ML systems should satisfy four broad requirements. The exact targets depend on the use case, but each needs a deliberate answer.</p>

<h4>1. Reliability</h4>
<p>The system should keep performing the correct function at the desired level even when things go wrong (hardware faults, software bugs, bad input, human error). The ML-specific difficulty is <strong>silent failure</strong>. A traditional service that crashes returns an error; you notice. An ML model that has gone bad still returns predictions; they are just wrong. A translation system can confidently output fluent nonsense, and nothing in the logs will say "error". Detecting these silent failures is the job of monitoring (covered in the operations module).</p>

<h4>2. Scalability</h4>
<p>An ML system can grow in several ways:</p>
<ul>
  <li><strong>Model complexity</strong>: today a logistic regression using 1 GB of RAM, next year a neural network that needs a GPU.</li>
  <li><strong>Traffic</strong>: from 10,000 predictions a day to 10 million a day. Traffic also <em>fluctuates</em>, so you want <strong>autoscaling</strong> (adding and removing machines with demand). Shopping sites can see traffic multiply on peak sale days.</li>
  <li><strong>Number of models</strong>: from one model to hundreds, for example one model per country, or per feature on a website.</li>
</ul>
<p>Scalability also means <strong>artifact management</strong>: with hundreds of models you cannot manually track which version is deployed where. You need automated, repeatable processes for monitoring and retraining.</p>

<h4>3. Maintainability</h4>
<p>Many different people work on an ML system: ML engineers, DevOps engineers, data engineers, subject-matter experts. Each comes with their own tools. The system should be structured so they can all work on it: code documented, code and data and artifacts versioned, models reproducible, so that when the original author leaves, others can still understand, fix and improve it.</p>

<h4>4. Adaptability</h4>
<p>Data distributions and business requirements change quickly. The system should be able to discover opportunities for improvement and be updated <em>without service interruption</em>. Since ML behavior depends on code and data, and data changes constantly, adaptability is closely tied to maintainability.</p>

<table>
  <thead><tr><th>Requirement</th><th>Question to ask</th><th>Example target</th></tr></thead>
  <tbody>
    <tr><td>Reliability</td><td>How will we notice when predictions silently go bad?</td><td>Alert if the fraud-flag rate moves outside 0.5% to 3% for an hour</td></tr>
    <tr><td>Scalability</td><td>What is the peak load, and how many models will we run?</td><td>Handle 5,000 requests/s at p99 under 150 ms; autoscale 2 to 40 replicas</td></tr>
    <tr><td>Maintainability</td><td>Can a new hire retrain and redeploy the model?</td><td>One command reproduces any production model from versioned code and data</td></tr>
    <tr><td>Adaptability</td><td>How fast can we ship a better model?</td><td>New model version deployable within a day, with no downtime</td></tr>
  </tbody>
</table>

<h3>Developing ML systems is an iterative process</h3>
<p>Building an ML system is not a straight line from "data" to "done". It is a cycle you go around many times, often backtracking. A typical journey looks like this:</p>
<ol>
  <li><strong>Project scoping</strong>: define goals, objectives and constraints; identify stakeholders; estimate resources.</li>
  <li><strong>Data engineering</strong>: collect data from sources, store and process it, and build training data (sampling, labeling).</li>
  <li><strong>ML model development</strong>: engineer features, choose and train models, evaluate them offline. This is the part ML courses focus on.</li>
  <li><strong>Deployment</strong>: make the model accessible to users.</li>
  <li><strong>Monitoring and continual learning</strong>: watch for performance decay and update the model.</li>
  <li><strong>Business analysis</strong>: evaluate model performance against business goals, generate insights, and feed them back into scoping.</li>
</ol>
<p>Here is how the loop really runs. A ride-hailing team builds an arrival-time (ETA) model:</p>
<ul>
  <li>They pick mean absolute error as the metric and train a model on last year's trips.</li>
  <li>While building training data they realize trip logs lack traffic information, so they go back to data engineering to join a traffic feed.</li>
  <li>The improved model looks great offline, but after deployment, riders complain mostly about <em>underestimates</em> (the car arrives later than promised), which hurt more than overestimates. Business analysis sends them back to scoping: the loss should penalize lateness more than earliness.</li>
  <li>A few months later, a new road network in one city makes the model stale; monitoring detects the drift and triggers retraining.</li>
</ul>
<p>Every arrow can point backward. Planning for that, instead of treating deployment as the finish line, is the core mindset of this track.</p>

<div class="callout warn"><strong>Warning:</strong> "Deployed" is not "done". A model that is never monitored or updated decays as the world changes. Budget for operations from the start.</div>
`,
          keyPoints: [
            "ML projects exist to move business metrics; establish the link from ML metric to business metric before building.",
            "The model with the best accuracy is not necessarily the one with the best business outcome; error costs matter.",
            "Reliability in ML must handle silent failures: wrong predictions that look normal.",
            "Scalability covers model complexity, traffic (including fluctuating traffic and autoscaling) and number of models.",
            "Maintainability and adaptability require versioned code, data and artifacts, and the ability to update without downtime.",
            "ML development is a cycle: scoping, data engineering, modeling, deployment, monitoring, business analysis, and back again."
          ],
          exercise: {
            prompt: String.raw`<p>Your company runs a customer-support platform. Leadership wants to automatically route incoming support tickets to the right team (billing, technical, account, shipping). Today a human triage agent reads each ticket, which takes on average 4 minutes and costs about $1.20 per ticket. Volume is 30,000 tickets per day, with peaks of 3x after product launches.</p>
<p>Write a one-page requirements sketch that includes: (a) the business objective and how an ML metric connects to it, (b) a concrete target for each of the four requirements, and (c) what would send you back to an earlier step of the iterative process.</p>`,
            solution: String.raw`<p><strong>(a) Business objective.</strong> Reduce time-to-first-response and triage cost. Link: every correctly auto-routed ticket saves about $1.20 and 4 minutes; a misrouted ticket costs extra (it bounces between teams, roughly 10 minutes of agent time and a worse customer experience). So the ML metric is per-class precision and recall, but the decision rule should be: auto-route only when the model's confidence is high, and send uncertain tickets to the human triage queue. The headline metric becomes "share of tickets auto-routed correctly" with a cap on misrouting (for example under 3%).</p>
<p><strong>(b) Requirements.</strong></p>
<ul>
  <li><em>Reliability</em>: alert if the share of tickets the model sends to the human queue changes by more than 50% day over day, or if any team's routed volume changes sharply (a sign of silent failure). Fallback: if the model service is down, all tickets go to human triage.</li>
  <li><em>Scalability</em>: handle 90,000 tickets/day at peak (about 1 per second on average, with bursts); routing does not need to be instant, so p99 under 2 s is fine. Plan for more teams being added (more classes).</li>
  <li><em>Maintainability</em>: training pipeline in version control; training data snapshots versioned; one command to retrain; a short model card describing data, metrics and limitations.</li>
  <li><em>Adaptability</em>: product launches introduce new issue types, so retrain at least monthly and allow adding a new team without redesigning the system.</li>
</ul>
<p><strong>(c) Loops back.</strong> If teams report that misroutes are concentrated in one category, go back to data engineering (more labeled examples there) or scoping (maybe that category should always go to humans). If the business says response time is the real goal, not cost, scoping changes the objective (for example route urgent tickets first). If a new product launches, monitoring will show drift and trigger relabeling and retraining.</p>`
          },
          quiz: [
            { q: "A fraud model with the highest accuracy produces the highest dollar losses. What is the most likely explanation?", options: ["The accuracy was computed incorrectly", "Accuracy ignores the very different costs of missed fraud versus false alarms", "Fraud models should never be evaluated with accuracy because it is always zero", "The model is overfitting"], answer: 1, explain: "With rare fraud and asymmetric costs, a model can be very accurate by predicting 'not fraud' often, while missing expensive fraud cases. Business cost depends on the type of error." },
            { q: "What makes reliability especially hard for ML systems compared with traditional software?", options: ["ML models cannot run on servers", "ML systems can fail silently, returning plausible but wrong predictions", "ML systems never crash", "ML systems do not need monitoring"], answer: 1, explain: "A model can keep serving predictions that look normal but are wrong; nothing throws an error, so you need ML-specific monitoring." },
            { q: "Which of these is an example of the scalability requirement?", options: ["Documenting the feature pipeline", "Serving one model per country, growing from 3 to 120 models", "Retraining when user behavior changes", "Explaining a loan decision"], answer: 1, explain: "Scalability includes growth in the number of models, not just traffic or model size. Documentation is maintainability; retraining for change is adaptability." },
            { q: "Which statement best describes the ML development process?", options: ["A linear pipeline that ends at deployment", "A cycle in which later steps often send you back to earlier ones", "A process where data engineering happens only once", "A process that is complete when offline metrics are good"], answer: 1, explain: "ML development is iterative: deployment, monitoring and business analysis regularly send teams back to scoping, data and modeling." }
          ]
        },
        {
          id: "mlsys-foundations-framing",
          title: "Framing ML Problems: Tasks, Objectives and Mind vs. Data",
          minutes: 50,
          objectives: [
            "Translate a business problem into an ML task with defined inputs, outputs and objective function",
            "Distinguish binary, multiclass (including high-cardinality) and multilabel classification, and regression",
            "Explain how problem framing affects maintainability, using the next-app prediction example",
            "Decouple multiple objectives into separate models and combine their scores",
            "Summarize the 'mind versus data' debate and why data quality matters so much in practice"
          ],
          body: String.raw`
<p>A business problem is rarely an ML problem as stated. "Customer support is too slow" is a business problem. "Given the text of a ticket, predict which of four departments should handle it" is an ML problem: it has an input (the ticket text), an output (one of four departments), and an objective function you can optimize (cross-entropy loss). How you frame a problem decides how hard it is to solve, how expensive it is to maintain, and whether it serves the business at all.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 2, sections "Framing ML Problems" and "Mind Versus Data".</div>

<h3>Types of ML tasks</h3>
<p>The output of the model largely determines the task type.</p>
<h4>Classification versus regression</h4>
<p><strong>Classification</strong> models assign an input to one of several categories (spam or not spam). <strong>Regression</strong> models output a continuous value (a house price). The two can be converted into each other:</p>
<ul>
  <li>House price prediction can be framed as classification by bucketing prices: under $100k, $100k to $200k, and so on.</li>
  <li>Spam detection can be framed as regression: predict a spam score between 0 and 1, then apply a threshold (e.g. above 0.7 is spam).</li>
</ul>
<h4>Binary versus multiclass</h4>
<p><strong>Binary</strong> classification has two classes (fraud / not fraud). <strong>Multiclass</strong> has more than two (which of 10 product categories). When the number of classes is large, for example classifying a disease among thousands of diagnosis codes or a product among 10,000 catalog categories, the problem is called <strong>high-cardinality</strong>. It is hard because you need enough examples of every class, and many classes are rare. A common technique is <strong>hierarchical classification</strong>: first classify into a broad group (electronics, clothing, home), then use a second model to classify within that group.</p>
<h4>Multiclass versus multilabel</h4>
<p>In <strong>multiclass</strong> classification each example has exactly one label. In <strong>multilabel</strong> classification an example can have several: a news article can be about both "technology" and "finance". Two common approaches:</p>
<ol>
  <li>Treat it as one model whose target is a <em>multi-hot</em> vector, e.g. [technology=1, finance=1, sports=0], with an independent sigmoid per label.</li>
  <li>Train one binary classifier per label ("is this technology?", "is this finance?").</li>
</ol>
<p>Multilabel problems bring practical headaches: annotators disagree more often (one says "tech", another "tech and finance"), and turning probabilities into a final set of labels needs a threshold per label rather than simply taking the highest score.</p>

<h3>Changing the framing can change everything</h3>
<p>Consider a phone that wants to predict which app you will open next, so it can preload it. The natural framing is multiclass classification: input = user and context features (time, location, last app), output = a probability for each installed app. But every time a user installs a new app, the output layer needs a new class and the model must be retrained.</p>
<p>A better framing is <strong>regression/scoring</strong>: input = user features, context features <em>and the features of one candidate app</em>; output = a single score for "how likely is this app to be opened next". To decide, you score every installed app and pick the highest. A new app is just another input, with no retraining needed.</p>
<pre><code class="lang-python runnable">import numpy as np

# Framing a "which app will the user open next?" problem.
apps = ["mail", "maps", "music", "news", "chat"]
# Framing A: one classifier, one output per app. Adding an app = new output layer = retrain.
logits = np.array([2.0, 0.1, 1.2, -0.5, 1.9])
probs = np.exp(logits) / np.exp(logits).sum()
print("A) softmax over fixed classes:", {a: round(float(p), 3) for a, p in zip(apps, probs)})

# Framing B: a regression/scoring model f(user_features, app_features) -&gt; score.
# The SAME model scores any app, including one added tomorrow.
rng = np.random.default_rng(0)
w = rng.normal(size=4)
def score(user_vec, app_vec):
    return float(np.dot(w, user_vec * app_vec))
user = np.array([1.0, 0.2, 0.5, 0.9])
app_features = {a: rng.normal(size=4) for a in apps + ["podcasts"]}  # podcasts is new
scores = {a: round(score(user, v), 3) for a, v in app_features.items()}
print("B) per-app scores (new app included):", scores)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">A) softmax over fixed classes: {'mail': 0.387, 'maps': 0.058, 'music': 0.174, 'news': 0.032, 'chat': 0.35}
B) per-app scores (new app included): {'mail': 0.43, 'maps': -0.251, 'music': -0.755, 'news': 0.17, 'chat': -0.232, 'podcasts': -0.214}</code></pre>
<p>Framing A must be retrained to handle "podcasts"; framing B already scores it. Many production recommendation and search systems use exactly this "score each candidate" framing for the same reason.</p>

<h3>Objective functions</h3>
<p>To learn, a model needs an <strong>objective function</strong> (also called a loss function) that measures how wrong its predictions are. Training adjusts the parameters to minimize it. Common choices:</p>
<ul>
  <li>Regression: <strong>RMSE</strong> (root mean squared error, punishes large errors heavily) or <strong>MAE</strong> (mean absolute error, more robust to outliers).</li>
  <li>Binary classification: <strong>log loss</strong> (binary cross-entropy).</li>
  <li>Multiclass: <strong>categorical cross-entropy</strong>. Worked example: if the true class is "chat" and the model predicts p(chat) = 0.35, the loss is -ln(0.35) = 1.05. If it predicted 0.9, the loss would be -ln(0.9) = 0.105. Confident correct predictions are cheap; confident wrong predictions are very expensive.</li>
</ul>
<p>Choosing a standard loss is usually easy once the task type is fixed. The harder decisions are framing and the business metric. But one situation needs careful thought: when you have <em>several</em> objectives.</p>

<h3>Decoupling objectives</h3>
<p>Suppose you rank posts in a social newsfeed. The original goal is engagement: rank by predicted clicks. You soon notice the model promotes extreme, low-quality content because it is engaging. The new goal is: maximize engagement while keeping quality high. Now you have two objectives that sometimes conflict. If a post is engaging but low quality, should it rank high?</p>
<p>Option 1: combine the losses and train one model: <code>loss = a * quality_loss + b * engagement_loss</code>. The problem: every time the product team wants to change the balance (a and b), you must retrain the model.</p>
<p>Option 2: <strong>decouple</strong> the objectives. Train a <code>quality_model</code> that predicts post quality and an <code>engagement_model</code> that predicts clicks. At ranking time combine their outputs: <code>score = a * quality_score + b * engagement_score</code>. Now you can tune a and b with no retraining:</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(1)
posts = [f"post_{i}" for i in range(6)]
# Outputs of two SEPARATELY trained models (already normalised to 0..1)
quality_score    = np.array([0.90, 0.20, 0.75, 0.40, 0.95, 0.10])
engagement_score = np.array([0.30, 0.95, 0.60, 0.70, 0.20, 0.90])

def rank(alpha, beta):
    combined = alpha * quality_score + beta * engagement_score
    order = np.argsort(-combined)
    return [posts[i] for i in order]

# Product decides how much each objective matters -- no retraining needed
print("engagement-heavy (a=0.2, b=0.8):", rank(0.2, 0.8)[:3])
print("balanced         (a=0.5, b=0.5):", rank(0.5, 0.5)[:3])
print("quality-heavy    (a=0.8, b=0.2):", rank(0.8, 0.2)[:3])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">engagement-heavy (a=0.2, b=0.8): ['post_1', 'post_5', 'post_3']
balanced         (a=0.5, b=0.5): ['post_2', 'post_0', 'post_1']
quality-heavy    (a=0.8, b=0.2): ['post_4', 'post_0', 'post_2']</code></pre>
<p>Decoupling also helps maintenance: different objectives change at different speeds. Spam techniques evolve weekly, while what users consider "quality" changes slowly, so a spam filter can be retrained far more often than the quality model. The general rule: <strong>when you have multiple objectives, decouple them first</strong>. (If you need to tune many weights systematically, the area of mathematics that studies trade-offs between objectives is called Pareto optimization.)</p>

<h3>Mind versus data</h3>
<p>Should progress in ML come from smarter algorithms (<em>mind</em>: clever architectures, built-in assumptions called inductive biases) or from more data and computation (<em>data</em>)? This is a long-running debate:</p>
<ul>
  <li>On the "mind" side, researchers such as Judea Pearl argue data alone cannot reveal causes, and that structure lets systems learn more from less data.</li>
  <li>On the "data" side, Richard Sutton's essay "The Bitter Lesson" argues that, over 70 years of AI research, general methods that exploit more computation have consistently beaten hand-crafted human knowledge. Google's search team famously credited more data rather than better algorithms for their success.</li>
</ul>
<p>The practical question is not whether data is <em>necessary</em> (it obviously is) but whether it is <em>sufficient</em>. Regardless of who wins philosophically, recent industry experience is clear: model quality depends heavily on the <strong>quantity and quality</strong> of data. Models keep growing, and so do their datasets. Data science's "hierarchy of needs" puts data collection and reliable data flow at the base of the pyramid; you cannot do ML well without them.</p>
<p>A crucial caveat for practitioners: <strong>more data is not always better</strong>. Low-quality data (outdated, mislabeled, duplicated, biased) can hurt a model. Ten thousand carefully labeled examples often beat a million noisy ones. The next module is about getting the data right.</p>

<div class="callout tip"><strong>Tip:</strong> When framing a problem, write down: input, output, task type, objective function, business metric, and how a new category or entity would be handled. That last item catches the "next-app" kind of maintenance trap early.</div>
`,
          keyPoints: [
            "Framing turns a business problem into an ML problem with defined input, output and objective function.",
            "Classification and regression can be converted into each other; high-cardinality problems often use hierarchical classification.",
            "Multilabel problems allow several labels per example and need per-label thresholds; annotator disagreement is common.",
            "Framing as 'score each candidate' instead of 'pick one of N fixed classes' avoids retraining when new items appear.",
            "With multiple objectives, train separate models and combine scores with tunable weights: easier to tune and maintain.",
            "Data quantity and quality drive much of production ML performance, but more low-quality data can hurt."
          ],
          exercise: {
            prompt: String.raw`<p>Frame each of these business problems as an ML problem. For each, give the input, output, task type, objective (loss) function, and the business metric you would report. Point out one framing pitfall.</p>
<ol>
  <li>An online marketplace wants to show buyers an estimated delivery date.</li>
  <li>A music app wants to auto-tag uploaded songs with moods (happy, calm, energetic, sad, romantic); a song can have several moods.</li>
  <li>A video platform wants a homepage that keeps users watching, but leadership also wants to avoid promoting clickbait.</li>
</ol>`,
            solution: String.raw`<ol>
  <li><strong>Delivery date.</strong> Input: seller location, buyer location, item size, carrier, order time, seller's historical handling time. Output: delivery time in days (or hours). Task: regression. Loss: MAE, or better an asymmetric loss (penalize late estimates more than early ones, because a late package hurts trust more). Business metric: share of orders delivered on or before the promised date, and conversion rate. <em>Pitfall</em>: optimizing pure RMSE treats early and late equally, which does not match how customers feel.</li>
  <li><strong>Song moods.</strong> Input: audio features (spectrogram embeddings), lyrics, metadata. Output: a multi-hot vector over 5 moods. Task: multilabel classification. Loss: binary cross-entropy summed over the 5 labels (one sigmoid per mood). Business metric: listening time on mood playlists, or editor acceptance rate of suggested tags. <em>Pitfalls</em>: annotators disagree on moods (write labeling guidelines, measure agreement), and you need a threshold per mood instead of argmax.</li>
  <li><strong>Homepage ranking with two goals.</strong> Decouple: an <code>engagement_model</code> predicts the probability of a long watch (e.g. watched over 50%), a <code>quality_model</code> (or a clickbait classifier) predicts quality. Task: both are binary classification scored per candidate video (not a fixed multiclass over all videos, so new uploads are handled). Loss: log loss for each. Ranking score = a * engagement + b * quality, with a and b tuned through online experiments without retraining. Business metric: weekly watch time and 30-day retention, with clickbait report rate as a guardrail metric. <em>Pitfall</em>: optimizing raw clicks alone rewards clickbait.</li>
</ol>`
          },
          quiz: [
            { q: "A phone predicts the next app a user opens using a softmax over all installed apps. Why might a scoring framing be better?", options: ["Softmax cannot output probabilities", "With scoring, a newly installed app can be scored without retraining the model", "Scoring models are always more accurate", "Softmax models cannot use time-of-day features"], answer: 1, explain: "A fixed softmax output needs a new class (and retraining) for each new app. Scoring each (user, context, app) pair handles new apps as just another input." },
            { q: "A news article can be tagged as both 'politics' and 'economy'. What type of task is this?", options: ["Binary classification", "Multiclass classification", "Multilabel classification", "Regression"], answer: 2, explain: "Each example can have more than one label, which is multilabel classification." },
            { q: "Why train separate quality and engagement models instead of one model with a combined loss a*quality_loss + b*engagement_loss?", options: ["Combined losses cannot be optimized", "Separate models let you change a and b without retraining, and maintain each on its own schedule", "Separate models always use less compute", "One model cannot predict two things"], answer: 1, explain: "Decoupling lets you re-weight objectives at ranking time and update fast-changing objectives (like spam) more often than slow-changing ones." },
            { q: "The true class has predicted probability 0.9 in one case and 0.35 in another. How do their cross-entropy losses compare?", options: ["Both are equal", "0.9 gives about 0.105, 0.35 gives about 1.05", "0.9 gives a higher loss", "Cross-entropy is not defined for probabilities"], answer: 1, explain: "Cross-entropy is -ln(p): -ln(0.9) is about 0.105 and -ln(0.35) is about 1.05, so less confident correct predictions cost more." },
            { q: "What is the most accurate summary of the 'mind versus data' discussion for practitioners?", options: ["Data is irrelevant if the architecture is good", "More data always helps, regardless of quality", "Data is necessary and quality and quantity strongly drive results, but low-quality data can hurt", "Only clever algorithms matter in production"], answer: 2, explain: "Data is clearly necessary and has driven recent progress; whether it is sufficient is debated. In practice, quality matters as much as quantity." }
          ]
        }
      ]
    },
    {
      id: "mlsys-data",
      title: "Data Engineering, Training Data and Features",
      summary: "Where production data comes from, how it is stored and moved, how to sample and label it, how to handle imbalance, and how to engineer features without leaking the answer.",
      lessons: [
        {
          id: "mlsys-data-sources-formats",
          title: "Data Sources, Formats and Data Models",
          minutes: 45,
          objectives: [
            "Identify the main sources of data in a company and how trustworthy each is",
            "Explain row-major versus column-major formats and text versus binary formats, and choose between them",
            "Compare relational, document and graph data models, and structured versus unstructured storage"
          ],
          body: String.raw`
<p>Every ML system is built on data, and in a company that data is scattered across apps, logs, databases and vendors, each with its own format and quirks. Before you can train anything, you need to know where data comes from, how it is written down, and how it is organized. Choices here decide whether a query takes seconds or hours and whether storage costs hundreds or thousands of dollars per month.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 3, "Data Engineering Fundamentals" (data sources, data formats, data models).</div>

<h3>Data sources</h3>
<ul>
  <li><strong>User input data</strong>: text typed into search boxes, uploaded images, form fields, clicks. It is the most likely to be malformed: users type phone numbers into name fields, upload huge files, or paste text in unexpected languages. It also usually needs fast processing, because users expect a response now. Validate it heavily.</li>
  <li><strong>System-generated data</strong>: logs produced by your services (requests, errors, latencies), and system outputs such as model predictions. Logs are invaluable for debugging and monitoring, but they grow enormous quickly. Because they are generated automatically they are less likely to be malformed than user input, but you must decide how long to keep them and how to search them.</li>
  <li><strong>Internal databases</strong>: the data your company's services use to run the business, such as inventory, customers, orders. An ML model might take a user query from the search box, but then check the inventory database to know which products are in stock.</li>
  <li><strong>Third-party data</strong>: data bought from vendors, such as demographic or interest data about people. It can help when you have little data of your own, but it raises privacy concerns, is increasingly restricted by regulation and platforms, and quality varies widely.</li>
</ul>
<div class="callout info"><strong>Scenario:</strong> A travel site's hotel-ranking model uses all four sources: the search query and filters (user input), click and booking logs (system-generated), hotel availability and prices (internal database), and a purchased dataset of local events that affect demand (third-party). Each arrives at a different speed and with a different reliability, which shapes how the pipeline is designed.</div>

<h3>Data formats</h3>
<p>Once you have data you must store it, and storing means choosing a format. The process of converting an in-memory data structure into something that can be stored or sent over the network is called <strong>serialization</strong>; reading it back is deserialization. Questions to ask: how will the data be used in the future (read whole rows or a few columns?), does it need to be human-readable, how big is it, and which tools must read it?</p>
<table>
  <thead><tr><th>Format</th><th>Binary or text</th><th>Human-readable</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td>JSON</td><td>Text</td><td>Yes</td><td>APIs, configs, nested records</td></tr>
    <tr><td>CSV</td><td>Text</td><td>Yes</td><td>Simple tables, exports, spreadsheets</td></tr>
    <tr><td>Parquet</td><td>Binary</td><td>No</td><td>Analytics on large tables (Hadoop, Spark, warehouses)</td></tr>
    <tr><td>Avro</td><td>Binary</td><td>No</td><td>Streaming, schema-evolving records (Kafka)</td></tr>
    <tr><td>Protocol Buffers</td><td>Binary</td><td>No</td><td>Service-to-service messages (gRPC)</td></tr>
    <tr><td>Pickle</td><td>Binary</td><td>No</td><td>Python objects, including models (only load files you trust)</td></tr>
  </tbody>
</table>
<p><strong>JSON</strong> is everywhere because it is simple and flexible: any nested key-value structure can be stored. That flexibility is also its pain point: once data is stored as JSON, nothing stops two writers from using different structures, so every reader must handle all variations. It also takes a lot of space.</p>

<h4>Row-major versus column-major</h4>
<p>Think of a table as a grid. A <strong>row-major</strong> format (CSV) stores the values of one row next to each other on disk: <code>user1,age1,spend1</code>, then <code>user2,age2,spend2</code>. A <strong>column-major</strong> format (Parquet) stores the values of one column next to each other: all user ids, then all ages, then all spends.</p>
<ul>
  <li>Row-major is faster for <em>writing</em> new records (just append a row) and for reading whole records ("fetch everything about order 512").</li>
  <li>Column-major is faster for <em>column-based reads</em> ("average spend across 100 million orders"), because the computer reads one contiguous block and skips the other columns entirely. ML feature computation is very often column-based: you want a few features across many examples.</li>
</ul>
<p>The same principle applies in memory. NumPy lets you choose the layout (C order is row-major, Fortran order is column-major), and pandas stores a DataFrame column by column. That is why looping over rows in pandas is notoriously slow:</p>
<pre><code class="lang-python runnable">import time
import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
data = rng.random((2_000, 200))

row_major = np.ascontiguousarray(data)   # C order: each ROW is contiguous in memory
col_major = np.asfortranarray(data)      # F order: each COLUMN is contiguous

def avg_time(fn, repeat=300):
    t0 = time.perf_counter()
    for _ in range(repeat):
        fn()
    return (time.perf_counter() - t0) / repeat

# Analytics-style query: read ONE column across all rows
t_row = avg_time(lambda: row_major[:, 17].sum())
t_col = avg_time(lambda: col_major[:, 17].sum())
print("column read faster on column-major:", t_col &lt; t_row)

# pandas stores a DataFrame column by column -&gt; row-by-row loops are slow
df = pd.DataFrame(data[:, :5], columns=list("abcde"))
t0 = time.perf_counter(); s1 = sum(row["a"] for _, row in df.iterrows()); t_iter = time.perf_counter() - t0
t0 = time.perf_counter(); s2 = df["a"].sum(); t_vec = time.perf_counter() - t0
print("same answer:", bool(np.isclose(s1, s2)), "| iterrows at least 20x slower:", t_iter &gt; 20 * t_vec)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">column read faster on column-major: True
same answer: True | iterrows at least 20x slower: True</code></pre>
<p>(The exact timings depend on your machine, which is why the example prints comparisons instead of raw numbers.) The lesson: match the storage layout to the access pattern. If your workload writes events one at a time, a row format suits the writer; if your training job reads a handful of columns from billions of rows, convert to a columnar format.</p>

<h4>Text versus binary</h4>
<p>Text formats store everything as characters. The number 1000000 in CSV takes 7 characters (7 bytes), but as a 32-bit integer in binary it takes 4 bytes, and a full-precision float written as text takes about 18 characters versus 8 bytes in binary. Binary formats are also faster to parse. Compare the same 10,000-row table:</p>
<pre><code class="lang-python runnable">import io, json
import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
n = 10_000
df = pd.DataFrame({
    "user_id": np.arange(n),
    "age": rng.integers(18, 80, n),
    "spend": rng.random(n) * 1000,          # full-precision floats
})

csv_bytes = df.to_csv(index=False).encode()
json_bytes = df.to_json(orient="records", double_precision=15).encode()

# Binary, each column stored with a compact fixed-size type
buf = io.BytesIO()
np.savez(buf, user_id=df["user_id"].to_numpy(np.int32),
         age=df["age"].to_numpy(np.int8), spend=df["spend"].to_numpy(np.float64))

print(f"{'CSV  (text, row)':24s} {len(csv_bytes)/1024:7.1f} KB")
print(f"{'JSON (text, row)':24s} {len(json_bytes)/1024:7.1f} KB")
print(f"{'NPZ  (binary, columnar)':24s} {buf.getbuffer().nbytes/1024:7.1f} KB")
print("one JSON record:", json.loads(json_bytes)[0])
print("one CSV line   :", csv_bytes.decode().splitlines()[1])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">CSV  (text, row)           254.4 KB
JSON (text, row)           524.1 KB
NPZ  (binary, columnar)    127.7 KB
one JSON record: {'user_id': 0, 'age': 70, 'spend': 885.204221978855}
one CSV line   : 0,70,885.204221978855</code></pre>
<p>JSON is largest because every record repeats every key name. The binary columnar version is half the size of CSV, with compact types for each column. On real datasets, columnar binary formats such as Parquet also compress very well; cloud providers publicly recommend Parquet for analytics because it is both faster to unload and much cheaper to store than text formats. The price: you cannot open a binary file in a text editor to inspect it.</p>

<h3>Data models</h3>
<p>A <strong>data model</strong> describes how data is represented and how pieces relate to each other. The choice affects how easy it is to build and query your system.</p>
<h4>Relational model</h4>
<p>Data is organized into <strong>relations</strong> (tables) of tuples (rows). Order of rows and columns does not matter. Relational data is often <strong>normalized</strong>: instead of repeating a publisher's name and country in every book row, you store publishers in their own table and reference them by id. This avoids inconsistencies (update the country once), at the cost of needing <strong>joins</strong> across tables, which can be expensive on large data.</p>
<p>You query relational databases with <strong>SQL</strong>, a <em>declarative</em> language: you describe <em>what</em> data you want (tables, conditions, aggregations), and the database's query optimizer figures out <em>how</em> to retrieve it. This is powerful and is why SQL remains the backbone of most data work, including ML feature computation.</p>
<pre><code class="lang-text">-- Declarative: say WHAT you want, not HOW to get it
SELECT user_id, COUNT(*) AS orders_30d, AVG(total) AS avg_basket
FROM orders
WHERE order_date &gt;= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id;</code></pre>
<h4>NoSQL: document and graph models</h4>
<p>The relational model requires a strict schema, and schema management frustrated many developers. <strong>NoSQL</strong> ("not only SQL") covers non-relational models, the two main ones being:</p>
<ul>
  <li><strong>Document model</strong>: data is stored as self-contained documents, often JSON. Each document can have its own structure ("schemaless"). Fetching everything about one book is a single read, which gives good <em>locality</em>. But queries across documents ("all books under $20") are harder, and the schema has not disappeared: the responsibility for knowing the structure has moved from the database (on write) to the application reading the data (on read).</li>
  <li><strong>Graph model</strong>: data is stored as nodes and edges, prioritizing <em>relationships</em>. Questions like "find all people who were born in the same country as someone this user follows" are natural in a graph database and painful in SQL. Social networks, knowledge graphs and fraud rings are typical uses.</li>
</ul>
<h4>Structured versus unstructured data</h4>
<p><strong>Structured</strong> data follows a predefined schema (every row has the same typed columns), which makes it easy to search and analyze, but the schema must be decided upfront and changed carefully. <strong>Unstructured</strong> data (text, images, audio, raw logs) does not follow a schema, which is flexible but puts the burden on whoever reads it. A repository for structured data is called a <strong>data warehouse</strong>; a repository for raw, often unstructured data is called a <strong>data lake</strong>. Data lakes are often used to store raw data before processing; warehouses store data already processed into usable form. Many companies use both, and newer "lakehouse" products try to combine them.</p>
<table>
  <thead><tr><th>Structured</th><th>Unstructured</th></tr></thead>
  <tbody>
    <tr><td>Schema clearly defined, enforced on write</td><td>Data does not have to follow a schema</td></tr>
    <tr><td>Easy to search and analyze</td><td>Fast to arrive, no upfront agreement needed</td></tr>
    <tr><td>Schema changes cause trouble</td><td>Reader must handle every variation</td></tr>
    <tr><td>Stored in a data warehouse</td><td>Stored in a data lake</td></tr>
  </tbody>
</table>
`,
          keyPoints: [
            "Data sources include user input (most error-prone), system logs, internal databases and third-party data (privacy concerns).",
            "Row-major formats (CSV) suit writes and whole-record reads; column-major formats (Parquet) suit reading a few columns over many rows, which is typical for ML.",
            "Binary formats are smaller and faster than text formats but not human-readable.",
            "pandas is column-oriented: vectorized column operations beat row loops by orders of magnitude.",
            "Relational models normalize data and use declarative SQL; document models favor locality; graph models favor relationships.",
            "Structured data lives in warehouses with schema-on-write; unstructured data lives in lakes with schema-on-read."
          ],
          exercise: {
            prompt: String.raw`<p>A ride-sharing company logs every trip event (requested, accepted, started, completed) from its mobile apps. The ML team trains an ETA model nightly using 6 features out of the 80 fields in each event, over 2 billion events. Analysts also occasionally look up "everything about trip 8812731" when a customer complains.</p>
<ol>
  <li>Which format would you use for the raw incoming event stream, and which for the training dataset? Why?</li>
  <li>Write a short pandas snippet showing the efficient (vectorized) way to compute average trip duration per city from a DataFrame with columns <code>city</code>, <code>start_ts</code>, <code>end_ts</code>.</li>
  <li>Driver-rider relationships are needed for a fraud model looking for rings of colluding accounts. Which data model fits this best?</li>
</ol>`,
            solution: String.raw`<ol>
  <li>The raw event stream is written one event at a time, so a row-oriented, schema-carrying binary format like <strong>Avro</strong> (or Protocol Buffers) fits the producers and the message broker. For training, convert to a <strong>columnar format like Parquet</strong>: the training job reads only 6 of 80 columns across 2 billion rows, so columnar storage avoids reading the other 74 columns and compresses well. The occasional "everything about trip X" lookup is a row-style query, best served by the operational (transactional) database or by a lookup on the event store, not by the training files.</li>
  <li>Vectorized column operations, no Python loops:</li>
</ol>
<pre><code class="lang-python runnable">import pandas as pd

trips = pd.DataFrame({
    "city": ["paris", "paris", "lyon", "lyon", "lyon"],
    "start_ts": pd.to_datetime(["2024-05-01 08:00", "2024-05-01 09:10", "2024-05-01 07:55",
                                "2024-05-01 08:30", "2024-05-01 12:00"]),
    "end_ts": pd.to_datetime(["2024-05-01 08:25", "2024-05-01 09:30", "2024-05-01 08:05",
                              "2024-05-01 08:58", "2024-05-01 12:12"]),
})
trips["duration_min"] = (trips["end_ts"] - trips["start_ts"]).dt.total_seconds() / 60
print(trips.groupby("city")["duration_min"].mean().round(1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">city
lyon     16.7
paris    22.5
Name: duration_min, dtype: float64</code></pre>
<ol start="3">
  <li>A <strong>graph model</strong>: accounts and devices as nodes, trips and shared payment methods as edges. Queries like "find accounts within 2 hops that share a device" are natural in a graph and very awkward as repeated SQL self-joins.</li>
</ol>`
          },
          quiz: [
            { q: "Your training job reads 5 of 200 columns from a 3-billion-row table. Which format is the best fit?", options: ["CSV", "JSON", "A column-major format like Parquet", "A pickle of a Python list"], answer: 2, explain: "Column-major formats store each column contiguously, so the job reads only the 5 columns it needs instead of every full row." },
            { q: "Why is iterating with df.iterrows() so much slower than df['a'].sum() in pandas?", options: ["iterrows sorts the data first", "pandas stores data by column, and iterrows builds a Python object for each row", "sum() uses a GPU", "iterrows reads the data from disk again"], answer: 1, explain: "pandas is column-oriented and vectorized operations run in compiled code over contiguous memory; iterrows creates a Series per row in Python, which is very slow." },
            { q: "What is a downside of the document (NoSQL) model compared with the relational model?", options: ["It cannot store JSON", "Queries across many documents, such as filtering on a field, are harder and the schema burden moves to the reader", "It requires normalization", "It cannot store a whole record in one place"], answer: 1, explain: "Document databases give great locality for one document but make cross-document queries harder; the schema still exists, it is just assumed by the application on read." },
            { q: "Which data source is most likely to be malformed and need heavy validation?", options: ["User input data", "System-generated logs", "A normalized internal database", "Model predictions"], answer: 0, explain: "Users enter all kinds of unexpected input, so user input needs the most validation and is the most error-prone." }
          ]
        },
        {
          id: "mlsys-data-storage-dataflow",
          title: "Storage, Processing and Dataflow: OLTP, OLAP, ETL and Streams",
          minutes: 50,
          objectives: [
            "Contrast transactional (OLTP) and analytical (OLAP) databases and their guarantees",
            "Explain ETL and ELT and when each is used",
            "Describe the three modes of dataflow: through databases, through services, and through real-time transport",
            "Compare batch and stream processing and compute a streaming feature"
          ],
          body: String.raw`
<p>Data rarely stays in one place. An order is written to the shop's database, copied into the analytics warehouse overnight, turned into features for the recommendation model, and sent as an event to the fraud model within milliseconds. This lesson covers how data is stored for different workloads and how it moves between processes, which is exactly where many production ML bugs and delays live.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 3, sections "Data Storage Engines and Processing", "Modes of Dataflow" and "Batch Processing Versus Stream Processing".</div>

<h3>Transactional versus analytical processing</h3>
<p>Databases are typically optimized for one of two workloads.</p>
<p><strong>Transactional processing (OLTP)</strong>: online transaction processing handles the actions of an application as they happen: a user places an order, a driver accepts a ride, a payment is recorded. Each transaction touches a few rows, must be fast (users are waiting) and highly available. Many transactional databases guarantee <strong>ACID</strong>:</p>
<ul>
  <li><strong>Atomicity</strong>: all steps of a transaction succeed or none do (if the payment fails, the ride is not assigned).</li>
  <li><strong>Consistency</strong>: every transaction leaves data valid according to predefined rules.</li>
  <li><strong>Isolation</strong>: concurrent transactions behave as if run one after another (two riders cannot book the same driver).</li>
  <li><strong>Durability</strong>: once committed, data survives crashes.</li>
</ul>
<p>Some systems relax ACID for scale and availability; their guarantee is jokingly called <strong>BASE</strong> ("basically available, soft state, eventual consistency"): the data will become consistent eventually, but you might read stale values for a while.</p>
<p><strong>Analytical processing (OLAP)</strong>: online analytical processing answers questions that aggregate over many rows: "average order value per city last month". Transactional databases, which are usually row-oriented, are slow at such queries; analytical databases (often columnar) are built for them.</p>
<p>The OLTP/OLAP split is somewhat outdated. Modern systems blur the line (some transactional databases handle analytical queries and vice versa), and more importantly, modern data platforms <strong>decouple storage from processing</strong>: data sits in cheap object storage and different engines (SQL, Spark, ML training) process it. "Online" also has evolved to mean "available fast", from milliseconds to seconds.</p>

<h3>ETL and ELT</h3>
<p><strong>ETL</strong> (extract, transform, load) is the classic way to move data from operational systems into analytical storage:</p>
<ol>
  <li><strong>Extract</strong> data from sources (databases, APIs, logs). Validate and reject malformed records here; catching bad data early saves trouble downstream.</li>
  <li><strong>Transform</strong>: join sources, clean, standardize (e.g. one source uses "Male/Female", another "M/F", another "1/2"), deduplicate, aggregate, derive columns.</li>
  <li><strong>Load</strong> the result into the target warehouse, on a schedule (for example nightly).</li>
</ol>
<p>When storage got cheap and data volumes exploded, many teams switched to <strong>ELT</strong>: extract and load raw data straight into a data lake first, and transform later when someone needs it. This makes ingestion fast and keeps raw data for future uses nobody anticipated. The downside: searching through a huge lake of raw, inconsistent data is inefficient, so teams end up adding structure back. Hybrid "lakehouse" designs aim to give both the flexibility of a lake and the management of a warehouse.</p>

<h3>Modes of dataflow</h3>
<p>When data must pass from one process to another (they do not share memory), there are three main ways.</p>
<h4>1. Through databases</h4>
<p>Process A writes to a database, process B reads from it. Simple, but both processes need access to the same database, and database reads and writes can be too slow for latency-critical applications (most consumer apps).</p>
<h4>2. Through services (request-driven)</h4>
<p>Process B exposes an API; process A sends a request over the network and gets a response. The two processes can belong to different teams or companies. This is the basis of a <strong>microservice architecture</strong>: each component (pricing, driver management, ETA) is its own service. The most common styles are <strong>REST</strong> (HTTP endpoints, used for public APIs) and <strong>RPC</strong> (remote procedure call frameworks such as gRPC, often used between services in the same organization).</p>
<p>The problem appears as services multiply. Imagine a ride-sharing price-optimization service that needs data from the driver service (available drivers), the ride service (recent rides) and the user service. Each of those may also need data from the others. With dozens of services calling each other, the interconnections become complex, slow and fragile: if one service is down, many callers break.</p>
<h4>3. Through real-time transport</h4>
<p>Instead of services calling each other, each service publishes events to a central <strong>broker</strong>, and anyone interested reads them. The driver service publishes "driver 42 is now available" once; the price service, the ETA service and the analytics pipeline each consume it. Data that is broadcast to the broker is called an <strong>event</strong>; this is an event-driven architecture. The broker is sometimes called an event bus.</p>
<ul>
  <li><strong>Pub/sub</strong> (publish-subscribe): services publish to <em>topics</em>, and consumers subscribe to the topics they need. Events are retained for a period (e.g. 7 days) and then deleted or moved to cheap storage. Examples: Apache Kafka, Amazon Kinesis.</li>
  <li><strong>Message queues</strong>: an event (message) is often intended for specific consumers, and the queue is responsible for delivering it. Examples: RabbitMQ, Apache RocketMQ.</li>
</ul>
<p>Request-driven systems suit logic-heavy interactions; event-driven systems suit data-heavy flows, which is why real-time ML features are usually built on real-time transport.</p>

<h3>Batch processing versus stream processing</h3>
<p>Once data lands in a warehouse, it is <strong>historical</strong> data, and you process it with <strong>batch jobs</strong> that run periodically (every night, every hour), typically with MapReduce-style engines like Spark or with SQL. Data still flowing through real-time transport is <strong>streaming</strong> data, and computing on it as it arrives is <strong>stream processing</strong>, with engines like Apache Flink or Spark Streaming.</p>
<figure><img src="assets/diagrams/mlsys-batch-vs-stream.svg" alt="Two lanes: events to data warehouse to nightly batch job to batch features; events to real-time transport to stream processor to stream features; both feed the model"><figcaption>The same events can feed slow-changing batch features and fresh streaming features; a model often uses both.</figcaption></figure>
<p>For ML this maps onto two kinds of features:</p>
<ul>
  <li><strong>Batch features</strong> (also called static features) change slowly: a restaurant's average rating, a driver's lifetime number of trips. Computing them nightly is fine.</li>
  <li><strong>Streaming features</strong> (dynamic features) change fast: the number of drivers available in this neighborhood right now, the average price of rides in the last 10 minutes, how many items a user viewed in the last 5 minutes. They must be computed from the stream.</li>
</ul>
<p>Here is the same price data processed both ways. The batch feature is computed once at the end of the hour; the streaming feature is updated with every event using a 10-minute sliding window:</p>
<pre><code class="lang-python runnable">from collections import deque
import numpy as np
import pandas as pd

rng = np.random.default_rng(3)
# A ride-sharing app: one event per completed trip, with its price
events = pd.DataFrame({
    "minute": np.sort(rng.integers(0, 60, 40)),
    "price": rng.gamma(shape=4, scale=3, size=40).round(2),
})

# BATCH: once per hour, a warehouse job computes the feature for the whole hour
batch_feature = events["price"].mean()
print(f"batch feature (hourly avg price, computed at minute 60): {batch_feature:.2f}")

# STREAM: a consumer updates a 10-minute sliding-window average as each event arrives
window = deque()
running_sum = 0.0
snapshots = {}
for minute, price in events.itertuples(index=False):
    window.append((minute, price)); running_sum += price
    while window and window[0][0] &lt;= minute - 10:      # evict events older than 10 min
        old_minute, old_price = window.popleft(); running_sum -= old_price
    snapshots[int(minute)] = running_sum / len(window)

for m in sorted(snapshots)[::8]:
    print(f"minute {m:2d}: streaming 10-min avg price = {snapshots[m]:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">batch feature (hourly avg price, computed at minute 60): 12.16
minute  1: streaming 10-min avg price = 11.14
minute 17: streaming 10-min avg price = 9.42
minute 35: streaming 10-min avg price = 8.88
minute 48: streaming 10-min avg price = 15.49</code></pre>
<p>The hourly batch average (12.16) hides that prices dropped to about 8.9 around minute 35 and surged to 15.5 by minute 48. A surge-pricing or ETA model that only saw the batch value would react far too late. Stream processing is harder (state management, out-of-order events, exactly-once delivery), but it gives low latency, and done well it can even be <em>more</em> efficient than recomputing large batches, because it only processes new data. In practice, mature companies need both: batch for features that tolerate staleness, streams for the ones that do not.</p>

<div class="callout warn"><strong>Warning:</strong> If training features come from a batch pipeline but production features come from a stream pipeline, the two implementations can differ subtly (different window boundaries, different handling of late events). This <em>train-serving skew</em> is a classic silent bug, revisited in the deployment and monitoring lessons.</div>
`,
          keyPoints: [
            "OLTP databases handle many small, fast transactions (often with ACID guarantees); OLAP systems handle large aggregations.",
            "Modern platforms decouple storage from processing, blurring the OLTP/OLAP line.",
            "ETL transforms before loading into a warehouse; ELT loads raw data into a lake first and transforms later.",
            "Data flows between processes through databases, through services (REST/RPC), or through real-time transport (pub/sub such as Kafka, or message queues).",
            "Batch processing computes slow-changing (static) features periodically; stream processing computes fast-changing (dynamic) features as events arrive.",
            "Using different pipelines for training and serving risks train-serving skew."
          ],
          exercise: {
            prompt: String.raw`<p>You are designing features for a food-delivery ETA model. Classify each feature as batch or streaming, name the dataflow mode it would arrive through, and justify briefly:</p>
<ol>
  <li>Restaurant's average food preparation time over the last 90 days</li>
  <li>Number of open orders at the restaurant right now</li>
  <li>Current number of available couriers within 2 km</li>
  <li>Customer's lifetime number of orders</li>
</ol>
<p>Then write a Python function <code>orders_last_15_min(events, now)</code> that, given a list of <code>(timestamp_minute, restaurant_id)</code> events, returns a dict with the number of orders per restaurant in the last 15 minutes (window <code>(now - 15, now]</code>).</p>`,
            solution: String.raw`<ol>
  <li><strong>Batch.</strong> Changes slowly; compute nightly from the warehouse (dataflow through databases).</li>
  <li><strong>Streaming.</strong> Changes minute by minute; compute from order events on a pub/sub topic (real-time transport).</li>
  <li><strong>Streaming.</strong> Courier locations update every few seconds; consume courier location events from real-time transport, aggregated in a stream processor.</li>
  <li><strong>Batch.</strong> Increments rarely and the model does not need it to the second; nightly batch from the warehouse is fine (or read from the user service at request time).</li>
</ol>
<pre><code class="lang-python runnable">from collections import Counter

def orders_last_15_min(events, now):
    """events: list of (timestamp_minute, restaurant_id)"""
    return dict(Counter(r for t, r in events if now - 15 &lt; t &lt;= now))

events = [(1, "r1"), (3, "r2"), (9, "r1"), (14, "r1"), (17, "r2"), (20, "r1"), (22, "r3")]
print(orders_last_15_min(events, now=10))
print(orders_last_15_min(events, now=22))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'r1': 2, 'r2': 1}
{'r1': 3, 'r2': 1, 'r3': 1}</code></pre>
<p>At minute 22 the window is (7, 22], so events at minutes 9, 14, 17, 20 and 22 count. A real stream processor would keep this state incrementally (as in the lesson's deque example) instead of rescanning all events.</p>`
          },
          quiz: [
            { q: "Which workload is a transactional (OLTP) database optimized for?", options: ["Computing average revenue per region over five years", "Recording a single customer's order quickly and reliably", "Training a neural network", "Storing raw images for later analysis"], answer: 1, explain: "OLTP systems handle many small, low-latency transactions such as placing an order. Large aggregations are analytical (OLAP) workloads." },
            { q: "What is the main difference between ETL and ELT?", options: ["ELT never transforms data", "ETL transforms data before loading it into storage; ELT loads raw data first and transforms later", "ETL is only for streaming data", "ELT requires a graph database"], answer: 1, explain: "ELT became popular as storage got cheap: load everything raw into a lake quickly, transform when needed." },
            { q: "Why do many companies move from service-to-service requests to a pub/sub broker like Kafka for data-heavy flows?", options: ["Brokers make every request synchronous", "Services publish events once and any number of consumers can read them, avoiding a tangle of inter-service calls", "Pub/sub removes the need for any database", "REST cannot carry JSON"], answer: 1, explain: "With many services needing each other's data, request-driven calls become complex and fragile; broadcasting events to a broker decouples producers from consumers." },
            { q: "'Number of drivers available in this neighborhood right now' is best computed as what kind of feature?", options: ["A batch feature computed nightly", "A streaming feature computed from real-time events", "A static feature from a third-party vendor", "A label"], answer: 1, explain: "It changes within seconds, so it must be computed from the event stream; a nightly batch value would be useless." }
          ]
        },
        {
          id: "mlsys-data-sampling-labeling",
          title: "Training Data: Sampling and Labeling",
          minutes: 55,
          objectives: [
            "Choose among nonprobability, simple random, stratified, weighted, reservoir and importance sampling",
            "Explain the costs and pitfalls of hand labeling, including label multiplicity and data lineage",
            "Use natural labels and reason about feedback loop length",
            "Describe weak supervision, semi-supervision, transfer learning and active learning, and when each helps"
          ],
          body: String.raw`
<p>Training data is not "the data you happen to have". It is a deliberately constructed sample of the world, with labels whose quality you understand. Mistakes here are invisible during training and expensive later: a model trained on a skewed sample or noisy labels will happily learn the skew and the noise.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 4, "Training Data" (sampling and labeling sections).</div>

<h3>Sampling</h3>
<p>You sample when you cannot use all data (too much to process, or not all of it accessible), when you build train/validation/test splits, and when you choose which examples to label or monitor. There are two families.</p>
<h4>Nonprobability sampling</h4>
<p>Selection is not based on any probability criterion. It is common because it is convenient, and it is dangerous because it is biased:</p>
<ul>
  <li><strong>Convenience sampling</strong>: take whatever data is available (the first 10,000 reviews).</li>
  <li><strong>Snowball sampling</strong>: future samples are chosen based on existing ones (crawl accounts followed by accounts you already have).</li>
  <li><strong>Judgment sampling</strong>: experts decide what to include.</li>
  <li><strong>Quota sampling</strong>: pick fixed numbers from certain groups without randomization (100 users from each age group, whoever responds first).</li>
</ul>
<p>Real ML datasets often come from these. Language models trained on easily available internet text, sentiment datasets built from star ratings on review sites (people who leave reviews are not typical customers), and self-driving data collected mostly in sunny regions are examples. Be aware of the bias and document it.</p>
<h4>Random (probability) sampling</h4>
<ul>
  <li><strong>Simple random sampling</strong>: every item has equal probability. Easy, but a rare category might not appear at all.</li>
  <li><strong>Stratified sampling</strong>: split the population into groups (strata) and sample from each separately, so every group is represented in the right proportion. It is impossible when an item can belong to several groups (multilabel).</li>
  <li><strong>Weighted sampling</strong>: each item gets a sampling weight, letting you use domain knowledge. If recent data is more valuable, give it more weight; if your sample has 25% red items but the real world has 50%, weight red items up.</li>
  <li><strong>Reservoir sampling</strong>: keep a uniform random sample of k items from a stream whose length you do not know in advance, using only k slots of memory. Each new item i (counting from 1) is kept with probability k/i, replacing a random current item.</li>
  <li><strong>Importance sampling</strong>: when you can only sample from a distribution Q but need estimates under distribution P, sample from Q and weight each sample by P(x)/Q(x). It is used, for example, in policy-based reinforcement learning to reuse data collected with an old policy.</li>
</ul>
<p>The code below compares simple random and stratified sampling on support tickets with a rare "security" category, then verifies that reservoir sampling keeps every position of a stream with equal probability:</p>
<pre><code class="lang-python runnable">import random
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
# 10,000 support tickets: 'billing' is common, 'security' is rare
df = pd.DataFrame({"category": rng.choice(["billing", "shipping", "account", "security"],
                                           size=10_000, p=[0.6, 0.3, 0.09, 0.01])})

simple = df.sample(n=200, random_state=0)
stratified = df.groupby("category", group_keys=False).sample(frac=0.02, random_state=0)
print("population :", df["category"].value_counts().to_dict())
print("simple 200 :", simple["category"].value_counts().to_dict())
print("stratified :", stratified["category"].value_counts().to_dict())

# How often does a simple random sample of 100 tickets miss the rare class entirely?
misses = sum((df.sample(n=100, random_state=s)["category"] == "security").sum() == 0
             for s in range(1_000))
print(f"simple samples of 100 with ZERO security tickets: {misses / 1_000:.0%}")

# Reservoir sampling: keep a uniform sample of k items from a stream of unknown length
def reservoir_sample(stream, k, seed=0):
    rnd = random.Random(seed)
    reservoir = []
    for i, item in enumerate(stream):
        if i &lt; k:
            reservoir.append(item)
        else:
            j = rnd.randint(0, i)        # inclusive: item i survives with prob k/(i+1)
            if j &lt; k:
                reservoir[j] = item
    return reservoir

# Check uniformity: run many times on a stream of 0..99, count how often each item is kept
counts = np.zeros(100)
for s in range(2_000):
    for item in reservoir_sample(range(100), k=10, seed=s):
        counts[item] += 1
print("reservoir keep-rate, first 10 items:", (counts[:10] / 2_000).round(2))
print("reservoir keep-rate, last 10 items :", (counts[-10:] / 2_000).round(2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">population : {'billing': 6048, 'shipping': 2967, 'account': 873, 'security': 112}
simple 200 : {'billing': 120, 'shipping': 59, 'account': 20, 'security': 1}
stratified : {'billing': 121, 'shipping': 59, 'account': 17, 'security': 2}
simple samples of 100 with ZERO security tickets: 30%
reservoir keep-rate, first 10 items: [0.09 0.11 0.09 0.1  0.11 0.09 0.1  0.09 0.11 0.1 ]
reservoir keep-rate, last 10 items : [0.09 0.1  0.1  0.1  0.11 0.11 0.1  0.1  0.09 0.1 ]</code></pre>
<p>About 30% of simple random samples of 100 tickets contain zero security tickets: a model trained or evaluated on such a sample would know nothing about security issues. Stratification guarantees representation. The reservoir keep-rate is about 0.10 (k/n = 10/100) for the first items <em>and</em> the last ones, which is what makes it uniform even though the stream length was never known upfront.</p>

<h3>Labeling</h3>
<p>Most production models are supervised and need labels. How you obtain them shapes cost, speed and quality.</p>
<h4>Hand labels</h4>
<p>Humans label each example. Problems:</p>
<ul>
  <li><strong>Expensive</strong>, especially when experts are needed: anyone can label "cat or dog", but labeling chest X-rays needs radiologists.</li>
  <li><strong>Privacy</strong>: some data (medical records, private messages) cannot be shipped to an external labeling vendor.</li>
  <li><strong>Slow</strong>: labeling can take weeks or months, which slows iteration and makes it hard to adapt when the data changes.</li>
  <li><strong>Label multiplicity</strong>: when several annotators or sources label data, they disagree. In an entity-recognition task, one annotator may tag "Galactic Emperor" as a title and another not. Higher domain expertise needed means more disagreement. Fix it with clear problem definitions and labeling guidelines, examples of edge cases, and measuring inter-annotator agreement.</li>
  <li><strong>Data lineage</strong>: track where each example and label came from. Suppose you train on 100k examples labeled in-house, then add 1M crowdsourced examples and the model gets <em>worse</em>. Without lineage, you cannot tell that the new batch's labels were poor; with lineage, you can evaluate each source separately.</li>
</ul>
<h4>Natural labels</h4>
<p>Some tasks come with labels for free because the system can observe the outcome. An ETA model's prediction is checked when the trip ends; a stock price prediction is checked tomorrow; a recommendation is "labeled" by whether the user clicks. Tasks with natural labels are the most common in industry, partly because they are so much cheaper.</p>
<ul>
  <li>Labels can be <strong>implicit</strong> (inferred from the absence of an action: a recommended item that was not clicked within some time is assumed negative) or <strong>explicit</strong> (users give feedback, such as a thumbs down).</li>
  <li>The <strong>feedback loop length</strong> is the time from prediction to label. Recommendations: seconds to minutes. Fraud: chargebacks can take one to three months. Short loops allow fast model updates and fast detection of problems; long loops mean you will learn about failures late.</li>
  <li>Choosing the window for implicit negatives is a trade-off: wait too little and you mislabel late clicks as negatives; wait too long and labels arrive slowly.</li>
</ul>
<h4>Handling the lack of labels</h4>
<table>
  <thead><tr><th>Method</th><th>How it works</th><th>Needs ground-truth labels?</th></tr></thead>
  <tbody>
    <tr><td>Weak supervision</td><td>Heuristic labeling functions generate noisy labels</td><td>No (a small set helps to evaluate)</td></tr>
    <tr><td>Semi-supervision</td><td>Use structural assumptions to spread a small set of labels to unlabeled data</td><td>Yes, a small initial set</td></tr>
    <tr><td>Transfer learning</td><td>Reuse a model pretrained on another task</td><td>Few or none (zero-shot)</td></tr>
    <tr><td>Active learning</td><td>Label the examples most useful to the model</td><td>Yes, but fewer</td></tr>
  </tbody>
</table>
<p><strong>Weak supervision</strong> encodes domain heuristics as <strong>labeling functions</strong> (LFs): small programs that output a label or abstain. For example: "if the note mentions 'pneumonia', label positive"; "if it says 'no evidence of', label negative". LFs can be keyword rules, regular expressions, database lookups, or the outputs of other models. Because LFs are noisy and overlap or conflict, a tool (Snorkel is the best known) combines them into one probabilistic label per example, learning which LFs are reliable. Here is the idea in plain Python, with a hand-set weight instead of a learned one:</p>
<pre><code class="lang-python runnable">import re
import numpy as np

notes = [
    "patient shows signs of pneumonia, chest x-ray ordered",
    "no evidence of pneumonia, lungs clear",
    "follow up for broken wrist",
    "suspected pneumonia, start antibiotics",
    "routine checkup, all normal",
    "lung infection likely, prescribe antibiotics",
]
ABSTAIN, NEG, POS = -1, 0, 1

# Labeling functions (LFs): cheap heuristics written by a domain expert
def lf_keyword(t):   return POS if "pneumonia" in t else ABSTAIN
def lf_negation(t):  return NEG if re.search(r"no evidence of|lungs clear", t) else ABSTAIN
def lf_antibiotic(t): return POS if "antibiotic" in t else ABSTAIN
def lf_routine(t):   return NEG if re.search(r"routine|broken|wrist", t) else ABSTAIN
LFS = [lf_keyword, lf_negation, lf_antibiotic, lf_routine]

L = np.array([[lf(t) for lf in LFS] for t in notes])
print("label matrix (rows = notes, cols = LFs):\n", L)

def combine(row):
    votes = row[row != ABSTAIN]
    if len(votes) == 0:
        return ABSTAIN
    # negation is more reliable than a bare keyword: give it double weight
    weights = np.where(votes == NEG, 2, 1)
    return int(round(np.average(votes, weights=weights)))

for note, row in zip(notes, L):
    print(f"{combine(row):&gt;2}  &lt;- {note}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">label matrix (rows = notes, cols = LFs):
 [[ 1 -1 -1 -1]
 [ 1  0 -1 -1]
 [-1 -1 -1  0]
 [ 1 -1  1 -1]
 [-1 -1 -1  0]
 [-1 -1  1 -1]]
 1  &lt;- patient shows signs of pneumonia, chest x-ray ordered
 0  &lt;- no evidence of pneumonia, lungs clear
 0  &lt;- follow up for broken wrist
 1  &lt;- suspected pneumonia, start antibiotics
 0  &lt;- routine checkup, all normal
 1  &lt;- lung infection likely, prescribe antibiotics</code></pre>
<p>Note the last example: no keyword "pneumonia", but the antibiotic LF still labels it positive. Advantages of weak supervision: cheap, fast, privacy-friendly (a domain expert writes LFs once; nobody needs to read every record), and adaptable: when data changes, rerun the LFs. Studies have reported weakly supervised models approaching the quality of hand-labeled ones on some tasks. Teams still hand-label a small set to evaluate the LFs and the final model.</p>
<p><strong>Semi-supervision</strong> starts with a small labeled set and generates more. Approaches: <em>self-training</em> (train on the labeled set, predict the unlabeled data, add high-confidence predictions as labels, repeat); <em>similarity</em> (examples close together, such as hashtags used by the same accounts, likely share labels); <em>perturbation-based</em> (small perturbations of an example should not change its label, so you can create new labeled examples by adding noise). Hold out a validation set so you can tell whether the generated labels help.</p>
<p><strong>Transfer learning</strong> reuses a model trained on a <em>base task</em> (often with abundant cheap labels, like predicting the next word in text) for a <em>downstream task</em> (classifying support tickets). You can use the pretrained model directly (zero-shot or with prompts) or fine-tune it on a small labeled set. This is the reason large pretrained models changed the economics of NLP and vision: tasks that needed 100k labels now need a few hundred.</p>
<p><strong>Active learning</strong> lets the model choose which examples to label next, instead of labeling at random. Common strategies: <em>uncertainty sampling</em> (label the examples where the model's top probability is lowest, closest to the decision boundary) and <em>query-by-committee</em> (train several models; label the examples they disagree on most). In production, active learning works well with streaming data: the model can request labels for the confusing live examples.</p>
`,
          keyPoints: [
            "Nonprobability sampling (convenience, snowball, judgment, quota) is common but biased; document the bias.",
            "Stratified sampling guarantees rare groups appear; reservoir sampling keeps a uniform sample from a stream of unknown length.",
            "Hand labels are expensive, slow and privacy-sensitive; annotator disagreement and missing data lineage are common traps.",
            "Natural labels come from observed outcomes; the feedback loop length decides how fast you can learn and detect failures.",
            "Weak supervision uses noisy labeling functions combined into labels; semi-supervision spreads a small labeled set.",
            "Transfer learning reuses pretrained models; active learning labels the examples the model is most uncertain about."
          ],
          exercise: {
            prompt: String.raw`<p>A hospital wants a classifier that flags radiology reports mentioning a possible lung nodule. There are 400,000 unlabeled reports, privacy rules forbid sending them outside the hospital, and only two radiologists have about 10 hours each to help.</p>
<ol>
  <li>Propose a labeling strategy that combines at least two techniques from this lesson. Be specific about what the radiologists' 20 hours are spent on.</li>
  <li>Write a small active-learning helper in Python: given a 2D array of predicted class probabilities, return the indices of the k most uncertain examples (lowest maximum probability).</li>
</ol>`,
            solution: String.raw`<p><strong>1. Strategy.</strong></p>
<ul>
  <li><em>Hours 1 to 4: labeling guidelines and a gold set.</em> Radiologists agree on a definition ("possible nodule" includes "opacity", "lesion" in lung contexts; excludes "no nodules seen") and label about 300 randomly sampled reports, with overlap on 50 reports to measure their agreement.</li>
  <li><em>Hours 5 to 8: weak supervision.</em> With an ML engineer, they write labeling functions: keyword and regex rules ("nodule", "spiculated", "ground-glass"), negation rules ("no evidence of", "without"), section rules (mentions in the "Impression" section count more). Apply LFs to all 400k reports inside the hospital (no privacy issue: nobody reads every report), combine them into probabilistic labels, and check LF accuracy against the gold set.</li>
  <li><em>Transfer learning.</em> Fine-tune a pretrained clinical language model on the weak labels.</li>
  <li><em>Hours 9 to 20: active learning.</em> Each round, the model selects the 100 reports it is least sure about; radiologists label them; retrain. The gold set (never used for training) measures progress.</li>
</ul>
<p><strong>2. Uncertainty sampling.</strong></p>
<pre><code class="lang-python runnable">import numpy as np

def most_uncertain(proba, k):
    confidence = proba.max(axis=1)          # probability of the predicted class
    return np.argsort(confidence)[:k]       # lowest confidence first

proba = np.array([[0.98, 0.02], [0.55, 0.45], [0.10, 0.90], [0.49, 0.51], [0.70, 0.30]])
print(most_uncertain(proba, k=2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[3 1]</code></pre>
<p>Examples 3 (0.51) and 1 (0.55) sit closest to the decision boundary, so a label for them teaches the model the most.</p>`
          },
          quiz: [
            { q: "You need a uniform random sample of 1,000 events from a stream whose total length you do not know, with limited memory. Which method fits?", options: ["Stratified sampling", "Reservoir sampling", "Snowball sampling", "Quota sampling"], answer: 1, explain: "Reservoir sampling keeps k slots and gives every item in the stream an equal chance of being in the final sample, without knowing the stream length." },
            { q: "A fraud model's labels come from chargebacks, which arrive up to 90 days later. What does this mean?", options: ["The model has no labels", "The feedback loop is long, so performance problems are discovered late", "The labels are hand labels", "Active learning is impossible"], answer: 1, explain: "Natural labels with a long feedback loop delay both retraining with fresh labels and the detection of model degradation." },
            { q: "In weak supervision, what is a labeling function?", options: ["A human who labels data", "A heuristic program that outputs a (noisy) label or abstains for each example", "The loss function of the final model", "A function that removes labels"], answer: 1, explain: "Labeling functions encode domain heuristics such as keyword rules or regexes; their noisy outputs are combined into training labels." },
            { q: "After adding a large crowdsourced dataset, your model gets worse. Which practice would most help you find the cause?", options: ["Data lineage: tracking the source of each example and label", "Using a bigger model", "Removing the validation set", "Switching to reservoir sampling"], answer: 0, explain: "With lineage you can evaluate examples from each source separately and see that the new source has poor labels." },
            { q: "Which active learning strategy picks examples closest to the decision boundary?", options: ["Uncertainty sampling", "Convenience sampling", "Importance sampling", "Snowball sampling"], answer: 0, explain: "Uncertainty sampling chooses examples where the model's confidence is lowest, i.e. near the decision boundary." }
          ]
        },
        {
          id: "mlsys-data-imbalance-augmentation",
          title: "Class Imbalance and Data Augmentation",
          minutes: 50,
          objectives: [
            "Explain why class imbalance makes learning and evaluation hard",
            "Choose metrics that are meaningful under imbalance (precision, recall, F1, PR-AUC)",
            "Apply data-level fixes (resampling) and algorithm-level fixes (cost-sensitive learning, class weights, focal loss)",
            "Describe label-preserving transformations, perturbation and data synthesis (including mixup)"
          ],
          body: String.raw`
<p>In most real classification problems, the thing you care about is rare. Fraudulent transactions might be 0.1% of all transactions, defective parts 1% of production, cancer cases a small fraction of screenings. This is called <strong>class imbalance</strong>, and it is the norm, not the exception, in production. A second common problem is simply not having enough data; <strong>data augmentation</strong> creates more. This lesson covers both.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 4, sections "Class Imbalance" and "Data Augmentation".</div>

<h3>Why imbalance is hard</h3>
<ol>
  <li><strong>Not enough signal.</strong> With 1% positives, a dataset of 10,000 examples has only 100 positives to learn the minority pattern from. Some rare sub-types may have just a handful.</li>
  <li><strong>Easy shortcuts.</strong> A model can reach 99% accuracy by always predicting the majority class. Gradient descent happily finds this non-solution because it already minimizes the average loss quite well.</li>
  <li><strong>Asymmetric costs.</strong> Missing a cancer case is far worse than a false alarm. The rare class is usually the one where errors are expensive.</li>
</ol>
<p>Imbalance appears in fraud detection, churn prediction (most customers stay), disease screening, resume screening (most applicants are filtered out), object detection (most candidate boxes are background) and anomaly detection in systems.</p>
<p>Imbalance can also be created by the <em>data collection process</em>: sampling bias, or labeling errors where annotators systematically mislabel one class. Check whether the imbalance reflects the real world before "fixing" it.</p>

<h3>Use the right metrics</h3>
<p>Accuracy and even overall error rates are dominated by the majority class. Prefer metrics that focus on the class you care about:</p>
<ul>
  <li><strong>Precision</strong> = TP / (TP + FP): of the items we flagged, how many were truly positive?</li>
  <li><strong>Recall</strong> = TP / (TP + FN): of all true positives, how many did we catch?</li>
  <li><strong>F1</strong> = harmonic mean of precision and recall. Note it is asymmetric: which class you call "positive" changes the score.</li>
  <li><strong>ROC curve and ROC-AUC</strong>: true positive rate vs false positive rate across all thresholds. Because the false positive rate is diluted by the huge negative class, ROC-AUC can look great under heavy imbalance.</li>
  <li><strong>Precision-recall curve and PR-AUC</strong> (average precision): focuses on the positive class and is more informative when positives are rare.</li>
</ul>
<p>Most classifiers output a probability, and you choose the threshold. Moving the threshold trades precision against recall; plotting the curves lets you choose the operating point that matches business costs (see the fraud example in the foundations module).</p>

<h3>Fixing imbalance</h3>
<h4>Data-level methods: resampling</h4>
<ul>
  <li><strong>Undersampling</strong> removes majority-class examples. Simple but throws data away. <em>Tomek links</em> is a smarter variant: find pairs of close examples from opposite classes and remove the majority one, which makes the decision boundary clearer (but can make the model less robust to subtle real-world cases).</li>
  <li><strong>Oversampling</strong> adds minority examples, by duplicating them (random oversampling) or synthesizing new ones. <em>SMOTE</em> creates synthetic minority points by interpolating between a minority example and its minority neighbors. It works best on low-dimensional data.</li>
  <li><strong>Two-phase learning</strong>: first train on a balanced (undersampled) dataset, then fine-tune on the original data.</li>
  <li><strong>Dynamic sampling</strong>: during training, oversample classes the model performs poorly on and undersample classes it already handles well.</li>
</ul>
<div class="callout warn"><strong>Warning:</strong> Never resample the validation or test set. Evaluate on data with the real-world distribution; otherwise your metrics will be wrong. Resample only the training split, after splitting.</div>
<h4>Algorithm-level methods</h4>
<ul>
  <li><strong>Cost-sensitive learning</strong>: define a cost matrix where misclassifying class i as class j costs C(i, j), and minimize expected cost. You need to know the costs.</li>
  <li><strong>Class-balanced loss</strong>: weight each class's loss inversely to its frequency, so rare-class mistakes count more. In scikit-learn this is <code>class_weight="balanced"</code>.</li>
  <li><strong>Focal loss</strong>: down-weights examples the model already classifies easily, so training focuses on hard examples. It multiplies cross-entropy by (1 - p)^gamma, where p is the probability of the correct class.</li>
</ul>
<p>Let us compare these on a dataset where 1% of parts are defective. Note how accuracy barely tells the models apart while recall and PR-AUC do:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score, roc_auc_score, average_precision_score
from sklearn.model_selection import train_test_split

# 1% positives (e.g., defective parts on an assembly line)
X, y = make_classification(n_samples=30_000, n_features=12, n_informative=4, weights=[0.99],
                           class_sep=1.5, flip_y=0, random_state=1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, stratify=y, random_state=1)

def report(name, model):
    model.fit(X_tr, y_tr)
    pred = model.predict(X_te)
    score = model.predict_proba(X_te)[:, 1]
    print(f"{name:22s} acc={accuracy_score(y_te, pred):.3f}  "
          f"prec={precision_score(y_te, pred, zero_division=0):.2f}  "
          f"rec={recall_score(y_te, pred):.2f}  f1={f1_score(y_te, pred):.2f}  "
          f"ROC-AUC={roc_auc_score(y_te, score):.2f}  PR-AUC={average_precision_score(y_te, score):.2f}")

report("always 'not defective'", DummyClassifier(strategy="most_frequent"))
report("logistic regression", LogisticRegression(max_iter=1000))
report("  + class_weight", LogisticRegression(max_iter=1000, class_weight="balanced"))

# Data-level fix: random oversampling of the minority class (TRAIN split only!)
rng = np.random.default_rng(0)
pos = np.where(y_tr == 1)[0]
extra = rng.choice(pos, size=len(pos) * 20, replace=True)
X_os, y_os = np.vstack([X_tr, X_tr[extra]]), np.concatenate([y_tr, y_tr[extra]])
m = LogisticRegression(max_iter=1000).fit(X_os, y_os)
pred = m.predict(X_te)
print(f"{'  + oversampling x21':22s} acc={accuracy_score(y_te, pred):.3f}  "
      f"prec={precision_score(y_te, pred):.2f}  rec={recall_score(y_te, pred):.2f}  "
      f"f1={f1_score(y_te, pred):.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">always 'not defective' acc=0.990  prec=0.00  rec=0.00  f1=0.00  ROC-AUC=0.50  PR-AUC=0.01
logistic regression    acc=0.990  prec=0.53  rec=0.15  f1=0.23  ROC-AUC=0.95  PR-AUC=0.29
  + class_weight       acc=0.882  prec=0.07  rec=0.88  f1=0.13  ROC-AUC=0.95  PR-AUC=0.27
  + oversampling x21   acc=0.962  prec=0.16  rec=0.68  f1=0.27</code></pre>
<p>Read it row by row. The dummy model that always says "not defective" gets 99.0% accuracy and is useless. Plain logistic regression has the same accuracy but catches only 15% of defects. Class weighting catches 88% of defects at the cost of many false alarms (precision 7%) and lower accuracy. Oversampling lands in between. Notice that ROC-AUC (0.95) looks excellent even for the plain model, while PR-AUC (0.29) reveals how hard the positive class still is. Which variant is "best" depends on whether a missed defect or an unnecessary inspection is more expensive.</p>
<p>And here is how focal loss reshapes the loss compared with plain cross-entropy:</p>
<pre><code class="lang-python runnable">import numpy as np

def cross_entropy(p_true):
    return -np.log(p_true)

def focal_loss(p_true, gamma=2.0):
    # down-weights examples the model already gets right (p_true close to 1)
    return -((1 - p_true) ** gamma) * np.log(p_true)

print(" p(correct class)   CE loss   focal loss   focal/CE")
for p in (0.95, 0.7, 0.3, 0.05):
    ce, fl = cross_entropy(p), focal_loss(p)
    print(f"{p:17.2f}   {ce:7.3f}   {fl:10.4f}   {fl/ce:8.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text"> p(correct class)   CE loss   focal loss   focal/CE
             0.95     0.051       0.0001      0.003
             0.70     0.357       0.0321      0.090
             0.30     1.204       0.5899      0.490
             0.05     2.996       2.7036      0.902</code></pre>
<p>An example the model already gets right with 95% confidence contributes only 0.3% of its cross-entropy loss under focal loss, while a badly misclassified example (5% confidence) keeps 90% of it. The gradient is dominated by hard examples, which in imbalanced data are often the rare class.</p>

<h3>Data augmentation</h3>
<p>Augmentation creates new training examples from existing ones. Originally popular in computer vision, it is now used everywhere, and it also makes models more robust to noise and adversarial inputs.</p>
<h4>1. Simple label-preserving transformations</h4>
<p>Modify an example in a way that does not change its label. Images: crop, flip, rotate, change brightness or colors (a flipped dog is still a dog). Text: replace words with synonyms, or with nearby words in an embedding space ("I am looking for a cheap phone" and "I am looking for an affordable phone" have the same intent). Be careful: flipping an image of the digit 6 can make it look like something else, and replacing a word can change sentence meaning in subtle cases.</p>
<h4>2. Perturbation</h4>
<p>Add small noise to inputs. Neural networks can be surprisingly sensitive to tiny perturbations: research has shown that changing a single pixel can make an image classifier change its answer. Inputs crafted to fool a model are called <em>adversarial examples</em>; training on perturbed or adversarial examples (adversarial augmentation) helps the model's decision boundaries become more robust. In speech recognition, adding background noise to clean recordings is standard.</p>
<h4>3. Data synthesis</h4>
<p>Create entirely new examples. In NLP, <em>templates</em> can generate many queries cheaply: "Find me a [CUISINE] restaurant within [NUMBER] miles of [LOCATION]" produces thousands of labeled requests for a voice assistant. In vision, <em>mixup</em> blends two examples and their labels: if x1 is a cat (label [1, 0]) and x2 is a dog ([0, 1]), the mixed example 0.7 x1 + 0.3 x2 has label [0.7, 0.3]. Mixup improves generalization and reduces memorization of corrupt labels. Today, generative models are also used to synthesize realistic training data.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)

# 1) Label-preserving transformation for text: synonym replacement
synonyms = {"cheap": ["affordable", "inexpensive"], "fast": ["quick", "speedy"],
            "phone": ["handset", "mobile"]}
def synonym_augment(sentence, rng):
    words = sentence.split()
    return " ".join(rng.choice(synonyms[w]) if w in synonyms else w for w in words)

s = "looking for a cheap and fast phone"
for _ in range(3):
    print("text :", synonym_augment(s, rng))

# 2) Perturbation for images: add small Gaussian noise; flip horizontally
img = rng.integers(0, 256, size=(4, 4)).astype(float)   # a tiny 4x4 "image"
noisy = np.clip(img + rng.normal(0, 5, img.shape), 0, 255)
flipped = img[:, ::-1]
print("max pixel change from noise:", np.abs(noisy - img).max().round(1))
print("flip keeps pixel values    :", sorted(img.ravel()) == sorted(flipped.ravel()))

# 3) Data synthesis with mixup: blend two examples AND their labels
x1, y1 = np.array([1.0, 0.0, 3.0]), np.array([1, 0])   # one-hot: class A
x2, y2 = np.array([0.0, 2.0, 1.0]), np.array([0, 1])   # class B
lam = 0.7
print("mixup x:", lam * x1 + (1 - lam) * x2, " mixup y:", lam * y1 + (1 - lam) * y2)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">text : looking for a inexpensive and speedy mobile
text : looking for a affordable and quick handset
text : looking for a affordable and quick handset
max pixel change from noise: 6.8
flip keeps pixel values    : True
mixup x: [0.7 0.6 2.4]  mixup y: [0.7 0.3]</code></pre>

<div class="callout info"><strong>Scenario:</strong> A bank's chat assistant must recognize the intent "report a lost card". Only 300 real examples exist, compared with 30,000 for "check balance". The team (1) uses class weights so the rare intent counts more in training, (2) generates paraphrases with synonym replacement and templates ("I [lost / misplaced / can't find] my [card / debit card / Visa]"), and (3) evaluates on a held-out set of <em>real</em> messages only, never on synthetic ones, because synthetic text is easier than the real thing.</div>
`,
          keyPoints: [
            "Class imbalance is the norm in production; accuracy is misleading because always predicting the majority class scores high.",
            "Use precision, recall, F1 and especially PR-AUC for rare positives; ROC-AUC can look good under heavy imbalance.",
            "Data-level fixes: under/oversampling, SMOTE, Tomek links, two-phase learning, dynamic sampling. Resample only the training split.",
            "Algorithm-level fixes: cost-sensitive learning, class-balanced loss (class_weight), focal loss.",
            "Augmentation: label-preserving transformations, perturbation (including adversarial), and synthesis (templates, mixup).",
            "Always evaluate on real data with the real class distribution."
          ],
          exercise: {
            prompt: String.raw`<p>A churn model at a subscription company is trained on data where 4% of customers churn. The retention team can call at most 500 customers per week out of 50,000, and each saved churner is worth $300 while each call costs $4.</p>
<ol>
  <li>Which metric(s) would you report to the retention team, and why not accuracy?</li>
  <li>Write Python that, given true labels and predicted probabilities, computes precision and recall among the top-k customers by score (precision@k, recall@k). Test it on a small example.</li>
  <li>Would you oversample churners in the test set to "make evaluation fairer"? Explain.</li>
</ol>`,
            solution: String.raw`<ol>
  <li>The team acts on a fixed budget of 500 calls, so the most useful metrics are <strong>precision@500</strong> (what fraction of called customers would really churn) and <strong>recall@500</strong> (what fraction of all churners we reach), plus expected value: saved churners times $300 minus 500 times $4. Accuracy is useless: predicting "no churn" for everyone gives 96%.</li>
  <li>Implementation:</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np

def precision_recall_at_k(y_true, scores, k):
    top_k = np.argsort(-scores)[:k]
    hits = y_true[top_k].sum()
    return hits / k, hits / y_true.sum()

y_true = np.array([0, 1, 0, 0, 1, 0, 1, 0, 0, 0])
scores = np.array([0.1, 0.9, 0.3, 0.8, 0.7, 0.2, 0.4, 0.05, 0.6, 0.15])
p, r = precision_recall_at_k(y_true, scores, k=3)
print(f"precision@3 = {p:.2f}, recall@3 = {r:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">precision@3 = 0.67, recall@3 = 0.67</code></pre>
<p>The top 3 scores are customers 1 (0.9), 3 (0.8) and 4 (0.7); two of them churned, and there are 3 churners in total, so both values are 2/3.</p>
<ol start="3">
  <li><strong>No.</strong> The test set must reflect the real distribution the model will face (4% churn), otherwise precision and expected value are overestimated. Resampling, if used at all, belongs in the training split only.</li>
</ol>`
          },
          quiz: [
            { q: "On a dataset with 0.5% fraud, a model reports 99.5% accuracy. What is the most reasonable first suspicion?", options: ["The model is excellent", "It may simply predict 'not fraud' for everything", "The test set is too large", "Accuracy is always correct under imbalance"], answer: 1, explain: "Predicting the majority class for every example already achieves 99.5% accuracy here. Check recall and precision." },
            { q: "Why can ROC-AUC look excellent while PR-AUC looks poor on heavily imbalanced data?", options: ["ROC-AUC ignores the positive class", "The false positive rate is divided by the huge number of negatives, so many false alarms barely move it, while precision exposes them", "PR-AUC is always lower than ROC-AUC by definition", "They measure the same thing"], answer: 1, explain: "With many negatives, even a large number of false positives is a small false positive rate, but it drags precision down sharply." },
            { q: "When should you apply oversampling?", options: ["Before splitting into train and test", "To the test set only", "To the training split only, after splitting", "To all splits equally"], answer: 2, explain: "Resampling the test set (or resampling before splitting, which leaks duplicates into test) gives misleading metrics. Evaluate on the real distribution." },
            { q: "What does focal loss do?", options: ["Removes the majority class", "Down-weights easy, well-classified examples so training focuses on hard ones", "Doubles the learning rate for the minority class", "Duplicates minority examples"], answer: 1, explain: "Focal loss multiplies cross-entropy by (1 - p)^gamma, shrinking the loss of confident correct predictions." },
            { q: "Mixup combines a cat image (label [1, 0]) and a dog image (label [0, 1]) with weight 0.7 on the cat. What is the new label?", options: ["[1, 0]", "[0.7, 0.3]", "[0.3, 0.7]", "[0.5, 0.5]"], answer: 1, explain: "Mixup blends labels with the same weights as the inputs: 0.7*[1,0] + 0.3*[0,1] = [0.7, 0.3]." }
          ]
        },
        {
          id: "mlsys-data-feature-engineering",
          title: "Feature Engineering Operations",
          minutes: 55,
          objectives: [
            "Explain why feature engineering still matters in the deep learning era",
            "Classify missing values as MNAR, MAR or MCAR and choose between deletion and imputation",
            "Apply scaling, log transforms and discretization correctly",
            "Encode high-cardinality and ever-changing categories with the hashing trick",
            "Use feature crossing and positional embeddings"
          ],
          body: String.raw`
<p>Deep learning promised to learn features automatically from raw data, and for images, audio and text it largely does. But most production models (fraud, ranking, pricing, churn) still run on tabular data, and companies report that adding the right features is often the single biggest lever for improving them. Even when deep models learn representations, you still decide what raw inputs to give them: a user's last 10 searches, the time since their last purchase, the device type. This lesson covers the core operations.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 5, "Feature Engineering" (learned vs engineered features, common feature engineering operations).</div>

<h3>Learned versus engineered features</h3>
<p>For a spam classifier using classical ML, you might hand-engineer features: tokenize the comment, remove stop words, build n-grams, count capital letters, count links. With a deep model you can feed the tokens and let the network learn useful representations. But a comment has more than text: its author's account age, how many upvotes it got, how many spam reports, the thread's topic. Choosing and preparing these is still engineering. In large companies, a single model can have thousands of features.</p>

<h3>Handling missing values</h3>
<p>Not all missing values are alike. There are three types:</p>
<ul>
  <li><strong>Missing not at random (MNAR)</strong>: the value is missing <em>because of</em> the value itself. People with high incomes may be less likely to disclose income.</li>
  <li><strong>Missing at random (MAR)</strong>: missingness depends on <em>another observed variable</em>, not on the value itself. Example: in a survey, people of a certain gender skip the age question more often.</li>
  <li><strong>Missing completely at random (MCAR)</strong>: no pattern; a form glitch dropped the value. This is rarer than people assume.</li>
</ul>
<p>Two families of fixes:</p>
<ul>
  <li><strong>Deletion</strong>. <em>Column deletion</em> drops a variable with too many missing values, but you may lose an important signal. <em>Row deletion</em> drops examples with missing values; it is fine for a few MCAR rows but dangerous otherwise: if values are MNAR or MAR, deleting rows removes exactly the informative cases and biases the model.</li>
  <li><strong>Imputation</strong>: fill in a value: the mean, median or mode, a default (empty string for text), or a model-based estimate. Avoid filling with a value that is possible in reality (filling the number of children with 0 confuses "unknown" with "no children"). Also add a "was missing" indicator feature so the model can learn from the missingness itself.</li>
</ul>
<p>In the loan example below, income is missing exactly for unemployed applicants, and those are the ones who defaulted:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

# Loan applications. Income is missing for some applicants.
df = pd.DataFrame({
    "age":       [27, 45, 31, 52, 23, 38, 29, 61],
    "income":    [48_000, np.nan, 61_000, np.nan, 30_000, 75_000, np.nan, 90_000],
    "employed":  ["yes", "no", "yes", "no", "yes", "yes", "no", "yes"],
    "defaulted": [0, 1, 0, 1, 0, 0, 1, 0],
})
print("missing rate by employment:\n", df.groupby("employed")["income"].apply(lambda s: s.isna().mean()))

# Missing-not-at-random: missingness itself carries signal -&gt; keep it as a feature
df["income_missing"] = df["income"].isna().astype(int)
print("default rate when income missing vs present:",
      df.groupby("income_missing")["defaulted"].mean().to_dict())

# Option A: deletion (drops 3 of 8 rows -- and every default!)
print("rows after dropna:", len(df.dropna()), "| defaults left:", int(df.dropna()["defaulted"].sum()))

# Option B: imputation with the median computed on TRAINING rows only
train, test = df.iloc[:6].copy(), df.iloc[6:].copy()
median_income = train["income"].median()
for part in (train, test):
    part["income"] = part["income"].fillna(median_income)
print("train median used for filling:", median_income)
print(test[["income", "income_missing"]])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">missing rate by employment:
 employed
no     1.0
yes    0.0
Name: income, dtype: float64
default rate when income missing vs present: {0: 0.0, 1: 1.0}
rows after dropna: 5 | defaults left: 0
train median used for filling: 54500.0
    income  income_missing
6  54500.0               1
7  90000.0               0</code></pre>
<p>Row deletion would have removed every default, producing a model that never predicts default. The indicator column <code>income_missing</code> turns the missingness into a strong feature. And the fill value (54,500) is computed from the training rows only and then reused for test rows; computing it on all data would leak test information, as the next lesson shows.</p>

<h3>Scaling</h3>
<p>Features on very different ranges (age 20 to 80, income 10,000 to 400,000) can hurt models: gradient-based models train poorly, and distance-based models (kNN, k-means) are dominated by the large-range feature. Tree models are largely insensitive to scaling, but scaling rarely hurts.</p>
<ul>
  <li><strong>Min-max scaling</strong> to [0, 1]: x' = (x - min) / (max - min). Sensitive to outliers.</li>
  <li><strong>Standardization</strong> to mean 0, variance 1: x' = (x - mean) / std. A good default if the feature is roughly normal.</li>
  <li><strong>Log transform</strong> for skewed features. Many real quantities (income, prices, counts) have long right tails; log(1 + x) compresses them and often helps models. Not every skewed feature benefits; check with experiments.</li>
</ul>
<p>Two production cautions. First, scaling statistics (min, max, mean, std) must come from the <em>training</em> data and be saved alongside the model, then applied unchanged at inference. Second, if the production distribution drifts far from training, those statistics go stale, so they need to be recomputed when you retrain.</p>

<h3>Discretization</h3>
<p>Discretization (also called quantization or binning) turns a continuous feature into buckets: income below 35k, 35k to 100k, above 100k. Instead of learning from infinitely many values, the model learns from a few categories, which helps when data is limited and the relationship is step-like. Downsides: it introduces discontinuities at boundaries (34,999 and 35,001 are treated very differently), and choosing boundaries well requires either domain knowledge or data-driven quantiles.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler, KBinsDiscretizer

rng = np.random.default_rng(0)
income = pd.Series(rng.lognormal(mean=10.5, sigma=0.8, size=1_000), name="income")
print("raw income   skew:", round(income.skew(), 2), "| min/max:", int(income.min()), int(income.max()))

log_income = np.log1p(income)
print("log1p income skew:", round(log_income.skew(), 2))

X = income.to_frame()
mm = MinMaxScaler().fit_transform(X)
std = StandardScaler().fit_transform(X)
print(f"min-max -&gt; range [{mm.min():.1f}, {mm.max():.1f}] | standardized -&gt; mean {std.mean():.2f}, std {std.std():.2f}")

# Discretization: turn income into 4 quantile buckets
kb = KBinsDiscretizer(n_bins=4, encode="ordinal", strategy="quantile", quantile_method="averaged_inverted_cdf")
buckets = kb.fit_transform(X).astype(int).ravel()
edges = kb.bin_edges_[0].round(-3).astype(int)
print("bucket edges:", edges.tolist())
print("rows per bucket:", np.bincount(buckets).tolist())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">raw income   skew: 2.79 | min/max: 1604 422029
log1p income skew: -0.07
min-max -&gt; range [0.0, 1.0] | standardized -&gt; mean -0.00, std 1.00
bucket edges: [2000, 21000, 34000, 59000, 422000]
rows per bucket: [250, 250, 250, 250]</code></pre>
<p>The raw income has skew 2.79; after log1p it is about 0, i.e. roughly symmetric. Quantile buckets put the same number of people in each bucket, which is usually more useful than equal-width buckets when data is skewed.</p>

<h3>Encoding categorical features</h3>
<p>One-hot encoding or an embedding table with one entry per category works when categories are fixed, like the 50 US states. In production, many categories are <strong>not fixed</strong>: new product brands, new app ids, new user accounts appear every day. A vocabulary built at training time breaks on unseen values. A common hack is an "UNKNOWN" bucket, but then every new brand is treated the same, and new sellers (who are often exactly the ones you care about, such as for fraud) get no useful representation.</p>
<p>The <strong>hashing trick</strong> solves this: apply a hash function to each category string and take the result modulo a fixed number of buckets. Every category, including ones that appear tomorrow, maps to some bucket, and the feature space size is fixed in advance.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.feature_extraction import FeatureHasher

# An app store: new app ids appear every day, so a fixed vocabulary breaks
train_apps = ["com.chat.fast", "com.maps.go", "com.music.play"]
new_app = "com.brand.new.app"          # never seen during training

vocab = {a: i for i, a in enumerate(train_apps)}
print("one-hot lookup for new app:", vocab.get(new_app, "KeyError -&gt; crash or 'UNKNOWN'"))

# Hashing trick: map ANY string to one of n_features buckets with a hash function
hasher = FeatureHasher(n_features=16, input_type="string", alternate_sign=False)
for app in train_apps + [new_app]:
    vec = hasher.transform([[app]]).toarray()[0]
    print(f"{app:20s} -&gt; bucket {int(np.argmax(vec)):2d}")

# Collisions: with many categories and few buckets, some share a bucket
apps = [f"app_{i}" for i in range(1_000)]
buckets = hasher.transform([[a] for a in apps]).toarray().argmax(axis=1)
print("1,000 apps into 16 buckets -&gt; apps per bucket ~", round(1_000 / 16, 1),
      "| largest bucket:", np.bincount(buckets).max())
big = FeatureHasher(n_features=2**18, input_type="string", alternate_sign=False)
b2 = big.transform([[a] for a in apps]).nonzero()[1]
print("with 2**18 buckets, distinct buckets used:", len(set(b2)), "of 1000")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">one-hot lookup for new app: KeyError -&gt; crash or 'UNKNOWN'
com.chat.fast        -&gt; bucket 12
com.maps.go          -&gt; bucket 13
com.music.play       -&gt; bucket 12
com.brand.new.app    -&gt; bucket 11
1,000 apps into 16 buckets -&gt; apps per bucket ~ 62.5 | largest bucket: 78
with 2**18 buckets, distinct buckets used: 1000 of 1000</code></pre>
<p>Two observations. With only 16 buckets, <code>com.chat.fast</code> and <code>com.music.play</code> <strong>collide</strong> into bucket 12: the model cannot tell them apart. With a large hash space (2^18 = 262,144 buckets) the 1,000 apps all landed in distinct buckets. Research and industry practice suggest the impact of collisions on model performance is small when the space is large enough. Choose a hash function that spreads values uniformly; the hash space size is a trade-off between memory and collision rate. The hashing trick is widely used in production systems, including the scikit-learn <code>FeatureHasher</code> shown here and large-scale ad and recommendation systems.</p>

<h3>Feature crossing</h3>
<p>Feature crossing combines two or more features into a new one, to model their interaction. A model predicting whether someone will buy a house might do better with "marital status x number of children" than with either alone. Crossing is essential for models that cannot learn interactions on their own (linear models, logistic regression, and to some extent tree models need help). The catch: it multiplies the number of categories: 100 values crossed with 100 values gives 10,000, each with fewer examples, increasing the risk of overfitting.</p>

<h3>Discrete and continuous positional embeddings</h3>
<p>When a model processes a sequence in parallel (as transformers do), it does not automatically know the order of the elements. Position must be given as a feature. Using the raw index (0, 1, 2, ...) works poorly because the numbers grow unbounded. Two approaches:</p>
<ul>
  <li><strong>Learned (discrete) positional embeddings</strong>: an embedding table with one row per position, learned along with the model, exactly like word embeddings. Limitation: positions beyond the maximum length seen in training have no embedding.</li>
  <li><strong>Fixed (continuous) positional embeddings</strong>: each position is represented by sine and cosine functions of different frequencies (as in the original Transformer). They are defined for any position, and nearby positions get similar vectors. A related idea, Fourier features, lets models represent continuous coordinates (such as pixel positions) better.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

# Feature crossing: marital status x number of children
df = pd.DataFrame({"marital": ["single", "married", "single", "married"],
                   "children": ["0", "0", "1", "2"]})
df["marital_x_children"] = df["marital"] + "_" + df["children"]
print(df)

# Sinusoidal positional embeddings (as in the Transformer paper)
def positional_embedding(n_positions, dim):
    pos = np.arange(n_positions)[:, None]
    i = np.arange(dim // 2)[None, :]
    angle = pos / (10_000 ** (2 * i / dim))
    pe = np.zeros((n_positions, dim))
    pe[:, 0::2] = np.sin(angle)
    pe[:, 1::2] = np.cos(angle)
    return pe

pe = positional_embedding(n_positions=50, dim=8)
print("embedding of position 0:", pe[0].round(3))
print("embedding of position 1:", pe[1].round(3))
# nearby positions are more similar than far-apart ones
cos = lambda a, b: a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
print(f"similarity(pos 10, pos 11) = {cos(pe[10], pe[11]):.3f}")
print(f"similarity(pos 10, pos 40) = {cos(pe[10], pe[40]):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   marital children marital_x_children
0   single        0           single_0
1  married        0          married_0
2   single        1           single_1
3  married        2          married_2
embedding of position 0: [0. 1. 0. 1. 0. 1. 0. 1.]
embedding of position 1: [0.841 0.54  0.1   0.995 0.01  1.    0.001 1.   ]
similarity(pos 10, pos 11) = 0.884
similarity(pos 10, pos 40) = 0.280</code></pre>
<p>Positions 10 and 11 have similarity 0.88, while positions 10 and 40 have 0.28: the encoding carries a sense of distance, which is exactly what a sequence model needs.</p>
`,
          keyPoints: [
            "Feature engineering remains a major lever for production models, especially on tabular data.",
            "Missing values can be MNAR, MAR or MCAR; row deletion on non-random missingness removes informative examples. Add missing-indicator features.",
            "Compute imputation and scaling statistics on training data only and ship them with the model.",
            "Log transforms tame skewed features; discretization trades precision for robustness but adds boundary discontinuities.",
            "The hashing trick encodes unbounded, changing categories into a fixed-size space; collisions are rare with a large enough space.",
            "Feature crosses model interactions but explode cardinality; positional embeddings give sequence models a sense of order."
          ],
          exercise: {
            prompt: String.raw`<p>You are preparing features for a marketplace fraud model. The raw columns are: <code>seller_id</code> (thousands of new sellers weekly), <code>listing_price</code> (heavily right-skewed), <code>account_age_days</code> (missing for accounts migrated from an old system), <code>country</code> and <code>payment_method</code>.</p>
<p>Describe how you would transform each column, then implement a function <code>prepare(train_df, test_df)</code> in pandas/NumPy that: log-transforms price, imputes <code>account_age_days</code> with the training median plus a missing indicator, and hashes <code>seller_id</code> into 1,024 buckets with scikit-learn's FeatureHasher. Show it running on a tiny example.</p>`,
            solution: String.raw`<p><strong>Plan.</strong> <code>seller_id</code>: hashing trick (new sellers appear constantly, and a vocabulary would map them all to UNKNOWN). <code>listing_price</code>: log1p, because it is skewed. <code>account_age_days</code>: the missingness is not random (migrated accounts), so impute with the training median and add an indicator. <code>country x payment_method</code>: a feature cross, because a payment method that is normal in one country may be suspicious in another.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.feature_extraction import FeatureHasher

def prepare(train_df, test_df, n_buckets=1024):
    median_age = train_df["account_age_days"].median()          # training statistic only
    hasher = FeatureHasher(n_features=n_buckets, input_type="string", alternate_sign=False)
    out = []
    for df in (train_df, test_df):
        f = pd.DataFrame(index=df.index)
        f["log_price"] = np.log1p(df["listing_price"])
        f["age_missing"] = df["account_age_days"].isna().astype(int)
        f["account_age_days"] = df["account_age_days"].fillna(median_age)
        f["country_x_payment"] = df["country"] + "_" + df["payment_method"]
        f["seller_bucket"] = hasher.transform([[s] for s in df["seller_id"]]).nonzero()[1]
        out.append(f)
    return out

train = pd.DataFrame({"seller_id": ["s1", "s2", "s3"], "listing_price": [10.0, 2500.0, 40.0],
                      "account_age_days": [400, np.nan, 30],
                      "country": ["FR", "US", "FR"], "payment_method": ["card", "card", "wire"]})
test = pd.DataFrame({"seller_id": ["s_new_999"], "listing_price": [990.0],
                     "account_age_days": [np.nan], "country": ["US"], "payment_method": ["wire"]})
tr, te = prepare(train, test)
print(te.drop(columns="seller_bucket").round(2).to_string())
print("unseen seller got a valid bucket:", 0 &lt;= int(te["seller_bucket"].iloc[0]) &lt; 1024)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   log_price  age_missing  account_age_days country_x_payment
0        6.9            1             215.0           US_wire
unseen seller got a valid bucket: True</code></pre>
<p>The unseen seller still gets a bucket, the missing account age is filled with the <em>training</em> median (215 = median of 400 and 30) and flagged, and the cross captures the country-specific payment pattern. In a real pipeline the cross would itself be one-hot or hashed before going into the model.</p>`
          },
          quiz: [
            { q: "Applicants with very high income often leave the income field blank. What type of missingness is this?", options: ["Missing completely at random", "Missing at random", "Missing not at random", "Not missing"], answer: 2, explain: "The value is missing because of the value itself (high income), which is missing not at random (MNAR)." },
            { q: "Why is filling a missing 'number of children' with 0 risky?", options: ["0 is not a number", "0 is a real possible value, so the model confuses 'unknown' with 'no children'", "It makes the column categorical", "Imputation is never allowed"], answer: 1, explain: "Imputing with a plausible real value merges two different situations. Use a sentinel plus an indicator, or a statistic plus an indicator." },
            { q: "What problem does the hashing trick solve?", options: ["It makes features human-readable", "It encodes categories, including never-seen ones, into a fixed-size feature space", "It removes all collisions", "It scales numeric features"], answer: 1, explain: "Hashing maps any string to one of a fixed number of buckets, so new categories at inference time still get an encoding. Collisions are possible but rare with a large space." },
            { q: "What is the main risk of feature crossing two high-cardinality features?", options: ["The model can no longer learn interactions", "The number of combined categories explodes, leaving few examples per category and raising overfitting risk", "It forces the use of deep learning", "It deletes the original features"], answer: 1, explain: "Crossing multiplies cardinalities; sparse combinations have few examples, so the model can overfit." },
            { q: "Why do transformers need positional embeddings?", options: ["To reduce model size", "Because they process tokens in parallel and otherwise have no notion of order", "To encode the vocabulary", "To normalize features"], answer: 1, explain: "Without position information, a transformer sees the input as a set; positional embeddings (learned or sinusoidal) encode order." }
          ]
        },
        {
          id: "mlsys-data-leakage",
          title: "Data Leakage, Feature Importance and Generalization",
          minutes: 50,
          objectives: [
            "Define data leakage and list its common causes",
            "Demonstrate how random splits on time-correlated data inflate performance",
            "Detect leakage with feature importance, single-feature tests and ablation",
            "Evaluate features by importance, coverage and generalization to unseen data"
          ],
          body: String.raw`
<p><strong>Data leakage</strong> happens when some form of the label "leaks" into the features used for making predictions, and this same information is <em>not available at inference time</em>. The model looks brilliant in evaluation and then fails in production. Leakage is one of the most common and most embarrassing failures in applied ML because it is invisible in the usual metrics: the more severe the leak, the better your offline numbers look.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 5, sections "Data Leakage" and "Engineering Good Features".</div>

<div class="callout info"><strong>Scenario:</strong> During the COVID-19 pandemic, researchers built many models to detect the disease from chest scans. Several later turned out to have learned shortcuts: in one dataset, scans of patients lying down (who were more likely to be seriously ill) were mixed with scans of patients standing up, and the model learned to predict severity from patient position. In another, the font used by a particular hospital's scanner correlated with the label. The models scored well on test data drawn from the same sources and were useless elsewhere.</div>

<h3>Common causes of data leakage</h3>
<h4>1. Splitting time-correlated data randomly instead of by time</h4>
<p>Many datasets have time dependence: stock prices, product demand, music listening trends. If you split randomly, the training set contains days <em>after</em> some test days, and the model learns information from the future. In production you will only ever have the past. If the data is time-correlated, split by time: train on weeks 1 to 4, validate on week 5, test on week 6.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

# Daily demand for a grocery item, with a slow upward trend + weekly pattern
rng = np.random.default_rng(0)
days = np.arange(730)
demand = 100 + 0.15 * days + 15 * np.sin(2 * np.pi * days / 7) + rng.normal(0, 5, len(days))
df = pd.DataFrame({"day": days, "dow": days % 7, "demand": demand})
df["lag_7"] = df["demand"].shift(7)                         # demand one week ago: legit
df = df.dropna().reset_index(drop=True)
features = ["day", "dow", "lag_7"]

def evaluate(train_idx, test_idx, label):
    m = GradientBoostingRegressor(random_state=0).fit(df.loc[train_idx, features], df.loc[train_idx, "demand"])
    mae = mean_absolute_error(df.loc[test_idx, "demand"], m.predict(df.loc[test_idx, features]))
    print(f"{label:34s} MAE = {mae:5.2f}")

# WRONG: random split -&gt; the model sees days on both sides of every test day
shuffled = rng.permutation(len(df))
evaluate(shuffled[:500], shuffled[500:], "random split (leaks the future)")
# RIGHT: train on the past, test on the future -- just like production
evaluate(np.arange(500), np.arange(500, len(df)), "time-based split (honest)")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">random split (leaks the future)    MAE =  5.33
time-based split (honest)          MAE = 13.45</code></pre>
<p>The random split reports an error of 5.3 units; the honest time-based split reports 13.5. Why so different? Demand has an upward trend. With a random split, every test day is surrounded by training days, so the model just interpolates. With a time split, the model must forecast days beyond anything it has seen, and tree ensembles cannot extrapolate a trend: they predict roughly the last values they learned. The random split did not just give a wrong number; it hid a design flaw (the model needs a way to handle trend, such as predicting changes rather than levels). Only the honest split reveals it.</p>
<h4>2. Scaling before splitting</h4>
<p>If you compute mean and standard deviation over the whole dataset and then split, the training data has been shaped by statistics of the test data. Always split first, fit scalers on the training split, and apply them to validation and test. scikit-learn <code>Pipeline</code> objects make this automatic inside cross-validation.</p>
<h4>3. Filling missing data with statistics from the test split</h4>
<p>The same mistake with imputation: the mean or median used to fill gaps must come from the training split only.</p>
<h4>4. Poor handling of data duplication before splitting</h4>
<p>If the same (or near-identical) examples appear in both train and test, the model is tested on what it memorized. Duplicates are surprisingly common: popular benchmark datasets have been found to contain overlapping images between training and test sets. Oversampling before splitting creates duplicates too. Deduplicate before splitting, and check after.</p>
<h4>5. Group leakage</h4>
<p>A group of examples has strongly correlated labels but is split across train and test. A patient might have two CT scans a week apart, which are nearly identical and have the same label; if one lands in train and one in test, the model recognizes the patient rather than the disease. Split by group (patient, user, session) with tools like <code>GroupKFold</code>.</p>
<h4>6. Leakage from the data generation process</h4>
<p>The way data is collected or recorded encodes the label. In the scanner example above, hospitals that see more severe cases used different machines. Or a feature is filled in only after the outcome happens. These are the hardest to catch and need an understanding of how the data is produced: talk to the people who create it.</p>

<h3>Detecting data leakage</h3>
<p>Leakage can happen at any step: generating, collecting, sampling, splitting, processing, feature engineering. Some practical detection techniques:</p>
<ul>
  <li><strong>Be suspicious of great results.</strong> If a hard problem suddenly reaches 0.99 AUC, investigate before celebrating.</li>
  <li><strong>Measure the predictive power of each feature</strong> (or set of features) on its own. A single feature that predicts the label almost perfectly needs an explanation.</li>
  <li><strong>Ablation studies</strong>: remove a feature or group of features and see how much performance drops. A dramatic drop for an unexpected feature is a red flag.</li>
  <li><strong>Feature importance</strong>: check what the model relies on most and whether it makes sense.</li>
  <li><strong>Ask "would I have this value at prediction time?"</strong> for every feature, and check the exact timestamp at which each value becomes known.</li>
  <li><strong>Watch out for new features</strong>: if adding one feature greatly improves performance, either it is genuinely good or it leaks.</li>
  <li><strong>Look at the test split as little as possible</strong>: every decision you make after looking at test results leaks test information into your design.</li>
</ul>
<p>Here is a hospital readmission dataset where one column, <code>followup_scheduled</code>, is filled in by staff <em>after</em> a patient is readmitted. Watch how the detection techniques expose it:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# Hospital readmission data. One column was filled in AFTER the outcome was known.
rng = np.random.default_rng(0)
n = 4_000
age = rng.integers(20, 90, n)
prior_visits = rng.poisson(2, n)
bmi = rng.normal(27, 5, n)
risk = 0.03 * (age - 50) + 0.4 * prior_visits + rng.normal(0, 1.5, n)
readmitted = (risk &gt; 1.2).astype(int)
# 'followup_scheduled' is set by staff once a patient is readmitted -&gt; leaky
followup_scheduled = np.where(rng.random(n) &lt; 0.95, readmitted, 1 - readmitted)

X = pd.DataFrame({"age": age, "prior_visits": prior_visits, "bmi": bmi,
                  "followup_scheduled": followup_scheduled})
X_tr, X_te, y_tr, y_te = train_test_split(X, readmitted, test_size=0.3, random_state=0)

def fit_and_score(cols):
    m = RandomForestClassifier(n_estimators=150, random_state=0).fit(X_tr[cols], y_tr)
    return m, roc_auc_score(y_te, m.predict_proba(X_te[cols])[:, 1])

model, auc_all = fit_and_score(list(X.columns))
print(f"AUC with all features: {auc_all:.3f}   &lt;- suspiciously high?")

imp = permutation_importance(model, X_te, y_te, n_repeats=5, random_state=0, scoring="roc_auc")
for name, val in sorted(zip(X.columns, imp.importances_mean), key=lambda t: -t[1]):
    print(f"  permutation importance {name:20s} {val:.3f}")

# Detection trick: how well does each feature predict the label ON ITS OWN?
for col in X.columns:
    print(f"  single-feature AUC {col:20s} {fit_and_score([col])[1]:.3f}")

_, auc_clean = fit_and_score(["age", "prior_visits", "bmi"])
print(f"AUC without the leaky column: {auc_clean:.3f}  &lt;- what production will really see")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">AUC with all features: 0.965   &lt;- suspiciously high?
  permutation importance followup_scheduled   0.415
  permutation importance bmi                  0.002
  permutation importance age                  0.002
  permutation importance prior_visits         0.001
  single-feature AUC age                  0.657
  single-feature AUC prior_visits         0.628
  single-feature AUC bmi                  0.503
  single-feature AUC followup_scheduled   0.961
AUC without the leaky column: 0.655  &lt;- what production will really see</code></pre>
<p>The AUC of 0.965 on a notoriously difficult prediction problem is the first clue. Permutation importance (shuffle one column and measure how much the score drops) shows that the model relies almost entirely on <code>followup_scheduled</code>. The single-feature test confirms it: that column alone predicts the label with AUC 0.961. Without it, the honest AUC is about 0.66, which is what the hospital would really get in production, because at discharge time nobody knows yet whether a follow-up will be scheduled.</p>

<h3>Engineering good features</h3>
<p>More features are not automatically better. Each feature can leak, can add noise that causes overfitting, increases memory and latency at serving time, and adds maintenance cost (it is one more upstream dependency that can break). Periodically remove features that no longer help. Two lenses for evaluating a feature:</p>
<h4>Feature importance</h4>
<p>Tree libraries such as XGBoost report built-in importances. <strong>Permutation importance</strong> (shown above) works for any model. <strong>SHAP</strong> (SHapley Additive exPlanations) goes further: it estimates each feature's contribution both to the model overall and to <em>each individual prediction</em>, which is helpful for explaining a specific decision. In practice, importance is usually concentrated: a small number of features often accounts for most of a model's predictive power, which suggests where to focus engineering effort and which features to drop.</p>
<h4>Feature generalization</h4>
<p>Since the goal is to predict well on unseen data, features should generalize. Two aspects:</p>
<ul>
  <li><strong>Coverage</strong>: the percentage of examples that have a value for this feature. A feature present in 1% of rows is usually not very useful, unless that 1% is highly predictive (for instance when missingness itself is informative). Also check that coverage is similar in training and production; if a feature is present in 90% of training rows but only 20% of production rows, its distribution has shifted.</li>
  <li><strong>Distribution of values</strong>: if values seen in production do not overlap with training values, the feature may hurt. A model trained on "day of week" from data covering only Monday to Saturday will not know what to do with Sunday. A raw <code>DAY_OF_YEAR</code> feature for predicting bookings may lock the model into last year's calendar.</li>
</ul>
<p>There is a trade-off between generalization and specificity. "Is it rush hour?" generalizes better than "hour of day" but loses detail. Use domain knowledge to find the right level.</p>
`,
          keyPoints: [
            "Data leakage: label information sneaks into features but is unavailable at inference time; it inflates offline metrics.",
            "Common causes: random splits of time-correlated data, scaling or imputing before splitting, duplicates across splits, group leakage, and the data generation process.",
            "Split by time for time-correlated data and by group (user, patient) for grouped data.",
            "Detect leakage with suspicion of great results, single-feature tests, ablation, feature importance, and 'is this known at prediction time?' checks.",
            "Permutation importance and SHAP show what a model relies on; importance is usually concentrated in a few features.",
            "Good features have adequate coverage and similar distributions in training and production."
          ],
          exercise: {
            prompt: String.raw`<p>A team builds a model to predict whether a support ticket will be escalated to a manager. Features include: <code>ticket_text</code>, <code>customer_tier</code>, <code>num_messages_in_thread</code>, <code>time_to_resolution_hours</code>, <code>assigned_agent_seniority</code>, <code>created_at</code>, and <code>customer_id</code>. The model gets 0.97 AUC with a random 80/20 split. Production performance is much worse.</p>
<ol>
  <li>List every likely source of leakage and explain why.</li>
  <li>Propose a corrected splitting strategy.</li>
  <li>Write Python using scikit-learn's <code>GroupKFold</code> to show that no customer appears in both training and validation folds.</li>
</ol>`,
            solution: String.raw`<ol>
  <li><strong>Leakage sources.</strong>
    <ul>
      <li><code>time_to_resolution_hours</code>: only known after the ticket is resolved, which is after escalation. Not available at prediction time.</li>
      <li><code>num_messages_in_thread</code>: if computed over the whole thread, escalated tickets naturally have more messages, including messages written after the escalation. Use only the messages available at prediction time (e.g. the first message).</li>
      <li><code>assigned_agent_seniority</code>: escalated tickets may be <em>reassigned</em> to senior agents; if the field reflects the final assignee, it encodes the outcome.</li>
      <li>Random split over time-correlated data: product launches and outages produce bursts of similar tickets; random splitting puts near-duplicate tickets from the same incident in train and test.</li>
      <li>Group leakage via <code>customer_id</code>: the same customer's tickets (similar wording, same tier, same escalation habits) appear in both splits.</li>
    </ul>
  </li>
  <li><strong>Corrected split</strong>: drop or fix the post-outcome features; split by time (train on older months, validate on the next month, test on the most recent month) and make sure customers in the test period are evaluated with features computed only from data available at ticket creation. Within the training period, use group-aware cross-validation by customer.</li>
  <li>Group-aware cross-validation:</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.model_selection import GroupKFold

rng = np.random.default_rng(0)
customer_id = rng.integers(0, 30, size=200)        # 200 tickets from 30 customers
X = rng.normal(size=(200, 4))

for fold, (tr, va) in enumerate(GroupKFold(n_splits=4).split(X, groups=customer_id)):
    overlap = set(customer_id[tr]) &amp; set(customer_id[va])
    print(f"fold {fold}: {len(set(customer_id[va]))} validation customers, overlap with train = {len(overlap)}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">fold 0: 7 validation customers, overlap with train = 0
fold 1: 7 validation customers, overlap with train = 0
fold 2: 8 validation customers, overlap with train = 0
fold 3: 8 validation customers, overlap with train = 0</code></pre>
<p>Each customer's tickets land in exactly one validation fold, so the model is evaluated on customers it has never seen, which is what happens in production for new customers.</p>`
          },
          quiz: [
            { q: "Which of these is data leakage?", options: ["Using last week's sales to predict next week's sales", "Using a 'refund_issued' flag to predict whether an order will be returned, when the flag is set after the return", "Using the customer's country as a feature", "Standardizing features with training-set statistics"], answer: 1, explain: "The refund flag is only known after the outcome, so it will not be available when predicting, which is the definition of leakage." },
            { q: "Why should time-correlated data usually be split by time?", options: ["It makes training faster", "Production only has past data; a random split lets the model learn from the future", "Random splits are not supported by scikit-learn", "It guarantees balanced classes"], answer: 1, explain: "A time-based split mimics production, where you predict the future from the past. Random splits leak future information." },
            { q: "You compute the mean of a feature over the full dataset, impute missing values with it, then split. What is wrong?", options: ["Nothing", "Test-set statistics have leaked into the training data", "The mean should be the median", "Imputation should be done after training"], answer: 1, explain: "Statistics used for imputation or scaling must be computed on the training split only, then applied to other splits." },
            { q: "A single feature alone predicts the label with AUC 0.98 on a hard problem. What should you do first?", options: ["Ship the model immediately", "Investigate how and when that feature is generated, since it may leak the label", "Remove all other features", "Increase the model size"], answer: 1, explain: "Unusually strong single-feature predictive power is a classic leakage signal; confirm the value is available at prediction time." },
            { q: "A feature is present in 85% of training rows but only 25% of production requests. What concern does this raise?", options: ["Feature coverage differs between training and production, so the model may not generalize", "The feature is too important", "The feature must be hashed", "None"], answer: 0, explain: "Coverage (and value distribution) should be similar in training and production; a large mismatch signals a shifted or broken feature." }
          ]
        }
      ]
    },
    {
      id: "mlsys-model",
      title: "Model Development, Evaluation and Deployment",
      summary: "Selecting and tracking models, evaluating them far beyond one accuracy number, choosing between batch and online prediction, and compressing models for cheap, fast serving on the cloud or the edge.",
      lessons: [
        {
          id: "mlsys-model-development",
          title: "Model Selection, Baselines, Ensembles and Experiment Tracking",
          minutes: 55,
          objectives: [
            "Apply practical tips for selecting a model, starting from simple baselines",
            "Compare bagging, boosting and stacking ensembles and know when they are worth their cost",
            "Track and version experiments (code, data, parameters, metrics) for reproducibility",
            "Explain data parallelism and model parallelism, and what AutoML automates"
          ],
          body: String.raw`
<p>With data and features in place, it is time to train models. This is the part of the job most ML courses focus on, so this lesson concentrates on the production-specific habits around it: choosing what to try, knowing what "good" means, keeping track of hundreds of experiments, and scaling training when one machine is not enough.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 6, "Model Development and Offline Evaluation" (model selection, ensembles, experiment tracking, distributed training, AutoML).</div>

<h3>Six tips for model selection</h3>
<ol>
  <li><strong>Avoid the state-of-the-art trap.</strong> A new model being state of the art means it beat others on a static research benchmark. It does not mean it is fast enough, cheap enough or even better on <em>your</em> data. If a simpler solution meets the requirements, use it.</li>
  <li><strong>Start with the simplest models.</strong> Simple models are easier to deploy, and deploying early lets you validate the whole pipeline (features, serving, monitoring) end to end. They are easier to debug and to explain, and they are a baseline for complex models. "Simplest" can mean least effort rather than fewest parameters: a pretrained model through a few lines of code is simple to try even if it is huge.</li>
  <li><strong>Avoid human biases in selecting models.</strong> An engineer excited about a new architecture tends to spend more time tuning it than the boring alternative, then concludes the new one is better. Compare candidates under comparable effort and settings.</li>
  <li><strong>Evaluate good performance now versus good performance later.</strong> The best model today might not be the best when you have ten times more data. <em>Learning curves</em> (performance versus training-set size) help estimate how each model would improve with more data. A model that learns from new data incrementally may beat a stronger model that must be retrained from scratch.</li>
  <li><strong>Evaluate trade-offs.</strong> False positives vs false negatives, accuracy vs latency and memory, accuracy vs interpretability. Make them explicit with stakeholders.</li>
  <li><strong>Understand your model's assumptions.</strong> Every model assumes something: that examples are independent and identically distributed (IID), that the relationship is smooth, that classes are linearly separable (linear models), that features are independent given the class (naive Bayes), that data follows a normal distribution. Know which assumptions your data violates.</li>
</ol>

<h3>Baselines: what does "good" mean?</h3>
<p>A number like "F1 = 0.90" is meaningless alone. If 90% of examples are positive, predicting positive every time gets F1 around 0.95. Always compare against baselines:</p>
<ul>
  <li><strong>Random baseline</strong>: predictions drawn at random (uniformly or following the label distribution).</li>
  <li><strong>Zero rule baseline</strong>: always predict the most common class.</li>
  <li><strong>Simple heuristic</strong>: a hand rule, such as "rank items by recency" or "flag transactions over $5,000".</li>
  <li><strong>Human baseline</strong>: how well do humans (experts or crowd workers) do? Important for automation decisions.</li>
  <li><strong>Existing solutions</strong>: the current rule system or a vendor's product. Your model must beat what is already there, or be cheaper.</li>
</ul>
<pre><code class="lang-python runnable">from sklearn.datasets import make_classification
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import (RandomForestClassifier, GradientBoostingClassifier,
                              StackingClassifier, VotingClassifier)
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

X, y = make_classification(n_samples=1_500, n_features=20, n_informative=8,
                           weights=[0.7], random_state=3)

models = {
    "random baseline":        DummyClassifier(strategy="stratified", random_state=0),
    "most-frequent baseline": DummyClassifier(strategy="most_frequent"),
    "logistic regression":    LogisticRegression(max_iter=1000),
    "single decision tree":   DecisionTreeClassifier(random_state=0),
    "bagging (random forest)": RandomForestClassifier(n_estimators=80, random_state=0),
    "boosting (grad. boost)": GradientBoostingClassifier(random_state=0),
}
base = [("lr", LogisticRegression(max_iter=1000)),
        ("knn", KNeighborsClassifier(15)),
        ("rf", RandomForestClassifier(n_estimators=80, random_state=0))]
models["voting (lr+knn+rf)"] = VotingClassifier(base, voting="soft")
models["stacking (meta = lr)"] = StackingClassifier(base, final_estimator=LogisticRegression())

for name, model in models.items():
    f1 = cross_val_score(model, X, y, cv=3, scoring="f1").mean()
    print(f"{name:25s} F1 = {f1:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">random baseline           F1 = 0.311
most-frequent baseline    F1 = 0.000
logistic regression       F1 = 0.781
single decision tree      F1 = 0.735
bagging (random forest)   F1 = 0.810
boosting (grad. boost)    F1 = 0.827
voting (lr+knn+rf)        F1 = 0.821
stacking (meta = lr)      F1 = 0.834</code></pre>
<p>The random baseline sets the floor (0.31) and most-frequent scores 0, because it never predicts the positive class. Every real model beats them comfortably. The ensembles at the bottom are discussed next.</p>

<h3>Ensembles</h3>
<p>An ensemble combines several models (base learners) and usually beats any single one, because their errors partially cancel. If three independent classifiers are each correct 70% of the time, a majority vote is correct about 78% of the time. The gain shrinks as base learners become correlated, so diversity matters. Three families:</p>
<ul>
  <li><strong>Bagging</strong> (bootstrap aggregating): train each learner on a bootstrap sample (random sample with replacement) of the training data and average or vote. It reduces variance and helps unstable models such as decision trees. Random forests are bagging plus random feature selection.</li>
  <li><strong>Boosting</strong>: train learners sequentially, each focusing on the examples the previous ones got wrong (by reweighting or by fitting the residual errors). Gradient boosting machines (XGBoost, LightGBM, CatBoost) are the workhorse of tabular ML and have won many competitions.</li>
  <li><strong>Stacking</strong>: train several different base learners, then train a <em>meta-learner</em> that takes their predictions as inputs. In the results above, stacking scored best.</li>
</ul>
<p>Production caveat: ensembles are more complex to deploy, slower at inference and harder to maintain. They are popular in competitions where a tiny gain matters; in production, a gain of 0.02 F1 must be weighed against latency and maintenance cost. They are worth it where small improvements translate into lots of money, such as ad click prediction.</p>

<h3>Experiment tracking and versioning</h3>
<p>During development you run many experiments, and it is easy to lose track of which code, data and settings produced which result. <strong>Experiment tracking</strong> records the progress and results of each run; <strong>versioning</strong> records the details needed to recreate it. Things worth tracking during and after training:</p>
<ul>
  <li>Loss curves on the training and evaluation sets</li>
  <li>The metrics you care about (accuracy, F1, perplexity) on the validation set</li>
  <li>Logs of sample, prediction and ground-truth triples for quick sanity checks</li>
  <li>Training speed (steps per second, tokens per second)</li>
  <li>System performance: memory, CPU and GPU utilization</li>
  <li>Values of parameters and hyperparameters over time (learning rate schedules, gradient norms, weight norms)</li>
</ul>
<p>Tools like MLflow, Weights &amp; Biases and similar trackers store this per run. The core idea is simple enough to implement yourself:</p>
<pre><code class="lang-python runnable">import hashlib, json
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, log_loss

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_va, y_tr, y_va = train_test_split(X, y, test_size=0.25, random_state=0)

def data_version(*arrays):
    # content hash: if a single value changes, the version changes
    h = hashlib.sha256()
    for a in arrays:
        h.update(np.ascontiguousarray(a).tobytes())
    return h.hexdigest()[:12]

runs = []
for C in (0.01, 0.1, 1.0):
    params = {"C": C, "max_iter": 1000}
    model = make_pipeline(StandardScaler(), LogisticRegression(**params)).fit(X_tr, y_tr)
    proba = model.predict_proba(X_va)[:, 1]
    runs.append({
        "run_id": f"run-{len(runs) + 1}",
        "data_version": data_version(X_tr, y_tr),
        "params": params,
        "metrics": {"val_auc": round(roc_auc_score(y_va, proba), 4),
                    "val_logloss": round(log_loss(y_va, proba), 4)},
        "code_version": "git:3f2a9c1",   # in real life: the current commit hash
    })

for r in runs:
    print(json.dumps(r))
best = min(runs, key=lambda r: r["metrics"]["val_logloss"])
print("best run:", best["run_id"], best["params"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{"run_id": "run-1", "data_version": "54c452d83e08", "params": {"C": 0.01, "max_iter": 1000}, "metrics": {"val_auc": 0.9922, "val_logloss": 0.1793}, "code_version": "git:3f2a9c1"}
{"run_id": "run-2", "data_version": "54c452d83e08", "params": {"C": 0.1, "max_iter": 1000}, "metrics": {"val_auc": 0.9956, "val_logloss": 0.1003}, "code_version": "git:3f2a9c1"}
{"run_id": "run-3", "data_version": "54c452d83e08", "params": {"C": 1.0, "max_iter": 1000}, "metrics": {"val_auc": 0.9914, "val_logloss": 0.0985}, "code_version": "git:3f2a9c1"}
best run: run-3 {'C': 1.0, 'max_iter': 1000}</code></pre>
<p>Note something interesting in the result: run 2 has the best AUC while run 3 has the best log loss. Which run is "best" depends on the metric you committed to in advance, which is exactly why you record several metrics and decide the selection rule up front.</p>
<p><strong>Data versioning is harder than code versioning.</strong> Code is versioned line by line with diffs, but datasets are huge, stored in binary formats, and a single row can be gigabytes. Duplicating a dataset for each version is often infeasible. Tools like DVC version data by content hashes (checksums) of files and directories, as the <code>data_version</code> above does in miniature. Merging data versions makes little sense (if model A used data version X and model B used Y, there is no model for a merged Z). And privacy regulations such as GDPR may require deleting a user's data, which can make old versions impossible to restore. Even with perfect tracking, exact reproduction may fail due to nondeterminism in frameworks and hardware, so record the environment (library versions, hardware) too.</p>

<div class="callout tip"><strong>Tip:</strong> Debugging ML is slow because bugs are silent (the loss goes down, predictions come out, they are just wrong) and every fix needs retraining. Good practice: start simple and add components one at a time; first overfit a single small batch (if the model cannot reach near-zero training loss on 10 examples, something is broken); and set random seeds everywhere.</div>

<h3>Distributed training</h3>
<p>When the data or the model is too large for one machine, training must be distributed.</p>
<h4>Data parallelism</h4>
<p>Split the <em>data</em> across machines. Each worker holds a full copy of the model, computes gradients on its own shard of the batch, and the gradients are combined (averaged) to update the model. Because the average of per-shard gradients over equal-size shards equals the full-batch gradient, this is mathematically the same as training on one huge machine:</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
X = rng.normal(size=(1_200, 5))
true_w = np.array([2.0, -1.0, 0.5, 0.0, 3.0])
y = X @ true_w + rng.normal(0, 0.1, 1_200)

def mse_gradient(w, Xb, yb):
    return 2 * Xb.T @ (Xb @ w - yb) / len(yb)

w = np.zeros(5)
full_grad = mse_gradient(w, X, y)

# Data parallelism: 4 "workers" each hold a shard and compute a local gradient
shards = np.array_split(np.arange(len(y)), 4)
local_grads = [mse_gradient(w, X[idx], y[idx]) for idx in shards]
averaged = np.mean(local_grads, axis=0)          # an all-reduce / parameter server step
print("full-batch gradient :", full_grad.round(4))
print("averaged 4 workers  :", averaged.round(4))
print("identical:", np.allclose(full_grad, averaged))

# Train with synchronous data-parallel SGD
for step in range(200):
    grads = [mse_gradient(w, X[idx], y[idx]) for idx in shards]
    w -= 0.05 * np.mean(grads, axis=0)
print("learned weights:", w.round(2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">full-batch gradient : [-4.0008  1.7432 -0.8265  0.117  -5.8604]
averaged 4 workers  : [-4.0008  1.7432 -0.8265  0.117  -5.8604]
identical: True
learned weights: [ 2.01 -1.    0.5   0.    3.  ]</code></pre>
<p>Challenges: in <em>synchronous</em> SGD, every worker waits for the slowest one (stragglers). In <em>asynchronous</em> SGD, workers update shared weights without waiting, so some gradients are computed on stale weights; in practice this often works when updates are sparse. With many workers the effective batch becomes huge, which can make training unstable and requires tuning the learning rate (larger batches allow larger learning rates, up to a point). The main worker that aggregates often needs more memory than others.</p>
<h4>Model parallelism</h4>
<p>Split the <em>model</em> across machines: different layers, or different parts of large matrices, live on different devices. Naively this is not parallel at all, since layer 2 waits for layer 1. <strong>Pipeline parallelism</strong> fixes this by splitting each batch into micro-batches: while machine 2 processes micro-batch 1, machine 1 already processes micro-batch 2. Large models typically combine data, model and pipeline parallelism.</p>

<h3>AutoML</h3>
<p><strong>AutoML</strong> automates the search for ML solutions.</p>
<ul>
  <li><strong>Soft AutoML: hyperparameter tuning.</strong> Hyperparameters (learning rate, number of layers, tree depth, dropout) can matter more than the choice of architecture. Strategies include grid search, random search and Bayesian optimization (built into tools such as scikit-learn, Ray Tune and Optuna). Never tune on the test set: tune on a validation set, then report the test result once.</li>
  <li><strong>Hard AutoML: architecture search and learned optimizers.</strong> Neural architecture search (NAS) searches over building blocks (convolutions, attention, skip connections) using a search strategy such as reinforcement learning or evolution, guided by a performance estimate. Some well-known efficient architectures were found this way. Learned optimizers replace hand-designed update rules with learned functions. These methods are expensive, so most companies use their published results rather than running them.</li>
</ul>

<h3>The four phases of ML model development</h3>
<p>A useful roadmap for adopting ML on a problem:</p>
<ol>
  <li><strong>Before ML</strong>: if this is your first time solving the problem, try a non-ML heuristic. It may be good enough.</li>
  <li><strong>Simplest ML models</strong>: a simple, explainable model (logistic regression, gradient-boosted trees, kNN) to validate the framing and the data pipeline end to end.</li>
  <li><strong>Optimizing simple models</strong>: better objectives, hyperparameter search, feature engineering, more data, ensembles.</li>
  <li><strong>Complex models</strong>: only when simple models plateau, move to bigger architectures, and experiment with how quickly they decay in production to plan retraining infrastructure.</li>
</ol>
`,
          keyPoints: [
            "Avoid the state-of-the-art trap; start simple, compare fairly, and consider future performance and trade-offs.",
            "Always compare against baselines: random, zero rule, simple heuristic, human, and existing solutions.",
            "Bagging reduces variance, boosting fixes previous errors sequentially, stacking learns to combine models; ensembles cost latency and maintenance.",
            "Track losses, metrics, sample predictions, speed, system usage and hyperparameters for every run; version code, data and environment.",
            "Data parallelism splits data across workers that average gradients; model and pipeline parallelism split the model itself.",
            "Soft AutoML tunes hyperparameters; hard AutoML searches architectures. Never tune on the test set."
          ],
          exercise: {
            prompt: String.raw`<p>Your team must pick a model for predicting whether a delivery will be late. A colleague has built a large deep model with 0.81 F1 after two weeks of tuning; a gradient-boosted tree got 0.79 F1 in one afternoon with default settings. The current rule ("late if distance over 15 km and it is raining") gets 0.62.</p>
<ol>
  <li>List three questions you would answer before choosing, using the tips in this lesson.</li>
  <li>Write a small, fair comparison in Python: tune two different models with the same budget (same number of random-search trials and the same cross-validation folds), and report each model's best score. Use synthetic data from <code>make_classification</code>.</li>
</ol>`,
            solution: String.raw`<ol>
  <li>Questions: (a) <em>Is the comparison fair?</em> The deep model got two weeks of tuning, the trees one afternoon (human bias). Give both the same budget. (b) <em>What are the trade-offs?</em> Latency and serving cost per prediction, interpretability for the operations team, ease of retraining. (c) <em>Performance later?</em> Plot learning curves: if the deep model's advantage grows with data and you will have ten times more data soon, it may win later; if not, the trees are the better long-term choice. Also: is the 0.02 F1 difference significant across folds, and what is it worth in business terms compared with the rule baseline (0.62)?</li>
  <li>Equal-budget comparison:</li>
</ol>
<pre><code class="lang-python runnable">from scipy.stats import loguniform, randint
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = make_classification(n_samples=1_500, n_features=15, n_informative=6, weights=[0.75], random_state=0)
cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=0)   # same folds for everyone
BUDGET = 6                                                        # same number of trials

candidates = {
    "random forest": (RandomForestClassifier(n_estimators=60, random_state=0),
                      {"max_depth": randint(3, 16), "min_samples_leaf": randint(1, 10)}),
    "logistic regression": (make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
                            {"logisticregression__C": loguniform(1e-3, 1e2)}),
}
for name, (model, space) in candidates.items():
    search = RandomizedSearchCV(model, space, n_iter=BUDGET, cv=cv, scoring="f1", random_state=0)
    search.fit(X, y)
    best = {k.split("__")[-1]: round(float(v), 3) for k, v in search.best_params_.items()}
    print(f"{name:20s} best CV F1 = {search.best_score_:.3f}  params = {best}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">random forest        best CV F1 = 0.795  params = {'max_depth': 10.0, 'min_samples_leaf': 4.0}
logistic regression  best CV F1 = 0.702  params = {'C': 1.032}</code></pre>
<p>Both candidates get the same number of trials on the same folds, so the comparison reflects the models rather than the effort spent on them. (Swap in your real candidates, such as the deep model and gradient-boosted trees, with equal budgets.) Report the result next to the rule baseline, plus latency and cost.</p>`
          },
          quiz: [
            { q: "A paper reports a new state-of-the-art architecture. What is the right reaction for a production team?", options: ["Adopt it immediately", "Treat benchmark results as one input; check whether it beats simpler options on your data, latency and cost", "Ignore all research", "Only use models older than five years"], answer: 1, explain: "State of the art on a static benchmark does not guarantee better results on your data or acceptable cost; simpler models often meet requirements." },
            { q: "Which ensemble method trains learners sequentially, each focusing on the previous learners' mistakes?", options: ["Bagging", "Boosting", "Stacking", "Random baseline"], answer: 1, explain: "Boosting builds learners one after another, reweighting or fitting residuals of earlier ones. Bagging trains in parallel on bootstrap samples; stacking learns a meta-model." },
            { q: "Why is data versioning harder than code versioning?", options: ["Data never changes", "Datasets are large and often binary, line diffs are meaningless, copies are expensive, and privacy rules may force deletions", "Git cannot store text files", "Data has no checksum"], answer: 1, explain: "Code tools rely on small text diffs and full copies; data is too big for that, and regulations like GDPR complicate keeping old versions." },
            { q: "In synchronous data-parallel training with 4 workers on equal-size shards, how does the averaged gradient compare to the full-batch gradient?", options: ["It is a rough approximation only", "It is identical", "It is 4 times larger", "It is unrelated"], answer: 1, explain: "For a mean-based loss and equal shards, averaging the per-shard gradients gives exactly the full-batch gradient." },
            { q: "Where should hyperparameter tuning be evaluated?", options: ["On the test set", "On a validation set (or cross-validation), keeping the test set for a final report", "On the training set", "In production only"], answer: 1, explain: "Tuning on the test set leaks it into model selection and makes the final estimate optimistic." }
          ]
        },
        {
          id: "mlsys-model-evaluation",
          title: "Offline Evaluation: Behavioral Tests, Calibration and Slices",
          minutes: 55,
          objectives: [
            "Run perturbation, invariance and directional expectation tests on a model",
            "Measure and fix calibration, and explain why calibrated probabilities matter",
            "Use confidence measurement to decide which predictions to show",
            "Perform slice-based evaluation and recognize Simpson's paradox"
          ],
          body: String.raw`
<p>A single accuracy number on a test set tells you little about how a model will behave in production. Will tiny input noise flip its predictions? Does it treat people differently based on an attribute that should not matter? Are its probabilities meaningful? Does it fail badly for one group of users while doing well on average? Offline evaluation answers these before users find out.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 6, section "Model Offline Evaluation" (baselines and evaluation methods).</div>

<p>Ideally, evaluation methods are the same in development and production. In practice, ground-truth labels are often unavailable in production, so offline evaluation must be thorough. It should start from baselines (covered in the previous lesson) and then go beyond overall metrics.</p>

<h3>Perturbation tests</h3>
<p>Production inputs are noisier than your clean test set: a speech assistant hears background noise, users type with typos, sensors drift slightly. A <strong>perturbation test</strong> adds small, realistic noise to test inputs and checks how much predictions change. The more sensitive a model is to noise, the harder it is to maintain and the more vulnerable it is to adversarial attacks. You might even prefer a model with slightly lower accuracy that is far more stable.</p>

<h3>Invariance tests</h3>
<p>Some changes should <em>not</em> change the output at all. Changing an applicant's race or gender should not change a credit decision. Changing a seller's id should not change the predicted price of a house. An <strong>invariance test</strong> swaps such attributes and checks that predictions are unchanged. If a sensitive attribute affects predictions, consider excluding it (and its proxies) from the features.</p>

<h3>Directional expectation tests</h3>
<p>Some changes should move the output in a predictable direction. Adding square footage to a house, all else equal, should not lower its predicted price. A <strong>directional expectation test</strong> applies such changes and counts violations. Violations suggest the model learned spurious patterns or noise, and you may need to fix the data or add constraints (some libraries support monotonic constraints).</p>
<p>All three tests on a house-price random forest:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# A house-price model for a real-estate site
rng = np.random.default_rng(0)
n = 3_000
df = pd.DataFrame({
    "sqft": rng.uniform(500, 4_000, n),
    "bedrooms": rng.integers(1, 6, n),
    "age_years": rng.uniform(0, 80, n),
    "seller_id": rng.integers(0, 50, n),          # should be irrelevant to price
})
price = 120 * df["sqft"] + 8_000 * df["bedrooms"] - 900 * df["age_years"] + rng.normal(0, 20_000, n)
features = list(df.columns)
model = RandomForestRegressor(n_estimators=100, random_state=0, n_jobs=1).fit(df[features], price)
sample = df.sample(300, random_state=1).reset_index(drop=True)
base = model.predict(sample[features])

# 1) Perturbation test: tiny noise in sqft (measurement error) should barely move predictions
noisy = sample.copy(); noisy["sqft"] += rng.normal(0, 10, len(noisy))
change = np.abs(model.predict(noisy[features]) - base) / base
print(f"perturbation : median change {np.median(change):.2%} | houses moving &gt; 3%: {(change &gt; 0.03).mean():.1%}")

# 2) Invariance test: changing an irrelevant/sensitive attribute must not change output
swapped = sample.copy(); swapped["seller_id"] = (swapped["seller_id"] + 17) % 50
diff = np.abs(model.predict(swapped[features]) - base)
print(f"invariance   : mean |change| when seller_id swapped = {diff.mean():,.0f} dollars")

# 3) Directional expectation test: more sqft should NOT lower the price
bigger = sample.copy(); bigger["sqft"] += 100
violations = (model.predict(bigger[features]) &lt; base).mean()
print(f"directional  : {violations:.1%} of houses got CHEAPER after adding 100 sqft")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">perturbation : median change 0.56% | houses moving &gt; 3%: 14.7%
invariance   : mean |change| when seller_id swapped = 5,460 dollars
directional  : 15.3% of houses got CHEAPER after adding 100 sqft</code></pre>
<p>The results are instructive. A tiny 10-square-foot measurement noise moves 14.7% of predictions by more than 3%; <code>seller_id</code>, which has nothing to do with the price, shifts predictions by about $5,500 on average because the forest found spurious splits on it; and 15.3% of houses get <em>cheaper</em> when 100 square feet are added. The model's overall accuracy is fine, yet all three tests reveal behavior you would not want to ship. Fixes: drop <code>seller_id</code>, use a model with monotonic constraints on <code>sqft</code> (gradient boosting supports this), and smooth the model (larger leaves).</p>

<h3>Model calibration</h3>
<p>A model is <strong>calibrated</strong> if its probabilities mean what they say: of all the cases where it predicts 70%, about 70% should be positive. Calibration matters whenever you use the probability itself, not just the ranking:</p>
<ul>
  <li><strong>Expected values</strong>: ad systems multiply predicted click probability by bid to rank ads. If the probabilities are off, the auction is wrong.</li>
  <li><strong>Mixing items fairly</strong>: if a movie recommender predicts that a user watches romance 80% of the time and comedy 20%, a calibrated system shows roughly 80% romance and 20% comedy rather than 100% romance.</li>
  <li><strong>Thresholds and decisions</strong> tied to costs, as in the fraud example earlier.</li>
</ul>
<p>To measure calibration, bin predictions by predicted probability and compare each bin's average prediction with the observed positive rate (a <em>reliability diagram</em>, computed with <code>calibration_curve</code>). The <strong>expected calibration error</strong> (ECE) summarizes the gap. To fix it, fit a calibration mapping on held-out data: <em>Platt scaling</em> (a sigmoid) or <em>isotonic regression</em>, both available in scikit-learn's <code>CalibratedClassifierCV</code>.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB

X, y = make_classification(n_samples=20_000, n_features=20, n_informative=6,
                           n_redundant=10, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=0)

raw = GaussianNB().fit(X_tr, y_tr)
calibrated = CalibratedClassifierCV(GaussianNB(), method="isotonic", cv=5).fit(X_tr, y_tr)

def ece(y_true, p, bins=10):
    # expected calibration error: average |predicted - observed| weighted by bin size
    idx = np.minimum((p * bins).astype(int), bins - 1)
    return sum(abs(p[idx == b].mean() - y_true[idx == b].mean()) * (idx == b).mean()
               for b in range(bins) if (idx == b).any())

for name, m in [("raw naive Bayes", raw), ("isotonic-calibrated", calibrated)]:
    p = m.predict_proba(X_te)[:, 1]
    frac_pos, mean_pred = calibration_curve(y_te, p, n_bins=5)
    print(f"{name:20s} ECE = {ece(y_te, p):.3f}")
    for mp, fp in zip(mean_pred, frac_pos):
        print(f"    predicted {mp:.2f} -&gt; actually positive {fp:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">raw naive Bayes      ECE = 0.061
    predicted 0.02 -&gt; actually positive 0.04
    predicted 0.29 -&gt; actually positive 0.34
    predicted 0.50 -&gt; actually positive 0.50
    predicted 0.71 -&gt; actually positive 0.60
    predicted 0.97 -&gt; actually positive 0.88
isotonic-calibrated  ECE = 0.009
    predicted 0.04 -&gt; actually positive 0.04
    predicted 0.33 -&gt; actually positive 0.31
    predicted 0.51 -&gt; actually positive 0.56
    predicted 0.71 -&gt; actually positive 0.70
    predicted 0.92 -&gt; actually positive 0.91</code></pre>
<p>Naive Bayes is known for over-confident probabilities: when it says 0.97, the true rate is 0.88. After isotonic calibration, each bin's prediction matches its observed rate closely and the ECE drops from 0.061 to 0.009. The ranking of examples barely changes; what changes is that the numbers can now be trusted.</p>

<h3>Confidence measurement</h3>
<p>Calibration is about probabilities on average; <strong>confidence measurement</strong> is about individual predictions. For each prediction, how sure is the model, and should it be shown at all? Showing uncertain predictions can annoy users (an auto-reply suggestion that makes no sense) or cause harm (an uncertain medical flag). Common approach: set a confidence threshold below which predictions are not shown, are deferred to a human, or fall back to a safe default. Measure metrics separately for the confident predictions that will actually be acted upon.</p>

<h3>Slice-based evaluation</h3>
<p>Slicing means splitting data into subsets (slices) and evaluating each separately: by country, device, user age group, new vs returning users, language, accent. Focusing only on overall metrics hides two kinds of problems:</p>
<ol>
  <li>A model can perform well overall but badly on a slice that matters: a minority group (a fairness problem), or high-value users such as paying subscribers (a business problem).</li>
  <li>A model can look better or worse overall for the wrong reasons. The extreme case is <strong>Simpson's paradox</strong>: a trend that holds in every group reverses when groups are combined.</li>
</ol>
<pre><code class="lang-python runnable">import pandas as pd

# Two candidate models evaluated on a voice assistant's test set
# (numbers chosen to illustrate Simpson's paradox)
rows = [
    # slice,          model, n_examples, n_correct
    ("native accent",  "A", 870, 792),
    ("native accent",  "B", 270, 252),
    ("non-native",     "A", 130, 63),
    ("non-native",     "B", 730, 400),
]
df = pd.DataFrame(rows, columns=["slice", "model", "n", "correct"])

overall = df.groupby("model")[["n", "correct"]].sum()
overall["accuracy"] = (overall["correct"] / overall["n"]).round(3)
print("OVERALL accuracy:\n", overall["accuracy"].to_dict())

df["accuracy"] = (df["correct"] / df["n"]).round(3)
print("\nPER-SLICE accuracy:")
print(df.pivot(index="slice", columns="model", values="accuracy"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">OVERALL accuracy:
 {'A': 0.855, 'B': 0.652}

PER-SLICE accuracy:
model              A      B
slice                      
native accent  0.910  0.933
non-native     0.485  0.548</code></pre>
<p>Model A wins overall (0.855 vs 0.652), yet model B is better on <em>both</em> slices. How? The two models were evaluated on differently composed data: A mostly on native speakers (easy), B mostly on non-native speakers (hard). The overall number mixes model quality with slice composition. Without slicing, you would pick the worse model. Lessons: evaluate candidates on the same data, and always look at per-slice metrics for slices that matter.</p>
<p>How to find important slices:</p>
<ul>
  <li><strong>Heuristics from domain knowledge</strong>: device types, regions, user tenure, traffic sources.</li>
  <li><strong>Error analysis</strong>: manually inspect misclassified examples and look for patterns ("most errors are on mobile").</li>
  <li><strong>Slice finders</strong>: automated tools that search for subsets where the model underperforms, for example by clustering errors or by beam search over feature combinations.</li>
</ul>
<p>Once you know your critical slices, track them in production monitoring too.</p>

<div class="callout tip"><strong>Tip:</strong> Package these checks as a test suite that runs on every new model candidate, just like unit tests for code. A candidate that improves overall accuracy but fails invariance or a critical slice should not be promoted automatically.</div>
`,
          keyPoints: [
            "Overall test metrics are not enough; evaluate behavior, probabilities and slices before deployment.",
            "Perturbation tests check robustness to small noise; invariance tests check that irrelevant or sensitive attributes do not change outputs.",
            "Directional expectation tests check that predictions move the right way when an input changes in a known direction.",
            "Calibrated probabilities match observed frequencies; fix calibration with Platt scaling or isotonic regression on held-out data.",
            "Confidence thresholds decide which individual predictions to show, defer or replace with a fallback.",
            "Slice-based evaluation reveals hidden failures and Simpson's paradox; compare models on identical data."
          ],
          exercise: {
            prompt: String.raw`<p>Design an offline evaluation suite for a sentiment model that classifies product reviews as positive or negative, used to decide which reviews to highlight on product pages. For each of: perturbation, invariance, directional expectation, calibration, confidence and slices, give one concrete test case and its pass criterion.</p>
<p>Then implement a minimal invariance test in Python: given a toy keyword-based scoring function, check that replacing a person's name in the review does not change the score.</p>`,
            solution: String.raw`<table>
  <thead><tr><th>Test</th><th>Concrete case</th><th>Pass criterion</th></tr></thead>
  <tbody>
    <tr><td>Perturbation</td><td>Inject typos ("grate product"), random casing, extra whitespace</td><td>Label flips on fewer than 2% of reviews</td></tr>
    <tr><td>Invariance</td><td>Swap person names, locations or product brand names</td><td>Score change under 0.01 for 99% of reviews</td></tr>
    <tr><td>Directional</td><td>Append "Terrible quality." to positive reviews</td><td>Positive probability decreases for at least 95%</td></tr>
    <tr><td>Calibration</td><td>Reliability diagram on held-out set</td><td>ECE under 0.03</td></tr>
    <tr><td>Confidence</td><td>Only highlight reviews with probability above 0.9</td><td>Precision of highlighted reviews at least 0.97</td></tr>
    <tr><td>Slices</td><td>Short vs long reviews, each language, each product category, reviews with emojis</td><td>No slice more than 5 points below overall accuracy</td></tr>
  </tbody>
</table>
<pre><code class="lang-python runnable">import re

POSITIVE = {"great", "love", "excellent", "perfect"}
NEGATIVE = {"bad", "broken", "terrible", "refund"}

def sentiment_score(text):
    words = re.findall(r"[a-z]+", text.lower())
    pos = sum(w in POSITIVE for w in words)
    neg = sum(w in NEGATIVE for w in words)
    return (pos + 1) / (pos + neg + 2)          # smoothed probability of positive

def invariance_test(template, names, tolerance=1e-9):
    scores = {n: sentiment_score(template.format(name=n)) for n in names}
    spread = max(scores.values()) - min(scores.values())
    return spread &lt;= tolerance, scores

ok, scores = invariance_test("{name} said the blender is great, I love it", ["Maria", "Ahmed", "Wei", "John"])
print("invariance passed:", ok, scores)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">invariance passed: True {'Maria': 0.75, 'Ahmed': 0.75, 'Wei': 0.75, 'John': 0.75}</code></pre>
<p>For a real model you would run this across thousands of templates and names drawn from different cultures, and track the fraction that pass.</p>`
          },
          quiz: [
            { q: "Adding 100 square feet to houses makes 15% of predicted prices drop. Which test revealed this?", options: ["Invariance test", "Directional expectation test", "Calibration test", "Random baseline"], answer: 1, explain: "Directional expectation tests check that a known change in input moves predictions in the expected direction." },
            { q: "A calibrated model predicts 0.3 for 1,000 emails. About how many should be spam?", options: ["0", "About 300", "About 700", "All 1,000"], answer: 1, explain: "Calibration means predicted probabilities match observed frequencies: 30% of those 1,000 emails should be spam." },
            { q: "Model A beats model B overall, but B is better on every slice. What is going on?", options: ["A calculation bug is the only explanation", "Simpson's paradox: the models were evaluated on differently composed data", "B is overfitting", "Slices cannot be compared"], answer: 1, explain: "When slice composition differs, aggregates can reverse the per-slice trend. Evaluate on identical data and inspect slices." },
            { q: "Why might you prefer a slightly less accurate model that passes perturbation tests?", options: ["Less accurate models are always cheaper", "Robustness to realistic noise makes production behavior more stable and harder to attack", "Perturbation tests improve accuracy", "It needs no monitoring"], answer: 1, explain: "Production inputs are noisy; a model whose predictions swing on tiny changes will behave unpredictably and is vulnerable to adversarial inputs." },
            { q: "Which technique fixes poorly calibrated probabilities after training?", options: ["Feature hashing", "Isotonic regression or Platt scaling on held-out data", "Oversampling the test set", "Increasing the batch size"], answer: 1, explain: "Post-hoc calibration fits a mapping from raw scores to calibrated probabilities using held-out data." }
          ]
        },
        {
          id: "mlsys-model-deployment",
          title: "Deployment: Batch vs. Online Prediction and Unified Pipelines",
          minutes: 50,
          objectives: [
            "Debunk four common myths about ML deployment",
            "Compare batch prediction, online prediction with batch features, and streaming prediction",
            "Build a simple online prediction endpoint and a batch prediction table",
            "Explain train-serving skew and how unified feature pipelines prevent it"
          ],
          body: String.raw`
<p>"Deploying" a model means making it available to the systems and people who use its predictions. In a notebook, deployment can be as simple as wrapping <code>model.predict</code> in a web endpoint. In production, deployment brings questions about latency, scale, freshness, cost, rollback and consistency between training and serving.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 7, "Model Deployment and Prediction Service" (myths, batch vs online prediction, unifying pipelines).</div>

<figure><img src="assets/diagrams/model-dev-deploy.svg" alt="Train candidate models, offline evaluation, model registry, then batch prediction or online prediction serving a client app"><figcaption>After offline evaluation and registration, a model is served through batch prediction, online prediction, or both.</figcaption></figure>

<h3>Four deployment myths</h3>
<ol>
  <li><strong>"You only deploy one or two ML models at a time."</strong> Real applications need many models. A ride-sharing app needs demand prediction, driver availability, ETA, dynamic pricing, fraud detection and churn models, and often per-country variants. Large companies run hundreds or thousands of models in production. Infrastructure must be built for many models.</li>
  <li><strong>"If we don't do anything, model performance stays the same."</strong> Software does not degrade by itself (well, mostly), but ML models do: the world changes, data distributions shift, and a model trained last year slowly gets worse. This is sometimes called model decay or data drift; the operations module covers it.</li>
  <li><strong>"You won't need to update your models as much."</strong> Because models decay, they should be updated as often as possible. Tech companies push updates very frequently (some retrain certain models every few minutes or hours). The question should be "how often <em>can</em> we update?", not "how often must we?"</li>
  <li><strong>"Most ML engineers don't need to worry about scale."</strong> Most ML engineers work at companies with real traffic. Even "medium" scale (hundreds of requests per second, millions of users) requires thinking about latency, throughput and cost.</li>
</ol>

<h3>Batch prediction versus online prediction</h3>
<p>The most fundamental serving decision is <em>when</em> predictions are computed.</p>
<ul>
  <li><strong>Online prediction</strong> (on-demand, synchronous): predictions are generated as soon as a request arrives, and returned immediately. Typing a sentence into a translator and getting the translation back is online prediction. Usually served via REST or gRPC APIs.</li>
  <li><strong>Batch prediction</strong> (asynchronous): predictions are generated periodically or when triggered (for example every four hours for all users), stored in a table or in-memory database, and looked up when needed. A video service that precomputes recommendations for every user overnight uses batch prediction.</li>
</ul>
<p>Three modes are worth remembering:</p>
<table>
  <thead><tr><th>Mode</th><th>Features used</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Batch prediction</td><td>Batch features only</td><td>Nightly product recommendations emailed to users</td></tr>
    <tr><td>Online prediction with batch features</td><td>Precomputed features (e.g. embeddings) looked up at request time</td><td>Search ranking using precomputed product and user embeddings</td></tr>
    <tr><td>Streaming prediction</td><td>Batch features plus streaming features</td><td>Fraud check using the user's profile plus their transactions in the last 10 minutes</td></tr>
  </tbody>
</table>
<p>Strengths and weaknesses:</p>
<table>
  <thead><tr><th></th><th>Batch prediction</th><th>Online prediction</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>Periodical (e.g. every 4 hours)</td><td>As soon as requests come</td></tr>
    <tr><td>Useful for</td><td>Processing accumulated data when you do not need immediate results</td><td>When predictions are needed as soon as a request arrives</td></tr>
    <tr><td>Optimized for</td><td>High throughput, cheap compute (can use spot machines at night)</td><td>Low latency</td></tr>
    <tr><td>Main weakness</td><td>Stale predictions; must predict for all users, many of whom never log in; cannot handle inputs it has not seen (a new search query)</td><td>Needs fast models, low-latency feature access, autoscaling and monitoring</td></tr>
  </tbody>
</table>
<p>Batch prediction is often a workaround for when online prediction is not cheap or fast enough. If you can precompute everything (a recommendation for each of a million users), you can use a slow model. But it breaks for input spaces you cannot enumerate: you cannot precompute translations for every possible sentence, or a fraud score for a transaction that has not happened yet.</p>
<p><strong>Moving from batch to online prediction</strong> requires two things: (1) a (near) real-time pipeline that can process incoming data, compute streaming features, run the model and return a prediction; (2) a model fast enough for your latency budget (the next lesson covers compression and optimization).</p>
<p>Here is a minimal example of both modes with FastAPI, tested in-process with its <code>TestClient</code> (no network needed):</p>
<pre><code class="lang-python runnable">import time
import numpy as np
from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel
from sklearn.linear_model import LogisticRegression

# --- training (normally a separate pipeline that writes to a model store) ---
rng = np.random.default_rng(0)
X = rng.normal(size=(2_000, 3)); y = (X @ [1.5, -2.0, 0.7] + rng.normal(0, 2, 2_000) &gt; 0).astype(int)
model = LogisticRegression().fit(X, y)

# --- batch prediction: score every known user overnight, store results in a table ---
user_features = {f"user_{i}": rng.normal(size=3) for i in range(5)}
batch_table = {u: float(model.predict_proba([f])[0, 1]) for u, f in user_features.items()}

# --- online prediction: an HTTP endpoint that scores a request as it arrives ---
app = FastAPI()

class Features(BaseModel):
    f1: float
    f2: float
    f3: float

@app.post("/predict")
def predict(feat: Features):
    score = float(model.predict_proba([[feat.f1, feat.f2, feat.f3]])[0, 1])
    return {"score": round(score, 4), "model_version": "churn-lr-v3"}

@app.get("/precomputed/{user_id}")
def precomputed(user_id: str):
    return {"score": round(batch_table[user_id], 4), "source": "batch table"}

client = TestClient(app)
t0 = time.perf_counter()
print(client.post("/predict", json={"f1": 0.2, "f2": -1.0, "f3": 0.5}).json())
print(client.get("/precomputed/user_3").json())
print("both requests answered in under 1 s:", time.perf_counter() - t0 &lt; 1)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'score': 0.9045, 'model_version': 'churn-lr-v3'}
{'score': 0.1361, 'source': 'batch table'}
both requests answered in under 1 s: True</code></pre>
<p>The <code>/predict</code> endpoint computes a score from features sent in the request (online prediction). The <code>/precomputed</code> endpoint simply looks up a score computed earlier for a known user (batch prediction served online). Real services add input validation, timeouts, logging of features and predictions for monitoring, a model version in every response (as here), and a fallback if the model fails.</p>

<h3>Unifying the batch pipeline and the streaming pipeline</h3>
<p>Many companies train models with features computed by batch jobs over the warehouse (SQL, Spark), then serve them with features computed by a separate streaming or request-time code path, often written later by a different team in a different language. Two implementations of "the same" feature inevitably diverge. This is a major source of <strong>train-serving skew</strong>: the model sees different feature values in production than it saw in training, and performance silently drops.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

# Training pipeline (written by a data scientist in pandas)
def train_features_pandas(df):
    out = pd.DataFrame()
    out["amount_log"] = np.log1p(df["amount"])
    out["is_night"] = df["hour"].between(0, 5).astype(int)          # 0..5 inclusive
    out["country_risky"] = df["country"].isin(["XX", "YY"]).astype(int)
    return out

# Serving pipeline (re-written later by another engineer for the API)
def serve_features_rewritten(event):
    with np.errstate(divide="ignore"):
        log_amount = np.log(event["amount"])                          # log, not log1p!
    return {
        "amount_log": float(log_amount),
        "is_night": int(0 &lt;= event["hour"] &lt; 5),                      # excludes hour 5!
        "country_risky": int(event["country"].upper() in {"XX", "YY"}),  # upper() added
    }

events = [{"amount": 0.0, "hour": 5, "country": "us"},
          {"amount": 120.0, "hour": 2, "country": "xx"},
          {"amount": 35.5, "hour": 14, "country": "YY"}]
train_view = train_features_pandas(pd.DataFrame(events))
for i, e in enumerate(events):
    s = serve_features_rewritten(e)
    t = train_view.iloc[i].to_dict()
    mismatches = {k: (round(float(t[k]), 3), round(s[k], 3)) for k in s if not np.isclose(t[k], s[k])}
    print(f"event {i}: mismatches (train, serve) -&gt; {mismatches}")

# Fix: ONE feature function used by both the batch (training) and online (serving) paths
def features(amount, hour, country):
    return {"amount_log": float(np.log1p(amount)),
            "is_night": int(0 &lt;= hour &lt;= 5),
            "country_risky": int(str(country).upper() in {"XX", "YY"})}
batch = pd.DataFrame([features(**e) for e in events])     # training / batch prediction
online = [features(**e) for e in events]                  # request-time
print("unified pipeline consistent:", batch.to_dict("records") == online)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">event 0: mismatches (train, serve) -&gt; {'amount_log': (0.0, -inf), 'is_night': (1.0, 0)}
event 1: mismatches (train, serve) -&gt; {'amount_log': (4.796, 4.787), 'country_risky': (0.0, 1)}
event 2: mismatches (train, serve) -&gt; {'amount_log': (3.597, 3.57)}
unified pipeline consistent: True</code></pre>
<p>Three subtle bugs in three features: log versus log1p (and a minus-infinity for zero amounts), an off-by-one in the night window, and an uppercase normalization added only in serving. Each is innocent-looking, and none raises an error. The fix is to have <strong>one feature definition</strong> used by both the training (batch) path and the serving (online) path. Platforms that support this include stream processors that can process both historical and live data with the same logic, and <strong>feature stores</strong> (covered in the infrastructure module), which compute a feature once and serve it consistently for training and inference.</p>

<div class="callout warn"><strong>Warning:</strong> Log the exact feature values used at prediction time. When you later build training data from production traffic, reusing those logged features (sometimes called "log and wait") avoids recomputing them differently and is one of the most effective ways to prevent skew.</div>
`,
          keyPoints: [
            "Production systems run many models, models decay without updates, they should be updated often, and scale matters for most engineers.",
            "Batch prediction precomputes and stores predictions: high throughput, but stale and limited to enumerable inputs.",
            "Online prediction computes on request: fresh and handles any input, but needs low-latency models and features.",
            "Three modes: batch prediction, online prediction with batch features, and streaming prediction with streaming features.",
            "Separate batch and streaming feature code paths cause train-serving skew; use one feature definition for both.",
            "Log prediction-time features and include the model version in every response."
          ],
          exercise: {
            prompt: String.raw`<p>For each product, choose batch prediction, online prediction with batch features, or streaming prediction, and justify your choice in 2 to 3 sentences:</p>
<ol>
  <li>A weekly "you might like" email for an online bookstore.</li>
  <li>Card fraud detection at checkout.</li>
  <li>Autocomplete in a search box.</li>
  <li>A daily demand forecast per store for a grocery chain's replenishment system.</li>
</ol>
<p>Then write a test in Python that guards against train-serving skew: given a batch feature function that works on a DataFrame and an online function that works on one dict, assert both produce the same values on a sample of records.</p>`,
            solution: String.raw`<ol>
  <li><strong>Batch prediction.</strong> The email is sent weekly, so predictions computed the night before are fresh enough, and throughput-optimized cheap compute can score all users at once.</li>
  <li><strong>Streaming prediction.</strong> The transaction has not happened before, so it cannot be precomputed, and the most predictive signals are recent activity (transactions in the last minutes, new device, location change), which are streaming features combined with batch profile features. Latency must be well under a second.</li>
  <li><strong>Online prediction with batch features</strong> (and often streaming session features). The prefix is unknown until typed, so predictions must be computed on demand within tens of milliseconds; precomputed query popularity and user embeddings are looked up. Using the current session's recent queries makes it streaming.</li>
  <li><strong>Batch prediction.</strong> Replenishment orders are placed daily; a nightly batch job using the day's sales is sufficient and cheap.</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

def batch_features(df):
    return pd.DataFrame({"amount_log": np.log1p(df["amount"]),
                         "is_weekend": df["weekday"].isin([5, 6]).astype(int)})

def online_features(record):
    return {"amount_log": float(np.log1p(record["amount"])),
            "is_weekend": int(record["weekday"] in (5, 6))}

def test_no_skew(n=1_000, seed=0):
    rng = np.random.default_rng(seed)
    sample = pd.DataFrame({"amount": rng.exponential(50, n), "weekday": rng.integers(0, 7, n)})
    batch = batch_features(sample)
    for i, record in enumerate(sample.to_dict("records")):
        online = online_features(record)
        for name, value in online.items():
            assert np.isclose(batch[name].iloc[i], value), f"skew in {name} for record {i}"
    return "no skew on %d records" % n

print(test_no_skew())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">no skew on 1000 records</code></pre>
<p>Run this test in CI whenever either feature path changes. Better still, refactor so both paths call the same function, and keep the test as a guard.</p>`
          },
          quiz: [
            { q: "Which is a limitation of batch prediction?", options: ["It cannot use cheap compute", "It cannot produce predictions for inputs that were not known in advance, such as a brand-new search query", "It always has lower throughput than online prediction", "It needs GPUs"], answer: 1, explain: "Batch prediction only covers inputs you could enumerate and precompute; new inputs need online prediction." },
            { q: "A fraud model uses the user's profile plus their transactions in the last 10 minutes. What prediction mode is this?", options: ["Batch prediction", "Online prediction with batch features only", "Streaming prediction", "Offline evaluation"], answer: 2, explain: "Combining batch features with streaming features computed from recent events is streaming prediction." },
            { q: "What is train-serving skew?", options: ["Training on more data than serving", "A difference between the feature values or data a model sees in production and what it saw in training", "Serving a model on different hardware", "Class imbalance in serving"], answer: 1, explain: "Skew happens when features are computed differently (or data differs) at serving time compared with training, silently degrading the model." },
            { q: "Which statement about ML deployment is TRUE?", options: ["Model performance stays constant if you do nothing", "Companies typically deploy only one or two models", "Models should be updated as often as is practical, because they decay", "Scale is never a concern"], answer: 2, explain: "The other three are common myths. Models decay as data changes, so frequent updates are valuable." }
          ]
        },
        {
          id: "mlsys-model-compression",
          title: "Model Compression and Serving on the Cloud vs. the Edge",
          minutes: 50,
          objectives: [
            "Explain and demonstrate low-rank factorization, knowledge distillation, pruning and quantization",
            "Choose compression techniques based on accuracy, size and latency trade-offs",
            "Compare cloud and edge deployment on cost, latency, privacy and connectivity",
            "Describe the role of model compilers and intermediate representations"
          ],
          body: String.raw`
<p>Online prediction needs fast models, and edge devices (phones, cameras, cars, browsers) need small ones. There are three ways to make inference faster: make the model do inference faster (inference optimization), make the model smaller (compression), or make the hardware faster. This lesson focuses on compression and on the decision of where models should run.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 7, sections "Model Compression", "ML on the Cloud and on the Edge" and "Compiling and Optimizing Models for Edge Devices".</div>

<h3>1. Low-rank factorization</h3>
<p>The idea: replace large, high-dimensional tensors with products of smaller ones. A dense 512 x 512 weight matrix has 262,144 parameters. If it is (approximately) low-rank, it can be written as a 512 x 16 matrix times a 16 x 512 matrix: only 16,384 parameters, and computing <code>U @ (V @ x)</code> takes far fewer multiplications. In convolutional networks the same idea gives <em>compact convolutional filters</em>: architectures like MobileNet replace a standard convolution with a depthwise convolution followed by a 1x1 convolution, cutting parameters dramatically. Low-rank designs are effective but tend to be specific to certain model types and require architectural knowledge.</p>

<h3>2. Knowledge distillation</h3>
<p>A small model (the <em>student</em>) is trained to mimic a large model or ensemble (the <em>teacher</em>). Instead of learning only from hard labels (0 or 1), the student learns from the teacher's soft probabilities, which carry more information ("this example is 60% likely positive" says it is ambiguous). A well-known example is DistilBERT, which is about 40% smaller and 60% faster than BERT while keeping about 97% of its language understanding performance. Distillation works regardless of architecture differences between teacher and student, but you need a teacher in the first place.</p>

<h3>3. Pruning</h3>
<p>Originally a technique for decision trees (removing branches that are not useful), pruning for neural networks means either removing entire nodes (changing the architecture) or, more commonly, finding the parameters least useful to predictions and setting them to zero. The total parameter count stays the same, but the weight matrices become <em>sparse</em>, which takes less storage and can be faster with hardware or libraries that exploit sparsity. Research has shown that large fractions of weights, sometimes over 90%, can be pruned with small accuracy loss <em>if the network is fine-tuned afterward</em>. There is debate about whether pruned architectures are themselves valuable, or whether the main value is as an architecture search method.</p>

<h3>4. Quantization</h3>
<p>The most general and most commonly used compression method. Quantization uses fewer bits to represent parameters: by default, weights are 32-bit floats; storing them as 16-bit floats halves memory, and 8-bit integers quarter it. Lower precision also speeds up computation (more numbers fit in memory, and integer arithmetic is faster), and many hardware accelerators are built for low-precision math. The trade-offs: fewer bits mean a smaller range of representable values, so rounding and scaling errors can hurt accuracy, and the quantization must handle outliers carefully.</p>
<ul>
  <li><strong>Post-training quantization</strong>: quantize a trained model. Simple and widely supported.</li>
  <li><strong>Quantization-aware training</strong>: simulate low precision during training so the model learns to cope with it. Better accuracy at very low precision.</li>
  <li><strong>Mixed-precision training</strong>: train with 16-bit numbers where safe and 32-bit where needed, to save memory and time.</li>
</ul>

<h3>The four techniques on a single layer</h3>
<p>The simulation below applies low-rank factorization, magnitude pruning and int8 quantization to a dense layer, and measures how much the layer's output changes:</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
# A trained dense layer is often close to low-rank: simulate W = A @ B + small noise
W = rng.normal(size=(512, 16)) @ rng.normal(size=(16, 512)) + 0.1 * rng.normal(size=(512, 512))
x = rng.normal(size=512)
y_ref = W @ x
rel_err = lambda y: np.linalg.norm(y - y_ref) / np.linalg.norm(y_ref)

# 1) Low-rank factorization via SVD: W (512x512) ~ U_k (512xk) @ V_k (kx512)
U, S, Vt = np.linalg.svd(W, full_matrices=False)
k = 16
U_k, V_k = U[:, :k] * S[:k], Vt[:k]
print(f"low-rank k={k}: params {W.size:,} -&gt; {U_k.size + V_k.size:,}, output error {rel_err(U_k @ (V_k @ x)):.3%}")

# 2) Magnitude pruning: zero out the fraction of weights with the smallest |w|
for frac in (0.3, 0.5, 0.8):
    threshold = np.quantile(np.abs(W), frac)
    W_pruned = np.where(np.abs(W) &gt;= threshold, W, 0.0)
    print(f"pruning {frac:.0%}  : nonzero {np.count_nonzero(W_pruned):,}, output error {rel_err(W_pruned @ x):.3%} (before fine-tuning)")

# 3) Post-training quantization: float32 -&gt; int8 with a per-tensor scale
W32 = W.astype(np.float32)
scale = np.abs(W32).max() / 127
W_int8 = np.round(W32 / scale).astype(np.int8)
W_deq = W_int8.astype(np.float32) * scale
print(f"int8 quantize: {W32.nbytes/1024:.0f} KB -&gt; {W_int8.nbytes/1024:.0f} KB, output error {rel_err(W_deq @ x):.3%}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">low-rank k=16: params 262,144 -&gt; 16,384, output error 2.970%
pruning 30%  : nonzero 183,501, output error 13.075% (before fine-tuning)
pruning 50%  : nonzero 131,072, output error 29.561% (before fine-tuning)
pruning 80%  : nonzero 52,429, output error 62.389% (before fine-tuning)
int8 quantize: 1024 KB -&gt; 256 KB, output error 1.655%</code></pre>
<p>Because this layer really is close to low-rank, keeping 16 components cuts parameters by 16x with about 3% output error. Int8 quantization cuts memory 4x with under 2% error and no retraining. Pruning without fine-tuning hurts quickly here (13% error at 30% sparsity) because this layer has no small, useless weights to remove; in trained networks many weights are near zero, and pruning is always followed by fine-tuning to recover accuracy. The general lesson: always measure the accuracy impact of compression on your own model and data, including on important slices, because compression can hurt rare classes disproportionately.</p>
<p>And knowledge distillation, with a 300-tree random forest as the teacher and a single shallow tree as the student:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor

X, y = make_classification(n_samples=4_000, n_features=20, n_informative=10, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=0)

teacher = RandomForestClassifier(n_estimators=300, random_state=0).fit(X_tr, y_tr)
n_nodes = sum(t.tree_.node_count for t in teacher.estimators_)
print(f"teacher: 300 trees, {n_nodes:,} nodes   accuracy {teacher.score(X_te, y_te):.3f}")

# Student trained directly on the hard 0/1 labels
plain = DecisionTreeClassifier(max_depth=6, random_state=0).fit(X_tr, y_tr)
print(f"student on hard labels, {plain.tree_.node_count} nodes   accuracy {plain.score(X_te, y_te):.3f}")

# Distillation: the student imitates the teacher's SOFT probabilities, on a larger
# "transfer set" (jittered copies of the training inputs -- no new labels needed)
rng = np.random.default_rng(0)
X_transfer = np.vstack([X_tr + rng.normal(0, 0.3, X_tr.shape) for _ in range(10)])
soft_targets = teacher.predict_proba(X_transfer)[:, 1]
student = DecisionTreeRegressor(max_depth=6, random_state=0).fit(X_transfer, soft_targets)
acc = ((student.predict(X_te) &gt;= 0.5) == y_te).mean()
print(f"distilled student, {student.tree_.node_count} nodes    accuracy {acc:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">teacher: 300 trees, 124,764 nodes   accuracy 0.908
student on hard labels, 91 nodes   accuracy 0.774
distilled student, 125 nodes    accuracy 0.812</code></pre>
<p>The distilled student has about 1,000 times fewer nodes than the teacher. It is less accurate than the teacher, but it beats the same-size tree trained directly on hard labels by nearly 4 points, because it learns from the teacher's soft probabilities on a larger transfer set. In a real system you would choose the student size based on the latency budget.</p>

<h3>ML on the cloud and on the edge</h3>
<p>Where should the model's computation happen? On the <strong>cloud</strong> (your servers or a cloud provider's), or on the <strong>edge</strong> (the consumer's device: phone, laptop, smartwatch, car, browser)?</p>
<table>
  <thead><tr><th></th><th>Cloud</th><th>Edge</th></tr></thead>
  <tbody>
    <tr><td>Setup</td><td>Easiest: managed services, any model size</td><td>Model must fit the device's memory, compute and battery</td></tr>
    <tr><td>Cost</td><td>You pay for every prediction; cloud bills grow with traffic</td><td>Users' hardware does the work; much cheaper for you at scale</td></tr>
    <tr><td>Connectivity</td><td>Requires a network connection</td><td>Works offline (rural areas, airplanes, factories)</td></tr>
    <tr><td>Latency</td><td>Includes network round trips</td><td>No network latency; great for real-time video or audio</td></tr>
    <tr><td>Privacy</td><td>User data leaves the device</td><td>Sensitive data (voice, photos, health) can stay on device</td></tr>
    <tr><td>Updates</td><td>Instant: redeploy the server</td><td>Slower: devices update apps on their own schedule</td></tr>
  </tbody>
</table>
<p>Edge deployment is exactly why compression matters: a model must be small and efficient enough to run on modest hardware. Many products use a hybrid: a small model runs on the device for instant, private, offline predictions, and harder cases go to a larger cloud model.</p>

<h3>Compiling and optimizing models for devices</h3>
<p>A model written in a framework (PyTorch, TensorFlow) must run on a variety of hardware (CPUs, GPUs, TPUs, mobile chips, browsers). Supporting every framework on every chip directly would be enormous work. Instead, <strong>compilers</strong> translate a model into an <strong>intermediate representation</strong> (IR), a hardware-agnostic computation graph, and then lower it to machine code for a specific target. Formats and tools like ONNX (a common exchange format), TensorRT, TVM and others play this role. Compilers also optimize: they fuse operations (combining several small steps into one kernel to avoid memory round trips), choose efficient memory layouts, and tune kernels for the target hardware. ML can even be used to search for the best low-level schedule on a given chip. In browsers, WebAssembly lets compiled models run client-side.</p>

<div class="callout info"><strong>Scenario:</strong> A note-taking app adds on-device speech-to-text. The cloud model is 1.5 GB and too slow on phones. The team distills it into a 300 MB student, quantizes it to int8 (about 75 MB), and compiles it for the phone's neural accelerator. Accuracy drops 1.2 points overall but 4 points on heavily accented speech, so they keep a cloud fallback for low-confidence transcripts. The result: instant transcription, works offline, and audio never leaves the device unless the user opts in.</div>
`,
          keyPoints: [
            "Low-rank factorization replaces large tensors with products of smaller ones; compact filters (e.g. MobileNet) apply this to convolutions.",
            "Knowledge distillation trains a small student to mimic a teacher's soft probabilities.",
            "Pruning zeroes out unimportant weights; it needs fine-tuning to recover accuracy.",
            "Quantization (fp16, int8) is the most common compression: smaller, faster, with some precision loss; post-training or quantization-aware.",
            "Measure compression's accuracy impact on slices too; rare classes can suffer disproportionately.",
            "Edge deployment cuts cost and latency and improves privacy and offline use, but needs small models and compilers for each target."
          ],
          exercise: {
            prompt: String.raw`<p>Your image classifier is a 200 MB float32 model with 92% accuracy and 180 ms latency on a mid-range phone. The product needs under 50 MB and under 60 ms, with at most 1.5 points of accuracy loss.</p>
<ol>
  <li>Propose a compression plan, in order, with the expected effect of each step and how you would validate it.</li>
  <li>Implement symmetric int8 quantization with a <em>per-row</em> scale (one scale per output row) for a weight matrix, and compare its error with a single per-tensor scale on a matrix whose rows have very different magnitudes.</li>
</ol>`,
            solution: String.raw`<ol>
  <li><strong>Plan.</strong> (a) Post-training int8 quantization: 200 MB to about 50 MB and often a 2x to 4x speedup on mobile accelerators; check accuracy overall and per class. (b) If accuracy drops too much, switch to quantization-aware training. (c) If still too slow or large, distill into a smaller architecture with compact filters (a MobileNet-style student), then quantize the student. (d) Compile for the target phone chip (fused operations, accelerator kernels). Validate each step on the held-out test set, important slices (low light, rare classes), and real on-device latency measured at p50 and p95, not just on a laptop.</li>
  <li>Per-row scales handle rows with very different magnitudes much better:</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
# rows with very different magnitudes (common in real layers)
W = rng.normal(size=(64, 256)) * np.logspace(-2, 1, 64)[:, None]

def quantize(W, axis=None):
    scale = np.abs(W).max(axis=axis, keepdims=axis is not None) / 127
    q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
    return q.astype(np.float32) * scale

for label, axis in [("per-tensor scale", None), ("per-row scale   ", 1)]:
    W_hat = quantize(W, axis)
    rel = np.linalg.norm(W - W_hat, axis=1) / np.linalg.norm(W, axis=1)
    print(f"{label}: mean relative row error {rel.mean():.3%}, worst row {rel.max():.1%}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">per-tensor scale: mean relative row error 43.751%, worst row 100.0%
per-row scale   : mean relative row error 0.689%, worst row 0.9%</code></pre>
<p>With one scale for the whole tensor, small-magnitude rows get rounded mostly to zero, because the scale is set by the largest values. Per-row (per-channel) scales give every row its own range, which is why production quantization toolkits default to per-channel scales for weights.</p>`
          },
          quiz: [
            { q: "Which compression technique trains a small model to mimic the soft outputs of a larger one?", options: ["Quantization", "Pruning", "Knowledge distillation", "Low-rank factorization"], answer: 2, explain: "Distillation trains a student model on a teacher's (soft) predictions." },
            { q: "Converting float32 weights to int8 reduces weight memory by about how much?", options: ["2x", "4x", "8x", "32x"], answer: 1, explain: "32 bits to 8 bits is a factor of 4." },
            { q: "What does pruning usually need in order to keep accuracy high?", options: ["Fine-tuning after pruning", "A bigger batch size at inference", "More features", "A cloud deployment"], answer: 0, explain: "Removing weights perturbs the network; fine-tuning lets the remaining weights compensate." },
            { q: "Which is an advantage of edge deployment over cloud deployment?", options: ["Unlimited model size", "Works without network connectivity and keeps sensitive data on the device", "Instant model updates for all users", "No need to compress models"], answer: 1, explain: "Edge models run locally: offline, low network latency, better privacy. But they must be small, and updates roll out more slowly." },
            { q: "What is the role of an intermediate representation (IR) in model compilers?", options: ["It stores training data", "It is a hardware-agnostic computation graph that can be optimized and lowered to many hardware targets", "It replaces the loss function", "It is a type of data augmentation"], answer: 1, explain: "Compilers translate framework models to an IR, optimize it, and generate code for each target, so each framework need not support each chip directly." }
          ]
        }
      ]
    },
    {
      id: "mlsys-ops",
      title: "Operating ML in Production: Failures, Drift, Monitoring and Continual Learning",
      summary: "Why deployed models fail, how to detect distribution shifts statistically, what to monitor and alert on, how and how often to retrain, and how to test new models safely on live traffic.",
      lessons: [
        {
          id: "mlsys-ops-failures",
          title: "Why ML Systems Fail: Software Failures, Edge Cases, Feedback Loops and Shifts",
          minutes: 50,
          objectives: [
            "Distinguish software system failures from ML-specific failures",
            "Explain edge cases versus outliers and why they matter for safety-critical systems",
            "Recognize, detect and correct degenerate feedback loops",
            "Define covariate shift, label shift, concept drift, feature change and label schema change"
          ],
          body: String.raw`
<p>Your model passed every offline test and launched to applause. Three months later, a product manager asks why conversions from recommendations have quietly dropped 8%. Nothing crashed. No error was logged. Welcome to the most common production experience in ML: things go wrong silently. This lesson catalogs <em>how</em> ML systems fail, so the next lessons can cover how to detect and fix it.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 8, "Data Distribution Shifts and Monitoring" (causes of ML system failures and data distribution shifts).</div>

<p>A <strong>failure</strong> happens when one or more expectations of the system is violated. Traditional software has mostly <em>operational</em> expectations: it runs, it responds within the latency budget, it is available. ML systems also have <em>ML performance</em> expectations: the predictions should be accurate enough. Operational failures are easy to notice (timeouts, error pages); ML performance failures often are not.</p>

<h3>Software system failures</h3>
<p>Many ML system failures are not about ML at all:</p>
<ul>
  <li><strong>Dependency failure</strong>: a package or service your system relies on breaks, often maintained by a third party.</li>
  <li><strong>Deployment failure</strong>: you deploy the binaries of an old model version by mistake, or the service lacks permission to read the model file.</li>
  <li><strong>Hardware failure</strong>: CPUs or GPUs overheat or fail.</li>
  <li><strong>Downtime or crashing</strong>: a server or cloud service your system needs goes down.</li>
</ul>
<p>A review of 96 incidents in a large ML pipeline at Google, spanning 15 years, found that about 60 of them had causes not directly related to ML: mostly distributed-systems problems (a scheduler or orchestrator making a mistake) and data-pipeline problems (data from multiple sources joined incorrectly, wrong data structures). The lesson: <strong>ML engineering is mostly engineering</strong>. Solid software practices (testing, deployment automation, monitoring, on-call) prevent the majority of incidents.</p>

<h3>ML-specific failures</h3>
<p>These come from the data, the model or the interaction between them: data collection and processing problems, poor hyperparameters, train-serving skew, distribution shifts, edge cases, and degenerate feedback loops. They are rarer than software failures but harder to detect and fix, and can make the system useless.</p>

<h4>Production data differing from training data</h4>
<p>Supervised learning assumes training data and production data come from the same distribution. That assumption is almost always broken, for two reasons. First, real-world data is <em>infinite and changing</em>, while training data is a finite sample constrained by the time, compute and people used to build it, and by sampling biases. Second, the world changes: user preferences, seasons, competitors, prices, new products, viral trends. A model that captures the world as it was is gradually wrong about the world as it is. This divergence, when it happens after deployment, is called <strong>data distribution shift</strong>. Note that many apparent "shifts" are actually bugs: a pipeline change that sends a feature in new units, a broken upstream service, a new app version with a different default.</p>

<h4>Edge cases</h4>
<p>An <strong>edge case</strong> is an input so extreme or unusual that it causes the model to make a catastrophic mistake. For a self-driving car, recognizing 99.99% of situations correctly is not enough if the remaining 0.01% includes a pedestrian in an unusual position. Edge cases are different from <strong>outliers</strong>: an outlier is a data point that differs significantly from others; an edge case is an example on which the model <em>performs</em> badly. An outlier can be handled fine by the model, and an edge case can look perfectly ordinary. Removing outliers during training may improve average performance but be fatal in production if those outliers are exactly the hard cases you must handle; in production you often cannot simply ignore unusual inputs.</p>

<h4>Degenerate feedback loops</h4>
<p>A <strong>feedback loop</strong> is the cycle from prediction to user action to new training data. It becomes <strong>degenerate</strong> when the model's predictions influence the feedback, which is then used to train the next model, amplifying the original bias. Classic example: a song recommender shows the currently popular songs; they get clicks because they are shown, which makes them look even more popular, so they get shown even more. Songs that were never shown can never prove they are good. This is called <em>popularity bias</em>, and similar loops occur in search ranking, resume screening (the model prefers profiles similar to those hired before, who are then the only ones evaluated), and predictive policing (more patrols in an area produce more recorded incidents there).</p>
<pre><code class="lang-python runnable">import numpy as np

def simulate(explore_rate, rank_by, n_songs=50, n_rounds=20_000, seed=0):
    rng = np.random.default_rng(seed)
    true_appeal = rng.uniform(0.02, 0.10, n_songs)      # real chance a listener clicks
    clicks = rng.integers(0, 3, n_songs).astype(float)  # tiny, noisy launch-day history
    shows = np.full(n_songs, 3.0)
    for _ in range(n_rounds):
        if rng.random() &lt; explore_rate:                 # sometimes show 5 random songs
            shown = rng.choice(n_songs, size=5, replace=False)
        else:
            score = clicks if rank_by == "popularity" else clicks / shows
            shown = np.argsort(-score)[:5]
        shows[shown] += 1
        clicks[shown] += rng.random(5) &lt; true_appeal[shown]
    best5 = set(np.argsort(-true_appeal)[:5])
    chosen = set(np.argsort(-(clicks if rank_by == "popularity" else clicks / shows))[:5])
    return (f"songs never shown: {int((shows == 3).sum()):2d} | "
            f"truly-best songs in top-5: {len(best5 &amp; chosen)} of 5")

print("popularity, no exploration :", simulate(0.0, "popularity"))
print("CTR, 10% exploration       :", simulate(0.1, "ctr"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">popularity, no exploration : songs never shown: 44 | truly-best songs in top-5: 1 of 5
CTR, 10% exploration       : songs never shown:  0 | truly-best songs in top-5: 4 of 5</code></pre>
<p>Ranking purely by popularity locks in whatever happened on launch day: 44 of 50 songs are never shown, and the final top 5 contains only one of the truly best songs. With 10% random exploration and ranking by click-through rate (clicks divided by impressions, which corrects for exposure), every song gets a chance and four of the five best songs rise to the top. Exploration costs a little short-term engagement (some random songs are worse), which is the classic exploration-exploitation trade-off.</p>
<p><strong>Detecting</strong> degenerate loops is hard offline because they arise from user interactions. For recommenders, measure the <em>popularity diversity</em> of outputs (aggregate diversity, coverage of long-tail items), or compute <em>hit rate by popularity bucket</em>: if the system is much more accurate on popular items than unpopular ones, it likely suffers from popularity bias. In production, outputs that become more homogeneous over time are a warning sign.</p>
<p><strong>Correcting</strong> them:</p>
<ul>
  <li><strong>Randomization</strong>: show some random items to gather unbiased feedback. Short-video platforms give each new video a small initial pool of random impressions to measure its quality before deciding whether to show it to more people. Smarter exploration (bandits, covered later) reduces the user-experience cost.</li>
  <li><strong>Positional features</strong>: users click the top result more just because it is on top. Add the display position as a feature during training (e.g. "was shown in position 1"), so the model learns how much of a click is due to position. At inference, set the position feature to the same value (e.g. "not first") for all candidates, so items are compared fairly. A more refined version trains one model for "probability the user sees the item at this position" and another for "probability of a click given it was seen".</li>
</ul>

<h3>Types of data distribution shift</h3>
<p>Write the input as X and the output as Y. A model learns P(Y | X), and the joint distribution can be written P(X, Y) = P(Y | X) P(X) = P(X | Y) P(Y). The source distribution is the training data; the target distribution is production. Three classic types:</p>
<table>
  <thead><tr><th>Shift</th><th>What changes</th><th>What stays</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Covariate shift</td><td>P(X), the input distribution</td><td>P(Y | X)</td><td>A breast-cancer model trained mostly on patients over 40 is used in a clinic with many younger patients; the age-risk relationship is unchanged, but the mix of ages is different</td></tr>
    <tr><td>Label shift (prior shift)</td><td>P(Y), the output distribution</td><td>P(X | Y)</td><td>A preventive drug lowers cancer rates; patients who do have cancer still look the same (same X given Y), but positives are rarer overall</td></tr>
    <tr><td>Concept drift (posterior shift)</td><td>P(Y | X), the relationship itself</td><td>P(X)</td><td>A 3-bedroom apartment in the same city costs very different amounts before and after a pandemic: same features, different price</td></tr>
  </tbody>
</table>
<p>Covariate shift is common in practice and can come from sampling biases during data collection, from deliberate changes to training data (oversampling a rare class), from the model's own learning process (active learning picks unusual examples), and from real changes in the environment (a marketing campaign in a new region brings different users). Concept drift is often <em>cyclic or seasonal</em> (ride prices on weekdays vs weekends), so companies sometimes keep separate models for different seasons.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(0)
def make(n, mean_age, rule_shift=0.0):
    age = rng.normal(mean_age, 8, n)
    # P(buys retirement plan | age): logistic in age; rule_shift moves the decision boundary
    p = 1 / (1 + np.exp(-(age - 45 - rule_shift) / 4))
    return age.reshape(-1, 1), (rng.random(n) &lt; p).astype(int)

X_train, y_train = make(5_000, mean_age=40)
model = LogisticRegression().fit(X_train, y_train)

scenarios = {
    "no shift (same as training)": make(5_000, 40),
    "covariate shift: P(X) changes": make(5_000, 55),          # older users arrive
    "concept drift: P(Y|X) changes": make(5_000, 40, rule_shift=10),  # same ages, new behavior
}
for name, (X, y) in scenarios.items():
    print(f"{name:32s} mean age {X.mean():5.1f} | positive rate {y.mean():.2f} | accuracy {model.score(X, y):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">no shift (same as training)      mean age  40.1 | positive rate 0.32 | accuracy 0.814
covariate shift: P(X) changes    mean age  55.0 | positive rate 0.83 | accuracy 0.875
concept drift: P(Y|X) changes    mean age  40.1 | positive rate 0.07 | accuracy 0.772</code></pre>
<p>Two surprises worth noting. The covariate shift actually <em>raised</em> accuracy here, because older users are easier for this model to classify (their probability of buying is near 1). Covariate shift does not always hurt; it hurts when the model is weak in the newly common region of input space. Also, the covariate shift changed the positive rate too: in reality different shift types often occur together. The concept drift hurt accuracy even though the inputs look identical, which is exactly why monitoring only input distributions can miss problems.</p>

<h3>General data changes</h3>
<ul>
  <li><strong>Feature change</strong>: features are added or removed, or the set of possible values changes. A feature switched from years to months, or a pipeline bug turns a feature into NaNs.</li>
  <li><strong>Label schema change</strong>: the set of possible labels changes. A credit score range moves from 300 to 850 to a new 250 to 900 scale; a sentiment model's NEGATIVE class is split into SAD and ANGRY because marketing cares about angry customers. When the number of classes changes, you may need to relabel data and retrain from scratch. This is especially common in high-cardinality tasks such as product categorization.</li>
</ul>
`,
          keyPoints: [
            "Most ML incidents are software and data-pipeline failures; ML engineering is mostly engineering.",
            "ML-specific failures (shifts, edge cases, feedback loops) are rarer but often silent and harder to fix.",
            "An edge case is an input where the model performs badly; an outlier is just an unusual input. They are not the same.",
            "Degenerate feedback loops amplify bias (e.g. popularity bias); detect via diversity and hit rate by popularity, correct with randomization and positional features.",
            "Covariate shift changes P(X), label shift changes P(Y), concept drift changes P(Y|X); several can happen at once.",
            "Feature changes and label schema changes are also common and many 'shifts' are really pipeline bugs."
          ],
          exercise: {
            prompt: String.raw`<p>For each situation, name the failure type (software failure, edge case, degenerate feedback loop, covariate shift, label shift, concept drift, feature change, label schema change) and suggest a mitigation:</p>
<ol>
  <li>A job-matching site's model recommends mostly candidates from five universities; recruiters only contact recommended candidates, and the model is retrained on who was contacted.</li>
  <li>After a competitor launches, the same customers with the same usage patterns start churning at twice the rate.</li>
  <li>A mobile app update starts sending <code>screen_time</code> in seconds instead of minutes.</li>
  <li>A content moderation model is asked to add a new "self-harm" category.</li>
  <li>A ride-hailing ETA model is launched in a new city whose trips are much longer on average; the relationship between distance, traffic and duration is similar.</li>
  <li>The prediction service fails for 20 minutes because the cloud region hosting the feature store is down.</li>
</ol>`,
            solution: String.raw`<ol>
  <li><strong>Degenerate feedback loop</strong> (popularity/selection bias). Mitigate with exploration (show a random or diversified slice of candidates), positional features, monitoring the diversity of recommended universities, and training on outcomes that are not only from model-selected candidates.</li>
  <li><strong>Concept drift</strong>: P(churn | features) changed while the features did not. Mitigate by retraining on recent labeled data, adding features that capture the competitive context (e.g. price comparisons), and monitoring prediction accuracy as labels arrive.</li>
  <li><strong>Feature change</strong> (really a pipeline bug). Mitigate with feature validation (expected range of <code>screen_time</code>), schema contracts with the app team, and alerts on feature distribution shifts.</li>
  <li><strong>Label schema change</strong>. Requires new labeling guidelines, labeled data for the new class, possibly a new output layer and retraining; version the label schema.</li>
  <li><strong>Covariate shift</strong>: P(X) changed (longer trips), P(Y | X) similar. Check model performance in the long-trip region, add training data from that range or from the new city, and monitor errors by trip-length slice.</li>
  <li><strong>Software system failure</strong> (downtime of a dependency). Mitigate with multi-region redundancy, caching, timeouts and a fallback (e.g. a simple heuristic ETA when features are unavailable).</li>
</ol>`
          },
          quiz: [
            { q: "In the study of 96 incidents in a large ML pipeline, what caused the majority?", options: ["Overfitting", "Problems not directly related to ML, such as distributed systems and data pipelines", "Bad hyperparameters", "Too little training data"], answer: 1, explain: "About 60 of 96 had non-ML causes, which is why solid software engineering practice matters so much for ML systems." },
            { q: "House prices in a city jump after a policy change, for houses with the exact same features. Which shift is this?", options: ["Covariate shift", "Label shift", "Concept drift", "Feature change"], answer: 2, explain: "The relationship between features and target, P(Y|X), changed: concept drift." },
            { q: "What is the difference between an outlier and an edge case?", options: ["They are the same", "An outlier is an unusual input; an edge case is an input on which the model performs badly", "Edge cases only happen in training", "Outliers are always errors"], answer: 1, explain: "Outliers are defined by the data; edge cases by the model's performance. An ordinary-looking input can be an edge case." },
            { q: "Which technique helps correct a degenerate feedback loop in a recommender?", options: ["Removing all randomness", "Adding exploration (randomization) and positional features", "Training only on the most popular items", "Increasing the learning rate"], answer: 1, explain: "Randomization gathers unbiased feedback on items that would never be shown, and positional features separate position effects from item quality." },
            { q: "A sentiment model's NEGATIVE class is split into SAD and ANGRY. What is this?", options: ["Label schema change", "Covariate shift", "Edge case", "Dependency failure"], answer: 0, explain: "The set of possible labels changed, which usually requires relabeling and retraining." }
          ]
        },
        {
          id: "mlsys-ops-drift-detection",
          title: "Detecting and Addressing Distribution Shifts (KS Test and PSI)",
          minutes: 55,
          objectives: [
            "Detect shifts by monitoring accuracy-related metrics and, when labels are delayed, input and prediction distributions",
            "Implement the two-sample Kolmogorov-Smirnov test and the Population Stability Index in Python",
            "Choose time windows for detection and understand cumulative versus sliding statistics",
            "Address shifts by retraining and by designing features that are robust to change"
          ],
          body: String.raw`
<p>Data distribution shifts only matter if they hurt your model. The most direct way to know is to monitor the model's <strong>accuracy-related metrics</strong> (accuracy, F1, MAE, click-through rate) in production. But ground-truth labels are often delayed or never arrive: fraud labels take weeks, loan defaults take months. When labels are not available fast enough, you monitor what you <em>can</em> see right away: the distributions of inputs P(X), and of predictions. This lesson builds the statistical tools for that.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 8, sections "Detecting Data Distribution Shifts" and "Addressing Data Distribution Shifts".</div>

<figure><img src="assets/diagrams/monitoring-drift.svg" alt="Production traffic flows to model serving, then monitoring; if drift is detected, retrain and redeploy, otherwise keep serving"><figcaption>Monitoring compares production data with a reference; detected drift can trigger retraining.</figcaption></figure>

<h3>Statistical methods</h3>
<p>The simplest approach is to compare <strong>summary statistics</strong> of a feature between the training data (the <em>reference</em> or source) and a recent production window (the <em>target</em>): minimum, maximum, mean, median, variance, quantiles, skewness, the fraction of missing values. If the mean of <code>order_value</code> was 22 in training and is 31 this week, something changed. Summary statistics are cheap and easy to explain, but different distributions can share the same mean and variance, so they are necessary but not sufficient.</p>
<p>A more principled approach is a <strong>two-sample hypothesis test</strong>: does the data from two windows come from the same distribution? If the test says the difference is statistically significant, the probability that it arose by random sampling is low. Two caveats:</p>
<ul>
  <li><strong>Statistically significant does not mean practically important.</strong> With millions of samples, a test detects tiny differences that have no effect on the model. Conversely, a shift detectable only with large samples is probably not worth worrying about.</li>
  <li>Most tests work better on <strong>low-dimensional</strong> data. With hundreds of features, test each feature (and the predictions), or first reduce dimensionality.</li>
</ul>

<h4>The Kolmogorov-Smirnov (KS) test</h4>
<p>The two-sample KS test compares the <em>cumulative distribution functions</em> (CDFs) of two samples. The CDF at value v is the fraction of the sample that is at most v. The KS statistic is the largest vertical gap between the two empirical CDFs: 0 means identical, 1 means completely separated. It is <em>nonparametric</em> (makes no assumption about the shape of the distribution), works for one-dimensional continuous data, and gives a p-value. Its drawback is that it can be expensive on large samples and produces many false positives at scale, as you will see below.</p>

<h4>The Population Stability Index (PSI)</h4>
<p>PSI is popular in credit risk and widely used in ML monitoring. It bins the feature using the reference data (commonly into deciles), computes the fraction of each sample in each bin (e = expected/reference, a = actual/current), and sums:</p>
<p><code>PSI = sum over bins of (a - e) * ln(a / e)</code></p>
<p>Each bin contributes positively when the fractions differ, in either direction. A widely used rule of thumb: PSI below 0.1 means no significant change, 0.1 to 0.25 a moderate change worth investigating, above 0.25 a major shift. Unlike a p-value, PSI does not explode with sample size, so it measures the <em>size</em> of the shift, which is closer to what you need for alerting. A small constant (epsilon) avoids dividing by zero for empty bins.</p>

<p>Both on a food-delivery order-value feature, comparing training data against a normal week and a promotion week:</p>
<pre><code class="lang-python runnable">import numpy as np
from scipy import stats

rng = np.random.default_rng(42)
# Feature: order value at a food-delivery app. Training window vs two production weeks.
reference = rng.lognormal(mean=3.0, sigma=0.5, size=20_000)       # training data
week_ok = rng.lognormal(mean=3.0, sigma=0.5, size=5_000)          # same distribution
week_promo = rng.lognormal(mean=3.25, sigma=0.6, size=5_000)      # promo campaign: bigger orders

def psi(expected, actual, n_bins=10, eps=1e-6):
    """Population Stability Index with bins = deciles of the reference data."""
    edges = np.quantile(expected, np.linspace(0, 1, n_bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf
    e_frac = np.histogram(expected, edges)[0] / len(expected)
    a_frac = np.histogram(actual, edges)[0] / len(actual)
    e_frac, a_frac = np.clip(e_frac, eps, None), np.clip(a_frac, eps, None)
    return float(np.sum((a_frac - e_frac) * np.log(a_frac / e_frac)))

for name, current in [("normal week", week_ok), ("promo week", week_promo)]:
    ks = stats.ks_2samp(reference, current)
    value = psi(reference, current)
    verdict = "stable" if value &lt; 0.1 else ("moderate shift" if value &lt; 0.25 else "MAJOR shift")
    print(f"{name:12s} KS stat={ks.statistic:.3f} p={ks.pvalue:.3g} | PSI={value:.3f} -&gt; {verdict}")

# Warning: with huge samples, KS flags even tiny, harmless differences
big_ref = rng.normal(0, 1, 1_000_000)
big_cur = rng.normal(0.01, 1, 1_000_000)        # mean moved by 1% of a std dev
ks = stats.ks_2samp(big_ref, big_cur)
print(f"tiny shift, 1M samples: KS p-value={ks.pvalue:.2g}, PSI={psi(big_ref, big_cur):.5f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">normal week  KS stat=0.016 p=0.23 | PSI=0.002 -&gt; stable
promo week   KS stat=0.198 p=3.54e-138 | PSI=0.230 -&gt; moderate shift
tiny shift, 1M samples: KS p-value=1e-10, PSI=0.00013</code></pre>
<p>Reading the results: the normal week has KS p-value 0.23 (no evidence of a difference) and PSI 0.002 (stable). The promo week has a KS p-value that is astronomically small and PSI 0.23, a moderate-to-major shift: orders are larger and more variable. The last line demonstrates the sample-size caveat: with a million samples per side, a mean shift of 1% of a standard deviation gives a "highly significant" KS p-value, while PSI correctly reports a negligible shift (0.00013). In practice, alert on effect sizes (PSI, the KS statistic itself, or the change in a summary statistic) and use p-values with care.</p>
<p>Other tests exist: <strong>Maximum Mean Discrepancy</strong> (MMD), a kernel-based test that works on multivariate data, and variants like least-squares density difference. Open-source libraries such as Alibi Detect implement many drift detectors, and cloud monitoring services often provide them built in. For categorical features, a chi-square test or PSI over the categories works well.</p>

<h3>Time scale windows</h3>
<p>Not all shifts are equal. Sudden shifts (a new app release breaks a feature) are easier to detect than gradual ones (user tastes evolving over months). Choosing the window matters:</p>
<ul>
  <li>Shifts happen across two dimensions: <strong>spatial</strong> (across access points, such as a new group of users, a new app version, a new country) and <strong>temporal</strong> (over time). For temporal shifts, treat the input as a time series.</li>
  <li><strong>Short windows</strong> detect shifts faster but produce more false alarms from normal noise and seasonality (a "shift" every Monday morning). <strong>Long windows</strong> are stabler but slow to react. Compare like with like: this Monday with last Monday, or a 7-day window with the training window.</li>
  <li><strong>Cumulative versus sliding statistics</strong>: cumulative statistics (computed from the start of time until now) can hide a recent dip, because a short bad period barely moves a long average. Sliding statistics (computed over the last hour or day) reset with each window and show recent problems clearly.</li>
  <li>Monitoring platforms often let you merge shorter windows into longer ones (e.g. 1-hour buckets rolled up into days) so you can investigate at multiple time scales.</li>
</ul>

<h3>Addressing distribution shifts</h3>
<p>There are three broad approaches:</p>
<ol>
  <li><strong>Train on massive datasets</strong> in the hope that the training distribution is so comprehensive that production data falls within it. This dominates research on large models.</li>
  <li><strong>Adapt a trained model to the target distribution without new labels</strong> (unsupervised domain adaptation, causal correction methods). Promising in research but rarely used in industry today.</li>
  <li><strong>Retrain with labeled data from the target distribution</strong>, which is what most companies do. Two decisions: <em>stateless</em> retraining from scratch versus <em>stateful</em> fine-tuning from the last checkpoint; and <em>which data</em>: the last day, the last week, the last 6 months, or data since the shift began. Run experiments to choose (the continual learning lesson covers this).</li>
</ol>
<p>You can also design the system to be <strong>robust to shift</strong> from the start. Features shift at different rates. An app's ranking in the store changes daily and makes a highly predictive but unstable feature; bucketing the rank into "top 10, 11 to 100, 101 to 1,000, ..." is far more stable. An app's category changes rarely but is less predictive. Balance predictive power against stability. Some companies also keep separate models for different markets or seasons (one model per country, a "weekend" pricing model), so each faces a narrower, more stable distribution.</p>

<div class="callout warn"><strong>Warning:</strong> Not every detected shift requires action. Many are harmless (the model is robust to them) and many are bugs rather than real-world change. Investigate first: check whether accuracy-related metrics (when available) or prediction distributions have also moved, and whether something upstream changed.</div>
`,
          keyPoints: [
            "Monitor accuracy-related metrics when labels arrive; when they are delayed, monitor input and prediction distributions.",
            "Summary statistics are cheap but insufficient; two-sample tests compare whole distributions.",
            "The KS test compares empirical CDFs of 1D continuous data; with huge samples it flags tiny, harmless differences.",
            "PSI bins by reference quantiles and sums (a - e) * ln(a / e); under 0.1 stable, 0.1 to 0.25 moderate, over 0.25 major.",
            "Window choice trades detection speed against false alarms; sliding statistics reveal recent problems that cumulative ones hide.",
            "Address shifts by retraining (stateless or stateful, on the right data window) and by choosing features that are stable over time."
          ],
          exercise: {
            prompt: String.raw`<p>A loan model's <code>monthly_income</code> feature is monitored daily. Write a Python function <code>drift_report(reference, current)</code> that returns a dict with: the KS statistic and p-value, the PSI, the relative change in median, and a verdict: "alert" if PSI is at least 0.2 <em>or</em> the median changed by more than 15%, otherwise "ok".</p>
<p>Test it on (a) a day drawn from the same distribution as the reference, (b) a day where 30% of incomes were accidentally divided by 12 (yearly vs monthly confusion). Then explain why you would not alert on the KS p-value alone.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from scipy import stats

def psi(expected, actual, n_bins=10, eps=1e-6):
    edges = np.quantile(expected, np.linspace(0, 1, n_bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf
    e = np.clip(np.histogram(expected, edges)[0] / len(expected), eps, None)
    a = np.clip(np.histogram(actual, edges)[0] / len(actual), eps, None)
    return float(np.sum((a - e) * np.log(a / e)))

def drift_report(reference, current):
    ks = stats.ks_2samp(reference, current)
    median_change = abs(np.median(current) - np.median(reference)) / np.median(reference)
    value = psi(reference, current)
    verdict = "alert" if value &gt;= 0.2 or median_change &gt; 0.15 else "ok"
    return {"ks_stat": round(float(ks.statistic), 3), "ks_p": float(f"{ks.pvalue:.3g}"),
            "psi": round(value, 3), "median_change": round(float(median_change), 3), "verdict": verdict}

rng = np.random.default_rng(1)
reference = rng.lognormal(8.2, 0.4, 50_000)
same_day = rng.lognormal(8.2, 0.4, 3_000)
buggy_day = rng.lognormal(8.2, 0.4, 3_000)
mask = rng.random(3_000) &lt; 0.30
buggy_day[mask] /= 12

print("normal day:", drift_report(reference, same_day))
print("buggy day :", drift_report(reference, buggy_day))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">normal day: {'ks_stat': 0.01, 'ks_p': 0.932, 'psi': 0.002, 'median_change': 0.001, 'verdict': 'ok'}
buggy day : {'ks_stat': 0.307, 'ks_p': 1.66e-236, 'psi': 0.463, 'median_change': 0.194, 'verdict': 'alert'}</code></pre>
<p>The buggy day is caught by PSI and by the median change. We do not alert on the KS p-value alone because, at production volumes, it becomes "significant" for tiny, harmless differences (and the threshold for significance does not tell you whether the change matters to the model). Effect-size measures like PSI, the KS statistic itself, and the relative median change are better triggers; the p-value can be logged as supporting evidence.</p>`
          },
          quiz: [
            { q: "Labels for your fraud model arrive 60 days late. What should you monitor to detect problems sooner?", options: ["Nothing until labels arrive", "Input feature distributions and prediction distributions", "Only training loss", "Only CPU usage"], answer: 1, explain: "When accuracy-related metrics are delayed, shifts in P(X) and in predictions are the earliest available signals." },
            { q: "What does the two-sample KS statistic measure?", options: ["The difference in means", "The largest vertical distance between the two empirical CDFs", "The number of missing values", "The correlation between features"], answer: 1, explain: "KS compares cumulative distribution functions; the statistic is their maximum gap." },
            { q: "A PSI of 0.32 between training data and this week's data suggests what?", options: ["No change", "A minor change", "A major shift worth investigating", "PSI cannot exceed 0.25"], answer: 2, explain: "By the common rule of thumb, PSI over 0.25 indicates a major shift." },
            { q: "Why can a KS p-value be a poor alerting trigger at large scale?", options: ["It is too slow to compute", "With very large samples, even tiny, harmless differences become statistically significant", "It only works on categorical data", "It always returns 1"], answer: 1, explain: "Statistical significance grows with sample size, so p-values flag differences too small to matter. Effect-size measures like PSI are more practical." },
            { q: "A 2-hour outage of a feature barely changes the 90-day cumulative average. What does this illustrate?", options: ["Cumulative statistics can hide recent problems; sliding windows reveal them", "The outage did not matter", "PSI is broken", "Averages are always accurate"], answer: 0, explain: "Long cumulative windows dilute short events; sliding windows reset and expose them." }
          ]
        },
        {
          id: "mlsys-ops-monitoring",
          title: "Monitoring and Observability",
          minutes: 50,
          objectives: [
            "List the operational and ML-specific metrics worth monitoring",
            "Validate features against expectations learned from training data",
            "Use logs, dashboards and alerts effectively and avoid alert fatigue",
            "Explain the difference between monitoring and observability"
          ],
          body: String.raw`
<p>Monitoring is the act of tracking, measuring and logging metrics that help you determine when something goes wrong. Observability is setting up the system so that, when something does go wrong, you can figure out <em>what</em> and <em>why</em>. Because ML systems fail silently, they need more than the uptime checks of traditional software: they need eyes on data, features and predictions.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 8, section "Monitoring and Observability".</div>

<h3>Operational metrics</h3>
<p>Every service, ML or not, should track the health of the network, the machine and the application: latency (at percentiles), throughput, the number of requests in the last minute/hour/day, the percentage of requests that return an error (2xx vs 4xx/5xx), CPU/GPU utilization, memory, and <strong>availability</strong>. Availability is usually part of a <strong>service level objective</strong> (SLO) or agreement (SLA): "up 99.99% of the time, where 'up' means the median latency is under 200 ms and p99 under 2 s". These metrics catch software failures, which, as we saw, are the majority of incidents.</p>

<h3>ML-specific metrics</h3>
<p>There are four artifacts to monitor, ordered from closest to the business outcome (but hardest to get) to easiest to collect (but furthest from the outcome).</p>
<h4>1. Accuracy-related metrics</h4>
<p>If the system receives any user feedback, log and track it: clicks, purchases, upvotes, thumbs down, "was this helpful?", the share of autocomplete suggestions accepted, the share of recommended videos watched past 50%. Even when feedback cannot directly infer labels, it reveals changes in performance. These are the most direct signals that the model is doing its job, so collect them whenever possible.</p>
<h4>2. Predictions</h4>
<p>Predictions are the most common artifact to monitor. They are low-dimensional (often a single number or class), so they are easy to visualize and to test with simple statistics. A shift in the prediction distribution often signals a shift in inputs. Also watch for odd patterns: a binary classifier that suddenly predicts "approve" for 90% of requests, or the same prediction ten times in a row, often indicates a bug upstream.</p>
<h4>3. Features</h4>
<p>Feature monitoring is the most common practice in ML monitoring tools. Teams track how each feature changes over time, and run <strong>feature validation</strong>: checks that values meet expectations derived from the training data or from domain rules:</p>
<ul>
  <li>Min, max or median within an expected range</li>
  <li>Values match a format (a regex for phone numbers or product ids)</li>
  <li>Values belong to a predefined set (country codes)</li>
  <li>Relationships between columns hold (an end date is after the start date)</li>
  <li>The share of missing values stays below a threshold</li>
</ul>
<p>Open-source libraries such as Great Expectations and Deequ (from AWS) let you declare these expectations and run them on every batch of data. But feature monitoring has real costs. With hundreds of models and thousands of features, computing statistics for all of them is expensive. Alerts on individual features are noisy, because many feature shifts do not harm the model. Features are often computed at different points (different services, languages, schemas), so the monitoring must integrate with each. And when a feature's schema changes, monitoring rules must change too.</p>
<h4>4. Raw inputs</h4>
<p>Raw inputs (before feature processing) can reveal problems that features hide, but they come in many formats and are often owned by a data platform team, so ML teams usually monitor them less.</p>

<h3>A worked example</h3>
<p>A loan-approval service. At 14:00, an upstream app release starts sending income in thousands instead of dollars and leaves age empty for 30% of requests. The model still answers every request quickly, so operational metrics look fine. Feature validation and prediction monitoring catch it:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
# One day of prediction logs from a loan-approval service, by hour
hours = np.repeat(np.arange(24), 400)
logs = pd.DataFrame({
    "hour": hours,
    "latency_ms": rng.gamma(4, 20, len(hours)),
    "income": rng.normal(55_000, 15_000, len(hours)),
    "age": rng.integers(18, 80, len(hours)).astype(float),
    "pred_approve": rng.random(len(hours)) &lt; 0.42,
})
# Incident at 14:00: an upstream app release starts sending income in THOUSANDS
# and leaves age empty for 30% of requests
bad = logs["hour"] &gt;= 14
logs.loc[bad, "income"] = logs.loc[bad, "income"] / 1000
logs.loc[bad &amp; (rng.random(len(logs)) &lt; 0.3), "age"] = np.nan
logs.loc[bad, "pred_approve"] = rng.random(bad.sum()) &lt; 0.08   # model reacts to garbage

# Expectations learned from the training data (like Great Expectations / Deequ rules)
EXPECT = {"income_min": 5_000, "age_null_rate_max": 0.01,
          "approve_rate_range": (0.30, 0.55), "p99_latency_max_ms": 250}

hourly = logs.groupby("hour").agg(
    p99_latency=("latency_ms", lambda s: s.quantile(0.99)),
    income_below_min=("income", lambda s: (s &lt; EXPECT["income_min"]).mean()),
    age_null_rate=("age", lambda s: s.isna().mean()),
    approve_rate=("pred_approve", "mean"),
)

def alerts(row):
    out = []
    if row.p99_latency &gt; EXPECT["p99_latency_max_ms"]: out.append("latency")
    if row.income_below_min &gt; 0.05: out.append("income out of range")
    if row.age_null_rate &gt; EXPECT["age_null_rate_max"]: out.append("age nulls")
    lo, hi = EXPECT["approve_rate_range"]
    if not lo &lt;= row.approve_rate &lt;= hi: out.append("prediction distribution")
    return ", ".join(out) or "ok"

hourly["status"] = hourly.apply(alerts, axis=1)
print(hourly.loc[11:16].round(3).to_string())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">      p99_latency  income_below_min  age_null_rate  approve_rate                                                   status
hour                                                                                                                     
11        210.636             0.002          0.000         0.445                                                       ok
12        190.020             0.000          0.000         0.438                                                       ok
13        188.370             0.002          0.000         0.382                                                       ok
14        175.226             1.000          0.310         0.072  income out of range, age nulls, prediction distribution
15        195.510             1.000          0.292         0.108  income out of range, age nulls, prediction distribution
16        184.566             1.000          0.265         0.082  income out of range, age nulls, prediction distribution</code></pre>
<p>Latency (p99 around 190 ms) never moved: a classic silent failure. But the share of incomes below the training minimum jumped from about 0 to 100%, age nulls appeared, and the approval rate collapsed from about 0.42 to under 0.11. With these checks, the on-call engineer is paged within an hour and can trace the problem to the app release, instead of discovering weeks later that thousands of good applicants were rejected.</p>

<h3>The monitoring toolbox</h3>
<h4>Logs</h4>
<p>Logs record events at runtime: when a container starts, how much memory it uses, when a function is called and with what, when a prediction is made and which model version made it. A single user request in a microservice architecture can touch dozens of services, so each event should carry a request id to allow <strong>distributed tracing</strong> across services. Logs grow fast: you cannot read them manually, so you search, aggregate and analyze them (often in batch, increasingly in stream). ML is even used to detect anomalies in logs.</p>
<h4>Dashboards</h4>
<p>Numbers in logs are hard to read; dashboards make metrics visible to engineers and non-engineers alike, and help reveal relationships (latency rising with traffic). Beware <em>dashboard rot</em>: too many metrics on a dashboard become meaningless. Show the few that matter: the business-facing metric, prediction distribution, key feature health, latency and errors.</p>
<h4>Alerts</h4>
<p>When something looks wrong, an alert notifies the right people. An alert has three parts:</p>
<ol>
  <li><strong>An alert policy</strong>: the condition, for example "p99 latency above 300 ms for 3 consecutive 5-minute windows", or "approval rate outside 0.30 to 0.55 for an hour".</li>
  <li><strong>Notification channels</strong>: who is notified and how (an on-call pager, a chat channel, email).</li>
  <li><strong>A description</strong> that helps the person act: what the alert means, the affected model and dashboard links, and ideally a runbook with mitigation steps (roll back to the previous model, switch to the fallback heuristic).</li>
</ol>
<p><strong>Alert fatigue</strong> is the enemy. If alerts fire for unimportant things, people start ignoring them, including the important ones. Set conditions that matter, require persistence (several windows, not one spike), route by severity, and regularly prune alerts that nobody acts on.</p>

<h3>Observability</h3>
<p>Traditional monitoring assumes you know in advance what can go wrong and checks for it. Modern systems have too many components for that. <strong>Observability</strong> (a term from control theory) means instrumenting the system so that its internal state can be inferred from its external outputs at runtime: logs, metrics and traces collected with enough context (request id, model version, feature values, user segment) that you can answer questions you did not anticipate, such as "which requests in the last hour had low confidence and came from app version 5.2?" In ML, observability also covers <em>interpretability</em>: understanding which features drove a prediction helps explain why performance dropped.</p>
<div class="callout tip"><strong>Tip:</strong> Monitoring should not be a dashboard nobody opens. For every model, decide: the one metric that pages someone, the handful that go to a daily report, and the rest that are just logged for investigation.</div>
`,
          keyPoints: [
            "Track operational metrics (latency percentiles, throughput, errors, utilization, availability against SLOs) for every service.",
            "ML-specific monitoring covers accuracy-related metrics (user feedback), predictions, features and raw inputs.",
            "Feature validation checks ranges, formats, allowed sets, cross-column rules and missing rates; tools include Great Expectations and Deequ.",
            "Silent failures show up in feature and prediction monitors, not in latency or error rates.",
            "Alerts need a policy, notification channels and a description or runbook; avoid alert fatigue with persistence and severity.",
            "Observability means instrumenting with enough context to answer unanticipated questions, including interpretability."
          ],
          exercise: {
            prompt: String.raw`<p>Design the monitoring for a product-recommendation model on an e-commerce homepage (online prediction, about 2,000 requests/s, natural labels from clicks within 30 minutes). Specify: operational metrics, ML metrics at each of the four levels, two alerts with full policy/channel/description, and what goes on the dashboard.</p>
<p>Then implement an alert policy in Python that fires only when a metric exceeds a threshold for 3 consecutive windows, and show that it ignores isolated spikes but catches a sustained regression.</p>`,
            solution: String.raw`<p><strong>Operational</strong>: p50/p95/p99 latency (SLO p99 under 120 ms), requests per second, error rate, timeouts, fallback-served rate, CPU and memory per replica, autoscaler replica count.</p>
<p><strong>ML-specific</strong>: (1) Accuracy-related: click-through rate and add-to-cart rate on recommendations (30-minute natural labels), sliced by new vs returning users and by device. (2) Predictions: distribution of top scores, share of recommendations from the top 1% most popular items (diversity), share of out-of-stock items recommended. (3) Features: PSI per key feature against the training window, null rates, freshness of streaming features (seconds since last update). (4) Raw inputs: schema checks on the event stream (missing user id, malformed product ids).</p>
<p><strong>Alerts</strong>:</p>
<ul>
  <li><em>Policy</em>: CTR below 70% of the same hour last week for 3 consecutive 15-minute windows. <em>Channel</em>: ML on-call pager. <em>Description</em>: "Recommendation CTR dropped; check dashboard X; if a model deploy happened in the last 2 hours, roll back with command Y; otherwise check feature freshness."</li>
  <li><em>Policy</em>: streaming feature freshness over 5 minutes for 2 consecutive windows. <em>Channel</em>: data platform channel plus ML on-call. <em>Description</em>: "Kafka consumer lag; recommendations are using stale session features; fallback to batch features is automatic."</li>
</ul>
<p><strong>Dashboard</strong>: CTR and add-to-cart (vs last week), p99 latency and error rate, prediction diversity, top 5 feature PSIs, model version currently serving.</p>
<pre><code class="lang-python runnable">import numpy as np

def check_alert(values, threshold, min_consecutive=3):
    """Fire only if the metric breaches the threshold for N consecutive windows (reduces noise)."""
    streak, fired_at = 0, []
    for i, v in enumerate(values):
        streak = streak + 1 if v &gt; threshold else 0
        if streak == min_consecutive:
            fired_at.append(i)
    return fired_at

rng = np.random.default_rng(3)
# 5-minute windows of p99 latency (ms): normal noise, one-off spikes, then a real regression
p99 = rng.normal(180, 25, 48)
p99[[7, 19, 30]] = [320, 340, 310]     # isolated spikes (GC pauses, a slow request burst)
p99[40:] += 160                       # a real regression after a deploy at window 40

naive = [i for i, v in enumerate(p99) if v &gt; 300]
print("naive alert (any window &gt; 300 ms) fires at windows:", naive)
print("3-consecutive-window alert fires at windows       :", check_alert(p99, 300))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">naive alert (any window &gt; 300 ms) fires at windows: [7, 19, 30, 40, 41, 42, 43, 44, 45, 46, 47]
3-consecutive-window alert fires at windows       : [42]</code></pre>
<p>The naive policy pages three times for harmless one-off spikes before the real issue; the persistence rule fires once, two windows after the regression started (window 42), trading 10 minutes of detection delay for far fewer false alarms.</p>`
          },
          quiz: [
            { q: "A model's latency and error rate look normal, but its approval rate dropped from 40% to 8%. What kind of failure is likely?", options: ["Hardware failure", "A silent ML failure, for example broken input features", "No failure", "A network outage"], answer: 1, explain: "Operational metrics can look healthy while the model receives bad inputs; prediction and feature monitoring catch these silent failures." },
            { q: "Which artifact is closest to business outcomes but often hardest to collect?", options: ["Raw inputs", "Features", "Predictions", "Accuracy-related metrics from user feedback"], answer: 3, explain: "User feedback (clicks, purchases) most directly reflects performance but may be delayed or unavailable." },
            { q: "Which is a feature validation check?", options: ["Retraining the model weekly", "Checking that 'country' values belong to the set of ISO country codes", "Measuring GPU temperature", "Running an A/B test"], answer: 1, explain: "Feature validation checks values against expectations such as allowed sets, ranges, formats and missing rates." },
            { q: "What is the best way to reduce alert fatigue?", options: ["Alert on every feature shift", "Require persistence over several windows, route by severity and remove alerts nobody acts on", "Send all alerts by email only", "Disable alerts at night"], answer: 1, explain: "Alerts that fire for unimportant, transient events train people to ignore them. Make every alert meaningful and actionable." }
          ]
        },
        {
          id: "mlsys-ops-continual-learning",
          title: "Continual Learning: Stateless vs. Stateful Training and How Often to Retrain",
          minutes: 50,
          objectives: [
            "Define continual learning and contrast stateless retraining with stateful training",
            "Explain why continual learning helps with shifts, rare events and the continuous cold start problem",
            "Describe the challenges: fresh data access, evaluation and algorithms",
            "Walk through the four stages of continual learning and estimate the value of data freshness"
          ],
          body: String.raw`
<p>If models decay as the world changes, the obvious fix is to update them. <strong>Continual learning</strong> is the practice of setting up infrastructure so that models are updated whenever needed, whether from scratch or by fine-tuning, and deployed quickly and safely. It is largely an infrastructure problem, not an algorithm problem: most companies that "do continual learning" update in micro-batches (for example every 512 or 1,024 new examples), not after every single example.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 9, "Continual Learning and Test in Production" (continual learning sections).</div>

<p>A typical setup: the updated model is a <em>challenger</em>. It is trained, evaluated against the current production model (the <em>champion</em>), and replaces it only if it is better, using the testing methods in the next lesson. The process never ends: there is always a new challenger.</p>

<h3>Stateless retraining versus stateful training</h3>
<ul>
  <li><strong>Stateless retraining</strong>: each update trains a new model from scratch, typically on a window of data (say the last 3 months).</li>
  <li><strong>Stateful training</strong> (fine-tuning, incremental learning): the model continues training from its last checkpoint using only new data (say the last day).</li>
</ul>
<p>Stateful training needs far less data and compute per update. Grubhub reported that moving from daily stateless retraining to daily stateful training cut training compute cost by 45 times and increased purchase-through rate by 20%. It also has a privacy bonus: once data has been used for an update, you may not need to store it. Stateful training is best for <em>data iteration</em> (refreshing the model with new data, same architecture and features). <em>Model iteration</em> (adding a new feature or changing the architecture) usually still requires training from scratch, after which the new model can be updated statefully. Many companies combine both: occasional stateless retrains (for model changes or to clean up accumulated drift), frequent stateful updates in between.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import SGDClassifier

rng = np.random.default_rng(0)
def day_of_data(day, n=2_000):
    # fraud patterns drift: the "fraud direction" in feature space rotates a bit each day
    angle = 0.08 * day
    direction = np.array([np.cos(angle), np.sin(angle), 0.5])
    X = rng.normal(size=(n, 3))
    y = (X @ direction + rng.normal(0, 0.3, n) &gt; 0.8).astype(int)
    return X, y

days = [day_of_data(d) for d in range(30)]

frozen = SGDClassifier(loss="log_loss", random_state=0).fit(*days[0])   # trained once, never updated
stateful = SGDClassifier(loss="log_loss", random_state=0)
stateful.partial_fit(*days[0], classes=[0, 1])

print("day  frozen  stateless(last 7d)  stateful(+1 day)  rows seen per update")
for d in range(1, 30):
    X_today, y_today = days[d]
    # STATELESS retraining: train from scratch on the last 7 days of data
    window = days[max(0, d - 7):d]
    stateless = SGDClassifier(loss="log_loss", random_state=0).fit(
        np.vstack([w[0] for w in window]), np.concatenate([w[1] for w in window]))
    if d % 7 == 0:
        print(f"{d:3d}  {frozen.score(X_today, y_today):6.3f}  {stateless.score(X_today, y_today):18.3f}  "
              f"{stateful.score(X_today, y_today):16.3f}  {sum(len(w[1]) for w in window):&gt;6} vs 2000")
    # STATEFUL training: continue from yesterday's weights using only yesterday's data
    stateful.partial_fit(X_today, y_today)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">day  frozen  stateless(last 7d)  stateful(+1 day)  rows seen per update
  7   0.857               0.892             0.909   14000 vs 2000
 14   0.760               0.892             0.913   14000 vs 2000
 21   0.648               0.907             0.925   14000 vs 2000
 28   0.570               0.892             0.923   14000 vs 2000</code></pre>
<p>A model trained once (frozen) decays from 0.86 to 0.57 accuracy as the fraud pattern rotates. Stateless retraining on the last 7 days keeps accuracy around 0.89 to 0.91 but processes 14,000 rows per update. Stateful training, which continues from yesterday's weights with only yesterday's 2,000 rows, stays the most accurate here (0.91 to 0.93) because it weights the most recent data most heavily, at a seventh of the data per update.</p>

<h3>Why continual learning?</h3>
<ul>
  <li><strong>Adapting to shifts</strong>, especially sudden ones. A ride-sharing demand model must react within hours to a concert ending or a storm, not next week.</li>
  <li><strong>Rare events</strong>. Black Friday or a major holiday happens once a year; historical data barely captures it. Learning throughout the day lets a model adapt while the event is happening.</li>
  <li><strong>The continuous cold start problem</strong>. Cold start is making predictions for users without history. It is <em>continuous</em> because existing users also become "new": they switch devices, log out, or come back after a long time, and their behavior has changed. Systems that adapt within a session (short-video apps adapt recommendations within minutes of a new user's first interactions) handle this far better.</li>
</ul>

<h3>Continual learning challenges</h3>
<h4>Fresh data access</h4>
<p>To update hourly, you need new, labeled data every hour. Pulling it from a data warehouse is often too slow (data lands there with delay, and joining many sources takes time). Pulling it directly from real-time transport (Kafka) before it reaches the warehouse is faster. Labels are the bigger constraint: tasks with <em>natural labels and short feedback loops</em> (clicks, ETAs, dynamic pricing, stock prices) are the best candidates. Extracting labels from user behavior often requires joining prediction logs with later events (a click within 10 minutes of an impression), a process called <strong>label computation</strong>, which can itself be done in stream processing for freshness.</p>
<h4>Evaluation</h4>
<p>The more often you update, the more chances there are for a bad update to slip through, and models updated on fresh data are exposed to coordinated manipulation (for example a chatbot being taught offensive behavior by trolls). Every update must be evaluated before deployment, and evaluation takes time: a fraud model may need weeks of data to see enough fraud cases. Evaluation speed can become the bottleneck for update frequency.</p>
<h4>Algorithms</h4>
<p>Neural networks can be updated with any amount of new data. Matrix factorization and tree-based models are harder to update incrementally (a tree's structure depends on all the data), although incremental variants exist. Feature scaling also needs care: statistics like mean and variance must be computed incrementally (running statistics) rather than over the full dataset.</p>

<h3>The four stages of continual learning</h3>
<figure><img src="assets/diagrams/mlsys-continual-stages.svg" alt="Staircase of four stages: manual stateless retraining, automated retraining, automated stateful training, continual learning triggered by drift, performance or volume"><figcaption>Most companies progress through these stages over years.</figcaption></figure>
<ol>
  <li><strong>Manual, stateless retraining.</strong> The team focuses on building new models; updates happen only when performance has visibly degraded and someone has time. Retraining is manual: query the warehouse, clean, extract features, retrain from scratch, export, deploy by hand. Code changes made during retraining often fail to reach production, causing hard-to-trace bugs. Most companies outside the tech industry are here.</li>
  <li><strong>Automated retraining.</strong> A script automates pull data, resample, extract features, label, train, evaluate and deploy, scheduled with a batch process (e.g. nightly). Frequency is often set by gut feeling. Requirements: a scheduler (e.g. Airflow), accessible data, and a model store to version artifacts. Different models may need different schedules and may depend on each other (an embedding model and the ranking model that uses its embeddings).</li>
  <li><strong>Automated, stateful training.</strong> The script loads the previous checkpoint and continues training on new data. Requires a mindset change and lineage tracking: which base model and which data produced model version 3.32?</li>
  <li><strong>Continual learning.</strong> Instead of a fixed schedule, updates are triggered: <em>time-based</em> (every 5 minutes), <em>performance-based</em> (when performance drops), <em>volume-based</em> (when labeled data grows by 5%) or <em>drift-based</em> (when a major shift is detected). Requires solid monitoring, a robust evaluation pipeline that can run automatically, and fast, safe deployment. The long-term ideal combines this with edge devices that adapt locally.</li>
</ol>

<h3>How often should you update?</h3>
<p>Before answering, find out <strong>how much the model gains from fresher data</strong>. Run an experiment: train models on data from different periods in the past and evaluate all of them on the most recent data. The drop in performance with staleness shows the value of freshness. (A large ad platform found that retraining an ad click-through model daily instead of weekly reduced the model's loss by about 1%, which at their scale was worth a lot.)</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(1)

def month_of_data(month, n=3_000):
    # the decision boundary drifts a little every month
    w = np.array([1.0, np.sin(0.35 * month), np.cos(0.35 * month)])
    X = rng.normal(size=(n, 3))
    y = (X @ w + rng.normal(0, 0.5, n) &gt; 0).astype(int)
    return X, y

months = [month_of_data(m) for m in range(13)]
X_test, y_test = months[12]                     # evaluate on "now"

print("trained on months   age of newest data   accuracy on month 12")
for start, end in [(0, 3), (3, 6), (6, 9), (9, 12)]:
    X = np.vstack([months[m][0] for m in range(start, end)])
    y = np.concatenate([months[m][1] for m in range(start, end)])
    acc = LogisticRegression().fit(X, y).score(X_test, y_test)
    print(f"     {start:2d} to {end - 1:2d}          {12 - end + 1:2d} month(s)          {acc:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">trained on months   age of newest data   accuracy on month 12
      0 to  2          10 month(s)          0.546
      3 to  5           7 month(s)          0.518
      6 to  8           4 month(s)          0.642
      9 to 11           1 month(s)          0.820</code></pre>
<p>In this simulated drifting problem, a model trained on data 1 month old is far better (0.82) than one 4 months old (0.64), and older data is barely better than a coin flip. If the curve were flat, monthly retraining would be fine; because it falls steeply, frequent updates are worth the infrastructure investment.</p>
<p>Also compare <strong>model iteration</strong> (better architecture or features) with <strong>data iteration</strong> (same model, fresher data). If a better architecture gains 1% but needs 100 times the compute, while daily data updates gain 1% for a fraction of the cost, data iteration wins. There is no general rule; measure.</p>
`,
          keyPoints: [
            "Continual learning is mainly infrastructure: updating models (usually in micro-batches) and deploying them safely and quickly.",
            "Stateless retraining trains from scratch on a window; stateful training fine-tunes from the last checkpoint on new data, at much lower cost.",
            "Use stateful training for data iteration; model iteration (new features or architecture) usually needs training from scratch.",
            "Continual learning helps with sudden shifts, rare events and the continuous cold start problem.",
            "Challenges: fresh data and label access, fast and safe evaluation, and algorithms that update incrementally.",
            "Four stages: manual stateless, automated, automated stateful, triggered continual learning. Measure the value of data freshness to set frequency."
          ],
          exercise: {
            prompt: String.raw`<p>A news recommendation team is at Stage 1: a data scientist retrains the model manually every 2 to 3 months. Click labels are available within 30 minutes. Write a plan to reach Stage 3 within two quarters: which components to build in which order, what to measure to decide the retraining frequency, and what evaluation gate a new model must pass before replacing the champion.</p>`,
            solution: String.raw`<ol>
  <li><strong>Measure first</strong>: run the data-freshness experiment. Train on windows ending 1, 7, 30 and 60 days ago and evaluate on yesterday's data. News is highly time-sensitive, so expect a steep decline; this justifies the investment.</li>
  <li><strong>Stage 2 (quarter 1)</strong>: put the training code in version control with tests; build a pipeline (Airflow DAG): pull clicks and impressions, compute labels (click within 30 minutes), build features with the same code as serving, train, evaluate, register in a model store (e.g. MLflow) with data and code versions, deploy. Schedule daily. Add monitoring of CTR and prediction distributions so you can see the effect.</li>
  <li><strong>Evaluation gate</strong> (automated): the challenger must (a) beat the champion's offline metric (e.g. NDCG@10) on the most recent held-out day, (b) not regress more than 1% on key slices (new users, each top-level section, mobile vs desktop), (c) pass behavioral tests (no recommending articles older than X days, diversity above a threshold), and (d) pass a short canary on 5% of traffic with no CTR drop. Otherwise the champion stays and the team is notified.</li>
  <li><strong>Stage 3 (quarter 2)</strong>: switch daily updates to stateful fine-tuning from the last checkpoint on the last day of data; keep a weekly or monthly stateless retrain for model changes; add lineage tracking (each version records its parent model and data window). Then experiment with hourly updates, since the freshness curve is likely steep for news.</li>
</ol>`
          },
          quiz: [
            { q: "What distinguishes stateful training from stateless retraining?", options: ["Stateful training uses a GPU", "Stateful training continues from the previous checkpoint using new data instead of training from scratch", "Stateful training never uses new data", "There is no difference"], answer: 1, explain: "Stateful (incremental) training fine-tunes the existing model on new data; stateless retraining starts from scratch each time." },
            { q: "Which kind of change usually still requires training from scratch?", options: ["Adding yesterday's data", "Adding a new feature or changing the architecture", "Updating with the last hour of clicks", "Changing the deployment region"], answer: 1, explain: "Model iteration changes the model's structure, so you cannot simply continue from the old checkpoint." },
            { q: "What is the 'continuous cold start' problem?", options: ["Servers taking long to boot", "Not only new users but also existing users who change behavior, devices or return after long gaps lack relevant history", "Training on cold storage", "Models that never converge"], answer: 1, explain: "Cold start keeps recurring for existing users whose relevant history is missing or outdated; fast adaptation helps." },
            { q: "At Stage 4, what triggers model updates?", options: ["Only a fixed calendar", "Triggers such as time, performance drops, data volume, or detected drift", "Manual requests by executives", "Nothing; models are frozen"], answer: 1, explain: "Continual learning moves from fixed schedules to triggered updates, which requires solid monitoring and automatic evaluation." },
            { q: "How should you decide how often to retrain?", options: ["By gut feeling", "Measure the value of data freshness: train on data from different past periods and evaluate on recent data", "Always retrain every minute", "Retrain once a year"], answer: 1, explain: "The performance drop with staleness tells you whether more frequent updates are worth their cost." }
          ]
        },
        {
          id: "mlsys-ops-testing-in-production",
          title: "Testing in Production: Shadow, A/B, Canary, Interleaving and Bandits",
          minutes: 55,
          objectives: [
            "Explain why offline evaluation is not enough before replacing a production model",
            "Compare shadow deployment, A/B testing, canary releases, interleaving and bandits",
            "Run a statistical significance check and sample-size estimate for an A/B test",
            "Implement an epsilon-greedy bandit and compare it with a fixed traffic split"
          ],
          body: String.raw`
<p>Offline evaluation uses static test sets and backtests on recent data, but production is where the truth is: real users, real feedback, real distribution. To decide whether a new model (the candidate) should replace the current one (the production model), you test it on live traffic, carefully. The techniques in this lesson trade off user risk, speed of learning, statistical rigor and engineering effort.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 9, section "Test in Production".</div>

<p>Two offline methods first. A <strong>static test split</strong> is a trusted benchmark that lets you compare models over time; but if the data has shifted, it no longer represents production. A <strong>backtest</strong> evaluates the model on the most recent labeled data (for example the last hour) that it was not trained on. Both are needed, and neither is enough: a model can look better on yesterday's data and still hurt users today.</p>

<figure><img src="assets/diagrams/mlsys-test-in-production.svg" alt="Four panels: shadow deployment where model B is logged only, A/B test with a 50/50 random split, canary release with 5 percent to model B, bandit adapting traffic toward the better model"><figcaption>Four strategies for comparing a current model A and a candidate B on live traffic.</figcaption></figure>

<h3>Shadow deployment</h3>
<p>Deploy the candidate alongside the existing model. Every incoming request goes to both, but only the existing model's prediction is served to users; the candidate's predictions are logged. Later, compare the two models' predictions (and, when labels arrive, their accuracy). This is the safest approach: a broken candidate cannot hurt anyone. Costs: it doubles inference compute, and it cannot measure how users <em>react</em> to the candidate's predictions (you cannot learn whether users would click recommendations they never saw). Shadow deployment is excellent for catching crashes, latency problems and wild prediction differences before any user exposure.</p>

<h3>A/B testing</h3>
<p>Deploy the candidate, and route a percentage of traffic to it (often 50/50, or 90/10 when risk is a concern). Measure the business metric for each group and compare. Two requirements:</p>
<ol>
  <li><strong>Traffic must be truly random.</strong> If one model receives mostly mobile users or a specific region, the comparison is biased. Assignment is usually by user (so the same user always sees the same variant), not by request.</li>
  <li><strong>The test needs enough samples</strong> to be confident in the result, which is a statistical question.</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
from scipy import stats

rng = np.random.default_rng(7)
# Users are randomly split 50/50. Metric: did the user buy something from the recs?
n_a, n_b = 20_000, 20_000
conv_a = rng.random(n_a) &lt; 0.050      # model A (current)
conv_b = rng.random(n_b) &lt; 0.054      # model B (candidate) -- truly 8% better

table = np.array([[conv_a.sum(), n_a - conv_a.sum()],
                  [conv_b.sum(), n_b - conv_b.sum()]])
chi2, p_value, _, _ = stats.chi2_contingency(table)
print(f"conversion A = {conv_a.mean():.4f}, B = {conv_b.mean():.4f}, lift = {conv_b.mean()/conv_a.mean()-1:+.1%}")
print(f"chi-square p-value = {p_value:.4f} -&gt; {'significant' if p_value &lt; 0.05 else 'not significant'} at 5%")

# How many users per arm do we need to reliably detect this lift? (power 80%, alpha 5%)
p1, p2 = 0.050, 0.054
z_a, z_b = stats.norm.ppf(1 - 0.05 / 2), stats.norm.ppf(0.80)
p_bar = (p1 + p2) / 2
n_needed = ((z_a * np.sqrt(2 * p_bar * (1 - p_bar)) + z_b * np.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / (p2 - p1) ** 2
print(f"users needed per arm for 80% power: {int(np.ceil(n_needed)):,}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">conversion A = 0.0483, B = 0.0537, lift = +11.3%
chi-square p-value = 0.0141 -&gt; significant at 5%
users needed per arm for 80% power: 48,364</code></pre>
<p>The observed lift of 11.3% is "significant" (p = 0.014), but note two subtleties. First, the true lift was 8%; observed lifts in experiments that just pass significance are often exaggerated (this is sometimes called the winner's curse). Second, the sample-size calculation says that reliably detecting an 8% lift on a 5% conversion rate needs about 48,000 users per arm, more than this test used. Decide the sample size <em>before</em> starting, run until it is reached, and do not stop early as soon as the p-value dips below 0.05 ("peeking" inflates false positives). Also remember that statistical significance is not certainty: at a 5% threshold, roughly 1 in 20 tests of a model that is truly no better will still appear significant. You can run A/B tests with more than two variants (A/B/C tests) too.</p>

<h3>Canary release</h3>
<p>A canary release slowly rolls out a change to a small subset of users before everyone. Deploy the candidate (the canary) next to the existing model; route a small share of traffic (say 1% to 5%) to it; if its metrics are satisfactory, increase the share in steps (5%, 25%, 50%, 100%); if not, abort and send all traffic back to the existing model. Canary releases are mainly about <em>reducing the risk</em> of a bad deployment; they can be combined with A/B testing (comparing metrics of the two groups) or run without it (for example rolling out to a low-risk market first).</p>

<h3>Interleaving experiments</h3>
<p>For ranking and recommendation, there is a far more data-efficient option. Instead of showing group A recommendations from model A and group B from model B, show <em>each user</em> a single list that interleaves results from both models, and see whose items they click. Because every user compares both models directly, interleaving needs much less traffic to detect a preference than A/B testing; streaming services have reported that it identifies the better ranking algorithm with dramatically smaller samples. To be fair, position must not favor either model (the top slot gets more clicks), so <em>team-draft interleaving</em> lets the models take turns picking, with a coin flip deciding who goes first each round:</p>
<pre><code class="lang-python runnable">import numpy as np

def team_draft(rank_a, rank_b, k, rng):
    """Merge two rankings; remember which model 'owns' each slot."""
    merged, owner = [], []
    ia = ib = 0
    while len(merged) &lt; k:
        a_first = rng.random() &lt; 0.5                   # coin flip each round
        for team in ("A", "B") if a_first else ("B", "A"):
            ranking, idx = (rank_a, ia) if team == "A" else (rank_b, ib)
            while idx &lt; len(ranking) and ranking[idx] in merged:
                idx += 1                               # skip items already picked
            if idx &lt; len(ranking) and len(merged) &lt; k:
                merged.append(ranking[idx]); owner.append(team)
                idx += 1
            if team == "A": ia = idx
            else: ib = idx
    return merged, owner

rng = np.random.default_rng(0)
appeal = {f"movie_{i}": p for i, p in enumerate(np.linspace(0.30, 0.02, 20))}   # movie_0 best
rank_a = [f"movie_{i}" for i in range(20)]                   # model A ranks by true appeal
rank_b = [f"movie_{i}" for i in rng.permutation(20)]         # model B is much worse

wins = {"A": 0, "B": 0}
for user in range(2_000):
    shown, owner = team_draft(rank_a, rank_b, k=6, rng=rng)
    for movie, team in zip(shown, owner):
        if rng.random() &lt; appeal[movie]:                    # user clicks -&gt; credit the owner
            wins[team] += 1
print("example merged list:", shown)
print("owners             :", owner)
print("clicks credited    :", wins, "-&gt; preferred model:", max(wins, key=wins.get))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">example merged list: ['movie_0', 'movie_4', 'movie_1', 'movie_19', 'movie_2', 'movie_6']
owners             : ['A', 'B', 'A', 'B', 'A', 'B']
clicks credited    : {'A': 1688, 'B': 931} -&gt; preferred model: A</code></pre>
<p>Note the limitation: interleaving measures user <em>preference</em> between items, not necessarily the downstream business metric (for that, A/B tests remain the standard). It is a fast pre-filter for ranking changes.</p>

<h3>Bandits</h3>
<p>A/B testing is <em>stateless</em>: traffic is split in fixed proportions regardless of what has been learned so far, so a worse model keeps getting half the traffic until the test ends. <strong>Multi-armed bandits</strong> (named after slot machines, "one-armed bandits") are adaptive: they balance <strong>exploitation</strong> (sending traffic to the model that currently looks best) and <strong>exploration</strong> (sending some traffic to other models in case they are actually better). The simplest algorithm is <strong>epsilon-greedy</strong>: with probability epsilon pick a random model, otherwise pick the model with the best observed reward so far.</p>
<pre><code class="lang-python runnable">import numpy as np

# Three candidate recommendation models. Their true click-through rates are unknown to us.
TRUE_CTR = {"model_A": 0.040, "model_B": 0.052, "model_C": 0.046}
names = list(TRUE_CTR)

def run_epsilon_greedy(epsilon, n_requests=50_000, seed=0):
    rng = np.random.default_rng(seed)
    pulls = np.zeros(len(names))
    rewards = np.zeros(len(names))
    for _ in range(n_requests):
        if rng.random() &lt; epsilon or pulls.min() == 0:
            arm = int(rng.integers(len(names)))            # EXPLORE: random model
        else:
            arm = int(np.argmax(rewards / pulls))          # EXPLOIT: best model so far
        clicked = rng.random() &lt; TRUE_CTR[names[arm]]
        pulls[arm] += 1
        rewards[arm] += clicked
    return pulls, rewards

def run_ab_split(n_requests=50_000, seed=0):
    rng = np.random.default_rng(seed)
    arms = rng.integers(len(names), size=n_requests)       # fixed equal split
    clicks = rng.random(n_requests) &lt; np.array([TRUE_CTR[n] for n in names])[arms]
    return np.bincount(arms, minlength=3), np.bincount(arms, weights=clicks, minlength=3)

best_possible = 50_000 * max(TRUE_CTR.values())
for label, (pulls, rewards) in [("equal split (A/B/C test)", run_ab_split()),
                                ("epsilon-greedy, eps=0.1 ", run_epsilon_greedy(0.1))]:
    share = ", ".join(f"{n}: {p / pulls.sum():.0%}" for n, p in zip(names, pulls))
    regret = best_possible - rewards.sum()
    print(f"{label} | traffic {share} | clicks {int(rewards.sum())} | regret ~{regret:.0f} clicks")
    print(f"{'':25s}   estimated CTRs: {np.round(rewards / pulls, 4).tolist()}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">equal split (A/B/C test) | traffic model_A: 33%, model_B: 34%, model_C: 33% | clicks 2234 | regret ~366 clicks
                            estimated CTRs: [0.0372, 0.0521, 0.0446]
epsilon-greedy, eps=0.1  | traffic model_A: 3%, model_B: 92%, model_C: 4% | clicks 2521 | regret ~79 clicks
                            estimated CTRs: [0.0354, 0.0512, 0.0465]</code></pre>
<p>With three candidate models, the equal split sent two thirds of traffic to worse models and gave up about 366 clicks compared with always using the best one (this lost reward is called <strong>regret</strong>). Epsilon-greedy found model B quickly, sent it 92% of traffic, and lost only about 79 clicks. It still estimated all CTRs well enough to identify the winner. Better exploration algorithms exist: <strong>Thompson sampling</strong> picks each model with the probability that it is the best given the evidence so far, and <strong>upper confidence bound</strong> (UCB) picks the model with the highest optimistic estimate. Bandits typically need less data than A/B tests to find the best model and lose less reward along the way.</p>
<p>Why are bandits not used everywhere? They are harder to implement: the system must compute rewards (which needs short feedback loops, i.e. natural labels arriving quickly), keep state about each model's performance, and update the routing online. They are also less suited when you need a clean, unbiased estimate of the effect size for a business decision.</p>
<p><strong>Contextual bandits</strong> apply the same idea at the level of individual predictions rather than whole models: for each user, decide which item to show, balancing items the model is confident the user will like with items it is uncertain about, so it learns from more of the catalog. They are a principled exploration strategy for recommendation and help counter degenerate feedback loops, but are even harder to implement.</p>

<table>
  <thead><tr><th>Method</th><th>User risk</th><th>Measures user reaction?</th><th>Data efficiency</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>Shadow</td><td>None</td><td>No</td><td>N/A</td><td>Catching bugs, latency, wild disagreements</td></tr>
    <tr><td>A/B test</td><td>Medium (share of users on candidate)</td><td>Yes</td><td>Low</td><td>Unbiased estimate of business impact</td></tr>
    <tr><td>Canary</td><td>Low, increasing</td><td>Yes</td><td>Low</td><td>Safe, gradual rollout with abort</td></tr>
    <tr><td>Interleaving</td><td>Low</td><td>Preference only</td><td>High</td><td>Ranking and recommendation comparisons</td></tr>
    <tr><td>Bandits</td><td>Low, adaptive</td><td>Yes</td><td>High</td><td>Many candidates, short feedback loops</td></tr>
  </tbody>
</table>
<div class="callout tip"><strong>Tip:</strong> These methods combine well. A common sequence: offline evaluation, then shadow deployment for a few days, then a canary at 5%, then an A/B test at 50/50 for the business decision, then full rollout, while keeping the old model ready for instant rollback.</div>
`,
          keyPoints: [
            "Offline evaluation (static test sets, backtests) is necessary but not sufficient; test candidates on live traffic.",
            "Shadow deployment runs the candidate without serving it: zero user risk, but no user reaction data and double compute.",
            "A/B tests need random assignment and a pre-computed sample size; avoid peeking and beware exaggerated lifts.",
            "Canary releases expose a small, growing share of traffic with the ability to abort.",
            "Interleaving shows each user a mix of two rankings and needs far less traffic to detect preference.",
            "Bandits adapt traffic toward the best model, reducing regret; they need fast rewards and stateful routing."
          ],
          exercise: {
            prompt: String.raw`<p>Compare exploration strategies on three models with true CTRs 4.0%, 5.2% and 4.6%. Implement epsilon-greedy with epsilon in {0.01, 0.10, 0.30} and Thompson sampling (with a Beta(1, 1) prior per model). Average over a few random seeds and report regret and the share of traffic sent to the best model. Then explain the results and recommend a rollout plan for replacing a production search-ranking model.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

TRUE_CTR = np.array([0.040, 0.052, 0.046])
N = 10_000

def epsilon_greedy(epsilon, seed):
    rng = np.random.default_rng(seed)
    pulls, wins = np.zeros(3), np.zeros(3)
    for _ in range(N):
        explore = rng.random() &lt; epsilon or pulls.min() == 0
        arm = int(rng.integers(3)) if explore else int(np.argmax(wins / pulls))
        pulls[arm] += 1
        wins[arm] += rng.random() &lt; TRUE_CTR[arm]
    return wins.sum(), pulls[1] / N

def thompson(seed):
    rng = np.random.default_rng(seed)
    alpha, beta = np.ones(3), np.ones(3)        # Beta(1, 1) prior on each CTR
    for _ in range(N):
        arm = int(np.argmax(rng.beta(alpha, beta)))   # sample a plausible CTR per arm
        click = rng.random() &lt; TRUE_CTR[arm]
        alpha[arm] += click
        beta[arm] += 1 - click
    pulls = alpha + beta - 2
    return (alpha - 1).sum(), pulls[1] / N

best = N * TRUE_CTR.max()
for name, fn in [("eps=0.01", lambda s: epsilon_greedy(0.01, s)),
                 ("eps=0.10", lambda s: epsilon_greedy(0.10, s)),
                 ("eps=0.30", lambda s: epsilon_greedy(0.30, s)),
                 ("Thompson", thompson)]:
    results = [fn(seed) for seed in range(3)]
    regret = np.mean([best - r[0] for r in results])
    share = np.mean([r[1] for r in results])
    print(f"{name}: avg regret {regret:6.1f} clicks | avg traffic to best model {share:.0%}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">eps=0.01: avg regret   61.0 clicks | avg traffic to best model 37%
eps=0.10: avg regret   29.0 clicks | avg traffic to best model 85%
eps=0.30: avg regret   47.3 clicks | avg traffic to best model 41%
Thompson: avg regret   18.7 clicks | avg traffic to best model 76%</code></pre>
<p><strong>Interpretation.</strong> With too little exploration (epsilon = 0.01), the bandit can lock onto a worse model early because initial estimates are noisy, giving high regret. Too much exploration (epsilon = 0.30) wastes traffic on worse models forever. Intermediate epsilon works well, and Thompson sampling, which explores in proportion to its uncertainty and naturally explores less as evidence accumulates, achieves low regret without tuning epsilon. Results vary between seeds with short horizons, which is why we average over several runs (and why production bandits use many more requests).</p>
<p><strong>Rollout plan for a search-ranking model.</strong> (1) Offline: NDCG on a static set and a backtest on last week's queries, plus slice checks (long-tail queries, each language). (2) Shadow deployment for 2 to 3 days: verify latency (p99 within budget), error rate, and how often top results differ. (3) Interleaving on a small share of traffic to confirm users prefer the new ranking. (4) Canary at 5% with automatic abort if search CTR or zero-result rate degrade. (5) A/B test at 50/50 with a pre-computed sample size to measure the business metric (searches leading to purchase). (6) Full rollout, keeping the old model ready for rollback.</p>`
          },
          quiz: [
            { q: "Which strategy has zero user risk but cannot measure how users react to the candidate's predictions?", options: ["A/B testing", "Canary release", "Shadow deployment", "Bandits"], answer: 2, explain: "In shadow deployment, the candidate's predictions are only logged, never shown, so users are unaffected but their reactions to them are unknown." },
            { q: "Why must A/B test traffic be randomly assigned?", options: ["To reduce compute cost", "So differences in outcomes are due to the models, not to different user populations", "Because random numbers are faster", "It does not need to be random"], answer: 1, explain: "Non-random assignment (e.g. one model gets mostly mobile users) confounds the comparison." },
            { q: "What is the main advantage of interleaving over A/B testing for ranking models?", options: ["It measures revenue directly", "Each user compares both rankings, so far less traffic is needed to detect a preference", "It needs no users", "It removes position bias automatically without any design"], answer: 1, explain: "Interleaving puts both models' results in one list per user, giving a within-user comparison that is very data-efficient." },
            { q: "In epsilon-greedy with epsilon = 0.1, what happens on each request?", options: ["Always pick the best-so-far model", "With 10% probability pick a random model, otherwise pick the best-so-far model", "Pick each model with equal probability", "Pick the worst model 10% of the time"], answer: 1, explain: "Epsilon-greedy explores with probability epsilon (uniformly random choice) and exploits otherwise." },
            { q: "What is a key practical requirement for using bandits to compare models?", options: ["Long feedback loops", "Short feedback loops so rewards can be computed quickly, plus stateful routing", "Exactly two models", "No monitoring"], answer: 1, explain: "Bandits update traffic allocation based on observed rewards, so rewards must arrive fast and the system must track each model's performance." }
          ]
        }
      ]
    },
    {
      id: "mlsys-infra",
      title: "ML Infrastructure, Platforms and the Human Side",
      summary: "The infrastructure layers that make ML repeatable (storage, compute, dev environments, schedulers and orchestrators, model and feature stores), build-vs-buy decisions, and the people side: user experience, team structure and responsible AI.",
      lessons: [
        {
          id: "mlsys-infra-platform",
          title: "ML Infrastructure: Compute, Orchestration, Model Stores and Feature Stores",
          minutes: 55,
          objectives: [
            "Describe the four infrastructure layers: storage and compute, development environment, resource management, and ML platform",
            "Distinguish cron, schedulers and orchestrators, and compare Airflow, Kubeflow and Metaflow",
            "Explain what a model store and a feature store do, including point-in-time correct joins",
            "Reason about build-versus-buy decisions"
          ],
          body: String.raw`
<p>In ML, <strong>infrastructure</strong> is the set of fundamental facilities that support developing and maintaining ML systems. How much you need depends on scale. A team with one simple model can live with notebooks and a cron job. A company with hundreds of models and dozens of data scientists needs shared platforms, or every team reinvents the same pipelines, badly. Most companies are in between ("reasonable scale"), which makes choosing infrastructure a real engineering decision.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 10, "Infrastructure and Tooling for MLOps".</div>

<figure><img src="assets/diagrams/mlops-stack.svg" alt="Layered stack from bottom: storage and compute, resource management, orchestration, feature store and model store, dev environment and CI/CD, serving and monitoring"><figcaption>The MLOps stack, read bottom-up: each layer builds on the one below.</figcaption></figure>

<h3>Layer 1: Storage and compute</h3>
<p>The <strong>storage layer</strong> is where data is collected and stored: from hard drives to, overwhelmingly today, cloud object storage (Amazon S3, Google Cloud Storage) and data warehouses (Snowflake, BigQuery). Storage has become cheap and largely commoditized.</p>
<p>The <strong>compute layer</strong> is all the compute resources a company has access to, and the mechanism that decides how they are used. It can be sliced into compute units (a CPU core, a GPU, a container, a Kubernetes pod) that run jobs. Key properties are memory (a job that needs 20 GB cannot run on a 16 GB machine without workarounds) and speed, often measured in FLOPS. Note that utilization in practice is far below the peak numbers on spec sheets, so benchmark your own workloads.</p>
<p><strong>Public cloud versus private data centers.</strong> The cloud lets you start quickly and scale elastically: rent 1,000 machines for an hour, then release them. This is ideal for variable workloads (training bursts, seasonal traffic). But as a company grows, cloud bills can become a large share of costs, and some large companies move parts of their workloads back to their own data centers ("cloud repatriation"). Many companies also use multiple clouds to avoid lock-in and to get specific services.</p>

<h3>Layer 2: Development environment</h3>
<p>Where data scientists write code, run experiments and interact with production. It includes the IDE (often notebooks such as Jupyter, which are great for exploration but can encourage hard-to-reproduce state), versioning (git for code, tools like DVC for data, experiment trackers for runs), and CI/CD test suites. Two practices pay off enormously:</p>
<ul>
  <li><strong>Standardize the dev environment</strong> across the team (same library versions, ideally cloud dev environments), so "it works on my machine" disappears and onboarding takes hours, not weeks.</li>
  <li><strong>From dev to prod: containers.</strong> A Dockerfile describes step by step how to build an environment (base image, dependencies, code); a container image built from it runs the same everywhere. Different steps of a pipeline (feature extraction on CPUs, training on GPUs) often run in different containers, and container orchestrators such as Kubernetes manage them.</li>
</ul>
<pre><code class="lang-dockerfile">FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
COPY model/ ./model/
CMD ["uvicorn", "src.serve:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>

<h3>Layer 3: Resource management: cron, schedulers and orchestrators</h3>
<p>ML workloads are repetitive (nightly training, hourly batch predictions) and have dependencies (train only after features are built). Tools in this layer allocate resources and run jobs:</p>
<ul>
  <li><strong>Cron</strong> runs a script at fixed times ("every day at 02:00"). It is simple, but it does not know about dependencies or failures: if the data job fails, the training job still runs on stale data.</li>
  <li><strong>Schedulers</strong> are cron programs that handle dependencies. They take a <strong>DAG</strong> (directed acyclic graph) of tasks, know which tasks depend on which, retry on failure, and queue jobs when resources are busy. Slurm is a classic scheduler.</li>
  <li><strong>Orchestrators</strong> are concerned with <em>where</em> to get resources: they provision machines, manage clusters, and scale up and down. Kubernetes is the best-known orchestrator. Schedulers often run on top of orchestrators.</li>
</ul>
<p>The core of a workflow scheduler is a dependency-aware loop over a DAG. Here is a miniature using Python's built-in <code>graphlib</code>:</p>
<pre><code class="lang-python runnable">from graphlib import TopologicalSorter

# A nightly retraining workflow, declared as a DAG: task -&gt; set of upstream tasks
workflow = {
    "pull_data":        set(),
    "validate_data":    {"pull_data"},
    "build_features":   {"validate_data"},
    "build_labels":     {"validate_data"},
    "train_model":      {"build_features", "build_labels"},
    "evaluate_model":   {"train_model"},
    "register_model":   {"evaluate_model"},
    "deploy_canary":    {"register_model"},
}

def run(workflow, fail_on=None):
    ts = TopologicalSorter(workflow)
    ts.prepare()
    done, wave = [], 1
    while ts.is_active():
        ready = list(ts.get_ready())          # these tasks could run IN PARALLEL
        print(f"wave {wave}: {sorted(ready)}")
        for task in ready:
            if task == fail_on:
                print(f"  !! {task} failed -&gt; downstream tasks are not started; alert on-call")
                return done
            done.append(task)
            ts.done(task)
        wave += 1
    return done

print("completed:", run(workflow)[-1])
print()
print("completed:", run(workflow, fail_on="evaluate_model"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">wave 1: ['pull_data']
wave 2: ['validate_data']
wave 3: ['build_features', 'build_labels']
wave 4: ['train_model']
wave 5: ['evaluate_model']
wave 6: ['register_model']
wave 7: ['deploy_canary']
completed: deploy_canary

wave 1: ['pull_data']
wave 2: ['validate_data']
wave 3: ['build_features', 'build_labels']
wave 4: ['train_model']
wave 5: ['evaluate_model']
  !! evaluate_model failed -&gt; downstream tasks are not started; alert on-call
completed: ['pull_data', 'validate_data', 'build_features', 'build_labels', 'train_model']</code></pre>
<p>Two key behaviors: tasks with no dependency between them (<code>build_features</code> and <code>build_labels</code>) can run in parallel in the same wave, and a failure stops everything downstream instead of deploying a model trained on bad inputs. Real workflow tools add retries, logging, schedules, backfills and a UI.</p>
<h4>Data science workflow tools</h4>
<ul>
  <li><strong>Airflow</strong> (from Airbnb) was one of the first workflow orchestrators and is very widely used. Workflows are defined in Python ("configuration as code"), with many operators for different systems. Drawbacks: it is monolithic (the whole workflow is packaged in one container image), DAGs are static (hard to create tasks dynamically at runtime), and parameterizing workflows is awkward.</li>
  <li><strong>Prefect</strong> and <strong>Argo</strong> addressed some of these: Prefect makes workflows parameterized and dynamic; Argo, built for Kubernetes, runs each step in its own container, but workflows are defined in YAML and need a Kubernetes cluster even for local testing.</li>
  <li><strong>Kubeflow</strong> and <strong>Metaflow</strong> aim to let data scientists run the same code in development and production, abstracting infrastructure. Kubeflow is built on Kubernetes and needs a fair amount of boilerplate; <strong>Metaflow</strong> (from Netflix) uses Python decorators to specify per-step requirements (such as "this step needs a GPU and 16 GB of memory"), so one notebook-like script can run locally and on the cloud.</li>
</ul>
<pre><code class="lang-python"># Requires Apache Airflow (not installed here) -- shown for illustration.
from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

def pull_data(): pass
def validate_data(): pass
def build_features(): pass
def train_model(): pass
def evaluate_model(): pass

with DAG(dag_id="churn_retrain", start_date=datetime(2024, 1, 1),
         schedule="0 2 * * *", catchup=False) as dag:      # every night at 02:00
    pull = PythonOperator(task_id="pull_data", python_callable=pull_data)
    validate = PythonOperator(task_id="validate_data", python_callable=validate_data)
    features = PythonOperator(task_id="build_features", python_callable=build_features)
    train = PythonOperator(task_id="train_model", python_callable=train_model)
    evaluate = PythonOperator(task_id="evaluate_model", python_callable=evaluate_model)
    pull &gt;&gt; validate &gt;&gt; features &gt;&gt; train &gt;&gt; evaluate</code></pre>

<h3>Layer 4: The ML platform</h3>
<p>As companies deploy more models, teams build shared tools so that each project does not start from zero. The components most commonly found in an ML platform:</p>
<h4>Model deployment</h4>
<p>A deployment service takes a trained model and its dependencies and makes it available as an endpoint for online prediction, or as a job for batch prediction. Cloud providers (SageMaker, Vertex AI, Azure ML) and open-source tools (BentoML, Seldon, KServe, MLflow Models) offer this. Look for: support for both online and batch prediction, quality checks before rollout, and support for the testing-in-production strategies from the previous module (shadow, canary, A/B).</p>
<h4>Model store</h4>
<p>Storing the model file in S3 is not enough: when a model misbehaves, you need to know which code, data, features and hyperparameters produced it. A <strong>model store</strong> (or registry) stores artifacts along with: the model definition and parameters, featurize and predict functions, dependencies (library versions), the data used for training, the code (commit), experiment artifacts (metrics, plots), and tags (owner, task, business use case). It also tracks which version is in which stage (staging, production) and supports rollback. MLflow's model registry is a popular open-source option.</p>
<pre><code class="lang-python runnable">import hashlib, json, pickle, tempfile
from pathlib import Path
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

class TinyModelStore:
    """Versioned artifacts + metadata + aliases -- the core idea behind MLflow's model registry."""
    def __init__(self, root):
        self.root = Path(root)

    def register(self, name, model, metadata):
        versions = sorted(self.root.glob(f"{name}/v*"))
        version = f"v{len(versions) + 1}"
        folder = self.root / name / version
        folder.mkdir(parents=True)
        blob = pickle.dumps(model)
        (folder / "model.pkl").write_bytes(blob)
        metadata = {**metadata, "version": version, "sha256": hashlib.sha256(blob).hexdigest()[:12]}
        (folder / "meta.json").write_text(json.dumps(metadata, indent=1))
        return version

    def set_alias(self, name, alias, version):
        (self.root / name / f"{alias}.alias").write_text(version)

    def load(self, name, alias="production"):
        version = (self.root / name / f"{alias}.alias").read_text()
        folder = self.root / name / version
        return pickle.loads((folder / "model.pkl").read_bytes()), json.loads((folder / "meta.json").read_text())

X, y = load_iris(return_X_y=True)
with tempfile.TemporaryDirectory() as tmp:
    store = TinyModelStore(tmp)
    for depth in (1, 3):
        m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X, y)
        v = store.register("iris-clf", m, {"params": {"max_depth": depth},
                                           "train_accuracy": round(m.score(X, y), 3),
                                           "data": "iris@2024-03-01", "code": "git:a1b2c3d",
                                           "features": ["sepal_len", "sepal_wid", "petal_len", "petal_wid"]})
        print("registered", v)
    store.set_alias("iris-clf", "production", "v2")
    model, meta = store.load("iris-clf")
    print("serving:", meta["version"], meta["params"], "train acc", meta["train_accuracy"])
    store.set_alias("iris-clf", "production", "v1")       # one-line rollback
    print("after rollback:", store.load("iris-clf")[1]["version"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">registered v1
registered v2
serving: v2 {'max_depth': 3} train acc 0.973
after rollback: v1</code></pre>
<h4>Feature store</h4>
<p>"Feature store" means different things to different people, but at its core it addresses three problems:</p>
<ol>
  <li><strong>Feature management</strong>: large companies have thousands of features (one ride-sharing company reported about 10,000 features across teams in 2017). Many are useful across models (a churn model and a conversion model can share user-activity features). A feature store acts as a catalog to share and discover features, with access controls for sensitive ones.</li>
  <li><strong>Feature computation</strong>: compute expensive features once and store the results for reuse, acting like a data warehouse for features.</li>
  <li><strong>Feature consistency</strong>: define a feature once and use that definition for both batch (training) and streaming (serving) computation, eliminating train-serving skew.</li>
</ol>
<p>A feature store also handles a subtle but critical problem when building training data: <strong>point-in-time correctness</strong>. Each training example must use feature values as they were <em>at the time of the label</em>, not as they are today. Joining on the latest value leaks future information:</p>
<pre><code class="lang-python runnable">import pandas as pd

# Feature table maintained by the feature store: a value is valid FROM its timestamp onward
features = pd.DataFrame({
    "user_id": [1, 1, 1, 2, 2],
    "ts": pd.to_datetime(["2024-03-01", "2024-03-05", "2024-03-09", "2024-03-02", "2024-03-08"]),
    "orders_last_30d": [2, 3, 7, 10, 11],
}).sort_values("ts")

# Training labels: did the user churn, observed at these moments
labels = pd.DataFrame({
    "user_id": [1, 2, 1],
    "ts": pd.to_datetime(["2024-03-06", "2024-03-07", "2024-03-10"]),
    "churned": [0, 1, 0],
}).sort_values("ts")

# WRONG: join on the LATEST feature value -&gt; uses information from the future
latest = features.groupby("user_id").tail(1)[["user_id", "orders_last_30d"]]
print("naive join (leaks future values):")
print(labels.merge(latest, on="user_id").to_string(index=False))

# RIGHT: point-in-time join -&gt; for each label, take the last feature value known AT that time
pit = pd.merge_asof(labels, features, on="ts", by="user_id", direction="backward")
print("\npoint-in-time correct join:")
print(pit.to_string(index=False))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">naive join (leaks future values):
 user_id         ts  churned  orders_last_30d
       1 2024-03-06        0                7
       2 2024-03-07        1               11
       1 2024-03-10        0                7

point-in-time correct join:
 user_id         ts  churned  orders_last_30d
       1 2024-03-06        0                3
       2 2024-03-07        1               10
       1 2024-03-10        0                7</code></pre>
<p>The naive join tells the model that user 1 had 7 recent orders on March 6, when the true value at that time was 3. Training on such data produces a model that looks great offline and disappoints in production. Feature stores (Feast is a popular open-source one; Tecton and cloud providers offer managed ones) perform these "as-of" joins for you.</p>

<h3>Build versus buy</h3>
<p>For every component, you can build in-house or use a vendor or open-source tool. Most companies are in between the extremes: compute on a cloud provider, a managed warehouse, but their own feature store and dashboards. Three factors dominate the decision:</p>
<ul>
  <li><strong>The stage of your company.</strong> Early on, buy to move fast and focus on your product. As usage grows, vendor costs can become exorbitant and building may become cheaper.</li>
  <li><strong>What you consider your focus or competitive advantage.</strong> A common rule from platform leaders: if it is something you want to be really good at, build it; if not, buy it. Companies outside tech (retail, banking, manufacturing) tend to buy; tech companies whose advantage is technology tend to build, or prefer modular tools they can customize.</li>
  <li><strong>The maturity of the available tools.</strong> If no tool fits your needs, you may be forced to build; the early ML platforms at large tech companies were built because nothing existed. As the ecosystem matures, buying becomes more attractive.</li>
</ul>
<p>Also count hidden costs: building means engineers maintaining it forever; buying means integration work, vendor lock-in, data leaving your environment, and possibly security reviews.</p>
`,
          keyPoints: [
            "Infrastructure layers: storage and compute, development environment, resource management, and the ML platform.",
            "Cloud gives elasticity and fast start; costs grow with scale, so some companies repatriate workloads or use multiple clouds.",
            "Standardize dev environments and use containers to move from development to production.",
            "Cron runs at fixed times; schedulers handle DAG dependencies and retries; orchestrators (Kubernetes) provision resources.",
            "Airflow, Prefect, Argo, Kubeflow and Metaflow trade off simplicity, dynamism and dev-to-prod parity.",
            "Model stores track artifacts with code, data, parameters and stage; feature stores manage, compute and serve features consistently with point-in-time correct joins.",
            "Build vs buy depends on company stage, competitive focus and tool maturity."
          ],
          exercise: {
            prompt: String.raw`<p>A 40-person fintech startup has 3 models in production (fraud, credit risk, marketing propensity), each deployed with its own ad hoc scripts by a different data scientist. Retraining is manual; nobody knows which data trained the current credit model; the fraud model's streaming features are re-implemented in Java by the backend team. Propose an infrastructure roadmap for the next 6 months: which components to adopt first, build vs buy for each, and why. Then write the point-in-time join that a feature store would perform for the fraud model, using <code>pd.merge_asof</code>, for transactions and a feature table of "card spend in the last 24h".</p>`,
            solution: String.raw`<p><strong>Roadmap (priority order).</strong></p>
<ol>
  <li><em>Model store and experiment tracking</em> (buy or use open source: managed MLflow). The credit model has no lineage, a regulatory risk in fintech. Every model gets code commit, data snapshot, metrics and owner recorded.</li>
  <li><em>Workflow orchestration</em> (open source, managed: Airflow or Prefect on a managed service). Replace manual retraining with scheduled DAGs including data validation and evaluation gates.</li>
  <li><em>Standardized containers and a deployment service</em> (buy: the cloud provider's serving, or an open-source server). One deployment path for all models, with canary support and rollback.</li>
  <li><em>Feature store</em> for the fraud model's streaming features (start with open-source Feast or a managed one; build only the custom pieces). This removes the Java re-implementation and its train-serving skew, and gives point-in-time correct training data.</li>
  <li><em>Monitoring</em>: operational metrics via existing tools, plus drift and prediction monitoring (buy or open source).</li>
</ol>
<p>Rationale: a 40-person startup's competitive advantage is its fraud and risk models, not ML infrastructure, so buy or adopt mature open-source tools and build only glue code.</p>
<pre><code class="lang-python runnable">import pandas as pd

features = pd.DataFrame({
    "card_id": ["c1", "c1", "c2", "c1"],
    "ts": pd.to_datetime(["2024-07-01 10:00", "2024-07-01 12:00", "2024-07-01 11:00", "2024-07-01 15:00"]),
    "spend_24h": [120.0, 480.0, 35.0, 1900.0],
}).sort_values("ts")
transactions = pd.DataFrame({
    "card_id": ["c1", "c2", "c1"],
    "ts": pd.to_datetime(["2024-07-01 11:30", "2024-07-01 11:05", "2024-07-01 14:59"]),
    "is_fraud": [0, 0, 1],
}).sort_values("ts")

training_rows = pd.merge_asof(transactions, features, on="ts", by="card_id", direction="backward")
print(training_rows.to_string(index=False))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">card_id                  ts  is_fraud  spend_24h
     c2 2024-07-01 11:05:00         0       35.0
     c1 2024-07-01 11:30:00         0      120.0
     c1 2024-07-01 14:59:00         1      480.0</code></pre>
<p>The fraudulent transaction at 14:59 gets the value known at 12:00 (480), not the 1,900 computed at 15:00 after the fraud happened: exactly what the model would have seen in production.</p>`
          },
          quiz: [
            { q: "What does a scheduler add over plain cron?", options: ["It runs jobs faster", "It understands task dependencies (DAGs), retries failures and queues jobs", "It provisions new machines", "It replaces the data warehouse"], answer: 1, explain: "Cron runs at fixed times without knowing dependencies; schedulers run DAGs with dependencies and failure handling. Orchestrators provision resources." },
            { q: "Which is a main drawback of Airflow mentioned for data science workflows?", options: ["It cannot be used with Python", "Monolithic packaging and static DAGs that are hard to make dynamic or parameterized", "It only runs on GPUs", "It has no scheduler"], answer: 1, explain: "Airflow packages the workflow in one container and its DAGs are static, which newer tools like Prefect, Argo, Kubeflow and Metaflow address in various ways." },
            { q: "What is a point-in-time correct join?", options: ["Joining tables at midnight", "Attaching to each training example the feature values that were known at that example's timestamp", "Joining the latest feature values to all rows", "A join that ignores time"], answer: 1, explain: "Using later feature values leaks future information; as-of joins (like pd.merge_asof) prevent this." },
            { q: "Which three problems does a feature store primarily address?", options: ["Labeling, augmentation and sampling", "Feature management, feature computation and feature consistency", "Model compression, quantization and pruning", "Logging, alerting and dashboards"], answer: 1, explain: "Feature stores catalog and share features, compute and store them, and keep training and serving definitions consistent." },
            { q: "A bank whose competitive advantage is not ML infrastructure is choosing tools. What does the build-vs-buy reasoning suggest?", options: ["Build everything in-house", "Lean toward buying or adopting mature tools, and build only what differentiates it", "Never use the cloud", "Avoid ML entirely"], answer: 1, explain: "If it is not your focus or advantage, buying is usually better; build what you want to be really good at." }
          ]
        },
        {
          id: "mlsys-infra-human-side",
          title: "The Human Side: User Experience, Team Structure and Responsible AI",
          minutes: 55,
          objectives: [
            "Design user experiences that account for probabilistic, mostly-correct and sometimes-slow ML predictions",
            "Compare team structures: separate ML and ops teams, end-to-end data scientists, and platform teams",
            "Apply a responsible AI framework: sources of bias, limits of data, trade-offs, acting early, model cards",
            "Analyze a real failure (the 2020 UK exam grading algorithm) and audit a model for disparate impact"
          ],
          body: String.raw`
<p>ML systems are built by people, used by people, and affect people. Technical excellence is not enough if users do not trust the predictions, if the team structure makes every deployment a negotiation, or if the system harms groups of people at scale. This final lesson covers the human side.</p>

<div class="callout book"><strong>Book:</strong> <em>Designing Machine Learning Systems</em>, Chapter 11, "The Human Side of Machine Learning".</div>

<h3>User experience</h3>
<p>ML systems differ from traditional software in ways users feel: they are <em>probabilistic</em> (the same input can produce different outputs at different times), <em>mostly correct</em> (and we usually do not know for which inputs they are wrong), and sometimes <em>slow</em>. Three challenges and their remedies:</p>
<h4>1. Ensuring user experience consistency</h4>
<p>Users expect apps to behave consistently. A travel site that used ML to suggest search filters (from about 200 options like "breakfast included" or "pet friendly") found that if suggestions changed every time, users got confused, especially when a filter they had already used disappeared. The team defined rules for when suggestions must stay the same (the user has applied a filter) and when they may change (the user changes destination). This is the <strong>consistency-accuracy trade-off</strong>: the most accurate prediction is not always the best experience.</p>
<h4>2. Combating "mostly correct" predictions</h4>
<p>Large models can produce impressive but imperfect outputs: generated code that almost works, a translation that is mostly right. For users who cannot verify the output (someone who cannot code, or does not speak the target language), "mostly correct" is risky. A common remedy is to show <strong>several candidate outputs</strong> and let the user choose, ideally with an easy way to edit or verify (for example, rendering generated web-page code so users can see the result). This is a human-in-the-loop design.</p>
<h4>3. Smooth failing</h4>
<p>If the model is too slow for some inputs, have a <strong>backup</strong>: a faster, simpler model or heuristic used when the main model would exceed the latency budget (some teams train a small model to predict whether the main model will be too slow for a query). Show cached or simpler results rather than a spinner. This trades a little accuracy for responsiveness.</p>

<h3>Team structure</h3>
<h4>Involve subject matter experts (SMEs)</h4>
<p>SMEs (doctors, lawyers, bankers, farmers) are often treated only as labelers. They should be involved throughout: problem framing, feature engineering, error analysis, evaluation, user interface design. No-code and low-code tools help SMEs contribute directly, for example by writing labeling functions or reviewing model errors.</p>
<h4>End-to-end data scientists or separate teams?</h4>
<p>Two common approaches to who handles production (MLOps):</p>
<ul>
  <li><strong>A separate team manages production.</strong> Data scientists develop models; an ML engineering or ops team deploys and maintains them. Advantages: easier hiring (specialists), each person focuses on one thing. Disadvantages: communication and coordination overhead, painful handoffs ("throw the model over the wall"), debugging is hard because nobody owns the whole system, finger-pointing when things break, and data scientists get a narrow, siloed view.</li>
  <li><strong>Data scientists own the entire process end to end.</strong> Advantages: ownership, fast iteration, understanding of the whole system. Disadvantage: it demands that a data scientist also be a strong engineer (containers, Kubernetes, streaming, monitoring), which is a lot. Many end up spending most of their time on infrastructure rather than modeling.</li>
</ul>
<p>The approach that works best at scale: data scientists own the process end to end, but a <strong>platform team</strong> builds tools that abstract away the infrastructure. Good tools let a data scientist say "run this step on a GPU, deploy this model with a canary" without writing Kubernetes configuration. As one platform engineer put it, data scientists should not need to know Kubernetes, in the same way that a web developer does not need to know how a CPU schedules threads. The ML engineer versus data scientist distinction becomes about emphasis (infrastructure vs modeling), not hand-offs.</p>

<h3>Responsible AI</h3>
<p>Responsible AI is the practice of designing, developing and deploying AI systems with good intention and sufficient awareness to empower users, engender trust, and ensure fair and positive impact on society. It includes fairness, privacy, transparency and accountability. It is not only the job of a policy team: as an ML practitioner, many decisions that shape these outcomes are yours.</p>

<h4>Case study: the 2020 UK exam grading algorithm</h4>
<p>In 2020, because of the pandemic, UK secondary school exams (A-levels) were canceled. The exam regulator, Ofqual, used an algorithm to assign grades. Rather than relying on teachers' assessments (which were expected to be inflated), the algorithm adjusted grades using, among other inputs, each school's historical performance. The outcome caused public outrage and was reversed within days. What went wrong, in ML-system terms:</p>
<ul>
  <li><strong>The wrong objective.</strong> The algorithm effectively optimized for keeping grade distributions consistent with schools' past results (fairness between cohorts and schools over time), rather than fairness to individual students. A brilliant student at a historically low-performing school could be downgraded because of the school's past, not their own work.</li>
  <li><strong>No fine-grained evaluation.</strong> The model's accuracy on historical data was modest, and it performed differently across groups: schools with more resources (often private) were better served, partly because small classes were treated differently and relied more on teacher assessments. Students from disadvantaged backgrounds were disproportionately downgraded. Slice-based evaluation would have exposed this before release.</li>
  <li><strong>No transparency.</strong> The methodology was published only on results day, teachers did not know how their assessments would be used, and there was no meaningful way to contest a grade before it was issued. Without transparency, there was no way to build trust or catch errors.</li>
</ul>
<p>A second well-known case: a fitness-tracking app published a global heatmap of its users' activities, with data "anonymized". It revealed the locations and patrol routes of military bases in sensitive regions, and the data could be used to identify individuals. The default privacy settings were to share, and opting out was hidden. Lesson: "anonymized" aggregate data can still reveal sensitive information, and responsible defaults matter more than settings most users never change.</p>

<h4>A framework for responsible AI</h4>
<ol>
  <li><strong>Discover sources of model bias.</strong> Bias can enter anywhere: <em>training data</em> (is it representative of the users the model will serve?), <em>labeling</em> (how subjective are labels, and how do you measure annotator quality?), <em>feature engineering</em> (does a feature, or a proxy for a protected attribute such as zip code standing in for race, cause <strong>disparate impact</strong>, meaning very different outcomes for different groups even when the process appears neutral?), the <em>model's objective</em> (does optimizing average performance favor the majority group?), and <em>evaluation</em> (is performance measured per group?).</li>
  <li><strong>Understand the limitations of the data-driven approach.</strong> Data reflects history, including its injustices. Work with domain experts and affected communities to understand what data does not capture.</li>
  <li><strong>Understand the trade-offs between different desiderata.</strong> <em>Privacy vs accuracy</em>: differential privacy protects individuals but lowers accuracy, and the drop is larger for underrepresented groups. <em>Compactness vs fairness</em>: compression (especially pruning) can preserve overall accuracy while degrading performance on rare, long-tail groups. When you use these techniques, audit more carefully.</li>
  <li><strong>Act early.</strong> Like poor-quality cement in a building's foundation, ethical problems discovered late cost far more to fix (or end in a public reversal, as above). Consider impact and bias from the project's scoping stage.</li>
  <li><strong>Create model cards.</strong> A model card is a short document that accompanies a model: details (version, owner), intended use and out-of-scope uses, factors (groups and conditions evaluated), metrics, evaluation and training data, ethical considerations, and caveats. Automate generating as much of it as possible from the model store, and update it at every retrain.</li>
  <li><strong>Establish processes for mitigating biases</strong>: internal tools and checklists, regular audits, and fairness tests in the deployment pipeline, just like performance tests.</li>
  <li><strong>Stay up to date</strong> on responsible AI research and regulation.</li>
</ol>

<h4>Hands-on: auditing for disparate impact</h4>
<p>A resume-screening model trained on biased historical hiring decisions. The group attribute is <em>not</em> a feature, but a proxy (<code>zip_score</code>) correlated with it is. A common screening heuristic is the "80% rule": the selection rate of the least-selected group should be at least 80% of the most-selected group's rate.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# A resume-screening model. 'group' is NOT a feature, but zip_score is correlated with it.
rng = np.random.default_rng(0)
n = 10_000
group = rng.choice(["group_1", "group_2"], size=n, p=[0.8, 0.2])
skill = rng.normal(0, 1, n)                                   # true job-relevant skill
zip_score = np.where(group == "group_1", 1.0, -1.0) + rng.normal(0, 0.5, n)   # proxy variable
experience = skill + rng.normal(0, 1, n)
hired_hist = (skill + 0.8 * zip_score + rng.normal(0, 0.5, n) &gt; 0.9).astype(int)  # biased history

X = pd.DataFrame({"experience": experience, "zip_score": zip_score})
X_tr, X_te, y_tr, y_te, g_tr, g_te = train_test_split(X, hired_hist, group, test_size=0.5, random_state=0)

def audit(cols, label):
    model = LogisticRegression().fit(X_tr[cols], y_tr)
    selected = model.predict(X_te[cols]) == 1
    rates = pd.Series(selected).groupby(np.asarray(g_te)).mean()
    ratio = rates.min() / rates.max()
    flag = "FAILS" if ratio &lt; 0.8 else "passes"
    print(f"{label:30s} selection rate {rates.round(3).to_dict()} | "
          f"disparate-impact ratio {ratio:.2f} ({flag} the 80% rule)")

audit(["experience", "zip_score"], "with proxy feature zip_score")
audit(["experience"], "without zip_score")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">with proxy feature zip_score   selection rate {'group_1': 0.457, 'group_2': 0.022} | disparate-impact ratio 0.05 (FAILS the 80% rule)
without zip_score              selection rate {'group_1': 0.301, 'group_2': 0.311} | disparate-impact ratio 0.97 (passes the 80% rule)</code></pre>
<p>With the proxy, group 2 is selected 2.2% of the time versus 45.7% for group 1, a disparate-impact ratio of 0.05: the model reproduced and amplified the historical bias even though group membership was never a feature. Removing the proxy brings the ratio to 0.97. In reality proxies are rarely this clean (many features correlate a little with protected attributes), so audits must check outcomes per group, not just the feature list. Passing the 80% rule is also not proof of fairness; other criteria (equal error rates across groups, calibration within groups) can conflict with it, which is exactly the kind of trade-off to make explicit and document.</p>
<p>A minimal model card for such a model, stored next to the artifact in the model store:</p>
<pre><code class="lang-python runnable">import json

model_card = {
    "model": "resume-screener v4",
    "intended_use": "Rank applications for recruiter review; never auto-reject.",
    "out_of_scope": ["Final hiring decisions", "Roles outside engineering"],
    "training_data": "Applications 2021-2024, 52k rows; labels = advanced to interview",
    "known_biases": "Historical labels reflect past recruiter decisions; zip code removed as a proxy",
    "metrics": {"overall_auc": 0.81, "auc_by_gender": {"female": 0.80, "male": 0.81}},
    "fairness_check": {"disparate_impact_ratio": 0.93, "threshold": 0.8, "passes": True},
    "limitations": "Weaker on non-English resumes (AUC 0.72); re-audit after every retrain",
    "owner": "talent-ml team", "last_audit": "2024-06-01",
}
print(json.dumps(model_card, indent=1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{
 "model": "resume-screener v4",
 "intended_use": "Rank applications for recruiter review; never auto-reject.",
 "out_of_scope": [
  "Final hiring decisions",
  "Roles outside engineering"
 ],
 "training_data": "Applications 2021-2024, 52k rows; labels = advanced to interview",
 "known_biases": "Historical labels reflect past recruiter decisions; zip code removed as a proxy",
 "metrics": {
  "overall_auc": 0.81,
  "auc_by_gender": {
   "female": 0.8,
   "male": 0.81
  }
 },
 "fairness_check": {
  "disparate_impact_ratio": 0.93,
  "threshold": 0.8,
  "passes": true
 },
 "limitations": "Weaker on non-English resumes (AUC 0.72); re-audit after every retrain",
 "owner": "talent-ml team",
 "last_audit": "2024-06-01"
}</code></pre>

<div class="callout tip"><strong>Tip:</strong> Treat fairness checks like unit tests: define the slices and thresholds up front, run them automatically on every candidate model, and block promotion when they fail, the same way a failing accuracy gate would.</div>
`,
          keyPoints: [
            "ML predictions are probabilistic, mostly correct and sometimes slow; design for consistency, let users choose among candidates, and fail smoothly with backups.",
            "Involve subject matter experts throughout the lifecycle, not just for labeling.",
            "Separate dev and ops teams create handoff overhead; end-to-end ownership works best when a platform team abstracts infrastructure.",
            "Bias can enter through data, labels, features (including proxies), objectives and evaluation; disparate impact can occur without using protected attributes.",
            "The UK 2020 grading case shows the cost of a misaligned objective, missing slice evaluation and lack of transparency.",
            "Responsible AI: know trade-offs (privacy vs accuracy, compactness vs fairness), act early, write model cards, and automate fairness checks."
          ],
          exercise: {
            prompt: String.raw`<p>You are launching a model that pre-approves small-business loans. Write a responsible AI review covering: (1) at least four potential sources of bias in this system and how you would check each; (2) one trade-off you must make explicit; (3) the UX for applicants (including how they learn why a decision was made and how to contest it); (4) the release gates. Then write a Python function that computes selection rates per group, the disparate-impact ratio, and the true positive rate per group (equal opportunity), and run it on a small example.</p>`,
            solution: String.raw`<p><strong>(1) Bias sources and checks.</strong> <em>Training data</em>: past approvals over-represent certain regions and industries; compare training-data composition with the applicant population. <em>Labels</em>: "repaid" is only observed for businesses that were approved (selection bias); consider reject inference or randomized small approvals, and document the limitation. <em>Features/proxies</em>: zip code, business name language, bank branch can proxy for ethnicity; measure their correlation with protected attributes and test outcomes with and without them. <em>Objective</em>: optimizing overall default rate may sacrifice accuracy for small groups; report per-group metrics. <em>Evaluation</em>: slice by region, owner gender (where legally collected for auditing), business age and industry.</p>
<p><strong>(2) Trade-off.</strong> Interpretability vs accuracy: a gradient-boosted model may be slightly more accurate, but applicants are legally entitled to reasons; choose a model whose reasons (e.g. SHAP-based reason codes) can be reliably explained, and document the cost.</p>
<p><strong>(3) UX.</strong> Never auto-decline: pre-approve or route to a human underwriter. Show the main factors behind a decision in plain language, what would change it, and a one-click path to request human review with additional documents.</p>
<p><strong>(4) Release gates.</strong> Slice metrics within tolerance; disparate-impact ratio above 0.8 and TPR gap below 5 points across audited groups; model card complete; shadow deployment comparing with current underwriting decisions; quarterly re-audit and after each retrain.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

def fairness_report(y_true, y_pred, group):
    df = pd.DataFrame({"y": y_true, "pred": y_pred, "group": group})
    selection = df.groupby("group")["pred"].mean()
    tpr = df[df["y"] == 1].groupby("group")["pred"].mean()   # recall among truly creditworthy
    return pd.DataFrame({"selection_rate": selection, "true_positive_rate": tpr}).round(2), \
           round(selection.min() / selection.max(), 2), round(tpr.max() - tpr.min(), 2)

y_true = np.array([1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0])
y_pred = np.array([1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0])
group  = np.array(["A"] * 6 + ["B"] * 6)
table, di_ratio, tpr_gap = fairness_report(y_true, y_pred, group)
print(table)
print("disparate-impact ratio:", di_ratio, "| TPR gap:", tpr_gap)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">       selection_rate  true_positive_rate
group                                    
A                0.67                0.75
B                0.33                0.67
disparate-impact ratio: 0.5 | TPR gap: 0.08</code></pre>
<p>Group B is selected half as often as group A (ratio 0.5, failing the 80% rule), and creditworthy applicants in group B are approved 8 points less often. Both would block release and trigger investigation of features and thresholds.</p>`
          },
          quiz: [
            { q: "A filter-suggestion feature keeps changing its suggestions and confuses users. Which trade-off is this?", options: ["Privacy vs accuracy", "Consistency vs accuracy", "Latency vs throughput", "Compactness vs fairness"], answer: 1, explain: "The most accurate suggestions at each moment may change too often; rules that keep suggestions stable improve experience at some cost in accuracy." },
            { q: "What team structure tends to work best for ML at scale?", options: ["Data scientists hand models to a separate ops team", "Data scientists own models end to end, supported by a platform team that abstracts infrastructure", "No dedicated ML staff", "Only ML engineers, no data scientists"], answer: 1, explain: "End-to-end ownership avoids handoff problems, and good platform tools keep data scientists from drowning in infrastructure." },
            { q: "A hiring model does not use race as a feature, yet selects one racial group far less. How is this possible?", options: ["It is impossible", "Other features (such as zip code) act as proxies, causing disparate impact", "The model is underfitting", "Because of quantization"], answer: 1, explain: "Disparate impact can arise from features correlated with protected attributes, even when those attributes are excluded." },
            { q: "In the 2020 UK grading case, which problem would slice-based evaluation most directly have revealed?", options: ["Server latency", "That students at historically lower-performing or less-resourced schools were disproportionately downgraded", "The file format of the results", "That the model was too small"], answer: 1, explain: "Evaluating outcomes by school type and background would have shown the uneven impact before release." },
            { q: "What is a model card?", options: ["A GPU accelerator", "A short document describing a model's intended use, data, metrics by group, limitations and ethical considerations", "A credit card for cloud spending", "A type of feature store"], answer: 1, explain: "Model cards document what a model is for, how it was evaluated (including per group) and its caveats, supporting transparency and accountability." }
          ]
        }
      ]
    }
  ]
});
