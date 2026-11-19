// MIDNIGHT CINEMA // ROULETTE
// Single-file Node.js app, no dependencies. Run: node index.js  ->  http://localhost:8080

const http = require("http");

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const startTime = Date.now();

const movies = [
  { id: 1, title: "Cyber Rain", genre: "Sci-Fi", year: 1988, description: "A rogue detective hunts replicants through neon-soaked alleys.", c1: "#0f766e", c2: "#042f2e", accent: "#2dd4bf" },
  { id: 2, title: "The Crimson Manor", genre: "Horror", year: 1979, description: "Seven strangers inherit a mansion where the clocks run backward.", c1: "#881337", c2: "#1c0a10", accent: "#fda4af" },
  { id: 3, title: "Solaris Express", genre: "Adventure", year: 1983, description: "A smuggler crew races a collapsing star to deliver a secret cargo.", c1: "#9a3412", c2: "#1c1917", accent: "#fdba74" },
  { id: 4, title: "Velvet Alibi", genre: "Noir", year: 1974, description: "One rainy night, a jazz pianist witnesses the wrong heist.", c1: "#3730a3", c2: "#090d16", accent: "#a5b4fc" },
  { id: 5, title: "Chrono Drift", genre: "Sci-Fi", year: 1991, description: "Two scientists accidentally loop the same Tuesday in Tokyo.", c1: "#6b21a8", c2: "#130722", accent: "#e879f9" },
  { id: 6, title: "Hollow Pines", genre: "Horror", year: 1985, description: "Park rangers discover a radio tower broadcasting from 1952.", c1: "#166534", c2: "#052e16", accent: "#86efac" },
  { id: 7, title: "Mirage Gold", genre: "Adventure", year: 1981, description: "An archaeologist deciphers a map hidden inside a sunken temple.", c1: "#854d0e", c2: "#1c1917", accent: "#fde047" },
  { id: 8, title: "Glass Harbor", genre: "Noir", year: 1977, description: "A missing shipyard ledger ties the mayor to a phantom freighter.", c1: "#075985", c2: "#082f49", accent: "#7dd3fc" }
];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MIDNIGHT CINEMA // ROULETTE</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: radial-gradient(circle at top, #134e4a, #060b14 60%);
    color: #f0fdfa;
    font-family: "Courier New", monospace;
    padding: 30px 6%;
  }
  header { text-align: center; margin-bottom: 30px; }
  h1 { font-size: clamp(1.8rem, 5vw, 3rem); letter-spacing: 4px; color: #2dd4bf; text-shadow: 0 0 14px #0d9488; }
  .sub { color: #99f6e4; margin-top: 8px; }
  .uptime { color: #64748b; font-size: .85rem; margin-top: 6px; }
  .stage { max-width: 420px; margin: 0 auto 34px; text-align: center; }
  .screen {
    position: relative; overflow: hidden;
    aspect-ratio: 2 / 3; border-radius: 14px; border: 2px solid #2dd4bf;
    box-shadow: 0 0 30px rgba(13,148,136,.45); display: flex; flex-direction: column;
    justify-content: flex-end; padding: 22px; margin-bottom: 18px; transition: background .12s;
    background: linear-gradient(160deg, #115e59, #060b14);
  }
  .screen > .art, .thumb { position: absolute; inset: 0; }
  .screen > .art svg, .thumb svg { width: 100%; height: 100%; display: block; }
  .screen > .art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,8,16,.92), rgba(4,8,16,0) 65%); }
  .screen > *:not(.art) { position: relative; z-index: 2; }
  .thumb { position: relative; aspect-ratio: 3 / 2; border-radius: 8px; overflow: hidden; margin-bottom: 10px; }
  .screen h2 { font-size: 1.7rem; letter-spacing: 2px; margin-bottom: 6px; }
  .screen p { color: #ccfbf1; }
  .screen .meta { font-size: .8rem; letter-spacing: 3px; margin-bottom: 8px; }
  button {
    font: inherit; cursor: pointer; border-radius: 10px; padding: 12px 22px; font-weight: 700;
    background: #0d9488; color: #fff; border: none; margin: 4px; letter-spacing: 2px;
  }
  button.alt { background: transparent; border: 1px solid #5eead4; color: #ccfbf1; }
  button:hover { filter: brightness(1.2); }
  button:disabled { opacity: .5; cursor: wait; }
  .toolbar { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
  .chip { padding: 6px 14px; border-radius: 999px; border: 1px solid #0f766e; cursor: pointer; color: #99f6e4; }
  .chip.active { background: #0f766e; color: #fff; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 1000px; margin: 0 auto; }
  .card { border: 1px solid #115e59; border-radius: 12px; padding: 16px; background: rgba(10,18,28,.82); }
  .card h3 { margin: 4px 0; }
  .card small { color: #5eead4; }
  .card p { color: #cbd5e1; margin-top: 8px; font-size: .9rem; }
  .history { max-width: 420px; margin: 0 auto 30px; color: #5eead4; font-size: .9rem; text-align: center; }
  footer { text-align: center; color: #64748b; margin-top: 40px; font-size: .85rem; }
</style>
</head>
<body>
<header>
  <h1>MIDNIGHT CINEMA</h1>
  <div class="sub">Can't decide what to watch tonight? Spin the reel.</div>
  <div class="uptime">SERVER UPTIME <span id="uptime">00:00:00</span></div>
</header>

<section class="stage">
  <div class="screen" id="screen">
    <div class="art" id="art"></div>
    <div class="meta" id="meta">INSERT TICKET</div>
    <h2 id="title">???</h2>
    <p id="desc">Spin the roulette to pick a midnight cult classic.</p>
  </div>
  <button id="spin">SPIN REEL</button>
  <button class="alt" id="clear">CLEAR HISTORY</button>
</section>

<div class="history" id="history"></div>
<div class="toolbar" id="filters"></div>
<div class="grid" id="grid"></div>

<footer>MIDNIGHT CINEMA // ROULETTE • Built with plain Node.js</footer>

<script>
  const movies = ${JSON.stringify(movies)};
  let genre = "All";
  let history = [];
  try { history = JSON.parse(localStorage.getItem("cinemaHistory") || "[]"); } catch (e) { history = []; }
  if (!Array.isArray(history)) history = [];

  const $ = (id) => document.getElementById(id);
  const kinds = { 1: "city", 2: "manor", 3: "planet", 4: "noir", 5: "portal", 6: "forest", 7: "temple", 8: "harbor" };
  let uid = 0;

  function rng(seed) {
    let s = seed * 9301 + 49297;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function artSVG(m) {
    const R = rng(m.id * 11 + 5);
    const id = "m" + m.id + "_" + (uid++);
    const a = m.accent;
    let s = '<svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    s += '<defs><linearGradient id="b' + id + '" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="' + m.c1 + '"/><stop offset="1" stop-color="' + m.c2 + '"/></linearGradient>';
    s += '<radialGradient id="o' + id + '"><stop offset="0" stop-color="' + a + '" stop-opacity="0.9"/><stop offset="1" stop-color="' + a + '" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="200" height="300" fill="url(#b' + id + ')"/>';

    for (let i = 0; i < 35; i++) {
      s += '<circle cx="' + (R() * 200).toFixed(1) + '" cy="' + (R() * 160).toFixed(1) + '" r="' + (R() + 0.3).toFixed(2) + '" fill="#fff" opacity="' + (0.2 + R() * 0.6).toFixed(2) + '"/>';
    }

    const k = kinds[m.id];
    if (k === "city") {
      for (let i = 0; i < 7; i++) {
        const h = 90 + R() * 110;
        s += '<rect x="' + (10 + i * 27) + '" y="' + (300 - h) + '" width="22" height="' + h + '" fill="#020617"/>';
        s += '<rect x="' + (14 + i * 27) + '" y="' + (310 - h) + '" width="4" height="4" fill="' + a + '"/>';
      }
      for (let i = 0; i < 18; i++) {
        const x = R() * 200, y = R() * 260;
        s += '<line x1="' + x.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + (x - 6).toFixed(1) + '" y2="' + (y + 18).toFixed(1) + '" stroke="' + a + '" stroke-opacity="0.45"/>';
      }
    } else if (k === "manor") {
      s += '<circle cx="150" cy="70" r="28" fill="url(#o' + id + ')"/><circle cx="150" cy="70" r="16" fill="' + a + '"/>';
      s += '<polygon points="40,220 100,145 160,220" fill="#09050d"/><rect x="52" y="220" width="96" height="80" fill="#09050d"/>';
      s += '<rect x="92" y="245" width="16" height="24" fill="' + a + '"/>';
    } else if (k === "planet") {
      s += '<circle cx="100" cy="135" r="56" fill="url(#o' + id + ')"/><circle cx="100" cy="135" r="36" fill="' + a + '"/>';
      s += '<ellipse cx="100" cy="135" rx="74" ry="16" fill="none" stroke="#fff" stroke-width="3" opacity="0.75" transform="rotate(-18 100 135)"/>';
    } else if (k === "noir") {
      s += '<polygon points="100,30 30,300 170,300" fill="url(#o' + id + ')" opacity="0.5"/>';
      s += '<circle cx="100" cy="175" r="14" fill="#020617"/><rect x="84" y="190" width="32" height="75" rx="8" fill="#020617"/>';
    } else if (k === "portal") {
      for (let r = 75; r > 10; r -= 14) {
        s += '<circle cx="100" cy="145" r="' + r + '" fill="none" stroke="' + a + '" stroke-width="2.5" opacity="' + (1 - r / 90).toFixed(2) + '"/>';
      }
    } else if (k === "forest") {
      for (let i = 0; i < 8; i++) {
        const x = 15 + i * 25;
        s += '<polygon points="' + x + ',150 ' + (x - 16) + ',300 ' + (x + 16) + ',300" fill="#02140a"/>';
      }
      s += '<line x1="100" y1="95" x2="100" y2="300" stroke="' + a + '" stroke-width="3"/><circle cx="100" cy="95" r="8" fill="' + a + '"/>';
    } else if (k === "temple") {
      s += '<circle cx="100" cy="115" r="38" fill="' + a + '"/>';
      s += '<polygon points="30,300 170,300 140,185 60,185" fill="#1c1408"/><rect x="86" y="210" width="28" height="90" fill="#000"/>';
    } else if (k === "harbor") {
      s += '<circle cx="65" cy="90" r="24" fill="url(#o' + id + ')"/>';
      s += '<rect x="0" y="215" width="200" height="85" fill="#041524"/>';
      for (let y = 225; y < 295; y += 14) {
        s += '<line x1="40" y1="' + y + '" x2="90" y2="' + y + '" stroke="' + a + '" stroke-width="2" opacity="0.6"/>';
      }
    }

    s += '<rect x="6" y="6" width="188" height="288" fill="none" stroke="' + a + '" stroke-opacity="0.35"/></svg>';
    return s;
  }

  function artNode(m) {
    const d = document.createElement("div");
    d.style.cssText = "width:100%;height:100%";
    d.innerHTML = artSVG(m);
    return d;
  }

  function show(m) {
    $("art").innerHTML = "";
    $("art").appendChild(artNode(m));
    $("screen").style.background = "linear-gradient(160deg," + m.c1 + "," + m.c2 + ")";
    $("screen").style.borderColor = m.accent;
    $("meta").textContent = m.genre.toUpperCase() + " • " + m.year;
    $("meta").style.color = m.accent;
    $("title").textContent = m.title.toUpperCase();
    $("desc").textContent = m.description;
  }

  function pool() {
    return movies.filter((m) => genre === "All" || m.genre === genre);
  }

  function renderHistory() {
    $("history").textContent = history.length
      ? "Recent features: " + history.slice(-5).reverse().join(" → ")
      : "No reels spun yet.";
  }

  function spin() {
    const list = pool();
    if (!list.length) return;
    $("spin").disabled = true;
    let ticks = 0;
    const timer = setInterval(() => {
      show(list[Math.floor(Math.random() * list.length)]);
      ticks++;
      if (ticks > 14) {
        clearInterval(timer);
        const pick = list[Math.floor(Math.random() * list.length)];
        show(pick);
        history.push(pick.title);
        history = history.slice(-20);
        try { localStorage.setItem("cinemaHistory", JSON.stringify(history)); } catch (e) {}
        renderHistory();
        $("spin").disabled = false;
      }
    }, 80);
  }

  function renderFilters() {
    const genres = ["All", ...new Set(movies.map((m) => m.genre))];
    $("filters").innerHTML = "";
    genres.forEach((name) => {
      const chip = document.createElement("span");
      chip.className = "chip" + (name === genre ? " active" : "");
      chip.textContent = name;
      chip.addEventListener("click", () => { genre = name; renderFilters(); renderGrid(); });
      $("filters").appendChild(chip);
    });
  }

  function renderGrid() {
    $("grid").innerHTML = "";
    pool().forEach((m) => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.borderColor = m.accent;
      const small = document.createElement("small");
      small.textContent = m.genre + " • " + m.year;
      const h3 = document.createElement("h3");
      h3.textContent = m.title;
      const p = document.createElement("p");
      p.textContent = m.description;
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.appendChild(artNode(m));
      card.append(thumb, small, h3, p);
      $("grid").appendChild(card);
    });
  }

  function tickUptime() {
    fetch("/api/status").then((r) => r.json()).then((d) => {
      const s = d.uptimeSeconds;
      const pad = (n) => String(n).padStart(2, "0");
      $("uptime").textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor((s % 3600) / 60)) + ":" + pad(s % 60);
    }).catch(() => {});
  }

  $("spin").addEventListener("click", spin);
  $("clear").addEventListener("click", () => {
    history = [];
    try { localStorage.removeItem("cinemaHistory"); } catch (e) {}
    renderHistory();
  });

  show(movies[0]);
  renderFilters();
  renderGrid();
  renderHistory();
  tickUptime();
  setInterval(tickUptime, 1000);
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];

  if (url === "/api/status") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, uptimeSeconds: Math.floor((Date.now() - startTime) / 1000) }));
    return;
  }

  if (url === "/api/movies") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(movies));
    return;
  }

  if (url === "/api/random") {
    const pick = movies[Math.floor(Math.random() * movies.length)];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(pick));
    return;
  }

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, HOST, () => {
  console.log(\`Midnight Cinema running on http://\${HOST}:\${PORT}\`);
});
