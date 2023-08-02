import { Product } from "./Product";

const { Schema, model, models } = require("mongoose");

 const WishedProductSchema = new Schema({
    userEmail: {
      type:String, 
      require:true
   },
   //  uso ref, para que el modelo de los wish list, me traiga todos los datos del producto seleccionado como deseado, con solo el ID
    product: {
      type: Schema.Types.ObjectId, 
      ref:Product
   },
 });

 export const WishedProduct = models?.WishedProduct || model('WishedProduct', WishedProductSchema )