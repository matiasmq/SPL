import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id_usuario');
        const ticketId = localStorage.getItem('ticket_id');
        
        const clearDatabase = async () => {
            if (userId) {
                const requestBody = {
                    client_id: userId,
                };

                try {
                    // Eliminar el carrito
                    await fetch('https://entreraices-production.up.railway.app/api/cart/remove', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });

                    if (ticketId) {
                        // Eliminar la boleta
                        await fetch('https://entreraices-production.up.railway.app/api/ticket/delete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ticket_id: ticketId }),
                        });
                        localStorage.removeItem('ticket_id');
                    }

                    console.log('Carrito y boleta eliminados correctamente.');
                } catch (error) {
                    console.error('Error al limpiar el carrito y la boleta:', error);
                }
            }

            localStorage.removeItem('carrito');
            localStorage.removeItem('carritoTotal');
            localStorage.removeItem('token_ws');
        };

        clearDatabase();
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="failure-container">
            <h1>Transacción Fallida</h1>
            <p>Lamentablemente, tu transacción no pudo completarse. No se realizó ningún cargo.</p>
            <button onClick={handleBackToHome} className="boton-home">
                Volver al Inicio
            </button>
        </div>
    );
};

export default Failure;
