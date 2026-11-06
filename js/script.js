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

// ACTIVE LINK HANDLER
const setActiveLink = (targetId) => {
  if (!targetId || targetId === "#") return;
  document.querySelectorAll(".sidebar-nav .nav-link").forEach((link) => {
    const isTarget = link.getAttribute("href") === targetId;
    link.classList.toggle("active", isTarget);
    link.closest(".nav-item")?.classList.toggle("active", isTarget);
  });
};

// NAVIGASI SECTION
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();
    setActiveLink(targetId);

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

// SCROLL SPY AKTIFKAN TOMBOL SAAT SCROLL
const sections = document.querySelectorAll("section[id]");
const updateActiveOnScroll = () => {
  if (!sections.length) return;

  if (window.innerWidth <= 768) {
    const scrollPosition = window.scrollY + 200;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = `#${section.getAttribute("id")}`;
      if (scrollPosition >= top && scrollPosition < top + height) {
        setActiveLink(id);
      }
    });
  } else {
    const scrollLeft = window.scrollX + 300;
    sections.forEach((section) => {
      const left = section.offsetLeft;
      const width = section.offsetWidth;
      const id = `#${section.getAttribute("id")}`;
      if (scrollLeft >= left && scrollLeft < left + width) {
        setActiveLink(id);
      }
    });
  }
};

window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
setActiveLink("#hero");

// SCROLL SAMPING DESKTOP
document.addEventListener('wheel', (event) => {
  if (window.innerWidth > 768 && event.deltaY !== 0) {
    event.preventDefault(); // Prevent default vertical scrolling
    window.scrollBy({
      left: event.deltaY, // Scroll horizontally based on vertical scroll input
      behavior: 'smooth', // Optional: Smooth scrolling effect
    });
  }
});
