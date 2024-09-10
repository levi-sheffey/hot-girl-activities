// Initialize map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Variables for tracking state
let route = [];
let polyline = null;
let tracking = false;

// Elements
const startWalkBtn = document.getElementById('start-walk-btn');
const finishWalkBtn = document.getElementById('finish-walk-btn');

// Function to start tracking
function startTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            if (tracking) {
                const latLng = [position.coords.latitude, position.coords.longitude];
                route.push(latLng);
                if (polyline) {
                    polyline.setLatLngs(route);
                } else {
                    polyline = L.polyline(route, { color: '#ff66b2' }).addTo(map);
                }
                map.setView(latLng, 15);
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle walk types
function selectWalkType() {
    const walkType = prompt("Choose your walk type: 'solo walk', 'group walk', or 'ghost walk'");
    switch (walkType.toLowerCase()) {
        case 'solo walk':
            alert('Starting a solo walk!');
            break;
        case 'group walk':
            alert('Invite friends to your walk!');
            // Group walk functionality can be integrated here
            break;
        case 'ghost walk':
            alert('Ghost walk activated! Compete with past routes.');
            // Ghost walk comparison can be added here
            break;
        default:
            alert('Invalid walk type!');
    }
}

// Start walk button event
startWalkBtn.addEventListener('click', () => {
    selectWalkType();
    tracking = true;
    startWalkBtn.style.display = 'none';
    finishWalkBtn.style.display = 'block';
    startTracking();
});

// Finish walk button event
finishWalkBtn.addEventListener('click', () => {
    tracking = false;
    finishWalkBtn.style.display = 'none';
    startWalkBtn.style.display = 'block';
    console.log('Route saved:', route); // Save this data to a backend in production
    alert('Walk finished and route saved to your profile!');
    route = [];
    if (polyline) {
        map.removeLayer(polyline);
        polyline = null;
    }
});

// Handle My Walks navigation
document.getElementById('my-walks').addEventListener('click', () => {
    alert('Viewing saved walks!');
    // Show saved walks in the user's profile
});

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
