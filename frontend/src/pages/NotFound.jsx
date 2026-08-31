import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <Navbar />

      <main>
        <h1>404</h1>

        <h2>Page introuvable</h2>

        <p>
          La page que vous cherchez n'existe pas.
        </p>

        <Link to="/">
          Retour à l'accueil
        </Link>
      </main>
    </div>
  );
}

export default NotFound;