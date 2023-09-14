import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";

// esta ruta es solo para traer los productos que estan en el carrito, usamos el Id y en base a eso podemos encontrar el array
export default async function handle(req,res) {
    await mongooseConnect();
    const ids = req.body.ids;
    res.json(await Product.find({_id:ids}));
    
}
