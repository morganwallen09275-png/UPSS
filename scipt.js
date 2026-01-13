let map;
let markers = [];

// DEMO shipment data (fake for now)
const shipments = {
  "MR123456789": [
    { date: "2026-01-10", location: "Lagos Warehouse", status: "Package received", coords: [6.5244, 3.3792] },
    { date: "2026-01-11", location: "Abuja Hub", status: "In transit", coords: [9.0579, 7.4951] },
    { date: "2026-01-13", location: "Kano Distribution", status: "Out for delivery", coords: [12.0022, 8.5919] }
  ],
  "MR987654321": [
    { date: "2026-01-09", location: "Lagos Warehouse", status: "Package received", coords: [6.5244, 3.3792] },
    { date: "2026-01-12", location: "Port Harcourt Hub", status: "In transit", coords: [4.8156, 7.0498] },
    { date: "2026-01-13", location: "Port Harcourt", status: "Delivered", coords: [4.8156, 7.0498] }
  ]
};

function trackPackage() {
  const number = document.getElementById("trackingNumber").value.toUpperCase();
  const resultDiv = document.getElementById("result");
  const mapDiv = document.getElementById("map");
  resultDiv.style.display = "block";
  mapDiv.style.display = "none";
  resultDiv.innerHTML = "";

  if(shipments[number]) {
    let html = `<h2>Tracking for ${number}</h2><ul>`;
    shipments[number].forEach(item => {
      html += `<li><strong>${item.date}</strong> - ${item.location}: ${item.status}</li>`;
    });
    html += "</ul>";
    resultDiv.innerHTML = html;

    // Show map
    mapDiv.style.display = "block";
    if(map){ map.remove(); markers = []; }
    map = L.map('map').setView(shipments[number][0].coords, 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

    shipments[number].forEach(item => {
      const marker = L.marker(item.coords).addTo(map)
        .bindPopup(`<strong>${item.location}</strong><br>${item.status}<br>${item.date}`);
      markers.push(marker);
    });

    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.5));
  } else {
    resultDiv.innerHTML = `<p class="not-found">Tracking number not found. Try MR123456789 or MR987654321</p>`;
  }
