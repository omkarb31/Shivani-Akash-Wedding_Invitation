/* Art Deco Gala — swipeable card deck + countdown dial arcs */
(function () {
  var deck = Core.$("#deck"), cards = Core.$$(".card"), order = cards.map(function (c, i) { return i; }), count = Core.$("#dcount");

  function layout() {
    order.forEach(function (idx, pos) {
      var c = cards[idx];
      c.style.zIndex = 10 - pos; c.style.opacity = pos > 2 ? 0 : 1; c.style.pointerEvents = pos === 0 ? "auto" : "none";
      c.style.transform = "translate(" + pos * 14 + "px," + pos * 16 + "px) rotate(" + (pos * 2.4 * (pos % 2 ? 1 : -1)) + "deg) scale(" + (1 - pos * .05) + ")";
      c.style.filter = pos === 0 ? "none" : "brightness(" + (1 - pos * .22) + ")";
    });
    count.textContent = (order[0] + 1) + " / " + cards.length;
  }
  function sendBack(dir) {
    var top = cards[order[0]]; top.style.transition = "transform .45s cubic-bezier(.5,0,.5,1), opacity .4s";
    top.style.transform = "translate(" + dir * 130 + "%, 30px) rotate(" + dir * 18 + "deg)"; top.style.opacity = 0;
    setTimeout(function () { order.push(order.shift()); top.style.transition = ""; layout(); }, 380);
  }
  function bringBack() {
    order.unshift(order.pop()); var c = cards[order[0]]; c.style.transition = "none"; c.style.transform = "translate(-130%, 30px) rotate(-18deg)"; c.style.opacity = 0;
    requestAnimationFrame(function () { requestAnimationFrame(function () { c.style.transition = ""; layout(); }); });
  }
  Core.$("#dnext").addEventListener("click", function () { sendBack(1); });
  Core.$("#dprev").addEventListener("click", bringBack);

  /* drag the top card */
  var sx = 0, dx = 0, drag = false;
  deck.addEventListener("pointerdown", function (e) { if (e.target.closest("a")) return; var c = cards[order[0]]; if (!c.contains(e.target)) return; drag = true; sx = e.clientX; dx = 0; c.classList.add("dragging"); });
  addEventListener("pointermove", function (e) { if (!drag) return; dx = e.clientX - sx; var c = cards[order[0]]; c.style.transform = "translate(" + dx + "px,0) rotate(" + dx * .06 + "deg)"; });
  addEventListener("pointerup", function () { if (!drag) return; drag = false; var c = cards[order[0]]; c.classList.remove("dragging"); if (Math.abs(dx) > 90) sendBack(dx > 0 ? 1 : -1); else layout(); });
  layout();

  /* countdown arcs */
  var WEDDING = new Date("2026-12-12T11:30:00+05:30"), start = new Date("2026-01-01T00:00:00+05:30");
  function arcs() {
    var s = Math.max(0, WEDDING - Date.now()) / 1000, total = (WEDDING - start) / 1000;
    var set = function (id, f) { Core.$(id).style.strokeDashoffset = 276 * (1 - Math.min(1, Math.max(0, f))); };
    set("#a-d", s / total); set("#a-h", (s % 86400) / 86400); set("#a-m", (s % 3600) / 3600); set("#a-s", (s % 60) / 60);
  }
  arcs(); setInterval(arcs, 1000);

  var cols = ["#d4af37", "#f3dc86", "#f1e5c3", "#ffffff"];
  Core.rain({ chars: ["◆", "✦", "○"], colors: cols, count: 18, speed: 12, rise: true, min: 8, max: 16 });
  Core.burst({ chars: ["◆", "✦", "★", "♛", "✺"], colors: cols });
})();
