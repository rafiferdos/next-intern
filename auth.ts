import { GoogleProvider } from 'next-auth/providers/google';
import { bcrypt } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { db } from './db';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
  providers: [
    Github({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials) {
            if (!credentials) {
                return null;
            }
            const user = await db.user.findFirst({
                where: {
                    email: credentials.email,
                },
            });
            if (user && (await bcrypt.compare(credentials.password, user.password))) {
                return { id: user.id, email: user.email };
            }
            return null;
        },
    })
  ],
});
