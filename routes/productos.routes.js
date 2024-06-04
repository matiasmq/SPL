const { Router } = require('express')
const {createProduct, modifyProduct, removeProduct, getProductList} = require("../controllers/productos.controllers");


const router = Router();


router.post('/create', createProduct) 
router.get('/', getProductList) 

router.put('/update', modifyProduct) 
router.delete('/delete', removeProduct) 

module.exports = router;
