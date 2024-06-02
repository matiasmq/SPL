const { response } = require('express')
const Cart  = require('../models/cart')
const { isCart, deleteClientCart, cancellClientCart } = require('../models/query_carrito')

const addProductCart = async (req, res = response) => {
    const { client_id, product_id, price, message } = req.body;
    const quantity = 1;
    const isProduct = await Cart.findOne({product_id: product_id})
    if (isProduct){
        const updatedCart = await Cart.updateOne({product_id: product_id},{$set:{quantity: isProduct.quantity + 1}})
        console.log('Updated')
        return res.status(201).json({
            message:"updated",
            data: updatedCart
        })
    }else{
        const newCart = new Cart({client_id, product_id, quantity, price, message});
        await newCart.save();
        console.log('Product Added to cart', newCart);
        return res.status(201).json({
            message:"added",
            data: newCart
        })
    }

}


const getCart = async (req, res = response) => {
    const jsonData = req.body;
    try {
        const result = await isCart(jsonData);

        if (result !== false) {
            return res.status(200).json({
                info: result
            });
        } else {
            return res.status(404).json({
                msg: "Cart not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};


const decreaseProductCart = async (req, res = response) => {
    const { client_id, product_id } = req.body;
    const isProduct = await Cart.findOne({product_id: product_id, client_id: client_id})
    if (isProduct){
        if (isProduct.quantity === 1){
            const delProduct = await Cart.deleteOne({client_id: client_id, product_id: product_id})
            console.log(delProduct);
            if (delProduct){
                console.log('Deleted')
            }
            return res.status(201).json({
                message:"deleted",
                data: delProduct
            })
        }else{
            const updatedCart = await Cart.updateOne({product_id: product_id, client_id: client_id},{$set:{quantity: isProduct.quantity - 1}})
            console.log('Updated - 1')
            return res.status(201).json({
                message:"decreased",
                data: updatedCart
            })
        }
    }else{
        return res.status(201).json({
            msg:"not found"
        })
    }
}

const getProductCart = async (req, res = response) => {
    const { client_id } = req.body;
    const cartFound = await Cart.find({client_id:client_id})
    if (cartFound !== 0){
        return res.status(200).json({
            info:cartFound
        })
    } else {
        return res.status(404).json({
            msg:"cart not found"
        })
    }
}

const deleteProductCart = async (req, res = response) => {
    const { client_id , product_id } = req.body;
    const cartFound = await Cart.find({client_id:client_id, product_id: product_id})
    console.log(cartFound)
    if (cartFound){
        const delCart = await Cart.deleteOne({client_id: client_id, product_id: product_id})
        return res.status(200).json({
            msg:"deleted",
            info:delCart
        })
    }else{
        return res.status(404).json({
            msg:"cart not found"
        })
    }
}

const removeClientCart = async (req, res = killCart) => {
    try {
        const { client_id } = req.body;
        const killCart = await cancellClientCart(client_id);
        if (killCart) {
            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: killCart
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el estado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

const suppressClientCart = async (req, res = killcart) => {
    try {
        const { user_id } = req.body;
        console.log('dato:', user_id);
        const killCart = await deleteClientCart(user_id);
        if (killCart) {
            return res.status(201).json({
                success: true,
                message: 'Estado creado exitosamente',
                data: killCart
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Error al crear el estado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getCart,
    addProductCart,
    getProductCart,
    decreaseProductCart,
    deleteProductCart,
    removeClientCart,
    suppressClientCart
}