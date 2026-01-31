document.addEventListener("DOMContentLoaded", () => {
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
      el.textContent = el.dataset[lang];
    });

    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang === "ua" ? "uk" : "en";
    localStorage.setItem("lang", lang);
  };

  // Set language on first load (default UA)
  const savedLang = localStorage.getItem("lang");
  setLanguage(savedLang || "ua");

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // ======================
  // Carousel scroll
  // ======================
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");

  if (track && prev && next) {
    const card = track.querySelector(".candle-card");
    if (card) {
      const cardWidth = card.getBoundingClientRect().width + 24;

      next.addEventListener("click", () => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      });

      prev.addEventListener("click", () => {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }
  }

  // ======================
  // Fade in cards on scroll
  // ======================
  const animatedCards = document.querySelectorAll(".card-hover, .candle-card");

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

  animatedCards.forEach((card) => observer.observe(card));

  // ======================
  // Workshops 3D hover (desktop only, NO flip)
  // ======================
  const workshopCards = document.querySelectorAll("#workshops .workshop-card");

  if (window.innerWidth > 768) {
    workshopCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `
          perspective(800px)
          rotateX(${-rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }
});

document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);

    const answer = btn.nextElementSibling;
    if (!expanded) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.paddingTop = "12px";
      answer.style.paddingBottom = "12px";
    } else {
      answer.style.maxHeight = "0";
      answer.style.paddingTop = "0";
      answer.style.paddingBottom = "0";
    }
  });
});
