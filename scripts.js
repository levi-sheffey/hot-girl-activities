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
