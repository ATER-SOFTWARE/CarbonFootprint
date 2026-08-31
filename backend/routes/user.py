from flask import Blueprint, request

from database import db
from models.utilisateur import Utilisateur


user = Blueprint("user", __name__)


@user.route("/users", methods=["GET"])
def get_users():
    utilisateurs = Utilisateur.query.all()

    return [
        {
            "id": utilisateur.id,
            "nom": utilisateur.nom,
            "prenom": utilisateur.prenom,
            "email": utilisateur.email,
            "telephone": utilisateur.telephone,
            "type": utilisateur.type
        }
        for utilisateur in utilisateurs
    ], 200


@user.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    utilisateur = Utilisateur.query.get(user_id)

    if not utilisateur:
        return {
            "error": "Utilisateur introuvable"
        }, 404

    return {
        "id": utilisateur.id,
        "nom": utilisateur.nom,
        "prenom": utilisateur.prenom,
        "email": utilisateur.email,
        "telephone": utilisateur.telephone,
        "type": utilisateur.type
    }, 200


@user.route("/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()

    if not data:
        return {
            "error": "No data provided"
        }, 400

    utilisateur = Utilisateur.query.get(user_id)

    if not utilisateur:
        return {
            "error": "Utilisateur introuvable"
        }, 404

    if data.get("nom"):
        utilisateur.nom = data["nom"]

    if data.get("prenom"):
        utilisateur.prenom = data["prenom"]

    if data.get("email"):
        utilisateur.email = data["email"]

    if data.get("telephone"):
        utilisateur.telephone = data["telephone"]

    try:
        db.session.commit()

        return {
            "message": "Informations mises à jour avec succès",
            "user": {
                "id": utilisateur.id,
                "nom": utilisateur.nom,
                "prenom": utilisateur.prenom,
                "email": utilisateur.email,
                "telephone": utilisateur.telephone,
                "type": utilisateur.type
            }
        }, 200

    except Exception:
        db.session.rollback()

        return {
            "error": "Impossible de mettre à jour les informations"
        }, 500