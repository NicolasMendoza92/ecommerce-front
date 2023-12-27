
import Button from '@/components/Button'
import Input from '@/components/Input'
import WhiteBox from '@/components/WhiteBox'
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
const ErrorDiv = styled.div`
background-color: red;
border-radius: 1rem;
color: white;
padding:1rem;
margin-top: 10px;
`


export default function RegisterPage() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

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

    // handle errors 
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('Complete the fields');
            return;
        }
        try {
            const response = await fetch('api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (response.ok) {
                const form = e.target;
                router.push("/login")
                form.reset();
            } else {
                console.log('Register falied')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    return (
        <LoginBoxWrapper>
            <WhiteBox>
                <h1>Welcome to My Store</h1>
                <p>Create an account and enjoy it!</p>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <Button type='submit' $payment >Register</Button>
                    {error && (
                        <ErrorDiv>
                            {error}
                        </ErrorDiv >
                    )}
                </form>
                <RegisterWrapper>
                    <Link href={'/'}>Continue without account</Link>
                </RegisterWrapper>
                <RegisterWrapper>
                Already have an account? <Link href={'/login'}> Login </Link>
                </RegisterWrapper>
            </WhiteBox>
        </LoginBoxWrapper>
    )
}
