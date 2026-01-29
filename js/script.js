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

  let observerStarted = false;

  window.addEventListener(
    "scroll",
    () => {
      if (observerStarted) return;
      observerStarted = true;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const overlay = entry.target.querySelector(".card-overlay");
              overlay.classList.add("animate-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.4,
        }
      );

      cards.forEach((card) => observer.observe(card));
    },
    { once: true }
  );
});
const cards = document.querySelectorAll(".candle-card");
const scentCards = document.querySelectorAll(".scents .candle-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

scentCards.forEach((card) => observer.observe(card));

// 3D рух при наведенні тільки на десктопі
if (window.innerWidth > 768) {
  scentCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // координата миші всередині картки
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // градуси обертання
      const rotateX = ((y - centerY) / centerY) * 10; // вперед-назад
      const rotateY = ((x - centerX) / centerX) * 10; // вліво-вправо

      // трохи переміщуємо картку по осі для ефекту “живої рухомості”
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
