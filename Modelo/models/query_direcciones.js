const { db, pool } = require('./database');

async function insertAddress({
    number_house,
    street,
    town,
    description,
    sector
} ){
    try {
        const response = await db.one('SELECT registrar_direccion($1, $2, $3, $4, $5)', [
            number_house,
            street,
            town,
            description,
            sector
        ]);
        if (response) {
            return response;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateAddress(req) {
    const {
        address_id,
        number_house,
        street,
        town,
        description,
        sector
    } = req.body;

    try {
        const response = await db.one('SELECT actualizar_direccion($1, $2, $3, $4, $5, $6)', [
            address_id,
            number_house,
            street,
            town,
            description,
            sector
        ]);
        if (response) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function deleteAddress(address_id) {
    try {
        const response = await db.one('SELECT eliminar_direccion($1)', [address_id]);
        if (response) return true;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function selectAddresses(){
    try {
        const response = await pool.query('SELECT * from visualizacion_direccion()');
        if (response) return response.rows;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getAddress(uuid){
    try{
        const response = await pool.query(`select * from get_user_direction($1)`, [uuid])
        if (response.rows) return response.rows
        return false
    }catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    insertAddress,
    updateAddress,
    deleteAddress,
    selectAddresses,
    getAddress
}

