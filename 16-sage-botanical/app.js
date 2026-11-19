/* Sage Botanical — builds the leaf wreath and branches, grows them after the gate opens */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  function ellipse(parent, cx, cy, rx, ry, rot, i) {
    var e = document.createElementNS(NS, "ellipse");
    e.setAttribute("cx", cx); e.setAttribute("cy", cy); e.setAttribute("rx", rx); e.setAttribute("ry", ry);
    e.setAttribute("transform", "rotate(" + rot + " " + cx + " " + cy + ")"); e.style.setProperty("--i", i); parent.appendChild(e);
  }
  /* wreath leaves around the circle */
  var wl = document.getElementById("wl"), n = 26;
  for (var i = 0; i < n; i++) {
    var a = i / n * Math.PI * 2, r = 128, side = i % 2 ? 1 : -1;
    var cx = 150 + Math.cos(a) * r, cy = 150 + Math.sin(a) * r, rot = a * 180 / Math.PI + 90 + side * 38;
    ellipse(wl, cx + Math.cos(a) * 9 * side * 0, cy, 14, 5.5, rot, i);
  }
  /* branches: leaves alternate along the stem */
  var pts = [[48,740,-40],[62,700,40],[44,640,-50],[40,590,35],[26,540,-55],[40,495,40],[34,440,-35],[60,400,35],[52,350,-50],[44,300,40],[40,250,-35],[58,200,35],[68,150,-45],[66,100,40],[78,50,-30]];
  Core.$$(".branch .leaves").forEach(function (g) { pts.forEach(function (p, i) { var e = document.createElementNS(NS, "ellipse"); e.setAttribute("cx", p[0] + (p[2] > 0 ? 14 : -14)); e.setAttribute("cy", p[1]); e.setAttribute("rx", 16); e.setAttribute("ry", 6); e.style.setProperty("--i", i); e.style.setProperty("--r", (p[2] > 0 ? -25 : 25) + "deg"); e.style.transformOrigin = (p[2] > 0 ? "0%" : "100%") + " 50%"; g.appendChild(e); }); });
  document.addEventListener("opened", function () { Core.$$(".branch").forEach(function (b) { b.classList.add("grow"); }); });

  var cols = ["#8aa07c", "#b9c9ac", "#6b7a4f", "#e8c4b8"];
  Core.rain({ chars: ["🍃", "🌿", "✿"], colors: cols, count: 12, speed: 16, min: 12, max: 22 });
  Core.burst({ chars: ["🍃", "🌿", "✿", "❀", "🌼"], colors: cols });
})();
