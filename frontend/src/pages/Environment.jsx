import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Environment.css";
import { createEnvironment } from "../services/api";

function Environment() {
  const userId = localStorage.getItem("userId");
  const userNom = localStorage.getItem("userNom") || "";
  const userPrenom = localStorage.getItem("userPrenom") || "";

  const [type, setType] = useState("individu");
  const [nom, setNom] = useState(userNom);
  const [prenom, setPrenom] = useState(userPrenom);
  const [message, setMessage] = useState("");

  const handleTypeChange = (e) => {
    const newType = e.target.value;

    setType(newType);
    setMessage("");

    if (newType === "individu") {
      setNom(userNom);
      setPrenom(userPrenom);
    } else {
      setNom("");
      setPrenom(userPrenom);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("Utilisateur non connecté ❌");
      return;
    }

    if (type === "societe" && !nom.trim()) {
      setMessage("Nom de la société requis ❌");
      return;
    }

    if (type === "project" && !nom.trim()) {
      setMessage("Nom du projet requis ❌");
      return;
    }

    try {
      const { response, data } = await createEnvironment({
        utilisateurId: userId,
        nom: nom.trim(),
        prenom: prenom.trim(),
        type
      });

      if (response.ok) {
        setMessage("Environnement créé avec succès ✅");
      } else {
        setMessage(
          data.error || "Une erreur est survenue ❌"
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Impossible de contacter le serveur Flask ❌"
      );
    }
  };

  return (
    <div className="environment-page">
      <Navbar />

      <main>
        <div className="environment-card">
          <h1>Mon environnement</h1>

          <p className="environment-description">
            Sélectionnez le type de votre environnement.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type d'environnement</label>

              <select
                value={type}
                onChange={handleTypeChange}
              >
                <option value="individu">
                  Individu
                </option>

                <option value="societe">
                  Société
                </option>

                <option value="project">
                  Projet
                </option>
              </select>
            </div>

            {type === "individu" && (
              <>
                <div className="form-group">
                  <label>Nom</label>

                  <input
                    type="text"
                    value={nom}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Prénom</label>

                  <input
                    type="text"
                    value={prenom}
                    readOnly
                  />
                </div>
              </>
            )}

            {type === "societe" && (
              <div className="form-group">
                <label>Nom de la société</label>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Entrez le nom de la société"
                  required
                />
              </div>
            )}

            {type === "project" && (
              <div className="form-group">
                <label>Nom du projet</label>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Entrez le nom du projet"
                  required
                />
              </div>
            )}

            <button type="submit">
              Enregistrer l'environnement
            </button>
          </form>

          {message && (
            <div className="environment-message">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Environment;