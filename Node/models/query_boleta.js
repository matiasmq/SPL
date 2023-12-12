const { db, pool } = require('./database');

async function isTicket({
    user_id
}) {
    try {
        const jsonDataTicket = await db.one('SELECT ingresar_boleta($1)', [
            user_id
        ]);
        if (jsonDataTicket) return jsonDataTicket;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}


module.exports = {
    isTicket
}