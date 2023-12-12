const { Router } = require('express');
const {addProductCart, getCart, getProductCart, decreaseProductCart, deleteProductCart, removeClientCart, suppressClientCart} = require("../controllers/cart.controllers");

const router = Router();

router.post('/get', getCart);
router.post('/add', addProductCart);
router.post('/find', getProductCart);
router.delete('/delete', decreaseProductCart);
router.delete('/deletep', deleteProductCart);
router.post('/remove', removeClientCart);
router.post('/suppress', suppressClientCart)
module.exports = router;