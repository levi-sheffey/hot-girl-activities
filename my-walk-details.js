// Initialize the map with a smoother zoom effect
const map = L.map('map', { zoomControl: false }).setView([34.4208, -119.6982], 13); // Santa Barbara

// Load the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Example route with some advanced map options
const route = [
    [34.4208, -119.6982],
    [34.4212, -119.7003],
    [34.4223, -119.7021]
];

// Smooth route drawing with animation
const polyline = L.polyline(route, { color: '#ff3385', weight: 5, smoothFactor: 1 }).addTo(map);

// Fit the map view to the route with padding for better viewing
map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

// Add zoom control to the bottom right corner
L.control.zoom({ position: 'bottomright' }).addTo(map);
