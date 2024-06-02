const { response } = require('express');

const { insertUser,
        selectUser,
        updateUser,
        deleteUser,
        checkRut,
        checkPhoneNumber,
        checkEmail } = require("../../Modelo/models/query_usuarios");

const bcryptjs = require('bcryptjs');

const registerUser = async (req, res = response) => {
    const { rut, phone_number, email } = req.body;
    const is_rut = await checkRut(rut);
    if (is_rut){
        return res.status(400).json({
            "msg":"rut not available"
        });
    }

    const is_number = await checkPhoneNumber(phone_number);
    if (is_number){
        return res.status(400).json({
            "msg":"phone number not available"
        });
    }

    const is_email = await checkEmail(email);
    if (is_email){
        return res.status(400).json({
            "msg":"email not available"
        });
    }

    
    const salt = bcryptjs.genSaltSync();
    const new_password = bcryptjs.hashSync(req.body.password, salt);

    const data = {
        ...req.body,
        password: new_password,
        hash: salt
    };

    const userResponse = await insertUser(data);
    const { registrar_usuario } = userResponse;

    if (registrar_usuario){
        return res.status(200).json({
            "msg":"ok",
            "uuid": registrar_usuario
        });
    }

    return res.status(400).json({
        "msg":"error"
    });
};

const getUser = async (req, res = response) => {
    const username = req.params.username;

    const user = await selectUser(username);

    if (user){
        return res.status(200).json(user);
    }

    return res.status(404).json({
        "msg":"User not found"
    });
};

const editUser = async (req, res = response) => {
    const data = req.body;

    if (data.password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password, salt);
        data.hash = salt;
    }

    const userResponse = await updateUser(data);

    if (userResponse) {
        return res.status(200).json({
            message:"User updated successfully"
        });
    }

    return res.status(400).json({
        message:"Error updating user"
    });
};

const removeUser = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const result = await deleteUser(id_usuario);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Usuario eliminado exitosamente"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error al eliminar el usuario"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

module.exports = {
    registerUser,
    getUser,
    editUser,
    removeUser
};