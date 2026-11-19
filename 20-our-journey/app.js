/* Our Journey — milestone copy (replace with your real story), heart that travels down the timeline */
(function () {
  Object.assign(CONTENT.en, {
    j_chapter: "OUR STORY SO FAR", j_start: "BEGIN", j_hero_s: "A LOVE STORY IN FIVE CHAPTERS", j_scroll: "Scroll to follow our journey", j_next: "The next chapter begins on 12 · 12 · 2026",
    j1_y: "CHAPTER ONE", j1_t: "The first hello", j1_p: "A cup of chai, an easy conversation, and the feeling that time had quietly slowed down.",
    j2_y: "CHAPTER TWO", j2_t: "Adventures together", j2_p: "Road trips, monsoon walks and lazy Sundays. Every place became better with each other.",
    j3_y: "CHAPTER THREE", j3_t: "The question", j3_p: "One evening, one ring, one very nervous question. She said yes before he finished asking.",
    j4_y: "CHAPTER FOUR", j4_t: "Two families become one", j4_p: "Blessings, laughter and a lot of sweets. Our families met, and it already felt like home.",
    j5_y: "CHAPTER FIVE", j5_t: "Forever begins", j5_p: "12 December 2026, Pune. We would love for you to be part of the day our forever begins."
  });
  Object.assign(CONTENT.mr, {
    j_chapter: "आमची गोष्ट आतापर्यंत", j_start: "सुरू करा", j_hero_s: "पाच प्रकरणांतील एक प्रेमकथा", j_scroll: "आमचा प्रवास पाहण्यासाठी स्क्रोल करा", j_next: "पुढील प्रकरण सुरू होते १२ · १२ · २०२६ रोजी",
    j1_y: "पहिले प्रकरण", j1_t: "पहिली भेट", j1_p: "चहाचा एक कप, सहज गप्पा आणि वेळ हळूच थांबल्यासारखे वाटणे.",
    j2_y: "दुसरे प्रकरण", j2_t: "एकत्र भटकंती", j2_p: "लांबचे प्रवास, पावसातील फेरफटका आणि निवांत रविवार. प्रत्येक ठिकाण एकमेकांसोबत अधिक सुंदर झाले.",
    j3_y: "तिसरे प्रकरण", j3_t: "तो खास प्रश्न", j3_p: "एक संध्याकाळ, एक अंगठी आणि एक हळवा प्रश्न. त्याचा प्रश्न संपण्याआधीच तिने होकार दिला.",
    j4_y: "चौथे प्रकरण", j4_t: "दोन कुटुंबे एक झाली", j4_p: "आशीर्वाद, हास्य आणि भरपूर मिठाई. आमच्या कुटुंबांची भेट झाली आणि लगेच आपलेपणा वाटला.",
    j5_y: "पाचवे प्रकरण", j5_t: "आयुष्यभराची सुरुवात", j5_p: "१२ डिसेंबर २०२६, पुणे. आमच्या आयुष्याच्या नव्या सुरुवातीच्या दिवशी आपली उपस्थिती हवी आहे."
  });

  var rail = Core.$("#railFill"), j = Core.$("#journey"), prog = Core.$("#prog"), heart = Core.$("#heart");
  function sync() {
    var m = document.documentElement.scrollHeight - innerHeight; rail.style.width = (m > 0 ? scrollY / m * 100 : 0) + "%";
    var r = j.getBoundingClientRect(), spine = Core.$(".spine"), sh = spine.clientHeight;
    var p = Math.min(1, Math.max(0, (innerHeight * .55 - r.top - 40) / sh));
    prog.style.height = p * sh + "px"; heart.style.top = p * sh + "px";
  }
  addEventListener("scroll", sync, { passive: true }); addEventListener("resize", sync); sync();

  var cols = ["#ff8aa0", "#ffc46b", "#ffffff", "#e8517a"];
  Core.rain({ chars: ["❤", "✿", "✦"], colors: cols, count: 12, speed: 16, rise: true, min: 10, max: 20 });
  Core.burst({ chars: ["❤", "✿", "✦", "☀", "💞"], colors: cols });
})();
