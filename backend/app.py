from flask import Flask
from flask_cors import CORS

from database import db

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///carbon.db"

db.init_app(app)

from models.utilisateur import Utilisateur
from models.environment import Environment
from models.calculation import Calculation
from models.contact import Contact

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


@app.route("/")
def home():
    return "Carbon Footprint API is running!"


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=False)