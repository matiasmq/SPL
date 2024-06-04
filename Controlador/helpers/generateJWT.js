const jwt = require('jsonwebtoken')

const generate_JWT = (uuid = '') => {


    return new Promise((resolve, reject) => {
        const payload = { uuid} ;
        jwt.sign(payload, process.env.SECRETKEY, {expiresIn:'1h'}, (err, token) => {
            if (err){
                console.log(err)
                reject('cant generate token!')
            }else{
                resolve(token)
            }
        })
    } )

}


module.exports = { generate_JWT}

