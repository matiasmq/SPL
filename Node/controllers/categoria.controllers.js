const { response } = require('express');
const {
    selectCategories,
    insertCategory,
    updateCategory,
    deleteCategory
} = require("../models/query_categories");

const createNewCategory = async (req, res = response) => {
    try {
        const { category_name, image_link, description, type } = req.body;
        const categoryResponse = await insertCategory({ category_name, image_link, description, type });
        
        if (categoryResponse) {
            return res.status(200).json({
                msg: "success",
                category: categoryResponse
            });
        }

        throw new Error("Failed to create category");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}


const removeCategory = async (req, res = response) => {
    try {
        const { category_id } = req.body;
        const success = await deleteCategory(category_id);
        
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


const updatedCategory = async (req, res = response) => {
    try {
        const { category_id, category_name, image_link, description, type } = req.body;
        const success = await updateCategory({ category_id, category_name, image_link, description, type });
        
        if (success) {
            return res.status(200).json({
                msg: "updated"
            });
        }

        throw new Error("Failed to update category");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "error"
        });
    }
}

const getCategories = async (req, res = response) => {
    try {
        const categories = await selectCategories();
        
        if (categories) {
            return res.status(200).json({
                categories: categories
            });
        }

        throw new Error("No categories found");
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "no items available"
        });
    }
}

module.exports = {
    createNewCategory,
    removeCategory,
    updatedCategory,
    getCategories
}
