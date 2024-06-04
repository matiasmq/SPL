const { Router } = require('express');
const {
    createAddress,
    modifyAddress,
    removeAddress,
    getAddressList, getUserAddress
} = require("../controllers/direcciones.controllers");
const {getUser} = require("../controllers/usuarios.controllers");

const router = Router();


router.post('/create', createAddress); 
router.get('/', getAddressList); 
router.get('/user', getUserAddress)
router.put('/update', modifyAddress); 
router.delete('/delete', removeAddress); 

module.exports = router;

