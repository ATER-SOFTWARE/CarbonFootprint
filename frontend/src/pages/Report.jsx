import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Report.css";
import { getDashboard } from "../services/api";

function Report() {
  const [calculation, setCalculation] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("Utilisateur non connecté ❌");
      return;
    }

    const loadReport = async () => {
      try {
        const { response, data } = await getDashboard(userId);

        if (!response.ok) {
          setMessage(
            data.error || "Impossible de charger le rapport ❌"
          );
          return;
        }

        if (data.calculations && data.calculations.length > 0) {
          setCalculation(data.calculations[0]);
        } else {
          setMessage("Aucun calcul enregistré.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Impossible de contacter le serveur Flask ❌");
      }
    };

    loadReport();
  }, []);

  return (
    <div className="report-page">
      <Navbar />

      <main>
        <h1>Rapport</h1>

        {message && (
          <p>{message}</p>
        )}

        {calculation && (
          <div className="report-card">
            <h2>Résumé de votre empreinte carbone</h2>

            <div className="report-item">
              <span>Électricité</span>
              <strong>
                {calculation.electricity} kg CO₂
              </strong>
            </div>

            <div className="report-item">
              <span>Transport</span>
              <strong>
                {calculation.transport} kg CO₂
              </strong>
            </div>

            <div className="report-item">
              <span>Gaz</span>
              <strong>
                {calculation.gas} kg CO₂
              </strong>
            </div>

            <div className="report-item">
              <span>Eau</span>
              <strong>
                {calculation.water} kg CO₂
              </strong>
            </div>

            <div className="report-total">
              <span>Total</span>
              <strong>
                {calculation.total} kg CO₂
              </strong>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Report;