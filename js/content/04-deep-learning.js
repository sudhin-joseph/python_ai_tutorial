window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "dl",
  order: 4,
  title: "Deep Learning, NLP & LLM Foundations",
  level: "Intermediate",
  icon: "🧠",
  description: "Build neural networks from first principles, train them with PyTorch, learn the core architectures and NLP techniques, and understand exactly how transformers and large language models work.",
  outcomes: [
    "Implement and train a neural network from scratch in NumPy, including backpropagation",
    "Write idiomatic PyTorch training loops with Dataset/DataLoader, evaluation mode, regularization and checkpointing",
    "Choose between MLPs, CNNs, RNNs and transformers based on the data type, and explain transfer learning",
    "Build NLP pipelines with TF-IDF, embeddings, tokenization and semantic search",
    "Explain attention, the transformer block and how LLMs are pretrained, aligned and sampled",
    "Reason about tokens, context windows, cost, sampling parameters and hallucination when building LLM apps"
  ],
  modules: [
    {
      id: "dl-nn",
      title: "Neural Networks from First Principles",
      summary: "Build a neural network from the single neuron upward: activations, forward pass, loss, backpropagation and optimizers, finishing with a working network in pure NumPy.",
      lessons: [
        {
          id: "dl-nn-neuron",
          title: "The Artificial Neuron and Activation Functions",
          minutes: 45,
          objectives: [
            "Describe what an artificial neuron computes using weights, a bias and an activation function",
            "Compute a neuron's output by hand and in NumPy",
            "Compare sigmoid, tanh, ReLU and softmax and say where each is used",
            "Explain why stacking layers without a non-linearity gains nothing"
          ],
          body: String.raw`
<p>In the classical ML track you trained models such as linear and logistic regression. A <strong>neural network</strong> is built from the same parts. It is many small logistic-regression-like units, called <strong>neurons</strong>, wired together in layers, with every weight learned by gradient descent. If you understand one neuron well, the rest of deep learning is mostly about connecting many of them and training them efficiently.</p>

<h3>Intuition: a neuron is a weighted vote followed by a squash</h3>
<p>Say you are deciding whether to go for a run. You look at a few signals: is it sunny (x1), how many hours did you sleep (x2), and how much work is waiting for you (x3). Each signal counts for a different amount. Sunshine helps a little, sleep helps a lot, and pending work pushes against running. You also have a baseline mood that pushes you one way before you look at anything. You add it all up, and if the total is high enough you go.</p>
<p>That is an artificial neuron:</p>
<ul>
  <li><strong>Inputs</strong> <code>x1, x2, ..., xn</code>: the numbers fed in (features, or outputs of earlier neurons).</li>
  <li><strong>Weights</strong> <code>w1, w2, ..., wn</code>: how much each input counts, and in which direction. A positive weight means "more of this pushes the output up". A negative weight pushes it down. A weight near zero means "ignore this".</li>
  <li><strong>Bias</strong> <code>b</code>: the baseline. It shifts the total up or down whatever the inputs are, so the neuron can fire even when every input is zero, or need a lot of evidence before it fires.</li>
  <li><strong>Pre-activation</strong> <code>z = w1*x1 + w2*x2 + ... + wn*xn + b</code>: the weighted sum. In vector form this is a dot product: <code>z = w · x + b</code>.</li>
  <li><strong>Activation function</strong> <code>a = f(z)</code>: a fixed non-linear function that turns the raw total into the neuron's output.</li>
</ul>

<figure><img src="assets/diagrams/dl-neuron.svg" alt="An artificial neuron: three inputs multiplied by weights, summed with a bias into z, passed through an activation function f to give the output a"><figcaption>One neuron: weighted sum plus bias, then a non-linear activation.</figcaption></figure>

<p>The weights and the bias are the neuron's <strong>parameters</strong>. Training means finding parameter values that make the network's outputs useful. When people say a model has "7 billion parameters", they mean it has 7 billion such numbers.</p>

<h3>A worked example by hand</h3>
<p>Take inputs <code>x = [1.0, 7.0, 3.0]</code> (sunny, 7 hours of sleep, 3 tasks pending), weights <code>w = [0.5, 0.4, -0.8]</code> and bias <code>b = -1.0</code>.</p>
<p><code>z = 0.5*1.0 + 0.4*7.0 + (-0.8)*3.0 + (-1.0) = 0.5 + 2.8 - 2.4 - 1.0 = -0.1</code></p>
<p>With the <strong>sigmoid</strong> activation, <code>sigmoid(z) = 1 / (1 + e^(-z))</code>, we get <code>sigmoid(-0.1) ≈ 0.475</code>. The neuron is just under 50% confident you will run. Look again at the arithmetic: a neuron with a sigmoid activation is exactly logistic regression. Deep learning starts from something you already know.</p>

<pre><code class="lang-python runnable">import numpy as np

x = np.array([1.0, 7.0, 3.0])     # inputs
w = np.array([0.5, 0.4, -0.8])    # weights
b = -1.0                          # bias

z = np.dot(w, x) + b              # weighted sum (pre-activation)
a = 1 / (1 + np.exp(-z))          # sigmoid activation
print(f"z = {z:.3f}")
print(f"a = sigmoid(z) = {a:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">z = -0.100
a = sigmoid(z) = 0.475</code></pre>

<h3>The common activation functions</h3>
<p>The activation function is what makes a neural network more than a linear model. These four cover nearly everything you will meet:</p>
<table>
  <thead><tr><th>Name</th><th>Formula</th><th>Output range</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td>Sigmoid</td><td>1 / (1 + e^(-z))</td><td>(0, 1)</td><td>Output layer for binary classification (a probability)</td></tr>
    <tr><td>Tanh</td><td>(e^z - e^(-z)) / (e^z + e^(-z))</td><td>(-1, 1)</td><td>Hidden layers in small networks, and inside RNNs/LSTMs. Centred on zero.</td></tr>
    <tr><td>ReLU</td><td>max(0, z)</td><td>[0, infinity)</td><td>The default for hidden layers in modern networks</td></tr>
    <tr><td>Softmax</td><td>e^(z_i) / sum over j of e^(z_j)</td><td>Each in (0, 1), all sum to 1</td><td>Output layer for multi-class classification, and the attention weights in transformers</td></tr>
  </tbody>
</table>

<h4>Sigmoid and tanh</h4>
<p>Both are smooth S-shaped curves. Sigmoid squashes any number into (0, 1), so you can read its output as a probability. Tanh is a stretched and shifted sigmoid with range (-1, 1). Its outputs are centred on zero, which usually makes the next layer easier to train. Both have the same weakness: for large positive or negative <code>z</code> the curve goes flat, and its slope (derivative) is almost zero. Training uses slopes to decide how to change the weights, so a flat region means almost no learning signal. This is called <strong>saturation</strong>. Stack many saturating layers and the signal shrinks layer after layer: the <strong>vanishing gradient</strong> problem.</p>

<h4>ReLU</h4>
<p>ReLU (Rectified Linear Unit) passes positive numbers through unchanged and replaces negative ones with 0. It is very cheap to compute. Its slope is exactly 1 for every positive input, so gradients pass through active ReLUs without shrinking. That is the main reason deep networks became trainable in the 2010s. Its weakness: a neuron whose <code>z</code> is negative for every input outputs 0 every time and gets zero gradient. It is "dead" and stops learning. Variants such as Leaky ReLU (a small slope like 0.01 for negative inputs) and GELU (a smooth version used in most transformers) reduce this problem.</p>

<h4>Softmax</h4>
<p>Softmax is different from the other three. It acts on a whole <em>vector</em> of scores, not on one number. Given raw scores (called <strong>logits</strong>) for K classes, it exponentiates each one (making it positive) and divides by the total (so they add up to 1). The result is a probability distribution over the classes. The largest logit gets the largest probability, but the others keep some probability too: it is a "soft" version of picking the maximum. You will see softmax again in the attention mechanism and in how language models choose the next token.</p>

<pre><code class="lang-python runnable">import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))
def tanh(z):    return np.tanh(z)
def relu(z):    return np.maximum(0, z)
def softmax(z):
    z = z - np.max(z)            # subtract the max for numerical stability
    e = np.exp(z)
    return e / e.sum()

z = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])
np.set_printoptions(precision=3, suppress=True)
print("z       :", z)
print("sigmoid :", sigmoid(z))
print("tanh    :", tanh(z))
print("relu    :", relu(z))

logits = np.array([2.0, 1.0, 0.1])
p = softmax(logits)
print("softmax of", logits, "=", p, "sum =", round(p.sum(), 6))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">z       : [-3. -1.  0.  1.  3.]
sigmoid : [0.047 0.269 0.5   0.731 0.953]
tanh    : [-0.995 -0.762  0.     0.762  0.995]
relu    : [0. 0. 0. 1. 3.]
softmax of [2.  1.  0.1] = [0.659 0.242 0.099] sum = 1.0</code></pre>

<div class="callout warn"><strong>Common mistake:</strong> computing softmax as <code>np.exp(z) / np.exp(z).sum()</code> on large logits. <code>np.exp(1000)</code> overflows to <code>inf</code> and the result becomes <code>nan</code>. Subtracting the maximum first gives the same answer mathematically (the constant cancels in the division) and never overflows. PyTorch's built-in functions already do this for you.</div>

<h3>Why non-linearity matters</h3>
<p>Why not skip the activation and use <code>a = z</code>? Because a chain of linear functions is still a linear function. Suppose layer 1 computes <code>h = W1 x + b1</code> and layer 2 computes <code>y = W2 h + b2</code>. Substitute the first into the second:</p>
<p><code>y = W2 (W1 x + b1) + b2 = (W2 W1) x + (W2 b1 + b2) = W x + b</code></p>
<p>The two layers collapse into one layer with weight matrix <code>W = W2 W1</code>. A hundred linear layers are no more expressive than linear regression. They can only draw straight lines (flat planes in higher dimensions) as decision boundaries. A non-linear activation between layers stops this collapse. With it, every extra layer can bend and fold the input space, and the network can represent curved boundaries, interactions between features, and in theory any continuous function. That last claim is the <strong>universal approximation theorem</strong>: one hidden layer with enough non-linear neurons can approximate any continuous function as closely as you like. In practice, deeper networks with fewer neurons per layer learn far more efficiently than one very wide layer.</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

x = np.random.randn(4, 3)                     # 4 samples, 3 features
W1, b1 = np.random.randn(3, 5), np.random.randn(5)
W2, b2 = np.random.randn(5, 2), np.random.randn(2)

# two linear layers with no activation in between
two_layers = (x @ W1 + b1) @ W2 + b2

# one equivalent linear layer
W = W1 @ W2
b = b1 @ W2 + b2
one_layer = x @ W + b

print("identical results:", np.allclose(two_layers, one_layer))

# now insert a ReLU between the layers
with_relu = np.maximum(0, x @ W1 + b1) @ W2 + b2
print("still identical with ReLU?", np.allclose(with_relu, one_layer))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">identical results: True
still identical with ReLU? False</code></pre>
<p>(In code we write <code>x @ W</code> with samples as rows. This is the same maths as <code>W x</code> with the matrix transposed. The next lesson explains this convention.)</p>

<h3>Choosing activations in practice</h3>
<ul>
  <li><strong>Hidden layers:</strong> start with ReLU. Transformers use GELU or similar smooth variants. Use tanh when you specifically want outputs in (-1, 1).</li>
  <li><strong>Output layer, regression:</strong> no activation (identity), so the network can output any real number.</li>
  <li><strong>Output layer, binary classification:</strong> one neuron with sigmoid, giving P(class = 1).</li>
  <li><strong>Output layer, multi-class:</strong> K neurons with softmax, giving one probability per class.</li>
</ul>
<div class="callout tip"><strong>Tip:</strong> In PyTorch you usually do <em>not</em> put sigmoid or softmax on the final layer during training. The loss functions <code>nn.BCEWithLogitsLoss</code> and <code>nn.CrossEntropyLoss</code> take raw logits and apply the activation internally in a numerically stable way. You will see this in the PyTorch module.</div>
`,
          keyPoints: [
            "A neuron computes z = w · x + b and then applies a non-linear activation a = f(z).",
            "A neuron with a sigmoid activation is exactly logistic regression.",
            "ReLU is the default hidden activation; sigmoid and softmax are used for output probabilities.",
            "Softmax turns a vector of logits into a probability distribution; subtract the max for numerical stability.",
            "Without non-linear activations, any stack of layers collapses into a single linear layer."
          ],
          exercise: {
            prompt: String.raw`<p>Write a NumPy function <code>neuron(x, w, b, activation)</code>, where <code>activation</code> is one of <code>"sigmoid"</code>, <code>"tanh"</code> or <code>"relu"</code>. Use it to compute the output of a neuron with <code>w = [2.0, -1.0]</code>, <code>b = 0.5</code> for the inputs <code>[1, 1]</code>, <code>[0, 3]</code> and <code>[-2, 0]</code> with all three activations. Then explain which activation gives exactly 0 for one of the inputs, and why.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

def neuron(x, w, b, activation):
    z = np.dot(w, x) + b
    if activation == "sigmoid":
        return 1 / (1 + np.exp(-z))
    if activation == "tanh":
        return np.tanh(z)
    if activation == "relu":
        return max(0.0, z)
    raise ValueError("unknown activation")

w, b = np.array([2.0, -1.0]), 0.5
for x in ([1, 1], [0, 3], [-2, 0]):
    x = np.array(x, dtype=float)
    z = np.dot(w, x) + b
    outs = {act: round(float(neuron(x, w, b, act)), 3) for act in ("sigmoid", "tanh", "relu")}
    print(x, "z =", z, outs)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[1. 1.] z = 1.5 {'sigmoid': 0.818, 'tanh': 0.905, 'relu': 1.5}
[0. 3.] z = -2.5 {'sigmoid': 0.076, 'tanh': -0.987, 'relu': 0.0}
[-2.  0.] z = -3.5 {'sigmoid': 0.029, 'tanh': -0.998, 'relu': 0.0}</code></pre>
<p>For <code>[0, 3]</code>, <code>z = -2.5</code>, and for <code>[-2, 0]</code>, <code>z = -3.5</code>. Both are negative, so ReLU outputs exactly 0 for both, because it cuts off everything below zero. Sigmoid still gives a small positive value and tanh a negative one, because they never output exactly 0 for a non-zero input. If a ReLU neuron's <code>z</code> were negative for <em>every</em> training input, its output and gradient would always be 0: a "dead" neuron.</p>`
          },
          quiz: [
            { q: "What does the bias term let a neuron do?", options: ["Ignore some inputs", "Shift its pre-activation up or down regardless of the inputs", "Make the output a probability", "Prevent overfitting"], answer: 1, explain: "The bias is added to the weighted sum, so it moves the threshold at which the neuron activates. Ignoring inputs is done with near-zero weights, probabilities come from sigmoid or softmax, and overfitting is handled by regularization." },
            { q: "Why do neural networks need non-linear activation functions between layers?", options: ["To make training faster", "Without them, stacked linear layers collapse into a single linear layer", "To keep the weights positive", "To normalize the inputs"], answer: 1, explain: "W2(W1x + b1) + b2 equals Wx + b, a single linear map. Non-linearities are what let depth add expressive power." },
            { q: "Which activation is the usual default for hidden layers of modern deep networks?", options: ["Sigmoid", "Softmax", "ReLU (or smooth variants such as GELU)", "Identity"], answer: 2, explain: "ReLU is cheap and does not saturate for positive inputs, so gradients flow well. Sigmoid saturates, softmax is for output distributions, and the identity adds no non-linearity." },
            { q: "Softmax applied to logits [2.0, 1.0, 0.1] gives approximately:", options: ["[0.659, 0.242, 0.099]", "[2.0, 1.0, 0.1]", "[0.333, 0.333, 0.333]", "[1, 0, 0]"], answer: 0, explain: "Softmax exponentiates and normalizes, so the outputs are positive and sum to 1. The largest logit gets the largest share, but the others are not zero, unlike a hard argmax." }
          ]
        },
        {
          id: "dl-nn-forward",
          title: "Layers and the Forward Pass as Matrix Multiplication",
          minutes: 45,
          objectives: [
            "Organize neurons into layers and describe input, hidden and output layers",
            "Write the forward pass of a layer as X @ W + b and track every tensor shape",
            "Count the parameters of a fully connected network",
            "Implement a multi-layer forward pass for a batch of samples in NumPy"
          ],
          body: String.raw`
<p>One neuron can draw one straight boundary. Real tasks, such as recognizing a handwritten digit or judging the sentiment of a review, need many neurons working together. This lesson shows how neurons are grouped into <strong>layers</strong>, and why one layer's computation for a whole batch of samples is a single matrix multiplication. That fact is why neural networks run so well on GPUs.</p>

<h3>Layers: input, hidden, output</h3>
<p>A <strong>fully connected</strong> (or <strong>dense</strong>) layer is a group of neurons that all receive the same inputs. Each neuron has its own weights and bias. A typical network, called a <strong>multi-layer perceptron (MLP)</strong>, chains layers together:</p>
<ul>
  <li>The <strong>input layer</strong> is not really a layer of neurons. It is the feature vector itself, for example the 64 pixel values of an 8x8 image.</li>
  <li><strong>Hidden layers</strong> are the layers in between. They are "hidden" because we never see their target values. The network invents its own intermediate features there.</li>
  <li>The <strong>output layer</strong> produces the prediction: one number for regression, one probability for binary classification, or K logits for K classes.</li>
</ul>
<p>Each hidden layer re-describes the data in a new way. In a digit classifier, the first hidden layer might learn detectors for small strokes, the next might combine strokes into loops and corners, and the output layer combines those into "this looks like a 6". Nobody programs these features. They emerge because they help reduce the loss. This automatic <strong>representation learning</strong> is the key difference from classical ML, where you engineered features by hand.</p>

<figure><img src="assets/diagrams/dl-forward-backward.svg" alt="A 2-layer network: inputs x feed a hidden layer h = ReLU(xW1 + b1), which feeds the output p = softmax(hW2 + b2), then the loss L. Forward arrows go left to right; gradient arrows go right to left."><figcaption>The forward pass computes predictions and the loss from left to right; backpropagation (next lessons) sends gradients from right to left.</figcaption></figure>

<h3>From one neuron to a layer: a matrix multiplication</h3>
<p>Suppose a layer has 3 inputs and 4 neurons. Neuron j computes <code>z_j = x1*w1j + x2*w2j + x3*w3j + b_j</code>. If we put the weights in a matrix <code>W</code> with 3 rows (one per input) and 4 columns (one per neuron), all four sums become one vector-matrix product:</p>
<p><code>z = x @ W + b</code>, where <code>x</code> has shape (3,), <code>W</code> has shape (3, 4), <code>b</code> has shape (4,), and <code>z</code> has shape (4,).</p>
<p>Column j of <code>W</code> holds the weights of neuron j. The product works out the dot product of <code>x</code> with every column at once.</p>

<h4>Batches: many samples at once</h4>
<p>We rarely feed one sample at a time. We stack a <strong>batch</strong> of N samples as the rows of a matrix <code>X</code> of shape (N, 3). The same formula still works:</p>
<p><code>Z = X @ W + b</code>: (N, 3) @ (3, 4) gives (N, 4), and <code>b</code> of shape (4,) is <strong>broadcast</strong> (added to every row).</p>
<p>Each row of <code>Z</code> holds the 4 neuron pre-activations for one sample. We then apply the activation element-wise: <code>H = relu(Z)</code>. That is a whole layer for a whole batch in two lines. GPUs are built to do huge matrix multiplications in parallel, so this formulation lets a modern GPU process thousands of samples per layer in microseconds.</p>

<div class="callout info"><strong>Convention:</strong> Maths textbooks often write <code>z = W x + b</code>, with <code>W</code> of shape (out, in) and <code>x</code> as a column vector. Code (NumPy and PyTorch) puts samples in rows and writes <code>X @ W</code>, with <code>W</code> of shape (in, out). PyTorch's <code>nn.Linear</code> stores its weight as (out, in) and computes <code>X @ W.T + b</code> internally. Same maths, transposed layout. When shapes do not line up, check which convention you are using.</div>

<h3>The forward pass</h3>
<p>The <strong>forward pass</strong> runs the input through every layer in order. For a 2-layer network (one hidden layer plus the output layer) doing 3-class classification:</p>
<ol>
  <li><code>Z1 = X @ W1 + b1</code>: shape (N, H), where H is the hidden size</li>
  <li><code>A1 = relu(Z1)</code>: shape (N, H)</li>
  <li><code>Z2 = A1 @ W2 + b2</code>: shape (N, 3), the logits</li>
  <li><code>P = softmax(Z2)</code> along each row: shape (N, 3), class probabilities</li>
</ol>
<p>The rule that keeps shapes consistent: <strong>the inner dimensions of a matrix product must match</strong>. (N, <em>D</em>) @ (<em>D</em>, H) is valid and gives (N, H). If your input has 4 features but <code>W1</code> has 3 rows, you get a shape error. Shape errors are the most common bug in deep learning code, so get used to writing the expected shape as a comment next to each line.</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(42)

def relu(z):
    return np.maximum(0, z)

def softmax(z):
    z = z - z.max(axis=1, keepdims=True)      # row-wise stability trick
    e = np.exp(z)
    return e / e.sum(axis=1, keepdims=True)   # each row sums to 1

N, D, H, K = 5, 4, 8, 3          # batch size, input features, hidden units, classes
X = np.random.randn(N, D)

W1 = np.random.randn(D, H) * 0.1;  b1 = np.zeros(H)
W2 = np.random.randn(H, K) * 0.1;  b2 = np.zeros(K)

Z1 = X @ W1 + b1;   print("Z1", Z1.shape)
A1 = relu(Z1);      print("A1", A1.shape)
Z2 = A1 @ W2 + b2;  print("Z2 (logits)", Z2.shape)
P = softmax(Z2);    print("P (probabilities)", P.shape)

print("row sums:", P.sum(axis=1).round(6))
print("predicted classes:", P.argmax(axis=1))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Z1 (5, 8)
A1 (5, 8)
Z2 (logits) (5, 3)
P (probabilities) (5, 3)
row sums: [1. 1. 1. 1. 1.]
predicted classes: [0 1 0 0 0]</code></pre>
<p>The weights are random, so the predictions are meaningless. The probabilities are all close to 1/3 because tiny random weights give logits near zero. Training will change that. Note that <code>keepdims=True</code> keeps the row maxima and sums as shape (N, 1), so they broadcast correctly against the (N, K) matrix.</p>

<h3>Counting parameters</h3>
<p>A dense layer from <code>in</code> inputs to <code>out</code> neurons has <code>in * out</code> weights plus <code>out</code> biases. For the network above: layer 1 has 4*8 + 8 = 40 and layer 2 has 8*3 + 3 = 27, so 67 parameters in total. A digit classifier taking 64 pixels through hidden layers of 128 and 64 units to 10 classes has (64*128+128) + (128*64+64) + (64*10+10) = 8,320 + 8,256 + 650 = 17,226 parameters. Large language models follow the same arithmetic. Their layers are just huge (matrices of shape 4096 x 4096 and larger), and there are dozens of them.</p>

<pre><code class="lang-python runnable">def dense_params(sizes):
    total = 0
    for n_in, n_out in zip(sizes[:-1], sizes[1:]):
        layer = n_in * n_out + n_out
        print(f"{n_in:5d} -&gt; {n_out:5d}: {layer:,} parameters")
        total += layer
    return total

print("total:", f"{dense_params([64, 128, 64, 10]):,}")
print("one 4096x4096 layer:", f"{dense_params([4096, 4096]):,}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   64 -&gt;   128: 8,320 parameters
  128 -&gt;    64: 8,256 parameters
   64 -&gt;    10: 650 parameters
total: 17,226
 4096 -&gt;  4096: 16,781,312 parameters
one 4096x4096 layer: 16,781,312</code></pre>

<h3>Depth versus width</h3>
<p><strong>Width</strong> is the number of neurons in a layer. <strong>Depth</strong> is the number of layers. "Deep learning" simply means networks with many layers. Depth lets the network build features out of features, which is very efficient for structured data like images and language. Some functions need exponentially many neurons in a shallow network but only a modest number in a deeper one. Deeper networks are harder to train, though, because signals and gradients must pass through every layer. Tools like ReLU, careful weight initialization, normalization layers and residual connections (all of which appear later in this track) exist to make depth trainable.</p>

<div class="callout warn"><strong>Common mistake:</strong> forgetting the batch dimension. A model built for inputs of shape (N, 64) fails when you pass one sample of shape (64,). Reshape it to (1, 64) first, for example with <code>x.reshape(1, -1)</code> in NumPy or <code>x.unsqueeze(0)</code> in PyTorch.</div>

<h3>Initialization: why the weights start small and random</h3>
<p>If every weight started at 0, every neuron in a layer would compute the same thing and receive the same gradient, and they would stay identical forever. Random initialization breaks this <strong>symmetry</strong>. The scale also matters. Weights that are too large make activations grow layer after layer (and saturate sigmoids). Weights that are too small make them shrink towards zero. Standard schemes such as <strong>Xavier/Glorot</strong> (for tanh) and <strong>He/Kaiming</strong> (for ReLU) scale the random values by about <code>1/sqrt(fan_in)</code>, where fan_in is the number of inputs to the layer, so signal sizes stay stable through depth. PyTorch layers use a sensible scheme like this by default.</p>
`,
          keyPoints: [
            "A dense layer for a batch is Z = X @ W + b, with X (N, in), W (in, out), b (out,) and Z (N, out).",
            "The forward pass chains layer computations and activations from input to output.",
            "Inner dimensions of a matrix product must match; write shapes as comments to catch bugs early.",
            "A dense layer has in*out + out parameters; LLMs follow the same arithmetic at huge scale.",
            "Weights start small and random to break symmetry and keep signals at a stable size."
          ],
          exercise: {
            prompt: String.raw`<p>Build the forward pass of a 3-layer MLP for 10 samples with 6 features each, using hidden sizes 16 and 8, a ReLU after each hidden layer, and a single sigmoid output (binary classification). Initialize weights with <code>np.random.randn(n_in, n_out) * np.sqrt(2 / n_in)</code> (He initialization) and zero biases. Print the shape after every step, the total parameter count, and the 10 output probabilities.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
np.random.seed(1)

sizes = [6, 16, 8, 1]
params = []
for n_in, n_out in zip(sizes[:-1], sizes[1:]):
    W = np.random.randn(n_in, n_out) * np.sqrt(2 / n_in)
    b = np.zeros(n_out)
    params.append((W, b))

X = np.random.randn(10, 6)
a = X
for i, (W, b) in enumerate(params):
    z = a @ W + b
    is_last = i == len(params) - 1
    a = 1 / (1 + np.exp(-z)) if is_last else np.maximum(0, z)
    print(f"layer {i + 1}: {W.shape} -&gt; output {a.shape}")

print("parameters:", sum(W.size + b.size for W, b in params))
print("probabilities:", a.ravel().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">layer 1: (6, 16) -&gt; output (10, 16)
layer 2: (16, 8) -&gt; output (10, 8)
layer 3: (8, 1) -&gt; output (10, 1)
parameters: 257
probabilities: [0.275 0.306 0.37  0.416 0.663 0.437 0.183 0.134 0.279 0.479]</code></pre>
<p>The parameter count is (6*16+16) + (16*8+8) + (8*1+1) = 112 + 136 + 9 = 257. The loop shows that a network is just a list of (W, b) pairs applied in order, which is exactly what <code>nn.Sequential</code> does in PyTorch. Only the last layer uses sigmoid, so its output is a probability for each sample.</p>`
          },
          quiz: [
            { q: "A batch X has shape (32, 20) and a dense layer has W of shape (20, 50). What is the shape of X @ W + b?", options: ["(20, 50)", "(32, 50)", "(50, 32)", "(32, 20)"], answer: 1, explain: "The inner dimensions (20) match and cancel; the result has the batch size as rows and one column per neuron: (32, 50)." },
            { q: "How many parameters does a dense layer from 100 inputs to 10 outputs have?", options: ["100", "1,000", "1,010", "110"], answer: 2, explain: "100*10 = 1,000 weights plus 10 biases (one per output neuron) = 1,010." },
            { q: "Why are weights initialized randomly rather than all to zero?", options: ["Zero weights cause a division by zero", "Identical weights make all neurons in a layer compute and learn the same thing (symmetry)", "Random weights are always closer to the optimum", "It makes the forward pass faster"], answer: 1, explain: "With identical starting weights every neuron gets identical gradients and stays a copy of the others. Randomness breaks the symmetry so neurons can specialize." },
            { q: "What makes the matrix form of the forward pass so important in practice?", options: ["It removes the need for activation functions", "It lets hardware such as GPUs compute a whole layer for a whole batch in one highly parallel operation", "It reduces the number of parameters", "It guarantees convergence"], answer: 1, explain: "Matrix multiplication is massively parallel and heavily optimized on GPUs, which is what makes training large networks practical. It changes nothing about parameters or convergence." }
          ]
        },
        {
          id: "dl-nn-loss",
          title: "Loss Functions: MSE and Cross-Entropy",
          minutes: 40,
          objectives: [
            "Explain what a loss function measures and why training minimizes it",
            "Compute mean squared error for regression",
            "Compute binary and categorical cross-entropy and explain the role of the logarithm",
            "Choose the right loss and output activation for a task"
          ],
          body: String.raw`
<p>A forward pass produces predictions. To improve them, the network needs a single number that says how wrong it is. That number is the <strong>loss</strong> (also called the cost or objective). Training is the search for parameters that make the average loss over the training data as small as possible. The choice of loss defines what "good" means for your model, so it is one of the most important design decisions.</p>

<h3>What makes a good loss function?</h3>
<ul>
  <li>It is <strong>small when predictions are good</strong> and large when they are bad.</li>
  <li>It is <strong>differentiable</strong> with respect to the predictions (and so with respect to the weights). Gradient descent needs slopes. Accuracy is a poor training loss: it only changes when a prediction flips class, so its gradient is zero almost everywhere.</li>
  <li>It <strong>matches the task</strong>: squared distance for real-valued targets, likelihood-based losses for probabilities.</li>
</ul>

<h3>Mean squared error (MSE) for regression</h3>
<p>For regression the target <code>y</code> is a real number, such as a house price, and the network outputs <code>y_hat</code>. MSE averages the squared differences:</p>
<p><code>MSE = (1/N) * sum over i of (y_hat_i - y_i)^2</code></p>
<p>Squaring makes every error positive and punishes large errors much more than small ones. An error of 10 costs 100, while an error of 1 costs 1. The gradient for one prediction is <code>2 * (y_hat - y) / N</code>: it pushes the prediction towards the target, harder when the prediction is far away. Because big errors dominate, MSE is sensitive to outliers. <strong>Mean absolute error</strong> (MAE) or the <strong>Huber loss</strong> are more robust alternatives.</p>

<h3>Binary cross-entropy (BCE) for yes/no classification</h3>
<p>For binary classification the network outputs a probability <code>p = P(y = 1)</code> from a sigmoid. The loss for one example is:</p>
<p><code>BCE = -[ y * log(p) + (1 - y) * log(1 - p) ]</code></p>
<p>Only one of the two terms is active. If the true label is 1, the loss is <code>-log(p)</code>. If it is 0, the loss is <code>-log(1 - p)</code>. So the loss is "minus the log of the probability the model gave to the correct answer". Here is why the logarithm matters:</p>
<table>
  <thead><tr><th>Probability given to the correct class</th><th>Loss = -log(p)</th></tr></thead>
  <tbody>
    <tr><td>0.99 (confident and right)</td><td>0.010</td></tr>
    <tr><td>0.90</td><td>0.105</td></tr>
    <tr><td>0.50 (coin flip)</td><td>0.693</td></tr>
    <tr><td>0.10</td><td>2.303</td></tr>
    <tr><td>0.01 (confident and wrong)</td><td>4.605</td></tr>
  </tbody>
</table>
<p>The penalty grows without limit as a model becomes confidently wrong. The model therefore learns to be confident only when it has good reason. Cross-entropy also has a statistical meaning. Minimizing it is the same as <strong>maximum likelihood estimation</strong>: finding the parameters under which the observed labels are most probable. You met likelihood in the probability lessons. The loss is the negative log-likelihood, averaged over the data.</p>

<h3>Categorical cross-entropy for multi-class problems</h3>
<p>With K classes, the network outputs K logits, and softmax turns them into probabilities <code>p_1 ... p_K</code>. The true label is written as a <strong>one-hot</strong> vector: all zeros except a 1 at the correct class. Cross-entropy is:</p>
<p><code>CE = - sum over k of y_k * log(p_k) = -log(p_correct)</code></p>
<p>Again, only the probability of the correct class counts. Pushing it up automatically pushes the others down, because softmax outputs always sum to 1. This one formula trains image classifiers with 1,000 classes and language models choosing among 100,000 possible next tokens. An LLM's pretraining loss is exactly this categorical cross-entropy on the next token, averaged over billions of positions.</p>

<pre><code class="lang-python runnable">import numpy as np

# ---- MSE for regression
y_true = np.array([3.0, -0.5, 2.0, 7.0])
y_pred = np.array([2.5, 0.0, 2.0, 8.0])
mse = np.mean((y_pred - y_true) ** 2)
print(f"MSE = {mse:.4f}")

# ---- binary cross-entropy
def bce(y, p, eps=1e-12):
    p = np.clip(p, eps, 1 - eps)          # avoid log(0)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

y = np.array([1, 0, 1, 1])
good = np.array([0.9, 0.1, 0.8, 0.95])
bad = np.array([0.2, 0.9, 0.3, 0.1])
print(f"BCE good model = {bce(y, good):.4f}")
print(f"BCE bad model  = {bce(y, bad):.4f}")

# ---- categorical cross-entropy from logits
def softmax(z):
    z = z - z.max(axis=1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=1, keepdims=True)

logits = np.array([[2.0, 0.5, -1.0],    # sample 0: true class 0
                   [0.1, 0.2, 3.0]])    # sample 1: true class 2
labels = np.array([0, 2])
P = softmax(logits)
ce = -np.mean(np.log(P[np.arange(len(labels)), labels]))
print("probabilities of the true classes:", P[np.arange(2), labels].round(3))
print(f"cross-entropy = {ce:.4f}")
print(f"loss of uniform guessing over 3 classes = {np.log(3):.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">MSE = 0.3750
BCE good model = 0.1213
BCE bad model  = 1.8546
probabilities of the true classes: [0.786 0.896]
cross-entropy = 0.1755
loss of uniform guessing over 3 classes = 1.0986</code></pre>
<p>A useful reference point: a model that guesses uniformly over K classes has cross-entropy <code>log(K)</code>. For 3 classes that is 1.0986, and for 10 classes 2.3026. If your training loss starts near <code>log(K)</code>, your initialization is healthy. If it stays there, the model is learning nothing.</p>

<h3>A neat result: the gradient of softmax plus cross-entropy</h3>
<p>Working through the chain rule for softmax followed by cross-entropy gives a remarkably simple gradient with respect to the logits:</p>
<p><code>dLoss/dlogits = p - y_onehot</code></p>
<p>Take the predicted probabilities and subtract 1 at the correct class. If the model gave the correct class probability 0.7, its logit gets gradient -0.3, so gradient descent raises it. Every wrong class with probability q gets gradient +q, so it is lowered. Sigmoid plus binary cross-entropy gives the same pattern: <code>p - y</code>. You will use this result directly when writing backpropagation in NumPy, and it is part of why these pairings are standard.</p>

<pre><code class="lang-python runnable">import numpy as np

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

def ce_loss(z, label):
    return -np.log(softmax(z)[label])

z = np.array([2.0, 0.5, -1.0])
label = 0
analytic = softmax(z) - np.eye(3)[label]          # p - y

# numerical gradient: nudge each logit a tiny bit and watch the loss
h = 1e-5
numeric = np.zeros(3)
for k in range(3):
    dz = np.zeros(3); dz[k] = h
    numeric[k] = (ce_loss(z + dz, label) - ce_loss(z - dz, label)) / (2 * h)

print("analytic p - y :", analytic.round(5))
print("numerical grad :", numeric.round(5))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">analytic p - y : [-0.2144   0.17529  0.03911]
numerical grad : [-0.2144   0.17529  0.03911]</code></pre>
<p>The two match. This trick, called <strong>gradient checking</strong>, compares a hand-derived gradient with the finite-difference estimate <code>(L(z+h) - L(z-h)) / 2h</code>. It is the standard way to test backpropagation code.</p>

<h3>Choosing the loss: a cheat sheet</h3>
<table>
  <thead><tr><th>Task</th><th>Output layer</th><th>Loss</th><th>PyTorch</th></tr></thead>
  <tbody>
    <tr><td>Regression</td><td>Linear (no activation)</td><td>MSE (or MAE / Huber)</td><td>nn.MSELoss, nn.L1Loss, nn.HuberLoss</td></tr>
    <tr><td>Binary classification</td><td>1 logit (sigmoid applied inside the loss)</td><td>Binary cross-entropy</td><td>nn.BCEWithLogitsLoss</td></tr>
    <tr><td>Multi-class (one label)</td><td>K logits (softmax applied inside the loss)</td><td>Categorical cross-entropy</td><td>nn.CrossEntropyLoss</td></tr>
    <tr><td>Multi-label (several labels can be true)</td><td>K logits, independent sigmoids</td><td>BCE per label</td><td>nn.BCEWithLogitsLoss</td></tr>
  </tbody>
</table>
<div class="callout warn"><strong>Common mistake:</strong> applying softmax in your model and then passing the probabilities to <code>nn.CrossEntropyLoss</code>. That loss expects <em>raw logits</em> and applies log-softmax itself. Applying softmax twice still runs without errors, but the network trains slowly and badly. The same applies to <code>nn.BCEWithLogitsLoss</code>: pass logits, not sigmoid outputs.</div>
<div class="callout tip"><strong>Tip:</strong> The training loss is what you optimize. It need not be the metric you report. You might train with cross-entropy and report accuracy, F1 or AUC (from the evaluation lessons in the classical ML track). Always track both.</div>
`,
          keyPoints: [
            "The loss is one differentiable number measuring how wrong the predictions are; training minimizes it.",
            "MSE suits regression and punishes large errors quadratically.",
            "Cross-entropy equals -log(probability of the correct class); it punishes confident mistakes severely.",
            "Minimizing cross-entropy is maximum likelihood estimation; LLM pretraining uses it on the next token.",
            "The gradient of softmax plus cross-entropy with respect to the logits is simply p - y."
          ],
          exercise: {
            prompt: String.raw`<p>A 4-class model outputs these logits for three samples: <code>[[1, 2, 0.5, 0], [3, 0, 0, 0], [0, 0, 0, 0]]</code>, with true labels <code>[1, 0, 3]</code>. (a) Compute the per-sample cross-entropy and the mean. (b) Which sample has the largest loss, and why? (c) Compare the third sample's loss with <code>log(4)</code> and explain the match.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

logits = np.array([[1, 2, 0.5, 0], [3, 0, 0, 0], [0, 0, 0, 0]], dtype=float)
labels = np.array([1, 0, 3])

z = logits - logits.max(axis=1, keepdims=True)
P = np.exp(z) / np.exp(z).sum(axis=1, keepdims=True)
per_sample = -np.log(P[np.arange(3), labels])
print("p(correct):", P[np.arange(3), labels].round(3))
print("per-sample loss:", per_sample.round(4))
print("mean loss:", per_sample.mean().round(4))
print("log(4) =", round(np.log(4), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">p(correct): [0.579 0.87  0.25 ]
per-sample loss: [0.546  0.1392 1.3863]
mean loss: 0.6905
log(4) = 1.3863</code></pre>
<p>(b) The third sample has the largest loss. Its logits are all equal, so the model gives the correct class only 0.25. The second sample has the lowest loss because the correct class has by far the largest logit. (c) Equal logits produce a uniform distribution, so the loss is <code>-log(1/4) = log(4)</code>, the "knows nothing" baseline.</p>`
          },
          quiz: [
            { q: "Why is accuracy not used directly as the training loss for neural networks?", options: ["It is too slow to compute", "It is piecewise constant, so its gradient is zero almost everywhere", "It can be larger than 1", "It only works for regression"], answer: 1, explain: "Accuracy only changes when a prediction flips class, so small weight changes leave it unchanged and gradient descent gets no signal. Cross-entropy changes smoothly with the probabilities." },
            { q: "A classifier gives the correct class probability 0.01. Roughly what is its cross-entropy loss for that example?", options: ["0.01", "0.99", "4.6", "100"], answer: 2, explain: "-log(0.01) = 4.6. Confident mistakes are punished heavily, compared with about 0.01 when the model gives 0.99 to the correct class." },
            { q: "What should you pass to nn.CrossEntropyLoss?", options: ["Softmax probabilities and one-hot labels", "Raw logits and integer class labels", "Sigmoid outputs and float labels", "Argmax predictions and labels"], answer: 1, explain: "nn.CrossEntropyLoss applies log-softmax internally and expects raw logits plus integer class indices. Passing probabilities applies softmax twice." },
            { q: "The gradient of (softmax + cross-entropy) with respect to the logits is:", options: ["y - p", "p - y", "p * (1 - p)", "log(p)"], answer: 1, explain: "It is p minus the one-hot target. Gradient descent subtracts it, so the correct class logit rises and the others fall in proportion to their probabilities." }
          ]
        },
        {
          id: "dl-nn-backprop",
          title: "Backpropagation via the Chain Rule",
          minutes: 55,
          objectives: [
            "Represent a network as a computational graph of simple operations",
            "Apply the chain rule to compute gradients by hand for a single neuron",
            "Derive the backward pass of a 2-layer network in matrix form",
            "Verify backpropagation with numerical gradient checking"
          ],
          body: String.raw`
<p>We now have a network that makes predictions and a loss that scores them. To improve the network we need, for <em>every</em> parameter, the answer to one question: "if I nudge this weight up a little, does the loss go up or down, and by how much?" That is the partial derivative <code>dL/dw</code>, and the list of all of them is the <strong>gradient</strong>. <strong>Backpropagation</strong> (backprop) is the algorithm that computes all these derivatives efficiently, in one backward sweep through the network. It costs only about as much as one forward pass. Without it, training networks with millions or billions of parameters would be impossible.</p>

<h3>The chain rule, intuitively</h3>
<p>The chain rule from calculus says that the rates of change of composed functions multiply. If <code>y = f(u)</code> and <code>u = g(x)</code>, then <code>dy/dx = dy/du * du/dx</code>.</p>
<p>An everyday example: you drive at 60 km per hour, and your car burns 0.07 litres per km. How fast are you burning fuel per hour? 60 * 0.07 = 4.2 litres per hour. Multiply the rates along the chain. A neural network is a long chain of simple steps from weight to loss: weight, then weighted sum, then activation, then the next layer, then the loss. The derivative of the loss with respect to a weight is the product of the local derivatives along that chain.</p>

<h3>Computational graphs</h3>
<p>Picture the computation as a graph. Each node is a simple operation (multiply, add, ReLU, log), and data flows forward along the edges. For one neuron with sigmoid and BCE loss:</p>
<p><code>z = w*x + b</code>, then <code>p = sigmoid(z)</code>, then <code>L = -[y*log(p) + (1-y)*log(1-p)]</code></p>
<p>Each node only needs to know its own <strong>local derivative</strong>:</p>
<ul>
  <li><code>dL/dp = -(y/p) + (1-y)/(1-p)</code></li>
  <li><code>dp/dz = p * (1 - p)</code> (the derivative of sigmoid)</li>
  <li><code>dz/dw = x</code>, and <code>dz/db = 1</code></li>
</ul>
<p>Chain them: <code>dL/dw = dL/dp * dp/dz * dz/dw</code>. Multiplying the first two terms and simplifying gives <code>dL/dz = p - y</code>, the same neat result as in the previous lesson. So <code>dL/dw = (p - y) * x</code> and <code>dL/db = p - y</code>.</p>

<h4>Numbers you can follow</h4>
<p>Let <code>x = 2</code>, <code>w = 0.5</code>, <code>b = -0.5</code>, true label <code>y = 1</code>.</p>
<ul>
  <li>Forward: <code>z = 0.5*2 - 0.5 = 0.5</code>; <code>p = sigmoid(0.5) = 0.6225</code>; <code>L = -log(0.6225) = 0.4741</code>.</li>
  <li>Backward: <code>dL/dz = p - y = -0.3775</code>; <code>dL/dw = -0.3775 * 2 = -0.7551</code>; <code>dL/db = -0.3775</code>.</li>
  <li>The gradients are negative, so increasing <code>w</code> and <code>b</code> lowers the loss. Gradient descent with learning rate 0.1 updates <code>w</code> to 0.5 - 0.1*(-0.7551) = 0.5755. The new <code>p</code> is higher, which is what we want for a true label of 1.</li>
</ul>

<pre><code class="lang-python runnable">import numpy as np

x, y = 2.0, 1.0
w, b = 0.5, -0.5

def forward(w, b):
    z = w * x + b
    p = 1 / (1 + np.exp(-z))
    L = -(y * np.log(p) + (1 - y) * np.log(1 - p))
    return z, p, L

z, p, L = forward(w, b)
print(f"forward : z={z:.4f}  p={p:.4f}  loss={L:.4f}")

dz = p - y          # dL/dz
dw = dz * x         # dL/dw = dL/dz * dz/dw
db = dz * 1.0       # dL/db
print(f"backward: dL/dz={dz:.4f}  dL/dw={dw:.4f}  dL/db={db:.4f}")

lr = 0.1
w, b = w - lr * dw, b - lr * db
print(f"after one step: w={w:.4f} b={b:.4f} loss={forward(w, b)[2]:.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">forward : z=0.5000  p=0.6225  loss=0.4741
backward: dL/dz=-0.3775  dL/dw=-0.7551  dL/db=-0.3775
after one step: w=0.5755 b=-0.4622 loss=0.4069</code></pre>

<h3>Why "back" propagation?</h3>
<p>In a deep network, the chain for an early-layer weight passes through every later layer. Computing each weight's chain separately would repeat the same products over and over. Backprop avoids this by working backwards from the loss and storing <strong>upstream gradients</strong>. Once we know <code>dL/dA1</code> (how the loss depends on a hidden layer's output), every weight feeding that layer can reuse it. Each node receives the gradient of the loss with respect to its output, multiplies by its local derivative, and passes the result to its inputs. This is an application of dynamic programming, and it is why the backward pass costs only about twice as much as the forward pass.</p>
<p>The procedure is always:</p>
<ol>
  <li><strong>Forward pass:</strong> compute and <em>cache</em> every intermediate value (Z1, A1, Z2, P). The backward pass needs them.</li>
  <li><strong>Backward pass:</strong> start from <code>dL/dL = 1</code> and walk the graph in reverse, applying the chain rule at every node.</li>
  <li><strong>Update:</strong> use the gradients to change the parameters (next lesson).</li>
</ol>

<h3>Backprop for a 2-layer network in matrix form</h3>
<p>Forward (N samples, softmax output):</p>
<ul>
  <li><code>Z1 = X @ W1 + b1</code>, <code>A1 = relu(Z1)</code></li>
  <li><code>Z2 = A1 @ W2 + b2</code>, <code>P = softmax(Z2)</code>, <code>L = mean cross-entropy</code></li>
</ul>
<p>Backward. Each gradient has the <em>same shape</em> as the thing it is the gradient of:</p>
<ol>
  <li><code>dZ2 = (P - Y_onehot) / N</code>: shape (N, K). The /N comes from averaging the loss over the batch.</li>
  <li><code>dW2 = A1.T @ dZ2</code>: shape (H, K), the same as W2. Each weight's gradient sums "input activation times output gradient" over the batch.</li>
  <li><code>db2 = dZ2.sum(axis=0)</code>: shape (K,). The bias gets the summed gradient.</li>
  <li><code>dA1 = dZ2 @ W2.T</code>: shape (N, H). The gradient flows back through the weights.</li>
  <li><code>dZ1 = dA1 * (Z1 &gt; 0)</code>: the ReLU derivative is 1 where the input was positive and 0 elsewhere, so the gradient only passes through active neurons.</li>
  <li><code>dW1 = X.T @ dZ1</code> and <code>db1 = dZ1.sum(axis=0)</code>.</li>
</ol>
<p>A rule of thumb that saves hours: <strong>if a forward step is <code>Out = In @ W</code>, then <code>dW = In.T @ dOut</code> and <code>dIn = dOut @ W.T</code></strong>. You can rebuild these by asking "which transposes make the shapes match?"</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

N, D, H, K = 6, 4, 5, 3
X = np.random.randn(N, D)
labels = np.random.randint(0, K, size=N)
Y = np.eye(K)[labels]                          # one-hot (N, K)
params = {"W1": np.random.randn(D, H) * 0.5, "b1": np.zeros(H),
          "W2": np.random.randn(H, K) * 0.5, "b2": np.zeros(K)}

def loss_fn(p):
    Z1 = X @ p["W1"] + p["b1"]; A1 = np.maximum(0, Z1)
    Z2 = A1 @ p["W2"] + p["b2"]
    Z2 = Z2 - Z2.max(axis=1, keepdims=True)
    P = np.exp(Z2) / np.exp(Z2).sum(axis=1, keepdims=True)
    return -np.mean(np.log(P[np.arange(N), labels])), (Z1, A1, P)

def backprop(p):
    _, (Z1, A1, P) = loss_fn(p)
    dZ2 = (P - Y) / N
    g = {"W2": A1.T @ dZ2, "b2": dZ2.sum(axis=0)}
    dA1 = dZ2 @ p["W2"].T
    dZ1 = dA1 * (Z1 &gt; 0)
    g["W1"] = X.T @ dZ1
    g["b1"] = dZ1.sum(axis=0)
    return g

# gradient check: compare with finite differences for every parameter
grads = backprop(params)
h = 1e-6
for name in params:
    num = np.zeros_like(params[name])
    it = np.nditer(params[name], flags=["multi_index"])
    for _ in it:
        idx = it.multi_index
        old = params[name][idx]
        params[name][idx] = old + h; lp = loss_fn(params)[0]
        params[name][idx] = old - h; lm = loss_fn(params)[0]
        params[name][idx] = old
        num[idx] = (lp - lm) / (2 * h)
    rel = np.abs(num - grads[name]).max() / (np.abs(num).max() + 1e-12)
    print(f"{name}: shape {grads[name].shape}, max relative error {rel:.2e}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">W1: shape (4, 5), max relative error 5.78e-10
b1: shape (5,), max relative error 4.73e-10
W2: shape (5, 3), max relative error 2.37e-10
b2: shape (3,), max relative error 4.96e-11</code></pre>
<p>Relative errors around 1e-7 or smaller mean the analytic gradients are correct. Errors around 1e-2 or larger mean there is a bug. Typical culprits are a missing transpose, a forgotten <code>/N</code>, or a wrong activation derivative.</p>

<h3>Vanishing and exploding gradients</h3>
<p>Backprop multiplies local derivatives along the chain. The largest slope of sigmoid is 0.25, so a gradient passing through 10 sigmoid layers can shrink by a factor of 0.25^10, about one in a million. The early layers then barely learn: the gradients have <strong>vanished</strong>. If the local factors are larger than 1 (for example, large weights), gradients can instead grow exponentially and <strong>explode</strong>, giving <code>nan</code> losses. Modern practice handles this with ReLU-family activations, careful initialization, normalization layers (BatchNorm, LayerNorm), residual (skip) connections that give gradients a direct path backwards, and gradient clipping. All of these appear in the transformer block later in this track.</p>

<div class="callout info"><strong>Good news:</strong> you will almost never write backprop by hand again. PyTorch's <strong>autograd</strong> records the computational graph during the forward pass and runs exactly this backward algorithm when you call <code>loss.backward()</code>. Doing it once by hand means you know what that line does, and you can debug it when gradients misbehave.</div>
`,
          keyPoints: [
            "Backpropagation computes dLoss/dparameter for every parameter using the chain rule, in one backward sweep.",
            "Each operation only needs its local derivative; upstream gradients are multiplied by it and passed back.",
            "Cache forward-pass values: the backward pass needs them.",
            "For Out = In @ W: dW = In.T @ dOut and dIn = dOut @ W.T; gradients have the same shape as their parameters.",
            "Check hand-written gradients against finite differences; deep chains can make gradients vanish or explode."
          ],
          exercise: {
            prompt: String.raw`<p>For a single linear neuron with MSE loss, <code>y_hat = w*x + b</code> and <code>L = (y_hat - y)^2</code>, derive <code>dL/dw</code> and <code>dL/db</code> by the chain rule. Then evaluate them at <code>x = 3, y = 10, w = 2, b = 1</code>, check them numerically, and do 3 gradient-descent steps with learning rate 0.02, printing the loss each time.</p>`,
            solution: String.raw`<p>By the chain rule, <code>dL/dy_hat = 2(y_hat - y)</code>, <code>dy_hat/dw = x</code> and <code>dy_hat/db = 1</code>. So <code>dL/dw = 2(y_hat - y) * x</code> and <code>dL/db = 2(y_hat - y)</code>. At the given point, <code>y_hat = 7</code>, so <code>dL/dw = 2*(-3)*3 = -18</code> and <code>dL/db = -6</code>.</p>
<pre><code class="lang-python runnable">x, y = 3.0, 10.0
w, b = 2.0, 1.0

def loss(w, b):
    return (w * x + b - y) ** 2

def grads(w, b):
    err = w * x + b - y
    return 2 * err * x, 2 * err

dw, db = grads(w, b)
h = 1e-6
num_dw = (loss(w + h, b) - loss(w - h, b)) / (2 * h)
num_db = (loss(w, b + h) - loss(w, b - h)) / (2 * h)
print(f"analytic dw={dw:.4f} db={db:.4f} | numeric dw={num_dw:.4f} db={num_db:.4f}")

lr = 0.02
for step in range(1, 4):
    dw, db = grads(w, b)
    w, b = w - lr * dw, b - lr * db
    print(f"step {step}: w={w:.4f} b={b:.4f} loss={loss(w, b):.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">analytic dw=-18.0000 db=-6.0000 | numeric dw=-18.0000 db=-6.0000
step 1: w=2.3600 b=1.1200 loss=3.2400
step 2: w=2.5760 b=1.1920 loss=1.1664
step 3: w=2.7056 b=1.2352 loss=0.4199</code></pre>
<p>The loss falls quickly towards 0 because each step moves w and b against the gradient. The gradient with respect to w is three times larger than the one for b because it is multiplied by the input x = 3.</p>`
          },
          quiz: [
            { q: "What does backpropagation compute?", options: ["The optimal learning rate", "The gradient of the loss with respect to every parameter", "The forward-pass predictions", "The best network architecture"], answer: 1, explain: "Backprop applies the chain rule backwards through the computational graph to get dLoss/dparameter for all parameters. An optimizer then uses these gradients to update the weights." },
            { q: "If a forward step is Out = In @ W, what is the gradient with respect to W?", options: ["dOut @ W.T", "In.T @ dOut", "In @ dOut", "W.T @ In"], answer: 1, explain: "dW = In.T @ dOut. It has the same shape as W: (in, N) @ (N, out) gives (in, out). dOut @ W.T is the gradient passed back to the input." },
            { q: "What is the derivative of ReLU used in the backward pass?", options: ["Always 1", "p * (1 - p)", "1 where the input was positive, 0 otherwise", "1 - tanh^2"], answer: 2, explain: "ReLU is the identity for positive inputs (slope 1) and constant 0 for negative inputs (slope 0), so gradients only pass through neurons that were active." },
            { q: "Why do deep stacks of sigmoid layers suffer from vanishing gradients?", options: ["Sigmoid is not differentiable", "The sigmoid derivative is at most 0.25, and backprop multiplies many such factors", "Sigmoid outputs are negative", "Sigmoid has too many parameters"], answer: 1, explain: "Gradients are products of local derivatives. Many factors of 0.25 or less shrink the signal exponentially, so the early layers barely learn." }
          ]
        },
        {
          id: "dl-nn-optimizers",
          title: "Gradient Descent Variants: SGD, Mini-batch, Momentum and Adam",
          minutes: 45,
          objectives: [
            "Explain batch, stochastic and mini-batch gradient descent and the meaning of an epoch",
            "Describe the effect of a learning rate that is too small or too large",
            "Explain how momentum and Adam improve on plain gradient descent",
            "Implement SGD, momentum and Adam updates in NumPy and compare them"
          ],
          body: String.raw`
<p>Backpropagation tells us which direction is downhill for every parameter. The <strong>optimizer</strong> decides how to step in that direction. You already know the basic rule from the math track: <code>w = w - lr * dL/dw</code>, where <code>lr</code> is the <strong>learning rate</strong>. Deep learning adds two practical questions. How much data should we use to estimate each gradient? And can we step more cleverly than "a fixed fraction of the gradient"? The answers give us mini-batch SGD, momentum and Adam, which train virtually every network in use today.</p>

<h3>How much data per step: batch, stochastic, mini-batch</h3>
<ul>
  <li><strong>Batch (full) gradient descent:</strong> compute the gradient on the entire training set, then take one step. The gradient is exact, but one step costs a full pass over the data. That is impossible for millions of images or billions of tokens.</li>
  <li><strong>Stochastic gradient descent (SGD), strictly:</strong> compute the gradient on <em>one</em> random example and step. This is cheap but very noisy, and processing one example at a time wastes the parallel hardware.</li>
  <li><strong>Mini-batch gradient descent:</strong> compute the gradient on a small random batch (commonly 32 to 512 examples) and step. The average over a batch is a good, cheap estimate of the true gradient, and a batch maps perfectly onto GPU matrix operations. This is what everyone uses. Confusingly, it is still usually called "SGD".</li>
</ul>
<p>An <strong>epoch</strong> is one full pass over the training set. With 1,600 examples and batch size 32, one epoch is 50 steps (also called iterations). Shuffle the data every epoch so the batches differ each time.</p>
<p>The noise in mini-batch gradients is not only a cost. It shakes the parameters out of sharp, narrow minima and tends to find flatter solutions that generalize better. Smaller batches give more noise and more updates per epoch. Larger batches give smoother gradients and better hardware use, but often need a larger learning rate.</p>

<h3>The learning rate: the most important hyperparameter</h3>
<p>Picture walking downhill in fog with a fixed stride length.</p>
<ul>
  <li><strong>Too small:</strong> every step is safe but tiny, and you need forever to reach the valley floor. The loss falls painfully slowly.</li>
  <li><strong>Too large:</strong> you overshoot the valley and land higher on the opposite slope. The loss bounces around, or grows and becomes <code>nan</code> (divergence).</li>
  <li><strong>About right:</strong> the loss falls quickly and smoothly, then levels off.</li>
</ul>
<p>Typical starting points are 0.1 to 0.01 for SGD with momentum and 1e-3 (0.001) for Adam. In practice we often use a <strong>learning-rate schedule</strong>. We start with a short <em>warm-up</em> (increasing the rate from near 0) and then <em>decay</em> it (step decay, or cosine decay towards 0), so training makes fast progress early and settles precisely at the end. LLM training uses warm-up followed by cosine decay.</p>

<pre><code class="lang-python runnable">import numpy as np

# minimize f(w) = (w - 3)^2 starting at w = 0; the gradient is 2(w - 3)
def run(lr, steps=8):
    w, path = 0.0, []
    for _ in range(steps):
        w = w - lr * 2 * (w - 3)
        path.append(round(w, 3))
    return path

for lr in (0.01, 0.1, 0.5, 0.9, 1.1):
    print(f"lr={lr:&lt;4}: {run(lr)}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">lr=0.01: [0.06, 0.119, 0.176, 0.233, 0.288, 0.342, 0.396, 0.448]
lr=0.1 : [0.6, 1.08, 1.464, 1.771, 2.017, 2.214, 2.371, 2.497]
lr=0.5 : [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0]
lr=0.9 : [5.4, 1.08, 4.536, 1.771, 3.983, 2.214, 3.629, 2.497]
lr=1.1 : [6.6, -1.32, 8.184, -3.221, 10.465, -5.958, 13.75, -9.899]</code></pre>
<p>With lr=0.01 the parameter has barely moved after 8 steps. With 0.1 it moves steadily towards 3. With 0.5 it lands exactly on the minimum in one step (this happens only for this simple function). With 0.9 it overshoots back and forth but still converges. With 1.1 each overshoot is bigger than the last, and the parameter runs away.</p>

<h3>Momentum: a heavy ball rolling downhill</h3>
<p>Plain gradient descent has a well-known weakness. In a long, narrow valley, which is common in neural-network loss surfaces, the gradient points mostly across the valley rather than along it. The parameters zig-zag from wall to wall and make slow progress down the valley. <strong>Momentum</strong> fixes this by keeping a running "velocity" that accumulates past gradients:</p>
<p><code>v = beta * v + grad</code><br><code>w = w - lr * v</code></p>
<p>with <code>beta</code> typically 0.9. Components that keep pointing the same way (along the valley) add up and speed up. Components that flip sign every step (across the valley) cancel out. It is like a heavy ball that builds up speed going downhill and is not knocked about by every small bump.</p>

<h3>Adam: an adaptive learning rate per parameter</h3>
<p>Different parameters can need very different step sizes. Weights for rare features get small, infrequent gradients. Others get large ones all the time. <strong>Adam</strong> (Adaptive Moment Estimation) keeps two running averages for <em>each parameter</em>:</p>
<ul>
  <li><code>m = beta1 * m + (1 - beta1) * grad</code>: the average gradient (momentum), with beta1 = 0.9.</li>
  <li><code>v = beta2 * v + (1 - beta2) * grad^2</code>: the average <em>squared</em> gradient, a measure of how large this parameter's gradients usually are, with beta2 = 0.999.</li>
  <li>Both start at 0, so early on they are biased towards 0. Adam corrects this: <code>m_hat = m / (1 - beta1^t)</code>, <code>v_hat = v / (1 - beta2^t)</code>, where t is the step number.</li>
  <li>Update: <code>w = w - lr * m_hat / (sqrt(v_hat) + eps)</code>.</li>
</ul>
<p>Dividing by <code>sqrt(v_hat)</code> normalizes each parameter's step. Parameters with large gradients take moderated steps, and parameters with tiny gradients get boosted. Each step's size is roughly <code>lr</code> whatever the raw gradient scale, which makes Adam forgiving and fast with almost no tuning. <strong>AdamW</strong> is Adam with "decoupled weight decay" (a regularization covered in the PyTorch module). It is the standard optimizer for transformers and LLMs.</p>

<pre><code class="lang-python runnable">import numpy as np

# A long narrow valley: f(x, y) = 0.05*x^2 + 10*y^2, minimum at (0, 0)
# curvature 0.1 along x (shallow) and 20 along y (steep)
def grad(p):
    return np.array([0.1 * p[0], 20.0 * p[1]])
def f(p):
    return 0.05 * p[0] ** 2 + 10 * p[1] ** 2

def sgd(p, steps=100, lr=0.09):
    for _ in range(steps):
        p = p - lr * grad(p)
    return p

def momentum(p, steps=100, lr=0.03, beta=0.9):
    v = np.zeros_like(p)
    for _ in range(steps):
        v = beta * v + grad(p)
        p = p - lr * v
    return p

def adam(p, steps=100, lr=0.3, b1=0.9, b2=0.999, eps=1e-8):
    m = np.zeros_like(p); v = np.zeros_like(p)
    for t in range(1, steps + 1):
        g = grad(p)
        m = b1 * m + (1 - b1) * g
        v = b2 * v + (1 - b2) * g ** 2
        m_hat = m / (1 - b1 ** t); v_hat = v / (1 - b2 ** t)
        p = p - lr * m_hat / (np.sqrt(v_hat) + eps)
    return p

start = np.array([10.0, 1.0])
print(f"start     f = {f(start):.6f}")
for name, opt in [("SGD", sgd), ("Momentum", momentum), ("Adam", adam)]:
    p = opt(start.copy())
    print(f"{name:9s} f = {f(p):.6f}   final point {p.round(4)}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">start     f = 15.000000
SGD       f = 0.819787   final point [4.0492 0.    ]
Momentum  f = 0.000820   final point [0.1039 0.0053]
Adam      f = 0.000159   final point [ 0.0513 -0.0016]</code></pre>
<p>Plain SGD cannot use a learning rate above 0.1 here, because the steep y-direction (curvature 20) would diverge. At that rate the shallow x-direction (curvature 0.1) shrinks by only 1% per step, so after 100 steps x is still far from 0. Momentum and Adam both reach a far lower loss in the same 100 steps. Momentum builds speed along the shallow direction. Adam rescales each coordinate by its own gradient size.</p>

<h3>Which optimizer should you use?</h3>
<table>
  <thead><tr><th>Optimizer</th><th>Strengths</th><th>Typical settings</th></tr></thead>
  <tbody>
    <tr><td>SGD + momentum</td><td>Simple, memory-light, often generalizes very well for CNNs when tuned</td><td>lr 0.01 to 0.1, momentum 0.9, plus a schedule</td></tr>
    <tr><td>Adam</td><td>Fast, robust default, little tuning</td><td>lr 1e-3, betas (0.9, 0.999)</td></tr>
    <tr><td>AdamW</td><td>Adam with correct weight decay; standard for transformers</td><td>lr 1e-4 to 1e-3 (lower for fine-tuning, e.g. 2e-5), weight_decay 0.01 to 0.1</td></tr>
  </tbody>
</table>
<div class="callout tip"><strong>Tip:</strong> When a model will not train, check the learning rate first. A good habit is a quick sweep over 1e-4, 3e-4, 1e-3, 3e-3 and 1e-2 for a few hundred steps each, comparing loss curves. Pick the largest rate that decreases the loss smoothly.</div>
<div class="callout warn"><strong>Memory cost:</strong> Adam stores two extra numbers (m and v) per parameter. For a 7-billion-parameter model that is 14 billion extra numbers. This is one reason why training and fine-tuning LLMs needs much more GPU memory than running them. The AI Engineering track returns to this.</div>
`,
          keyPoints: [
            "Mini-batch gradient descent estimates the gradient on small random batches; one epoch is one pass over the data.",
            "The learning rate is the most important hyperparameter: too small is slow, too large diverges.",
            "Momentum accumulates a velocity that speeds up consistent directions and damps oscillation.",
            "Adam adapts each parameter's step using running averages of the gradient and squared gradient.",
            "AdamW is the standard optimizer for transformers; schedules with warm-up and decay are common."
          ],
          exercise: {
            prompt: String.raw`<p>Fit a linear regression <code>y = 3x + 2 + noise</code> (500 points, <code>x</code> uniform in [-1, 1]) with mini-batch gradient descent on the MSE loss. Use batch size 32, learning rate 0.1 and 20 epochs, and shuffle every epoch. Print the loss and parameters every 5 epochs. How many update steps happen in total?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

N = 500
x = np.random.uniform(-1, 1, N)
y = 3 * x + 2 + np.random.randn(N) * 0.1

w, b, lr, bs = 0.0, 0.0, 0.1, 32
steps = 0
for epoch in range(1, 21):
    order = np.random.permutation(N)              # shuffle each epoch
    for start in range(0, N, bs):
        idx = order[start:start + bs]
        xb, yb = x[idx], y[idx]
        err = w * xb + b - yb
        dw = 2 * np.mean(err * xb)
        db = 2 * np.mean(err)
        w, b = w - lr * dw, b - lr * db
        steps += 1
    if epoch % 5 == 0:
        loss = np.mean((w * x + b - y) ** 2)
        print(f"epoch {epoch:2d}: loss={loss:.5f} w={w:.3f} b={b:.3f}")
print("total update steps:", steps)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch  5: loss=0.00973 w=2.991 b=1.992
epoch 10: loss=0.00972 w=3.000 b=1.984
epoch 15: loss=0.00974 w=2.999 b=1.997
epoch 20: loss=0.00971 w=3.001 b=1.995
total update steps: 320</code></pre>
<p>Each epoch has ceil(500/32) = 16 batches (the last one is smaller), so 20 epochs give 320 updates. The parameters approach the true values w = 3 and b = 2, and the loss approaches the noise variance (0.1^2 = 0.01). That is the best any model can do on this data.</p>`
          },
          quiz: [
            { q: "With 10,000 training examples and a batch size of 100, how many optimizer steps are there in one epoch?", options: ["1", "100", "10,000", "1,000,000"], answer: 1, explain: "An epoch is one pass over the data: 10,000 / 100 = 100 mini-batches, each giving one update." },
            { q: "Your loss suddenly rises and becomes nan after a few steps. What is the most likely cause?", options: ["The learning rate is too small", "The learning rate is too large", "The batch size is too small", "Too few epochs"], answer: 1, explain: "A rate that is too large overshoots the minimum by more each step, so the loss grows until it overflows. A rate that is too small gives slow, steady progress, not divergence." },
            { q: "What does momentum add to gradient descent?", options: ["A separate learning rate for each parameter", "A running velocity that accumulates past gradients, damping oscillation", "Random noise to escape minima", "Automatic batch-size tuning"], answer: 1, explain: "Momentum keeps v = beta*v + grad, so consistent directions speed up and alternating ones cancel. Per-parameter scaling is what Adam adds on top." },
            { q: "Why does Adam divide by the square root of the running average of squared gradients?", options: ["To make the loss positive", "To normalize each parameter's step size by its typical gradient size", "To compute the second derivative exactly", "To regularize the weights"], answer: 1, explain: "Dividing by sqrt(v_hat) rescales each parameter's update, so parameters with large gradients take moderated steps and rarely updated ones still move." }
          ]
        },
        {
          id: "dl-nn-numpy-project",
          title: "Project: A 2-Layer Neural Network in Pure NumPy",
          minutes: 60,
          objectives: [
            "Combine forward pass, loss, backpropagation and gradient descent into a complete training loop",
            "Train a network that learns a non-linear boundary (make_moons) that logistic regression cannot",
            "Interpret training curves and the effect of hidden-layer size",
            "Solve XOR, the classic problem a single neuron cannot represent"
          ],
          body: String.raw`
<p>Time to put every piece together. In this lesson you build, from scratch, a neural network with one hidden layer. It learns to separate two interleaving half-moons, a dataset where a straight line fails. Every line of PyTorch you write later automates something you will see written out here.</p>

<h3>The problem</h3>
<p><code>make_moons</code> from scikit-learn creates two classes shaped like interlocking crescents. A linear classifier such as logistic regression can only draw a straight line, so it misclassifies the tips of both moons. A neural network with a hidden layer can bend its decision boundary around them. First, the baseline:</p>

<pre><code class="lang-python runnable">from sklearn.datasets import make_moons
from sklearn.linear_model import LogisticRegression

X, y = make_moons(n_samples=400, noise=0.2, random_state=0)
clf = LogisticRegression().fit(X, y)
print(f"logistic regression training accuracy: {clf.score(X, y):.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logistic regression training accuracy: 0.875</code></pre>

<h3>The architecture</h3>
<ul>
  <li>Input: 2 features (the x and y coordinates of a point).</li>
  <li>Hidden layer: 16 neurons with tanh activation. <code>W1</code> has shape (2, 16) and <code>b1</code> shape (1, 16).</li>
  <li>Output: 1 neuron with sigmoid, giving P(class 1). <code>W2</code> has shape (16, 1) and <code>b2</code> shape (1, 1).</li>
  <li>Loss: binary cross-entropy.</li>
  <li>Optimizer: full-batch gradient descent with learning rate 0.5. The dataset is tiny, so every step uses all 400 points.</li>
</ul>
<p>That is 2*16 + 16 + 16*1 + 1 = 65 parameters.</p>

<h3>The training loop</h3>
<p>Every neural network training loop, from this toy to GPT-scale models, repeats the same four phases:</p>
<ol>
  <li><strong>Forward:</strong> compute predictions from the current parameters.</li>
  <li><strong>Loss:</strong> measure how wrong they are.</li>
  <li><strong>Backward:</strong> compute the gradient of the loss with respect to every parameter.</li>
  <li><strong>Update:</strong> move each parameter a small step against its gradient.</li>
</ol>

<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_moons

np.random.seed(0)
X, y = make_moons(n_samples=400, noise=0.2, random_state=0)
y = y.reshape(-1, 1)                       # shape (400, 1)

# ---- parameters: 2 inputs -&gt; 16 hidden (tanh) -&gt; 1 output (sigmoid)
H = 16
W1 = np.random.randn(2, H) * 0.5
b1 = np.zeros((1, H))
W2 = np.random.randn(H, 1) * 0.5
b2 = np.zeros((1, 1))

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

lr = 0.5
for epoch in range(2001):
    # 1. forward pass
    z1 = X @ W1 + b1          # (400, 16)
    a1 = np.tanh(z1)          # (400, 16)
    z2 = a1 @ W2 + b2         # (400, 1)
    p = sigmoid(z2)           # (400, 1) predicted probability of class 1

    # 2. binary cross-entropy loss
    eps = 1e-9
    loss = -np.mean(y * np.log(p + eps) + (1 - y) * np.log(1 - p + eps))

    # 3. backward pass (chain rule)
    n = X.shape[0]
    dz2 = (p - y) / n                 # dL/dz2 for sigmoid + BCE
    dW2 = a1.T @ dz2                  # (16, 1)
    db2 = dz2.sum(axis=0, keepdims=True)
    da1 = dz2 @ W2.T                  # (400, 16)
    dz1 = da1 * (1 - a1 ** 2)         # tanh'(z) = 1 - tanh(z)^2
    dW1 = X.T @ dz1                   # (2, 16)
    db1 = dz1.sum(axis=0, keepdims=True)

    # 4. gradient descent update
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

    if epoch % 400 == 0:
        acc = ((p &gt; 0.5) == y).mean()
        print(f"epoch {epoch:4d}  loss {loss:.4f}  accuracy {acc:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch    0  loss 0.6259  accuracy 0.645
epoch  400  loss 0.1584  accuracy 0.940
epoch  800  loss 0.1135  accuracy 0.960
epoch 1200  loss 0.1014  accuracy 0.963
epoch 1600  loss 0.0964  accuracy 0.963
epoch 2000  loss 0.0938  accuracy 0.963</code></pre>
<p>The loss falls steadily from about 0.63 (barely better than guessing) to under 0.1, and training accuracy rises well above the logistic regression baseline. With noise=0.2 some points sit on the wrong side of any sensible boundary, so 100% accuracy would mean the network had memorized the noise.</p>

<h3>Reading the code line by line</h3>
<ul>
  <li><code>y.reshape(-1, 1)</code> makes the labels a column, (400, 1), matching <code>p</code>. Without it, <code>y</code> of shape (400,) minus <code>p</code> of shape (400, 1) broadcasts to a (400, 400) matrix. That is a silent bug: the code runs and produces garbage.</li>
  <li><code>dz2 = (p - y) / n</code> is the sigmoid-plus-BCE shortcut from the loss lesson. The <code>/ n</code> is there because the loss is a mean.</li>
  <li><code>(1 - a1 ** 2)</code> is the derivative of tanh, written using the cached activation <code>a1</code>. This is why the forward pass keeps its intermediate values.</li>
  <li>The update uses in-place <code>-=</code> on the arrays. In PyTorch, <code>optimizer.step()</code> does the same.</li>
</ul>

<h3>Making predictions on new points</h3>
<p>After training, prediction is just the forward pass. A point is labelled class 1 if <code>p &gt; 0.5</code>. To get a feel for what the network learned, you can evaluate a grid of points and print a crude text map of the decision regions:</p>

<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import make_moons

np.random.seed(0)
X, y = make_moons(n_samples=400, noise=0.2, random_state=0)
y = y.reshape(-1, 1)
W1 = np.random.randn(2, 16) * 0.5; b1 = np.zeros((1, 16))
W2 = np.random.randn(16, 1) * 0.5; b2 = np.zeros((1, 1))

def forward(X):
    a1 = np.tanh(X @ W1 + b1)
    return a1, 1 / (1 + np.exp(-(a1 @ W2 + b2)))

for _ in range(2000):
    a1, p = forward(X)
    dz2 = (p - y) / len(X)
    dz1 = (dz2 @ W2.T) * (1 - a1 ** 2)
    W2 -= 0.5 * a1.T @ dz2; b2 -= 0.5 * dz2.sum(0, keepdims=True)
    W1 -= 0.5 * X.T @ dz1;  b1 -= 0.5 * dz1.sum(0, keepdims=True)

# text map of the decision regions: '#' = class 1, '.' = class 0
for yy in np.linspace(1.5, -1.0, 11):
    row = np.array([[xx, yy] for xx in np.linspace(-1.5, 2.5, 40)])
    print("".join("#" if p_ &gt; 0.5 else "." for p_ in forward(row)[1].ravel()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">.....................................###
...................................#####
..................................######
................................########
..............####............##########
............########........############
...........##########......#############
.........###############################
........################################
.......#################################
.....###################################</code></pre>
<p>You can see a curved boundary: the upper moon (class 0, dots) wraps over the lower moon (class 1, hashes). No straight line could produce this map.</p>

<h3>Experiments worth trying</h3>
<ul>
  <li><strong>Hidden size:</strong> with <code>H = 2</code> the network can only make a slightly bent boundary. With 16 to 64 the moons are separated cleanly. Very large H on very noisy data starts fitting the noise (overfitting).</li>
  <li><strong>Learning rate:</strong> try 0.05 (slow) and 5.0 (unstable). Compare the loss curves.</li>
  <li><strong>Activation:</strong> swap tanh for ReLU. The derivative becomes <code>(z1 &gt; 0)</code>, so you must cache <code>z1</code>.</li>
  <li><strong>Remove the hidden layer:</strong> you are back to logistic regression and its accuracy.</li>
</ul>

<h3>XOR: the classic test</h3>
<p>XOR ("exclusive or") outputs 1 when exactly one of two binary inputs is 1. Its four points, (0,0) gives 0, (0,1) gives 1, (1,0) gives 1, (1,1) gives 0, cannot be separated by any straight line. In 1969 Minsky and Papert used this kind of limitation of single-layer perceptrons to argue against neural networks, which helped bring on the first "AI winter". A hidden layer solves it easily. The hidden neurons learn intermediate features such as "x1 OR x2" and "x1 AND x2", and the output combines them as "OR but not AND". Building that network is your exercise.</p>

<div class="callout info"><strong>What PyTorch will automate:</strong> parameter creation and initialization (<code>nn.Linear</code>), the forward computation (<code>nn.Module.forward</code>), the loss (<code>nn.BCEWithLogitsLoss</code>), the entire backward section (<code>loss.backward()</code>), and the update section (<code>optimizer.step()</code>). The structure of the loop stays exactly the same.</div>
`,
          keyPoints: [
            "Every training loop repeats forward, loss, backward and update.",
            "A single hidden layer with a non-linear activation can learn curved decision boundaries such as make_moons and XOR.",
            "Keep label and prediction shapes identical, e.g. (N, 1), to avoid silent broadcasting bugs.",
            "The backward pass reuses cached forward values (such as a1 for the tanh derivative).",
            "PyTorch automates every block of this loop, but the structure stays the same."
          ],
          exercise: {
            prompt: String.raw`<p>Train a 2-4-1 network (2 inputs, 4 tanh hidden units, 1 sigmoid output) on the four XOR points using full-batch gradient descent with learning rate 1.0 for 5,000 epochs. Use <code>np.random.seed(1)</code> and initialize weights with <code>np.random.randn(...)</code> (scale 1.0). Print the final loss and the predicted probability for each of the four inputs. Then try 1 hidden unit and explain what happens.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)

def train_xor(hidden, epochs=5000, lr=1.0, seed=1):
    rng = np.random.RandomState(seed)
    W1 = rng.randn(2, hidden); b1 = np.zeros((1, hidden))
    W2 = rng.randn(hidden, 1); b2 = np.zeros((1, 1))
    for _ in range(epochs):
        a1 = np.tanh(X @ W1 + b1)
        p = 1 / (1 + np.exp(-(a1 @ W2 + b2)))
        dz2 = (p - y) / 4
        dz1 = (dz2 @ W2.T) * (1 - a1 ** 2)
        W2 -= lr * a1.T @ dz2; b2 -= lr * dz2.sum(0, keepdims=True)
        W1 -= lr * X.T @ dz1;  b1 -= lr * dz1.sum(0, keepdims=True)
    loss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))
    return loss, p

for hidden in (4, 1):
    loss, p = train_xor(hidden)
    print(f"hidden={hidden}: loss={loss:.4f} predictions={p.ravel().round(3)}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">hidden=4: loss=0.0005 predictions=[0.    0.999 0.999 0.001]
hidden=1: loss=0.4777 predictions=[0.334 0.999 0.333 0.333]</code></pre>
<p>With 4 hidden units the predictions approach [0, 1, 1, 0]: XOR is solved. With a single hidden unit the network is effectively one bent line. It cannot separate the two diagonal pairs: it gets one input right with high confidence and leaves the other three stuck near 0.33, so the loss stays high. This is the failure of single-unit models that Minsky and Papert pointed out, and the fix is to add hidden units.</p>`
          },
          quiz: [
            { q: "Why does logistic regression score clearly lower than the neural network on make_moons?", options: ["It uses the wrong loss function", "It can only draw a linear decision boundary", "It was trained for too few epochs", "It does not use a bias"], answer: 1, explain: "Logistic regression is a single neuron, so its boundary is a straight line. The moons need a curved boundary, which a hidden layer with a non-linear activation can provide." },
            { q: "In the NumPy network, what happens if y has shape (400,) while p has shape (400, 1)?", options: ["NumPy raises a shape error", "Broadcasting silently produces a (400, 400) array and the gradients are wrong", "Nothing; the shapes are equivalent", "The loss becomes exactly zero"], answer: 1, explain: "(400, 1) minus (400,) broadcasts to (400, 400). The code runs but computes nonsense. Always make label and prediction shapes match." },
            { q: "Which line computes the tanh derivative in the backward pass?", options: ["dz2 = (p - y) / n", "dz1 = da1 * (1 - a1 ** 2)", "dW1 = X.T @ dz1", "a1 = np.tanh(z1)"], answer: 1, explain: "The derivative of tanh(z) is 1 - tanh(z)^2, computed from the cached activation a1 and multiplied by the upstream gradient da1." },
            { q: "What makes XOR solvable by a 2-layer network but not by a single neuron?", options: ["XOR needs more training data", "The hidden layer creates intermediate features (such as OR and AND) that make the classes linearly separable for the output neuron", "XOR needs a softmax output", "A single neuron cannot use a bias"], answer: 1, explain: "The hidden layer remaps the inputs into a space where the classes can be split by a line. XOR is the textbook non-linearly-separable problem." }
          ]
        }
      ]
    },
    {
      id: "dl-pytorch",
      title: "Deep Learning with PyTorch",
      summary: "Move from hand-written NumPy to PyTorch: tensors, autograd, nn.Module, the canonical training loop, data loading, regularization, checkpointing and devices.",
      lessons: [
        {
          id: "dl-pytorch-tensors",
          title: "Tensors and Autograd",
          minutes: 45,
          objectives: [
            "Create and manipulate PyTorch tensors and convert between NumPy and PyTorch",
            "Reason about tensor shape, dtype and device",
            "Use requires_grad and backward() to compute gradients automatically",
            "Explain the computational graph autograd builds, and use torch.no_grad()"
          ],
          body: String.raw`
<p>In the previous module you wrote every gradient by hand. That is a great way to learn, but it does not scale: a modern network has hundreds of layer types and billions of parameters. <strong>PyTorch</strong> is the most widely used deep learning framework in research and industry. It gives you two things NumPy does not: <strong>automatic differentiation</strong> (autograd), which computes all gradients for you, and <strong>hardware acceleration</strong>, which runs the same code on GPUs. Most open-source LLMs, including the Llama and Mistral families, are implemented and released in PyTorch.</p>

<h3>Tensors: NumPy arrays with superpowers</h3>
<p>A <strong>tensor</strong> is PyTorch's n-dimensional array. A 0-d tensor is a scalar, 1-d is a vector, 2-d is a matrix, and higher dimensions hold batches of images (N, channels, height, width) or batches of token sequences (N, sequence length, embedding size). The API is deliberately close to NumPy: indexing, slicing, broadcasting, <code>@</code> for matrix multiplication, <code>.sum()</code>, <code>.mean()</code> and <code>.reshape()</code> all work as you would expect.</p>
<p>Every tensor has three attributes you will check constantly:</p>
<ul>
  <li><strong>shape</strong>: the size of each dimension, for example <code>torch.Size([32, 64])</code>.</li>
  <li><strong>dtype</strong>: the number type. Model inputs and weights are usually <code>torch.float32</code>. Class labels for classification are <code>torch.long</code> (64-bit integers). Large models often use <code>float16</code> or <code>bfloat16</code> to save memory.</li>
  <li><strong>device</strong>: where the data lives, <code>cpu</code> or <code>cuda</code> (an NVIDIA GPU), or <code>mps</code> on Apple Silicon. Tensors in one operation must be on the same device.</li>
</ul>

<pre><code class="lang-python runnable">import numpy as np
import torch

a = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
print(a.shape, a.dtype, a.device)

b = torch.ones(2, 2)
print("a + b =\n", a + b)
print("a @ b =\n", a @ b)
print("column means:", a.mean(dim=0))

# NumPy &lt;-&gt; PyTorch
arr = np.arange(6).reshape(2, 3)
t = torch.from_numpy(arr)             # shares memory with arr
print("from numpy:", t.dtype, tuple(t.shape))
t_float = t.float()                   # convert to float32 for model input
print("as float:", t_float.dtype)
print("back to numpy:", t_float.numpy().sum())

# reshaping and adding a batch dimension
x = torch.arange(12.0)
print(x.reshape(3, 4).shape, x.view(2, 6).shape, x.unsqueeze(0).shape)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">torch.Size([2, 2]) torch.float32 cpu
a + b =
 tensor([[2., 3.],
        [4., 5.]])
a @ b =
 tensor([[3., 3.],
        [7., 7.]])
column means: tensor([2., 3.])
from numpy: torch.int64 (2, 3)
as float: torch.float32
back to numpy: 15.0
torch.Size([3, 4]) torch.Size([2, 6]) torch.Size([1, 12])</code></pre>
<p>The <code>dim</code> argument works like NumPy's <code>axis</code>: <code>mean(dim=0)</code> averages down the rows and gives one value per column. <code>unsqueeze(0)</code> adds a dimension of size 1 at the front, which is how you turn one sample into a batch of one.</p>

<div class="callout warn"><strong>Common mistake (dtype):</strong> <code>torch.from_numpy</code> on a NumPy float array gives <code>float64</code>, because NumPy defaults to 64-bit. PyTorch layers expect <code>float32</code>, and mixing them raises errors such as <em>"mat1 and mat2 must have the same dtype"</em>. Convert with <code>torch.tensor(X, dtype=torch.float32)</code> or <code>.float()</code>. For <code>nn.CrossEntropyLoss</code>, the labels must be <code>torch.long</code>.</div>

<h3>Autograd: gradients for free</h3>
<p>Set <code>requires_grad=True</code> on a tensor, and PyTorch records every operation you do with it in a <strong>computational graph</strong>, the same kind of graph you drew by hand in the backpropagation lesson. When you call <code>.backward()</code> on a scalar result (such as the loss), PyTorch walks that graph in reverse, applies the chain rule, and stores dResult/dTensor in each tensor's <code>.grad</code> attribute.</p>
<p>Here is the single-neuron example from the backpropagation lesson again (x=2, w=0.5, b=-0.5, y=1), this time without any hand-written derivatives:</p>

<pre><code class="lang-python runnable">import torch

x = torch.tensor(2.0)
y = torch.tensor(1.0)
w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(-0.5, requires_grad=True)

z = w * x + b
p = torch.sigmoid(z)
loss = -(y * torch.log(p) + (1 - y) * torch.log(1 - p))
print("loss:", round(loss.item(), 4))
print("grad_fn of loss:", type(loss.grad_fn).__name__)

loss.backward()                  # backpropagation, automatically
print("dL/dw:", round(w.grad.item(), 4))
print("dL/db:", round(b.grad.item(), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">loss: 0.4741
grad_fn of loss: NegBackward0
dL/dw: -0.7551
dL/db: -0.3775</code></pre>
<p>These match the hand-computed values (-0.7551 and -0.3775). Every tensor produced by an operation on a <code>requires_grad</code> tensor has a <code>grad_fn</code>, which is its node in the graph and knows its local derivative. <code>loss.item()</code> pulls a Python number out of a one-element tensor.</p>

<h3>Autograd with vectors and matrices</h3>
<p>Autograd works on whole tensors. Below we fit a linear model to data with plain gradient descent. Autograd computes the gradients, and we write the update by hand. This is the bridge between the NumPy code and a full PyTorch training loop.</p>

<pre><code class="lang-python runnable">import torch
torch.manual_seed(0)

X = torch.randn(100, 3)
true_w = torch.tensor([2.0, -1.0, 0.5])
y = X @ true_w + 0.3 + 0.01 * torch.randn(100)

w = torch.zeros(3, requires_grad=True)
b = torch.zeros(1, requires_grad=True)
lr = 0.1

for step in range(101):
    y_hat = X @ w + b
    loss = ((y_hat - y) ** 2).mean()
    loss.backward()                       # fills w.grad and b.grad
    with torch.no_grad():                 # the update itself must not be tracked
        w -= lr * w.grad
        b -= lr * b.grad
    w.grad.zero_()                        # reset, or gradients accumulate
    b.grad.zero_()
    if step % 25 == 0:
        print(f"step {step:3d} loss {loss.item():.5f}")

print("learned w:", w.detach().numpy().round(3), "b:", round(b.item(), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step   0 loss 3.96574
step  25 loss 0.00193
step  50 loss 0.00015
step  75 loss 0.00015
step 100 loss 0.00015
learned w: [ 2.    -0.999  0.499] b: 0.302</code></pre>

<h3>Three rules of autograd you must know</h3>
<ol>
  <li><strong>Gradients accumulate.</strong> Each <code>.backward()</code> <em>adds</em> to <code>.grad</code>; it does not overwrite it. This is deliberate, because it lets you sum gradients over several small batches when a big one does not fit in memory ("gradient accumulation"). But in a normal loop you must reset the gradients every step. Optimizers do this with <code>optimizer.zero_grad()</code>.</li>
  <li><strong>Updates go inside <code>torch.no_grad()</code>.</strong> Changing the weights is not part of the model's computation, so it must not be recorded in the graph. <code>torch.no_grad()</code> also speeds up inference and saves memory, because no graph is built.</li>
  <li><strong><code>.detach()</code> cuts a tensor out of the graph.</strong> Use it (or <code>.item()</code> for scalars) when you log values or convert to NumPy. <code>.numpy()</code> refuses to work on a tensor that requires gradients.</li>
</ol>

<pre><code class="lang-python runnable">import torch

w = torch.tensor(3.0, requires_grad=True)
for i in range(3):
    loss = w ** 2            # dloss/dw = 2w = 6
    loss.backward()
    print(f"after backward #{i + 1}: w.grad = {w.grad.item()}")
# The gradient grows 6, 12, 18 because it accumulates. Reset it:
w.grad.zero_()
print("after zero_():", w.grad.item())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">after backward #1: w.grad = 6.0
after backward #2: w.grad = 12.0
after backward #3: w.grad = 18.0
after zero_(): 0.0</code></pre>
<div class="callout warn"><strong>Common mistake:</strong> forgetting to zero gradients. The code runs without errors, but every step uses the sum of all previous gradients. Updates get larger and larger and training becomes unstable or diverges. When a loss curve behaves strangely, check for <code>optimizer.zero_grad()</code> first.</div>

<h3>Dynamic graphs</h3>
<p>PyTorch builds the graph fresh on every forward pass, as your Python code runs ("define-by-run"). You can therefore use ordinary Python <code>if</code> statements, loops and function calls inside a model, and debug with <code>print()</code> or a debugger, just like normal code. This flexibility is a big reason PyTorch became the dominant framework for research and for LLMs.</p>
`,
          keyPoints: [
            "A tensor is an n-dimensional array with a shape, a dtype (usually float32; labels long) and a device.",
            "requires_grad=True makes PyTorch record operations; loss.backward() fills each tensor's .grad.",
            "Gradients accumulate across backward() calls; reset them every step (optimizer.zero_grad()).",
            "Wrap weight updates and inference in torch.no_grad(); use .detach() or .item() for logging.",
            "PyTorch builds the graph dynamically as Python runs, so normal control flow and debugging work."
          ],
          exercise: {
            prompt: String.raw`<p>Use autograd to find the minimum of <code>f(x, y) = (x - 1)^2 + (y + 2)^2 + x*y</code>. Start at (0, 0), use gradient descent with learning rate 0.1 for 200 steps, and print the final x, y and f. Check your answer against the analytic solution, which you get by setting both partial derivatives to zero.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch

p = torch.zeros(2, requires_grad=True)       # p[0] = x, p[1] = y
for step in range(200):
    x, y = p[0], p[1]
    f = (x - 1) ** 2 + (y + 2) ** 2 + x * y
    f.backward()
    with torch.no_grad():
        p -= 0.1 * p.grad
    p.grad.zero_()

x, y = p.detach().tolist()
print(f"x={x:.4f} y={y:.4f} f={f.item():.4f}")
# analytic: df/dx = 2(x-1) + y = 0 and df/dy = 2(y+2) + x = 0  -&gt;  x = 8/3, y = -10/3
print(f"analytic x={8/3:.4f} y={-10/3:.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">x=2.6667 y=-3.3333 f=-4.3333
analytic x=2.6667 y=-3.3333</code></pre>
<p>Autograd computed both partial derivatives on every step. Without <code>p.grad.zero_()</code> the gradients would accumulate, and the steps would grow until the iteration diverged.</p>`
          },
          quiz: [
            { q: "What does loss.backward() do?", options: ["Undoes the last optimizer step", "Computes gradients of loss with respect to all tensors with requires_grad=True and stores them in .grad", "Resets all gradients to zero", "Runs the forward pass in reverse to recover the inputs"], answer: 1, explain: "backward() runs reverse-mode automatic differentiation through the recorded graph and adds dloss/dparam to each parameter's .grad attribute." },
            { q: "You call backward() twice without zeroing gradients. What is in w.grad?", options: ["The gradient of the last call only", "The sum of both gradients", "An error is raised", "Zero"], answer: 1, explain: "PyTorch accumulates gradients by design, so the two calls add up. This is why the training loop calls optimizer.zero_grad() every step." },
            { q: "Why are parameter updates wrapped in torch.no_grad()?", options: ["To make them run on the GPU", "So the update is not recorded in the computational graph", "To zero the gradients", "To convert tensors to NumPy"], answer: 1, explain: "Updating weights is not part of the model's computation. no_grad stops autograd from tracking it, and also saves memory and time during inference." },
            { q: "Your labels tensor has dtype float32 and nn.CrossEntropyLoss raises an error. What is the fix?", options: ["Convert the labels to torch.long", "Apply softmax to the labels", "Move the labels to the GPU", "Call labels.backward()"], answer: 0, explain: "CrossEntropyLoss expects integer class indices of dtype long (int64). Inputs and weights should be float32." }
          ]
        },
        {
          id: "dl-pytorch-training-loop",
          title: "nn.Module and the Canonical Training Loop",
          minutes: 50,
          objectives: [
            "Define models by subclassing nn.Module and with nn.Sequential",
            "Use built-in layers, loss functions and optimizers",
            "Write the canonical five-step training loop and explain each line",
            "Rebuild the make_moons network in PyTorch"
          ],
          body: String.raw`
<p>Autograd removes the hand-written backward pass. PyTorch's <code>torch.nn</code> package removes the rest of the boilerplate. It provides layers that create and hold their own parameters, ready-made loss functions, and optimizers that apply update rules such as Adam. This lesson introduces those building blocks and the <strong>canonical training loop</strong>. It is the same five lines whether you train a 65-parameter toy or fine-tune a language model.</p>

<h3>nn.Module: the base class for every model</h3>
<p>A PyTorch model is a class that inherits from <code>nn.Module</code> and implements two methods:</p>
<ul>
  <li><code>__init__</code>: create the layers (sub-modules) and store them as attributes. Assigning a layer to <code>self.something</code> registers its parameters automatically.</li>
  <li><code>forward(self, x)</code>: describe how input becomes output, using those layers. You call the model like a function, <code>model(x)</code>, and PyTorch runs <code>forward</code> for you (plus some hooks). Do not call <code>model.forward(x)</code> directly.</li>
</ul>
<p>The key built-in layer is <code>nn.Linear(in_features, out_features)</code>: a dense layer holding a weight of shape (out, in) and a bias of shape (out,). It is initialized with a sensible random scheme and computes <code>x @ W.T + b</code>.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn

class MLP(nn.Module):
    def __init__(self, n_in, n_hidden, n_out):
        super().__init__()                      # always call this first
        self.hidden = nn.Linear(n_in, n_hidden)
        self.act = nn.ReLU()
        self.out = nn.Linear(n_hidden, n_out)

    def forward(self, x):
        return self.out(self.act(self.hidden(x)))

torch.manual_seed(0)
model = MLP(2, 16, 1)
print(model)
for name, p in model.named_parameters():
    print(f"{name:15s} {tuple(p.shape)}")
print("total parameters:", sum(p.numel() for p in model.parameters()))

x = torch.randn(4, 2)          # a batch of 4 samples
print("output shape:", tuple(model(x).shape))

# The same network written with nn.Sequential:
seq = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 1))
print("sequential parameters:", sum(p.numel() for p in seq.parameters()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">MLP(
  (hidden): Linear(in_features=2, out_features=16, bias=True)
  (act): ReLU()
  (out): Linear(in_features=16, out_features=1, bias=True)
)
hidden.weight   (16, 2)
hidden.bias     (16,)
out.weight      (1, 16)
out.bias        (1,)
total parameters: 65
output shape: (4, 1)
sequential parameters: 65</code></pre>
<p>The parameter count matches the NumPy version from the previous module (65). <code>nn.Sequential</code> is convenient when data simply flows through layers in order. Subclass <code>nn.Module</code> when you need anything more: several inputs, skip connections, or conditional logic.</p>

<h3>Losses and optimizers</h3>
<ul>
  <li><strong>Loss functions</strong> are modules too: <code>nn.MSELoss()</code>, <code>nn.BCEWithLogitsLoss()</code> (sigmoid and BCE in one numerically stable step) and <code>nn.CrossEntropyLoss()</code> (log-softmax and negative log-likelihood). Call them as <code>loss_fn(predictions, targets)</code>.</li>
  <li><strong>Optimizers</strong> live in <code>torch.optim</code>. You give them the parameters to manage and the hyperparameters: <code>torch.optim.SGD(model.parameters(), lr=0.1, momentum=0.9)</code> or <code>torch.optim.Adam(model.parameters(), lr=1e-3)</code>. They provide <code>zero_grad()</code>, which clears every managed gradient, and <code>step()</code>, which applies the update rule using the current gradients.</li>
</ul>

<h3>The canonical training loop</h3>
<p>Memorize this pattern. Almost every PyTorch training script contains it:</p>
<pre><code class="lang-python">for epoch in range(num_epochs):
    for xb, yb in train_loader:          # iterate over mini-batches
        logits = model(xb)               # 1. forward pass
        loss = loss_fn(logits, yb)       # 2. compute the loss
        optimizer.zero_grad()            # 3. clear old gradients
        loss.backward()                  # 4. backpropagate
        optimizer.step()                 # 5. update the parameters
</code></pre>
<p>Steps 3 to 5 must come in this order relative to each other: clear, then compute, then apply. Some people put <code>zero_grad()</code> at the top of the loop, which is equally correct. What matters is that it happens once per step, before <code>backward()</code>.</p>

<p>Here is the make_moons network from the NumPy project, now in idiomatic PyTorch:</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import make_moons

torch.manual_seed(0)
torch.set_num_threads(1)           # tiny model: one thread is fastest and deterministic

X_np, y_np = make_moons(n_samples=400, noise=0.2, random_state=0)
X = torch.tensor(X_np, dtype=torch.float32)
y = torch.tensor(y_np, dtype=torch.float32).unsqueeze(1)   # shape (400, 1)

model = nn.Sequential(nn.Linear(2, 16), nn.Tanh(), nn.Linear(16, 1))  # outputs a logit
loss_fn = nn.BCEWithLogitsLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.05)

for epoch in range(301):
    logits = model(X)                  # 1. forward
    loss = loss_fn(logits, y)          # 2. loss
    optimizer.zero_grad()              # 3. clear gradients
    loss.backward()                    # 4. backward
    optimizer.step()                   # 5. update
    if epoch % 60 == 0:
        with torch.no_grad():
            acc = ((logits &gt; 0).float() == y).float().mean().item()
        print(f"epoch {epoch:3d}  loss {loss.item():.4f}  accuracy {acc:.3f}")

# predict new points: apply sigmoid to logits to get probabilities
with torch.no_grad():
    new_points = torch.tensor([[0.0, 1.0], [1.0, -0.5], [0.5, 0.25]])
    print("P(class 1):", torch.sigmoid(model(new_points)).squeeze(1).numpy().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch   0  loss 0.6790  accuracy 0.803
epoch  60  loss 0.1809  accuracy 0.933
epoch 120  loss 0.0872  accuracy 0.967
epoch 180  loss 0.0827  accuracy 0.967
epoch 240  loss 0.0806  accuracy 0.965
epoch 300  loss 0.0788  accuracy 0.967
P(class 1): [0.066 0.984 0.574]</code></pre>
<p>About 15 lines replace the NumPy forward, backward and update code, and Adam reaches a similar accuracy in far fewer epochs than plain gradient descent did. Some details to notice:</p>
<ul>
  <li>The model outputs a <strong>logit</strong>, not a probability. <code>BCEWithLogitsLoss</code> applies the sigmoid internally. A logit above 0 is the same as a probability above 0.5, which is why accuracy uses <code>logits &gt; 0</code>.</li>
  <li>Labels for BCE must be float and the same shape as the logits, (400, 1). That is why we call <code>unsqueeze(1)</code>.</li>
  <li>For predictions on new data we wrap the forward pass in <code>torch.no_grad()</code> and apply <code>torch.sigmoid</code> ourselves.</li>
</ul>

<div class="callout warn"><strong>Common shape mismatch:</strong> <code>BCEWithLogitsLoss</code> with logits of shape (N, 1) and labels of shape (N,) raises <em>"Target size must be the same as input size"</em>. For <code>CrossEntropyLoss</code> it is the other way round: logits (N, K) and labels (N,) of integer class indices, <em>not</em> one-hot (N, K) floats.</div>

<h3>What each line does under the hood</h3>
<table>
  <thead><tr><th>PyTorch line</th><th>Equivalent in the NumPy project</th></tr></thead>
  <tbody>
    <tr><td>nn.Linear(2, 16)</td><td>W1 = np.random.randn(2, 16) * scale; b1 = zeros</td></tr>
    <tr><td>logits = model(X)</td><td>z1 = X @ W1 + b1; a1 = tanh(z1); z2 = a1 @ W2 + b2</td></tr>
    <tr><td>loss_fn(logits, y)</td><td>-mean(y log p + (1-y) log(1-p)) with p = sigmoid(z2)</td></tr>
    <tr><td>optimizer.zero_grad()</td><td>(not needed: we recomputed the gradients from scratch each time)</td></tr>
    <tr><td>loss.backward()</td><td>dz2, dW2, db2, da1, dz1, dW1, db1, all derived by hand</td></tr>
    <tr><td>optimizer.step()</td><td>W1 -= lr * dW1, and so on (Adam adds momentum and per-parameter scaling)</td></tr>
  </tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Before a long training run, try to <em>overfit one small batch</em>. Take 10 to 20 examples and train on them alone until the loss is near zero. If the model cannot memorize 20 examples, there is a bug, such as a wrong loss, wrong label shapes, a missing <code>zero_grad</code>, or a learning rate far off. This 30-second check saves hours.</div>
`,
          keyPoints: [
            "Models subclass nn.Module: create layers in __init__, define the computation in forward, call model(x).",
            "nn.Sequential chains layers when data flows straight through.",
            "The canonical loop: forward, loss, optimizer.zero_grad(), loss.backward(), optimizer.step().",
            "Output raw logits and use BCEWithLogitsLoss / CrossEntropyLoss, which apply sigmoid/softmax internally.",
            "Before long runs, check that the model can overfit a tiny batch."
          ],
          exercise: {
            prompt: String.raw`<p>Write an <code>nn.Module</code> subclass called <code>Regressor</code> with two hidden layers (32 and 16 units, ReLU) and one linear output. Train it with <code>nn.MSELoss</code> and Adam (lr=0.01) for 500 full-batch epochs to learn <code>y = sin(3x)</code> on 200 points with x evenly spaced in [-1, 1]. Use <code>torch.manual_seed(0)</code>. Print the loss every 100 epochs and the predictions at x = -0.5, 0, 0.5 next to the true values.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch
from torch import nn

torch.manual_seed(0)
torch.set_num_threads(1)

class Regressor(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(1, 32), nn.ReLU(),
            nn.Linear(32, 16), nn.ReLU(),
            nn.Linear(16, 1),
        )

    def forward(self, x):
        return self.net(x)

x = torch.linspace(-1, 1, 200).unsqueeze(1)   # (200, 1)
y = torch.sin(3 * x)

model = Regressor()
loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(1, 501):
    loss = loss_fn(model(x), y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    if epoch % 100 == 0:
        print(f"epoch {epoch} loss {loss.item():.5f}")

with torch.no_grad():
    test = torch.tensor([[-0.5], [0.0], [0.5]])
    print("pred:", model(test).squeeze(1).numpy().round(3))
    print("true:", torch.sin(3 * test).squeeze(1).numpy().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch 100 loss 0.00263
epoch 200 loss 0.00024
epoch 300 loss 0.00012
epoch 400 loss 0.00008
epoch 500 loss 0.00006
pred: [-0.996 -0.001  0.997]
true: [-0.997  0.     0.997]</code></pre>
<p>The input must have shape (200, 1), one feature per sample, which is why we call <code>unsqueeze(1)</code>. The predictions closely track sin(3x), which shows that a small ReLU network can approximate a smooth non-linear function.</p>`
          },
          quiz: [
            { q: "What is the correct order inside one training step?", options: ["backward, forward, step, zero_grad", "forward, loss, zero_grad, backward, step", "zero_grad, step, forward, backward", "forward, step, loss, backward"], answer: 1, explain: "Compute predictions and loss, clear old gradients, backpropagate the new ones, then let the optimizer update the weights. zero_grad may also come first in the step, but it must come before backward." },
            { q: "Why should you call model(x) rather than model.forward(x)?", options: ["forward does not exist", "model(x) runs forward plus PyTorch's hook machinery", "model(x) is faster because it skips autograd", "They behave differently on CPU"], answer: 1, explain: "nn.Module.__call__ wraps forward with hooks that some features rely on. Calling forward directly bypasses them." },
            { q: "Your binary classifier's last layer is nn.Linear(16, 1) and you use nn.BCEWithLogitsLoss. What should the model output?", options: ["Sigmoid probabilities", "Raw logits", "Class indices 0/1", "Softmax over two classes"], answer: 1, explain: "BCEWithLogitsLoss applies the sigmoid internally in a numerically stable way, so the model should return raw logits." },
            { q: "How does an optimizer know which tensors to update?", options: ["It updates every tensor in memory", "You pass model.parameters() when constructing it", "It reads the loss function", "Parameters register themselves with the global optimizer"], answer: 1, explain: "torch.optim optimizers are constructed with an iterable of parameters, usually model.parameters(), and only manage those." }
          ]
        },
        {
          id: "dl-pytorch-data-digits",
          title: "Datasets, DataLoaders and Training an MLP on Digits",
          minutes: 55,
          objectives: [
            "Wrap data in a Dataset and iterate mini-batches with a DataLoader",
            "Train a multi-class MLP on scikit-learn's handwritten digits",
            "Use model.train() / model.eval() and torch.no_grad() correctly for evaluation",
            "Track training and validation metrics each epoch"
          ],
          body: String.raw`
<p>Real datasets do not fit in a single tensor that you push through the model all at once. You need to shuffle the data, split it into mini-batches, and sometimes load or transform samples on the fly (for example, reading images from disk). PyTorch separates these jobs into two classes: a <strong>Dataset</strong> knows how to fetch <em>one</em> sample, and a <strong>DataLoader</strong> turns a Dataset into shuffled mini-batches. In this lesson you use both to train a digit classifier with a proper train/validation workflow.</p>

<h3>Dataset: one sample at a time</h3>
<p>A map-style Dataset implements two methods:</p>
<ul>
  <li><code>__len__(self)</code>: how many samples there are.</li>
  <li><code>__getitem__(self, idx)</code>: return sample number <code>idx</code>, usually as a tuple <code>(features, label)</code> of tensors.</li>
</ul>
<p>For data already in memory, <code>TensorDataset(X, y)</code> does this for you. Writing your own class is useful when samples need loading or transformation, such as reading an image file, tokenizing text, or applying random augmentation.</p>

<h3>DataLoader: batching, shuffling, parallel loading</h3>
<p><code>DataLoader(dataset, batch_size=64, shuffle=True)</code> asks the Dataset for samples, stacks them into batch tensors, and yields them one batch at a time. Use <code>shuffle=True</code> for training, so each epoch sees batches in a different random order, and <code>shuffle=False</code> for evaluation. On real projects, <code>num_workers=4</code> loads batches in background processes while the GPU trains, so the GPU is not left waiting for data.</p>

<pre><code class="lang-python runnable">import torch
from torch.utils.data import Dataset, DataLoader

class SquaresDataset(Dataset):
    """Toy dataset: feature x, label x squared."""
    def __init__(self, n):
        self.x = torch.arange(n, dtype=torch.float32)

    def __len__(self):
        return len(self.x)

    def __getitem__(self, idx):
        x = self.x[idx]
        return x.unsqueeze(0), x ** 2        # (features, label)

ds = SquaresDataset(10)
print("len:", len(ds), "| sample 3:", ds[3])

torch.manual_seed(0)
loader = DataLoader(ds, batch_size=4, shuffle=True)
for xb, yb in loader:
    print("batch x:", xb.squeeze(1).tolist(), "| y:", yb.tolist())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">len: 10 | sample 3: (tensor([3.]), tensor(9.))
batch x: [6.0, 7.0, 1.0, 4.0] | y: [36.0, 49.0, 1.0, 16.0]
batch x: [2.0, 0.0, 9.0, 8.0] | y: [4.0, 0.0, 81.0, 64.0]
batch x: [3.0, 5.0] | y: [9.0, 25.0]</code></pre>
<p>Ten samples with batch size 4 give batches of 4, 4 and 2. The last batch is smaller unless you pass <code>drop_last=True</code>. The DataLoader stacked the individual (1,) feature tensors into (4, 1) batches automatically.</p>

<h3>The digits dataset</h3>
<p><code>sklearn.datasets.load_digits</code> ships with scikit-learn, so it needs no download. It has 1,797 grayscale images of handwritten digits 0 to 9. Each image is 8x8 pixels with intensities from 0 to 16, flattened to 64 features. It is a small cousin of the famous MNIST dataset (70,000 images of 28x28 pixels) and is perfect for fast CPU experiments.</p>
<p>The workflow follows what you learned in classical ML:</p>
<ol>
  <li>Split into training and test sets (stratified, so every digit appears in both).</li>
  <li>Standardize the features using statistics from the <em>training set only</em>, to avoid data leakage. Neural networks train much better when inputs are roughly zero-mean with unit variance.</li>
  <li>Convert to tensors: float32 features and long labels.</li>
</ol>

<h3>Training mode versus evaluation mode</h3>
<p>Some layers behave differently during training and inference. <strong>Dropout</strong> (next lesson) randomly zeroes activations during training but must be switched off for predictions. <strong>BatchNorm</strong> uses batch statistics during training and stored running averages at inference. PyTorch controls this with a mode flag:</p>
<ul>
  <li><code>model.train()</code>: training behaviour (the default after you create a model).</li>
  <li><code>model.eval()</code>: inference behaviour.</li>
</ul>
<p>The flag does <em>not</em> turn off gradient tracking. That is a separate job for <code>torch.no_grad()</code> (or <code>torch.inference_mode()</code>). For evaluation you normally use both: <code>model.eval()</code> for correct layer behaviour and <code>no_grad</code> for speed and memory. Then switch back with <code>model.train()</code> before training continues.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

torch.manual_seed(0)
torch.set_num_threads(1)

X, y = load_digits(return_X_y=True)          # 1797 images, 64 pixels each
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0, stratify=y)
scaler = StandardScaler().fit(X_train)       # fit on training data only
X_train = torch.tensor(scaler.transform(X_train), dtype=torch.float32)
X_test = torch.tensor(scaler.transform(X_test), dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)

train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=64, shuffle=True)
test_loader = DataLoader(TensorDataset(X_test, y_test), batch_size=256)

model = nn.Sequential(
    nn.Linear(64, 128), nn.ReLU(),
    nn.Linear(128, 64), nn.ReLU(),
    nn.Linear(64, 10),            # 10 logits, one per digit
)
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

def evaluate(model, loader):
    model.eval()                              # inference behaviour
    correct, total, loss_sum = 0, 0, 0.0
    with torch.no_grad():                     # no graph, faster
        for xb, yb in loader:
            logits = model(xb)
            loss_sum += loss_fn(logits, yb).item() * len(xb)
            correct += (logits.argmax(dim=1) == yb).sum().item()
            total += len(xb)
    return loss_sum / total, correct / total

for epoch in range(1, 16):
    model.train()                             # back to training behaviour
    running = 0.0
    for xb, yb in train_loader:
        logits = model(xb)
        loss = loss_fn(logits, yb)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running += loss.item() * len(xb)
    if epoch % 3 == 0:
        val_loss, val_acc = evaluate(model, test_loader)
        print(f"epoch {epoch:2d}  train loss {running / len(X_train):.4f}  "
              f"test loss {val_loss:.4f}  test acc {val_acc:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch  3  train loss 0.5912  test loss 0.4410  test acc 0.906
epoch  6  train loss 0.1276  test loss 0.1834  test acc 0.950
epoch  9  train loss 0.0594  test loss 0.1340  test acc 0.967
epoch 12  train loss 0.0331  test loss 0.1189  test acc 0.969
epoch 15  train loss 0.0197  test loss 0.1112  test acc 0.969</code></pre>
<p>In a few seconds on a CPU the MLP reaches about 97% test accuracy on digits it has never seen. Notice that the training loss keeps falling while the test loss levels off. The gap between them is the first sign of <strong>overfitting</strong>, which the next lesson tackles.</p>

<h3>Inspecting predictions</h3>
<p>Accuracy alone hides <em>which</em> mistakes the model makes. Because the outputs are logits, softmax turns them into confidence scores, and the scikit-learn tools you already know work on the predictions:</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix

torch.manual_seed(0)
torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)
sc = StandardScaler().fit(X_tr)
X_tr = torch.tensor(sc.transform(X_tr), dtype=torch.float32)
X_te = torch.tensor(sc.transform(X_te), dtype=torch.float32)
y_tr = torch.tensor(y_tr)

model = nn.Sequential(nn.Linear(64, 64), nn.ReLU(), nn.Linear(64, 10))
opt = torch.optim.Adam(model.parameters(), lr=3e-3)
for epoch in range(60):                       # full-batch training: tiny dataset
    loss = nn.functional.cross_entropy(model(X_tr), y_tr)
    opt.zero_grad(); loss.backward(); opt.step()

model.eval()
with torch.no_grad():
    probs = torch.softmax(model(X_te), dim=1)
conf, pred = probs.max(dim=1)
print("test accuracy:", round((pred.numpy() == y_te).mean(), 3))
print("first 8 predictions:", pred[:8].tolist())
print("their confidence  :", [round(c, 2) for c in conf[:8].tolist()])
print("confusion matrix (rows = true digit):")
print(confusion_matrix(y_te, pred.numpy()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">test accuracy: 0.956
first 8 predictions: [7, 6, 3, 7, 7, 3, 2, 8]
their confidence  : [0.92, 0.99, 0.96, 0.99, 0.96, 0.92, 0.99, 0.68]
confusion matrix (rows = true digit):
[[36  0  0  0  0  0  0  0  0  0]
 [ 0 35  0  0  0  0  0  0  1  0]
 [ 0  2 33  0  0  0  0  0  0  0]
 [ 0  0  1 35  0  0  0  1  0  0]
 [ 0  0  0  0 34  0  0  0  2  0]
 [ 0  0  0  1  0 36  0  0  0  0]
 [ 0  1  0  0  0  0 35  0  0  0]
 [ 0  0  0  0  0  0  0 36  0  0]
 [ 0  3  0  0  0  0  0  0 32  0]
 [ 0  1  0  1  0  1  0  0  1 32]]</code></pre>
<p>The diagonal holds the correct predictions. Off-diagonal entries show which digits get confused, often between digits whose strokes look alike, such as 8, 2 and 9 being mistaken for 1. <code>nn.functional.cross_entropy</code> is the function form of <code>nn.CrossEntropyLoss</code>. Both are fine.</p>

<div class="callout warn"><strong>Common mistake:</strong> evaluating without <code>model.eval()</code>. With dropout or batch normalization in the model, your validation numbers become noisy and pessimistic, and predictions are not reproducible. The opposite mistake is just as common: forgetting <code>model.train()</code> after evaluation, which silently disables dropout for the rest of training. Put both calls at the start of your train and evaluate functions, as above, so the mode is always right.</div>
<div class="callout tip"><strong>Tip:</strong> Always compare against a simple baseline. Logistic regression on standardized digits reaches about 96 to 97% as well. For small tabular problems, classical models are often as good as neural networks and much simpler. Neural networks pull ahead with large datasets and with raw, unstructured inputs such as images, audio and text.</div>
`,
          keyPoints: [
            "A Dataset returns one sample by index; a DataLoader batches and shuffles it (shuffle for training only).",
            "Standardize features using training-set statistics only, then convert to float32 features and long labels.",
            "model.eval() switches layers like dropout/batchnorm to inference behaviour; torch.no_grad() disables gradient tracking. Use both for evaluation.",
            "Call model.train() again before resuming training.",
            "Track training and validation metrics every epoch; a growing gap signals overfitting."
          ],
          exercise: {
            prompt: String.raw`<p>Write a custom <code>Dataset</code> class <code>DigitsDataset</code> that takes NumPy arrays X and y in its constructor and returns <code>(float32 tensor of 64 features, long label)</code> from <code>__getitem__</code>. Split the digits 80/20 (stratified, random_state=1), scale the features by dividing by 16, and train a 64-32-10 MLP with SGD (lr=0.1, momentum=0.9) for 10 epochs, batch size 32. Report test accuracy after epochs 5 and 10.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.manual_seed(0)
torch.set_num_threads(1)

class DigitsDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X / 16.0, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.long)
    def __len__(self):
        return len(self.y)
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

X, y = load_digits(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=1, stratify=y)
train_dl = DataLoader(DigitsDataset(X_tr, y_tr), batch_size=32, shuffle=True)
test_ds = DigitsDataset(X_te, y_te)

model = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))
opt = torch.optim.SGD(model.parameters(), lr=0.1, momentum=0.9)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(1, 11):
    model.train()
    for xb, yb in train_dl:
        loss = loss_fn(model(xb), yb)
        opt.zero_grad(); loss.backward(); opt.step()
    if epoch in (5, 10):
        model.eval()
        with torch.no_grad():
            acc = (model(test_ds.X).argmax(1) == test_ds.y).float().mean().item()
        print(f"epoch {epoch}: test accuracy {acc:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch 5: test accuracy 0.931
epoch 10: test accuracy 0.969</code></pre>
<p>Dividing by 16 maps the pixels into [0, 1], a simple alternative to StandardScaler that needs no fitting. Because the whole test set is small, the solution evaluates it as one tensor instead of through a loader.</p>`
          },
          quiz: [
            { q: "Which two methods must a map-style PyTorch Dataset implement?", options: ["forward and backward", "__len__ and __getitem__", "fit and transform", "train and eval"], answer: 1, explain: "__len__ gives the number of samples and __getitem__ returns one sample by index. The DataLoader calls them to build batches." },
            { q: "What does model.eval() do?", options: ["Disables gradient computation", "Switches layers such as dropout and batch norm to inference behaviour", "Evaluates the model on the test set", "Freezes the weights permanently"], answer: 1, explain: "eval() only sets the mode flag that changes layer behaviour. Disabling gradients is done separately with torch.no_grad()." },
            { q: "Why fit StandardScaler on the training split only?", options: ["It is faster", "Using test-set statistics leaks information about the test data into training", "PyTorch requires it", "The test set has no features"], answer: 1, explain: "Using the test set's mean and variance lets information from it influence training, so test scores become optimistic. This is the same leakage rule as in classical ML pipelines." },
            { q: "Should the test DataLoader use shuffle=True?", options: ["Yes, always", "No, shuffling is only needed for training; evaluation order does not matter", "Yes, otherwise accuracy is wrong", "Only on the GPU"], answer: 1, explain: "Shuffling gives each training epoch different batches, which helps SGD. Evaluation metrics are the same in any order, so shuffling there just costs reproducibility." }
          ]
        },
        {
          id: "dl-pytorch-regularization",
          title: "Overfitting Remedies, Checkpointing and Devices",
          minutes: 55,
          objectives: [
            "Recognize overfitting in training and validation curves",
            "Apply dropout, weight decay and early stopping in PyTorch",
            "Save and load models with state_dict for inference and for resuming training",
            "Write device-agnostic code that runs on CPU or GPU"
          ],
          body: String.raw`
<p>Neural networks have so many parameters that they can memorize training data, including its noise, instead of learning patterns that generalize. You met overfitting in the classical ML track. This lesson covers the three remedies used most in deep learning, then two practical skills every deployed model needs: saving and loading weights, and running on the right hardware.</p>

<h3>Recognizing overfitting</h3>
<p>Watch two curves during training. The training loss almost always keeps going down. The validation loss goes down at first, then flattens and starts to rise. The point where they part is where the model stops learning general patterns and starts memorizing. The larger the model relative to the data, the sooner this happens. A small training set with a big model is the classic setup for overfitting.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.manual_seed(0)
torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
# deliberately tiny training set + big model = overfitting
X_tr, X_va, y_tr, y_va = train_test_split(X / 16.0, y, train_size=150, random_state=0, stratify=y)
X_tr, X_va = torch.tensor(X_tr, dtype=torch.float32), torch.tensor(X_va, dtype=torch.float32)
y_tr, y_va = torch.tensor(y_tr), torch.tensor(y_va)

def run(model, weight_decay=0.0, epochs=300):
    opt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=weight_decay)
    for epoch in range(1, epochs + 1):
        model.train()
        loss = nn.functional.cross_entropy(model(X_tr), y_tr)
        opt.zero_grad(); loss.backward(); opt.step()
        if epoch % 100 == 0:
            model.eval()
            with torch.no_grad():
                out = model(X_va)
                va_loss = nn.functional.cross_entropy(out, y_va).item()
                va_acc = (out.argmax(1) == y_va).float().mean().item()
            print(f"  epoch {epoch}: train loss {loss.item():.4f}  val loss {va_loss:.4f}  val acc {va_acc:.3f}")

print("plain MLP:")
torch.manual_seed(0)
run(nn.Sequential(nn.Linear(64, 512), nn.ReLU(), nn.Linear(512, 512), nn.ReLU(), nn.Linear(512, 10)))

print("with dropout(0.5) + weight decay 0.1:")
torch.manual_seed(0)
run(nn.Sequential(nn.Linear(64, 512), nn.ReLU(), nn.Dropout(0.5),
                  nn.Linear(512, 512), nn.ReLU(), nn.Dropout(0.5), nn.Linear(512, 10)),
    weight_decay=0.1)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">plain MLP:
  epoch 100: train loss 0.0019  val loss 0.4249  val acc 0.915
  epoch 200: train loss 0.0007  val loss 0.4492  val acc 0.918
  epoch 300: train loss 0.0003  val loss 0.4651  val acc 0.917
with dropout(0.5) + weight decay 0.1:
  epoch 100: train loss 0.0314  val loss 0.3359  val acc 0.918
  epoch 200: train loss 0.0090  val loss 0.3265  val acc 0.927
  epoch 300: train loss 0.0073  val loss 0.3624  val acc 0.923</code></pre>
<p>Without regularization, the training loss heads to almost zero (memorization), while the validation loss bottoms out and then creeps back up as the model grows over-confident on examples it gets wrong. With dropout and weight decay the training loss stays higher, because the model has a harder job, and the validation loss stays lower. Results on such a tiny dataset vary from run to run, so always compare on a validation set rather than trusting a rule of thumb.</p>

<h3>Remedy 1: Dropout</h3>
<p>During training, <code>nn.Dropout(p)</code> sets each activation to zero with probability <code>p</code> (commonly 0.1 to 0.5) on every forward pass, and scales the survivors by <code>1/(1-p)</code> so the expected total stays the same. Each step therefore trains a different random "thinned" sub-network. Neurons cannot rely on any particular partner being present, so they learn more robust, redundant features. One analogy: a team where anyone might be absent on a given day, so everyone must understand the whole project. At inference (<code>model.eval()</code>) dropout does nothing and the full network is used. That is why the mode switch matters.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

drop = nn.Dropout(p=0.5)
x = torch.ones(1, 8)
drop.train()
print("train mode:", drop(x))
drop.eval()
print("eval mode :", drop(x))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">train mode: tensor([[0., 0., 2., 0., 0., 0., 2., 2.]])
eval mode : tensor([[1., 1., 1., 1., 1., 1., 1., 1.]])</code></pre>

<h3>Remedy 2: Weight decay (L2 regularization)</h3>
<p>Weight decay shrinks every weight a little towards zero at each step, which keeps the weights small. Small weights give smoother functions that are less able to fit noise. It is the neural-network version of Ridge regression's L2 penalty. With plain SGD, adding <code>lambda * sum(w^2)</code> to the loss is equivalent. With Adam it is not, because Adam rescales the gradients. Use <strong>AdamW</strong>, which applies the decay directly to the weights ("decoupled"): <code>torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)</code>. Typical values are 0.01 to 0.1.</p>

<h3>Remedy 3: Early stopping</h3>
<p>Monitor the validation loss after every epoch. Keep a copy of the best weights so far, and stop when the validation loss has not improved for <code>patience</code> epochs (for example 5). Then restore the best weights. Early stopping is cheap, needs no change to the model, and is used almost everywhere. The code below shows it together with checkpointing.</p>

<h3>Other remedies</h3>
<ul>
  <li><strong>More data</strong> is the best regularizer. <strong>Data augmentation</strong> creates more of it artificially: random crops, flips and rotations for images, or synonym swaps and back-translation for text.</li>
  <li><strong>A smaller model</strong> (fewer layers or units).</li>
  <li><strong>Normalization layers</strong> (BatchNorm for CNNs, LayerNorm for transformers) mainly stabilize training, and have a mild regularizing effect.</li>
  <li><strong>Transfer learning</strong>: start from a model pretrained on lots of data (covered in the next module).</li>
</ul>

<h3>Saving and loading: the state_dict</h3>
<p>A model's <strong>state_dict</strong> is an ordered dictionary that maps each parameter and buffer name (such as <code>0.weight</code>) to its tensor. The recommended way to save a model is to save its state_dict, not the whole model object. Pickling the object ties the file to your exact code layout. To load, build the same architecture in code, then load the weights into it.</p>
<p>To <em>resume training</em> later, save a <strong>checkpoint</strong> that also holds the optimizer's state_dict (Adam's m and v buffers), the epoch number, and the best validation score.</p>

<pre><code class="lang-python runnable">import copy
import torch
from torch import nn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.manual_seed(0)
torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
X_tr, X_va, y_tr, y_va = train_test_split(X / 16.0, y, test_size=0.3, random_state=0, stratify=y)
X_tr, X_va = torch.tensor(X_tr, dtype=torch.float32), torch.tensor(X_va, dtype=torch.float32)
y_tr, y_va = torch.tensor(y_tr), torch.tensor(y_va)

def make_model():
    return nn.Sequential(nn.Linear(64, 128), nn.ReLU(), nn.Dropout(0.2), nn.Linear(128, 10))

model = make_model()
opt = torch.optim.AdamW(model.parameters(), lr=3e-3, weight_decay=0.01)
best_loss, best_state, patience, bad_epochs = float("inf"), None, 5, 0

for epoch in range(1, 201):
    model.train()
    for i in torch.randperm(len(X_tr)).split(64):      # simple manual mini-batching
        loss = nn.functional.cross_entropy(model(X_tr[i]), y_tr[i])
        opt.zero_grad(); loss.backward(); opt.step()
    model.eval()
    with torch.no_grad():
        val_loss = nn.functional.cross_entropy(model(X_va), y_va).item()
    if val_loss &lt; best_loss - 1e-4:
        best_loss, bad_epochs = val_loss, 0
        best_state = copy.deepcopy(model.state_dict())  # remember the best weights
    else:
        bad_epochs += 1
        if bad_epochs &gt;= patience:
            print(f"early stop at epoch {epoch}; best val loss {best_loss:.4f}")
            break

model.load_state_dict(best_state)                       # restore the best weights

# ---- save a checkpoint (weights + optimizer + metadata)
torch.save({"model": model.state_dict(), "optimizer": opt.state_dict(),
            "epoch": epoch, "best_val_loss": best_loss}, "digits_ckpt.pt")
print("state_dict keys:", list(model.state_dict().keys()))

# ---- later, in a different process: rebuild the architecture, then load the weights
restored = make_model()
ckpt = torch.load("digits_ckpt.pt", map_location="cpu")
restored.load_state_dict(ckpt["model"])
restored.eval()
with torch.no_grad():
    acc = (restored(X_va).argmax(1) == y_va).float().mean().item()
print(f"restored model val acc {acc:.3f} (checkpoint from epoch {ckpt['epoch']})")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">early stop at epoch 43; best val loss 0.0684
state_dict keys: ['0.weight', '0.bias', '3.weight', '3.bias']
restored model val acc 0.980 (checkpoint from epoch 43)</code></pre>
<div class="callout warn"><strong>Common mistakes with checkpoints:</strong> (1) Storing <code>model.state_dict()</code> as the "best" without <code>copy.deepcopy</code>. The dictionary holds references to the live tensors, so it keeps changing as training continues. (2) Forgetting <code>model.eval()</code> after loading for inference. (3) Loading into an architecture that differs from the saved one, which gives "Missing key(s)" or "size mismatch" errors.</div>

<h3>Devices: CPU and GPU</h3>
<p>A GPU has thousands of simple cores built for exactly the large, parallel matrix multiplications that neural networks consist of. Training that takes days on a CPU can take hours on a GPU. PyTorch makes the hardware a parameter: pick a <strong>device</strong>, then move both the model and every batch of data to it with <code>.to(device)</code>. All tensors in one operation must be on the same device, or you get <em>"Expected all tensors to be on the same device"</em>.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn

if torch.cuda.is_available():
    device = torch.device("cuda")            # NVIDIA GPU
elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
    device = torch.device("mps")             # Apple Silicon GPU
else:
    device = torch.device("cpu")
print("using device:", device.type)

model = nn.Linear(64, 10).to(device)          # moves the parameters
xb = torch.randn(32, 64).to(device)           # move every batch, too
print("output on:", model(xb).device.type)
# When loading weights saved on a GPU machine onto a CPU-only one, use:
# torch.load("ckpt.pt", map_location="cpu")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">using device: cpu
output on: cpu</code></pre>
<p>This course's runnable examples use the CPU, which is plenty for small datasets. In a GPU training loop, add <code>xb, yb = xb.to(device), yb.to(device)</code> as the first line inside the batch loop. Results must come back to the CPU (<code>.cpu()</code>) before you call <code>.numpy()</code>. For deployment, CPU inference is often fine for small models. LLMs need GPUs (or specialized accelerators such as AWS Inferentia), which is why the AWS and AI Engineering tracks spend time on instance types and inference optimization.</p>
`,
          keyPoints: [
            "Overfitting shows as falling training loss with flat or rising validation loss.",
            "Dropout randomly zeroes activations in training only; model.eval() turns it off.",
            "Use AdamW for weight decay; early stopping keeps the best validation weights.",
            "Save state_dicts (and optimizer state for resuming); rebuild the architecture, then load_state_dict.",
            "Move the model and every batch to the same device with .to(device); use map_location when loading across devices."
          ],
          exercise: {
            prompt: String.raw`<p>Using the digits data, write a function <code>train(dropout_p, weight_decay)</code> that trains a 64-256-256-10 MLP (with <code>nn.Dropout(dropout_p)</code> after each hidden ReLU) on only 300 training samples for 200 full-batch epochs with AdamW (lr=1e-3). It should return the final validation accuracy. Compare (0.0, 0.0) with (0.3, 0.05). Then save the better model's state_dict, reload it into a fresh model, and confirm the reloaded model gives identical predictions.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
X_tr, X_va, y_tr, y_va = train_test_split(X / 16.0, y, train_size=300, random_state=0, stratify=y)
X_tr, X_va = torch.tensor(X_tr, dtype=torch.float32), torch.tensor(X_va, dtype=torch.float32)
y_tr, y_va = torch.tensor(y_tr), torch.tensor(y_va)

def build(p):
    return nn.Sequential(nn.Linear(64, 256), nn.ReLU(), nn.Dropout(p),
                         nn.Linear(256, 256), nn.ReLU(), nn.Dropout(p), nn.Linear(256, 10))

def train(dropout_p, weight_decay):
    torch.manual_seed(0)
    model = build(dropout_p)
    opt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=weight_decay)
    for _ in range(200):
        model.train()
        loss = nn.functional.cross_entropy(model(X_tr), y_tr)
        opt.zero_grad(); loss.backward(); opt.step()
    model.eval()
    with torch.no_grad():
        acc = (model(X_va).argmax(1) == y_va).float().mean().item()
    return model, acc

results = {cfg: train(*cfg) for cfg in [(0.0, 0.0), (0.3, 0.05)]}
for cfg, (_, acc) in results.items():
    print(f"dropout={cfg[0]} weight_decay={cfg[1]}: val acc {acc:.3f}")

best_cfg = max(results, key=lambda c: results[c][1])
best_model = results[best_cfg][0]
torch.save(best_model.state_dict(), "best.pt")

fresh = build(best_cfg[0])
fresh.load_state_dict(torch.load("best.pt"))
fresh.eval()
with torch.no_grad():
    same = torch.equal(fresh(X_va), best_model(X_va))
print("best config:", best_cfg, "| reloaded predictions identical:", same)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">dropout=0.0 weight_decay=0.0: val acc 0.938
dropout=0.3 weight_decay=0.05: val acc 0.943
best config: (0.3, 0.05) | reloaded predictions identical: True</code></pre>
<p>Both models are in eval mode, so dropout is off and the forward pass is deterministic. That is why the reloaded predictions are bit-for-bit identical. With so little data the regularized model should match or beat the plain one. The exact gap depends on the split and seed, which is exactly why you measure it on validation data.</p>`
          },
          quiz: [
            { q: "Training loss keeps falling but validation loss has been rising for 10 epochs. What is happening?", options: ["Underfitting", "Overfitting", "The learning rate is too small", "A data loading bug"], answer: 1, explain: "When the curves diverge, the model is memorizing the training data rather than learning patterns that generalize. Regularize, get more data, or stop early." },
            { q: "What does nn.Dropout do in eval mode?", options: ["Drops the same neurons every time", "Nothing: it passes activations through unchanged", "Drops twice as many neurons", "Raises an error"], answer: 1, explain: "Dropout is only active in training mode. In eval mode the full network is used. Thanks to the 1/(1-p) scaling during training, no rescaling is needed at inference." },
            { q: "What is the recommended way to save a PyTorch model for later inference?", options: ["Pickle the whole model object", "Save model.state_dict() and later load it into a freshly built model of the same architecture", "Save the optimizer only", "Print the weights to a text file"], answer: 1, explain: "state_dicts are portable dictionaries of tensors. Rebuild the architecture in code, then call load_state_dict. Add the optimizer state to the checkpoint if you want to resume training." },
            { q: "You get 'Expected all tensors to be on the same device'. What is the likely cause?", options: ["The model is on the GPU but the input batch is still on the CPU", "The learning rate is too high", "You forgot zero_grad", "The dataset is too large"], answer: 0, explain: "Every tensor in an operation must live on the same device. Move both the model and each batch with .to(device)." },
            { q: "Why use AdamW instead of adding an L2 penalty to the loss with Adam?", options: ["AdamW is always faster", "Adam rescales gradients per parameter, which distorts an L2 penalty; AdamW applies decay directly to the weights", "Adam does not support regularization at all", "AdamW needs no learning rate"], answer: 1, explain: "Decoupled weight decay shrinks the weights directly, independent of Adam's adaptive scaling, which works better in practice. AdamW is the standard for transformers." }
          ]
        }
      ]
    },
    {
      id: "dl-architectures",
      title: "Core Architectures: CNNs, RNNs and Transfer Learning",
      summary: "Learn why architecture matters: convolutional networks for images, recurrent networks for sequences and their limits, transfer learning from pretrained models, and how to choose an architecture for your data.",
      lessons: [
        {
          id: "dl-arch-cnn",
          title: "Convolutional Neural Networks",
          minutes: 60,
          objectives: [
            "Explain why fully connected networks are a poor fit for images",
            "Compute a 2D convolution by hand and in NumPy, including output sizes with padding and stride",
            "Describe filters, feature maps, pooling and the feature hierarchy of a CNN",
            "Build and train a small CNN on 8x8 digits in PyTorch"
          ],
          body: String.raw`
<p>The MLP you trained on digits treats an image as a flat list of 64 numbers. It has no idea that pixel 10 sits right next to pixel 11, or that a "7" in the top-left corner is still a "7" when it moves to the bottom-right. For tiny 8x8 images this works acceptably. For a 224x224 colour photo (150,528 input values), a single dense layer of 1,000 neurons would need 150 million weights, and it would have to learn the same edge detector separately for every position. <strong>Convolutional neural networks (CNNs)</strong> fix both problems by building assumptions about images into the architecture.</p>

<h3>Two key ideas: locality and weight sharing</h3>
<ul>
  <li><strong>Locality:</strong> the meaningful patterns in an image, such as edges, corners and textures, are small and local. A neuron should look at a small patch (say 3x3 pixels), not the entire image.</li>
  <li><strong>Weight sharing (translation equivariance):</strong> a vertical edge looks the same anywhere in the image. So we slide <em>one</em> small set of weights, a <strong>filter</strong> (or <strong>kernel</strong>), across all positions. If the pattern moves, the detector's response moves with it.</li>
</ul>
<p>Assumptions like these, built into an architecture, are called <strong>inductive biases</strong>. They mean far fewer parameters, much less data needed, and better generalization on images.</p>

<h3>The convolution operation</h3>
<p>Place a small filter, for example 3x3, over the top-left corner of the image. Multiply each filter weight by the pixel under it, add up the 9 products, and add a bias. That number is one output value. Slide the filter one pixel to the right and repeat, then continue across every row. The grid of outputs is called a <strong>feature map</strong> (or activation map). It shows <em>where</em> in the image the filter's pattern appears.</p>

<figure><img src="assets/diagrams/dl-convolution.svg" alt="A 3x3 filter sliding over a 5x5 input image; each position produces one value of a 3x3 feature map as the sum of element-wise products"><figcaption>A 3x3 filter slides over the input; each position gives one feature-map value (the sum of element-wise products plus a bias).</figcaption></figure>

<p>Here is a vertical-edge detector at work. The filter has positive weights on the left column and negative weights on the right, so it responds strongly where bright pixels sit to the left of dark ones:</p>

<pre><code class="lang-python runnable">import numpy as np

def conv2d(image, kernel, stride=1, padding=0):
    if padding:
        image = np.pad(image, padding)                 # zero padding around the border
    kh, kw = kernel.shape
    out_h = (image.shape[0] - kh) // stride + 1
    out_w = (image.shape[1] - kw) // stride + 1
    out = np.zeros((out_h, out_w))
    for i in range(out_h):
        for j in range(out_w):
            patch = image[i * stride:i * stride + kh, j * stride:j * stride + kw]
            out[i, j] = np.sum(patch * kernel)         # multiply element-wise, then sum
    return out

# 6x6 image: bright left half (9), dark right half (0)
image = np.zeros((6, 6))
image[:, :3] = 9

vertical_edge = np.array([[1, 0, -1],
                          [1, 0, -1],
                          [1, 0, -1]])

print("feature map (no padding):")
print(conv2d(image, vertical_edge))
print("shape with padding=1:", conv2d(image, vertical_edge, padding=1).shape)
print("shape with stride=2 :", conv2d(image, vertical_edge, stride=2).shape)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">feature map (no padding):
[[ 0. 27. 27.  0.]
 [ 0. 27. 27.  0.]
 [ 0. 27. 27.  0.]
 [ 0. 27. 27.  0.]]
shape with padding=1: (6, 6)
shape with stride=2 : (2, 2)</code></pre>
<p>The feature map lights up (value 27) exactly in the columns where the bright-to-dark edge is, and is 0 in the flat regions. In a CNN nobody designs filters like this by hand. The filter weights are parameters learned by backpropagation, and the network discovers whichever detectors reduce the loss.</p>

<div class="callout info"><strong>Terminology:</strong> what deep learning calls "convolution" is strictly <em>cross-correlation</em>, because the kernel is not flipped. The difference does not matter when the kernel is learned.</div>

<h3>Output size: padding and stride</h3>
<p>For an input of size n, a kernel of size k, padding p and stride s, the output size is:</p>
<p><code>out = floor((n + 2p - k) / s) + 1</code></p>
<ul>
  <li>No padding shrinks the output: a 6x6 input with a 3x3 kernel gives 4x4. "Same" padding, <code>p = (k-1)/2</code>, which is 1 for a 3x3 kernel, keeps the size unchanged. That is why <code>padding=1</code> appears everywhere.</li>
  <li><strong>Stride</strong> s jumps s pixels per step. Stride 2 roughly halves the height and width.</li>
</ul>

<h3>Channels: many filters, many inputs</h3>
<p>A colour image has 3 input <strong>channels</strong> (red, green, blue), so a filter is really 3x3x3: it spans every input channel and sums over all of them. A convolutional layer learns many filters, for example 16, each producing its own feature map. The output therefore has 16 channels. In PyTorch, <code>nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3)</code> has 16 x (3 x 3 x 3) weights + 16 biases = 448 parameters, <em>whatever the image size</em>. Compare that with the 150 million weights of the dense layer above. Image tensors in PyTorch have the shape <strong>(N, C, H, W)</strong>: batch, channels, height, width.</p>

<h3>Pooling: summarize and shrink</h3>
<p>A <strong>pooling</strong> layer downsamples each feature map. <strong>Max pooling</strong> with a 2x2 window and stride 2 keeps the largest value in each 2x2 block and halves the height and width. This reduces computation, and it makes the representation tolerant to small shifts: if an edge moves by one pixel, the maximum in its block often stays the same. Pooling has no parameters. Modern architectures sometimes use stride-2 convolutions instead, and finish with <strong>global average pooling</strong>, which averages each channel down to a single number.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn

x = torch.tensor([[[[1., 3., 2., 0.],
                    [4., 6., 1., 1.],
                    [0., 2., 9., 8.],
                    [1., 1., 7., 5.]]]])        # shape (N=1, C=1, H=4, W=4)
print("max pool 2x2:\n", nn.MaxPool2d(2)(x)[0, 0])
print("avg pool 2x2:\n", nn.AvgPool2d(2)(x)[0, 0])

conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
print("conv params:", sum(p.numel() for p in conv.parameters()))
print("output shape for a (8, 3, 32, 32) batch:", tuple(conv(torch.randn(8, 3, 32, 32)).shape))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">max pool 2x2:
 tensor([[6., 2.],
        [2., 9.]])
avg pool 2x2:
 tensor([[3.5000, 1.0000],
        [1.0000, 7.2500]])
conv params: 448
output shape for a (8, 3, 32, 32) batch: (8, 16, 32, 32)</code></pre>

<h3>Feature hierarchies</h3>
<p>A CNN stacks blocks of the form <em>convolution, then ReLU, then pooling</em>. Each block sees a larger region of the original image. This region is called its <strong>receptive field</strong>, and it grows because each pooled pixel summarizes a wider area. As a result, features become more abstract with depth:</p>
<ol>
  <li>Early layers learn edges, colour blobs and simple textures, much like the edge filter above.</li>
  <li>Middle layers combine them into corners, curves and repeating patterns.</li>
  <li>Deep layers respond to object parts, such as eyes, wheels or letters, and finally whole objects.</li>
</ol>
<p>At the end, the feature maps are flattened (or globally pooled) and passed to one or more dense layers that produce class logits. This is the template behind famous architectures: LeNet (1998, digits), AlexNet (2012, the ImageNet breakthrough that started the deep learning boom), VGG, and ResNet (2015). ResNet introduced <strong>residual connections</strong>, <code>output = x + F(x)</code>, which let networks with more than 100 layers train. The transformer reuses this exact trick.</p>

<h3>A small CNN on 8x8 digits</h3>
<pre><code class="lang-python runnable">import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.manual_seed(0)
torch.set_num_threads(1)

X, y = load_digits(return_X_y=True)
X = X.reshape(-1, 1, 8, 8) / 16.0            # (N, channels=1, height=8, width=8), scaled to 0..1
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0, stratify=y)
X_train = torch.tensor(X_train, dtype=torch.float32)
X_test = torch.tensor(X_test, dtype=torch.float32)
y_train = torch.tensor(y_train)
y_test = torch.tensor(y_test)

class SmallCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),   # (N,16,8,8)
            nn.ReLU(),
            nn.MaxPool2d(2),                              # (N,16,4,4)
            nn.Conv2d(16, 32, kernel_size=3, padding=1),  # (N,32,4,4)
            nn.ReLU(),
            nn.MaxPool2d(2),                              # (N,32,2,2)
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),                                 # (N,128)
            nn.Linear(32 * 2 * 2, 10),
        )

    def forward(self, x):
        return self.classifier(self.features(x))

model = SmallCNN()
print("parameters:", sum(p.numel() for p in model.parameters()))
print("output shape for a batch of 5:", tuple(model(X_train[:5]).shape))

loader = DataLoader(TensorDataset(X_train, y_train), batch_size=64, shuffle=True)
optimizer = torch.optim.Adam(model.parameters(), lr=3e-3)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(1, 11):
    model.train()
    for xb, yb in loader:
        loss = loss_fn(model(xb), yb)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    if epoch % 2 == 0:
        model.eval()
        with torch.no_grad():
            acc = (model(X_test).argmax(1) == y_test).float().mean().item()
        print(f"epoch {epoch:2d}  last batch loss {loss.item():.4f}  test acc {acc:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">parameters: 6090
output shape for a batch of 5: (5, 10)
epoch  2  last batch loss 0.7730  test acc 0.850
epoch  4  last batch loss 0.0901  test acc 0.917
epoch  6  last batch loss 0.1931  test acc 0.967
epoch  8  last batch loss 0.0661  test acc 0.964
epoch 10  last batch loss 0.0647  test acc 0.956</code></pre>
<p>This CNN has about a third of the parameters of the 17,226-parameter MLP from the PyTorch module and reaches a similar test accuracy (around 96%) in 10 epochs. On 8x8 images the advantage is small. On realistic photos, CNNs beat MLPs by a huge margin, because their inductive biases fit images and their parameter count does not grow with image size.</p>

<div class="callout warn"><strong>Common shape mistakes with CNNs:</strong> (1) Feeding images as (N, H, W) or (N, H, W, C). PyTorch convolutions need (N, C, H, W), so add the channel dimension with <code>unsqueeze(1)</code> or <code>reshape(-1, 1, 8, 8)</code>, or reorder with <code>permute(0, 3, 1, 2)</code>. (2) Getting the <code>nn.Linear</code> input size wrong after <code>Flatten</code>. Work it out with the output-size formula, or pass a dummy batch through <code>model.features</code> and print its shape, as the comments above do.</div>
<div class="callout tip"><strong>Tip:</strong> For real image problems you will rarely train a CNN from scratch. You will start from a pretrained network such as ResNet or EfficientNet, or a Vision Transformer, and adapt it (see the transfer learning lesson). Data augmentation, meaning random flips, crops and colour changes, is the other standard ingredient.</div>
`,
          keyPoints: [
            "CNNs use local filters with shared weights, giving far fewer parameters and translation-aware features.",
            "A convolution slides a filter over the input and sums element-wise products into a feature map.",
            "Output size = floor((n + 2p - k) / s) + 1; padding=1 with a 3x3 kernel keeps the size unchanged.",
            "Pooling downsamples feature maps; stacked conv blocks build a hierarchy from edges to objects.",
            "PyTorch images are (N, C, H, W); check the flatten size with a dummy forward pass."
          ],
          exercise: {
            prompt: String.raw`<p>(a) Using the <code>conv2d</code> function from the lesson, apply a <em>horizontal</em> edge filter to a 6x6 image whose top half is 9 and bottom half 0, and print the feature map. (b) Work out by hand the output shape of <code>nn.Conv2d(3, 8, kernel_size=5, stride=2, padding=2)</code> on a (4, 3, 32, 32) batch and its parameter count. Then verify both in PyTorch.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import torch
from torch import nn

def conv2d(image, kernel):
    kh, kw = kernel.shape
    out = np.zeros((image.shape[0] - kh + 1, image.shape[1] - kw + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = np.sum(image[i:i + kh, j:j + kw] * kernel)
    return out

image = np.zeros((6, 6)); image[:3, :] = 9
horizontal_edge = np.array([[1, 1, 1], [0, 0, 0], [-1, -1, -1]])
print(conv2d(image, horizontal_edge))

conv = nn.Conv2d(3, 8, kernel_size=5, stride=2, padding=2)
print("shape:", tuple(conv(torch.randn(4, 3, 32, 32)).shape))
print("params:", sum(p.numel() for p in conv.parameters()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[ 0.  0.  0.  0.]
 [27. 27. 27. 27.]
 [27. 27. 27. 27.]
 [ 0.  0.  0.  0.]]
shape: (4, 8, 16, 16)
params: 608</code></pre>
<p>(a) The filter's positive top row and negative bottom row respond (value 27) in the rows where the bright-to-dark boundary sits. (b) Output size = floor((32 + 2*2 - 5) / 2) + 1 = floor(31 / 2) + 1 = 16, so the shape is (4, 8, 16, 16). Parameters = 8 filters x (3 x 5 x 5) weights + 8 biases = 600 + 8 = 608.</p>`
          },
          quiz: [
            { q: "What is the main advantage of weight sharing in convolutional layers?", options: ["It makes the network deeper", "The same feature detector works at every position, with far fewer parameters", "It removes the need for activation functions", "It increases the image resolution"], answer: 1, explain: "One filter slides over the whole image, so its parameter count does not depend on image size, and a pattern is detected wherever it appears." },
            { q: "A 28x28 input passes through a 3x3 convolution with padding 0 and stride 1. What is the output size?", options: ["28x28", "26x26", "25x25", "14x14"], answer: 1, explain: "(28 + 0 - 3)/1 + 1 = 26. With padding=1 the size would stay 28x28." },
            { q: "What does 2x2 max pooling with stride 2 do to a (N, 16, 8, 8) tensor?", options: ["Produces (N, 16, 4, 4) by keeping the maximum of each 2x2 block", "Produces (N, 8, 8, 8)", "Produces (N, 32, 4, 4)", "Learns 16 new filters"], answer: 0, explain: "Pooling acts on each channel independently and halves the height and width. It has no learnable parameters and does not change the number of channels." },
            { q: "In what shape does PyTorch expect a batch of images for nn.Conv2d?", options: ["(N, H, W, C)", "(N, C, H, W)", "(H, W, C)", "(C, N, H, W)"], answer: 1, explain: "PyTorch uses channels-first: batch, channels, height, width. Images loaded as HWC (e.g. with PIL/NumPy) need permute(0, 3, 1, 2)." }
          ]
        },
        {
          id: "dl-arch-rnn",
          title: "Recurrent Networks, LSTMs and Their Limits",
          minutes: 50,
          objectives: [
            "Explain how a recurrent neural network processes a sequence with a hidden state",
            "Implement an RNN cell's forward pass in NumPy",
            "Describe how LSTM gates address vanishing gradients",
            "Use nn.LSTM with correct tensor shapes, and explain why transformers replaced RNNs"
          ],
          body: String.raw`
<p>Images have a fixed size. Many kinds of data are <strong>sequences</strong> instead: words in a sentence, notes in a melody, sensor readings over time, daily sales. Sequences vary in length, and their order carries meaning: "dog bites man" is not "man bites dog". Before transformers took over (from 2017), <strong>recurrent neural networks (RNNs)</strong> and their improved version, the <strong>LSTM</strong>, were the standard sequence models. They powered early Google Translate, speech recognition and keyboard autocomplete. Knowing how they work, and why they hit a wall, is the best way to understand why attention was such a breakthrough.</p>

<h3>The idea: a network with memory</h3>
<p>An RNN reads a sequence one element at a time. At each step t it combines the current input <code>x_t</code> with a <strong>hidden state</strong> <code>h_(t-1)</code>, a vector that summarizes everything seen so far, and produces a new hidden state:</p>
<p><code>h_t = tanh(x_t @ W_x + h_(t-1) @ W_h + b)</code></p>
<p>The same weights <code>W_x</code>, <code>W_h</code> and <code>b</code> are used at every time step. This is weight sharing over time, just as CNNs share weights over space. It is like reading a book while keeping a running mental summary: every new sentence updates the summary, and the summary affects how you read the next sentence. After the last element, <code>h_T</code> is a fixed-size vector that summarizes the entire sequence. You can feed it to a classifier (for example, sentiment of a review), or produce an output at every step (for example, a tag for every word).</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

input_size, hidden_size = 3, 4
W_x = np.random.randn(input_size, hidden_size) * 0.5
W_h = np.random.randn(hidden_size, hidden_size) * 0.5
b = np.zeros(hidden_size)

sequence = np.random.randn(5, input_size)       # 5 time steps, 3 features each
h = np.zeros(hidden_size)                       # initial hidden state
for t, x_t in enumerate(sequence):
    h = np.tanh(x_t @ W_x + h @ W_h + b)        # same weights at every step
    print(f"t={t}  h={np.round(h, 3)}")

print("final summary vector shape:", h.shape)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">t=0  h=[ 0.991 -0.362  0.898  0.938]
t=1  h=[-0.352 -0.186  0.191 -0.782]
t=2  h=[-0.926  0.626 -0.05   0.475]
t=3  h=[ 0.892 -0.114  0.258  0.61 ]
t=4  h=[-0.913 -0.158 -0.764 -0.979]
final summary vector shape: (4,)</code></pre>

<h3>Training: backpropagation through time</h3>
<p>To train an RNN, we "unroll" it into a long feed-forward network with one copy of the cell per time step, all sharing weights, and run ordinary backpropagation through it. This is called <strong>backpropagation through time (BPTT)</strong>. The gradient that reaches step 1 from a loss at step 100 has been multiplied by the recurrent weights and the tanh derivative 99 times. Factors smaller than 1 shrink it towards zero (<strong>vanishing gradients</strong>). Factors larger than 1 blow it up (<strong>exploding gradients</strong>, usually handled with gradient clipping). In practice, a plain RNN struggles to learn dependencies more than about 10 to 20 steps apart. In "The <em>keys</em> to the old house by the lake <em>are</em> missing", it may fail to link "are" back to "keys".</p>

<h3>LSTM: gates that control memory</h3>
<p>The <strong>Long Short-Term Memory</strong> network (Hochreiter and Schmidhuber, 1997) adds a separate <strong>cell state</strong> <code>c_t</code>. Think of it as a conveyor belt that runs through the whole sequence and carries information with only small, controlled changes. Three <strong>gates</strong>, each a small sigmoid layer producing values between 0 ("block") and 1 ("let through"), decide what happens to it:</p>
<ul>
  <li><strong>Forget gate</strong> <code>f_t</code>: how much of the old cell state to keep.</li>
  <li><strong>Input gate</strong> <code>i_t</code>: how much of the new candidate information <code>g_t</code> to write.</li>
  <li><strong>Output gate</strong> <code>o_t</code>: how much of the cell state to expose as the hidden state.</li>
</ul>
<p>The update is <code>c_t = f_t * c_(t-1) + i_t * g_t</code> and <code>h_t = o_t * tanh(c_t)</code>. The important part is the <em>additive</em> update of <code>c_t</code>. When the forget gate is near 1, the gradient flows backwards along the cell state almost unchanged, much like a residual connection, so the network can carry information over hundreds of steps. The <strong>GRU</strong> (Gated Recurrent Unit) is a simpler variant with two gates that often performs similarly.</p>

<p>We can measure this directly. Below, we ask how strongly the <em>last</em> output depends on each <em>input</em> in a 50-step sequence: we take the gradient of the final output with respect to every input. For the LSTM, we start the forget gate mostly open, as practitioners often do by setting a positive forget-gate bias.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

T, H = 50, 32
x = torch.randn(1, T, 8, requires_grad=True)   # (batch, time, features)
rnn = nn.RNN(8, H, batch_first=True)
lstm = nn.LSTM(8, H, batch_first=True)
with torch.no_grad():
    lstm.bias_ih_l0[H:2 * H].fill_(3.0)    # forget-gate bias: start with the gate mostly open

for name, layer in [("RNN", rnn), ("LSTM", lstm)]:
    x.grad = None
    out, _ = layer(x)                  # out: (1, T, H)
    out[0, -1].sum().backward()        # how does the LAST output depend on each input?
    norms = x.grad[0].norm(dim=1)      # gradient size for each time step
    print(f"{name:4s} t=0: {norms[0]:.1e}  t=25: {norms[25]:.1e}  t=45: {norms[45]:.1e}  t=49: {norms[49]:.1e}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">RNN  t=0: 1.7e-13  t=25: 2.2e-07  t=45: 4.7e-02  t=49: 1.6e+00
LSTM t=0: 3.4e-01  t=25: 1.5e-01  t=45: 1.3e-01  t=49: 3.8e-01</code></pre>
<p>For the plain RNN, the influence of the first input on the last output is about 13 orders of magnitude smaller than that of the last input. In effect, the network cannot learn from the start of the sequence. For the LSTM, the gradient reaching t=0 is about as large as the gradient at the end. The cell state is carrying the signal.</p>

<h3>nn.LSTM in practice: shapes</h3>
<p>With <code>batch_first=True</code>, <code>nn.LSTM(input_size, hidden_size)</code> takes input of shape <strong>(N, T, input_size)</strong> and returns <code>output, (h_n, c_n)</code>. Here <code>output</code> is (N, T, hidden_size), the hidden state at every step, and <code>h_n</code> and <code>c_n</code> are (num_layers, N, hidden_size), the final states. Below, an LSTM learns to forecast the next value of a noisy sine wave from the previous 20 values:</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)
torch.set_num_threads(1)

# a noisy sine wave; task: given the last 20 values, predict the next one
t = torch.arange(0, 400, dtype=torch.float32)
series = torch.sin(0.1 * t) + 0.05 * torch.randn(400)
W = 20
X = torch.stack([series[i:i + W] for i in range(len(series) - W)]).unsqueeze(-1)  # (380, 20, 1)
y = series[W:].unsqueeze(-1)                                                      # (380, 1)
X_tr, y_tr, X_te, y_te = X[:300], y[:300], X[300:], y[300:]    # time-ordered split

class Forecaster(nn.Module):
    def __init__(self, hidden=32):
        super().__init__()
        self.lstm = nn.LSTM(input_size=1, hidden_size=hidden, batch_first=True)
        self.head = nn.Linear(hidden, 1)
    def forward(self, x):
        out, (h_n, c_n) = self.lstm(x)     # out: (N, 20, hidden); h_n: (1, N, hidden)
        return self.head(out[:, -1])       # use the hidden state after the last step

model = Forecaster()
opt = torch.optim.Adam(model.parameters(), lr=1e-2)
for epoch in range(1, 151):
    loss = nn.functional.mse_loss(model(X_tr), y_tr)
    opt.zero_grad(); loss.backward(); opt.step()
    if epoch % 30 == 0:
        with torch.no_grad():
            te = nn.functional.mse_loss(model(X_te), y_te).item()
        print(f"epoch {epoch:3d}  train MSE {loss.item():.4f}  test MSE {te:.4f}")
naive = nn.functional.mse_loss(X_te[:, -1], y_te).item()
print(f"naive 'repeat last value' test MSE: {naive:.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch  30  train MSE 0.0047  test MSE 0.0079
epoch  60  train MSE 0.0043  test MSE 0.0062
epoch  90  train MSE 0.0039  test MSE 0.0057
epoch 120  train MSE 0.0036  test MSE 0.0053
epoch 150  train MSE 0.0033  test MSE 0.0049
naive 'repeat last value' test MSE: 0.0102</code></pre>
<p>The LSTM beats the naive baseline of repeating the last value by roughly half. Notice the <strong>time-ordered split</strong>: we train on the past and test on the future. A random split would leak future information into training, as you learned in the classical ML track.</p>

<h3>The limits that led to transformers</h3>
<ol>
  <li><strong>Sequential computation:</strong> step t cannot start until step t-1 has finished, so you cannot parallelize across the sequence. GPUs thrive on parallel work, so training RNNs on billions of words was painfully slow.</li>
  <li><strong>The bottleneck:</strong> everything the model knows about the past must squeeze through one fixed-size vector. In early encoder-decoder translation models, a whole sentence was compressed into a single vector before decoding, and quality dropped sharply for long sentences.</li>
  <li><strong>Long-range dependencies are still hard:</strong> LSTMs help, but information from far back is still diluted after many steps.</li>
</ol>
<p>The fix, first added <em>on top of</em> RNNs in 2014 and then used <em>instead of</em> them in the 2017 paper "Attention Is All You Need", was <strong>attention</strong>. It lets every position look directly at every other position in one parallel step, with no bottleneck and no long chain of multiplications. You will build it in the transformers module.</p>

<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models", section on model architecture, describes how the seq2seq RNN architecture, its bottleneck and its sequential processing motivated the transformer.</div>
<div class="callout warn"><strong>Common mistake:</strong> leaving out <code>batch_first=True</code>. PyTorch RNN layers default to (T, N, features) with time first. Feeding (N, T, features) without the flag gives no error when the shapes happen to fit, but the model treats your batch as time. Set <code>batch_first=True</code> and check <code>output.shape</code>.</div>
`,
          keyPoints: [
            "An RNN updates a hidden state h_t = tanh(x_t W_x + h_(t-1) W_h + b) with the same weights at every step.",
            "Backpropagation through time multiplies many factors, so plain RNNs suffer from vanishing or exploding gradients.",
            "LSTMs add a gated, additively updated cell state that preserves gradients over long spans.",
            "nn.LSTM(batch_first=True) maps (N, T, F) to output (N, T, H) and final states (layers, N, H).",
            "RNNs are sequential and squeeze history through a fixed vector; attention removed both limits."
          ],
          exercise: {
            prompt: String.raw`<p>Train a GRU classifier to decide whether a sequence of 15 random digits (0 to 9) contains the digit 7. Encode each digit as a one-hot vector of size 10, so the input is (N, 15, 10). Use <code>nn.GRU(10, 32, batch_first=True)</code> with a linear head on the last hidden state, 2,000 training sequences, 500 test sequences, Adam with lr=1e-2, 60 full-batch epochs, and <code>torch.manual_seed(0)</code>. Report test accuracy, and compare it with the share of the majority class.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)
torch.set_num_threads(1)

def make_data(n):
    digits = torch.randint(0, 10, (n, 15))
    X = nn.functional.one_hot(digits, num_classes=10).float()   # (n, 15, 10)
    y = (digits == 7).any(dim=1).long()                         # 1 if a 7 appears
    return X, y

X_tr, y_tr = make_data(2000)
X_te, y_te = make_data(500)

class Contains7(nn.Module):
    def __init__(self):
        super().__init__()
        self.gru = nn.GRU(10, 32, batch_first=True)
        self.head = nn.Linear(32, 2)
    def forward(self, x):
        _, h_n = self.gru(x)          # h_n: (1, N, 32)
        return self.head(h_n[-1])     # (N, 2)

model = Contains7()
opt = torch.optim.Adam(model.parameters(), lr=1e-2)
for epoch in range(60):
    loss = nn.functional.cross_entropy(model(X_tr), y_tr)
    opt.zero_grad(); loss.backward(); opt.step()

model.eval()
with torch.no_grad():
    acc = (model(X_te).argmax(1) == y_te).float().mean().item()
majority = max(y_te.float().mean().item(), 1 - y_te.float().mean().item())
print(f"test accuracy {acc:.3f} | majority-class share {majority:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">test accuracy 1.000 | majority-class share 0.756</code></pre>
<p>The probability that 15 random digits contain no 7 is 0.9^15, about 0.21, so about 79% of sequences contain a 7 (in this particular test sample it is 75.6%). A model that always says "yes" would score about that much. The GRU does much better because its hidden state learns to act as a "have I seen a 7 yet?" flag. Always compare with the majority-class baseline when classes are imbalanced.</p>`
          },
          quiz: [
            { q: "What does the hidden state of an RNN represent?", options: ["The current input only", "A running summary of the sequence seen so far", "The loss value", "The attention weights"], answer: 1, explain: "h_t mixes the current input with h_(t-1), so it accumulates information from all earlier steps into a fixed-size vector." },
            { q: "Why do plain RNNs struggle with long-range dependencies?", options: ["They have too many parameters", "Gradients through many time steps are products of many factors and tend to vanish", "They cannot process numbers", "They need images as input"], answer: 1, explain: "Backpropagation through time multiplies the recurrent Jacobian at each step, so the signal from distant steps shrinks exponentially (or explodes)." },
            { q: "What is the role of the LSTM forget gate?", options: ["It deletes the input", "It decides how much of the previous cell state to keep", "It sets the learning rate", "It produces the final prediction"], answer: 1, explain: "c_t = f_t * c_(t-1) + i_t * g_t. A forget gate near 1 preserves memory and lets gradients flow across many steps." },
            { q: "Which limitation of RNNs made training on huge text datasets slow, and was removed by transformers?", options: ["They cannot use GPUs at all", "They must process tokens one after another, which prevents parallelism across the sequence", "They only work with numbers below 1", "They cannot be saved to disk"], answer: 1, explain: "Each step depends on the previous hidden state, so computation is sequential. Self-attention processes all positions in parallel." }
          ]
        },
        {
          id: "dl-arch-transfer",
          title: "Transfer Learning, Pretrained Models and Choosing an Architecture",
          minutes: 45,
          objectives: [
            "Explain transfer learning and why pretrained models dominate modern practice",
            "Distinguish feature extraction (frozen backbone) from fine-tuning",
            "Freeze layers, replace a model's head and use per-group learning rates in PyTorch",
            "Choose a sensible architecture family for a given data type"
          ],
          body: String.raw`
<p>Training a large network from scratch needs a lot of labelled data and compute. ImageNet-scale vision models trained on 1.2 million labelled photos, and LLMs train on trillions of tokens. Most real projects have a few hundred or a few thousand labelled examples. <strong>Transfer learning</strong> solves this mismatch. You start from a model that someone has already trained on a huge, general dataset, and adapt it to your task. It is the default way to build image and text models in industry, and the whole foundation model and LLM approach that the rest of this course covers is built on it.</p>

<h3>Why it works</h3>
<p>Recall the CNN feature hierarchy. Early layers learn edges and textures, and middle layers learn shapes and parts. These features are <em>general</em>: edges are useful whether you classify cats, X-rays or product photos. Only the last layers are specific to the original task's classes. The same holds for language. A model pretrained to predict words has learned grammar, word meanings and a great deal of world knowledge, all of which help with sentiment analysis, classification or question answering. Transfer learning reuses those general features and only learns the task-specific part.</p>
<p>An analogy: a doctor who moves into a new speciality does not go back to primary school. They reuse years of general medical knowledge and learn only the specifics of the new field.</p>

<h3>Two strategies</h3>
<table>
  <thead><tr><th></th><th>Feature extraction</th><th>Fine-tuning</th></tr></thead>
  <tbody>
    <tr><td>What is trained</td><td>Only a new head; the pretrained backbone is frozen</td><td>The new head plus some or all backbone layers</td></tr>
    <tr><td>Data needed</td><td>Very little (tens to hundreds of examples per class)</td><td>More (hundreds to thousands or more)</td></tr>
    <tr><td>Compute</td><td>Cheap; the backbone can even pre-compute features once</td><td>Higher; gradients flow through the whole network</td></tr>
    <tr><td>Accuracy</td><td>Good when your data resembles the pretraining data</td><td>Usually best, especially when your domain differs</td></tr>
    <tr><td>Risk</td><td>Underfitting if the features do not suit your task</td><td>Overfitting and "catastrophic forgetting" if the learning rate is too high</td></tr>
  </tbody>
</table>
<p>A common recipe is to start with feature extraction. If you have enough data, unfreeze the top layers and fine-tune with a small learning rate (for example 1e-5 to 1e-4, much smaller than when training from scratch), so the pretrained knowledge is adjusted rather than destroyed.</p>

<h3>The mechanics in PyTorch</h3>
<p>Three operations cover almost all transfer-learning code:</p>
<ol>
  <li><strong>Load pretrained weights</strong> into the architecture (<code>load_state_dict</code>, or a library helper).</li>
  <li><strong>Freeze</strong> parameters by setting <code>p.requires_grad = False</code>. Autograd then computes no gradients for them, and the optimizer leaves them alone.</li>
  <li><strong>Replace the head</strong>: swap the final layer for a new <code>nn.Linear</code> with as many outputs as your task has classes.</li>
</ol>
<p>This is what it looks like with a real pretrained image model from <code>torchvision</code>. The block is not runnable here, because it downloads about 45 MB of weights:</p>
<pre><code class="lang-python">import torch
from torch import nn
from torchvision import models

# downloads ImageNet-pretrained weights the first time
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

for p in model.parameters():                 # 1. freeze the whole backbone
    p.requires_grad = False

model.fc = nn.Linear(model.fc.in_features, 3)   # 2. new head for 3 classes (trainable)

# 3. optimizer over trainable parameters only
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)

# Later, to fine-tune the last block too, with a smaller learning rate:
for p in model.layer4.parameters():
    p.requires_grad = True
optimizer = torch.optim.Adam([
    {"params": model.layer4.parameters(), "lr": 1e-5},
    {"params": model.fc.parameters(), "lr": 1e-3},
])
# Use the same preprocessing the model was pretrained with:
preprocess = models.ResNet18_Weights.DEFAULT.transforms()
</code></pre>
<p>Hugging Face <code>transformers</code> follows the same pattern for text, for example <code>AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)</code> loads a pretrained language model with a fresh classification head. You will use this in later tracks.</p>

<h3>A runnable, offline demonstration</h3>
<p>To keep everything offline, we "pretrain" a small CNN ourselves on one task, recognizing digits 0 to 9, using the first 1,000 images. We then transfer its frozen feature extractor to a <em>new</em> task on <em>different</em> images, "is this digit odd?", training only a new head. The demonstration focuses on the mechanics: loading weights, freezing, swapping the head, and checking that the frozen weights really did not change.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import load_digits

torch.manual_seed(0)
torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
X = torch.tensor(X.reshape(-1, 1, 8, 8) / 16.0, dtype=torch.float32)
y = torch.tensor(y)

def make_backbone():
    return nn.Sequential(
        nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        nn.Flatten(), nn.Linear(128, 64), nn.ReLU())        # 64 learned features

def fit(model, X, y, epochs, lr):
    params = [p for p in model.parameters() if p.requires_grad]   # trainable only
    opt = torch.optim.Adam(params, lr=lr)
    model.train()
    for _ in range(epochs):
        loss = nn.functional.cross_entropy(model(X), y)
        opt.zero_grad(); loss.backward(); opt.step()

def accuracy(model, X, y):
    model.eval()
    with torch.no_grad():
        return (model(X).argmax(1) == y).float().mean().item()

# ---- "Pretraining": digits 0-9 on images 0..999, then save the backbone weights
backbone = make_backbone()
fit(nn.Sequential(backbone, nn.Linear(64, 10)), X[:1000], y[:1000], epochs=150, lr=3e-3)
torch.save(backbone.state_dict(), "pretrained_backbone.pt")

# ---- Transfer: new task (odd vs even) on new images 1000..1796
X_new, y_new = X[1000:], y[1000:] % 2
X_tr, y_tr, X_te, y_te = X_new[:200], y_new[:200], X_new[200:], y_new[200:]

features = make_backbone()
features.load_state_dict(torch.load("pretrained_backbone.pt"))  # 1. load pretrained weights
for p in features.parameters():
    p.requires_grad = False                                      # 2. freeze them
model = nn.Sequential(features, nn.Linear(64, 2))                # 3. new trainable head

before = features[0].weight.clone()
fit(model, X_tr, y_tr, epochs=300, lr=1e-2)
print("frozen conv weights unchanged:", torch.equal(before, features[0].weight))
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"trainable parameters: {trainable} of {total}")
print(f"odd/even accuracy on {len(y_te)} unseen images: {accuracy(model, X_te, y_te):.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">frozen conv weights unchanged: True
trainable parameters: 130 of 13186
odd/even accuracy on 597 unseen images: 0.921</code></pre>
<p>Training touched only 130 of more than 13,000 parameters, yet the model handles a task it was never pretrained for, because "which digit is this?" features are useful for "is it odd?". An honest caveat: with tiny 8x8 digits, a small CNN trained from scratch also does well, so the benefit here is modest. The large gains appear when the pretraining data is huge and diverse (ImageNet photos, web-scale text) and your labelled data is scarce. Then transfer learning can turn a hopeless 200-example problem into a usable model.</p>

<div class="callout warn"><strong>Common mistakes:</strong> (1) Freezing layers but still passing <em>all</em> parameters to an optimizer with weight decay. Frozen weights have no gradient, so most optimizers skip them, but filtering to <code>requires_grad</code> parameters makes your intent explicit. (2) Forgetting the pretrained model's preprocessing, such as input size, normalization mean and std, or tokenizer. Features are only meaningful for inputs prepared the way they were during pretraining. (3) Fine-tuning with a from-scratch learning rate such as 1e-2, which wipes out the pretrained knowledge.</div>

<h3>From transfer learning to foundation models</h3>
<p>Large language models take transfer learning to its extreme. One model is pretrained once, at enormous cost, on a broad corpus. It is then adapted to countless tasks: by fine-tuning (including parameter-efficient methods such as LoRA, which train small add-on matrices while the original weights stay frozen), or with no weight changes at all, through <em>prompting</em>. The AI Engineering track covers when to prompt, when to retrieve (RAG) and when to fine-tune.</p>
<div class="callout book"><strong>Book:</strong> Generative AI on AWS, Ch. 3 "Large-Language Foundation Models", introduces pretrained foundation models as the starting point for generative AI applications. AI Engineering (Chip Huyen), Ch. 2 explains how pretraining and post-training produce such models.</div>

<h3>Choosing an architecture by data type</h3>
<table>
  <thead><tr><th>Data</th><th>Good first choice</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Tabular (rows and columns of features)</td><td>Gradient-boosted trees (XGBoost, LightGBM) or random forests; then an MLP</td><td>Neural networks rarely beat tree ensembles on small to medium tabular data</td></tr>
    <tr><td>Images</td><td>Pretrained CNN (ResNet, EfficientNet) or Vision Transformer, fine-tuned</td><td>Use augmentation; train from scratch only with lots of data</td></tr>
    <tr><td>Text</td><td>Pretrained transformer (BERT-style for classification and embeddings, GPT-style LLM for generation)</td><td>For simple, small problems, TF-IDF with logistic regression is a strong, cheap baseline</td></tr>
    <tr><td>Time series</td><td>Classical baselines and gradient boosting on lag features; then LSTM, 1D CNN or transformer models</td><td>Always split by time</td></tr>
    <tr><td>Audio</td><td>Spectrogram plus CNN, or pretrained speech transformers (e.g. Whisper)</td><td>Audio is often converted to an image-like spectrogram</td></tr>
    <tr><td>Multimodal (image + text)</td><td>Pretrained multimodal transformers (CLIP-style encoders, vision-language models)</td><td>Covered in the advanced generative AI material</td></tr>
  </tbody>
</table>
<p>Two rules of thumb hold across all of these. First, <strong>start with the simplest model that could work</strong>, so you have a baseline to beat. Second, <strong>start from a pretrained model whenever one exists for your modality</strong>. The architecture families matter less than they used to, because transformers now reach top results on text, images, audio and more. The main differences are how the input is cut into tokens and how much data and compute you have.</p>
`,
          keyPoints: [
            "Transfer learning reuses features from a model pretrained on large, general data and adapts it to your task.",
            "Feature extraction freezes the backbone and trains a new head; fine-tuning also updates backbone layers with a small learning rate.",
            "In PyTorch: load weights, set requires_grad=False to freeze, replace the final layer, optimize trainable parameters.",
            "Use the pretrained model's own preprocessing (input size, normalization, tokenizer).",
            "Pick by data type: trees for tabular, pretrained CNN/ViT for images, pretrained transformers for text."
          ],
          exercise: {
            prompt: String.raw`<p>Starting from the lesson's demonstration, implement <strong>partial fine-tuning</strong>: after training the new head with the backbone frozen, unfreeze only the backbone's final <code>nn.Linear(128, 64)</code> layer (index 7 in the Sequential). Fine-tune with two parameter groups, lr=1e-4 for that layer and lr=1e-3 for the head, for 100 more epochs. Print the number of trainable parameters before and after unfreezing, and the test accuracy after each stage.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch
from torch import nn
from sklearn.datasets import load_digits

torch.manual_seed(0)
torch.set_num_threads(1)
X, y = load_digits(return_X_y=True)
X = torch.tensor(X.reshape(-1, 1, 8, 8) / 16.0, dtype=torch.float32)
y = torch.tensor(y)

backbone = nn.Sequential(
    nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(), nn.Linear(128, 64), nn.ReLU())

def train(model, opt, X, y, epochs):
    model.train()
    for _ in range(epochs):
        loss = nn.functional.cross_entropy(model(X), y)
        opt.zero_grad(); loss.backward(); opt.step()

def acc(model, X, y):
    model.eval()
    with torch.no_grad():
        return (model(X).argmax(1) == y).float().mean().item()

def n_trainable(m):
    return sum(p.numel() for p in m.parameters() if p.requires_grad)

pre = nn.Sequential(backbone, nn.Linear(64, 10))          # "pretraining"
train(pre, torch.optim.Adam(pre.parameters(), lr=3e-3), X[:1000], y[:1000], 150)

X_new, y_new = X[1000:], y[1000:] % 2
X_tr, y_tr, X_te, y_te = X_new[:200], y_new[:200], X_new[200:], y_new[200:]

for p in backbone.parameters():
    p.requires_grad = False
head = nn.Linear(64, 2)
model = nn.Sequential(backbone, head)
print("stage 1 trainable:", n_trainable(model))
train(model, torch.optim.Adam(head.parameters(), lr=1e-2), X_tr, y_tr, 300)
print(f"stage 1 accuracy: {acc(model, X_te, y_te):.3f}")

for p in backbone[7].parameters():                        # unfreeze the last backbone layer
    p.requires_grad = True
print("stage 2 trainable:", n_trainable(model))
opt = torch.optim.Adam([
    {"params": backbone[7].parameters(), "lr": 1e-4},
    {"params": head.parameters(), "lr": 1e-3},
])
train(model, opt, X_tr, y_tr, 100)
print(f"stage 2 accuracy: {acc(model, X_te, y_te):.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">stage 1 trainable: 130
stage 1 accuracy: 0.918
stage 2 trainable: 8386
stage 2 accuracy: 0.926</code></pre>
<p>Unfreezing the 64x128 layer adds 128*64 + 64 = 8,256 trainable parameters. The two parameter groups let the pretrained layer move slowly while the new head adapts faster, the standard pattern for fine-tuning. Whether stage 2 helps depends on how much target data there is. With more labelled data, deeper fine-tuning pays off more.</p>`
          },
          quiz: [
            { q: "Why do features learned by a pretrained image model transfer to a new task?", options: ["Because all image datasets contain the same classes", "Because early and middle layers learn general features (edges, textures, shapes) useful for many tasks", "Because pretrained models have no parameters", "Because transfer learning retrains every weight from scratch"], answer: 1, explain: "The feature hierarchy goes from general to specific. Only the top layers are tied to the original classes, so the rest can be reused." },
            { q: "How do you freeze a layer in PyTorch?", options: ["model.eval()", "Set requires_grad = False on its parameters", "torch.no_grad() around training", "Delete it from the model"], answer: 1, explain: "requires_grad=False stops gradient computation for those parameters, so they never change. eval() only changes dropout and batchnorm behaviour." },
            { q: "You have 300 labelled X-ray images and want a classifier. What is the most sensible first approach?", options: ["Train a deep CNN from scratch", "Start from a pretrained image model, freeze the backbone, and train a new head", "Use an RNN", "Use k-means clustering"], answer: 1, explain: "With little data, feature extraction from a pretrained model is the strongest and cheapest start. Fine-tune more layers with a small learning rate if you get more data." },
            { q: "Which is usually the strongest first choice for a medium-sized tabular dataset?", options: ["A large transformer", "Gradient-boosted trees", "A CNN", "An LSTM"], answer: 1, explain: "Tree ensembles such as XGBoost and LightGBM are hard to beat on tabular data, and they are fast and need little tuning." }
          ]
        }
      ]
    },
    {
      id: "dl-nlp",
      title: "NLP Fundamentals: From Bag-of-Words to Embeddings",
      summary: "Turn text into numbers: preprocessing, bag-of-words and TF-IDF classifiers, word embeddings and cosine similarity, subword tokenization with BPE, and sentence embeddings for semantic search.",
      lessons: [
        {
          id: "dl-nlp-bow-tfidf",
          title: "Text Preprocessing, Bag-of-Words and TF-IDF",
          minutes: 50,
          objectives: [
            "Explain why text must be converted to numbers and describe common preprocessing steps",
            "Build bag-of-words and TF-IDF representations with scikit-learn",
            "Compute TF-IDF weights by hand and explain why they help",
            "Train and evaluate a text classifier in a scikit-learn pipeline"
          ],
          body: String.raw`
<p><strong>Natural Language Processing (NLP)</strong> is the field of getting computers to work with human language: classifying support tickets, detecting spam, analysing sentiment, translating, answering questions and, more recently, generating text with LLMs. Every model you have trained so far takes numbers in. So the first problem in NLP is always the same: <em>how do we turn text into numbers that keep its meaning?</em> This module goes from the simplest answer (count the words) to the one modern LLMs use (learned subword embeddings).</p>

<h3>Preprocessing: cleaning and splitting text</h3>
<p>Raw text is messy. A classic pipeline applies some of these steps:</p>
<ul>
  <li><strong>Lowercasing:</strong> treat "Great" and "great" as the same word.</li>
  <li><strong>Tokenization:</strong> split text into units called <strong>tokens</strong>. The simplest scheme splits on whitespace and punctuation. (A later lesson covers the subword tokenization LLMs use.)</li>
  <li><strong>Removing punctuation, numbers or stop words:</strong> stop words are very common words such as "the", "is" and "and" that carry little topic information. Be careful: "not" is often on stop-word lists, and removing it turns "not good" into "good".</li>
  <li><strong>Stemming or lemmatization:</strong> reduce words to a base form ("running", "runs" and "ran" become "run"), so related forms share statistics.</li>
</ul>
<p>How much to preprocess depends on the model. Count-based models such as TF-IDF benefit from normalization because it reduces the vocabulary. Modern transformers need almost none: they use their own tokenizer on raw text, and details such as capitalization and punctuation carry useful signal.</p>

<pre><code class="lang-python runnable">import re

STOP_WORDS = {"the", "a", "an", "is", "was", "and", "it", "to", "of", "this", "i"}

def preprocess(text, remove_stop_words=True):
    text = text.lower()
    tokens = re.findall(r"[a-z']+", text)          # keep letters and apostrophes
    if remove_stop_words:
        tokens = [t for t in tokens if t not in STOP_WORDS]
    return tokens

review = "This phone is GREAT!!! The battery lasts 2 days, and it's not heavy."
print(preprocess(review, remove_stop_words=False))
print(preprocess(review))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['this', 'phone', 'is', 'great', 'the', 'battery', 'lasts', 'days', 'and', "it's", 'not', 'heavy']
['phone', 'great', 'battery', 'lasts', 'days', "it's", 'not', 'heavy']</code></pre>

<h3>Bag-of-words: count the words</h3>
<p>The <strong>bag-of-words (BoW)</strong> model represents a document by how often each vocabulary word appears in it, ignoring order completely, as if the words were shaken up in a bag. With a vocabulary of V words, each document becomes a vector of length V, almost entirely zeros. Such vectors are called <strong>sparse</strong>. scikit-learn's <code>CountVectorizer</code> builds the vocabulary from the training texts and produces these vectors.</p>
<p>BoW is crude: "dog bites man" and "man bites dog" get identical vectors. It is also surprisingly effective for topic and sentiment classification, because the <em>presence</em> of words like "refund", "broken" or "excellent" says a lot.</p>
<p>An extension is <strong>n-grams</strong>: count pairs of adjacent words (bigrams) such as "not good" alongside single words. This captures some local word order, at the cost of a much larger vocabulary.</p>

<h3>TF-IDF: weight words by how informative they are</h3>
<p>Raw counts over-weight words that appear everywhere. If every review contains "phone", the word tells you nothing about any one review. <strong>TF-IDF</strong> (term frequency times inverse document frequency) fixes this:</p>
<ul>
  <li><strong>TF</strong> (term frequency): how often term t appears in document d. More occurrences mean more relevance to that document.</li>
  <li><strong>IDF</strong> (inverse document frequency): <code>idf(t) = log((1 + N) / (1 + df(t))) + 1</code> in scikit-learn's smoothed version, where N is the number of documents and df(t) is how many documents contain t. Rare words get a high IDF. Words found in every document get the minimum.</li>
  <li><strong>TF-IDF</strong> = TF x IDF. Each document vector is then usually scaled to unit length (L2 normalization), so long documents do not dominate.</li>
</ul>
<p>A word scores high in a document when it is frequent <em>there</em> but rare <em>elsewhere</em>, which is exactly the kind of word that characterizes the document. TF-IDF was the backbone of search engines for decades, and its cousin BM25 still powers keyword search in Elasticsearch and OpenSearch. You will meet it again as the "keyword" half of hybrid search in RAG systems.</p>

<pre><code class="lang-python runnable">import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

docs = ["the cat sat on the mat",
        "the dog sat on the log",
        "the cat chased the dog"]

bow = CountVectorizer()
counts = bow.fit_transform(docs)                 # sparse matrix (3 docs x vocab)
print("vocabulary:", list(bow.get_feature_names_out()))
print("counts:\n", counts.toarray())

tfidf = TfidfVectorizer()
weights = tfidf.fit_transform(docs)
print("idf:", {w: round(float(v), 3) for w, v in zip(tfidf.get_feature_names_out(), tfidf.idf_)})
print("tf-idf of doc 0:", dict((w, round(float(v), 3)) for w, v in
      zip(tfidf.get_feature_names_out(), weights.toarray()[0]) if v &gt; 0))

# check one IDF by hand: 'cat' appears in 2 of 3 documents
print("idf('cat') by hand:", round(np.log((1 + 3) / (1 + 2)) + 1, 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">vocabulary: ['cat', 'chased', 'dog', 'log', 'mat', 'on', 'sat', 'the']
counts:
 [[1 0 0 0 1 1 1 2]
 [0 0 1 1 0 1 1 2]
 [1 1 1 0 0 0 0 2]]
idf: {'cat': 1.288, 'chased': 1.693, 'dog': 1.288, 'log': 1.693, 'mat': 1.693, 'on': 1.288, 'sat': 1.288, 'the': 1.0}
tf-idf of doc 0: {'cat': 0.374, 'mat': 0.492, 'on': 0.374, 'sat': 0.374, 'the': 0.581}
idf('cat') by hand: 1.288</code></pre>
<p>"the" appears in all three documents, so it gets the minimum IDF of 1.0. "mat" appears in only one, so it gets the highest. In document 0, "mat" therefore outweighs "the" even though "the" occurs twice.</p>

<h3>A complete text classifier</h3>
<p>Below is a small, inline dataset of customer messages labelled by department. A <code>Pipeline</code> chains TF-IDF and logistic regression, so the vectorizer is fitted only on training data. This is the same leakage-safe pattern as in the classical ML track.</p>
<pre><code class="lang-python runnable">from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import cross_val_score
import numpy as np

texts = [
    "I was charged twice for my order", "please refund my payment",
    "the invoice amount is wrong", "my credit card was billed incorrectly",
    "how do I get my money back", "there is an extra fee on my bill",
    "why was I charged a subscription fee", "payment failed but money was taken",
    "my package has not arrived yet", "where is my parcel",
    "the delivery is late again", "tracking number shows no update",
    "the courier left the box at the wrong address", "shipping is taking forever",
    "my order was delivered to my neighbour", "when will my shipment arrive",
    "I cannot log in to my account", "reset my password please",
    "the app crashes when I open it", "two factor code never arrives",
    "my account is locked", "the website shows an error on login",
    "I forgot my username", "the app will not update on my phone",
]
labels = ["billing"] * 8 + ["shipping"] * 8 + ["tech"] * 8

clf = make_pipeline(TfidfVectorizer(ngram_range=(1, 2)), LogisticRegression(max_iter=1000))
scores = cross_val_score(clf, texts, labels, cv=4)
print("cross-validated accuracy:", scores.round(2), "mean", round(scores.mean(), 3))

clf.fit(texts, labels)
tests = ["I was billed two times", "my parcel is lost", "cannot reset password on the app",
         "refund the delivery fee"]
for t, p in zip(tests, clf.predict(tests)):
    print(f"{t!r:38s} -&gt; {p}")

# the most informative words per class (largest coefficients)
vocab = clf[0].get_feature_names_out()
for cls, coefs in zip(clf[1].classes_, clf[1].coef_):
    print(cls, "|", ", ".join(vocab[np.argsort(coefs)[-4:][::-1]]))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">cross-validated accuracy: [0.83 0.5  0.67 0.5 ] mean 0.625
'I was billed two times'               -&gt; billing
'my parcel is lost'                    -&gt; shipping
'cannot reset password on the app'     -&gt; tech
'refund the delivery fee'              -&gt; shipping
billing | was, payment, was charged, charged
shipping | where is, where, my parcel, is my
tech | account, my account, the app, app</code></pre>
<p>With only 24 examples, the cross-validated accuracy is modest and noisy: each fold tests just 6 messages, and the model has seen very few words. Some top features, such as "was" or "is my", are accidents of this tiny dataset rather than real signals. Still, the model routes the clear new messages correctly, and the ambiguous "refund the delivery fee" lands in shipping because "delivery" was a strong shipping word. The coefficients are easy to read, so you can see which words push towards each class and spot spurious ones. On real datasets with thousands of examples, TF-IDF with logistic regression is a strong, fast, explainable baseline. It is often within a few points of fine-tuned transformers for topic classification, at a tiny fraction of the cost.</p>

<h3>The limits of counting words</h3>
<ul>
  <li><strong>No notion of similarity between words:</strong> "refund" and "reimbursement" are as unrelated to the model as "refund" and "banana". Every word is its own dimension. A message using a synonym that never appeared in training gets no help.</li>
  <li><strong>Word order is mostly lost:</strong> n-grams capture short phrases only.</li>
  <li><strong>Huge, sparse vectors:</strong> one dimension per vocabulary word (often 50,000 or more).</li>
  <li><strong>Out-of-vocabulary words</strong> are simply ignored.</li>
</ul>
<p>The next lessons fix these limits one by one: dense <em>embeddings</em> that place similar words close together, <em>subword tokenization</em> that handles any word, and finally transformers that read word order and context.</p>
<div class="callout warn"><strong>Common mistake:</strong> calling <code>fit_transform</code> on the test set (or on all the data before splitting). The vocabulary and IDF values must come from the training data only. Put the vectorizer inside a <code>Pipeline</code> and the problem cannot happen.</div>
`,
          keyPoints: [
            "Models need numbers: text is tokenized and mapped into vectors.",
            "Bag-of-words counts word occurrences and ignores order; n-grams add short phrases.",
            "TF-IDF up-weights words frequent in a document but rare across the corpus.",
            "TF-IDF + logistic regression in a Pipeline is a strong, cheap, explainable baseline.",
            "Count-based methods do not know that different words can mean similar things; embeddings fix that."
          ],
          exercise: {
            prompt: String.raw`<p>Build a sentiment classifier on this inline data: positive reviews <code>["loved it", "great quality", "works perfectly", "very happy with this", "excellent value", "would buy again"]</code> and negative reviews <code>["terrible quality", "broke after a day", "very disappointed", "would not buy again", "waste of money", "not happy with this"]</code>. Use a TF-IDF + LogisticRegression pipeline, first with <code>ngram_range=(1, 1)</code> and then <code>(1, 2)</code>. Compare the predicted probability of positive for "not happy" and "would buy again" under both settings, and explain the difference.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

pos = ["loved it", "great quality", "works perfectly", "very happy with this",
       "excellent value", "would buy again"]
neg = ["terrible quality", "broke after a day", "very disappointed",
       "would not buy again", "waste of money", "not happy with this"]
X = pos + neg
y = [1] * len(pos) + [0] * len(neg)

for ngrams in [(1, 1), (1, 2)]:
    clf = make_pipeline(TfidfVectorizer(ngram_range=ngrams), LogisticRegression(C=10))
    clf.fit(X, y)
    probs = clf.predict_proba(["not happy", "would buy again"])[:, 1]
    print(ngrams, "P(positive):", {"not happy": round(float(probs[0]), 3),
                                   "would buy again": round(float(probs[1]), 3)})
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(1, 1) P(positive): {'not happy': 0.143, 'would buy again': 0.671}
(1, 2) P(positive): {'not happy': 0.156, 'would buy again': 0.746}</code></pre>
<p>Both settings classify the two phrases correctly. With unigrams only, "happy" appears in one positive and one negative review, so "not" (found in two negative reviews) has to carry the negative signal. "would", "buy" and "again" appear in both a positive and a negative review, so "would buy again" is only mildly positive. With bigrams, "would buy" becomes a feature found only in the positive review (the negative one contains "would not" and "not buy"), so the model is clearly more confident that "would buy again" is positive. Bigrams capture short negations and phrases that single words miss. On real data, n-grams up to 2 or 3 are a common, cheap improvement.</p>`
          },
          quiz: [
            { q: "Why does TF-IDF give the word 'the' a low weight?", options: ["It is short", "It appears in almost every document, so its inverse document frequency is minimal", "It is not in the vocabulary", "It is always removed by tokenization"], answer: 1, explain: "IDF falls as document frequency rises. A word present everywhere does not help tell documents apart." },
            { q: "What information does a bag-of-words representation discard?", options: ["Which words occur", "How often words occur", "The order of the words", "The vocabulary"], answer: 2, explain: "BoW keeps only counts, so 'dog bites man' and 'man bites dog' look identical. N-grams recover some local order." },
            { q: "Why fit the TfidfVectorizer only on the training data (e.g. inside a Pipeline)?", options: ["It is faster", "Fitting on test data leaks its vocabulary and document frequencies into training", "TF-IDF cannot transform test data", "It changes the labels"], answer: 1, explain: "The vocabulary and IDF statistics are learned parameters. Fitting them on test data is leakage and inflates the scores." },
            { q: "A model trained with TF-IDF has seen 'refund' but never 'reimbursement'. What happens to a test message using only 'reimbursement'?", options: ["It is treated as similar to 'refund'", "The unknown word is ignored, so it gives no signal", "The model crashes", "TF-IDF automatically learns synonyms"], answer: 1, explain: "Count-based features have no concept of similarity, and out-of-vocabulary words are dropped. Embeddings address this." }
          ]
        },
        {
          id: "dl-nlp-embeddings",
          title: "Word Embeddings: Meaning as Vectors",
          minutes: 50,
          objectives: [
            "Explain the distributional hypothesis and what an embedding is",
            "Compute cosine similarity and use it to find similar words",
            "Reproduce the word-analogy intuition with small hand-made vectors",
            "Use nn.Embedding as a learnable lookup table and explain how embeddings are trained"
          ],
          body: String.raw`
<p>In a bag-of-words model each word is an isolated dimension. Every pair of different words is equally different. Humans know better: "cat" is closer to "dog" than to "carburettor". An <strong>embedding</strong> represents each word as a <strong>dense vector</strong> of, say, 300 real numbers, placed so that words with similar meanings are close together. Embeddings are one of the most important ideas in modern AI. Every LLM starts by turning each token into an embedding, and the semantic search and RAG systems you will build later are built on them.</p>

<h3>The distributional hypothesis</h3>
<p>"You shall know a word by the company it keeps" (J. R. Firth, 1957). Words that appear in similar contexts tend to have similar meanings. If you read "I poured a glass of ___ with dinner", the blank could be wine, water or juice, and those words form a cluster. Embedding methods turn this idea into an algorithm. They learn vectors so that a word's vector predicts the words around it. Words used in similar contexts end up with similar vectors, without anyone ever defining what the words mean.</p>

<h3>One-hot versus dense</h3>
<table>
  <thead><tr><th></th><th>One-hot / bag-of-words</th><th>Embedding</th></tr></thead>
  <tbody>
    <tr><td>Dimensions</td><td>Vocabulary size (e.g. 50,000)</td><td>Chosen size (e.g. 50 to 4,096)</td></tr>
    <tr><td>Values</td><td>Mostly zeros, a single 1</td><td>Dense real numbers</td></tr>
    <tr><td>Similarity between words</td><td>All pairs equally dissimilar</td><td>Similar meaning gives nearby vectors</td></tr>
    <tr><td>Learned?</td><td>No, fixed</td><td>Yes, from data</td></tr>
  </tbody>
</table>

<h3>Cosine similarity</h3>
<p>To measure how close two embeddings are, we usually use <strong>cosine similarity</strong>, the cosine of the angle between the vectors:</p>
<p><code>cos(a, b) = (a · b) / (|a| * |b|)</code></p>
<p>It is 1 when the vectors point the same way, 0 when they are perpendicular (unrelated), and -1 when they point in opposite directions. It ignores vector length and looks only at direction, which is what we want: a word's "meaning" is its direction in the space. If all vectors are normalized to length 1, cosine similarity is simply the dot product. Vector databases rely on this to search millions of vectors quickly.</p>

<h3>A hand-made embedding space</h3>
<p>Real embeddings have hundreds of dimensions that are hard to interpret. To build intuition, here are 4-dimensional vectors made by hand, with readable dimensions: <em>royalty</em>, <em>maleness</em>, <em>femaleness</em> and <em>food-ness</em>.</p>

<pre><code class="lang-python runnable">import numpy as np

#                     royal  male  female  food
E = {
    "king":   np.array([0.95, 0.90, 0.05, 0.00]),
    "queen":  np.array([0.95, 0.05, 0.90, 0.00]),
    "man":    np.array([0.05, 0.92, 0.04, 0.02]),
    "woman":  np.array([0.04, 0.03, 0.93, 0.02]),
    "prince": np.array([0.80, 0.85, 0.05, 0.00]),
    "apple":  np.array([0.00, 0.02, 0.03, 0.95]),
    "bread":  np.array([0.02, 0.01, 0.02, 0.90]),
}

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def most_similar(vec, exclude=()):
    scores = {w: cosine(vec, v) for w, v in E.items() if w not in exclude}
    return sorted(scores.items(), key=lambda kv: -kv[1])[:3]

print("cos(king, queen)  =", round(cosine(E["king"], E["queen"]), 3))
print("cos(king, prince) =", round(cosine(E["king"], E["prince"]), 3))
print("cos(king, apple)  =", round(cosine(E["king"], E["apple"]), 3))
print("nearest to 'apple':", [(w, round(float(s), 3)) for w, s in most_similar(E["apple"], {"apple"})])

# the famous analogy: king - man + woman = ?
target = E["king"] - E["man"] + E["woman"]
print("king - man + woman ~", [(w, round(float(s), 3)) for w, s in most_similar(target, {"king", "man", "woman"})])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">cos(king, queen)  = 0.579
cos(king, prince) = 0.998
cos(king, apple)  = 0.016
nearest to 'apple': [('bread', 1.0), ('woman', 0.054), ('man', 0.044)]
king - man + woman ~ [('queen', 0.999), ('prince', 0.52), ('bread', 0.031)]</code></pre>
<p>Subtracting "man" removes the male direction, adding "woman" adds the female direction, and the royalty component survives. The nearest word is "queen". In 2013, the <strong>word2vec</strong> paper showed that embeddings learned purely from raw text show this structure: <code>king - man + woman</code> lands near "queen", and <code>Paris - France + Italy</code> lands near "Rome". Relationships such as gender, capital-of and verb tense become roughly consistent <em>directions</em> in the space. With real embeddings this works only approximately and on some relationships, but it shows that geometry encodes meaning.</p>

<h3>How embeddings are learned</h3>
<ul>
  <li><strong>word2vec</strong> (2013) trains a tiny network on a fake task. "Skip-gram" predicts the surrounding words from the centre word; CBOW predicts the centre word from its neighbours. Nobody cares about the task itself. The weights learned for each word are the embeddings. <strong>GloVe</strong> reaches similar vectors by factorizing a word co-occurrence matrix.</li>
  <li><strong>Inside any neural network:</strong> an embedding layer is just a trainable lookup table, a matrix of shape (vocab_size, dim) whose row i is the vector for token i. It is initialized randomly and trained by backpropagation together with the rest of the model for whatever the task is: classification, translation or next-token prediction. LLMs learn their token embeddings this way.</li>
</ul>
<p>Mathematically, looking up row i is the same as multiplying a one-hot vector by the embedding matrix. The lookup is simply a much faster way to do it.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

vocab = {"&lt;pad&gt;": 0, "i": 1, "love": 2, "hate": 3, "this": 4, "movie": 5}
emb = nn.Embedding(num_embeddings=len(vocab), embedding_dim=4)
print("embedding matrix shape:", tuple(emb.weight.shape))

sentence = ["i", "love", "this", "movie"]
ids = torch.tensor([[vocab[w] for w in sentence]])     # (batch=1, seq_len=4)
vectors = emb(ids)                                      # (1, 4, 4): one vector per token
print("token ids:", ids.tolist())
print("output shape:", tuple(vectors.shape))

# a lookup is the same as one-hot @ weight matrix
one_hot = nn.functional.one_hot(ids, num_classes=len(vocab)).float()
print("same as one-hot matmul:", torch.allclose(one_hot @ emb.weight, vectors))
print("embeddings are trainable:", emb.weight.requires_grad)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">embedding matrix shape: (6, 4)
token ids: [[1, 2, 4, 5]]
output shape: (1, 4, 4)
same as one-hot matmul: True
embeddings are trainable: True</code></pre>

<h3>Watching embeddings learn</h3>
<p>Here a tiny model learns embeddings for a sentiment task: average the word vectors of a sentence, then apply a linear classifier. We start with random 2-dimensional embeddings and check whether words with the same sentiment end up close together after training.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

sentences = [("great fun movie", 1), ("loved the acting", 1), ("great acting", 1),
             ("wonderful and fun", 1), ("loved it", 1), ("boring awful movie", 0),
             ("hated the acting", 0), ("awful plot", 0), ("boring and dull", 0), ("hated it", 0)]
words = sorted({w for s, _ in sentences for w in s.split()})
idx = {w: i for i, w in enumerate(words)}

class BagOfEmbeddings(nn.Module):
    def __init__(self, vocab_size, dim=2):
        super().__init__()
        self.emb = nn.Embedding(vocab_size, dim)
        self.out = nn.Linear(dim, 1)
    def forward(self, ids):
        return self.out(self.emb(ids).mean(dim=0))      # average the word vectors

model = BagOfEmbeddings(len(words))
opt = torch.optim.Adam(model.parameters(), lr=0.05)
for epoch in range(200):
    for text, label in sentences:
        ids = torch.tensor([idx[w] for w in text.split()])
        loss = nn.functional.binary_cross_entropy_with_logits(model(ids), torch.tensor([float(label)]))
        opt.zero_grad(); loss.backward(); opt.step()

W = model.emb.weight.detach()
def cos(a, b):
    return nn.functional.cosine_similarity(W[idx[a]], W[idx[b]], dim=0).item()
print("cos(great, loved)  =", round(cos("great", "loved"), 3))
print("cos(awful, boring) =", round(cos("awful", "boring"), 3))
print("cos(great, awful)  =", round(cos("great", "awful"), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">cos(great, loved)  = 0.993
cos(awful, boring) = 0.607
cos(great, awful)  = -0.827</code></pre>
<p>Nobody told the model that "great" and "loved" are related. They ended up pointing the same way because they play the same role for this task, while "great" and "awful" point in opposite directions. Embeddings trained on a narrow task encode only what that task needs. Embeddings from large-scale pretraining capture far richer, more general meaning.</p>

<h3>Limits of static word embeddings</h3>
<p>word2vec and GloVe give each word <em>one</em> vector, whatever the context. "Bank" gets the same vector in "river bank" and "bank account", a blend of both meanings. <strong>Contextual embeddings</strong> from transformers (BERT, GPT) fix this. They compute a different vector for each <em>occurrence</em> of a word, based on the surrounding words, using attention. That is the subject of the next module.</p>
<div class="callout book"><strong>Book:</strong> Generative AI on AWS, Ch. 3 "Large-Language Foundation Models", discusses embeddings as the numeric representation every token is mapped to before it enters a foundation model. AI Engineering (Chip Huyen) returns to embeddings for retrieval in Ch. 6.</div>
<div class="callout warn"><strong>Common mistake:</strong> comparing embeddings from <em>different</em> models. Each model learns its own space, so a vector from model A and a vector from model B are not comparable, even if they have the same dimension. In a search system, documents and queries must be embedded with the same model, and changing the model means re-embedding everything.</div>
`,
          keyPoints: [
            "An embedding is a dense learned vector; similar meanings give nearby vectors (the distributional hypothesis).",
            "Cosine similarity compares directions: 1 means the same direction, 0 unrelated; with unit vectors it equals the dot product.",
            "Relationships can appear as directions, e.g. king - man + woman lands near queen.",
            "nn.Embedding is a trainable lookup table of shape (vocab_size, dim), trained by backprop with the model.",
            "Static embeddings give one vector per word; transformers produce contextual embeddings per occurrence."
          ],
          exercise: {
            prompt: String.raw`<p>Extend the hand-made embedding dictionary with <code>"princess"</code>, <code>"boy"</code> and <code>"girl"</code> (choose sensible values for the four dimensions royal, male, female, food). Then (a) solve the analogy <code>prince - boy + girl</code>, (b) find the 3 nearest neighbours of <code>"bread"</code>, and (c) write a function <code>normalize_all</code> that scales all vectors to unit length, and check that the dot product then equals the cosine similarity.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

E = {
    "king":     np.array([0.95, 0.90, 0.05, 0.00]),
    "queen":    np.array([0.95, 0.05, 0.90, 0.00]),
    "man":      np.array([0.05, 0.92, 0.04, 0.02]),
    "woman":    np.array([0.04, 0.03, 0.93, 0.02]),
    "prince":   np.array([0.80, 0.85, 0.05, 0.00]),
    "princess": np.array([0.80, 0.05, 0.88, 0.00]),
    "boy":      np.array([0.03, 0.80, 0.03, 0.02]),
    "girl":     np.array([0.03, 0.02, 0.82, 0.02]),
    "apple":    np.array([0.00, 0.02, 0.03, 0.95]),
    "bread":    np.array([0.02, 0.01, 0.02, 0.90]),
}

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def nearest(vec, exclude=(), k=3):
    s = {w: cosine(vec, v) for w, v in E.items() if w not in exclude}
    return [(w, round(float(c), 3)) for w, c in sorted(s.items(), key=lambda kv: -kv[1])[:k]]

print("prince - boy + girl ~", nearest(E["prince"] - E["boy"] + E["girl"], {"prince", "boy", "girl"}))
print("nearest to bread:", nearest(E["bread"], {"bread"}))

def normalize_all(E):
    return {w: v / np.linalg.norm(v) for w, v in E.items()}

U = normalize_all(E)
print("dot of unit vectors:", round(np.dot(U["king"], U["queen"]), 6),
      "| cosine:", round(cosine(E["king"], E["queen"]), 6))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">prince - boy + girl ~ [('princess', 1.0), ('queen', 0.998), ('woman', 0.753)]
nearest to bread: [('apple', 1.0), ('girl', 0.048), ('woman', 0.045)]
dot of unit vectors: 0.578717 | cosine: 0.578717</code></pre>
<p>The analogy lands on "princess", because the operation swaps the male direction for the female one and keeps royalty. "bread" is nearest to "apple", the only other food word. For unit vectors, |a| = |b| = 1, so the cosine formula reduces to the dot product. That is why vector databases often store normalized embeddings.</p>`
          },
          quiz: [
            { q: "What does the distributional hypothesis state?", options: ["Words are distributed uniformly in text", "Words that occur in similar contexts tend to have similar meanings", "Every word needs its own dimension", "Rare words are the most important"], answer: 1, explain: "This idea, 'you shall know a word by the company it keeps', is what lets embedding methods learn meaning from raw text without labels." },
            { q: "Two embedding vectors have cosine similarity close to 0. What does that suggest?", options: ["They are identical", "They are unrelated (roughly perpendicular)", "They are opposites", "One of them is zero"], answer: 1, explain: "Cosine 1 means the same direction, 0 perpendicular (unrelated), and -1 opposite." },
            { q: "What is nn.Embedding(10000, 256) internally?", options: ["A convolution", "A trainable 10000 x 256 lookup table; row i is token i's vector", "A fixed one-hot encoder", "An attention layer"], answer: 1, explain: "It stores one learnable 256-dimensional vector per token id. Indexing a row equals multiplying a one-hot vector by the matrix." },
            { q: "Why can static word embeddings (word2vec) not handle 'bank' in 'river bank' versus 'bank loan'?", options: ["They have no vector for 'bank'", "Each word gets a single vector regardless of context", "They only work for nouns", "Cosine similarity is undefined for 'bank'"], answer: 1, explain: "Static embeddings assign one vector per word type. Transformers produce contextual embeddings that differ by surrounding words." }
          ]
        },
        {
          id: "dl-nlp-tokenization",
          title: "Tokenization: Words, Characters and Subwords (BPE)",
          minutes: 50,
          objectives: [
            "Compare word-, character- and subword-level tokenization and their trade-offs",
            "Explain how Byte Pair Encoding builds a vocabulary by merging frequent pairs",
            "Implement BPE merge steps on a toy corpus",
            "Relate tokens to words, cost and context limits in LLM APIs"
          ],
          body: String.raw`
<p>Before any model sees text, a <strong>tokenizer</strong> splits it into tokens and maps each token to an integer id. Those ids index the embedding table you saw in the previous lesson. Tokenization seems like a minor preprocessing step, but it affects how much text fits in a model's context window, how much an API call costs, how well the model handles rare words, names, code and non-English languages, and even some well-known LLM quirks.</p>

<h3>Three granularities</h3>
<table>
  <thead><tr><th>Scheme</th><th>Example: "unbelievably"</th><th>Pros</th><th>Cons</th></tr></thead>
  <tbody>
    <tr><td>Word-level</td><td>["unbelievably"]</td><td>Short sequences, intuitive units</td><td>Huge vocabulary; any unseen word becomes an unknown token</td></tr>
    <tr><td>Character-level</td><td>["u","n","b","e","l",...]</td><td>Tiny vocabulary, no unknown words</td><td>Very long sequences; the model must learn spelling from scratch</td></tr>
    <tr><td>Subword-level</td><td>["un", "believ", "ably"]</td><td>Moderate vocabulary (30k to 200k), no unknown words, frequent words stay whole</td><td>Splits can be unintuitive, and are uneven across languages</td></tr>
  </tbody>
</table>
<p>Subword tokenization is the standard for every modern LLM. Common words ("the", "and", " house") are single tokens. Rare words are built from pieces, so the model can still handle a word it has never seen, such as "Huyenification", by composing familiar parts.</p>

<h3>Byte Pair Encoding (BPE)</h3>
<p>BPE, adapted from a 1994 compression algorithm, learns a subword vocabulary from a training corpus with a simple greedy loop:</p>
<ol>
  <li>Start with every word split into characters, plus an end-of-word marker. The initial vocabulary is the set of characters. (Byte-level BPE, used by GPT models, starts from the 256 possible bytes, so <em>any</em> text, including emoji and code, can be encoded.)</li>
  <li>Count every pair of adjacent symbols across the corpus, weighted by word frequency.</li>
  <li><strong>Merge</strong> the most frequent pair into a new symbol, for example "e" + "s" becomes "es", and add it to the vocabulary.</li>
  <li>Repeat until the vocabulary reaches the target size. The ordered list of merges <em>is</em> the tokenizer.</li>
</ol>
<p>To tokenize new text, split it into characters and apply the learned merges in the same order. Frequent words collapse into a single token. Rare words stay as several pieces.</p>

<pre><code class="lang-python runnable">from collections import Counter

# toy corpus: word -&gt; frequency. '_' marks the end of a word.
corpus = {"low": 5, "lower": 2, "newest": 6, "widest": 3}
words = {tuple(w) + ("_",): f for w, f in corpus.items()}

def pair_counts(words):
    counts = Counter()
    for symbols, freq in words.items():
        for a, b in zip(symbols, symbols[1:]):
            counts[(a, b)] += freq
    return counts

def merge(words, pair):
    merged = {}
    for symbols, freq in words.items():
        out, i = [], 0
        while i &lt; len(symbols):
            if i &lt; len(symbols) - 1 and (symbols[i], symbols[i + 1]) == pair:
                out.append(symbols[i] + symbols[i + 1]); i += 2
            else:
                out.append(symbols[i]); i += 1
        merged[tuple(out)] = freq
    return merged

merges = []
for step in range(1, 7):
    counts = pair_counts(words)
    best = max(counts, key=counts.get)
    words = merge(words, best)
    merges.append(best)
    print(f"merge {step}: {best[0]!r} + {best[1]!r} (count {counts[best]}) -&gt; "
          + " | ".join(" ".join(s) for s in words))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">merge 1: 'e' + 's' (count 9) -&gt; l o w _ | l o w e r _ | n e w es t _ | w i d es t _
merge 2: 'es' + 't' (count 9) -&gt; l o w _ | l o w e r _ | n e w est _ | w i d est _
merge 3: 'est' + '_' (count 9) -&gt; l o w _ | l o w e r _ | n e w est_ | w i d est_
merge 4: 'l' + 'o' (count 7) -&gt; lo w _ | lo w e r _ | n e w est_ | w i d est_
merge 5: 'lo' + 'w' (count 7) -&gt; low _ | low e r _ | n e w est_ | w i d est_
merge 6: 'n' + 'e' (count 6) -&gt; low _ | low e r _ | ne w est_ | w i d est_</code></pre>
<p>The first merges glue together the most frequent patterns, such as the "est" in "newest" and "widest". After six merges, the frequent word "newest" is down to three pieces ("ne", "w", "est_"), and "low" is a single token. With a few more merges (next block), "newest" becomes a single token, while rarer words are still split into pieces. Real tokenizers run tens of thousands of merges on gigabytes of text.</p>

<h3>Applying the learned merges to new words</h3>
<pre><code class="lang-python runnable">from collections import Counter

corpus = {"low": 5, "lower": 2, "newest": 6, "widest": 3}
words = {tuple(w) + ("_",): f for w, f in corpus.items()}

def merge_symbols(symbols, pair):
    out, i = [], 0
    while i &lt; len(symbols):
        if i &lt; len(symbols) - 1 and (symbols[i], symbols[i + 1]) == pair:
            out.append(symbols[i] + symbols[i + 1]); i += 2
        else:
            out.append(symbols[i]); i += 1
    return tuple(out)

merges = []                                   # learn 10 merges
for _ in range(10):
    counts = Counter()
    for s, f in words.items():
        for p in zip(s, s[1:]):
            counts[p] += f
    best = max(counts, key=counts.get)
    merges.append(best)
    words = {merge_symbols(s, best): f for s, f in words.items()}

def tokenize(word):
    symbols = tuple(word) + ("_",)
    for pair in merges:                       # apply merges in learned order
        symbols = merge_symbols(symbols, pair)
    return list(symbols)

vocab = sorted({sym for s in words for sym in s} | {c for w in corpus for c in w} | {"_"})
ids = {tok: i for i, tok in enumerate(vocab)}
for w in ["newest", "lowest", "slower", "wide"]:
    toks = tokenize(w)
    print(f"{w:8s} -&gt; {toks}  ids={[ids.get(t, -1) for t in toks]}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">newest   -&gt; ['newest_']  ids=[9]
lowest   -&gt; ['low', 'est_']  ids=[6, 3]
slower   -&gt; ['s', 'low', 'e', 'r', '_']  ids=[12, 6, 2, 11, 0]
wide     -&gt; ['wi', 'd', 'e', '_']  ids=[15, 1, 2, 0]</code></pre>
<p>"lowest" never appeared in the corpus, but it is tokenized from known pieces ("low" + "est_"). "slower" contains an "s" at the start that was never merged with anything, so it stays a single character. A character missing from the base vocabulary entirely would get id -1 here. Byte-level BPE avoids that case completely, because every possible byte is in the base vocabulary.</p>

<h3>Real tokenizers</h3>
<p>OpenAI's models use byte-level BPE vocabularies provided by the <code>tiktoken</code> library. The snippet below is <em>not runnable</em> offline, because tiktoken downloads the encoding file the first time:</p>
<pre><code class="lang-python">import tiktoken

enc = tiktoken.get_encoding("cl100k_base")       # ~100k-token vocabulary (GPT-4 era)
ids = enc.encode("Tokenization is surprisingly important!")
print(len(ids), ids)
print([enc.decode([i]) for i in ids])            # the individual token strings
# e.g. ['Token', 'ization', ' is', ' surprisingly', ' important', '!']
</code></pre>
<p>Other families use related algorithms. WordPiece (BERT) is a BPE variant that picks merges by likelihood. SentencePiece/Unigram (T5, Llama 1 and 2) treats text as a raw character stream, so spaces become part of tokens (often shown as "▁"). Note that leading spaces are usually part of a token: " important" (with a space) and "important" are different tokens.</p>

<h3>Why tokenization matters when you build LLM apps</h3>
<ul>
  <li><strong>Cost and limits are counted in tokens.</strong> API pricing, rate limits and context windows are all measured in tokens, not words. For English, a rough rule is <strong>1 token is about 4 characters, or about 0.75 words</strong>, so 1,000 words is about 1,300 tokens.</li>
  <li><strong>Languages are not equal.</strong> Tokenizers trained mostly on English split other languages into more pieces. The same sentence in Hindi, Burmese or Amharic can take several times more tokens than in English. It then costs more, runs slower, and fits less into the context window.</li>
  <li><strong>Odd behaviours have tokenizer causes.</strong> Models struggle to count the letters in "strawberry" or to reverse a word, partly because they see tokens, not characters. Numbers can be split inconsistently ("1234" might be "123" + "4"), which hurts arithmetic.</li>
  <li><strong>Vocabulary size is a trade-off.</strong> A larger vocabulary gives shorter sequences (faster, more fits in context) but a bigger embedding table and output layer. Modern LLMs use roughly 32k to 256k tokens.</li>
</ul>

<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models" (Training Data section), discusses how training-data language distribution and tokenization lead to higher token counts, and worse performance, for under-represented languages. Generative AI on AWS, Ch. 3 covers tokenizers as the first step of every foundation model.</div>
<div class="callout warn"><strong>Common mistake:</strong> mixing tokenizers. A model only understands ids from <em>its own</em> tokenizer. Encoding with one tokenizer and feeding the ids to another model gives garbage. Likewise, estimate tokens for cost or context with the tokenizer of the model you actually call.</div>
`,
          keyPoints: [
            "Tokenizers map text to integer ids; LLMs use subword tokenization to balance vocabulary size and sequence length.",
            "BPE starts from characters (or bytes) and repeatedly merges the most frequent adjacent pair.",
            "New text is tokenized by applying the learned merges in order; unseen words become known pieces.",
            "Costs, rate limits and context windows are in tokens; in English 1 token is about 4 characters, or 0.75 words.",
            "Token counts vary across languages, and tokenization explains some LLM quirks (spelling, arithmetic)."
          ],
          exercise: {
            prompt: String.raw`<p>Run BPE on the corpus <code>{"hug": 10, "pug": 5, "pun": 12, "bun": 4, "hugs": 5}</code> for 5 merges and print each merge. Then tokenize the unseen words <code>"bug"</code>, <code>"puns"</code> and <code>"hun"</code> with the learned merges, and say which one ends up split into the most tokens and why.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">from collections import Counter

corpus = {"hug": 10, "pug": 5, "pun": 12, "bun": 4, "hugs": 5}
words = {tuple(w) + ("_",): f for w, f in corpus.items()}

def merge_symbols(symbols, pair):
    out, i = [], 0
    while i &lt; len(symbols):
        if i &lt; len(symbols) - 1 and (symbols[i], symbols[i + 1]) == pair:
            out.append(symbols[i] + symbols[i + 1]); i += 2
        else:
            out.append(symbols[i]); i += 1
    return tuple(out)

merges = []
for step in range(1, 6):
    counts = Counter()
    for s, f in words.items():
        for p in zip(s, s[1:]):
            counts[p] += f
    best = max(counts, key=counts.get)
    merges.append(best)
    words = {merge_symbols(s, best): f for s, f in words.items()}
    print(f"merge {step}: {best} (count {counts[best]})")

def tokenize(word):
    s = tuple(word) + ("_",)
    for pair in merges:
        s = merge_symbols(s, pair)
    return list(s)

for w in ["bug", "puns", "hun"]:
    print(w, "-&gt;", tokenize(w))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">merge 1: ('u', 'g') (count 20)
merge 2: ('u', 'n') (count 16)
merge 3: ('un', '_') (count 16)
merge 4: ('h', 'ug') (count 15)
merge 5: ('p', 'un_') (count 12)
bug -&gt; ['b', 'ug', '_']
puns -&gt; ['p', 'un', 's', '_']
hun -&gt; ['h', 'un_']</code></pre>
<p>The merges first build the frequent pieces "ug" and "un", then the word-final "un_" and whole frequent words such as "hug" and "pun_". Here "puns" ends up with the most tokens (4): the learned piece "un_" only applies at the end of a word, so the trailing "s" forces "un" + "s" + "_". An unseen word is assembled from whatever learned pieces fit. Words built from frequent pieces need few tokens, while words with unusual letter combinations break into more and smaller pieces. That is the same reason rare names and under-represented languages cost more tokens in real LLMs.</p>`
          },
          quiz: [
            { q: "Why do modern LLMs use subword tokenization instead of word-level tokenization?", options: ["Subwords are easier for humans to read", "It keeps the vocabulary manageable while still representing any word, including unseen ones, as pieces", "Word-level tokenization is too fast", "Subwords remove the need for embeddings"], answer: 1, explain: "Word-level vocabularies explode and cannot handle unseen words. Character-level sequences are too long. Subwords balance the two." },
            { q: "What does each BPE training step do?", options: ["Removes the rarest character", "Merges the most frequent adjacent pair of symbols into a new symbol", "Splits every word in half", "Assigns random ids to words"], answer: 1, explain: "BPE greedily adds the most frequent adjacent pair as a new vocabulary item and repeats until the target vocabulary size is reached." },
            { q: "Roughly how many tokens is a 750-word English document?", options: ["About 100", "About 1,000", "About 7,500", "Exactly 750"], answer: 1, explain: "A common rule is 1 token is about 0.75 English words, so 750 words is about 1,000 tokens. Other languages often need more." },
            { q: "Why can the same sentence cost more tokens in some languages than in English?", options: ["Those languages have longer words by law", "Tokenizers trained mostly on English text learned fewer merges for other scripts, so they split them into more pieces", "APIs charge extra for non-English", "Non-English text cannot be tokenized"], answer: 1, explain: "BPE merges reflect the training corpus. Under-represented languages get fewer long tokens, so they need more tokens per sentence." }
          ]
        },
        {
          id: "dl-nlp-semantic-search",
          title: "Sentence Embeddings and Semantic Search",
          minutes: 45,
          objectives: [
            "Explain what a sentence embedding is and how it can be built from token embeddings",
            "Implement semantic search: embed documents, embed a query, rank by cosine similarity",
            "Contrast keyword (TF-IDF) search with semantic search, and know when to combine them",
            "Describe how this becomes the retrieval step of a RAG system"
          ],
          body: String.raw`
<p>Word embeddings place <em>words</em> in a meaningful space. Most applications need to compare whole <em>texts</em>: a user's question against help-centre articles, a support ticket against past tickets, a CV against job descriptions. A <strong>sentence embedding</strong> (or text embedding) maps an entire piece of text to a single vector, so that texts with similar meaning are close together even when they share no words. Searching by these vectors is called <strong>semantic search</strong>. It is the foundation of retrieval-augmented generation (RAG), the most common pattern for building LLM applications on your own data.</p>

<h3>From token vectors to one vector</h3>
<p>A transformer encoder produces one contextual vector per token. To get one vector for the whole text, we <strong>pool</strong> them:</p>
<ul>
  <li><strong>Mean pooling:</strong> average all token vectors. It is simple and works well, and it is what many sentence-embedding models do.</li>
  <li><strong>[CLS] pooling:</strong> BERT-style models add a special token whose final vector is trained to summarize the input.</li>
  <li><strong>Last-token pooling:</strong> common for decoder (GPT-style) embedding models.</li>
</ul>
<p>Pooling alone is not enough for high-quality search. Good embedding models (Sentence-BERT, OpenAI's text-embedding models, Amazon Titan Embeddings, Cohere Embed) are additionally trained with <strong>contrastive learning</strong>. They see pairs of texts that should match, such as a question and its answer or two paraphrases. Training pulls matching pairs together and pushes non-matching pairs apart. The resulting space is organized specifically so that "similar meaning" means "high cosine similarity".</p>

<h3>The semantic search algorithm</h3>
<ol>
  <li><strong>Index (offline):</strong> split your documents into chunks, embed each chunk, and store the vectors (normalized to unit length) with the original text.</li>
  <li><strong>Query (online):</strong> embed the user's query with the <em>same</em> model.</li>
  <li><strong>Rank:</strong> compute cosine similarity, which is the dot product for unit vectors, between the query and every chunk, and return the top k.</li>
</ol>
<p>For thousands of documents, a NumPy matrix multiplication is enough. For millions, you use a <strong>vector database</strong> or index (FAISS, pgvector, OpenSearch, Pinecone and others). These use approximate nearest-neighbour algorithms that search in milliseconds without comparing against every vector.</p>

<h3>A self-contained demonstration</h3>
<p>Real embedding models are downloaded or called through an API, so to stay offline we build a toy "embedding model". Each word gets a small hand-made vector over five topic dimensions, and a text's embedding is the normalized mean of its word vectors. This is mean pooling over static embeddings. It is crude, but the mechanics are exactly those of a real system, and it shows the key property: matching on meaning, not on shared words.</p>

<pre><code class="lang-python runnable">import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Toy word vectors over 5 topic dimensions: [account, payment, delivery, product, greeting]
WORD_VECS = {
    "password": [1, 0, 0, 0, 0], "login": [1, 0, 0, 0, 0], "log": [.9, 0, 0, 0, 0],
    "account": [1, .1, 0, 0, 0], "sign": [.8, 0, 0, 0, 0], "credentials": [1, 0, 0, 0, 0],
    "locked": [.9, 0, 0, 0, 0], "reset": [.7, 0, 0, .1, 0], "recover": [.7, 0, 0, 0, 0],
    "refund": [0, 1, 0, 0, 0], "money": [0, 1, 0, 0, 0], "charged": [0, 1, 0, 0, 0],
    "payment": [0, 1, 0, 0, 0], "reimbursement": [0, 1, 0, 0, 0], "card": [.1, .9, 0, 0, 0],
    "parcel": [0, 0, 1, 0, 0], "package": [0, 0, 1, 0, 0], "shipping": [0, .1, 1, 0, 0],
    "delivery": [0, 0, 1, 0, 0], "arrive": [0, 0, .9, 0, 0], "courier": [0, 0, 1, 0, 0],
    "broken": [0, 0, 0, 1, 0], "defective": [0, 0, 0, 1, 0], "screen": [0, 0, 0, .9, 0],
    "warranty": [0, .2, 0, .9, 0], "hello": [0, 0, 0, 0, 1], "thanks": [0, 0, 0, 0, 1],
}

def embed(text):
    tokens = re.findall(r"[a-z]+", text.lower())
    vecs = [WORD_VECS[t] for t in tokens if t in WORD_VECS]
    v = np.mean(vecs, axis=0) if vecs else np.zeros(5)
    return v / (np.linalg.norm(v) + 1e-9)            # unit length

docs = [
    "How to reset your password and recover access",
    "Requesting a refund for a duplicate charge on your card",
    "Tracking your parcel and expected delivery times",
    "Warranty claims for a defective or broken screen",
    "Unlocking a locked account after failed sign in attempts",
]
doc_matrix = np.stack([embed(d) for d in docs])       # the "index": (5, 5)

def semantic_search(query, k=2):
    scores = doc_matrix @ embed(query)                 # cosine similarity (unit vectors)
    top = np.argsort(scores)[::-1][:k]
    return [(round(float(scores[i]), 3), docs[i]) for i in top]

tfidf = TfidfVectorizer().fit(docs)
def keyword_search(query, k=2):
    scores = (tfidf.transform(docs) @ tfidf.transform([query]).T).toarray().ravel()
    top = np.argsort(scores)[::-1][:k]
    return [(round(float(scores[i]), 3), docs[i]) for i in top]

for q in ["I can't log in with my credentials", "where is my package, the courier is late",
          "I want my money back"]:
    print("QUERY:", q)
    print("  semantic:", semantic_search(q)[0])
    print("  keyword :", keyword_search(q)[0])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">QUERY: I can't log in with my credentials
  semantic: (0.999, 'Unlocking a locked account after failed sign in attempts')
  keyword : (0.354, 'Unlocking a locked account after failed sign in attempts')
QUERY: where is my package, the courier is late
  semantic: (1.0, 'Tracking your parcel and expected delivery times')
  keyword : (0.0, 'Unlocking a locked account after failed sign in attempts')
QUERY: I want my money back
  semantic: (0.999, 'Requesting a refund for a duplicate charge on your card')
  keyword : (0.0, 'Unlocking a locked account after failed sign in attempts')</code></pre>
<p>Look at the keyword results. When the query shares no words with the right document, TF-IDF scores everything 0 and the top "hit" is arbitrary. For "I want my money back" it matches no document at all, because it shares no words with the refund article. Semantic search finds the right document every time, because "money" and "refund" live in the same region of the embedding space. That is the main benefit of embeddings for search.</p>

<h3>Keyword versus semantic search: use both</h3>
<table>
  <thead><tr><th></th><th>Keyword (TF-IDF / BM25)</th><th>Semantic (embeddings)</th></tr></thead>
  <tbody>
    <tr><td>Matches</td><td>Exact terms</td><td>Meaning, synonyms, paraphrases</td></tr>
    <tr><td>Strong at</td><td>Product codes, names, error messages, rare jargon</td><td>Natural-language questions, vague wording</td></tr>
    <tr><td>Weak at</td><td>Synonyms ("money back" vs "refund")</td><td>Exact identifiers ("error E1043"), terms the model never saw</td></tr>
    <tr><td>Cost</td><td>Cheap, no model needed</td><td>Needs an embedding model, and a re-index whenever the model changes</td></tr>
  </tbody>
</table>
<p>Production systems often use <strong>hybrid search</strong>: run both and merge the rankings (for example with reciprocal rank fusion). They then optionally apply a <strong>reranker</strong>, a more expensive model that rescores the top candidates.</p>

<h3>With a real embedding model</h3>
<p>The code shape stays the same. Only <code>embed</code> changes. With the open-source <code>sentence-transformers</code> library (not runnable offline, because it downloads the model the first time):</p>
<pre><code class="lang-python">from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")          # 384-dimensional embeddings
docs = ["How to reset your password", "Refund for a duplicate charge"]
doc_vecs = model.encode(docs, normalize_embeddings=True)  # (2, 384)
query_vec = model.encode("I can't sign in", normalize_embeddings=True)
scores = doc_vecs @ query_vec
print(docs[int(np.argmax(scores))])
</code></pre>
<p>The OpenAI and AWS tracks show the API equivalents (OpenAI embeddings, Amazon Titan Embeddings through Bedrock) and store the vectors in a vector database.</p>

<h3>Foreshadowing RAG</h3>
<p>An LLM knows only what was in its training data, which may be out of date, and it knows nothing about your private documents. <strong>Retrieval-augmented generation</strong> fixes this. For each user question, (1) semantic search retrieves the most relevant chunks from your documents, (2) they are pasted into the prompt as context, and (3) the LLM writes an answer grounded in them, ideally citing them. You have just built step 1. Steps 2 and 3 need the LLM knowledge from the next module.</p>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 6 "RAG and Agents" covers retrieval algorithms (term-based versus embedding-based, hybrid search, reranking) in depth, building on the embedding ideas from Ch. 2-4. Generative AI on AWS, Ch. 3 introduces embeddings, and later chapters use them for RAG on AWS.</div>
<div class="callout warn"><strong>Common mistakes:</strong> (1) Embedding the documents with one model and the queries with another, which gives meaningless similarities. (2) Forgetting to normalize the vectors and then using the dot product as if it were cosine similarity, so longer vectors win unfairly. (3) Embedding whole long documents as one vector. Long texts blur into an average, so split them into chunks of a few hundred tokens.</div>
`,
          keyPoints: [
            "A sentence embedding maps a whole text to one vector; good models are trained contrastively so similar meaning gives high cosine similarity.",
            "Semantic search: embed and normalize chunks offline, embed the query with the same model, rank by dot product.",
            "Keyword search matches exact terms; semantic search matches meaning; hybrid search combines both.",
            "Vector databases provide fast approximate nearest-neighbour search at scale.",
            "Semantic search is the retrieval step of RAG: retrieved chunks are added to the LLM prompt as context."
          ],
          exercise: {
            prompt: String.raw`<p>Using the lesson's toy <code>embed</code> function and documents, implement a simple <strong>hybrid search</strong>: compute both the semantic scores and the TF-IDF scores for a query, combine them as <code>0.7 * semantic + 0.3 * keyword</code>, and return the best document. Test it on "broken screen warranty" and "parcel delivery", and print the three scores of the top result each time.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

WORD_VECS = {
    "password": [1, 0, 0, 0, 0], "login": [1, 0, 0, 0, 0], "account": [1, .1, 0, 0, 0],
    "locked": [.9, 0, 0, 0, 0], "reset": [.7, 0, 0, .1, 0], "recover": [.7, 0, 0, 0, 0],
    "sign": [.8, 0, 0, 0, 0], "refund": [0, 1, 0, 0, 0], "charge": [0, 1, 0, 0, 0],
    "card": [.1, .9, 0, 0, 0], "parcel": [0, 0, 1, 0, 0], "delivery": [0, 0, 1, 0, 0],
    "broken": [0, 0, 0, 1, 0], "defective": [0, 0, 0, 1, 0], "screen": [0, 0, 0, .9, 0],
    "warranty": [0, .2, 0, .9, 0],
}

def embed(text):
    vecs = [WORD_VECS[t] for t in re.findall(r"[a-z]+", text.lower()) if t in WORD_VECS]
    v = np.mean(vecs, axis=0) if vecs else np.zeros(5)
    return v / (np.linalg.norm(v) + 1e-9)

docs = ["How to reset your password and recover access",
        "Requesting a refund for a duplicate charge on your card",
        "Tracking your parcel and expected delivery times",
        "Warranty claims for a defective or broken screen",
        "Unlocking a locked account after failed sign in attempts"]
D = np.stack([embed(d) for d in docs])
tfidf = TfidfVectorizer().fit(docs)
T = tfidf.transform(docs)

def hybrid_search(query, w_sem=0.7, w_kw=0.3):
    sem = D @ embed(query)
    kw = (T @ tfidf.transform([query]).T).toarray().ravel()
    combined = w_sem * sem + w_kw * kw
    i = int(np.argmax(combined))
    return docs[i], round(float(sem[i]), 3), round(float(kw[i]), 3), round(float(combined[i]), 3)

for q in ["broken screen warranty", "parcel delivery"]:
    doc, s, k, c = hybrid_search(q)
    print(f"{q!r} -&gt; {doc!r}\n   semantic={s} keyword={k} combined={c}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">'broken screen warranty' -&gt; 'Warranty claims for a defective or broken screen'
   semantic=1.0 keyword=0.672 combined=0.901
'parcel delivery' -&gt; 'Tracking your parcel and expected delivery times'
   semantic=1.0 keyword=0.573 combined=0.872</code></pre>
<p>Both signals agree here, so the combined score is high. Hybrid search pays off when they disagree. Semantic search rescues paraphrases with no shared words, and keyword search rescues exact identifiers that the embedding model does not understand. Production systems usually merge <em>ranks</em> (reciprocal rank fusion) rather than raw scores, because the two score scales are not directly comparable.</p>`
          },
          quiz: [
            { q: "What is the main advantage of semantic search over TF-IDF keyword search?", options: ["It needs no model", "It can match texts with similar meaning even when they share no words", "It is always faster", "It matches exact product codes better"], answer: 1, explain: "Embeddings put paraphrases and synonyms close together. Keyword search needs overlapping terms and is better for exact identifiers." },
            { q: "Your documents were embedded with model A. Which model must embed the queries?", options: ["Any model with the same dimension", "Model A", "A larger model", "A keyword model"], answer: 1, explain: "Each model has its own vector space, so queries and documents must come from the same model. Changing the model means re-embedding the corpus." },
            { q: "Why normalize embeddings to unit length before indexing?", options: ["To save disk space", "So that the dot product equals cosine similarity and vector length does not bias the ranking", "To make the vectors integers", "It is required by Python"], answer: 1, explain: "For unit vectors a·b = cos(a, b), which is fast and comparable across documents of different length." },
            { q: "In a RAG system, what role does semantic search play?", options: ["It generates the final answer", "It retrieves relevant chunks that are inserted into the LLM's prompt as context", "It trains the LLM", "It tokenizes the input"], answer: 1, explain: "Retrieval finds the relevant context, and the LLM then generates an answer grounded in it. Generation and tokenization are separate steps." }
          ]
        }
      ]
    },
    {
      id: "dl-transformers",
      title: "Transformers and Large Language Models",
      summary: "Understand the engine of modern AI: attention, the transformer block, decoder-only LLMs and how they are trained, how text is generated with temperature, top-k and top-p, and what LLMs can and cannot do.",
      lessons: [
        {
          id: "dl-tf-attention",
          title: "Attention: Queries, Keys and Values",
          minutes: 60,
          objectives: [
            "Explain the intuition of attention as a soft, learned lookup",
            "Describe the roles of queries, keys and values",
            "Implement scaled dot-product attention in NumPy and explain the square-root scaling",
            "Apply a causal mask so tokens cannot see the future"
          ],
          body: String.raw`
<p>The RNN lesson ended with two problems: sequences were processed one step at a time, and all information about the past had to squeeze through a single hidden vector. <strong>Attention</strong> removes both. Every token can look directly at every other token, in one parallel operation, and decide for itself which ones matter. The transformer is built almost entirely from this one mechanism, and so is every modern LLM: GPT, Claude, Llama, Gemini.</p>

<h3>Intuition: context changes meaning</h3>
<p>Consider "The animal didn't cross the street because <em>it</em> was too tired." What does "it" refer to? You know it is the animal, because tired things are animals, not streets. Change "tired" to "wide" and "it" becomes the street. To build a good representation of "it", a model must <em>look at</em> other words in the sentence and pull in information from the relevant ones. Attention does exactly that. For each token it computes a weighted average of information from all tokens, with weights that depend on how relevant each one is.</p>

<h3>Queries, keys and values: a soft dictionary lookup</h3>
<p>Think of a library. You arrive with a <strong>query</strong> (what you are looking for). Each book has a <strong>key</strong> (its catalogue label) and a <strong>value</strong> (its contents). In a normal dictionary lookup, you find the single key that matches exactly and take its value. Attention does a <em>soft</em> lookup instead. It compares your query with <em>every</em> key, turns the match scores into weights that sum to 1, and returns a weighted blend of <em>all</em> the values.</p>
<p>In a transformer, each token's embedding <code>x</code> is projected by three learned weight matrices into three different vectors:</p>
<ul>
  <li><strong>Query</strong> <code>q = x @ W_Q</code>: "what am I looking for?" (for "it": a noun that can be tired).</li>
  <li><strong>Key</strong> <code>k = x @ W_K</code>: "what do I contain, to be matched against?" (for "animal": I am an animate noun).</li>
  <li><strong>Value</strong> <code>v = x @ W_V</code>: "what information do I pass on if someone attends to me?"</li>
</ul>
<p>The three matrices are learned by backpropagation, like any other weights. The model discovers which kinds of matches are useful.</p>

<figure><img src="assets/diagrams/dl-attention-qkv.svg" alt="Scaled dot-product attention: token embeddings X are projected into queries, keys and values; scores Q times K transposed are scaled by the square root of d_k, masked, softmaxed into attention weights, and multiplied by V to give the output"><figcaption>Scaled dot-product attention: compare queries with keys, softmax the scaled scores into weights, and mix the values.</figcaption></figure>

<h3>The maths: scaled dot-product attention</h3>
<p>For a sequence of n tokens, stack the vectors as matrices Q, K and V of shape (n, d_k). Then:</p>
<p><code>Attention(Q, K, V) = softmax( Q @ K.T / sqrt(d_k) ) @ V</code></p>
<ol>
  <li><code>scores = Q @ K.T</code>: an (n, n) matrix. Entry (i, j) is the dot product of token i's query with token j's key, that is, how relevant token j is to token i.</li>
  <li><strong>Scale</strong> by <code>1 / sqrt(d_k)</code>. A dot product of two random vectors with d_k components has variance proportional to d_k, so with d_k = 128 the raw scores can be large. Large scores make softmax extremely peaked, close to a one-hot vector, and its gradients become tiny. Dividing by sqrt(d_k) keeps the scores at about unit scale.</li>
  <li><strong>Softmax each row</strong>: row i becomes the attention weights of token i over all tokens. They are positive and sum to 1.</li>
  <li><code>weights @ V</code>: each output row is the weighted average of the value vectors, giving a new, context-aware representation of token i.</li>
</ol>
<p>Every step is a matrix multiplication or an element-wise operation, so all n tokens are processed <em>in parallel</em>, unlike an RNN. The cost: the score matrix is n x n, so compute and memory grow with the <em>square</em> of the sequence length. This is the main reason context windows are limited and long prompts are expensive.</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)              # (n, n) relevance of every token to every token
    if mask is not None:
        scores = np.where(mask, -1e9, scores)    # masked positions get ~zero weight
    weights = softmax(scores, axis=-1)           # each row sums to 1
    return weights @ V, weights

tokens = ["the", "cat", "sat", "down"]
n, d_model, d_k = len(tokens), 8, 4
X = np.random.randn(n, d_model)                  # token embeddings (n, d_model)
W_Q, W_K, W_V = (np.random.randn(d_model, d_k) * 0.5 for _ in range(3))

Q, K, V = X @ W_Q, X @ W_K, X @ W_V              # each (n, d_k)
out, weights = scaled_dot_product_attention(Q, K, V)
np.set_printoptions(precision=2, suppress=True)
print("Q, K, V shapes:", Q.shape, K.shape, V.shape)
print("attention weights (row = query token):")
for t, row in zip(tokens, weights):
    print(f"  {t:5s}", row)
print("row sums:", weights.sum(axis=1))
print("output shape:", out.shape)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Q, K, V shapes: (4, 4) (4, 4) (4, 4)
attention weights (row = query token):
  the   [0.99 0.   0.01 0.  ]
  cat   [0.76 0.06 0.13 0.05]
  sat   [0.02 0.07 0.85 0.05]
  down  [1. 0. 0. 0.]
row sums: [1. 1. 1. 1.]
output shape: (4, 4)</code></pre>
<p>Each row shows how much one token draws from every other token. The weights here are random, because the projection matrices are untrained. In a trained model these patterns become meaningful: pronouns attend to their nouns, verbs to their subjects, closing brackets to opening ones.</p>

<h3>Why the scaling matters</h3>
<pre><code class="lang-python runnable">import numpy as np
np.random.seed(1)

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

for d_k in (4, 64, 512):
    q = np.random.randn(d_k)
    K = np.random.randn(10, d_k)                  # 10 keys
    raw = K @ q
    print(f"d_k={d_k:3d}  std of raw scores {raw.std():6.2f} | "
          f"max weight unscaled {softmax(raw).max():.3f} | scaled {softmax(raw / np.sqrt(d_k)).max():.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">d_k=  4  std of raw scores   2.18 | max weight unscaled 0.410 | scaled 0.275
d_k= 64  std of raw scores   7.51 | max weight unscaled 0.663 | scaled 0.237
d_k=512  std of raw scores  15.64 | max weight unscaled 0.999 | scaled 0.236</code></pre>
<p>Without scaling, the scores spread out as d_k grows, so softmax piles almost all the weight onto a single key. The model then cannot blend information, and the gradients through softmax vanish. With scaling, the distribution stays soft whatever the dimension.</p>

<h3>Self-attention and the causal mask</h3>
<p>When Q, K and V all come from the same sequence, this is <strong>self-attention</strong>: the sequence attends to itself. (In <strong>cross-attention</strong>, used in translation models, queries come from one sequence and keys and values from another.)</p>
<p>A language model that generates text left to right must not peek at future tokens during training. Otherwise predicting the next word would be trivial: just look at it. A <strong>causal mask</strong> sets the scores for all positions j &gt; i to minus infinity before the softmax, so their weights become exactly 0. Token i can attend only to tokens 0 to i. Thanks to the mask, one forward pass trains the model on every position of a sequence at once: position 1 predicts token 2, position 2 predicts token 3, and so on.</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

def softmax(z):
    z = z - z.max(axis=-1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=-1, keepdims=True)

n, d_k = 4, 4
Q, K = np.random.randn(n, d_k), np.random.randn(n, d_k)
causal_mask = np.triu(np.ones((n, n), dtype=bool), k=1)    # True above the diagonal = future
print("mask (True = blocked):\n", causal_mask.astype(int))

scores = np.where(causal_mask, -1e9, Q @ K.T / np.sqrt(d_k))
weights = softmax(scores)
np.set_printoptions(precision=2, suppress=True)
print("causal attention weights:\n", weights)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mask (True = blocked):
 [[0 1 1 1]
 [0 0 1 1]
 [0 0 0 1]
 [0 0 0 0]]
causal attention weights:
 [[1.   0.   0.   0.  ]
 [0.98 0.02 0.   0.  ]
 [0.26 0.43 0.31 0.  ]
 [0.26 0.07 0.34 0.34]]</code></pre>
<p>The weight matrix is lower-triangular. The first token can only attend to itself (weight 1.0), and the last token can attend to everything before it. GPT-style models use this mask in every attention layer.</p>

<div class="callout warn"><strong>Common mistakes:</strong> (1) Forgetting the causal mask when training a generative model. The training loss drops to almost zero because the model copies the answer, and generation is then garbage. (2) Applying softmax along the wrong axis. Each <em>query's</em> weights (each row) must sum to 1, so use <code>axis=-1</code>. (3) Mismatched dimensions: Q and K must share d_k, while V can have a different width.</div>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models", section "Attention mechanism", explains query, key and value vectors and why the attention computation makes long contexts expensive.</div>
`,
          keyPoints: [
            "Attention lets every token build its representation from a weighted mix of all tokens' values.",
            "Queries ask, keys are matched against, values are passed on; all three are learned projections of the embeddings.",
            "Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V; the scaling keeps softmax from saturating.",
            "Self-attention is fully parallel but costs O(n^2) in sequence length.",
            "A causal mask blocks future positions, so a model can learn next-token prediction at all positions at once."
          ],
          exercise: {
            prompt: String.raw`<p>Build a tiny attention example where you choose Q, K and V by hand, so the result is predictable. Use 3 tokens with 2-dimensional keys <code>[[1, 0], [0, 1], [1, 1]]</code> and values <code>[[10, 0], [0, 10], [5, 5]]</code>. (a) Compute the attention output for the single query <code>[5, 0]</code>, with and without the sqrt(d_k) scaling. (b) Explain which value dominates and why. (c) What happens to the output as the query is multiplied by 10?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

K = np.array([[1, 0], [0, 1], [1, 1]], dtype=float)
V = np.array([[10, 0], [0, 10], [5, 5]], dtype=float)

for scale in (1, 10):
    q = np.array([5.0, 0.0]) * scale
    for scaled in (False, True):
        s = K @ q / (np.sqrt(2) if scaled else 1)
        w = softmax(s)
        print(f"query x{scale:2d} scaled={scaled!s:5s} weights={w.round(3)} output={(w @ V).round(2)}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">query x 1 scaled=False weights=[0.498 0.003 0.498] output=[7.47 2.53]
query x 1 scaled=True  weights=[0.493 0.014 0.493] output=[7.39 2.61]
query x10 scaled=False weights=[0.5 0.  0.5] output=[7.5 2.5]
query x10 scaled=True  weights=[0.5 0.  0.5] output=[7.5 2.5]</code></pre>
<p>(b) The query points along the first dimension. Keys 0 and 2 both have a 1 there, so they tie for the highest score, and their values [10, 0] and [5, 5] dominate. Key 1 is perpendicular to the query and gets little weight. (c) A larger query gives larger score gaps, so softmax becomes sharper and the output approaches the plain average of the tied values, [7.5, 2.5]. Scaling softens the weights but cannot undo a 10x larger query. That is why models also normalize their activations with LayerNorm.</p>`
          },
          quiz: [
            { q: "In attention, what does the score Q_i · K_j measure?", options: ["The value passed from token i to token j", "How relevant token j is to token i's query", "The position of token j", "The loss for token i"], answer: 1, explain: "The query-key dot product is the match score. After scaling and softmax it becomes the weight token i places on token j's value." },
            { q: "Why are attention scores divided by sqrt(d_k)?", options: ["To make them integers", "To keep their scale stable as d_k grows, so softmax does not saturate and gradients stay healthy", "To enforce the causal mask", "To reduce the number of parameters"], answer: 1, explain: "Dot products of d_k-dimensional vectors grow with d_k. Unscaled, softmax becomes nearly one-hot and its gradients vanish." },
            { q: "What does a causal mask do?", options: ["Removes padding tokens", "Prevents each token from attending to later (future) tokens", "Randomly drops attention weights", "Normalizes the values"], answer: 1, explain: "Future positions get minus infinity scores, so their softmax weights are 0. This keeps next-token training honest." },
            { q: "For a sequence of n tokens, how does the size of the attention score matrix grow?", options: ["Linearly, n", "Quadratically, n x n", "Logarithmically", "It is constant"], answer: 1, explain: "Every token is compared with every token, giving an n x n matrix. Doubling the context roughly quadruples the attention cost." }
          ]
        },
        {
          id: "dl-tf-block",
          title: "Multi-Head Attention, Positional Encoding and the Transformer Block",
          minutes: 55,
          objectives: [
            "Explain multi-head attention and why several heads help",
            "Explain why transformers need positional information, and implement sinusoidal positional encodings",
            "Describe each component of a transformer block: attention, feed-forward, residuals, LayerNorm",
            "Distinguish encoder-only, decoder-only and encoder-decoder transformers"
          ],
          body: String.raw`
<p>A single attention operation is powerful, but a transformer wraps it in a carefully designed <strong>block</strong> and stacks that block many times. GPT-3 has 96 blocks, and many open models have 32 to 80. This lesson assembles the full block from parts you already understand.</p>

<h3>Multi-head attention</h3>
<p>One attention operation produces one set of weights per token, so it can focus on one kind of relationship at a time. Language has many relationships at once: which noun a pronoun refers to, which verb goes with which subject, the previous word, matching quotation marks. <strong>Multi-head attention</strong> runs h attention operations ("heads") in parallel, each with its <em>own</em> W_Q, W_K and W_V of a smaller size, <code>d_head = d_model / h</code>. Each head can specialize in a different relationship. The heads' outputs are concatenated back to width d_model and mixed by an output projection W_O.</p>
<p>The total cost is about the same as one full-width attention operation, because each head works in a smaller subspace. With d_model = 512 and 8 heads, each head uses 64 dimensions. Studies of trained models do find heads that track syntax, that copy previous tokens, or that attend to the start of the sequence.</p>

<pre><code class="lang-python runnable">import numpy as np
np.random.seed(0)

def softmax(z):
    z = z - z.max(axis=-1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=-1, keepdims=True)

def multi_head_attention(X, W_Q, W_K, W_V, W_O, n_heads):
    n, d_model = X.shape
    d_head = d_model // n_heads
    # project, then split the last dimension into heads: (n_heads, n, d_head)
    def split(M):
        return M.reshape(n, n_heads, d_head).transpose(1, 0, 2)
    Q, K, V = split(X @ W_Q), split(X @ W_K), split(X @ W_V)
    scores = Q @ K.transpose(0, 2, 1) / np.sqrt(d_head)     # (n_heads, n, n)
    weights = softmax(scores)
    heads = weights @ V                                     # (n_heads, n, d_head)
    concat = heads.transpose(1, 0, 2).reshape(n, d_model)   # (n, d_model)
    return concat @ W_O, weights

n, d_model, n_heads = 5, 16, 4
X = np.random.randn(n, d_model)
W_Q, W_K, W_V, W_O = (np.random.randn(d_model, d_model) * 0.25 for _ in range(4))
out, weights = multi_head_attention(X, W_Q, W_K, W_V, W_O, n_heads)
print("output shape:", out.shape, "| weights shape:", weights.shape)
print("token 0's attention in each head:")
for h in range(n_heads):
    print(f"  head {h}:", weights[h, 0].round(2))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">output shape: (5, 16) | weights shape: (4, 5, 5)
token 0's attention in each head:
  head 0: [0.18 0.35 0.01 0.21 0.26]
  head 1: [0.21 0.13 0.37 0.17 0.11]
  head 2: [0.49 0.07 0.22 0.09 0.13]
  head 3: [0.18 0.25 0.14 0.27 0.16]</code></pre>
<p>Each head gives the same token a different attention pattern. The reshape and transpose calls are the whole trick: one big projection is split into <code>n_heads</code> slices that are processed in parallel as a batch.</p>

<h3>Positional encoding: telling the model about order</h3>
<p>Attention has a surprising property: it ignores order. If you shuffle the input tokens, each token's output is unchanged; it simply moves to the new position. To attention, "dog bites man" and "man bites dog" contain the same tokens, so they look the same. Word order obviously matters, so transformers add <strong>positional information</strong> to each token embedding before the first block.</p>
<ul>
  <li><strong>Sinusoidal encoding</strong> (the original 2017 paper): position p gets a fixed vector whose components are sines and cosines at different frequencies, <code>PE[p, 2i] = sin(p / 10000^(2i/d))</code> and <code>PE[p, 2i+1] = cos(p / 10000^(2i/d))</code>. Low dimensions change quickly with position, high dimensions slowly, much like the hands of a clock. Every position gets a unique pattern, and nearby positions get similar patterns.</li>
  <li><strong>Learned positional embeddings</strong> (GPT-2, BERT): a trainable table with one vector per position, <code>nn.Embedding(max_len, d_model)</code>. The model cannot handle positions beyond max_len.</li>
  <li><strong>Rotary position embeddings (RoPE)</strong> (Llama, Mistral and most recent LLMs): rotate the query and key vectors by an angle that depends on position, so the attention score depends on the <em>relative</em> distance between tokens. This tends to extend better to longer contexts.</li>
</ul>

<pre><code class="lang-python runnable">import numpy as np

def sinusoidal_positions(max_len, d_model):
    pos = np.arange(max_len)[:, None]                  # (max_len, 1)
    i = np.arange(0, d_model, 2)[None, :]              # even dimensions
    angles = pos / np.power(10000, i / d_model)
    pe = np.zeros((max_len, d_model))
    pe[:, 0::2] = np.sin(angles)
    pe[:, 1::2] = np.cos(angles)
    return pe

pe = sinusoidal_positions(50, 16)
np.set_printoptions(precision=2, suppress=True)
print("position 0:", pe[0, :6])
print("position 1:", pe[1, :6])
print("position 2:", pe[2, :6])

def cos(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
print("similarity pos10 vs pos11:", round(cos(pe[10], pe[11]), 3))
print("similarity pos10 vs pos40:", round(cos(pe[10], pe[40]), 3))
# the embedding fed to the first block = token embedding + positional encoding
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">position 0: [0. 1. 0. 1. 0. 1.]
position 1: [0.84 0.54 0.31 0.95 0.1  1.  ]
position 2: [ 0.91 -0.42  0.59  0.81  0.2   0.98]
similarity pos10 vs pos11: 0.936
similarity pos10 vs pos40: 0.337</code></pre>
<p>Neighbouring positions have very similar encodings, and distant positions less similar ones, so the model can work out both absolute and relative position.</p>

<h3>The transformer block</h3>
<figure><img src="assets/diagrams/transformer-block.svg" alt="Simplified transformer decoder block: input tokens become token plus positional embeddings, then N repeated layers of multi-head self-attention, add and norm, and a feed-forward network, producing output logits that are sampled into the next token"><figcaption>A decoder-only transformer: embeddings, then N identical blocks (attention + feed-forward, each with a residual connection and normalization), then output logits.</figcaption></figure>
<p>Each block has two sub-layers, each wrapped in a <strong>residual connection</strong> and <strong>layer normalization</strong>. Modern LLMs use the "pre-norm" arrangement:</p>
<pre><code class="lang-text">x = x + MultiHeadSelfAttention(LayerNorm(x))     # tokens exchange information
x = x + FeedForward(LayerNorm(x))                # each token is processed on its own
</code></pre>
<ul>
  <li><strong>Multi-head self-attention</strong> is the only place where tokens <em>communicate</em>.</li>
  <li>The <strong>feed-forward network (FFN)</strong> is a two-layer MLP applied to each token separately: <code>Linear(d, 4d), GELU, Linear(4d, d)</code>. It is where much of the model's "knowledge" is thought to be stored, and it holds about two-thirds of the parameters.</li>
  <li><strong>Residual connections</strong> (<code>x + f(x)</code>, the ResNet trick) give gradients a direct path through dozens of blocks and let each block learn a small refinement of the representation, not a complete rewrite.</li>
  <li><strong>LayerNorm</strong> rescales each token's vector to zero mean and unit variance (plus a learned scale and shift). This keeps activations in a stable range through depth. Many recent models use the simpler RMSNorm.</li>
</ul>
<p>The input and output of a block have the same shape, (N, n, d_model), so blocks can be stacked as deep as you like. After the last block, a final linear layer (the "LM head") maps each position's vector to <strong>logits over the whole vocabulary</strong>.</p>

<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.ln1 = nn.LayerNorm(d_model)
        self.attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True)
        self.ln2 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(nn.Linear(d_model, 4 * d_model), nn.GELU(),
                                 nn.Linear(4 * d_model, d_model))

    def forward(self, x, causal_mask):
        h = self.ln1(x)
        attn_out, _ = self.attn(h, h, h, attn_mask=causal_mask)
        x = x + attn_out                    # residual 1
        x = x + self.ffn(self.ln2(x))       # residual 2
        return x

d_model, n_heads, seq_len, batch = 64, 4, 10, 2
block = TransformerBlock(d_model, n_heads)
x = torch.randn(batch, seq_len, d_model)
mask = torch.triu(torch.ones(seq_len, seq_len, dtype=torch.bool), diagonal=1)
y = block(x, mask)
print("input", tuple(x.shape), "-&gt; output", tuple(y.shape))

n_attn = sum(p.numel() for p in block.attn.parameters())
n_ffn = sum(p.numel() for p in block.ffn.parameters())
n_all = sum(p.numel() for p in block.parameters())
print(f"attention params {n_attn}, FFN params {n_ffn}, total {n_all}")
print(f"FFN share: {n_ffn / n_all:.0%}")

# causality check: changing a LATER token must not change EARLIER outputs
x2 = x.clone(); x2[:, -1] += 1.0
print("earlier positions unchanged:", torch.allclose(block(x2, mask)[:, :-1], y[:, :-1], atol=1e-6))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">input (2, 10, 64) -&gt; output (2, 10, 64)
attention params 16640, FFN params 33088, total 49984
FFN share: 66%
earlier positions unchanged: True</code></pre>
<p>The output has the same shape as the input, the FFN holds about two-thirds of the parameters, and the causality check confirms that the mask works: editing the last token changed nothing before it.</p>

<h3>Three transformer families</h3>
<table>
  <thead><tr><th>Family</th><th>Attention</th><th>Trained to</th><th>Examples and uses</th></tr></thead>
  <tbody>
    <tr><td>Encoder-only</td><td>Bidirectional (no mask): each token sees the whole input</td><td>Fill in masked words</td><td>BERT, RoBERTa: classification, named-entity recognition, sentence embeddings for search</td></tr>
    <tr><td>Decoder-only</td><td>Causal: each token sees only the past</td><td>Predict the next token</td><td>GPT, Claude, Llama, Mistral: text generation, chat, code, agents</td></tr>
    <tr><td>Encoder-decoder</td><td>Encoder bidirectional; decoder causal plus cross-attention to the encoder</td><td>Map an input sequence to an output sequence</td><td>Original Transformer, T5, many translation and speech models (Whisper)</td></tr>
  </tbody>
</table>
<p>Decoder-only models came to dominate because next-token prediction scales well with data and compute, and because one generative model can handle almost any task through prompting.</p>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models" (Model Architecture, Transformer architecture) walks through transformer blocks, embedding and output layers, and how block count and model dimension determine model size. Generative AI on AWS, Ch. 3 compares encoder-only, decoder-only and encoder-decoder foundation models.</div>
<div class="callout warn"><strong>Common mistake:</strong> with <code>nn.MultiheadAttention</code>, forgetting <code>batch_first=True</code> (the default expects (seq, batch, dim)), or passing a float mask filled with 0 and 1 instead of a boolean mask or a mask of 0 and minus infinity. A boolean <code>True</code> means "not allowed to attend". Always test causality as above.</div>
`,
          keyPoints: [
            "Multi-head attention runs several smaller attention heads in parallel, so each can learn a different relationship.",
            "Attention ignores order, so positional information (sinusoidal, learned or RoPE) is added to the embeddings.",
            "A block is x + Attn(LN(x)) then x + FFN(LN(x)); residuals and LayerNorm make deep stacks trainable.",
            "The per-token FFN holds about two-thirds of a block's parameters; attention is where tokens communicate.",
            "Encoder-only (BERT) suits understanding and embeddings; decoder-only (GPT) suits generation; encoder-decoder suits sequence-to-sequence."
          ],
          exercise: {
            prompt: String.raw`<p>Stack 4 of the lesson's <code>TransformerBlock</code>s into a <code>MiniDecoder</code> module that also contains a token embedding (vocabulary 1,000), a learned positional embedding (max length 128), a final LayerNorm and an LM head <code>nn.Linear(d_model, 1000)</code>. Use d_model=128 and 4 heads. Run a batch of token ids of shape (2, 20) through it, print the logits' shape, and print the total parameter count split into embeddings, blocks and head.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)

class TransformerBlock(nn.Module):
    def __init__(self, d, h):
        super().__init__()
        self.ln1, self.ln2 = nn.LayerNorm(d), nn.LayerNorm(d)
        self.attn = nn.MultiheadAttention(d, h, batch_first=True)
        self.ffn = nn.Sequential(nn.Linear(d, 4 * d), nn.GELU(), nn.Linear(4 * d, d))
    def forward(self, x, mask):
        h = self.ln1(x)
        x = x + self.attn(h, h, h, attn_mask=mask)[0]
        return x + self.ffn(self.ln2(x))

class MiniDecoder(nn.Module):
    def __init__(self, vocab=1000, max_len=128, d=128, h=4, n_layers=4):
        super().__init__()
        self.tok = nn.Embedding(vocab, d)
        self.pos = nn.Embedding(max_len, d)
        self.blocks = nn.ModuleList([TransformerBlock(d, h) for _ in range(n_layers)])
        self.ln_f = nn.LayerNorm(d)
        self.head = nn.Linear(d, vocab)
    def forward(self, ids):
        n = ids.shape[1]
        x = self.tok(ids) + self.pos(torch.arange(n))
        mask = torch.triu(torch.ones(n, n, dtype=torch.bool), diagonal=1)
        for block in self.blocks:
            x = block(x, mask)
        return self.head(self.ln_f(x))

model = MiniDecoder()
ids = torch.randint(0, 1000, (2, 20))
print("logits shape:", tuple(model(ids).shape))

count = lambda m: sum(p.numel() for p in m.parameters())
print("embeddings:", count(model.tok) + count(model.pos))
print("blocks    :", count(model.blocks))
print("head+norm :", count(model.head) + count(model.ln_f))
print("total     :", count(model))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logits shape: (2, 20, 1000)
embeddings: 144384
blocks    : 793088
head+norm : 129256
total     : 1066728</code></pre>
<p>The logits have shape (batch, sequence, vocabulary): a score for every possible next token at every position. <code>nn.ModuleList</code> is needed so the blocks' parameters are registered (a plain Python list would hide them from <code>parameters()</code>). In real LLMs the token embedding and LM head often share weights ("weight tying") to save parameters.</p>`
          },
          quiz: [
            { q: "Why do transformers need positional encodings?", options: ["To reduce memory use", "Self-attention by itself ignores token order", "To normalize the embeddings", "To implement the causal mask"], answer: 1, explain: "Attention treats its input as a set: shuffling tokens just shuffles the outputs. Positional information makes order visible to the model." },
            { q: "What is the main benefit of multiple attention heads?", options: ["Each head can focus on a different type of relationship, at about the same total cost", "They remove the need for feed-forward layers", "They make attention linear in sequence length", "They replace positional encoding"], answer: 0, explain: "Heads work in smaller subspaces in parallel and specialize, for example in syntax, coreference or copying, and the results are concatenated." },
            { q: "In a transformer block, where do tokens exchange information with each other?", options: ["In the feed-forward network", "In the self-attention sub-layer", "In LayerNorm", "In the residual connection"], answer: 1, explain: "The FFN, LayerNorm and residuals act on each token independently. Only attention mixes information across positions." },
            { q: "Which architecture family do GPT-style chat models belong to?", options: ["Encoder-only", "Decoder-only", "Encoder-decoder", "Convolutional"], answer: 1, explain: "They are decoder-only transformers with causal self-attention, trained by next-token prediction. BERT is encoder-only and T5 is encoder-decoder." }
          ]
        },
        {
          id: "dl-tf-llms",
          title: "How LLMs Are Built: Next-Token Prediction, Pretraining and Alignment",
          minutes: 55,
          objectives: [
            "Explain next-token prediction and how one sequence yields many training examples",
            "Train a tiny character-level decoder-only transformer and generate text from it",
            "Describe the pipeline of pretraining, supervised fine-tuning (instruction tuning) and preference tuning (RLHF)",
            "Reason about parameters, data and compute at scale"
          ],
          body: String.raw`
<p>A large language model is a decoder-only transformer, the architecture from the last lesson, trained on one deceptively simple objective: <strong>predict the next token</strong>. Everything that makes ChatGPT or Claude useful, including writing, reasoning, coding and following instructions, emerges from doing that at enormous scale and then refining the model with human feedback. This lesson explains that pipeline and lets you train a tiny version yourself.</p>

<h3>Next-token prediction</h3>
<p>Given tokens <code>t1 ... tk</code>, the model outputs a probability distribution over the vocabulary for <code>t(k+1)</code>. Training minimizes the cross-entropy between that distribution and the token that actually came next in the training text. One training sequence gives many examples at once. For "the cat sat on the mat":</p>
<ul>
  <li>input "the", target "cat"</li>
  <li>input "the cat", target "sat"</li>
  <li>input "the cat sat", target "on" ... and so on.</li>
</ul>
<p>With the causal mask, one forward pass computes all of these predictions in parallel: the targets are simply the inputs shifted left by one. No labels are needed, because the text supervises itself. This is called <strong>self-supervised learning</strong>, and it is why LLMs can learn from trillions of tokens of web pages, books and code.</p>
<p>Why does such a simple objective produce such capable models? To predict the next word of a physics textbook, a legal contract or a Python file well, it helps to model grammar, facts, the author's reasoning and the program's logic. The lower the loss gets, the more of that structure the model must have captured.</p>

<h3>A tiny GPT you can train in seconds</h3>
<p>The code below trains a one-block, character-level decoder-only transformer on a small repetitive text, then generates new text one character at a time. It has every essential part of a real LLM: token and position embeddings, causal multi-head self-attention, a feed-forward network, residuals and LayerNorm, an LM head, shifted targets, cross-entropy loss and autoregressive sampling.</p>
<pre><code class="lang-python runnable">import torch
from torch import nn
torch.manual_seed(0)
torch.set_num_threads(1)

text = ("the cat sat on the mat. the dog sat on the log. "
        "the cat saw the dog. the dog saw the cat. ") * 20
chars = sorted(set(text))
stoi = {c: i for i, c in enumerate(chars)}
itos = {i: c for c, i in stoi.items()}
data = torch.tensor([stoi[c] for c in text])
V, T, D = len(chars), 32, 64          # vocab size, context length, model width

class TinyGPT(nn.Module):
    def __init__(self):
        super().__init__()
        self.tok = nn.Embedding(V, D)                 # token embeddings
        self.pos = nn.Embedding(T, D)                 # learned positional embeddings
        self.attn = nn.MultiheadAttention(D, num_heads=4, batch_first=True)
        self.ln1, self.ln2 = nn.LayerNorm(D), nn.LayerNorm(D)
        self.ffn = nn.Sequential(nn.Linear(D, 4 * D), nn.GELU(), nn.Linear(4 * D, D))
        self.head = nn.Linear(D, V)                   # logits over the vocabulary
        self.register_buffer("mask", torch.triu(torch.ones(T, T, dtype=torch.bool), diagonal=1))

    def forward(self, idx):
        n = idx.shape[1]
        x = self.tok(idx) + self.pos(torch.arange(n))
        h = self.ln1(x)
        a, _ = self.attn(h, h, h, attn_mask=self.mask[:n, :n])   # causal self-attention
        x = x + a                                     # residual connection
        x = x + self.ffn(self.ln2(x))                 # residual connection
        return self.head(x)                           # (N, n, V)

model = TinyGPT()
opt = torch.optim.AdamW(model.parameters(), lr=3e-3)
for step in range(301):
    starts = torch.randint(0, len(data) - T - 1, (32,))
    xb = torch.stack([data[s:s + T] for s in starts])          # inputs
    yb = torch.stack([data[s + 1:s + T + 1] for s in starts])  # targets = inputs shifted by one
    logits = model(xb)
    loss = nn.functional.cross_entropy(logits.reshape(-1, V), yb.reshape(-1))
    opt.zero_grad(); loss.backward(); opt.step()
    if step % 100 == 0:
        print(f"step {step:3d}  loss {loss.item():.3f}")

# generate: repeatedly predict the next character and append it
model.eval()
idx = torch.tensor([[stoi[c] for c in "the d"]])
with torch.no_grad():
    for _ in range(40):
        logits = model(idx[:, -T:])[:, -1, :]          # logits for the next position
        probs = torch.softmax(logits / 0.8, dim=-1)    # temperature 0.8
        nxt = torch.multinomial(probs, 1)
        idx = torch.cat([idx, nxt], dim=1)
print("generated:", "".join(itos[i] for i in idx[0].tolist()))
print("parameters:", sum(p.numel() for p in model.parameters()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step   0  loss 2.933
step 100  loss 0.133
step 200  loss 0.095
step 300  loss 0.082
generated: the dog sat on the log. the cat saw the dog. 
parameters: 53967</code></pre>
<p>The loss starts slightly above <code>log(V)</code>, the "knows nothing" baseline for a vocabulary of V characters (log 15 = 2.71 here), and falls quickly. The generated text continues the prompt "the d" in the style of the training data. Notice the generation loop. The model predicts a distribution for the next token, we <strong>sample</strong> one token, append it, and feed the longer sequence back in. This is <strong>autoregressive generation</strong>, and it is why LLM responses stream out token by token. A real LLM differs mainly in scale: about 100,000 subword tokens instead of 13 characters, contexts of thousands to millions of tokens instead of 32, dozens of blocks instead of one, and billions of parameters trained on trillions of tokens.</p>
<div class="callout warn"><strong>Common mistake:</strong> misaligning inputs and targets. The target at position i must be the token at position i+1. If you use the same slice for both, the model learns to copy its input, the loss drops to about 0, and generation is useless. Also reshape logits (N, n, V) to (N*n, V) and targets to (N*n,) for <code>cross_entropy</code>.</div>

<h3>Stage 1: pretraining</h3>
<p>A <strong>base model</strong> is pretrained on next-token prediction over a huge, mostly unlabelled corpus: filtered web crawls (such as Common Crawl), books, Wikipedia, scientific papers and code. This is by far the most expensive stage, taking thousands of GPUs for weeks or months. The result is a powerful <em>document completer</em>, not an assistant. Ask a base model "What is the capital of France?" and it may reply with more quiz questions, because that is what often follows such a line on the web. Data quality and mix matter enormously. The languages and domains present in pretraining largely decide what the model is good at.</p>

<h3>Stage 2: supervised fine-tuning (instruction tuning)</h3>
<p>To turn a completer into an assistant, the model is fine-tuned on (prompt, ideal response) pairs. Typically there are tens of thousands to millions of demonstrations, written or curated by people, covering questions, instructions, conversations, refusals and tool use. The loss is still next-token cross-entropy, now computed only on the response tokens. After this <strong>supervised fine-tuning (SFT)</strong>, the model follows instructions and adopts a chat format.</p>

<h3>Stage 3: preference tuning (RLHF and relatives)</h3>
<p>Demonstrations are expensive, and for many prompts there is no single correct answer, only better and worse ones. In <strong>preference tuning</strong>, people (or AI judges) compare two or more model responses to the same prompt and pick the better one. In classic <strong>RLHF</strong> (reinforcement learning from human feedback):</p>
<ol>
  <li>A <strong>reward model</strong> is trained on these comparisons to predict a score for how much humans would prefer a response.</li>
  <li>The LLM is then optimized with reinforcement learning (typically PPO) to produce responses with high reward. A penalty keeps it from drifting too far from the SFT model, which would let it exploit flaws in the reward model.</li>
</ol>
<p>Simpler alternatives such as <strong>DPO</strong> (Direct Preference Optimization) learn directly from preference pairs without a separate reward model or RL loop. Preference tuning is what makes a model helpful, harmless and honest in tone. It shapes style, refusals and safety behaviour much more than it adds knowledge.</p>
<figure><img src="assets/diagrams/finetuning-rlhf.svg" alt="Overview of fine-tuning and RLHF stages applied to a pretrained foundation model"><figcaption>From pretrained base model to aligned assistant: supervised fine-tuning, then preference tuning.</figcaption></figure>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models", sections "Post-Training", "Supervised Finetuning" and "Preference Finetuning", describes this pipeline, including reward models and RLHF versus DPO. Generative AI on AWS, Ch. 3 covers pretraining datasets and objectives for foundation models, and later chapters cover fine-tuning and RLHF on AWS.</div>

<h3>Parameters, data and compute: what "scale" means</h3>
<p>Most of a transformer's parameters are in its blocks. Each block has about <code>4 * d^2</code> attention parameters (W_Q, W_K, W_V and W_O) and about <code>8 * d^2</code> FFN parameters (d to 4d and back), so roughly <code>12 * L * d^2</code> parameters in total for L layers of width d, plus the embeddings.</p>
<pre><code class="lang-python runnable">def approx_params(n_layers, d_model, vocab):
    blocks = 12 * n_layers * d_model ** 2
    embeddings = vocab * d_model
    return blocks + embeddings

configs = {
    "GPT-2 small": (12, 768, 50257),
    "GPT-2 XL":    (48, 1600, 50257),
    "GPT-3":       (96, 12288, 50257),
}
for name, cfg in configs.items():
    print(f"{name:12s} ~{approx_params(*cfg) / 1e9:6.2f} billion parameters")

# memory just to HOLD the weights, in GB
n = 7e9
for dtype, bytes_per in [("float32", 4), ("bfloat16", 2), ("int8", 1), ("4-bit", 0.5)]:
    print(f"7B model in {dtype:8s}: {n * bytes_per / 1e9:5.1f} GB")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">GPT-2 small  ~  0.12 billion parameters
GPT-2 XL     ~  1.55 billion parameters
GPT-3        ~174.56 billion parameters
7B model in float32 :  28.0 GB
7B model in bfloat16:  14.0 GB
7B model in int8    :   7.0 GB
7B model in 4-bit   :   3.5 GB</code></pre>
<p>The formula reproduces the published sizes (124M, 1.5B and 175B) closely. The memory table explains why <strong>quantization</strong>, storing weights in 8 or 4 bits, matters so much for deployment. A 7B model needs about 14 GB in bfloat16 just for its weights, before the attention cache, while a 4-bit version fits on a laptop GPU. Training needs several times more memory, for gradients and Adam's two extra values per parameter.</p>
<p><strong>Scaling laws</strong> are empirical findings that loss falls predictably, as a power law, as you increase parameters, data and compute together. The "Chinchilla" result (2022) suggested about 20 training tokens per parameter for compute-optimal training. Modern models are trained on far more tokens than that, because a smaller model trained longer is cheaper to <em>serve</em>. Some capabilities seem to appear only at larger scales, but measuring this is an active debate.</p>
<div class="callout info"><strong>Where this leads:</strong> as an application builder you will rarely pretrain. You will choose a model (via APIs such as OpenAI or Amazon Bedrock, or open weights), and adapt it with prompting, retrieval (RAG) or parameter-efficient fine-tuning (LoRA). The AI Engineering, OpenAI and AWS tracks cover each of these. Knowing the pipeline tells you what each one can and cannot fix. Prompting and RAG change what the model sees; fine-tuning changes how it behaves.</div>
`,
          keyPoints: [
            "LLMs are decoder-only transformers trained to predict the next token; targets are the inputs shifted by one.",
            "Generation is autoregressive: predict a distribution, sample a token, append it, repeat.",
            "Pretraining on huge unlabelled corpora gives a base model, a document completer.",
            "Supervised fine-tuning on demonstrations teaches instruction following; preference tuning (RLHF, DPO) aligns style and safety.",
            "Parameters are about 12*L*d^2; memory scales with bytes per parameter, which is why quantization matters."
          ],
          exercise: {
            prompt: String.raw`<p>Using the TinyGPT code from the lesson, (a) print the loss at step 0 and compare it with <code>log(V)</code>; (b) after training, compute the model's probability distribution over the next character after the prompt "the ca" and print the 3 most likely characters with their probabilities; (c) explain why the answer looks the way it does, given the training text.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import math
import torch
from torch import nn
torch.manual_seed(0)
torch.set_num_threads(1)

text = ("the cat sat on the mat. the dog sat on the log. "
        "the cat saw the dog. the dog saw the cat. ") * 20
chars = sorted(set(text))
stoi = {c: i for i, c in enumerate(chars)}
data = torch.tensor([stoi[c] for c in text])
V, T, D = len(chars), 32, 64

class TinyGPT(nn.Module):
    def __init__(self):
        super().__init__()
        self.tok, self.pos = nn.Embedding(V, D), nn.Embedding(T, D)
        self.attn = nn.MultiheadAttention(D, 4, batch_first=True)
        self.ln1, self.ln2 = nn.LayerNorm(D), nn.LayerNorm(D)
        self.ffn = nn.Sequential(nn.Linear(D, 4 * D), nn.GELU(), nn.Linear(4 * D, D))
        self.head = nn.Linear(D, V)
        self.register_buffer("mask", torch.triu(torch.ones(T, T, dtype=torch.bool), 1))
    def forward(self, idx):
        n = idx.shape[1]
        x = self.tok(idx) + self.pos(torch.arange(n))
        h = self.ln1(x)
        x = x + self.attn(h, h, h, attn_mask=self.mask[:n, :n])[0]
        return self.head(x + self.ffn(self.ln2(x)))

model = TinyGPT()
opt = torch.optim.AdamW(model.parameters(), lr=3e-3)
for step in range(301):
    s = torch.randint(0, len(data) - T - 1, (32,))
    xb = torch.stack([data[i:i + T] for i in s]); yb = torch.stack([data[i + 1:i + T + 1] for i in s])
    loss = nn.functional.cross_entropy(model(xb).reshape(-1, V), yb.reshape(-1))
    if step == 0:
        print(f"step 0 loss {loss.item():.3f} vs log(V) = {math.log(V):.3f}")
    opt.zero_grad(); loss.backward(); opt.step()

model.eval()
with torch.no_grad():
    ids = torch.tensor([[stoi[c] for c in "the ca"]])
    probs = torch.softmax(model(ids)[0, -1], dim=-1)
top = torch.topk(probs, 3)
for p, i in zip(top.values, top.indices):
    print(f"next char {chars[i]!r}: {p.item():.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step 0 loss 2.933 vs log(V) = 2.708
next char 't': 1.000
next char 'w': 0.000
next char 's': 0.000</code></pre>
<p>(a) At step 0 the weights are random, so the distribution is roughly uniform and the loss is close to log(V). It is slightly above, because random initial logits are not perfectly flat. (b, c) After "the ca", the training text always continues with "t" ("cat"), so the model puts almost all its probability on "t". The model has learned the statistics of its training data, which is exactly what pretraining does, at vastly larger scale, for real LLMs.</p>`
          },
          quiz: [
            { q: "How do you build the targets for next-token prediction from a token sequence?", options: ["Use a separate labelled dataset", "Shift the input sequence left by one position", "Reverse the sequence", "Mask random tokens"], answer: 1, explain: "The target at each position is the following token. Masking random tokens is BERT's encoder objective, not GPT's." },
            { q: "What does a base model (after pretraining only) typically do with a question?", options: ["Always answers it helpfully", "Continues the text in a plausible way, which may not be an answer", "Refuses", "Asks for clarification"], answer: 1, explain: "A base model is a document completer. Instruction tuning and preference tuning turn it into an assistant." },
            { q: "What is the role of the reward model in RLHF?", options: ["It generates the training corpus", "It predicts how much humans would prefer a response, giving the RL step a training signal", "It tokenizes text", "It compresses the model"], answer: 1, explain: "Trained on human comparisons, it scores responses, and the LLM is optimized to increase that score. DPO skips the separate reward model." },
            { q: "About how much memory do the weights of a 7-billion-parameter model need in bfloat16?", options: ["7 GB", "14 GB", "28 GB", "1.4 GB"], answer: 1, explain: "bfloat16 uses 2 bytes per parameter: 7e9 x 2 = 14 GB. float32 would be 28 GB and 4-bit about 3.5 GB." }
          ]
        },
        {
          id: "dl-tf-generation",
          title: "Generation: Logits, Temperature, Top-k and Top-p",
          minutes: 50,
          objectives: [
            "Turn logits into probabilities and explain greedy decoding versus sampling",
            "Implement temperature, top-k and top-p (nucleus) sampling in NumPy",
            "Choose sampling settings for different application types",
            "Estimate tokens, context-window usage and cost for an LLM call"
          ],
          body: String.raw`
<p>At every generation step an LLM outputs a vector of <strong>logits</strong>, one raw score for each of perhaps 100,000 vocabulary tokens. How we turn those scores into an actual token is called <strong>decoding</strong> or <strong>sampling</strong>. It has a large effect on output quality, creativity and consistency, and it is controlled by parameters you will set on almost every LLM API call: <code>temperature</code>, <code>top_p</code> and sometimes <code>top_k</code>.</p>

<h3>From logits to a token</h3>
<ul>
  <li><strong>Softmax</strong> turns the logits into a probability distribution over the vocabulary.</li>
  <li><strong>Greedy decoding</strong> always picks the most probable token (argmax). It is deterministic and often good for short factual answers, but over long outputs it tends to be bland and repetitive and can get stuck in loops.</li>
  <li><strong>Sampling</strong> draws a token at random according to the probabilities. Outputs become varied and more natural, but an unlucky draw of a low-probability token can derail the text. The techniques below control this randomness.</li>
</ul>

<h3>Temperature</h3>
<p>Divide the logits by a temperature T before the softmax: <code>p = softmax(logits / T)</code>.</p>
<ul>
  <li><strong>T &lt; 1</strong> (for example 0.2) stretches the gaps between logits, so the distribution becomes sharper and the model sticks to its top choices. Output is more focused and consistent.</li>
  <li><strong>T = 1</strong> leaves the model's distribution unchanged.</li>
  <li><strong>T &gt; 1</strong> (for example 1.5) shrinks the gaps, flattening the distribution, so unlikely tokens get picked more often. Output is more diverse, with more risk of nonsense.</li>
  <li><strong>T close to 0</strong> approaches greedy decoding. Many APIs treat temperature 0 as greedy, though it is still not perfectly deterministic in practice, because of how floating-point maths is batched on GPUs.</li>
</ul>

<pre><code class="lang-python runnable">import numpy as np

vocab = ["Paris", "London", "Rome", "beautiful", "the", "banana"]
logits = np.array([6.0, 3.5, 3.0, 2.5, 1.0, -2.0])     # model scores for the next token

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

np.set_printoptions(precision=3, suppress=True)
for T in (0.2, 0.7, 1.0, 1.5):
    print(f"T={T:&lt;4}", softmax(logits / T))
print("greedy pick:", vocab[int(np.argmax(logits))])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">T=0.2  [1. 0. 0. 0. 0. 0.]
T=0.7  [0.953 0.027 0.013 0.006 0.001 0.   ]
T=1.0  [0.855 0.07  0.043 0.026 0.006 0.   ]
T=1.5  [0.684 0.129 0.093 0.066 0.024 0.003]
greedy pick: Paris</code></pre>
<p>At T=0.2 "Paris" takes essentially all the probability. At T=1.5 even "banana" gets a real chance. Temperature never changes the <em>ranking</em> of the tokens, only how concentrated the probability is.</p>

<h3>Top-k sampling</h3>
<p>Keep only the k highest-probability tokens, set the rest to zero, renormalize, and sample. With k = 40, the long tail of thousands of unlikely tokens, each individually tiny but together sizeable, can never be picked. The weakness is that k is fixed. When the model is confident, k = 40 still admits poor options. When many continuations are reasonable, k = 40 may cut off good ones.</p>

<h3>Top-p (nucleus) sampling</h3>
<p>Sort the tokens by probability and keep the <em>smallest</em> set whose cumulative probability reaches p (for example 0.9), then renormalize and sample. The size of this "nucleus" adapts. When the model is confident, one or two tokens may already cover 90% of the probability. When it is uncertain, the nucleus grows to include many options. This adaptivity is why top-p is a common API default.</p>

<pre><code class="lang-python runnable">import numpy as np

vocab = np.array(["Paris", "London", "Rome", "beautiful", "the", "banana"])
logits = np.array([6.0, 3.5, 3.0, 2.5, 1.0, -2.0])

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

def top_k_filter(probs, k):
    keep = np.argsort(probs)[::-1][:k]                  # indices of the k largest
    out = np.zeros_like(probs)
    out[keep] = probs[keep]
    return out / out.sum()

def top_p_filter(probs, p):
    order = np.argsort(probs)[::-1]                     # largest first
    cumulative = np.cumsum(probs[order])
    cutoff = np.searchsorted(cumulative, p) + 1         # smallest set reaching p
    keep = order[:cutoff]
    out = np.zeros_like(probs)
    out[keep] = probs[keep]
    return out / out.sum()

def sample(logits, temperature=1.0, top_k=None, top_p=None, rng=None):
    probs = softmax(logits / temperature)
    if top_k is not None:
        probs = top_k_filter(probs, top_k)
    if top_p is not None:
        probs = top_p_filter(probs, top_p)
    return rng.choice(len(probs), p=probs)

np.set_printoptions(precision=3, suppress=True)
base = softmax(logits)
print("base probs     :", base)
print("top-k (k=3)    :", top_k_filter(base, 3))
print("top-p (p=0.9)  :", top_p_filter(base, 0.9))

# how often is each token chosen in 2,000 draws?
for settings in [dict(temperature=1.0), dict(temperature=1.5),
                 dict(temperature=1.5, top_p=0.9), dict(temperature=0.5)]:
    rng = np.random.default_rng(0)
    draws = [sample(logits, rng=rng, **settings) for _ in range(2000)]
    counts = np.bincount(draws, minlength=len(vocab))
    print(f"{str(settings):38s}", dict(zip(vocab.tolist(), counts.tolist())))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">base probs     : [0.855 0.07  0.043 0.026 0.006 0.   ]
top-k (k=3)    : [0.883 0.073 0.044 0.    0.    0.   ]
top-p (p=0.9)  : [0.924 0.076 0.    0.    0.    0.   ]
{'temperature': 1.0}                   {'Paris': 1713, 'London': 136, 'Rome': 81, 'beautiful': 58, 'the': 12, 'banana': 0}
{'temperature': 1.5}                   {'Paris': 1364, 'London': 250, 'Rome': 192, 'beautiful': 136, 'the': 54, 'banana': 4}
{'temperature': 1.5, 'top_p': 0.9}     {'Paris': 1498, 'London': 300, 'Rome': 202, 'beautiful': 0, 'the': 0, 'banana': 0}
{'temperature': 0.5}                   {'Paris': 1979, 'London': 17, 'Rome': 3, 'beautiful': 1, 'the': 0, 'banana': 0}</code></pre>
<p>With the default settings the model mostly says "Paris". At temperature 1.5, "banana" and other unlikely tokens appear. Adding top-p 0.9 removes the long tail even at high temperature, keeping variety among plausible options while blocking nonsense. At temperature 0.5 the output is almost always "Paris".</p>
<div class="callout info"><strong>Order of operations:</strong> implementations apply temperature first, then top-k and top-p filtering, then sample, as the code above does. Libraries differ in the details, so check your provider's documentation. Some APIs advise changing <em>either</em> temperature or top_p, not both.</div>

<h3>Choosing settings</h3>
<table>
  <thead><tr><th>Use case</th><th>Typical settings</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Extraction, classification, SQL or code generation, structured JSON</td><td>temperature 0 to 0.2</td><td>You want the single most likely, consistent answer</td></tr>
    <tr><td>Q&amp;A, summarization, RAG answers</td><td>temperature 0.2 to 0.7, top_p 0.9 to 1</td><td>Fluent but grounded</td></tr>
    <tr><td>Brainstorming, creative writing, marketing variations</td><td>temperature 0.8 to 1.2, top_p 0.9 to 0.95</td><td>Diversity is the goal</td></tr>
  </tbody>
</table>
<p>Other common decoding controls are <strong>max_tokens</strong> (a hard limit on output length), <strong>stop sequences</strong> (strings at which generation stops), <strong>frequency or presence penalties</strong> (discourage repeating tokens), and <strong>seed</strong> (more reproducible sampling, where supported). For structured outputs such as JSON, many APIs offer constrained decoding that only allows tokens that keep the output valid.</p>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models", sections "Sampling Fundamentals" and "Sampling Strategies" (temperature, top-k, top-p, stopping conditions), covers this material, and "The Probabilistic Nature of AI" explains why identical prompts can give different answers. Generative AI on AWS, Ch. 3 discusses generative configuration parameters for foundation models.</div>

<h3>Tokens, context windows and cost</h3>
<p>The <strong>context window</strong> is the maximum number of tokens a model can handle at once: <em>input plus output together</em>. It ranges from about 4k tokens in older models to hundreds of thousands or more in recent ones. Everything the model "knows" about your request must fit inside it: the system prompt, the conversation history, retrieved documents, tool definitions, and the answer being generated. When a conversation grows too long, applications must drop or summarize old turns.</p>
<p>APIs bill per token, usually with separate prices for input and output tokens. Output tokens typically cost several times more, because they are generated one at a time while input tokens are processed in parallel. Larger contexts also mean higher latency, because attention cost grows with sequence length. So it pays to estimate.</p>
<pre><code class="lang-python runnable">def estimate_tokens(text):
    """Rough English estimate: ~4 characters per token. Use the real tokenizer for accuracy."""
    return max(1, round(len(text) / 4))

# Illustrative prices in dollars per 1M tokens. Real prices vary by model and change often.
PRICE_IN, PRICE_OUT = 0.50, 1.50
CONTEXT_WINDOW = 8_000

system_prompt = "You are a helpful support assistant. Answer using the provided documents. " * 3
retrieved_docs = ["Refund policy: refunds are issued within 14 days of purchase. " * 20] * 4
question = "Can I get a refund after 10 days?"
max_output = 500

n_in = estimate_tokens(system_prompt) + sum(estimate_tokens(d) for d in retrieved_docs) \
       + estimate_tokens(question)
print(f"input tokens ~{n_in}, reserved output {max_output}, window {CONTEXT_WINDOW}")
print("fits in context:", n_in + max_output &lt;= CONTEXT_WINDOW)

cost = n_in / 1e6 * PRICE_IN + max_output / 1e6 * PRICE_OUT
print(f"cost per request ~&#36;{cost:.5f}; per 100k requests/day ~&#36;{cost * 100_000:,.0f}/day")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">input tokens ~1304, reserved output 500, window 8000
fits in context: True
cost per request ~$0.00140; per 100k requests/day ~$140/day</code></pre>
<p>A fraction of a cent per request becomes real money at scale. That is why production systems trim prompts, retrieve only the most relevant chunks, cache repeated prefixes and route easy requests to smaller models. The AI Engineering and AWS tracks return to these optimizations.</p>
<div class="callout warn"><strong>Common mistakes:</strong> (1) Using a high temperature for tasks that need exact, parsable output, which gives broken JSON and inconsistent answers. (2) Forgetting that <code>max_tokens</code> output counts against the context window, so long prompts plus a large max_tokens can exceed it. (3) Estimating cost from words instead of tokens, especially for non-English text and code, which often use more tokens per word.</div>
`,
          keyPoints: [
            "The model outputs logits; softmax gives probabilities; greedy decoding takes the argmax and sampling draws from the distribution.",
            "Temperature divides the logits: below 1 sharpens (focused), above 1 flattens (diverse); it never changes the ranking.",
            "Top-k keeps a fixed number of tokens; top-p keeps the smallest set reaching cumulative probability p, adapting to confidence.",
            "Use low temperature for extraction, code and JSON, and higher for creative tasks.",
            "The context window holds input plus output tokens; cost is per token, and output tokens usually cost more."
          ],
          exercise: {
            prompt: String.raw`<p>Write a function <code>nucleus_size(logits, p, temperature)</code> that returns how many tokens are in the top-p nucleus. For the "confident" logits <code>[4, 2, 1, 0.5, 0, 0]</code> and the "uncertain" logits <code>[2, 1.9, 1.8, 1.7, 1.6, 1.5]</code>, print the nucleus size for p=0.9 at temperatures 0.7, 1.0 and 1.5. Explain why top-p is called adaptive.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

def nucleus_size(logits, p, temperature):
    probs = np.sort(softmax(np.asarray(logits, dtype=float) / temperature))[::-1]
    return int(np.searchsorted(np.cumsum(probs), p) + 1)

confident = [4, 2, 1, 0.5, 0, 0]
uncertain = [2, 1.9, 1.8, 1.7, 1.6, 1.5]
for T in (0.7, 1.0, 1.5):
    print(f"T={T}: confident nucleus={nucleus_size(confident, 0.9, T)}, "
          f"uncertain nucleus={nucleus_size(uncertain, 0.9, T)}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">T=0.7: confident nucleus=1, uncertain nucleus=6
T=1.0: confident nucleus=2, uncertain nucleus=6
T=1.5: confident nucleus=4, uncertain nucleus=6</code></pre>
<p>With the confident logits at T=0.7, the top token alone covers more than 90% of the probability, so the nucleus has 1 token and top-p behaves like greedy decoding. Raising the temperature flattens the distribution, so the nucleus grows to 2 and then 4 tokens. With the uncertain logits, all 6 tokens are needed to reach 90% at every temperature. The same p admits one option or many depending on the model's confidence, which is why top-p is called adaptive. Top-k would admit exactly k tokens in both cases.</p>`
          },
          quiz: [
            { q: "What does lowering the temperature from 1.0 to 0.2 do?", options: ["Makes the output more random", "Sharpens the distribution, so the model sticks to its most likely tokens", "Changes which token is most likely", "Shortens the output"], answer: 1, explain: "Dividing logits by a small T widens the gaps, so softmax concentrates probability on the top tokens. The ranking stays the same." },
            { q: "How does top-p (nucleus) sampling choose which tokens to keep?", options: ["Always the top 10", "The smallest set of most likely tokens whose cumulative probability reaches p", "Tokens with probability above p", "A random subset"], answer: 1, explain: "The nucleus grows or shrinks with the model's confidence, unlike top-k's fixed count." },
            { q: "Which settings suit generating valid JSON for an extraction pipeline?", options: ["temperature 1.5, top_p 1.0", "temperature 0 to 0.2", "temperature 1.0 with a high presence penalty", "The settings do not matter"], answer: 1, explain: "Low temperature gives the most likely, consistent tokens, which suits structured, parsable output. Constrained or structured-output modes help further." },
            { q: "A model has a 16k-token context window. Your prompt is 15,500 tokens and you set max_tokens=1000. What happens?", options: ["It works normally", "Input plus requested output exceeds the window, so the call errors or the output is cut short", "The model compresses the prompt automatically", "Only the output is limited"], answer: 1, explain: "The context window covers input and output together. 15,500 + 1,000 is more than 16,000, so trim the prompt or lower max_tokens." }
          ]
        },
        {
          id: "dl-tf-limits",
          title: "LLM Strengths, Limitations and Hallucination",
          minutes: 40,
          objectives: [
            "Summarize what LLMs do well and where they systematically fail",
            "Explain why hallucinations happen, in terms of next-token prediction and sampling",
            "Apply practical mitigations: grounding, constrained outputs, verification and evaluation",
            "Connect this track's concepts to the AI Engineering, OpenAI and AWS tracks"
          ],
          body: String.raw`
<p>You now know what happens inside an LLM. Text becomes tokens, tokens become embeddings, attention blocks build contextual representations, an LM head produces logits, and a sampler picks the next token, over and over. That knowledge lets you reason about what these models will do well, where they will fail, and which engineering tools fix which failures. That judgement is the core skill of building AI applications.</p>

<h3>What LLMs are genuinely good at</h3>
<ul>
  <li><strong>Language transformation:</strong> summarizing, rewriting, translating, changing tone, and extracting structured fields from messy text.</li>
  <li><strong>Pattern completion from instructions and examples:</strong> few-shot learning in the prompt, called <em>in-context learning</em>, works because attention can copy and generalize patterns from the context.</li>
  <li><strong>Broad knowledge recall:</strong> common facts, concepts and coding idioms that appeared many times in the training data.</li>
  <li><strong>Code:</strong> writing, explaining and refactoring code, especially in popular languages and frameworks.</li>
  <li><strong>Flexible reasoning on familiar patterns:</strong> multi-step explanations, especially when the model is allowed to "think step by step" and so spend more tokens on the problem.</li>
</ul>

<h3>Systematic limitations, and the mechanism behind each</h3>
<table>
  <thead><tr><th>Limitation</th><th>Why it happens</th><th>Typical mitigation</th></tr></thead>
  <tbody>
    <tr><td>Knowledge cutoff</td><td>The weights only contain what was in the pretraining data, up to a date</td><td>Retrieval (RAG), tools such as web search</td></tr>
    <tr><td>No access to private data</td><td>Your documents were never in the training set</td><td>RAG over your documents; fine-tuning for style or format</td></tr>
    <tr><td>Hallucination</td><td>The model produces plausible tokens, not verified facts (see below)</td><td>Grounding in sources, citations, verification, lower temperature, evaluation</td></tr>
    <tr><td>Weak exact computation and character-level tasks</td><td>Tokens hide characters; arithmetic is pattern-matched rather than computed</td><td>Tool use (a calculator or code execution)</td></tr>
    <tr><td>Context limits and "lost in the middle"</td><td>Finite window; attention may under-use information buried in long contexts</td><td>Retrieve less but better context, put key information first or last, summarize</td></tr>
    <tr><td>Inconsistency</td><td>Sampling is random; small prompt changes shift the probabilities</td><td>Low temperature, fixed prompts, structured outputs, evaluation suites</td></tr>
    <tr><td>Prompt injection and unsafe outputs</td><td>The model cannot reliably tell instructions apart from data in its context</td><td>Input and output guardrails, least-privilege tools, human review</td></tr>
    <tr><td>Bias</td><td>It reproduces patterns from its training data</td><td>Evaluation across groups, guardrails, careful use-case selection</td></tr>
  </tbody>
</table>

<h3>Why hallucinations happen</h3>
<p>A <strong>hallucination</strong> is fluent, confident output that is false or not supported by the provided sources, such as an invented citation, a non-existent API function, or a wrong date stated as fact. Given what you now know about how LLMs work, it should not be surprising:</p>
<ol>
  <li><strong>The objective rewards plausibility, not truth.</strong> Pretraining minimizes next-token cross-entropy, which rewards text that <em>looks like</em> the training data. A made-up but well-formed reference is a very plausible continuation of "According to the 2019 study by".</li>
  <li><strong>The model must always output something.</strong> Softmax always gives a full distribution. Unless training specifically taught the model to say "I don't know", the probability goes to the most plausible-looking answer.</li>
  <li><strong>Sampling compounds errors.</strong> Once an unlucky token is sampled (an incorrect year, say), every later token is conditioned on it. The model then elaborates consistently on its own mistake, because it cannot go back.</li>
  <li><strong>Rare facts are weakly stored.</strong> Facts seen thousands of times are reliable. Facts seen once or twice, such as a minor person's biography or a niche library's API, are reconstructed approximately.</li>
  <li><strong>Training can reward confident guessing.</strong> If fine-tuning demonstrations contain answers the model never learned in pretraining, the model may learn to produce confident answers whether or not it knows them.</li>
</ol>
<p>The small simulation below shows the mechanics. A model that is 60% confident in the right answer, with the remaining probability spread over plausible wrong ones, will state a wrong answer a large fraction of the time when sampled, and always sounds equally fluent.</p>
<pre><code class="lang-python runnable">import numpy as np

# Model's next-token distribution for "The paper was published in ..."
years = np.array(["2017", "2018", "2016", "2019", "2015"])
probs = np.array([0.60, 0.15, 0.12, 0.08, 0.05])          # truth: 2017

rng = np.random.default_rng(42)
for T in (1.0, 0.5, 0.01):
    p = probs ** (1 / T); p /= p.sum()                     # temperature on probabilities
    answers = rng.choice(years, size=1000, p=p)
    wrong = (answers != "2017").mean()
    print(f"temperature {T:&lt;4}: wrong answer {wrong:.1%} of the time")

# Even greedy decoding is only as good as the model's top choice:
probs_rare_fact = np.array([0.30, 0.35, 0.20, 0.10, 0.05])  # model mis-ranks a rarely seen fact
print("greedy answer for a rarely seen fact:", years[np.argmax(probs_rare_fact)], "(truth: 2017)")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">temperature 1.0 : wrong answer 39.7% of the time
temperature 0.5 : wrong answer 12.3% of the time
temperature 0.01: wrong answer 0.0% of the time
greedy answer for a rarely seen fact: 2018 (truth: 2017)</code></pre>
<p>Lowering the temperature reduces errors that come from sampling, but it cannot fix a model whose <em>top</em> choice is wrong, which is common for rare facts. That is why the strongest mitigations change what the model sees, or check what it says, rather than only adjusting decoding.</p>

<h3>Practical mitigations</h3>
<ul>
  <li><strong>Grounding with retrieval (RAG):</strong> put the relevant source text into the context and instruct the model to answer only from it and to cite it. This turns a recall problem into a reading-comprehension problem, which LLMs are much better at.</li>
  <li><strong>Allow abstention:</strong> explicitly permit and ask for "I don't know" when the sources do not contain the answer.</li>
  <li><strong>Tools for exact work:</strong> calculators, code execution, database queries and search, instead of the model's memory.</li>
  <li><strong>Structured outputs and validation:</strong> JSON schemas, type checks, and post-hoc verification such as checking that cited passages exist and support the claim.</li>
  <li><strong>Evaluation:</strong> build a test set of real questions with known answers, measure the hallucination rate, and re-run it whenever you change the prompt, model or retrieval. This is the subject of the AI Engineering track's evaluation lessons.</li>
  <li><strong>Human in the loop</strong> for high-stakes decisions, such as medical, legal or financial ones.</li>
</ul>
<div class="callout book"><strong>Book:</strong> AI Engineering (Chip Huyen), Ch. 2 "Understanding Foundation Models", section "Hallucination" (inside "The Probabilistic Nature of AI"), discusses two hypotheses for why models hallucinate: self-delusion from conditioning on their own generated tokens, and mismatches between the model's internal knowledge and its fine-tuning data. Ch. 3 and 4 cover how to evaluate for it.</div>

<h3>How this track connects to the rest of the course</h3>
<table>
  <thead><tr><th>Concept from this track</th><th>Where you will use it</th></tr></thead>
  <tbody>
    <tr><td>Tokens, context windows, sampling parameters</td><td>OpenAI track: every API call (model, messages, temperature, max_tokens), counting tokens and costs</td></tr>
    <tr><td>Embeddings and semantic search</td><td>RAG pipelines: embedding APIs, vector databases, hybrid search and reranking</td></tr>
    <tr><td>Pretraining, SFT and RLHF; transfer learning</td><td>AI Engineering track: choosing between prompting, RAG and fine-tuning (LoRA); AWS track: Bedrock and SageMaker fine-tuning</td></tr>
    <tr><td>Parameters, memory, quantization, attention cost</td><td>Inference optimization and deployment: choosing instance types, latency and cost trade-offs</td></tr>
    <tr><td>PyTorch training loops, state_dict, devices</td><td>Training and serving your own models; MLOps and deployment tracks</td></tr>
    <tr><td>Hallucination and limitations</td><td>Evaluation, guardrails and monitoring of production LLM applications</td></tr>
  </tbody>
</table>
<div class="callout tip"><strong>Tip:</strong> When an LLM feature misbehaves, ask which layer of the stack is responsible. Is the information missing from the context (fix retrieval)? Is the model unable to do the task (choose a different model, use a tool, or fine-tune)? Is the instruction unclear (fix the prompt)? Or is decoding adding noise (lower the temperature, use structured outputs)? This track gave you the mental model to answer that question.</div>
`,
          keyPoints: [
            "LLMs excel at language transformation, in-context pattern following, common knowledge and code.",
            "Limitations follow from the mechanism: knowledge cutoff, no private data, token-level blindness, finite context, randomness.",
            "Hallucinations arise because training rewards plausible continuations and the model must always output a token.",
            "Low temperature reduces sampling errors but cannot fix a wrong top choice; grounding, tools, validation and evaluation do.",
            "Tokens, embeddings, sampling and fine-tuning concepts from this track underpin the OpenAI, AWS and AI Engineering tracks."
          ],
          exercise: {
            prompt: String.raw`<p>For each scenario, name the most likely cause (choosing from: missing context, model limitation, decoding randomness, or prompt ambiguity) and the best mitigation. (1) A support bot invents a refund policy that is not in your documentation. (2) A bot gives a different answer every time to "summarize this contract clause". (3) A model miscounts the words in a paragraph. (4) Asked "What changed in our API last week?", the model answers with general facts about APIs. Then write a small Python function <code>answer_with_abstention(question, retrieved_chunks)</code> that builds a grounded prompt, telling the model to answer only from the chunks and to say "I don't know" otherwise, and that returns "I don't know" directly when nothing was retrieved.</p>`,
            solution: String.raw`<p>(1) Hallucination from <strong>missing context</strong>: retrieve the actual policy (RAG), instruct the model to answer only from it with citations, and allow abstention. (2) <strong>Decoding randomness</strong> (and possibly prompt ambiguity): lower the temperature, specify the output format, and evaluate consistency. (3) A <strong>model limitation</strong> (tokens are not words or characters): count with code, a tool, rather than with the model. (4) <strong>Missing context</strong>, since last week's changes postdate training and are private: retrieve the changelog, or call a tool.</p>
<pre><code class="lang-python runnable">def answer_with_abstention(question, retrieved_chunks):
    if not retrieved_chunks:
        return "I don't know"          # nothing to ground on: do not let the model guess
    sources = "\n".join(f"[{i + 1}] {c}" for i, c in enumerate(retrieved_chunks))
    prompt = (
        "Answer the question using ONLY the sources below. Cite sources like [1]. "
        "If the sources do not contain the answer, reply exactly: I don't know.\n\n"
        f"Sources:\n{sources}\n\nQuestion: {question}\nAnswer:"
    )
    return prompt                       # in a real app: send this prompt to the LLM

print(answer_with_abstention("What is the refund window?", []))
print(answer_with_abstention("What is the refund window?",
                             ["Refunds are available within 14 days of purchase."]))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">I don't know
Answer the question using ONLY the sources below. Cite sources like [1]. If the sources do not contain the answer, reply exactly: I don't know.

Sources:
[1] Refunds are available within 14 days of purchase.

Question: What is the refund window?
Answer:</code></pre>
<p>The function shows the two key grounding ideas: never ask the model to answer without evidence, and give it explicit permission and wording to abstain. In the OpenAI and AWS tracks you will send this prompt to a real model and measure the hallucination rate with an evaluation set.</p>`
          },
          quiz: [
            { q: "Why do LLMs hallucinate even when they are well trained?", options: ["They are programmed to lie", "Their objective rewards plausible continuations, and they must always output some token, true or not", "They have too few parameters to store any facts", "Hallucinations only come from high temperature"], answer: 1, explain: "Next-token training optimizes plausibility, softmax always produces an answer distribution, and sampled errors compound. Temperature is only one factor." },
            { q: "Which mitigation best addresses an LLM not knowing your company's internal policies?", options: ["Raising the temperature", "Retrieval-augmented generation over the policy documents", "Using a longer max_tokens", "Asking the question twice"], answer: 1, explain: "The information was never in the training data, so it must be provided in context. RAG retrieves it and grounds the answer." },
            { q: "Setting temperature to 0 eliminates hallucinations. True or false?", options: ["True", "False: it removes sampling randomness, but the model's top choice can still be wrong"], answer: 1, explain: "Greedy decoding is only as good as the model's ranking. For rare facts the most likely token can be wrong." },
            { q: "A model often fails to count the letters in a word. What is the main reason?", options: ["The context window is too small", "It sees subword tokens, not individual characters", "The temperature is too high", "It lacks RLHF"], answer: 1, explain: "Tokenization hides character boundaries. Use a tool or code for character-level tasks." }
          ]
        }
      ]
    }
  ]
});
