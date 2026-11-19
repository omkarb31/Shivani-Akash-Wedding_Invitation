/* Ink & Paper — horizontal panels: wheel→sideways, dots, progress, arrows, tap-to-open scrolls */
(function () {
  var track = Core.$("#scroll"), panels = Core.$$(".panel"), dots = Core.$("#dots"), bar = Core.$("#bar"), cur = 0;
  panels.forEach(function (p, i) {
    var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Panel " + (i + 1));
    b.innerHTML = "<span data-i='" + p.getAttribute("data-name") + "'></span>"; dots.appendChild(b);
    b.addEventListener("click", function () { go(i); });
  });
  var dbtn = Core.$$("button", dots);
  function go(i) { cur = Math.max(0, Math.min(panels.length - 1, i)); track.scrollTo({ left: cur * track.clientWidth, behavior: "smooth" }); }
  Core.$("#pl").addEventListener("click", function () { go(cur - 1); });
  Core.$("#pr").addEventListener("click", function () { go(cur + 1); });
  addEventListener("keydown", function (e) { if (document.body.classList.contains("locked")) return; if (e.key === "ArrowRight") go(cur + 1); if (e.key === "ArrowLeft") go(cur - 1); });
  /* mouse wheel scrolls sideways unless the panel itself can scroll vertically */
  var wheelLock = 0;
  track.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    var p = panels[cur], canScroll = p.scrollHeight > p.clientHeight + 4;
    if (canScroll && ((e.deltaY > 0 && p.scrollTop + p.clientHeight < p.scrollHeight - 2) || (e.deltaY < 0 && p.scrollTop > 2))) return;
    e.preventDefault(); if (Date.now() - wheelLock < 650) return; wheelLock = Date.now(); go(cur + (e.deltaY > 0 ? 1 : -1));
  }, { passive: false });

  function update() {
    var w = track.clientWidth, i = Math.round(track.scrollLeft / w); cur = i;
    dbtn.forEach(function (b, k) { b.classList.toggle("on", k === i); });
    var max = track.scrollWidth - w; bar.style.width = (max > 0 ? track.scrollLeft / max * 100 : 0) + "%";
    panels.forEach(function (p, k) { if (Math.abs(k - track.scrollLeft / w) < .6) p.classList.add("seen"); });
  }
  track.addEventListener("scroll", update, { passive: true }); addEventListener("resize", update);
  document.addEventListener("opened", function () { panels[0].classList.add("seen"); });
  panels[0].classList.add("seen"); update();

  /* hanging scrolls: tap to open on touch */
  Core.$$(".kake").forEach(function (k) { k.addEventListener("click", function (e) { if (e.target.closest("a")) return; if (e.pointerType !== "mouse") k.classList.toggle("open"); }); });

  var cols = ["#c8321e", "#161616", "#b9964a"];
  Core.rain({ chars: ["🌸", "✿", "❀"], colors: ["#f0a6b4", "#e58fa6", "#f7c6d0"], count: 16, speed: 14, min: 12, max: 20 });
  Core.burst({ chars: ["🌸", "✿", "❀", "愛", "✦"], colors: cols });
})();
