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
  background-color: grey;
  color: #fff;
  border:"none";
  width: 100%;
  margin:10px;
  svg{
    height: 20px;
    margin-right: 5px;
  }
`}
 ${props => props.$outline && css`
  background-color: "none";
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
    svg{
    height: 20px;
    margin:0px 0px 0px 5px;
  }
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
 ${props => props.$loginoutG && css`
  background-color: #4285F4;
  color:#fff;
  border:"none";
  width: 100%;
`}
 ${props => props.$loginout && css`
  background-color: black;
  color:#fff;
  border:"none";
  width: 100%;
  margin-top: 5px;
`}
 ${props => props.$trash && css`
 svg{
    height: 20px;
  }
`}
 ${props => props.$seeMore && css`
    background-color: #F0F3F3;
    padding:0.2rem;
    color:#000;
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