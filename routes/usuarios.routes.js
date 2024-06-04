const { Router } = require('express');
const {
    registerUser,
    getUser,
    editUser,
    removeUser
} = require("../controllers/usuarios.controllers");
const { check } = require('express-validator');
const {validateValues} = require("../middlewares/validate_values");

const router = Router();

router.post('/register', [
    check('rut').isNumeric().not().isEmpty().isLength({ min: 6, max: 8 }),
    check('name').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('lastname_1').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('lastname_2').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('email', 'invalid email').isEmail().not().isEmpty(),
    check('phone_number', 'invalid phone_number')
        .isNumeric()
        .not().isEmpty(),
    validateValues
], registerUser);

router.get('/', getUser);


router.put('/update', [
    check('rut').isNumeric().not().isEmpty().isLength({ min: 6, max: 8 }),
    check('name').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('lastname_1').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('lastname_2').not().isEmpty().isLength({ min: 4, max: 20 }),
    check('email', 'invalid email').isEmail().not().isEmpty(),
    check('phone_number', 'invalid phone_number').isNumeric().not().isEmpty(),
    check('password').isLength({ min: 8, max: 20 }),
], editUser);

router.delete('/delete', removeUser);

module.exports = router;
