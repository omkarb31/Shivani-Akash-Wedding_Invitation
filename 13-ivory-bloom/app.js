/* Ivory Bloom — soft petals + blossom burst */
(function () {
  var cols = ["#e9a3ad", "#cfdcc3", "#f9d3b8", "#e3c8ee", "#d98e98"];
  Core.rain({ chars: ["❀", "✿", "🌸"], colors: cols, count: 14, speed: 16, min: 12, max: 22 });
  Core.burst({ chars: ["❀", "✿", "🌸", "❁", "🤍"], colors: cols });
})();
