const menuButton = document.getElementById("menu-button");
const siteNav = document.getElementById("site-nav");

menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Wayfinding: mark the link of the current page
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#site-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});
