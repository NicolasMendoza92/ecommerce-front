import { styled } from "styled-components";
import ProductBox from "./ProductBox";


const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
`;

export default function ProductsGrid({newProducts, products}) {
  return (
    <StyledProductsGrid>
      {newProducts?.length > 0 && newProducts.map(product => (
        <ProductBox key={product._id} {...product}/>
      ))}
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product}/>
      ))}
    </StyledProductsGrid>
  );
}