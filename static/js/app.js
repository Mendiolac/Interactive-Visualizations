function buildMetadata(sample) {
   console.log(sample);
   d3.select("#sample-metadata").html("");
    d3.json(`/metadata/${sample}`).then((bellyBUtton) => {
      
      var resKeys = Object.keys(bellyBUtton);
      var sampleMetadata = document.querySelector("#sample-metadata");
      for (var i = 0; i < resKeys.length; i++) {
        var $newDataLine = document.createElement('p');
        $newDataLine.innerHTML = resKeys[i] + ": " + bellyBUtton[resKeys[i]];
        sampleMetadata.appendChild($newDataLine)
        
      }; });

  
      
     
    };
    


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((bellyBUtton) => {
  var trace1 = {
    x: bellyBUtton.otu_ids,
    y: bellyBUtton.sample_values,
    text: bellyBUtton.otu_labels,
    mode: 'markers',
    marker: {
      size: bellyBUtton.sample_values,
      color: bellyBUtton.otu_ids
    }
  };
  
  var bubble_data = [trace1];
  
  var bubble_layout = {
    title: 'Bubble Chart',
    showlegend: false  };
  
  Plotly.newPlot('bubble', bubble_data, bubble_layout);


  //  Grab the top 10 samples for the pie chart
 
 
  var filtered_values = [];
  var filtered_otu_ids = [];
  var filtered_otu_labels = [];
  var len = bellyBUtton.sample_values.length;
  var indices = new Array(len);
  for (var i = 0; i < len; i++) {
    indices[i] = i;
    indices.sort(function (a, b) { return bellyBUtton.sample_values[a] < bellyBUtton.sample_values[b] ? 1 : 
      bellyBUtton.sample_values[a] > bellyBUtton.sample_values[b] ? -1 : 0; });
  };    
  for (var i =0; i<10; i++){
    var j = indices[i];
    filtered_values.push(bellyBUtton.sample_values[j]);
    filtered_otu_ids.push(bellyBUtton.otu_ids[j]);
    filtered_otu_labels.push(bellyBUtton.otu_labels[j]);
  };

    
  var pie_data = [{
  values: filtered_values,
  labels: filtered_otu_ids,
  text: filtered_otu_labels,
  type: 'pie',
  textinfo: 'percent'
  }];

  var pie_layout = {
  title: 'Pie Chart',
  showlegend: true,
  text: "Top 10 Samples"

  };

  Plotly.newPlot('pie', pie_data, pie_layout);

  }) 
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

}
// Initialize the dashboard
    init()
   