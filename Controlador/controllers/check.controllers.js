const { response } = require('express')
const { checkRut,
    checkPhoneNumber,
    checkEmail  } = require("../models/query_usuarios");
const { checkCategory } = require("../models/query_categories");


const checkAvailability = async (res, checkFunction) => {
    try {
        const response = await checkFunction;
        return res.status(response ? 202 : 406).json({
            "exists": response || false
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            "msj": "data not found"
        });
    }
};


const isRutAvailable = async (req, res = response) => {
    return checkAvailability(res, checkRut(req.body.rut))

}
const isPhoneNumberAvailable = async (req, res) => {
    return checkAvailability(res, checkPhoneNumber(req.body.phone_number));
};

const isEmailAvailable = async (req, res) => {
    return checkAvailability(res, checkEmail(req.body.email));
};

const isCategoryAvailable = async (req, res = response) => {
    const { category_name } = req.body;
    return checkAvailability(res, checkCategory(category_name))
}
module.exports = {
    isRutAvailable,
    isPhoneNumberAvailable,
    isEmailAvailable,
    isCategoryAvailable
}