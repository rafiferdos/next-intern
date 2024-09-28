// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// You can add more providers like Facebook, Twitter, etc.

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Customize sign-in page if needed
  },
  callbacks: {
    async session({ session, token, user }) {
      // You can add extra session logic here
      return session;
    },
    async jwt({ token, account, profile }) {
      // Additional logic for JSON Web Tokens (JWT)
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your .env file
});

export { handler as GET, handler as POST };