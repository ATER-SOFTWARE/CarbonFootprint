from flask import Blueprint, request

from database import db
from models.contact import Contact


contact = Blueprint("contact", __name__)


@contact.route("/contact", methods=["POST"])
def create_contact():
    data = request.get_json()

    if not data:
        return {"error": "No data provided"}, 400

    if not data.get("nom"):
        return {"error": "Nom is required"}, 400

    if not data.get("email"):
        return {"error": "Email is required"}, 400

    if not data.get("message"):
        return {"error": "Message is required"}, 400

    contact_message = Contact(
        nom=data["nom"],
        email=data["email"],
        message=data["message"]
    )

    db.session.add(contact_message)
    db.session.commit()

    return {
        "message": "Message envoyé avec succès ✅",
        "contact_id": contact_message.id
    }, 201