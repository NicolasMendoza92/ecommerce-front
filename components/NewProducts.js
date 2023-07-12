
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";
import Title from "./Title";

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid newProducts={newProducts} />
    </Center>
  )
}
