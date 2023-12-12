const jwt = require('jsonwebtoken')
const {response} = require("express");

const validateJWT = (req, res = response) => {
    const token = req.header("x-token");
    if (!token)  {
        return res.status(401).json({
            msg:'token no valid'
        })
    }
    try{
        jwt.verify(token, process.env.SECRETKEY)
        console.log(token);
        next();
    }catch (e) {
        console.log(e)
        return res.status(401).json({
            msg:'token no valido'
        })
    }

}
module.exports = {
    validateJWT
}