import os

from flask import Flask
from flask_cors import CORS

from database import db

app = Flask(__name__)

# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------
CORS(app)

# ---------------------------------------------------------
# Database configuration
# ---------------------------------------------------------
# Local:
#   SQLite -> carbon.db
#
# Render:
#   PostgreSQL -> DATABASE_URL
# ---------------------------------------------------------

database_url = os.environ.get("DATABASE_URL")

if database_url:
    # Normalize Render PostgreSQL URL for psycopg 3
    if database_url.startswith("postgres://"):
        database_url = database_url.replace(
            "postgres://",
            "postgresql+psycopg://",
            1
        )

    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace(
            "postgresql://",
            "postgresql+psycopg://",
            1
        )

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url

else:
    # Local SQLite database
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "sqlite:///carbon.db"
    )

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ---------------------------------------------------------
# Initialize database
# ---------------------------------------------------------

db.init_app(app)

# ---------------------------------------------------------
# Models
# ---------------------------------------------------------

from models.utilisateur import Utilisateur
from models.environment import Environment
from models.calculation import Calculation
from models.contact import Contact

# ---------------------------------------------------------
# Routes / Blueprints
# ---------------------------------------------------------

from routes.auth import auth
from routes.environment import environment
from routes.carbon import carbon
from routes.user import user
from routes.dashboard import dashboard
from routes.contact import contact

app.register_blueprint(auth)
app.register_blueprint(environment)
app.register_blueprint(carbon)
app.register_blueprint(user)
app.register_blueprint(dashboard)
app.register_blueprint(contact)

# ---------------------------------------------------------
# API Home
# ---------------------------------------------------------

@app.route("/")
def home():
    return {
        "message": "Carbon Footprint API is running!",
        "database": "PostgreSQL" if database_url else "SQLite"
    }


# ---------------------------------------------------------
# Create database tables
# ---------------------------------------------------------

with app.app_context():
    db.create_all()


# ---------------------------------------------------------
# Run locally
# ---------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=False)