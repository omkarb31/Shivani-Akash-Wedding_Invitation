/* Boho Terracotta — tabs, active nav, particles */
(function () {
  var tabs = Core.$$(".tab"), panes = Core.$$(".pane");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      var k = +t.getAttribute("data-tab");
      tabs.forEach(function (x, i) { x.classList.toggle("on", i === k); });
      panes.forEach(function (p, i) { p.classList.toggle("on", i === k); });
    });
  });
  /* highlight the current section in the sidebar */
  var links = Core.$$(".menu a"), map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (l) { l.classList.remove("act"); }); var a = map[e.target.id]; if (a) { a.classList.add("act"); if (innerWidth <= 900) a.scrollIntoView({ inline: "center", block: "nearest" }); } } });
  }, { rootMargin: "-40% 0px -55% 0px" });
  Core.$$(".sec").forEach(function (s) { io.observe(s); });

  var cols = ["#b5573a", "#d9a066", "#a0a37a", "#e9b98a", "#8d3d22"];
  Core.rain({ chars: ["❀", "✿", "☼"], colors: cols, count: 14, speed: 14 });
  Core.burst({ chars: ["❀", "✿", "☼", "✺", "❋"], colors: cols });
})();
