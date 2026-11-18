/* ================= ANIMATION & VIDEO LAYER ================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hover-to-play videos (tap toggles on touch devices)
function setupHoverVideo(box) {
  const video = box.querySelector("video");
  if (!video) return;
  const play = () => { box.classList.add("playing"); video.play().catch(() => {}); };
  const stop = () => { box.classList.remove("playing"); video.pause(); };
  // mouse: play on hover. touch: tap toggles (avoids hover+click cancelling each other)
  box.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") play(); });
  box.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") stop(); });
  box.addEventListener("focus", () => { if (box.matches(":focus-visible")) play(); });
  box.addEventListener("blur", stop);
  box.addEventListener("click", (e) => {
    if (e.pointerType === "mouse") return;
    box.classList.contains("playing") ? stop() : play();
  });
  // pause when scrolled off-screen to save battery
  new IntersectionObserver(([en]) => { if (!en.isIntersecting) stop(); }).observe(box);
}
document.querySelectorAll("#heroArch, #storyVideo").forEach(setupHoverVideo);

// Falling petals
(function petals() {
  if (reduceMotion) return;
  const wrap = document.getElementById("petals");
  const count = window.innerWidth < 600 ? 10 : 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal" + (i % 3 === 0 ? " gold" : "");
    const size = 8 + Math.random() * 10;
    p.style.cssText =
      "left:" + Math.random() * 100 + "%;width:" + size + "px;height:" + size * 1.3 + "px;" +
      "animation-duration:" + (9 + Math.random() * 10) + "s," + (2.5 + Math.random() * 3) + "s;" +
      "animation-delay:" + -Math.random() * 15 + "s," + -Math.random() * 3 + "s;";
    wrap.append(p);
  }
})();

// Scroll reveal
(function reveals() {
  const targets = [
    [".section-heading > *", "reveal"],
    [".countdown-wrap", "reveal reveal-zoom"],
    [".ceremony-card", "reveal reveal-left"],
    [".reception-card", "reveal reveal-right"],
    [".utility-row > *", "reveal"],
    [".closing-note > *", "reveal reveal-zoom"],
    [".portrait-bride", "reveal reveal-left"],
    [".portrait-groom", "reveal reveal-right"],
    [".couple-heart", "reveal reveal-zoom"],
    [".haldi-card", "reveal reveal-zoom"],
    [".moment", "reveal reveal-zoom"],
    [".location-map", "reveal reveal-left"],
    [".location-info", "reveal reveal-right"],
    [".story-copy", "reveal reveal-left"],
    [".story-video", "reveal reveal-right"],
  ];
  const els = [];
  targets.forEach(([sel, cls]) => document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add(...cls.split(" "));
    el.style.setProperty("--d", i * 0.12 + "s");
    els.push(el);
  }));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
})();

// Scroll progress bar
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
}, { passive: true });

// Hero parallax (mouse)
const heroEl = document.querySelector(".hero");
const artEl = document.querySelector(".invitation-art");
heroEl.addEventListener("mousemove", (e) => {
  if (reduceMotion) return;
  const r = artEl.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  artEl.style.transform = "perspective(900px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 6 + "deg)";
  artEl.querySelectorAll(".flower, .leaf-spray, .sun-disc").forEach((el, i) => {
    el.style.translate = x * (14 + i * 6) + "px " + y * (14 + i * 6) + "px";
  });
});
heroEl.addEventListener("mouseleave", () => { artEl.style.transform = ""; });

// Card spotlight
document.querySelectorAll(".event-card").forEach((card) => card.addEventListener("mousemove", (e) => {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", e.clientX - r.left + "px");
  card.style.setProperty("--my", e.clientY - r.top + "px");
}));

// Countdown tick animation
(function countdownTick() {
  const prev = {};
  const run = () => ["days", "hours", "minutes", "seconds"].forEach((id) => {
    const el = document.getElementById(id);
    if (prev[id] !== undefined && prev[id] !== el.textContent) {
      el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
    }
    prev[id] = el.textContent;
  });
  run();
  window.setInterval(run, 1000);
})();

// Animated scenes for each event card (swap for <img> photos any time)
const CARD_SCENES = {
  "haldi-card": `<svg viewBox="0 0 240 200" aria-hidden="true">
    <rect width="240" height="200" rx="14" fill="#4fb7c6"/>
    <circle cx="120" cy="100" r="92" fill="#6fcad6" opacity=".55"/>
    <g class="sc-swing">
      <path d="M52 176 C48 16 192 16 188 176" fill="none" stroke="#7a5a2a" stroke-width="3"/>
      ${Array.from({length: 13}, (_, i) => { const t = i / 12, u = 1 - t; const x = 52*u*u*u + 144*u*u*t + 576*u*t*t + 188*t*t*t; const y = 176*u*u*u + 48*u*u*t + 48*u*t*t + 176*t*t*t; return `<g class="sc-bloom" style="--d:${(i * .18).toFixed(2)}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="#ffd54a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#f08a00"/></g>`; }).join("")}
      <line x1="72" y1="88" x2="72" y2="150" stroke="#7a5a2a" stroke-width="2"/><line x1="168" y1="88" x2="168" y2="150" stroke="#7a5a2a" stroke-width="2"/>
      ${[104,118,132].map((y, i) => `<circle class="sc-bloom" style="--d:${i*.3}s" cx="72" cy="${y}" r="4" fill="#ffd54a"/><circle class="sc-bloom" style="--d:${i*.3+.15}s" cx="168" cy="${y}" r="4" fill="#ffd54a"/>`).join("")}
      <rect x="62" y="150" width="116" height="9" rx="4" fill="#8b5a2b"/>
      <!-- groom -->
      <path d="M118 166 L166 166 L168 184 L116 184Z" fill="#f3ece0"/>
      <path d="M122 106 Q142 98 162 106 L166 152 L118 152Z" fill="#f7d046"/>
      <path d="M142 100 L142 152" stroke="#e0a800" stroke-width="1.5"/>
      <circle cx="142" cy="86" r="16" fill="#e0a07a"/>
      <path d="M126 84 C122 62 162 62 158 84 C154 72 130 72 126 84Z" fill="#2a1a1a"/>
      <ellipse class="sc-blink" cx="136" cy="87" rx="1.8" ry="2.2" fill="#2a1a1a"/><ellipse class="sc-blink" cx="148" cy="87" rx="1.8" ry="2.2" fill="#2a1a1a"/>
      <path d="M137 94 Q142 99 147 94" fill="none" stroke="#7a2430" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M135 92 Q142 90 149 92" fill="none" stroke="#2a1a1a" stroke-width="1.6" stroke-linecap="round"/>
      <!-- bride -->
      <path d="M70 160 Q100 172 130 160 L136 182 Q100 194 64 182Z" fill="#f2b705"/>
      <path d="M80 108 Q100 100 120 108 L126 156 L74 156Z" fill="#f5c518"/>
      <path d="M80 108 L96 156" stroke="#e08a00" stroke-width="5" opacity=".7"/>
      <circle cx="100" cy="90" r="16" fill="#f1b88e"/>
      <path d="M84 88 C80 64 120 64 116 88 C112 78 88 78 84 88Z" fill="#2a1a1a"/>
      <circle cx="100" cy="68" r="7" fill="#2a1a1a"/><circle cx="109" cy="70" r="4.5" fill="#ffd54a"/><circle cx="109" cy="70" r="1.8" fill="#f08a00"/>
      <circle cx="100" cy="80" r="1.6" fill="#b3122a"/>
      <ellipse class="sc-blink" cx="94" cy="91" rx="1.8" ry="2.2" fill="#2a1a1a"/><ellipse class="sc-blink" cx="106" cy="91" rx="1.8" ry="2.2" fill="#2a1a1a"/>
      <path d="M95 98 Q100 103 105 98" fill="none" stroke="#b3122a" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="90" cy="96" r="3" fill="#f08a8a" opacity=".5"/><circle cx="110" cy="96" r="3" fill="#f08a8a" opacity=".5"/>
    </g>
    ${[[24,176],[216,176],[40,150]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(${i === 2 ? .6 : 1})"><g class="sc-flowerspin">${[0,60,120,180,240,300].map((a) => `<ellipse cx="0" cy="-10" rx="5.5" ry="10" fill="#ffd54a" transform="rotate(${a})"/>`).join("")}</g><circle r="5" fill="#f08a00"/></g>`).join("")}
    ${[34,78,120,162,206].map((x, i) => `<circle class="sc-fall" style="--d:${i*.6}s" cx="${x}" cy="-6" r="${2.5+i%3}" fill="${i%2?'#f5a623':'#ffd54a'}"/>`).join("")}
  </svg>`,
  "ceremony-card": `<svg viewBox="0 0 240 200" aria-hidden="true">
    <defs><linearGradient id="wedbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4455a"/><stop offset="1" stop-color="#6a2433"/></linearGradient></defs>
    <rect width="240" height="200" rx="14" fill="url(#wedbg)"/>
    <circle class="sc-orbit2" cx="120" cy="110" r="84" fill="none" stroke="#e0b860" stroke-width="1.2" stroke-dasharray="3 7" opacity=".7"/>
    <path d="M20 56 Q120 -8 220 56Z" fill="#762f3c" stroke="#e0b860" stroke-width="2.5"/>
    ${Array.from({length: 11}, (_, i) => `<circle class="sc-bob" style="--d:${(i*.2).toFixed(1)}s" cx="${30 + i * 18}" cy="${58}" r="3.2" fill="#e0b860"/>`).join("")}
    <rect x="22" y="56" width="7" height="144" fill="#ae8b53"/><rect x="211" y="56" width="7" height="144" fill="#ae8b53"/>
    <!-- groom -->
    <path d="M118 190 Q118 138 150 134 Q182 138 182 190Z" fill="#f1e6cf"/>
    <path d="M132 142 L168 142 L150 158Z" fill="#e0b860"/>
    <circle cx="150" cy="134" r="0" />
    <circle cx="150" cy="104" r="17" fill="#d9a07a"/>
    <path d="M132 100 C128 70 172 70 168 100 C162 86 138 86 132 100Z" fill="#c9374a" stroke="#e0b860" stroke-width="2"/>
    <g class="sc-sway"><path d="M150 76 C144 62 147 54 150 48 C153 54 156 62 150 76Z" fill="#e0b860"/></g>
    <ellipse class="sc-blink" cx="144" cy="106" rx="1.9" ry="2.3" fill="#1d1414"/><ellipse class="sc-blink" cx="156" cy="106" rx="1.9" ry="2.3" fill="#1d1414"/>
    <path d="M144 114 Q150 119 156 114" fill="none" stroke="#7a2430" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M143 111 Q150 109 157 111" fill="none" stroke="#1d1414" stroke-width="1.6" stroke-linecap="round"/>
    <!-- bride -->
    <path d="M58 190 Q58 138 90 134 Q122 138 122 190Z" fill="#b3122a"/>
    <path d="M90 134 L118 190 L106 190 L84 144Z" fill="#e0b860"/>
    <circle cx="90" cy="106" r="17" fill="#e8b48a"/>
    <path d="M72 108 C66 70 114 70 108 108 C106 88 92 80 90 80 C88 80 74 88 72 108Z" fill="#c0392b" stroke="#e0b860" stroke-width="2"/>
    <path d="M78 92 C84 80 96 80 102 92 C96 86 84 86 78 92Z" fill="#2a1a1a"/>
    <circle cx="90" cy="88" r="2.4" fill="#b3122a"/>
    <ellipse class="sc-blink" cx="84" cy="108" rx="1.9" ry="2.3" fill="#2a1a1a"/><ellipse class="sc-blink" cx="96" cy="108" rx="1.9" ry="2.3" fill="#2a1a1a"/>
    <path d="M85 116 Q90 121 95 116" fill="none" stroke="#b3122a" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="80" cy="114" r="3" fill="#f08a8a" opacity=".5"/><circle cx="100" cy="114" r="3" fill="#f08a8a" opacity=".5"/>
    <!-- garland between them -->
    <path class="sc-garland" d="M92 140 Q120 176 148 140" fill="none" stroke="#ffd54a" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 9"/>
    <path class="sc-garland" style="animation-delay:-.8s" d="M92 144 Q120 182 148 144" fill="none" stroke="#f08aa0" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/>
    ${[106,120,134].map((x, i) => `<text class="sc-heart" style="--d:${i*.8}s" x="${x}" y="110" font-size="${11+i%2*4}" fill="#ffb3c1">❤</text>`).join("")}
    ${[44,196].map((x, i) => `<g><ellipse class="sc-flame" cx="${x}" cy="186" rx="4" ry="8" fill="#ff8a00"/><ellipse class="sc-flame in" cx="${x}" cy="188" rx="2" ry="4.5" fill="#ffd54a"/><path d="M${x-9} 194 Q${x} 200 ${x+9} 194Z" fill="#c9a85a"/></g>`).join("")}
  </svg>`,
  "reception-card": `<svg viewBox="0 0 240 140" aria-hidden="true">
    <line x1="120" y1="0" x2="120" y2="16" stroke="#8a8a99" stroke-width="1.5"/>
    <g class="sc-disco"><circle cx="120" cy="30" r="15" fill="#d6d6e6"/><ellipse class="sc-rot" cx="120" cy="30" rx="15" ry="15" fill="none" stroke="#9a9ab5" stroke-width="1"/><path d="M105 30H135M108 22H132M108 38H132" stroke="#9a9ab5" stroke-width="1"/></g>
    ${[[60,24],[184,34],[84,60],[160,56],[40,70],[206,70]].map(([x,y],i) => `<text class="sc-twinkle" style="--d:${i*.4}s" x="${x}" y="${y}" font-size="13" fill="#ae8b53">✦</text>`).join("")}
    <g class="sc-glass l"><path d="M-9 0 L9 0 L7 34 Q0 41 -7 34Z" fill="#fff0b3" fill-opacity=".75" stroke="#ae8b53" stroke-width="1.5"/><rect x="-1.5" y="38" width="3" height="22" fill="#ae8b53"/><ellipse cx="0" cy="62" rx="11" ry="3" fill="#ae8b53"/></g>
    <g class="sc-glass r"><path d="M-9 0 L9 0 L7 34 Q0 41 -7 34Z" fill="#fff0b3" fill-opacity=".75" stroke="#ae8b53" stroke-width="1.5"/><rect x="-1.5" y="38" width="3" height="22" fill="#ae8b53"/><ellipse cx="0" cy="62" rx="11" ry="3" fill="#ae8b53"/></g>
    ${[98,104,136,142,120].map((x,i) => `<circle class="sc-bubble" style="--d:${i*.45}s" cx="${x}" cy="84" r="${1.8+i%2}" fill="#fff"/>`).join("")}
    <text class="sc-note" style="--d:0s" x="46" y="118" font-size="18" fill="#762f3c">♪</text><text class="sc-note" style="--d:1.1s" x="188" y="118" font-size="18" fill="#762f3c">♫</text>
  </svg>`,
};

// Event cards: front shows title + date, click flips to reveal full details
document.querySelectorAll(".event-card").forEach((card) => {
  const q = (s) => card.querySelector(s);
  const front = document.createElement("div");
  front.className = "face card-front";
  const back = document.createElement("div");
  back.className = "face card-back";
  const backTitle = q("h3").cloneNode(true);
  backTitle.className = "back-title";
  [".card-index", ".card-icon", "h3", ".event-date"].forEach((s) => front.append(q(s)));
  const sceneKey = Object.keys(CARD_SCENES).find((k) => card.classList.contains(k));
  if (sceneKey) {
    const scene = document.createElement("div");
    scene.className = "card-scene";
    scene.innerHTML = CARD_SCENES[sceneKey];
    front.insertBefore(scene, front.querySelector("h3"));
  }
  const hint = document.createElement("span");
  hint.className = "flip-hint";
  hint.dataset.en = "TAP TO SEE DETAILS";
  hint.dataset.mr = "तपशील पाहण्यासाठी टॅप करा";
  hint.innerHTML = hint.dataset[currentLanguage];
  front.append(hint);
  back.append(backTitle, ...Array.from(card.children).filter((c) => !front.contains(c)));
  const backHint = document.createElement("span");
  backHint.className = "flip-hint back-hint";
  backHint.dataset.en = "↺ TAP TO CLOSE";
  backHint.dataset.mr = "↺ बंद करण्यासाठी टॅप करा";
  backHint.innerHTML = backHint.dataset[currentLanguage];
  back.append(backHint);
  const inner = document.createElement("div");
  inner.className = "flip-inner";
  inner.append(front, back);
  card.append(inner);
  card.classList.add("flip");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");
  const toggle = () => {
    const open = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(open));
  };
  card.addEventListener("click", (e) => { if (!e.target.closest("a")) toggle(); });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
});

// Photo lightbox: click Shivani or Akash to see their individual photo
(function lightbox() {
  const lb = document.getElementById("lightbox");
  const media = lb.querySelector(".lb-media");
  const people = Array.from(document.querySelectorAll(".portrait"));
  let index = 0;
  let touchX = 0;
  function render() {
    const p = people[index];
    const d = p.dataset;
    media.innerHTML = p.querySelector(".portrait-frame").innerHTML;
    media.className = "lb-media " + (p.classList.contains("portrait-bride") ? "is-bride" : "is-groom");
    lb.querySelector(".lb-name").textContent = d.name;
    lb.querySelector(".lb-role").innerHTML = d["role" + (currentLanguage === "mr" ? "Mr" : "En")];
    lb.querySelector(".lb-bio").textContent = d["bio" + (currentLanguage === "mr" ? "Mr" : "En")];
    lb.classList.remove("swap"); void lb.offsetWidth; lb.classList.add("swap");
  }
  function open(i) {
    index = i; render();
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("show"));
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => { lb.hidden = true; }, 400);
    people[index].focus({ preventScroll: true });
  }
  const step = (n) => { index = (index + n + people.length) % people.length; render(); };
  people.forEach((p, i) => {
    p.addEventListener("click", () => open(i));
    p.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  window.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
})();

// Opening gate
(function gate() {
  const g = document.getElementById("gate");
  document.getElementById("openInvite").addEventListener("click", () => {
    g.classList.add("open");
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
    setTimeout(() => g.classList.add("hidden"), 2000);
  });
})();

// Click burst particles
window.addEventListener("click", (e) => {
  if (reduceMotion) return;
  const shapes = ["✦", "❤", "✿", "✳", "❁", "💛", "🌸"];
  const colors = ["#c9707d", "#ae8b53", "#762f3c", "#f1d9a4", "#e8b4b8", "#f4b942"];
  const n = 26;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "burst";
    p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
    const dist = 60 + Math.random() * 130;
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";
    p.style.color = colors[Math.floor(Math.random() * colors.length)];
    p.style.fontSize = 10 + Math.random() * 16 + "px";
    p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--dy", Math.sin(angle) * dist - 30 + "px");
    p.style.setProperty("--rot", (Math.random() - 0.5) * 720 + "deg");
    p.style.animationDuration = 0.9 + Math.random() * 0.9 + "s";
    document.body.append(p);
    setTimeout(() => p.remove(), 1900);
  }
  const ring = document.createElement("span");
  ring.className = "burst-ring";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
  document.body.append(ring);
  setTimeout(() => ring.remove(), 800);

  // keep emitting a shower of petals/hearts from the exact click point
  let emitted = 0;
  const timer = setInterval(() => {
    const d = document.createElement("span");
    d.className = "drop";
    d.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    d.style.left = e.clientX + (Math.random() - 0.5) * 24 + "px";
    d.style.top = e.clientY + "px";
    d.style.color = colors[Math.floor(Math.random() * colors.length)];
    d.style.fontSize = 9 + Math.random() * 14 + "px";
    d.style.setProperty("--sx", (Math.random() - 0.5) * 220 + "px");
    d.style.setProperty("--fy", 160 + Math.random() * 280 + "px");
    d.style.setProperty("--rot", (Math.random() - 0.5) * 540 + "deg");
    d.style.animationDuration = 1.4 + Math.random() * 1.2 + "s";
    document.body.append(d);
    setTimeout(() => d.remove(), 2700);
    if (++emitted >= 30) clearInterval(timer);
  }, 55);
});

// Cursor sparkle trail
let lastSpark = 0;
window.addEventListener("mousemove", (e) => {
  if (reduceMotion || Date.now() - lastSpark < 70) return;
  lastSpark = Date.now();
  const s = document.createElement("span");
  s.className = "cursor-sparkle";
  s.textContent = "✦";
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  s.style.setProperty("--x", (Math.random() - 0.5) * 40 + "px");
  s.style.setProperty("--y", 10 + Math.random() * 30 + "px");
  document.body.append(s);
  setTimeout(() => s.remove(), 900);
});
