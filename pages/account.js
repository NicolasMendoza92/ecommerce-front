import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import OrderSingle from "@/components/OrderSingle";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import WhiteBox from "@/components/WhiteBox";
import WishedProductBox from "@/components/WishedProductBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const RegisterWrapper = styled.div`
margin-top: 10px;
a{
    text-decoration: none;
    font-weight: bold;

}
`

export default function AccountPage() {
    //  Si yo solamente pongo session en vez de data:session me aparece mas información y yo necesito solamente los datos. 
    const { data: session } = useSession();
    console.log(session)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [loadingAccData, setLoadingAccData] = useState(false);
    const [loadingWished, setLoadingWished] = useState(false);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [activeTab, setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([]);

    const [wishedProducts, setWishedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // way to create router in nextjs 
    const router = useRouter();

    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        })
    }
    async function login() {
        router.push('/login');
    }

    // funcion to save or edit addres 
    async function saveAddress(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = { name, email, city, streetAddress, city, postalCode, country }
            await axios.put('/api/address', data)
        } catch (error) {
            console.log(error)
        }finally {
            setIsLoading(false)
          }

    }

    // si no tiene dependencias, entonces el useefect se ejecutara solo, sin necesidad de ningun cambio de estado 
    useEffect(() => {
        if (!session) {
            setLoadingAccData(true);
            setLoadingWished(true);
            setLoadingOrders(true)
        } else {
            axios.get('/api/address').then(response => {
                setName(response.data?.name);
                setEmail(response.data?.email);
                setCity(response.data?.city);
                setPostalCode(response.data?.postalCode);
                setStreetAddress(response.data?.streetAddress);
                setCountry(response.data?.country);
                setLoadingAccData(true);
            })
        }
        axios.get('/api/wishList').then(response => {
            // accedo solamente a la propiedad product de ese array de wishedProducts
            const wproduct = response.data.map(wishedProd => wishedProd.product)
            setWishedProducts(wproduct);
            setLoadingWished(true);
        });
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setLoadingOrders(true);
        })
    }, [session]);

    // funcion que saca el favorito de la lista de favs
    function productRemovedFromWishList(idToRemove) {
        setWishedProducts(products => {
            return [...products.filter(p => p._id.toString() !== idToRemove)]
        })
    }


    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <div>
                        {session && (
                            <WhiteBox>
                                <Tabs
                                    tabs={['Orders', 'Wishlist']}
                                    active={activeTab}
                                    onChange={setActiveTab}
                                />
                                {activeTab === 'Orders' && (
                                    <>
                                        {!loadingOrders && (
                                            <Spinner />
                                        )}
                                        {loadingOrders && (
                                            <div>
                                                {orders.length > 0 && orders.map(order => (
                                                    <OrderSingle key={order._id} {...order} />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                                {activeTab === 'Wishlist' && (
                                    <>
                                        {wishedProducts.length === 0 &&
                                            <p>You have not added favorites yet.</p>
                                        }
                                        {!loadingWished && <Spinner />}
                                        {loadingWished && (
                                            <>
                                                {wishedProducts.length > 0 && wishedProducts.map(wishedProd => (
                                                    <WishedProductBox key={wishedProd._id} {...wishedProd} onRemoveFromWishList={productRemovedFromWishList} />
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </WhiteBox>
                        )}
                        {!session && (
                            <WhiteBox>
                                <h2>Wishlist</h2>
                                <p>Login to add products to your wishlist.</p>
                            </WhiteBox>

                        )}

                    </div>
                    <div>
                        {session && (
                            <WhiteBox>
                                <p>Logged as {session.user?.email}</p>
                                <h2>{session ? 'Account details' : 'Login'}</h2>
                                {!loadingAccData && (
                                    <Spinner />
                                )}
                                {loadingAccData && session && (
                                    <form onSubmit={saveAddress}>
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
                                            {isLoading ? 'Saving...' : 'Save data'}
                                        </Button>
                                    </form>
                                )}
                                <hr />

                                <Button $loginout onClick={logout}>
                                    Logout
                                </Button>

                            </WhiteBox>
                        )}
                        {!session && (
                            <WhiteBox>
                                <h2>Account details</h2>
                                <Button $loginout onClick={login}>Sing Up</Button>
                            </WhiteBox>
                        )}

                    </div>
                </ColumnsWrapper>
            </Center >
        </>
    )
}
