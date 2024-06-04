const { response } = require('express');
const {
    selectRoles,
    insertRol,
    updateRol,
    deleteRol
} = require("../models/query_rol");

const createRol = async (req, res = response) => {
    try {
        const { rol } = req.body;
        const rolResponse = await insertRol({ rol });
        
        if (rolResponse) {
            return res.status(200).json({
                msg: "success",
                rol: rolResponse
            });
        }

        throw new Error("Failed to create rol");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}


const removeRol = async (req, res = response) => {
    try {
        const { rol_id } = req.body;
        const success = await deleteRol(rol_id);
        
        if (success) {
            return res.status(200).json({
                msg: "deleted"
            });
        }

        throw new Error("Failed to delete category");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}


const modifyRol = async (req, res = response) => {
    try {
        const { rol_id, rol } = req.body;
        const success = await updateRol({ rol_id, rol });
        
        if (success) {
            return res.status(200).json({
                msg: "updated"
            });
        }

        throw new Error("Failed to update rol");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}

const getRoles = async (req, res = response) => {
    try {
        const roles = await selectRoles();
        
        if (roles) {
            return res.status(200).json({
                roles: roles
            });
        }

        throw new Error("No roles found");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "no items available"
        });
    }
}

module.exports = {
    createRol,
    removeRol,
    modifyRol,
    getRoles
}
