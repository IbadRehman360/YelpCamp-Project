const mapElement = document.getElementById('map');
const latitude = mapElement.getAttribute('data-latitude');
const longitude = mapElement.getAttribute('data-longitude');
const campgroundCoordinates = [latitude, longitude];

const map = L.map('map', {
    attributionControl: false,
    zoomControl: false,
    closePopupOnClick: false,
    doubleClickZoom: false,
    minZoom: 4,
    maxZoom: 18,
    zoom: 10,
    attribution: 'Map data &copy; <a href="https://www.example.com/">Example</a>',
    subdomains: ['a', 'b', 'c']
}).setView(campgroundCoordinates, 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker(campgroundCoordinates).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

const customIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

marker.setIcon(customIcon);
marker.setOpacity(0.8);
marker.setZIndexOffset(100);
