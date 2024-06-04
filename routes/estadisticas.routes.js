const { Router } = require('express');
const { getproductT,customersP, shistoryv} =  require("../controllers/estadisticas.controllers");

const router = Router();

router.post('/getproduct', getproductT);
router.post('/customers', customersP);
router.post('/historial', shistoryv);



module.exports = router;