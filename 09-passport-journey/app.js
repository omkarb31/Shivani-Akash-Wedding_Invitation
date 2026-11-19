/* Passport Journey — the plane flies along the route as you scroll */
(function () {
  var wrap = Core.$("#mapwrap"), plane = Core.$("#plane"), done = Core.$("#rpd");
  var len = done.getTotalLength(); done.style.strokeDasharray = len; done.style.strokeDashoffset = len;
  function sync() {
    var r = wrap.getBoundingClientRect(), vh = innerHeight;
    var p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .8 + r.height * .3)));
    plane.style.setProperty("--p", p.toFixed(4));
    done.style.strokeDashoffset = len * (1 - p);
  }
  addEventListener("scroll", sync, { passive: true }); addEventListener("resize", sync); sync();

  var cols = ["#1f3a5f", "#c0392b", "#c9a24a", "#2f7d5a"];
  Core.rain({ chars: ["✈", "✦", "✿"], colors: cols, count: 8, speed: 18, min: 12, max: 20 });
  Core.burst({ chars: ["✈", "✦", "❤", "✿", "📮"], colors: cols });
})();
