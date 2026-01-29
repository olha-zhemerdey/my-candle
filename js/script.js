// Smooth scroll
document.querySelectorAll(".scroll-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});
const langBtns = document.querySelectorAll(".lang-btn");
const allText = document.querySelectorAll("[data-en][data-ua]");

const setLanguage = (lang) => {
  allText.forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  langBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("lang", lang);
};

// Встановити мову при завантаженні
const savedLang = localStorage.getItem("lang") || "ua";
setLanguage(savedLang);

// Кнопки переключення
langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

// Scroll buttons (як у тебе було)
const scrollBtns = document.querySelectorAll(".scroll-btn");

scrollBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll buttons (карусель)
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");

  if (!track || !prev || !next) return;

  const cardWidth =
    track.querySelector(".candle-card").getBoundingClientRect().width + 24;

  next.addEventListener("click", () => {
    track.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-hover");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const overlay = entry.target.querySelector(".card-overlay");
          overlay.classList.add("animate-visible"); // додаємо клас для анімації
          observer.unobserve(entry.target); // один раз
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => observer.observe(card));
});
