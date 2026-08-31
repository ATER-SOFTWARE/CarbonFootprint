from database import db


class Utilisateur(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nom = db.Column(
        db.String(100),
        nullable=False
    )

    prenom = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    telephone = db.Column(
        db.String(20),
        nullable=False
    )

    type = db.Column(
        db.String(20),
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )