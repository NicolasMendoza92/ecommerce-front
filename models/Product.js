import mongoose, { model, Schema, models } from "mongoose";

// creamos los modelos, para la conexion con la base de datos Mongoose-. 
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        require: true,
    },
    images:[{type:String}],
    category: {
        type:mongoose.Types.ObjectId, 
        ref:'Category'
    },
    properties: {type:Object},
    belongsCat:String, 
},
{
    timestamps: true,
}
);

export const Product = models.Product || model('Product', ProductSchema);