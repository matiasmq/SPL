const { Router } = require('express');
const {getAllOrders, updateOrder, getReady} = require("../controllers/pedidos.controllers");

const router = Router();


router.put('/update', updateOrder)
router.get('/all', getAllOrders);  // all
router.post('/ready', getReady)

module.exports = router;