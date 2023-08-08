// se crea esta ruta con la documentacion de nextauth.org

import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_FRONT_ID,
            clientSecret: process.env.GOOGLE_FRONT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions);
