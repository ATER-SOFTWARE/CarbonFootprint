from database import db


class Environment(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    utilisateur_id = db.Column(
        db.Integer,
        db.ForeignKey("utilisateur.id"),
        nullable=False
    )

    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=False)