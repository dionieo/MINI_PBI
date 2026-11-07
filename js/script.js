// NAVIGATION SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");

const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
    openDropdown.classList.remove("open");
  });
};

sidebarToggler.addEventListener("click", () => {
  if (window.innerWidth <= 768) return;
  closeAllDropdowns();
  sidebar.classList.toggle("collapsed");
  sidebarToggler.setAttribute("aria-expanded", String(!sidebar.classList.contains("collapsed")));
});

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
    const activationPoint = window.innerHeight * 0.4;
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationPoint) {
        activeSection = section;
      }
    });

    setActiveLink(`#${activeSection.getAttribute("id")}`);
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
