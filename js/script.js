// KECILIN NAVBAR
const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
    toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
  });
};

document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
  button.addEventListener("click", () => {
    closeAllDropdowns(); // Close all open dropdowns
    document.querySelector(".sidebar").classList.toggle("collapsed"); // Toggle collapsed class on sidebar
  });
});

// COLLAPSE DI SCREEN KECIL
if (window.innerWidth <= 2000) document.querySelector(".sidebar").classList.add("collapsed");

// SCROLL SAMPING
document.addEventListener('wheel', (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault(); // Prevent default vertical scrolling
    window.scrollBy({
      left: event.deltaY, // Scroll horizontally based on vertical scroll input
      behavior: 'smooth', // Optional: Smooth scrolling effect
    });
  }
});