import re

from flask import Blueprint, request
from sqlalchemy.exc import IntegrityError

from database import db
from models.utilisateur import Utilisateur


auth = Blueprint("auth", __name__)


NAME_REGEX = r"^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$"
EMAIL_REGEX = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
PHONE_REGEX = r"^\d{8}$"


def validate_password(password):
    if len(password) < 8:
        return "Le mot de passe doit contenir au moins 8 caractères"

    if len(password) > 64:
        return "Le mot de passe ne doit pas dépasser 64 caractères"

    if not re.search(r"[A-Z]", password):
        return "Le mot de passe doit contenir au moins une majuscule"

    if not re.search(r"[a-z]", password):
        return "Le mot de passe doit contenir au moins une minuscule"

    if not re.search(r"[0-9]", password):
        return "Le mot de passe doit contenir au moins un chiffre"

    if not re.search(r"[^A-Za-z0-9]", password):
        return "Le mot de passe doit contenir au moins un symbole"

    return None


@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    nom = str(data.get("nom", "")).strip()
    prenom = str(data.get("prenom", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    telephone = str(data.get("telephone", "")).strip()
    password = str(data.get("password", ""))
    user_type = str(data.get("type", "")).strip().lower()

    if not nom:
        return {"error": "Nom is required"}, 400

    if len(nom) > 50:
        return {"error": "Nom is too long"}, 400

    if user_type == "individu" and len(nom) > 12:
        return {"error": "Le nom ne doit pas dépasser 12 caractères"}, 400

    if not re.fullmatch(NAME_REGEX, nom):
        return {
            "error": "Le nom contient des caractères invalides"
        }, 400

    if not prenom:
        return {"error": "Prenom is required"}, 400

    if len(prenom) > 12:
        return {
            "error": "Le prénom ne doit pas dépasser 12 caractères"
        }, 400

    if not re.fullmatch(NAME_REGEX, prenom):
        return {
            "error": "Le prénom contient des caractères invalides"
        }, 400

    if not email:
        return {"error": "Email is required"}, 400

    if len(email) > 120:
        return {"error": "Email is too long"}, 400

    if not re.fullmatch(EMAIL_REGEX, email):
        return {"error": "Email invalide"}, 400

    if not telephone:
        return {"error": "Telephone is required"}, 400

    if not re.fullmatch(PHONE_REGEX, telephone):
        return {
            "error": "Le téléphone doit contenir exactement 8 chiffres"
        }, 400

    if not password:
        return {"error": "Password is required"}, 400

    password_error = validate_password(password)

    if password_error:
        return {
            "error": password_error
        }, 400

    if user_type not in ["individu", "societe", "project"]:
        return {"error": "Type invalide"}, 400

    user = Utilisateur(
        nom=nom,
        prenom=prenom,
        email=email,
        telephone=telephone,
        password=password,
        type=user_type
    )

    db.session.add(user)

    try:
        db.session.commit()

    except IntegrityError:
        db.session.rollback()

        return {
            "error": "Email already exists"
        }, 409

    return {
        "message": "User created successfully",
        "user_id": user.id
    }, 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not email:
        return {"error": "Email is required"}, 400

    if not password:
        return {"error": "Password is required"}, 400

    user = Utilisateur.query.filter_by(
        email=email
    ).first()

    if not user:
        return {
            "error": "Email ou mot de passe incorrect"
        }, 401

    if user.password != password:
        return {
            "error": "Email ou mot de passe incorrect"
        }, 401

    return {
        "message": "Login successful",
        "user_id": user.id,
        "nom": user.nom,
        "prenom": user.prenom,
        "email": user.email,
        "telephone": user.telephone,
        "type": user.type
    }, 200