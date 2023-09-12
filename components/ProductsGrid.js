import { styled } from "styled-components";
import ProductBox from "./ProductBox";


const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  padding: 10px;
`;

export default function ProductsGrid({newProducts, products, prodFinded, wishedProducts=[]}) {
  return (
    <StyledProductsGrid>
      {newProducts?.length > 0 && newProducts.map(product => (
        <ProductBox key={product._id} {...product} wishedProducts={wishedProducts.includes(product._id)}/>
      ))}
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} wishedProducts={wishedProducts.includes(product._id)}/>
      ))}
      {prodFinded?.length > 0 && prodFinded.map(product => (
        <ProductBox key={product._id} {...product} wishedProducts={wishedProducts.includes(product._id)}/>
      ))}
    </StyledProductsGrid>
  );
}