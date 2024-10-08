// Make a bar chart - top N locations
function make_main_places_bar_chart() {
    // Set the number of rows to limit the data
    var row_limit = 20;
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");

    // Make a request to the bar chart data route
    let url = `/api/v1.0/main_places/${animal_filter}/${gender_filter}/${row_limit}`;

    let bar_chart = d3.select("#main_places_container");
    bar_chart.html(""); // Clear the chart

    // Make a request to the bar chart data route
    d3.json(url).then(function(data) {

        // Create the bar chart
        let trace1 = {
            x: data.map(row => row.location.substring(0, 20)+"..."),
            y: data.map(row => row.attacks),
            type: "bar",
            marker: {
            color: "#17BECF"
            },
            hovertext: data.map(row => row.location)
        };

        let layout = {
            title: `Top ${row_limit} Locations`,
            xaxis: { title: "Location" },
            yaxis: { title: "Number of Attacks" },
            margin: { t: 40, l: 50, r: 30, b: 125 }
        };

        Plotly.newPlot("main_places_container", [trace1], layout);
    });
}

// GOAL 1
// Can I render a basic base map? - Set up Leaflet correctly
// Can we fetch the data that we need to plot?
function createMap(data) {
    // STEP 1: Init the Base Layers
  
    // Define variables for our tile layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Step 2: Create the Overlay layers
    let markers = L.markerClusterGroup();
    let heatArray = [];

    console.log(data);
  
    for (let i = 0; i < data.length; i++){
      let row = data[i];
      let latitude = row.latitude;
      let longitude = row.longitude;
  
      // extract coord
      let point = [latitude, longitude];
  
      // make marker
      let marker = L.marker(point);
      let popup = `<h3>${row.location}</h3><hr><h4>Attach: ${row.animal_type}</h4><hr><h4>Gender: ${row.sex} <br/> Number of attacks: ${row.attacks}</h4>`;

      marker.bindPopup(popup);
      markers.addLayer(marker);
  
      // add to heatmap
      heatArray.push(point);
    }
  
    // create layer
    let heatLayer = L.heatLayer(heatArray, {
      radius: 50,
      max: 0.06,
      blur: 10
    });
  
    // Step 3: BUILD the Layer Controls
  
    // Only one base layer can be shown at a time.
    let baseLayers = {
      Street: street,
      Topography: topo
    };
  
    let overlayLayers = {
      Markers: markers,
      Heatmap: heatLayer
    }
  
    // Step 4: INIT the Map
  
    // Destroy the old map
    d3.select("#map_container").html("");
  
    // rebuild the map
    d3.select("#map_container").html("<div id='map'></div>");
  
    let myMap = L.map("map", {
      center: [40.7128, -74.0059],
      zoom: 5,
      layers: [street, markers]
    });
  
  
    // Step 5: Add the Layer Control filter + legends as needed
    L.control.layers(baseLayers, overlayLayers).addTo(myMap);
  
  }
  
  function init() {
    // Make the Main Places Bar Chart
    make_main_places_bar_chart();

    // Get filter requests from the form
    let animal_filter = d3.select("#animal_filter").property("value");
    let gender_filter = d3.select("#gender_filter").property("value");

    // Make a request to the bar chart data route
    let url = `/api/v1.0/map_places/${animal_filter}/${gender_filter}`;
    console.log(url);
  
    // make TWO requests
    d3.json(url).then(function (data) {
      createMap(data);
    });
  }
  
  function updateChart() {
    make_main_places_bar_chart();
}

  // event listener for CLICK on Button
  d3.select("#filter").on("click", init);
  
  init();
  