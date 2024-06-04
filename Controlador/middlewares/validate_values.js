const {validationResult} = require("express-validator");
const {response} = require("express");

const validateValues = (req, res = response, next) => {
    const errors = validationResult(req); // extract possibles errors from request
    if ( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateValues
}