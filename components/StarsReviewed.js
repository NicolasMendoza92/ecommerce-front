import { styled } from "styled-components";
import StartOutline from "./icons/StartOutline";
import StartSolid from "./icons/StartSolid";


const StarWrapper = styled.div`
height: 0.8rem;
width: 0.8rem;
align-items: center;
padding:0;
display: inline-block;
color:#0D3D29;
`

const StarsWrapper = styled.div`
display: flex;
gap:3px;
margin-bottom: 5px;
`

export default function StarsReviewed({defaultHowMany}) {

    return (

        <StarsWrapper>
                    <StarWrapper>{defaultHowMany >= 1 ? <StartSolid /> : <StartOutline />}</StarWrapper>
                    <StarWrapper>{defaultHowMany >= 2 ? <StartSolid /> : <StartOutline />}</StarWrapper>
                    <StarWrapper>{defaultHowMany >= 3 ? <StartSolid /> : <StartOutline />}</StarWrapper>
                    <StarWrapper>{defaultHowMany >= 4 ? <StartSolid /> : <StartOutline />}</StarWrapper>
                    <StarWrapper>{defaultHowMany >= 5 ? <StartSolid /> : <StartOutline />}</StarWrapper>           
        </StarsWrapper>


    )
}