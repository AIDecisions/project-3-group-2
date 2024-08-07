from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, func
import pandas as pd
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# The Purpose of this Class is to separate out any Database logic
class SQLHelper():
    #################################################
    # Database Setup
    #################################################

    def __init__(self):
        """Initialize database connection and reflect tables."""
        self.engine = create_engine("sqlite:///combined_attacks.sqlite")
        self.Base = None
        self.init_base()

    def init_base(self):
        """Reflect an existing database into a new model."""
        try:
            self.Base = automap_base()
            self.Base.prepare(autoload_with=self.engine)
            logger.info("Database tables reflected successfully.")
        except Exception as e:
            logger.error(f"Error reflecting database: {e}")

    #################################################
    # Database Queries
    #################################################

    def full_data_sql(self):
        """Execute a query to get attack counts grouped by age."""
        query = """
            SELECT age, COUNT(*) as count
            FROM combined_attacks
            GROUP BY age
            ORDER BY count DESC;
        """
        try:
            # Execute query and load results into a DataFrame
            df = pd.read_sql(text(query), con=self.engine)
            data = df.to_dict(orient="records")
            logger.info("Query executed successfully.")
            return data
        except Exception as e:
            logger.error(f"Error executing query: {e}")
            return None
