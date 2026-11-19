Object.assign(CONTENT.en, { u_line: "You are warmly invited to celebrate with us", u_morning: "MORNING", u_midday: "MIDDAY", u_evening: "EVENING" });
Object.assign(CONTENT.mr, { u_line: "आपणास आमच्या आनंदात सहभागी होण्याचे सप्रेम निमंत्रण", u_morning: "सकाळ", u_midday: "दुपार", u_evening: "संध्याकाळ" });

(function () {
  var cv = document.getElementById("ff"), x = cv.getContext("2d"), W, H, f = [];
  function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; f = []; var n = Math.round(W * H / 26000); for (var i = 0; i < n; i++) f.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 1, a: Math.random() * 6.28, s: Math.random() * .5 + .15, p: Math.random() * 6.28 }); }
  function frame(t) {
    x.clearRect(0, 0, W, H);
    f.forEach(function (o) {
      o.a += (Math.random() - .5) * .08; o.x += Math.cos(o.a) * o.s; o.y += Math.sin(o.a) * o.s * .6 - .08; if (o.y < -10) o.y = H + 10; if (o.x < -10) o.x = W + 10; if (o.x > W + 10) o.x = -10;
      var g = .35 + .65 * (.5 + .5 * Math.sin(t / 600 + o.p)), gr = x.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 6);
      gr.addColorStop(0, "rgba(255,238,170," + g + ")"); gr.addColorStop(1, "rgba(255,238,170,0)"); x.fillStyle = gr; x.beginPath(); x.arc(o.x, o.y, o.r * 6, 0, 6.283); x.fill();
    });
    if (!Core.reduce) requestAnimationFrame(frame);
  }
  size(); addEventListener("resize", size); requestAnimationFrame(frame);
  document.addEventListener("opened", function () { document.body.classList.add("grown"); });
  var cols = ["#f2b8c6", "#e8c88a", "#fff6d6", "#b9c8ff"];
  Core.burst({ chars: ["✦", "🌙", "❀", "✧", "💫"], colors: cols });
})();
