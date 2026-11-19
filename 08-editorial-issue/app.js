/* Editorial Issue — subtle particles (ink dots) + burst */
(function () {
  var cols = ["#d4231a", "#111111", "#f4c77a"];
  Core.rain({ chars: ["✦", "●", "✳"], colors: cols, count: 10, speed: 16, min: 8, max: 16 });
  Core.burst({ chars: ["✦", "★", "❤", "✳", "●"], colors: cols });
})();
