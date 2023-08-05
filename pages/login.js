import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
import { saveInLocalStorage } from '@/lib/localStorage'
import axios from 'axios'
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

export default function LoginPage() {

    const [input, setInput] = useState({ email: '', password: '' });
    const router = useRouter()

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newInput = { ...input, [name]: value };
        if (newInput.email.length < 35
            && newInput.password.length < 30) {
            setInput(newInput);
        } else {
            alert('Alcanzaste el numero maximo de caracteres')
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', input);
            const { token, email } = response.data;
            saveInLocalStorage({ key: 'token', value: { token } });
            console.log(response);
            router.push('/')
        }
        catch (error) {
            console.error(error);
            if (input.email === '' && input.password === '') {
                alert("Faltan datos")
            } else {
                alert(JSON.stringify(error.response.data));
            }
        }

    };

    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>My Store</h1>
                <form onSubmit={handleSubmit}>
                    <Input type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)} />
                    <Input type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)} />
                    <Button type="submit" $payment >Login</Button>
                </form>
                <RegisterWrapper>
                    Don&apos;t have an account yet? <Link href={'/register'}>Sing up</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
