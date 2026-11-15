/* main.js - menu burger, barre de progression, carrousel, compteurs au scroll */
document.documentElement.classList.add("js");

/* 1) Barre de progression de lecture */
try {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }, { passive: true });
} catch (err) { console.error("Progress :", err); }

/* 2) Menu burger (mobile) */
try {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }
} catch (err) { console.error("Menu :", err); }

/* 3) Apparition au scroll */
try {
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => obs.observe(el));
  } else {
    items.forEach((el) => el.classList.add("visible"));
  }
} catch (err) {
  console.error("Reveal :", err);
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

/* 4) Compteurs animés déclenchés au scroll (<strong data-count="120">) */
try {
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.round(target / 50));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = current.toLocaleString("fr-FR");
      if (current >= target) clearInterval(timer);
    }, 25);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          animateCounter(en.target);
          countObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => countObs.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
} catch (err) { console.error("Compteurs :", err); }

/* 5) Carrousel */
try {
  const carousel = document.getElementById("carousel");
  if (carousel) {
    const slides = carousel.querySelectorAll(".slide");
    const dotsBox = carousel.querySelector(".dots");
    let index = 0, timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", "Diapositive " + (i + 1));
      dot.addEventListener("click", () => { show(i); restart(); });
      dotsBox.appendChild(dot);
    });
    const dots = dotsBox.querySelectorAll(".dot");

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("active", n === index));
      dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
    }
    function start() { timer = setInterval(() => show(index + 1), 5000); }
    function restart() { clearInterval(timer); start(); }

    carousel.querySelector(".c-prev").addEventListener("click", () => { show(index - 1); restart(); });
    carousel.querySelector(".c-next").addEventListener("click", () => { show(index + 1); restart(); });
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", start);
    show(0); start();
  }
} catch (err) { console.error("Carrousel :", err); }