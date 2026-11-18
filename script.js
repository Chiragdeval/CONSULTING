// ==========================================
// Meridian Consulting – JavaScript
// ==========================================

// ---------- Mobile menu ----------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after clicking a link (mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Highlight current section in the menu ----------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a:not(.btn)");

function highlightNav() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", highlightNav);
highlightNav();

// ---------- Number counters in the hero ----------
const counters = document.querySelectorAll("[data-count]");

function runCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "+";
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + (progress === 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((c) => counterObserver.observe(c));

// ---------- Contact form validation ----------
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function setError(id, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");
  input.parentElement.classList.toggle("invalid", Boolean(message));
  error.textContent = message;
  return !message;
}

function validateForm() {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const okName = setError("name", name.length < 2 ? "Please enter your full name." : "");
  const okEmail = setError("email", !emailPattern.test(email) ? "Please enter a valid email address." : "");
  const okService = setError("service", !service ? "Please choose a service." : "");
  const okMessage = setError("message", message.length < 10 ? "Message should be at least 10 characters." : "");

  return okName && okEmail && okService && okMessage;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMsg.textContent = "";

  if (validateForm()) {
    // Demo only: in a real site, send the data to a server here.
    successMsg.textContent = "Thank you! Your message has been received. We will contact you shortly.";
    form.reset();
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
