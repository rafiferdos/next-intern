import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { saltAndHashPassword } from "./utils/helper";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER" as string,
        };
      }
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
        name: { label: "Name", type: "text", placeholder: "Your Name" }, 
        image: { label: "Image URL", type: "text", placeholder: "Image URL" }, 
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
      
        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);
      
        // Check if user exists
        let user: any = await db.user.findUnique({
          where: { email },
        });
      
        if (!user) {
          // If user doesn't exist, create a new user
          user = await db.user.create({
            data: {
              email,
              password: hash,
              name: credentials.name as string, // Save the name
              image: credentials.image as string, // Save the image URL
            },
          });
        } else {
          // If user exists, check password
          const isMatch = bcrypt.compareSync(credentials.password as string, user.password);
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        }
      
        // Ensure user has the necessary properties
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "USER", // Add the role property
        };
      },
      
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id; // Ensure user exists and has id
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });
    
        if (existingUser) {
          if (existingUser.password) {
            // User has another account linked with the same email
            throw new Error('OAuthAccountNotLinked');
          }
          return true; // Proceed with sign-in
        }
      }
      return true; // Proceed with sign-in
    },    
  },
});
