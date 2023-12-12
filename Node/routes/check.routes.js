const { Router } = require('express');
const {
    isRutAvailable,
    isPhoneNumberAvailable,
    isEmailAvailable,
    isCategoryAvailable
        } = require("../controllers/check.controllers");

const { check } = require("express-validator");

const router = Router();


router.post('/rut', [
    check('rut', 'invalid rut').isNumeric().not().isEmpty()
], isRutAvailable)


router.post('/email',
    [ check('email').isEmail().not().isEmpty() ] ,
    isEmailAvailable)
router.post('/phone_number', isPhoneNumberAvailable)



router.post('/category', isCategoryAvailable)

module.exports = router;