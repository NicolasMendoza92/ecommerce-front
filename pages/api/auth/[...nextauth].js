// se crea esta ruta con la documentacion de nextauth.org

import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_FRONT_ID,
            clientSecret: process.env.GOOGLE_FRONT_SECRET
        }),
        // manera de crear formulario login con email y password
        CredentialsProvider({
            // uso lo que me da next auth, crea un formulario rapido con la ruta /auth/signin 
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // validamos el usuario para ver que onda
                const user = {
                    email: 'test@gmail.com',
                    password:'123456',
                }
                if(credentials?.email === user.email && credentials?.password === user.password){
                    return user;
                } else{
                    return null
                }       
            },
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions);

