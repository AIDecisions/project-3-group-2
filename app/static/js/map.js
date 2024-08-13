// Make a bar chart - top 20 locations
function make_main_places_bar_chart() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");

    // Make a request to the bar chart data route
    let url = `/api/v1.0/main_places/${animal_filter}/${gender_filter}`;
    // console.log(url);

    let bar_chart = d3.select("#main_places_container");
    bar_chart.html(""); // Clear the chart

    // Make a request to the bar chart data route
    d3.json(url).then(function(data) {
        // console.log(data);

        // Create the bar chart
        let trace1 = {
            x: data.map(row => row.location),
            y: data.map(row => row.attacks),
            type: "bar",
            marker: {
                color: "#17BECF"
            }
        };

        let layout = {
            title: "Top 20 Locations",
            xaxis: { title: "Location" },
            yaxis: { title: "Number of Attacks" }
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
    //   console.log(point);
  
      // make marker
      let marker = L.marker(point);
      let popup = `<h1>${row.location}</h1><hr><h2>${row.animal_type}</h2><hr><h3>${row.sex} | ${row.attacks}</h3>`;
    //   console.log(popup);

      marker.bindPopup(popup);
      markers.addLayer(marker);
  
      // add to heatmap
      heatArray.push(point);
    }
  
    // create layer
    let heatLayer = L.heatLayer(heatArray, {
      radius: 25,
      blur: 20
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
  