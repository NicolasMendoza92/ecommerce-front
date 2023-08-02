import { styled } from "styled-components";
import StartOutline from "./icons/StartOutline";
import { useState } from "react";
import StartSolid from "./icons/StartSolid";
// sirve para solucionar el probelma de key, de map
import { v4 } from "uuid";

const StarWrapper = styled.div`
height: 1.3rem;
width: 1.3rem;
align-items: center;
cursor: pointer;
padding:0;
display: inline-block;
color:#0D3D29;
`

const StarsWrapper = styled.div`
display: flex;
gap:4px;
margin-bottom: 5px;
`

export default function StarsReview({defaultHowMany=0, onChange=()=>{}}) {

    // logica de las reviews
    const [howMany, setHowMany] = useState(defaultHowMany);

    const five = [1, 2, 3, 4, 5];

    function handleStarClick(n) {
        setHowMany(n);
        onChange(n);
    }

    return (

        <StarsWrapper>
            {five.map(n => (
                <div key={v4()}>
                    <StarWrapper onClick={()=>handleStarClick(n)}>
                        {howMany >= n ? <StartSolid /> : <StartOutline />}
                    </StarWrapper>
                </div>
            ))}
        </StarsWrapper>


    )
}
