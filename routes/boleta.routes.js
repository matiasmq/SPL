const { Router } = require('express');
const {getTicket} =  require("../controllers/boleta.controllers");

const router = Router();

router.post('/get', getTicket);



module.exports = router;