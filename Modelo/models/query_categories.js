const { db, pool } = require('./database');

async function selectCategories() {
    try {
        const response = await pool.query('SELECT * FROM visualizacion_categoria()');
        if (response) return response.rows;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function insertCategory({
    category_name,
    image_link,
    description,
    type
}) {
    try {
        const response = await db.one('SELECT registrar_categoria($1, $2, $3, $4)', [
            category_name,
            image_link,
            description,
            type
        ]);
        if (response) return response;
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateCategory({
    category_id,
    category_name,
    image_link,
    description,
    type
}) {
    try {
        const response = await db.one('SELECT actualizar_categoria($1, $2, $3, $4, $5)', [
            category_id,
            category_name,
            image_link,
            description,
            type
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


async function deleteCategory(category_id) {
    try {
        const response = await db.one('SELECT eliminar_categoria($1)', [category_id]);
        if (response) return true
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function checkCategory(category_name) {
    try {
        const response = await db.one('SELECT check_categoria_producto($1)', [category_name]);
        const { is_category_available } = response.rows[0];
        return is_category_available;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    selectCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    checkCategory
}
