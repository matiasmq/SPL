import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PedidoUser.css';

function UserOrderStatus() {
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10;
  const pollInterval = 30000;

  useEffect(() => {
    const userRut = localStorage.getItem('rut');
    console.log('RUT obtenido del almacenamiento local:', userRut);

    const fetchUserOrders = async () => {
      try {
        const response = await fetch('https://entreraices-production.up.railway.app/api/pedidos/all');
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }

        const data = await response.json();
        console.log('Todos los pedidos recibidos:', data);

        if (data && Array.isArray(data.msg)) {
          const filteredOrders = data.msg.filter(order => order.rut === userRut);
          const ordersWithDate = filteredOrders.map(order => {
            const fechaCompleta = new Date(order.fecha);
            fechaCompleta.setHours(fechaCompleta.getHours());
            const dia = fechaCompleta.getDate().toString().padStart(2, '0');
            const mes = (fechaCompleta.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaCompleta.getFullYear();
            const hora = fechaCompleta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return {
              ...order,
              fechaYHora: `${dia}-${mes}-${año} ${hora}`
            };
          });
          setUserOrders(ordersWithDate);
        } else {
          console.error('La respuesta no contiene un arreglo de pedidos:', data);
        }
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchUserOrders();
    const interval = setInterval(fetchUserOrders, pollInterval);
    return () => clearInterval(interval);
  }, []);

  const getOrderStatusClass = (estado) => {
    return estado === 'Listo' ? 'pedido-listo' : 'pedido-pendiente';
  };

  const handlePedidosListos = () => {
    navigate('/userlistos');
  };


const paginate = (pageNumber) => setCurrentPage(pageNumber);

const pageCount = Math.ceil(userOrders.length / ordersPerPage);

const currentOrders = userOrders.slice(
  currentPage * ordersPerPage,
  (currentPage + 1) * ordersPerPage
);

const renderPageNumbers = pageCount > 1 && Array.from({ length: pageCount }).map((_, index) => (
  <button key={index} onClick={() => paginate(index)} disabled={currentPage === index}>
    {index + 1}
  </button>
));

return (
  <div className='fondo-pedido-user'>
    <h2>Mi Pedido</h2>
    <button className='user-listos' onClick={handlePedidosListos}>Pedidos Listos</button>
    <table>
      <thead>
        <tr>
          <th>ID Pedido</th>
          <th>Fecha emision</th>
          <th>Nombre</th>
          <th>Rut</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {currentOrders.reverse().map(order => (
          <tr key={order.id_detalle_boleta} className={getOrderStatusClass(order.estado)}>
            <td>{order.id_detalle_boleta}</td>
            <td>{order.fechaYHora}</td>
            <td>{order.nombre_usuario}</td>
            <td>{order.rut}</td>
            <td>{order.nombre_producto}</td>
            <td>{order.cantidad}</td>
            <td>{order.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='pagination'>
      {renderPageNumbers}
    </div>
  </div>
);
}

export default UserOrderStatus;