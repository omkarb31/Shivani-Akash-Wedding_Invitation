/* Filmy Cinema — timecode, particles */
(function () {
  var tc = document.getElementById("tc"), t0 = Date.now();
  function p(n) { return String(n).padStart(2, "0"); }
  setInterval(function () {
    var ms = Date.now() - t0, f = Math.floor(ms / 40) % 25, s = Math.floor(ms / 1000) % 60, m = Math.floor(ms / 60000) % 60, h = Math.floor(ms / 3600000);
    if (tc) tc.textContent = p(h) + ":" + p(m) + ":" + p(s) + ":" + p(f);
  }, 40);
  var cols = ["#ff4d79", "#ffc83d", "#fff0e0"];
  Core.rain({ chars: ["★", "✦"], colors: cols, count: 16, speed: 12, min: 10, max: 20 });
  Core.burst({ chars: ["★", "✦", "🎬", "🎞️", "🍿", "❤"], colors: cols });
})();
