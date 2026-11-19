/* Neon Sangeet — playlist accordion, now-playing bar, encore */
(function () {
  var trks = Core.$$(".trk");
  trks.forEach(function (t) {
    Core.$(".row", t).addEventListener("click", function () {
      var open = t.classList.contains("on");
      trks.forEach(function (x) { x.classList.remove("on"); Core.$(".pb", x).textContent = "▶"; });
      if (!open) { t.classList.add("on"); Core.$(".pb", t).textContent = "❚❚"; npName.textContent = Core.$(".no", t).textContent + " · " + Core.$(".ti b", t).textContent.toUpperCase(); }
    });
  });

  var secs = Core.$$("[data-track]"), npName = Core.$("#npName"), bar = Core.$("#progBar"), cur = 0;
  function show(i) { cur = i; npName.textContent = secs[i].getAttribute("data-track"); }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) show(secs.indexOf(e.target)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(function (s) { io.observe(s); });
  addEventListener("scroll", function () {
    var m = document.documentElement.scrollHeight - innerHeight; bar.style.width = (m > 0 ? scrollY / m * 100 : 0) + "%";
  }, { passive: true });
  Core.$("#nx").addEventListener("click", function () { var n = Math.min(secs.length - 1, cur + 1); secs[n].scrollIntoView({ behavior: "smooth" }); });
  Core.$("#pp").addEventListener("click", function () { var n = Math.max(0, cur - 1); secs[n].scrollIntoView({ behavior: "smooth" }); });

  var cols = ["#ff2bd6", "#19e3ff", "#ffe14d", "#ffffff"];
  Core.$("#encore").addEventListener("click", function (e) {
    var r = e.target.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top;
    for (var k = 0; k < 6; k++) setTimeout(function () { document.dispatchEvent(new MouseEvent("click", { clientX: cx + (Math.random() - .5) * 300, clientY: cy - Math.random() * 100, bubbles: true })); }, k * 140);
  });
  Core.rain({ chars: ["♪", "♫", "✦", "★"], colors: cols, count: 14, speed: 14, rise: true, min: 12, max: 24 });
  Core.burst({ chars: ["♪", "♫", "★", "✦", "🪩", "💜"], colors: cols });
})();
