/* core.js — tiny engine shared by designs 02–07 (language, countdown, actions, video, particles, lightbox, reveal) */
(function () {
  "use strict";
  var C = window.CONTENT, lang = "en";
  try { lang = localStorage.getItem("sa-lang") || window.DEFAULT_LANG || "en"; } catch (e) { lang = window.DEFAULT_LANG || "en"; }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function t(k) { return (C[lang] && C[lang][k] != null ? C[lang][k] : (C.en[k] != null ? C.en[k] : k)); }

  function apply() {
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-mr", lang === "mr");
    $$("[data-i]").forEach(function (el) {
      var v = t(el.getAttribute("data-i"));
      if (el.hasAttribute("data-html")) el.innerHTML = v; else el.textContent = v;
    });
    $$("[data-i-label]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i-label"))); });
    $$("[data-lang-label]").forEach(function (el) { el.textContent = t("lang"); });
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  function setLang(l) { lang = l; try { localStorage.setItem("sa-lang", l); } catch (e) {} apply(); }

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "core-toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* countdown */
  var WEDDING = new Date("2026-12-12T11:30:00+05:30");
  function tick() {
    var s = Math.floor(Math.max(0, WEDDING - Date.now()) / 1000);
    var v = { days: Math.floor(s / 86400), hours: Math.floor(s % 86400 / 3600), minutes: Math.floor(s % 3600 / 60), seconds: s % 60 };
    $$("[data-cd]").forEach(function (el) {
      var k = el.getAttribute("data-cd"), txt = String(v[k]).padStart(k === "days" ? 3 : 2, "0");
      if (el.textContent !== txt) { el.textContent = txt; if (!reduce) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); } }
    });
  }

  /* calendar / copy */
  function calendar() {
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Shivani and Akash//Wedding Invitation//EN", "BEGIN:VEVENT",
      "UID:shivani-akash-wedding-20261212@example.com", "DTSTAMP:20260101T000000Z", "DTSTART:20261212T060000Z", "DTEND:20261212T173000Z",
      "SUMMARY:Wedding of Shivani & Akash", "LOCATION:The Gulmohar Courtyard\\, Koregaon Park\\, Pune",
      "DESCRIPTION:Wedding ceremony at 11:30 AM followed by dinner and dancing.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = "shivani-akash-wedding.ics"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast(t("cal_done"));
  }
  function copyAddr() {
    var addr = "The Gulmohar Courtyard, 12 Riverside Road, Koregaon Park, Pune, Maharashtra 411001";
    (navigator.clipboard ? navigator.clipboard.writeText(addr) : Promise.reject()).then(function () { toast(t("copied")); }, function () { toast(t("copy_fail")); });
  }

  function shareInv() {
    var data = { title: document.title, text: t("share_text"), url: location.href.split("#")[0] };
    if (navigator.share) navigator.share(data).catch(function () {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(t("share_text") + " " + data.url), "_blank", "noopener");
  }
  function rsvp() { window.open("https://wa.me/?text=" + encodeURIComponent(t("rsvp_text")), "_blank", "noopener"); }

  /* hover-to-play video (tap toggles on touch) */
  function hoverVideo(box) {
    var v = $("video", box); if (!v) return;
    var play = function () { box.classList.add("playing"); v.play().catch(function () {}); };
    var stop = function () { box.classList.remove("playing"); v.pause(); };
    box.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") play(); });
    box.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") stop(); });
    box.addEventListener("focus", function () { if (box.matches(":focus-visible")) play(); });
    box.addEventListener("blur", stop);
    box.addEventListener("click", function (e) { if (e.pointerType === "mouse") return; box.classList.contains("playing") ? stop() : play(); });
    new IntersectionObserver(function (en) { if (!en[0].isIntersecting) stop(); }).observe(box);
  }

  /* falling particles + click burst + sparkle trail */
  function rain(o) {
    if (reduce) return;
    var layer = document.createElement("div"); layer.className = "core-rain"; layer.setAttribute("aria-hidden", "true");
    var n = innerWidth < 600 ? Math.round((o.count || 20) / 2) : (o.count || 20);
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span"), size = (o.min || 10) + Math.random() * ((o.max || 22) - (o.min || 10));
      s.textContent = o.chars[i % o.chars.length]; s.style.color = o.colors[i % o.colors.length];
      s.style.cssText += "left:" + Math.random() * 100 + "%;font-size:" + size + "px;animation-duration:" + ((o.speed || 11) + Math.random() * (o.speed || 11)) + "s," + (2.5 + Math.random() * 3) + "s;animation-delay:" + -Math.random() * 18 + "s," + -Math.random() * 3 + "s;";
      s.style.color = o.colors[i % o.colors.length];
      if (o.rise) s.classList.add("rise");
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
  }
  function burst(o) {
    addEventListener("click", function (e) {
      if (reduce) return;
      var n = 24, i;
      for (i = 0; i < n; i++) {
        var p = document.createElement("span"); p.className = "core-burst"; p.textContent = o.chars[Math.floor(Math.random() * o.chars.length)];
        var a = Math.PI * 2 * i / n + Math.random() * .5, d = 60 + Math.random() * 130;
        p.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;color:" + o.colors[Math.floor(Math.random() * o.colors.length)] + ";font-size:" + (10 + Math.random() * 16) + "px;--dx:" + Math.cos(a) * d + "px;--dy:" + (Math.sin(a) * d - 30) + "px;--rot:" + (Math.random() - .5) * 720 + "deg;animation-duration:" + (.9 + Math.random() * .9) + "s";
        document.body.appendChild(p); setTimeout((function (x) { return function () { x.remove(); }; })(p), 1900);
      }
      var k = 0, tm = setInterval(function () {
        var d2 = document.createElement("span"); d2.className = "core-drop"; d2.textContent = o.chars[Math.floor(Math.random() * o.chars.length)];
        d2.style.cssText = "left:" + (e.clientX + (Math.random() - .5) * 24) + "px;top:" + e.clientY + "px;color:" + o.colors[Math.floor(Math.random() * o.colors.length)] + ";font-size:" + (9 + Math.random() * 14) + "px;--sx:" + (Math.random() - .5) * 220 + "px;--fy:" + (160 + Math.random() * 280) + "px;--rot:" + (Math.random() - .5) * 540 + "deg;animation-duration:" + (1.4 + Math.random() * 1.2) + "s";
        document.body.appendChild(d2); setTimeout(function () { d2.remove(); }, 2700);
        if (++k >= 26) clearInterval(tm);
      }, 55);
    });
  }
  function trail(o) {
    var last = 0;
    addEventListener("mousemove", function (e) {
      if (reduce || Date.now() - last < 70) return; last = Date.now();
      var s = document.createElement("span"); s.className = "core-spark"; s.textContent = o.chars[0];
      s.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;color:" + o.colors[0] + ";--x:" + (Math.random() - .5) * 40 + "px;--y:" + (10 + Math.random() * 30) + "px";
      document.body.appendChild(s); setTimeout(function () { s.remove(); }, 900);
    });
  }

  /* scroll reveal */
  function reveal() {
    var els = $$(".rv"); if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e, i) { e.style.setProperty("--d", (e.dataset.d || (i % 4) * 0.1) + "s"); io.observe(e); });
  }

  /* gate (opening screen) */
  function gate() {
    var g = $("[data-gate]"); if (!g) return;
    var btn = $("[data-open]", g);
    btn.addEventListener("click", function () {
      g.classList.add("open"); document.body.classList.remove("locked"); scrollTo(0, 0);
      document.dispatchEvent(new CustomEvent("opened"));
      setTimeout(function () { g.classList.add("hidden"); }, 2000);
    });
  }

  /* lightbox: [data-lightbox="group"] data-img data-name data-role data-bio (content keys) */
  function lightbox() {
    var items = $$("[data-lightbox]"); if (!items.length) return;
    var lb = document.createElement("div"); lb.className = "core-lb"; lb.hidden = true;
    lb.innerHTML = '<button class="lb-nav lb-p" aria-label="Previous">‹</button><div class="lb-card"><button class="lb-x" aria-label="Close">×</button><div class="lb-img"></div><div class="lb-txt"><span class="lb-role"></span><h3 class="lb-name"></h3><p class="lb-bio"></p></div></div><button class="lb-nav lb-n" aria-label="Next">›</button>';
    document.body.appendChild(lb);
    var idx = 0, group = [];
    function render() {
      var it = group[idx];
      $(".lb-img", lb).innerHTML = '<img src="' + it.getAttribute("data-img") + '" alt="">';
      $(".lb-name", lb).textContent = it.getAttribute("data-name");
      $(".lb-role", lb).textContent = t(it.getAttribute("data-role"));
      $(".lb-bio", lb).textContent = t(it.getAttribute("data-bio"));
      lb.classList.remove("swap"); void lb.offsetWidth; lb.classList.add("swap");
    }
    function open(it) {
      group = items.filter(function (x) { return x.getAttribute("data-lightbox") === it.getAttribute("data-lightbox"); });
      idx = group.indexOf(it); render(); lb.hidden = false; requestAnimationFrame(function () { lb.classList.add("show"); });
      document.body.style.overflow = "hidden"; $(".lb-x", lb).focus();
    }
    function close() { lb.classList.remove("show"); document.body.style.overflow = ""; setTimeout(function () { lb.hidden = true; }, 350); }
    function step(n) { idx = (idx + n + group.length) % group.length; render(); }
    items.forEach(function (it) {
      it.tabIndex = 0; it.setAttribute("role", "button");
      it.addEventListener("click", function () { open(it); });
      it.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(it); } });
    });
    $(".lb-x", lb).onclick = close; $(".lb-p", lb).onclick = function () { step(-1); }; $(".lb-n", lb).onclick = function () { step(1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    addEventListener("keydown", function (e) { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
    document.addEventListener("langchange", function () { if (!lb.hidden) render(); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(); tick(); setInterval(tick, 1000);
    $$("[data-lang-toggle]").forEach(function (b) { b.addEventListener("click", function () { setLang(lang === "en" ? "mr" : "en"); }); });
    $$('[data-action="calendar"]').forEach(function (b) { b.addEventListener("click", calendar); });
    $$('[data-action="copy"]').forEach(function (b) { b.addEventListener("click", copyAddr); });
    $$('[data-action="share"]').forEach(function (b) { b.addEventListener("click", shareInv); });
    $$('[data-action="rsvp"]').forEach(function (b) { b.addEventListener("click", rsvp); });
    $$("[data-hovervideo]").forEach(hoverVideo);
    reveal(); gate(); lightbox();
  });

  window.Core = { t: t, toast: toast, rain: rain, burst: burst, trail: trail, reduce: reduce, $: $, $$: $$, setLang: setLang, lang: function () { return lang; } };
})();
