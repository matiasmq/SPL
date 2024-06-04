const { Router } = require('express');
const { getAccount, editAccount, changePassword, removeAccount, accountDeleteState, accountActivateState, accountBloqState} = require("../controllers/cuenta.controllers");
const { check} = require("express-validator");
const {validateValues} = require("../middlewares/validate_values");

const router = Router();

router.get('/', getAccount);
router.put('/update', editAccount); 
router.delete('/delete', removeAccount);
router.put('/deletestate', accountDeleteState);
router.put('/activate', accountActivateState);
router.put('/bloq', accountBloqState);
router.put('/password', [
    check('username').isNumeric().not().isEmpty().isLength({ min: 6, max: 8 }),
    check('email', 'invalid email').isEmail().not().isEmpty(),
    check('password').isLength({ min: 8, max: 20 }).not().isEmpty(),
    validateValues
    ],changePassword)
module.exports = router;
