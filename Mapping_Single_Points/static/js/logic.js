// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// // Alternate without ".setview()" Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

//  let circle = L.circle([34.0522, -118.2437], {
//     radius: 100000,
//     color: "black",
//     fillColor: "light-yellow"
//  }).addTo(map);

 let circle = L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: "#ffffa1"
 }).addTo(map);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "dark-v10",
//   accessToken: API_KEY
// });

// var baseMaps = {
//     "Street Map": streets,
//     "Dark Map": darkmap
//   };
  
  
//   // Define a map object
//   var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5,
//     layers: streets
//   });  

  // Pass our map layers into our layer control
  // Add the layer control to the map
//   L.control.layers(baseMaps, {
//     collapsed: false
//   }).addTo(map);
  

