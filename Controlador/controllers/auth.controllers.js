const { response } = require('express');

const { getUserCredentials, userInformation} = require("../models/query_usuarios");

const { generate_JWT }= require('../helpers/generateJWT')
const bcryptjs = require('bcryptjs');

const {validationResult} = require("express-validator");

const login = async (req, res = response) => {
    const { username, password } = req.body;

    const credentials = await getUserCredentials(username);

    if ( !credentials.password ){
        return res.status(400).json({
            "msg":"no match"
        })
    }
    const aux_pass = await bcryptjs.hash(password, credentials.hash);
    if (aux_pass !== credentials.password) return res.status(400).json({
        "msg":"no match"
    })

    // generar JWT

    const userData = await userInformation(username);
    const { actividad } = userData[0];
    console.log(userData);

    if (actividad !== 'ACTIVADO'){
        return res.status(400).json({
            message:"denied",
            status:"Blocked"
        })
    }
    const { id_usuario } = userData;
    const token = await generate_JWT(id_usuario)
    return res.status(202).json({
        message:"accepted",
        userdata:userData,
        token:token
    })

}



module.exports = {
    login
}