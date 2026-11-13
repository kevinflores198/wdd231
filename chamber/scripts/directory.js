const membersContainer = document.getElementById("members");
const membersMessage = document.getElementById("members-message");
const gridButton = document.getElementById("grid-button");
const listButton = document.getElementById("list-button");

const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
    const response = await fetch("data/members.json");

    if (!response.ok) {
        throw new Error(`The members file could not be loaded (status ${response.status}).`);
    }

    const data = await response.json();
    return data.members;
}

function createMemberCard(member) {
    const phoneLink = member.phone.replace(/[^+\d]/g, "");
    const websiteText = member.website.replace("https://", "");

    return `
        <article class="member-card">
            <img class="member-image" src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
            <h2 class="member-name">${member.name}</h2>
            <p class="badge badge-${member.membership}">${levelNames[member.membership]}</p>
            <p class="member-description">${member.description}</p>
            <p class="member-address">${member.address}</p>
            <p class="member-phone"><a href="tel:${phoneLink}">${member.phone}</a></p>
            <p class="member-site"><a href="${member.website}" target="_blank" rel="noopener">${websiteText}</a></p>
        </article>
    `;
}

function displayMembers(members) {
    membersContainer.innerHTML = members.map(createMemberCard).join("");
}

function setView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("grid", isGrid);
    membersContainer.classList.toggle("list", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

async function init() {
    try {
        const members = await getMembers();

        displayMembers(members);
        membersMessage.textContent = `Showing ${members.length} members.`;
    } catch (error) {
        membersMessage.textContent = "Sorry, the member directory could not be loaded. Please try again later.";
        console.error(error);
    }
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

init();
