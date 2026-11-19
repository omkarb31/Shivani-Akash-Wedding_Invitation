/* Royal Maharaja — accordion pillars + particles */
(function () {
  var pillars = Core.$$(".pillar");
  function activate(p) {
    pillars.forEach(function (x) { var on = x === p; x.classList.toggle("active", on); x.setAttribute("aria-expanded", on); });
  }
  pillars.forEach(function (p) {
    p.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && innerWidth > 800) activate(p); });
    p.addEventListener("click", function () { activate(p); });
    p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(p); } });
  });
  var chars = ["✦", "❖", "✧", "✺"], colors = ["#e5bb5e", "#f6ecd2", "#c99a4e", "#9db0ff"];
  Core.rain({ chars: ["✦", "✧"], colors: colors, count: 22, speed: 12 });
  Core.burst({ chars: chars.concat(["👑"]), colors: colors });
  Core.trail({ chars: ["✦"], colors: ["#e5bb5e"] });
})();
