
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// le paso a home las props que traigo del server
export default function Home({featuredProduct, newProducts}) {

  return (
    <div>
    <Header/>
    <Featured product={featuredProduct}/>
    <NewProducts newProducts={newProducts}/>
    </div>
  );
}

// usamos la consulta a nuestra API, traemos la info
export async function getServerSideProps() {

  const featuredProductId = '64a43b83744740395505aac8';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:5});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

