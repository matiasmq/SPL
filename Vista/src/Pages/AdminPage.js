import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';

function AdminPage() {
  return (
    <div className='admin-page-container'>
      <div className="admin-page">
        <h2>Panel de Administrador</h2>

        <section>
          <h3>Gestión de Usuarios</h3>
          <Link to="/Users">Ver Usuarios</Link>
        </section>

        <section>
          <h3>Gestión de Categorias</h3>
          <Link to="/AdminCategories">Ir a la Gestión de Categorias</Link>
        </section>

        <section>
          <h3>Gestión de Productos</h3>
          <Link to="/AdminProducts">Ir a la Gestión de Productos</Link>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
