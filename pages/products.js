import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";

// buscamos en nuestro servidor los productos y los traemos con find, como si fuera un axios get 
export async function getServerSideProps(context) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  // traemos datos del usuario logeado 
  const session = await getServerSession(context.req, context.res, authOptions);

  const wishedProducts = session?.user ?
    await WishedProduct.find({
      userEmail: session.user.email,
      product: products.map(p => p._id.toString()),
    })
    : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map(wish => wish.product.toString()),
    }
  };
}

export default function ProductsPage({ products, wishedProducts }) {

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    const limit = 12;
    const start = 0 + pageNumber * limit - limit;
    const end = start + limit;

    const productsSlice = products.slice(start, end);
    setCurrentProducts(productsSlice);

    const totalPages = Math.ceil(products.length / limit);
    setTotalPages(totalPages);
  }, [products, pageNumber]);

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={currentProducts} wishedProducts={wishedProducts} />
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
      </Center>
    </>
  );
}

