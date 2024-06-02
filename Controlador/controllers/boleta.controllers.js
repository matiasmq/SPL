const { response } = require('express');

const { isTicket } = require('../models/query_boleta');



const getTicket = async (req, res = jsonDataTicket) => {
    try {
        console.log('Entrando en la función getTicket');

        const jsonDataTicket = await isTicket(req.body);
        console.log('Resultado de isTicket:', jsonDataTicket);

        if (jsonDataTicket) {
            console.log('Creando estado exitosamente');

            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: jsonDataTicket
            });
        } else {
            console.log('Error al crear el estado');

            return res.status(400).json({
                success: false,
                message: 'Error al crear el estado'
            });
        }
    } catch (error) {
        console.error('Error interno del servidor:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};


module.exports = {
    getTicket

}