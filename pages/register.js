
import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { styled } from 'styled-components'


const LoginBoxWrapper = styled.div`
display: flex;
margin-top: 50px;
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

    const router = useRouter();
    const [input, setInput] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newInput = { ...input, [name]: value };
        if (newInput.name.length < 30
            && newInput.email.length < 35
            && newInput.password.length < 15) {
            setInput(newInput);
        } else {
            alert('Alcanzaste el numero maximo de caracteres')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', input);
            alert('usuario creado')
            router.push('/api/auth/signin')
        } catch (error) {
            console.error(error);
            if (input.name === '' && input.email === '' && input.password === '') {
                alert("Faltan datos")
            }
            else {
                alert(JSON.stringify(error.response.data));
            }

        }

    };

    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>Welcome to My Store</h1>
                <p>Create an account and enjoy it!</p>
                <form onSubmit={handleSubmit}>
                    <Input type="name"
                        placeholder="Full Name"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        required />
                    <Input type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        required />
                    <Input type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        required/>
                    <Button type='submit' $payment >Register</Button>
                </form>
                <RegisterWrapper>
                    <Link href={'/'}>Continue without account</Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
