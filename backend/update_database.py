import sqlite3
import os


DATABASE_PATH = os.path.join(
    os.path.dirname(__file__),
    "instance",
    "carbon.db"
)


connection = sqlite3.connect(DATABASE_PATH)
cursor = connection.cursor()

cursor.execute("PRAGMA table_info(utilisateur)")
columns = [column[1] for column in cursor.fetchall()]

if "password" not in columns:
    cursor.execute(
        "ALTER TABLE utilisateur ADD COLUMN password VARCHAR(255)"
    )
    print("Password column added successfully ✅")
else:
    print("Password column already exists ✅")

connection.commit()
connection.close()

print("Database updated successfully ✅")