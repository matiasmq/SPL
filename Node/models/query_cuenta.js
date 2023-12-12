const { db, pool } = require('./database');

async function selectAccount() {
    try {
        const response = await pool.query(`SELECT * FROM visualizacion_cuenta()`);
        if (response) return response.rows;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateAccount({
    id_cuenta,
    id_cliente,
    id_rol,
    estado_actividad,
    nombre_usuario,
    id_credencial
}) {
    try {
        const response = await pool.query(`SELECT actualizar_cuenta($1, $2, $3, $4, $5, $6)`,
            [
                id_cuenta,
                id_cliente,
                id_rol,
                estado_actividad,
                nombre_usuario,
                id_credencial
            ]
        );


        if (response.rows[0]) {
            return response.rows[0].actualizar_cuenta;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deleteAccount(id_cuenta) {
    try {
        const response = await db.one('SELECT eliminar_cuenta($1)', [id_cuenta]);
        if (response) return true
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deleteAccountState({
    id_cuenta
}) {
    try {
        const response = await pool.query(`SELECT eliminar_usuario_estado($1)`,
            [
                id_cuenta
            ]
        );


        if (response.rows[0]) {
            return response.rows[0].eliminar_usuario_estado;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function activateAccountState({
    id_cuenta
}) {
    try {
        const response = await pool.query(`SELECT activar_usuario_estado($1)`,
            [
                id_cuenta
            ]
        );


        if (response.rows[0]) {
            return response.rows[0].activar_usuario_estado;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function bloqAccountState({
    id_cuenta
}) {
    try {
        const response = await pool.query(`SELECT bloquear_usuario_estado($1)`,
            [
                id_cuenta
            ]
        );


        if (response.rows[0]) {
            return response.rows[0].bloquear_usuario_estado;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    selectAccount,
    updateAccount,
    deleteAccount,
    deleteAccountState,
    activateAccountState,
    bloqAccountState
};
