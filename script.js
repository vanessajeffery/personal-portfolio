/* ==========================================================================
   script.js - shared by every page
   Each feature checks that its elements exist first, so the same file
   can run safely on pages that don't have them.
   ========================================================================== */

/* ---------- 1. Mobile menu toggle ---------- */
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    // toggle() adds the "open" class if missing, removes it if present,
    // and returns true/false so we can keep aria-expanded in sync
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

/* ---------- 2. Dark mode toggle (remembered between pages) ---------- */
const themeButton = document.querySelector(".theme-toggle");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.removeAttribute("aria-pressed");
}

if (themeButton) {
  // Load the saved choice
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {
    // Ignore: the site still works, it just won't remember the choice
  }
  setTheme(savedTheme === "dark");

  themeButton.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      // Ignore storage errors
    }
  });
}

/* ---------- 3. Mark the current page in the navigation ---------- */
// Get the file name from the URL, e.g. "about" from ".../about.html".
// An empty name (the site root) means the home page.
const currentPage = (window.location.pathname.split("/").pop() || "index").replace(".html", "");

document.querySelectorAll(".nav-links a").forEach(function (link) {
  const linkPage = link.getAttribute("href").replace(".html", "");
  if (linkPage === currentPage) {
    link.setAttribute("aria-current", "page"); // CSS styles this attribute
  }
});

/* ---------- 4. Back-to-top button ---------- */
const topButton = document.querySelector(".back-to-top");

if (topButton) {
  // Show the button only after scrolling down 300px
  window.addEventListener("scroll", function () {
    topButton.classList.toggle("visible", window.scrollY > 300);
  });

  topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 5. Project category filter ---------- */
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selected = button.dataset.filter; // value of data-filter in the HTML

    // Mark only the clicked button as pressed
    filterButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });

    // Show cards in the chosen category, hide the rest
    projectCards.forEach(function (card) {
      const matches = selected === "all" || card.dataset.category === selected;
      card.hidden = !matches;
    });
  });
});

/* ---------- 6. Contact form validation (front-end only) ---------- */
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = contactForm.elements["visitor-name"].value.trim();
    const email = contactForm.elements["visitor-email"].value.trim();
    const message = contactForm.elements["visitor-message"].value.trim();

    // Pattern: some text, "@", some text, ".", some text, with no spaces
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill in all fields.";
    } else if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
    } else if (message.length < 10) {
      formMessage.textContent = "Your message should be at least 10 characters.";
    } else {
      formMessage.textContent = "Thanks, " + name + "! Your message looks good (demo form: nothing was sent).";
      contactForm.reset();
    }
  });
}
