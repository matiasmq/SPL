const { db, pool } = require('./database');

async function getUserCredentials( username ){
    const response = await pool.query(`
        SELECT * FROM get_credenciales( $1 )`, [username]);
    if (response.rows[0]){
        return response.rows[0]
    }
    return false
}
async function insertUser({
        rut,
        name,
        lastname_1,
        lastname_2,
        email,
        phone_number,
        password,
        hash,
        number,
        street,
        poblacion,
        description,
        sector }){
    try{
        const response = await pool.query(`SELECT registrar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
            rut,
            name,
            lastname_1,
            lastname_2,
            email,
            phone_number,
            password,
            hash,
            number,
            street,
            poblacion,
            description,
            sector]);
        if (response.rows[0]){
            return response.rows[0]
        }
    }catch (e) {
        console.log(e)
        return false;
    }
    return false;
}

async function selectUser(){
    try{
        const response = await pool.query(`SELECT * FROM visualizacion_usuario()`);
        if (response) return response.rows
        return false
    }catch (e) {
        console.log(e)
        return false
    }
}

async function updateUser({
    id_usuario, 
    rut,
    name,
    lastname_1,
    lastname_2,
    email,
    id_address,
    phone_number }) {
    try {
        const response = await db.one(`SELECT actualizar_usuario($1, $2, $3, $4, $5, $6, $7, $8)`, [
            id_usuario, 
            rut,
            name,
            lastname_1,
            lastname_2,
            email,
            id_address,
            phone_number
        ]);

        if (response){
            return true
        }
        return false

    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updatePassword( username, newPassword, newHash){

    try {
        const response = await pool.query(`SELECT actualizar_password($1, $2, $3);`,
            [username, newPassword, newHash]);
        if (response){
            return true
        }
        return false
    }catch (e) {
        console.log(e);
        return false;
    }
}
async function deleteUser(id_usuario) {
    try {
        const response = await db.one('SELECT eliminar_usuario($1)', [id_usuario]);
        if (response) return true;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function checkRut( rut ){
    try {
       const response = await pool.query(`SELECT check_rut( $1 )`, [ rut ]);
       const { check_rut }  = response.rows[0]
       if (check_rut){
           return check_rut
       }
       return false
    }catch (e) {
        console.log(e);
        return false
    }
}
async function checkPhoneNumber ( PhoneNumber){
    try{
        const response = await pool.query(
            `SELECT check_phone_number($1)`, [PhoneNumber]
        )
        const { check_phone_number } = response.rows[0];
        if (response.rows[0]){

            return check_phone_number;
        }
        return check_phone_number;
    }catch (e) {
        console.log(e)
        return false
    }
}
async function checkEmail(Email){
    try{
        const response = await pool.query(`
            SELECT check_email($1)
        `, [Email])
        const { check_email } = response.rows[0]
        if (check_email){
            return check_email;
        }
        return check_email
    }catch (e) {
        console.log(e)
    }
}

async function userInformation (userName){
    try{
        const response = await pool.query(`SELECT * FROM obtener_inf_usuario( $1 )`, [userName]);
        if (response.rows) return response.rows
        return false
    }catch (e) {
        console.log(e)
        return false
    }
}

module.exports = {
    getUserCredentials,
    insertUser,
    selectUser,
    userInformation,
    updateUser,
    updatePassword,
    deleteUser,
    checkRut,
    checkPhoneNumber,
    checkEmail
}