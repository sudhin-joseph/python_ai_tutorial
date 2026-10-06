window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "ml",
  order: 3,
  title: "Machine Learning Fundamentals",
  level: "Beginner → Intermediate",
  icon: "🤖",
  description: "Learn how machines learn from data: regression, classification, evaluation, feature engineering, clustering and PCA — hands-on with scikit-learn — and finish by training, saving and serving a real model as a REST API.",
  outcomes: [
    "Explain what machine learning is, the main types of learning, and the end-to-end ML workflow",
    "Train and interpret linear regression, logistic regression, k-NN, decision trees, random forests and gradient boosting with scikit-learn",
    "Evaluate models honestly with train/validation/test splits, cross-validation and the right metric for the problem",
    "Diagnose overfitting and underfitting and fix them with regularization and hyperparameter tuning",
    "Build leak-free preprocessing with Pipeline and ColumnTransformer, and handle missing values, categories and class imbalance",
    "Use clustering, PCA and anomaly detection on unlabeled data",
    "Ship an end-to-end project: a saved scikit-learn pipeline served through a FastAPI prediction endpoint"
  ],
  modules: [
    {
      id: "ml-intro",
      title: "What Machine Learning Is",
      summary: "AI vs ML vs deep learning, the types of learning, the ML workflow, and the vocabulary every later lesson uses.",
      lessons: [
        {
          id: "ml-intro-what-is-ml",
          title: "AI, Machine Learning and Deep Learning",
          minutes: 40,
          objectives: [
            "Explain how AI, machine learning and deep learning relate to each other",
            "Contrast writing rules by hand with learning rules from data",
            "Train your very first model with scikit-learn and compare it with a hand-written rule",
            "Decide when machine learning is (and is not) the right tool"
          ],
          body: String.raw`
<p>You have spent the earlier tracks learning Python, NumPy, Pandas and the math of vectors, gradients and probability. This track is where all of that turns into something new: programs that <strong>learn from examples</strong> instead of being told exactly what to do. By the end of the track you will train, evaluate, save and serve a real model as a web API.</p>

<h3>Three nested ideas: AI, ML and deep learning</h3>
<p>People use these three words loosely, so let us pin them down.</p>
<ul>
  <li><strong>Artificial intelligence (AI)</strong> is the broad goal: make computers do tasks that seem to need intelligence — recognising speech, playing chess, translating text, recommending a film. AI says nothing about <em>how</em>. A chess program built from thousands of hand-written rules is AI.</li>
  <li><strong>Machine learning (ML)</strong> is one way to build AI: instead of writing the rules yourself, you give the computer <em>examples</em> and an algorithm finds the rules (a "model") that explain those examples. Spam filters, credit scoring, demand forecasting and fraud detection are almost all ML today.</li>
  <li><strong>Deep learning (DL)</strong> is a family of ML methods that uses large <em>neural networks</em> with many layers. It shines on unstructured data — images, audio, free text — and powers modern large language models. You will meet it in a later track.</li>
</ul>
<p>So the picture is a set of circles: deep learning sits inside machine learning, which sits inside AI. Every deep learning system is ML, but most ML used in business (on spreadsheets and database tables) is <em>not</em> deep learning — it is the "classic" ML this track teaches: linear models, decision trees, random forests, gradient boosting and friends.</p>

<h3>Rules vs learning from data</h3>
<p>In traditional programming you write the logic: <em>data + rules → answers</em>. A programmer who wants to flag spam might write: "if the message contains the word FREE and more than two links, call it spam". This works until spammers change their wording, and then someone has to rewrite the rules — forever.</p>
<p>Machine learning flips the arrows: <em>data + answers → rules</em>. You collect thousands of messages that humans already labelled "spam" or "not spam", and a learning algorithm searches for the rule that best separates the two groups. When spammers change tactics you collect fresh labelled examples and <em>retrain</em> — no rewriting of logic by hand.</p>
<table>
  <thead><tr><th></th><th>Traditional programming</th><th>Machine learning</th></tr></thead>
  <tbody>
    <tr><td>Input</td><td>Data + hand-written rules</td><td>Data + known answers (examples)</td></tr>
    <tr><td>Output</td><td>Answers</td><td>A model (learned rules) that produces answers for new data</td></tr>
    <tr><td>When the world changes</td><td>A human rewrites the rules</td><td>Retrain on new examples</td></tr>
    <tr><td>Best when</td><td>Rules are simple, known and stable (tax brackets, unit conversion)</td><td>Rules are too complex or too fuzzy to write down (faces, fraud, demand)</td></tr>
  </tbody>
</table>

<h3>Your first comparison: a hand-written rule vs a learned model</h3>
<p>Let us make that concrete. Below is a tiny made-up dataset of messages described by three numbers: how many links they contain, how many exclamation marks, and whether the word "free" appears. Each message has an answer (the <strong>label</strong>): 1 for spam, 0 for not spam. First we write a rule by hand, then we let scikit-learn learn one.</p>
<pre><code class="lang-python runnable">import pandas as pd

# Each row is one message; the last column is the human-provided answer.
data = pd.DataFrame({
    "links":       [0, 3, 1, 5, 0, 2, 4, 0, 1, 6, 0, 2],
    "exclaims":    [0, 4, 0, 6, 1, 1, 0, 0, 3, 2, 0, 5],
    "has_free":    [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    "is_spam":     [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
})

# Traditional programming: a human writes the rule.
def hand_rule(row):
    return 1 if (row["has_free"] == 1 and row["links"] &gt; 2) else 0

data["rule_pred"] = data.apply(hand_rule, axis=1)
accuracy = (data["rule_pred"] == data["is_spam"]).mean()
print(data)
print(f"Hand-written rule accuracy: {accuracy:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">    links  exclaims  has_free  is_spam  rule_pred
0       0         0         0        0          0
1       3         4         1        1          1
2       1         0         0        0          0
3       5         6         1        1          1
4       0         1         0        0          0
5       2         1         0        0          0
6       4         0         1        1          1
7       0         0         1        0          0
8       1         3         0        0          0
9       6         2         1        1          1
10      0         0         0        0          0
11      2         5         1        1          0
Hand-written rule accuracy: 0.92</code></pre>
<p>The rule gets 11 of 12 right but misses one spam message (row 11: two links, five exclamation marks, contains "free"). We could keep tweaking it by hand, or we could let an algorithm find a rule. Here we use a <strong>decision tree</strong>, a model that learns a sequence of yes/no questions (you will study it properly in the classification module).</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text

data = pd.DataFrame({
    "links":       [0, 3, 1, 5, 0, 2, 4, 0, 1, 6, 0, 2],
    "exclaims":    [0, 4, 0, 6, 1, 1, 0, 0, 3, 2, 0, 5],
    "has_free":    [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    "is_spam":     [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
})
X = data[["links", "exclaims", "has_free"]]   # the inputs (features)
y = data["is_spam"]                           # the answers (labels)

model = DecisionTreeClassifier(max_depth=2, random_state=0)
model.fit(X, y)            # "learning": search for rules that fit the examples

print(export_text(model, feature_names=list(X.columns)))
print("Learned-model accuracy on these examples:", model.score(X, y))

# Use the learned rules on a message the model has never seen
new_message = pd.DataFrame({"links": [3], "exclaims": [2], "has_free": [0]})
print("Prediction for new message:", model.predict(new_message)[0])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">|--- links &lt;= 1.50
|   |--- class: 0
|--- links &gt;  1.50
|   |--- has_free &lt;= 0.50
|   |   |--- class: 0
|   |--- has_free &gt;  0.50
|   |   |--- class: 1

Learned-model accuracy on these examples: 1.0
Prediction for new message: 0</code></pre>
<p>Read the printed tree from top to bottom: it is a set of <em>if/else</em> rules, exactly like the ones a programmer would write — except nobody wrote them. The algorithm found the thresholds (for example a cut-off on the number of links) by searching for the splits that best separate spam from non-spam. That is the essence of machine learning: <strong>the program's logic is estimated from data</strong>.</p>
<div class="callout warn"><strong>Common mistake:</strong> celebrating "100% accuracy" measured on the very examples the model learned from. A model can memorise its training examples and still fail on new ones. Measuring performance on data the model has <em>not</em> seen is the single most important habit in ML, and the evaluation module is devoted to it.</div>

<h3>What a "model" really is</h3>
<p>A <strong>model</strong> is just a function with adjustable knobs. A straight line <code>y = w·x + b</code> is a model whose knobs are <code>w</code> and <code>b</code>. A decision tree is a model whose knobs are which feature to ask about at each step and which threshold to use. <strong>Training</strong> (also called <em>fitting</em> or <em>learning</em>) means turning those knobs until the function's outputs match the known answers as closely as possible. That "as closely as possible" is measured by a <strong>loss function</strong> — a number that is large when the model is wrong and small when it is right. In the math track you learned gradient descent: that is one of the main tools for turning the knobs to reduce the loss.</p>

<h3>When should you use ML?</h3>
<p>ML is powerful but not free: you need data, you need to evaluate carefully, and you need to maintain the model after deployment. A good checklist before reaching for ML:</p>
<ol>
  <li><strong>Is there a pattern to learn?</strong> Predicting house prices from size and location: yes. Predicting a fair coin toss: no — nothing to learn.</li>
  <li><strong>Is the pattern too complex to write by hand?</strong> If three <code>if</code> statements solve it, write them.</li>
  <li><strong>Do you have data (or can you get it)?</strong> Usually examples with known answers. No data, no learning.</li>
  <li><strong>Is it OK to be wrong sometimes?</strong> ML predictions are probabilistic. A movie recommendation can be wrong; a pacemaker's control logic must not be "usually right".</li>
  <li><strong>Will it be used repeatedly at scale?</strong> ML pays off when the same kind of decision is made thousands or millions of times.</li>
</ol>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em> (Chip Huyen), Ch. 1 "Overview of Machine Learning Systems", discusses exactly this question — when ML is the right solution, and how ML in production differs from ML in research. Read it after this module for a broader view.</div>

<h3>Where you are heading</h3>
<p>Here is the road map of this track:</p>
<ul>
  <li><strong>Regression</strong> — predicting numbers (prices, temperatures) with linear models, which you will fit by gradient descent from scratch.</li>
  <li><strong>Classification</strong> — predicting categories (spam/not spam, disease/healthy) with logistic regression, k-nearest neighbours, trees and ensembles.</li>
  <li><strong>Evaluation</strong> — how to know if a model is any good: splits, cross-validation, metrics, overfitting and tuning.</li>
  <li><strong>Features</strong> — preparing messy real data: missing values, categories, scaling, pipelines and data leakage.</li>
  <li><strong>Unsupervised learning</strong> — finding structure without labels: clustering, PCA, anomaly detection.</li>
  <li><strong>Project</strong> — an end-to-end model served as a REST API.</li>
</ul>
<div class="callout tip"><strong>Tip:</strong> every runnable example in this track is self-contained. Run them, then change a number and run again. Predicting what will change <em>before</em> you run is the fastest way to build intuition.</div>
`,
          keyPoints: [
            "AI is the goal; machine learning is a way to reach it by learning from examples; deep learning is ML with large neural networks.",
            "Traditional programming: data + rules -> answers. Machine learning: data + answers -> rules (a model).",
            "A model is a function with adjustable parameters; training adjusts them to minimise a loss.",
            "Always judge a model on data it has not seen during training.",
            "Use ML when there is a real pattern, it is too complex to hand-code, data exists, and occasional errors are acceptable."
          ],
          exercise: {
            prompt: String.raw`<p>Using the 12-message spam DataFrame from the lesson, (1) write your own hand-written rule that beats the lesson's rule (which scored 0.92) — aim for 1.00, and (2) train a <code>DecisionTreeClassifier(max_depth=1, random_state=0)</code> — a tree allowed to ask only ONE question. Print the single rule it learned and its accuracy. Which feature did it choose?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text

data = pd.DataFrame({
    "links":       [0, 3, 1, 5, 0, 2, 4, 0, 1, 6, 0, 2],
    "exclaims":    [0, 4, 0, 6, 1, 1, 0, 0, 3, 2, 0, 5],
    "has_free":    [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    "is_spam":     [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
})
X, y = data[["links", "exclaims", "has_free"]], data["is_spam"]

def my_rule(row):
    # spam if it says "free" AND has at least one link or several exclamation marks
    return 1 if row["has_free"] == 1 and (row["links"] &gt;= 2 or row["exclaims"] &gt;= 3) else 0

acc = (data.apply(my_rule, axis=1) == y).mean()
print(f"My rule accuracy: {acc:.2f}")

stump = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X, y)
print(export_text(stump, feature_names=list(X.columns)))
print("Stump accuracy:", round(stump.score(X, y), 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">My rule accuracy: 1.00
|--- links &lt;= 1.50
|   |--- class: 0
|--- links &gt;  1.50
|   |--- class: 1

Stump accuracy: 0.92</code></pre>
<p>The one-question tree (called a <em>decision stump</em>) picks whichever single split separates the classes best. Notice that you had to inspect the data and reason to write your rule, while the tree found a comparable rule automatically. With 3 features that is easy for a human; with 300 features it is not — that is where learning wins.</p>`
          },
          quiz: [
            { q: "Which statement best describes the relationship between AI, ML and deep learning?", options: ["They are three unrelated fields", "Deep learning is a subset of ML, which is a subset of AI", "AI is a subset of ML", "ML is a subset of deep learning"], answer: 1, explain: "AI is the broad goal, ML is one approach to it (learning from data), and deep learning is a family of ML methods using multi-layer neural networks." },
            { q: "In machine learning, what does the learning algorithm produce?", options: ["Labelled data", "A model: a function with learned parameters that maps inputs to outputs", "Hand-written if/else rules from a programmer", "A database"], answer: 1, explain: "ML takes data plus known answers and outputs a model (the learned rules) that can then make predictions on new inputs." },
            { q: "Which task is the WORST fit for machine learning?", options: ["Detecting fraudulent card transactions", "Converting Celsius to Fahrenheit", "Recommending products", "Recognising handwritten digits"], answer: 1, explain: "Celsius to Fahrenheit is an exact, known, stable formula. Writing it directly is simpler and always correct; there is nothing to learn." },
            { q: "A model scores 100% accuracy on the examples it was trained on. What can you conclude?", options: ["It will be 100% accurate in production", "Very little — it may have memorised the training data; you must test on unseen data", "The data must be wrong", "It is underfitting"], answer: 1, explain: "Training accuracy says nothing reliable about performance on new data. A model can memorise examples. Only evaluation on held-out data tells you how well it generalises." }
          ]
        },
        {
          id: "ml-intro-types",
          title: "Types of Learning: Supervised, Unsupervised, Self-Supervised, Reinforcement",
          minutes: 45,
          objectives: [
            "Distinguish supervised, unsupervised, self-supervised and reinforcement learning",
            "Tell regression from classification problems",
            "Give real-world examples of each type of learning",
            "Run a tiny example of each type in Python"
          ],
          body: String.raw`
<p>Machine learning problems are grouped by <strong>what kind of feedback the learner gets</strong>. Knowing the type of your problem tells you which algorithms apply, what data you must collect and how to evaluate the result. There are four big families.</p>
<figure><img alt="Four panels comparing supervised, unsupervised, self-supervised and reinforcement learning: what data each uses and what it learns" src="assets/diagrams/ml-learning-types.svg"><figcaption>The four families of machine learning, defined by the feedback the learner receives.</figcaption></figure>

<h3>1. Supervised learning: learning from labelled examples</h3>
<p>In <strong>supervised learning</strong> every training example comes with the correct answer, called the <strong>label</strong> (or <em>target</em>). The model learns a mapping from inputs to labels, like a student studying with an answer key. It is by far the most common type in industry.</p>
<p>Supervised problems come in two flavours, depending on what the label is:</p>
<ul>
  <li><strong>Regression</strong>: the label is a <em>number</em> on a continuous scale. Examples: the price of a house, tomorrow's electricity demand, how many minutes a delivery will take.</li>
  <li><strong>Classification</strong>: the label is a <em>category</em>. With two categories it is <em>binary</em> classification (spam / not spam, will churn / won't churn); with more it is <em>multiclass</em> (which of 10 digits is in this image, which of 3 iris species is this flower).</li>
</ul>
<p>A quick test: "could the answer sensibly be 2.5?" If yes, regression. If the answers are names of buckets, classification. Note that a classifier can still output a <em>probability</em> ("82% chance of spam") — it is still classification because the thing being predicted is a category.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression

iris = load_iris()
X, y = iris.data, iris.target            # 150 flowers, 4 measurements each, species label 0/1/2
print("Features:", iris.feature_names)
print("Classes :", iris.target_names.tolist())
print("First flower:", X[0], "-&gt; label", y[0])

clf = LogisticRegression(max_iter=1000)  # a supervised classifier
clf.fit(X, y)                            # learns from inputs AND labels

new_flower = [[6.1, 2.8, 4.7, 1.2]]
pred = clf.predict(new_flower)[0]
print("Predicted species for new flower:", iris.target_names[pred])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Features: ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']
Classes : ['setosa', 'versicolor', 'virginica']
First flower: [5.1 3.5 1.4 0.2] -&gt; label 0
Predicted species for new flower: versicolor</code></pre>

<h3>2. Unsupervised learning: finding structure without labels</h3>
<p>In <strong>unsupervised learning</strong> there are no labels at all — just inputs. The algorithm looks for structure on its own. Typical tasks:</p>
<ul>
  <li><strong>Clustering</strong>: group similar items. A shop groups customers into segments by purchasing behaviour without anyone defining the segments first.</li>
  <li><strong>Dimensionality reduction</strong>: compress many features into a few while keeping most of the information, e.g. to plot 64-dimensional data in 2-D.</li>
  <li><strong>Anomaly detection</strong>: flag items that look unlike the rest, e.g. a strange login pattern.</li>
</ul>
<p>Labels are expensive (a human must provide each one), so unsupervised methods are valuable for exploring data and for finding things nobody thought to label. The trade-off: there is no answer key, so judging the result is harder. Below, k-means groups the iris flowers into 3 clusters <em>without ever seeing the species</em>; we then peek at the true species only to see how well the discovered groups line up.</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans

iris = load_iris()
X = iris.data                          # NOTE: we do not pass the labels to the algorithm

km = KMeans(n_clusters=3, n_init=10, random_state=42)
clusters = km.fit_predict(X)

# Only now do we compare clusters with the true species, out of curiosity
print(pd.crosstab(pd.Series(iris.target_names[iris.target], name="true species"),
                  pd.Series(clusters, name="cluster")))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">cluster        0   1   2
true species            
setosa         0  50   0
versicolor    48   0   2
virginica     14   0  36</code></pre>
<p>One cluster matches <em>setosa</em> perfectly; the other two mostly match <em>versicolor</em> and <em>virginica</em>, with some mixing because those two species overlap in their measurements. The cluster numbers themselves (0, 1, 2) are arbitrary names — the algorithm does not know what a "species" is.</p>

<h3>3. Self-supervised learning: the data labels itself</h3>
<p><strong>Self-supervised learning</strong> is a clever middle ground: the labels are <em>generated automatically from the data itself</em>, so you get the power of supervised learning without paying humans to label. The classic example is how large language models (LLMs) such as GPT are pre-trained: take any sentence, hide the next word, and ask the model to predict it. Every sentence on the internet becomes many free training examples. Image models do the same by hiding patches of an image and predicting them.</p>
<pre><code class="lang-python runnable">text = "the cat sat on the mat"
words = text.split()

# Build (input, label) pairs automatically: context -&gt; next word
pairs = [(" ".join(words[:i]), words[i]) for i in range(1, len(words))]
for context, target in pairs:
    print(f"input: {context!r:28} label: {target!r}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">input: 'the'                        label: 'cat'
input: 'the cat'                    label: 'sat'
input: 'the cat sat'                label: 'on'
input: 'the cat sat on'             label: 'the'
input: 'the cat sat on the'         label: 'mat'</code></pre>
<p>One six-word sentence produced five labelled examples with zero human effort. Scale that to trillions of words and you have the training data for an LLM. You will study this in depth in the deep learning and LLM tracks.</p>

<h3>4. Reinforcement learning: learning from rewards</h3>
<p>In <strong>reinforcement learning (RL)</strong> an <em>agent</em> takes <em>actions</em> in an <em>environment</em> and receives <em>rewards</em> (or penalties). Nobody tells it the right action; it must discover by trial and error which actions lead to the most reward over time. Examples: game-playing agents (AlphaGo), robot control, and RLHF (reinforcement learning from human feedback), the step that makes chatbots helpful by rewarding answers people prefer.</p>
<p>The key tension in RL is <strong>exploration vs exploitation</strong>: keep using the action that seems best so far, or try others that might be better? Here is the simplest RL problem — a "multi-armed bandit": three slot machines with unknown win rates, and an agent that learns which to play using the <em>epsilon-greedy</em> strategy (explore randomly 10% of the time, otherwise exploit the best estimate).</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
true_win_rates = [0.2, 0.5, 0.75]       # hidden from the agent
estimates = np.zeros(3)                 # agent's belief about each machine
counts = np.zeros(3)
total_reward = 0

for step in range(2000):
    if rng.random() &lt; 0.1:               # explore
        arm = rng.integers(3)
    else:                               # exploit the best estimate so far
        arm = int(np.argmax(estimates))
    reward = 1 if rng.random() &lt; true_win_rates[arm] else 0
    counts[arm] += 1
    estimates[arm] += (reward - estimates[arm]) / counts[arm]   # running average
    total_reward += reward

print("Estimated win rates:", estimates.round(2))
print("Times each machine was played:", counts.astype(int))
print("Average reward per play:", round(total_reward / 2000, 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Estimated win rates: [0.19 0.46 0.75]
Times each machine was played: [  81   72 1847]
Average reward per play: 0.718</code></pre>
<p>Without ever being told which machine is best, the agent ends up playing the 0.75 machine most of the time and its average reward approaches the best possible. Notice that it learned from <em>rewards for its own actions</em>, not from a labelled dataset — that is what makes RL different.</p>
<div class="callout warn"><strong>Common mistake:</strong> confusing RL with supervised learning "because the reward is a kind of label". The difference: in supervised learning you are told the correct answer for every input; in RL you only learn how good the action you <em>chose</em> was, and often only much later (a chess game is won or lost at the end).</div>

<h3>Summary table</h3>
<table>
  <thead><tr><th>Type</th><th>Training signal</th><th>Typical tasks</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Supervised</td><td>Human-provided labels</td><td>Regression, classification</td><td>House prices, spam filter, medical diagnosis</td></tr>
    <tr><td>Unsupervised</td><td>None (inputs only)</td><td>Clustering, dimensionality reduction, anomaly detection</td><td>Customer segments, fraud outliers</td></tr>
    <tr><td>Self-supervised</td><td>Labels generated from the data itself</td><td>Pre-training on text/images</td><td>LLM next-word prediction</td></tr>
    <tr><td>Reinforcement</td><td>Rewards for chosen actions</td><td>Sequential decision making</td><td>Game agents, robotics, RLHF</td></tr>
  </tbody>
</table>
<p>You may also hear <strong>semi-supervised learning</strong> (a few labelled examples plus many unlabelled ones). It is a blend of the first two families. Most of this track is supervised learning, with one module on unsupervised learning.</p>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 4 "Training Data", explains why labels are often the bottleneck in real projects and discusses ways around it (weak supervision, semi-supervision, active learning).</div>
`,
          keyPoints: [
            "Supervised learning uses labelled examples; regression predicts numbers, classification predicts categories.",
            "Unsupervised learning finds structure (clusters, low-dimensional views, anomalies) with no labels.",
            "Self-supervised learning creates labels automatically from the data — the basis of LLM pre-training.",
            "Reinforcement learning learns from rewards for the actions an agent chooses, balancing exploration and exploitation.",
            "Identifying the problem type first tells you which algorithms and metrics apply."
          ],
          exercise: {
            prompt: String.raw`<p>Classify each problem as supervised regression, supervised classification, unsupervised, self-supervised or reinforcement learning: (a) predict a flat's monthly rent; (b) decide whether an X-ray shows pneumonia; (c) group news articles by topic with no topic labels; (d) train a model to fill in a masked word in Wikipedia sentences; (e) teach a robot arm to stack blocks by rewarding success. Then write code that turns the <code>load_diabetes</code> dataset into a <em>classification</em> problem by labelling patients whose disease progression is above the median as 1, and train a <code>LogisticRegression(max_iter=1000)</code> on it.</p>`,
            solution: String.raw`<p>(a) supervised regression — rent is a number; (b) supervised classification — two categories; (c) unsupervised clustering; (d) self-supervised — the hidden word is the automatic label; (e) reinforcement learning — the robot learns from rewards.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LogisticRegression

X, y_progress = load_diabetes(return_X_y=True)   # y is a number -&gt; regression target
threshold = np.median(y_progress)
y_class = (y_progress &gt; threshold).astype(int)    # turn it into 2 categories
print("Median progression:", threshold)
print("Class counts:", np.bincount(y_class))

clf = LogisticRegression(max_iter=1000).fit(X, y_class)
print("Training accuracy:", round(clf.score(X, y_class), 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Median progression: 140.5
Class counts: [221 221]
Training accuracy: 0.753</code></pre>
<p>The same dataset can be framed as regression or classification — the framing is a <em>decision you make</em> based on what the business needs (an exact number, or a yes/no flag). Thresholding at the median gives two balanced classes.</p>`
          },
          quiz: [
            { q: "You want to predict how many days a patient will stay in hospital. What kind of problem is this?", options: ["Classification", "Regression", "Clustering", "Reinforcement learning"], answer: 1, explain: "The label is a number on a continuous scale (days), so it is supervised regression." },
            { q: "What makes self-supervised learning different from ordinary supervised learning?", options: ["It uses no data", "The labels are generated automatically from the data itself", "It only works on images", "It uses rewards instead of labels"], answer: 1, explain: "Self-supervised learning still trains on (input, label) pairs, but the labels come from the data (e.g. the next word), so no human labelling is needed." },
            { q: "A store wants to discover customer segments but has no predefined segment labels. Which approach fits?", options: ["Supervised classification", "Regression", "Unsupervised clustering", "Reinforcement learning"], answer: 2, explain: "With no labels and the goal of grouping similar items, clustering (unsupervised) is the natural choice." },
            { q: "In reinforcement learning, what is the exploration vs exploitation trade-off?", options: ["Choosing between regression and classification", "Choosing between trying new actions to learn more and using the action that currently looks best", "Choosing how many features to use", "Choosing a train/test split"], answer: 1, explain: "An RL agent must balance exploiting its current best action with exploring other actions that might turn out better." }
          ]
        },
        {
          id: "ml-intro-workflow",
          title: "The ML Workflow and Core Vocabulary",
          minutes: 45,
          objectives: [
            "Describe each stage of the ML workflow from problem framing to monitoring",
            "Use the core vocabulary: feature, label, sample, model, parameter, hyperparameter, training, inference, generalization",
            "Use scikit-learn's fit / predict / score API",
            "Run a complete mini workflow on a real bundled dataset"
          ],
          body: String.raw`
<p>Training a model is one step in a much longer process. Beginners often think ML is "call <code>fit</code>"; practitioners know that most of the time goes into framing the problem, preparing data and checking the result. This lesson gives you the map of the whole journey and the vocabulary used for the rest of the course.</p>

<h3>The ML workflow</h3>
<figure><img alt="The ML lifecycle loop: business problem, ML objective and metrics, data collection, train and evaluate, deploy, monitor, and back to data" src="assets/diagrams/ml-lifecycle.svg"><figcaption>The ML lifecycle is a loop: monitoring in production feeds back into new data and retraining.</figcaption></figure>
<ol>
  <li><strong>Problem framing.</strong> Start from the business question ("reduce customer churn") and turn it into an ML task ("predict, for each customer, the probability they cancel in the next 30 days — a binary classification"). Decide how success will be measured, both in business terms (fewer cancellations) and model terms (e.g. recall at a given precision). Ask whether ML is needed at all.</li>
  <li><strong>Data.</strong> Collect examples, and for supervised learning, labels. Explore them: how many rows, missing values, strange values, class balance. Data quality caps model quality — "garbage in, garbage out".</li>
  <li><strong>Features.</strong> Turn raw data into numeric inputs a model can use: fill missing values, encode categories, scale numbers, create useful new columns (e.g. "days since last purchase").</li>
  <li><strong>Train.</strong> Choose a model type and fit it to the training data. Start with a simple <em>baseline</em> so you know what "good" means.</li>
  <li><strong>Evaluate.</strong> Measure performance on data the model has never seen, with the metric chosen in step 1. Compare to the baseline. Look at errors. Usually you loop back to steps 2–4 several times.</li>
  <li><strong>Deploy.</strong> Make the model available to users or systems — e.g. as a REST API that returns predictions (you will build one in the project module).</li>
  <li><strong>Monitor.</strong> The world changes: customer behaviour shifts, sensors drift. Track the model's inputs and performance in production, and retrain when it degrades. This closes the loop.</li>
</ol>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 2 "Introduction to Machine Learning Systems Design", covers framing business objectives as ML problems and choosing requirements (reliability, scalability, maintainability, adaptability).</div>

<h3>Core vocabulary</h3>
<p>Picture a table (a DataFrame) where each row is a house and the columns are size, number of rooms, age and sale price.</p>
<table>
  <thead><tr><th>Term</th><th>Meaning</th><th>In the house table</th></tr></thead>
  <tbody>
    <tr><td><strong>Sample</strong> (example, instance, row, observation)</td><td>One item in the dataset</td><td>One house</td></tr>
    <tr><td><strong>Feature</strong> (input, predictor, attribute, column)</td><td>A measurable property used as input</td><td>Size, rooms, age</td></tr>
    <tr><td><strong>Label</strong> (target, output, y)</td><td>The answer we want to predict</td><td>Sale price</td></tr>
    <tr><td><strong>X</strong> and <strong>y</strong></td><td>Convention: X is the 2-D feature matrix (samples × features), y is the 1-D label vector</td><td>X has shape (n_houses, 3); y has shape (n_houses,)</td></tr>
    <tr><td><strong>Model</strong></td><td>A function from features to predictions, with adjustable parameters</td><td>price ≈ w1·size + w2·rooms + w3·age + b</td></tr>
    <tr><td><strong>Parameters</strong></td><td>Values the algorithm <em>learns</em> from data during training</td><td>w1, w2, w3, b</td></tr>
    <tr><td><strong>Hyperparameters</strong></td><td>Settings <em>you choose</em> before training that control how learning happens</td><td>Tree depth, learning rate, regularization strength</td></tr>
    <tr><td><strong>Training</strong> (fitting)</td><td>Adjusting parameters to fit the training data</td><td><code>model.fit(X_train, y_train)</code></td></tr>
    <tr><td><strong>Inference</strong> (prediction)</td><td>Using a trained model on new inputs</td><td><code>model.predict(X_new)</code></td></tr>
    <tr><td><strong>Generalization</strong></td><td>How well the model performs on new, unseen data</td><td>Accuracy on houses sold next month</td></tr>
  </tbody>
</table>
<p>The difference between <strong>parameters and hyperparameters</strong> trips up many beginners. A useful rule: if <code>fit()</code> sets it, it is a parameter (scikit-learn stores these in attributes ending with an underscore, like <code>coef_</code>). If you pass it to the constructor, like <code>DecisionTreeClassifier(max_depth=3)</code>, it is a hyperparameter. You pick hyperparameters by trying several values and evaluating each — "tuning", covered in the evaluation module.</p>

<h3>The scikit-learn API in five methods</h3>
<p>scikit-learn (imported as <code>sklearn</code>) is the standard Python library for classic ML. Its great strength is that <em>every</em> model has the same interface, so once you know it you can swap algorithms by changing one line:</p>
<ul>
  <li><code>Model(hyperparameters)</code> — create an <em>estimator</em> object. Nothing is learned yet.</li>
  <li><code>.fit(X, y)</code> — learn parameters from training data (unsupervised models take just <code>X</code>).</li>
  <li><code>.predict(X)</code> — return predictions for new data.</li>
  <li><code>.predict_proba(X)</code> — (classifiers) return the probability of each class.</li>
  <li><code>.score(X, y)</code> — a quick default metric: accuracy for classifiers, R² for regressors.</li>
</ul>
<p>Preprocessing objects (<em>transformers</em>, such as scalers) use <code>.fit(X)</code> to learn something (e.g. the mean of each column) and <code>.transform(X)</code> to apply it.</p>

<h3>A complete mini workflow</h3>
<p>Let us walk the whole loop on scikit-learn's bundled <strong>breast cancer</strong> dataset: 569 tumours described by 30 numeric measurements, each labelled malignant (0) or benign (1). The framing: "given a tumour's measurements, predict whether it is malignant" — binary classification.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# --- Data: load and explore
data = load_breast_cancer(as_frame=True)
df = data.frame
print("Shape (samples, columns):", df.shape)
print("Label counts:", df["target"].value_counts().to_dict(), "(0 = malignant, 1 = benign)")
print("Missing values:", int(df.isna().sum().sum()))
print(df.iloc[:3, :4])

X = df.drop(columns="target")
y = df["target"]

# --- Hold out a test set the model never sees during training
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y)
print("Train size:", len(X_train), " Test size:", len(X_test))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Shape (samples, columns): (569, 31)
Label counts: {1: 357, 0: 212} (0 = malignant, 1 = benign)
Missing values: 0
   mean radius  mean texture  mean perimeter  mean area
0        17.99         10.38           122.8     1001.0
1        20.57         17.77           132.9     1326.0
2        19.69         21.25           130.0     1203.0
Train size: 426  Test size: 143</code></pre>
<p><code>train_test_split</code> randomly sets aside 25% of the rows as a <strong>test set</strong>. <code>stratify=y</code> keeps the malignant/benign ratio the same in both parts, and <code>random_state=42</code> makes the random shuffle reproducible (you get the same split every run). Now we train a baseline and a real model, and evaluate both on the test set:</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y)

# Baseline: always predict the most common class
baseline = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
print("Baseline test accuracy:", round(baseline.score(X_test, y_test), 3))

# A real model. max_depth is a HYPERPARAMETER (we choose it).
tree = DecisionTreeClassifier(max_depth=3, random_state=42)
tree.fit(X_train, y_train)                         # training
print("Tree train accuracy:", round(tree.score(X_train, y_train), 3))
print("Tree test accuracy :", round(tree.score(X_test, y_test), 3))   # generalization

# The split thresholds are PARAMETERS learned by fit()
print("Number of nodes learned:", tree.tree_.node_count)

# Inference on one new tumour (here: the first test row)
print("Prediction:", tree.predict(X_test[:1]), " Probabilities:", tree.predict_proba(X_test[:1]).round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Baseline test accuracy: 0.629
Tree train accuracy: 0.977
Tree test accuracy : 0.944
Number of nodes learned: 13
Prediction: [1]  Probabilities: [[0.012 0.988]]</code></pre>
<p>Read these numbers carefully, because this is how every evaluation conversation goes:</p>
<ul>
  <li>The <strong>baseline</strong> gets about 63% by always saying "benign" — any model worth deploying must beat this comfortably.</li>
  <li>The tree's <strong>training accuracy</strong> is higher than its <strong>test accuracy</strong>. That gap is normal; a large gap would signal overfitting (memorising instead of learning).</li>
  <li>The <strong>test accuracy</strong> is our estimate of generalization: how the model is likely to do on future tumours.</li>
</ul>
<div class="callout warn"><strong>Common mistake:</strong> using the test set repeatedly while trying model after model. Each time you peek and adjust, you leak information from the test set into your choices, and the final score becomes optimistic. Use a validation set or cross-validation for choices, and touch the test set once at the end. The evaluation module shows how.</div>
<div class="callout info"><strong>Note:</strong> 94% accuracy sounds great, but in medicine missing a malignant tumour (a false negative) is far worse than a false alarm. Accuracy alone hides that. Later you will learn precision, recall and how to choose a decision threshold based on the cost of each kind of error.</div>

<h3>Training vs inference in production</h3>
<p>Training happens occasionally (daily, weekly) and can be slow and expensive. Inference happens every time a user needs a prediction and must be fast and reliable. In production these are often separate programs: a training job writes a model file; a serving application loads that file and answers requests. You will build exactly this split in the final module.</p>
`,
          keyPoints: [
            "The ML workflow is a loop: frame the problem, get data, build features, train, evaluate, deploy, monitor, repeat.",
            "Samples are rows, features are input columns, the label is the target; X is 2-D, y is 1-D.",
            "Parameters are learned by fit(); hyperparameters are chosen by you before training.",
            "Every scikit-learn estimator shares fit / predict / predict_proba / score, so models are easy to swap.",
            "Always compare against a simple baseline and judge generalization on held-out test data."
          ],
          exercise: {
            prompt: String.raw`<p>Repeat the mini workflow on the <strong>wine</strong> dataset (<code>load_wine</code>, 3 classes). Split 25% for testing with <code>stratify</code> and <code>random_state=0</code>. Report the test accuracy of (a) a <code>DummyClassifier(strategy="most_frequent")</code> baseline and (b) <code>DecisionTreeClassifier</code> with <code>max_depth</code> of 1, 3 and <code>None</code> (unlimited), each with <code>random_state=0</code>. For each tree also print training accuracy. Which value of the hyperparameter looks best, and what do you notice about the unlimited tree?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.tree import DecisionTreeClassifier

X, y = load_wine(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y)

base = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
print("Baseline test acc:", round(base.score(X_test, y_test), 3))

for depth in [1, 3, None]:
    tree = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_train, y_train)
    print(f"max_depth={depth}: train={tree.score(X_train, y_train):.3f}  test={tree.score(X_test, y_test):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Baseline test acc: 0.4
max_depth=1: train=0.684  test=0.578
max_depth=3: train=0.970  test=0.822
max_depth=None: train=1.000  test=0.889</code></pre>
<p>A depth-1 tree can ask only one question, so it cannot separate three classes well (underfitting). The unlimited tree reaches 100% training accuracy — it has memorised the training set — and here it also happens to score best on the test set. Do not over-read that: the test set has only 45 wines, so one or two wines changing class moves accuracy by 2–4 points, and a different random split could rank the depths differently. Strictly, we should choose the depth using a validation set or cross-validation rather than the test set; you will learn that in the evaluation module.</p>`
          },
          quiz: [
            { q: "Which of these is a HYPERPARAMETER?", options: ["The learned coefficients of a linear regression", "The split thresholds a decision tree learns", "The max_depth you pass to DecisionTreeClassifier", "The model's predictions"], answer: 2, explain: "Hyperparameters are chosen by you before training (passed to the constructor). Coefficients and thresholds are parameters learned by fit()." },
            { q: "What does model.fit(X_train, y_train) do?", options: ["Makes predictions on new data", "Learns the model's parameters from the training data", "Splits the data into train and test", "Computes the test accuracy"], answer: 1, explain: "fit() is training: it adjusts the parameters so the model matches the training examples." },
            { q: "Why do we compare a model against a DummyClassifier baseline?", options: ["Because dummy models are used in production", "To know what accuracy you get for free, so you can tell whether the model actually learned something useful", "To speed up training", "Because scikit-learn requires it"], answer: 1, explain: "A baseline such as 'always predict the majority class' shows the score achievable with no learning. A model is only useful if it clearly beats it." },
            { q: "In the conventional notation, what is the shape of X for 500 samples with 8 features?", options: ["(8, 500)", "(500,)", "(500, 8)", "(8,)"], answer: 2, explain: "X is samples by features: one row per sample, one column per feature, so (500, 8). y would be (500,)." },
            { q: "Which workflow stage closes the loop by detecting that a deployed model has degraded?", options: ["Problem framing", "Feature engineering", "Monitoring", "Training"], answer: 2, explain: "Monitoring tracks inputs and performance in production; when it detects degradation, you collect new data and retrain." }
          ]
        }
      ]
    },
    {
      id: "ml-regression",
      title: "Regression: Predicting Numbers",
      summary: "Linear regression from intuition to gradient descent to scikit-learn, multiple features, polynomial features and the first look at overfitting.",
      lessons: [
        {
          id: "ml-reg-linear",
          title: "Linear Regression and the MSE Loss",
          minutes: 45,
          objectives: [
            "Explain the linear model y = w·x + b and what w and b mean",
            "Compute residuals and the mean squared error (MSE) by hand and with NumPy",
            "Understand training as searching for the w and b with the lowest loss",
            "Fit a line with scikit-learn's LinearRegression and read its coefficients"
          ],
          body: String.raw`
<p><strong>Regression</strong> means predicting a number. It is the friendliest place to start ML because you can see everything: the data is a cloud of points, the model is a line, and the error is the vertical distance from each point to the line.</p>

<h3>Intuition: drawing the best line through points</h3>
<p>Imagine you have records of flats: their floor area in square metres and their monthly rent. Plot area on the x-axis and rent on the y-axis and you see an upward-sloping cloud: bigger flats tend to cost more. If you had to guess the rent of a new 70 m² flat, you would mentally draw a line through the cloud and read off the value at 70. Linear regression does exactly that, but picks the line in a precise, repeatable way.</p>

<h3>The model: y = w·x + b</h3>
<p>A straight line has two numbers that define it:</p>
<ul>
  <li><strong>w</strong>, the <em>weight</em> or <em>slope</em> (also called the <em>coefficient</em>): how much the prediction rises when x increases by 1. If w = 12, each extra square metre adds 12 to the predicted rent.</li>
  <li><strong>b</strong>, the <em>bias</em> or <em>intercept</em>: the prediction when x = 0. It shifts the whole line up or down.</li>
</ul>
<p>We write the prediction as <strong>ŷ</strong> ("y-hat") to distinguish it from the true value y: <code>ŷ = w·x + b</code>. The parameters w and b are what the model learns. Everything else — how we measure error and how we search — is the learning algorithm.</p>

<h3>Measuring error: residuals and MSE</h3>
<p>For each training example, the <strong>residual</strong> (error) is <code>y − ŷ</code>: the true value minus the prediction. Positive residual: we predicted too low. Negative: too high. We need one number that summarises how bad the line is across all points. Simply adding residuals fails because positives and negatives cancel. The standard fix is to square them and take the average:</p>
<p><strong>MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</strong></p>
<p>The <strong>mean squared error</strong> is the most common <em>loss function</em> for regression. Squaring does two things: it makes every error positive, and it punishes big errors much more than small ones (an error of 10 costs 100, an error of 1 costs 1). Because MSE is in squared units (rent²), we often report its square root, the <strong>RMSE</strong>, which is back in the original units.</p>
<p>Let us compute this by hand on five flats for two candidate lines.</p>
<pre><code class="lang-python runnable">import numpy as np

area = np.array([30, 45, 60, 75, 90])          # x: square metres
rent = np.array([520, 700, 850, 1010, 1180])   # y: monthly rent

def mse(w, b):
    pred = w * area + b
    residuals = rent - pred
    return np.mean(residuals ** 2), pred, residuals

for w, b in [(10, 200), (11, 190)]:
    loss, pred, res = mse(w, b)
    print(f"w={w}, b={b}")
    print("  predictions:", pred)
    print("  residuals  :", res)
    print(f"  MSE = {loss:.1f}   RMSE = {np.sqrt(loss):.1f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">w=10, b=200
  predictions: [ 500  650  800  950 1100]
  residuals  : [20 50 50 60 80]
  MSE = 3080.0   RMSE = 55.5
w=11, b=190
  predictions: [ 520  685  850 1015 1180]
  residuals  : [ 0 15  0 -5  0]
  MSE = 50.0   RMSE = 7.1</code></pre>
<p>The second line has a much smaller MSE, so it is a better fit. <strong>Training a linear regression means finding the w and b that make the MSE as small as possible.</strong> That is all "learning" means here.</p>

<h3>Searching for the best line</h3>
<p>How do we find the best w and b? The bluntest method is to try many values and keep the best. This is called a <em>grid search</em> over parameters. It is too slow for real models with thousands of parameters, but it shows the idea clearly:</p>
<pre><code class="lang-python runnable">import numpy as np

area = np.array([30, 45, 60, 75, 90])
rent = np.array([520, 700, 850, 1010, 1180])

best = (None, None, float("inf"))
for w in np.arange(5, 15.01, 0.1):
    for b in np.arange(0, 400.1, 1):
        loss = np.mean((rent - (w * area + b)) ** 2)
        if loss &lt; best[2]:
            best = (w, b, loss)

w, b, loss = best
print(f"Best found by brute force: w={w:.1f}, b={b:.0f}, MSE={loss:.1f}")
print(f"Predicted rent for a 70 m2 flat: {w * 70 + b:.0f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Best found by brute force: w=10.9, b=198, MSE=38.5
Predicted rent for a 70 m2 flat: 961</code></pre>
<p>Brute force checked about 100,000 combinations. If you plotted MSE against w and b you would see a smooth bowl shape with one lowest point. That bowl is why linear regression is so well behaved: there is exactly one best answer and no local traps. In the next lesson you will roll down this bowl efficiently with gradient descent; for linear regression there is even an exact formula (the "normal equation", solved with linear algebra), which is what scikit-learn uses.</p>

<h3>Linear regression in scikit-learn</h3>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LinearRegression

area = np.array([30, 45, 60, 75, 90])
rent = np.array([520, 700, 850, 1010, 1180])

X = area.reshape(-1, 1)      # scikit-learn wants a 2-D X: (n_samples, n_features)
model = LinearRegression()
model.fit(X, rent)

print("w (coef_):", model.coef_.round(3))
print("b (intercept_):", round(model.intercept_, 3))
print("Prediction for 70 m2:", model.predict([[70]]).round(1))
pred = model.predict(X)
print("Training MSE:", round(np.mean((rent - pred) ** 2), 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">w (coef_): [10.867]
b (intercept_): 200.0
Prediction for 70 m2: [960.7]
Training MSE: 38.0</code></pre>
<p>scikit-learn finds the exact optimum, which the brute-force search approximated closely. The coefficient means: <em>each extra square metre is associated with about 10.9 more units of rent</em>. The intercept (about 200) is the predicted rent for a 0 m² flat — mathematically needed to position the line, but not meaningful in itself because no flat has zero area. Be careful interpreting intercepts outside the range of your data.</p>
<div class="callout warn"><strong>Common mistake:</strong> passing a 1-D array as X. <code>model.fit(area, rent)</code> raises "Expected 2D array, got 1D array instead". scikit-learn always expects X with shape (n_samples, n_features), even for a single feature — use <code>area.reshape(-1, 1)</code> or a one-column DataFrame such as <code>df[["area"]]</code> (note the double brackets).</div>

<h3>Assumptions and limits</h3>
<p>A straight line assumes the relationship is (roughly) linear. If rent jumps sharply above 100 m², or the cloud curves, a line will systematically miss — we will fix that with polynomial features later in this module. Linear regression is also sensitive to <strong>outliers</strong>: because errors are squared, one wildly wrong point (a typo of 100,000 rent) can drag the line toward it. Always plot or inspect your data first.</p>
<p>Also remember that a coefficient describes <strong>association, not causation</strong>. If ice-cream sales predict drowning incidents, adding ice-cream does not cause drowning — summer heat drives both. Regression on observational data finds patterns; whether they are causal is a separate question.</p>
<div class="callout tip"><strong>Tip:</strong> linear regression is the first model to try on any numeric prediction problem. It trains in milliseconds, is easy to explain, and gives you a baseline that fancier models must beat.</div>
`,
          keyPoints: [
            "Linear regression predicts y-hat = w*x + b; w is the slope (effect per unit of x), b the intercept.",
            "A residual is y - y-hat; MSE averages the squared residuals and punishes big errors heavily.",
            "RMSE is the square root of MSE, in the original units of y.",
            "Training = finding the parameters that minimise the loss; for linear regression the MSE surface is a single bowl.",
            "scikit-learn needs a 2-D X, and coefficients show association, not causation."
          ],
          exercise: {
            prompt: String.raw`<p>A café records daily temperature (°C) and iced drinks sold: temps = [14, 18, 21, 25, 28, 31, 33], sold = [32, 45, 58, 71, 80, 95, 101]. (1) Fit a <code>LinearRegression</code>. (2) Print w, b and the RMSE on these points. (3) Predict sales at 23 °C. (4) In one sentence, interpret w.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LinearRegression

temps = np.array([14, 18, 21, 25, 28, 31, 33])
sold = np.array([32, 45, 58, 71, 80, 95, 101])

model = LinearRegression().fit(temps.reshape(-1, 1), sold)
pred = model.predict(temps.reshape(-1, 1))
rmse = np.sqrt(np.mean((sold - pred) ** 2))

print(f"w = {model.coef_[0]:.2f}, b = {model.intercept_:.2f}")
print(f"RMSE = {rmse:.2f} drinks")
print(f"Predicted sales at 23 C: {model.predict([[23]])[0]:.1f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">w = 3.65, b = -19.75
RMSE = 1.28 drinks
Predicted sales at 23 C: 64.2</code></pre>
<p>Interpretation: each extra degree Celsius is associated with about 3.65 more iced drinks sold per day. The RMSE of about 1.3 drinks says the line typically misses by only a drink or so on these days. The negative intercept would be the prediction at 0 °C — impossible in reality (you cannot sell negative drinks), a reminder not to extrapolate far outside the data range.</p>`
          },
          quiz: [
            { q: "In y-hat = w*x + b with w = 4, what happens to the prediction when x increases by 2?", options: ["It increases by 2", "It increases by 4", "It increases by 8", "It doubles"], answer: 2, explain: "The slope w is the change in prediction per unit of x, so 2 units of x change the prediction by 2 * 4 = 8." },
            { q: "Why does MSE square the residuals?", options: ["To make the numbers smaller", "So positive and negative errors do not cancel, and large errors are penalised more", "Because scikit-learn requires it", "To convert units"], answer: 1, explain: "Squaring makes every error count positively and gives large errors a disproportionately big penalty." },
            { q: "Residuals of a model on 4 points are [2, -2, 1, -1]. What is the MSE?", options: ["0", "1.5", "2.5", "10"], answer: 2, explain: "Squares are 4, 4, 1, 1; their sum is 10; divided by 4 points gives 2.5. (Note the plain mean of residuals is 0, which is why we square.)" },
            { q: "What does model.fit(area, rent) fail with when area is a 1-D NumPy array?", options: ["It silently works", "An error: scikit-learn expects a 2-D X of shape (n_samples, n_features)", "It fits a polynomial instead", "It returns the MSE"], answer: 1, explain: "Features must be 2-D. Use area.reshape(-1, 1) or a one-column DataFrame." }
          ]
        },
        {
          id: "ml-reg-gradient-descent",
          title: "Fitting Linear Regression with Gradient Descent",
          minutes: 50,
          objectives: [
            "Derive the gradients of the MSE loss with respect to w and b",
            "Implement gradient descent for linear regression from scratch in NumPy",
            "Explain the effect of the learning rate and of feature scaling",
            "Check the from-scratch result against scikit-learn"
          ],
          body: String.raw`
<p>Brute-force search does not scale: a model with a million parameters cannot be fitted by trying every combination. The workhorse of modern ML — from linear regression to the neural networks behind ChatGPT — is <strong>gradient descent</strong>. You met it in the math track; here you will use it to actually train a model, and you will see exactly what scikit-learn and PyTorch do under the hood.</p>

<h3>The idea, again: walk downhill</h3>
<p>Picture the MSE as a landscape over all possible (w, b) pairs: a bowl. You stand somewhere on it (random or zero starting values). The <strong>gradient</strong> is a vector that points in the direction the loss increases fastest. So you take a small step in the <em>opposite</em> direction, recompute, and repeat. Each step is:</p>
<p><strong>w ← w − α · ∂L/∂w</strong> &nbsp;&nbsp;and&nbsp;&nbsp; <strong>b ← b − α · ∂L/∂b</strong></p>
<p>where <strong>α</strong> (alpha) is the <strong>learning rate</strong>, a hyperparameter controlling the step size.</p>

<h3>The gradients of MSE</h3>
<p>With predictions ŷᵢ = w·xᵢ + b and loss L = (1/n) Σ (ŷᵢ − yᵢ)², the chain rule gives:</p>
<ul>
  <li><strong>∂L/∂w = (2/n) · Σ (ŷᵢ − yᵢ) · xᵢ</strong></li>
  <li><strong>∂L/∂b = (2/n) · Σ (ŷᵢ − yᵢ)</strong></li>
</ul>
<p>Read them intuitively. The term (ŷᵢ − yᵢ) is how wrong we are on example i. If we predict too high on average, ∂L/∂b is positive, so the update <em>decreases</em> b — the line moves down. For w the error is multiplied by xᵢ: examples with large x have more say about the slope. Nothing magic — just "nudge each parameter in the direction that reduces the error".</p>

<h3>Gradient descent from scratch</h3>
<p>We create synthetic data where we <em>know</em> the true answer (y = 3x + 4 plus noise), so we can check that learning recovers it.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
x = rng.uniform(0, 10, size=100)
y = 3 * x + 4 + rng.normal(0, 2, size=100)     # true w=3, b=4, plus noise

w, b = 0.0, 0.0          # start anywhere
lr = 0.01                # learning rate (alpha)
n = len(x)

for epoch in range(2001):
    y_hat = w * x + b
    error = y_hat - y
    loss = np.mean(error ** 2)
    grad_w = (2 / n) * np.sum(error * x)
    grad_b = (2 / n) * np.sum(error)
    w -= lr * grad_w
    b -= lr * grad_b
    if epoch in (0, 10, 100, 500, 1000, 2000):
        print(f"epoch {epoch:4d}: loss={loss:8.3f}  w={w:.3f}  b={b:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch    0: loss= 416.203  w=2.255  b=0.371
epoch   10: loss=   6.256  w=3.515  b=0.725
epoch  100: loss=   4.881  w=3.344  b=1.812
epoch  500: loss=   3.861  w=3.066  b=3.574
epoch 1000: loss=   3.836  w=3.020  b=3.866
epoch 2000: loss=   3.835  w=3.015  b=3.897</code></pre>
<p>Each pass over the data is called an <strong>epoch</strong>. The loss falls fast at first (big gradients far from the minimum) and then slowly as the bowl flattens. The learned values approach w ≈ 3 and b ≈ 4 — not exactly, because the noise we added means the data's best-fitting line differs slightly from the true line. Notice that b converges much more slowly than w; we will see why (and fix it) below.</p>

<h3>Checking against scikit-learn</h3>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
x = rng.uniform(0, 10, size=100)
y = 3 * x + 4 + rng.normal(0, 2, size=100)

model = LinearRegression().fit(x.reshape(-1, 1), y)
print(f"scikit-learn: w={model.coef_[0]:.3f}  b={model.intercept_:.3f}")
mse = np.mean((model.predict(x.reshape(-1, 1)) - y) ** 2)
print(f"scikit-learn training MSE: {mse:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">scikit-learn: w=3.015  b=3.897
scikit-learn training MSE: 3.835</code></pre>
<p>Our hand-written loop lands very close to the exact answer. More epochs would close the remaining gap. This is a powerful check you should use whenever you implement an algorithm yourself: compare against a trusted library.</p>

<h3>The learning rate: too small, just right, too large</h3>
<p>The learning rate is the most important hyperparameter of gradient descent.</p>
<ul>
  <li><strong>Too small:</strong> tiny steps, painfully slow progress.</li>
  <li><strong>Just right:</strong> fast, steady decrease of the loss.</li>
  <li><strong>Too large:</strong> you overshoot the bottom of the bowl, land higher on the other side, overshoot again — and the loss <em>explodes</em> to infinity.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
x = rng.uniform(0, 10, size=100)
y = 3 * x + 4 + rng.normal(0, 2, size=100)

def train(lr, epochs=200):
    w = b = 0.0
    for _ in range(epochs):
        err = (w * x + b) - y
        w -= lr * 2 * np.mean(err * x)
        b -= lr * 2 * np.mean(err)
    return np.mean(((w * x + b) - y) ** 2)

for lr in [0.0001, 0.001, 0.01, 0.03, 0.05]:
    print(f"lr={lr:&lt;7} loss after 200 epochs = {train(lr):.4g}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">lr=0.0001  loss after 200 epochs = 38.19
lr=0.001   loss after 200 epochs = 6.042
lr=0.01    loss after 200 epochs = 4.247
lr=0.03    loss after 200 epochs = 3.845
lr=0.05    loss after 200 epochs = 3.488e+138</code></pre>
<p>Going from 0.03 to 0.05 tips the process from converging to diverging. In practice you try values spaced by factors of about 3–10 (0.001, 0.003, 0.01, 0.03 ...) and plot the loss curve: it should go down smoothly. A loss that grows or becomes <code>nan</code> almost always means the learning rate is too large.</p>

<h3>Why feature scaling matters for gradient descent</h3>
<p>In the first experiment, w converged quickly but b crawled. The reason: x ranges from 0 to 10, so the gradient for w is much larger than for b, and one learning rate has to suit both. With several features on very different scales (age 0–100, income 0–200,000), the bowl becomes a long, narrow valley: a step size that is safe for one direction is uselessly small for another. The cure is <strong>standardization</strong>: rescale each feature to mean 0 and standard deviation 1, so <code>x_scaled = (x − mean) / std</code>. The bowl becomes round and gradient descent converges much faster.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
x = rng.uniform(0, 10, size=100)
y = 3 * x + 4 + rng.normal(0, 2, size=100)

x_s = (x - x.mean()) / x.std()      # standardized feature
w = b = 0.0
for epoch in range(101):
    err = (w * x_s + b) - y
    w -= 0.1 * 2 * np.mean(err * x_s)
    b -= 0.1 * 2 * np.mean(err)
    if epoch in (10, 50, 100):
        print(f"epoch {epoch}: loss={np.mean(err ** 2):.3f}")

# convert back to the original units: y = w*(x - m)/s + b
w_orig = w / x.std()
b_orig = b - w * x.mean() / x.std()
print(f"w={w_orig:.3f}  b={b_orig:.3f}  (after only 100 epochs, lr=0.1)")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch 10: loss=8.590
epoch 50: loss=3.835
epoch 100: loss=3.835
w=3.015  b=3.897  (after only 100 epochs, lr=0.1)</code></pre>
<p>With scaling, 100 epochs and a ten times larger learning rate get us to the exact answer, versus 2000 epochs unscaled. You will use <code>StandardScaler</code> to do this automatically in the features module.</p>

<h3>Variants you will hear about</h3>
<ul>
  <li><strong>Batch gradient descent</strong> (what we did): each step uses all n examples.</li>
  <li><strong>Stochastic gradient descent (SGD)</strong>: each step uses one random example — noisy but cheap, and the noise can help. scikit-learn's <code>SGDRegressor</code> and <code>SGDClassifier</code> work this way.</li>
  <li><strong>Mini-batch gradient descent</strong>: each step uses a small batch (e.g. 32–512 examples). This is the default for training neural networks.</li>
</ul>
<div class="callout warn"><strong>Common mistake:</strong> forgetting the minus sign and doing <code>w += lr * grad_w</code>. That walks <em>uphill</em> and the loss grows every epoch. If your loss increases from the very first step with a small learning rate, check the sign.</div>
<div class="callout info"><strong>Why bother, if scikit-learn has an exact formula?</strong> The exact formula exists only for a few simple models and becomes slow with very many features. Gradient descent works for <em>any</em> differentiable loss and any number of parameters, which is why it trains logistic regression, neural networks and LLMs. Understanding this loop is understanding how deep learning trains.</div>
`,
          keyPoints: [
            "Gradient descent repeats: compute predictions, compute the gradient of the loss, step parameters against the gradient.",
            "For MSE: dL/dw = (2/n) * sum((y_hat - y) * x) and dL/db = (2/n) * sum(y_hat - y).",
            "The learning rate controls step size: too small is slow, too large diverges (loss explodes or becomes nan).",
            "Standardizing features makes the loss bowl round, so gradient descent converges much faster.",
            "Batch, stochastic and mini-batch variants differ in how many examples each step uses."
          ],
          exercise: {
            prompt: String.raw`<p>Extend gradient descent to <strong>two features</strong>. Generate data with <code>rng = np.random.default_rng(0)</code>, <code>X = rng.normal(size=(200, 2))</code> and <code>y = 2*X[:,0] - 5*X[:,1] + 1 + rng.normal(0, 0.5, 200)</code>. Write a vectorised loop with a weight vector <code>w</code> (shape (2,)) and scalar <code>b</code>, using <code>y_hat = X @ w + b</code>. Train for 500 epochs with lr = 0.05, print the learned parameters and compare with <code>LinearRegression</code>.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 2))
y = 2 * X[:, 0] - 5 * X[:, 1] + 1 + rng.normal(0, 0.5, 200)

w = np.zeros(2)
b = 0.0
lr, n = 0.05, len(y)
for epoch in range(500):
    err = X @ w + b - y              # shape (200,)
    grad_w = (2 / n) * (X.T @ err)   # shape (2,): one gradient per feature
    grad_b = (2 / n) * err.sum()
    w -= lr * grad_w
    b -= lr * grad_b

print("GD     : w =", w.round(3), " b =", round(b, 3))
sk = LinearRegression().fit(X, y)
print("sklearn: w =", sk.coef_.round(3), " b =", round(sk.intercept_, 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">GD     : w = [ 1.975 -4.94 ]  b = 0.999
sklearn: w = [ 1.975 -4.94 ]  b = 0.999</code></pre>
<p><code>X.T @ err</code> computes Σ errᵢ·xᵢⱼ for every feature j at once — the same formula as before, vectorised. Both methods recover weights close to the true (2, −5) and intercept close to 1. The features here are already roughly standardized (normal with mean 0, std 1), which is why a fairly large learning rate converges quickly.</p>`
          },
          quiz: [
            { q: "In the update w <- w - lr * dL/dw, why is there a minus sign?", options: ["To keep w positive", "The gradient points uphill (direction of fastest increase), so we step the opposite way to reduce the loss", "It is a convention with no effect", "To normalise w"], answer: 1, explain: "The gradient points towards increasing loss; subtracting it moves towards lower loss." },
            { q: "Your training loss grows each epoch and becomes nan after a few steps. What is the most likely cause?", options: ["Learning rate too small", "Learning rate too large", "Too few features", "The data has no noise"], answer: 1, explain: "Too large a learning rate overshoots the minimum each step and diverges, which often ends in overflow and nan." },
            { q: "Why does standardizing features speed up gradient descent?", options: ["It reduces the number of samples", "It makes the loss surface more evenly shaped, so one learning rate suits every parameter", "It removes noise from labels", "It makes the model non-linear"], answer: 1, explain: "Features on very different scales create a long narrow valley; standardizing makes it rounder so steps are efficient in all directions." },
            { q: "What is an epoch?", options: ["One parameter update on one example", "One full pass through the training data", "The learning rate schedule", "The final loss value"], answer: 1, explain: "An epoch is one pass over the whole training set. In batch gradient descent that is one update; in mini-batch it is many." }
          ]
        },
        {
          id: "ml-reg-multi-poly",
          title: "Multiple Features, Polynomial Features and Overfitting",
          minutes: 50,
          objectives: [
            "Fit and interpret a linear regression with many features",
            "Explain why coefficient size depends on feature scale",
            "Model curved relationships with PolynomialFeatures",
            "Recognise overfitting by comparing training and test error"
          ],
          body: String.raw`
<p>Real problems rarely have one feature. A house price depends on size, location, age and condition; a patient's outcome on age, blood pressure and lab results. This lesson extends linear regression to many features, then to curves, and ends with the most important danger in all of ML: <strong>overfitting</strong>.</p>

<h3>Multiple linear regression</h3>
<p>With d features the model becomes a weighted sum: <code>ŷ = w₁x₁ + w₂x₂ + … + w_d·x_d + b</code>, or in vector form <code>ŷ = w · x + b</code>. Geometrically it is no longer a line but a flat plane (or "hyperplane") in d dimensions. Training is the same: minimise MSE, now over d weights plus the intercept. Each weight is interpreted <em>holding the other features fixed</em>: "if x₁ goes up by one unit and everything else stays the same, the prediction changes by w₁".</p>
<p>We will use scikit-learn's bundled <strong>diabetes</strong> dataset: 442 patients, 10 baseline measurements (age, sex, body-mass index, blood pressure and six blood serum values), and a target that measures disease progression one year later. The features are already centred and scaled, which makes coefficients comparable.</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X, y = load_diabetes(return_X_y=True, as_frame=True)
print(X.shape, "| target range:", y.min(), "to", y.max())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
model = LinearRegression().fit(X_train, y_train)

coefs = pd.Series(model.coef_, index=X.columns).sort_values(key=abs, ascending=False)
print(coefs.round(1))
print("Intercept:", round(model.intercept_, 1))
print("Train R2:", round(model.score(X_train, y_train), 3), " Test R2:", round(model.score(X_test, y_test), 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(442, 10) | target range: 25.0 to 346.0
s5     703.2
bmi    593.4
s1    -560.2
bp     302.9
s2     261.4
sex   -208.7
s4     135.9
age    -43.3
s6      28.3
s3      -8.9
dtype: float64
Intercept: 153.1
Train R2: 0.555  Test R2: 0.359</code></pre>
<p><code>score</code> for regressors returns <strong>R²</strong> (R-squared), "the fraction of the variation in y that the model explains": 1.0 is perfect, 0 means no better than always predicting the mean, and it can even go negative for a model worse than that. You will study it with other regression metrics in the evaluation module. A test R² of about 0.36 (lower than the 0.56 on training data) is typical here — disease progression is genuinely hard to predict from ten numbers.</p>

<h3>Interpreting coefficients — carefully</h3>
<p>Two features, <code>s1</code> and <code>s5</code>, have huge coefficients of opposite sign. That does not mean they are the most important drivers. They are blood-serum measurements that are strongly <strong>correlated</strong> with each other (and with <code>s2</code>), and when features overlap, the model can trade weight between them: a big positive on one, a big negative on the other, roughly cancelling. This is called <strong>multicollinearity</strong> and makes individual coefficients unstable and hard to interpret, even though predictions are fine. <code>bmi</code> (body-mass index) is a more trustworthy signal: a large positive coefficient, and it is not tangled with the others.</p>
<p>The second caveat is <strong>scale</strong>. A coefficient is "change in y per unit of x". If one feature is in metres and another in millimetres, their coefficients differ by 1000× for the same real effect. Only compare coefficient sizes when features are on the same scale — for example after standardization, as in this dataset.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
size_m2 = rng.uniform(40, 120, 50)
price = 3000 * size_m2 + rng.normal(0, 20000, 50)

for unit, factor in [("m2", 1), ("cm2", 10_000)]:
    m = LinearRegression().fit((size_m2 * factor).reshape(-1, 1), price)
    print(f"size in {unit:4}: coefficient = {m.coef_[0]:.4f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">size in m2  : coefficient = 3130.8405
size in cm2 : coefficient = 0.3131</code></pre>
<p>Same data, same predictions, coefficients 10,000 times apart. The size of a raw coefficient is not "importance".</p>

<h3>Curves with polynomial features</h3>
<p>What if the relationship is curved — say, fuel efficiency rises with speed and then falls? A straight line cannot bend. The trick: keep the <em>linear</em> model but give it new features that are powers of the original: x, x², x³ … The model <code>ŷ = w₁x + w₂x² + b</code> is still linear <em>in its parameters</em> (so all the same fitting machinery works), but as a function of x it is a parabola. scikit-learn's <code>PolynomialFeatures</code> builds these columns; a <code>Pipeline</code> chains it with the regression so both run as one model.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline

print(PolynomialFeatures(degree=3, include_bias=False).fit_transform([[2.0]]))  # x, x^2, x^3

rng = np.random.default_rng(1)
x = np.sort(rng.uniform(-3, 3, 40))
y = 0.5 * x**2 - x + 2 + rng.normal(0, 0.5, 40)     # a curved (quadratic) truth
X = x.reshape(-1, 1)

line = LinearRegression().fit(X, y)
curve = make_pipeline(PolynomialFeatures(degree=2), LinearRegression()).fit(X, y)
for name, m in [("straight line", line), ("degree-2 curve", curve)]:
    mse = np.mean((m.predict(X) - y) ** 2)
    print(f"{name:15} training MSE = {mse:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[2. 4. 8.]]
straight line   training MSE = 2.045
degree-2 curve  training MSE = 0.133</code></pre>
<p>The degree-2 model matches the true shape, and its error drops to roughly the noise level (we added noise with standard deviation 0.5, i.e. variance 0.25). The straight line <strong>underfits</strong>: it is too simple to capture the pattern, so it is wrong in a systematic way.</p>

<h3>The danger: overfitting</h3>
<p>If degree 2 is good, is degree 15 better? On the training data, yes — more flexibility can only reduce training error. But a degree-15 polynomial has enough freedom to wiggle through every noisy point, fitting the <em>noise</em> rather than the <em>pattern</em>. On new data those wiggles are wrong. This is <strong>overfitting</strong>: excellent training performance, poor performance on unseen data. The only way to see it is to measure error on data the model did not train on.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(1)
x = rng.uniform(-3, 3, 40)
y = 0.5 * x**2 - x + 2 + rng.normal(0, 0.5, 40)
X_train, X_test, y_train, y_test = train_test_split(x.reshape(-1, 1), y, test_size=0.5, random_state=0)

print("degree | train MSE | test MSE")
for degree in [1, 2, 4, 8, 15]:
    model = make_pipeline(PolynomialFeatures(degree), StandardScaler(), LinearRegression())
    model.fit(X_train, y_train)
    tr = mean_squared_error(y_train, model.predict(X_train))
    te = mean_squared_error(y_test, model.predict(X_test))
    print(f"{degree:6d} | {tr:9.3f} | {te:10.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">degree | train MSE | test MSE
     1 |     2.137 |      2.125
     2 |     0.118 |      0.154
     4 |     0.096 |      0.126
     8 |     0.074 |      0.219
    15 |     0.039 |   6732.493</code></pre>
<p>This table is the single most important pattern in machine learning. As complexity (degree) grows, <strong>training error keeps falling</strong>, but <strong>test error first falls, then rises</strong> — sometimes explosively. The best model is the one with the lowest <em>test</em> (really, validation) error, here degrees 2–4. Degree 1 underfits, degree 15 overfits catastrophically: with 16 coefficients for only 20 training points it can nearly memorise them, and between those points it swings wildly.</p>
<div class="callout warn"><strong>Common mistake:</strong> choosing a model because it has the lowest <em>training</em> error. Training error always rewards complexity. Model choice must be based on held-out data — the next modules make this rigorous with validation sets, cross-validation and regularization (which tames overfitting without lowering the degree).</div>
<div class="callout tip"><strong>Tip:</strong> polynomial features grow fast. With 10 input features, degree 3 creates 285 columns. For many features, tree-based models (next module) usually capture curves and interactions more conveniently.</div>
`,
          keyPoints: [
            "Multiple linear regression fits a weighted sum of features; each weight is the effect of its feature with the others held fixed.",
            "Coefficient size depends on units; compare only standardized coefficients, and beware correlated features (multicollinearity).",
            "R-squared is the fraction of variance explained: 1 is perfect, 0 equals predicting the mean.",
            "PolynomialFeatures lets a linear model fit curves by adding powers of the inputs.",
            "More complexity always lowers training error, but test error eventually rises: that is overfitting."
          ],
          exercise: {
            prompt: String.raw`<p>Generate data with <code>rng = np.random.default_rng(7)</code>, <code>x = rng.uniform(0, 6, 60)</code>, <code>y = np.sin(x) * 3 + rng.normal(0, 0.4, 60)</code>. Split 50/50 with <code>random_state=0</code>. For degrees 1 to 12, fit <code>make_pipeline(PolynomialFeatures(d), StandardScaler(), LinearRegression())</code> and record train and test MSE. Print the degree with the lowest test MSE, and describe what happens for small and large degrees.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(7)
x = rng.uniform(0, 6, 60)
y = np.sin(x) * 3 + rng.normal(0, 0.4, 60)
X_tr, X_te, y_tr, y_te = train_test_split(x.reshape(-1, 1), y, test_size=0.5, random_state=0)

results = []
for d in range(1, 13):
    m = make_pipeline(PolynomialFeatures(d), StandardScaler(), LinearRegression()).fit(X_tr, y_tr)
    results.append((d, mean_squared_error(y_tr, m.predict(X_tr)), mean_squared_error(y_te, m.predict(X_te))))
    print(f"degree {d:2d}: train {results[-1][1]:.3f}  test {results[-1][2]:.3f}")

best = min(results, key=lambda r: r[2])
print("Best degree by test MSE:", best[0])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">degree  1: train 1.813  test 1.742
degree  2: train 1.612  test 1.471
degree  3: train 0.135  test 0.109
degree  4: train 0.126  test 0.102
degree  5: train 0.116  test 0.094
degree  6: train 0.116  test 0.096
degree  7: train 0.115  test 0.094
degree  8: train 0.111  test 0.109
degree  9: train 0.113  test 0.106
degree 10: train 0.101  test 0.110
degree 11: train 0.100  test 0.117
degree 12: train 0.100  test 0.122
Best degree by test MSE: 5</code></pre>
<p>Degrees 1–2 underfit: a line or parabola cannot follow a sine wave, so both errors are high. From degree 3 the curve can follow the wave and test error drops to about 0.1, the level of the noise we added (with only 30 test points, the measured error can even land a little below the true noise variance of 0.4² = 0.16). At high degrees training error keeps creeping down while test error starts to climb as the polynomial wiggles between the training points. (We used the test set to pick the degree here only for illustration; properly you would use a validation set or cross-validation.)</p>`
          },
          quiz: [
            { q: "In a multiple regression, the coefficient for 'rooms' is 15,000. What does it mean?", options: ["Each house has 15,000 rooms", "Holding other features fixed, one extra room is associated with 15,000 higher predicted price", "Rooms is the most important feature", "The model is overfitting"], answer: 1, explain: "Each coefficient is the change in prediction per unit increase of that feature while the other features are held constant." },
            { q: "Why can't you compare raw coefficients to judge feature importance?", options: ["Coefficients are random", "They depend on each feature's units/scale, and correlated features can share or swap weight", "scikit-learn hides them", "They are always equal"], answer: 1, explain: "A feature measured in smaller units gets a larger coefficient for the same effect, and multicollinearity makes individual coefficients unstable." },
            { q: "How does PolynomialFeatures let a linear regression fit a curve?", options: ["It replaces linear regression with a neural network", "It adds new columns such as x^2 and x^3, so the model is linear in parameters but curved in x", "It removes outliers", "It scales the target"], answer: 1, explain: "The model stays a weighted sum, but of powers of x, which produces a curve." },
            { q: "As polynomial degree increases, what typically happens?", options: ["Training and test error both fall forever", "Training error falls; test error falls then rises", "Training error rises; test error falls", "Both errors stay the same"], answer: 1, explain: "Extra flexibility always helps fit the training data, but past a point the model fits noise, so error on unseen data increases (overfitting)." }
          ]
        }
      ]
    },
    {
      id: "ml-classification",
      title: "Classification: Predicting Categories",
      summary: "Logistic regression, k-nearest neighbours, decision trees, random forests, gradient boosting and SVMs — how each works and how to compare them fairly.",
      lessons: [
        {
          id: "ml-clf-logistic",
          title: "Logistic Regression: Probabilities and Decision Thresholds",
          minutes: 50,
          objectives: [
            "Explain how the sigmoid turns a linear score into a probability",
            "Use predict_proba and choose a decision threshold",
            "Compute log loss and explain why it is used instead of MSE",
            "Train and interpret a logistic regression in scikit-learn"
          ],
          body: String.raw`
<p>Now the label is a category: spam or not, malignant or benign, will churn or will stay. The most important first classifier to learn has a confusing name: <strong>logistic regression</strong>. Despite the word "regression", it is a <em>classification</em> model. It is fast, interpretable, outputs well-behaved probabilities, and is a strong baseline in industry — many credit-scoring and medical risk models are logistic regressions.</p>

<h3>From a score to a probability: the sigmoid</h3>
<p>Start with the familiar linear model: compute a score <code>z = w · x + b</code>. For classification we want a probability between 0 and 1, but z can be any number from −∞ to +∞. The <strong>sigmoid</strong> (or logistic) function squashes any number into (0, 1):</p>
<p><strong>σ(z) = 1 / (1 + e^(−z))</strong></p>
<p>Large positive z → probability near 1; large negative z → near 0; z = 0 → exactly 0.5. So logistic regression is "a linear model, followed by a sigmoid". The model predicts <code>p = σ(w · x + b)</code>, interpreted as the probability that the example belongs to the positive class (label 1).</p>
<pre><code class="lang-python runnable">import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

for z in [-6, -2, -0.5, 0, 0.5, 2, 6]:
    print(f"z = {z:5}: sigmoid = {sigmoid(z):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">z =    -6: sigmoid = 0.002
z =    -2: sigmoid = 0.119
z =  -0.5: sigmoid = 0.378
z =     0: sigmoid = 0.500
z =   0.5: sigmoid = 0.622
z =     2: sigmoid = 0.881
z =     6: sigmoid = 0.998</code></pre>
<p>A nice interpretation of z: it is the <strong>log-odds</strong>. If the probability is p, the odds are p/(1−p) (e.g. p = 0.8 means odds of 4 to 1), and z = log(odds). So each coefficient w says how much one unit of a feature adds to the log-odds of the positive class. A positive weight pushes towards class 1, a negative weight towards class 0.</p>

<h3>From probability to decision: the threshold</h3>
<p>A probability is not yet a decision. To output a class we compare it with a <strong>decision threshold</strong>, by default 0.5: predict 1 if p ≥ 0.5, else 0. The set of inputs where p = 0.5 (that is, z = 0) is the <strong>decision boundary</strong>; for logistic regression it is a straight line (or flat plane), so it is a <em>linear classifier</em>.</p>
<p>0.5 is not sacred. If missing a cancer is far worse than a false alarm, you lower the threshold to, say, 0.2 — the model will flag more cases, catching more true cancers at the cost of more false alarms. Choosing the threshold is a <em>business decision</em>, which the evaluation module treats in depth.</p>

<h3>The loss: log loss (cross-entropy)</h3>
<p>Why not just use MSE? With a sigmoid inside, MSE gives a bumpy loss surface with weak gradients when the model is confidently wrong. Instead, classification uses <strong>log loss</strong> (also called <em>binary cross-entropy</em>). For one example with true label y (0 or 1) and predicted probability p:</p>
<p><strong>loss = −[ y · log(p) + (1 − y) · log(1 − p) ]</strong></p>
<p>It looks scary but means something simple: <em>the loss is −log of the probability the model gave to the correct class</em>. If the true label is 1 and the model said p = 0.9, the loss is −log(0.9) ≈ 0.105 — small. If it said p = 0.01 (confidently wrong), the loss is −log(0.01) ≈ 4.6 — huge. Log loss severely punishes confident mistakes, which pushes the model to produce honest probabilities. Averaged over the dataset, it is smooth and bowl-shaped in w and b, so gradient descent works well.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.metrics import log_loss

y_true = np.array([1, 1, 0, 0])
cases = {
    "good, confident":   np.array([0.95, 0.90, 0.05, 0.10]),
    "good, unsure":      np.array([0.60, 0.55, 0.40, 0.45]),
    "one confident miss": np.array([0.95, 0.01, 0.05, 0.10]),
}
for name, p in cases.items():
    manual = -np.mean(y_true * np.log(p) + (1 - y_true) * np.log(1 - p))
    print(f"{name:19}: log loss = {manual:.3f} (sklearn: {log_loss(y_true, p):.3f})")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">good, confident    : log loss = 0.078 (sklearn: 0.078)
good, unsure       : log loss = 0.554 (sklearn: 0.554)
one confident miss : log loss = 1.203 (sklearn: 1.203)</code></pre>
<p>The first two cases are both 100% accurate at threshold 0.5, yet log loss tells them apart: it rewards being confidently right. The third case gets 3 of 4 right, but its single confident miss (p = 0.01 for a true 1) costs more than everything else combined.</p>

<h3>Logistic regression in scikit-learn</h3>
<p>We return to the breast cancer data. Logistic regression is trained with an iterative optimiser (a cousin of gradient descent), so — as you learned — features should be standardized. We chain a <code>StandardScaler</code> and the model in a pipeline so scaling is learned from training data only.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.25, random_state=42, stratify=data.target)

model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)
print("Test accuracy:", round(model.score(X_test, y_test), 3))

proba = model.predict_proba(X_test[:5])      # columns: P(class 0), P(class 1)
print("P(malignant), P(benign) for 5 tumours:")
print(proba.round(3))
print("Predicted classes:", model.predict(X_test[:5]), " True:", y_test[:5])

# The most influential standardized features
clf = model.named_steps["logisticregression"]
order = np.argsort(np.abs(clf.coef_[0]))[::-1][:4]
for i in order:
    print(f"{data.feature_names[i]:22} weight = {clf.coef_[0][i]:+.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Test accuracy: 0.986
P(malignant), P(benign) for 5 tumours:
[[0.031 0.969]
 [1.    0.   ]
 [0.441 0.559]
 [0.061 0.939]
 [0.825 0.175]]
Predicted classes: [1 0 1 1 0]  True: [1 0 1 1 0]
worst texture          weight = -1.25
radius error           weight = -1.07
worst symmetry         weight = -0.96
worst concave points   weight = -0.94</code></pre>
<p>Remember that in this dataset class 1 is <em>benign</em>. Negative weights push towards class 0 (malignant): tumours with rougher texture, more variable radius, more asymmetry and more concave points are more likely malignant — which matches medical intuition that irregular tumours are more dangerous. Because features were standardized, comparing weights is meaningful.</p>

<h3>Moving the threshold</h3>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_breast_cancer(return_X_y=True)
y = 1 - y            # flip so that 1 = malignant (the class we want to catch)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_train, y_train)

p_malignant = model.predict_proba(X_test)[:, 1]
for threshold in [0.9, 0.5, 0.2, 0.05]:
    pred = (p_malignant &gt;= threshold).astype(int)
    caught = np.sum((pred == 1) &amp; (y_test == 1))
    missed = np.sum((pred == 0) &amp; (y_test == 1))
    false_alarms = np.sum((pred == 1) &amp; (y_test == 0))
    print(f"threshold {threshold:4}: caught {caught}/{y_test.sum()} malignant, missed {missed}, false alarms {false_alarms}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">threshold  0.9: caught 43/53 malignant, missed 10, false alarms 0
threshold  0.5: caught 49/53 malignant, missed 4, false alarms 1
threshold  0.2: caught 51/53 malignant, missed 2, false alarms 3
threshold 0.05: caught 53/53 malignant, missed 0, false alarms 11</code></pre>
<p>Lowering the threshold catches more malignant tumours but raises false alarms. There is no free lunch — only a trade-off you choose deliberately. The model (its probabilities) stayed exactly the same; only the decision rule on top changed.</p>

<h3>More than two classes</h3>
<p>For multiclass problems (like the 3 iris species), scikit-learn's <code>LogisticRegression</code> learns one score per class and converts the scores to probabilities that sum to 1 with the <strong>softmax</strong> function, the multi-class generalization of the sigmoid. You use it exactly the same way; <code>predict_proba</code> simply returns one column per class. Softmax reappears as the final layer of most neural network classifiers and LLMs.</p>
<div class="callout warn"><strong>Common mistake:</strong> forgetting to scale features and seeing <code>ConvergenceWarning: lbfgs failed to converge</code>. The optimiser struggles with features on wildly different scales. Put a <code>StandardScaler</code> in front (and/or raise <code>max_iter</code>), rather than ignoring the warning.</div>
<div class="callout info"><strong>Regularization is on by default:</strong> scikit-learn's <code>LogisticRegression</code> applies L2 regularization with strength controlled by <code>C</code> (smaller C = stronger regularization, simpler model). You will learn what that means in the evaluation module.</div>
`,
          keyPoints: [
            "Logistic regression = linear score z = w*x + b, then sigmoid(z) gives the probability of class 1.",
            "z is the log-odds; positive weights push towards class 1, negative towards class 0.",
            "A decision threshold (default 0.5) converts probabilities into classes; moving it trades missed positives for false alarms.",
            "Log loss = -log(probability given to the true class); it heavily punishes confident mistakes.",
            "Scale features for logistic regression; multiclass uses softmax and predict_proba returns one column per class."
          ],
          exercise: {
            prompt: String.raw`<p>Using <code>make_classification(n_samples=600, n_features=5, n_informative=3, weights=[0.8, 0.2], random_state=1)</code>, split 30% for testing (stratified, <code>random_state=1</code>), and fit a scaled logistic regression. (1) Print test accuracy and test log loss. (2) For thresholds 0.5, 0.3 and 0.15, print how many positives are caught and how many false alarms occur. (3) Explain which threshold you would pick if a missed positive costs 10 times as much as a false alarm.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import log_loss

X, y = make_classification(n_samples=600, n_features=5, n_informative=3,
                           weights=[0.8, 0.2], random_state=1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1, stratify=y)
model = make_pipeline(StandardScaler(), LogisticRegression()).fit(X_tr, y_tr)

p = model.predict_proba(X_te)[:, 1]
print("Accuracy:", round(model.score(X_te, y_te), 3), " Log loss:", round(log_loss(y_te, p), 3))
for t in [0.5, 0.3, 0.15]:
    pred = (p &gt;= t).astype(int)
    tp = np.sum((pred == 1) &amp; (y_te == 1)); fn = np.sum((pred == 0) &amp; (y_te == 1))
    fp = np.sum((pred == 1) &amp; (y_te == 0))
    cost = 10 * fn + 1 * fp
    print(f"t={t}: caught {tp}/{y_te.sum()}, missed {fn}, false alarms {fp}, cost={cost}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Accuracy: 0.883  Log loss: 0.3
t=0.5: caught 23/37, missed 14, false alarms 7, cost=147
t=0.3: caught 29/37, missed 8, false alarms 10, cost=90
t=0.15: caught 32/37, missed 5, false alarms 29, cost=79</code></pre>
<p>We turned the business rule into a number: cost = 10 × missed + 1 × false alarm. Pick the threshold with the lowest cost. Lower thresholds catch more positives; because misses are ten times more expensive, the cost usually falls as the threshold drops, until false alarms start to dominate. Properly, you would choose the threshold on a validation set and confirm on the test set.</p>`
          },
          quiz: [
            { q: "What does the sigmoid function do in logistic regression?", options: ["Selects features", "Squashes the linear score into a probability between 0 and 1", "Computes the gradient", "Splits the data"], answer: 1, explain: "The linear score can be any real number; the sigmoid maps it to (0, 1) so it can be read as a probability." },
            { q: "A model predicts p = 0.02 for an example whose true label is 1. What can you say about its log loss on this example?", options: ["It is near zero", "It is large (about 3.9), because the model was confidently wrong", "It is exactly 0.5", "Log loss ignores such cases"], answer: 1, explain: "Log loss is -log(probability of the true class) = -log(0.02), about 3.9, a large penalty for a confident mistake." },
            { q: "You lower the decision threshold from 0.5 to 0.2. What typically happens?", options: ["Fewer positives are predicted", "More positives are predicted: fewer misses, more false alarms", "The model's probabilities change", "Accuracy always improves"], answer: 1, explain: "A lower threshold labels more examples positive. The probabilities are unchanged; only the decision rule moves, trading misses for false alarms." },
            { q: "Is logistic regression a regression or a classification model?", options: ["Regression, it predicts numbers", "Classification, despite the name: it predicts class probabilities", "Clustering", "Neither"], answer: 1, explain: "Its name comes from the logistic (sigmoid) function. It is used to classify." }
          ]
        },
        {
          id: "ml-clf-knn-trees",
          title: "k-Nearest Neighbours and Decision Trees",
          minutes: 55,
          objectives: [
            "Explain how k-NN classifies by majority vote of the nearest training points",
            "Show why k-NN needs feature scaling and how k controls smoothness",
            "Explain how a decision tree chooses splits using Gini impurity or entropy",
            "Control tree complexity with max_depth and read feature importances"
          ],
          body: String.raw`
<p>Logistic regression draws one straight boundary. This lesson covers two very different, intuitive models that can draw curved, complex boundaries: <strong>k-nearest neighbours</strong>, which classifies by similarity, and <strong>decision trees</strong>, which classify by asking a sequence of questions. Trees are also the building block of the most successful models for tabular data (next lesson).</p>

<h3>k-Nearest Neighbours (k-NN): "you are like your neighbours"</h3>
<p>To classify a new point, k-NN finds the <strong>k training points closest to it</strong> and takes a majority vote of their labels. That is the whole algorithm. There is no real "training" — <code>fit</code> just stores the data — which is why k-NN is called a <em>lazy</em> or <em>instance-based</em> learner. All the work happens at prediction time.</p>
<p>"Closest" usually means <strong>Euclidean distance</strong>: for two points a and b, √(Σ (aⱼ − bⱼ)²) — the straight-line distance you know from geometry, extended to any number of features. Let us implement it from scratch on a tiny example before using scikit-learn.</p>
<pre><code class="lang-python runnable">import numpy as np
from collections import Counter

# Fruit: [weight in grams / 100, colour score 0..1]  label: 0 = lemon, 1 = orange
X_train = np.array([[1.1, 0.20], [1.3, 0.25], [1.0, 0.15], [1.6, 0.80], [1.8, 0.90], [1.5, 0.70]])
y_train = np.array([0, 0, 0, 1, 1, 1])

def knn_predict(x_new, k=3):
    distances = np.sqrt(((X_train - x_new) ** 2).sum(axis=1))
    nearest = np.argsort(distances)[:k]
    print("  distances:", distances.round(2), "-&gt; nearest indices", nearest)
    return Counter(y_train[nearest]).most_common(1)[0][0]

for fruit in [np.array([1.2, 0.3]), np.array([1.55, 0.6])]:
    print("new fruit", fruit, "-&gt; class", knn_predict(fruit))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  distances: [0.14 0.11 0.25 0.64 0.85 0.5 ] -&gt; nearest indices [1 0 2]
new fruit [1.2 0.3] -&gt; class 0
  distances: [0.6  0.43 0.71 0.21 0.39 0.11] -&gt; nearest indices [5 3 4]
new fruit [1.55 0.6 ] -&gt; class 1</code></pre>

<h3>Choosing k</h3>
<p>The hyperparameter k controls how smooth the decision boundary is:</p>
<ul>
  <li><strong>k = 1</strong>: each prediction copies the single nearest point. The boundary is jagged and follows every noisy point — high risk of <em>overfitting</em>. Training accuracy is always 100% (each training point is its own nearest neighbour).</li>
  <li><strong>Large k</strong>: votes average over many points, giving a smooth boundary. Too large and it ignores real local structure — <em>underfitting</em>. With k = n you always predict the majority class.</li>
</ul>
<p>Odd values of k avoid ties in binary problems. You pick k by validation, as for any hyperparameter.</p>

<h3>k-NN needs scaling</h3>
<p>Distances add up differences across features. If one feature is measured in thousands (e.g. "proline" in the wine data ranges up to ~1700) and another in tenths, the large one completely dominates the distance and the small ones are ignored. Standardizing all features first fixes this — compare:</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
print("Feature ranges (min..max) of 3 columns:")
for j in [0, 7, 12]:
    print(f"  column {j}: {X[:, j].min():.2f} .. {X[:, j].max():.2f}")
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for k in [1, 5, 15]:
    raw = KNeighborsClassifier(n_neighbors=k).fit(X_tr, y_tr)
    scaled = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k)).fit(X_tr, y_tr)
    print(f"k={k:2d}: unscaled test acc = {raw.score(X_te, y_te):.3f}   scaled test acc = {scaled.score(X_te, y_te):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Feature ranges (min..max) of 3 columns:
  column 0: 11.03 .. 14.83
  column 7: 0.13 .. 0.66
  column 12: 278.00 .. 1680.00
k= 1: unscaled test acc = 0.722   scaled test acc = 1.000
k= 5: unscaled test acc = 0.722   scaled test acc = 0.963
k=15: unscaled test acc = 0.667   scaled test acc = 0.981</code></pre>
<p>Scaling raises accuracy dramatically. k-NN is simple and works well on small, low-dimensional data, but prediction gets slow on large datasets (it must compare against every stored point) and it degrades with many features, because in high dimensions all points become roughly equally far apart (the "curse of dimensionality").</p>

<h3>Decision trees: twenty questions</h3>
<p>A <strong>decision tree</strong> classifies by asking yes/no questions about features — "is petal length ≤ 2.45?" — and following the answers down to a <em>leaf</em> that holds a prediction. You saw one in the first lesson. The tree's structure (which questions, in which order, with which thresholds) is learned from data.</p>
<p>How does it choose a question? At each node it tries <em>every feature and every possible threshold</em> and picks the split that makes the two resulting groups as <strong>pure</strong> as possible — ideally each group contains only one class. Purity is measured by an <em>impurity</em> score:</p>
<ul>
  <li><strong>Gini impurity</strong> = 1 − Σ pₖ², where pₖ is the fraction of class k in the node. A pure node (all one class) has Gini 0. A 50/50 node has 1 − (0.25 + 0.25) = 0.5, the maximum for two classes. Intuition: the probability that two randomly drawn items from the node have different labels.</li>
  <li><strong>Entropy</strong> = −Σ pₖ log₂ pₖ, from information theory: 0 for a pure node, 1 bit for a 50/50 node. The reduction in entropy from a split is called <em>information gain</em>.</li>
</ul>
<p>Both behave very similarly in practice; Gini is the default in scikit-learn. A split's quality is the <em>weighted average</em> impurity of its children (weighted by how many samples go to each side). The tree picks the split with the lowest weighted impurity, then repeats the process inside each child — a greedy, recursive procedure.</p>
<pre><code class="lang-python runnable">import numpy as np

def gini(labels):
    _, counts = np.unique(labels, return_counts=True)
    p = counts / counts.sum()
    return 1 - np.sum(p ** 2)

# 10 customers: hours of product use per week and whether they churned (1) or stayed (0)
hours = np.array([1, 2, 2, 3, 5, 6, 7, 8, 9, 10])
churn = np.array([1, 1, 1, 0, 1, 0, 0, 0, 0, 0])
print("Gini of the whole node:", round(gini(churn), 3))

for t in [2.5, 4, 5.5]:
    left, right = churn[hours &lt;= t], churn[hours &gt; t]
    weighted = (len(left) * gini(left) + len(right) * gini(right)) / len(churn)
    print(f"split hours &lt;= {t}: left {left} right {right} -&gt; weighted Gini {weighted:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Gini of the whole node: 0.48
split hours &lt;= 2.5: left [1 1 1] right [0 1 0 0 0 0 0] -&gt; weighted Gini 0.171
split hours &lt;= 4: left [1 1 1 0] right [1 0 0 0 0 0] -&gt; weighted Gini 0.317
split hours &lt;= 5.5: left [1 1 1 0 1] right [0 0 0 0 0] -&gt; weighted Gini 0.160</code></pre>
<p>The split at 5.5 hours gives the purest children (lowest weighted Gini), so a tree would choose it — the same idea scikit-learn applies at every node, over every feature.</p>

<h3>Depth and overfitting</h3>
<p>If you let a tree grow until every leaf is pure, it will memorise the training data — including noise — and overfit. Complexity is controlled by hyperparameters such as <code>max_depth</code> (maximum number of questions on any path), <code>min_samples_leaf</code> (each leaf must hold at least this many training samples) and <code>max_leaf_nodes</code>. Limiting growth is called <em>pre-pruning</em>; scikit-learn also offers cost-complexity post-pruning via <code>ccp_alpha</code>.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

data = load_breast_cancer()
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, test_size=0.3,
                                          random_state=0, stratify=data.target)
for depth in [1, 2, 4, 8, None]:
    t = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_tr, y_tr)
    print(f"max_depth={str(depth):4}: leaves={t.get_n_leaves():3d}  train={t.score(X_tr, y_tr):.3f}  test={t.score(X_te, y_te):.3f}")

t = DecisionTreeClassifier(max_depth=4, random_state=0).fit(X_tr, y_tr)
top = sorted(zip(t.feature_importances_, data.feature_names), reverse=True)[:3]
print("Top features:", [(str(name), round(float(imp), 2)) for imp, name in top])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">max_depth=1   : leaves=  2  train=0.932  test=0.889
max_depth=2   : leaves=  4  train=0.942  test=0.906
max_depth=4   : leaves= 12  train=0.990  test=0.906
max_depth=8   : leaves= 16  train=1.000  test=0.906
max_depth=None: leaves= 16  train=1.000  test=0.906
Top features: [('worst perimeter', 0.82), ('mean texture', 0.06), ('worst concave points', 0.04)]</code></pre>
<p>Training accuracy climbs to 100% as depth grows, but test accuracy stops improving after depth 2: the extra leaves only memorise training points. A depth-2 tree with 4 leaves is as good on new data as the full 16-leaf tree, and far easier to explain. <code>feature_importances_</code> sums how much each feature reduced impurity across the tree — a handy, if rough, view of what the tree relies on.</p>
<h3>Strengths and weaknesses of trees</h3>
<ul>
  <li><strong>Strengths:</strong> easy to explain (you can print the rules); no scaling needed (splits compare one feature to a threshold, so units do not matter); handle non-linear relationships and interactions naturally; fast.</li>
  <li><strong>Weaknesses:</strong> a single tree overfits easily and is <em>unstable</em> — a small change in the data can produce a completely different tree. Boundaries are axis-aligned "staircases". These weaknesses are exactly what ensembles fix.</li>
</ul>
<div class="callout warn"><strong>Common mistake:</strong> leaving <code>max_depth=None</code> (the default) and reporting the training accuracy of 1.0. An unrestricted tree almost always overfits. Always check test or cross-validated performance and tune depth or <code>min_samples_leaf</code>.</div>
`,
          keyPoints: [
            "k-NN predicts by majority vote of the k closest training points; fit just stores the data.",
            "Small k overfits (jagged boundary), large k underfits; k-NN requires feature scaling.",
            "Decision trees choose splits that minimise weighted impurity (Gini or entropy) of the children.",
            "Unrestricted trees memorise training data; control them with max_depth, min_samples_leaf or pruning.",
            "Trees need no scaling and are interpretable, but single trees are unstable and prone to overfitting."
          ],
          exercise: {
            prompt: String.raw`<p>On <code>load_iris</code> (30% stratified test split, <code>random_state=3</code>): (1) find which k in [1, 3, 5, 7, 9, 15, 25] gives the best test accuracy for a scaled k-NN; (2) train <code>DecisionTreeClassifier(max_depth=2, random_state=0)</code>, print its rules with <code>export_text</code> and its test accuracy; (3) compute by hand the Gini impurity of the root node (iris training set has equal thirds of each class).</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
X_tr, X_te, y_tr, y_te = train_test_split(iris.data, iris.target, test_size=0.3,
                                          random_state=3, stratify=iris.target)
for k in [1, 3, 5, 7, 9, 15, 25]:
    m = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k)).fit(X_tr, y_tr)
    print(f"k={k:2d}: test acc {m.score(X_te, y_te):.3f}")

tree = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X_tr, y_tr)
print(export_text(tree, feature_names=iris.feature_names))
print("Tree test accuracy:", round(tree.score(X_te, y_te), 3))
print("Root Gini by hand: 1 - 3*(1/3)**2 =", round(1 - 3 * (1 / 3) ** 2, 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">k= 1: test acc 0.911
k= 3: test acc 0.911
k= 5: test acc 0.978
k= 7: test acc 0.978
k= 9: test acc 0.956
k=15: test acc 0.911
k=25: test acc 0.933
|--- petal width (cm) &lt;= 0.80
|   |--- class: 0
|--- petal width (cm) &gt;  0.80
|   |--- petal width (cm) &lt;= 1.55
|   |   |--- class: 1
|   |--- petal width (cm) &gt;  1.55
|   |   |--- class: 2

Tree test accuracy: 0.889
Root Gini by hand: 1 - 3*(1/3)**2 = 0.667</code></pre>
<p>Several values of k tie on a 45-flower test set — differences of one flower are 2.2 points, so small test sets cannot separate close models (cross-validation helps; see the evaluation module). The depth-2 tree first isolates setosa (petal width ≤ 0.8 cm), then separates versicolor from virginica with a second threshold on the same feature (1.55 cm). The root Gini with three equal classes is 1 − 3·(1/3)² ≈ 0.667.</p>`
          },
          quiz: [
            { q: "Why is k-NN called a 'lazy' learner?", options: ["It is slow to train", "fit() just stores the training data; the work happens at prediction time", "It ignores half the data", "It only uses one neighbour"], answer: 1, explain: "k-NN has no real training phase: it memorises the data and computes distances when asked to predict." },
            { q: "What is the Gini impurity of a node with 8 samples of class A and 2 of class B?", options: ["0.2", "0.32", "0.5", "0.8"], answer: 1, explain: "1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = 0.32." },
            { q: "Which model is most affected by forgetting to scale features?", options: ["Decision tree", "k-nearest neighbours", "Random forest", "All are equally affected"], answer: 1, explain: "k-NN relies on distances, which are dominated by large-scale features. Trees split one feature at a time and are scale-invariant." },
            { q: "A decision tree has 100% training accuracy and 85% test accuracy. What is the best next step?", options: ["Increase max_depth", "Limit complexity (e.g. lower max_depth or raise min_samples_leaf) and compare validation scores", "Remove the test set", "Use training accuracy as the final metric"], answer: 1, explain: "The large gap suggests overfitting. Constraining the tree usually improves generalization; choose the setting by validation." }
          ]
        },
        {
          id: "ml-clf-ensembles",
          title: "Ensembles: Random Forests and Gradient Boosting (plus SVMs)",
          minutes: 55,
          objectives: [
            "Explain why combining many models (ensembles) beats a single model",
            "Describe bagging and random forests, and why averaging reduces variance",
            "Describe gradient boosting as sequentially fitting the residual errors",
            "Explain the intuition of support vector machines, margins and kernels"
          ],
          body: String.raw`
<p>A single decision tree is unstable and overfits. But if you ask hundreds of different trees and combine their answers, the result is one of the most accurate and reliable tools in all of ML. Combining models is called an <strong>ensemble</strong>. On <em>tabular</em> data — rows and columns, like spreadsheets and database tables — tree ensembles such as random forests and gradient boosting (XGBoost, LightGBM, scikit-learn's HistGradientBoosting) win most real-world competitions and power much of industry's ML.</p>

<h3>The wisdom of crowds</h3>
<p>Imagine 100 people guessing the weight of an ox. Individuals are often far off, but the average guess is remarkably close, because individual errors point in different directions and cancel out. The same works for models <em>if their errors are not all the same</em>. The art of ensembles is creating many models that are each decent but <em>different</em>.</p>

<h3>Bagging and random forests</h3>
<p><strong>Bagging</strong> (bootstrap aggregating) creates variety by training each model on a different random <em>bootstrap sample</em> of the training data: n rows drawn <em>with replacement</em>, so some rows appear several times and about a third do not appear at all. Each tree sees a slightly different dataset, so each grows differently. For classification the ensemble takes a majority vote (or averages probabilities); for regression it averages predictions.</p>
<p>A <strong>random forest</strong> adds a second source of randomness: at each split, a tree may only consider a random subset of the features (by default √d of the d features for classification). This stops every tree from always splitting on the same dominant feature, making the trees more different from each other — and therefore their average better.</p>
<p>Why does averaging help? Recall from statistics that the average of many noisy, independent estimates has much lower variance than any single one. A deep tree has low <em>bias</em> (it can fit complex patterns) but high <em>variance</em> (it changes a lot with the data). Averaging many such trees keeps the low bias and cuts the variance. That is why random forests use deep, unpruned trees and rarely overfit badly as you add more trees.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

X, y = make_moons(n_samples=1000, noise=0.3, random_state=0)   # two interleaving half-circles
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)

tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
print(f"single deep tree : train={tree.score(X_tr, y_tr):.3f} test={tree.score(X_te, y_te):.3f}")
for n in [1, 10, 100, 300]:
    rf = RandomForestClassifier(n_estimators=n, random_state=0, n_jobs=-1).fit(X_tr, y_tr)
    print(f"forest, {n:3d} trees: train={rf.score(X_tr, y_tr):.3f} test={rf.score(X_te, y_te):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">single deep tree : train=1.000 test=0.873
forest,   1 trees: train=0.949 test=0.873
forest,  10 trees: train=0.987 test=0.897
forest, 100 trees: train=1.000 test=0.897
forest, 300 trees: train=1.000 test=0.903</code></pre>
<p>A single deep tree memorises the noisy training set (100% train) and scores lower on test. Adding trees improves test accuracy and then levels off — more trees never cause overfitting in the way more depth does; they just cost more compute. Key random forest hyperparameters: <code>n_estimators</code> (number of trees; more is better up to diminishing returns), <code>max_features</code> (features considered per split), and the usual tree controls like <code>max_depth</code> and <code>min_samples_leaf</code>. Forests work well with little tuning, which makes them a superb default.</p>

<h3>Boosting: learning from mistakes, one model at a time</h3>
<p>Bagging trains trees independently and in parallel. <strong>Boosting</strong> trains them <em>sequentially</em>, each one focused on fixing the errors of the ensemble so far. <strong>Gradient boosting</strong>, the most popular form, works like this (for regression with MSE):</p>
<ol>
  <li>Start with a simple prediction for everyone, e.g. the mean of y.</li>
  <li>Compute the <strong>residuals</strong>: y − current prediction. These are what we still get wrong.</li>
  <li>Fit a <em>small</em> tree (e.g. depth 3) to predict the residuals.</li>
  <li>Add that tree's predictions, scaled by a <strong>learning rate</strong> (e.g. 0.1), to the current prediction.</li>
  <li>Repeat steps 2–4 for many rounds.</li>
</ol>
<p>Each tree is a small correction. The name comes from the fact that the residuals are the negative <em>gradient</em> of the MSE loss with respect to the predictions — so this is gradient descent, but in "function space": each step adds a tree instead of nudging a number. Other losses (like log loss for classification) give other "residuals", but the recipe is the same. Here it is from scratch:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.tree import DecisionTreeRegressor

rng = np.random.default_rng(0)
x = rng.uniform(0, 6, 200).reshape(-1, 1)
y = np.sin(x[:, 0]) * 3 + rng.normal(0, 0.3, 200)

pred = np.full_like(y, y.mean())        # step 1: start with the mean
lr = 0.3
for round_ in range(1, 31):
    residuals = y - pred                # step 2: what we still get wrong
    small_tree = DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, residuals)  # step 3
    pred += lr * small_tree.predict(x)  # step 4: take a small step
    if round_ in (1, 3, 10, 30):
        print(f"round {round_:2d}: training MSE = {np.mean((y - pred) ** 2):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">round  1: training MSE = 2.446
round  3: training MSE = 0.832
round 10: training MSE = 0.112
round 30: training MSE = 0.059</code></pre>
<p>Thirty tiny depth-2 trees, each correcting the last, add up to a curve that fits a sine wave. Boosting reduces <em>bias</em> (each tree alone is far too simple) by stacking corrections. Because it keeps chasing the training errors, boosting <em>can</em> overfit if you run too many rounds with too high a learning rate — so it is usually tuned with a validation set and <em>early stopping</em> (stop adding trees when validation score stops improving).</p>
<p>In practice use a library implementation. scikit-learn offers <code>GradientBoostingClassifier</code> and the much faster <code>HistGradientBoostingClassifier</code> (which bins feature values into histograms, like LightGBM, and handles missing values natively). Main hyperparameters: <code>learning_rate</code>, number of trees (<code>max_iter</code> / <code>n_estimators</code>), tree size (<code>max_depth</code> or <code>max_leaf_nodes</code>).</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier

X, y = load_breast_cancer(return_X_y=True)
models = {
    "decision tree": DecisionTreeClassifier(random_state=0),
    "random forest": RandomForestClassifier(n_estimators=200, random_state=0, n_jobs=-1),
    "hist gradient boosting": HistGradientBoostingClassifier(random_state=0),
}
for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5)     # 5 different train/test splits (see evaluation module)
    print(f"{name:23}: mean accuracy {scores.mean():.3f} (+/- {scores.std():.3f})")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">decision tree          : mean accuracy 0.917 (+/- 0.016)
random forest          : mean accuracy 0.960 (+/- 0.019)
hist gradient boosting : mean accuracy 0.965 (+/- 0.018)</code></pre>
<p>Both ensembles clearly beat the single tree. (Cross-validation, used here, averages over five different splits for a more reliable comparison — you will learn it properly in the evaluation module.)</p>

<h3>Why tree ensembles win on tabular data</h3>
<ul>
  <li>They capture <strong>non-linear effects and interactions</strong> ("high income matters only for young customers") automatically.</li>
  <li>They need <strong>no feature scaling</strong> and are robust to outliers in the inputs and to irrelevant features.</li>
  <li>They handle <strong>mixed feature types</strong> well (after simple encoding), and HistGradientBoosting handles missing values directly.</li>
  <li>They give strong results with <strong>modest tuning</strong> and train fast on CPUs.</li>
</ul>
<p>Deep learning dominates images, audio and text, but for tables gradient boosting is usually the model to beat.</p>

<h3>Support vector machines in brief</h3>
<p>A <strong>support vector machine (SVM)</strong> is a classic classifier with a beautiful geometric idea. Among all lines that separate two classes, choose the one with the <strong>widest margin</strong> — the biggest empty "street" between the classes. Only the points on the edges of the street, the <strong>support vectors</strong>, determine it. A wide margin tends to generalize well. The hyperparameter <code>C</code> controls how many points may violate the margin (small C = wider, softer margin, more regularization).</p>
<p>For curved boundaries SVMs use the <strong>kernel trick</strong>: implicitly map the data into a higher-dimensional space where a straight separator exists, without ever computing that space explicitly. The popular <strong>RBF (radial basis function) kernel</strong> lets an SVM draw smooth, curved boundaries; its <code>gamma</code> controls how wiggly they can be.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = make_moons(n_samples=600, noise=0.25, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)

for kernel in ["linear", "rbf"]:
    svm = make_pipeline(StandardScaler(), SVC(kernel=kernel, C=1.0)).fit(X_tr, y_tr)
    n_sv = svm.named_steps["svc"].n_support_.sum()
    print(f"{kernel:6} kernel: test acc = {svm.score(X_te, y_te):.3f}, support vectors = {n_sv}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">linear kernel: test acc = 0.861, support vectors = 129
rbf    kernel: test acc = 0.889, support vectors = 105</code></pre>
<p>The linear SVM cannot bend around the moons; the RBF kernel can. SVMs are strong on small and medium datasets with many features (they were the state of the art for text classification before deep learning), but they need scaled features, they scale poorly beyond tens of thousands of rows, and they do not output probabilities by default. Today they are used less than tree ensembles, but the ideas of margins and kernels remain important.</p>
<div class="callout warn"><strong>Common mistake:</strong> interpreting <code>feature_importances_</code> of a random forest as causal truth. Impurity-based importances are biased towards features with many unique values and split credit between correlated features. For more reliable importance, use <code>sklearn.inspection.permutation_importance</code> on validation data.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6 "Model Development and Offline Evaluation", discusses ensembles (bagging, boosting, stacking) and practical advice for model selection, such as starting simple and considering the trade-offs between performance, latency and interpretability.</div>
`,
          keyPoints: [
            "Ensembles combine many diverse models; their errors partly cancel out.",
            "Random forests = bagging (bootstrap samples) + random feature subsets per split, averaging deep trees to cut variance.",
            "Gradient boosting adds small trees sequentially, each fitting the residual errors of the ensemble so far; tune learning rate and rounds, use early stopping.",
            "Tree ensembles are the default winners on tabular data: non-linear, scale-free, robust, little tuning.",
            "SVMs pick the widest-margin boundary; kernels (e.g. RBF) allow curved boundaries; they need scaling."
          ],
          exercise: {
            prompt: String.raw`<p>Use <code>make_classification(n_samples=2000, n_features=20, n_informative=6, shuffle=False, random_state=0)</code>. Compare with 5-fold <code>cross_val_score</code>: a scaled <code>LogisticRegression</code>, <code>DecisionTreeClassifier(random_state=0)</code>, <code>RandomForestClassifier(n_estimators=200, random_state=0)</code> and <code>HistGradientBoostingClassifier(random_state=0)</code>. Then, for the forest, print the top 5 features by <code>feature_importances_</code>. With <code>shuffle=False</code>, make_classification puts the informative features first — did the forest find them?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier

X, y = make_classification(n_samples=2000, n_features=20, n_informative=6,
                           shuffle=False, random_state=0)
models = {
    "logistic regression": make_pipeline(StandardScaler(), LogisticRegression()),
    "decision tree": DecisionTreeClassifier(random_state=0),
    "random forest": RandomForestClassifier(n_estimators=200, random_state=0, n_jobs=-1),
    "hist grad boosting": HistGradientBoostingClassifier(random_state=0),
}
for name, m in models.items():
    s = cross_val_score(m, X, y, cv=5)
    print(f"{name:20}: {s.mean():.3f} +/- {s.std():.3f}")

rf = models["random forest"].fit(X, y)
top5 = np.argsort(rf.feature_importances_)[::-1][:5]
print("Top-5 feature indices:", top5, "importances:", rf.feature_importances_[top5].round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logistic regression : 0.879 +/- 0.014
decision tree       : 0.865 +/- 0.013
random forest       : 0.897 +/- 0.011
hist grad boosting  : 0.920 +/- 0.008
Top-5 feature indices: [1 0 3 4 6] importances: [0.346 0.146 0.076 0.065 0.056]</code></pre>
<p>The ensembles beat both the linear model and the single tree. In <code>make_classification</code> the informative features are columns 0–5 (followed by redundant features, which are linear combinations of the informative ones, and then pure noise), so the top-ranked indices all fall in the range 0–7 — the forest has discovered which inputs carry signal and ignored the twelve noise columns. (Without <code>shuffle=False</code> the columns are shuffled, and the informative ones could be anywhere.)</p>`
          },
          quiz: [
            { q: "What two sources of randomness make the trees in a random forest different from each other?", options: ["Different learning rates and depths", "Bootstrap samples of the rows and random subsets of features at each split", "Different loss functions", "Random labels"], answer: 1, explain: "Each tree trains on a bootstrap sample, and each split considers only a random subset of features. Diversity makes averaging effective." },
            { q: "In gradient boosting for regression, what does each new tree try to predict?", options: ["The original target y", "The residual errors of the current ensemble", "The feature values", "Random noise"], answer: 1, explain: "Each tree fits the residuals (the negative gradient of the loss), and its scaled predictions are added as a correction." },
            { q: "Which statement about adding more trees is generally true?", options: ["More trees in a random forest cause severe overfitting", "More trees in a random forest mostly cost compute; boosting with too many rounds can overfit, so use early stopping", "Boosting never overfits", "Neither model changes with more trees"], answer: 1, explain: "Forest averaging stabilises as trees are added. Boosting keeps fitting training errors and can overfit without validation-based early stopping." },
            { q: "What does the 'margin' of an SVM refer to?", options: ["The training accuracy", "The width of the empty band between the decision boundary and the closest points of each class", "The number of features", "The learning rate"], answer: 1, explain: "An SVM chooses the separator with the widest margin; the points touching the margin are the support vectors." }
          ]
        },
        {
          id: "ml-clf-compare",
          title: "Comparing Classifiers Fairly and Choosing One",
          minutes: 40,
          objectives: [
            "Set up a fair comparison of several models on the same data",
            "Weigh accuracy against training time, prediction speed and interpretability",
            "Visualise how different models draw decision boundaries",
            "Follow a practical recipe for choosing a first model"
          ],
          body: String.raw`
<p>You now know six classifiers. Which should you use? The honest answer is "it depends — try a few, fairly". This lesson shows how to compare models properly and what besides accuracy should influence your choice.</p>

<h3>Rules for a fair comparison</h3>
<ol>
  <li><strong>Same data, same splits.</strong> Every model must be evaluated on exactly the same held-out data. Comparing model A on one random split with model B on another is meaningless: the split alone can change scores by several points.</li>
  <li><strong>Use cross-validation for small data.</strong> One split of a few hundred rows is noisy. Cross-validation evaluates on several splits and reports a mean and spread (details in the next module).</li>
  <li><strong>Give each model its proper preprocessing.</strong> k-NN, SVMs and logistic regression need scaling; trees do not. Put preprocessing inside a pipeline so it is fitted on training folds only.</li>
  <li><strong>Include a baseline.</strong> A <code>DummyClassifier</code> tells you what "no skill" scores.</li>
  <li><strong>Use the metric that matches the goal</strong> — accuracy only if classes are balanced and errors cost the same.</li>
</ol>
<pre><code class="lang-python runnable">import time
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.svm import SVC

X, y = load_breast_cancer(return_X_y=True)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)   # identical folds for every model

models = {
    "baseline (majority)": DummyClassifier(),
    "logistic regression": make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
    "k-NN (k=5)": make_pipeline(StandardScaler(), KNeighborsClassifier()),
    "decision tree (d=4)": DecisionTreeClassifier(max_depth=4, random_state=0),
    "random forest": RandomForestClassifier(n_estimators=200, random_state=0),
    "hist grad boosting": HistGradientBoostingClassifier(random_state=0),
    "SVM (rbf)": make_pipeline(StandardScaler(), SVC()),
}
print(f"{'model':21} {'accuracy':&gt;9} {'std':&gt;6} {'f1':&gt;6}")
for name, model in models.items():
    res = cross_validate(model, X, y, cv=cv, scoring=["accuracy", "f1"])
    print(f"{name:21} {res['test_accuracy'].mean():9.3f} {res['test_accuracy'].std():6.3f} {res['test_f1'].mean():6.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">model                  accuracy    std     f1
baseline (majority)       0.627  0.004  0.771
logistic regression       0.979  0.014  0.983
k-NN (k=5)                0.965  0.021  0.973
decision tree (d=4)       0.926  0.025  0.942
random forest             0.967  0.019  0.974
hist grad boosting        0.970  0.012  0.977
SVM (rbf)                 0.977  0.007  0.982</code></pre>
<p>Several observations, typical of real projects:</p>
<ul>
  <li>Every model is far above the 63% baseline, so all of them learned something.</li>
  <li>The top models are within a percentage point or two of each other — and the standard deviations across folds are of similar size. Differences that small may be noise. Do not crown a winner on a 0.3-point lead.</li>
  <li>The well-tuned simple models (scaled logistic regression and SVM) are competitive with the ensembles here. This dataset has a fairly linear structure; on messier tabular data with interactions, boosting usually pulls ahead.</li>
</ul>

<h3>Looking at decision boundaries</h3>
<p>On two-dimensional data we can see how each model "thinks". The code below trains four models on the moons dataset and draws their decision regions into an image file. Even without viewing the picture, the printed test accuracies tell the story.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

X, y = make_moons(n_samples=1000, noise=0.3, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
models = {
    "Logistic regression": make_pipeline(StandardScaler(), LogisticRegression()),
    "k-NN (k=15)": make_pipeline(StandardScaler(), KNeighborsClassifier(15)),
    "Decision tree (d=5)": DecisionTreeClassifier(max_depth=5, random_state=1),
    "Random forest": RandomForestClassifier(200, min_samples_leaf=3, random_state=1),
}
xx, yy = np.meshgrid(np.linspace(-2, 3, 200), np.linspace(-1.5, 2, 200))
grid = np.c_[xx.ravel(), yy.ravel()]
fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, (name, m) in zip(axes, models.items()):
    m.fit(X_tr, y_tr)
    ax.contourf(xx, yy, m.predict(grid).reshape(xx.shape), alpha=0.3, cmap="coolwarm")
    ax.scatter(X_te[:, 0], X_te[:, 1], c=y_te, cmap="coolwarm", edgecolor="k", s=15)
    ax.set_title(f"{name}: {m.score(X_te, y_te):.2f}")
    print(f"{name:20} test accuracy {m.score(X_te, y_te):.3f}")
fig.savefig("decision_boundaries.png", dpi=80)
print("saved decision_boundaries.png")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Logistic regression  test accuracy 0.820
k-NN (k=15)          test accuracy 0.903
Decision tree (d=5)  test accuracy 0.893
Random forest        test accuracy 0.910
saved decision_boundaries.png</code></pre>
<p>If you open the saved image you will see: logistic regression draws a single straight line through the moons; k-NN draws a smooth curve; the tree draws a blocky staircase of rectangles; the forest averages many staircases into a smoother, more accurate boundary. The straight line is clearly the worst here, because the true boundary is curved.</p>

<h3>Beyond accuracy: what else matters</h3>
<table>
  <thead><tr><th>Model</th><th>Needs scaling</th><th>Interpretability</th><th>Training speed</th><th>Prediction speed</th><th>Typical sweet spot</th></tr></thead>
  <tbody>
    <tr><td>Logistic regression</td><td>Yes</td><td>High (coefficients)</td><td>Very fast</td><td>Very fast</td><td>Baselines, regulated domains, roughly linear problems</td></tr>
    <tr><td>k-NN</td><td>Yes</td><td>Medium (show neighbours)</td><td>Instant</td><td>Slow on big data</td><td>Small, low-dimensional data</td></tr>
    <tr><td>Decision tree</td><td>No</td><td>High (rules) if shallow</td><td>Fast</td><td>Very fast</td><td>Explainable rules, teaching</td></tr>
    <tr><td>Random forest</td><td>No</td><td>Low–medium</td><td>Medium</td><td>Medium</td><td>Strong default for tabular data</td></tr>
    <tr><td>Gradient boosting</td><td>No</td><td>Low–medium</td><td>Medium</td><td>Fast</td><td>Best accuracy on tabular data</td></tr>
    <tr><td>SVM (RBF)</td><td>Yes</td><td>Low</td><td>Slow on large n</td><td>Medium</td><td>Small/medium data, many features</td></tr>
  </tbody>
</table>
<p>In production, requirements such as <strong>latency</strong> (a fraud check must answer in 50 ms), <strong>interpretability</strong> (a bank may be legally required to explain a loan rejection), <strong>model size</strong> and <strong>maintenance cost</strong> can outweigh a one-point accuracy gain.</p>

<h3>A practical recipe</h3>
<ol>
  <li>Start with a <strong>baseline</strong> (DummyClassifier) and a <strong>simple model</strong> (scaled logistic regression).</li>
  <li>Try a <strong>random forest</strong> and a <strong>gradient boosting</strong> model with default settings.</li>
  <li>Compare with cross-validation on the metric that matters. If the simple model is within noise of the complex one, prefer the simple one.</li>
  <li>Tune the most promising one or two models (evaluation module), then evaluate once on the test set.</li>
</ol>
<div class="callout warn"><strong>Common mistake:</strong> comparing a carefully tuned favourite model against untuned competitors and concluding the favourite is "better". Give every candidate a comparable tuning budget, or compare all at defaults.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6, offers "tips for model selection": avoid the state-of-the-art trap, start with the simplest models, avoid human bias in selecting models, and evaluate trade-offs such as false positives vs false negatives and compute requirements vs accuracy.</div>
`,
          keyPoints: [
            "Compare models on identical splits (e.g. one StratifiedKFold object) with proper per-model preprocessing in pipelines.",
            "Always include a baseline and look at the spread across folds, not only the mean.",
            "Small differences within the fold-to-fold standard deviation are likely noise; prefer the simpler model then.",
            "Latency, interpretability, size and maintenance matter as much as accuracy in production.",
            "Recipe: baseline, simple model, forest, boosting; compare by CV; tune the best; test once."
          ],
          exercise: {
            prompt: String.raw`<p>On <code>load_digits</code> (8×8 images of handwritten digits, 10 classes), compare with the same 5-fold <code>StratifiedKFold(shuffle=True, random_state=0)</code>: DummyClassifier, scaled LogisticRegression(max_iter=2000), scaled k-NN (k=3), DecisionTreeClassifier(random_state=0), RandomForestClassifier(n_estimators=200, random_state=0) and scaled SVC(). Also measure each model's total fit time with <code>cross_validate</code>'s <code>fit_time</code>. Which would you choose and why?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_digits
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

X, y = load_digits(return_X_y=True)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
models = {
    "dummy": DummyClassifier(),
    "logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "k-NN k=3": make_pipeline(StandardScaler(), KNeighborsClassifier(3)),
    "tree": DecisionTreeClassifier(random_state=0),
    "forest": RandomForestClassifier(n_estimators=200, random_state=0),
    "SVM rbf": make_pipeline(StandardScaler(), SVC()),
}
for name, m in models.items():
    r = cross_validate(m, X, y, cv=cv)
    print(f"{name:9}: accuracy {r['test_score'].mean():.3f} +/- {r['test_score'].std():.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">dummy    : accuracy 0.101 +/- 0.001
logistic : accuracy 0.969 +/- 0.010
k-NN k=3 : accuracy 0.976 +/- 0.010
tree     : accuracy 0.859 +/- 0.020
forest   : accuracy 0.977 +/- 0.005
SVM rbf  : accuracy 0.981 +/- 0.007</code></pre>
<p>(Fit times vary by machine, so the solution does not print them; add <code>r['fit_time'].sum()</code> to see yours.) The SVM, k-NN and random forest all reach about 97–98%, far above the 10% dummy and the single tree. Pixel data is "image-like": distances between images are meaningful, which is why k-NN and the RBF SVM do so well. A reasonable choice is the SVM or the forest; if prediction latency mattered on a large stored dataset, you would avoid k-NN. For larger image datasets, convolutional neural networks (deep learning track) would beat them all.</p>`
          },
          quiz: [
            { q: "Why should all models be evaluated with the same cross-validation folds?", options: ["It is faster", "So differences in scores reflect the models, not luck in how the data was split", "scikit-learn requires it", "To increase accuracy"], answer: 1, explain: "Different splits can change scores by several points. Identical folds make the comparison fair." },
            { q: "Model A scores 0.962 +/- 0.015 and model B 0.965 +/- 0.018 in 5-fold CV. A is a logistic regression, B a large ensemble. What is a sensible conclusion?", options: ["B is clearly better", "The difference is within noise; the simpler model A may be preferable", "A is clearly better", "Both are useless"], answer: 1, explain: "A 0.3-point gap is far smaller than the fold-to-fold spread, so it is not convincing. Simplicity, speed and interpretability then favour A." },
            { q: "Which model would you be most careful about using when you need very fast predictions on millions of stored training rows?", options: ["Logistic regression", "Gradient boosting", "k-NN", "Decision tree"], answer: 2, explain: "k-NN compares each query against the stored training data, so prediction cost grows with dataset size." },
            { q: "Which models in this lesson need feature scaling to work well?", options: ["Decision trees and random forests", "Logistic regression, k-NN and SVM", "Only gradient boosting", "None of them"], answer: 1, explain: "Distance- and gradient-based models (k-NN, SVM, logistic regression) are sensitive to feature scale; tree-based models are not." }
          ]
        }
      ]
    },
    {
      id: "ml-evaluation",
      title: "Evaluating and Improving Models",
      summary: "Honest evaluation with splits and cross-validation, the right metrics for classification and regression, overfitting and the bias–variance trade-off, regularization and hyperparameter tuning.",
      lessons: [
        {
          id: "ml-eval-splits-cv",
          title: "Train, Validation and Test Sets; Cross-Validation",
          minutes: 50,
          objectives: [
            "Explain the different jobs of training, validation and test sets",
            "Use stratified and time-based splits correctly",
            "Run k-fold cross-validation and interpret its mean and spread",
            "Avoid tuning on the test set"
          ],
          body: String.raw`
<p>The goal of a model is to do well on data it has <em>never seen</em>. You cannot measure that on the training data, because the model has already seen it — a student who memorised last year's exam answers will ace last year's exam. So we must hold data back. How we hold it back, and how often we look at it, decides whether our performance estimate is honest.</p>

<h3>Three sets, three jobs</h3>
<figure><img alt="Top: a dataset split into 60 percent training, 20 percent validation and 20 percent test. Bottom: 5-fold cross-validation where each fold takes a turn as the validation fold" src="assets/diagrams/ml-data-splits.svg"><figcaption>A hold-out split (top) and 5-fold cross-validation on the non-test data (bottom).</figcaption></figure>
<ul>
  <li><strong>Training set</strong> — the model learns its parameters from this.</li>
  <li><strong>Validation set</strong> (also "dev set") — used to make <em>choices</em>: which model type, which hyperparameters, which features, which threshold. You look at it many times.</li>
  <li><strong>Test set</strong> — locked away until the very end and used <em>once</em> to estimate how the final, chosen model will perform in the real world.</li>
</ul>
<p>Why do we need both validation and test? Every time you pick "the best of several options" by looking at a dataset, you slightly fit your choices to that dataset's quirks. Try 200 hyperparameter settings and pick the best validation score, and part of that score is luck. The test set, untouched by any decision, gives an unbiased final estimate. Typical sizes: 60/20/20 or 70/15/15 for moderate data; with millions of rows, 1–2% for validation and test may be plenty.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)

# Step 1: carve off the test set and lock it away
X_rest, X_test, y_rest, y_test = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)
# Step 2: split the rest into train and validation (0.25 of 80% = 20% of total)
X_train, X_val, y_train, y_val = train_test_split(X_rest, y_rest, test_size=0.25, random_state=0, stratify=y_rest)
print("sizes:", len(X_train), len(X_val), len(X_test))

# Use the VALIDATION set to choose max_depth
best_depth, best_score = None, 0
for depth in [1, 2, 3, 4, 6, 8, None]:
    m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_train, y_train)
    score = m.score(X_val, y_val)
    print(f"max_depth={str(depth):4}  validation accuracy={score:.3f}")
    if score &gt; best_score:
        best_depth, best_score = depth, score

# Retrain the chosen model on train+validation, then evaluate ONCE on test
final = DecisionTreeClassifier(max_depth=best_depth, random_state=0).fit(X_rest, y_rest)
print(f"chosen max_depth={best_depth}; final TEST accuracy={final.score(X_test, y_test):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">sizes: 341 114 114
max_depth=1     validation accuracy=0.904
max_depth=2     validation accuracy=0.939
max_depth=3     validation accuracy=0.930
max_depth=4     validation accuracy=0.947
max_depth=6     validation accuracy=0.912
max_depth=8     validation accuracy=0.912
max_depth=None  validation accuracy=0.912
chosen max_depth=4; final TEST accuracy=0.939</code></pre>

<h3>Stratification and other splitting rules</h3>
<ul>
  <li><strong>Stratify classification splits</strong> (<code>stratify=y</code>) so each part keeps the class proportions. Without it, a rare class might be almost absent from a small validation set.</li>
  <li><strong>Split by time for time-dependent data.</strong> If you predict future sales, train on the past and validate on later periods. A random split lets the model "see the future" (e.g. train on Wednesday, test on Tuesday), giving optimistic scores that collapse in production.</li>
  <li><strong>Split by group when rows are related.</strong> If one patient has 20 scans, all of that patient's scans must be on the same side; otherwise the model can recognise the patient rather than the disease. scikit-learn offers <code>GroupKFold</code> and <code>GroupShuffleSplit</code> for this.</li>
</ul>

<h3>One split is noisy</h3>
<p>With a few hundred rows, the score you get depends a lot on <em>which</em> rows landed in the validation set. Watch the same model scored on ten different random splits:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
scores = []
for seed in range(10):
    X_tr, X_va, y_tr, y_va = train_test_split(X, y, test_size=0.2, random_state=seed, stratify=y)
    scores.append(DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr).score(X_va, y_va))
print("scores:", np.round(scores, 3))
print(f"min {min(scores):.3f}  max {max(scores):.3f}  mean {np.mean(scores):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">scores: [0.921 0.947 0.947 0.947 0.921 0.921 0.974 0.93  0.895 0.956]
min 0.895  max 0.974  mean 0.936</code></pre>
<p>Same model, same data — and a spread of several percentage points purely from the luck of the split. A single split could make a mediocre model look great or vice versa.</p>

<h3>k-fold cross-validation</h3>
<p><strong>Cross-validation (CV)</strong> reduces that luck by using every row for validation exactly once. In <strong>k-fold CV</strong> you split the (non-test) data into k equal parts called <em>folds</em>. You train k times: each time one fold is the validation set and the other k−1 folds are training data. You get k scores; report their <strong>mean</strong> (the estimate) and <strong>standard deviation</strong> (how much it wobbles). k = 5 or 10 is standard. The cost: k times the training time.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score, KFold, StratifiedKFold
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
model = DecisionTreeClassifier(max_depth=3, random_state=0)

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_val_score(model, X, y, cv=skf, scoring="accuracy")
print("5 fold scores:", scores.round(3))
print(f"CV accuracy = {scores.mean():.3f} +/- {scores.std():.3f}")

# What the folds look like: each row is used for validation exactly once
for i, (train_idx, val_idx) in enumerate(KFold(n_splits=5).split(range(10))):
    print(f"fold {i}: train={train_idx}  validate={val_idx}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">5 fold scores: [0.895 0.956 0.93  0.912 0.956]
CV accuracy = 0.930 +/- 0.024
fold 0: train=[2 3 4 5 6 7 8 9]  validate=[0 1]
fold 1: train=[0 1 4 5 6 7 8 9]  validate=[2 3]
fold 2: train=[0 1 2 3 6 7 8 9]  validate=[4 5]
fold 3: train=[0 1 2 3 4 5 8 9]  validate=[6 7]
fold 4: train=[0 1 2 3 4 5 6 7]  validate=[8 9]</code></pre>
<p>For classifiers, passing an integer (<code>cv=5</code>) to scikit-learn automatically uses stratified folds (without shuffling). Passing your own <code>StratifiedKFold(shuffle=True, random_state=...)</code> object is more explicit and lets you reuse the identical folds for every model you compare. <code>cross_validate</code> (plural metrics, timings) is the richer sibling of <code>cross_val_score</code>.</p>

<h3>Time series: never shuffle</h3>
<p>For temporal data, use <code>TimeSeriesSplit</code>: each fold trains on an earlier window and validates on the period right after it, mimicking how the model will be used.</p>
<pre><code class="lang-python runnable">from sklearn.model_selection import TimeSeriesSplit

days = list(range(12))      # imagine 12 consecutive days of data
for i, (tr, va) in enumerate(TimeSeriesSplit(n_splits=4).split(days)):
    print(f"split {i}: train on days {tr.tolist()} -&gt; validate on days {va.tolist()}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">split 0: train on days [0, 1, 2, 3] -&gt; validate on days [4, 5]
split 1: train on days [0, 1, 2, 3, 4, 5] -&gt; validate on days [6, 7]
split 2: train on days [0, 1, 2, 3, 4, 5, 6, 7] -&gt; validate on days [8, 9]
split 3: train on days [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] -&gt; validate on days [10, 11]</code></pre>
<p>Training always precedes validation, so the model never learns from the future.</p>

<h3>Where cross-validation fits in the workflow</h3>
<ol>
  <li>Split off a test set (or keep a later time period aside).</li>
  <li>On the remaining data, use cross-validation to compare models and tune hyperparameters.</li>
  <li>Refit the chosen configuration on all non-test data.</li>
  <li>Evaluate once on the test set and report that number.</li>
</ol>
<div class="callout warn"><strong>Common mistake:</strong> "I tried 30 models, and the test-set winner scored 97%." That 97% is no longer an unbiased estimate, because the test set was used for selection. If you have already looked, be honest about it — or collect a fresh test set.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6, discusses offline evaluation methods beyond a single test score — baselines, perturbation and invariance tests, and evaluating on <em>slices</em> of data. Ch. 4 discusses sampling, including why random splits are wrong for data that changes over time.</div>
`,
          keyPoints: [
            "Training set learns parameters, validation set guides choices, test set gives one final unbiased estimate.",
            "Stratify classification splits; split by time for temporal data and by group for related rows.",
            "A single small split is noisy; k-fold cross-validation uses every row for validation once and reports mean and spread.",
            "Use the same CV folds for every model you compare.",
            "Never select or tune on the test set."
          ],
          exercise: {
            prompt: String.raw`<p>On <code>load_wine</code>, use 5-fold <code>StratifiedKFold(shuffle=True, random_state=1)</code> to compare a scaled k-NN for k in [1, 3, 5, 9, 15, 25]. Print the mean and std for each k, pick the best k by mean CV accuracy, then show that the decision is more trustworthy than a single split by printing, for k = 1 and the best k, the scores from <code>cross_val_score</code> fold by fold.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_wine
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

X, y = load_wine(return_X_y=True)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=1)
results = {}
for k in [1, 3, 5, 9, 15, 25]:
    model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))
    s = cross_val_score(model, X, y, cv=cv)
    results[k] = s
    print(f"k={k:2d}: {s.mean():.3f} +/- {s.std():.3f}")

best_k = max(results, key=lambda k: results[k].mean())
print("best k:", best_k)
print("k=1 folds:   ", results[1].round(3))
print(f"k={best_k} folds:  ", results[best_k].round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">k= 1: 0.955 +/- 0.014
k= 3: 0.966 +/- 0.021
k= 5: 0.961 +/- 0.038
k= 9: 0.966 +/- 0.033
k=15: 0.972 +/- 0.018
k=25: 0.972 +/- 0.025
best k: 25
k=1 folds:    [0.944 0.944 0.972 0.943 0.971]
k=25 folds:   [0.944 0.972 1.    0.943 1.   ]</code></pre>
<p>Looking fold by fold shows the variation a single split would hide: on one fold two settings might tie or swap places, but averaged over five folds the ranking is more reliable. Because the scaler is inside the pipeline, it is re-fitted on each training fold, so no information leaks from the validation fold.</p>`
          },
          quiz: [
            { q: "What is the validation set used for?", options: ["Learning model parameters", "Making choices such as model type and hyperparameters", "The single final performance estimate", "Storing unlabelled data"], answer: 1, explain: "The validation set (or cross-validation) guides decisions. The test set is reserved for the final estimate." },
            { q: "In 5-fold cross-validation, how many times is each row used for validation?", options: ["0", "1", "4", "5"], answer: 1, explain: "Each row belongs to exactly one fold, and each fold is the validation fold once." },
            { q: "You are forecasting next month's demand from 3 years of daily data. Which split is right?", options: ["Random shuffled split", "Train on earlier periods, validate on later ones (e.g. TimeSeriesSplit)", "Stratified split by demand level", "Use all data for training and testing"], answer: 1, explain: "Random splits leak future information into training. Time-ordered splits mimic real usage." },
            { q: "Why is a test set needed if you already use a validation set?", options: ["It is not needed", "Because choosing the best option on the validation set makes its score optimistic; the untouched test set gives an unbiased estimate", "To train a second model", "Because validation sets cannot be stratified"], answer: 1, explain: "Selection on validation data overfits to it slightly. The test set, used once, is free of that bias." }
          ]
        },
        {
          id: "ml-eval-clf-metrics",
          title: "Classification Metrics: Confusion Matrix, Precision, Recall, ROC",
          minutes: 60,
          objectives: [
            "Explain why accuracy misleads on imbalanced data",
            "Build and read a confusion matrix",
            "Compute precision, recall and F1 and choose between them",
            "Interpret ROC curves and AUC, and choose a threshold from business costs"
          ],
          body: String.raw`
<p>"Accuracy: 99%" sounds impressive. But if only 1% of card transactions are fraudulent, a model that <em>always</em> says "not fraud" is 99% accurate and catches zero fraud. Choosing the right metric is choosing what "good" means for your problem. Get it wrong and you will optimise the wrong thing very efficiently.</p>

<h3>The accuracy trap</h3>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, recall_score

# 2% positive class, like fraud
X, y = make_classification(n_samples=5000, weights=[0.98, 0.02], flip_y=0, class_sep=0.5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
print("fraud rate in test:", y_te.mean().round(3))

lazy = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
pred = lazy.predict(X_te)
print("accuracy of 'never fraud':", round(accuracy_score(y_te, pred), 3))
print("fraud cases caught (recall):", recall_score(y_te, pred))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">fraud rate in test: 0.02
accuracy of 'never fraud': 0.98
fraud cases caught (recall): 0.0</code></pre>
<p>98% accuracy, zero usefulness. Accuracy is fine when classes are roughly balanced and all errors cost the same; otherwise we need metrics that look at each kind of error.</p>

<h3>The confusion matrix</h3>
<p>For a binary problem we call one class <strong>positive</strong> (usually the rare or interesting one: fraud, disease, churn) and the other <strong>negative</strong>. Every prediction falls into one of four cells:</p>
<figure><img alt="A 2 by 2 confusion matrix: rows are actual class, columns are predicted class; cells are true negative, false positive, false negative and true positive, with precision and recall formulas" src="assets/diagrams/ml-confusion-matrix.svg"><figcaption>The confusion matrix and the metrics derived from it.</figcaption></figure>
<ul>
  <li><strong>True positive (TP)</strong>: actually positive, predicted positive — fraud caught.</li>
  <li><strong>False positive (FP)</strong>: actually negative, predicted positive — a false alarm ("Type I error"). A legitimate customer's card gets blocked.</li>
  <li><strong>False negative (FN)</strong>: actually positive, predicted negative — a miss ("Type II error"). Fraud slips through.</li>
  <li><strong>True negative (TN)</strong>: actually negative, predicted negative.</li>
</ul>
<p>In scikit-learn, <code>confusion_matrix(y_true, y_pred)</code> returns rows = actual class, columns = predicted class, ordered [0, 1]: so the layout is [[TN, FP], [FN, TP]].</p>

<h3>Precision, recall and F1</h3>
<ul>
  <li><strong>Precision = TP / (TP + FP)</strong> — "Of everything I flagged, how much was really positive?" High precision = few false alarms. Matters when acting on a positive is costly: sending a customer to manual review, or a spam filter that must not hide real emails.</li>
  <li><strong>Recall = TP / (TP + FN)</strong> — also called <em>sensitivity</em> or <em>true positive rate</em>. "Of all real positives, how many did I catch?" High recall = few misses. Matters when missing a positive is costly: cancer screening, fraud, safety defects.</li>
  <li><strong>F1 = 2 · precision · recall / (precision + recall)</strong> — the harmonic mean, a single number that is high only when <em>both</em> are high. Useful when you need one score and care about both.</li>
</ul>
<p>Precision and recall pull against each other through the decision threshold: lowering the threshold flags more cases → recall up, precision down. Here is a realistic model on the imbalanced data:</p>
<pre><code class="lang-python runnable">from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, classification_report

X, y = make_classification(n_samples=5000, weights=[0.98, 0.02], flip_y=0, class_sep=0.5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
model = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_tr, y_tr)
pred = model.predict(X_te)

tn, fp, fn, tp = confusion_matrix(y_te, pred).ravel()
print("confusion matrix [[TN FP] [FN TP]]:\n", confusion_matrix(y_te, pred))
print(f"precision = {tp}/({tp}+{fp}) = {precision_score(y_te, pred):.3f}")
print(f"recall    = {tp}/({tp}+{fn}) = {recall_score(y_te, pred):.3f}")
print(f"F1        = {f1_score(y_te, pred):.3f}")
print(classification_report(y_te, pred, digits=3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">confusion matrix [[TN FP] [FN TP]]:
 [[1464    6]
 [  20   10]]
precision = 10/(10+6) = 0.625
recall    = 10/(10+20) = 0.333
F1        = 0.435
              precision    recall  f1-score   support

           0      0.987     0.996     0.991      1470
           1      0.625     0.333     0.435        30

    accuracy                          0.983      1500
   macro avg      0.806     0.665     0.713      1500
weighted avg      0.979     0.983     0.980      1500</code></pre>
<p><code>classification_report</code> prints precision, recall and F1 for <em>each</em> class plus averages. "Support" is the number of true examples of each class. The <em>macro average</em> treats both classes equally; the <em>weighted average</em> weights by support (and so is dominated by the majority class). Notice the contrast: overall accuracy is 98.3% and the "not fraud" row looks perfect, yet the fraud row tells the real story — at the default 0.5 threshold the model catches only a third of the fraud, and more than a third of its alarms are false.</p>

<h3>ROC curve and AUC</h3>
<p>Precision and recall depend on the threshold. To judge the model <em>across all thresholds</em>, plot the <strong>ROC curve</strong> (receiver operating characteristic): for every threshold, the <strong>true positive rate</strong> (recall) on the y-axis against the <strong>false positive rate</strong> FPR = FP / (FP + TN) on the x-axis. A random-guessing model lies on the diagonal; a perfect model hugs the top-left corner.</p>
<p>The <strong>AUC</strong> (area under the ROC curve) summarises it in one number between 0 and 1: 0.5 = random, 1.0 = perfect. It has a lovely interpretation: <em>AUC is the probability that the model gives a randomly chosen positive a higher score than a randomly chosen negative</em>. AUC is threshold-free, so it measures how well the model <em>ranks</em> examples.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, roc_curve, average_precision_score

X, y = make_classification(n_samples=5000, weights=[0.98, 0.02], flip_y=0, class_sep=0.5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for name, m in [("logistic", LogisticRegression(max_iter=1000)),
                ("random forest", RandomForestClassifier(n_estimators=200, random_state=0))]:
    scores = m.fit(X_tr, y_tr).predict_proba(X_te)[:, 1]
    print(f"{name:13}: ROC AUC = {roc_auc_score(y_te, scores):.3f}   average precision = {average_precision_score(y_te, scores):.3f}")

fpr, tpr, thresholds = roc_curve(y_te, scores)
for target in [0.5, 0.7, 0.8]:
    i = np.argmax(tpr &gt;= target)
    print(f"to reach recall {target}: threshold {thresholds[i]:.3f}, false positive rate {fpr[i]:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logistic     : ROC AUC = 0.933   average precision = 0.602
random forest: ROC AUC = 0.893   average precision = 0.562
to reach recall 0.5: threshold 0.385, false positive rate 0.005
to reach recall 0.7: threshold 0.190, false positive rate 0.014
to reach recall 0.8: threshold 0.135, false positive rate 0.022</code></pre>
<p>Reading the second part: to catch 80% of fraud we must drop the threshold far below 0.5 and accept a higher false positive rate. On heavily imbalanced data even a small FPR means many false alarms in absolute terms (1% of 1,470 legitimate transactions is about 15 blocked customers). For such cases the <strong>precision–recall curve</strong> and its summary, <strong>average precision</strong>, are often more informative than ROC AUC, because they focus on the rare positive class.</p>

<h3>Choosing a threshold by business cost</h3>
<p>The best threshold is a business decision. Put a price on each error, compute the total cost for every candidate threshold on validation data, and pick the cheapest. Suppose a missed fraud costs 200 (the stolen amount) and a false alarm costs 5 (a support call):</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix

X, y = make_classification(n_samples=5000, weights=[0.98, 0.02], flip_y=0, class_sep=0.5, random_state=0)
X_tr, X_val, y_tr, y_val = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
scores = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_tr, y_tr).predict_proba(X_val)[:, 1]

COST_FN, COST_FP = 200, 5
best = None
for t in [0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.02]:
    tn, fp, fn, tp = confusion_matrix(y_val, (scores &gt;= t).astype(int)).ravel()
    cost = fn * COST_FN + fp * COST_FP
    print(f"threshold {t:4}: TP={tp:2d} FN={fn:2d} FP={fp:3d}  total cost = {cost}")
    if best is None or cost &lt; best[1]:
        best = (t, cost)
print("cheapest threshold:", best[0])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">threshold  0.5: TP=10 FN=20 FP=  6  total cost = 4030
threshold  0.4: TP=14 FN=16 FP=  8  total cost = 3240
threshold  0.3: TP=16 FN=14 FP= 10  total cost = 2850
threshold  0.2: TP=20 FN=10 FP= 19  total cost = 2095
threshold  0.1: TP=24 FN= 6 FP= 40  total cost = 1400
threshold 0.05: TP=25 FN= 5 FP= 91  total cost = 1455
threshold 0.02: TP=25 FN= 5 FP=213  total cost = 2065
cheapest threshold: 0.1</code></pre>
<p>Because misses are 40 times more expensive than false alarms, the optimal threshold is far below 0.5. The model did not change at all — only the decision rule did. (scikit-learn also offers <code>TunedThresholdClassifierCV</code>, which picks a threshold by cross-validation for a chosen metric.)</p>
<h3>Cheat sheet</h3>
<table>
  <thead><tr><th>Situation</th><th>Metric to watch</th></tr></thead>
  <tbody>
    <tr><td>Balanced classes, equal error costs</td><td>Accuracy (plus confusion matrix)</td></tr>
    <tr><td>Missing a positive is very costly (disease, fraud)</td><td>Recall (at an acceptable precision)</td></tr>
    <tr><td>False alarms are very costly (spam hiding real mail)</td><td>Precision (at an acceptable recall)</td></tr>
    <tr><td>Need one number balancing both</td><td>F1</td></tr>
    <tr><td>Compare ranking quality across thresholds</td><td>ROC AUC; PR AUC / average precision for heavy imbalance</td></tr>
    <tr><td>Need good probabilities (risk scores)</td><td>Log loss (and calibration)</td></tr>
  </tbody>
</table>
<div class="callout warn"><strong>Common mistake:</strong> reporting precision and recall without saying which class is "positive". In scikit-learn the positive class is label 1 by default (<code>pos_label=1</code>). In the breast cancer dataset 1 means <em>benign</em>, so "recall" there would be recall for benign tumours — probably not what a doctor cares about.</div>
`,
          keyPoints: [
            "Accuracy hides failure on rare classes: always look at the confusion matrix.",
            "Precision = TP/(TP+FP): how trustworthy the alarms are. Recall = TP/(TP+FN): how many positives are caught.",
            "F1 is the harmonic mean of precision and recall.",
            "ROC AUC measures ranking quality across all thresholds; average precision is often better for heavy imbalance.",
            "Pick the decision threshold on validation data by minimising the real cost of false negatives and false positives."
          ],
          exercise: {
            prompt: String.raw`<p>A screening model on 1,000 patients (50 truly sick) produces TP = 40, FN = 10, FP = 90, TN = 860. By hand (in Python as a calculator), compute accuracy, precision, recall, F1 and false positive rate. Then verify with scikit-learn by constructing matching <code>y_true</code> and <code>y_pred</code> arrays. Would you call this a good screening test?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

TP, FN, FP, TN = 40, 10, 90, 860
acc = (TP + TN) / (TP + TN + FP + FN)
prec = TP / (TP + FP)
rec = TP / (TP + FN)
f1 = 2 * prec * rec / (prec + rec)
fpr = FP / (FP + TN)
print(f"accuracy={acc:.3f} precision={prec:.3f} recall={rec:.3f} F1={f1:.3f} FPR={fpr:.3f}")

# Rebuild label arrays with the same counts and check with scikit-learn
y_true = np.array([1] * TP + [1] * FN + [0] * FP + [0] * TN)
y_pred = np.array([1] * TP + [0] * FN + [1] * FP + [0] * TN)
print(confusion_matrix(y_true, y_pred))
print(round(accuracy_score(y_true, y_pred), 3), round(precision_score(y_true, y_pred), 3),
      round(recall_score(y_true, y_pred), 3), round(f1_score(y_true, y_pred), 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">accuracy=0.900 precision=0.308 recall=0.800 F1=0.444 FPR=0.095
[[860  90]
 [ 10  40]]
0.9 0.308 0.8 0.444</code></pre>
<p>Recall is 0.8 — it catches 80% of sick patients — while precision is only about 0.31: roughly 2 of every 3 positive results are false alarms. For a <em>first-stage screening</em> test that is often acceptable (positives get a cheaper confirmatory test), but missing 10 of 50 sick patients may be too many; you might lower the threshold to raise recall. Accuracy (90%) tells you almost nothing here, because "everyone is healthy" would score 95%.</p>`
          },
          quiz: [
            { q: "A model flags 100 transactions as fraud; 80 really are fraud. There were 200 frauds in total. What are precision and recall?", options: ["Precision 0.8, recall 0.4", "Precision 0.4, recall 0.8", "Precision 0.8, recall 0.8", "Precision 0.5, recall 0.4"], answer: 0, explain: "Precision = 80/100 = 0.8 (alarms that were right). Recall = 80/200 = 0.4 (frauds caught)." },
            { q: "For cancer screening, which error is usually the most important to minimise?", options: ["False positives", "False negatives (missed cancers), so recall matters most", "True negatives", "Accuracy errors"], answer: 1, explain: "A missed cancer is far more harmful than a false alarm that leads to a follow-up test, so high recall is the priority." },
            { q: "What does an ROC AUC of 0.5 mean?", options: ["Perfect model", "The model ranks no better than random", "Half the predictions are positive", "Precision is 0.5"], answer: 1, explain: "AUC is the probability a random positive outscores a random negative; 0.5 is chance level." },
            { q: "In scikit-learn's confusion_matrix for labels [0, 1], what is the top-right cell?", options: ["True positives", "False negatives", "False positives", "True negatives"], answer: 2, explain: "Rows are actual, columns predicted: [[TN, FP], [FN, TP]]. Top-right is actual 0, predicted 1: a false positive." },
            { q: "A missed fraud costs 100 and a false alarm costs 1. How should the threshold usually move relative to 0.5?", options: ["Raise it towards 1", "Lower it, accepting more false alarms to catch more fraud", "Keep 0.5 always", "Thresholds do not affect cost"], answer: 1, explain: "When misses are much costlier, flagging more cases (lower threshold) reduces total cost even though false alarms rise." }
          ]
        },
        {
          id: "ml-eval-reg-metrics",
          title: "Regression Metrics: MAE, RMSE and R²",
          minutes: 35,
          objectives: [
            "Compute MAE, MSE, RMSE and R² by hand and with scikit-learn",
            "Explain how outliers affect MAE versus RMSE",
            "Interpret R² and compare against a mean-predicting baseline",
            "Inspect residuals to find systematic errors"
          ],
          body: String.raw`
<p>For regression, errors are distances between numbers, not right/wrong categories. Different metrics summarise those distances differently, and the choice changes which model looks best.</p>

<h3>The main metrics</h3>
<p>With true values yᵢ, predictions ŷᵢ and n examples:</p>
<ul>
  <li><strong>MAE (mean absolute error)</strong> = (1/n) Σ |yᵢ − ŷᵢ|. The average size of a miss, in the target's units. "On average we are off by 12 minutes." Every unit of error counts the same.</li>
  <li><strong>MSE (mean squared error)</strong> = (1/n) Σ (yᵢ − ŷᵢ)². The training loss of linear regression. Squared units, so hard to read directly.</li>
  <li><strong>RMSE (root mean squared error)</strong> = √MSE. Back in the original units, but — because errors are squared before averaging — big misses weigh much more. RMSE ≥ MAE always; a large gap between them signals a few large errors.</li>
  <li><strong>R² (coefficient of determination)</strong> = 1 − SS_res / SS_tot, where SS_res = Σ (yᵢ − ŷᵢ)² and SS_tot = Σ (yᵢ − ȳ)². It compares your model with the dumbest sensible model, "always predict the mean ȳ". R² = 1: perfect. R² = 0: no better than the mean. R² &lt; 0: worse than the mean. Unit-free, so handy for comparing across problems, but it says nothing about the size of errors in real units.</li>
  <li><strong>MAPE (mean absolute percentage error)</strong> = mean of |y − ŷ| / |y|. Intuitive ("off by 8%"), but explodes when true values are near zero.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, root_mean_squared_error, r2_score

y_true = np.array([30, 45, 50, 60, 80])     # delivery times in minutes
y_pred = np.array([32, 40, 55, 58, 70])

err = y_true - y_pred
mae = np.mean(np.abs(err))
mse = np.mean(err ** 2)
rmse = np.sqrt(mse)
r2 = 1 - np.sum(err ** 2) / np.sum((y_true - y_true.mean()) ** 2)
print("errors:", err)
print(f"by hand : MAE={mae:.2f}  MSE={mse:.2f}  RMSE={rmse:.2f}  R2={r2:.3f}")
print(f"sklearn : MAE={mean_absolute_error(y_true, y_pred):.2f}  MSE={mean_squared_error(y_true, y_pred):.2f}  "
      f"RMSE={root_mean_squared_error(y_true, y_pred):.2f}  R2={r2_score(y_true, y_pred):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">errors: [-2  5 -5  2 10]
by hand : MAE=4.80  MSE=31.60  RMSE=5.62  R2=0.886
sklearn : MAE=4.80  MSE=31.60  RMSE=5.62  R2=0.886</code></pre>

<h3>Outliers: MAE vs RMSE</h3>
<p>Suppose one delivery was predicted 60 minutes too early because of a road closure. Watch the two metrics:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.metrics import mean_absolute_error, root_mean_squared_error

y_true = np.array([30, 45, 50, 60, 80, 40, 35, 55, 65, 50])
good = y_true + np.array([2, -3, 4, -2, 3, -1, 2, -4, 3, -2])
one_big_miss = good.copy()
one_big_miss[4] = 20                         # off by 60 minutes once

for name, p in [("small errors only", good), ("one big miss", one_big_miss)]:
    print(f"{name:18}: MAE={mean_absolute_error(y_true, p):5.2f}  RMSE={root_mean_squared_error(y_true, p):5.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">small errors only : MAE= 2.60  RMSE= 2.76
one big miss      : MAE= 8.30  RMSE=19.15</code></pre>
<p>One bad prediction roughly doubles-to-triples MAE but makes RMSE several times bigger. Which is right depends on the business: if a single 60-minute delay angers a customer far more than six 10-minute delays, RMSE reflects that pain. If every minute of error costs the same, MAE is the honest metric. Training with MAE-style losses (e.g. <code>loss="absolute_error"</code> in gradient boosting) makes models more robust to outliers in the target.</p>

<h3>Always compare with a baseline</h3>
<p>An RMSE of 54 means nothing until you know what a trivial model gets. <code>DummyRegressor</code> predicts the training mean (or median). R² is literally a comparison with that baseline.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_diabetes
from sklearn.model_selection import cross_validate, KFold
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

X, y = load_diabetes(return_X_y=True)
cv = KFold(n_splits=5, shuffle=True, random_state=0)
scoring = {"mae": "neg_mean_absolute_error", "rmse": "neg_root_mean_squared_error", "r2": "r2"}
for name, m in [("mean baseline", DummyRegressor()),
                ("linear regression", LinearRegression()),
                ("random forest", RandomForestRegressor(n_estimators=200, random_state=0))]:
    r = cross_validate(m, X, y, cv=cv, scoring=scoring)
    print(f"{name:17}: MAE={-r['test_mae'].mean():5.1f}  RMSE={-r['test_rmse'].mean():5.1f}  R2={r['test_r2'].mean():6.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean baseline    : MAE= 65.8  RMSE= 76.9  R2=-0.001
linear regression: MAE= 44.3  RMSE= 54.5  R2= 0.489
random forest    : MAE= 46.9  RMSE= 57.8  R2= 0.427</code></pre>
<p>Note the <code>neg_</code> prefix: scikit-learn's scorers follow the rule "greater is better", so error metrics are returned negated; we flip the sign to print them. The baseline's R² is slightly below 0 (it is fitted on training folds and evaluated on others). Linear regression beats it clearly; here the random forest does not beat the simple linear model — a useful reminder that complex models are not automatically better.</p>

<h3>Look at the residuals</h3>
<p>A single number hides <em>where</em> the model fails. Residual analysis — looking at y − ŷ against predictions or features — reveals systematic problems: a curve in the residuals means a missed non-linearity; residuals that grow with ŷ mean errors are proportional to size (consider predicting log(y)); a cluster of big residuals for one category reveals a data segment the model handles poorly.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(0)
x = rng.uniform(0, 10, 300)
y = 2 * x + 0.4 * x**2 + rng.normal(0, 2, 300)      # truth is curved
model = LinearRegression().fit(x.reshape(-1, 1), y)
residuals = y - model.predict(x.reshape(-1, 1))

bins = pd.cut(x, [0, 2, 4, 6, 8, 10])
print(pd.Series(residuals).groupby(bins, observed=True).mean().round(2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(0, 2]     3.37
(2, 4]    -2.17
(4, 6]    -3.18
(6, 8]    -1.94
(8, 10]    2.63
dtype: float64</code></pre>
<p>The average residual is positive at both ends and negative in the middle: a tell-tale U-shape. The straight line systematically under-predicts small and large x and over-predicts the middle — the fix is a curved model (polynomial features or a tree ensemble). An unbiased model's residuals should average roughly zero in every bin.</p>
<div class="callout warn"><strong>Common mistake:</strong> quoting R² alone. A high R² can coexist with errors too large for the business (R² = 0.9 on house prices may still mean ±50,000 errors), and R² is easy to inflate by evaluating on training data. Report an error in real units (MAE or RMSE) on held-out data, next to a baseline.</div>
`,
          keyPoints: [
            "MAE is the average absolute miss; RMSE squares first, so it weights large misses heavily; both are in target units.",
            "R-squared compares the model with predicting the mean: 1 perfect, 0 no better, negative worse.",
            "Choose MAE vs RMSE by how the business feels about large errors.",
            "scikit-learn scorers are 'greater is better', so error metrics appear as neg_... values.",
            "Inspect residuals by prediction or feature to find systematic errors a single number hides."
          ],
          exercise: {
            prompt: String.raw`<p>With <code>make_regression(n_samples=400, n_features=5, noise=15, random_state=3)</code>, add 10 large outliers to the <em>training</em> targets (add 500 to <code>y_train[:10]</code>) after a 25% split with <code>random_state=3</code>. Train <code>LinearRegression</code> and <code>HuberRegressor</code> (a regression robust to outliers) on the corrupted training data and report test MAE, RMSE and R² for both. Which is less affected?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, HuberRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score

X, y = make_regression(n_samples=400, n_features=5, noise=15, random_state=3)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=3)
y_tr = y_tr.copy()
y_tr[:10] += 500                      # corrupt 10 training labels

for name, m in [("LinearRegression", LinearRegression()), ("HuberRegressor", HuberRegressor(max_iter=1000))]:
    p = m.fit(X_tr, y_tr).predict(X_te)
    print(f"{name:16}: MAE={mean_absolute_error(y_te, p):6.2f} RMSE={root_mean_squared_error(y_te, p):6.2f} R2={r2_score(y_te, p):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">LinearRegression: MAE= 18.55 RMSE= 23.72 R2=0.979
HuberRegressor  : MAE= 12.19 RMSE= 15.57 R2=0.991</code></pre>
<p>The ordinary least-squares fit is dragged by the 10 corrupted labels (squared loss gives them huge weight), so its test errors grow. The Huber loss is quadratic for small errors but linear for large ones, so outliers pull far less and the model stays close to the true relationship. Note that we only corrupted training data: the test set reflects the clean truth we care about.</p>`
          },
          quiz: [
            { q: "Errors of a model are [1, -1, 1, -1, 10]. Which is larger, MAE or RMSE?", options: ["MAE", "RMSE, because squaring makes the single error of 10 dominate", "They are equal", "Cannot be computed"], answer: 1, explain: "MAE = 14/5 = 2.8, RMSE = sqrt(104/5) = about 4.56. Squaring amplifies the big error." },
            { q: "A model has R-squared = 0 on test data. What does it mean?", options: ["Perfect predictions", "It is no better than always predicting the mean of y", "All predictions are 0", "The model is overfitting"], answer: 1, explain: "R-squared compares squared error with that of predicting the mean; 0 means equal performance." },
            { q: "Why does cross_validate return scoring='neg_mean_absolute_error' values below zero?", options: ["The model is broken", "scikit-learn scorers are 'greater is better', so error metrics are negated", "MAE can be negative", "It reports R-squared instead"], answer: 1, explain: "Negating errors lets every scorer be maximised. Flip the sign to read the MAE." },
            { q: "Residuals are strongly positive for large predictions and near zero for small ones. What does this suggest?", options: ["The model is perfect", "A systematic error, e.g. a missing non-linearity or errors that scale with size", "Too much data", "The metric is wrong"], answer: 1, explain: "Residual patterns show systematic bias; a good model's residuals average near zero everywhere." }
          ]
        },
        {
          id: "ml-eval-bias-variance",
          title: "Overfitting, Underfitting and the Bias–Variance Trade-off",
          minutes: 50,
          objectives: [
            "Recognise underfitting and overfitting from training and validation scores",
            "Explain bias and variance as two sources of error",
            "Use validation curves to choose model complexity",
            "Use learning curves to decide whether more data will help"
          ],
          body: String.raw`
<p>You have now seen overfitting several times: polynomials that wiggle, trees that memorise. This lesson gives you the vocabulary and tools to <em>diagnose</em> it systematically and to decide what to do next — the most valuable debugging skill in applied ML.</p>

<h3>Underfitting and overfitting</h3>
<figure><img alt="Three panels: an underfit straight line through curved data, a good fit following the curve, and an overfit wiggly curve through every point; below, a chart where training error falls with complexity while validation error forms a U shape" src="assets/diagrams/ml-fit-spectrum.svg"><figcaption>Underfitting, a good fit and overfitting; the validation error is lowest at intermediate complexity.</figcaption></figure>
<ul>
  <li><strong>Underfitting</strong>: the model is too simple to capture the pattern. <em>Both</em> training and validation scores are poor and close together. Example: a straight line through curved data.</li>
  <li><strong>Overfitting</strong>: the model is so flexible it learns the noise. Training score is excellent, validation score much worse — a big <em>gap</em>. Example: a degree-15 polynomial, an unlimited tree.</li>
  <li><strong>Good fit</strong>: validation score as high as achievable, with a modest gap.</li>
</ul>
<table>
  <thead><tr><th>Symptom</th><th>Diagnosis</th><th>Remedies</th></tr></thead>
  <tbody>
    <tr><td>Train poor, validation poor (similar)</td><td>Underfitting (high bias)</td><td>More complex model, better features, less regularization, train longer</td></tr>
    <tr><td>Train great, validation much worse</td><td>Overfitting (high variance)</td><td>More data, simpler model, stronger regularization, fewer/better features, ensembles (bagging), early stopping</td></tr>
    <tr><td>Train great, validation great</td><td>Good — now check the test set</td><td>Ship it (after testing and slice checks)</td></tr>
  </tbody>
</table>

<h3>Bias and variance</h3>
<p>Imagine you could collect many different training sets from the same world and train your model on each. Two things can go wrong:</p>
<ul>
  <li><strong>Bias</strong> is error from wrong assumptions: the <em>average</em> model (over all those training sets) is still off target. A straight line fitted to a curve is biased no matter how much data you give it.</li>
  <li><strong>Variance</strong> is error from sensitivity to the particular training set: the models trained on different samples disagree wildly with each other. A deep tree has high variance — change a few rows and it changes shape.</li>
</ul>
<p>For squared error, the expected test error decomposes neatly as <strong>bias² + variance + irreducible noise</strong>. The noise part (randomness in y that no feature explains) is a floor nobody can beat. Making a model more flexible typically lowers bias and raises variance; the sweet spot minimises their sum. That is the <strong>bias–variance trade-off</strong>. We can measure both directly by simulation:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
true_f = lambda x: np.sin(1.5 * x)
x_test = np.linspace(-2.5, 2.5, 50)

print("degree | bias^2 | variance | sum")
for degree in [1, 3, 10]:
    preds = []
    for _ in range(200):                                  # 200 different training sets
        x = rng.uniform(-2.5, 2.5, 25)
        y = true_f(x) + rng.normal(0, 0.3, 25)
        m = make_pipeline(PolynomialFeatures(degree), StandardScaler(), LinearRegression())
        preds.append(m.fit(x.reshape(-1, 1), y).predict(x_test.reshape(-1, 1)))
    preds = np.array(preds)
    bias2 = np.mean((preds.mean(axis=0) - true_f(x_test)) ** 2)
    var = np.mean(preds.var(axis=0))
    print(f"{degree:6d} | {bias2:6.3f} | {var:8.3f} | {bias2 + var:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">degree | bias^2 | variance | sum
     1 |  0.363 |    0.042 | 0.405
     3 |  0.023 |    0.031 | 0.054
    10 | 13.900 | 1728.553 | 1742.453</code></pre>
<p>Degree 1 is dominated by bias (a line cannot follow a sine), degree 10 by variance (each training set produces a very different wiggly curve), and degree 3 balances the two with the lowest total. (The degree-10 numbers are enormous because a few unlucky training sets produce curves that shoot off near the edges of the range; those wild curves even drag the <em>average</em> prediction away from the truth.)</p>

<h3>Validation curves: choosing complexity</h3>
<p>A <strong>validation curve</strong> plots training and cross-validated scores against one hyperparameter that controls complexity. <code>validation_curve</code> computes it for you:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import validation_curve, StratifiedKFold
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
depths = [1, 2, 3, 4, 5, 7, 10, 15]
train_scores, val_scores = validation_curve(
    DecisionTreeClassifier(random_state=0), X, y,
    param_name="max_depth", param_range=depths,
    cv=StratifiedKFold(5, shuffle=True, random_state=0))

for d, tr, va in zip(depths, train_scores.mean(axis=1), val_scores.mean(axis=1)):
    print(f"max_depth={d:2d}: train={tr:.3f}  validation={va:.3f}  gap={tr - va:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">max_depth= 1: train=0.927  validation=0.896  gap=0.030
max_depth= 2: train=0.950  validation=0.917  gap=0.032
max_depth= 3: train=0.975  validation=0.930  gap=0.045
max_depth= 4: train=0.983  validation=0.926  gap=0.057
max_depth= 5: train=0.993  validation=0.938  gap=0.054
max_depth= 7: train=1.000  validation=0.923  gap=0.077
max_depth=10: train=1.000  validation=0.926  gap=0.074
max_depth=15: train=1.000  validation=0.926  gap=0.074</code></pre>
<p>Training accuracy rises to 1.0 with depth while validation accuracy peaks at a moderate depth (3–5) and then sags slightly; the gap widens as depth grows. Choose the depth near the validation peak — and if several are close, the simpler one.</p>

<h3>Learning curves: will more data help?</h3>
<p>A <strong>learning curve</strong> plots scores against the <em>amount of training data</em>. It answers a question that costs real money: should we collect more data?</p>
<ul>
  <li>If training and validation curves have <strong>converged at a low score</strong>, more data will not help — the model is too simple (high bias). Improve the model or features.</li>
  <li>If there is a <strong>large gap that shrinks as data grows</strong>, the model is overfitting (high variance) and more data is likely to help.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import learning_curve, StratifiedKFold
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

X, y = load_digits(return_X_y=True)
cv = StratifiedKFold(5, shuffle=True, random_state=0)
for name, model in [("GaussianNB (simple)", GaussianNB()), ("SVC rbf (flexible)", SVC(gamma=0.001))]:
    sizes, tr, va = learning_curve(model, X, y, cv=cv, train_sizes=[0.1, 0.25, 0.5, 0.75, 1.0])
    print(name)
    for n, a, b in zip(sizes, tr.mean(axis=1), va.mean(axis=1)):
        print(f"  {n:5d} training rows: train={a:.3f}  validation={b:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">GaussianNB (simple)
    143 training rows: train=0.989  validation=0.651
    359 training rows: train=0.952  validation=0.795
    718 training rows: train=0.871  validation=0.817
   1077 training rows: train=0.891  validation=0.861
   1437 training rows: train=0.860  validation=0.851
SVC rbf (flexible)
    143 training rows: train=0.996  validation=0.828
    359 training rows: train=0.998  validation=0.942
    718 training rows: train=0.999  validation=0.977
   1077 training rows: train=0.999  validation=0.982
   1437 training rows: train=0.999  validation=0.990</code></pre>
<p>The simple Gaussian naive Bayes model plateaus early at a mediocre score with train and validation close together — high bias; more data barely helps. The SVM keeps improving on validation as data grows, with the gap closing — it benefits from more data. Same dataset, different diagnoses, different next steps.</p>
<div class="callout tip"><strong>Tip:</strong> before any expensive step (labelling more data, a bigger model, weeks of feature work), plot a learning curve and a validation curve. Ten minutes of diagnosis can save weeks of effort spent on the wrong fix.</div>
<div class="callout warn"><strong>Common mistake:</strong> fighting overfitting by tuning on the test set or by deleting "hard" validation examples. Both make the numbers look better while making the real-world model no better. Fix the model or data; keep evaluation honest.</div>
<div class="callout info"><strong>Deep learning footnote:</strong> very large neural networks sometimes behave differently ("double descent": test error falls again past the point of memorisation). For the classic models in this track, the U-shaped picture is the one to use.</div>
`,
          keyPoints: [
            "Underfitting: train and validation both poor. Overfitting: train much better than validation (large gap).",
            "Expected squared error = bias^2 + variance + irreducible noise; flexibility trades bias for variance.",
            "Validation curves show scores versus a complexity hyperparameter; pick near the validation peak.",
            "Learning curves show scores versus training size; converged-low means high bias, a shrinking gap means more data helps.",
            "Diagnose before you fix: different problems need opposite remedies."
          ],
          exercise: {
            prompt: String.raw`<p>Use <code>validation_curve</code> with a scaled k-NN pipeline on <code>load_breast_cancer</code> to scan <code>kneighborsclassifier__n_neighbors</code> over [1, 3, 5, 9, 15, 25, 51, 101] with 5-fold <code>StratifiedKFold(shuffle=True, random_state=0)</code>. Print train and validation accuracy. Which k values underfit, which overfit, and which would you choose? (Hint: in a pipeline, parameter names are <code>stepname__param</code>.)</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import validation_curve, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

X, y = load_breast_cancer(return_X_y=True)
ks = [1, 3, 5, 9, 15, 25, 51, 101]
pipe = make_pipeline(StandardScaler(), KNeighborsClassifier())
tr, va = validation_curve(pipe, X, y, param_name="kneighborsclassifier__n_neighbors",
                          param_range=ks, cv=StratifiedKFold(5, shuffle=True, random_state=0))
for k, a, b in zip(ks, tr.mean(axis=1), va.mean(axis=1)):
    print(f"k={k:3d}: train={a:.3f}  validation={b:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">k=  1: train=1.000  validation=0.958
k=  3: train=0.982  validation=0.965
k=  5: train=0.978  validation=0.965
k=  9: train=0.975  validation=0.965
k= 15: train=0.965  validation=0.961
k= 25: train=0.955  validation=0.960
k= 51: train=0.952  validation=0.947
k=101: train=0.930  validation=0.931</code></pre>
<p>k = 1 has perfect training accuracy (each point is its own neighbour) and a clear gap: overfitting. Very large k (51, 101) smooths so much that both scores slide down together: underfitting. The validation peak sits at moderate k; any value in that plateau is a fine choice, and slightly larger k is the safer (smoother) option when scores tie. Note: for k-NN, <em>small</em> k is the complex model — complexity does not always grow with the hyperparameter's value.</p>`
          },
          quiz: [
            { q: "Training accuracy 0.71, validation accuracy 0.70. Likely diagnosis?", options: ["Overfitting", "Underfitting (high bias), if better performance is achievable", "Data leakage", "Perfect model"], answer: 1, explain: "Both scores are low and close together, so the model is too simple to capture the pattern (assuming a better score is possible)." },
            { q: "Which remedy helps HIGH VARIANCE (overfitting)?", options: ["Use a more complex model", "Reduce regularization", "Get more training data or increase regularization", "Remove the validation set"], answer: 2, explain: "Variance falls with more data, simpler models or stronger regularization." },
            { q: "A learning curve shows train and validation scores converged at a low value as data increases. What should you do?", options: ["Collect much more data", "Improve the model or features, because more data will not help a high-bias model", "Stop evaluating", "Lower the test size"], answer: 1, explain: "Converged low curves indicate bias: the model cannot represent the pattern regardless of data volume." },
            { q: "What part of the expected error can no model remove?", options: ["Bias", "Variance", "Irreducible noise in the target", "Regularization"], answer: 2, explain: "Randomness in y not explained by the features sets a floor on achievable error." }
          ]
        },
        {
          id: "ml-eval-regularization-tuning",
          title: "Regularization and Hyperparameter Tuning",
          minutes: 55,
          objectives: [
            "Explain L2 (Ridge) and L1 (Lasso) regularization and their effect on coefficients",
            "Choose regularization strength with cross-validation",
            "Tune hyperparameters with GridSearchCV and RandomizedSearchCV",
            "Report a final, unbiased test score after tuning"
          ],
          body: String.raw`
<p>Regularization is the main tool for controlling overfitting without throwing features away, and hyperparameter tuning is the disciplined way to pick settings such as regularization strength, tree depth or learning rate. Together they turn "a model" into "a well-chosen model".</p>

<h3>Regularization: penalising complexity</h3>
<p>Overfit linear models usually have <em>huge</em> coefficients that cancel each other out to thread through noisy points. <strong>Regularization</strong> adds a penalty on coefficient size to the loss, so the model must justify every large weight with a real reduction in error:</p>
<ul>
  <li><strong>L2 / Ridge</strong>: loss = MSE + α · Σ wⱼ². Shrinks all coefficients smoothly towards zero, rarely exactly to zero. Great with many correlated features (it shares weight among them instead of the wild ± swings you saw with the diabetes data).</li>
  <li><strong>L1 / Lasso</strong>: loss = MSE + α · Σ |wⱼ|. Pushes some coefficients <em>exactly</em> to zero — automatic <strong>feature selection</strong>. Good when you suspect only a few features matter.</li>
  <li><strong>Elastic Net</strong>: a mix of both.</li>
</ul>
<p>The hyperparameter <strong>α</strong> (alpha) sets the strength: α = 0 is plain linear regression; large α forces coefficients towards zero (simpler model, more bias, less variance). The intercept is not penalised. Because the penalty treats all coefficients alike, <strong>features must be standardized</strong> first — otherwise a feature measured in small units (and so needing a big coefficient) is unfairly punished.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(1)
x = rng.uniform(-3, 3, 40)
y = 0.5 * x**2 - x + 2 + rng.normal(0, 0.5, 40)
X_tr, X_te, y_tr, y_te = train_test_split(x.reshape(-1, 1), y, test_size=0.5, random_state=0)

models = {
    "no regularization": LinearRegression(),
    "Ridge alpha=1": Ridge(alpha=1.0),
    "Lasso alpha=0.05": Lasso(alpha=0.05, max_iter=50000),
}
for name, reg in models.items():
    m = make_pipeline(PolynomialFeatures(15, include_bias=False), StandardScaler(), reg).fit(X_tr, y_tr)
    coefs = m[-1].coef_
    print(f"{name:18}: test MSE={mean_squared_error(y_te, m.predict(X_te)):10.3f}  "
          f"largest |coef|={np.abs(coefs).max():9.1f}  zero coefs={np.sum(np.abs(coefs) &lt; 1e-6)}/15")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">no regularization : test MSE=  6732.493  largest |coef|=   7047.7  zero coefs=0/15
Ridge alpha=1     : test MSE=     0.115  largest |coef|=      1.2  zero coefs=0/15
Lasso alpha=0.05  : test MSE=     0.096  largest |coef|=      1.5  zero coefs=12/15</code></pre>
<p>Same degree-15 polynomial that exploded in the regression module — but with a penalty, the coefficients stay small and the test error drops to near the noise level. Lasso has switched off most of the 15 polynomial terms entirely. Regularization let us keep a flexible model while controlling its variance.</p>

<h3>Choosing alpha</h3>
<p>Alpha is a hyperparameter, so we pick it by cross-validation. Watch the coefficients shrink as alpha grows on the diabetes data:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import cross_val_score, KFold

X, y = load_diabetes(return_X_y=True)        # already standardized
cv = KFold(5, shuffle=True, random_state=0)
print("alpha  | Ridge CV R2 | Lasso CV R2 | Lasso non-zero coefs")
for alpha in [0.001, 0.01, 0.1, 1, 10]:
    r = cross_val_score(Ridge(alpha=alpha), X, y, cv=cv).mean()
    l = cross_val_score(Lasso(alpha=alpha, max_iter=10000), X, y, cv=cv).mean()
    nz = np.sum(Lasso(alpha=alpha, max_iter=10000).fit(X, y).coef_ != 0)
    print(f"{alpha:6} | {r:11.3f} | {l:11.3f} | {nz}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">alpha  | Ridge CV R2 | Lasso CV R2 | Lasso non-zero coefs
 0.001 |       0.489 |       0.489 | 10
  0.01 |       0.489 |       0.489 | 10
   0.1 |       0.488 |       0.487 | 7
     1 |       0.420 |       0.345 | 3
    10 |       0.158 |      -0.001 | 0</code></pre>
<p>Too little regularization changes nothing; too much destroys the model (with alpha = 10 Lasso has zeroed every coefficient and predicts the mean). Somewhere in between is a good value. scikit-learn's <code>RidgeCV</code> and <code>LassoCV</code> search alpha with built-in cross-validation. For classifiers, <code>LogisticRegression</code> uses the inverse parameter <code>C</code> = 1/strength: <em>smaller C means stronger regularization</em>. Tree models are regularized through depth and leaf size; neural networks through weight decay (L2), dropout and early stopping.</p>

<h3>Hyperparameter tuning with GridSearchCV</h3>
<p><strong>Grid search</strong> tries every combination from lists of values and scores each by cross-validation. <code>GridSearchCV</code> does the bookkeeping, then automatically refits the best configuration on all the data you gave it (<code>refit=True</code>).</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)

pipe = Pipeline([("scale", StandardScaler()), ("svm", SVC())])
param_grid = {                         # step name + "__" + parameter name
    "svm__C": [0.1, 1, 10, 100],
    "svm__gamma": [0.001, 0.01, 0.1],
}
search = GridSearchCV(pipe, param_grid, cv=StratifiedKFold(5, shuffle=True, random_state=0),
                      scoring="accuracy", n_jobs=-1)
search.fit(X_train, y_train)           # 4 x 3 = 12 combinations x 5 folds = 60 fits

print("best params:", search.best_params_)
print(f"best CV accuracy: {search.best_score_:.3f}")
res = pd.DataFrame(search.cv_results_)[["param_svm__C", "param_svm__gamma", "mean_test_score", "rank_test_score"]]
print(res.sort_values("rank_test_score").head(5).to_string(index=False))
print(f"final TEST accuracy (used once): {search.score(X_test, y_test):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best params: {'svm__C': 10, 'svm__gamma': 0.01}
best CV accuracy: 0.982
 param_svm__C  param_svm__gamma  mean_test_score  rank_test_score
         10.0             0.010         0.982418                1
        100.0             0.001         0.978022                2
        100.0             0.010         0.969231                3
          1.0             0.010         0.969231                3
         10.0             0.001         0.967033                5
final TEST accuracy (used once): 0.974</code></pre>
<p>Notice the workflow: test set split off first; all tuning happens inside <code>GridSearchCV</code> using only training data; the test set is touched exactly once at the end. Because the scaler is a pipeline step, it is re-fitted inside every CV fold — no leakage.</p>

<h3>RandomizedSearchCV: when the grid gets big</h3>
<p>Grids grow multiplicatively: 5 hyperparameters × 5 values = 3,125 combinations. <strong>Random search</strong> samples a fixed number of random combinations from ranges or distributions. It is usually as good as grid search for a fraction of the cost, because typically only one or two hyperparameters really matter — random search tries many distinct values of each, while a grid wastes evaluations repeating the same few. Use log-uniform distributions for scale-type parameters like learning rate, C or alpha.</p>
<pre><code class="lang-python runnable">from scipy.stats import loguniform, randint
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, RandomizedSearchCV, StratifiedKFold
from sklearn.ensemble import HistGradientBoostingClassifier

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)

param_dist = {
    "learning_rate": loguniform(0.01, 0.5),     # sample on a log scale
    "max_leaf_nodes": randint(4, 64),
    "min_samples_leaf": randint(5, 50),
    "l2_regularization": loguniform(1e-4, 10),
}
search = RandomizedSearchCV(HistGradientBoostingClassifier(random_state=0), param_dist,
                            n_iter=20, scoring="roc_auc", random_state=0, n_jobs=-1,
                            cv=StratifiedKFold(5, shuffle=True, random_state=0))
search.fit(X_train, y_train)
print("best params:", {k: (round(float(v), 4) if isinstance(v, float) else int(v)) for k, v in search.best_params_.items()})
print(f"best CV ROC AUC: {search.best_score_:.4f}")
print(f"test ROC AUC: {search.score(X_test, y_test):.4f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best params: {'l2_regularization': 0.1149, 'learning_rate': 0.1117, 'max_leaf_nodes': 19, 'min_samples_leaf': 9}
best CV ROC AUC: 0.9926
test ROC AUC: 0.9798</code></pre>
<p>Beyond these, there are smarter searchers (successive halving: <code>HalvingGridSearchCV</code>; Bayesian optimisation libraries such as Optuna) that spend more evaluations near promising regions. The principles stay the same.</p>
<h3>Tuning hygiene</h3>
<ul>
  <li>Tune the hyperparameters that matter most: regularization strength, tree depth/leaves, learning rate and number of boosting rounds, k for k-NN.</li>
  <li>Start with coarse, wide, log-spaced ranges; refine around the best region. If the best value is at the edge of your range, extend the range.</li>
  <li>Expect diminishing returns: better features or more data often beat heavy tuning.</li>
  <li>The best CV score is slightly optimistic (you selected the maximum); the test score is the honest one.</li>
</ul>
<div class="callout warn"><strong>Common mistake:</strong> scaling (or otherwise preprocessing) the whole dataset <em>before</em> grid search. The scaler then saw the validation folds, which is a subtle leak. Put preprocessing inside the pipeline that you pass to <code>GridSearchCV</code>.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6, covers hyperparameter tuning and AutoML, noting that well-tuned simple models can outperform poorly tuned fancy ones, and warning never to use the test split for tuning.</div>
`,
          keyPoints: [
            "Regularization adds a penalty on coefficient size: L2/Ridge shrinks all weights, L1/Lasso sets some exactly to zero.",
            "Larger alpha (or smaller C in LogisticRegression) means stronger regularization: more bias, less variance.",
            "Standardize features before regularized linear models.",
            "GridSearchCV tries all combinations with CV; RandomizedSearchCV samples combinations and scales to large spaces.",
            "Split off the test set first, tune inside a pipeline on training data, and score the test set once."
          ],
          exercise: {
            prompt: String.raw`<p>On <code>load_wine</code> with a 25% stratified test split (<code>random_state=0</code>), tune a pipeline of <code>StandardScaler</code> + <code>LogisticRegression(max_iter=5000)</code> over <code>C</code> in [0.001, 0.01, 0.1, 1, 10, 100] using <code>GridSearchCV</code> with 5-fold stratified CV (<code>shuffle=True, random_state=0</code>). Print mean CV accuracy for each C, the best C, and the test accuracy. Explain what happens at C = 0.001.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_wine(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))
grid = GridSearchCV(pipe, {"logisticregression__C": [0.001, 0.01, 0.1, 1, 10, 100]},
                    cv=StratifiedKFold(5, shuffle=True, random_state=0))
grid.fit(X_tr, y_tr)
for C, s in zip(grid.cv_results_["param_logisticregression__C"], grid.cv_results_["mean_test_score"]):
    print(f"C={C:&lt;6}: CV accuracy {s:.3f}")
print("best:", grid.best_params_, " test accuracy:", round(grid.score(X_te, y_te), 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">C=0.001 : CV accuracy 0.670
C=0.01  : CV accuracy 0.970
C=0.1   : CV accuracy 0.970
C=1.0   : CV accuracy 0.963
C=10.0  : CV accuracy 0.963
C=100.0 : CV accuracy 0.956
best: {'logisticregression__C': 0.01}  test accuracy: 0.978</code></pre>
<p>At C = 0.001 regularization is so strong that coefficients are squeezed nearly to zero: the model barely uses the features and underfits. Accuracy rises quickly as C grows and then plateaus — on this easy, well-separated dataset, weak regularization does not hurt much. When several values tie, preferring the smaller C (simpler model) is a reasonable tie-break.</p>`
          },
          quiz: [
            { q: "What is the key practical difference between Lasso (L1) and Ridge (L2)?", options: ["Lasso is for classification only", "Lasso can set coefficients exactly to zero (feature selection); Ridge shrinks them but keeps them non-zero", "Ridge has no hyperparameter", "They are identical"], answer: 1, explain: "The absolute-value penalty of L1 produces sparse solutions; the squared penalty of L2 shrinks smoothly." },
            { q: "In LogisticRegression, what does decreasing C do?", options: ["Weakens regularization", "Strengthens regularization, giving a simpler model", "Increases the learning rate", "Nothing"], answer: 1, explain: "C is the inverse of regularization strength: smaller C, stronger penalty." },
            { q: "Why prefer RandomizedSearchCV over GridSearchCV for 6 hyperparameters?", options: ["It always finds the exact optimum", "The grid grows multiplicatively; random sampling covers the important dimensions well with a fixed budget", "Grid search cannot use cross-validation", "Random search needs no scoring metric"], answer: 1, explain: "Random search controls cost via n_iter and tries many distinct values of each parameter." },
            { q: "After GridSearchCV, which number should you report as expected real-world performance?", options: ["best_score_ on CV", "The training score", "The score on the untouched test set", "The worst CV fold"], answer: 2, explain: "best_score_ is slightly optimistic because it was selected as a maximum. The test set, used once, is unbiased." }
          ]
        }
      ]
    },
    {
      id: "ml-features",
      title: "Data Preprocessing and Feature Engineering",
      summary: "Turn messy real-world tables into model-ready features: imputation, scaling, encoding, leak-free pipelines, feature engineering, class imbalance and slice-based evaluation.",
      lessons: [
        {
          id: "ml-feat-preprocessing",
          title: "Missing Values, Scaling and Encoding Categories",
          minutes: 50,
          objectives: [
            "Handle missing values with SimpleImputer and missing-value indicators",
            "Choose between StandardScaler, MinMaxScaler and RobustScaler",
            "Encode categorical features with OneHotEncoder and OrdinalEncoder",
            "Apply the fit-on-train, transform-everything rule"
          ],
          body: String.raw`
<p>The bundled datasets so far were clean: all numbers, nothing missing. Real data is not. It has blanks, text categories like "Gold" or "Berlin", numbers on wildly different scales and typos. scikit-learn models need a <em>complete numeric matrix</em>, so preprocessing turns raw columns into that matrix. Done well, it is often worth more than switching algorithms.</p>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 5 "Feature Engineering", covers handling missing values (and the different reasons values go missing), scaling, discretization, encoding categorical features, feature crossing and data leakage — the topics of this module.</div>

<h3>A messy little dataset</h3>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

df = pd.DataFrame({
    "age":       [34, 51, np.nan, 23, 45, 38, np.nan, 29],
    "income":    [52_000, 88_000, 61_000, np.nan, 150_000, 47_000, 58_000, 39_000],
    "plan":      ["basic", "gold", "silver", "basic", "gold", np.nan, "silver", "basic"],
    "city":      ["Berlin", "Paris", "Berlin", "Rome", "Paris", "Rome", "Berlin", "Paris"],
    "churned":   [0, 0, 1, 1, 0, 1, 0, 1],
})
print(df)
print("\nMissing values per column:\n", df.isna().sum())
print("\nColumn types:\n", df.dtypes)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">    age    income    plan    city  churned
0  34.0   52000.0   basic  Berlin        0
1  51.0   88000.0    gold   Paris        0
2   NaN   61000.0  silver  Berlin        1
3  23.0       NaN   basic    Rome        1
4  45.0  150000.0    gold   Paris        0
5  38.0   47000.0     NaN    Rome        1
6   NaN   58000.0  silver  Berlin        0
7  29.0   39000.0   basic   Paris        1

Missing values per column:
 age        2
income     1
plan       1
city       0
churned    0
dtype: int64

Column types:
 age        float64
income     float64
plan           str
city           str
churned      int64
dtype: object</code></pre>

<h3>Missing values</h3>
<p>First ask <em>why</em> values are missing, because the reason changes the right fix:</p>
<ul>
  <li><strong>Missing completely at random</strong> — a sensor glitch, a lost form. Filling in a typical value is reasonable.</li>
  <li><strong>Missing for a reason related to other data</strong> — e.g. younger users skip the income question more often.</li>
  <li><strong>Missing because of the value itself</strong> — e.g. people with very high income decline to state it. Here "is missing" is itself informative.</li>
</ul>
<p>Options:</p>
<ol>
  <li><strong>Drop rows</strong> (<code>df.dropna()</code>) — only if few rows are affected and they are missing at random; otherwise you lose data and can bias the sample.</li>
  <li><strong>Drop the column</strong> — if most values are missing and it is not important.</li>
  <li><strong>Impute</strong> (fill in): mean or median for numbers (median is robust to outliers), most frequent value or a constant like "missing" for categories. scikit-learn's <code>SimpleImputer</code> does this; <code>KNNImputer</code> and <code>IterativeImputer</code> are smarter alternatives.</li>
  <li><strong>Add a missing indicator</strong> — a 0/1 column "age_was_missing", so the model can learn if missingness itself predicts the target (<code>add_indicator=True</code>).</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer

X_train = pd.DataFrame({"age": [34, 51, np.nan, 23, 45], "income": [52_000, 88_000, 61_000, np.nan, 150_000]})
X_new = pd.DataFrame({"age": [np.nan, 60], "income": [70_000, np.nan]})

imp = SimpleImputer(strategy="median", add_indicator=True)
imp.fit(X_train)                       # learns the medians FROM TRAINING DATA ONLY
print("learned medians:", imp.statistics_)
print(pd.DataFrame(imp.transform(X_new), columns=imp.get_feature_names_out()))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">learned medians: [3.95e+01 7.45e+04]
    age   income  missingindicator_age  missingindicator_income
0  39.5  70000.0                   1.0                      0.0
1  60.0  74500.0                   0.0                      1.0</code></pre>
<p>Note the pattern that every preprocessing step follows: <code>fit</code> learns something (here, medians) from the <strong>training</strong> data; <code>transform</code> applies it to any data — training, validation, test, or a live request in production. The new rows are filled with the <em>training</em> medians. This is the <strong>fit-on-train, transform-everything</strong> rule, and breaking it causes data leakage (next lesson).</p>

<h3>Scaling numeric features</h3>
<p>Models based on distances (k-NN, SVM, k-means) or gradients and penalties (linear/logistic regression, neural networks) care about feature scale. Trees and tree ensembles do not. The common scalers:</p>
<table>
  <thead><tr><th>Scaler</th><th>Formula</th><th>Use when</th></tr></thead>
  <tbody>
    <tr><td><code>StandardScaler</code></td><td>(x − mean) / std → mean 0, std 1</td><td>The default choice</td></tr>
    <tr><td><code>MinMaxScaler</code></td><td>(x − min) / (max − min) → range [0, 1]</td><td>You need bounded values (e.g. pixel intensities); sensitive to outliers</td></tr>
    <tr><td><code>RobustScaler</code></td><td>(x − median) / IQR</td><td>Data has strong outliers</td></tr>
  </tbody>
</table>
<p>For heavily skewed features like income or counts, a <strong>log transform</strong> (<code>np.log1p</code>) before scaling often helps: it pulls in the long tail so that the difference between 1 million and 2 million matters about as much as between 10,000 and 20,000.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

income = np.array([[30_000], [42_000], [47_000], [55_000], [61_000], [2_000_000]])   # one billionaire-ish outlier
for scaler in [StandardScaler(), MinMaxScaler(), RobustScaler()]:
    out = scaler.fit_transform(income).ravel()
    print(f"{type(scaler).__name__:15}", np.round(out, 2))
print("log1p          ", np.round(np.log1p(income).ravel(), 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">StandardScaler  [-0.47 -0.45 -0.45 -0.44 -0.43  2.24]
MinMaxScaler    [0.   0.01 0.01 0.01 0.02 1.  ]
RobustScaler    [ -1.29  -0.55  -0.25   0.25   0.62 119.94]
log1p           [10.31 10.65 10.76 10.92 11.02 14.51]</code></pre>
<p>With the outlier present, StandardScaler and MinMaxScaler squash the five normal incomes into a tiny range (they become nearly indistinguishable), while RobustScaler keeps them spread out. The log transform makes the outlier far less extreme.</p>

<h3>Encoding categorical features</h3>
<p>Models need numbers, so text categories must be encoded.</p>
<ul>
  <li><strong>One-hot encoding</strong>: one new 0/1 column per category. "city = Paris" becomes city_Berlin = 0, city_Paris = 1, city_Rome = 0. Right for <em>nominal</em> categories with no order (city, colour, product type). Use <code>OneHotEncoder(handle_unknown="ignore")</code> so a category never seen in training (a new city) becomes all zeros instead of crashing in production.</li>
  <li><strong>Ordinal encoding</strong>: map categories to integers 0, 1, 2… Right for <em>ordered</em> categories (basic &lt; silver &lt; gold; small &lt; medium &lt; large) — pass the order explicitly. Also acceptable for tree models with many categories.</li>
</ul>
<p>Why not just number the cities 0, 1, 2? Because a linear model would then believe Rome (2) is "twice" Paris (1) and that Paris lies "between" Berlin and Rome — an order that does not exist.</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

train = pd.DataFrame({"city": ["Berlin", "Paris", "Rome", "Paris"], "plan": ["basic", "gold", "silver", "basic"]})
new = pd.DataFrame({"city": ["Madrid", "Rome"], "plan": ["gold", "silver"]})   # Madrid never seen

ohe = OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(train[["city"]])
print(pd.DataFrame(ohe.transform(new[["city"]]), columns=ohe.get_feature_names_out()))

ord_enc = OrdinalEncoder(categories=[["basic", "silver", "gold"]]).fit(train[["plan"]])
print("plan encoded:", ord_enc.transform(new[["plan"]]).ravel())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   city_Berlin  city_Paris  city_Rome
0          0.0         0.0        0.0
1          0.0         0.0        1.0
plan encoded: [2. 1.]</code></pre>
<p>Madrid, unseen during training, is safely encoded as all zeros. Categories with thousands of values (user IDs, ZIP codes) create too many one-hot columns; options include grouping rare categories (<code>min_frequency=</code> or <code>max_categories=</code> in OneHotEncoder), <code>TargetEncoder</code> (replaces each category with a cross-validated average of the target), or the "hashing trick" for very large vocabularies.</p>
<div class="callout warn"><strong>Common mistake:</strong> using <code>pd.get_dummies</code> separately on training and test data. If a category appears in only one of them, the two matrices get different columns, and the model silently receives misaligned features (or crashes). A fitted <code>OneHotEncoder</code> guarantees the same columns every time.</div>
<div class="callout tip"><strong>Tip:</strong> keep a written list of which columns are numeric, nominal and ordinal. That list is exactly what you will hand to a <code>ColumnTransformer</code> in the next lesson.</div>
`,
          keyPoints: [
            "Ask why data is missing; impute with median/most-frequent and add missing indicators when missingness may carry signal.",
            "Every transformer is fit on training data only, then used to transform all data, including production requests.",
            "StandardScaler is the default; RobustScaler resists outliers; log transforms tame skewed features; trees need no scaling.",
            "One-hot encode nominal categories (handle_unknown='ignore'); ordinal-encode ordered categories with an explicit order.",
            "Avoid pd.get_dummies on separate splits; fitted encoders keep columns consistent."
          ],
          exercise: {
            prompt: String.raw`<p>Given the training DataFrame below, (1) impute <code>rooms</code> with the median and <code>condition</code> with the most frequent value; (2) ordinal-encode <code>condition</code> with the order poor &lt; fair &lt; good &lt; excellent; (3) one-hot encode <code>district</code>; (4) apply the fitted transformers to a new row <code>{"rooms": None, "condition": "excellent", "district": "harbour"}</code>, where "harbour" was never seen. Print the resulting numbers.</p>
<pre><code class="lang-python">import numpy as np
import pandas as pd
train = pd.DataFrame({
    "rooms": [2, 3, np.nan, 4, 3, 5],
    "condition": ["fair", "good", "good", np.nan, "poor", "excellent"],
    "district": ["north", "south", "north", "east", "south", "east"],
})</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder

train = pd.DataFrame({
    "rooms": [2, 3, np.nan, 4, 3, 5],
    "condition": ["fair", "good", "good", np.nan, "poor", "excellent"],
    "district": ["north", "south", "north", "east", "south", "east"],
})
new = pd.DataFrame({"rooms": [np.nan], "condition": ["excellent"], "district": ["harbour"]})

rooms_imp = SimpleImputer(strategy="median").fit(train[["rooms"]])
cond_imp = SimpleImputer(strategy="most_frequent").fit(train[["condition"]])
cond_enc = OrdinalEncoder(categories=[["poor", "fair", "good", "excellent"]]).fit(cond_imp.transform(train[["condition"]]))
dist_enc = OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(train[["district"]])

rooms = rooms_imp.transform(new[["rooms"]])
cond = cond_enc.transform(cond_imp.transform(new[["condition"]]))
dist = dist_enc.transform(new[["district"]])
print("rooms (median-imputed):", rooms.ravel())
print("condition (ordinal):", cond.ravel())
print("district one-hot", list(dist_enc.get_feature_names_out()), "-&gt;", dist.ravel())
print("final feature row:", np.hstack([rooms, cond, dist]).ravel())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">rooms (median-imputed): [3.]
condition (ordinal): [3.]
district one-hot ['district_east', 'district_north', 'district_south'] -&gt; [0. 0. 0.]
final feature row: [3. 3. 0. 0. 0.]</code></pre>
<p>The missing rooms value becomes the training median (3), "excellent" maps to 3 (the highest rank), and the unseen district "harbour" becomes all zeros. Chaining these steps by hand is tedious and error-prone — exactly the problem <code>ColumnTransformer</code> and <code>Pipeline</code> solve in the next lesson.</p>`
          },
          quiz: [
            { q: "Why add a missing-value indicator column?", options: ["To delete missing rows", "Because the fact that a value is missing can itself predict the target", "To scale features", "It is required by scikit-learn"], answer: 1, explain: "If, say, high earners skip the income question, 'income missing' carries information the model can use." },
            { q: "Which scaler is least distorted by a few extreme outliers?", options: ["MinMaxScaler", "StandardScaler", "RobustScaler", "None of them differ"], answer: 2, explain: "RobustScaler uses the median and interquartile range, which outliers barely affect." },
            { q: "How should you encode a 'country' feature for a logistic regression?", options: ["Ordinal encoding 0, 1, 2 ...", "One-hot encoding", "Leave it as text", "Divide by the number of countries"], answer: 1, explain: "Countries have no natural order. Integer codes would impose a fake order and spacing on a linear model." },
            { q: "What does OneHotEncoder(handle_unknown='ignore') do with a category not seen during fit?", options: ["Raises an error", "Encodes it as all zeros", "Adds a new column", "Maps it to the most frequent category"], answer: 1, explain: "Unknown categories get zeros in every one-hot column, so production requests with new values do not crash." }
          ]
        },
        {
          id: "ml-feat-pipelines-leakage",
          title: "Pipelines, ColumnTransformer and Data Leakage",
          minutes: 55,
          objectives: [
            "Build a preprocessing + model Pipeline with ColumnTransformer for mixed column types",
            "Explain why pipelines prevent data leakage during cross-validation",
            "Recognise common leakage patterns: preprocessing before splitting, target leakage, time and duplicate leakage",
            "Tune preprocessing and model hyperparameters together"
          ],
          body: String.raw`
<p>In the last lesson every preprocessing step had to be fitted and applied by hand. Real projects have dozens of columns and several steps, and the same steps must be applied identically in training, validation, testing and production. A <strong>Pipeline</strong> packages all of it — preprocessing plus model — into one object with a single <code>fit</code> and <code>predict</code>. It is the most important habit for writing correct, deployable ML code.</p>

<h3>ColumnTransformer: different steps for different columns</h3>
<p>Numeric columns need imputation and scaling; categorical columns need imputation and one-hot encoding. <code>ColumnTransformer</code> applies a different transformer to each group of columns and concatenates the results side by side. A <code>Pipeline</code> then chains it with a model.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# A synthetic customer-churn table with mixed types and missing values
rng = np.random.default_rng(0)
n = 1000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n).astype(float),
    "monthly_fee": rng.normal(60, 20, n).round(2),
    "support_calls": rng.poisson(2, n).astype(float),
    "plan": rng.choice(["basic", "standard", "premium"], n),
    "region": rng.choice(["north", "south", "east", "west"], n),
})
logit = -1.0 - 0.05 * df["tenure_months"] + 0.02 * df["monthly_fee"] + 0.4 * df["support_calls"] + (df["plan"] == "basic") * 0.8
df["churned"] = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
df.loc[rng.choice(n, 80, replace=False), "monthly_fee"] = np.nan     # some missing values
df.loc[rng.choice(n, 50, replace=False), "plan"] = np.nan

X, y = df.drop(columns="churned"), df["churned"]
numeric = ["tenure_months", "monthly_fee", "support_calls"]
categorical = ["plan", "region"]

preprocess = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), numeric),
    ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("onehot", OneHotEncoder(handle_unknown="ignore"))]), categorical),
])
model = Pipeline([("prep", preprocess), ("clf", LogisticRegression(max_iter=1000))])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
model.fit(X_train, y_train)               # every step is fitted on training data only
print("churn rate:", y.mean().round(3))
print("test accuracy:", round(model.score(X_test, y_test), 3))
print("features the model sees:", list(model.named_steps["prep"].get_feature_names_out()))

# Raw rows in -&gt; predictions out, including missing values and an unseen region
new_customers = pd.DataFrame({"tenure_months": [3, 60], "monthly_fee": [np.nan, 45.0],
                              "support_calls": [6, 0], "plan": ["basic", np.nan], "region": ["north", "antarctica"]})
print("churn probabilities:", model.predict_proba(new_customers)[:, 1].round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">churn rate: 0.406
test accuracy: 0.728
features the model sees: ['num__tenure_months', 'num__monthly_fee', 'num__support_calls', 'cat__plan_basic', 'cat__plan_premium', 'cat__plan_standard', 'cat__region_east', 'cat__region_north', 'cat__region_south', 'cat__region_west']
churn probabilities: [0.967 0.102]</code></pre>
<p>The pipeline accepts <em>raw</em> rows — with blanks, text and a never-seen region — and handles everything internally. In production you save this single object (next module) and the serving code just calls <code>predict_proba</code> on incoming data. No preprocessing logic needs to be re-implemented, so training and serving cannot drift apart. (Mismatches between training-time and serving-time preprocessing, called <em>training–serving skew</em>, are one of the most common production ML bugs.)</p>

<h3>Data leakage</h3>
<p><strong>Data leakage</strong> means information that would <em>not be available at prediction time</em> sneaks into training or evaluation. The model looks brilliant offline and disappoints in production. It is one of the most common and costly mistakes in ML, and it often hides in innocent-looking code.</p>

<h4>Leak 1: preprocessing before splitting</h4>
<p>If you scale, impute or select features using the whole dataset and <em>then</em> split or cross-validate, the validation folds have influenced the training. The most dramatic case is feature selection. Below, the features are <strong>pure random noise</strong> — no model should beat 50% accuracy. Watch what happens if we select the "best" features on all data first:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 5000))        # 5000 random features
y = rng.integers(0, 2, 100)             # random labels: there is NOTHING to learn

# WRONG: pick the 20 features most correlated with y using ALL rows, then cross-validate
X_selected = SelectKBest(f_classif, k=20).fit_transform(X, y)
wrong = cross_val_score(LogisticRegression(), X_selected, y, cv=5).mean()

# RIGHT: selection happens inside the pipeline, so it is re-done on each training fold
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
right = cross_val_score(pipe, X, y, cv=5).mean()

print(f"leaky CV accuracy : {wrong:.2f}")
print(f"honest CV accuracy: {right:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">leaky CV accuracy : 0.85
honest CV accuracy: 0.48</code></pre>
<p>The leaky version "finds" strong performance on pure noise, because the selection step peeked at the validation labels and chose features that happen to correlate with them by chance. The honest pipeline correctly reports chance-level accuracy. With scaling or imputation the effect is usually smaller, but it is the same bug. The fix is always the same: <strong>put every data-dependent step inside the pipeline</strong>, and pass the pipeline to <code>cross_val_score</code> or <code>GridSearchCV</code>.</p>

<h4>Leak 2: target leakage</h4>
<p>A feature that is a <em>consequence</em> of the label, or is only recorded after the outcome, leaks the answer. Examples:</p>
<ul>
  <li>Predicting churn with a column "cancellation_reason" (only filled in after the customer churns).</li>
  <li>Predicting pneumonia with "took antibiotics" (treatment happens after diagnosis).</li>
  <li>Predicting loan default with "number of collection calls".</li>
  <li>A hospital's scans where very sick patients were scanned lying down: the model learns "lying down = sick" instead of reading the scan.</li>
</ul>
<p>Ask of every feature: <em>"Would I know this value at the moment I need the prediction?"</em></p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(1)
n = 2000
tenure = rng.integers(1, 72, n)
calls = rng.poisson(2, n)
churn = (rng.random(n) &lt; 1 / (1 + np.exp(-(-1 - 0.04 * tenure + 0.5 * calls)))).astype(int)
# "refund_issued" is recorded AFTER a customer cancels -- it is a consequence of the label
refund_issued = np.where(churn == 1, rng.random(n) &lt; 0.9, rng.random(n) &lt; 0.02).astype(int)

honest = pd.DataFrame({"tenure": tenure, "calls": calls})
leaky = honest.assign(refund_issued=refund_issued)
rf = RandomForestClassifier(n_estimators=100, random_state=0)
print("honest features CV accuracy:", cross_val_score(rf, honest, churn, cv=5).mean().round(3))
print("with leaked feature        :", cross_val_score(rf, leaky, churn, cv=5).mean().round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">honest features CV accuracy: 0.786
with leaked feature        : 0.94</code></pre>
<p>A suspiciously large jump from adding one feature is a red flag. Investigate any feature that alone predicts the target almost perfectly — it is more often leakage than genius.</p>

<h4>Leak 3: time and duplicates</h4>
<ul>
  <li><strong>Time leakage</strong>: random splits on time-ordered data let the model learn from the future; aggregate features (like "average spend") computed over the whole history include future values. Split by time and compute features only from data before each prediction moment.</li>
  <li><strong>Duplicate leakage</strong>: the same (or near-identical) record in both train and test — e.g. repeated photos, the same patient twice. The model is tested on what it memorised. Deduplicate before splitting, or split by group (customer, patient).</li>
</ul>

<h3>Tuning the whole pipeline</h3>
<p>Because the pipeline is a single estimator, <code>GridSearchCV</code> can tune preprocessing choices and model hyperparameters together, with leak-free CV. Parameters are addressed by step names joined with double underscores:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV

rng = np.random.default_rng(0)
n = 1000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n).astype(float),
    "monthly_fee": rng.normal(60, 20, n).round(2),
    "support_calls": rng.poisson(2, n).astype(float),
    "plan": rng.choice(["basic", "standard", "premium"], n),
})
logit = -1.0 - 0.05 * df["tenure_months"] + 0.02 * df["monthly_fee"] + 0.4 * df["support_calls"] + (df["plan"] == "basic") * 0.8
y = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
df.loc[rng.choice(n, 80, replace=False), "monthly_fee"] = np.nan

prep = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer()), ("scale", StandardScaler())]),
     ["tenure_months", "monthly_fee", "support_calls"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["plan"]),
])
pipe = Pipeline([("prep", prep), ("clf", LogisticRegression(max_iter=1000))])
grid = {
    "prep__num__impute__strategy": ["mean", "median"],
    "clf__C": [0.01, 0.1, 1, 10],
}
search = GridSearchCV(pipe, grid, cv=5, scoring="roc_auc").fit(df, y)
print("best:", search.best_params_, " CV ROC AUC:", round(search.best_score_, 3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best: {'clf__C': 0.1, 'prep__num__impute__strategy': 'median'}  CV ROC AUC: 0.781</code></pre>
<div class="callout warn"><strong>Common mistake:</strong> calling <code>scaler.fit_transform(X)</code> on the full dataset "just to get it out of the way" before <code>train_test_split</code>. It feels harmless and usually inflates scores only a little — which is exactly why it goes unnoticed. Make "everything inside the pipeline" a reflex.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 5, has a full section on data leakage with real-world cases (including the lying-down scans and time-based leakage) and a checklist for detecting it: measure each feature's predictive power, watch for suspiciously good features, and never let test data influence any training decision.</div>
`,
          keyPoints: [
            "ColumnTransformer applies different preprocessing per column group; Pipeline chains preprocessing and a model into one estimator.",
            "A fitted pipeline turns raw rows into predictions, preventing training-serving skew.",
            "Data leakage = information unavailable at prediction time influencing training or evaluation.",
            "Fit every data-dependent step (imputation, scaling, feature selection) inside the pipeline so CV re-fits it per fold.",
            "Watch for target leakage (features caused by the outcome), time leakage and duplicates across splits."
          ],
          exercise: {
            prompt: String.raw`<p>Build a full pipeline on the churn generator from the lesson (copy the DataFrame-building code), but use <code>HistGradientBoostingClassifier(random_state=0)</code> as the model. Trees do not need scaling, so use only imputation for numeric columns and <code>OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1)</code> for categoricals. Report 5-fold CV ROC AUC and compare it with the logistic regression pipeline on the same data.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold

rng = np.random.default_rng(0)
n = 1000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n).astype(float),
    "monthly_fee": rng.normal(60, 20, n).round(2),
    "support_calls": rng.poisson(2, n).astype(float),
    "plan": rng.choice(["basic", "standard", "premium"], n),
    "region": rng.choice(["north", "south", "east", "west"], n),
})
logit = -1.0 - 0.05 * df["tenure_months"] + 0.02 * df["monthly_fee"] + 0.4 * df["support_calls"] + (df["plan"] == "basic") * 0.8
y = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
df.loc[rng.choice(n, 80, replace=False), "monthly_fee"] = np.nan
df.loc[rng.choice(n, 50, replace=False), "plan"] = np.nan
num, cat = ["tenure_months", "monthly_fee", "support_calls"], ["plan", "region"]

tree_prep = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"), num),
    ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("ord", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1))]), cat),
])
linear_prep = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), num),
    ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("onehot", OneHotEncoder(handle_unknown="ignore"))]), cat),
])
cv = StratifiedKFold(5, shuffle=True, random_state=0)
for name, pipe in [("hist gradient boosting", Pipeline([("prep", tree_prep), ("clf", HistGradientBoostingClassifier(random_state=0))])),
                   ("logistic regression", Pipeline([("prep", linear_prep), ("clf", LogisticRegression(max_iter=1000))]))]:
    s = cross_val_score(pipe, df, y, cv=cv, scoring="roc_auc")
    print(f"{name:22}: ROC AUC {s.mean():.3f} +/- {s.std():.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">hist gradient boosting: ROC AUC 0.765 +/- 0.032
logistic regression   : ROC AUC 0.805 +/- 0.038</code></pre>
<p>Here logistic regression wins — not surprising, because we <em>generated</em> the labels from a logistic (linear log-odds) formula, so the linear model's assumptions are exactly right. On real data with non-linear effects and interactions, boosting would often lead. The lesson: the best model depends on the data, so compare both, each with its appropriate preprocessing.</p>`
          },
          quiz: [
            { q: "What is the main reason to put preprocessing steps inside a Pipeline?", options: ["It makes code shorter only", "So every data-dependent step is fitted on training folds only (no leakage) and the same steps are applied identically at prediction time", "Pipelines train faster", "Because ColumnTransformer requires it"], answer: 1, explain: "Pipelines refit preprocessing inside each CV fold and ship preprocessing with the model, avoiding leakage and training-serving skew." },
            { q: "Which feature is a case of target leakage when predicting whether a patient has diabetes?", options: ["Age", "Body-mass index", "Whether the patient is currently prescribed insulin", "Blood pressure"], answer: 2, explain: "Insulin prescriptions follow a diabetes diagnosis, so the feature encodes the answer and would not be available for undiagnosed patients." },
            { q: "Selecting the 20 best features on the full dataset and then running cross-validation gives 80% accuracy on random noise. Why?", options: ["The model is excellent", "Feature selection saw the validation labels, so CV is leaky and optimistic", "Random data always gives 80%", "Cross-validation is broken"], answer: 1, explain: "The selection step chose features that correlate with all labels by chance, including those in validation folds." },
            { q: "How do you address the C parameter of a LogisticRegression step named 'clf' in a GridSearchCV over a pipeline?", options: ["C", "clf.C", "clf__C", "LogisticRegression__C"], answer: 2, explain: "Pipeline parameters use the step name, two underscores, and the parameter name." }
          ]
        },
        {
          id: "ml-feat-engineering-imbalance",
          title: "Feature Engineering, Class Imbalance and Slice-Based Evaluation",
          minutes: 55,
          objectives: [
            "Create useful features: ratios, date parts, aggregates, log transforms and interactions",
            "Handle imbalanced classes with class_weight, resampling and threshold choice",
            "Choose metrics suited to imbalanced data",
            "Evaluate a model on slices of the data to find hidden failures"
          ],
          body: String.raw`
<p>Good features often matter more than the choice of algorithm. A <strong>feature</strong> is any number you compute from raw data that helps predict the target; <strong>feature engineering</strong> is the craft of inventing them, usually from domain knowledge. This lesson also covers two practical problems that ruin many projects: rare positive classes, and models that are good "on average" but fail badly for a particular group.</p>

<h3>Feature engineering ideas</h3>
<ul>
  <li><strong>Ratios, products and differences</strong>: debt / income, price per square metre, weight × distance, "spend this month minus average spend". Models (especially linear ones) cannot form a division or multiplication of features on their own.</li>
  <li><strong>Date and time parts</strong>: hour of day, day of week, month, is_weekend, is_holiday, days since last purchase, account age. A raw timestamp is nearly useless to a model; its parts are not.</li>
  <li><strong>Aggregates</strong>: per-customer counts, sums and averages ("orders in the last 30 days"), per-category statistics. Compute them only from data available before the prediction time.</li>
  <li><strong>Transforms</strong>: log of skewed amounts, binning ages into ranges, polynomial terms.</li>
  <li><strong>Interactions / crosses</strong>: combine features whose effect depends on each other — "city × property type", "is_weekend × hour".</li>
  <li><strong>Text basics</strong>: length, word counts, presence of keywords (the deep learning track covers embeddings).</li>
</ul>
<p>Here is a demonstration where one engineered feature turns a mediocre linear model into an excellent one. Shipping cost truly depends on weight <em>times</em> distance; a linear model only <em>adds</em> weighted features, so it cannot form that product by itself — but we can hand it over:</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(0)
n = 2000
weight_kg = rng.uniform(0.5, 30, n)
distance_km = rng.uniform(10, 2000, n)
# Real shipping cost depends on weight TIMES distance (a tonne-kilometre style tariff)
cost = 5 + 0.002 * weight_kg * distance_km + rng.normal(0, 3, n)

raw = pd.DataFrame({"weight_kg": weight_kg, "distance_km": distance_km})
engineered = raw.assign(weight_x_distance=weight_kg * distance_km)
for name, X in [("raw weight + distance", raw), ("+ weight_x_distance", engineered)]:
    r2 = cross_val_score(LinearRegression(), X, cost, cv=5, scoring="r2").mean()
    print(f"{name:22}: CV R2 = {r2:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">raw weight + distance : CV R2 = 0.846
+ weight_x_distance   : CV R2 = 0.987</code></pre>
<p>One domain-inspired column lifts R² from about 0.85 to 0.99. A tree ensemble could approximate the interaction on its own, but it would need more data and still be less precise; explicit features also make models easier to explain.</p>
<p>Date features work the same way. pandas' <code>.dt</code> accessor extracts parts from datetime columns:</p>
<pre><code class="lang-python runnable">import pandas as pd

orders = pd.DataFrame({
    "customer": ["a", "a", "b", "a", "b", "c"],
    "timestamp": pd.to_datetime(["2026-03-02 09:15", "2026-03-07 22:40", "2026-03-08 13:05",
                                 "2026-03-20 08:00", "2026-03-21 19:30", "2026-03-22 11:11"]),
    "amount": [25.0, 120.0, 40.0, 30.0, 300.0, 15.0],
})
orders["hour"] = orders["timestamp"].dt.hour
orders["day_of_week"] = orders["timestamp"].dt.dayofweek          # Monday = 0
orders["is_weekend"] = (orders["day_of_week"] &gt;= 5).astype(int)
orders = orders.sort_values(["customer", "timestamp"])
orders["days_since_prev"] = orders.groupby("customer")["timestamp"].diff().dt.days
orders["prev_orders"] = orders.groupby("customer").cumcount()      # orders BEFORE this one (no future info)
orders["avg_prev_amount"] = (orders.groupby("customer")["amount"]
                             .transform(lambda s: s.shift().expanding().mean()))
print(orders.drop(columns="timestamp").to_string(index=False))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">customer  amount  hour  day_of_week  is_weekend  days_since_prev  prev_orders  avg_prev_amount
       a    25.0     9            0           0              NaN            0              NaN
       a   120.0    22            5           1              5.0            1             25.0
       a    30.0     8            4           0             12.0            2             72.5
       b    40.0    13            6           1              NaN            0              NaN
       b   300.0    19            5           1             13.0            1             40.0
       c    15.0    11            6           1              NaN            0              NaN</code></pre>
<p>Note <code>shift()</code> in the running average: each row only uses <em>earlier</em> orders, so the feature is computable at the moment of prediction — no time leakage. The first order of each customer has no history, so its value is missing (NaN), which the pipeline's imputer will handle.</p>
<div class="callout tip"><strong>Tip:</strong> more features are not always better. Each one can add noise, leakage risk, compute cost and a maintenance burden (it must be computed identically in production). Keep features that clearly improve validation performance and that you can reliably compute at serving time.</div>

<h3>Class imbalance</h3>
<p>Many important problems are <strong>imbalanced</strong>: fraud (0.1–2%), rare diseases, equipment failures, ad clicks. Problems that follow:</p>
<ul>
  <li>Accuracy becomes meaningless (predicting "never" scores 98%).</li>
  <li>The model's loss is dominated by the majority class, so it may barely learn the minority class.</li>
  <li>The default 0.5 threshold is usually wrong: predicted probabilities for the rare class rarely exceed it.</li>
</ul>
<p>Remedies, in roughly the order to try them:</p>
<ol>
  <li><strong>Use the right metrics</strong>: recall, precision, F1, PR AUC (average precision) for the minority class; look at the confusion matrix.</li>
  <li><strong>Choose the threshold</strong> on validation data from business costs (previous module) — often the single most effective fix.</li>
  <li><strong>Reweight classes</strong>: <code>class_weight="balanced"</code> makes each minority example count more in the loss (weight inversely proportional to class frequency). Supported by most scikit-learn classifiers.</li>
  <li><strong>Resample</strong> the <em>training</em> data: oversample the minority (duplicate examples, or synthesise with SMOTE from the <code>imbalanced-learn</code> library) or undersample the majority. Never resample the validation or test data — they must reflect reality.</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.utils import resample
from sklearn.metrics import recall_score, precision_score, f1_score, average_precision_score

X, y = make_classification(n_samples=6000, n_features=10, weights=[0.97, 0.03], flip_y=0,
                           class_sep=0.8, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

def report(name, model, X_fit, y_fit, threshold=0.5):
    p = model.fit(X_fit, y_fit).predict_proba(X_te)[:, 1]
    pred = (p &gt;= threshold).astype(int)
    print(f"{name:28}: recall={recall_score(y_te, pred):.2f} precision={precision_score(y_te, pred):.2f} "
          f"F1={f1_score(y_te, pred):.2f} AP={average_precision_score(y_te, p):.2f}")

report("plain", LogisticRegression(), X_tr, y_tr)
report("plain, threshold 0.2", LogisticRegression(), X_tr, y_tr, threshold=0.2)
report("class_weight='balanced'", LogisticRegression(class_weight="balanced"), X_tr, y_tr)

# Oversample the minority class in the TRAINING set only
minority = y_tr == 1
X_up, y_up = resample(X_tr[minority], y_tr[minority], n_samples=int((~minority).sum()), random_state=0)
X_bal, y_bal = np.vstack([X_tr[~minority], X_up]), np.concatenate([y_tr[~minority], y_up])
report("random oversampling", LogisticRegression(), X_bal, y_bal)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">plain                       : recall=0.09 precision=0.56 F1=0.16 AP=0.32
plain, threshold 0.2        : recall=0.33 precision=0.35 F1=0.34 AP=0.32
class_weight='balanced'     : recall=0.83 precision=0.12 F1=0.22 AP=0.32
random oversampling         : recall=0.83 precision=0.12 F1=0.21 AP=0.32</code></pre>
<p>Look at the pattern: reweighting and oversampling dramatically raise recall at the cost of precision — similar in effect to lowering the threshold. Average precision (AP), which does not depend on the threshold, barely changes: the model's <em>ranking</em> ability is about the same; what changes is where it draws the line. That is why choosing the threshold deliberately is so powerful, and why reweighting is not magic.</p>
<div class="callout warn"><strong>Common mistake:</strong> oversampling <em>before</em> splitting or cross-validating. Copies of the same minority example end up in both training and validation folds, and the model is evaluated on rows it has memorised. Resample only inside the training portion (imbalanced-learn provides a pipeline that does this correctly per fold).</div>

<h3>Slice-based evaluation</h3>
<p>An overall metric is an average, and averages hide things. A model can be 92% accurate overall but 70% accurate for new customers, for one region, or for a demographic group — perhaps exactly the group the business cares about most, or one where poor performance would be unfair. <strong>Slice-based evaluation</strong> means computing your metrics separately for meaningful subgroups (slices) of the evaluation data.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score

rng = np.random.default_rng(3)
n = 4000
region = rng.choice(["north", "south", "east", "west"], n, p=[0.4, 0.35, 0.2, 0.05])
usage = rng.normal(10, 3, n)
# In the small 'west' region, churn behaves differently (driven by a different factor)
price_sensitivity = rng.normal(0, 1, n)
logit = np.where(region == "west", 2.0 * price_sensitivity, -0.6 * (usage - 10))
churn = (rng.random(n) &lt; 1 / (1 + np.exp(-logit))).astype(int)
X = pd.DataFrame({"usage": usage, "price_sensitivity": price_sensitivity,
                  "region_west": (region == "west").astype(int)})

X_tr, X_te, y_tr, y_te, r_tr, r_te = train_test_split(X, churn, region, test_size=0.4, random_state=0)
pred = RandomForestClassifier(n_estimators=200, min_samples_leaf=20, random_state=0).fit(X_tr, y_tr).predict(X_te)

print(f"OVERALL accuracy: {accuracy_score(y_te, pred):.3f}")
res = pd.DataFrame({"region": r_te, "y": y_te, "pred": pred})
for name, g in res.groupby("region"):
    print(f"  {name:5}: n={len(g):4d}  accuracy={accuracy_score(g.y, g.pred):.3f}  recall={recall_score(g.y, g.pred):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">OVERALL accuracy: 0.761
  east : n= 324  accuracy=0.765  recall=0.789
  north: n= 617  accuracy=0.755  recall=0.773
  south: n= 571  accuracy=0.792  recall=0.775
  west : n=  88  accuracy=0.580  recall=0.907</code></pre>
<p>The overall number is dominated by the large regions and hides how the model does on the small one. Slicing shows whether a minority segment behaves differently; when it does, options include collecting more data for that slice, adding features that explain its behaviour, training a separate model, or adjusting thresholds per slice. Useful slices: customer segment, region, device type, new vs returning users, time period, data source — and, where relevant, protected attributes such as age group or gender, to check for unfair performance gaps.</p>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 4 "Training Data" discusses class imbalance in depth (metrics, resampling, class-weighted and focal losses), and Ch. 6 explains slice-based evaluation, including how aggregate metrics can hide (or even reverse, as in Simpson's paradox) differences between subgroups.</div>
`,
          keyPoints: [
            "Engineered features (ratios, date parts, aggregates, logs, interactions) often beat algorithm changes.",
            "Compute aggregate/time features only from information available before the prediction moment.",
            "For imbalance: use recall/precision/PR AUC, tune the threshold, try class_weight='balanced' or resample the training set only.",
            "Reweighting mostly shifts the precision-recall operating point; threshold-free ranking metrics change little.",
            "Evaluate on slices (segments, regions, time, groups) because overall metrics hide subgroup failures."
          ],
          exercise: {
            prompt: String.raw`<p>Using <code>load_breast_cancer</code>, make the problem imbalanced: keep all benign tumours (label 1) but only the first 30 malignant ones (label 0), then flip labels so malignant = 1 (the rare positive). With a 30% stratified split (<code>random_state=0</code>) and a scaled logistic regression, compare (a) default, (b) <code>class_weight="balanced"</code>, reporting malignant recall, precision and average precision. Then evaluate slice-wise: split the test set into "large" and "small" tumours by whether <code>mean radius</code> is above its median, and report recall for malignant cases in each slice (if a slice has any).</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import recall_score, precision_score, average_precision_score

data = load_breast_cancer()
X, y = data.data, data.target
keep = np.concatenate([np.where(y == 1)[0], np.where(y == 0)[0][:30]])
X, y = X[keep], 1 - y[keep]                  # now 1 = malignant (rare)
print("positives:", y.sum(), "of", len(y))
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

for cw in [None, "balanced"]:
    m = make_pipeline(StandardScaler(), LogisticRegression(class_weight=cw, max_iter=1000)).fit(X_tr, y_tr)
    p = m.predict_proba(X_te)[:, 1]
    pred = m.predict(X_te)
    print(f"class_weight={str(cw):8}: recall={recall_score(y_te, pred):.2f} "
          f"precision={precision_score(y_te, pred, zero_division=0):.2f} AP={average_precision_score(y_te, p):.2f}")

radius = X_te[:, list(data.feature_names).index("mean radius")]
large = radius &gt; np.median(radius)
for name, mask in [("large tumours", large), ("small tumours", ~large)]:
    pos = y_te[mask].sum()
    if pos:
        print(f"{name}: malignant cases={pos}, recall={recall_score(y_te[mask], pred[mask]):.2f}")
    else:
        print(f"{name}: no malignant cases in this slice")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">positives: 30 of 387
class_weight=None    : recall=0.78 precision=1.00 AP=0.90
class_weight=balanced: recall=0.78 precision=1.00 AP=0.90
large tumours: malignant cases=7, recall=0.71
small tumours: malignant cases=2, recall=1.00</code></pre>
<p>With only 9 malignant tumours in the test set, each one is worth about 11 points of recall, so treat the numbers as rough. Here balanced class weights change nothing at the default threshold: the classes are so well separated that the model's probabilities are already far from 0.5, and the same 7 of 9 cases are caught. On harder, overlapping problems (like the earlier make_classification example) reweighting typically raises recall noticeably. The slice check shows <em>where</em> the cases are: malignant tumours tend to be large, so the "small" slice may contain few or none — a reminder that small slices give unreliable metrics and that you may need more data to evaluate a slice properly.</p>`
          },
          quiz: [
            { q: "Why is a weight x distance feature helpful for a linear regression of shipping cost even if weight and distance are already features?", options: ["It is not helpful", "A linear model only adds weighted features; it cannot multiply two features by itself, so the product provides information it could not otherwise use", "It reduces the number of rows", "It removes missing values"], answer: 1, explain: "Linear models combine features additively; products and ratios are non-linear combinations they cannot form on their own." },
            { q: "Where should oversampling of the minority class be applied?", options: ["To the whole dataset before splitting", "To the training data only (inside each CV training fold)", "To the test set", "To the validation set only"], answer: 1, explain: "Resampling before splitting puts copies of the same example in train and test, inflating scores. Evaluation data must reflect reality." },
            { q: "After setting class_weight='balanced', recall rises from 0.40 to 0.85 but average precision is unchanged. What does that tell you?", options: ["The model's ranking ability is similar; the effective decision threshold moved", "The model got much better at ranking", "Average precision is broken", "Precision must have risen too"], answer: 0, explain: "Reweighting mainly shifts predicted probabilities, moving the operating point, while threshold-free ranking quality stays similar." },
            { q: "Why perform slice-based evaluation?", options: ["To speed up evaluation", "Because an overall metric can hide poor performance on important or under-represented subgroups", "It is required for regression only", "To increase the training set"], answer: 1, explain: "Aggregate metrics are dominated by large groups; slicing reveals subgroup failures and fairness gaps." }
          ]
        }
      ]
    },
    {
      id: "ml-unsupervised",
      title: "Unsupervised Learning",
      summary: "Find structure without labels: k-means, hierarchical clustering and DBSCAN; PCA for dimensionality reduction and visualization; anomaly detection with Isolation Forest.",
      lessons: [
        {
          id: "ml-unsup-clustering",
          title: "Clustering: k-Means, Hierarchical Clustering and DBSCAN",
          minutes: 55,
          objectives: [
            "Explain and implement the k-means algorithm",
            "Choose the number of clusters with the elbow method and silhouette score",
            "Describe hierarchical (agglomerative) clustering and linkage",
            "Use DBSCAN for irregular cluster shapes and noise"
          ],
          body: String.raw`
<p>Without labels there is no answer key, so the question changes from "predict y" to "what structure is in this data?" <strong>Clustering</strong> groups samples so that items in the same group are similar and items in different groups are not. Uses: customer segmentation, grouping documents by topic, compressing colours in an image, finding typical behaviour patterns, or creating features (a "cluster id") for a supervised model.</p>

<h3>k-means: the algorithm</h3>
<p>k-means represents each cluster by its centre, the <strong>centroid</strong> (the mean of its points). Given k:</p>
<ol>
  <li><strong>Initialise</strong>: pick k starting centroids (scikit-learn uses the smart "k-means++" initialisation, which spreads them out).</li>
  <li><strong>Assign</strong>: put each point in the cluster of its nearest centroid.</li>
  <li><strong>Update</strong>: move each centroid to the mean of the points assigned to it.</li>
  <li>Repeat steps 2–3 until assignments stop changing.</li>
</ol>
<p>Each iteration lowers the <strong>inertia</strong> — the sum of squared distances from points to their centroid — so the algorithm always converges, though possibly to a local optimum depending on the start. That is why scikit-learn runs several initialisations (<code>n_init</code>) and keeps the best. Here it is from scratch, in a dozen lines:</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=1.0, random_state=7)
rng = np.random.default_rng(0)
k = 3
centroids = X[rng.choice(len(X), k, replace=False)]        # random initial centroids

for it in range(10):
    dists = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)   # (300, 3) distances
    labels = dists.argmin(axis=1)                                          # assign step
    new_centroids = np.array([X[labels == j].mean(axis=0) for j in range(k)])  # update step
    inertia = ((X - new_centroids[labels]) ** 2).sum()
    print(f"iteration {it}: inertia = {inertia:.1f}")
    if np.allclose(new_centroids, centroids):
        print("converged")
        break
    centroids = new_centroids

print("cluster sizes:", np.bincount(labels))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">iteration 0: inertia = 16419.3
iteration 1: inertia = 7182.0
iteration 2: inertia = 6592.5
iteration 3: inertia = 4494.7
iteration 4: inertia = 706.9
iteration 5: inertia = 573.4
iteration 6: inertia = 573.4
converged
cluster sizes: [100 100 100]</code></pre>

<h3>k-means in scikit-learn — and choosing k</h3>
<p>The hard part is choosing k, since there is no label to validate against. Two common tools:</p>
<ul>
  <li><strong>Elbow method</strong>: plot inertia against k. Inertia always decreases as k grows (with k = n it is zero), but the decrease slows sharply once k passes the "natural" number of clusters — look for the bend, the elbow.</li>
  <li><strong>Silhouette score</strong>: for each point, compare a = average distance to its own cluster with b = average distance to the nearest other cluster: s = (b − a) / max(a, b). Ranges from −1 to 1; higher means tighter, better-separated clusters. Pick the k with the highest average silhouette.</li>
</ul>
<pre><code class="lang-python runnable">from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=500, centers=4, cluster_std=1.0, random_state=3)
print(" k | inertia | silhouette")
for k in range(2, 8):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    print(f"{k:2d} | {km.inertia_:7.0f} | {silhouette_score(X, km.labels_):.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text"> k | inertia | silhouette
 2 |    7716 | 0.634
 3 |    3597 | 0.609
 4 |    1008 | 0.726
 5 |     905 | 0.623
 6 |     811 | 0.514
 7 |     733 | 0.417</code></pre>
<p>Inertia drops steeply up to k = 4 and only slowly afterwards (the elbow), and the silhouette score peaks at k = 4 — both point to the four clusters we generated. On real data the signals are rarely this clean; combine them with domain sense ("marketing can act on 4–6 segments, not 40").</p>

<h3>A realistic workflow: customer segmentation</h3>
<p>k-means uses Euclidean distance, so — like k-NN — it needs <strong>scaled features</strong>. After clustering, <em>profile</em> the clusters (mean of each feature per cluster) to give them human meaning.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
def group(n, visits, spend, age):
    return np.column_stack([rng.normal(visits, 1.5, n), rng.normal(spend, 15, n), rng.normal(age, 5, n)])
customers = pd.DataFrame(np.vstack([group(150, 2, 40, 25),      # occasional young shoppers
                                    group(100, 12, 60, 35),     # frequent, moderate spend
                                    group(50, 4, 300, 50)]),    # rare but big spenders
                         columns=["visits_per_month", "avg_basket", "age"])

model = make_pipeline(StandardScaler(), KMeans(n_clusters=3, n_init=10, random_state=0))
customers["segment"] = model.fit_predict(customers)
print(customers.groupby("segment").agg(["mean"]).round(1))
print(customers["segment"].value_counts().sort_index().to_dict())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">        visits_per_month avg_basket   age
                    mean       mean  mean
segment                                  
0                   12.0       58.6  34.7
1                    2.1       38.0  25.2
2                    4.1      300.3  49.8
{0: 100, 1: 150, 2: 50}</code></pre>
<p>The profile table is what you show the business: one segment of young occasional shoppers, one of frequent moderate spenders, one of older big-basket customers. The cluster numbers are arbitrary; the names come from you.</p>

<h3>Limits of k-means</h3>
<p>k-means assumes clusters are roughly round blobs of similar size, because each point simply goes to the nearest centre. It struggles with elongated or curved clusters, very different cluster sizes or densities, and outliers (which drag centroids). And you must pick k.</p>

<h3>Hierarchical (agglomerative) clustering</h3>
<p><strong>Agglomerative clustering</strong> builds a hierarchy bottom-up: start with every point as its own cluster, then repeatedly <em>merge the two closest clusters</em> until one remains. The merge history forms a tree called a <strong>dendrogram</strong>; cutting it at a given height yields any number of clusters, so you can inspect structure at several levels (e.g. product categories and sub-categories). "Closest clusters" is defined by the <strong>linkage</strong>:</p>
<ul>
  <li><strong>Ward</strong> (default): merge the pair that least increases total within-cluster variance — similar spirit to k-means.</li>
  <li><strong>Single</strong>: distance between the closest pair of points — can follow long, chain-like shapes.</li>
  <li><strong>Complete / average</strong>: farthest pair / average pair distance.</li>
</ul>
<p>It needs all pairwise distances, so it is practical for thousands of points, not millions.</p>

<h3>DBSCAN: density-based clustering</h3>
<p><strong>DBSCAN</strong> defines clusters as dense regions separated by sparse ones. A point is a <em>core point</em> if at least <code>min_samples</code> points lie within radius <code>eps</code>; clusters grow by connecting nearby core points; points in sparse areas are labelled <strong>noise</strong> (−1). Strengths: no need to choose k, finds arbitrarily shaped clusters, flags outliers. Weaknesses: choosing <code>eps</code> takes care (scale features first) and clusters of very different densities are hard.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics import adjusted_rand_score

X, y_true = make_moons(n_samples=400, noise=0.06, random_state=0)
X = StandardScaler().fit_transform(X)

models = {
    "k-means (k=2)": KMeans(n_clusters=2, n_init=10, random_state=0),
    "agglomerative, ward": AgglomerativeClustering(n_clusters=2, linkage="ward"),
    "agglomerative, single": AgglomerativeClustering(n_clusters=2, linkage="single"),
    "DBSCAN (eps=0.3)": DBSCAN(eps=0.3, min_samples=5),
}
for name, m in models.items():
    labels = m.fit_predict(X)
    n_clusters = len(set(labels) - {-1})
    print(f"{name:22}: clusters={n_clusters}  noise points={np.sum(labels == -1):2d}  "
          f"agreement with true moons (ARI)={adjusted_rand_score(y_true, labels):.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">k-means (k=2)         : clusters=2  noise points= 0  agreement with true moons (ARI)=0.47
agglomerative, ward   : clusters=2  noise points= 0  agreement with true moons (ARI)=0.61
agglomerative, single : clusters=2  noise points= 0  agreement with true moons (ARI)=1.00
DBSCAN (eps=0.3)      : clusters=2  noise points= 0  agreement with true moons (ARI)=1.00</code></pre>
<p>The <strong>adjusted Rand index (ARI)</strong> measures agreement between two groupings (1 = identical, about 0 = random); we can use it here only because this toy data has known groups. k-means and Ward cut the two moons with a straight-ish line and mix them; single linkage and DBSCAN follow the curved shapes and recover them almost perfectly.</p>
<div class="callout warn"><strong>Common mistake:</strong> treating clusters as ground truth. Clustering always returns <em>some</em> grouping — even on random data. Check stability (do you get similar clusters with another random seed or a subsample?), profile the clusters, and confirm they are useful for the decision at hand.</div>
<div class="callout tip"><strong>Tip:</strong> clustering is great for feature engineering: distance to each k-means centroid, or the cluster id, can become input features for a supervised model.</div>
`,
          keyPoints: [
            "k-means alternates assigning points to the nearest centroid and moving centroids to their cluster mean, minimising inertia.",
            "Choose k with the elbow in inertia, the silhouette score and domain sense; scale features first.",
            "k-means assumes round, similar-size clusters; it struggles with curved shapes and outliers.",
            "Agglomerative clustering merges closest clusters into a dendrogram; linkage defines 'closest'.",
            "DBSCAN finds dense regions of any shape, needs no k, and labels outliers as noise (-1)."
          ],
          exercise: {
            prompt: String.raw`<p>Cluster the <code>load_wine</code> features (ignore the labels while clustering). (1) Scale the data and compute the silhouette score for k = 2..6 with k-means (<code>n_init=10, random_state=0</code>). (2) Fit k = 3 and compare the clusters with the true cultivar labels using <code>pd.crosstab</code> and <code>adjusted_rand_score</code>. (3) Repeat (2) <em>without</em> scaling and explain the difference.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_wine
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, adjusted_rand_score

X, y = load_wine(return_X_y=True)
Xs = StandardScaler().fit_transform(X)
for k in range(2, 7):
    labels = KMeans(n_clusters=k, n_init=10, random_state=0).fit_predict(Xs)
    print(f"k={k}: silhouette={silhouette_score(Xs, labels):.3f}")

for name, data in [("scaled", Xs), ("unscaled", X)]:
    labels = KMeans(n_clusters=3, n_init=10, random_state=0).fit_predict(data)
    print(f"\n{name}: ARI = {adjusted_rand_score(y, labels):.3f}")
    print(pd.crosstab(pd.Series(y, name="cultivar"), pd.Series(labels, name="cluster")))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">k=2: silhouette=0.268
k=3: silhouette=0.285
k=4: silhouette=0.246
k=5: silhouette=0.203
k=6: silhouette=0.196

scaled: ARI = 0.897
cluster    0   1   2
cultivar            
0          0   0  59
1         65   3   3
2          0  48   0

unscaled: ARI = 0.371
cluster    0   1   2
cultivar            
0          0  46  13
1         50   1  20
2         19   0  29</code></pre>
<p>With scaling, the silhouette score peaks at k = 3 — matching the three cultivars — and the clusters line up with the cultivars almost perfectly (high ARI). Without scaling, the <code>proline</code> feature (values in the hundreds to over a thousand) dominates the distances, so k-means essentially clusters on proline alone, and agreement with the real cultivars drops sharply. Scaling is not optional for distance-based methods.</p>`
          },
          quiz: [
            { q: "What are the two alternating steps of k-means?", options: ["Split and prune", "Assign each point to the nearest centroid; move each centroid to the mean of its points", "Compute gradients; update weights", "Merge the closest clusters; repeat"], answer: 1, explain: "k-means alternates assignment and update steps until assignments stop changing." },
            { q: "Why does inertia alone not tell you the best k?", options: ["It cannot be computed", "It always decreases as k increases, reaching 0 when every point is its own cluster", "It increases with k", "It only works for k = 2"], answer: 1, explain: "More clusters always fit better by this measure, so look for the elbow or use silhouette scores." },
            { q: "Which method can find two interleaving half-moon shapes and label scattered outliers as noise?", options: ["k-means", "DBSCAN", "PCA", "Linear regression"], answer: 1, explain: "DBSCAN grows clusters through dense regions, handles arbitrary shapes, and marks sparse points as noise." },
            { q: "What does a silhouette score near 1 for a clustering indicate?", options: ["Points are closer to other clusters than their own", "Clusters are tight and well separated", "There is exactly one cluster", "The data is labelled"], answer: 1, explain: "A high silhouette means each point is much closer to its own cluster than to the nearest other cluster." }
          ]
        },
        {
          id: "ml-unsup-pca-anomaly",
          title: "PCA for Dimensionality Reduction, and Anomaly Detection",
          minutes: 50,
          objectives: [
            "Explain what principal components are and what explained variance means",
            "Use PCA to visualise high-dimensional data in 2-D",
            "Use PCA as a preprocessing step and choose the number of components",
            "Detect anomalies with Isolation Forest"
          ],
          body: String.raw`
<p>Many datasets have dozens or thousands of features: 64 pixels per digit image, hundreds of sensor readings, thousands of word counts. High dimensionality makes data impossible to plot, slows training, and can hurt distance-based models. <strong>Dimensionality reduction</strong> compresses the data into fewer features while keeping as much information as possible. The classic method is <strong>principal component analysis (PCA)</strong>.</p>

<h3>PCA intuition</h3>
<p>Imagine a cloud of points shaped like a flattened rugby ball in 3-D. Most of the spread is along its long axis, some along the second axis, and very little along the thin third axis. PCA finds these axes:</p>
<ul>
  <li>The <strong>first principal component</strong> is the direction along which the data varies the most.</li>
  <li>The <strong>second</strong> is the direction of greatest remaining variance, <em>perpendicular</em> to the first; and so on.</li>
</ul>
<p>Each component is a weighted combination of the original features. Projecting the data onto the first few components gives new coordinates that keep most of the variance (information) and drop the directions where the data barely varies, which are often noise. Mathematically, the components are the eigenvectors of the data's covariance matrix (computed in practice via the singular value decomposition) — the linear algebra from the math track at work.</p>
<p>The <strong>explained variance ratio</strong> tells you what fraction of the total variance each component captures. Because PCA is about variance, <strong>scale your features first</strong>, or a feature measured in large units will dominate the components.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.decomposition import PCA

rng = np.random.default_rng(0)
# 2-D data that really lies near a line: y = 2x + small noise
x = rng.normal(0, 1, 300)
data = np.column_stack([x, 2 * x + rng.normal(0, 0.3, 300)])

pca = PCA().fit(data)
print("component directions:\n", pca.components_.round(3))
print("explained variance ratio:", pca.explained_variance_ratio_.round(4))

one_d = PCA(n_components=1).fit(data)
compressed = one_d.transform(data)                 # 2 numbers per point -&gt; 1 number
restored = one_d.inverse_transform(compressed)     # back to 2-D
print("mean reconstruction error:", np.mean(np.linalg.norm(data - restored, axis=1)).round(3))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">component directions:
 [[ 0.439  0.898]
 [ 0.898 -0.439]]
explained variance ratio: [0.9969 0.0031]
mean reconstruction error: 0.103</code></pre>
<p>The first component points along the line (roughly the direction (1, 2) normalised) and captures over 99% of the variance; one number per point is almost as good as two. The small reconstruction error is the information we dropped.</p>

<h3>Visualising high-dimensional data</h3>
<p>The digits dataset has 64 features (8×8 pixels). Projecting onto the first two components lets us plot it and see whether the classes form groups — a quick, useful exploration before modelling.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

X, y = load_digits(return_X_y=True)
Xs = StandardScaler().fit_transform(X)
pca = PCA(n_components=2, random_state=0)
X2 = pca.fit_transform(Xs)
print("shape before:", X.shape, " after:", X2.shape)
print("variance kept by 2 components:", pca.explained_variance_ratio_.sum().round(3))

# Average 2-D position of each digit: well-separated digits sit far apart
for d in range(10):
    cx, cy = X2[y == d].mean(axis=0)
    print(f"digit {d}: centre at ({cx:5.2f}, {cy:5.2f})")

plt.figure(figsize=(6, 5))
plt.scatter(X2[:, 0], X2[:, 1], c=y, cmap="tab10", s=8)
plt.colorbar(label="digit")
plt.xlabel("PC 1"); plt.ylabel("PC 2")
plt.savefig("digits_pca.png", dpi=80)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shape before: (1797, 64)  after: (1797, 2)
variance kept by 2 components: 0.216
digit 0: centre at (-1.63, -1.95)
digit 1: centre at (-0.47,  0.48)
digit 2: centre at ( 3.65, -0.69)
digit 3: centre at ( 2.71,  0.66)
digit 4: centre at (-4.65, -0.36)
digit 5: centre at ( 1.31,  0.97)
digit 6: centre at (-1.31, -3.88)
digit 7: centre at (-0.83,  3.84)
digit 8: centre at ( 0.60,  0.54)
digit 9: centre at ( 0.65,  0.39)</code></pre>
<p>Two components keep only about a fifth of the variance, yet the digit centres are already spread out — in the saved scatter plot, digits such as 0, 4 and 6 form visible groups, while others overlap. For visualisation, non-linear methods such as t-SNE (<code>sklearn.manifold.TSNE</code>) or UMAP often separate classes more clearly; PCA's advantages are speed, determinism and an exact <code>transform</code> for new data.</p>

<h3>How many components? PCA as preprocessing</h3>
<p>For modelling, choose enough components to keep, say, 90–95% of the variance — pass a fraction as <code>n_components</code> and PCA picks the number for you. Then put PCA inside a pipeline so it is fitted on training folds only.</p>
<pre><code class="lang-python runnable">from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

X, y = load_digits(return_X_y=True)
for var in [0.5, 0.8, 0.95, None]:
    steps = [StandardScaler()] + ([PCA(n_components=var, random_state=0)] if var else []) + [LogisticRegression(max_iter=2000)]
    pipe = make_pipeline(*steps)
    score = cross_val_score(pipe, X, y, cv=5).mean()
    n_comp = pipe.fit(X, y)[1].n_components_ if var else X.shape[1]
    print(f"keep {str(var):4} of variance -&gt; {n_comp:2d} features, CV accuracy {score:.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">keep 0.5  of variance -&gt;  8 features, CV accuracy 0.812
keep 0.8  of variance -&gt; 21 features, CV accuracy 0.900
keep 0.95 of variance -&gt; 40 features, CV accuracy 0.912
keep None of variance -&gt; 64 features, CV accuracy 0.920</code></pre>
<p>Keeping 95% of the variance needs only around two thirds of the features while giving about the same accuracy. The gains from PCA are bigger when there are hundreds of correlated features: faster training, less overfitting, less storage. The downside: components are mixtures of original features, so the model becomes harder to interpret.</p>

<h3>Anomaly detection with Isolation Forest</h3>
<p><strong>Anomaly (outlier) detection</strong> finds rare items that differ from the bulk of the data: fraudulent transactions, failing machines, intrusions, data-entry errors. Often you have no (or very few) labelled anomalies, so it is treated as an unsupervised problem.</p>
<p><strong>Isolation Forest</strong> uses a neat idea: anomalies are <em>easy to isolate</em>. Build random trees that split on random features at random thresholds. A normal point, sitting in a dense crowd, needs many splits before it is alone in a leaf; an anomaly, out on its own, is isolated after just a few. The average path length over many trees becomes an anomaly score. It is fast, works in high dimensions and needs no scaling.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.metrics import precision_score, recall_score, roc_auc_score

rng = np.random.default_rng(42)
normal = rng.normal(loc=[50, 20], scale=[5, 3], size=(980, 2))          # e.g. [amount, items]
anomalies = rng.uniform(low=[0, 0], high=[150, 60], size=(20, 2))       # scattered oddities
X = np.vstack([normal, anomalies])
is_anomaly = np.r_[np.zeros(980), np.ones(20)].astype(int)               # used ONLY to evaluate

iso = IsolationForest(n_estimators=200, contamination=0.02, random_state=0).fit(X)
pred = (iso.predict(X) == -1).astype(int)             # predict: -1 = anomaly, 1 = normal
scores = -iso.score_samples(X)                         # higher = more anomalous
print("flagged:", pred.sum(), "points")
print(f"precision={precision_score(is_anomaly, pred):.2f}  recall={recall_score(is_anomaly, pred):.2f}  "
      f"ROC AUC of scores={roc_auc_score(is_anomaly, scores):.3f}")
print("most anomalous 3 points:\n", X[np.argsort(scores)[::-1][:3]].round(1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">flagged: 20 points
precision=0.95  recall=0.95  ROC AUC of scores=1.000
most anomalous 3 points:
 [[139.4  58.9]
 [117.4  56.5]
 [118.1  37.9]]</code></pre>
<p><code>contamination</code> is your guess of the anomaly fraction; it only sets the threshold for <code>predict</code>. The continuous score is often more useful: rank items by score and let analysts review the top of the list. Some "anomalies" we generated happen to fall inside the normal cloud and are, honestly, not anomalous — no method can find those, which is why recall is not perfect. Other options in scikit-learn: <code>LocalOutlierFactor</code> (density-based) and <code>OneClassSVM</code>. Also remember the simple baselines: z-scores and interquartile-range rules on single features catch many data errors.</p>
<div class="callout warn"><strong>Common mistake:</strong> calling every flagged point "fraud". An anomaly detector finds the <em>unusual</em>, not the <em>bad</em>. A new big corporate customer is unusual but legitimate. Use anomaly scores to prioritise human review, and once you collect confirmed labels, train a supervised model, which is usually far more precise.</div>
<div class="callout info"><strong>Looking ahead:</strong> the same anomaly ideas are used in production to monitor models — flagging incoming data that looks unlike the training data (data drift). The Production ML Systems track builds on this.</div>
`,
          keyPoints: [
            "PCA finds perpendicular directions of maximum variance; explained_variance_ratio_ shows how much each keeps.",
            "Scale features before PCA; use it to visualise data in 2-D or to compress features inside a pipeline.",
            "Pass a fraction such as n_components=0.95 to keep enough components for 95% of the variance.",
            "Isolation Forest scores points by how quickly random splits isolate them; anomalies isolate fast.",
            "Anomalies are unusual, not necessarily bad: use scores to prioritise review, then move to supervised models when labels exist."
          ],
          exercise: {
            prompt: String.raw`<p>On <code>load_breast_cancer</code>: (1) scale the 30 features and fit a full PCA; print how many components are needed to reach 90% and 95% of variance (use <code>np.cumsum</code> on <code>explained_variance_ratio_</code>). (2) Compare 5-fold CV accuracy of a scaled logistic regression with and without <code>PCA(n_components=5)</code> in the pipeline. (3) Fit an <code>IsolationForest(contamination=0.05, random_state=0)</code> on the scaled data and report what fraction of the flagged tumours are malignant (label 0), compared with the overall malignant rate.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import IsolationForest

X, y = load_breast_cancer(return_X_y=True)
Xs = StandardScaler().fit_transform(X)
cum = np.cumsum(PCA().fit(Xs).explained_variance_ratio_)
print("components for 90%:", np.argmax(cum &gt;= 0.90) + 1, " for 95%:", np.argmax(cum &gt;= 0.95) + 1)

full = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
small = make_pipeline(StandardScaler(), PCA(n_components=5), LogisticRegression(max_iter=1000))
print("30 features CV acc:", cross_val_score(full, X, y, cv=5).mean().round(3))
print(" 5 components CV acc:", cross_val_score(small, X, y, cv=5).mean().round(3))

flags = IsolationForest(contamination=0.05, random_state=0).fit_predict(Xs) == -1
print(f"flagged {flags.sum()} tumours; malignant among flagged: {np.mean(y[flags] == 0):.2f} "
      f"vs overall malignant rate {np.mean(y == 0):.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">components for 90%: 7  for 95%: 10
30 features CV acc: 0.981
 5 components CV acc: 0.97
flagged 29 tumours; malignant among flagged: 0.90 vs overall malignant rate 0.37</code></pre>
<p>A handful of components hold most of the variance because many of the 30 measurements are strongly correlated (radius, perimeter and area all measure size). Five components lose very little accuracy. The isolation forest, which never saw labels, flags tumours that are mostly malignant — unusual measurements tend to be dangerous ones — showing how unsupervised scores can surface cases worth a closer look.</p>`
          },
          quiz: [
            { q: "What is the first principal component?", options: ["The feature with the largest values", "The direction in feature space along which the data varies the most", "The cluster centre", "The label"], answer: 1, explain: "PCA's first component is the direction of maximum variance; later components capture the remaining variance, each perpendicular to the previous ones." },
            { q: "Why should you standardize features before PCA?", options: ["PCA cannot run otherwise", "Otherwise features with large units dominate the variance and therefore the components", "To remove missing values", "To make PCA supervised"], answer: 1, explain: "PCA maximises variance, and raw variance depends on units. Scaling puts features on an equal footing." },
            { q: "What does PCA(n_components=0.95) do?", options: ["Keeps 95 components", "Keeps the smallest number of components that explain at least 95% of the variance", "Removes 95% of the rows", "Sets the learning rate"], answer: 1, explain: "A float between 0 and 1 is interpreted as the target fraction of explained variance." },
            { q: "Why do anomalies get short path lengths in an Isolation Forest?", options: ["They have missing values", "They lie in sparse regions, so few random splits are needed to isolate them", "They are labelled", "Trees are pruned at anomalies"], answer: 1, explain: "Points far from the crowd are separated from everything else after only a few random cuts." }
          ]
        }
      ]
    },
    {
      id: "ml-project",
      title: "End-to-End Project: From Data to a Prediction API",
      summary: "Frame a problem, build and evaluate a full pipeline, save it with joblib, and serve it as a REST API with FastAPI — the complete path from notebook to application.",
      lessons: [
        {
          id: "ml-proj-build",
          title: "Project Part 1: Frame, Build, Evaluate and Save the Model",
          minutes: 60,
          objectives: [
            "Frame a business problem as an ML task with a success metric and a baseline",
            "Build, compare and tune complete pipelines with cross-validation",
            "Evaluate the final model once on a held-out test set and analyse its errors",
            "Save a trained pipeline and its metadata with joblib and reload it safely"
          ],
          body: String.raw`
<p>Time to put the whole track together. Over two lessons you will build a small but complete ML application: a model that classifies wines from a laboratory's chemical analysis, served through a web API that another program could call. Every step uses techniques you have already learned; the new skills are <em>connecting</em> them, saving the result and serving it.</p>
<figure><img alt="Data pipeline from sources such as app databases, logs and streams, through ETL and storage, to labeling and sampling and then feature engineering that produces training data" src="assets/diagrams/data-pipeline.svg"><figcaption>Where training data comes from at production scale. Our project starts at the last box: a ready table that we turn into features and a model.</figcaption></figure>

<h3>Step 1: Frame the problem</h3>
<p>The scenario: a wine co-operative receives batches from three grape cultivars (labelled 0, 1, 2). A laboratory measures 13 chemical properties of each batch. Labelling batches currently requires an expert tasting panel, which is slow. The co-operative wants an automatic first-pass classification from the lab results, with uncertain cases sent to the panel.</p>
<ul>
  <li><strong>ML task</strong>: supervised, multiclass classification. Input: 13 numeric lab measurements. Output: cultivar plus class probabilities.</li>
  <li><strong>Metric</strong>: classes are moderately imbalanced and all mistakes are equally bad, so we use <strong>macro-averaged F1</strong> (the average of the per-class F1 scores, so each cultivar counts equally) and report accuracy alongside it.</li>
  <li><strong>Success criterion</strong>: clearly beat the majority-class baseline; macro-F1 ≥ 0.95 on the test set would let the panel review only uncertain cases.</li>
  <li><strong>Operational need</strong>: predictions over HTTP in milliseconds; a probability threshold for "send to panel".</li>
</ul>
<p>The data is scikit-learn's bundled <strong>wine</strong> dataset (178 batches). In a real project you would also ask: how was the data collected? Will future batches come from the same vineyards and lab equipment? Is 178 rows enough? (For three well-separated classes, it is.)</p>

<h3>Step 2: Get and explore the data</h3>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_wine

wine = load_wine(as_frame=True)
df = wine.frame.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
print(df.shape)
print("class counts:", df["target"].value_counts().sort_index().to_dict())
print("missing values:", int(df.isna().sum().sum()))
print(df.describe().T[["mean", "std", "min", "max"]].round(2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(178, 14)
class counts: {0: 59, 1: 71, 2: 48}
missing values: 0
                        mean     std     min      max
alcohol                13.00    0.81   11.03    14.83
malic_acid              2.34    1.12    0.74     5.80
ash                     2.37    0.27    1.36     3.23
alcalinity_of_ash      19.49    3.34   10.60    30.00
magnesium              99.74   14.28   70.00   162.00
total_phenols           2.30    0.63    0.98     3.88
flavanoids              2.03    1.00    0.34     5.08
nonflavanoid_phenols    0.36    0.12    0.13     0.66
proanthocyanins         1.59    0.57    0.41     3.58
color_intensity         5.06    2.32    1.28    13.00
hue                     0.96    0.23    0.48     1.71
od280_od315             2.61    0.71    1.27     4.00
proline               746.89  314.91  278.00  1680.00
target                  0.94    0.78    0.00     2.00</code></pre>
<p>Findings: no missing values; 13 numeric features on very different scales (magnesium and proline in the hundreds, hue around 1) — so scaling matters for linear and distance models; classes are mildly imbalanced (59 / 71 / 48). We renamed the one column whose name contained a slash, because the API in the next lesson will use the column names as JSON field names.</p>

<h3>Step 3: Split, baseline, and candidate pipelines</h3>
<p>We lock away a stratified test set first, then compare candidates by cross-validation on the training portion only. Even though this data has no missing values, the pipeline includes an imputer: production data is messier than training data, and a lab instrument may one day fail to report a value.</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, cross_validate, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier

wine = load_wine(as_frame=True)
X = wine.data.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
y = wine.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

def make_pipe(model, scale=True):
    steps = [("impute", SimpleImputer(strategy="median"))]
    if scale:
        steps.append(("scale", StandardScaler()))
    return Pipeline(steps + [("model", model)])

candidates = {
    "baseline": make_pipe(DummyClassifier(strategy="most_frequent"), scale=False),
    "logistic regression": make_pipe(LogisticRegression(max_iter=2000)),
    "random forest": make_pipe(RandomForestClassifier(n_estimators=300, random_state=42), scale=False),
    "hist grad boosting": make_pipe(HistGradientBoostingClassifier(random_state=42), scale=False),
}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for name, pipe in candidates.items():
    r = cross_validate(pipe, X_train, y_train, cv=cv, scoring=["f1_macro", "accuracy"])
    print(f"{name:20}: macro-F1 {r['test_f1_macro'].mean():.3f} +/- {r['test_f1_macro'].std():.3f}   "
          f"accuracy {r['test_accuracy'].mean():.3f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">baseline            : macro-F1 0.190 +/- 0.006   accuracy 0.399
logistic regression : macro-F1 0.978 +/- 0.018   accuracy 0.977
random forest       : macro-F1 0.985 +/- 0.029   accuracy 0.985
hist grad boosting  : macro-F1 0.963 +/- 0.041   accuracy 0.963</code></pre>
<p>All real models crush the baseline. Logistic regression and the random forest are essentially tied at the top. Following the "prefer simpler when tied" rule, logistic regression is attractive: tiny, fast, and its coefficients are explainable to the co-operative. We tune its regularization strength next.</p>

<h3>Step 4: Tune, then evaluate once on the test set</h3>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, f1_score

wine = load_wine(as_frame=True)
X = wine.data.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
y = wine.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

pipe = Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler()),
                 ("model", LogisticRegression(max_iter=2000))])
search = GridSearchCV(pipe, {"model__C": [0.01, 0.03, 0.1, 0.3, 1, 3, 10]}, scoring="f1_macro",
                      cv=StratifiedKFold(5, shuffle=True, random_state=42))
search.fit(X_train, y_train)
print("best C:", search.best_params_["model__C"], " CV macro-F1:", round(search.best_score_, 3))

best = search.best_estimator_            # already refitted on all training data
pred = best.predict(X_test)
print(f"TEST macro-F1: {f1_score(y_test, pred, average='macro'):.3f}")
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred, target_names=wine.target_names, digits=3))

# Error analysis: how confident is the model, and which cases would go to the panel?
proba = best.predict_proba(X_test)
confidence = proba.max(axis=1)
print("lowest-confidence test cases:", np.sort(confidence)[:3].round(3))
print("cases below 0.8 confidence (send to panel):", int(np.sum(confidence &lt; 0.8)), "of", len(y_test))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best C: 0.3  CV macro-F1: 0.992
TEST macro-F1: 1.000
[[15  0  0]
 [ 0 18  0]
 [ 0  0 12]]
              precision    recall  f1-score   support

     class_0      1.000     1.000     1.000        15
     class_1      1.000     1.000     1.000        18
     class_2      1.000     1.000     1.000        12

    accuracy                          1.000        45
   macro avg      1.000     1.000     1.000        45
weighted avg      1.000     1.000     1.000        45

lowest-confidence test cases: [0.547 0.605 0.622]
cases below 0.8 confidence (send to panel): 5 of 45</code></pre>
<p>The test result meets the success criterion — here every one of the 45 test wines is classified correctly. Do not read a perfect score as "the model is perfect": with 45 test rows, a true error rate of 1–2% would often produce zero test errors, and the CV estimate (about 0.99) is the more realistic expectation. Error analysis adds what a single number cannot: the confidence distribution tells the co-operative how many batches the panel would still review with a "below 0.8 confidence" rule. In a real project you would also look at <em>which</em> samples are misclassified or uncertain and ask a domain expert whether they are unusual (a slice check).</p>
<div class="callout warn"><strong>Common mistake:</strong> going back to tweak the model after seeing the test score, then re-testing. If the test result disappoints, that is information — but any further iteration should use cross-validation on training data, and you should report that the test set has been reused (or get fresh test data).</div>

<h3>Step 5: Save the model with joblib</h3>
<p>A trained pipeline is a Python object. To use it in another program (our API), we <strong>serialise</strong> it to a file. scikit-learn recommends <code>joblib</code>, which efficiently stores objects containing large NumPy arrays. Save the <em>whole pipeline</em> — imputer, scaler and model — not just the model, so serving applies exactly the same preprocessing.</p>
<p>Alongside the model, save <strong>metadata</strong>: the feature names and order, class names, library versions, training date, and the evaluation results. When something goes wrong in production months later, this is how you know what is running.</p>
<pre><code class="lang-python runnable">import json
import datetime
import joblib
import sklearn
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score

wine = load_wine(as_frame=True)
X = wine.data.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
y = wine.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
model = Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler()),
                  ("model", LogisticRegression(C=0.3, max_iter=2000))]).fit(X_train, y_train)   # C chosen by the search
test_f1 = f1_score(y_test, model.predict(X_test), average="macro")

joblib.dump(model, "wine_model.joblib")
metadata = {
    "model_version": "1.0.0",
    "trained_at": datetime.date(2026, 1, 15).isoformat(),   # use datetime.date.today() in real code
    "features": list(X.columns),
    "classes": wine.target_names.tolist(),
    "sklearn_version": sklearn.__version__,
    "test_macro_f1": round(test_f1, 4),
}
with open("wine_model.json", "w") as f:
    json.dump(metadata, f, indent=2)

# --- later, in another process: load and verify
loaded = joblib.load("wine_model.joblib")
meta = json.load(open("wine_model.json"))
assert meta["sklearn_version"] == sklearn.__version__, "version mismatch: retrain or pin versions"
sample = X_test.iloc[:3][meta["features"]]               # enforce the training column order
print("reloaded predictions:", [meta["classes"][i] for i in loaded.predict(sample)])
print("same as original:", (loaded.predict(X_test) == model.predict(X_test)).all())
print("metadata:", {k: meta[k] for k in ["model_version", "classes", "test_macro_f1"]})</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">reloaded predictions: ['class_0', 'class_1', 'class_0']
same as original: True
metadata: {'model_version': '1.0.0', 'classes': ['class_0', 'class_1', 'class_2'], 'test_macro_f1': 1.0}</code></pre>
<div class="callout warn"><strong>Security warning:</strong> <code>joblib.load</code> (like Python's <code>pickle</code>) can execute arbitrary code embedded in the file. Only load model files you created or fully trust — never one uploaded by a user. Also pin library versions: a model saved with one scikit-learn version is not guaranteed to load correctly in another. For cross-language or safer deployment, formats like ONNX (via <code>skl2onnx</code>) or scikit-learn's <code>skops</code> exist.</div>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 6, covers experiment tracking and versioning — recording code, data, hyperparameters and results for every model — so any model in production can be traced and reproduced. Our metadata file is a minimal version of that idea.</div>
`,
          keyPoints: [
            "Frame first: ML task, metric (macro-F1 here), success criterion, baseline and operational needs.",
            "Lock away a stratified test set, compare candidate pipelines with identical CV folds, prefer the simpler model when tied.",
            "Tune with GridSearchCV on training data, evaluate once on test, and analyse errors and confidence.",
            "Save the entire fitted pipeline with joblib plus metadata (features, classes, versions, metrics).",
            "Only load trusted model files and pin library versions between training and serving."
          ],
          exercise: {
            prompt: String.raw`<p>Repeat the project steps for <code>load_breast_cancer</code>, framed as "flag malignant tumours for urgent review" (make malignant = 1). Use recall for malignant at a precision of at least 0.9 as your business metric: (1) build a scaled logistic regression pipeline, (2) on the training set use <code>cross_val_predict(..., method="predict_proba")</code> to get out-of-fold probabilities and pick the <em>lowest</em> threshold whose precision is ≥ 0.9, (3) apply that threshold on the test set and report precision and recall, (4) save the pipeline and the chosen threshold together in one joblib file as a dict, reload and verify.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import joblib
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_predict, StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score

X, y = load_breast_cancer(return_X_y=True)
y = 1 - y                                             # 1 = malignant
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000))

oof = cross_val_predict(pipe, X_tr, y_tr, cv=StratifiedKFold(5, shuffle=True, random_state=0),
                        method="predict_proba")[:, 1]
chosen = None
for t in np.arange(0.05, 0.96, 0.05):
    pred = (oof &gt;= t).astype(int)
    if precision_score(y_tr, pred) &gt;= 0.9:
        chosen = round(float(t), 2)
        break
print("chosen threshold (from out-of-fold training predictions):", chosen)

pipe.fit(X_tr, y_tr)
test_pred = (pipe.predict_proba(X_te)[:, 1] &gt;= chosen).astype(int)
print(f"test precision={precision_score(y_te, test_pred):.3f}  recall={recall_score(y_te, test_pred):.3f}")

joblib.dump({"pipeline": pipe, "threshold": chosen}, "cancer_model.joblib")
bundle = joblib.load("cancer_model.joblib")
again = (bundle["pipeline"].predict_proba(X_te)[:, 1] &gt;= bundle["threshold"]).astype(int)
print("reloaded bundle gives identical decisions:", (again == test_pred).all())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">chosen threshold (from out-of-fold training predictions): 0.2
test precision=0.852  recall=0.981
reloaded bundle gives identical decisions: True</code></pre>
<p>Out-of-fold probabilities give every training row a prediction from a model that did not see it, so the threshold is chosen without touching the test set. Notice that test precision (about 0.85) came out a little below the 0.9 target: a threshold tuned on one sample never transfers exactly, and with around 53 malignant test cases a couple of extra false alarms move precision by several points. In practice you would add a safety margin (choose the threshold for, say, 0.93 precision) and keep monitoring precision in production. Saving the threshold with the pipeline matters: the threshold is part of the decision logic, and serving code that silently used 0.5 instead would behave differently from what you evaluated.</p>`
          },
          quiz: [
            { q: "Why save the whole Pipeline rather than just the final estimator?", options: ["It is smaller", "So serving applies exactly the same preprocessing (imputation, scaling) learned during training", "joblib cannot save estimators", "It trains faster"], answer: 1, explain: "The pipeline carries the fitted preprocessing parameters; saving only the model would force you to re-implement preprocessing and risk training-serving skew." },
            { q: "Why use macro-averaged F1 for the wine classifier?", options: ["It is the only multiclass metric", "Each class counts equally, so performance on the smaller classes is not hidden by the larger one", "It ignores errors", "It is required by GridSearchCV"], answer: 1, explain: "Macro averaging computes F1 per class and averages them unweighted, giving each cultivar equal importance." },
            { q: "What is the main security risk of joblib.load?", options: ["It is slow", "Loading an untrusted file can execute arbitrary code", "It deletes the file", "It changes the model"], answer: 1, explain: "joblib uses pickle under the hood; malicious files can run code when loaded. Only load trusted artifacts." },
            { q: "Which item is LEAST useful to store in model metadata?", options: ["Feature names and order", "Library versions", "Evaluation metrics and training date", "The developer's favourite colour"], answer: 3, explain: "Metadata should support reproducing, validating and debugging the model: features, versions, metrics, dates, data references." }
          ]
        },
        {
          id: "ml-proj-serve",
          title: "Project Part 2: Serve the Model as a REST API with FastAPI",
          minutes: 60,
          objectives: [
            "Explain what a prediction API is and why models are served over HTTP",
            "Build a FastAPI app with validated input schemas, health and predict endpoints",
            "Test the API in-process with FastAPI's TestClient",
            "Describe what changes in production: monitoring, retraining, versioning and containers"
          ],
          body: String.raw`
<p>A model in a notebook helps nobody. To be useful, other software — a web shop, a mobile app, a lab system — must be able to send it data and get predictions back. The standard way is a <strong>REST API</strong>: a small web service that receives a request over HTTP containing JSON, runs the model, and returns JSON. In this lesson you will build one with <strong>FastAPI</strong>, the most popular modern Python web framework for ML services.</p>

<h3>Key ideas in one paragraph</h3>
<p>An <strong>HTTP API</strong> exposes <em>endpoints</em> — URL paths with methods such as GET (read) and POST (send data). A client POSTs a JSON body like <code>{"alcohol": 13.2, ...}</code> to <code>/predict</code>; the server responds with JSON like <code>{"cultivar": "class_0", "probability": 0.97}</code> and a <strong>status code</strong>: 200 for success, 422 for invalid input, 500 for server errors. FastAPI uses <strong>Pydantic</strong> models — Python classes with typed fields — to describe and automatically <em>validate</em> request and response bodies, and it generates interactive documentation at <code>/docs</code> for free.</p>

<h3>Design of our service</h3>
<ul>
  <li><code>GET /health</code> — returns status and model version. Load balancers and monitoring call it to check the service is alive.</li>
  <li><code>POST /predict</code> — one wine's 13 measurements in, predicted cultivar and probabilities out.</li>
  <li><code>POST /predict/batch</code> — a list of wines in, a list of predictions out (more efficient for many rows).</li>
  <li>The model is loaded <strong>once at startup</strong>, not on every request (loading from disk per request would be slow).</li>
  <li>Inputs are validated: missing fields or non-numeric values are rejected with a 422 error before the model sees them.</li>
</ul>

<h3>The complete, runnable service</h3>
<p>So this block runs on its own, it first trains and saves the model (in a real project this is a separate training script, as in Part 1). It then defines the API and, instead of starting a real web server, uses FastAPI's <code>TestClient</code>, which sends real HTTP requests to the app in-process. This is also exactly how you write automated tests for an API.</p>
<pre><code class="lang-python runnable">import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field
from sklearn.datasets import load_wine
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# ---------- 1. Training script (normally a separate file run offline) ----------
wine = load_wine(as_frame=True)
X = wine.data.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
pipe = Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler()),
                 ("model", LogisticRegression(max_iter=2000))]).fit(X, wine.target)
joblib.dump({"pipeline": pipe, "features": list(X.columns),
             "classes": wine.target_names.tolist(), "version": "1.0.0"}, "wine_model.joblib")

# ---------- 2. Serving app (normally app.py) ----------
bundle = joblib.load("wine_model.joblib")       # load ONCE at startup
MODEL, FEATURES, CLASSES = bundle["pipeline"], bundle["features"], bundle["classes"]

class WineFeatures(BaseModel):
    alcohol: float = Field(..., gt=0, description="Alcohol content (%)")
    malic_acid: float
    ash: float
    alcalinity_of_ash: float
    magnesium: float
    total_phenols: float
    flavanoids: float
    nonflavanoid_phenols: float
    proanthocyanins: float
    color_intensity: float
    hue: float
    od280_od315: float
    proline: float

class Prediction(BaseModel):
    cultivar: str
    probability: float
    probabilities: dict[str, float]
    needs_review: bool

app = FastAPI(title="Wine cultivar classifier", version=bundle["version"])

def predict_rows(rows: list[WineFeatures]) -&gt; list[Prediction]:
    df = pd.DataFrame([r.model_dump() for r in rows])[FEATURES]    # enforce training column order
    proba = MODEL.predict_proba(df)
    out = []
    for p in proba:
        best = int(p.argmax())
        out.append(Prediction(cultivar=CLASSES[best], probability=round(float(p[best]), 4),
                              probabilities={c: round(float(v), 4) for c, v in zip(CLASSES, p)},
                              needs_review=bool(p[best] &lt; 0.8)))
    return out

@app.get("/health")
def health():
    return {"status": "ok", "model_version": bundle["version"]}

@app.post("/predict", response_model=Prediction)
def predict(wine_in: WineFeatures):
    return predict_rows([wine_in])[0]

@app.post("/predict/batch", response_model=list[Prediction])
def predict_batch(wines: list[WineFeatures]):
    if len(wines) &gt; 1000:
        raise HTTPException(status_code=413, detail="batch too large (max 1000)")
    return predict_rows(wines)

# ---------- 3. Exercise the API exactly as a client would ----------
client = TestClient(app)
print("GET /health -&gt;", client.get("/health").json())

sample = X.iloc[0].to_dict()                      # a real wine from the dataset
r = client.post("/predict", json=sample)
print("POST /predict -&gt;", r.status_code, r.json())

batch = [X.iloc[i].to_dict() for i in (0, 70, 150)]
r = client.post("/predict/batch", json=batch)
print("POST /predict/batch -&gt;", r.status_code, [p["cultivar"] for p in r.json()])

bad = dict(sample)
del bad["proline"]                                # missing field
bad["alcohol"] = "very strong"                    # wrong type
r = client.post("/predict", json=bad)
print("invalid input -&gt;", r.status_code, [e["loc"][-1] for e in r.json()["detail"]])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">GET /health -&gt; {'status': 'ok', 'model_version': '1.0.0'}
POST /predict -&gt; 200 {'cultivar': 'class_0', 'probability': 0.9998, 'probabilities': {'class_0': 0.9998, 'class_1': 0.0002, 'class_2': 0.0}, 'needs_review': False}
POST /predict/batch -&gt; 200 ['class_0', 'class_1', 'class_2']
invalid input -&gt; 422 ['alcohol', 'proline']</code></pre>
<p>Walk through what happened:</p>
<ul>
  <li><strong>/health</strong> confirms the service is up and which model version is loaded.</li>
  <li><strong>/predict</strong>: FastAPI parsed the JSON into a <code>WineFeatures</code> object (validating every field), our code built a one-row DataFrame in the training column order, the pipeline imputed, scaled and predicted, and the <code>Prediction</code> schema shaped the response.</li>
  <li><strong>/predict/batch</strong> classified three wines from the three different cultivars in one call.</li>
  <li>The <strong>invalid request</strong> never reached the model: Pydantic rejected it with status 422 and a precise list of problems ("alcohol" is not a number, "proline" is missing). Input validation is your first defence against garbage predictions.</li>
</ul>
<div class="callout tip"><strong>Tip:</strong> the <code>needs_review</code> flag turns a model into a <em>decision system</em>: confident predictions are automated, uncertain ones go to humans. This "human in the loop" pattern is how many real ML products start safely.</div>

<h3>Running it as a real server</h3>
<p>In a project you would split the code into <code>train.py</code> (steps 1 and save) and <code>app.py</code> (step 2), then start a production-grade ASGI server, <strong>uvicorn</strong>:</p>
<pre><code class="lang-bash">pip install fastapi uvicorn scikit-learn pandas joblib
python train.py                      # writes wine_model.joblib
uvicorn app:app --host 0.0.0.0 --port 8000
# then open http://localhost:8000/docs for interactive documentation, or:
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" \
     -d '{"alcohol": 13.2, "malic_acid": 1.8, "ash": 2.1, "alcalinity_of_ash": 15.0, "magnesium": 110,
          "total_phenols": 2.8, "flavanoids": 3.0, "nonflavanoid_phenols": 0.3, "proanthocyanins": 1.9,
          "color_intensity": 5.5, "hue": 1.05, "od280_od315": 3.2, "proline": 1100}'</code></pre>
<p>A tiny <strong>automated test</strong> file (run with <code>pytest</code>) protects the service from regressions whenever you change the code or retrain the model:</p>
<pre><code class="lang-python"># test_app.py  (run: pytest -q)
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health():
    assert client.get("/health").json()["status"] == "ok"

def test_rejects_missing_fields():
    assert client.post("/predict", json={"alcohol": 13.0}).status_code == 422</code></pre>
<p>To ship the service anywhere — a cloud VM, Kubernetes, a managed container platform — you package it in a <strong>container image</strong> with pinned dependencies, so it runs identically everywhere:</p>
<pre><code class="lang-dockerfile">FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py wine_model.joblib ./
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>

<h3>What changes in production</h3>
<p>Getting a model behind an API is the beginning, not the end. Production ML adds concerns that a notebook never shows:</p>
<ul>
  <li><strong>Monitoring</strong>: log every request's inputs, predictions and latency. Track the distribution of inputs (has the average alcohol level shifted? new lab equipment?) and of predictions (suddenly 90% class_2?). When true labels arrive later (the tasting panel's verdicts), track live accuracy. Changes in input distributions are called <strong>data drift</strong>; changes in the input–label relationship are <strong>concept drift</strong>.</li>
  <li><strong>Retraining</strong>: the world changes, so models go stale. Retrain on a schedule (e.g. monthly) or when monitoring detects degradation, using the same pipeline code — then re-evaluate before replacing the live model.</li>
  <li><strong>Versioning and rollback</strong>: every model file has a version tied to its code, data and metrics (our metadata). Deploy new versions gradually (shadow mode, canary releases, A/B tests) and keep the previous version ready to roll back.</li>
  <li><strong>Reliability and scale</strong>: run several replicas behind a load balancer, set timeouts, handle errors gracefully, and keep latency within budget.</li>
  <li><strong>Security and privacy</strong>: authenticate clients, limit request sizes (as our batch endpoint does), never load untrusted model files, and protect personal data in logs.</li>
</ul>
<figure><img alt="Model development and deployment: train candidate models, offline evaluation, a model registry of versioned artifacts, then batch prediction or online prediction serving a client app" src="assets/diagrams/model-dev-deploy.svg"><figcaption>From one model file to a managed system. Our FastAPI service is the "online prediction" path; a model registry replaces our hand-written metadata file.</figcaption></figure>
<div class="callout book"><strong>From the books:</strong> <em>Designing Machine Learning Systems</em>, Ch. 7 "Model Deployment and Prediction Service" (online vs batch prediction, model compression), Ch. 8 "Data Distribution Shifts and Monitoring", and Ch. 9 "Continual Learning and Test in Production" cover these topics in depth. The <strong>Production ML Systems</strong> track of this course builds directly on this lesson.</div>
<div class="callout warn"><strong>Common mistake:</strong> loading the model inside the endpoint function (<code>joblib.load</code> on every request). It works in a demo and collapses under load. Load once at startup (module level, as here, or FastAPI's <em>lifespan</em> handler) and reuse the object.</div>
`,
          keyPoints: [
            "A prediction API receives JSON over HTTP, runs the saved pipeline, and returns JSON with a status code.",
            "FastAPI + Pydantic schemas validate inputs automatically (invalid requests get 422) and document the API at /docs.",
            "Load the model once at startup; enforce the training feature order when building the DataFrame.",
            "TestClient exercises the API in-process: use it for automated tests; uvicorn and a container image run it for real.",
            "Production adds monitoring (data and concept drift), retraining, versioning/rollback, scaling and security."
          ],
          exercise: {
            prompt: String.raw`<p>Extend the service: (1) add a <code>GET /model-info</code> endpoint returning the model version, feature list and class names; (2) add validation so <code>hue</code> must be between 0 and 3 and <code>proline</code> must be positive (use <code>Field(..., ge=..., le=...)</code> / <code>gt=0</code>); (3) count how many predictions the service has served and include the count in <code>/health</code>. Test all three with <code>TestClient</code>, including a request with <code>hue = 7</code> that must be rejected.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field
from sklearn.datasets import load_wine
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

wine = load_wine(as_frame=True)
X = wine.data.rename(columns={"od280/od315_of_diluted_wines": "od280_od315"})
MODEL = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)).fit(X, wine.target)
FEATURES, CLASSES, VERSION = list(X.columns), wine.target_names.tolist(), "1.1.0"
stats = {"predictions_served": 0}

class WineFeatures(BaseModel):
    alcohol: float = Field(..., gt=0)
    malic_acid: float
    ash: float
    alcalinity_of_ash: float
    magnesium: float
    total_phenols: float
    flavanoids: float
    nonflavanoid_phenols: float
    proanthocyanins: float
    color_intensity: float
    hue: float = Field(..., ge=0, le=3)
    od280_od315: float
    proline: float = Field(..., gt=0)

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "predictions_served": stats["predictions_served"]}

@app.get("/model-info")
def model_info():
    return {"version": VERSION, "features": FEATURES, "classes": CLASSES}

@app.post("/predict")
def predict(w: WineFeatures):
    proba = MODEL.predict_proba(pd.DataFrame([w.model_dump()])[FEATURES])[0]
    stats["predictions_served"] += 1
    return {"cultivar": CLASSES[int(proba.argmax())], "probability": round(float(proba.max()), 4)}

client = TestClient(app)
info = client.get("/model-info").json()
print("model-info:", info["version"], len(info["features"]), "features", info["classes"])
for i in (5, 100):
    print("predict:", client.post("/predict", json=X.iloc[i].to_dict()).json())
bad = X.iloc[0].to_dict() | {"hue": 7}
r = client.post("/predict", json=bad)
print("hue=7 -&gt;", r.status_code, r.json()["detail"][0]["msg"])
print("health:", client.get("/health").json())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">model-info: 1.1.0 13 features ['class_0', 'class_1', 'class_2']
predict: {'cultivar': 'class_0', 'probability': 0.9999}
predict: {'cultivar': 'class_1', 'probability': 0.9977}
hue=7 -&gt; 422 Input should be less than or equal to 3
health: {'status': 'ok', 'predictions_served': 2}</code></pre>
<p>Field constraints move business rules ("a hue of 7 is physically implausible for this lab") into the schema, so bad data is rejected with a clear message before it reaches the model. The rejected request did not increase the counter, because the endpoint function never ran. A real service would keep such counters in a metrics system (e.g. Prometheus) rather than a dictionary, since several server processes each have their own memory.</p>`
          },
          quiz: [
            { q: "What HTTP status code does FastAPI return when a request body fails Pydantic validation?", options: ["200", "404", "422", "500"], answer: 2, explain: "422 Unprocessable Entity means the request was well-formed JSON but did not match the declared schema." },
            { q: "Why should the model be loaded at startup rather than inside the predict function?", options: ["It is required by FastAPI", "Loading from disk on every request adds large latency and wasted work; load once and reuse", "Models cannot be loaded twice", "To save disk space"], answer: 1, explain: "Deserialising a model is slow compared with predicting. Doing it once keeps each request fast." },
            { q: "What does fastapi.testclient.TestClient let you do?", options: ["Deploy to the cloud", "Send HTTP requests to the app in-process, without starting a server, e.g. for automated tests", "Train models", "Monitor drift"], answer: 1, explain: "TestClient calls the ASGI app directly with real HTTP semantics, ideal for tests and demos." },
            { q: "After deployment, the average value of an input feature slowly shifts because a lab changed equipment. What is this called and what should you do?", options: ["Overfitting; add regularization", "Data drift; detect it with monitoring and retrain/re-evaluate the model", "Target leakage; drop the feature", "Nothing; models adapt automatically"], answer: 1, explain: "Changing input distributions are data drift. Monitoring detects it; retraining on recent data and re-evaluating addresses it." }
          ]
        }
      ]
    },
  ]
});
