import styled from "styled-components";
import { ButtonStyle } from "./Button";
import FlyingButtonOriginal from 'react-flying-item';
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ButtonCartWrapper = styled.div`
  button{
    ${ButtonStyle}
  background-color: #0D3D29;
    border: 1px solid #0D3D29;
    color:#fff;
    padding: 5px 5px;
    svg{
      width:25px;
    }
}
`;

export default function FlyingButton(props) {
  const { addProductToCart } = useContext(CartContext);
  return (
    <ButtonCartWrapper onClick={() => addProductToCart(props._id)}>
      <FlyingButtonOriginal {...props}
        targetTop={'5%'}
        targetLeft={'85%'}
        flyingItemStyling={{
        width: 'auto',
        height: 'auto',
        maxWidth: '60px',
        maxHeight: '60px'
        }} />
    </ButtonCartWrapper>
  )
};