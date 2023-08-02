
import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
import Link from 'next/link'
import { styled } from 'styled-components'


const LoginBoxWrapper = styled.div`
display: flex;
margin-top: 30%;
justify-content: center;
align-items: center;
`

const RegisterWrapper = styled.div`
margin-top: 10px;
a{
    text-decoration: none;
    font-weight: bold;

}
`



export default function RegisterPage() {


    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>Welcome to My Store</h1>
                <p>Create an account and enjoy it!</p>
                <form>
                    <Input type="name"
                        placeholder="Full Name"
                        name="name"
                        required />
                    <Input type="email"
                        placeholder="Email"
                        name="email"
                        required />
                    <Input type="password"
                        placeholder="Password"
                        name="password"
                        required/>
                    <Button $payment >Register</Button>
                </form>
                <RegisterWrapper>
                    <Link href={'/'}>Continue without account</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
