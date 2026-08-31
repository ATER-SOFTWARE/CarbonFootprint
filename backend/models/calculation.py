from database import db


class Calculation(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    utilisateur_id = db.Column(
        db.Integer,
        db.ForeignKey("utilisateur.id"),
        nullable=False
    )

    electricity = db.Column(
        db.Float,
        nullable=False
    )

    transport = db.Column(
        db.Float,
        nullable=False
    )

    gas = db.Column(
        db.Float,
        nullable=False
    )

    water = db.Column(
        db.Float,
        nullable=False
    )

    total = db.Column(
        db.Float,
        nullable=False
    )