const { db, pool } = require('./database');

async function insertStatus({
    order_status,
} ){
    try {
        const response = await db.one('SELECT registrar_estado($1)', [
            order_status
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

async function updateStatus(req) {
    const {
        state_id,
        order_status
    } = req.body;

    try {
        const response = await db.one('SELECT actualizar_estado($1, $2)', [
            state_id,
            order_status
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

async function deleteStatus(id_estado) {
    try {
        const response = await db.one('SELECT eliminar_estado($1)', [id_estado]);
        if (response) return true;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function selectStatuses(){
    try {
        const response = await pool.query('SELECT * from visualizacion_estado()');
        if (response) return response.rows;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    insertStatus,
    updateStatus,
    deleteStatus,
    selectStatuses
}