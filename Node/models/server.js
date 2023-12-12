const express = require('express');
const cors = require('cors');
const {db} = require("./connectionNoSql");


class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        // ROUTES
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors())

        //Parse
        this.app.use(express.json());
    }
    routes(){
        this.app.use('/api/check', require('../routes/check.routes'));
        this.app.use('/api/products', require('../routes/productos.routes'));
        this.app.use('/api/categories', require('../routes/categories.routes'));
        this.app.use('/api/user', require('../routes/usuarios.routes'));
        this.app.use('/api/auth', require('../routes/auth.routes'));
        this.app.use('/api/address', require('../routes/direcciones.routes'));
        this.app.use('/api/cart', require('../routes/carrito.routes'));
        this.app.use('/api/status', require('../routes/estado.routes'));
        this.app.use('/api/account', require('../routes/cuenta.routes'));
        this.app.use('/api/ticket', require('../routes/boleta.routes'));
        this.app.use('/api/rol', require('../routes/rol.routes'));
        this.app.use('/api/stats', require('../routes/estadisticas.routes'));
        this.app.use('/api/pedidos', require('../routes/pedidos.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Working on :', this.port);
            db();
        })
    }
}
module.exports = Server;

