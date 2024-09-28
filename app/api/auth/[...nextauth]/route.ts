import { EmailProvider } from './../../../../node_modules/next-auth/src/providers/email';
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"


if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("Missing GITHUB_ID or GITHUB_SECRET environment variables");
}

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ]
});

export default NextAuth(authOptions)