import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { db } from './db';
import { saltAndHashPassword } from './utils/helper';

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
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "email@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }
  
          const email = credentials.email as string;
          const hash = saltAndHashPassword(credentials.password);
  
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let user: any = await db.user.findUnique({
            where: {
              email,
            },
          });
  
          if (!user) {
            user = await db.user.create({
              data: {
                email,
                password: hash,
              },
            });
          } else {
            const isMatch = bcrypt.compareSync(
              credentials.password as string,
              user.hashedPassword
            );
            if (!isMatch) {
              throw new Error("Incorrect password.");
            }
          }
  
          return user;
        },
      }),
  ],
});
