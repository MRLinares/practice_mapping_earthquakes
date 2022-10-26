// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer


let map = L.map('mapid', {
    center:[30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass map layers inot layers control box and add the layers control to the map

L.control.layers(baseMaps).addTo(map);

// Then we add our tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL

let airportData = "https://raw.githubusercontent.com/MRLinares/mapping_earthquakes/main/majorAirports%20(1).json"
 
// Grabbing our GeoJSOn data

d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2 <br> <hr> <h3>Aiport name: " + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});


// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// // Grabbing our GeoJSON data using pointToLayer function

// L.geoJSON(sanFranAirport, {
//     // Turn each feature into a marker on the map.

//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2 <br> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);

// // Grabbing GeoJSON data with forEach

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2 <br> <hr> <h3>Aiport name: " + feature.properties.name + "</h3>");
//     }
// }).addTo(map);




