// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.

let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map object with center, zoom level and default layer


let map = L.map('mapid', {
    center:[39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass map layers inot layers control box and add the layers control to the map

L.control.layers(baseMaps).addTo(map);

// Then we add our tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL

let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
 
// Create a style for the lines

// let myStyle = {
//     color: "blue",
//     fillColor: "#ffffa1",
//     weight: 1
// };

// Grabbing our GeoJSOn data

d3.json(earthquakeData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        // style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h3>" + feature.properties.title + "</h3");
        }
    }).addTo(map);
});