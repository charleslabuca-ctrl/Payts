<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AETHER // LAB — Digital Curiosity Cabinet</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Tone.js for procedural Web Audio synthesis -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>
  <!-- Google Fonts: Inter & Space Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['Space Mono', 'monospace'],
          },
          colors: {
            void: '#09090b',
            obsidian: '#121216',
            surface: '#18181f',
            accent: '#8b5cf6',
            cyanGlow: '#06b6d4',
            roseGlow: '#f43f5e',
            amberGlow: '#f59e0b',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-void text-zinc-100 font-sans antialiased selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden min-h-screen flex flex-col">

  <!-- Ambient Background Glows -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div id="bg-orb-1" class="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl transition-all duration-1000"></div>
    <div id="bg-orb-2" class="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl transition-all duration-1000"></div>
    <div id="bg-orb-3" class="absolute -bottom-32 left-1/3 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl transition-all duration-1000"></div>
  </div>

  <!-- Toast Notification Banner (No alert() used) -->
  <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <!-- Top Navigation Header -->
  <header class="relative z-10 border-b border-zinc-800/80 bg-void/80 backdrop-blur-md sticky top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20">
          <div class="w-full h-full bg-void rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 class="font-mono font-bold text-lg tracking-wider text-white flex items-center gap-2">
            AETHER <span class="text-violet-400">//</span> LAB
            <span class="text-[10px] uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">v2.6</span>
          </h1>
          <p class="text-xs text-zinc-400">Interactive Digital Curiosity Cabinet</p>
        </div>
      </div>

      <!-- Global Controls -->
      <div class="flex items-center gap-2 sm:gap-3">
        <button id="btn-chaos-shuffle" class="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium shadow-lg shadow-violet-600/25 transition-all active:scale-95 cursor-pointer">
          <svg class="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Randomize Everything</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Bento Dashboard -->
  <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- MODULE 1: Generative Particle & Geometric Art Canvas (Spans 7 cols on desktop) -->
      <section class="lg:col-span-7 bg-obsidian/90 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h2 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-200">01 // Kinetic Sacred Geometry</h2>
            </div>
            <p class="text-xs text-zinc-400 mt-0.5">Move cursor or touch & drag inside the field to warp gravity</p>
          </div>
          <div class="flex items-center gap-2">
            <select id="art-mode-select" class="bg-surface border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer">
              <option value="spirograph">Harmonic Spirograph</option>
              <option value="constellation">Neural Constellation</option>
              <option value="vortex">Quantum Vortex</option>
            </select>
            <button id="btn-art-seed" class="px-3 py-2 rounded-xl bg-surface hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-cyan-400 transition active:scale-95 cursor-pointer" title="Mutate Seed">
              MUTATE
            </button>
          </div>
        </div>

        <!-- Responsive Fluid Canvas Container -->
        <div id="canvas-wrapper" class="relative w-full h-72 sm:h-80 lg:h-96 rounded-xl overflow-hidden bg-void border border-zinc-800/80 touch-none select-none">
          <canvas id="art-canvas" class="block w-full h-full"></canvas>
          <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-void/75 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-400 pointer-events-none">
            SEED: <span id="seed-display" class="text-cyan-400">#8492A</span>
          </div>
        </div>

        <!-- Sliders for Real-Time Geometry Control -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-3 border-t border-zinc-800/60">
          <div>
            <div class="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>SYMMETRY</span>
              <span id="val-symmetry" class="text-zinc-200">8</span>
            </div>
            <input id="slider-symmetry" type="range" min="3" max="24" value="8" class="w-full accent-violet-500 cursor-pointer">
          </div>
          <div>
            <div class="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>VELOCITY</span>
              <span id="val-speed" class="text-zinc-200">1.2x</span>
            </div>
            <input id="slider-speed" type="range" min="1" max="40" value="12" class="w-full accent-cyan-400 cursor-pointer">
          </div>
          <div class="col-span-2 sm:col-span-1">
            <div class="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>SPECTRUM HUE</span>
              <span id="val-hue" class="text-zinc-200">265°</span>
            </div>
            <input id="slider-hue" type="range" min="0" max="360" value="265" class="w-full accent-rose-500 cursor-pointer">
          </div>
        </div>
      </section>

      <!-- MODULE 2: Polyphonic Ambient Synth Pad (Spans 5 cols on desktop) -->
      <section class="lg:col-span-5 bg-obsidian/90 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-violet-400"></span>
                <h2 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-200">02 // Etheric Synth Matrix</h2>
              </div>
              <p class="text-xs text-zinc-400 mt-0.5">Tap pads or press keys <kbd class="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px] font-mono">1-9</kbd> for procedural chimes</p>
            </div>
            <button id="btn-drone-toggle" class="px-3 py-1.5 rounded-xl bg-surface hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-2 transition cursor-pointer">
              <span id="drone-indicator" class="w-2 h-2 rounded-full bg-zinc-600"></span>
              <span>DRONE: OFF</span>
            </button>
          </div>

          <!-- 3x3 Tactile Synth Grid -->
          <div id="synth-grid" class="grid grid-cols-3 gap-3 my-2">
            <!-- Buttons injected dynamically by JS -->
          </div>
        </div>

        <!-- Scale & Reverb Controls -->
        <div class="mt-4 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-zinc-400">SCALE:</span>
            <select id="synth-scale-select" class="bg-surface border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-violet-500 cursor-pointer">
              <option value="pentatonic">Cosmic Pentatonic</option>
              <option value="lydian">Lydian Dream</option>
              <option value="hirajoshi">Kyoto Hirajoshi</option>
            </select>
          </div>
          <button id="btn-arpeggiate" class="px-3.5 py-2 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/40 text-violet-300 text-xs font-mono transition active:scale-95 cursor-pointer">
            ✨ Auto-Arpeggio
          </button>
        </div>
      </section>

      <!-- MODULE 3: Serendipity & Cosmic Curiosity Oracle (Spans 5 cols) -->
      <section class="lg:col-span-5 bg-obsidian/90 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              <h2 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-200">03 // Curiosity Oracle</h2>
            </div>
            <span id="curiosity-category" class="text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
              COSMOLOGY
            </span>
          </div>

          <div class="min-h-[140px] rounded-xl bg-surface/80 border border-zinc-800 p-4 flex flex-col justify-center relative overflow-hidden">
            <p id="curiosity-text" class="text-sm sm:text-base text-zinc-100 leading-relaxed font-normal transition-opacity duration-300">
              Neutron stars are so dense that a single teaspoon of their material would weigh roughly 6 billion tons—about the weight of Mount Everest.
            </p>
            <div class="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span id="curiosity-index">ARCHIVE #01 / 12</span>
              <button id="btn-copy-fact" class="text-zinc-400 hover:text-white underline decoration-zinc-600 underline-offset-4 cursor-pointer">
                Copy snippet
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <button id="btn-next-curiosity" class="flex-1 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-white text-void font-semibold text-sm transition active:scale-95 cursor-pointer shadow-md">
            Summon Another Fact
          </button>
          <button id="btn-mood-recipe" class="py-2.5 px-3.5 rounded-xl bg-surface hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono transition active:scale-95 cursor-pointer" title="Generate Random Vibe Prompt">
            🎲 Vibe
          </button>
        </div>
      </section>

      <!-- MODULE 4: Tactile Physics Bubble & Gravity Toy (Spans 4 cols) -->
      <section class="lg:col-span-4 bg-obsidian/90 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <h2 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-200">04 // Zero-G Orb Pit</h2>
            </div>
            <p class="text-xs text-zinc-400 mt-0.5">Tap orbs to pop & score, or invert gravity</p>
          </div>
          <div class="text-right font-mono">
            <span class="text-[10px] text-zinc-500 block">POPPED</span>
            <span id="pop-counter" class="text-base font-bold text-rose-400">0</span>
          </div>
        </div>

        <div id="physics-wrapper" class="relative w-full h-44 rounded-xl bg-void border border-zinc-800/80 overflow-hidden touch-none select-none">
          <canvas id="physics-canvas" class="block w-full h-full"></canvas>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2">
          <button id="btn-gravity-flip" class="py-2 px-3 rounded-xl bg-surface hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 transition active:scale-95 cursor-pointer">
            ⇅ Flip Gravity
          </button>
          <button id="btn-spawn-orbs" class="py-2 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-mono text-rose-300 transition active:scale-95 cursor-pointer">
            + Spawn Orbs
          </button>
        </div>
      </section>

      <!-- MODULE 5: Chromatic Palette & Mood Synthesizer (Spans 3 cols) -->
      <section class="lg:col-span-3 bg-obsidian/90 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h2 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-200">05 // Chroma</h2>
          </div>
          <p class="text-xs text-zinc-400 mb-4">Tap any swatch to copy HEX</p>

          <div id="palette-list" class="flex flex-col gap-2">
            <!-- Swatches generated by JS -->
          </div>
        </div>

        <button id="btn-new-palette" class="mt-4 w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-emerald-300 transition active:scale-95 cursor-pointer">
          Generate Palette
        </button>
      </section>

    </div>
  </main>

  <!-- Minimal Footer -->
  <footer class="relative z-10 border-t border-zinc-800/60 py-4 px-4 text-center text-xs font-mono text-zinc-500">
    Crafted for spontaneous exploration • Audio powered by Tone.js • No external tracking
  </footer>

  <script>
    /**
     * AETHER // LAB — Interactive Curiosity Cabinet
     * Self-contained application logic with error handling, responsive canvases,
     * procedural Web Audio synthesis, and tactile interactive modules.
     */
    (function () {
      'use strict';

      // ==========================================
      // UTILITY: Custom Toast Notification System
      // ==========================================
      function showToast(message, accentColor = 'border-violet-500/50 text-violet-200') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `px-4 py-2.5 rounded-xl bg-obsidian/95 backdrop-blur-md border ${accentColor} text-xs font-mono shadow-xl transition-all duration-300 translate-y-2 opacity-0`;
        toast.textContent = message;
        container.appendChild(toast);

        requestAnimationFrame(() => {
          toast.classList.remove('translate-y-2', 'opacity-0');
        });

        setTimeout(() => {
          toast.classList.add('opacity-0', 'translate-y-2');
          setTimeout(() => toast.remove(), 300);
        }, 2400);
      }

      // Utility: Safe Clipboard Copy using execCommand fallback for iframe compatibility
      function copyTextToClipboard(text, label = 'Copied') {
        try {
          const tempInput = document.createElement('textarea');
          tempInput.value = text;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`${label}: ${text}`, 'border-emerald-500/50 text-emerald-200');
        } catch (err) {
          showToast('Unable to copy automatically', 'border-rose-500/50 text-rose-200');
        }
      }

      // ==========================================
      // MODULE 1: Kinetic Sacred Geometry Canvas
      // ==========================================
      const artCanvas = document.getElementById('art-canvas');
      const artCtx = artCanvas.getContext('2d');
      const artWrapper = document.getElementById('canvas-wrapper');

      const artState = {
        mode: 'spirograph',
        symmetry: 8,
        speed: 0.012,
        baseHue: 265,
        time: 0,
        seed: 8492,
        pointer: { x: 0.5, y: 0.5, active: false },
        particles: []
      };

      function initConstellationParticles() {
        artState.particles = [];
        for (let i = 0; i < 42; i++) {
          artState.particles.push({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.004,
            vy: (Math.random() - 0.5) * 0.004,
            radius: 1.5 + Math.random() * 2.5
          });
        }
      }

      function resizeArtCanvas() {
        if (!artWrapper || !artCanvas) return;
        const rect = artWrapper.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        artCanvas.width = rect.width * dpr;
        artCanvas.height = rect.height * dpr;
        artCtx.scale(dpr, dpr);
      }

      function renderArtFrame() {
        const rect = artWrapper.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;

        // Soft trail fade
        artCtx.fillStyle = 'rgba(9, 9, 11, 0.14)';
        artCtx.fillRect(0, 0, w, h);

        artState.time += artState.speed;
        const t = artState.time;
        const pointerInfluenceX = artState.pointer.active ? (artState.pointer.x - 0.5) * 120 : Math.sin(t * 0.7) * 30;
        const pointerInfluenceY = artState.pointer.active ? (artState.pointer.y - 0.5) * 120 : Math.cos(t * 0.5) * 30;

        if (artState.mode === 'spirograph') {
          artCtx.save();
          artCtx.translate(cx, cy);
          const slices = artState.symmetry;
          const maxR = Math.min(w, h) * 0.38;

          for (let i = 0; i < slices; i++) {
            artCtx.save();
            artCtx.rotate((Math.PI * 2 * i) / slices + t * 0.25);

            const hue = (artState.baseHue + i * (360 / slices) + t * 25) % 360;
            artCtx.strokeStyle = `hsla(${hue}, 85%, 62%, 0.75)`;
            artCtx.lineWidth = 1.6;

            artCtx.beginPath();
            const r1 = maxR * 0.45 + Math.sin(t * 1.8 + (artState.seed % 10)) * 24;
            const r2 = maxR * 0.85 + Math.cos(t * 1.3) * 18;
            artCtx.moveTo(0, 0);
            artCtx.quadraticCurveTo(
              r1 + pointerInfluenceX * 0.4,
              r1 * 0.6 + pointerInfluenceY * 0.4,
              r2,
              Math.sin(t * 2 + i) * 32
            );
            artCtx.stroke();

            // Glowing node tip
            artCtx.fillStyle = `hsla(${(hue + 40) % 360}, 95%, 72%, 0.95)`;
            artCtx.beginPath();
            artCtx.arc(r2, Math.sin(t * 2 + i) * 32, 2.6, 0, Math.PI * 2);
            artCtx.fill();

            artCtx.restore();
          }
          artCtx.restore();
        } else if (artState.mode === 'constellation') {
          const pts = artState.particles;
          for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            p.x += p.vx * (artState.speed * 80);
            p.y += p.vy * (artState.speed * 80);

            if (p.x < 0 || p.x > 1) p.vx *= -1;
            if (p.y < 0 || p.y > 1) p.vy *= -1;

            const px = p.x * w;
            const py = p.y * h;

            if (artState.pointer.active) {
              const mx = artState.pointer.x * w;
              const my = artState.pointer.y * h;
              const dx = mx - px;
              const dy = my - py;
              const dist = Math.hypot(dx, dy);
              if (dist < 140 && dist > 1) {
                p.x += (dx / dist) * 0.003;
                p.y += (dy / dist) * 0.003;
              }
            }

            const hue = (artState.baseHue + i * 6) % 360;
            artCtx.fillStyle = `hsla(${hue}, 85%, 68%, 0.9)`;
            artCtx.beginPath();
            artCtx.arc(px, py, p.radius, 0, Math.PI * 2);
            artCtx.fill();

            for (let j = i + 1; j < pts.length; j++) {
              const p2 = pts[j];
              const d = Math.hypot((p.x - p2.x) * w, (p.y - p2.y) * h);
              if (d < 95) {
                artCtx.strokeStyle = `hsla(${hue}, 80%, 60%, ${(1 - d / 95) * 0.5})`;
                artCtx.lineWidth = 1;
                artCtx.beginPath();
                artCtx.moveTo(px, py);
                artCtx.lineTo(p2.x * w, p2.y * h);
                artCtx.stroke();
              }
            }
          }
        } else if (artState.mode === 'vortex') {
          artCtx.save();
          artCtx.translate(cx + pointerInfluenceX * 0.3, cy + pointerInfluenceY * 0.3);
          const rings = artState.symmetry * 2;
          const maxR = Math.min(w, h) * 0.44;
          for (let r = 1; r <= rings; r++) {
            const radius = (r / rings) * maxR;
            const hue = (artState.baseHue + r * 12 + t * 30) % 360;
            artCtx.strokeStyle = `hsla(${hue}, 85%, 60%, 0.65)`;
            artCtx.lineWidth = 1.5;
            artCtx.beginPath();
            const sides = Math.max(3, artState.symmetry);
            for (let s = 0; s <= sides; s++) {
              const angle = (s / sides) * Math.PI * 2 + t * (r % 2 === 0 ? 1 : -1) * 0.6 + r * 0.15;
              const vx = Math.cos(angle) * radius;
              const vy = Math.sin(angle) * radius;
              if (s === 0) artCtx.moveTo(vx, vy);
              else artCtx.lineTo(vx, vy);
            }
            artCtx.stroke();
          }
          artCtx.restore();
        }

        requestAnimationFrame(renderArtFrame);
      }

      // Pointer & Touch events for Art Canvas
      function updateArtPointer(clientX, clientY) {
        const rect = artWrapper.getBoundingClientRect();
        artState.pointer.x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        artState.pointer.y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        artState.pointer.active = true;
      }

      artWrapper.addEventListener('mousemove', (e) => updateArtPointer(e.clientX, e.clientY));
      artWrapper.addEventListener('mouseleave', () => { artState.pointer.active = false; });
      artWrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) updateArtPointer(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      artWrapper.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) updateArtPointer(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      artWrapper.addEventListener('touchend', () => { artState.pointer.active = false; });

      // Art UI Controls
      document.getElementById('art-mode-select').addEventListener('change', (e) => {
        artState.mode = e.target.value;
      });
      document.getElementById('slider-symmetry').addEventListener('input', (e) => {
        artState.symmetry = parseInt(e.target.value, 10);
        document.getElementById('val-symmetry').textContent = artState.symmetry;
      });
      document.getElementById('slider-speed').addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        artState.speed = val / 1000;
        document.getElementById('val-speed').textContent = (val / 10).toFixed(1) + 'x';
      });
      document.getElementById('slider-hue').addEventListener('input', (e) => {
        artState.baseHue = parseInt(e.target.value, 10);
        document.getElementById('val-hue').textContent = artState.baseHue + '°';
      });
      document.getElementById('btn-art-seed').addEventListener('click', () => {
        artState.seed = Math.floor(1000 + Math.random() * 9000);
        document.getElementById('seed-display').textContent = '#' + artState.seed.toString(16).toUpperCase();
        initConstellationParticles();
        showToast(`Geometry mutated: Seed #${artState.seed.toString(16).toUpperCase()}`, 'border-cyan-500/50 text-cyan-200');
      });

      // ==========================================
      // MODULE 2: Etheric Synth Matrix (Tone.js)
      // ==========================================
      const scales = {
        pentatonic: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5'],
        lydian: ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'],
        hirajoshi: ['C4', 'Db4', 'F4', 'Gb4', 'Bb4', 'C5', 'Db5', 'F5', 'Gb5']
      };

      let currentScale = 'pentatonic';
      let polySynth = null;
      let droneSynth = null;
      let droneActive = false;
      let audioReady = false;

      async function ensureAudioInitialized() {
        if (audioReady) return true;
        try {
          if (typeof Tone !== 'undefined') {
            await Tone.start();
            const reverb = new Tone.Reverb({ decay: 3.2, wet: 0.45 }).toDestination();
            polySynth = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'triangle' },
              envelope: { attack: 0.03, decay: 0.4, sustain: 0.2, release: 1.4 }
            }).connect(reverb);
            polySynth.volume.value = -8;

            droneSynth = new Tone.AMSynth({
              harmonicity: 1.5,
              oscillator: { type: 'sine' },
              envelope: { attack: 1.5, decay: 0.5, sustain: 1, release: 2 }
            }).connect(reverb);
            droneSynth.volume.value = -18;

            audioReady = true;
            return true;
          }
        } catch (err) {
          console.warn('Audio init deferred:', err);
        }
        return false;
      }

      const synthGrid = document.getElementById('synth-grid');
      const padColors = [
        'from-violet-500/20 to-fuchsia-500/20 border-violet-500/40 text-violet-200',
        'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-200',
        'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-200',
        'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-200',
        'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-200',
        'from-indigo-500/20 to-violet-500/20 border-indigo-500/40 text-indigo-200',
        'from-sky-500/20 to-cyan-500/20 border-sky-500/40 text-sky-200',
        'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/40 text-fuchsia-200',
        'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-200'
      ];

      function buildSynthPads() {
        synthGrid.innerHTML = '';
        const notes = scales[currentScale];
        notes.forEach((note, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.dataset.padIndex = idx;
          btn.className = `synth-pad h-16 sm:h-20 rounded-xl bg-gradient-to-br ${padColors[idx]} border flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-90 hover:brightness-125 cursor-pointer select-none`;
          btn.innerHTML = `
            <span class="font-mono font-bold text-sm sm:text-base">${note}</span>
            <span class="text-[10px] font-mono opacity-60">KEY ${idx + 1}</span>
          `;
          btn.addEventListener('pointerdown', () => triggerPad(idx));
          synthGrid.appendChild(btn);
        });
      }

      async function triggerPad(index) {
        const notes = scales[currentScale];
        const note = notes[index];
        if (!note) return;

        const padEl = synthGrid.querySelector(`[data-pad-index="${index}"]`);
        if (padEl) {
          padEl.classList.add('scale-95', 'ring-2', 'ring-white/60', 'brightness-150');
          setTimeout(() => {
            padEl.classList.remove('scale-95', 'ring-2', 'ring-white/60', 'brightness-150');
          }, 180);
        }

        const ready = await ensureAudioInitialized();
        if (ready && polySynth) {
          polySynth.triggerAttackRelease(note, '8n');
        }
      }

      document.getElementById('synth-scale-select').addEventListener('change', (e) => {
        currentScale = e.target.value;
        buildSynthPads();
      });

      document.getElementById('btn-drone-toggle').addEventListener('click', async () => {
        const ready = await ensureAudioInitialized();
        if (!ready || !droneSynth) return;

        const btn = document.getElementById('btn-drone-toggle');
        const indicator = document.getElementById('drone-indicator');
        droneActive = !droneActive;

        if (droneActive) {
          droneSynth.triggerAttack('C2');
          indicator.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-ping';
          btn.querySelector('span:last-child').textContent = 'DRONE: ON';
        } else {
          droneSynth.triggerRelease();
          indicator.className = 'w-2 h-2 rounded-full bg-zinc-600';
          btn.querySelector('span:last-child').textContent = 'DRONE: OFF';
        }
      });

      document.getElementById('btn-arpeggiate').addEventListener('click', async () => {
        await ensureAudioInitialized();
        const sequence = [0, 2, 4, 5, 7, 8, 5, 4];
        sequence.forEach((padIdx, step) => {
          setTimeout(() => triggerPad(padIdx), step * 130);
        });
      });

      // Keyboard shortcut support (1-9)
      window.addEventListener('keydown', (e) => {
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 9) {
          triggerPad(num - 1);
        }
      });

      // ==========================================
      // MODULE 3: Curiosity Oracle & Vibe Generator
      // ==========================================
      const curiosities = [
        { cat: 'COSMOLOGY', text: 'Neutron stars are so dense that a single teaspoon of their material would weigh roughly 6 billion tons—about the weight of Mount Everest.' },
        { cat: 'BIOLOGY', text: 'Octopuses have three hearts, nine brains, and blue copper-based blood that helps them survive in freezing deep-ocean waters.' },
        { cat: 'MATHEMATICS', text: 'If you shuffle a standard 52-card deck thoroughly, the exact order of cards has almost certainly never existed before in human history.' },
        { cat: 'LINGUISTICS', text: 'The Japanese word "Komorebi" (木漏れ日) describes the specific interplay of sunlight filtering through the leaves of trees.' },
        { cat: 'QUANTUM', text: 'At the quantum scale, particles can tunnel through energy barriers they classically lack the energy to cross—a phenomenon powering the Sun’s fusion.' },
        { cat: 'BOTANY', text: 'Trees in a forest communicate and share nutrients through an underground fungal network often nicknamed the "Wood Wide Web".' },
        { cat: 'ACOUSTICS', text: 'Sound travels more than four times faster in water than in air because water molecules are packed much closer together.' },
        { cat: 'HISTORY', text: 'Oxford University is older than the Aztec Empire—teaching existed at Oxford as early as 1096, over 300 years before Tenochtitlan was founded.' },
        { cat: 'PERCEPTION', text: 'Mantis shrimp possess 16 types of photoreceptor cells in their eyes (compared to humans’ 3), allowing them to perceive ultraviolet and polarized light.' },
        { cat: 'PLANETARY', text: 'A single day on Venus (one full rotation on its axis) takes longer than a full Venusian year around the Sun.' }
      ];

      const vibePrompts = [
        'Midnight rain tapping on a Tokyo neon glass window while lo-fi tape loops play.',
        'Floating inside a bioluminescent submarine three miles beneath an alien ice moon.',
        'Sunday morning espresso on a brutalist concrete balcony overlooking misty mountains.',
        'Browsing an infinite library where every book hums a faint musical chord when opened.',
        'Stargazing from the roof of an observatory during a Perseid meteor shower.'
      ];

      let curiosityIdx = 0;

      function displayCuriosity(index) {
        const item = curiosities[index % curiosities.length];
        const textEl = document.getElementById('curiosity-text');
        const catEl = document.getElementById('curiosity-category');
        const idxEl = document.getElementById('curiosity-index');

        textEl.style.opacity = '0';
        setTimeout(() => {
          textEl.textContent = item.text;
          catEl.textContent = item.cat;
          idxEl.textContent = `ARCHIVE #${String((index % curiosities.length) + 1).padStart(2, '0')} / ${curiosities.length}`;
          textEl.style.opacity = '1';
        }, 160);
      }

      document.getElementById('btn-next-curiosity').addEventListener('click', () => {
        curiosityIdx = (curiosityIdx + 1) % curiosities.length;
        displayCuriosity(curiosityIdx);
      });

      document.getElementById('btn-mood-recipe').addEventListener('click', () => {
        const vibe = vibePrompts[Math.floor(Math.random() * vibePrompts.length)];
        const textEl = document.getElementById('curiosity-text');
        const catEl = document.getElementById('curiosity-category');
        catEl.textContent = 'AMBIENT VIBE';
        textEl.textContent = vibe;
      });

      document.getElementById('btn-copy-fact').addEventListener('click', () => {
        const text = document.getElementById('curiosity-text').textContent;
        copyTextToClipboard(text, 'Snippet copied');
      });

      // ==========================================
      // MODULE 4: Zero-G Orb Pit (2D Physics Toy)
      // ==========================================
      const physCanvas = document.getElementById('physics-canvas');
      const physCtx = physCanvas.getContext('2d');
      const physWrapper = document.getElementById('physics-wrapper');

      let orbs = [];
      let gravityDir = 0.22;
      let poppedCount = 0;

      function resizePhysicsCanvas() {
        if (!physWrapper || !physCanvas) return;
        const rect = physWrapper.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        physCanvas.width = rect.width * dpr;
        physCanvas.height = rect.height * dpr;
        physCtx.scale(dpr, dpr);
      }

      function spawnOrbs(count = 7) {
        const rect = physWrapper.getBoundingClientRect();
        const w = rect.width || 300;
        const h = rect.height || 170;
        const hues = [265, 190, 340, 155, 38];

        for (let i = 0; i < count; i++) {
          const radius = 12 + Math.random() * 12;
          orbs.push({
            x: radius + Math.random() * Math.max(20, w - radius * 2),
            y: radius + Math.random() * Math.max(20, h * 0.5),
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 2,
            r: radius,
            hue: hues[Math.floor(Math.random() * hues.length)]
          });
        }
      }

      function updateAndDrawPhysics() {
        const rect = physWrapper.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        physCtx.clearRect(0, 0, w, h);

        for (let i = 0; i < orbs.length; i++) {
          const o = orbs[i];
          o.vy += gravityDir;
          o.vx *= 0.992;
          o.vy *= 0.992;
          o.x += o.vx;
          o.y += o.vy;

          // Wall collisions
          if (o.x - o.r < 0) { o.x = o.r; o.vx *= -0.82; }
          if (o.x + o.r > w) { o.x = w - o.r; o.vx *= -0.82; }
          if (o.y - o.r < 0) { o.y = o.r; o.vy *= -0.82; }
          if (o.y + o.r > h) { o.y = h - o.r; o.vy *= -0.82; }

          // Simple orb-to-orb elastic bounce
          for (let j = i + 1; j < orbs.length; j++) {
            const o2 = orbs[j];
            const dx = o2.x - o.x;
            const dy = o2.y - o.y;
            const dist = Math.hypot(dx, dy);
            const minDist = o.r + o2.r;
            if (dist < minDist && dist > 0) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = (minDist - dist) * 0.5;
              o.x -= nx * overlap;
              o.y -= ny * overlap;
              o2.x += nx * overlap;
              o2.y += ny * overlap;

              const dvx = o2.vx - o.vx;
              const dvy = o2.vy - o.vy;
              const dot = dvx * nx + dvy * ny;
              if (dot < 0) {
                o.vx += dot * nx * 0.85;
                o.vy += dot * ny * 0.85;
                o2.vx -= dot * nx * 0.85;
                o2.vy -= dot * ny * 0.85;
              }
            }
          }

          // Render glowing orb
          const grad = physCtx.createRadialGradient(o.x - o.r * 0.3, o.y - o.r * 0.3, 2, o.x, o.y, o.r);
          grad.addColorStop(0, `hsla(${o.hue}, 95%, 78%, 0.95)`);
          grad.addColorStop(1, `hsla(${o.hue}, 80%, 45%, 0.65)`);

          physCtx.fillStyle = grad;
          physCtx.beginPath();
          physCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          physCtx.fill();

          physCtx.strokeStyle = `hsla(${o.hue}, 90%, 80%, 0.5)`;
          physCtx.lineWidth = 1;
          physCtx.stroke();
        }

        requestAnimationFrame(updateAndDrawPhysics);
      }

      physWrapper.addEventListener('pointerdown', (e) => {
        const rect = physWrapper.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;

        for (let i = orbs.length - 1; i >= 0; i--) {
          const o = orbs[i];
          if (Math.hypot(px - o.x, py - o.y) <= o.r + 6) {
            orbs.splice(i, 1);
            poppedCount++;
            document.getElementById('pop-counter').textContent = poppedCount;
            triggerPad(i % 9);
            if (orbs.length < 3) spawnOrbs(5);
            return;
          }
        }
        // If empty space clicked, give nearby orbs an upward impulse
        orbs.forEach((o) => {
          o.vy -= 5;
          o.vx += (Math.random() - 0.5) * 6;
        });
      });

      document.getElementById('btn-gravity-flip').addEventListener('click', () => {
        gravityDir *= -1;
        orbs.forEach((o) => { o.vy += gravityDir * 14; });
        showToast(gravityDir < 0 ? 'Gravity inverted: Zero-G lift' : 'Gravity restored: Downward pull', 'border-rose-500/50 text-rose-200');
      });

      document.getElementById('btn-spawn-orbs').addEventListener('click', () => {
        if (orbs.length > 28) orbs.splice(0, 8);
        spawnOrbs(6);
      });

      // ==========================================
      // MODULE 5: Chromatic Palette Synthesizer
      // ==========================================
      function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
      }

      function generateChromaPalette() {
        const list = document.getElementById('palette-list');
        list.innerHTML = '';
        const baseH = Math.floor(Math.random() * 360);
        const offsets = [0, 35, 145, 195, 280];

        offsets.forEach((offset, idx) => {
          const h = (baseH + offset) % 360;
          const s = 68 + (idx % 3) * 8;
          const l = 52 + (idx % 2) * 10;
          const hex = hslToHex(h, s, l);

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'w-full flex items-center justify-between p-2 rounded-xl bg-surface/80 hover:bg-zinc-800 border border-zinc-800 transition active:scale-95 cursor-pointer group';
          btn.innerHTML = `
            <div class="flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-lg shadow-inner border border-white/10" style="background-color: ${hex}"></span>
              <span class="font-mono text-xs text-zinc-200 group-hover:text-white">${hex}</span>
            </div>
            <span class="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">COPY</span>
          `;
          btn.addEventListener('click', () => copyTextToClipboard(hex, 'HEX copied'));
          list.appendChild(btn);
        });
      }

      document.getElementById('btn-new-palette').addEventListener('click', generateChromaPalette);

      // ==========================================
      // GLOBAL: "Randomize Everything" Chaos Button
      // ==========================================
      document.getElementById('btn-chaos-shuffle').addEventListener('click', () => {
        // 1. Randomize Geometry
        const modes = ['spirograph', 'constellation', 'vortex'];
        const randomMode = modes[Math.floor(Math.random() * modes.length)];
        const randomSym = Math.floor(4 + Math.random() * 18);
        const randomHue = Math.floor(Math.random() * 360);

        artState.mode = randomMode;
        artState.symmetry = randomSym;
        artState.baseHue = randomHue;
        artState.seed = Math.floor(1000 + Math.random() * 9000);

        document.getElementById('art-mode-select').value = randomMode;
        document.getElementById('slider-symmetry').value = randomSym;
        document.getElementById('val-symmetry').textContent = randomSym;
        document.getElementById('slider-hue').value = randomHue;
        document.getElementById('val-hue').textContent = randomHue + '°';
        document.getElementById('seed-display').textContent = '#' + artState.seed.toString(16).toUpperCase();

        // 2. Randomize Scale
        const scaleKeys = Object.keys(scales);
        currentScale = scaleKeys[Math.floor(Math.random() * scaleKeys.length)];
        document.getElementById('synth-scale-select').value = currentScale;
        buildSynthPads();

        // 3. Randomize Fact & Palette & Orbs
        curiosityIdx = Math.floor(Math.random() * curiosities.length);
        displayCuriosity(curiosityIdx);
        generateChromaPalette();
        orbs.forEach((o) => {
          o.vx = (Math.random() - 0.5) * 12;
          o.vy = (Math.random() - 0.5) * 12;
        });

        // 4. Shift Ambient Background Glows
        document.getElementById('bg-orb-1').style.backgroundColor = `hsla(${randomHue}, 80%, 50%, 0.18)`;
        document.getElementById('bg-orb-2').style.backgroundColor = `hsla(${(randomHue + 120) % 360}, 80%, 50%, 0.15)`;

        showToast('Reality reshuffled across all modules ✨', 'border-violet-500/60 text-violet-200');
      });

      // ==========================================
      // INITIALIZATION & RESIZE LISTENERS
      // ==========================================
      window.addEventListener('resize', () => {
        resizeArtCanvas();
        resizePhysicsCanvas();
      });

      window.onload = function () {
        resizeArtCanvas();
        initConstellationParticles();
        renderArtFrame();

        buildSynthPads();
        displayCuriosity(0);
        generateChromaPalette();

        resizePhysicsCanvas();
        spawnOrbs(9);
        updateAndDrawPhysics();
      };
    })();
  </script>
</body>
</html>
