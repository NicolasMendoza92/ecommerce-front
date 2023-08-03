import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";

// buscamos en nuestro servidor los productos y los traemos con find, como si fuera un axios get 
export async function getServerSideProps(context) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  // traemos datos del usuario logeado 
  const session  = await getServerSession(context.req, context.res, authOptions);

  const wishedProducts = session?.user?
   await WishedProduct.find({
    userEmail: session.user.email,
    product: products.map(p => p._id.toString()),
  })
  : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts:wishedProducts.map(wish => wish.product.toString()),
    }
  };
}

export default function ProductsPage({ products, wishedProducts }) {

    return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
    </>
  );
}

