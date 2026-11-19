Object.assign(CONTENT.en, { u_line: "You are warmly invited to celebrate with us", u_morning: "MORNING", u_midday: "MIDDAY", u_evening: "EVENING" });
Object.assign(CONTENT.mr, { u_line: "आपणास आमच्या आनंदात सहभागी होण्याचे सप्रेम निमंत्रण", u_morning: "सकाळ", u_midday: "दुपार", u_evening: "संध्याकाळ" });

(function () {
  var cols = ["#b9a2e6", "#7d62b8", "#cdbaf0", "#fff"];
  Core.rain({ chars: ["❀", "✿", "✦"], colors: cols, count: 10, speed: 18, min: 10, max: 18 });
  Core.burst({ chars: ["🦋", "❀", "✿", "💜", "✦"], colors: cols });
})();
