
const { response } = require('express')

const {insertProduct, updateProduct, deleteProduct, selectProducts} = require("../models/query_productos");


const createProduct = async (req, res= response ) => {

    const resp = await insertProduct(req.body, req);

    if (resp){
        return res.status(200).json({
            "uuid_product":resp
        })
    }
    return res.status(400).json({
        "msg":"product not stored"
    })

}

const modifyProduct = async (req, res = response) => {
    const resp = await updateProduct(req);

    if (resp) return res.status(200).json({msg:resp})
    return  res.status(400).json({msg:"nein"})
}

const removeProduct = async (req, res = response) => {
    const { product_id } = req.body;
    const resp = await deleteProduct(product_id);
    if(resp) return res.status(200).json({msg:"yes"});
    return res.status(400).json({msg:"no"})
}


const getProductList = async (req, res = response) => {
    const response = await selectProducts();
    if (response) return res.status(200).json(response)
    return res.status(400).json({error:true})

}

module.exports = {
    createProduct,
    modifyProduct,
    removeProduct,
    getProductList
}