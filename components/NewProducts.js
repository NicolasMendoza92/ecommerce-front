import { styled } from "styled-components";
import ProductsGrid from "./ProductsGrid";
import Content from "./Content";


const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ newProducts }) {
  return (
    <Content>
      <Title>New Arrivals</Title>
      <ProductsGrid newProducts={newProducts} />
    </Content>
  )
}
