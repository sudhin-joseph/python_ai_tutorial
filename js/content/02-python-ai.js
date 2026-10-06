window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "python-ai",
  order: 2,
  title: "Python for Data & AI + Math Foundations",
  level: "Beginner → Intermediate",
  icon: "📊",
  description: "Learn the Python data stack (NumPy, pandas, matplotlib, seaborn) and the exact math that machine learning runs on — vectors, matrices, gradients, probability and statistics — each explained from scratch and implemented in code.",
  outcomes: [
    "Create, index, reshape and compute with NumPy arrays using vectorized operations and broadcasting",
    "Load, inspect, clean, filter, group, merge and reshape tabular data with pandas",
    "Produce clear exploratory plots (histograms, scatter, box, bar, heatmaps) and explain what they reveal",
    "Explain vectors, dot products, cosine similarity and matrix multiplication, and connect them to embeddings and neural-network layers",
    "Explain derivatives, gradients and the chain rule, and implement gradient descent from scratch",
    "Reason with probability (conditional probability, Bayes' rule, distributions) and statistics (spread, correlation, sampling, A/B tests)",
    "Run a complete exploratory data analysis on a real dataset and write up which features look predictive"
  ],
  modules: [
    {
      id: "pyai-numpy",
      title: "NumPy: Fast Numerical Arrays",
      summary: "The array library underneath every Python ML tool: creating arrays, indexing, vectorized math, aggregation, broadcasting, reshaping and reproducible randomness.",
      lessons: [
        {
          id: "pyai-numpy-arrays",
          title: "Why Arrays Beat Lists: Creating NumPy Arrays",
          minutes: 45,
          objectives: [
            "Explain why NumPy arrays are faster and more convenient than Python lists for numbers",
            "Create arrays from lists and with helpers such as zeros, ones, arange, linspace and full",
            "Read an array's shape, ndim, size and dtype and explain what each means",
            "Convert dtypes deliberately and avoid silent integer truncation"
          ],
          body: String.raw`
<p>Machine learning is, at its heart, arithmetic on large tables of numbers. A photo is a grid of pixel brightness values. A spreadsheet of house sales is a table with one row per house and one column per feature. A sentence, once fed to a language model, becomes a list of numbers called an <em>embedding</em>. To do anything useful with this data you need a way to store millions of numbers compactly and do math on all of them at once. In Python, that tool is <strong>NumPy</strong> (short for "Numerical Python"). Pandas, scikit-learn, PyTorch, TensorFlow and almost every other data library are either built on NumPy or speak its language. Learning NumPy well pays off in every later track.</p>

<h3>The problem with plain Python lists</h3>
<p>In the Python track you met lists: <code>[1, 2, 3]</code>. Lists are wonderfully flexible — one list can hold an int, a string and another list. But that flexibility has a cost. Each element of a list is a separate Python object living somewhere in memory, and the list only stores <em>pointers</em> to those objects. When you loop over a list to add 1 to each number, Python must, for every element: follow the pointer, check the object's type, look up how "+" works for that type, create a brand-new object for the result, and store a pointer to it. That bookkeeping happens millions of times for a million numbers.</p>
<p>A <strong>NumPy array</strong> takes the opposite approach. All elements have the <em>same type</em> (for example, 64-bit floating point numbers) and are packed side by side in one contiguous block of memory, like eggs in a carton rather than eggs scattered around the kitchen with notes saying where each one is. Because NumPy knows every element is, say, a 64-bit float, it can hand the whole block to fast pre-compiled C code that loops over it without any per-element type checks.</p>

<div class="callout info"><strong>Analogy:</strong> A Python list is a bag of mixed groceries — you must look at each item before you know what to do with it. A NumPy array is a carton of identical eggs — once you know it is eggs, you can process the whole carton with one machine.</div>

<h3>Vectorization: one operation, whole array</h3>
<p>The second advantage is <strong>vectorization</strong>: writing an operation once and having it applied to every element, without writing a Python loop. With a list, "add 1 to every element" requires a loop or list comprehension. With an array you simply write <code>a + 1</code>. The code is shorter, reads like math, and runs far faster because the loop happens inside NumPy's compiled code.</p>

<pre><code class="lang-python runnable">import time
import numpy as np

n = 1_000_000
py_list = list(range(n))
arr = np.arange(n)

start = time.perf_counter()
list_result = [x * 2 for x in py_list]      # Python loop, one element at a time
list_time = time.perf_counter() - start

start = time.perf_counter()
arr_result = arr * 2                         # vectorized: one expression for all elements
arr_time = time.perf_counter() - start

print("same answers:", list_result[:5], arr_result[:5])
print("results equal:", list_result == arr_result.tolist())
print("NumPy was faster:", arr_time &lt; list_time)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">same answers: [0, 2, 4, 6, 8] [0 2 4 6 8]
results equal: True
NumPy was faster: True</code></pre>
<p>On a typical laptop the NumPy version is 20–100 times faster. The exact timing varies from machine to machine, which is why this example prints a True/False comparison instead of exact seconds. Notice also that printing the array shows <code>[0 2 4 6 8]</code> without commas — that is how you can tell at a glance that you are looking at an array and not a list.</p>

<h3>Creating arrays</h3>
<p>The most direct way to make an array is <code>np.array()</code> with a list (or a list of lists for a 2-D table). By convention NumPy is always imported as <code>np</code>.</p>

<pre><code class="lang-python runnable">import numpy as np

temps = np.array([21.5, 23.0, 19.8, 25.1])     # 1-D: a row of numbers
grid = np.array([[1, 2, 3],
                 [4, 5, 6]])                     # 2-D: 2 rows, 3 columns

print(temps)
print(grid)
print(type(grid))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[21.5 23.  19.8 25.1]
[[1 2 3]
 [4 5 6]]
&lt;class 'numpy.ndarray'&gt;</code></pre>

<p>Very often you need an array of a given size before you have the data — for example, to hold model weights that start at zero. NumPy has helper functions for this:</p>
<ul>
<li><code>np.zeros(shape)</code> and <code>np.ones(shape)</code> — filled with 0.0 or 1.0.</li>
<li><code>np.full(shape, value)</code> — filled with any value you choose.</li>
<li><code>np.arange(start, stop, step)</code> — like Python's <code>range</code>, stop is <em>excluded</em>.</li>
<li><code>np.linspace(start, stop, num)</code> — <code>num</code> evenly spaced points, stop <em>included</em>. Great for plotting a smooth curve.</li>
<li><code>np.eye(n)</code> — the identity matrix (1s on the diagonal), which you will meet again in the math module.</li>
</ul>

<pre><code class="lang-python runnable">import numpy as np

print(np.zeros(4))
print(np.ones((2, 3)))          # shape is given as a tuple: (rows, columns)
print(np.full((2, 2), 7))
print(np.arange(0, 10, 2))      # 10 is NOT included
print(np.linspace(0, 1, 5))     # 1 IS included, 5 points
print(np.eye(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0. 0. 0. 0.]
[[1. 1. 1.]
 [1. 1. 1.]]
[[7 7]
 [7 7]]
[0 2 4 6 8]
[0.   0.25 0.5  0.75 1.  ]
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]</code></pre>

<div class="callout warn"><strong>Common mistake:</strong> <code>np.zeros(2, 3)</code> does not make a 2×3 array — the second positional argument is the dtype, so you get an error. The shape must be a single tuple: <code>np.zeros((2, 3))</code>. Note the double parentheses.</div>

<h3>Shape, ndim, size and dtype</h3>
<p>Every array carries four facts about itself, and you will check them constantly while debugging ML code:</p>
<table>
<thead><tr><th>Attribute</th><th>Meaning</th><th>Example for a 2×3 grid</th></tr></thead>
<tbody>
<tr><td><code>shape</code></td><td>A tuple with the length along each dimension</td><td><code>(2, 3)</code></td></tr>
<tr><td><code>ndim</code></td><td>Number of dimensions (also called <em>axes</em>)</td><td><code>2</code></td></tr>
<tr><td><code>size</code></td><td>Total number of elements</td><td><code>6</code></td></tr>
<tr><td><code>dtype</code></td><td>The single data type shared by all elements</td><td><code>int64</code></td></tr>
</tbody>
</table>
<p>A useful vocabulary: a 1-D array is often called a <strong>vector</strong>, a 2-D array a <strong>matrix</strong>, and anything with 3 or more dimensions a <strong>tensor</strong>. A batch of 32 colour images of 64×64 pixels is a 4-D tensor of shape <code>(32, 64, 64, 3)</code>: 32 images, 64 rows, 64 columns, 3 colour channels. Most "shape mismatch" errors in deep learning are solved by printing <code>.shape</code>.</p>

<pre><code class="lang-python runnable">import numpy as np

grid = np.array([[1, 2, 3],
                 [4, 5, 6]])
print("shape:", grid.shape)
print("ndim:", grid.ndim)
print("size:", grid.size)
print("dtype:", grid.dtype)

images = np.zeros((32, 64, 64, 3))
print("image batch shape:", images.shape, "ndim:", images.ndim)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shape: (2, 3)
ndim: 2
size: 6
dtype: int64
image batch shape: (32, 64, 64, 3) ndim: 4</code></pre>

<h3>Data types (dtypes)</h3>
<p>Because all elements share one type, NumPy has to pick a dtype when you create an array. If every value is a whole number, you get an integer dtype (<code>int64</code> on most systems). If any value has a decimal point, everything becomes a float (<code>float64</code>). Mixing in a string turns everything into strings — almost never what you want for numeric work.</p>
<p>The common dtypes you will meet:</p>
<ul>
<li><code>int64</code>, <code>int32</code> — whole numbers. Used for counts and class labels.</li>
<li><code>float64</code>, <code>float32</code> — decimals. <code>float32</code> uses half the memory and is the default in deep learning (GPUs love it).</li>
<li><code>bool</code> — True/False, produced by comparisons like <code>a &gt; 3</code>.</li>
</ul>
<p>You can choose the dtype explicitly with <code>dtype=</code> or convert with <code>.astype()</code>, which always returns a new array.</p>

<pre><code class="lang-python runnable">import numpy as np

a = np.array([1, 2, 3])
b = np.array([1, 2, 3.5])
c = np.array([1, 2, 3], dtype=np.float32)
print(a.dtype, b.dtype, c.dtype)

mixed = np.array([1, 2, "three"])
print(mixed, mixed.dtype)          # everything became text!

prices = np.array([9.99, 4.50, 12.75])
print(prices.astype(int))          # astype(int) TRUNCATES toward zero, it does not round
print(np.round(prices).astype(int))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">int64 float64 float32
['1' '2' 'three'] &lt;U21
[ 9  4 12]
[10  4 13]</code></pre>

<div class="callout warn"><strong>Common mistake — silent truncation:</strong> if you create an integer array and then assign a decimal into it, NumPy quietly chops off the fractional part to fit the dtype. <code>a = np.array([1, 2, 3]); a[0] = 9.7</code> leaves <code>a[0]</code> equal to <code>9</code>. When you plan to store decimals, create the array as float from the start (<code>np.zeros(3)</code> is float by default; <code>np.array([1, 2, 3], dtype=float)</code> also works).</div>

<h3>Arrays are fixed-size</h3>
<p>Unlike lists, arrays do not have an efficient <code>append</code>. <code>np.append</code> exists but copies the entire array every time, so calling it in a loop is slow. The idiomatic pattern is: collect values in a Python list, then convert once with <code>np.array(my_list)</code> at the end — or pre-allocate with <code>np.zeros(n)</code> and fill positions.</p>

<h3>Why this matters for ML</h3>
<p>When you later call <code>model.fit(X, y)</code> in scikit-learn, <code>X</code> is a 2-D array of shape <code>(n_samples, n_features)</code> and <code>y</code> is a 1-D array of shape <code>(n_samples,)</code>. When you build a neural network, every layer receives and returns arrays (tensors) with very specific shapes. Thinking in shapes and dtypes is the single most important habit this lesson can give you.</p>
`,
          keyPoints: [
            "A NumPy array stores same-typed numbers contiguously in memory, which makes it compact and fast.",
            "Vectorization means writing a + 1 instead of a loop; NumPy runs the loop in compiled C code.",
            "Create arrays with np.array, np.zeros, np.ones, np.full, np.arange (stop excluded), np.linspace (stop included) and np.eye.",
            "shape, ndim, size and dtype describe an array; print .shape first when debugging.",
            "astype(int) truncates rather than rounds, and assigning floats into an int array silently truncates."
          ],
          exercise: {
            prompt: String.raw`<p>Create (1) a 1-D array of the 11 values 0.0, 0.1, ..., 1.0; (2) a 3×4 array filled with the value 5 as floats; (3) an array of the even numbers from 2 to 20 inclusive. For each, print the array, its shape and its dtype. Finally, explain in a comment why <code>np.arange(0, 1.1, 0.1)</code> is a riskier way to make the first array than <code>np.linspace</code>.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

a = np.linspace(0, 1, 11)
b = np.full((3, 4), 5.0)
c = np.arange(2, 21, 2)          # stop must be 21 so that 20 is included

for name, arr in [("a", a), ("b", b), ("c", c)]:
    print(name, arr.shape, arr.dtype)
print(a)
print(c)
# np.arange with a float step can produce one element more or fewer than
# you expect because 0.1 cannot be stored exactly in binary floating point.
# linspace asks for an exact COUNT of points, so the length is guaranteed.
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">a (11,) float64
b (3, 4) float64
c (10,) int64
[0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1. ]
[ 2  4  6  8 10 12 14 16 18 20]</code></pre>
<p><code>linspace</code> takes the number of points, so it always gives exactly 11 values with both ends included. <code>arange</code> with a fractional step relies on repeated floating-point addition, and rounding error can make the final value land just above or below the stop. For integer ranges, <code>arange</code> is perfect — just remember the stop is excluded.</p>`
          },
          quiz: [
            { q: "Why is a NumPy array usually much faster than a Python list for adding 1 to a million numbers?", options: ["NumPy uses the GPU automatically", "The elements share one type and sit in contiguous memory, so compiled code loops over them without per-element type checks", "Python lists cannot hold numbers larger than 1000", "NumPy skips some of the elements"], answer: 1, explain: "NumPy's speed comes from homogeneous, contiguous storage processed by compiled loops. It does not use a GPU by default and it never skips elements." },
            { q: "What is the shape of np.zeros((4, 2))?", options: ["(2, 4)", "(8,)", "(4, 2)", "4"], answer: 2, explain: "The tuple you pass is exactly the shape: 4 rows and 2 columns. Its size (element count) would be 8." },
            { q: "What does np.array([2.7, 3.9]).astype(int) produce?", options: ["[3 4]", "[2 3]", "[2.7 3.9]", "An error"], answer: 1, explain: "astype(int) truncates toward zero, dropping the fractional part. Use np.round first if you want rounding." },
            { q: "Which call gives exactly 5 evenly spaced values from 0 to 10 with both ends included?", options: ["np.arange(0, 10, 5)", "np.linspace(0, 10, 5)", "np.arange(0, 10)", "np.full(5, 10)"], answer: 1, explain: "linspace(start, stop, num) includes the stop and returns num points: 0, 2.5, 5, 7.5, 10." }
          ]
        },
        {
          id: "pyai-numpy-indexing",
          title: "Indexing, Slicing and Boolean Masks",
          minutes: 45,
          objectives: [
            "Index and slice 1-D and 2-D arrays, including rows, columns and sub-blocks",
            "Filter arrays with boolean masks and combine conditions with &, | and ~",
            "Use fancy (integer-list) indexing to pick arbitrary elements",
            "Explain the difference between a view and a copy and avoid accidental modification"
          ],
          body: String.raw`
<p>Data work is mostly about <em>selecting</em> the right numbers: the last column (often the label), the rows where the price is above some value, the first 80% of rows for training. NumPy gives you three ways to select: basic indexing and slicing (by position), boolean masks (by condition) and fancy indexing (by a list of positions). Pandas, which you will learn next, uses the same ideas, so time spent here is doubly useful.</p>

<h3>1-D indexing and slicing</h3>
<p>For a 1-D array, indexing works exactly like a Python list. Positions start at 0, negative indexes count from the end, and a slice <code>start:stop:step</code> includes start but excludes stop.</p>

<pre><code class="lang-python runnable">import numpy as np

a = np.array([10, 20, 30, 40, 50, 60])
print(a[0], a[-1])      # first and last
print(a[1:4])           # positions 1, 2, 3
print(a[:3])            # first three
print(a[::2])           # every second element
print(a[::-1])          # reversed
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">10 60
[20 30 40]
[10 20 30]
[10 30 50]
[60 50 40 30 20 10]</code></pre>

<h3>2-D indexing: rows and columns</h3>
<p>For a 2-D array you give one index (or slice) per axis, separated by a comma: <code>m[row, column]</code>. <strong>Axis 0</strong> runs down the rows; <strong>axis 1</strong> runs across the columns. A bare colon <code>:</code> means "everything along this axis".</p>
<div class="callout info"><strong>Analogy:</strong> think of a cinema seat ticket: "row 2, seat 3". The row always comes first. <code>m[2, 3]</code> is row 2, column 3.</div>

<pre><code class="lang-python runnable">import numpy as np

m = np.array([[ 1,  2,  3,  4],
              [ 5,  6,  7,  8],
              [ 9, 10, 11, 12]])

print(m[1, 2])        # row 1, column 2 -&gt; a single number
print(m[0])           # whole first row (same as m[0, :])
print(m[:, 1])        # whole second column
print(m[:, -1])       # last column - often the label column in a dataset
print(m[0:2, 1:3])    # rows 0-1, columns 1-2: a 2x2 block
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">7
[1 2 3 4]
[ 2  6 10]
[ 4  8 12]
[[2 3]
 [6 7]]</code></pre>
<p>A very common ML pattern is splitting a data matrix into features and labels: <code>X = data[:, :-1]</code> (every column except the last) and <code>y = data[:, -1]</code> (only the last). Read it aloud: "all rows, all columns up to but not including the last".</p>

<div class="callout warn"><strong>Common mistake:</strong> <code>m[0][1]</code> works but is slower and behaves differently with slices; <code>m[:][1]</code> does <em>not</em> select column 1 — it selects row 1 (because <code>m[:]</code> is the whole matrix and then <code>[1]</code> picks a row). Always use the comma form <code>m[:, 1]</code> for columns.</div>

<h3>Boolean masks: selecting by condition</h3>
<p>Comparing an array to a value produces an array of <code>True</code>/<code>False</code> of the same shape — a <strong>boolean mask</strong>. Putting that mask inside square brackets keeps only the elements where the mask is True. This is how you filter data without writing a loop.</p>

<pre><code class="lang-python runnable">import numpy as np

scores = np.array([55, 82, 91, 47, 68, 99, 73])
mask = scores &gt;= 70
print(mask)
print(scores[mask])               # only the passing scores
print(scores[scores &lt; 50])        # one-liner: mask built inline
print("how many passed:", mask.sum())   # True counts as 1, False as 0
print("fraction passed:", mask.mean())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[False  True  True False False  True  True]
[82 91 99 73]
[47]
how many passed: 4
fraction passed: 0.5714285714285714</code></pre>
<p>The trick <code>mask.sum()</code> (count of Trues) and <code>mask.mean()</code> (fraction of Trues) is used everywhere — for example, a model's accuracy is just <code>(predictions == labels).mean()</code>.</p>

<h4>Combining conditions</h4>
<p>To combine masks use <code>&amp;</code> (and), <code>|</code> (or) and <code>~</code> (not). You <strong>must</strong> wrap each condition in parentheses, because <code>&amp;</code> binds more tightly than <code>&gt;</code> in Python.</p>

<pre><code class="lang-python runnable">import numpy as np

ages = np.array([15, 22, 37, 45, 63, 70])
income = np.array([0, 28, 52, 61, 40, 22])

working_age = (ages &gt;= 18) &amp; (ages &lt; 65)
print(ages[working_age])
print(ages[(ages &lt; 18) | (ages &gt;= 65)])
print(income[~working_age])        # ~ flips True/False
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[22 37 45 63]
[15 70]
[ 0 22]</code></pre>

<div class="callout warn"><strong>Common mistake:</strong> writing <code>ages &gt; 18 and ages &lt; 65</code> raises <em>"The truth value of an array with more than one element is ambiguous"</em>. Python's <code>and</code>/<code>or</code> want a single True/False, but an array holds many. Use <code>&amp;</code>/<code>|</code> with parentheses instead.</div>

<p>Masks can also be used for <em>assignment</em>. A classic data-cleaning step is clipping or replacing bad values:</p>
<pre><code class="lang-python runnable">import numpy as np

readings = np.array([3.2, -1.0, 4.8, -0.5, 2.9])
readings[readings &lt; 0] = 0.0        # sensor can't be negative: set to 0
print(readings)

# np.where(condition, value_if_true, value_if_false) builds a new array
labels = np.where(readings &gt; 3, "high", "low")
print(labels)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[3.2 0.  4.8 0.  2.9]
['high' 'low' 'high' 'low' 'low']</code></pre>

<h3>Fancy indexing: a list of positions</h3>
<p>You can pass a list (or array) of integer positions to pick specific elements in any order, even repeating some. This is how datasets are shuffled: generate a random ordering of row numbers and index with it.</p>
<pre><code class="lang-python runnable">import numpy as np

a = np.array([10, 20, 30, 40, 50])
print(a[[4, 0, 2]])          # picks positions 4, 0, 2 in that order

m = np.arange(12).reshape(3, 4)
print(m[[2, 0]])             # rows 2 and 0
order = np.array([2, 0, 1])
print(m[order, 0])           # first column, rows reordered
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[50 10 30]
[[ 8  9 10 11]
 [ 0  1  2  3]]
[8 0 4]</code></pre>

<h3>Views versus copies</h3>
<p>Here is a subtle but important point. A <strong>slice</strong> of an array does not copy the data — it is a <strong>view</strong>: a new window onto the same memory. Changing the view changes the original. NumPy does this deliberately so that slicing huge arrays is instant. Boolean and fancy indexing, by contrast, always return a <strong>copy</strong>.</p>
<pre><code class="lang-python runnable">import numpy as np

original = np.array([1, 2, 3, 4, 5])
window = original[1:4]        # a VIEW
window[0] = 99
print(original)               # the original changed!

safe = original[1:4].copy()   # an independent COPY
safe[0] = -1
print(original)               # no further change: the copy is independent

picked = original[original &gt; 3]   # boolean indexing -&gt; copy
picked[:] = 0
print(original)               # unchanged
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[ 1 99  3  4  5]
[ 1 99  3  4  5]
[ 1 99  3  4  5]</code></pre>
<div class="callout tip"><strong>Rule of thumb:</strong> if you take a slice and intend to modify it while keeping the original intact, call <code>.copy()</code>. This is the NumPy cousin of pandas' famous "SettingWithCopy" confusion you will meet later.</div>

<h3>Putting it together: a tiny dataset</h3>
<p>Imagine each row is a house: <code>[size_m2, bedrooms, price_k]</code>. Let's split features and target, and filter.</p>
<pre><code class="lang-python runnable">import numpy as np

houses = np.array([[ 50, 1, 150],
                   [ 80, 2, 210],
                   [120, 3, 330],
                   [ 65, 2, 180],
                   [200, 4, 560]])
X = houses[:, :-1]          # features: size and bedrooms
y = houses[:, -1]           # target: price
print("X shape:", X.shape, "y shape:", y.shape)

big = X[:, 0] &gt; 70          # mask on the size column
print("prices of big houses:", y[big])
print("average price of big houses:", y[big].mean())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">X shape: (5, 2) y shape: (5,)
prices of big houses: [210 330 560]
average price of big houses: 366.6666666666667</code></pre>
<p>Notice how the mask built from one column (<code>X[:, 0]</code>) is used to select from a different array (<code>y</code>). This works because both have one entry per house in the same order — rows stay aligned. Keeping rows aligned between X and y is something you will care about in every ML project.</p>
`,
          keyPoints: [
            "Use m[row, col]; axis 0 is rows, axis 1 is columns, and : means everything.",
            "X = data[:, :-1] and y = data[:, -1] is the standard feature/label split.",
            "A comparison creates a boolean mask; a[mask] keeps the True positions, mask.sum() counts and mask.mean() gives a fraction.",
            "Combine masks with &, |, ~ and wrap each condition in parentheses; never use and/or on arrays.",
            "Slices are views that share memory with the original; boolean and fancy indexing return copies; use .copy() when in doubt."
          ],
          exercise: {
            prompt: String.raw`<p>Given <code>data = np.arange(1, 21).reshape(4, 5)</code> (a 4×5 grid of 1..20): (1) print the middle two rows and last two columns as a 2×2 block; (2) print all values divisible by 3; (3) replace every odd number with 0 <em>in a copy</em>, leaving <code>data</code> unchanged, and print both; (4) print the fraction of values greater than 12.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

data = np.arange(1, 21).reshape(4, 5)
print(data[1:3, -2:])                 # (1) rows 1-2, last two columns
print(data[data % 3 == 0])            # (2) boolean mask with modulo
evens_only = data.copy()              # (3) copy first!
evens_only[evens_only % 2 == 1] = 0
print(evens_only)
print(data)                           # original intact
print((data &gt; 12).mean())             # (4) fraction of True
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[ 9 10]
 [14 15]]
[ 3  6  9 12 15 18]
[[ 0  2  0  4  0]
 [ 6  0  8  0 10]
 [ 0 12  0 14  0]
 [16  0 18  0 20]]
[[ 1  2  3  4  5]
 [ 6  7  8  9 10]
 [11 12 13 14 15]
 [16 17 18 19 20]]
0.4</code></pre>
<p>Part (3) only leaves <code>data</code> untouched because of <code>.copy()</code>. Without it, <code>evens_only</code> would just be a second name for the same array (plain assignment never copies), and the masked assignment would change <code>data</code> too. In part (4), the mean of a boolean mask is the fraction of Trues: 8 of the 20 values exceed 12, giving 0.4.</p>`
          },
          quiz: [
            { q: "For a 2-D array m, what does m[:, 0] select?", options: ["The first row", "The first column", "The first element only", "Every element except the first"], answer: 1, explain: "The colon means all rows, and 0 picks column 0 — so you get the whole first column as a 1-D array." },
            { q: "Which expression correctly selects values of a between 10 and 20 (exclusive)?", options: ["a[a > 10 and a < 20]", "a[(a > 10) & (a < 20)]", "a[a > 10 & a < 20]", "a[(a > 10) and (a < 20)]"], answer: 1, explain: "Arrays need the element-wise operator & and each comparison must be parenthesised because & has higher precedence than comparisons. 'and' raises an ambiguity error." },
            { q: "After b = a[1:3]; b[0] = 100, what happens to a?", options: ["Nothing; b is a copy", "a[1] becomes 100 because a slice is a view", "a[0] becomes 100", "An error is raised"], answer: 1, explain: "Basic slices are views sharing memory, so b[0] is the same storage as a[1]." },
            { q: "If preds and labels are equal-length arrays, what does (preds == labels).mean() compute?", options: ["The number of mistakes", "The accuracy: the fraction of matching positions", "The average prediction", "It raises an error"], answer: 1, explain: "The comparison gives a boolean mask; the mean of a boolean array is the fraction of True values, which is exactly accuracy." }
          ]
        },
        {
          id: "pyai-numpy-math",
          title: "Vectorized Math, Ufuncs and Aggregation Along Axes",
          minutes: 45,
          objectives: [
            "Apply element-wise arithmetic and universal functions (ufuncs) to whole arrays",
            "Compute aggregates such as sum, mean, std, min, max, argmax over a whole array or along an axis",
            "Explain what axis=0 and axis=1 mean without guessing",
            "Standardize features (z-scores) using vectorized operations"
          ],
          body: String.raw`
<p>Once your data is in an array, you want to compute with it: scale it, take logarithms, find averages per column, find which class has the highest score. NumPy gives you two families of tools: <strong>element-wise operations</strong> that transform each number independently, and <strong>aggregations</strong> (also called reductions) that collapse many numbers into a summary.</p>

<h3>Element-wise arithmetic</h3>
<p>All the arithmetic operators work element by element on arrays of the same shape: <code>+ - * / // % **</code>. "Element-wise" means position 0 is combined with position 0, position 1 with position 1, and so on. This is different from what you might expect if you know matrix math — <code>a * b</code> is <em>not</em> matrix multiplication (that is <code>a @ b</code>, covered in the math module).</p>
<pre><code class="lang-python runnable">import numpy as np

a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])
print(a + b)
print(b - a)
print(a * b)        # element-wise product, NOT matrix multiplication
print(b / a)        # true division always gives floats
print(b // 3)       # floor (integer) division
print(a ** 2)
print(a * 10 + 1)   # scalars apply to every element
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[11 22 33 44]
[ 9 18 27 36]
[ 10  40  90 160]
[10. 10. 10. 10.]
[ 3  6 10 13]
[ 1  4  9 16]
[11 21 31 41]</code></pre>

<div class="callout warn"><strong>Common mistake — integer division:</strong> <code>//</code> rounds <em>down</em> to a whole number, so <code>7 // 2</code> is <code>3</code> and <code>-7 // 2</code> is <code>-4</code> (down, not toward zero). If you want an average or a ratio, use <code>/</code>. A frequent bug is computing a percentage with <code>//</code> and getting 0 for every row.</div>

<h3>Universal functions (ufuncs)</h3>
<p>A <strong>ufunc</strong> is a NumPy function that operates element-wise on arrays at C speed. The ones you will use most in ML:</p>
<ul>
<li><code>np.sqrt</code>, <code>np.square</code>, <code>np.abs</code></li>
<li><code>np.exp</code> (e<sup>x</sup>) and <code>np.log</code> (natural logarithm) — the backbone of the sigmoid and softmax functions and of log-loss</li>
<li><code>np.maximum(a, b)</code> — element-wise larger value; <code>np.maximum(0, x)</code> is the ReLU activation used in neural networks</li>
<li><code>np.clip(a, low, high)</code> — limit values to a range</li>
<li><code>np.round</code>, <code>np.floor</code>, <code>np.ceil</code></li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

x = np.array([-2.0, -0.5, 0.0, 1.0, 3.0])
print("abs:    ", np.abs(x))
print("exp:    ", np.round(np.exp(x), 3))
print("relu:   ", np.maximum(0, x))
print("clip:   ", np.clip(x, -1, 1))
sigmoid = 1 / (1 + np.exp(-x))          # squashes any number into (0, 1)
print("sigmoid:", np.round(sigmoid, 3))
print("log of positives:", np.round(np.log(np.array([1, np.e, 10])), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">abs:     [2.  0.5 0.  1.  3. ]
exp:     [ 0.135  0.607  1.     2.718 20.086]
relu:    [0. 0. 0. 1. 3.]
clip:    [-1.  -0.5  0.   1.   1. ]
sigmoid: [0.119 0.378 0.5   0.731 0.953]
log of positives: [0.    1.    2.303]</code></pre>
<p>Notice how the sigmoid — a function you will meet again in logistic regression and neural networks — is a single line of vectorized math. No loop needed.</p>

<div class="callout warn"><strong>Watch out:</strong> <code>np.log(0)</code> gives <code>-inf</code> and <code>np.log</code> of a negative number gives <code>nan</code> ("not a number"), each with a warning rather than an error. NaNs then spread silently through every later calculation. When taking logs of probabilities, ML libraries clip them to a tiny minimum like <code>1e-15</code> first.</div>

<h3>Aggregations</h3>
<p>Aggregation functions summarize an array: <code>sum</code>, <code>mean</code>, <code>median</code>, <code>std</code> (standard deviation), <code>var</code>, <code>min</code>, <code>max</code>, and <code>argmin</code>/<code>argmax</code>, which return the <em>position</em> of the smallest/largest value rather than the value itself. They exist both as functions (<code>np.mean(a)</code>) and methods (<code>a.mean()</code>) — except <code>median</code>, which is only <code>np.median(a)</code>.</p>
<pre><code class="lang-python runnable">import numpy as np

sales = np.array([120, 95, 180, 60, 150])
print("total:", sales.sum())
print("mean:", sales.mean())
print("median:", np.median(sales))
print("std:", round(sales.std(), 2))
print("max:", sales.max(), "on day index", sales.argmax())
print("running total:", np.cumsum(sales))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">total: 605
mean: 121.0
median: 120.0
std: 41.76
max: 180 on day index 2
running total: [120 215 395 455 605]</code></pre>
<p><code>argmax</code> is extremely common in ML: a classifier outputs one score per class and the predicted class is <code>scores.argmax()</code>.</p>

<h3>Aggregating along an axis</h3>
<p>With a 2-D array, you usually do not want one number for the whole table. You want one number per column (e.g. the average of each feature) or one per row (e.g. the total for each customer). That is what the <code>axis</code> argument does.</p>
<p>Here is the rule that removes all guessing: <strong>the axis you name is the axis that disappears</strong>. A table of shape <code>(4, 3)</code> — 4 rows, 3 columns:</p>
<ul>
<li><code>axis=0</code> collapses the rows (you move <em>down</em> each column, combining the 4 rows), leaving shape <code>(3,)</code> — one result per column.</li>
<li><code>axis=1</code> collapses the columns (you move <em>across</em> each row, combining the 3 columns), leaving shape <code>(4,)</code> — one result per row.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

# rows = 4 students, columns = 3 exams
marks = np.array([[70, 80, 90],
                  [60, 65, 70],
                  [85, 95, 75],
                  [50, 55, 60]])
print("shape:", marks.shape)
print("mean per exam   (axis=0):", marks.mean(axis=0))
print("mean per student (axis=1):", np.round(marks.mean(axis=1), 1))
print("best student per exam:", marks.argmax(axis=0))
print("overall mean:", marks.mean())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shape: (4, 3)
mean per exam   (axis=0): [66.25 73.75 73.75]
mean per student (axis=1): [80. 65. 85. 55.]
best student per exam: [2 2 0]
overall mean: 71.25</code></pre>

<div class="callout warn"><strong>Common mistake — axis confusion:</strong> people often think "axis=0 means rows, so I get one value per row". It is the opposite: axis=0 is the row axis that gets <em>squashed</em>, giving one value per column. If unsure, check the shape of the result: per-column results have length equal to the number of columns.</div>

<p>Sometimes you want the result to keep its dimension so it can be combined with the original table (you will see why in the broadcasting lesson). Pass <code>keepdims=True</code>: the result of <code>marks.mean(axis=1, keepdims=True)</code> has shape <code>(4, 1)</code> instead of <code>(4,)</code>.</p>

<h3>A real ML preprocessing step: standardization</h3>
<p>Many ML algorithms work best when every feature is on a similar scale. If one feature is "income in dollars" (tens of thousands) and another is "number of children" (0–5), the big one dominates distance calculations and slows down gradient descent. <strong>Standardization</strong> (computing <em>z-scores</em>) rescales each column to mean 0 and standard deviation 1: subtract the column mean, then divide by the column standard deviation.</p>
<pre><code class="lang-python runnable">import numpy as np

X = np.array([[50_000, 1],
              [62_000, 3],
              [38_000, 0],
              [90_000, 2]], dtype=float)
mu = X.mean(axis=0)          # one mean per column
sigma = X.std(axis=0)        # one std per column
Z = (X - mu) / sigma         # shapes (4,2) - (2,) works thanks to broadcasting
print("column means:", mu.tolist())
print(np.round(Z, 2))
print("new means:", np.round(Z.mean(axis=0), 6))
print("new stds:", Z.std(axis=0))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">column means: [60000.0, 1.5]
[[-0.52 -0.45]
 [ 0.1   1.34]
 [-1.14 -1.34]
 [ 1.56  0.45]]
new means: [0. 0.]
new stds: [1. 1.]</code></pre>
<p>This is exactly what scikit-learn's <code>StandardScaler</code> does internally. The expression <code>X - mu</code> subtracts a length-2 vector from every row of a 4×2 matrix. How NumPy knows to do that is the subject of the next lesson: broadcasting.</p>
`,
          keyPoints: [
            "Arithmetic operators and ufuncs (exp, log, sqrt, maximum, clip) work element-wise at C speed.",
            "a * b is element-wise multiplication, not matrix multiplication; / always gives floats while // floors.",
            "Aggregations: sum, mean, np.median, std, min, max, argmax, cumsum.",
            "The axis you name disappears: axis=0 gives one result per column, axis=1 one per row.",
            "Standardization (X - X.mean(axis=0)) / X.std(axis=0) puts features on a common scale."
          ],
          exercise: {
            prompt: String.raw`<p>A shop records units sold for 3 products (columns) over 5 days (rows): <code>[[3,7,2],[5,6,0],[4,9,1],[6,5,3],[2,8,2]]</code>. Prices are 4.0, 2.5 and 10.0 per unit. Compute: (1) total units per product; (2) revenue per day (hint: multiply by the price array, then sum along the right axis); (3) the day index with the highest revenue; (4) each product's share of total units as a percentage, rounded to 1 decimal.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

units = np.array([[3, 7, 2], [5, 6, 0], [4, 9, 1], [6, 5, 3], [2, 8, 2]])
prices = np.array([4.0, 2.5, 10.0])

per_product = units.sum(axis=0)           # collapse days -&gt; one per product
revenue = (units * prices).sum(axis=1)    # each row times prices, then sum across
best_day = revenue.argmax()
share = np.round(per_product / per_product.sum() * 100, 1)

print("units per product:", per_product)
print("revenue per day:", revenue)
print("best day:", best_day)
print("share %:", share)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">units per product: [20 35  8]
revenue per day: [49.5 35.  48.5 66.5 48. ]
best day: 3
share %: [31.7 55.6 12.7]</code></pre>
<p><code>units * prices</code> multiplies each column by its price (shape (5,3) times (3,) broadcasts along rows). Summing with <code>axis=1</code> collapses the product columns, leaving one revenue per day. Using <code>/</code> rather than <code>//</code> for the share is essential; with <code>//</code> every share would be truncated.</p>`
          },
          quiz: [
            { q: "marks has shape (100, 5): 100 students, 5 subjects. What is the shape of marks.mean(axis=0)?", options: ["(100,)", "(5,)", "(100, 5)", "A single number"], answer: 1, explain: "axis=0 (the 100 rows) is collapsed, leaving one mean per subject: shape (5,)." },
            { q: "What does np.argmax(np.array([0.1, 0.7, 0.2])) return?", options: ["0.7", "1", "2", "0"], answer: 1, explain: "argmax returns the index of the largest element; 0.7 sits at position 1. This is how a predicted class is chosen from scores." },
            { q: "Which expression implements the ReLU activation for an array x?", options: ["np.max(x)", "np.maximum(0, x)", "np.clip(x, 0, 0)", "np.abs(x)"], answer: 1, explain: "np.maximum compares element-wise and keeps the larger of 0 and each x. np.max returns one value for the whole array." },
            { q: "What is np.array([7, -7]) // 2?", options: ["[3 -3]", "[3.5 -3.5]", "[3 -4]", "[4 -4]"], answer: 2, explain: "Floor division rounds down toward minus infinity: 7//2 = 3 and -7//2 = -4." }
          ]
        },
        {
          id: "pyai-numpy-broadcasting",
          title: "Broadcasting, Reshaping and Reproducible Randomness",
          minutes: 50,
          objectives: [
            "State the broadcasting rules and predict the result shape of an operation",
            "Reshape, flatten, add axes and stack arrays",
            "Generate random numbers with np.random.default_rng and explain why seeds matter in ML",
            "Shuffle and split a dataset reproducibly"
          ],
          body: String.raw`
<p>In the last lesson you subtracted a 2-element vector of column means from a 4×2 matrix and NumPy "just knew" to subtract it from every row. That behaviour is called <strong>broadcasting</strong>, and it is one of the most powerful — and occasionally most confusing — features of NumPy. This lesson explains exactly how it works, then covers reshaping arrays and generating random numbers in a reproducible way.</p>

<h3>Broadcasting: stretching arrays to fit</h3>
<p>Element-wise operations need two arrays of the same shape. Broadcasting is NumPy's rule for what to do when shapes differ: if possible, it <em>virtually stretches</em> the smaller array to match the bigger one, without actually copying any data. The simplest case is a scalar: in <code>a * 10</code>, the 10 is stretched to the shape of <code>a</code>.</p>

<figure><img alt="Broadcasting: a 3 by 3 matrix plus a length-3 row vector; the vector is stretched down the rows and added to every row" src="assets/diagrams/python-ai-broadcasting.svg"><figcaption>Broadcasting a (3,3) matrix with a (3,) row: the row is conceptually copied to every row, then added element-wise.</figcaption></figure>

<h4>The rules</h4>
<p>NumPy compares shapes <strong>from the right</strong> (the last dimension first). Two dimensions are compatible when:</p>
<ol>
<li>they are equal, or</li>
<li>one of them is 1 (it gets stretched), or</li>
<li>one array has run out of dimensions (missing dimensions are treated as 1 on the left).</li>
</ol>
<p>If any pair of dimensions fails these rules you get <em>"operands could not be broadcast together"</em>. Let's apply the rules to a few examples:</p>
<table>
<thead><tr><th>Shape A</th><th>Shape B</th><th>Compare right to left</th><th>Result</th></tr></thead>
<tbody>
<tr><td>(4, 3)</td><td>(3,)</td><td>3 vs 3 ok; 4 vs missing → 1 ok</td><td>(4, 3)</td></tr>
<tr><td>(4, 3)</td><td>(4, 1)</td><td>3 vs 1 ok; 4 vs 4 ok</td><td>(4, 3)</td></tr>
<tr><td>(4, 1)</td><td>(1, 3)</td><td>1 vs 3 ok; 4 vs 1 ok</td><td>(4, 3)</td></tr>
<tr><td>(4, 3)</td><td>(4,)</td><td>3 vs 4 — neither is 1</td><td>Error</td></tr>
</tbody>
</table>

<pre><code class="lang-python runnable">import numpy as np

m = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
row = np.array([10, 20, 30])          # shape (3,)
col = np.array([[100], [200], [300]]) # shape (3, 1)

print(m + row)      # row added to every row
print(m + col)      # column added to every column
print(np.array([1, 2, 3]).reshape(3, 1) * np.array([1, 10]))   # (3,1) x (2,) -&gt; (3,2) table
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[11 22 33]
 [14 25 36]
 [17 28 39]]
[[101 102 103]
 [204 205 206]
 [307 308 309]]
[[ 1 10]
 [ 2 20]
 [ 3 30]]</code></pre>
<p>The last line built a whole multiplication table from two small vectors — an "outer" combination. Broadcasting a column against a row is a common trick for computing all pairwise differences or distances.</p>

<h4>The classic broadcasting bug: per-row operations</h4>
<p>Suppose you want each <em>row</em> to be divided by its own total (turning counts into proportions). <code>m.sum(axis=1)</code> has shape <code>(3,)</code>. Dividing a <code>(3,3)</code> by a <code>(3,)</code> will broadcast it along the <em>rows</em> — dividing each <em>column</em> by a different number. That runs without error but gives the wrong answer! The fix is <code>keepdims=True</code>, giving shape <code>(3,1)</code>, which broadcasts across columns as intended.</p>
<pre><code class="lang-python runnable">import numpy as np

counts = np.array([[1, 1, 2],
                   [3, 0, 1],
                   [5, 5, 0]])
wrong = counts / counts.sum(axis=1)                  # shapes (3,3)/(3,)  - silently wrong
right = counts / counts.sum(axis=1, keepdims=True)   # shapes (3,3)/(3,1) - correct
print("wrong row sums:", wrong.sum(axis=1))
print("right row sums:", right.sum(axis=1))
print(right)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">wrong row sums: [0.7  0.85 2.5 ]
right row sums: [1. 1. 1.]
[[0.25 0.25 0.5 ]
 [0.75 0.   0.25]
 [0.5  0.5  0.  ]]</code></pre>
<div class="callout warn"><strong>Common mistake:</strong> broadcasting bugs rarely crash — for square tables they silently compute the wrong thing. After any row-wise normalization, check a property you expect (here: every row sums to 1). The softmax function in neural networks uses exactly this pattern with <code>keepdims=True</code>.</div>

<h3>Reshaping</h3>
<p><code>reshape</code> gives the same data a new shape, as long as the total number of elements stays the same. Think of 12 eggs: you can arrange them as 3×4, 2×6, 12×1 — but not 5×3. You may put <code>-1</code> for one dimension and NumPy will work it out.</p>
<pre><code class="lang-python runnable">import numpy as np

a = np.arange(12)
print(a.reshape(3, 4))
print(a.reshape(2, -1).shape)     # -1 means "whatever fits": 12 / 2 = 6
print(a.reshape(3, 4).ravel())    # flatten back to 1-D

x = np.array([5.0, 6.0, 7.0])     # shape (3,)
print(x.reshape(-1, 1).shape)     # column vector (3, 1)
print(x[np.newaxis, :].shape)     # row vector (1, 3)
print(x[:, np.newaxis].shape)     # same as reshape(-1, 1)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
(2, 6)
[ 0  1  2  3  4  5  6  7  8  9 10 11]
(3, 1)
(1, 3)
(3, 1)</code></pre>
<div class="callout tip"><strong>Where you'll see this:</strong> scikit-learn requires <code>X</code> to be 2-D even if you have only one feature. Passing a 1-D array raises <em>"Expected 2D array, got 1D array instead... Reshape your data using array.reshape(-1, 1)"</em>. Now you know what that fix means: turn shape <code>(n,)</code> into a single-column matrix <code>(n, 1)</code>.</div>

<h3>Transposing and stacking</h3>
<p><code>.T</code> swaps rows and columns. To combine arrays, <code>np.concatenate</code> joins along an existing axis, <code>np.vstack</code> stacks vertically (adds rows), <code>np.hstack</code> horizontally (adds columns), and <code>np.column_stack</code> turns several 1-D arrays into the columns of a matrix — handy for building a feature matrix.</p>
<pre><code class="lang-python runnable">import numpy as np

height = np.array([160, 175, 182])
weight = np.array([55, 72, 80])
X = np.column_stack([height, weight])
print(X)
print(X.T)                                 # transpose: shape (2, 3)
print(np.vstack([X, [[190, 90]]]).shape)   # one more row
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[160  55]
 [175  72]
 [182  80]]
[[160 175 182]
 [ 55  72  80]]
(4, 2)</code></pre>

<h3>Random numbers and seeds</h3>
<p>Randomness is everywhere in ML: shuffling data, splitting train and test sets, initializing neural network weights, dropout, sampling. But computers generate "random" numbers with a deterministic algorithm called a <strong>pseudo-random number generator</strong>. It starts from a number called the <strong>seed</strong>; the same seed always produces the same sequence.</p>
<div class="callout info"><strong>Analogy:</strong> a seed is like the page number in a giant book of random digits. If you and a colleague both start reading at page 42, you get identical "random" numbers — so your experiments are reproducible.</div>
<p>Reproducibility matters enormously: if your model's accuracy changes every run because the data split changed, you cannot tell whether a code change actually helped. The modern NumPy API is to create a generator object with <code>np.random.default_rng(seed)</code> and call methods on it.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
print(rng.random(3))                     # uniform floats in [0, 1)
print(rng.integers(1, 7, size=5))        # dice rolls: 1..6 (7 excluded)
print(np.round(rng.normal(loc=0, scale=1, size=4), 3))   # bell-curve values
print(rng.choice(["red", "green", "blue"], size=4))

rng_a = np.random.default_rng(7)
rng_b = np.random.default_rng(7)
print("same seed, same numbers:", np.array_equal(rng_a.random(5), rng_b.random(5)))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0.77395605 0.43887844 0.85859792]
[1 5 2 1 4]
[ 0.128 -0.316 -0.017 -0.853]
['blue' 'green' 'green' 'red']
same seed, same numbers: True</code></pre>
<p>Run this a hundred times and you will get exactly the same output, because of the seed. Remove the seed (<code>np.random.default_rng()</code>) and the numbers change every run. You may see older code using <code>np.random.seed(0)</code> and <code>np.random.rand()</code>; that "global" API still works, but the generator style is recommended because each generator is independent and explicit.</p>

<h3>Shuffling and splitting a dataset</h3>
<p>Let's combine fancy indexing and randomness to do what <code>train_test_split</code> does internally: shuffle row indexes with a permutation, then cut.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
X = np.arange(20).reshape(10, 2)     # 10 samples, 2 features
y = np.arange(10) * 10               # matching labels

idx = rng.permutation(len(X))        # random order of 0..9
cut = int(0.8 * len(X))              # 80% for training
train_idx, test_idx = idx[:cut], idx[cut:]
X_train, y_train = X[train_idx], y[train_idx]
X_test, y_test = X[test_idx], y[test_idx]
print("shuffled order:", idx)
print("train/test sizes:", len(X_train), len(X_test))
print("test X:", X_test.tolist(), "test y:", y_test.tolist())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shuffled order: [4 6 2 7 3 5 9 0 8 1]
train/test sizes: 8 2
test X: [[16, 17], [2, 3]] test y: [80, 10]</code></pre>
<p>Notice we shuffled <em>indexes</em> and used the same indexes for X and y, so each sample keeps its own label. Shuffling X and y separately would scramble the pairing and destroy the dataset — a surprisingly common beginner bug.</p>
`,
          keyPoints: [
            "Broadcasting compares shapes from the right; dimensions match if equal or if one is 1 (or missing).",
            "Use keepdims=True (or reshape(-1, 1)) for per-row operations; broadcasting bugs are often silent.",
            "reshape keeps the element count; -1 lets NumPy infer one dimension; reshape(-1, 1) makes a column for scikit-learn.",
            "np.column_stack builds a feature matrix from 1-D arrays; .T transposes.",
            "Use rng = np.random.default_rng(seed) for reproducible randomness; shuffle indexes and apply them to both X and y."
          ],
          exercise: {
            prompt: String.raw`<p>Using <code>rng = np.random.default_rng(1)</code>, create a 5×3 matrix of normal random numbers with mean 50 and standard deviation 10. Then: (1) subtract each <em>column's</em> mean; (2) subtract each <em>row's</em> mean from the original (use keepdims); (3) verify with <code>np.allclose</code> that the column means of (1) and the row means of (2) are all approximately zero. Print the shapes of the intermediate mean arrays.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(1)
M = rng.normal(50, 10, size=(5, 3))

col_means = M.mean(axis=0)                  # shape (3,)  broadcasts along rows
row_means = M.mean(axis=1, keepdims=True)   # shape (5,1) broadcasts across columns
centered_cols = M - col_means
centered_rows = M - row_means

print(col_means.shape, row_means.shape)
print(np.allclose(centered_cols.mean(axis=0), 0))
print(np.allclose(centered_rows.mean(axis=1), 0))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(3,) (5, 1)
True
True</code></pre>
<p>The column means have shape (3,), which lines up with the last dimension of (5,3) and is stretched down the rows. The row means need shape (5,1); without keepdims they would be (5,) and the subtraction would fail, because 3 and 5 are incompatible. <code>np.allclose</code> is used instead of <code>==</code> because floating-point results are only approximately zero (e.g. 1e-15).</p>`
          },
          quiz: [
            { q: "What is the result shape of an operation between arrays of shape (8, 1) and (1, 5)?", options: ["(8, 5)", "(8, 1)", "(1, 5)", "Error"], answer: 0, explain: "Comparing from the right: 1 vs 5 stretches to 5, then 8 vs 1 stretches to 8, giving (8, 5)." },
            { q: "Which pair of shapes cannot be broadcast together?", options: ["(4, 3) and (3,)", "(4, 3) and (4, 1)", "(4, 3) and (4,)", "(4, 3) and (1,)"], answer: 2, explain: "Comparing the last dimensions: 3 vs 4, neither is 1, so broadcasting fails. Reshape to (4, 1) to fix it." },
            { q: "scikit-learn complains it expected a 2D array but got a 1D array x of shape (100,). What fix does it suggest?", options: ["x.T", "x.reshape(-1, 1)", "x.ravel()", "x.flatten()"], answer: 1, explain: "reshape(-1, 1) turns 100 values into a (100, 1) column — 100 samples with one feature. Transposing a 1-D array does nothing." },
            { q: "Why do ML practitioners fix a random seed?", options: ["It makes the model more accurate", "It makes random operations repeatable so experiments can be compared fairly", "It is required for NumPy to work", "It speeds up training"], answer: 1, explain: "A seed makes pseudo-random sequences identical across runs, so differences in results come from your changes, not from luck." },
            { q: "To shuffle a dataset correctly you should…", options: ["Shuffle X and y separately", "Generate one permutation of indexes and use it for both X and y", "Sort X", "Shuffle only y"], answer: 1, explain: "Using the same permutation for X and y keeps every sample paired with its label." }
          ]
        }
      ]
    },
    {
      id: "pyai-pandas",
      title: "Pandas: Working with Tabular Data",
      summary: "Load, inspect, select, clean, transform, group and combine tables with pandas, then turn them into a feature matrix ready for machine learning.",
      lessons: [
        {
          id: "pyai-pandas-basics",
          title: "Series, DataFrames, Loading and Inspecting Data",
          minutes: 50,
          objectives: [
            "Explain what a Series and a DataFrame are and how the index labels rows",
            "Build DataFrames from dictionaries, load CSV files and load scikit-learn's bundled datasets",
            "Inspect a new dataset with shape, head, info, describe, dtypes and value_counts",
            "Recognize what each inspection tells you before modelling"
          ],
          body: String.raw`
<p>NumPy arrays are perfect for pure numbers, but real datasets are messier. They have <em>column names</em> ("age", "city", "price"), columns of different types (numbers next to text next to dates), missing values, and rows identified by something meaningful like a customer ID. <strong>pandas</strong> is the Python library for exactly this kind of labelled, tabular data — think of it as "spreadsheets you can program". It is built on top of NumPy, so everything you learned about vectorization still applies. Almost every ML project starts in pandas: you load raw data, explore it, clean it, and finally hand a numeric table to a model.</p>

<h3>The two core objects</h3>
<p>A <strong>Series</strong> is a one-dimensional column of values with a label for every position. Those labels are called the <strong>index</strong>. A <strong>DataFrame</strong> is a table: a collection of Series that share the same index, one Series per column. If a DataFrame is a spreadsheet, each column is a Series and the row numbers down the left-hand side are the index.</p>

<pre><code class="lang-python runnable">import pandas as pd

prices = pd.Series([3.5, 2.0, 4.25], index=["apple", "banana", "cherry"], name="price")
print(prices)
print("banana costs", prices["banana"])     # look up by label
print(prices * 2)                            # vectorized, just like NumPy
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">apple     3.50
banana    2.00
cherry    4.25
Name: price, dtype: float64
banana costs 2.0
apple     7.0
banana    4.0
cherry    8.5
Name: price, dtype: float64</code></pre>
<p>The left column (apple, banana, cherry) is the index, the right column holds the values, and the last line reports the Series' name and dtype. A Series behaves like a NumPy array (fast math, boolean masks) <em>and</em> like a dictionary (lookup by label).</p>

<h3>Building a DataFrame</h3>
<p>The most common way to create a small DataFrame by hand is from a dictionary that maps column names to lists of values. Each list must have the same length — one entry per row.</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({
    "name":  ["Asha", "Ben", "Chen", "Dana"],
    "age":   [28, 35, 42, 23],
    "city":  ["Pune", "Leeds", "Pune", "Austin"],
    "spend": [120.5, 80.0, 310.2, 45.9],
})
print(df)
print("shape:", df.shape)            # (rows, columns)
print("columns:", list(df.columns))
print(df["age"].mean())              # one column is a Series
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   name  age    city  spend
0  Asha   28    Pune  120.5
1   Ben   35   Leeds   80.0
2  Chen   42    Pune  310.2
3  Dana   23  Austin   45.9
shape: (4, 4)
columns: ['name', 'age', 'city', 'spend']
32.0</code></pre>
<p>Pandas created a default index 0, 1, 2, 3 because we didn't supply one. <code>df["age"]</code> pulls out a single column as a Series, so you can call <code>.mean()</code>, <code>.max()</code> and friends on it.</p>

<h3>Loading a CSV file</h3>
<p>In practice, data arrives as files. The most common format is CSV (comma-separated values): plain text with one row per line and commas between fields. <code>pd.read_csv</code> reads it into a DataFrame, guessing column types along the way. In this example we first <em>write</em> a small CSV so that the code is self-contained; in a real project the file would already exist.</p>
<pre><code class="lang-python runnable">import pandas as pd

csv_text = """order_id,customer,product,quantity,unit_price,order_date
1001,Asha,Keyboard,1,45.00,2024-01-05
1002,Ben,Mouse,2,19.99,2024-01-06
1003,Asha,Monitor,1,189.00,2024-01-09
1004,Chen,Mouse,1,19.99,2024-02-01
1005,Dana,Keyboard,3,45.00,2024-02-14
"""
with open("orders.csv", "w") as f:
    f.write(csv_text)

orders = pd.read_csv("orders.csv", parse_dates=["order_date"])
print(orders)
print(orders.dtypes)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   order_id customer   product  quantity  unit_price order_date
0      1001     Asha  Keyboard         1       45.00 2024-01-05
1      1002      Ben     Mouse         2       19.99 2024-01-06
2      1003     Asha   Monitor         1      189.00 2024-01-09
3      1004     Chen     Mouse         1       19.99 2024-02-01
4      1005     Dana  Keyboard         3       45.00 2024-02-14
order_id               int64
customer                 str
product                  str
quantity               int64
unit_price           float64
order_date    datetime64[us]
dtype: object</code></pre>
<p>Notice the dtypes: whole-number columns became <code>int64</code>, decimals became <code>float64</code>, the dates became <code>datetime64</code> because we asked for <code>parse_dates</code>, and text columns use pandas' string dtype (shown as <code>str</code> in pandas 3; older versions showed <code>object</code>). Useful <code>read_csv</code> options include <code>sep=";"</code> for semicolon files, <code>usecols=[...]</code> to load only some columns, <code>na_values=["?"]</code> to treat odd markers as missing, and <code>index_col="order_id"</code> to use a column as the index. The mirror operation is <code>df.to_csv("out.csv", index=False)</code>.</p>

<h3>Loading scikit-learn's built-in datasets</h3>
<p>scikit-learn ships several classic datasets inside the library itself, so they load instantly with no internet connection. With <code>as_frame=True</code> they come back as pandas objects. You will use these throughout the course:</p>
<table>
<thead><tr><th>Loader</th><th>Rows × features</th><th>Task</th></tr></thead>
<tbody>
<tr><td><code>load_iris</code></td><td>150 × 4</td><td>Classify 3 species of iris flower from petal/sepal sizes</td></tr>
<tr><td><code>load_wine</code></td><td>178 × 13</td><td>Classify 3 wine cultivars from chemical measurements</td></tr>
<tr><td><code>load_breast_cancer</code></td><td>569 × 30</td><td>Classify tumours as malignant or benign</td></tr>
<tr><td><code>load_diabetes</code></td><td>442 × 10</td><td>Regression: predict disease progression one year later</td></tr>
</tbody>
</table>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame                       # features + a "target" column, in one DataFrame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
print(df.shape)
print(df.head())                      # first 5 rows
print(iris.target_names)              # what target 0, 1, 2 mean
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(150, 5)
   sepal_len  sepal_wid  petal_len  petal_wid  target
0        5.1        3.5        1.4        0.2       0
1        4.9        3.0        1.4        0.2       0
2        4.7        3.2        1.3        0.2       0
3        4.6        3.1        1.5        0.2       0
4        5.0        3.6        1.4        0.2       0
['setosa' 'versicolor' 'virginica']</code></pre>
<p>The returned object (a "Bunch", basically a dictionary) also has <code>.data</code> (features only), <code>.target</code> (labels only), <code>.feature_names</code> and <code>.DESCR</code> (a long description of the dataset). We renamed the columns to short names because the originals, like "sepal length (cm)", are long and contain spaces.</p>

<h3>Inspecting a new dataset: your first five minutes</h3>
<p>Whenever you meet a dataset, run the same handful of checks before anything else. They answer: How big is it? What types are the columns? Are values missing? What ranges do the numbers have? Is the target balanced?</p>
<ul>
<li><code>df.shape</code> — number of rows and columns.</li>
<li><code>df.head(n)</code> / <code>df.tail(n)</code> / <code>df.sample(n)</code> — look at actual rows. Never skip looking at raw rows.</li>
<li><code>df.info()</code> — column names, non-null counts (missing values show up as smaller counts), dtypes and memory.</li>
<li><code>df.describe()</code> — count, mean, std, min, quartiles and max for numeric columns.</li>
<li><code>df["col"].value_counts()</code> — how often each distinct value appears; essential for categorical columns and for the target.</li>
<li><code>df.isna().sum()</code> — missing values per column (more on this in the cleaning lesson).</li>
</ul>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
df.info()
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">&lt;class 'pandas.DataFrame'&gt;
RangeIndex: 150 entries, 0 to 149
Data columns (total 5 columns):
 #   Column     Non-Null Count  Dtype
---  ------     --------------  -----
 0   sepal_len  150 non-null    float64
 1   sepal_wid  150 non-null    float64
 2   petal_len  150 non-null    float64
 3   petal_wid  150 non-null    float64
 4   target     150 non-null    int64
dtypes: float64(4), int64(1)
memory usage: 6.0 KB</code></pre>
<p><code>info()</code> prints directly rather than returning a value. Every column shows 150 non-null values, so the iris data has no missing values. Now the statistical summary:</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
print(df.describe().round(2))
print(df["target"].value_counts())
print(df["target"].value_counts(normalize=True).round(3))   # as fractions
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">       sepal_len  sepal_wid  petal_len  petal_wid  target
count     150.00     150.00     150.00     150.00  150.00
mean        5.84       3.06       3.76       1.20    1.00
std         0.83       0.44       1.77       0.76    0.82
min         4.30       2.00       1.00       0.10    0.00
25%         5.10       2.80       1.60       0.30    0.00
50%         5.80       3.00       4.35       1.30    1.00
75%         6.40       3.30       5.10       1.80    2.00
max         7.90       4.40       6.90       2.50    2.00
target
0    50
1    50
2    50
Name: count, dtype: int64
target
0    0.333
1    0.333
2    0.333
Name: proportion, dtype: float64</code></pre>

<h4>Reading describe() like a data scientist</h4>
<ul>
<li><strong>count</strong> below the number of rows means missing values.</li>
<li><strong>mean vs 50% (median)</strong>: if the mean is much larger than the median, the column is <em>right-skewed</em> (a few very large values pull the mean up — typical for incomes and prices).</li>
<li><strong>min/max</strong>: impossible values (negative ages, a 900-year-old customer) reveal data errors.</li>
<li><strong>std</strong>: columns with wildly different spreads (petal width ~0.76, but in other datasets income ~20,000) are a sign you will need to scale features.</li>
</ul>
<p>Here, <code>value_counts</code> shows exactly 50 flowers per class: a perfectly <em>balanced</em> target. Many real problems are imbalanced (e.g. 1% fraud), which changes how you must evaluate a model — you will learn why in the ML track.</p>

<div class="callout warn"><strong>Common mistake:</strong> writing <code>df.shape()</code> or <code>df.columns()</code>. These are <em>attributes</em>, not methods — no parentheses. In contrast <code>head()</code>, <code>info()</code> and <code>describe()</code> are methods and need them. If you see <em>"'tuple' object is not callable"</em>, you probably wrote <code>shape()</code>.</div>

<h3>The index, briefly</h3>
<p>Every DataFrame has an index labelling its rows. By default it is 0, 1, 2…, but you can promote a meaningful column with <code>set_index</code> and go back with <code>reset_index</code>. The index matters because pandas <em>aligns</em> operations on it: when you add two Series, values are matched by label, not by position.</p>
<pre><code class="lang-python runnable">import pandas as pd

a = pd.Series([1, 2, 3], index=["x", "y", "z"])
b = pd.Series([10, 20, 30], index=["z", "y", "x"])
print(a + b)            # matched by label: x=1+30, y=2+20, z=3+10

people = pd.DataFrame({"id": [7, 9], "score": [88, 92]}).set_index("id")
print(people)
print(people.loc[9])    # look up row by its index label
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">x    31
y    22
z    13
dtype: int64
    score
id
7      88
9      92
score    92
Name: 9, dtype: int64</code></pre>
<p>Alignment is a safety feature (you can't accidentally add the wrong rows together) but also a source of surprise: if labels don't match you get <code>NaN</code> for the unmatched ones. Keep this in mind when combining data.</p>

<div class="callout book"><strong>Further study:</strong> Wes McKinney's <em>Python for Data Analysis</em> (3rd ed.), Ch. 5 "Getting Started with pandas", covers Series, DataFrame and index objects in depth.</div>
`,
          keyPoints: [
            "A Series is a labelled 1-D column; a DataFrame is a table of Series sharing one index.",
            "Create DataFrames from a dict of equal-length lists; load files with pd.read_csv (parse_dates for dates).",
            "sklearn's load_iris, load_wine, load_breast_cancer and load_diabetes with as_frame=True give offline pandas datasets.",
            "First checks on any dataset: shape, head, info, describe, value_counts, isna().sum().",
            "Operations between Series align on index labels, not positions; unmatched labels become NaN."
          ],
          exercise: {
            prompt: String.raw`<p>Load the wine dataset with <code>load_wine(as_frame=True)</code>. Print (1) its shape, (2) how many samples belong to each class, (3) the mean and max of the <code>alcohol</code> column, and (4) the names of the three columns with the largest standard deviation. Based on (4), would you expect scaling to matter for this dataset?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_wine

wine = load_wine(as_frame=True)
df = wine.frame
print(df.shape)
print(df["target"].value_counts().sort_index())
print(round(df["alcohol"].mean(), 2), df["alcohol"].max())
stds = df.drop(columns="target").std().sort_values(ascending=False)
print(stds.head(3).round(2))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(178, 14)
target
0    59
1    71
2    48
Name: count, dtype: int64
13.0 14.83
proline              314.91
magnesium             14.28
alcalinity_of_ash      3.34
dtype: float64</code></pre>
<p>The dataset has 178 rows and 14 columns (13 features plus target), with classes of 59, 71 and 48 samples — slightly imbalanced. The <code>proline</code> column has a standard deviation in the hundreds while others are below 1, so yes: any distance-based or gradient-based model would be dominated by proline unless the features are standardized.</p>`
          },
          quiz: [
            { q: "What is the relationship between a DataFrame and a Series?", options: ["They are unrelated", "Each column of a DataFrame is a Series and all columns share the DataFrame's index", "A Series is a list of DataFrames", "A DataFrame can only hold one Series"], answer: 1, explain: "A DataFrame is a collection of Series (columns) aligned on a common row index." },
            { q: "In df.describe(), the mean of 'income' is 95,000 but the 50% value is 52,000. What does this suggest?", options: ["The column has missing values", "The distribution is right-skewed by a few very large values", "The data is perfectly symmetric", "The column is categorical"], answer: 1, explain: "A mean far above the median means large outliers pull the average up — a right-skewed distribution." },
            { q: "How do you see how many rows belong to each class in df['target']?", options: ["df['target'].describe()", "df['target'].value_counts()", "df.shape", "df['target'].sum()"], answer: 1, explain: "value_counts counts each distinct value; normalize=True gives fractions." },
            { q: "s1 has index ['a','b'] and s2 has index ['b','c']. What does s1 + s2 contain?", options: ["Two values added by position", "a: NaN, b: sum, c: NaN", "An error", "Only b"], answer: 1, explain: "Pandas aligns on labels; only 'b' exists in both, so 'a' and 'c' get NaN." }
          ],
          furtherReading: [ { title: "pandas: 10 minutes to pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html" } ]
        },
        {
          id: "pyai-pandas-select",
          title: "Selecting, Filtering, Creating Columns and Sorting",
          minutes: 50,
          objectives: [
            "Select columns, rows and cells with [], .loc (labels) and .iloc (positions)",
            "Filter rows with boolean conditions, isin and between",
            "Create and transform columns with vectorized math, np.where, map and apply",
            "Sort data and avoid the chained-assignment pitfall"
          ],
          body: String.raw`
<p>Once data is loaded, most of your time goes into asking questions of it: "show me customers from Pune who spent over 100", "add a column with the total price", "which products sell best?". This lesson teaches the selection and transformation tools that make those one-liners.</p>

<h3>Selecting columns</h3>
<p>Square brackets with one name return a Series; with a <em>list</em> of names they return a DataFrame. That double bracket <code>df[["a", "b"]]</code> is just a list inside the indexing brackets.</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({
    "name": ["Asha", "Ben", "Chen", "Dana", "Eli"],
    "city": ["Pune", "Leeds", "Pune", "Austin", "Leeds"],
    "age": [28, 35, 42, 23, 51],
    "spend": [120.5, 80.0, 310.2, 45.9, 150.0],
})
print(type(df["age"]).__name__)        # Series
print(df[["name", "spend"]])           # DataFrame with two columns
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Series
   name  spend
0  Asha  120.5
1   Ben   80.0
2  Chen  310.2
3  Dana   45.9
4   Eli  150.0</code></pre>

<h3>.loc and .iloc: two ways to address rows</h3>
<p>This is the single most important distinction in pandas:</p>
<ul>
<li><code>.loc[rows, columns]</code> selects by <strong>label</strong> — index labels and column names. Slices with <code>.loc</code> <em>include</em> the end label.</li>
<li><code>.iloc[rows, columns]</code> selects by <strong>integer position</strong>, exactly like NumPy. Slices <em>exclude</em> the end, as in Python.</li>
</ul>
<div class="callout info"><strong>Memory aid:</strong> <code>iloc</code> = "integer location". <code>loc</code> = "label location". With the default 0,1,2… index the labels look like positions, which hides the difference — until you sort or filter and the labels no longer match positions.</div>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({
    "name": ["Asha", "Ben", "Chen", "Dana", "Eli"],
    "city": ["Pune", "Leeds", "Pune", "Austin", "Leeds"],
    "age": [28, 35, 42, 23, 51],
    "spend": [120.5, 80.0, 310.2, 45.9, 150.0],
}).set_index("name")

print(df.loc["Chen"])                       # one row by label -&gt; Series
print(df.loc["Ben":"Dana", ["age"]])        # label slice INCLUDES Dana
print(df.iloc[0:2])                         # first two rows by position (2 excluded)
print(df.iloc[-1, 2])                       # last row, third column -&gt; a single value
print(df.loc["Asha", "spend"])              # single cell by labels
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">city      Pune
age         42
spend    310.2
Name: Chen, dtype: object
      age
name
Ben    35
Chen   42
Dana   23
       city  age  spend
name
Asha   Pune   28  120.5
Ben   Leeds   35   80.0
150.0
120.5</code></pre>

<h3>Filtering rows with conditions</h3>
<p>Exactly as in NumPy, a comparison on a column produces a boolean Series, and indexing with it keeps the True rows. Combine conditions with <code>&amp;</code>, <code>|</code>, <code>~</code> and parentheses.</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({
    "name": ["Asha", "Ben", "Chen", "Dana", "Eli"],
    "city": ["Pune", "Leeds", "Pune", "Austin", "Leeds"],
    "age": [28, 35, 42, 23, 51],
    "spend": [120.5, 80.0, 310.2, 45.9, 150.0],
})
print(df[df["spend"] &gt; 100])
print(df[(df["city"] == "Pune") &amp; (df["age"] &gt; 30)])
print(df[df["city"].isin(["Leeds", "Austin"])]["name"].tolist())
print(df[df["age"].between(25, 45)]["name"].tolist())    # inclusive on both ends
print(df.loc[df["spend"] &gt; 100, ["name", "spend"]])     # filter rows AND pick columns
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   name   city  age  spend
0  Asha   Pune   28  120.5
2  Chen   Pune   42  310.2
4   Eli  Leeds   51  150.0
   name  city  age  spend
2  Chen  Pune   42  310.2
['Ben', 'Dana', 'Eli']
['Asha', 'Ben', 'Chen']
   name  spend
0  Asha  120.5
2  Chen  310.2
4   Eli  150.0</code></pre>
<p>The last form — <code>df.loc[condition, columns]</code> — is the recommended way to filter and select at once, and, as you'll see below, the right way to <em>assign</em> to a filtered subset.</p>

<h3>Creating new columns</h3>
<p>Assigning to a new column name creates it. Use vectorized expressions on existing columns — never loop over rows.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
pd.set_option("display.width", 120)         # print wide tables without "..." truncation
pd.set_option("display.max_columns", None)

orders = pd.DataFrame({
    "product": ["Keyboard", "Mouse", "Monitor", "Mouse"],
    "quantity": [1, 2, 1, 3],
    "unit_price": [45.0, 19.99, 189.0, 19.99],
})
orders["total"] = orders["quantity"] * orders["unit_price"]
orders["big_order"] = orders["total"] &gt; 50                       # boolean column
orders["size"] = np.where(orders["quantity"] &gt; 1, "multi", "single")
orders["category"] = orders["product"].map({"Keyboard": "input", "Mouse": "input", "Monitor": "display"})
orders["product_upper"] = orders["product"].str.upper()         # string methods via .str
print(orders)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">    product  quantity  unit_price   total  big_order    size category product_upper
0  Keyboard         1       45.00   45.00      False  single    input      KEYBOARD
1     Mouse         2       19.99   39.98      False   multi    input         MOUSE
2   Monitor         1      189.00  189.00       True  single  display       MONITOR
3     Mouse         3       19.99   59.97       True   multi    input         MOUSE</code></pre>
<ul>
<li><code>np.where(cond, a, b)</code> — two-way choice per row.</li>
<li><code>.map(dict)</code> — replace each value using a lookup table (values not in the dict become NaN).</li>
<li><code>.str</code> — vectorized string methods: <code>.str.lower()</code>, <code>.str.contains("x")</code>, <code>.str.len()</code>, <code>.str.split()</code>.</li>
<li><code>df.assign(new=...)</code> — returns a new DataFrame with added columns; handy for chaining.</li>
</ul>
<p>The two <code>pd.set_option</code> lines only affect printing: by default (outside a terminal) pandas hides middle columns behind "..." when a table is wider than 80 characters.</p>

<h3>apply: custom logic, used sparingly</h3>
<p><code>.apply(func)</code> calls a Python function on every element of a Series (or every row/column of a DataFrame with <code>axis=1</code>/<code>axis=0</code>). It is flexible but runs a Python loop internally, so it is much slower than vectorized code. Use it when the logic genuinely can't be expressed with vectorized operations.</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({"age": [15, 28, 42, 67], "income": [0, 30_000, 85_000, 20_000]})

def life_stage(age):
    if age &lt; 18:
        return "minor"
    elif age &lt; 65:
        return "adult"
    return "senior"

df["stage"] = df["age"].apply(life_stage)                       # element-wise
df["income_per_year_of_age"] = df.apply(lambda row: row["income"] / row["age"], axis=1).round(1)
df["age_group"] = pd.cut(df["age"], bins=[0, 18, 65, 120], labels=["minor", "adult", "senior"], right=False)
print(df)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   age  income   stage  income_per_year_of_age age_group
0   15       0   minor                     0.0     minor
1   28   30000   adult                  1071.4     adult
2   42   85000   adult                  2023.8     adult
3   67   20000  senior                   298.5    senior</code></pre>
<p>The row-wise <code>apply</code> above could simply be <code>df["income"] / df["age"]</code> — always prefer that. And <code>pd.cut</code> does the binning of <code>life_stage</code> in a vectorized way, with <code>right=False</code> meaning each bin includes its left edge (so 18 counts as adult).</p>

<h3>Sorting</h3>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({
    "name": ["Asha", "Ben", "Chen", "Dana", "Eli"],
    "city": ["Pune", "Leeds", "Pune", "Austin", "Leeds"],
    "spend": [120.5, 80.0, 310.2, 45.9, 150.0],
})
print(df.sort_values("spend", ascending=False).head(3))
print(df.sort_values(["city", "spend"], ascending=[True, False]))
print(df.nlargest(2, "spend")["name"].tolist())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   name   city  spend
2  Chen   Pune  310.2
4   Eli  Leeds  150.0
0  Asha   Pune  120.5
   name    city  spend
3  Dana  Austin   45.9
4   Eli   Leeds  150.0
1   Ben   Leeds   80.0
2  Chen    Pune  310.2
0  Asha    Pune  120.5
['Chen', 'Eli']</code></pre>
<p>Notice the index labels travel with their rows after sorting (e.g. Chen keeps label 2). This is exactly when <code>.loc</code> and <code>.iloc</code> start giving different answers: after sorting, <code>.iloc[0]</code> is the top row, while <code>.loc[0]</code> is still Asha. Call <code>.reset_index(drop=True)</code> if you want fresh 0,1,2… labels.</p>

<h3>The chained-assignment pitfall (and Copy-on-Write)</h3>
<p>A very common beginner pattern is to filter and then assign in two steps:</p>
<pre><code class="lang-python">df[df["city"] == "Pune"]["spend"] = 0     # DON'T: chained assignment
</code></pre>
<p>This is <em>chained assignment</em>: the first <code>[...]</code> produces a new temporary DataFrame and the second <code>[...] =</code> modifies that temporary, which is then thrown away. In older pandas this sometimes worked and sometimes didn't, with the notorious <em>SettingWithCopyWarning</em>. In pandas 3.0 the behaviour is now consistent thanks to <strong>Copy-on-Write</strong>: any object you derive from a DataFrame behaves as an independent copy, so chained assignment <em>never</em> changes the original (pandas emits a <em>ChainedAssignmentError</em> warning). The fix is always one <code>.loc</code> call with both the row condition and the column:</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({"city": ["Pune", "Leeds", "Pune"], "spend": [120.5, 80.0, 310.2]})

df[df["city"] == "Pune"]["spend"] = 0           # chained: modifies a temporary copy
print("after chained assignment:", df["spend"].tolist())

df.loc[df["city"] == "Pune", "spend"] = 0       # correct: one .loc call
print("after .loc assignment:  ", df["spend"].tolist())

subset = df[df["city"] == "Leeds"].copy()       # explicitly independent subset
subset["spend"] = subset["spend"] * 2
print("original untouched:", df["spend"].tolist(), "subset:", subset["spend"].tolist())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">after chained assignment: [120.5, 80.0, 310.2]
after .loc assignment:   [0.0, 80.0, 0.0]
original untouched: [0.0, 80.0, 0.0] subset: [160.0]</code></pre>
<div class="callout warn"><strong>Rule:</strong> to change values in place, use <code>df.loc[row_condition, "column"] = value</code>. To work on a subset separately, take it with <code>.copy()</code> (still good practice for clarity, even though Copy-on-Write makes it safe). Never write <code>df[...][...] = value</code>.</div>
`,
          keyPoints: [
            "df['col'] gives a Series; df[['a','b']] gives a DataFrame.",
            ".loc selects by labels (slice end included); .iloc selects by integer positions (slice end excluded).",
            "Filter with boolean Series, combined with &, |, ~ and parentheses; isin and between are handy shortcuts.",
            "Create columns with vectorized expressions, np.where, map, .str methods and pd.cut; use apply only when nothing vectorized fits.",
            "Assign to a subset with df.loc[condition, 'col'] = value; chained assignment df[...][...] = value never modifies df in pandas 3."
          ],
          exercise: {
            prompt: String.raw`<p>Using the iris dataset (rename columns to <code>sepal_len, sepal_wid, petal_len, petal_wid, target</code>): (1) add a column <code>species</code> mapping 0/1/2 to "setosa"/"versicolor"/"virginica"; (2) add <code>petal_area = petal_len * petal_wid</code>; (3) show the 3 flowers with the largest petal area (only species and petal_area columns); (4) count how many flowers have petal_len over 5 <em>and</em> sepal_wid under 3; (5) using <code>.loc</code>, set petal_area to 0 for every setosa, then print the overall mean petal_area.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
df["species"] = df["target"].map({0: "setosa", 1: "versicolor", 2: "virginica"})
df["petal_area"] = df["petal_len"] * df["petal_wid"]
print(df.nlargest(3, "petal_area")[["species", "petal_area"]])
print(((df["petal_len"] &gt; 5) &amp; (df["sepal_wid"] &lt; 3)).sum())
df.loc[df["species"] == "setosa", "petal_area"] = 0
print(round(df["petal_area"].mean(), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">       species  petal_area
118  virginica       15.87
109  virginica       15.25
100  virginica       15.00
15
5.672</code></pre>
<p>Part (4) sums a boolean Series directly — True counts as 1 — so there is no need to filter and take <code>len()</code>. Part (5) uses a single <code>.loc</code> with a row condition and a column name, which is the only reliable way to modify a subset in place.</p>`
          },
          quiz: [
            { q: "df has the default index 0..9. After df2 = df.sort_values('price'), what does df2.iloc[0] return?", options: ["The row whose label is 0", "The row with the lowest price (first position)", "An error", "The first column"], answer: 1, explain: "iloc uses positions. After sorting, position 0 holds the cheapest row, whose label may be anything. df2.loc[0] would return the row labelled 0." },
            { q: "Which statement reliably sets 'status' to 'vip' for rows where spend > 1000?", options: ["df[df['spend'] > 1000]['status'] = 'vip'", "df.loc[df['spend'] > 1000, 'status'] = 'vip'", "df['status'][df['spend'] > 1000] == 'vip'", "df.iloc[df['spend'] > 1000] = 'vip'"], answer: 1, explain: "A single .loc call with row condition and column modifies df. The chained version modifies a temporary copy and has no effect in pandas 3." },
            { q: "What does df.loc['b':'d'] return for an index ['a','b','c','d','e']?", options: ["Rows b and c", "Rows b, c and d", "Rows c and d", "An error"], answer: 1, explain: "Label-based slices with .loc include the end label." },
            { q: "Why is df['a'] / df['b'] preferred over df.apply(lambda r: r['a'] / r['b'], axis=1)?", options: ["They give different answers", "The vectorized version is much faster because it avoids a Python-level loop", "apply cannot divide", "apply changes the original DataFrame"], answer: 1, explain: "Both give the same result, but apply with axis=1 calls a Python function per row; the vectorized expression runs in compiled code." }
          ]
        },
        {
          id: "pyai-pandas-clean",
          title: "Cleaning Data: Missing Values, Types, Duplicates and Dates",
          minutes: 50,
          objectives: [
            "Detect missing values and choose between dropping and filling them",
            "Fix wrong dtypes, stray text and duplicates",
            "Parse dates and extract useful date features with the .dt accessor",
            "Explain why imputation statistics must come from training data only"
          ],
          body: String.raw`
<p>Real-world data is dirty. Sensors drop readings, people skip form fields, someone types "N/A" into a number column, a bug sends the same order twice. Data scientists often say that 60–80% of a project is cleaning. Models can't learn from garbage — most scikit-learn models refuse to run at all if there are missing values — so cleaning is not optional. This lesson walks through the common problems one at a time on a deliberately messy dataset.</p>

<h3>A messy dataset</h3>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

raw = pd.DataFrame({
    "customer": ["Asha", "Ben", "Chen", "Dana", "Ben", "Eli"],
    "age": [28, np.nan, 42, 23, np.nan, 51],
    "city": ["Pune", "Leeds", None, "Austin", "Leeds", "Pune"],
    "income": ["52000", "61000", "48000", "unknown", "61000", "75000"],
    "signup": ["2023-01-15", "2023-03-02", "2023-03-20", "2023-07-04", "2023-03-02", "2024-02-29"],
})
print(raw)
print(raw.dtypes)
print(raw.isna().sum())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  customer   age    city   income      signup
0     Asha  28.0    Pune    52000  2023-01-15
1      Ben   NaN   Leeds    61000  2023-03-02
2     Chen  42.0     NaN    48000  2023-03-20
3     Dana  23.0  Austin  unknown  2023-07-04
4      Ben   NaN   Leeds    61000  2023-03-02
5      Eli  51.0    Pune    75000  2024-02-29
customer        str
age         float64
city            str
income          str
signup          str
dtype: object
customer    0
age         2
city        1
income      0
signup      0
dtype: int64</code></pre>
<p>Problems we can see: two missing ages (shown as <code>NaN</code>, "not a number", pandas' marker for missing), a missing city, an <code>income</code> column stored as text because of the word "unknown", dates stored as text, and Ben appearing twice. Let's fix each.</p>

<h3>Missing values: detect, then decide</h3>
<p><code>isna()</code> returns True where a value is missing (<code>notna()</code> is the opposite); <code>.sum()</code> counts per column; <code>.mean()</code> gives the fraction missing. There are two broad strategies:</p>
<ol>
<li><strong>Drop</strong> rows (or columns) with missing values: <code>dropna()</code>. Simple, but you lose data, and if the missingness is not random you may bias your dataset (e.g. if older customers skip the age question, dropping them makes your data look younger).</li>
<li><strong>Fill (impute)</strong>: replace missing values with a sensible guess using <code>fillna()</code> — the median for numeric columns (robust to outliers), the most frequent value or an explicit "Unknown" category for text columns.</li>
</ol>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

df = pd.DataFrame({"age": [28, np.nan, 42, 23, np.nan, 51],
                   "city": ["Pune", "Leeds", None, "Austin", "Leeds", "Pune"]})

print(len(df.dropna()), "rows survive dropna()")        # any missing -&gt; dropped
print(len(df.dropna(subset=["city"])), "rows survive dropna(subset=['city'])")

filled = df.copy()
filled["age_was_missing"] = filled["age"].isna()           # keep the information!
filled["age"] = filled["age"].fillna(filled["age"].median())
filled["city"] = filled["city"].fillna("Unknown")
print(filled)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">3 rows survive dropna()
5 rows survive dropna(subset=['city'])
    age     city  age_was_missing
0  28.0     Pune            False
1  35.0    Leeds             True
2  42.0  Unknown            False
3  23.0   Austin            False
4  35.0    Leeds             True
5  51.0     Pune            False</code></pre>
<p>Notice the extra <code>age_was_missing</code> column. The fact that a value was missing is often itself informative (people who hide their income may behave differently), so keeping a "missing indicator" lets a model use that signal.</p>

<div class="callout warn"><strong>Common mistake — data leakage in imputation:</strong> in a real ML pipeline you must compute the median (or mean) on the <em>training</em> data only and then use that same number to fill the test data. Computing it on the full dataset lets information from the test set leak into training and makes your evaluation look better than reality. scikit-learn's <code>SimpleImputer</code> inside a <code>Pipeline</code> handles this automatically — you'll use it in the ML track.</div>

<h3>Fixing types: text that should be numbers</h3>
<p>A single bad entry like "unknown" forces a whole column to be text, and then <code>.mean()</code> fails or <code>"52000" + "61000"</code> concatenates strings. <code>pd.to_numeric(..., errors="coerce")</code> converts what it can and turns the rest into NaN, which you then handle as missing values.</p>
<pre><code class="lang-python runnable">import pandas as pd

income = pd.Series(["52000", "61000", "48000", "unknown", " 75000 ", "1,200"])
print(pd.to_numeric(income, errors="coerce").tolist())

cleaned = income.str.strip().str.replace(",", "")          # tidy the text first
as_number = pd.to_numeric(cleaned, errors="coerce")
print(as_number.tolist())
print("mean income:", as_number.mean())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[52000.0, 61000.0, 48000.0, nan, 75000.0, nan]
[52000.0, 61000.0, 48000.0, nan, 75000.0, 1200.0]
mean income: 47440.0</code></pre>
<p>Cleaning the text first (stripping spaces, removing thousands separators) rescues values that a blind conversion would have lost. Always look at the values that became NaN — they may reveal another formatting pattern to fix.</p>

<h3>Duplicates</h3>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({"customer": ["Asha", "Ben", "Chen", "Ben"],
                   "signup": ["2023-01-15", "2023-03-02", "2023-03-20", "2023-03-02"]})
print(df.duplicated().tolist())              # True for repeats of an earlier row
print(df.drop_duplicates())
print(df.drop_duplicates(subset=["customer"], keep="last"))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[False, False, False, True]
  customer      signup
0     Asha  2023-01-15
1      Ben  2023-03-02
2     Chen  2023-03-20
  customer      signup
0     Asha  2023-01-15
2     Chen  2023-03-20
3      Ben  2023-03-02</code></pre>
<p>Duplicates are dangerous in ML because the same example might land in both the training and test sets — the model then "recognizes" test rows it has already seen, inflating scores.</p>

<h3>Dates: parsing and extracting features</h3>
<p>Dates stored as text can't be compared or subtracted properly. <code>pd.to_datetime</code> converts them to the <code>datetime64</code> dtype, and the <code>.dt</code> accessor then exposes parts of the date. Models can't use a raw date directly, but they can use features derived from it: year, month, day of week, "is weekend", or "days since signup".</p>
<pre><code class="lang-python runnable">import pandas as pd

df = pd.DataFrame({"signup": ["2023-01-15", "2023-03-02", "2023-07-04", "2024-02-29"]})
df["signup"] = pd.to_datetime(df["signup"])
df["year"] = df["signup"].dt.year
df["month"] = df["signup"].dt.month
df["weekday"] = df["signup"].dt.day_name()
df["is_weekend"] = df["signup"].dt.dayofweek &gt;= 5          # Monday=0 ... Sunday=6
reference = pd.Timestamp("2024-06-01")
df["days_since_signup"] = (reference - df["signup"]).dt.days
print(df)
print(df["signup"].min(), "to", df["signup"].max())
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">      signup  year  month   weekday  is_weekend  days_since_signup
0 2023-01-15  2023      1    Sunday        True                503
1 2023-03-02  2023      3  Thursday       False                457
2 2023-07-04  2023      7   Tuesday       False                333
3 2024-02-29  2024      2  Thursday       False                 93
2023-01-15 00:00:00 to 2024-02-29 00:00:00</code></pre>
<p>Subtracting two datetimes gives a <em>Timedelta</em> (a duration); <code>.dt.days</code> turns it into a plain number of days. Bad dates can be handled like bad numbers with <code>pd.to_datetime(col, errors="coerce")</code>, which yields <code>NaT</code> ("not a time") for unparseable strings.</p>

<div class="callout tip"><strong>Tip:</strong> when you filter by date, compare against a string or Timestamp: <code>df[df["signup"] &gt;= "2023-03-01"]</code> works once the column is datetime. For time-series data, a date index enables resampling (<code>df.resample("ME").sum()</code> for monthly totals).</div>

<h3>Putting it all together</h3>
<p>Here is the whole cleaning pipeline for the messy dataset as one reusable function. Wrapping cleaning in a function means you can re-run it identically on new data — the first step toward a production pipeline.</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

def clean(raw: pd.DataFrame) -&gt; pd.DataFrame:
    df = raw.drop_duplicates().copy()
    df["income"] = pd.to_numeric(df["income"], errors="coerce")
    df["signup"] = pd.to_datetime(df["signup"], errors="coerce")
    for col in ["age", "income"]:
        df[col + "_missing"] = df[col].isna()
        df[col] = df[col].fillna(df[col].median())
    df["city"] = df["city"].fillna("Unknown")
    df["signup_month"] = df["signup"].dt.month
    return df.reset_index(drop=True)

pd.set_option("display.width", 120)
pd.set_option("display.max_columns", None)
raw = pd.DataFrame({
    "customer": ["Asha", "Ben", "Chen", "Dana", "Ben", "Eli"],
    "age": [28, np.nan, 42, 23, np.nan, 51],
    "city": ["Pune", "Leeds", None, "Austin", "Leeds", "Pune"],
    "income": ["52000", "61000", "48000", "unknown", "61000", "75000"],
    "signup": ["2023-01-15", "2023-03-02", "2023-03-20", "2023-07-04", "2023-03-02", "2024-02-29"],
})
tidy = clean(raw)
print(tidy)
print("missing values left:", int(tidy.isna().sum().sum()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  customer   age     city   income     signup  age_missing  income_missing  signup_month
0     Asha  28.0     Pune  52000.0 2023-01-15        False           False             1
1      Ben  35.0    Leeds  61000.0 2023-03-02         True           False             3
2     Chen  42.0  Unknown  48000.0 2023-03-20        False           False             3
3     Dana  23.0   Austin  56500.0 2023-07-04        False            True             7
4      Eli  51.0     Pune  75000.0 2024-02-29        False           False             2
missing values left: 0</code></pre>
<div class="callout book"><strong>Further study:</strong> <em>Python for Data Analysis</em> (3rd ed.), Ch. 7 "Data Cleaning and Preparation" and Ch. 11 "Time Series".</div>
`,
          keyPoints: [
            "Count missing values with df.isna().sum(); decide per column whether to drop or fill.",
            "Fill numeric gaps with the median, text gaps with the mode or 'Unknown', and consider adding a was-missing indicator column.",
            "Compute imputation statistics on training data only to avoid leakage.",
            "pd.to_numeric(errors='coerce') and pd.to_datetime(errors='coerce') convert what they can and mark the rest as missing.",
            "Remove duplicates with drop_duplicates; derive date features with the .dt accessor."
          ],
          exercise: {
            prompt: String.raw`<p>Clean this sensor log: <code>{"time": ["2024-05-01 08:00", "2024-05-01 09:00", "bad", "2024-05-01 11:00", "2024-05-01 11:00"], "temp": ["21.5", "22.1", "23.0", "n/a", "n/a"]}</code>. Steps: drop exact duplicates, convert both columns (coercing errors), drop rows whose time is missing, fill missing temperatures with the column mean, and add an <code>hour</code> column. Print the result and its dtypes.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd

log = pd.DataFrame({"time": ["2024-05-01 08:00", "2024-05-01 09:00", "bad", "2024-05-01 11:00", "2024-05-01 11:00"],
                    "temp": ["21.5", "22.1", "23.0", "n/a", "n/a"]})
log = log.drop_duplicates()
log["time"] = pd.to_datetime(log["time"], errors="coerce")
log["temp"] = pd.to_numeric(log["temp"], errors="coerce")
log = log.dropna(subset=["time"])
log["temp"] = log["temp"].fillna(log["temp"].mean())
log["hour"] = log["time"].dt.hour
print(log)
print(log.dtypes)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">                 time  temp  hour
0 2024-05-01 08:00:00  21.5     8
1 2024-05-01 09:00:00  22.1     9
3 2024-05-01 11:00:00  21.8    11
time    datetime64[us]
temp           float64
hour             int32
dtype: object</code></pre>
<p>Order matters: dropping duplicates first prevents the repeated 11:00 row from being counted twice; dropping the bad-time row <em>before</em> computing the mean means the mean uses only the rows we keep (21.5 and 22.1, giving 21.8).</p>`
          },
          quiz: [
            { q: "Why is the median often preferred over the mean for filling missing numeric values?", options: ["It is always larger", "It is robust to outliers, so a few extreme values don't distort the fill value", "pandas cannot compute the mean of a column with NaN", "The median is faster"], answer: 1, explain: "Extreme values pull the mean but barely move the median, making it a safer default for skewed data like income." },
            { q: "What does pd.to_numeric(s, errors='coerce') do with the value 'unknown'?", options: ["Raises an error", "Converts it to 0", "Converts it to NaN", "Leaves it as text"], answer: 2, explain: "With errors='coerce', unparseable values become NaN so you can treat them as missing." },
            { q: "You fill missing ages with the median of the whole dataset before splitting into train and test. What is the problem?", options: ["No problem", "Data leakage: test-set information influenced the training data", "The median cannot be computed", "It creates duplicates"], answer: 1, explain: "Fill statistics should be learned from the training set only, then applied to the test set." },
            { q: "Which expression gives the day of the week (0 = Monday) for a datetime column d?", options: ["d.dayofweek", "d.dt.dayofweek", "d.str.dayofweek", "pd.dayofweek(d)"], answer: 1, explain: "Date components are accessed through the .dt accessor on datetime Series." }
          ]
        },
        {
          id: "pyai-pandas-groupby",
          title: "Grouping, Combining Tables and Building a Feature Table",
          minutes: 55,
          objectives: [
            "Summarize data by group with groupby and agg, and reshape with pivot_table",
            "Combine tables with merge (joins) and concat",
            "One-hot encode categorical columns with get_dummies",
            "Produce a clean numeric feature matrix X and target y ready for scikit-learn"
          ],
          body: String.raw`
<p>Many of the most useful questions in data analysis are about groups: average spend <em>per city</em>, number of orders <em>per customer</em>, survival rate <em>per passenger class</em>. Many datasets also arrive split across several tables — customers in one, orders in another. This lesson teaches grouping and combining, and finishes by turning raw tables into the numeric feature table that a machine-learning model needs.</p>

<h3>groupby: split, apply, combine</h3>
<p><code>groupby</code> follows a three-step pattern known as <strong>split-apply-combine</strong>:</p>
<ol>
<li><strong>Split</strong> the rows into groups by the values of one or more columns.</li>
<li><strong>Apply</strong> a function to each group — usually an aggregation like sum, mean or count.</li>
<li><strong>Combine</strong> the results into a new table with one row per group.</li>
</ol>
<div class="callout info"><strong>Analogy:</strong> a teacher collects exam papers, sorts them into piles by class (split), computes each pile's average (apply), and writes the averages in one small table (combine).</div>
<pre><code class="lang-python runnable">import pandas as pd

orders = pd.DataFrame({
    "customer": ["Asha", "Ben", "Asha", "Chen", "Ben", "Asha", "Dana"],
    "city":     ["Pune", "Leeds", "Pune", "Pune", "Leeds", "Pune", "Austin"],
    "product":  ["Mouse", "Keyboard", "Monitor", "Mouse", "Mouse", "Keyboard", "Monitor"],
    "amount":   [20.0, 45.0, 189.0, 20.0, 40.0, 45.0, 189.0],
})
print(orders.groupby("city")["amount"].sum())
print(orders.groupby("customer")["amount"].agg(["count", "sum", "mean"]))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">city
Austin    189.0
Leeds      85.0
Pune      274.0
Name: amount, dtype: float64
          count    sum        mean
customer
Asha          3  254.0   84.666667
Ben           2   85.0   42.500000
Chen          1   20.0   20.000000
Dana          1  189.0  189.000000</code></pre>
<p>The group keys become the index of the result. For more control, <em>named aggregation</em> lets you choose output column names and different functions per column, and <code>as_index=False</code> (or <code>.reset_index()</code>) keeps the key as an ordinary column:</p>
<pre><code class="lang-python runnable">import pandas as pd

orders = pd.DataFrame({
    "customer": ["Asha", "Ben", "Asha", "Chen", "Ben", "Asha", "Dana"],
    "city":     ["Pune", "Leeds", "Pune", "Pune", "Leeds", "Pune", "Austin"],
    "product":  ["Mouse", "Keyboard", "Monitor", "Mouse", "Mouse", "Keyboard", "Monitor"],
    "amount":   [20.0, 45.0, 189.0, 20.0, 40.0, 45.0, 189.0],
})
per_customer = orders.groupby("customer", as_index=False).agg(
    n_orders=("amount", "count"),
    total_spend=("amount", "sum"),
    biggest=("amount", "max"),
    n_products=("product", "nunique"),
)
print(per_customer)

# group by two columns, then spread one of them into columns
print(orders.pivot_table(index="city", columns="product", values="amount",
                         aggfunc="sum", fill_value=0))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  customer  n_orders  total_spend  biggest  n_products
0     Asha         3        254.0    189.0           3
1      Ben         2         85.0     45.0           2
2     Chen         1         20.0     20.0           1
3     Dana         1        189.0    189.0           1
product  Keyboard  Monitor  Mouse
city
Austin        0.0    189.0    0.0
Leeds        45.0      0.0   40.0
Pune         45.0    189.0   40.0</code></pre>
<p><code>pivot_table</code> is the spreadsheet "pivot table": rows are one key, columns are another key, and each cell is an aggregate. It's a quick way to see how two categorical variables interact.</p>

<h4>transform: broadcast a group statistic back to rows</h4>
<p><code>agg</code> shrinks each group to one row. Sometimes you want the group statistic attached to every original row — for example, "what fraction of this customer's total spend is this order?". That is <code>transform</code>:</p>
<pre><code class="lang-python runnable">import pandas as pd

orders = pd.DataFrame({"customer": ["Asha", "Ben", "Asha", "Ben", "Asha"],
                       "amount": [20.0, 45.0, 189.0, 40.0, 45.0]})
orders["customer_total"] = orders.groupby("customer")["amount"].transform("sum")
orders["share"] = (orders["amount"] / orders["customer_total"]).round(2)
print(orders)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  customer  amount  customer_total  share
0     Asha    20.0           254.0   0.08
1      Ben    45.0            85.0   0.53
2     Asha   189.0           254.0   0.74
3      Ben    40.0            85.0   0.47
4     Asha    45.0           254.0   0.18</code></pre>

<h3>Combining tables: merge</h3>
<p>Relational data is stored in separate tables linked by a <strong>key</strong> column (like <code>customer_id</code>). <code>pd.merge</code> (or <code>df.merge</code>) joins them, just like a SQL JOIN. The <code>how</code> argument decides what happens to rows without a match:</p>
<table>
<thead><tr><th><code>how=</code></th><th>Keeps</th></tr></thead>
<tbody>
<tr><td><code>"inner"</code> (default)</td><td>Only keys present in both tables</td></tr>
<tr><td><code>"left"</code></td><td>Every row of the left table; missing right values become NaN</td></tr>
<tr><td><code>"right"</code></td><td>Every row of the right table</td></tr>
<tr><td><code>"outer"</code></td><td>Every key from either table</td></tr>
</tbody>
</table>
<pre><code class="lang-python runnable">import pandas as pd

customers = pd.DataFrame({"customer_id": [1, 2, 3, 4],
                          "name": ["Asha", "Ben", "Chen", "Dana"],
                          "city": ["Pune", "Leeds", "Pune", "Austin"]})
orders = pd.DataFrame({"order_id": [101, 102, 103, 104, 105],
                       "customer_id": [1, 2, 1, 3, 9],      # 9 has no customer record
                       "amount": [20.0, 45.0, 189.0, 20.0, 60.0]})

print(pd.merge(orders, customers, on="customer_id"))                  # inner
left = pd.merge(customers, orders, on="customer_id", how="left")
print(left[["name", "order_id", "amount"]])                            # Dana kept, with NaN
print(len(pd.merge(orders, customers, on="customer_id", how="outer")), "rows in outer join")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   order_id  customer_id  amount  name   city
0       101            1    20.0  Asha   Pune
1       102            2    45.0   Ben  Leeds
2       103            1   189.0  Asha   Pune
3       104            3    20.0  Chen   Pune
   name  order_id  amount
0  Asha     101.0    20.0
1  Asha     103.0   189.0
2   Ben     102.0    45.0
3  Chen     104.0    20.0
4  Dana       NaN     NaN
6 rows in outer join</code></pre>
<p>The inner join dropped order 105 (unknown customer 9) and Dana (no orders). The left join from customers kept Dana with NaN for the order columns. Note also how Asha's row was <em>repeated</em> — once per matching order. That is a "one-to-many" join.</p>

<div class="callout warn"><strong>Common mistake — exploding joins:</strong> if the key is not unique on <em>both</em> sides (many-to-many), the row count multiplies. Always compare <code>len()</code> before and after a merge. You can make pandas check for you with <code>validate="many_to_one"</code>, which raises an error if the right-hand keys are not unique.</div>

<h3>Stacking tables: concat</h3>
<p><code>pd.concat</code> glues tables together. With the default <code>axis=0</code> it stacks rows (e.g. January's data on top of February's); with <code>axis=1</code> it places tables side by side, aligned on the index.</p>
<pre><code class="lang-python runnable">import pandas as pd

jan = pd.DataFrame({"day": [1, 2], "sales": [100, 120]})
feb = pd.DataFrame({"day": [1, 2], "sales": [90, 130]})
both = pd.concat([jan.assign(month="Jan"), feb.assign(month="Feb")], ignore_index=True)
print(both)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   day  sales month
0    1    100   Jan
1    2    120   Jan
2    1     90   Feb
3    2    130   Feb</code></pre>
<p><code>ignore_index=True</code> renumbers the rows 0..n-1; without it you'd have duplicate labels 0, 1, 0, 1.</p>

<h3>From table to feature matrix</h3>
<p>scikit-learn models need a numeric matrix <code>X</code> (rows = samples, columns = features) and a target <code>y</code>. Text categories like "Pune" must become numbers. The standard approach for categories without a natural order is <strong>one-hot encoding</strong>: one new 0/1 column per category. "Pune" becomes <code>city_Pune=1, city_Leeds=0, city_Austin=0</code>. We don't use 0/1/2 codes because the model would wrongly assume Austin (2) is "bigger" than Leeds (1).</p>
<pre><code class="lang-python runnable">import pandas as pd

customers = pd.DataFrame({"customer_id": [1, 2, 3, 4, 5, 6],
                          "city": ["Pune", "Leeds", "Pune", "Austin", "Leeds", "Pune"],
                          "age": [28, 35, 42, 23, 51, 33],
                          "churned": [0, 1, 0, 1, 0, 1]})
orders = pd.DataFrame({"customer_id": [1, 1, 2, 3, 3, 3, 5, 6],
                       "amount": [20.0, 189.0, 45.0, 20.0, 40.0, 45.0, 60.0, 15.0]})

# 1) aggregate orders to one row per customer
order_feats = orders.groupby("customer_id", as_index=False).agg(
    n_orders=("amount", "count"), total_spend=("amount", "sum"))
# 2) left-join so customers without orders are kept, then fill their gaps with 0
table = customers.merge(order_feats, on="customer_id", how="left", validate="one_to_one")
table[["n_orders", "total_spend"]] = table[["n_orders", "total_spend"]].fillna(0)
# 3) one-hot encode the categorical column
table = pd.get_dummies(table, columns=["city"], dtype=int)
# 4) split into features and target, dropping identifiers
X = table.drop(columns=["customer_id", "churned"])
y = table["churned"]
print(X)
print("X shape:", X.shape, "| y:", y.tolist())
print(X.to_numpy().dtype)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">   age  n_orders  total_spend  city_Austin  city_Leeds  city_Pune
0   28       2.0        209.0            0           0          1
1   35       1.0         45.0            0           1          0
2   42       3.0        105.0            0           0          1
3   23       0.0          0.0            1           0          0
4   51       1.0         60.0            0           1          0
5   33       1.0         15.0            0           0          1
X shape: (6, 6) | y: [0, 1, 0, 1, 0, 1]
float64</code></pre>
<p>Every column of <code>X</code> is now numeric, there are no missing values, the ID column (which carries no predictive meaning) has been removed, and <code>y</code> is aligned row-for-row. This table could be passed straight into <code>model.fit(X, y)</code>. Customer 4 (row 3) had no orders, so the left join produced NaN, which we filled with 0 — "no orders" genuinely means zero orders and zero spend.</p>
<div class="callout tip"><strong>Looking ahead:</strong> in the ML track you'll do steps 3–4 with scikit-learn's <code>OneHotEncoder</code> and <code>ColumnTransformer</code>, which remember the categories seen during training — important when a new city appears in production data.</div>
`,
          keyPoints: [
            "groupby follows split-apply-combine; use agg with named aggregations for clear output columns.",
            "transform returns a group statistic aligned to every original row; pivot_table cross-tabulates two keys.",
            "merge joins tables on a key (inner, left, right, outer); check row counts and use validate= to catch exploding joins.",
            "concat stacks tables; use ignore_index=True when stacking rows.",
            "A model-ready table is all numeric, has no NaNs, has categories one-hot encoded with get_dummies, and excludes ID columns."
          ],
          exercise: {
            prompt: String.raw`<p>Using the iris data (short column names, plus a <code>species</code> column from the target), compute per species: the mean and standard deviation of petal_len and the number of rows, using named aggregation. Then add a column <code>petal_len_vs_species_mean</code> that is each flower's petal_len minus its species' mean (use transform). Print the summary and the first 3 rows.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
df["species"] = df["target"].map({0: "setosa", 1: "versicolor", 2: "virginica"})

summary = df.groupby("species").agg(
    mean_petal=("petal_len", "mean"),
    std_petal=("petal_len", "std"),
    n=("petal_len", "size"),
).round(3)
print(summary)

df["petal_len_vs_species_mean"] = (
    df["petal_len"] - df.groupby("species")["petal_len"].transform("mean")
).round(3)
print(df[["species", "petal_len", "petal_len_vs_species_mean"]].head(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">            mean_petal  std_petal   n
species
setosa           1.462      0.174  50
versicolor       4.260      0.470  50
virginica        5.552      0.552  50
  species  petal_len  petal_len_vs_species_mean
0  setosa        1.4                     -0.062
1  setosa        1.4                     -0.062
2  setosa        1.3                     -0.162</code></pre>
<p>The summary shows that petal length separates the species strongly: setosa averages about 1.46 cm with very little spread, while virginica averages about 5.55 cm. <code>transform("mean")</code> returns a Series of length 150 (each flower gets its own species mean), so the subtraction lines up row by row.</p>`
          },
          quiz: [
            { q: "What does df.groupby('city')['amount'].mean() return?", options: ["The mean amount for the whole table", "A Series with one mean amount per city, indexed by city", "The original table sorted by city", "A boolean mask"], answer: 1, explain: "groupby splits by city, mean aggregates each group, and the result is indexed by the group keys." },
            { q: "You left-join customers (100 rows, unique ids) to orders where some customers have 3 orders. The result has 250 rows. Why?", options: ["A bug in pandas", "It's a one-to-many join: customers are repeated once per matching order", "Left joins always double the rows", "Missing values were added"], answer: 1, explain: "Each customer row is repeated for every matching order. Aggregate orders per customer first if you want one row per customer." },
            { q: "Why is one-hot encoding preferred to coding cities as 0, 1, 2 for most models?", options: ["It uses less memory", "Integer codes imply an order and spacing between categories that doesn't exist", "Models cannot read integers", "It removes missing values"], answer: 1, explain: "With 0/1/2 a linear model would treat city 2 as 'twice' city 1. One-hot columns avoid inventing such relationships." },
            { q: "Which is the difference between agg and transform in groupby?", options: ["No difference", "agg returns one row per group; transform returns a result aligned with every original row", "transform only works on strings", "agg modifies the DataFrame in place"], answer: 1, explain: "transform broadcasts each group's statistic back to the rows of that group, keeping the original length." }
          ]
        }
      ]
    },
    {
      id: "pyai-viz",
      title: "Visualization for Exploratory Data Analysis",
      summary: "Use matplotlib and seaborn to see distributions, outliers, relationships and group differences — and to know which plot answers which question.",
      lessons: [
        {
          id: "pyai-viz-matplotlib",
          title: "Matplotlib Fundamentals: Figures, Axes and the Core Plot Types",
          minutes: 50,
          objectives: [
            "Explain the Figure/Axes model and use the object-oriented plt.subplots interface",
            "Create line, bar, histogram, scatter and box plots",
            "Label plots properly with titles, axis labels, legends and annotations",
            "Arrange multiple plots in a grid and save figures to files"
          ],
          body: String.raw`
<p>Numbers in a table hide patterns that a picture reveals instantly. A column's mean and standard deviation can't tell you whether its values form one bell-shaped hump or two separate clusters; a scatter plot shows it at a glance. <strong>Exploratory Data Analysis (EDA)</strong> is the habit of plotting your data before you model it, and it routinely uncovers bugs, outliers and useful features. This lesson teaches <strong>matplotlib</strong>, the foundational Python plotting library; the next adds <strong>seaborn</strong>, which builds statistical plots on top of it.</p>

<h3>Figures and Axes</h3>
<p>Matplotlib's mental model has two main objects:</p>
<ul>
<li>A <strong>Figure</strong> is the whole canvas — the image file you'll save.</li>
<li>An <strong>Axes</strong> (note: not "axis") is one plot inside the figure, with its own x-axis, y-axis, title and data. A figure can contain one Axes or a grid of them.</li>
</ul>
<div class="callout info"><strong>Analogy:</strong> the Figure is a sheet of paper; each Axes is a framed chart drawn on that paper. You can draw one big chart, or divide the sheet into a 2×2 grid of four charts.</div>
<p>The recommended way to start is <code>fig, ax = plt.subplots()</code>, which returns both objects. You then call plotting methods on <code>ax</code>. (You will also see a shorter style, <code>plt.plot(...)</code>, which draws on the "current" axes. It's fine for quick scripts, but the explicit <code>ax</code> style scales better to multi-plot figures, so we use it throughout.)</p>

<div class="callout tip"><strong>About showing vs saving:</strong> in a notebook or on your desktop you would call <code>plt.show()</code> to open a window. In scripts, servers and this course's runnable examples there is no screen, so we call <code>fig.savefig("name.png")</code> to write an image file, and <code>plt.close(fig)</code> to free memory. The <code>MPLBACKEND=Agg</code> environment setting tells matplotlib to render without a display.</div>

<h3>Line plots: values that change over an ordered axis</h3>
<p>Use a line plot when the x-axis has a natural order — time, epochs of training, a range of x values for a function. In ML you'll draw line plots constantly to watch a model's loss go down during training.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib.pyplot as plt

epochs = np.arange(1, 21)
train_loss = 2.0 * np.exp(-epochs / 5) + 0.10
val_loss = 2.0 * np.exp(-epochs / 5) + 0.15 + 0.004 * (epochs - 8).clip(0) ** 2

fig, ax = plt.subplots(figsize=(7, 4))          # width, height in inches
ax.plot(epochs, train_loss, label="training loss", marker="o", markersize=3)
ax.plot(epochs, val_loss, label="validation loss", linestyle="--")
ax.set_title("Loss during training")
ax.set_xlabel("epoch")
ax.set_ylabel("loss")
ax.legend()
ax.grid(alpha=0.3)
best = val_loss.argmin()
ax.annotate("best epoch", xy=(epochs[best], val_loss[best]), xytext=(epochs[best] + 3, 1.0),
            arrowprops={"arrowstyle": "-&gt;"})
fig.tight_layout()
fig.savefig("loss_curve.png", dpi=100)
plt.close(fig)
print("best validation epoch:", epochs[best])
print("saved loss_curve.png")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best validation epoch: 12
saved loss_curve.png</code></pre>
<p>In the saved picture, training loss keeps falling while validation loss bottoms out and rises again — the visual signature of <em>overfitting</em>, which you'll study in the ML track. Every element of a good chart is here: a title, labelled axes (with units when relevant), a legend telling the lines apart, and an annotation pointing at the key fact. <code>tight_layout()</code> stops labels from being clipped.</p>

<h3>Bar charts: comparing categories</h3>
<p>Use a bar chart to compare one number across categories (sales per region, count per class). For long category names, use horizontal bars (<code>barh</code>) so labels stay readable.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import load_wine

wine = load_wine(as_frame=True)
counts = wine.frame["target"].map(dict(enumerate(wine.target_names))).value_counts().sort_index()
print(counts)

fig, ax = plt.subplots(figsize=(5, 3.5))
ax.bar(counts.index, counts.values, color=["#4f5ecb", "#2f9e63", "#d97a34"])
ax.set_title("Samples per wine class")
ax.set_ylabel("number of samples")
for i, v in enumerate(counts.values):
    ax.text(i, v + 1, str(v), ha="center")         # value label above each bar
fig.tight_layout()
fig.savefig("class_counts.png")
plt.close(fig)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">target
class_0    59
class_1    71
class_2    48
Name: count, dtype: int64</code></pre>
<p>A class-count bar chart is often the first plot in a classification project: it shows immediately whether classes are balanced.</p>

<h3>Histograms: the shape of one numeric variable</h3>
<p>A histogram splits a numeric range into equal-width <strong>bins</strong> and draws a bar for how many values fall into each. It reveals the <em>distribution</em>: where values cluster, how spread out they are, whether the shape is symmetric or skewed, and whether there are multiple peaks (often meaning hidden groups) or isolated outliers.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
symmetric = rng.normal(50, 10, 1000)               # bell-shaped
skewed = rng.exponential(scale=20, size=1000)      # long right tail, like incomes
bimodal = np.concatenate([rng.normal(30, 5, 500), rng.normal(70, 5, 500)])

fig, axes = plt.subplots(1, 3, figsize=(11, 3.2))
for ax, data, title in zip(axes, [symmetric, skewed, bimodal], ["symmetric", "right-skewed", "bimodal"]):
    ax.hist(data, bins=30, color="#4f5ecb", edgecolor="white")
    ax.axvline(data.mean(), color="#d97a34", label="mean")
    ax.axvline(np.median(data), color="#2f9e63", linestyle="--", label="median")
    ax.set_title(title)
axes[0].legend()
fig.tight_layout()
fig.savefig("histograms.png")
plt.close(fig)
for name, d in [("symmetric", symmetric), ("skewed", skewed), ("bimodal", bimodal)]:
    print(f"{name:10s} mean={d.mean():6.1f}  median={np.median(d):6.1f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">symmetric  mean=  49.5  median=  49.3
skewed     mean=  20.1  median=  13.2
bimodal    mean=  49.8  median=  49.1</code></pre>
<p>Three lessons from these numbers and pictures: in the symmetric case mean ≈ median; in the skewed case the long tail drags the mean above the median; and in the bimodal case the mean (≈50) sits in a valley where almost no data lives — a summary statistic that describes nobody. That last case is why you must <em>look</em> at distributions rather than trusting averages.</p>
<div class="callout warn"><strong>Common mistake:</strong> the number of bins changes what you see. Too few bins hide structure (the bimodal humps merge); too many make noise look like signal. Try a couple of values (e.g. 10, 30, 60) before drawing conclusions.</div>

<h3>Scatter plots: the relationship between two numeric variables</h3>
<p>A scatter plot puts one variable on each axis and draws a dot per row. It shows whether two variables move together (a <em>correlation</em>), whether the relationship is a straight line or a curve, and whether groups separate. Colouring the dots by class turns it into a quick check of how predictive two features are.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame
fig, ax = plt.subplots(figsize=(5.5, 4))
for cls, colour in zip([0, 1, 2], ["#4f5ecb", "#2f9e63", "#d97a34"]):
    part = df[df["target"] == cls]
    ax.scatter(part["petal length (cm)"], part["petal width (cm)"], s=18,
               color=colour, alpha=0.7, label=iris.target_names[cls])
ax.set_xlabel("petal length (cm)")
ax.set_ylabel("petal width (cm)")
ax.set_title("Iris: petal size by species")
ax.legend()
fig.tight_layout()
fig.savefig("iris_scatter.png")
plt.close(fig)
print("correlation:", round(df["petal length (cm)"].corr(df["petal width (cm)"]), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">correlation: 0.963</code></pre>
<p>The picture shows three clusters lying along a rising line: longer petals are also wider (correlation ≈ 0.96, where 1.0 would be a perfect straight line), and setosa sits completely apart from the other two. Just from this plot you could predict that a classifier will find setosa trivially easy. Use <code>alpha</code> (transparency) when points overlap heavily, so dense regions look darker.</p>

<h3>Box plots: comparing distributions and spotting outliers</h3>
<p>A box plot summarizes a distribution in five numbers. The box spans from the 25th percentile (Q1) to the 75th (Q3) — the middle half of the data — with a line at the median. The "whiskers" extend to the furthest points within 1.5 × the box height (the <em>interquartile range</em>, IQR); points beyond are drawn individually as potential <strong>outliers</strong>. Box plots are compact, so they're ideal for comparing one variable across several groups side by side.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(1)
groups = {"A": rng.normal(60, 8, 200), "B": rng.normal(70, 15, 200),
          "C": np.append(rng.normal(55, 5, 197), [95, 98, 102])}   # C has 3 extreme values

fig, ax = plt.subplots(figsize=(5.5, 3.5))
ax.boxplot(list(groups.values()), tick_labels=list(groups.keys()))
ax.set_ylabel("score")
ax.set_title("Score distribution by group")
fig.tight_layout()
fig.savefig("boxplots.png")
plt.close(fig)

c = groups["C"]
q1, q3 = np.percentile(c, [25, 75])
iqr = q3 - q1
outliers = c[(c &lt; q1 - 1.5 * iqr) | (c &gt; q3 + 1.5 * iqr)]
print("group C IQR:", round(iqr, 1), "| outliers found:", np.sort(outliers).round(0))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">group C IQR: 7.2 | outliers found: [ 40.  95.  98. 102.]</code></pre>
<p>The code also computes the same 1.5 × IQR outlier rule by hand, so you can see exactly what the dots above group C's whisker mean. Notice the rule flags our three planted extremes (95, 98, 102) <em>and</em> one low value (40) that is simply the natural tail of the bell curve. So an "outlier" by this rule is a <em>candidate</em> for investigation, not automatically an error: it might be a typo, a sensor glitch, or a genuinely rare and important case (fraud!).</p>

<h3>Subplots: several views in one figure</h3>
<p><code>plt.subplots(nrows, ncols)</code> returns a NumPy array of Axes. Index it like a 2-D array (<code>axes[0, 1]</code>) or flatten it with <code>axes.ravel()</code> to loop over all panels. A grid of histograms — one per feature — is a classic first EDA figure.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
features = df.columns[:4]
fig, axes = plt.subplots(2, 2, figsize=(8, 6))
print("axes array shape:", axes.shape)
for ax, col in zip(axes.ravel(), features):
    ax.hist(df[col], bins=20, color="#2f9e63", edgecolor="white")
    ax.set_title(col)
fig.suptitle("Iris feature distributions")
fig.tight_layout()
fig.savefig("iris_grid.png", dpi=120, bbox_inches="tight")
plt.close(fig)
print("saved iris_grid.png")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">axes array shape: (2, 2)
saved iris_grid.png</code></pre>
<p>In the saved image, the two petal histograms are clearly bimodal: a separate clump of small values (the setosa flowers) and a broader hump. That is a strong hint that petal measurements carry class information.</p>

<h3>Saving figures</h3>
<ul>
<li><code>fig.savefig("plot.png", dpi=150)</code> — raster image; higher dpi = sharper and larger file.</li>
<li><code>fig.savefig("plot.svg")</code> or <code>.pdf</code> — vector formats that stay crisp at any zoom; good for reports.</li>
<li><code>bbox_inches="tight"</code> trims extra whitespace around the plot.</li>
<li>Call <code>plt.close(fig)</code> after saving inside loops; otherwise memory grows and matplotlib warns about too many open figures.</li>
</ul>

<h3>Choosing the right plot</h3>
<table>
<thead><tr><th>Question</th><th>Plot</th></tr></thead>
<tbody>
<tr><td>How is one numeric variable distributed?</td><td>Histogram (or KDE)</td></tr>
<tr><td>How does a value change over time / epochs?</td><td>Line plot</td></tr>
<tr><td>How do categories compare on one number?</td><td>Bar chart</td></tr>
<tr><td>Are two numeric variables related?</td><td>Scatter plot</td></tr>
<tr><td>How does a numeric variable differ across groups? Any outliers?</td><td>Box plot (or violin)</td></tr>
<tr><td>How are many variables correlated with each other?</td><td>Correlation heatmap (next lesson)</td></tr>
</tbody>
</table>
`,
          keyPoints: [
            "A Figure is the canvas; an Axes is one plot. Start with fig, ax = plt.subplots().",
            "Line = ordered x (time, epochs); bar = categories; histogram = one distribution; scatter = relationship; box = distribution by group plus outliers.",
            "Always add a title, axis labels (with units) and a legend when there is more than one series.",
            "Bimodal histograms and mean far from median are signals you would miss by looking only at summary statistics.",
            "In scripts use fig.savefig(...) then plt.close(fig); plt.show() is for interactive sessions."
          ],
          exercise: {
            prompt: String.raw`<p>Load <code>load_diabetes(as_frame=True)</code>. Create a 1×2 figure: on the left a histogram of the <code>target</code> column (disease progression), on the right a scatter plot of <code>bmi</code> (x) against <code>target</code> (y). Label everything, save as <code>diabetes_eda.png</code>, and print the mean and median of target plus the correlation between bmi and target. What do the numbers tell you?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes

df = load_diabetes(as_frame=True).frame
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.hist(df["target"], bins=25, color="#4f5ecb", edgecolor="white")
ax1.set_title("Disease progression")
ax1.set_xlabel("target")
ax1.set_ylabel("count")
ax2.scatter(df["bmi"], df["target"], s=10, alpha=0.6, color="#d97a34")
ax2.set_title("BMI vs progression")
ax2.set_xlabel("bmi (standardized)")
ax2.set_ylabel("target")
fig.tight_layout()
fig.savefig("diabetes_eda.png")
plt.close(fig)
print("mean:", round(df["target"].mean(), 1), "median:", df["target"].median())
print("corr(bmi, target):", round(df["bmi"].corr(df["target"]), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean: 152.1 median: 140.5
corr(bmi, target): 0.586</code></pre>
<p>The mean is above the median, so the target is somewhat right-skewed (a tail of high-progression patients). A correlation of about 0.59 between BMI and progression is a fairly strong positive relationship: higher BMI tends to go with faster progression, so BMI looks like a useful predictor. (Note: the features in this dataset are already standardized, so BMI values are small numbers around 0.)</p>`
          },
          quiz: [
            { q: "In matplotlib, what is an Axes?", options: ["The x and y lines only", "A single plot area inside a Figure, with its own axes, title and data", "The whole image file", "A colour palette"], answer: 1, explain: "A Figure can contain many Axes; each Axes is one chart." },
            { q: "Which plot best shows whether a numeric feature has two separate peaks?", options: ["Bar chart", "Histogram", "Pie chart", "Line plot of the row index"], answer: 1, explain: "A histogram reveals the shape of a distribution, including multiple peaks (bimodality)." },
            { q: "In a box plot, what does the box itself span?", options: ["Minimum to maximum", "Mean plus or minus one standard deviation", "The 25th to 75th percentile (the middle half of the data)", "The outliers"], answer: 2, explain: "The box covers the interquartile range, Q1 to Q3, with a line at the median." },
            { q: "Why do runnable scripts in this course call fig.savefig instead of plt.show?", options: ["savefig is faster", "There is no display in a headless environment, so the figure is written to a file", "plt.show is deprecated", "show deletes the figure"], answer: 1, explain: "On servers and in automated runs there is no screen; saving the image is the reliable approach." }
          ]
        },
        {
          id: "pyai-viz-seaborn",
          title: "Statistical Plots with Seaborn: Seeing Patterns in Data",
          minutes: 50,
          objectives: [
            "Create seaborn plots directly from DataFrames using x, y and hue",
            "Use histplot/kdeplot, boxplot/violinplot, scatterplot, countplot and pairplot for EDA",
            "Build and interpret a correlation heatmap",
            "Explain what each plot reveals about distributions, outliers and relationships"
          ],
          body: String.raw`
<p><strong>Seaborn</strong> is a statistical plotting library built on matplotlib. Where matplotlib makes you loop over groups and pick colours by hand, seaborn takes a DataFrame and column names and does the grouping, colouring, legends and statistical summaries for you. It is the fastest way to explore a dataset visually. Because seaborn draws on matplotlib Axes, everything you learned in the previous lesson (titles, labels, savefig) still applies.</p>

<h3>The seaborn pattern: data, x, y, hue</h3>
<p>Nearly every seaborn function has the same shape:</p>
<pre><code class="lang-python">import seaborn as sns
# sns.some_plot(data=df, x="column_a", y="column_b", hue="category_column", ax=ax)
</code></pre>
<p><code>data</code> is a DataFrame; <code>x</code> and <code>y</code> are column names; <code>hue</code> is a column whose values get different colours — the single most useful argument for EDA, because it answers "does this pattern differ by class?". Passing <code>ax=</code> lets you place the plot in a matplotlib subplot grid.</p>
<p>We'll use the breast cancer dataset: 569 tumours described by 30 measurements computed from images of cell nuclei (radius, texture, smoothness, ...), labelled malignant or benign.</p>

<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_breast_cancer

bc = load_breast_cancer(as_frame=True)
df = bc.frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})
print(df.shape)
print(df["diagnosis"].value_counts())
print(df[["mean radius", "mean texture", "mean concave points"]].describe().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(569, 32)
diagnosis
benign       357
malignant    212
Name: count, dtype: int64
       mean radius  mean texture  mean concave points
count      569.000       569.000              569.000
mean        14.127        19.290                0.049
std          3.524         4.301                0.039
min          6.981         9.710                0.000
25%         11.700        16.170                0.020
50%         13.370        18.840                0.034
75%         15.780        21.800                0.074
max         28.110        39.280                0.201</code></pre>

<h3>Distributions by class: histplot and kdeplot</h3>
<p><code>sns.histplot</code> draws a histogram; with <code>hue</code> it overlays one per class. A <strong>KDE</strong> (kernel density estimate, <code>kde=True</code> or <code>sns.kdeplot</code>) is a smoothed version of the histogram — imagine replacing each data point with a small bell curve and adding them up. If the class histograms barely overlap, that feature on its own separates the classes well.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})

fig, axes = plt.subplots(1, 2, figsize=(11, 4))
sns.histplot(data=df, x="mean radius", hue="diagnosis", kde=True, bins=30, ax=axes[0])
axes[0].set_title("Mean radius: well separated")
sns.histplot(data=df, x="mean smoothness", hue="diagnosis", kde=True, bins=30, ax=axes[1])
axes[1].set_title("Mean smoothness: heavily overlapping")
fig.tight_layout()
fig.savefig("bc_hist.png")
plt.close(fig)
print(df.groupby("diagnosis")[["mean radius", "mean smoothness"]].mean().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">           mean radius  mean smoothness
diagnosis
benign          12.147            0.092
malignant       17.463            0.103</code></pre>
<p>Malignant tumours have a much larger average radius (about 17.5 vs 12.1), and in the picture the two humps sit mostly apart. Smoothness differs only slightly and the humps overlap a lot. Conclusion: radius is likely a strong predictor; smoothness alone is weak. This is the core reasoning of EDA for ML.</p>

<h3>Comparing groups: boxplot and violinplot</h3>
<p>A violin plot is a box plot with a KDE drawn on each side, so it shows the full shape (including multiple peaks) as well as the quartiles. Use box plots when you want a clean summary with outliers marked; violins when the shape matters.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
sns.boxplot(data=df, x="diagnosis", y="mean concave points", hue="diagnosis", ax=axes[0])
sns.violinplot(data=df, x="diagnosis", y="mean texture", hue="diagnosis", ax=axes[1])
fig.tight_layout()
fig.savefig("bc_box_violin.png")
plt.close(fig)

col = df["mean concave points"]
q1, q3 = col.quantile([0.25, 0.75])
n_out = ((col &lt; q1 - 1.5 * (q3 - q1)) | (col &gt; q3 + 1.5 * (q3 - q1))).sum()
print("overall outliers in 'mean concave points':", n_out)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">overall outliers in 'mean concave points': 10</code></pre>
<p>We passed the same column to both <code>x</code> and <code>hue</code>; in seaborn 0.13 this is the way to colour each box differently (and avoids a deprecation warning about <code>palette</code> without <code>hue</code>).</p>

<h3>Relationships: scatterplot and regplot</h3>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})

fig, axes = plt.subplots(1, 2, figsize=(11, 4))
sns.scatterplot(data=df, x="mean radius", y="mean texture", hue="diagnosis", alpha=0.6, ax=axes[0])
sns.regplot(data=df, x="mean radius", y="mean perimeter", scatter_kws={"s": 8}, ax=axes[1])
axes[1].set_title("Radius vs perimeter (almost a perfect line)")
fig.tight_layout()
fig.savefig("bc_scatter.png")
plt.close(fig)
print("corr radius~texture:  ", round(df["mean radius"].corr(df["mean texture"]), 3))
print("corr radius~perimeter:", round(df["mean radius"].corr(df["mean perimeter"]), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">corr radius~texture:   0.324
corr radius~perimeter: 0.998</code></pre>
<p><code>regplot</code> adds a fitted straight line with a shaded confidence band. Radius and perimeter are almost perfectly correlated (≈0.998) — no surprise, since perimeter ≈ 2π × radius. Such <strong>redundant</strong> features add little new information; some models (like linear regression) can even become unstable when features are near-duplicates, a problem called <em>multicollinearity</em>.</p>

<h3>Counts: countplot</h3>
<p><code>sns.countplot(data=df, x="category")</code> is a bar chart of <code>value_counts()</code> in one call — handy for the class balance or any categorical feature.</p>

<h3>Many variables at once: pairplot and the correlation heatmap</h3>
<p>A <strong>pairplot</strong> draws a scatter plot for every pair of chosen columns, with each column's distribution on the diagonal. It's a quick overview for up to about 5–6 features (beyond that it becomes unreadable and slow).</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris

df = load_iris(as_frame=True).frame
df.columns = ["sepal_len", "sepal_wid", "petal_len", "petal_wid", "target"]
df["species"] = df["target"].map({0: "setosa", 1: "versicolor", 2: "virginica"})

grid = sns.pairplot(df.drop(columns="target"), hue="species", height=2.0, plot_kws={"s": 12})
grid.savefig("iris_pairplot.png")
plt.close("all")
print("pairplot panels:", grid.axes.shape)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">pairplot panels: (4, 4)</code></pre>
<p>A <strong>correlation heatmap</strong> scales to many more columns. <code>df.corr()</code> computes the correlation coefficient between every pair of numeric columns (a number from −1 to +1 — explained fully in the statistics lesson), and <code>sns.heatmap</code> colours the matrix. Red/blue blocks reveal groups of related features, and the row for the target shows which features are most associated with it.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
cols = ["mean radius", "mean texture", "mean smoothness", "mean compactness",
        "mean concave points", "mean symmetry", "target"]
corr = df[cols].corr()

fig, ax = plt.subplots(figsize=(7, 6))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, square=True, ax=ax)
ax.set_title("Correlation matrix (breast cancer, selected features)")
fig.tight_layout()
fig.savefig("bc_heatmap.png")
plt.close(fig)
print(corr["target"].drop("target").sort_values().round(2))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean concave points   -0.78
mean radius           -0.73
mean compactness      -0.60
mean texture          -0.42
mean smoothness       -0.36
mean symmetry         -0.33
Name: target, dtype: float64</code></pre>
<p>Because target is 1 for benign, a <em>negative</em> correlation means "higher values go with malignant". Mean concave points (−0.78) and mean radius (−0.73) are strongly associated with malignancy; symmetry and smoothness much less so. Always fix <code>vmin=-1, vmax=1</code> so colours mean the same thing across heatmaps, and use a <em>diverging</em> colour map (like coolwarm) so zero is neutral.</p>

<div class="callout warn"><strong>Common mistakes in EDA plots:</strong> (1) drawing conclusions from a single plot without checking the axis scale; (2) unreadable overlapping points — use <code>alpha</code> or smaller markers; (3) pairplots with 30 columns that take minutes and show nothing; (4) forgetting that correlation only measures <em>straight-line</em> relationships — a perfect U-shape can have correlation ≈ 0. Plot, don't just compute.</div>

<h3>A repeatable EDA checklist</h3>
<ol>
<li>Bar/countplot of the target: balanced or not?</li>
<li>Histograms of every numeric feature (a grid): skew, multiple peaks, impossible values.</li>
<li>Box plots or histograms of key features <em>split by target</em>: which features separate classes?</li>
<li>Correlation heatmap: redundant features and feature–target association.</li>
<li>Scatter plots of the most interesting pairs, coloured by target.</li>
</ol>
<p>You'll apply this exact checklist in the mini-project at the end of this track.</p>
<div class="callout book"><strong>Further study:</strong> <em>Python for Data Analysis</em> (3rd ed.), Ch. 9 "Plotting and Visualization".</div>
`,
          keyPoints: [
            "Seaborn functions take data=df plus column names for x, y and hue, and can draw into a matplotlib ax.",
            "hue splits a plot by category — the quickest way to see whether a feature separates classes.",
            "histplot/kdeplot show distributions; boxplot/violinplot compare groups; scatterplot/regplot show relationships; pairplot gives an overview of a few features.",
            "A correlation heatmap (df.corr() + sns.heatmap with vmin=-1, vmax=1) reveals redundant features and feature–target association.",
            "Correlation captures only straight-line relationships; always look at the plots."
          ],
          exercise: {
            prompt: String.raw`<p>Using the wine dataset (<code>load_wine(as_frame=True)</code>), find the 3 features whose class means differ most <em>relative to their overall standard deviation</em> (hint: compute <code>df.groupby("target").mean()</code>, take max minus min per column, divide by <code>df.std()</code>). Then draw a 1×3 figure of box plots of those features by class and save it. Print the three feature names with their scores.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_wine

df = load_wine(as_frame=True).frame
features = df.drop(columns="target")
class_means = df.groupby("target").mean()
spread = (class_means.max() - class_means.min()) / features.std()
top3 = spread.sort_values(ascending=False).head(3)
print(top3.round(2))

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
for ax, col in zip(axes, top3.index):
    sns.boxplot(data=df, x="target", y=col, hue="target", legend=False, ax=ax)
    ax.set_title(col)
fig.tight_layout()
fig.savefig("wine_top3.png")
plt.close(fig)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">flavanoids                      2.20
od280/od315_of_diluted_wines    2.08
proline                         1.89
dtype: float64</code></pre>
<p>Dividing by the standard deviation makes the scores comparable across features measured in completely different units (proline is in the hundreds, hue is around 1). A feature whose class means are far apart compared with its natural spread is a promising predictor; the box plots confirm the classes sit at clearly different levels. This simple "separation score" is a hand-made version of what feature-selection methods do.</p>`
          },
          quiz: [
            { q: "What does the hue argument do in a seaborn plot?", options: ["Changes the background colour", "Colours elements by the values of a column, splitting the plot by category", "Sets transparency", "Sorts the data"], answer: 1, explain: "hue maps a (usually categorical) column to colour, producing one coloured group per category." },
            { q: "Two class histograms of a feature barely overlap. What does this suggest?", options: ["The feature is useless", "The feature alone separates the classes well and is likely predictive", "The data has missing values", "The feature should be deleted as redundant"], answer: 1, explain: "Little overlap means knowing the feature value tells you a lot about the class." },
            { q: "Two features have correlation 0.998. What is a reasonable conclusion?", options: ["One causes the other", "They carry nearly the same information (redundant), which can matter for some models", "Both are useless", "The dataset is broken"], answer: 1, explain: "Near-perfect correlation means near-duplicate information; it says nothing about causation." },
            { q: "Why should a correlation heatmap use vmin=-1 and vmax=1 with a diverging colour map?", options: ["It runs faster", "So that colours have a fixed meaning and zero correlation appears neutral", "Seaborn requires it", "It hides weak correlations"], answer: 1, explain: "Fixed limits stop the colour scale from stretching to the data, and a diverging map distinguishes positive from negative around a neutral zero." }
          ]
        }
      ]
    },
    {
      id: "pyai-math",
      title: "Math for Machine Learning",
      summary: "The linear algebra, calculus, probability and statistics that ML actually uses — each idea explained intuitively from high-school math and implemented in NumPy.",
      lessons: [
        {
          id: "pyai-math-vectors",
          title: "Vectors, Norms, Dot Products and Cosine Similarity",
          minutes: 50,
          objectives: [
            "Describe a vector both as a list of numbers and as an arrow with length and direction",
            "Add, subtract and scale vectors and compute Euclidean (L2) and Manhattan (L1) norms and distances",
            "Compute a dot product and explain it as a measure of alignment",
            "Compute cosine similarity and explain how it powers embedding search and RAG"
          ],
          body: String.raw`
<p>Machine learning represents everything — a house, a customer, a word, an image — as a list of numbers called a <strong>vector</strong>. Once things are vectors, questions like "which customers are similar?" or "which document answers this question?" become geometry: measuring lengths, distances and angles. This lesson builds those tools from scratch. No math beyond school-level arithmetic and Pythagoras is assumed.</p>

<h3>What is a vector?</h3>
<p>Algebraically, a vector is an ordered list of numbers, like <code>v = [3, 4]</code>. Each number is a <strong>component</strong>, and the number of components is its <strong>dimension</strong>. Geometrically, a 2-D vector is an arrow from the origin (0, 0) to the point (3, 4): it has a <em>length</em> and a <em>direction</em>.</p>
<p>In ML, a row of your feature table is a vector. A house described by <code>[size_m2, bedrooms, age_years]</code> is a 3-dimensional vector such as <code>[120, 3, 15]</code>. A text embedding from a language model might have 768 or 1,536 dimensions. We can't draw 768-D arrows, but every formula below works identically in any number of dimensions — that's the beauty of it. In NumPy, a vector is simply a 1-D array.</p>

<h3>Vector arithmetic</h3>
<ul>
<li><strong>Addition</strong> adds component by component: <code>[1, 2] + [3, 1] = [4, 3]</code>. Geometrically: walk along the first arrow, then the second.</li>
<li><strong>Subtraction</strong> <code>b − a</code> gives the arrow pointing from a to b — the key to measuring distance.</li>
<li><strong>Scalar multiplication</strong> stretches an arrow: <code>2 × [1, 2] = [2, 4]</code> points the same way and is twice as long; multiplying by −1 flips it.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

a = np.array([1.0, 2.0])
b = np.array([3.0, 1.0])
print("a + b =", a + b)
print("b - a =", b - a)
print("2a    =", 2 * a)
print("-a    =", -a)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">a + b = [4. 3.]
b - a = [ 2. -1.]
2a    = [2. 4.]
-a    = [-1. -2.]</code></pre>
<p>This is just NumPy's element-wise arithmetic from earlier lessons — vector math and array math are the same thing.</p>

<h3>Length: the norm</h3>
<p>The length (magnitude) of a vector is called its <strong>norm</strong>. The usual one is the <strong>Euclidean norm</strong> or <strong>L2 norm</strong>, written <code>‖v‖</code>, which is Pythagoras' theorem generalized: square every component, add them up, take the square root. For <code>[3, 4]</code>: √(3² + 4²) = √25 = 5.</p>
<p>The <strong>L1 norm</strong> (Manhattan norm) instead adds absolute values: |3| + |4| = 7 — the distance a taxi drives on a grid of streets, where you can't cut diagonally. Both appear in ML: L2 and L1 <em>regularization</em> penalize large model weights using exactly these norms.</p>
<pre><code class="lang-python runnable">import numpy as np

v = np.array([3.0, 4.0])
print("L2 by hand:", np.sqrt(np.sum(v ** 2)))
print("L2 numpy:  ", np.linalg.norm(v))
print("L1:        ", np.abs(v).sum(), np.linalg.norm(v, ord=1))

unit = v / np.linalg.norm(v)          # same direction, length 1
print("unit vector:", unit, "length:", np.linalg.norm(unit))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">L2 by hand: 5.0
L2 numpy:   5.0
L1:         7.0 7.0
unit vector: [0.6 0.8] length: 1.0</code></pre>
<p>Dividing a vector by its own norm gives a <strong>unit vector</strong>: same direction, length exactly 1. This is called <em>normalizing</em>, and it's used to compare directions without caring about length — remember this for cosine similarity below.</p>

<h3>Distance between two vectors</h3>
<p>The distance between points a and b is the length of the arrow between them: <code>‖b − a‖</code>. This is how the <em>k-nearest-neighbours</em> algorithm finds "similar" examples, and how clustering algorithms such as k-means group data.</p>
<pre><code class="lang-python runnable">import numpy as np

# customers: [age, visits_per_month]
alice = np.array([25, 4])
bob = np.array([27, 5])
carol = np.array([60, 1])
print("alice-bob:  ", round(np.linalg.norm(alice - bob), 2))
print("alice-carol:", round(np.linalg.norm(alice - carol), 2))

# with features on very different scales, one dominates the distance
house_a = np.array([120, 3])     # [size_m2, bedrooms]
house_b = np.array([125, 1])
print("houses:", round(np.linalg.norm(house_a - house_b), 2), "- the bedroom difference barely counts")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">alice-bob:   2.24
alice-carol: 35.13
houses: 5.39 - the bedroom difference barely counts</code></pre>
<p>The last example shows why we standardized features in the NumPy lesson: a 5 m² difference outweighs a 2-bedroom difference purely because of units. Distance-based models need features on comparable scales.</p>

<h3>The dot product</h3>
<p>The <strong>dot product</strong> of two vectors of the same length multiplies them component by component and adds the results:</p>
<p><code>a · b = a<sub>1</sub>b<sub>1</sub> + a<sub>2</sub>b<sub>2</sub> + … + a<sub>n</sub>b<sub>n</sub></code></p>
<p>For <code>[1, 2, 3] · [4, 5, 6] = 1×4 + 2×5 + 3×6 = 32</code>. The result is a single number (a scalar). In NumPy write <code>np.dot(a, b)</code> or, more commonly, <code>a @ b</code>.</p>
<p>The dot product is everywhere in ML because a <strong>linear model</strong> is just a dot product plus a constant: <code>prediction = w · x + b</code>, where <code>x</code> is the feature vector, <code>w</code> the learned weights (one per feature, saying how much that feature matters) and <code>b</code> the bias. A single neuron in a neural network computes exactly the same thing before applying its activation function.</p>
<pre><code class="lang-python runnable">import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.sum(a * b), np.dot(a, b), a @ b)     # three ways, same answer

# a linear model predicting house price (in thousands)
x = np.array([120, 3, 15])           # size_m2, bedrooms, age_years
w = np.array([2.5, 10.0, -1.2])      # learned weights: age lowers the price
bias = 20.0
print("predicted price:", w @ x + bias)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">32 32 32
predicted price: 332.0</code></pre>

<h4>The geometric meaning: alignment</h4>
<p>There is a second, equivalent formula that explains <em>why</em> the dot product measures similarity:</p>
<p><code>a · b = ‖a‖ × ‖b‖ × cos(θ)</code></p>
<p>where θ (theta) is the angle between the arrows. Recall from trigonometry that cos(0°) = 1, cos(90°) = 0 and cos(180°) = −1. So:</p>
<ul>
<li>Arrows pointing the same way → large positive dot product.</li>
<li>Perpendicular arrows (unrelated) → dot product 0. These are called <strong>orthogonal</strong>.</li>
<li>Opposite directions → negative dot product.</li>
</ul>
<div class="callout info"><strong>Analogy:</strong> imagine pushing a cart. If you push in exactly the direction it can roll, all your effort counts (cos 0° = 1). Pushing sideways at 90° does nothing useful (cos 90° = 0). The dot product measures "how much of one arrow points along the other".</div>

<h3>Cosine similarity</h3>
<p>The raw dot product mixes up two things: alignment and length. A long document's vector may have a huge dot product with everything just because it's long. <strong>Cosine similarity</strong> removes length by dividing it out, leaving only the angle:</p>
<p><code>cos_sim(a, b) = (a · b) / (‖a‖ × ‖b‖)</code></p>
<p>It ranges from −1 (opposite) through 0 (unrelated) to 1 (identical direction). Equivalently: normalize both vectors to unit length, then take their dot product.</p>
<pre><code class="lang-python runnable">import numpy as np

def cosine_similarity(a, b):
    return (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))

a = np.array([1.0, 2.0, 3.0])
print("same direction:", round(cosine_similarity(a, 10 * a), 4))   # length doesn't matter
print("orthogonal:    ", cosine_similarity(np.array([1.0, 0.0]), np.array([0.0, 5.0])))
print("opposite:      ", cosine_similarity(a, -a))
print("partly similar:", round(cosine_similarity(np.array([1.0, 1.0]), np.array([1.0, 0.0])), 4))  # 45 degrees
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">same direction: 1.0
orthogonal:     0.0
opposite:       -1.0
partly similar: 0.7071</code></pre>

<h3>Foreshadowing: embeddings, semantic search and RAG</h3>
<p>Later in the course you'll use <strong>embedding models</strong> that turn a piece of text into a vector such that texts with similar <em>meaning</em> get vectors pointing in similar directions. "How do I reset my password?" and "I forgot my login credentials" end up with high cosine similarity even though they share almost no words. <strong>Semantic search</strong> embeds every document once, embeds the user's question, and returns the documents with the highest cosine similarity. <strong>RAG</strong> (Retrieval-Augmented Generation) does exactly that, then pastes the retrieved documents into a prompt for a large language model. The core operation is the one you are about to write.</p>
<p>Here is a toy version with hand-made 4-dimensional "embeddings" whose dimensions loosely mean [about money, about accounts/login, about shipping, about food]:</p>
<pre><code class="lang-python runnable">import numpy as np

docs = {
    "Refund policy for returned items":   np.array([0.9, 0.1, 0.4, 0.0]),
    "How to reset your account password": np.array([0.1, 0.95, 0.0, 0.0]),
    "Delivery times and tracking":        np.array([0.2, 0.1, 0.9, 0.0]),
    "Our cafe menu":                      np.array([0.3, 0.0, 0.0, 0.95]),
}
query = np.array([0.05, 0.9, 0.1, 0.0])     # "I forgot my login"

names = list(docs)
M = np.array([docs[n] for n in names])        # one row per document
M_unit = M / np.linalg.norm(M, axis=1, keepdims=True)
q_unit = query / np.linalg.norm(query)
scores = M_unit @ q_unit                      # all cosine similarities in one step
for i in np.argsort(-scores):                 # highest first
    print(f"{scores[i]:.3f}  {names[i]}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.993  How to reset your account password
0.226  Delivery times and tracking
0.195  Refund policy for returned items
0.017  Our cafe menu</code></pre>
<p>Notice the trick in the middle: normalize all document vectors once (with <code>keepdims=True</code> broadcasting!), and then a single matrix-vector product <code>M_unit @ q_unit</code> computes every cosine similarity at once. Vector databases do this for millions of documents. That matrix-vector product is the topic of the next lesson.</p>

<div class="callout warn"><strong>Common mistakes:</strong> (1) <code>a * b</code> is element-wise, not the dot product — you need <code>a @ b</code> or <code>.sum()</code> afterwards. (2) Taking the dot product of vectors of different lengths raises a shape error; both must have the same dimension. (3) Cosine similarity of a zero vector divides by zero — guard against empty inputs.</div>
<div class="callout book"><strong>Further study:</strong> <em>Mathematics for Machine Learning</em> (Deisenroth, Faisal &amp; Ong), Ch. 2 "Linear Algebra" and Ch. 3 "Analytic Geometry" (norms, inner products, angles).</div>
`,
          keyPoints: [
            "A vector is an ordered list of numbers and an arrow with length and direction; each data row is a vector.",
            "The L2 norm is sqrt(sum of squares); distance between a and b is the norm of b - a; scale features before using distances.",
            "The dot product a · b = sum of a_i * b_i; in NumPy use a @ b. A linear model is w · x + b.",
            "a · b = |a| |b| cos(angle): positive when aligned, 0 when orthogonal, negative when opposite.",
            "Cosine similarity divides out length and is the core operation of embedding search and RAG."
          ],
          exercise: {
            prompt: String.raw`<p>Three users rated 5 movies (0 = not seen): <code>u1 = [5, 4, 0, 1, 0]</code>, <code>u2 = [4, 5, 0, 2, 1]</code>, <code>u3 = [0, 1, 5, 0, 4]</code>. Write a function that returns the full 3×3 matrix of cosine similarities between users (use normalization and one matrix product). Which user is most similar to u1? Also compute the Euclidean distance u1–u2 and u1–u3.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

U = np.array([[5, 4, 0, 1, 0],
              [4, 5, 0, 2, 1],
              [0, 1, 5, 0, 4]], dtype=float)

def cosine_matrix(X):
    X_unit = X / np.linalg.norm(X, axis=1, keepdims=True)
    return X_unit @ X_unit.T

S = cosine_matrix(U)
print(np.round(S, 3))
others = S[0].copy()
others[0] = -np.inf                      # ignore similarity with itself
print("most similar to u1: u" + str(others.argmax() + 1))
print("dist u1-u2:", round(np.linalg.norm(U[0] - U[1]), 3))
print("dist u1-u3:", round(np.linalg.norm(U[0] - U[2]), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[1.    0.956 0.095]
 [0.956 1.    0.205]
 [0.095 0.205 1.   ]]
most similar to u1: u2
dist u1-u2: 2.0
dist u1-u3: 8.718</code></pre>
<p>The diagonal is 1 (every user is identical to themselves) and the matrix is symmetric. u1 and u2 like the same movies, so their similarity is about 0.96, while u1 and u3 have almost opposite tastes (about 0.1). <code>X_unit @ X_unit.T</code> computes every pairwise dot product of unit vectors at once — the basis of "users like you also watched" recommender systems.</p>`
          },
          quiz: [
            { q: "What is the L2 norm of [6, 8]?", options: ["14", "10", "48", "100"], answer: 1, explain: "sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10. 14 is the L1 norm." },
            { q: "What is [2, 0, 1] · [3, 5, 4]?", options: ["10", "[6, 0, 4]", "15", "9"], answer: 0, explain: "2*3 + 0*5 + 1*4 = 6 + 0 + 4 = 10. [6, 0, 4] is the element-wise product before summing." },
            { q: "Two embedding vectors have cosine similarity close to 0. What does that mean?", options: ["They are identical", "They point in roughly perpendicular directions, i.e. unrelated", "They are opposites", "One of them is very long"], answer: 1, explain: "cos(90°) = 0: orthogonal vectors share no direction. Opposites give -1, identical directions give 1." },
            { q: "Why is cosine similarity often preferred to the raw dot product for comparing documents?", options: ["It is faster", "It ignores vector length, so long documents don't score high just for being long", "It is always positive", "It works on vectors of different lengths"], answer: 1, explain: "Dividing by both norms removes the effect of magnitude and keeps only the angle." }
          ]
        },
        {
          id: "pyai-math-matrices",
          title: "Matrices: Multiplication, Transpose, Identity and Inverse",
          minutes: 55,
          objectives: [
            "Explain a matrix as a table of data and as a transformation of vectors",
            "Compute matrix-vector and matrix-matrix products by hand and with @, and predict result shapes",
            "Implement a neural-network dense layer as X @ W + b",
            "Explain the transpose, the identity matrix and the intuition behind the inverse"
          ],
          body: String.raw`
<p>A <strong>matrix</strong> is a rectangular grid of numbers with <code>m</code> rows and <code>n</code> columns — shape <code>(m, n)</code>. You've already been using them: a dataset with 150 rows and 4 features is a 150×4 matrix. But matrices have a second, deeper role: a matrix is a <em>machine that transforms vectors</em>. Feeding a vector into a matrix can rotate it, stretch it, or map it into a space with a different number of dimensions. Every layer of a neural network is such a transformation, which is why this lesson matters so much.</p>

<h3>Matrix times vector</h3>
<p>To multiply a matrix <code>A</code> (shape m×n) by a vector <code>x</code> (length n), take the <strong>dot product of each row of A with x</strong>. Each row produces one number, so the result has length m.</p>
<pre><code class="lang-text">A = [[1, 2],      x = [10,
     [3, 4],           20]
     [5, 6]]

A @ x = [1*10 + 2*20,     = [ 50,
         3*10 + 4*20,        110,
         5*10 + 6*20]        170]
</code></pre>
<p>A 3×2 matrix took a 2-D vector in and produced a 3-D vector out. That is the "transformation" view: the matrix maps 2-D space into 3-D space.</p>
<pre><code class="lang-python runnable">import numpy as np

A = np.array([[1, 2],
              [3, 4],
              [5, 6]])
x = np.array([10, 20])
print(A @ x)
print([int(A[i] @ x) for i in range(3)])     # same thing: one dot product per row
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[ 50 110 170]
[50, 110, 170]</code></pre>
<p>Here's a classic geometric example: a rotation matrix turns every vector by an angle without changing its length.</p>
<pre><code class="lang-python runnable">import numpy as np

theta = np.radians(90)
R = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])
v = np.array([1.0, 0.0])                 # pointing right
print(np.round(R @ v, 3))                # now pointing up
S = np.array([[2, 0],
              [0, 0.5]])                 # stretch x by 2, squash y by half
print(S @ np.array([3.0, 4.0]))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0. 1.]
[6. 2.]</code></pre>

<h3>Matrix times matrix</h3>
<p>Multiplying <code>A</code> (m×n) by <code>B</code> (n×p) gives <code>C</code> (m×p), where each entry is a dot product: <strong><code>C[i, j]</code> = row i of A · column j of B</strong>. The rule for shapes is the most important thing to memorize:</p>
<p><strong>(m × n) @ (n × p) → (m × p)</strong>. The inner dimensions (n and n) must match, and they "cancel"; the outer dimensions give the result's shape.</p>

<figure><img alt="Matrix multiplication shapes: a 2 by 3 matrix times a 3 by 2 matrix gives a 2 by 2 matrix; inner dimensions 3 and 3 must match; entry row i column j is the dot product of row i of A and column j of B" src="assets/diagrams/python-ai-matmul.svg"><figcaption>(2×3) @ (3×2) → (2×2). Each output cell is a row of A dotted with a column of B.</figcaption></figure>

<pre><code class="lang-python runnable">import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])          # 2 x 3
B = np.array([[1, 0],
              [0, 1],
              [2, 2]])             # 3 x 2
C = A @ B
print(C, C.shape)
print("C[0,1] by hand:", A[0] @ B[:, 1])    # row 0 of A . column 1 of B
print("B @ A shape:", (B @ A).shape)        # order matters!
try:
    A @ A
except ValueError as e:
    print("A @ A fails:", str(e)[:60])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[ 7  8]
 [16 17]] (2, 2)
C[0,1] by hand: 8
B @ A shape: (3, 3)
A @ A fails: matmul: Input operand 1 has a mismatch in its core dimension</code></pre>
<div class="callout warn"><strong>Common mistakes:</strong> (1) <code>A * B</code> is element-wise and requires equal (or broadcastable) shapes; <code>A @ B</code> is matrix multiplication. (2) Matrix multiplication is <em>not commutative</em>: <code>A @ B</code> and <code>B @ A</code> generally differ, and often only one of them is even defined. (3) When you hit "matmul: Input operand 1 has a mismatch in its core dimension", write down both shapes and check the inner pair.</div>

<h3>A whole dataset at once</h3>
<p>Matrix multiplication lets you apply a linear model to every row of a dataset in one operation. If <code>X</code> has shape (n_samples, n_features) and <code>w</code> has shape (n_features,), then <code>X @ w</code> has shape (n_samples,) — one prediction per row. No loop.</p>
<pre><code class="lang-python runnable">import numpy as np

X = np.array([[120, 3, 15],
              [ 80, 2, 30],
              [200, 4,  5]])           # 3 houses x 3 features
w = np.array([2.5, 10.0, -1.2])
b = 20.0
print(X @ w + b)                        # one predicted price per house
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[332. 204. 554.]</code></pre>

<h3>A neural network layer is a matrix multiplication</h3>
<p>A <strong>dense</strong> (fully connected) layer with 4 inputs and 3 outputs ("neurons") has a weight matrix <code>W</code> of shape (4, 3) — one column of weights per neuron — and a bias vector <code>b</code> of length 3. For a batch of inputs <code>X</code> of shape (batch, 4), the layer computes:</p>
<p><code>output = activation(X @ W + b)</code> with shape (batch, 4) @ (4, 3) → (batch, 3)</p>
<p>The bias is broadcast across the batch, and the activation (like ReLU) is applied element-wise. Stack a few of these and you have a neural network — the "deep" in deep learning just means many layers.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
X = rng.normal(size=(5, 4))            # batch of 5 samples, 4 features each

W1 = rng.normal(size=(4, 3)) * 0.5     # layer 1: 4 inputs -&gt; 3 neurons
b1 = np.zeros(3)
W2 = rng.normal(size=(3, 1)) * 0.5     # layer 2: 3 inputs -&gt; 1 output
b2 = np.zeros(1)

hidden = np.maximum(0, X @ W1 + b1)    # dense layer + ReLU
output = hidden @ W2 + b2              # final linear layer
print("X:", X.shape, "-&gt; hidden:", hidden.shape, "-&gt; output:", output.shape)
print(np.round(output.ravel(), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">X: (5, 4) -&gt; hidden: (5, 3) -&gt; output: (5, 1)
[0.    0.    0.029 0.081 0.   ]</code></pre>
<p>That is a complete two-layer neural network forward pass in four lines. Training it means finding values of W1, b1, W2, b2 that make the outputs match targets — which requires the calculus of the next lessons. PyTorch's <code>nn.Linear(4, 3)</code> is exactly this <code>X @ W + b</code> (it stores the weight transposed, but the math is identical).</p>

<h3>The transpose</h3>
<p>The <strong>transpose</strong> <code>Aᵀ</code> (NumPy: <code>A.T</code>) flips a matrix over its diagonal: rows become columns. A (2×3) matrix becomes (3×2). You use it constantly to make shapes line up — for example <code>X.T @ X</code> (features × features) appears in the formula for linear regression, and <code>X_unit @ X_unit.T</code> gave all pairwise similarities in the previous lesson's exercise. A useful identity: <code>(A @ B).T == B.T @ A.T</code>.</p>
<pre><code class="lang-python runnable">import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])
B = np.array([[1, 0], [0, 1], [2, 2]])
print(A.T, A.T.shape)
print((A.T @ A).shape, (A @ A.T).shape)
print(np.array_equal((A @ B).T, B.T @ A.T))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[1 4]
 [2 5]
 [3 6]] (3, 2)
(3, 3) (2, 2)
True</code></pre>

<h3>The identity matrix</h3>
<p>The <strong>identity matrix</strong> <code>I</code> has 1s on the diagonal and 0s elsewhere (<code>np.eye(n)</code>). It is the matrix version of the number 1: <code>I @ x = x</code> and <code>A @ I = A</code>. It's the transformation that "does nothing".</p>

<h3>The inverse: undoing a transformation</h3>
<p>For ordinary numbers, the inverse of 4 is 1/4 because 4 × 1/4 = 1. For a square matrix <code>A</code>, the <strong>inverse</strong> <code>A⁻¹</code> is the matrix that undoes A: <code>A⁻¹ @ A = I</code>. If A rotates by 30°, A⁻¹ rotates by −30°. If A stretches x by 2, A⁻¹ squashes it by half.</p>
<p>Not every matrix has an inverse. If a transformation squashes space flat — for example, maps every 2-D point onto a single line — information is lost and can't be recovered, just as you can't divide by zero. Such matrices are called <strong>singular</strong>; their <strong>determinant</strong> (a number measuring how much the matrix scales area/volume) is 0. In data terms, this happens when one feature is an exact combination of others (like perimeter = 2π × radius), which is the extreme case of the multicollinearity you saw in the seaborn lesson.</p>
<pre><code class="lang-python runnable">import numpy as np

A = np.array([[2.0, 1.0],
              [1.0, 3.0]])
A_inv = np.linalg.inv(A)
print(np.round(A_inv, 3))
print(np.round(A_inv @ A, 10))            # identity (a "-0." is just zero from rounding)

# solve the system 2x + y = 5, x + 3y = 10  ->  A @ [x, y] = [5, 10]
print("solution:", np.linalg.solve(A, np.array([5.0, 10.0])))

singular = np.array([[1.0, 2.0],
                     [2.0, 4.0]])           # second row = 2 x first row
print("determinant:", np.linalg.det(singular))
try:
    np.linalg.inv(singular)
except np.linalg.LinAlgError as e:
    print("cannot invert:", e)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[[ 0.6 -0.2]
 [-0.2  0.4]]
[[ 1. -0.]
 [ 0.  1.]]
solution: [1. 3.]
determinant: 0.0
cannot invert: Singular matrix</code></pre>
<div class="callout tip"><strong>Practical tip:</strong> to solve <code>A @ x = b</code>, use <code>np.linalg.solve(A, b)</code> rather than <code>np.linalg.inv(A) @ b</code>. It is faster and more numerically accurate. In practice ML libraries rarely invert matrices at all; they use gradient descent or specialized decompositions.</div>
<div class="callout book"><strong>Further study:</strong> <em>Mathematics for Machine Learning</em>, Ch. 2 (matrices, inverse, systems of linear equations). For geometric intuition, 3Blue1Brown's "Essence of Linear Algebra" video series is excellent.</div>
`,
          keyPoints: [
            "A matrix is both a data table and a transformation of vectors.",
            "Shape rule: (m x n) @ (n x p) -> (m x p); inner dimensions must match; order matters.",
            "C[i, j] is row i of A dotted with column j of B; X @ w gives one prediction per row.",
            "A dense neural-network layer is activation(X @ W + b).",
            "Transpose swaps rows and columns; the identity does nothing; the inverse undoes a transformation and does not exist for singular matrices (determinant 0). Prefer np.linalg.solve over inv."
          ],
          exercise: {
            prompt: String.raw`<p>Build a dense layer by hand. Input batch <code>X</code> of shape (6, 5) from <code>default_rng(42).normal</code>. Layer 1 maps 5 → 8 with ReLU, layer 2 maps 8 → 3 (three class scores). Then convert each row of scores into probabilities with the <strong>softmax</strong> function: <code>exp(s) / sum(exp(s))</code> per row (use keepdims). Print every intermediate shape, check that each row of probabilities sums to 1, and print the predicted class per row (argmax).</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
X = rng.normal(size=(6, 5))
W1, b1 = rng.normal(size=(5, 8)) * 0.4, np.zeros(8)
W2, b2 = rng.normal(size=(8, 3)) * 0.4, np.zeros(3)

h = np.maximum(0, X @ W1 + b1)
scores = h @ W2 + b2
exp_s = np.exp(scores - scores.max(axis=1, keepdims=True))   # subtract max for numerical safety
probs = exp_s / exp_s.sum(axis=1, keepdims=True)

print(X.shape, h.shape, scores.shape, probs.shape)
print(np.allclose(probs.sum(axis=1), 1.0))
print(np.round(probs[:2], 3))
print("predicted classes:", probs.argmax(axis=1))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(6, 5) (6, 8) (6, 3) (6, 3)
True
[[0.399 0.285 0.317]
 [0.338 0.33  0.332]]
predicted classes: [0 0 0 1 0 1]</code></pre>
<p>Shapes follow the rule (6,5)@(5,8)→(6,8) and (6,8)@(8,3)→(6,3). Softmax needs <code>keepdims=True</code> so each row is divided by its <em>own</em> sum (the broadcasting bug from the NumPy module would otherwise strike). Subtracting each row's maximum before <code>exp</code> doesn't change the result mathematically but prevents overflow when scores are large — every real softmax implementation does this.</p>`
          },
          quiz: [
            { q: "A has shape (32, 10) and B has shape (10, 4). What is the shape of A @ B?", options: ["(10, 10)", "(32, 4)", "(4, 32)", "It is undefined"], answer: 1, explain: "Inner dimensions 10 and 10 match; the outer ones give (32, 4)." },
            { q: "A dense layer receives a batch of shape (64, 128) and outputs (64, 10). What is the shape of its weight matrix W in X @ W + b?", options: ["(10, 128)", "(128, 10)", "(64, 10)", "(64, 128)"], answer: 1, explain: "(64, 128) @ (128, 10) -> (64, 10). The bias has shape (10,)." },
            { q: "Which statement about matrix multiplication is true?", options: ["A @ B always equals B @ A", "A @ B can be defined while B @ A is not", "A @ B is the same as A * B", "It requires square matrices"], answer: 1, explain: "Matrix multiplication isn't commutative; e.g. (2x3)@(3x5) works but (3x5)@(2x3) doesn't." },
            { q: "Why does the matrix [[1, 2], [2, 4]] have no inverse?", options: ["It contains even numbers", "Its rows are multiples of each other, so it squashes the plane onto a line and its determinant is 0", "It is not square", "Only diagonal matrices have inverses"], answer: 1, explain: "Linearly dependent rows make the matrix singular: information is lost and cannot be undone." }
          ]
        },
        {
          id: "pyai-math-calculus",
          title: "Calculus Intuition: Derivatives, Gradients and the Chain Rule",
          minutes: 55,
          objectives: [
            "Explain a derivative as the slope (rate of change) of a function and estimate it numerically",
            "Apply the basic derivative rules for powers, sums and constants",
            "Compute partial derivatives and assemble them into a gradient vector",
            "Use the chain rule to differentiate nested functions and explain how it underlies backpropagation"
          ],
          body: String.raw`
<p>Training a machine-learning model means adjusting its parameters (weights) to make its error smaller. To do that intelligently you need to answer: "if I nudge this weight a little, does the error go up or down, and by how much?" That question is exactly what a <strong>derivative</strong> answers. You don't need to become a calculus expert to do ML — libraries compute derivatives for you automatically — but you do need a solid intuition for what they mean. That's what this lesson provides.</p>

<h3>Slope: rate of change</h3>
<p>For a straight line <code>y = 3x + 1</code>, the <strong>slope</strong> is 3: every time x increases by 1, y increases by 3. Slope = rise / run = (change in y) / (change in x). A positive slope goes uphill, a negative slope downhill, zero is flat.</p>
<p>A curve like <code>f(x) = x²</code> doesn't have one slope — it's flat at the bottom (x = 0) and gets steeper further out. But if you zoom in far enough on any point of a smooth curve, it looks like a straight line. The slope of that tiny straight piece is the <strong>derivative</strong> at that point, written <code>f′(x)</code> (read "f prime of x") or <code>df/dx</code>.</p>
<div class="callout info"><strong>Analogy:</strong> your car's speedometer shows a derivative. Distance travelled is a function of time; the speedometer reports how fast that distance is changing <em>right now</em> — not your average speed over the trip.</div>

<h3>Estimating a derivative numerically</h3>
<p>The definition is concrete: take a tiny step <code>h</code>, see how much f changes, and divide:</p>
<p><code>f′(x) ≈ (f(x + h) − f(x)) / h</code> for very small h</p>
<p>A slightly more accurate version, the <em>central difference</em>, steps both ways: <code>(f(x + h) − f(x − h)) / (2h)</code>. Let's try it on <code>f(x) = x²</code>:</p>
<pre><code class="lang-python runnable">def f(x):
    return x ** 2

def numerical_derivative(func, x, h=1e-5):
    return (func(x + h) - func(x - h)) / (2 * h)

for x in [-2, 0, 1, 3]:
    print(f"x = {x:2d}   slope ~ {numerical_derivative(f, x):.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">x = -2   slope ~ -4.0000
x =  0   slope ~ 0.0000
x =  1   slope ~ 2.0000
x =  3   slope ~ 6.0000</code></pre>
<p>The pattern is clear: the slope of x² at any x is <code>2x</code>. At x = −2 the curve goes downhill (slope −4), at x = 0 it is flat, at x = 3 it climbs steeply (slope 6).</p>

<h3>The few rules you need</h3>
<p>Mathematicians have worked out derivative rules so you don't have to estimate numerically every time. For ML intuition, these cover most cases:</p>
<table>
<thead><tr><th>Function</th><th>Derivative</th><th>Example</th></tr></thead>
<tbody>
<tr><td>constant <code>c</code></td><td><code>0</code></td><td>A constant never changes</td></tr>
<tr><td><code>x<sup>n</sup></code> (power rule)</td><td><code>n·x<sup>n−1</sup></code></td><td><code>x³ → 3x²</code>, <code>x² → 2x</code>, <code>x → 1</code></td></tr>
<tr><td><code>c·f(x)</code></td><td><code>c·f′(x)</code></td><td><code>5x² → 10x</code></td></tr>
<tr><td><code>f(x) + g(x)</code></td><td><code>f′(x) + g′(x)</code></td><td><code>x² + 3x → 2x + 3</code></td></tr>
<tr><td><code>e<sup>x</sup></code></td><td><code>e<sup>x</sup></code></td><td>Its own slope!</td></tr>
<tr><td><code>ln(x)</code></td><td><code>1/x</code></td><td>Used in log-loss</td></tr>
</tbody>
</table>
<pre><code class="lang-python runnable">import numpy as np

def numerical_derivative(func, x, h=1e-5):
    return (func(x + h) - func(x - h)) / (2 * h)

g = lambda x: 4 * x ** 3 - 2 * x + 7          # rule says: 12x^2 - 2
x = 1.5
print("numerical:", round(numerical_derivative(g, x), 4))
print("by rules: ", 12 * x ** 2 - 2)
print("exp check:", round(numerical_derivative(np.exp, 1.0), 4), "vs e =", round(np.e, 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">numerical: 25.0
by rules:  25.0
exp check: 2.7183 vs e = 2.7183</code></pre>

<h3>Why derivatives matter: finding the minimum</h3>
<p>At the bottom of a valley the ground is flat — the derivative is 0. To the left of the bottom the slope is negative (downhill to the right), to the right it's positive. So the derivative tells you <strong>which way is downhill</strong>: move <em>opposite</em> to the sign of the slope. If the slope at your position is +6, step left; if it's −4, step right. And the bigger the slope's magnitude, the further you probably are from the bottom. This simple idea is gradient descent, which you'll implement in the next lesson.</p>

<h3>Functions of several variables: partial derivatives</h3>
<p>A model's error depends on <em>many</em> weights at once. Consider a function of two variables, <code>f(w, b) = w² + 3b²</code>. Picture it as a landscape: w and b are your east-west and north-south coordinates, f is the height.</p>
<p>A <strong>partial derivative</strong> asks: how does f change if I move in <em>one</em> direction only, holding everything else fixed? Written <code>∂f/∂w</code> (the curly ∂ means "partial"). To compute it, treat the other variables as constants and differentiate normally:</p>
<ul>
<li><code>∂f/∂w = 2w</code> (the <code>3b²</code> term is a constant when only w moves, so its derivative is 0)</li>
<li><code>∂f/∂b = 6b</code></li>
</ul>

<h3>The gradient</h3>
<p>Collect all the partial derivatives into a vector and you get the <strong>gradient</strong>, written <code>∇f</code> ("nabla f" or "grad f"):</p>
<p><code>∇f(w, b) = [∂f/∂w, ∂f/∂b] = [2w, 6b]</code></p>
<p>The gradient has a beautiful geometric meaning: <strong>it points in the direction of steepest ascent</strong> — straight uphill — and its length says how steep that is. So <code>−∇f</code> points straight downhill. A model with a million weights has a gradient with a million components, one per weight, each saying "nudge me this way".</p>
<pre><code class="lang-python runnable">import numpy as np

def f(p):
    w, b = p
    return w ** 2 + 3 * b ** 2

def numerical_gradient(func, p, h=1e-5):
    grad = np.zeros_like(p)
    for i in range(len(p)):
        step = np.zeros_like(p)
        step[i] = h                       # move along ONE coordinate only
        grad[i] = (func(p + step) - func(p - step)) / (2 * h)
    return grad

p = np.array([1.0, 2.0])
print("numerical gradient:", np.round(numerical_gradient(f, p), 4))
print("analytic gradient: ", np.array([2 * p[0], 6 * p[1]]))
downhill = p - 0.1 * numerical_gradient(f, p)      # a small step against the gradient
print("f before:", f(p), " f after one downhill step:", round(f(downhill), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">numerical gradient: [ 2. 12.]
analytic gradient:  [ 2. 12.]
f before: 13.0  f after one downhill step: 2.56</code></pre>
<p>One small step in the direction of <code>−∇f</code> reduced f from 13 to about 2.6. Repeat this many times and you reach the minimum.</p>

<h3>The chain rule: derivatives of nested functions</h3>
<p>Neural networks are functions nested inside functions: the input goes through layer 1, its output goes through layer 2, and so on, and finally into a loss function. The <strong>chain rule</strong> tells us how to differentiate such compositions. If <code>y = f(g(x))</code> — first apply g, then f — then:</p>
<p><code>dy/dx = f′(g(x)) × g′(x)</code></p>
<p>In words: <strong>multiply the rates of change along the chain</strong>. If writing <code>u = g(x)</code>, then <code>dy/dx = (dy/du) × (du/dx)</code>.</p>
<div class="callout info"><strong>Analogy — gears:</strong> gear A turns gear B, which turns gear C. If B turns 3 times for each turn of A, and C turns 4 times for each turn of B, then C turns 3 × 4 = 12 times per turn of A. Rates of change along a chain multiply.</div>
<p>Example: <code>y = (3x + 1)²</code>. Let <code>u = 3x + 1</code>, so <code>y = u²</code>. Then <code>dy/du = 2u</code> and <code>du/dx = 3</code>, giving <code>dy/dx = 2u × 3 = 6(3x + 1)</code>. At x = 1 that's 24.</p>
<pre><code class="lang-python runnable">def numerical_derivative(func, x, h=1e-5):
    return (func(x + h) - func(x - h)) / (2 * h)

y = lambda x: (3 * x + 1) ** 2
x = 1.0
u = 3 * x + 1
dy_du = 2 * u            # outer function's derivative, evaluated at the inner value
du_dx = 3                # inner function's derivative
print("chain rule:", dy_du * du_dx)
print("numerical: ", round(numerical_derivative(y, x), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">chain rule: 24.0
numerical:  24.0</code></pre>

<h3>Foreshadowing backpropagation</h3>
<p>Here is a one-neuron "network": input x, weight w, prediction <code>p = w·x</code>, and squared-error loss <code>L = (p − y)²</code> against the true value y. How does the loss change when we change w? The chain runs w → p → L:</p>
<ul>
<li><code>dL/dp = 2(p − y)</code> (power rule on the loss)</li>
<li><code>dp/dw = x</code> (p is just w times a constant x)</li>
<li><code>dL/dw = dL/dp × dp/dw = 2(p − y)·x</code></li>
</ul>
<p><strong>Backpropagation</strong> is nothing more than applying the chain rule systematically, starting from the loss and working <em>backward</em> through each layer, reusing the intermediate products so every weight's gradient is computed efficiently. PyTorch's <code>loss.backward()</code> does precisely this, automatically, for millions of weights. This automation is called <strong>automatic differentiation</strong> (autograd).</p>
<pre><code class="lang-python runnable">x, y_true = 2.0, 10.0          # one training example
w = 3.0                        # current weight

# forward pass
p = w * x                      # prediction = 6
L = (p - y_true) ** 2          # loss = 16

# backward pass (chain rule, from the loss back to the weight)
dL_dp = 2 * (p - y_true)       # -8
dp_dw = x                      # 2
dL_dw = dL_dp * dp_dw          # -16: increasing w would DECREASE the loss
print("prediction:", p, "loss:", L, "gradient dL/dw:", dL_dw)

# check numerically
h = 1e-5
num = (((w + h) * x - y_true) ** 2 - ((w - h) * x - y_true) ** 2) / (2 * h)
print("numerical dL/dw:", round(num, 4))

w_new = w - 0.05 * dL_dw       # step against the gradient
print("new w:", w_new, "new loss:", (w_new * x - y_true) ** 2)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">prediction: 6.0 loss: 16.0 gradient dL/dw: -16.0
numerical dL/dw: -16.0
new w: 3.8 new loss: 5.760000000000002</code></pre>
<p>The gradient was negative, telling us to increase w; one step took w from 3.0 to 3.8 and cut the loss from 16 to about 5.8. The perfect weight is 5 (since 5 × 2 = 10). Keep stepping and you'll get there — next lesson.</p>

<div class="callout warn"><strong>Common mistakes:</strong> (1) Forgetting that the gradient points <em>uphill</em> — you must subtract it to minimize. (2) In the chain rule, evaluating the outer derivative at x instead of at the inner value <code>g(x)</code>. (3) Choosing <code>h</code> too small in numerical derivatives (like 1e-15): floating-point rounding then dominates. Values around 1e-5 work well.</div>
<div class="callout book"><strong>Further study:</strong> <em>Mathematics for Machine Learning</em>, Ch. 5 "Vector Calculus" (partial derivatives, gradients, chain rule and backpropagation).</div>
`,
          keyPoints: [
            "A derivative is the instantaneous slope: how fast the output changes per unit change of the input.",
            "Numerically, f'(x) is about (f(x+h) - f(x-h)) / 2h; power rule: x^n -> n x^(n-1).",
            "The derivative is zero at a minimum, and its sign tells you which way is downhill.",
            "Partial derivatives vary one input at a time; the gradient vector of all partials points uphill, so -gradient points downhill.",
            "The chain rule multiplies rates of change along nested functions; backpropagation is the chain rule applied backward through a network."
          ],
          exercise: {
            prompt: String.raw`<p>For the loss <code>L(w, b) = (w·x + b − y)²</code> with one data point x = 3, y = 5: (1) derive <code>∂L/∂w</code> and <code>∂L/∂b</code> with the chain rule; (2) evaluate them at w = 1, b = 0; (3) verify with a numerical gradient; (4) take one step with learning rate 0.01 and show that the loss went down.</p>`,
            solution: String.raw`<p>Let the error be <code>e = w·x + b − y</code>, so <code>L = e²</code> and <code>dL/de = 2e</code>. Since <code>∂e/∂w = x</code> and <code>∂e/∂b = 1</code>: <code>∂L/∂w = 2e·x</code> and <code>∂L/∂b = 2e</code>.</p>
<pre><code class="lang-python runnable">import numpy as np

x, y = 3.0, 5.0
def loss(p):
    w, b = p
    return (w * x + b - y) ** 2

p = np.array([1.0, 0.0])
e = p[0] * x + p[1] - y                       # error = -2
analytic = np.array([2 * e * x, 2 * e])
h = 1e-5
numeric = np.array([(loss(p + d) - loss(p - d)) / (2 * h) for d in np.eye(2) * h])
print("analytic:", analytic, "numeric:", np.round(numeric, 4))

p_new = p - 0.01 * analytic
print("loss before:", loss(p), "after:", round(loss(p_new), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">analytic: [-12.  -4.] numeric: [-12.  -4.]
loss before: 4.0 after: 2.56</code></pre>
<p>Both partial derivatives are negative (the prediction 3 is below the target 5), so the step increases both w and b. The <code>np.eye(2) * h</code> trick produces the two "nudge one coordinate" vectors [h, 0] and [0, h]. The loss fell from 4 to about 2.6.</p>`
          },
          quiz: [
            { q: "What is the derivative of f(x) = 5x^3?", options: ["15x^2", "5x^2", "15x^3", "3x^2"], answer: 0, explain: "Power rule: 3*x^2, times the constant 5, gives 15x^2." },
            { q: "At some point the derivative of a loss with respect to a weight is +4. To reduce the loss you should…", options: ["Increase the weight", "Decrease the weight", "Leave it; +4 means minimum", "Multiply the weight by 4"], answer: 1, explain: "A positive slope means the loss rises as the weight increases, so move the weight the other way." },
            { q: "What does the gradient of a function point towards?", options: ["The minimum", "The direction of steepest increase", "The origin", "A random direction"], answer: 1, explain: "The gradient points uphill (steepest ascent); gradient descent moves along its negative." },
            { q: "y = (2x + 1)^3. Using the chain rule, dy/dx is…", options: ["3(2x + 1)^2", "6(2x + 1)^2", "(2x + 1)^2", "6x^2"], answer: 1, explain: "Outer derivative 3u^2 at u = 2x + 1, times inner derivative 2: 6(2x + 1)^2." },
            { q: "What is backpropagation?", options: ["A way to collect more data", "Applying the chain rule backward from the loss through each layer to get every weight's gradient", "Running the network in reverse to generate inputs", "A type of activation function"], answer: 1, explain: "Backprop computes gradients efficiently by chaining local derivatives from the output back to the inputs." }
          ]
        },
        {
          id: "pyai-math-gradient-descent",
          title: "Gradient Descent from Scratch: Fitting a Line",
          minutes: 55,
          objectives: [
            "Define a model, a loss function (mean squared error) and the parameters to learn",
            "Derive the MSE gradients for a straight-line model",
            "Implement batch gradient descent in NumPy and show the loss decreasing",
            "Explain the effect of the learning rate and the idea of stochastic / mini-batch gradient descent"
          ],
          body: String.raw`
<p>Now we put the whole math module together and do the thing that every ML model does under the hood: <strong>learn parameters from data by minimizing a loss</strong>. We'll fit the simplest model there is — a straight line — using <strong>gradient descent</strong>, implemented from scratch. Once you understand this, the training loop of a giant neural network will look familiar: it's the same loop with a bigger model and automatic gradients.</p>

<h3>The three ingredients of learning</h3>
<ol>
<li><strong>A model</strong> with adjustable parameters. Ours: <code>ŷ = w·x + b</code> (ŷ, "y-hat", means "predicted y"). The parameters are the slope <code>w</code> and the intercept <code>b</code>.</li>
<li><strong>A loss function</strong> that measures how wrong the model is on the training data. For regression the standard choice is <strong>mean squared error</strong>: <code>MSE = (1/n) Σ (ŷ<sub>i</sub> − y<sub>i</sub>)²</code> — the average of the squared errors. Squaring makes every error positive and punishes big misses much more than small ones.</li>
<li><strong>An optimizer</strong> that changes the parameters to reduce the loss: gradient descent.</li>
</ol>

<h3>The data</h3>
<p>We generate synthetic data from a known line, <code>y = 3x + 4</code>, plus random noise. Because we know the true answer, we can check whether gradient descent finds it.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 2, size=100)
y = 3 * x + 4 + rng.normal(0, 0.5, size=100)     # true w = 3, true b = 4, plus noise
print(x[:3].round(3), y[:3].round(3))

def mse(w, b):
    return np.mean((w * x + b - y) ** 2)

print("loss of a bad guess (w=0, b=0):", round(mse(0, 0), 3))
print("loss of the true line (w=3, b=4):", round(mse(3, 4), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[1.274 0.54  0.082] [7.151 4.918 4.497]
loss of a bad guess (w=0, b=0): 56.036
loss of the true line (w=3, b=4): 0.237</code></pre>
<p>Even the true line has a small loss (about 0.25 = 0.5², the noise variance): noise can't be predicted. Our goal is to get from the bad guess down to roughly that floor.</p>

<h3>The gradient of the MSE</h3>
<p>Using the chain rule from the last lesson, for each data point the error is <code>e<sub>i</sub> = w·x<sub>i</sub> + b − y<sub>i</sub></code>, and the loss averages <code>e<sub>i</sub>²</code>. So:</p>
<ul>
<li><code>∂MSE/∂w = (2/n) Σ e<sub>i</sub> · x<sub>i</sub></code></li>
<li><code>∂MSE/∂b = (2/n) Σ e<sub>i</sub></code></li>
</ul>
<p>Intuition: if predictions are mostly too high (positive errors), both gradients are positive, so gradient descent lowers w and b. Points with large x have more influence on the slope's gradient, which makes sense — tilting the line moves far-away points the most. In NumPy these sums are single vectorized expressions.</p>

<h3>The gradient descent update</h3>
<p>Start from any guess, then repeat:</p>
<p><code>w ← w − η · ∂MSE/∂w</code> and <code>b ← b − η · ∂MSE/∂b</code></p>
<p>The symbol <code>η</code> (eta) is the <strong>learning rate</strong>: how big a step to take each iteration. One pass of this update over the data is often called an <em>epoch</em> or <em>iteration</em>.</p>

<figure><img alt="A U-shaped loss curve with dots stepping down from a high starting point towards the minimum; steps get smaller as the slope flattens" src="assets/diagrams/python-ai-gradient-descent.svg"><figcaption>Gradient descent on a loss curve: each step moves against the slope; steps shrink as the curve flattens near the minimum.</figcaption></figure>

<div class="callout info"><strong>Analogy:</strong> you're on a foggy mountain at night and want to reach the valley. You can't see far, but you can feel the slope under your feet. So you take a step downhill, feel again, step again. The learning rate is your stride length.</div>

<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 2, size=100)
y = 3 * x + 4 + rng.normal(0, 0.5, size=100)

w, b = 0.0, 0.0           # initial guess
lr = 0.1                  # learning rate (eta)
n = len(x)
history = []
for step in range(1, 501):
    y_hat = w * x + b                     # 1. predict
    error = y_hat - y
    loss = np.mean(error ** 2)            # 2. measure
    history.append(loss)
    grad_w = (2 / n) * np.sum(error * x)  # 3. gradients
    grad_b = (2 / n) * np.sum(error)
    w -= lr * grad_w                      # 4. update
    b -= lr * grad_b
    if step in (1, 2, 5, 10, 50, 100, 500):
        print(f"step {step:3d}  loss {loss:8.4f}  w {w:.3f}  b {b:.3f}")

print("loss always decreased:", all(a &gt;= c for a, c in zip(history, history[1:])))
print("closed-form check:", np.round(np.polyfit(x, y, 1), 3))     # exact least-squares answer
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step   1  loss  56.0357  w 1.808  b 1.450
step   2  loss  15.3008  w 2.731  b 2.214
step   5  loss   0.7309  w 3.534  b 2.976
step  10  loss   0.3934  w 3.567  b 3.210
step  50  loss   0.2484  w 3.143  b 3.769
step 100  loss   0.2356  w 3.005  b 3.948
step 500  loss   0.2350  w 2.967  b 3.996
loss always decreased: True
closed-form check: [2.967 3.996]</code></pre>
<p>Watch the numbers: the loss falls quickly at first (big gradients, big steps) and then flattens as w and b settle near 3 and 4. They don't land on exactly 3 and 4 because of noise; instead they converge to the <em>best-fitting</em> line for this particular sample, which matches the exact least-squares solution from <code>np.polyfit</code>. Those four commented steps — predict, measure, compute gradients, update — are <em>the</em> training loop of machine learning.</p>

<h3>Plotting the loss curve</h3>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
x = rng.uniform(0, 2, size=100)
y = 3 * x + 4 + rng.normal(0, 0.5, size=100)

def train(lr, steps=100):
    w = b = 0.0
    losses = []
    for _ in range(steps):
        err = w * x + b - y
        losses.append(np.mean(err ** 2))
        w -= lr * 2 * np.mean(err * x)
        b -= lr * 2 * np.mean(err)
    return np.array(losses), w, b

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
for lr in [0.01, 0.1, 0.3]:
    losses, w, b = train(lr)
    ax1.plot(losses, label=f"lr={lr}")
    print(f"lr={lr:&lt;5} final loss {losses[-1]:8.4f}   w={w:.3f} b={b:.3f}")
ax1.set_yscale("log")
ax1.set_xlabel("step"); ax1.set_ylabel("MSE (log scale)"); ax1.legend(); ax1.set_title("Loss curves")
losses, w, b = train(0.1, 500)
ax2.scatter(x, y, s=10, alpha=0.6)
xs = np.linspace(0, 2, 50)
ax2.plot(xs, w * xs + b, color="#d97a34", label="learned line")
ax2.legend(); ax2.set_title("Fitted line")
fig.tight_layout()
fig.savefig("gradient_descent.png")
plt.close(fig)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">lr=0.01  final loss   0.3887   w=3.548 b=3.190
lr=0.1   final loss   0.2356   w=3.005 b=3.948
lr=0.3   final loss   0.2350   w=2.967 b=3.996</code></pre>
<p>Using <code>np.mean(err * x)</code> is the same as <code>(1/n) * np.sum(err * x)</code>, just tidier.</p>

<h3>The learning rate: the most important knob</h3>
<ul>
<li><strong>Too small</strong> (0.01 above): progress is painfully slow; after 100 steps the loss is still high.</li>
<li><strong>Just right</strong> (0.1–0.3): fast, smooth convergence.</li>
<li><strong>Too large</strong> (for this data, 0.5 already diverges): each step overshoots the valley and lands higher up the other side; the loss bounces or explodes to infinity.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 2, size=100)
y = 3 * x + 4 + rng.normal(0, 0.5, size=100)

w = b = 0.0
lr = 1.2                                  # too big!
for step in range(1, 9):
    err = w * x + b - y
    print(f"step {step}  loss {np.mean(err ** 2):14.2f}")
    w -= lr * 2 * np.mean(err * x)
    b -= lr * 2 * np.mean(err)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step 1  loss          56.04
step 2  loss        1281.35
step 3  loss       29553.67
step 4  loss      681813.21
step 5  loss    15729800.21
step 6  loss   362895139.51
step 7  loss  8372190515.09
step 8  loss 193151041254.23</code></pre>
<div class="callout warn"><strong>Common mistake:</strong> when training "blows up" — loss becomes huge, <code>inf</code> or <code>nan</code> — the first thing to try is a smaller learning rate (divide by 10). Also check that features are scaled: unscaled features with large values produce huge gradients, effectively making any learning rate too big. That's another reason standardization matters.</div>

<h3>Stochastic and mini-batch gradient descent</h3>
<p>Above, every step used <em>all</em> 100 points to compute the gradient: <strong>batch gradient descent</strong>. With millions of examples, that's too slow per step. <strong>Stochastic gradient descent (SGD)</strong> estimates the gradient from one random example at a time; <strong>mini-batch</strong> gradient descent uses a small random batch (e.g. 32 or 256). The estimate is noisy, but each step is cheap and on average points the right way. Deep learning almost always uses mini-batches; optimizers like Adam add refinements (momentum, per-parameter step sizes) on top of the same idea.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
x = rng.uniform(0, 2, size=1000)
y = 3 * x + 4 + rng.normal(0, 0.5, size=1000)

w = b = 0.0
lr, batch_size = 0.1, 32
for epoch in range(1, 21):
    order = rng.permutation(len(x))                  # reshuffle every epoch
    for start in range(0, len(x), batch_size):
        idx = order[start:start + batch_size]
        err = w * x[idx] + b - y[idx]
        w -= lr * 2 * np.mean(err * x[idx])
        b -= lr * 2 * np.mean(err)
    if epoch in (1, 5, 20):
        full_loss = np.mean((w * x + b - y) ** 2)
        print(f"epoch {epoch:2d}  loss {full_loss:.4f}  w {w:.3f}  b {b:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch  1  loss 0.2970  w 3.309  b 3.629
epoch  5  loss 0.2676  w 2.970  b 3.958
epoch 20  loss 0.2942  w 3.095  b 4.063</code></pre>
<p>After a single epoch (32 small updates) the model is already close, because it made many cheap steps instead of one expensive one. Notice the loss does not fall perfectly every epoch (0.2676 at epoch 5, slightly higher at epoch 20): each mini-batch gives a noisy gradient, so with a constant learning rate the parameters keep jiggling around the optimum. In practice the learning rate is often reduced over time (a <em>learning-rate schedule</em>) to let them settle. This loop — epochs, shuffling, mini-batches, gradient, update — is exactly what you'll write in PyTorch later, except that PyTorch computes the gradients for you with <code>loss.backward()</code>.</p>

<h3>Beyond straight lines</h3>
<p>Nothing in the loop depends on the model being a line. Logistic regression swaps in a sigmoid and the log-loss; a neural network swaps in stacked layers. The loss landscape of a neural network isn't a simple bowl — it has many valleys and flat regions — but gradient descent still works remarkably well in practice.</p>
<div class="callout book"><strong>Further study:</strong> <em>Hands-On Machine Learning with Scikit-Learn, Keras &amp; TensorFlow</em> (Géron), Ch. 4 "Training Models" covers gradient descent variants and learning rates in depth.</div>
`,
          keyPoints: [
            "Learning = a model with parameters + a loss function + an optimizer that reduces the loss.",
            "MSE averages squared errors; for y_hat = w x + b its gradients are (2/n) sum(e x) and (2/n) sum(e).",
            "The training loop: predict, compute loss, compute gradients, update parameters with w -= lr * grad.",
            "Too small a learning rate is slow; too large overshoots and diverges; scale features to keep gradients sane.",
            "Mini-batch SGD uses small random batches per step and is how deep networks are trained."
          ],
          exercise: {
            prompt: String.raw`<p>Extend gradient descent to <strong>two features</strong> using matrices. Generate <code>X</code> of shape (200, 2) with <code>default_rng(1).normal</code> and <code>y = X @ [2, -3] + 1 + noise(0.1)</code>. Write a vectorized loop with a weight vector <code>w</code> (shape (2,)) and bias <code>b</code>: predictions <code>X @ w + b</code>, gradient <code>(2/n) * X.T @ error</code>. Train for 300 steps with lr = 0.1 and print the loss every 100 steps and the final parameters.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(1)
X = rng.normal(size=(200, 2))
y = X @ np.array([2.0, -3.0]) + 1.0 + rng.normal(0, 0.1, size=200)

w = np.zeros(2)
b = 0.0
lr, n = 0.1, len(y)
for step in range(1, 301):
    error = X @ w + b - y                 # shape (200,)
    grad_w = (2 / n) * X.T @ error        # (2,200) @ (200,) -&gt; (2,)
    grad_b = (2 / n) * error.sum()
    w -= lr * grad_w
    b -= lr * grad_b
    if step % 100 == 0:
        print(f"step {step}  loss {np.mean(error ** 2):.5f}")
print("w:", np.round(w, 3), "b:", round(b, 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step 100  loss 0.01035
step 200  loss 0.01035
step 300  loss 0.01035
w: [ 2.003 -2.999] b: 1.004</code></pre>
<p><code>X.T @ error</code> computes, for each feature j, the sum over samples of <code>error_i * X[i, j]</code> — the same formula as the one-feature version, for all features at once. The learned weights land close to the true [2, −3] and bias 1, with the loss near the noise floor of 0.01. This vectorized gradient is exactly what linear regression libraries and neural-network layers compute.</p>`
          },
          quiz: [
            { q: "In gradient descent, what is the update rule for a parameter w?", options: ["w = w + lr * gradient", "w = w - lr * gradient", "w = gradient / lr", "w = w * gradient"], answer: 1, explain: "Subtracting the gradient (scaled by the learning rate) moves the parameter downhill on the loss." },
            { q: "Your loss goes 5.2, 9.8, 41.0, 300.5, inf. What is the most likely fix?", options: ["Train for more steps", "Lower the learning rate (and check feature scaling)", "Increase the learning rate", "Use more noise"], answer: 1, explain: "An exploding loss means each step overshoots; a smaller learning rate (or scaled features) fixes it." },
            { q: "Why does MSE square the errors?", options: ["To make the computation faster", "So errors are positive and large errors are penalized more heavily, giving a smooth differentiable loss", "Because negative numbers cannot be averaged", "To make the loss smaller"], answer: 1, explain: "Squaring removes sign, emphasises large mistakes and is easy to differentiate." },
            { q: "What distinguishes mini-batch gradient descent from batch gradient descent?", options: ["It uses a different loss", "Each update uses a small random subset of the data instead of all of it", "It doesn't use gradients", "It only works for straight lines"], answer: 1, explain: "Mini-batches give noisy but cheap gradient estimates, allowing many more updates per pass through the data." }
          ]
        },
        {
          id: "pyai-math-probability",
          title: "Probability: Events, Conditional Probability, Bayes and Distributions",
          minutes: 55,
          objectives: [
            "Compute probabilities of events, complements, unions and independent events",
            "Explain conditional probability and compute it from counts",
            "Apply Bayes' rule to a spam-filter example and explain base rates",
            "Describe uniform, normal and binomial distributions, sample from them, and compute expected values"
          ],
          body: String.raw`
<p>Machine learning is about making predictions under uncertainty. A spam filter never <em>knows</em> an email is spam — it estimates how likely it is. A classifier's output "0.92 cat" is a probability. A language model picks its next word by sampling from a probability distribution over its vocabulary. <strong>Probability</strong> is the language for reasoning about uncertainty, and this lesson builds it up from coin flips to Bayes' rule.</p>

<h3>Events and probabilities</h3>
<p>An <strong>experiment</strong> is something with an uncertain outcome (rolling a die). An <strong>event</strong> is a set of outcomes we care about ("roll an even number"). The <strong>probability</strong> of an event, <code>P(A)</code>, is a number from 0 (impossible) to 1 (certain). When all outcomes are equally likely:</p>
<p><code>P(A) = (number of outcomes in A) / (total number of outcomes)</code></p>
<p>So <code>P(even) = 3/6 = 0.5</code>. Another useful view is <strong>frequency</strong>: if you repeat the experiment many times, P(A) is the long-run fraction of times A happens. That view lets us check any probability by <em>simulation</em>, which we'll do throughout.</p>
<p>Three basic rules:</p>
<ul>
<li><strong>Complement:</strong> <code>P(not A) = 1 − P(A)</code>. P(not rolling a 6) = 5/6.</li>
<li><strong>Or (union):</strong> <code>P(A or B) = P(A) + P(B) − P(A and B)</code>. We subtract the overlap so it isn't counted twice.</li>
<li><strong>And, for independent events:</strong> <code>P(A and B) = P(A) × P(B)</code>. Events are <strong>independent</strong> if knowing one tells you nothing about the other — like two separate coin flips.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, size=100_000)          # 100k fair die rolls
even = rolls % 2 == 0
big = rolls &gt;= 5
print("P(even)        sim:", even.mean().round(3), " exact:", 3 / 6)
print("P(even or big) sim:", (even | big).mean().round(3), " exact:", round(3/6 + 2/6 - 1/6, 3))

coin1 = rng.random(100_000) &lt; 0.5
coin2 = rng.random(100_000) &lt; 0.5
print("P(two heads)   sim:", (coin1 &amp; coin2).mean().round(3), " exact:", 0.5 * 0.5)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">P(even)        sim: 0.498  exact: 0.5
P(even or big) sim: 0.665  exact: 0.667
P(two heads)   sim: 0.251  exact: 0.25</code></pre>
<p>Simulations land very close to the exact answers — and get closer with more trials (the law of large numbers, next lesson). The 6 even/big overlap is the roll "6", which is both even and ≥ 5; that's the <code>− 1/6</code>.</p>

<h3>Conditional probability</h3>
<p><strong>Conditional probability</strong> <code>P(A | B)</code> — read "probability of A given B" — is the probability of A once you <em>know</em> B happened. Knowing B shrinks your world to only the outcomes where B is true; then you ask what fraction of those also have A:</p>
<p><code>P(A | B) = P(A and B) / P(B)</code></p>
<p>Example: P(roll is 6 | roll is even) = (1/6) / (3/6) = 1/3. Knowing the roll is even, there are only three possibilities (2, 4, 6), one of which is 6.</p>
<p>With a table of counts, conditional probability is just "filter, then take a fraction" — which you already know how to do in pandas:</p>
<pre><code class="lang-python runnable">import pandas as pd

emails = pd.DataFrame({
    "is_spam":       [1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    "contains_free": [1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
})
p_spam = emails["is_spam"].mean()
p_free_given_spam = emails.loc[emails["is_spam"] == 1, "contains_free"].mean()
p_spam_given_free = emails.loc[emails["contains_free"] == 1, "is_spam"].mean()
print("P(spam) =", p_spam)
print("P(free | spam) =", p_free_given_spam)
print("P(spam | free) =", p_spam_given_free)
print(pd.crosstab(emails["contains_free"], emails["is_spam"]))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">P(spam) = 0.4
P(free | spam) = 0.75
P(spam | free) = 0.75
is_spam        0  1
contains_free
0              5  1
1              1  3</code></pre>
<div class="callout warn"><strong>Common mistake — flipping the condition:</strong> <code>P(A | B)</code> is generally <em>not</em> equal to <code>P(B | A)</code>. Most spam contains "free" (0.75 above), but that doesn't mean most emails containing "free" are spam. Another example: P(over 2 m tall | professional basketball player) is high — many players are that tall — but P(professional basketball player | over 2 m tall) is tiny, because most very tall people do not play professionally. Keeping track of which way the condition goes is half of probability.</div>

<h3>Bayes' rule</h3>
<p>Bayes' rule lets you flip a conditional probability — compute <code>P(A | B)</code> from <code>P(B | A)</code>:</p>
<p><code>P(A | B) = P(B | A) × P(A) / P(B)</code></p>
<p>In ML language, with A = a hypothesis (the email is spam) and B = evidence (it contains "free"):</p>
<ul>
<li><code>P(A)</code> is the <strong>prior</strong>: what you believed before seeing the evidence (the base rate of spam).</li>
<li><code>P(B | A)</code> is the <strong>likelihood</strong>: how probable the evidence is if the hypothesis is true.</li>
<li><code>P(A | B)</code> is the <strong>posterior</strong>: your updated belief after seeing the evidence.</li>
<li><code>P(B)</code> is the overall probability of the evidence, computed by adding up both ways it can happen: <code>P(B) = P(B | A)P(A) + P(B | not A)P(not A)</code>.</li>
</ul>
<h4>A spam filter with Bayes</h4>
<p>Suppose 20% of all email is spam. The word "free" appears in 60% of spam emails but only 5% of legitimate ("ham") emails. An email arrives containing "free". How likely is it to be spam?</p>
<ul>
<li>Prior: P(spam) = 0.20, P(ham) = 0.80</li>
<li>Likelihoods: P(free | spam) = 0.60, P(free | ham) = 0.05</li>
<li>Evidence: P(free) = 0.60 × 0.20 + 0.05 × 0.80 = 0.12 + 0.04 = 0.16</li>
<li>Posterior: P(spam | free) = 0.12 / 0.16 = <strong>0.75</strong></li>
</ul>
<p>Seeing "free" raised our belief from 20% to 75%. Let's verify by simulating a million emails:</p>
<pre><code class="lang-python runnable">import numpy as np

p_spam, p_free_spam, p_free_ham = 0.20, 0.60, 0.05
posterior = p_free_spam * p_spam / (p_free_spam * p_spam + p_free_ham * (1 - p_spam))
print("Bayes' rule:", round(posterior, 4))

rng = np.random.default_rng(1)
n = 1_000_000
is_spam = rng.random(n) &lt; p_spam
has_free = np.where(is_spam, rng.random(n) &lt; p_free_spam, rng.random(n) &lt; p_free_ham)
print("simulation: ", round(is_spam[has_free].mean(), 4))

# a second word: "meeting" appears in 2% of spam, 20% of ham.
# Naive Bayes assumes words are independent given the class, and multiplies likelihoods.
like_spam = 0.60 * 0.02
like_ham = 0.05 * 0.20
post2 = like_spam * p_spam / (like_spam * p_spam + like_ham * (1 - p_spam))
print("P(spam | 'free' and 'meeting'):", round(post2, 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Bayes' rule: 0.75
simulation:  0.75
P(spam | 'free' and 'meeting'): 0.2308</code></pre>
<p>The last part is the idea behind the <strong>Naive Bayes</strong> classifier, one of the earliest successful spam filters: multiply the likelihoods of every word (assuming, "naively", that words are independent given the class), combine with the prior, and normalize. The word "meeting" is much more common in legitimate mail, so it pulls the probability from 75% back down to about 23% — barely above the 20% prior.</p>
<div class="callout info"><strong>The base-rate lesson:</strong> imagine a disease affecting 1 in 1,000 people and a test that is 99% accurate for both sick and healthy people. If you test positive, the chance you're actually sick is only about 9%! Out of 100,000 people, 100 are sick (99 test positive) but 99,900 are healthy and 1% of them — 999 people — also test positive. Positives are dominated by false alarms because the prior is so small. The same effect makes fraud detection hard: when fraud is rare, even a good model produces many false alarms.</div>

<h3>Random variables and distributions</h3>
<p>A <strong>random variable</strong> is a number produced by a random process: the value of a die, the height of a random person, the number of clicks on an ad today. Its <strong>distribution</strong> says which values are possible and how likely each is. Three distributions appear constantly in ML.</p>
<h4>Uniform</h4>
<p>Every value in a range is equally likely. A fair die is a discrete uniform distribution on 1..6; <code>rng.random()</code> is a continuous uniform on [0, 1). Uniform distributions are used to initialize weights and to make random choices.</p>
<h4>Normal (Gaussian)</h4>
<p>The famous <strong>bell curve</strong>, described by two numbers: the <strong>mean</strong> μ (mu, the center) and the <strong>standard deviation</strong> σ (sigma, the width). Many natural measurements (heights, measurement errors) are approximately normal because they're the sum of many small independent effects. The <strong>68–95–99.7 rule</strong>: about 68% of values fall within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ.</p>
<figure><img alt="A normal bell curve centered at the mean, with shaded bands showing about 68 percent of values within one standard deviation, 95 percent within two and 99.7 percent within three" src="assets/diagrams/python-ai-normal-distribution.svg"><figcaption>The normal distribution and the 68–95–99.7 rule.</figcaption></figure>
<h4>Binomial</h4>
<p>The number of successes in <code>n</code> independent yes/no trials, each with success probability <code>p</code>. Example: out of 100 visitors, each with a 3% chance of buying, how many buy? Binomial counts are the basis of A/B testing (next lesson).</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(42)
u = rng.uniform(0, 10, size=100_000)
heights = rng.normal(loc=170, scale=8, size=100_000)       # mean 170 cm, sd 8 cm
buyers = rng.binomial(n=100, p=0.03, size=100_000)         # buyers per 100 visitors

print("uniform: mean", u.mean().round(2), "| min", u.min().round(2), "| max", u.max().round(2))
for k in (1, 2, 3):
    inside = (np.abs(heights - 170) &lt;= k * 8).mean()
    print(f"normal: within {k} sd: {inside:.3f}")
print("binomial: mean buyers", buyers.mean().round(2), "| P(0 buyers)", (buyers == 0).mean().round(3))
print("binomial counts for 0..6 buyers:", np.bincount(buyers)[:7])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">uniform: mean 5.01 | min 0.0 | max 10.0
normal: within 1 sd: 0.682
normal: within 2 sd: 0.954
normal: within 3 sd: 0.997
binomial: mean buyers 3.0 | P(0 buyers) 0.047
binomial counts for 0..6 buyers: [ 4671 14763 22516 22697 17197 10176  4922]</code></pre>
<p>The simulated fractions match the 68–95–99.7 rule. And even though the purchase chance is 3%, about 5% of the time <em>nobody</em> out of 100 visitors buys — randomness produces streaks that look meaningful but aren't. Keep that in mind when you compare two small samples.</p>

<h3>Expected value</h3>
<p>The <strong>expected value</strong> <code>E[X]</code> is the long-run average of a random variable: each possible value weighted by its probability, <code>E[X] = Σ x · P(x)</code>. For a fair die: (1+2+3+4+5+6) × 1/6 = 3.5 — a value you can never actually roll, but the average of many rolls. For a binomial, <code>E[X] = n·p</code> (100 × 0.03 = 3 buyers).</p>
<p>Expected value is how you make decisions under uncertainty. Should a lottery ticket cost 2 if it pays 1,000 with probability 1/1,000? E[winnings] = 1,000 × 0.001 = 1, which is less than the price — a losing bet on average. In ML, the loss we minimize is an expected value: the average error over the data distribution, estimated from our training sample.</p>
<pre><code class="lang-python runnable">import numpy as np

values = np.array([1, 2, 3, 4, 5, 6])
probs = np.full(6, 1 / 6)
print("E[die] =", values @ probs)               # a dot product!

# a biased die where 6 comes up half the time
biased = np.array([0.1, 0.1, 0.1, 0.1, 0.1, 0.5])
print("E[biased die] =", round(values @ biased, 2))

rng = np.random.default_rng(3)
print("simulated average of 100k biased rolls:", rng.choice(values, size=100_000, p=biased).mean().round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">E[die] = 3.5
E[biased die] = 4.5
simulated average of 100k biased rolls: 4.494</code></pre>
<p>Expected value is literally a dot product of values and probabilities — linear algebra and probability meeting.</p>
<div class="callout book"><strong>Further study:</strong> <em>Mathematics for Machine Learning</em>, Ch. 6 "Probability and Distributions" (sum and product rules, Bayes' theorem, Gaussian distribution).</div>
`,
          keyPoints: [
            "P(A) is between 0 and 1; P(not A) = 1 - P(A); for independent events P(A and B) = P(A) P(B).",
            "Conditional probability P(A | B) = P(A and B) / P(B): filter to B, then take the fraction with A. P(A | B) is not P(B | A).",
            "Bayes' rule: posterior = likelihood x prior / evidence. Small priors (base rates) mean many false alarms.",
            "Uniform: all values equally likely; normal: bell curve with 68-95-99.7 rule; binomial: successes in n yes/no trials.",
            "Expected value is the probability-weighted average, E[X] = sum of x P(x), computable as a dot product."
          ],
          exercise: {
            prompt: String.raw`<p>A fraud model flags transactions. 0.5% of transactions are fraudulent. The model flags 90% of fraudulent transactions and 2% of legitimate ones. (1) Use Bayes' rule to compute P(fraud | flagged). (2) Verify with a simulation of 2,000,000 transactions. (3) Out of 10,000 flagged transactions, about how many are real fraud? What does this mean for the team reviewing flags?</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

p_fraud, p_flag_fraud, p_flag_legit = 0.005, 0.90, 0.02
p_flag = p_flag_fraud * p_fraud + p_flag_legit * (1 - p_fraud)
posterior = p_flag_fraud * p_fraud / p_flag
print("P(fraud | flagged) =", round(posterior, 4))

rng = np.random.default_rng(7)
n = 2_000_000
fraud = rng.random(n) &lt; p_fraud
flagged = np.where(fraud, rng.random(n) &lt; p_flag_fraud, rng.random(n) &lt; p_flag_legit)
print("simulated:", round(fraud[flagged].mean(), 4))
print("real fraud among 10,000 flags: about", round(10_000 * posterior))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">P(fraud | flagged) = 0.1844
simulated: 0.1859
real fraud among 10,000 flags: about 1844</code></pre>
<p>Only about 18% of flagged transactions are fraud, even though the model catches 90% of fraud and is "98% accurate" on legitimate ones. Because legitimate transactions vastly outnumber fraud, the 2% false-alarm rate produces far more flags than the real fraud does. The review team will spend over 80% of its effort on false alarms — which is why ML engineers look at <em>precision</em> (this posterior) and not just accuracy.</p>`
          },
          quiz: [
            { q: "Two fair coins are flipped independently. What is P(both heads)?", options: ["0.5", "0.25", "0.75", "1.0"], answer: 1, explain: "For independent events multiply: 0.5 * 0.5 = 0.25." },
            { q: "In Bayes' rule, what is the prior?", options: ["The probability of the evidence given the hypothesis", "Your belief in the hypothesis before seeing the evidence", "The updated belief after the evidence", "The probability of the evidence"], answer: 1, explain: "The prior is P(hypothesis) before evidence; the posterior is after." },
            { q: "Heights are roughly normal with mean 170 and standard deviation 8. About what fraction of people are between 154 and 186?", options: ["68%", "95%", "99.7%", "50%"], answer: 1, explain: "154 to 186 is mean plus or minus 2 standard deviations, which covers about 95%." },
            { q: "What is the expected value of a game paying 10 with probability 0.2 and 0 otherwise?", options: ["10", "2", "0.2", "5"], answer: 1, explain: "E = 10 * 0.2 + 0 * 0.8 = 2." },
            { q: "Most spam contains the word 'offer'. Can you conclude that most emails containing 'offer' are spam?", options: ["Yes, always", "No — P(spam | offer) depends also on the base rate of spam and how often ham contains 'offer'", "Yes, if the filter is accurate", "Only for short emails"], answer: 1, explain: "That confuses P(offer | spam) with P(spam | offer). Bayes' rule shows the prior and the ham rate matter." }
          ]
        },
        {
          id: "pyai-math-statistics",
          title: "Statistics: Spread, Percentiles, Correlation, Sampling and A/B Tests",
          minutes: 55,
          objectives: [
            "Compute and interpret mean, median, variance, standard deviation and percentiles",
            "Compute correlation and explain why correlation does not imply causation",
            "Explain sampling, the law of large numbers and the standard error",
            "Run a simple A/B test with a permutation test and interpret the p-value"
          ],
          body: String.raw`
<p>Probability goes from a known process to the data it produces ("if the coin is fair, how many heads?"). <strong>Statistics</strong> goes the other way: from observed data back to conclusions about the process ("given these flips, is the coin fair?"). In ML you use statistics to describe datasets, to judge whether a model really is better than another, and to run experiments in production. This lesson covers the essentials with code for each.</p>

<h3>Center: mean and median</h3>
<p>The <strong>mean</strong> (average) is the sum divided by the count. The <strong>median</strong> is the middle value when sorted (or the average of the two middle values). The mean uses every value's size, so a single extreme value can drag it far; the median only cares about order, so it's <em>robust</em> to outliers.</p>
<pre><code class="lang-python runnable">import numpy as np

salaries = np.array([42, 45, 47, 50, 52, 55, 58])        # thousands
print("mean:", salaries.mean().round(1), " median:", np.median(salaries))
with_ceo = np.append(salaries, 2000)                       # one CEO joins
print("mean:", with_ceo.mean().round(1), " median:", np.median(with_ceo))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean: 49.9  median: 50.0
mean: 293.6  median: 51.0</code></pre>
<p>One extra person multiplied the mean nearly six-fold but barely moved the median. When someone reports an "average" salary or house price, ask which one they mean.</p>

<h3>Spread: variance and standard deviation</h3>
<p>Two datasets can share a mean but differ wildly in spread: [49, 50, 51] versus [0, 50, 100]. The <strong>variance</strong> measures spread as the average squared distance from the mean: <code>var = (1/n) Σ (x<sub>i</sub> − mean)²</code>. Squaring makes all distances positive (and punishes far values more — the same idea as MSE). Because variance is in squared units (cm²), we usually report its square root, the <strong>standard deviation</strong> (std), which is back in the original units and can be read as "a typical distance from the mean".</p>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd

a = np.array([49, 50, 51])
b = np.array([0, 50, 100])
for name, d in [("a", a), ("b", b)]:
    by_hand = np.sqrt(np.mean((d - d.mean()) ** 2))
    print(name, "mean", d.mean(), "var", d.var().round(2), "std", d.std().round(2), "by hand", by_hand.round(2))

# the ddof trap: NumPy and pandas use different defaults
x = np.array([2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0])
print("numpy std (ddof=0):", x.std())
print("pandas std (ddof=1):", round(pd.Series(x).std(), 4))
print("numpy with ddof=1:  ", round(x.std(ddof=1), 4))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">a mean 50.0 var 0.67 std 0.82 by hand 0.82
b mean 50.0 var 1666.67 std 40.82 by hand 40.82
numpy std (ddof=0): 2.0
pandas std (ddof=1): 2.1381
numpy with ddof=1:   2.1381</code></pre>
<div class="callout warn"><strong>Common mistake — ddof:</strong> NumPy's <code>std</code> divides by <code>n</code> (the "population" formula, <code>ddof=0</code>), while pandas divides by <code>n − 1</code> (the "sample" formula, <code>ddof=1</code>), so the same data gives different answers. Dividing by n − 1 corrects for the fact that a sample's values are, on average, closer to their own mean than to the true population mean. For large datasets the difference is negligible; for small ones, be explicit with <code>ddof=</code>.</div>

<h3>Percentiles and quartiles</h3>
<p>The <strong>p-th percentile</strong> is the value below which p% of the data falls. The median is the 50th percentile; the 25th and 75th are the <strong>quartiles</strong> Q1 and Q3 (the edges of a box plot's box), and Q3 − Q1 is the <strong>interquartile range (IQR)</strong>, a robust measure of spread. Percentiles are how production systems report latency: "p99 latency = 800 ms" means 99% of requests were faster than 800 ms. The mean hides the slow tail that annoys users; the p99 exposes it.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
latency_ms = rng.lognormal(mean=4.5, sigma=0.6, size=10_000)    # right-skewed, like real latencies
p50, p90, p99 = np.percentile(latency_ms, [50, 90, 99])
print(f"mean {latency_ms.mean():.0f} ms | p50 {p50:.0f} | p90 {p90:.0f} | p99 {p99:.0f}")
q1, q3 = np.percentile(latency_ms, [25, 75])
print(f"IQR {q3 - q1:.0f} ms; slow outliers above {q3 + 1.5 * (q3 - q1):.0f} ms:",
      int((latency_ms &gt; q3 + 1.5 * (q3 - q1)).sum()))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">mean 108 ms | p50 90 | p90 194 | p99 360
IQR 76 ms; slow outliers above 250 ms: 444</code></pre>

<h3>Correlation</h3>
<p>The <strong>correlation coefficient</strong> (Pearson's r) measures how strongly two variables move together <em>in a straight line</em>, on a scale from −1 to +1:</p>
<ul>
<li>+1: perfect increasing line; −1: perfect decreasing line; 0: no linear relationship.</li>
<li>Rough guide: |r| below 0.3 is weak, 0.3–0.7 moderate, above 0.7 strong.</li>
</ul>
<p>How it works: standardize both variables (z-scores), then average their products. When both are above their means together (or below together), products are positive and r grows. Notice that this is a cosine similarity between the two centered columns — the vector lesson again!</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(1)
x = rng.normal(size=500)
y_strong = 2 * x + rng.normal(0, 0.5, 500)
y_none = rng.normal(size=500)
y_curve = x ** 2                                   # perfectly determined by x, but not a line

def pearson(a, b):
    za = (a - a.mean()) / a.std()
    zb = (b - b.mean()) / b.std()
    return np.mean(za * zb)

print("strong:", round(pearson(x, y_strong), 3), round(np.corrcoef(x, y_strong)[0, 1], 3))
print("none:  ", round(pearson(x, y_none), 3))
print("curve: ", round(pearson(x, y_curve), 3), "- correlation misses non-linear patterns")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">strong: 0.961 0.961
none:   0.033
curve:  -0.017 - correlation misses non-linear patterns</code></pre>

<h3>Correlation is not causation</h3>
<p>A strong correlation tells you two variables move together. It does <em>not</em> tell you that one causes the other. Common reasons for correlation without causation:</p>
<ul>
<li><strong>A confounder</strong> — a hidden third variable driving both. Ice-cream sales and drowning deaths are correlated because hot weather increases both. Banning ice cream would not save swimmers.</li>
<li><strong>Reverse causation</strong> — the arrow points the other way. Hospitals have more sick people than homes, but hospitals don't cause sickness.</li>
<li><strong>Coincidence</strong> — with enough variables, some will correlate by pure chance.</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(2)
temperature = rng.uniform(10, 35, size=365)                       # the confounder
ice_cream = 20 * temperature + rng.normal(0, 60, 365)
drownings = 0.3 * temperature + rng.normal(0, 1.5, 365)
print("corr(ice cream, drownings):", round(np.corrcoef(ice_cream, drownings)[0, 1], 3))

# compare only days with similar temperature: the link mostly disappears
hot = (temperature &gt; 28) &amp; (temperature &lt; 32)
print("same corr on 28-32 C days only:", round(np.corrcoef(ice_cream[hot], drownings[hot])[0, 1], 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">corr(ice cream, drownings): 0.739
same corr on 28-32 C days only: 0.145</code></pre>
<p>Holding the confounder (roughly) fixed makes the correlation collapse. ML models are correlation machines: they learn any pattern that predicts the target, causal or not. That's fine for prediction, but dangerous if you use a model to decide what to <em>change</em>. To establish causation you need a controlled experiment — an A/B test.</p>

<h3>Sampling and the law of large numbers</h3>
<p>We almost never see a whole <strong>population</strong> (every customer who will ever exist); we see a <strong>sample</strong>. A statistic computed from a sample (the sample mean) is an <em>estimate</em> of the population value, and it varies from sample to sample. The <strong>law of large numbers</strong> says that as the sample grows, the sample mean gets closer and closer to the true mean. The typical error of a sample mean is the <strong>standard error</strong>: <code>SE = σ / √n</code>. Note the square root: to halve your error you need four times as much data.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(5)
true_rate = 0.30                                   # 30% of all users click
for n in [10, 100, 1_000, 10_000, 100_000]:
    estimates = [(rng.random(n) &lt; true_rate).mean() for _ in range(200)]   # 200 repeated samples
    se_theory = np.sqrt(true_rate * (1 - true_rate) / n)
    print(f"n={n:7d}  one estimate {estimates[0]:.4f}  spread of estimates {np.std(estimates):.4f}  theory {se_theory:.4f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">n=     10  one estimate 0.4000  spread of estimates 0.1580  theory 0.1449
n=    100  one estimate 0.3000  spread of estimates 0.0440  theory 0.0458
n=   1000  one estimate 0.3070  spread of estimates 0.0130  theory 0.0145
n=  10000  one estimate 0.2966  spread of estimates 0.0042  theory 0.0046
n= 100000  one estimate 0.2994  spread of estimates 0.0014  theory 0.0014</code></pre>
<p>With 10 users, an estimate can easily be 0.1 or 0.5 — wildly off. With 100,000 it's within about 0.1% of the truth. The measured spread of estimates matches the standard-error formula. This is why a model evaluated on a test set of 50 examples tells you little: its accuracy has a large standard error.</p>
<div class="callout info"><strong>The central limit theorem (in one sentence):</strong> averages of many independent random values are approximately <em>normally</em> distributed, whatever the original distribution looked like — which is why the normal curve and the "±2 standard errors ≈ 95%" rule show up everywhere in statistics.</div>

<h3>Hypothesis testing intuition: an A/B test</h3>
<p>Your team changes the "Buy" button colour. Version A (old) gets 1,000 visitors and 100 purchases (10.0%); version B (new) gets 1,000 visitors and 125 purchases (12.5%). Is B really better, or could a 2.5-point gap happen by luck? <strong>Hypothesis testing</strong> answers this:</p>
<ol>
<li>Assume the boring explanation — the <strong>null hypothesis</strong>: the button makes no difference; both groups share one true rate.</li>
<li>Ask: if the null were true, how often would random chance alone produce a gap at least as big as the one we saw? That probability is the <strong>p-value</strong>.</li>
<li>If the p-value is small (a common threshold is 0.05), the data would be surprising under the null, so we reject it and call the result <strong>statistically significant</strong>.</li>
</ol>
<p>A <strong>permutation test</strong> computes the p-value by brute force, no formulas: if the button doesn't matter, the A/B labels are arbitrary, so shuffle them many times and see how often a shuffled gap is as big as the real one.</p>
<pre><code class="lang-python runnable">import numpy as np

rng = np.random.default_rng(0)
a = np.r_[np.ones(100), np.zeros(900)]       # 100 buyers out of 1000
b = np.r_[np.ones(125), np.zeros(875)]       # 125 buyers out of 1000
observed = b.mean() - a.mean()

pooled = np.concatenate([a, b])
diffs = np.empty(10_000)
for i in range(10_000):
    shuffled = rng.permutation(pooled)       # pretend labels don't matter
    diffs[i] = shuffled[1000:].mean() - shuffled[:1000].mean()

p_value = np.mean(np.abs(diffs) &gt;= abs(observed))      # two-sided
print(f"observed lift: {observed:.3f}")
print(f"p-value: {p_value:.3f}")
print("significant at 0.05:", p_value &lt; 0.05)

# same lift with 10x more traffic
# (a chi-square test is a classic formula-based test for comparing proportions)
from scipy import stats
table = [[1250, 8750], [1000, 9000]]
print("with 10x traffic, chi-square p-value:", f"{stats.chi2_contingency(table)[1]:.2e}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">observed lift: 0.025
p-value: 0.085
significant at 0.05: False
with 10x traffic, chi-square p-value: 2.52e-08</code></pre>
<p>With 1,000 visitors per arm, a gap this big shows up by chance roughly 8–9% of the time — not quite below the 0.05 threshold, so the honest conclusion is "promising, but not yet conclusive; collect more data". With ten times the traffic, the same 2.5-point lift becomes overwhelmingly significant (a p-value far below 0.001). Sample size matters as much as effect size.</p>
<div class="callout warn"><strong>Common mistakes with p-values:</strong> (1) A p-value is <em>not</em> the probability that B is better; it's the probability of data this extreme <em>if there were no difference</em>. (2) "Not significant" doesn't mean "no effect" — it may mean not enough data. (3) Peeking at results every hour and stopping when p &lt; 0.05 inflates false positives; decide the sample size in advance. (4) Statistically significant isn't always practically important: with millions of users, a 0.01% lift can be "significant" but worthless.</div>
<p>The same thinking applies when comparing ML models: if model B beats model A by 0.5% accuracy on a small test set, ask whether that difference is larger than the noise — a question you can answer with the same permutation idea.</p>
<div class="callout book"><strong>Further study:</strong> <em>Practical Statistics for Data Scientists</em> (Bruce, Bruce &amp; Gedeck), Ch. 1 "Exploratory Data Analysis" and Ch. 3 "Statistical Experiments and Significance Testing".</div>
`,
          keyPoints: [
            "The mean is sensitive to outliers; the median is robust. Report both for skewed data.",
            "Variance is the mean squared deviation; std is its square root in original units. NumPy uses ddof=0, pandas ddof=1.",
            "Percentiles (p50, p90, p99) and the IQR describe skewed data and tails better than the mean.",
            "Pearson correlation measures linear association from -1 to 1; it misses curves and never proves causation (confounders, reverse causation).",
            "Sample estimates get more precise with n (standard error = sigma / sqrt(n)); a p-value is the chance of a result this extreme if there were no real difference."
          ],
          exercise: {
            prompt: String.raw`<p>Two versions of a model were compared on the same kind of traffic. Model A was correct on 830 of 1,000 test cases and model B on 851 of 1,000 (different random cases). (1) Compute each accuracy and the standard error of each (<code>sqrt(p(1-p)/n)</code>). (2) Run a permutation test with 10,000 shuffles (seed 0) for the difference. (3) Decide whether you'd claim B is better.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np

a = np.r_[np.ones(830), np.zeros(170)]
b = np.r_[np.ones(851), np.zeros(149)]
for name, d in [("A", a), ("B", b)]:
    p = d.mean()
    print(f"{name}: accuracy {p:.3f}  standard error {np.sqrt(p * (1 - p) / len(d)):.4f}")

observed = b.mean() - a.mean()
rng = np.random.default_rng(0)
pooled = np.concatenate([a, b])
diffs = np.array([np.diff([s[:1000].mean(), s[1000:].mean()])[0]
                  for s in (rng.permutation(pooled) for _ in range(10_000))])
p_value = np.mean(np.abs(diffs) &gt;= abs(observed))
print(f"difference {observed:.3f}, p-value {p_value:.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">A: accuracy 0.830  standard error 0.0119
B: accuracy 0.851  standard error 0.0113
difference 0.021, p-value 0.222</code></pre>
<p>Each accuracy has a standard error of about 1.2 percentage points, and the gap is only 2.1 points. The permutation test gives a p-value around 0.2: a difference this large would appear by chance roughly one time in five even if the models were equally good. You should <em>not</em> claim B is better yet — evaluate on a larger test set (or on the same test cases for both models, which removes much of the noise).</p>`
          },
          quiz: [
            { q: "House prices in a town: most are 200k-400k but a few mansions sell for 5M. Which is the better 'typical price'?", options: ["Mean", "Median", "Maximum", "Variance"], answer: 1, explain: "The median is robust to the few extreme values that would drag the mean upward." },
            { q: "np.std(x) and pd.Series(x).std() give slightly different answers. Why?", options: ["A bug in pandas", "NumPy divides by n (ddof=0) while pandas divides by n-1 (ddof=1)", "pandas rounds the values", "NumPy ignores the first value"], answer: 1, explain: "They use different degrees-of-freedom defaults; pass ddof explicitly to match them." },
            { q: "Cities with more firefighters have more fire damage. What's the most sensible interpretation?", options: ["Firefighters cause damage", "A confounder (city size / number of fires) drives both", "The data must be wrong", "Correlation proves causation here"], answer: 1, explain: "Bigger cities and more fires lead to both more firefighters and more damage. Correlation alone can't show causation." },
            { q: "To halve the standard error of an estimated mean you need roughly…", options: ["Twice the data", "Four times the data", "Half the data", "The same data with a different seed"], answer: 1, explain: "SE = sigma / sqrt(n); halving it requires sqrt(n) to double, so n must quadruple." },
            { q: "An A/B test gives p = 0.30. What is the correct reading?", options: ["B is better with 70% probability", "If there were no real difference, a gap this large would occur about 30% of the time by chance; the evidence is weak", "A is better", "There is definitely no difference"], answer: 1, explain: "A p-value is the probability of data this extreme under the null hypothesis; 0.30 is not small, so the result is inconclusive — not proof of no effect." }
          ]
        }
      ]
    },
    {
      id: "pyai-project",
      title: "Mini Project: Exploratory Data Analysis",
      summary: "Put the whole track together: load, clean, summarize, visualize and write up a real dataset, ending with a shortlist of predictive features for the ML track.",
      lessons: [
        {
          id: "pyai-project-eda",
          title: "Project: Full EDA of the Breast Cancer Dataset",
          minutes: 120,
          objectives: [
            "Run a complete, reproducible EDA workflow on a real dataset",
            "Check data quality (types, missing values, duplicates, impossible values) and document it",
            "Quantify and visualize which features separate the classes, and spot redundant features",
            "Write a short findings report that justifies a feature shortlist for modelling"
          ],
          body: String.raw`
<p>This project ties together everything in the track: NumPy for computation, pandas for wrangling, matplotlib and seaborn for plots, and statistics for judging what you see. You'll perform the kind of <strong>exploratory data analysis</strong> a data scientist does in the first days of a real project, on the breast cancer Wisconsin dataset that ships with scikit-learn. At the end you'll have a written set of findings and a shortlist of features to model — which is exactly where the ML track picks up.</p>

<h3>The scenario</h3>
<p>A hospital research group wants to know whether measurements taken from a digitized image of a breast-mass biopsy can help distinguish <strong>malignant</strong> (cancerous) from <strong>benign</strong> tumours. Each of the 569 rows describes one sample. For each cell nucleus in the image, ten characteristics were measured (radius, texture, perimeter, area, smoothness, compactness, concavity, concave points, symmetry, fractal dimension), and for each characteristic the dataset reports three numbers: the <em>mean</em> over the nuclei, the <em>standard error</em> ("error"), and the <em>worst</em> (mean of the three largest values). That's 30 features. Your job is not to build a model yet — it's to understand the data well enough to build a good one.</p>

<div class="callout info"><strong>How to work through this project:</strong> run each step yourself, look at the saved PNG files, and write down your own observations before reading ours. EDA is a skill of <em>noticing</em>; you only get better at it by doing it. Every step below is runnable on its own, so each block reloads the data — in a notebook you would load once and keep going.</div>

<h3>Step 1 — Load and get oriented</h3>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_breast_cancer

bc = load_breast_cancer(as_frame=True)
df = bc.frame.copy()
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})

print("shape:", df.shape)
print("first feature names:", bc.feature_names[:4].tolist())
measured = {n.replace("mean ", "").replace("worst ", "").replace(" error", "") for n in bc.feature_names}
print("characteristics measured:", sorted(measured))
print(df["diagnosis"].value_counts())
print(df["diagnosis"].value_counts(normalize=True).round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shape: (569, 32)
first feature names: ['mean radius', 'mean texture', 'mean perimeter', 'mean area']
characteristics measured: ['area', 'compactness', 'concave points', 'concavity', 'fractal dimension', 'perimeter', 'radius', 'smoothness', 'symmetry', 'texture']
diagnosis
benign       357
malignant    212
Name: count, dtype: int64
diagnosis
benign       0.627
malignant    0.373
Name: proportion, dtype: float64</code></pre>
<p><strong>Observation:</strong> 569 samples, 30 numeric features plus the target. The classes are moderately imbalanced: about 63% benign and 37% malignant. That matters later: a lazy model that always says "benign" would be 63% accurate, so 63% is the <em>baseline</em> any real model must beat. Note also the label coding: <code>target = 1</code> means <em>benign</em>, which is easy to get backwards. We created a readable <code>diagnosis</code> column to avoid confusion.</p>

<h3>Step 2 — Data quality checks</h3>
<p>Before trusting any statistics, check types, missing values, duplicates and impossible values. All of these features are physical measurements, so none should be negative.</p>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
features = df.drop(columns="target")

print("dtypes:", features.dtypes.astype(str).value_counts().to_dict())
print("missing values:", int(df.isna().sum().sum()))
print("duplicate rows:", int(df.duplicated().sum()))
print("negative values:", int((features &lt; 0).sum().sum()))
zeros = (features == 0).sum()
print("columns containing zeros:")
print(zeros[zeros &gt; 0])
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">dtypes: {'float64': 30}
missing values: 0
duplicate rows: 0
negative values: 0
columns containing zeros:
mean concavity          13
mean concave points     13
concavity error         13
concave points error    13
worst concavity         13
worst concave points    13
dtype: int64</code></pre>
<p><strong>Observation:</strong> all features are floats, with no missing values, no duplicate rows and no negative values. This is an unusually clean dataset — real-world data rarely is, and you'd spend much longer on this step. The only oddity is 13 samples with zero concavity and zero concave points. Is that an error? Concavity measures how much the nucleus outline curves inward; a perfectly convex (smooth, rounded) outline would genuinely give zero. So these zeros are plausible, and we keep them — but we note the decision. Documenting such judgment calls is part of good EDA.</p>

<h3>Step 3 — Summary statistics and scale</h3>
<pre><code class="lang-python runnable">import pandas as pd
from sklearn.datasets import load_breast_cancer

pd.set_option("display.width", 120)
pd.set_option("display.max_columns", None)
df = load_breast_cancer(as_frame=True).frame
features = df.drop(columns="target")
summary = features.describe().T[["mean", "std", "min", "50%", "max"]]
summary["mean/median"] = (summary["mean"] / summary["50%"]).round(2)
print(summary.loc[["mean radius", "mean area", "mean smoothness", "area error", "worst area"]].round(3))
print("largest std:", features.std().idxmax(), round(features.std().max(), 1))
print("smallest std:", features.std().idxmin(), round(features.std().min(), 5))
print("most right-skewed (mean/median):")
print(summary["mean/median"].sort_values(ascending=False).head(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">                    mean      std      min      50%       max  mean/median
mean radius       14.127    3.524    6.981   13.370    28.110         1.06
mean area        654.889  351.914  143.500  551.100  2501.000         1.19
mean smoothness    0.096    0.014    0.053    0.096     0.163         1.01
area error        40.337   45.491    6.802   24.530   542.200         1.64
worst area       880.583  569.357  185.200  686.500  4254.000         1.28
largest std: worst area 569.4
smallest std: fractal dimension error 0.00265
most right-skewed (mean/median):
area error             1.64
mean concave points    1.46
mean concavity         1.44
Name: mean/median, dtype: float64</code></pre>
<p><strong>Observation:</strong> feature scales differ enormously — <code>worst area</code> has a standard deviation in the hundreds while <code>fractal dimension error</code> varies in the thousandths. Any distance-based or gradient-based model will need <strong>standardization</strong>. Several "error" features have a mean well above the median (area error, mean concave points and mean concavity are the most skewed), meaning long right tails; a log transform might help some models.</p>

<h3>Step 4 — Distributions by class</h3>
<p>Now the key question: which features look different for malignant versus benign samples? Start visually with a grid of histograms, coloured by diagnosis, for the ten "mean" features.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})
mean_cols = [c for c in df.columns if c.startswith("mean ")]

fig, axes = plt.subplots(2, 5, figsize=(18, 7))
for ax, col in zip(axes.ravel(), mean_cols):
    sns.histplot(data=df, x=col, hue="diagnosis", bins=25, element="step", stat="density",
                 common_norm=False, ax=ax, legend=(col == mean_cols[0]))
    ax.set_title(col)
    ax.set_xlabel("")
fig.suptitle("Distributions of the 'mean' features by diagnosis")
fig.tight_layout()
fig.savefig("eda_histograms.png", dpi=90)
plt.close(fig)
print("saved eda_histograms.png with", len(mean_cols), "panels")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">saved eda_histograms.png with 10 panels</code></pre>
<p><code>stat="density"</code> with <code>common_norm=False</code> scales each class's histogram to the same total area, so the smaller malignant class isn't visually drowned out — an important choice with imbalanced classes. <strong>What you should see:</strong> radius, perimeter, area, concavity and concave points show clearly shifted humps (malignant to the right); smoothness, symmetry and fractal dimension overlap almost completely.</p>

<h3>Step 5 — Quantifying separation</h3>
<p>Eyeballing 30 histograms is error-prone, so let's turn "how well does a feature separate the classes?" into numbers. We'll use two measures:</p>
<ul>
<li><strong>Standardized mean difference</strong> (also called Cohen's d): the gap between the class means divided by the pooled standard deviation. A value of 0.2 is small, 0.8 large, and above 2 the distributions barely overlap.</li>
<li><strong>Correlation with the target</strong>: since target is 0/1, this is the "point-biserial" correlation. Negative here means "higher values go with malignant" (because malignant = 0).</li>
</ul>
<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
features = df.drop(columns="target")
mal, ben = features[df["target"] == 0], features[df["target"] == 1]

pooled_sd = np.sqrt((mal.var() + ben.var()) / 2)
scores = pd.DataFrame({
    "malignant_mean": mal.mean(),
    "benign_mean": ben.mean(),
    "effect_size": (mal.mean() - ben.mean()) / pooled_sd,
    "corr_with_target": features.corrwith(df["target"]),
}).sort_values("effect_size", ascending=False)

pd.set_option("display.width", 120)
pd.set_option("display.max_columns", None)
print(scores.head(8).round(3))
print("...")
print(scores.tail(4).round(3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">                      malignant_mean  benign_mean  effect_size  corr_with_target
worst concave points           0.182        0.074        2.604            -0.794
worst perimeter              141.370       87.006        2.372            -0.783
mean concave points            0.088        0.026        2.325            -0.777
worst radius                  21.135       13.380        2.324            -0.776
mean perimeter               115.365       78.075        2.123            -0.743
mean radius                   17.463       12.147        2.051            -0.730
worst area                  1422.286      558.899        1.970            -0.734
mean concavity                 0.161        0.046        1.871            -0.696
...
                        malignant_mean  benign_mean  effect_size  corr_with_target
symmetry error                   0.020        0.021       -0.013             0.007
texture error                    1.211        1.220       -0.018             0.008
mean fractal dimension           0.063        0.063       -0.026             0.013
smoothness error                 0.007        0.007       -0.140             0.067</code></pre>
<p><strong>Observation:</strong> the strongest separators are the size and shape-irregularity features, especially the "worst" versions: worst concave points, worst perimeter, mean concave points and worst radius have effect sizes above 2 (classes barely overlap) and correlations with the target around −0.73 to −0.79. At the bottom, a few features (fractal dimension, smoothness error, texture error, symmetry error) have near-zero effect: on their own they carry almost no information about diagnosis. Interestingly, <code>mean fractal dimension</code> and some error features have slightly <em>negative</em> effect sizes — slightly higher in benign samples — but too small to matter.</p>

<h3>Step 6 — Redundancy: correlated features</h3>
<p>Several of the top features measure nearly the same thing (radius, perimeter and area are geometrically linked). Let's find highly correlated pairs.</p>
<pre><code class="lang-python runnable">import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
corr = df.drop(columns="target").corr()

upper = corr.where(np.triu(np.ones(corr.shape, dtype=bool), k=1))   # each pair once
pairs = upper.stack().sort_values(ascending=False)
print("pairs with |r| &gt; 0.95:", int((pairs.abs() &gt; 0.95).sum()))
print(pairs.head(6).round(3))

mean_cols = [c for c in df.columns if c.startswith("mean ")]
fig, ax = plt.subplots(figsize=(9, 7.5))
sns.heatmap(df[mean_cols].corr(), cmap="coolwarm", vmin=-1, vmax=1, annot=True, fmt=".1f", ax=ax)
ax.set_title("Correlation between the 'mean' features")
fig.tight_layout()
fig.savefig("eda_correlation.png", dpi=90)
plt.close(fig)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">pairs with |r| &gt; 0.95: 15
mean radius      mean perimeter     0.998
worst radius     worst perimeter    0.994
mean radius      mean area          0.987
mean perimeter   mean area          0.987
worst radius     worst area         0.984
worst perimeter  worst area         0.978
dtype: float64</code></pre>
<p>The <code>np.triu(..., k=1)</code> mask keeps only the upper triangle of the correlation matrix (above the diagonal), so each pair appears once and self-correlations of 1.0 are skipped. <strong>Observation:</strong> radius, perimeter and area (mean and worst versions) are almost perfectly correlated with one another (r ≈ 0.99+). Keeping all of them adds little information, and for linear models it causes unstable coefficients (multicollinearity). A sensible shortlist keeps one representative per group.</p>

<h3>Step 7 — Two features at a time</h3>
<p>A strong pair of <em>non-redundant</em> features can separate classes better than either alone. Let's plot a size feature against a shape feature.</p>
<pre><code class="lang-python runnable">import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
df["diagnosis"] = df["target"].map({0: "malignant", 1: "benign"})

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
sns.scatterplot(data=df, x="worst radius", y="worst concave points", hue="diagnosis",
                alpha=0.6, s=25, ax=axes[0])
axes[0].set_title("Size vs shape irregularity")
sns.boxplot(data=df, x="diagnosis", y="worst texture", hue="diagnosis", ax=axes[1])
axes[1].set_title("Texture by diagnosis")
fig.tight_layout()
fig.savefig("eda_pairs.png", dpi=90)
plt.close(fig)
print("corr(worst radius, worst concave points):",
      round(df["worst radius"].corr(df["worst concave points"]), 3))
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">corr(worst radius, worst concave points): 0.787</code></pre>
<p><strong>What you should see:</strong> in the scatter plot, benign samples cluster in the lower-left (small and smooth) and malignant samples spread to the upper-right, with a fairly narrow zone of overlap. The two features are correlated (≈0.79) but not redundant — each adds some information. The box plot shows texture is higher for malignant tumours but with considerable overlap: a supporting feature, not a star.</p>

<h3>Step 8 — A sanity-check "model" with one threshold</h3>
<p>Before the ML track, a quick reality check: how far can a single feature and a single cut-off go? We pick the threshold on <code>worst concave points</code> that maximizes accuracy. To keep ourselves honest, we choose the threshold on a random 70% of the data and measure accuracy on the other 30% — a preview of the train/test split.</p>
<pre><code class="lang-python runnable">import numpy as np
from sklearn.datasets import load_breast_cancer

df = load_breast_cancer(as_frame=True).frame
rng = np.random.default_rng(0)
idx = rng.permutation(len(df))
train, test = df.iloc[idx[:400]], df.iloc[idx[400:]]

col = "worst concave points"
candidates = np.linspace(df[col].min(), df[col].max(), 200)
# rule: predict malignant (0) when the value is above the threshold, else benign (1)
train_acc = [((train[col] &lt;= t).astype(int) == train["target"]).mean() for t in candidates]
best_t = candidates[int(np.argmax(train_acc))]

test_pred = (test[col] &lt;= best_t).astype(int)
print(f"best threshold (from training rows): {best_t:.4f}")
print(f"training accuracy: {max(train_acc):.3f}")
print(f"test accuracy:     {(test_pred == test['target']).mean():.3f}")
print(f"baseline (always benign) on test: {(test['target'] == 1).mean():.3f}")
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best threshold (from training rows): 0.1462
training accuracy: 0.915
test accuracy:     0.911
baseline (always benign) on test: 0.615</code></pre>
<p>A single hand-picked rule beats the always-benign baseline by a wide margin. That confirms the EDA: this feature is genuinely predictive. A proper model combining several non-redundant features should do better still — that's the job of the ML track. In medicine, though, accuracy isn't the whole story: missing a malignant tumour (a false negative) is far worse than a false alarm, so you'd later tune the threshold to catch more malignant cases and evaluate with recall and precision.</p>

<h3>Step 9 — Write up the findings</h3>
<p>EDA isn't finished until it's communicated. A short, structured write-up is what your team (or your future self) will actually read. Here's an example:</p>
<div class="callout tip"><strong>EDA findings — Breast Cancer Wisconsin (569 samples, 30 features)</strong>
<ul>
<li><strong>Target:</strong> 357 benign (62.7%), 212 malignant (37.3%). Baseline accuracy 63%. Label coding: 1 = benign. Because false negatives are costly, evaluation should emphasise recall on the malignant class.</li>
<li><strong>Data quality:</strong> no missing values, duplicates or negative values. 13 samples have zero concavity and concave points; judged physically plausible (convex outlines) and kept.</li>
<li><strong>Scale:</strong> feature scales range from about 0.001 to over 500; standardize before distance- or gradient-based models. Several "error" features are right-skewed; consider log transforms.</li>
<li><strong>Predictive features:</strong> size (radius/perimeter/area) and shape irregularity (concave points/concavity) separate the classes strongly, with the "worst" variants strongest (effect sizes above 2, |r| with target about 0.73–0.79). Texture is moderately useful. Smoothness error, texture error, symmetry error and fractal dimension features carry little signal on their own.</li>
<li><strong>Redundancy:</strong> radius, perimeter and area are near-duplicates (r ≈ 0.99); keep one per group for linear models or use regularization.</li>
<li><strong>Sanity check:</strong> a one-feature threshold on worst concave points reached roughly 90% test accuracy versus 63% baseline.</li>
<li><strong>Proposed starting shortlist:</strong> worst radius, worst concave points, worst texture, mean concavity, worst smoothness, worst symmetry — then compare against a model on all 30 standardized features.</li>
</ul></div>

<div class="callout warn"><strong>Common EDA pitfalls:</strong> (1) Doing EDA on the full dataset and then reusing insights to tune choices on the test set — in a real project, set aside a test set <em>first</em> and explore only the training portion. (2) Confusing label codes (here 1 = benign). (3) Treating "low correlation with the target" as "useless": a feature can matter in combination with others or in a non-linear way. (4) Plotting everything but writing nothing down; the write-up is the deliverable.</div>
<div class="callout book"><strong>Further study:</strong> <em>Practical Statistics for Data Scientists</em>, Ch. 1 "Exploratory Data Analysis"; <em>Python for Data Analysis</em>, Ch. 13 "Data Analysis Examples".</div>
`,
          keyPoints: [
            "EDA workflow: load and orient, check quality, summarize scale and skew, compare distributions by class, quantify separation, check redundancy, sanity-check, write up.",
            "Always compute the majority-class baseline; a model is only useful if it beats it.",
            "Effect size (difference of class means / pooled std) and correlation with the target turn visual impressions into rankable numbers.",
            "Near-duplicate features (|r| > 0.95) add little information and can destabilize linear models.",
            "Document judgment calls (like keeping plausible zeros) and finish with a written findings summary and feature shortlist."
          ],
          exercise: {
            prompt: String.raw`<p>Repeat the core of this EDA on the <strong>wine</strong> dataset (<code>load_wine(as_frame=True)</code>, 3 classes). (1) Report the shape, class counts and the majority-class baseline. (2) Check for missing values and duplicates. (3) For a multi-class problem, rank features by the <strong>ratio of between-class variance to within-class variance</strong> (the "F-ratio" idea): <code>var of class means</code> divided by <code>mean of within-class variances</code>. Print the top 5. (4) Find the most correlated pair of features. (5) Save a scatter plot of the top two features coloured by class, and write three sentences of findings.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_wine

df = load_wine(as_frame=True).frame
X = df.drop(columns="target")
print("shape:", df.shape)
counts = df["target"].value_counts().sort_index()
print("class counts:", counts.to_dict(), "| baseline:", round(counts.max() / len(df), 3))
print("missing:", int(df.isna().sum().sum()), "| duplicates:", int(df.duplicated().sum()))

grouped = df.groupby("target")
between = grouped.mean().var()               # how far apart the class means are
within = grouped.var().mean()                # how spread out each class is internally
f_ratio = (between / within).sort_values(ascending=False)
print(f_ratio.head(5).round(2))

corr = X.corr()
upper = corr.where(np.triu(np.ones(corr.shape, dtype=bool), k=1)).stack()
print("most correlated pair:", upper.abs().idxmax(), round(upper[upper.abs().idxmax()], 3))

top2 = f_ratio.index[:2]
fig, ax = plt.subplots(figsize=(6, 4.5))
sns.scatterplot(data=df, x=top2[0], y=top2[1], hue="target", palette="deep", ax=ax)
ax.set_title("Wine: two most separating features")
fig.tight_layout()
fig.savefig("wine_top2.png")
plt.close(fig)
</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">shape: (178, 14)
class counts: {0: 59, 1: 71, 2: 48} | baseline: 0.399
missing: 0 | duplicates: 0
flavanoids                      4.95
od280/od315_of_diluted_wines    3.93
proline                         3.47
hue                             2.09
alcohol                         2.08
dtype: float64
most correlated pair: ('total_phenols', 'flavanoids') 0.865</code></pre>
<p><strong>Example findings:</strong> The wine data has 178 samples in 3 classes (59/71/48), so the majority baseline is about 40%; it has no missing values or duplicates. Flavanoids, proline and OD280/OD315 have the highest between-to-within variance ratios, meaning their class means are far apart relative to the spread inside each class, so they are the most promising features. Flavanoids and total phenols are strongly correlated (about 0.86), so they partly carry the same information, and the large scale differences (proline is in the hundreds) mean features should be standardized before modelling.</p>
<p>The F-ratio you computed by hand is the idea behind scikit-learn's <code>f_classif</code> feature-scoring function, which you'll meet in the ML track.</p>`
          },
          quiz: [
            { q: "In the breast cancer data, 62.7% of samples are benign. What does this imply for evaluating models?", options: ["Any model above 50% accuracy is good", "A model must beat about 63% accuracy (always predicting benign) to be useful", "Accuracy cannot be used", "The data must be balanced first"], answer: 1, explain: "The majority-class baseline is the minimum bar; a trivial classifier already achieves it." },
            { q: "Why did the histograms use stat='density' with common_norm=False?", options: ["To make them faster", "So each class is scaled to the same area and the smaller class isn't visually swamped", "To remove outliers", "To standardize the features"], answer: 1, explain: "With imbalanced classes, raw counts make the larger class dominate; normalizing each class separately allows a fair shape comparison." },
            { q: "Mean radius, mean perimeter and mean area have pairwise correlations around 0.99. What is the best interpretation?", options: ["They are three independent strong signals", "They are near-duplicates of the same information; one representative is usually enough", "They should all be deleted", "Correlation proves radius causes area"], answer: 1, explain: "Highly correlated features are redundant; keeping one per group (or regularizing) avoids multicollinearity." },
            { q: "Why was the threshold chosen on 70% of the rows and accuracy reported on the other 30%?", options: ["To make the code faster", "To get an honest estimate of performance on data not used for choosing the rule", "Because the threshold must be in the test set", "It makes accuracy higher"], answer: 1, explain: "Measuring on the same data used to pick the rule is optimistic; held-out data gives an unbiased estimate — the train/test split idea." }
          ]
        }
      ]
    }
  ]
});
