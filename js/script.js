// ======================
// Smooth scroll for buttons
// ======================
document.querySelectorAll(".scroll-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ======================
// Smooth scroll for buttons
// ======================
document.querySelectorAll(".scroll-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ======================
// Language switcher
// ======================
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

// Set language on page load
const savedLang = localStorage.getItem("lang");

// Якщо мови в localStorage немає, за замовчуванням – українська
if (savedLang === "en") {
  setLanguage("en");
} else {
  setLanguage("ua");
}

// Buttons
langBtns.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// ======================
// Carousel scroll
// ======================
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

// ======================
// Fade in cards on scroll
// ======================
const cards = document.querySelectorAll(".card-hover, .candle-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

cards.forEach((card) => observer.observe(card));

// ======================
// Workshops 3D hover (desktop only, no flip)
// ======================
const workshopCards = document.querySelectorAll("#workshops .candle-card");

if (window.innerWidth > 768) {
  workshopCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      const translateX = ((x - centerX) / centerX) * 15;
      const translateY = ((y - centerY) / centerY) * 15;

      card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "translateX(0) translateY(0) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// ======================
// Mobile: tap to show description (no flip)
// ======================
workshopCards.forEach((card) => {
  card.addEventListener("click", () => {
    const overlay = card.querySelector(".card-overlay");
    if (overlay) overlay.classList.toggle("animate-visible");
  });
});
