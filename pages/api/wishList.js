import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'POST') {
        const { product } = req.body;
        const wishedDoc = await WishedProduct.findOne({ userEmail: session?.user.email, product });
        if (wishedDoc) {
            await WishedProduct.findByIdAndDelete(wishedDoc._id);
            res.json({wishedDoc})
        } else {
            await WishedProduct.create({ userEmail: session?.user.email, product });
            res.json('created')
        }

    }

    if(req.method === 'GET'){
        res.json(
            // con populate, hacemos que a la propiedad "product" que tiene adentro el Modelo WishedProduct, traiga toda la informacion que tiene de otra coleccion en nuestra base de datos, en este caso del Modelo Producto
            await WishedProduct.find({userEmail:session?.user.email}).populate('product'),
        )
    }
}