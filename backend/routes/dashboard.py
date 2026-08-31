from flask import Blueprint

from models.calculation import Calculation
from models.environment import Environment


dashboard = Blueprint("dashboard", __name__)


@dashboard.route("/dashboard/<int:user_id>", methods=["GET"])
def get_dashboard(user_id):
    environments = Environment.query.filter_by(
        utilisateur_id=user_id
    ).all()

    calculations = (
        Calculation.query
        .filter_by(utilisateur_id=user_id)
        .order_by(Calculation.id.desc())
        .all()
    )

    return {
        "environments": [
            {
                "id": environment.id,
                "nom": environment.nom,
                "prenom": environment.prenom,
                "type": environment.type
            }
            for environment in environments
        ],
        "calculations": [
            {
                "id": calculation.id,
                "electricity": calculation.electricity,
                "transport": calculation.transport,
                "gas": calculation.gas,
                "water": calculation.water,
                "total": calculation.total
            }
            for calculation in calculations
        ]
    }, 200