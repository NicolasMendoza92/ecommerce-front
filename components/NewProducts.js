
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";
import Title from "./Title";

export default function NewProducts({ newProducts, wishedProducts }) {

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid newProducts={newProducts} wishedProducts={wishedProducts} />
    </Center>
  )
}
