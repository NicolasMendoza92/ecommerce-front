// se crea esta ruta con la documentacion de nextauth.org

import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';

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
              email: { label: "Email", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                mongooseConnect();
                // check user existance
                const userFound = await User.findOne({
                    email: credentials?.email,
                  }).select("+password");
          
                  if (!userFound) throw new Error("Invalid credentials");
          
                  const passwordMatch = await compare(credentials.password,userFound.password);
          
                  if (!passwordMatch) throw new Error("Invalid credentials");
          
                  console.log(userFound);
          
                  return userFound;
            },
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions);
