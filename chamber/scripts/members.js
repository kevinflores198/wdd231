export const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

export async function getMembers() {
    const response = await fetch("data/members.json");

    if (!response.ok) {
        throw new Error(`The members file could not be loaded (status ${response.status}).`);
    }

    const data = await response.json();
    return data.members;
}
