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

export default function ProductsGrid({  products, wishedProducts = [] }) {


  return (
    <>
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} wishedProducts={wishedProducts.includes(product._id)} />
      ))}
    </StyledProductsGrid>
    </>
    
  );
}