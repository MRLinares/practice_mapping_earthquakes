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

//  Create earthquake layer

let earthquakes = new L.LayerGroup();

// Define an object that contains the overlays.
// This overlay will be visible all the time

let overlays = {
    Earthquake: earthquakes
};

// Create the map object with center, zoom level and default layer


let map = L.map('mapid', {
    center:[39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});

// Pass map layers inot layers control box and add the layers control to the map

L.control.layers(baseMaps, overlays).addTo(map);

// Then we add our tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL

let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
 

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
};

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }

    return magnitude * 4;
};

// This function determines the color of the circle based on the magnitude of the earthquake.

function getColor(magnitude) {

    if(magnitude > 5) {
        return "#ea2c2c";
    }

    if(magnitude > 4) {
        return "#ea822c";
    }

    if(magnitude > 3) {
        return "#ee9c00";
    }

    if(magnitude > 2) {
        return "#eecc00";
    }

    if(magnitude > 1) {
        return "#d4ee00";
    }

    return "#98ee00";
};


// Grabbing our GeoJSOn data

d3.json(earthquakeData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // Set the style for each circleMarker using styleInfo function
    style: styleInfo,

    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3");
    }
    
    }).addTo(earthquakes);

    // Then add earthquakes layer to map
      earthquakes.addTo(map);
});

