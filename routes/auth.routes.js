const { Router } = require('express')
const { login } = require("../controllers/auth.controllers");
const { check } = require('express-validator');
const {validateValues} = require("../middlewares/validate_values");

const router = Router();

router.post('/login', [
    check('username', 'missing username').not().isEmpty(),
    check('username', 'invalid rut').isNumeric().isLength({ min:6, max:8 }),
    check('password', 'missing password').isLength({ min: 8, max:20 }).not().isEmpty(),
    validateValues
], login);

module.exports = router;
