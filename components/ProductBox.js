import Link from "next/link";
import { styled } from "styled-components";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import { useContext, useEffect, useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import  Button, { ButtonStyle } from "@/components/Button";

const CardBox = styled.div`
display:inline-grid;
`

const WhiteLinkBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 130px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 100px;
  }

`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:1.0;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const ButtonsBoxWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight:600;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
  }
`;

const WishListBtn = styled.button`
border: 0;
width: 40px !important;
height: 40px;
top: 0;
right: 0;
background:transparent;
cursor: pointer;
${props => props.$wished ? `
color:red;

`: `
color:black;
`}
svg{
  width: 20px;
}
`
// se hace para poder estilizar el flying button de react
const ButtonFlyingWrapper = styled.div`
button {
  ${ButtonStyle}
  background-color: #0D3D29;
    border: 1px solid #0D3D29;
    color:#fff;
    svg{
    height: 20px;
    margin:0px 0px 0px 5px;
}
}
`

export default function ProductBox({ _id, title, price, images, wishedProducts }) {

  const { addProductToCart } = useContext(CartContext);

  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wishedProducts);

  function addToWishList(e) {
    e.preventDefault();
    e.stopPropagation()
    // aca podemos setear si ya existe un valor , vuelve al original. Es la manera de hacerlo (estaba vacio , toque addToWishList se puso rojo y si toco de nuevo, vuelve a su estado original)
    const nextValue = !isWished;
    axios.post('/api/wishList', {
      product: _id,
    }).then(() => { });
    setIsWished(nextValue);
  }

  return (
    <CardBox>
      <WhiteLinkBox href={url}>
        <img src={images?.[0]} alt="" />
      </WhiteLinkBox>
      <ProductInfoBox>
        <PriceRow>
          <Title href={url}>{title}</Title>
          <Price>
            ${price}
          </Price>
        </PriceRow>
      </ProductInfoBox>
      <ButtonsBoxWrapper >
        <ButtonFlyingWrapper onClick={() => addProductToCart(_id)}>
          <Button>
            Add to cart <CartIcon />
          </Button>
        </ButtonFlyingWrapper>
        <WishListBtn $wished={isWished} onClick={addToWishList}>
          {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
        </WishListBtn>
      </ButtonsBoxWrapper>
    </CardBox >
  )
}
