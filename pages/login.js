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

export default function LoginPage() {

    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>My Store</h1>
                <form>
                    <Input type="email"
                        placeholder="Email"
                        name="email" />
                    <Input type="password"
                        placeholder="Password"
                        name="password" />
                    <Button $payment >Login</Button>
                </form>
                <RegisterWrapper>
                    Don't have an account yet? <Link href={'/register'}>Sing up</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
