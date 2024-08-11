
function make_table() {
    // Get filter requests from the form
    var animal_filter = d3.select("#animal_filter").property("value");
    var gender_filter = d3.select("#gender_filter").property("value");
    console.log("Animal Filter: " + animal_filter);
    console.log("Gender Filter: " + gender_filter);

    // Make a request to the table data route
    let url = "http://127.0.0.1:5000/api/v1.0/table_data/" + animal_filter + "/" + gender_filter;
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
    console.log("Initializing page...");
    // Create charts
    make_table();
}

    
// // Event listener for the filter button
// d3.select("#filter").on("click", init());

// Initialize the page with a default plot
init()