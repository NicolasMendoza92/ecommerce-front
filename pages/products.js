import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// buscamos en nuestro servidor los productos y los traemos con find, como si fuera un axios get 
export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props:{
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  }

export default function ProductsPage({products}) {
  return (
    <>
      <Header />
      <Center>
      <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

