const { db, pool } = require('./database');


async function Pedidos(){
    try{
        const resp = await pool.query(`SELECT * FROM get_boleta_details()`);
        return resp.rows
    }catch (e) {
        console.log(e)
        return false
    }
}

async function UpdateBoleta({id_detalle_boleta, estado}){
    try{
        const resp = await db.one(`SELECT actualizar_estado_boleta($1, $2)`,
            [id_detalle_boleta, estado])
        return true
    }catch (e) {
        console.log(e)
        return false
    }
}
async function Ready({id_usuario}){
    try{
        const resp = await db.many(
            `select * from get_boleta_lista($1)`, [id_usuario]);
        console.log(resp)
        return resp
    }catch (e) {
        console.log(e);
        return false
    }
}

module.exports = {
    Pedidos,
    UpdateBoleta,
    Ready
}