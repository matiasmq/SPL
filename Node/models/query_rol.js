const { db, pool } = require('./database');

async function selectRoles() {
    try {
        const response = await pool.query('SELECT * FROM visualizacion_rol()');
        if (response) return response.rows;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function insertRol({
    rol
}) {
    try {
        const response = await db.one('SELECT registrar_rol($1)', [
            rol
        ]);
        if (response) return response;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateRol({
    rol_id,
    rol
}) {
    try {
        const response = await db.one('SELECT actualizar_rol($1, $2)', [
            rol_id,
            rol
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


async function deleteRol(rol_id) {
    try {
        const response = await db.one('SELECT eliminar_rol($1)', [rol_id]);
        if (response) return true
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    selectRoles,
    insertRol,
    updateRol,
    deleteRol
}
