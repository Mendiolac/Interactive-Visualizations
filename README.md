# Belly Button Biodiversity
https://cm-interactive-visualization.herokuapp.com/

An interactive dashboard that explores the Belly Button Biodiversity DataSet illustrating the percentage of specific bacterias found in patients.

### Installing
Handles sqlalchemy and flask to create a database connecting to sqlite. 

```
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)
```
  


