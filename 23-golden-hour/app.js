Object.assign(CONTENT.en, { u_line: "You are warmly invited to celebrate with us", u_morning: "MORNING", u_midday: "MIDDAY", u_evening: "EVENING" });
Object.assign(CONTENT.mr, { u_line: "आपणास आमच्या आनंदात सहभागी होण्याचे सप्रेम निमंत्रण", u_morning: "सकाळ", u_midday: "दुपार", u_evening: "संध्याकाळ" });

(function () {
  var stops = [
    { p: 0,    a: [255,233,184], b: [255,201,138] },
    { p: .38,  a: [255,214,160], b: [255,160,120] },
    { p: .62,  a: [250,150,130], b: [200,90,130] },
    { p: .8,   a: [120,70,130],  b: [60,40,100] },
    { p: 1,    a: [24,20,54],    b: [46,32,88] }
  ];
  function mix(x, y, t) { return x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }); }
  var sun = document.getElementById("sun"), stars = document.getElementById("stars");
  function sky() {
    var m = document.documentElement.scrollHeight - innerHeight, p = m > 0 ? Math.min(1, Math.max(0, scrollY / m)) : 0, i = 0;
    while (i < stops.length - 2 && p > stops[i + 1].p) i++;
    var s0 = stops[i], s1 = stops[i + 1], t = Math.min(1, Math.max(0, (p - s0.p) / (s1.p - s0.p)));
    var a = mix(s0.a, s1.a, t), b = mix(s0.b, s1.b, t), B = document.body.style;
    B.setProperty("--sky1", "rgb(" + a + ")"); B.setProperty("--sky2", "rgb(" + b + ")");
    sun.style.top = (10 + p * 58) + "%"; sun.style.filter = "hue-rotate(" + (-p * 25) + "deg) saturate(" + (1 + p * .4) + ")"; sun.style.opacity = Math.max(0, 1 - Math.max(0, p - .78) * 4.5);
    B.setProperty("--stars", Math.min(1, Math.max(0, (p - .6) * 2.8)));
    document.body.classList.toggle("dusk", p > .6);
  }
  addEventListener("scroll", sky, { passive: true }); addEventListener("resize", sky); sky();
  var cols = ["#ffb347", "#ff8a65", "#fff1c9", "#c0527a"];
  Core.burst({ chars: ["✦", "☀", "❤", "✧"], colors: cols });
})();
