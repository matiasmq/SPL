const { db, pool } = require('./database');

async function insertProduct({
    category_id,
    product_name,
    ingredients,
    retreat,
    limited,
    stock,
    portion,
    image_route,
    value
                             } ){

    try{
        const response = await db.one('SELECT registrar_producto($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
            category_id,
            product_name,
            ingredients,
            retreat,
            limited,
            stock,
            portion, 
            image_route,
            value
        ]);


        if (response){
            return response
        }
        return false
    }catch (e) {
        console.log(e)
    }

}

async function updateProduct(req) {
    const {
        product_id,
        category_id,
        product_name,
        ingredients,
        retreat,
        limited,
        stock,
        portion,
        image_route,
        value
    } = req.body;

    try {
        const response = await db.one('SELECT actualizar_producto($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
            product_id,
            category_id,
            product_name,
            ingredients,
            retreat,
            limited,
            stock,
            portion,
            image_route,
            value
        ]);

        if (response){
            return true
        }
        return false

    } catch (e) {
        console.error(e);
        return false
    }
}

async function deleteProduct(product_id) {
    try {
        const response = await db.one('SELECT eliminar_producto($1)', [product_id]);
        if (response) return true
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function selectProducts(){
    try{
        const response = await pool.query(`SELECT * from visualizacion_producto()`)
        if (response) return response.rows
        return false
    }catch (e) {
        console.log(e)
        return false
    }
}


module.exports = {
    insertProduct,
    updateProduct,
    deleteProduct,
    selectProducts
}