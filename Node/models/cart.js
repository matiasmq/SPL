const { model, Schema } = require("mongoose")

const CartSchema = new Schema(
    {
        client_id: {type:String, required:true},
        product_id: {type:String, required:true},
        quantity: {type:Number, required:true},
        price: {type:Number, required:true},
        message: {type:String, required:true}
    }
)

module.exports = model("Cart", CartSchema)