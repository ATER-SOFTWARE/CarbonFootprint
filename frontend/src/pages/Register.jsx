import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    type: "individu",
    nomStructure: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

    setMessage("");
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;

    setFormData((previous) => ({
      ...previous,
      type,
      nomStructure: ""
    }));

    setErrors({});
    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    const nom = formData.nom.trim();
    const prenom = formData.prenom.trim();
    const email = formData.email.trim().toLowerCase();
    const telephone = formData.telephone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const nomStructure = formData.nomStructure.trim();

    const personNameRegex =
      /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;

    const structureNameRegex =
      /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .,'&()_-]*$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const phoneRegex =
      /^\d{8}$/;

    if (formData.type === "individu") {
      if (!nom) {
        newErrors.nom = "Le nom est obligatoire.";
      } else if (nom.length > 12) {
        newErrors.nom =
          "Le nom ne doit pas dépasser 12 caractères.";
      } else if (!personNameRegex.test(nom)) {
        newErrors.nom =
          "Le nom doit contenir uniquement des lettres.";
      }

      if (!prenom) {
        newErrors.prenom = "Le prénom est obligatoire.";
      } else if (prenom.length > 12) {
        newErrors.prenom =
          "Le prénom ne doit pas dépasser 12 caractères.";
      } else if (!personNameRegex.test(prenom)) {
        newErrors.prenom =
          "Le prénom doit contenir uniquement des lettres.";
      }
    }

    if (formData.type === "societe") {
      if (!nomStructure) {
        newErrors.nomStructure =
          "Le nom de la société est obligatoire.";
      } else if (nomStructure.length > 50) {
        newErrors.nomStructure =
          "Le nom de la société ne doit pas dépasser 50 caractères.";
      } else if (!structureNameRegex.test(nomStructure)) {
        newErrors.nomStructure =
          "Le nom de la société contient des caractères invalides.";
      }

      if (!prenom) {
        newErrors.prenom =
          "Le nom du responsable est obligatoire.";
      } else if (prenom.length > 12) {
        newErrors.prenom =
          "Le nom du responsable ne doit pas dépasser 12 caractères.";
      } else if (!personNameRegex.test(prenom)) {
        newErrors.prenom =
          "Le nom du responsable doit contenir uniquement des lettres.";
      }
    }

    if (formData.type === "project") {
      if (!nomStructure) {
        newErrors.nomStructure =
          "Le nom du projet est obligatoire.";
      } else if (nomStructure.length > 50) {
        newErrors.nomStructure =
          "Le nom du projet ne doit pas dépasser 50 caractères.";
      } else if (!structureNameRegex.test(nomStructure)) {
        newErrors.nomStructure =
          "Le nom du projet contient des caractères invalides.";
      }

      if (!prenom) {
        newErrors.prenom =
          "Le nom du responsable est obligatoire.";
      } else if (prenom.length > 12) {
        newErrors.prenom =
          "Le nom du responsable ne doit pas dépasser 12 caractères.";
      } else if (!personNameRegex.test(prenom)) {
        newErrors.prenom =
          "Le nom du responsable doit contenir uniquement des lettres.";
      }
    }

    if (!email) {
      newErrors.email = "L'email est obligatoire.";
    } else if (email.length > 120) {
      newErrors.email =
        "L'email ne doit pas dépasser 120 caractères.";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Veuillez saisir une adresse email valide.";
    }

    if (!telephone) {
      newErrors.telephone =
        "Le numéro de téléphone est obligatoire.";
    } else if (!phoneRegex.test(telephone)) {
      newErrors.telephone =
        "Le numéro doit contenir exactement 8 chiffres.";
    }

    if (!password) {
      newErrors.password =
        "Le mot de passe est obligatoire.";
    } else {
      if (password.length < 8) {
        newErrors.password =
          "Le mot de passe doit contenir au moins 8 caractères.";
      } else if (password.length > 64) {
        newErrors.password =
          "Le mot de passe ne doit pas dépasser 64 caractères.";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password =
          "Le mot de passe doit contenir au moins une majuscule.";
      } else if (!/[a-z]/.test(password)) {
        newErrors.password =
          "Le mot de passe doit contenir au moins une minuscule.";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password =
          "Le mot de passe doit contenir au moins un chiffre.";
      } else if (!/[^A-Za-z0-9]/.test(password)) {
        newErrors.password =
          "Le mot de passe doit contenir au moins un symbole.";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Veuillez confirmer votre mot de passe.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    const nom =
      formData.type === "individu"
        ? formData.nom.trim()
        : formData.nomStructure.trim();

    const prenom = formData.prenom.trim();
    const email = formData.email.trim().toLowerCase();
    const telephone = formData.telephone.trim();

    try {
      const { response, data } = await registerUser({
        nom,
        prenom,
        email,
        telephone,
        password: formData.password,
        type: formData.type
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userNom", nom);
        localStorage.setItem("userPrenom", prenom);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userTelephone", telephone);
        localStorage.setItem("userType", formData.type);

        if (formData.nomStructure.trim()) {
          localStorage.setItem(
            "userStructure",
            formData.nomStructure.trim()
          );
        } else {
          localStorage.removeItem("userStructure");
        }

        setMessage("Compte créé avec succès ✅");

        setTimeout(() => {
          navigate("/dashboard");
        }, 700);

        return;
      }

      if (response.status === 409) {
        setMessage("Cet email existe déjà ❌");
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
    <div className="register-page">
      <Navbar />

      <main>
        <div className="register-card">
          <h1>Créer un compte</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
              >
                <option value="individu">Individu</option>
                <option value="societe">Société</option>
                <option value="project">Projet</option>
              </select>
            </div>

            {formData.type === "individu" && (
              <>
                <div className="form-group">
                  <label>Nom</label>

                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    maxLength="12"
                    placeholder="Entrez votre nom"
                  />

                  {errors.nom && (
                    <small className="field-error">
                      {errors.nom}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Prénom</label>

                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    maxLength="12"
                    placeholder="Entrez votre prénom"
                  />

                  {errors.prenom && (
                    <small className="field-error">
                      {errors.prenom}
                    </small>
                  )}
                </div>
              </>
            )}

            {formData.type === "societe" && (
              <>
                <div className="form-group conditional-field">
                  <label>Nom de la société</label>

                  <input
                    type="text"
                    name="nomStructure"
                    value={formData.nomStructure}
                    onChange={handleChange}
                    maxLength="50"
                    placeholder="Entrez le nom de la société"
                  />

                  {errors.nomStructure && (
                    <small className="field-error">
                      {errors.nomStructure}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Nom du responsable</label>

                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    maxLength="12"
                    placeholder="Entrez le nom du responsable"
                  />

                  {errors.prenom && (
                    <small className="field-error">
                      {errors.prenom}
                    </small>
                  )}
                </div>
              </>
            )}

            {formData.type === "project" && (
              <>
                <div className="form-group conditional-field">
                  <label>Nom du projet</label>

                  <input
                    type="text"
                    name="nomStructure"
                    value={formData.nomStructure}
                    onChange={handleChange}
                    maxLength="50"
                    placeholder="Entrez le nom du projet"
                  />

                  {errors.nomStructure && (
                    <small className="field-error">
                      {errors.nomStructure}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Nom du responsable</label>

                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    maxLength="12"
                    placeholder="Entrez le nom du responsable"
                  />

                  {errors.prenom && (
                    <small className="field-error">
                      {errors.prenom}
                    </small>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength="120"
                placeholder="exemple@gmail.com"
              />

              {errors.email && (
                <small className="field-error">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Téléphone</label>

              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength="8"
                placeholder="8 chiffres"
              />

              {errors.telephone && (
                <small className="field-error">
                  {errors.telephone}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Mot de passe</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                maxLength="64"
                placeholder="Minimum 8 caractères"
              />

              <small>
                8 caractères minimum : une majuscule,
                une minuscule, un chiffre et un symbole.
              </small>

              {errors.password && (
                <small className="field-error">
                  {errors.password}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Confirmer le mot de passe</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="8"
                maxLength="64"
                placeholder="Confirmez votre mot de passe"
              />

              {errors.confirmPassword && (
                <small className="field-error">
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            <button type="submit">
              Créer mon compte
            </button>
          </form>

          {message && (
            <p className="register-message">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Register;