// se crea esta ruta con la documentacion de nextauth.org

import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import bcrypt from "bcryptjs";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '@/models/User';
import { mongooseConnect } from '@/lib/mongoose';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await mongooseConnect();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log('error', error)
                }
            },

        }),
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_FRONT_ID,
            clientSecret: process.env.GOOGLE_FRONT_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/",
    },
}

export default NextAuth(authOptions);
