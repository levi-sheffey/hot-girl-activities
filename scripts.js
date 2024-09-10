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

// Variables to track the walk state
let isWalking = false;
let startTime, walkInterval;
let totalDistance = 0;
let previousPosition = null;
let route = [];

// Element references
const soloWalkBtn = document.getElementById('solo-walk');
const endWalkBtn = document.getElementById('end-walk-btn');
const walkInfoSection = document.getElementById('walk-info');
const walkDistanceElement = document.getElementById('walk-distance');
const walkTimeElement = document.getElementById('walk-time');

// Map setup
let map, polyline;

// Initialize the map
function initializeMap() {
    map = L.map('map').setView([51.505, -0.09], 13); // Center map initially
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    polyline = L.polyline([], { color: '#ff66b2' }).addTo(map); // Initialize an empty polyline
}

// Function to start the solo walk
soloWalkBtn.addEventListener('click', () => {
    if (!map) initializeMap(); // Initialize the map if it hasn't been already
    walkInfoSection.classList.remove('hidden'); // Show map and walk details
    startWalk();
});

// Function to start tracking the walk
function startWalk() {
    isWalking = true;
    startTime = Date.now();
    totalDistance = 0;
    previousPosition = null;
    route = [];

    // Start updating the time
    walkInterval = setInterval(updateWalkTime, 1000);

    // Start tracking the location
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updateWalkLocation, showError, { enableHighAccuracy: true });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to update the walk time
function updateWalkTime() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    walkTimeElement.innerText = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Helper function to pad time values (e.g., "01", "09")
function pad(value) {
    return String(value).padStart(2, '0');
}

// Function to update the walk location and route
function updateWalkLocation(position) {
    const latLng = [position.coords.latitude, position.coords.longitude];
    route.push(latLng);
    polyline.setLatLngs(route); // Update the route on the map
    map.setView(latLng, 15); // Center the map on the current location

    if (previousPosition) {
        const distance = calculateDistance(previousPosition, latLng);
        totalDistance += distance;
        walkDistanceElement.innerText = totalDistance.toFixed(2); // Update the distance in km
    }

    previousPosition = latLng; // Save the current position as the previous one for the next iteration
}

// Function to calculate the distance between two coordinates (Haversine formula)
function calculateDistance(pos1, pos2) {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = pos1[0], lon1 = pos1[1];
    const lat2 = pos2[0], lon2 = pos2[1];
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Convert degrees to radians
function toRad(deg) {
    return deg * Math.PI / 180;
}

// Function to stop tracking the walk and finalize the route
endWalkBtn.addEventListener('click', () => {
    isWalking = false;
    clearInterval(walkInterval); // Stop the timer
    alert(`Walk ended! Total Distance: ${totalDistance.toFixed(2)} km, Total Time: ${walkTimeElement.innerText}`);
    // Final route is displayed on the map
});

// Error handling for geolocation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
