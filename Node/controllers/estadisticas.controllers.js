const { response } = require('express');

const { getproduct, customers, shistory } = require('../models/query_estadisticas');



const getproductT = async (req, res = jsonDatagetproduct) => {
    try {
        const jsonDatagetproduct= await getproduct(req.body);
        if (jsonDatagetproduct) {
            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: jsonDatagetproduct
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

const customersP = async (req, res = jsonDatacustomers) => {
    try {
        const jsonDatacustomers= await customers(req.body);
        if (jsonDatacustomers) {
            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: jsonDatacustomers
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



const shistoryv = async (req, res = jsonDataprueba2) => {
    try {
        const jsonDatahistorial= await shistory(req.body);
        if (jsonDatahistorial) {
            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: jsonDatahistorial
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
    getproductT,
    customersP,
    shistoryv

}