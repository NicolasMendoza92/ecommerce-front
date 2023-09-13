
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { Setting } from "@/models/Setting";


// le paso a home las props que traigo del server
export default function Home({ featuredProduct, newProducts, wishedNewProducts }) {

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

// usamos la consulta a nuestra API, traemos la info
export async function getServerSideProps(context) {
  await mongooseConnect();
  const featuredProductSettings = await Setting.findOne({ name: 'featuredProductId' });
  const featuredProductId = featuredProductSettings.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 5 });
  // traemos datos del usuario logeado 
  const session = await getServerSession(context.req, context.res, authOptions);
  // si tenemos usuario logeado entonces , cargo info de favs, sino array vacio.
  const wishedNewProducts = session?.user ?
    await WishedProduct.find({
      userEmail: session.user.email,
      product: newProducts.map(p => p._id.toString()),
    })
    : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(wish => wish.product.toString()),
    },
  };
}

