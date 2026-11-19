/* Pixel Quest — pixelate photos, level select, ? blocks, restart */
(function () {
  /* turn photos into chunky 16-colour-ish pixel art */
  function pixelate(cv) {
    var img = new Image(); img.onload = function () {
      var N = 40, sm = document.createElement("canvas"); sm.width = sm.height = N;
      var sc = sm.getContext("2d"); sc.imageSmoothingEnabled = true;
      var s = Math.min(img.width, img.height), sx = (img.width - s) / 2, sy = (img.height - s) / 2;
      sc.drawImage(img, sx, sy, s, s, 0, 0, N, N);
      var d = sc.getImageData(0, 0, N, N), a = d.data, lv = 5;
      for (var i = 0; i < a.length; i += 4) for (var c = 0; c < 3; c++) a[i + c] = Math.round(a[i + c] / 255 * (lv - 1)) / (lv - 1) * 255;
      sc.putImageData(d, 0, 0);
      cv.width = cv.height = 240; var cx = cv.getContext("2d"); cx.imageSmoothingEnabled = false; cx.drawImage(sm, 0, 0, N, N, 0, 0, 240, 240);
    }; img.src = cv.getAttribute("data-src");
  }
  Core.$$("canvas[data-src]").forEach(pixelate);

  /* level select */
  var nodes = Core.$$(".node"), dialogs = Core.$$(".dialog");
  nodes.forEach(function (n) { n.addEventListener("click", function () {
    var k = +n.getAttribute("data-lv"); nodes.forEach(function (x, i) { x.classList.toggle("on", i === k); }); dialogs.forEach(function (x, i) { x.classList.toggle("on", i === k); });
  }); });

  /* ? blocks: tap to bump on touch */
  Core.$$(".blk").forEach(function (b) { b.addEventListener("click", function (e) { if (e.target.closest("a")) return; if (e.pointerType !== "mouse") b.classList.toggle("hit"); }); });

  /* player stat bars fill when seen */
  var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .4 });
  Core.$$(".pl").forEach(function (p) { io.observe(p); });

  Core.$("#again").addEventListener("click", function () { scrollTo({ top: 0, behavior: "smooth" }); });

  var cols = ["#fcd000", "#ff5ea8", "#fcfcfc", "#5c94fc"];
  Core.rain({ chars: ["■", "★", "♥", "◆"], colors: cols, count: 14, speed: 12, min: 10, max: 20 });
  Core.burst({ chars: ["★", "♥", "■", "◆", "●", "🍄"], colors: cols });
})();
