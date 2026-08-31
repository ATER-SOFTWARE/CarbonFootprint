from flask import Blueprint, request

from database import db
from models.environment import Environment
from models.utilisateur import Utilisateur


environment = Blueprint("environment", __name__)


@environment.route("/environment", methods=["POST"])
def create_environment():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    utilisateur_id = data.get("utilisateurId")
    type_environment = data.get("type")

    if not utilisateur_id:
        return {"error": "Utilisateur ID is required"}, 400

    if not type_environment:
        return {"error": "Type is required"}, 400

    utilisateur = Utilisateur.query.get(utilisateur_id)

    if not utilisateur:
        return {"error": "Utilisateur introuvable"}, 404

    if type_environment == "individu":
        nom = utilisateur.nom
        prenom = utilisateur.prenom

    else:
        nom = data.get("nom", "").strip()
        prenom = data.get("prenom", "").strip()

        if not nom:
            return {"error": "Nom is required"}, 400

        if not prenom:
            return {"error": "Prenom is required"}, 400

    environment_data = Environment(
        utilisateur_id=utilisateur_id,
        nom=nom,
        prenom=prenom,
        type=type_environment
    )

    db.session.add(environment_data)
    db.session.commit()

    return {
        "message": "Environment created successfully",
        "environment_id": environment_data.id,
        "environment": {
            "id": environment_data.id,
            "nom": environment_data.nom,
            "prenom": environment_data.prenom,
            "type": environment_data.type
        }
    }, 201


@environment.route("/environment/user/<int:user_id>", methods=["GET"])
def get_user_environment(user_id):
    environments = Environment.query.filter_by(
        utilisateur_id=user_id
    ).all()

    return [
        {
            "id": item.id,
            "utilisateur_id": item.utilisateur_id,
            "nom": item.nom,
            "prenom": item.prenom,
            "type": item.type
        }
        for item in environments
    ], 200