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


@app.route("/api/v1.0/full_data_sql")
def full_data_sql():
    data = sql.full_data_sql()
    return (jsonify(data))


@app.route("/api/v1.0/over_time/<animal_type>/<sex>")
def over_time(animal_type, sex):
    data = sql.over_time(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/main_places/<animal_type>/<sex>/<row_limit>")
def main_places(animal_type, sex, row_limit):
    data = sql.main_places(animal_type, sex, row_limit)
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


@app.route("/api/v1.0/scatter_data/<animal_type>/<sex>")
def scatter_data(animal_type, sex):
    data = sql.scatter_data(animal_type, sex)
    return (jsonify(data))


@app.route("/api/v1.0/attack_metrics/<animal_type>/<sex>")
def attack_metrics(animal_type, sex):
    data = sql.attack_metrics(animal_type, sex)
    return (jsonify(data))


# Run the App
if __name__ == '__main__':
    app.run(debug=True)