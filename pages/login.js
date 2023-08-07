import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
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

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        signIn('credentials',{email, password, callbackUrl:'/account'})
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
                </form>
                <RegisterWrapper>
                    Don&apos;t have an account yet? <Link href={'/register'}>Sing up</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
