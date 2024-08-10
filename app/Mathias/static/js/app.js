// d3.json("http://127.0.0.1:5000/api/v1.0/attacks_by_gender")
//   .then(function(data){
//     // Code from your callback goes here...
//     console.log(data)
//   });
  function updateChart(animalType) {
    // selected animal type
    buildCharts(animalType)
    d3.json("https://www.kaggle.com/datasets/danela/fatal-bear-attacks-north-america").then((data) => {
        // Get the metadata field
        console.log("This is bear attacks data",data)
        //let metadata = data.metadata;
    });
  }
  function buildCharts(animalType) {
    // selected animal type
  }