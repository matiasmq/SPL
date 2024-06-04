const { response } = require('express');

const { selectAccount,
        updateAccount, 
        deleteAccountState,
        activateAccountState,
        bloqAccountState,
        deleteAccount} = require("../models/query_cuenta");

const { validationResult } = require("express-validator");

const { updatePassword,
        checkEmail,
        checkRut } = require("../models/query_usuarios");

const bcryptjs = require("bcryptjs");

const getAccount = async (req, res = response) => {
    try {
        const account = await selectAccount();

        if (account) {
            return res.status(200).json(account);
        }

        return res.status(404).json({
            "msg": "Account not found"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            "msg": "Server error"
        });
    }
};

const editAccount = async (req, res = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = req.body;
        const accountId = await updateAccount(data);

        if (accountId) {
            return res.status(200).json({
                "msg": "Account updated successfully",
                "uuid": accountId
            });
        }

        return res.status(400).json({
            "msg": "Error updating account"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            "msg": "Server error",
            "error": e.message
        });
    }
};

const removeAccount = async (req, res = response) => {
    try {
        const { id_cuenta } = req.body;
        const success = await deleteAccount(id_cuenta);
        
        if (success) {
            return res.status(200).json({
                msg: "deleted"
            });
        }

        throw new Error("Failed to delete account");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}

const changePassword = async (req, res = response) => {
    try{
        const { email, username, password } = req.body;
        const mailResponse = true;
        const isEmail = await checkEmail(email);
        const isRut = await checkRut(username);
        if (isEmail && isRut){
            const salt = bcryptjs.genSaltSync();
            const new_password = bcryptjs.hashSync(password, salt);
            const resp = await updatePassword(username, new_password, salt);
            if (resp) return res.status(200).json({
                message:"password updated"
            })
        }
        return res.status(400).json({
            message: "no user or email"
        })

    }catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server error",
            "error": e.message
        });
    }
}

const accountDeleteState = async (req, res = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = req.body;
        const accountId = await deleteAccountState(data);

        if (accountId) {
            return res.status(200).json({
                "msg": "Account state updated successfully",
                "uuid": accountId
            });
        }

        return res.status(400).json({
            "msg": "Error updating account"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            "msg": "Server error",
            "error": e.message
        });
    }
};

const accountActivateState = async (req, res = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = req.body;
        const accountId = await activateAccountState(data);

        if (accountId) {
            return res.status(200).json({
                "msg": "Account state updated successfully",
                "uuid": accountId
            });
        }

        return res.status(400).json({
            "msg": "Error updating account"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            "msg": "Server error",
            "error": e.message
        });
    }
};

const accountBloqState = async (req, res = response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try {
        const data = req.body;
        const accountId = await bloqAccountState(data);

        if (accountId) {
            return res.status(200).json({
                "msg": "Account state updated successfully",
                "uuid": accountId
            });
        }

        return res.status(400).json({
            "msg": "Error updating account"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            "msg": "Server error",
            "error": e.message
        });
    }
};

module.exports = {
    getAccount,
    editAccount,
    removeAccount,
    changePassword,
    accountDeleteState,
    accountActivateState,
    accountBloqState
};
