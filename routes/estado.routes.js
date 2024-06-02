const { Router } = require('express');
const {
    createStatus ,
    modifyStatus,
    removeStatus,
    getStatuses } = require("../controllers/estado.controllers");

const router = Router();

router.post('/create', createStatus); 
router.get('/', getStatuses); 
router.put('/update', modifyStatus); 
router.delete('/delete', removeStatus); 

module.exports = router;