from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, func
import pandas as pd
import datetime as dt



# The Purpose of this Class is to separate out any Database logic
class SQLHelper():
    #################################################
    # Database Setup
    #################################################

    # define properties
    def __init__(self):
        self.engine = create_engine("sqlite:///Resources/hawaii.sqlite")
        self.Base = None

        # automap Base classes
        self.init_base()

    def init_base(self):
        # reflect an existing database into a new model
        self.Base = automap_base()
        # reflect the tables
        self.Base.prepare(autoload_with=self.engine)

    #################################################
    # Database Queries
    #################################################

    def full_data_sql(self):
        # Find the most recent date in the data set.
        query = """
                SELECT date as Date, prcp as Precipitation
                FROM measurement
                WHERE date >= (SELECT DATE(date, '-365 days')
                                FROM measurement
                                ORDER BY date DESC
                                LIMIT 1)
                ORDER BY date;
                """

        # Save the query results as a Pandas DataFrame
        df = pd.read_sql(text(query), con=self.engine)
        data = df.to_dict(orient="records")
        return (data)