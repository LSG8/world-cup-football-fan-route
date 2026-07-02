// Global map
let map = L.map("map").setView([39, -98], 4);
L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

//Draw start marker
    var startIcon = new L.Icon({iconUrl: "ball.jpg",
                                iconSize:[38, 40]})
    start_lat = 41.98200805
    start_lon = -87.90535059
    L.marker([start_lat, start_lon], {icon: startIcon}).addTo(map);

let routeLayers = [];
async function run() {
    const team = document.getElementById("team").value.toLowerCase();
    const pos = document.getElementById("group").value;
    const filename = `${team}_${pos}.json`;
    const response = await fetch(filename);
    const data = await response.json();
    // Remove old markers and routes
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });
    //Draw start marker
    var startIcon = new L.Icon({iconUrl: "ball.jpg",
                                iconSize:[38, 40]})
    start_lat = 41.98200805
    start_lon = -87.90535059
    L.marker([start_lat, start_lon], {icon: startIcon}).addTo(map);
    let bounds = [];
    // Draw routes
    for (let i = 0; i < data.route_detail.length; i++) {
        setTimeout(() => {
        const route = data.route_detail[i];
        const coords = route.coordinates.map(c => [c[1], c[0]]);
        L.polyline(coords, {
            color: "red",
            weight: 4,
            opacity: 0.8
        }).addTo(map);
        bounds.push(...coords);},10*i);
    }
    
    // Draw match markers
    data.itinerary.forEach((match, index) => {
        console.log(match)
        const marker = L.marker([match.lat, match.lon]).addTo(map);
        console.log(marker)
        marker.bindPopup(`
            <b>Match ${index+1}</b><br>
            <b>${match.team_a} vs ${match.team_b}</b><br>
            <b>City:</b> ${match.city}<br>
            <b>Stage:</b> ${match.stage}<br>
            <b>Kickoff:</b> ${match.kickoff_utc}<br>
            <b>Travel from previous:</b> ${match.travel_distance.toFixed(1)} km<br>
            <b>Driving time:</b> ${match.travel_duration.toFixed(1)} h
        `);
        // bounds.push([match.lat, match.lon]);

    });

    // Zoom to route
    map.fitBounds(bounds);
    // Statistics
    document.getElementById("stats").innerHTML = `
        <h3>${team.charAt(0).toUpperCase() + team.slice(1)}</h3>
        <p><b>Total Distance:</b> ${data.distance.toFixed(1)} km</p>
        <p><b>Total Driving Time:</b> ${data.duration.toFixed(1)} h</p>
    `;
}
