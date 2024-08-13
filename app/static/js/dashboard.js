// function to make line chart - overtime attacks
function make_over_time_line_chart() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");

    // Make a request to the line chart data route
    let url = `/api/v1.0/over_time/${animal_filter}/${gender_filter}`;
    // console.log(url);

    let line_chart = d3.select("#over_time_container");
    line_chart.html(""); // Clear the chart

    // Make a request to the line chart data route
    d3.json(url).then(function(data) {
        // console.log(data);

        // Create the line chart
        let trace1 = {
            x: data.map(row => row.year),
            y: data.map(row => row.attacks),
            type: "line",
            mode: "lines",
            name: "Attacks",
            line: {
                color: "#17BECF"
            }
        };

        let layout = {
            title: "Attacks Over Time",
            xaxis: { title: "Year" },
            yaxis: { title: "Number of Attacks" }
        };

        Plotly.newPlot("over_time_container", [trace1], layout);
    });
}

// Make scatter plot - year vs age
function make_year_age_scatter_plot() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");

    // Make a request to the scatter plot data route
    let url = `/api/v1.0/scatter_data/${animal_filter}/${gender_filter}`;
    console.log(url);

    let scatter_plot = d3.select("#main_places_container");
    scatter_plot.html(""); // Clear the chart

    // Make a request to the scatter plot data route
    d3.json(url).then(function(data) {
        console.log(data);

        // Create the scatter plot
        let trace1 = {
            x: data.map(row => row.year),
            y: data.map(row => row.age),
            mode: "markers",
            type: "scatter",
            marker: {
                size: 10,
                color: data.map(row => row.age),
                colorscale: "thermal",
                colorbar: {
                    title: "Age"
                }
            }
        };

        let layout = {
            title: "Year vs Age",
            xaxis: { title: "Year" },
            yaxis: { title: "Age" },
            legend: {
                x: 1,
                y: 1,
                xanchor: "right",
                yanchor: "top"
            }
        };

        Plotly.newPlot("main_places_container", [trace1], layout);
    });
}

// // Make a bar chart - top 20 locations
// function make_main_places_bar_chart() {
//     // Get filter requests from the form
//     var animal_filter = d3.select("#animal_filter").property("value");
//     var gender_filter = d3.select("#gender_filter").property("value");

//     // Make a request to the bar chart data route
//     let url = `/api/v1.0/main_places/${animal_filter}/${gender_filter}`;
//     console.log(url);

//     let bar_chart = d3.select("#main_places_container");
//     bar_chart.html(""); // Clear the chart

//     // Make a request to the bar chart data route
//     d3.json(url).then(function(data) {
//         console.log(data);

//         // Create the bar chart
//         let trace1 = {
//             x: data.map(row => row.location.substring(0, 20)+"..."),
//             y: data.map(row => row.attacks),
//             type: "bar",
//             marker: {
//             color: "#17BECF"
//             },
//             hovertext: data.map(row => row.location)
//         };

//         let layout = {
//             title: "Top 20 Locations",
//             xaxis: { title: "Location" },
//             yaxis: { title: "Number of Attacks" },
//             margin: { t: 100, l: 50, r: 30, b: 125 }
//         };


//         Plotly.newPlot("main_places_container", [trace1], layout);
//     });
// }

// Function to make the table - descriptive information
function make_table() {
    // re-init the datatable
    // $('#data_table_container').DataTable().clear().destroy();

    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");
    // console.log("Animal Filter: " + animal_filter);
    // console.log("Gender Filter: " + gender_filter);

    // Make a request to the table data route
    let url = `/api/v1.0/table_data/${animal_filter}/${gender_filter}`;
//    let url = "/api/v1.0/full_data_sql/";
    // console.log(url);

    let table = d3.select("#data_table_container");
    let tbody = table.select("tbody");
    tbody.html(""); // Clear the table

    // Make a request to the table data route
    d3.json(url).then(function(data) {
        // console.log(data);

        // Loop through data and append to table
        for (let i = 0; i < data.length; i++) {
            let row = tbody.append("tr");
            row.append("td").text(data[i].animal_type);
            row.append("td").text(data[i].date);
            row.append("td").text(data[i].attack_type);
            row.append("td").text(data[i].area);
            row.append("td").text(data[i].country);
            row.append("td").text(data[i].fatal_y_n);
            row.append("td").text(data[i].sex);
            row.append("td").text(data[i].injury);
            row.append("td").text(data[i].species);
            if (data[i].href == null) {
                row.append("td").text("N/A");
            } else
                row.append("td").html('<a href="' + data[i].href + '">Link</a>');
        
        }
    });
    // Create the datatable
    // $('#data_table_container').DataTable();
}

// Initialize the page with a default plot
function init() {
    // console.log("Initializing page...");
    // Create charts
    make_over_time_line_chart();
    make_year_age_scatter_plot();
    make_table();
}

function updateChart() {
    make_main_places_bar_chart();
    make_year_age_scatter_plot();
    make_table();
}
    
// Event listener for the filter button
d3.select("#filter").on("click", init);

// Initialize the page with a default plot
init();