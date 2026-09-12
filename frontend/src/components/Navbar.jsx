```jsx
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            Calculateur de carbone
          </Link>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>

          <div className="left-menu">
            <Link to="/settings" onClick={closeMenu}>
              Paramètres
            </Link>

            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </div>

          <div className="dashboard">
            <Link to="/dashboard" onClick={closeMenu}>
              Tableau de bord
            </Link>
          </div>

          <div className="right-menu">
            {!isLoggedIn && (
              <>
                <Link to="/login" onClick={closeMenu}>
                  Connexion
                </Link>

                <Link to="/register" onClick={closeMenu}>
                  Créer compte
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="/profile" onClick={closeMenu}>
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

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```
