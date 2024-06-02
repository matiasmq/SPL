const { Router } = require('express');
const {
    getCategories,
    createNewCategory,
    removeCategory,
    updatedCategory,
} = require("../controllers/categoria.controllers");

const router = Router();

router.get('/', getCategories); 


router.post('/create', createNewCategory); 
router.put('/update', updatedCategory); 
router.delete('/delete', removeCategory); 

module.exports = router;

