import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";
import { Link } from "react-router-dom";
import { getUser } from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("Utilisateur non connecté ❌");
      return;
    }

    const loadUser = async () => {
      try {
        const { response, data } = await getUser(userId);

        if (!response.ok) {
          setMessage(
            data.error || "Impossible de charger le profil ❌"
          );
          return;
        }

        setUser(data);

        localStorage.setItem("userNom", data.nom);
        localStorage.setItem("userPrenom", data.prenom);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userTelephone", data.telephone);
        localStorage.setItem("userType", data.type);
      } catch (error) {
        console.error(error);
        setMessage(
          "Impossible de contacter le serveur Flask ❌"
        );
      }
    };

    loadUser();
  }, []);

  return (
    <div className="profile-page">
      <Navbar />

      <main>
        <h1>Mon profil</h1>

        {message && (
          <p>{message}</p>
        )}

        {user && (
          <div className="profile-card">
            <p>
              <strong>Nom :</strong> {user.nom}
            </p>

            <p>
              <strong>Prénom :</strong> {user.prenom}
            </p>

            <p>
              <strong>Email :</strong> {user.email}
            </p>

            <p>
              <strong>Téléphone :</strong> {user.telephone}
            </p>

            <p>
              <strong>Type :</strong> {user.type}
            </p>

            <Link to="/settings">
              Modifier mes informations
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;