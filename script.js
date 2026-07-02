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

    // -------------------------------
    // Team selection
    // -------------------------------
    const team = document.getElementById("team").value.toLowerCase();
    const pos = document.getElementById("group").value;

    // argentina_1st.json
    const filename = `${team}_${pos}.json`;

    // -------------------------------
    // Read json
    // -------------------------------
    const response = await fetch(filename);

    const data = await response.json();

    // -------------------------------
    // Remove previous route
    // -------------------------------
    routeLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];

    let bounds = [];

    // -------------------------------
    // Draw every leg
    // -------------------------------
    data.routes.forEach(route => {

        // OSRM geometry
        const coords = route.geometry.coordinates.map(c => [
            c[1],
            c[0]
        ]);

        const poly = L.polyline(coords, {
            color: "red",
            weight: 5
        }).addTo(map);

        routeLayers.push(poly);

        bounds.push(...coords);

    });

    // -------------------------------
    // Stadium markers
    // -------------------------------
    data.matches.forEach(match => {

        const marker = L.marker([
            match.latitude,
            match.longitude
        ]).addTo(map);

        marker.bindPopup(
            `<b>${match.team_a} vs ${match.team_b}</b><br>
             ${match.stadium}<br>
             ${match.city}`
        );

        routeLayers.push(marker);

    });

    // -------------------------------
    // Fit map
    // -------------------------------
    map.fitBounds(bounds);

    // -------------------------------
    // Statistics
    // -------------------------------
    document.getElementById("stats").innerHTML = `

        <h3>${data.team}</h3>

        <p>
        Distance:
        ${(data.total_distance/1000).toFixed(1)} km
        </p>

        <p>
        Driving:
        ${(data.total_duration/3600).toFixed(1)} h
        </p>

        <p>
        Bonus matches:
        ${data.bonus_matches}
        </p>

    `;

}