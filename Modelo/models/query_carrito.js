const { db, pool } = require('./database');

async function isCart(jsonData) {
    try {
        console.log(jsonData);
        const data = jsonData.data;
        for (const detalle of data) {
            const { 
                client_id, 
                message, 
                price, 
                product_id, 
                quantity 
            } = detalle;
            await db.one('SELECT ingresar_carrito($1, $2, $3, $4, $5)', [
                client_id,
                message,
                price,
                product_id,
                quantity
            ]);
            
            console.log(`Carrito ingresado correctamente para el producto con ID: ${product_id}`);
        }
    } catch (e) {
        console.log(e);
    }
}

async function cancellClientCart(user_id) {
    try {
        const response = await db.one('SELECT descartar_carrito($1)', [user_id]);
        if (response) return true;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deleteClientCart(user_id) {
    console.log(user_id)
    try {
        const response = await db.one('SELECT eliminar_carrito($1)', [user_id]);
        if (response) return true;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}


module.exports = {
    isCart,
    cancellClientCart,
    deleteClientCart
}