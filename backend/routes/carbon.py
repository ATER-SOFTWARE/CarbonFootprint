from flask import Blueprint, request

from database import db
from models.calculation import Calculation
from services.carbon_service import calculate_carbon_footprint


carbon = Blueprint("carbon", __name__)


@carbon.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    utilisateur_id = data.get("utilisateurId")

    if not utilisateur_id:
        return {"error": "Utilisateur ID is required"}, 400

    result = calculate_carbon_footprint(
        electricity=data.get("electricity", 0),
        transport=data.get("transport", 0),
        gas=data.get("gas", 0),
        water=data.get("water", 0)
    )

    calculation = Calculation(
        utilisateur_id=utilisateur_id,
        electricity=float(data.get("electricity", 0) or 0),
        transport=float(data.get("transport", 0) or 0),
        gas=float(data.get("gas", 0) or 0),
        water=float(data.get("water", 0) or 0),
        total=result["total"]
    )

    db.session.add(calculation)
    db.session.commit()

    return {
        "message": "Calculation saved successfully",
        "calculation_id": calculation.id,
        "electricity": result["electricity"],
        "transport": result["transport"],
        "gas": result["gas"],
        "water": result["water"],
        "total": result["total"]
    }, 201