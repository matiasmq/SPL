import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Carrito.css';

const Pago = () => {
    const navigate = useNavigate();
    const [direccionEncontrada, setDireccionEncontrada] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedDireccion, setEditedDireccion] = useState({ ...direccionEncontrada });

    useEffect(() => {
        const userId = localStorage.getItem('id_usuario');

        if (userId) {
            fetch('https://entreraices-production.up.railway.app/api/user')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Error al obtener los datos relacionados con id_direccion');
                })
                .then(data => {
                    const direccion = data.find(item => item.id_usuario === userId);

                    if (direccion) {
                        const idDireccion = direccion.id_direccion;

                        fetch(`https://entreraices-production.up.railway.app/api/address`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json();
                                }
                                throw new Error('Error al obtener los datos de la dirección');
                            })
                            .then(data => {
                                const direccionEncontrada = data.data.find(
                                    item => item.id_direccion === idDireccion
                                );

                                if (direccionEncontrada) {
                                    setDireccionEncontrada(direccionEncontrada);
                                } else {
                                    console.log('No se encontraron detalles para esta dirección');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const handleEdit = () => {
        setEditedDireccion({ ...direccionEncontrada });
        setEditMode(true);
    };

    const handleSave = async () => {
        let idDireccion = editedDireccion.id_direccion;

        if (!idDireccion && direccionEncontrada) {
            idDireccion = direccionEncontrada.id_direccion;
        }

        if (!idDireccion) {
            console.error('No se encontró el ID de dirección.');
            return;
        }

        const { numero_casa, calle, poblacion, descripcion, sector } = editedDireccion;

        const requestBody = {
            address_id: idDireccion,
            number_house: numero_casa,
            street: calle,
            town: poblacion,
            description: descripcion,
            sector: sector
        };

        try {
            const response = await fetch('https://entreraices-production.up.railway.app/api/address/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setDireccionEncontrada({ ...editedDireccion });
                setEditMode(false);
            } else {
                console.error('Error al actualizar la dirección:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
    };

    const handleChange = (field, value) => {
        setEditedDireccion({ ...editedDireccion, [field]: value });
    };

    const iniciarTransaccion = async () => {
        const userId = localStorage.getItem('id_usuario');
        const carritoTotal = localStorage.getItem('carritoTotal');

        // Primero, actualiza el carrito en la base de datos
        const requestBodyTicket = {
            user_id: userId,
        };

        try {
            const responseTicket = await fetch('https://entreraices-production.up.railway.app/api/ticket/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBodyTicket),
            });

            if (!responseTicket.ok) {
                console.error('Error al enviar la solicitud (Ticket):', responseTicket.status);
                return;
            }
        } catch (error) {
            console.error('Error:', error);
            return;
        }

        // Luego, inicia la transacción con Webpay Plus
        const buyOrder = 'order' + new Date().getTime(); // Generar un número de orden único
        const sessionId = 'session' + new Date().getTime(); // Generar un ID de sesión único
        const amount = carritoTotal ? parseFloat(carritoTotal) : 0; // Monto de la transacción
        const returnUrl = 'http://localhost:3000/success'; // URL a la que Webpay redirige después del pago

        const requestBody = {
            buyOrder,
            sessionId,
            amount,
            returnUrl,
        };

        try {
            const response = await fetch('https://entreraices-production.up.railway.app/api/webpay/init', 
                { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                // Guardar el token en localStorage para verificar después del pago
                localStorage.setItem('token_ws', data.token);
                // Limpiar el carrito antes de redirigir
                localStorage.removeItem('carrito');
                localStorage.removeItem('carritoTotal');
                window.location.href = `${data.url}?token_ws=${data.token}`;
            } else {
                console.error('Error al iniciar la transacción:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const verificarTransaccion = useCallback(async () => {
        const token_ws = localStorage.getItem('token_ws');
        if (!token_ws) return;

        try {
            const response = await fetch(`https://entreraices-production.up.railway.app/api/webpay/verify/${token_ws}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    // Limpiar el carrito
                    localStorage.removeItem('carrito');
                    localStorage.removeItem('carritoTotal');
                    navigate('/success');
                } else {
                    console.error('Error en la transacción:', data);
                }
            } else {
                console.error('Error al verificar la transacción:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [navigate]);

    useEffect(() => {
        verificarTransaccion();
    }, [verificarTransaccion]);

    const handleCancelarPedido = async () => {
        const userId = localStorage.getItem('id_usuario');

        if (userId) {
            const requestBody = {
                client_id: userId,
            };

            try {
                const response = await fetch('https://entreraices-production.up.railway.app/api/cart/remove', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    console.log('Carrito vaciado correctamente.', requestBody);
                } else {
                    console.error('Error al vaciar el carrito:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        navigate('/carrito');
    };

    return (
        <div className="fondo-pago-container">
            <div className="pago">
                <center>*Por el momento, solo aceptamos pagos con Webpay Plus.</center>
                {direccionEncontrada && (
                    <>
                        <div className="seccion-direccion">
                            <h3>Detalles de dirección</h3>
                            {editMode ? (
                                <>
                                    <p><strong>Calle:</strong>
                                    <input
                                        type="text"
                                        value={editedDireccion.calle}
                                        onChange={(e) => handleChange('calle', e.target.value)}
                                    /></p>
                                    <p><strong>Numero Casa:</strong>
                                    <input
                                        type="text"
                                        value={editedDireccion.numero_casa}
                                        onChange={(e) => handleChange('numero_casa', e.target.value)}
                                    /></p>
                                    <p><strong>Poblacion:</strong>
                                    <input
                                        type="text"
                                        value={editedDireccion.poblacion}
                                        onChange={(e) => handleChange('poblacion', e.target.value)}
                                    /></p>
                                    <p><strong>Descripcion:</strong>
                                    <input
                                        type="text"
                                        value={editedDireccion.descripcion}
                                        onChange={(e) => handleChange('descripcion', e.target.value)}
                                    /></p>
                                    <p><strong>Sector:</strong>
                                    <input
                                        type="text"
                                        value={editedDireccion.sector}
                                        onChange={(e) => handleChange('sector', e.target.value)}
                                    /></p>
                                    <div className='direction-button'>
                                        <button onClick={handleSave}>Guardar</button>
                                        <button onClick={handleCancelEdit}>Cancelar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>Calle: {direccionEncontrada.calle}</p>
                                    <p>Numero casa: {direccionEncontrada.numero_casa}</p>
                                    <p>Poblacion: {direccionEncontrada.poblacion}</p>
                                    <p>Descripcion: {direccionEncontrada.descripcion}</p>
                                    <p>Sector: {direccionEncontrada.sector}</p>
                                    <button onClick={handleEdit}>¿Desea modificar su dirección?</button>
                                </>
                            )}
                        </div>
                        <div className="seccion-pago">
                            <h3>Detalles de Pago</h3>
                            <div>
                                <button onClick={iniciarTransaccion} className="boton-pago">
                                    Confirmar Pago
                                </button>
                                <button onClick={handleCancelarPedido} className="boton-cancelar">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Pago;
