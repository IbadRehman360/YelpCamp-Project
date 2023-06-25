var map = L.map('map', {
    attributionControl: false,
}).setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 40,
}).addTo(map);

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false,
    attributionControl: false,
    spiderfyShapePositions: function (count, centerPt) {
        var distanceFromCenter = 35,
            markerDistance = 45,
            lineLength = markerDistance * (count - 1),
            lineStart = centerPt.y - lineLength / 2,
            res = [],
            i;
        res.length = count;
        for (i = count - 1; i >= 0; i--) {
            res[i] = new L.Point(centerPt.x + distanceFromCenter, lineStart + markerDistance * i);
        }
        return res;
    }
});
// campgroundsData.forEach(campground => {
//     const marker = L.marker(campground.geometry.coordinates[1], campground.geometry.coordinates[0]).addTo(markers);
//     marker.bindPopup('<h3>' + campground.title + '</h3><p>' + campground.description + '</p>');
// });
var customIcon = L.icon({
    iconUrl: 'path/to/custom-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var marker1 = L.marker([51.5, -0.09]).addTo(markers);
var marker2 = L.marker([51.51, -0.1]).addTo(markers);
var marker3 = L.marker([51.49, -0.08]).addTo(markers);


map.addLayer(markers);

