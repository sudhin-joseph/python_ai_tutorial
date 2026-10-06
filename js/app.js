/* AI/ML Academy — app shell: routing, rendering, quizzes, code blocks, search, progress. */
(function () {
  "use strict";

  const TRACKS = ((window.COURSE && window.COURSE.tracks) || []).slice().sort((a, b) => a.order - b.order);
  const STORE_KEY = "aiml-academy-v2";
  const THEME_KEY = "aiml-academy-theme";

  // ---------- Flat lesson index ----------
  const LESSONS = [];
  const LESSON_BY_ID = {};
  const TRACK_BY_ID = {};
  TRACKS.forEach((t) => {
    TRACK_BY_ID[t.id] = t;
    t.modules.forEach((m) => m.lessons.forEach((l) => {
      const entry = { lesson: l, module: m, track: t, index: LESSONS.length };
      LESSONS.push(entry);
      LESSON_BY_ID[l.id] = entry;
    }));
  });
  const trackLessons = (t) => LESSONS.filter((e) => e.track === t);

  // ---------- Persistence ----------
  function load() {
    try { return Object.assign({ done: {}, quiz: {}, last: null }, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); }
    catch (e) { return { done: {}, quiz: {}, last: null }; }
  }
  let state = load();
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }
  const isDone = (id) => !!state.done[id];
  const pct = (list) => list.length ? Math.round(list.filter((e) => isDone(e.lesson.id)).length / list.length * 100) : 0;

  // ---------- Helpers ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const stripHtml = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#36;/g, "$").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const fmtMinutes = (m) => m >= 60 ? (Math.floor(m / 60) + "h " + (m % 60 ? (m % 60) + "m" : "")).trim() : m + " min";
  const trackMinutes = (t) => trackLessons(t).reduce((s, e) => s + (e.lesson.minutes || 0), 0);
  const content = () => $("#content");
  function setCrumbs(parts) {
    $("#crumbs").innerHTML = parts.map((p) => p.href ? `<a href="${p.href}">${esc(p.label)}</a>` : esc(p.label)).join(" › ");
  }

  // ---------- Syntax highlighting ----------
  const PY_KW = new Set("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case self print len range".split(" "));
  function highlight(code, lang) {
    const out = [];
    let re;
    if (lang === "python") re = /(#[^\n]*)|([rbuf]{0,2}"""[\s\S]*?"""|[rbuf]{0,2}'''[\s\S]*?'''|[rbuf]{0,2}"(?:\\.|[^"\\\n])*"|[rbuf]{0,2}'(?:\\.|[^'\\\n])*')|(\b\d[\d_]*\.?\d*(?:e[+-]?\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/gi;
    else if (lang === "bash" || lang === "dockerfile" || lang === "yaml") re = /(#[^\n]*)|("(?:\\.|[^"\\\n])*"|'[^'\n]*')|(\b\d+\b)|(\$[A-Za-z_][A-Za-z0-9_]*)/g;
    else if (lang === "json") re = /()("(?:\\.|[^"\\])*")|(-?\b\d+\.?\d*(?:e[+-]?\d+)?\b|\btrue\b|\bfalse\b|\bnull\b)|()/g;
    else return esc(code);
    let last = 0, m;
    while ((m = re.exec(code))) {
      if (m[0] === "") { re.lastIndex++; continue; }
      out.push(esc(code.slice(last, m.index)));
      if (m[1]) out.push(`<span class="tok-com">${esc(m[1])}</span>`);
      else if (m[2]) out.push(`<span class="tok-str">${esc(m[2])}</span>`);
      else if (m[3]) out.push(`<span class="tok-num">${esc(m[3])}</span>`);
      else if (m[4]) {
        const w = m[4];
        if (lang === "python" && PY_KW.has(w)) out.push(`<span class="tok-kw">${esc(w)}</span>`);
        else if (lang === "python" && code[re.lastIndex] === "(") out.push(`<span class="tok-fn">${esc(w)}</span>`);
        else if (lang !== "python") out.push(`<span class="tok-kw">${esc(w)}</span>`);
        else out.push(esc(w));
      }
      last = re.lastIndex;
    }
    out.push(esc(code.slice(last)));
    return out.join("");
  }

  function enhanceCode(root) {
    $$("pre > code", root).forEach((codeEl) => {
      const pre = codeEl.parentElement;
      if (pre.parentElement.classList.contains("code-wrap")) return;
      const cls = codeEl.className || "";
      const lang = ((cls.match(/lang-([a-z]+)/) || [])[1]) || "text";
      const runnable = /\brunnable\b/.test(cls);
      const prev = pre.previousElementSibling;
      const isOutput = lang === "text" && prev && prev.classList.contains("output-label");
      const raw = codeEl.textContent;
      codeEl.innerHTML = highlight(raw, lang);
      const wrap = document.createElement("div");
      wrap.className = "code-wrap" + (isOutput ? " output" : "");
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      if (!isOutput) {
        const bar = document.createElement("div");
        bar.className = "code-bar";
        bar.innerHTML = `<span class="code-lang">${esc(lang)}</span>` +
          (runnable ? `<span class="code-verified" title="This example was executed during course validation">✓ tested</span>` : "") +
          `<button class="copy-btn" type="button" aria-label="Copy code to clipboard">Copy</button>`;
        wrap.insertBefore(bar, pre);
        $(".copy-btn", bar).addEventListener("click", function () {
          const done = () => { this.textContent = "Copied"; setTimeout(() => (this.textContent = "Copy"), 1400); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(raw).then(done, () => fallbackCopy(raw, done));
          else fallbackCopy(raw, done);
        });
      }
    });
  }
  function fallbackCopy(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta); cb();
  }

  // ---------- Sidebar ----------
  function renderSidebar(route) {
    const all = pct(LESSONS);
    $("#sidebarProgressFill").style.width = all + "%";
    const doneCount = LESSONS.filter((e) => isDone(e.lesson.id)).length;
    $("#sidebarProgressLabel").textContent = `${doneCount} / ${LESSONS.length} lessons · ${all}%`;

    let activeTrack = null, activeLesson = null;
    if (route.name === "track") activeTrack = TRACK_BY_ID[route.arg];
    if (route.name === "lesson" && LESSON_BY_ID[route.arg]) { activeLesson = LESSON_BY_ID[route.arg]; activeTrack = activeLesson.track; }

    let h = `<a class="nav-item ${route.name === "home" ? "active" : ""}" href="#/home"><span class="nav-icon">🏠</span><span class="nav-title">Dashboard</span></a>`;
    h += `<div class="nav-group-title">Learning path</div>`;
    TRACKS.forEach((t, i) => {
      const open = activeTrack === t;
      h += `<a class="nav-item ${route.name === "track" && open ? "active" : ""}" href="#/track/${t.id}">
        <span class="nav-icon">${esc(t.icon)}</span><span class="nav-title">${i + 1}. ${esc(t.title)}</span><span class="nav-pct">${pct(trackLessons(t))}%</span></a>`;
      if (open) {
        h += `<div class="nav-sub">`;
        t.modules.forEach((m) => {
          h += `<div class="nav-module">${esc(m.title)}</div>`;
          m.lessons.forEach((l) => {
            const act = activeLesson && activeLesson.lesson === l;
            h += `<a class="nav-lesson ${act ? "active" : ""}" href="#/lesson/${l.id}" ${act ? 'aria-current="page"' : ""}>
              <span class="chk">${isDone(l.id) ? "✓" : "•"}</span><span>${esc(l.title)}</span></a>`;
          });
        });
        h += `</div>`;
      }
    });
    h += `<div class="nav-group-title">More</div>
      <a class="nav-item ${route.name === "references" ? "active" : ""}" href="#/references"><span class="nav-icon">📚</span><span class="nav-title">Books &amp; references</span></a>`;
    $("#navList").innerHTML = h;
    const act = $(".nav-lesson.active");
    if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest" });
  }

  // ---------- Dashboard ----------
  function nextLesson() {
    if (state.last && LESSON_BY_ID[state.last] && !isDone(state.last)) return LESSON_BY_ID[state.last];
    return LESSONS.find((e) => !isDone(e.lesson.id)) || LESSONS[0];
  }
  function renderDashboard() {
    const nl = nextLesson();
    const totalMin = LESSONS.reduce((s, e) => s + (e.lesson.minutes || 0), 0);
    const quizCount = LESSONS.reduce((s, e) => s + (e.lesson.quiz || []).length, 0);
    const doneCount = LESSONS.filter((e) => isDone(e.lesson.id)).length;
    let h = `<section class="hero">
      <h1>AI/ML Academy: from first line of Python to deployed AI apps</h1>
      <p>A self-contained course for beginners. Every concept is taught here — Python, the math, machine learning,
      deep learning, production MLOps, AI engineering with LLMs — and you finish by building and deploying real
      applications with <strong>OpenAI</strong> and <strong>AWS</strong>. Work through the tracks in order; each lesson has
      explanations, tested code you can copy, a hands-on exercise with a worked solution, and a quiz.</p>
      ${nl ? `<div class="lesson-actions"><a class="btn primary" href="#/lesson/${nl.lesson.id}">${doneCount ? "Continue" : "Start"}: ${esc(nl.lesson.title)} →</a></div>` : ""}
    </section>
    <div class="stat-row">
      <div class="stat"><div class="n">${TRACKS.length}</div><div class="l">tracks</div></div>
      <div class="stat"><div class="n">${LESSONS.length}</div><div class="l">lessons</div></div>
      <div class="stat"><div class="n">${quizCount}</div><div class="l">quiz questions</div></div>
      <div class="stat"><div class="n">~${Math.round(totalMin / 60)}h</div><div class="l">study time</div></div>
      <div class="stat"><div class="n">${pct(LESSONS)}%</div><div class="l">your progress</div></div>
    </div>
    <h2 style="font-size:1.15rem;margin:1.6rem 0 .8rem;">Your learning path</h2>
    <div class="track-grid">`;
    TRACKS.forEach((t, i) => {
      const tl = trackLessons(t);
      h += `<a class="track-card" href="#/track/${t.id}">
        <div class="top"><span class="ico" aria-hidden="true">${esc(t.icon)}</span><span class="step">Step ${i + 1} · ${esc(t.level)}</span></div>
        <h3>${esc(t.title)}</h3><p>${esc(t.description)}</p>
        <div class="progress-track" aria-label="${pct(tl)}% complete"><div class="progress-fill" style="width:${pct(tl)}%"></div></div>
        <div class="meta">${t.modules.length} modules · ${tl.length} lessons · ~${fmtMinutes(trackMinutes(t))} · ${pct(tl)}% done</div>
      </a>`;
    });
    h += `</div>
    <div class="card"><h2>How to study with this course</h2>
      <ul>
        <li><strong>Go in order.</strong> Tracks 1–4 build the foundations (Python → data &amp; math → ML → deep learning). Tracks 5–6 teach how real AI systems are engineered. Tracks 7–8 are hands-on cloud development with OpenAI and AWS. The capstones tie it all together.</li>
        <li><strong>Type the code yourself.</strong> Blocks marked <em>✓ tested</em> were executed when the course was built — they run as shown with Python 3.12 and the libraries listed in Track 1.</li>
        <li><strong>Do the exercise before opening the solution</strong>, then take the quiz. Mark a lesson complete when you can explain its key points without notes.</li>
        <li><strong>Budget</strong> roughly 6–10 hours per week; the whole path takes about ${Math.round(totalMin / 60 / 8)}–${Math.round(totalMin / 60 / 6)} weeks at that pace.</li>
      </ul>
    </div>`;
    content().innerHTML = h;
    setCrumbs([{ label: "Dashboard" }]);
  }

  // ---------- Track page ----------
  function renderTrack(id) {
    const t = TRACK_BY_ID[id];
    if (!t) return renderDashboard();
    const tl = trackLessons(t);
    const first = tl.find((e) => !isDone(e.lesson.id)) || tl[0];
    let n = 0;
    let h = `<div class="eyebrow">Step ${TRACKS.indexOf(t) + 1} of ${TRACKS.length}</div>
      <h1 class="page-title"><span aria-hidden="true">${esc(t.icon)}</span> ${esc(t.title)}</h1>
      <div class="badges"><span class="badge level">${esc(t.level)}</span><span class="badge">${t.modules.length} modules</span>
        <span class="badge">${tl.length} lessons</span><span class="badge">~${fmtMinutes(trackMinutes(t))}</span><span class="badge">${pct(tl)}% complete</span></div>
      <p>${esc(t.description)}</p>
      <div class="card"><h2>By the end of this track you will be able to</h2><ul>${t.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
      ${first ? `<a class="btn primary" href="#/lesson/${first.lesson.id}">${pct(tl) ? "Continue" : "Start"} track →</a>` : ""}</div>`;
    t.modules.forEach((m, mi) => {
      h += `<div class="card module-block"><h3>Module ${mi + 1}: ${esc(m.title)}</h3><p class="sum">${esc(m.summary)}</p>`;
      m.lessons.forEach((l) => {
        n++;
        h += `<a class="lesson-row ${isDone(l.id) ? "done" : ""}" href="#/lesson/${l.id}"><span class="ln">${isDone(l.id) ? "✓" : n}</span>
          <span class="lt">${esc(l.title)}</span><span class="lm">${fmtMinutes(l.minutes || 0)}</span></a>`;
      });
      h += `</div>`;
    });
    content().innerHTML = h;
    setCrumbs([{ label: "Dashboard", href: "#/home" }, { label: t.title }]);
  }

  // ---------- Lesson page ----------
  function renderLesson(id) {
    const e = LESSON_BY_ID[id];
    if (!e) return renderDashboard();
    const { lesson: l, module: m, track: t } = e;
    state.last = l.id; save();
    const prev = LESSONS[e.index - 1], next = LESSONS[e.index + 1];
    const tl = trackLessons(t);
    const posInTrack = tl.indexOf(e) + 1;

    let h = `<article>
      <div class="eyebrow">${esc(t.title)} · ${esc(m.title)}</div>
      <h1 class="page-title">${esc(l.title)}</h1>
      <div class="badges"><span class="badge level">${esc(t.level)}</span><span class="badge">⏱ ${fmtMinutes(l.minutes || 0)}</span>
        <span class="badge">Lesson ${posInTrack} of ${tl.length}</span>${isDone(l.id) ? '<span class="badge" style="color:var(--good)">✓ Completed</span>' : ""}</div>
      <section class="objectives" aria-labelledby="obj-h"><h2 id="obj-h">What you'll learn</h2><ul>${(l.objectives || []).map((o) => `<li>${esc(o)}</li>`).join("")}</ul></section>
      <div class="lesson-body">${l.body || ""}</div>`;
    if (l.keyPoints && l.keyPoints.length) {
      h += `<section class="keypoints card" aria-labelledby="kp-h"><h2 id="kp-h">Key points</h2><ul>${l.keyPoints.map((k) => `<li>${esc(k)}</li>`).join("")}</ul></section>`;
    }
    if (l.exercise) {
      h += `<section class="card" aria-labelledby="ex-h"><h2 id="ex-h">🛠️ Hands-on exercise</h2><div class="lesson-body">${l.exercise.prompt || ""}</div>
        <button class="btn" id="solBtn" type="button" aria-expanded="false" aria-controls="solution">Show solution</button>
        <div class="solution lesson-body" id="solution">${l.exercise.solution || ""}</div></section>`;
    }
    if (l.quiz && l.quiz.length) {
      const best = state.quiz[l.id];
      h += `<section class="card" aria-labelledby="qz-h"><h2 id="qz-h">❓ Check your understanding</h2><form id="quizForm">`;
      l.quiz.forEach((q, qi) => {
        h += `<fieldset class="quiz-q" data-q="${qi}"><legend>${qi + 1}. ${esc(q.q)}</legend>`;
        q.options.forEach((o, oi) => {
          h += `<label class="quiz-opt"><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`;
        });
        h += `<div class="quiz-explain" id="exp${qi}" role="status"></div></fieldset>`;
      });
      h += `<button class="btn primary" type="submit">Check answers</button><button class="btn" type="button" id="quizReset" style="margin-left:.5rem">Reset</button>
        <span class="quiz-score" id="quizScore" aria-live="polite">${best ? `Best score: ${best.score}/${best.total}` : ""}</span></form></section>`;
    }
    if (l.furtherReading && l.furtherReading.length) {
      h += `<section class="card reading"><h2>Optional further reading</h2>${l.furtherReading.map((r) =>
        `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a>`).join("")}</section>`;
    }
    h += `<div class="lesson-actions">
        <button class="btn ${isDone(l.id) ? "done" : ""}" id="doneBtn" type="button">${isDone(l.id) ? "✓ Completed" : "Mark lesson complete"}</button>
        ${next ? `<button class="btn primary" id="doneNextBtn" type="button">Complete &amp; continue →</button>` : ""}
      </div>
      <nav class="pager" aria-label="Lesson navigation">
        ${prev ? `<a class="prev" href="#/lesson/${prev.lesson.id}"><div class="dir">← Previous</div><div class="t">${esc(prev.lesson.title)}</div></a>` : ""}
        ${next ? `<a class="next" href="#/lesson/${next.lesson.id}"><div class="dir">Next${next.track !== t ? " track" : ""} →</div><div class="t">${esc(next.lesson.title)}</div></a>` : ""}
      </nav></article>`;
    content().innerHTML = h;
    setCrumbs([{ label: "Dashboard", href: "#/home" }, { label: t.title, href: "#/track/" + t.id }, { label: l.title }]);
    enhanceCode(content());
    $$(".lesson-body a[href^='http']", content()).forEach((a) => { a.target = "_blank"; a.rel = "noopener noreferrer"; });

    const solBtn = $("#solBtn");
    if (solBtn) solBtn.addEventListener("click", () => {
      const s = $("#solution"); const shown = s.classList.toggle("shown");
      solBtn.textContent = shown ? "Hide solution" : "Show solution";
      solBtn.setAttribute("aria-expanded", String(shown));
    });

    const form = $("#quizForm");
    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        let score = 0;
        l.quiz.forEach((q, qi) => {
          const fs = $(`fieldset[data-q="${qi}"]`, form);
          const chosen = $(`input[name="q${qi}"]:checked`, fs);
          $$(".quiz-opt", fs).forEach((lab, oi) => {
            lab.classList.remove("correct", "wrong");
            if (oi === q.answer) lab.classList.add("correct");
            else if (chosen && Number(chosen.value) === oi) lab.classList.add("wrong");
          });
          const ok = chosen && Number(chosen.value) === q.answer;
          if (ok) score++;
          const exp = $(`#exp${qi}`, fs);
          exp.textContent = (chosen ? (ok ? "Correct. " : "Not quite. ") : "No answer selected. ") + q.explain;
          exp.classList.add("shown");
        });
        const prevBest = state.quiz[l.id];
        if (!prevBest || score > prevBest.score) { state.quiz[l.id] = { score, total: l.quiz.length }; save(); }
        $("#quizScore").textContent = `Score: ${score}/${l.quiz.length}` + (score === l.quiz.length ? " — perfect!" : " — review the explanations and try again.");
      });
      $("#quizReset").addEventListener("click", () => {
        form.reset();
        $$(".quiz-opt", form).forEach((x) => x.classList.remove("correct", "wrong"));
        $$(".quiz-explain", form).forEach((x) => { x.classList.remove("shown"); x.textContent = ""; });
        $("#quizScore").textContent = "";
      });
    }

    const setDone = (v) => { state.done[l.id] = v; if (!v) delete state.done[l.id]; save(); };
    $("#doneBtn").addEventListener("click", () => {
      setDone(!isDone(l.id));
      renderLesson(l.id); renderSidebar({ name: "lesson", arg: l.id });
    });
    const dn = $("#doneNextBtn");
    if (dn) dn.addEventListener("click", () => { setDone(true); location.hash = "#/lesson/" + next.lesson.id; });
    window.scrollTo(0, 0);
  }

  // ---------- Search ----------
  const INDEX = LESSONS.map((e) => ({
    e,
    title: e.lesson.title.toLowerCase(),
    text: stripHtml([e.lesson.body, (e.lesson.keyPoints || []).join(" "), (e.lesson.objectives || []).join(" ")].join(" ")),
  }));
  function renderSearch(q) {
    const query = (q || "").trim();
    const terms = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    let results = [];
    if (terms.length) {
      results = INDEX.map((it) => {
        const lower = it.text.toLowerCase();
        let score = 0;
        for (const w of terms) {
          if (it.title.includes(w)) score += 10;
          let i = -1, c = 0; while ((i = lower.indexOf(w, i + 1)) !== -1 && c < 20) c++;
          if (!c && !it.title.includes(w)) return null;
          score += c;
        }
        const at = Math.max(0, lower.indexOf(terms[0]) - 80);
        let snip = esc(it.text.slice(at, at + 220));
        terms.forEach((w) => { snip = snip.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); });
        return { it, score, snip: (at ? "…" : "") + snip + "…" };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 40);
    }
    let h = `<h1 class="page-title">Search</h1><form id="searchPageForm" role="search"><input id="searchPageInput" class="btn" style="width:100%;padding:.7rem" value="${esc(query)}" placeholder="Search all lessons (e.g. gradient descent, embeddings, Lambda)" aria-label="Search lessons"></form>`;
    h += `<p style="color:var(--muted)">${terms.length ? `${results.length} result${results.length === 1 ? "" : "s"} for “${esc(query)}”` : "Type at least two letters."}</p><div class="card">`;
    h += results.map((r) => `<a class="search-result" href="#/lesson/${r.it.e.lesson.id}"><div class="st">${esc(r.it.e.lesson.title)}</div>
      <div class="sp">${esc(r.it.e.track.title)} › ${esc(r.it.e.module.title)}</div><div class="ss">${r.snip}</div></a>`).join("") || "<p>No matching lessons.</p>";
    h += `</div>`;
    content().innerHTML = h;
    setCrumbs([{ label: "Dashboard", href: "#/home" }, { label: "Search" }]);
    $("#searchPageForm").addEventListener("submit", (ev) => { ev.preventDefault(); location.hash = "#/search/" + encodeURIComponent($("#searchPageInput").value); });
  }

  // ---------- References ----------
  function renderReferences() {
    let h = `<h1 class="page-title">Books &amp; references</h1>
      <p>The course is self-contained, but it is built on three books (look for the purple “book” callouts inside lessons that
      point to the matching chapter) and on the official OpenAI and AWS documentation. Links below are optional extras.</p>
      <div class="book-list">
        <div class="book-item"><div class="tag">Book</div><h4>Designing Machine Learning Systems</h4><p>Chip Huyen — basis of Track 5 (production ML &amp; MLOps) and parts of Track 3.</p></div>
        <div class="book-item"><div class="tag">Book</div><h4>AI Engineering</h4><p>Chip Huyen — basis of Track 6 (applications on foundation models) and parts of Track 4.</p></div>
        <div class="book-item"><div class="tag">Book</div><h4>Generative AI on AWS</h4><p>Fregly &amp; Barth — basis of Track 8 (AWS) and parts of Track 6.</p></div>
      </div>`;
    TRACKS.forEach((t) => {
      const links = [];
      trackLessons(t).forEach((e) => (e.lesson.furtherReading || []).forEach((r) => { if (!links.some((x) => x.url === r.url)) links.push(r); }));
      if (!links.length) return;
      h += `<div class="card reading"><h2>${esc(t.icon)} ${esc(t.title)}</h2>${links.map((r) =>
        `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a>`).join("")}</div>`;
    });
    content().innerHTML = h;
    setCrumbs([{ label: "Dashboard", href: "#/home" }, { label: "Books & references" }]);
  }

  // ---------- Router ----------
  function parseRoute() {
    const h = location.hash || "#/home";
    const m = h.match(/^#\/(\w+)(?:\/(.*))?$/);
    if (!m) return { name: "home" };
    return { name: m[1], arg: m[2] ? decodeURIComponent(m[2]) : "" };
  }
  function router() {
    const r = parseRoute();
    $("#sidebar").classList.remove("open"); $("#overlay").classList.remove("show");
    if (r.name === "track") renderTrack(r.arg);
    else if (r.name === "lesson") renderLesson(r.arg);
    else if (r.name === "search") renderSearch(r.arg);
    else if (r.name === "references") renderReferences();
    else { r.name = "home"; renderDashboard(); }
    renderSidebar(r);
    if (r.name !== "lesson") window.scrollTo(0, 0);
    const h1 = $("#content h1");
    document.title = (h1 ? h1.textContent.trim() + " · " : "") + "AI/ML Academy";
  }

  // ---------- Theme ----------
  function applyTheme(mode) {
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    const b = $("#themeToggle"); if (b) b.textContent = "Theme: " + mode;
  }
  let theme = "system";
  try { theme = localStorage.getItem(THEME_KEY) || "system"; } catch (e) { /* ignore */ }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(theme);
    $("#themeToggle").addEventListener("click", () => {
      const order = ["system", "light", "dark"];
      theme = order[(order.indexOf(theme) + 1) % order.length];
      applyTheme(theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
    });
    $("#menuToggle").addEventListener("click", () => { $("#sidebar").classList.add("open"); $("#overlay").classList.add("show"); });
    $("#overlay").addEventListener("click", () => { $("#sidebar").classList.remove("open"); $("#overlay").classList.remove("show"); });
    $("#searchForm").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const q = $("#searchInput").value.trim();
      if (q) location.hash = "#/search/" + encodeURIComponent(q);
    });
    window.addEventListener("hashchange", router);
    router();
  });
})();
