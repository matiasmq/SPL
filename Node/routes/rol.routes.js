const { Router } = require('express');
const {
    getRoles,
    createRol,
    removeRol,
    modifyRol,
} = require("../controllers/rol.controllers");

const router = Router();

router.get('/', getRoles); 

router.post('/create', createRol); 
router.put('/update', modifyRol); 
router.delete('/delete', removeRol); 

module.exports = router;

