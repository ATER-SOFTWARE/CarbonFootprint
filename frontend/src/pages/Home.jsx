import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            🌱 Carbon Footprint
          </div>

          <h1>
            Calculez votre
            <span> empreinte carbone</span>
          </h1>

          <p>
            Mesurez votre impact environnemental,
            comprenez vos émissions et adoptez
            des habitudes plus responsables.
          </p>

          <div className="hero-buttons">
            <Link
              to="/calculator"
              className="start-btn"
            >
              Commencer le calcul
            </Link>

            <Link
              to="/register"
              className="secondary-btn"
            >
              Créer un compte
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-icon">
            🌍
          </div>

          <h2>Un avenir plus vert</h2>

          <p>
            Suivez votre impact carbone et
            améliorez progressivement votre
            empreinte environnementale.
          </p>

          <div className="hero-stats">
            <div>
              <strong>4</strong>
              <span>Indicateurs</span>
            </div>

            <div>
              <strong>1</strong>
              <span>Objectif</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Responsable</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            ⚡
          </div>

          <h3>Électricité</h3>

          <p>
            Suivez votre consommation
            énergétique.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            🚗
          </div>

          <h3>Transport</h3>

          <p>
            Mesurez l’impact de vos déplacements.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            🌿
          </div>

          <h3>Environnement</h3>

          <p>
            Gérez votre environnement simplement.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;