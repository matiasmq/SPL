const { Router } = require('express');
const { iniciarTransaccion } = require('../controllers/webpay.controller');

const router = Router();

router.post('/init', iniciarTransaccion);

module.exports = router;
 //a