// KECILIN NAVBAR
const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
    openDropdown.classList.remove("open");
  });
};

document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    closeAllDropdowns(); // Close all open dropdowns
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("collapsed"); // Toggle collapsed class on sidebar
    button.setAttribute("aria-expanded", String(!sidebar.classList.contains("collapsed")));
  });
});

// COLLAPSE DI SCREEN KECIL
if (window.innerWidth <= 2000) document.querySelector(".sidebar").classList.add("collapsed");

// NAVIGASI SECTION
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();

    if (window.innerWidth <= 768) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    const sidebarWidth = document.querySelector(".sidebar")?.offsetWidth || 0;
    const targetLeft = targetId === "#hero" ? 0 : targetSection.offsetLeft - sidebarWidth;

    window.scrollTo({
      top: 0,
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  });
});

// SCROLL SAMPING
document.addEventListener('wheel', (event) => {
  if (window.innerWidth > 768 && event.deltaY !== 0) {
    event.preventDefault(); // Prevent default vertical scrolling
    window.scrollBy({
      left: event.deltaY, // Scroll horizontally based on vertical scroll input
      behavior: 'smooth', // Optional: Smooth scrolling effect
    });
  }
});
