import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import BarsIcon from "./icons/Bars";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
background-color:  #222;
position: sticky;
top:0;
`;

const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
${props => props.$mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const SearchLink = styled(Link)`
  position: relative;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  /* con esto lo ponemos adelante del menu desplegable */
  position: relative;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
display: flex;
align-items: center;
a{
  display: inline-block;
  min-width: 20px;
  color:white;
  svg{
    width: 14px;
    height: 14px;
  }
}

`


export default function Header() {

  // uso UseContext para traer datos generales de toda la app y los guardo en vbles que creo
  const {cartProducts} = useContext(CartContext);

  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      {/* Center es un componente al que le aplique estilos con styled  */}
      <Center>
        <Wrapper>
          <Logo href={'/'}>My Store</Logo>
          {/* seteamos estados, y le ponemos propiedad de estilo, cuando mobileNavActive es true (aprieto boton hamburguesa), entonces se activa la prop css */}
          <StyledNav $mobileNavActive ={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
          <SearchLink href={'/search'}><SearchIcon/></SearchLink>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader >

  );
}
