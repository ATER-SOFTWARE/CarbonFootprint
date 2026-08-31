import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import { getDashboard } from "../services/api";

function Dashboard() {
  const [user, setUser] = useState({
    nom: localStorage.getItem("userNom") || "",
    prenom: localStorage.getItem("userPrenom") || ""
  });

  const [environments, setEnvironments] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("Utilisateur non connecté ❌");
      return;
    }

    const loadDashboard = async () => {
      try {
        const { response, data } = await getDashboard(userId);

        if (!response.ok) {
          setMessage(data.error || "Impossible de charger le dashboard ❌");
          return;
        }

        setEnvironments(data.environments || []);
        setCalculations(data.calculations || []);
      } catch (error) {
        console.error(error);
        setMessage("Impossible de contacter le serveur Flask ❌");
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />

      <main>
        <h1>Dashboard</h1>

        {user.nom && user.prenom ? (
          <p>
            Bienvenue {user.prenom} {user.nom} !
          </p>
        ) : (
          <p>Bienvenue dans votre espace personnel.</p>
        )}

        {message && (
          <p>{message}</p>
        )}

        <div className="dashboard-actions">
          <Link to="/environment">
            Choisir mon environnement
          </Link>

          <Link to="/calculator">
            Calculer mon empreinte carbone
          </Link>
        </div>

        <section>
          <h2>Mes environnements</h2>

          {environments.length === 0 ? (
            <p>Aucun environnement enregistré.</p>
          ) : (
            environments.map((environment) => (
              <div key={environment.id}>
                <p>
                  {environment.type} : {environment.nom} {environment.prenom}
                </p>
              </div>
            ))
          )}
        </section>

        <section>
          <h2>Mes calculs</h2>

          {calculations.length === 0 ? (
            <p>Aucun calcul enregistré.</p>
          ) : (
            calculations.map((calculation) => (
              <div key={calculation.id}>
                <p>
                  Total : {calculation.total} kg CO₂
                </p>

                <p>
                  Électricité : {calculation.electricity} kg CO₂
                </p>

                <p>
                  Transport : {calculation.transport} kg CO₂
                </p>

                <p>
                  Gaz : {calculation.gas} kg CO₂
                </p>

                <p>
                  Eau : {calculation.water} kg CO₂
                </p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;