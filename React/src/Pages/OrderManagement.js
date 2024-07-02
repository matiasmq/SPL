import React, { useState, useEffect } from 'react';
import '../styles/PedidosCajera.css';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const statusOptions = [
    { id: '933956b8-8f2a-4a95-9f5f-47ec4dd4b511', label: 'Pendiente' },
    { id: 'a05832e9-dafb-4dde-9367-b8c199c3ffca', label: 'En Camino' },
    { id: '9fbcbb06-6d7e-4b8e-8b36-ccc62efa7907', label: 'Listo' },
    { id: '8f007625-23d5-46b1-b648-e02065806bf7', label: 'Entregado' }
  ];

  useEffect(() => {
    fetchOrders();

    const intervalId = setInterval(() => {
      fetchOrders();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://entreraices-production.up.railway.app/api/pedidos/get');
      if (!response.ok) {
        throw new Error('Error al obtener los pedidos');
      }
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        console.error('La respuesta no contiene un arreglo de pedidos:', data);
      }
    } catch (error) {
      console.error('Error al cargar los pedidos:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const requestBody = {
      order_id: orderId,
      n_order_id: newStatus
    };
    console.log('Request body:', requestBody); // Debug log

    try {
      console.log('Updating order:', orderId, 'to status:', newStatus); // Debug log
      const response = await fetch(`https://entreraices-production.up.railway.app/api/pedidos/updateorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error('Error al actualizar el pedido');
      }

      const result = await response.json();
      console.log('Update result:', result); // Debug log

      if (result.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id_pedido === orderId
              ? { ...order, estado: statusOptions.find(option => option.id === newStatus).label }
              : order
          )
        );
      } else {
        console.error('Error en la actualización del pedido:', result.message);
      }
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  return (
    <div className='fondo-pedido-cajera'>
      <h2>Gestión de Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha Emisión</th>
            <th>Nombre Usuario</th>
            <th>RUT</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {[...orders].reverse().map(order => (
            <tr key={order.id_pedido}>
              <td>{order.id_pedido}</td>
              <td>{new Date(order.fecha_emision).toLocaleDateString()}</td>
              <td>{order.nombre_usuario}</td>
              <td>{order.rut}</td>
              <td>{order.nombre_producto}</td>
              <td>{order.cantidad}</td>
              <td>{order.estado}</td>
              <td>
                <select
                  value={order.estado}
                  onChange={(e) => handleUpdateOrderStatus(order.id_pedido, e.target.value)}
                  className="order-status-select"
                >
                  {statusOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
