import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Trash from "@/components/icons/Trash";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const HeaderTableCart = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;


export default function CartPage() {

  const { data: session } = useSession();
  const { cartProducts, addProductToCart, removeProductToCart, clearCart, setCartProducts } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  // capturamos todos los input del payform, y los gestionamos como states.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [shippingFee, setShippingFee] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data)
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // activa la pagina de pago exitoso, cuando se setea issucces y tambien limpia el carrito, que traigo el clearCart de CartContext
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value)
    })
  }, [clearCart]);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
    });
  }, [session])

  // botonera del carrito.
  function moreOfThisProduct(id) {
    addProductToCart(id);
  }
  function lessOfThisProduct(id) {
    if (cartProducts.length === 1) {
      emptyCart();
    } else {
      removeProductToCart(id);
    }
  }

  async function emptyCart() {
    Swal.fire({
      title: 'Are you sure you want clean the cart?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCartProducts([]);
        clearCart();
      }
    })

  }

  // funcion para sumar totales
  let subTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(prod => prod._id === productId)?.price || 0;
    subTotal += price;
  }

  let total = subTotal + parseInt(shippingFee || 0)

  // vamos a nuestra api de checkout

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/checkout', {
        name, email, city, postalCode, streetAddress, country,
        cartProducts, total,
      });

      // si me responde con la direccion, voy directamente a esa pantalla de pago de stripe para ejecutar el pago.
      if (response.data.url) {
        window.location = response.data.url;
        await axios.post('/api/email', {
          name, email, city, postalCode, streetAddress, country,
          cartProducts, total,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }

  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <HeaderTableCart>
              <h1>Cart</h1>
              {cartProducts.length >= 1 &&
                <Button $trash onClick={() => emptyCart()} >
                  <Trash />
                </Button>
              }{
                cartProducts.length === 0 &&
                <div></div>
              }

            </HeaderTableCart>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          {/* mostramos la primera imagen del array */}
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button $addless
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button $addless
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>Sub Total:</td>
                    <td>${subTotal}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Shipping:</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}><b>Total Amount:</b></td>
                    <td><b>${total}</b></td>
                  </tr>
                </tbody>
              </Table>
            )}

          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <form onSubmit={onSubmit}>
                <Input type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  required
                  onChange={ev => setName(ev.target.value)} />
                <Input type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  required
                  onChange={ev => setEmail(ev.target.value)} />
                <CityHolder>
                  <Input type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    required
                    onChange={ev => setCity(ev.target.value)} />
                  <Input type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    required
                    onChange={ev => setPostalCode(ev.target.value)} />
                </CityHolder>
                <Input type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  required
                  onChange={ev => setStreetAddress(ev.target.value)} />
                <Input type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  required
                  onChange={ev => setCountry(ev.target.value)} />
                <Button $payment type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Continue with payment'}
                </Button>
              </form>
            </Box>
          )}

        </ColumnsWrapper>
      </Center>
    </>
  )
}
