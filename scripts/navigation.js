const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    burger.setAttribute("aria-expanded", isOpen);
    burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    burger.textContent = isOpen ? "✕" : "☰";
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
    }
});