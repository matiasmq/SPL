const { db, pool } = require('./database');


async function customers({
    start_date,
    end_date
}) {
    try {
        const jsonDatacustomers = await db.any('SELECT * FROM obtener_clientes_y_compras($1,$2)', [
            start_date,
            end_date
        ]);
        if (jsonDatacustomers) return jsonDatacustomers;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}


async function shistory({
    start_date,
    end_date
}) {
    try {
        const jsonDatahistorial = await db.any('SELECT * FROM obtener_historial_ventas($1,$2)', [
            start_date,
            end_date
        ]);
        if (jsonDatahistorial) return jsonDatahistorial;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}




async function getproduct({
    start_date,
    end_date
}) {
    try {
        const jsonDataprueba2 = await db.any('SELECT * FROM obtener_productos_vendidos($1,$2)', [
            start_date,
            end_date
        ]);
        if (jsonDataprueba2) return jsonDataprueba2;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}




module.exports = {
    getproduct,
    customers,
    shistory
}
