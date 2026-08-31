from database import db


class Contact(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nom = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        nullable=False
    )

    message = db.Column(
        db.Text,
        nullable=False
    )