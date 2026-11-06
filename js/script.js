// NAVIGATION SIDEBAR
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector(".sidebar-menu-button");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
    openDropdown.classList.remove("open");
  });
};

const setMobileMenu = (isOpen) => {
  sidebar.classList.toggle("mobile-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.querySelector("span").textContent = isOpen ? "close" : "menu";
};

menuButton.addEventListener("click", () => {
  if (!mobileBreakpoint.matches) return;
  closeAllDropdowns();
  setMobileMenu(!sidebar.classList.contains("mobile-open"));
});

sidebarToggler.addEventListener("click", () => {
  if (mobileBreakpoint.matches) return;
  closeAllDropdowns();
  sidebar.classList.toggle("collapsed");
  sidebarToggler.setAttribute("aria-expanded", String(!sidebar.classList.contains("collapsed")));
});

document.addEventListener("click", (event) => {
  if (mobileBreakpoint.matches && sidebar.classList.contains("mobile-open") && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
    setMobileMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileBreakpoint.matches && sidebar.classList.contains("mobile-open")) {
    setMobileMenu(false);
    menuButton.focus();
  }
});

mobileBreakpoint.addEventListener("change", () => setMobileMenu(false));

// COLLAPSE DI SCREEN KECIL
if (window.innerWidth <= 2000) sidebar.classList.add("collapsed");
sidebarToggler.setAttribute("aria-expanded", String(!sidebar.classList.contains("collapsed")));

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
      if (link.closest(".sidebar")) setMobileMenu(false);
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
