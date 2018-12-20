# Belly Button Biodiversity
https://cm-interactive-visualization.herokuapp.com/

An interactive dashboard that explores the Belly Button Biodiversity DataSet illustrating the percentage of specific bacterias found in patients.

### Application 
Handles sqlalchemy and flask to create a database connecting to sqlite. 

```
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)
```

Jsonifys the data and used pandas to perform the sql query in order to return the sample names.
```
@app.route("/names")
def names():
    """Return a list of sample names."""

    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.columns)[2:])
```

Uses flask applications to create the ```sample metadata``` route presenting the selected sample and return the jsonified data.

```
 sample_metadata = {}
    for result in results:
        sample_metadata["sample"] = result[0]
        sample_metadata["ETHNICITY"] = result[1]
        sample_metadata["GENDER"] = result[2]
        sample_metadata["AGE"] = result[3]
        sample_metadata["LOCATION"] = result[4]
        sample_metadata["BBTYPE"] = result[5]
        sample_metadata["WFREQ"] = result[6]

    print(sample_metadata)
    return jsonify(sample_metadata)

```


### d3 and Plotly
Impliments ```d3.json``` to fetch sample data used to create a pie chart and bubble chart.

```
var url = "/samples/" + sample;
d3.json(url).then(function(response)
```

Created ```function buildCharts(sample)``` to create the charts using plotly:
The pie chart includes the top 10 bacteria types within each sample; each bacteria type displays the name, id, and percentage of the whole.

```
for (var i =0; i<10; i++){
      var j = indices[i];
      filtered_values.push(response.sample_values[j]);
      filtered_otu_ids.push(response.otu_ids[j]);
      filtered_otu_labels.push(response.otu_labels[j]);
    }
```

The bubble chart displays all the present bacteria; each represented by a different color. The marker size is directly proportional to the amount of bacteria found in the sample.  

```
var trace1 = {
    x: bellyBUtton.otu_ids,
    y: bellyBUtton.sample_values,
    text: bellyBUtton.otu_labels,
    mode: 'markers',
    marker: {
      size: bellyBUtton.sample_values,
      color: bellyBUtton.otu_ids
  ```
  
  An ```init function``` grabs a reference to the dropdown select element, employs the list of sample names to populate the select options and build the initial plots.
  
  ```
      const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
```

The ```function optionChanged(newSample``` fetches new data each time a new sample is selected before the dashboard it initialized.
  



