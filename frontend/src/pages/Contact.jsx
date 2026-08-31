import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";
import { sendContact } from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
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
      const { response, data } = await sendContact(formData);

      if (response.ok) {
        setMessage("Message envoyé avec succès ✅");

        setFormData({
          nom: "",
          email: "",
          message: ""
        });

        return;
      }

      setMessage(
        data.error || "Une erreur est survenue ❌"
      );
    } catch (error) {
      console.error(error);
      setMessage(
        "Impossible de contacter le serveur Flask ❌"
      );
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <h1>Contact</h1>

        <p>
          Pour toute question ou demande d'information,
          vous pouvez nous contacter.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom</label>

            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
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
              placeholder="Votre email"
              required
            />
          </div>

          <div>
            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              rows="5"
              required
            />
          </div>

          <button type="submit">
            Envoyer
          </button>
        </form>

        {message && (
          <p>{message}</p>
        )}
      </main>
    </div>
  );
}

export default Contact;