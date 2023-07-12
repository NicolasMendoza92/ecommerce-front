import Button, { ButtonStyle } from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import FlyingButton from 'react-flying-item';
import CartIcon from "@/components/icons/CartIcon";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

const ButtonCartWrapper = styled.div`
  button{
    ${ButtonStyle}
  background-color: #0D3D29;
    border: 1px solid #0D3D29;
    color:#fff;
}
`

export default function ProductPage({ product }) {

    const router = useRouter();

    async function goBack() {
        await router.push('/products');
    }

    const { addProductToCart } = useContext(CartContext);

    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>${product.price}</Price>
                            </div>
                            <ButtonCartWrapper onClick={() => addProductToCart(product._id)}>
                                <FlyingButton
                                    src={product.images?.[0]}
                                    targetTop={'5%'}
                                    targetLeft={'75%'}
                                    flyingItemStyling={{
                                        width: 'auto',
                                        height: 'auto',
                                        maxWidth: '60px',
                                        maxHeight: '60px'
                                    }}>
                                    <CartIcon />
                                    Add to cart
                                </FlyingButton>
                            </ButtonCartWrapper>
                            <div>
                                <Button $primary onClick={goBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

// traemos con Getserverprops de next los datos del proucto, del modelo de product y mongoose. Lo hacemos asi para no usar api y axios
// para traer los datos especificos como el ID, es necesario poner de paramtro a "context" en la funcion, hacemos un console log y podemos ver la cantidad de info y traemos el query.
export async function getServerSideProps(context) {
    await mongooseConnect();
    // traemos el objeto id del context.query
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}