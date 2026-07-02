// Global map
let map = L.map("map").setView([39, -98], 4);

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

let routeLayers = [];

async function run() {

    const team = document.getElementById("team").value.toLowerCase();
    const pos = document.getElementById("group").value;

    const filename = `${team}_${pos}.json`;

    const response = await fetch(filename);
    const data = await response.json();

    // Remove previous markers and routes
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    let bounds = [];

    // Draw every route
    for (let i = 0; i < data.route_detail.length; i++) {

        const route = data.route_detail[i];

        // OSRM stores [lon, lat]
        const coords = route.coordinates.map(c => [c[1], c[0]]);

        const poly = L.polyline(coords, {
            color: "red",
            weight: 5
        }).addTo(map);

        bounds.push(...coords);

        // First coordinate becomes marker
        const first = coords[0];

        const match = data.itinerary[i];

        L.marker(first)
            .addTo(map)
            .bindPopup(`
                <b>${match.team_a} vs ${match.team_b}</b><br>
                ${match.city}<br>
                ${match.stage}<br>
                ${match.kickoff_utc}
            `);
    }

    map.fitBounds(bounds);

    document.getElementById("stats").innerHTML =
        `<b>Total Distance:</b> ${data.distance.toFixed(2)} km<br>
         <b>Total Duration:</b> ${data.duration.toFixed(2)} hours`;
}
