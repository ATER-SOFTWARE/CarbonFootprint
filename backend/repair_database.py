import sqlite3
import os


DATABASE_PATH = os.path.join(
    os.path.dirname(__file__),
    "instance",
    "carbon.db"
)


connection = sqlite3.connect(DATABASE_PATH)
cursor = connection.cursor()


# Supprimer les anciens environnements
# qui ont été enregistrés avec un utilisateur_id incorrect.
cursor.execute(
    "DELETE FROM environment WHERE utilisateur_id = 'undefined'"
)


# Corriger les anciennes données de test
# qui contiennent le texte ajouté par erreur.
cursor.execute(
    """
    UPDATE utilisateur
    SET telephone = '92880961'
    WHERE telephone LIKE '%Création du compte%'
    """
)


connection.commit()
connection.close()


print("Database repaired successfully ✅")