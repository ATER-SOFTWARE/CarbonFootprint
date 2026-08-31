import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    setMessage("");

    try {
      const { response, data } = await loginUser(formData);

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userNom", data.nom);
        localStorage.setItem("userPrenom", data.prenom);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userTelephone", data.telephone);
        localStorage.setItem("userType", data.type);

        setMessage("Connexion réussie ✅");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);

        return;
      }

      setMessage(
        data.error || "Email ou mot de passe incorrect ❌"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Impossible de contacter le serveur Flask ❌"
      );
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <main>
        <h1>Connexion</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div>
            <label>Mot de passe</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button type="submit">
            Se connecter
          </button>
        </form>

        {message && (
          <p>{message}</p>
        )}
      </main>
    </div>
  );
}

export default Login;