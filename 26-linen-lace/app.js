Object.assign(CONTENT.en, { u_line: "You are warmly invited to celebrate with us", u_morning: "MORNING", u_midday: "MIDDAY", u_evening: "EVENING" });
Object.assign(CONTENT.mr, { u_line: "आपणास आमच्या आनंदात सहभागी होण्याचे सप्रेम निमंत्रण", u_morning: "सकाळ", u_midday: "दुपार", u_evening: "संध्याकाळ" });

(function () {
  var cols = ["#a8706a", "#d4b6a4", "#8a7f72", "#fff"];
  Core.rain({ chars: ["✿", "·", "❀"], colors: cols, count: 8, speed: 20, min: 10, max: 16 });
  Core.burst({ chars: ["✿", "❀", "♡", "✦"], colors: cols });
})();
