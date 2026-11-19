/* Flipbook Card — page turning with buttons, swipe, keyboard and dots */
(function () {
  var leaves = Core.$$(".leaf"), dots = Core.$("#dots"), prev = Core.$("#prev"), next = Core.$("#next"), cur = 0, locked = false;
  leaves.forEach(function (l) { l.style.setProperty("--n", l.getAttribute("data-n")); });
  leaves.forEach(function (_, i) { var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Page " + (i + 1)); b.addEventListener("click", function () { go(i); }); dots.appendChild(b); });
  var db = Core.$$("button", dots);
  /* leaves that have been turned have a reversed stacking order so the back faces stack correctly */
  function render() {
    leaves.forEach(function (l, i) {
      var turned = i < cur; l.classList.toggle("turned", turned);
      l.style.zIndex = turned ? i + 1 : 40 - i;
    });
    db.forEach(function (b, i) { b.classList.toggle("on", i === cur); });
    prev.disabled = cur === 0; next.disabled = cur === leaves.length - 1;
    /* shift the book to the right on the cover, centre it as pages turn on wide screens */
    var book = Core.$("#book"); book.style.transform = innerWidth > 900 && cur > 0 && cur < leaves.length - 1 ? "translateX(0)" : "translateX(0)";
  }
  function go(n) { n = Math.max(0, Math.min(leaves.length - 1, n)); if (n === cur) return; cur = n; render(); }
  prev.addEventListener("click", function () { go(cur - 1); }); next.addEventListener("click", function () { go(cur + 1); });
  addEventListener("keydown", function (e) { if (document.body.classList.contains("locked")) return; if (e.key === "ArrowRight") go(cur + 1); if (e.key === "ArrowLeft") go(cur - 1); });
  var sx = 0, sy = 0;
  Core.$(".desk").addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  Core.$(".desk").addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1)); });
  Core.$("#again").addEventListener("click", function () { go(0); });
  render();

  var cols = ["#c9a24a", "#ecd488", "#a8314f", "#f7e1e5"];
  Core.rain({ chars: ["✦", "❀", "✿"], colors: cols, count: 10, speed: 18, min: 10, max: 18 });
  Core.burst({ chars: ["✦", "❀", "✿", "❤"], colors: cols });
})();
