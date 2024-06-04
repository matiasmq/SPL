const {response} = require("express");

const {
    insertAddress,
    updateAddress,
    deleteAddress,
    selectAddresses, getAddress
} = require('../models/query_direcciones');

const createAddress = async (req, res) => {
    try {
        const result = await insertAddress(req.body);
        if (result) {
            res.status(201).json({
                success: true,
                message: "Dirección creada exitosamente",
                data: result
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al crear la dirección"
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

const modifyAddress = async (req, res) => {
    try {
        const result = await updateAddress(req);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Dirección actualizada exitosamente"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al actualizar la dirección"
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

const removeAddress = async (req, res) => {
    try {
        const { address_id } = req.body;
        const result = await deleteAddress(address_id);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Dirección eliminada exitosamente"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al eliminar la dirección"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

const getAddressList = async (req, res) => {
    try {
        const addresses = await selectAddresses();
        if (addresses) {
            res.status(200).json({
                success: true,
                data: addresses
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No se encontraron direcciones"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

const getUserAddress = async (req, res = response ) => {
    try{
        const resp = getAddress(req.body.id_usuario);
        return res.status(200).json(resp)
    }catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}
module.exports = {
    createAddress,
    modifyAddress,
    removeAddress,
    getAddressList,
    getUserAddress
}
