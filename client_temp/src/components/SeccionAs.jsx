import { FiDroplet, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./SeccionAs.css";

const SeccionAs = () => {
  return (
    
    <div className="associate-section">
      
      <h2 className="associate-title">ASOCIATE</h2>
      <div className="associate-container">
        <div className="associate-card">
          <FiDroplet className="associate-icon" />
          <h3 className="associate-title-card">¡QUIERO ACEITE!</h3>
          <p className="associate-text">🌱 Tu bienestar comienza con una gota - Descubrí el camino</p>
          <Link to="/shop" className="associate-button">
            Tienda
          </Link>
        </div>

        <div className="associate-card">
          <FiPackage className="associate-icon" />
          <h3 className="associate-title-card">¡QUIERO FLORES!</h3>
          <p className="associate-text">
          🌿 Tus flores legales, a un clic de distancia - ¿List@ para empezar?
          </p>
          <button className="associate-button">Asociarme</button>
        </div>
      </div>
    </div>
  );
};

export default SeccionAs;