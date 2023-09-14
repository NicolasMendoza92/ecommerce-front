
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";
import Title from "./Title";

export default function NewProducts({ products, wishedProducts }) {

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid  products={products} wishedProducts={wishedProducts} />
    </Center>
  )
}
