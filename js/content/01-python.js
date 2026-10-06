window.COURSE = window.COURSE || { tracks: [] };
window.COURSE.tracks.push({
  id: "python",
  order: 1,
  title: "Python Programming Fundamentals",
  level: "Beginner",
  icon: "🐍",
  description: "Start from zero and learn the Python language plus the everyday developer tools (terminal, Git, HTTP APIs, Docker) that every AI/ML engineer relies on.",
  outcomes: [
    "Install Python, create virtual environments and manage packages with pip",
    "Write Python programs using variables, conditions, loops, functions and classes",
    "Choose and use lists, tuples, dictionaries and sets to organise data",
    "Read and write text, CSV and JSON files and handle errors gracefully",
    "Organise code into modules, test it with assert and pytest, and debug it by reading tracebacks",
    "Use the command line, environment variables, Git/GitHub, HTTP APIs and Docker with confidence",
    "Recognise the fit/predict class pattern used by machine learning libraries"
  ],
  modules: [
    {
      id: "py-start",
      title: "Getting Started",
      summary: "Understand what programming is, why Python powers AI, and set up a professional Python environment on your own computer.",
      lessons: [
        {
          id: "py-start-why",
          title: "What Programming Is and Why Python Rules AI",
          minutes: 35,
          objectives: [
            "Explain in plain words what a program, a programming language and an interpreter are",
            "Describe why Python became the main language of AI and machine learning",
            "Read and run a tiny Python program and predict what it prints",
            "Use print() and comments in your own first lines of code"
          ],
          body: String.raw`
<h3>What is a program?</h3>
<p>A <strong>program</strong> is a list of instructions that a computer follows, one after another, exactly as written. The best everyday analogy is a <strong>recipe</strong>. A recipe says "crack two eggs, add 100 g of flour, stir for one minute". A cook follows the steps in order. A computer is like an extremely fast, extremely literal cook: it never gets tired and never gets bored, but it also never guesses what you <em>meant</em>. If the recipe says "add salt" but forgets to say how much, a human cook improvises; a computer stops and reports an error.</p>
<p>That literal-mindedness is the first big idea of programming. When something goes wrong, it is almost never because the computer is "being stupid" — it did precisely what the instructions said. Learning to program is learning to write instructions that are precise enough for a machine.</p>

<h3>What is a programming language?</h3>
<p>Computers internally only understand very low-level operations on numbers (machine code). Humans find that unreadable, so we write instructions in a <strong>programming language</strong>: a small, strict, human-readable language with exact rules (called <strong>syntax</strong>). Python is one such language. Here is a complete Python program:</p>
<pre><code class="lang-python runnable">print("Hello, AI world!")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Hello, AI world!</code></pre>
<p><code>print</code> is a built-in <strong>function</strong> — a named action that Python already knows how to perform. The parentheses hold what you give to the function, and the quotes mark a piece of text (called a <strong>string</strong>). Run it and the text appears on screen.</p>

<h3>Interpreters: how Python code actually runs</h3>
<p>Python is an <strong>interpreted</strong> language. A separate program called the <strong>Python interpreter</strong> reads your code from top to bottom and carries out each line. Think of the interpreter as a live translator at a meeting: you speak a sentence, the translator immediately says it in the other language. Some other languages (such as C or Rust) are <strong>compiled</strong>: the whole program is translated into machine code ahead of time, like translating an entire book before anyone reads it. Interpreted languages are a little slower but much quicker to experiment with — you can type a line and see the result instantly, which is perfect for exploring data.</p>
<p>When people say "install Python", they mean "install the Python interpreter" — the program that runs <code>.py</code> files. You will do that in the next lesson.</p>

<h3>Programs run top to bottom</h3>
<p>The interpreter executes statements in order. Each line below runs only after the previous one finishes:</p>
<pre><code class="lang-python runnable"># Lines starting with # are comments: notes for humans, ignored by Python.
print("Step 1: load the data")
print("Step 2: train the model")
print("Step 3: report accuracy")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Step 1: load the data
Step 2: train the model
Step 3: report accuracy</code></pre>
<p>A <strong>comment</strong> starts with <code>#</code> and runs to the end of the line. Python ignores it completely. Use comments to explain <em>why</em> you did something; your future self will thank you.</p>

<h3>A first taste of computation</h3>
<p>Programs do not only print fixed text; they compute. Suppose a machine learning model was tested three times and scored 0.82, 0.91 and 0.87. The average is what a data scientist would report:</p>
<pre><code class="lang-python runnable">scores = [0.82, 0.91, 0.87]          # a list of three numbers
average = sum(scores) / len(scores)   # total divided by how many
print("Average score:", round(average, 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Average score: 0.87</code></pre>
<p>Don't worry about every detail yet. Notice the shape: we stored data under a name (<code>scores</code>), computed something new from it (<code>average</code>), and displayed the result. Almost every AI program, however large, has this shape: <strong>get data → transform it → output a result</strong>. Over the next lessons you will learn each piece properly: variables, lists, functions such as <code>sum</code>, <code>len</code> and <code>round</code>, and much more.</p>

<h3>Why Python dominates AI and machine learning</h3>
<p>There are hundreds of programming languages. Python is the one used by almost every AI researcher, data scientist and ML engineer. The reasons are practical:</p>
<ul>
  <li><strong>Readability.</strong> Python reads almost like English. <code>if score &gt; 0.9: print("great")</code> is understandable even before you have learned the rules. Researchers whose main job is mathematics, not software, can still write it.</li>
  <li><strong>The ecosystem.</strong> A <strong>library</strong> (also called a <strong>package</strong>) is reusable code written by someone else that you can install and use. Python has the libraries that define modern AI: <em>NumPy</em> (fast arrays of numbers), <em>pandas</em> (tables of data), <em>scikit-learn</em> (classic machine learning), <em>PyTorch</em> and <em>TensorFlow</em> (deep learning), <em>Hugging Face Transformers</em> (pre-trained language models), and official SDKs for LLM providers such as OpenAI and Anthropic. When a new AI technique is published, its code is nearly always released in Python first.</li>
  <li><strong>It is a "glue" language.</strong> Python itself is not the fastest language, but the heavy number-crunching inside NumPy or PyTorch is written in C, C++ and CUDA (for graphics cards). Python is the friendly steering wheel; the engine underneath is extremely fast. You get easy code <em>and</em> high performance.</li>
  <li><strong>Interactive exploration.</strong> Tools like Jupyter notebooks let you run code piece by piece and see charts and tables immediately, which fits the experimental nature of data work.</li>
  <li><strong>One language end to end.</strong> The same language can clean data, train a model, build a web API around it (FastAPI, Flask), and automate deployment. That is exactly the path this course follows.</li>
</ul>

<div class="callout info"><strong>Where this track fits:</strong> Every later track — data analysis, machine learning, deep learning, LLM apps, deployment — assumes you can read and write ordinary Python. This track gives you that foundation plus the tools (terminal, Git, APIs, Docker) professionals use daily.</div>

<h3>How to learn programming effectively</h3>
<ul>
  <li><strong>Type the examples yourself.</strong> Copy-pasting teaches your eyes; typing teaches your fingers and exposes the tiny details (colons, quotes, indentation) that matter.</li>
  <li><strong>Change things and predict.</strong> Before running a modified example, guess what it will print. If you were wrong, you just learned something.</li>
  <li><strong>Errors are normal.</strong> Professional programmers see error messages all day long. An error message is the computer telling you exactly where it got confused. You will learn to read them in the "Writing Robust Code" module.</li>
  <li><strong>Small steps.</strong> Write two or three lines, run, check, then continue. Never write 100 lines before running anything.</li>
</ul>

<h3>Common beginner mistakes</h3>
<div class="callout warn"><strong>Watch out:</strong>
<ul>
  <li><strong>Python is case-sensitive.</strong> <code>Print("hi")</code> fails with <code>NameError: name 'Print' is not defined</code>, because the function is called <code>print</code> in lowercase.</li>
  <li><strong>Quotes must match.</strong> <code>print("hi')</code> is an error: a string opened with a double quote must close with a double quote.</li>
  <li><strong>Brackets must be closed.</strong> Forgetting the final <code>)</code> gives a <code>SyntaxError</code>, often reported on the <em>next</em> line.</li>
  <li><strong>Curly "smart" quotes.</strong> Copying code from a word processor can turn <code>"</code> into “ ”, which Python does not accept. Always write code in a code editor.</li>
</ul></div>

<p>You can print several things at once by separating them with commas; <code>print</code> puts a space between them automatically:</p>
<pre><code class="lang-python runnable">print("Model:", "sentiment-classifier", "version", 2)
print()                      # an empty print() outputs a blank line
print("Done")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Model: sentiment-classifier version 2

Done</code></pre>
<p>Notice the number <code>2</code> has no quotes: it is a number, not text. Python happily prints numbers and text together. In the next lesson you will install Python so you can run all of this on your own machine.</p>
`,
          keyPoints: [
            "A program is a precise, ordered list of instructions; the computer does exactly what it says, nothing more.",
            "Python is an interpreted language: the Python interpreter reads and runs your code line by line, top to bottom.",
            "print() displays values; # starts a comment that Python ignores.",
            "Python dominates AI because it is readable and has the key libraries (NumPy, pandas, scikit-learn, PyTorch, LLM SDKs), with fast C/C++/CUDA code underneath.",
            "Python is case-sensitive and strict about matching quotes and brackets."
          ],
          exercise: {
            prompt: String.raw`<p>Write a short program that prints a "training report" exactly like this (three lines and a blank line before the last one):</p>
<pre><code class="lang-text">Project: spam-detector
Epochs: 5

Status: finished</code></pre>
<p>Add at least one comment explaining what the program does. Use <code>print</code> with commas for the "Epochs" line so that the number 5 is a number, not text.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable"># Print a tiny, fake training report
print("Project: spam-detector")
print("Epochs:", 5)      # comma adds a space automatically
print()                  # blank line
print("Status: finished")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Project: spam-detector
Epochs: 5

Status: finished</code></pre>
<p>Each <code>print</code> call writes one line. <code>print("Epochs:", 5)</code> passes two values; Python converts the number to text and separates the two with a single space. An empty <code>print()</code> outputs just a line break. The comment lines are ignored by the interpreter.</p>`
          },
          quiz: [
            { q: "What does the Python interpreter do?", options: ["Converts Python into a Word document", "Reads your Python code and executes it line by line", "Checks your spelling in comments", "Downloads AI models from the internet"], answer: 1, explain: "The interpreter is the program that reads .py code and runs each statement in order. Installing Python means installing the interpreter." },
            { q: "Which line prints the text Hello without an error?", options: ["Print(\"Hello\")", "print(\"Hello')", "print(\"Hello\")", "print \"Hello\""], answer: 2, explain: "Python is case-sensitive (print, not Print), quotes must match, and in Python 3 print is a function that needs parentheses." },
            { q: "Why is Python fast enough for deep learning even though Python itself is relatively slow?", options: ["Because AI models are small", "Because libraries like NumPy and PyTorch run their heavy maths in compiled C/C++/CUDA code", "Because Python is compiled to machine code before running", "Because it only runs on GPUs"], answer: 1, explain: "Python acts as a glue/steering language. The expensive number crunching happens inside optimised compiled code that the libraries call." },
            { q: "What happens to a line that starts with # ?", options: ["It is printed in bold", "It is executed first", "It is ignored by Python - it is a comment", "It causes a SyntaxError"], answer: 2, explain: "Everything from # to the end of the line is a comment for human readers; the interpreter skips it." }
          ]
        },
        {
          id: "py-start-install",
          title: "Installing Python and Running Code",
          minutes: 50,
          objectives: [
            "Install Python 3 on Windows, macOS or Linux (including WSL) and verify the installation",
            "Install VS Code with the Python extension and select an interpreter",
            "Run Python code in three ways: the interactive REPL, script files and Jupyter notebooks",
            "Explain why typing an expression in the REPL shows a value but a script needs print()"
          ],
          body: String.raw`
<h3>Which Python?</h3>
<p>Always use <strong>Python 3</strong> — a recent version such as 3.11, 3.12 or 3.13. Python 2 is dead (support ended in 2020) and you will only meet it in very old tutorials. In this course, the examples are tested with Python 3.12. Each version adds features but rarely breaks older code, so anything 3.10 or newer is fine for learning.</p>

<h3>Installing on Windows</h3>
<ol>
  <li>Go to python.org, open <em>Downloads</em> and download the latest Python 3 installer for Windows.</li>
  <li>Run the installer. On the first screen, <strong>tick "Add python.exe to PATH"</strong>. This is the single most important step: <strong>PATH</strong> is the list of folders your computer searches when you type a command. If Python is not on the PATH, typing <code>python</code> in a terminal says "not recognized".</li>
  <li>Click <em>Install Now</em>.</li>
  <li>Open a new <strong>terminal</strong> (search the Start menu for "PowerShell" or "Terminal") and type <code>python --version</code>. You should see something like <code>Python 3.12.3</code>. Windows also installs the <code>py</code> launcher, so <code>py --version</code> works too.</li>
</ol>
<div class="callout warn"><strong>Windows gotcha:</strong> if typing <code>python</code> opens the Microsoft Store instead, Windows is using an "app execution alias". Either install Python from the Store version, or open <em>Settings → Apps → Advanced app settings → App execution aliases</em> and switch off the two "python" aliases, then reopen the terminal.</div>

<h3>Installing on macOS</h3>
<p>macOS may ship with an old system Python that you should not modify. Install your own:</p>
<ul>
  <li><strong>Option A:</strong> download the macOS installer from python.org and run it.</li>
  <li><strong>Option B (popular with developers):</strong> install <em>Homebrew</em> (a package manager for macOS), then run <code>brew install python</code>.</li>
</ul>
<p>On macOS and Linux the command is usually <code>python3</code> (and <code>pip3</code>) rather than <code>python</code>. Check with <code>python3 --version</code>.</p>

<h3>Installing on Linux and WSL</h3>
<p>Most Linux distributions already include Python 3. On Ubuntu or Debian, make sure you also have the tools for virtual environments and packages:</p>
<pre><code class="lang-bash">sudo apt update
sudo apt install python3 python3-venv python3-pip
python3 --version</code></pre>
<p><strong>WSL</strong> (Windows Subsystem for Linux) lets Windows users run a real Linux system inside Windows. Many AI tools (Docker, CUDA tooling, shell scripts) work most smoothly on Linux, so WSL is a great choice for an AI engineer on Windows. Open PowerShell as Administrator and run <code>wsl --install</code>, restart, and you get an Ubuntu terminal. Inside it, use the Linux commands above. VS Code connects to WSL with the <em>WSL</em> extension so you edit files in Windows while code runs in Linux.</p>

<h3>Installing VS Code</h3>
<p>You can write Python in any text editor, but a proper <strong>code editor</strong> highlights syntax, spots mistakes as you type and runs your code with one click. <strong>Visual Studio Code</strong> (VS Code) is free and the most common choice.</p>
<ol>
  <li>Download VS Code from code.visualstudio.com and install it.</li>
  <li>Open the Extensions panel (the four-squares icon) and install the <strong>Python</strong> extension published by Microsoft. It also brings <em>Pylance</em> (smart autocomplete) and the <em>Jupyter</em> extension.</li>
  <li>Open a folder for your work (<em>File → Open Folder</em>), e.g. <code>ai-learning</code>.</li>
  <li>Press <code>Ctrl+Shift+P</code> (<code>Cmd+Shift+P</code> on Mac), type "Python: Select Interpreter" and pick the Python you installed. This tells VS Code which Python to run your code with.</li>
</ol>

<h3>Way 1: the interactive REPL</h3>
<p>Type <code>python</code> (or <code>python3</code>) in a terminal with nothing after it. You enter the <strong>REPL</strong> — Read, Evaluate, Print, Loop. It <em>reads</em> what you type, <em>evaluates</em> it, <em>prints</em> the result and <em>loops</em> back for more. The prompt <code>&gt;&gt;&gt;</code> means "waiting for you":</p>
<pre><code class="lang-text">&gt;&gt;&gt; 2 + 3
5
&gt;&gt;&gt; "data" * 3
'datadatadata'
&gt;&gt;&gt; exit()</code></pre>
<p>The REPL is a calculator and a scratchpad: perfect for testing a small idea. Type <code>exit()</code> or press <code>Ctrl+D</code> (<code>Ctrl+Z</code> then Enter on Windows) to leave. Anything you type in the REPL is lost when you exit.</p>

<h3>Way 2: script files</h3>
<p>For anything you want to keep, write a <strong>script</strong>: a plain text file ending in <code>.py</code>. Create <code>hello.py</code> in VS Code:</p>
<pre><code class="lang-python runnable">name = "Ada"
print("Hello,", name)
print("2 + 3 =", 2 + 3)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Hello, Ada
2 + 3 = 5</code></pre>
<p>Run it from a terminal opened in the same folder:</p>
<pre><code class="lang-bash">python hello.py      # Windows
python3 hello.py     # macOS / Linux</code></pre>
<p>or press the ▶ "Run Python File" button in the top-right of VS Code.</p>
<div class="callout warn"><strong>REPL vs script:</strong> in the REPL, typing <code>2 + 3</code> shows <code>5</code> automatically. In a script, a line containing just <code>2 + 3</code> computes 5 and then throws it away — nothing appears. In scripts you must use <code>print()</code> to see results. This confuses nearly every beginner.</div>
<pre><code class="lang-python runnable">2 + 3            # computed, then discarded: prints nothing in a script
print(2 + 3)     # this is what actually shows up</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">5</code></pre>

<h3>Way 3: Jupyter notebooks</h3>
<p>A <strong>Jupyter notebook</strong> (<code>.ipynb</code> file) is a document made of <strong>cells</strong>. A cell holds either code or formatted notes. You run cells one at a time, and the output (text, tables, charts) appears directly under each cell and is saved in the document. Behind the notebook is a <strong>kernel</strong>: a running Python process that remembers every variable you have created so far.</p>
<p>Notebooks are the standard tool for data exploration and ML experiments, because you can load a dataset once and then try many ideas without reloading. In VS Code: <em>File → New File → Jupyter Notebook</em>, choose your Python as the kernel, and press <code>Shift+Enter</code> to run a cell. Like the REPL, the value of the <strong>last line</strong> of a cell is displayed automatically.</p>
<div class="callout tip"><strong>Notebook pitfall:</strong> cells can be run in any order, and the kernel remembers everything. If you delete a cell that created a variable, the variable still exists until you restart the kernel. Before sharing a notebook, use <em>Restart Kernel and Run All</em> to prove it works top to bottom.</div>

<h3>Which should I use when?</h3>
<table>
<thead><tr><th>Tool</th><th>Best for</th><th>Keeps your work?</th></tr></thead>
<tbody>
<tr><td>REPL</td><td>Quick one-line experiments, checking how something behaves</td><td>No</td></tr>
<tr><td>Script (.py)</td><td>Real programs, anything you run repeatedly, apps you deploy</td><td>Yes</td></tr>
<tr><td>Notebook (.ipynb)</td><td>Exploring data, charts, ML experiments, teaching</td><td>Yes (with outputs)</td></tr>
</tbody></table>
<p>Production AI applications (APIs, pipelines, Docker images) are built from <strong>scripts and modules</strong>. Notebooks are for exploration. A good habit: explore in a notebook, then move the working code into <code>.py</code> files.</p>

<h3>Checking your setup from Python itself</h3>
<p>The <code>sys</code> module (a built-in toolbox) can tell you which Python is running. The exact output depends on your machine, so yours will differ:</p>
<pre><code class="lang-python runnable">import sys
print(sys.version_info.major)   # 3 means Python 3
print(sys.executable)           # full path of the interpreter running this code</code></pre>
<p>If <code>sys.executable</code> points somewhere unexpected, VS Code or your terminal is using a different Python than you think — a very common source of "I installed the package but Python can't find it" problems, which the next lesson solves.</p>
`,
          keyPoints: [
            "Install Python 3 (3.10+). On Windows tick 'Add python.exe to PATH'; on macOS/Linux the command is usually python3.",
            "WSL gives Windows users a real Linux environment, which many AI tools prefer.",
            "VS Code + the Python extension is a free, professional editor; use 'Python: Select Interpreter' to choose which Python runs your code.",
            "Three ways to run code: REPL for quick tests, .py scripts for real programs, Jupyter notebooks for exploration.",
            "The REPL and notebooks display the value of the last expression; scripts only show what you print()."
          ],
          exercise: {
            prompt: String.raw`<p>1. Install Python and VS Code, then confirm <code>python --version</code> (or <code>python3 --version</code>) prints a 3.x version.</p>
<p>2. Create a folder <code>ai-learning</code> and inside it a file <code>setup_check.py</code> that prints:</p>
<pre><code class="lang-text">Python setup works!
10 * 12 = 120
Major version: 3</code></pre>
<p>The second line must be computed by Python (not typed as text), and the last line must come from <code>sys.version_info.major</code>. Run the file from the terminal.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import sys

print("Python setup works!")
print("10 * 12 =", 10 * 12)
print("Major version:", sys.version_info.major)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Python setup works!
10 * 12 = 120
Major version: 3</code></pre>
<p>Run it with <code>python setup_check.py</code> (Windows) or <code>python3 setup_check.py</code> (macOS/Linux) from inside the folder. <code>10 * 12</code> is evaluated before printing, so Python displays 120. <code>import sys</code> loads the built-in <code>sys</code> module, and <code>sys.version_info.major</code> is the major version number of the interpreter running the script. If you get "No such file or directory", your terminal is not in the right folder — use <code>cd ai-learning</code> first.</p>`
          },
          quiz: [
            { q: "On Windows, what installer option prevents the 'python is not recognized' error?", options: ["Install for all users", "Add python.exe to PATH", "Disable path length limit", "Install documentation"], answer: 1, explain: "PATH is the list of folders searched for commands. Adding Python to PATH lets the terminal find python.exe." },
            { q: "A script file contains only the line 10 * 2. What does running it print?", options: ["20", "10 * 2", "Nothing", "An error"], answer: 2, explain: "Scripts don't automatically display expression values (only the REPL and notebooks do). Use print(10 * 2) to see 20." },
            { q: "What is a Jupyter kernel?", options: ["The notebook file format", "A running Python process that executes cells and remembers variables", "A VS Code theme", "The part of the OS that installs Python"], answer: 1, explain: "The kernel is the live Python process behind a notebook. It keeps state between cells until restarted." },
            { q: "Which tool is the best fit for code that will be deployed as a production API?", options: ["The REPL", "A Jupyter notebook", ".py script/module files", "A Word document"], answer: 2, explain: "Production code lives in .py files that can be imported, tested, version-controlled and packaged. Notebooks are for exploration." }
          ]
        },
        {
          id: "py-start-venv",
          title: "Virtual Environments, pip and Your First Program",
          minutes: 50,
          objectives: [
            "Explain what a package, pip and a virtual environment are and why every project needs its own environment",
            "Create, activate and deactivate a venv on Windows, macOS and Linux",
            "Install, list, freeze and reinstall packages with pip and requirements.txt",
            "Write and run a complete first program inside a virtual environment"
          ],
          body: String.raw`
<h3>Packages and pip</h3>
<p>Python comes with a large <strong>standard library</strong> (built-in modules like <code>math</code>, <code>json</code>, <code>random</code>). Everything else — NumPy, pandas, scikit-learn, PyTorch, the OpenAI SDK — is a third-party <strong>package</strong> that you download. Packages are published on <strong>PyPI</strong> (the Python Package Index, pypi.org), a huge public catalogue. The tool that downloads and installs them is <strong>pip</strong> ("pip installs packages").</p>
<pre><code class="lang-bash">pip install numpy          # download and install the latest NumPy
pip install pandas==2.2.2  # install an exact version
pip list                   # show what is installed
pip uninstall numpy        # remove a package</code></pre>

<h3>The problem: one Python, many projects</h3>
<p>Imagine you have two projects. Project A is an older app that only works with <code>pandas 1.5</code>. Project B needs <code>pandas 2.2</code>. If you install everything into your one system-wide Python, installing for B breaks A. Worse, on Linux and macOS the system Python is used by the operating system itself, and messing with it can break system tools — newer Linux versions even refuse with an "externally-managed-environment" error.</p>
<p>The solution is a <strong>virtual environment</strong> (venv): a self-contained folder holding its own copy of the Python interpreter link and its own set of installed packages. Analogy: instead of one shared kitchen where every cook rearranges the spices, each project gets its own small kitchen with exactly the ingredients its recipe needs. Changing one kitchen never affects another.</p>
<figure><img alt="Diagram: PyPI feeds pip, which installs packages into separate virtual environments for project A and project B, each isolated from the system Python" src="assets/diagrams/python-venv-pip.svg"><figcaption>Each project gets its own isolated environment; pip installs packages from PyPI into whichever environment is active.</figcaption></figure>

<h3>Creating a virtual environment</h3>
<p>From inside your project folder, run the built-in <code>venv</code> module. By convention the environment folder is named <code>.venv</code>:</p>
<pre><code class="lang-bash">cd ai-learning
python -m venv .venv        # Windows
python3 -m venv .venv       # macOS / Linux</code></pre>
<p><code>-m venv</code> means "run the module called venv". This creates a <code>.venv</code> folder containing a <code>python</code> executable, a <code>pip</code>, and an empty <code>site-packages</code> directory where packages will go.</p>

<h3>Activating it</h3>
<p><strong>Activating</strong> a venv changes your terminal session so that <code>python</code> and <code>pip</code> refer to the copies inside <code>.venv</code>:</p>
<pre><code class="lang-bash"># Windows PowerShell
.venv\Scripts\Activate.ps1
# Windows Command Prompt
.venv\Scripts\activate.bat
# macOS / Linux / WSL
source .venv/bin/activate</code></pre>
<p>After activation your prompt shows <code>(.venv)</code> at the start. Now <code>pip install</code> installs only into this project. When you are done, type <code>deactivate</code>. Activation only lasts for that terminal window; open a new terminal and you activate again. VS Code usually detects <code>.venv</code> automatically — choose it in "Python: Select Interpreter" and its terminals activate it for you.</p>
<div class="callout warn"><strong>PowerShell error "running scripts is disabled":</strong> run <code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code> once, then try activating again.</div>

<h3>Recording dependencies: requirements.txt</h3>
<p>A project's <strong>dependencies</strong> are the packages it needs. You record them in a text file so anyone (a colleague, a server, a Docker build) can recreate the same environment:</p>
<pre><code class="lang-bash">pip install numpy pandas scikit-learn
pip freeze &gt; requirements.txt      # write exact installed versions to a file
# ... later, on another machine, in a fresh venv:
pip install -r requirements.txt     # install everything listed</code></pre>
<p><code>pip freeze</code> prints lines like <code>numpy==2.1.3</code>; the <code>&gt;</code> redirects that output into the file. Pinning exact versions (<code>==</code>) makes builds <strong>reproducible</strong>: the code that worked yesterday works the same way next month. This matters enormously in ML, where a library upgrade can silently change results.</p>
<pre><code class="lang-text">numpy==2.1.3
pandas==2.2.3
scikit-learn==1.5.2</code></pre>

<h3>Golden rules</h3>
<ul>
  <li><strong>One venv per project</strong>, created inside the project folder.</li>
  <li><strong>Never commit the <code>.venv</code> folder</strong> to Git. It is large and machine-specific. Commit <code>requirements.txt</code> instead (you will add <code>.venv/</code> to <code>.gitignore</code> in the Git lesson).</li>
  <li><strong>Prefer <code>python -m pip install ...</code></strong> when in doubt. It guarantees pip installs into the same Python you are running, avoiding the classic "I installed it but ModuleNotFoundError" mix-up.</li>
  <li>If a venv gets messed up, just delete the <code>.venv</code> folder and recreate it from <code>requirements.txt</code>. Environments are disposable.</li>
</ul>
<div class="callout info"><strong>Other tools you will hear about:</strong> <em>conda</em> (popular in data science, also manages non-Python libraries), <em>uv</em> and <em>poetry</em> (fast, modern project managers). They all solve the same problem — isolated, reproducible environments. Once you understand venv + pip, the others are easy.</div>

<h3>Am I inside a virtual environment?</h3>
<p>Inside a venv, <code>sys.prefix</code> (where the running environment lives) differs from <code>sys.base_prefix</code> (where the original Python is installed). The output depends on how you run it:</p>
<pre><code class="lang-python runnable">import sys
in_venv = sys.prefix != sys.base_prefix
print("Running inside a virtual environment:", in_venv)
print("Environment location:", sys.prefix)</code></pre>

<h3>Your first real program</h3>
<p>With the venv active, create <code>first_program.py</code>. It stores some information about a pretend model, does a calculation and prints a neat report. Read each line and its comment:</p>
<pre><code class="lang-python runnable"># first_program.py - a tiny model report
model_name = "house-price-predictor"   # text (a string)
train_rows = 8000                      # whole number (an int)
test_rows = 2000
correct = 1730                         # test predictions that were right

total_rows = train_rows + test_rows
accuracy = correct / test_rows          # division gives a decimal (a float)

print("=== Model report ===")
print("Model:", model_name)
print("Total rows:", total_rows)
print("Test accuracy:", accuracy)
print("Accuracy as %:", accuracy * 100)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">=== Model report ===
Model: house-price-predictor
Total rows: 10000
Test accuracy: 0.865
Accuracy as %: 86.5</code></pre>
<p>Run it with <code>python first_program.py</code>. Congratulations — you created an isolated environment and ran a real program in it, exactly the way professional AI projects start. Each line used a <strong>variable</strong> (a name that refers to a value), which is the topic of the next module.</p>

<h3>A typical project layout</h3>
<pre><code class="lang-text">ai-learning/
├── .venv/              (virtual environment - not committed)
├── requirements.txt    (dependency list - committed)
├── first_program.py
└── notebooks/
    └── explore.ipynb</code></pre>
<div class="callout tip"><strong>Using a package after installing:</strong> once <code>pip install numpy</code> succeeds in your active venv, any script run with that venv's Python can do <code>import numpy</code>. If you see <code>ModuleNotFoundError: No module named 'numpy'</code>, check that the venv is active (look for <code>(.venv)</code>) and that VS Code's selected interpreter is the <code>.venv</code> one.</div>
`,
          keyPoints: [
            "pip installs third-party packages from PyPI; the standard library comes built in.",
            "A virtual environment is an isolated folder with its own interpreter link and packages, so projects never conflict.",
            "Create with python -m venv .venv; activate with source .venv/bin/activate (macOS/Linux) or .venv\\Scripts\\Activate.ps1 (Windows).",
            "pip freeze > requirements.txt records exact versions; pip install -r requirements.txt recreates the environment.",
            "Never commit .venv; commit requirements.txt. Use python -m pip to be sure you install into the right Python."
          ],
          exercise: {
            prompt: String.raw`<p>1. In a new folder <code>score-report</code>, create and activate a virtual environment, install <code>numpy</code>, and save the dependencies with <code>pip freeze &gt; requirements.txt</code>. Open the file and confirm numpy is listed with a version.</p>
<p>2. Write <code>report.py</code> that stores three model scores in separate variables (<code>score_a = 0.72</code>, <code>score_b = 0.88</code>, <code>score_c = 0.80</code>), computes their total and average, and prints:</p>
<pre><code class="lang-text">Total: 2.4
Average: 0.8</code></pre>
<p>Hint: floating-point arithmetic can produce tiny rounding noise, so use <code>round(value, 2)</code> before printing.</p>`,
            solution: String.raw`<pre><code class="lang-bash">mkdir score-report
cd score-report
python3 -m venv .venv          # or: python -m venv .venv  (Windows)
source .venv/bin/activate      # or: .venv\Scripts\Activate.ps1  (Windows)
python -m pip install numpy
pip freeze &gt; requirements.txt
cat requirements.txt           # shows e.g. numpy==2.1.3</code></pre>
<pre><code class="lang-python runnable">score_a = 0.72
score_b = 0.88
score_c = 0.80

total = score_a + score_b + score_c
average = total / 3

print("Total:", round(total, 2))
print("Average:", round(average, 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Total: 2.4
Average: 0.8</code></pre>
<p>Without <code>round</code>, the total might display as <code>2.4000000000000004</code>, because computers store decimals in binary and cannot represent most of them exactly (you will study this in the numbers lesson). <code>round(total, 2)</code> rounds to two decimal places for display, and Python drops trailing zeros, so 2.40 shows as 2.4.</p>`
          },
          quiz: [
            { q: "Why should each project have its own virtual environment?", options: ["It makes Python run faster", "So that package versions for one project cannot break another project", "Because pip only works inside venvs on Windows", "To hide code from other users"], answer: 1, explain: "Isolation is the point: each venv has its own packages, so different projects can use different versions safely." },
            { q: "Which command records the exact versions of installed packages into a file?", options: ["pip list --save", "pip freeze > requirements.txt", "python -m venv requirements.txt", "pip install requirements.txt"], answer: 1, explain: "pip freeze prints name==version for each package; the > redirect writes that into requirements.txt." },
            { q: "What should you commit to Git for a Python project's environment?", options: ["The whole .venv folder", "requirements.txt only", "Both .venv and requirements.txt", "Nothing - environments cannot be shared"], answer: 1, explain: ".venv is large and machine-specific; requirements.txt lets anyone recreate it with pip install -r requirements.txt." },
            { q: "After activating a venv on macOS, what usually changes in your terminal?", options: ["The prompt starts with (.venv)", "The terminal turns green", "Python 2 is used", "Nothing visible"], answer: 0, explain: "The activate script prefixes the prompt with the environment name so you can see it is active." },
            { q: "You ran pip install pandas but import pandas fails with ModuleNotFoundError. What is the most likely cause?", options: ["pandas is not on PyPI", "The script is being run by a different Python than the one pip installed into", "You need to restart the computer", "pandas only works in notebooks"], answer: 1, explain: "The classic mix-up: pip installed into one environment while the code runs in another. Activate the venv / select its interpreter, or use python -m pip." }
          ]
        }
      ]
    },
    {
      id: "py-basics",
      title: "Core Language Basics",
      summary: "Variables, numbers, text, decisions and loops: the building blocks every Python program is made of.",
      lessons: [
        {
          id: "py-basics-variables",
          title: "Variables and Dynamic Typing",
          minutes: 45,
          objectives: [
            "Create, reassign and name variables following Python conventions",
            "Explain that variables are names that refer to objects, and that every object has a type",
            "Use type() and convert between int, float, str and bool",
            "Recognise and fix the most common TypeError and NameError mistakes"
          ],
          body: String.raw`
<h3>What a variable is</h3>
<p>A <strong>variable</strong> is a name that refers to a value, so you can use the value later. You create one with the <strong>assignment operator</strong> <code>=</code>:</p>
<pre><code class="lang-python runnable">learning_rate = 0.001
epochs = 10
model_name = "resnet50"

print(model_name, "will train for", epochs, "epochs at lr", learning_rate)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">resnet50 will train for 10 epochs at lr 0.001</code></pre>
<p>Read <code>epochs = 10</code> as "make the name <code>epochs</code> refer to the value 10", <strong>not</strong> as "epochs equals 10" in the maths sense. The right-hand side is evaluated first, then the name on the left is attached to the result. That is why the following, which would be nonsense in algebra, is perfectly normal in Python:</p>
<pre><code class="lang-python runnable">count = 5
count = count + 1    # take the current value (5), add 1, re-attach the name
print(count)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">6</code></pre>

<h3>Names are labels, values are objects</h3>
<p>Every value in Python — a number, a piece of text, a list — is an <strong>object</strong> living in the computer's memory. A variable is a <strong>label</strong> (think of a sticky note or a luggage tag) attached to an object. The object is the suitcase; the name is the tag. You can attach several tags to the same suitcase, and you can move a tag to a different suitcase at any time.</p>
<figure><img alt="Diagram: the names score and best both point to the same object 0.91; after reassigning score to 0.95, score points to a new object while best still points to 0.91" src="assets/diagrams/python-variables-references.svg"><figcaption>Assignment attaches a name to an object. Reassigning moves the name; it does not change the old object.</figcaption></figure>
<pre><code class="lang-python runnable">score = 0.91
best = score        # best now refers to the SAME object as score
score = 0.95        # move the 'score' label to a new object
print("score:", score)
print("best:", best)   # best still refers to 0.91</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">score: 0.95
best: 0.91</code></pre>
<p>This "names point to objects" model becomes very important with lists and dictionaries (where two names can share one changeable object), so keep this picture in mind.</p>

<h3>Types: what kind of value is it?</h3>
<p>Every object has a <strong>type</strong> that decides what you can do with it. The four basic types are:</p>
<table>
<thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><code>int</code></td><td>whole number (integer)</td><td><code>10</code>, <code>-3</code>, <code>0</code></td></tr>
<tr><td><code>float</code></td><td>number with a decimal point ("floating point")</td><td><code>0.001</code>, <code>3.14</code>, <code>2.0</code></td></tr>
<tr><td><code>str</code></td><td>text (a "string" of characters)</td><td><code>"cat"</code>, <code>'hello world'</code></td></tr>
<tr><td><code>bool</code></td><td>truth value (Boolean)</td><td><code>True</code>, <code>False</code></td></tr>
</tbody></table>
<p>There is also the special value <code>None</code> (type <code>NoneType</code>), meaning "nothing here yet" — useful for a value you will fill in later, like a model that has not been trained. The built-in <code>type()</code> function tells you an object's type:</p>
<pre><code class="lang-python runnable">print(type(10))
print(type(0.5))
print(type("dog"))
print(type(True))
print(type(None))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">&lt;class 'int'&gt;
&lt;class 'float'&gt;
&lt;class 'str'&gt;
&lt;class 'bool'&gt;
&lt;class 'NoneType'&gt;</code></pre>

<h3>Dynamic typing</h3>
<p>In some languages (Java, C++) you must declare a variable's type up front, and it can never hold anything else. Python is <strong>dynamically typed</strong>: the type belongs to the <em>object</em>, not the name. A name can refer to an int now and a string later:</p>
<pre><code class="lang-python runnable">value = 42
print(value, type(value))
value = "forty-two"
print(value, type(value))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">42 &lt;class 'int'&gt;
forty-two &lt;class 'str'&gt;</code></pre>
<p>This flexibility makes Python quick to write. The cost is that type mistakes are discovered only when the line runs. Python is still <strong>strongly typed</strong>: it will not silently mix incompatible types. Adding text to a number is an error, not a guess:</p>
<pre><code class="lang-python">age = 30
message = "Age: " + age     # TypeError!</code></pre>
<pre><code class="lang-text">TypeError: can only concatenate str (not "int") to str</code></pre>

<h3>Converting between types</h3>
<p>Use the type names as conversion functions: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>. This is constantly needed with data, because text files and user input always arrive as strings.</p>
<pre><code class="lang-python runnable">rows_text = "1500"            # e.g. read from a file
rows = int(rows_text)         # now a real number
print(rows + 500)

price = float("19.99")
print(price * 2)

age = 30
print("Age: " + str(age))     # convert the number to text first

print(int(7.9))               # int() chops off the decimals (no rounding!)
print(bool(0), bool(3), bool(""), bool("hi"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">2000
39.98
Age: 30
7
False True False True</code></pre>
<p>Notice <code>int(7.9)</code> gives 7 — it <strong>truncates</strong> toward zero. Use <code>round()</code> if you want rounding. <code>int("hello")</code> fails with <code>ValueError: invalid literal for int()</code>, because the text is not a number.</p>

<h3>Naming rules and conventions</h3>
<p><strong>Rules</strong> (break them and you get a <code>SyntaxError</code>):</p>
<ul>
  <li>Names may contain letters, digits and underscores, but cannot start with a digit: <code>model2</code> is fine, <code>2model</code> is not.</li>
  <li>No spaces or hyphens: <code>learning-rate</code> means "learning minus rate".</li>
  <li>You cannot use Python's <strong>keywords</strong> such as <code>if</code>, <code>for</code>, <code>class</code>, <code>def</code>, <code>True</code>, <code>None</code>, <code>lambda</code>.</li>
  <li>Names are case-sensitive: <code>Score</code> and <code>score</code> are different variables.</li>
</ul>
<p><strong>Conventions</strong> (from the official style guide, PEP 8):</p>
<ul>
  <li>Use <code>snake_case</code> for variables: lowercase words joined by underscores, e.g. <code>batch_size</code>, <code>num_classes</code>.</li>
  <li>Use <code>UPPER_CASE</code> for constants — values you intend never to change, e.g. <code>MAX_TOKENS = 4096</code>. Python does not enforce this; it is a signal to other programmers.</li>
  <li>Choose descriptive names. <code>test_accuracy</code> beats <code>ta</code> or <code>x2</code>. Code is read far more often than it is written.</li>
  <li>Avoid reusing built-in names like <code>list</code>, <code>sum</code>, <code>max</code>, <code>type</code>, <code>input</code> as variables. <code>sum = 10</code> works, but then the <code>sum()</code> function is hidden and later code breaks mysteriously.</li>
</ul>

<h3>Handy assignment shortcuts</h3>
<pre><code class="lang-python runnable">width, height = 224, 224         # assign two names at once
print(width, height)

a = b = 0                        # both names refer to 0
print(a, b)

x, y = 1, 2
x, y = y, x                      # swap without a temporary variable
print(x, y)

total = 10
total += 5                       # same as total = total + 5
total *= 2                       # same as total = total * 2
print(total)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">224 224
0 0
2 1
30</code></pre>
<p>The <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code> forms are called <strong>augmented assignment</strong> and are very common in loops (for example, adding up a running loss).</p>

<h3>Common mistakes</h3>
<div class="callout warn"><strong>Watch out:</strong>
<ul>
  <li><strong>NameError</strong>: using a name before assigning it, or misspelling it (<code>learnig_rate</code>). Python only knows names you have actually created.</li>
  <li><strong>Mixing up <code>=</code> and <code>==</code></strong>: <code>=</code> assigns; <code>==</code> compares (next lessons).</li>
  <li><strong>Forgetting that input is text</strong>: <code>"3" + "4"</code> is <code>"34"</code>, not 7. Convert with <code>int()</code> or <code>float()</code> first.</li>
  <li><strong>Shadowing built-ins</strong>: naming a variable <code>list</code> or <code>str</code> breaks those functions for the rest of the program.</li>
</ul></div>
<div class="callout tip"><strong>Why this matters for AI:</strong> ML code is full of configuration values — learning rate, batch size, number of epochs, model name. Clear variable names and correct types (an <code>int</code> batch size, a <code>float</code> learning rate) prevent bugs that can waste hours of training time.</div>
`,
          keyPoints: [
            "name = value attaches a name to an object; the right side is evaluated first.",
            "Variables are labels pointing to objects; reassigning moves the label and does not change the old object.",
            "Basic types: int, float, str, bool, plus None. type() tells you an object's type.",
            "Python is dynamically typed (names can change type) but strongly typed (no silent mixing of str and int).",
            "Convert with int(), float(), str(), bool(); use snake_case names and UPPER_CASE for constants."
          ],
          exercise: {
            prompt: String.raw`<p>You received hyperparameters from a config file, but everything arrived as text:</p>
<pre><code class="lang-python">batch_text = "32"
lr_text = "0.01"
epochs_text = "4"</code></pre>
<p>Convert them to the right types (<code>batch_size</code> as int, <code>learning_rate</code> as float, <code>epochs</code> as int), compute how many training steps happen if the dataset has 6400 rows (steps per epoch = rows divided by batch size, using whole-number division <code>//</code>; total steps = steps per epoch × epochs), and print:</p>
<pre><code class="lang-text">batch_size=32 (int)
learning_rate=0.01 (float)
total steps: 800</code></pre>
<p>Use <code>type(x).__name__</code> to get just the type's name as text.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">batch_text = "32"
lr_text = "0.01"
epochs_text = "4"

batch_size = int(batch_text)
learning_rate = float(lr_text)
epochs = int(epochs_text)

rows = 6400
steps_per_epoch = rows // batch_size     # 200
total_steps = steps_per_epoch * epochs   # 800

print("batch_size=" + str(batch_size) + " (" + type(batch_size).__name__ + ")")
print("learning_rate=" + str(learning_rate) + " (" + type(learning_rate).__name__ + ")")
print("total steps:", total_steps)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">batch_size=32 (int)
learning_rate=0.01 (float)
total steps: 800</code></pre>
<p>Strings must be converted before arithmetic. Joining text with <code>+</code> requires every piece to be a string, hence the <code>str()</code> calls. <code>type(x).__name__</code> returns the type's name (<code>"int"</code>) instead of <code>&lt;class 'int'&gt;</code>. In the strings lesson you will learn f-strings, which make this kind of printing much easier.</p>`
          },
          quiz: [
            { q: "After a = 5; b = a; a = 7, what is b?", options: ["7", "5", "12", "An error"], answer: 1, explain: "b = a attaches b to the object 5. Reassigning a moves only the name a to 7; b still refers to 5." },
            { q: "Which is a valid Python variable name?", options: ["2nd_model", "learning-rate", "num_classes", "class"], answer: 2, explain: "Names cannot start with a digit, cannot contain hyphens, and cannot be keywords like class. num_classes is valid snake_case." },
            { q: "What does int(9.99) return?", options: ["10", "9", "9.99", "ValueError"], answer: 1, explain: "int() truncates toward zero; it does not round. Use round(9.99) to get 10." },
            { q: "What happens when you run \"Total: \" + 5 ?", options: ["It prints Total: 5", "TypeError: can only concatenate str (not \"int\") to str", "It returns 5", "SyntaxError"], answer: 1, explain: "Python is strongly typed and won't guess. Convert first: \"Total: \" + str(5)." },
            { q: "What does 'dynamically typed' mean?", options: ["Types change randomly", "Variables must be declared with a type", "The type belongs to the object, so a name can refer to values of different types over time", "Python has no types"], answer: 2, explain: "In Python the name has no fixed type; whatever object it currently points to determines the type." }
          ]
        },
        {
          id: "py-basics-numbers",
          title: "Numbers and Arithmetic",
          minutes: 40,
          objectives: [
            "Use all arithmetic operators including //, % and ** and apply operator precedence",
            "Explain the difference between int and float and why 0.1 + 0.2 is not exactly 0.3",
            "Round and compare floating-point numbers safely",
            "Use built-in numeric functions (abs, min, max, round, sum) and the math module"
          ],
          body: String.raw`
<h3>Two kinds of numbers</h3>
<p>Python has <code>int</code> for whole numbers and <code>float</code> for numbers with a fractional part. Writing a decimal point makes a float: <code>3</code> is an int, <code>3.0</code> is a float. Python ints can be <em>any size</em> — there is no overflow — while floats have about 15–17 significant digits of precision. Floats can be written in <strong>scientific notation</strong>: <code>1e-3</code> means 1 × 10 to the power −3, i.e. 0.001, a notation you will see all the time for learning rates. Underscores can be used to make big numbers readable: <code>1_000_000</code>.</p>
<pre><code class="lang-python runnable">print(type(3), type(3.0))
print(1e-3, 2.5e6)
params = 7_000_000_000          # a "7B" language model
print(params)
print(2 ** 100)                 # ints grow as big as needed</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">&lt;class 'int'&gt; &lt;class 'float'&gt;
0.001 2500000.0
7000000000
1267650600228229401496703205376</code></pre>

<h3>The arithmetic operators</h3>
<table>
<thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
<tbody>
<tr><td><code>+</code></td><td>add</td><td><code>7 + 2</code></td><td><code>9</code></td></tr>
<tr><td><code>-</code></td><td>subtract</td><td><code>7 - 2</code></td><td><code>5</code></td></tr>
<tr><td><code>*</code></td><td>multiply</td><td><code>7 * 2</code></td><td><code>14</code></td></tr>
<tr><td><code>/</code></td><td>true division (always a float)</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
<tr><td><code>//</code></td><td>floor division (round down)</td><td><code>7 // 2</code></td><td><code>3</code></td></tr>
<tr><td><code>%</code></td><td>modulo (remainder)</td><td><code>7 % 2</code></td><td><code>1</code></td></tr>
<tr><td><code>**</code></td><td>power</td><td><code>7 ** 2</code></td><td><code>49</code></td></tr>
</tbody></table>
<p>Two rules to remember: <code>/</code> <strong>always</strong> returns a float (even <code>6 / 3</code> is <code>2.0</code>), and any operation mixing an int and a float produces a float.</p>
<pre><code class="lang-python runnable">print(6 / 3)
print(6 // 3)
print(2 + 1.0)
print(10 % 3, 10 // 3)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">2.0
2
3.0
1 3</code></pre>

<h3>Floor division and modulo in practice</h3>
<p><code>//</code> answers "how many whole times does it fit?" and <code>%</code> answers "what is left over?". These are surprisingly useful in data work:</p>
<pre><code class="lang-python runnable">rows = 1050
batch_size = 100
full_batches = rows // batch_size    # complete batches
leftover = rows % batch_size         # rows in the final partial batch
print("full batches:", full_batches, "leftover rows:", leftover)

seconds = 3725
minutes = seconds // 60
print(minutes // 60, "h", minutes % 60, "min", seconds % 60, "s")

step = 1200
print("log now?", step % 100 == 0)   # every 100th step</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">full batches: 10 leftover rows: 50
1 h 2 min 5 s
log now? True</code></pre>
<p><code>x % n == 0</code> means "x is divisible by n" — the standard trick for "do something every n steps" (print a log line every 100 training steps, save a checkpoint every 1000). Also, <code>x % 2 == 0</code> tests for even numbers.</p>
<div class="callout warn"><strong>Negative numbers:</strong> <code>//</code> rounds <em>down</em> (toward negative infinity), not toward zero. So <code>-7 // 2</code> is <code>-4</code>, while <code>int(-7 / 2)</code> is <code>-3</code>. This rarely matters, but it surprises people.</div>

<h3>Operator precedence</h3>
<p>Python follows the usual maths order: <code>**</code> first, then <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, then <code>+</code> and <code>-</code>. Operators of equal rank go left to right (except <code>**</code>, which goes right to left). When in doubt, add parentheses — they cost nothing and make intent clear.</p>
<pre><code class="lang-python runnable">print(2 + 3 * 4)        # 3*4 first
print((2 + 3) * 4)
print(-3 ** 2)          # ** binds tighter than the minus sign!
print((-3) ** 2)
a, b, c = 0.6, 0.8, 0.7
print((a + b + c) / 3)  # average needs parentheses</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">14
20
-9
9
0.6999999999999998</code></pre>
<p>That last result leads to the most famous surprise in programming.</p>

<h3>Why floats are not exact</h3>
<p>Computers store floats in <strong>binary</strong> (base 2). Just as 1/3 cannot be written exactly in decimal (0.3333…), most decimal fractions like 0.1 cannot be written exactly in binary. The computer stores the closest possible value, and tiny errors appear:</p>
<pre><code class="lang-python runnable">print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.30000000000000004
False</code></pre>
<p>This is not a Python bug — every language using standard floating point (IEEE 754) behaves this way. Two practical consequences:</p>
<ol>
  <li><strong>Round for display</strong>: <code>round(x, 2)</code> or f-string formatting (next lesson).</li>
  <li><strong>Never compare floats with <code>==</code></strong>. Check that they are close instead, with <code>math.isclose()</code> or <code>abs(a - b) &lt; tolerance</code>.</li>
</ol>
<pre><code class="lang-python runnable">import math
total = 0.1 + 0.2
print(round(total, 2))
print(math.isclose(total, 0.3))
print(abs(total - 0.3) &lt; 1e-9)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.3
True
True</code></pre>
<div class="callout info"><strong>Rounding surprise:</strong> <code>round()</code> uses "banker's rounding": exact halves go to the nearest <em>even</em> number. <code>round(2.5)</code> is <code>2</code> and <code>round(3.5)</code> is <code>4</code>. This reduces bias when rounding many values. For money, professionals use the <code>decimal</code> module instead of floats.</div>
<pre><code class="lang-python runnable">print(round(2.5), round(3.5), round(2.567, 1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">2 4 2.6</code></pre>

<h3>Built-in numeric functions and the math module</h3>
<pre><code class="lang-python runnable">import math

losses = [0.92, 0.61, 0.47, 0.45]
print(min(losses), max(losses))       # smallest / largest
print(sum(losses))                    # total
print(abs(-0.25))                     # absolute value (distance from 0)
print(math.sqrt(16))                  # square root
print(math.log(math.e))               # natural log (used in loss functions)
print(round(math.exp(1), 4))          # e to the power 1
print(math.floor(2.7), math.ceil(2.1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.45 0.92
2.45
0.25
4.0
1.0
2.7183
2 3</code></pre>
<p><code>math.log</code> and <code>math.exp</code> appear everywhere in ML: cross-entropy loss uses logarithms and the sigmoid/softmax functions use exponentials. <code>math.ceil</code> ("ceiling", round up) is handy for counting batches including a partial last one.</p>

<h3>A data-flavoured example: min-max scaling</h3>
<p>Many ML models train better when every input feature lies between 0 and 1. <strong>Min-max scaling</strong> maps a value <code>x</code> to <code>(x - min) / (max - min)</code>:</p>
<pre><code class="lang-python runnable">lowest_price = 50_000
highest_price = 450_000
price = 210_000

scaled = (price - lowest_price) / (highest_price - lowest_price)
print("scaled price:", scaled)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">scaled price: 0.4</code></pre>
<p>Parentheses matter here: without them, division would happen before subtraction and the answer would be wrong.</p>

<div class="callout warn"><strong>Common mistakes:</strong> using <code>^</code> for powers (in Python <code>^</code> is a bitwise XOR — <code>2 ^ 3</code> is <code>1</code>, not 8; use <code>**</code>); dividing by zero (<code>ZeroDivisionError</code>), e.g. when computing an average of an empty list; forgetting parentheses in averages; and comparing floats with <code>==</code>.</div>
<h3>Why this matters for AI</h3>
<p>Machine learning is, at its heart, arithmetic performed millions of times. A model's prediction is a long chain of multiplications and additions; training repeatedly nudges numbers by tiny amounts such as <code>learning_rate * gradient</code> (often something like 0.001 × 0.03). That is why the details of this lesson keep coming back:</p>
<ul>
  <li><strong>Floating-point precision</strong> explains why two runs of the same model can differ in the 7th decimal place, why GPUs offer "half precision" (16-bit floats that are faster but less exact), and why you always compare metrics with a tolerance.</li>
  <li><strong>Integer vs float</strong> matters when counting: batch sizes, epochs, number of classes and array indices must be ints, while weights, losses and probabilities are floats. Passing <code>10.0</code> where an int is expected raises errors in many libraries.</li>
  <li><strong>// and %</strong> appear whenever data is divided into batches, folds or time windows, and in "every N steps" logic for logging and checkpointing.</li>
  <li><strong>log and exp</strong> are the building blocks of loss functions and of turning raw model scores into probabilities.</li>
</ul>
<p>A useful habit: whenever you write a formula, test it on numbers small enough to check in your head (like the min-max example above). If <code>(210000 - 50000) / (450000 - 50000)</code> gives 0.4 and you expected 0.4, you can trust the formula on a million rows.</p>
`,
          keyPoints: [
            "int = whole numbers of any size; float = decimals with limited precision; 1e-3 is scientific notation.",
            "/ always gives a float; // is floor division; % is the remainder; ** is power.",
            "x % n == 0 is the classic 'every n steps' test.",
            "Floats are stored in binary, so 0.1 + 0.2 != 0.3. Round for display and compare with math.isclose().",
            "round() uses banker's rounding; the math module provides sqrt, log, exp, floor, ceil and more."
          ],
          exercise: {
            prompt: String.raw`<p>A dataset has 2,345 images. You train with a batch size of 64.</p>
<ol>
<li>Compute the number of <em>full</em> batches and the number of leftover images.</li>
<li>Compute the total number of batches if the last partial batch is kept (use <code>math.ceil</code>).</li>
<li>If each batch takes 0.4 seconds, how many seconds does one epoch take? Print it rounded to 1 decimal place.</li>
</ol>
<p>Expected output:</p>
<pre><code class="lang-text">full batches: 36
leftover images: 41
total batches: 37
epoch time (s): 14.8</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import math

images = 2345
batch_size = 64

full_batches = images // batch_size
leftover = images % batch_size
total_batches = math.ceil(images / batch_size)
epoch_seconds = total_batches * 0.4

print("full batches:", full_batches)
print("leftover images:", leftover)
print("total batches:", total_batches)
print("epoch time (s):", round(epoch_seconds, 1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">full batches: 36
leftover images: 41
total batches: 37
epoch time (s): 14.8</code></pre>
<p>36 × 64 = 2304, leaving 41 images. <code>images / batch_size</code> is 36.64…, and <code>math.ceil</code> rounds it up to 37. Note that 37 × 0.4 may be stored as something like 14.800000000000001 because 0.4 has no exact binary representation; <code>round(..., 1)</code> gives a clean display value.</p>`
          },
          quiz: [
            { q: "What is the result of 17 // 5 and 17 % 5?", options: ["3.4 and 2", "3 and 2", "3 and 3", "4 and 2"], answer: 1, explain: "5 fits into 17 three whole times (15), with remainder 2." },
            { q: "What does 8 / 4 return?", options: ["2", "2.0", "\"2\"", "0.5"], answer: 1, explain: "True division / always returns a float in Python 3, even when the result is whole." },
            { q: "Why is 0.1 + 0.2 == 0.3 False?", options: ["A bug in Python", "Floats are stored in binary and most decimal fractions can't be represented exactly", "Because == only works on ints", "Because 0.3 is a string"], answer: 1, explain: "Binary floating point stores approximations; compare floats with math.isclose() instead of ==." },
            { q: "How do you compute 3 to the power 4 in Python?", options: ["3 ^ 4", "3 ** 4", "pow[3, 4]", "3 * 4"], answer: 1, explain: "** is exponentiation. ^ is bitwise XOR, a common trap for people coming from other tools." },
            { q: "What does round(2.5) return?", options: ["3", "2", "2.5", "Error"], answer: 1, explain: "Python uses banker's rounding: exact halves round to the nearest even number, so 2.5 becomes 2." }
          ]
        },
        {
          id: "py-basics-strings",
          title: "Strings, f-strings, Input and Output",
          minutes: 50,
          objectives: [
            "Create strings with single, double and triple quotes and escape sequences",
            "Index and slice strings, including negative indices",
            "Use common string methods to clean and analyse text",
            "Format output with f-strings and read user input with input()"
          ],
          body: String.raw`
<h3>Strings are text</h3>
<p>A <strong>string</strong> (<code>str</code>) is a sequence of characters: letters, digits, spaces, punctuation, emoji. Text is central to modern AI — chatbots, translation, sentiment analysis and every large language model take strings in and give strings out — so string skills pay off quickly.</p>
<p>You can use single or double quotes; they behave the same. Pick the one that avoids clashing with quotes inside the text. <strong>Triple quotes</strong> create multi-line strings, which you will use for long prompts to LLMs.</p>
<pre><code class="lang-python runnable">a = 'single quotes'
b = "double quotes"
c = "It's easy"                 # apostrophe inside double quotes
prompt = """You are a helpful assistant.
Answer in one sentence."""
print(a, "|", b, "|", c)
print(prompt)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">single quotes | double quotes | It's easy
You are a helpful assistant.
Answer in one sentence.</code></pre>

<h3>Escape sequences</h3>
<p>A backslash starts an <strong>escape sequence</strong>, a way to write special characters: <code>\n</code> is a newline, <code>\t</code> a tab, <code>\"</code> a literal double quote and <code>\\</code> a literal backslash. Putting <code>r</code> before the quotes makes a <strong>raw string</strong> in which backslashes are kept as-is — handy for Windows paths.</p>
<pre><code class="lang-python runnable">print("line one\nline two")
print("name\tscore")
print("She said \"hi\"")
print(r"C:\new\data")       # raw string: \n is NOT a newline here</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">line one
line two
name	score
She said "hi"
C:\new\data</code></pre>

<h3>Length, indexing and slicing</h3>
<p><code>len(s)</code> gives the number of characters. Each character has a position called an <strong>index</strong>, and indices <strong>start at 0</strong>. Negative indices count from the end: <code>-1</code> is the last character.</p>
<pre><code class="lang-text"> P   y   t   h   o   n
 0   1   2   3   4   5
-6  -5  -4  -3  -2  -1</code></pre>
<pre><code class="lang-python runnable">word = "Python"
print(len(word))
print(word[0], word[5], word[-1], word[-2])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">6
P n n o</code></pre>
<p>A <strong>slice</strong> <code>s[start:stop]</code> takes characters from <code>start</code> up to <em>but not including</em> <code>stop</code>. Leave out <code>start</code> to begin at 0, leave out <code>stop</code> to go to the end. A third number is the <strong>step</strong>.</p>
<pre><code class="lang-python runnable">word = "Python"
print(word[0:2])     # 'Py'  (positions 0 and 1)
print(word[2:])      # from position 2 to the end
print(word[:-1])     # everything except the last character
print(word[::2])     # every second character
print(word[::-1])    # reversed

filename = "report_2024.csv"
print(filename[-4:])   # last four characters: the extension</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Py
thon
Pytho
Pto
nohtyP
.csv</code></pre>
<p>"Up to but not including" feels odd at first, but it has a neat property: <code>s[:k] + s[k:]</code> is always the whole string, and <code>s[a:b]</code> has exactly <code>b - a</code> characters. Lists use exactly the same slicing rules.</p>
<div class="callout warn"><strong>IndexError:</strong> <code>word[6]</code> on a 6-character string fails with <code>IndexError: string index out of range</code> — the last valid index is <code>len(word) - 1</code>. Slices, by contrast, never fail: <code>word[2:100]</code> just stops at the end.</div>

<h3>Strings are immutable</h3>
<p>You cannot change a string in place: <code>word[0] = "J"</code> raises <code>TypeError: 'str' object does not support item assignment</code>. Instead, build a <em>new</em> string: <code>"J" + word[1:]</code>. Every string method below returns a new string and leaves the original untouched.</p>

<h3>String methods: cleaning and analysing text</h3>
<p>A <strong>method</strong> is a function attached to an object, called with a dot: <code>text.lower()</code>. Strings have dozens; these are the ones you will use constantly when preparing text data:</p>
<pre><code class="lang-python runnable">raw = "   The Movie was GREAT, great acting!  "
clean = raw.strip()                  # remove spaces at both ends
print(clean)
print(clean.lower())                 # all lowercase
print(clean.upper())
print(clean.replace("GREAT", "good"))
print(clean.lower().count("great"))  # how many times it appears
print(clean.startswith("The"), clean.endswith("!"))
print(clean.find("acting"))          # index of first match (-1 if none)
print("great" in clean.lower())      # membership test</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">The Movie was GREAT, great acting!
the movie was great, great acting!
THE MOVIE WAS GREAT, GREAT ACTING!
The Movie was good, great acting!
2
True True
27
True</code></pre>
<p>Methods can be <strong>chained</strong>: <code>clean.lower().count("great")</code> first lowercases, then counts in the result. Notice that <code>raw</code> itself never changed — you must store the result (<code>clean = raw.strip()</code>) to keep it.</p>

<h3>split and join: from text to words and back</h3>
<p><code>split()</code> breaks a string into a <strong>list</strong> of pieces (by default at any whitespace). <code>join()</code> does the reverse, gluing a list of strings together with a separator. Splitting text into words is the simplest form of <strong>tokenization</strong>, the first step of every language model pipeline.</p>
<pre><code class="lang-python runnable">sentence = "deep learning needs lots of data"
words = sentence.split()
print(words)
print(len(words), "words")

csv_line = "alice,0.91,passed"
print(csv_line.split(","))

print("-".join(["2024", "06", "15"]))
print(" ".join(reversed(words)))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['deep', 'learning', 'needs', 'lots', 'of', 'data']
6 words
['alice', '0.91', 'passed']
2024-06-15
data of lots needs learning deep</code></pre>

<h3>f-strings: the best way to format output</h3>
<p>An <strong>f-string</strong> (formatted string literal) has an <code>f</code> before the opening quote. Inside it, anything in curly braces <code>{ }</code> is evaluated as Python and inserted as text. No <code>str()</code> conversions, no <code>+</code> juggling:</p>
<pre><code class="lang-python runnable">model = "bert-base"
accuracy = 0.912345
n = 1234567

print(f"Model {model} scored {accuracy}")
print(f"Rounded: {accuracy:.2f}")          # 2 decimal places
print(f"As percent: {accuracy:.1%}")       # multiply by 100, add %
print(f"Rows: {n:,}")                      # thousands separators
print(f"Twice: {n * 2}")                   # any expression works
print(f"[{model:&gt;12}]")                    # right-align in 12 chars
print(f"[{model:&lt;12}]")                    # left-align
print(f"{accuracy=}")                      # debug form: shows name and value</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Model bert-base scored 0.912345
Rounded: 0.91
As percent: 91.2%
Rows: 1,234,567
Twice: 2469134
[   bert-base]
[bert-base   ]
accuracy=0.912345</code></pre>
<p>The part after the colon is a <strong>format specification</strong>: <code>.2f</code> = fixed-point with 2 decimals, <code>.1%</code> = percentage with 1 decimal, <code>,</code> = thousands separator, <code>&gt;12</code>/<code>&lt;12</code> = align within a width of 12. These let you print tidy result tables:</p>
<pre><code class="lang-python runnable">print(f"{'model':&lt;10}{'acc':&gt;6}")
print(f"{'logreg':&lt;10}{0.8312:&gt;6.2f}")
print(f"{'forest':&lt;10}{0.8875:&gt;6.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">model        acc
logreg      0.83
forest      0.89</code></pre>

<h3>print() options</h3>
<p><code>print</code> accepts <code>sep</code> (what goes between values, default a space) and <code>end</code> (what goes at the end, default a newline):</p>
<pre><code class="lang-python runnable">print("a", "b", "c", sep=", ")
print("Loading", end="")
print("...", end="")
print(" done")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">a, b, c
Loading... done</code></pre>

<h3>Reading input from the user</h3>
<p><code>input(prompt)</code> shows the prompt, waits for the user to type a line and press Enter, and returns what they typed <strong>as a string</strong>. Convert it if you need a number. (This example waits for keyboard input, so it is not run automatically here — try it in your own terminal.)</p>
<pre><code class="lang-python">name = input("What is your name? ")
age = int(input("How old are you? "))     # convert text to int
print(f"Hi {name}! Next year you will be {age + 1}.")</code></pre>
<pre><code class="lang-text">What is your name? Ada
How old are you? 36
Hi Ada! Next year you will be 37.</code></pre>
<div class="callout warn"><strong>Common mistakes:</strong> forgetting the <code>f</code> (you get the literal text <code>{name}</code>); forgetting that <code>input()</code> returns text (<code>input() + 1</code> fails); off-by-one slices (remember <code>stop</code> is excluded); and expecting <code>s.upper()</code> to change <code>s</code> (strings are immutable — reassign: <code>s = s.upper()</code>).</div>
`,
          keyPoints: [
            "Strings use single, double or triple quotes; \\n is a newline; r\"...\" makes a raw string.",
            "Indexing starts at 0; negative indices count from the end; s[start:stop] excludes stop.",
            "Strings are immutable: methods like lower(), strip(), replace() return new strings.",
            "split() turns text into a list of pieces; 'sep'.join(list) glues them back.",
            "f-strings insert values with {expr} and format them with specs like :.2f, :.1%, :, and :>10.",
            "input() always returns a string; convert it with int() or float()."
          ],
          exercise: {
            prompt: String.raw`<p>Write a tiny text-statistics tool. Given</p>
<pre><code class="lang-python">review = "  Great phone. Great battery, poor camera.  "</code></pre>
<p>produce:</p>
<pre><code class="lang-text">Cleaned: great phone. great battery, poor camera.
Characters: 40
Words: 6
'great' appears 2 times
First word: great
Last word: camera</code></pre>
<p>Steps: strip and lowercase; count characters with <code>len</code>; split into words; count "great"; for the last word remove the trailing full stop with <code>strip(".")</code>. Use f-strings for every line.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">review = "  Great phone. Great battery, poor camera.  "

cleaned = review.strip().lower()
words = cleaned.split()

print(f"Cleaned: {cleaned}")
print(f"Characters: {len(cleaned)}")
print(f"Words: {len(words)}")
print(f"'great' appears {cleaned.count('great')} times")
print(f"First word: {words[0]}")
print(f"Last word: {words[-1].strip('.')}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Cleaned: great phone. great battery, poor camera.
Characters: 40
Words: 6
'great' appears 2 times
First word: great
Last word: camera</code></pre>
<p><code>strip()</code> removes the surrounding spaces and <code>lower()</code> makes the count case-insensitive. <code>split()</code> gives six words; punctuation stays attached (<code>"phone."</code>), which is why real NLP tokenizers are smarter. <code>words[-1]</code> is <code>"camera."</code> and <code>strip(".")</code> removes dots from its ends. Inside an f-string that uses double quotes, use single quotes for string literals such as <code>'great'</code>.</p>`
          },
          quiz: [
            { q: "Given s = \"machine\", what is s[1:4]?", options: ["mac", "ach", "achi", "chi"], answer: 1, explain: "Indices 1, 2, 3 (stop 4 is excluded): a, c, h." },
            { q: "What does \"a,b,c\".split(\",\") return?", options: ["\"abc\"", "['a', 'b', 'c']", "('a', 'b', 'c')", "['a,b,c']"], answer: 1, explain: "split returns a list of the pieces between separators." },
            { q: "x = 0.4567. What does f\"{x:.1%}\" produce?", options: ["0.5%", "45.7%", "46%", "0.4567%"], answer: 1, explain: "The % format multiplies by 100 and shows 1 decimal place: 45.7%." },
            { q: "After s = \"hello\"; s.upper(), what is s?", options: ["HELLO", "hello", "Hello", "None"], answer: 1, explain: "Strings are immutable; upper() returns a new string, which was thrown away. Use s = s.upper()." },
            { q: "What type does input() return when the user types 42?", options: ["int", "float", "str", "bool"], answer: 2, explain: "input() always returns a string. Convert with int(...) to do arithmetic." }
          ]
        },
        {
          id: "py-basics-conditions",
          title: "Booleans, Comparisons and if/elif/else",
          minutes: 40,
          objectives: [
            "Use comparison operators and combine conditions with and, or, not",
            "Write if, elif and else blocks with correct indentation",
            "Explain truthiness: which values count as True or False",
            "Turn a model's probability into a decision with threshold logic"
          ],
          body: String.raw`
<h3>Booleans</h3>
<p>A <strong>Boolean</strong> (<code>bool</code>) has only two possible values: <code>True</code> and <code>False</code> (capitalised). Booleans are the answers to yes/no questions, and they are how programs make decisions. You usually get them from <strong>comparisons</strong>:</p>
<table>
<thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
<tbody>
<tr><td><code>==</code></td><td>equal to</td><td><code>3 == 3</code></td><td><code>True</code></td></tr>
<tr><td><code>!=</code></td><td>not equal to</td><td><code>3 != 4</code></td><td><code>True</code></td></tr>
<tr><td><code>&lt;</code> / <code>&gt;</code></td><td>less / greater than</td><td><code>2 &gt; 5</code></td><td><code>False</code></td></tr>
<tr><td><code>&lt;=</code> / <code>&gt;=</code></td><td>less / greater or equal</td><td><code>5 &gt;= 5</code></td><td><code>True</code></td></tr>
</tbody></table>
<pre><code class="lang-python runnable">accuracy = 0.87
print(accuracy &gt; 0.9)
print(accuracy &gt;= 0.85)
print("cat" == "Cat")          # strings compare exactly, case matters
print(0 &lt;= accuracy &lt;= 1)      # chained comparison: is it between 0 and 1?
result = accuracy &gt; 0.8
print(result, type(result))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">False
True
False
True
True &lt;class 'bool'&gt;</code></pre>
<p>Python allows <strong>chained comparisons</strong> like <code>0 &lt;= x &lt;= 1</code>, meaning <code>0 &lt;= x and x &lt;= 1</code>. It reads exactly like maths.</p>

<h3>Logical operators: and, or, not</h3>
<ul>
  <li><code>a and b</code> is True only if <strong>both</strong> are True.</li>
  <li><code>a or b</code> is True if <strong>at least one</strong> is True.</li>
  <li><code>not a</code> flips True to False and vice versa.</li>
</ul>
<pre><code class="lang-python runnable">accuracy = 0.91
latency_ms = 250
print(accuracy &gt; 0.9 and latency_ms &lt; 200)   # good AND fast?
print(accuracy &gt; 0.9 or latency_ms &lt; 200)    # good OR fast?
print(not latency_ms &lt; 200)                   # NOT fast?</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">False
True
True</code></pre>
<p><code>and</code> and <code>or</code> are <strong>short-circuit</strong> operators: Python stops evaluating as soon as the answer is known. In <code>count &gt; 0 and total / count &gt; 5</code>, if <code>count</code> is 0 the division never runs, so no <code>ZeroDivisionError</code>. This is a common, useful guard.</p>

<h3>The if statement</h3>
<p>An <code>if</code> statement runs a block of code only when a condition is True. The syntax has three essential parts: the keyword <code>if</code>, the condition, a <strong>colon</strong>, and then an <strong>indented block</strong>.</p>
<pre><code class="lang-python runnable">probability = 0.83     # model's predicted chance that an email is spam

if probability &gt;= 0.5:
    print("Label: spam")
    print("Moving to spam folder")
print("Finished checking")      # not indented: always runs</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Label: spam
Moving to spam folder
Finished checking</code></pre>
<p><strong>Indentation is part of Python's syntax.</strong> Other languages use braces <code>{ }</code> to group lines; Python uses the indentation itself. All lines indented under the <code>if</code> belong to it; the first line back at the original level ends the block. The standard is <strong>4 spaces</strong> per level (VS Code inserts them when you press Tab). Mixing tabs and spaces or misaligning a line causes an <code>IndentationError</code>.</p>

<h3>else and elif</h3>
<p><code>else</code> gives an alternative when the condition is False. <code>elif</code> ("else if") lets you test several conditions in order; Python runs the <strong>first</strong> branch whose condition is True and skips the rest.</p>
<pre><code class="lang-python runnable">def grade(score):
    if score &gt;= 0.9:
        return "excellent"
    elif score &gt;= 0.75:
        return "good"
    elif score &gt;= 0.5:
        return "needs work"
    else:
        return "failing"

for s in [0.95, 0.8, 0.6, 0.3]:
    print(s, "-&gt;", grade(s))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.95 -&gt; excellent
0.8 -&gt; good
0.6 -&gt; needs work
0.3 -&gt; failing</code></pre>
<p>(We wrapped the logic in a <em>function</em> and used a <em>loop</em> to try several values; both are taught properly soon — focus on the <code>if/elif/else</code> chain.) Order matters: because 0.95 is also ≥ 0.75, the "excellent" test must come first. Once a branch runs, later <code>elif</code>s are not even checked.</p>

<h3>Truthiness</h3>
<p>An <code>if</code> condition does not have to be a real Boolean. Python treats every value as "truthy" or "falsy". The falsy values are: <code>False</code>, <code>None</code>, <code>0</code>, <code>0.0</code>, empty string <code>""</code>, and empty collections (<code>[]</code>, <code>{}</code>, <code>()</code>, <code>set()</code>). Everything else is truthy. This allows concise checks:</p>
<pre><code class="lang-python runnable">user_text = ""
predictions = [1, 0, 1]
model = None

if not user_text:
    print("Please type a question")
if predictions:
    print("We have", len(predictions), "predictions")
if model is None:
    print("Model not trained yet")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Please type a question
We have 3 predictions
Model not trained yet</code></pre>
<p>To test for <code>None</code>, use <code>is None</code> / <code>is not None</code> rather than <code>== None</code>. <code>is</code> checks whether two names refer to the very same object, and there is only one <code>None</code> object.</p>

<h3>Nested conditions and the conditional expression</h3>
<p>Blocks can contain other <code>if</code> statements (each level indented further), but deep nesting gets hard to read; combining conditions with <code>and</code> is often clearer. For simple either/or values, Python has a one-line <strong>conditional expression</strong>: <code>value_if_true if condition else value_if_false</code>.</p>
<pre><code class="lang-python runnable">probability = 0.42
label = "positive" if probability &gt;= 0.5 else "negative"
print(label)

confidence = 0.97
is_flagged = True
if is_flagged:
    if confidence &gt; 0.95:
        print("Auto-block")
    else:
        print("Send to human review")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">negative
Auto-block</code></pre>

<h3>A realistic decision: confidence thresholds</h3>
<p>Real AI systems rarely trust every prediction. A common pattern is: act automatically when the model is very confident, ask a human when it is unsure.</p>
<pre><code class="lang-python runnable">probability_fraud = 0.67

if probability_fraud &gt;= 0.9:
    action = "block transaction"
elif probability_fraud &gt;= 0.6:
    action = "ask customer to confirm"
else:
    action = "approve"

print(f"p={probability_fraud:.2f} -&gt; {action}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">p=0.67 -&gt; ask customer to confirm</code></pre>

<div class="callout warn"><strong>Common mistakes:</strong>
<ul>
<li><code>if x = 5:</code> is a SyntaxError — comparison is <code>==</code>.</li>
<li>Forgetting the colon at the end of <code>if</code>/<code>elif</code>/<code>else</code> lines.</li>
<li><code>if label == "cat" or "dog":</code> is always True! It means <code>(label == "cat") or ("dog")</code>, and a non-empty string is truthy. Write <code>label == "cat" or label == "dog"</code>, or better <code>label in ("cat", "dog")</code>.</li>
<li>Wrongly ordered <code>elif</code> branches, so a broad condition catches values meant for a narrower one.</li>
</ul></div>
<h3>Thinking in conditions</h3>
<p>Before writing an <code>if</code> chain, it often helps to write the rules in plain language first, as a small table of situations and actions. Then check two things: <strong>are the cases complete?</strong> (does every possible input land in some branch — that is the job of the final <code>else</code>) and <strong>are they in the right order?</strong> (the most specific or most important checks first). Many real bugs are not syntax errors but a missing case: what happens when the probability is exactly 0.5, when a list is empty, when a value is <code>None</code>?</p>
<p>Boundaries deserve special attention. Is the rule "0.5 or above" (<code>&gt;=</code>) or "above 0.5" (<code>&gt;</code>)? In a fraud system that decision changes which transactions are blocked. Write the boundary into a test: try the exact threshold value and the values just below and above it.</p>
<p>In AI applications, conditions appear everywhere around the model: validating inputs before prediction (is the text empty? too long?), turning probabilities into decisions, routing low-confidence cases to humans, choosing which model to call, and deciding when training should stop. The model itself produces numbers; the <code>if</code> statements around it turn those numbers into behaviour. Keeping that decision logic simple, ordered and well-tested is part of building trustworthy AI systems.</p>
`,
          keyPoints: [
            "Comparisons (==, !=, <, >, <=, >=) produce True or False; chains like 0 <= x <= 1 work.",
            "and/or/not combine conditions and short-circuit, which can guard against errors.",
            "if/elif/else runs the first branch whose condition is True; blocks are defined by 4-space indentation and start after a colon.",
            "Falsy values: False, None, 0, 0.0, empty strings and empty collections; everything else is truthy.",
            "Use 'is None' to test for None, and 'x in (a, b)' instead of the broken 'x == a or b'."
          ],
          exercise: {
            prompt: String.raw`<p>A content-moderation model returns a <code>toxicity</code> score between 0 and 1. Write code that sets <code>decision</code> according to these rules and prints it:</p>
<ul>
<li>If the score is outside 0–1, decision is <code>"invalid score"</code>.</li>
<li>If score ≥ 0.85: <code>"remove"</code>.</li>
<li>If score ≥ 0.5 and the user is new (<code>is_new_user = True</code>): <code>"hold for review"</code>.</li>
<li>If score ≥ 0.5 and not new: <code>"publish with warning"</code>.</li>
<li>Otherwise: <code>"publish"</code>.</li>
</ul>
<p>Test it with scores 1.2, 0.9, 0.6 (new user), 0.6 (old user) and 0.1. Expected output:</p>
<pre><code class="lang-text">1.2 True invalid score
0.9 True remove
0.6 True hold for review
0.6 False publish with warning
0.1 False publish</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">tests = [(1.2, True), (0.9, True), (0.6, True), (0.6, False), (0.1, False)]

for toxicity, is_new_user in tests:
    if not 0 &lt;= toxicity &lt;= 1:
        decision = "invalid score"
    elif toxicity &gt;= 0.85:
        decision = "remove"
    elif toxicity &gt;= 0.5 and is_new_user:
        decision = "hold for review"
    elif toxicity &gt;= 0.5:
        decision = "publish with warning"
    else:
        decision = "publish"
    print(toxicity, is_new_user, decision)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">1.2 True invalid score
0.9 True remove
0.6 True hold for review
0.6 False publish with warning
0.1 False publish</code></pre>
<p>The validity check comes first so bad inputs never reach the other rules. The order of the two "≥ 0.5" branches matters: the more specific one (new user) is tested first. The loop over pairs of values is a preview of the loops and tuples lessons; you could equally test each case by changing the two variables by hand.</p>`
          },
          quiz: [
            { q: "What does 3 < 5 and 5 < 4 evaluate to?", options: ["True", "False", "5", "Error"], answer: 1, explain: "and needs both sides True; 5 < 4 is False, so the whole expression is False." },
            { q: "Which of these values is truthy?", options: ["0", "\"\"", "[]", "\"False\""], answer: 3, explain: "\"False\" is a non-empty string, so it is truthy. 0, the empty string and the empty list are falsy." },
            { q: "score = 0.95. Which branch runs?\nif score >= 0.5: A\nelif score >= 0.9: B\nelse: C", options: ["A", "B", "Both A and B", "C"], answer: 0, explain: "Python runs the first True branch only. 0.95 >= 0.5 is True, so A runs and B is never checked - the conditions are badly ordered." },
            { q: "Why is if label == \"cat\" or \"dog\": always True?", options: ["Because == has a bug", "It means (label == \"cat\") or \"dog\", and \"dog\" is a truthy non-empty string", "Because or always returns True", "It isn't; it works correctly"], answer: 1, explain: "Each side of or is evaluated separately. Use label in (\"cat\", \"dog\")." },
            { q: "What defines which lines belong to an if block in Python?", options: ["Curly braces", "The end keyword", "Indentation", "Semicolons"], answer: 2, explain: "Python uses indentation (conventionally 4 spaces) after the colon to group the block." }
          ]
        },
        {
          id: "py-basics-loops",
          title: "Loops: for, while, range, enumerate and zip",
          minutes: 50,
          objectives: [
            "Repeat work with for loops over lists, strings and range()",
            "Use while loops for repeat-until-condition logic and avoid infinite loops",
            "Control loops with break and continue",
            "Use enumerate() and zip() to loop with indices and over parallel sequences",
            "Apply the accumulator pattern to compute totals, counts and best values"
          ],
          body: String.raw`
<h3>Why loops?</h3>
<p>Computers shine at repetition. A <strong>loop</strong> runs the same block of code many times — once for every row of a dataset, every word in a document, every training epoch. Without loops you would have to copy a line a million times.</p>

<h3>The for loop</h3>
<p>A <code>for</code> loop takes each item of a sequence in turn, attaches a <strong>loop variable</strong> to it, and runs the indented block:</p>
<pre><code class="lang-python runnable">models = ["logistic regression", "random forest", "neural net"]
for model in models:
    print("Training", model)
print("All done")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Training logistic regression
Training random forest
Training neural net
All done</code></pre>
<p>Read it as "for each <code>model</code> in <code>models</code>, do this". The name <code>model</code> is your choice; pick something that describes one item (<code>for row in rows</code>, <code>for word in words</code>). Like <code>if</code>, the line ends with a colon and the body is indented. Anything you can loop over is called an <strong>iterable</strong>: lists, strings (character by character), dictionaries, files and more.</p>
<pre><code class="lang-python runnable">for ch in "AI!":
    print(ch)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">A
I
!</code></pre>

<h3>range(): looping a number of times</h3>
<p><code>range</code> produces a sequence of integers without building a list in memory:</p>
<ul>
  <li><code>range(5)</code> → 0, 1, 2, 3, 4 (five numbers, starting at 0, stopping <em>before</em> 5)</li>
  <li><code>range(2, 6)</code> → 2, 3, 4, 5</li>
  <li><code>range(0, 10, 3)</code> → 0, 3, 6, 9 (step of 3)</li>
  <li><code>range(5, 0, -1)</code> → 5, 4, 3, 2, 1 (counting down)</li>
</ul>
<pre><code class="lang-python runnable">for epoch in range(1, 4):
    print(f"Epoch {epoch}/3")

print(list(range(0, 10, 3)))   # list() shows the numbers</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Epoch 1/3
Epoch 2/3
Epoch 3/3
[0, 3, 6, 9]</code></pre>

<h3>The accumulator pattern</h3>
<p>The most important loop pattern: start a variable before the loop, update it inside, use it after. Here we compute a total, a count and a maximum by hand (this is what <code>sum</code>, <code>len</code> and <code>max</code> do internally):</p>
<pre><code class="lang-python runnable">scores = [0.72, 0.91, 0.85, 0.64, 0.88]

total = 0
passed = 0
best = scores[0]
for s in scores:
    total += s
    if s &gt;= 0.8:
        passed += 1
    if s &gt; best:
        best = s

print(f"average={total / len(scores):.3f} passed={passed} best={best}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">average=0.800 passed=3 best=0.91</code></pre>

<h3>The while loop</h3>
<p>A <code>while</code> loop repeats <strong>as long as a condition stays True</strong>. Use it when you don't know in advance how many repetitions are needed — "keep training until the loss is small enough".</p>
<pre><code class="lang-python runnable">loss = 1.0
epoch = 0
while loss &gt; 0.2:
    epoch += 1
    loss = loss * 0.6          # pretend each epoch reduces loss by 40%
    print(f"epoch {epoch}: loss={loss:.3f}")
print("Converged after", epoch, "epochs")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">epoch 1: loss=0.600
epoch 2: loss=0.360
epoch 3: loss=0.216
epoch 4: loss=0.130
Converged after 4 epochs</code></pre>
<p>The condition is checked before each repetition. Something inside the loop <strong>must</strong> eventually make it False; otherwise you get an <strong>infinite loop</strong> that never ends. If that happens, press <code>Ctrl+C</code> in the terminal to stop the program (or the ■ stop button in a notebook).</p>

<h3>break and continue</h3>
<ul>
  <li><code>break</code> leaves the loop immediately.</li>
  <li><code>continue</code> skips the rest of the current repetition and jumps to the next item.</li>
</ul>
<pre><code class="lang-python runnable">readings = [12.0, -1.0, 15.5, 14.0, 999.0, 13.2]

for r in readings:
    if r &lt; 0:
        print("skip invalid reading", r)
        continue              # go to the next reading
    if r &gt; 100:
        print("sensor failure, stopping")
        break                 # exit the loop entirely
    print("ok", r)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">ok 12.0
skip invalid reading -1.0
ok 15.5
ok 14.0
sensor failure, stopping</code></pre>
<p>Notice 13.2 was never processed: <code>break</code> ended the loop. A common real-world use of <code>break</code> is <strong>early stopping</strong>: stop training when validation performance stops improving.</p>
<pre><code class="lang-python runnable">val_losses = [0.90, 0.70, 0.62, 0.64, 0.66, 0.61]
best = float("inf")          # "infinity": anything is smaller
patience, bad_epochs = 2, 0

for epoch, loss in enumerate(val_losses, start=1):
    if loss &lt; best:
        best, bad_epochs = loss, 0
    else:
        bad_epochs += 1
    if bad_epochs &gt;= patience:
        print(f"Early stop at epoch {epoch}, best loss {best}")
        break</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Early stop at epoch 5, best loss 0.62</code></pre>

<h3>enumerate(): index and item together</h3>
<p>Often you need the position as well as the item. Beginners write <code>for i in range(len(items))</code> and then <code>items[i]</code>; the Pythonic way is <code>enumerate</code>, which yields pairs (index, item). The <code>start</code> argument sets the first number.</p>
<pre><code class="lang-python runnable">labels = ["cat", "dog", "bird"]
for i, label in enumerate(labels):
    print(i, label)
for rank, label in enumerate(labels, start=1):
    print(f"#{rank}: {label}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0 cat
1 dog
2 bird
#1: cat
#2: dog
#3: bird</code></pre>

<h3>zip(): walking through sequences in parallel</h3>
<p><code>zip</code> pairs up items from two or more sequences, like a zipper joining two sides. This is exactly what you need to compare a model's predictions with the true answers:</p>
<pre><code class="lang-python runnable">predictions = [1, 0, 1, 1, 0]
actual      = [1, 0, 0, 1, 1]

correct = 0
for pred, true in zip(predictions, actual):
    if pred == true:
        correct += 1
print(f"accuracy = {correct}/{len(actual)} = {correct / len(actual)}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">accuracy = 3/5 = 0.6</code></pre>
<p>If the sequences have different lengths, <code>zip</code> stops at the shortest one silently. (In Python 3.10+, <code>zip(a, b, strict=True)</code> raises an error instead, which catches data bugs.)</p>

<h3>Nested loops</h3>
<p>A loop inside a loop runs the inner loop completely for every item of the outer loop. This is how a <strong>grid search</strong> tries every combination of hyperparameters:</p>
<pre><code class="lang-python runnable">for lr in [0.1, 0.01]:
    for batch in [16, 32]:
        print(f"try lr={lr} batch={batch}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">try lr=0.1 batch=16
try lr=0.1 batch=32
try lr=0.01 batch=16
try lr=0.01 batch=32</code></pre>
<p>Nested loops multiply: 2 × 2 = 4 runs here, but 10 values × 10 values × 10 values is 1000 runs. Keep this in mind when loops are slow.</p>

<div class="callout warn"><strong>Common mistakes:</strong>
<ul>
<li>Off-by-one with <code>range</code>: <code>range(1, 10)</code> stops at 9.</li>
<li>Forgetting to update the variable in a <code>while</code> loop → infinite loop.</li>
<li>Resetting an accumulator <em>inside</em> the loop (<code>total = 0</code> must come before the loop).</li>
<li>Changing a list while looping over it (e.g. removing items) — skips elements. Build a new list instead.</li>
</ul></div>
<div class="callout tip"><strong>Performance note for later:</strong> plain Python loops handle thousands of items easily, but for millions of numbers you will use NumPy and pandas, which perform the loop in fast compiled code ("vectorisation"). Understanding loops first makes it clear what those libraries are doing for you.</div>
<h3>Choosing the right loop</h3>
<p>A quick decision guide:</p>
<ul>
  <li>You have a collection and want to process each item → <code>for item in collection</code>.</li>
  <li>You need to repeat something a fixed number of times → <code>for i in range(n)</code>.</li>
  <li>You need positions as well → <code>enumerate</code>. Two or more aligned sequences → <code>zip</code>.</li>
  <li>You don't know how many repetitions are needed, only when to stop → <code>while condition</code> (and make sure the condition can become False).</li>
</ul>
<p>When a loop does something surprising, trace it by hand for the first two or three iterations: write down the value of every variable at the start of each pass. Or add a temporary <code>print(f"{i=} {total=}")</code> inside the loop. Most loop bugs show up in the first iteration (wrong starting value) or the last (off-by-one).</p>
<p>The training loop of every neural network you will meet later has the same skeleton you practised here: <code>for epoch in range(num_epochs):</code> containing <code>for batch in data:</code>, computing a loss, accumulating a running total, logging every N steps with <code>%</code>, and possibly <code>break</code>-ing early when validation stops improving. Libraries hide some of it, but understanding these plain loops is what lets you read and modify that code confidently.</p>
`,
          keyPoints: [
            "for item in iterable: runs the block once per item; range(start, stop, step) generates integers and excludes stop.",
            "Accumulator pattern: initialise before the loop, update inside, use after.",
            "while condition: repeats until the condition is False; make sure it eventually becomes False (Ctrl+C stops a runaway loop).",
            "break exits a loop; continue skips to the next item (early stopping is a break).",
            "enumerate() gives (index, item); zip() pairs items from parallel sequences such as predictions and labels."
          ],
          exercise: {
            prompt: String.raw`<p>You have the true labels and a model's predicted probabilities for 6 examples:</p>
<pre><code class="lang-python">actual = [1, 0, 1, 1, 0, 0]
probs  = [0.9, 0.4, 0.35, 0.8, 0.6, 0.1]</code></pre>
<p>Using a threshold of 0.5 (probability ≥ 0.5 → predict 1), loop over the data with <code>enumerate</code> and <code>zip</code> together, print each example, and count true positives (predicted 1, actual 1), false positives (predicted 1, actual 0) and false negatives (predicted 0, actual 1). Finally print precision = TP / (TP + FP) and recall = TP / (TP + FN), both with 2 decimals.</p>
<p>Expected output:</p>
<pre><code class="lang-text">0: p=0.90 pred=1 actual=1
1: p=0.40 pred=0 actual=0
2: p=0.35 pred=0 actual=1
3: p=0.80 pred=1 actual=1
4: p=0.60 pred=1 actual=0
5: p=0.10 pred=0 actual=0
TP=2 FP=1 FN=1
precision=0.67 recall=0.67</code></pre>
<p>Hint: <code>for i, (p, a) in enumerate(zip(probs, actual)):</code></p>`,
            solution: String.raw`<pre><code class="lang-python runnable">actual = [1, 0, 1, 1, 0, 0]
probs  = [0.9, 0.4, 0.35, 0.8, 0.6, 0.1]
threshold = 0.5

tp = fp = fn = 0
for i, (p, a) in enumerate(zip(probs, actual)):
    pred = 1 if p &gt;= threshold else 0
    print(f"{i}: p={p:.2f} pred={pred} actual={a}")
    if pred == 1 and a == 1:
        tp += 1
    elif pred == 1 and a == 0:
        fp += 1
    elif pred == 0 and a == 1:
        fn += 1

print(f"TP={tp} FP={fp} FN={fn}")
precision = tp / (tp + fp)
recall = tp / (tp + fn)
print(f"precision={precision:.2f} recall={recall:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0: p=0.90 pred=1 actual=1
1: p=0.40 pred=0 actual=0
2: p=0.35 pred=0 actual=1
3: p=0.80 pred=1 actual=1
4: p=0.60 pred=1 actual=0
5: p=0.10 pred=0 actual=0
TP=2 FP=1 FN=1
precision=0.67 recall=0.67</code></pre>
<p><code>zip</code> pairs each probability with its label; <code>enumerate</code> wraps those pairs with an index, so each loop step gives <code>(i, (p, a))</code>. The conditional expression turns a probability into a 0/1 prediction. Precision answers "of the things we flagged, how many were right?" and recall "of the real positives, how many did we find?" — two metrics you will meet again in the ML tracks.</p>`
          },
          quiz: [
            { q: "Which numbers does range(2, 8, 2) produce?", options: ["2, 4, 6, 8", "2, 4, 6", "0, 2, 4, 6", "2, 8"], answer: 1, explain: "Start at 2, step 2, stop before 8: 2, 4, 6." },
            { q: "What does continue do inside a loop?", options: ["Exits the loop", "Skips the rest of this iteration and moves to the next item", "Restarts the loop from the first item", "Pauses the program"], answer: 1, explain: "continue jumps to the next iteration; break exits the loop entirely." },
            { q: "What does list(zip([1, 2, 3], [\"a\", \"b\"])) return?", options: ["[(1, 'a'), (2, 'b'), (3, None)]", "[(1, 'a'), (2, 'b')]", "An error", "[1, 'a', 2, 'b', 3]"], answer: 1, explain: "zip stops at the shortest input, so only two pairs are produced." },
            { q: "A while loop never stops. What is the most likely cause?", options: ["The loop variable is never updated so the condition stays True", "while loops always need break", "Python limits loops to 1000 iterations", "The indentation is 4 spaces"], answer: 0, explain: "If nothing in the body changes the condition, it stays True forever. Press Ctrl+C to interrupt." },
            { q: "What is the Pythonic way to get both the index and the item while looping over a list?", options: ["for i in range(len(items))", "for i, item in enumerate(items)", "for item in items.index()", "for (i, item) in items"], answer: 1, explain: "enumerate yields (index, item) pairs, which you unpack into two loop variables." }
          ]
        }
      ]
    },
    {
      id: "py-data",
      title: "Data Structures",
      summary: "Organise many values at once with lists, tuples, dictionaries and sets, and transform them concisely with comprehensions.",
      lessons: [
        {
          id: "py-data-lists",
          title: "Lists: Ordered, Changeable Collections",
          minutes: 50,
          objectives: [
            "Create lists, access items by index and take slices",
            "Modify lists with append, extend, insert, remove, pop and item assignment",
            "Sort lists with sort() and sorted(), including with a key function",
            "Explain aliasing (two names, one list) and make real copies when needed"
          ],
          body: String.raw`
<h3>What a list is</h3>
<p>A <strong>list</strong> holds many values in a specific order, inside square brackets and separated by commas. Think of a numbered shopping list or a column in a spreadsheet. Lists are the workhorse collection of Python: a column of measurements, a batch of sentences, the losses recorded after each epoch.</p>
<pre><code class="lang-python runnable">losses = [0.95, 0.71, 0.58, 0.52]
words = ["the", "cat", "sat"]
mixed = [1, "two", 3.0, True, None]   # allowed, but usually keep one type
empty = []

print(losses)
print(len(words), len(empty))
print(type(losses))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0.95, 0.71, 0.58, 0.52]
3 0
&lt;class 'list'&gt;</code></pre>

<h3>Indexing and slicing (same rules as strings)</h3>
<p>Lists are indexed from 0, negative indices count from the end, and slices exclude the stop position — exactly like strings.</p>
<pre><code class="lang-python runnable">losses = [0.95, 0.71, 0.58, 0.52, 0.50]
print(losses[0])       # first
print(losses[-1])      # last
print(losses[1:3])     # positions 1 and 2
print(losses[-2:])     # last two
print(losses[::2])     # every second item</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.95
0.5
[0.71, 0.58]
[0.52, 0.5]
[0.95, 0.58, 0.5]</code></pre>
<p>Slicing is how you split data: <code>data[:800]</code> for training and <code>data[800:]</code> for testing is the simplest train/test split.</p>

<h3>Lists are mutable</h3>
<p>Unlike strings, lists are <strong>mutable</strong>: you can change them in place after creating them. Assign to an index to replace an item:</p>
<pre><code class="lang-python runnable">labels = ["cat", "dgo", "bird"]
labels[1] = "dog"           # fix a typo in place
print(labels)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['cat', 'dog', 'bird']</code></pre>

<h3>Adding and removing items</h3>
<table>
<thead><tr><th>Method</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><code>lst.append(x)</code></td><td>add one item to the end</td></tr>
<tr><td><code>lst.extend(other)</code></td><td>add every item of another list to the end</td></tr>
<tr><td><code>lst.insert(i, x)</code></td><td>insert <code>x</code> before position <code>i</code></td></tr>
<tr><td><code>lst.remove(x)</code></td><td>remove the first item equal to <code>x</code> (error if absent)</td></tr>
<tr><td><code>lst.pop()</code> / <code>lst.pop(i)</code></td><td>remove and <em>return</em> the last item / the item at <code>i</code></td></tr>
<tr><td><code>del lst[i]</code></td><td>delete the item at position <code>i</code></td></tr>
<tr><td><code>lst.clear()</code></td><td>remove everything</td></tr>
</tbody></table>
<pre><code class="lang-python runnable">history = []
for epoch_loss in [0.9, 0.7, 0.6]:
    history.append(epoch_loss)       # the classic "collect results" pattern
print(history)

history.extend([0.55, 0.52])
print(history)

history.insert(0, 1.2)               # put an initial value at the front
print(history)

last = history.pop()
print("popped", last, "-&gt;", history)

history.remove(1.2)
print(history)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0.9, 0.7, 0.6]
[0.9, 0.7, 0.6, 0.55, 0.52]
[1.2, 0.9, 0.7, 0.6, 0.55, 0.52]
popped 0.52 -&gt; [1.2, 0.9, 0.7, 0.6, 0.55]
[0.9, 0.7, 0.6, 0.55]</code></pre>
<div class="callout warn"><strong>append vs extend:</strong> <code>a.append([4, 5])</code> adds <em>one</em> item that happens to be a list, giving <code>[1, 2, 3, [4, 5]]</code>. <code>a.extend([4, 5])</code> adds two items: <code>[1, 2, 3, 4, 5]</code>. You can also write <code>a + b</code> to create a new combined list.</div>

<h3>Searching and checking</h3>
<pre><code class="lang-python runnable">labels = ["cat", "dog", "cat", "bird", "cat"]
print("dog" in labels)          # membership: True/False
print("fish" not in labels)
print(labels.count("cat"))      # how many times
print(labels.index("bird"))     # position of first match
nums = [3, 9, 1, 7]
print(min(nums), max(nums), sum(nums))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">True
True
3
3
1 9 20</code></pre>

<h3>Sorting: sort() vs sorted()</h3>
<p>There are two ways to sort, and mixing them up is a classic bug:</p>
<ul>
  <li><code>lst.sort()</code> sorts the list <strong>in place</strong> and returns <code>None</code>.</li>
  <li><code>sorted(lst)</code> returns a <strong>new</strong> sorted list and leaves the original alone. It works on any iterable.</li>
</ul>
<pre><code class="lang-python runnable">scores = [0.82, 0.95, 0.61, 0.77]
ranked = sorted(scores, reverse=True)   # new list, highest first
print(ranked)
print(scores)                           # unchanged

scores.sort()                           # changes scores itself
print(scores)

result = scores.sort()
print(result)                           # sort() returns None!</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0.95, 0.82, 0.77, 0.61]
[0.82, 0.95, 0.61, 0.77]
[0.61, 0.77, 0.82, 0.95]
None</code></pre>
<p>The <code>key</code> argument tells Python <em>what</em> to sort by. You pass a function that is applied to each item; items are ordered by the function's result. For example, sort words by length, or by lowercase so capitals don't come first:</p>
<pre><code class="lang-python runnable">words = ["banana", "Apple", "fig", "cherry"]
print(sorted(words))               # capitals sort before lowercase
print(sorted(words, key=str.lower))
print(sorted(words, key=len))      # by length</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['Apple', 'banana', 'cherry', 'fig']
['Apple', 'banana', 'cherry', 'fig']
['fig', 'Apple', 'banana', 'cherry']</code></pre>
<p>"banana" and "cherry" both have 6 letters, so sorting by length treats them as equal; Python then keeps them in their original order. This guarantee is called a <strong>stable sort</strong>. Other useful tools: <code>lst.reverse()</code> reverses in place; <code>reversed(lst)</code> gives a reversed iterator.</p>

<h3>Lists of lists: tables of data</h3>
<p>A list can contain other lists. A list of rows is the simplest way to represent a table — what a CSV file or a spreadsheet looks like once loaded:</p>
<pre><code class="lang-python runnable">rows = [
    ["alice", 34, 0.91],
    ["bob",   28, 0.78],
    ["chen",  45, 0.85],
]
print(rows[1])         # second row
print(rows[1][2])      # second row, third column
for name, age, score in rows:
    print(f"{name:&lt;6} {age:&gt;3} {score:.2f}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['bob', 28, 0.78]
0.78
alice   34 0.91
bob     28 0.78
chen    45 0.85</code></pre>
<p>In the data-analysis track you will use pandas DataFrames for tables, but they are built on this same idea.</p>

<h3>Aliasing: two names, one list</h3>
<p>Remember that variables are labels attached to objects. With lists — which can change — this has a big consequence. <code>b = a</code> does <strong>not</strong> copy the list; it attaches a second label to the <em>same</em> list. Changing it through one name is visible through the other:</p>
<pre><code class="lang-python runnable">a = [1, 2, 3]
b = a              # NOT a copy - same list, two names
b.append(4)
print("a:", a)
print(a is b)      # 'is' checks: same object?

c = a.copy()       # a real, independent copy (also: list(a) or a[:])
c.append(99)
print("a:", a, "c:", c)
print(a is c)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">a: [1, 2, 3, 4]
True
a: [1, 2, 3, 4] c: [1, 2, 3, 4, 99]
False</code></pre>
<p>Use <code>.copy()</code> when you want to modify a list but keep the original — for example, before shuffling a dataset you still need in its original order. Note that <code>.copy()</code> is a <strong>shallow copy</strong>: for a list of lists, the inner lists are still shared. Use <code>copy.deepcopy()</code> from the <code>copy</code> module to copy all levels.</p>

<div class="callout warn"><strong>Common mistakes:</strong>
<ul>
<li><code>scores = scores.sort()</code> — now <code>scores</code> is <code>None</code>. Use either <code>scores.sort()</code> or <code>scores = sorted(scores)</code>.</li>
<li><code>IndexError: list index out of range</code> — accessing <code>lst[len(lst)]</code>; the last index is <code>len(lst) - 1</code> or simply <code>-1</code>.</li>
<li>Thinking <code>b = a</code> copies a list. It doesn't.</li>
<li>Removing items from a list while looping over it — items get skipped. Build a new list of the items you want to keep (comprehensions make this easy).</li>
</ul></div>
<h3>Lists in the bigger picture</h3>
<p>Lists are flexible: they can hold anything, grow and shrink, and be sliced and sorted. That flexibility has a cost. Each item in a Python list is a separate object, and the list stores references to them. For a few thousand items this is irrelevant; for ten million floating-point numbers it is slow and memory-hungry. That is why numeric data science uses <strong>NumPy arrays</strong> (next track), which store numbers packed tightly in one block of memory and process them in compiled code. Pandas DataFrames and PyTorch tensors are built on the same idea.</p>
<p>Fortunately almost everything you learned here carries over: arrays and tensors are indexed from 0, support negative indices and <code>[start:stop:step]</code> slicing, have a length, and can be iterated. You'll even convert between them constantly: <code>np.array(my_list)</code> and <code>array.tolist()</code>.</p>
<p>A good mental model to keep: a list is an <em>ordered row of labelled boxes</em>, numbered from 0, each holding a reference to some object. Assigning <code>lst[i] = x</code> puts a new reference in box <code>i</code>; <code>append</code> adds a box at the end; and <code>b = a</code> gives the same row of boxes a second name. With that picture, aliasing, copying and in-place methods all become predictable.</p>
`,
          keyPoints: [
            "Lists are ordered, mutable collections: [a, b, c]. Index from 0, slice with [start:stop].",
            "append adds one item, extend adds many, pop removes and returns, remove deletes by value.",
            "lst.sort() sorts in place and returns None; sorted(lst) returns a new list. key= controls the sort order.",
            "A list of lists represents a table of rows.",
            "b = a creates an alias, not a copy; use a.copy() (or copy.deepcopy for nested lists)."
          ],
          exercise: {
            prompt: String.raw`<p>You logged validation accuracy after each of 8 epochs:</p>
<pre><code class="lang-python">acc = [0.61, 0.70, 0.76, 0.79, 0.81, 0.80, 0.82, 0.81]</code></pre>
<p>Write code that prints:</p>
<ol>
<li>the best accuracy and the epoch it occurred in (epochs are numbered from 1),</li>
<li>the top-3 accuracies, highest first, without changing <code>acc</code>,</li>
<li>the average of the last 3 epochs (rounded to 3 decimals),</li>
<li>a list called <code>improved</code> containing the epoch numbers where accuracy was higher than the previous epoch.</li>
</ol>
<p>Expected output:</p>
<pre><code class="lang-text">best: 0.82 at epoch 7
top 3: [0.82, 0.81, 0.81]
last-3 average: 0.81
improved epochs: [2, 3, 4, 5, 7]
original unchanged: [0.61, 0.7, 0.76, 0.79, 0.81, 0.8, 0.82, 0.81]</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">acc = [0.61, 0.70, 0.76, 0.79, 0.81, 0.80, 0.82, 0.81]

best = max(acc)
best_epoch = acc.index(best) + 1          # +1 because epochs start at 1
print(f"best: {best} at epoch {best_epoch}")

top3 = sorted(acc, reverse=True)[:3]      # new list, then slice
print("top 3:", top3)

last3 = acc[-3:]
print("last-3 average:", round(sum(last3) / len(last3), 3))

improved = []
for i in range(1, len(acc)):
    if acc[i] &gt; acc[i - 1]:
        improved.append(i + 1)
print("improved epochs:", improved)
print("original unchanged:", acc)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">best: 0.82 at epoch 7
top 3: [0.82, 0.81, 0.81]
last-3 average: 0.81
improved epochs: [2, 3, 4, 5, 7]
original unchanged: [0.61, 0.7, 0.76, 0.79, 0.81, 0.8, 0.82, 0.81]</code></pre>
<p><code>index</code> finds the position of the best value; adding 1 converts a 0-based position to an epoch number. <code>sorted(...)[:3]</code> sorts a copy and keeps the first three, so <code>acc</code> stays intact. The loop starts at index 1 so that <code>acc[i - 1]</code> always exists. Notice Python prints <code>0.70</code> as <code>0.7</code> — trailing zeros are not stored. The average of 0.82, 0.81 and 0.80 is 0.81 (after rounding away floating-point noise).</p>`
          },
          quiz: [
            { q: "x = [10, 20, 30, 40]. What is x[-2:]?", options: ["[30, 40]", "[20, 30]", "[40]", "[10, 20]"], answer: 0, explain: "-2 is the second-to-last position; slicing to the end gives [30, 40]." },
            { q: "What does nums = nums.sort() leave in nums?", options: ["The sorted list", "The original list", "None", "An error"], answer: 2, explain: "list.sort() sorts in place and returns None, so nums is now None. Use nums.sort() alone or nums = sorted(nums)." },
            { q: "a = [1, 2]; b = a; b.append(3). What is a?", options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"], answer: 1, explain: "b = a makes b another name for the same list, so the change is visible through a." },
            { q: "a = [1, 2]; a.append([3, 4]). What is a now?", options: ["[1, 2, 3, 4]", "[1, 2, [3, 4]]", "[[1, 2], [3, 4]]", "[3, 4]"], answer: 1, explain: "append adds its argument as a single item. extend would add 3 and 4 separately." },
            { q: "How do you sort a list of words by their length?", options: ["sorted(words, key=len)", "sorted(len(words))", "words.sort(len)", "sorted(words, by=len)"], answer: 0, explain: "key=len applies len to each word and sorts by those values." }
          ]
        },
        {
          id: "py-data-tuples-sets",
          title: "Tuples, Unpacking and Sets",
          minutes: 40,
          objectives: [
            "Create tuples and explain when immutability is useful",
            "Unpack sequences into variables, including star-unpacking",
            "Use sets to remove duplicates and test membership quickly",
            "Apply set operations: union, intersection and difference"
          ],
          body: String.raw`
<h3>Tuples: fixed records</h3>
<p>A <strong>tuple</strong> is like a list, but <strong>immutable</strong>: once created, it cannot be changed. Tuples are written with parentheses (actually, the commas make the tuple; the parentheses just group it).</p>
<pre><code class="lang-python runnable">image_shape = (224, 224, 3)        # height, width, colour channels
point = 3.5, 7.2                   # parentheses optional
single = (42,)                     # one-item tuple needs a trailing comma
not_a_tuple = (42)                 # just the number 42 in brackets

print(image_shape[0], len(image_shape))
print(type(point), type(single), type(not_a_tuple))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">224 3
&lt;class 'tuple'&gt; &lt;class 'tuple'&gt; &lt;class 'int'&gt;</code></pre>
<p>Indexing, slicing, <code>len</code>, <code>in</code>, looping, <code>count</code> and <code>index</code> work as for lists, but there is no <code>append</code>, <code>remove</code> or item assignment:</p>
<pre><code class="lang-python">image_shape[0] = 128
# TypeError: 'tuple' object does not support item assignment</code></pre>

<h3>Why have an unchangeable list?</h3>
<ul>
  <li><strong>Safety and meaning.</strong> A tuple says "this is a fixed record", e.g. an (x, y) coordinate, an RGB colour, a tensor shape, or a (name, score) pair. Nobody can accidentally append a fourth number to a 3D point.</li>
  <li><strong>Usable as dictionary keys and set members.</strong> Only immutable (strictly, <em>hashable</em>) objects can be keys. <code>{(0, 1): "edge"}</code> works; a list key does not.</li>
  <li><strong>Returning several values from a function</strong> — Python packs them into a tuple automatically.</li>
</ul>
<p>Rule of thumb: <strong>lists</strong> for collections of similar things that may grow (all the scores); <strong>tuples</strong> for a fixed group of related values of possibly different meaning (one person's name, age, score).</p>

<h3>Unpacking</h3>
<p><strong>Unpacking</strong> assigns the items of a sequence to several names in one line. The number of names must match the number of items.</p>
<pre><code class="lang-python runnable">shape = (32, 224, 224, 3)
batch, height, width, channels = shape
print(batch, channels)

name, score = ("alice", 0.91)
print(f"{name} scored {score}")

# swapping is unpacking in disguise
a, b = 1, 2
a, b = b, a
print(a, b)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">32 3
alice scored 0.91
2 1</code></pre>
<p>A starred name collects "everything else" into a list — useful for separating a header from data, or the first item from the rest:</p>
<pre><code class="lang-python runnable">first, *rest = [10, 20, 30, 40]
print(first, rest)

header, *data_rows = ["name,score", "alice,0.9", "bob,0.8"]
print(header)
print(data_rows)

*_, last = [5, 6, 7]       # _ is a conventional name for "don't care"
print(last)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">10 [20, 30, 40]
name,score
['alice,0.9', 'bob,0.8']
7</code></pre>
<p>Unpacking also works directly in <code>for</code> loops, which you already used with <code>enumerate</code> and <code>zip</code>:</p>
<pre><code class="lang-python runnable">results = [("logreg", 0.83), ("svm", 0.86), ("forest", 0.89)]
for model, acc in results:
    print(f"{model}: {acc:.0%}")
best_model, best_acc = max(results, key=lambda pair: pair[1])
print("best:", best_model)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logreg: 83%
svm: 86%
forest: 89%
best: forest</code></pre>
<p>(<code>lambda pair: pair[1]</code> is a tiny unnamed function meaning "use the second item"; it is explained in the functions module.)</p>
<div class="callout warn"><strong>ValueError when unpacking:</strong> <code>a, b = (1, 2, 3)</code> raises <code>ValueError: too many values to unpack (expected 2)</code>. The counts must match unless you use a starred name.</div>

<h3>Sets: unique items, fast membership</h3>
<p>A <strong>set</strong> is an unordered collection of <strong>unique</strong> items, written with curly braces. Adding a duplicate does nothing. Think of a set like a guest list at a door: each name appears once, and the bouncer can instantly check whether someone is on it.</p>
<pre><code class="lang-python runnable">labels = ["cat", "dog", "cat", "bird", "dog", "cat"]
unique = set(labels)                 # remove duplicates
print(len(unique))
print(sorted(unique))                # sets have no order; sort to display

tags = {"python", "ml"}
tags.add("ai")
tags.add("python")                   # already present: no effect
tags.discard("java")                 # remove if present, no error if not
print(sorted(tags))
print("ml" in tags)

empty_set = set()                    # NOT {} - that is an empty dict
print(type(empty_set), type({}))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">3
['bird', 'cat', 'dog']
['ai', 'ml', 'python']
True
&lt;class 'set'&gt; &lt;class 'dict'&gt;</code></pre>
<p>Because sets have no order, you cannot index them (<code>unique[0]</code> is an error) and their printing order can vary — that is why we print <code>sorted(...)</code>. Set items must be immutable (numbers, strings, tuples).</p>
<p>Membership tests (<code>x in s</code>) on a set are extremely fast, no matter how big the set is, because sets use a <strong>hash table</strong> internally: Python computes where the item would live and looks there directly. On a list, <code>in</code> has to check items one by one. For a vocabulary of 50,000 words checked against millions of tokens, that difference is enormous.</p>

<h3>Set operations</h3>
<p>Sets support the operations from school maths (Venn diagrams):</p>
<table>
<thead><tr><th>Operation</th><th>Operator</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>union</td><td><code>a | b</code></td><td>items in either</td></tr>
<tr><td>intersection</td><td><code>a &amp; b</code></td><td>items in both</td></tr>
<tr><td>difference</td><td><code>a - b</code></td><td>items in a but not in b</td></tr>
<tr><td>symmetric difference</td><td><code>a ^ b</code></td><td>items in exactly one</td></tr>
</tbody></table>
<pre><code class="lang-python runnable">train_vocab = {"the", "cat", "sat", "on", "mat"}
test_vocab = {"the", "dog", "sat", "on", "log"}

print(sorted(train_vocab &amp; test_vocab))   # words seen in both
print(sorted(test_vocab - train_vocab))   # unknown words at test time
print(len(train_vocab | test_vocab))      # total distinct words</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['on', 'sat', 'the']
['dog', 'log']
7</code></pre>
<p>"Words in the test data that never appeared in training" are called <strong>out-of-vocabulary</strong> words — a real problem in NLP that a single set difference reveals. Another classic use: checking for <strong>data leakage</strong>, i.e. making sure no example ID appears in both training and test sets:</p>
<pre><code class="lang-python runnable">train_ids = {101, 102, 103, 104}
test_ids = {104, 105, 106}
leaked = train_ids &amp; test_ids
if leaked:
    print("Leakage! IDs in both sets:", leaked)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Leakage! IDs in both sets: {104}</code></pre>
<div class="callout tip"><strong>Keeping order while removing duplicates:</strong> <code>set()</code> loses the original order. If order matters, use <code>list(dict.fromkeys(items))</code>, which keeps the first occurrence of each item in order (dictionaries remember insertion order).</div>
<pre><code class="lang-python runnable">tokens = ["b", "a", "b", "c", "a"]
print(list(dict.fromkeys(tokens)))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['b', 'a', 'c']</code></pre>
<h3>Mutable vs immutable: the big picture</h3>
<p>You have now met Python's main built-in types, and they split into two families:</p>
<table>
<thead><tr><th>Immutable (cannot change after creation)</th><th>Mutable (can change in place)</th></tr></thead>
<tbody>
<tr><td><code>int</code>, <code>float</code>, <code>bool</code>, <code>str</code>, <code>tuple</code>, <code>frozenset</code>, <code>None</code></td><td><code>list</code>, <code>dict</code>, <code>set</code>, most objects you create from classes</td></tr>
</tbody></table>
<p>This one distinction explains many behaviours: why string methods return new strings, why two names sharing a list see each other's changes but two names sharing a number never do, why only immutable values can be dictionary keys or set members, and why mutable default arguments are dangerous (coming up in the functions module). When you're unsure how some code will behave, ask: "is this object mutable, and how many names refer to it?"</p>
<p>Tuples also appear constantly in data libraries. NumPy arrays and PyTorch tensors report their dimensions as a tuple called <code>shape</code>, such as <code>(32, 3, 224, 224)</code> for a batch of 32 colour images of 224×224 pixels, and functions return several results as tuples, as in <code>X_train, X_test, y_train, y_test = train_test_split(X, y)</code> — four-way unpacking you can now read fluently.</p>
`,
          keyPoints: [
            "Tuples are immutable sequences, ideal for fixed records like shapes, coordinates and (name, score) pairs.",
            "A one-item tuple needs a trailing comma: (42,).",
            "Unpacking assigns items to names: a, b = pair; first, *rest = items collects the remainder.",
            "Sets hold unique, unordered, immutable items; set() is empty set ({} is an empty dict).",
            "Set membership is very fast; |, &, - and ^ give union, intersection, difference and symmetric difference."
          ],
          exercise: {
            prompt: String.raw`<p>Two annotators labelled the same images. Each record is a tuple <code>(image_id, label)</code>:</p>
<pre><code class="lang-python">annotator_a = [(1, "cat"), (2, "dog"), (3, "cat"), (4, "bird"), (5, "dog")]
annotator_b = [(1, "cat"), (2, "cat"), (3, "cat"), (4, "bird"), (6, "dog")]</code></pre>
<p>Using tuple unpacking and sets, print:</p>
<pre><code class="lang-text">labels used: ['bird', 'cat', 'dog']
images labelled by both: [1, 2, 3, 4]
only labelled by A: [5]
agreements: [1, 3, 4]</code></pre>
<p>Hint: build sets of IDs; for agreement, the <em>tuples themselves</em> can go in sets — an identical (id, label) tuple in both means agreement.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">annotator_a = [(1, "cat"), (2, "dog"), (3, "cat"), (4, "bird"), (5, "dog")]
annotator_b = [(1, "cat"), (2, "cat"), (3, "cat"), (4, "bird"), (6, "dog")]

labels = set()
ids_a = set()
ids_b = set()
for image_id, label in annotator_a:
    ids_a.add(image_id)
    labels.add(label)
for image_id, label in annotator_b:
    ids_b.add(image_id)
    labels.add(label)

print("labels used:", sorted(labels))
print("images labelled by both:", sorted(ids_a &amp; ids_b))
print("only labelled by A:", sorted(ids_a - ids_b))

agree = set(annotator_a) &amp; set(annotator_b)
print("agreements:", sorted(image_id for image_id, label in agree))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">labels used: ['bird', 'cat', 'dog']
images labelled by both: [1, 2, 3, 4]
only labelled by A: [5]
agreements: [1, 3, 4]</code></pre>
<p>Unpacking in the <code>for</code> line splits each record. Because tuples are immutable they can be set members, so intersecting the two sets of full records finds exactly the (id, label) pairs both annotators produced. The last line uses a <em>generator expression</em> (covered in the comprehensions lesson) to pull out just the IDs before sorting. Measuring annotator agreement like this is a real step in building labelled datasets.</p>`
          },
          quiz: [
            { q: "Which creates a tuple containing just the number 5?", options: ["(5)", "(5,)", "[5]", "{5}"], answer: 1, explain: "The trailing comma makes it a tuple; (5) is just the integer 5 in parentheses, {5} is a set." },
            { q: "first, *rest = [1, 2, 3, 4]. What is rest?", options: ["4", "[2, 3, 4]", "(2, 3, 4)", "[1, 2, 3]"], answer: 1, explain: "The starred name collects all remaining items into a list." },
            { q: "What does len(set([\"a\", \"b\", \"a\", \"c\", \"b\"])) return?", options: ["5", "3", "2", "Error"], answer: 1, explain: "Sets keep only unique items: a, b, c." },
            { q: "What does {} create?", options: ["An empty set", "An empty dictionary", "An empty tuple", "An empty list"], answer: 1, explain: "{} is an empty dict. Use set() for an empty set." },
            { q: "a = {1, 2, 3}; b = {2, 3, 4}. What is a - b?", options: ["{1}", "{4}", "{1, 4}", "{2, 3}"], answer: 0, explain: "Difference keeps items in a that are not in b: only 1." }
          ]
        },
        {
          id: "py-data-dicts",
          title: "Dictionaries and JSON-Shaped Data",
          minutes: 50,
          objectives: [
            "Create dictionaries and read, add, update and delete key-value pairs",
            "Avoid KeyError with get() and the in operator",
            "Loop over keys, values and items, and count things with a dict",
            "Work with nested dictionaries and relate them to JSON"
          ],
          body: String.raw`
<h3>Looking things up by name</h3>
<p>Lists find items by <em>position</em>. Often you want to find things by <em>name</em> instead: the value of the "learning_rate" setting, the count for the word "great", the score for user "alice". A <strong>dictionary</strong> (<code>dict</code>) stores <strong>key → value</strong> pairs, exactly like a real dictionary maps a word to its definition, or a phone's contacts map a name to a number.</p>
<pre><code class="lang-python runnable">config = {
    "model": "distilbert",
    "learning_rate": 3e-5,
    "batch_size": 16,
    "epochs": 3,
}
print(config["model"])
print(config["batch_size"] * 2)
print(len(config))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">distilbert
32
4</code></pre>
<p>Each entry is <code>key: value</code>, separated by commas, inside curly braces. Keys are usually strings, but any immutable value works (numbers, tuples). Keys are <strong>unique</strong> — assigning to an existing key replaces its value. Values can be anything: numbers, strings, lists, even other dictionaries. Since Python 3.7, dictionaries remember the order in which keys were inserted.</p>

<h3>Adding, changing and removing</h3>
<pre><code class="lang-python runnable">config = {"model": "distilbert", "epochs": 3}
config["epochs"] = 5               # change existing key
config["dropout"] = 0.1            # add new key
print(config)

removed = config.pop("dropout")    # remove and return the value
print(removed, config)

del config["model"]                # remove without returning
print(config)

config.update({"epochs": 10, "seed": 42})   # merge several at once
print(config)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'model': 'distilbert', 'epochs': 5, 'dropout': 0.1}
0.1 {'model': 'distilbert', 'epochs': 5}
{'epochs': 5}
{'epochs': 10, 'seed': 42}</code></pre>
<p>You can also merge two dicts into a new one with <code>|</code>: <code>defaults | overrides</code>. Keys from the right side win. This is a neat way to apply user settings on top of default settings:</p>
<pre><code class="lang-python runnable">defaults = {"lr": 0.001, "epochs": 10, "optimizer": "adam"}
user = {"epochs": 3}
final = defaults | user
print(final)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'lr': 0.001, 'epochs': 3, 'optimizer': 'adam'}</code></pre>

<h3>Missing keys: KeyError, in and get()</h3>
<p>Asking for a key that does not exist raises a <code>KeyError</code> and stops the program:</p>
<pre><code class="lang-python">config = {"epochs": 3}
config["dropout"]      # KeyError: 'dropout'</code></pre>
<p>Two safe alternatives: check first with <code>in</code>, or use <code>.get(key, default)</code>, which returns the default (or <code>None</code>) when the key is missing:</p>
<pre><code class="lang-python runnable">config = {"epochs": 3}
print("dropout" in config)
print(config.get("dropout"))          # None, no crash
print(config.get("dropout", 0.0))     # supply a default
print(config.get("epochs", 1))        # key exists: real value</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">False
None
0.0
3</code></pre>
<p>Use <code>[]</code> when the key <em>must</em> exist (a missing key is a real bug and should fail loudly). Use <code>.get()</code> for optional settings.</p>

<h3>Looping over a dictionary</h3>
<p>Looping over a dict directly gives its <strong>keys</strong>. Use <code>.values()</code> for values and <code>.items()</code> for (key, value) pairs — usually the most useful:</p>
<pre><code class="lang-python runnable">scores = {"logreg": 0.83, "svm": 0.86, "forest": 0.89}

for name in scores:
    print(name)
print(list(scores.values()))
for name, acc in scores.items():
    print(f"{name:&lt;7} {acc:.2f}")

best = max(scores, key=scores.get)     # key whose value is largest
print("best model:", best)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">logreg
svm
forest
[0.83, 0.86, 0.89]
logreg  0.83
svm     0.86
forest  0.89
best model: forest</code></pre>
<p><code>max(scores, key=scores.get)</code> loops over the keys, but compares them using <code>scores.get(key)</code>, i.e. their values. It returns the key with the highest value.</p>

<h3>The counting pattern</h3>
<p>Counting how often each thing appears is one of the most common tasks in data work: word frequencies, label distributions, error types. The pattern is: start with an empty dict, and for each item add 1 to its count, using <code>get</code> with a default of 0 for first sightings.</p>
<pre><code class="lang-python runnable">text = "the cat sat on the mat the end"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)

# show most frequent first
for word, n in sorted(counts.items(), key=lambda kv: kv[1], reverse=True)[:2]:
    print(word, n)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'the': 3, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1, 'end': 1}
the 3
cat 1</code></pre>
<p>This is a "bag of words", one of the oldest text-representation techniques in NLP. (The standard library's <code>collections.Counter</code> does this in one line; you will meet it in the standard-library lesson.)</p>

<h3>Nested dictionaries and JSON</h3>
<p>Values can be dictionaries or lists themselves, creating nested structures. You reach inside by chaining lookups:</p>
<pre><code class="lang-python runnable">experiment = {
    "name": "sentiment-v2",
    "params": {"lr": 0.0001, "batch_size": 32},
    "metrics": {"train": {"acc": 0.95}, "test": {"acc": 0.88}},
    "tags": ["nlp", "baseline"],
}
print(experiment["params"]["lr"])
print(experiment["metrics"]["test"]["acc"])
print(experiment["tags"][0])
experiment["metrics"]["test"]["f1"] = 0.86      # add deep inside
print(experiment["metrics"]["test"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.0001
0.88
nlp
{'acc': 0.88, 'f1': 0.86}</code></pre>
<p>This shape — dictionaries and lists nested inside each other — is exactly the shape of <strong>JSON</strong> (JavaScript Object Notation), the universal text format for exchanging data between programs. Every web API you will call (including LLM APIs like OpenAI's) sends and receives JSON. A JSON object maps directly to a Python dict, a JSON array to a list, and JSON's <code>true</code>/<code>false</code>/<code>null</code> to <code>True</code>/<code>False</code>/<code>None</code>. The built-in <code>json</code> module converts between them:</p>
<pre><code class="lang-python runnable">import json

response = {"model": "gpt-x", "choices": [{"text": "Hello!", "finish": None}], "ok": True}
as_text = json.dumps(response)                 # dict -&gt; JSON string
print(as_text)

back = json.loads(as_text)                     # JSON string -&gt; dict
print(back["choices"][0]["text"])
print(json.dumps({"lr": 0.01, "layers": [64, 32]}, indent=2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{"model": "gpt-x", "choices": [{"text": "Hello!", "finish": null}], "ok": true}
Hello!
{
  "lr": 0.01,
  "layers": [
    64,
    32
  ]
}</code></pre>
<p>Notice the differences in the JSON text: double quotes only, <code>null</code> and <code>true</code> in lowercase. When you later call an LLM API, you will dig an answer out of a response using exactly the chained lookups shown above, e.g. <code>response["choices"][0]["message"]["content"]</code>.</p>

<div class="callout warn"><strong>Common mistakes:</strong>
<ul>
<li><code>KeyError</code> from a typo or missing key — check with <code>in</code> or use <code>.get()</code>.</li>
<li>Using a list as a key: <code>{[1, 2]: "x"}</code> → <code>TypeError: unhashable type: 'list'</code>. Use a tuple.</li>
<li>Changing a dict's size while looping over it (<code>RuntimeError: dictionary changed size during iteration</code>). Loop over <code>list(d.keys())</code> if you must delete.</li>
<li>Forgetting that <code>for x in d</code> gives keys, not values.</li>
</ul></div>
<h3>How dictionaries are so fast</h3>
<p>Looking up a key in a dictionary takes about the same time whether the dict has ten entries or ten million. Like sets, dicts use a <strong>hash table</strong>: Python runs the key through a <em>hash function</em> that turns it into a number, and that number says where in memory the value is stored. To find a key later, Python hashes it again and jumps straight to the right place — no scanning. This is also why keys must be immutable: if a key could change after being stored, its hash would change and Python would look in the wrong place.</p>
<p>A practical consequence: if you find yourself searching a list repeatedly (<code>for user in users: if user["id"] == target_id ...</code>), build a dict once (<code>users_by_id = {u["id"]: u for u in users}</code>) and look things up instantly. This "index by key" trick is one of the simplest and biggest performance wins in everyday Python.</p>
<p>Dictionaries are everywhere in AI code: model configurations and hyperparameters, the <code>label2id</code>/<code>id2label</code> maps of classifiers, metrics returned by evaluation functions, the "state dict" in which PyTorch stores a model's learned weights by layer name, the keyword arguments you pass to functions, and of course every JSON request and response from an API. Being fluent with <code>[]</code>, <code>.get()</code>, <code>.items()</code> and nesting will pay off in every later track.</p>
`,
          keyPoints: [
            "A dict maps unique, immutable keys to values: d[key] reads, d[key] = v adds or updates.",
            "Missing keys raise KeyError; use 'key in d' or d.get(key, default) for optional data.",
            "Loop with .items() to get (key, value) pairs; .keys() and .values() give the parts.",
            "Counting pattern: counts[x] = counts.get(x, 0) + 1.",
            "Nested dicts and lists mirror JSON; json.dumps() and json.loads() convert between Python and JSON text."
          ],
          exercise: {
            prompt: String.raw`<p>An API returned predictions for a batch of reviews (already converted from JSON):</p>
<pre><code class="lang-python">response = {
    "model": "sentiment-small",
    "results": [
        {"id": 1, "label": "positive", "score": 0.97},
        {"id": 2, "label": "negative", "score": 0.88},
        {"id": 3, "label": "positive", "score": 0.55},
        {"id": 4, "label": "neutral", "score": 0.61},
        {"id": 5, "label": "positive", "score": 0.91},
    ],
}</code></pre>
<p>Write code that prints the model name, a dict counting each label, the average score per label (2 decimals), and the IDs of results with score below 0.6 (low confidence):</p>
<pre><code class="lang-text">model: sentiment-small
label counts: {'positive': 3, 'negative': 1, 'neutral': 1}
avg score positive: 0.81
avg score negative: 0.88
avg score neutral: 0.61
low confidence ids: [3]</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">response = {
    "model": "sentiment-small",
    "results": [
        {"id": 1, "label": "positive", "score": 0.97},
        {"id": 2, "label": "negative", "score": 0.88},
        {"id": 3, "label": "positive", "score": 0.55},
        {"id": 4, "label": "neutral", "score": 0.61},
        {"id": 5, "label": "positive", "score": 0.91},
    ],
}

print("model:", response["model"])

counts = {}
totals = {}
low = []
for item in response["results"]:
    label = item["label"]
    counts[label] = counts.get(label, 0) + 1
    totals[label] = totals.get(label, 0) + item["score"]
    if item["score"] &lt; 0.6:
        low.append(item["id"])

print("label counts:", counts)
for label, n in counts.items():
    print(f"avg score {label}: {totals[label] / n:.2f}")
print("low confidence ids:", low)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">model: sentiment-small
label counts: {'positive': 3, 'negative': 1, 'neutral': 1}
avg score positive: 0.81
avg score negative: 0.88
avg score neutral: 0.61
low confidence ids: [3]</code></pre>
<p><code>response["results"]</code> is a list of dicts, so the loop variable <code>item</code> is one dict per review. Two dictionaries keyed by label accumulate counts and score totals using the <code>get(..., 0)</code> pattern; dividing them gives averages ((0.97 + 0.55 + 0.91) / 3 = 0.81). Insertion order is preserved, so labels print in the order first seen.</p>`
          },
          quiz: [
            { q: "d = {\"a\": 1}. What does d.get(\"b\", 0) return?", options: ["KeyError", "None", "0", "\"b\""], answer: 2, explain: "get returns the default when the key is missing." },
            { q: "What does looping 'for x in my_dict:' give you?", options: ["The values", "The keys", "(key, value) tuples", "Indices"], answer: 1, explain: "Iterating a dict yields its keys. Use .items() for pairs or .values() for values." },
            { q: "Which can NOT be used as a dictionary key?", options: ["\"name\"", "42", "(1, 2)", "[1, 2]"], answer: 3, explain: "Keys must be immutable (hashable). Lists are mutable, so they raise TypeError: unhashable type." },
            { q: "How is JSON's null represented after json.loads()?", options: ["\"null\"", "0", "None", "False"], answer: 2, explain: "JSON null maps to Python None; true/false map to True/False." },
            { q: "config = {\"lr\": 0.1}; config[\"lr\"] = 0.01. What is config now?", options: ["{\"lr\": 0.1, \"lr\": 0.01}", "{\"lr\": 0.01}", "{\"lr\": [0.1, 0.01]}", "An error: key exists"], answer: 1, explain: "Keys are unique; assigning to an existing key replaces its value." }
          ]
        },
        {
          id: "py-data-comprehensions",
          title: "Comprehensions and Choosing the Right Structure",
          minutes: 45,
          objectives: [
            "Write list, dict and set comprehensions, with and without conditions",
            "Translate between a for-loop-with-append and a comprehension",
            "Use generator expressions with sum(), any() and all()",
            "Choose between list, tuple, dict and set for a given problem"
          ],
          body: String.raw`
<h3>From loop to comprehension</h3>
<p>You have written this pattern several times: create an empty list, loop, append a transformed item.</p>
<pre><code class="lang-python runnable">celsius = [12.5, 20.0, 31.2]
fahrenheit = []
for c in celsius:
    fahrenheit.append(c * 9 / 5 + 32)
print(fahrenheit)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[54.5, 68.0, 88.16]</code></pre>
<p>A <strong>list comprehension</strong> expresses the same thing in one readable line:</p>
<pre><code class="lang-python runnable">celsius = [12.5, 20.0, 31.2]
fahrenheit = [c * 9 / 5 + 32 for c in celsius]
print(fahrenheit)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[54.5, 68.0, 88.16]</code></pre>
<p>Read it as "a list of <code>c * 9 / 5 + 32</code> <strong>for each</strong> <code>c</code> <strong>in</strong> <code>celsius</code>". The general shape is:</p>
<pre><code class="lang-text">[ expression   for item in iterable ]
   what to keep  where it comes from</code></pre>

<h3>Filtering with if</h3>
<p>Add an <code>if</code> at the end to keep only items that pass a test:</p>
<pre><code class="lang-python runnable">scores = [0.45, 0.91, 0.78, 0.30, 0.88]
high = [s for s in scores if s &gt;= 0.8]
print(high)

words = ["The", "model", "is", "a", "transformer"]
long_lower = [w.lower() for w in words if len(w) &gt; 2]
print(long_lower)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0.91, 0.88]
['the', 'model', 'transformer']</code></pre>
<p>To <em>transform</em> every item differently depending on a condition (rather than dropping some), put a conditional expression at the front:</p>
<pre><code class="lang-python runnable">probs = [0.2, 0.7, 0.55, 0.1]
labels = [1 if p &gt;= 0.5 else 0 for p in probs]     # keep all, map each
print(labels)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0, 1, 1, 0]</code></pre>
<div class="callout tip"><strong>Where does the if go?</strong> <code>if</code> <em>after</em> the <code>for</code> = filter (some items dropped). <code>x if cond else y</code> <em>before</em> the <code>for</code> = choose a value for every item (none dropped).</div>

<h3>Dict and set comprehensions</h3>
<p>The same syntax with curly braces builds dicts (<code>key: value</code>) and sets:</p>
<pre><code class="lang-python runnable">words = ["apple", "fig", "banana", "fig"]
lengths = {w: len(w) for w in words}          # dict comprehension
print(lengths)

unique_lengths = {len(w) for w in words}       # set comprehension
print(sorted(unique_lengths))

labels = ["cat", "dog", "bird"]
label_to_id = {label: i for i, label in enumerate(labels)}
id_to_label = {i: label for label, i in label_to_id.items()}
print(label_to_id)
print(id_to_label[2])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'apple': 5, 'fig': 3, 'banana': 6}
[3, 5, 6]
{'cat': 0, 'dog': 1, 'bird': 2}
bird</code></pre>
<p>The <code>label_to_id</code> / <code>id_to_label</code> pair is used in virtually every classification project: models work with numbers (0, 1, 2), humans want names ("cat", "dog", "bird"). You will see exactly these dictionaries in Hugging Face model configs.</p>

<h3>Nested comprehensions</h3>
<p>Multiple <code>for</code> clauses read left to right, like nested loops. A common use is flattening a list of lists:</p>
<pre><code class="lang-python runnable">batches = [[1, 2, 3], [4, 5], [6]]
flat = [x for batch in batches for x in batch]
print(flat)

sentences = ["I like AI", "AI likes data"]
tokens = [w.lower() for s in sentences for w in s.split()]
print(tokens)

grid = [(lr, bs) for lr in [0.1, 0.01] for bs in [16, 32]]
print(grid)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[1, 2, 3, 4, 5, 6]
['i', 'like', 'ai', 'ai', 'likes', 'data']
[(0.1, 16), (0.1, 32), (0.01, 16), (0.01, 32)]</code></pre>
<p>Beyond two levels, comprehensions become hard to read — switch back to normal loops. Readability beats cleverness.</p>

<h3>Generator expressions: no list needed</h3>
<p>If you only want to feed the values straight into a function like <code>sum</code>, <code>max</code>, <code>any</code> or <code>all</code>, drop the square brackets. A <strong>generator expression</strong> produces values one at a time without building a whole list in memory, which matters for big data:</p>
<pre><code class="lang-python runnable">prices = [120, 85, 300, 42]
print(sum(p * 1.2 for p in prices))           # total with 20% tax

texts = ["ok", "", "fine", "great"]
print(any(t == "" for t in texts))            # is ANY text empty?
print(all(len(t) &lt; 10 for t in texts))        # are ALL short?

squares_total = sum(x ** 2 for x in range(1, 4))
print(squares_total)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">656.4
True
True
14</code></pre>
<p><code>any()</code> returns True if at least one value is truthy; <code>all()</code> returns True only if every value is truthy. Both are perfect for data validation checks.</p>

<h3>Choosing the right data structure</h3>
<p>Picking the right container makes code simpler and faster. Ask: <em>Do I need order? Do I look things up by name? Must items be unique? Will it change?</em></p>
<table>
<thead><tr><th>Structure</th><th>Ordered?</th><th>Changeable?</th><th>Duplicates?</th><th>Look up by</th><th>Typical AI/data use</th></tr></thead>
<tbody>
<tr><td><code>list</code></td><td>yes</td><td>yes</td><td>yes</td><td>position</td><td>a column of values, loss history, a batch of texts</td></tr>
<tr><td><code>tuple</code></td><td>yes</td><td>no</td><td>yes</td><td>position</td><td>image shape (224, 224, 3), (name, score) records, dict keys</td></tr>
<tr><td><code>dict</code></td><td>insertion order</td><td>yes</td><td>keys unique</td><td>key</td><td>config/hyperparameters, word counts, JSON data, label maps</td></tr>
<tr><td><code>set</code></td><td>no</td><td>yes</td><td>no</td><td>membership only</td><td>vocabulary, unique labels, leakage checks</td></tr>
</tbody></table>
<p>Some quick guides:</p>
<ul>
  <li>"I need the 5th item" → list or tuple.</li>
  <li>"I need the value for 'alice'" → dict.</li>
  <li>"Have I seen this before?" (asked many times) → set.</li>
  <li>"A fixed bundle of a few related values" → tuple (or a dataclass, later).</li>
  <li>"Records with named fields" → list of dicts (the shape of JSON and of a table).</li>
</ul>

<h3>Putting it together: a mini text pipeline</h3>
<pre><code class="lang-python runnable">reviews = [
    "Great product, great price",
    "terrible support",
    "Great battery",
    "",
]
stopwords = {"the", "a", "is"}

cleaned = [r.lower().replace(",", "") for r in reviews if r.strip()]
tokens = [w for r in cleaned for w in r.split() if w not in stopwords]
vocab = sorted(set(tokens))
word_to_id = {w: i for i, w in enumerate(vocab)}
encoded = [[word_to_id[w] for w in r.split()] for r in cleaned]

print(cleaned)
print(vocab)
print(encoded)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['great product great price', 'terrible support', 'great battery']
['battery', 'great', 'price', 'product', 'support', 'terrible']
[[1, 3, 1, 2], [5, 4], [1, 0]]</code></pre>
<p>In a dozen lines you cleaned text, removed an empty review, built a vocabulary (a set, then sorted), created a word-to-ID dict, and encoded each review as a list of numbers. That last step — turning text into integer IDs — is literally what the tokenizer of a language model does before the model sees anything.</p>
<div class="callout warn"><strong>Common mistakes:</strong> putting the filtering <code>if</code> in the wrong place; writing a comprehension only for its side effects (<code>[print(x) for x in items]</code> — use a normal loop); and over-nesting until nobody can read it.</div>
<h3>Readability rules of thumb</h3>
<p>Comprehensions are loved because they say <em>what</em> you are building in one place, but they can be abused. Some guidelines experienced Python developers follow:</p>
<ul>
  <li>If it fits comfortably on one line (or two, broken sensibly) and reads like a sentence, use a comprehension.</li>
  <li>If you need more than one <code>if</code> and two <code>for</code> clauses, or the expression itself is long, write a normal loop or move the logic into a small function and call it: <code>[clean(text) for text in texts]</code>.</li>
  <li>Use comprehensions to <strong>build</strong> collections. If you only want an action for each item (printing, saving), use a normal <code>for</code> loop.</li>
  <li>Name the loop variable after one item (<code>for review in reviews</code>), not <code>x</code>, unless the context is purely mathematical.</li>
</ul>
<p>Comprehensions are also slightly faster than the equivalent append loop, because Python optimises them internally — a nice bonus, though readability is the main reason to use them. And the style transfers directly to later tools: pandas column operations and NumPy expressions follow the same "describe the whole transformation at once" mindset, only even faster.</p>
`,
          keyPoints: [
            "[expr for x in items if cond] builds a list; the trailing if filters items.",
            "Use 'a if cond else b' before the for to transform every item conditionally.",
            "{k: v for ...} builds dicts and {x for ...} builds sets; label_to_id maps are a classic use.",
            "Generator expressions (no brackets) feed sum/any/all/max without building a list.",
            "list = ordered & changeable; tuple = fixed record; dict = lookup by key; set = unique items & fast membership."
          ],
          exercise: {
            prompt: String.raw`<p>Given raw sensor readings as strings (some invalid):</p>
<pre><code class="lang-python">raw = ["21.5", "22.0", "error", "19.8", "", "35.1", "20.4"]</code></pre>
<p>Using comprehensions:</p>
<ol>
<li>Build <code>readings</code>: a list of floats from the entries that are valid numbers (hint: <code>s.replace(".", "", 1).isdigit()</code> is True for strings like "21.5").</li>
<li>Build <code>flags</code>: for each reading, <code>"high"</code> if above 30 else <code>"ok"</code>.</li>
<li>Build a dict <code>by_index</code> mapping position (0, 1, 2, …) to reading, only for readings below 21.</li>
<li>Use <code>any()</code> to print whether any reading is above 30, and <code>sum()</code> with a generator for the average.</li>
</ol>
<pre><code class="lang-text">readings: [21.5, 22.0, 19.8, 35.1, 20.4]
flags: ['ok', 'ok', 'ok', 'high', 'ok']
below 21: {2: 19.8, 4: 20.4}
any high? True
average: 23.76</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">raw = ["21.5", "22.0", "error", "19.8", "", "35.1", "20.4"]

readings = [float(s) for s in raw if s.replace(".", "", 1).isdigit()]
flags = ["high" if r &gt; 30 else "ok" for r in readings]
by_index = {i: r for i, r in enumerate(readings) if r &lt; 21}

print("readings:", readings)
print("flags:", flags)
print("below 21:", by_index)
print("any high?", any(r &gt; 30 for r in readings))
print("average:", round(sum(r for r in readings) / len(readings), 2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">readings: [21.5, 22.0, 19.8, 35.1, 20.4]
flags: ['ok', 'ok', 'ok', 'high', 'ok']
below 21: {2: 19.8, 4: 20.4}
any high? True
average: 23.76</code></pre>
<p><code>s.replace(".", "", 1)</code> removes one dot so <code>"21.5"</code> becomes <code>"215"</code>, which <code>isdigit()</code> accepts, while <code>"error"</code> and <code>""</code> are rejected (an empty string is not digits). The trailing <code>if</code> filters; the leading <code>"high" if ... else "ok"</code> maps every item. In the robust-code module you will learn the more general approach: try <code>float(s)</code> and catch the <code>ValueError</code>, which also handles negatives like "-3.2".</p>`
          },
          quiz: [
            { q: "What does [x * 2 for x in range(4) if x % 2 == 0] produce?", options: ["[0, 2, 4, 6]", "[0, 4]", "[2, 6]", "[0, 2]"], answer: 1, explain: "range(4) is 0..3; keep even x (0 and 2) and double them: [0, 4]." },
            { q: "Which comprehension keeps ALL items but maps negatives to 0?", options: ["[x for x in nums if x > 0]", "[x if x > 0 else 0 for x in nums]", "[0 for x in nums if x < 0]", "[x for x in nums else 0]"], answer: 1, explain: "A conditional expression before the for chooses a value for every item; an if after the for would drop items." },
            { q: "What does {w: len(w) for w in [\"hi\", \"hey\"]} produce?", options: ["{'hi': 2, 'hey': 3}", "[2, 3]", "{2, 3}", "{'hi', 'hey'}"], answer: 0, explain: "A dict comprehension with key: value builds a dictionary." },
            { q: "You need to check millions of times whether a token is in the vocabulary. Best structure?", options: ["list", "tuple", "set", "string"], answer: 2, explain: "Set membership tests are very fast regardless of size thanks to hashing; lists check items one by one." },
            { q: "What does all(x > 0 for x in [3, 1, -2]) return?", options: ["True", "False", "[True, True, False]", "-2"], answer: 1, explain: "all() is True only if every value passes; -2 fails." }
          ]
        }
      ]
    },
    {
      id: "py-functions",
      title: "Functions",
      summary: "Package logic into reusable, testable, well-documented functions - the basic unit of every Python program and library.",
      lessons: [
        {
          id: "py-functions-basics",
          title: "Defining Functions: Parameters, Return Values and Scope",
          minutes: 50,
          objectives: [
            "Define and call functions with def, parameters and return",
            "Explain the difference between returning and printing a value",
            "Use default values and keyword arguments",
            "Describe local vs global scope and why pure functions are easier to trust",
            "Avoid the mutable-default-argument trap"
          ],
          body: String.raw`
<h3>Why functions?</h3>
<p>So far your programs have been straight lists of statements. As programs grow, you will notice the same few lines repeated: compute an average here, clean some text there. A <strong>function</strong> is a named, reusable block of code. You write the steps once, give them a name, and then <em>call</em> the name whenever you need them. Think of a function as a kitchen appliance: a blender takes ingredients in, does its job internally, and gives you a smoothie out. You don't need to think about the motor every time.</p>
<p>Functions give you:</p>
<ul>
  <li><strong>Reuse</strong> — write once, use everywhere (the "DRY" principle: Don't Repeat Yourself).</li>
  <li><strong>Names for ideas</strong> — <code>accuracy(preds, labels)</code> says what it does far better than five lines of loop.</li>
  <li><strong>Testability</strong> — a small function can be checked on its own.</li>
  <li><strong>Easier changes</strong> — fix a bug in one place instead of ten.</li>
</ul>
<p>You have been using functions all along: <code>print</code>, <code>len</code>, <code>sum</code>, <code>sorted</code>. Now you will write your own.</p>

<h3>Defining and calling</h3>
<pre><code class="lang-python runnable">def greet(name):
    message = f"Hello, {name}!"
    return message

result = greet("Ada")
print(result)
print(greet("Grace"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Hello, Ada!
Hello, Grace!</code></pre>
<p>The anatomy:</p>
<ul>
  <li><code>def</code> starts a function definition, followed by the function's name (snake_case, usually a verb: <code>compute_mean</code>, <code>load_data</code>).</li>
  <li>In parentheses come the <strong>parameters</strong> — placeholder names for the inputs. Here, <code>name</code>.</li>
  <li>A colon, then the indented <strong>body</strong>.</li>
  <li><code>return</code> sends a value back to whoever called the function and ends the function immediately.</li>
</ul>
<p>Defining a function does not run it; it only creates it. The body runs each time you <strong>call</strong> it with parentheses: <code>greet("Ada")</code>. The actual values you pass in a call are called <strong>arguments</strong>. (Parameter = the name in the definition; argument = the value in the call.)</p>

<h3>return vs print — the most important distinction</h3>
<p><code>print</code> shows something on screen for a human. <code>return</code> hands a value back to the program so it can be stored and used. A function without a <code>return</code> statement returns <code>None</code>.</p>
<pre><code class="lang-python runnable">def mean_print(values):
    print(sum(values) / len(values))       # shows it, returns None

def mean_return(values):
    return sum(values) / len(values)       # gives it back

a = mean_print([2, 4, 6])
b = mean_return([2, 4, 6])
print("a is", a)
print("b is", b, "and b * 10 is", b * 10)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">4.0
a is None
b is 4.0 and b * 10 is 40.0</code></pre>
<p><code>a * 10</code> would crash with <code>TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'</code>. Rule: <strong>functions that compute something should return it</strong>; let the caller decide whether to print it.</p>

<h3>Multiple parameters and multiple return values</h3>
<pre><code class="lang-python runnable">def accuracy(predictions, labels):
    correct = 0
    for p, y in zip(predictions, labels):
        if p == y:
            correct += 1
    return correct / len(labels)

def min_max(values):
    return min(values), max(values)        # returns a tuple

print(accuracy([1, 0, 1, 1], [1, 1, 1, 0]))
low, high = min_max([3.2, 9.1, 0.4])       # unpack the tuple
print(low, high)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.5
0.4 9.1</code></pre>
<p>Returning <code>a, b</code> actually returns one tuple <code>(a, b)</code>, which the caller unpacks. This is how ML functions like scikit-learn's <code>train_test_split</code> hand back several results at once.</p>

<h3>Default values and keyword arguments</h3>
<p>A parameter can have a <strong>default value</strong>, used when the caller doesn't supply one. Callers can also pass arguments <strong>by name</strong> (keyword arguments), in any order, which makes calls self-explanatory:</p>
<pre><code class="lang-python runnable">def classify(probability, threshold=0.5, positive="spam", negative="ham"):
    return positive if probability &gt;= threshold else negative

print(classify(0.7))                          # uses all defaults
print(classify(0.7, 0.8))                     # positional: threshold=0.8
print(classify(0.7, threshold=0.6))           # keyword: clearer
print(classify(0.2, positive="fraud", negative="ok"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">spam
ham
spam
ok</code></pre>
<p>Rules: parameters with defaults must come after those without; in a call, positional arguments come before keyword arguments. Machine learning libraries use defaults heavily — scikit-learn's <code>RandomForestClassifier()</code> has more than a dozen parameters, all with sensible defaults, and you override only what you need with keywords such as <code>n_estimators=200</code>.</p>

<h3>Early return</h3>
<p><code>return</code> exits immediately, which lets you handle special cases first and keep the main logic un-nested:</p>
<pre><code class="lang-python runnable">def safe_mean(values):
    if not values:              # empty list: avoid ZeroDivisionError
        return 0.0
    return sum(values) / len(values)

print(safe_mean([]))
print(safe_mean([1, 2, 3, 4]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.0
2.5</code></pre>

<h3>Scope: where names live</h3>
<p>Variables created inside a function are <strong>local</strong>: they exist only while the function runs and are invisible outside. Each call gets a fresh set. Variables created at the top level of a file are <strong>global</strong> and can be <em>read</em> inside functions.</p>
<pre><code class="lang-python runnable">THRESHOLD = 0.5                 # global constant

def label(p):
    result = "pos" if p &gt;= THRESHOLD else "neg"   # reading a global is fine
    return result

print(label(0.9))
try:
    print(result)               # 'result' was local to label()
except NameError as e:
    print("NameError:", e)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">pos
NameError: name 'result' is not defined</code></pre>
<p>(The <code>try/except</code> lets us show the error without stopping the program; you'll learn it properly in the robust-code module.) Python looks up a name in this order, known as <strong>LEGB</strong>: <em>Local</em> (inside the current function), <em>Enclosing</em> (an outer function), <em>Global</em> (the module), <em>Built-in</em> (<code>print</code>, <code>len</code>…).</p>
<p>Assigning to a name inside a function creates a <strong>new local</strong> variable, even if a global with the same name exists:</p>
<pre><code class="lang-python runnable">count = 0
def increment():
    count = 1          # a NEW local 'count'; the global is untouched
    return count

increment()
print(count)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0</code></pre>
<p>There is a <code>global</code> keyword to change globals from inside a function, but avoid it: pass values in as parameters and return results instead.</p>

<h3>Pure functions</h3>
<p>A <strong>pure function</strong> (1) returns a value that depends only on its arguments and (2) has no <strong>side effects</strong> — it doesn't print, modify global variables, change its inputs, or write files. <code>safe_mean</code> is pure. Pure functions are predictable: same input, same output, every time. That makes them trivial to test and safe to reuse. Real programs need side effects (saving a model, printing logs), but a good design keeps most logic in pure functions and pushes side effects to the edges.</p>
<p>A sneaky side effect is modifying a list that was passed in. Because the parameter refers to the <em>same</em> list object as the caller's variable, changes are visible outside:</p>
<pre><code class="lang-python runnable">def normalise_in_place(values):        # side effect: changes caller's list
    top = max(values)
    for i in range(len(values)):
        values[i] = values[i] / top

def normalised(values):                # pure: returns a new list
    top = max(values)
    return [v / top for v in values]

data = [2, 4, 8]
new = normalised(data)
print(data, new)
normalise_in_place(data)
print(data)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[2, 4, 8] [0.25, 0.5, 1.0]
[0.25, 0.5, 1.0]</code></pre>

<h3>The mutable default argument trap</h3>
<p>Default values are created <strong>once</strong>, when the function is defined — not on every call. If the default is a mutable object like a list, it is shared between calls:</p>
<pre><code class="lang-python runnable">def add_tag_bad(tag, tags=[]):
    tags.append(tag)
    return tags

print(add_tag_bad("a"))
print(add_tag_bad("b"))        # surprise: 'a' is still there!

def add_tag(tag, tags=None):
    if tags is None:
        tags = []              # a fresh list on every call
    tags.append(tag)
    return tags

print(add_tag("a"))
print(add_tag("b"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['a']
['a', 'b']
['a']
['b']</code></pre>
<p>The fix is the standard idiom: use <code>None</code> as the default and create the list inside the function.</p>
<div class="callout warn"><strong>Common mistakes:</strong> forgetting the parentheses when calling (<code>greet</code> refers to the function object; <code>greet()</code> calls it); printing instead of returning; forgetting <code>return</code> entirely (you get <code>None</code>); calling a function before the <code>def</code> line has run; and using mutable defaults.</div>
`,
          keyPoints: [
            "def name(params): defines a function; calling name(args) runs its body.",
            "return hands a value back and ends the function; without return a function returns None.",
            "Prefer returning values over printing them inside computing functions.",
            "Default values and keyword arguments make calls flexible and readable; defaults are evaluated once, so never use a mutable default like [] - use None.",
            "Variables inside a function are local; pure functions (no side effects) are easiest to test and reuse."
          ],
          exercise: {
            prompt: String.raw`<p>Write three functions:</p>
<ol>
<li><code>mean(values)</code> — returns the average, or <code>None</code> for an empty list.</li>
<li><code>std(values)</code> — returns the population standard deviation: the square root of the average of squared differences from the mean. Reuse <code>mean</code>. Return <code>None</code> for an empty list.</li>
<li><code>standardise(values)</code> — returns a <em>new</em> list where each value becomes <code>(v - mean) / std</code>, rounded to 2 decimals (this is "z-score scaling", used to prepare ML features).</li>
</ol>
<p>Then run:</p>
<pre><code class="lang-python">data = [2, 4, 4, 4, 5, 5, 7, 9]
print(mean(data), std(data))
print(standardise(data))
print(mean([]))
print(data)</code></pre>
<p>Expected:</p>
<pre><code class="lang-text">5.0 2.0
[-1.5, -0.5, -0.5, -0.5, 0.0, 0.0, 1.0, 2.0]
None
[2, 4, 4, 4, 5, 5, 7, 9]</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import math

def mean(values):
    if not values:
        return None
    return sum(values) / len(values)

def std(values):
    if not values:
        return None
    m = mean(values)
    squared_diffs = [(v - m) ** 2 for v in values]
    return math.sqrt(mean(squared_diffs))

def standardise(values):
    m = mean(values)
    s = std(values)
    return [round((v - m) / s, 2) for v in values]

data = [2, 4, 4, 4, 5, 5, 7, 9]
print(mean(data), std(data))
print(standardise(data))
print(mean([]))
print(data)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">5.0 2.0
[-1.5, -0.5, -0.5, -0.5, 0.0, 0.0, 1.0, 2.0]
None
[2, 4, 4, 4, 5, 5, 7, 9]</code></pre>
<p>Small functions build on each other: <code>std</code> calls <code>mean</code> twice, and <code>standardise</code> calls both. All three are pure — the original <code>data</code> is unchanged because <code>standardise</code> builds a new list with a comprehension. (A production version would also guard against <code>s == 0</code>, when all values are equal.) The scikit-learn <code>StandardScaler</code> you will use later does exactly this computation.</p>`
          },
          quiz: [
            { q: "What does a function return if it has no return statement?", options: ["0", "An empty string", "None", "It raises an error"], answer: 2, explain: "Every function returns something; without an explicit return it is None." },
            { q: "def f(x, y=2): return x * y. What is f(3)?", options: ["3", "5", "6", "Error: missing y"], answer: 2, explain: "y takes its default value 2, so 3 * 2 = 6." },
            { q: "Which statement about local variables is true?", options: ["They are visible everywhere after the function runs", "They exist only inside the function call that created them", "They overwrite global variables of the same name permanently", "They must be declared with the local keyword"], answer: 1, explain: "Local names live only during that call; assigning a same-named variable inside a function does not change a global." },
            { q: "def add(item, items=[]): items.append(item); return items. Calling add(1) then add(2) returns what the second time?", options: ["[2]", "[1, 2]", "[1]", "None"], answer: 1, explain: "The default list is created once and shared across calls. Use items=None and create a new list inside." },
            { q: "Which function is pure?", options: ["One that appends to a global list", "One that prints its result", "def square(x): return x * x", "One that writes a file"], answer: 2, explain: "square depends only on its input and has no side effects." }
          ]
        },
        {
          id: "py-functions-args",
          title: "Flexible Arguments, Lambdas, map and filter",
          minutes: 45,
          objectives: [
            "Accept any number of arguments with *args and **kwargs",
            "Unpack lists and dicts into function calls with * and **",
            "Use keyword-only parameters to make calls explicit",
            "Treat functions as values and write lambda functions for sorted(), map() and filter()"
          ],
          body: String.raw`
<h3>*args: any number of positional arguments</h3>
<p>Sometimes you don't know in advance how many values a caller will pass. Prefixing a parameter with <code>*</code> collects all extra positional arguments into a <strong>tuple</strong>. By convention it is named <code>args</code>, but the star is what matters.</p>
<pre><code class="lang-python runnable">def average(*numbers):
    print("received:", numbers)
    return sum(numbers) / len(numbers)

print(average(1, 2, 3))
print(average(0.81, 0.79))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">received: (1, 2, 3)
2.0
received: (0.81, 0.79)
0.8</code></pre>
<p>This is how <code>print</code> accepts any number of values, and how <code>max(3, 9, 4)</code> works.</p>

<h3>**kwargs: any number of keyword arguments</h3>
<p>Two stars collect extra <strong>keyword</strong> arguments into a <strong>dict</strong> (conventionally named <code>kwargs</code>, "keyword arguments"):</p>
<pre><code class="lang-python runnable">def log_metrics(step, **metrics):
    parts = [f"{name}={value:.3f}" for name, value in metrics.items()]
    print(f"step {step}: " + ", ".join(parts))

log_metrics(100, loss=0.4321, acc=0.87)
log_metrics(200, loss=0.3011, acc=0.9, f1=0.88)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">step 100: loss=0.432, acc=0.870
step 200: loss=0.301, acc=0.900, f1=0.880</code></pre>
<p>Experiment-tracking tools (MLflow, Weights &amp; Biases) have logging functions shaped exactly like this: you pass whatever metrics you have as keywords.</p>
<p>The full parameter order is: normal parameters, <code>*args</code>, keyword-only parameters, <code>**kwargs</code>:</p>
<pre><code class="lang-python runnable">def demo(a, b=2, *args, flag=False, **kwargs):
    print(a, b, args, flag, kwargs)

demo(1)
demo(1, 5, 6, 7, flag=True, color="red")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">1 2 () False {}
1 5 (6, 7) True {'color': 'red'}</code></pre>

<h3>Unpacking into a call: * and ** on the calling side</h3>
<p>The stars also work in reverse. In a <em>call</em>, <code>*sequence</code> spreads a list or tuple into separate positional arguments, and <code>**dict</code> spreads a dictionary into keyword arguments. This is extremely common in ML code, where hyperparameters live in a config dict:</p>
<pre><code class="lang-python runnable">def train(model_name, learning_rate=0.001, epochs=10, batch_size=32):
    return f"training {model_name}: lr={learning_rate}, epochs={epochs}, batch={batch_size}"

config = {"learning_rate": 0.01, "epochs": 3}
print(train("cnn", **config))          # same as train("cnn", learning_rate=0.01, epochs=3)

args = ["rnn", 0.005]
print(train(*args))                    # same as train("rnn", 0.005)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">training cnn: lr=0.01, epochs=3, batch=32
training rnn: lr=0.005, epochs=10, batch=32</code></pre>
<p>You will see <code>Model(**params)</code> constantly, for example creating a scikit-learn model from the best parameters a search found: <code>RandomForestClassifier(**best_params)</code>.</p>

<h3>Keyword-only parameters</h3>
<p>Parameters placed after a bare <code>*</code> must be passed by name. This prevents confusing calls like <code>split(data, 0.2, True, 42)</code> where nobody remembers what <code>True</code> means:</p>
<pre><code class="lang-python runnable">def split(data, *, test_size=0.2, shuffle=True):
    cut = int(len(data) * (1 - test_size))
    return data[:cut], data[cut:]

train_part, test_part = split(list(range(10)), test_size=0.3)
print(train_part, test_part)
try:
    split(list(range(10)), 0.3)          # positional not allowed
except TypeError as e:
    print("TypeError:", e)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0, 1, 2, 3, 4, 5, 6] [7, 8, 9]
TypeError: split() takes 1 positional argument but 2 were given</code></pre>

<h3>Functions are values</h3>
<p>In Python, a function is an object like any other. You can store it in a variable, put it in a list or dict, and pass it to another function. Without the parentheses you refer to the function; with them you call it.</p>
<pre><code class="lang-python runnable">def relu(x):
    return max(0.0, x)

def square(x):
    return x * x

activations = {"relu": relu, "square": square}
f = activations["relu"]          # pick a function by name
print(f(-2.0), f(3.0))

def apply_all(func, values):     # a function that takes a function
    return [func(v) for v in values]

print(apply_all(square, [1, 2, 3]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.0 3.0
[1, 4, 9]</code></pre>
<p>A function that takes or returns another function is called a <strong>higher-order function</strong>. This idea is everywhere in AI frameworks: you pass a loss function to a trainer, a callback to run after each epoch, or an activation function to a layer.</p>

<h3>lambda: tiny anonymous functions</h3>
<p>A <code>lambda</code> creates a small function in a single expression, without a name and without <code>def</code>: <code>lambda parameters: expression</code>. The expression's value is returned automatically.</p>
<pre><code class="lang-python runnable">double = lambda x: x * 2          # works, but def is preferred for named functions
print(double(5))

results = [("svm", 0.86), ("logreg", 0.83), ("forest", 0.89)]
by_score = sorted(results, key=lambda pair: pair[1], reverse=True)
print(by_score)

people = [{"name": "bo", "age": 31}, {"name": "al", "age": 25}]
print(min(people, key=lambda p: p["age"])["name"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">10
[('forest', 0.89), ('svm', 0.86), ('logreg', 0.83)]
al</code></pre>
<p>The main use of lambdas is as a short throwaway <code>key</code> for <code>sorted</code>, <code>min</code>, <code>max</code>, or as an argument to other higher-order functions. If the logic needs more than one simple expression, write a normal <code>def</code>.</p>

<h3>map and filter</h3>
<p><code>map(func, iterable)</code> applies <code>func</code> to every item. <code>filter(func, iterable)</code> keeps items for which <code>func</code> returns a truthy value. Both return lazy iterators, so wrap them in <code>list()</code> to see the results:</p>
<pre><code class="lang-python runnable">raw = [" Cat", "DOG ", " bird "]
clean = list(map(str.strip, raw))
print(clean)
print(list(map(lambda s: s.lower(), clean)))

scores = [0.4, 0.9, 0.75, 0.2]
print(list(filter(lambda s: s &gt; 0.5, scores)))

# the equivalent comprehensions - usually considered more readable
print([s.strip().lower() for s in raw])
print([s for s in scores if s &gt; 0.5])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['Cat', 'DOG', 'bird']
['cat', 'dog', 'bird']
[0.9, 0.75]
['cat', 'dog', 'bird']
[0.9, 0.75]</code></pre>
<p>In modern Python, comprehensions are generally preferred over <code>map</code>/<code>filter</code> with lambdas because they read more naturally. <code>map</code> with an existing named function (<code>map(str.strip, raw)</code>, <code>map(int, parts)</code>) is still neat and common. You will meet the same idea again in pandas, where <code>df["col"].map(func)</code> and <code>.apply(func)</code> run a function over a whole column.</p>
<pre><code class="lang-python runnable">line = "3,7,1,9"
numbers = list(map(int, line.split(",")))
print(numbers, sum(numbers))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[3, 7, 1, 9] 20</code></pre>
<div class="callout warn"><strong>Common mistakes:</strong> writing <code>key=len()</code> instead of <code>key=len</code> (you must pass the function, not call it); forgetting that <code>map</code>/<code>filter</code> results are one-time iterators (looping a second time gives nothing — convert to a list if you need it twice); and writing multi-line logic in lambdas.</div>
<h3>Reading real library signatures</h3>
<p>Everything in this lesson exists so that you can read and use professional library code. Here is the kind of signature you will meet in documentation (simplified):</p>
<pre><code class="lang-python">def train_test_split(*arrays, test_size=None, train_size=None,
                     random_state=None, shuffle=True, stratify=None):
    pass</code></pre>
<p>Now you can decode it: <code>*arrays</code> means you may pass any number of arrays (features, labels, sample weights…) positionally; everything after it is keyword-only, so a call must look like <code>train_test_split(X, y, test_size=0.2, random_state=42)</code>; and every keyword has a default, so you only mention what you want to change. Similarly, when a function's docs say it accepts <code>**kwargs</code> "passed to the underlying model", you know those extra keywords are collected in a dict and forwarded with <code>**</code>.</p>
<p>The same ideas make your own code flexible. A training script can load hyperparameters from a JSON file into a dict and call <code>build_model(**params)</code>; a logging helper can accept <code>**metrics</code>; a wrapper function can accept <code>*args, **kwargs</code> and pass them straight through to the function it wraps. Functions-as-values let you pass a scoring function or callback into a generic training loop. These patterns are the glue of nearly every ML codebase.</p>
`,
          keyPoints: [
            "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict.",
            "In a call, *list spreads positional arguments and **dict spreads keyword arguments - e.g. Model(**config).",
            "Parameters after a bare * are keyword-only, making calls explicit.",
            "Functions are objects: they can be stored and passed to other (higher-order) functions.",
            "lambda x: expr makes a tiny function, ideal as a key for sorted/min/max; comprehensions are usually clearer than map/filter."
          ],
          exercise: {
            prompt: String.raw`<p>Write a function <code>run_experiment(name, *seeds, verbose=False, **params)</code> that:</p>
<ul>
<li>returns a dict <code>{"name": name, "n_runs": number of seeds, "params": params}</code>,</li>
<li>if <code>verbose</code> is True, first prints one line per seed like <code>run name seed=1 lr=0.1 depth=3</code> (params in the order given).</li>
</ul>
<p>Then store the best parameters in a dict and call it with <code>**</code>, and sort a list of results by score with a lambda:</p>
<pre><code class="lang-python">best = {"lr": 0.1, "depth": 3}
info = run_experiment("tree", 1, 2, verbose=True, **best)
print(info)
results = [("a", 0.7), ("b", 0.9), ("c", 0.8)]
print([name for name, score in sorted(results, key=lambda r: r[1], reverse=True)])</code></pre>
<p>Expected:</p>
<pre><code class="lang-text">run tree seed=1 lr=0.1 depth=3
run tree seed=2 lr=0.1 depth=3
{'name': 'tree', 'n_runs': 2, 'params': {'lr': 0.1, 'depth': 3}}
['b', 'c', 'a']</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">def run_experiment(name, *seeds, verbose=False, **params):
    if verbose:
        param_text = " ".join(f"{k}={v}" for k, v in params.items())
        for seed in seeds:
            print(f"run {name} seed={seed} {param_text}")
    return {"name": name, "n_runs": len(seeds), "params": params}

best = {"lr": 0.1, "depth": 3}
info = run_experiment("tree", 1, 2, verbose=True, **best)
print(info)
results = [("a", 0.7), ("b", 0.9), ("c", 0.8)]
print([name for name, score in sorted(results, key=lambda r: r[1], reverse=True)])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">run tree seed=1 lr=0.1 depth=3
run tree seed=2 lr=0.1 depth=3
{'name': 'tree', 'n_runs': 2, 'params': {'lr': 0.1, 'depth': 3}}
['b', 'c', 'a']</code></pre>
<p>In the call, <code>1, 2</code> are collected by <code>*seeds</code> as the tuple <code>(1, 2)</code>; <code>verbose=True</code> fills the keyword-only parameter; and <code>**best</code> expands into <code>lr=0.1, depth=3</code>, which <code>**params</code> collects back into a dict. The lambda tells <code>sorted</code> to compare results by their second element (the score).</p>`
          },
          quiz: [
            { q: "Inside def f(*args), what type is args?", options: ["list", "tuple", "dict", "set"], answer: 1, explain: "*args packs extra positional arguments into a tuple." },
            { q: "params = {\"lr\": 0.1, \"epochs\": 5}. What does train(**params) mean?", options: ["train(params)", "train(lr=0.1, epochs=5)", "train(\"lr\", \"epochs\")", "train(0.1, 5) only if positional"], answer: 1, explain: "** in a call unpacks a dict into keyword arguments." },
            { q: "What does sorted([\"bb\", \"a\", \"ccc\"], key=lambda s: -len(s)) return?", options: ["['a', 'bb', 'ccc']", "['ccc', 'bb', 'a']", "['bb', 'a', 'ccc']", "Error"], answer: 1, explain: "Sorting by negative length puts the longest strings first." },
            { q: "In def f(a, *, b): ..., how must b be passed?", options: ["Positionally only", "By keyword only, e.g. f(1, b=2)", "It cannot be passed", "As part of *args"], answer: 1, explain: "Parameters after a bare * are keyword-only." },
            { q: "What is wrong with sorted(words, key=len())?", options: ["Nothing", "key must receive the function itself (len), not the result of calling it", "len is not a function", "sorted has no key argument"], answer: 1, explain: "len() calls len with no argument (an error). Pass key=len so sorted can call it on each item." }
          ]
        },
        {
          id: "py-functions-docs",
          title: "Docstrings, Type Hints and Well-Designed Functions",
          minutes: 40,
          objectives: [
            "Write docstrings that explain what a function does, its parameters and return value",
            "Annotate functions with type hints, including lists, dicts and optional values",
            "Explain that type hints are not enforced at runtime but power editors, checkers, FastAPI and Pydantic",
            "Refactor long code into small, single-purpose functions"
          ],
          body: String.raw`
<h3>Code is read more than it is written</h3>
<p>A function's <em>name</em> and <em>parameters</em> are a contract: they tell other programmers (and future you) how to use it without reading the body. Two tools make that contract explicit: <strong>docstrings</strong> describe it in words, and <strong>type hints</strong> describe the kinds of values involved. Professional AI code — every library you will use — is written this way.</p>

<h3>Docstrings</h3>
<p>A <strong>docstring</strong> is a string literal placed as the very first statement of a function (or class or module). Unlike a comment, Python keeps it: <code>help(func)</code> displays it, and editors show it when you hover over a call.</p>
<pre><code class="lang-python runnable">def f1_score(precision, recall):
    """Compute the F1 score, the harmonic mean of precision and recall.

    Args:
        precision: Fraction of predicted positives that were correct (0-1).
        recall: Fraction of actual positives that were found (0-1).

    Returns:
        The F1 score between 0 and 1. Returns 0.0 if both inputs are 0.
    """
    if precision + recall == 0:
        return 0.0
    return 2 * precision * recall / (precision + recall)

print(round(f1_score(0.8, 0.6), 4))
print(f1_score.__doc__.splitlines()[0])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.6857
Compute the F1 score, the harmonic mean of precision and recall.</code></pre>
<p>Conventions (PEP 257 and the popular "Google style" used above):</p>
<ul>
  <li>Use triple double quotes, even for one line: <code>"""Return the mean of values."""</code></li>
  <li>The first line is a short summary in the imperative mood ("Compute…", "Return…"), ending with a period.</li>
  <li>For non-trivial functions, add a blank line and then sections such as <em>Args</em>, <em>Returns</em>, <em>Raises</em>, and optionally an <em>Example</em>.</li>
  <li>Explain <em>what</em> and <em>why</em>, plus units and valid ranges. Don't restate the code line by line.</li>
</ul>

<h3>Type hints</h3>
<p><strong>Type hints</strong> (annotations) state the expected type of each parameter and the return value. A colon after a parameter name gives its type; <code>-&gt;</code> before the final colon gives the return type:</p>
<pre><code class="lang-python runnable">def scale(value: float, factor: float = 2.0) -&gt; float:
    return value * factor

def count_words(text: str) -&gt; dict[str, int]:
    counts: dict[str, int] = {}          # variables can be annotated too
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

def top_k(scores: list[float], k: int = 3) -&gt; list[float]:
    return sorted(scores, reverse=True)[:k]

print(scale(1.5))
print(count_words("To be or not to be"))
print(top_k([0.2, 0.9, 0.5, 0.7], k=2))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">3.0
{'to': 2, 'be': 2, 'or': 1, 'not': 1}
[0.9, 0.7]</code></pre>
<p>Useful forms (Python 3.10+):</p>
<table>
<thead><tr><th>Hint</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code></td><td>basic types</td></tr>
<tr><td><code>list[str]</code></td><td>a list of strings</td></tr>
<tr><td><code>dict[str, float]</code></td><td>a dict with string keys and float values</td></tr>
<tr><td><code>tuple[int, int]</code></td><td>a tuple of exactly two ints</td></tr>
<tr><td><code>str | None</code></td><td>a string or None (an optional value); older code writes <code>Optional[str]</code></td></tr>
<tr><td><code>int | float</code></td><td>either type</td></tr>
<tr><td><code>Callable[[float], float]</code></td><td>a function taking a float and returning a float (from <code>typing</code> or <code>collections.abc</code>)</td></tr>
</tbody></table>

<h3>Type hints are not enforced — so why bother?</h3>
<p>This surprises beginners: Python <strong>ignores</strong> type hints when running code. Calling <code>scale("ab", 2)</code> doesn't raise an error from the hint; it simply runs <code>"ab" * 2</code>:</p>
<pre><code class="lang-python runnable">def scale(value: float, factor: float = 2.0) -&gt; float:
    return value * factor

print(scale("ab", 2))      # hints are not checked at runtime!</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">abab</code></pre>
<p>Hints are still enormously valuable:</p>
<ul>
  <li><strong>Editors</strong> (VS Code/Pylance) use them for autocomplete and underline mistakes before you run anything.</li>
  <li><strong>Static type checkers</strong> such as <code>mypy</code> or <code>pyright</code> read the whole project and report type errors — catching bugs without running the code.</li>
  <li><strong>Documentation</strong>: <code>def predict(texts: list[str]) -&gt; list[float]</code> tells you almost everything about how to use it.</li>
  <li><strong>Frameworks use them at runtime.</strong> This is where it gets important for AI apps: <strong>FastAPI</strong> (which you will use to serve models as web APIs) reads type hints to validate incoming requests and generate documentation, and <strong>Pydantic</strong> uses them to validate data, including structured outputs from LLMs. Dataclasses (next module) are built from hints too.</li>
</ul>
<p>A small preview of Pydantic, which <em>does</em> enforce types and converts data where it sensibly can:</p>
<pre><code class="lang-python runnable">from pydantic import BaseModel, ValidationError

class PredictRequest(BaseModel):
    text: str
    threshold: float = 0.5

req = PredictRequest(text="great movie", threshold="0.7")   # "0.7" converted to float
print(req.threshold, type(req.threshold).__name__)
try:
    PredictRequest(text="hi", threshold="high")
except ValidationError:
    print("rejected: threshold must be a number")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.7 float
rejected: threshold must be a number</code></pre>

<h3>Designing good functions</h3>
<p>Docstrings and hints describe a function; good design makes it worth describing. Guidelines that experienced engineers follow:</p>
<ol>
  <li><strong>One job per function.</strong> If you need "and" to describe it ("loads the data <em>and</em> cleans it <em>and</em> trains"), split it.</li>
  <li><strong>Short.</strong> If it doesn't fit on one screen (roughly 20–40 lines), look for pieces to extract.</li>
  <li><strong>Clear names.</strong> Verbs for actions (<code>load_reviews</code>, <code>compute_accuracy</code>), nouns for values. Booleans read as questions: <code>is_valid</code>, <code>has_labels</code>.</li>
  <li><strong>Inputs in, outputs out.</strong> Take what you need as parameters, return results, avoid globals and hidden side effects.</li>
  <li><strong>Few parameters.</strong> More than about five suggests grouping them (a dict, dataclass or config object).</li>
  <li><strong>Handle edge cases explicitly</strong> — empty inputs, zero division — and document them.</li>
</ol>

<h3>Refactoring example</h3>
<p><strong>Refactoring</strong> means restructuring code without changing what it does. Here is a "script-style" block that cleans reviews and reports statistics all at once, followed by the same logic split into documented, typed functions:</p>
<pre><code class="lang-python runnable">reviews = ["Great phone!!", "  bad battery ", "GREAT value", ""]

# --- before: everything tangled together ---
total = 0
n = 0
for r in reviews:
    r = r.strip().lower().replace("!", "")
    if r:
        total += len(r.split())
        n += 1
print("avg words:", total / n)

# --- after: small single-purpose functions ---
def clean(text: str) -&gt; str:
    """Lowercase, trim and strip exclamation marks from a review."""
    return text.strip().lower().replace("!", "")

def word_count(text: str) -&gt; int:
    """Return the number of whitespace-separated words."""
    return len(text.split())

def average_words(texts: list[str]) -&gt; float:
    """Average word count of the non-empty cleaned texts (0.0 if none)."""
    cleaned = [clean(t) for t in texts]
    non_empty = [t for t in cleaned if t]
    if not non_empty:
        return 0.0
    return sum(word_count(t) for t in non_empty) / len(non_empty)

print("avg words:", average_words(reviews))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">avg words: 2.0
avg words: 2.0</code></pre>
<p>The second version is longer, but each piece can be understood, tested and reused independently — <code>clean</code> could be reused in a prediction API, and <code>average_words</code> handles the empty case the first version would crash on.</p>
<div class="callout warn"><strong>Common mistakes:</strong> believing type hints validate data (they don't, unless a library like Pydantic does it); docstrings that lie because the code changed but the docstring didn't; putting the docstring after other statements (then it's just an unused string); and giant "do everything" functions.</div>
`,
          keyPoints: [
            "A docstring is the first statement in a function, in triple quotes; help() and editors display it.",
            "Type hints: def f(x: float, names: list[str]) -> dict[str, int]; use X | None for optional values.",
            "Python does not enforce hints at runtime, but editors, mypy, FastAPI and Pydantic rely on them.",
            "Good functions do one job, are short, have clear names, take inputs and return outputs.",
            "Refactoring into small functions makes code testable and reusable without changing behaviour."
          ],
          exercise: {
            prompt: String.raw`<p>Refactor the following script into three functions with type hints and docstrings: <code>parse_line(line: str) -&gt; tuple[str, float]</code>, <code>load_scores(lines: list[str]) -&gt; dict[str, float]</code>, and <code>passing(scores: dict[str, float], threshold: float = 0.75) -&gt; list[str]</code> (sorted names).</p>
<pre><code class="lang-python">lines = ["alice: 0.91", "bob: 0.62", "chen: 0.78", "dana: 0.75"]
scores = {}
for line in lines:
    name, value = line.split(":")
    scores[name.strip()] = float(value)
result = []
for name in scores:
    if scores[name] &gt;= 0.75:
        result.append(name)
print(sorted(result))</code></pre>
<p>The output must stay <code>['alice', 'chen', 'dana']</code>. Also print the first line of <code>passing</code>'s docstring.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">def parse_line(line: str) -&gt; tuple[str, float]:
    """Split a 'name: score' line into a (name, score) tuple."""
    name, value = line.split(":")
    return name.strip(), float(value)

def load_scores(lines: list[str]) -&gt; dict[str, float]:
    """Parse many 'name: score' lines into a name -&gt; score dict."""
    return dict(parse_line(line) for line in lines)

def passing(scores: dict[str, float], threshold: float = 0.75) -&gt; list[str]:
    """Return the sorted names whose score is at least the threshold.

    Args:
        scores: Mapping of name to score.
        threshold: Minimum score to pass (inclusive).
    """
    return sorted(name for name, s in scores.items() if s &gt;= threshold)

lines = ["alice: 0.91", "bob: 0.62", "chen: 0.78", "dana: 0.75"]
print(passing(load_scores(lines)))
print(passing.__doc__.splitlines()[0])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['alice', 'chen', 'dana']
Return the sorted names whose score is at least the threshold.</code></pre>
<p><code>dict()</code> accepts any iterable of (key, value) pairs, so feeding it the tuples from <code>parse_line</code> builds the dictionary in one line. Each function now has one job, and the threshold became a parameter with a default instead of a hard-coded number, so the same function serves other thresholds. Note <code>float(" 0.91")</code> tolerates surrounding spaces.</p>`
          },
          quiz: [
            { q: "Where must a docstring be placed to be recognised?", options: ["Anywhere in the function", "As the first statement inside the function body", "Above the def line as a comment", "After the return statement"], answer: 1, explain: "Only a string literal that is the first statement becomes the function's __doc__." },
            { q: "def f(x: int) -> int: return x * 2. What does f(\"ha\") do at runtime?", options: ["Raises TypeError because of the hint", "Returns \"haha\"", "Returns None", "Converts \"ha\" to int"], answer: 1, explain: "Python does not enforce type hints at runtime; \"ha\" * 2 is \"haha\". Tools like mypy would flag it." },
            { q: "How do you hint a parameter that may be a string or None (Python 3.10+)?", options: ["name: str or None", "name: str | None", "name: [str, None]", "name: str?"], answer: 1, explain: "The union syntax str | None (or Optional[str]) expresses an optional value." },
            { q: "Which framework used later in this course reads type hints to validate web requests?", options: ["NumPy", "FastAPI", "Matplotlib", "Git"], answer: 1, explain: "FastAPI (with Pydantic) uses type hints to validate and document API inputs and outputs." }
          ]
        }
      ]
    },
    {
      id: "py-oop",
      title: "Objects and Classes",
      summary: "Bundle data and behaviour together with classes, reuse them through inheritance and dataclasses, and understand the fit/predict design of ML libraries.",
      lessons: [
        {
          id: "py-oop-classes",
          title: "Classes, Objects, Attributes and Methods",
          minutes: 50,
          objectives: [
            "Explain the difference between a class and an instance using a blueprint analogy",
            "Define a class with __init__, attributes and methods, and explain self",
            "Distinguish instance attributes from class attributes",
            "Give objects helpful printed forms with __repr__ and __str__"
          ],
          body: String.raw`
<h3>Why objects?</h3>
<p>Imagine you are tracking several ML experiments. Each has a name, a learning rate, a list of recorded losses, and you want to ask each one "what was your best loss?". With what you know so far you might keep parallel lists or a dict per experiment and write separate functions that take that dict. It works, but the data and the operations on it are scattered.</p>
<p>A <strong>class</strong> bundles <strong>data</strong> (called <em>attributes</em>) and the <strong>functions that work on that data</strong> (called <em>methods</em>) into one unit. You have been using objects from the start: a string is an object with data (its characters) and methods (<code>.upper()</code>, <code>.split()</code>); a list has <code>.append()</code> and <code>.sort()</code>. Now you will design your own types.</p>

<h3>Class vs instance: blueprint and houses</h3>
<p>A class is a <strong>blueprint</strong>; an <strong>instance</strong> (or object) is a house built from it. One blueprint can produce many houses. Every house has the same <em>kinds</em> of features (rooms, a door), but each has its own <em>values</em> (this one is blue, that one is red). Likewise, <code>str</code> is a class and <code>"hello"</code> is one instance of it.</p>

<h3>Your first class</h3>
<pre><code class="lang-python runnable">class Experiment:
    def __init__(self, name, learning_rate):
        self.name = name                    # instance attributes
        self.learning_rate = learning_rate
        self.losses = []                    # every experiment starts empty

    def log(self, loss):                    # a method
        self.losses.append(loss)

    def best_loss(self):
        return min(self.losses) if self.losses else None

exp_a = Experiment("baseline", 0.01)        # create instances
exp_b = Experiment("bigger-lr", 0.1)

exp_a.log(0.9)
exp_a.log(0.6)
exp_b.log(1.4)

print(exp_a.name, exp_a.best_loss())
print(exp_b.name, exp_b.best_loss())
print(exp_a.losses, exp_b.losses)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">baseline 0.6
bigger-lr 1.4
[0.9, 0.6] [1.4]</code></pre>
<p>Step by step:</p>
<ul>
  <li><code>class Experiment:</code> defines a new type. Class names use <code>CamelCase</code> (capital first letters), unlike functions and variables.</li>
  <li><code>__init__</code> (pronounced "dunder init", for "double underscore") is the <strong>initialiser</strong>. Python calls it automatically when you create an instance with <code>Experiment("baseline", 0.01)</code>. Its job is to set up the new object's attributes.</li>
  <li><code>self</code> is the instance being worked on. Writing <code>self.name = name</code> stores the value <em>on that particular object</em>. Inside methods, <code>self.losses</code> means "this experiment's losses".</li>
  <li>Methods are functions defined inside the class. Their first parameter is always <code>self</code>.</li>
  <li>Each instance has its own attributes: logging to <code>exp_a</code> does not affect <code>exp_b</code>.</li>
</ul>

<h3>How self works</h3>
<p>When you call <code>exp_a.log(0.9)</code>, Python actually performs <code>Experiment.log(exp_a, 0.9)</code>: it looks up the method on the class and passes the instance as the first argument automatically. That is why you define <code>def log(self, loss)</code> with two parameters but call it with one argument.</p>
<pre><code class="lang-python runnable">class Counter:
    def __init__(self):
        self.value = 0
    def increment(self, by=1):
        self.value += by
        return self.value

c = Counter()
c.increment()
Counter.increment(c, 5)       # exactly what c.increment(5) does
print(c.value)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">6</code></pre>
<div class="callout warn"><strong>Forgetting self</strong> is the number one class bug. <code>def log(loss):</code> gives <code>TypeError: log() takes 1 positional argument but 2 were given</code> (Python passed the instance plus your loss). And writing <code>losses = []</code> instead of <code>self.losses = []</code> inside <code>__init__</code> creates a local variable that vanishes when <code>__init__</code> ends, so later <code>self.losses</code> raises <code>AttributeError</code>.</div>

<h3>Attributes can be read and changed</h3>
<pre><code class="lang-python runnable">class Experiment:
    def __init__(self, name, learning_rate):
        self.name = name
        self.learning_rate = learning_rate

e = Experiment("run-1", 0.01)
print(e.learning_rate)
e.learning_rate = 0.005          # attributes are just names on the object
print(e.learning_rate)
print(hasattr(e, "losses"), getattr(e, "name"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.01
0.005
False run-1</code></pre>
<p>Python has no truly private attributes. By convention, a name starting with an underscore (<code>self._cache</code>) means "internal — please don't touch from outside".</p>

<h3>Class attributes vs instance attributes</h3>
<p>Attributes assigned directly in the class body (not on <code>self</code>) are <strong>class attributes</strong>, shared by all instances. Use them for constants that belong to the type:</p>
<pre><code class="lang-python runnable">class ImageClassifier:
    input_size = (224, 224)                 # class attribute: shared
    def __init__(self, labels):
        self.labels = labels                # instance attribute: per object

a = ImageClassifier(["cat", "dog"])
b = ImageClassifier(["car", "bus", "bike"])
print(a.input_size, b.input_size)
print(len(a.labels), len(b.labels))
print(ImageClassifier.input_size)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">(224, 224) (224, 224)
2 3
(224, 224)</code></pre>
<p>Never use a mutable class attribute (like a list) for per-object data — it would be shared, the same trap as mutable default arguments. Create per-object lists in <code>__init__</code>.</p>

<h3>Printing objects nicely: __repr__ and __str__</h3>
<p>By default, printing an object shows something unhelpful like <code>&lt;__main__.Experiment object at 0x7f...&gt;</code>. Two special ("dunder") methods fix this:</p>
<ul>
  <li><code>__repr__</code> — an unambiguous, developer-oriented representation, ideally looking like the code that recreates the object. Used in the REPL, in lists, and in debuggers.</li>
  <li><code>__str__</code> — a friendly, human-oriented text, used by <code>print()</code> and <code>str()</code>. If missing, Python falls back to <code>__repr__</code>.</li>
</ul>
<pre><code class="lang-python runnable">class Prediction:
    def __init__(self, label, confidence):
        self.label = label
        self.confidence = confidence

    def __repr__(self):
        return f"Prediction(label={self.label!r}, confidence={self.confidence})"

    def __str__(self):
        return f"{self.label} ({self.confidence:.0%} confident)"

p = Prediction("cat", 0.93)
print(p)                  # uses __str__
print(repr(p))            # uses __repr__
print([p, Prediction("dog", 0.4)])   # containers use __repr__</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">cat (93% confident)
Prediction(label='cat', confidence=0.93)
[Prediction(label='cat', confidence=0.93), Prediction(label='dog', confidence=0.4)]</code></pre>
<p><code>!r</code> inside an f-string uses the value's <code>repr</code>, which adds quotes around strings. Always write at least a <code>__repr__</code> for your classes; it makes debugging much easier. Printing a PyTorch model or a scikit-learn estimator shows a readable summary precisely because those libraries implement <code>__repr__</code>.</p>

<h3>Other dunder methods</h3>
<p>Dunder methods let your objects work with Python's built-in syntax. <code>__len__</code> makes <code>len(obj)</code> work, <code>__getitem__</code> enables <code>obj[i]</code>, <code>__eq__</code> defines <code>==</code>, <code>__add__</code> defines <code>+</code>. PyTorch's <code>Dataset</code> class asks you to implement exactly <code>__len__</code> and <code>__getitem__</code>:</p>
<pre><code class="lang-python runnable">class TextDataset:
    def __init__(self, texts, labels):
        self.texts = texts
        self.labels = labels
    def __len__(self):
        return len(self.texts)
    def __getitem__(self, i):
        return self.texts[i], self.labels[i]

ds = TextDataset(["good", "bad", "okay"], [1, 0, 1])
print(len(ds))
print(ds[1])
for text, label in ds:          # __getitem__ also makes it loopable
    print(text, label)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">3
('bad', 0)
good 1
bad 0
okay 1</code></pre>
<p>(The <code>for</code> loop works because Python falls back to calling <code>__getitem__</code> with 0, 1, 2… until an <code>IndexError</code> occurs.)</p>

<h3>When to write a class</h3>
<ul>
  <li>Several pieces of data always travel together <em>and</em> several functions operate on them → class.</li>
  <li>You need to keep <strong>state</strong> that changes over time (a model that has been trained, a running total, a connection) → class.</li>
  <li>Just a calculation from inputs to outputs → a plain function is simpler.</li>
</ul>
`,
          keyPoints: [
            "A class is a blueprint; instances are objects built from it, each with its own attribute values.",
            "__init__(self, ...) runs on creation and sets attributes with self.name = value.",
            "Methods are functions in the class whose first parameter is self; obj.method(x) means Class.method(obj, x).",
            "Class attributes are shared by all instances; per-object (especially mutable) data belongs in __init__.",
            "__repr__ (developer view) and __str__ (user view) control how objects print; dunders like __len__ and __getitem__ hook into built-in syntax."
          ],
          exercise: {
            prompt: String.raw`<p>Create a class <code>Vocabulary</code> that maps words to integer IDs:</p>
<ul>
<li><code>__init__(self)</code> creates an empty dict <code>word_to_id</code> and a list <code>id_to_word</code>.</li>
<li><code>add(self, word)</code> adds the word if new and returns its ID (IDs are 0, 1, 2… in order of first appearance).</li>
<li><code>encode(self, text)</code> returns a list of IDs for the lower-cased words of <code>text</code>, adding new words as needed.</li>
<li><code>decode(self, ids)</code> returns the words joined by spaces.</li>
<li><code>__len__</code> returns the number of words; <code>__repr__</code> returns <code>Vocabulary(size=N)</code>.</li>
</ul>
<p>Test:</p>
<pre><code class="lang-python">v = Vocabulary()
print(v.encode("the cat sat on the mat"))
print(v.encode("The dog sat"))
print(v.decode([1, 5, 2]))
print(len(v), v)</code></pre>
<pre><code class="lang-text">[0, 1, 2, 3, 0, 4]
[0, 5, 2]
cat dog sat
6 Vocabulary(size=6)</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">class Vocabulary:
    def __init__(self):
        self.word_to_id = {}
        self.id_to_word = []

    def add(self, word):
        if word not in self.word_to_id:
            self.word_to_id[word] = len(self.id_to_word)
            self.id_to_word.append(word)
        return self.word_to_id[word]

    def encode(self, text):
        return [self.add(w) for w in text.lower().split()]

    def decode(self, ids):
        return " ".join(self.id_to_word[i] for i in ids)

    def __len__(self):
        return len(self.id_to_word)

    def __repr__(self):
        return f"Vocabulary(size={len(self)})"

v = Vocabulary()
print(v.encode("the cat sat on the mat"))
print(v.encode("The dog sat"))
print(v.decode([1, 5, 2]))
print(len(v), v)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[0, 1, 2, 3, 0, 4]
[0, 5, 2]
cat dog sat
6 Vocabulary(size=6)</code></pre>
<p>The object keeps <em>state</em> (the two mappings) that grows over time, which is exactly when a class beats loose functions. The next ID is simply the current length of <code>id_to_word</code>. <code>encode</code> reuses <code>add</code>, and <code>__repr__</code> reuses <code>__len__</code> via <code>len(self)</code>. Real tokenizers in Hugging Face are classes with this same encode/decode interface.</p>`
          },
          quiz: [
            { q: "What is self inside a method?", options: ["The class itself", "The instance the method was called on", "A reserved keyword that does nothing", "The parent class"], answer: 1, explain: "obj.method() passes obj automatically as the first argument, conventionally named self." },
            { q: "When is __init__ called?", options: ["When the class is defined", "Automatically when a new instance is created", "Only when you call obj.__init__()", "When the program ends"], answer: 1, explain: "Creating Experiment(...) calls __init__ to set up the new object's attributes." },
            { q: "Which method does print(obj) prefer?", options: ["__repr__", "__str__ (falling back to __repr__)", "__print__", "__init__"], answer: 1, explain: "print uses str(), which uses __str__ if defined, otherwise __repr__." },
            { q: "Inside __init__ you wrote scores = [] instead of self.scores = []. What happens later in another method using self.scores?", options: ["It works fine", "AttributeError: object has no attribute 'scores'", "scores is shared by all instances", "SyntaxError"], answer: 1, explain: "Without self., scores was a local variable of __init__ and disappeared; the object never got the attribute." },
            { q: "Which naming style is conventional for classes?", options: ["snake_case", "CamelCase", "UPPER_CASE", "kebab-case"], answer: 1, explain: "PEP 8 uses CamelCase for classes (Experiment, TextDataset) and snake_case for functions and variables." }
          ]
        },
        {
          id: "py-oop-inheritance",
          title: "Inheritance, Overriding and Dataclasses",
          minutes: 45,
          objectives: [
            "Create subclasses that inherit and override behaviour, using super()",
            "Explain polymorphism: different classes used through the same interface",
            "Use isinstance() to check types",
            "Define concise data-holding classes with @dataclass, including defaults and default_factory"
          ],
          body: String.raw`
<h3>Inheritance: "is a kind of"</h3>
<p><strong>Inheritance</strong> lets a new class (the <strong>subclass</strong> or child) start from an existing class (the <strong>base class</strong> or parent) and get all its attributes and methods for free. The subclass can then add new methods or <strong>override</strong> (replace) existing ones. Use it when the relationship is "is a kind of": a <em>sentiment classifier</em> is a kind of <em>text model</em>; a <em>CSV loader</em> is a kind of <em>data loader</em>.</p>
<pre><code class="lang-python runnable">class Model:
    def __init__(self, name):
        self.name = name
        self.trained = False

    def train(self):
        self.trained = True
        return f"{self.name}: trained"

    def describe(self):
        status = "trained" if self.trained else "untrained"
        return f"{self.name} ({status})"

class TextModel(Model):                   # TextModel inherits from Model
    def tokenize(self, text):             # new method
        return text.lower().split()

m = TextModel("sentiment")
print(m.describe())                       # inherited
print(m.train())                          # inherited
print(m.tokenize("Great Movie"))          # added
print(m.describe())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">sentiment (untrained)
sentiment: trained
['great', 'movie']
sentiment (trained)</code></pre>
<p>When you call <code>m.describe()</code>, Python looks for <code>describe</code> on the <code>TextModel</code> class, doesn't find it, and continues up to <code>Model</code>. This search path is called the <strong>method resolution order</strong>.</p>

<h3>Overriding and super()</h3>
<p>A subclass can define a method with the same name to replace the parent's version. Often you want to <em>extend</em> rather than completely replace it — run the parent's code and then do more. <code>super()</code> gives access to the parent's methods. The most common case is <code>__init__</code>: the child accepts extra parameters, lets the parent set up its part, then sets its own attributes.</p>
<pre><code class="lang-python runnable">class Model:
    def __init__(self, name):
        self.name = name
    def predict(self, x):
        return 0
    def __repr__(self):
        return f"{type(self).__name__}(name={self.name!r})"

class ThresholdModel(Model):
    def __init__(self, name, threshold=0.5):
        super().__init__(name)            # let Model set self.name
        self.threshold = threshold        # then add our own attribute
    def predict(self, x):                 # override
        return 1 if x &gt;= self.threshold else 0

base = Model("base")
tm = ThresholdModel("thresh", threshold=0.7)
print(base, tm, tm.threshold)
print(base.predict(0.9), tm.predict(0.9), tm.predict(0.6))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Model(name='base') ThresholdModel(name='thresh') 0.7
0 1 0</code></pre>
<p>Notice <code>__repr__</code> uses <code>type(self).__name__</code>, so the inherited method prints the right class name for each subclass. Forgetting <code>super().__init__(...)</code> is a classic bug: the parent's attributes (here <code>self.name</code>) are never created.</p>

<h3>Polymorphism: one interface, many implementations</h3>
<p><strong>Polymorphism</strong> ("many forms") means code can work with any object that provides the expected methods, without caring about its exact class. If every model has a <code>predict</code> method, a single evaluation function works for all of them:</p>
<pre><code class="lang-python runnable">class AlwaysOne:
    def predict(self, x):
        return 1

class Threshold:
    def __init__(self, t):
        self.t = t
    def predict(self, x):
        return 1 if x &gt;= self.t else 0

def accuracy(model, xs, ys):
    correct = sum(model.predict(x) == y for x, y in zip(xs, ys))
    return correct / len(ys)

xs = [0.1, 0.4, 0.6, 0.9]
ys = [0, 0, 1, 1]
for model in [AlwaysOne(), Threshold(0.5), Threshold(0.8)]:
    print(type(model).__name__, accuracy(model, xs, ys))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">AlwaysOne 0.5
Threshold 1.0
Threshold 0.75</code></pre>
<p>These two classes don't even share a parent — Python only cares that <code>predict</code> exists. This relaxed style is called <strong>duck typing</strong> ("if it walks like a duck and quacks like a duck, it's a duck"). It is precisely why you can swap one scikit-learn model for another with a one-line change.</p>

<h3>isinstance and issubclass</h3>
<pre><code class="lang-python runnable">class Model: pass
class TextModel(Model): pass

t = TextModel()
print(isinstance(t, TextModel), isinstance(t, Model))   # a TextModel IS a Model
print(isinstance(Model(), TextModel))
print(issubclass(TextModel, Model))
print(isinstance(3.5, (int, float)))                    # check several types</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">True True
False
True
True</code></pre>
<p>(<code>pass</code> is a statement that does nothing — a placeholder for an empty body.) Prefer <code>isinstance(x, T)</code> over <code>type(x) == T</code>, because it also accepts subclasses.</p>
<div class="callout tip"><strong>Composition over inheritance:</strong> inheritance is powerful but can create tangled hierarchies. If the relationship is "has a" rather than "is a" (a <em>pipeline has a</em> tokenizer and a model), store the other object as an attribute instead. Libraries like scikit-learn's <code>Pipeline</code> work this way.</div>

<h3>Dataclasses: classes for holding data</h3>
<p>Many classes mostly hold data: a configuration, a prediction, a record. Writing <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> by hand for them is repetitive. The <code>@dataclass</code> <strong>decorator</strong> (a line starting with <code>@</code> that modifies the class below it) generates them from type-annotated class attributes:</p>
<pre><code class="lang-python runnable">from dataclasses import dataclass, field, asdict

@dataclass
class TrainConfig:
    model_name: str
    learning_rate: float = 0.001
    epochs: int = 10
    layers: list[int] = field(default_factory=lambda: [64, 32])

cfg = TrainConfig("mlp", epochs=5)
print(cfg)                                   # generated __repr__
print(cfg.learning_rate, cfg.layers)
print(cfg == TrainConfig("mlp", epochs=5))   # generated __eq__ compares fields
print(asdict(cfg))                           # handy for saving as JSON</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">TrainConfig(model_name='mlp', learning_rate=0.001, epochs=5, layers=[64, 32])
0.001 [64, 32]
True
{'model_name': 'mlp', 'learning_rate': 0.001, 'epochs': 5, 'layers': [64, 32]}</code></pre>
<p>Notes:</p>
<ul>
  <li>Each annotated attribute becomes an <code>__init__</code> parameter, in order. Fields with defaults must come after fields without.</li>
  <li>Mutable defaults (lists, dicts) must use <code>field(default_factory=...)</code>, which creates a fresh object per instance — the dataclass refuses <code>layers: list[int] = []</code> to protect you from the shared-default trap.</li>
  <li>Like other type hints, dataclass annotations are not enforced: <code>TrainConfig("mlp", epochs="five")</code> is accepted. Use Pydantic when you need validation.</li>
  <li>You can still add methods to a dataclass.</li>
</ul>

<h3>Frozen dataclasses and methods</h3>
<pre><code class="lang-python runnable">from dataclasses import dataclass, FrozenInstanceError

@dataclass(frozen=True)
class Prediction:
    label: str
    confidence: float

    def is_confident(self, threshold: float = 0.8) -&gt; bool:
        return self.confidence &gt;= threshold

p = Prediction("spam", 0.91)
print(p.is_confident(), p.is_confident(0.95))
try:
    p.confidence = 0.1
except FrozenInstanceError:
    print("cannot modify a frozen dataclass")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">True False
cannot modify a frozen dataclass</code></pre>
<p><code>frozen=True</code> makes instances immutable (like a tuple with named fields), so they can't be changed accidentally and can be used as dict keys or set members.</p>
<div class="callout warn"><strong>Common mistakes:</strong> forgetting to call <code>super().__init__()</code> in a subclass's <code>__init__</code>; using inheritance for "has a" relationships; non-default dataclass fields after default ones (<code>TypeError: non-default argument follows default argument</code>); and mutable dataclass defaults without <code>default_factory</code>.</div>
<h3>Where you'll meet inheritance in AI libraries</h3>
<p>You will rarely build deep class hierarchies yourself, but you will constantly <em>subclass</em> library classes, because that is how frameworks let you plug in your own logic:</p>
<ul>
  <li><strong>PyTorch</strong>: every neural network is a subclass of <code>torch.nn.Module</code>. You override <code>__init__</code> (calling <code>super().__init__()</code> first, exactly as above) to create layers, and define <code>forward</code> to compute outputs. Every other feature — moving to a GPU, saving weights, listing parameters — is inherited.</li>
  <li><strong>PyTorch datasets</strong>: subclass <code>torch.utils.data.Dataset</code> and implement <code>__len__</code> and <code>__getitem__</code>.</li>
  <li><strong>Pydantic and FastAPI</strong>: request and response schemas subclass <code>BaseModel</code> and declare fields with type hints, much like dataclasses.</li>
  <li><strong>scikit-learn</strong>: custom transformers subclass <code>BaseEstimator</code> and <code>TransformerMixin</code> to get <code>get_params</code> and <code>fit_transform</code> for free.</li>
  <li><strong>Exceptions</strong>: custom errors subclass <code>Exception</code> (next module).</li>
</ul>
<p>In each case the parent class provides a large amount of machinery, and you override one or two methods. Understanding inheritance and <code>super()</code> is what makes those framework tutorials readable instead of magical.</p>
`,
          keyPoints: [
            "class Child(Parent): inherits all of Parent's methods; define a same-named method to override it.",
            "super().__init__(...) runs the parent's initialiser so its attributes are set up.",
            "Polymorphism/duck typing: any object with the expected methods (e.g. predict) can be used by the same code.",
            "isinstance(obj, Class) is True for instances of the class and its subclasses.",
            "@dataclass generates __init__, __repr__ and __eq__ from annotated fields; use field(default_factory=list) for mutable defaults and frozen=True for immutability."
          ],
          exercise: {
            prompt: String.raw`<p>1. Create a base class <code>Preprocessor</code> with a method <code>transform(self, text)</code> that returns <code>text</code> unchanged and a method <code>transform_all(self, texts)</code> that applies <code>transform</code> to every item.</p>
<p>2. Create subclasses <code>Lowercaser</code> (overrides <code>transform</code> to lowercase) and <code>Truncator</code>, whose <code>__init__</code> takes <code>max_words</code> and whose <code>transform</code> keeps only the first <code>max_words</code> words.</p>
<p>3. Create a dataclass <code>Report</code> with fields <code>name: str</code> and <code>outputs: list[str]</code> (default empty list).</p>
<p>Then run:</p>
<pre><code class="lang-python">texts = ["The Quick Brown Fox", "Hello World Again Today"]
for step in [Preprocessor(), Lowercaser(), Truncator(2)]:
    print(Report(type(step).__name__, step.transform_all(texts)))
print(Report("empty"))</code></pre>
<pre><code class="lang-text">Report(name='Preprocessor', outputs=['The Quick Brown Fox', 'Hello World Again Today'])
Report(name='Lowercaser', outputs=['the quick brown fox', 'hello world again today'])
Report(name='Truncator', outputs=['The Quick', 'Hello World'])
Report(name='empty', outputs=[])</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">from dataclasses import dataclass, field

class Preprocessor:
    def transform(self, text):
        return text
    def transform_all(self, texts):
        return [self.transform(t) for t in texts]

class Lowercaser(Preprocessor):
    def transform(self, text):
        return text.lower()

class Truncator(Preprocessor):
    def __init__(self, max_words):
        super().__init__()
        self.max_words = max_words
    def transform(self, text):
        return " ".join(text.split()[: self.max_words])

@dataclass
class Report:
    name: str
    outputs: list[str] = field(default_factory=list)

texts = ["The Quick Brown Fox", "Hello World Again Today"]
for step in [Preprocessor(), Lowercaser(), Truncator(2)]:
    print(Report(type(step).__name__, step.transform_all(texts)))
print(Report("empty"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Report(name='Preprocessor', outputs=['The Quick Brown Fox', 'Hello World Again Today'])
Report(name='Lowercaser', outputs=['the quick brown fox', 'hello world again today'])
Report(name='Truncator', outputs=['The Quick', 'Hello World'])
Report(name='empty', outputs=[])</code></pre>
<p>The subclasses never define <code>transform_all</code>; they inherit it. Inside it, <code>self.transform</code> finds the <em>subclass's</em> override — the heart of polymorphism. <code>Preprocessor</code> has no <code>__init__</code> of its own, so <code>super().__init__()</code> reaches Python's default (harmless, and a good habit). The dataclass generated the readable repr automatically, and <code>default_factory=list</code> gives each report its own empty list.</p>`
          },
          quiz: [
            { q: "class B(A): pass. b = B(). Which is True?", options: ["isinstance(b, A) is False", "B has all methods defined in A", "A has all methods defined in B", "B must define __init__"], answer: 1, explain: "A subclass inherits everything from its parent; isinstance(b, A) is True." },
            { q: "What does super().__init__(name) do inside a subclass __init__?", options: ["Creates a second object", "Runs the parent class's __init__ on this same object", "Deletes the parent", "Calls the subclass __init__ again"], answer: 1, explain: "It lets the parent initialise its attributes on self before the child adds its own." },
            { q: "Which is the correct way to give a dataclass field an empty list default?", options: ["tags: list = []", "tags: list = field(default_factory=list)", "tags: list = list", "tags = []"], answer: 1, explain: "Mutable defaults must use default_factory so each instance gets a new list; dataclasses reject = []." },
            { q: "Why can you evaluate a LogisticRegression and a RandomForest with the same function?", options: ["They are the same class", "Both provide the same methods (fit/predict) - polymorphism", "Python converts them automatically", "Because of isinstance"], answer: 1, explain: "Shared method names let the same code work with different classes (duck typing/polymorphism)." }
          ]
        },
        {
          id: "py-oop-ml-estimators",
          title: "Why ML Libraries Use Classes: Building fit/predict",
          minutes: 50,
          objectives: [
            "Explain the estimator pattern: configuration in __init__, learning in fit, inference in predict",
            "Build toy classifiers and regressors that follow the scikit-learn interface",
            "Explain the trailing-underscore convention for learned attributes and why fit returns self",
            "Use a real scikit-learn model and recognise the same pattern"
          ],
          body: String.raw`
<h3>A model is an object with state</h3>
<p>Training a machine learning model means looking at example data and <strong>learning some numbers</strong> (called <em>parameters</em>) — the average house price, the slope of a line, the weights of a neural network. Later, making a <strong>prediction</strong> means using those learned numbers on new inputs. So a model needs to <em>remember</em> what it learned between the two steps. "Data plus behaviour plus state that changes over time" is exactly what classes are for.</p>
<p>scikit-learn, the most popular classic ML library, standardised a simple pattern that nearly every Python ML tool now copies. Each model is an <strong>estimator</strong> class with:</p>
<table>
<thead><tr><th>Step</th><th>Method</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>Configure</td><td><code>__init__(self, **hyperparameters)</code></td><td>Store settings chosen by you (hyperparameters). No learning yet.</td></tr>
<tr><td>Learn</td><td><code>fit(self, X, y)</code></td><td>Look at training inputs <code>X</code> and answers <code>y</code>; compute and store learned attributes. Return <code>self</code>.</td></tr>
<tr><td>Use</td><td><code>predict(self, X)</code></td><td>Use the learned attributes to produce outputs for new inputs.</td></tr>
<tr><td>Evaluate</td><td><code>score(self, X, y)</code></td><td>Predict and compare with the true answers (accuracy, R²...).</td></tr>
</tbody></table>
<p>By convention <code>X</code> (capital) is the input data — a list of examples, each a list of feature values — and <code>y</code> (lowercase) holds the target answers. A <strong>hyperparameter</strong> is a setting you choose before training (like <code>k</code> in nearest neighbours); a <strong>parameter</strong> is something the model learns from data.</p>

<h3>Toy model 1: the majority-class classifier</h3>
<p>The simplest possible classifier always predicts the most common label it saw during training. It is a real tool: it is the <strong>baseline</strong> every serious model must beat (scikit-learn ships it as <code>DummyClassifier</code>).</p>
<pre><code class="lang-python runnable">from collections import Counter

class MajorityClassifier:
    """Always predicts the most frequent training label."""

    def fit(self, X, y):
        self.majority_ = Counter(y).most_common(1)[0][0]   # learned attribute
        return self

    def predict(self, X):
        return [self.majority_ for _ in X]

    def score(self, X, y):
        preds = self.predict(X)
        return sum(p == t for p, t in zip(preds, y)) / len(y)

X_train = [[1], [2], [3], [4], [5]]
y_train = ["ham", "spam", "ham", "ham", "spam"]

model = MajorityClassifier().fit(X_train, y_train)
print(model.majority_)
print(model.predict([[10], [20]]))
print(model.score([[6], [7], [8]], ["ham", "spam", "ham"]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">ham
['ham', 'ham']
0.6666666666666666</code></pre>
<p>Two conventions are visible already:</p>
<ul>
  <li><strong>Trailing underscore</strong> (<code>majority_</code>): attributes <em>learned during fit</em> end with <code>_</code>. Seeing <code>model.coef_</code> or <code>model.classes_</code> tells you "this exists only after training".</li>
  <li><strong><code>fit</code> returns <code>self</code></strong>, so you can chain: <code>MajorityClassifier().fit(X, y).predict(X_new)</code>.</li>
</ul>

<h3>Toy model 2: a 1-nearest-neighbour classifier with a hyperparameter</h3>
<p>A <strong>k-nearest-neighbours</strong> (k-NN) classifier predicts the label of the training examples closest to the new point. "Training" is just remembering the data. Here <code>k</code> is a hyperparameter set in <code>__init__</code>:</p>
<pre><code class="lang-python runnable">import math
from collections import Counter

class KNNClassifier:
    def __init__(self, k=1):
        self.k = k                                   # hyperparameter

    def fit(self, X, y):
        self.X_ = [list(row) for row in X]           # learned: the stored data
        self.y_ = list(y)
        return self

    def _distance(self, a, b):                       # internal helper
        return math.sqrt(sum((ai - bi) ** 2 for ai, bi in zip(a, b)))

    def predict(self, X):
        preds = []
        for row in X:
            dists = sorted((self._distance(row, xt), yt) for xt, yt in zip(self.X_, self.y_))
            nearest = [label for _, label in dists[: self.k]]
            preds.append(Counter(nearest).most_common(1)[0][0])
        return preds

    def __repr__(self):
        return f"KNNClassifier(k={self.k})"

# features: [height_cm, weight_kg]; labels: animal
X = [[30, 4], [25, 3], [60, 25], [70, 30], [28, 5]]
y = ["cat", "cat", "dog", "dog", "cat"]

knn = KNNClassifier(k=3).fit(X, y)
print(knn)
print(knn.predict([[27, 4], [65, 28]]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">KNNClassifier(k=3)
['cat', 'dog']</code></pre>
<p>The private helper <code>_distance</code> starts with an underscore: it is an internal detail, not part of the public interface. The <code>__repr__</code> shows only the hyperparameters, just as printing a scikit-learn model does.</p>

<h3>Toy model 3: a regressor that learns a line</h3>
<p>A <strong>regressor</strong> predicts numbers rather than labels. Simple linear regression finds the straight line <code>y = slope × x + intercept</code> that best fits the data, using a well-known formula (the "least squares" solution):</p>
<pre><code class="lang-python runnable">class SimpleLinearRegression:
    def fit(self, x, y):
        n = len(x)
        mean_x, mean_y = sum(x) / n, sum(y) / n
        cov = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))
        var = sum((xi - mean_x) ** 2 for xi in x)
        self.slope_ = cov / var
        self.intercept_ = mean_y - self.slope_ * mean_x
        return self

    def predict(self, x):
        return [self.slope_ * xi + self.intercept_ for xi in x]

# house size (in 100 m2) vs price (in 100k)
sizes = [1.0, 1.5, 2.0, 2.5, 3.0]
prices = [2.0, 2.9, 4.1, 5.0, 6.0]

reg = SimpleLinearRegression().fit(sizes, prices)
print(f"slope={reg.slope_:.2f} intercept={reg.intercept_:.2f}")
print([round(p, 2) for p in reg.predict([4.0])])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">slope=2.02 intercept=-0.04
[8.04]</code></pre>
<p>(For simplicity this toy takes a flat list of single numbers; real estimators accept a 2-D <code>X</code>.) You don't need to understand the formula yet — the ML track explains it. Focus on the shape: <code>fit</code> computes and stores <code>slope_</code> and <code>intercept_</code>; <code>predict</code> uses them.</p>

<h3>Guarding against using an untrained model</h3>
<p>Calling <code>predict</code> before <code>fit</code> should fail with a clear message. scikit-learn raises <code>NotFittedError</code>; we can do something similar by checking for the learned attribute:</p>
<pre><code class="lang-python runnable">class MeanRegressor:
    def fit(self, X, y):
        self.mean_ = sum(y) / len(y)
        return self
    def predict(self, X):
        if not hasattr(self, "mean_"):
            raise RuntimeError("Call fit() before predict()")
        return [self.mean_] * len(X)

m = MeanRegressor()
try:
    m.predict([[1]])
except RuntimeError as e:
    print("Error:", e)
print(m.fit([[1], [2]], [10, 20]).predict([[3], [4]]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Error: Call fit() before predict()
[15.0, 15.0]</code></pre>
<p>The first call fails cleanly with a helpful message; after <code>fit</code> learned a mean of 15.0, predictions work. (<code>raise</code> is covered in the next module; here it creates an error deliberately.)</p>

<h3>The real thing: scikit-learn</h3>
<p>Here is a real scikit-learn model. Notice that it looks exactly like our toys — configure, fit, predict, score — plus learned attributes ending in <code>_</code>:</p>
<pre><code class="lang-python runnable">from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier

# hours studied, hours slept  -&gt;  passed exam (1) or not (0)
X = [[1, 4], [2, 5], [3, 6], [6, 7], [7, 8], [8, 7]]
y = [0, 0, 0, 1, 1, 1]

for model in [LogisticRegression(), KNeighborsClassifier(n_neighbors=3)]:
    model.fit(X, y)
    print(model, model.predict([[2, 6], [7, 7]]), model.score(X, y))

print(LogisticRegression().fit(X, y).classes_)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">LogisticRegression() [0 1] 1.0
KNeighborsClassifier(n_neighbors=3) [0 1] 1.0
[0 1]</code></pre>
<p>(The predictions print as <code>[0 1]</code> without commas because scikit-learn returns NumPy arrays, which you will learn in the next track.) Because both models share one interface, the loop treats them identically — polymorphism in action. The same pattern extends far beyond scikit-learn: preprocessing classes like <code>StandardScaler</code> have <code>fit</code> and <code>transform</code>; PyTorch models are classes whose <code>__init__</code> defines layers and whose <code>forward</code> method computes predictions; Hugging Face pipelines are callable objects.</p>
<div class="callout info"><strong>Why this design won:</strong> separating <em>configuration</em> (<code>__init__</code>), <em>learning</em> (<code>fit</code>) and <em>inference</em> (<code>predict</code>) makes it easy to try many models with the same code, to tune hyperparameters automatically (a grid search just creates many instances with different settings), to save a trained object to disk and load it inside a web API, and to chain steps into pipelines.</div>
<div class="callout warn"><strong>Common mistakes:</strong> doing the learning in <code>__init__</code> (keep it to storing settings); forgetting <code>return self</code> in <code>fit</code> (chaining then fails with <code>'NoneType' object has no attribute 'predict'</code>); fitting on test data (that is cheating — the model must never see test answers during training); and calling <code>predict</code> before <code>fit</code>.</div>
`,
          keyPoints: [
            "An estimator stores hyperparameters in __init__, learns in fit(X, y), and produces outputs in predict(X).",
            "Learned attributes end with an underscore (coef_, classes_, majority_) and exist only after fit.",
            "fit returns self so calls can be chained: Model().fit(X, y).predict(X_new).",
            "A shared interface lets different models be swapped and evaluated with the same code.",
            "scikit-learn, PyTorch and Hugging Face are all built from classes following this kind of pattern."
          ],
          exercise: {
            prompt: String.raw`<p>Build a <code>NearestCentroidClassifier</code>:</p>
<ul>
<li><code>fit(X, y)</code>: for each label, compute the <em>centroid</em> — the average of each feature over that label's rows — and store them in a dict <code>centroids_</code> (label → list of averages). Return <code>self</code>.</li>
<li><code>predict(X)</code>: for each row, return the label whose centroid is closest (Euclidean distance).</li>
<li><code>score(X, y)</code>: accuracy.</li>
</ul>
<p>Test with:</p>
<pre><code class="lang-python">X = [[1, 1], [2, 1], [1, 2], [8, 8], [9, 8], [8, 9]]
y = ["small", "small", "small", "big", "big", "big"]
clf = NearestCentroidClassifier().fit(X, y)
print({k: [round(v, 2) for v in c] for k, c in clf.centroids_.items()})
print(clf.predict([[2, 2], [7, 9], [5, 4]]))
print(clf.score(X, y))</code></pre>
<pre><code class="lang-text">{'small': [1.33, 1.33], 'big': [8.33, 8.33]}
['small', 'big', 'small']
1.0</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import math

class NearestCentroidClassifier:
    def fit(self, X, y):
        groups = {}
        for row, label in zip(X, y):
            groups.setdefault(label, []).append(row)
        self.centroids_ = {}
        for label, rows in groups.items():
            n_features = len(rows[0])
            self.centroids_[label] = [
                sum(r[j] for r in rows) / len(rows) for j in range(n_features)
            ]
        return self

    def predict(self, X):
        return [
            min(self.centroids_, key=lambda label: math.dist(row, self.centroids_[label]))
            for row in X
        ]

    def score(self, X, y):
        return sum(p == t for p, t in zip(self.predict(X), y)) / len(y)

X = [[1, 1], [2, 1], [1, 2], [8, 8], [9, 8], [8, 9]]
y = ["small", "small", "small", "big", "big", "big"]
clf = NearestCentroidClassifier().fit(X, y)
print({k: [round(v, 2) for v in c] for k, c in clf.centroids_.items()})
print(clf.predict([[2, 2], [7, 9], [5, 4]]))
print(clf.score(X, y))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'small': [1.33, 1.33], 'big': [8.33, 8.33]}
['small', 'big', 'small']
1.0</code></pre>
<p><code>dict.setdefault(label, [])</code> returns the existing list for a label or inserts a new empty one — a handy grouping idiom. The centroid of each group is the per-feature mean. <code>predict</code> uses <code>min</code> over the labels with a lambda key computing distance (<code>math.dist</code> is the standard library's Euclidean distance). The point [5, 4] is about 4.7 from the small centroid and 5.6 from the big one, so it is "small". scikit-learn has this exact model as <code>sklearn.neighbors.NearestCentroid</code>.</p>`
          },
          quiz: [
            { q: "In the estimator pattern, where should learning from data happen?", options: ["__init__", "fit", "predict", "__repr__"], answer: 1, explain: "__init__ only stores hyperparameters; fit learns from X and y; predict uses what was learned." },
            { q: "What does a trailing underscore (e.g. coef_) on an attribute signal?", options: ["It is private", "It was learned during fit and exists only after training", "It is a class attribute", "It is deprecated"], answer: 1, explain: "scikit-learn's convention: attributes estimated from data end with an underscore." },
            { q: "Why does fit return self?", options: ["It is required by Python", "To allow chaining like Model().fit(X, y).predict(X2)", "To copy the model", "To reset the model"], answer: 1, explain: "Returning the instance itself lets you call another method on the result immediately." },
            { q: "What is a hyperparameter?", options: ["A value learned from data during fit", "A setting chosen before training, like k in k-NN", "The model's prediction", "The size of the dataset"], answer: 1, explain: "Hyperparameters configure the learning process and are passed to __init__; parameters are learned." },
            { q: "Why is a majority-class classifier useful?", options: ["It is the most accurate model", "It is a baseline that real models must beat", "It works only on images", "It replaces evaluation"], answer: 1, explain: "If a sophisticated model can't beat 'always predict the most common class', it isn't learning anything useful." }
          ]
        }
      ]
    },
    {
      id: "py-robust",
      title: "Writing Robust Code",
      summary: "Handle errors, read and write files, organise code into modules, use the standard library, and test and debug your programs.",
      lessons: [
        {
          id: "py-robust-exceptions",
          title: "Exceptions, Tracebacks and Error Handling",
          minutes: 50,
          objectives: [
            "Read a traceback and locate the cause of an error",
            "Recognise the common built-in exception types",
            "Handle errors with try/except/else/finally, catching specific exceptions",
            "Raise exceptions (including custom ones) to signal invalid input"
          ],
          body: String.raw`
<h3>When things go wrong</h3>
<p>Programs meet problems: a file is missing, a user types "abc" where a number was expected, an API is down, a dataset row is malformed. When Python cannot continue, it <strong>raises an exception</strong> — an object describing what went wrong. If nothing <em>handles</em> the exception, the program stops and prints a <strong>traceback</strong>. Errors are not failures of you as a programmer; they are information. Robust code expects them and responds sensibly.</p>

<h3>Reading a traceback</h3>
<p>Suppose <code>report.py</code> contains:</p>
<pre><code class="lang-python">def average(values):
    return sum(values) / len(values)

def report(scores):
    print("Average:", average(scores))

report([])</code></pre>
<p>Running it prints:</p>
<pre><code class="lang-text">Traceback (most recent call last):
  File "report.py", line 7, in &lt;module&gt;
    report([])
  File "report.py", line 5, in report
    print("Average:", average(scores))
  File "report.py", line 2, in average
    return sum(values) / len(values)
           ~~~~~~~~~~~~^~~~~~~~~~~~~
ZeroDivisionError: division by zero</code></pre>
<p>How to read it:</p>
<ol>
  <li><strong>Start at the bottom.</strong> The last line names the exception type (<code>ZeroDivisionError</code>) and a message (<code>division by zero</code>). This is <em>what</em> happened.</li>
  <li><strong>Move up for <em>where</em>.</strong> Each "File ..., line N, in name" entry is one step of the <strong>call stack</strong>, the chain of function calls that led to the error. "Most recent call last" means the deepest call is at the bottom: line 2 in <code>average</code>, which was called from line 5 in <code>report</code>, which was called from line 7 at the top level (<code>&lt;module&gt;</code>).</li>
  <li><strong>Find the first line that is your code</strong> (with big libraries, many frames will belong to the library). The bug is usually there or in what you passed to it.</li>
  <li>Newer Python versions underline the exact failing expression with <code>^</code> and <code>~</code> markers.</li>
</ol>
<p>Here the real cause is not line 2 — it's line 7 passing an empty list. Tracebacks show where the program noticed the problem; you still have to think about why.</p>

<h3>Common exception types</h3>
<table>
<thead><tr><th>Exception</th><th>Typical cause</th></tr></thead>
<tbody>
<tr><td><code>SyntaxError</code> / <code>IndentationError</code></td><td>Code is not valid Python (missing colon, bracket, bad indentation). Raised before anything runs.</td></tr>
<tr><td><code>NameError</code></td><td>Using a name that doesn't exist (typo, not yet defined).</td></tr>
<tr><td><code>TypeError</code></td><td>Operation on the wrong type: <code>"a" + 1</code>, calling with wrong number of arguments.</td></tr>
<tr><td><code>ValueError</code></td><td>Right type, bad value: <code>int("abc")</code>.</td></tr>
<tr><td><code>KeyError</code></td><td>Missing dictionary key.</td></tr>
<tr><td><code>IndexError</code></td><td>List/string index out of range.</td></tr>
<tr><td><code>AttributeError</code></td><td>Object has no such attribute/method: <code>None.split()</code>.</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>Dividing by zero.</td></tr>
<tr><td><code>FileNotFoundError</code></td><td>Opening a file that doesn't exist (a kind of <code>OSError</code>).</td></tr>
<tr><td><code>ModuleNotFoundError</code></td><td><code>import</code> of a package that is not installed in the current environment.</td></tr>
</tbody></table>
<div class="callout tip"><strong>AttributeError: 'NoneType' object has no attribute ...</strong> is one of the most common errors in real code. It means a variable you expected to hold an object is actually <code>None</code> — often because a function forgot to <code>return</code>, or you assigned the result of an in-place method like <code>list.sort()</code>.</div>

<h3>Handling exceptions: try / except</h3>
<p>Put code that might fail inside <code>try</code>. If an exception of the named type happens, Python jumps to the matching <code>except</code> block instead of crashing:</p>
<pre><code class="lang-python runnable">raw_values = ["3.5", "7", "n/a", "2.25", ""]
clean = []
for text in raw_values:
    try:
        clean.append(float(text))
    except ValueError:
        print(f"skipping bad value: {text!r}")
print(clean)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">skipping bad value: 'n/a'
skipping bad value: ''
[3.5, 7.0, 2.25]</code></pre>
<p>This is the robust way to parse messy data: just try the conversion and handle failure. Python culture calls this <strong>EAFP</strong> — "Easier to Ask Forgiveness than Permission" — as opposed to checking every possible problem in advance (<strong>LBYL</strong>, "Look Before You Leap"). Both are fine; EAFP is often simpler and handles cases you didn't think of (like "-3.2" or "1e-5").</p>

<h3>Catching specific exceptions and using the error object</h3>
<p>Always catch the <strong>specific</strong> exceptions you expect. <code>except ... as e</code> gives you the exception object, whose message is available via <code>str(e)</code>. You can have several <code>except</code> clauses, or catch several types in one tuple:</p>
<pre><code class="lang-python runnable">def safe_ratio(data, key_a, key_b):
    try:
        return data[key_a] / data[key_b]
    except KeyError as e:
        print("missing key:", e)
    except ZeroDivisionError:
        print("cannot divide by zero")
    except (TypeError, ValueError) as e:
        print("bad data:", type(e).__name__)
    return None

stats = {"correct": 45, "total": 50, "empty": 0, "label": "x"}
print(safe_ratio(stats, "correct", "total"))
safe_ratio(stats, "correct", "count")
safe_ratio(stats, "correct", "empty")
safe_ratio(stats, "label", "total")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.9
missing key: 'count'
cannot divide by zero
bad data: TypeError</code></pre>
<div class="callout warn"><strong>Never use a bare <code>except:</code></strong> (or <code>except Exception:</code> that silently passes). It swallows every error — including typos (<code>NameError</code>) and even Ctrl+C — and hides bugs. If you catch broadly, at least log the error. Catch what you can actually handle.</div>

<h3>else and finally</h3>
<ul>
  <li><code>else</code> runs only if the <code>try</code> block raised <strong>no</strong> exception. Put code there that should run on success but whose own errors you don't want caught by the <code>except</code>.</li>
  <li><code>finally</code> runs <strong>always</strong> — success, handled error, or unhandled error. Use it for clean-up: closing connections, releasing resources, recording timing.</li>
</ul>
<pre><code class="lang-python runnable">def load_number(text):
    try:
        value = int(text)
    except ValueError:
        print(f"  {text!r}: not an integer")
        return None
    else:
        print(f"  {text!r}: parsed OK")
        return value
    finally:
        print("  (finished attempt)")

print(load_number("42"))
print(load_number("forty"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">  '42': parsed OK
  (finished attempt)
42
  'forty': not an integer
  (finished attempt)
None</code></pre>
<p>Notice <code>finally</code> runs even though both branches <code>return</code> — it executes just before the function actually exits.</p>

<h3>Raising exceptions yourself</h3>
<p>Your own functions should complain loudly when given invalid input, rather than silently returning nonsense. Use <code>raise</code> with an appropriate exception type and a clear message:</p>
<pre><code class="lang-python runnable">def set_learning_rate(lr):
    if not isinstance(lr, (int, float)):
        raise TypeError(f"learning rate must be a number, got {type(lr).__name__}")
    if not 0 &lt; lr &lt; 1:
        raise ValueError(f"learning rate must be between 0 and 1, got {lr}")
    return float(lr)

for candidate in [0.01, 5, "fast"]:
    try:
        print("ok:", set_learning_rate(candidate))
    except (TypeError, ValueError) as e:
        print(f"{type(e).__name__}: {e}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">ok: 0.01
ValueError: learning rate must be between 0 and 1, got 5
TypeError: learning rate must be a number, got str</code></pre>
<p>Failing early with a precise message ("fail fast") saves enormous debugging time. A training run that crashes immediately with "learning rate must be between 0 and 1, got 5" is far better than one that runs for three hours and produces garbage.</p>

<h3>Custom exceptions and re-raising</h3>
<p>For your own applications you can define exception types by subclassing <code>Exception</code>. Callers can then catch your specific error. Inside an <code>except</code> block, a bare <code>raise</code> re-raises the current exception after you've done something (like logging); <code>raise NewError(...) from e</code> wraps it with more context.</p>
<pre><code class="lang-python runnable">class DataValidationError(Exception):
    """Raised when an input record fails validation."""

def validate(record):
    if "text" not in record:
        raise DataValidationError(f"record {record.get('id')} has no 'text' field")
    return record

def parse_age(text):
    try:
        return int(text)
    except ValueError as e:
        raise DataValidationError(f"bad age {text!r}") from e

try:
    validate({"id": 7})
except DataValidationError as e:
    print("caught:", e)

try:
    parse_age("old")
except DataValidationError as e:
    print("caught:", e, "| caused by:", type(e.__cause__).__name__)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">caught: record 7 has no 'text' field
caught: bad age 'old' | caused by: ValueError</code></pre>
<p>When you call LLM APIs later, the SDKs raise their own custom exceptions (for example a rate-limit error or an authentication error), and you will catch them precisely like this to retry or show a helpful message.</p>

<h3>A realistic pattern: retry on failure</h3>
<pre><code class="lang-python runnable">attempts_log = []

def flaky_service(attempt):
    """Pretend network call: fails the first two times."""
    attempts_log.append(attempt)
    if attempt &lt; 3:
        raise ConnectionError("service temporarily unavailable")
    return {"answer": 42}

result = None
for attempt in range(1, 6):
    try:
        result = flaky_service(attempt)
    except ConnectionError as e:
        print(f"attempt {attempt} failed: {e}")
        continue
    print(f"attempt {attempt} succeeded")
    break
print(result, attempts_log)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">attempt 1 failed: service temporarily unavailable
attempt 2 failed: service temporarily unavailable
attempt 3 succeeded
{'answer': 42} [1, 2, 3]</code></pre>
<p>Production code would also wait between attempts (with <code>time.sleep</code>, increasing the delay each time — "exponential backoff"), which you'll use when calling rate-limited AI APIs.</p>
`,
          keyPoints: [
            "Read tracebacks bottom-up: the last line gives the exception type and message; the frames above show the call chain.",
            "Common types: TypeError, ValueError, KeyError, IndexError, AttributeError, NameError, FileNotFoundError, ZeroDivisionError.",
            "try/except handles errors; catch specific exceptions and use 'as e' for the message. Never use a bare except.",
            "else runs when no exception occurred; finally always runs (clean-up).",
            "raise ValueError('clear message') to fail fast on bad input; subclass Exception for custom error types."
          ],
          exercise: {
            prompt: String.raw`<p>Write <code>parse_record(line)</code> for lines of the form <code>"name,age,score"</code>. It must return a dict <code>{"name": str, "age": int, "score": float}</code> and raise <code>ValueError</code> with a helpful message when:</p>
<ul>
<li>the line doesn't have exactly 3 fields (message: <code>expected 3 fields, got N</code>),</li>
<li>age or score can't be converted (let the conversion error propagate, but wrap it: <code>bad number in line: ...</code>),</li>
<li>score is outside 0–1 (<code>score out of range: X</code>).</li>
</ul>
<p>Then process these lines, collecting good records and printing an error for each bad one:</p>
<pre><code class="lang-python">lines = ["ana,31,0.9", "ben,abc,0.5", "cy,40", "di,25,1.7", "ed,52,0.65"]</code></pre>
<pre><code class="lang-text">line 2: bad number in line: 'ben,abc,0.5'
line 3: expected 3 fields, got 2
line 4: score out of range: 1.7
valid: ['ana', 'ed']</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">def parse_record(line):
    parts = line.split(",")
    if len(parts) != 3:
        raise ValueError(f"expected 3 fields, got {len(parts)}")
    name, age_text, score_text = parts
    try:
        age = int(age_text)
        score = float(score_text)
    except ValueError as e:
        raise ValueError(f"bad number in line: {line!r}") from e
    if not 0 &lt;= score &lt;= 1:
        raise ValueError(f"score out of range: {score}")
    return {"name": name, "age": age, "score": score}

lines = ["ana,31,0.9", "ben,abc,0.5", "cy,40", "di,25,1.7", "ed,52,0.65"]
valid = []
for number, line in enumerate(lines, start=1):
    try:
        record = parse_record(line)
    except ValueError as e:
        print(f"line {number}: {e}")
    else:
        valid.append(record)

print("valid:", [r["name"] for r in valid])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">line 2: bad number in line: 'ben,abc,0.5'
line 3: expected 3 fields, got 2
line 4: score out of range: 1.7
valid: ['ana', 'ed']</code></pre>
<p>The parsing function only <em>detects</em> problems and raises; the caller decides what to do (here: report and skip). That separation keeps <code>parse_record</code> reusable — a different caller might stop at the first error instead. Using <code>else</code> ensures only successfully parsed records are appended. In a data pipeline you would also count rejected rows; a sudden jump in rejects is an early warning that the input format changed.</p>`
          },
          quiz: [
            { q: "Where should you look first in a traceback?", options: ["The first line", "The last line, which names the exception and message", "The middle frame", "The line numbers only"], answer: 1, explain: "The bottom line tells you what happened; the frames above (most recent last) tell you where." },
            { q: "int(\"twelve\") raises which exception?", options: ["TypeError", "ValueError", "KeyError", "NameError"], answer: 1, explain: "The argument is the right type (str) but its value can't be converted, so ValueError." },
            { q: "When does a finally block run?", options: ["Only when an exception occurs", "Only when no exception occurs", "Always, whether or not an exception occurred", "Never if there is a return"], answer: 2, explain: "finally always runs, even when the try or except block returns - ideal for clean-up." },
            { q: "Why is a bare except: considered bad practice?", options: ["It is slower", "It catches everything, hiding bugs like typos and even Ctrl+C", "It is a SyntaxError", "It only catches ValueError"], answer: 1, explain: "Catch specific exceptions you can handle; catching everything silently masks real problems." },
            { q: "What does raise ValueError(\"lr must be positive\") do?", options: ["Prints a warning and continues", "Creates and throws an exception that stops execution unless caught", "Returns the string", "Logs to a file"], answer: 1, explain: "raise signals an error; it propagates up the call stack until an except handles it or the program stops." }
          ]
        },
        {
          id: "py-robust-files",
          title: "Working with Files: Text, CSV, JSON and pathlib",
          minutes: 55,
          objectives: [
            "Read and write text files safely with open() and the with statement",
            "Build and inspect file paths with pathlib",
            "Read and write CSV files with csv.reader, csv.DictReader and csv.DictWriter",
            "Save and load structured data with json, including JSON Lines"
          ],
          body: String.raw`
<h3>Why files matter</h3>
<p>Data lives in files: training sets as CSV, configurations and API responses as JSON, logs and documents as plain text, and trained models as binary files. Reading and writing files is the bridge between your program and the outside world. (Each example below creates the files it reads, so you can run them in an empty folder.)</p>

<h3>Opening files with with</h3>
<p><code>open(path, mode)</code> returns a <strong>file object</strong>. The <code>with</code> statement opens the file and guarantees it is <strong>closed automatically</strong> when the block ends — even if an error occurs. Always use it.</p>
<pre><code class="lang-python runnable">with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("first line\n")
    f.write("second line\n")

with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()

print(content)
print(repr(content))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">first line
second line

'first line\nsecond line\n'</code></pre>
<p>Notes:</p>
<ul>
  <li><code>write</code> does <em>not</em> add a newline; include <code>\n</code> yourself.</li>
  <li>Always pass <code>encoding="utf-8"</code> for text. <strong>Encoding</strong> is how characters are turned into bytes; UTF-8 handles every language and emoji. Without it, Windows may use a different default, and files with "é" or "日本" can break.</li>
  <li>The <code>repr</code> shows the hidden <code>\n</code> characters — useful when debugging text.</li>
</ul>
<table>
<thead><tr><th>Mode</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>"r"</code></td><td>read (default); error if the file doesn't exist</td></tr>
<tr><td><code>"w"</code></td><td>write; <strong>creates or completely overwrites</strong> the file</td></tr>
<tr><td><code>"a"</code></td><td>append to the end; creates if missing</td></tr>
<tr><td><code>"x"</code></td><td>create; error if the file already exists</td></tr>
<tr><td><code>"rb"</code> / <code>"wb"</code></td><td>binary read/write (images, model weights) — no encoding</td></tr>
</tbody></table>
<div class="callout warn"><strong>"w" erases the file instantly</strong> when opened, before you write anything. Opening your only copy of a dataset with <code>"w"</code> by mistake destroys it. Use <code>"a"</code> to add, <code>"x"</code> to be safe.</div>

<h3>Reading line by line</h3>
<p>For large files (logs, big text corpora), don't read everything at once. Iterating over the file object yields one line at a time, using very little memory:</p>
<pre><code class="lang-python runnable">with open("log.txt", "w", encoding="utf-8") as f:
    f.write("INFO start\nERROR disk full\nINFO retry\nERROR timeout\n")

errors = []
with open("log.txt", encoding="utf-8") as f:
    for line_number, line in enumerate(f, start=1):
        line = line.rstrip("\n")          # remove the trailing newline
        if line.startswith("ERROR"):
            errors.append((line_number, line))
print(errors)

with open("log.txt", "a", encoding="utf-8") as f:   # append mode
    f.write("INFO done\n")
with open("log.txt", encoding="utf-8") as f:
    print(len(f.readlines()), "lines now")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[(2, 'ERROR disk full'), (4, 'ERROR timeout')]
5 lines now</code></pre>

<h3>pathlib: paths as objects</h3>
<p>File paths differ between operating systems (<code>C:\data\train.csv</code> on Windows, <code>/home/ada/data/train.csv</code> on Linux). The modern <code>pathlib</code> module represents paths as <code>Path</code> objects that handle these differences. The <code>/</code> operator joins path parts:</p>
<pre><code class="lang-python runnable">from pathlib import Path

data_dir = Path("data")
data_dir.mkdir(exist_ok=True)              # create folder (no error if exists)

train_file = data_dir / "train.csv"        # joins with the right separator
train_file.write_text("x,y\n1,2\n", encoding="utf-8")   # quick write

print(train_file.name)      # file name
print(train_file.stem)      # name without extension
print(train_file.suffix)    # extension
print(train_file.parent)    # folder
print(train_file.exists(), (data_dir / "missing.csv").exists())
print(train_file.read_text(encoding="utf-8").splitlines())

(data_dir / "test.csv").write_text("x,y\n", encoding="utf-8")
print(sorted(p.name for p in data_dir.glob("*.csv")))   # find files by pattern</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">train.csv
train
.csv
data
True False
['x,y', '1,2']
['test.csv', 'train.csv']</code></pre>
<p><strong>Relative paths</strong> like <code>Path("data")</code> are relative to the <em>current working directory</em> — the folder your terminal is in when you run Python, which is not necessarily where the script lives. A common trick for scripts is <code>Path(__file__).parent / "data"</code>, which is always next to the script file. <code>Path.home()</code> gives your home folder and <code>Path.cwd()</code> the current directory.</p>

<h3>CSV files</h3>
<p><strong>CSV</strong> (comma-separated values) is the simplest table format: one row per line, columns separated by commas, usually with a header row. You could split lines on commas yourself, but real CSVs contain quoted fields with commas inside (<code>"Smith, John"</code>), so use the <code>csv</code> module:</p>
<pre><code class="lang-python runnable">import csv

rows = [
    ["name", "city", "score"],
    ["Ana", "Lisbon", 0.91],
    ["Smith, John", "New York", 0.78],     # comma inside a field
]
with open("people.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

with open("people.csv", encoding="utf-8") as f:
    print(f.read())

with open("people.csv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)                  # first row
    for row in reader:
        print(row)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">name,city,score
Ana,Lisbon,0.91
"Smith, John",New York,0.78

['Ana', 'Lisbon', '0.91']
['Smith, John', 'New York', '0.78']</code></pre>
<p>Two things to notice: the writer automatically <strong>quoted</strong> the field containing a comma, and the reader returns <strong>every value as a string</strong> — <code>'0.91'</code>, not <code>0.91</code>. Convert numbers yourself. (Pass <code>newline=""</code> when opening CSV files, as the csv documentation recommends, to avoid blank lines on Windows.)</p>
<p><code>DictReader</code> and <code>DictWriter</code> use the header to give you each row as a dictionary — more readable and robust to column order:</p>
<pre><code class="lang-python runnable">import csv

with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["model", "accuracy"])
    writer.writeheader()
    writer.writerow({"model": "logreg", "accuracy": 0.83})
    writer.writerow({"model": "forest", "accuracy": 0.89})

with open("scores.csv", newline="", encoding="utf-8") as f:
    records = list(csv.DictReader(f))

print(records)
best = max(records, key=lambda r: float(r["accuracy"]))
print("best:", best["model"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[{'model': 'logreg', 'accuracy': '0.83'}, {'model': 'forest', 'accuracy': '0.89'}]
best: forest</code></pre>
<p>For serious analysis you will soon use <code>pandas.read_csv</code>, which converts types automatically, but the <code>csv</code> module is perfect for simple scripts and has no dependencies.</p>

<h3>JSON files</h3>
<p>You met <code>json.dumps</code>/<code>json.loads</code> for strings. For files, use <code>json.dump(obj, file)</code> and <code>json.load(file)</code> (no "s"). JSON preserves types (numbers, booleans, nesting), which makes it ideal for configs, experiment results and API data.</p>
<pre><code class="lang-python runnable">import json
from pathlib import Path

results = {
    "experiment": "baseline",
    "params": {"lr": 0.01, "epochs": 5},
    "metrics": {"accuracy": 0.87, "f1": 0.84},
    "tags": ["v1", "cpu"],
    "finished": True,
}
path = Path("results.json")
with path.open("w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

with path.open(encoding="utf-8") as f:
    loaded = json.load(f)

print(loaded["metrics"]["accuracy"], type(loaded["params"]["epochs"]).__name__)
print(loaded == results)
print(path.read_text(encoding="utf-8")[:40])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.87 int
True
{
  "experiment": "baseline",
  "params"</code></pre>
<p>Not everything can be stored in JSON: sets, tuples (they become lists), dates and custom objects need converting first. Dataclasses can be converted with <code>dataclasses.asdict()</code>.</p>

<h3>JSON Lines: one record per line</h3>
<p>For datasets with many records — chat transcripts, fine-tuning data for LLMs, logs — the common format is <strong>JSON Lines</strong> (<code>.jsonl</code>): each line is one complete JSON object. You can append records one at a time and read huge files line by line. OpenAI's fine-tuning and batch APIs use exactly this format.</p>
<pre><code class="lang-python runnable">import json

examples = [
    {"prompt": "Translate 'cat' to French", "completion": "chat"},
    {"prompt": "Translate 'dog' to French", "completion": "chien"},
]
with open("train.jsonl", "w", encoding="utf-8") as f:
    for ex in examples:
        f.write(json.dumps(ex) + "\n")

with open("train.jsonl", encoding="utf-8") as f:
    loaded = [json.loads(line) for line in f if line.strip()]

print(len(loaded), loaded[1]["completion"])</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">2 chien</code></pre>

<h3>Handling missing files</h3>
<pre><code class="lang-python runnable">import json
from pathlib import Path

def load_config(path, defaults):
    try:
        with open(path, encoding="utf-8") as f:
            return defaults | json.load(f)
    except FileNotFoundError:
        print(f"{path} not found, using defaults")
        return defaults

print(load_config("config.json", {"lr": 0.001, "epochs": 10}))
Path("config.json").write_text('{"epochs": 3}', encoding="utf-8")
print(load_config("config.json", {"lr": 0.001, "epochs": 10}))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">config.json not found, using defaults
{'lr': 0.001, 'epochs': 10}
{'lr': 0.001, 'epochs': 3}</code></pre>
<div class="callout warn"><strong>Common mistakes:</strong> forgetting <code>encoding="utf-8"</code>; opening with <code>"w"</code> when you meant <code>"a"</code>; forgetting that CSV values are strings; relative paths that break because you ran the script from another folder; and Windows paths in normal strings (<code>"C:\new"</code> contains a newline escape — use <code>Path</code>, forward slashes or raw strings).</div>
`,
          keyPoints: [
            "Use 'with open(path, mode, encoding=\"utf-8\") as f:' so files always close; 'w' overwrites, 'a' appends.",
            "Iterate over a file object to process it line by line with little memory.",
            "pathlib.Path joins paths with /, and offers .exists(), .mkdir(), .glob(), .read_text(), .suffix, .stem.",
            "csv.reader/DictReader return strings - convert numbers yourself; open CSVs with newline=\"\".",
            "json.dump/json.load handle files; JSON Lines (.jsonl) stores one JSON record per line, common for LLM datasets."
          ],
          exercise: {
            prompt: String.raw`<p>Write a small pipeline that:</p>
<ol>
<li>Creates a folder <code>exp</code> and writes this CSV to <code>exp/runs.csv</code> using <code>csv.writer</code>:
<pre><code class="lang-text">run,lr,accuracy
r1,0.1,0.81
r2,0.01,0.88
r3,0.001,0.85</code></pre></li>
<li>Reads it back with <code>DictReader</code>, converting <code>lr</code> and <code>accuracy</code> to floats.</li>
<li>Writes a summary JSON to <code>exp/summary.json</code> with keys <code>n_runs</code>, <code>best_run</code>, <code>best_accuracy</code>, <code>mean_accuracy</code> (rounded to 3 decimals).</li>
<li>Loads the JSON and prints it, then prints the names of all files in <code>exp</code> sorted.</li>
</ol>
<pre><code class="lang-text">{'n_runs': 3, 'best_run': 'r2', 'best_accuracy': 0.88, 'mean_accuracy': 0.847}
['runs.csv', 'summary.json']</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import csv
import json
from pathlib import Path

folder = Path("exp")
folder.mkdir(exist_ok=True)
csv_path = folder / "runs.csv"

with csv_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["run", "lr", "accuracy"])
    writer.writerows([["r1", 0.1, 0.81], ["r2", 0.01, 0.88], ["r3", 0.001, 0.85]])

runs = []
with csv_path.open(newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        runs.append({"run": row["run"], "lr": float(row["lr"]), "accuracy": float(row["accuracy"])})

best = max(runs, key=lambda r: r["accuracy"])
summary = {
    "n_runs": len(runs),
    "best_run": best["run"],
    "best_accuracy": best["accuracy"],
    "mean_accuracy": round(sum(r["accuracy"] for r in runs) / len(runs), 3),
}
with (folder / "summary.json").open("w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)

with (folder / "summary.json").open(encoding="utf-8") as f:
    print(json.load(f))
print(sorted(p.name for p in folder.iterdir()))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'n_runs': 3, 'best_run': 'r2', 'best_accuracy': 0.88, 'mean_accuracy': 0.847}
['runs.csv', 'summary.json']</code></pre>
<p><code>Path.open()</code> works like <code>open()</code>. The CSV round trip turns numbers into strings, so the reader converts them back with <code>float()</code>. JSON keeps the types, so the loaded summary has real numbers. <code>iterdir()</code> lists everything in a folder. This CSV-in, JSON-summary-out shape is typical of experiment tracking scripts.</p>`
          },
          quiz: [
            { q: "Why use 'with open(...) as f:'?", options: ["It makes reading faster", "It guarantees the file is closed when the block ends, even on errors", "It is required for binary files only", "It encrypts the file"], answer: 1, explain: "The with statement handles closing automatically, preventing leaked file handles and unflushed writes." },
            { q: "What does opening an existing file with mode \"w\" do?", options: ["Appends to it", "Erases its contents immediately", "Raises an error", "Opens it read-only"], answer: 1, explain: "\"w\" truncates (empties) the file on open. Use \"a\" to append or \"x\" to refuse overwriting." },
            { q: "csv.DictReader gives you a row {'score': '0.9'}. What type is the value?", options: ["float", "str", "int", "Decimal"], answer: 1, explain: "The csv module returns all values as strings; convert with float()." },
            { q: "Path(\"data\") / \"train.csv\" produces:", options: ["A division error", "A Path for data/train.csv using the OS's separator", "The string \"data/train.csv\" only on Linux", "The file contents"], answer: 1, explain: "pathlib overloads / to join path components portably." },
            { q: "What is JSON Lines (.jsonl)?", options: ["JSON with comments", "One JSON object per line, ideal for large record collections", "A compressed JSON format", "JSON converted to CSV"], answer: 1, explain: "Each line is a separate JSON document, so you can append and stream records - common for LLM fine-tuning data." }
          ]
        },
        {
          id: "py-robust-modules",
          title: "Modules, Packages, Imports and the Standard Library",
          minutes: 50,
          objectives: [
            "Import modules in different ways and explain what import actually does",
            "Split your own code into modules and packages, using if __name__ == \"__main__\"",
            "Understand how Python finds modules and fix ModuleNotFoundError",
            "Use key standard-library modules: math, random, datetime, collections, statistics, os and sys"
          ],
          body: String.raw`
<h3>What a module is</h3>
<p>A <strong>module</strong> is simply a <code>.py</code> file whose functions, classes and variables can be used from other files. A <strong>package</strong> is a folder of modules. Splitting code across modules keeps each file focused (data loading here, model code there) and lets you reuse code across projects. Everything you install with pip — NumPy, pandas, PyTorch — is a package.</p>

<h3>Import styles</h3>
<pre><code class="lang-python runnable">import math                          # import the module; use math.sqrt
print(math.sqrt(25))

from math import pi, floor           # import specific names
print(floor(pi))

import statistics as stats           # alias: shorter name
print(stats.mean([1, 2, 3, 4]))

from collections import Counter as C # alias for a single name
print(C("hello").most_common(1))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">5.0
3
2.5
[('l', 2)]</code></pre>
<p>Some aliases are universal conventions that you'll see in every data-science tutorial: <code>import numpy as np</code>, <code>import pandas as pd</code>, <code>import matplotlib.pyplot as plt</code>. Avoid <code>from module import *</code> — it dumps every name into your file, making it unclear where things came from and risking name clashes.</p>
<p>When you <code>import</code> a module, Python finds the file, runs it once from top to bottom, and stores the resulting module object. Importing the same module again (anywhere in the program) reuses that stored object rather than running the file again.</p>

<h3>Writing your own module</h3>
<p>Say your project has two files in the same folder:</p>
<pre><code class="lang-text">project/
├── metrics.py
└── main.py</code></pre>
<pre><code class="lang-python"># metrics.py
"""Evaluation metrics for classification."""

def accuracy(preds, labels):
    return sum(p == y for p, y in zip(preds, labels)) / len(labels)

def error_rate(preds, labels):
    return 1 - accuracy(preds, labels)</code></pre>
<pre><code class="lang-python"># main.py
from metrics import accuracy, error_rate

preds, labels = [1, 0, 1, 1], [1, 1, 1, 0]
print(accuracy(preds, labels), error_rate(preds, labels))</code></pre>
<p>Running <code>python main.py</code> prints <code>0.5 0.5</code>. The runnable version below creates <code>metrics.py</code> itself and then imports it (the <code>sys.path</code> line is only needed because this example is executed from a temporary location — normally the script's own folder is searched automatically):</p>
<pre><code class="lang-python runnable">import sys
from pathlib import Path

Path("metrics.py").write_text('''
def accuracy(preds, labels):
    return sum(p == y for p, y in zip(preds, labels)) / len(labels)

def error_rate(preds, labels):
    return 1 - accuracy(preds, labels)
''', encoding="utf-8")

sys.path.insert(0, str(Path.cwd()))     # let Python find modules in this folder
from metrics import accuracy, error_rate

preds, labels = [1, 0, 1, 1], [1, 1, 1, 0]
print(accuracy(preds, labels), error_rate(preds, labels))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.5 0.5</code></pre>

<h3>if __name__ == "__main__"</h3>
<p>Every module has a built-in variable <code>__name__</code>. When a file is run directly (<code>python metrics.py</code>), <code>__name__</code> is <code>"__main__"</code>. When it is imported, <code>__name__</code> is the module's name (<code>"metrics"</code>). This lets a file act both as an importable library and as a runnable script:</p>
<pre><code class="lang-python"># metrics.py
def accuracy(preds, labels):
    return sum(p == y for p, y in zip(preds, labels)) / len(labels)

if __name__ == "__main__":
    # runs only with "python metrics.py", NOT on "import metrics"
    print("quick self-check:", accuracy([1, 1], [1, 0]))</code></pre>
<p>Without that guard, the self-check would run every time someone imports your module. You will see this idiom at the bottom of nearly every Python script, often calling a <code>main()</code> function.</p>

<h3>Packages</h3>
<p>Group related modules in a folder. An <code>__init__.py</code> file (often empty) marks the folder as a regular package and runs when the package is imported:</p>
<pre><code class="lang-text">sentiment_app/
├── main.py
└── sentiment/
    ├── __init__.py
    ├── preprocessing.py     (def clean(text): ...)
    └── model.py             (class SentimentModel: ...)</code></pre>
<pre><code class="lang-python"># main.py
from sentiment.preprocessing import clean
from sentiment.model import SentimentModel
import sentiment.preprocessing as prep    # also fine</code></pre>
<p>Inside the package, modules can import each other with <strong>relative imports</strong>: in <code>model.py</code>, <code>from .preprocessing import clean</code> (the dot means "this package"). Dotted names like <code>sklearn.linear_model</code> or <code>torch.nn.functional</code> are exactly this structure: packages inside packages.</p>

<h3>How Python finds modules (and ModuleNotFoundError)</h3>
<p>On <code>import x</code>, Python searches the folders listed in <code>sys.path</code>, in order: the folder of the script being run, then the standard library, then the <code>site-packages</code> folder of the <em>current environment</em> (where pip installs packages). <code>ModuleNotFoundError: No module named 'x'</code> means none of them had it. The usual causes:</p>
<ul>
  <li>The package isn't installed in the environment you're running — activate the right venv or <code>python -m pip install x</code>.</li>
  <li>The install name differs from the import name: <code>pip install scikit-learn</code> but <code>import sklearn</code>; <code>pip install pillow</code> but <code>import PIL</code>; <code>pip install python-dotenv</code> but <code>import dotenv</code>.</li>
  <li>You ran the script from a different folder, so your own module isn't on the path.</li>
  <li><strong>You named your file after a library</strong>. A file called <code>random.py</code>, <code>json.py</code> or <code>openai.py</code> in your folder <em>shadows</em> the real module — Python imports your file instead and strange errors follow. Never name scripts after packages.</li>
</ul>

<h3>A tour of the standard library</h3>
<p>Python's "batteries included" standard library covers a huge range of tasks without installing anything. The most useful modules for AI/data work:</p>
<h4>math and statistics</h4>
<pre><code class="lang-python runnable">import math
import statistics

latencies = [120, 135, 128, 410, 131]
print(statistics.mean(latencies), statistics.median(latencies))
print(round(statistics.stdev(latencies), 1))
print(math.isclose(0.1 + 0.2, 0.3), math.inf &gt; 1e308, math.log2(1024))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">184.8 131
126.0
True True 10.0</code></pre>
<p>Notice how the single slow request (410) drags the mean far above the median — the reason latency is often reported as a median or percentile.</p>

<h4>random — and reproducibility</h4>
<p>Machine learning uses randomness everywhere: shuffling data, initialising weights, sampling. Computers generate <strong>pseudo-random</strong> numbers from a starting value called a <strong>seed</strong>. The same seed always produces the same sequence, which makes experiments <strong>reproducible</strong>:</p>
<pre><code class="lang-python runnable">import random

random.seed(42)                        # fix the seed for reproducibility
print(random.random())                 # float in [0, 1)
print(random.randint(1, 6))            # integer 1..6 inclusive
data = list(range(10))
random.shuffle(data)                   # shuffle in place
print(data)
print(random.sample(data, 3))          # 3 distinct items
print(random.choice(["cat", "dog"]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">0.6394267984578837
1
[7, 6, 2, 9, 0, 5, 1, 8, 3, 4]
[7, 4, 6]
cat</code></pre>
<p>Run it again and you get identical results. Remove the <code>seed</code> line and the output changes each run. In ML projects you'll set seeds for <code>random</code>, NumPy and PyTorch at the start of training.</p>

<h4>datetime</h4>
<pre><code class="lang-python runnable">from datetime import datetime, date, timedelta

start = datetime(2024, 3, 1, 9, 30)
end = datetime(2024, 3, 3, 15, 45)
duration = end - start                     # a timedelta
print(duration, "|", duration.total_seconds() / 3600, "hours")
print(start + timedelta(days=7))
print(start.strftime("%Y-%m-%d %H:%M"))    # format as text
print(datetime.strptime("2024-12-25", "%Y-%m-%d").date())  # parse text
print(date(2024, 3, 1).weekday())          # Monday = 0</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">2 days, 6:15:00 | 54.25 hours
2024-03-08 09:30:00
2024-03-01 09:30
2024-12-25
4</code></pre>
<p><code>datetime.now()</code> gives the current time (useful for timestamps in logs and file names). Dates show up constantly in data: splitting time-series data, computing "days since last purchase" features, and timestamping model versions.</p>

<h4>collections</h4>
<pre><code class="lang-python runnable">from collections import Counter, defaultdict, deque

words = "the cat and the hat and the bat".split()
counts = Counter(words)                    # counting in one line
print(counts.most_common(2))
print(counts["the"], counts["dog"])        # missing keys count as 0

by_letter = defaultdict(list)              # missing keys get a default []
for w in words:
    by_letter[w[0]].append(w)
print(dict(by_letter))

recent = deque(maxlen=3)                   # keeps only the last 3 items
for loss in [0.9, 0.8, 0.7, 0.6, 0.5]:
    recent.append(loss)
print(list(recent), sum(recent) / len(recent))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[('the', 3), ('and', 2)]
3 0
{'t': ['the', 'the', 'the'], 'c': ['cat'], 'a': ['and', 'and'], 'h': ['hat'], 'b': ['bat']}
[0.7, 0.6, 0.5] 0.6</code></pre>
<p><code>Counter</code> replaces the manual counting loop; <code>defaultdict</code> removes the "is the key there yet?" check when grouping; and a <code>deque</code> with <code>maxlen</code> is a perfect moving window (e.g. the average of the last N losses, or the last N chat messages kept as context for an LLM).</p>

<h4>os and sys</h4>
<pre><code class="lang-python runnable">import os
import sys

print(sys.version_info &gt;= (3, 10))              # check Python version
print(os.environ.get("MY_APP_MODE", "development"))   # read an env variable
print(os.path.join("data", "raw", "file.csv").replace(os.sep, "/"))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">True
development
data/raw/file.csv</code></pre>
<p><code>os.environ</code> holds <strong>environment variables</strong> — settings provided by the operating system or terminal. This is how you'll supply API keys to AI applications without writing them in your code (covered in the command-line lesson). Other notable modules: <code>time</code> (timing and sleeping), <code>itertools</code> (combinations and products for grid searches), <code>functools</code>, <code>logging</code>, <code>subprocess</code>, <code>argparse</code> (command-line options), <code>sqlite3</code> (a built-in database) and <code>urllib</code>.</p>
`,
          keyPoints: [
            "A module is a .py file; a package is a folder of modules (with __init__.py). import runs the file once and caches it.",
            "import x, from x import y, and import x as alias are the main forms; avoid import *.",
            "if __name__ == \"__main__\": code runs only when the file is executed directly, not when imported.",
            "ModuleNotFoundError usually means the wrong environment, a different install name (scikit-learn vs sklearn), or a file shadowing the library name.",
            "Standard library highlights: math, statistics, random (seed for reproducibility), datetime, collections (Counter, defaultdict, deque), os, sys."
          ],
          exercise: {
            prompt: String.raw`<p>Using only the standard library, simulate and analyse a tiny chatbot log:</p>
<ol>
<li>Seed <code>random</code> with 7. Generate 20 events, each a dict with <code>"intent"</code> chosen randomly from <code>["greeting", "billing", "tech", "billing", "tech", "tech"]</code> (the repetition makes some intents more likely) and <code>"latency_ms"</code> = <code>random.randint(80, 400)</code>.</li>
<li>Use <code>Counter</code> to print the intents sorted by count (most common first).</li>
<li>Use <code>defaultdict(list)</code> to group latencies by intent, and print each intent's median latency (via <code>statistics.median</code>), in alphabetical order.</li>
</ol>
<p>Because of the seed, your output will match the solution exactly when run with Python 3.12.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import random
import statistics
from collections import Counter, defaultdict

random.seed(7)
choices = ["greeting", "billing", "tech", "billing", "tech", "tech"]
events = [
    {"intent": random.choice(choices), "latency_ms": random.randint(80, 400)}
    for _ in range(20)
]

counts = Counter(e["intent"] for e in events)
print(counts.most_common())

latencies = defaultdict(list)
for e in events:
    latencies[e["intent"]].append(e["latency_ms"])

for intent in sorted(latencies):
    print(intent, statistics.median(latencies[intent]))</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">[('greeting', 8), ('tech', 6), ('billing', 6)]
billing 190.5
greeting 310.5
tech 150.0</code></pre>
<p>The seed makes the "random" events identical on every run, so results can be compared and debugged. <code>Counter</code> accepts any iterable (here a generator of intents). <code>defaultdict(list)</code> creates an empty list the first time each intent appears. With an even number of values the median is the average of the middle two, hence 190.5. Notice that "greeting" came out most frequent even though it is the <em>least</em> likely choice (1 in 6): with only 20 samples, chance variation is large — a useful reminder never to trust statistics from tiny samples. The underscore in <code>for _ in range(20)</code> signals the loop variable isn't used.</p>`
          },
          quiz: [
            { q: "You ran pip install scikit-learn. Which import is correct?", options: ["import scikit-learn", "import scikit_learn", "import sklearn", "from pip import sklearn"], answer: 2, explain: "The distribution name on PyPI is scikit-learn but the importable package is sklearn." },
            { q: "What is __name__ when a file is executed with python file.py?", options: ["\"file\"", "\"__main__\"", "None", "\"file.py\""], answer: 1, explain: "The directly executed script gets __name__ == \"__main__\"; imported modules get their module name." },
            { q: "Your script named random.py does import random and random.randint fails. Why?", options: ["random is not in the standard library", "Your file shadows the real random module, so Python imports your file", "randint was removed", "You need pip install random"], answer: 1, explain: "The script's folder is searched first, so a file named like a library hides it. Rename your file." },
            { q: "Why call random.seed(42) in an experiment?", options: ["To make the random numbers more random", "To make the sequence of random numbers reproducible", "To speed up random", "To encrypt data"], answer: 1, explain: "The same seed produces the same pseudo-random sequence, so experiments can be repeated exactly." },
            { q: "Which collections tool counts items in one line?", options: ["deque", "defaultdict", "Counter", "namedtuple"], answer: 2, explain: "Counter(iterable) builds a dict-like count of each item, with most_common() for ranking." }
          ]
        },
        {
          id: "py-robust-testing",
          title: "Testing with assert and pytest, and Debugging Techniques",
          minutes: 50,
          objectives: [
            "Use assert to check assumptions and write simple test functions",
            "Write and run pytest tests, including pytest.raises and parametrize",
            "Debug systematically: reproduce, isolate, inspect, fix, and add a test",
            "Use print/f-string debugging, logging, breakpoint() and the VS Code debugger"
          ],
          body: String.raw`
<h3>Why test?</h3>
<p>Every time you change code, you might break something that used to work. Checking by hand ("run it and look at the output") does not scale. <strong>Automated tests</strong> are small pieces of code that call your functions with known inputs and check the outputs. Run them after every change and you instantly know whether you broke something. In ML projects, tests catch the silent bugs that are otherwise invisible: a metric computed wrong, a preprocessing step that drops rows, labels shuffled out of alignment with inputs.</p>

<h3>assert</h3>
<p>The <code>assert</code> statement checks that a condition is True. If it is, nothing happens. If not, Python raises an <code>AssertionError</code> with an optional message:</p>
<pre><code class="lang-python runnable">def accuracy(preds, labels):
    assert len(preds) == len(labels), "preds and labels must be the same length"
    return sum(p == y for p, y in zip(preds, labels)) / len(labels)

assert accuracy([1, 0, 1], [1, 0, 0]) == 2 / 3
assert accuracy([1, 1], [1, 1]) == 1.0
print("all checks passed")

try:
    accuracy([1, 0], [1])
except AssertionError as e:
    print("AssertionError:", e)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">all checks passed
AssertionError: preds and labels must be the same length</code></pre>
<p>Use <code>assert</code> for two things: in <strong>tests</strong>, and inside code to check <strong>internal assumptions</strong> that should never be false if your program is correct ("this list should never be empty here"). Do <em>not</em> use it to validate user input or external data: assertions can be disabled with <code>python -O</code>. For input validation, <code>raise ValueError</code>.</p>

<h3>Test functions</h3>
<p>Group checks into functions whose names start with <code>test_</code>. Each tests one behaviour, including <strong>edge cases</strong> — empty inputs, zeros, boundaries, weird text:</p>
<pre><code class="lang-python runnable">import math

def normalise(values):
    """Scale values to the 0-1 range (min-max). Constant input maps to all zeros."""
    lo, hi = min(values), max(values)
    if hi == lo:
        return [0.0 for _ in values]
    return [(v - lo) / (hi - lo) for v in values]

def test_basic_range():
    assert normalise([10, 20, 30]) == [0.0, 0.5, 1.0]

def test_constant_input():
    assert normalise([5, 5, 5]) == [0.0, 0.0, 0.0]

def test_floats_close():
    result = normalise([0.1, 0.2, 0.3])
    assert math.isclose(result[1], 0.5)       # never == for floats

for test in [test_basic_range, test_constant_input, test_floats_close]:
    test()
    print("PASS", test.__name__)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">PASS test_basic_range
PASS test_constant_input
PASS test_floats_close</code></pre>
<p>Notice <code>test_floats_close</code> uses <code>math.isclose</code>: <code>normalise([0.1, 0.2, 0.3])[1]</code> is not exactly 0.5 because of floating-point error, so <code>==</code> would fail even though the code is correct.</p>

<h3>pytest</h3>
<p>Running tests by hand in a loop works, but the standard tool is <strong>pytest</strong> (<code>pip install pytest</code>). Put tests in files named <code>test_*.py</code>, write plain <code>test_</code> functions with <code>assert</code>, and run <code>pytest</code> in the terminal. pytest finds the tests, runs them all, and prints a detailed report of any failure, showing the values involved.</p>
<pre><code class="lang-text">project/
├── textutils.py
└── tests/
    └── test_textutils.py</code></pre>
<pre><code class="lang-python"># textutils.py
def word_count(text: str) -&gt; int:
    return len(text.split())

def safe_divide(a: float, b: float) -&gt; float:
    if b == 0:
        raise ValueError("b must not be zero")
    return a / b</code></pre>
<pre><code class="lang-python"># tests/test_textutils.py
import pytest
from textutils import word_count, safe_divide

def test_word_count_simple():
    assert word_count("hello big world") == 3

def test_word_count_empty():
    assert word_count("") == 0

@pytest.mark.parametrize("text, expected", [
    ("one", 1),
    ("  spaced   out  ", 2),
    ("tabs\tand\nnewlines", 3),
])
def test_word_count_many(text, expected):
    assert word_count(text) == expected

def test_safe_divide_by_zero():
    with pytest.raises(ValueError):
        safe_divide(1, 0)</code></pre>
<pre><code class="lang-bash">pytest -q            # run all tests quietly
pytest -v            # verbose: one line per test
pytest -k divide     # only tests whose name contains "divide"</code></pre>
<p>Two key features shown above:</p>
<ul>
  <li><code>@pytest.mark.parametrize</code> runs the same test with several input/expected pairs — each counts as a separate test.</li>
  <li><code>with pytest.raises(ValueError):</code> passes only if the code inside raises that exception, which is how you test error handling.</li>
</ul>
<p>The runnable example below writes both files and runs pytest from Python, printing just the summary result:</p>
<pre><code class="lang-python runnable">import subprocess
import sys
from pathlib import Path

Path("textutils.py").write_text('''
def word_count(text):
    return len(text.split())

def safe_divide(a, b):
    if b == 0:
        raise ValueError("b must not be zero")
    return a / b
''', encoding="utf-8")

Path("test_textutils.py").write_text('''
import pytest
from textutils import word_count, safe_divide

def test_word_count_simple():
    assert word_count("hello big world") == 3

@pytest.mark.parametrize("text, expected", [("one", 1), ("  a  b ", 2), ("", 0)])
def test_word_count_many(text, expected):
    assert word_count(text) == expected

def test_safe_divide_by_zero():
    with pytest.raises(ValueError):
        safe_divide(1, 0)
''', encoding="utf-8")

result = subprocess.run([sys.executable, "-m", "pytest", "-q", "-p", "no:cacheprovider"],
                        capture_output=True, text=True)
summary = result.stdout.strip().splitlines()[-1]
print(summary.split(" in ")[0])         # drop the timing, which varies
print("exit code:", result.returncode)  # 0 means all tests passed</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">5 passed
exit code: 0</code></pre>
<p>When a test fails, pytest shows exactly what was compared, for example <code>assert 2 == 3</code> with <code>where 2 = word_count('hello world')</code>. A non-zero exit code is what continuous-integration systems (like GitHub Actions) use to block broken code from being merged.</p>

<h3>Debugging: a systematic process</h3>
<p>A <strong>bug</strong> is any difference between what the code does and what you intended. Random poking wastes hours; follow a process:</p>
<ol>
  <li><strong>Reproduce</strong> it reliably. Find the exact input that triggers it.</li>
  <li><strong>Read the error message and traceback</strong> carefully, bottom line first.</li>
  <li><strong>Isolate</strong>: shrink the input and the code until you have the smallest example that still fails (a "minimal reproducible example"). Comment out halves of the code to find which half contains the bug — "binary search" debugging.</li>
  <li><strong>Inspect</strong> the actual values at the point of failure. Your assumptions are wrong somewhere; find out which.</li>
  <li><strong>Fix</strong> the cause, not just the symptom.</li>
  <li><strong>Add a test</strong> reproducing the bug so it can never silently return.</li>
</ol>
<div class="callout tip"><strong>Rubber duck debugging:</strong> explain your code line by line, out loud, to someone — or to a rubber duck. Saying "and here x is definitely a list of numbers..." is very often the moment you realise it isn't.</div>

<h3>Inspecting values: print and f-string debugging</h3>
<p>The simplest tool is printing intermediate values. The f-string <code>=</code> specifier prints both the expression and its value, and <code>repr</code>/<code>type</code> reveal hidden problems like strings that look like numbers or stray whitespace:</p>
<pre><code class="lang-python runnable">row = {"age": "42 ", "score": 0.9}
age = row["age"]
print(f"{age=}  {type(age)=}")        # reveals it's a string with a space
total = 0
for x in [3, 4, 5]:
    total += x
    print(f"{x=} {total=}")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">age='42 '  type(age)=&lt;class 'str'&gt;
x=3 total=3
x=4 total=7
x=5 total=12</code></pre>

<h3>logging: prints you can keep</h3>
<p>For real applications, use the <code>logging</code> module instead of <code>print</code>. Messages have <strong>levels</strong> (DEBUG, INFO, WARNING, ERROR, CRITICAL), and you choose which levels to show — detailed debugging output during development, only warnings and errors in production — without deleting any lines.</p>
<pre><code class="lang-python runnable">import logging
import sys

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s", stream=sys.stdout)
log = logging.getLogger("trainer")

log.debug("batch shapes: ...")             # hidden: below INFO level
log.info("epoch 1 finished, loss=%.3f", 0.4213)
log.warning("validation loss increased")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">INFO epoch 1 finished, loss=0.421
WARNING validation loss increased</code></pre>

<h3>Debuggers: pause and look around</h3>
<p>A <strong>debugger</strong> lets you pause a running program at a chosen line and inspect every variable, then execute one line at a time.</p>
<ul>
  <li><strong>breakpoint()</strong>: put this built-in call on any line. When reached, Python pauses and opens the <code>pdb</code> debugger in the terminal. Useful commands: <code>p x</code> (print x), <code>n</code> (next line), <code>s</code> (step into a function), <code>c</code> (continue), <code>l</code> (list code), <code>q</code> (quit).</li>
  <li><strong>VS Code debugger</strong>: click left of a line number to set a red-dot <strong>breakpoint</strong>, then press <code>F5</code> (choose "Python File"). Execution stops at the breakpoint; the left panel shows all variables, you can hover over names to see values, and use the toolbar to <em>Step Over</em> (F10), <em>Step Into</em> (F11) or <em>Continue</em> (F5). The <em>Debug Console</em> lets you evaluate any expression in the paused context.</li>
  <li>In Jupyter, the <code>%debug</code> magic command after an error opens a debugger at the failure point.</li>
</ul>
<pre><code class="lang-python">def average(values):
    total = sum(values)
    breakpoint()            # execution pauses here; type 'p total' then 'c'
    return total / len(values)</code></pre>
<div class="callout warn"><strong>Common mistakes:</strong> testing only the "happy path" and not edge cases; comparing floats with <code>==</code> in tests; tests that depend on each other or on random numbers without a seed; leaving <code>breakpoint()</code> calls in committed code; and fixing a bug without adding a test, so it comes back later.</div>
`,
          keyPoints: [
            "assert condition, \"message\" raises AssertionError when False; use it in tests and for internal assumptions, not for input validation.",
            "pytest discovers test_*.py files and test_ functions; use plain assert, pytest.raises for expected errors, and parametrize for many cases.",
            "Test edge cases (empty, zero, boundaries) and compare floats with math.isclose or pytest.approx.",
            "Debug systematically: reproduce, read the traceback, isolate, inspect values, fix the cause, add a regression test.",
            "Tools: f\"{x=}\" printing, the logging module with levels, breakpoint()/pdb, and VS Code breakpoints."
          ],
          exercise: {
            prompt: String.raw`<p>This function is supposed to return the <em>top-k most frequent words</em> (ties broken alphabetically), but it has bugs:</p>
<pre><code class="lang-python">def top_words(text, k=2):
    counts = {}
    for w in text.split():
        counts[w] = counts.get(w, 0) + 1
    ranked = sorted(counts, key=lambda w: counts[w])
    return ranked[:k]</code></pre>
<p>1. Write test functions that expose the bugs: <code>top_words("b a b c a b")</code> should be <code>["b", "a"]</code>; <code>top_words("The the cat")</code> should be <code>["the", "cat"]</code> (case-insensitive); <code>top_words("x y z", k=2)</code> should be <code>["x", "y"]</code> (alphabetical tie-break); <code>top_words("", k=3)</code> should be <code>[]</code>.</p>
<p>2. Fix the function so all tests pass, and print <code>all tests passed</code>.</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">def top_words(text, k=2):
    counts = {}
    for w in text.lower().split():                      # fix 1: case-insensitive
        counts[w] = counts.get(w, 0) + 1
    ranked = sorted(counts, key=lambda w: (-counts[w], w))  # fix 2 &amp; 3
    return ranked[:k]

def test_most_frequent_first():
    assert top_words("b a b c a b") == ["b", "a"]

def test_case_insensitive():
    assert top_words("The the cat") == ["the", "cat"]

def test_alphabetical_tie_break():
    assert top_words("x y z", k=2) == ["x", "y"]

def test_empty_text():
    assert top_words("", k=3) == []

for t in [test_most_frequent_first, test_case_insensitive,
          test_alphabetical_tie_break, test_empty_text]:
    t()
print("all tests passed")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">all tests passed</code></pre>
<p>The original sorted by count <em>ascending</em>, so the rarest words came first (bug 1); it was case-sensitive, so "The" and "the" were counted separately (bug 2); and ties kept dictionary order instead of alphabetical (bug 3). Sorting by the tuple <code>(-count, word)</code> fixes two at once: Python compares tuples item by item, so higher counts (more negative) come first and equal counts fall back to alphabetical order. The empty-text test already passed — keeping it guards against future regressions. Put these tests in a <code>test_*.py</code> file and they run under pytest unchanged.</p>`
          },
          quiz: [
            { q: "What happens when assert 2 + 2 == 5, \"math broke\" runs?", options: ["Nothing", "It prints math broke and continues", "AssertionError: math broke is raised", "SyntaxError"], answer: 2, explain: "A false assertion raises AssertionError with the given message." },
            { q: "How does pytest find tests by default?", options: ["Any function in any file", "Files named test_*.py (or *_test.py) and functions starting with test_", "Only files in a folder named pytest", "Functions decorated with @test"], answer: 1, explain: "pytest auto-discovers test files and test_ functions by naming convention." },
            { q: "How do you test that a function raises ValueError?", options: ["assert f() == ValueError", "with pytest.raises(ValueError): f()", "try: f() then pass", "pytest.error(ValueError)"], answer: 1, explain: "pytest.raises is a context manager that passes only if the expected exception occurs inside it." },
            { q: "Why prefer logging over print in applications?", options: ["logging is faster to type", "Messages have levels you can switch on/off without editing code, plus timestamps/formatting", "print doesn't work in production", "logging writes to the GPU"], answer: 1, explain: "Levels (DEBUG, INFO, WARNING, ERROR) let you control verbosity per environment." },
            { q: "Which is the best first step when you hit a bug?", options: ["Rewrite the whole function", "Reproduce it reliably and read the traceback", "Add try/except around everything", "Upgrade Python"], answer: 1, explain: "You can't fix what you can't reproduce; the traceback tells you what and where." }
          ]
        }
      ]
    },
    {
      id: "py-tools",
      title: "Developer Toolkit for AI Engineers",
      summary: "The everyday tools around the code: the command line and environment variables, Git and GitHub, HTTP APIs and JSON, and Docker containers.",
      lessons: [
        {
          id: "py-tools-cli",
          title: "The Command Line and Environment Variables",
          minutes: 50,
          objectives: [
            "Navigate folders and manage files from a terminal on macOS/Linux/WSL and Windows PowerShell",
            "Use arguments, flags, pipes and output redirection",
            "Pass command-line arguments to Python scripts with sys.argv and argparse",
            "Set and read environment variables and keep API keys out of code with .env files"
          ],
          body: String.raw`
<h3>Why the command line?</h3>
<p>A <strong>terminal</strong> is a text window where you type commands; the program interpreting them is the <strong>shell</strong> (bash or zsh on Linux/macOS/WSL, PowerShell on Windows). Graphical tools are fine for browsing, but AI engineering lives in the terminal: creating environments, installing packages, running training scripts, using Git, building Docker images, and connecting to cloud servers (which usually have no graphical interface at all). The command line is also scriptable — anything you type can be saved and automated.</p>
<p>The <strong>prompt</strong> (e.g. <code>ada@laptop:~/projects$</code>) shows that the shell is waiting. You type a command and press Enter. Commands follow the pattern <code>command [options] [arguments]</code>: <code>ls -l data</code> runs <code>ls</code> with the <strong>flag</strong> <code>-l</code> ("long format") on the <strong>argument</strong> <code>data</code>.</p>

<h3>Navigating the file system</h3>
<p>The shell always has a <strong>current working directory</strong> — the folder you are "in". Paths are either <strong>absolute</strong> (from the root: <code>/home/ada/project</code> or <code>C:\Users\ada\project</code>) or <strong>relative</strong> to where you are (<code>data/train.csv</code>). Special names: <code>.</code> is the current folder, <code>..</code> the parent folder, <code>~</code> your home folder.</p>
<pre><code class="lang-bash">pwd                     # print working directory: where am I?
ls                      # list files (PowerShell also accepts ls / dir)
ls -la                  # long listing incl. hidden files like .env and .git
cd projects/ai-app      # change directory (relative path)
cd ..                   # go up one level
cd ~                    # go home
cd -                    # go back to the previous directory (bash/zsh)</code></pre>
<div class="callout tip"><strong>Two huge time-savers:</strong> press <code>Tab</code> to auto-complete file and folder names (press twice to see options), and use the <code>↑</code> arrow to recall previous commands. <code>Ctrl+C</code> stops a running command; <code>Ctrl+R</code> searches your history (bash/zsh); <code>clear</code> clears the screen.</div>

<h3>Working with files</h3>
<table>
<thead><tr><th>Task</th><th>bash / zsh (macOS, Linux, WSL)</th><th>PowerShell (Windows)</th></tr></thead>
<tbody>
<tr><td>make a folder</td><td><code>mkdir -p data/raw</code></td><td><code>mkdir data\raw</code></td></tr>
<tr><td>create empty file</td><td><code>touch notes.txt</code></td><td><code>New-Item notes.txt</code></td></tr>
<tr><td>show a file</td><td><code>cat notes.txt</code></td><td><code>cat notes.txt</code> (Get-Content)</td></tr>
<tr><td>first / last lines</td><td><code>head -n 5 f.csv</code>, <code>tail -n 5 f.csv</code></td><td><code>Get-Content f.csv -Head 5</code></td></tr>
<tr><td>copy</td><td><code>cp a.txt b.txt</code> (folders: <code>cp -r</code>)</td><td><code>cp a.txt b.txt</code></td></tr>
<tr><td>move / rename</td><td><code>mv old.txt new.txt</code></td><td><code>mv old.txt new.txt</code></td></tr>
<tr><td>delete</td><td><code>rm file.txt</code> (folders: <code>rm -r dir</code>)</td><td><code>rm file.txt</code></td></tr>
<tr><td>search text in files</td><td><code>grep -n "ERROR" app.log</code></td><td><code>Select-String "ERROR" app.log</code></td></tr>
<tr><td>count lines</td><td><code>wc -l data.csv</code></td><td><code>(Get-Content data.csv).Count</code></td></tr>
</tbody></table>
<div class="callout warn"><strong>rm is permanent.</strong> There is no recycle bin in the terminal. <code>rm -rf folder</code> deletes a folder and everything inside without asking. Double-check paths, especially with wildcards like <code>*</code>, before pressing Enter.</div>
<p>Most of this course's commands are shown in bash syntax, which works on macOS, Linux and WSL. On Windows, WSL is recommended for AI work; PowerShell equivalents are given where they differ.</p>

<h3>Pipes and redirection</h3>
<p>Command-line tools are small and composable. A <strong>pipe</strong> <code>|</code> sends one command's output into the next command's input. <strong>Redirection</strong> sends output to a file: <code>&gt;</code> overwrites, <code>&gt;&gt;</code> appends.</p>
<pre><code class="lang-bash">head -n 3 reviews.csv                     # peek at a dataset
grep -c "ERROR" app.log                   # count matching lines
cat app.log | grep "ERROR" | wc -l        # same idea with pipes
pip list | grep torch                     # is torch installed?
python train.py &gt; train_log.txt           # save output to a file
python train.py &gt;&gt; train_log.txt 2&gt;&amp;1     # append, including error messages
pip freeze &gt; requirements.txt             # you used this already!</code></pre>
<p><code>2&gt;&amp;1</code> means "send error output (stream 2, called <em>stderr</em>) to the same place as normal output (stream 1, <em>stdout</em>)". Python's <code>print</code> writes to stdout, while tracebacks go to stderr.</p>

<h3>Running Python scripts with arguments</h3>
<p>Scripts become reusable tools when they accept arguments: <code>python train.py --epochs 5 --lr 0.01</code>. The raw arguments are in <code>sys.argv</code> (a list of strings whose first item is the script name), but the standard <code>argparse</code> module parses them properly — with types, defaults and automatic <code>--help</code>:</p>
<pre><code class="lang-python runnable">import argparse

parser = argparse.ArgumentParser(description="Train a toy model")
parser.add_argument("data", help="path to the training CSV")
parser.add_argument("--epochs", type=int, default=10)
parser.add_argument("--lr", type=float, default=0.001)
parser.add_argument("--verbose", action="store_true")

# In a real script: args = parser.parse_args()  (reads sys.argv)
# Here we pass a list to simulate: python train.py data.csv --epochs 3 --verbose
args = parser.parse_args(["data.csv", "--epochs", "3", "--verbose"])
print(args.data, args.epochs, args.lr, args.verbose)
print(type(args.epochs).__name__)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">data.csv 3 0.001 True
int</code></pre>
<p>Running <code>python train.py --help</code> would print an automatically generated usage message. Libraries such as <code>typer</code> and <code>click</code> offer fancier interfaces, but <code>argparse</code> is built in.</p>

<h3>Environment variables</h3>
<p><strong>Environment variables</strong> are named text values that the operating system passes to every program you start from a shell. They configure programs without changing their code. You already met one: <code>PATH</code>, the list of folders searched for commands. Others you'll use soon: <code>OPENAI_API_KEY</code>, <code>ANTHROPIC_API_KEY</code>, <code>HF_TOKEN</code>, <code>AWS_ACCESS_KEY_ID</code>, <code>CUDA_VISIBLE_DEVICES</code>.</p>
<pre><code class="lang-bash"># bash / zsh: set for this terminal session and programs started from it
export MODEL_NAME="small-v2"
echo $MODEL_NAME
echo $PATH
python app.py                    # app.py can read MODEL_NAME
MODEL_NAME=big python app.py     # set only for this one command
unset MODEL_NAME

# PowerShell
$env:MODEL_NAME = "small-v2"
echo $env:MODEL_NAME</code></pre>
<p>In Python, read them with <code>os.environ</code> (a dict-like object). Use <code>.get()</code> with a default for optional settings, and fail with a clear message for required ones:</p>
<pre><code class="lang-python runnable">import os

os.environ["APP_MODE"] = "testing"         # simulate: export APP_MODE=testing

mode = os.environ.get("APP_MODE", "production")
workers = int(os.environ.get("APP_WORKERS", "2"))   # env values are always strings
print(mode, workers)

def require_env(name):
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing environment variable {name}. Set it before running.")
    return value

try:
    key = require_env("DEMO_SERVICE_API_KEY")
except RuntimeError as e:
    print(e)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">testing 2
Missing environment variable DEMO_SERVICE_API_KEY. Set it before running.</code></pre>

<h3>Never put secrets in code</h3>
<p>An <strong>API key</strong> is a secret token that proves who you are to a service — and lets anyone holding it spend your money. Bots constantly scan GitHub for leaked keys and abuse them within minutes. Rules:</p>
<ul>
  <li>Never write keys directly in <code>.py</code> files or notebooks (<code>api_key = "sk-..."</code>).</li>
  <li>Read them from environment variables.</li>
  <li>For local development, keep them in a <code>.env</code> file, loaded by the <code>python-dotenv</code> package, and list <code>.env</code> in <code>.gitignore</code> so it is never committed (next lesson).</li>
  <li>Commit a <code>.env.example</code> with the variable names but fake values, so teammates know what to set.</li>
  <li>In production, use your platform's secret manager (e.g. AWS Secrets Manager, GitHub Actions secrets) which injects them as environment variables.</li>
</ul>
<pre><code class="lang-text"># .env   (NEVER committed)
OPENAI_API_KEY=sk-your-real-key-here
MODEL_NAME=gpt-4o-mini</code></pre>
<pre><code class="lang-python"># app.py  (pip install python-dotenv)
import os
from dotenv import load_dotenv

load_dotenv()                                  # reads .env into os.environ
api_key = os.environ["OPENAI_API_KEY"]         # required: KeyError if missing
model = os.environ.get("MODEL_NAME", "gpt-4o-mini")</code></pre>
<p>The official OpenAI and Anthropic Python SDKs automatically read <code>OPENAI_API_KEY</code> / <code>ANTHROPIC_API_KEY</code> from the environment, so with the variable set you don't even pass the key in code.</p>
<div class="callout warn"><strong>Common mistakes:</strong> spaces around <code>=</code> in bash (<code>export X = 1</code> fails; write <code>export X=1</code>); expecting a variable set in one terminal to exist in another (each session is separate — put permanent ones in <code>~/.bashrc</code> or <code>~/.zshrc</code>); forgetting that values are strings; and pasting real keys into code, notebooks, screenshots or chat messages.</div>
`,
          keyPoints: [
            "Commands follow 'command [flags] [arguments]'; pwd, ls, cd, mkdir, cp, mv, rm, cat, head, grep are the essentials. Tab completes, Ctrl+C stops.",
            "Paths are absolute or relative to the current directory; . is here, .. is the parent, ~ is home.",
            "| pipes output into another command; > overwrites a file, >> appends; 2>&1 includes errors.",
            "argparse turns command-line arguments into typed values with defaults and --help.",
            "Environment variables (export X=1, $env:X in PowerShell, os.environ in Python) configure programs; keep API keys in env vars or an uncommitted .env file, never in code."
          ],
          exercise: {
            prompt: String.raw`<p>1. In a terminal, create <code>cli-practice/data</code>, create a file <code>data/log.txt</code> containing three lines (use <code>echo "INFO start" &gt; data/log.txt</code> and <code>&gt;&gt;</code> for the next two, one of which contains ERROR), then count the ERROR lines with <code>grep</code>.</p>
<p>2. Write a script <code>greet.py</code> using <code>argparse</code> that takes a required <code>name</code>, an optional <code>--times</code> (int, default 1) and reads the environment variable <code>GREETING</code> (default <code>"Hello"</code>). For testing inside one file, call <code>parser.parse_args(["Ada", "--times", "2"])</code> after setting <code>os.environ["GREETING"] = "Hi"</code>. Expected output:</p>
<pre><code class="lang-text">Hi, Ada!
Hi, Ada!</code></pre>`,
            solution: String.raw`<pre><code class="lang-bash">mkdir -p cli-practice/data
cd cli-practice
echo "INFO start" &gt; data/log.txt
echo "ERROR model file missing" &gt;&gt; data/log.txt
echo "INFO retry ok" &gt;&gt; data/log.txt
cat data/log.txt
grep -c "ERROR" data/log.txt      # prints 1</code></pre>
<pre><code class="lang-python runnable">import argparse
import os

def main(argv=None):
    parser = argparse.ArgumentParser(description="Greet someone")
    parser.add_argument("name")
    parser.add_argument("--times", type=int, default=1)
    args = parser.parse_args(argv)

    greeting = os.environ.get("GREETING", "Hello")
    for _ in range(args.times):
        print(f"{greeting}, {args.name}!")

os.environ["GREETING"] = "Hi"          # in a real shell: export GREETING=Hi
main(["Ada", "--times", "2"])          # in a real shell: python greet.py Ada --times 2</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Hi, Ada!
Hi, Ada!</code></pre>
<p><code>&gt;</code> created the file and <code>&gt;&gt;</code> appended lines. In the script, <code>parse_args(argv)</code> reads <code>sys.argv</code> when <code>argv</code> is <code>None</code>, so the same <code>main</code> works from the terminal (with <code>if __name__ == "__main__": main()</code> at the bottom) and from tests with an explicit list. Configuration comes from two places: arguments for things that change per run, environment variables for settings of the environment (and secrets).</p>`
          },
          quiz: [
            { q: "What does cd .. do?", options: ["Lists files", "Moves to the parent directory", "Goes to the home directory", "Deletes the folder"], answer: 1, explain: ".. refers to the parent of the current directory." },
            { q: "What does python run.py > out.txt do?", options: ["Appends output to out.txt", "Writes the script's normal output to out.txt, overwriting it", "Reads input from out.txt", "Compares run.py with out.txt"], answer: 1, explain: "> redirects stdout into a file, replacing its contents; >> would append." },
            { q: "How should an AI app get its API key?", options: ["Hard-coded in the main .py file", "From an environment variable (e.g. loaded from an uncommitted .env file)", "From a comment in the code", "From the Git commit message"], answer: 1, explain: "Secrets belong in environment variables or a secret manager, never in source code or Git." },
            { q: "os.environ.get(\"WORKERS\", \"4\") returns what type?", options: ["int", "str", "float", "It depends on the value"], answer: 1, explain: "Environment variables are always strings; convert with int() when needed." },
            { q: "In bash, which correctly sets a variable for later commands?", options: ["export TOKEN = abc", "export TOKEN=abc", "set TOKEN abc", "TOKEN == abc"], answer: 1, explain: "No spaces around = in bash assignments." }
          ]
        },
        {
          id: "py-tools-git",
          title: "Git and GitHub: Version Control",
          minutes: 55,
          objectives: [
            "Explain what version control is and the roles of the working directory, staging area, repository and remote",
            "Use git init, status, add, commit, log and diff in a daily workflow",
            "Create and merge branches and push to GitHub",
            "Write a .gitignore for Python/AI projects and respond correctly if a secret is committed"
          ],
          body: String.raw`
<h3>Why version control?</h3>
<p>Without version control, projects end up with folders like <code>model_final.py</code>, <code>model_final2.py</code>, <code>model_final_REALLY.py</code>. <strong>Git</strong> solves this properly: it records <strong>snapshots</strong> (called <strong>commits</strong>) of your project over time. You can see what changed, when and why; go back to any earlier version; work on experiments without breaking the working version; and collaborate with others without emailing files. Think of it as an unlimited "undo" history plus a lab notebook for your code.</p>
<p><strong>GitHub</strong> (and alternatives like GitLab and Bitbucket) is a website that hosts Git repositories online, so you can back them up, share them and collaborate. Git is the tool; GitHub is a service built around it. Every professional software and ML team uses Git, and deployment platforms usually deploy straight from a GitHub repository.</p>

<h3>The four places your changes live</h3>
<figure><img alt="Diagram: changes flow from the working directory via git add to the staging area, via git commit to the local repository, and via git push to the GitHub remote; git clone and git pull bring commits back down" src="assets/diagrams/python-git-workflow.svg"><figcaption>The core Git workflow: add, commit, push - and pull to receive others' work.</figcaption></figure>
<ul>
  <li><strong>Working directory</strong>: the actual files you edit.</li>
  <li><strong>Staging area</strong> (or "index"): a holding area where you collect the changes you want in your next commit. This lets you commit related changes together even if you edited several unrelated things.</li>
  <li><strong>Local repository</strong>: the hidden <code>.git</code> folder storing the complete history of commits on your machine.</li>
  <li><strong>Remote</strong>: a copy of the repository on a server such as GitHub (conventionally named <code>origin</code>).</li>
</ul>

<h3>One-time setup</h3>
<pre><code class="lang-bash">git --version                                   # check it is installed
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"
git config --global init.defaultBranch main</code></pre>
<p>Install Git from git-scm.com (Windows), with <code>xcode-select --install</code> or Homebrew (macOS), or <code>sudo apt install git</code> (Linux/WSL). VS Code has a built-in Source Control panel that shows the same concepts graphically.</p>

<h3>The daily workflow</h3>
<pre><code class="lang-bash">mkdir sentiment-app &amp;&amp; cd sentiment-app
git init                         # turn this folder into a repository
echo "print('hello')" &gt; app.py

git status                       # what has changed? (run this constantly)
git add app.py                   # stage one file
git add .                        # or stage everything changed in this folder
git commit -m "Add hello world app"   # snapshot the staged changes

# ... edit app.py ...
git diff                         # see unstaged changes line by line
git add app.py
git commit -m "Print model name on startup"
git log --oneline                # history, one line per commit</code></pre>
<pre><code class="lang-text">$ git log --oneline
3f9c2ab (HEAD -&gt; main) Print model name on startup
a1d04e7 Add hello world app</code></pre>
<p>Each commit gets a unique ID (a <strong>hash</strong> like <code>3f9c2ab</code>). <code>HEAD</code> means "the commit you currently have checked out", and <code>main</code> is the default <strong>branch</strong>.</p>
<p><strong>Good commit messages</strong> are short, in the imperative mood, and describe <em>why</em> or <em>what</em>: "Add input validation to predict endpoint", "Fix off-by-one in batch splitting". Avoid "stuff", "changes", "asdf". Commit small, logical units of work often — it makes history useful and mistakes easy to undo.</p>

<h3>Undoing things</h3>
<pre><code class="lang-bash">git restore app.py               # discard uncommitted edits to a file (careful!)
git restore --staged app.py      # unstage, but keep the edits
git commit --amend -m "Better message"   # fix the last commit (before pushing)
git revert 3f9c2ab               # create a new commit that undoes an old one
git switch --detach a1d04e7      # look at an old version; git switch main to return</code></pre>

<h3>Branches: safe experiments</h3>
<p>A <strong>branch</strong> is an independent line of development — a movable label pointing to a commit. Create a branch to try something (a new feature, a different model) without touching <code>main</code>. If it works, <strong>merge</strong> it; if not, delete it.</p>
<pre><code class="lang-bash">git switch -c try-bigger-model   # create and switch to a new branch
# ... edit, add, commit on this branch ...
git switch main                  # back to main: your experiment's changes disappear from the folder
git merge try-bigger-model       # bring the branch's commits into main
git branch                       # list branches (* marks the current one)
git branch -d try-bigger-model   # delete the merged branch</code></pre>
<p>If the same lines were changed differently on both branches, Git reports a <strong>merge conflict</strong> and marks the file with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> sections. You edit the file to keep the right version, remove the markers, then <code>git add</code> and <code>git commit</code>. VS Code shows conflicts with handy "Accept Current / Incoming / Both" buttons.</p>

<h3>Working with GitHub</h3>
<p>Create an empty repository on github.com (no README, to keep it simple), then connect and upload your local one:</p>
<pre><code class="lang-bash">git remote add origin https://github.com/your-name/sentiment-app.git
git push -u origin main          # first push; -u remembers the upstream
git push                         # later pushes
git pull                         # download and merge others' new commits
git clone https://github.com/someone/project.git   # copy an existing repo</code></pre>
<p>GitHub requires authentication for pushing: either sign in through the browser prompt (Git Credential Manager, or the <code>gh auth login</code> command of the GitHub CLI), use a <strong>personal access token</strong> instead of a password, or set up SSH keys. Your account password alone no longer works for Git operations.</p>
<p>Team workflow: create a branch, push it, and open a <strong>pull request</strong> (PR) on GitHub — a proposal to merge your branch into <code>main</code>, where teammates review the changes and automated tests (CI) run before merging.</p>

<h3>.gitignore: what NOT to commit</h3>
<p>A <code>.gitignore</code> file in the repository root lists patterns of files Git should ignore. For Python/AI projects, ignore environments, caches, secrets, large data and model files:</p>
<pre><code class="lang-text"># .gitignore
# virtual environments
.venv/
venv/
# Python caches
__pycache__/
*.pyc
.pytest_cache/
# notebooks checkpoints
.ipynb_checkpoints/
# secrets - NEVER commit
.env
*.pem
# large data and model artifacts (store elsewhere, e.g. cloud storage, DVC)
data/
models/
*.pt
*.ckpt
# OS / editor clutter
.DS_Store
.vscode/</code></pre>
<p>Git repositories are designed for source code, not gigabytes of data or model weights. Large files belong in cloud storage, Git LFS, DVC or a model registry (covered in the MLOps tracks).</p>

<h3>If you commit a secret</h3>
<div class="callout warn"><strong>Treat a committed key as compromised — even if you delete it in the next commit.</strong> Git keeps history, so the key is still in earlier commits, and anything pushed to a public GitHub repo may have been copied by scanners within minutes. The correct response:
<ol>
<li><strong>Revoke/rotate the key immediately</strong> in the provider's dashboard (OpenAI, AWS, etc.) and create a new one. This is the step that actually protects you.</li>
<li>Move the secret into <code>.env</code> / environment variables and add <code>.env</code> to <code>.gitignore</code>.</li>
<li>Stop tracking the file without deleting your local copy: <code>git rm --cached .env</code>, then commit.</li>
<li>Optionally rewrite history with tools like <code>git filter-repo</code> — but rotation comes first.</li>
</ol>
GitHub's "push protection" and secret scanning may block pushes containing known key formats — a safety net, not a strategy.</div>

<h3>Checking what Git sees, from Python</h3>
<p>Here is a small runnable demonstration (it creates a throwaway repository in a temporary folder) showing <code>.gitignore</code> in action. If Git is not installed, it says so.</p>
<pre><code class="lang-python runnable">import shutil
import subprocess
from pathlib import Path

if shutil.which("git") is None:
    print("git is not installed")
else:
    repo = Path("demo-repo")
    repo.mkdir(exist_ok=True)
    (repo / "app.py").write_text("print('hi')\n")
    (repo / ".env").write_text("OPENAI_API_KEY=sk-fake\n")
    (repo / ".gitignore").write_text(".env\n")

    def git(*args):
        return subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True).stdout

    git("init", "-q")
    print(sorted(git("status", "--porcelain").split()))   # untracked files Git can see</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">['.gitignore', '??', '??', 'app.py']</code></pre>
<p><code>??</code> marks untracked files. Only <code>app.py</code> and <code>.gitignore</code> appear — <code>.env</code> is invisible to Git, so it can never be accidentally committed with <code>git add .</code>.</p>
`,
          keyPoints: [
            "Git records snapshots (commits) of a project; GitHub hosts repositories online for backup and collaboration.",
            "Changes flow: working directory -> git add -> staging area -> git commit -> local repo -> git push -> remote.",
            "Daily loop: git status, git diff, git add, git commit -m \"message\", git log --oneline; commit small logical changes.",
            "Branches (git switch -c name) isolate experiments; git merge combines them; pull requests enable review.",
            ".gitignore must exclude .venv, __pycache__, .env and large data/models. A committed secret must be revoked and rotated immediately."
          ],
          exercise: {
            prompt: String.raw`<p>Practise the full workflow in a terminal:</p>
<ol>
<li>Create a folder <code>git-practice</code>, run <code>git init</code>, and create <code>model.py</code> containing <code>THRESHOLD = 0.5</code>.</li>
<li>Create a <code>.env</code> with a fake key and a <code>.gitignore</code> that ignores <code>.env</code>, <code>.venv/</code> and <code>__pycache__/</code>. Check with <code>git status</code> that <code>.env</code> is not listed.</li>
<li>Commit <code>model.py</code> and <code>.gitignore</code> with a good message.</li>
<li>Create a branch <code>tune-threshold</code>, change the threshold to 0.6, commit, switch back to <code>main</code> and confirm the file says 0.5 again, then merge the branch and confirm it says 0.6.</li>
<li>Show the history with <code>git log --oneline</code>.</li>
</ol>`,
            solution: String.raw`<pre><code class="lang-bash">mkdir git-practice &amp;&amp; cd git-practice
git init
echo "THRESHOLD = 0.5" &gt; model.py
echo "OPENAI_API_KEY=sk-fake-for-practice" &gt; .env
printf ".env\n.venv/\n__pycache__/\n" &gt; .gitignore
git status                    # shows .gitignore and model.py, NOT .env

git add model.py .gitignore
git commit -m "Add model threshold and gitignore"

git switch -c tune-threshold
echo "THRESHOLD = 0.6" &gt; model.py
git commit -am "Raise threshold to 0.6 to reduce false positives"
git switch main
cat model.py                  # THRESHOLD = 0.5
git merge tune-threshold
cat model.py                  # THRESHOLD = 0.6
git log --oneline</code></pre>
<pre><code class="lang-text">5c1e9d2 (HEAD -&gt; main, tune-threshold) Raise threshold to 0.6 to reduce false positives
8b7a3f0 Add model threshold and gitignore</code></pre>
<p>(Your hashes will differ.) <code>git commit -am</code> stages modified <em>tracked</em> files and commits in one step (it doesn't add brand-new files). Switching branches really changes the files in your folder to match that branch. Because <code>main</code> had no new commits of its own, the merge was a "fast-forward": Git simply moved the <code>main</code> label forward to the branch's commit. To publish, create an empty GitHub repo and run <code>git remote add origin ...</code> then <code>git push -u origin main</code>.</p>`
          },
          quiz: [
            { q: "What does git add do?", options: ["Uploads files to GitHub", "Moves changes into the staging area for the next commit", "Creates a new repository", "Deletes untracked files"], answer: 1, explain: "add stages changes; commit records the staged snapshot; push uploads commits." },
            { q: "You accidentally pushed a real API key to a public repo, then deleted it in a new commit. What must you do?", options: ["Nothing, it's deleted", "Revoke/rotate the key immediately, because it remains in history and may already be copied", "Make the repo private and continue using the key", "Rename the file"], answer: 1, explain: "History keeps the old commit and scanners act fast. Rotation is the only real fix." },
            { q: "Which should normally be in a Python project's .gitignore?", options: ["requirements.txt", "app.py", ".venv/ and .env", "README.md"], answer: 2, explain: "Environments and secrets must not be committed; requirements.txt, code and docs should be." },
            { q: "What is a branch?", options: ["A copy of the whole repository on GitHub", "An independent line of development; a movable pointer to a commit", "A backup file", "A type of merge conflict"], answer: 1, explain: "Branches let you develop and experiment in isolation, then merge." },
            { q: "Which command shows a compact history of commits?", options: ["git status", "git log --oneline", "git diff", "git history"], answer: 1, explain: "git log lists commits; --oneline shows one line per commit." }
          ]
        },
        {
          id: "py-tools-apis",
          title: "HTTP APIs, REST and JSON with requests",
          minutes: 55,
          objectives: [
            "Explain the client-server model, URLs, HTTP methods, headers, bodies and status codes",
            "Describe REST conventions for resources and endpoints",
            "Write Python code with the requests library to GET and POST JSON, pass auth tokens and handle errors and timeouts",
            "Read the structure of a typical LLM API request and response"
          ],
          body: String.raw`
<h3>Programs talking to programs</h3>
<p>An <strong>API</strong> (Application Programming Interface) is a way for one program to use another's capabilities. A <strong>web API</strong> works over the internet using <strong>HTTP</strong>, the same protocol your browser uses. Your program (the <strong>client</strong>) sends a <strong>request</strong> to a <strong>server</strong>; the server sends back a <strong>response</strong>. Think of a restaurant: you (client) give the waiter an order in a standard format (request), the kitchen (server) prepares it, and the waiter brings back your dish plus a note on how it went (response with a status code).</p>
<p>This matters enormously for AI engineering. Calling OpenAI, Anthropic or Hugging Face models means sending HTTP requests. Fetching data from services means HTTP. And when you deploy your own model, you will wrap it in a web API (with FastAPI) so other programs can send it requests. You'll be on both sides of the conversation.</p>

<h3>Anatomy of a request</h3>
<pre><code class="lang-text">POST https://api.example.com/v1/predict?version=2
Content-Type: application/json
Authorization: Bearer sk-abc123

{"text": "I loved this movie"}</code></pre>
<ul>
  <li><strong>Method</strong> (the verb): what you want to do.</li>
  <li><strong>URL</strong>: <code>https://</code> (scheme, encrypted), <code>api.example.com</code> (host), <code>/v1/predict</code> (path, which <strong>endpoint</strong>), <code>?version=2</code> (<strong>query parameters</strong>, key=value pairs joined with <code>&amp;</code>).</li>
  <li><strong>Headers</strong>: metadata as key: value lines — the format of the body (<code>Content-Type</code>), credentials (<code>Authorization</code>), and so on.</li>
  <li><strong>Body</strong>: the data sent, usually JSON for APIs (GET requests normally have no body).</li>
</ul>

<h3>HTTP methods</h3>
<table>
<thead><tr><th>Method</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>GET</code></td><td>read/fetch data; should not change anything</td><td>list available models</td></tr>
<tr><td><code>POST</code></td><td>create something or submit data for processing</td><td>send text, get a prediction / chat completion</td></tr>
<tr><td><code>PUT</code> / <code>PATCH</code></td><td>replace / partially update a resource</td><td>update a dataset's description</td></tr>
<tr><td><code>DELETE</code></td><td>remove a resource</td><td>delete an uploaded file</td></tr>
</tbody></table>

<h3>Status codes</h3>
<p>Every response starts with a three-digit <strong>status code</strong>. The first digit tells you the category:</p>
<table>
<thead><tr><th>Code</th><th>Meaning</th><th>What to do</th></tr></thead>
<tbody>
<tr><td><strong>200</strong> OK / <strong>201</strong> Created</td><td>success</td><td>read the body</td></tr>
<tr><td><strong>400</strong> Bad Request</td><td>your request is malformed (bad JSON, missing field)</td><td>fix your code</td></tr>
<tr><td><strong>401</strong> Unauthorized</td><td>missing or invalid credentials</td><td>check your API key</td></tr>
<tr><td><strong>403</strong> Forbidden</td><td>authenticated, but not allowed</td><td>check permissions/plan</td></tr>
<tr><td><strong>404</strong> Not Found</td><td>wrong URL or resource doesn't exist</td><td>check the path / ID</td></tr>
<tr><td><strong>422</strong> Unprocessable</td><td>valid JSON but invalid values (FastAPI uses this)</td><td>fix the data</td></tr>
<tr><td><strong>429</strong> Too Many Requests</td><td>rate limit exceeded</td><td>wait and retry (backoff)</td></tr>
<tr><td><strong>500</strong>, <strong>502</strong>, <strong>503</strong></td><td>server-side error / unavailable</td><td>retry later; not your fault</td></tr>
</tbody></table>
<p>Rule of thumb: <strong>2xx</strong> = success, <strong>4xx</strong> = the client (you) did something wrong, <strong>5xx</strong> = the server had a problem. Retrying makes sense for 429 and 5xx, not for 400/401/404.</p>

<h3>REST in a nutshell</h3>
<p><strong>REST</strong> is a common style for designing web APIs. Its main ideas:</p>
<ul>
  <li><strong>Resources</strong> are things identified by URLs, named with nouns: <code>/users</code>, <code>/users/42</code>, <code>/models/7/versions</code>.</li>
  <li><strong>Methods</strong> say what to do with them: <code>GET /users/42</code> reads user 42, <code>DELETE /users/42</code> deletes it, <code>POST /users</code> creates a new user.</li>
  <li><strong>Stateless</strong>: each request carries everything needed (including authentication); the server doesn't remember previous requests. That's why you send your API key with <em>every</em> request — and why chat APIs make you send the whole conversation history each time.</li>
  <li><strong>JSON</strong> representations in request and response bodies.</li>
</ul>

<h3>Authentication</h3>
<p>Most APIs identify you with a secret token. The most common scheme is a <strong>bearer token</strong> in the <code>Authorization</code> header: <code>Authorization: Bearer YOUR_KEY</code>. Some APIs use a custom header (Anthropic uses <code>x-api-key</code>). Always read the key from an environment variable.</p>

<h3>The requests library</h3>
<p><code>requests</code> (<code>pip install requests</code>) is the classic, friendly HTTP library for Python. The examples below need internet access and real endpoints, so they are shown without being executed here; try them on your own machine against the free test service httpbin.org.</p>
<pre><code class="lang-python">import os
import requests

# GET with query parameters
resp = requests.get(
    "https://httpbin.org/get",
    params={"q": "transformers", "limit": 5},   # becomes ?q=transformers&amp;limit=5
    timeout=10,                                 # seconds; ALWAYS set a timeout
)
print(resp.status_code)          # 200
print(resp.headers["Content-Type"])
data = resp.json()               # parse the JSON body into dicts/lists
print(data["args"])              # {'q': 'transformers', 'limit': '5'}

# POST JSON with an auth token
token = os.environ.get("DEMO_TOKEN", "test-token")
resp = requests.post(
    "https://httpbin.org/post",
    json={"text": "I loved this movie"},        # serialises to JSON + sets Content-Type
    headers={"Authorization": f"Bearer {token}"},
    timeout=10,
)
resp.raise_for_status()          # raise an exception for 4xx/5xx responses
print(resp.json()["json"])       # httpbin echoes back what we sent</code></pre>
<p>Key points: <code>params=</code> builds the query string safely; <code>json=</code> converts a dict to a JSON body and sets the header; <code>resp.json()</code> parses the response; <code>raise_for_status()</code> turns error status codes into exceptions; and <code>timeout=</code> prevents your program hanging forever if a server doesn't answer (requests has <em>no</em> timeout by default).</p>
<p>You can see exactly what requests would send without any network access by <strong>preparing</strong> a request instead of sending it:</p>
<pre><code class="lang-python runnable">import requests

req = requests.Request(
    "POST",
    "https://api.example.com/v1/predict",
    params={"version": 2},
    json={"text": "great movie"},
    headers={"Authorization": "Bearer sk-test"},
).prepare()

print(req.method, req.url)
print(req.headers["Content-Type"])
print(req.headers["Authorization"])
print(req.body.decode())</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">POST https://api.example.com/v1/predict?version=2
application/json
Bearer sk-test
{"text": "great movie"}</code></pre>

<h3>Handling errors robustly</h3>
<p>Networks fail. Production code must handle timeouts, connection errors and error statuses — and retry the ones that are temporary:</p>
<pre><code class="lang-python">import time
import requests

def call_api(url, payload, token, max_retries=3):
    for attempt in range(1, max_retries + 1):
        try:
            resp = requests.post(url, json=payload, timeout=15,
                                 headers={"Authorization": f"Bearer {token}"})
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
            print(f"attempt {attempt}: network problem: {e}")
        else:
            if resp.status_code == 429 or resp.status_code &gt;= 500:
                print(f"attempt {attempt}: temporary error {resp.status_code}")
            else:
                resp.raise_for_status()      # 4xx: our bug - don't retry, fail loudly
                return resp.json()
        time.sleep(2 ** attempt)             # exponential backoff: 2, 4, 8 seconds
    raise RuntimeError("API still failing after retries")</code></pre>

<h3>Parsing a response: an LLM-style example</h3>
<p>LLM APIs return nested JSON. Here is a realistic (simulated) chat-completion response and the code to extract what you need — this runs offline because we start from the JSON text:</p>
<pre><code class="lang-python runnable">import json

raw = '''{
  "id": "chatcmpl-123",
  "model": "gpt-4o-mini",
  "choices": [
    {"index": 0,
     "message": {"role": "assistant", "content": "Paris is the capital of France."},
     "finish_reason": "stop"}
  ],
  "usage": {"prompt_tokens": 14, "completion_tokens": 8, "total_tokens": 22}
}'''

resp = json.loads(raw)
answer = resp["choices"][0]["message"]["content"]
usage = resp["usage"]
cost = usage["prompt_tokens"] * 0.15 / 1e6 + usage["completion_tokens"] * 0.60 / 1e6

print(answer)
print(f"tokens used: {usage['total_tokens']}, finish: {resp['choices'][0]['finish_reason']}")
print(f"estimated cost: {cost:.8f} USD")</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Paris is the capital of France.
tokens used: 22, finish: stop
estimated cost: 0.00000690 USD</code></pre>
<p>(The per-token prices here are illustrative; real prices vary by model and change over time.) The request that produced such a response, made with plain <code>requests</code>, looks like this — shown, not executed, since it needs a real key and network:</p>
<pre><code class="lang-python">import os
import requests

resp = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
    json={
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You are a concise assistant."},
            {"role": "user", "content": "What is the capital of France?"},
        ],
    },
    timeout=30,
)
resp.raise_for_status()
print(resp.json()["choices"][0]["message"]["content"])</code></pre>
<p>In the LLM tracks you will usually use the official SDKs (<code>openai</code>, <code>anthropic</code>), which wrap exactly these HTTP calls with nicer Python objects, automatic retries and typed errors. Knowing the raw HTTP underneath makes their errors and docs much easier to understand.</p>
<h3>curl: HTTP from the terminal</h3>
<p>API documentation often shows examples using <code>curl</code>, a command-line HTTP client. Being able to read them helps translate docs into Python:</p>
<pre><code class="lang-bash">curl -s "https://httpbin.org/get?q=test"
curl -s -X POST https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEMO_TOKEN" \
  -d '{"text": "hello"}'</code></pre>
<p><code>-X</code> sets the method, <code>-H</code> adds a header, <code>-d</code> sends a body; the backslashes continue the command across lines.</p>
<div class="callout warn"><strong>Common mistakes:</strong> no <code>timeout</code> (scripts hang forever); not checking the status code before calling <code>.json()</code>; retrying on 400/401 errors (they will never succeed); sending <code>data=</code> when the API expects <code>json=</code>; hard-coding API keys; and printing full responses or headers that contain secrets into logs.</div>
`,
          keyPoints: [
            "A web API is a server you talk to with HTTP requests: method + URL (+ query params) + headers + optional JSON body.",
            "GET reads, POST creates/submits, PUT/PATCH update, DELETE removes. REST names resources with noun URLs and is stateless.",
            "Status codes: 2xx success, 4xx client error (400, 401, 403, 404, 422, 429), 5xx server error; retry only 429/5xx with backoff.",
            "requests: get/post with params=, json=, headers={'Authorization': 'Bearer ...'}, timeout=; use raise_for_status() and resp.json().",
            "LLM APIs return nested JSON; extract answers with chained lookups like resp['choices'][0]['message']['content']."
          ],
          exercise: {
            prompt: String.raw`<p>Without network access, practise the logic you will use with real APIs.</p>
<ol>
<li>Write <code>build_request(text, token)</code> that returns a <em>prepared</em> <code>requests</code> POST to <code>https://api.example.com/v1/sentiment</code> with JSON body <code>{"text": text}</code>, a bearer token header and the query parameter <code>lang=en</code>.</li>
<li>Write <code>handle_response(status, body_text)</code> that returns the <code>"label"</code> from the JSON body for status 200, returns <code>"retry"</code> for 429 or any 5xx, and raises <code>ValueError(f"client error {status}")</code> for other 4xx codes.</li>
</ol>
<p>Test them so the output is:</p>
<pre><code class="lang-text">https://api.example.com/v1/sentiment?lang=en
Bearer abc
{"text": "Fantastic!"}
positive
retry
retry
client error 401</code></pre>`,
            solution: String.raw`<pre><code class="lang-python runnable">import json
import requests

def build_request(text, token):
    return requests.Request(
        "POST",
        "https://api.example.com/v1/sentiment",
        params={"lang": "en"},
        json={"text": text},
        headers={"Authorization": f"Bearer {token}"},
    ).prepare()

def handle_response(status, body_text):
    if status == 200:
        return json.loads(body_text)["label"]
    if status == 429 or 500 &lt;= status &lt;= 599:
        return "retry"
    if 400 &lt;= status &lt;= 499:
        raise ValueError(f"client error {status}")
    raise RuntimeError(f"unexpected status {status}")

req = build_request("Fantastic!", "abc")
print(req.url)
print(req.headers["Authorization"])
print(req.body.decode())

print(handle_response(200, '{"label": "positive", "score": 0.98}'))
print(handle_response(429, ""))
print(handle_response(503, ""))
try:
    handle_response(401, '{"error": "invalid key"}')
except ValueError as e:
    print(e)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">https://api.example.com/v1/sentiment?lang=en
Bearer abc
{"text": "Fantastic!"}
positive
retry
retry
client error 401</code></pre>
<p>Preparing the request lets you verify the URL, headers and body exactly as they would be sent. Separating "build" and "handle" logic from the actual network call makes both easy to test offline — a real-world technique: in production you would call <code>requests.Session().send(req, timeout=10)</code> and pass <code>resp.status_code</code> and <code>resp.text</code> to <code>handle_response</code>. The order of checks matters: 429 is a 4xx code but must be treated as "retry", so it is tested before the generic 4xx branch.</p>`
          },
          quiz: [
            { q: "Which status code means you are sending requests too fast?", options: ["200", "404", "429", "500"], answer: 2, explain: "429 Too Many Requests signals rate limiting; wait and retry with backoff." },
            { q: "An API returns 401. What is the most likely problem?", options: ["The server crashed", "Your API key/credentials are missing or invalid", "The URL is wrong", "The request succeeded"], answer: 1, explain: "401 Unauthorized means authentication failed. 404 would indicate a wrong URL; 5xx a server problem." },
            { q: "What does requests.post(url, json=payload) do with payload?", options: ["Sends it as query parameters", "Serialises the dict to JSON in the body and sets Content-Type: application/json", "Saves it to a file", "Ignores it"], answer: 1, explain: "json= encodes the body as JSON and sets the header automatically." },
            { q: "Why should you always pass timeout= to requests calls?", options: ["It makes requests faster", "Without it, a request can hang forever if the server doesn't respond", "It is required syntax", "It encrypts the request"], answer: 1, explain: "requests has no default timeout; a stuck connection would freeze your program." },
            { q: "In REST, which request would typically delete model number 7?", options: ["GET /models/7/delete", "DELETE /models/7", "POST /deleteModel?id=7", "PUT /models"], answer: 1, explain: "REST uses the HTTP method as the verb and the URL as the resource." }
          ]
        },
        {
          id: "py-tools-docker",
          title: "Docker Basics: Packaging Python Apps in Containers",
          minutes: 55,
          objectives: [
            "Explain the problem containers solve and the difference between an image and a container",
            "Write a Dockerfile for a Python web app and explain each instruction and layer caching",
            "Build images and run containers with port mapping, environment variables and volumes",
            "Use the core Docker commands to inspect, debug and clean up"
          ],
          body: String.raw`
<h3>"It works on my machine"</h3>
<p>Your sentiment API works perfectly on your laptop. On the server it crashes: different Python version, a missing system library, a newer pandas. Virtual environments isolate Python packages, but not the Python version itself, the operating system, or system libraries. <strong>Docker</strong> packages your application <em>together with everything it needs to run</em> — OS libraries, the Python interpreter, packages, your code, and the start command — into one portable unit that runs identically on any machine with Docker: your laptop, a colleague's PC, a cloud server, or Kubernetes.</p>
<p>That is why Docker is the standard way to deploy ML models and AI apps. Cloud services like AWS ECS/SageMaker, Google Cloud Run and Azure Container Apps all run containers.</p>

<h3>Images and containers</h3>
<ul>
  <li>An <strong>image</strong> is a read-only template: a snapshot of a file system plus instructions on what to run. It's built once from a recipe called a <strong>Dockerfile</strong>.</li>
  <li>A <strong>container</strong> is a running instance of an image — an isolated process with its own file system, network and environment variables.</li>
</ul>
<p>You already know this relationship: an image is like a <strong>class</strong> and a container is like an <strong>instance</strong>. One image can start many containers. Another analogy: the image is a frozen meal in its packaging (identical everywhere); the container is that meal heated and served. Containers are <em>not</em> full virtual machines: they share the host's operating-system kernel, so they start in about a second and use little overhead.</p>
<p>Images are stored in <strong>registries</strong>. Docker Hub hosts official images such as <code>python:3.12-slim</code>; companies use private registries like AWS ECR or GitHub Container Registry.</p>

<h3>Installing Docker</h3>
<p>Install <strong>Docker Desktop</strong> on Windows (it uses WSL 2 underneath) or macOS, or Docker Engine on Linux (<code>sudo apt install docker.io</code> or Docker's official instructions). Check with <code>docker --version</code> and <code>docker run hello-world</code>, which downloads a tiny test image and runs it.</p>

<h3>A small Python app to containerise</h3>
<p>Here is a minimal web API built with <strong>FastAPI</strong> (you'll study it in depth in the deployment track). It reads its configuration from environment variables — exactly what containers expect:</p>
<pre><code class="lang-python"># main.py
import os
from fastapi import FastAPI

app = FastAPI()
MODEL_NAME = os.environ.get("MODEL_NAME", "keyword-v1")

@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_NAME}

@app.post("/predict")
def predict(payload: dict):
    text = payload.get("text", "").lower()
    label = "positive" if any(w in text for w in ["good", "great", "love"]) else "negative"
    return {"label": label}</code></pre>
<pre><code class="lang-text"># requirements.txt
fastapi==0.115.0
uvicorn==0.30.6</code></pre>
<p>Before containerising, test that the app logic works. FastAPI's <code>TestClient</code> sends requests to the app in-process, without a real server or network:</p>
<pre><code class="lang-python runnable">import os
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
MODEL_NAME = os.environ.get("MODEL_NAME", "keyword-v1")

@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_NAME}

@app.post("/predict")
def predict(payload: dict):
    text = payload.get("text", "").lower()
    label = "positive" if any(w in text for w in ["good", "great", "love"]) else "negative"
    return {"label": label}

client = TestClient(app)
print(client.get("/health").json())
r = client.post("/predict", json={"text": "I love this phone"})
print(r.status_code, r.json())
print(client.get("/missing").status_code)</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">{'status': 'ok', 'model': 'keyword-v1'}
200 {'label': 'positive'}
404</code></pre>
<p>Locally you would run the server with <code>uvicorn main:app --port 8000</code> and open <code>http://localhost:8000/health</code>.</p>

<h3>The Dockerfile</h3>
<p>Create a file named exactly <code>Dockerfile</code> (no extension) next to your code:</p>
<pre><code class="lang-dockerfile"># 1. Start from an official base image with Python preinstalled
FROM python:3.12-slim

# 2. Useful Python settings for containers
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3. All following commands run inside /app in the image
WORKDIR /app

# 4. Copy ONLY the dependency list first, then install (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Document the port the app listens on
EXPOSE 8000

# 7. The command run when a container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<p>What each instruction does:</p>
<ul>
  <li><code>FROM</code> picks the starting image. <code>-slim</code> variants are much smaller than the full image. Pin a version (<code>3.12</code>) for reproducibility.</li>
  <li><code>ENV</code> sets environment variables inside the image. <code>PYTHONUNBUFFERED=1</code> makes <code>print</code>/log output appear immediately in <code>docker logs</code>.</li>
  <li><code>WORKDIR</code> sets (and creates) the working directory.</li>
  <li><code>COPY src dest</code> copies files from your project (the <strong>build context</strong>) into the image.</li>
  <li><code>RUN</code> executes a command <em>while building</em> the image (installing packages).</li>
  <li><code>EXPOSE</code> documents the port; it doesn't publish it by itself.</li>
  <li><code>CMD</code> is the default command when the container <em>starts</em>. Note <code>--host 0.0.0.0</code>: inside a container the app must listen on all network interfaces, not just <code>127.0.0.1</code> (localhost), or it can't be reached from outside the container.</li>
</ul>

<h3>Layers and caching: why copy requirements.txt first?</h3>
<p>Each instruction creates a <strong>layer</strong>. Docker caches layers and reuses them on the next build if nothing they depend on changed. Installing packages is slow (minutes for PyTorch); copying code is fast. By copying <code>requirements.txt</code> and installing <em>before</em> copying the rest of the code, editing <code>main.py</code> only invalidates the last layers — the expensive install is reused. If you did <code>COPY . .</code> first, every code change would reinstall all packages.</p>

<h3>.dockerignore</h3>
<p>Like <code>.gitignore</code>, a <code>.dockerignore</code> file keeps things out of the build context — making builds faster, images smaller and, crucially, keeping secrets out of images:</p>
<pre><code class="lang-text">.venv/
__pycache__/
.git/
.env
data/
*.ipynb</code></pre>
<div class="callout warn"><strong>Never bake secrets into images.</strong> Anyone with the image can read every file and <code>ENV</code> value inside it. Don't <code>COPY .env</code> and don't write <code>ENV OPENAI_API_KEY=...</code> in a Dockerfile. Pass secrets at <em>run time</em> with <code>-e</code> or <code>--env-file</code>, or via your cloud's secret manager.</div>

<h3>Building and running</h3>
<pre><code class="lang-bash">docker build -t sentiment-api:1.0 .        # build an image from ./Dockerfile, tag it
docker images                               # list local images

docker run -d --name sentiment -p 8000:8000 \
  -e MODEL_NAME=keyword-v2 \
  sentiment-api:1.0                         # start a container in the background

curl http://localhost:8000/health           # {"status":"ok","model":"keyword-v2"}</code></pre>
<ul>
  <li><code>-t name:tag</code> names the image; the tag usually is a version. The final <code>.</code> is the build context (current folder).</li>
  <li><code>-d</code> runs detached (in the background); <code>--name</code> gives the container a friendly name.</li>
  <li><code>-p 8000:8000</code> <strong>publishes a port</strong>: <code>HOST:CONTAINER</code>. Requests to port 8000 on your machine are forwarded to port 8000 inside the container. <code>-p 9000:8000</code> would make it available at <code>localhost:9000</code> instead.</li>
  <li><code>-e NAME=value</code> sets an environment variable for that container; <code>--env-file .env</code> loads many (this is how API keys reach the app at runtime). Our app picked up <code>MODEL_NAME=keyword-v2</code> without any code change.</li>
</ul>

<h3>Everyday commands</h3>
<pre><code class="lang-bash">docker ps                      # running containers (add -a to include stopped)
docker logs -f sentiment       # follow the container's output (Ctrl+C to stop following)
docker exec -it sentiment bash # open a shell INSIDE the running container (debugging)
docker stop sentiment          # stop it
docker rm sentiment            # remove the stopped container
docker rmi sentiment-api:1.0   # remove the image
docker system prune            # clean up unused containers, networks, dangling images

# run a one-off command in a fresh, auto-removed container
docker run --rm python:3.12-slim python -c "print(2 + 2)"

# mount a host folder into the container (volume) so data persists
docker run --rm -v "$PWD/data:/app/data" sentiment-api:1.0 ls /app/data</code></pre>
<p>Containers are <strong>ephemeral</strong>: files written inside a container disappear when it is removed. To keep data (databases, uploaded files, downloaded model weights), use <strong>volumes</strong> (<code>-v host_path:container_path</code>) or external storage.</p>
<h3>Pushing to a registry and Docker Compose</h3>
<pre><code class="lang-bash">docker tag sentiment-api:1.0 yourname/sentiment-api:1.0
docker push yourname/sentiment-api:1.0     # after docker login</code></pre>
<p>Once in a registry, any server or cloud service can pull and run the exact same image. For apps made of several containers (an API plus a database plus a vector store), <strong>Docker Compose</strong> describes them in one <code>compose.yaml</code> file and starts them all with <code>docker compose up</code>:</p>
<pre><code class="lang-yaml">services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
  redis:
    image: redis:7</code></pre>
<div class="callout tip"><strong>Debugging checklist when a container "doesn't work":</strong> Is it running (<code>docker ps -a</code>)? What do the logs say (<code>docker logs name</code>)? Did you publish the port (<code>-p</code>)? Does the app listen on <code>0.0.0.0</code>? Are the environment variables set (<code>docker exec name env</code>)? Did you rebuild after changing code (<code>docker build</code> again)?</div>
`,
          keyPoints: [
            "Docker packages an app with its OS libraries, Python, packages and code so it runs identically anywhere.",
            "An image is a read-only template built from a Dockerfile; a container is a running instance of an image (like class and instance).",
            "Dockerfile essentials: FROM, WORKDIR, COPY requirements.txt + RUN pip install (cached layer), COPY . ., EXPOSE, CMD.",
            "docker build -t name:tag . builds; docker run -p HOST:CONTAINER -e KEY=value name:tag runs; the app must listen on 0.0.0.0.",
            "Never put secrets in images - use .dockerignore and pass them at run time; use volumes for data that must persist."
          ],
          exercise: {
            prompt: String.raw`<p>Containerise a tiny script-style app.</p>
<ol>
<li>Write <code>app.py</code> that reads <code>GREETING</code> (default <code>"Hello"</code>) and <code>TARGET</code> (default <code>"world"</code>) from the environment and prints <code>GREETING, TARGET!</code> and the Python version (<code>platform.python_version()</code>).</li>
<li>Write a Dockerfile based on <code>python:3.12-slim</code> that copies <code>app.py</code> and runs it.</li>
<li>Give the commands to build it as <code>greeter:1.0</code> and run it twice: once with defaults and once with <code>GREETING=Hi</code> and <code>TARGET=Docker</code>, removing the container automatically after it exits.</li>
</ol>
<p>Verify your <code>app.py</code> logic locally first (set the variables in Python for the test).</p>`,
            solution: String.raw`<pre><code class="lang-python runnable">import os
import platform

def main():
    greeting = os.environ.get("GREETING", "Hello")
    target = os.environ.get("TARGET", "world")
    print(f"{greeting}, {target}!")
    print("Python", platform.python_version().split(".")[0] + ".x")

main()                                   # defaults
os.environ["GREETING"] = "Hi"            # simulate: docker run -e GREETING=Hi ...
os.environ["TARGET"] = "Docker"
main()</code></pre>
<p class="output-label">Output</p>
<pre><code class="lang-text">Hello, world!
Python 3.x
Hi, Docker!
Python 3.x</code></pre>
<p>In the real <code>app.py</code>, keep just the <code>main()</code> function, call it under <code>if __name__ == "__main__":</code>, and print the full <code>platform.python_version()</code>. The Dockerfile:</p>
<pre><code class="lang-dockerfile">FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]</code></pre>
<pre><code class="lang-bash">docker build -t greeter:1.0 .
docker run --rm greeter:1.0
# Hello, world!
# Python 3.12.x
docker run --rm -e GREETING=Hi -e TARGET=Docker greeter:1.0
# Hi, Docker!
# Python 3.12.x</code></pre>
<p>No <code>requirements.txt</code> is needed because the app only uses the standard library. The container prints Python 3.12 even if your laptop runs 3.11 or 3.13 — the interpreter comes from the image, which is exactly the reproducibility Docker provides. <code>--rm</code> deletes each container when it exits, so finished runs don't pile up in <code>docker ps -a</code>. Configuration changed without rebuilding the image, purely through environment variables.</p>`
          },
          quiz: [
            { q: "What is the relationship between a Docker image and a container?", options: ["They are the same thing", "A container is a running instance of an image", "An image is a running container", "A container builds images"], answer: 1, explain: "Images are templates built from a Dockerfile; containers are running instances - like a class and its instances." },
            { q: "Why copy requirements.txt and run pip install before COPY . . ?", options: ["Docker requires that order", "So code changes don't invalidate the cached dependency-install layer", "To make the image run faster", "To hide requirements.txt"], answer: 1, explain: "Layer caching: the slow install layer is reused unless requirements.txt changes." },
            { q: "docker run -p 9000:8000 myapp - where do you reach the app?", options: ["localhost:8000", "localhost:9000", "localhost:17000", "Only inside the container"], answer: 1, explain: "The mapping is HOST:CONTAINER; host port 9000 forwards to the container's port 8000." },
            { q: "Where should an API key for a containerised app come from?", options: ["An ENV line in the Dockerfile", "A COPY of the .env file into the image", "Passed at run time with -e/--env-file or a secret manager", "Hard-coded in main.py"], answer: 2, explain: "Anything in the image can be read by whoever has it; inject secrets when the container starts." },
            { q: "Your API runs in a container but curl localhost:8000 fails, even with -p 8000:8000. A likely cause?", options: ["The app listens on 127.0.0.1 inside the container instead of 0.0.0.0", "Docker doesn't support HTTP", "The image is too small", "You need Python 2"], answer: 0, explain: "Inside a container, localhost is the container itself; the server must bind to 0.0.0.0 to accept forwarded traffic." }
          ]
        }
      ]
    }
  ]
});
