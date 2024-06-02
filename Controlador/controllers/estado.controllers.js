const {
    insertStatus,
    updateStatus,
    deleteStatus,
    selectStatuses
} = require('../models/query_estado');

const createStatus = async (req, res) => {
    try {
        const result = await insertStatus(req.body);
        if (result) {
            res.status(201).json({
                success: true,
                message: "Estado creado exitosamente",
                data: result
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al crear el estado"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

const modifyStatus = async (req, res) => {
    try {
        const result = await updateStatus(req);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Estado actualizado exitosamente"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al actualizar el estado"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

const removeStatus = async (req, res) => {
    try {
        const { id_estado } = req.body;
        const result = await deleteStatus(id_estado);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Estado eliminado exitosamente"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al eliminar el estado"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

const getStatuses = async (req, res) => {
    try {
        const addresses = await selectStatuses();
        if (addresses) {
            res.status(200).json({
                success: true,
                data: addresses
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No se encontraron estados"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

module.exports = {
    createStatus,
    modifyStatus,
    removeStatus,
    getStatuses
}