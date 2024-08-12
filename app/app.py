from flask import Flask, jsonify, render_template
from sqlHelper import SQLHelper

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
sql = SQLHelper()

#################################################
# Flask Routes
#################################################

# HTML Routes

@app.route('/')
def welcome():
    return render_template('index.html')


@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')


@app.route('/map.html')
def map():
    return render_template('map.html')


@app.route('/aboutus.html')
def aboutus():
    return render_template('aboutus.html')


# Database Routes


    # return ('''
    #         Welcome to the Climate Analysis API!                                                                                                                                            <br/>
    #         Available Routes:                                                                                                                                                               <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/full_data_sql">/api/v1.0/full_data_sql</a>                                                                                           <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/over_time/&lt;animal_type&gt;/&lt;sex&gt;">/api/v1.0/over_time/&lt;animal_type&gt;/&lt;sex&gt;</a>                                   <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/main_places/&lt;animal_type&gt;/&lt;sex&gt;">/api/v1.0/main_places/&lt;animal_type&gt;/&lt;sex&gt;</a>                               <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/map_places/&lt;animal_type&gt;/&lt;sex&gt;">/api/v1.0/map_places/&lt;animal_type&gt;/&lt;sex&gt;</a>                                 <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/injuries/&lt;animal_type&gt;/&lt;sex&gt;">/api/v1.0/injuries/&lt;animal_type&gt;/&lt;sex&gt;</a>                                     <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/table_data">/api/v1.0/table_data/&lt;animal_type&gt;/&lt;sex&gt;</a>                                                                 <br/>
    #                                                                                                                                                                                         <br/>
    #                                                                                                                                                                                         <br/>
    #         Explanation of the Routes:                                                                                                                                                      <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;full_data_sql: Returns all the data from the table using SQL.                                                                                           <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;over_time/&lt;animal_type&gt;/&lt;sex&gt;: Returns the number of attacks over time for a specific animal                                                <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;main_places/&lt;animal_type&gt;/&lt;sex&gt;: Returns the top 20 main places where the attacks happened for a specific animal.                           <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;map_places/&lt;animal_type&gt;/&lt;sex&gt;: Returns the places where the attacks happened for a specific animal.                                        <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;injuries/&lt;animal_type&gt;/&lt;sex&gt;: Returns the injuries that happened for a specific animal.                                                     <br/>
    #         &nbsp;&nbsp;&nbsp;&nbsp;table_data/&lt;animal_type&gt;/&lt;sex&gt;: Returns the data for the table chart.                                                                       <br/>
    #         ''')


@app.route("/api/v1.0/full_data_sql")
def full_data_sql():
    data = sql.full_data_sql()
    return (jsonify(data))


@app.route("/api/v1.0/over_time/<animal_type>/<sex>")
def over_time(animal_type, sex):
    data = sql.over_time(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/main_places/<animal_type>/<sex>")
def main_places(animal_type, sex):
    data = sql.main_places(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/map_places/<animal_type>/<sex>")
def map_places(animal_type, sex):
    data = sql.map_places(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/injuries/<animal_type>/<sex>")
def injuries(animal_type, sex):
    data = sql.injuries(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/table_data/<animal_type>/<sex>")
def table_data(animal_type, sex):
    data = sql.table_data(animal_type, sex)
    return (jsonify(data))


# Run the App
if __name__ == '__main__':
    app.run(debug=True)