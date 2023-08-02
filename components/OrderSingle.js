import { styled } from "styled-components";
import Button from "./Button";
import { useState } from "react";
import DownIcon from "./icons/DownIcon";
import UpIcon from "./icons/UpIcon";
// un npm package para solucionar el probelma key de map
import { v4 } from "uuid";

export default function OrderSingle({ line_items, createdAt, total, ...rest }) {

  const [showModal, setShowModal] = useState(false);

const CollapseData = (e) => {
  e.preventDefault(e);
  setShowModal(prev => !prev);
}

  const StyledOrder = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap:10px;
  border-bottom: 1px solid #ddd;

  span{
    color:#aaa;
  }
  `

  const StyledOrderData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  p{
    color: gray;
    font-size: 12px;
  }
  `

  const ModalDetails = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   color: grey;
   font-size: 12px;
   gap:10px;
 `

  const formatedDate = new Date(createdAt).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  return (
    <>
      <StyledOrder>
        <div>
          {line_items.map(item => (
            <div key={v4()}>
              {item.price_data.product_data.name} <span> x{item.quantity}</span>
            </div>
          ))}
        </div>
        <StyledOrderData>
          <div>
            <b>$ {total} </b>
          </div>
          <p>
            Ordered on {formatedDate}
          </p>
        </StyledOrderData>
        <Button onClick={CollapseData} $seeMore>
          {showModal ? <UpIcon /> : <DownIcon />}
        </Button>

      </StyledOrder>

      {showModal ? (
        <ModalDetails>
          {rest.name}<br />
          {rest.email}<br />
          {rest.streetAddress}<br />
          {rest.country}
        </ModalDetails>
      ) : null}

    </>
  )
}

