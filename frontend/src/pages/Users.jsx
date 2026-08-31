import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Users.css";
import { getUsers } from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { response, data } = await getUsers();

        if (!response.ok) {
          setMessage(
            data.error || "Impossible de charger les utilisateurs ❌"
          );
          return;
        }

        setUsers(data);
      } catch (error) {
        console.error(error);
        setMessage(
          "Impossible de contacter le serveur Flask ❌"
        );
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="users-page">
      <Navbar />

      <main>
        <h1>Utilisateurs</h1>

        {message && (
          <p className="users-message">
            {message}
          </p>
        )}

        {!message && users.length === 0 && (
          <p className="users-empty">
            Aucun utilisateur trouvé.
          </p>
        )}

        {users.length > 0 && (
          <div className="users-list">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <h2>
                  {user.prenom} {user.nom}
                </h2>

                <p>
                  <strong>Email :</strong>{" "}
                  {user.email}
                </p>

                <p>
                  <strong>Téléphone :</strong>{" "}
                  {user.telephone}
                </p>

                <p>
                  <strong>Type :</strong>{" "}
                  {user.type}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Users;