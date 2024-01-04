import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { styled } from 'styled-components'


const LoginBoxWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top:50px;
`

const RegisterWrapper = styled.div`
margin-top: 10px;
a{
    text-decoration: none;
    font-weight: bold;

}
`
const ErrorDiv = styled.div`
background-color: red;
color: white;
padding:5px;
margin-top: 10px;
`

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter();

    async function loginGoogle() {
        await signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_URL });
    }

    // handler with credentials
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>My Store</h1>
                <form onSubmit={handleSubmit}>
                    <Input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" $payment >Login</Button>
                    {error && (
                        <ErrorDiv>
                            {error}
                        </ErrorDiv >
                    )}
                </form>
                <span>To test login with: <b>user:</b> demo@gmail.com - <b>password:</b> 123456 </span>
                <Button $loginoutG onClick={loginGoogle} >Login with google</Button>
                <RegisterWrapper>
                    Don&apos;t have an account yet? <Link href={'/register'}>Sing up</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
