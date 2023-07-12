import { css, styled } from "styled-components"

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content:center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  svg{
    height: 30px;
    margin-right: 5px;
  }

  ${props => props.$primary && css`
  background: #fff;
  color: #000;
  width: 100%;
  border:"none";
`}
 ${props => props.$outline && css`
  background: "none";
  color: #fff;
  border:1px solid #fff;
`}
  ${props => props.$block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.size === 'lg' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
  ${props => props.$cartbtn && css`
    background-color: #0D3D29;
    border: 1px solid #0D3D29;
    color:#fff;
  `}
  ${props => props.$payment && css`
  width: 100%;
  background-color: black;
  border:none;
  padding:0.6rem;
  color:#fff;
`}
  ${props => props.$addless && css`
    background-color: #F0F3F3;
    padding:0.8rem;
    color:#000;
  `}
  ${props => props.$addProduct && css`
  background-color: #0D3D29;
  color:#fff;
  width: 100%;
  border:"none";
`}
 ${props => props.$loginout && css`
  background-color: blueviolet;
  color:#fff;
  border:"none";
  width: 100%;
`}
 ${props => props.$trash && css`
 svg{
    height: 20px;
  }
`}

`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}