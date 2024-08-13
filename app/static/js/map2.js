function make_main_places_bar_chart() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");
    // Make a request to the bar chart data route
    let url = `/api/v1.0/main_places/${animal_filter}/${gender_filter}`;
    let bar_chart = d3.select("#main_places_container");
    bar_chart.html(""); // Clear the chart
    // Fetch and create the bar chart
    d3.json(url).then(function(data) {
        let trace1 = {
            x: data.map(row => row.location),
            y: data.map(row => row.attacks),
            type: "bar",
            marker: {
                color: data.map((d, i) => `hsl(${i * 360 / data.length}, 70%, 50%)`)
            },
            text: data.map(row => `${row.attacks} attacks`),
            hoverinfo: 'text'
        };
        let layout = {
            title: "Top 20 Locations",
            xaxis: { title: "Location", automargin: true },
            yaxis: { title: "Number of Attacks", automargin: true },
            margin: { t: 40, l: 50, r: 30, b: 70 }
        };
        Plotly.newPlot("main_places_container", [trace1], layout);
    });
}
function createMap(data) {
    // Base layers for the map
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    // Marker and heatmap layers
    let markers = L.markerClusterGroup();
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let point = [row.latitude, row.longitude];
        let marker = L.marker(point);
        let popup = `<h1>${row.location}</h1><hr><h2>${row.animal_type}</h2><hr><h3>${row.sex} | ${row.attacks}</h3>`;
        marker.bindPopup(popup);
        markers.addLayer(marker);
        heatArray.push(point);
    }
    var heat = L.heatLayer(heatData, { 
        radius: 25, 
        blur: 10, 
        // Reduce blur to make the colors appear 
        sharpermaxZoom: 17, 
        gradient: { 
            0.0: 'blue', 
            0.4: 'cyan', 
            0.6: 'lime', 
            0.7: 'yellow', 
            0.8: 'orange', 
            1.0: 'red' 
        } 
    });
//     let heatLayer = L.heatLayer(heatArray, {
//         radius: 25,
//         blur: 10,
//         maxZoom: 17,
//         gradient: {
//             0.00: 'blue',
//             0.03: 'green',
//             0.06: 'yellow',
// //            0.15: 'orange',
//             1.0: 'red'
//         }
//     });
    // Layer controls
    let baseLayers = {
        "Street Map": street,
        "Topographic Map": topo
    };
    let overlayLayers = {
        "Marker Clusters": markers,
        "Heatmap": heatLayer
    };
    // Initialize the map
    d3.select("#map_container").html("<div id='map'></div>");
    let myMap = L.map("map", {
        center: [40.7128, -74.0059],
        zoom: 5,
        layers: [street, markers]
    });
    L.control.layers(baseLayers, overlayLayers).addTo(myMap);
    // Add a legend for the heatmap
    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend');
        let grades = [0.2, 0.4, 0.6, 0.8, 1.0];
        let colors = ['blue', 'lime', 'yellow', 'orange', 'red'];
        div.innerHTML += '<strong>Intensity</strong><br>';
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += `<i style="background:${colors[i]}"></i> ${grades[i] * 100}%<br>`;
        }
        return div;
    };
    legend.addTo(myMap);
}
function init() {
    make_main_places_bar_chart();
    let animal_filter = d3.select("#animal_filter").property("value");
    let gender_filter = d3.select("#gender_filter").property("value");
    let url = `/api/v1.0/map_places/${animal_filter}/${gender_filter}`;
    d3.json(url).then(function(data) {
        createMap(data);
    });
}
function updateChart() {
    make_main_places_bar_chart();
}
// Event listener for filter button click
d3.select("#filter").on("click", init);
init();