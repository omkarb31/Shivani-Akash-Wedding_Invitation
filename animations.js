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
