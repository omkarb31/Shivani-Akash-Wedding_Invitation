/* Garden Blush — petals + blossom burst */
(function () {
  var chars = ["🌸", "🌷", "🌼", "❀", "✿", "💗"], colors = ["#e0728f", "#f7a9ba", "#8fae88", "#c25f7b", "#e8b4b8", "#f4c27a"];
  Core.rain({ chars: ["🌸", "❀", "✿", "🌼"], colors: colors, count: 18, speed: 12, min: 12, max: 22 });
  Core.burst({ chars: chars, colors: colors });
  Core.trail({ chars: ["✿"], colors: ["#e58fa6"] });
})();
