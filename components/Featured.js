import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import { useContext} from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import Button, { ButtonStyle } from "./Button";

// aplico esilos como CSS tradicional pero , en cada componente particular. 

const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:1.2rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 250px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  /* para mayores de 768, usamos min-width */
  @media screen and (min-width:768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;

// en este caso, este es el contenedor de los botones, es un div
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap:10px;
  margin-top:25px;

@media screen and (max-width:768px) {
  justify-content: center;
}

`;

const ButtonCartFeatured = styled.div`
  button{
    ${ButtonStyle}
  background: #fff;
  color: #000;
  border:"none";
}
`;

export default function Featured({ product }) {

  // uso la funcion que cree en el componente CartContext usando usecontext y la seteo con el ID
  const { addFeaturedToCart } = useContext(CartContext);

  return (
    <Bg>
      <Center>
        <ColumnsWrapper data-aos="fade-up">
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonCartFeatured >
                  <Button  onClick={() => addFeaturedToCart(product._id)} $cartbtn>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonCartFeatured>
                <ButtonLink $outline href={'/product/'+ product._id}>See More</ButtonLink>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images?.[0]} alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}