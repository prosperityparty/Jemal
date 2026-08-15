const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const active = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", active);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const text = `Salaan Prosperity Party Kersadula District,%0A%0AMagac: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AFariin:%0A${encodeURIComponent(message)}`;
  window.open(`https://wa.me/251912957760?text=${text}`, "_blank");
});
