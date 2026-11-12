const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastmodified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
