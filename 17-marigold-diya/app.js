/* Marigold & Diya — rising lanterns of light + marigold petals */
(function () {
  var cols = ["#ffb703", "#ff9f1c", "#f4c95d", "#c2185b", "#fff3d6"];
  Core.rain({ chars: ["✦", "●", "✿"], colors: cols, count: 18, speed: 14, rise: true, min: 8, max: 18 });
  Core.burst({ chars: ["✿", "🪔", "✦", "🌼", "❀"], colors: cols });
})();
