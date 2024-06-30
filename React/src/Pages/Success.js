import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/succes.css';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id_usuario');
        const ticketId = localStorage.getItem('ticket_id');
        
        const updateDatabase = async () => {
            if (userId && ticketId) {
                const requestBody = {
                    user_id: userId,
                    ticket_id: ticketId
                };

                try {
                    const response = await fetch('https://entreraices-production.up.railway.app/api/ticket/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });

                    if (response.ok) {
                        console.log('Carrito actualizado correctamente en la base de datos.');
                    } else {
                        console.error('Error al actualizar el carrito:', response.status);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            localStorage.removeItem('carrito');
            localStorage.removeItem('carritoTotal');
            localStorage.removeItem('token_ws');
            localStorage.removeItem('ticket_id');
        };

        updateDatabase();
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="fondo-compra-container">
            <div className="contenedor-compra">
                <h2>¡Pago Exitoso!</h2>
                <p>Gracias por tu compra. Tu transacción ha sido completada con éxito.</p>
                <button onClick={handleBackToHome} className="boton-home">
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default Success;
