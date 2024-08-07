from flask import Flask, jsonify
from sqlHelper import SQLHelper

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
sql = SQLHelper()

#################################################
# Flask Routes
#################################################


@app.route('/')
def welcome():
    return ('''
            Welcome to the Climate Analysis API!                                                                                                                                            <br/>
            Available Routes:                                                                                                                                                               <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="/api/v1.0/full_data_sql">/api/v1.0/full_data_sql</a>                                                                                           <br/>

                                                                                                                                                                                            <br/>
                                                                                                                                                                                            <br/>
            Explanation of the Routes:                                                                                                                                                      <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;full_data_sql: Returns all the data from the table using SQL.                                                                                           <br/>
            ''')


@app.route("/api/v1.0/full_data_sql")
def full_data_sql():
    data = sql.full_data_sql()
    return (jsonify(data))