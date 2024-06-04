import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import '../styles/Header.css';

function Header() {
  const { user } = useUser();

  const renderAdminButton = () => {
    if (user && user.rol === 'ADMIN') {
      return (
        <>
          <Link to="/Adminpage" className="header-link">
            Panel de Administración
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <div className="header-container">
      <div className="header-logo">
        <h1>RESTOBAR ENTRE PUEBLOS</h1>
      </div>
      <div className="header-nav">
        {!user && <Link to="/login" className="header-link">Login</Link>}
        <Link to="/sobre-nosotros" className="header-link">Sobre Nosotros</Link>
        {renderAdminButton()}
      </div>
    </div>
  );
}

export default Header;
