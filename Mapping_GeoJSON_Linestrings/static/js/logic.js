// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.

let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with center, zoom level and default layer


let map = L.map('mapid', {
    center:[44, -80],
    zoom: 2,
    layers: [dark]
});

// Pass map layers inot layers control box and add the layers control to the map

L.control.layers(baseMaps).addTo(map);

// Then we add our tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL

let torontoData = "https://raw.githubusercontent.com/MRLinares/mapping_earthquakes/main/torontoRoutes.json"
 
// Create a style for the lines

let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// Grabbing our GeoJSOn data

d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>Flight " + feature.properties.airline_id + "</h2 <br> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});
