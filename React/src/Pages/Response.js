import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Response = () => {
    const navigate = useNavigate();

    const handleFailure = useCallback(async (token_ws) => {
        try {
            const response = await fetch('https://entreraices-production.up.railway.app/api/ticket/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token_ws }),
            });

            if (response.ok) {
                console.log('Ticket eliminado correctamente.');
            } else {
                console.error('Error al eliminar el ticket:', response.status);
            }
        } catch (error) {
            console.error('Error al eliminar el ticket:', error);
        }
    }, []);

    const verificarTransaccion = useCallback(async () => {
        const token_ws = new URLSearchParams(window.location.search).get('token_ws');
        if (!token_ws) {
            console.error('Token no proporcionado');
            handleFailure('No token provided');
            return;
        }

        try {
            const response = await fetch(`https://entreraices-production.up.railway.app/api/webpay/verify/${token_ws}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('Respuesta de la verificación de la transacción:', data);

            if (data.status === 'success') {
                console.log('Transacción exitosa. Limpiando el carrito.');
                localStorage.removeItem('carrito');
                localStorage.removeItem('carritoTotal');
                navigate('/success');
            } else {
                console.log('Transacción no exitosa. Eliminando el ticket.');
                handleFailure(token_ws);
                navigate('/failure');
            }
        } catch (error) {
            console.error('Error al verificar la transacción:', error);
            handleFailure(token_ws);
            navigate('/failure');
        }
    }, [navigate, handleFailure]);

    useEffect(() => {
        verificarTransaccion();
    }, [verificarTransaccion]);

    return (
        <div>
            <h1>Verificando la transacción...</h1>
        </div>
    );
};

export default Response;
