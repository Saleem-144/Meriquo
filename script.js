const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  const target = link.getAttribute("href");
  const isHome = target === "/" && (currentPage === "" || currentPage === "index.html");

  if (target === currentPage || isHome) {
    link.classList.add("active");
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
  const params = new URLSearchParams(window.location.search);

  if (params.get("submitted") === "true") {
    formNote.textContent = contactForm.classList.contains("candidate-form")
      ? "Thanks for reaching out. We'll be in touch if there's an opportunity that could be a good fit."
      : "Thanks. Tell us what you're hiring for and we'll take it from there.";
  }

  contactForm.addEventListener("submit", () => {
    if (contactForm.classList.contains("candidate-form")) {
      formNote.textContent =
        "Thanks for reaching out. We'll be in touch if there's an opportunity that could be a good fit.";
      return;
    }

    formNote.textContent = "Thanks. Tell us what you're hiring for and we'll take it from there.";
  });
}
