import Link from "next/link";
import { styled } from "styled-components";
import FlyingButton from "./ButtonCartWrapper";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import { useEffect, useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import CartIcon from "./icons/CartIcon";

const WishedProductWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
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
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const InfoRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between;
  margin:8px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight:500;
  text-align: right;
  text-decoration:none;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

const WishListBtn = styled.button`
border: 0;
width: 40px !important;
height: 40px;
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


export default function WishedProductBox({ _id, title, price, images, onRemoveFromWishList=()=>{}}) {

  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(true);

  function addToWishList(e) {
    e.preventDefault();
    e.stopPropagation()
    // aca podemos setear si ya existe un valor , vuelve al original. Es la manera de hacerlo (estaba vacio , toque addToWishList se puso rojo y si toco de nuevo, vuelve a su estado original)
    const nextValue = !isWished;
    if(nextValue === false && onRemoveFromWishList){
      onRemoveFromWishList(_id)
    }
    axios.post('/api/wishList', {
      product: _id,
    }).then(() => { });
    setIsWished(nextValue);
  }

  return (
    <WishedProductWrapper>
      <WhiteLinkBox href={url}>
          <img src={images?.[0]} alt="" />
      </WhiteLinkBox>
        <InfoRow>
          <Title href={url}>{title}</Title>
          <Price>
            ${price}
          </Price>
        </InfoRow>
        <FlyingButton _id={_id} src={images?.[0]}> <CartIcon /></FlyingButton>
        <WishListBtn $wished={isWished} onClick={addToWishList}>
          {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
        </WishListBtn>

    </WishedProductWrapper >
  )
}