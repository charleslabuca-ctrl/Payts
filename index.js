
const http = require("http");

const PORT = process.env.PORT || 8080;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>COLOR RUSH - Mini Game</title>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    background: radial-gradient(circle at top, #202b55, #090d1c);
    color: white;
    font-family: Arial, sans-serif;
    padding: 30px 16px;
}

main {
    max-width: 900px;
    margin: auto;
}

header {
    text-align: center;
    margin: 20px 0 30px;
}

h1 {
    font-size: 55px;
    margin: 15px 0;
    letter-spacing: 3px;
}

h1 span {
    color: #67e8f9;
}

.subtitle {
    color: #aab4d0;
}

.panel {
    background: #121a33;
    border: 1px solid #35416c;
    border-radius: 20px;
    padding: 25px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 25px;
}

.stat {
    background: #0d1530;
    border-radius: 12px;
    text-align: center;
    padding: 15px;
}

.stat small {
    display: block;
    color: #9ba9ce;
    margin-bottom: 8px;
}

.stat strong {
    font-size: 28px;
}

.instruction {
    text-align: center;
    margin: 20px 0;
    color: #cbd5e1;
}

.color-name {
    text-align: center;
    font-size: 55px;
    font-weight: bold;
    margin: 25px 0;
}

.choices {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.choice {
    height: 100px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}

.choice:disabled {
    cursor: not-allowed;
    opacity: .7;
}

.choice:hover:not(:disabled) {
    transform: scale(1.03);
}

.controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 25px;
}

button {
    cursor: pointer;
}

.primary, .secondary {
    padding: 14px 22px;
    border-radius: 10px;
    font-weight: bold;
    border: none;
}

.primary {
    background: #67e8f9;
    color: #07111f;
}

.secondary {
    background: transparent;
    color: white;
    border: 1px solid #52618e;
}

.feedback {
    text-align: center;
    margin-top: 20px;
    min-height: 25px;
    font-weight: bold;
}

.rules {
    text-align: center;
    color: #9eaccd;
    margin-top: 20px;
    font-size: 13px;
}

footer {
    text-align: center;
    color: #657292;
    margin-top: 25px;
}

@media(max-width:480px) {
    h1 {
        font-size: 38px;
    }

    .color-name {
        font-size: 40px;
    }

    .choice {
        height: 80px;
    }

    .controls {
        flex-wrap: wrap;
    }
}
</style>
</head>

<body>

<main>

<header>
    <h1>COLOR <span>RUSH</span></h1>
    <p class="subtitle">
        Read the color name and select the matching color!
    </p>
</header>

<section class="panel">

<div class="stats">
    <div class="stat">
        <small>SCORE</small>
        <strong id="score">0</strong>
    </div>

    <div class="stat">
        <small>TIME LEFT</small>
        <strong id="time">30</strong>
    </div>

    <div class="stat">
        <small>BEST SCORE</small>
        <strong id="best">0</strong>
    </div>
</div>

<p class="instruction" id="instruction">
    Press START GAME when you're ready.
</p>

<div class="color-name" id="prompt">
    READY?
</div>

<div class="choices">

    <button class="choice" style="background:#ef4444"
        aria-label="Red" disabled></button>

    <button class="choice" style="background:#3b82f6"
        aria-label="Blue" disabled></button>

    <button class="choice" style="background:#22c55e"
        aria-label="Green" disabled></button>

    <button class="choice" style="background:#eab308"
        aria-label="Yellow" disabled></button>

</div>

<div class="feedback" id="feedback"></div>

<div class="controls">
    <button class="primary" id="start">
        START GAME
    </button>

    <button class="secondary" id="reset">
        RESET
    </button>
</div>

<p class="rules">
    Correct answer: +1 point |
    Wrong answer: -1 point |
    You have 30 seconds!
</p>

</section>

<footer>
    COLOR RUSH - BUILT WITH NODE.JS
</footer>

</main>

<script>

const colors = [
    {name:"RED", value:"#ef4444"},
    {name:"BLUE", value:"#3b82f6"},
    {name:"GREEN", value:"#22c55e"},
    {name:"YELLOW", value:"#eab308"}
];

const $ = id => document.getElementById(id);

let score = 0;
let time = 30;
let active = false;
let timer = null;
let answer = null;

let best = Number(
    localStorage.getItem("colorRushBest") || 0
);

$("best").textContent = best;

function setChoices(enabled) {
    document.querySelectorAll(".choice").forEach(
        (button, i) => {
            button.disabled = !enabled;
            button.style.background = colors[i].value;
        }
    );
}

function nextRound() {

    const target = colors[
        Math.floor(Math.random() * colors.length)
    ];

    answer = target.name;

    $("prompt").textContent = target.name;
    $("prompt").style.color = target.value;

    $("instruction").textContent =
        "Which button matches the word above?";

    $("feedback").textContent = "";
}

function endGame() {

    active = false;

    clearInterval(timer);

    setChoices(false);

    $("prompt").textContent = "TIME'S UP!";
    $("prompt").style.color = "white";

    $("instruction").textContent =
        "Final score: " + score;

    $("feedback").textContent =
        "GAME OVER!";

    if(score > best) {

        best = score;

        localStorage.setItem(
            "colorRushBest",
            best
        );

        $("best").textContent = best;
    }

    $("start").textContent = "PLAY AGAIN";
    $("start").disabled = false;
}

function startGame() {

    clearInterval(timer);

    score = 0;
    time = 30;
    active = true;

    $("score").textContent = score;
    $("time").textContent = time;

    $("start").textContent = "PLAYING...";
    $("start").disabled = true;

    setChoices(true);

    nextRound();

    timer = setInterval(() => {

        time--;

        $("time").textContent = time;

        if(time <= 0) {
            endGame();
        }

    }, 1000);
}

document.querySelectorAll(".choice").forEach(
    (button, i) => {

        button.addEventListener("click", () => {

            if(!active) return;

            if(colors[i].name === answer) {

                score++;

                $("feedback").textContent =
                    "CORRECT! +1";

            } else {

                score = Math.max(0, score - 1);

                $("feedback").textContent =
                    "NOT QUITE!";
            }

            $("score").textContent = score;

            nextRound();
        });
    }
);

$("start").addEventListener("click", () => {

    if(!active) {
        startGame();
    }

});

$("reset").addEventListener("click", () => {

    clearInterval(timer);

    active = false;
    score = 0;
    time = 30;
    answer = null;

    $("score").textContent = 0;
    $("time").textContent = 30;

    $("prompt").textContent = "READY?";
    $("prompt").style.color = "white";

    $("instruction").textContent =
        "Press START GAME when you're ready.";

    $("feedback").textContent = "";

    $("start").textContent = "START GAME";
    $("start").disabled = false;

    setChoices(false);
});

</script>

</body>
</html>`;

const server = http.createServer((req, res) => {

    if ((req.url || "/").split("?")[0] === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        res.end(html);

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Not found");

});

server.listen(PORT, "0.0.0.0", () => {

    console.log(
        "Color Rush running on port " + PORT
    );

});
