function createMap(data) {
    // STEP 1: Init the Base Layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
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
      let point = [latitude, longitude];
      let marker = L.marker(point);
      let popup = `<h1>${row.location}</h1><hr><h2>${row.animal_type}</h2><hr><h3>${row.sex} | ${row.attacks}</h3>`;
      marker.bindPopup(popup);
      markers.addLayer(marker);
      heatArray.push(point);
    }
    let heatLayer = L.heatLayer(heatArray, {
      radius: 15,   // Adjust radius to control size of heatmap points
      blur: 15,     // Adjust blur to fine-tune the heatmap appearance
      gradient: {   // Customize the gradient
          0.0: 'blue',
          0.5: 'lime',
          1.0: 'red'
      }
    });
    // Step 3: BUILD the Layer Controls
    let baseLayers = {
      "Street Map": street,
      "Topographic Map": topo
    };
    let overlayLayers = {
      "Marker Cluster": markers,
      "Heatmap": heatLayer
    };
    // Step 4: INIT the Map
    d3.select("#map_container").html(""); // Clear previous map
    d3.select("#map_container").html("<div id='map'></div>"); // Create new map container
    let myMap = L.map("map", {
      center: [40.7128, -74.0059],
      zoom: 5,
      layers: [street, markers]
    });
    // Step 5: Add the Layer Control
    L.control.layers(baseLayers, overlayLayers, {
        collapsed: false
    }).addTo(myMap);