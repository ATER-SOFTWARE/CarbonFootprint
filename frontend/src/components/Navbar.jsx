import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNom");
    localStorage.removeItem("userPrenom");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userTelephone");
    localStorage.removeItem("userType");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          Calculateur de carbone
        </Link>
      </div>

      <div className="left-menu">
        <Link to="/settings">Paramètres</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="dashboard">
        <Link to="/dashboard">Tableau de bord</Link>
      </div>

      <div className="right-menu">
        {!isLoggedIn && (
          <>
            <Link to="/login">Connexion</Link>

            <Link to="/register">
              Créer compte
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile">
              Mon profil
            </Link>

            <button
              type="button"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;