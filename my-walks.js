// Simulating some saved walks (this data could come from a backend or localStorage)
const savedWalks = [
    {
        id: 1,
        name: "Morning Beach Walk",
        date: "2024-08-15",
        distance: "5km",
        route: [[51.505, -0.09], [51.51, -0.1], [51.52, -0.12]]
    },
    {
        id: 2,
        name: "City Park Loop",
        date: "2024-08-20",
        distance: "3.2km",
        route: [[51.515, -0.09], [51.517, -0.1], [51.52, -0.08]]
    }
];

// Initialize map
let map = null;
let polyline = null;

function initializeMap() {
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
}

// Function to display walks in the list
function displayWalks() {
    const walksList = document.getElementById("walks-list");
    savedWalks.forEach(walk => {
        const walkItem = document.createElement("li");
        walkItem.innerText = `${walk.name} - ${walk.date} (${walk.distance})`;
        walkItem.addEventListener("click", () => showWalkOnMap(walk));
        walksList.appendChild(walkItem);
    });
}

// Function to display the selected walk's route on the map
function showWalkOnMap(walk) {
    if (!map) {
        initializeMap();
    }
    if (polyline) {
        map.removeLayer(polyline);
    }
    map.setView(walk.route[0], 13);  // Center the map on the first point of the route
    polyline = L.polyline(walk.route, { color: '#ff66b2' }).addTo(map);
    document.getElementById("map").style.display = "block";
}

// Call the displayWalks function on page load
window.onload = displayWalks;
