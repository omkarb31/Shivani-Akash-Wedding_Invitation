const weddingDate = new Date("2026-12-12T11:30:00+05:30");
const languageToggle = document.getElementById("languageToggle");
const languageLabel = document.getElementById("languageLabel");
const toast = document.getElementById("toast");
let currentLanguage = "en";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
  Object.entries(values).forEach(([unit, value]) => {
    document.getElementById(unit).textContent = unit === "days"
      ? String(value).padStart(3, "0")
      : String(value).padStart(2, "0");
  });
}

function setLanguage(language) {
  currentLanguage = language;
  document.body.classList.toggle("lang-mr", language === "mr");
  document.documentElement.lang = language === "mr" ? "mr" : "en";
  document.querySelectorAll("[data-en][data-mr]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageLabel.textContent = language === "en" ? "मराठी" : "English";
  languageToggle.setAttribute("aria-label", language === "en" ? "Switch to Marathi" : "Switch to English");
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "mr" : "en");
});

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.getElementById("calendarButton").addEventListener("click", () => {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shivani and Akash//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:shivani-akash-wedding-20261212@example.com",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20261212T060000Z",
    "DTEND:20261212T173000Z",
    "SUMMARY:Wedding of Shivani & Akash",
    "LOCATION:The Gulmohar Courtyard\\, Koregaon Park\\, Pune",
    "DESCRIPTION:Wedding ceremony at 11:30 AM followed by dinner and dancing.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const file = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "shivani-akash-wedding.ics";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  showToast(currentLanguage === "en" ? "Wedding added to your calendar download." : "लग्नाची तारीख कॅलेंडरसाठी डाउनलोड झाली.");
});

document.getElementById("copyAddressButton").addEventListener("click", async () => {
  const address = "The Gulmohar Courtyard, 12 Riverside Road, Koregaon Park, Pune, Maharashtra 411001";
  try {
    await navigator.clipboard.writeText(address);
    showToast(currentLanguage === "en" ? "Venue address copied!" : "स्थळाचा पत्ता कॉपी झाला!");
  } catch (error) {
    showToast(currentLanguage === "en" ? "Copy isn't available in this browser." : "या ब्राउझरमध्ये कॉपी सुविधा उपलब्ध नाही.");
  }
});

