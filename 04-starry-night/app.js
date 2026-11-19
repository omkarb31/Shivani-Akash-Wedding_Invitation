/* Starry Night — canvas sky, constellation picker, scroll-merging stars */
(function () {
  /* sky canvas */
  var cv = document.getElementById("sky"), ctx = cv.getContext("2d"), W, H, stars = [], shoots = [], mx = 0, my = 0, sy = 0;
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    var n = Math.round(W * H / 7000); stars = [];
    for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + .3, d: Math.random() * .9 + .1, p: Math.random() * 6.28, s: Math.random() * 1.6 + .4, c: ["#fff", "#cfd2ff", "#f5da8c", "#a99bff"][Math.floor(Math.random() * 4)] });
  }
  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(function (s) {
      var a = .35 + .65 * (.5 + .5 * Math.sin(t / 700 * s.s + s.p));
      var x = (s.x - mx * 14 * s.d + W) % W, y = (s.y - sy * .08 * s.d - my * 10 * s.d + H * 4) % H;
      ctx.globalAlpha = a; ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
      if (s.r > 1.3) { ctx.globalAlpha = a * .35; ctx.fillRect(x - 5, y - .4, 10, .8); ctx.fillRect(x - .4, y - 5, .8, 10); }
    });
    if (Math.random() < .004 && shoots.length < 2) shoots.push({ x: Math.random() * W, y: Math.random() * H * .4, l: 0, v: 9 + Math.random() * 6 });
    shoots = shoots.filter(function (s) {
      s.l += s.v; var x = s.x - s.l, y = s.y + s.l * .6, g = ctx.createLinearGradient(x, y, x + 90, y - 54);
      g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y - 54); ctx.stroke();
      return s.l < 520;
    });
    ctx.globalAlpha = 1;
    if (!Core.reduce) requestAnimationFrame(frame);
  }
  size(); addEventListener("resize", size);
  addEventListener("mousemove", function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  requestAnimationFrame(frame);

  /* constellation */
  var nodes = Core.$$(".snode"), panels = Core.$$(".panel");
  nodes.forEach(function (n) {
    function pick() { var k = +n.getAttribute("data-ev"); nodes.forEach(function (x, i) { x.classList.toggle("on", i === k); }); panels.forEach(function (p, i) { p.classList.toggle("on", i === k); }); }
    n.addEventListener("click", pick);
    n.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") pick(); });
  });

  /* two stars drift together */
  var tog = Core.$(".together");
  function onScroll() {
    sy = scrollY;
    var r = tog.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight) * 1.25));
    tog.style.setProperty("--p", p.toFixed(3));
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var cols = ["#f5da8c", "#a99bff", "#ffffff", "#9fd0ff"];
  Core.burst({ chars: ["✦", "✧", "⋆", "☾", "✺"], colors: cols });
  Core.trail({ chars: ["✦"], colors: ["#f5da8c"] });
})();
