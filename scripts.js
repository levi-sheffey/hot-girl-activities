// Element references
const soloWalkBtn = document.getElementById('solo-walk');
const groupWalkBtn = document.getElementById('group-walk');
const ghostWalkBtn = document.getElementById('ghost-walk');
const groupLinkContainer = document.getElementById('group-link-container');
const groupWalkLink = document.getElementById('group-walk-link');
const copyLinkBtn = document.getElementById('copy-link-btn');
const ghostWalkPrompt = document.getElementById('ghost-walk-prompt');
const previousWalksSelect = document.getElementById('previous-walks');
const startGhostWalkBtn = document.getElementById('start-ghost-walk-btn');

// Walk Data (You would replace this with actual data)
const savedWalks = [
    { id: 1, name: 'Morning Beach Walk', distance: '5km', route: [[51.505, -0.09], [51.51, -0.1]] },
    { id: 2, name: 'City Park Loop', distance: '3.2km', route: [[51.515, -0.09], [51.517, -0.1]] }
];

// Handle Solo Walk
soloWalkBtn.addEventListener('click', () => {
    alert('Starting a solo walk!');
    // Add the code for starting a solo walk here
});

// Handle Group Walk
groupWalkBtn.addEventListener('click', () => {
    groupLinkContainer.classList.remove('hidden');
    const walkLink = generateGroupWalkLink(); // Generate a unique link
    groupWalkLink.value = walkLink;
});

copyLinkBtn.addEventListener('click', () => {
    groupWalkLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

// Handle Ghost Walk
ghostWalkBtn.addEventListener('click', () => {
    ghostWalkPrompt.classList.remove('hidden');
    populatePreviousWalks();
});

startGhostWalkBtn.addEventListener('click', () => {
    const selectedWalkId = previousWalksSelect.value;
    alert(`Racing against walk ID: ${selectedWalkId}`);
    // Add code to start the ghost walk here
});

// Generate a unique link for Group Walk (just a placeholder function)
function generateGroupWalkLink() {
    const uniqueId = Math.random().toString(36).substring(2, 15);
    return `${window.location.href}?groupWalk=${uniqueId}`;
}

// Populate previous walks for Ghost Walk
function populatePreviousWalks() {
    previousWalksSelect.innerHTML = '';
    savedWalks.forEach(walk => {
        const option = document.createElement('option');
        option.value = walk.id;
        option.text = `${walk.name} (${walk.distance})`;
        previousWalksSelect.add(option);
    });
}
