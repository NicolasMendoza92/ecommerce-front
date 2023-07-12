import { BeatLoader } from "react-spinners";
import { styled } from "styled-components";

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`

export default function Spinner() {
  return (
    <Wrapper>
      <BeatLoader color={'#555'} />
    </Wrapper>

  )
}
