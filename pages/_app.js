import CartContextProvider from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react"

// segun la documentación tienen que ser definidos con letra Mayuscula inicial, sino no funciona. y se define dentro de ` ` comillas invertidas
const GlobalStyles = createGlobalStyle`
body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
}
`;

// ponemos el contextprovider exportado en toda la app

export default function App({ Component, pageProps:{session,...pageProps} }) {

    return (
        <>
            <GlobalStyles />
            <SessionProvider session={session}>
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
            </SessionProvider>
        </>
    )
}
