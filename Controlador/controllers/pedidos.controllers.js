const { response } = require('express');
const { Pedidos, UpdateBoleta, Ready} = require("../models/query_pedidos");

const getAllOrders = async (req, res = response) => {
    try{
        const resp = await Pedidos();
        return res.status(200).json({
            msg:resp
        });
    }catch (e) {
        console.log(e)
        return res.status(400).json({
            error:e
        })
    }
}

const updateOrder = async (req, res = response) => {
    try{
        const resp = await UpdateBoleta(req.body);
        return res.status(200).json({
            msg:"success"
        })
    }catch (e) {
        console.log(e)
        return res.status(400).json({
            msg:e
        })
    }
}

const getReady = async (req, res = response) => {
    try{
        const resp = await Ready(req.body);
        return res.status(200).json({
            msg:resp
        })
    }catch (e) {
        console.log(e)
        return res.status(400).json({
            msg:e
        })
    }
}

module.exports = {
    getAllOrders,
    updateOrder,
    getReady
}