import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/allattacks.sqlite")
conn = engine.connect()
# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save reference to the table
# Combined_attacks = Base.classes.combined_attacks
#print(Base.classes.keys())

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all attack names"""
    # Query all attacks
    results = session.query(attack.name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/attacks_by_gender")
def attacks_by_gender():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # """Return a list of attack data including the name, age, and sex of each attack"""
    # # Query all attacks
    # results = session.query(Combined_attacks.year,Combined_attacks.sex).all()
    query = """SELECT * 
        FROM combined_attacks"""
    df = pd.read_sql(query, conn)
    # print(df.head())

    session.close()

    results = df[['year','sex']].copy()
    results.dropna(inplace = True)
    results['year'] = results['year'].astype(int)

    results = results.value_counts().reset_index().sort_values('year')
    results.columns = ['year', 'sex', 'attacks']


    # Create a dictionary from the row data and append to a list of all_attacks
    all_attacks = []
    for index, row in results.iterrows():
        attack_dict = {}
        attack_dict["year"] = row["year"]
        attack_dict["sex"] = row["sex"]
        attack_dict["attacks"] = row["attacks"]
        all_attacks.append(attack_dict)

    return jsonify(all_attacks)


if __name__ == '__main__':
    app.run(debug=True)
