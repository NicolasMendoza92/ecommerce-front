import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
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

export default function AccountPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [loaded, setLoaded] = useState(false);

    // quizas tenga que cambiar el puerto p-4000, por que cuando hago logout en front tmb sale en admin. Si yo solamente pongo session en vez de data:session me aparece mas información y yo necesito solamente los datos. 
    const { data: session } = useSession();
    async function logout() {
        await signOut({
            callbackUrl: process.env.PUBLIC_URL,
        })
    }
    async function login() {
        await signIn('google');
    }

    async function saveAddress() {
        const data = { name:session?.user?.name, email:session?.user?.email, city, streetAddress, city, postalCode, country }
        await axios.put('/api/address', data)
    }

    // si no tiene dependencias, entonces el useefect se ejecutara solo, sin necesidad de ningun cambio de estado 
    useEffect(() => {
        if(!session){
            setLoaded(true);
        } else{
            axios.get('/api/address').then(response => {
                setCity(response.data.city);
                setPostalCode(response.data.postalCode);
                setStreetAddress(response.data.streetAddress);
                setCountry(response.data.country);
                setLoaded(true);
            })
        }
        
    }, [])

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <div>
                        <WhiteBox>
                            <h2>Wishlist</h2>
                        </WhiteBox>

                    </div>
                    <div>
                        <WhiteBox>
                            <h2>Account details</h2>
                            {!loaded &&
                                <Spinner />
                            }
                            {loaded && (
                                <>
                                    <Input type="text"
                                        placeholder="Name"
                                        value={session?.user?.name}
                                        name="name"
                                        onChange={ev => setName(ev.target.value)} />
                                    <Input type="email"
                                        placeholder="Email"
                                        value={session?.user?.email}
                                        name="email"
                                        onChange={ev => setEmail(ev.target.value)} />
                                    <CityHolder>
                                        <Input type="text"
                                            placeholder="City"
                                            value={city}
                                            name="city"
                                            onChange={ev => setCity(ev.target.value)} />
                                        <Input type="text"
                                            placeholder="Postal Code"
                                            value={postalCode}
                                            name="postalCode"
                                            onChange={ev => setPostalCode(ev.target.value)} />
                                    </CityHolder>
                                    <Input type="text"
                                        placeholder="Street Address"
                                        value={streetAddress}
                                        name="streetAddress"
                                        onChange={ev => setStreetAddress(ev.target.value)} />
                                    <Input type="text"
                                        placeholder="Country"
                                        value={country}
                                        name="country"
                                        onChange={ev => setCountry(ev.target.value)} />
                                    <Button $payment onClick={saveAddress}  >
                                        Save
                                    </Button>
                                </>
                            )}
                            <hr />
                            {session && (
                                <Button $loginout onClick={logout}>
                                    Logout
                                </Button>
                            )}
                            {!session && (
                                <Button $loginout onClick={login}>Login</Button>
                            )}
                        </WhiteBox>
                    </div>
                </ColumnsWrapper>
            </Center>
        </>
    )
}
