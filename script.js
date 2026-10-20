// 1. Mobile menu toggle 
var menuButton = document.querySelector(".menu-toggle");
var navLinks = document.querySelector(".nav-links");

if (menuButton) {
  menuButton.onclick = function() {
    navLinks.classList.toggle("open");
  };
}

// 2. Dark mode toggle
var themeButton = document.querySelector(".theme-toggle");
if (themeButton) {
  themeButton.onclick = function() {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      themeButton.textContent = "Light mode";
    } else {
      themeButton.textContent = "Dark mode";
    }
  };
}

// 3. Highlight current page 
var links = document.querySelectorAll(".nav-links a");
for (var i = 0; i < links.length; i++) {
  if (links[i].href === window.location.href) {
    links[i].style.fontWeight = "bold";
  }
}

// 4. Back-to-top button
var topButton = document.querySelector(".back-to-top");
if (topButton) {
  window.onscroll = function() {
    if (window.scrollY > 300) {
      topButton.classList.add("visible");
    } else {
      topButton.classList.remove("visible");
    }
  };

  topButton.onclick = function() {
    window.scrollTo(0, 0);
  };
}