/* Saptapadi — the seven vows (English + Marathi) and diyas that light as you walk the path */
(function () {
  Object.assign(CONTENT.en, {
    sp_walk: "WALK THE SEVEN STEPS WITH US", sp_tag: "Seven steps. Seven vows. One lifetime.", sp_h: "Saptapadi: the seven steps",
    sp_p: "At the heart of a Hindu wedding, the couple walk seven steps around the sacred fire, and with each step make a promise to one another.",
    sp_lit: "diyas lit", sp_end: "And so, hand in hand, we begin.",
    s1_t: "Nourishment", s1_p: "We will nourish each other, and make sure our home is never short of food or kindness.",
    s2_t: "Strength", s2_p: "We will grow strong together, in body, mind and spirit, and stand by each other in every storm.",
    s3_t: "Prosperity", s3_p: "We will work together honestly to build a life of comfort, and share what we have with others.",
    s4_t: "Happiness", s4_p: "We will cherish our moments of joy and keep laughter at the centre of our home.",
    s5_t: "Family", s5_p: "We will love and respect both our families, and build a home that welcomes everyone.",
    s6_t: "Health and seasons", s6_p: "We will care for each other through every season of life, in health and in difficulty.",
    s7_t: "Friendship", s7_p: "We will be lifelong friends, loyal and true, walking side by side for all our days."
  });
  Object.assign(CONTENT.mr, {
    sp_walk: "आमच्यासोबत सप्तपदी चाला", sp_tag: "सात पावले. सात वचने. एक जन्मभराची साथ.", sp_h: "सप्तपदी: सात पावले",
    sp_p: "हिंदू विवाहाच्या केंद्रस्थानी वधू-वर पवित्र अग्नीभोवती सात पावले चालतात आणि प्रत्येक पावलासोबत एकमेकांना एक वचन देतात.",
    sp_lit: "दिवे प्रज्वलित", sp_end: "आणि म्हणून, हातात हात घालून, आम्ही सुरुवात करतो.",
    s1_t: "अन्न", s1_p: "आम्ही एकमेकांचे पालनपोषण करू आणि आमच्या घरात कधीही अन्नाची किंवा प्रेमाची कमतरता भासू देणार नाही.",
    s2_t: "बल", s2_p: "आम्ही शरीर, मन आणि आत्म्याने एकत्र सशक्त होऊ आणि प्रत्येक संकटात एकमेकांच्या पाठीशी उभे राहू.",
    s3_t: "समृद्धी", s3_p: "आम्ही प्रामाणिकपणे एकत्र कष्ट करून सुखी आयुष्य घडवू आणि जे आहे ते इतरांसोबत वाटून घेऊ.",
    s4_t: "सुख", s4_p: "आम्ही आनंदाचे क्षण जपू आणि आमच्या घरात हास्य कायम ठेवू.",
    s5_t: "कुटुंब", s5_p: "आम्ही दोन्ही कुटुंबांवर प्रेम आणि आदर करू आणि सर्वांचे स्वागत करणारे घर उभे करू.",
    s6_t: "आरोग्य आणि ऋतू", s6_p: "आम्ही जीवनाच्या प्रत्येक ऋतूत, आरोग्यात आणि अडचणीतही एकमेकांची काळजी घेऊ.",
    s7_t: "मैत्री", s7_p: "आम्ही आयुष्यभराचे सखे होऊ, निष्ठावान आणि खरे, आयुष्यभर एकमेकांसोबत चालत राहू."
  });

  var steps = Core.$$(".step"), tf = Core.$("#tf"), path = Core.$(".path"), litN = Core.$("#litN");
  function sync() {
    var r = path.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    tf.style.height = p * r.height + "px"; var n = 0;
    steps.forEach(function (s) { var b = s.getBoundingClientRect(), on = b.top + 50 < innerHeight * .65; s.classList.toggle("lit", on); if (on) n++; });
    litN.textContent = n;
  }
  addEventListener("scroll", sync, { passive: true }); addEventListener("resize", sync); sync();
  steps.forEach(function (s) { s.addEventListener("click", function () { s.classList.toggle("lit"); }); });

  var cols = ["#ffb703", "#ff9f1c", "#f4c95d", "#e8467f", "#fff3d6"];
  Core.rain({ chars: ["✦", "●", "✿"], colors: cols, count: 14, speed: 14, rise: true, min: 8, max: 16 });
  Core.burst({ chars: ["✿", "🪔", "✦", "❁", "ॐ"], colors: cols });
})();
