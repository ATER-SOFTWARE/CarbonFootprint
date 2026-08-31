import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Calculator.css";
import { calculateCarbon } from "../services/api";

function Calculator() {
  const [formData, setFormData] = useState({
    electricity: "",
    transport: "",
    gas: "",
    water: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const utilisateurId = localStorage.getItem("userId");

    if (!utilisateurId) {
      setError("Utilisateur non connecté ❌");
      return;
    }

    setResult(null);
    setError("");

    try {
      const { response, data } = await calculateCarbon({
        utilisateurId,
        electricity: formData.electricity,
        transport: formData.transport,
        gas: formData.gas,
        water: formData.water
      });

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue ❌");
        return;
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      setError("Impossible de contacter le serveur Flask ❌");
    }
  };

  return (
    <div>
      <Navbar />

      <main className="calculator-page">
        <h1>Carbon Footprint Calculator</h1>

        <p>
          Entrez vos informations pour calculer votre empreinte carbone.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Electricité (kWh)</label>

            <input
              type="number"
              name="electricity"
              value={formData.electricity}
              onChange={handleChange}
              min="0"
              placeholder="Ex: 250"
              required
            />
          </div>

          <div>
            <label>Transport (km)</label>

            <input
              type="number"
              name="transport"
              value={formData.transport}
              onChange={handleChange}
              min="0"
              placeholder="Ex: 500"
              required
            />
          </div>

          <div>
            <label>Gaz (m³)</label>

            <input
              type="number"
              name="gas"
              value={formData.gas}
              onChange={handleChange}
              min="0"
              placeholder="Ex: 20"
              required
            />
          </div>

          <div>
            <label>Eau (m³)</label>

            <input
              type="number"
              name="water"
              value={formData.water}
              onChange={handleChange}
              min="0"
              placeholder="Ex: 10"
              required
            />
          </div>

          <button type="submit">
            Calculer
          </button>
        </form>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {result && (
          <div className="result">
            <h2>Votre empreinte carbone</h2>

            <p>
              Electricité : {result.electricity} kg CO₂
            </p>

            <p>
              Transport : {result.transport} kg CO₂
            </p>

            <p>
              Gaz : {result.gas} kg CO₂
            </p>

            <p>
              Eau : {result.water} kg CO₂
            </p>

            <h3>
              Total : {result.total} kg CO₂
            </h3>

            <p>
              Calcul enregistré avec succès ✅
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Calculator;