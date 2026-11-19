import { getMembers, levelNames } from "./members.js";

const spotlightList = document.getElementById("spotlight-list");
const spotlightMessage = document.getElementById("spotlight-message");

function shuffle(list) {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function createSpotlightCard(member) {
    const phoneLink = member.phone.replace(/[^+\d]/g, "");
    const websiteText = member.website.replace("https://", "");

    return `
        <article class="member-card">
            <img class="member-image" src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
            <h3 class="member-name">${member.name}</h3>
            <p class="badge badge-${member.membership}">${levelNames[member.membership]}</p>
            <p class="member-address">${member.address}</p>
            <p class="member-phone"><a href="tel:${phoneLink}">${member.phone}</a></p>
            <p class="member-site"><a href="${member.website}" target="_blank" rel="noopener">${websiteText}</a></p>
        </article>
    `;
}

async function showSpotlights() {
    try {
        const members = await getMembers();
        const goldAndSilver = members.filter((member) => member.membership === 2 || member.membership === 3);
        const spotlights = shuffle(goldAndSilver).slice(0, 3);

        spotlightList.innerHTML = spotlights.map(createSpotlightCard).join("");
    } catch (error) {
        spotlightMessage.textContent = "Sorry, the member spotlights could not be loaded right now.";
        console.error(error);
    }
}

showSpotlights();
