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
        self.engine = create_engine("sqlite:///app/carlos/Resources/combined_attacks.sqlite")
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
                SELECT *
                FROM combined_attacks;
                """

        # Save the query results as a Pandas DataFrame
        df = pd.read_sql(text(query), con=self.engine)
        data = df.to_dict(orient="records")
        return (data)
    
    def over_time(self, animal_type_param, sex_param):
        # Find the most recent date in the data set.
        query = f"""
                SELECT 
                    cast(year as int) as year, 
                    count(year) as attacks
                FROM combined_attacks
                WHERE year <> 'NaN'
                    AND animal_type = '{animal_type_param}'
                    AND sex = '{sex_param}'
                GROUP BY year
                ORDER BY year;
                """

        # Save the query results as a Pandas DataFrame
        df = pd.read_sql(text(query), con=self.engine)
        data = df.to_dict(orient="records")
        return (data)

    def main_places(self, animal_type_param, sex_param):
        # Find the most recent date in the data set.
        query = f"""
                SELECT 
                    location as location,
                    area as area, 
                    country as country, 
                    count(year) as attacks
                FROM combined_attacks
                WHERE year <> 'NaN'
                    AND animal_type = '{animal_type_param}'
                    AND sex = '{sex_param}'
                GROUP BY location
                ORDER BY location desc
                LIMIT 20;
                """

        # Save the query results as a Pandas DataFrame
        df = pd.read_sql(text(query), con=self.engine)
        data = df.to_dict(orient="records")
        return (data)    