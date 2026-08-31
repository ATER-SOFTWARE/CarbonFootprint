import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Settings.css";
import { updateUser } from "../services/api";

function Settings() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    nom: localStorage.getItem("userNom") || "",
    prenom: localStorage.getItem("userPrenom") || "",
    email: localStorage.getItem("userEmail") || "",
    telephone: localStorage.getItem("userTelephone") || ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("Utilisateur non connecté ❌");
      return;
    }

    try {
      const { response, data } = await updateUser(
        userId,
        formData
      );

      if (!response.ok) {
        setMessage(
          data.error || "Impossible de mettre à jour les informations ❌"
        );
        return;
      }

      setMessage("Informations mises à jour avec succès ✅");

      localStorage.setItem("userNom", data.user.nom);
      localStorage.setItem("userPrenom", data.user.prenom);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userTelephone", data.user.telephone);

      setFormData({
        nom: data.user.nom,
        prenom: data.user.prenom,
        email: data.user.email,
        telephone: data.user.telephone
      });
    } catch (error) {
      console.error(error);

      setMessage(
        "Impossible de contacter le serveur Flask ❌"
      );
    }
  };

  return (
    <div className="settings-page">
      <Navbar />

      <main>
        <h1>Paramètres</h1>

        <p>Gérer les informations de votre compte.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom</label>

            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Prénom</label>

            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Téléphone</label>

            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Enregistrer
          </button>
        </form>

        {message && (
          <p>{message}</p>
        )}
      </main>
    </div>
  );
}

export default Settings;