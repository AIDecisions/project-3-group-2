console.log("app.js isloaded");
function make_table() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");
    console.log("Animal Filter: " + animal_filter);
    console.log("Gender Filter: " + gender_filter);

    // Make a request to the table data route
    let url = "/api/v1.0/table_data/" + animal_filter + "/" + gender_filter;
    console.log(url);

    // Make a request to the table data route
    d3.json(url).then(function(data) {
        console.log(data);
        // Get a reference to the table body
        var tbody = d3.select("data_table");

        // Loop through data and append to table
        data.forEach((data) => {
            var row = tbody.append("tr");
            Object.entries(data).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    });

  // line graph funtion MC
  make_line()
}
 
// line graph funtion MC
async function make_line() {
const url = "/api/v1.0/get_line"
const response = await d3.json(url)
console.log("make_line:", response);
 
var trace1 = {
  x: response.Year,
  y: response.Number of Attacks,
  mode: 'markers',
  type: 'line',
  name: 'Team A',
  // text: ['A-1', 'A-2', 'A-3', 'A-4', ],
  marker: { size: 7 }
};
 
var data = [ trace1, ];
 
var layout = {
  // xaxis: {
  //   range: [ 0.50, 5.25 ]
  // },
  // yaxis: {
  //   range: [0, 8]
  // },
  title:'Area Chart of Attack Counts Over Time'
};
 
Plotly.newPlot('line_chart', data, layout);
}

    // Make a request to the table data route
    // d3.json(url).then(function(data) {
    //     console.log(data);
        // // Get a reference to the table body
        // var tbody = d3.select("data_table");

        // // Loop through data and append to table
        // data.forEach((data) => {
        //     var row = tbody.append("tr");
        //     Object.entries(data).forEach(([key, value]) => {
        //         var cell = row.append("td");
        //         cell.text(value);
        //     });
        // });
    // });  
}


//     // Make a request to the table data route
//     d3.json("/api/v1.0/table_data/").then((data) => {
//     // Get a reference to the table body
//     var tbody = d3.select("tbody");

//     // Loop through data and append to table
//     data.forEach((data) => {
//         var row = tbody.append("tr");
//         Object.entries(data).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//         });
//     });
// });


// Initialize the page with a default plot
function init() {
    // console.log("Initializing page...");
    // Create charts
    make_table();
}

function updateChart() {
    make_table();
    
}
    
// // Event listener for the filter button
// d3.select("#filter").on("click", init());

// Initialize the page with a default plot
init()